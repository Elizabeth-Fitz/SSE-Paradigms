// Increment and decrement the quantity of games to purchase
let count = document.getElementById('count');
let plusButton = document.getElementById('plus');
let minusButton = document.getElementById('minus');

plusButton.addEventListener('click', function() {
    count.value = parseInt(count.value) + 1;
});

minusButton.addEventListener('click', function() {
    if (parseInt(count.value) > 1) {
        count.value = parseInt(count.value) - 1;
    }
});

// Purchase the specified number of games
let purchaseButton = document.getElementById('purchase');

purchaseButton.addEventListener('click', function() {
    let amount = document.getElementById('count').value;
    let currentBalance = document.getElementById('user-balance').textContent;

    if (amount == '0') {
        alert('Please select at least one game to purchase.');
    }

    if (parseInt(amount) > parseInt(currentBalance)) {
        alert('You do not have enough coins to make this purchase.');
        return;
    }

    fetch('/game/shop/purchase/', {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf_token,
        },
        method: 'POST',
        body: JSON.stringify({ 'amount': amount }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.message === "Coins decreased successfully") {
            alert('Purchase successful!');
            document.getElementById('user-balance').textContent = data['new_amount'];
        } else {
            alert('Purchase failed. Please try again.');
        }
    });
});