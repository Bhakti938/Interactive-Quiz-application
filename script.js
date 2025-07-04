// Array of quiz questions with answer options and their correctness
const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ]
    },
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    }
];

// DOM element references
const questionTextElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const questionDisplay = document.getElementById('question-display');
const resultDisplay = document.getElementById('result-display');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');

// Variables to track quiz progress
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0; // reset question index
    score = 0; // reset score
    nextButton.innerHTML = "Next"; // set button text
    questionDisplay.classList.remove('hidden'); // show question section
    resultDisplay.classList.add('hidden'); // hide result section
    showQuestion(); // show the first question
}

// Function to display the current question and its answer options
function showQuestion() {
    resetState(); // clear previous answers
    let currentQuestion = questions[currentQuestionIndex];
    questionTextElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    // Create and append answer buttons dynamically
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct; // mark correct answer
        }
        button.addEventListener('click', selectAnswer); // handle selection
        answerButtonsElement.appendChild(button);
    });
}

// Function to clear previous question state (buttons, etc.)
function resetState() {
    nextButton.classList.add('hidden'); // hide next button
    // Remove all existing answer buttons
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Function triggered when an answer is selected
function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Mark selected answer as correct/incorrect
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++; // increment score for correct answer
    } else {
        selectedButton.classList.add('incorrect');
    }

    // Show correct answer and disable all buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true; // disable all buttons
    });

    nextButton.classList.remove('hidden'); // show next button
}

// Function to display final score
function showScore() {
    resetState(); // clear question area
    questionDisplay.classList.add('hidden'); // hide question section
    resultDisplay.classList.remove('hidden'); // show result section
    finalScoreElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
}

// Function to handle clicking the "Next" button
function handleNextButton() {
    currentQuestionIndex++; // move to next question
    if (currentQuestionIndex < questions.length) {
        showQuestion(); // show next question
    } else {
        showScore(); // quiz finished, show result
    }
}

// Event listener for Next button
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton(); // go to next question
    } else {
        startQuiz(); // restart quiz if needed
    }
});

// Event listener for Restart button
restartButton.addEventListener('click', startQuiz);

// Start the quiz on initial page load
startQuiz();
