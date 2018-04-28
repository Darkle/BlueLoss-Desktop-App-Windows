// @ts-nocheck
const path = require('path')

const jetpack = require('fs-jetpack')
const exeq = require('exeq')
const semver = require('semver')
const inquirer = require('inquirer')

const basePath = path.join(__dirname, '..')
const currentAppVersion = require(path.join(basePath, 'package.json')).version
const updateInfoJsonFilePath = path.join(basePath, 'updateInfo.json')
const settingsDefaultsFilePath = path.join(basePath, 'app', 'settings', 'settingsDefaults.lsc')

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
    .then(() => jetpack.writeAsync(updateInfoJsonFilePath, { latestVersion: newAppVersion }))
    .then(() => jetpack.readAsync(settingsDefaultsFilePath))
    .then(result =>
      result.split(/\r\n?|\n/).map(line => {
        if(!line.includes('skipUpdateVersion') || line.includes('string')) {
          return line
        }
        return `  skipUpdateVersion: '${ newAppVersion }',`
      }).join('\n')
    )
    .then(newFileData =>
      jetpack.writeAsync(settingsDefaultsFilePath, newFileData)
    )
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
