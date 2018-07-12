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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/components/settingsWindow/renderer/settingsWindowRendererMain.lsc");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/components/debugWindow/debugWindow.lsc":
/*!****************************************************!*\
  !*** ./app/components/debugWindow/debugWindow.lsc ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debugWindow = undefined;

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(/*! url */ "url");

var _url2 = _interopRequireDefault(_url);

var _electron = __webpack_require__(/*! electron */ "electron");

var _logging = __webpack_require__(/*! ../logging/logging.lsc */ "./app/components/logging/logging.lsc");

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/components/settings/settings.lsc");

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/components/settingsWindow/settingsWindow.lsc");

var _utils = __webpack_require__(/*! ../utils.lsc */ "./app/components/utils.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debugWindowHTMLpath = _url2.default.format({
  protocol: 'file',
  slashes: true,
  pathname: _path2.default.resolve(__dirname, 'components', 'debugWindow', 'renderer', 'debugWindow.html')
});
let debugWindow = null;

function showDebugWindow() {
  if (debugWindow) {
    return debugWindow.webContents.openDevTools({ mode: 'undocked' });
  }exports.debugWindow = debugWindow = new _electron.BrowserWindow({ show: false });
  debugWindow.loadURL(debugWindowHTMLpath);
  debugWindow.webContents.openDevTools({ mode: 'undocked' });

  debugWindow.once('closed', function () {
    exports.debugWindow = debugWindow = null;
  });
  /**
   * Without a delay, the console has trouble showing the VM:line to the right of
   * what you just logged, instead it shows (unknown) which kinda looks like we're
   * printing 'Current BlueLoss settings: (unknown)'
   */
  debugWindow.webContents.once('devtools-opened', function () {
    setTimeout(() => {
      return _logging.logger.debug('Current BlueLoss settings:', (0, _utils.omitGawkFromSettings)((0, _settings.getSettings)()));
    }, 500);
  });
  debugWindow.webContents.once('devtools-closed', function () {
    var _settingsWindow$webCo;

    _settingsWindow.settingsWindow == null ? void 0 : (_settingsWindow$webCo = _settingsWindow.settingsWindow.webContents) == null ? void 0 : _settingsWindow$webCo.send('mainprocess:setting-updated-in-main', { debugMode: false });
    debugWindow.close();
  });
  debugWindow.webContents.once('crashed', function (event) {
    _logging.logger.error('debugWindow.webContents crashed', event);
  });
  debugWindow.once('unresponsive', function (event) {
    _logging.logger.error('debugWindow unresponsive', event);
  });
}exports.debugWindow = debugWindow;

/***/ }),

/***/ "./app/components/logging/customRollbarTransport.lsc":
/*!***********************************************************!*\
  !*** ./app/components/logging/customRollbarTransport.lsc ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rollbarLogger = exports.CustomRollbarTransport = undefined;

var _util = __webpack_require__(/*! util */ "util");

var _util2 = _interopRequireDefault(_util);

var _winston = __webpack_require__(/*! winston */ "winston");

var _winston2 = _interopRequireDefault(_winston);

var _rollbar = __webpack_require__(/*! rollbar */ "rollbar");

var _rollbar2 = _interopRequireDefault(_rollbar);

var _utils = __webpack_require__(/*! ../utils.lsc */ "./app/components/utils.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rollbarConfig = {
  accessToken: process.env.rollbarAccessToken,
  enabled: false,
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: "development",
  reportLevel: 'error',
  payload: {
    mainOrRenderer: 'main',
    platform: process.platform,
    processVersions: process.versions,
    arch: process.arch,
    BlueLossVersion: (0, _utils.getProperAppVersion)()
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

/***/ "./app/components/logging/logSettingsUpdates.lsc":
/*!*******************************************************!*\
  !*** ./app/components/logging/logSettingsUpdates.lsc ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logSettingsUpdateForDebugMode = undefined;

var _typa = __webpack_require__(/*! typa */ "typa");

var _typa2 = _interopRequireDefault(_typa);

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/components/types/types.lsc");

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/components/settings/settings.lsc");

var _logging = __webpack_require__(/*! ./logging.lsc */ "./app/components/logging/logging.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logSettingsUpdateForDebugMode(newSettingKey, newSettingValue) {
  if (false) {}
  const debugMessage = `Updated Setting: updated '${newSettingKey}' with:`;
  if (_typa2.default.obj(newSettingValue)) {
    _logging.logger.debug(debugMessage, { [newSettingKey]: newSettingValue });
  } else {
    _logging.logger.debug(`${debugMessage} ${newSettingValue}`);
  }
}exports.logSettingsUpdateForDebugMode = logSettingsUpdateForDebugMode;

/***/ }),

/***/ "./app/components/logging/logging.lsc":
/*!********************************************!*\
  !*** ./app/components/logging/logging.lsc ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeRollbarLogging = exports.addRollbarLogging = exports.logger = undefined;

var _electron = __webpack_require__(/*! electron */ "electron");

var _winston = __webpack_require__(/*! winston */ "winston");

var _winston2 = _interopRequireDefault(_winston);

var _customRollbarTransport = __webpack_require__(/*! ./customRollbarTransport.lsc */ "./app/components/logging/customRollbarTransport.lsc");

var _userDebugLogger = __webpack_require__(/*! ./userDebugLogger.lsc */ "./app/components/logging/userDebugLogger.lsc");

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/components/settings/settings.lsc");

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

if (true) {
  logger.add(_winston2.default.transports.Console, {
    handleExceptions: true,
    humanReadableUnhandledException: true
    // json: true
  });
} // dont send errors to rollbar in dev && only if enabled.
if (false) {}logger.add(_userDebugLogger.UserDebugLoggerTransport, userDebugTransportOptions);
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
_electron.ipcMain.on('bluetooth-scan-window-renderer:error-sent', function (event, error) {
  logger.error('bluetooth-scan-window-renderer:error-sent', error);
});

exports.logger = logger;
exports.addRollbarLogging = addRollbarLogging;
exports.removeRollbarLogging = removeRollbarLogging;

/***/ }),

/***/ "./app/components/logging/userDebugLogger.lsc":
/*!****************************************************!*\
  !*** ./app/components/logging/userDebugLogger.lsc ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserDebugLoggerTransport = undefined;

var _util = __webpack_require__(/*! util */ "util");

var _util2 = _interopRequireDefault(_util);

var _winston = __webpack_require__(/*! winston */ "winston");

var _winston2 = _interopRequireDefault(_winston);

var _isEmpty = __webpack_require__(/*! is-empty */ "is-empty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _debugWindow = __webpack_require__(/*! ../debugWindow/debugWindow.lsc */ "./app/components/debugWindow/debugWindow.lsc");

var _utils = __webpack_require__(/*! ../utils.lsc */ "./app/components/utils.lsc");

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
};function createObjectStringForLog(meta) {
  const cleanedMetaObj = (0, _utils.omitInheritedProperties)(meta);
  if ((0, _isEmpty2.default)(cleanedMetaObj)) return '';
  if (cleanedMetaObj.stack) cleanedMetaObj.stack = cleanedMetaObj.stack.split(/\r\n?|\n/);
  return `JSON.stringify(${JSON.stringify(cleanedMetaObj)}, null, 4)`;
}exports.UserDebugLoggerTransport = UserDebugLoggerTransport;

/***/ }),

/***/ "./app/components/runOnStartup.lsc":
/*!*****************************************!*\
  !*** ./app/components/runOnStartup.lsc ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableRunOnStartup = exports.enableRunOnStartup = undefined;

var _autoLaunch = __webpack_require__(/*! auto-launch */ "auto-launch");

var _autoLaunch2 = _interopRequireDefault(_autoLaunch);

var _logging = __webpack_require__(/*! ./logging/logging.lsc */ "./app/components/logging/logging.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const blueLossAutoLauncher = new _autoLaunch2.default({
  name: 'BlueLoss',
  isHidden: true
});

function enableRunOnStartup(firstRun) {
  if (firstRun && true) return;
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

/***/ "./app/components/settings/devices.lsc":
/*!*********************************************!*\
  !*** ./app/components/settings/devices.lsc ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLastSeenForDevicesLookingForOnStartup = exports.updateDeviceInDevicesToSearchFor = exports.removeNewDeviceToSearchFor = exports.addNewDeviceToSearchFor = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = __webpack_require__(/*! ../utils.lsc */ "./app/components/utils.lsc");

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/components/types/types.lsc");

var _settings = __webpack_require__(/*! ./settings.lsc */ "./app/components/settings/settings.lsc");

function addNewDeviceToSearchFor(deviceToAdd) {
  const { deviceId } = deviceToAdd;
  if (deviceIsInDevicesToSearchFor(deviceId)) return;
  (0, _settings.updateSetting)('devicesToSearchFor', _extends({}, (0, _settings.getSettings)().devicesToSearchFor, { [deviceId]: deviceToAdd }));
}function removeNewDeviceToSearchFor(deviceToRemove) {
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
  return (0, _settings.getSettings)().devicesToSearchFor[deviceId];
}function updateDeviceInDevicesToSearchFor(deviceId, propName, propValue) {
  return (0, _settings.updateSetting)('devicesToSearchFor', _extends({}, (0, _settings.getSettings)().devicesToSearchFor, {
    [deviceId]: _extends({}, (0, _settings.getSettings)().devicesToSearchFor[deviceId], { [propName]: propValue })
  }));
} /**
   * When a user starts up BlueLoss after previously exiting, the
   * lastSeen value will be out of date for the devices in
   * devicesToSearchFor. This would cause BlueLoss to lock the
   * system straight away because the lastSeen value + timeToLock
   *  will be less than Date.now(). So to prevent this, we give all
   * devices in devicesToSearchFor a lastSeen of 10 years from now.
   * (when a device is seen again during a scan, lastSeen is updated.)
   */
function updateLastSeenForDevicesLookingForOnStartup() {
  for (let _obj3 = (0, _settings.getSettings)().devicesToSearchFor, _i2 = 0, _keys2 = Object.keys(_obj3), _len2 = _keys2.length; _i2 < _len2; _i2++) {
    const _k = _keys2[_i2];const { deviceId } = _obj3[_k];
    updateDeviceInDevicesToSearchFor(deviceId, 'lastSeen', (0, _utils.tenYearsFromNow)());
  }
}exports.addNewDeviceToSearchFor = addNewDeviceToSearchFor;
exports.removeNewDeviceToSearchFor = removeNewDeviceToSearchFor;
exports.updateDeviceInDevicesToSearchFor = updateDeviceInDevicesToSearchFor;
exports.updateLastSeenForDevicesLookingForOnStartup = updateLastSeenForDevicesLookingForOnStartup;

/***/ }),

/***/ "./app/components/settings/settings.lsc":
/*!**********************************************!*\
  !*** ./app/components/settings/settings.lsc ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSettings = exports.updateSetting = exports.initSettings = undefined;

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(/*! electron */ "electron");

var _gawk = __webpack_require__(/*! gawk */ "gawk");

var _gawk2 = _interopRequireDefault(_gawk);

var _lowdb = __webpack_require__(/*! lowdb */ "lowdb");

var _lowdb2 = _interopRequireDefault(_lowdb);

var _FileSync = __webpack_require__(/*! lowdb/adapters/FileSync */ "lowdb/adapters/FileSync");

var _FileSync2 = _interopRequireDefault(_FileSync);

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/components/types/types.lsc");

var _settingsDefaults = __webpack_require__(/*! ./settingsDefaults.lsc */ "./app/components/settings/settingsDefaults.lsc");

var _settingsObservers = __webpack_require__(/*! ./settingsObservers.lsc */ "./app/components/settings/settingsObservers.lsc");

var _settingsIPClisteners = __webpack_require__(/*! ./settingsIPClisteners.lsc */ "./app/components/settings/settingsIPClisteners.lsc");

var _devices = __webpack_require__(/*! ./devices.lsc */ "./app/components/settings/devices.lsc");

var _logSettingsUpdates = __webpack_require__(/*! ../logging/logSettingsUpdates.lsc */ "./app/components/logging/logSettingsUpdates.lsc");

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
  (0, _devices.updateLastSeenForDevicesLookingForOnStartup)();
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

/***/ "./app/components/settings/settingsDefaults.lsc":
/*!******************************************************!*\
  !*** ./app/components/settings/settingsDefaults.lsc ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSettings = undefined;

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/components/types/types.lsc");

const defaultSettings = {
  blueLossEnabled: true,
  runOnStartup: true,
  trayIconColor: 'blue',
  devicesToSearchFor: {},
  timeToLock: 3,
  reportErrors: true,
  firstRun: true,
  settingsWindowPosition: {},
  debugMode: false
};

exports.defaultSettings = defaultSettings;

/***/ }),

/***/ "./app/components/settings/settingsIPClisteners.lsc":
/*!**********************************************************!*\
  !*** ./app/components/settings/settingsIPClisteners.lsc ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSettingsIPClisteners = undefined;

var _electron = __webpack_require__(/*! electron */ "electron");

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/components/types/types.lsc");

var _settings = __webpack_require__(/*! ./settings.lsc */ "./app/components/settings/settings.lsc");

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

/***/ "./app/components/settings/settingsObservers.lsc":
/*!*******************************************************!*\
  !*** ./app/components/settings/settingsObservers.lsc ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSettingsObservers = undefined;

var _gawk = __webpack_require__(/*! gawk */ "gawk");

var _gawk2 = _interopRequireDefault(_gawk);

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/components/settingsWindow/settingsWindow.lsc");

var _logging = __webpack_require__(/*! ../logging/logging.lsc */ "./app/components/logging/logging.lsc");

var _tray = __webpack_require__(/*! ../tray/tray.lsc */ "./app/components/tray/tray.lsc");

var _runOnStartup = __webpack_require__(/*! ../runOnStartup.lsc */ "./app/components/runOnStartup.lsc");

var _debugWindow = __webpack_require__(/*! ../debugWindow/debugWindow.lsc */ "./app/components/debugWindow/debugWindow.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initSettingsObservers(settings) {
  _gawk2.default.watch(settings, ['blueLossEnabled'], function (enabled) {
    var _settingsWindow$webCo;

    _settingsWindow.settingsWindow == null ? void 0 : (_settingsWindow$webCo = _settingsWindow.settingsWindow.webContents) == null ? void 0 : _settingsWindow$webCo.send('mainprocess:setting-updated-in-main', { blueLossEnabled: enabled });
    (0, _tray.updateTrayMenu)();
  });
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

/***/ "./app/components/settingsWindow/renderer/actions/actionsIndex.lsc":
/*!*************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/actions/actionsIndex.lsc ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _windowButtons = __webpack_require__(/*! ./windowButtons.lsc */ "./app/components/settingsWindow/renderer/actions/windowButtons.lsc");

var _toggleTab = __webpack_require__(/*! ./toggleTab.lsc */ "./app/components/settingsWindow/renderer/actions/toggleTab.lsc");

var _toggleTab2 = _interopRequireDefault(_toggleTab);

var _openLink = __webpack_require__(/*! ./openLink.lsc */ "./app/components/settingsWindow/renderer/actions/openLink.lsc");

var _openLink2 = _interopRequireDefault(_openLink);

var _animateDots = __webpack_require__(/*! ./animateDots.lsc */ "./app/components/settingsWindow/renderer/actions/animateDots.lsc");

var _animateDots2 = _interopRequireDefault(_animateDots);

var _updateSetting = __webpack_require__(/*! ./updateSetting.lsc */ "./app/components/settingsWindow/renderer/actions/updateSetting.lsc");

var _updateSetting2 = _interopRequireDefault(_updateSetting);

var _updateStateOnIpcMessage = __webpack_require__(/*! ./updateStateOnIpcMessage.lsc */ "./app/components/settingsWindow/renderer/actions/updateStateOnIpcMessage.lsc");

var _updateStateOnIpcMessage2 = _interopRequireDefault(_updateStateOnIpcMessage);

var _changeTrayIconColor = __webpack_require__(/*! ./changeTrayIconColor.lsc */ "./app/components/settingsWindow/renderer/actions/changeTrayIconColor.lsc");

var _changeTrayIconColor2 = _interopRequireDefault(_changeTrayIconColor);

var _removeDevice = __webpack_require__(/*! ./removeDevice.lsc */ "./app/components/settingsWindow/renderer/actions/removeDevice.lsc");

var _removeDevice2 = _interopRequireDefault(_removeDevice);

var _addNewDevice = __webpack_require__(/*! ./addNewDevice.lsc */ "./app/components/settingsWindow/renderer/actions/addNewDevice.lsc");

var _addNewDevice2 = _interopRequireDefault(_addNewDevice);

var _toggleDebugWindow = __webpack_require__(/*! ./toggleDebugWindow.lsc */ "./app/components/settingsWindow/renderer/actions/toggleDebugWindow.lsc");

var _toggleDebugWindow2 = _interopRequireDefault(_toggleDebugWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  minimizeSettingsWindow: _windowButtons.minimizeSettingsWindow,
  closeSettingsWindow: _windowButtons.closeSettingsWindow,
  toggleTab: _toggleTab2.default,
  openLink: _openLink2.default,
  animateDots: _animateDots2.default,
  updateSetting: _updateSetting2.default,
  updateStateOnIpcMessage: _updateStateOnIpcMessage2.default,
  changeTrayIconColor: _changeTrayIconColor2.default,
  removeDevice: _removeDevice2.default,
  addNewDevice: _addNewDevice2.default,
  toggleDebugWindow: _toggleDebugWindow2.default
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/actions/addNewDevice.lsc":
/*!*************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/actions/addNewDevice.lsc ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(/*! electron */ "electron");

var _types = __webpack_require__(/*! ../../../types/types.lsc */ "./app/components/types/types.lsc");

/**
* HyperApp - if you need to use the state & actions and return data, you need
* to use `(value) => (state, actions) =>`
* https://github.com/hyperapp/hyperapp#actions
*/
exports.default = function addNewDevice(newDevice) {
  return function (state) {
    if (state.devicesToSearchFor[newDevice.deviceId]) return {};
    _electron.ipcRenderer.send('renderer:device-added-in-ui', newDevice);
    return {
      devicesToSearchFor: _extends({}, state.devicesToSearchFor, {
        [newDevice.deviceId]: newDevice
      })
    };
  };
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/actions/animateDots.lsc":
/*!************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/actions/animateDots.lsc ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// HyperApp - this is called from a lifecycle event, so the element is the thing thats passed in.
exports.default = function animateDots(element) {
  function animateStatusDots(interval = 0) {
    setTimeout(function () {
      element.classList.toggle('play');
      animateStatusDots(!element.classList.contains('play') ? 285 : 4200);
    }, interval);
  }animateStatusDots();
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/actions/changeTrayIconColor.lsc":
/*!********************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/actions/changeTrayIconColor.lsc ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(/*! electron */ "electron");

exports.default = function changeTrayIconColor(newTrayIconColor) {
  _electron.ipcRenderer.send('renderer:setting-updated-in-ui', 'trayIconColor', newTrayIconColor);
  return { trayIconColor: newTrayIconColor };
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/actions/openLink.lsc":
/*!*********************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/actions/openLink.lsc ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(/*! electron */ "electron");

exports.default = function openLink(event) {
  event.preventDefault();
  _electron.shell.openExternal(event.currentTarget.dataset.externalLink);
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/actions/removeDevice.lsc":
/*!*************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/actions/removeDevice.lsc ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(/*! electron */ "electron");

var _types = __webpack_require__(/*! ../../../types/types.lsc */ "./app/components/types/types.lsc");

/**
* HyperApp - if you need to use the state & actions and return data, you need
* to use `(value) => (state, actions) =>`
* https://github.com/hyperapp/hyperapp#actions
*/
exports.default = function removeDevice(deviceToRemove) {
  return function (state) {
    if (!state.devicesToSearchFor[deviceToRemove.deviceId]) return {};
    _electron.ipcRenderer.send('renderer:device-removed-in-ui', deviceToRemove);
    return {
      devicesToSearchFor: (() => {
        const _obj = {};
        for (let _obj2 = state.devicesToSearchFor, _i = 0, _keys = Object.keys(_obj2), _len = _keys.length; _i < _len; _i++) {
          const deviceId = _keys[_i];const device = _obj2[deviceId];
          if (deviceId !== deviceToRemove.deviceId) _obj[deviceId] = device;
        }return _obj;
      })()
    };
  };
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/actions/toggleDebugWindow.lsc":
/*!******************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/actions/toggleDebugWindow.lsc ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(/*! electron */ "electron");

exports.default = function toggleDebugWindow(element) {
  const toggled = element.currentTarget.toggled;
  _electron.ipcRenderer.send('renderer:setting-updated-in-ui', 'debugMode', toggled);
  return { debugMode: toggled };
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/actions/toggleTab.lsc":
/*!**********************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/actions/toggleTab.lsc ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// HyperApp - this is called from a lifecycle event, so the element is the thing thats passed in.
exports.default = function toggleTab(event) {
  return { activeTab: event.currentTarget.id };
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/actions/updateSetting.lsc":
/*!**************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/actions/updateSetting.lsc ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(/*! electron */ "electron");

exports.default = function updateSetting({ settingName, settingValue }) {
  _electron.ipcRenderer.send('renderer:setting-updated-in-ui', settingName, settingValue);
  return { [settingName]: settingValue };
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/actions/updateStateOnIpcMessage.lsc":
/*!************************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/actions/updateStateOnIpcMessage.lsc ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function updateStateOnIpcMessage(newStateObjToMerge) {
  return newStateObjToMerge;
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/actions/windowButtons.lsc":
/*!**************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/actions/windowButtons.lsc ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeSettingsWindow = exports.minimizeSettingsWindow = undefined;

var _electron = __webpack_require__(/*! electron */ "electron");

const currentWindow = _electron.remote.getCurrentWindow();

function minimizeSettingsWindow() {
  currentWindow.minimize();
}function closeSettingsWindow() {
  currentWindow.close();
}exports.minimizeSettingsWindow = minimizeSettingsWindow;
exports.closeSettingsWindow = closeSettingsWindow;

/***/ }),

/***/ "./app/components/settingsWindow/renderer/components/deviceCard.lsc":
/*!**************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/components/deviceCard.lsc ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

exports.default = function deviceCard({ lookingForDevice, device, actions }) {
  const { deviceName, deviceId } = device;
  return (0, _hyperapp.h)(
    "x-card",
    { "class": "deviceCard" },
    (0, _hyperapp.h)(
      "x-box",
      null,
      (0, _hyperapp.h)(
        "x-box",
        { "class": "cardDeviceIcon" },
        (0, _hyperapp.h)("img", { src: `assets/icons/devicesIconForCards-${lookingForDevice ? 'blue' : 'grey'}.svg` })
      ),
      (0, _hyperapp.h)(
        "x-box",
        { vertical: true, "class": "deviceDetails" },
        (0, _hyperapp.h)(
          "strong",
          { "class": "vendorName" },
          deviceName
        ),
        (0, _hyperapp.h)(
          "p",
          { "class": "deviceMacAddress" },
          deviceId
        )
      ),
      (0, _hyperapp.h)(
        "x-box",
        { "class": "addRemoveButton" },

        // if expressions: http://bit.ly/2kNbt9R
        lookingForDevice ? (0, _hyperapp.h)(
          "x-button",
          { onclick: function () {
              actions.removeDevice(device);
            } },
          (0, _hyperapp.h)(
            "x-box",
            null,
            (0, _hyperapp.h)(
              "x-label",
              null,
              "Remove"
            )
          )
        ) : (0, _hyperapp.h)(
          "x-button",
          { onclick: function () {
              actions.addNewDevice(device);
            } },
          (0, _hyperapp.h)(
            "x-box",
            null,
            (0, _hyperapp.h)(
              "x-label",
              null,
              "Add"
            )
          )
        )
      )
    )
  );
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/settingsWindowRendererMain.lsc":
/*!*******************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/settingsWindowRendererMain.lsc ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-line no-unused-vars


var _electron = __webpack_require__(/*! electron */ "electron");

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

var _logger = __webpack_require__(/*! @hyperapp/logger */ "@hyperapp/logger");

var _actionsIndex = __webpack_require__(/*! ./actions/actionsIndex.lsc */ "./app/components/settingsWindow/renderer/actions/actionsIndex.lsc");

var _actionsIndex2 = _interopRequireDefault(_actionsIndex);

var _viewsIndex = __webpack_require__(/*! ./views/viewsIndex.lsc */ "./app/components/settingsWindow/renderer/views/viewsIndex.lsc");

var _viewsIndex2 = _interopRequireDefault(_viewsIndex);

var _types = __webpack_require__(/*! ../../types/types.lsc */ "./app/components/types/types.lsc");

var _utils = __webpack_require__(/*! ../../utils.lsc */ "./app/components/utils.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logInDev =  true ? _logger.withLogger : undefined;

const settingsWindowRendererApp = logInDev(_hyperapp.app)(_extends({
  activeTab: 'statusTab',
  devicesCanSee: [],
  debugMode: false
}, _electron.ipcRenderer.sendSync('renderer:intitial-settings-request')), _actionsIndex2.default, _viewsIndex2.default, document.body);

_electron.ipcRenderer.on('mainprocess:setting-updated-in-main', function (event, setting) {
  settingsWindowRendererApp == null ? void 0 : typeof settingsWindowRendererApp.updateStateOnIpcMessage !== 'function' ? void 0 : settingsWindowRendererApp.updateStateOnIpcMessage(setting);
});
_electron.ipcRenderer.on('mainprocess:update-of-bluetooth-devices-can-see', function (event, devicesCanSee) {
  settingsWindowRendererApp == null ? void 0 : typeof settingsWindowRendererApp.updateStateOnIpcMessage !== 'function' ? void 0 : settingsWindowRendererApp.updateStateOnIpcMessage(devicesCanSee);
});

/**
* https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
* https://stackoverflow.com/a/43911292/2785644
*/
function handleRendererWindowError(messageOrEvent, source, lineNumber, columnNumber, error) {
  _electron.ipcRenderer.send('settings-renderer:error-sent', { messageOrEvent, source, lineNumber, columnNumber, error: (0, _utils.omitInheritedProperties)(error) });
}window.onerror = handleRendererWindowError;
window.onunhandledrejection = handleRendererWindowError;

/***/ }),

/***/ "./app/components/settingsWindow/renderer/views/aboutInfoWindow.lsc":
/*!**************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/views/aboutInfoWindow.lsc ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(/*! electron */ "electron");

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

exports.default = function ({ actions, state }) {
  const infoWindowDisplay = state.activeTab === 'aboutTab' ? 'flex' : 'none';

  return (0, _hyperapp.h)(
    'div',
    { id: 'aboutTabInfoWindow', style: { display: infoWindowDisplay } },
    (0, _hyperapp.h)(
      'x-box',
      { vertical: true },
      (0, _hyperapp.h)(
        'x-card',
        null,
        (0, _hyperapp.h)(
          'header',
          null,
          (0, _hyperapp.h)(
            'h3',
            null,
            'BlueLoss ',
            _electron.remote.app.getVersion()
          )
        ),
        (0, _hyperapp.h)(
          'main',
          { id: 'aboutDetails' },
          (0, _hyperapp.h)(
            'p',
            null,
            (0, _hyperapp.h)(
              'a',
              { id: 'aboutRepoLink', onclick: actions.openLink, 'data-external-link': 'https://github.com/Darkle/BlueLoss', href: 'https://github.com/Darkle/BlueLoss' },
              'https://github.com/Darkle/BlueLoss'
            )
          ),
          (0, _hyperapp.h)(
            'table',
            null,
            (0, _hyperapp.h)(
              'tr',
              null,
              (0, _hyperapp.h)(
                'td',
                null,
                'electron:'
              ),
              (0, _hyperapp.h)(
                'td',
                null,
                process.versions.electron
              )
            ),
            (0, _hyperapp.h)(
              'tr',
              null,
              (0, _hyperapp.h)(
                'td',
                null,
                'chrome:'
              ),
              (0, _hyperapp.h)(
                'td',
                null,
                process.versions.chrome
              )
            ),
            (0, _hyperapp.h)(
              'tr',
              null,
              (0, _hyperapp.h)(
                'td',
                null,
                'node:'
              ),
              (0, _hyperapp.h)(
                'td',
                null,
                process.versions.node
              )
            ),
            (0, _hyperapp.h)(
              'tr',
              null,
              (0, _hyperapp.h)(
                'td',
                null,
                'v8:'
              ),
              (0, _hyperapp.h)(
                'td',
                null,
                process.versions.v8
              )
            )
          )
        )
      )
    )
  );
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/views/aboutTab.lsc":
/*!*******************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/views/aboutTab.lsc ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

exports.default = function ({ actions, state }) {
  const activeTabClass = state.activeTab === 'aboutTab' ? 'activeTab' : '';
  return (0, _hyperapp.h)(
    'div',
    {
      'class': `tab ${activeTabClass}`,
      id: 'aboutTab',
      onclick: actions.toggleTab
    },
    (0, _hyperapp.h)(
      'div',
      { 'class': 'tabIcon' },
      (0, _hyperapp.h)(
        'svg',
        { height: '24', viewbox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
        (0, _hyperapp.h)('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
        (0, _hyperapp.h)('path', { d: 'M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z' })
      )
    ),
    (0, _hyperapp.h)(
      'div',
      { 'class': 'tabText' },
      'About'
    ),
    (0, _hyperapp.h)(
      'div',
      { 'class': 'tabLip' },
      (0, _hyperapp.h)('div', { 'class': 'tabArrow' }),
      (0, _hyperapp.h)('div', { 'class': 'tabLine' })
    )
  );
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/views/header.lsc":
/*!*****************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/views/header.lsc ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

exports.default = function ({ actions }) {
  return (0, _hyperapp.h)(
    "div",
    { id: "header" },
    (0, _hyperapp.h)(
      "div",
      { id: "logo" },
      (0, _hyperapp.h)(
        "div",
        { id: "headerIcon" },
        (0, _hyperapp.h)("img", { src: "assets/icons/BlueLossIcon.svg" })
      ),
      (0, _hyperapp.h)(
        "div",
        { id: "headerText" },
        "BlueLoss"
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { id: "headerButtons" },
      (0, _hyperapp.h)("img", { id: "windowControlClose", src: "assets/icons/closeIcon.svg", onclick: actions.closeSettingsWindow }),
      (0, _hyperapp.h)("img", { id: "windowControlMinimize", src: "assets/icons/minimizeIcon.svg", onclick: actions.minimizeSettingsWindow })
    )
  );
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/views/helpTab.lsc":
/*!******************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/views/helpTab.lsc ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

exports.default = function ({ actions }) {
  return (0, _hyperapp.h)(
    "div",
    { "class": "tab", onclick: actions.openLink, id: "helpTab", "data-external-link": "https://github.com/Darkle/BlueLoss#readme" },
    (0, _hyperapp.h)(
      "div",
      { "class": "tabIcon" },
      (0, _hyperapp.h)(
        "svg",
        { height: "24", viewbox: "0 0 24 24", width: "24", xmlns: "http://www.w3.org/2000/svg" },
        (0, _hyperapp.h)("path", { d: "M0 0h24v24H0z", fill: "none" }),
        (0, _hyperapp.h)("path", { d: "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" })
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { "class": "tabText" },
      "Help"
    ),
    (0, _hyperapp.h)(
      "div",
      { "class": "tabLip" },
      (0, _hyperapp.h)("div", { "class": "tabArrow" }),
      (0, _hyperapp.h)("div", { "class": "tabLine" })
    )
  );
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/views/settingsInfoWindow.lsc":
/*!*****************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/views/settingsInfoWindow.lsc ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

var _settingsDefaults = __webpack_require__(/*! ../../../settings/settingsDefaults.lsc */ "./app/components/settings/settingsDefaults.lsc");

const minTimeToLock = _settingsDefaults.defaultSettings.timeToLock;

exports.default = function ({ actions, state }) {
  const infoWindowDisplay = state.activeTab === 'settingsTab' ? 'flex' : 'none';
  const iconColorIsWhite = state.trayIconColor === 'white';
  const isMac = process.platform === 'darwin';

  return (0, _hyperapp.h)(
    'div',
    { id: 'settingsTabInfoWindow', style: { display: infoWindowDisplay } },
    (0, _hyperapp.h)(
      'x-box',
      { id: 'timeToLockSetting' },
      (0, _hyperapp.h)(
        'x-numberinput',
        {
          id: 'timeToLock',
          value: state.timeToLock,
          suffix: ' mins',
          min: '2',
          onchange: function ({ currentTarget: { value } }) {
            const newTimeToLock = value < minTimeToLock ? minTimeToLock : value;
            actions.updateSetting({ settingName: 'timeToLock', settingValue: newTimeToLock });
          }
        },
        (0, _hyperapp.h)('x-stepper', null)
      ),
      (0, _hyperapp.h)(
        'x-label',
        { 'for': 'timeToLock', id: 'timeToLockLabel' },
        (0, _hyperapp.h)(
          'x-box',
          { vertical: true },
          (0, _hyperapp.h)(
            'x-label',
            null,
            (0, _hyperapp.h)(
              'strong',
              null,
              'Time To Lock'
            )
          ),
          (0, _hyperapp.h)(
            'x-label',
            null,
            'Once a device has been lost, BlueLoss will wait this many minutes before locking the computer.'
          )
        )
      )
    ),
    (0, _hyperapp.h)(
      'x-box',
      { id: 'iconColorDropdownContainer' },
      (0, _hyperapp.h)(
        'select',
        {
          'class': 'select',
          id: 'iconColorDropdown',
          name: 'iconColorDropdown',
          onchange: function (event) {
            actions.changeTrayIconColor(event.currentTarget.value);
          }
        },
        (0, _hyperapp.h)(
          'option',
          { value: 'white', selected: iconColorIsWhite },
          'White'
        ),
        (0, _hyperapp.h)(
          'option',
          { value: 'blue', selected: !iconColorIsWhite },
          'Blue'
        )
      ),
      (0, _hyperapp.h)(
        'x-label',
        { 'for': 'iconColorDropdown', id: 'iconColorDropdownLabel' },
        (0, _hyperapp.h)(
          'x-box',
          { vertical: true },
          (0, _hyperapp.h)(
            'x-label',
            null,
            (0, _hyperapp.h)(
              'strong',
              null,
              isMac ? 'Menu Bar' : 'Tray',
              ' Icon Color'
            )
          )
        )
      )
    ),
    (0, _hyperapp.h)(
      'x-box',
      null,
      (0, _hyperapp.h)('x-checkbox', {
        id: 'erroReportingCheckbox',
        toggled: state.reportErrors,
        onchange: function (event) {
          actions.updateSetting({ settingName: 'reportErrors', settingValue: event.currentTarget.toggled });
        }
      }),
      (0, _hyperapp.h)(
        'x-label',
        { 'for': 'erroReportingCheckbox', id: 'erroReportingCheckboxLabel' },
        (0, _hyperapp.h)(
          'x-box',
          { vertical: true },
          (0, _hyperapp.h)(
            'x-label',
            null,
            (0, _hyperapp.h)(
              'strong',
              null,
              'Error Reporting'
            )
          ),
          (0, _hyperapp.h)(
            'x-label',
            null,
            'Any errors generated by the app will be sent to rollbar.com. This helps development of the app.'
          )
        )
      )
    ),
    (0, _hyperapp.h)(
      'x-box',
      null,
      (0, _hyperapp.h)('x-checkbox', {
        id: 'runOnStartupCheckbox',
        toggled: state.runOnStartup,
        onchange: function (event) {
          actions.updateSetting({ settingName: 'runOnStartup', settingValue: event.currentTarget.toggled });
        }
      }),
      (0, _hyperapp.h)(
        'x-label',
        { 'for': 'runOnStartupCheckbox', id: 'runOnStartupCheckboxLabel' },
        (0, _hyperapp.h)(
          'x-box',
          { vertical: true },
          (0, _hyperapp.h)(
            'x-label',
            null,
            (0, _hyperapp.h)(
              'strong',
              null,
              'Run On System Startup'
            )
          )
        )
      )
    ),
    (0, _hyperapp.h)(
      'x-box',
      null,
      (0, _hyperapp.h)('x-switch', {
        id: 'userDebugSwitch',
        toggled: state.debugMode,
        onchange: actions.toggleDebugWindow
      }),
      (0, _hyperapp.h)(
        'x-label',
        { 'for': 'userDebugSwitch', id: 'userDebugSwitchLabel' },
        (0, _hyperapp.h)(
          'x-box',
          { vertical: true },
          (0, _hyperapp.h)(
            'strong',
            null,
            'User Debugger'
          ),
          (0, _hyperapp.h)(
            'span',
            null,
            'Enabling this will show a debug window with information that may help you diagnose any issues.'
          )
        )
      )
    )
  );
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/views/settingsTab.lsc":
/*!**********************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/views/settingsTab.lsc ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

exports.default = function ({ actions, state }) {
  const activeTabClass = state.activeTab === 'settingsTab' ? 'activeTab' : '';
  return (0, _hyperapp.h)(
    'div',
    {
      'class': `tab ${activeTabClass}`,
      id: 'settingsTab',
      onclick: actions.toggleTab
    },
    (0, _hyperapp.h)(
      'div',
      { 'class': 'tabIcon' },
      (0, _hyperapp.h)(
        'svg',
        { height: '24', viewbox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
        (0, _hyperapp.h)('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
        (0, _hyperapp.h)('path', { d: 'M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z' })
      )
    ),
    (0, _hyperapp.h)(
      'div',
      { 'class': 'tabText' },
      'Settings'
    ),
    (0, _hyperapp.h)(
      'div',
      { 'class': 'tabLip' },
      (0, _hyperapp.h)('div', { 'class': 'tabArrow' }),
      (0, _hyperapp.h)('div', { 'class': 'tabLine' })
    )
  );
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/views/statusInfoWindow.lsc":
/*!***************************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/views/statusInfoWindow.lsc ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

var _deviceCard = __webpack_require__(/*! ../components/deviceCard.lsc */ "./app/components/settingsWindow/renderer/components/deviceCard.lsc");

var _deviceCard2 = _interopRequireDefault(_deviceCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function ({ actions, state }) {
  const infoWindowDisplay = state.activeTab === 'statusTab' ? 'flex' : 'none';
  const statusAnimationVisibility = state.blueLossEnabled ? 'visible' : 'hidden';
  const blueLossStatusText = state.blueLossEnabled ? 'Enabled' : 'Disabled';
  const lookingForHeaderDisplay = Object.keys(state.devicesToSearchFor).length ? 'block' : 'none';

  return (0, _hyperapp.h)(
    'div',
    { id: 'statusTabInfoWindow', style: { display: infoWindowDisplay } },
    (0, _hyperapp.h)(
      'div',
      { id: 'topStatus' },
      (0, _hyperapp.h)(
        'div',
        { id: 'statusAnimation', style: { visibility: statusAnimationVisibility } },
        (0, _hyperapp.h)(
          'ul',
          { oncreate: actions.animateDots },
          (0, _hyperapp.h)('li', null),
          (0, _hyperapp.h)('li', null),
          (0, _hyperapp.h)('li', null),
          (0, _hyperapp.h)('li', null),
          (0, _hyperapp.h)('li', null)
        )
      ),
      (0, _hyperapp.h)(
        'x-box',
        { id: 'disableButton' },
        (0, _hyperapp.h)('x-switch', {
          id: 'blueLossEnableswitch',
          toggled: state.blueLossEnabled,
          onchange: function (event) {
            actions.updateSetting({ settingName: 'blueLossEnabled', settingValue: event.currentTarget.toggled });
          }
        }),
        (0, _hyperapp.h)(
          'x-label',
          { 'for': 'blueLossEnableswitch', id: 'blueLossEnableswitch' },
          'BlueLoss ',
          blueLossStatusText
        )
      )
    ),
    (0, _hyperapp.h)(
      'div',
      { id: 'devicesContainer' },
      (0, _hyperapp.h)(
        'div',
        { id: 'lookingForHeader', style: { display: lookingForHeaderDisplay } },
        'Currently Looking For:'
      ),
      Object.values(state.devicesToSearchFor).map(function (device) {
        return (0, _hyperapp.h)(_deviceCard2.default, {
          key: device.deviceId,
          actions: actions,
          lookingForDevice: true,
          device: device
        });
      }),
      (0, _hyperapp.h)(
        'div',
        { id: 'deviceAddHeader' },
        'Devices To Add:'
      ),
      state.devicesCanSee.filter(function ({ deviceId }) {
        return !state.devicesToSearchFor[deviceId];
      }).map(function (device) {
        return (0, _hyperapp.h)(_deviceCard2.default, {
          key: device.deviceId,
          actions: actions,
          lookingForDevice: false,
          device: device
        });
      })
    ),
    (0, _hyperapp.h)('div', { id: 'devicesContainerBottomLip' })
  );
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/views/statusTab.lsc":
/*!********************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/views/statusTab.lsc ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

exports.default = function ({ actions, state }) {
  const activeTabClass = state.activeTab === 'statusTab' ? 'activeTab' : '';
  return (0, _hyperapp.h)(
    'div',
    {
      'class': `tab ${activeTabClass}`,
      id: 'statusTab',
      onclick: actions.toggleTab
    },
    (0, _hyperapp.h)(
      'div',
      { 'class': 'tabIcon' },
      (0, _hyperapp.h)(
        'svg',
        { style: 'enable-background:new 0 0 20 20;', version: '1.1', viewbox: '0 0 24 24', x: '0px', xmlns: 'http://www.w3.org/2000/svg', y: '0px' },
        (0, _hyperapp.h)(
          'g',
          null,
          (0, _hyperapp.h)('path', { d: 'M7.1,7.7c0.4-0.4,0.4-1-0.1-1.4C5.6,5,5.6,3,7,1.7c0.4-0.4,0.4-1,0.1-1.4c-0.4-0.4-1-0.4-1.4-0.1c-2.2,2.1-2.2,5.5,0,7.5 C6.1,8.2,6.7,8.1,7.1,7.7z' }),
          (0, _hyperapp.h)('path', { d: 'M12.9,7.7c0.4,0.4,1,0.4,1.4,0.1c2.2-2.1,2.2-5.5,0-7.5c-0.4-0.4-1-0.4-1.4,0.1c-0.4,0.4-0.4,1,0.1,1.4 C14.3,3,14.3,5,13,6.3C12.6,6.7,12.5,7.3,12.9,7.7z' }),
          (0, _hyperapp.h)('path', { d: 'M19,13h-8V5.7c0.6-0.3,1-1,1-1.7c0-1.1-0.9-2-2-2C8.9,2,8,2.9,8,4c0,0.7,0.4,1.4,1,1.7V13H1c-0.6,0-1,0.5-1,1v4 c0,0.5,0.4,1,1,1h1v1h3v-1h10v1h3v-1h1c0.5,0,1-0.5,1-1v-4C20,13.5,19.5,13,19,13z M3,17c-0.5,0-1-0.5-1-1c0-0.5,0.5-1,1-1 c0.6,0,1,0.5,1,1C4,16.6,3.5,17,3,17z M7,17c-0.6,0-1-0.5-1-1c0-0.5,0.4-1,1-1c0.5,0,1,0.5,1,1C8,16.6,7.5,17,7,17z M17,17h-7v-2h7 V17z' })
        )
      )
    ),
    (0, _hyperapp.h)(
      'div',
      { 'class': 'tabText' },
      'Status'
    ),
    (0, _hyperapp.h)(
      'div',
      { 'class': 'tabLip' },
      (0, _hyperapp.h)('div', { 'class': 'tabArrow' }),
      (0, _hyperapp.h)('div', { 'class': 'tabLine' })
    )
  );
};

/***/ }),

/***/ "./app/components/settingsWindow/renderer/views/viewsIndex.lsc":
/*!*********************************************************************!*\
  !*** ./app/components/settingsWindow/renderer/views/viewsIndex.lsc ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

var _header = __webpack_require__(/*! ../views/header.lsc */ "./app/components/settingsWindow/renderer/views/header.lsc");

var _header2 = _interopRequireDefault(_header);

var _aboutTab = __webpack_require__(/*! ../views/aboutTab.lsc */ "./app/components/settingsWindow/renderer/views/aboutTab.lsc");

var _aboutTab2 = _interopRequireDefault(_aboutTab);

var _helpTab = __webpack_require__(/*! ../views/helpTab.lsc */ "./app/components/settingsWindow/renderer/views/helpTab.lsc");

var _helpTab2 = _interopRequireDefault(_helpTab);

var _settingsTab = __webpack_require__(/*! ../views/settingsTab.lsc */ "./app/components/settingsWindow/renderer/views/settingsTab.lsc");

var _settingsTab2 = _interopRequireDefault(_settingsTab);

var _statusTab = __webpack_require__(/*! ../views/statusTab.lsc */ "./app/components/settingsWindow/renderer/views/statusTab.lsc");

var _statusTab2 = _interopRequireDefault(_statusTab);

var _statusInfoWindow = __webpack_require__(/*! ../views/statusInfoWindow.lsc */ "./app/components/settingsWindow/renderer/views/statusInfoWindow.lsc");

var _statusInfoWindow2 = _interopRequireDefault(_statusInfoWindow);

var _settingsInfoWindow = __webpack_require__(/*! ../views/settingsInfoWindow.lsc */ "./app/components/settingsWindow/renderer/views/settingsInfoWindow.lsc");

var _settingsInfoWindow2 = _interopRequireDefault(_settingsInfoWindow);

var _aboutInfoWindow = __webpack_require__(/*! ../views/aboutInfoWindow.lsc */ "./app/components/settingsWindow/renderer/views/aboutInfoWindow.lsc");

var _aboutInfoWindow2 = _interopRequireDefault(_aboutInfoWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (state, actions) {
  return (0, _hyperapp.h)(
    'div',
    null,
    (0, _hyperapp.h)(_header2.default, { actions: actions }),
    (0, _hyperapp.h)(
      'div',
      { id: 'mainContainer' },
      (0, _hyperapp.h)(
        'div',
        { id: 'sidebar' },
        (0, _hyperapp.h)(
          'div',
          { id: 'topTabs' },
          (0, _hyperapp.h)(_statusTab2.default, { actions: actions, state: state }),
          (0, _hyperapp.h)('hr', null),
          (0, _hyperapp.h)(_settingsTab2.default, { actions: actions, state: state }),
          (0, _hyperapp.h)('hr', null)
        ),
        (0, _hyperapp.h)(
          'div',
          { id: 'bottomTabs' },
          (0, _hyperapp.h)('hr', null),
          (0, _hyperapp.h)(_helpTab2.default, { actions: actions }),
          (0, _hyperapp.h)('hr', null),
          (0, _hyperapp.h)(_aboutTab2.default, { actions: actions, state: state })
        )
      ),
      (0, _hyperapp.h)(
        'div',
        { id: 'rightInfoContainer' },
        (0, _hyperapp.h)(_statusInfoWindow2.default, { actions: actions, state: state }),
        (0, _hyperapp.h)(_settingsInfoWindow2.default, { actions: actions, state: state }),
        (0, _hyperapp.h)(_aboutInfoWindow2.default, { actions: actions, state: state })
      )
    )
  );
};

/***/ }),

/***/ "./app/components/settingsWindow/settingsWindow.lsc":
/*!**********************************************************!*\
  !*** ./app/components/settingsWindow/settingsWindow.lsc ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settingsWindow = exports.toggleSettingsWindow = exports.showSettingsWindow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// import omit from 'lodash.omit'

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(/*! url */ "url");

var _url2 = _interopRequireDefault(_url);

var _electron = __webpack_require__(/*! electron */ "electron");

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/components/settings/settings.lsc");

var _logging = __webpack_require__(/*! ../logging/logging.lsc */ "./app/components/logging/logging.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { omitInheritedProperties, omitGawkFromSettings } from '../common/utils.lsc'

const settingsWindowRendererDirPath = _path2.default.join(__dirname, 'components', 'settingsWindow', 'renderer');
const iconsDir = _path2.default.join(settingsWindowRendererDirPath, 'assets', 'icons');
const settingsHTMLpath = _url2.default.format({
  protocol: 'file',
  slashes: true,
  pathname: _path2.default.resolve(settingsWindowRendererDirPath, 'settingsWindow.html')
});
const settingsWindowProperties = _extends({
  width: 786,
  height: 616,
  title: 'BlueLoss',
  autoHideMenuBar: true,
  resizable: false,
  fullscreenable: false,
  fullscreen: false,
  frame: false,
  show: false,
  icon: getIconPath(),
  webPreferences: {
    textAreasAreResizable: false,
    devTools: true
  }
}, getStoredWindowPosition());
/****
* Remove the menu in alt menu bar in prod, so they dont accidentally exit the app.
* Reload is for dev so we can easily reload the browserwindow with Ctrl+R.
*/
const settingsWindowMenu =  true ? _electron.Menu.buildFromTemplate([{ role: 'reload' }]) : undefined;
let settingsWindow = null;

function showSettingsWindow() {
  if (settingsWindow) return settingsWindow.show();

  _electron.ipcMain.on('renderer:intitial-settings-request', function (event) {
    return event.sender.send('mainprocess:intitial-settings-sent', (0, _settings.getSettings)());
  });

  exports.settingsWindow = settingsWindow = new _electron.BrowserWindow(_extends({}, settingsWindowProperties, getStoredWindowPosition(), { icon: getIconPath() }));
  settingsWindow.loadURL(settingsHTMLpath);
  settingsWindow.setMenu(settingsWindowMenu);
  if (true) settingsWindow.webContents.openDevTools({ mode: 'undocked' });

  settingsWindow.once('close', function () {
    (0, _settings.updateSetting)('settingsWindowPosition', settingsWindow.getBounds());
  });
  settingsWindow.once('ready-to-show', function () {
    settingsWindow.show();
  });
  settingsWindow.once('closed', function () {
    var _electronApp$dock;

    exports.settingsWindow = settingsWindow = null;
    (_electronApp$dock = _electron.app.dock) == null ? void 0 : _electronApp$dock.hide();
  });
  settingsWindow.webContents.once('crashed', function (event) {
    _logging.logger.error('settingsWindow.webContents crashed', event);
  });
  settingsWindow.once('unresponsive', function (event) {
    _logging.logger.error('settingsWindow unresponsive', event);
  });
}function getStoredWindowPosition() {
  const { x, y } = (0, _settings.getSettings)().settingsWindowPosition;
  return { x, y };
}function getIconPath() {
  const iconFileName = `BlueLoss-${(0, _settings.getSettings)().trayIconColor}-512x512.png`;
  return _path2.default.join(iconsDir, iconFileName);
}function toggleSettingsWindow() {
  if (!settingsWindow) {
    showSettingsWindow();
  } else if (settingsWindow.isVisible()) {
    settingsWindow.close();
  }
} /**
   * Some settings are just used internally and never exposed to the user -
   * e.g. firstRun, settingsWindowPosition, etc.
   */
// createSettingsWindowInitialSettings():Object ->
//   omit(
//     omitGawkFromSettings(omitInheritedProperties(getSettings())),
//     ['firstRun', 'settingsWindowPosition', 'dateLastCheckedForAppUpdate', 'skipUpdateVersion']
//   )

exports.showSettingsWindow = showSettingsWindow;
exports.toggleSettingsWindow = toggleSettingsWindow;
exports.settingsWindow = settingsWindow;

/***/ }),

/***/ "./app/components/tray/tray.lsc":
/*!**************************************!*\
  !*** ./app/components/tray/tray.lsc ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTrayMenu = exports.createContextMenu = exports.changeTrayIcon = exports.initTrayMenu = undefined;

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(/*! electron */ "electron");

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/components/settingsWindow/settingsWindow.lsc");

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/components/settings/settings.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let tray = null;
const trayIconsFolder = _path2.default.resolve(__dirname, 'components', 'tray', 'icons');

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
    click: toggleEnabledFromTray
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
}function toggleEnabledFromTray() {
  (0, _settings.updateSetting)('blueLossEnabled', !(0, _settings.getSettings)().blueLossEnabled);
}exports.initTrayMenu = initTrayMenu;
exports.changeTrayIcon = changeTrayIcon;
exports.createContextMenu = createContextMenu;
exports.updateTrayMenu = updateTrayMenu;

/***/ }),

/***/ "./app/components/types/types.lsc":
/*!****************************************!*\
  !*** ./app/components/types/types.lsc ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "./app/components/utils.lsc":
/*!**********************************!*\
  !*** ./app/components/utils.lsc ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bailOnFatalError = exports.generateLogTimeStamp = exports.getProperAppVersion = exports.tenYearsFromNow = exports.identity = exports.compose = exports.noop = exports.omitInheritedProperties = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _timeproxy = __webpack_require__(/*! timeproxy */ "timeproxy");

var _timeproxy2 = _interopRequireDefault(_timeproxy);

var _typa = __webpack_require__(/*! typa */ "typa");

var _typa2 = _interopRequireDefault(_typa);

var _logging = __webpack_require__(/*! ./logging/logging.lsc */ "./app/components/logging/logging.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If you run Electron by pointing it to a js file that's not in the base parent directory with the
 * package.json it will report the Electron binary version rather than what's in your package.json.
 * https://github.com/electron/electron/issues/7085
 */
const appVersion = __webpack_require__(/*! ../../package.json */ "./package.json").version;

function getProperAppVersion() {
  return appVersion;
} // omitGawkFromSettings(settings) -> recursivelyOmitObjProperties(settings, ['__gawk__'])
function noop() {
  return;
}function compose(...fns) {
  return function (value) {
    return fns.reduceRight((accumulator, current) => current(accumulator), value);
  };
}function identity(param) {
  return param;
}function tenYearsFromNow() {
  return Date.now() + _timeproxy2.default.FIVE_HUNDRED_WEEKS;
} // recursivelyOmitObjProperties(obj: Object, propertyFiltersArr: Array<string> = []):Object ->
//   Object.keys(obj).reduce((newObj, propName) ->
//     for elem propertyToFilter in propertyFiltersArr:
//       if propertyToFilter === propName: return newObj
//     if is.obj(obj[propName]):
//       return {...newObj, ...{ [propName]: recursivelyOmitObjProperties(obj[propName], propertyFiltersArr) }}
//     {...newObj, ...{ [propName]: obj[propName] }}
//   , {})

function omitInheritedProperties(obj) {
  return Object.getOwnPropertyNames(obj).reduce(function (newObj, propName) {
    if (_typa2.default.obj(obj[propName])) {
      return _extends({}, newObj, { [propName]: omitInheritedProperties(obj[propName]) });
    }return _extends({}, newObj, { [propName]: obj[propName] });
  }, {});
}function generateLogTimeStamp() {
  const today = new Date();
  return `[${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}]`;
}function bailOnFatalError(err) {
  console.error(err);
  _logging.logger == null ? void 0 : typeof _logging.logger.error !== 'function' ? void 0 : _logging.logger.error(err);
  process.exit(1);
}exports.omitInheritedProperties = omitInheritedProperties;
exports.noop = noop;
exports.compose = compose;
exports.identity = identity;
exports.tenYearsFromNow = tenYearsFromNow;
exports.getProperAppVersion = getProperAppVersion;
exports.generateLogTimeStamp = generateLogTimeStamp;
exports.bailOnFatalError = bailOnFatalError;

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, productName, version, description, main, scripts, repository, author, license, dependencies, devDependencies, snyk, default */
/***/ (function(module) {

module.exports = {"name":"blueloss","productName":"BlueLoss","version":"0.0.1","description":"A desktop app that locks your computer when a device is lost","main":"app/appMain-compiled.js","scripts":{"ww":"cross-env NODE_ENV=development parallel-webpack --watch --max-retries=1 --no-stats","ew":"cross-env NODE_ENV=development nodemon app/appMain-compiled.js --config nodemon.json","lintWatch":"cross-env NODE_ENV=development esw -w --ext .lsc -c .eslintrc.json --color --clear","debug":"cross-env NODE_ENV=development parallel-webpack && sleepms 3000 && electron --inspect-brk app/appMain-compiled.js","start":"cross-env NODE_ENV=production electron app/appMain-compiled.js","devTasks":"cross-env NODE_ENV=production node devTasks/tasks.js","test":"snyk test"},"repository":"https://github.com/Darkle/BlueLoss.git","author":"Darkle <coop.coding@gmail.com>","license":"MIT","dependencies":{"@hyperapp/logger":"^0.5.0","auto-launch":"^5.0.5","dotenv":"^6.0.0","electron-positioner":"^3.0.1","formbase":"^6.0.4","fs-jetpack":"^2.0.0","gawk":"^4.5.0","got":"^8.3.2","hyperapp":"^1.2.6","inquirer":"^6.0.0","is-empty":"^1.2.0","lock-system":"^1.3.0","lodash.omit":"^4.5.0","lowdb":"^1.0.0","ono":"^4.0.5","rollbar":"^2.3.9","snyk":"^1.88.2","stringify-object":"^3.2.2","timeproxy":"^1.2.1","typa":"^0.1.18","winston":"^2.4.1"},"devDependencies":{"@oigroup/babel-preset-lightscript":"^3.1.1","@oigroup/lightscript-eslint":"^3.1.1","babel-core":"^6.26.0","babel-eslint":"^8.2.5","babel-loader":"^7.1.5","babel-plugin-transform-react-jsx":"^6.24.1","babel-register":"^6.26.0","chalk":"^2.4.1","cross-env":"^5.2.0","del":"^3.0.0","devtron":"^1.4.0","electron":"^2.0.4","electron-packager":"^12.1.0","electron-reload":"^1.2.5","electron-wix-msi":"^1.3.0","eslint":"=4.8.0","eslint-plugin-jsx":"0.0.2","eslint-plugin-react":"^7.10.0","eslint-watch":"^4.0.1","exeq":"^3.0.0","node-7z":"^0.4.0","nodemon":"^1.18.0","parallel-webpack":"^2.3.0","semver":"^5.5.0","sleep-ms":"^2.0.1","webpack":"^4.15.1","webpack-node-externals":"^1.7.2"},"snyk":true};

/***/ }),

/***/ "@hyperapp/logger":
/*!***********************************!*\
  !*** external "@hyperapp/logger" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@hyperapp/logger");

/***/ }),

/***/ "auto-launch":
/*!******************************!*\
  !*** external "auto-launch" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("auto-launch");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "gawk":
/*!***********************!*\
  !*** external "gawk" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("gawk");

/***/ }),

/***/ "hyperapp":
/*!***************************!*\
  !*** external "hyperapp" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hyperapp");

/***/ }),

/***/ "is-empty":
/*!***************************!*\
  !*** external "is-empty" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("is-empty");

/***/ }),

/***/ "lowdb":
/*!************************!*\
  !*** external "lowdb" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lowdb");

/***/ }),

/***/ "lowdb/adapters/FileSync":
/*!******************************************!*\
  !*** external "lowdb/adapters/FileSync" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lowdb/adapters/FileSync");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "rollbar":
/*!**************************!*\
  !*** external "rollbar" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rollbar");

/***/ }),

/***/ "timeproxy":
/*!****************************!*\
  !*** external "timeproxy" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("timeproxy");

/***/ }),

/***/ "typa":
/*!***********************!*\
  !*** external "typa" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typa");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ })

/******/ });
//# sourceMappingURL=settingsWindowRendererMain-compiled.js.map