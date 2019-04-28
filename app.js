/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
ADDITIONAL GAME RULES AFTER CODING CHALLENGE:

- If a player rolls two 6 in a row, he loses his entire score. After that, it's the next player's turn.

*/

// Keep track of both players' scores
var scores, roundScore, activePlayer, gamePlaying, previousThrow, currentThrow,
    winningScore;

// Call the initialization function
init();


// Select an element and add text content to it
// '#current-' + activePlayer => selects the active player
// document.querySelector('#current-' + activePlayer).textContent = dice;

// .innerHTML => injects HTML into the selected element
// document.querySelector('#current-' + activePlayer).innerHTML 
//      = '<em>' + dice + '</em>';

// Another way of doing the above.
// var x = document.querySelector('#score-0').textContent;
// console.log(x);


// Dice Roll handling
/*
function btn() {

}

// btn => callback function
// Note: We're not calling the btn function here.
// We're merely giving it as an argument to the addEvenListener function.
document.querySelector('.btn-roll').addEventListener('click', btn);

*/
// Alternate Way:

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        previousThrow = currentThrow;
        // 1. Random Number
        var dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
        console.log(dice);
        currentThrow = dice[0] + dice[1];

        // 2. Display the result
        var dice0DOM = document.getElementById('dice0');
        var dice1DOM = document.getElementById('dice1');
        dice0DOM.style.display = 'block';
        dice1DOM.style.display = 'block';
        // Change the dice face image
        dice0DOM.src = 'dice-' + dice[0] + '.png';
        dice1DOM.src = 'dice-' + dice[1] + '.png';


        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice[0] !== 1 && dice[1] !== 1) {
            if (dice[0] === 6 && dice[1] === 6) {
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            }
            // Add score
            roundScore += dice[0] + dice[1];
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }
    }
});


// Hold handling:

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Add current score the active player's global score
        scores[activePlayer] += roundScore;

        // 2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


        // 3. Check if the active player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice0').style.display = 'none';
            document.getElementById('dice1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    activePlayer = activePlayer === 1 ? 0 : 1;
    roundScore = 0;
    currentThrow = 0;
    previousThrow = 0;

    // Empty round scores of both players
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Switch CSS class of the active/inactive players
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Hide the dice
    document.getElementById('dice0').style.display = 'none';
    document.getElementById('dice1').style.display = 'none';
}


// Initialize the game

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    // Current round's score of each player
    roundScore = 0;
    previousThrow = 0;
    // 0,1 are the two players
    activePlayer = 0;

    gamePlaying = true;

    // User-defined winning score
    winningScore = document.getElementById('winning_score').value;
    if (winningScore < 10 || winningScore >= 400) {
        winningScore = 100;
        document.getElementById('winning_score').value = 100;
    }
    console.log(winningScore);

    // How to manipulate the CSS of an element
    document.getElementById('dice0').style.display = 'none';
    document.getElementById('dice1').style.display = 'none';

    // Initialize all scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Reset 'Winner' to player name
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // Remove 'winner' class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}