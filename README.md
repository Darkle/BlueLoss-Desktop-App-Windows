# LANLost

## Synopsis

LANLost is a desktop app that locks your computer when a device on the network is lost. It works on either a WiFi network or an Ethernet network.

## Installation

Download [here](https://github.com/Darkle/LANLost/releases) and install for your OS.

For users that don't want to run the precompiled binaries, you can clone this repo, then

## How To Use

When you run LANLost, it sits in your system tray (or menu bar on MacOS) and searches for devices on your network. 

#### System Tray (Menu Bar) Options:

To open the LANLost settings/status window Double clicking on the system tray icon. Alternatively, you can right-click the icon in the system tray - this will also give you the option to show the settings/status window, as well as enable/disable LANLost, or quit the app.

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

  This is the start and end range LANLost will scan to look for devices on your network. e.g. if your network address is 192.168.1, and the Hosts Scan Range Start is 2 and the Hosts Scan Range End is 254, then LANLost will scan from IP address 192.168.1.2 up to 192.168.1.254

- **Host Scan Timeout** (default: 3000 milliseconds): How many seconds to wait when trying to connect to a device during a scan before timing out. This is not the same as the Time To Lock - when LANLost scans all the IP addresses specified in the scan range, it may take some time for a device to respond. If it doesn't respond within the Host Scan Timeout time, it is ignored.

- **Download OUI File Updates** (default: true): LANLost periodically checks for updates to the IEEE MAC vendors list in order to give you the vendor name for devices on your network.

- **User Debugger** (default: disabled): Enabling this will show a debug window with information that may help you diagnose any issues.

## Screenshots

![LANLost Status WIndow](https://github.com/Darkle/LANLost/raw/master/resources/readmeMedia/LANLost-Settings-Status.png)

![LANLost Settings Window](https://github.com/Darkle/LANLost/raw/master/resources/readmeMedia/LANLost-Settings.png)

## Support

- <style>
.bmc-button img {
    width: 27px !important;
    margin-bottom: 1px !important;
    box-shadow: none !important;
    border: none !important;
    vertical-align: middle !important;
}

.bmc-button {
    line-height: 36px !important;
    height: 37px !important;
    text-decoration: none !important;
    display: inline-flex !important;
    color: #FFFFFF !important;
    background-color: #FF813F !important;
    border-radius: 3px !important;
    border: 1px solid transparent !important;
    padding: 0px 9px !important;
    font-size: 17px !important;
    letter-spacing: -0.08px !important;
    ;
    box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;
    -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
    margin: 0 auto !important;
    font-family: 'Lato', sans-serif !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    -o-transition: 0.3s all linear !important;
    -webkit-transition: 0.3s all linear !important;
    -moz-transition: 0.3s all linear !important;
    -ms-transition: 0.3s all linear !important;
    transition: 0.3s all linear !important;
}

.bmc-button:hover,
.bmc-button:active,
.bmc-button:focus {
    -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
    text-decoration: none !important;
    box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
    opacity: 0.85 !important;
    color: #FFFFFF !important;
}
</style>
<link href="https://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext" rel="stylesheet">
<a class="bmc-button" target="_blank" href="https://www.buymeacoffee.com/2yhzJxd4B"><img src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" alt="Buy me a coffee"><span style="margin-left:5px">Buy me a coffee</span>
</a>



- Bitcoin - Click the image below if you have a bitcoin app installed, or use it as a QR code. Or copy the address manually below.

  - ![LANLost Settings Window](https://github.com/Darkle/LANLost/raw/master/resources/readmeMedia/Bitcoin-QR-Code.png)

  - `1D8rwE8rmAzASPaJadcaMFxdjXtyJZpGQP`
