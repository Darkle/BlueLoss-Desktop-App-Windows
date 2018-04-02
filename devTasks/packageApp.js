// @ts-nocheck
const path = require('path')

const packager = require('electron-packager')
const { MSICreator } = require('electron-wix-msi')
const exeq = require('exeq')
const chalk = require('chalk')

const basePath = path.resolve(__dirname, '..')
const installerImagesPath = path.join(basePath, 'resources', 'msiInstallerImages')
const iconsFolderPath = path.join(basePath, 'resources', 'icons', 'Blue')
const stylusInput = path.join(basePath, 'app', 'settingsWindow', 'renderer', 'assets', 'styles', 'stylus', 'index.styl')
const stylusOutput = path.join(basePath, 'app', 'settingsWindow', 'renderer', 'assets', 'styles', 'css', 'settingsWindowCss-compiled.css')
const appVersion = require(path.join(basePath, 'package.json')).version
const iconName = process.platform === 'darwin' ? 'LANLost-Blue.icns' : 'LANLost-Blue.ico'
const platformBuildFolder = path.join(basePath, 'build', process.platform === 'win32' ? 'windows' : process.platform)
const packageProperties = {
  dir: basePath,
  asar: true,
  arch: 'x64',
  platform: process.platform,
  icon: path.join(iconsFolderPath, iconName),
  overwrite: true,
  prune: true,
  name: 'LANLost',
  'app-copyright': 'MIT License',
  out: platformBuildFolder,
  appBundleId: 'com.darkle.LANLost',
  appCategoryType: 'public.app-category.utilities'
}
const msiCreator = new MSICreator({
  appDirectory: path.join(platformBuildFolder, 'LANLost-win32-x64'),
  description: 'LANLost - A desktop app that locks your computer when a device is lost on your local network',
  exe: 'LANLost',
  name: 'LANLost',
  version: appVersion,
  manufacturer: 'CoopCoding',
  outputDirectory: path.join(platformBuildFolder, 'installer'),
  shortcutFolderName: 'LANLost',
  ui: {
    chooseDirectory: true,
    images: {
      background: path.join(installerImagesPath, 'background.png'),
      banner: path.join(installerImagesPath, 'banner.png'),
    }
  }
})

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

function createWindowsInstaller(){
  console.log(chalk.blue('Creating Windows Installer. Please Wait...'))
  return msiCreator.create()
    .then(() => msiCreator.compile())
}

function packageWin64(){
  return stylusBuild()
    .then(webpackBuild)
    .then(() => {
      console.log(chalk.blue('Packaging Electron App. Please Wait...'))
      return packager(packageProperties)
    })
    .then(createWindowsInstaller)
    .then(() => {
      console.log(chalk.green('Successfully Packaged Electron App!'))
    })
    .catch(err => {
      console.error(chalk.red('There was an error creating the Windows Package'), err)
    })
}

function packageLinux(){
  return stylusBuild()
    .then(webpackBuild)
    .then(() => {
      console.log(chalk.blue('Packaging Electron App. Please Wait...'))
      return packager(packageProperties)
    })
    .then(() => {
      console.log(chalk.green('Successfully Packaged Electron App!'))
    })
    .catch(err => {
      console.error(chalk.red('There was an error creating the Linux Package'), err)
    })
}

function packagemacOS(){
  return stylusBuild()
    .then(webpackBuild)
    .then(() => {
      console.log(chalk.blue('Packaging Electron App. Please Wait...'))
      return packager(packageProperties)
    })
    .then(() => {
      console.log(chalk.green('Successfully Packaged Electron App!'))
    })
    .catch(err => {
      console.error(chalk.red('There was an error creating the MacOS Package'), err)
    })
}


module.exports = {
  packageWin64,
  packageLinux,
  packagemacOS,
  createWindowsInstaller,
  stylusBuild,
  webpackBuild,
}
