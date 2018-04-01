// @ts-nocheck
const path = require('path')

const packager = require('electron-packager')
const { MSICreator } = require('electron-wix-msi')

const basePath = path.resolve(__dirname, '..')
const installerImagesPath = path.join(basePath, 'resources', 'msiInstallerImages')
const iconsFolderPath = path.join(basePath, 'resources', 'icons', 'Blue')
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
  appDirectory: path.join(basePath, 'build', 'windows'),
  description: 'LANLost - A desktop app that locks your computer when a device is lost on your local network',
  exe: 'LANLost',
  name: 'LANLost',
  version: appVersion,
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

function createWindowsInstaller(){
  return msiCreator.create()
    .then(() => msiCreator.compile())
}

function packageWin64(){
  return packager(packageProperties)
    .then(createWindowsInstaller)
    .catch(err => {
      console.error('There was an error creating the Windows Package', err)
    })
}

function packageLinux64() {
  return packager(packageProperties)
    .catch(err => {
      console.error('There was an error creating the Linux Package', err)
    })
}

function packageMacOS() {
  return packager(packageProperties)
    .catch(err => {
      console.error('There was an error creating the MacOS Package', err)
    })
}


module.exports = {
  packageWin64,
  createWindowsInstaller,
  packageLinux64,
  packageMacOS,
}
