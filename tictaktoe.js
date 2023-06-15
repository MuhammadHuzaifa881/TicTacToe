// Variables to track game data
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
let player1Result = "";
let player2Result = "";
let player1TotalGamesPlayed = 0;
let player2TotalGamesPlayed = 0;
let player1TotalGameWon = 0;
let player2TotalGameWon = 0;
let player1TotalGameLoss = 0;
let player2TotalGameLoss = 0;

// Get DOM elements
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restart button");
const player1ScoreInput = document.getElementById("Player1-score");
const player2ScoreInput = document.getElementById("Player2-score");
const player1ResultInput = document.getElementById("Player1-result");
const player2ResultInput = document.getElementById("Player2-result");
const player1TotalGamesPlayedInput = document.getElementById(
  "Player1-totalGamePlayed"
);
const player2TotalGamesPlayedInput = document.getElementById(
  "Player2-totalGamePlayed"
);
const player1WinStrikeInput = document.getElementById("Player1-WinStrike");
const player2WinStrikeInput = document.getElementById("Player2-WinStrike");
const player1TotalGameWonInput = document.getElementById(
  "Player1-totalgameWon"
);
const player2TotalGameWonInput = document.getElementById(
  "Player2-totalgameWon"
);
const player1TotalGameLossInput = document.getElementById(
  "Player1-totalgameloss"
);
const player2TotalGameLossInput = document.getElementById(
  "Player2-totalgameloss"
);

// Add event listener to cells
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

// Add event listener to restart button
restartBtn.addEventListener("click", restartGame);
const resetScoreBtn = document.getElementById("resetScoreBtn");
resetScoreBtn.addEventListener("click", resetScore);
// Function to handle cell click
function handleCellClick(e) {
  const cell = e.target;

  if (cell.innerHTML !== "") {
    return;
  }

  if (currentPlayer === 1) {
    cell.innerHTML = "X";
    currentPlayer = 2;
  } else {
    cell.innerHTML = "O";
    currentPlayer = 1;
  }

  checkWin();
  checkDraw();
}

// Function to check if a player has won
function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      cells[a].innerHTML !== "" &&
      cells[a].innerHTML === cells[b].innerHTML &&
      cells[a].innerHTML === cells[c].innerHTML
    ) {
      if (cells[a].innerHTML === "X") {
        player1Result = "Win";
        player2Result = "Loss";
        player1TotalGameWon++;
        player2TotalGameLoss++;
      } else {
        player1Result = "Loss";
        player2Result = "Win";
        player2TotalGameWon++;
        player1TotalGameLoss++;
      }

      updateGameResult();
      updateScore();
      restartGame();
      updateWinPercentage();
      resetScore();
      return;
    }
  }
}

// Function to check if it's a draw
function checkDraw() {
  for (let cell of cells) {
    if (cell.innerHTML === "") {
      return;
    }
  }

  player1Result = "Draw";
  player2Result = "Draw";
  updateGameResult();
  restartGame();
}

// Function to update the game result fields
function updateGameResult() {
  player1ResultInput.value = player1Result;
  player2ResultInput.value = player2Result;
  player1TotalGamesPlayed++;
  player2TotalGamesPlayed++;
  player1TotalGamesPlayedInput.value = player1TotalGamesPlayed;
  player2TotalGamesPlayedInput.value = player2TotalGamesPlayed;
  player1TotalGameWonInput.value = player1TotalGameWon;
  player2TotalGameWonInput.value = player2TotalGameWon;
  player1TotalGameLossInput.value = player1TotalGameLoss;
  player2TotalGameLossInput.value = player2TotalGameLoss;

  player1ResultInput.value = getPlayerResult(player1TotalGameWon);
  player2ResultInput.value = getPlayerResult(player2TotalGameWon);
}

function getPlayerResult(totalGameWon) {
  if (totalGameWon > 0) {
    return "Won";
  } else {
    return "Lost";
  }
}

// Function to update the score fields
function updateScore() {
  player1Score = player1TotalGameWon - player1TotalGameLoss;
  player2Score = player2TotalGameWon - player2TotalGameLoss;
  player1ScoreInput.value = player1Score;
  player2ScoreInput.value = player2Score;
}

// Function to restart the game
function restartGame() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  currentPlayer = 1;
  player1Result = "";
  player2Result = "";
  updateGameResult();
  updateWinPercentage();
}

// Win Percentage
function updateWinPercentage() {
  const player1WinPercentage =
    (player1TotalGameWon / player1TotalGamesPlayed) * 100;
  const player2WinPercentage =
    (player2TotalGameWon / player2TotalGamesPlayed) * 100;
  player1WinStrikeInput.value = player1WinPercentage.toFixed(2) + "%";
  player2WinStrikeInput.value = player2WinPercentage.toFixed(2) + "%";
}

function resetScore() {
  currentPlayer = 1;
  player1Score = 0;
  player2Score = 0;
  player1Result = "";
  player2Result = "";
  player1TotalGamesPlayed = 0;
  player2TotalGamesPlayed = 0;
  player1TotalGameWon = 0;
  player2TotalGameWon = 0;
  player1TotalGameLoss = 0;
  player2TotalGameLoss = 0;
  updateGameResult();
  updateScore();
  updateWinPercentage();
}
