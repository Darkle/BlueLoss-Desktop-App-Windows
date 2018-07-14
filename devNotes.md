
* Windows:
  * For devTasks:
    * For creating a windows MSI installer, you will need to download http://wixtoolset.org/releases/ and put it in your path.
    * For creating a portable 7-zip version, make sure you have the following set up for 7-zip: https://github.com/quentinrossetti/node-7z#installation
* By default, Android devices are only discoverable by Bluetooth when you open the Android Bluetooth settings on the device.
* Stick with electron 1.8.7 as 2.0.0 and newer dont seem to return multiple devices on bluetooth scan.
* Note: each scan takes about a minute with electron 1.8.7.
