(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["exampleApp"],{

/***/ "./public/app/plugins/app/example-app/ExampleRootPage.tsx":
/*!****************************************************************!*\
  !*** ./public/app/plugins/app/example-app/ExampleRootPage.tsx ***!
  \****************************************************************/
/*! exports provided: ExampleRootPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExampleRootPage", function() { return ExampleRootPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Libraries

var TAB_ID_A = 'A';
var TAB_ID_B = 'B';
var TAB_ID_C = 'C';
var ExampleRootPage = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ExampleRootPage, _super);
    function ExampleRootPage(props) {
        return _super.call(this, props) || this;
    }
    ExampleRootPage.prototype.componentDidMount = function () {
        this.updateNav();
    };
    ExampleRootPage.prototype.componentDidUpdate = function (prevProps) {
        if (this.props.query !== prevProps.query) {
            if (this.props.query.tab !== prevProps.query.tab) {
                this.updateNav();
            }
        }
    };
    ExampleRootPage.prototype.updateNav = function () {
        var e_1, _a;
        var _b = this.props, path = _b.path, onNavChanged = _b.onNavChanged, query = _b.query, meta = _b.meta;
        var tabs = [];
        tabs.push({
            text: 'Tab A',
            icon: 'fa fa-fw fa-file-text-o',
            url: path + '?tab=' + TAB_ID_A,
            id: TAB_ID_A,
        });
        tabs.push({
            text: 'Tab B',
            icon: 'fa fa-fw fa-file-text-o',
            url: path + '?tab=' + TAB_ID_B,
            id: TAB_ID_B,
        });
        tabs.push({
            text: 'Tab C',
            icon: 'fa fa-fw fa-file-text-o',
            url: path + '?tab=' + TAB_ID_C,
            id: TAB_ID_C,
        });
        // Set the active tab
        var found = false;
        var selected = query.tab || TAB_ID_B;
        try {
            for (var tabs_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](tabs), tabs_1_1 = tabs_1.next(); !tabs_1_1.done; tabs_1_1 = tabs_1.next()) {
                var tab = tabs_1_1.value;
                tab.active = !found && selected === tab.id;
                if (tab.active) {
                    found = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (tabs_1_1 && !tabs_1_1.done && (_a = tabs_1.return)) _a.call(tabs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!found) {
            tabs[0].active = true;
        }
        var node = {
            text: 'This is the Page title',
            img: meta.info.logos.large,
            subTitle: 'subtitle here',
            url: path,
            children: tabs,
        };
        // Update the page header
        onNavChanged({
            node: node,
            main: node,
        });
    };
    ExampleRootPage.prototype.render = function () {
        var _a = this.props, path = _a.path, query = _a.query, meta = _a.meta;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            "QUERY: ",
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("pre", null, JSON.stringify(query)),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("ul", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: path + '?x=1' }, "111")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: path + '?x=AAA' }, "AAA")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("li", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: path + '?x=1&y=2&y=3' }, "ZZZ"))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("pre", null, JSON.stringify(meta.jsonData))));
    };
    return ExampleRootPage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/app/example-app/config/ExamplePage1.tsx":
/*!********************************************************************!*\
  !*** ./public/app/plugins/app/example-app/config/ExamplePage1.tsx ***!
  \********************************************************************/
/*! exports provided: ExamplePage1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExamplePage1", function() { return ExamplePage1; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Libraries

var ExamplePage1 = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ExamplePage1, _super);
    function ExamplePage1(props) {
        return _super.call(this, props) || this;
    }
    ExamplePage1.prototype.render = function () {
        var query = this.props.query;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            "11111111111111111111111111111111",
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("pre", null, JSON.stringify(query)),
            "11111111111111111111111111111111"));
    };
    return ExamplePage1;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/app/example-app/config/ExamplePage2.tsx":
/*!********************************************************************!*\
  !*** ./public/app/plugins/app/example-app/config/ExamplePage2.tsx ***!
  \********************************************************************/
/*! exports provided: ExamplePage2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExamplePage2", function() { return ExamplePage2; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);

// Libraries

var ExamplePage2 = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ExamplePage2, _super);
    function ExamplePage2(props) {
        return _super.call(this, props) || this;
    }
    ExamplePage2.prototype.render = function () {
        var query = this.props.query;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            "22222222222222222222222222222222",
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("pre", null, JSON.stringify(query)),
            "22222222222222222222222222222222"));
    };
    return ExamplePage2;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/app/example-app/legacy/angular_example_page.ts":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/app/example-app/legacy/angular_example_page.ts ***!
  \***************************************************************************/
/*! exports provided: AngularExamplePageCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AngularExamplePageCtrl", function() { return AngularExamplePageCtrl; });
var AngularExamplePageCtrl = /** @class */ (function () {
    /** @ngInject */
    function AngularExamplePageCtrl($scope, $rootScope) {
        console.log('AngularExamplePageCtrl:', this);
    }
    AngularExamplePageCtrl.templateUrl = 'legacy/angular_example_page.html';
    return AngularExamplePageCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/app/example-app/legacy/config.ts":
/*!*************************************************************!*\
  !*** ./public/app/plugins/app/example-app/legacy/config.ts ***!
  \*************************************************************/
/*! exports provided: ExampleConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExampleConfigCtrl", function() { return ExampleConfigCtrl; });
var ExampleConfigCtrl = /** @class */ (function () {
    /** @ngInject */
    function ExampleConfigCtrl($scope, $injector) {
        this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
        // Make sure it has a JSON Data spot
        if (!this.appModel) {
            this.appModel = {};
        }
        // Required until we get the types sorted on appModel :(
        var appModel = this.appModel;
        if (!appModel.jsonData) {
            appModel.jsonData = {};
        }
        console.log('ExampleConfigCtrl', this);
    }
    ExampleConfigCtrl.prototype.postUpdate = function () {
        if (!this.appModel.enabled) {
            console.log('Not enabled...');
            return;
        }
        // TODO, can do stuff after update
        console.log('Post Update:', this);
    };
    ExampleConfigCtrl.templateUrl = 'legacy/config.html';
    return ExampleConfigCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/app/example-app/module.ts":
/*!******************************************************!*\
  !*** ./public/app/plugins/app/example-app/module.ts ***!
  \******************************************************/
/*! exports provided: ConfigCtrl, AngularExamplePageCtrl, plugin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "plugin", function() { return plugin; });
/* harmony import */ var _legacy_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./legacy/config */ "./public/app/plugins/app/example-app/legacy/config.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return _legacy_config__WEBPACK_IMPORTED_MODULE_0__["ExampleConfigCtrl"]; });

/* harmony import */ var _legacy_angular_example_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./legacy/angular_example_page */ "./public/app/plugins/app/example-app/legacy/angular_example_page.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AngularExamplePageCtrl", function() { return _legacy_angular_example_page__WEBPACK_IMPORTED_MODULE_1__["AngularExamplePageCtrl"]; });

/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _config_ExamplePage1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/ExamplePage1 */ "./public/app/plugins/app/example-app/config/ExamplePage1.tsx");
/* harmony import */ var _config_ExamplePage2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config/ExamplePage2 */ "./public/app/plugins/app/example-app/config/ExamplePage2.tsx");
/* harmony import */ var _ExampleRootPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ExampleRootPage */ "./public/app/plugins/app/example-app/ExampleRootPage.tsx");
// Angular pages






// Legacy exports just for testing

var plugin = new _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["AppPlugin"]()
    .setRootPage(_ExampleRootPage__WEBPACK_IMPORTED_MODULE_5__["ExampleRootPage"])
    .addConfigPage({
    title: 'Page 1',
    icon: 'fa fa-info',
    body: _config_ExamplePage1__WEBPACK_IMPORTED_MODULE_3__["ExamplePage1"],
    id: 'page1',
})
    .addConfigPage({
    title: 'Page 2',
    icon: 'fa fa-user',
    body: _config_ExamplePage2__WEBPACK_IMPORTED_MODULE_4__["ExamplePage2"],
    id: 'page2',
});


/***/ })

}]);
//# sourceMappingURL=exampleApp.fb2366366adbbbf1d38b.js.map