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

/***/ "./app/appUpdates/appUpdates.lsc":
/*!***************************************!*\
  !*** ./app/appUpdates/appUpdates.lsc ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkForUpdate = undefined;

var _ms = __webpack_require__(/*! ms */ "ms");

var _ms2 = _interopRequireDefault(_ms);

var _got = __webpack_require__(/*! got */ "got");

var _got2 = _interopRequireDefault(_got);

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/settings/settings.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _showUpdateNotification = __webpack_require__(/*! ./showUpdateNotification.lsc */ "./app/appUpdates/showUpdateNotification.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

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

/***/ "./app/appUpdates/showUpdateNotification.lsc":
/*!***************************************************!*\
  !*** ./app/appUpdates/showUpdateNotification.lsc ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showUpdateNotification = undefined;

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _url = __webpack_require__(/*! url */ "url");

var _url2 = _interopRequireDefault(_url);

var _electron = __webpack_require__(/*! electron */ "electron");

var _electronPositioner = __webpack_require__(/*! electron-positioner */ "electron-positioner");

var _electronPositioner2 = _interopRequireDefault(_electronPositioner);

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/settings/settings.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let notificationWindow = null;
const notificationWindowMenu =  true ? _electron.Menu.buildFromTemplate([{ role: 'reload' }]) : undefined;
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
    icon: iconFileName,
    title: 'An Update Is Available For LANLost'
  });

  notificationWindow.setMenu(notificationWindowMenu);

  var positioner = new _electronPositioner2.default(notificationWindow);
  positioner.move('bottomRight');

  notificationWindow.loadURL(updateHTMLfilePath);
  if (true) notificationWindow.webContents.openDevTools({ mode: 'undocked' });

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
exports.lockTheSystem = undefined;

var _lockSystem = __webpack_require__(/*! lock-system */ "lock-system");

var _lockSystem2 = _interopRequireDefault(_lockSystem);

var _logging = __webpack_require__(/*! ./logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/settings/settings.lsc");

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

var _winston = __webpack_require__(/*! winston */ "winston");

var _winston2 = _interopRequireDefault(_winston);

var _rollbar = __webpack_require__(/*! rollbar */ "rollbar");

var _rollbar2 = _interopRequireDefault(_rollbar);

var _utils = __webpack_require__(/*! ../utils.lsc */ "./app/common/utils.lsc");

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

var _settings = __webpack_require__(/*! ../../settings/settings.lsc */ "./app/settings/settings.lsc");

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
  if (false) {}
  __webpack_require__(/*! electron-reload */ "electron-reload")([settingsWindowHTMLfilePath, settingsWindowCSSfilePath, settingsWindowJSfilePath, settingsWindowIconFiles, debugWindowHTMLfilePath, debugWindowJSfilePath, notificationWindowHTMLfilePath]);
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
exports.getProperAppVersion = exports.capitalizeFirstLetter = exports.tenYearsFromNow = exports.range = exports.curryRight = exports.curry = exports.pipe = exports.isObject = exports.noop = exports.omitInheritedProperties = exports.recursiveOmitFilterAndInheritedPropertiesFromObj = exports.omitGawkFromSettings = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ms = __webpack_require__(/*! ms */ "ms");

var _ms2 = _interopRequireDefault(_ms);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appVersion = __webpack_require__(/*! ../../package.json */ "./package.json").version;

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

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/settings/settings.lsc");

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

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/settings/settings.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

var _tray = __webpack_require__(/*! ../tray/tray.lsc */ "./app/tray/tray.lsc");

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/settingsWindow/settingsWindow.lsc");

var _networkScanner = __webpack_require__(/*! ../networkScan/networkScanner.lsc */ "./app/networkScan/networkScanner.lsc");

var _updateOUIfilePeriodically = __webpack_require__(/*! ../oui/updateOUIfilePeriodically.lsc */ "./app/oui/updateOUIfilePeriodically.lsc");

var _runOnStartup = __webpack_require__(/*! ../common/runOnStartup.lsc */ "./app/common/runOnStartup.lsc");

var _appUpdates = __webpack_require__(/*! ../appUpdates/appUpdates.lsc */ "./app/appUpdates/appUpdates.lsc");

if (_electron.app.makeSingleInstance(_utils.noop)) _electron.app.quit();

_electron.app.once('ready', function () {
  var _electronApp$dock;

  const { firstRun } = (0, _settings.getSettings)();

  if (true) (0, _setUpDev.setUpDev)();
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

var _isEmpty = __webpack_require__(/*! is-empty */ "is-empty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _ms = __webpack_require__(/*! ms */ "ms");

var _ms2 = _interopRequireDefault(_ms);

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _settingsWindow = __webpack_require__(/*! ../settingsWindow/settingsWindow.lsc */ "./app/settingsWindow/settingsWindow.lsc");

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/settings/settings.lsc");

var _lockSystem = __webpack_require__(/*! ../common/lockSystem.lsc */ "./app/common/lockSystem.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

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

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/settings/settings.lsc");

var _getOUIfile = __webpack_require__(/*! ../oui/getOUIfile.lsc */ "./app/oui/getOUIfile.lsc");

var _handleScanResults = __webpack_require__(/*! ./handleScanResults.lsc */ "./app/networkScan/handleScanResults.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

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

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/settings/settings.lsc");

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

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/settings/settings.lsc");

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

/***/ "./app/settings/settings.lsc":
/*!***********************************!*\
  !*** ./app/settings/settings.lsc ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyADeviceInDevicesToSearchFor = exports.logStartupSettings = exports.removeNewDeviceToSearchFor = exports.addNewDeviceToSearchFor = exports.getSettings = exports.updateSetting = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = __webpack_require__(/*! path */ "path");

var _path2 = _interopRequireDefault(_path);

var _electron = __webpack_require__(/*! electron */ "electron");

var _gawk = __webpack_require__(/*! gawk */ "gawk");

var _gawk2 = _interopRequireDefault(_gawk);

var _lowdb = __webpack_require__(/*! lowdb */ "lowdb");

var _lowdb2 = _interopRequireDefault(_lowdb);

var _FileSync = __webpack_require__(/*! lowdb/adapters/FileSync */ "lowdb/adapters/FileSync");

var _FileSync2 = _interopRequireDefault(_FileSync);

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

var _settingsDefaults = __webpack_require__(/*! ./settingsDefaults.lsc */ "./app/settings/settingsDefaults.lsc");

var _settingsObservers = __webpack_require__(/*! ./settingsObservers.lsc */ "./app/settings/settingsObservers.lsc");

var _settingsIPClisteners = __webpack_require__(/*! ./settingsIPClisteners.lsc */ "./app/settings/settingsIPClisteners.lsc");

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

/***/ "./app/settings/settingsDefaults.lsc":
/*!*******************************************!*\
  !*** ./app/settings/settingsDefaults.lsc ***!
  \*******************************************/
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
  skipUpdateVersion: '2018.3.30'
};

exports.defaultSettings = defaultSettings;

/***/ }),

/***/ "./app/settings/settingsIPClisteners.lsc":
/*!***********************************************!*\
  !*** ./app/settings/settingsIPClisteners.lsc ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSettingsIPClisteners = undefined;

var _electron = __webpack_require__(/*! electron */ "electron");

var _types = __webpack_require__(/*! ../types/types.lsc */ "./app/types/types.lsc");

var _settings = __webpack_require__(/*! ./settings.lsc */ "./app/settings/settings.lsc");

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

/***/ "./app/settings/settingsObservers.lsc":
/*!********************************************!*\
  !*** ./app/settings/settingsObservers.lsc ***!
  \********************************************/
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

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/settings/settings.lsc");

var _logging = __webpack_require__(/*! ../common/logging/logging.lsc */ "./app/common/logging/logging.lsc");

var _utils = __webpack_require__(/*! ../common/utils.lsc */ "./app/common/utils.lsc");

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

  exports.settingsWindow = settingsWindow = new _electron.BrowserWindow(_extends({}, settingsWindowProperties, getStoredWindowPosition(), { icon: getIconPath() }));
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

var _settings = __webpack_require__(/*! ../settings/settings.lsc */ "./app/settings/settings.lsc");

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

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, productName, version, description, main, scripts, repository, author, license, dependencies, devDependencies, snyk, default */
/***/ (function(module) {

module.exports = {"name":"lanloss","productName":"LANLoss","version":"2018.3.31","description":"A desktop app that locks your computer when a device is lost on your local network","main":"app/main/appMain-compiled.js","scripts":{"webpackWatch":"cross-env NODE_ENV=development parallel-webpack --watch --max-retries=1 --no-stats","electronWatch":"cross-env NODE_ENV=development nodemon app/main/appMain-compiled.js --config ./nodemon.json","styleWatch":"cross-env NODE_ENV=development stylus -w app/settingsWindow/renderer/assets/styles/stylus/index.styl -o app/settingsWindow/renderer/assets/styles/css/settingsWindowCss-compiled.css","lintWatch":"cross-env NODE_ENV=development esw -w --ext .lsc -c .eslintrc.json --color --clear","debug":"cross-env NODE_ENV=development,nodeDebug=true sleepms 3000 && electron --inspect-brk ./app/main/appMain-compiled.js","build":"cross-env NODE_ENV=production,webpackBuild=true","start":"cross-env NODE_ENV=production electron ./app/main/appMain-compiled.js","snyk-protect":"snyk protect","createEnv":"gulp createEnvFile","bumpVersion":"gulp bumpVersion","prepare":"npm run snyk-protect"},"repository":"https://github.com/Darkle/LANLost.git","author":"Darkle <coop.coding@gmail.com>","license":"MIT","dependencies":{"@hyperapp/logger":"^0.5.0","add-line-numbers":"^1.0.1","auto-launch":"^5.0.5","bluebird":"^3.5.1","default-gateway":"^2.7.0","dotenv":"^5.0.1","electron":"^1.8.4","electron-positioner":"^3.0.0","formbase":"^6.0.3","fs-jetpack":"^1.3.0","gawk":"^4.4.5","got":"^8.3.0","hyperapp":"^1.2.0","internal-ip":"^3.0.1","is-empty":"^1.2.0","is-ip":"^2.0.0","lock-system":"^1.3.0","lowdb":"^1.0.0","ms":"^2.1.1","node-arp":"^1.0.6","ono":"^4.0.3","rollbar":"^2.3.9","stringify-object":"^3.2.2","winston":"^2.4.1"},"devDependencies":{"@oigroup/babel-preset-lightscript":"^3.1.0-alpha.2","@oigroup/lightscript-eslint":"^3.1.0-alpha.2","babel-core":"^6.26.0","babel-eslint":"^8.2.2","babel-loader":"^7.1.4","babel-plugin-transform-react-jsx":"^6.24.1","babel-register":"^6.26.0","cross-env":"^5.1.4","devtron":"^1.4.0","electron-reload":"^1.2.2","eslint":"=4.8.0","eslint-plugin-jsx":"0.0.2","eslint-plugin-react":"^7.7.0","eslint-watch":"^3.1.3","exeq":"^3.0.0","gulp":"github:gulpjs/gulp#4.0","moment":"^2.22.0","nodemon":"^1.17.2","parallel-webpack":"^2.3.0","sleep-ms":"^2.0.1","snyk":"^1.70.2","stylus":"^0.54.5","webpack":"^4.3.0","webpack-node-externals":"^1.6.0"},"snyk":true};

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

/***/ "electron-positioner":
/*!**************************************!*\
  !*** external "electron-positioner" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron-positioner");

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

/***/ "is-empty":
/*!***************************!*\
  !*** external "is-empty" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("is-empty");

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