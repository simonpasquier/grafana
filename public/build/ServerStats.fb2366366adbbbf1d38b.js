(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ServerStats"],{

/***/ "./public/app/features/admin/ServerStats.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/admin/ServerStats.tsx ***!
  \***************************************************/
/*! exports provided: ServerStats, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerStats", function() { return ServerStats; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var _state_apis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/apis */ "./public/app/features/admin/state/apis.ts");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");







var ServerStats = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ServerStats, _super);
    function ServerStats(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            stats: [],
            isLoading: false,
        };
        return _this;
    }
    ServerStats.prototype.componentDidMount = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var stats, error_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.setState({ isLoading: true });
                        return [4 /*yield*/, this.props.getServerStats()];
                    case 1:
                        stats = _a.sent();
                        this.setState({ stats: stats, isLoading: false });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServerStats.prototype.render = function () {
        var navModel = this.props.navModel;
        var _a = this.state, stats = _a.stats, isLoading = _a.isLoading;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_6__["default"].Contents, { isLoading: isLoading },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", { className: "filter-table form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Name"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Value"))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, stats.map(StatItem))))));
    };
    return ServerStats;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function StatItem(stat) {
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: stat.name },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, stat.name),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", null, stat.value)));
}
var mapStateToProps = function (state) { return ({
    navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_4__["getNavModel"])(state.navIndex, 'server-stats'),
    getServerStats: _state_apis__WEBPACK_IMPORTED_MODULE_5__["getServerStats"],
}); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps)(ServerStats)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=ServerStats.fb2366366adbbbf1d38b.js.map