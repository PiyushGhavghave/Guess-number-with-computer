let randomNum = Math.floor(Math.random() * 100) + 1;

const guessField = document.querySelector("#guessField");
const guessSubmit = document.querySelector("#sbmt");
const currentPlayer = document.querySelector("#currentPlayer");
const guesses = document.querySelector("#guesses");
const remaining = document.querySelector("#remaining");
const gameOverMsg = document.querySelector(".gameOvermsg");
const resetbtn = document.querySelector(".reset-btn");

console.log(randomNum);

let humanGuessCount = 0;
let aiGuessCount = 0;
let previousGuesses = [];

let aiLowerBound = 1;
let aiUpperBound = 100;



//main function to check guesses of human and ai
function checkGuess(guess, player){
    console.log("before", humanGuessCount);
    console.log("before", aiGuessCount);
    //update count
    if(player === 'Human'){
        humanGuessCount ++;
    }
    else{
        aiGuessCount ++;
    }
    console.log("after", humanGuessCount);
    console.log("after", aiGuessCount);

    //check guess
    let result;
    if(guess === randomNum){
        result = 'Correct!'
        endGame(player)
    }
    else{
        result = guess > randomNum? 'Too high' : 'Too low';

        //update renage for ai
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

    // display remaining
    remaining.textContent = `${5 - humanGuessCount}`

    // check for draw
    console.log("after vdshsv", humanGuessCount);
    console.log("after vdshsv", aiGuessCount);
    if(humanGuessCount === 5 || aiGuessCount === 5){
        endGame('Draw')
    }
    
    return;
}


//take user input and check
function handleHumanGuess(){
    let userGuess = parseInt(guessField.value);
    
    if(userGuess < 1 || userGuess > 100 || isNaN(userGuess)){
        alert("Please enter number between 1 and 100")
        return;
    }

    checkGuess(userGuess, 'Human');

    guessField.value = "";
    if(previousGuesses[previousGuesses.length -1].result !== 'Correct!'){
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
    let aiGuess = Math.floor((aiLowerBound + aiUpperBound)/2);

    checkGuess(aiGuess, 'Computer');

    if(previousGuesses[previousGuesses.length -1].result !== 'Correct!'){
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


function endGame(winner){
    guessField.setAttribute('disabled','');
    guessSubmit.setAttribute('disabled','');

    let message = winner === "Draw" ? "It's a draw! " : `${winner} wins! The number was ${randomNum}.`;

    gameOverMsg.textContent = message;
    resetbtn.style.display = 'block';
    resetbtn.addEventListener("click", resetGame);

}


function resetGame() {
    humanGuessCount = 0;
    aiGuessCount = 0;
    previousGuesses = [];
    aiLowerBound = 1;
    aiUpperBound = 100;

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






