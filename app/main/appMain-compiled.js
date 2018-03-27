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

/***/ "./app/common/lockSystem.lsc":
/*!***********************************!*\
  !*** ./app/common/lockSystem.lsc ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locksSystemIfShouldLock = undefined;

var _ms = __webpack_require__(/*! ms */ "ms");

var _ms2 = _interopRequireDefault(_ms);

var _lockSystem = __webpack_require__(/*! lock-system */ "lock-system");

var _lockSystem2 = _interopRequireDefault(_lockSystem);

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

var _logging = __webpack_require__(/*! ./logging/logging.lsc */ "./app/common/logging/logging.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shouldLock(lastTimeSawADeviceWeAreLookingFor) {
  return (0, _settings.getSettings)().lanLostEnabled && Date.now() > lastTimeSawADeviceWeAreLookingFor + (0, _ms2.default)(`${(0, _settings.getSettings)().timeToLock} mins`);
}function locksSystemIfShouldLock(lastTimeSawADeviceWeAreLookingFor) {
  if (!shouldLock(lastTimeSawADeviceWeAreLookingFor)) return;
  // lockSytem throws on error, so use try/catch
  try {
    (0, _lockSystem2.default)();
  } catch (err) {
    _logging.logger.error('Error occured trying locking the system : ', err);
  }
}exports.locksSystemIfShouldLock = locksSystemIfShouldLock;

/***/ }),

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

var _autoLaunch = __webpack_require__(/*! auto-launch */ "auto-launch");

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
    devTools: true
  }

  // Remove the menu in alt menu bar in prod, so they dont accidentally exit the app.
};const debugWindowMenu =  true ? _electron.Menu.buildFromTemplate([{ role: 'reload' }]) : undefined;
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

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/settingsWindow/settingsWindow.lsc");

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

var _lockSystem = __webpack_require__(/*! ../common/lockSystem.lsc */ "./app/common/lockSystem.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let lastTimeSawADeviceWeAreLookingFor = Date.now();

function handleScanResults(devices) {
  var _settingsWindow$webCo;

  _logging.logger.debug(`scan returned these active devices: \n`, devices);

  const { devicesToSearchFor } = (0, _settings.getSettings)();

  _settingsWindow.settingsWindow == null ? void 0 : (_settingsWindow$webCo = _settingsWindow.settingsWindow.webContents) == null ? void 0 : _settingsWindow$webCo.send('mainprocess:update-of-network-devices-can-see', { devicesCanSee: devices });

  if (!devicesToSearchFor.length) return;
  if (foundADeviceWeAreLookingFor(devicesToSearchFor, devices)) {
    lastTimeSawADeviceWeAreLookingFor = Date.now();
    return;
  }(0, _lockSystem.locksSystemIfShouldLock)(lastTimeSawADeviceWeAreLookingFor);
}function foundADeviceWeAreLookingFor(devicesToSearchFor, devices) {
  return _lodash2.default.intersectionBy(devicesToSearchFor, devices, 'macAddress').length;
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
* Reload is for dev so we can easily reload the browserwindow with Ctrl+R.
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
  global.settingsWindowRendererInitialSettings = (0, _utils.recursiveOmitFilterAndInheritedPropertiesFromObj)((0, _settings.getSettings)(), ['__gawk__', 'canSearchForMacVendorInfo', 'dateLastCheckedForOUIupdate', 'firstRun']);

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
  const settingsWindowPosition = typeof _settings.getSettings !== 'function' ? void 0 : (0, _settings.getSettings)().settingsWindowPosition;
  if (!settingsWindowPosition) return {};
  return { x: settingsWindowPosition.x, y: settingsWindowPosition.y };
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
  return _path2.default.join(trayIconsFolderPath, trayIconColor, `LANLost-${trayIconColor}-128x128.png`);
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

/***/ "auto-launch":
/*!******************************!*\
  !*** external "auto-launch" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("auto-launch");

/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bluebird");

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