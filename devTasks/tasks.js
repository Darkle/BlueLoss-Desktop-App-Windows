// @ts-nocheck
const inquirer = require('inquirer')

const { packageApp, createWindowsInstaller, stylusBuild, webpackBuild } = require('./packageApp.js')

const tasks = [
  require('./createEnvFile.js'),
  require('./bumpAppVersion.js'),
  packageApp,
  createWindowsInstaller,
  stylusBuild,
  webpackBuild,
].reduce((obj, func) =>
  ({ ...obj, ...{ [func.name]: func } })
, {})

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
