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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSettings = exports.updateSetting = exports.initSettings = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(2);

var _gawk = __webpack_require__(17);

var _gawk2 = _interopRequireDefault(_gawk);

var _lowdb = __webpack_require__(36);

var _lowdb2 = _interopRequireDefault(_lowdb);

var _FileSync = __webpack_require__(35);

var _FileSync2 = _interopRequireDefault(_FileSync);

var _settingsDefaults = __webpack_require__(34);

var _settingsObservers = __webpack_require__(33);

var _settingsIPClisteners = __webpack_require__(27);

var _devices = __webpack_require__(6);

var _logSettingsUpdates = __webpack_require__(26);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settingsDBpath = _path2.default.join(_electron.app.getPath('userData'), 'blueloss-settings.json');

let db = null;
let settings = null;

function initSettings() {
  const adapter = new _FileSync2.default(settingsDBpath);
  db = (0, _lowdb2.default)(adapter);
  db.defaults(_settingsDefaults.defaultSettings).write();
  settings = (0, _gawk2.default)(db.getState());
  (0, _settingsObservers.initSettingsObservers)(settings);
  (0, _settingsIPClisteners.initSettingsIPClisteners)();
  /**
  * When a user starts up BlueLoss after previously exiting, the
  * lastSeen value will be out of date for the devices in
  * devicesToSearchFor. This would cause BlueLoss to lock the
  * system straight away because the lastSeen value + timeToLock
  * will be less than Date.now(). So to prevent this, we give all
  * devices in devicesToSearchFor a lastSeen of 10 years from now.
  * (when a device is seen again during a scan, lastSeen is updated.)
  */
  (0, _devices.updateTimeStampForAllDevicesSearchingFor)((0, _utils.tenYearsFromNow)());
}function getSettings() {
  return settings;
}function updateSetting(newSettingKey, newSettingValue) {
  settings[newSettingKey] = newSettingValue;
  db.set(newSettingKey, newSettingValue).write();
  (0, _logSettingsUpdates.logSettingsUpdateForDebugMode)(newSettingKey, newSettingValue);
}exports.initSettings = initSettings;
exports.updateSetting = updateSetting;
exports.getSettings = getSettings;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeRollbarLogging = exports.addRollbarLogging = exports.initLogging = exports.logger = undefined;

var _electron = __webpack_require__(2);

var _winston = __webpack_require__(10);

var _winston2 = _interopRequireDefault(_winston);

var _customRollbarTransport = __webpack_require__(32);

var _userDebugLogger = __webpack_require__(29);

var _settings = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let logger = null;
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
};

function initLogging() {
  /*****
  * Note: we're using the old Winston 2.4 branch: https://github.com/winstonjs/winston/tree/2.4.1
  */
  exports.logger = logger = new _winston2.default.Logger({
    level: 'debug',
    exitOnError: false
  });

  if (false) {}(0, _customRollbarTransport.createRollbarLogger)();

  // dont send errors to rollbar in dev && only if enabled.
  if (!false && (0, _settings.getSettings)().reportErrors) {
    addRollbarLogging();
  }logger.add(_userDebugLogger.UserDebugLoggerTransport, userDebugTransportOptions);
} /**
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
_electron.ipcMain.on('bluetooth-scan-window-renderer:error-sent', function (event, error) {
  logger.error('bluetooth-scan-window-renderer:error-sent', error);
});

exports.logger = logger;
exports.initLogging = initLogging;
exports.addRollbarLogging = addRollbarLogging;
exports.removeRollbarLogging = removeRollbarLogging;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bailOnFatalError = exports.generateLogTimeStamp = exports.getProperAppVersion = exports.tenYearsFromNow = exports.identity = exports.pipe = exports.noop = exports.omitInheritedProperties = exports.omitGawkFromSettings = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _timeproxy = __webpack_require__(9);

var _timeproxy2 = _interopRequireDefault(_timeproxy);

var _typa = __webpack_require__(15);

var _typa2 = _interopRequireDefault(_typa);

var _logging = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If you run Electron by pointing it to a js file that's not in the base parent directory with the
 * package.json it will report the Electron binary version rather than what's in your package.json.
 * https://github.com/electron/electron/issues/7085
 */
const appVersion = __webpack_require__(30).version;

function getProperAppVersion() {
  return appVersion;
}function omitGawkFromSettings(settings) {
  return recursivelyOmitObjProperties(settings, ['__gawk__']);
}function noop() {
  return;
}function pipe(...fns) {
  return function (param) {
    return fns.reduce(function (result, fn) {
      return fn(result);
    }, param);
  };
}function identity(param) {
  return param;
}function tenYearsFromNow() {
  return Date.now() + _timeproxy2.default.FIVE_HUNDRED_WEEKS;
}function recursivelyOmitObjProperties(obj, propertyFiltersArr = []) {
  return Object.keys(obj).reduce(function (newObj, propName) {
    for (let _i = 0, _len = propertyFiltersArr.length; _i < _len; _i++) {
      const propertyToFilter = propertyFiltersArr[_i];
      if (propertyToFilter === propName) return newObj;
    }if (_typa2.default.obj(obj[propName])) {
      return _extends({}, newObj, { [propName]: recursivelyOmitObjProperties(obj[propName], propertyFiltersArr) });
    }return _extends({}, newObj, { [propName]: obj[propName] });
  }, {});
}function omitInheritedProperties(obj) {
  return Object.getOwnPropertyNames(obj).reduce(function (newObj, propName) {
    if (_typa2.default.obj(obj[propName])) {
      return _extends({}, newObj, { [propName]: omitInheritedProperties(obj[propName]) });
    }return _extends({}, newObj, { [propName]: obj[propName] });
  }, {});
}function generateLogTimeStamp() {
  const today = new Date();
  return `[${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}]`;
} /*****
  * Delay a little bit before exiting to allow the error to be sent to rollbar.
  */
function bailOnFatalError(err) {
  console.error(err);
  _logging.logger == null ? void 0 : typeof _logging.logger.error !== 'function' ? void 0 : _logging.logger.error(err);
  setTimeout(function () {
    return process.exit(1);
  }, _timeproxy2.default.THREE_SECONDS);
}exports.omitGawkFromSettings = omitGawkFromSettings;
exports.omitInheritedProperties = omitInheritedProperties;
exports.noop = noop;
exports.pipe = pipe;
exports.identity = identity;
exports.tenYearsFromNow = tenYearsFromNow;
exports.getProperAppVersion = getProperAppVersion;
exports.generateLogTimeStamp = generateLogTimeStamp;
exports.bailOnFatalError = bailOnFatalError;

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

var _electron = __webpack_require__(2);

var _settings = __webpack_require__(0);

var _logging = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settingsWindowRendererDirPath = _path2.default.join(__dirname, 'components', 'settingsWindow', 'renderer');
const iconsDir = _path2.default.join(settingsWindowRendererDirPath, 'assets', 'icons');
const settingsHTMLpath = _url2.default.format({
  protocol: 'file',
  slashes: true,
  pathname: _path2.default.resolve(settingsWindowRendererDirPath, 'settingsWindow.html')
});
const settingsWindowProperties = {
  width: 786,
  height: 616,
  title: 'BlueLoss',
  autoHideMenuBar: true,
  resizable: false,
  fullscreenable: false,
  fullscreen: false,
  frame: false,
  show: false,
  webPreferences: {
    textAreasAreResizable: false,
    devTools: false
  }
};

let settingsWindow = null;

function showSettingsWindow() {
  if (settingsWindow) return settingsWindow.show();

  _electron.ipcMain.on('renderer:intitial-settings-request', function (event) {
    return event.returnValue = (0, _settings.getSettings)();
  });

  exports.settingsWindow = settingsWindow = new _electron.BrowserWindow(_extends({}, settingsWindowProperties, getStoredWindowPosition(), { icon: getIconPath() }));
  settingsWindow.loadURL(settingsHTMLpath);
  /****
  * Remove the menu bar in prod, so they dont accidentally exit the app.
  * Reload is for dev so we can easily reload the browserwindow with Ctrl+R.
  */
  settingsWindow.setMenu( false ? undefined : null);
  if (false) {}

  settingsWindow.once('close', function () {
    (0, _settings.updateSetting)('settingsWindowPosition', settingsWindow.getBounds());
  });
  settingsWindow.once('ready-to-show', function () {
    settingsWindow.show();
  });
  settingsWindow.once('closed', function () {
    exports.settingsWindow = settingsWindow = null;
  });
  settingsWindow.webContents.once('crashed', function (event) {
    _logging.logger.error('settingsWindow.webContents crashed', event);
  });
  settingsWindow.once('unresponsive', function (event) {
    _logging.logger.error('settingsWindow unresponsive', event);
  });
}function getStoredWindowPosition() {
  const { settingsWindowPosition } = (0, _settings.getSettings)();
  if (!settingsWindowPosition) return {};
  return { x: settingsWindowPosition.x, y: settingsWindowPosition.y };
}function getIconPath() {
  const iconFileName = `BlueLoss-${(0, _settings.getSettings)().trayIconColor}-512x512.png`;
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


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTimeStampForSingleDeviceSearchingFor = exports.updateTimeStampForAllDevicesSearchingFor = exports.removeDeviceSearchingFor = exports.addNewDeviceToSearchFor = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _settings = __webpack_require__(0);

function addNewDeviceToSearchFor(deviceToAdd) {
  const { deviceId } = deviceToAdd;
  if (deviceIsInDevicesToSearchFor(deviceId)) return;
  (0, _settings.updateSetting)('devicesToSearchFor', _extends({}, (0, _settings.getSettings)().devicesToSearchFor, { [deviceId]: deviceToAdd }));
}function removeDeviceSearchingFor(deviceToRemove) {
  const { deviceId } = deviceToRemove;
  if (!deviceIsInDevicesToSearchFor(deviceId)) return;
  (0, _settings.updateSetting)('devicesToSearchFor', filterDevicesToSearchFor(deviceId));
}function filterDevicesToSearchFor(deviceIdToRemove) {
  return (() => {
    const _obj = {};for (let _obj2 = (0, _settings.getSettings)().devicesToSearchFor, _i = 0, _keys = Object.keys(_obj2), _len = _keys.length; _i < _len; _i++) {
      const deviceId = _keys[_i];const device = _obj2[deviceId];
      if (deviceId !== deviceIdToRemove) _obj[deviceId] = device;
    }return _obj;
  })();
}

function deviceIsInDevicesToSearchFor(deviceId) {
  return !!(0, _settings.getSettings)().devicesToSearchFor[deviceId];
}function updateTimeStampForSingleDeviceSearchingFor(deviceId, newTimeStamp) {
  const { devicesToSearchFor } = (0, _settings.getSettings)();
  const deviceToUpdate = devicesToSearchFor[deviceId];
  return (0, _settings.updateSetting)('devicesToSearchFor', _extends({}, devicesToSearchFor, { [deviceId]: _extends({}, deviceToUpdate, { lastSeen: newTimeStamp }) }));
}function updateTimeStampForAllDevicesSearchingFor(newTimeStamp) {
  (0, _settings.updateSetting)('devicesToSearchFor', (() => {
    const _obj3 = {};
    for (let _obj4 = (0, _settings.getSettings)().devicesToSearchFor, _i2 = 0, _keys2 = Object.keys(_obj4), _len2 = _keys2.length; _i2 < _len2; _i2++) {
      const deviceId = _keys2[_i2];const device = _obj4[deviceId];
      _obj3[deviceId] = _extends({}, device, { lastSeen: newTimeStamp });
    }return _obj3;
  })());
}exports.addNewDeviceToSearchFor = addNewDeviceToSearchFor;
exports.removeDeviceSearchingFor = removeDeviceSearchingFor;
exports.updateTimeStampForAllDevicesSearchingFor = updateTimeStampForAllDevicesSearchingFor;
exports.updateTimeStampForSingleDeviceSearchingFor = updateTimeStampForSingleDeviceSearchingFor;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTrayMenu = exports.createContextMenu = exports.changeTrayIcon = exports.initTrayMenu = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(2);

var _settingsWindow = __webpack_require__(5);

var _settings = __webpack_require__(0);

var _enableDisableBlueLoss = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let tray = null;
const trayIconsFolder = _path2.default.resolve(__dirname, 'components', 'tray', 'icons');
const blueLossToggledFromTray = true;

function initTrayMenu() {
  tray = new _electron.Tray(getNewTrayIconPath((0, _settings.getSettings)().trayIconColor));
  tray.setContextMenu(createContextMenu());
  tray.setToolTip('BlueLoss');
  tray.on('double-click', _settingsWindow.toggleSettingsWindow);
}function createContextMenu() {
  return _electron.Menu.buildFromTemplate([{
    label: 'Open BlueLoss Settings',
    click: _settingsWindow.showSettingsWindow
  }, {
    label: generateEnabledDisabledLabel(),
    click: () => {
      return (0, _enableDisableBlueLoss.enableDisableBlueLoss)(blueLossToggledFromTray, !(0, _settings.getSettings)().blueLossEnabled);
    }
  }, {
    label: 'Quit BlueLoss',
    click: _electron.app.quit
  }]);
}function getNewTrayIconPath(trayIconColor) {
  return _path2.default.join(trayIconsFolder, `BlueLoss-${trayIconColor}-128x128.png`);
}function generateEnabledDisabledLabel() {
  return `${(0, _settings.getSettings)().blueLossEnabled ? 'Disable' : 'Enable'} BlueLoss`;
}function changeTrayIcon(newTrayIconColor) {
  tray.setImage(getNewTrayIconPath(newTrayIconColor));
}function updateTrayMenu() {
  tray.setContextMenu(createContextMenu());
}exports.initTrayMenu = initTrayMenu;
exports.changeTrayIcon = changeTrayIcon;
exports.createContextMenu = createContextMenu;
exports.updateTrayMenu = updateTrayMenu;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("timeproxy");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableRunOnStartup = exports.enableRunOnStartup = undefined;

var _autoLaunch = __webpack_require__(28);

var _autoLaunch2 = _interopRequireDefault(_autoLaunch);

var _logging = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const blueLossAutoLauncher = new _autoLaunch2.default({
  name: 'BlueLoss',
  isHidden: true
});

function enableRunOnStartup(firstRun) {
  if (firstRun && false) return;
  blueLossAutoLauncher.enable().catch(function (err) {
    _logging.logger.error('enableRunOnStartup error: ', err);
  });
}function disableRunOnStartup() {
  blueLossAutoLauncher.disable().catch(function (err) {
    _logging.logger.error('disableRunOnStartup error: ', err);
  });
}exports.enableRunOnStartup = enableRunOnStartup;
exports.disableRunOnStartup = disableRunOnStartup;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableDisableBlueLoss = undefined;

var _tray = __webpack_require__(7);

var _settings = __webpack_require__(0);

var _settingsWindow = __webpack_require__(5);

var _utils = __webpack_require__(3);

var _devices = __webpack_require__(6);

/*****
* We aren't using a gawk observer for blueLossEnabled as we were running in to
* circular issues.
*
* We run `updateTimeStampForAllDevicesSearchingFor(tenYearsFromNow())` when BlueLoss
* is disabled because otherwise if you disabled BlueLoss and devices that you are
* looking for went away and then re-enabled BlueLoss, it would lock straight away.
*
* Also update the frontend when we enable/disable BlueLoss from the systray.
*/
function enableDisableBlueLoss(toggleFromSysTray, blueLossEnabled) {
  (0, _settings.updateSetting)('blueLossEnabled', blueLossEnabled);
  (0, _tray.updateTrayMenu)();
  if (toggleFromSysTray) {
    var _settingsWindow$webCo;

    _settingsWindow.settingsWindow == null ? void 0 : (_settingsWindow$webCo = _settingsWindow.settingsWindow.webContents) == null ? void 0 : _settingsWindow$webCo.send('mainprocess:blueloss-enabled-disabled', blueLossEnabled);
  }if (!blueLossEnabled) (0, _devices.updateTimeStampForAllDevicesSearchingFor)((0, _utils.tenYearsFromNow)());
}exports.enableDisableBlueLoss = enableDisableBlueLoss;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showDebugWindow = exports.debugWindow = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(8);

var _url2 = _interopRequireDefault(_url);

var _electron = __webpack_require__(2);

var _logging = __webpack_require__(1);

var _settings = __webpack_require__(0);

var _settingsWindow = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debugWindowHTMLpath = _url2.default.format({
  protocol: 'file',
  slashes: true,
  pathname: _path2.default.resolve(__dirname, 'components', 'debugWindow', 'renderer', 'debugWindow.html')
});
let debugWindow = null;

function showDebugWindow() {
  if (!(0, _settings.getSettings)().debugMode) return;
  if (debugWindow) return debugWindow.webContents.openDevTools({ mode: 'undocked' });
  createDebugWindow();
}function createDebugWindow() {
  exports.debugWindow = debugWindow = new _electron.BrowserWindow({ show: false });
  debugWindow.loadURL(debugWindowHTMLpath);
  debugWindow.webContents.openDevTools({ mode: 'undocked' });

  debugWindow.once('closed', function () {
    exports.debugWindow = debugWindow = null;
  });
  debugWindow.webContents.once('devtools-opened', function () {
    _logging.logger.debug('Current BlueLoss settings:', (0, _settings.getSettings)());
    _logging.logger.debug('Note: Scans take about a minute to complete.');
  });
  debugWindow.webContents.once('devtools-closed', function () {
    var _settingsWindow$webCo;

    (0, _settings.updateSetting)('debugMode', false);
    _settingsWindow.settingsWindow == null ? void 0 : (_settingsWindow$webCo = _settingsWindow.settingsWindow.webContents) == null ? void 0 : _settingsWindow$webCo.send('mainprocess:setting-updated-in-main', { debugMode: false });
    debugWindow == null ? void 0 : debugWindow.close();
  });
  debugWindow.webContents.once('crashed', function (event) {
    _logging.logger.error('debugWindow.webContents crashed', event);
  });
  debugWindow.once('unresponsive', function (event) {
    _logging.logger.error('debugWindow unresponsive', event);
  });
}exports.debugWindow = debugWindow;
exports.showDebugWindow = showDebugWindow;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("is-empty");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("typa");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("gawk");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("lock-system");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lockTheSystem = undefined;

var _lockSystem = __webpack_require__(18);

var _lockSystem2 = _interopRequireDefault(_lockSystem);

var _logging = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lockTheSystem(blueLossEnabled) {
  if (!blueLossEnabled) return;
  // lockSystem throws on error, so use try/catch
  try {
    (0, _lockSystem2.default)();
  } catch (err) {
    _logging.logger.error('Error occured trying to lock the system : ', err);
  }
}exports.lockTheSystem = lockTheSystem;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lockSystemIfDeviceLost = undefined;

var _timeproxy = __webpack_require__(9);

var _timeproxy2 = _interopRequireDefault(_timeproxy);

var _utils = __webpack_require__(3);

var _lockSystem = __webpack_require__(19);

var _settings = __webpack_require__(0);

var _devices = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  * If a device is lost we lock the computer, however, after that, if
  * the computer is unlocked without the device coming back, we don't want
  * to keep locking the computer because the device is still lost. So we
  * give the device that has just been lost a lastSeen value of 10 years
  * from now (not using Infinity cause it doesn't JSON.stringify for storage).
  */
function lockSystemIfDeviceLost() {
  const { devicesToSearchFor, timeToLock, blueLossEnabled } = (0, _settings.getSettings)();
  for (let _i = 0, _keys = Object.keys(devicesToSearchFor), _len = _keys.length; _i < _len; _i++) {
    const _k = _keys[_i];const { lastSeen, deviceId } = devicesToSearchFor[_k];
    if (deviceHasBeenLost(lastSeen, timeToLock)) {
      (0, _lockSystem.lockTheSystem)(blueLossEnabled);
      (0, _devices.updateTimeStampForSingleDeviceSearchingFor)(deviceId, (0, _utils.tenYearsFromNow)());
    }
  }
}function deviceHasBeenLost(lastTimeSawDevice, timeToLock) {
  return Date.now() > lastTimeSawDevice + _timeproxy2.default`${timeToLock} minutes`;
}exports.lockSystemIfDeviceLost = lockSystemIfDeviceLost;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendDevicesCanSeeToSettingsWindow = exports.handleScanResults = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isEmpty = __webpack_require__(14);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _logging = __webpack_require__(1);

var _settings = __webpack_require__(0);

var _devices = __webpack_require__(6);

var _settingsWindow = __webpack_require__(5);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dedupeDeviceListAndAddTimeStamps = (0, _utils.pipe)(dedupeDeviceList, addTimeStampToSeenDevices);
/**
 * handleScanResults doesn't get called from
 * ` scannerWindow.webContents.on('select-bluetooth-device', handleScanResults)`
 * if there are no results from the
 * `executeJavaScript(`navigator.bluetooth.requestDevice({acceptAllDevices: true})`, true)`
 * call. That's why we do the lockCheck in scanforDevices.
 *
 * Note: if you want to return early here, make sure to return the callback('')
 *
 * We check for blueLossEnabled before calling updateDevicesToSearchFor because if
 * they disable blueloss and a scan hasn't finished, when it does finish it will
 * update the devices lastSeen in devicesToSearchFor with Date.now() which is not
 * what we want. As you can see in enableDisableBlueLoss.lsc, we need to update the
 * devices lastSeen with tenYearsFromNow(). More comments in enableDisableBlueLoss.lsc.
 */
function handleScanResults(event, deviceList, callback) {
  event.preventDefault();

  const { devicesToSearchFor, blueLossEnabled } = (0, _settings.getSettings)();
  const processedDeviceList = dedupeDeviceListAndAddTimeStamps(deviceList);

  _logging.logger.debug(`Found these Bluetooth devices in scan: `, processedDeviceList);

  sendDevicesCanSeeToSettingsWindow(processedDeviceList);

  if (!(0, _isEmpty2.default)(devicesToSearchFor) && blueLossEnabled) {
    updateDevicesToSearchFor(devicesToSearchFor, processedDeviceList);
  }callback('');
} // http://bit.ly/2kZhD74

function sendDevicesCanSeeToSettingsWindow(processedDeviceList) {
  var _settingsWindow$webCo;

  _settingsWindow.settingsWindow == null ? void 0 : (_settingsWindow$webCo = _settingsWindow.settingsWindow.webContents) == null ? void 0 : _settingsWindow$webCo.send('mainprocess:update-of-bluetooth-devices-can-see', { devicesCanSee: processedDeviceList });
} /**
  * If any devices we are looking for showed up in the latest scan,
  * update the device's lastSeen value to now in devicesToSearchFor.
  */
function updateDevicesToSearchFor(devicesToSearchFor, deviceList) {
  for (let _i = 0, _len = deviceList.length; _i < _len; _i++) {
    const { deviceId } = deviceList[_i];
    if (devicesToSearchFor[deviceId]) {
      (0, _devices.updateTimeStampForSingleDeviceSearchingFor)(deviceId, Date.now());
    }
  }
}function addTimeStampToSeenDevices(deviceList) {
  return (() => {
    const _arr = [];for (let _i2 = 0, _len2 = deviceList.length; _i2 < _len2; _i2++) {
      const device = deviceList[_i2];_arr.push(_extends({}, device, { lastSeen: Date.now() }));
    }return _arr;
  })();
}

/*****
* Check for duplicates in deviceList cause of this bug (which I've run into too):
* https://github.com/electron/electron/issues/10800
* We remove duplicates, but also for any duplicates, we prefer to take the duplicate
* that has a device name (sometimes they have an empty string for a device name).
*/
function dedupeDeviceList(deviceList) {
  return deviceList.reduce(function (newDeviceList, newDevice) {
    const newDeviceId = newDevice.deviceId;
    const existingDevice = newDeviceList.find(function (device) {
      return device.deviceId === newDeviceId;
    });

    if (!existingDevice) {
      return [...(newDeviceList === void 0 ? [] : newDeviceList), newDevice];
    }if (betterNamedDevice(existingDevice, newDevice)) {
      var _ref;

      return [...(_ref = newDeviceList.filter(function (device) {
        return device.deviceId !== newDeviceId;
      }), _ref === void 0 ? [] : _ref), newDevice];
    }return newDeviceList;
  }, []);
}function betterNamedDevice(existingDevice, newDevice) {
  return existingDevice.deviceName.length === 0 && newDevice.deviceName.length > 0;
}exports.handleScanResults = handleScanResults;
exports.sendDevicesCanSeeToSettingsWindow = sendDevicesCanSeeToSettingsWindow;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("p-timeout");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(8);

var _url2 = _interopRequireDefault(_url);

var _electron = __webpack_require__(2);

var _timeproxy = __webpack_require__(9);

var _timeproxy2 = _interopRequireDefault(_timeproxy);

var _pTimeout = __webpack_require__(22);

var _pTimeout2 = _interopRequireDefault(_pTimeout);

var _handleScanResults = __webpack_require__(21);

var _logging = __webpack_require__(1);

var _settings = __webpack_require__(0);

var _lockCheck = __webpack_require__(20);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bluetoothHiddenWindowHTMLpath = _url2.default.format({
  protocol: 'file',
  slashes: true,
  pathname: _path2.default.resolve(__dirname, 'components', 'bluetooth', 'renderer', 'bluetoothHiddenWindow.html')
});
const bluetoothHiddenWindowProperties = {
  show: false,
  webPreferences: {
    experimentalFeatures: true // for web-bluetooth
  }
};
const invokeUserGesture = true;
let scannerWindow = null; // so it doesn't get garbage collected

function init() {
  createBluetoothScannerWindow().then(scanforDevices);
}function createBluetoothScannerWindow() {
  return new Promise(function (resolve) {
    scannerWindow = new _electron.BrowserWindow(bluetoothHiddenWindowProperties);
    scannerWindow.loadURL(bluetoothHiddenWindowHTMLpath);

    scannerWindow.webContents.once('dom-ready', resolve);
    scannerWindow.webContents.on('select-bluetooth-device', _handleScanResults.handleScanResults);
    scannerWindow.webContents.once('crashed', function (event) {
      _logging.logger.error('scannerWindow.webContents crashed', event);
    });
    scannerWindow.once('unresponsive', function (event) {
      _logging.logger.error('scannerWindow unresponsive', event);
    });
  });
} /*****
  * On Electron 1.8.7 the `navigator.bluetooth.requestDevice` call takes about a
  * minute to return results. Electron 2.0 and above don't take as long, but
  * unfortunately those versions don't seem to return multiple devices, they only
  * ever return one device.
  *
  * We use pTimeout here because if there are no devices around, `navigator.bluetooth.requestDevice`
  * never seems to resolve, which means `scannerWindow.webContents.executeJavaScript`
  * never resolves (or calls its callback), which means we get stuck here and don't do new scans.
  */
function scanforDevices() {
  if (!(0, _settings.getSettings)().blueLossEnabled) {
    return setTimeout(scanforDevices, _timeproxy2.default.TWENTY_SECONDS);
  }_logging.logger.debug(`=======New Scan Started=======  ${(0, _utils.generateLogTimeStamp)()}`);

  (0, _pTimeout2.default)(scannerWindow.webContents.executeJavaScript(`navigator.bluetooth.requestDevice({acceptAllDevices: true})`, invokeUserGesture), _timeproxy2.default.EIGHTY_SECONDS).catch(handleRequestDeviceErrors).then(_lockCheck.lockSystemIfDeviceLost).then(scanforDevices);
} /**
   * A NotFoundError is the norm on success.
   * A TimeoutError is the norm when no devices are found.
   * We also need to update the frontend settings window if there is a timeout,
   * as that means no devices were found.
   */
function handleRequestDeviceErrors(err) {
  if ((err == null ? void 0 : err.name) === 'NotFoundError') return;
  if ((err == null ? void 0 : err.name) === 'TimeoutError') {
    return (0, _handleScanResults.sendDevicesCanSeeToSettingsWindow)([]);
  }_logging.logger.error(err);
}exports.init = init;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("electron-reload");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUpDev = undefined;

var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const devtronPath = _path2.default.resolve(__dirname, '..', 'node_modules', 'devtron');
const settingsWindowDirPath = _path2.default.resolve(__dirname, 'components', 'settingsWindow', 'renderer');
const settingsWindowHTMLfilePath = _path2.default.join(settingsWindowDirPath, 'settingsWindow.html');
const settingsWindowCSSfilePath = _path2.default.join(settingsWindowDirPath, 'assets', 'styles', '*.*');
const settingsWindowJSfilePath = _path2.default.join(settingsWindowDirPath, 'settingsWindowRendererMain-compiled.js');
const settingsWindowIconFiles = _path2.default.join(settingsWindowDirPath, 'assets', 'icons', '*.*');
const debugWindowDirPath = _path2.default.resolve(__dirname, 'components', 'debugWindow', 'renderer');
const debugWindowHTMLfilePath = _path2.default.join(debugWindowDirPath, 'debugWindow.html');
const debugWindowJSfilePath = _path2.default.join(debugWindowDirPath, 'debugWindowRendererMain-compiled.js');
const bluetoothRendererJSfilePath = _path2.default.resolve(__dirname, 'components', 'bluetooth', 'renderer', 'bluetoothRendererMain-compiled.js');

function setUpDev() {
  if (true) return;
  __webpack_require__(24)([settingsWindowHTMLfilePath, settingsWindowCSSfilePath, settingsWindowJSfilePath, settingsWindowIconFiles, debugWindowHTMLfilePath, debugWindowJSfilePath, bluetoothRendererJSfilePath]);
  _electron.BrowserWindow.addDevToolsExtension(devtronPath);
  // auto open the settings window in dev so dont have to manually open it each time electron restarts
  __webpack_require__(5).showSettingsWindow();
}exports.setUpDev = setUpDev;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logSettingsUpdateForDebugMode = undefined;

var _typa = __webpack_require__(15);

var _typa2 = _interopRequireDefault(_typa);

var _settings = __webpack_require__(0);

var _logging = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logSettingsUpdateForDebugMode(newSettingKey, newSettingValue) {
  /*****
  * Check if the logger is instantiated first as logSettingsUpdateForDebugMode gets
  * called early on startup.
  */
  if (!(0, _settings.getSettings)().debugMode || !(_logging.logger == null ? void 0 : _logging.logger.debug)) return;
  const debugMessage = `Updated Setting: updated '${newSettingKey}' with:`;
  if (_typa2.default.obj(newSettingValue)) {
    _logging.logger.debug(debugMessage, { [newSettingKey]: newSettingValue });
  } else {
    _logging.logger.debug(`${debugMessage} ${newSettingValue}`);
  }
}exports.logSettingsUpdateForDebugMode = logSettingsUpdateForDebugMode;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSettingsIPClisteners = undefined;

var _electron = __webpack_require__(2);

var _settings = __webpack_require__(0);

var _devices = __webpack_require__(6);

var _enableDisableBlueLoss = __webpack_require__(12);

const blueLossToggledFromTray = false;

function initSettingsIPClisteners() {
  _electron.ipcMain.on('renderer:setting-updated-in-ui', function (event, settingName, settingValue) {
    (0, _settings.updateSetting)(settingName, settingValue);
  });
  _electron.ipcMain.on('renderer:device-added-in-ui', function (event, deviceToAdd) {
    (0, _devices.addNewDeviceToSearchFor)(deviceToAdd);
  });
  _electron.ipcMain.on('renderer:device-removed-in-ui', function (event, deviceToRemove) {
    (0, _devices.removeDeviceSearchingFor)(deviceToRemove);
  });
  _electron.ipcMain.on('renderer:blueloss-enabled-disabled', function (event, enabled) {
    (0, _enableDisableBlueLoss.enableDisableBlueLoss)(blueLossToggledFromTray, enabled);
  });
}exports.initSettingsIPClisteners = initSettingsIPClisteners;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("auto-launch");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserDebugLoggerTransport = undefined;

var _util = __webpack_require__(16);

var _util2 = _interopRequireDefault(_util);

var _winston = __webpack_require__(10);

var _winston2 = _interopRequireDefault(_winston);

var _isEmpty = __webpack_require__(14);

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _debugWindow = __webpack_require__(13);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/****
* This is the loggger for when the user checks the "debug" checkbox in the options
* window. The log data is sent to the debug window renderer devtools console.
*/
const UserDebugLoggerTransport = _winston2.default.transports.CustomLogger = function (options) {
  Object.assign(this, options);
};_util2.default.inherits(UserDebugLoggerTransport, _winston2.default.Transport);

UserDebugLoggerTransport.prototype.log = function (level, msg = '', meta = {}, callback) {
  var _debugWindow$webConte;

  const isError = level === 'error';
  const loggerMessage = isError ? 'Error:' : msg;
  const consoleMethod = isError ? 'error' : 'log';

  _debugWindow.debugWindow == null ? void 0 : (_debugWindow$webConte = _debugWindow.debugWindow.webContents) == null ? void 0 : typeof _debugWindow$webConte.executeJavaScript !== 'function' ? void 0 : _debugWindow$webConte.executeJavaScript(`console.${consoleMethod}(\`${(0, _utils.generateLogTimeStamp)()}  ${loggerMessage}\n\`, ${createObjectStringForLog(meta)});`).catch(_utils.noop);

  callback(null, true);
};const cleanMetaObject = (0, _utils.pipe)(_utils.omitGawkFromSettings, _utils.omitInheritedProperties);

function createObjectStringForLog(meta) {
  const cleanedMetaObj = cleanMetaObject(meta);
  if ((0, _isEmpty2.default)(cleanedMetaObj)) return '';
  if (cleanedMetaObj.stack) cleanedMetaObj.stack = cleanedMetaObj.stack.split(/\r\n?|\n/);
  return `JSON.stringify(${JSON.stringify(cleanedMetaObj)}, null, 4)`;
}exports.UserDebugLoggerTransport = UserDebugLoggerTransport;

/***/ }),
/* 30 */
/***/ (function(module) {

module.exports = {"name":"blueloss","productName":"BlueLoss","version":"0.0.2","description":"A desktop app that locks your computer when a device is lost","main":"app/appMain-compiled.js","scripts":{"ww":"cross-env NODE_ENV=development parallel-webpack --watch --max-retries=1 --no-stats","webpackBuildProduction":"cross-env NODE_ENV=production parallel-webpack","ew":"cross-env NODE_ENV=development nodemon app/appMain-compiled.js --config nodemon.json","lintWatch":"cross-env NODE_ENV=development esw -w --ext .lsc -c .eslintrc.json --color --clear","debug":"cross-env NODE_ENV=development parallel-webpack && sleepms 3000 && electron --inspect-brk app/appMain-compiled.js","start":"cross-env NODE_ENV=production electron app/appMain-compiled.js","devTasks":"cross-env NODE_ENV=production node devTasks/tasks.js","test":"snyk test"},"repository":"https://github.com/Darkle/BlueLoss.git","author":"Darkle <coop.coding@gmail.com>","license":"MIT","dependencies":{"@hyperapp/logger":"^0.5.0","auto-launch":"^5.0.5","dotenv":"^6.0.0","electron-positioner":"^3.0.1","formbase":"^6.0.4","gawk":"^4.5.0","hyperapp":"^1.2.6","is-empty":"^1.2.0","lock-system":"^1.3.0","lowdb":"^1.0.0","p-timeout":"^2.0.1","rollbar":"^2.3.9","snyk":"^1.88.2","timeproxy":"^1.2.1","typa":"^0.1.18","winston":"^2.4.1"},"devDependencies":{"@oigroup/babel-preset-lightscript":"^3.1.1","@oigroup/lightscript-eslint":"^3.1.1","babel-core":"^6.26.0","babel-eslint":"^8.2.5","babel-loader":"^7.1.5","babel-plugin-transform-react-jsx":"^6.24.1","babel-register":"^6.26.0","chalk":"^2.4.1","cross-env":"^5.2.0","del":"^3.0.0","devtron":"^1.4.0","electron":"^1.8.7","electron-packager":"^12.1.0","electron-reload":"^1.2.5","electron-wix-msi":"^1.3.0","eslint":"=4.8.0","eslint-plugin-jsx":"0.0.2","eslint-plugin-react":"^7.10.0","eslint-watch":"^4.0.1","exeq":"^3.0.0","fs-jetpack":"^2.0.0","inquirer":"^6.0.0","node-7z":"^0.4.0","nodemon":"^1.18.2","parallel-webpack":"^2.3.0","semver":"^5.5.0","sleep-ms":"^2.0.1","string-replace-webpack-plugin":"^0.1.3","stringify-object":"^3.2.2","webpack":"^4.15.1","webpack-node-externals":"^1.7.2"}};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("rollbar");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRollbarLogger = exports.rollbarLogger = exports.CustomRollbarTransport = undefined;

var _util = __webpack_require__(16);

var _util2 = _interopRequireDefault(_util);

var _winston = __webpack_require__(10);

var _winston2 = _interopRequireDefault(_winston);

var _rollbar = __webpack_require__(31);

var _rollbar2 = _interopRequireDefault(_rollbar);

var _utils = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let rollbarLogger = null;

function createRollbarLogger() {
  exports.rollbarLogger = rollbarLogger = new _rollbar2.default({
    accessToken: process.env.rollbarAccessToken,
    enabled: false,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: "production",
    reportLevel: 'error',
    payload: {
      platform: process.platform,
      processVersions: process.versions,
      arch: process.arch,
      BlueLossVersion: (0, _utils.getProperAppVersion)()
    },
    // Ignore the server stuff cause that includes info about the host pc name.
    transform(payload) {
      return payload.server = {};
    }
  });
}const CustomRollbarTransport = _winston2.default.transports.CustomLogger = function (options) {
  Object.assign(this, options);
};_util2.default.inherits(CustomRollbarTransport, _winston2.default.Transport);

CustomRollbarTransport.prototype.log = function (level, msg = '', error, callback) {
  // Only log errors.
  if (level !== 'error') return;
  rollbarLogger.error(msg, error);
  callback(null, true);
};exports.CustomRollbarTransport = CustomRollbarTransport;
exports.rollbarLogger = rollbarLogger;
exports.createRollbarLogger = createRollbarLogger;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSettingsObservers = undefined;

var _gawk = __webpack_require__(17);

var _gawk2 = _interopRequireDefault(_gawk);

var _logging = __webpack_require__(1);

var _tray = __webpack_require__(7);

var _runOnStartup = __webpack_require__(11);

var _debugWindow = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initSettingsObservers(settings) {
  _gawk2.default.watch(settings, ['reportErrors'], function (enabled) {
    if (enabled) (0, _logging.addRollbarLogging)();else (0, _logging.removeRollbarLogging)();
  });
  _gawk2.default.watch(settings, ['runOnStartup'], function (enabled) {
    if (enabled) (0, _runOnStartup.enableRunOnStartup)();else (0, _runOnStartup.disableRunOnStartup)();
  });
  _gawk2.default.watch(settings, ['debugMode'], function (enabled) {
    if (enabled) (0, _debugWindow.showDebugWindow)();else _debugWindow.debugWindow == null ? void 0 : typeof _debugWindow.debugWindow.close !== 'function' ? void 0 : _debugWindow.debugWindow.close();
  });
  _gawk2.default.watch(settings, ['trayIconColor'], _tray.changeTrayIcon);
}exports.initSettingsObservers = initSettingsObservers;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});


const defaultSettings = {
  blueLossEnabled: true,
  runOnStartup: true,
  trayIconColor: 'blue',
  devicesToSearchFor: {},
  timeToLock: 4,
  reportErrors: true,
  firstRun: true,
  settingsWindowPosition: null,
  debugMode: false
};

exports.defaultSettings = defaultSettings;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("lowdb/adapters/FileSync");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("lowdb");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(4);

var _path2 = _interopRequireDefault(_path);

var _dotenv = __webpack_require__(37);

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://bit.ly/2xEDMxk
_dotenv2.default.config({ path: _path2.default.resolve(__dirname, '..', 'config', '.env') });

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(38);

var _electron = __webpack_require__(2);

var _settings = __webpack_require__(0);

var _logging = __webpack_require__(1);

var _setUpDev = __webpack_require__(25);

var _blueToothMain = __webpack_require__(23);

var _utils = __webpack_require__(3);

var _tray = __webpack_require__(7);

var _settingsWindow = __webpack_require__(5);

var _runOnStartup = __webpack_require__(11);

if (_electron.app.makeSingleInstance(_utils.noop)) _electron.app.exit();

_electron.app.once('ready', function () {
  (0, _settings.initSettings)();
  (0, _logging.initLogging)();
  (0, _tray.initTrayMenu)();
  (0, _blueToothMain.init)();
  (0, _setUpDev.setUpDev)();

  const { firstRun } = (0, _settings.getSettings)();
  if (firstRun) {
    (0, _settings.updateSetting)('firstRun', !firstRun);
    (0, _settingsWindow.showSettingsWindow)();
    (0, _runOnStartup.enableRunOnStartup)(firstRun);
  }
});

_electron.app.on('window-all-closed', _utils.noop);
_electron.app.on('before-quit', function () {
  return (0, _settings.updateSetting)('debugMode', false);
});

process.on('unhandledRejection', _utils.bailOnFatalError);
process.on('uncaughtException', _utils.bailOnFatalError);

/***/ })
/******/ ]);