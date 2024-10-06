let randomNum = Math.floor(Math.random() * 100) + 1;

const guessField = document.querySelector("#guessField");
const guessSubmit = document.querySelector("#sbmt");
const currentPlayer = document.querySelector("#currentPlayer");
const guesses = document.querySelector("#guesses");
const remaining = document.querySelector("#remaining");

console.log(randomNum);

let humanGuessCount = 0;
let aiGuessCount = 0;
let previousGuesses = [];

let aiLowerBound = 1;
let aiUpperBound = 100;



//main function to check guesses of human and ai
function checkGuess(guess, player){
    //update count
    if(player === 'Human'){
        humanGuessCount ++;
    }
    else{
        aiGuessCount ++;
    }

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
    let remainingTry = 5 - Math.max(humanGuessCount, aiGuessCount)
    remaining.innerHTML = `${remainingTry}`;

    // check for draw
    if(humanGuessCount === 5 && aiGuessCount === 5 && guess != randomNum){
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
        guessField.disabled = true;
        guessSubmit.disabled =true;

        setTimeout(handleAiGuess, 1000);

    }
}
guessSubmit.addEventListener('click',handleHumanGuess)
guessField.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
      handleHumanGuess();
    }
})
ai
// AI guesses number and check
function handleAiGuess(){
    let aiGuess = Math.floor((aiLowerBound + aiUpperBound)/2);

    checkGuess(aiGuess, 'Computer');

    if(previousGuesses[previousGuesses.length -1].result !== 'Correct!'){
        currentPlayer.innerHTML = 'Human'
        guessField.disabled = false;
        guessSubmit.disabled = false;
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
    guessField.disabled = true;
    guessSubmit.disabled = true;

    let message = winner === "Draw" ? "It's a draw! " : `${winner} wins! `;
    message += `The number was ${randomNum}.`;

    const gameOverMsg = document.createElement('p');
    gameOverMsg.textContent = message;
    gameOverMsg.classList.add("gameOvermsg");
    document.querySelector(".container").appendChild(gameOverMsg);

    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    resetButton.classList.add("reset-btn");
    document.querySelector(".container").appendChild(resetButton);
    resetButton.addEventListener("click", resetGame);
}


function resetGame(){
    let humanGuessCount = 0;
    let aiGuessCount = 0;
    let previousGuesses = [];

    let aiLowerBound = 1;
    let aiUpperBound = 100;

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    guesses.innerHTML = '';

    document.querySelector('.gameOvermsg').remove();
    document.querySelector('.reset-btn').remove();
    currentPlayer.innerHTML = 'Human'
    remaining.innerHTML = `${5}`;
    randomNum = Math.floor(Math.random() * 100) + 1;
     
}






