(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["lokiPlugin"],{

/***/ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js ***!
  \*****************************************************************************/
/*! exports provided: WebSocketSubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebSocketSubject", function() { return WebSocketSubject; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Subject */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../ReplaySubject */ "./node_modules/rxjs/_esm5/internal/ReplaySubject.js");
/** PURE_IMPORTS_START tslib,_.._Subject,_.._Subscriber,_.._Observable,_.._Subscription,_.._ReplaySubject PURE_IMPORTS_END */






var DEFAULT_WEBSOCKET_CONFIG = {
    url: '',
    deserializer: function (e) { return JSON.parse(e.data); },
    serializer: function (value) { return JSON.stringify(value); },
};
var WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT = 'WebSocketSubject.error must be called with an object with an error code, and an optional reason: { code: number, reason: string }';
var WebSocketSubject = /*@__PURE__*/ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](WebSocketSubject, _super);
    function WebSocketSubject(urlConfigOrSource, destination) {
        var _this = _super.call(this) || this;
        if (urlConfigOrSource instanceof _Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"]) {
            _this.destination = destination;
            _this.source = urlConfigOrSource;
        }
        else {
            var config = _this._config = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DEFAULT_WEBSOCKET_CONFIG);
            _this._output = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
            if (typeof urlConfigOrSource === 'string') {
                config.url = urlConfigOrSource;
            }
            else {
                for (var key in urlConfigOrSource) {
                    if (urlConfigOrSource.hasOwnProperty(key)) {
                        config[key] = urlConfigOrSource[key];
                    }
                }
            }
            if (!config.WebSocketCtor && WebSocket) {
                config.WebSocketCtor = WebSocket;
            }
            else if (!config.WebSocketCtor) {
                throw new Error('no WebSocket constructor can be found');
            }
            _this.destination = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]();
        }
        return _this;
    }
    WebSocketSubject.prototype.lift = function (operator) {
        var sock = new WebSocketSubject(this._config, this.destination);
        sock.operator = operator;
        sock.source = this;
        return sock;
    };
    WebSocketSubject.prototype._resetState = function () {
        this._socket = null;
        if (!this.source) {
            this.destination = new _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]();
        }
        this._output = new _Subject__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    };
    WebSocketSubject.prototype.multiplex = function (subMsg, unsubMsg, messageFilter) {
        var self = this;
        return new _Observable__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
            try {
                self.next(subMsg());
            }
            catch (err) {
                observer.error(err);
            }
            var subscription = self.subscribe(function (x) {
                try {
                    if (messageFilter(x)) {
                        observer.next(x);
                    }
                }
                catch (err) {
                    observer.error(err);
                }
            }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
            return function () {
                try {
                    self.next(unsubMsg());
                }
                catch (err) {
                    observer.error(err);
                }
                subscription.unsubscribe();
            };
        });
    };
    WebSocketSubject.prototype._connectSocket = function () {
        var _this = this;
        var _a = this._config, WebSocketCtor = _a.WebSocketCtor, protocol = _a.protocol, url = _a.url, binaryType = _a.binaryType;
        var observer = this._output;
        var socket = null;
        try {
            socket = protocol ?
                new WebSocketCtor(url, protocol) :
                new WebSocketCtor(url);
            this._socket = socket;
            if (binaryType) {
                this._socket.binaryType = binaryType;
            }
        }
        catch (e) {
            observer.error(e);
            return;
        }
        var subscription = new _Subscription__WEBPACK_IMPORTED_MODULE_4__["Subscription"](function () {
            _this._socket = null;
            if (socket && socket.readyState === 1) {
                socket.close();
            }
        });
        socket.onopen = function (e) {
            var _socket = _this._socket;
            if (!_socket) {
                socket.close();
                _this._resetState();
                return;
            }
            var openObserver = _this._config.openObserver;
            if (openObserver) {
                openObserver.next(e);
            }
            var queue = _this.destination;
            _this.destination = _Subscriber__WEBPACK_IMPORTED_MODULE_2__["Subscriber"].create(function (x) {
                if (socket.readyState === 1) {
                    try {
                        var serializer = _this._config.serializer;
                        socket.send(serializer(x));
                    }
                    catch (e) {
                        _this.destination.error(e);
                    }
                }
            }, function (e) {
                var closingObserver = _this._config.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                if (e && e.code) {
                    socket.close(e.code, e.reason);
                }
                else {
                    observer.error(new TypeError(WEBSOCKETSUBJECT_INVALID_ERROR_OBJECT));
                }
                _this._resetState();
            }, function () {
                var closingObserver = _this._config.closingObserver;
                if (closingObserver) {
                    closingObserver.next(undefined);
                }
                socket.close();
                _this._resetState();
            });
            if (queue && queue instanceof _ReplaySubject__WEBPACK_IMPORTED_MODULE_5__["ReplaySubject"]) {
                subscription.add(queue.subscribe(_this.destination));
            }
        };
        socket.onerror = function (e) {
            _this._resetState();
            observer.error(e);
        };
        socket.onclose = function (e) {
            _this._resetState();
            var closeObserver = _this._config.closeObserver;
            if (closeObserver) {
                closeObserver.next(e);
            }
            if (e.wasClean) {
                observer.complete();
            }
            else {
                observer.error(e);
            }
        };
        socket.onmessage = function (e) {
            try {
                var deserializer = _this._config.deserializer;
                observer.next(deserializer(e));
            }
            catch (err) {
                observer.error(err);
            }
        };
    };
    WebSocketSubject.prototype._subscribe = function (subscriber) {
        var _this = this;
        var source = this.source;
        if (source) {
            return source.subscribe(subscriber);
        }
        if (!this._socket) {
            this._connectSocket();
        }
        this._output.subscribe(subscriber);
        subscriber.add(function () {
            var _socket = _this._socket;
            if (_this._output.observers.length === 0) {
                if (_socket && _socket.readyState === 1) {
                    _socket.close();
                }
                _this._resetState();
            }
        });
        return subscriber;
    };
    WebSocketSubject.prototype.unsubscribe = function () {
        var _socket = this._socket;
        if (_socket && _socket.readyState === 1) {
            _socket.close();
        }
        this._resetState();
        _super.prototype.unsubscribe.call(this);
    };
    return WebSocketSubject;
}(_Subject__WEBPACK_IMPORTED_MODULE_1__["AnonymousSubject"]));

//# sourceMappingURL=WebSocketSubject.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js ***!
  \**********************************************************************/
/*! exports provided: webSocket */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "webSocket", function() { return webSocket; });
/* harmony import */ var _WebSocketSubject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebSocketSubject */ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js");
/** PURE_IMPORTS_START _WebSocketSubject PURE_IMPORTS_END */

function webSocket(urlConfigOrSource) {
    return new _WebSocketSubject__WEBPACK_IMPORTED_MODULE_0__["WebSocketSubject"](urlConfigOrSource);
}
//# sourceMappingURL=webSocket.js.map


/***/ }),

/***/ "./node_modules/rxjs/_esm5/webSocket/index.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/_esm5/webSocket/index.js ***!
  \****************************************************/
/*! exports provided: webSocket, WebSocketSubject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_observable_dom_webSocket__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../internal/observable/dom/webSocket */ "./node_modules/rxjs/_esm5/internal/observable/dom/webSocket.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "webSocket", function() { return _internal_observable_dom_webSocket__WEBPACK_IMPORTED_MODULE_0__["webSocket"]; });

/* harmony import */ var _internal_observable_dom_WebSocketSubject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../internal/observable/dom/WebSocketSubject */ "./node_modules/rxjs/_esm5/internal/observable/dom/WebSocketSubject.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebSocketSubject", function() { return _internal_observable_dom_WebSocketSubject__WEBPACK_IMPORTED_MODULE_1__["WebSocketSubject"]; });

/** PURE_IMPORTS_START  PURE_IMPORTS_END */


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./public/app/plugins/datasource/loki/LokiAnnotationsQueryCtrl.tsx":
/*!*************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/LokiAnnotationsQueryCtrl.tsx ***!
  \*************************************************************************/
/*! exports provided: LokiAnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiAnnotationsQueryCtrl", function() { return LokiAnnotationsQueryCtrl; });
/**
 * Just a simple wrapper for a react component that is actually implementing the query editor.
 */
var LokiAnnotationsQueryCtrl = /** @class */ (function () {
    /** @ngInject */
    function LokiAnnotationsQueryCtrl() {
        this.annotation.target = this.annotation.target || {};
        this.onQueryChange = this.onQueryChange.bind(this);
    }
    LokiAnnotationsQueryCtrl.prototype.onQueryChange = function (expr) {
        this.annotation.expr = expr;
    };
    LokiAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return LokiAnnotationsQueryCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/loki/components/LokiCheatSheet.tsx":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/components/LokiCheatSheet.tsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);



var DEFAULT_EXAMPLES = ['{job="default/prometheus"}'];
var PREFERRED_LABELS = ['job', 'app', 'k8s_app'];
var EXAMPLES_LIMIT = 5;
var LokiCheatSheet = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LokiCheatSheet, _super);
    function LokiCheatSheet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            userExamples: DEFAULT_EXAMPLES,
        };
        _this.checkUserLabels = function () { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var provider, labels_1, preferredLabel_1, values, userExamples;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = this.props.datasource.languageProvider;
                        if (!provider.started) return [3 /*break*/, 3];
                        labels_1 = provider.getLabelKeys() || [];
                        preferredLabel_1 = PREFERRED_LABELS.find(function (l) { return labels_1.includes(l); });
                        if (!preferredLabel_1) return [3 /*break*/, 2];
                        return [4 /*yield*/, provider.getLabelValues(preferredLabel_1)];
                    case 1:
                        values = _a.sent();
                        userExamples = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["shuffle"])(values)
                            .slice(0, EXAMPLES_LIMIT)
                            .map(function (value) { return "{" + preferredLabel_1 + "=\"" + value + "\"}"; });
                        this.setState({ userExamples: userExamples });
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        this.scheduleUserLabelChecking();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    LokiCheatSheet.prototype.componentDidMount = function () {
        this.scheduleUserLabelChecking();
    };
    LokiCheatSheet.prototype.componentWillUnmount = function () {
        clearTimeout(this.userLabelTimer);
    };
    LokiCheatSheet.prototype.scheduleUserLabelChecking = function () {
        this.userLabelTimer = setTimeout(this.checkUserLabels, 1000);
    };
    LokiCheatSheet.prototype.renderExpression = function (expr) {
        var onClickExample = this.props.onClickExample;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__example", key: expr, onClick: function (e) { return onClickExample({ refId: 'A', expr: expr }); } },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("code", null, expr)));
    };
    LokiCheatSheet.prototype.render = function () {
        var _this = this;
        var userExamples = this.state.userExamples;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, "Loki Cheat Sheet"),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__title" }, "See your logs"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__label" }, "Start by selecting a log stream from the Log labels selector."),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__label" }, "Alternatively, you can write a stream selector into the query field:"),
                this.renderExpression('{job="default/prometheus"}'),
                userExamples !== DEFAULT_EXAMPLES && userExamples.length > 0 ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__label" }, "Here are some example streams from your logs:"),
                    userExamples.map(function (example) { return _this.renderExpression(example); }))) : null),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__title" }, "Combine stream selectors"),
                this.renderExpression('{app="cassandra",namespace="prod"}'),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__label" }, "Returns all log lines from streams that have both labels.")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__title" }, "Filtering for search terms."),
                this.renderExpression('{app="cassandra"} |~ "(duration|latency)s*(=|is|of)s*[d.]+"'),
                this.renderExpression('{app="cassandra"} |= "exact match"'),
                this.renderExpression('{app="cassandra"} != "do not match"'),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "cheat-sheet-item__label" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "https://github.com/grafana/loki/blob/master/docs/logql.md#filter-expression", target: "logql" }, "LogQL"),
                    ' ',
                    "supports exact and regular expression filters."))));
    };
    return LokiCheatSheet;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (LokiCheatSheet);


/***/ }),

/***/ "./public/app/plugins/datasource/loki/components/LokiQueryEditor.tsx":
/*!***************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/components/LokiQueryEditor.tsx ***!
  \***************************************************************************/
/*! exports provided: LokiQueryEditor, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiQueryEditor", function() { return LokiQueryEditor; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _LokiQueryField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LokiQueryField */ "./public/app/plugins/datasource/loki/components/LokiQueryField.tsx");
/* harmony import */ var _useLokiSyntax__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useLokiSyntax */ "./public/app/plugins/datasource/loki/components/useLokiSyntax.ts");

// Libraries




var LokiQueryEditor = Object(react__WEBPACK_IMPORTED_MODULE_1__["memo"])(function LokiQueryEditor(props) {
    var query = props.query, panelData = props.panelData, datasource = props.datasource, onChange = props.onChange, onRunQuery = props.onRunQuery;
    var absolute;
    if (panelData && panelData.request) {
        var range = panelData.request.range;
        absolute = {
            from: range.from.valueOf(),
            to: range.to.valueOf(),
        };
    }
    else {
        absolute = {
            from: Date.now() - 10000,
            to: Date.now(),
        };
    }
    var _a = Object(_useLokiSyntax__WEBPACK_IMPORTED_MODULE_4__["useLokiSyntax"])(datasource.languageProvider, 
    // TODO maybe use real status
    _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["DataSourceStatus"].Connected, absolute), isSyntaxReady = _a.isSyntaxReady, setActiveOption = _a.setActiveOption, refreshLabels = _a.refreshLabels, syntaxProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["isSyntaxReady", "setActiveOption", "refreshLabels"]);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LokiQueryField__WEBPACK_IMPORTED_MODULE_3__["LokiQueryField"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ datasource: datasource, datasourceStatus: _grafana_ui__WEBPACK_IMPORTED_MODULE_2__["DataSourceStatus"].Connected, query: query, onChange: onChange, onRunQuery: onRunQuery, history: [], panelData: panelData, onLoadOptions: setActiveOption, onLabelsRefresh: refreshLabels, syntaxLoaded: isSyntaxReady, absoluteRange: absolute }, syntaxProps))));
});
/* harmony default export */ __webpack_exports__["default"] = (LokiQueryEditor);


/***/ }),

/***/ "./public/app/plugins/datasource/loki/components/LokiQueryField.tsx":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/components/LokiQueryField.tsx ***!
  \**************************************************************************/
/*! exports provided: LokiQueryField, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiQueryField", function() { return LokiQueryField; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LokiQueryFieldForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LokiQueryFieldForm */ "./public/app/plugins/datasource/loki/components/LokiQueryFieldForm.tsx");
/* harmony import */ var _useLokiSyntax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useLokiSyntax */ "./public/app/plugins/datasource/loki/components/useLokiSyntax.ts");




var LokiQueryField = function (_a) {
    var datasource = _a.datasource, datasourceStatus = _a.datasourceStatus, otherProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["datasource", "datasourceStatus"]);
    var _b = Object(_useLokiSyntax__WEBPACK_IMPORTED_MODULE_3__["useLokiSyntax"])(datasource.languageProvider, datasourceStatus, otherProps.absoluteRange), isSyntaxReady = _b.isSyntaxReady, setActiveOption = _b.setActiveOption, refreshLabels = _b.refreshLabels, syntaxProps = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_b, ["isSyntaxReady", "setActiveOption", "refreshLabels"]);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LokiQueryFieldForm__WEBPACK_IMPORTED_MODULE_2__["LokiQueryFieldForm"], tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ datasource: datasource, datasourceStatus: datasourceStatus, syntaxLoaded: isSyntaxReady, 
        /**
         * setActiveOption name is intentional. Because of the way rc-cascader requests additional data
         * https://github.com/react-component/cascader/blob/master/src/Cascader.jsx#L165
         * we are notyfing useLokiSyntax hook, what the active option is, and then it's up to the hook logic
         * to fetch data of options that aren't fetched yet
         */
        onLoadOptions: setActiveOption, onLabelsRefresh: refreshLabels }, syntaxProps, otherProps)));
};
/* harmony default export */ __webpack_exports__["default"] = (LokiQueryField);


/***/ }),

/***/ "./public/app/plugins/datasource/loki/datasource.ts":
/*!**********************************************************!*\
  !*** ./public/app/plugins/datasource/loki/datasource.ts ***!
  \**********************************************************/
/*! exports provided: DEFAULT_MAX_LINES, LokiDatasource, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_MAX_LINES", function() { return DEFAULT_MAX_LINES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiDatasource", function() { return LokiDatasource; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_plugins_datasource_prometheus_add_label_to_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/plugins/datasource/prometheus/add_label_to_query */ "./public/app/plugins/datasource/prometheus/add_label_to_query.ts");
/* harmony import */ var _language_provider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./language_provider */ "./public/app/plugins/datasource/loki/language_provider.ts");
/* harmony import */ var _result_transformer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./result_transformer */ "./public/app/plugins/datasource/loki/result_transformer.ts");
/* harmony import */ var _query_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./query_utils */ "./public/app/plugins/datasource/loki/query_utils.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var _live_streams__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./live_streams */ "./public/app/plugins/datasource/loki/live_streams.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

// Libraries

// Services & Utils





// Types





var DEFAULT_MAX_LINES = 1000;
var DEFAULT_QUERY_PARAMS = {
    direction: 'BACKWARD',
    limit: DEFAULT_MAX_LINES,
    regexp: '',
    query: '',
};
function serializeParams(data) {
    return Object.keys(data)
        .map(function (k) {
        var v = data[k];
        return encodeURIComponent(k) + '=' + encodeURIComponent(v);
    })
        .join('&');
}
var LokiDatasource = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LokiDatasource, _super);
    /** @ngInject */
    function LokiDatasource(instanceSettings, backendSrv, templateSrv) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.instanceSettings = instanceSettings;
        _this.backendSrv = backendSrv;
        _this.templateSrv = templateSrv;
        _this.streams = new _live_streams__WEBPACK_IMPORTED_MODULE_9__["LiveStreams"]();
        _this.processError = function (err, target) {
            var error = {
                message: 'Unknown error during query transaction. Please check JS console logs.',
                refId: target.refId,
            };
            if (err.data) {
                if (typeof err.data === 'string') {
                    error.message = err.data;
                }
                else if (err.data.error) {
                    error.message = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_8__["safeStringifyValue"])(err.data.error);
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
        _this.processResult = function (data, target) {
            var e_1, _a;
            var series = [];
            if (Object.keys(data).length === 0) {
                return series;
            }
            if (!data.streams) {
                return [Object(_result_transformer__WEBPACK_IMPORTED_MODULE_5__["logStreamToDataFrame"])(data, false, target.refId)];
            }
            data = data;
            try {
                for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](data.streams || []), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var stream = _c.value;
                    var dataFrame = Object(_result_transformer__WEBPACK_IMPORTED_MODULE_5__["logStreamToDataFrame"])(stream);
                    dataFrame.refId = target.refId;
                    dataFrame.meta = {
                        searchWords: Object(_query_utils__WEBPACK_IMPORTED_MODULE_6__["getHighlighterExpressionsFromQuery"])(Object(_query_utils__WEBPACK_IMPORTED_MODULE_6__["formatQuery"])(target.query, target.regexp)),
                        limit: _this.maxLines,
                    };
                    series.push(dataFrame);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return series;
        };
        _this.runLiveQuery = function (options, target) {
            var liveTarget = _this.prepareLiveTarget(target, options);
            var stream = _this.streams.getStream(liveTarget);
            return stream.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["map"])(function (data) {
                return {
                    data: data,
                    key: "loki-" + liveTarget.refId,
                    state: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LoadingState"].Streaming,
                };
            }));
        };
        _this.runQuery = function (options, target) {
            var query = _this.prepareQueryTarget(target, options);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_10__["from"])(_this._request('/api/prom/query', query).catch(function (err) {
                if (err.cancelled) {
                    return err;
                }
                var error = _this.processError(err, query);
                throw error;
            })).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["filter"])(function (response) { return (response.cancelled ? false : true); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_11__["map"])(function (response) {
                var data = _this.processResult(response.data, query);
                return { data: data, key: query.refId };
            }));
        };
        _this.prepareLogRowContextQueryTarget = function (row, limit, direction) {
            var query = Object.keys(row.labels)
                .map(function (label) {
                return label + "=\"" + row.labels[label] + "\"";
            })
                .join(',');
            var contextTimeBuffer = 2 * 60 * 60 * 1000 * 1e6; // 2h buffer
            var timeEpochNs = row.timeEpochMs * 1e6;
            var commontTargetOptons = {
                limit: limit,
                query: "{" + query + "}",
                direction: direction,
            };
            if (direction === 'BACKWARD') {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, commontTargetOptons, { start: timeEpochNs - contextTimeBuffer, end: row.timestamp, // using RFC3339Nano format to avoid precision loss
                    direction: direction });
            }
            else {
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, commontTargetOptons, { start: row.timestamp, end: timeEpochNs + contextTimeBuffer });
            }
        };
        _this.getLogRowContext = function (row, options) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var target, series, reverse, result, _a, _b, stream, e_2, error;
            var e_3, _c;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_d) {
                switch (_d.label) {
                    case 0:
                        target = this.prepareLogRowContextQueryTarget(row, (options && options.limit) || 10, (options && options.direction) || 'BACKWARD');
                        series = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        reverse = options && options.direction === 'FORWARD';
                        return [4 /*yield*/, this._request('/api/prom/query', target)];
                    case 2:
                        result = _d.sent();
                        if (result.data) {
                            try {
                                for (_a = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](result.data.streams || []), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    stream = _b.value;
                                    series.push(Object(_result_transformer__WEBPACK_IMPORTED_MODULE_5__["logStreamToDataFrame"])(stream, reverse));
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                        return [2 /*return*/, {
                                data: series,
                            }];
                    case 3:
                        e_2 = _d.sent();
                        error = {
                            message: 'Error during context query. Please check JS console logs.',
                            status: e_2.status,
                            statusText: e_2.statusText,
                        };
                        throw error;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.languageProvider = new _language_provider__WEBPACK_IMPORTED_MODULE_4__["default"](_this);
        var settingsData = instanceSettings.jsonData || {};
        _this.maxLines = parseInt(settingsData.maxLines, 10) || DEFAULT_MAX_LINES;
        return _this;
    }
    LokiDatasource.prototype._request = function (apiUrl, data, options) {
        var baseUrl = this.instanceSettings.url;
        var params = data ? serializeParams(data) : '';
        var url = "" + baseUrl + apiUrl + "?" + params;
        var req = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, options, { url: url });
        return this.backendSrv.datasourceRequest(req);
    };
    LokiDatasource.prototype.prepareLiveTarget = function (target, options) {
        var interpolated = this.templateSrv.replace(target.expr);
        var _a = Object(_query_utils__WEBPACK_IMPORTED_MODULE_6__["parseQuery"])(interpolated), query = _a.query, regexp = _a.regexp;
        var refId = target.refId;
        var baseUrl = this.instanceSettings.url;
        var params = serializeParams({ query: query, regexp: regexp });
        var url = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_8__["convertToWebSocketUrl"])(baseUrl + "/api/prom/tail?" + params);
        return {
            query: query,
            regexp: regexp,
            url: url,
            refId: refId,
            size: Math.min(options.maxDataPoints || Infinity, this.maxLines),
        };
    };
    LokiDatasource.prototype.prepareQueryTarget = function (target, options) {
        var interpolated = this.templateSrv.replace(target.expr);
        var _a = Object(_query_utils__WEBPACK_IMPORTED_MODULE_6__["parseQuery"])(interpolated), query = _a.query, regexp = _a.regexp;
        var start = this.getTime(options.range.from, false);
        var end = this.getTime(options.range.to, true);
        var refId = target.refId;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, DEFAULT_QUERY_PARAMS, { query: query,
            regexp: regexp,
            start: start,
            end: end, limit: Math.min(options.maxDataPoints || Infinity, this.maxLines), refId: refId });
    };
    LokiDatasource.prototype.query = function (options) {
        var _this = this;
        var subQueries = options.targets
            .filter(function (target) { return target.expr && !target.hide; })
            .map(function (target) {
            if (target.liveStreaming) {
                return _this.runLiveQuery(options, target);
            }
            return _this.runQuery(options, target);
        });
        return rxjs__WEBPACK_IMPORTED_MODULE_10__["merge"].apply(void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](subQueries));
    };
    LokiDatasource.prototype.importQueries = function (queries, originMeta) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, Promise, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                return [2 /*return*/, this.languageProvider.importQueries(queries, originMeta.id)];
            });
        });
    };
    LokiDatasource.prototype.metadataRequest = function (url, params) {
        // HACK to get label values for {job=|}, will be replaced when implementing LokiQueryField
        var apiUrl = url.replace('v1', 'prom');
        return this._request(apiUrl, params, { silent: true }).then(function (res) {
            var data = { data: { data: res.data.values || [] } };
            return data;
        });
    };
    LokiDatasource.prototype.modifyQuery = function (query, action) {
        var parsed = Object(_query_utils__WEBPACK_IMPORTED_MODULE_6__["parseQuery"])(query.expr || '');
        var selector = parsed.query;
        switch (action.type) {
            case 'ADD_FILTER': {
                selector = Object(app_plugins_datasource_prometheus_add_label_to_query__WEBPACK_IMPORTED_MODULE_3__["addLabelToSelector"])(selector, action.key, action.value);
                break;
            }
            default:
                break;
        }
        var expression = Object(_query_utils__WEBPACK_IMPORTED_MODULE_6__["formatQuery"])(selector, parsed.regexp);
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, query, { expr: expression });
    };
    LokiDatasource.prototype.getHighlighterExpression = function (query) {
        return Object(_query_utils__WEBPACK_IMPORTED_MODULE_6__["getHighlighterExpressionsFromQuery"])(query.expr);
    };
    LokiDatasource.prototype.getTime = function (date, roundUp) {
        if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isString(date)) {
            date = _grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateMath"].parse(date, roundUp);
        }
        return Math.ceil(date.valueOf() * 1e6);
    };
    LokiDatasource.prototype.testDatasource = function () {
        // Consider only last 10 minutes otherwise request takes too long
        var startMs = Date.now() - 10 * 60 * 1000;
        var start = startMs + "000000"; // API expects nanoseconds
        return this._request('/api/prom/label', { start: start })
            .then(function (res) {
            if (res && res.data && res.data.values && res.data.values.length > 0) {
                return { status: 'success', message: 'Data source connected and labels found.' };
            }
            return {
                status: 'error',
                message: 'Data source connected, but no labels received. Verify that Loki and Promtail is configured properly.',
            };
        })
            .catch(function (err) {
            var message = 'Loki: ';
            if (err.statusText) {
                message += err.statusText;
            }
            else {
                message += 'Cannot connect to Loki';
            }
            if (err.status) {
                message += ". " + err.status;
            }
            if (err.data && err.data.message) {
                message += ". " + err.data.message;
            }
            else if (err.data) {
                message += ". " + err.data;
            }
            return { status: 'error', message: message };
        });
    };
    LokiDatasource.prototype.annotationQuery = function (options) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, Promise, function () {
            var request, data, annotations, _loop_1, data_1, data_1_1, frame;
            var e_4, _a;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!options.annotation.expr) {
                            return [2 /*return*/, []];
                        }
                        request = queryRequestFromAnnotationOptions(options);
                        return [4 /*yield*/, this.runQuery(request, request.targets[0]).toPromise()];
                    case 1:
                        data = (_b.sent()).data;
                        annotations = [];
                        _loop_1 = function (frame) {
                            var tags = Object.values(frame.labels);
                            var view = new _grafana_data__WEBPACK_IMPORTED_MODULE_2__["DataFrameView"](frame);
                            view.forEachRow(function (row) {
                                annotations.push({
                                    time: new Date(row.ts).valueOf(),
                                    text: row.line,
                                    tags: tags,
                                });
                            });
                        };
                        try {
                            for (data_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](data), data_1_1 = data_1.next(); !data_1_1.done; data_1_1 = data_1.next()) {
                                frame = data_1_1.value;
                                _loop_1(frame);
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (data_1_1 && !data_1_1.done && (_a = data_1.return)) _a.call(data_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        return [2 /*return*/, annotations];
                }
            });
        });
    };
    return LokiDatasource;
}(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["DataSourceApi"]));

function queryRequestFromAnnotationOptions(options) {
    var refId = "annotation-" + options.annotation.name;
    var target = { refId: refId, expr: options.annotation.expr };
    return {
        requestId: refId,
        range: options.range,
        targets: [target],
        dashboardId: options.dashboard.id,
        scopedVars: null,
        startTime: Date.now(),
        // This should mean the default defined on datasource is used.
        maxDataPoints: 0,
        // Dummy values, are required in type but not used here.
        timezone: 'utc',
        panelId: 0,
        interval: '',
        intervalMs: 0,
    };
}
/* harmony default export */ __webpack_exports__["default"] = (LokiDatasource);


/***/ }),

/***/ "./public/app/plugins/datasource/loki/language_provider.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/language_provider.ts ***!
  \*****************************************************************/
/*! exports provided: LABEL_REFRESH_INTERVAL, rangeToParams, addHistoryMetadata, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LABEL_REFRESH_INTERVAL", function() { return LABEL_REFRESH_INTERVAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rangeToParams", function() { return rangeToParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addHistoryMetadata", function() { return addHistoryMetadata; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/plugins/datasource/prometheus/language_utils */ "./public/app/plugins/datasource/prometheus/language_utils.ts");
/* harmony import */ var _syntax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./syntax */ "./public/app/plugins/datasource/loki/syntax.ts");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

// Libraries

// Services & Utils


// Types


var DEFAULT_KEYS = ['job', 'namespace'];
var EMPTY_SELECTOR = '{}';
var HISTORY_ITEM_COUNT = 10;
var HISTORY_COUNT_CUTOFF = 1000 * 60 * 60 * 24; // 24h
var NS_IN_MS = 1000000;
var LABEL_REFRESH_INTERVAL = 1000 * 30; // 30sec
var wrapLabel = function (label) { return ({ label: label }); };
var rangeToParams = function (range) { return ({ start: range.from * NS_IN_MS, end: range.to * NS_IN_MS }); };
function addHistoryMetadata(item, history) {
    var cutoffTs = Date.now() - HISTORY_COUNT_CUTOFF;
    var historyForItem = history.filter(function (h) { return h.ts > cutoffTs && h.query.expr === item.label; });
    var count = historyForItem.length;
    var recent = historyForItem[0];
    var hint = "Queried " + count + " times in the last 24h.";
    if (recent) {
        var lastQueried = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["dateTime"])(recent.ts).fromNow();
        hint = hint + " Last queried " + lastQueried + ".";
    }
    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, item, { documentation: hint });
}
var LokiLanguageProvider = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LokiLanguageProvider, _super);
    function LokiLanguageProvider(datasource, initialValues) {
        var _this = _super.call(this) || this;
        // Strip syntax chars
        _this.cleanText = function (s) { return s.replace(/[{}[\]="(),!~+\-*/^%]/g, '').trim(); };
        _this.request = function (url, params) {
            return _this.datasource.metadataRequest(url, params);
        };
        /**
         * Initialise the language provider by fetching set of labels. Without this initialisation the provider would return
         * just a set of hardcoded default labels on provideCompletionItems or a recent queries from history.
         */
        _this.start = function () {
            if (!_this.startTask) {
                _this.startTask = _this.fetchLogLabels(_this.initialRange).then(function () {
                    _this.started = true;
                    return [];
                });
            }
            return _this.startTask;
        };
        _this.datasource = datasource;
        _this.labelKeys = {};
        _this.labelValues = {};
        Object.assign(_this, initialValues);
        return _this;
    }
    LokiLanguageProvider.prototype.getSyntax = function () {
        return _syntax__WEBPACK_IMPORTED_MODULE_3__["default"];
    };
    LokiLanguageProvider.prototype.getLabelKeys = function () {
        return this.labelKeys[EMPTY_SELECTOR];
    };
    LokiLanguageProvider.prototype.getLabelValues = function (key) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, Promise, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchLabelValues(key, this.initialRange)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.labelValues[EMPTY_SELECTOR][key]];
                }
            });
        });
    };
    /**
     * Return suggestions based on input that can be then plugged into a typeahead dropdown.
     * Keep this DOM-free for testing
     * @param input
     * @param context Is optional in types but is required in case we are doing getLabelCompletionItems
     * @param context.absoluteRange Required in case we are doing getLabelCompletionItems
     * @param context.history Optional used only in getEmptyCompletionItems
     */
    LokiLanguageProvider.prototype.provideCompletionItems = function (input, context) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, Promise, function () {
            var wrapperClasses, value, empty;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wrapperClasses = input.wrapperClasses, value = input.value;
                        empty = value.document.text.length === 0;
                        if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.includes(wrapperClasses, 'context-labels')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getLabelCompletionItems(input, context)];
                    case 1: 
                    // Suggestions for {|} and {foo=|}
                    return [2 /*return*/, _a.sent()];
                    case 2:
                        if (empty) {
                            return [2 /*return*/, this.getEmptyCompletionItems(context || {})];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, {
                            suggestions: [],
                        }];
                }
            });
        });
    };
    LokiLanguageProvider.prototype.getEmptyCompletionItems = function (context) {
        var history = context.history;
        var suggestions = [];
        if (history && history.length > 0) {
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
        return { suggestions: suggestions };
    };
    LokiLanguageProvider.prototype.getLabelCompletionItems = function (_a, _b) {
        var text = _a.text, wrapperClasses = _a.wrapperClasses, labelKey = _a.labelKey, value = _a.value;
        var absoluteRange = _b.absoluteRange;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, Promise, function () {
            var context, suggestions, line, cursorOffset, selector, parsedSelector, existingKeys, labelValues, labelKeys, possibleKeys;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        suggestions = [];
                        line = value.anchorBlock.getText();
                        cursorOffset = value.selection.anchor.offset;
                        selector = EMPTY_SELECTOR;
                        try {
                            parsedSelector = Object(app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__["parseSelector"])(line, cursorOffset);
                        }
                        catch (_d) { }
                        existingKeys = parsedSelector ? parsedSelector.labelKeys : [];
                        if (!((text && text.match(/^!?=~?/)) || wrapperClasses.includes('attr-value'))) return [3 /*break*/, 4];
                        if (!(labelKey && this.labelValues[selector])) return [3 /*break*/, 3];
                        labelValues = this.labelValues[selector][labelKey];
                        if (!!labelValues) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchLabelValues(labelKey, absoluteRange)];
                    case 1:
                        _c.sent();
                        labelValues = this.labelValues[selector][labelKey];
                        _c.label = 2;
                    case 2:
                        context = 'context-label-values';
                        suggestions.push({
                            label: "Label values for \"" + labelKey + "\"",
                            items: labelValues.map(wrapLabel),
                        });
                        _c.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        labelKeys = this.labelKeys[selector] || DEFAULT_KEYS;
                        if (labelKeys) {
                            possibleKeys = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.difference(labelKeys, existingKeys);
                            if (possibleKeys.length > 0) {
                                context = 'context-labels';
                                suggestions.push({ label: "Labels", items: possibleKeys.map(wrapLabel) });
                            }
                        }
                        _c.label = 5;
                    case 5: return [2 /*return*/, { context: context, suggestions: suggestions }];
                }
            });
        });
    };
    LokiLanguageProvider.prototype.importQueries = function (queries, datasourceType) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, Promise, function () {
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (datasourceType === 'prometheus') {
                    return [2 /*return*/, Promise.all(queries.map(function (query) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                            var expr, _a, context, rest;
                            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, this.importPrometheusQuery(query.expr)];
                                    case 1:
                                        expr = _b.sent();
                                        _a = query, context = _a.context, rest = tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"](_a, ["context"]);
                                        return [2 /*return*/, tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, rest, { expr: expr })];
                                }
                            });
                        }); }))];
                }
                // Return a cleaned LokiQuery
                return [2 /*return*/, queries.map(function (query) { return ({
                        refId: query.refId,
                        expr: '',
                    }); })];
            });
        });
    };
    LokiLanguageProvider.prototype.importPrometheusQuery = function (query) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, Promise, function () {
            var selectorMatch, selector, labels_1, existingKeys, labelsToKeep_1, key, labelKeys, cleanSelector;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!query) {
                            return [2 /*return*/, ''];
                        }
                        selectorMatch = query.match(app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__["selectorRegexp"]);
                        if (!selectorMatch) return [3 /*break*/, 2];
                        selector = selectorMatch[0];
                        labels_1 = {};
                        selector.replace(app_plugins_datasource_prometheus_language_utils__WEBPACK_IMPORTED_MODULE_2__["labelRegexp"], function (_, key, operator, value) {
                            labels_1[key] = { value: value, operator: operator };
                            return '';
                        });
                        // Keep only labels that exist on origin and target datasource
                        return [4 /*yield*/, this.start()];
                    case 1:
                        // Keep only labels that exist on origin and target datasource
                        _a.sent(); // fetches all existing label keys
                        existingKeys = this.labelKeys[EMPTY_SELECTOR];
                        labelsToKeep_1 = {};
                        if (existingKeys && existingKeys.length > 0) {
                            // Check for common labels
                            for (key in labels_1) {
                                if (existingKeys && existingKeys.includes(key)) {
                                    // Should we check for label value equality here?
                                    labelsToKeep_1[key] = labels_1[key];
                                }
                            }
                        }
                        else {
                            // Keep all labels by default
                            labelsToKeep_1 = labels_1;
                        }
                        labelKeys = Object.keys(labelsToKeep_1).sort();
                        cleanSelector = labelKeys
                            .map(function (key) { return "" + key + labelsToKeep_1[key].operator + labelsToKeep_1[key].value; })
                            .join(',');
                        return [2 /*return*/, ['{', cleanSelector, '}'].join('')];
                    case 2: return [2 /*return*/, ''];
                }
            });
        });
    };
    LokiLanguageProvider.prototype.fetchLogLabels = function (absoluteRange) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, Promise, function () {
            var url, res, body, labelKeys, e_1;
            var _a, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = '/api/prom/label';
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        this.logLabelFetchTs = Date.now();
                        return [4 /*yield*/, this.request(url, rangeToParams(absoluteRange))];
                    case 2:
                        res = _c.sent();
                        return [4 /*yield*/, (res.data || res.json())];
                    case 3:
                        body = _c.sent();
                        labelKeys = body.data.slice().sort();
                        this.labelKeys = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.labelKeys, (_a = {}, _a[EMPTY_SELECTOR] = labelKeys, _a));
                        this.labelValues = (_b = {},
                            _b[EMPTY_SELECTOR] = {},
                            _b);
                        this.logLabelOptions = labelKeys.map(function (key) { return ({ label: key, value: key, isLeaf: false }); });
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _c.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, []];
                }
            });
        });
    };
    LokiLanguageProvider.prototype.refreshLogLabels = function (absoluteRange, forceRefresh) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((this.labelKeys && Date.now() - this.logLabelFetchTs > LABEL_REFRESH_INTERVAL) || forceRefresh)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchLogLabels(absoluteRange)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    LokiLanguageProvider.prototype.fetchLabelValues = function (key, absoluteRange) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var url, res, body, values_1, exisingValues, nextValues, e_2;
            var _a, _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                switch (_c.label) {
                    case 0:
                        url = "/api/prom/label/" + key + "/values";
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.request(url, rangeToParams(absoluteRange))];
                    case 2:
                        res = _c.sent();
                        return [4 /*yield*/, (res.data || res.json())];
                    case 3:
                        body = _c.sent();
                        values_1 = body.data.slice().sort();
                        // Add to label options
                        this.logLabelOptions = this.logLabelOptions.map(function (keyOption) {
                            if (keyOption.value === key) {
                                return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, keyOption, { children: values_1.map(function (value) { return ({ label: value, value: value }); }) });
                            }
                            return keyOption;
                        });
                        exisingValues = this.labelValues[EMPTY_SELECTOR];
                        nextValues = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, exisingValues, (_a = {}, _a[key] = values_1, _a));
                        this.labelValues = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, this.labelValues, (_b = {}, _b[EMPTY_SELECTOR] = nextValues, _b));
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _c.sent();
                        console.error(e_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return LokiLanguageProvider;
}(app_types_explore__WEBPACK_IMPORTED_MODULE_4__["LanguageProvider"]));
/* harmony default export */ __webpack_exports__["default"] = (LokiLanguageProvider);


/***/ }),

/***/ "./public/app/plugins/datasource/loki/live_streams.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/live_streams.ts ***!
  \************************************************************/
/*! exports provided: LiveStreams */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveStreams", function() { return LiveStreams; });
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var rxjs_webSocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/webSocket */ "./node_modules/rxjs/_esm5/webSocket/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _result_transformer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./result_transformer */ "./public/app/plugins/datasource/loki/result_transformer.ts");




/**
 * Cache of websocket streams that can be returned as observable. In case there already is a stream for particular
 * target it is returned and on subscription returns the latest dataFrame.
 */
var LiveStreams = /** @class */ (function () {
    function LiveStreams() {
        this.streams = {};
    }
    LiveStreams.prototype.getStream = function (target) {
        var _this = this;
        var stream = this.streams[target.url];
        if (!stream) {
            var data_1 = new _grafana_data__WEBPACK_IMPORTED_MODULE_0__["CircularDataFrame"]({ capacity: target.size });
            data_1.labels = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_0__["parseLabels"])(target.query);
            data_1.addField({ name: 'ts', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].time, config: { title: 'Time' } });
            data_1.addField({ name: 'line', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].string });
            data_1.addField({ name: 'labels', type: _grafana_data__WEBPACK_IMPORTED_MODULE_0__["FieldType"].other });
            stream = Object(rxjs_webSocket__WEBPACK_IMPORTED_MODULE_1__["webSocket"])(target.url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["finalize"])(function () {
                delete _this.streams[target.url];
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (response) {
                Object(_result_transformer__WEBPACK_IMPORTED_MODULE_3__["appendResponseToBufferedData"])(response, data_1);
                return [data_1];
            }));
            this.streams[target.url] = stream;
        }
        return stream;
    };
    return LiveStreams;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/loki/module.ts":
/*!******************************************************!*\
  !*** ./public/app/plugins/datasource/loki/module.ts ***!
  \******************************************************/
/*! exports provided: LokiConfigCtrl, Datasource, QueryEditor, ConfigCtrl, ExploreQueryField, ExploreStartPage, AnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LokiConfigCtrl", function() { return LokiConfigCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return LokiConfigCtrl; });
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/loki/datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _components_LokiCheatSheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/LokiCheatSheet */ "./public/app/plugins/datasource/loki/components/LokiCheatSheet.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExploreStartPage", function() { return _components_LokiCheatSheet__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _components_LokiQueryField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/LokiQueryField */ "./public/app/plugins/datasource/loki/components/LokiQueryField.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExploreQueryField", function() { return _components_LokiQueryField__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _components_LokiQueryEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/LokiQueryEditor */ "./public/app/plugins/datasource/loki/components/LokiQueryEditor.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryEditor", function() { return _components_LokiQueryEditor__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _LokiAnnotationsQueryCtrl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LokiAnnotationsQueryCtrl */ "./public/app/plugins/datasource/loki/LokiAnnotationsQueryCtrl.tsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnnotationsQueryCtrl", function() { return _LokiAnnotationsQueryCtrl__WEBPACK_IMPORTED_MODULE_4__["LokiAnnotationsQueryCtrl"]; });






var LokiConfigCtrl = /** @class */ (function () {
    function LokiConfigCtrl() {
    }
    LokiConfigCtrl.templateUrl = 'partials/config.html';
    return LokiConfigCtrl;
}());




/***/ }),

/***/ "./public/app/plugins/datasource/loki/query_utils.ts":
/*!***********************************************************!*\
  !*** ./public/app/plugins/datasource/loki/query_utils.ts ***!
  \***********************************************************/
/*! exports provided: parseQuery, formatQuery, getHighlighterExpressionsFromQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseQuery", function() { return parseQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatQuery", function() { return formatQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHighlighterExpressionsFromQuery", function() { return getHighlighterExpressionsFromQuery; });
var selectorRegexp = /(?:^|\s){[^{]*}/g;
var caseInsensitive = '(?i)'; // Golang mode modifier for Loki, doesn't work in JavaScript
function parseQuery(input) {
    input = input || '';
    var match = input.match(selectorRegexp);
    var query = input;
    var regexp = '';
    if (match) {
        regexp = input.replace(selectorRegexp, '').trim();
        // Keep old-style regexp, otherwise take whole query
        if (regexp && regexp.search(/\|=|\|~|!=|!~/) === -1) {
            query = match[0].trim();
            if (!regexp.startsWith(caseInsensitive)) {
                regexp = "" + caseInsensitive + regexp;
            }
        }
        else {
            regexp = '';
        }
    }
    return { regexp: regexp, query: query };
}
function formatQuery(selector, search) {
    return ((selector || '') + " " + (search || '')).trim();
}
/**
 * Returns search terms from a LogQL query.
 * E.g., `{} |= foo |=bar != baz` returns `['foo', 'bar']`.
 */
function getHighlighterExpressionsFromQuery(input) {
    var parsed = parseQuery(input);
    // Legacy syntax
    if (parsed.regexp) {
        return [parsed.regexp];
    }
    var expression = input;
    var results = [];
    // Consume filter expression from left to right
    while (expression) {
        var filterStart = expression.search(/\|=|\|~|!=|!~/);
        // Nothing more to search
        if (filterStart === -1) {
            break;
        }
        // Drop terms for negative filters
        var skip = expression.substr(filterStart).search(/!=|!~/) === 0;
        expression = expression.substr(filterStart + 2);
        if (skip) {
            continue;
        }
        // Check if there is more chained
        var filterEnd = expression.search(/\|=|\|~|!=|!~/);
        var filterTerm = void 0;
        if (filterEnd === -1) {
            filterTerm = expression.trim();
        }
        else {
            filterTerm = expression.substr(0, filterEnd).trim();
            expression = expression.substr(filterEnd);
        }
        // Unwrap the filter term by removing quotes
        var quotedTerm = filterTerm.match(/^"((?:[^\\"]|\\")*)"$/);
        if (quotedTerm) {
            var unwrappedFilterTerm = quotedTerm[1];
            results.push(unwrappedFilterTerm);
        }
        else {
            return null;
        }
    }
    return results;
}


/***/ }),

/***/ "./public/app/plugins/datasource/loki/result_transformer.ts":
/*!******************************************************************!*\
  !*** ./public/app/plugins/datasource/loki/result_transformer.ts ***!
  \******************************************************************/
/*! exports provided: logStreamToDataFrame, appendResponseToBufferedData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logStreamToDataFrame", function() { return logStreamToDataFrame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendResponseToBufferedData", function() { return appendResponseToBufferedData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");


/**
 * Transforms LokiLogStream structure into a dataFrame. Used when doing standard queries.
 */
function logStreamToDataFrame(stream, reverse, refId) {
    var e_1, _a;
    var labels = stream.parsedLabels;
    if (!labels && stream.labels) {
        labels = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["parseLabels"])(stream.labels);
    }
    var times = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["ArrayVector"]([]);
    var lines = new _grafana_data__WEBPACK_IMPORTED_MODULE_1__["ArrayVector"]([]);
    try {
        for (var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](stream.entries), _c = _b.next(); !_c.done; _c = _b.next()) {
            var entry = _c.value;
            times.add(entry.ts || entry.timestamp);
            lines.add(entry.line);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (reverse) {
        times.buffer = times.buffer.reverse();
        lines.buffer = lines.buffer.reverse();
    }
    return {
        refId: refId,
        labels: labels,
        fields: [
            { name: 'ts', type: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].time, config: { title: 'Time' }, values: times },
            { name: 'line', type: _grafana_data__WEBPACK_IMPORTED_MODULE_1__["FieldType"].string, config: {}, values: lines },
        ],
        length: times.length,
    };
}
/**
 * Transform LokiResponse data and appends it to MutableDataFrame. Used for streaming where the dataFrame can be
 * a CircularDataFrame creating a fixed size rolling buffer.
 * TODO: Probably could be unified with the logStreamToDataFrame function.
 */
function appendResponseToBufferedData(response, data) {
    // Should we do anythign with: response.dropped_entries?
    var e_2, _a, e_3, _b;
    var streams = response.streams;
    if (streams && streams.length) {
        try {
            for (var streams_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](streams), streams_1_1 = streams_1.next(); !streams_1_1.done; streams_1_1 = streams_1.next()) {
                var stream = streams_1_1.value;
                // Find unique labels
                var labels = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["parseLabels"])(stream.labels);
                var unique = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_1__["findUniqueLabels"])(labels, data.labels);
                try {
                    // Add each line
                    for (var _c = (e_3 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](stream.entries)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var entry = _d.value;
                        data.values.ts.add(entry.ts || entry.timestamp);
                        data.values.line.add(entry.line);
                        data.values.labels.add(unique);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (streams_1_1 && !streams_1_1.done && (_a = streams_1.return)) _a.call(streams_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
}


/***/ }),

/***/ "./public/app/plugins/datasource/loki/syntax.ts":
/*!******************************************************!*\
  !*** ./public/app/plugins/datasource/loki/syntax.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* tslint:disable max-line-length */
var tokenizer = {
    comment: {
        pattern: /(^|[^\n])#.*/,
        lookbehind: true,
    },
    'context-labels': {
        pattern: /(^|\s)\{[^}]*(?=})/,
        lookbehind: true,
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
    // number: /\b-?\d+((\.\d*)?([eE][+-]?\d+)?)?\b/,
    operator: new RegExp("/&&?|\\|?\\||!=?|<(?:=>?|<|>)?|>[>=]?", 'i'),
    punctuation: /[{}`,.]/,
};
/* harmony default export */ __webpack_exports__["default"] = (tokenizer);


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


/***/ })

}]);
//# sourceMappingURL=lokiPlugin.fb2366366adbbbf1d38b.js.map