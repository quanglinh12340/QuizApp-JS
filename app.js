const questions = [
    {
        question: 'Which is larget animal in the world?',
        answers: [
            { text: 'Shark', correct: false },
            { text: 'Blue whale', correct: true },
            { text: 'Elephant', correct: false },
            { text: 'Cat', correct: false },
        ]
    },
    {
        question: 'Which is smallest country animal in the world?',
        answers: [
            { text: 'Vatican City', correct: false },
            { text: 'Bhutan', correct: true },
            { text: 'Nepal', correct: false },
            { text: 'Shri Lanka', correct: false },
        ]
    },
    {
        question: 'Which is smallest continent animal in the world?',
        answers: [
            { text: 'Asia', correct: false },
            { text: 'Australia', correct: true },
            { text: 'Arctic', correct: false },
            { text: 'Africa', correct: false },
        ]
    },
]
const questionElement = document.getElementById('question')
const answerButton = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerText = 'Next'
    showQuestion()
}

function showQuestion() {
    resetState()
    const currentQuestion = questions[currentQuestionIndex]
    const questionNo = currentQuestionIndex + 1
    questionElement.innerText = questionNo + '.' + currentQuestion.question

    currentQuestion.answers.map(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        answerButton.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', (e) => {
            const selectedBtn = e.target
            if (selectedBtn.dataset.correct === 'true') {
                selectedBtn.classList.add('correct')
                score++
            } else {
                selectedBtn.classList.add('incorrect')
            }

            Array.from(answerButton.children).map(button => {
                if (button.dataset.correct === 'true') {
                    button.classList.add('correct')
                }
                button.disabled = true
            })
            nextButton.style.display = 'block'
        })
    })
}

function showScore() {
    resetState()
    questionElement.innerText = `You scored ${score} out of ${questions.length}`
    nextButton.innerText = 'Play Again'
    nextButton.style.display = 'block'
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

function resetState() {
    nextButton.style.display = 'none'
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

startQuiz()


