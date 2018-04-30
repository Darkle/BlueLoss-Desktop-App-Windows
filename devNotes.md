
* For devTasks, you will need to:
  * Create a windows MSI installer, you will need to download http://wixtoolset.org/releases/ and put it in your path.
  * Make sure you have the following set up for 7-zip: https://github.com/quentinrossetti/node-7z#installation
* By default, Android devices are only discoverable by Bluetooth when you open the Android Bluetooth settings on the device.
* On Linux, if you are using node via snaps, you may run in to an issue something akin to `The node binary used for scripts is /snap/bin/node but npm is using /snap/node/367/bin/node itself. Use the '--scripts-prepend-node-path' option to include the path for the node binary npm was executed with.`. If that happens, do this: https://github.com/npm/npm/issues/15398#issuecomment-276300141
