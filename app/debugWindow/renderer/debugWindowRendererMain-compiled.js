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
exports.recursivelyOmitObjProperties = exports.getProperAppVersion = exports.capitalizeFirstLetter = exports.tenYearsFromNow = exports.compose = exports.range = exports.curryRight = exports.curry = exports.pipe = exports.isObject = exports.noop = exports.omitInheritedProperties = exports.omitGawkFromSettings = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _timeproxy = __webpack_require__(/*! timeproxy */ "./node_modules/timeproxy/lib/index.js");

var _timeproxy2 = _interopRequireDefault(_timeproxy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appVersion = __webpack_require__(/*! ../../package.json */ "./package.json").version;

function omitGawkFromSettings(settings) {
  return recursivelyOmitObjProperties(settings, ['__gawk__']);
}function recursivelyOmitObjProperties(obj, propertyFiltersArr = []) {
  return Object.keys(obj).reduce(function (newObj, propName) {
    for (let _i = 0, _len = propertyFiltersArr.length; _i < _len; _i++) {
      const propertyToFilter = propertyFiltersArr[_i];
      if (propertyToFilter === propName) return newObj;
    }if (isObject(obj[propName])) {
      return _extends({}, newObj, { [propName]: recursivelyOmitObjProperties(obj[propName], propertyFiltersArr) });
    }return _extends({}, newObj, { [propName]: obj[propName] });
  }, {});
}function omitInheritedProperties(obj) {
  return Object.getOwnPropertyNames(obj).reduce(function (newObj, propName) {
    if (isObject(obj[propName])) {
      return _extends({}, newObj, { [propName]: omitInheritedProperties(obj[propName]) });
    }return _extends({}, newObj, { [propName]: obj[propName] });
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
}function range(start, end) {
  return Array.from({ length: end - start + 1 }, function (v, k) {
    return k + start;
  });
} //includes end number
function isObject(obj) {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && !isFunction(obj);
}function isFunction(value) {
  return typeof value === 'function';
}function tenYearsFromNow() {
  return Date.now() + _timeproxy2.default.FIVE_HUNDRED_WEEKS;
}function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}exports.omitGawkFromSettings = omitGawkFromSettings;
exports.omitInheritedProperties = omitInheritedProperties;
exports.noop = noop;
exports.isObject = isObject;
exports.pipe = pipe;
exports.curry = curry;
exports.curryRight = curryRight;
exports.range = range;
exports.compose = compose;
exports.tenYearsFromNow = tenYearsFromNow;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
exports.getProperAppVersion = getProperAppVersion;
exports.recursivelyOmitObjProperties = recursivelyOmitObjProperties;

/***/ }),

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

var _isEmpty = __webpack_require__(/*! is-empty */ "is-empty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _utils = __webpack_require__(/*! ../../common/utils.lsc */ "./app/common/utils.lsc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const preElem = document.querySelector('#debugOutput');
const { blueLossEnabled } = (0, _utils.omitInheritedProperties)(_electron.remote.getGlobal('settingsWindowRendererInitialSettings'));
let loggingTextSansLineNumbers = '';

_electron.ipcRenderer.on('mainprocess:debug-info-sent', function (event, { msg = '', meta }) {
  loggingTextSansLineNumbers = createLoggingSansLineNumbers(msg, meta);
  preElem.textContent = (0, _addLineNumbers2.default)(loggingTextSansLineNumbers);
});

function createMetaObjForLogging(meta) {
  if ((0, _isEmpty2.default)(meta)) return '';
  if (meta.stack) meta.stack = meta.stack.split(/\r\n?|\n/);
  return (0, _stringifyObject2.default)(meta).replace(/'/g, '');
}function createLoggingSansLineNumbers(msg, meta) {
  const metaObj = createMetaObjForLogging(meta);
  let logString = `${loggingTextSansLineNumbers}${msg + metaObj}\n`;
  if (isDebugWindowOpeningMessage(msg)) {
    logString = blueLossEnabled ? `${logString}Please Wait...\n` : void 0;
  }return logString;
}function isDebugWindowOpeningMessage(msg) {
  return msg === 'Current BlueLoss settings:';
}function handleRendererWindowError(messageOrEvent, source, lineNumber, columnNumber, error) {
  _electron.ipcRenderer.send('debug-window-renderer:error-sent', { messageOrEvent, source, lineNumber, columnNumber, error: (0, _utils.omitInheritedProperties)(error) });
}window.onerror = handleRendererWindowError;
window.onunhandledrejection = handleRendererWindowError;

/***/ }),

/***/ "./node_modules/timeproxy/lib/constants.js":
/*!*************************************************!*\
  !*** ./node_modules/timeproxy/lib/constants.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var multipliers = exports.multipliers = {
    QUARTER: 1 / 4,
    QUARTERS: 1 / 4,
    THIRD: 1 / 3,
    THIRDS: 1 / 3,
    HALF: 1 / 2,
    HALVES: 1 / 2,
    A: 1,
    AN: 1,
    HUNDRED: 100,
    THOUSAND: 1000,
    MILLION: 1000000,
    BILLION: 1000000000
};

var numbers = exports.numbers = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    ELEVEN: 11,
    TWELVE: 12,
    THIRTEEN: 13,
    FOURTEEN: 14,
    FIFTEEN: 15,
    SIXTEEN: 16,
    SEVENTEEN: 17,
    EIGHTEEN: 18,
    NINETEEN: 19,
    TWENTY: 20,
    THIRTY: 30,
    FOURTY: 40,
    FIFTY: 50,
    SIXTY: 60,
    SEVENTY: 70,
    EIGHTY: 80,
    NINETY: 90
};

var units = exports.units = {
    MILLISECOND: 1,
    MILLISECONDS: 1,
    SECOND: 1000,
    SECONDS: 1000,
    MINUTE: 1000 * 60,
    MINUTES: 1000 * 60,
    HOUR: 1000 * 60 * 60,
    HOURS: 1000 * 60 * 60,
    DAY: 1000 * 60 * 60 * 24,
    DAYS: 1000 * 60 * 60 * 24,
    WEEK: 1000 * 60 * 60 * 24 * 7,
    WEEKS: 1000 * 60 * 60 * 24 * 7
};

/***/ }),

/***/ "./node_modules/timeproxy/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/timeproxy/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! ./constants */ "./node_modules/timeproxy/lib/constants.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = new Proxy(function () {}, {
    apply: function apply(a, b, args) {
        if (!args[0] || !args[0].raw) {
            return find.apply(undefined, _toConsumableArray(args));
        }
        return find(String.raw.apply(String, _toConsumableArray(args)));
    },
    get: function get(target, name) {
        return find(name);
    }
});


var isNumeric = function isNumeric(token) {
    return !isNaN(token);
};
var isNumber = function isNumber(token) {
    return _constants.numbers[token] !== undefined;
};
var isMultiplier = function isMultiplier(token) {
    return _constants.multipliers[token] !== undefined;
};
var isUnit = function isUnit(token) {
    return _constants.units[token] !== undefined;
};

function parse(token) {
    if (isNumeric(token)) {
        return { type: 'number', value: Number(token) };
    }
    if (isNumber(token)) {
        return { type: 'number', value: _constants.numbers[token] };
    }
    if (isMultiplier(token)) {
        return { type: 'multiplier', value: _constants.multipliers[token] };
    }
    if (isUnit(token)) {
        return { type: 'unit', value: _constants.units[token] };
    }
    throw new Error('Could not parse expression ' + token + '.');
}

function find(name) {
    if (!name) {
        return 0;
    }

    var isFuture = name.startsWith('IN');
    var isPast = name.endsWith('AGO');

    var terms = name.split(/[_\s\-]+/).map(function (term) {
        return term.toUpperCase();
    }).filter(function (term) {
        return !['IN', 'AGO', 'AND', 'OF'].includes(term);
    }).map(parse);

    var sum = 0;
    var partSum = 0;

    for (var i = 0; i < terms.length; i++) {
        var term = terms[i];

        switch (term.type) {
            case 'number':
                {
                    partSum += term.value;
                    break;
                }
            case 'multiplier':
                {
                    partSum = (partSum || 1) * term.value;
                    break;
                }
            case 'unit':
                {
                    sum = sum + partSum * term.value;
                    partSum = 0;
                    break;
                }
        }
    }

    sum += partSum;

    if (isFuture) {
        return Date.now() + sum;
    } else if (isPast) {
        return Date.now() - sum;
    }
    return sum;
}

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, productName, version, description, main, scripts, repository, author, license, dependencies, devDependencies, snyk, default */
/***/ (function(module) {

module.exports = {"name":"blueloss","productName":"BlueLoss","version":"0.2.3","description":"A desktop app that locks your computer when a device is lost","main":"app/main/appMain-compiled.js","scripts":{"webpackWatch":"cross-env NODE_ENV=development parallel-webpack --watch --max-retries=1 --no-stats","electronWatch":"cross-env NODE_ENV=development nodemon app/main/appMain-compiled.js --config nodemon.json","styleWatch":"cross-env NODE_ENV=development stylus -w app/settingsWindow/renderer/assets/styles/stylus/index.styl -o app/settingsWindow/renderer/assets/styles/css/settingsWindowCss-compiled.css","lintWatch":"cross-env NODE_ENV=development esw -w --ext .lsc -c .eslintrc.json --color --clear","debug":"cross-env NODE_ENV=development,nodeDebug=true parallel-webpack && sleepms 3000 && electron --inspect-brk app/main/appMain-compiled.js","start":"cross-env NODE_ENV=production electron app/main/appMain-compiled.js","devTasks":"cross-env NODE_ENV=production node devTasks/tasks.js","snyk-protect":"snyk protect","prepare":"npm run snyk-protect"},"repository":"https://github.com/Darkle/BlueLoss.git","author":"Darkle <coop.coding@gmail.com>","license":"MIT","dependencies":{"@hyperapp/logger":"^0.5.0","add-line-numbers":"^1.0.1","auto-launch":"^5.0.5","dotenv":"^5.0.1","electron-positioner":"^3.0.0","formbase":"^6.0.4","fs-jetpack":"^1.3.0","gawk":"^4.4.5","got":"^8.3.0","hyperapp":"^1.2.5","is-empty":"^1.2.0","lock-system":"^1.3.0","lodash.omit":"^4.5.0","lowdb":"^1.0.0","ono":"^4.0.5","rollbar":"^2.3.9","stringify-object":"^3.2.2","timeproxy":"^1.2.1","winston":"^2.4.1"},"devDependencies":{"@oigroup/babel-preset-lightscript":"^3.1.0-alpha.2","@oigroup/lightscript-eslint":"^3.1.0-alpha.2","babel-core":"^6.26.0","babel-eslint":"^8.2.3","babel-loader":"^7.1.4","babel-plugin-transform-react-jsx":"^6.24.1","babel-register":"^6.26.0","chalk":"^2.4.0","cross-env":"^5.1.4","del":"^3.0.0","devtron":"^1.4.0","electron":"^2.0.0-beta.8","electron-reload":"^1.2.2","electron-wix-msi":"^1.3.0","eslint":"=4.8.0","eslint-plugin-jsx":"0.0.2","eslint-plugin-react":"^7.7.0","eslint-watch":"^3.1.4","exeq":"^3.0.0","inquirer":"^5.2.0","node-7z":"^0.4.0","nodemon":"^1.17.3","parallel-webpack":"^2.3.0","semver":"^5.5.0","sleep-ms":"^2.0.1","snyk":"^1.71.0","stylus":"^0.54.5","webpack":"^4.6.0","webpack-node-externals":"^1.7.2"},"snyk":true};

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

/***/ "is-empty":
/*!***************************!*\
  !*** external "is-empty" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("is-empty");

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