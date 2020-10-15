var secondsElapsed = 0;
var totalMinutes = 0;
var secondsDisplay = document.getElementById("seconds");
var minutesDisplay = document.getElementById("minutes");
var start = document.getElementById("start-btn");
var pTag = document.getElementById("p-tag");


function startTimer() {  
    interval = setInterval(function() {
        secondsElapsed++;
        //So renderTime() is called here once every second.
        renderTime();
    }, 1000);
    start.style.display = "none";
    pTag.style.visibility = "hidden";
};

function stopTimer() {

    clearInterval(interval);
    renderTime();
};

function renderTime() {

    // When renderTime is called it sets the textContent for the timer html
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();
};

function getFormattedMinutes() {

    var formattedMinutes;

    if (totalMinutes < 10) {
        formattedMinutes = "0" + totalMinutes;
    } else {
        formattedMinutes = totalMinutes;
    };

    return formattedMinutes;
};

function getFormattedSeconds() {

    var formattedSeconds;

    if (secondsElapsed < 10) {
        formattedSeconds = "0" + secondsElapsed;
    } else if (secondsElapsed > 59) {
        secondsElapsed = 0;
        formattedSeconds = 0;
        totalMinutes++;
    } else {
        formattedSeconds = secondsElapsed;
    };

    return formattedSeconds;
};