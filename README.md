# BlueLoss

## Synopsis

BlueLoss is a desktop app that locks your computer when a device on the network is lost. It works on either WiFi or an Ethernet network.

## Installation

- Basic:

  - Download [here](https://github.com/Darkle/BlueLoss/releases) and install for your OS.

- Advanced:

  - For users that don't want to run the precompiled binaries, you can clone this repo, then run the following commands:
    - `npm run devTasks` (select `createEnvFile`)

    - then `npm install`

    - then `npm start`

## Screenshots

![BlueLoss Status WIndow](https://github.com/Darkle/BlueLoss/raw/master/resources/readmeMedia/BlueLoss-Settings-Status.png)

![BlueLoss Settings Window](https://github.com/Darkle/BlueLoss/raw/master/resources/readmeMedia/BlueLoss-Settings.png)

## How To Use

When you run BlueLoss, it sits in your system tray (or menu bar on MacOS) and searches for devices on your network.

#### System Tray (Menu Bar) Options:

To open the BlueLoss settings/status window Double clicking on the system tray icon. Alternatively, you can right-click the icon in the system tray - this will also give you the option to show the settings/status window as well as enable/disable BlueLoss, or quit the app.

#### Adding A Device:

With the BlueLoss settings/status window open, you can now add a device that BlueLoss is supposed to look for in the scan. Note: the first scan on startup may not immediately show all your devices on the network - it may take till the second scan for them to appear.

BlueLoss scans the network once every 30 seconds. If the device you have added to look for is not found, and enough time has passed since it was last seen on the network, it will lock the computer BlueLoss is running on. The amount of time passed that it checks for is configurable in the settings.

#### Settings:

The following settings are configurable in the BlueLoss settings window:

- **Enable/Disable BlueLoss** (default: enabled): You can enable/disable BlueLoss from either the system tray or the status window (see screenshot above)

- **Run On System Startup** (default: true)

- **Tray Icon Color** (default: blue): You can change the system tray (or menu bar) icon color to either white or blue

- **Time To Lock** (default: 1 minute): This determins how long BlueLoss should wait before locking the computer after the device it's looking for on the network has been lost

- **Report Errors** (default: true): This will report errors to [Rollbar.com](https://rollbar.com). This helps development of the app.

- **User Debugger** (default: disabled): Enabling this will show a debug window with information that may help you diagnose any issues.

## Limitations (Important, Please Read):

- Android:

  - A lot of Android devices will temporarily disable WiFi when the device has gone to sleep & does not have it's power cable plugged in & has been asleep for about an hour. I have yet to find a solution to this issue. If you google for <a href="https://www.google.com/search?q=wifi+sleep+android" target="_blank">wifi sleep android</a> you can see that it's a pretty common issue with lots of suggestions, of which I tried a bunch. The only way that I have found to prevent your phone from disabling it's WiFi when asleep is to make sure you have your phone's power cable plugged in, and to have your WiFi advanced settings for "Keep WiFi on during sleep" set to "Always".

- iOS:

  - iOS seems to do the same and disables the wifi when the device is asleep. It seems if you plug the device in to a power source it should stay connected to WiFi when the device is locked.

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
