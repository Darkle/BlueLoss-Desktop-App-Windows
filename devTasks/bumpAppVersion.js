// @ts-nocheck
const path = require('path')

const gulp = require('gulp')
const jetpack = require('fs-jetpack')
const exeq = require('exeq')
const semver = require('semver')

const basePath = path.join(__dirname, '..')
const currentAppVersion = require(path.join(basePath, 'package.json')).version
const updateInfoJsonFilePath = path.join(basePath, 'updateInfo.json')
const settingsDefaultsFilePath = path.join(basePath, 'app', 'settings', 'settingsDefaults.lsc')

const newAppVersion = semver.inc(currentAppVersion, 'minor')

/**
 * We bump the package.json with npm (which also adds a git tag with the version),
 * also updateInfo.json and in settingsDefaults.lsc.
 */
gulp.task('bumpVersion', () => {
  console.log(`running 'npm version ${ newAppVersion }' and updating version in updateInfo.json and in settingsDefaults.lsc`)
  return exeq(`npm version ${ newAppVersion }`)
    .then(() => jetpack.writeAsync(updateInfoJsonFilePath, { latestVersion: newAppVersion }))
    .then(() => jetpack.readAsync(settingsDefaultsFilePath))
    .then(result =>
      result.split(/\r\n?|\n/).map(line => {
        if(!line.includes('skipUpdateVersion') || line.includes('string')) {
          return line
        }
        return `skipUpdateVersion: '${ newAppVersion }',`
      }).join('\n')
    )
    .then(newFileData =>
      jetpack.writeAsync(settingsDefaultsFilePath, newFileData)
    )
    .then(() => {
      console.log(`Successfully bumped LANLost version to ${ newAppVersion }`)
    })
    .catch(err => {
      console.error('There was an error running bumpVersion', err)
    })
})

