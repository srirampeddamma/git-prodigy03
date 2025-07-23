const board = document.getElementById("board");
const statusText = document.getElementById("status");
const modeSelect = document.getElementById("mode");

let gameState = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

board.addEventListener("click", handleClick);
statusText.textContent = "X's turn";

function handleClick(e) {
  const index = e.target.dataset.index;
  const mode = modeSelect.value;

  if (!gameActive || gameState[index] !== "") return;

  makeMove(index, currentPlayer);

  if (checkWin()) {
    endGame(${currentPlayer} wins! 🎉, getWinningCells());
    return;
  }

  if (!gameState.includes("")) {
    endGame("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (mode === "ai" && currentPlayer === "O" && gameActive) {
    setTimeout(aiMove, 500);
  } else {
    statusText.textContent = ${currentPlayer}'s turn;
  }
}

function makeMove(index, player) {
  gameState[index] = player;
  document.querySelector(.cell[data-index="${index}"]).textContent = player;
}

function aiMove() {
  const emptyIndices = gameState
    .map((val, i) => val === "" ? i : null)
    .filter(i => i !== null);

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, "O");

  if (checkWin()) {
    endGame("O wins! 🤖", getWinningCells());
    return;
  }

  if (!gameState.includes("")) {
    endGame("It's a draw!");
    return;
  }

  currentPlayer = "X";
  statusText.textContent = "X's turn";
}

function checkWin() {
  return winConditions.some(condition =>
    condition.every(index => gameState[index] === currentPlayer)
  );
}

function getWinningCells() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (gameState[a] === currentPlayer &&
        gameState[b] === currentPlayer &&
        gameState[c] === currentPlayer) {
      return condition;
    }
  }
  return [];
}

function endGame(message, winningCells = []) {
  statusText.textContent = message;
  gameActive = false;
  winningCells.forEach(index => {
    document.querySelector(.cell[data-index="${index}"]).classList.add("winner");
  });
}

function resetGame() {
  gameState = Array(9).fill("");
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "X's turn";
  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
}