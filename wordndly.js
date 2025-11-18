let guesses = 6;
let nextLetter = 0;

let language = 'SPANISH'
switch (language){

    case 'SPANISH':
        var text = '../static/js/es.txt';
    case 'ENGLISH':
        var text = 'en.txt';
    case 'FRENCH':
        var text = 'fr.txt';
    case 'GERMAN':
        var text = 'de.txt';
    case 'PORTUGUES':
        var text = 'pt.text';
}

//fetch(text)
//const fs = require('fs');
//const readline = require('readline');

// Read all the words into a file
//const lines = fs.readFileSync(text, 'utf8').split('\n').map(line => line.trim());
 // .then(response => response.text())
 // .then(text => console.log(text))
 //var f = 'es.txt'
// var reader = new FileReader();
 // reader.onload = processFile(f);
  //reader.readAsText(f); 
 //reader.readAsText( 'es.text'.files[0], ['utf8']);
//const fs = require('fs');
//const readline = require('readline');
//const lines = fs.readFileSync(text, 'utf8').split('\n').map(line => line.trim());
// chose a word
const lines = ['POPES', 'TAKEN', 'BACON', 'TRIPS', 'FLATS'];
const chosenWord = lines[Math.floor(Math.random() * lines.length)];
console.log(chosenWord);

// create a word object
class Words {
    constructor(word) {
      this.word = word;
      this.arr = Array.from(word);
    }
  
    equals(word) {
      return this.word === word;
    }
  
    setGoodLetters(arr) {
      this.goodLetters = arr;
    }
  
    setBadLetters(arr) {
      this.badLetters = arr;
    }
  
    setCorrectLetters(arr) {
      this.correctLetters = arr;
    }
  }
  
  const chosenWordObj = new Words(chosenWord);

  chosenWordObj.goodLetters = [];
  chosenWordObj.badLetters = [];
  chosenWordObj.correctLetters = ['', '', '', '', ''];
  //when enter is pressed check if valid
  function checkGuess(){
    let row = document.getElementsByClassName("row")[6-guesses]
    var letters = []
    for (let i =0; i<5; i++){
      letters += row.children[i].textContent // append to get all the children and make them a string
        }
       // console.log(letters);
       // console.log(''.concat(letters));
        let guess = ''.concat(letters);
        ///////////////
        const guessLettersObj = new Words(guess); // creates object for user's guess
        
        for (let i = 0; i < guessLettersObj.arr.length; i++) {
          const letter = guessLettersObj.arr[i];
          
          if (chosenWordObj.arr.includes(letter) && !chosenWordObj.goodLetters.includes(letter)) {
            chosenWordObj.goodLetters.push(letter);
            row.children[i].style.backgroundColor = 'yellow';
            if (chosenWordObj.arr[i] === letter) {
              chosenWordObj.correctLetters[i] = letter;
              row.children[i].style.backgroundColor = 'green';
            }
          } else if (chosenWordObj.arr[i] === letter) {
            chosenWordObj.correctLetters[i] = letter;
            row.children[i].style.backgroundColor = 'green';
          } else if (chosenWordObj.goodLetters.includes(letter)) {
            // Do nothing
            row.children[i].style.backgroundColor = 'yellow';
          } else if (chosenWordObj.badLetters.includes(letter)) {
            // Do nothing
            row.children[i].style.backgroundColor = 'gray';
          } else {
            chosenWordObj.badLetters.push(letter);
            row.children[i].style.backgroundColor = 'gray';
          }
        }
        console.log(chosenWordObj.arr[1]);
    if (guessLettersObj.equals(chosenWordObj.word)) {

        // Set the values for the hidden form fields
    document.getElementById("num_attempts").value = 6-guesses;
    document.getElementById("wins").value = 1;
    
    // Submit the form
    document.getElementById("hiddenForm").submit();

        return // do stuff witht the form here and push to back end

    }
/////////////////////////////      
    if (lines.includes(''.concat(letters))) { // checks to make sure the given word is valid
        //let row = document.getElementsByClassName("row")[6-guesses]
         //   for (let i =0; i<5; i++){
         //   if (chosenWordObj.goodletters.includes(guessLettersObj.arr[i])){
          //      row.children[i].style.backgroundColor = 'green';
         //   }

         //   }

            guesses--;
            nextLetter=0;
    } else {
        //    document.getElementById("somplace to display word was wrong").innerText);
            //console.log('The word you entered is not valid\n');
            for (let i =0;i<letters.length;i++){
            deleteLetter () 
        }

        for (let i = 0; i < guessLettersObj.arr.length; i++) {
            row.children[i].style.backgroundColor = 'white';

        }
    }
}
  //  console.log(`Number of Tries remaining: ${tries}`);
    //const guess = getElementById("whatever the name isfor getting the element")
    //const guess = readline.question('Enter a word: ').toUpperCase();
  
  //  if (lines.includes(guess)) {
   //   tries--;
   // } else {
    //  console.log('The word you entered is not valid\n');
     
    //}  


function deleteLetter () {
    let row = document.getElementsByClassName("row")[6-guesses]
    let box = row.children[nextLetter-1]
    box.textContent = " "
    box.classList.remove("filled-box")
    // currentGuess.pop()
    nextLetter--
}

function insertLetter (pressedKey) {
    if (nextLetter === 5) { return }

    pressedKey = pressedKey.toUpperCase()

    let row = document.getElementsByClassName("row")[6-guesses]
    let box = row.children[nextLetter]

    box.textContent = pressedKey
    box.classList.add("filled-box")
    // currentGuess.push(pressedKey)
    nextLetter++
}

// Get input from computer keyboard
document.addEventListener("keyup", (e) => {
    if (guesses === 0) { return }

    let pressedKey = String(e.key)

    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

// Get input from on-screen keyboard
document.addEventListener("click", (e) => {
    const target = e.target
    
    if (!target.classList.contains("keyboard-button")) { return }

    let key = target.textContent
    if (key === "⌫") { key = "Backspace" } 

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})
// Functionality of the game:
// Read all the words into a file


//const language = getElementById("whatever the name is") // grab the language from where user imputted from html

//let real = language.toUpperCase();
