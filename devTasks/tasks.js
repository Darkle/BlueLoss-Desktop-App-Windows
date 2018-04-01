// @ts-nocheck
const inquirer = require('inquirer')

const tasks = {
  ...require('./createEnvFile.js'),
  ...require('./bumpAppVersion.js'),
  ...require('./packageApp.js'),
}

const promptOptions = {
  type: 'list',
  name: 'taskName',
  message: 'Choose Which Task To Run',
  choices: Object.keys(tasks)
}

inquirer.prompt([promptOptions])
  .then(({ taskName }) => {
    console.log(`running ${ taskName }`)
    tasks[taskName]()
  })
