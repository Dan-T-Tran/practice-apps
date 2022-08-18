"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _WordEntry = _interopRequireDefault(require("./WordEntry.jsx"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RightBar = function RightBar(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    id: "rightBar",
    children: props.words.map(function (word, index) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WordEntry["default"], {
        word: word,
        index: index,
        clickedIndex: props.clickedIndex,
        setIndex: props.setIndex,
        update: props.update,
        "delete": props["delete"]
      }, index);
    })
  });
};

var _default = RightBar;
exports["default"] = _default;