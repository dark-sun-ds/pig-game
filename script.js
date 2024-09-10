"use strict";
let dice;
const diceEl = document.querySelector(".dice");
const curPlayer1ScoreEl = document.getElementById("current-player1-score");
const curPlayer2ScoreEl = document.getElementById("current-player2-score");
const globalPlayer1ScoreEl = document.getElementById("player1-score");
const globalPlayer2ScoreEl = document.getElementById("player2-score");
const rollDiceBtn = document.getElementById("roll-dice");
const fields = document.querySelectorAll(".player");
const holdBtn = document.getElementById("hold");
const newGameBtn = document.getElementById("new-game");
const PLAYER_1 = {
  name: "player 1",
  currScore: 0,
  globalScore: 0,
  currScoreEl: curPlayer1ScoreEl,
  globalScoreEl: globalPlayer1ScoreEl,
  field: fields[0],
};
const PLAYER_2 = {
  name: "player 2",
  currScore: 0,
  globalScore: 0,
  currScoreEl: curPlayer2ScoreEl,
  globalScoreEl: globalPlayer2ScoreEl,
  field: fields[1],
};
let currentPlayer = PLAYER_1;

const newGame = () => {
  PLAYER_1.currScore = 0;
  PLAYER_1.globalScore = 0;
  PLAYER_1.currScoreEl.textContent = PLAYER_1.currScore;
  PLAYER_1.globalScoreEl.textContent = PLAYER_1.globalScore;
  PLAYER_2.currScore = 0;
  PLAYER_2.globalScore = 0;
  PLAYER_2.currScoreEl.textContent = PLAYER_2.currScore;
  PLAYER_2.globalScoreEl.textContent = PLAYER_2.globalScore;
}

const win = (player) =>{
  alert(player.name + " wins!");
  newGame();
}

const hold = () => {
  if (currentPlayer.currScore > 0) {
    currentPlayer.globalScore += currentPlayer.currScore;
    currentPlayer.globalScoreEl.textContent = currentPlayer.globalScore;
    currentPlayer.currScore = 0;
    currentPlayer.currScoreEl.textContent = currentPlayer.currScore;
    if (currentPlayer.globalScore >= 100)
      win(currentPlayer);
    else
      changePlayer();
  }
  else {
    alert("You should roll a dice at least once!");
  }
};

const changePlayer = () => {
  if (currentPlayer === PLAYER_1) {
    currentPlayer = PLAYER_2;
    console.log(fields);
    PLAYER_1.field.classList.add("inactive");
    currentPlayer.field.classList.remove("inactive");
  } else {
    currentPlayer = PLAYER_1;
    PLAYER_2.field.classList.add("inactive");
    currentPlayer.field.classList.remove("inactive");
  }
};

const addCurrentScore = (player) => {
  //add and draw cur score
  player.currScore += dice;
  player.currScoreEl.textContent = player.currScore;
};

const drawDice = () => {
  diceEl.innerHTML = `<img src="images/dice-${dice}.png" alt="${dice}">`;
};

const roll = (e) => {
  dice = Math.floor(Math.random() * 6 + 1);
  drawDice();
  if (dice !== 1) {
    addCurrentScore(currentPlayer);
  } else {
    currentPlayer.currScore = 0;
    currentPlayer.currScoreEl.textContent = currentPlayer.currScore;
    changePlayer();
  }
  console.log(PLAYER_1);
};

rollDiceBtn.addEventListener("click", roll);
holdBtn.addEventListener("click", hold);
newGameBtn.addEventListener("click", newGame);
