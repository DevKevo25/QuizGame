const questions = [
  {
    id: 1,
    text: "What does DOM stand for?",
    options: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Digital Object Model"],
    correctAnswer: 0
  },
  {
    id: 2,
    text: "Which of the following is a primitive data type in JavaScript?",
    options: ["Object", "Array", "Symbol", "Function"],
    correctAnswer: 2
  },
  {
    id: 3,
    text: "What will `console.log(typeof null)` output?",
    options: ["null", "undefined", "object", "boolean"],
    correctAnswer: 2
  },
  {
    id: 4,
    text: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "All of the above"],
    correctAnswer: 3
  },
  {
    id: 5,
    text: "What is the result of `'5' + 3` in JavaScript?",
    options: ["8", "53", "NaN", "undefined"],
    correctAnswer: 1
  },
  {
    id: 6,
    text: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: 0
  },
  {
    id: 7,
    text: "What does `===` operator do?",
    options: ["Assigns value", "Compares values only", "Compares values and type", "Compares type only"],
    correctAnswer: 2
  },
  {
    id: 8,
    text: "Which built-in method calls a function for each element in an array?",
    options: ["map()", "filter()", "forEach()", "reduce()"],
    correctAnswer: 2
  },
  {
    id: 9,
    text: "What is the output of `Boolean('false')`?",
    options: ["false", "true", "undefined", "null"],
    correctAnswer: 1
  },
  {
    id: 10,
    text: "Which symbol is used for single-line comments in JavaScript?",
    options: ["/* */", "<!-- -->", "//", "#"],
    correctAnswer: 2
  }
]

//////// PROGRAM START /////////
const welcomeDiv = document.querySelector('.welcome')
const startBtn = document.getElementById('startBtn')
const quizContent = document.getElementById('quizContent')
const container = document.querySelector('.container')
const quizNumber = document.getElementById('quizNumber')
const score = document.getElementById('score')
const answers = document.getElementById('answers')
const resultModal = document.querySelector('.resultModal')

let quizIndex = 0;
let quizScore = 0;
let disabled = false

////////// LOAD THE QUESTIONS TO DOM ////////

startBtn.addEventListener("click", () => {
  welcomeDiv.classList.remove('show')
  container.classList.add('show')
})

function addToDom(){
  if(quizIndex === questions.length){
    return showResult()
  }
  quizContent.textContent = questions[quizIndex].text
  quizNumber.textContent = `Question ${quizIndex+1} of ${questions.length}`
  score.textContent = `Score: ${quizScore}`
  
  answers.innerHTML = ''
  for(let i = 0; i < questions[quizIndex].options.length; i++){
    const li = document.createElement('li')

    li.textContent = `${questions[quizIndex].options[i]}`
    answers.appendChild(li)
    
    li.addEventListener('click', handleSubmit)
  }
}

////// APPEND QUESTIONS ON FORM LOAD ///////
window.addEventListener("load", () => {
  addToDom()
})


async function handleSubmit(e){
  if(disabled) return
  let userChoice = e.target.textContent
    ////// UPDATE SCORE /////
  updateScore(userChoice, e)
  ///// next question //////
  
  disabled=true
  await new Promise(res => setTimeout(res, 1000))
  quizIndex++
  disabled=false
  addToDom()
}

function updateScore(userChoice, event) {
  if(disabled) return
  let answerIndex = questions[quizIndex].correctAnswer;
  let correctAnswerText = questions[quizIndex].options[answerIndex];
  
  if (userChoice === correctAnswerText) {
    quizScore++;
    score.textContent = `Score: ${quizScore}`;
    event.target.style.background = '#2ce32c'
    event.target.style.color = 'black'
  }else{
    event.target.style.background = 'tomato'
    event.target.style.color = 'black'
  }
}

function showResult(){
  container.classList.remove('show')
  resultModal.classList.add('show')
  document.getElementById('finalScore').textContent = `You got ${quizScore}/${questions.length}`
  const comment = document.getElementById('comment')
  if(quizScore >= 8){
    comment.textContent = "Excellent"
    comment.style.background = '#1feb1f'
  }else if(quizScore >= 5){
    comment.textContent = "Pass"
    comment.style.background = 'yellow'
  }else if(quizScore >= 3){
    comment.textContent = "Fair"
    comment.style.background = "#eb681f"
  }
  else{
    comment.textContent = "Fail"
    comment.style.background = 'red'
  }
}
function playAgain(){
  resultModal.classList.remove('show')
  container.classList.add('show')
  quizIndex=0;
  quizScore=0;
  addToDom();
}