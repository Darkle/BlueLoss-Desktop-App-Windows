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
exports.removeRollbarLogging = exports.addRollbarLogging = exports.removeUserDebugLogger = exports.addUserDebugLogger = exports.logger = undefined;

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
  /*****
  * https://github.com/winstonjs/winston
  * Winston log levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
  * So can use logger.error(), logger.warn(), logger.info(), logger.verbose(), logger.debug()
  */
};const logger = new _winston2.default.Logger({
  level: 'debug',
  exitOnError: false
});

if (true) {
  logger.add(_winston2.default.transports.Console, {
    handleExceptions: true,
    humanReadableUnhandledException: true
  });
} // dont send errors to rollbar in dev && only if enabled.
if (false) {} /**
  * We also need to disable rollbar itself as it is set to report uncaught exceptions.
  */
function addRollbarLogging() {
  _customRollbarTransport.rollbarLogger.configure({ enabled: true });
  logger.add(_customRollbarTransport.CustomRollbarTransport, rollbarTransportOptions);
}function removeRollbarLogging() {
  _customRollbarTransport.rollbarLogger.configure({ enabled: false });
  logger.remove(_customRollbarTransport.CustomRollbarTransport);
}function addUserDebugLogger() {
  logger.add(_userDebugLogger.UserDebugLoggerTransport, userDebugTransportOptions);
}function removeUserDebugLogger() {
  logger.remove(_userDebugLogger.UserDebugLoggerTransport);
}_electron.ipcMain.on('settings-renderer:error-sent', (event, arg) => {
  return logger.error('settings-renderer:error-sent', arg);
});

exports.logger = logger;
exports.addUserDebugLogger = addUserDebugLogger;
exports.removeUserDebugLogger = removeUserDebugLogger;
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/****
* This is the loggger for when the user checks the "debug" checkbox in the options
* window. The log data is sent to the debug window renderer and displayed there.
*
* The transports need a param (options) or they throw an error, even if you don't use it.
*/
const UserDebugLoggerTransport = _winston2.default.transports.CustomLogger = function (options) {
  Object.assign(this, options);
};_util2.default.inherits(UserDebugLoggerTransport, _winston2.default.Transport);

UserDebugLoggerTransport.prototype.log = function (level, msg = '', meta = {}, callback) {
  var _debugWindow$webConte;

  _debugWindow.debugWindow == null ? void 0 : (_debugWindow$webConte = _debugWindow.debugWindow.webContents) == null ? void 0 : typeof _debugWindow$webConte.send !== 'function' ? void 0 : _debugWindow$webConte.send('mainprocess:debug-info-sent', { level, msg, meta });
  callback(null, true);
};exports.UserDebugLoggerTransport = UserDebugLoggerTransport;

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
const devtronPath = _path2.default.resolve(__dirname, '..', '..', 'node_modules', 'devtron');

function setUpDev() {
  if (false) {}
  __webpack_require__(/*! electron-reload */ "electron-reload")([settingsWindowHTMLfilePath, settingsWindowCSSfilePath, settingsWindowJSfilePath, settingsWindowIconFiles]);
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
exports.omitGawkObserverFromSettings = exports.omitInheritedProperties = exports.logSettingsUpdateInDev = exports.noop = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _qI = __webpack_require__(/*! q-i */ "q-i");

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {
  return;
}function omitGawkObserverFromSettings(settings) {
  return omitInheritedProperties(settings, '__gawk__');
}function logSettingsUpdateInDev(newSettingKey, newSettingValue) {
  if (true) {
    console.log('======================updateSetting======================');
    console.log(newSettingKey);
    (0, _qI.print)(newSettingValue);
  }
} /**
   * In the off-chance that an object key name is literally the word 'undefined',
   * set Symbol() as the default param.
   */
function omitInheritedProperties(obj, propFilter = Symbol()) {
  return Object.getOwnPropertyNames(obj).reduce(function (prev, propName) {
    if (propFilter === propName) return prev;
    if (isObject(obj[propName])) {
      return _extends({}, prev, { [propName]: omitInheritedProperties(obj[propName], propFilter) });
    }return _extends({}, prev, { [propName]: obj[propName] });
  }, {});
}function isObject(obj) {
  return _lodash2.default.isObject(obj) && !_lodash2.default.isArray(obj) && !_lodash2.default.isFunction(obj) && !_lodash2.default.isRegExp(obj);
}exports.noop = noop;
exports.logSettingsUpdateInDev = logSettingsUpdateInDev;
exports.omitInheritedProperties = omitInheritedProperties;
exports.omitGawkObserverFromSettings = omitGawkObserverFromSettings;

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
exports.removeNewDeviceToSearchFor = exports.addNewDeviceToSearchFor = exports.getSettings = exports.updateSetting = undefined;

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(/*! electron */ "electron");

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _qI = __webpack_require__(/*! q-i */ "q-i");

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const settingsDBpath = _path2.default.join(_electron.app.getPath('userData'), 'lanlost-settings.json');
const adapter = new _FileSync2.default(settingsDBpath);
const db = (0, _lowdb2.default)(adapter);

db.defaults(_settingsDefaults.defaultSettings).write();

const settings = (0, _gawk2.default)(db.getState());

(0, _settingsObservers.initSettingsObservers)(settings);
(0, _settingsIPClisteners.initSettingsIPClisteners)();
if (true) (0, _qI.print)(settings);

function getSettings() {
  return settings;
}function updateSetting(newSettingKey, newSettingValue) {
  (0, _utils.logSettingsUpdateInDev)(newSettingKey, newSettingValue);
  settings[newSettingKey] = newSettingValue;
  db.set(newSettingKey, newSettingValue).write();
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
}exports.updateSetting = updateSetting;
exports.getSettings = getSettings;
exports.addNewDeviceToSearchFor = addNewDeviceToSearchFor;
exports.removeNewDeviceToSearchFor = removeNewDeviceToSearchFor;

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
  firstRun: true,
  runOnStartup: true,
  trayIconColor: 'white',
  settingsWindowPosition: null,
  devicesToSearchFor: [],
  timeToLock: 2,
  reportErrors: true,
  userDebug: false,
  hostsScanRange: {
    start: 2,
    end: 254
  },
  hostScanTimeout: 3000,
  getMacVendorInfo: true
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

var _debugWindow = __webpack_require__(/*! ../debugWindow/debugWindow.lsc */ "./app/debugWindow/debugWindow.lsc");

var _tray = __webpack_require__(/*! ../tray/tray.lsc */ "./app/tray/tray.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initSettingsObservers(settings) {
  _gawk2.default.watch(settings, ['lanLostEnabled'], function (newValue) {
    var _settingsWindow$webCo;

    _settingsWindow.settingsWindow == null ? void 0 : (_settingsWindow$webCo = _settingsWindow.settingsWindow.webContents) == null ? void 0 : _settingsWindow$webCo.send('mainprocess:setting-updated-in-main', { lanLostEnabled: newValue });
  });
  _gawk2.default.watch(settings, ['reportErrors'], function (newValue) {
    if (newValue) (0, _logging.addRollbarLogging)();else (0, _logging.removeRollbarLogging)();
  });
  _gawk2.default.watch(settings, ['userDebug'], function (newValue) {
    if (newValue) {
      (0, _logging.addUserDebugLogger)();
      (0, _debugWindow.showDebugWindow)();
    } else {
      (0, _logging.removeUserDebugLogger)();
      (0, _debugWindow.closeDebugWindow)();
    }
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
  frame: false,
  show: false,
  webPreferences: {
    textAreasAreResizable: true,
    devTools: true
  }
});
/****
* Remove the menu in alt menu bar in prod, so they dont accidentally exit the app.
* Reload is for dev so we can easily reload the browserwindow with Ctrl+R
*/
const debugWindowMenu =  true ? _electron.Menu.buildFromTemplate([{ role: 'reload' }]) : undefined;
let debugWindow = null;

function showDebugWindow() {
  if (debugWindow) return debugWindow.show();

  exports.debugWindow = debugWindow = new _electron.BrowserWindow(debugWindowProperties);
  debugWindow.loadURL(debugWindowHTMLpath);
  debugWindow.setMenu(debugWindowMenu);

  if (true) debugWindow.webContents.openDevTools({ mode: 'undocked' });

  debugWindow.once('close', function () {
    (0, _logging.removeUserDebugLogger)();
  });

  debugWindow.once('ready-to-show', function () {
    debugWindow.show();
    (0, _logging.addUserDebugLogger)();
  });

  debugWindow.once('closed', function () {
    exports.debugWindow = debugWindow = null;
  });
}function closeDebugWindow() {
  debugWindow.close();
}exports.debugWindow = debugWindow;
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

var _setUpDev = __webpack_require__(/*! ../common/setUpDev.lsc */ "./app/common/setUpDev.lsc");

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

var _tray = __webpack_require__(/*! ../tray/tray.lsc */ "./app/tray/tray.lsc");

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/settingsWindow/settingsWindow.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _networkScanner = __webpack_require__(/*! ../networkScan/networkScanner.lsc */ "./app/networkScan/networkScanner.lsc");

_electron.app.once('ready', function () {
  var _electronApp$dock;

  if (_electron.app.makeSingleInstance(_utils.noop)) _electron.app.quit();
  if (true) (0, _setUpDev.setUpDev)();
  if (!(0, _settings.getSettings)().firstRun) (_electronApp$dock = _electron.app.dock) == null ? void 0 : _electronApp$dock.hide();

  (0, _networkScanner.initScan)().catch(_logging.logger.error);
  (0, _tray.initTrayMenu)();

  if ((0, _settings.getSettings)().firstRun) {
    (0, _settings.updateSetting)('firstRun', false);
    (0, _settingsWindow.showSettingsWindow)();
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
// import _ from 'lodash'

// import { logger } from '../common/logging/logging.lsc'
// import { getSettings } from '../db/settings.lsc'
// import { settingsWindow } from '../settingsWindow/settingsWindow.lsc'
// import { lockSystem, checkIfShouldLock } from '../common/lockSystem.lsc'
// import { scanforDevices } from './blueToothMain.lsc'

// let lastTimeSawADeviceWeAreLookingFor = Date.now()

function handleScanResults(host) {
  return;
} // console.log('handleScanResults')
// console.log(host)
// logger.debug(`scanHost returned device active on ip: ${ activeHostIP }`)

// Check for duplicates in deviceList in case run in to this bug:
// https://github.com/electron/electron/issues/10800
// dedupedDeviceList = dedupeAndPreferName(deviceList)

// logger.info('scan results', dedupedDeviceList)

// settingsWindow?.webContents?.send('mainprocess:update-of-bluetooth-devices-can-see', dedupedDeviceList)

// sawDeviceWeAreLookingFor = dedupedDeviceList.some(({deviceId}) -> _.find(getSettings().devicesToSearchFor, { deviceId }))
// shouldLock = checkIfShouldLock(sawDeviceWeAreLookingFor, lastTimeSawADeviceWeAreLookingFor)

// if shouldLock: lockSystem()
// if sawDeviceWeAreLookingFor: now lastTimeSawADeviceWeAreLookingFor = Date.now()


/*****
* We remove duplicates, but also for any duplicates, we prefer to take the duplicate
* that has a device name (sometimes they have an empty string for a device name).
*/
function dedupeAndPreferName(deviceList) {
  return deviceList.reduce(function (newDeviceList, newDevice) {
    var _foundDeviceInNewList;

    const deviceId = newDevice.deviceId;
    const foundDeviceInNewList = _.find(newDeviceList, { deviceId });
    if (!foundDeviceInNewList) {
      return [...(newDeviceList === void 0 ? [] : newDeviceList), newDevice];
    }if (!(foundDeviceInNewList == null ? void 0 : (_foundDeviceInNewList = foundDeviceInNewList.deviceName) == null ? void 0 : _foundDeviceInNewList.length) && newDevice.deviceName.length) {
      var _ref;

      return [...(_ref = _.filter(newDeviceList, item => item.deviceId !== deviceId), _ref === void 0 ? [] : _ref), newDevice];
    }return newDeviceList;
  }, []);
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
exports.initScan = undefined;

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

var _nodeArp = __webpack_require__(/*! node-arp */ "./node_modules/node-arp/lib/arp.js");

var _nodeArp2 = _interopRequireDefault(_nodeArp);

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

var _handleScanResults = __webpack_require__(/*! ./handleScanResults.lsc */ "./app/networkScan/handleScanResults.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pGetMAC = _util2.default.promisify(_nodeArp2.default.getMAC);
const scanInterval = (0, _ms2.default)('30 seconds');
/**
 * defaultGateway.v4() Promise contains an object like:
 * { gateway: '192.168.1.1', interface: 'Ethernet' } if successful.
 */
function initScan() {
  return _defaultGateway2.default.v4().then(scanNetwork);
}function scanNetwork({ gateway }) {
  const {
    hostsScanRange: { start: hostsRangeStart, end: hostsRangeEnd },
    hostScanTimeout
  } = (0, _settings.getSettings)();

  _logging.logger.debug(`new scan started`);
  _logging.logger.debug(`gateway ip: ${gateway}`);

  generateHostIPs(gateway, hostsRangeStart, hostsRangeEnd).forEach(function (hostIP) {
    scanHost(hostIP, hostScanTimeout).then(getMacAdressForHostIP).then(getVendorInfoForMacAddress).then(_handleScanResults.handleScanResults).catch(_logging.logger.error);
  });

  setTimeout(function () {
    scanNetwork({ gateway });
  }, scanInterval);
} // http://bit.ly/2pzLeD3
function scanHost(hostIP, hostScanTimeout) {
  return new Promise(function (resolve, reject) {
    const socket = new _net.Socket();

    socket.setTimeout(hostScanTimeout);
    socket.connect({ host: hostIP, port: 1 });
    socket.unref();

    socket.on('error', function (error) {
      if (error.code === 'ECONNREFUSED') resolve(hostIP);else reject(error);
    });

    socket.on('timeout', function () {
      socket.destroy();
    });

    socket.on('connect', function () {
      resolve(hostIP);
      socket.destroy();
    });
  });
}function getMacAdressForHostIP(activeHostIP) {
  return pGetMAC(activeHostIP).then(function (macAddress) {
    return { ipAddress: activeHostIP, macAddress };
  });
}function getVendorInfoForMacAddress(hostDetails) {
  if (!(0, _settings.getSettings)().getMacVendorInfo) return hostDetails;

  const apiAddress = `http://macvendors.co/api/${hostDetails.macAddress.replace(/:([^:]{1}):/g, ':0$1:')}/json`;

  return fetch(apiAddress).then(function (response) {
    return response.json();
  }).then(function (json) {
    var _json$result;

    return _extends({}, hostDetails, { vendorName: json == null ? void 0 : (_json$result = json.result) == null ? void 0 : _json$result.company });
  })
  // don't want a fetch error to cancel everything, so catch here and continue.
  .catch(function (err) {
    _logging.logger.error(err);
    return _extends({}, hostDetails, { vendorName: undefined });
  } // eslint-disable-line no-undefined
  );
}function generateHostIPs(gateway, hostsRangeStart, hostsRangeEnd) {
  const networkOctects = gateway.slice(0, gateway.lastIndexOf('.'));

  return _lodash2.default.range(hostsRangeStart, hostsRangeEnd).map(function (lastOctet) {
    return `${networkOctects}.${lastOctet}`;
  }).filter(function (hostIP) {
    return hostIP !== gateway;
  });
}exports.initScan = initScan;

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
  * load the inital app settings on renderer startup. This way we dont have to send a message from the renderer
  * to the main processs to ask for the settings - or send them from main process on detection of the
  * BrowserWindow 'ready-to-show' event, both of which might make the UI show nothing briefly before the settings.
  *
  * We can't use remote.require(../settings.lsc).getSettings() in the renderer because it doesn't seem to work
  * with code that needs to be transpiled, as everything in settlings.lsc is compiled into appMain-compiled.js and the
  * remote.require() looks for the .lsc file - it doesn't know that the settings module has been compiled and now lives
  * inside of the appMain-compiled.js file.
  */
  global.settingsWindowRendererInitialSettings = (0, _utils.omitGawkObserverFromSettings)((0, _settings.getSettings)());

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

/***/ "./app/tray/toggleEnabledFromTray.lsc":
/*!********************************************!*\
  !*** ./app/tray/toggleEnabledFromTray.lsc ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleEnabledFromTray = undefined;

var _settings = __webpack_require__(/*! ../db/settings.lsc */ "./app/db/settings.lsc");

function toggleEnabledFromTray() {
  const toggledLanLostEnabled = !(0, _settings.getSettings)().lanLostEnabled;
  (0, _settings.updateSetting)('lanLostEnabled', toggledLanLostEnabled);
}exports.toggleEnabledFromTray = toggleEnabledFromTray;

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
exports.changeTrayIcon = exports.initTrayMenu = undefined;

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(/*! electron */ "electron");

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/settingsWindow/settingsWindow.lsc");

var _toggleEnabledFromTray = __webpack_require__(/*! ./toggleEnabledFromTray.lsc */ "./app/tray/toggleEnabledFromTray.lsc");

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
    click() {
      return (0, _settingsWindow.showSettingsWindow)();
    }
  }, {
    label: `${(0, _settings.getSettings)().lanLostEnabled ? 'Disable' : 'Enable'} LANLost`,
    click() {
      (0, _toggleEnabledFromTray.toggleEnabledFromTray)();
      return tray.setContextMenu(createContextMenu());
    }
  }, {
    label: 'Quit LANLost',
    click() {
      return _electron.app.quit();
    }
  }]);
}function changeTrayIcon(newTrayIconColor) {
  tray.setImage(getNewTrayIconPath(newTrayIconColor));
}exports.initTrayMenu = initTrayMenu;
exports.changeTrayIcon = changeTrayIcon;

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

/***/ "./node_modules/node-arp/lib/arp.js":
/*!******************************************!*\
  !*** ./node_modules/node-arp/lib/arp.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var util = __webpack_require__(/*! util */ "util");
var spawn = __webpack_require__(/*! child_process */ "child_process").spawn;

/**
 * Read the MAC address from the ARP table.
 * 
 * 3 methods for lin/win/mac  Linux reads /proc/net/arp
 * mac and win read the output of the arp command.
 * 
 * all 3 ping the IP first without checking the response to encourage the
 * OS to update the arp table.
 * 
 * 31/12/2014 -- Changelog by Leandre Gohy (leandre.gohy@hexeo.be)
 * - FIX : ping command for windows (-n not -c)
 *
 * 26/08/2013 -- Changelog by Leandre Gohy (leandre.gohy@hexeo.be)
 * - FIX : arp command for OSX (-n not -an)
 * - MODIFY : rewrite Linux lookup function to avoid looping over all entries and returned lines (arp -n IPADDRESS)
 * - MODIFY : rewrite OSX lookup function to avoid looping over all returned lines
 * - FIX : OSX formates double zero as a single one (i.e : 0:19:99:50:3a:3 instead of 00:19:99:50:3a:3)
 * - FIX : lookup functions did not returns the function on error causing callback to be called twice
 * - FIX : Windows lookup function returns wrong mac address due to indexOf usage (192.168.1.1 -> 192.168.1.10)
 * 
 */
module.exports.getMAC = function(ipaddress, cb) {
	if(process.platform.indexOf('linux') == 0) {
		exports.readMACLinux(ipaddress, cb);
	}
	else if (process.platform.indexOf('win') == 0) {
		exports.readMACWindows(ipaddress, cb);
	}
	else if (process.platform.indexOf('darwin') == 0) {
		exports.readMACMac(ipaddress, cb);
	}
};

/**
 * read from arp -n IPADDRESS
 */
module.exports.readMACLinux = function(ipaddress, cb) {
	
	// ping the ip address to encourage the kernel to populate the arp tables
	var ping = spawn("ping", [ "-c", "1", ipaddress ]);
	
	ping.on('close', function (code) {
		// not bothered if ping did not work
		
		var arp = spawn("arp", [ "-n", ipaddress ]);
		var buffer = '';
		var errstream = '';
		arp.stdout.on('data', function (data) {
			buffer += data;
		});
		arp.stderr.on('data', function (data) {
			errstream += data;
		});
		
		arp.on('close', function (code) {
			if (code !== 0) {
				console.log("Error running arp " + code + " " + errstream);
				cb(true, code);
				return;
			}
			
			//Parse this format
			//Lookup succeeded : Address                  HWtype  HWaddress           Flags Mask            Iface
			//					IPADDRESS	              ether   MACADDRESS   C                     IFACE
			//Lookup failed : HOST (IPADDRESS) -- no entry
			//There is minimum two lines when lookup is successful
			var table = buffer.split('\n');
			if (table.length >= 2) {
				var parts = table[1].split(' ').filter(String);
				cb(false, parts.length == 5 ? parts[2] : parts[1]);
				return;
			}
			cb(true, "Could not find ip in arp table: " + ipaddress);
		});
	});	
	
};

/**
 * read from arp -a IPADDRESS
 */
module.exports.readMACWindows = function(ipaddress, cb) {
	
	// ping the ip address to encourage the kernel to populate the arp tables
	var ping = spawn("ping", ["-n", "1", ipaddress ]);
	
	ping.on('close', function (code) {
		// not bothered if ping did not work
		
		var arp = spawn("arp", ["-a", ipaddress] );
		var buffer = '';
		var errstream = '';
		var lineIndex;
		
		arp.stdout.on('data', function (data) {
			buffer += data;
		});
		arp.stderr.on('data', function (data) {
			errstream += data;
		});
		
		arp.on('close', function (code) {
			if (code !== 0) {
				console.log("Error running arp " + code + " " + errstream);
				cb(true, code);
				return;
			}
			
			var table = buffer.split('\r\n');
			for (lineIndex = 3; lineIndex < table.length; lineIndex++) {
				//parse this format
				//[blankline]
				//Interface: 192.º68.1.54
				//  Internet Address      Physical Address     Type
				//  192.168.1.1           50-67-f0-8c-7a-3f    dynamic
				
				var parts = table[lineIndex].split(' ').filter(String);
				if (parts[0] === ipaddress) {
					var mac = parts[1].replace(/-/g, ':');
					cb(false, mac);
					return;
				}
			}
			cb(true, "Count not find ip in arp table: " + ipaddress); 
		});
	});	
	
};
/**
 * read from arp -n IPADDRESS
 */
module.exports.readMACMac = function(ipaddress, cb) {
	
	// ping the ip address to encourage the kernel to populate the arp tables
	var ping = spawn("ping", ["-c", "1", ipaddress ]);
	
	ping.on('close', function (code) {
		// not bothered if ping did not work
		
		var arp = spawn("arp", ["-n", ipaddress] );
		var buffer = '';
		var errstream = '';
		arp.stdout.on('data', function (data) {
			buffer += data;
		});
		arp.stderr.on('data', function (data) {
			errstream += data;
		});
		
		arp.on('close', function (code) {
			// On lookup failed OSX returns code 1
			// but errstream will be empty
			if (code !== 0 && errstream !== '') {
				console.log("Error running arp " + code + " " + errstream);
				cb(true, code);
				return;
			}
			 
			//parse this format
			//Lookup succeeded : HOST (IPADDRESS) at MACADDRESS on IFACE ifscope [ethernet]
			//Lookup failed : HOST (IPADDRESS) -- no entry
			var parts = buffer.split(' ').filter(String);
			if (parts[3] !== 'no') {
				var mac = parts[3].replace(/^0:/g, '00:').replace(/:0:/g, ':00:').replace(/:0$/g, ':00').replace(/:([^:]{1}):/g, ':0$1:');
				cb(false, mac);
				return;
			}
				
			cb(true, "Count not find ip in arp table: " + ipaddress);
		});
	});	
	
};


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

/***/ "gawk":
/*!***********************!*\
  !*** external "gawk" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("gawk");

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

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "q-i":
/*!**********************!*\
  !*** external "q-i" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("q-i");

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