// @ts-nocheck
const path = require('path')

const exeq = require('exeq')
const semver = require('semver')
const inquirer = require('inquirer')

const basePath = path.join(__dirname, '..')
const currentAppVersion = require(path.join(basePath, 'package.json')).version

const promptOptions = {
  type: 'list',
  name: 'bumpType',
  message: 'Choose What Type Of Version Bump',
  default: 'patch',
  choices: ['major', 'minor', 'patch']
}
let newAppVersion = null
/**
 * We bump the package.json with npm (which also adds a git tag with the version),
 * also updateInfo.json and in settingsDefaults.lsc.
 */
function bumpVersion(){
  return inquirer.prompt([promptOptions])
    .then(({ bumpType }) => {
      newAppVersion = semver.inc(currentAppVersion, bumpType)
      console.log(`running 'npm version ${ newAppVersion }' and updating version in updateInfo.json and in settingsDefaults.lsc`)
    })
    .then(() => exeq(`npm version ${ newAppVersion }`))
    .then(() => {
      console.log(`Successfully bumped BlueLoss version to ${ newAppVersion }`)
    })
    .catch(err => {
      console.error('There was an error running bumpVersion', err)
    })
}

module.exports = {
  bumpVersion
}
