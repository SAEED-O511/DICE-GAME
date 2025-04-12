"use strict";
//select element
const player0El = document.querySelector(".player--0 ");
const player1El = document.querySelector(".player--1 ");

let scoreEl0 = document.querySelector("#score--0");
let scoreEL1 = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");

let btnNew = document.querySelector(".btn--new");
let btnRoll = document.querySelector(".btn--roll");
let btnHold = document.querySelector(".btn--hold");

//reset content
let scores, currentScore, activePlayer, playing;

// rest function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreEl0.textContent = 0;
  scoreEL1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  document.getElementById("winnerPopup").classList.add("hidden");
};
init();

//function to switch player //without argument because we dont need to change any thing
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //change value activePlayer
  player0El.classList.toggle("player--active"); //toggle if class there it delet or The opposite is true
  player1El.classList.toggle("player--active");
};

//Roll dice if we playing
btnRoll.addEventListener("click", function () {
  if (playing) {
    //generating a random dice roll
    let dice = Math.trunc(Math.random() * 6) + 1; // Math.random() creat random num betwen 0 :99999

    // display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //check for rolled 1 if true  switch to next player
    if (dice != 1) {
      //add dice to current score
      currentScore += dice; //currentScore =currentScore+dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//hold the score
btnHold.addEventListener("click", function () {
  if (playing) {
    //add current score to active player
    scores[activePlayer] += currentScore; // scores[1]= scores [1] + currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer]; //display the score

    //check if player`s score is >=50
    if (scores[activePlayer] >= 50) {
      //finish the game
      playing = false; //for stop the game
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      // Show popup
      document.getElementById("winnerPopup").classList.remove("hidden");
      document.getElementById("winnerMessage").textContent = `Player ${
        activePlayer + 1
      } Wins! 🎉`;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//rest value for new game
btnNew.addEventListener("click", init);
//popup btn ok
document.querySelector(".btn--close").addEventListener("click", function () {
  document.getElementById("winnerPopup").classList.add("hidden");
});
