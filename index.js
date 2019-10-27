const prompts = require('prompts')
const data = require('./database')
require('colors')

const getRandomQuestionObject = (data) => {
  return data[Math.round(Math.random() * data.length - 1)]
}

const promptAnswerForQuestion = async (question) => {
  const answerObject = await prompts({
    type: 'text',
    name: 'answer',
    message: question.q,
  })
  return answerObject.answer
}

const doOnCorrectAnswer = (answer) => {
  console.log(`${answer} is absolutely correct!`.green)
}

const doOnIncorrectAnswer = (correctAnswer) => {
  // ...
  console.log(`Wrong, sorry!`.red + `\nThe correct answer would've been "${correctAnswer}"`.gray)
}

const userAnswerIsCorrect = (userAnswer, correctAnswer) => {
  // @todo Do better than this, the data is pretty crappy.
  /*
  Ideas:
    - If the correct answer starts with "The ", remove it and compare again.
    - Sometimes the correct answers are words instead of numbers, like "Eleven." When the answer is numerical we want to accept both textual version and actual numbers.
  */
  return userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()
}

const doRound = async () => {
  console.clear()
  const questionObject = getRandomQuestionObject(data)
  const userAnswer = await promptAnswerForQuestion(questionObject)
  const correctAnswer = questionObject.a
  if (userAnswerIsCorrect(userAnswer, correctAnswer)) {
    doOnCorrectAnswer(userAnswer)
  } else {
    doOnIncorrectAnswer(correctAnswer)
  }
  setTimeout(doRound, 2000)
}

const init = () => {
  console.clear()
  console.log(`Welcome to Terminal Trivia!`.bgWhite.black)
  doRound()
}

init()
