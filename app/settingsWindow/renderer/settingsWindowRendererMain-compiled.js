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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("hyperapp");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),
/* 3 */
/***/ (function(module) {

module.exports = {"name":"blueloss","productName":"BlueLoss","version":"0.2.3","description":"A desktop app that locks your computer when a device is lost","main":"app/main/appMain-compiled.js","scripts":{"webpackWatch":"cross-env NODE_ENV=development parallel-webpack --watch --max-retries=1 --no-stats","electronWatch":"cross-env NODE_ENV=development nodemon app/main/appMain-compiled.js --config nodemon.json","styleWatch":"cross-env NODE_ENV=development stylus -w app/settingsWindow/renderer/assets/styles/stylus/index.styl -o app/settingsWindow/renderer/assets/styles/css/settingsWindowCss-compiled.css","lintWatch":"cross-env NODE_ENV=development esw -w --ext .lsc -c .eslintrc.json --color --clear","debug":"cross-env NODE_ENV=development nodeDebug=true parallel-webpack && sleepms 3000 && electron --inspect-brk app/main/appMain-compiled.js","start":"cross-env NODE_ENV=production electron app/main/appMain-compiled.js","devTasks":"cross-env NODE_ENV=production node devTasks/tasks.js","test":"snyk test","snyk-protect":"snyk protect","prepare":"npm run snyk-protect"},"repository":"https://github.com/Darkle/BlueLoss.git","author":"Darkle <coop.coding@gmail.com>","license":"MIT","dependencies":{"@hyperapp/logger":"^0.5.0","auto-launch":"^5.0.5","dotenv":"^5.0.1","electron-positioner":"^3.0.0","formbase":"^6.0.4","fs-jetpack":"^1.3.0","gawk":"^4.4.5","got":"^8.3.0","hyperapp":"^1.2.5","is-empty":"^1.2.0","lock-system":"^1.3.0","lodash.omit":"^4.5.0","lowdb":"^1.0.0","ono":"^4.0.5","rollbar":"^2.3.9","snyk":"^1.76.0","stringify-object":"^3.2.2","timeproxy":"^1.2.1","typa":"^0.1.18","winston":"^2.4.1"},"devDependencies":{"@oigroup/babel-preset-lightscript":"^3.1.0-alpha.2","@oigroup/lightscript-eslint":"^3.1.0-alpha.2","babel-core":"^6.26.0","babel-eslint":"^8.2.3","babel-loader":"^7.1.4","babel-plugin-transform-react-jsx":"^6.24.1","babel-register":"^6.26.0","chalk":"^2.4.1","cross-env":"^5.1.4","del":"^3.0.0","devtron":"^1.4.0","electron":"^2.0.1","electron-packager":"^12.0.1","electron-reload":"^1.2.2","electron-wix-msi":"^1.3.0","eslint":"=4.8.0","eslint-plugin-jsx":"0.0.2","eslint-plugin-react":"^7.8.2","eslint-watch":"^3.1.4","exeq":"^3.0.0","inquirer":"^5.2.0","node-7z":"^0.4.0","nodemon":"^1.17.3","parallel-webpack":"^2.3.0","semver":"^5.5.0","sleep-ms":"^2.0.1","stylus":"^0.54.5","webpack":"^4.8.3","webpack-node-externals":"^1.7.2"},"snyk":true};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("typa");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("timeproxy");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateLogTimeStamp = exports.recursivelyOmitObjProperties = exports.getProperAppVersion = exports.tenYearsFromNow = exports.identity = exports.compose = exports.range = exports.curryRight = exports.curry = exports.pipe = exports.noop = exports.omitInheritedProperties = exports.omitGawkFromSettings = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _timeproxy = __webpack_require__(5);

var _timeproxy2 = _interopRequireDefault(_timeproxy);

var _typa = __webpack_require__(4);

var _typa2 = _interopRequireDefault(_typa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * If you run Electron by pointing it to a js file that's not in the base parent directory with the
 * package.json it will report the Electron binary version rather than what's in your package.json.
 * https://github.com/electron/electron/issues/7085
 */
const appVersion = __webpack_require__(3).version;

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(1);

var _hyperapp = __webpack_require__(0);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultSettings = undefined;

var _types = __webpack_require__(2);

const defaultSettings = {
  blueLossEnabled: true,
  runOnStartup: true,
  trayIconColor: 'blue',
  devicesToSearchFor: {},
  timeToLock: 3,
  reportErrors: true,
  firstRun: true,
  settingsWindowPosition: null,
  dateLastCheckedForAppUpdate: Date.now(),
  skipUpdateVersion: '0'
};

exports.defaultSettings = defaultSettings;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

var _settingsDefaults = __webpack_require__(8);

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
        toggled: state.userDebug,
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

var _deviceCard = __webpack_require__(10);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(0);

var _header = __webpack_require__(16);

var _header2 = _interopRequireDefault(_header);

var _aboutTab = __webpack_require__(15);

var _aboutTab2 = _interopRequireDefault(_aboutTab);

var _helpTab = __webpack_require__(14);

var _helpTab2 = _interopRequireDefault(_helpTab);

var _settingsTab = __webpack_require__(13);

var _settingsTab2 = _interopRequireDefault(_settingsTab);

var _statusTab = __webpack_require__(12);

var _statusTab2 = _interopRequireDefault(_statusTab);

var _statusInfoWindow = __webpack_require__(11);

var _statusInfoWindow2 = _interopRequireDefault(_statusInfoWindow);

var _settingsInfoWindow = __webpack_require__(9);

var _settingsInfoWindow2 = _interopRequireDefault(_settingsInfoWindow);

var _aboutInfoWindow = __webpack_require__(7);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(1);

exports.default = function toggleDebugWindow(element) {
  const toggled = element.currentTarget.toggled;
  _electron.ipcRenderer.send('renderer:user-debug-toggled', toggled);
  return { userDebug: toggled };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _electron = __webpack_require__(1);

var _types = __webpack_require__(2);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(1);

var _types = __webpack_require__(2);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(1);

exports.default = function changeTrayIconColor(newTrayIconColor) {
  _electron.ipcRenderer.send('renderer:setting-updated-in-ui', 'trayIconColor', newTrayIconColor);
  return { trayIconColor: newTrayIconColor };
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function updateStateOnIpcMessage(newStateObjToMerge) {
  return newStateObjToMerge;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(1);

exports.default = function updateSetting({ settingName, settingValue }) {
  _electron.ipcRenderer.send('renderer:setting-updated-in-ui', settingName, settingValue);
  return { [settingName]: settingValue };
};

/***/ }),
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(1);

exports.default = function openLink(event) {
  event.preventDefault();
  _electron.shell.openExternal(event.currentTarget.dataset.externalLink);
};

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeSettingsWindow = exports.minimizeSettingsWindow = undefined;

var _electron = __webpack_require__(1);

const currentWindow = _electron.remote.getCurrentWindow();

function minimizeSettingsWindow() {
  currentWindow.minimize();
}function closeSettingsWindow() {
  currentWindow.close();
}exports.minimizeSettingsWindow = minimizeSettingsWindow;
exports.closeSettingsWindow = closeSettingsWindow;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _windowButtons = __webpack_require__(27);

var _toggleTab = __webpack_require__(26);

var _toggleTab2 = _interopRequireDefault(_toggleTab);

var _openLink = __webpack_require__(25);

var _openLink2 = _interopRequireDefault(_openLink);

var _animateDots = __webpack_require__(24);

var _animateDots2 = _interopRequireDefault(_animateDots);

var _updateSetting = __webpack_require__(23);

var _updateSetting2 = _interopRequireDefault(_updateSetting);

var _updateStateOnIpcMessage = __webpack_require__(22);

var _updateStateOnIpcMessage2 = _interopRequireDefault(_updateStateOnIpcMessage);

var _changeTrayIconColor = __webpack_require__(21);

var _changeTrayIconColor2 = _interopRequireDefault(_changeTrayIconColor);

var _removeDevice = __webpack_require__(20);

var _removeDevice2 = _interopRequireDefault(_removeDevice);

var _addNewDevice = __webpack_require__(19);

var _addNewDevice2 = _interopRequireDefault(_addNewDevice);

var _toggleDebugWindow = __webpack_require__(18);

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
/* 29 */
/***/ (function(module, exports) {

module.exports = require("@hyperapp/logger");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // eslint-disable-line no-unused-vars


var _electron = __webpack_require__(1);

var _hyperapp = __webpack_require__(0);

var _logger = __webpack_require__(29);

var _actionsIndex = __webpack_require__(28);

var _actionsIndex2 = _interopRequireDefault(_actionsIndex);

var _viewsIndex = __webpack_require__(17);

var _viewsIndex2 = _interopRequireDefault(_viewsIndex);

var _types = __webpack_require__(2);

var _utils = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logInDev =  false ? undefined : _utils.identity;
const settingsWindowRendererApp = logInDev(_hyperapp.app)(getInitialSettingsFromMainProcess(), _actionsIndex2.default, _viewsIndex2.default, document.body);
/**
 * Some settings (such as 'blueLossEnabled') can be changed from the main process, so listen
 * for them.
 */
_electron.ipcRenderer.on('mainprocess:setting-updated-in-main', function (event, setting) {
  settingsWindowRendererApp == null ? void 0 : typeof settingsWindowRendererApp.updateStateOnIpcMessage !== 'function' ? void 0 : settingsWindowRendererApp.updateStateOnIpcMessage(setting);
});
_electron.ipcRenderer.on('mainprocess:update-of-bluetooth-devices-can-see', function (event, devicesCanSee) {
  settingsWindowRendererApp == null ? void 0 : typeof settingsWindowRendererApp.updateStateOnIpcMessage !== 'function' ? void 0 : settingsWindowRendererApp.updateStateOnIpcMessage(devicesCanSee);
});
/**
* When we get the remote.getGlobal, it has inherited stuff on it like getters and setters, so we cant
* just use an object spread, we need to "sanitize" it with omitInheritedProperties.
*/
function getInitialSettingsFromMainProcess() {
  return _extends({
    activeTab: 'statusTab',
    devicesCanSee: [],
    userDebug: false
  }, (0, _utils.omitInheritedProperties)(_electron.remote.getGlobal('settingsWindowRendererInitialSettings')));
}

/**
* https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
* https://stackoverflow.com/a/43911292/2785644
*/
function handleRendererWindowError(messageOrEvent, source, lineNumber, columnNumber, error) {
  _electron.ipcRenderer.send('settings-renderer:error-sent', { messageOrEvent, source, lineNumber, columnNumber, error: (0, _utils.omitInheritedProperties)(error) });
}window.onerror = handleRendererWindowError;
window.onunhandledrejection = handleRendererWindowError;

/***/ })
/******/ ]);