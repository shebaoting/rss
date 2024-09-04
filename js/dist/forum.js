/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/forum/components/RssFeedList.js":
/*!*********************************************!*\
  !*** ./src/forum/components/RssFeedList.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RssFeedList)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_1__);


var RssFeedList = /*#__PURE__*/function (_Component) {
  function RssFeedList() {
    return _Component.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RssFeedList, _Component);
  var _proto = RssFeedList.prototype;
  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);
    this.feeds = [];
    this.loadFeeds();
  };
  _proto.loadFeeds = function loadFeeds() {
    var _this = this;
    app.request({
      method: 'GET',
      url: app.forum.attribute('apiUrl') + '/rss-items'
    }).then(function (feeds) {
      _this.feeds = feeds.data;
      m.redraw();
    });
  };
  _proto.view = function view() {
    return m("div", {
      className: "RssFeedList"
    }, m("div", {
      className: "DiscussionList"
    }, m("ul", {
      "class": "DiscussionList-discussions"
    }, this.feeds.map(function (feed) {
      return m("li", null, m("div", {
        "class": "DiscussionListItem"
      }, m("div", {
        className: "DiscussionListItem-content Slidable-content read"
      }, m("a", {
        href: feed.attributes.link,
        target: "_blank",
        className: "DiscussionListItem-main"
      }, m("h2", {
        "class": "DiscussionListItem-title"
      }, feed.attributes.title), m("ul", {
        "class": "DiscussionListItem-info"
      }, m("li", {
        "class": "item-tags"
      }, m("span", {
        "class": "TagsLabel"
      }, m("span", {
        "class": "TagLabel colored text-contrast--light TagLabel--child",
        style: "--tag-bg: #6b7eb7;"
      }, m("span", {
        "class": "TagLabel-text"
      }, m("i", {
        "class": "TagLabel-icon icon fas iconfont icon-php"
      }), m("span", {
        "class": "TagLabel-name"
      }, feed.attributes.site_name))))), m("li", {
        "class": "item-terminalPost"
      }, m("span", null, "\u53D1\u5E03\u4E8E ", m("time", null, feed.attributes.published_at))))))));
    }))));
  };
  return RssFeedList;
}((flarum_common_Component__WEBPACK_IMPORTED_MODULE_1___default()));


/***/ }),

/***/ "./src/forum/components/RssFeedPage.js":
/*!*********************************************!*\
  !*** ./src/forum/components/RssFeedPage.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RssFeedPage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Page */ "flarum/common/components/Page");
/* harmony import */ var flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/helpers/listItems */ "flarum/common/helpers/listItems");
/* harmony import */ var flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/components/IndexPage */ "flarum/forum/components/IndexPage");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _RssFeedList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RssFeedList */ "./src/forum/components/RssFeedList.js");






var RssFeedPage = /*#__PURE__*/function (_Page) {
  function RssFeedPage() {
    return _Page.apply(this, arguments) || this;
  }
  (0,_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RssFeedPage, _Page);
  var _proto = RssFeedPage.prototype;
  _proto.oninit = function oninit(vnode) {
    _Page.prototype.oninit.call(this, vnode);
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default().setTitle('RSS Aggregator'); // 设置页面标题
  };
  _proto.view = function view() {
    return m("div", {
      className: "IndexPage"
    }, flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4___default().prototype.hero(), " ", m("div", {
      className: "container"
    }, m("div", {
      className: "sideNavContainer"
    }, m("nav", {
      className: "IndexPage-nav sideNav"
    }, m("ul", null, flarum_common_helpers_listItems__WEBPACK_IMPORTED_MODULE_3___default()(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_4___default().prototype.sidebarItems().toArray())), " "), m("div", {
      className: "RssFeedListContent IndexPage-results sideNavOffset"
    }, m("div", {
      "class": "IndexPage-toolbar",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("ul", {
      "class": "IndexPage-toolbar-view",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("li", {
      "class": "item-sort",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("div", {
      "class": "ButtonGroup Dropdown dropdown  itemCount6",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("button", {
      "class": "Dropdown-toggle Button",
      "aria-haspopup": "menu",
      "aria-label": "\u66F4\u6539\u300C\u5168\u90E8\u4E3B\u9898\u300D\u6392\u5E8F",
      "data-toggle": "dropdown",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("span", {
      "class": "Button-label",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, "\u6700\u65B0\u56DE\u590D"), m("i", {
      "aria-hidden": "true",
      "class": "icon fas fa-caret-down Button-caret",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    })), m("ul", {
      "class": "Dropdown-menu dropdown-menu ",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("li", {
      "class": ""
    }, m("button", {
      "class": "hasIcon",
      type: "button",
      active: ""
    }, m("i", {
      "aria-hidden": "true",
      "class": "icon fas fa-check Button-icon"
    }), m("span", {
      "class": "Button-label"
    }, "\u6700\u65B0\u56DE\u590D"))), m("li", {
      "class": ""
    }, m("button", {
      "class": "hasIcon",
      type: "button"
    }, m("i", {
      "aria-hidden": "true",
      "class": "icon Button-icon"
    }), m("span", {
      "class": "Button-label"
    }, "\u70ED\u95E8\u4E3B\u9898"))), m("li", {
      "class": ""
    }, m("button", {
      "class": "hasIcon",
      type: "button"
    }, m("i", {
      "aria-hidden": "true",
      "class": "icon Button-icon"
    }), m("span", {
      "class": "Button-label"
    }, "\u65B0\u9C9C\u51FA\u7089"))), m("li", {
      "class": ""
    }, m("button", {
      "class": "hasIcon",
      type: "button"
    }, m("i", {
      "aria-hidden": "true",
      "class": "icon Button-icon"
    }), m("span", {
      "class": "Button-label"
    }, "\u9648\u5E74\u65E7\u8D34"))), m("li", {
      "class": ""
    }, m("button", {
      "class": "hasIcon",
      type: "button"
    }, m("i", {
      "aria-hidden": "true",
      "class": "icon Button-icon"
    }), m("span", {
      "class": "Button-label"
    }, "\u6700\u591A\u7FFB\u9605"))), m("li", {
      "class": ""
    }, m("button", {
      "class": "hasIcon",
      type: "button"
    }, m("i", {
      "aria-hidden": "true",
      "class": "icon Button-icon"
    }), m("span", {
      "class": "Button-label"
    }, "\u6700\u5C11\u7FFB\u9605")))))), m("li", {
      "class": "item-solved-filter",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("div", {
      "class": "ButtonGroup Dropdown dropdown  itemCount3",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("button", {
      "class": "Dropdown-toggle Button",
      "aria-haspopup": "menu",
      "aria-label": "\u5DF2\u89E3\u51B3/\u672A\u89E3\u51B3",
      "data-toggle": "dropdown",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("span", {
      "class": "Button-label",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, "\u5168\u90E8\u95EE\u9898"), m("i", {
      "aria-hidden": "true",
      "class": "icon fas fa-caret-down Button-caret",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    })), m("ul", {
      "class": "Dropdown-menu dropdown-menu ",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("li", {
      "class": ""
    }, m("button", {
      "class": "hasIcon",
      type: "button",
      active: ""
    }, m("i", {
      "aria-hidden": "true",
      "class": "icon fas fa-check Button-icon"
    }), m("span", {
      "class": "Button-label"
    }, "\u5168\u90E8\u95EE\u9898"))), m("li", {
      "class": ""
    }, m("button", {
      "class": "hasIcon",
      type: "button"
    }, m("i", {
      "aria-hidden": "true",
      "class": "icon Button-icon"
    }), m("span", {
      "class": "Button-label"
    }, "\u5DF2\u89E3\u51B3"))), m("li", {
      "class": ""
    }, m("button", {
      "class": "hasIcon",
      type: "button"
    }, m("i", {
      "aria-hidden": "true",
      "class": "icon Button-icon"
    }), m("span", {
      "class": "Button-label"
    }, "\u7B49\u5F85\u89E3\u51B3"))))))), m("ul", {
      "class": "IndexPage-toolbar-action",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("li", {
      "class": "item-refresh",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("button", {
      "class": "Button Button--icon hasIcon",
      type: "button",
      "aria-label": "\u5237\u65B0",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("i", {
      "aria-hidden": "true",
      "class": "icon fas fa-sync Button-icon",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }), m("span", {
      "class": "Button-label",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }))), m("li", {
      "class": "item-markAllAsRead",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("button", {
      "class": "Button Button--icon hasIcon",
      type: "button",
      "aria-label": "\u5168\u90E8\u5DF2\u8BFB",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }, m("i", {
      "aria-hidden": "true",
      "class": "icon fas fa-check Button-icon",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }), m("span", {
      "class": "Button-label",
      "data-immersive-translate-walked": "996bfd72-70eb-417c-bb6b-a44c582ca53f"
    }))))), m(_RssFeedList__WEBPACK_IMPORTED_MODULE_5__["default"], null), " "))));
  };
  return RssFeedPage;
}((flarum_common_components_Page__WEBPACK_IMPORTED_MODULE_2___default()));


/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/forum/components/IndexPage */ "flarum/forum/components/IndexPage");
/* harmony import */ var flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_RssFeedPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/RssFeedPage */ "./src/forum/components/RssFeedPage.js");




flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('shebaoting/rss', function () {
  // 添加 RSS 导航链接
  (0,flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__.extend)((flarum_forum_components_IndexPage__WEBPACK_IMPORTED_MODULE_2___default().prototype), 'navItems', function (items) {
    items.add('rss', m('a', {
      href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('rss.feed'),
      // 使用 Flarum 的路由系统
      onclick: function onclick(e) {
        e.preventDefault(); // 阻止默认行为
        m.route.set(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().route('rss.feed')); // 使用 Mithril 跳转到 RSS 页面
      },
      className: 'hasIcon' // 为链接添加类名
    }, [
    // 图标部分
    m('i', {
      className: 'icon fas fa-rss Button-icon',
      'aria-hidden': 'true'
    }),
    // 文本部分
    m('span', {
      className: 'Button-label'
    }, '独立博客')]), -10);
  });

  // 注册路由
  (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default().routes)['rss.feed'] = {
    path: '/rss',
    component: _components_RssFeedPage__WEBPACK_IMPORTED_MODULE_3__["default"] // 使用 RSS 页面组件
  };
  console.log('[shebaoting/rss] RSS Aggregator link added to the navbar!');
});

/***/ }),

/***/ "flarum/common/Component":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/Component']" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/Component'];

/***/ }),

/***/ "flarum/common/app":
/*!***************************************************!*\
  !*** external "flarum.core.compat['common/app']" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/app'];

/***/ }),

/***/ "flarum/common/components/Page":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/components/Page']" ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/components/Page'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/helpers/listItems":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/listItems']" ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['common/helpers/listItems'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/IndexPage":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/IndexPage']" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['forum/components/IndexPage'];

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
  !*** ./forum.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/common */ "./src/common/index.ts");
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=forum.js.map