"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WordEntry = /*#__PURE__*/function (_React$Component) {
  _inherits(WordEntry, _React$Component);

  var _super = _createSuper(WordEntry);

  function WordEntry(props) {
    var _this;

    _classCallCheck(this, WordEntry);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (query) {
      console.log(query.target);

      if (query.target.name === 'editWord') {
        _this.setState({
          editWord: query.target.value
        });
      } else {
        _this.setState({
          editDefinition: query.target.value
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function () {
      event.preventDefault();
      event.target.reset();

      _this.props.update(_this.props.word.word, _this.state.editWord, _this.state.editDefinition);

      _this.setState({
        editWord: '',
        editDefinition: ''
      });
    });

    _this.state = {
      editWord: '',
      editDefinition: ''
    };
    return _this;
  }

  _createClass(WordEntry, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "wordEntry",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          children: this.props.word.word
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          children: this.props.word.definition
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: function onClick() {
            _this2.props.setIndex(_this2.props.index);
          },
          children: "Edit"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          onClick: function onClick() {
            _this2.props["delete"](_this2.props.word.word);
          },
          children: "Delete"
        }), this.props.index === this.props.clickedIndex && /*#__PURE__*/(0, _jsxRuntime.jsxs)("form", {
          className: "editInput",
          onSubmit: this.handleSubmit,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "text",
            className: "editWordInput",
            name: "editWord",
            placeholder: "Edit the word",
            onChange: function onChange(e) {
              _this2.handleChange(e);
            },
            required: true
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
            type: "submit",
            className: "editSubmitButton",
            children: "Submit"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
            type: "text",
            className: "editDefinitionInput",
            name: "editDefinition",
            onChange: function onChange(e) {
              _this2.handleChange(e);
            },
            placeholder: "Edit the definition",
            required: true
          })]
        })]
      });
    }
  }]);

  return WordEntry;
}(_react["default"].Component);

var _default = WordEntry;
exports["default"] = _default;