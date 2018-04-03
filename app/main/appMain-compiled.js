/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyADeviceInDevicesToSearchFor = exports.logStartupSettings = exports.removeNewDeviceToSearchFor = exports.addNewDeviceToSearchFor = exports.getSettings = exports.updateSetting = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(3);

var _gawk = __webpack_require__(16);

var _gawk2 = _interopRequireDefault(_gawk);

var _lowdb = __webpack_require__(40);

var _lowdb2 = _interopRequireDefault(_lowdb);

var _FileSync = __webpack_require__(39);

var _FileSync2 = _interopRequireDefault(_FileSync);

var _utils = __webpack_require__(2);

var _types = __webpack_require__(6);

var _settingsDefaults = __webpack_require__(38);

var _settingsObservers = __webpack_require__(37);

var _settingsIPClisteners = __webpack_require__(35);

var _logging = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settingsDBpath = _path2.default.join(_electron.app.getPath('userData'), 'lanlost-settings.json');
const adapter = new _FileSync2.default(settingsDBpath);
const db = (0, _lowdb2.default)(adapter);

db.defaults(_settingsDefaults.defaultSettings).write();

const settings = (0, _gawk2.default)(db.getState());
/**
 * settingsLoadedOnStartup is for the debug window - on debug window load, we show
 * the settings loaded on startup as well as the current settings now to help debug any
 * settings issues.
 */
const settingsLoadedOnStartup = _extends({}, (0, _utils.omitGawkFromSettings)(settings));

(0, _settingsObservers.initSettingsObservers)(settings);
(0, _settingsIPClisteners.initSettingsIPClisteners)();
updateLastSeenForDevicesLookingForOnStartup();

function getSettings() {
  return settings;
}function updateSetting(newSettingKey, newSettingValue) {
  settings[newSettingKey] = newSettingValue;
  db.set(newSettingKey, newSettingValue).write();
  logSettingsUpdate(newSettingKey, newSettingValue);
}function addNewDeviceToSearchFor(deviceToAdd) {
  const { macAddress } = deviceToAdd;
  if (deviceIsInDevicesToSearchFor(macAddress)) return;

  updateSetting('devicesToSearchFor', _extends({}, settings.devicesToSearchFor, { [macAddress]: deviceToAdd }));
}function removeNewDeviceToSearchFor(deviceToRemove) {
  const { macAddress } = deviceToRemove;
  if (!deviceIsInDevicesToSearchFor(macAddress)) return;

  updateSetting('devicesToSearchFor', filterDevicesToSearchFor(macAddress));
}function filterDevicesToSearchFor(macAddressToRemove) {
  return (() => {
    const _obj = {};for (let _obj2 = settings.devicesToSearchFor, _i = 0, _keys = Object.keys(_obj2), _len = _keys.length; _i < _len; _i++) {
      const macAddress = _keys[_i];const device = _obj2[macAddress];
      if (macAddress !== macAddressToRemove) _obj[macAddress] = device;
    }return _obj;
  })();
}

function deviceIsInDevicesToSearchFor(macAddress) {
  return settings.devicesToSearchFor[macAddress];
}function modifyADeviceInDevicesToSearchFor(macAddress, propName, propValue) {
  return _extends({}, settings.devicesToSearchFor, {
    [macAddress]: _extends({}, settings.devicesToSearchFor[macAddress], { [propName]: propValue })
  });
} /**
   * When a user starts up LANLost after previously exiting, the
   * lastSeen value will be out of date for the devices in
   * devicesToSearchFor. This would cause LANLost to lock the
   * system straight away because the lastSeen value + timeToLock
   *  will be less than Date.now(). So to prevent this, we give all
   * devices in devicesToSearchFor a lastSeen of 10 years from now.
   * (when a device is seen again during a scan, lastSeen is updated.)
   */
function updateLastSeenForDevicesLookingForOnStartup() {
  for (let _obj3 = settings.devicesToSearchFor, _i2 = 0, _keys2 = Object.keys(_obj3), _len2 = _keys2.length; _i2 < _len2; _i2++) {
    const _k = _keys2[_i2];const { macAddress } = _obj3[_k];
    updateSetting('devicesToSearchFor', modifyADeviceInDevicesToSearchFor(macAddress, 'lastSeen', (0, _utils.tenYearsFromNow)()));
  }
}function logSettingsUpdate(newSettingKey, newSettingValue) {
  /**
   * There's a circular dependancy issue with logging stuff on app startup,
   * so using nextTick hack.
   * (updateLastSeenForDevicesLookingForOnStartup is called on startup,
   * which changes the devicesToSearchFor setting value, which in turn
   * causes logSettingsUpdate to be called).
   */
  process.nextTick(function () {
    _logging.logger.debug(`Updated Setting: updated '${newSettingKey}' with: ${newSettingValue}`);
    return _logging.logger.debug(`Settings Are Now: `, (0, _utils.omitGawkFromSettings)(getSettings()));
  });
}function logStartupSettings() {
  return _logging.logger.debug('Settings Loaded At LANLost Startup:', settingsLoadedOnStartup);
}exports.updateSetting = updateSetting;
exports.getSettings = getSettings;
exports.addNewDeviceToSearchFor = addNewDeviceToSearchFor;
exports.removeNewDeviceToSearchFor = removeNewDeviceToSearchFor;
exports.logStartupSettings = logStartupSettings;
exports.modifyADeviceInDevicesToSearchFor = modifyADeviceInDevicesToSearchFor;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeRollbarLogging = exports.addRollbarLogging = exports.logger = undefined;

var _electron = __webpack_require__(3);

var _winston = __webpack_require__(10);

var _winston2 = _interopRequireDefault(_winston);

var _customRollbarTransport = __webpack_require__(45);

var _userDebugLogger = __webpack_require__(42);

var _settings = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rollbarTransportOptions = {
  name: 'rollbarTransport',
  level: 'error',
  handleExceptions: true,
  humanReadableUnhandledException: true
};
const userDebugTransportOptions = {
  name: 'userDebugTransport',
  level: 'debug',
  handleExceptions: true,
  humanReadableUnhandledException: true

  // https://github.com/winstonjs/winston/tree/2.4.0
};const logger = new _winston2.default.Logger({
  level: 'debug',
  exitOnError: false
});

if (false) {} // dont send errors to rollbar in dev && only if enabled.
if (!false && (0, _settings.getSettings)().reportErrors) {
  addRollbarLogging();
}logger.add(_userDebugLogger.UserDebugLoggerTransport, userDebugTransportOptions);
/**
* We also need to enable/disable the rollbar module itself as well,
* as it is set to report uncaught exceptions as well as logging
* caught errors.
*/
function addRollbarLogging() {
  _customRollbarTransport.rollbarLogger.configure({ enabled: true });
  logger.add(_customRollbarTransport.CustomRollbarTransport, rollbarTransportOptions);
}function removeRollbarLogging() {
  _customRollbarTransport.rollbarLogger.configure({ enabled: false });
  logger.remove('rollbarTransport');
}_electron.ipcMain.on('settings-renderer:error-sent', function (event, error) {
  logger.error('settings-renderer:error-sent', error);
});
_electron.ipcMain.on('debug-window-renderer:error-sent', function (event, error) {
  logger.error('debug-window-renderer:error-sent', error);
});

exports.logger = logger;
exports.addRollbarLogging = addRollbarLogging;
exports.removeRollbarLogging = removeRollbarLogging;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProperAppVersion = exports.capitalizeFirstLetter = exports.tenYearsFromNow = exports.range = exports.curryRight = exports.curry = exports.pipe = exports.isObject = exports.noop = exports.omitInheritedProperties = exports.recursiveOmitFilterAndInheritedPropertiesFromObj = exports.omitGawkFromSettings = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ms = __webpack_require__(7);

var _ms2 = _interopRequireDefault(_ms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appVersion = __webpack_require__(43).version;

function omitGawkFromSettings(settings) {
  return recursiveOmitFilterAndInheritedPropertiesFromObj(settings, ['__gawk__']);
}function recursiveOmitFilterAndInheritedPropertiesFromObj(settings, properties) {
  return omitInheritedProperties(settings, properties);
}function omitInheritedProperties(obj, propertyFiltersArr = []) {
  return Object.getOwnPropertyNames(obj).reduce(function (prev, propName) {
    for (let _i = 0, _len = propertyFiltersArr.length; _i < _len; _i++) {
      const propertyToFilter = propertyFiltersArr[_i];
      if (propertyToFilter === propName) return prev;
    }if (isObject(obj[propName])) {
      return _extends({}, prev, { [propName]: omitInheritedProperties(obj[propName], propertyFiltersArr) });
    }return _extends({}, prev, { [propName]: obj[propName] });
  }, {});
} /**
   * If you run Electron by pointing it to a js file that's not in the base parent directory with the
   * package.json it will report the Electron binary version rather than what's in your package.json.
   * https://github.com/electron/electron/issues/7085
   */
function getProperAppVersion() {
  return appVersion;
}function noop() {
  return;
}function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && !isFunction(obj);
}function isFunction(value) {
  return typeof value === 'function';
}function pipe(...fns) {
  return function (param) {
    return fns.reduce(function (result, fn) {
      return fn(result);
    }, param);
  };
}function curry(f) {
  return function (...a) {
    return function (...b) {
      return f(...(a === void 0 ? [] : a), ...(b === void 0 ? [] : b));
    };
  };
}function curryRight(f) {
  return function (...a) {
    return function (...b) {
      return f(...(b === void 0 ? [] : b), ...(a === void 0 ? [] : a));
    };
  };
}function range(start, end) {
  return Array.from({ length: end - start + 1 }, function (v, k) {
    return k + start;
  });
}function tenYearsFromNow() {
  return Date.now() + (0, _ms2.default)('10 years');
}function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}exports.omitGawkFromSettings = omitGawkFromSettings;
exports.recursiveOmitFilterAndInheritedPropertiesFromObj = recursiveOmitFilterAndInheritedPropertiesFromObj;
exports.omitInheritedProperties = omitInheritedProperties;
exports.noop = noop;
exports.isObject = isObject;
exports.pipe = pipe;
exports.curry = curry;
exports.curryRight = curryRight;
exports.range = range;
exports.tenYearsFromNow = tenYearsFromNow;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.getProperAppVersion = getProperAppVersion;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settingsWindow = exports.toggleSettingsWindow = exports.showSettingsWindow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(8);

var _url2 = _interopRequireDefault(_url);

var _electron = __webpack_require__(3);

var _settings = __webpack_require__(0);

var _logging = __webpack_require__(1);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settingsWindowRendererDirPath = _path2.default.join(__dirname, '..', 'settingsWindow', 'renderer');
const iconsDir = _path2.default.join(settingsWindowRendererDirPath, 'assets', 'icons');
const settingsHTMLpath = _url2.default.format({
  protocol: 'file',
  slashes: true,
  pathname: _path2.default.resolve(settingsWindowRendererDirPath, 'settingsWindow.html')
});
const settingsWindowProperties = _extends({
  width: 786,
  height: 616,
  title: 'LANLost',
  autoHideMenuBar: true,
  resizable: false,
  fullscreenable: false,
  fullscreen: false,
  frame: false,
  show: false,
  icon: getIconPath(),
  webPreferences: {
    textAreasAreResizable: false,
    devTools: false
  }
}, getStoredWindowPosition());
/****
* Remove the menu in alt menu bar in prod, so they dont accidentally exit the app.
* Reload is for dev so we can easily reload the browserwindow with Ctrl+R.
*/
const settingsWindowMenu =  false ? undefined : null;
let settingsWindow = null;

function showSettingsWindow() {
  var _electronApp$dock;

  if (settingsWindow) return settingsWindow.show();
  /*****
  * We add the settings to a global each time we create a new settings window so we can easily
  * load the inital app settings on renderer startup. This way we dont have to send a message from the
  * renderer to the main processs to ask for the settings - or send them from main process on detection
  * of the BrowserWindow 'ready-to-show' event, both of which might make the UI show nothing briefly
  * before the settings.
  *
  * We can't use remote.require(../settings.lsc).getSettings() in the renderer because it doesn't seem
  * to work with code that needs to be transpiled, as everything in settlings.lsc is compiled into
  * appMain-compiled.js and the remote.require() looks for the .lsc file - it doesn't know that the
  * settings module has been compiled and now lives inside of the appMain-compiled.js file.
  */
  global.settingsWindowRendererInitialSettings = (0, _utils.recursiveOmitFilterAndInheritedPropertiesFromObj)((0, _settings.getSettings)(), ['__gawk__', 'canSearchForMacVendorInfo', 'dateLastCheckedForOUIupdate', 'firstRun']);

  exports.settingsWindow = settingsWindow = new _electron.BrowserWindow(_extends({}, settingsWindowProperties, getStoredWindowPosition(), { icon: getIconPath() }));
  settingsWindow.loadURL(settingsHTMLpath);
  settingsWindow.setMenu(settingsWindowMenu);
  (_electronApp$dock = _electron.app.dock) == null ? void 0 : _electronApp$dock.show();
  if (false) {}

  settingsWindow.once('close', function () {
    (0, _settings.updateSetting)('settingsWindowPosition', settingsWindow.getBounds());
  });
  settingsWindow.once('ready-to-show', function () {
    settingsWindow.show();
  });
  settingsWindow.once('closed', function () {
    var _electronApp$dock2;

    exports.settingsWindow = settingsWindow = null;
    (_electronApp$dock2 = _electron.app.dock) == null ? void 0 : _electronApp$dock2.hide();
  });
  settingsWindow.webContents.once('crashed', function (event) {
    _logging.logger.error('settingsWindow.webContents crashed', event);
  });
  settingsWindow.once('unresponsive', function (event) {
    _logging.logger.error('settingsWindow unresponsive', event);
  });
}function getStoredWindowPosition() {
  const settingsWindowPosition = typeof _settings.getSettings !== 'function' ? void 0 : (0, _settings.getSettings)().settingsWindowPosition;
  if (!settingsWindowPosition) return {};
  return { x: settingsWindowPosition.x, y: settingsWindowPosition.y };
}function getIconPath() {
  let trayIconColor = typeof _settings.getSettings !== 'function' ? void 0 : (0, _settings.getSettings)().trayIconColor;
  if (!trayIconColor) trayIconColor = 'blue';
  const iconFileName = `LANLost-${(0, _utils.capitalizeFirstLetter)(trayIconColor)}-512x512.png`;
  return _path2.default.join(iconsDir, iconFileName);
}function toggleSettingsWindow() {
  if (!settingsWindow) {
    showSettingsWindow();
  } else if (settingsWindow.isVisible()) {
    settingsWindow.close();
  }
}exports.showSettingsWindow = showSettingsWindow;
exports.toggleSettingsWindow = toggleSettingsWindow;
exports.settingsWindow = settingsWindow;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("ms");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("got");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("fs-jetpack");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOUIfileDataInMemory = exports.getOUIfileData = exports.loadOUIfileIfNotLoaded = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(3);

var _fsJetpack = __webpack_require__(12);

var _fsJetpack2 = _interopRequireDefault(_fsJetpack);

var _settings = __webpack_require__(0);

var _logging = __webpack_require__(1);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fileName = 'lanlost-mac-vendor-prefixes.json';
const downloadedOUIfilePath = _path2.default.join(_electron.app.getPath('userData'), fileName);
const initialOUIfilePath = _path2.default.resolve(__dirname, '..', 'oui', fileName);
let ouiFileData = null;
const curriedJetpackRead = (0, _utils.curryRight)(_fsJetpack2.default.readAsync)('json');

/**
 * If we haven't downloaded a new copy of the MAC vendor prefix list, use
 * our built in one (MAC vendor prefix file from: https://linuxnet.ca/ieee/oui/).
 */
function loadOUIfileIfNotLoaded() {
  if (ouiFileData) return Promise.resolve();

  return _fsJetpack2.default.existsAsync(downloadedOUIfilePath).then(chooseOUIFilePath).then(curriedJetpackRead).then(updateOUIfileDataInMemory).catch(function (err) {
    _logging.logger.error(`Couldn't load OUI file`, err);
    (0, _settings.updateSetting)('canSearchForMacVendorInfo', false);
  });
}function chooseOUIFilePath(existsResult) {
  if (existsResult === 'file') return downloadedOUIfilePath;
  return initialOUIfilePath;
}function getOUIfileData() {
  return ouiFileData;
}function updateOUIfileDataInMemory(newData) {
  ouiFileData = newData;
  return ouiFileData;
}exports.loadOUIfileIfNotLoaded = loadOUIfileIfNotLoaded;
exports.getOUIfileData = getOUIfileData;
exports.updateOUIfileDataInMemory = updateOUIfileDataInMemory;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableRunOnStartup = exports.enableRunOnStartup = undefined;

var _autoLaunch = __webpack_require__(36);

var _autoLaunch2 = _interopRequireDefault(_autoLaunch);

var _logging = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lanLostAutoLauncher = new _autoLaunch2.default({
  name: 'LANLost',
  isHidden: true
});

function enableRunOnStartup(firstRun) {
  if (firstRun && false) return;
  lanLostAutoLauncher.enable().catch(function (err) {
    _logging.logger.error('enableRunOnStartup error: ', err);
  });
}function disableRunOnStartup() {
  lanLostAutoLauncher.disable().catch(function (err) {
    _logging.logger.error('disableRunOnStartup error: ', err);
  });
}exports.enableRunOnStartup = enableRunOnStartup;
exports.disableRunOnStartup = disableRunOnStartup;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTrayMenu = exports.createContextMenu = exports.changeTrayIcon = exports.initTrayMenu = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(3);

var _settingsWindow = __webpack_require__(5);

var _settings = __webpack_require__(0);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let tray = null;
const trayIconsFolder = _path2.default.resolve(__dirname, '..', 'tray', 'icons');

function initTrayMenu() {
  tray = new _electron.Tray(getNewTrayIconPath((0, _settings.getSettings)().trayIconColor));
  tray.setContextMenu(createContextMenu());
  tray.setToolTip('LANLost');
  tray.on('double-click', _settingsWindow.toggleSettingsWindow);
}function createContextMenu() {
  return _electron.Menu.buildFromTemplate([{
    label: 'Open LANLost Settings',
    click: _settingsWindow.showSettingsWindow
  }, {
    label: generateEnabledDisabledLabel(),
    click: toggleEnabledFromTray
  }, {
    label: 'Quit LANLost',
    click: _electron.app.quit
  }]);
}function getNewTrayIconPath(trayIconColor) {
  return _path2.default.join(trayIconsFolder, `LANLost-${(0, _utils.capitalizeFirstLetter)(trayIconColor)}-128x128.png`);
}function generateEnabledDisabledLabel() {
  return `${(0, _settings.getSettings)().lanLostEnabled ? 'Disable' : 'Enable'} LANLost`;
}function changeTrayIcon(newTrayIconColor) {
  tray.setImage(getNewTrayIconPath(newTrayIconColor));
}function updateTrayMenu() {
  tray.setContextMenu(createContextMenu());
}function toggleEnabledFromTray() {
  (0, _settings.updateSetting)('lanLostEnabled', !(0, _settings.getSettings)().lanLostEnabled);
}exports.initTrayMenu = initTrayMenu;
exports.changeTrayIcon = changeTrayIcon;
exports.createContextMenu = createContextMenu;
exports.updateTrayMenu = updateTrayMenu;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("gawk");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("electron-positioner");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showUpdateNotification = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(8);

var _url2 = _interopRequireDefault(_url);

var _electron = __webpack_require__(3);

var _electronPositioner = __webpack_require__(17);

var _electronPositioner2 = _interopRequireDefault(_electronPositioner);

var _logging = __webpack_require__(1);

var _settings = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let notificationWindow = null;
const notificationWindowMenu =  false ? undefined : null;
const updateHTMLfilePath = _url2.default.format({
  protocol: 'file',
  slashes: true,
  pathname: _path2.default.resolve(__dirname, '..', 'appUpdates', 'updateNotification.html')
});
const iconFileName = _path2.default.join(__dirname, '..', 'appUpdates', `LANLost-Blue-512x512.png`);

function showUpdateNotification(latestUpdateVersion) {
  notificationWindow = new _electron.BrowserWindow({
    width: getPlatformNotificationWindowWidth(),
    height: getPlatformNotificationWindowHeight(),
    resizable: false,
    alwaysOnTop: true,
    maximizable: false,
    fullscreenable: false,
    acceptFirstMouse: true,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    show: false,
    icon: iconFileName,
    title: 'An Update Is Available For LANLost'
  });

  notificationWindow.setMenu(notificationWindowMenu);

  var positioner = new _electronPositioner2.default(notificationWindow);
  positioner.move('bottomRight');

  notificationWindow.loadURL(updateHTMLfilePath);
  if (false) {}

  notificationWindow.once('ready-to-show', function () {
    notificationWindow.show();
  });
  notificationWindow.webContents.on('dom-ready', function () {
    notificationWindow.webContents.send('main-process:sent-latest-update-version', latestUpdateVersion);
  });
  notificationWindow.on('closed', function () {
    notificationWindow = null;
  });
  notificationWindow.webContents.once('crashed', function (event) {
    _logging.logger.error('notificationWindow.webContents crashed', event);
  });
  notificationWindow.once('unresponsive', function (event) {
    _logging.logger.error('notificationWindow unresponsive', event);
  });
}_electron.ipcMain.on('renderer:open-update-web-page', function () {
  notificationWindow == null ? void 0 : typeof notificationWindow.close !== 'function' ? void 0 : notificationWindow.close();
  _electron.shell.openExternal('https://github.com/Darkle/LANLost/releases');
});

_electron.ipcMain.on('renderer:skip-update-version', function (event, versionToSkip) {
  notificationWindow == null ? void 0 : typeof notificationWindow.close !== 'function' ? void 0 : notificationWindow.close();
  (0, _settings.updateSetting)('skipUpdateVersion', versionToSkip);
});

function getPlatformNotificationWindowWidth() {
  switch (process.platform) {
    case 'darwin':
      return 420;
    case 'linux':
      return 415;
    case 'win32':
      return 435;
  }
}function getPlatformNotificationWindowHeight() {
  switch (process.platform) {
    case 'darwin':
      return 140;
    case 'linux':
      return 120;
    case 'win32':
      return 160;
  }
}exports.showUpdateNotification = showUpdateNotification;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForUpdate = undefined;

var _ms = __webpack_require__(7);

var _ms2 = _interopRequireDefault(_ms);

var _got = __webpack_require__(11);

var _got2 = _interopRequireDefault(_got);

var _settings = __webpack_require__(0);

var _logging = __webpack_require__(1);

var _showUpdateNotification = __webpack_require__(18);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const oneDaysTime = (0, _ms2.default)('1 day');
const twoWeeksTime = (0, _ms2.default)('2 weeks');
const userAgentString = `Mozilla/5.0 AppleWebKit (KHTML, like Gecko) Chrome/${process.versions['chrome']} Electron/${process.versions['electron']} Safari LANLost App https://github.com/Darkle/LANLost`;
const gotRequestOptions = { headers: { 'user-agent': userAgentString }, json: true };
const updateInfoUrl = 'https://raw.githubusercontent.com/Darkle/LANLost/master/updateInfo.json';

function checkForUpdate() {
  if (shouldCheckForUpdate()) return;

  (0, _settings.updateSetting)('dateLastCheckedForAppUpdate', Date.now());

  (0, _got2.default)(updateInfoUrl, gotRequestOptions).then(function ({ body: { latestVersion } }) {
    if (shouldShowUpdateNotification(latestVersion)) {
      (0, _showUpdateNotification.showUpdateNotification)(latestVersion);
    }
  }).catch(function (err) {
    _logging.logger.error('error downloading update info', err);
  });

  checkForUpdateTomorrow();
}function shouldCheckForUpdate() {
  return Date.now() > (0, _settings.getSettings)().dateLastCheckedForAppUpdate + twoWeeksTime;
}function shouldShowUpdateNotification(latestVersion) {
  return (0, _utils.getProperAppVersion)() !== latestVersion && latestVersion !== (0, _settings.getSettings)().skipUpdateVersion;
}function checkForUpdateTomorrow() {
  setTimeout(checkForUpdate, oneDaysTime);
}exports.checkForUpdate = checkForUpdate;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleOUIfileUpdate = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(3);

var _ms = __webpack_require__(7);

var _ms2 = _interopRequireDefault(_ms);

var _got = __webpack_require__(11);

var _got2 = _interopRequireDefault(_got);

var _fsJetpack = __webpack_require__(12);

var _fsJetpack2 = _interopRequireDefault(_fsJetpack);

var _settings = __webpack_require__(0);

var _logging = __webpack_require__(1);

var _utils = __webpack_require__(2);

var _getOUIfile = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ouiDownloadfilePath = _path2.default.join(_electron.app.getPath('userData'), 'lanlost-mac-vendor-prefixes.json');
const twoWeeksTime = (0, _ms2.default)('2 weeks');
const twoDaysTime = (0, _ms2.default)('2 days');
const threeMinutesTime = (0, _ms2.default)('3 minutes');
const updateUrl = 'https://linuxnet.ca/ieee/oui/nmap-mac-prefixes';
const gotErrorMessage = `Failed getting nmap-mac-prefixes file from ${updateUrl}`;
const userAgentString = `Mozilla/5.0 AppleWebKit (KHTML, like Gecko) Chrome/${process.versions['chrome']} Electron/${process.versions['electron']} Safari LANLost App https://github.com/Darkle/LANLost`;
const gotRequestOptions = { headers: { 'user-agent': userAgentString } };
const checkResponseAndGenerateObj = (0, _utils.pipe)(checkResponseBody, generateObjFromResponseText);
const curriedJetPackWrite = (0, _utils.curry)(_fsJetpack2.default.writeAsync)(ouiDownloadfilePath);

function updateOUIfilePeriodically() {
  if (!shouldUpdate() || !(0, _settings.getSettings)().enableOUIfileUpdate) {
    return scheduleOUIfileUpdate(twoDaysTime);
  }(0, _settings.updateSetting)('dateLastCheckedForOUIupdate', Date.now());

  (0, _got2.default)(updateUrl, gotRequestOptions).then(checkResponseAndGenerateObj).then(_getOUIfile.updateOUIfileDataInMemory).then(curriedJetPackWrite).catch(function (err) {
    _logging.logger.error(gotErrorMessage, err);
  });

  return scheduleOUIfileUpdate(twoDaysTime);
}function generateObjFromResponseText(resultBodyText) {
  /**
  * using a native for loop rather than reduce for speed here as the oui file is over
  * 20,000 lines long.
  */
  const ouiFileData = resultBodyText.split(/\r\n?|\n/);
  const ouiFileDataAsObj = {};
  for (let _i = 0, _len = ouiFileData.length; _i < _len; _i++) {
    const line = ouiFileData[_i];
    ouiFileDataAsObj[line.slice(0, 6)] = line.slice(6).trim();
  }return ouiFileDataAsObj;
}function checkResponseBody(response) {
  var _response$body;

  if (!(response == null ? void 0 : (_response$body = response.body) == null ? void 0 : typeof _response$body.split !== 'function' ? void 0 : _response$body.split(/\r\n?|\n/).length)) {
    throw new Error('The response.body was not valid for oui file download');
  }return response.body;
} /**
   * Have a default of 3 mins for scheduleOUIfileUpdate call on startup
   * so we dont have any issue with the app trying to load the recently
   * updated file while it is trying to do a new update.
   */
function scheduleOUIfileUpdate(interval = threeMinutesTime) {
  setTimeout(updateOUIfilePeriodically, interval);
}function shouldUpdate() {
  return Date.now() - (0, _settings.getSettings)().dateLastCheckedForOUIupdate > twoWeeksTime;
}exports.scheduleOUIfileUpdate = scheduleOUIfileUpdate;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("lock-system");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lockTheSystem = undefined;

var _lockSystem = __webpack_require__(21);

var _lockSystem2 = _interopRequireDefault(_lockSystem);

var _logging = __webpack_require__(1);

var _settings = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lockTheSystem() {
  if (!(0, _settings.getSettings)().lanLostEnabled) return;
  // lockSystem throws on error, so use try/catch
  try {
    (0, _lockSystem2.default)();
  } catch (err) {
    _logging.logger.error('Error occured trying locking the system : ', err);
  }
}exports.lockTheSystem = lockTheSystem;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("is-empty");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleScanResults = undefined;

var _isEmpty = __webpack_require__(23);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ms = __webpack_require__(7);

var _ms2 = _interopRequireDefault(_ms);

var _types = __webpack_require__(6);

var _logging = __webpack_require__(1);

var _settingsWindow = __webpack_require__(5);

var _settings = __webpack_require__(0);

var _lockSystem = __webpack_require__(22);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleScanResults(devicesFound = []) {
  var _settingsWindow$webCo;

  _logging.logger.debug(`scan returned these active devices: \n`, devicesFound);

  const { devicesToSearchFor } = (0, _settings.getSettings)();

  _settingsWindow.settingsWindow == null ? void 0 : (_settingsWindow$webCo = _settingsWindow.settingsWindow.webContents) == null ? void 0 : _settingsWindow$webCo.send('mainprocess:update-of-network-devices-can-see', { devicesCanSee: devicesFound });

  if ((0, _isEmpty2.default)(devicesToSearchFor)) return;
  /**
   * If any devices we are looking for showed up in the latest scan,
   * add the current time to the stored device in devicesToSearchFor.
   */
  for (let _i = 0, _len = devicesFound.length; _i < _len; _i++) {
    const { macAddress } = devicesFound[_i];
    if (devicesToSearchFor[macAddress]) {
      (0, _settings.updateSetting)('devicesToSearchFor', (0, _settings.modifyADeviceInDevicesToSearchFor)(macAddress, 'lastSeen', Date.now()));
    }
  } /**
     * If a device is lost we lock the computer, however, after that, if
     * the computer is unlocked without the device coming back to the network,
     * we don't want to keep locking the computer because the device is still
     * lost. So we give the device that has just been lost a lastSeen value of
     * 10 years from now (not using Infinity cause it doesn't JSON.stringify
     * for storage).
     */
  for (let _i2 = 0, _keys = Object.keys(devicesToSearchFor), _len2 = _keys.length; _i2 < _len2; _i2++) {
    const _k = _keys[_i2];const { lastSeen, macAddress } = devicesToSearchFor[_k];
    if (deviceHasBeenLost(lastSeen)) {
      (0, _lockSystem.lockTheSystem)();
      (0, _settings.updateSetting)('devicesToSearchFor', (0, _settings.modifyADeviceInDevicesToSearchFor)(macAddress, 'lastSeen', (0, _utils.tenYearsFromNow)()));
    }
  }
}function deviceHasBeenLost(lastTimeSawDevice) {
  return Date.now() > lastTimeSawDevice + (0, _ms2.default)(`${(0, _settings.getSettings)().timeToLock} mins`);
}exports.handleScanResults = handleScanResults;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("ono");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("is-ip");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("internal-ip");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("node-arp");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("default-gateway");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scanNetwork = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _net = __webpack_require__(31);

var _util = __webpack_require__(9);

var _util2 = _interopRequireDefault(_util);

var _defaultGateway = __webpack_require__(30);

var _defaultGateway2 = _interopRequireDefault(_defaultGateway);

var _ms = __webpack_require__(7);

var _ms2 = _interopRequireDefault(_ms);

var _nodeArp = __webpack_require__(29);

var _nodeArp2 = _interopRequireDefault(_nodeArp);

var _internalIp = __webpack_require__(28);

var _internalIp2 = _interopRequireDefault(_internalIp);

var _isIp = __webpack_require__(27);

var _isIp2 = _interopRequireDefault(_isIp);

var _bluebird = __webpack_require__(26);

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ono = __webpack_require__(25);

var _ono2 = _interopRequireDefault(_ono);

var _settings = __webpack_require__(0);

var _getOUIfile = __webpack_require__(13);

var _handleScanResults = __webpack_require__(24);

var _logging = __webpack_require__(1);

var _utils = __webpack_require__(2);

var _types = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pGetMAC = _util2.default.promisify(_nodeArp2.default.getMAC);
const scanInterval = (0, _ms2.default)('30 seconds');

function scanNetwork() {
  if (!(0, _settings.getSettings)().lanLostEnabled) {
    return scanNetworkIn30Seconds();
  }_logging.logger.debug(`new scan started`);

  _bluebird2.default.resolve((0, _getOUIfile.loadOUIfileIfNotLoaded)()).then(getDefaultGatewayIP).then(generatePossibleHostIPs).map(scanHost).filter(isDevice).then(_handleScanResults.handleScanResults).catch(_logging.logger.error).finally(scanNetworkIn30Seconds);
}function scanHost(hostIP) {
  return connectToHostSocket(hostIP).then(addMetaDataToDevice).then(getMacAdressForHostIP).then(getVendorInfoForMacAddress).catch(handleHostScanError);
} // http://bit.ly/2pzLeD3
function connectToHostSocket(hostIP) {
  return new _bluebird2.default(function (resolve, reject) {
    const socket = new _net.Socket();
    socket.setTimeout((0, _settings.getSettings)().hostScanTimeout);
    socket.connect({ host: hostIP, port: 1 });
    socket.unref();
    socket.on('error', function (error) {
      if (error.code === 'ECONNREFUSED') resolve(hostIP);else reject(error);
    });
    socket.on('timeout', function () {
      reject((0, _ono2.default)({ socketTimeout: true }, `socket timeout for ${hostIP}`));
      socket.destroy();
    });
    socket.on('connect', function () {
      resolve(hostIP);
      socket.destroy();
    });
  });
}function getDefaultGatewayIP() {
  return _defaultGateway2.default.v4().then(gatewayIsIPV4address);
}function addMetaDataToDevice(ipAddress) {
  return { ipAddress, lastSeen: Date.now() };
}

function getMacAdressForHostIP(device) {
  return pGetMAC(device.ipAddress).then(function (macAddress) {
    return _extends({}, device, { macAddress });
  });
}function getVendorInfoForMacAddress(device) {
  if (!(0, _settings.getSettings)().canSearchForMacVendorInfo) {
    return _bluebird2.default.resolve(device);
  }return _bluebird2.default.resolve(_extends({}, device, {
    vendorName: findVendorInfoInOUIfile(device)
  }));
}function generatePossibleHostIPs(gateway) {
  const { hostsScanRangeStart, hostsScanRangeEnd } = (0, _settings.getSettings)();
  const networkOctects = gateway.slice(0, gateway.lastIndexOf('.'));
  return _internalIp2.default.v4().then(function (internalIp) {
    return (0, _utils.range)(hostsScanRangeStart, hostsScanRangeEnd).map(function (lastOctet) {
      return `${networkOctects}.${lastOctet}`;
    }).filter(function (hostIP) {
      return hostIP !== gateway && hostIP !== internalIp;
    });
  });
}function handleHostScanError(err) {
  if (err == null ? void 0 : err.socketTimeout) return;
  _logging.logger.debug(err);
}function scanNetworkIn30Seconds() {
  setTimeout(scanNetwork, scanInterval);
}function isDevice(device) {
  return (0, _utils.isObject)(device) && device.macAddress;
}function ouiSansDelimeters(device) {
  return device.macAddress.replace(/[.:-]/g, "").substring(0, 6).toUpperCase();
}function findVendorInfoInOUIfile(device) {
  return (0, _getOUIfile.getOUIfileData)(device)[ouiSansDelimeters(device)];
}function gatewayIsIPV4address({ gateway: defaultGatewayIP }) {
  _logging.logger.debug(`defaultGatewayIP ip: ${defaultGatewayIP}`);
  return new _bluebird2.default(function (resolve, reject) {
    if (!_isIp2.default.v4(defaultGatewayIP)) {
      return reject(new Error(`Didn't get valid gateway IP address: ${defaultGatewayIP}`));
    }return resolve(defaultGatewayIP);
  });
}exports.scanNetwork = scanNetwork;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("electron-reload");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUpDev = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(3);

var _settingsWindow = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const devtronPath = _path2.default.resolve(__dirname, '..', '..', 'node_modules', 'devtron');
const settingsWindowDirPath = _path2.default.resolve(__dirname, '..', 'settingsWindow', 'renderer');
const settingsWindowHTMLfilePath = _path2.default.join(settingsWindowDirPath, 'settingsWindow.html');
const settingsWindowCSSfilePath = _path2.default.join(settingsWindowDirPath, 'assets', 'styles', 'css', 'settingsWindowCss-compiled.css');
const settingsWindowJSfilePath = _path2.default.join(settingsWindowDirPath, 'settingsWindowRendererMain-compiled.js');
const settingsWindowIconFiles = _path2.default.join(settingsWindowDirPath, 'assets', 'icons', '*.*');
const debugWindowDirPath = _path2.default.resolve(__dirname, '..', 'debugWindow', 'renderer');
const debugWindowHTMLfilePath = _path2.default.join(debugWindowDirPath, 'debugWindow.html');
const debugWindowJSfilePath = _path2.default.join(debugWindowDirPath, 'debugWindowRendererMain-compiled.js');
const notificationWindowHTMLfilePath = _path2.default.join(__dirname, '..', 'appUpdates', 'updateNotification.html');

function setUpDev() {
  if (true) return;
  __webpack_require__(33)([settingsWindowHTMLfilePath, settingsWindowCSSfilePath, settingsWindowJSfilePath, settingsWindowIconFiles, debugWindowHTMLfilePath, debugWindowJSfilePath, notificationWindowHTMLfilePath]);
  _electron.BrowserWindow.addDevToolsExtension(devtronPath);
  // auto open the settings window in dev so dont have to manually open it each time electron restarts
  (0, _settingsWindow.showSettingsWindow)();
}exports.setUpDev = setUpDev;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSettingsIPClisteners = undefined;

var _electron = __webpack_require__(3);

var _types = __webpack_require__(6);

var _settings = __webpack_require__(0);

function initSettingsIPClisteners() {
  _electron.ipcMain.on('renderer:setting-updated-in-ui', function (event, settingName, settingValue) {
    (0, _settings.updateSetting)(settingName, settingValue);
  });
  _electron.ipcMain.on('renderer:device-added-in-ui', function (event, deviceToAdd) {
    (0, _settings.addNewDeviceToSearchFor)(deviceToAdd);
  });
  _electron.ipcMain.on('renderer:device-removed-in-ui', function (event, deviceToRemove) {
    (0, _settings.removeNewDeviceToSearchFor)(deviceToRemove);
  });
}exports.initSettingsIPClisteners = initSettingsIPClisteners;

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("auto-launch");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSettingsObservers = undefined;

var _gawk = __webpack_require__(16);

var _gawk2 = _interopRequireDefault(_gawk);

var _settingsWindow = __webpack_require__(5);

var _logging = __webpack_require__(1);

var _tray = __webpack_require__(15);

var _runOnStartup = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initSettingsObservers(settings) {
  _gawk2.default.watch(settings, ['lanLostEnabled'], function (enabled) {
    var _settingsWindow$webCo;

    _settingsWindow.settingsWindow == null ? void 0 : (_settingsWindow$webCo = _settingsWindow.settingsWindow.webContents) == null ? void 0 : _settingsWindow$webCo.send('mainprocess:setting-updated-in-main', { lanLostEnabled: enabled });
    (0, _tray.updateTrayMenu)();
  });
  _gawk2.default.watch(settings, ['reportErrors'], function (enabled) {
    if (enabled) (0, _logging.addRollbarLogging)();else (0, _logging.removeRollbarLogging)();
  });
  _gawk2.default.watch(settings, ['runOnStartup'], function (enabled) {
    if (enabled) (0, _runOnStartup.enableRunOnStartup)();else (0, _runOnStartup.disableRunOnStartup)();
  });
  _gawk2.default.watch(settings, ['trayIconColor'], _tray.changeTrayIcon);
}exports.initSettingsObservers = initSettingsObservers;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSettings = undefined;

var _types = __webpack_require__(6);

const defaultSettings = {
  lanLostEnabled: true,
  runOnStartup: true,
  trayIconColor: 'blue',
  devicesToSearchFor: {},
  timeToLock: 2,
  reportErrors: true,
  hostsScanRangeStart: 2,
  hostsScanRangeEnd: 254,
  hostScanTimeout: 3000,
  enableOUIfileUpdate: true,
  firstRun: true,
  canSearchForMacVendorInfo: true,
  dateLastCheckedForOUIupdate: Date.now(),
  settingsWindowPosition: null,
  dateLastCheckedForAppUpdate: Date.now(),
  skipUpdateVersion: '0.2.3'
};

exports.defaultSettings = defaultSettings;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("lowdb/adapters/FileSync");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("lowdb");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeDebugWindow = exports.showDebugWindow = exports.debugWindow = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(8);

var _url2 = _interopRequireDefault(_url);

var _electron = __webpack_require__(3);

var _logging = __webpack_require__(1);

var _settings = __webpack_require__(0);

var _settingsWindow = __webpack_require__(5);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debugWindowHTMLpath = _url2.default.format({
  protocol: 'file',
  slashes: true,
  pathname: _path2.default.resolve(__dirname, '..', 'debugWindow', 'renderer', 'debugWindow.html')
});
const debugWindowProperties = {
  width: 786,
  height: 616,
  title: 'LANLost',
  autoHideMenuBar: true,
  resizable: false,
  fullscreenable: false,
  fullscreen: false,
  show: false,
  webPreferences: {
    textAreasAreResizable: true,
    devTools: false
  }

  // Remove the menu in alt menu bar in prod, so they dont accidentally exit the app.
};const debugWindowMenu =  false ? undefined : null;
let debugWindow = null;

function showDebugWindow() {
  if (debugWindow) return debugWindow.show();

  exports.debugWindow = debugWindow = new _electron.BrowserWindow(debugWindowProperties);
  debugWindow.loadURL(debugWindowHTMLpath);
  debugWindow.setMenu(debugWindowMenu);
  if (false) {}

  debugWindow.once('ready-to-show', function () {
    debugWindow.show();
  });
  debugWindow.once('close', function () {
    var _settingsWindow$webCo;

    _settingsWindow.settingsWindow == null ? void 0 : (_settingsWindow$webCo = _settingsWindow.settingsWindow.webContents) == null ? void 0 : _settingsWindow$webCo.send('mainprocess:setting-updated-in-main', { userDebug: false });
  });
  debugWindow.once('closed', function () {
    exports.debugWindow = debugWindow = null;
  });
  debugWindow.webContents.once('dom-ready', function () {
    (0, _settings.logStartupSettings)();
    _logging.logger.debug('Current LANLost settings:', (0, _utils.omitGawkFromSettings)((0, _settings.getSettings)()));
  });
  debugWindow.webContents.once('crashed', function (event) {
    _logging.logger.error('debugWindow.webContents crashed', event);
  });
  debugWindow.once('unresponsive', function (event) {
    _logging.logger.error('debugWindow unresponsive', event);
  });
}function closeDebugWindow() {
  debugWindow.close();
}_electron.ipcMain.on('renderer:user-debug-toggled', function (event, userDebug) {
  if (userDebug) showDebugWindow();else debugWindow == null ? void 0 : typeof debugWindow.close !== 'function' ? void 0 : debugWindow.close();
});

exports.debugWindow = debugWindow;
exports.showDebugWindow = showDebugWindow;
exports.closeDebugWindow = closeDebugWindow;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserDebugLoggerTransport = undefined;

var _util = __webpack_require__(9);

var _util2 = _interopRequireDefault(_util);

var _winston = __webpack_require__(10);

var _winston2 = _interopRequireDefault(_winston);

var _debugWindow = __webpack_require__(41);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/****
* This is the loggger for when the user checks the "debug" checkbox in the options
* window. The log data is sent to the debug window renderer and displayed there.
*/
const UserDebugLoggerTransport = _winston2.default.transports.CustomLogger = function (options) {
  Object.assign(this, options);
};_util2.default.inherits(UserDebugLoggerTransport, _winston2.default.Transport);

UserDebugLoggerTransport.prototype.log = function (level, msg = '', meta = {}, callback) {
  var _debugWindow$webConte;

  _debugWindow.debugWindow == null ? void 0 : (_debugWindow$webConte = _debugWindow.debugWindow.webContents) == null ? void 0 : typeof _debugWindow$webConte.send !== 'function' ? void 0 : _debugWindow$webConte.send('mainprocess:debug-info-sent', { level, msg, meta: (0, _utils.recursiveOmitFilterAndInheritedPropertiesFromObj)(meta, ['__stackCleaned__']) });
  callback(null, true);
};exports.UserDebugLoggerTransport = UserDebugLoggerTransport;

/***/ }),
/* 43 */
/***/ (function(module) {

module.exports = {"name":"lanlost","productName":"LANLost","version":"0.2.3","description":"A desktop app that locks your computer when a device is lost on your local network","main":"app/main/appMain-compiled.js","scripts":{"webpackWatch":"cross-env NODE_ENV=development parallel-webpack --watch --max-retries=1 --no-stats","electronWatch":"cross-env NODE_ENV=development nodemon app/main/appMain-compiled.js --config nodemon.json","styleWatch":"cross-env NODE_ENV=development stylus -w app/settingsWindow/renderer/assets/styles/stylus/index.styl -o app/settingsWindow/renderer/assets/styles/css/settingsWindowCss-compiled.css","lintWatch":"cross-env NODE_ENV=development esw -w --ext .lsc -c .eslintrc.json --color --clear","debug":"cross-env NODE_ENV=development,nodeDebug=true parallel-webpack && sleepms 3000 && electron --inspect-brk app/main/appMain-compiled.js","start":"cross-env NODE_ENV=production electron app/main/appMain-compiled.js","devTasks":"cross-env NODE_ENV=development node devTasks/tasks.js","snyk-protect":"snyk protect","prepare":"npm run snyk-protect"},"repository":"https://github.com/Darkle/LANLost.git","author":"Darkle <coop.coding@gmail.com>","license":"MIT","dependencies":{"@hyperapp/logger":"^0.5.0","add-line-numbers":"^1.0.1","auto-launch":"^5.0.5","bluebird":"^3.5.1","default-gateway":"^2.7.0","dotenv":"^5.0.1","electron-positioner":"^3.0.0","formbase":"^6.0.3","fs-jetpack":"^1.3.0","gawk":"^4.4.5","got":"^8.3.0","hyperapp":"^1.2.0","internal-ip":"^3.0.1","is-empty":"^1.2.0","is-ip":"^2.0.0","lock-system":"^1.3.0","lowdb":"^1.0.0","ms":"^2.1.1","node-arp":"^1.0.6","ono":"^4.0.3","rollbar":"^2.3.9","stringify-object":"^3.2.2","winston":"^2.4.1"},"devDependencies":{"@oigroup/babel-preset-lightscript":"^3.1.0-alpha.2","@oigroup/lightscript-eslint":"^3.1.0-alpha.2","babel-core":"^6.26.0","babel-eslint":"^8.2.2","babel-loader":"^7.1.4","babel-plugin-transform-react-jsx":"^6.24.1","babel-register":"^6.26.0","chalk":"^2.3.2","cross-env":"^5.1.4","del":"^3.0.0","devtron":"^1.4.0","electron":"^1.8.4","electron-packager":"^11.2.0","electron-reload":"^1.2.2","electron-wix-msi":"^1.3.0","eslint":"=4.8.0","eslint-plugin-jsx":"0.0.2","eslint-plugin-react":"^7.7.0","eslint-watch":"^3.1.3","exeq":"^3.0.0","inquirer":"^5.2.0","nodemon":"^1.17.2","parallel-webpack":"^2.3.0","semver":"^5.5.0","sleep-ms":"^2.0.1","snyk":"^1.70.2","stylus":"^0.54.5","webpack":"^4.3.0","webpack-node-externals":"^1.6.0"},"snyk":true};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("rollbar");

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rollbarLogger = exports.CustomRollbarTransport = undefined;

var _util = __webpack_require__(9);

var _util2 = _interopRequireDefault(_util);

var _winston = __webpack_require__(10);

var _winston2 = _interopRequireDefault(_winston);

var _rollbar = __webpack_require__(44);

var _rollbar2 = _interopRequireDefault(_rollbar);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rollbarConfig = {
  accessToken: process.env.rollbarAccessToken,
  enabled: false,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: "production",
  reportLevel: 'error',
  payload: {
    mainOrRenderer: 'main',
    platform: process.platform,
    processVersions: process.versions,
    arch: process.arch,
    LANLostVersion: (0, _utils.getProperAppVersion)()
  },
  // Ignore the server stuff cause that includes info about the host pc name.
  transform(payload) {
    return payload.server = {};
  }
};

const rollbarLogger = new _rollbar2.default(rollbarConfig);

const CustomRollbarTransport = _winston2.default.transports.CustomLogger = function (options) {
  Object.assign(this, options);
};_util2.default.inherits(CustomRollbarTransport, _winston2.default.Transport);

CustomRollbarTransport.prototype.log = function (level, msg = '', error, callback) {
  // Only log errors.
  if (level !== 'error') return;
  rollbarLogger.error(msg, error);
  callback(null, true);
};exports.CustomRollbarTransport = CustomRollbarTransport;
exports.rollbarLogger = rollbarLogger;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _dotenv = __webpack_require__(46);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://bit.ly/2xEDMxk
_dotenv2.default.config({ path: _path2.default.resolve(__dirname, '..', '..', 'config', '.env') });

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(47);

var _electron = __webpack_require__(3);

var _logging = __webpack_require__(1);

var _setUpDev = __webpack_require__(34);

var _settings = __webpack_require__(0);

var _utils = __webpack_require__(2);

var _tray = __webpack_require__(15);

var _settingsWindow = __webpack_require__(5);

var _networkScanner = __webpack_require__(32);

var _updateOUIfilePeriodically = __webpack_require__(20);

var _runOnStartup = __webpack_require__(14);

var _appUpdates = __webpack_require__(19);

if (_electron.app.makeSingleInstance(_utils.noop)) _electron.app.quit();

_electron.app.once('ready', function () {
  var _electronApp$dock;

  const { firstRun } = (0, _settings.getSettings)();

  if (false) {}
  if (!firstRun) (_electronApp$dock = _electron.app.dock) == null ? void 0 : _electronApp$dock.hide();

  (0, _tray.initTrayMenu)();
  (0, _networkScanner.scanNetwork)();
  (0, _updateOUIfilePeriodically.scheduleOUIfileUpdate)();
  (0, _appUpdates.checkForUpdate)();

  if (firstRun) {
    (0, _settings.updateSetting)('firstRun', !firstRun);
    (0, _settingsWindow.showSettingsWindow)();
    (0, _runOnStartup.enableRunOnStartup)(firstRun);
  }
});

_electron.app.on('window-all-closed', _utils.noop);

process.on('unhandledRejection', _logging.logger.error);
process.on('uncaughtException', function (err) {
  _logging.logger.error(err);
  process.exit(1);
} // eslint-disable-line no-process-exit
);

/***/ })
/******/ ]);