// Variables to track game data player 1
let currentPlayer = 1;
let player1Result = "";
let player1TotalGamesPlayed = 0;
let player1TotalGameWon = 0;
let player1Score = 0;
let player1TotalGameLoss = 0;
// player 2
let player2Score = 0;
let player2Result = "";
let player2TotalGamesPlayed = 0;
let player2TotalGameWon = 0;
let player2TotalGameLoss = 0;


// Get DOM elements player 1
var player1ScoreInput = document.getElementById("Player1-score");
var player1ResultInput = document.getElementById("Player1-result");
var player1TotalGamesPlayedInput = document.getElementById("Player1-totalGamePlayed");
var player1WinStrikeInput = document.getElementById("Player1-WinStrike");
var player1TotalGameWonInput = document.getElementById("Player1-totalgameWon");
var player1TotalGameLossInput = document.getElementById("Player1-totalgameloss");
// Player 2
var player2ScoreInput = document.getElementById("Player2-score");
var player2ResultInput = document.getElementById("Player2-result");
var player2TotalGamesPlayedInput = document.getElementById("Player2-totalGamePlayed");
var player2WinStrikeInput = document.getElementById("Player2-WinStrike");
var player2TotalGameWonInput = document.getElementById("Player2-totalgameWon");
var player2TotalGameLossInput = document.getElementById("Player2-totalgameloss");
// Button Time
const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restartbtn");
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
  // updateGameResult();
  restartGame();
}

// Function to update the game result fields
function updateGameResult() {
  player1ResultInput.value = player1Result;
  player2ResultInput.value = player2Result;
  // player 1 game played increment
  player1TotalGamesPlayed = player1TotalGamesPlayed++;
  player1TotalGamesPlayedInput.value = player1TotalGamesPlayed;
  player1TotalGameWonInput.value = player1TotalGameWon;
  player1TotalGameLossInput.value = player1TotalGameLoss;

  // player 2 game played increment
  player2TotalGamesPlayed = player2TotalGamesPlayed++;
  player2TotalGamesPlayedInput.value = player2TotalGamesPlayed;
  player2TotalGameWonInput.value = player2TotalGameWon;
  player2TotalGameLossInput.value = player2TotalGameLoss;
}

// Function to update the score fields
function updateScore() {
  if(player1Result=="Win"){
    player1Score=player1Score+50;
    player1ScoreInput.value = player1Score;
  }
  else if(player2Result=="Win"){
    player2Score=player2Score+50;
  player2ScoreInput.value = player2Score;
  }
  // player1Score = player1TotalGameWon - player1TotalGameLoss;
  // player2Score = player2TotalGameWon - player2TotalGameLoss;
}

// Function to restart the game
function restartGame() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  currentPlayer = 1;
  player1Result = "";
  player2Result = "";
  // player 1 increment
  player1TotalGamesPlayed = player1TotalGamesPlayed + 1;
  player1TotalGamesPlayedInput.value = player1TotalGamesPlayed;
  // player 2 increment
  player2TotalGamesPlayed = player2TotalGamesPlayed + 1;
  player2TotalGamesPlayedInput.value = player2TotalGamesPlayed;
  // updateGameResult();
  updateWinPercentage();
}

// Win Percentage
function updateWinPercentage() {
  const player1WinPercentage = calculateWinPercentage(player1TotalGameWon, player1TotalGamesPlayed);
  const player2WinPercentage = calculateWinPercentage(player2TotalGameWon, player2TotalGamesPlayed);
  player1WinStrikeInput.value = player1WinPercentage.toFixed(2);
  player2WinStrikeInput.value = player2WinPercentage.toFixed(2);
}

function calculateWinPercentage(totalGameWon, totalGamesPlayed) {
  if (totalGamesPlayed === 0) {
    return 0;
  }
  return (totalGameWon / totalGamesPlayed) * 100;
}


function resetScore() {
  currentPlayer = 0;
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
  // updateGameResult();
  // updateScore();
  // updateWinPercentage();
}
