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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__view__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_styl__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__style_styl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__style_styl__);




var uiGetButton = document.querySelector('#get-vin');
var uiVin = document.querySelector('#vin');
var uiYear = document.querySelector('#year');
var uiListItems = document.querySelector('#list-items');
var uiListFilterVariable = document.querySelector('#list-fliter-variable');
var uiListFilterValue = document.querySelector('#list-fliter-value');
var uiListSortVariable = document.querySelector('#list-sort-variable');
var uiListSortValue = document.querySelector('#list-sort-value');
var uiIndicator = document.querySelector('#indicator');

var filterVariable = '';
var filterValue = '';
var sortVariable = 0;
var sortValue = 0;
var currentVin = '';
var currentYear = '';
var checkYear = false;
var checkVin = false;

setInterval(function () {
	return uiIndicator.innerHTML = navigator.onLine ? '<span class="online"></div>' : '<span class="offline"></div>';
}, 1000);

var render = function render(data) {
	return Object(__WEBPACK_IMPORTED_MODULE_1__view__["b" /* renderList */])(uiListItems, data, filterValue, filterVariable, sortValue, sortVariable);
};
var renderErr = function renderErr(error) {
	return Object(__WEBPACK_IMPORTED_MODULE_1__view__["a" /* renderError */])(uiListItems, error);
};

var validate = function validate() {
	uiVin.classList.toggle('input--error', !checkVin && uiVin.value);
	uiYear.classList.toggle('input--error', !checkYear && uiYear.value);
	uiGetButton.disabled = !checkVin || !checkYear;
};

uiVin.oninput = function (event) {
	var value = event.target.value;
	if (value.length > 3) {
		Object(__WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */])(event.target.value, uiYear.value).then(function (data) {
			checkVin = data[1].ValueId !== '7' || data[1].ValueId !== '5';
			validate();
		});
	} else {
		checkVin = false;
		validate();
	}
};

uiYear.oninput = function (event) {
	var value = +event.target.value;
	var now = new Date().getFullYear();

	if (event.target.value.length === 4 && !isNaN(parseFloat(value)) && isFinite(value) && value <= now) {
		checkYear = true;
	} else {
		checkYear = false;
	}
	validate();
};

uiGetButton.onclick = function (event) {
	event.preventDefault();
	currentVin = uiVin.value;
	currentYear = uiYear.value;
	Object(__WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */])(currentVin, currentYear).then(render).catch(__WEBPACK_IMPORTED_MODULE_1__view__["a" /* renderError */]);
};

uiListFilterVariable.oninput = function (event) {
	filterVariable = event.target.value;
	Object(__WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */])(currentVin, currentYear).then(render).catch(__WEBPACK_IMPORTED_MODULE_1__view__["a" /* renderError */]);
};
uiListFilterValue.oninput = function (event) {
	filterValue = event.target.value;
	Object(__WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */])(currentVin, currentYear).then(render).catch(__WEBPACK_IMPORTED_MODULE_1__view__["a" /* renderError */]);
};

var sort = function sort(direct) {
	return direct > 0 ? -1 : ++direct;
};

var getSortClass = function getSortClass(direct) {
	switch (direct) {
		case -1:
			return 'down';
		case 1:
			return 'up';
		case 0:
			return '';
	}
};

uiListSortVariable.onclick = function (event) {
	sortValue = 0;
	sortVariable = sort(sortVariable);
	event.target.className = 'list_sort list_sort--' + getSortClass(sortVariable);
	uiListSortValue.className = 'list_sort';
	Object(__WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */])(currentVin, currentYear).then(render).catch(__WEBPACK_IMPORTED_MODULE_1__view__["a" /* renderError */]);
};

uiListSortValue.onclick = function (event) {
	sortVariable = 0;
	sortValue = sort(sortValue);
	event.target.className = 'list_sort list_sort--' + getSortClass(sortValue);
	uiListSortVariable.className = 'list_sort';
	Object(__WEBPACK_IMPORTED_MODULE_0__store__["a" /* default */])(currentVin, currentYear).then(render).catch(__WEBPACK_IMPORTED_MODULE_1__view__["a" /* renderError */]);
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var requests = {};

/* harmony default export */ __webpack_exports__["a"] = (function (vin, year) {
	return new Promise(function (resolve, reject) {
		var query = vin.toLowerCase() + '_' + year.toLowerCase();
		if (!query) return resolve();
		if (requests[query]) {
			return resolve(requests[query]);
		} else {
			if (navigator.onLine) {
				fetch('https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/' + vin + '?format=json&modelyear=' + year).then(function (response) {
					return response.json();
				}).then(function (data) {
					requests[query] = data.Results;
					resolve(requests[query]);
				}).catch(function (error) {
					return reject('Error, try again later.');
				});
			} else {
				reject('Please check your network connection.');
			}
		}
	});
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return renderError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return renderList; });
var renderError = function renderError(element, text) {
	return uiListItems.innerText = error;
};

var renderList = function renderList(element, list, filterValue, filterVariable, sortValue, sortVariable) {
	element.innerHTML = '';
	if (list && list.length) {
		var items = list.filter(function (item) {
			var Variable = item.Variable,
			    Value = item.Value;

			var checkVariable = void 0;
			var checkValue = void 0;
			checkVariable = !filterVariable || Variable && Variable.toLowerCase().indexOf(filterVariable.toLowerCase()) !== -1;
			checkValue = !filterValue || Value && Value.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
			return checkVariable && checkValue;
		}).sort(function (a, b) {
			var val1 = void 0;
			var val2 = void 0;
			var direction = void 0;
			if (sortVariable) {
				val1 = (a.Variable || '').toLowerCase();
				val2 = (b.Variable || '').toLowerCase();
				direction = sortVariable;
			} else if (sortValue) {
				val1 = (a.Value || '').toLowerCase();
				val2 = (b.Value || '').toLowerCase();
				direction = sortValue;
			} else return 1;

			if (val1 > val2) return 1 * direction;else if (val1 < val2) return -1 * direction;else return 1;
		});
		if (items && items.length) {
			items.forEach(function (item) {
				var uiItem = document.createElement('tr');
				var uiItemVariable = document.createElement('td');
				var uiItemValue = document.createElement('td');

				uiItemVariable.innerText = item.Variable;
				uiItemValue.innerText = item.Value;
				uiItem.appendChild(uiItemVariable);
				uiItem.appendChild(uiItemValue);
				element.appendChild(uiItem);
			});
		} else {
			element.innerHTML = '<tr><td colspan="2" class="list_empty">Please change filter to view</td></tr>';
		}
	} else {
		element.innerHTML = '<tr><td colspan="2" class="list_empty">empty list</td></tr>';
	}
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(7)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/stylus-loader/index.js!./style.styl", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/stylus-loader/index.js!./style.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "* {\n  margin: 0;\n}\nbody {\n  font-family: sans-serif;\n  color: #333;\n}\n.app {\n  margin: 0 auto;\n  width: 960px;\n}\n.form {\n  font-size: 0;\n}\n.form_vin {\n  margin-right: 16px;\n}\n.input {\n  vertical-align: top;\n  font-size: 16px;\n  height: 36px;\n  padding: 0 12px;\n  border: 1px solid #ccc;\n  border-radius: 3px;\n  outline: none;\n  box-sizing: border-box;\n}\n.input--error {\n  border-color: #f00;\n}\n.input--wide {\n  display: block;\n  width: 100%;\n}\n.input:focus {\n  background: #f8f8f8;\n}\n.button {\n  vertical-align: top;\n  height: 36px;\n  border: none;\n  font-size: 14px;\n  text-transform: uppercase;\n  padding: 0px 12px;\n  border-radius: 3px;\n  background: #008000;\n  color: #fff;\n  outline: none;\n  box-sizing: border-box;\n  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.24), 0 0 8px 0 rgba(0,0,0,0.12);\n  cursor: pointer;\n  transition: box-shadow 0.18s;\n  margin-left: 16px;\n}\n.button:active {\n  box-shadow: 0 0 8px 0 rgba(0,0,0,0.12);\n}\n.button:disabled {\n  background: #777;\n  cursor: default;\n}\n.form {\n  background: #ddd;\n  padding: 16px;\n}\n.list {\n  width: 100%;\n  background: #efefef;\n  margin: 0 0px;\n  border: none;\n}\n.list td,\n.list th {\n  margin: 0;\n  border: 0;\n  padding: 12px;\n}\n.list th {\n  padding: 6px 12px;\n  text-align: left;\n}\n.list_sort {\n  position: relative;\n  user-select: none;\n  cursor: pointer;\n}\n.list_sort:after {\n  content: ' ';\n  position: absolute;\n  top: 50%;\n  margin-left: 8px;\n  width: 0;\n  height: 0;\n  border: 6px solid transparent;\n}\n.list_sort--up:after {\n  transform: translateY(-80%);\n  border-bottom: 6px solid #333;\n}\n.list_sort--down:after {\n  transform: translateY(-30%);\n  border-top: 6px solid #333;\n}\n.list_items tr {\n  margin: 0;\n  border: 0;\n}\n.list_items tr:nth-child(2n) {\n  background: rgba(0,0,0,0.05);\n}\n.list_empty {\n  width: 100%;\n  text-align: center;\n  color: #999;\n}\n.online,\n.offline {\n  margin: 13px;\n  width: 10px;\n  height: 10px;\n  border-radius: 5px;\n  display: inline-block;\n  background: #008000;\n}\n.offline {\n  animation-name: blink;\n  animation-duration: 0.5s;\n  animation-timing-function: linear;\n  animation-iteration-count: infinite;\n  background: #f00;\n}\n@-moz-keyframes blink {\n  0% {\n    background: transparent;\n  }\n  50% {\n    background: #f00;\n  }\n  100% {\n    background: transparent;\n  }\n}\n@-webkit-keyframes blink {\n  0% {\n    background: transparent;\n  }\n  50% {\n    background: #f00;\n  }\n  100% {\n    background: transparent;\n  }\n}\n@-o-keyframes blink {\n  0% {\n    background: transparent;\n  }\n  50% {\n    background: #f00;\n  }\n  100% {\n    background: transparent;\n  }\n}\n@keyframes blink {\n  0% {\n    background: transparent;\n  }\n  50% {\n    background: #f00;\n  }\n  100% {\n    background: transparent;\n  }\n}\n", ""]);

// exports


/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjdhYjEwZTczMmNhM2IzYWRmOWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUuc3R5bD9hNDY4Iiwid2VicGFjazovLy8uL3NyYy9zdHlsZS5zdHlsIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyJdLCJuYW1lcyI6WyJ1aUdldEJ1dHRvbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInVpVmluIiwidWlZZWFyIiwidWlMaXN0SXRlbXMiLCJ1aUxpc3RGaWx0ZXJWYXJpYWJsZSIsInVpTGlzdEZpbHRlclZhbHVlIiwidWlMaXN0U29ydFZhcmlhYmxlIiwidWlMaXN0U29ydFZhbHVlIiwidWlJbmRpY2F0b3IiLCJmaWx0ZXJWYXJpYWJsZSIsImZpbHRlclZhbHVlIiwic29ydFZhcmlhYmxlIiwic29ydFZhbHVlIiwiY3VycmVudFZpbiIsImN1cnJlbnRZZWFyIiwiY2hlY2tZZWFyIiwiY2hlY2tWaW4iLCJzZXRJbnRlcnZhbCIsImlubmVySFRNTCIsIm5hdmlnYXRvciIsIm9uTGluZSIsInJlbmRlciIsInJlbmRlckxpc3QiLCJkYXRhIiwicmVuZGVyRXJyIiwicmVuZGVyRXJyb3IiLCJlcnJvciIsInZhbGlkYXRlIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwidmFsdWUiLCJkaXNhYmxlZCIsIm9uaW5wdXQiLCJldmVudCIsInRhcmdldCIsImxlbmd0aCIsInN0b3JlIiwidGhlbiIsIlZhbHVlSWQiLCJub3ciLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJpc05hTiIsInBhcnNlRmxvYXQiLCJpc0Zpbml0ZSIsIm9uY2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsImNhdGNoIiwic29ydCIsImRpcmVjdCIsImdldFNvcnRDbGFzcyIsImNsYXNzTmFtZSIsInJlcXVlc3RzIiwidmluIiwieWVhciIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicXVlcnkiLCJ0b0xvd2VyQ2FzZSIsImZldGNoIiwicmVzcG9uc2UiLCJqc29uIiwiUmVzdWx0cyIsImVsZW1lbnQiLCJ0ZXh0IiwiaW5uZXJUZXh0IiwibGlzdCIsIml0ZW1zIiwiZmlsdGVyIiwiVmFyaWFibGUiLCJpdGVtIiwiVmFsdWUiLCJjaGVja1ZhcmlhYmxlIiwiY2hlY2tWYWx1ZSIsImluZGV4T2YiLCJhIiwiYiIsInZhbDEiLCJ2YWwyIiwiZGlyZWN0aW9uIiwiZm9yRWFjaCIsInVpSXRlbSIsImNyZWF0ZUVsZW1lbnQiLCJ1aUl0ZW1WYXJpYWJsZSIsInVpSXRlbVZhbHVlIiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBOztBQUVBLElBQU1BLGNBQWNDLFNBQVNDLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBcEI7QUFDQSxJQUFNQyxRQUFR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Q0E7QUFDQTs7QUFFQSxnQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjOztBQUVkLGtEQUFrRCxzQkFBc0I7QUFDeEU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7O0FBRUEsNkJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM1V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVcsRUFBRTtBQUNyRCx3Q0FBd0MsV0FBVyxFQUFFOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHNDQUFzQztBQUN0QyxHQUFHO0FBQ0g7QUFDQSw4REFBOEQ7QUFDOUQ7O0FBRUE7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI3YWIxMGU3MzJjYTNiM2FkZjlhIiwiaW1wb3J0IHN0b3JlIGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHsgcmVuZGVyTGlzdCwgcmVuZGVyRXJyb3IgfSBmcm9tICcuL3ZpZXcnO1xuaW1wb3J0ICcuL3N0eWxlLnN0eWwnO1xuXG5jb25zdCB1aUdldEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNnZXQtdmluJyk7XG5jb25zdCB1aVZpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aW4nKTtcbmNvbnN0IHVpWWVhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN5ZWFyJyk7XG5jb25zdCB1aUxpc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0LWl0ZW1zJyk7XG5jb25zdCB1aUxpc3RGaWx0ZXJWYXJpYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0LWZsaXRlci12YXJpYWJsZScpO1xuY29uc3QgdWlMaXN0RmlsdGVyVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbGlzdC1mbGl0ZXItdmFsdWUnKTtcbmNvbnN0IHVpTGlzdFNvcnRWYXJpYWJsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0LXNvcnQtdmFyaWFibGUnKTtcbmNvbnN0IHVpTGlzdFNvcnRWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsaXN0LXNvcnQtdmFsdWUnKTtcbmNvbnN0IHVpSW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luZGljYXRvcicpO1xuXG5sZXQgZmlsdGVyVmFyaWFibGUgPSAnJztcbmxldCBmaWx0ZXJWYWx1ZSA9ICcnO1xubGV0IHNvcnRWYXJpYWJsZSA9IDA7XG5sZXQgc29ydFZhbHVlID0gMDtcbmxldCBjdXJyZW50VmluID0gJyc7XG5sZXQgY3VycmVudFllYXIgPSAnJztcbmxldCBjaGVja1llYXIgPSBmYWxzZTtcbmxldCBjaGVja1ZpbiA9IGZhbHNlO1xuXG5cbnNldEludGVydmFsKCgpID0+IHVpSW5kaWNhdG9yLmlubmVySFRNTCA9IG5hdmlnYXRvci5vbkxpbmUgPyAnPHNwYW4gY2xhc3M9XCJvbmxpbmVcIj48L2Rpdj4nIDogJzxzcGFuIGNsYXNzPVwib2ZmbGluZVwiPjwvZGl2PicsIDEwMDApO1xuXG5jb25zdCByZW5kZXIgPSBkYXRhID0+IHJlbmRlckxpc3QodWlMaXN0SXRlbXMsIGRhdGEsIGZpbHRlclZhbHVlLCBmaWx0ZXJWYXJpYWJsZSwgc29ydFZhbHVlLCBzb3J0VmFyaWFibGUpO1xuY29uc3QgcmVuZGVyRXJyID0gZXJyb3IgPT4gcmVuZGVyRXJyb3IodWlMaXN0SXRlbXMsIGVycm9yKTtcblxuY29uc3QgdmFsaWRhdGUgPSAoKSA9PiB7XG5cdHVpVmluLmNsYXNzTGlzdC50b2dnbGUoJ2lucHV0LS1lcnJvcicsICFjaGVja1ZpbiAmJiB1aVZpbi52YWx1ZSk7XG5cdHVpWWVhci5jbGFzc0xpc3QudG9nZ2xlKCdpbnB1dC0tZXJyb3InLCAhY2hlY2tZZWFyICYmIHVpWWVhci52YWx1ZSk7XG5cdHVpR2V0QnV0dG9uLmRpc2FibGVkID0gIWNoZWNrVmluIHx8ICFjaGVja1llYXI7XG59O1xuXG51aVZpbi5vbmlucHV0ID0gKGV2ZW50KSA9PiB7XG5cdGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuXHRpZiAodmFsdWUubGVuZ3RoID4gMykge1xuXHRcdHN0b3JlKGV2ZW50LnRhcmdldC52YWx1ZSwgdWlZZWFyLnZhbHVlKVxuXHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0Y2hlY2tWaW4gPSBkYXRhWzFdLlZhbHVlSWQgIT09ICc3JyB8fCBkYXRhWzFdLlZhbHVlSWQgIT09ICc1Jztcblx0XHRcdFx0dmFsaWRhdGUoKTtcblx0XHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdGNoZWNrVmluID0gZmFsc2U7XG5cdFx0dmFsaWRhdGUoKTtcblx0fVxufVxuXG51aVllYXIub25pbnB1dCA9IChldmVudCkgPT4ge1xuXHRjb25zdCB2YWx1ZSA9ICtldmVudC50YXJnZXQudmFsdWU7XG5cdGxldCBub3cgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cblx0aWYgKGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPT09IDQgJiYgIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSkgJiYgdmFsdWUgPD0gbm93ICkge1xuXHRcdGNoZWNrWWVhciA9IHRydWU7XG5cdH0gZWxzZSB7XG5cdFx0Y2hlY2tZZWFyID0gZmFsc2U7XG5cdH1cblx0dmFsaWRhdGUoKTtcbn1cblxudWlHZXRCdXR0b24ub25jbGljayA9IChldmVudCkgPT4ge1xuXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRjdXJyZW50VmluID0gdWlWaW4udmFsdWU7XG5cdGN1cnJlbnRZZWFyID0gdWlZZWFyLnZhbHVlO1xuXHRzdG9yZShjdXJyZW50VmluLCBjdXJyZW50WWVhcikudGhlbihyZW5kZXIpLmNhdGNoKHJlbmRlckVycm9yKTtcbn1cblxudWlMaXN0RmlsdGVyVmFyaWFibGUub25pbnB1dCA9IChldmVudCkgPT4ge1xuXHRmaWx0ZXJWYXJpYWJsZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblx0c3RvcmUoY3VycmVudFZpbiwgY3VycmVudFllYXIpLnRoZW4ocmVuZGVyKS5jYXRjaChyZW5kZXJFcnJvcik7XG59O1xudWlMaXN0RmlsdGVyVmFsdWUub25pbnB1dCA9IChldmVudCkgPT4ge1xuXHRmaWx0ZXJWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcblx0c3RvcmUoY3VycmVudFZpbiwgY3VycmVudFllYXIpLnRoZW4ocmVuZGVyKS5jYXRjaChyZW5kZXJFcnJvcik7XG59O1xuXG5jb25zdCBzb3J0ID0gZGlyZWN0ID0+IGRpcmVjdCA+IDAgPyAtMSA6ICsrZGlyZWN0O1xuXG5jb25zdCBnZXRTb3J0Q2xhc3MgPSAoZGlyZWN0KSA9PiB7XG5cdHN3aXRjaCAoZGlyZWN0KSB7XG5cdFx0Y2FzZSAtMTogcmV0dXJuICdkb3duJztcblx0XHRjYXNlIDE6IHJldHVybiAndXAnO1xuXHRcdGNhc2UgMDogcmV0dXJuICcnO1xuXHR9XG59XG5cbnVpTGlzdFNvcnRWYXJpYWJsZS5vbmNsaWNrID0gKGV2ZW50KSA9PiB7XG5cdHNvcnRWYWx1ZSA9IDA7XG5cdHNvcnRWYXJpYWJsZSA9IHNvcnQoc29ydFZhcmlhYmxlKTtcblx0ZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9IGBsaXN0X3NvcnQgbGlzdF9zb3J0LS0ke2dldFNvcnRDbGFzcyhzb3J0VmFyaWFibGUpfWA7XG5cdHVpTGlzdFNvcnRWYWx1ZS5jbGFzc05hbWUgPSBgbGlzdF9zb3J0YDtcblx0c3RvcmUoY3VycmVudFZpbiwgY3VycmVudFllYXIpLnRoZW4ocmVuZGVyKS5jYXRjaChyZW5kZXJFcnJvcik7XG59O1xuXG51aUxpc3RTb3J0VmFsdWUub25jbGljayA9IChldmVudCkgPT4ge1xuXHRzb3J0VmFyaWFibGUgPSAwO1xuXHRzb3J0VmFsdWUgPSBzb3J0KHNvcnRWYWx1ZSk7XG5cdGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPSBgbGlzdF9zb3J0IGxpc3Rfc29ydC0tJHtnZXRTb3J0Q2xhc3Moc29ydFZhbHVlKX1gO1xuXHR1aUxpc3RTb3J0VmFyaWFibGUuY2xhc3NOYW1lID0gYGxpc3Rfc29ydGA7XG5cdHN0b3JlKGN1cnJlbnRWaW4sIGN1cnJlbnRZZWFyKS50aGVuKHJlbmRlcikuY2F0Y2gocmVuZGVyRXJyb3IpO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC5qcyIsImNvbnN0IHJlcXVlc3RzID0ge307XG5cbmV4cG9ydCBkZWZhdWx0ICh2aW4sIHllYXIpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0Y29uc3QgcXVlcnkgPSB2aW4udG9Mb3dlckNhc2UoKSArICdfJyArIHllYXIudG9Mb3dlckNhc2UoKTtcblx0aWYgKCFxdWVyeSkgcmV0dXJuIHJlc29sdmUoKTtcblx0aWYgKHJlcXVlc3RzW3F1ZXJ5XSkge1xuXHRcdHJldHVybiByZXNvbHZlKHJlcXVlc3RzW3F1ZXJ5XSk7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKG5hdmlnYXRvci5vbkxpbmUpIHtcblx0XHRcdGZldGNoKGBodHRwczovL3ZwaWMubmh0c2EuZG90Lmdvdi9hcGkvdmVoaWNsZXMvZGVjb2RldmluLyR7dmlufT9mb3JtYXQ9anNvbiZtb2RlbHllYXI9JHt5ZWFyfWApXG5cdFx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcblx0XHRcdFx0LnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdFx0XHRyZXF1ZXN0c1txdWVyeV0gPSBkYXRhLlJlc3VsdHM7XG5cdFx0XHRcdFx0cmVzb2x2ZShyZXF1ZXN0c1txdWVyeV0pO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goZXJyb3IgPT4gcmVqZWN0KCdFcnJvciwgdHJ5IGFnYWluIGxhdGVyLicpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVqZWN0KCdQbGVhc2UgY2hlY2sgeW91ciBuZXR3b3JrIGNvbm5lY3Rpb24uJyk7XG5cdFx0fVxuXHR9XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zdG9yZS5qcyIsImV4cG9ydCBjb25zdCByZW5kZXJFcnJvciA9IChlbGVtZW50LCB0ZXh0KSA9PiB1aUxpc3RJdGVtcy5pbm5lclRleHQgPSBlcnJvcjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckxpc3QgPSAoZWxlbWVudCwgbGlzdCwgZmlsdGVyVmFsdWUsIGZpbHRlclZhcmlhYmxlLCBzb3J0VmFsdWUsIHNvcnRWYXJpYWJsZSkgPT4ge1xuXHRlbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXHRpZiAobGlzdCAmJiBsaXN0Lmxlbmd0aCkge1xuXHRcdGNvbnN0IGl0ZW1zID0gbGlzdFxuXHRcdFx0LmZpbHRlcihpdGVtID0+IHtcblx0XHRcdFx0Y29uc3QgeyBWYXJpYWJsZSwgVmFsdWUgfSA9IGl0ZW07XG5cdFx0XHRcdGxldCBjaGVja1ZhcmlhYmxlXG5cdFx0XHRcdGxldCBjaGVja1ZhbHVlO1xuXHRcdFx0XHRjaGVja1ZhcmlhYmxlID0gIWZpbHRlclZhcmlhYmxlIHx8IChWYXJpYWJsZSAmJiBWYXJpYWJsZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoZmlsdGVyVmFyaWFibGUudG9Mb3dlckNhc2UoKSkgIT09IC0xKTtcblx0XHRcdFx0Y2hlY2tWYWx1ZSA9ICFmaWx0ZXJWYWx1ZSB8fCAoVmFsdWUgJiYgVmFsdWUudG9Mb3dlckNhc2UoKS5pbmRleE9mKGZpbHRlclZhbHVlLnRvTG93ZXJDYXNlKCkpICE9PSAtMSk7XG5cdFx0XHRcdHJldHVybiBjaGVja1ZhcmlhYmxlICYmIGNoZWNrVmFsdWU7XG5cdFx0XHR9KVxuXHRcdFx0LnNvcnQoKGEsIGIpID0+IHtcblx0XHRcdFx0bGV0IHZhbDE7XG5cdFx0XHRcdGxldCB2YWwyO1xuXHRcdFx0XHRsZXQgZGlyZWN0aW9uO1xuXHRcdFx0XHRpZiAoc29ydFZhcmlhYmxlKSB7XG5cdFx0XHRcdFx0dmFsMSA9IChhLlZhcmlhYmxlIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdHZhbDIgPSAoYi5WYXJpYWJsZSB8fCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRkaXJlY3Rpb24gPSBzb3J0VmFyaWFibGU7XG5cdFx0XHRcdH0gZWxzZSBpZiAoc29ydFZhbHVlKSB7XG5cdFx0XHRcdFx0dmFsMSA9IChhLlZhbHVlIHx8ICcnKS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0XHRcdHZhbDIgPSAoYi5WYWx1ZSB8fCAnJykudG9Mb3dlckNhc2UoKTtcblx0XHRcdFx0XHRkaXJlY3Rpb24gPSBzb3J0VmFsdWU7XG5cdFx0XHRcdH0gZWxzZSByZXR1cm4gMTtcblxuXHRcdFx0XHRpZiAodmFsMSA+IHZhbDIpIHJldHVybiAxICogZGlyZWN0aW9uO1xuXHRcdFx0XHRlbHNlIGlmICh2YWwxIDwgdmFsMikgcmV0dXJuIC0xICogZGlyZWN0aW9uO1xuXHRcdFx0XHRlbHNlIHJldHVybiAxO1xuXG5cdFx0XHR9KTtcblx0XHRcdGlmIChpdGVtcyAmJiBpdGVtcy5sZW5ndGgpIHtcblx0XHRcdFx0aXRlbXMuZm9yRWFjaChpdGVtID0+IHtcblx0XHRcdFx0XHRjb25zdCB1aUl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuXHRcdFx0XHRcdGNvbnN0IHVpSXRlbVZhcmlhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcblx0XHRcdFx0XHRjb25zdCB1aUl0ZW1WYWx1ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG5cblx0XHRcdFx0XHR1aUl0ZW1WYXJpYWJsZS5pbm5lclRleHQgPSBpdGVtLlZhcmlhYmxlO1xuXHRcdFx0XHRcdHVpSXRlbVZhbHVlLmlubmVyVGV4dCA9IGl0ZW0uVmFsdWU7XG5cdFx0XHRcdFx0dWlJdGVtLmFwcGVuZENoaWxkKHVpSXRlbVZhcmlhYmxlKTtcblx0XHRcdFx0XHR1aUl0ZW0uYXBwZW5kQ2hpbGQodWlJdGVtVmFsdWUpXG5cdFx0XHRcdFx0ZWxlbWVudC5hcHBlbmRDaGlsZCh1aUl0ZW0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGVsZW1lbnQuaW5uZXJIVE1MID0gJzx0cj48dGQgY29sc3Bhbj1cIjJcIiBjbGFzcz1cImxpc3RfZW1wdHlcIj5QbGVhc2UgY2hhbmdlIGZpbHRlciB0byB2aWV3PC90ZD48L3RyPic7XG5cdFx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0ZWxlbWVudC5pbm5lckhUTUwgPSAnPHRyPjx0ZCBjb2xzcGFuPVwiMlwiIGNsYXNzPVwibGlzdF9lbXB0eVwiPmVtcHR5IGxpc3Q8L3RkPjwvdHI+Jztcblx0fVxufVxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdmlldy5qcyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLi9ub2RlX21vZHVsZXMvc3R5bHVzLWxvYWRlci9pbmRleC5qcyEuL3N0eWxlLnN0eWxcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIFByZXBhcmUgY3NzVHJhbnNmb3JtYXRpb25cbnZhciB0cmFuc2Zvcm07XG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4uL25vZGVfbW9kdWxlcy9zdHlsdXMtbG9hZGVyL2luZGV4LmpzIS4vc3R5bGUuc3R5bFwiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi4vbm9kZV9tb2R1bGVzL3N0eWx1cy1sb2FkZXIvaW5kZXguanMhLi9zdHlsZS5zdHlsXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdHlsZS5zdHlsXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikodW5kZWZpbmVkKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xcbiAgY29sb3I6ICMzMzM7XFxufVxcbi5hcHAge1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICB3aWR0aDogOTYwcHg7XFxufVxcbi5mb3JtIHtcXG4gIGZvbnQtc2l6ZTogMDtcXG59XFxuLmZvcm1fdmluIHtcXG4gIG1hcmdpbi1yaWdodDogMTZweDtcXG59XFxuLmlucHV0IHtcXG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBoZWlnaHQ6IDM2cHg7XFxuICBwYWRkaW5nOiAwIDEycHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgb3V0bGluZTogbm9uZTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5pbnB1dC0tZXJyb3Ige1xcbiAgYm9yZGVyLWNvbG9yOiAjZjAwO1xcbn1cXG4uaW5wdXQtLXdpZGUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuLmlucHV0OmZvY3VzIHtcXG4gIGJhY2tncm91bmQ6ICNmOGY4Zjg7XFxufVxcbi5idXR0b24ge1xcbiAgdmVydGljYWwtYWxpZ246IHRvcDtcXG4gIGhlaWdodDogMzZweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGZvbnQtc2l6ZTogMTRweDtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBwYWRkaW5nOiAwcHggMTJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIGJhY2tncm91bmQ6ICMwMDgwMDA7XFxuICBjb2xvcjogI2ZmZjtcXG4gIG91dGxpbmU6IG5vbmU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm94LXNoYWRvdzogMCAxcHggMnB4IDAgcmdiYSgwLDAsMCwwLjI0KSwgMCAwIDhweCAwIHJnYmEoMCwwLDAsMC4xMik7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDAuMThzO1xcbiAgbWFyZ2luLWxlZnQ6IDE2cHg7XFxufVxcbi5idXR0b246YWN0aXZlIHtcXG4gIGJveC1zaGFkb3c6IDAgMCA4cHggMCByZ2JhKDAsMCwwLDAuMTIpO1xcbn1cXG4uYnV0dG9uOmRpc2FibGVkIHtcXG4gIGJhY2tncm91bmQ6ICM3Nzc7XFxuICBjdXJzb3I6IGRlZmF1bHQ7XFxufVxcbi5mb3JtIHtcXG4gIGJhY2tncm91bmQ6ICNkZGQ7XFxuICBwYWRkaW5nOiAxNnB4O1xcbn1cXG4ubGlzdCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQ6ICNlZmVmZWY7XFxuICBtYXJnaW46IDAgMHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbn1cXG4ubGlzdCB0ZCxcXG4ubGlzdCB0aCB7XFxuICBtYXJnaW46IDA7XFxuICBib3JkZXI6IDA7XFxuICBwYWRkaW5nOiAxMnB4O1xcbn1cXG4ubGlzdCB0aCB7XFxuICBwYWRkaW5nOiA2cHggMTJweDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcbi5saXN0X3NvcnQge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5saXN0X3NvcnQ6YWZ0ZXIge1xcbiAgY29udGVudDogJyAnO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiA1MCU7XFxuICBtYXJnaW4tbGVmdDogOHB4O1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxuICBib3JkZXI6IDZweCBzb2xpZCB0cmFuc3BhcmVudDtcXG59XFxuLmxpc3Rfc29ydC0tdXA6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC04MCUpO1xcbiAgYm9yZGVyLWJvdHRvbTogNnB4IHNvbGlkICMzMzM7XFxufVxcbi5saXN0X3NvcnQtLWRvd246YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zMCUpO1xcbiAgYm9yZGVyLXRvcDogNnB4IHNvbGlkICMzMzM7XFxufVxcbi5saXN0X2l0ZW1zIHRyIHtcXG4gIG1hcmdpbjogMDtcXG4gIGJvcmRlcjogMDtcXG59XFxuLmxpc3RfaXRlbXMgdHI6bnRoLWNoaWxkKDJuKSB7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMDUpO1xcbn1cXG4ubGlzdF9lbXB0eSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjOTk5O1xcbn1cXG4ub25saW5lLFxcbi5vZmZsaW5lIHtcXG4gIG1hcmdpbjogMTNweDtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgaGVpZ2h0OiAxMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgYmFja2dyb3VuZDogIzAwODAwMDtcXG59XFxuLm9mZmxpbmUge1xcbiAgYW5pbWF0aW9uLW5hbWU6IGJsaW5rO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjVzO1xcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogbGluZWFyO1xcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XFxuICBiYWNrZ3JvdW5kOiAjZjAwO1xcbn1cXG5ALW1vei1rZXlmcmFtZXMgYmxpbmsge1xcbiAgMCUge1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIH1cXG4gIDUwJSB7XFxuICAgIGJhY2tncm91bmQ6ICNmMDA7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICB9XFxufVxcbkAtd2Via2l0LWtleWZyYW1lcyBibGluayB7XFxuICAwJSB7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgfVxcbiAgNTAlIHtcXG4gICAgYmFja2dyb3VuZDogI2YwMDtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIH1cXG59XFxuQC1vLWtleWZyYW1lcyBibGluayB7XFxuICAwJSB7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgfVxcbiAgNTAlIHtcXG4gICAgYmFja2dyb3VuZDogI2YwMDtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIH1cXG59XFxuQGtleWZyYW1lcyBibGluayB7XFxuICAwJSB7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgfVxcbiAgNTAlIHtcXG4gICAgYmFja2dyb3VuZDogI2YwMDtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIH1cXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlciEuL25vZGVfbW9kdWxlcy9zdHlsdXMtbG9hZGVyIS4vc3JjL3N0eWxlLnN0eWxcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vW3NlbGVjdG9yXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0dmFyIHN0eWxlVGFyZ2V0ID0gZm4uY2FsbCh0aGlzLCBzZWxlY3Rvcik7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1tzZWxlY3Rvcl0gPSBzdHlsZVRhcmdldDtcblx0XHR9XG5cdFx0cmV0dXJuIG1lbW9bc2VsZWN0b3JdXG5cdH07XG59KShmdW5jdGlvbiAodGFyZ2V0KSB7XG5cdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcbn0pO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50byArIFwiIFwiICsgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRvcHRpb25zLmF0dHJzLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZSAob2JqLCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZSwgdXBkYXRlLCByZW1vdmUsIHJlc3VsdDtcblxuXHQvLyBJZiBhIHRyYW5zZm9ybSBmdW5jdGlvbiB3YXMgZGVmaW5lZCwgcnVuIGl0IG9uIHRoZSBjc3Ncblx0aWYgKG9wdGlvbnMudHJhbnNmb3JtICYmIG9iai5jc3MpIHtcblx0ICAgIHJlc3VsdCA9IG9wdGlvbnMudHJhbnNmb3JtKG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC8pL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL3VybHMuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==