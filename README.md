# LANLost - lock your computer when a device is lost

## Synopsis

LANLost is a desktop app that locks your computer when a device on the network is lost. It works on either WiFi or an Ethernet network.

## Installation

- Basic: 

  - Download [here](https://github.com/Darkle/LANLost/releases) and install for your OS.

- Advanced:

  - For users that don't want to run the precompiled binaries, you can clone this repo, then run the following commands:

    - `npm run createEnvFile`

    - `npm install`

    - `npm start`

## Screenshots

![LANLost Status WIndow](https://github.com/Darkle/LANLost/raw/master/resources/readmeMedia/LANLost-Settings-Status.png)

![LANLost Settings Window](https://github.com/Darkle/LANLost/raw/master/resources/readmeMedia/LANLost-Settings.png)

## How To Use

When you run LANLost, it sits in your system tray (or menu bar on MacOS) and searches for devices on your network. 

#### System Tray (Menu Bar) Options:

To open the LANLost settings/status window Double clicking on the system tray icon. Alternatively, you can right-click the icon in the system tray - this will also give you the option to show the settings/status window as well as enable/disable LANLost, or quit the app.

#### Adding A Device:

With the LANLost settings/status window open, you can now add a device that LANLost is supposed to look for in the scan. Note: the first scan on startup may not immediately show all your devices on the network - it may take till the second scan for them to appear.

LANLost scans the network once every 30 seconds. If the device you have added to look for is not found, and enough time has passed since it was last seen on the network, it will lock the computer LANLost is running on. The amount of time passed that it checks for is configurable in the settings.

#### Settings:

The following settings are configurable in the LANLost settings window:

- **Enable/Disable LANLost** (default: enabled): You can enable/disable LANLost from either the system tray or the status window (see screenshot below)

- **Run On System Startup** (default: true)

- **Tray Icon Color** (default: white): You can change the system tray (or menu bar) icon color to either white or blue

- **Time To Lock** (default: 2 minutes): This determins how long LANLost should wait before locking the computer after the device it's looking for on the network has been lost

- **Report Errors** (default: true): This will report errors to [Rollbar.com](https://rollbar.com). This helps development of the app.  

- Scan Range:

  - **Hosts Scan Range Start** (default: 2)

  - **Hosts Scan Range End** (default: 254)

  This is the start and end range LANLost will scan to look for devices on your network. For example, if your network address is 192.168.1, and the Hosts Scan Range Start is 2 and the Hosts Scan Range End is 254, then LANLost will scan from IP address 192.168.1.2 up to 192.168.1.254 

  **Host Scan Timeout** (default: 3000 milliseconds): How many seconds to wait when trying to connect to a device during a scan before timing out. This is not the same as the Time To Lock - when LANLost scans all the IP addresses specified in the scan range, it may take some time for a device to respond. If it doesn't respond within the Host Scan Timeout time, it is ignored.

- **Download OUI File Updates** (default: true): LANLost periodically checks for updates to the IEEE MAC vendors list in order to give you the vendor name for devices on your network.

- **User Debugger** (default: disabled): Enabling this will show a debug window with information that may help you diagnose any issues.

## Support

Please open an issue for support here: https://github.com/Darkle/LANLost/issues

## Donate

###### Buy Me A Coffee

<a href="https://www.buymeacoffee.com/2yhzJxd4B" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png?" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

###### Bitcoin

Click the image below if you have a bitcoin app installed, or use it as a QR code. Or copy the address manually below.

[![Bitcoin Address QR Code](https://github.com/Darkle/LANLost/raw/master/resources/readmeMedia/Bitcoin-QR-Code.png)](bitcoin:1M6FmSZUJJzj4n3qLkSh2s19dqmXeYXrFT)

`1M6FmSZUJJzj4n3qLkSh2s19dqmXeYXrFT`

## Built With

- [LightScript](http://www.lightscript.org/)

- [Electron](https://electronjs.org/)

- [Hyperapp](https://github.com/hyperapp/hyperapp)

- [Xel Toolkit](https://xel-toolkit.org/)
