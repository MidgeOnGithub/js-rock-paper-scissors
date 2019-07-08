const choices = ['rock', 'paper', 'scissors'];
const computerTally = document.querySelector('.computer-tally');
const playerTally = document.querySelector('.player-tally');
const roundResult = document.querySelector('.round-result');

let playerWins = 0;
let computerWins = 0;

// Determine what to play against the user.
function getComputerSelection() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// Return null if the players tied; otherwise return if the player won.
function playRound(playerSelection, computerSelection) {
    let playerWon;
    if (playerSelection === computerSelection)
        playerWon = null;            
    else if (playerSelection === 'rock') 
        playerWon = computerSelection === 'scissors';
    else if (playerSelection === 'paper') 
        playerWon = computerSelection === 'rock';
    else if (playerSelection === 'scissors') 
        playerWon = computerSelection === 'paper';
    
    describeRoundResults(playerWon, playerSelection, computerSelection);

    return playerWon;
}

// Describe the results of a round.
function describeRoundResults(playerWon, playerSelection, computerSelection) {
    roundResult.style.color = 'black';
    if (playerWon === null) {
        roundResult.textContent = `Tie! Both players chose ${playerSelection}`;
    } else {
        roundResult.textContent = playerWon ? 
            `You win! Your choice of ${playerSelection} beats ${computerSelection}!` :
            `You lose! The computer's choice of ${computerSelection} beats ${playerSelection}!`;
    }
}

// Updates the ongoing tallies of each opponent's wins.
function updateTallies(playerWon) {
    if (playerWon !== null)
        playerWon ? ++playerWins : ++computerWins;

    playerTally.textContent = playerWins;
    computerTally.textContent = computerWins;
}

// Announce the match results.
function concludeMatch(playerWins, computerWins) {
    if (playerWins > computerWins) {
        roundResult.style.color = 'blue';
        roundResult.textContent = `Congrats! You won by ${playerWins - computerWins}!`;
    } else {
        roundResult.style.color = 'green';
        roundResult.textContent = `Bummer! You lost by ${computerWins - playerWins}!`;
    }
}

// Handle the game as first-to-five matches.
function runMatch(e) {
    updateTallies(playRound(e.target.id, getComputerSelection()));

    if (playerWins === 5 || computerWins === 5) {
        concludeMatch(playerWins, computerWins);
        playerWins = computerWins = 0;
    }
}

const buttons = document.querySelectorAll('.btns button');
buttons.forEach(addEventListener('click', runMatch));