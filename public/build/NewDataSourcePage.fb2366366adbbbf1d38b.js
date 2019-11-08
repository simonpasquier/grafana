(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["NewDataSourcePage"],{

/***/ "./public/app/features/datasources/NewDataSourcePage.tsx":
/*!***************************************************************!*\
  !*** ./public/app/features/datasources/NewDataSourcePage.tsx ***!
  \***************************************************************/
/*! exports provided: getNavModel, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNavModel", function() { return getNavModel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/datasources/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/datasources/state/selectors.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");









var NewDataSourcePage = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](NewDataSourcePage, _super);
    function NewDataSourcePage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.categoryInfoList = [
            { id: 'tsdb', title: 'Time series databases' },
            { id: 'logging', title: 'Logging & document databases' },
            { id: 'sql', title: 'SQL' },
            { id: 'cloud', title: 'Cloud' },
            { id: 'other', title: 'Others' },
        ];
        _this.sortingRules = {
            prometheus: 100,
            graphite: 95,
            loki: 90,
            mysql: 80,
            postgres: 79,
            gcloud: -1,
        };
        _this.onDataSourceTypeClicked = function (plugin) {
            _this.props.addDataSource(plugin);
        };
        _this.onSearchQueryChange = function (value) {
            _this.props.setDataSourceTypeSearchQuery(value);
        };
        _this.onLearnMoreClick = function (evt) {
            evt.stopPropagation();
        };
        return _this;
    }
    NewDataSourcePage.prototype.componentDidMount = function () {
        this.props.loadDataSourceTypes();
        this.searchInput.focus();
    };
    NewDataSourcePage.prototype.renderTypes = function (types) {
        var _this = this;
        if (!types) {
            return null;
        }
        // apply custom sort ranking
        types.sort(function (a, b) {
            var aSort = _this.sortingRules[a.id] || 0;
            var bSort = _this.sortingRules[b.id] || 0;
            if (aSort > bSort) {
                return -1;
            }
            if (aSort < bSort) {
                return 1;
            }
            return a.name > b.name ? -1 : 1;
        });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_8__["List"], { items: types, getItemKey: function (item) { return item.id.toString(); }, renderItem: function (item) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(DataSourceTypeCard, { plugin: item, onClick: function () { return _this.onDataSourceTypeClicked(item); }, onLearnMoreClick: _this.onLearnMoreClick })); } }));
    };
    NewDataSourcePage.prototype.renderGroupedList = function () {
        var _this = this;
        var dataSourceTypes = this.props.dataSourceTypes;
        if (dataSourceTypes.length === 0) {
            return null;
        }
        var categories = dataSourceTypes.reduce(function (accumulator, item) {
            var category = item.category || 'other';
            var list = accumulator[category] || [];
            list.push(item);
            accumulator[category] = list;
            return accumulator;
        }, {});
        categories['cloud'].push(getGrafanaCloudPhantomPlugin());
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            this.categoryInfoList.map(function (category) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-data-source-category", key: category.id },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-data-source-category__header" }, category.title),
                _this.renderTypes(categories[category.id]))); }),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-data-source-more" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-inverse", href: "https://grafana.com/plugins?type=datasource&utm_source=new-data-source", target: "_blank", rel: "noopener" }, "Find more data source plugins on grafana.com"))));
    };
    NewDataSourcePage.prototype.render = function () {
        var _this = this;
        var _a = this.props, navModel = _a.navModel, isLoading = _a.isLoading, searchQuery = _a.searchQuery, dataSourceTypes = _a.dataSourceTypes;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, { isLoading: isLoading },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form gf-form--grow" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_7__["FilterInput"], { ref: function (elem) { return (_this.searchInput = elem); }, labelClassName: "gf-form--has-input-icon", inputClassName: "gf-form-input width-30", value: searchQuery, onChange: this.onSearchQueryChange, placeholder: "Filter by name or type" })),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar__spacer" }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-secondary", href: "datasources" }, "Cancel")),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                    searchQuery && this.renderTypes(dataSourceTypes),
                    !searchQuery && this.renderGroupedList()))));
    };
    return NewDataSourcePage;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var DataSourceTypeCard = function (props) {
    var plugin = props.plugin, onLearnMoreClick = props.onLearnMoreClick;
    var canSelect = plugin.id !== 'gcloud';
    var onClick = canSelect ? props.onClick : function () { };
    // find first plugin info link
    var learnMoreLink = plugin.info.links && plugin.info.links.length > 0 ? plugin.info.links[0].url : null;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-data-source-item", onClick: onClick, "aria-label": plugin.name + " datasource plugin" },
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { className: "add-data-source-item-logo", src: plugin.info.logos.small }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-data-source-item-text-wrapper" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "add-data-source-item-text" }, plugin.name),
            plugin.info.description && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "add-data-source-item-desc" }, plugin.info.description)),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "add-data-source-item-actions" },
            learnMoreLink && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-inverse", href: learnMoreLink + "?utm_source=grafana_add_ds", target: "_blank", rel: "noopener", onClick: onLearnMoreClick },
                "Learn more ",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-external-link add-datasource-item-actions__btn-icon" }))),
            canSelect && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn btn-primary" }, "Select"))));
};
function getGrafanaCloudPhantomPlugin() {
    return {
        id: 'gcloud',
        name: 'Grafana Cloud',
        type: _grafana_ui__WEBPACK_IMPORTED_MODULE_8__["PluginType"].datasource,
        module: '',
        baseUrl: '',
        info: {
            description: 'Hosted Graphite, Prometheus and Loki',
            logos: { small: 'public/img/grafana_icon.svg', large: 'asd' },
            author: { name: 'Grafana Labs' },
            links: [
                {
                    url: 'https://grafana.com/cloud',
                    name: 'Learn more',
                },
            ],
            screenshots: [],
            updated: '2019-05-10',
            version: '1.0.0',
        },
    };
}
function getNavModel() {
    var main = {
        icon: 'gicon gicon-add-datasources',
        id: 'datasource-new',
        text: 'Add data source',
        href: 'datasources/new',
        subTitle: 'Choose a data source type',
    };
    return {
        main: main,
        node: main,
    };
}
function mapStateToProps(state) {
    return {
        navModel: getNavModel(),
        dataSourceTypes: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_6__["getDataSourceTypes"])(state.dataSources),
        searchQuery: state.dataSources.dataSourceTypeSearchQuery,
        isLoading: state.dataSources.isLoadingDataSources,
    };
}
var mapDispatchToProps = {
    addDataSource: _state_actions__WEBPACK_IMPORTED_MODULE_5__["addDataSource"],
    loadDataSourceTypes: _state_actions__WEBPACK_IMPORTED_MODULE_5__["loadDataSourceTypes"],
    setDataSourceTypeSearchQuery: _state_actions__WEBPACK_IMPORTED_MODULE_5__["setDataSourceTypeSearchQuery"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(NewDataSourcePage)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/datasources/state/selectors.ts":
/*!************************************************************!*\
  !*** ./public/app/features/datasources/state/selectors.ts ***!
  \************************************************************/
/*! exports provided: getDataSources, getDataSourceTypes, getDataSource, getDataSourceMeta, getDataSourcesSearchQuery, getDataSourcesLayoutMode, getDataSourcesCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSources", function() { return getDataSources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourceTypes", function() { return getDataSourceTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSource", function() { return getDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourceMeta", function() { return getDataSourceMeta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourcesSearchQuery", function() { return getDataSourcesSearchQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourcesLayoutMode", function() { return getDataSourcesLayoutMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDataSourcesCount", function() { return getDataSourcesCount; });
var getDataSources = function (state) {
    var regex = new RegExp(state.searchQuery, 'i');
    return state.dataSources.filter(function (dataSource) {
        return regex.test(dataSource.name) || regex.test(dataSource.database);
    });
};
var getDataSourceTypes = function (state) {
    var regex = new RegExp(state.dataSourceTypeSearchQuery, 'i');
    return state.dataSourceTypes.filter(function (type) {
        return regex.test(type.name);
    });
};
var getDataSource = function (state, dataSourceId) {
    if (state.dataSource.id === parseInt(dataSourceId, 10)) {
        return state.dataSource;
    }
    return {};
};
var getDataSourceMeta = function (state, type) {
    if (state.dataSourceMeta.id === type) {
        return state.dataSourceMeta;
    }
    return {};
};
var getDataSourcesSearchQuery = function (state) { return state.searchQuery; };
var getDataSourcesLayoutMode = function (state) { return state.layoutMode; };
var getDataSourcesCount = function (state) { return state.dataSourcesCount; };


/***/ })

}]);
//# sourceMappingURL=NewDataSourcePage.fb2366366adbbbf1d38b.js.map