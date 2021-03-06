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
const appVersion = require(path.join(basePath, 'package.json')).version
const buildFolder = path.join(basePath, 'build')
const globsForCleaningBuildFolder = [path.join(buildFolder, '**', '*.*'), path.join(buildFolder, '**'), `!${ buildFolder }`]
const windowsMSIpath = path.join(buildFolder, 'installer', 'BlueLoss.msi')
const packageProperties = {
  dir: basePath,
  asar: true,
  arch: 'x64',
  platform: process.platform,
  icon: path.join(iconsFolderPath, 'BlueLoss-Blue.ico'),
  overwrite: true,
  prune: true,
  name: 'BlueLoss',
  'app-copyright': 'MIT License',
  out: buildFolder,
  appBundleId: 'com.darkle.BlueLoss',
  appCategoryType: 'public.app-category.utilities'
}
const msiCreator = new MSICreator({
  appDirectory: path.join(buildFolder, 'BlueLoss-win32-x64'),
  description: 'BlueLoss - A desktop app that locks your computer when a device is lost',
  exe: 'BlueLoss',
  name: 'BlueLoss',
  version: appVersion,
  manufacturer: 'CoopCoding',
  outputDirectory: path.join(buildFolder, 'installer'),
  shortcutFolderName: 'BlueLoss',
  ui: {
    chooseDirectory: true,
    images: {
      background: path.join(installerImagesPath, 'background.png'),
      banner: path.join(installerImagesPath, 'banner.png'),
    }
  }
})

function packageWin64() {
  return prepareForPackaging()
  .then(packageApp)
  .then(createWindowsInstaller)
  .then(createZip)
  .then(() => {
    console.log(chalk.green('Successfully Built App!'))
    })
    .catch(err => {
      console.error(chalk.red(`There was an error creating the ${buildFolder} package`), err)
    })
  }

  function webpackBuild(){
    console.log(chalk.blue('Running Webpack Build'))
  return exeq(`cross-env NODE_ENV=production parallel-webpack`)
}

function prepareForPackaging(){
  console.log(chalk.yellow(`Cleaning: \n ${stringifyObject(globsForCleaningBuildFolder)}`))
  return del(globsForCleaningBuildFolder, { glob: true }).then(webpackBuild)
}

function packageApp(){
  console.log(chalk.blue('Packaging Electron App. Please Wait...'))
  return packager(packageProperties)
}

function createWindowsInstaller(){
  console.log(chalk.blue('Creating Windows Installer. Please Wait...'))
  return msiCreator.create()
  .then(() => msiCreator.compile())
  .then(() => jetpack.renameAsync(windowsMSIpath, `BlueLoss-Windows-Installer-x86_64-${ appVersion }.msi`))
}

function createZip() {
  console.log(chalk.blue('Creating Zip. Please Wait...'))
  const archive7zip = new Zip()
  return archive7zip.add(
    path.join(buildFolder, `BlueLoss-Windows-x86_64-${ appVersion }.7z`),
    path.join(buildFolder, 'BlueLoss-win32-x64')
  )
}

module.exports = {
  packageWin64,
}
