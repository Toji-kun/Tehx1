const questions = [
    {
        question: "How much water you should drink daily?",
        answers: [
            { text: " At least 2 liters", correct: true },
            { text: "At least 1 liter", correct: false },
            { text: "No more then 2 liters", correct: false },
            { text: "At least 3 liters", correct: false },
        ]
    },
    {
        question: "What should you do before workouts to prevent injuries and improve flexibility?",
        answers: [
            { text: "Drink water", correct: false },
            { text: "Stretch", correct: true },
            { text: "Eat something sweat", correct: false },
            { text: "Breathe slowly", correct: false },
        ]
    },
    {
        question: "How much time you should spend daily in the sun at least?",
        answers: [
            { text: "15 minutes", correct: true },
            { text: "5 minutes", correct: false },
            { text: "25 minutes", correct: false },
            { text: "10 minutes", correct: false },
        ]
    },
    {
        question: "What you should add in your meals to support muscle growth?",
        answers: [
            { text: "Carbohydrates", correct: false },
            { text: "Lipids", correct: false },
            { text: "Vitamins", correct: false },
            { text: "Proteins", correct: true },
        ]
    },
    {
        question: "What is the best website you have seen today?",
        answers: [
            { text: "MTX", correct: true },
            { text: "Other", correct: false },
            { text: "Other", correct: false },
            { text: "Other", correct: false },
        ]
    },
    

  
   
    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(button, isCorrect) {
    if (isCorrect) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
    }

    Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", showQuestion);
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();