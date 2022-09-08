// GIVEN I am taking a code quiz
// WHEN I click the Start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

//VARIABLES
// intro
var introduction = document.querySelector("#intro")
var startBtn = document.querySelector("#start-btn")
var quizIntro = document.querySelector("#quiz-intro")
var quizInstruction = document.querySelector("#quiz-instruction")
// questions
var questionList = document.querySelector("#question-list")
var questions = document.querySelector("#questions")
// answers
var answerBtns = document.querySelector(".answer-btns")
var answerBtnA = document.querySelector("#answer-btn-a")
var answerBtnB = document.querySelector("#answer-btn-b")
var answerBtnC = document.querySelector("#answer-btn-c")
var answerBtnD = document.querySelector("#answer-btn-d")
// check answer
var checkAnswer = document.querySelector("#check-answer")
// end of quiz
var quizEnd = document.querySelector("#quiz-end")
var finished = document.querySelector("#finished")
var finScore = document.querySelector("#fin-score")
var initials = document.querySelector("#initals")
var submitBtn = document.querySelector("#submit-btn")
// highscores
var highScores = document.querySelector("#highscores")
var scoresRecord = document.querySelector("#scores-record")
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
var timeLeft = 60;
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

function showQuestion (x) {
    questions.textContent = questionQuery[x].question;
    answerBtnA.textContent = questionQuery[x].choices[0];
    answerBtnB.textContent = questionQuery[x].choices[1];
    answerBtnC.textContent = questionQuery[x].choices[2];
    answerBtnD.textContent = questionQuery[x].choices[3];
    questionNum = x;
}

function answerCheck(event) {
    event.preventDefault();
    //make it display
    checkAnswer.style.display = "block";
    setTimeout(function () {
        checkAnswer.style.display = 'none';
    }, 1000);

    if (questionQuery[questionNum].answer == event.target.value) {
        checkAnswer.textContent = "CORRRECCTTTOOOO!"; 
        totalScore = totalScore + 1;

    } else {
        timeLeft = timeLeft - 5;
        checkAnswer.textContent = "INCORRECT! The correct answer is " + questionQuery[questionNum].answer + " .";
    }
         //THEN I am presented with another question
    if (questionNum < questionQuery.length -1 ) {
    // call showQuestions to bring in next question when any reactBtn is clicked
        showQuestion(questionNum +1);
    } else {
    quizOver();
}
questionCounter++;
}

function quizOver() {

    questionList.style.display = "none";
    finished.style.display = "block";
    console.log(finished);
    // show final score
    finScore.textContent = "YOUR SCORE IS:" + totalScore ;
    // clearInterval(timerInterval);  
    timer.style.display = "none"; 
};




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