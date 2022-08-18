"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _TopBar = _interopRequireDefault(require("./TopBar.jsx"));

var _SideBar = _interopRequireDefault(require("./SideBar.jsx"));

var _RightBar = _interopRequireDefault(require("./RightBar.jsx"));

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

var axios = require('axios');

var _ = require('underscore');

var App = /*#__PURE__*/function (_React$Component) {
  _inherits(App, _React$Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "searchWords", function (query) {
      var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      axios.get('/glossary', {
        params: {
          word: query,
          index: page
        }
      }).then(function (response) {
        if (response.data === 'error') {
          alert('Failed to get words');
        } else {
          var tempPages = [1];
          var tempPageIndex = 2;
          var amount = response.data.amount;

          while (amount >= 11) {
            tempPages.push(tempPageIndex);
            tempPageIndex++;
            amount -= 10;
          }

          console.log(response.data);

          _this.setState({
            words: response.data.documents,
            wordAmount: response.data.amount,
            currentSearch: query,
            clickedIndex: undefined,
            pages: tempPages,
            clickedPage: page,
            remainder: 10 - response.data.remainder
          });
        }
      })["catch"](function (err) {
        console.log(err);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "pageClick", function (page) {
      _this.searchWords(_this.state.currentSearch, page);
    });

    _defineProperty(_assertThisInitialized(_this), "insertWord", function (word, definition) {
      axios.post('/glossary', {
        word: word,
        definition: definition
      }).then(function (response) {
        if (response.data === 'error') {
          alert('Failed to insert word.');
        } else if (response.data === 'word already saved') {
          alert('Word already saved. Consider updating the word instead!');
        } else {
          _this.searchWords(_this.state.currentSearch);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "editClick", function (index) {
      if (index !== _this.state.clickedIndex) {
        _this.setState({
          clickedIndex: index
        });
      } else {
        _this.setState({
          clickedIndex: undefined
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "updateWord", function (originalWord, editWord, definition) {
      axios.put('/glossary', {
        originalWord: originalWord,
        editWord: editWord,
        definition: definition
      }).then(function (response) {
        if (response.data === 'error') {
          alert('Failed to update word');
        } else if (response.data === 'success') {
          _this.searchWords(_this.state.currentSearch);
        } else {
          alert("Tried to update word that isn't saved somehow.");
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "deleteWord", function (word) {
      axios["delete"]('/glossary', {
        params: {
          word: word
        }
      }).then(function (response) {
        if (response.data === 'error') {
          alert('Failed to delete word');
        } else if (response.data === 'success') {
          _this.searchWords(_this.state.currentSearch);
        } else {
          alert("Tried to delete word that isn't saved somehow.");
        }
      })["catch"](function (err) {
        console.log(err);
      });
    });

    _this.state = {
      words: [],
      wordAmount: 0,
      currentSearch: '',
      clickedIndex: undefined,
      pages: [],
      clickedPage: 0,
      remainder: 0
    }; // this.timeGate = false;

    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.searchWords('');
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        id: "app",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TopBar["default"], {
          amount: this.state.wordAmount,
          remainder: this.state.remainder,
          clickedPage: this.state.clickedPage
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SideBar["default"], {
          search: this.searchWords.bind(this),
          input: this.insertWord.bind(this),
          pages: this.state.pages,
          pageClick: this.pageClick.bind(this)
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_RightBar["default"], {
          words: this.state.words,
          clickedIndex: this.state.clickedIndex,
          setIndex: this.editClick.bind(this),
          update: this.updateWord.bind(this),
          "delete": this.deleteWord.bind(this)
        })]
      });
    }
  }]);

  return App;
}(_react["default"].Component);

;
var _default = App;
exports["default"] = _default;