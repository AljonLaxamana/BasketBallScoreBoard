let homeScore = document.getElementById("home-score")
let awayScore = document.getElementById("away-score")
let btnStatus = document.getElementById("btn-start")
const PAUSE_GAME = "Pause Game";
let homeScoring = 0
let awayScoring = 0

// Home functions

function addPointHome(score, team) {
    let game = btnStatus.textContent === PAUSE_GAME;
    let clock = btnStatus.textContent !== PAUSE_GAME && secondsElem.value ? shotClock.value : 24;

    if (score == 1 && team == "home") {
        homeScoring += 1;
        homeScore.textContent = homeScoring;
    }
    else if (score == 2 && team == "home") {
        homeScoring += 2;
        homeScore.textContent = homeScoring;
    }
    else if (score == 3 && team == "home") {
        homeScoring += 3;
        homeScore.textContent = homeScoring;
    }

    shotclockreset(clock, game)
}


function subtractPointHome(score, team) {
    let tempScore = homeScoring
    if (score == -1 && team == "home" && homeScoring > 0) {
        homeScoring -= 1;
    }
    else if (score == -2 && team == "home" && homeScoring > 0) {
        homeScoring -= 2;
    }
    else if (score == -3 && team == "home" && homeScoring > 0) {
        homeScoring -= 3;
    }
    else {
        window.alert("Score is already equal to 0 can't decrement points")
        homeScoring = 0
        homeScore.textContent = 0
    }
    if (homeScoring < 0) {
        window.alert("The score will be negative")
        homeScoring = tempScore
    }
    homeScore.textContent = homeScoring;
}

// Away Functions
function addPointAway(score, team) {
    let game = btnStatus.textContent === PAUSE_GAME;
    let clock = btnStatus.textContent !== PAUSE_GAME ? shotClock.value : 24;

    if (score == 1 && team == "away") {
        awayScoring += 1;
        awayScore.textContent = awayScoring;
    }
    else if (score == 2 && team == "away") {
        awayScoring += 2;
        awayScore.textContent = awayScoring;
    }
    else if (score == 3 && team == "away") {
        awayScoring += 3;
        awayScore.textContent = awayScoring;
    }

    shotclockreset(clock, game)
}


function subtractPointAway(score, team) {
    let tempScore = awayScoring
    if (score == -1 && team == "away" && awayScoring > 0) {
        awayScoring -= 1;
    }
    else if (score == -2 && team == "away" && awayScoring > 0) {
        awayScoring -= 2;
    }
    else if (score == -3 && team == "away" && awayScoring > 0) {
        awayScoring -= 3;
    }
    else {
        window.alert("Score is already equal to 0 can't decrement points")
        awayScoring = 0
        awayScore.textContent = 0
    }
    if (awayScoring < 0) {
        window.alert("The score will be negative")
        awayScoring = tempScore
    }
    awayScore.textContent = awayScoring;
}

// Reset

function resetScore(team) {
    if (team === "home") {
        homeScoring = 0
        homeScore.textContent = 0
    }
    else if (team === "away") {
        awayScoring = 0
        awayScore.textContent = 0
    }
}


function changeBtnStatus() {
    let buttonAddTrigger = document.getElementsByClassName("btn-add-points")
    let buttonSubtractTrigger = document.getElementsByClassName("btn-subtract-points")
    let buttonReset = document.getElementsByClassName("btn-reset-score")
    let clock = 24
    let game = true
    shotClock.setAttribute("disabled", true)
    minutesElem.setAttribute("disabled", true)
    secondsElem.setAttribute("disabled", true)
    millisecondsElem.setAttribute("disabled", true)

    for (let i = 0; i < buttonAddTrigger.length; i++) {
        buttonAddTrigger[i].removeAttribute("disabled");
    }

    for (let i = 0; i < buttonReset.length; i++) {
        buttonReset[i].removeAttribute("disabled");
    }

    if (btnStatus.textContent === "Start Game") {
        btnStatus.textContent = "Pause Game"
        clock = shotClock.value
        qtrTimer()
    }
    else if (btnStatus.textContent === "Pause Game") {
        shotClock.removeAttribute("disabled", true)
        minutesElem.removeAttribute("disabled", true)
        secondsElem.removeAttribute("disabled", true)
        millisecondsElem.removeAttribute("disabled", true)

        clock = shotClock.value;
        game = false;
        btnStatus.textContent = "Resume Game"
        clearInterval(qtrInterval)

        for (let i = 0; i < buttonSubtractTrigger.length; i++) {
            buttonSubtractTrigger[i].removeAttribute("disabled", true);
        }
    }
    else {
        for (let i = 0; i < buttonSubtractTrigger.length; i++) {
            buttonSubtractTrigger[i].setAttribute("disabled", true);
        }
        for (let i = 0; i < buttonReset.length; i++) {
            buttonReset[i].setAttribute("disabled", true);
        }

        btnStatus.textContent = "Pause Game"
        clock = shotClock.value;
        game = true;
        qtrTimer()
    }
    if (btnStatus.textContent === "Pause Game") {
        btnStatus.style.color = 'red'
    }
    else {
        btnStatus.style.color = 'green'
    }

    shotclockreset(clock, game)
}

let minutesElem = document.getElementById("minutes")
let secondsElem = document.getElementById("seconds")
let millisecondsElem = document.getElementById("milliseconds")
let shotClock = document.getElementById("shotclock-seconds")
let quarter = document.getElementById("qtr")
let interval = null
let qtrInterval = null
let minutesGlb = minutesElem.value
let secondsGlb = secondsElem.value
let millisecondsGlb = millisecondsElem.value


function qtrTimer() {
    let minutes = minutesElem.value
    let seconds = secondsElem.value
    let milliseconds = millisecondsElem.value

    qtrInterval = setInterval(function () {
        milliseconds--
        millisecondsElem.value = milliseconds

        if (milliseconds < 0) {
            milliseconds = 99
            seconds--
            secondsElem.value = seconds
        }
        if (seconds < 0) {
            seconds = 59
            secondsElem.value = seconds
            minutes--
            minutesElem.value = minutes
        }
        if (minutes < 0) {
            if (quarter.value >= 4 && homeScoring.textContent === awayScoring.textContent) {
                shotClock.removeAttribute("type", "hidden")
                clearInterval(qtrInterval)
                clearInterval(interval)
                alert("Overtime")
                btnStatus.click()
                quarter.value = "OT"
                minutesElem.value = 5
                secondsElem.value = secondsGlb
                millisecondsElem.value = millisecondsGlb
                shotClock.value = 24
            } else {
                shotClock.removeAttribute("type", "hidden")
                clearInterval(qtrInterval)
                clearInterval(interval)
                alert("End of Quarter")
                btnStatus.click()
                quarter.value++
                minutesElem.value = minutesGlb
                secondsElem.value = secondsGlb
                millisecondsElem.value = millisecondsGlb
                shotClock.value = 24
            }
        }

    }, 10)

}


function shotclocktimer() {
    shotClock.value--

    if (shotClock.value < 0) {
        btnStatus.click();
        shotClock.value = 24
    }
    if (minutesElem.value == 0) {
        if (shotClock.value === secondsElem.value || parseInt(shotClock.value) > parseInt(secondsElem.value)) {
            shotClock.value = secondsElem.value
            shotClock.setAttribute("type", "hidden")
        }
    }
}

function shotclockreset(clock, game) {
    clearInterval(interval)
    shotClock.value = clock

    if (game)
        interval = setInterval(shotclocktimer, 1000)
}


function shotClockRestrict() {
    if (shotClock.value > 24 || shotClock.value <= 0) {
        alert("Shotclock is only 24 seconds")
        shotClock.value = 24
    }

}

function timeQtrRestict() {
    if (minutesElem.value == '' || secondsElem.value == '' || millisecondsElem.value == '') {
        alert("Please don't leave the time input blank")
        minutesElem.value = minutesGlb
        secondsElem.value = secondsGlb
        millisecondsElem.value = millisecondsGlb
    }

    if (parseInt(minutesElem.value) < 12 && parseInt(secondsElem.value) > 59) {
        alert("Seconds should not exceed to 59sec")
        secondsElem.value = secondsGlb
        millisecondsElem.value = millisecondsGlb
    }
    if (parseInt(minutesElem.value) > 12) {
        alert("Maximum minutes for a basketball game is always 12mins")
        minutesElem.value = minutesGlb
        secondsElem.value = secondsGlb
        millisecondsElem.value = millisecondsGlb
    }
    if (parseInt(minutesElem.value) === 12 && parseInt(secondsElem.value) > 0) {
        alert("Maximum minutes for a basketball game is always 12mins")
        minutesElem.value = minutesGlb
        secondsElem.value = secondsGlb
        millisecondsElem.value = millisecondsGlb
    }

}
