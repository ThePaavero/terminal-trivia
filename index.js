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

const doRound = async () => {
  const questionObject = getRandomQuestionObject(data)
  const userAnswer = await promptAnswerForQuestion(questionObject)
  const correctAnswer = questionObject.a
  console.log(userAnswer)
  console.log(correctAnswer)
}

const init = () => {
  console.clear()
  console.log(`Welcome to Terminal Trivia!`.bgWhite.black)
  doRound()
}

init()
