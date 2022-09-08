//VARIABLES
// intro
var introduction = document.querySelector("#intro")
var startBtn = document.querySelector("#start-btn")
var quizIntro = document.querySelector("#quiz-intro")

// questions
var questionList = document.querySelector("#question-list")
var questions = document.querySelector("#questions")
// answers
var answerBtns = document.querySelectorAll(".answer-btns")
var answerBtnA = document.querySelector("#answer-btn-a")
var answerBtnB = document.querySelector("#answer-btn-b")
var answerBtnC = document.querySelector("#answer-btn-c")
var answerBtnD = document.querySelector("#answer-btn-d")
// check answer
var checkAnswer = document.querySelector("#check-answer")
// end of quiz
var quizEnd = document.querySelector("#quiz-end")
var finScore = document.querySelector("#fin-score")
var initials = document.querySelector("#initals")

var submitBtn = document.querySelector("#submit-btn")
// highscores
var highScoresList = document.querySelector("#highscores-list")
var scoresList = document.querySelector("#scores-list")
var highScoreBtn = document.querySelector("#high-score-btn")
var finished = document.querySelector("#finished")

var backBtn = document.querySelector("#back-btn")
var clearBtn = document.querySelector("#clear-btn")


//QUESTIONS LIST
var questionsQuery = [
    {
        question: "Question 1: Javascript is an _______ language?",
        choices: ["A. Object Oriented", "B. Object Base", "C. Production", "D. Boolean"],
        answer: "A. Object Oriented"
    },
    {
        question: "Question 2: Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["A. document.write()", "B .console.log()", "C. window.alert()", "D. All of the above"],
        answer: "D. All of the above"
    },
    {
        question: "Question 3: How can a datatype be declared to be a constant type?",
        choices: ["A. const", "B. var", "C. let", "D. constant"],
        answer: "C. let"
    },
    {
        question: "Question 4: What keyword is used to check whether a given property is valid or not?",
        choices: ["A. in", "B. is in", "C. exists", "D. lies"],
        answer: "A. in"
    },
    {
        question: "Question 5: When an operators value is NULL, the typeof returned by the unary operator is:",
        choices: ["A. Boolean", "B. undefined", "C. object", "D. integer"],
        answer: "C. object"
    },
    {
        question: "Question 6: Which of the following is not a Javascript framework?",
        choices: ["A. node", "B. vue", "C. react", "D. cassandra"],
        answer: "D. cassandra"
    },
    {
        question: "Question 7: How to stop an interval timer in Javascript?",
        choices: ["A. clearInterval", "B. clearTimer", "C. intervalOver", "D. none of the above"],
        answer: "A. clearInterval"
    },
]

//timer
var timer = document.getElementById("timer");

var timeLeft = 75;
var questionNum = 0;
var score = 0;
var questionCounter = 1;

function countdown() {
        
    var timeInterval = setInterval(function () {

    timeLeft--;
      timer.textContent = "Time left: " + timeLeft + " s";

        if (timeLeft <= 0){
            clearInterval(timeInterval);
            timer.textContent = "TIME'S UP!"; 
            finished.textContent = "TIME'S UP!";
            quizOver();

        } else  if(questionCounter >= questionsQuery.length + 1) {
            clearInterval(timeInterval);
            quizOver();
            } 
}, 1000);
}

function startQuiz(){
    quizIntro.style.display="none";
    questionList.style.display="block";
    questionNum = 0
    countdown();
    showQuestion(questionNum);
}

function showQuestion (n) {
    questions.textContent = questionsQuery[n].question;
    answerBtnA.textContent = questionsQuery[n].choices[0];
    answerBtnB.textContent = questionsQuery[n].choices[1];
    answerBtnC.textContent = questionsQuery[n].choices[2];
    answerBtnD.textContent = questionsQuery[n].choices[3];
    questionNum = n;
}

function answerCheck(event) {
    event.preventDefault();
    //make it display
    checkAnswer.style.display = "block";
    setTimeout(function () {
        checkAnswer.style.display = 'none';
    }, 1000);

    if (questionsQuery[questionNum].answer == event.target.value) {
        checkAnswer.textContent = "Correct!"; 
        score = score + 1;

    } else {
        timeLeft = timeLeft - 5;
        checkAnswer.textContent = "INCORRECT! The correct answer is " + questionsQuery[questionNum].answer + " .";
    }
         //THEN I am presented with another question
    if (questionNum < questionsQuery.length -1 ) {
    // call showQuestions to bring in next question when any reactBtn is clicked
        showQuestion(questionNum +1);
    } else {
    quizOver();
}
questionCounter++;
}

function quizOver() {

    questionList.style.display = "none";
    quizEnd.style.display = "block";
    console.log(quizEnd);
    // show final score
    finScore.textContent = "YOUR SCORE IS:" + score ;
    // clearInterval(timerInterval);  
    timer.style.display = "none"; 
};

function highScoreList () {
    var oldList = localStorage.getItem("HighScores");
    if (oldList !== null ){
        newList = JSON.parse(oldList);
        return newList;
    } else {
        newList = [];
    }
    return newList;
};

function topScores () {
    scoresList.innerHTML = "";
    scoresList.style.display ="block";
    var highScores = sort();   
    // Slice the high score array to only show the top five high scores. 
    var topScoresList = highScores.slice(0,15);
    for (var i = 0; i < topScoresList.length; i++) {
        var item = topScoresList[i];
    // Show the score list on score board
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoresList.appendChild(li);
    }
};

function sort () {
    var unsortedList = highScoreList();
    if (highScoreList == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};

function addItem (x) {
    var addedList = highScoreList();
    addedList.push(x);
    localStorage.setItem("HighScores", JSON.stringify(addedList));
};

function saveScore () {
    var scoreItem ={
        user: initials.value,
        score: score
    }
    addItem(scoreItem);
    topScores();
}

startBtn.addEventListener("click", startQuiz);

answerBtns.forEach(function(click){

    click.addEventListener("click", answerCheck);
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    quizEnd.style.display = "none";
    quizIntro.style.display = "none";
    highScoresList.style.display = "block";
    questionList.style.display ="none";
    saveScore();
});

highScoreBtn.addEventListener("click", function(event) {
    event.preventDefault();
    quizEnd.style.display = "none";
    quizIntro.style.display = "none";
    highScoresList.style.display = "block";
    questionList.style.display ="none";
    topScores();
});

backBtn.addEventListener("click",function(event){
    event.preventDefault();
    quizEnd.style.display = "none";
    quizIntro.style.display = "block";
    highScoresList.style.display = "none";
    questionList.style.display ="none";
    location.reload();
});

clearBtn.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    topScores();
});



//click any choices button, go to the next question



// const startButton = document.getElementById ('start-btn')
// const questionContainerElement = document.getElementById('question-container')

// startButton.addEventListener('click' , startGame)

// function startGame(){
//     console.log('started')
//     startButton.classList.add('hide')
//     questionContainerElement.classList.remove('hide')

// }

// function setNextQuestion(){

// }

// function selectAnswer(){

// }