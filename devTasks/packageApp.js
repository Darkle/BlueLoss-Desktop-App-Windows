// @ts-nocheck
const path = require('path')

const packager = require('electron-packager')
const { MSICreator } = require('electron-wix-msi')
const exeq = require('exeq')
const chalk = require('chalk')
const del = require('del')
const stringifyObject = require('stringify-object')
const jetpack = require('fs-jetpack')
const Zip = require('node-7z')

const basePath = path.resolve(__dirname, '..')
const installerImagesPath = path.join(basePath, 'resources', 'msiInstallerImages')
const iconsFolderPath = path.join(basePath, 'resources', 'icons', 'Blue')
const stylusInput = path.join(basePath, 'app', 'settingsWindow', 'renderer', 'assets', 'styles', 'stylus', 'index.styl')
const stylusOutput = path.join(basePath, 'app', 'settingsWindow', 'renderer', 'assets', 'styles', 'css', 'settingsWindowCss-compiled.css')
const appVersion = require(path.join(basePath, 'package.json')).version
const iconName = process.platform === 'darwin' ? 'BlueLoss-Blue.icns' : 'BlueLoss-Blue.ico'
const platformBuildFolder = path.join(basePath, 'build', process.platform === 'win32' ? 'windows' : process.platform)
const globsForCleanPlatformFolder = [path.join(platformBuildFolder, '**', '*.*'), path.join(platformBuildFolder, '**'), `!${ platformBuildFolder }`]
const windowsMSIpath = path.join(platformBuildFolder, 'installer', 'BlueLoss.msi')
const packageProperties = {
  dir: basePath,
  asar: true,
  arch: 'x64',
  platform: process.platform,
  icon: path.join(iconsFolderPath, iconName),
  overwrite: true,
  prune: true,
  name: 'BlueLoss',
  'app-copyright': 'MIT License',
  out: platformBuildFolder,
  appBundleId: 'com.darkle.BlueLoss',
  appCategoryType: 'public.app-category.utilities'
}
const msiCreator = new MSICreator({
  appDirectory: path.join(platformBuildFolder, 'BlueLoss-win32-x64'),
  description: 'BlueLoss - A desktop app that locks your computer when a device is lost',
  exe: 'BlueLoss',
  name: 'BlueLoss',
  version: appVersion,
  manufacturer: 'CoopCoding',
  outputDirectory: path.join(platformBuildFolder, 'installer'),
  shortcutFolderName: 'BlueLoss',
  ui: {
    chooseDirectory: true,
    images: {
      background: path.join(installerImagesPath, 'background.png'),
      banner: path.join(installerImagesPath, 'banner.png'),
    }
  }
})
const archive7zip = new Zip()

function stylusBuild(){
  console.log(chalk.blue('Running Stylus Build'))
  return exeq(`stylus ${ stylusInput } -o ${ stylusOutput }`)
    .catch(err => {console.error(err)})
}

function webpackBuild(){
  console.log(chalk.blue('Running Webpack Build'))
  return exeq(`cross-env NODE_ENV=production parallel-webpack`)
    .catch(err => {console.error(err)})
}

/**
 * This is seperate as we want one just for building stylus and webpack
 * that includes a .catch to catch errors on those two tasks - we dont
 * want that .catch in the full package task as we want errors to fall
 * through to the last .catch on that.
 */
function buildWebpackAndStylus(){
  return stylusBuild()
    .then(webpackBuild)
    .catch(err => { console.error(err) })
}

function prepareForPackaging(){
  return stylusBuild()
    .then(webpackBuild)
    .then(() => {
      console.log(chalk.yellow(`Cleaning: \n ${ stringifyObject(globsForCleanPlatformFolder) }`))
      return del(globsForCleanPlatformFolder, { glob: true })
    })
}

function packageApp(){
  console.log(chalk.blue('Packaging Electron App. Please Wait...'))
  return packager(packageProperties)
}

function createWindowsInstaller(){
  console.log(chalk.blue('Creating Windows Installer. Please Wait...'))
  return msiCreator.create()
    .then(() => msiCreator.compile())
    .then(() => jetpack.renameAsync(windowsMSIpath, `BlueLoss-Windows-Installer-(x86_64-${ appVersion }).msi`))
}

function createWindowsPortable() {
  return archive7zip.add(
    path.join(platformBuildFolder, `BlueLoss-Windows-Portable-(x86_64-${ appVersion }).7z`),
    path.join(platformBuildFolder, 'BlueLoss-win32-x64')
  )
}

function packageWin64(){
  return prepareForPackaging()
    .then(packageApp)
    .then(createWindowsInstaller)
    .then(createWindowsPortable)
    .then(packagingSuccess, packagingError)
}

function packageLinux64(){
  return prepareForPackaging()
    .then(packageApp)
    .then(packagingSuccess, packagingError)
}

function packageMacOS(){
  return prepareForPackaging()
    .then(packageApp)
    .then(packagingSuccess, packagingError)
}

function packagingSuccess(){
  console.log(chalk.green('Successfully Packaged Electron App!'))
}

function packagingError(err){
  console.error(chalk.red(`There was an error creating the ${ platformBuildFolder } package`), err)
}


module.exports = {
  packageWin64,
  packageLinux64,
  packageMacOS,
  createWindowsInstaller,
  buildWebpackAndStylus,
}
