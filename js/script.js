var board = [];
var currentGame = [1, 5, 11, 13, 15, 17];
var savedGames = [];

var state = {board: [], currentGame: [], savedGames: [] };

function start() {
    createBoard();
    newGame();


   
}

function createBoard() {
    state.board = [];

    for (var i = 1; i <= 60; i++) {
        state.board.push(i);
    }
}

function newGame() {
    resetGame();
    render();
    console.log(state.currentGame);
}

function render() {
    renderBoard();
    renderButtons();
    renderSavedGames();

}

function renderBoard() {
    var divBoard = document.querySelector('#megasena-board');
    // forma rápida para zerar um elemento: //
    divBoard.innerHTML = '';

    var ulNumbers = document.createElement('ul');

    for (var i = 0; i < state.board.length; i++) {
        var currentNumber = state.board[i];

        var liNumber = document.createElement('li');
        liNumber.textContent = currentNumber;

        liNumber.addEventListener('click', handleNumberClick);

        ulNumbers.appendChild(liNumber);
    }

    divBoard.appendChild(ulNumbers);
}

function handleNumberClick(event) {
    var value = Number(event.currentTarget.textContent);
    // number é usado para converter um conteúdo em texto, em número //
    
    if (isNumberInGame(value)) {
        removeNumberFromGame(value);
    } else {
        addNumberToGame(value);
    }

    console.log(state.currentGame);
}

function renderButtons() {
    var divButtons = document.querySelector('#megasena-buttons');
    divButtons.innerHTML = '';

    var buttonNewGame = createNewGameButton();
    var buttonRandomGame = createRandomGameButton();
    var buttonSaveGame = createSaveGameButton();

    divButtons.appendChild(buttonNewGame);
    divButtons.appendChild(buttonRandomGame);
    divButtons.appendChild(buttonSaveGame);
}

function createRandomGameButton() {
    var button = document.createElement('button');
    button.textContent = 'Jogo Aleatório';

    button.addEventListener('click', randomGame);

    return button;
}

function createNewGameButton() {
    var button = document.createElement('button');
    button.textContent = 'Novo Jogo';

    button.addEventListener('click', newGame);

    return button;
}

function createSaveGameButton() {
    var button = document.createElement('button');
    button.textContent = 'Salvar jogo';

    button.addEventListener('click', saveGame);

    return button;
}

function renderSavedGames() {

}


function addNumberToGame(numberToAdd) {
    if (numberToAdd < 1 || numberToAdd > 60) {
        console.error('Número invalido', numberToAdd);
        return;
    }
    if (state.currentGame.length >= 6) {
        console.error('O jogo já está completo.');
        return;
    }

    if (isNumberInGame(numberToAdd)) {
        console.error('Este número já está no jogo', numberToAdd);
        return;
    }
    state.currentGame.push(numberToAdd);
}

function removeNumberFromGame(numberToRemove) {

    if (numberToRemove < 1 || numberToRemove > 60) {
        console.error('Número invalido', numberToRemove);
        return;
    }

    var newGame = [];

    for (var i = 0; i < state.currentGame.length; i++) {
        var currentNumber = state.currentGame[i];

        if (currentNumber === numberToRemove) {
            continue;
        }

        newGame.push(currentNumber);

    }
    state.currentGame = newGame;
}

function isNumberInGame(numberToCheck) {
    //if(state.currentGame.includes(numberToCheck)) {
    //    return true;
    //}

    //return false;
    // outra forma de fazer:

    return state.currentGame.includes(numberToCheck);
}

function saveGame() {
    if(!isGameComplete()) {
        console.error('O jogo não está completo!');
        return;
    }

    state.savedGames.push(state.currentGame);
    newGame();

    console.log(state.savedGames);
}

function isGameComplete() {
    return state.currentGame.length === 6;
}

function resetGame() {
    state.currentGame = [];
}

function randomGame() {
    resetGame();

    while (!isGameComplete()) {
        var randomNumber = Math.ceil(Math.random() * 60);
        // o ceil é usado para arrendodar o número para cima //
        addNumberToGame(randomNumber);

    }    
    console.log(state.currentGame);
}


start();
