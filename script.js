'use strict';

const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')


const player = document.querySelectorAll('.player')


let scores, currentScore, activePlayer, playing

function init() {
    score0El.textContent = score1El.textContent = 0;
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;
    diceEl.classList.add('hidden')
    document.getElementById(`current--0`).textContent =  document.getElementById(`current--1`).textContent = currentScore = currentScore;
    for (let i = 0; i < player.length; i++){
        player[i].classList.remove('player--active')
        player[i].classList.remove('player--winner')
    }

    player[0].classList.add('player--active')
}


init();

function switchPlayer() {
    console.log(activePlayer);
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // document.querySelector(`.player--${activePlayer}`).classList.remove('player--active') // use toggle instead of
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    //document.querySelector(`.player--${activePlayer}`).classList.add('player--active') //use toggle instead of
    for (let i = 0; i < player.length; i++)
        player[i].classList.toggle('player--active')
}

btnRoll.addEventListener('click', function () {
    if (playing) {
        diceEl.classList.remove('hidden');
        let diceV = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `dice-${diceV}.png`

        if (diceV !== 1) {
            currentScore += diceV;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer()
        }

    }

})

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        //check if player score's 20
        if (scores[activePlayer] >= 20) {
            //finishing the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
            diceEl.classList.add('hidden')

        } else {
            //switch player
            switchPlayer()
        }
    }

})

btnNew.addEventListener('click',init)
