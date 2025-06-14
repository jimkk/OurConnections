const solution = [
    ["video games", "pets", "sleeping", "snacks", ",Things we like"],
    ["spicy foods", "coffee", "pad thai", "jujubes", ",Things jim likes"],
    ["ice cream", "tree", "shark", "totoro", ",Tash's tattoos"],
    ["muncho", "babes", "nubos", "spud", ",Our pets' names"]
]
let numberOfSolved = 0;

const gameBoard = document.querySelector('.game-board');
const gameTiles = document.querySelectorAll('.game-tile');

$(document).ready(() => {
    randomizeBoard();
})



// Add event listener to each game tile
gameTiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    if (tile.classList.contains('solved')) {
      return;
    }
    if (!tile.classList.contains('selected')) {
      tile.classList.add('selected');
    }else{
      tile.classList.remove('selected');
    }

    checkForGuess();
  });
});

function checkForGuess(){
    let guessTiles = [];
    let guess = [];
    gameTiles.forEach((tile) => {
        if(tile.classList.contains('selected')){
            guessTiles.push(tile);
            guess.push(tile.textContent);
        }
    })
    guess.sort();
    solution.forEach((correctGuessWithSolution) => {
        const correctGuess = correctGuessWithSolution.slice(0, 4);
        correctGuess.sort();
        if(guess.toString() === correctGuess.toString()){
            let firstTile = guessTiles[0];
            guessTiles.forEach((tile) => {
                tile.classList.remove('selected');
                tile.remove();
                // gameBoard.insertBefore(tile, gameBoard.children[4*numberOfSolved]);
                // tile.classList.remove('selected');
                // tile.classList.add('solved');
            })
            firstTile.classList.remove('selected');
            firstTile.classList.add('solved');
            firstTile.textContent = correctGuessWithSolution[4].replace(',', '');
            gameBoard.insertBefore(firstTile, gameBoard.children[numberOfSolved]);
            numberOfSolved++;
            if(numberOfSolved === 4){
                alert("You win!");
            }
        }
    })
}

function randomizeBoard(){
    let tileOptions = solution.flat().filter((item) => !item.includes(','));
    gameTiles.forEach((tile) => {
        const option = Math.floor(Math.random() * tileOptions.length);
        tile.textContent = tileOptions[option];
        tileOptions.splice(option, 1);
    })
}
