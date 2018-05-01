// @ts-nocheck
const inquirer = require('inquirer')

const tasks = {
  ...require('./snyk.js'),
  ...require('./createEnvFile.js'),
  ...require('./bumpAppVersion.js'),
  ...require('./packageApp.js'),
}

const promptOptions = {
  type: 'list',
  name: 'taskName',
  message: 'Choose Which Task To Run',
  choices: Object.keys(tasks),
  pageSize: 12
}

inquirer.prompt([promptOptions])
  .then(({ taskName }) => {
    console.log(`running ${ taskName }`)
    tasks[taskName]()
  })
