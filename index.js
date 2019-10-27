const prompts = require('prompts')
let data = require('./database')
require('colors')

let usedQuestionObjects = []

const getRandomQuestionObject = (data) => {
  const result = data[Math.round(Math.random() * data.length - 1)]
  if (usedQuestionObjects.includes(result)) {
    // We've already given this question object. Try again.
    return getRandomQuestionObject(data)
  }
  usedQuestionObjects.push(result)
  return result
}

const promptAnswerForQuestion = async (question) => {
  const answerObject = await prompts({
    type: 'text',
    name: 'answer',
    message: question.q,
  })
  return answerObject.answer ? answerObject.answer : ''
}

const doOnCorrectAnswer = (answer) => {
  console.log(`${answer} is absolutely correct!`.green)
}

const doOnIncorrectAnswer = (userAnswer, correctAnswer) => {
  if (userAnswer.trim() === '') {
    return console.log(`The correct answer would've been "${correctAnswer}"`.gray)
  }
  console.log(`"${userAnswer}" is wrong, sorry!`.red + `\nThe correct answer would've been "${correctAnswer}"`.gray)
}

const userAnswerIsCorrect = (userAnswer, correctAnswer) => {
  // Start with a direct comparison.
  if (userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
    // No guess work needed, nice!
    return true
  }

  /*
  Ideas:
    - Sometimes the correct answers are words instead of numbers, like "Eleven." When the answer is numerical we want to accept both textual version and actual numbers.
    - Sometimes the correct answers like "3 times", maybe try again with removing the "times" part
    - Some answer strings are in fact ENUM types of arrays (comma separated), and at least in some of the question, the question string states something like "Name at least one of [...]". In this case, break the options up and accept any of them.
    - Singular vs. plural; try again with adding an "s" to the user's answer, for example
    - Try again with "The" removed
    - Try again with adding "The" to user's answer
    - Try again with "a" and "an" removed
    - Try again with "it" and "its" removed
    - Try again with apostrophes removed
    - Try again with quotation marks removed
    - Try again if the correct answer is short and has a comma. Match again with the part before the comma (e.g. "Dallas, Texas" -> "Dallas" should be considered correct).
    - Try again if the correct answer is short and has " - " in it. Match again with the part before the " - " (e.g. "Alcatraz - main prison block" -> "Alcatraz" should be considered correct).
  */
  return false
}

const doRound = async () => {
  console.clear()
  const questionObject = getRandomQuestionObject(data)
  const userAnswer = await promptAnswerForQuestion(questionObject)
  const correctAnswer = questionObject.a
  if (userAnswerIsCorrect(userAnswer, correctAnswer)) {
    doOnCorrectAnswer(correctAnswer)
  } else {
    doOnIncorrectAnswer(userAnswer, correctAnswer)
  }
  setTimeout(doRound, 2000)
}

const cleanUpDataObject = () => {
  data = data.map(item => {
    item.q = item.q.replace(/�/g, '')
    item.a = item.a.replace(/�/g, '')
    return item
  })
}

const init = () => {
  console.clear()
  cleanUpDataObject()
  console.log(`Welcome to Terminal Trivia!`.bgWhite.black)
  doRound()
}

init()
