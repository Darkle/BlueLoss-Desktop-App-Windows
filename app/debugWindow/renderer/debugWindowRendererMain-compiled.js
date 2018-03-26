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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/debugWindow/renderer/debugWindowRendererMain.lsc");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/debugWindow/renderer/debugWindowRendererMain.lsc":
/*!**************************************************************!*\
  !*** ./app/debugWindow/renderer/debugWindowRendererMain.lsc ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(/*! electron */ "electron");

var _stringifyObject = __webpack_require__(/*! stringify-object */ "stringify-object");

var _stringifyObject2 = _interopRequireDefault(_stringifyObject);

var _addLineNumbers = __webpack_require__(/*! add-line-numbers */ "add-line-numbers");

var _addLineNumbers2 = _interopRequireDefault(_addLineNumbers);

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const preElem = document.querySelector('#debugOutput');

let loggingTextSansLineNumbers = '';

_electron.ipcRenderer.on('mainprocess:debug-info-sent', function (event, { msg = '', meta }) {
  loggingTextSansLineNumbers = createLoggingSansLineNumbers(msg, meta);
  preElem.textContent = (0, _addLineNumbers2.default)(loggingTextSansLineNumbers);
});

function createMetaObjForLogging(meta) {
  if (_lodash2.default.isEmpty(meta)) return '';
  if (meta.stack) meta.stack = meta.stack.split(/\r\n?|\n/);
  return (0, _stringifyObject2.default)(meta).replace(/'/g, '');
}function createLoggingSansLineNumbers(msg, meta) {
  const metaObj = createMetaObjForLogging(meta);
  let logString = `${loggingTextSansLineNumbers}${msg + metaObj}\n`;
  if (isDebugWindowOpeningMessage(msg)) {
    logString = `${logString}Please Wait...\n`;
  }return logString;
}function isDebugWindowOpeningMessage(msg) {
  return msg === 'Settings Loaded At LANLost Startup:';
}

/***/ }),

/***/ "add-line-numbers":
/*!***********************************!*\
  !*** external "add-line-numbers" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("add-line-numbers");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "stringify-object":
/*!***********************************!*\
  !*** external "stringify-object" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stringify-object");

/***/ })

/******/ });