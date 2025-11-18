let guesses = 6;
let nextLetter = 0;


// Choose language
let languageSelect = document.getElementById("language-select")
let language = languageSelect.value

languageSelect.addEventListener("change", (e) => {
    language = e.target.value
})

// Open language file
// const filePath = '../static/txt/' + language + '.txt'
// var lines;

// fetch(filePath)
//     .then(response => response.text())
//     .then(text => {
//         lines = text.split('\n').map(line => line.trim().toUpperCase.filter(line => line.length))
//     })
// console.log(lines)

// Choose word
lines = ["APPLE", "BERRY", "LEMON", "MANGO", "PEACH", "PLUMS", "KIWIS", "MELON", "GUAVA"];
const chosenWord = lines[Math.floor(Math.random() * lines.length)];
console.log(chosenWord);

// Create word object
class Words {
    constructor(word) {
      this.word = word;
      this.arr = Array.from(word);
    }

    setGoodLetters(arr) { this.goodLetters = arr; }
    setBadLetters(arr) { this.badLetters = arr; }
    setCorrectLetters(arr) { this.correctLetters = arr; }

    equals(word) { return this.word === word; }
}

const chosenWordObj = new Words(chosenWord);
chosenWordObj.goodLetters = [];
chosenWordObj.badLetters = [];
chosenWordObj.correctLetters = ['', '', '', '', ''];

let gameWon = false;

function checkGuess() {
    let row = document.getElementsByClassName("row")[6-guesses]
    var letters = []

    for (let i =0; i<5; i++) {
      letters += row.children[i].textContent // append to get all the children and make them a string
    }

    let guess = ''.concat(letters);
    const guessLettersObj = new Words(guess); // creates object for user's guess

    const yellow = '#ffff99';
    const green = '#99ff99';
    const gray = '#d3d3d3';
    
    for (let i = 0; i < guessLettersObj.arr.length; i++) {
        const letter = guessLettersObj.arr[i];

        
        if (chosenWordObj.arr.includes(letter) && !chosenWordObj.goodLetters.includes(letter)) {
            chosenWordObj.goodLetters.push(letter);
            row.children[i].style.backgroundColor = yellow;
            row.children[i].style.color = 'black';

            if (chosenWordObj.arr[i] === letter) {
                chosenWordObj.correctLetters[i] = letter;
                row.children[i].style.backgroundColor = green;
            }

        } else if (chosenWordObj.arr[i] === letter) {
            chosenWordObj.correctLetters[i] = letter;
            row.children[i].style.backgroundColor = green;
            row.children[i].style.color = 'black';
        } else if (chosenWordObj.goodLetters.includes(letter)) {
            // Do nothing
            row.children[i].style.backgroundColor = yellow;
            row.children[i].style.color = 'black';
        } else if (chosenWordObj.badLetters.includes(letter)) {
            // Do nothing
            row.children[i].style.backgroundColor = gray;
            row.children[i].style.color = 'black';
        } else {
            chosenWordObj.badLetters.push(letter);
            row.children[i].style.backgroundColor = gray;
            row.children[i].style.color = 'black';
        }
    }

    if (guessLettersObj.equals(chosenWordObj.word)) {
        gameWon = true;
        return; // do stuff with the form here and push to back end
    }

    guesses--;
    nextLetter = 0;
}

// WorNDly board input
function deleteLetter () {
    if (gameWon) { return }

    let row = document.getElementsByClassName("row")[6-guesses]
    let box = row.children[nextLetter-1]
    box.textContent = " "
    box.classList.remove("filled-box")
    // currentGuess.pop()
    nextLetter--
}

function insertLetter (pressedKey) {
    if (nextLetter === 5) { return }
    if (gameWon) { return }

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