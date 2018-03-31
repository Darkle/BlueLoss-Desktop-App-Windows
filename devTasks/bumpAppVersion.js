// @ts-nocheck
const path = require('path')

const gulp = require('gulp')
const jetpack = require('fs-jetpack')
const exeq = require('exeq')
const moment = require('moment')

const updateInfoJsonFilePath = path.join(__dirname, '..', 'updateInfo.json')
const settingsDefaultsFilePath = path.join(__dirname, '..', 'app', 'settings', 'settingsDefaults.lsc')

const newVersionString = `${ moment().year() }.${ moment().month() + 1 }.${ moment().date() }`

/**
 * We bump the package.json with npm (which also adds a git tag with the version),
 * also updateInfo.json and in settingsDefaults.lsc.
 */
gulp.task('bumpVersion', () => {
  console.log(`running 'npm version ${ newVersionString }' and updating version in updateInfo.json and in settingsDefaults.lsc`)
  return exeq(`npm version ${ newVersionString }`)
    .then(() => jetpack.writeAsync(updateInfoJsonFilePath, { latestVersion: newVersionString }))
    .then(() => jetpack.readAsync(settingsDefaultsFilePath))
    .then(result =>
      result.split(/\r\n?|\n/).map(line => {
        if(!line.includes('skipUpdateVersion') || line.includes('string')) {
          return line
        }
        return `skipUpdateVersion: '${ newVersionString }',`
      }).join('\n')
    )
    .then(newFileData =>
      jetpack.writeAsync(settingsDefaultsFilePath, newFileData)
    )
    .then(() => {
      console.log('Successfully bumped LANLost version!')
    })
    .catch(err => {
      console.error('There was an error running bumpVersion', err)
    })
})

