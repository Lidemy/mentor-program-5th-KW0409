/* eslint-disable */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var commentPlugin;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/W13_hw2_JS_board_api_func.js":
/*!******************************************!*\
  !*** ./src/W13_hw2_JS_board_api_func.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getCommentsAPI\": () => (/* binding */ getCommentsAPI),\n/* harmony export */   \"addCommentAPI\": () => (/* binding */ addCommentAPI)\n/* harmony export */ });\n\n// 串接 get_comments API 的 function\nfunction getCommentsAPI(apiURL, webKey, cursor, cb) {\n  let reqURL = `${apiURL}/W13_hw2_JS_board_api_get_comments.php?web_key=${webKey}`\n\n  if (cursor) {\n    reqURL = `${apiURL}/W13_hw2_JS_board_api_get_comments.php?web_key=${webKey}&cursor=${cursor}`\n  }\n\n  $.ajax({\n    type: 'GET',\n    url: reqURL,\n    success: (resp) => {\n      // 如果沒有設定 dataType(Server 回傳的資料類型)，則 jQuery 會自動判斷\n      // 若判斷為 json 格式，則 jQuery 會自動解析成 js 的 obj 格式\n      if (!resp.status) {\n        alert(resp.message)\n        return\n      }\n\n      const commentsArr = resp.comments\n      cb(commentsArr, webKey)\n    },\n    error: (err) => {\n      alert('error')\n      console.log(err)\n    }\n  })\n}\n\n// 新增 comment 的 api_function\nfunction addCommentAPI(apiURL, commentData, cb) {\n  $.ajax({\n    method: 'POST',\n    url: `${apiURL}/W13_hw2_JS_board_api_add_comment.php`,\n    // jquery 的 data{} 格式會自動做 escape 所以不用另外做，不然 post 的資料反而會變得奇怪\n    // 如果 data 中的 key 有包含 -(dash, ex: web-key) 就一定要用字串包起來，不然可以不用字串包起來\n    data: commentData,\n    dataType: 'text'\n    // data參數是用來設定 Server 回傳的資料格式，如果 resp 是 json 格式，則 jquery 會自動解析成 js 的 obj 格式\n  })\n    .done((resp) => {\n      let data\n      try {\n        // 若 sql 語法正確時\n        data = JSON.parse(resp)\n        if (!data.status) {\n          alert(data.message)\n          return\n        }\n\n        $('input').val('')\n        $('textarea').val('')\n        cb(commentData, true, commentData.web_key)\n      } catch (err) {\n        // 若 sql 語法錯誤時\n        console.log('error: ', resp)\n        console.log('error: ', err)\n      }\n    })\n    .fail((resp) => {\n      console.log('connect error: ', resp)\n    })\n}\n\n\n//# sourceURL=webpack://commentPlugin/./src/W13_hw2_JS_board_api_func.js?");

/***/ }),

/***/ "./src/W13_hw2_JS_board_index.js":
/*!***************************************!*\
  !*** ./src/W13_hw2_JS_board_index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _W13_hw2_JS_board_api_func__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./W13_hw2_JS_board_api_func */ \"./src/W13_hw2_JS_board_api_func.js\");\n/* harmony import */ var _W13_hw2_JS_board_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./W13_hw2_JS_board_utils */ \"./src/W13_hw2_JS_board_utils.js\");\n/* harmony import */ var _W13_hw2_JS_board_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./W13_hw2_JS_board_templates */ \"./src/W13_hw2_JS_board_templates.js\");\n\n\n\n\n\n// 初始化留言板 plugin 的 function\nfunction init(options) {\n  // 當整個檔案只有一個導出時，eslint 會要求必須用 export default 來導出\n  // 且匯入 default export 時，不可用解構的語法來 import(把 {} 拿掉即可)\n  // 詳情可見 https://www.lowerfish.com/2018/08/28/what-is-the-benefit-of-prefer-default-export/\n  let webKey = ''\n  let apiURL = ''\n  let containerElement = null\n  // 上面三個變數宣告要放 function 裡面是為了避免同時 init 兩個留言板時，會有只抓到後呼叫的留言板的情況\n\n  webKey = options.webKey\n  apiURL = options.apiURL\n  containerElement = $(options.containerSelector)\n  containerElement.append((0,_W13_hw2_JS_board_templates__WEBPACK_IMPORTED_MODULE_2__.getFormTemplate)(webKey))\n\n  // 取得 comments\n  ;(0,_W13_hw2_JS_board_api_func__WEBPACK_IMPORTED_MODULE_0__.getCommentsAPI)(apiURL, webKey, null, _W13_hw2_JS_board_utils__WEBPACK_IMPORTED_MODULE_1__.getComments)\n\n  // 載入更多 comments 的功能\n  $(`.${webKey}-read__more-btn`).click(() => {\n    const cursor = $(`.${webKey}-read__more-btn`).attr('comment__id')\n    ;(0,_W13_hw2_JS_board_api_func__WEBPACK_IMPORTED_MODULE_0__.getCommentsAPI)(apiURL, webKey, cursor, _W13_hw2_JS_board_utils__WEBPACK_IMPORTED_MODULE_1__.getComments)\n  })\n\n  // 新增 comment\n  $(`form.${webKey}-form`).submit((e) => {\n    e.preventDefault()\n    const nicknameValue = $(`form.${webKey}-form input.${webKey}`).val()\n    const contentValue = $(`form.${webKey}-form textarea.${webKey}`).val()\n    const currentDateTime = (0,_W13_hw2_JS_board_utils__WEBPACK_IMPORTED_MODULE_1__.getCurrentDateTime)()\n    const commentData = {\n      web_key: webKey,\n      nickname: nicknameValue,\n      content: contentValue,\n      created_at: currentDateTime\n    }\n\n    ;(0,_W13_hw2_JS_board_api_func__WEBPACK_IMPORTED_MODULE_0__.addCommentAPI)(apiURL, commentData, _W13_hw2_JS_board_utils__WEBPACK_IMPORTED_MODULE_1__.appendComments)\n  })\n}\n\n\n//# sourceURL=webpack://commentPlugin/./src/W13_hw2_JS_board_index.js?");

/***/ }),

/***/ "./src/W13_hw2_JS_board_templates.js":
/*!*******************************************!*\
  !*** ./src/W13_hw2_JS_board_templates.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getFormTemplate\": () => (/* binding */ getFormTemplate),\n/* harmony export */   \"encodeHTML\": () => (/* binding */ encodeHTML),\n/* harmony export */   \"commentTemplate\": () => (/* binding */ commentTemplate)\n/* harmony export */ });\n\n// 嵌入整個留言板的 form template function\nfunction getFormTemplate(webKey) {\n  return `\n  <form class=\"${webKey}-form shadow p-3 mb-5 bg-body rounded\">\n    <div class=\"form-floating mb-3\">\n      <input type=\"text\" class=\"${webKey} form-control\" id=\"${webKey}-form__nickname\" placeholder=\"請輸入暱稱\">\n      <label for=\"${webKey}-form__nickname\" class=\"text-black-50\">暱稱</label>\n    </div>\n    <div class=\"form-floating\">\n      <textarea class=\"${webKey} form-control\" placeholder=\"請輸入留言內容\" id=\"${webKey}-form__textarea\" style=\"height: 200px\"></textarea>\n      <label for=\"${webKey}-form__textarea\" class=\"text-black-50\">留言內容</label>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary mt-3\">送出</button>\n  </form>\n  \n  <div class=\"${webKey}-comments__area mt-5\">\n  </div>\n  \n  <div class=\"d-grid gap-2 mx-auto col-10 mt-5 mb-5\">\n    <button class=\"${webKey}-read__more-btn btn btn-primary\" type=\"button\">載入更多</button>\n  </div>`\n}\n\n// escape function\nfunction encodeHTML(str) {\n  return str\n    .replace(/&/g, '&amp;')\n    .replace(/\"/g, '&quot;')\n    .replace(/'/g, '&#39;')\n    .replace(/</g, '&lt;')\n    .replace(/>/g, '&gt;')\n    .replace(/\\//g, '&#x2F')\n}\n\n// 留言內容的 template card\nfunction commentTemplate(commentData) {\n  return `\n    <div class=\"shadow p-3 mb-3 bg-body rounded\">\n      <div class=\"nickname fs-5 badge bg-secondary text-wrap text-break mb-3\">\n        ${encodeHTML(commentData.nickname)}\n      </div>\n      <p class=\"text-body\" style=\"white-space: pre-line\">\n        ${encodeHTML(commentData.content)}\n      </p>\n      <div class=\"time d-flex flex-row-reverse text-black-50\">\n        ${encodeHTML(commentData.created_at)}\n      </div>\n    </div>`\n}\n\n\n//# sourceURL=webpack://commentPlugin/./src/W13_hw2_JS_board_templates.js?");

/***/ }),

/***/ "./src/W13_hw2_JS_board_utils.js":
/*!***************************************!*\
  !*** ./src/W13_hw2_JS_board_utils.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"appendComments\": () => (/* binding */ appendComments),\n/* harmony export */   \"getComments\": () => (/* binding */ getComments),\n/* harmony export */   \"getCurrentDateTime\": () => (/* binding */ getCurrentDateTime)\n/* harmony export */ });\n/* harmony import */ var _W13_hw2_JS_board_templates__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./W13_hw2_JS_board_templates */ \"./src/W13_hw2_JS_board_templates.js\");\n\n\n\n// 嵌入 comments 的 function\nfunction appendComments(commentData, isPrepend, webKey) {\n  const commentItem = (0,_W13_hw2_JS_board_templates__WEBPACK_IMPORTED_MODULE_0__.commentTemplate)(commentData)\n\n  if (isPrepend) {\n    $(`.${webKey}-comments__area`).prepend(commentItem)\n  } else {\n    $(`.${webKey}-comments__area`).append(commentItem)\n  }\n}\n\n// 處理取得的 comments 的 function\nfunction getComments(commentsArr, webKey) {\n  const { length } = commentsArr // 也可寫成 length = commentsArr.length\n  if (length < 6) {\n    for (let i = 0; i < length; i++) {\n      const comment = commentsArr[i]\n      appendComments(comment, null, webKey)\n    }\n    $(`.${webKey}-read__more-btn`).addClass('d-none')\n  } else {\n    for (let i = 0; i < length - 1; i++) {\n      const comment = commentsArr[i]\n      appendComments(comment, null, webKey)\n    }\n    const newCursor = commentsArr[length - 2].id\n    $(`.${webKey}-read__more-btn`).attr('comment__id', newCursor)\n  }\n}\n\n// 取得現在時間的 function\nfunction getCurrentDateTime() {\n  const today = new Date()\n  const Year = today.getFullYear()\n  const Month = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : (`0${(today.getMonth() + 1)}`)\n  const Day = (today.getDate()) >= 10 ? (today.getDate()) : (`0${today.getDate()}`)\n  const Hours = (today.getHours()) >= 10 ? (today.getHours()) : (`0${today.getHours()}`)\n  const Minutes = (today.getMinutes()) >= 10 ? (today.getMinutes()) : (`0${today.getMinutes()}`)\n  const Seconds = (today.getSeconds()) >= 10 ? (today.getSeconds()) : (`0${today.getSeconds()}`)\n  const currentDateTime = `${Year}-${Month}-${Day} ${Hours}:${Minutes}:${Seconds}`\n\n  return currentDateTime\n}\n\n\n//# sourceURL=webpack://commentPlugin/./src/W13_hw2_JS_board_utils.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/W13_hw2_JS_board_index.js");
/******/ 	commentPlugin = __webpack_exports__;
/******/ 	
/******/ })()
;