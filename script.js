let randomNum = Math.floor(Math.random() * 100) + 1;

const guessField = document.querySelector("#guessField");
const guessSubmit = document.querySelector("#sbmt");
const currentPlayer = document.querySelector("#currentPlayer");
const guesses = document.querySelector("#guesses");
const remaining = document.querySelector("#remaining");
const gameOverMsg = document.querySelector(".gameOvermsg");
const resetbtn = document.querySelector(".reset-btn");


let humanGuessCount = 0;
let aiGuessCount = 0;
let previousGuesses = [];

let aiLowerBound = 1;
let aiUpperBound = 100;
let isGameOver = false;


//main function to check guesses of human and ai
function checkGuess(guess, player){
    if (isGameOver) return;

    //update count
    if(player === 'Human'){
        humanGuessCount ++;
    }
    else{
        aiGuessCount ++;
    }

    // display remaining
    let currentcount = Math.max(humanGuessCount,aiGuessCount)
    remaining.textContent = `${5 - currentcount}`

    
    //check guess
    let result;
    if(guess === randomNum){
        result = 'Correct!'
        endGame(player)
        return;
    }
    else{
        result = guess > randomNum? 'Too high' : 'Too low';

        //update renge for ai
        if(player === 'Computer'){
            if(result === 'Too high' ){
                aiUpperBound = guess -1;
            }
            else{
                aiLowerBound = guess +1;
            }
        }
    }

    // display previous guess
    previousGuesses.push({player: player, guess: guess, result: result})
    updateGuessesDisplay()

    // Check if game should end based on count
    if (humanGuessCount >= 5 && aiGuessCount >= 5) {
        endGame('Draw');
        return;
    }
}


//take user input and check
function handleHumanGuess(){
    if (isGameOver) return;
    let userGuess = parseInt(guessField.value);
    
    if(userGuess < 1 || userGuess > 100 || isNaN(userGuess)){
        alert("Please enter number between 1 and 100")
        return;
    }

    checkGuess(userGuess, 'Human');

    guessField.value = "";
    if(!isGameOver && previousGuesses[previousGuesses.length -1].result !== 'Correct!'){
        currentPlayer.innerHTML = 'Computer'
        guessField.setAttribute('disabled','');
        guessSubmit.setAttribute('disabled','');

        setTimeout(handleAiGuess, 10);

    }
}
guessSubmit.addEventListener('click',handleHumanGuess)
guessField.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
      handleHumanGuess();
    }
})

// AI guesses number and check
function handleAiGuess(){
    if (isGameOver) return;
    let aiGuess = Math.floor((aiLowerBound + aiUpperBound)/2);

    checkGuess(aiGuess, 'Computer');

    if(!isGameOver && previousGuesses[previousGuesses.length -1].result !== 'Correct!'){
        currentPlayer.innerHTML = 'Human'
        guessField.removeAttribute('disabled');
        guessSubmit.removeAttribute('disabled');
        guessField.focus();

    }

}

function updateGuessesDisplay() {
    guesses.innerHTML = '';
    previousGuesses.forEach( (item, index)=> {
        const guessItem = document.createElement('div')
        guessItem.classList.add("guess-item");
        guessItem.innerHTML = `<span class="player-${item.player.toLowerCase()}">${item.player}: ${item.guess}</span><span>${item.result}</span>`;
        guesses.appendChild(guessItem);
    })
}


function endGame(winner) {
    isGameOver=true;
    // Display the game result message
    let message = winner === "Draw" ? "It's a draw! " : `${winner} wins! The number was ${randomNum}.`;
    gameOverMsg.textContent = message;

    // Disable inputs and show the reset button
    guessField.setAttribute('disabled', '');
    guessSubmit.setAttribute('disabled', '');
    resetbtn.style.display = 'block';
}
resetbtn.addEventListener("click", resetGame);

function resetGame() {
    humanGuessCount = 0;
    aiGuessCount = 0;
    previousGuesses = [];
    aiLowerBound = 1;
    aiUpperBound = 100;
    isGameOver = false;

    // Enable input fields again
    guessField.removeAttribute('disabled');
    guessSubmit.removeAttribute('disabled');
    guessField.value = '';
    guessField.focus();

    // Clear previous guesses display
    guesses.innerHTML = ''; 

    // Remove the game over message and reset button
    gameOverMsg.textContent =''
    resetbtn.style.display = 'none';



    // Reset UI to initial state
    currentPlayer.innerHTML = 'Human';
    remaining.innerHTML = '5';  // Reset remaining guesses

    // Generate a new random number for the new game
    randomNum = Math.floor(Math.random() * 100) + 1;
    console.log(randomNum); // Log the new random number for debugging
}

