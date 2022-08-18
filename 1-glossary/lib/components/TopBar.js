"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TopBar = function TopBar(props) {
  var start = props.clickedPage * 10 + 1;
  var end = start + 9 - props.remainder;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    id: "topBar",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
      children: "Glossary c:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("h3", {
      children: ["There are ", props.amount, " words so far!"]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("h3", {
      children: ["Currently showing words #", start, "-", end]
    })]
  });
};

var _default = TopBar;
exports["default"] = _default;