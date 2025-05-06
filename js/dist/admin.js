/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/components/RssSettingsPage.js":
/*!*************************************************!*\
  !*** ./src/admin/components/RssSettingsPage.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RssSettingsPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/admin/components/ExtensionPage */ "flarum/admin/components/ExtensionPage");
/* harmony import */ var flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Switch */ "flarum/common/components/Switch");
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/utils/withAttr */ "flarum/common/utils/withAttr");
/* harmony import */ var flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_6__);







var RssSettingsPage = /*#__PURE__*/function (_ExtensionPage) {
  function RssSettingsPage() {
    return _ExtensionPage.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RssSettingsPage, _ExtensionPage);
  var _proto = RssSettingsPage.prototype;
  _proto.oninit = function oninit(vnode) {
    var _this = this;
    _ExtensionPage.prototype.oninit.call(this, vnode);
    this.loadingFeeds = true; // 加载状态

    flarum_admin_app__WEBPACK_IMPORTED_MODULE_6___default().store.find('rss-feeds').then(function (feeds) {
      _this.loadingFeeds = false;
      m.redraw();
    });
  };
  _proto.content = function content() {
    var _this2 = this;
    var rssFeeds = flarum_admin_app__WEBPACK_IMPORTED_MODULE_6___default().store.all('rss-feeds'); // 获取所有 RSS 站点

    return m("div", {
      className: "container RssFeed-container"
    }, m("h2", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('shebaoting-rss.admin.page.title')), this.loadingFeeds ? m((flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_5___default()), null) : m("table", {
      className: "Table RssFeedTable"
    }, ' ', m("thead", null, m("tr", null, m("th", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('shebaoting-rss.admin.page.heading.title')), m("th", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('shebaoting-rss.admin.page.heading.url')), m("th", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('shebaoting-rss.admin.page.heading.status')), m("th", null, flarum_admin_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('shebaoting-rss.admin.page.heading.actions')))), m("tbody", null, rssFeeds.map(function (feed) {
      return m("tr", {
        key: feed.id()
      }, m("td", null, m("td", null, m("input", {
        className: "FormControl",
        type: "text",
        value: feed.title(),
        oninput: flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_4___default()('value', function (value) {
          return feed.pushAttributes({
            title: value
          });
        }) // 只更新本地值
        ,
        onblur: flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_4___default()('value', function (value) {
          return _this2.updateFeed(feed, 'title', value);
        }) // 失去焦点时发送请求
      }))), m("td", null, m("input", {
        className: "FormControl",
        type: "text",
        value: feed.url(),
        oninput: flarum_common_utils_withAttr__WEBPACK_IMPORTED_MODULE_4___default()('value', function (value) {
          return _this2.updateFeed(feed, 'url', value);
        })
      })), m("td", {
        "class": "status"
      }, flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_3___default().component({
        state: feed.status() === 'approved',
        onchange: function onchange() {
          return _this2.toggleApproval(feed);
        }
      })), m("td", null, flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default().component({
        className: 'Button Button--danger',
        icon: 'fas fa-trash',
        onclick: function onclick() {
          return _this2.deleteFeed(feed);
        }
      }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_6___default().translator.trans('shebaoting-rss.admin.page.delete'))));
    }))));
  };
  _proto.toggleApproval = function toggleApproval(feed) {
    var newStatus = feed.status() === 'approved' ? 'pending' : 'approved';
    feed.save({
      status: newStatus
    });
  };
  _proto.updateFeed = function updateFeed(feed, attribute, value) {
    var _feed$save;
    feed.save((_feed$save = {}, _feed$save[attribute] = value, _feed$save), {
      method: 'PATCH'
    }) // 使用 PATCH 请求来更新
    .then(function () {
      console.log('Feed updated successfully');
    })["catch"](function (error) {
      console.error('Error updating feed:', error);
    });
  };
  _proto.deleteFeed = function deleteFeed(feed) {
    feed["delete"]({
      method: 'DELETE'
    }).then(function () {
      return m.redraw();
    }); // 使用 DELETE 方法
  };
  return RssSettingsPage;
}((flarum_admin_components_ExtensionPage__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _models_RssFeed__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/RssFeed */ "./src/admin/models/RssFeed.js");
/* harmony import */ var _components_RssSettingsPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/RssSettingsPage */ "./src/admin/components/RssSettingsPage.js");

 // 导入 RSS Feed 模型
 // 导入设置页面组件

flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('shebaoting-rss', function () {
  // 使用 'rss-feeds' 来注册模型
  (flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().store).models['rss-feeds'] = _models_RssFeed__WEBPACK_IMPORTED_MODULE_1__["default"];
  flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]('shebaoting-rss').registerPage(_components_RssSettingsPage__WEBPACK_IMPORTED_MODULE_2__["default"]); // 注册设置页面
});

/***/ }),

/***/ "./src/admin/models/RssFeed.js":
/*!*************************************!*\
  !*** ./src/admin/models/RssFeed.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RssFeed)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);


var RssFeed = /*#__PURE__*/function (_Model) {
  function RssFeed() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.id = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('id');
    // 确保 id 属性正确解析
    _this.title = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('title');
    _this.url = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('url');
    _this.status = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('status');
    _this.userId = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('user_id');
    _this.createdAt = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default().attribute('created_at');
    return _this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RssFeed, _Model);
  return RssFeed;
}((flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/common/index.ts":
/*!*****************************!*\
  !*** ./src/common/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/app */ "flarum/common/app");
/* harmony import */ var flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_common_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('shebaoting/rss', function () {
  console.log('[shebaoting/rss] Hello, forum and admin!');
});

/***/ }),

/***/ "flarum/admin/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['admin/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/app'];

/***/ }),

/***/ "flarum/admin/components/ExtensionPage":
/*!***********************************************************************!*\
  !*** external "flarum.core.compat['admin/components/ExtensionPage']" ***!
  \***********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/components/ExtensionPage'];

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Switch":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Switch']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Switch'];

/***/ }),

/***/ "flarum/common/utils/withAttr":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['common/utils/withAttr']" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/utils/withAttr'];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inheritsLoose)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, o);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./admin.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map