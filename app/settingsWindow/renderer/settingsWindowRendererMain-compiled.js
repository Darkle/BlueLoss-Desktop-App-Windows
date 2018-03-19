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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/settingsWindow/renderer/settingsWindowRendererMain.lsc");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/common/renderers/utils.lsc":
/*!****************************************!*\
  !*** ./app/common/renderers/utils.lsc ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = exports.handleRendererWindowError = exports.getInitialSettingsFromMainProcess = undefined;

var _electron = __webpack_require__(/*! electron */ "electron");

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function identity(param) {
  return param;
}function getInitialSettingsFromMainProcess() {
  /**
  * When we get the remote.getGlobal, it has inherited stuff on it like getters and setters, so we cant
  * just use an object spread, we need to "sanitize" it with omitInheritedProperties.
  */
  return Object.assign({
    activeTab: 'statusTab',
    devicesCanSee: []
  }, omitInheritedProperties(_electron.remote.getGlobal('settingsWindowRendererInitialSettings')));
}

/**
* https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
* https://stackoverflow.com/a/43911292/2785644
*/
function handleRendererWindowError(messageOrEvent, source, lineNumber, columnNumber, error) {
  _electron.ipcRenderer.send('settings-renderer:error-sent', { messageOrEvent, source, lineNumber, columnNumber, error: omitInheritedProperties(error) });
}function omitInheritedProperties(obj) {
  return Object.getOwnPropertyNames(obj).reduce(function (prev, propName) {
    if (isObject(obj[propName])) {
      return Object.assign({}, prev, { [propName]: omitInheritedProperties(obj[propName]) });
    }return Object.assign({}, prev, { [propName]: obj[propName] });
  }, {});
}function isObject(obj) {
  return _lodash2.default.isObject(obj) && !_lodash2.default.isArray(obj) && !_lodash2.default.isFunction(obj) && !_lodash2.default.isRegExp(obj) && !_lodash2.default.isString(obj);
}exports.getInitialSettingsFromMainProcess = getInitialSettingsFromMainProcess;
exports.handleRendererWindowError = handleRendererWindowError;
exports.identity = identity;

/***/ }),

/***/ "./app/settingsWindow/renderer/actions/actionsIndex.lsc":
/*!**************************************************************!*\
  !*** ./app/settingsWindow/renderer/actions/actionsIndex.lsc ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _windowButtons = __webpack_require__(/*! ./windowButtons.lsc */ "./app/settingsWindow/renderer/actions/windowButtons.lsc");

var _toggleTab = __webpack_require__(/*! ./toggleTab.lsc */ "./app/settingsWindow/renderer/actions/toggleTab.lsc");

var _toggleTab2 = _interopRequireDefault(_toggleTab);

var _openLink = __webpack_require__(/*! ./openLink.lsc */ "./app/settingsWindow/renderer/actions/openLink.lsc");

var _openLink2 = _interopRequireDefault(_openLink);

var _animateDots = __webpack_require__(/*! ./animateDots.lsc */ "./app/settingsWindow/renderer/actions/animateDots.lsc");

var _animateDots2 = _interopRequireDefault(_animateDots);

var _updateSetting = __webpack_require__(/*! ./updateSetting.lsc */ "./app/settingsWindow/renderer/actions/updateSetting.lsc");

var _updateSetting2 = _interopRequireDefault(_updateSetting);

var _updateStateOnIpcMessage = __webpack_require__(/*! ./updateStateOnIpcMessage.lsc */ "./app/settingsWindow/renderer/actions/updateStateOnIpcMessage.lsc");

var _updateStateOnIpcMessage2 = _interopRequireDefault(_updateStateOnIpcMessage);

var _changeTrayIconColor = __webpack_require__(/*! ./changeTrayIconColor.lsc */ "./app/settingsWindow/renderer/actions/changeTrayIconColor.lsc");

var _changeTrayIconColor2 = _interopRequireDefault(_changeTrayIconColor);

var _removeDevice = __webpack_require__(/*! ./removeDevice.lsc */ "./app/settingsWindow/renderer/actions/removeDevice.lsc");

var _removeDevice2 = _interopRequireDefault(_removeDevice);

var _addNewDevice = __webpack_require__(/*! ./addNewDevice.lsc */ "./app/settingsWindow/renderer/actions/addNewDevice.lsc");

var _addNewDevice2 = _interopRequireDefault(_addNewDevice);

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
  addNewDevice: _addNewDevice2.default
};

/***/ }),

/***/ "./app/settingsWindow/renderer/actions/addNewDevice.lsc":
/*!**************************************************************!*\
  !*** ./app/settingsWindow/renderer/actions/addNewDevice.lsc ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(/*! electron */ "electron");

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* If you need to use the state & actions and return data, you need to use (value) => (state, actions)
* https://github.com/hyperapp/hyperapp#actions
*/
exports.default = function addNewDevice(newDevice) {
  return function (state) {
    var _ref;

    if (_lodash2.default.find(state.devicesToSearchFor, { deviceId: newDevice.deviceId })) return;
    _electron.ipcRenderer.send('renderer:device-added-in-ui', newDevice);
    return { devicesToSearchFor: [...(_ref = state.devicesToSearchFor, _ref === void 0 ? [] : _ref), ...[newDevice]] };
  };
};

/***/ }),

/***/ "./app/settingsWindow/renderer/actions/animateDots.lsc":
/*!*************************************************************!*\
  !*** ./app/settingsWindow/renderer/actions/animateDots.lsc ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// This is called from a lifecycle event, so the element is the thing thats passed in.
exports.default = function animateDots(element) {
  function animateStatusDots(interval = 0) {
    setTimeout(function () {
      element.classList.toggle('play');
      animateStatusDots(!element.classList.contains('play') ? 285 : 4200);
    }, interval);
  }animateStatusDots();
};

/***/ }),

/***/ "./app/settingsWindow/renderer/actions/changeTrayIconColor.lsc":
/*!*********************************************************************!*\
  !*** ./app/settingsWindow/renderer/actions/changeTrayIconColor.lsc ***!
  \*********************************************************************/
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

/***/ "./app/settingsWindow/renderer/actions/openLink.lsc":
/*!**********************************************************!*\
  !*** ./app/settingsWindow/renderer/actions/openLink.lsc ***!
  \**********************************************************/
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

/***/ "./app/settingsWindow/renderer/actions/removeDevice.lsc":
/*!**************************************************************!*\
  !*** ./app/settingsWindow/renderer/actions/removeDevice.lsc ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = __webpack_require__(/*! electron */ "electron");

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* If you need to use the state & actions and return data, you need to use (value) => (state, actions)
* https://github.com/hyperapp/hyperapp#actions
*/
exports.default = function removeDevice(deviceToRemove) {
  return function (state) {
    if (!_lodash2.default.find(state.devicesToSearchFor, { deviceId: deviceToRemove.deviceId })) return;
    _electron.ipcRenderer.send('renderer:device-removed-in-ui', deviceToRemove);
    return { devicesToSearchFor: [state.devicesToSearchFor.filter(function ({ deviceId }) {
        return deviceId !== deviceToRemove.deviceId;
      })] };
  };
};

/***/ }),

/***/ "./app/settingsWindow/renderer/actions/toggleTab.lsc":
/*!***********************************************************!*\
  !*** ./app/settingsWindow/renderer/actions/toggleTab.lsc ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

// This is called from a lifecycle event, so the element is the thing thats passed in.
exports.default = function toggleTab(event) {
  return { activeTab: event.currentTarget.id };
};

/***/ }),

/***/ "./app/settingsWindow/renderer/actions/updateSetting.lsc":
/*!***************************************************************!*\
  !*** ./app/settingsWindow/renderer/actions/updateSetting.lsc ***!
  \***************************************************************/
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

/***/ "./app/settingsWindow/renderer/actions/updateStateOnIpcMessage.lsc":
/*!*************************************************************************!*\
  !*** ./app/settingsWindow/renderer/actions/updateStateOnIpcMessage.lsc ***!
  \*************************************************************************/
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

/***/ "./app/settingsWindow/renderer/actions/windowButtons.lsc":
/*!***************************************************************!*\
  !*** ./app/settingsWindow/renderer/actions/windowButtons.lsc ***!
  \***************************************************************/
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

/***/ "./app/settingsWindow/renderer/components/deviceCard.lsc":
/*!***************************************************************!*\
  !*** ./app/settingsWindow/renderer/components/deviceCard.lsc ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

exports.default = function deviceCard({ lookingForDevice, deviceName, deviceId, actions }) {
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
          { "class": "deviceName" },
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

        // Lightscript if expressions FTW! http://bit.ly/2kNbt9R
        lookingForDevice ? (0, _hyperapp.h)(
          "x-button",
          {
            onclick: function () {
              actions.removeDevice({ deviceName, deviceId });
            }
          },
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
          {
            onclick: function () {
              actions.addNewDevice({ deviceName, deviceId });
            }
          },
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

/***/ "./app/settingsWindow/renderer/settingsWindowRendererMain.lsc":
/*!********************************************************************!*\
  !*** ./app/settingsWindow/renderer/settingsWindowRendererMain.lsc ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _electron = __webpack_require__(/*! electron */ "electron");

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

var _logger = __webpack_require__(/*! @hyperapp/logger */ "@hyperapp/logger");

var _utils = __webpack_require__(/*! ../../common/renderers/utils.lsc */ "./app/common/renderers/utils.lsc");

var _actionsIndex = __webpack_require__(/*! ./actions/actionsIndex.lsc */ "./app/settingsWindow/renderer/actions/actionsIndex.lsc");

var _actionsIndex2 = _interopRequireDefault(_actionsIndex);

var _viewsIndex = __webpack_require__(/*! ./views/viewsIndex.lsc */ "./app/settingsWindow/renderer/views/viewsIndex.lsc");

var _viewsIndex2 = _interopRequireDefault(_viewsIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line no-unused-vars
const logInDev =  true ? _logger.withLogger : undefined;

const settingsWindowRendererApp = logInDev(_hyperapp.app)((0, _utils.getInitialSettingsFromMainProcess)(), _actionsIndex2.default, _viewsIndex2.default, document.body);

_electron.ipcRenderer.on('mainprocess:blueloss-tray-enabled-disabled-toggled', function (event, newBlueLossEnabledvalue) {
  settingsWindowRendererApp == null ? void 0 : typeof settingsWindowRendererApp.updateStateOnIpcMessage !== 'function' ? void 0 : settingsWindowRendererApp.updateStateOnIpcMessage({ blueLossEnabled: newBlueLossEnabledvalue });
});
_electron.ipcRenderer.on('mainprocess:update-of-bluetooth-devices-can-see', function (event, devicesCanSee) {
  settingsWindowRendererApp == null ? void 0 : typeof settingsWindowRendererApp.updateStateOnIpcMessage !== 'function' ? void 0 : settingsWindowRendererApp.updateStateOnIpcMessage({ devicesCanSee });
});

window.onerror = _utils.handleRendererWindowError;

/***/ }),

/***/ "./app/settingsWindow/renderer/views/aboutInfoWindow.lsc":
/*!***************************************************************!*\
  !*** ./app/settingsWindow/renderer/views/aboutInfoWindow.lsc ***!
  \***************************************************************/
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

/***/ "./app/settingsWindow/renderer/views/aboutTab.lsc":
/*!********************************************************!*\
  !*** ./app/settingsWindow/renderer/views/aboutTab.lsc ***!
  \********************************************************/
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

/***/ "./app/settingsWindow/renderer/views/header.lsc":
/*!******************************************************!*\
  !*** ./app/settingsWindow/renderer/views/header.lsc ***!
  \******************************************************/
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

/***/ "./app/settingsWindow/renderer/views/helpTab.lsc":
/*!*******************************************************!*\
  !*** ./app/settingsWindow/renderer/views/helpTab.lsc ***!
  \*******************************************************/
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
    { "class": "tab", onclick: actions.openLink, id: "helpTab", "data-external-link": "https://github.com/Darkle/BlueLoss" },
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

/***/ "./app/settingsWindow/renderer/views/settingsInfoWindow.lsc":
/*!******************************************************************!*\
  !*** ./app/settingsWindow/renderer/views/settingsInfoWindow.lsc ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

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
          min: '1',
          onchange: function (event) {
            actions.updateSetting({ settingName: 'timeToLock', settingValue: event.currentTarget.value });
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
            'Any errors generated by the app will be sent to rollbar. This helps development of the app.'
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
              'Run On Startup'
            )
          )
        )
      )
    )
  );
};

/***/ }),

/***/ "./app/settingsWindow/renderer/views/settingsTab.lsc":
/*!***********************************************************!*\
  !*** ./app/settingsWindow/renderer/views/settingsTab.lsc ***!
  \***********************************************************/
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

/***/ "./app/settingsWindow/renderer/views/statusInfoWindow.lsc":
/*!****************************************************************!*\
  !*** ./app/settingsWindow/renderer/views/statusInfoWindow.lsc ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _deviceCard = __webpack_require__(/*! ../components/deviceCard.lsc */ "./app/settingsWindow/renderer/components/deviceCard.lsc");

var _deviceCard2 = _interopRequireDefault(_deviceCard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function ({ actions, state }) {
  const infoWindowDisplay = state.activeTab === 'statusTab' ? 'flex' : 'none';
  const statusAnimationVisibility = state.blueLossEnabled ? 'visible' : 'hidden';
  const blueLossStatusText = state.blueLossEnabled ? 'Enabled' : 'Disabled';
  const lookingForHeaderDisplay = state.devicesToSearchFor.length > 0 ? 'block' : 'none';

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
          id: 'bluelossenableswitch',
          toggled: state.blueLossEnabled,
          onchange: function (event) {
            actions.updateSetting({ settingName: 'blueLossEnabled', settingValue: event.currentTarget.toggled });
          }
        }),
        (0, _hyperapp.h)(
          'x-label',
          { 'for': 'bluelossenableswitch', id: 'bluelossenableswitch' },
          'Blueloss ',
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
      state.devicesToSearchFor.map(function ({ deviceName, deviceId }) {
        return (0, _hyperapp.h)(_deviceCard2.default, { key: deviceId, actions: actions, lookingForDevice: true, deviceName: deviceName, deviceId: deviceId });
      }),
      (0, _hyperapp.h)(
        'div',
        { id: 'deviceAddHeader' },
        'Devices To Add:'
      ),

      // Regular Array.includes compares by reference, not value, so using _.find.
      state.devicesCanSee.filter(function ({ deviceId }) {
        return !_lodash2.default.find(state.devicesToSearchFor, { deviceId });
      }).map(function ({ deviceName, deviceId }) {
        return (0, _hyperapp.h)(_deviceCard2.default, { key: deviceId, actions: actions, lookingForDevice: false, deviceName: deviceName, deviceId: deviceId });
      })
    ),
    (0, _hyperapp.h)('div', { id: 'devicesContainerBottomLip' })
  );
};

/***/ }),

/***/ "./app/settingsWindow/renderer/views/statusTab.lsc":
/*!*********************************************************!*\
  !*** ./app/settingsWindow/renderer/views/statusTab.lsc ***!
  \*********************************************************/
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
        { height: '24', viewbox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' },
        (0, _hyperapp.h)('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
        (0, _hyperapp.h)('path', { d: 'M14.24 12.01l2.32 2.32c.28-.72.44-1.51.44-2.33 0-.82-.16-1.59-.43-2.31l-2.33 2.32zm5.29-5.3l-1.26 1.26c.63 1.21.98 2.57.98 4.02s-.36 2.82-.98 4.02l1.2 1.2c.97-1.54 1.54-3.36 1.54-5.31-.01-1.89-.55-3.67-1.48-5.19zm-3.82 1L10 2H9v7.59L4.41 5 3 6.41 8.59 12 3 17.59 4.41 19 9 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM11 5.83l1.88 1.88L11 9.59V5.83zm1.88 10.46L11 18.17v-3.76l1.88 1.88z' })
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

/***/ "./app/settingsWindow/renderer/views/viewsIndex.lsc":
/*!**********************************************************!*\
  !*** ./app/settingsWindow/renderer/views/viewsIndex.lsc ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _hyperapp = __webpack_require__(/*! hyperapp */ "hyperapp");

var _header = __webpack_require__(/*! ../views/header.lsc */ "./app/settingsWindow/renderer/views/header.lsc");

var _header2 = _interopRequireDefault(_header);

var _aboutTab = __webpack_require__(/*! ../views/aboutTab.lsc */ "./app/settingsWindow/renderer/views/aboutTab.lsc");

var _aboutTab2 = _interopRequireDefault(_aboutTab);

var _helpTab = __webpack_require__(/*! ../views/helpTab.lsc */ "./app/settingsWindow/renderer/views/helpTab.lsc");

var _helpTab2 = _interopRequireDefault(_helpTab);

var _settingsTab = __webpack_require__(/*! ../views/settingsTab.lsc */ "./app/settingsWindow/renderer/views/settingsTab.lsc");

var _settingsTab2 = _interopRequireDefault(_settingsTab);

var _statusTab = __webpack_require__(/*! ../views/statusTab.lsc */ "./app/settingsWindow/renderer/views/statusTab.lsc");

var _statusTab2 = _interopRequireDefault(_statusTab);

var _statusInfoWindow = __webpack_require__(/*! ../views/statusInfoWindow.lsc */ "./app/settingsWindow/renderer/views/statusInfoWindow.lsc");

var _statusInfoWindow2 = _interopRequireDefault(_statusInfoWindow);

var _settingsInfoWindow = __webpack_require__(/*! ../views/settingsInfoWindow.lsc */ "./app/settingsWindow/renderer/views/settingsInfoWindow.lsc");

var _settingsInfoWindow2 = _interopRequireDefault(_settingsInfoWindow);

var _aboutInfoWindow = __webpack_require__(/*! ../views/aboutInfoWindow.lsc */ "./app/settingsWindow/renderer/views/aboutInfoWindow.lsc");

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

/***/ "@hyperapp/logger":
/*!***********************************!*\
  !*** external "@hyperapp/logger" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@hyperapp/logger");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "hyperapp":
/*!***************************!*\
  !*** external "hyperapp" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("hyperapp");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ })

/******/ });