# BlueLoss

## Synopsis

BlueLoss is a desktop app that locks your computer when a Bluetooth device is no longer present.

## Requirements:

- Windows 10

## Installation

- Basic:

  - Download [here](https://github.com/Darkle/BlueLoss/releases) and install. A portable version is also available.

- Advanced:

  - For users that don't want to run the precompiled binaries, you can clone this repo, then run the following commands:
    - `npm install`

    - then `npm run devTasks` (select `createEnvFile`)

    - then `npm start`

- Device App:

  - For Blueloss to work properly, you also need to install an app on your device.
  - Android:
  - iOS:

## Screenshots

![BlueLoss Status WIndow](https://github.com/Darkle/BlueLoss/raw/master/resources/readmeMedia/BlueLoss-Settings-Status.png)

![BlueLoss Settings Window](https://github.com/Darkle/BlueLoss/raw/master/resources/readmeMedia/BlueLoss-Settings.png)

## How To Use

When you run BlueLoss, it sits in your system tray (or menu bar on MacOS) and searches for discoverable Bluetooth devices.

#### System Tray (Menu Bar) Options:

To open the BlueLoss settings/status window Double clicking on the system tray icon. Alternatively, you can right-click the icon in the system tray - this will also give you the option to show the settings/status window as well as enable/disable BlueLoss, or quit the app.

#### Adding A Device:

With the BlueLoss settings/status window open, you can now add a device that BlueLoss is supposed to look for in the scan. Note: it may take about 20 seconds for devices to show up.

BlueLoss scans for discoverable Bluetooth devices once every 20 seconds. If the device you have added to look for is not found, and enough time has passed since it was last seen on the network, it will lock the computer BlueLoss is running on. The amount of time passed that it checks for is configurable in the settings.

#### Settings:

The following settings are configurable in the BlueLoss settings window:

- **Enable/Disable BlueLoss** (default: enabled): You can enable/disable BlueLoss from either the system tray or the status window (see screenshot above).

- **Run On System Startup** (default: true)

- **Tray Icon Color** (default: blue): You can change the system tray (or menu bar) icon color to either white or blue.

- **Time To Lock** (default: 3 minutes): This determines how long BlueLoss should wait before locking the computer after the device it's looking for on the network has been lost.

- **Report Errors** (default: true): This will report errors to [Rollbar.com](https://rollbar.com). This helps development of the app.

- **User Debugger** (default: disabled): Enabling this will show a debug window with information that may help you diagnose any issues.

## Security Info:

BlueLoss searches for devices that are discoverable - this means that the device is currently broadcasting its Bluetooth information. By default most devices don't do this all the time for security reasons.

We get around this with an app on the device that makes it always broadcast its Bluetooth details. Obviously there are security issues with that, so we try to mitigate the risk by only broadcasting when you are in a trusted location (e.g. work/home). Having said that, if you are in need of something that is very secure, Blueloss is probably not for you.

Also, BlueLoss does not pair with the Bluetooth device, it only matches the Bluetooth MAC address. This means you can fool BlueLoss if you spoof a device's MAC address.

## Support

Please open an issue for support here: https://github.com/Darkle/BlueLoss/issues

## Donate

###### Buy Me A Coffee

<a href="https://www.buymeacoffee.com/2yhzJxd4B" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png?" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

###### Bitcoin

Click the image below if you have a bitcoin app installed, or use it as a QR code. Or copy the address manually below.

[![Bitcoin Address QR Code](https://github.com/Darkle/BlueLoss/raw/master/resources/readmeMedia/Bitcoin-QR-Code.png)](bitcoin:1M6FmSZUJJzj4n3qLkSh2s19dqmXeYXrFT)

`1M6FmSZUJJzj4n3qLkSh2s19dqmXeYXrFT`

## Built With

- [LightScript](http://www.lightscript.org/)

- [Electron](https://electronjs.org/)

- [Hyperapp](https://github.com/hyperapp/hyperapp)

- [Xel Toolkit](https://xel-toolkit.org/)


[![Known Vulnerabilities](https://snyk.io/test/github/darkle/blueloss/badge.svg?targetFile=package.json)](https://snyk.io/test/github/darkle/blueloss?targetFile=package.json)
