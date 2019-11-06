(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cloudwatchPlugin"],{

/***/ "./public/app/plugins/datasource/cloudwatch/config_ctrl.ts":
/*!*****************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/config_ctrl.ts ***!
  \*****************************************************************/
/*! exports provided: CloudWatchConfigCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudWatchConfigCtrl", function() { return CloudWatchConfigCtrl; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var CloudWatchConfigCtrl = /** @class */ (function () {
    /** @ngInject */
    function CloudWatchConfigCtrl($scope, datasourceSrv) {
        this.accessKeyExist = false;
        this.secretKeyExist = false;
        this.authTypes = [
            { name: 'Access & secret key', value: 'keys' },
            { name: 'Credentials file', value: 'credentials' },
            { name: 'ARN', value: 'arn' },
        ];
        this.indexPatternTypes = [
            { name: 'No pattern', value: undefined },
            { name: 'Hourly', value: 'Hourly', example: '[logstash-]YYYY.MM.DD.HH' },
            { name: 'Daily', value: 'Daily', example: '[logstash-]YYYY.MM.DD' },
            { name: 'Weekly', value: 'Weekly', example: '[logstash-]GGGG.WW' },
            { name: 'Monthly', value: 'Monthly', example: '[logstash-]YYYY.MM' },
            { name: 'Yearly', value: 'Yearly', example: '[logstash-]YYYY' },
        ];
        this.regions = [
            'ap-northeast-1',
            'ap-northeast-2',
            'ap-northeast-3',
            'ap-south-1',
            'ap-southeast-1',
            'ap-southeast-2',
            'ca-central-1',
            'cn-north-1',
            'cn-northwest-1',
            'eu-central-1',
            'eu-north-1',
            'eu-west-1',
            'eu-west-2',
            'eu-west-3',
            'me-south-1',
            'sa-east-1',
            'us-east-1',
            'us-east-2',
            'us-gov-east-1',
            'us-gov-west-1',
            'us-iso-east-1',
            'us-isob-east-1',
            'us-west-1',
            'us-west-2',
        ];
        this.current.jsonData.timeField = this.current.jsonData.timeField || '@timestamp';
        this.current.jsonData.authType = this.current.jsonData.authType || 'credentials';
        this.accessKeyExist = this.current.secureJsonFields.accessKey;
        this.secretKeyExist = this.current.secureJsonFields.secretKey;
        this.datasourceSrv = datasourceSrv;
        this.getRegions();
    }
    CloudWatchConfigCtrl.prototype.resetAccessKey = function () {
        this.accessKeyExist = false;
    };
    CloudWatchConfigCtrl.prototype.resetSecretKey = function () {
        this.secretKeyExist = false;
    };
    CloudWatchConfigCtrl.prototype.getRegions = function () {
        var _this = this;
        this.datasourceSrv
            .loadDatasource(this.current.name)
            .then(function (ds) {
            return ds.getRegions();
        })
            .then(function (regions) {
            _this.regions = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.map(regions, 'value');
        }, function (err) {
            console.error('failed to get latest regions');
        });
    };
    CloudWatchConfigCtrl.templateUrl = 'partials/config.html';
    return CloudWatchConfigCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/datasource.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/datasource.ts ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/utils/kbn */ "./public/app/core/utils/kbn.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");






// import * as moment from 'moment';
var CloudWatchDatasource = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CloudWatchDatasource, _super);
    /** @ngInject */
    function CloudWatchDatasource(instanceSettings, $q, backendSrv, templateSrv, timeSrv) {
        var _this = _super.call(this, instanceSettings) || this;
        _this.instanceSettings = instanceSettings;
        _this.$q = $q;
        _this.backendSrv = backendSrv;
        _this.templateSrv = templateSrv;
        _this.timeSrv = timeSrv;
        _this.type = 'cloudwatch';
        _this.proxyUrl = instanceSettings.url;
        _this.defaultRegion = instanceSettings.jsonData.defaultRegion;
        _this.instanceSettings = instanceSettings;
        _this.standardStatistics = ['Average', 'Maximum', 'Minimum', 'Sum', 'SampleCount'];
        return _this;
    }
    CloudWatchDatasource.prototype.query = function (options) {
        var _this = this;
        options = angular__WEBPACK_IMPORTED_MODULE_1___default.a.copy(options);
        options.targets = this.expandTemplateVariable(options.targets, options.scopedVars, this.templateSrv);
        var queries = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(options.targets, function (item) {
            return ((item.id !== '' || item.hide !== true) &&
                ((!!item.region && !!item.namespace && !!item.metricName && !lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEmpty(item.statistics)) ||
                    item.expression.length > 0));
        }).map(function (item) {
            item.region = _this.templateSrv.replace(_this.getActualRegion(item.region), options.scopedVars);
            item.namespace = _this.templateSrv.replace(item.namespace, options.scopedVars);
            item.metricName = _this.templateSrv.replace(item.metricName, options.scopedVars);
            item.dimensions = _this.convertDimensionFormat(item.dimensions, options.scopedVars);
            item.statistics = item.statistics.map(function (s) {
                return _this.templateSrv.replace(s, options.scopedVars);
            });
            item.period = String(_this.getPeriod(item, options)); // use string format for period in graph query, and alerting
            item.id = _this.templateSrv.replace(item.id, options.scopedVars);
            item.expression = _this.templateSrv.replace(item.expression, options.scopedVars);
            // valid ExtendedStatistics is like p90.00, check the pattern
            var hasInvalidStatistics = item.statistics.some(function (s) {
                if (s.indexOf('p') === 0) {
                    var matches = /^p\d{2}(?:\.\d{1,2})?$/.exec(s);
                    return !matches || matches[0] !== s;
                }
                return false;
            });
            if (hasInvalidStatistics) {
                throw { message: 'Invalid extended statistics' };
            }
            return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.extend({
                refId: item.refId,
                intervalMs: options.intervalMs,
                maxDataPoints: options.maxDataPoints,
                datasourceId: _this.instanceSettings.id,
                type: 'timeSeriesQuery',
            }, item);
        });
        // No valid targets, return the empty result to save a round trip.
        if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEmpty(queries)) {
            var d = this.$q.defer();
            d.resolve({ data: [] });
            return d.promise;
        }
        var request = {
            from: options.range.from.valueOf().toString(),
            to: options.range.to.valueOf().toString(),
            queries: queries,
        };
        return this.performTimeSeriesQuery(request);
    };
    CloudWatchDatasource.prototype.getPeriod = function (target, options, now) {
        var start = this.convertToCloudWatchTime(options.range.from, false);
        var end = this.convertToCloudWatchTime(options.range.to, true);
        now = Math.round((now || Date.now()) / 1000);
        var period;
        var range = end - start;
        var hourSec = 60 * 60;
        var daySec = hourSec * 24;
        var periodUnit = 60;
        if (!target.period) {
            if (now - start <= daySec * 15) {
                // until 15 days ago
                if (target.namespace === 'AWS/EC2') {
                    periodUnit = period = 300;
                }
                else {
                    periodUnit = period = 60;
                }
            }
            else if (now - start <= daySec * 63) {
                // until 63 days ago
                periodUnit = period = 60 * 5;
            }
            else if (now - start <= daySec * 455) {
                // until 455 days ago
                periodUnit = period = 60 * 60;
            }
            else {
                // over 455 days, should return error, but try to long period
                periodUnit = period = 60 * 60;
            }
        }
        else {
            if (/^\d+$/.test(target.period)) {
                period = parseInt(target.period, 10);
            }
            else {
                period = app_core_utils_kbn__WEBPACK_IMPORTED_MODULE_4__["default"].interval_to_seconds(this.templateSrv.replace(target.period, options.scopedVars));
            }
        }
        if (period < 1) {
            period = 1;
        }
        if (!target.highResolution && range / period >= 1440) {
            period = Math.ceil(range / 1440 / periodUnit) * periodUnit;
        }
        return period;
    };
    CloudWatchDatasource.prototype.performTimeSeriesQuery = function (request) {
        return this.awsRequest('/api/tsdb/query', request).then(function (res) {
            var e_1, _a, e_2, _b;
            var data = [];
            if (res.results) {
                try {
                    for (var _c = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](request.queries), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var query = _d.value;
                        var queryRes = res.results[query.refId];
                        if (queryRes) {
                            try {
                                for (var _e = (e_2 = void 0, tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](queryRes.series)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var series = _f.value;
                                    var s = { target: series.name, datapoints: series.points };
                                    if (queryRes.meta.unit) {
                                        s.unit = queryRes.meta.unit;
                                    }
                                    data.push(s);
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return { data: data };
        });
    };
    CloudWatchDatasource.prototype.transformSuggestDataFromTable = function (suggestData) {
        return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(suggestData.results['metricFindQuery'].tables[0].rows, function (v) {
            return {
                text: v[0],
                value: v[1],
            };
        });
    };
    CloudWatchDatasource.prototype.doMetricQueryRequest = function (subtype, parameters) {
        var _this = this;
        var range = this.timeSrv.timeRange();
        return this.awsRequest('/api/tsdb/query', {
            from: range.from.valueOf().toString(),
            to: range.to.valueOf().toString(),
            queries: [
                lodash__WEBPACK_IMPORTED_MODULE_2___default.a.extend({
                    refId: 'metricFindQuery',
                    intervalMs: 1,
                    maxDataPoints: 1,
                    datasourceId: this.instanceSettings.id,
                    type: 'metricFindQuery',
                    subtype: subtype,
                }, parameters),
            ],
        }).then(function (r) {
            return _this.transformSuggestDataFromTable(r);
        });
    };
    CloudWatchDatasource.prototype.getRegions = function () {
        return this.doMetricQueryRequest('regions', null);
    };
    CloudWatchDatasource.prototype.getNamespaces = function () {
        return this.doMetricQueryRequest('namespaces', null);
    };
    CloudWatchDatasource.prototype.getMetrics = function (namespace, region) {
        return this.doMetricQueryRequest('metrics', {
            region: this.templateSrv.replace(this.getActualRegion(region)),
            namespace: this.templateSrv.replace(namespace),
        });
    };
    CloudWatchDatasource.prototype.getDimensionKeys = function (namespace, region) {
        return this.doMetricQueryRequest('dimension_keys', {
            region: this.templateSrv.replace(this.getActualRegion(region)),
            namespace: this.templateSrv.replace(namespace),
        });
    };
    CloudWatchDatasource.prototype.getDimensionValues = function (region, namespace, metricName, dimensionKey, filterDimensions) {
        return this.doMetricQueryRequest('dimension_values', {
            region: this.templateSrv.replace(this.getActualRegion(region)),
            namespace: this.templateSrv.replace(namespace),
            metricName: this.templateSrv.replace(metricName),
            dimensionKey: this.templateSrv.replace(dimensionKey),
            dimensions: this.convertDimensionFormat(filterDimensions, {}),
        });
    };
    CloudWatchDatasource.prototype.getEbsVolumeIds = function (region, instanceId) {
        return this.doMetricQueryRequest('ebs_volume_ids', {
            region: this.templateSrv.replace(this.getActualRegion(region)),
            instanceId: this.templateSrv.replace(instanceId),
        });
    };
    CloudWatchDatasource.prototype.getEc2InstanceAttribute = function (region, attributeName, filters) {
        return this.doMetricQueryRequest('ec2_instance_attribute', {
            region: this.templateSrv.replace(this.getActualRegion(region)),
            attributeName: this.templateSrv.replace(attributeName),
            filters: filters,
        });
    };
    CloudWatchDatasource.prototype.getResourceARNs = function (region, resourceType, tags) {
        return this.doMetricQueryRequest('resource_arns', {
            region: this.templateSrv.replace(this.getActualRegion(region)),
            resourceType: this.templateSrv.replace(resourceType),
            tags: tags,
        });
    };
    CloudWatchDatasource.prototype.metricFindQuery = function (query) {
        var region;
        var namespace;
        var metricName;
        var filterJson;
        var regionQuery = query.match(/^regions\(\)/);
        if (regionQuery) {
            return this.getRegions();
        }
        var namespaceQuery = query.match(/^namespaces\(\)/);
        if (namespaceQuery) {
            return this.getNamespaces();
        }
        var metricNameQuery = query.match(/^metrics\(([^\)]+?)(,\s?([^,]+?))?\)/);
        if (metricNameQuery) {
            namespace = metricNameQuery[1];
            region = metricNameQuery[3];
            return this.getMetrics(namespace, region);
        }
        var dimensionKeysQuery = query.match(/^dimension_keys\(([^\)]+?)(,\s?([^,]+?))?\)/);
        if (dimensionKeysQuery) {
            namespace = dimensionKeysQuery[1];
            region = dimensionKeysQuery[3];
            return this.getDimensionKeys(namespace, region);
        }
        var dimensionValuesQuery = query.match(/^dimension_values\(([^,]+?),\s?([^,]+?),\s?([^,]+?),\s?([^,]+?)(,\s?(.+))?\)/);
        if (dimensionValuesQuery) {
            region = dimensionValuesQuery[1];
            namespace = dimensionValuesQuery[2];
            metricName = dimensionValuesQuery[3];
            var dimensionKey = dimensionValuesQuery[4];
            filterJson = {};
            if (dimensionValuesQuery[6]) {
                filterJson = JSON.parse(this.templateSrv.replace(dimensionValuesQuery[6]));
            }
            return this.getDimensionValues(region, namespace, metricName, dimensionKey, filterJson);
        }
        var ebsVolumeIdsQuery = query.match(/^ebs_volume_ids\(([^,]+?),\s?([^,]+?)\)/);
        if (ebsVolumeIdsQuery) {
            region = ebsVolumeIdsQuery[1];
            var instanceId = ebsVolumeIdsQuery[2];
            return this.getEbsVolumeIds(region, instanceId);
        }
        var ec2InstanceAttributeQuery = query.match(/^ec2_instance_attribute\(([^,]+?),\s?([^,]+?),\s?(.+?)\)/);
        if (ec2InstanceAttributeQuery) {
            region = ec2InstanceAttributeQuery[1];
            var targetAttributeName = ec2InstanceAttributeQuery[2];
            filterJson = JSON.parse(this.templateSrv.replace(ec2InstanceAttributeQuery[3]));
            return this.getEc2InstanceAttribute(region, targetAttributeName, filterJson);
        }
        var resourceARNsQuery = query.match(/^resource_arns\(([^,]+?),\s?([^,]+?),\s?(.+?)\)/);
        if (resourceARNsQuery) {
            region = resourceARNsQuery[1];
            var resourceType = resourceARNsQuery[2];
            var tagsJSON = JSON.parse(this.templateSrv.replace(resourceARNsQuery[3]));
            return this.getResourceARNs(region, resourceType, tagsJSON);
        }
        return this.$q.when([]);
    };
    CloudWatchDatasource.prototype.annotationQuery = function (options) {
        var _this = this;
        var annotation = options.annotation;
        var statistics = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(annotation.statistics, function (s) {
            return _this.templateSrv.replace(s);
        });
        var defaultPeriod = annotation.prefixMatching ? '' : '300';
        var period = annotation.period || defaultPeriod;
        period = parseInt(period, 10);
        var parameters = {
            prefixMatching: annotation.prefixMatching,
            region: this.templateSrv.replace(this.getActualRegion(annotation.region)),
            namespace: this.templateSrv.replace(annotation.namespace),
            metricName: this.templateSrv.replace(annotation.metricName),
            dimensions: this.convertDimensionFormat(annotation.dimensions, {}),
            statistics: statistics,
            period: period,
            actionPrefix: annotation.actionPrefix || '',
            alarmNamePrefix: annotation.alarmNamePrefix || '',
        };
        return this.awsRequest('/api/tsdb/query', {
            from: options.range.from.valueOf().toString(),
            to: options.range.to.valueOf().toString(),
            queries: [
                lodash__WEBPACK_IMPORTED_MODULE_2___default.a.extend({
                    refId: 'annotationQuery',
                    intervalMs: 1,
                    maxDataPoints: 1,
                    datasourceId: this.instanceSettings.id,
                    type: 'annotationQuery',
                }, parameters),
            ],
        }).then(function (r) {
            return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(r.results['annotationQuery'].tables[0].rows, function (v) {
                return {
                    annotation: annotation,
                    time: Date.parse(v[0]),
                    title: v[1],
                    tags: [v[2]],
                    text: v[3],
                };
            });
        });
    };
    CloudWatchDatasource.prototype.targetContainsTemplate = function (target) {
        var _this = this;
        return (this.templateSrv.variableExists(target.region) ||
            this.templateSrv.variableExists(target.namespace) ||
            this.templateSrv.variableExists(target.metricName) ||
            lodash__WEBPACK_IMPORTED_MODULE_2___default.a.find(target.dimensions, function (v, k) {
                return _this.templateSrv.variableExists(k) || _this.templateSrv.variableExists(v);
            }));
    };
    CloudWatchDatasource.prototype.testDatasource = function () {
        /* use billing metrics for test */
        var region = this.defaultRegion;
        var namespace = 'AWS/Billing';
        var metricName = 'EstimatedCharges';
        var dimensions = {};
        return this.getDimensionValues(region, namespace, metricName, 'ServiceName', dimensions).then(function () {
            return { status: 'success', message: 'Data source is working' };
        });
    };
    CloudWatchDatasource.prototype.awsRequest = function (url, data) {
        var options = {
            method: 'POST',
            url: url,
            data: data,
        };
        return this.backendSrv.datasourceRequest(options).then(function (result) {
            return result.data;
        });
    };
    CloudWatchDatasource.prototype.getDefaultRegion = function () {
        return this.defaultRegion;
    };
    CloudWatchDatasource.prototype.getActualRegion = function (region) {
        if (region === 'default' || lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEmpty(region)) {
            return this.getDefaultRegion();
        }
        return region;
    };
    CloudWatchDatasource.prototype.getExpandedVariables = function (target, dimensionKey, variable, templateSrv) {
        /* if the all checkbox is marked we should add all values to the targets */
        var allSelected = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.find(variable.options, { selected: true, text: 'All' });
        var selectedVariables = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.filter(variable.options, function (v) {
            if (allSelected) {
                return v.text !== 'All';
            }
            else {
                return v.selected;
            }
        });
        var currentVariables = !lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isArray(variable.current.value)
            ? [variable.current]
            : variable.current.value.map(function (v) {
                return {
                    text: v,
                    value: v,
                };
            });
        var useSelectedVariables = selectedVariables.some(function (s) {
            return s.value === currentVariables[0].value;
        }) || currentVariables[0].value === '$__all';
        return (useSelectedVariables ? selectedVariables : currentVariables).map(function (v) {
            var t = angular__WEBPACK_IMPORTED_MODULE_1___default.a.copy(target);
            var scopedVar = {};
            scopedVar[variable.name] = v;
            t.refId = target.refId + '_' + v.value;
            t.dimensions[dimensionKey] = templateSrv.replace(t.dimensions[dimensionKey], scopedVar);
            if (variable.multi && target.id) {
                t.id = target.id + window.btoa(v.value).replace(/=/g, '0'); // generate unique id
            }
            else {
                t.id = target.id;
            }
            return t;
        });
    };
    CloudWatchDatasource.prototype.expandTemplateVariable = function (targets, scopedVars, templateSrv) {
        var _this = this;
        // Datasource and template srv logic uber-complected. This should be cleaned up.
        return lodash__WEBPACK_IMPORTED_MODULE_2___default.a.chain(targets)
            .map(function (target) {
            if (target.id && target.id.length > 0 && target.expression && target.expression.length > 0) {
                return [target];
            }
            var variableIndex = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.keyBy(templateSrv.variables, 'name');
            var dimensionKey = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.findKey(target.dimensions, function (v) {
                var variableName = templateSrv.getVariableName(v);
                return templateSrv.variableExists(v) && !lodash__WEBPACK_IMPORTED_MODULE_2___default.a.has(scopedVars, variableName) && variableIndex[variableName].multi;
            });
            if (dimensionKey) {
                var multiVariable = variableIndex[templateSrv.getVariableName(target.dimensions[dimensionKey])];
                return _this.getExpandedVariables(target, dimensionKey, multiVariable, templateSrv);
            }
            else {
                return [target];
            }
        })
            .flatten()
            .value();
    };
    CloudWatchDatasource.prototype.convertToCloudWatchTime = function (date, roundUp) {
        if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isString(date)) {
            date = _grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateMath"].parse(date, roundUp);
        }
        return Math.round(date.valueOf() / 1000);
    };
    CloudWatchDatasource.prototype.convertDimensionFormat = function (dimensions, scopedVars) {
        var _this = this;
        var convertedDimensions = {};
        lodash__WEBPACK_IMPORTED_MODULE_2___default.a.each(dimensions, function (value, key) {
            convertedDimensions[_this.templateSrv.replace(key, scopedVars)] = _this.templateSrv.replace(value, scopedVars);
        });
        return convertedDimensions;
    };
    return CloudWatchDatasource;
}(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["DataSourceApi"]));
/* harmony default export */ __webpack_exports__["default"] = (CloudWatchDatasource);


/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/module.ts":
/*!************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/module.ts ***!
  \************************************************************/
/*! exports provided: Datasource, QueryCtrl, ConfigCtrl, AnnotationsQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnnotationsQueryCtrl", function() { return CloudWatchAnnotationsQueryCtrl; });
/* harmony import */ var _query_parameter_ctrl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query_parameter_ctrl */ "./public/app/plugins/datasource/cloudwatch/query_parameter_ctrl.ts");
/* harmony import */ var _datasource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datasource */ "./public/app/plugins/datasource/cloudwatch/datasource.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Datasource", function() { return _datasource__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _query_ctrl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query_ctrl */ "./public/app/plugins/datasource/cloudwatch/query_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QueryCtrl", function() { return _query_ctrl__WEBPACK_IMPORTED_MODULE_2__["CloudWatchQueryCtrl"]; });

/* harmony import */ var _config_ctrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config_ctrl */ "./public/app/plugins/datasource/cloudwatch/config_ctrl.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConfigCtrl", function() { return _config_ctrl__WEBPACK_IMPORTED_MODULE_3__["CloudWatchConfigCtrl"]; });





var CloudWatchAnnotationsQueryCtrl = /** @class */ (function () {
    function CloudWatchAnnotationsQueryCtrl() {
    }
    CloudWatchAnnotationsQueryCtrl.templateUrl = 'partials/annotations.editor.html';
    return CloudWatchAnnotationsQueryCtrl;
}());



/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/query_ctrl.ts":
/*!****************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/query_ctrl.ts ***!
  \****************************************************************/
/*! exports provided: CloudWatchQueryCtrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudWatchQueryCtrl", function() { return CloudWatchQueryCtrl; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _query_parameter_ctrl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query_parameter_ctrl */ "./public/app/plugins/datasource/cloudwatch/query_parameter_ctrl.ts");
/* harmony import */ var app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/plugins/sdk */ "./public/app/plugins/sdk.ts");



var CloudWatchQueryCtrl = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](CloudWatchQueryCtrl, _super);
    /** @ngInject */
    function CloudWatchQueryCtrl($scope, $injector) {
        var _this = _super.call(this, $scope, $injector) || this;
        _this.aliasSyntax = '{{metric}} {{stat}} {{namespace}} {{region}} {{<dimension name>}}';
        return _this;
    }
    CloudWatchQueryCtrl.templateUrl = 'partials/query.editor.html';
    return CloudWatchQueryCtrl;
}(app_plugins_sdk__WEBPACK_IMPORTED_MODULE_2__["QueryCtrl"]));



/***/ }),

/***/ "./public/app/plugins/datasource/cloudwatch/query_parameter_ctrl.ts":
/*!**************************************************************************!*\
  !*** ./public/app/plugins/datasource/cloudwatch/query_parameter_ctrl.ts ***!
  \**************************************************************************/
/*! exports provided: CloudWatchQueryParameterCtrl, cloudWatchQueryParameter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CloudWatchQueryParameterCtrl", function() { return CloudWatchQueryParameterCtrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloudWatchQueryParameter", function() { return cloudWatchQueryParameter; });
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "./node_modules/angular/index.js");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_core_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/core_module */ "./public/app/core/core_module.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);



var CloudWatchQueryParameterCtrl = /** @class */ (function () {
    /** @ngInject */
    function CloudWatchQueryParameterCtrl($scope, templateSrv, uiSegmentSrv, datasourceSrv, $q) {
        $scope.init = function () {
            var target = $scope.target;
            target.namespace = target.namespace || '';
            target.metricName = target.metricName || '';
            target.statistics = target.statistics || ['Average'];
            target.dimensions = target.dimensions || {};
            target.period = target.period || '';
            target.region = target.region || 'default';
            target.id = target.id || '';
            target.expression = target.expression || '';
            target.highResolution = target.highResolution || false;
            $scope.regionSegment = uiSegmentSrv.getSegmentForValue($scope.target.region, 'select region');
            $scope.namespaceSegment = uiSegmentSrv.getSegmentForValue($scope.target.namespace, 'select namespace');
            $scope.metricSegment = uiSegmentSrv.getSegmentForValue($scope.target.metricName, 'select metric');
            $scope.dimSegments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.reduce($scope.target.dimensions, function (memo, value, key) {
                memo.push(uiSegmentSrv.newKey(key));
                memo.push(uiSegmentSrv.newOperator('='));
                memo.push(uiSegmentSrv.newKeyValue(value));
                return memo;
            }, []);
            $scope.statSegments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map($scope.target.statistics, function (stat) {
                return uiSegmentSrv.getSegmentForValue(stat);
            });
            $scope.ensurePlusButton($scope.statSegments);
            $scope.ensurePlusButton($scope.dimSegments);
            $scope.removeDimSegment = uiSegmentSrv.newSegment({
                fake: true,
                value: '-- remove dimension --',
            });
            $scope.removeStatSegment = uiSegmentSrv.newSegment({
                fake: true,
                value: '-- remove stat --',
            });
            if (lodash__WEBPACK_IMPORTED_MODULE_2___default.a.isEmpty($scope.target.region)) {
                $scope.target.region = 'default';
            }
            if (!$scope.onChange) {
                $scope.onChange = function () { };
            }
        };
        $scope.getStatSegments = function () {
            return $q.when(lodash__WEBPACK_IMPORTED_MODULE_2___default.a.flatten([
                angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy($scope.removeStatSegment),
                lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map($scope.datasource.standardStatistics, function (s) {
                    return uiSegmentSrv.getSegmentForValue(s);
                }),
                uiSegmentSrv.getSegmentForValue('pNN.NN'),
            ]));
        };
        $scope.statSegmentChanged = function (segment, index) {
            if (segment.value === $scope.removeStatSegment.value) {
                $scope.statSegments.splice(index, 1);
            }
            else {
                segment.type = 'value';
            }
            $scope.target.statistics = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.reduce($scope.statSegments, function (memo, seg) {
                if (!seg.fake) {
                    memo.push(seg.value);
                }
                return memo;
            }, []);
            $scope.ensurePlusButton($scope.statSegments);
            $scope.onChange();
        };
        $scope.ensurePlusButton = function (segments) {
            var count = segments.length;
            var lastSegment = segments[Math.max(count - 1, 0)];
            if (!lastSegment || lastSegment.type !== 'plus-button') {
                segments.push(uiSegmentSrv.newPlusButton());
            }
        };
        $scope.getDimSegments = function (segment, $index) {
            if (segment.type === 'operator') {
                return $q.when([]);
            }
            var target = $scope.target;
            var query = $q.when([]);
            if (segment.type === 'key' || segment.type === 'plus-button') {
                query = $scope.datasource.getDimensionKeys($scope.target.namespace, $scope.target.region);
            }
            else if (segment.type === 'value') {
                var dimensionKey = $scope.dimSegments[$index - 2].value;
                delete target.dimensions[dimensionKey];
                query = $scope.datasource.getDimensionValues(target.region, target.namespace, target.metricName, dimensionKey, target.dimensions);
            }
            return query.then($scope.transformToSegments(true)).then(function (results) {
                if (segment.type === 'key') {
                    results.splice(0, 0, angular__WEBPACK_IMPORTED_MODULE_0___default.a.copy($scope.removeDimSegment));
                }
                return results;
            });
        };
        $scope.dimSegmentChanged = function (segment, index) {
            $scope.dimSegments[index] = segment;
            if (segment.value === $scope.removeDimSegment.value) {
                $scope.dimSegments.splice(index, 3);
            }
            else if (segment.type === 'plus-button') {
                $scope.dimSegments.push(uiSegmentSrv.newOperator('='));
                $scope.dimSegments.push(uiSegmentSrv.newFake('select dimension value', 'value', 'query-segment-value'));
                segment.type = 'key';
                segment.cssClass = 'query-segment-key';
            }
            $scope.syncDimSegmentsWithModel();
            $scope.ensurePlusButton($scope.dimSegments);
            $scope.onChange();
        };
        $scope.syncDimSegmentsWithModel = function () {
            var dims = {};
            var length = $scope.dimSegments.length;
            for (var i = 0; i < length - 2; i += 3) {
                var keySegment = $scope.dimSegments[i];
                var valueSegment = $scope.dimSegments[i + 2];
                if (!valueSegment.fake) {
                    dims[keySegment.value] = valueSegment.value;
                }
            }
            $scope.target.dimensions = dims;
        };
        $scope.getRegions = function () {
            return $scope.datasource
                .metricFindQuery('regions()')
                .then(function (results) {
                results.unshift({ text: 'default' });
                return results;
            })
                .then($scope.transformToSegments(true));
        };
        $scope.getNamespaces = function () {
            return $scope.datasource.metricFindQuery('namespaces()').then($scope.transformToSegments(true));
        };
        $scope.getMetrics = function () {
            return $scope.datasource
                .metricFindQuery('metrics(' + $scope.target.namespace + ',' + $scope.target.region + ')')
                .then($scope.transformToSegments(true));
        };
        $scope.regionChanged = function () {
            $scope.target.region = $scope.regionSegment.value;
            $scope.onChange();
        };
        $scope.namespaceChanged = function () {
            $scope.target.namespace = $scope.namespaceSegment.value;
            $scope.onChange();
        };
        $scope.metricChanged = function () {
            $scope.target.metricName = $scope.metricSegment.value;
            $scope.onChange();
        };
        $scope.transformToSegments = function (addTemplateVars) {
            return function (results) {
                var segments = lodash__WEBPACK_IMPORTED_MODULE_2___default.a.map(results, function (segment) {
                    return uiSegmentSrv.newSegment({
                        value: segment.text,
                        expandable: segment.expandable,
                    });
                });
                if (addTemplateVars) {
                    lodash__WEBPACK_IMPORTED_MODULE_2___default.a.each(templateSrv.variables, function (variable) {
                        segments.unshift(uiSegmentSrv.newSegment({
                            type: 'template',
                            value: '$' + variable.name,
                            expandable: true,
                        }));
                    });
                }
                return segments;
            };
        };
        $scope.init();
    }
    return CloudWatchQueryParameterCtrl;
}());

function cloudWatchQueryParameter() {
    return {
        templateUrl: 'public/app/plugins/datasource/cloudwatch/partials/query.parameter.html',
        controller: CloudWatchQueryParameterCtrl,
        restrict: 'E',
        scope: {
            target: '=',
            datasource: '=',
            onChange: '&',
        },
    };
}
app_core_core_module__WEBPACK_IMPORTED_MODULE_1__["default"].directive('cloudwatchQueryParameter', cloudWatchQueryParameter);


/***/ })

}]);
//# sourceMappingURL=cloudwatchPlugin.fb2366366adbbbf1d38b.js.map