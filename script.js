`use strict`;

const score0El = document.getElementById(`score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);

const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

const modal = document.querySelector(`.modal`);
const btnCloseModal = document.querySelector(`.close--modal`);
const overlay = document.querySelector(`.overlay`);

const diceSound = new Audio(`dice-roll.wav`);
const switchSound = new Audio(`switch-sound.wav`);
const winSound = new Audio(`win-sound.wav`);
const OpenerSound = new Audio(`game-opener.wav`);

let scores, currentScore, activePlayer, playing;

// STARTING CONDITION & STARTING BUTTON FUNCTION

const initialize = function () {
  OpenerSound.play();
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add(`hidden`);
  player0El.classList.remove(`player--winner`);
  player1El.classList.remove(`player--winner`);
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
};

initialize();

const switchPlayer = function () {
  switchSound.play();
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};

//INSTRUCTION FUNCTIONS
const openModal = function () {
  modal.classList.remove(`hidden`);
  overlay.classList.remove(`hidden`);
};

const closeModal = function () {
  modal.classList.add(`hidden`);
  overlay.classList.add(`hidden`);
};

// ROLLIN DICE FUNCTION
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceSound.play();

    // 2.Display dice
    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    // 3.Check for rolled 1: if true. switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Swicthing to next player
      switchPlayer();
    }
  }
});

// HOLD SCORE FUNCTION
btnHold.addEventListener(`click`, function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.Check if player's score is >=50
    if (scores[activePlayer] >= 50) {
      //Finish the game
      winSound.play();
      playing = false;
      diceEl.classList.add(`hidden`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      //Switch to next player
    } else {
      switchPlayer();
    }
  }
});

// NEW GAME BUTTON FUNCTION & CALLING STARTING CONDITION FUNCTION
btnNew.addEventListener(`click`, initialize);
btnNew.addEventListener(`click`, function () {
  btnNew.textContent = `🔄 new game`;
});

//INSTRUCTIONS in START/NEW GAME BUTTON

btnNew.addEventListener(`click`, openModal);
btnCloseModal.addEventListener(`click`, closeModal);
document.addEventListener(`keydown`, function (e) {
  if (e.key === `Escape` && !modal.classList.contains(`hidden`)) {
    closeModal();
  }
});
