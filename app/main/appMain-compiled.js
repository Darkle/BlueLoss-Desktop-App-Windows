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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/main/appMain.lsc");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/common/logging/customRollbarTransport.lsc":
/*!*******************************************************!*\
  !*** ./app/common/logging/customRollbarTransport.lsc ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rollbarLogger = exports.CustomRollbarTransport = undefined;

var _util = __webpack_require__(/*! util */ "util");

var _util2 = _interopRequireDefault(_util);

var _electron = __webpack_require__(/*! electron */ "electron");

var _winston = __webpack_require__(/*! winston */ "winston");

var _winston2 = _interopRequireDefault(_winston);

var _rollbar = __webpack_require__(/*! rollbar */ "rollbar");

var _rollbar2 = _interopRequireDefault(_rollbar);

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
    lanLostVersion: _electron.app.getVersion()
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

/***/ "./app/common/logging/logging.lsc":
/*!****************************************!*\
  !*** ./app/common/logging/logging.lsc ***!
  \****************************************/
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

var _customRollbarTransport = __webpack_require__(/*! ./customRollbarTransport.lsc */ "./app/common/logging/customRollbarTransport.lsc");

var _userDebugLogger = __webpack_require__(/*! ./userDebugLogger.lsc */ "./app/common/logging/userDebugLogger.lsc");

var _settings = __webpack_require__(/*! ../../db/settings.lsc */ "./app/db/settings.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rollbarTransportOptions = {
  level: 'error',
  handleExceptions: true,
  humanReadableUnhandledException: true
};
const userDebugTransportOptions = {
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
    humanReadableUnhandledException: true,
    json: true
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
  logger.remove(_customRollbarTransport.CustomRollbarTransport);
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

/***/ "./app/common/logging/userDebugLogger.lsc":
/*!************************************************!*\
  !*** ./app/common/logging/userDebugLogger.lsc ***!
  \************************************************/
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

var _debugWindow = __webpack_require__(/*! ../../debugWindow/debugWindow.lsc */ "./app/debugWindow/debugWindow.lsc");

var _utils = __webpack_require__(/*! ../utils.lsc */ "./app/common/utils.lsc");

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

/***/ "./app/common/runOnStartup.lsc":
/*!*************************************!*\
  !*** ./app/common/runOnStartup.lsc ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disableRunOnStartup = exports.enableRunOnStartup = undefined;

var _autoLaunch = __webpack_require__(/*! auto-launch */ "./node_modules/auto-launch/dist/index.js");

var _autoLaunch2 = _interopRequireDefault(_autoLaunch);

var _logging = __webpack_require__(/*! ./logging/logging.lsc */ "./app/common/logging/logging.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lanLostAutoLauncher = new _autoLaunch2.default({
  name: 'LANLost',
  isHidden: true
});

function enableRunOnStartup(firstRun) {
  if (firstRun && true) return;
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

/***/ "./app/common/setUpDev.lsc":
/*!*********************************!*\
  !*** ./app/common/setUpDev.lsc ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUpDev = undefined;

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(/*! electron */ "electron");

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/settingsWindow/settingsWindow.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settingsWindowDirPath = _path2.default.resolve(__dirname, '..', 'settingsWindow', 'renderer');
const settingsWindowHTMLfilePath = _path2.default.join(settingsWindowDirPath, 'settingsWindow.html');
const settingsWindowCSSfilePath = _path2.default.join(settingsWindowDirPath, 'assets', 'styles', 'css', 'settingsWindowCss-compiled.css');
const settingsWindowJSfilePath = _path2.default.join(settingsWindowDirPath, 'settingsWindowRendererMain-compiled.js');
const settingsWindowIconFiles = _path2.default.join(settingsWindowDirPath, 'assets', 'icons', '*.*');
const debugWindowDirPath = _path2.default.resolve(__dirname, '..', 'debugWindow', 'renderer');
const debugWindowHTMLfilePath = _path2.default.join(debugWindowDirPath, 'debugWindow.html');
const debugWindowJSfilePath = _path2.default.join(debugWindowDirPath, 'debugWindowRendererMain-compiled.js');
const devtronPath = _path2.default.resolve(__dirname, '..', '..', 'node_modules', 'devtron');

function setUpDev() {
  if (false) {}
  __webpack_require__(/*! electron-reload */ "electron-reload")([settingsWindowHTMLfilePath, settingsWindowCSSfilePath, settingsWindowJSfilePath, settingsWindowIconFiles, debugWindowHTMLfilePath, debugWindowJSfilePath]);
  _electron.BrowserWindow.addDevToolsExtension(devtronPath);
  // auto open the settings window in dev so dont have to manually open it each time electron restarts
  (0, _settingsWindow.showSettingsWindow)();
}exports.setUpDev = setUpDev;

/***/ }),

/***/ "./app/common/utils.lsc":
/*!******************************!*\
  !*** ./app/common/utils.lsc ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curryRight = exports.curry = exports.pipe = exports.isObject = exports.noop = exports.omitInheritedProperties = exports.recursiveOmitFilterAndInheritedPropertiesFromObj = exports.omitGawkFromSettings = exports.logSettingsUpdate = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

var _logging = __webpack_require__(/*! ./logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function logSettingsUpdate(newSettingKey, newSettingValue) {
  _logging.logger.debug(`Updated Setting: updated '${newSettingKey}' with: ${newSettingValue}`);
  _logging.logger.debug(`Settings Are Now: `, omitGawkFromSettings((0, _settings.getSettings)()));
}function omitGawkFromSettings(settings) {
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
}function noop() {
  return;
}function isObject(obj) {
  return _lodash2.default.isObject(obj) && !_lodash2.default.isArray(obj) && !_lodash2.default.isFunction(obj);
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
}exports.logSettingsUpdate = logSettingsUpdate;
exports.omitGawkFromSettings = omitGawkFromSettings;
exports.recursiveOmitFilterAndInheritedPropertiesFromObj = recursiveOmitFilterAndInheritedPropertiesFromObj;
exports.omitInheritedProperties = omitInheritedProperties;
exports.noop = noop;
exports.isObject = isObject;
exports.pipe = pipe;
exports.curry = curry;
exports.curryRight = curryRight;

/***/ }),

/***/ "./app/db/settings.lsc":
/*!*****************************!*\
  !*** ./app/db/settings.lsc ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logStartupSettings = exports.removeNewDeviceToSearchFor = exports.addNewDeviceToSearchFor = exports.getSettings = exports.updateSetting = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(/*! electron */ "electron");

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _gawk = __webpack_require__(/*! gawk */ "gawk");

var _gawk2 = _interopRequireDefault(_gawk);

var _lowdb = __webpack_require__(/*! lowdb */ "lowdb");

var _lowdb2 = _interopRequireDefault(_lowdb);

var _FileSync = __webpack_require__(/*! lowdb/adapters/FileSync */ "lowdb/adapters/FileSync");

var _FileSync2 = _interopRequireDefault(_FileSync);

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

var _settingsDefaults = __webpack_require__(/*! ./settingsDefaults.lsc */ "./app/db/settingsDefaults.lsc");

var _settingsObservers = __webpack_require__(/*! ./settingsObservers.lsc */ "./app/db/settingsObservers.lsc");

var _settingsIPClisteners = __webpack_require__(/*! ./settingsIPClisteners.lsc */ "./app/db/settingsIPClisteners.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

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

function getSettings() {
  return settings;
}function updateSetting(newSettingKey, newSettingValue) {
  settings[newSettingKey] = newSettingValue;
  db.set(newSettingKey, newSettingValue).write();
  (0, _utils.logSettingsUpdate)(newSettingKey, newSettingValue);
}function addNewDeviceToSearchFor(deviceToAdd) {
  var _ref;

  if (findDeviceInDevicesToSearchFor(deviceToAdd.macAddress)) return;
  updateSetting('devicesToSearchFor', [...(_ref = settings.devicesToSearchFor, _ref === void 0 ? [] : _ref), ...[deviceToAdd]]);
}function removeNewDeviceToSearchFor({ macAddress: macAddressOfDeviceToRemove }) {
  if (!findDeviceInDevicesToSearchFor(macAddressOfDeviceToRemove)) return;
  updateSetting('devicesToSearchFor', settings.devicesToSearchFor.filter(function ({ macAddress }) {
    return macAddress !== macAddressOfDeviceToRemove;
  }));
} /*****
  * Regular Array.includes compares by reference, not value, so using _.find.
  */
function findDeviceInDevicesToSearchFor(macAddress) {
  return _lodash2.default.find(settings.devicesToSearchFor, { macAddress });
}function logStartupSettings() {
  return _logging.logger.debug('Settings Loaded At LANLost Startup:', settingsLoadedOnStartup);
}exports.updateSetting = updateSetting;
exports.getSettings = getSettings;
exports.addNewDeviceToSearchFor = addNewDeviceToSearchFor;
exports.removeNewDeviceToSearchFor = removeNewDeviceToSearchFor;
exports.logStartupSettings = logStartupSettings;

/***/ }),

/***/ "./app/db/settingsDefaults.lsc":
/*!*************************************!*\
  !*** ./app/db/settingsDefaults.lsc ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSettings = undefined;

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

const defaultSettings = {
  lanLostEnabled: true,
  runOnStartup: true,
  trayIconColor: 'white',
  devicesToSearchFor: [],
  timeToLock: 2,
  reportErrors: true,
  hostsScanRangeStart: 2,
  hostsScanRangeEnd: 254,
  hostScanTimeout: 3000,
  enableOUIfileUpdate: true,
  firstRun: true,
  canSearchForMacVendorInfo: true,
  dateLastCheckedForOUIupdate: Date.now(),
  settingsWindowPosition: null
};

exports.defaultSettings = defaultSettings;

/***/ }),

/***/ "./app/db/settingsIPClisteners.lsc":
/*!*****************************************!*\
  !*** ./app/db/settingsIPClisteners.lsc ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSettingsIPClisteners = undefined;

var _electron = __webpack_require__(/*! electron */ "electron");

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

var _settings = __webpack_require__(/*! ./settings.lsc */ "./app/db/settings.lsc");

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

/***/ "./app/db/settingsObservers.lsc":
/*!**************************************!*\
  !*** ./app/db/settingsObservers.lsc ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSettingsObservers = undefined;

var _gawk = __webpack_require__(/*! gawk */ "gawk");

var _gawk2 = _interopRequireDefault(_gawk);

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/settingsWindow/settingsWindow.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _tray = __webpack_require__(/*! ../tray/tray.lsc */ "./app/tray/tray.lsc");

var _runOnStartup = __webpack_require__(/*! ../common/runOnStartup.lsc */ "./app/common/runOnStartup.lsc");

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

/***/ "./app/debugWindow/debugWindow.lsc":
/*!*****************************************!*\
  !*** ./app/debugWindow/debugWindow.lsc ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeDebugWindow = exports.showDebugWindow = exports.debugWindow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(/*! url */ "url");

var _url2 = _interopRequireDefault(_url);

var _electron = __webpack_require__(/*! electron */ "electron");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/settingsWindow/settingsWindow.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debugWindowHTMLpath = _url2.default.format({
  protocol: 'file',
  slashes: true,
  pathname: _path2.default.resolve(__dirname, '..', 'debugWindow', 'renderer', 'debugWindow.html')
});
const debugWindowProperties = _extends({
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
    devTools: true
  }
});

// Remove the menu in alt menu bar in prod, so they dont accidentally exit the app.
const debugWindowMenu =  true ? _electron.Menu.buildFromTemplate([{ role: 'reload' }]) : undefined;
let debugWindow = null;

function showDebugWindow() {
  if (debugWindow) return debugWindow.show();

  exports.debugWindow = debugWindow = new _electron.BrowserWindow(debugWindowProperties);
  debugWindow.loadURL(debugWindowHTMLpath);
  debugWindow.setMenu(debugWindowMenu);
  if (true) debugWindow.webContents.openDevTools({ mode: 'undocked' });

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

/***/ "./app/main/appMain.lsc":
/*!******************************!*\
  !*** ./app/main/appMain.lsc ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ../../config/env.lsc */ "./config/env.lsc");

var _electron = __webpack_require__(/*! electron */ "electron");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _setUpDev = __webpack_require__(/*! ../common/setUpDev.lsc */ "./app/common/setUpDev.lsc");

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

var _tray = __webpack_require__(/*! ../tray/tray.lsc */ "./app/tray/tray.lsc");

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/settingsWindow/settingsWindow.lsc");

var _networkScanner = __webpack_require__(/*! ../networkScan/networkScanner.lsc */ "./app/networkScan/networkScanner.lsc");

var _updateOUIfilePeriodically = __webpack_require__(/*! ../oui/updateOUIfilePeriodically.lsc */ "./app/oui/updateOUIfilePeriodically.lsc");

var _runOnStartup = __webpack_require__(/*! ../common/runOnStartup.lsc */ "./app/common/runOnStartup.lsc");

if (_electron.app.makeSingleInstance(_utils.noop)) _electron.app.quit();

_electron.app.once('ready', function () {
  var _electronApp$dock;

  const { firstRun } = (0, _settings.getSettings)();
  if (!firstRun) (_electronApp$dock = _electron.app.dock) == null ? void 0 : _electronApp$dock.hide();
  if (true) (0, _setUpDev.setUpDev)();

  (0, _tray.initTrayMenu)();
  (0, _networkScanner.scanNetwork)();
  (0, _updateOUIfilePeriodically.scheduleOUIfileUpdate)();

  if (firstRun) {
    (0, _settings.updateSetting)('firstRun', !firstRun);
    (0, _settingsWindow.showSettingsWindow)();
    (0, _runOnStartup.enableRunOnStartup)(firstRun);
  }
});

_electron.app.on('window-all-closed', _utils.noop);

process.on('unhandledRejection', _logging.logger.error);

/***/ }),

/***/ "./app/networkScan/handleScanResults.lsc":
/*!***********************************************!*\
  !*** ./app/networkScan/handleScanResults.lsc ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleScanResults = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _ms = __webpack_require__(/*! ms */ "ms");

var _ms2 = _interopRequireDefault(_ms);

var _lockSystem = __webpack_require__(/*! lock-system */ "lock-system");

var _lockSystem2 = _interopRequireDefault(_lockSystem);

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/settingsWindow/settingsWindow.lsc");

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let lastTimeSawADeviceWeAreLookingFor = Date.now();

function handleScanResults(devices) {
  var _settingsWindow$webCo;

  /**
   * Dunno why, but you need an extra object at the end to make an array of objects
   * print right in winston.
   */
  _logging.logger.debug(`scan returned these active devices: \n`, devices);

  /**
   * We use the lastSeen time in the UI to show the user the last time we have
   * seen the devices we are looking for.
   */
  const devicesWithTimeData = addCurrentTimeToDevices(devices);
  const { devicesToSearchFor } = (0, _settings.getSettings)();

  _settingsWindow.settingsWindow == null ? void 0 : (_settingsWindow$webCo = _settingsWindow.settingsWindow.webContents) == null ? void 0 : _settingsWindow$webCo.send('mainprocess:update-of-network-devices-can-see', { devicesCanSee: devicesWithTimeData });

  if (!devicesToSearchFor.length) return;

  const sawADeviceWeAreLookingFor = _lodash2.default.intersectionBy(devicesToSearchFor, devicesWithTimeData, 'macAddress');

  if (sawADeviceWeAreLookingFor.length) {
    lastTimeSawADeviceWeAreLookingFor = Date.now();
    return;
  }if (shouldLock()) {
    // lockSytem throws on error
    try {
      (0, _lockSystem2.default)();
    } catch (err) {
      _logging.logger.error('Error occured trying locking the system : ', err);
    }
  }
}function addCurrentTimeToDevices(devices) {
  return devices.map(function (device) {
    return _extends({}, device, { lastSeen: Date.now() });
  });
}function shouldLock() {
  return (0, _settings.getSettings)().lanLostEnabled && Date.now() > lastTimeSawADeviceWeAreLookingFor + (0, _ms2.default)(`${(0, _settings.getSettings)().timeToLock} mins`);
}exports.handleScanResults = handleScanResults;

/***/ }),

/***/ "./app/networkScan/networkScanner.lsc":
/*!********************************************!*\
  !*** ./app/networkScan/networkScanner.lsc ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scanNetwork = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _net = __webpack_require__(/*! net */ "net");

var _util = __webpack_require__(/*! util */ "util");

var _util2 = _interopRequireDefault(_util);

var _defaultGateway = __webpack_require__(/*! default-gateway */ "default-gateway");

var _defaultGateway2 = _interopRequireDefault(_defaultGateway);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _ms = __webpack_require__(/*! ms */ "ms");

var _ms2 = _interopRequireDefault(_ms);

var _nodeArp = __webpack_require__(/*! node-arp */ "node-arp");

var _nodeArp2 = _interopRequireDefault(_nodeArp);

var _internalIp = __webpack_require__(/*! internal-ip */ "internal-ip");

var _internalIp2 = _interopRequireDefault(_internalIp);

var _isIp = __webpack_require__(/*! is-ip */ "is-ip");

var _isIp2 = _interopRequireDefault(_isIp);

var _bluebird = __webpack_require__(/*! bluebird */ "bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ono = __webpack_require__(/*! ono */ "ono");

var _ono2 = _interopRequireDefault(_ono);

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

var _getOUIfile = __webpack_require__(/*! ../oui/getOUIfile.lsc */ "./app/oui/getOUIfile.lsc");

var _handleScanResults = __webpack_require__(/*! ./handleScanResults.lsc */ "./app/networkScan/handleScanResults.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pGetMAC = _util2.default.promisify(_nodeArp2.default.getMAC);
const scanInterval = (0, _ms2.default)('30 seconds');

function scanNetwork() {
  _logging.logger.debug(`new scan started`);

  _bluebird2.default.resolve((0, _getOUIfile.loadOUIfileIfNotLoaded)()).then(getDefaultGatewayIP).then(generatePossibleHostIPs).map(scanHost).filter(isDevice).then(_handleScanResults.handleScanResults).catch(_logging.logger.error).finally(scanNetworkIn30Seconds);
}function scanHost(hostIP) {
  return connectToHostSocket(hostIP).then(getMacAdressForHostIP).then(getVendorInfoForMacAddress).catch(handleHostScanError);
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
  return _defaultGateway2.default.v4().then(function ({ gateway: defaultGatewayIP }) {
    if (!_isIp2.default.v4(defaultGatewayIP)) {
      throw new Error(`Didn't get valid gateway IP address`, { defaultGatewayIP });
    }_logging.logger.debug(`defaultGatewayIP ip: ${defaultGatewayIP}`);
    return defaultGatewayIP;
  });
}function getMacAdressForHostIP(ipAddress) {
  return pGetMAC(ipAddress).then(function (macAddress) {
    return { ipAddress, macAddress };
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
    // Lodash range doesn't include the last number.
    return _lodash2.default.range(hostsScanRangeStart, hostsScanRangeEnd + 1).map(function (lastOctet) {
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
}exports.scanNetwork = scanNetwork;

/***/ }),

/***/ "./app/oui/getOUIfile.lsc":
/*!********************************!*\
  !*** ./app/oui/getOUIfile.lsc ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOUIfileDataInMemory = exports.getOUIfileData = exports.loadOUIfileIfNotLoaded = undefined;

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(/*! electron */ "electron");

var _fsJetpack = __webpack_require__(/*! fs-jetpack */ "fs-jetpack");

var _fsJetpack2 = _interopRequireDefault(_fsJetpack);

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fileName = 'lanlost-mac-vendor-prefixes.json';
const downloadedOUIfilePath = _path2.default.join(_electron.app.getPath('userData'), fileName);
const initialOUIfilePath = _path2.default.resolve(__dirname, '..', 'oui', fileName);
let ouiFileData = null;
const curriedJetpackRead = (0, _utils.curryRight)(_fsJetpack2.default.readAsync)('json');

/**
 * If we haven't downloaded a new copy of the MAC vendor prefix list, use
 * our built in one. MAC vendor prefix file from: https://linuxnet.ca/ieee/oui/
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

/***/ "./app/oui/updateOUIfilePeriodically.lsc":
/*!***********************************************!*\
  !*** ./app/oui/updateOUIfilePeriodically.lsc ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleOUIfileUpdate = undefined;

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(/*! electron */ "electron");

var _ms = __webpack_require__(/*! ms */ "ms");

var _ms2 = _interopRequireDefault(_ms);

var _got = __webpack_require__(/*! got */ "got");

var _got2 = _interopRequireDefault(_got);

var _fsJetpack = __webpack_require__(/*! fs-jetpack */ "fs-jetpack");

var _fsJetpack2 = _interopRequireDefault(_fsJetpack);

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

var _getOUIfile = __webpack_require__(/*! ./getOUIfile.lsc */ "./app/oui/getOUIfile.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ouiDownloadfilePath = _path2.default.join(_electron.app.getPath('userData'), 'lanlost-mac-vendor-prefixes.json');
const twoWeeksTime = (0, _ms2.default)('2 weeks');
const twoDaysTime = (0, _ms2.default)('2 days');
const threeMinutesTime = (0, _ms2.default)('3 minutes');
const updateUrl = 'https://linuxnet.ca/ieee/oui/nmap-mac-prefixes';
const gotErrorMessage = `Failed getting nmap-mac-prefixes file from ${updateUrl}`;
const gotRequestOptions = { headers: { 'user-agent': 'Mozilla/5.0 LANLost' } };
const checkResponseAndGenerateObj = (0, _utils.pipe)(checkResponseBody, generateObjFromResponseText);
const curriedJetPackWrite = (0, _utils.curry)(_fsJetpack2.default.writeAsync)(ouiDownloadfilePath);

function updateOUIfilePeriodically() {
  if (!shouldUpdate() || !(0, _settings.getSettings)().enableOUIfileUpdate) {
    return scheduleOUIfileUpdate(twoDaysTime);
  }(0, _got2.default)(updateUrl, gotRequestOptions).then(checkResponseAndGenerateObj).then(_getOUIfile.updateOUIfileDataInMemory).then(curriedJetPackWrite).catch(function (err) {
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

/***/ "./app/settingsWindow/settingsWindow.lsc":
/*!***********************************************!*\
  !*** ./app/settingsWindow/settingsWindow.lsc ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settingsWindow = exports.toggleSettingsWindow = exports.showSettingsWindow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(/*! url */ "url");

var _url2 = _interopRequireDefault(_url);

var _electron = __webpack_require__(/*! electron */ "electron");

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settingsHTMLpath = _url2.default.format({
  protocol: 'file',
  slashes: true,
  pathname: _path2.default.resolve(__dirname, '..', 'settingsWindow', 'renderer', 'settingsWindow.html')
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
  webPreferences: {
    textAreasAreResizable: false,
    devTools: true
  }
}, getStoredWindowPosition());
/****
* Remove the menu in alt menu bar in prod, so they dont accidentally exit the app.
* Reload is for dev so we can easily reload the browserwindow with Ctrl+R
*/
const settingsWindowMenu =  true ? _electron.Menu.buildFromTemplate([{ role: 'reload' }]) : undefined;
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
  global.settingsWindowRendererInitialSettings = (0, _utils.recursiveOmitFilterAndInheritedPropertiesFromObj)((0, _settings.getSettings)(), ['__gawk__', 'canSearchForMacVendorInfo', 'dateLastCheckedForOUIupdate']);

  exports.settingsWindow = settingsWindow = new _electron.BrowserWindow(_extends({}, settingsWindowProperties, getStoredWindowPosition()));
  settingsWindow.loadURL(settingsHTMLpath);
  settingsWindow.setMenu(settingsWindowMenu);
  (_electronApp$dock = _electron.app.dock) == null ? void 0 : _electronApp$dock.show();
  if (true) settingsWindow.webContents.openDevTools({ mode: 'undocked' });

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
  if (!(typeof _settings.getSettings !== 'function' ? void 0 : (0, _settings.getSettings)().settingsWindowPosition)) return {};
  return {
    x: (0, _settings.getSettings)().settingsWindowPosition.x,
    y: (0, _settings.getSettings)().settingsWindowPosition.y
  };
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

/***/ "./app/tray/tray.lsc":
/*!***************************!*\
  !*** ./app/tray/tray.lsc ***!
  \***************************/
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

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/settingsWindow/settingsWindow.lsc");

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let tray = null; // might need to be outside to avoid being garbage collected. https://electron.atom.io/docs/api/tray/
const trayIconsFolderPath = _path2.default.resolve(__dirname, '..', '..', 'resources', 'icons');

function getNewTrayIconPath(trayIconColor) {
  return _path2.default.join(trayIconsFolderPath, trayIconColor, `LANLost-${trayIconColor}-128x128.png`);
}function initTrayMenu() {
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
}function generateEnabledDisabledLabel() {
  return `${(0, _settings.getSettings)().lanLostEnabled ? 'Disable' : 'Enable'} LANLost`;
}function changeTrayIcon(newTrayIconColor) {
  tray.setImage(getNewTrayIconPath(newTrayIconColor));
}function updateTrayMenu() {
  tray.setContextMenu(createContextMenu());
}function toggleEnabledFromTray() {
  const toggledLanLostEnabled = !(0, _settings.getSettings)().lanLostEnabled;
  (0, _settings.updateSetting)('lanLostEnabled', toggledLanLostEnabled);
}exports.initTrayMenu = initTrayMenu;
exports.changeTrayIcon = changeTrayIcon;
exports.createContextMenu = createContextMenu;
exports.updateTrayMenu = updateTrayMenu;

/***/ }),

/***/ "./app/types/types.lsc":
/*!*****************************!*\
  !*** ./app/types/types.lsc ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "./config/env.lsc":
/*!************************!*\
  !*** ./config/env.lsc ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _dotenv = __webpack_require__(/*! dotenv */ "dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://bit.ly/2xEDMxk
_dotenv2.default.config({ path: _path2.default.resolve(__dirname, '..', '..', 'config', '.env') });

/***/ }),

/***/ "./node_modules/applescript/lib/applescript-parser.js":
/*!************************************************************!*\
  !*** ./node_modules/applescript/lib/applescript-parser.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


// 'parse' accepts a string that is expected to be the stdout stream of an
// osascript invocation. It reads the fist char of the string to determine
// the data-type of the result, and creates the appropriate type parser.
exports.parse = function(str) {
  if (str.length == 0) {
    return;
  }
  
  var rtn = parseFromFirstRemaining.call({
    value: str,
    index: 0
  });
  return rtn;
}

// Attemps to determine the data type of the next part of the String to
// parse. The 'this' value has a Object with 'value' as the AppleScript
// string to parse, and 'index' as the pointer to the current position
// of parsing in the String. This Function does not need to be exported???
function parseFromFirstRemaining() {
  var cur = this.value[this.index];
  switch(cur) {
    case '{':
      return exports.ArrayParser.call(this);
      break;
    case '"':
      return exports.StringParser.call(this);
      break;
    case 'a':
      if (this.value.substring(this.index, this.index+5) == 'alias') {
        return exports.AliasParser.call(this);
      }
      break;
    case '«':
      if (this.value.substring(this.index, this.index+5) == '«data') {
        return exports.DataParser.call(this);
      }
      break;
  }
  if (!isNaN(cur)) {
    return exports.NumberParser.call(this);
  }
  return exports.UndefinedParser.call(this);
}

// Parses an AppleScript "alias", which is really just a reference to a
// location on the filesystem, but formatted kinda weirdly.
exports.AliasParser = function() {
  this.index += 6;
  return "/Volumes/" + exports.StringParser.call(this).replace(/:/g, "/");
}

// Parses an AppleScript Array. Which looks like {}, instead of JavaScript's [].
exports.ArrayParser = function() {
  var rtn = [],
    cur = this.value[++this.index];
  while (cur != '}') {
    rtn.push(parseFromFirstRemaining.call(this));
    if (this.value[this.index] == ',') this.index += 2;
    cur = this.value[this.index];
  }
  this.index++;
  return rtn;
}

// Parses «data » results into native Buffer instances.
exports.DataParser = function() {
  var body = exports.UndefinedParser.call(this);
  body = body.substring(6, body.length-1);
  var type = body.substring(0,4);
  body = body.substring(4, body.length);
  var buf = new Buffer(body.length/2);
  var count = 0;
  for (var i=0, l=body.length; i<l; i += 2) {
    buf[count++] = parseInt(body[i]+body[i+1], 16);
  }
  buf.type = type;
  return buf;
}

// Parses an AppleScript Number into a native JavaScript Number instance.
exports.NumberParser = function() {
  return Number(exports.UndefinedParser.call(this));
}

// Parses a standard AppleScript String. Which starts and ends with "" chars.
// The \ char is the escape character, so anything after that is a valid part
// of the resulting String.
exports.StringParser = function(str) {
  var rtn = "",
    end = ++this.index,
    cur = this.value[end++];
  while(cur != '"') {
    if (cur == '\\') {
      rtn += this.value.substring(this.index, end-1);
      this.index = end++;
    }
    cur = this.value[end++];
  }
  rtn += this.value.substring(this.index, end-1);
  this.index = end;
  return rtn;
}

// When the "parseFromFirstRemaining" function can't figure out the data type
// of "str", then the UndefinedParser is used. It crams everything it sees
// into a String, until it finds a ',' or a '}' or it reaches the end of data.
var END_OF_TOKEN = /}|,|\n/;
exports.UndefinedParser = function() {
  var end = this.index, cur = this.value[end++];
  while (!END_OF_TOKEN.test(cur)) {
    cur = this.value[end++];
  }
  var rtn = this.value.substring(this.index, end-1);
  this.index = end-1;
  return rtn;
}


/***/ }),

/***/ "./node_modules/applescript/lib/applescript.js":
/*!*****************************************************!*\
  !*** ./node_modules/applescript/lib/applescript.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var spawn = __webpack_require__(/*! child_process */ "child_process").spawn;
exports.Parsers = __webpack_require__(/*! ./applescript-parser */ "./node_modules/applescript/lib/applescript-parser.js");
var parse = exports.Parsers.parse;

// Path to 'osascript'. By default search PATH.
exports.osascript = "osascript";

// Execute a *.applescript file.
exports.execFile = function execFile(file, args, callback) {
  if (!Array.isArray(args)) {
    callback = args;
    args = [];
  }
  return runApplescript(file, args, callback);
}

// Execute a String as AppleScript.
exports.execString = function execString(str, callback) {
  return runApplescript(str, callback);
}



function runApplescript(strOrPath, args, callback) {
  var isString = false;
  if (!Array.isArray(args)) {
    callback = args;
    args = [];
    isString = true;
  }

  // args get added to the end of the args array
  args.push("-ss"); // To output machine-readable text.
  if (!isString) {
    // The name of the file is the final arg if 'execFile' was called.
    args.push(strOrPath);
  }
  var interpreter = spawn(exports.osascript, args);

  bufferBody(interpreter.stdout);
  bufferBody(interpreter.stderr);

  interpreter.on('exit', function(code) {
    var result = parse(interpreter.stdout.body);
    var err;
    if (code) {
      // If the exit code was something other than 0, we're gonna
      // return an Error object.
      err = new Error(interpreter.stderr.body);
      err.appleScript = strOrPath;
      err.exitCode = code;
    }
    if (callback) {
      callback(err, result, interpreter.stderr.body);
    }
  });

  if (isString) {
    // Write the given applescript String to stdin if 'execString' was called.
    interpreter.stdin.write(strOrPath);
    interpreter.stdin.end();
  }
}

function bufferBody(stream) {
  stream.body = "";
  stream.setEncoding("utf8");
  stream.on("data", function(chunk) { stream.body += chunk; });
}


/***/ }),

/***/ "./node_modules/auto-launch/dist/AutoLaunchLinux.js":
/*!**********************************************************!*\
  !*** ./node_modules/auto-launch/dist/AutoLaunchLinux.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fileBasedUtilities, untildify;

untildify = __webpack_require__(/*! untildify */ "./node_modules/untildify/index.js");

fileBasedUtilities = __webpack_require__(/*! ./fileBasedUtilities */ "./node_modules/auto-launch/dist/fileBasedUtilities.js");

module.exports = {

  /* Public */
  enable: function(arg) {
    var appName, appPath, data, hiddenArg, isHiddenOnLaunch;
    appName = arg.appName, appPath = arg.appPath, isHiddenOnLaunch = arg.isHiddenOnLaunch;
    hiddenArg = isHiddenOnLaunch ? ' --hidden' : '';
    data = "[Desktop Entry]\nType=Application\nVersion=1.0\nName=" + appName + "\nComment=" + appName + "startup script\nExec=" + appPath + hiddenArg + "\nStartupNotify=false\nTerminal=false";
    return fileBasedUtilities.createFile({
      data: data,
      directory: this.getDirectory(),
      filePath: this.getFilePath(appName)
    });
  },
  disable: function(appName) {
    return fileBasedUtilities.removeFile(this.getFilePath(appName));
  },
  isEnabled: function(appName) {
    return fileBasedUtilities.isEnabled(this.getFilePath(appName));
  },

  /* Private */
  getDirectory: function() {
    return untildify('~/.config/autostart/');
  },
  getFilePath: function(appName) {
    return "" + (this.getDirectory()) + appName + ".desktop";
  }
};


/***/ }),

/***/ "./node_modules/auto-launch/dist/AutoLaunchMac.js":
/*!********************************************************!*\
  !*** ./node_modules/auto-launch/dist/AutoLaunchMac.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var applescript, fileBasedUtilities, untildify,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

applescript = __webpack_require__(/*! applescript */ "./node_modules/applescript/lib/applescript.js");

untildify = __webpack_require__(/*! untildify */ "./node_modules/untildify/index.js");

fileBasedUtilities = __webpack_require__(/*! ./fileBasedUtilities */ "./node_modules/auto-launch/dist/fileBasedUtilities.js");

module.exports = {

  /* Public */
  enable: function(arg) {
    var appName, appPath, data, isHiddenOnLaunch, isHiddenValue, mac, programArguments, programArgumentsSection, properties;
    appName = arg.appName, appPath = arg.appPath, isHiddenOnLaunch = arg.isHiddenOnLaunch, mac = arg.mac;
    if (mac.useLaunchAgent) {
      programArguments = [appPath];
      if (isHiddenOnLaunch) {
        programArguments.push('--hidden');
      }
      programArgumentsSection = programArguments.map(function(argument) {
        return "    <string>" + argument + "</string>";
      }).join('\n');
      data = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n<plist version=\"1.0\">\n<dict>\n  <key>Label</key>\n  <string>" + appName + "</string>\n  <key>ProgramArguments</key>\n  <array>\n  " + programArgumentsSection + "\n  </array>\n  <key>RunAtLoad</key>\n  <true/>\n</dict>\n</plist>";
      return fileBasedUtilities.createFile({
        data: data,
        directory: this.getDirectory(),
        filePath: this.getFilePath(appName)
      });
    }
    isHiddenValue = isHiddenOnLaunch ? 'true' : 'false';
    properties = "{path:\"" + appPath + "\", hidden:" + isHiddenValue + ", name:\"" + appName + "\"}";
    return this.execApplescriptCommand("make login item at end with properties " + properties);
  },
  disable: function(appName, mac) {
    if (mac.useLaunchAgent) {
      return fileBasedUtilities.removeFile(this.getFilePath(appName));
    }
    return this.execApplescriptCommand("delete login item \"" + appName + "\"");
  },
  isEnabled: function(appName, mac) {
    if (mac.useLaunchAgent) {
      return fileBasedUtilities.isEnabled(this.getFilePath(appName));
    }
    return this.execApplescriptCommand('get the name of every login item').then(function(loginItems) {
      return (loginItems != null) && indexOf.call(loginItems, appName) >= 0;
    });
  },

  /* Private */
  execApplescriptCommand: function(commandSuffix) {
    return new Promise(function(resolve, reject) {
      return applescript.execString("tell application \"System Events\" to " + commandSuffix, function(err, result) {
        if (err != null) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  },
  getDirectory: function() {
    return untildify('~/Library/LaunchAgents/');
  },
  getFilePath: function(appName) {
    return "" + (this.getDirectory()) + appName + ".plist";
  }
};


/***/ }),

/***/ "./node_modules/auto-launch/dist/AutoLaunchWindows.js":
/*!************************************************************!*\
  !*** ./node_modules/auto-launch/dist/AutoLaunchWindows.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Winreg, fs, path, regKey;

fs = __webpack_require__(/*! fs */ "fs");

path = __webpack_require__(/*! path */ "path");

Winreg = __webpack_require__(/*! winreg */ "./node_modules/winreg/lib/registry.js");

regKey = new Winreg({
  hive: Winreg.HKCU,
  key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
});

module.exports = {

  /* Public */
  enable: function(arg) {
    var appName, appPath, isHiddenOnLaunch;
    appName = arg.appName, appPath = arg.appPath, isHiddenOnLaunch = arg.isHiddenOnLaunch;
    return new Promise(function(resolve, reject) {
      var args, pathToAutoLaunchedApp, ref, updateDotExe;
      pathToAutoLaunchedApp = appPath;
      args = '';
      updateDotExe = path.join(path.dirname(process.execPath), '..', 'update.exe');
      if ((((ref = process.versions) != null ? ref.electron : void 0) != null) && fs.existsSync(updateDotExe)) {
        pathToAutoLaunchedApp = updateDotExe;
        args = " --processStart \"" + (path.basename(process.execPath)) + "\"";
        if (isHiddenOnLaunch) {
          args += ' --process-start-args "--hidden"';
        }
      } else {
        if (isHiddenOnLaunch) {
          args += ' --hidden';
        }
      }
      return regKey.set(appName, Winreg.REG_SZ, "\"" + pathToAutoLaunchedApp + "\"" + args, function(err) {
        if (err != null) {
          return reject(err);
        }
        return resolve();
      });
    });
  },
  disable: function(appName) {
    return new Promise(function(resolve, reject) {
      return regKey.remove(appName, function(err) {
        if (err != null) {
          if (err.message.indexOf('The system was unable to find the specified registry key or value') !== -1) {
            return resolve(false);
          }
          return reject(err);
        }
        return resolve();
      });
    });
  },
  isEnabled: function(appName) {
    return new Promise(function(resolve, reject) {
      return regKey.get(appName, function(err, item) {
        if (err != null) {
          return resolve(false);
        }
        return resolve(item != null);
      });
    });
  }
};


/***/ }),

/***/ "./node_modules/auto-launch/dist/fileBasedUtilities.js":
/*!*************************************************************!*\
  !*** ./node_modules/auto-launch/dist/fileBasedUtilities.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fs, mkdirp;

fs = __webpack_require__(/*! fs */ "fs");

mkdirp = __webpack_require__(/*! mkdirp */ "mkdirp");

module.exports = {

  /* Public */
  createFile: function(arg) {
    var data, directory, filePath;
    directory = arg.directory, filePath = arg.filePath, data = arg.data;
    return new Promise(function(resolve, reject) {
      return mkdirp(directory, function(mkdirErr) {
        if (mkdirErr != null) {
          return reject(mkdirErr);
        }
        return fs.writeFile(filePath, data, function(writeErr) {
          if (writeErr != null) {
            return reject(writeErr);
          }
          return resolve();
        });
      });
    });
  },
  isEnabled: function(filePath) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return fs.stat(filePath, function(err, stat) {
          if (err != null) {
            return resolve(false);
          }
          return resolve(stat != null);
        });
      };
    })(this));
  },
  removeFile: function(filePath) {
    return new Promise((function(_this) {
      return function(resolve, reject) {
        return fs.stat(filePath, function(statErr) {
          if (statErr != null) {
            return resolve();
          }
          return fs.unlink(filePath, function(unlinkErr) {
            if (unlinkErr != null) {
              return reject(unlinkErr);
            }
            return resolve();
          });
        });
      };
    })(this));
  }
};


/***/ }),

/***/ "./node_modules/auto-launch/dist/index.js":
/*!************************************************!*\
  !*** ./node_modules/auto-launch/dist/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var AutoLaunch, isPathAbsolute,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

isPathAbsolute = __webpack_require__(/*! path-is-absolute */ "path-is-absolute");

module.exports = AutoLaunch = (function() {

  /* Public */
  function AutoLaunch(arg) {
    var isHidden, mac, name, path, versions;
    name = arg.name, isHidden = arg.isHidden, mac = arg.mac, path = arg.path;
    this.fixOpts = bind(this.fixOpts, this);
    this.isEnabled = bind(this.isEnabled, this);
    this.disable = bind(this.disable, this);
    this.enable = bind(this.enable, this);
    if (name == null) {
      throw new Error('You must specify a name');
    }
    this.opts = {
      appName: name,
      isHiddenOnLaunch: isHidden != null ? isHidden : false,
      mac: mac != null ? mac : {}
    };
    versions = typeof process !== "undefined" && process !== null ? process.versions : void 0;
    if (path != null) {
      if (!isPathAbsolute(path)) {
        throw new Error('path must be absolute');
      }
      this.opts.appPath = path;
    } else if ((versions != null) && ((versions.nw != null) || (versions['node-webkit'] != null) || (versions.electron != null))) {
      this.opts.appPath = process.execPath;
    } else {
      throw new Error('You must give a path (this is only auto-detected for NW.js and Electron apps)');
    }
    this.fixOpts();
    this.api = null;
    if (/^win/.test(process.platform)) {
      this.api = __webpack_require__(/*! ./AutoLaunchWindows */ "./node_modules/auto-launch/dist/AutoLaunchWindows.js");
    } else if (/darwin/.test(process.platform)) {
      this.api = __webpack_require__(/*! ./AutoLaunchMac */ "./node_modules/auto-launch/dist/AutoLaunchMac.js");
    } else if (/linux/.test(process.platform)) {
      this.api = __webpack_require__(/*! ./AutoLaunchLinux */ "./node_modules/auto-launch/dist/AutoLaunchLinux.js");
    } else {
      throw new Error('Unsupported platform');
    }
  }

  AutoLaunch.prototype.enable = function() {
    return this.api.enable(this.opts);
  };

  AutoLaunch.prototype.disable = function() {
    return this.api.disable(this.opts.appName, this.opts.mac);
  };

  AutoLaunch.prototype.isEnabled = function() {
    return this.api.isEnabled(this.opts.appName, this.opts.mac);
  };


  /* Private */

  AutoLaunch.prototype.fixMacExecPath = function(path, macOptions) {
    path = path.replace(/(^.+?[^\/]+?\.app)\/Contents\/(Frameworks\/((\1|[^\/]+?) Helper)\.app\/Contents\/MacOS\/\3|MacOS\/Electron)/, '$1');
    if (!macOptions.useLaunchAgent) {
      path = path.replace(/\.app\/Contents\/MacOS\/[^\/]*$/, '.app');
    }
    return path;
  };

  AutoLaunch.prototype.fixOpts = function() {
    var tempPath;
    this.opts.appPath = this.opts.appPath.replace(/\/$/, '');
    if (/darwin/.test(process.platform)) {
      this.opts.appPath = this.fixMacExecPath(this.opts.appPath, this.opts.mac);
    }
    if (this.opts.appPath.indexOf('/') !== -1) {
      tempPath = this.opts.appPath.split('/');
      this.opts.appName = tempPath[tempPath.length - 1];
    } else if (this.opts.appPath.indexOf('\\') !== -1) {
      tempPath = this.opts.appPath.split('\\');
      this.opts.appName = tempPath[tempPath.length - 1];
      this.opts.appName = this.opts.appName.substr(0, this.opts.appName.length - '.exe'.length);
    }
    if (/darwin/.test(process.platform)) {
      if (this.opts.appName.indexOf('.app', this.opts.appName.length - '.app'.length) !== -1) {
        return this.opts.appName = this.opts.appName.substr(0, this.opts.appName.length - '.app'.length);
      }
    }
  };

  return AutoLaunch;

})();


/***/ }),

/***/ "./node_modules/untildify/index.js":
/*!*****************************************!*\
  !*** ./node_modules/untildify/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(/*! os */ "os");
const home = os.homedir();

module.exports = str => {
	if (typeof str !== 'string') {
		throw new TypeError(`Expected a string, got ${typeof str}`);
	}

	return home ? str.replace(/^~($|\/|\\)/, `${home}$1`) : str;
};


/***/ }),

/***/ "./node_modules/winreg/lib/registry.js":
/*!*********************************************!*\
  !*** ./node_modules/winreg/lib/registry.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/************************************************************************************************************
 * registry.js - contains a wrapper for the REG command under Windows, which provides access to the registry
 *
 * @author Paul Bottin a/k/a FrEsC
 *
 */

/* imports */
var util          = __webpack_require__(/*! util */ "util")
,   path          = __webpack_require__(/*! path */ "path")
,   spawn         = __webpack_require__(/*! child_process */ "child_process").spawn

/* set to console.log for debugging */
,   log           = function () {}

/* registry hive ids */
,   HKLM          = 'HKLM'
,   HKCU          = 'HKCU'
,   HKCR          = 'HKCR'
,   HKU           = 'HKU'
,   HKCC          = 'HKCC'
,   HIVES         = [ HKLM, HKCU, HKCR, HKU, HKCC ]

/* registry value type ids */
,   REG_SZ        = 'REG_SZ'
,   REG_MULTI_SZ  = 'REG_MULTI_SZ'
,   REG_EXPAND_SZ = 'REG_EXPAND_SZ'
,   REG_DWORD     = 'REG_DWORD'
,   REG_QWORD     = 'REG_QWORD'
,   REG_BINARY    = 'REG_BINARY'
,   REG_NONE      = 'REG_NONE'
,   REG_TYPES     = [ REG_SZ, REG_MULTI_SZ, REG_EXPAND_SZ, REG_DWORD, REG_QWORD, REG_BINARY, REG_NONE ]

/* default registry value name */
,   DEFAULT_VALUE = ''

/* general key pattern */
,   KEY_PATTERN   = /(\\[a-zA-Z0-9_\s]+)*/

/* key path pattern (as returned by REG-cli) */
,   PATH_PATTERN  = /^(HKEY_LOCAL_MACHINE|HKEY_CURRENT_USER|HKEY_CLASSES_ROOT|HKEY_USERS|HKEY_CURRENT_CONFIG)(.*)$/

/* registry item pattern */
,   ITEM_PATTERN  = /^(.*)\s(REG_SZ|REG_MULTI_SZ|REG_EXPAND_SZ|REG_DWORD|REG_QWORD|REG_BINARY|REG_NONE)\s+([^\s].*)$/

/**
 * Creates an Error object that contains the exit code of the REG.EXE process.
 * This contructor is private. Objects of this type are created internally and returned in the <code>err</code> parameters in case the REG.EXE process doesn't exit cleanly.
 *
 * @private
 * @class
 *
 * @param {string} message - the error message
 * @param {number} code - the process exit code
 *
 */
function ProcessUncleanExitError(message, code) {
  if (!(this instanceof ProcessUncleanExitError))
    return new ProcessUncleanExitError(message, code);

  Error.captureStackTrace(this, ProcessUncleanExitError);

  /**
   * The error name.
   * @readonly
   * @member {string} ProcessUncleanExitError#name
   */
  this.__defineGetter__('name', function () { return ProcessUncleanExitError.name; });

  /**
   * The error message.
   * @readonly
   * @member {string} ProcessUncleanExitError#message
   */
  this.__defineGetter__('message', function () { return message; });

  /**
   * The process exit code.
   * @readonly
   * @member {number} ProcessUncleanExitError#code
   */
  this.__defineGetter__('code', function () { return code; });

}

util.inherits(ProcessUncleanExitError, Error);

/*
 * Captures stdout/stderr for a child process
 */
function captureOutput(child) {
  // Use a mutable data structure so we can append as we get new data and have
  // the calling context see the new data
  var output = {'stdout': '', 'stderr': ''};

  child.stdout.on('data', function(data) { output["stdout"] += data.toString(); });
  child.stderr.on('data', function(data) { output["stderr"] += data.toString(); });

  return output;
}


/*
 * Returns an error message containing the stdout/stderr of the child process
 */
function mkErrorMsg(registryCommand, code, output) {
    var stdout = output['stdout'].trim();
    var stderr = output['stderr'].trim();

    var msg = util.format("%s command exited with code %d:\n%s\n%s", registryCommand, code, stdout, stderr);
    return new ProcessUncleanExitError(msg, code);
}


/*
 * Converts x86/x64 to 32/64
 */
function convertArchString(archString) {
  if (archString == 'x64') {
    return '64';
  } else if (archString == 'x86') {
    return '32';
  } else {
    throw new Error('illegal architecture: ' + archString + ' (use x86 or x64)');
  }
}


/*
 * Adds correct architecture to reg args
 */
function pushArch(args, arch) {
  if (arch) {
    args.push('/reg:' + convertArchString(arch));
  }
}

/*
 * Get the path to system's reg.exe. Useful when another reg.exe is added to the PATH
 * Implemented only for Windows
 */
function getRegExePath() {
    if (process.platform === 'win32') {
        return path.join(process.env.windir, 'system32', 'reg.exe');
    } else {
        return "REG";
    }
}


/**
 * Creates a single registry value record.
 * This contructor is private. Objects of this type are created internally and returned by methods of {@link Registry} objects.
 *
 * @private
 * @class
 *
 * @param {string} host - the hostname
 * @param {string} hive - the hive id
 * @param {string} key - the registry key
 * @param {string} name - the value name
 * @param {string} type - the value type
 * @param {string} value - the value
 * @param {string} arch - the hive architecture ('x86' or 'x64')
 *
 */
function RegistryItem (host, hive, key, name, type, value, arch) {

  if (!(this instanceof RegistryItem))
    return new RegistryItem(host, hive, key, name, type, value, arch);

  /* private members */
  var _host = host    // hostname
  ,   _hive = hive    // registry hive
  ,   _key = key      // registry key
  ,   _name = name    // property name
  ,   _type = type    // property type
  ,   _value = value  // property value
  ,   _arch = arch    // hive architecture

  /* getters/setters */

  /**
   * The hostname.
   * @readonly
   * @member {string} RegistryItem#host
   */
  this.__defineGetter__('host', function () { return _host; });

  /**
   * The hive id.
   * @readonly
   * @member {string} RegistryItem#hive
   */
  this.__defineGetter__('hive', function () { return _hive; });

  /**
   * The registry key.
   * @readonly
   * @member {string} RegistryItem#key
   */
  this.__defineGetter__('key', function () { return _key; });

  /**
   * The value name.
   * @readonly
   * @member {string} RegistryItem#name
   */
  this.__defineGetter__('name', function () { return _name; });

  /**
   * The value type.
   * @readonly
   * @member {string} RegistryItem#type
   */
  this.__defineGetter__('type', function () { return _type; });

  /**
   * The value.
   * @readonly
   * @member {string} RegistryItem#value
   */
  this.__defineGetter__('value', function () { return _value; });

  /**
   * The hive architecture.
   * @readonly
   * @member {string} RegistryItem#arch
   */
  this.__defineGetter__('arch', function () { return _arch; });

}

util.inherits(RegistryItem, Object);

/**
 * Creates a registry object, which provides access to a single registry key.
 * Note: This class is returned by a call to ```require('winreg')```.
 *
 * @public
 * @class
 *
 * @param {object} options - the options
 * @param {string=} options.host - the hostname
 * @param {string=} options.hive - the hive id
 * @param {string=} options.key - the registry key
 * @param {string=} options.arch - the optional registry hive architecture ('x86' or 'x64'; only valid on Windows 64 Bit Operating Systems)
 *
 * @example
 * var Registry = require('winreg')
 * ,   autoStartCurrentUser = new Registry({
 *       hive: Registry.HKCU,
 *       key:  '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run'
 *     });
 *
 */
function Registry (options) {

  if (!(this instanceof Registry))
    return new Registry(options);

  /* private members */
  var _options = options || {}
  ,   _host = '' + (_options.host || '')    // hostname
  ,   _hive = '' + (_options.hive || HKLM)  // registry hive
  ,   _key  = '' + (_options.key  || '')    // registry key
  ,   _arch = _options.arch || null         // hive architecture

  /* getters/setters */

  /**
   * The hostname.
   * @readonly
   * @member {string} Registry#host
   */
  this.__defineGetter__('host', function () { return _host; });

  /**
   * The hive id.
   * @readonly
   * @member {string} Registry#hive
   */
  this.__defineGetter__('hive', function () { return _hive; });

  /**
   * The registry key name.
   * @readonly
   * @member {string} Registry#key
   */
  this.__defineGetter__('key', function () { return _key; });

  /**
   * The full path to the registry key.
   * @readonly
   * @member {string} Registry#path
   */
  this.__defineGetter__('path', function () { return (_host.length == 0 ? '' : '\\\\' + _host + '\\') + _hive + _key; });

  /**
   * The registry hive architecture ('x86' or 'x64').
   * @readonly
   * @member {string} Registry#arch
   */
  this.__defineGetter__('arch', function () { return _arch; });

  /**
   * Creates a new {@link Registry} instance that points to the parent registry key.
   * @readonly
   * @member {Registry} Registry#parent
   */
  this.__defineGetter__('parent', function () {
    var i = _key.lastIndexOf('\\')
    return new Registry({
      host: this.host,
      hive: this.hive,
      key:  (i == -1)?'':_key.substring(0, i),
      arch: this.arch
    });
  });

  // validate options...
  if (HIVES.indexOf(_hive) == -1)
    throw new Error('illegal hive specified.');

  if (!KEY_PATTERN.test(_key))
    throw new Error('illegal key specified.');

  if (_arch && _arch != 'x64' && _arch != 'x86')
    throw new Error('illegal architecture specified (use x86 or x64)');

}

/**
 * Registry hive key HKEY_LOCAL_MACHINE.
 * Note: For writing to this hive your program has to run with admin privileges.
 * @type {string}
 */
Registry.HKLM = HKLM;

/**
 * Registry hive key HKEY_CURRENT_USER.
 * @type {string}
 */
Registry.HKCU = HKCU;

/**
 * Registry hive key HKEY_CLASSES_ROOT.
 * Note: For writing to this hive your program has to run with admin privileges.
 * @type {string}
 */
Registry.HKCR = HKCR;

/**
 * Registry hive key HKEY_USERS.
 * Note: For writing to this hive your program has to run with admin privileges.
 * @type {string}
 */
Registry.HKU = HKU;

/**
 * Registry hive key HKEY_CURRENT_CONFIG.
 * Note: For writing to this hive your program has to run with admin privileges.
 * @type {string}
 */
Registry.HKCC = HKCC;

/**
 * Collection of available registry hive keys.
 * @type {array}
 */
Registry.HIVES = HIVES;

/**
 * Registry value type STRING.
 * @type {string}
 */
Registry.REG_SZ = REG_SZ;

/**
 * Registry value type MULTILINE_STRING.
 * @type {string}
 */
Registry.REG_MULTI_SZ = REG_MULTI_SZ;

/**
 * Registry value type EXPANDABLE_STRING.
 * @type {string}
 */
Registry.REG_EXPAND_SZ = REG_EXPAND_SZ;

/**
 * Registry value type DOUBLE_WORD.
 * @type {string}
 */
Registry.REG_DWORD = REG_DWORD;

/**
 * Registry value type QUAD_WORD.
 * @type {string}
 */
Registry.REG_QWORD = REG_QWORD;

/**
 * Registry value type BINARY.
 * @type {string}
 */
Registry.REG_BINARY = REG_BINARY;

/**
 * Registry value type UNKNOWN.
 * @type {string}
 */
Registry.REG_NONE = REG_NONE;

/**
 * Collection of available registry value types.
 * @type {array}
 */
Registry.REG_TYPES = REG_TYPES;

/**
 * The name of the default value. May be used instead of the empty string literal for better readability.
 * @type {string}
 */
Registry.DEFAULT_VALUE = DEFAULT_VALUE;

/**
 * Retrieve all values from this registry key.
 * @param {valuesCallback} cb - callback function
 * @param {ProcessUncleanExitError=} cb.err - error object or null if successful
 * @param {array=} cb.items - an array of {@link RegistryItem} objects
 * @returns {Registry} this registry key object
 */
Registry.prototype.values = function values (cb) {

  if (typeof cb !== 'function')
    throw new TypeError('must specify a callback');

  var args = [ 'QUERY', this.path ];

  pushArch(args, this.arch);

  var proc = spawn(getRegExePath(), args, {
        cwd: undefined,
        env: process.env,
        stdio: [ 'ignore', 'pipe', 'pipe' ]
      })
  ,   buffer = ''
  ,   self = this
  ,   error = null // null means no error previously reported.

  var output = captureOutput(proc);

  proc.on('close', function (code) {
    if (error) {
      return;
    } else if (code !== 0) {
      log('process exited with code ' + code);
      cb(mkErrorMsg('QUERY', code, output), null);
    } else {
      var items = []
      ,   result = []
      ,   lines = buffer.split('\n')
      ,   lineNumber = 0

      for (var i = 0, l = lines.length; i < l; i++) {
        var line = lines[i].trim();
        if (line.length > 0) {
          log(line);
          if (lineNumber != 0) {
            items.push(line);
          }
          ++lineNumber;
        }
      }

      for (var i = 0, l = items.length; i < l; i++) {

        var match = ITEM_PATTERN.exec(items[i])
        ,   name
        ,   type
        ,   value

        if (match) {
          name = match[1].trim();
          type = match[2].trim();
          value = match[3];
          result.push(new RegistryItem(self.host, self.hive, self.key, name, type, value, self.arch));
        }
      }

      cb(null, result);

    }
  });

  proc.stdout.on('data', function (data) {
    buffer += data.toString();
  });

  proc.on('error', function(err) {
    error = err;
    cb(err);
  });

  return this;
};

/**
 * Retrieve all subkeys from this registry key.
 * @param {function (err, items)} cb - callback function
 * @param {ProcessUncleanExitError=} cb.err - error object or null if successful
 * @param {array=} cb.items - an array of {@link Registry} objects
 * @returns {Registry} this registry key object
 */
Registry.prototype.keys = function keys (cb) {

  if (typeof cb !== 'function')
    throw new TypeError('must specify a callback');

  var args = [ 'QUERY', this.path ];

  pushArch(args, this.arch);

  var proc = spawn(getRegExePath(), args, {
        cwd: undefined,
        env: process.env,
        stdio: [ 'ignore', 'pipe', 'pipe' ]
      })
  ,   buffer = ''
  ,   self = this
  ,   error = null // null means no error previously reported.

  var output = captureOutput(proc);

  proc.on('close', function (code) {
    if (error) {
      return;
    } else if (code !== 0) {
      log('process exited with code ' + code);
      cb(mkErrorMsg('QUERY', code, output), null);
    }
  });

  proc.stdout.on('data', function (data) {
    buffer += data.toString();
  });

  proc.stdout.on('end', function () {

    var items = []
    ,   result = []
    ,   lines = buffer.split('\n')

    for (var i = 0, l = lines.length; i < l; i++) {
      var line = lines[i].trim();
      if (line.length > 0) {
        log(line);
        items.push(line);
      }
    }

    for (var i = 0, l = items.length; i < l; i++) {

      var match = PATH_PATTERN.exec(items[i])
      ,   hive
      ,   key

      if (match) {
        hive = match[1];
        key  = match[2];
        if (key && (key !== self.key)) {
          result.push(new Registry({
            host: self.host,
            hive: self.hive,
            key:  key,
            arch: self.arch
          }));
        }
      }
    }

    cb(null, result);

  });

  proc.on('error', function(err) {
    error = err;
    cb(err);
  });

  return this;
};

/**
 * Gets a named value from this registry key.
 * @param {string} name - the value name, use {@link Registry.DEFAULT_VALUE} or an empty string for the default value
 * @param {function (err, item)} cb - callback function
 * @param {ProcessUncleanExitError=} cb.err - error object or null if successful
 * @param {RegistryItem=} cb.item - the retrieved registry item
 * @returns {Registry} this registry key object
 */
Registry.prototype.get = function get (name, cb) {

  if (typeof cb !== 'function')
    throw new TypeError('must specify a callback');

  var args = ['QUERY', this.path];
  if (name == '')
    args.push('/ve');
  else
    args = args.concat(['/v', name]);

  pushArch(args, this.arch);

  var proc = spawn(getRegExePath(), args, {
        cwd: undefined,
        env: process.env,
        stdio: [ 'ignore', 'pipe', 'pipe' ]
      })
  ,   buffer = ''
  ,   self = this
  ,   error = null // null means no error previously reported.

  var output = captureOutput(proc);

  proc.on('close', function (code) {
    if (error) {
      return;
    } else if (code !== 0) {
      log('process exited with code ' + code);
      cb(mkErrorMsg('QUERY', code, output), null);
    } else {
      var items = []
      ,   result = null
      ,   lines = buffer.split('\n')
      ,   lineNumber = 0

      for (var i = 0, l = lines.length; i < l; i++) {
        var line = lines[i].trim();
        if (line.length > 0) {
          log(line);
          if (lineNumber != 0) {
             items.push(line);
          }
          ++lineNumber;
        }
      }

      //Get last item - so it works in XP where REG QUERY returns with a header
      var item = items[items.length-1] || ''
      ,   match = ITEM_PATTERN.exec(item)
      ,   name
      ,   type
      ,   value

      if (match) {
        name = match[1].trim();
        type = match[2].trim();
        value = match[3];
        result = new RegistryItem(self.host, self.hive, self.key, name, type, value, self.arch);
      }

      cb(null, result);
    }
  });

  proc.stdout.on('data', function (data) {
    buffer += data.toString();
  });

  proc.on('error', function(err) {
    error = err;
    cb(err);
  });

  return this;
};

/**
 * Sets a named value in this registry key, overwriting an already existing value.
 * @param {string} name - the value name, use {@link Registry.DEFAULT_VALUE} or an empty string for the default value
 * @param {string} type - the value type
 * @param {string} value - the value
 * @param {function (err)} cb - callback function
 * @param {ProcessUncleanExitError=} cb.err - error object or null if successful
 * @returns {Registry} this registry key object
 */
Registry.prototype.set = function set (name, type, value, cb) {

  if (typeof cb !== 'function')
    throw new TypeError('must specify a callback');

  if (REG_TYPES.indexOf(type) == -1)
    throw Error('illegal type specified.');

  var args = ['ADD', this.path];
  if (name == '')
    args.push('/ve');
  else
    args = args.concat(['/v', name]);

  args = args.concat(['/t', type, '/d', value, '/f']);

  pushArch(args, this.arch);

  var proc = spawn(getRegExePath(), args, {
        cwd: undefined,
        env: process.env,
        stdio: [ 'ignore', 'pipe', 'pipe' ]
      })
  ,   error = null // null means no error previously reported.

  var output = captureOutput(proc);

  proc.on('close', function (code) {
    if(error) {
      return;
    } else if (code !== 0) {
      log('process exited with code ' + code);
      cb(mkErrorMsg('ADD', code, output, null));
    } else {
      cb(null);
    }
  });

  proc.stdout.on('data', function (data) {
    // simply discard output
    log(''+data);
  });

  proc.on('error', function(err) {
    error = err;
    cb(err);
  });

  return this;
};

/**
 * Remove a named value from this registry key. If name is empty, sets the default value of this key.
 * Note: This key must be already existing.
 * @param {string} name - the value name, use {@link Registry.DEFAULT_VALUE} or an empty string for the default value
 * @param {function (err)} cb - callback function
 * @param {ProcessUncleanExitError=} cb.err - error object or null if successful
 * @returns {Registry} this registry key object
 */
Registry.prototype.remove = function remove (name, cb) {

  if (typeof cb !== 'function')
    throw new TypeError('must specify a callback');

  var args = name ? ['DELETE', this.path, '/f', '/v', name] : ['DELETE', this.path, '/f', '/ve'];

  pushArch(args, this.arch);

  var proc = spawn(getRegExePath(), args, {
        cwd: undefined,
        env: process.env,
        stdio: [ 'ignore', 'pipe', 'pipe' ]
      })
  ,   error = null // null means no error previously reported.

  var output = captureOutput(proc);

  proc.on('close', function (code) {
    if(error) {
      return;
    } else if (code !== 0) {
      log('process exited with code ' + code);
      cb(mkErrorMsg('DELETE', code, output), null);
    } else {
      cb(null);
    }
  });

  proc.stdout.on('data', function (data) {
    // simply discard output
    log(''+data);
  });

  proc.on('error', function(err) {
    error = err;
    cb(err);
  });

  return this;
};

/**
 * Remove all subkeys and values (including the default value) from this registry key.
 * @param {function (err)} cb - callback function
 * @param {ProcessUncleanExitError=} cb.err - error object or null if successful
 * @returns {Registry} this registry key object
 */
Registry.prototype.clear = function clear (cb) {

  if (typeof cb !== 'function')
    throw new TypeError('must specify a callback');

  var args = ['DELETE', this.path, '/f', '/va'];

  pushArch(args, this.arch);

  var proc = spawn(getRegExePath(), args, {
        cwd: undefined,
        env: process.env,
        stdio: [ 'ignore', 'pipe', 'pipe' ]
      })
  ,   error = null // null means no error previously reported.

  var output = captureOutput(proc);

  proc.on('close', function (code) {
    if(error) {
      return;
    } else if (code !== 0) {
      log('process exited with code ' + code);
      cb(mkErrorMsg("DELETE", code, output), null);
    } else {
      cb(null);
    }
  });

  proc.stdout.on('data', function (data) {
    // simply discard output
    log(''+data);
  });

  proc.on('error', function(err) {
    error = err;
    cb(err);
  });

  return this;
};

/**
 * Alias for the clear method to keep it backward compatible.
 * @method
 * @deprecated Use {@link Registry#clear} or {@link Registry#destroy} in favour of this method.
 * @param {function (err)} cb - callback function
 * @param {ProcessUncleanExitError=} cb.err - error object or null if successful
 * @returns {Registry} this registry key object
 */
Registry.prototype.erase = Registry.prototype.clear;

/**
 * Delete this key and all subkeys from the registry.
 * @param {function (err)} cb - callback function
 * @param {ProcessUncleanExitError=} cb.err - error object or null if successful
 * @returns {Registry} this registry key object
 */
Registry.prototype.destroy = function destroy (cb) {

  if (typeof cb !== 'function')
    throw new TypeError('must specify a callback');

  var args = ['DELETE', this.path, '/f'];

  pushArch(args, this.arch);

  var proc = spawn(getRegExePath(), args, {
        cwd: undefined,
        env: process.env,
        stdio: [ 'ignore', 'pipe', 'pipe' ]
      })
  ,   error = null // null means no error previously reported.

  var output = captureOutput(proc);

  proc.on('close', function (code) {
    if (error) {
      return;
    } else if (code !== 0) {
      log('process exited with code ' + code);
      cb(mkErrorMsg('DELETE', code, output), null);
    } else {
      cb(null);
    }
  });

  proc.stdout.on('data', function (data) {
    // simply discard output
    log(''+data);
  });

  proc.on('error', function(err) {
    error = err;
    cb(err);
  });

  return this;
};

/**
 * Create this registry key. Note that this is a no-op if the key already exists.
 * @param {function (err)} cb - callback function
 * @param {ProcessUncleanExitError=} cb.err - error object or null if successful
 * @returns {Registry} this registry key object
 */
Registry.prototype.create = function create (cb) {

  if (typeof cb !== 'function')
    throw new TypeError('must specify a callback');

  var args = ['ADD', this.path, '/f'];

  pushArch(args, this.arch);

  var proc = spawn(getRegExePath(), args, {
        cwd: undefined,
        env: process.env,
        stdio: [ 'ignore', 'pipe', 'pipe' ]
      })
  ,   error = null // null means no error previously reported.

  var output = captureOutput(proc);

  proc.on('close', function (code) {
    if (error) {
      return;
    } else if (code !== 0) {
      log('process exited with code ' + code);
      cb(mkErrorMsg('ADD', code, output), null);
    } else {
      cb(null);
    }
  });

  proc.stdout.on('data', function (data) {
    // simply discard output
    log(''+data);
  });

  proc.on('error', function(err) {
    error = err;
    cb(err);
  });

  return this;
};

/**
 * Checks if this key already exists.
 * @param {function (err, exists)} cb - callback function
 * @param {ProcessUncleanExitError=} cb.err - error object or null if successful
 * @param {boolean=} cb.exists - true if a registry key with this name already exists
 * @returns {Registry} this registry key object
 */
Registry.prototype.keyExists = function keyExists (cb) {

  this.values(function (err, items) {
    if (err) {
      // process should return with code 1 if key not found
      if (err.code == 1) {
        return cb(null, false);
      }
      // other error
      return cb(err);
    }
    cb(null, true);
  });

  return this;
};

/**
 * Checks if a value with the given name already exists within this key.
 * @param {string} name - the value name, use {@link Registry.DEFAULT_VALUE} or an empty string for the default value
 * @param {function (err, exists)} cb - callback function
 * @param {ProcessUncleanExitError=} cb.err - error object or null if successful
 * @param {boolean=} cb.exists - true if a value with the given name was found in this key
 * @returns {Registry} this registry key object
 */
Registry.prototype.valueExists = function valueExists (name, cb) {

  this.get(name, function (err, item) {
    if (err) {
      // process should return with code 1 if value not found
      if (err.code == 1) {
        return cb(null, false);
      }
      // other error
      return cb(err);
    }
    cb(null, true);
  });

  return this;
};

module.exports = Registry;


/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "default-gateway":
/*!**********************************!*\
  !*** external "default-gateway" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("default-gateway");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "electron-reload":
/*!**********************************!*\
  !*** external "electron-reload" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-reload");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "fs-jetpack":
/*!*****************************!*\
  !*** external "fs-jetpack" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs-jetpack");

/***/ }),

/***/ "gawk":
/*!***********************!*\
  !*** external "gawk" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("gawk");

/***/ }),

/***/ "got":
/*!**********************!*\
  !*** external "got" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("got");

/***/ }),

/***/ "internal-ip":
/*!******************************!*\
  !*** external "internal-ip" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("internal-ip");

/***/ }),

/***/ "is-ip":
/*!************************!*\
  !*** external "is-ip" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("is-ip");

/***/ }),

/***/ "lock-system":
/*!******************************!*\
  !*** external "lock-system" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lock-system");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

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

/***/ "mkdirp":
/*!*************************!*\
  !*** external "mkdirp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),

/***/ "ms":
/*!*********************!*\
  !*** external "ms" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ms");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),

/***/ "node-arp":
/*!***************************!*\
  !*** external "node-arp" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-arp");

/***/ }),

/***/ "ono":
/*!**********************!*\
  !*** external "ono" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ono");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "path-is-absolute":
/*!***********************************!*\
  !*** external "path-is-absolute" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path-is-absolute");

/***/ }),

/***/ "rollbar":
/*!**************************!*\
  !*** external "rollbar" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rollbar");

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