// @ts-nocheck
const path = require('path')

const gulp = require('gulp')
const packager = require('electron-packager')
const { MSICreator } = require('electron-wix-msi')

const basePath = path.resolve(__dirname, '..')
const iconsFolderPath = path.join(basePath, 'resources', 'icons', 'Blue')
const appVersion = require(path.join(basePath, 'package.json')).version
const commonPackageProperties = {
  dir: basePath,
  asar: true,
  arch: 'x64',
  overwrite: true,
  prune: true,
  name: 'LANLost',
  'app-copyright': 'MIT License'
}
const windowsPackageOptions = {
  ...commonPackageProperties,
  ...{
    platform: 'win32',
    icon: path.join(iconsFolderPath, 'LANLost-Blue.ico'),
    out: path.join(basePath, 'build', 'Windows'),
  }
}
const linuxPackageOptions = {
  ...commonPackageProperties,
  ...{
    platform: 'win32',
    icon: path.join(iconsFolderPath, 'LANLost-Blue.ico'),
    out: path.join(basePath, 'build', 'Linux'),
  }
}
const macOSPackageOptions = {
  ...commonPackageProperties,
  ...{
    platform: 'darwin',
    icon: path.join(iconsFolderPath, 'LANLost-Blue.icns'),
    out: path.join(basePath, 'build', 'MacOS'),
    'app-version': appVersion,
    'app-bundle-id': 'com.darkle.LANLost',
    'app-category-type': 'public.app-category.utilities'
  }
}
const msiCreator = new MSICreator({
  appDirectory: path.join(basePath, 'build', 'Windows'),
  description: 'LANLost - A desktop app that locks your computer when a device is lost on your local network',
  exe: 'LANLost',
  name: 'LANLost',
  version: appVersion,
  outputDirectory: path.join(basePath, 'build', 'Windows', 'installer'),
  shortcutFolderName: 'LANLost',
  ui : {
    chooseDirectory: true
  }
})


gulp.task('packageWin64', () => {
  console.log('Packaging for Windows 64')
  return packager(windowsPackageOptions)
    .then(() => msiCreator.create())
    .then(() => msiCreator.compile())
    .catch(err => {
      console.error('There was an error creating the Windows Package', err)
    })
})

gulp.task('packageLinux64', () => {
  console.log('Packaging for Linux 64')
  return packager(linuxPackageOptions)
    .catch(err => {
      console.error('There was an error creating the Linux Package', err)
    })
})

gulp.task('packageMacOS', () => {
  console.log('Packaging for MacOS')
  return packager(macOSPackageOptions)
    .catch(err => {
      console.error('There was an error creating the MacOS Package', err)
    })
})


