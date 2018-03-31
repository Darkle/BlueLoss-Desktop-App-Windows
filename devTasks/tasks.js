// @ts-nocheck
const inquirer = require('inquirer')

const { packageWin64, packageLinux64, packageMacOS, } = require('./packageApp.js')

const tasks = [
  require('./createEnvFile.js'),
  require('./bumpAppVersion.js'),
  packageWin64,
  packageLinux64,
  packageMacOS,
].reduce((obj, func) =>
  ({ ...obj, ...{ [func.name]: func } })
, {})

const promptOptions = {
  type: 'list',
  name: 'taskName',
  message: 'Choose Which Gulp Task To Run',
  choices: Object.keys(tasks)
}

inquirer.prompt([promptOptions])
  .then(({ taskName }) => {
    console.log(`running ${ taskName }`)
    tasks[taskName]()
  })
