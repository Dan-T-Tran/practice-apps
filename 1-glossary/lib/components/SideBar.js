"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Input = _interopRequireDefault(require("./Input.jsx"));

var _Pages = _interopRequireDefault(require("./Pages.jsx"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SideBar = function SideBar(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: "sideBar",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Input["default"], {
      search: props.search,
      input: props.input
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      id: "pages",
      children: props.pages.map(function (page, index) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Pages["default"], {
          page: page,
          index: index,
          pageClick: props.pageClick
        }, index);
      })
    })]
  });
};

var _default = SideBar;
exports["default"] = _default;