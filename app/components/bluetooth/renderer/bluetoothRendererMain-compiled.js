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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/bluetooth/renderer/bluetoothRendererMain.lsc");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/bluetooth/renderer/bluetoothRendererMain.lsc":
/*!**********************************************************!*\
  !*** ./app/bluetooth/renderer/bluetoothRendererMain.lsc ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(/*! electron */ "electron");

var _utils = __webpack_require__(/*! ../../common/utils.lsc */ "./app/common/utils.lsc");

function handleRendererWindowError(messageOrEvent, source, lineNumber, columnNumber, error) {
  _electron.ipcRenderer.send('bluetooth-scan-window-renderer:error-sent', { messageOrEvent, source, lineNumber, columnNumber, error: (0, _utils.omitInheritedProperties)(error) });
}window.onerror = handleRendererWindowError;
window.onunhandledrejection = handleRendererWindowError;

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
exports.generateLogTimeStamp = exports.recursivelyOmitObjProperties = exports.getProperAppVersion = exports.tenYearsFromNow = exports.identity = exports.compose = exports.range = exports.curryRight = exports.curry = exports.pipe = exports.noop = exports.omitInheritedProperties = exports.omitGawkFromSettings = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _timeproxy = __webpack_require__(/*! timeproxy */ "timeproxy");

var _timeproxy2 = _interopRequireDefault(_timeproxy);

var _typa = __webpack_require__(/*! typa */ "typa");

var _typa2 = _interopRequireDefault(_typa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If you run Electron by pointing it to a js file that's not in the base parent directory with the
 * package.json it will report the Electron binary version rather than what's in your package.json.
 * https://github.com/electron/electron/issues/7085
 */
const appVersion = __webpack_require__(/*! ../../package.json */ "./package.json").version;

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
}function compose(...fns) {
  return function (value) {
    return fns.reduceRight((accumulator, current) => current(accumulator), value);
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
}function identity(param) {
  return param;
}function range(start, end) {
  return Array.from({ length: end - start + 1 }, function (v, k) {
    return k + start;
  });
} //includes end number
function tenYearsFromNow() {
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
}exports.omitGawkFromSettings = omitGawkFromSettings;
exports.omitInheritedProperties = omitInheritedProperties;
exports.noop = noop;
exports.pipe = pipe;
exports.curry = curry;
exports.curryRight = curryRight;
exports.range = range;
exports.compose = compose;
exports.identity = identity;
exports.tenYearsFromNow = tenYearsFromNow;
exports.getProperAppVersion = getProperAppVersion;
exports.recursivelyOmitObjProperties = recursivelyOmitObjProperties;
exports.generateLogTimeStamp = generateLogTimeStamp;

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, productName, version, description, main, scripts, repository, author, license, dependencies, devDependencies, snyk, default */
/***/ (function(module) {

module.exports = {"name":"blueloss","productName":"BlueLoss","version":"0.2.3","description":"A desktop app that locks your computer when a device is lost","main":"app/main/appMain-compiled.js","scripts":{"ww":"cross-env NODE_ENV=development parallel-webpack --watch --max-retries=1 --no-stats","ew":"cross-env NODE_ENV=development nodemon app/main/appMain-compiled.js --config nodemon.json","styleWatch":"cross-env NODE_ENV=development stylus -w app/settingsWindow/renderer/assets/styles/stylus/index.styl -o app/settingsWindow/renderer/assets/styles/css/settingsWindowCss-compiled.css","lintWatch":"cross-env NODE_ENV=development esw -w --ext .lsc -c .eslintrc.json --color --clear","debug":"cross-env NODE_ENV=development nodeDebug=true parallel-webpack && sleepms 3000 && electron --inspect-brk app/main/appMain-compiled.js","start":"cross-env NODE_ENV=production electron app/main/appMain-compiled.js","devTasks":"cross-env NODE_ENV=production node devTasks/tasks.js","test":"snyk test","snyk-protect":"snyk protect","prepare":"npm run snyk-protect"},"repository":"https://github.com/Darkle/BlueLoss.git","author":"Darkle <coop.coding@gmail.com>","license":"MIT","dependencies":{"@hyperapp/logger":"^0.5.0","auto-launch":"^5.0.5","dotenv":"^5.0.1","electron-positioner":"^3.0.0","formbase":"^6.0.4","fs-jetpack":"^1.3.0","gawk":"^4.4.5","got":"^8.3.0","hyperapp":"^1.2.5","is-empty":"^1.2.0","lock-system":"^1.3.0","lodash.omit":"^4.5.0","lowdb":"^1.0.0","ono":"^4.0.5","rollbar":"^2.3.9","snyk":"^1.76.0","stringify-object":"^3.2.2","timeproxy":"^1.2.1","typa":"^0.1.18","winston":"^2.4.1"},"devDependencies":{"@oigroup/babel-preset-lightscript":"^3.1.0-alpha.2","@oigroup/lightscript-eslint":"^3.1.0-alpha.2","babel-core":"^6.26.0","babel-eslint":"^8.2.3","babel-loader":"^7.1.4","babel-plugin-transform-react-jsx":"^6.24.1","babel-register":"^6.26.0","chalk":"^2.4.1","cross-env":"^5.1.4","del":"^3.0.0","devtron":"^1.4.0","electron":"^2.0.1","electron-packager":"^12.0.1","electron-reload":"^1.2.2","electron-wix-msi":"^1.3.0","eslint":"=4.8.0","eslint-plugin-jsx":"0.0.2","eslint-plugin-react":"^7.8.2","eslint-watch":"^3.1.4","exeq":"^3.0.0","inquirer":"^5.2.0","node-7z":"^0.4.0","nodemon":"^1.17.3","parallel-webpack":"^2.3.0","semver":"^5.5.0","sleep-ms":"^2.0.1","stylus":"^0.54.5","webpack":"^4.8.3","webpack-node-externals":"^1.7.2"},"snyk":true};

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

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

/***/ })

/******/ });