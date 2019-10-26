const prompts = require('prompts')
const fs = require('fs')
require('colors')

const getRandomQuestionObject = (data) => {
  return data[Math.round(Math.random() * data.length - 1)]
}

const promptAnswerForQuestion = async (question) => {
  return await prompts({
    type: 'text',
    name: 'answer',
    message: question.q,
  })
}

const init = () => {
  console.clear()
  console.log(`Welcome to Terminal Trivia!`.bgWhite.black)
  promptAnswerForQuestion(getRandomQuestionObject(JSON.parse(fs.readFileSync('database.json'))))
}

init()
