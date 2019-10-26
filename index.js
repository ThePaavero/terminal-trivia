const prompt = require('prompts')
const _ = require('lodash')
const fs = require('fs')
require('colors')

const data = JSON.parse(fs.readFileSync('database.json'))
const shuffledQuestions = _.shuffle(data)

console.log(shuffledQuestions)
