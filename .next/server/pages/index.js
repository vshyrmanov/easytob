"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getStaticProps\": () => (/* binding */ getStaticProps)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst Home = ({ categories  })=>{\n    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        dispatch({\n            type: \"ADD_STORES\",\n            payload: categories\n        });\n    }, []);\n    console.log(categories);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Hello there!\"\n    }, void 0, false, {\n        fileName: \"/Users/viktor/Desktop/learnMe/easytobuy/pages/index.tsx\",\n        lineNumber: 12,\n        columnNumber: 4\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);\nasync function getStaticProps(context) {\n    const response = await fetch(\"https://arcane-falls-56249.herokuapp.com/store/getAll\");\n    const categories = await response.json();\n    return {\n        props: {\n            categories\n        }\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUF1QztBQUNjO0FBRXJELE1BQU1HLElBQUksR0FBRyxDQUFDLEVBQUNDLFVBQVUsR0FBQyxHQUFLO0lBQzlCLE1BQU1DLFFBQVEsR0FBR0gsd0RBQVcsRUFBRTtJQUM5QkQsZ0RBQVMsQ0FBQyxJQUFNO1FBQ2ZJLFFBQVEsQ0FBQztZQUFDQyxJQUFJLEVBQUUsWUFBWTtZQUFFQyxPQUFPLEVBQUVILFVBQVU7U0FBQyxDQUFDO0tBQ25ELEVBQUUsRUFBRSxDQUFDO0lBRU5JLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDTCxVQUFVLENBQUMsQ0FBQztJQUN4QixxQkFDRSw4REFBQ00sS0FBRztrQkFBQyxjQUVMOzs7OztpQkFBTSxDQUNOO0NBQ0Y7QUFFRCxpRUFBZVAsSUFBSSxFQUFDO0FBRWIsZUFBZVEsY0FBYyxDQUFDQyxPQUFPLEVBQUU7SUFDN0MsTUFBTUMsUUFBUSxHQUFHLE1BQU1DLEtBQUssQ0FBQyx1REFBdUQsQ0FBQztJQUNyRixNQUFNVixVQUFVLEdBQUcsTUFBTVMsUUFBUSxDQUFDRSxJQUFJLEVBQUU7SUFDeEMsT0FBTztRQUNOQyxLQUFLLEVBQUU7WUFBQ1osVUFBVTtTQUFDO0tBQ25CO0NBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lYXN5dG9idXkvLi9wYWdlcy9pbmRleC50c3g/MDdmZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHt1c2VFZmZlY3R9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7dXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yfSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcblxuY29uc3QgSG9tZSA9ICh7Y2F0ZWdvcmllc30pID0+IHtcblx0Y29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xuXHR1c2VFZmZlY3QoKCkgPT4ge1xuXHRcdGRpc3BhdGNoKHt0eXBlOiBcIkFERF9TVE9SRVNcIiwgcGF5bG9hZDogY2F0ZWdvcmllc30pXG5cdH0sIFtdKVxuXG5cdGNvbnNvbGUubG9nKGNhdGVnb3JpZXMpO1xuXHRyZXR1cm4gKFxuXHRcdFx0PGRpdj5cblx0XHRcdFx0SGVsbG8gdGhlcmUhXG5cdFx0XHQ8L2Rpdj5cblx0KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhvbWU7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdGF0aWNQcm9wcyhjb250ZXh0KSB7XG5cdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXJjYW5lLWZhbGxzLTU2MjQ5Lmhlcm9rdWFwcC5jb20vc3RvcmUvZ2V0QWxsJylcblx0Y29uc3QgY2F0ZWdvcmllcyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuXHRyZXR1cm4ge1xuXHRcdHByb3BzOiB7Y2F0ZWdvcmllc31cblx0fVxufSJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZURpc3BhdGNoIiwiSG9tZSIsImNhdGVnb3JpZXMiLCJkaXNwYXRjaCIsInR5cGUiLCJwYXlsb2FkIiwiY29uc29sZSIsImxvZyIsImRpdiIsImdldFN0YXRpY1Byb3BzIiwiY29udGV4dCIsInJlc3BvbnNlIiwiZmV0Y2giLCJqc29uIiwicHJvcHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.tsx"));
module.exports = __webpack_exports__;

})();