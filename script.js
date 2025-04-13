const startButton = document.getElementById('start-button')
const questionContainerElement = document.getElementById('question-container')
startButton.addEventListener('click', startGame)
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}
function showQuestion() {

}

function setNextQuestion() {

}

function selectAnswer() {

}

