// intro
const introduction = document.querySelector("#intro")
const startBtn = document.querySelector("#start-btn")
const quizIntro = document.querySelector("#quiz-intro")

// questions
const questionList = document.querySelector("#question-list")
const questions = document.querySelector("#questions")
// answers
const answerBtns = document.querySelectorAll(".answer-btns")
const answerBtnA = document.querySelector("#answer-btn-a")
const answerBtnB = document.querySelector("#answer-btn-b")
const answerBtnC = document.querySelector("#answer-btn-c")
const answerBtnD = document.querySelector("#answer-btn-d")
// check answer
const checkAnswer = document.querySelector("#check-answer")
// end of quiz
const quizEnd = document.querySelector("#quiz-end")
const finScore = document.querySelector("#fin-score")
const name1 = document.querySelector("#name")
//submit
const submitBtn = document.querySelector("#submit-btn")
// highscores
const highScoresList = document.querySelector("#highscores-list")
const scoresList = document.querySelector("#scores-list")
const highScoreBtn = document.querySelector("#high-score-btn")
const finished = document.querySelector("#finished")
// clear and back buttons
const backBtn = document.querySelector("#back-btn")
const clearBtn = document.querySelector("#clear-btn")

//timer
const timer = document.getElementById("timer");

// functional time, score and question variables
var timeLeft = 75;
var questionNum = 0;
var score = 0;
var questionToken = 1;

const questionsQuery = [
    {
        question: "Question 1: Javascript is an _______ language?",
        choices: ["A. Object Oriented", "B. Object Base", "C. Production", "D. Boolean"],
        answer: "A"
    },
    {
        question: "Question 2: Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["A. document.write()", "B .console.log()", "C. window.alert()", "D. All of the above"],
        answer: "D"
    },
    {
        question: "Question 3: How can a datatype be declared to be a constant type?",
        choices: ["A. const", "B. var", "C. let", "D. constant"],
        answer: "C"
    },
    {
        question: "Question 4: What keyword is used to check whether a given property is valid or not?",
        choices: ["A. in", "B. is in", "C. exists", "D. lies"],
        answer: "A"
    },
    {
        question: "Question 5: When an operators value is NULL, the typeof returned by the unary operator is:",
        choices: ["A. Boolean", "B. undefined", "C. object", "D. integer"],
        answer: "C"
    },
    {
        question: "Question 6: Which of the following is not a Javascript framework?",
        choices: ["A. node", "B. vue", "C. react", "D. cassandra"],
        answer: "D"
    },
    {
        question: "Question 7: How to stop an interval timer in Javascript?",
        choices: ["A. clearInterval", "B. clearTimer", "C. intervalOver", "D. none of the above"],
        answer: "A"
    },
]

function countdownTimer() {
        
    const timeInterval = setInterval(function () {
    timeLeft--;
      timer.textContent = "TIME LEFT TILL QUIZ ENDS: " + timeLeft + " seconds";
        if (timeLeft === 0){
            clearInterval(timeInterval);
            finished.textContent = "TIME'S UP!";
            quizOver();
        } else  if(questionToken >= questionsQuery.length + 1) {
            clearInterval(timeInterval);
            quizOver();
            } 
}, 1000);
}

function startQuiz(){
    quizIntro.style.display="none";
    questionList.style.display="inline";
    questionNum = 0
    countdownTimer();
    questionsAndAnswers(questionNum);
}

function questionsAndAnswers (x) {
    questions.textContent = questionsQuery[x].question;
    answerBtnA.textContent = questionsQuery[x].choices[0];
    answerBtnB.textContent = questionsQuery[x].choices[1];
    answerBtnC.textContent = questionsQuery[x].choices[2];
    answerBtnD.textContent = questionsQuery[x].choices[3];
    questionNum = x;
}

function answerCheck(event) {
    event.preventDefault();
    checkAnswer.style.display = "inline";
    setTimeout(function () {
        checkAnswer.style.display = 'none';
    }, 1000);

    if (questionsQuery[questionNum].answer == event.target.value) {
        checkAnswer.textContent = "CORRECT!"; 
        score ++;

    } else {
        timeLeft = timeLeft - 5;
        checkAnswer.textContent = "INCORRECT! The correct answer is " + questionsQuery[questionNum].answer;
    }
    if (questionNum < questionsQuery.length -1 ) {
        questionsAndAnswers(questionNum +1);
    } else {
    quizOver();
}
questionToken ++;
}

function quizOver() {

    questionList.style.display = "none";
    quizEnd.style.display = "inline";
    console.log(quizEnd);
    finScore.textContent = "YOUR SCORE IS:" + score ;
    timer.style.display = "none"; 
};

function highScoreList () {
    const oldList = localStorage.getItem("HighScores");
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
    scoresList.style.display ="inline";
    const highScores = organizeScores ();   
    const topScoresList = highScores.slice(0,15);
    for (var i = 0; i < topScoresList.length; i++) {
        const scoreList = topScoresList[i];
    const list = document.createElement("div");
    list.textContent = scoreList.user + " : " + scoreList.score;
    list.setAttribute("names", i);
    scoresList.appendChild(list);
    }
};

function organizeScores () {
    const unsortedList = highScoreList();
    if (highScoreList == null ){
        return;
    } else{
    unsortedList.sort(function(a, b){
        return b.score - a.score;
    })
    return unsortedList;
}};

function addScores (x) {
    const addedList = highScoreList();
    addedList.push(x);
    localStorage.setItem("HighScores", JSON.stringify(addedList));
};

function scoreStorage () {
    const scoreItem ={
        user: name1.value,
        score: score
    }
    addScores(scoreItem);
    topScores();
}

startBtn.addEventListener("click", startQuiz);

answerBtns.forEach(function(clk){

    clk.addEventListener("click", answerCheck);
});

submitBtn.addEventListener("click", function(e) {
    e.preventDefault();
    quizEnd.style.display = "none";
    highScoresList.style.display = "inline";
    scoreStorage();
});

highScoreBtn.addEventListener("click", function(e) {
    e.preventDefault();
    quizIntro.style.display = "none";
    highScoresList.style.display = "inline";
    topScores();
});

backBtn.addEventListener("click",function(e){
    e.preventDefault();
    quizIntro.style.display = "inline";
    location.reload();
});

clearBtn.addEventListener("click",function(e) {
    e.preventDefault();
    localStorage.clear();
    topScores();
});

