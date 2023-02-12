const puzzle = document.getElementById("puzzle");
let size = 3;
let puzzlePieces = [];
let timer;
let seconds = 0;
let gameStarted = false;


document.getElementById("start-button").addEventListener("click", function () {
    document.querySelector(".popup-box").style.display = "none";
    gameStarted = true;
    this.disabled = true;
    generatePuzzle();
    shufflePuzzlePieces();
    renderPuzzle();

    startCountSeconds();
});

//event listener for clicking the restart button - rerenders the puzzle. Clickable only after start game button
document.getElementById("restart-button").addEventListener("click", function() {
    if(gameStarted) {
        puzzlePieces = [];
        generatePuzzle()
        shufflePuzzlePieces();
        renderPuzzle();

        clearInterval(timer);
        timer = null;
        seconds = 0;
        timeDisplay.innerHTML = "00:00:00";

        startCountSeconds();

    }
});


let rankingBtn = document.getElementById("ranking-button");
rankingBtn.disabled = true;
rankingBtn.addEventListener("click", function () {
    window.open(
        "/views/ranking.html",
        '_blank' // <- This is what makes it open in a new window.
    );
});


//saveScoreForCurrentPlayer saves the given score for the current player
function saveScoreForCurrentPlayer(score) {
    let usersArr = JSON.parse(localStorage.getItem("users"));
    console.log("saveScoreForCurrentPlayer", usersArr);
    for (let i = 0; i < usersArr.length; i++) {
        if (usersArr[i].currentPlayer) {
            console.log("current user", usersArr[i].currentPlayer)
            if (usersArr[i].score === "-" || usersArr[i].score > score) {
                usersArr[i].score = score;

            }
        }
    }
    localStorage.setItem("users", JSON.stringify(usersArr));
}


/**************** START GAME ****************/

//move moves the clicked piece if possible and checks if the puzzle is solved
function move(piece) {
    const emptyPuzzlePiece = getEmptyPuzzlePiece();
    // Get the position of the empty puzzle piece and the clicked puzzle piece
    const emptyX = emptyPuzzlePiece.x;
    const emptyY = emptyPuzzlePiece.y;

    const clickedPieceX = Number(piece.style.left.slice(0, -2));
    const clickedPieceY = Number(piece.style.top.slice(0, -2));

    // If the clicked puzzle piece is adjacent to the empty puzzle piece, we will swap their positions
    if (clickedPieceX === emptyX && (clickedPieceY === emptyY - 200 || clickedPieceY === emptyY + 200)) {
        swapPositions(emptyPuzzlePiece, piece, false);
        renderPuzzle();
    }
    if (clickedPieceY === emptyY && (clickedPieceX === emptyX - 200 || clickedPieceX === emptyX + 200)) {
        swapPositions(emptyPuzzlePiece, piece, true);
        renderPuzzle();
    }

    if(solved()) {
        let currentScore = seconds;
        alert(`You solved the puzzle for ${currentScore} seconds!`);
        saveScoreForCurrentPlayer(currentScore);
        // saveData();

        clearInterval(timer);
        timer = null;
    }
}

//getRow returns row by given position
function getRow(position) {
    return Math.ceil(position / size);
}

//getCol return column by given position
function getCol(position) {
    let col = position % size;
    return col === 0 ? size : col;
}

//generatePuzzle generates the puzzle pieces and stores them in array. Each piece is 200px
function generatePuzzle() {
    for(let i = 0; i < size * size; i ++) {
        let piece = {
            position: i + 1,
            value: i + 1,
            x: (getCol(i + 1) - 1) * 200,
            y: (getRow(i + 1) - 1) * 200,
            hidden: false,
        }
        puzzlePieces.push(piece)
    }
}

//renderPuzzle renders the puzzle on the screen and adds event listeners on click to each piece
function renderPuzzle() {
    puzzle.innerHTML="";
    puzzlePieces.forEach(piece => {
        if(!piece.hidden) {
            let puzzlePieceElement = document.getElementById(`puzzle-piece-${piece.position}`);
            if (!puzzlePieceElement) {
                puzzlePieceElement = document.createElement('div');
                puzzlePieceElement.setAttribute('id', `puzzle-piece-${piece.position}`);
                puzzlePieceElement.setAttribute('class', 'puzzle-piece');
                puzzle.appendChild(puzzlePieceElement);
                puzzlePieceElement.addEventListener('click', () => {
                    move(puzzlePieceElement)
                });
            }
            puzzlePieceElement.innerHTML = piece.value;
            puzzlePieceElement.style.left = `${piece.x}px`;
            puzzlePieceElement.style.top = `${piece.y}px`;
        }
    });
}

//getRandomValues return array with random values which number is size * size
function getRandomValues() {
    let values = [];
    for(let i = 0; i < size * size; i++){
        values.push(i + 1);
    }

    let shuffledValues = values.sort(() => Math.random() - 0.5);
    return shuffledValues;
}

//hideLastPiece hides the number 9 as a last piece
function hideLastPiece() {
    let lastPiece = puzzlePieces.find((piece) => piece.value === size * size);
    lastPiece.hidden = true;
}

//shufflePuzzlePieces shuffles the puzzle pieces
function shufflePuzzlePieces() {
    let randomValues = getRandomValues();
    let i = 0;
    puzzlePieces.forEach(piece => {
        piece.value = randomValues[i++];
    });
    hideLastPiece();
}

//getEmptyPuzzlePiece returns the empty piece
function getEmptyPuzzlePiece() {
    return puzzlePieces.find((piece) => piece.hidden === true);
}

//getPuzzlPieceeByPos returns a puzzle piece by given position
function getPuzzlPieceeByPos(pos) {
    return puzzlePieces.find((piece) => piece.position === pos)
}

//findPosByCoordinates finds piece position by coordinates X and Y
function findPosByCoordinates(X, Y) {
    for(let piece of puzzlePieces) {
        if (piece.x === X && piece.y === Y){
            return piece.position;
        }
    }
}

//swapPositions swaps 2 pieces (the clicked piece and the empty one if its by the rules of the game)
function swapPositions(emptyPiece, clickedPiece, isX) {
    const clickedPieceX = Number(clickedPiece.style.left.slice(0, -2));
    const clickedPieceY = Number(clickedPiece.style.top.slice(0, -2));
    let pos = findPosByCoordinates(clickedPieceX, clickedPieceY);
    let piece = getPuzzlPieceeByPos(pos);

    // position swapping
    let temp = emptyPiece.position
    emptyPiece.position = piece.position
    piece.position = temp

    // x position swapping
    if (isX) {
        temp = emptyPiece.x
        emptyPiece.x = piece.x
        piece.x = temp
    } else {
        // must be y
        temp = emptyPiece.y
        emptyPiece.y = piece.y
        piece.y = temp
    }
}

//solved checks if the puzzle is solved
function solved() {
    for (let i = 0; i < size * size; i++) {
        if (puzzlePieces[i].position !== puzzlePieces[i].value) {
            return false;
        }
    }
    return true;
}

/**************** END GAME ****************/

/*********************** TIMER ***********************/

const timeDisplay = document.querySelector("#time");

function startCountSeconds() {
    if (!timer) {
        timer = setInterval(function () {
            seconds++;
            const hours = Math.floor(seconds / 3600);
            const formattedHours = hours < 10 ? `0${hours}` : hours;
            const minutes = Math.floor((seconds % 3600) / 60);
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = (seconds % 60) < 10 ? `0${seconds % 60}` : seconds % 60;
            timeDisplay.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }, 1000);
    }
}

// In this updated code, the time is displayed in the format hours:minutes:seconds
// by dividing the total number of seconds by 3600 to get the number of hours,
// dividing the remaining seconds by 60 to get the number of minutes,
// and using the modulo operator (%) to get the number of seconds.
// The hours, minutes, and seconds are each formatted to have 2 digits
// (e.g., 05 instead of 5) if necessary.

/*********************** END TIMER ***********************/
