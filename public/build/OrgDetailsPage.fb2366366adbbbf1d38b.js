(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["OrgDetailsPage"],{

/***/ "./public/app/features/org/OrgDetailsPage.tsx":
/*!****************************************************!*\
  !*** ./public/app/features/org/OrgDetailsPage.tsx ***!
  \****************************************************/
/*! exports provided: OrgDetailsPage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrgDetailsPage", function() { return OrgDetailsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _OrgProfile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./OrgProfile */ "./public/app/features/org/OrgProfile.tsx");
/* harmony import */ var app_core_components_SharedPreferences_SharedPreferences__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/SharedPreferences/SharedPreferences */ "./public/app/core/components/SharedPreferences/SharedPreferences.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/org/state/actions.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");









var OrgDetailsPage = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](OrgDetailsPage, _super);
    function OrgDetailsPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onOrgNameChange = function (name) {
            _this.props.setOrganizationName(name);
        };
        _this.onUpdateOrganization = function () {
            _this.props.updateOrganization();
        };
        return _this;
    }
    OrgDetailsPage.prototype.componentDidMount = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.loadOrganization()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OrgDetailsPage.prototype.render = function () {
        var _this = this;
        var _a = this.props, navModel = _a.navModel, organization = _a.organization;
        var isLoading = Object.keys(organization).length === 0;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, { isLoading: isLoading }, !isLoading && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_OrgProfile__WEBPACK_IMPORTED_MODULE_5__["default"], { onOrgNameChange: function (name) { return _this.onOrgNameChange(name); }, onSubmit: this.onUpdateOrganization, orgName: organization.name }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_SharedPreferences_SharedPreferences__WEBPACK_IMPORTED_MODULE_6__["default"], { resourceUri: "org" }))))));
    };
    return OrgDetailsPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {
        navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_8__["getNavModel"])(state.navIndex, 'org-settings'),
        organization: state.organization.organization,
    };
}
var mapDispatchToProps = {
    loadOrganization: _state_actions__WEBPACK_IMPORTED_MODULE_7__["loadOrganization"],
    setOrganizationName: _state_actions__WEBPACK_IMPORTED_MODULE_7__["setOrganizationName"],
    updateOrganization: _state_actions__WEBPACK_IMPORTED_MODULE_7__["updateOrganization"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(OrgDetailsPage)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/org/OrgProfile.tsx":
/*!************************************************!*\
  !*** ./public/app/features/org/OrgProfile.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");


var OrgProfile = function (_a) {
    var onSubmit = _a.onSubmit, onOrgNameChange = _a.onOrgNameChange, orgName = _a.orgName;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", { className: "page-sub-heading" }, "Organization profile"),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", { name: "orgForm", className: "gf-form-group", onSubmit: function (event) {
                event.preventDefault();
                onSubmit();
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form max-width-28" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", { className: "gf-form-label" }, "Organization name"),
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_1__["Input"], { className: "gf-form-input", type: "text", onChange: function (event) { return onOrgNameChange(event.target.value); }, value: orgName }))),
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "gf-form-button-row" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", { type: "submit", className: "btn btn-primary" }, "Save")))));
};
/* harmony default export */ __webpack_exports__["default"] = (OrgProfile);


/***/ })

}]);
//# sourceMappingURL=OrgDetailsPage.fb2366366adbbbf1d38b.js.map