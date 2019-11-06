(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["prometheusPlugin"],{

/***/ "./public/app/core/utils/CancelablePromise.ts":
/*!****************************************************!*\
  !*** ./public/app/core/utils/CancelablePromise.ts ***!
  \****************************************************/
/*! exports provided: makePromiseCancelable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePromiseCancelable", function() { return makePromiseCancelable; });
// https://github.com/facebook/react/issues/5465
var makePromiseCancelable = function (promise) {
    var hasCanceled_ = false;
    var wrappedPromise = new Promise(function (resolve, reject) {
        promise.then(function (val) { return (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)); });
        promise.catch(function (error) { return (hasCanceled_ ? reject({ isCanceled: true }) : reject(error)); });
    });
    return {
        promise: wrappedPromise,
        cancel: function () {
            hasCanceled_ = true;
        },
    };
};


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/add_label_to_query.ts":
/*!************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/add_label_to_query.ts ***!
  \************************************************************************/
/*! exports provided: addLabelToQuery, addLabelToSelector, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLabelToQuery", function() { return addLabelToQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLabelToSelector", function() { return addLabelToSelector; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var keywords = 'by|without|on|ignoring|group_left|group_right|bool|or|and|unless';
// Duplicate from mode-prometheus.js, which can't be used in tests due to global ace not being loaded.
var builtInWords = [
    keywords,
    'count|count_values|min|max|avg|sum|stddev|stdvar|bottomk|topk|quantile',
    'true|false|null|__name__|job',
    'abs|absent|ceil|changes|clamp_max|clamp_min|count_scalar|day_of_month|day_of_week|days_in_month|delta|deriv',
    'drop_common_labels|exp|floor|histogram_quantile|holt_winters|hour|idelta|increase|irate|label_replace|ln|log2',
    'log10|minute|month|predict_linear|rate|resets|round|scalar|sort|sort_desc|sqrt|time|vector|year|avg_over_time',
    'min_over_time|max_over_time|sum_over_time|count_over_time|quantile_over_time|stddev_over_time|stdvar_over_time',
]
    .join('|')
    .split('|');
var metricNameRegexp = /([A-Za-z:][\w:]*)\b(?![\(\]{=!",])/g;
var selectorRegexp = /{([^{]*)}/g;
// addLabelToQuery('foo', 'bar', 'baz') => 'foo{bar="baz"}'
function addLabelToQuery(query, key, value, operator) {
    if (!key || !value) {
        throw new Error('Need label to add to query.');
    }
    // Add empty selectors to bare metric names
    var previousWord;
    query = query.replace(metricNameRegexp, function (match, word, offset) {
        var insideSelector = isPositionInsideChars(query, offset, '{', '}');
        // Handle "sum by (key) (metric)"
        var previousWordIsKeyWord = previousWord && keywords.split('|').indexOf(previousWord) > -1;
        // check for colon as as "word boundary" symbol
        var isColonBounded = word.endsWith(':');
        previousWord = word;
        if (!insideSelector && !isColonBounded && !previousWordIsKeyWord && builtInWords.indexOf(word) === -1) {
            return word + "{}";
        }
        return word;
    });
    // Adding label to existing selectors
    var match = selectorRegexp.exec(query);
    var parts = [];
    var lastIndex = 0;
    var suffix = '';
    while (match) {
        var prefix = query.slice(lastIndex, match.index);
        var selector = match[1];
        var selectorWithLabel = addLabelToSelector(selector, key, value, operator);
        lastIndex = match.index + match[1].length + 2;
        suffix = query.slice(match.index + match[0].length);
        parts.push(prefix, selectorWithLabel);
        match = selectorRegexp.exec(query);
    }
    parts.push(suffix);
    return parts.join('');
}
var labelRegexp = /(\w+)\s*(=|!=|=~|!~)\s*("[^"]*")/g;
function addLabelToSelector(selector, labelKey, labelValue, labelOperator) {
    var parsedLabels = [];
    // Split selector into labels
    if (selector) {
        var match = labelRegexp.exec(selector);
        while (match) {
            parsedLabels.push({ key: match[1], operator: match[2], value: match[3] });
            match = labelRegexp.exec(selector);
        }
    }
    // Add new label
    var operatorForLabelKey = labelOperator || '=';
    parsedLabels.push({ key: labelKey, operator: operatorForLabelKey, value: "\"" + labelValue + "\"" });
    // Sort labels by key and put them together
    var formatted = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.chain(parsedLabels)
        .uniqWith(lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isEqual)
        .compact()
        .sortBy('key')
        .map(function (_a) {
        var key = _a.key, operator = _a.operator, value = _a.value;
        return "" + key + operator + value;
    })
        .value()
        .join(',');
    return "{" + formatted + "}";
}
function isPositionInsideChars(text, position, openChar, closeChar) {
    var nextSelectorStart = text.slice(position).indexOf(openChar);
    var nextSelectorEnd = text.slice(position).indexOf(closeChar);
    return nextSelectorEnd > -1 && (nextSelectorStart === -1 || nextSelectorStart > nextSelectorEnd);
}
/* harmony default export */ __webpack_exports__["default"] = (addLabelToQuery);


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromCheatSheet.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromCheatSheet.tsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var CHEAT_SHEET_ITEMS = [
    {
        title: 'Request Rate',
        expression: 'rate(http_request_total[5m])',
        label: 'Given an HTTP request counter, this query calculates the per-second average request rate over the last 5 minutes.',
    },
    {
        title: '95th Percentile of Request Latencies',
        expression: 'histogram_quantile(0.95, sum(rate(prometheus_http_request_duration_seconds_bucket[5m])) by (le))',
        label: 'Calculates the 95th percentile of HTTP request rate over 5 minute windows.',
    },
    {
        title: 'Alerts Firing',
        expression: 'sort_desc(sum(sum_over_time(ALERTS{alertstate="firing"}[24h])) by (alertname))',
        label: 'Sums up the alerts that have been firing over the last 24 hours.',
    },
];
/* harmony default export */ __webpack_exports__["default"] = (function (props) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null,
    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", null, "PromQL Cheat Sheet"),
    CHEAT_SHEET_ITEMS.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cheat-sheet-item", key: item.expression },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cheat-sheet-item__title" }, item.title),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cheat-sheet-item__example", onClick: function (e) { return props.onClickExample({ refId: 'A', expr: item.expression }); } },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, item.expression)),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "cheat-sheet-item__label" }, item.label))); }))); });


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromLink.tsx":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromLink.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");




var PromLink = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PromLink, _super);
    function PromLink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { href: null };
        return _this;
    }
    PromLink.prototype.componentDidUpdate = function (prevProps) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var href;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(prevProps.panelData !== this.props.panelData && this.props.panelData.request)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getExternalLink()];
                    case 1:
                        href = _a.sent();
                        this.setState({ href: href });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PromLink.prototype.getExternalLink = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, Promise, function () {
            var _a, query, panelData, target, datasourceName, datasource, _b, range, start, end, rangeDiff, endTime, options, queryOptions, expr, args;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, query = _a.query, panelData = _a.panelData;
                        target = panelData.request.targets.length > 0 ? panelData.request.targets[0] : { datasource: null };
                        datasourceName = target.datasource;
                        if (!datasourceName) return [3 /*break*/, 2];
                        return [4 /*yield*/, Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_3__["getDatasourceSrv"])().get(datasourceName)];
                    case 1:
                        _b = (_c.sent());
                        return [3 /*break*/, 3];
                    case 2:
                        _b = this.props.datasource;
                        _c.label = 3;
                    case 3:
                        datasource = _b;
                        range = panelData.request.range;
                        start = datasource.getPrometheusTime(range.from, false);
                        end = datasource.getPrometheusTime(range.to, true);
                        rangeDiff = Math.ceil(end - start);
                        endTime = range.to.utc().format('YYYY-MM-DD HH:mm');
                        options = {
                            interval: panelData.request.interval,
                        };
                        queryOptions = datasource.createQuery(query, options, start, end);
                        expr = {
                            'g0.expr': queryOptions.expr,
                            'g0.range_input': rangeDiff + 's',
                            'g0.end_input': endTime,
                            'g0.step_input': queryOptions.step,
                            'g0.tab': 0,
                        };
                        args = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(expr, function (v, k) {
                            return k + '=' + encodeURIComponent(v);
                        }).join('&');
                        return [2 /*return*/, datasource.directUrl + "/graph?" + args];
                }
            });
        });
    };
    PromLink.prototype.render = function () {
        var href = this.state.href;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { href: href, target: "_blank", rel: "noopener" },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-share-square-o" }),
            " Prometheus"));
    };
    return PromLink;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (PromLink);


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromQueryEditor.tsx":
/*!*********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromQueryEditor.tsx ***!
  \*********************************************************************************/
/*! exports provided: PromQueryEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromQueryEditor", function() { return PromQueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _PromQueryField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PromQueryField */ "./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx");
/* harmony import */ var _PromLink__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./PromLink */ "./public/app/plugins/datasource/prometheus/components/PromLink.tsx");



// Types



var FORMAT_OPTIONS = [
    { label: 'Time series', value: 'time_series' },
    { label: 'Table', value: 'table' },
    { label: 'Heatmap', value: 'heatmap' },
];
var INTERVAL_FACTOR_OPTIONS = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map([1, 2, 3, 4, 5, 10], function (value) { return ({
    value: value,
    label: '1/' + value,
}); });
var PromQueryEditor = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PromQueryEditor, _super);
    function PromQueryEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.onFieldChange = function (query, override) {
            _this.query.expr = query.expr;
        };
        _this.onFormatChange = function (option) {
            _this.query.format = option.value;
            _this.setState({ formatOption: option }, _this.onRunQuery);
        };
        _this.onInstantChange = function (e) {
            var instant = e.target.checked;
            _this.query.instant = instant;
            _this.setState({ instant: instant }, _this.onRunQuery);
        };
        _this.onIntervalChange = function (e) {
            var interval = e.currentTarget.value;
            _this.query.interval = interval;
            _this.setState({ interval: interval });
        };
        _this.onIntervalFactorChange = function (option) {
            _this.query.intervalFactor = option.value;
            _this.setState({ intervalFactorOption: option }, _this.onRunQuery);
        };
        _this.onLegendChange = function (e) {
            var legendFormat = e.currentTarget.value;
            _this.query.legendFormat = legendFormat;
            _this.setState({ legendFormat: legendFormat });
        };
        _this.onRunQuery = function () {
            var query = _this.query;
            _this.props.onChange(query);
            _this.props.onRunQuery();
        };
        var query = props.query;
        _this.query = query;
        // Query target properties that are fully controlled inputs
        _this.state = {
            // Fully controlled text inputs
            interval: query.interval,
            legendFormat: query.legendFormat,
            // Select options
            formatOption: FORMAT_OPTIONS.find(function (option) { return option.value === query.format; }) || FORMAT_OPTIONS[0],
            intervalFactorOption: INTERVAL_FACTOR_OPTIONS.find(function (option) { return option.value === query.intervalFactor; }) || INTERVAL_FACTOR_OPTIONS[0],
            // Switch options
            instant: Boolean(query.instant),
        };
        return _this;
    }
    PromQueryEditor.prototype.render = function () {
        var _a = this.props, datasource = _a.datasource, query = _a.query, panelData = _a.panelData, queryResponse = _a.queryResponse;
        var _b = this.state, formatOption = _b.formatOption, instant = _b.instant, interval = _b.interval, intervalFactorOption = _b.intervalFactorOption, legendFormat = _b.legendFormat;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_PromQueryField__WEBPACK_IMPORTED_MODULE_4__["default"], { datasource: datasource, query: query, onRunQuery: this.onRunQuery, onChange: this.onFieldChange, history: [], panelData: panelData, queryResponse: queryResponse, datasourceStatus: _grafana_ui__WEBPACK_IMPORTED_MODULE_3__["DataSourceStatus"].Connected }),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form-inline" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { width: 7, tooltip: "Controls the name of the time series, using name or pattern. For example\n        {{hostname}} will be replaced with label value for the label hostname." }, "Legend"),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", { type: "text", className: "gf-form-input", placeholder: "legend format", value: legendFormat, onChange: this.onLegendChange, onBlur: this.onRunQuery })),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { width: 7, tooltip: "Leave blank for auto handling based on time range and panel width.\n            Note that the actual dates used in the query will be adjusted\n        to a multiple of the interval step." }, "Min step"),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", { type: "text", className: "gf-form-input width-8", placeholder: interval, onChange: this.onIntervalChange, onBlur: this.onRunQuery, value: interval })),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form-label" }, "Resolution"),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Select"], { isSearchable: false, options: INTERVAL_FACTOR_OPTIONS, onChange: this.onIntervalFactorChange, value: intervalFactorOption })),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form-label" }, "Format"),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Select"], { isSearchable: false, options: FORMAT_OPTIONS, onChange: this.onFormatChange, value: formatOption }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], { label: "Instant", checked: instant, onChange: this.onInstantChange }),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["FormLabel"], { width: 10, tooltip: "Link to Graph in Prometheus" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_PromLink__WEBPACK_IMPORTED_MODULE_5__["default"], { datasource: datasource, query: this.query, panelData: panelData }))))));
    };
    return PromQueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));



/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx":
/*!********************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx ***!
  \********************************************************************************/
/*! exports provided: RECORDING_RULES_GROUP, groupMetricsByPrefix, willApplySuggestion, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECORDING_RULES_GROUP", function() { return RECORDING_RULES_GROUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupMetricsByPrefix", function() { return groupMetricsByPrefix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "willApplySuggestion", function() { return willApplySuggestion; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var rc_cascader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rc-cascader */ "./node_modules/rc-cascader/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prismjs */ "./node_modules/prismjs/prism.js");
/* harmony import */ var prismjs__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prismjs__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var app_features_explore_slate_plugins_braces__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/features/explore/slate-plugins/braces */ "./public/app/features/explore/slate-plugins/braces.ts");
/* harmony import */ var app_features_explore_QueryField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/features/explore/QueryField */ "./public/app/features/explore/QueryField.tsx");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../types */ "./public/app/plugins/datasource/prometheus/types.ts");
/* harmony import */ var app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/core/utils/CancelablePromise */ "./public/app/core/utils/CancelablePromise.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");



// @ts-ignore



// dom also includes Element polyfills






var HISTOGRAM_GROUP = '__histograms__';
var METRIC_MARK = 'metric';
var PRISM_SYNTAX = 'promql';
var RECORDING_RULES_GROUP = '__recording_rules__';
function getChooserText(hasSyntax, datasourceStatus) {
    if (datasourceStatus === _grafana_ui__WEBPACK_IMPORTED_MODULE_4__["DataSourceStatus"].Disconnected) {
        return '(Disconnected)';
    }
    if (!hasSyntax) {
        return 'Loading metrics...';
    }
    return 'Metrics';
}
function groupMetricsByPrefix(metrics, delimiter) {
    if (delimiter === void 0) { delimiter = '_'; }
    // Filter out recording rules and insert as first option
    var ruleRegex = /:\w+:/;
    var ruleNames = metrics.filter(function (metric) { return ruleRegex.test(metric); });
    var rulesOption = {
        label: 'Recording rules',
        value: RECORDING_RULES_GROUP,
        children: ruleNames
            .slice()
            .sort()
            .map(function (name) { return ({ label: name, value: name }); }),
    };
    var options = ruleNames.length > 0 ? [rulesOption] : [];
    var metricsOptions = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.chain(metrics)
        .filter(function (metric) { return !ruleRegex.test(metric); })
        .groupBy(function (metric) { return metric.split(delimiter)[0]; })
        .map(function (metricsForPrefix, prefix) {
        var prefixIsMetric = metricsForPrefix.length === 1 && metricsForPrefix[0] === prefix;
        var children = prefixIsMetric ? [] : metricsForPrefix.sort().map(function (m) { return ({ label: m, value: m }); });
        return {
            children: children,
            label: prefix,
            value: prefix,
        };
    })
        .sortBy('label')
        .value();
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](options, metricsOptions);
}
function willApplySuggestion(suggestion, _a) {
    var typeaheadContext = _a.typeaheadContext, typeaheadText = _a.typeaheadText;
    // Modify suggestion based on context
    switch (typeaheadContext) {
        case 'context-labels': {
            var nextChar = _grafana_ui__WEBPACK_IMPORTED_MODULE_4__["DOMUtil"].getNextCharacter();
            if (!nextChar || nextChar === '}' || nextChar === ',') {
                suggestion += '=';
            }
            break;
        }
        case 'context-label-values': {
            // Always add quotes and remove existing ones instead
            if (!typeaheadText.match(/^(!?=~?"|")/)) {
                suggestion = "\"" + suggestion;
            }
            if (_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["DOMUtil"].getNextCharacter() !== '"') {
                suggestion = suggestion + "\"";
            }
            break;
        }
        default:
    }
    return suggestion;
}
var PromQueryField = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PromQueryField, _super);
    function PromQueryField(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.refreshHint = function () {
            var _a = _this.props, datasource = _a.datasource, query = _a.query, queryResponse = _a.queryResponse;
            if (!queryResponse || queryResponse.series.length === 0) {
                _this.setState({ hint: null });
                return;
            }
            var result = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_10__["isDataFrame"])(queryResponse.series[0])
                ? queryResponse.series.map(_grafana_data__WEBPACK_IMPORTED_MODULE_10__["toLegacyResponseData"])
                : queryResponse.series;
            var hints = datasource.getQueryHints(query, result);
            var hint = hints && hints.length > 0 ? hints[0] : null;
            _this.setState({ hint: hint });
        };
        _this.refreshMetrics = function (cancelablePromise) {
            _this.languageProviderInitializationPromise = cancelablePromise;
            _this.languageProviderInitializationPromise.promise
                .then(function (remaining) {
                remaining.map(function (task) { return task.then(_this.onUpdateLanguage).catch(function () { }); });
            })
                .then(function () { return _this.onUpdateLanguage(); })
                .catch(function (_a) {
                var isCanceled = _a.isCanceled;
                if (isCanceled) {
                    console.warn('PromQueryField has unmounted, language provider intialization was canceled');
                }
            });
        };
        _this.onChangeMetrics = function (values, selectedOptions) {
            var query;
            if (selectedOptions.length === 1) {
                if (selectedOptions[0].children.length === 0) {
                    query = selectedOptions[0].value;
                }
                else {
                    // Ignore click on group
                    return;
                }
            }
            else {
                var prefix = selectedOptions[0].value;
                var metric = selectedOptions[1].value;
                if (prefix === HISTOGRAM_GROUP) {
                    query = "histogram_quantile(0.95, sum(rate(" + metric + "[5m])) by (le))";
                }
                else {
                    query = metric;
                }
            }
            _this.onChangeQuery(query, true);
        };
        _this.onChangeQuery = function (value, override) {
            // Send text change to parent
            var _a = _this.props, query = _a.query, onChange = _a.onChange, onRunQuery = _a.onRunQuery;
            if (onChange) {
                var nextQuery = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, query, { expr: value, context: _types__WEBPACK_IMPORTED_MODULE_8__["PromContext"].Explore });
                onChange(nextQuery);
                if (override && onRunQuery) {
                    onRunQuery();
                }
            }
        };
        _this.onClickHintFix = function () {
            var hint = _this.state.hint;
            var onHint = _this.props.onHint;
            if (onHint && hint && hint.fix) {
                onHint(hint.fix.action);
            }
        };
        _this.onUpdateLanguage = function () {
            var _a = _this.languageProvider, histogramMetrics = _a.histogramMetrics, metrics = _a.metrics;
            if (!metrics) {
                return;
            }
            prismjs__WEBPACK_IMPORTED_MODULE_5___default.a.languages[PRISM_SYNTAX] = _this.languageProvider.syntax;
            prismjs__WEBPACK_IMPORTED_MODULE_5___default.a.languages[PRISM_SYNTAX][METRIC_MARK] = {
                alias: 'variable',
                pattern: new RegExp("(?:^|\\s)(" + metrics.join('|') + ")(?:$|\\s)"),
            };
            // Build metrics tree
            var metricsByPrefix = groupMetricsByPrefix(metrics);
            var histogramOptions = histogramMetrics.map(function (hm) { return ({ label: hm, value: hm }); });
            var metricsOptions = histogramMetrics.length > 0
                ? tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"]([
                    { label: 'Histograms', value: HISTOGRAM_GROUP, children: histogramOptions, isLeaf: false }
                ], metricsByPrefix) : metricsByPrefix;
            _this.setState({ metricsOptions: metricsOptions, syntaxLoaded: true });
        };
        _this.onTypeahead = function (typeahead) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, Promise, function () {
            var history, prefix, text, value, wrapperClasses, labelKey, result;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.languageProvider) {
                            return [2 /*return*/, { suggestions: [] }];
                        }
                        history = this.props.history;
                        prefix = typeahead.prefix, text = typeahead.text, value = typeahead.value, wrapperClasses = typeahead.wrapperClasses, labelKey = typeahead.labelKey;
                        return [4 /*yield*/, this.languageProvider.provideCompletionItems({ text: text, value: value, prefix: prefix, wrapperClasses: wrapperClasses, labelKey: labelKey }, { history: history })];
                    case 1:
                        result = _a.sent();
                        // console.log('handleTypeahead', wrapperClasses, text, prefix, labelKey, result.context);
                        return [2 /*return*/, result];
                }
            });
        }); };
        if (props.datasource.languageProvider) {
            _this.languageProvider = props.datasource.languageProvider;
        }
        _this.plugins = [
            Object(app_features_explore_slate_plugins_braces__WEBPACK_IMPORTED_MODULE_6__["default"])(),
            Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["SlatePrism"])({
                onlyIn: function (node) { return node.type === 'code_block'; },
                getSyntax: function (node) { return 'promql'; },
            }),
        ];
        _this.state = {
            metricsOptions: [],
            syntaxLoaded: false,
            hint: null,
        };
        return _this;
    }
    PromQueryField.prototype.componentDidMount = function () {
        if (this.languageProvider) {
            this.refreshMetrics(Object(app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_9__["makePromiseCancelable"])(this.languageProvider.start()));
        }
        this.refreshHint();
    };
    PromQueryField.prototype.componentWillUnmount = function () {
        if (this.languageProviderInitializationPromise) {
            this.languageProviderInitializationPromise.cancel();
        }
    };
    PromQueryField.prototype.componentDidUpdate = function (prevProps) {
        var queryResponse = this.props.queryResponse;
        if (queryResponse && prevProps.queryResponse && prevProps.queryResponse.series !== queryResponse.series) {
            this.refreshHint();
        }
        var reconnected = prevProps.datasourceStatus === _grafana_ui__WEBPACK_IMPORTED_MODULE_4__["DataSourceStatus"].Disconnected &&
            this.props.datasourceStatus === _grafana_ui__WEBPACK_IMPORTED_MODULE_4__["DataSourceStatus"].Connected;
        if (!reconnected) {
            return;
        }
        if (this.languageProviderInitializationPromise) {
            this.languageProviderInitializationPromise.cancel();
        }
        if (this.languageProvider) {
            this.refreshMetrics(Object(app_core_utils_CancelablePromise__WEBPACK_IMPORTED_MODULE_9__["makePromiseCancelable"])(this.languageProvider.fetchMetrics()));
        }
    };
    PromQueryField.prototype.render = function () {
        var _a = this.props, queryResponse = _a.queryResponse, query = _a.query, datasourceStatus = _a.datasourceStatus;
        var _b = this.state, metricsOptions = _b.metricsOptions, syntaxLoaded = _b.syntaxLoaded, hint = _b.hint;
        var cleanText = this.languageProvider ? this.languageProvider.cleanText : undefined;
        var chooserText = getChooserText(syntaxLoaded, datasourceStatus);
        var buttonDisabled = !syntaxLoaded || datasourceStatus === _grafana_ui__WEBPACK_IMPORTED_MODULE_4__["DataSourceStatus"].Disconnected;
        var showError = queryResponse && queryResponse.error && queryResponse.error.refId === query.refId;
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form-inline gf-form-inline--nowrap" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form flex-shrink-0" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(rc_cascader__WEBPACK_IMPORTED_MODULE_3__["default"], { options: metricsOptions, onChange: this.onChangeMetrics, expandIcon: null },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", { className: "gf-form-label gf-form-label--btn", disabled: buttonDisabled },
                            chooserText,
                            " ",
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-caret-down" })))),
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "gf-form gf-form--grow flex-shrink-1" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_features_explore_QueryField__WEBPACK_IMPORTED_MODULE_7__["default"], { additionalPlugins: this.plugins, cleanText: cleanText, query: query.expr, onTypeahead: this.onTypeahead, onWillApplySuggestion: willApplySuggestion, onChange: this.onChangeQuery, onRunQuery: this.props.onRunQuery, placeholder: "Enter a PromQL query", portalOrigin: "prometheus", syntaxLoaded: syntaxLoaded }))),
            showError ? react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "prom-query-field-info text-error" }, queryResponse.error.message) : null,
            hint ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "prom-query-field-info text-warning" },
                hint.label,
                ' ',
                hint.fix ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { className: "text-link muted", onClick: this.onClickHintFix }, hint.fix.label)) : null)) : null));
    };
    return PromQueryField;
}(react__WEBPACK_IMPORTED_MODULE_2___default.a.PureComponent));
/* harmony default export */ __webpack_exports__["default"] = (PromQueryField);


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/config_ctrl.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/config_ctrl.ts ***!
  \*****************************************************************/
/*! exports provided: PrometheusConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrometheusConfigCtrl", function() { return PrometheusConfigCtrl; });
var PrometheusConfigCtrl = /** @class */ (function () {
    /** @ngInject */
    function PrometheusConfigCtrl($scope) {
        this.current.jsonData.httpMethod = this.current.jsonData.httpMethod || 'GET';
    }
    PrometheusConfigCtrl.templateUrl = 'public/app/plugins/datasource/prometheus/partials/config.html';
    return PrometheusConfigCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/datasource.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/datasource.ts ***!
  \****************************************************************/
/*! exports provided: PrometheusDatasource, alignRange, extractRuleMappingFromGroups, prometheusRegularEscape, prometheusSpecialRegexEscape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrometheusDatasource", function() { return PrometheusDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alignRange", function() { return alignRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractRuleMappingFromGroups", function() { return extractRuleMappingFromGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prometheusRegularEscape", function() { return prometheusRegularEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prometheusSpecialRegexEscape", function() { return prometheusSpecialRegexEscape; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js-exposed");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/utils/kbn */ "./public/app/core/utils/kbn.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _metric_find_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./metric_find_query */ "./public/app/plugins/datasource/prometheus/metric_find_query.ts");
/* harmony import */ var _result_transformer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./result_transformer */ "./public/app/plugins/datasource/prometheus/result_transformer.ts");
/* harmony import */ var _language_provider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./language_provider */ "./public/app/plugins/datasource/prometheus/language_provider.ts");
/* harmony import */ var _add_label_to_query__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./add_label_to_query */ "./public/app/plugins/datasource/prometheus/add_label_to_query.ts");
/* harmony import */ var _query_hints__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./query_hints */ "./public/app/plugins/datasource/prometheus/query_hints.ts");
/* harmony import */ var _language_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./language_utils */ "./public/app/plugins/datasource/prometheus/language_utils.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./types */ "./public/app/plugins/datasource/prometheus/types.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");

// Libraries


// Services & Utils










// Types



var PrometheusDatasource = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PrometheusDatasource, _super);
    /** @ngInject */
    function PrometheusDatasource(instanceSettings, $q, backendSrv, templateSrv, timeSrv) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.$q = $q;
        _this.backendSrv = backendSrv;
        _this.templateSrv = templateSrv;
        _this.timeSrv = timeSrv;
        _this.init = function () {
            _this.loadRules();
        };
        _this.processResult = function (response, query, target, responseListLength) {
            // Keeping original start/end for transformers
            var transformerOptions = {
                format: target.format,
                step: query.step,
                legendFormat: target.legendFormat,
                start: query.start,
                end: query.end,
                query: query.expr,
                responseListLength: responseListLength,
                refId: target.refId,
                valueWithRefId: target.valueWithRefId,
            };
            var series = _this.resultTransformer.transform(response, transformerOptions);
            return series;
        };
        _this.prepareTargets = function (options, start, end) {
            var e_1, _a;
            var queries = [];
            var activeTargets = [];
            try {
                for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](options.targets), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var target = _c.value;
                    if (!target.expr || target.hide) {
                        continue;
                    }
                    target.requestId = options.panelId + target.refId;
                    if (target.context !== _types__WEBPACK_IMPORTED_MODULE_13__["PromContext"].Explore) {
                        activeTargets.push(target);
                        queries.push(_this.createQuery(target, options, start, end));
                        continue;
                    }
                    if (target.showingTable) {
                        // create instant target only if Table is showed in Explore
                        var instantTarget = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.cloneDeep(target);
                        instantTarget.format = 'table';
                        instantTarget.instant = true;
                        instantTarget.valueWithRefId = true;
                        delete instantTarget.maxDataPoints;
                        instantTarget.requestId += '_instant';
                        activeTargets.push(instantTarget);
                        queries.push(_this.createQuery(instantTarget, options, start, end));
                    }
                    if (target.showingGraph) {
                        // create time series target only if Graph is showed in Explore
                        target.format = 'time_series';
                        target.instant = false;
                        activeTargets.push(target);
                        queries.push(_this.createQuery(target, options, start, end));
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return {
                queries: queries,
                activeTargets: activeTargets,
            };
        };
        _this.calledFromExplore = function (options) {
            var exploreTargets = 0;
            for (var index = 0; index < options.targets.length; index++) {
                var target = options.targets[index];
                if (target.context === _types__WEBPACK_IMPORTED_MODULE_13__["PromContext"].Explore) {
                    exploreTargets++;
                }
            }
            return exploreTargets === options.targets.length;
        };
        _this.handleErrors = function (err, target) {
            var error = {
                message: 'Unknown error during query transaction. Please check JS console logs.',
                refId: target.refId,
            };
            if (err.data) {
                if (typeof err.data === 'string') {
                    error.message = err.data;
                }
                else if (err.data.error) {
                    error.message = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_15__["safeStringifyValue"])(err.data.error);
                }
            }
            else if (err.message) {
                error.message = err.message;
            }
            else if (typeof err === 'string') {
                error.message = err;
            }
            error.status = err.status;
            error.statusText = err.statusText;
            return error;
        };
        _this.type = 'prometheus';
        _this.editorSrc = 'app/features/prometheus/partials/query.editor.html';
        _this.url = instanceSettings.url;
        _this.basicAuth = instanceSettings.basicAuth;
        _this.withCredentials = instanceSettings.withCredentials;
        _this.interval = instanceSettings.jsonData.timeInterval || '15s';
        _this.queryTimeout = instanceSettings.jsonData.queryTimeout;
        _this.httpMethod = instanceSettings.jsonData.httpMethod || 'GET';
        _this.directUrl = instanceSettings.jsonData.directUrl;
        _this.resultTransformer = new _result_transformer__WEBPACK_IMPORTED_MODULE_8__["ResultTransformer"](templateSrv);
        _this.ruleMappings = {};
        _this.languageProvider = new _language_provider__WEBPACK_IMPORTED_MODULE_9__["default"](_this);
        return _this;
    }
    PrometheusDatasource.prototype.getQueryDisplayText = function (query) {
        return query.expr;
    };
    PrometheusDatasource.prototype._addTracingHeaders = function (httpOptions, options) {
        httpOptions.headers = options.headers || {};
        var proxyMode = !this.url.match(/^http/);
        if (proxyMode) {
            httpOptions.headers['X-Dashboard-Id'] = options.dashboardId;
            httpOptions.headers['X-Panel-Id'] = options.panelId;
        }
    };
    PrometheusDatasource.prototype._request = function (url, data, options) {
        options = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.defaults(options || {}, {
            url: this.url + url,
            method: this.httpMethod,
            headers: {},
        });
        if (options.method === 'GET') {
            if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(data)) {
                options.url =
                    options.url +
                        '?' +
                        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(data, function (v, k) {
                            return encodeURIComponent(k) + '=' + encodeURIComponent(v);
                        }).join('&');
            }
        }
        else {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            options.transformRequest = function (data) {
                return jquery__WEBPACK_IMPORTED_MODULE_2___default.a.param(data);
            };
            options.data = data;
        }
        if (this.basicAuth || this.withCredentials) {
            options.withCredentials = true;
        }
        if (this.basicAuth) {
            options.headers.Authorization = this.basicAuth;
        }
        return this.backendSrv.datasourceRequest(options);
    };
    // Use this for tab completion features, wont publish response to other components
    PrometheusDatasource.prototype.metadataRequest = function (url) {
        return this._request(url, null, { method: 'GET', silent: true });
    };
    PrometheusDatasource.prototype.interpolateQueryExpr = function (value, variable, defaultFormatFn) {
        // if no multi or include all do not regexEscape
        if (!variable.multi && !variable.includeAll) {
            return prometheusRegularEscape(value);
        }
        if (typeof value === 'string') {
            return prometheusSpecialRegexEscape(value);
        }
        var escapedValues = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(value, prometheusSpecialRegexEscape);
        return escapedValues.join('|');
    };
    PrometheusDatasource.prototype.targetContainsTemplate = function (target) {
        return this.templateSrv.variableExists(target.expr);
    };
    PrometheusDatasource.prototype.query = function (options) {
        var start = this.getPrometheusTime(options.range.from, false);
        var end = this.getPrometheusTime(options.range.to, true);
        var _a = this.prepareTargets(options, start, end), queries = _a.queries, activeTargets = _a.activeTargets;
        // No valid targets, return the empty result to save a round trip.
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(queries)) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])({
                data: [],
                state: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Done,
            });
        }
        if (this.calledFromExplore(options)) {
            return this.exploreQuery(queries, activeTargets, end);
        }
        return this.panelsQuery(queries, activeTargets, end, options.requestId);
    };
    PrometheusDatasource.prototype.exploreQuery = function (queries, activeTargets, end) {
        var _this = this;
        var runningQueriesCount = queries.length;
        var subQueries = queries.map(function (query, index) {
            var target = activeTargets[index];
            var observable = null;
            if (query.instant) {
                observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["from"])(_this.performInstantQuery(query, end));
            }
            else {
                observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["from"])(_this.performTimeSeriesQuery(query, query.start, query.end));
            }
            return observable.pipe(
            // Decrease the counter here. We assume that each request returns only single value and then completes
            // (should hold until there is some streaming requests involved).
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["tap"])(function () { return runningQueriesCount--; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])(function (response) { return (response.cancelled ? false : true); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (response) {
                var data = _this.processResult(response, query, target, queries.length);
                return {
                    data: data,
                    key: query.requestId,
                    state: runningQueriesCount === 0 ? _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Done : _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Loading,
                };
            }));
        });
        return rxjs__WEBPACK_IMPORTED_MODULE_5__["merge"].apply(void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](subQueries));
    };
    PrometheusDatasource.prototype.panelsQuery = function (queries, activeTargets, end, requestId) {
        var _this = this;
        var observables = queries.map(function (query, index) {
            var target = activeTargets[index];
            var observable = null;
            if (query.instant) {
                observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["from"])(_this.performInstantQuery(query, end));
            }
            else {
                observable = Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["from"])(_this.performTimeSeriesQuery(query, query.start, query.end));
            }
            return observable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["filter"])(function (response) { return (response.cancelled ? false : true); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (response) {
                var data = _this.processResult(response, query, target, queries.length);
                return data;
            }));
        });
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["forkJoin"])(observables).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (results) {
            var data = results.reduce(function (result, current) {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](result, current);
            }, []);
            return {
                data: data,
                key: requestId,
                state: _grafana_data__WEBPACK_IMPORTED_MODULE_4__["LoadingState"].Done,
            };
        }));
    };
    PrometheusDatasource.prototype.createQuery = function (target, options, start, end) {
        var query = {
            hinting: target.hinting,
            instant: target.instant,
            step: 0,
            expr: '',
            requestId: target.requestId,
            refId: target.refId,
            start: 0,
            end: 0,
        };
        var range = Math.ceil(end - start);
        // options.interval is the dynamically calculated interval
        var interval = app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_3__["default"].interval_to_seconds(options.interval);
        // Minimum interval ("Min step"), if specified for the query or datasource. or same as interval otherwise
        var minInterval = app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_3__["default"].interval_to_seconds(this.templateSrv.replace(target.interval, options.scopedVars) || options.interval);
        var intervalFactor = target.intervalFactor || 1;
        // Adjust the interval to take into account any specified minimum and interval factor plus Prometheus limits
        var adjustedInterval = this.adjustInterval(interval, minInterval, range, intervalFactor);
        var scopedVars = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, options.scopedVars, this.getRangeScopedVars(options.range));
        // If the interval was adjusted, make a shallow copy of scopedVars with updated interval vars
        if (interval !== adjustedInterval) {
            interval = adjustedInterval;
            scopedVars = Object.assign({}, options.scopedVars, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ __interval: { text: interval + 's', value: interval + 's' }, __interval_ms: { text: interval * 1000, value: interval * 1000 } }, this.getRangeScopedVars(options.range)));
        }
        query.step = interval;
        var expr = target.expr;
        // Apply adhoc filters
        var adhocFilters = this.templateSrv.getAdhocFilters(this.name);
        expr = adhocFilters.reduce(function (acc, filter) {
            var key = filter.key, operator = filter.operator;
            var value = filter.value;
            if (operator === '=~' || operator === '!~') {
                value = prometheusRegularEscape(value);
            }
            return Object(_add_label_to_query__WEBPACK_IMPORTED_MODULE_10__["default"])(acc, key, value, operator);
        }, expr);
        // Only replace vars in expression after having (possibly) updated interval vars
        query.expr = this.templateSrv.replace(expr, scopedVars, this.interpolateQueryExpr);
        // Align query interval with step to allow query caching and to ensure
        // that about-same-time query results look the same.
        var adjusted = alignRange(start, end, query.step, this.timeSrv.timeRange().to.utcOffset() * 60);
        query.start = adjusted.start;
        query.end = adjusted.end;
        this._addTracingHeaders(query, options);
        return query;
    };
    PrometheusDatasource.prototype.adjustInterval = function (interval, minInterval, range, intervalFactor) {
        // Prometheus will drop queries that might return more than 11000 data points.
        // Calibrate interval if it is too small.
        if (interval !== 0 && range / intervalFactor / interval > 11000) {
            interval = Math.ceil(range / intervalFactor / 11000);
        }
        return Math.max(interval * intervalFactor, minInterval, 1);
    };
    PrometheusDatasource.prototype.performTimeSeriesQuery = function (query, start, end) {
        var _this = this;
        if (start > end) {
            throw { message: 'Invalid time range' };
        }
        var url = '/api/v1/query_range';
        var data = {
            query: query.expr,
            start: start,
            end: end,
            step: query.step,
        };
        if (this.queryTimeout) {
            data['timeout'] = this.queryTimeout;
        }
        return this._request(url, data, { requestId: query.requestId, headers: query.headers }).catch(function (err) {
            if (err.cancelled) {
                return err;
            }
            throw _this.handleErrors(err, query);
        });
    };
    PrometheusDatasource.prototype.performInstantQuery = function (query, time) {
        var _this = this;
        var url = '/api/v1/query';
        var data = {
            query: query.expr,
            time: time,
        };
        if (this.queryTimeout) {
            data['timeout'] = this.queryTimeout;
        }
        return this._request(url, data, { requestId: query.requestId, headers: query.headers }).catch(function (err) {
            if (err.cancelled) {
                return err;
            }
            throw _this.handleErrors(err, query);
        });
    };
    PrometheusDatasource.prototype.performSuggestQuery = function (query, cache) {
        var _this = this;
        if (cache === void 0) { cache = false; }
        var url = '/api/v1/label/__name__/values';
        if (cache && this.metricsNameCache && this.metricsNameCache.expire > Date.now()) {
            return this.$q.when(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(this.metricsNameCache.data, function (metricName) {
                return metricName.indexOf(query) !== 1;
            }));
        }
        return this.metadataRequest(url).then(function (result) {
            _this.metricsNameCache = {
                data: result.data.data,
                expire: Date.now() + 60 * 1000,
            };
            return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.filter(result.data.data, function (metricName) {
                return metricName.indexOf(query) !== 1;
            });
        });
    };
    PrometheusDatasource.prototype.metricFindQuery = function (query) {
        if (!query) {
            return this.$q.when([]);
        }
        var scopedVars = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ __interval: { text: this.interval, value: this.interval }, __interval_ms: { text: app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_3__["default"].interval_to_ms(this.interval), value: app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_3__["default"].interval_to_ms(this.interval) } }, this.getRangeScopedVars(this.timeSrv.timeRange()));
        var interpolated = this.templateSrv.replace(query, scopedVars, this.interpolateQueryExpr);
        var metricFindQuery = new _metric_find_query__WEBPACK_IMPORTED_MODULE_7__["default"](this, interpolated, this.timeSrv);
        return metricFindQuery.process();
    };
    PrometheusDatasource.prototype.getRangeScopedVars = function (range) {
        range = range || this.timeSrv.timeRange();
        var msRange = range.to.diff(range.from);
        var sRange = Math.round(msRange / 1000);
        var regularRange = app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_3__["default"].secondsToHms(msRange / 1000);
        return {
            __range_ms: { text: msRange, value: msRange },
            __range_s: { text: sRange, value: sRange },
            __range: { text: regularRange, value: regularRange },
        };
    };
    PrometheusDatasource.prototype.annotationQuery = function (options) {
        var annotation = options.annotation;
        var expr = annotation.expr || '';
        var tagKeys = annotation.tagKeys || '';
        var titleFormat = annotation.titleFormat || '';
        var textFormat = annotation.textFormat || '';
        if (!expr) {
            return this.$q.when([]);
        }
        var step = annotation.step || '60s';
        var start = this.getPrometheusTime(options.range.from, false);
        var end = this.getPrometheusTime(options.range.to, true);
        var queryOptions = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, options, { interval: step });
        // Unsetting min interval for accurate event resolution
        var minStep = '1s';
        var queryModel = {
            expr: expr,
            interval: minStep,
            refId: 'X',
            requestId: "prom-query-" + annotation.name,
        };
        var query = this.createQuery(queryModel, queryOptions, start, end);
        var self = this;
        return this.performTimeSeriesQuery(query, query.start, query.end).then(function (results) {
            var eventList = [];
            tagKeys = tagKeys.split(',');
            if (results.cancelled) {
                return [];
            }
            lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(results.data.data.result, function (series) {
                var e_2, _a;
                var tags = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.chain(series.metric)
                    .filter(function (v, k) {
                    return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(tagKeys, k);
                })
                    .value();
                var dupCheck = {};
                try {
                    for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](series.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var value = _c.value;
                        var valueIsTrue = value[1] === '1'; // e.g. ALERTS
                        if (valueIsTrue || annotation.useValueForTime) {
                            var event = {
                                annotation: annotation,
                                title: self.resultTransformer.renderTemplate(titleFormat, series.metric),
                                tags: tags,
                                text: self.resultTransformer.renderTemplate(textFormat, series.metric),
                            };
                            if (annotation.useValueForTime) {
                                var timestampValue = Math.floor(parseFloat(value[1]));
                                if (dupCheck[timestampValue]) {
                                    continue;
                                }
                                dupCheck[timestampValue] = true;
                                event.time = timestampValue;
                            }
                            else {
                                event.time = Math.floor(parseFloat(value[0])) * 1000;
                            }
                            eventList.push(event);
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            });
            return eventList;
        });
    };
    PrometheusDatasource.prototype.getTagKeys = function (options) {
        if (options === void 0) { options = {}; }
        var url = '/api/v1/labels';
        return this.metadataRequest(url).then(function (result) {
            return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(result.data.data, function (value) {
                return { text: value };
            });
        });
    };
    PrometheusDatasource.prototype.getTagValues = function (options) {
        if (options === void 0) { options = {}; }
        var url = '/api/v1/label/' + options.key + '/values';
        return this.metadataRequest(url).then(function (result) {
            return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(result.data.data, function (value) {
                return { text: value };
            });
        });
    };
    PrometheusDatasource.prototype.testDatasource = function () {
        var now = new Date().getTime();
        var query = { expr: '1+1' };
        return this.performInstantQuery(query, now / 1000).then(function (response) {
            if (response.data.status === 'success') {
                return { status: 'success', message: 'Data source is working' };
            }
            else {
                return { status: 'error', message: response.error };
            }
        });
    };
    PrometheusDatasource.prototype.getExploreState = function (queries) {
        var _this = this;
        var state = { datasource: this.name };
        if (queries && queries.length > 0) {
            var expandedQueries = queries.map(function (query) {
                var expandedQuery = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, query, { expr: _this.templateSrv.replace(query.expr, {}, _this.interpolateQueryExpr), context: 'explore' });
                return expandedQuery;
            });
            state = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, state, { queries: expandedQueries });
        }
        return state;
    };
    PrometheusDatasource.prototype.getQueryHints = function (query, result) {
        return Object(_query_hints__WEBPACK_IMPORTED_MODULE_11__["getQueryHints"])(query.expr || '', result, this);
    };
    PrometheusDatasource.prototype.loadRules = function () {
        var _this = this;
        this.metadataRequest('/api/v1/rules')
            .then(function (res) { return res.data || res.json(); })
            .then(function (body) {
            var groups = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(body, ['data', 'groups']);
            if (groups) {
                _this.ruleMappings = extractRuleMappingFromGroups(groups);
            }
        })
            .catch(function (e) {
            console.log('Rules API is experimental. Ignore next error.');
            console.error(e);
        });
    };
    PrometheusDatasource.prototype.modifyQuery = function (query, action) {
        var expression = query.expr || '';
        switch (action.type) {
            case 'ADD_FILTER': {
                expression = Object(_add_label_to_query__WEBPACK_IMPORTED_MODULE_10__["default"])(expression, action.key, action.value);
                break;
            }
            case 'ADD_HISTOGRAM_QUANTILE': {
                expression = "histogram_quantile(0.95, sum(rate(" + expression + "[5m])) by (le))";
                break;
            }
            case 'ADD_RATE': {
                expression = "rate(" + expression + "[5m])";
                break;
            }
            case 'ADD_SUM': {
                expression = "sum(" + expression.trim() + ") by ($1)";
                break;
            }
            case 'EXPAND_RULES': {
                if (action.mapping) {
                    expression = Object(_language_utils__WEBPACK_IMPORTED_MODULE_12__["expandRecordingRules"])(expression, action.mapping);
                }
                break;
            }
            default:
                break;
        }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, query, { expr: expression });
    };
    PrometheusDatasource.prototype.getPrometheusTime = function (date, roundUp) {
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isString(date)) {
            date = _grafana_data__WEBPACK_IMPORTED_MODULE_4__["dateMath"].parse(date, roundUp);
        }
        return Math.ceil(date.valueOf() / 1000);
    };
    PrometheusDatasource.prototype.getTimeRange = function () {
        var range = this.timeSrv.timeRange();
        return {
            start: this.getPrometheusTime(range.from, false),
            end: this.getPrometheusTime(range.to, true),
        };
    };
    PrometheusDatasource.prototype.getOriginalMetricName = function (labelData) {
        return this.resultTransformer.getOriginalMetricName(labelData);
    };
    return PrometheusDatasource;
}(_grafana_ui__WEBPACK_IMPORTED_MODULE_14__["DataSourceApi"]));

/**
 * Align query range to step.
 * Rounds start and end down to a multiple of step.
 * @param start Timestamp marking the beginning of the range.
 * @param end Timestamp marking the end of the range.
 * @param step Interval to align start and end with.
 * @param utcOffsetSec Number of seconds current timezone is offset from UTC
 */
function alignRange(start, end, step, utcOffsetSec) {
    var alignedEnd = Math.floor((end + utcOffsetSec) / step) * step - utcOffsetSec;
    var alignedStart = Math.floor((start + utcOffsetSec) / step) * step - utcOffsetSec;
    return {
        end: alignedEnd,
        start: alignedStart,
    };
}
function extractRuleMappingFromGroups(groups) {
    return groups.reduce(function (mapping, group) {
        return group.rules
            .filter(function (rule) { return rule.type === 'recording'; })
            .reduce(function (acc, rule) {
            var _a;
            return (tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, acc, (_a = {}, _a[rule.name] = rule.query, _a)));
        }, mapping);
    }, {});
}
function prometheusRegularEscape(value) {
    if (typeof value === 'string') {
        return value.replace(/'/g, "\\\\'");
    }
    return value;
}
function prometheusSpecialRegexEscape(value) {
    if (typeof value === 'string') {
        return prometheusRegularEscape(value.replace(/\\/g, '\\\\\\\\').replace(/[$^*{}\[\]+?.()|]/g, '\\\\$&'));
    }
    return value;
}


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/language_provider.ts":
/*!***********************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/language_provider.ts ***!
  \***********************************************************************/
/*! exports provided: addHistoryMetadata, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addHistoryMetadata", function() { return addHistoryMetadata; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _language_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./language_utils */ "./public/app/plugins/datasource/prometheus/language_utils.ts");
/* harmony import */ var _promql__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./promql */ "./public/app/plugins/datasource/prometheus/promql.ts");






var DEFAULT_KEYS = ['job', 'instance'];
var EMPTY_SELECTOR = '{}';
var HISTORY_ITEM_COUNT = 5;
var HISTORY_COUNT_CUTOFF = 1000 * 60 * 60 * 24; // 24h
var wrapLabel = function (label) { return ({ label: label }); };
var setFunctionKind = function (suggestion) {
    suggestion.kind = 'function';
    return suggestion;
};
function addHistoryMetadata(item, history) {
    var cutoffTs = Date.now() - HISTORY_COUNT_CUTOFF;
    var historyForItem = history.filter(function (h) { return h.ts > cutoffTs && h.query === item.label; });
    var count = historyForItem.length;
    var recent = historyForItem[0];
    var hint = "Queried " + count + " times in the last 24h.";
    if (recent) {
        var lastQueried = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTime"])(recent.ts).fromNow();
        hint = hint + " Last queried " + lastQueried + ".";
    }
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, item, { documentation: hint });
}
var PromQlLanguageProvider = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](PromQlLanguageProvider, _super);
    function PromQlLanguageProvider(datasource, initialValues) {
        var _this = _super.call(this) || this;
        // Strip syntax chars
        _this.cleanText = function (s) { return s.replace(/[{}[\]="(),!~+\-*/^%]/g, '').trim(); };
        _this.request = function (url) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var res, body, error_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.datasource.metadataRequest(url)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, (res.data || res.json())];
                    case 2:
                        body = _a.sent();
                        return [2 /*return*/, body.data];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, []];
                }
            });
        }); };
        _this.start = function () {
            if (!_this.startTask) {
                _this.startTask = _this.fetchMetrics();
            }
            return _this.startTask;
        };
        _this.fetchMetrics = function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.fetchMetricNames()];
                    case 1:
                        _a.metrics = _b.sent();
                        this.processHistogramMetrics(this.metrics);
                        return [2 /*return*/, Promise.resolve([])];
                }
            });
        }); };
        _this.fetchMetricNames = function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, Promise, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.request('/api/v1/label/__name__/values')];
            });
        }); };
        _this.processHistogramMetrics = function (data) {
            var values = Object(_language_utils__WEBPACK_IMPORTED_MODULE_4__["processHistogramLabels"])(data).values;
            if (values && values['__name__']) {
                _this.histogramMetrics = values['__name__'].slice().sort();
            }
        };
        _this.provideCompletionItems = function (_a, context) {
            var prefix = _a.prefix, text = _a.text, value = _a.value, labelKey = _a.labelKey, wrapperClasses = _a.wrapperClasses;
            if (context === void 0) { context = { history: [] }; }
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, Promise, function () {
                var empty, selectedLines, currentLine, nextCharacter, tokenRecognized, prefixUnrecognized, noSuffix, safeEmptyPrefix, operatorsPattern, isNextOperand;
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                    empty = value.document.text.length === 0;
                    selectedLines = value.document.getTextsAtRange(value.selection);
                    currentLine = selectedLines.size === 1 ? selectedLines.first().getText() : null;
                    nextCharacter = currentLine ? currentLine[value.selection.anchor.offset] : null;
                    tokenRecognized = wrapperClasses.length > 3;
                    prefixUnrecognized = prefix && !tokenRecognized;
                    noSuffix = !nextCharacter || nextCharacter === ')';
                    safeEmptyPrefix = prefix === '' && !text.match(/^[\]})\s]+$/) && noSuffix;
                    operatorsPattern = /[+\-*/^%]/;
                    isNextOperand = text.match(operatorsPattern);
                    // Determine candidates by CSS context
                    if (wrapperClasses.includes('context-range')) {
                        // Suggestions for metric[|]
                        return [2 /*return*/, this.getRangeCompletionItems()];
                    }
                    else if (wrapperClasses.includes('context-labels')) {
                        // Suggestions for metric{|} and metric{foo=|}, as well as metric-independent label queries like {|}
                        return [2 /*return*/, this.getLabelCompletionItems({ prefix: prefix, text: text, value: value, labelKey: labelKey, wrapperClasses: wrapperClasses })];
                    }
                    else if (wrapperClasses.includes('context-aggregation')) {
                        // Suggestions for sum(metric) by (|)
                        return [2 /*return*/, this.getAggregationCompletionItems({ prefix: prefix, text: text, value: value, labelKey: labelKey, wrapperClasses: wrapperClasses })];
                    }
                    else if (empty) {
                        // Suggestions for empty query field
                        return [2 /*return*/, this.getEmptyCompletionItems(context)];
                    }
                    else if ((prefixUnrecognized && noSuffix) || safeEmptyPrefix || isNextOperand) {
                        // Show term suggestions in a couple of scenarios
                        return [2 /*return*/, this.getTermCompletionItems()];
                    }
                    return [2 /*return*/, {
                            suggestions: [],
                        }];
                });
            });
        };
        _this.getEmptyCompletionItems = function (context) {
            var history = context.history;
            var suggestions = [];
            if (history && history.length) {
                var historyItems = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.chain(history)
                    .map(function (h) { return h.query.expr; })
                    .filter()
                    .uniq()
                    .take(HISTORY_ITEM_COUNT)
                    .map(wrapLabel)
                    .map(function (item) { return addHistoryMetadata(item, history); })
                    .value();
                suggestions.push({
                    prefixMatch: true,
                    skipSort: true,
                    label: 'History',
                    items: historyItems,
                });
            }
            var termCompletionItems = _this.getTermCompletionItems();
            suggestions.push.apply(suggestions, tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](termCompletionItems.suggestions));
            return { suggestions: suggestions };
        };
        _this.getTermCompletionItems = function () {
            var metrics = _this.metrics;
            var suggestions = [];
            suggestions.push({
                prefixMatch: true,
                label: 'Functions',
                items: _promql__WEBPACK_IMPORTED_MODULE_5__["FUNCTIONS"].map(setFunctionKind),
            });
            if (metrics && metrics.length) {
                suggestions.push({
                    label: 'Metrics',
                    items: metrics.map(wrapLabel),
                });
            }
            return { suggestions: suggestions };
        };
        _this.getAggregationCompletionItems = function (_a) {
            var value = _a.value;
            var refresher = null;
            var suggestions = [];
            // Stitch all query lines together to support multi-line queries
            var queryOffset;
            var queryText = value.document.getBlocks().reduce(function (text, block) {
                var blockText = block.getText();
                if (value.anchorBlock.key === block.key) {
                    // Newline characters are not accounted for but this is irrelevant
                    // for the purpose of extracting the selector string
                    queryOffset = value.selection.anchor.offset + text.length;
                }
                return text + blockText;
            }, '');
            // Try search for selector part on the left-hand side, such as `sum (m) by (l)`
            var openParensAggregationIndex = queryText.lastIndexOf('(', queryOffset);
            var openParensSelectorIndex = queryText.lastIndexOf('(', openParensAggregationIndex - 1);
            var closeParensSelectorIndex = queryText.indexOf(')', openParensSelectorIndex);
            // Try search for selector part of an alternate aggregation clause, such as `sum by (l) (m)`
            if (openParensSelectorIndex === -1) {
                var closeParensAggregationIndex = queryText.indexOf(')', queryOffset);
                closeParensSelectorIndex = queryText.indexOf(')', closeParensAggregationIndex + 1);
                openParensSelectorIndex = queryText.lastIndexOf('(', closeParensSelectorIndex);
            }
            var result = {
                refresher: refresher,
                suggestions: suggestions,
                context: 'context-aggregation',
            };
            // Suggestions are useless for alternative aggregation clauses without a selector in context
            if (openParensSelectorIndex === -1) {
                return result;
            }
            // Range vector syntax not accounted for by subsequent parse so discard it if present
            var selectorString = queryText
                .slice(openParensSelectorIndex + 1, closeParensSelectorIndex)
                .replace(/\[[^\]]+\]$/, '');
            var selector = Object(_language_utils__WEBPACK_IMPORTED_MODULE_4__["parseSelector"])(selectorString, selectorString.length - 2).selector;
            var labelKeys = _this.labelKeys[selector];
            if (labelKeys && !_this.timeRangeChanged()) {
                suggestions.push({ label: 'Labels', items: labelKeys.map(wrapLabel) });
            }
            else {
                result.refresher = _this.fetchSeriesLabels(selector);
            }
            return result;
        };
        _this.getLabelCompletionItems = function (_a) {
            var text = _a.text, wrapperClasses = _a.wrapperClasses, labelKey = _a.labelKey, value = _a.value;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, Promise, function () {
                var line, cursorOffset, selector, parsedSelector, containsMetric, existingKeys, suggestions, context, labelValues, labelKeys, possibleKeys, newItems, newSuggestion;
                var _this = this;
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            line = value.anchorBlock.getText();
                            cursorOffset = value.selection.anchor.offset;
                            try {
                                parsedSelector = Object(_language_utils__WEBPACK_IMPORTED_MODULE_4__["parseSelector"])(line, cursorOffset);
                                selector = parsedSelector.selector;
                            }
                            catch (_c) {
                                selector = EMPTY_SELECTOR;
                            }
                            containsMetric = selector.includes('__name__=');
                            existingKeys = parsedSelector ? parsedSelector.labelKeys : [];
                            if (!(selector && (!this.labelValues[selector] || this.timeRangeChanged()))) return [3 /*break*/, 4];
                            if (!(selector === EMPTY_SELECTOR)) return [3 /*break*/, 2];
                            // Query label values for default labels
                            return [4 /*yield*/, Promise.all(DEFAULT_KEYS.map(function (key) { return _this.fetchLabelValues(key); }))];
                        case 1:
                            // Query label values for default labels
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.fetchSeriesLabels(selector, !containsMetric)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            suggestions = [];
                            if ((text && text.match(/^!?=~?/)) || wrapperClasses.includes('attr-value')) {
                                // Label values
                                if (labelKey && this.labelValues[selector] && this.labelValues[selector][labelKey]) {
                                    labelValues = this.labelValues[selector][labelKey];
                                    context = 'context-label-values';
                                    suggestions.push({
                                        label: "Label values for \"" + labelKey + "\"",
                                        items: labelValues.map(wrapLabel),
                                    });
                                }
                            }
                            else {
                                labelKeys = this.labelKeys[selector] || (containsMetric ? null : DEFAULT_KEYS);
                                if (labelKeys) {
                                    possibleKeys = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.difference(labelKeys, existingKeys);
                                    if (possibleKeys.length) {
                                        context = 'context-labels';
                                        newItems = possibleKeys.map(function (key) { return ({ label: key }); });
                                        newSuggestion = { label: "Labels", items: newItems };
                                        suggestions.push(newSuggestion);
                                    }
                                }
                            }
                            return [2 /*return*/, { context: context, suggestions: suggestions }];
                    }
                });
            });
        };
        _this.fetchLabelValues = function (key) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var data, existingValues, values, e_1;
            var _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.request("/api/v1/label/" + key + "/values")];
                    case 1:
                        data = _b.sent();
                        existingValues = this.labelValues[EMPTY_SELECTOR];
                        values = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, existingValues, (_a = {}, _a[key] = data, _a));
                        this.labelValues[EMPTY_SELECTOR] = values;
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _b.sent();
                        console.error(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.fetchSeriesLabels = function (name, withName) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var tRange, data, _a, keys, values, e_2;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        tRange = this.datasource.getTimeRange();
                        return [4 /*yield*/, this.request("/api/v1/series?match[]=" + name + "&start=" + tRange['start'] + "&end=" + tRange['end'])];
                    case 1:
                        data = _b.sent();
                        _a = Object(_language_utils__WEBPACK_IMPORTED_MODULE_4__["processLabels"])(data, withName), keys = _a.keys, values = _a.values;
                        this.labelKeys[name] = keys;
                        this.labelValues[name] = values;
                        this.timeRange = tRange;
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _b.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        _this.datasource = datasource;
        _this.histogramMetrics = [];
        _this.timeRange = { start: 0, end: 0 };
        _this.labelKeys = {};
        _this.labelValues = {};
        _this.metrics = [];
        Object.assign(_this, initialValues);
        return _this;
    }
    Object.defineProperty(PromQlLanguageProvider.prototype, "syntax", {
        get: function () {
            return _promql__WEBPACK_IMPORTED_MODULE_5__["default"];
        },
        enumerable: true,
        configurable: true
    });
    PromQlLanguageProvider.prototype.getRangeCompletionItems = function () {
        return {
            context: 'context-range',
            suggestions: [
                {
                    label: 'Range vector',
                    items: tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](_promql__WEBPACK_IMPORTED_MODULE_5__["RATE_RANGES"]),
                },
            ],
        };
    };
    PromQlLanguageProvider.prototype.roundToMinutes = function (seconds) {
        return Math.floor(seconds / 60);
    };
    PromQlLanguageProvider.prototype.timeRangeChanged = function () {
        var dsRange = this.datasource.getTimeRange();
        return (this.roundToMinutes(dsRange.end) !== this.roundToMinutes(this.timeRange.end) ||
            this.roundToMinutes(dsRange.start) !== this.roundToMinutes(this.timeRange.start));
    };
    return PromQlLanguageProvider;
}(app_types_explore__WEBPACK_IMPORTED_MODULE_3__["LanguageProvider"]));
/* harmony default export */ __webpack_exports__["default"] = (PromQlLanguageProvider);


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/language_utils.ts":
/*!********************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/language_utils.ts ***!
  \********************************************************************/
/*! exports provided: RATE_RANGES, processHistogramLabels, processLabels, selectorRegexp, labelRegexp, parseSelector, expandRecordingRules */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RATE_RANGES", function() { return RATE_RANGES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processHistogramLabels", function() { return processHistogramLabels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processLabels", function() { return processLabels; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectorRegexp", function() { return selectorRegexp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "labelRegexp", function() { return labelRegexp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseSelector", function() { return parseSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expandRecordingRules", function() { return expandRecordingRules; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

var RATE_RANGES = ['1m', '5m', '10m', '30m', '1h'];
var processHistogramLabels = function (labels) {
    var result = [];
    var regexp = new RegExp('_bucket($|:)');
    for (var index = 0; index < labels.length; index++) {
        var label = labels[index];
        var isHistogramValue = regexp.test(label);
        if (isHistogramValue) {
            if (result.indexOf(label) === -1) {
                result.push(label);
            }
        }
    }
    return { values: { __name__: result } };
};
function processLabels(labels, withName) {
    if (withName === void 0) { withName = false; }
    var values = {};
    labels.forEach(function (l) {
        var __name__ = l.__name__, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](l, ["__name__"]);
        if (withName) {
            values['__name__'] = values['__name__'] || [];
            if (!values['__name__'].includes(__name__)) {
                values['__name__'].push(__name__);
            }
        }
        Object.keys(rest).forEach(function (key) {
            if (!values[key]) {
                values[key] = [];
            }
            if (!values[key].includes(rest[key])) {
                values[key].push(rest[key]);
            }
        });
    });
    return { values: values, keys: Object.keys(values) };
}
// const cleanSelectorRegexp = /\{(\w+="[^"\n]*?")(,\w+="[^"\n]*?")*\}/;
var selectorRegexp = /\{[^}]*?\}/;
var labelRegexp = /\b(\w+)(!?=~?)("[^"\n]*?")/g;
function parseSelector(query, cursorOffset) {
    if (cursorOffset === void 0) { cursorOffset = 1; }
    if (!query.match(selectorRegexp)) {
        // Special matcher for metrics
        if (query.match(/^[A-Za-z:][\w:]*$/)) {
            return {
                selector: "{__name__=\"" + query + "\"}",
                labelKeys: ['__name__'],
            };
        }
        throw new Error('Query must contain a selector: ' + query);
    }
    // Check if inside a selector
    var prefix = query.slice(0, cursorOffset);
    var prefixOpen = prefix.lastIndexOf('{');
    var prefixClose = prefix.lastIndexOf('}');
    if (prefixOpen === -1) {
        throw new Error('Not inside selector, missing open brace: ' + prefix);
    }
    if (prefixClose > -1 && prefixClose > prefixOpen) {
        throw new Error('Not inside selector, previous selector already closed: ' + prefix);
    }
    var suffix = query.slice(cursorOffset);
    var suffixCloseIndex = suffix.indexOf('}');
    var suffixClose = suffixCloseIndex + cursorOffset;
    var suffixOpenIndex = suffix.indexOf('{');
    var suffixOpen = suffixOpenIndex + cursorOffset;
    if (suffixClose === -1) {
        throw new Error('Not inside selector, missing closing brace in suffix: ' + suffix);
    }
    if (suffixOpenIndex > -1 && suffixOpen < suffixClose) {
        throw new Error('Not inside selector, next selector opens before this one closed: ' + suffix);
    }
    // Extract clean labels to form clean selector, incomplete labels are dropped
    var selector = query.slice(prefixOpen, suffixClose);
    var labels = {};
    selector.replace(labelRegexp, function (_, key, operator, value) {
        labels[key] = { value: value, operator: operator };
        return '';
    });
    // Add metric if there is one before the selector
    var metricPrefix = query.slice(0, prefixOpen);
    var metricMatch = metricPrefix.match(/[A-Za-z:][\w:]*$/);
    if (metricMatch) {
        labels['__name__'] = { value: "\"" + metricMatch[0] + "\"", operator: '=' };
    }
    // Build sorted selector
    var labelKeys = Object.keys(labels).sort();
    var cleanSelector = labelKeys.map(function (key) { return "" + key + labels[key].operator + labels[key].value; }).join(',');
    var selectorString = ['{', cleanSelector, '}'].join('');
    return { labelKeys: labelKeys, selector: selectorString };
}
function expandRecordingRules(query, mapping) {
    var ruleNames = Object.keys(mapping);
    var rulesRegex = new RegExp("(\\s|^)(" + ruleNames.join('|') + ")(\\s|$|\\(|\\[|\\{)", 'ig');
    return query.replace(rulesRegex, function (match, pre, name, post) { return "" + pre + mapping[name] + post; });
}


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/metric_find_query.ts":
/*!***********************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/metric_find_query.ts ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var PrometheusMetricFindQuery = /** @class */ (function () {
    function PrometheusMetricFindQuery(datasource, query, timeSrv) {
        this.datasource = datasource;
        this.query = query;
        this.datasource = datasource;
        this.query = query;
        this.range = timeSrv.timeRange();
    }
    PrometheusMetricFindQuery.prototype.process = function () {
        var labelNamesRegex = /^label_names\(\)\s*$/;
        var labelValuesRegex = /^label_values\((?:(.+),\s*)?([a-zA-Z_][a-zA-Z0-9_]*)\)\s*$/;
        var metricNamesRegex = /^metrics\((.+)\)\s*$/;
        var queryResultRegex = /^query_result\((.+)\)\s*$/;
        var labelNamesQuery = this.query.match(labelNamesRegex);
        if (labelNamesQuery) {
            return this.labelNamesQuery();
        }
        var labelValuesQuery = this.query.match(labelValuesRegex);
        if (labelValuesQuery) {
            if (labelValuesQuery[1]) {
                return this.labelValuesQuery(labelValuesQuery[2], labelValuesQuery[1]);
            }
            else {
                return this.labelValuesQuery(labelValuesQuery[2], null);
            }
        }
        var metricNamesQuery = this.query.match(metricNamesRegex);
        if (metricNamesQuery) {
            return this.metricNameQuery(metricNamesQuery[1]);
        }
        var queryResultQuery = this.query.match(queryResultRegex);
        if (queryResultQuery) {
            return this.queryResultQuery(queryResultQuery[1]);
        }
        // if query contains full metric name, return metric name and label list
        return this.metricNameAndLabelsQuery(this.query);
    };
    PrometheusMetricFindQuery.prototype.labelNamesQuery = function () {
        var url = '/api/v1/labels';
        return this.datasource.metadataRequest(url).then(function (result) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (value) {
                return { text: value };
            });
        });
    };
    PrometheusMetricFindQuery.prototype.labelValuesQuery = function (label, metric) {
        var url;
        if (!metric) {
            // return label values globally
            url = '/api/v1/label/' + label + '/values';
            return this.datasource.metadataRequest(url).then(function (result) {
                return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (value) {
                    return { text: value };
                });
            });
        }
        else {
            var start = this.datasource.getPrometheusTime(this.range.from, false);
            var end = this.datasource.getPrometheusTime(this.range.to, true);
            url = '/api/v1/series?match[]=' + encodeURIComponent(metric) + '&start=' + start + '&end=' + end;
            return this.datasource.metadataRequest(url).then(function (result) {
                var _labels = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (metric) {
                    return metric[label] || '';
                }).filter(function (label) {
                    return label !== '';
                });
                return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.uniq(_labels).map(function (metric) {
                    return {
                        text: metric,
                        expandable: true,
                    };
                });
            });
        }
    };
    PrometheusMetricFindQuery.prototype.metricNameQuery = function (metricFilterPattern) {
        var url = '/api/v1/label/__name__/values';
        return this.datasource.metadataRequest(url).then(function (result) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.chain(result.data.data)
                .filter(function (metricName) {
                var r = new RegExp(metricFilterPattern);
                return r.test(metricName);
            })
                .map(function (matchedMetricName) {
                return {
                    text: matchedMetricName,
                    expandable: true,
                };
            })
                .value();
        });
    };
    PrometheusMetricFindQuery.prototype.queryResultQuery = function (query) {
        var end = this.datasource.getPrometheusTime(this.range.to, true);
        var instantQuery = { expr: query };
        return this.datasource.performInstantQuery(instantQuery, end).then(function (result) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data.result, function (metricData) {
                var text = metricData.metric.__name__ || '';
                delete metricData.metric.__name__;
                text +=
                    '{' +
                        lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(metricData.metric, function (v, k) {
                            return k + '="' + v + '"';
                        }).join(',') +
                        '}';
                text += ' ' + metricData.value[1] + ' ' + metricData.value[0] * 1000;
                return {
                    text: text,
                    expandable: true,
                };
            });
        });
    };
    PrometheusMetricFindQuery.prototype.metricNameAndLabelsQuery = function (query) {
        var start = this.datasource.getPrometheusTime(this.range.from, false);
        var end = this.datasource.getPrometheusTime(this.range.to, true);
        var url = '/api/v1/series?match[]=' + encodeURIComponent(query) + '&start=' + start + '&end=' + end;
        var self = this;
        return this.datasource.metadataRequest(url).then(function (result) {
            return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(result.data.data, function (metric) {
                return {
                    text: self.datasource.getOriginalMetricName(metric),
                    expandable: true,
                };
            });
        });
    };
    return PrometheusMetricFindQuery;
}());
/* harmony default export */ __webpack_exports__["default"] = (PrometheusMetricFindQuery);


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/module.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/module.ts ***!
  \************************************************************/
/*! exports provided: Datasource, QueryEditor, ConfigCtrl, AnnotationsQueryCtrl, ExploreQueryField, ExploreStartPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationsQueryCtrl", function() { return PrometheusAnnotationsQueryCtrl; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/prometheus/datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["PrometheusDatasource"]; });

/* harmony import */ var _components_PromQueryEditor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/PromQueryEditor */ "./public/app/plugins/datasource/prometheus/components/PromQueryEditor.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryEditor", function() { return _components_PromQueryEditor__WEBPACK_IMPORTED_MODULE_1__["PromQueryEditor"]; });

/* harmony import */ var _config_ctrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config_ctrl */ "./public/app/plugins/datasource/prometheus/config_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return _config_ctrl__WEBPACK_IMPORTED_MODULE_2__["PrometheusConfigCtrl"]; });

/* harmony import */ var _components_PromCheatSheet__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/PromCheatSheet */ "./public/app/plugins/datasource/prometheus/components/PromCheatSheet.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExploreStartPage", function() { return _components_PromCheatSheet__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _components_PromQueryField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/PromQueryField */ "./public/app/plugins/datasource/prometheus/components/PromQueryField.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExploreQueryField", function() { return _components_PromQueryField__WEBPACK_IMPORTED_MODULE_4__["default"]; });






var PrometheusAnnotationsQueryCtrl = /** @class */ (function () {
    function PrometheusAnnotationsQueryCtrl() {
    }
    PrometheusAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return PrometheusAnnotationsQueryCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/promql.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/promql.ts ***!
  \************************************************************/
/*! exports provided: RATE_RANGES, OPERATORS, FUNCTIONS, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RATE_RANGES", function() { return RATE_RANGES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPERATORS", function() { return OPERATORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FUNCTIONS", function() { return FUNCTIONS; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* tslint:disable max-line-length */

var RATE_RANGES = [
    { label: '$__interval', sortText: '$__interval' },
    { label: '1m', sortText: '00:01:00' },
    { label: '5m', sortText: '00:05:00' },
    { label: '10m', sortText: '00:10:00' },
    { label: '30m', sortText: '00:30:00' },
    { label: '1h', sortText: '01:00:00' },
    { label: '1d', sortText: '24:00:00' },
];
var OPERATORS = ['by', 'group_left', 'group_right', 'ignoring', 'on', 'offset', 'without'];
var AGGREGATION_OPERATORS = [
    {
        label: 'sum',
        insertText: 'sum',
        documentation: 'Calculate sum over dimensions',
    },
    {
        label: 'min',
        insertText: 'min',
        documentation: 'Select minimum over dimensions',
    },
    {
        label: 'max',
        insertText: 'max',
        documentation: 'Select maximum over dimensions',
    },
    {
        label: 'avg',
        insertText: 'avg',
        documentation: 'Calculate the average over dimensions',
    },
    {
        label: 'stddev',
        insertText: 'stddev',
        documentation: 'Calculate population standard deviation over dimensions',
    },
    {
        label: 'stdvar',
        insertText: 'stdvar',
        documentation: 'Calculate population standard variance over dimensions',
    },
    {
        label: 'count',
        insertText: 'count',
        documentation: 'Count number of elements in the vector',
    },
    {
        label: 'count_values',
        insertText: 'count_values',
        documentation: 'Count number of elements with the same value',
    },
    {
        label: 'bottomk',
        insertText: 'bottomk',
        documentation: 'Smallest k elements by sample value',
    },
    {
        label: 'topk',
        insertText: 'topk',
        documentation: 'Largest k elements by sample value',
    },
    {
        label: 'quantile',
        insertText: 'quantile',
        documentation: 'Calculate φ-quantile (0 ≤ φ ≤ 1) over dimensions',
    },
];
var FUNCTIONS = tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](AGGREGATION_OPERATORS, [
    {
        insertText: 'abs',
        label: 'abs',
        detail: 'abs(v instant-vector)',
        documentation: 'Returns the input vector with all sample values converted to their absolute value.',
    },
    {
        insertText: 'absent',
        label: 'absent',
        detail: 'absent(v instant-vector)',
        documentation: 'Returns an empty vector if the vector passed to it has any elements and a 1-element vector with the value 1 if the vector passed to it has no elements. This is useful for alerting on when no time series exist for a given metric name and label combination.',
    },
    {
        insertText: 'ceil',
        label: 'ceil',
        detail: 'ceil(v instant-vector)',
        documentation: 'Rounds the sample values of all elements in `v` up to the nearest integer.',
    },
    {
        insertText: 'changes',
        label: 'changes',
        detail: 'changes(v range-vector)',
        documentation: 'For each input time series, `changes(v range-vector)` returns the number of times its value has changed within the provided time range as an instant vector.',
    },
    {
        insertText: 'clamp_max',
        label: 'clamp_max',
        detail: 'clamp_max(v instant-vector, max scalar)',
        documentation: 'Clamps the sample values of all elements in `v` to have an upper limit of `max`.',
    },
    {
        insertText: 'clamp_min',
        label: 'clamp_min',
        detail: 'clamp_min(v instant-vector, min scalar)',
        documentation: 'Clamps the sample values of all elements in `v` to have a lower limit of `min`.',
    },
    {
        insertText: 'count_scalar',
        label: 'count_scalar',
        detail: 'count_scalar(v instant-vector)',
        documentation: 'Returns the number of elements in a time series vector as a scalar. This is in contrast to the `count()` aggregation operator, which always returns a vector (an empty one if the input vector is empty) and allows grouping by labels via a `by` clause.',
    },
    {
        insertText: 'day_of_month',
        label: 'day_of_month',
        detail: 'day_of_month(v=vector(time()) instant-vector)',
        documentation: 'Returns the day of the month for each of the given times in UTC. Returned values are from 1 to 31.',
    },
    {
        insertText: 'day_of_week',
        label: 'day_of_week',
        detail: 'day_of_week(v=vector(time()) instant-vector)',
        documentation: 'Returns the day of the week for each of the given times in UTC. Returned values are from 0 to 6, where 0 means Sunday etc.',
    },
    {
        insertText: 'days_in_month',
        label: 'days_in_month',
        detail: 'days_in_month(v=vector(time()) instant-vector)',
        documentation: 'Returns number of days in the month for each of the given times in UTC. Returned values are from 28 to 31.',
    },
    {
        insertText: 'delta',
        label: 'delta',
        detail: 'delta(v range-vector)',
        documentation: 'Calculates the difference between the first and last value of each time series element in a range vector `v`, returning an instant vector with the given deltas and equivalent labels. The delta is extrapolated to cover the full time range as specified in the range vector selector, so that it is possible to get a non-integer result even if the sample values are all integers.',
    },
    {
        insertText: 'deriv',
        label: 'deriv',
        detail: 'deriv(v range-vector)',
        documentation: 'Calculates the per-second derivative of the time series in a range vector `v`, using simple linear regression.',
    },
    {
        insertText: 'drop_common_labels',
        label: 'drop_common_labels',
        detail: 'drop_common_labels(instant-vector)',
        documentation: 'Drops all labels that have the same name and value across all series in the input vector.',
    },
    {
        insertText: 'exp',
        label: 'exp',
        detail: 'exp(v instant-vector)',
        documentation: 'Calculates the exponential function for all elements in `v`.\nSpecial cases are:\n* `Exp(+Inf) = +Inf` \n* `Exp(NaN) = NaN`',
    },
    {
        insertText: 'floor',
        label: 'floor',
        detail: 'floor(v instant-vector)',
        documentation: 'Rounds the sample values of all elements in `v` down to the nearest integer.',
    },
    {
        insertText: 'histogram_quantile',
        label: 'histogram_quantile',
        detail: 'histogram_quantile(φ float, b instant-vector)',
        documentation: 'Calculates the φ-quantile (0 ≤ φ ≤ 1) from the buckets `b` of a histogram. The samples in `b` are the counts of observations in each bucket. Each sample must have a label `le` where the label value denotes the inclusive upper bound of the bucket. (Samples without such a label are silently ignored.) The histogram metric type automatically provides time series with the `_bucket` suffix and the appropriate labels.',
    },
    {
        insertText: 'holt_winters',
        label: 'holt_winters',
        detail: 'holt_winters(v range-vector, sf scalar, tf scalar)',
        documentation: 'Produces a smoothed value for time series based on the range in `v`. The lower the smoothing factor `sf`, the more importance is given to old data. The higher the trend factor `tf`, the more trends in the data is considered. Both `sf` and `tf` must be between 0 and 1.',
    },
    {
        insertText: 'hour',
        label: 'hour',
        detail: 'hour(v=vector(time()) instant-vector)',
        documentation: 'Returns the hour of the day for each of the given times in UTC. Returned values are from 0 to 23.',
    },
    {
        insertText: 'idelta',
        label: 'idelta',
        detail: 'idelta(v range-vector)',
        documentation: 'Calculates the difference between the last two samples in the range vector `v`, returning an instant vector with the given deltas and equivalent labels.',
    },
    {
        insertText: 'increase',
        label: 'increase',
        detail: 'increase(v range-vector)',
        documentation: 'Calculates the increase in the time series in the range vector. Breaks in monotonicity (such as counter resets due to target restarts) are automatically adjusted for. The increase is extrapolated to cover the full time range as specified in the range vector selector, so that it is possible to get a non-integer result even if a counter increases only by integer increments.',
    },
    {
        insertText: 'irate',
        label: 'irate',
        detail: 'irate(v range-vector)',
        documentation: 'Calculates the per-second instant rate of increase of the time series in the range vector. This is based on the last two data points. Breaks in monotonicity (such as counter resets due to target restarts) are automatically adjusted for.',
    },
    {
        insertText: 'label_replace',
        label: 'label_replace',
        detail: 'label_replace(v instant-vector, dst_label string, replacement string, src_label string, regex string)',
        documentation: "For each timeseries in `v`, `label_replace(v instant-vector, dst_label string, replacement string, src_label string, regex string)`  matches the regular expression `regex` against the label `src_label`.  If it matches, then the timeseries is returned with the label `dst_label` replaced by the expansion of `replacement`. `$1` is replaced with the first matching subgroup, `$2` with the second etc. If the regular expression doesn't match then the timeseries is returned unchanged.",
    },
    {
        insertText: 'ln',
        label: 'ln',
        detail: 'ln(v instant-vector)',
        documentation: 'calculates the natural logarithm for all elements in `v`.\nSpecial cases are:\n * `ln(+Inf) = +Inf`\n * `ln(0) = -Inf`\n * `ln(x < 0) = NaN`\n * `ln(NaN) = NaN`',
    },
    {
        insertText: 'log2',
        label: 'log2',
        detail: 'log2(v instant-vector)',
        documentation: 'Calculates the binary logarithm for all elements in `v`. The special cases are equivalent to those in `ln`.',
    },
    {
        insertText: 'log10',
        label: 'log10',
        detail: 'log10(v instant-vector)',
        documentation: 'Calculates the decimal logarithm for all elements in `v`. The special cases are equivalent to those in `ln`.',
    },
    {
        insertText: 'minute',
        label: 'minute',
        detail: 'minute(v=vector(time()) instant-vector)',
        documentation: 'Returns the minute of the hour for each of the given times in UTC. Returned values are from 0 to 59.',
    },
    {
        insertText: 'month',
        label: 'month',
        detail: 'month(v=vector(time()) instant-vector)',
        documentation: 'Returns the month of the year for each of the given times in UTC. Returned values are from 1 to 12, where 1 means January etc.',
    },
    {
        insertText: 'predict_linear',
        label: 'predict_linear',
        detail: 'predict_linear(v range-vector, t scalar)',
        documentation: 'Predicts the value of time series `t` seconds from now, based on the range vector `v`, using simple linear regression.',
    },
    {
        insertText: 'rate',
        label: 'rate',
        detail: 'rate(v range-vector)',
        documentation: "Calculates the per-second average rate of increase of the time series in the range vector. Breaks in monotonicity (such as counter resets due to target restarts) are automatically adjusted for. Also, the calculation extrapolates to the ends of the time range, allowing for missed scrapes or imperfect alignment of scrape cycles with the range's time period.",
    },
    {
        insertText: 'resets',
        label: 'resets',
        detail: 'resets(v range-vector)',
        documentation: 'For each input time series, `resets(v range-vector)` returns the number of counter resets within the provided time range as an instant vector. Any decrease in the value between two consecutive samples is interpreted as a counter reset.',
    },
    {
        insertText: 'round',
        label: 'round',
        detail: 'round(v instant-vector, to_nearest=1 scalar)',
        documentation: 'Rounds the sample values of all elements in `v` to the nearest integer. Ties are resolved by rounding up. The optional `to_nearest` argument allows specifying the nearest multiple to which the sample values should be rounded. This multiple may also be a fraction.',
    },
    {
        insertText: 'scalar',
        label: 'scalar',
        detail: 'scalar(v instant-vector)',
        documentation: 'Given a single-element input vector, `scalar(v instant-vector)` returns the sample value of that single element as a scalar. If the input vector does not have exactly one element, `scalar` will return `NaN`.',
    },
    {
        insertText: 'sort',
        label: 'sort',
        detail: 'sort(v instant-vector)',
        documentation: 'Returns vector elements sorted by their sample values, in ascending order.',
    },
    {
        insertText: 'sort_desc',
        label: 'sort_desc',
        detail: 'sort_desc(v instant-vector)',
        documentation: 'Returns vector elements sorted by their sample values, in descending order.',
    },
    {
        insertText: 'sqrt',
        label: 'sqrt',
        detail: 'sqrt(v instant-vector)',
        documentation: 'Calculates the square root of all elements in `v`.',
    },
    {
        insertText: 'time',
        label: 'time',
        detail: 'time()',
        documentation: 'Returns the number of seconds since January 1, 1970 UTC. Note that this does not actually return the current time, but the time at which the expression is to be evaluated.',
    },
    {
        insertText: 'vector',
        label: 'vector',
        detail: 'vector(s scalar)',
        documentation: 'Returns the scalar `s` as a vector with no labels.',
    },
    {
        insertText: 'year',
        label: 'year',
        detail: 'year(v=vector(time()) instant-vector)',
        documentation: 'Returns the year for each of the given times in UTC.',
    },
    {
        insertText: 'avg_over_time',
        label: 'avg_over_time',
        detail: 'avg_over_time(range-vector)',
        documentation: 'The average value of all points in the specified interval.',
    },
    {
        insertText: 'min_over_time',
        label: 'min_over_time',
        detail: 'min_over_time(range-vector)',
        documentation: 'The minimum value of all points in the specified interval.',
    },
    {
        insertText: 'max_over_time',
        label: 'max_over_time',
        detail: 'max_over_time(range-vector)',
        documentation: 'The maximum value of all points in the specified interval.',
    },
    {
        insertText: 'sum_over_time',
        label: 'sum_over_time',
        detail: 'sum_over_time(range-vector)',
        documentation: 'The sum of all values in the specified interval.',
    },
    {
        insertText: 'count_over_time',
        label: 'count_over_time',
        detail: 'count_over_time(range-vector)',
        documentation: 'The count of all values in the specified interval.',
    },
    {
        insertText: 'quantile_over_time',
        label: 'quantile_over_time',
        detail: 'quantile_over_time(scalar, range-vector)',
        documentation: 'The φ-quantile (0 ≤ φ ≤ 1) of the values in the specified interval.',
    },
    {
        insertText: 'stddev_over_time',
        label: 'stddev_over_time',
        detail: 'stddev_over_time(range-vector)',
        documentation: 'The population standard deviation of the values in the specified interval.',
    },
    {
        insertText: 'stdvar_over_time',
        label: 'stdvar_over_time',
        detail: 'stdvar_over_time(range-vector)',
        documentation: 'The population standard variance of the values in the specified interval.',
    },
]);
var tokenizer = {
    comment: {
        pattern: /(^|[^\n])#.*/,
        lookbehind: true,
    },
    'context-aggregation': {
        pattern: /((by|without)\s*)\([^)]*\)/,
        lookbehind: true,
        inside: {
            'label-key': {
                pattern: /[^(),\s][^,)]*[^),\s]*/,
                alias: 'attr-name',
            },
            punctuation: /[()]/,
        },
    },
    'context-labels': {
        pattern: /\{[^}]*(?=})/,
        inside: {
            'label-key': {
                pattern: /[a-z_]\w*(?=\s*(=|!=|=~|!~))/,
                alias: 'attr-name',
            },
            'label-value': {
                pattern: /"(?:\\.|[^\\"])*"/,
                greedy: true,
                alias: 'attr-value',
            },
            punctuation: /[{]/,
        },
    },
    function: new RegExp("\\b(?:" + FUNCTIONS.map(function (f) { return f.label; }).join('|') + ")(?=\\s*\\()", 'i'),
    'context-range': [
        {
            pattern: /\[[^\]]*(?=])/,
            inside: {
                'range-duration': {
                    pattern: /\b\d+[smhdwy]\b/i,
                    alias: 'number',
                },
            },
        },
        {
            pattern: /(offset\s+)\w+/,
            lookbehind: true,
            inside: {
                'range-duration': {
                    pattern: /\b\d+[smhdwy]\b/i,
                    alias: 'number',
                },
            },
        },
    ],
    number: /\b-?\d+((\.\d*)?([eE][+-]?\d+)?)?\b/,
    operator: new RegExp("/[-+*/=%^~]|&&?|\\|?\\||!=?|<(?:=>?|<|>)?|>[>=]?|\\b(?:" + OPERATORS.join('|') + ")\\b", 'i'),
    punctuation: /[{};()`,.]/,
};
/* harmony default export */ __webpack_exports__["default"] = (tokenizer);


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/query_hints.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/query_hints.ts ***!
  \*****************************************************************/
/*! exports provided: SUM_HINT_THRESHOLD_COUNT, getQueryHints */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUM_HINT_THRESHOLD_COUNT", function() { return SUM_HINT_THRESHOLD_COUNT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryHints", function() { return getQueryHints; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Number of time series results needed before starting to suggest sum aggregation hints
 */
var SUM_HINT_THRESHOLD_COUNT = 20;
function getQueryHints(query, series, datasource) {
    var hints = [];
    // ..._bucket metric needs a histogram_quantile()
    var histogramMetric = query.trim().match(/^\w+_bucket$/);
    if (histogramMetric) {
        var label = 'Time series has buckets, you probably wanted a histogram.';
        hints.push({
            type: 'HISTOGRAM_QUANTILE',
            label: label,
            fix: {
                label: 'Fix by adding histogram_quantile().',
                action: {
                    type: 'ADD_HISTOGRAM_QUANTILE',
                    query: query,
                },
            },
        });
    }
    // Check for monotonicity on series (table results are being ignored here)
    if (series && series.length > 0) {
        series.forEach(function (s) {
            var datapoints = s.datapoints || s.rows || [];
            if (query.indexOf('rate(') === -1 && datapoints.length > 1) {
                var increasing_1 = false;
                var nonNullData_1 = datapoints.filter(function (dp) { return dp[0] !== null; });
                var monotonic = nonNullData_1.every(function (dp, index) {
                    if (index === 0) {
                        return true;
                    }
                    increasing_1 = increasing_1 || dp[0] > nonNullData_1[index - 1][0];
                    // monotonic?
                    return dp[0] >= nonNullData_1[index - 1][0];
                });
                if (increasing_1 && monotonic) {
                    var simpleMetric = query.trim().match(/^\w+$/);
                    var label = 'Time series is monotonically increasing.';
                    var fix = void 0;
                    if (simpleMetric) {
                        fix = {
                            label: 'Fix by adding rate().',
                            action: {
                                type: 'ADD_RATE',
                                query: query,
                            },
                        };
                    }
                    else {
                        label = label + " Try applying a rate() function.";
                    }
                    hints.push({
                        type: 'APPLY_RATE',
                        label: label,
                        fix: fix,
                    });
                }
            }
        });
    }
    // Check for recording rules expansion
    if (datasource && datasource.ruleMappings) {
        var mapping_1 = datasource.ruleMappings;
        var mappingForQuery = Object.keys(mapping_1).reduce(function (acc, ruleName) {
            var _a;
            if (query.search(ruleName) > -1) {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, acc, (_a = {}, _a[ruleName] = mapping_1[ruleName], _a));
            }
            return acc;
        }, {});
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.size(mappingForQuery) > 0) {
            var label = 'Query contains recording rules.';
            hints.push({
                type: 'EXPAND_RULES',
                label: label,
                fix: {
                    label: 'Expand rules',
                    action: {
                        type: 'EXPAND_RULES',
                        query: query,
                        mapping: mappingForQuery,
                    },
                },
            });
        }
    }
    if (series && series.length >= SUM_HINT_THRESHOLD_COUNT) {
        var simpleMetric = query.trim().match(/^\w+$/);
        if (simpleMetric) {
            hints.push({
                type: 'ADD_SUM',
                label: 'Many time series results returned.',
                fix: {
                    label: 'Consider aggregating with sum().',
                    action: {
                        type: 'ADD_SUM',
                        query: query,
                        preventSubmit: true,
                    },
                },
            });
        }
    }
    return hints.length > 0 ? hints : null;
}


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/result_transformer.ts":
/*!************************************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/result_transformer.ts ***!
  \************************************************************************/
/*! exports provided: ResultTransformer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResultTransformer", function() { return ResultTransformer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");




var ResultTransformer = /** @class */ (function () {
    function ResultTransformer(templateSrv) {
        this.templateSrv = templateSrv;
    }
    ResultTransformer.prototype.transform = function (response, options) {
        var e_1, _a, e_2, _b;
        var prometheusResult = response.data.data.result;
        if (options.format === 'table') {
            return [
                this.transformMetricDataToTable(prometheusResult, options.responseListLength, options.refId, options.valueWithRefId),
            ];
        }
        else if (prometheusResult && options.format === 'heatmap') {
            var seriesList = [];
            try {
                for (var prometheusResult_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](prometheusResult), prometheusResult_1_1 = prometheusResult_1.next(); !prometheusResult_1_1.done; prometheusResult_1_1 = prometheusResult_1.next()) {
                    var metricData = prometheusResult_1_1.value;
                    seriesList.push(this.transformMetricData(metricData, options, options.start, options.end));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (prometheusResult_1_1 && !prometheusResult_1_1.done && (_a = prometheusResult_1.return)) _a.call(prometheusResult_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            seriesList.sort(sortSeriesByLabel);
            seriesList = this.transformToHistogramOverTime(seriesList);
            return seriesList;
        }
        else if (prometheusResult) {
            var seriesList = [];
            try {
                for (var prometheusResult_2 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](prometheusResult), prometheusResult_2_1 = prometheusResult_2.next(); !prometheusResult_2_1.done; prometheusResult_2_1 = prometheusResult_2.next()) {
                    var metricData = prometheusResult_2_1.value;
                    if (response.data.data.resultType === 'matrix') {
                        seriesList.push(this.transformMetricData(metricData, options, options.start, options.end));
                    }
                    else if (response.data.data.resultType === 'vector') {
                        seriesList.push(this.transformInstantMetricData(metricData, options));
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (prometheusResult_2_1 && !prometheusResult_2_1.done && (_b = prometheusResult_2.return)) _b.call(prometheusResult_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return seriesList;
        }
        return [];
    };
    ResultTransformer.prototype.transformMetricData = function (metricData, options, start, end) {
        var e_3, _a;
        var dps = [];
        var metricLabel = null;
        metricLabel = this.createMetricLabel(metricData.metric, options);
        var stepMs = parseInt(options.step, 10) * 1000;
        var baseTimestamp = start * 1000;
        if (metricData.values === undefined) {
            throw new Error('Prometheus heatmap error: data should be a time series');
        }
        try {
            for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](metricData.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                var dpValue = parseFloat(value[1]);
                if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isNaN(dpValue)) {
                    dpValue = null;
                }
                var timestamp = parseFloat(value[0]) * 1000;
                for (var t = baseTimestamp; t < timestamp; t += stepMs) {
                    dps.push([null, t]);
                }
                baseTimestamp = timestamp + stepMs;
                dps.push([dpValue, timestamp]);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var endTimestamp = end * 1000;
        for (var t = baseTimestamp; t <= endTimestamp; t += stepMs) {
            dps.push([null, t]);
        }
        return {
            datapoints: dps,
            query: options.query,
            target: metricLabel,
            tags: metricData.metric,
        };
    };
    ResultTransformer.prototype.transformMetricDataToTable = function (md, resultCount, refId, valueWithRefId) {
        var table = new app_core_table_model__WEBPACK_IMPORTED_MODULE_2__["default"]();
        var i, j;
        var metricLabels = {};
        if (!md || md.length === 0) {
            return table;
        }
        // Collect all labels across all metrics
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(md, function (series) {
            for (var label in series.metric) {
                if (!metricLabels.hasOwnProperty(label)) {
                    metricLabels[label] = 1;
                }
            }
        });
        // Sort metric labels, create columns for them and record their index
        var sortedLabels = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.keys(metricLabels).sort();
        table.columns.push({ text: 'Time', type: _grafana_data__WEBPACK_IMPORTED_MODULE_3__["FieldType"].time });
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(sortedLabels, function (label, labelIndex) {
            metricLabels[label] = labelIndex + 1;
            table.columns.push({ text: label, filterable: true });
        });
        var valueText = resultCount > 1 || valueWithRefId ? "Value #" + refId : 'Value';
        table.columns.push({ text: valueText });
        // Populate rows, set value to empty string when label not present.
        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(md, function (series) {
            if (series.value) {
                series.values = [series.value];
            }
            if (series.values) {
                for (i = 0; i < series.values.length; i++) {
                    var values = series.values[i];
                    var reordered = [values[0] * 1000];
                    if (series.metric) {
                        for (j = 0; j < sortedLabels.length; j++) {
                            var label = sortedLabels[j];
                            if (series.metric.hasOwnProperty(label)) {
                                reordered.push(series.metric[label]);
                            }
                            else {
                                reordered.push('');
                            }
                        }
                    }
                    reordered.push(parseFloat(values[1]));
                    table.rows.push(reordered);
                }
            }
        });
        return table;
    };
    ResultTransformer.prototype.transformInstantMetricData = function (md, options) {
        var dps = [];
        var metricLabel = null;
        metricLabel = this.createMetricLabel(md.metric, options);
        dps.push([parseFloat(md.value[1]), md.value[0] * 1000]);
        return { target: metricLabel, datapoints: dps, labels: md.metric };
    };
    ResultTransformer.prototype.createMetricLabel = function (labelData, options) {
        var label = '';
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isUndefined(options) || lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(options.legendFormat)) {
            label = this.getOriginalMetricName(labelData);
        }
        else {
            label = this.renderTemplate(this.templateSrv.replace(options.legendFormat), labelData);
        }
        if (!label || label === '{}') {
            label = options.query;
        }
        return label;
    };
    ResultTransformer.prototype.renderTemplate = function (aliasPattern, aliasData) {
        var aliasRegex = /\{\{\s*(.+?)\s*\}\}/g;
        return aliasPattern.replace(aliasRegex, function (match, g1) {
            if (aliasData[g1]) {
                return aliasData[g1];
            }
            return g1;
        });
    };
    ResultTransformer.prototype.getOriginalMetricName = function (labelData) {
        var metricName = labelData.__name__ || '';
        delete labelData.__name__;
        var labelPart = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.map(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.toPairs(labelData), function (label) {
            return label[0] + '="' + label[1] + '"';
        }).join(',');
        return metricName + '{' + labelPart + '}';
    };
    ResultTransformer.prototype.transformToHistogramOverTime = function (seriesList) {
        /*      t1 = timestamp1, t2 = timestamp2 etc.
                t1  t2  t3          t1  t2  t3
        le10    10  10  0     =>    10  10  0
        le20    20  10  30    =>    10  0   30
        le30    30  10  35    =>    10  0   5
        */
        for (var i = seriesList.length - 1; i > 0; i--) {
            var topSeries = seriesList[i].datapoints;
            var bottomSeries = seriesList[i - 1].datapoints;
            if (!topSeries || !bottomSeries) {
                throw new Error('Prometheus heatmap transform error: data should be a time series');
            }
            for (var j = 0; j < topSeries.length; j++) {
                var bottomPoint = bottomSeries[j] || [0];
                topSeries[j][0] -= bottomPoint[0];
            }
        }
        return seriesList;
    };
    return ResultTransformer;
}());

function sortSeriesByLabel(s1, s2) {
    var le1, le2;
    try {
        // fail if not integer. might happen with bad queries
        le1 = parseHistogramLabel(s1.target);
        le2 = parseHistogramLabel(s2.target);
    }
    catch (err) {
        console.log(err);
        return 0;
    }
    if (le1 > le2) {
        return 1;
    }
    if (le1 < le2) {
        return -1;
    }
    return 0;
}
function parseHistogramLabel(le) {
    if (le === '+Inf') {
        return +Infinity;
    }
    return Number(le);
}


/***/ }),

/***/ "./public/app/plugins/datasource/prometheus/types.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/prometheus/types.ts ***!
  \***********************************************************/
/*! exports provided: PromContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromContext", function() { return PromContext; });
var PromContext;
(function (PromContext) {
    PromContext["Explore"] = "explore";
    PromContext["Panel"] = "panel";
})(PromContext || (PromContext = {}));


/***/ })

}]);
//# sourceMappingURL=prometheusPlugin.fb2366366adbbbf1d38b.js.map