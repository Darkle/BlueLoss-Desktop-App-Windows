// @ts-nocheck
const path = require('path')

const packager = require('electron-packager')
const { MSICreator } = require('electron-wix-msi')

const basePath = path.resolve(__dirname, '..')
const iconsFolderPath = path.join(basePath, 'resources', 'icons', 'Blue')
const appVersion = require(path.join(basePath, 'package.json')).version
const iconName = process.platform === 'darwin' ? 'LANLost-Blue.icns' : 'LANLost-Blue.ico'
const platformBuildFolder = path.join(basePath, 'build', process.platform)
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
  appDirectory: path.join(basePath, 'build', 'Windows'),
  description: 'LANLost - A desktop app that locks your computer when a device is lost on your local network',
  exe: 'LANLost',
  name: 'LANLost',
  version: appVersion,
  outputDirectory: path.join(platformBuildFolder, 'installer'),
  shortcutFolderName: 'LANLost',
  ui: {
    chooseDirectory: true
  }
})


function packageWin64(){
  console.log('Packaging for Windows 64')
  return packager(packageProperties)
    .then(() => msiCreator.create())
    .then(() => msiCreator.compile())
    .catch(err => {
      console.error('There was an error creating the Windows Package', err)
    })
}

function packageLinux64() {
  console.log('Packaging for Linux 64')
  return packager(packageProperties)
    .catch(err => {
      console.error('There was an error creating the Linux Package', err)
    })
}

function packageMacOS() {
  console.log('Packaging for MacOS')
  return packager(packageProperties)
    .catch(err => {
      console.error('There was an error creating the MacOS Package', err)
    })
}


module.exports = {
  packageWin64,
  packageLinux64,
  packageMacOS,
}
