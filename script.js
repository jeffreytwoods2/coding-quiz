var totalSeconds = 60;
var totalMinutes = 5;
var secondsDisplay = document.getElementById("seconds");
var minutesDisplay = document.getElementById("minutes");
var heading = document.getElementById("heading");
var start = document.getElementById("start-btn");
var pTag = document.getElementById("p-tag");
var qBtns = document.getElementById("q-btns");
var firstBtn = document.getElementById("btn-1");
var secondBtn = document.getElementById("btn-2");
var thirdBtn = document.getElementById("btn-3");
var fourthBtn = document.getElementById("btn-4");
var score = 0;
var changeFuncs = [questionTwo, questionThree, questionFour, questionFive];
var currentQ = -1;
var main = document.getElementById("main");

//Decrements timer in one second intervals, gets rid of unnecessary elements, changes text over to Q1
function startTimer() {  
    
    interval = setInterval(function() {
        totalSeconds--;
        //So renderTime() is called here once every second.
        renderTime();
    }, 1000);

    // Necessary to decrement minute the first time
    totalMinutes--;
    
    start.style.display = "none";
    pTag.style.visibility = "hidden";

    heading.textContent = "What does HTML stand for?";
    qBtns.style.display = "block";

    firstBtn.setAttribute("onclick", "rightAns()");
    thirdBtn.setAttribute("onclick", "wrongAns()");
    secondBtn.setAttribute("onclick", "wrongAns()");
    fourthBtn.setAttribute("onclick", "wrongAns()");
    console.log(score);

};

//Stops timer and renders final time to timer element
function stopTimer() {

    clearInterval(interval);
    renderTime();
};

//Sends current time stats to timer element
function renderTime() {

    // When renderTime is called it sets the textContent for the timer html
    minutesDisplay.textContent = getFormattedMinutes();
    secondsDisplay.textContent = getFormattedSeconds();
};

//Makes the minutes look pretty, puts a 0 in front of single digits
function getFormattedMinutes() {

    var formattedMinutes;

    if (totalMinutes < 10) {
        formattedMinutes = "0" + totalMinutes;
    } else {
        formattedMinutes = totalMinutes;
    };

    return formattedMinutes;
};

//Makes the seconds pretty, puts a 0 in front of single digits
function getFormattedSeconds() {

    var formattedSeconds;

    if (totalSeconds > 0 && totalSeconds < 10) {
        formattedSeconds = "0" + totalSeconds;
    } else if (totalSeconds === 60) {
        formattedSeconds = "00";
    } else if (totalSeconds === 0) {
        totalSeconds = 60;
        formattedSeconds = "00";
        totalMinutes--;
    } else {
        formattedSeconds = totalSeconds;
    };

    return formattedSeconds;
};

//Score increased if Q is answered correctly, new score stored locally
function rightAns() {
    score++;
};

function wrongAns() {
    totalMinutes--;
};

//Question 2 setup, assigning right and wrong answer functions to each button
function questionTwo() {
    firstBtn.removeAttribute("onclick", "rightAns()");
    thirdBtn.setAttribute("onclick", "rightAns()");
    firstBtn.setAttribute("onclick", "wrongAns()");
    secondBtn.setAttribute("onclick", "wrongAns()");
    fourthBtn.setAttribute("onclick", "wrongAns()");
    heading.textContent = "What does CSS stand for?";
    firstBtn.textContent = "Concrete System Settings";
    secondBtn.textContent = "Correlated Syntax Strings";
    thirdBtn.textContent = "Cascading Style Sheets";
    fourthBtn.textContent = " Current Stream Styles";
    console.log(score);
};

//Question 3 setup
function questionThree() {
    thirdBtn.removeAttribute("onclick", "rightAns()");
    thirdBtn.setAttribute("onclick", "wrongAns()");
    fourthBtn.removeAttribute("onclick", "wrongAns()");
    fourthBtn.setAttribute("onclick", "rightAns()");
    heading.textContent = "What does JS stand for?";
    firstBtn.textContent = "JerryScript";
    secondBtn.textContent = "JavaSheets";
    thirdBtn.textContent = "JaniceScrolls";
    fourthBtn.textContent = "JavaScript";
    console.log(score);
};

//Question 4 setup
function questionFour() {
    fourthBtn.removeAttribute("onclick", "rightAns()");
    fourthBtn.setAttribute("onclick", "wrongAns()");
    firstBtn.removeAttribute("onclick", "wrongAns()");
    firstBtn.setAttribute("onclick", "rightAns()");
    heading.textContent = "Which front end language is used for logic?";
    firstBtn.textContent = "Javascript";
    secondBtn.textContent = "HTML";
    thirdBtn.textContent = "CSS";
    fourthBtn.textContent = "Scratch";
    console.log(score);
};

//Question 5 setup
function questionFive() {
    firstBtn.removeAttribute("onclick", "rightAns()");
    firstBtn.setAttribute("onclick", "wrongAns()");
    secondBtn.removeAttribute("onclick", "wrongAns()");
    secondBtn.setAttribute("onclick", "rightAns()");
    heading.textContent = "Which of these is a browser?";
    firstBtn.textContent = "N64";
    secondBtn.textContent = "Firefox";
    thirdBtn.textContent = "Playstation";
    fourthBtn.textContent = "Sega";
    console.log(score);
};

//Quiz over setup
function quizOver() {
    stopTimer();
    heading.textContent = "End of Quiz"
    qBtns.style.display = "none";
    pTag.textContent = "Your score: " + score;
    pTag.style.visibility = "visible";
    var submitQ = document.createElement("input");
    submitQ.setAttribute("type", "text");
    submitQ.setAttribute("placeholder", "Insert username");
    submitQ.setAttribute("id", "username-input");
    var submitBtn = document.createElement("input");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "submitBtn");
    main.appendChild(submitQ);
    main.appendChild(submitBtn);

    var usernameData = document.getElementById("username-input");

    submitBtn.addEventListener('click', function() {
        localStorage.setItem("user", JSON.stringify(usernameData.value.trim()));
        localStorage.setItem("score", JSON.stringify(score));
        highScore();
    });
    
};

//High score page
function highScore() {
    pTag.textContent = 'High Score:';
    var inputBar = document.getElementById("username-input");
    var inputBtn = document.getElementById("submitBtn");
    inputBar.style.display = "none";
    inputBtn.style.display = "none";
    var highScoreList = document.createElement("p");
    var getUser = JSON.parse(localStorage.getItem("user"));
    var getScore = JSON.parse(localStorage.getItem("score"));
    highScoreList.textContent = getUser + ": " + getScore;
    main.appendChild(highScoreList);

};

//Transition bewteen Qs no matter what button you click
qBtns.addEventListener("click", function(event) {
    event.stopPropagation();
    currentQ++;

    if(currentQ < 4) {
        changeFuncs[currentQ]();
    } else {
        quizOver();
    };
    
});

//Ends the quiz immediately if time runs out
if (totalMinutes <= 0 && totalSeconds === 0) {
    quizOver();
    stopTimer();
}