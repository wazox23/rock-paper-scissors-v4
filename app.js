"use strict";

const selectionButtons = document.querySelectorAll(".selection");
let playerSelection = "";
let computerSelection = "";
let resultsTxt = document.getElementById("results-text");
let playerScore = document.getElementById("player-score");
let computerScore = document.getElementById("computer-score");
let playerPrevSelections = document.getElementById("player-prev-selection");
let computerPrevSelections = document.getElementById("computer-prev-selection");
let playerSelections = [];
let computerSelections = [];

selectionButtons.forEach((selectionButton) => {
  selectionButton.addEventListener("click", (e) => {
    playerSelection = e.target.innerText;
    game();
  });
});

function getComputerSelection() {
  computerSelection = Math.floor(Math.random() * 3);
  if (computerSelection === 0) {
    computerSelection = "✊🏻";
  } else if (computerSelection === 1) {
    computerSelection = "✌🏻";
  } else {
    computerSelection = "🤚🏻";
  }
  return computerSelection;
}

function game() {
  getComputerSelection();
  playerSelections = [playerSelection, ...playerSelections].slice(0, 10);
  computerSelections = [computerSelection, ...computerSelections].slice(0, 10);
  playerPrevSelections.innerHTML =
    "Player choices: <ul style='list-style-type: none;'><li>" +
    playerSelections.join("</li><li>") +
    "</li></ul>";
  computerPrevSelections.innerHTML =
    "Computer choices: <ul style='list-style-type: none;'><li>" +
    computerSelections.join("</li><li>") +
    "</li></ul>";
  if (playerSelection === "✊🏻" && computerSelection === "✌🏻") {
    resultsTxt.innerText = "player wins";
    playerScore.innerText++;
  } else if (playerSelection === "🤚🏻" && computerSelection === "✊🏻") {
    resultsTxt.innerText = "player wins";
    playerScore.innerText++;
  } else if (playerSelection === "✌🏻" && computerSelection === "🤚🏻") {
    resultsTxt.innerText = "player wins";
    playerScore.innerText++;
  } else if (playerSelection === computerSelection) {
    resultsTxt.innerText = "draw";
  } else {
    resultsTxt.innerText = "computer wins";
    computerScore.innerText++;
  }
  gameOver();
}

let container = document.createElement("div");
container.classList.add(
  "d-flex",
  "justify-content-center",
  "align-items-center",
  "new-game-btn"
);
container.style.height = "100vh";

let newGameBtn = document.createElement("button");
newGameBtn.classList.add("btn", "btn-danger", "fs-1");
newGameBtn.textContent = "START NEW GAME";
container.appendChild(newGameBtn);
document.body.appendChild(container);
newGameBtn.style.display = "none";

function gameOver() {
  if (parseInt(playerScore.innerText) >= 5) {
    resultsTxt.innerText = "you won!";
    document.getElementById("main-section").style.display = "none";
    newGameBtn.style.display = "initial";
  } else if (parseInt(computerScore.innerText) >= 5) {
    resultsTxt.innerText = "computer won!";
    document.getElementById("main-section").style.display = "none";
    newGameBtn.style.display = "initial";
  }
}

function startNewGame() {
  playerScore.innerText = "";
  computerScore.innerText = "";
  document.getElementById("main-section").style.display = "initial";
  resultsTxt.textContent = "Choose your weapon";
  container.style.display = "none";
  playerSelections = [];
  computerSelections = [];
  playerPrevSelections.innerText = "";
  computerPrevSelections.innerText = "";
}

newGameBtn.onclick = function () {
  startNewGame();
  newGameBtn.style.display = "none";
};
