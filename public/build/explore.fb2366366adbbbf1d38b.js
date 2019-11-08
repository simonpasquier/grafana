(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["explore"],{

/***/ "./node_modules/lodash/_baseHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  return object != null && hasOwnProperty.call(object, key);
}

module.exports = baseHas;


/***/ }),

/***/ "./node_modules/lodash/has.js":
/*!************************************!*\
  !*** ./node_modules/lodash/has.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseHas = __webpack_require__(/*! ./_baseHas */ "./node_modules/lodash/_baseHas.js"),
    hasPath = __webpack_require__(/*! ./_hasPath */ "./node_modules/lodash/_hasPath.js");

/**
 * Checks if `path` is a direct property of `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = { 'a': { 'b': 2 } };
 * var other = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.has(object, 'a');
 * // => true
 *
 * _.has(object, 'a.b');
 * // => true
 *
 * _.has(object, ['a', 'b']);
 * // => true
 *
 * _.has(other, 'a');
 * // => false
 */
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}

module.exports = has;


/***/ }),

/***/ "./node_modules/lodash/negate.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/negate.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0;
 * }
 *
 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
 * // => [1, 3, 5]
 */
function negate(predicate) {
  if (typeof predicate != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return function() {
    var args = arguments;
    switch (args.length) {
      case 0: return !predicate.call(this);
      case 1: return !predicate.call(this, args[0]);
      case 2: return !predicate.call(this, args[0], args[1]);
      case 3: return !predicate.call(this, args[0], args[1], args[2]);
    }
    return !predicate.apply(this, args);
  };
}

module.exports = negate;


/***/ }),

/***/ "./node_modules/lodash/omitBy.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/omitBy.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    negate = __webpack_require__(/*! ./negate */ "./node_modules/lodash/negate.js"),
    pickBy = __webpack_require__(/*! ./pickBy */ "./node_modules/lodash/pickBy.js");

/**
 * The opposite of `_.pickBy`; this method creates an object composed of
 * the own and inherited enumerable string keyed properties of `object` that
 * `predicate` doesn't return truthy for. The predicate is invoked with two
 * arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omitBy(object, _.isNumber);
 * // => { 'b': '2' }
 */
function omitBy(object, predicate) {
  return pickBy(object, negate(baseIteratee(predicate)));
}

module.exports = omitBy;


/***/ }),

/***/ "./node_modules/lodash/pickBy.js":
/*!***************************************!*\
  !*** ./node_modules/lodash/pickBy.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    basePickBy = __webpack_require__(/*! ./_basePickBy */ "./node_modules/lodash/_basePickBy.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "./node_modules/lodash/_getAllKeysIn.js");

/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pickBy(object, _.isNumber);
 * // => { 'a': 1, 'c': 3 }
 */
function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }
  var props = arrayMap(getAllKeysIn(object), function(prop) {
    return [prop];
  });
  predicate = baseIteratee(predicate);
  return basePickBy(object, props, function(value, path) {
    return predicate(value, path[0]);
  });
}

module.exports = pickBy;


/***/ }),

/***/ "./node_modules/react-table/es/defaultProps.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-table/es/defaultProps.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/react-table/es/utils.js");
/* harmony import */ var _pagination__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pagination */ "./node_modules/react-table/es/pagination.js");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



//



var emptyObj = function emptyObj() {
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = ({
  // General
  data: [],
  resolveData: function resolveData(data) {
    return data;
  },
  loading: false,
  showPagination: true,
  showPaginationTop: false,
  showPaginationBottom: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  defaultPage: 0,
  defaultPageSize: 20,
  showPageJump: true,
  collapseOnSortingChange: true,
  collapseOnPageChange: true,
  collapseOnDataChange: true,
  freezeWhenExpanded: false,
  sortable: true,
  multiSort: true,
  resizable: true,
  filterable: false,
  defaultSortDesc: false,
  defaultSorted: [],
  defaultFiltered: [],
  defaultResized: [],
  defaultExpanded: {},
  // eslint-disable-next-line no-unused-vars
  defaultFilterMethod: function defaultFilterMethod(filter, row, column) {
    var id = filter.pivotId || filter.id;
    return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true;
  },
  // eslint-disable-next-line no-unused-vars
  defaultSortMethod: function defaultSortMethod(a, b, desc) {
    // force null and undefined to the bottom
    a = a === null || a === undefined ? '' : a;
    b = b === null || b === undefined ? '' : b;
    // force any string values to lowercase
    a = typeof a === 'string' ? a.toLowerCase() : a;
    b = typeof b === 'string' ? b.toLowerCase() : b;
    // Return either 1 or -1 to indicate a sort priority
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    // returning 0, undefined or any falsey value will use subsequent sorts or
    // the index as a tiebreaker
    return 0;
  },

  // Controlled State Props
  // page: undefined,
  // pageSize: undefined,
  // sorted: [],
  // filtered: [],
  // resized: [],
  // expanded: {},

  // Controlled State Callbacks
  onPageChange: undefined,
  onPageSizeChange: undefined,
  onSortedChange: undefined,
  onFilteredChange: undefined,
  onResizedChange: undefined,
  onExpandedChange: undefined,

  // Pivoting
  pivotBy: undefined,

  // Key Constants
  pivotValKey: '_pivotVal',
  pivotIDKey: '_pivotID',
  subRowsKey: '_subRows',
  aggregatedKey: '_aggregated',
  nestingLevelKey: '_nestingLevel',
  originalKey: '_original',
  indexKey: '_index',
  groupedByPivotKey: '_groupedByPivot',

  // Server-side Callbacks
  onFetchData: function onFetchData() {
    return null;
  },

  // Classes
  className: '',
  style: {},

  // Component decorators
  getProps: emptyObj,
  getTableProps: emptyObj,
  getTheadGroupProps: emptyObj,
  getTheadGroupTrProps: emptyObj,
  getTheadGroupThProps: emptyObj,
  getTheadProps: emptyObj,
  getTheadTrProps: emptyObj,
  getTheadThProps: emptyObj,
  getTheadFilterProps: emptyObj,
  getTheadFilterTrProps: emptyObj,
  getTheadFilterThProps: emptyObj,
  getTbodyProps: emptyObj,
  getTrGroupProps: emptyObj,
  getTrProps: emptyObj,
  getTdProps: emptyObj,
  getTfootProps: emptyObj,
  getTfootTrProps: emptyObj,
  getTfootTdProps: emptyObj,
  getPaginationProps: emptyObj,
  getLoadingProps: emptyObj,
  getNoDataProps: emptyObj,
  getResizerProps: emptyObj,

  // Global Column Defaults
  column: {
    // Renderers
    Cell: undefined,
    Header: undefined,
    Footer: undefined,
    Aggregated: undefined,
    Pivot: undefined,
    PivotValue: undefined,
    Expander: undefined,
    Filter: undefined,
    Placeholder: undefined,
    // All Columns
    sortable: undefined, // use table default
    resizable: undefined, // use table default
    filterable: undefined, // use table default
    show: true,
    minWidth: 100,
    minResizeWidth: 11,
    // Cells only
    className: '',
    style: {},
    getProps: emptyObj,
    // Pivot only
    aggregate: undefined,
    // Headers only
    headerClassName: '',
    headerStyle: {},
    getHeaderProps: emptyObj,
    // Footers only
    footerClassName: '',
    footerStyle: {},
    getFooterProps: emptyObj,
    filterMethod: undefined,
    filterAll: false,
    sortMethod: undefined
  },

  // Global Expander Column Defaults
  expanderDefaults: {
    sortable: false,
    resizable: false,
    filterable: false,
    width: 35
  },

  pivotDefaults: {
    // extend the defaults for pivoted columns here
  },

  // Text
  previousText: 'Previous',
  nextText: 'Next',
  loadingText: 'Loading...',
  noDataText: 'No rows found',
  pageText: 'Page',
  ofText: 'of',
  rowsText: 'rows',
  pageJumpText: 'jump to page',
  rowsSelectorText: 'rows per page',

  // Components
  TableComponent: function TableComponent(_ref) {
    var children = _ref.children,
        className = _ref.className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      _extends({
        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('rt-table', className),
        role: 'grid'
        // tabIndex='0'
      }, rest),
      children
    );
  },
  TheadComponent: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].makeTemplateComponent('rt-thead', 'Thead'),
  TbodyComponent: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].makeTemplateComponent('rt-tbody', 'Tbody'),
  TrGroupComponent: function TrGroupComponent(_ref2) {
    var children = _ref2.children,
        className = _ref2.className,
        rest = _objectWithoutProperties(_ref2, ['children', 'className']);

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      _extends({ className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('rt-tr-group', className), role: 'rowgroup' }, rest),
      children
    );
  },
  TrComponent: function TrComponent(_ref3) {
    var children = _ref3.children,
        className = _ref3.className,
        rest = _objectWithoutProperties(_ref3, ['children', 'className']);

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      _extends({ className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('rt-tr', className), role: 'row' }, rest),
      children
    );
  },
  ThComponent: function ThComponent(_ref4) {
    var toggleSort = _ref4.toggleSort,
        className = _ref4.className,
        children = _ref4.children,
        rest = _objectWithoutProperties(_ref4, ['toggleSort', 'className', 'children']);

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'div',
        _extends({
          className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('rt-th', className),
          onClick: function onClick(e) {
            return toggleSort && toggleSort(e);
          },
          role: 'columnheader',
          tabIndex: '-1' // Resolves eslint issues without implementing keyboard navigation incorrectly
        }, rest),
        children
      )
    );
  },
  TdComponent: function TdComponent(_ref5) {
    var toggleSort = _ref5.toggleSort,
        className = _ref5.className,
        children = _ref5.children,
        rest = _objectWithoutProperties(_ref5, ['toggleSort', 'className', 'children']);

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      _extends({ className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('rt-td', className), role: 'gridcell' }, rest),
      children
    );
  },
  TfootComponent: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].makeTemplateComponent('rt-tfoot', 'Tfoot'),
  FilterComponent: function FilterComponent(_ref6) {
    var filter = _ref6.filter,
        _onChange = _ref6.onChange,
        column = _ref6.column;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', {
      type: 'text',
      style: {
        width: '100%'
      },
      placeholder: column.Placeholder,
      value: filter ? filter.value : '',
      onChange: function onChange(event) {
        return _onChange(event.target.value);
      }
    });
  },
  ExpanderComponent: function ExpanderComponent(_ref7) {
    var isExpanded = _ref7.isExpanded;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      { className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('rt-expander', isExpanded && '-open') },
      '\u2022'
    );
  },
  PivotValueComponent: function PivotValueComponent(_ref8) {
    var subRows = _ref8.subRows,
        value = _ref8.value;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'span',
      null,
      value,
      ' ',
      subRows && '(' + subRows.length + ')'
    );
  },
  AggregatedComponent: function AggregatedComponent(_ref9) {
    var subRows = _ref9.subRows,
        column = _ref9.column;

    var previewValues = subRows.filter(function (d) {
      return typeof d[column.id] !== 'undefined';
    }).map(function (row, i) {
      return (
        // eslint-disable-next-line react/no-array-index-key
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'span',
          { key: i },
          row[column.id],
          i < subRows.length - 1 ? ', ' : ''
        )
      );
    });
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'span',
      null,
      previewValues
    );
  },
  PivotComponent: undefined, // this is a computed default generated using
  // the ExpanderComponent and PivotValueComponent at run-time in methods.js
  PaginationComponent: _pagination__WEBPACK_IMPORTED_MODULE_3__["default"],
  PreviousComponent: undefined,
  NextComponent: undefined,
  LoadingComponent: function LoadingComponent(_ref10) {
    var className = _ref10.className,
        loading = _ref10.loading,
        loadingText = _ref10.loadingText,
        rest = _objectWithoutProperties(_ref10, ['className', 'loading', 'loadingText']);

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      _extends({ className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('-loading', { '-active': loading }, className) }, rest),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'div',
        { className: '-loading-inner' },
        loadingText
      )
    );
  },
  NoDataComponent: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].makeTemplateComponent('rt-noData', 'NoData'),
  ResizerComponent: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].makeTemplateComponent('rt-resizer', 'Resizer'),
  PadRowComponent: function PadRowComponent() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'span',
      null,
      '\xA0'
    );
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kZWZhdWx0UHJvcHMuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJjbGFzc25hbWVzIiwiXyIsIlBhZ2luYXRpb24iLCJlbXB0eU9iaiIsImRhdGEiLCJyZXNvbHZlRGF0YSIsImxvYWRpbmciLCJzaG93UGFnaW5hdGlvbiIsInNob3dQYWdpbmF0aW9uVG9wIiwic2hvd1BhZ2luYXRpb25Cb3R0b20iLCJzaG93UGFnZVNpemVPcHRpb25zIiwicGFnZVNpemVPcHRpb25zIiwiZGVmYXVsdFBhZ2UiLCJkZWZhdWx0UGFnZVNpemUiLCJzaG93UGFnZUp1bXAiLCJjb2xsYXBzZU9uU29ydGluZ0NoYW5nZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiY29sbGFwc2VPbkRhdGFDaGFuZ2UiLCJmcmVlemVXaGVuRXhwYW5kZWQiLCJzb3J0YWJsZSIsIm11bHRpU29ydCIsInJlc2l6YWJsZSIsImZpbHRlcmFibGUiLCJkZWZhdWx0U29ydERlc2MiLCJkZWZhdWx0U29ydGVkIiwiZGVmYXVsdEZpbHRlcmVkIiwiZGVmYXVsdFJlc2l6ZWQiLCJkZWZhdWx0RXhwYW5kZWQiLCJkZWZhdWx0RmlsdGVyTWV0aG9kIiwiZmlsdGVyIiwicm93IiwiY29sdW1uIiwiaWQiLCJwaXZvdElkIiwidW5kZWZpbmVkIiwiU3RyaW5nIiwic3RhcnRzV2l0aCIsInZhbHVlIiwiZGVmYXVsdFNvcnRNZXRob2QiLCJhIiwiYiIsImRlc2MiLCJ0b0xvd2VyQ2FzZSIsIm9uUGFnZUNoYW5nZSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJvblNvcnRlZENoYW5nZSIsIm9uRmlsdGVyZWRDaGFuZ2UiLCJvblJlc2l6ZWRDaGFuZ2UiLCJvbkV4cGFuZGVkQ2hhbmdlIiwicGl2b3RCeSIsInBpdm90VmFsS2V5IiwicGl2b3RJREtleSIsInN1YlJvd3NLZXkiLCJhZ2dyZWdhdGVkS2V5IiwibmVzdGluZ0xldmVsS2V5Iiwib3JpZ2luYWxLZXkiLCJpbmRleEtleSIsImdyb3VwZWRCeVBpdm90S2V5Iiwib25GZXRjaERhdGEiLCJjbGFzc05hbWUiLCJzdHlsZSIsImdldFByb3BzIiwiZ2V0VGFibGVQcm9wcyIsImdldFRoZWFkR3JvdXBQcm9wcyIsImdldFRoZWFkR3JvdXBUclByb3BzIiwiZ2V0VGhlYWRHcm91cFRoUHJvcHMiLCJnZXRUaGVhZFByb3BzIiwiZ2V0VGhlYWRUclByb3BzIiwiZ2V0VGhlYWRUaFByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJQcm9wcyIsImdldFRoZWFkRmlsdGVyVHJQcm9wcyIsImdldFRoZWFkRmlsdGVyVGhQcm9wcyIsImdldFRib2R5UHJvcHMiLCJnZXRUckdyb3VwUHJvcHMiLCJnZXRUclByb3BzIiwiZ2V0VGRQcm9wcyIsImdldFRmb290UHJvcHMiLCJnZXRUZm9vdFRyUHJvcHMiLCJnZXRUZm9vdFRkUHJvcHMiLCJnZXRQYWdpbmF0aW9uUHJvcHMiLCJnZXRMb2FkaW5nUHJvcHMiLCJnZXROb0RhdGFQcm9wcyIsImdldFJlc2l6ZXJQcm9wcyIsIkNlbGwiLCJIZWFkZXIiLCJGb290ZXIiLCJBZ2dyZWdhdGVkIiwiUGl2b3QiLCJQaXZvdFZhbHVlIiwiRXhwYW5kZXIiLCJGaWx0ZXIiLCJQbGFjZWhvbGRlciIsInNob3ciLCJtaW5XaWR0aCIsIm1pblJlc2l6ZVdpZHRoIiwiYWdncmVnYXRlIiwiaGVhZGVyQ2xhc3NOYW1lIiwiaGVhZGVyU3R5bGUiLCJnZXRIZWFkZXJQcm9wcyIsImZvb3RlckNsYXNzTmFtZSIsImZvb3RlclN0eWxlIiwiZ2V0Rm9vdGVyUHJvcHMiLCJmaWx0ZXJNZXRob2QiLCJmaWx0ZXJBbGwiLCJzb3J0TWV0aG9kIiwiZXhwYW5kZXJEZWZhdWx0cyIsIndpZHRoIiwicGl2b3REZWZhdWx0cyIsInByZXZpb3VzVGV4dCIsIm5leHRUZXh0IiwibG9hZGluZ1RleHQiLCJub0RhdGFUZXh0IiwicGFnZVRleHQiLCJvZlRleHQiLCJyb3dzVGV4dCIsInBhZ2VKdW1wVGV4dCIsInJvd3NTZWxlY3RvclRleHQiLCJUYWJsZUNvbXBvbmVudCIsImNoaWxkcmVuIiwicmVzdCIsIlRoZWFkQ29tcG9uZW50IiwibWFrZVRlbXBsYXRlQ29tcG9uZW50IiwiVGJvZHlDb21wb25lbnQiLCJUckdyb3VwQ29tcG9uZW50IiwiVHJDb21wb25lbnQiLCJUaENvbXBvbmVudCIsInRvZ2dsZVNvcnQiLCJlIiwiVGRDb21wb25lbnQiLCJUZm9vdENvbXBvbmVudCIsIkZpbHRlckNvbXBvbmVudCIsIm9uQ2hhbmdlIiwiZXZlbnQiLCJ0YXJnZXQiLCJFeHBhbmRlckNvbXBvbmVudCIsImlzRXhwYW5kZWQiLCJQaXZvdFZhbHVlQ29tcG9uZW50Iiwic3ViUm93cyIsImxlbmd0aCIsIkFnZ3JlZ2F0ZWRDb21wb25lbnQiLCJwcmV2aWV3VmFsdWVzIiwiZCIsIm1hcCIsImkiLCJQaXZvdENvbXBvbmVudCIsIlBhZ2luYXRpb25Db21wb25lbnQiLCJQcmV2aW91c0NvbXBvbmVudCIsIk5leHRDb21wb25lbnQiLCJMb2FkaW5nQ29tcG9uZW50IiwiTm9EYXRhQ29tcG9uZW50IiwiUmVzaXplckNvbXBvbmVudCIsIlBhZFJvd0NvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCO0FBQ0E7QUFDQSxPQUFPQyxDQUFQLE1BQWMsU0FBZDtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsY0FBdkI7O0FBRUEsSUFBTUMsV0FBVyxTQUFYQSxRQUFXO0FBQUEsU0FBTyxFQUFQO0FBQUEsQ0FBakI7O0FBRUEsZUFBZTtBQUNiO0FBQ0FDLFFBQU0sRUFGTztBQUdiQyxlQUFhO0FBQUEsV0FBUUQsSUFBUjtBQUFBLEdBSEE7QUFJYkUsV0FBUyxLQUpJO0FBS2JDLGtCQUFnQixJQUxIO0FBTWJDLHFCQUFtQixLQU5OO0FBT2JDLHdCQUFzQixJQVBUO0FBUWJDLHVCQUFxQixJQVJSO0FBU2JDLG1CQUFpQixDQUFDLENBQUQsRUFBSSxFQUFKLEVBQVEsRUFBUixFQUFZLEVBQVosRUFBZ0IsRUFBaEIsRUFBb0Is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QixVQUNoQkEsU0FEZ0I7QUFBQSxRQUNMckQsT0FESyxVQUNMQSxPQURLO0FBQUEsUUFDSXdHLFdBREosVUFDSUEsV0FESjtBQUFBLFFBQ29CUyxJQURwQjs7QUFBQSxXQUdoQjtBQUFBO0FBQUEsaUJBQUssV0FBV3ZILFdBQVcsVUFBWCxFQUF1QixFQUFFLFdBQVdNLE9BQWIsRUFBdkIsRUFBK0NxRCxTQUEvQyxDQUFoQixJQUErRTRELElBQS9FO0FBQ0U7QUFBQTtBQUFBLFVBQUssV0FBVSxnQkFBZjtBQUFpQ1Q7QUFBakM7QUFERixLQUhnQjtBQUFBLEdBM1BMO0FBa1FidUMsbUJBQWlCcEosRUFBRXdILHFCQUFGLENBQXdCLFdBQXhCLEVBQXFDLFFBQXJDLENBbFFKO0FBbVFiNkIsb0JBQWtCckosRUFBRXdILHFCQUFGLENBQXdCLFlBQXhCLEVBQXNDLFNBQXRDLENBblFMO0FBb1FiOEIsbUJBQWlCO0FBQUEsV0FBTTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQU47QUFBQTtBQXBRSixDQUFmIiwiZmlsZSI6ImRlZmF1bHRQcm9wcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG4vL1xuaW1wb3J0IF8gZnJvbSAnLi91dGlscydcbmltcG9ydCBQYWdpbmF0aW9uIGZyb20gJy4vcGFnaW5hdGlvbidcblxuY29uc3QgZW1wdHlPYmogPSAoKSA9PiAoe30pXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLy8gR2VuZXJhbFxuICBkYXRhOiBbXSxcbiAgcmVzb2x2ZURhdGE6IGRhdGEgPT4gZGF0YSxcbiAgbG9hZGluZzogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uOiB0cnVlLFxuICBzaG93UGFnaW5hdGlvblRvcDogZmFsc2UsXG4gIHNob3dQYWdpbmF0aW9uQm90dG9tOiB0cnVlLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiB0cnVlLFxuICBwYWdlU2l6ZU9wdGlvbnM6IFs1LCAxMCwgMjAsIDI1LCA1MCwgMTAwXSxcbiAgZGVmYXVsdFBhZ2U6IDAsXG4gIGRlZmF1bHRQYWdlU2l6ZTogMjAsXG4gIHNob3dQYWdlSnVtcDogdHJ1ZSxcbiAgY29sbGFwc2VPblNvcnRpbmdDaGFuZ2U6IHRydWUsXG4gIGNvbGxhcHNlT25QYWdlQ2hhbmdlOiB0cnVlLFxuICBjb2xsYXBzZU9uRGF0YUNoYW5nZTogdHJ1ZSxcbiAgZnJlZXplV2hlbkV4cGFuZGVkOiBmYWxzZSxcbiAgc29ydGFibGU6IHRydWUsXG4gIG11bHRpU29ydDogdHJ1ZSxcbiAgcmVzaXphYmxlOiB0cnVlLFxuICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgZGVmYXVsdFNvcnREZXNjOiBmYWxzZSxcbiAgZGVmYXVsdFNvcnRlZDogW10sXG4gIGRlZmF1bHRGaWx0ZXJlZDogW10sXG4gIGRlZmF1bHRSZXNpemVkOiBbXSxcbiAgZGVmYXVsdEV4cGFuZGVkOiB7fSxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGRlZmF1bHRGaWx0ZXJNZXRob2Q6IChmaWx0ZXIsIHJvdywgY29sdW1uKSA9PiB7XG4gICAgY29uc3QgaWQgPSBmaWx0ZXIucGl2b3RJZCB8fCBmaWx0ZXIuaWRcbiAgICByZXR1cm4gcm93W2lkXSAhPT0gdW5kZWZpbmVkID8gU3RyaW5nKHJvd1tpZF0pLnN0YXJ0c1dpdGgoZmlsdGVyLnZhbHVlKSA6IHRydWVcbiAgfSxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gIGRlZmF1bHRTb3J0TWV0aG9kOiAoYSwgYiwgZGVzYykgPT4ge1xuICAgIC8vIGZvcmNlIG51bGwgYW5kIHVuZGVmaW5lZCB0byB0aGUgYm90dG9tXG4gICAgYSA9IGEgPT09IG51bGwgfHwgYSA9PT0gdW5kZWZpbmVkID8gJycgOiBhXG4gICAgYiA9IGIgPT09IG51bGwgfHwgYiA9PT0gdW5kZWZpbmVkID8gJycgOiBiXG4gICAgLy8gZm9yY2UgYW55IHN0cmluZyB2YWx1ZXMgdG8gbG93ZXJjYXNlXG4gICAgYSA9IHR5cGVvZiBhID09PSAnc3RyaW5nJyA/IGEudG9Mb3dlckNhc2UoKSA6IGFcbiAgICBiID0gdHlwZW9mIGIgPT09ICdzdHJpbmcnID8gYi50b0xvd2VyQ2FzZSgpIDogYlxuICAgIC8vIFJldHVybiBlaXRoZXIgMSBvciAtMSB0byBpbmRpY2F0ZSBhIHNvcnQgcHJpb3JpdHlcbiAgICBpZiAoYSA+IGIpIHtcbiAgICAgIHJldHVybiAxXG4gICAgfVxuICAgIGlmIChhIDwgYikge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIC8vIHJldHVybmluZyAwLCB1bmRlZmluZWQgb3IgYW55IGZhbHNleSB2YWx1ZSB3aWxsIHVzZSBzdWJzZXF1ZW50IHNvcnRzIG9yXG4gICAgLy8gdGhlIGluZGV4IGFzIGEgdGllYnJlYWtlclxuICAgIHJldHVybiAwXG4gIH0sXG5cbiAgLy8gQ29udHJvbGxlZCBTdGF0ZSBQcm9wc1xuICAvLyBwYWdlOiB1bmRlZmluZWQsXG4gIC8vIHBhZ2VTaXplOiB1bmRlZmluZWQsXG4gIC8vIHNvcnRlZDogW10sXG4gIC8vIGZpbHRlcmVkOiBbXSxcbiAgLy8gcmVzaXplZDogW10sXG4gIC8vIGV4cGFuZGVkOiB7fSxcblxuICAvLyBDb250cm9sbGVkIFN0YXRlIENhbGxiYWNrc1xuICBvblBhZ2VDaGFuZ2U6IHVuZGVmaW5lZCxcbiAgb25QYWdlU2l6ZUNoYW5nZTogdW5kZWZpbmVkLFxuICBvblNvcnRlZENoYW5nZTogdW5kZWZpbmVkLFxuICBvbkZpbHRlcmVkQ2hhbmdlOiB1bmRlZmluZWQsXG4gIG9uUmVzaXplZENoYW5nZTogdW5kZWZpbmVkLFxuICBvbkV4cGFuZGVkQ2hhbmdlOiB1bmRlZmluZWQsXG5cbiAgLy8gUGl2b3RpbmdcbiAgcGl2b3RCeTogdW5kZWZpbmVkLFxuXG4gIC8vIEtleSBDb25zdGFudHNcbiAgcGl2b3RWYWxLZXk6ICdfcGl2b3RWYWwnLFxuICBwaXZvdElES2V5OiAnX3Bpdm90SUQnLFxuICBzdWJSb3dzS2V5OiAnX3N1YlJvd3MnLFxuICBhZ2dyZWdhdGVkS2V5OiAnX2FnZ3JlZ2F0ZWQnLFxuICBuZXN0aW5nTGV2ZWxLZXk6ICdfbmVzdGluZ0xldmVsJyxcbiAgb3JpZ2luYWxLZXk6ICdfb3JpZ2luYWwnLFxuICBpbmRleEtleTogJ19pbmRleCcsXG4gIGdyb3VwZWRCeVBpdm90S2V5OiAnX2dyb3VwZWRCeVBpdm90JyxcblxuICAvLyBTZXJ2ZXItc2lkZSBDYWxsYmFja3NcbiAgb25GZXRjaERhdGE6ICgpID0+IG51bGwsXG5cbiAgLy8gQ2xhc3Nlc1xuICBjbGFzc05hbWU6ICcnLFxuICBzdHlsZToge30sXG5cbiAgLy8gQ29tcG9uZW50IGRlY29yYXRvcnNcbiAgZ2V0UHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUYWJsZVByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRHcm91cFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRHcm91cFRyUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZEdyb3VwVGhQcm9wczogZW1wdHlPYmosXG4gIGdldFRoZWFkUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZFRyUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZFRoUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUaGVhZEZpbHRlclByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRGaWx0ZXJUclByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGhlYWRGaWx0ZXJUaFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGJvZHlQcm9wczogZW1wdHlPYmosXG4gIGdldFRyR3JvdXBQcm9wczogZW1wdHlPYmosXG4gIGdldFRyUHJvcHM6IGVtcHR5T2JqLFxuICBnZXRUZFByb3BzOiBlbXB0eU9iaixcbiAgZ2V0VGZvb3RQcm9wczogZW1wdHlPYmosXG4gIGdldFRmb290VHJQcm9wczogZW1wdHlPYmosXG4gIGdldFRmb290VGRQcm9wczogZW1wdHlPYmosXG4gIGdldFBhZ2luYXRpb25Qcm9wczogZW1wdHlPYmosXG4gIGdldExvYWRpbmdQcm9wczogZW1wdHlPYmosXG4gIGdldE5vRGF0YVByb3BzOiBlbXB0eU9iaixcbiAgZ2V0UmVzaXplclByb3BzOiBlbXB0eU9iaixcblxuICAvLyBHbG9iYWwgQ29sdW1uIERlZmF1bHRzXG4gIGNvbHVtbjoge1xuICAgIC8vIFJlbmRlcmVyc1xuICAgIENlbGw6IHVuZGVmaW5lZCxcbiAgICBIZWFkZXI6IHVuZGVmaW5lZCxcbiAgICBGb290ZXI6IHVuZGVmaW5lZCxcbiAgICBBZ2dyZWdhdGVkOiB1bmRlZmluZWQsXG4gICAgUGl2b3Q6IHVuZGVmaW5lZCxcbiAgICBQaXZvdFZhbHVlOiB1bmRlZmluZWQsXG4gICAgRXhwYW5kZXI6IHVuZGVmaW5lZCxcbiAgICBGaWx0ZXI6IHVuZGVmaW5lZCxcbiAgICBQbGFjZWhvbGRlcjogdW5kZWZpbmVkLFxuICAgIC8vIEFsbCBDb2x1bW5zXG4gICAgc29ydGFibGU6IHVuZGVmaW5lZCwgLy8gdXNlIHRhYmxlIGRlZmF1bHRcbiAgICByZXNpemFibGU6IHVuZGVmaW5lZCwgLy8gdXNlIHRhYmxlIGRlZmF1bHRcbiAgICBmaWx0ZXJhYmxlOiB1bmRlZmluZWQsIC8vIHVzZSB0YWJsZSBkZWZhdWx0XG4gICAgc2hvdzogdHJ1ZSxcbiAgICBtaW5XaWR0aDogMTAwLFxuICAgIG1pblJlc2l6ZVdpZHRoOiAxMSxcbiAgICAvLyBDZWxscyBvbmx5XG4gICAgY2xhc3NOYW1lOiAnJyxcbiAgICBzdHlsZToge30sXG4gICAgZ2V0UHJvcHM6IGVtcHR5T2JqLFxuICAgIC8vIFBpdm90IG9ubHlcbiAgICBhZ2dyZWdhdGU6IHVuZGVmaW5lZCxcbiAgICAvLyBIZWFkZXJzIG9ubHlcbiAgICBoZWFkZXJDbGFzc05hbWU6ICcnLFxuICAgIGhlYWRlclN0eWxlOiB7fSxcbiAgICBnZXRIZWFkZXJQcm9wczogZW1wdHlPYmosXG4gICAgLy8gRm9vdGVycyBvbmx5XG4gICAgZm9vdGVyQ2xhc3NOYW1lOiAnJyxcbiAgICBmb290ZXJTdHlsZToge30sXG4gICAgZ2V0Rm9vdGVyUHJvcHM6IGVtcHR5T2JqLFxuICAgIGZpbHRlck1ldGhvZDogdW5kZWZpbmVkLFxuICAgIGZpbHRlckFsbDogZmFsc2UsXG4gICAgc29ydE1ldGhvZDogdW5kZWZpbmVkLFxuICB9LFxuXG4gIC8vIEdsb2JhbCBFeHBhbmRlciBDb2x1bW4gRGVmYXVsdHNcbiAgZXhwYW5kZXJEZWZhdWx0czoge1xuICAgIHNvcnRhYmxlOiBmYWxzZSxcbiAgICByZXNpemFibGU6IGZhbHNlLFxuICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgIHdpZHRoOiAzNSxcbiAgfSxcblxuICBwaXZvdERlZmF1bHRzOiB7XG4gICAgLy8gZXh0ZW5kIHRoZSBkZWZhdWx0cyBmb3IgcGl2b3RlZCBjb2x1bW5zIGhlcmVcbiAgfSxcblxuICAvLyBUZXh0XG4gIHByZXZpb3VzVGV4dDogJ1ByZXZpb3VzJyxcbiAgbmV4dFRleHQ6ICdOZXh0JyxcbiAgbG9hZGluZ1RleHQ6ICdMb2FkaW5nLi4uJyxcbiAgbm9EYXRhVGV4dDogJ05vIHJvd3MgZm91bmQnLFxuICBwYWdlVGV4dDogJ1BhZ2UnLFxuICBvZlRleHQ6ICdvZicsXG4gIHJvd3NUZXh0OiAncm93cycsXG4gIHBhZ2VKdW1wVGV4dDogJ2p1bXAgdG8gcGFnZScsXG4gIHJvd3NTZWxlY3RvclRleHQ6ICdyb3dzIHBlciBwYWdlJyxcblxuICAvLyBDb21wb25lbnRzXG4gIFRhYmxlQ29tcG9uZW50OiAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5yZXN0IH0pID0+IChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LXRhYmxlJywgY2xhc3NOYW1lKX1cbiAgICAgIHJvbGU9XCJncmlkXCJcbiAgICAgIC8vIHRhYkluZGV4PScwJ1xuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApLFxuICBUaGVhZENvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXRoZWFkJywgJ1RoZWFkJyksXG4gIFRib2R5Q29tcG9uZW50OiBfLm1ha2VUZW1wbGF0ZUNvbXBvbmVudCgncnQtdGJvZHknLCAnVGJvZHknKSxcbiAgVHJHcm91cENvbXBvbmVudDogKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgLi4ucmVzdCB9KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LXRyLWdyb3VwJywgY2xhc3NOYW1lKX0gcm9sZT1cInJvd2dyb3VwXCIgey4uLnJlc3R9PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApLFxuICBUckNvbXBvbmVudDogKHsgY2hpbGRyZW4sIGNsYXNzTmFtZSwgLi4ucmVzdCB9KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LXRyJywgY2xhc3NOYW1lKX0gcm9sZT1cInJvd1wiIHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKSxcbiAgVGhDb21wb25lbnQ6ICh7XG4gICAgdG9nZ2xlU29ydCwgY2xhc3NOYW1lLCBjaGlsZHJlbiwgLi4ucmVzdFxuICB9KSA9PiAoXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHNcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LXRoJywgY2xhc3NOYW1lKX1cbiAgICAgIG9uQ2xpY2s9e2UgPT4gdG9nZ2xlU29ydCAmJiB0b2dnbGVTb3J0KGUpfVxuICAgICAgcm9sZT1cImNvbHVtbmhlYWRlclwiXG4gICAgICB0YWJJbmRleD1cIi0xXCIgLy8gUmVzb2x2ZXMgZXNsaW50IGlzc3VlcyB3aXRob3V0IGltcGxlbWVudGluZyBrZXlib2FyZCBuYXZpZ2F0aW9uIGluY29ycmVjdGx5XG4gICAgICB7Li4ucmVzdH1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICksXG4gIFRkQ29tcG9uZW50OiAoe1xuICAgIHRvZ2dsZVNvcnQsIGNsYXNzTmFtZSwgY2hpbGRyZW4sIC4uLnJlc3RcbiAgfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdydC10ZCcsIGNsYXNzTmFtZSl9IHJvbGU9XCJncmlkY2VsbFwiIHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKSxcbiAgVGZvb3RDb21wb25lbnQ6IF8ubWFrZVRlbXBsYXRlQ29tcG9uZW50KCdydC10Zm9vdCcsICdUZm9vdCcpLFxuICBGaWx0ZXJDb21wb25lbnQ6ICh7IGZpbHRlciwgb25DaGFuZ2UsIGNvbHVtbiB9KSA9PiAoXG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwidGV4dFwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgfX1cbiAgICAgIHBsYWNlaG9sZGVyPXtjb2x1bW4uUGxhY2Vob2xkZXJ9XG4gICAgICB2YWx1ZT17ZmlsdGVyID8gZmlsdGVyLnZhbHVlIDogJyd9XG4gICAgICBvbkNoYW5nZT17ZXZlbnQgPT4gb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAvPlxuICApLFxuICBFeHBhbmRlckNvbXBvbmVudDogKHsgaXNFeHBhbmRlZCB9KSA9PiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ3J0LWV4cGFuZGVyJywgaXNFeHBhbmRlZCAmJiAnLW9wZW4nKX0+JmJ1bGw7PC9kaXY+XG4gICksXG4gIFBpdm90VmFsdWVDb21wb25lbnQ6ICh7IHN1YlJvd3MsIHZhbHVlIH0pID0+IChcbiAgICA8c3Bhbj5cbiAgICAgIHt2YWx1ZX0ge3N1YlJvd3MgJiYgYCgke3N1YlJvd3MubGVuZ3RofSlgfVxuICAgIDwvc3Bhbj5cbiAgKSxcbiAgQWdncmVnYXRlZENvbXBvbmVudDogKHsgc3ViUm93cywgY29sdW1uIH0pID0+IHtcbiAgICBjb25zdCBwcmV2aWV3VmFsdWVzID0gc3ViUm93cy5maWx0ZXIoZCA9PiB0eXBlb2YgZFtjb2x1bW4uaWRdICE9PSAndW5kZWZpbmVkJykubWFwKChyb3csIGkpID0+IChcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcbiAgICAgIDxzcGFuIGtleT17aX0+XG4gICAgICAgIHtyb3dbY29sdW1uLmlkXX1cbiAgICAgICAge2kgPCBzdWJSb3dzLmxlbmd0aCAtIDEgPyAnLCAnIDogJyd9XG4gICAgICA8L3NwYW4+XG4gICAgKSlcbiAgICByZXR1cm4gPHNwYW4+e3ByZXZpZXdWYWx1ZXN9PC9zcGFuPlxuICB9LFxuICBQaXZvdENvbXBvbmVudDogdW5kZWZpbmVkLCAvLyB0aGlzIGlzIGEgY29tcHV0ZWQgZGVmYXVsdCBnZW5lcmF0ZWQgdXNpbmdcbiAgLy8gdGhlIEV4cGFuZGVyQ29tcG9uZW50IGFuZCBQaXZvdFZhbHVlQ29tcG9uZW50IGF0IHJ1bi10aW1lIGluIG1ldGhvZHMuanNcbiAgUGFnaW5hdGlvbkNvbXBvbmVudDogUGFnaW5hdGlvbixcbiAgUHJldmlvdXNDb21wb25lbnQ6IHVuZGVmaW5lZCxcbiAgTmV4dENvbXBvbmVudDogdW5kZWZpbmVkLFxuICBMb2FkaW5nQ29tcG9uZW50OiAoe1xuICAgIGNsYXNzTmFtZSwgbG9hZGluZywgbG9hZGluZ1RleHQsIC4uLnJlc3RcbiAgfSkgPT4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCctbG9hZGluZycsIHsgJy1hY3RpdmUnOiBsb2FkaW5nIH0sIGNsYXNzTmFtZSl9IHsuLi5yZXN0fT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiLWxvYWRpbmctaW5uZXJcIj57bG9hZGluZ1RleHR9PC9kaXY+XG4gICAgPC9kaXY+XG4gICksXG4gIE5vRGF0YUNvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LW5vRGF0YScsICdOb0RhdGEnKSxcbiAgUmVzaXplckNvbXBvbmVudDogXy5tYWtlVGVtcGxhdGVDb21wb25lbnQoJ3J0LXJlc2l6ZXInLCAnUmVzaXplcicpLFxuICBQYWRSb3dDb21wb25lbnQ6ICgpID0+IDxzcGFuPiZuYnNwOzwvc3Bhbj4sXG59XG4iXX0=

/***/ }),

/***/ "./node_modules/react-table/es/index.js":
/*!**********************************************!*\
  !*** ./node_modules/react-table/es/index.js ***!
  \**********************************************/
/*! exports provided: ReactTableDefaults, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactTableDefaults", function() { return ReactTableDefaults; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./node_modules/react-table/es/utils.js");
/* harmony import */ var _lifecycle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lifecycle */ "./node_modules/react-table/es/lifecycle.js");
/* harmony import */ var _methods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./methods */ "./node_modules/react-table/es/methods.js");
/* harmony import */ var _defaultProps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./defaultProps */ "./node_modules/react-table/es/defaultProps.js");
/* harmony import */ var _propTypes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./propTypes */ "./node_modules/react-table/es/propTypes.js");
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



//






var ReactTableDefaults = _defaultProps__WEBPACK_IMPORTED_MODULE_5__["default"];

var ReactTable = function (_Methods) {
  _inherits(ReactTable, _Methods);

  function ReactTable(props) {
    _classCallCheck(this, ReactTable);

    var _this = _possibleConstructorReturn(this, (ReactTable.__proto__ || Object.getPrototypeOf(ReactTable)).call(this));

    _this.getResolvedState = _this.getResolvedState.bind(_this);
    _this.getDataModel = _this.getDataModel.bind(_this);
    _this.getSortedData = _this.getSortedData.bind(_this);
    _this.fireFetchData = _this.fireFetchData.bind(_this);
    _this.getPropOrState = _this.getPropOrState.bind(_this);
    _this.getStateOrProp = _this.getStateOrProp.bind(_this);
    _this.filterData = _this.filterData.bind(_this);
    _this.sortData = _this.sortData.bind(_this);
    _this.getMinRows = _this.getMinRows.bind(_this);
    _this.onPageChange = _this.onPageChange.bind(_this);
    _this.onPageSizeChange = _this.onPageSizeChange.bind(_this);
    _this.sortColumn = _this.sortColumn.bind(_this);
    _this.filterColumn = _this.filterColumn.bind(_this);
    _this.resizeColumnStart = _this.resizeColumnStart.bind(_this);
    _this.resizeColumnEnd = _this.resizeColumnEnd.bind(_this);
    _this.resizeColumnMoving = _this.resizeColumnMoving.bind(_this);

    _this.state = {
      page: props.defaultPage,
      pageSize: props.defaultPageSize,
      sorted: props.defaultSorted,
      expanded: props.defaultExpanded,
      filtered: props.defaultFiltered,
      resized: props.defaultResized,
      currentlyResizing: false,
      skipNextSort: false
    };
    return _this;
  }

  _createClass(ReactTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var resolvedState = this.getResolvedState();
      var children = resolvedState.children,
          className = resolvedState.className,
          style = resolvedState.style,
          getProps = resolvedState.getProps,
          getTableProps = resolvedState.getTableProps,
          getTheadGroupProps = resolvedState.getTheadGroupProps,
          getTheadGroupTrProps = resolvedState.getTheadGroupTrProps,
          getTheadGroupThProps = resolvedState.getTheadGroupThProps,
          getTheadProps = resolvedState.getTheadProps,
          getTheadTrProps = resolvedState.getTheadTrProps,
          getTheadThProps = resolvedState.getTheadThProps,
          getTheadFilterProps = resolvedState.getTheadFilterProps,
          getTheadFilterTrProps = resolvedState.getTheadFilterTrProps,
          getTheadFilterThProps = resolvedState.getTheadFilterThProps,
          getTbodyProps = resolvedState.getTbodyProps,
          getTrGroupProps = resolvedState.getTrGroupProps,
          getTrProps = resolvedState.getTrProps,
          getTdProps = resolvedState.getTdProps,
          getTfootProps = resolvedState.getTfootProps,
          getTfootTrProps = resolvedState.getTfootTrProps,
          getTfootTdProps = resolvedState.getTfootTdProps,
          getPaginationProps = resolvedState.getPaginationProps,
          getLoadingProps = resolvedState.getLoadingProps,
          getNoDataProps = resolvedState.getNoDataProps,
          getResizerProps = resolvedState.getResizerProps,
          showPagination = resolvedState.showPagination,
          showPaginationTop = resolvedState.showPaginationTop,
          showPaginationBottom = resolvedState.showPaginationBottom,
          manual = resolvedState.manual,
          loadingText = resolvedState.loadingText,
          noDataText = resolvedState.noDataText,
          sortable = resolvedState.sortable,
          multiSort = resolvedState.multiSort,
          resizable = resolvedState.resizable,
          filterable = resolvedState.filterable,
          pivotIDKey = resolvedState.pivotIDKey,
          pivotValKey = resolvedState.pivotValKey,
          pivotBy = resolvedState.pivotBy,
          subRowsKey = resolvedState.subRowsKey,
          aggregatedKey = resolvedState.aggregatedKey,
          originalKey = resolvedState.originalKey,
          indexKey = resolvedState.indexKey,
          groupedByPivotKey = resolvedState.groupedByPivotKey,
          loading = resolvedState.loading,
          pageSize = resolvedState.pageSize,
          page = resolvedState.page,
          sorted = resolvedState.sorted,
          filtered = resolvedState.filtered,
          resized = resolvedState.resized,
          expanded = resolvedState.expanded,
          pages = resolvedState.pages,
          onExpandedChange = resolvedState.onExpandedChange,
          TableComponent = resolvedState.TableComponent,
          TheadComponent = resolvedState.TheadComponent,
          TbodyComponent = resolvedState.TbodyComponent,
          TrGroupComponent = resolvedState.TrGroupComponent,
          TrComponent = resolvedState.TrComponent,
          ThComponent = resolvedState.ThComponent,
          TdComponent = resolvedState.TdComponent,
          TfootComponent = resolvedState.TfootComponent,
          PaginationComponent = resolvedState.PaginationComponent,
          LoadingComponent = resolvedState.LoadingComponent,
          SubComponent = resolvedState.SubComponent,
          NoDataComponent = resolvedState.NoDataComponent,
          ResizerComponent = resolvedState.ResizerComponent,
          ExpanderComponent = resolvedState.ExpanderComponent,
          PivotValueComponent = resolvedState.PivotValueComponent,
          PivotComponent = resolvedState.PivotComponent,
          AggregatedComponent = resolvedState.AggregatedComponent,
          FilterComponent = resolvedState.FilterComponent,
          PadRowComponent = resolvedState.PadRowComponent,
          resolvedData = resolvedState.resolvedData,
          allVisibleColumns = resolvedState.allVisibleColumns,
          headerGroups = resolvedState.headerGroups,
          hasHeaderGroups = resolvedState.hasHeaderGroups,
          sortedData = resolvedState.sortedData,
          currentlyResizing = resolvedState.currentlyResizing;

      // Pagination

      var startRow = pageSize * page;
      var endRow = startRow + pageSize;
      var pageRows = manual ? resolvedData : sortedData.slice(startRow, endRow);
      var minRows = this.getMinRows();
      var padRows = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].range(Math.max(minRows - pageRows.length, 0));

      var hasColumnFooter = allVisibleColumns.some(function (d) {
        return d.Footer;
      });
      var hasFilters = filterable || allVisibleColumns.some(function (d) {
        return d.filterable;
      });

      var recurseRowsViewIndex = function recurseRowsViewIndex(rows) {
        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
        return [rows.map(function (row, i) {
          index += 1;
          var rowWithViewIndex = _extends({}, row, {
            _viewIndex: index
          });
          var newPath = path.concat([i]);
          if (rowWithViewIndex[subRowsKey] && _utils__WEBPACK_IMPORTED_MODULE_2__["default"].get(expanded, newPath)) {
            var _recurseRowsViewIndex = recurseRowsViewIndex(rowWithViewIndex[subRowsKey], newPath, index);

            var _recurseRowsViewIndex2 = _slicedToArray(_recurseRowsViewIndex, 2);

            rowWithViewIndex[subRowsKey] = _recurseRowsViewIndex2[0];
            index = _recurseRowsViewIndex2[1];
          }
          return rowWithViewIndex;
        }), index];
      };

      var _recurseRowsViewIndex3 = recurseRowsViewIndex(pageRows);

      var _recurseRowsViewIndex4 = _slicedToArray(_recurseRowsViewIndex3, 1);

      pageRows = _recurseRowsViewIndex4[0];


      var canPrevious = page > 0;
      var canNext = page + 1 < pages;

      var rowMinWidth = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].sum(allVisibleColumns.map(function (d) {
        var resizedColumn = resized.find(function (x) {
          return x.id === d.id;
        }) || {};
        return _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedColumn.value, d.width, d.minWidth);
      }));

      var rowIndex = -1;

      var finalState = _extends({}, resolvedState, {
        startRow: startRow,
        endRow: endRow,
        pageRows: pageRows,
        minRows: minRows,
        padRows: padRows,
        hasColumnFooter: hasColumnFooter,
        canPrevious: canPrevious,
        canNext: canNext,
        rowMinWidth: rowMinWidth
      });

      var rootProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getProps(finalState, undefined, undefined, this));
      var tableProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTableProps(finalState, undefined, undefined, this));
      var tBodyProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTbodyProps(finalState, undefined, undefined, this));
      var loadingProps = getLoadingProps(finalState, undefined, undefined, this);
      var noDataProps = getNoDataProps(finalState, undefined, undefined, this);

      // Visual Components

      var makeHeaderGroup = function makeHeaderGroup(column, i) {
        var resizedValue = function resizedValue(col) {
          return (resized.find(function (x) {
            return x.id === col.id;
          }) || {}).value;
        };
        var flex = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].sum(column.columns.map(function (col) {
          return col.width || resizedValue(col) ? 0 : col.minWidth;
        }));
        var width = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].sum(column.columns.map(function (col) {
          return _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedValue(col), col.width, col.minWidth);
        }));
        var maxWidth = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].sum(column.columns.map(function (col) {
          return _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedValue(col), col.width, col.maxWidth);
        }));

        var theadGroupThProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTheadGroupThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadGroupThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadGroupThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadGroupThProps.rest, columnHeaderProps.rest);

        var flexStyles = {
          flex: flex + ' 0 auto',
          width: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(width),
          maxWidth: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(maxWidth)
        };

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(classes),
            style: _extends({}, styles, flexStyles)
          }, rest),
          _utils__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeComponent(column.Header, {
            data: sortedData,
            column: column
          })
        );
      };

      var makeHeaderGroups = function makeHeaderGroups() {
        var theadGroupProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTheadGroupProps(finalState, undefined, undefined, _this2));
        var theadGroupTrProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTheadGroupTrProps(finalState, undefined, undefined, _this2));
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          TheadComponent,
          _extends({
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('-headerGroups', theadGroupProps.className),
            style: _extends({}, theadGroupProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, theadGroupProps.rest),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            TrComponent,
            _extends({
              className: theadGroupTrProps.className,
              style: theadGroupTrProps.style
            }, theadGroupTrProps.rest),
            headerGroups.map(makeHeaderGroup)
          )
        );
      };

      var makeHeader = function makeHeader(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var sort = sorted.find(function (d) {
          return d.id === column.id;
        });
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var theadThProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTheadThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadThProps.rest, columnHeaderProps.rest);

        var isResizable = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(column.resizable, resizable, false);
        var resizer = isResizable ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ResizerComponent, _extends({
          onMouseDown: function onMouseDown(e) {
            return _this2.resizeColumnStart(e, column, false);
          },
          onTouchStart: function onTouchStart(e) {
            return _this2.resizeColumnStart(e, column, true);
          }
        }, getResizerProps('finalState', undefined, column, _this2))) : null;

        var isSortable = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(column.sortable, sortable, false);

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(classes, isResizable && 'rt-resizable-header', sort ? sort.desc ? '-sort-desc' : '-sort-asc' : '', isSortable && '-cursor-pointer', !show && '-hidden', pivotBy && pivotBy.slice(0, -1).includes(column.id) && 'rt-header-pivot'),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(width),
              maxWidth: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(maxWidth)
            }),
            toggleSort: function toggleSort(e) {
              if (isSortable) _this2.sortColumn(column, multiSort ? e.shiftKey : false);
            }
          }, rest),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            { className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(isResizable && 'rt-resizable-header-content') },
            _utils__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeComponent(column.Header, {
              data: sortedData,
              column: column
            })
          ),
          resizer
        );
      };

      var makeHeaders = function makeHeaders() {
        var theadProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTheadProps(finalState, undefined, undefined, _this2));
        var theadTrProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTheadTrProps(finalState, undefined, undefined, _this2));
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          TheadComponent,
          _extends({
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('-header', theadProps.className),
            style: _extends({}, theadProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, theadProps.rest),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            TrComponent,
            _extends({
              className: theadTrProps.className,
              style: theadTrProps.style
            }, theadTrProps.rest),
            allVisibleColumns.map(makeHeader)
          )
        );
      };

      var makeFilter = function makeFilter(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var width = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var theadFilterThProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTheadFilterThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadFilterThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadFilterThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadFilterThProps.rest, columnHeaderProps.rest);

        var filter = filtered.find(function (filter) {
          return filter.id === column.id;
        });

        var ResolvedFilterComponent = column.Filter || FilterComponent;

        var isFilterable = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(column.filterable, filterable, false);

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(classes),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(width),
              maxWidth: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(maxWidth)
            })
          }, rest),
          isFilterable ? _utils__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeComponent(ResolvedFilterComponent, {
            column: column,
            filter: filter,
            onChange: function onChange(value) {
              return _this2.filterColumn(column, value);
            }
          }, _defaultProps__WEBPACK_IMPORTED_MODULE_5__["default"].column.Filter) : null
        );
      };

      var makeFilters = function makeFilters() {
        var theadFilterProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTheadFilterProps(finalState, undefined, undefined, _this2));
        var theadFilterTrProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTheadFilterTrProps(finalState, undefined, undefined, _this2));
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          TheadComponent,
          _extends({
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('-filters', theadFilterProps.className),
            style: _extends({}, theadFilterProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, theadFilterProps.rest),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            TrComponent,
            _extends({
              className: theadFilterTrProps.className,
              style: theadFilterTrProps.style
            }, theadFilterTrProps.rest),
            allVisibleColumns.map(makeFilter)
          )
        );
      };

      var makePageRow = function makePageRow(row, i) {
        var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        var rowInfo = {
          original: row[originalKey],
          row: row,
          index: row[indexKey],
          viewIndex: rowIndex += 1,
          pageSize: pageSize,
          page: page,
          level: path.length,
          nestingPath: path.concat([i]),
          aggregated: row[aggregatedKey],
          groupedByPivot: row[groupedByPivotKey],
          subRows: row[subRowsKey]
        };
        var isExpanded = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].get(expanded, rowInfo.nestingPath);
        var trGroupProps = getTrGroupProps(finalState, rowInfo, undefined, _this2);
        var trProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTrProps(finalState, rowInfo, undefined, _this2));
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          TrGroupComponent,
          _extends({ key: rowInfo.nestingPath.join('_') }, trGroupProps),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            TrComponent,
            _extends({
              className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(trProps.className, row._viewIndex % 2 ? '-even' : '-odd'),
              style: trProps.style
            }, trProps.rest),
            allVisibleColumns.map(function (column, i2) {
              var resizedCol = resized.find(function (x) {
                return x.id === column.id;
              }) || {};
              var show = typeof column.show === 'function' ? column.show() : column.show;
              var width = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedCol.value, column.width, column.minWidth);
              var maxWidth = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedCol.value, column.width, column.maxWidth);
              var tdProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTdProps(finalState, rowInfo, column, _this2));
              var columnProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(column.getProps(finalState, rowInfo, column, _this2));

              var classes = [tdProps.className, column.className, columnProps.className];

              var styles = _extends({}, tdProps.style, column.style, columnProps.style);

              var cellInfo = _extends({}, rowInfo, {
                isExpanded: isExpanded,
                column: _extends({}, column),
                value: rowInfo.row[column.id],
                pivoted: column.pivoted,
                expander: column.expander,
                resized: resized,
                show: show,
                width: width,
                maxWidth: maxWidth,
                tdProps: tdProps,
                columnProps: columnProps,
                classes: classes,
                styles: styles
              });

              var value = cellInfo.value;

              var useOnExpanderClick = void 0;
              var isBranch = void 0;
              var isPreview = void 0;

              var onExpanderClick = function onExpanderClick(e) {
                var newExpanded = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].clone(expanded);
                if (isExpanded) {
                  newExpanded = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].set(newExpanded, cellInfo.nestingPath, false);
                } else {
                  newExpanded = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].set(newExpanded, cellInfo.nestingPath, {});
                }

                return _this2.setStateWithData({
                  expanded: newExpanded
                }, function () {
                  return onExpandedChange && onExpandedChange(newExpanded, cellInfo.nestingPath, e);
                });
              };

              // Default to a standard cell
              var resolvedCell = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeComponent(column.Cell, cellInfo, value);

              // Resolve Renderers
              var ResolvedAggregatedComponent = column.Aggregated || (!column.aggregate ? AggregatedComponent : column.Cell);
              var ResolvedExpanderComponent = column.Expander || ExpanderComponent;
              var ResolvedPivotValueComponent = column.PivotValue || PivotValueComponent;
              var DefaultResolvedPivotComponent = PivotComponent || function (props) {
                return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  'div',
                  null,
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ResolvedExpanderComponent, props),
                  react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ResolvedPivotValueComponent, props)
                );
              };
              var ResolvedPivotComponent = column.Pivot || DefaultResolvedPivotComponent;

              // Is this cell expandable?
              if (cellInfo.pivoted || cellInfo.expander) {
                // Make it expandable by defualt
                cellInfo.expandable = true;
                useOnExpanderClick = true;
                // If pivoted, has no subRows, and does not have a subComponent,
                // do not make expandable
                if (cellInfo.pivoted && !cellInfo.subRows && !SubComponent) {
                  cellInfo.expandable = false;
                }
              }

              if (cellInfo.pivoted) {
                // Is this column a branch?
                isBranch = rowInfo.row[pivotIDKey] === column.id && cellInfo.subRows;
                // Should this column be blank?
                isPreview = pivotBy.indexOf(column.id) > pivotBy.indexOf(rowInfo.row[pivotIDKey]) && cellInfo.subRows;
                // Pivot Cell Render Override
                if (isBranch) {
                  // isPivot
                  resolvedCell = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeComponent(ResolvedPivotComponent, _extends({}, cellInfo, {
                    value: row[pivotValKey]
                  }), row[pivotValKey]);
                } else if (isPreview) {
                  // Show the pivot preview
                  resolvedCell = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeComponent(ResolvedAggregatedComponent, cellInfo, value);
                } else {
                  resolvedCell = null;
                }
              } else if (cellInfo.aggregated) {
                resolvedCell = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeComponent(ResolvedAggregatedComponent, cellInfo, value);
              }

              if (cellInfo.expander) {
                resolvedCell = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeComponent(ResolvedExpanderComponent, cellInfo, row[pivotValKey]);
                if (pivotBy) {
                  if (cellInfo.groupedByPivot) {
                    resolvedCell = null;
                  }
                  if (!cellInfo.subRows && !SubComponent) {
                    resolvedCell = null;
                  }
                }
              }

              var resolvedOnExpanderClick = useOnExpanderClick ? onExpanderClick : function () {};

              // If there are multiple onClick events, make sure they don't
              // override eachother. This should maybe be expanded to handle all
              // function attributes
              var interactionProps = {
                onClick: resolvedOnExpanderClick
              };

              if (tdProps.rest.onClick) {
                interactionProps.onClick = function (e) {
                  tdProps.rest.onClick(e, function () {
                    return resolvedOnExpanderClick(e);
                  });
                };
              }

              if (columnProps.rest.onClick) {
                interactionProps.onClick = function (e) {
                  columnProps.rest.onClick(e, function () {
                    return resolvedOnExpanderClick(e);
                  });
                };
              }

              // Return the cell
              return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                TdComponent
                // eslint-disable-next-line react/no-array-index-key
                ,
                _extends({ key: i2 + '-' + column.id,
                  className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(classes, !cellInfo.expandable && !show && 'hidden', cellInfo.expandable && 'rt-expandable', (isBranch || isPreview) && 'rt-pivot'),
                  style: _extends({}, styles, {
                    flex: width + ' 0 auto',
                    width: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(width),
                    maxWidth: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(maxWidth)
                  })
                }, tdProps.rest, columnProps.rest, interactionProps),
                resolvedCell
              );
            })
          ),
          rowInfo.subRows && isExpanded && rowInfo.subRows.map(function (d, i) {
            return makePageRow(d, i, rowInfo.nestingPath);
          }),
          SubComponent && !rowInfo.subRows && isExpanded && SubComponent(rowInfo, function () {
            var newExpanded = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].clone(expanded);

            _utils__WEBPACK_IMPORTED_MODULE_2__["default"].set(newExpanded, rowInfo.nestingPath, false);
          })
        );
      };

      var makePadColumn = function makePadColumn(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var flex = width;
        var maxWidth = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var tdProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTdProps(finalState, undefined, column, _this2));
        var columnProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(column.getProps(finalState, undefined, column, _this2));

        var classes = [tdProps.className, column.className, columnProps.className];

        var styles = _extends({}, tdProps.style, column.style, columnProps.style);

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          TdComponent,
          _extends({
            key: i + '-' + column.id,
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(classes, !show && 'hidden'),
            style: _extends({}, styles, {
              flex: flex + ' 0 auto',
              width: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(width),
              maxWidth: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(maxWidth)
            })
          }, tdProps.rest),
          _utils__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeComponent(PadRowComponent)
        );
      };

      var makePadRow = function makePadRow(row, i) {
        var trGroupProps = getTrGroupProps(finalState, undefined, undefined, _this2);
        var trProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTrProps(finalState, undefined, undefined, _this2));
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          TrGroupComponent,
          _extends({ key: 'pad-' + i }, trGroupProps),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            TrComponent,
            {
              className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('-padRow', (pageRows.length + i) % 2 ? '-even' : '-odd', trProps.className),
              style: trProps.style || {}
            },
            allVisibleColumns.map(makePadColumn)
          )
        );
      };

      var makeColumnFooter = function makeColumnFooter(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var tFootTdProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTfootTdProps(finalState, undefined, undefined, _this2));
        var columnProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(column.getProps(finalState, undefined, column, _this2));
        var columnFooterProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(column.getFooterProps(finalState, undefined, column, _this2));

        var classes = [tFootTdProps.className, column.className, columnProps.className, columnFooterProps.className];

        var styles = _extends({}, tFootTdProps.style, column.style, columnProps.style, columnFooterProps.style);

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          TdComponent,
          _extends({
            key: i + '-' + column.id,
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(classes, !show && 'hidden'),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(width),
              maxWidth: _utils__WEBPACK_IMPORTED_MODULE_2__["default"].asPx(maxWidth)
            })
          }, columnProps.rest, tFootTdProps.rest, columnFooterProps.rest),
          _utils__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeComponent(column.Footer, {
            data: sortedData,
            column: column
          })
        );
      };

      var makeColumnFooters = function makeColumnFooters() {
        var tFootProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTfootProps(finalState, undefined, undefined, _this2));
        var tFootTrProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getTfootTrProps(finalState, undefined, undefined, _this2));
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          TfootComponent,
          _extends({
            className: tFootProps.className,
            style: _extends({}, tFootProps.style, {
              minWidth: rowMinWidth + 'px'
            })
          }, tFootProps.rest),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            TrComponent,
            _extends({
              className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(tFootTrProps.className),
              style: tFootTrProps.style
            }, tFootTrProps.rest),
            allVisibleColumns.map(makeColumnFooter)
          )
        );
      };

      var makePagination = function makePagination(isTop) {
        var paginationProps = _utils__WEBPACK_IMPORTED_MODULE_2__["default"].splitProps(getPaginationProps(finalState, undefined, undefined, _this2));
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PaginationComponent, _extends({}, resolvedState, {
          pages: pages,
          canPrevious: canPrevious,
          canNext: canNext,
          onPageChange: _this2.onPageChange,
          onPageSizeChange: _this2.onPageSizeChange,
          className: paginationProps.className,
          style: paginationProps.style,
          isTop: isTop
        }, paginationProps.rest));
      };

      var makeTable = function makeTable() {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'div',
          _extends({
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('ReactTable', className, rootProps.className),
            style: _extends({}, style, rootProps.style)
          }, rootProps.rest),
          showPagination && showPaginationTop ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            { className: 'pagination-top' },
            makePagination(true)
          ) : null,
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            TableComponent,
            _extends({
              className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(tableProps.className, currentlyResizing ? 'rt-resizing' : ''),
              style: tableProps.style
            }, tableProps.rest),
            hasHeaderGroups ? makeHeaderGroups() : null,
            makeHeaders(),
            hasFilters ? makeFilters() : null,
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              TbodyComponent,
              _extends({
                className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(tBodyProps.className),
                style: _extends({}, tBodyProps.style, {
                  minWidth: rowMinWidth + 'px'
                })
              }, tBodyProps.rest),
              pageRows.map(function (d, i) {
                return makePageRow(d, i);
              }),
              padRows.map(makePadRow)
            ),
            hasColumnFooter ? makeColumnFooters() : null
          ),
          showPagination && showPaginationBottom ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'div',
            { className: 'pagination-bottom' },
            makePagination(false)
          ) : null,
          !pageRows.length && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            NoDataComponent,
            noDataProps,
            _utils__WEBPACK_IMPORTED_MODULE_2__["default"].normalizeComponent(noDataText)
          ),
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(LoadingComponent, _extends({ loading: loading, loadingText: loadingText }, loadingProps))
        );
      };

      // childProps are optionally passed to a function-as-a-child
      return children ? children(finalState, makeTable, this) : makeTable();
    }
  }]);

  return ReactTable;
}(Object(_methods__WEBPACK_IMPORTED_MODULE_4__["default"])(Object(_lifecycle__WEBPACK_IMPORTED_MODULE_3__["default"])(react__WEBPACK_IMPORTED_MODULE_0__["Component"])));

ReactTable.propTypes = _propTypes__WEBPACK_IMPORTED_MODULE_6__["default"];
ReactTable.defaultProps = _defaultProps__WEBPACK_IMPORTED_MODULE_5__["default"];
/* harmony default export */ __webpack_exports__["default"] = (ReactTable);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNsYXNzbmFtZXMiLCJfIiwiTGlmZWN5Y2xlIiwiTWV0aG9kcyIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsIlJlYWN0VGFibGVEZWZhdWx0cyIsIlJlYWN0VGFibGUiLCJwcm9wcyIsImdldFJlc29sdmVkU3RhdGUiLCJiaW5kIiwiZ2V0RGF0YU1vZGVsIiwiZ2V0U29ydGVkRGF0YSIsImZpcmVGZXRjaERhdGEiLCJnZXRQcm9wT3JTdGF0ZSIsImdldFN0YXRlT3JQcm9wIiwiZmlsdGVyRGF0YSIsInNvcnREYXRhIiwiZ2V0TWluUm93cyIsIm9uUGFnZUNoYW5nZSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJzb3J0Q29sdW1uIiwiZmlsdGVyQ29sdW1uIiwicmVzaXplQ29sdW1uU3RhcnQiLCJyZXNpemVDb2x1bW5FbmQiLCJyZXNpemVDb2x1bW5Nb3ZpbmciLCJzdGF0ZSIsInBhZ2UiLCJkZWZhdWx0UGFnZSIsInBhZ2VTaXplIiwiZGVmYXVsdFBhZ2VTaXplIiwic29ydGVkIiwiZGVmYXVsdFNvcnRlZCIsImV4cGFuZGVkIiwiZGVmYXVsdEV4cGFuZGVkIiwiZmlsdGVyZWQiLCJkZWZhdWx0RmlsdGVyZWQiLCJyZXNpemVkIiwiZGVmYXVsdFJlc2l6ZWQiLCJjdXJyZW50bHlSZXNpemluZyIsInNraXBOZXh0U29ydCIsInJlc29sdmVkU3RhdGUiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsInN0eWxlIiwiZ2V0UHJvcHMiLCJnZXRUYWJsZVByb3BzIiwiZ2V0VGhlYWRHcm91cFByb3BzIiwiZ2V0VGhlYWRHcm91cFRyUHJvcHMiLCJnZXRUaGVhZEdyb3VwVGhQcm9wcyIsImdldFRoZWFkUHJvcHMiLCJnZXRUaGVhZFRyUHJvcHMiLCJnZXRUaGVhZFRoUHJvcHMiLCJnZXRUaGVhZEZpbHRlclByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJUclByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJUaFByb3BzIiwiZ2V0VGJvZHlQcm9wcyIsImdldFRyR3JvdXBQcm9wcyIsImdldFRyUHJvcHMiLCJnZXRUZFByb3BzIiwiZ2V0VGZvb3RQcm9wcyIsImdldFRmb290VHJQcm9wcyIsImdldFRmb290VGRQcm9wcyIsImdldFBhZ2luYXRpb25Qcm9wcyIsImdldExvYWRpbmdQcm9wcyIsImdldE5vRGF0YVByb3BzIiwiZ2V0UmVzaXplclByb3BzIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwibWFudWFsIiwibG9hZGluZ1RleHQiLCJub0RhdGFUZXh0Iiwic29ydGFibGUiLCJtdWx0aVNvcnQiLCJyZXNpemFibGUiLCJmaWx0ZXJhYmxlIiwicGl2b3RJREtleSIsInBpdm90VmFsS2V5IiwicGl2b3RCeSIsInN1YlJvd3NLZXkiLCJhZ2dyZWdhdGVkS2V5Iiwib3JpZ2luYWxLZXkiLCJpbmRleEtleSIsImdyb3VwZWRCeVBpdm90S2V5IiwibG9hZGluZyIsInBhZ2VzIiwib25FeHBhbmRlZENoYW5nZSIsIlRhYmxlQ29tcG9uZW50IiwiVGhlYWRDb21wb25lbnQiLCJUYm9keUNvbXBvbmVudCIsIlRyR3JvdXBDb21wb25lbnQiLCJUckNvbXBvbmVudCIsIlRoQ29tcG9uZW50IiwiVGRDb21wb25lbnQiLCJUZm9vdENvbXBvbmVudCIsIlBhZ2luYXRpb25Db21wb25lbnQiLCJMb2FkaW5nQ29tcG9uZW50IiwiU3ViQ29tcG9uZW50IiwiTm9EYXRhQ29tcG9uZW50IiwiUmVzaXplckNvbXBvbmVudCIsIkV4cGFuZGVyQ29tcG9uZW50IiwiUGl2b3RWYWx1ZUNvbXBvbmVudCIsIlBpdm90Q29tcG9uZW50IiwiQWdncmVnYXRlZENvbXBvbmVudCIsIkZpbHRlckNvbXBvbmVudCIsIlBhZFJvd0NvbXBvbmVudCIsInJlc29sdmVkRGF0YSIsImFsbFZpc2libGVDb2x1bW5zIiwiaGVhZGVyR3JvdXBzIiwiaGFzSGVhZGVyR3JvdXBzIiwic29ydGVkRGF0YSIsInN0YXJ0Um93IiwiZW5kUm93IiwicGFnZVJvd3MiLCJzbGljZSIsIm1pblJvd3MiLCJwYWRSb3dzIiwicmFuZ2UiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaGFzQ29sdW1uRm9vdGVyIiwic29tZSIsImQiLCJGb290ZXIiLCJoYXNGaWx0ZXJzIiwicmVjdXJzZVJvd3NWaWV3SW5kZXgiLCJyb3dzIiwicGF0aCIsImluZGV4IiwibWFwIiwicm93IiwiaSIsInJvd1dpdGhWaWV3SW5kZXgiLCJfdmlld0luZGV4IiwibmV3UGF0aCIsImNvbmNhdCIsImdldCIsImNhblByZXZpb3VzIiwiY2FuTmV4dCIsInJvd01pbldpZHRoIiwic3VtIiwicmVzaXplZENvbHVtbiIsImZpbmQiLCJ4IiwiaWQiLCJnZXRGaXJzdERlZmluZWQiLCJ2YWx1ZSIsIndpZHRoIiwibWluV2lkdGgiLCJyb3dJbmRleCIsImZpbmFsU3RhdGUiLCJyb290UHJvcHMiLCJzcGxpdFByb3BzIiwidW5kZWZpbmVkIiwidGFibGVQcm9wcyIsInRCb2R5UHJvcHMiLCJsb2FkaW5nUHJvcHMiLCJub0RhdGFQcm9wcyIsIm1ha2VIZWFkZXJHcm91cCIsImNvbHVtbiIsInJlc2l6ZWRWYWx1ZSIsImNvbCIsImZsZXgiLCJjb2x1bW5zIiwibWF4V2lkdGgiLCJ0aGVhZEdyb3VwVGhQcm9wcyIsImNvbHVtbkhlYWRlclByb3BzIiwiZ2V0SGVhZGVyUHJvcHMiLCJjbGFzc2VzIiwiaGVhZGVyQ2xhc3NOYW1lIiwic3R5bGVzIiwiaGVhZGVyU3R5bGUiLCJyZXN0IiwiZmxleFN0eWxlcyIsImFzUHgiLCJub3JtYWxpemVDb21wb25lbnQiLCJIZWFkZXIiLCJkYXRhIiwibWFrZUhlYWRlckdyb3VwcyIsInRoZWFkR3JvdXBQcm9wcyIsInRoZWFkR3JvdXBUclByb3BzIiwibWFrZUhlYWRlciIsInJlc2l6ZWRDb2wiLCJzb3J0Iiwic2hvdyIsInRoZWFkVGhQcm9wcyIsImlzUmVzaXphYmxlIiwicmVzaXplciIsImUiLCJpc1NvcnRhYmxlIiwiZGVzYyIsImluY2x1ZGVzIiwic2hpZnRLZXkiLCJtYWtlSGVhZGVycyIsInRoZWFkUHJvcHMiLCJ0aGVhZFRyUHJvcHMiLCJtYWtlRmlsdGVyIiwidGhlYWRGaWx0ZXJUaFByb3BzIiwiZmlsdGVyIiwiUmVzb2x2ZWRGaWx0ZXJDb21wb25lbnQiLCJGaWx0ZXIiLCJpc0ZpbHRlcmFibGUiLCJvbkNoYW5nZSIsIm1ha2VGaWx0ZXJzIiwidGhlYWRGaWx0ZXJQcm9wcyIsInRoZWFkRmlsdGVyVHJQcm9wcyIsIm1ha2VQYWdlUm93Iiwicm93SW5mbyIsIm9yaWdpbmFsIiwidmlld0luZGV4IiwibGV2ZWwiLCJuZXN0aW5nUGF0aCIsImFnZ3JlZ2F0ZWQiLCJncm91cGVkQnlQaXZvdCIsInN1YlJvd3MiLCJpc0V4cGFuZGVkIiwidHJHcm91cFByb3BzIiwidHJQcm9wcyIsImpvaW4iLCJpMiIsInRkUHJvcHMiLCJjb2x1bW5Qcm9wcyIsImNlbGxJbmZvIiwicGl2b3RlZCIsImV4cGFuZGVyIiwidXNlT25FeHBhbmRlckNsaWNrIiwiaXNCcmFuY2giLCJpc1ByZXZpZXciLCJvbkV4cGFuZGVyQ2xpY2siLCJuZXdFeHBhbmRlZCIsImNsb25lIiwic2V0Iiwic2V0U3RhdGVXaXRoRGF0YSIsInJlc29sdmVkQ2VsbCIsIkNlbGwiLCJSZXNvbHZlZEFnZ3JlZ2F0ZWRDb21wb25lbnQiLCJBZ2dyZWdhdGVkIiwiYWdncmVnYXRlIiwiUmVzb2x2ZWRFeHBhbmRlckNvbXBvbmVudCIsIkV4cGFuZGVyIiwiUmVzb2x2ZWRQaXZvdFZhbHVlQ29tcG9uZW50IiwiUGl2b3RWYWx1ZSIsIkRlZmF1bHRSZXNvbHZlZFBpdm90Q29tcG9uZW50IiwiUmVzb2x2ZWRQaXZvdENvbXBvbmVudCIsIlBpdm90IiwiZXhwYW5kYWJsZSIsImluZGV4T2YiLCJyZXNvbHZlZE9uRXhwYW5kZXJDbGljayIsImludGVyYWN0aW9uUHJvcHMiLCJvbkNsaWNrIiwibWFrZVBhZENvbHVtbiIsIm1ha2VQYWRSb3ciLCJtYWtlQ29sdW1uRm9vdGVyIiwidEZvb3RUZFByb3BzIiwiY29sdW1uRm9vdGVyUHJvcHMiLCJnZXRGb290ZXJQcm9wcyIsIm1ha2VDb2x1bW5Gb290ZXJzIiwidEZvb3RQcm9wcyIsInRGb290VHJQcm9wcyIsIm1ha2VQYWdpbmF0aW9uIiwicGFnaW5hdGlvblByb3BzIiwiaXNUb3AiLCJtYWtlVGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLE9BQU9BLEtBQVAsSUFBZ0JDLFNBQWhCLFFBQWlDLE9BQWpDO0FBQ0EsT0FBT0MsVUFBUCxNQUF1QixZQUF2QjtBQUNBO0FBQ0EsT0FBT0MsQ0FBUCxNQUFjLFNBQWQ7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLGFBQXRCO0FBQ0EsT0FBT0MsT0FBUCxNQUFvQixXQUFwQjtBQUNBLE9BQU9DLFlBQVAsTUFBeUIsZ0JBQXpCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixhQUF0Qjs7QUFFQSxPQUFPLElBQU1DLHFCQUFxQkYsWUFBM0I7O0lBRWNHLFU7OztBQUluQixzQkFBYUMsS0FBYixFQUFvQjtBQUFBOztBQUFBOztBQUdsQixVQUFLQyxnQkFBTCxHQUF3QixNQUFLQSxnQkFBTCxDQUFzQkMsSUFBdEIsT0FBeEI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CLE1BQUtBLFlBQUwsQ0FBa0JELElBQWxCLE9BQXBCO0FBQ0EsVUFBS0UsYUFBTCxHQUFxQixNQUFLQSxhQUFMLENBQW1CRixJQUFuQixPQUFyQjtBQUNBLFVBQUtHLGFBQUwsR0FBcUIsTUFBS0EsYUFBTCxDQUFtQkgsSUFBbkIsT0FBckI7QUFDQSxVQUFLSSxjQUFMLEdBQXNCLE1BQUtBLGNBQUwsQ0FBb0JKLElBQXBCLE9BQXRCO0FBQ0EsVUFBS0ssY0FBTCxHQUFzQixNQUFLQSxjQUFMLENBQW9CTCxJQUFwQixPQUF0QjtBQUNBLFVBQUtNLFVBQUwsR0FBa0IsTUFBS0EsVUFBTCxDQUFnQk4sSUFBaEIsT0FBbEI7QUFDQSxVQUFLTyxRQUFMLEdBQWdCLE1BQUtBLFFBQUwsQ0FBY1AsSUFBZCxPQUFoQjtBQUNB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QUFDLGdCQUFELGFBQWtCLFNBQVNhLE9BQTNCLEVBQW9DLGFBQWFkLFdBQWpELElBQWtFdUYsWUFBbEU7QUF0Q0YsU0FEZ0I7QUFBQSxPQUFsQjs7QUEyQ0E7QUFDQSxhQUFPcEgsV0FBV0EsU0FBUzhHLFVBQVQsRUFBcUJnSCxTQUFyQixFQUFnQyxJQUFoQyxDQUFYLEdBQW1EQSxXQUExRDtBQUNEOzs7O0VBcDFCcUNyUSxRQUFRRCxVQUFVSCxTQUFWLENBQVIsQzs7QUFBbkJRLFUsQ0FDWkYsUyxHQUFZQSxTO0FBREFFLFUsQ0FFWkgsWSxHQUFlQSxZO2VBRkhHLFUiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuLy9cbmltcG9ydCBfIGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgTGlmZWN5Y2xlIGZyb20gJy4vbGlmZWN5Y2xlJ1xuaW1wb3J0IE1ldGhvZHMgZnJvbSAnLi9tZXRob2RzJ1xuaW1wb3J0IGRlZmF1bHRQcm9wcyBmcm9tICcuL2RlZmF1bHRQcm9wcydcbmltcG9ydCBwcm9wVHlwZXMgZnJvbSAnLi9wcm9wVHlwZXMnXG5cbmV4cG9ydCBjb25zdCBSZWFjdFRhYmxlRGVmYXVsdHMgPSBkZWZhdWx0UHJvcHNcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVhY3RUYWJsZSBleHRlbmRzIE1ldGhvZHMoTGlmZWN5Y2xlKENvbXBvbmVudCkpIHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHByb3BUeXBlc1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gZGVmYXVsdFByb3BzXG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIoKVxuXG4gICAgdGhpcy5nZXRSZXNvbHZlZFN0YXRlID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlLmJpbmQodGhpcylcbiAgICB0aGlzLmdldERhdGFNb2RlbCA9IHRoaXMuZ2V0RGF0YU1vZGVsLmJpbmQodGhpcylcbiAgICB0aGlzLmdldFNvcnRlZERhdGEgPSB0aGlzLmdldFNvcnRlZERhdGEuYmluZCh0aGlzKVxuICAgIHRoaXMuZmlyZUZldGNoRGF0YSA9IHRoaXMuZmlyZUZldGNoRGF0YS5iaW5kKHRoaXMpXG4gICAgdGhpcy5nZXRQcm9wT3JTdGF0ZSA9IHRoaXMuZ2V0UHJvcE9yU3RhdGUuYmluZCh0aGlzKVxuICAgIHRoaXMuZ2V0U3RhdGVPclByb3AgPSB0aGlzLmdldFN0YXRlT3JQcm9wLmJpbmQodGhpcylcbiAgICB0aGlzLmZpbHRlckRhdGEgPSB0aGlzLmZpbHRlckRhdGEuYmluZCh0aGlzKVxuICAgIHRoaXMuc29ydERhdGEgPSB0aGlzLnNvcnREYXRhLmJpbmQodGhpcylcbiAgICB0aGlzLmdldE1pblJvd3MgPSB0aGlzLmdldE1pblJvd3MuYmluZCh0aGlzKVxuICAgIHRoaXMub25QYWdlQ2hhbmdlID0gdGhpcy5vblBhZ2VDaGFuZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMub25QYWdlU2l6ZUNoYW5nZSA9IHRoaXMub25QYWdlU2l6ZUNoYW5nZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5zb3J0Q29sdW1uID0gdGhpcy5zb3J0Q29sdW1uLmJpbmQodGhpcylcbiAgICB0aGlzLmZpbHRlckNvbHVtbiA9IHRoaXMuZmlsdGVyQ29sdW1uLmJpbmQodGhpcylcbiAgICB0aGlzLnJlc2l6ZUNvbHVtblN0YXJ0ID0gdGhpcy5yZXNpemVDb2x1bW5TdGFydC5iaW5kKHRoaXMpXG4gICAgdGhpcy5yZXNpemVDb2x1bW5FbmQgPSB0aGlzLnJlc2l6ZUNvbHVtbkVuZC5iaW5kKHRoaXMpXG4gICAgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcgPSB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZy5iaW5kKHRoaXMpXG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgcGFnZTogcHJvcHMuZGVmYXVsdFBhZ2UsXG4gICAgICBwYWdlU2l6ZTogcHJvcHMuZGVmYXVsdFBhZ2VTaXplLFxuICAgICAgc29ydGVkOiBwcm9wcy5kZWZhdWx0U29ydGVkLFxuICAgICAgZXhwYW5kZWQ6IHByb3BzLmRlZmF1bHRFeHBhbmRlZCxcbiAgICAgIGZpbHRlcmVkOiBwcm9wcy5kZWZhdWx0RmlsdGVyZWQsXG4gICAgICByZXNpemVkOiBwcm9wcy5kZWZhdWx0UmVzaXplZCxcbiAgICAgIGN1cnJlbnRseVJlc2l6aW5nOiBmYWxzZSxcbiAgICAgIHNraXBOZXh0U29ydDogZmFsc2UsXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCByZXNvbHZlZFN0YXRlID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcbiAgICBjb25zdCB7XG4gICAgICBjaGlsZHJlbixcbiAgICAgIGNsYXNzTmFtZSxcbiAgICAgIHN0eWxlLFxuICAgICAgZ2V0UHJvcHMsXG4gICAgICBnZXRUYWJsZVByb3BzLFxuICAgICAgZ2V0VGhlYWRHcm91cFByb3BzLFxuICAgICAgZ2V0VGhlYWRHcm91cFRyUHJvcHMsXG4gICAgICBnZXRUaGVhZEdyb3VwVGhQcm9wcyxcbiAgICAgIGdldFRoZWFkUHJvcHMsXG4gICAgICBnZXRUaGVhZFRyUHJvcHMsXG4gICAgICBnZXRUaGVhZFRoUHJvcHMsXG4gICAgICBnZXRUaGVhZEZpbHRlclByb3BzLFxuICAgICAgZ2V0VGhlYWRGaWx0ZXJUclByb3BzLFxuICAgICAgZ2V0VGhlYWRGaWx0ZXJUaFByb3BzLFxuICAgICAgZ2V0VGJvZHlQcm9wcyxcbiAgICAgIGdldFRyR3JvdXBQcm9wcyxcbiAgICAgIGdldFRyUHJvcHMsXG4gICAgICBnZXRUZFByb3BzLFxuICAgICAgZ2V0VGZvb3RQcm9wcyxcbiAgICAgIGdldFRmb290VHJQcm9wcyxcbiAgICAgIGdldFRmb290VGRQcm9wcyxcbiAgICAgIGdldFBhZ2luYXRpb25Qcm9wcyxcbiAgICAgIGdldExvYWRpbmdQcm9wcyxcbiAgICAgIGdldE5vRGF0YVByb3BzLFxuICAgICAgZ2V0UmVzaXplclByb3BzLFxuICAgICAgc2hvd1BhZ2luYXRpb24sXG4gICAgICBzaG93UGFnaW5hdGlvblRvcCxcbiAgICAgIHNob3dQYWdpbmF0aW9uQm90dG9tLFxuICAgICAgbWFudWFsLFxuICAgICAgbG9hZGluZ1RleHQsXG4gICAgICBub0RhdGFUZXh0LFxuICAgICAgc29ydGFibGUsXG4gICAgICBtdWx0aVNvcnQsXG4gICAgICByZXNpemFibGUsXG4gICAgICBmaWx0ZXJhYmxlLFxuICAgICAgLy8gUGl2b3RpbmcgU3RhdGVcbiAgICAgIHBpdm90SURLZXksXG4gICAgICBwaXZvdFZhbEtleSxcbiAgICAgIHBpdm90QnksXG4gICAgICBzdWJSb3dzS2V5LFxuICAgICAgYWdncmVnYXRlZEtleSxcbiAgICAgIG9yaWdpbmFsS2V5LFxuICAgICAgaW5kZXhLZXksXG4gICAgICBncm91cGVkQnlQaXZvdEtleSxcbiAgICAgIC8vIFN0YXRlXG4gICAgICBsb2FkaW5nLFxuICAgICAgcGFnZVNpemUsXG4gICAgICBwYWdlLFxuICAgICAgc29ydGVkLFxuICAgICAgZmlsdGVyZWQsXG4gICAgICByZXNpemVkLFxuICAgICAgZXhwYW5kZWQsXG4gICAgICBwYWdlcyxcbiAgICAgIG9uRXhwYW5kZWRDaGFuZ2UsXG4gICAgICAvLyBDb21wb25lbnRzXG4gICAgICBUYWJsZUNvbXBvbmVudCxcbiAgICAgIFRoZWFkQ29tcG9uZW50LFxuICAgICAgVGJvZHlDb21wb25lbnQsXG4gICAgICBUckdyb3VwQ29tcG9uZW50LFxuICAgICAgVHJDb21wb25lbnQsXG4gICAgICBUaENvbXBvbmVudCxcbiAgICAgIFRkQ29tcG9uZW50LFxuICAgICAgVGZvb3RDb21wb25lbnQsXG4gICAgICBQYWdpbmF0aW9uQ29tcG9uZW50LFxuICAgICAgTG9hZGluZ0NvbXBvbmVudCxcbiAgICAgIFN1YkNvbXBvbmVudCxcbiAgICAgIE5vRGF0YUNvbXBvbmVudCxcbiAgICAgIFJlc2l6ZXJDb21wb25lbnQsXG4gICAgICBFeHBhbmRlckNvbXBvbmVudCxcbiAgICAgIFBpdm90VmFsdWVDb21wb25lbnQsXG4gICAgICBQaXZvdENvbXBvbmVudCxcbiAgICAgIEFnZ3JlZ2F0ZWRDb21wb25lbnQsXG4gICAgICBGaWx0ZXJDb21wb25lbnQsXG4gICAgICBQYWRSb3dDb21wb25lbnQsXG4gICAgICAvLyBEYXRhIG1vZGVsXG4gICAgICByZXNvbHZlZERhdGEsXG4gICAgICBhbGxWaXNpYmxlQ29sdW1ucyxcbiAgICAgIGhlYWRlckdyb3VwcyxcbiAgICAgIGhhc0hlYWRlckdyb3VwcyxcbiAgICAgIC8vIFNvcnRlZCBEYXRhXG4gICAgICBzb3J0ZWREYXRhLFxuICAgICAgY3VycmVudGx5UmVzaXppbmcsXG4gICAgfSA9IHJlc29sdmVkU3RhdGVcblxuICAgIC8vIFBhZ2luYXRpb25cbiAgICBjb25zdCBzdGFydFJvdyA9IHBhZ2VTaXplICogcGFnZVxuICAgIGNvbnN0IGVuZFJvdyA9IHN0YXJ0Um93ICsgcGFnZVNpemVcbiAgICBsZXQgcGFnZVJvd3MgPSBtYW51YWwgPyByZXNvbHZlZERhdGEgOiBzb3J0ZWREYXRhLnNsaWNlKHN0YXJ0Um93LCBlbmRSb3cpXG4gICAgY29uc3QgbWluUm93cyA9IHRoaXMuZ2V0TWluUm93cygpXG4gICAgY29uc3QgcGFkUm93cyA9IF8ucmFuZ2UoTWF0aC5tYXgobWluUm93cyAtIHBhZ2VSb3dzLmxlbmd0aCwgMCkpXG5cbiAgICBjb25zdCBoYXNDb2x1bW5Gb290ZXIgPSBhbGxWaXNpYmxlQ29sdW1ucy5zb21lKGQgPT4gZC5Gb290ZXIpXG4gICAgY29uc3QgaGFzRmlsdGVycyA9IGZpbHRlcmFibGUgfHwgYWxsVmlzaWJsZUNvbHVtbnMuc29tZShkID0+IGQuZmlsdGVyYWJsZSlcblxuICAgIGNvbnN0IHJlY3Vyc2VSb3dzVmlld0luZGV4ID0gKHJvd3MsIHBhdGggPSBbXSwgaW5kZXggPSAtMSkgPT4gW1xuICAgICAgcm93cy5tYXAoKHJvdywgaSkgPT4ge1xuICAgICAgICBpbmRleCArPSAxXG4gICAgICAgIGNvbnN0IHJvd1dpdGhWaWV3SW5kZXggPSB7XG4gICAgICAgICAgLi4ucm93LFxuICAgICAgICAgIF92aWV3SW5kZXg6IGluZGV4LFxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld1BhdGggPSBwYXRoLmNvbmNhdChbaV0pXG4gICAgICAgIGlmIChyb3dXaXRoVmlld0luZGV4W3N1YlJvd3NLZXldICYmIF8uZ2V0KGV4cGFuZGVkLCBuZXdQYXRoKSkge1xuICAgICAgICAgIFtyb3dXaXRoVmlld0luZGV4W3N1YlJvd3NLZXldLCBpbmRleF0gPSByZWN1cnNlUm93c1ZpZXdJbmRleChcbiAgICAgICAgICAgIHJvd1dpdGhWaWV3SW5kZXhbc3ViUm93c0tleV0sXG4gICAgICAgICAgICBuZXdQYXRoLFxuICAgICAgICAgICAgaW5kZXhcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvd1dpdGhWaWV3SW5kZXhcbiAgICAgIH0pLFxuICAgICAgaW5kZXgsXG4gICAgXTtcbiAgICBbcGFnZVJvd3NdID0gcmVjdXJzZVJvd3NWaWV3SW5kZXgocGFnZVJvd3MpXG5cbiAgICBjb25zdCBjYW5QcmV2aW91cyA9IHBhZ2UgPiAwXG4gICAgY29uc3QgY2FuTmV4dCA9IHBhZ2UgKyAxIDwgcGFnZXNcblxuICAgIGNvbnN0IHJvd01pbldpZHRoID0gXy5zdW0oXG4gICAgICBhbGxWaXNpYmxlQ29sdW1ucy5tYXAoZCA9PiB7XG4gICAgICAgIGNvbnN0IHJlc2l6ZWRDb2x1bW4gPSByZXNpemVkLmZpbmQoeCA9PiB4LmlkID09PSBkLmlkKSB8fCB7fVxuICAgICAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbHVtbi52YWx1ZSwgZC53aWR0aCwgZC5taW5XaWR0aClcbiAgICAgIH0pXG4gICAgKVxuXG4gICAgbGV0IHJvd0luZGV4ID0gLTFcblxuICAgIGNvbnN0IGZpbmFsU3RhdGUgPSB7XG4gICAgICAuLi5yZXNvbHZlZFN0YXRlLFxuICAgICAgc3RhcnRSb3csXG4gICAgICBlbmRSb3csXG4gICAgICBwYWdlUm93cyxcbiAgICAgIG1pblJvd3MsXG4gICAgICBwYWRSb3dzLFxuICAgICAgaGFzQ29sdW1uRm9vdGVyLFxuICAgICAgY2FuUHJldmlvdXMsXG4gICAgICBjYW5OZXh0LFxuICAgICAgcm93TWluV2lkdGgsXG4gICAgfVxuXG4gICAgY29uc3Qgcm9vdFByb3BzID0gXy5zcGxpdFByb3BzKGdldFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICBjb25zdCB0YWJsZVByb3BzID0gXy5zcGxpdFByb3BzKGdldFRhYmxlUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgIGNvbnN0IHRCb2R5UHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGJvZHlQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgY29uc3QgbG9hZGluZ1Byb3BzID0gZ2V0TG9hZGluZ1Byb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKVxuICAgIGNvbnN0IG5vRGF0YVByb3BzID0gZ2V0Tm9EYXRhUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXG5cbiAgICAvLyBWaXN1YWwgQ29tcG9uZW50c1xuXG4gICAgY29uc3QgbWFrZUhlYWRlckdyb3VwID0gKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgY29uc3QgcmVzaXplZFZhbHVlID0gY29sID0+IChyZXNpemVkLmZpbmQoeCA9PiB4LmlkID09PSBjb2wuaWQpIHx8IHt9KS52YWx1ZVxuICAgICAgY29uc3QgZmxleCA9IF8uc3VtKFxuICAgICAgICBjb2x1bW4uY29sdW1ucy5tYXAoY29sID0+IChjb2wud2lkdGggfHwgcmVzaXplZFZhbHVlKGNvbCkgPyAwIDogY29sLm1pbldpZHRoKSlcbiAgICAgIClcbiAgICAgIGNvbnN0IHdpZHRoID0gXy5zdW0oXG4gICAgICAgIGNvbHVtbi5jb2x1bW5zLm1hcChjb2wgPT4gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZFZhbHVlKGNvbCksIGNvbC53aWR0aCwgY29sLm1pbldpZHRoKSlcbiAgICAgIClcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5zdW0oXG4gICAgICAgIGNvbHVtbi5jb2x1bW5zLm1hcChjb2wgPT4gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZFZhbHVlKGNvbCksIGNvbC53aWR0aCwgY29sLm1heFdpZHRoKSlcbiAgICAgIClcblxuICAgICAgY29uc3QgdGhlYWRHcm91cFRoUHJvcHMgPSBfLnNwbGl0UHJvcHMoXG4gICAgICAgIGdldFRoZWFkR3JvdXBUaFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKVxuICAgICAgKVxuICAgICAgY29uc3QgY29sdW1uSGVhZGVyUHJvcHMgPSBfLnNwbGl0UHJvcHMoXG4gICAgICAgIGNvbHVtbi5nZXRIZWFkZXJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcylcbiAgICAgIClcblxuICAgICAgY29uc3QgY2xhc3NlcyA9IFtcbiAgICAgICAgY29sdW1uLmhlYWRlckNsYXNzTmFtZSxcbiAgICAgICAgdGhlYWRHcm91cFRoUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICBjb2x1bW5IZWFkZXJQcm9wcy5jbGFzc05hbWUsXG4gICAgICBdXG5cbiAgICAgIGNvbnN0IHN0eWxlcyA9IHtcbiAgICAgICAgLi4uY29sdW1uLmhlYWRlclN0eWxlLFxuICAgICAgICAuLi50aGVhZEdyb3VwVGhQcm9wcy5zdHlsZSxcbiAgICAgICAgLi4uY29sdW1uSGVhZGVyUHJvcHMuc3R5bGUsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3QgPSB7XG4gICAgICAgIC4uLnRoZWFkR3JvdXBUaFByb3BzLnJlc3QsXG4gICAgICAgIC4uLmNvbHVtbkhlYWRlclByb3BzLnJlc3QsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZsZXhTdHlsZXMgPSB7XG4gICAgICAgIGZsZXg6IGAke2ZsZXh9IDAgYXV0b2AsXG4gICAgICAgIHdpZHRoOiBfLmFzUHgod2lkdGgpLFxuICAgICAgICBtYXhXaWR0aDogXy5hc1B4KG1heFdpZHRoKSxcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRoQ29tcG9uZW50XG4gICAgICAgICAga2V5PXtgJHtpfS0ke2NvbHVtbi5pZH1gfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhjbGFzc2VzKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgLi4uZmxleFN0eWxlcyxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KGNvbHVtbi5IZWFkZXIsIHtcbiAgICAgICAgICAgIGRhdGE6IHNvcnRlZERhdGEsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvVGhDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZUhlYWRlckdyb3VwcyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHRoZWFkR3JvdXBQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZEdyb3VwUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgICAgY29uc3QgdGhlYWRHcm91cFRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRHcm91cFRyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRoZWFkQ29tcG9uZW50XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCctaGVhZGVyR3JvdXBzJywgdGhlYWRHcm91cFByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLnRoZWFkR3JvdXBQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGAsXG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4udGhlYWRHcm91cFByb3BzLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhlYWRHcm91cFRyUHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgICAgc3R5bGU9e3RoZWFkR3JvdXBUclByb3BzLnN0eWxlfVxuICAgICAgICAgICAgey4uLnRoZWFkR3JvdXBUclByb3BzLnJlc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2hlYWRlckdyb3Vwcy5tYXAobWFrZUhlYWRlckdyb3VwKX1cbiAgICAgICAgICA8L1RyQ29tcG9uZW50PlxuICAgICAgICA8L1RoZWFkQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VIZWFkZXIgPSAoY29sdW1uLCBpKSA9PiB7XG4gICAgICBjb25zdCByZXNpemVkQ29sID0gcmVzaXplZC5maW5kKHggPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxuICAgICAgY29uc3Qgc29ydCA9IHNvcnRlZC5maW5kKGQgPT4gZC5pZCA9PT0gY29sdW1uLmlkKVxuICAgICAgY29uc3Qgc2hvdyA9IHR5cGVvZiBjb2x1bW4uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5zaG93KCkgOiBjb2x1bW4uc2hvd1xuICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChyZXNpemVkQ29sLnZhbHVlLCBjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXG4gICAgICBjb25zdCB0aGVhZFRoUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRUaFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcbiAgICAgIGNvbnN0IGNvbHVtbkhlYWRlclByb3BzID0gXy5zcGxpdFByb3BzKFxuICAgICAgICBjb2x1bW4uZ2V0SGVhZGVyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbY29sdW1uLmhlYWRlckNsYXNzTmFtZSwgdGhlYWRUaFByb3BzLmNsYXNzTmFtZSwgY29sdW1uSGVhZGVyUHJvcHMuY2xhc3NOYW1lXVxuXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgIC4uLmNvbHVtbi5oZWFkZXJTdHlsZSxcbiAgICAgICAgLi4udGhlYWRUaFByb3BzLnN0eWxlLFxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5zdHlsZSxcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdCA9IHtcbiAgICAgICAgLi4udGhlYWRUaFByb3BzLnJlc3QsXG4gICAgICAgIC4uLmNvbHVtbkhlYWRlclByb3BzLnJlc3QsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzUmVzaXphYmxlID0gXy5nZXRGaXJzdERlZmluZWQoY29sdW1uLnJlc2l6YWJsZSwgcmVzaXphYmxlLCBmYWxzZSlcbiAgICAgIGNvbnN0IHJlc2l6ZXIgPSBpc1Jlc2l6YWJsZSA/IChcbiAgICAgICAgPFJlc2l6ZXJDb21wb25lbnRcbiAgICAgICAgICBvbk1vdXNlRG93bj17ZSA9PiB0aGlzLnJlc2l6ZUNvbHVtblN0YXJ0KGUsIGNvbHVtbiwgZmFsc2UpfVxuICAgICAgICAgIG9uVG91Y2hTdGFydD17ZSA9PiB0aGlzLnJlc2l6ZUNvbHVtblN0YXJ0KGUsIGNvbHVtbiwgdHJ1ZSl9XG4gICAgICAgICAgey4uLmdldFJlc2l6ZXJQcm9wcygnZmluYWxTdGF0ZScsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKX1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsXG5cbiAgICAgIGNvbnN0IGlzU29ydGFibGUgPSBfLmdldEZpcnN0RGVmaW5lZChjb2x1bW4uc29ydGFibGUsIHNvcnRhYmxlLCBmYWxzZSlcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRoQ29tcG9uZW50XG4gICAgICAgICAga2V5PXtgJHtpfS0ke2NvbHVtbi5pZH1gfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICBpc1Jlc2l6YWJsZSAmJiAncnQtcmVzaXphYmxlLWhlYWRlcicsXG4gICAgICAgICAgICBzb3J0ID8gKHNvcnQuZGVzYyA/ICctc29ydC1kZXNjJyA6ICctc29ydC1hc2MnKSA6ICcnLFxuICAgICAgICAgICAgaXNTb3J0YWJsZSAmJiAnLWN1cnNvci1wb2ludGVyJyxcbiAgICAgICAgICAgICFzaG93ICYmICctaGlkZGVuJyxcbiAgICAgICAgICAgIHBpdm90QnkgJiYgcGl2b3RCeS5zbGljZSgwLCAtMSkuaW5jbHVkZXMoY29sdW1uLmlkKSAmJiAncnQtaGVhZGVyLXBpdm90J1xuICAgICAgICAgICl9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxuICAgICAgICAgICAgd2lkdGg6IF8uYXNQeCh3aWR0aCksXG4gICAgICAgICAgICBtYXhXaWR0aDogXy5hc1B4KG1heFdpZHRoKSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRvZ2dsZVNvcnQ9e2UgPT4ge1xuICAgICAgICAgICAgaWYgKGlzU29ydGFibGUpIHRoaXMuc29ydENvbHVtbihjb2x1bW4sIG11bHRpU29ydCA/IGUuc2hpZnRLZXkgOiBmYWxzZSlcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoaXNSZXNpemFibGUgJiYgJ3J0LXJlc2l6YWJsZS1oZWFkZXItY29udGVudCcpfT5cbiAgICAgICAgICAgIHtfLm5vcm1hbGl6ZUNvbXBvbmVudChjb2x1bW4uSGVhZGVyLCB7XG4gICAgICAgICAgICAgIGRhdGE6IHNvcnRlZERhdGEsXG4gICAgICAgICAgICAgIGNvbHVtbixcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtyZXNpemVyfVxuICAgICAgICA8L1RoQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VIZWFkZXJzID0gKCkgPT4ge1xuICAgICAgY29uc3QgdGhlYWRQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgIGNvbnN0IHRoZWFkVHJQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUaGVhZFRyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFRoZWFkQ29tcG9uZW50XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCctaGVhZGVyJywgdGhlYWRQcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi50aGVhZFByb3BzLnN0eWxlLFxuICAgICAgICAgICAgbWluV2lkdGg6IGAke3Jvd01pbldpZHRofXB4YCxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi50aGVhZFByb3BzLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhlYWRUclByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgIHN0eWxlPXt0aGVhZFRyUHJvcHMuc3R5bGV9XG4gICAgICAgICAgICB7Li4udGhlYWRUclByb3BzLnJlc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2FsbFZpc2libGVDb2x1bW5zLm1hcChtYWtlSGVhZGVyKX1cbiAgICAgICAgICA8L1RyQ29tcG9uZW50PlxuICAgICAgICA8L1RoZWFkQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VGaWx0ZXIgPSAoY29sdW1uLCBpKSA9PiB7XG4gICAgICBjb25zdCByZXNpemVkQ29sID0gcmVzaXplZC5maW5kKHggPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxuICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChyZXNpemVkQ29sLnZhbHVlLCBjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXG4gICAgICBjb25zdCB0aGVhZEZpbHRlclRoUHJvcHMgPSBfLnNwbGl0UHJvcHMoXG4gICAgICAgIGdldFRoZWFkRmlsdGVyVGhQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcylcbiAgICAgIClcbiAgICAgIGNvbnN0IGNvbHVtbkhlYWRlclByb3BzID0gXy5zcGxpdFByb3BzKFxuICAgICAgICBjb2x1bW4uZ2V0SGVhZGVyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICAgIGNvbHVtbi5oZWFkZXJDbGFzc05hbWUsXG4gICAgICAgIHRoZWFkRmlsdGVyVGhQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgIGNvbHVtbkhlYWRlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgIF1cblxuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAuLi5jb2x1bW4uaGVhZGVyU3R5bGUsXG4gICAgICAgIC4uLnRoZWFkRmlsdGVyVGhQcm9wcy5zdHlsZSxcbiAgICAgICAgLi4uY29sdW1uSGVhZGVyUHJvcHMuc3R5bGUsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3QgPSB7XG4gICAgICAgIC4uLnRoZWFkRmlsdGVyVGhQcm9wcy5yZXN0LFxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5yZXN0LFxuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWx0ZXIgPSBmaWx0ZXJlZC5maW5kKGZpbHRlciA9PiBmaWx0ZXIuaWQgPT09IGNvbHVtbi5pZClcblxuICAgICAgY29uc3QgUmVzb2x2ZWRGaWx0ZXJDb21wb25lbnQgPSBjb2x1bW4uRmlsdGVyIHx8IEZpbHRlckNvbXBvbmVudFxuXG4gICAgICBjb25zdCBpc0ZpbHRlcmFibGUgPSBfLmdldEZpcnN0RGVmaW5lZChjb2x1bW4uZmlsdGVyYWJsZSwgZmlsdGVyYWJsZSwgZmFsc2UpXG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaENvbXBvbmVudFxuICAgICAgICAgIGtleT17YCR7aX0tJHtjb2x1bW4uaWR9YH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoY2xhc3Nlcyl9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxuICAgICAgICAgICAgd2lkdGg6IF8uYXNQeCh3aWR0aCksXG4gICAgICAgICAgICBtYXhXaWR0aDogXy5hc1B4KG1heFdpZHRoKSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge2lzRmlsdGVyYWJsZVxuICAgICAgICAgICAgPyBfLm5vcm1hbGl6ZUNvbXBvbmVudChcbiAgICAgICAgICAgICAgICBSZXNvbHZlZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdmFsdWUgPT4gdGhpcy5maWx0ZXJDb2x1bW4oY29sdW1uLCB2YWx1ZSksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0UHJvcHMuY29sdW1uLkZpbHRlclxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IG51bGx9XG4gICAgICAgIDwvVGhDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCB0aGVhZEZpbHRlclByb3BzID0gXy5zcGxpdFByb3BzKFxuICAgICAgICBnZXRUaGVhZEZpbHRlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKVxuICAgICAgKVxuICAgICAgY29uc3QgdGhlYWRGaWx0ZXJUclByb3BzID0gXy5zcGxpdFByb3BzKFxuICAgICAgICBnZXRUaGVhZEZpbHRlclRyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXG4gICAgICApXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGhlYWRDb21wb25lbnRcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJy1maWx0ZXJzJywgdGhlYWRGaWx0ZXJQcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi50aGVhZEZpbHRlclByb3BzLnN0eWxlLFxuICAgICAgICAgICAgbWluV2lkdGg6IGAke3Jvd01pbldpZHRofXB4YCxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi50aGVhZEZpbHRlclByb3BzLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhlYWRGaWx0ZXJUclByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgIHN0eWxlPXt0aGVhZEZpbHRlclRyUHJvcHMuc3R5bGV9XG4gICAgICAgICAgICB7Li4udGhlYWRGaWx0ZXJUclByb3BzLnJlc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2FsbFZpc2libGVDb2x1bW5zLm1hcChtYWtlRmlsdGVyKX1cbiAgICAgICAgICA8L1RyQ29tcG9uZW50PlxuICAgICAgICA8L1RoZWFkQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VQYWdlUm93ID0gKHJvdywgaSwgcGF0aCA9IFtdKSA9PiB7XG4gICAgICBjb25zdCByb3dJbmZvID0ge1xuICAgICAgICBvcmlnaW5hbDogcm93W29yaWdpbmFsS2V5XSxcbiAgICAgICAgcm93LFxuICAgICAgICBpbmRleDogcm93W2luZGV4S2V5XSxcbiAgICAgICAgdmlld0luZGV4OiAocm93SW5kZXggKz0gMSksXG4gICAgICAgIHBhZ2VTaXplLFxuICAgICAgICBwYWdlLFxuICAgICAgICBsZXZlbDogcGF0aC5sZW5ndGgsXG4gICAgICAgIG5lc3RpbmdQYXRoOiBwYXRoLmNvbmNhdChbaV0pLFxuICAgICAgICBhZ2dyZWdhdGVkOiByb3dbYWdncmVnYXRlZEtleV0sXG4gICAgICAgIGdyb3VwZWRCeVBpdm90OiByb3dbZ3JvdXBlZEJ5UGl2b3RLZXldLFxuICAgICAgICBzdWJSb3dzOiByb3dbc3ViUm93c0tleV0sXG4gICAgICB9XG4gICAgICBjb25zdCBpc0V4cGFuZGVkID0gXy5nZXQoZXhwYW5kZWQsIHJvd0luZm8ubmVzdGluZ1BhdGgpXG4gICAgICBjb25zdCB0ckdyb3VwUHJvcHMgPSBnZXRUckdyb3VwUHJvcHMoZmluYWxTdGF0ZSwgcm93SW5mbywgdW5kZWZpbmVkLCB0aGlzKVxuICAgICAgY29uc3QgdHJQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUclByb3BzKGZpbmFsU3RhdGUsIHJvd0luZm8sIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VHJHcm91cENvbXBvbmVudCBrZXk9e3Jvd0luZm8ubmVzdGluZ1BhdGguam9pbignXycpfSB7Li4udHJHcm91cFByb3BzfT5cbiAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0clByb3BzLmNsYXNzTmFtZSwgcm93Ll92aWV3SW5kZXggJSAyID8gJy1ldmVuJyA6ICctb2RkJyl9XG4gICAgICAgICAgICBzdHlsZT17dHJQcm9wcy5zdHlsZX1cbiAgICAgICAgICAgIHsuLi50clByb3BzLnJlc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2FsbFZpc2libGVDb2x1bW5zLm1hcCgoY29sdW1uLCBpMikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCByZXNpemVkQ29sID0gcmVzaXplZC5maW5kKHggPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxuICAgICAgICAgICAgICBjb25zdCBzaG93ID0gdHlwZW9mIGNvbHVtbi5zaG93ID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnNob3coKSA6IGNvbHVtbi5zaG93XG4gICAgICAgICAgICAgIGNvbnN0IHdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWluV2lkdGgpXG4gICAgICAgICAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXG4gICAgICAgICAgICAgIGNvbnN0IHRkUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGRQcm9wcyhmaW5hbFN0YXRlLCByb3dJbmZvLCBjb2x1bW4sIHRoaXMpKVxuICAgICAgICAgICAgICBjb25zdCBjb2x1bW5Qcm9wcyA9IF8uc3BsaXRQcm9wcyhjb2x1bW4uZ2V0UHJvcHMoZmluYWxTdGF0ZSwgcm93SW5mbywgY29sdW1uLCB0aGlzKSlcblxuICAgICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gW3RkUHJvcHMuY2xhc3NOYW1lLCBjb2x1bW4uY2xhc3NOYW1lLCBjb2x1bW5Qcm9wcy5jbGFzc05hbWVdXG5cbiAgICAgICAgICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAgICAgICAgIC4uLnRkUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgICAgLi4uY29sdW1uLnN0eWxlLFxuICAgICAgICAgICAgICAgIC4uLmNvbHVtblByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgY2VsbEluZm8gPSB7XG4gICAgICAgICAgICAgICAgLi4ucm93SW5mbyxcbiAgICAgICAgICAgICAgICBpc0V4cGFuZGVkLFxuICAgICAgICAgICAgICAgIGNvbHVtbjogeyAuLi5jb2x1bW4gfSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogcm93SW5mby5yb3dbY29sdW1uLmlkXSxcbiAgICAgICAgICAgICAgICBwaXZvdGVkOiBjb2x1bW4ucGl2b3RlZCxcbiAgICAgICAgICAgICAgICBleHBhbmRlcjogY29sdW1uLmV4cGFuZGVyLFxuICAgICAgICAgICAgICAgIHJlc2l6ZWQsXG4gICAgICAgICAgICAgICAgc2hvdyxcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICBtYXhXaWR0aCxcbiAgICAgICAgICAgICAgICB0ZFByb3BzLFxuICAgICAgICAgICAgICAgIGNvbHVtblByb3BzLFxuICAgICAgICAgICAgICAgIGNsYXNzZXMsXG4gICAgICAgICAgICAgICAgc3R5bGVzLFxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjZWxsSW5mby52YWx1ZVxuXG4gICAgICAgICAgICAgIGxldCB1c2VPbkV4cGFuZGVyQ2xpY2tcbiAgICAgICAgICAgICAgbGV0IGlzQnJhbmNoXG4gICAgICAgICAgICAgIGxldCBpc1ByZXZpZXdcblxuICAgICAgICAgICAgICBjb25zdCBvbkV4cGFuZGVyQ2xpY2sgPSBlID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3RXhwYW5kZWQgPSBfLmNsb25lKGV4cGFuZGVkKVxuICAgICAgICAgICAgICAgIGlmIChpc0V4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgICBuZXdFeHBhbmRlZCA9IF8uc2V0KG5ld0V4cGFuZGVkLCBjZWxsSW5mby5uZXN0aW5nUGF0aCwgZmFsc2UpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG5ld0V4cGFuZGVkID0gXy5zZXQobmV3RXhwYW5kZWQsIGNlbGxJbmZvLm5lc3RpbmdQYXRoLCB7fSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBleHBhbmRlZDogbmV3RXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgKCkgPT4gb25FeHBhbmRlZENoYW5nZSAmJiBvbkV4cGFuZGVkQ2hhbmdlKG5ld0V4cGFuZGVkLCBjZWxsSW5mby5uZXN0aW5nUGF0aCwgZSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBEZWZhdWx0IHRvIGEgc3RhbmRhcmQgY2VsbFxuICAgICAgICAgICAgICBsZXQgcmVzb2x2ZWRDZWxsID0gXy5ub3JtYWxpemVDb21wb25lbnQoY29sdW1uLkNlbGwsIGNlbGxJbmZvLCB2YWx1ZSlcblxuICAgICAgICAgICAgICAvLyBSZXNvbHZlIFJlbmRlcmVyc1xuICAgICAgICAgICAgICBjb25zdCBSZXNvbHZlZEFnZ3JlZ2F0ZWRDb21wb25lbnQgPVxuICAgICAgICAgICAgICAgIGNvbHVtbi5BZ2dyZWdhdGVkIHx8ICghY29sdW1uLmFnZ3JlZ2F0ZSA/IEFnZ3JlZ2F0ZWRDb21wb25lbnQgOiBjb2x1bW4uQ2VsbClcbiAgICAgICAgICAgICAgY29uc3QgUmVzb2x2ZWRFeHBhbmRlckNvbXBvbmVudCA9IGNvbHVtbi5FeHBhbmRlciB8fCBFeHBhbmRlckNvbXBvbmVudFxuICAgICAgICAgICAgICBjb25zdCBSZXNvbHZlZFBpdm90VmFsdWVDb21wb25lbnQgPSBjb2x1bW4uUGl2b3RWYWx1ZSB8fCBQaXZvdFZhbHVlQ29tcG9uZW50XG4gICAgICAgICAgICAgIGNvbnN0IERlZmF1bHRSZXNvbHZlZFBpdm90Q29tcG9uZW50ID1cbiAgICAgICAgICAgICAgICBQaXZvdENvbXBvbmVudCB8fFxuICAgICAgICAgICAgICAgIChwcm9wcyA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8UmVzb2x2ZWRFeHBhbmRlckNvbXBvbmVudCB7Li4ucHJvcHN9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxSZXNvbHZlZFBpdm90VmFsdWVDb21wb25lbnQgey4uLnByb3BzfSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgY29uc3QgUmVzb2x2ZWRQaXZvdENvbXBvbmVudCA9IGNvbHVtbi5QaXZvdCB8fCBEZWZhdWx0UmVzb2x2ZWRQaXZvdENvbXBvbmVudFxuXG4gICAgICAgICAgICAgIC8vIElzIHRoaXMgY2VsbCBleHBhbmRhYmxlP1xuICAgICAgICAgICAgICBpZiAoY2VsbEluZm8ucGl2b3RlZCB8fCBjZWxsSW5mby5leHBhbmRlcikge1xuICAgICAgICAgICAgICAgIC8vIE1ha2UgaXQgZXhwYW5kYWJsZSBieSBkZWZ1YWx0XG4gICAgICAgICAgICAgICAgY2VsbEluZm8uZXhwYW5kYWJsZSA9IHRydWVcbiAgICAgICAgICAgICAgICB1c2VPbkV4cGFuZGVyQ2xpY2sgPSB0cnVlXG4gICAgICAgICAgICAgICAgLy8gSWYgcGl2b3RlZCwgaGFzIG5vIHN1YlJvd3MsIGFuZCBkb2VzIG5vdCBoYXZlIGEgc3ViQ29tcG9uZW50LFxuICAgICAgICAgICAgICAgIC8vIGRvIG5vdCBtYWtlIGV4cGFuZGFibGVcbiAgICAgICAgICAgICAgICBpZiAoY2VsbEluZm8ucGl2b3RlZCAmJiAhY2VsbEluZm8uc3ViUm93cyAmJiAhU3ViQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICBjZWxsSW5mby5leHBhbmRhYmxlID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoY2VsbEluZm8ucGl2b3RlZCkge1xuICAgICAgICAgICAgICAgIC8vIElzIHRoaXMgY29sdW1uIGEgYnJhbmNoP1xuICAgICAgICAgICAgICAgIGlzQnJhbmNoID0gcm93SW5mby5yb3dbcGl2b3RJREtleV0gPT09IGNvbHVtbi5pZCAmJiBjZWxsSW5mby5zdWJSb3dzXG4gICAgICAgICAgICAgICAgLy8gU2hvdWxkIHRoaXMgY29sdW1uIGJlIGJsYW5rP1xuICAgICAgICAgICAgICAgIGlzUHJldmlldyA9XG4gICAgICAgICAgICAgICAgICBwaXZvdEJ5LmluZGV4T2YoY29sdW1uLmlkKSA+IHBpdm90QnkuaW5kZXhPZihyb3dJbmZvLnJvd1twaXZvdElES2V5XSkgJiZcbiAgICAgICAgICAgICAgICAgIGNlbGxJbmZvLnN1YlJvd3NcbiAgICAgICAgICAgICAgICAvLyBQaXZvdCBDZWxsIFJlbmRlciBPdmVycmlkZVxuICAgICAgICAgICAgICAgIGlmIChpc0JyYW5jaCkge1xuICAgICAgICAgICAgICAgICAgLy8gaXNQaXZvdFxuICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRDZWxsID0gXy5ub3JtYWxpemVDb21wb25lbnQoXG4gICAgICAgICAgICAgICAgICAgIFJlc29sdmVkUGl2b3RDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAuLi5jZWxsSW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcm93W3Bpdm90VmFsS2V5XSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcm93W3Bpdm90VmFsS2V5XVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNQcmV2aWV3KSB7XG4gICAgICAgICAgICAgICAgICAvLyBTaG93IHRoZSBwaXZvdCBwcmV2aWV3XG4gICAgICAgICAgICAgICAgICByZXNvbHZlZENlbGwgPSBfLm5vcm1hbGl6ZUNvbXBvbmVudChSZXNvbHZlZEFnZ3JlZ2F0ZWRDb21wb25lbnQsIGNlbGxJbmZvLCB2YWx1ZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRDZWxsID0gbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChjZWxsSW5mby5hZ2dyZWdhdGVkKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRDZWxsID0gXy5ub3JtYWxpemVDb21wb25lbnQoUmVzb2x2ZWRBZ2dyZWdhdGVkQ29tcG9uZW50LCBjZWxsSW5mbywgdmFsdWUpXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoY2VsbEluZm8uZXhwYW5kZXIpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlZENlbGwgPSBfLm5vcm1hbGl6ZUNvbXBvbmVudChcbiAgICAgICAgICAgICAgICAgIFJlc29sdmVkRXhwYW5kZXJDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgICBjZWxsSW5mbyxcbiAgICAgICAgICAgICAgICAgIHJvd1twaXZvdFZhbEtleV1cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgaWYgKHBpdm90QnkpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChjZWxsSW5mby5ncm91cGVkQnlQaXZvdCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlZENlbGwgPSBudWxsXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoIWNlbGxJbmZvLnN1YlJvd3MgJiYgIVN1YkNvbXBvbmVudCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlZENlbGwgPSBudWxsXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWRPbkV4cGFuZGVyQ2xpY2sgPSB1c2VPbkV4cGFuZGVyQ2xpY2sgPyBvbkV4cGFuZGVyQ2xpY2sgOiAoKSA9PiB7fVxuXG4gICAgICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBtdWx0aXBsZSBvbkNsaWNrIGV2ZW50cywgbWFrZSBzdXJlIHRoZXkgZG9uJ3RcbiAgICAgICAgICAgICAgLy8gb3ZlcnJpZGUgZWFjaG90aGVyLiBUaGlzIHNob3VsZCBtYXliZSBiZSBleHBhbmRlZCB0byBoYW5kbGUgYWxsXG4gICAgICAgICAgICAgIC8vIGZ1bmN0aW9uIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgY29uc3QgaW50ZXJhY3Rpb25Qcm9wcyA9IHtcbiAgICAgICAgICAgICAgICBvbkNsaWNrOiByZXNvbHZlZE9uRXhwYW5kZXJDbGljayxcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh0ZFByb3BzLnJlc3Qub25DbGljaykge1xuICAgICAgICAgICAgICAgIGludGVyYWN0aW9uUHJvcHMub25DbGljayA9IGUgPT4ge1xuICAgICAgICAgICAgICAgICAgdGRQcm9wcy5yZXN0Lm9uQ2xpY2soZSwgKCkgPT4gcmVzb2x2ZWRPbkV4cGFuZGVyQ2xpY2soZSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGNvbHVtblByb3BzLnJlc3Qub25DbGljaykge1xuICAgICAgICAgICAgICAgIGludGVyYWN0aW9uUHJvcHMub25DbGljayA9IGUgPT4ge1xuICAgICAgICAgICAgICAgICAgY29sdW1uUHJvcHMucmVzdC5vbkNsaWNrKGUsICgpID0+IHJlc29sdmVkT25FeHBhbmRlckNsaWNrKGUpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgY2VsbFxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxUZENvbXBvbmVudFxuICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLWFycmF5LWluZGV4LWtleVxuICAgICAgICAgICAgICAgICAga2V5PXtgJHtpMn0tJHtjb2x1bW4uaWR9YH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgICAgICAgICAgIWNlbGxJbmZvLmV4cGFuZGFibGUgJiYgIXNob3cgJiYgJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgIGNlbGxJbmZvLmV4cGFuZGFibGUgJiYgJ3J0LWV4cGFuZGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAoaXNCcmFuY2ggfHwgaXNQcmV2aWV3KSAmJiAncnQtcGl2b3QnXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgICAgICAgICBmbGV4OiBgJHt3aWR0aH0gMCBhdXRvYCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IF8uYXNQeCh3aWR0aCksXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiBfLmFzUHgobWF4V2lkdGgpLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHsuLi50ZFByb3BzLnJlc3R9XG4gICAgICAgICAgICAgICAgICB7Li4uY29sdW1uUHJvcHMucmVzdH1cbiAgICAgICAgICAgICAgICAgIHsuLi5pbnRlcmFjdGlvblByb3BzfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtyZXNvbHZlZENlbGx9XG4gICAgICAgICAgICAgICAgPC9UZENvbXBvbmVudD5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cbiAgICAgICAgICB7cm93SW5mby5zdWJSb3dzICYmXG4gICAgICAgICAgICBpc0V4cGFuZGVkICYmXG4gICAgICAgICAgICByb3dJbmZvLnN1YlJvd3MubWFwKChkLCBpKSA9PiBtYWtlUGFnZVJvdyhkLCBpLCByb3dJbmZvLm5lc3RpbmdQYXRoKSl9XG4gICAgICAgICAge1N1YkNvbXBvbmVudCAmJlxuICAgICAgICAgICAgIXJvd0luZm8uc3ViUm93cyAmJlxuICAgICAgICAgICAgaXNFeHBhbmRlZCAmJlxuICAgICAgICAgICAgU3ViQ29tcG9uZW50KHJvd0luZm8sICgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbmV3RXhwYW5kZWQgPSBfLmNsb25lKGV4cGFuZGVkKVxuXG4gICAgICAgICAgICAgIF8uc2V0KG5ld0V4cGFuZGVkLCByb3dJbmZvLm5lc3RpbmdQYXRoLCBmYWxzZSlcbiAgICAgICAgICAgIH0pfVxuICAgICAgICA8L1RyR3JvdXBDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZVBhZENvbHVtbiA9IChjb2x1bW4sIGkpID0+IHtcbiAgICAgIGNvbnN0IHJlc2l6ZWRDb2wgPSByZXNpemVkLmZpbmQoeCA9PiB4LmlkID09PSBjb2x1bW4uaWQpIHx8IHt9XG4gICAgICBjb25zdCBzaG93ID0gdHlwZW9mIGNvbHVtbi5zaG93ID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnNob3coKSA6IGNvbHVtbi5zaG93XG4gICAgICBjb25zdCB3aWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2wudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1pbldpZHRoKVxuICAgICAgY29uc3QgZmxleCA9IHdpZHRoXG4gICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2wudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxuICAgICAgY29uc3QgdGRQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUZFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcbiAgICAgIGNvbnN0IGNvbHVtblByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXG5cbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbdGRQcm9wcy5jbGFzc05hbWUsIGNvbHVtbi5jbGFzc05hbWUsIGNvbHVtblByb3BzLmNsYXNzTmFtZV1cblxuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAuLi50ZFByb3BzLnN0eWxlLFxuICAgICAgICAuLi5jb2x1bW4uc3R5bGUsXG4gICAgICAgIC4uLmNvbHVtblByb3BzLnN0eWxlLFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGRDb21wb25lbnRcbiAgICAgICAgICBrZXk9e2Ake2l9LSR7Y29sdW1uLmlkfWB9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNsYXNzZXMsICFzaG93ICYmICdoaWRkZW4nKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgZmxleDogYCR7ZmxleH0gMCBhdXRvYCxcbiAgICAgICAgICAgIHdpZHRoOiBfLmFzUHgod2lkdGgpLFxuICAgICAgICAgICAgbWF4V2lkdGg6IF8uYXNQeChtYXhXaWR0aCksXG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4udGRQcm9wcy5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KFBhZFJvd0NvbXBvbmVudCl9XG4gICAgICAgIDwvVGRDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZVBhZFJvdyA9IChyb3csIGkpID0+IHtcbiAgICAgIGNvbnN0IHRyR3JvdXBQcm9wcyA9IGdldFRyR3JvdXBQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcylcbiAgICAgIGNvbnN0IHRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VHJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VHJHcm91cENvbXBvbmVudCBrZXk9e2BwYWQtJHtpfWB9IHsuLi50ckdyb3VwUHJvcHN9PlxuICAgICAgICAgIDxUckNvbXBvbmVudFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICAnLXBhZFJvdycsXG4gICAgICAgICAgICAgIChwYWdlUm93cy5sZW5ndGggKyBpKSAlIDIgPyAnLWV2ZW4nIDogJy1vZGQnLFxuICAgICAgICAgICAgICB0clByb3BzLmNsYXNzTmFtZVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXt0clByb3BzLnN0eWxlIHx8IHt9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHthbGxWaXNpYmxlQ29sdW1ucy5tYXAobWFrZVBhZENvbHVtbil9XG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cbiAgICAgICAgPC9Uckdyb3VwQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VDb2x1bW5Gb290ZXIgPSAoY29sdW1uLCBpKSA9PiB7XG4gICAgICBjb25zdCByZXNpemVkQ29sID0gcmVzaXplZC5maW5kKHggPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxuICAgICAgY29uc3Qgc2hvdyA9IHR5cGVvZiBjb2x1bW4uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5zaG93KCkgOiBjb2x1bW4uc2hvd1xuICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChyZXNpemVkQ29sLnZhbHVlLCBjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXG4gICAgICBjb25zdCB0Rm9vdFRkUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGZvb3RUZFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgIGNvbnN0IGNvbHVtblByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXG4gICAgICBjb25zdCBjb2x1bW5Gb290ZXJQcm9wcyA9IF8uc3BsaXRQcm9wcyhcbiAgICAgICAgY29sdW1uLmdldEZvb3RlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKVxuICAgICAgKVxuXG4gICAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgICB0Rm9vdFRkUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICBjb2x1bW4uY2xhc3NOYW1lLFxuICAgICAgICBjb2x1bW5Qcm9wcy5jbGFzc05hbWUsXG4gICAgICAgIGNvbHVtbkZvb3RlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgIF1cblxuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAuLi50Rm9vdFRkUHJvcHMuc3R5bGUsXG4gICAgICAgIC4uLmNvbHVtbi5zdHlsZSxcbiAgICAgICAgLi4uY29sdW1uUHJvcHMuc3R5bGUsXG4gICAgICAgIC4uLmNvbHVtbkZvb3RlclByb3BzLnN0eWxlLFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGRDb21wb25lbnRcbiAgICAgICAgICBrZXk9e2Ake2l9LSR7Y29sdW1uLmlkfWB9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNsYXNzZXMsICFzaG93ICYmICdoaWRkZW4nKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXG4gICAgICAgICAgICB3aWR0aDogXy5hc1B4KHdpZHRoKSxcbiAgICAgICAgICAgIG1heFdpZHRoOiBfLmFzUHgobWF4V2lkdGgpLFxuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLmNvbHVtblByb3BzLnJlc3R9XG4gICAgICAgICAgey4uLnRGb290VGRQcm9wcy5yZXN0fVxuICAgICAgICAgIHsuLi5jb2x1bW5Gb290ZXJQcm9wcy5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KGNvbHVtbi5Gb290ZXIsIHtcbiAgICAgICAgICAgIGRhdGE6IHNvcnRlZERhdGEsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvVGRDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZUNvbHVtbkZvb3RlcnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCB0Rm9vdFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRmb290UHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgICAgY29uc3QgdEZvb3RUclByb3BzID0gXy5zcGxpdFByb3BzKGdldFRmb290VHJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGZvb3RDb21wb25lbnRcbiAgICAgICAgICBjbGFzc05hbWU9e3RGb290UHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi50Rm9vdFByb3BzLnN0eWxlLFxuICAgICAgICAgICAgbWluV2lkdGg6IGAke3Jvd01pbldpZHRofXB4YCxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi50Rm9vdFByb3BzLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0Rm9vdFRyUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICAgIHN0eWxlPXt0Rm9vdFRyUHJvcHMuc3R5bGV9XG4gICAgICAgICAgICB7Li4udEZvb3RUclByb3BzLnJlc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2FsbFZpc2libGVDb2x1bW5zLm1hcChtYWtlQ29sdW1uRm9vdGVyKX1cbiAgICAgICAgICA8L1RyQ29tcG9uZW50PlxuICAgICAgICA8L1Rmb290Q29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VQYWdpbmF0aW9uID0gaXNUb3AgPT4ge1xuICAgICAgY29uc3QgcGFnaW5hdGlvblByb3BzID0gXy5zcGxpdFByb3BzKFxuICAgICAgICBnZXRQYWdpbmF0aW9uUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXG4gICAgICApXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8UGFnaW5hdGlvbkNvbXBvbmVudFxuICAgICAgICAgIHsuLi5yZXNvbHZlZFN0YXRlfVxuICAgICAgICAgIHBhZ2VzPXtwYWdlc31cbiAgICAgICAgICBjYW5QcmV2aW91cz17Y2FuUHJldmlvdXN9XG4gICAgICAgICAgY2FuTmV4dD17Y2FuTmV4dH1cbiAgICAgICAgICBvblBhZ2VDaGFuZ2U9e3RoaXMub25QYWdlQ2hhbmdlfVxuICAgICAgICAgIG9uUGFnZVNpemVDaGFuZ2U9e3RoaXMub25QYWdlU2l6ZUNoYW5nZX1cbiAgICAgICAgICBjbGFzc05hbWU9e3BhZ2luYXRpb25Qcm9wcy5jbGFzc05hbWV9XG4gICAgICAgICAgc3R5bGU9e3BhZ2luYXRpb25Qcm9wcy5zdHlsZX1cbiAgICAgICAgICBpc1RvcD17aXNUb3B9XG4gICAgICAgICAgey4uLnBhZ2luYXRpb25Qcm9wcy5yZXN0fVxuICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VUYWJsZSA9ICgpID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdSZWFjdFRhYmxlJywgY2xhc3NOYW1lLCByb290UHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAuLi5zdHlsZSxcbiAgICAgICAgICAuLi5yb290UHJvcHMuc3R5bGUsXG4gICAgICAgIH19XG4gICAgICAgIHsuLi5yb290UHJvcHMucmVzdH1cbiAgICAgID5cbiAgICAgICAge3Nob3dQYWdpbmF0aW9uICYmIHNob3dQYWdpbmF0aW9uVG9wID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGFnaW5hdGlvbi10b3BcIj57bWFrZVBhZ2luYXRpb24odHJ1ZSl9PC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8VGFibGVDb21wb25lbnRcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXModGFibGVQcm9wcy5jbGFzc05hbWUsIGN1cnJlbnRseVJlc2l6aW5nID8gJ3J0LXJlc2l6aW5nJyA6ICcnKX1cbiAgICAgICAgICBzdHlsZT17dGFibGVQcm9wcy5zdHlsZX1cbiAgICAgICAgICB7Li4udGFibGVQcm9wcy5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge2hhc0hlYWRlckdyb3VwcyA/IG1ha2VIZWFkZXJHcm91cHMoKSA6IG51bGx9XG4gICAgICAgICAge21ha2VIZWFkZXJzKCl9XG4gICAgICAgICAge2hhc0ZpbHRlcnMgPyBtYWtlRmlsdGVycygpIDogbnVsbH1cbiAgICAgICAgICA8VGJvZHlDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0Qm9keVByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAuLi50Qm9keVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICBtaW5XaWR0aDogYCR7cm93TWluV2lkdGh9cHhgLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHsuLi50Qm9keVByb3BzLnJlc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3BhZ2VSb3dzLm1hcCgoZCwgaSkgPT4gbWFrZVBhZ2VSb3coZCwgaSkpfVxuICAgICAgICAgICAge3BhZFJvd3MubWFwKG1ha2VQYWRSb3cpfVxuICAgICAgICAgIDwvVGJvZHlDb21wb25lbnQ+XG4gICAgICAgICAge2hhc0NvbHVtbkZvb3RlciA/IG1ha2VDb2x1bW5Gb290ZXJzKCkgOiBudWxsfVxuICAgICAgICA8L1RhYmxlQ29tcG9uZW50PlxuICAgICAgICB7c2hvd1BhZ2luYXRpb24gJiYgc2hvd1BhZ2luYXRpb25Cb3R0b20gPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYWdpbmF0aW9uLWJvdHRvbVwiPnttYWtlUGFnaW5hdGlvbihmYWxzZSl9PC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7IXBhZ2VSb3dzLmxlbmd0aCAmJiAoXG4gICAgICAgICAgPE5vRGF0YUNvbXBvbmVudCB7Li4ubm9EYXRhUHJvcHN9PntfLm5vcm1hbGl6ZUNvbXBvbmVudChub0RhdGFUZXh0KX08L05vRGF0YUNvbXBvbmVudD5cbiAgICAgICAgKX1cbiAgICAgICAgPExvYWRpbmdDb21wb25lbnQgbG9hZGluZz17bG9hZGluZ30gbG9hZGluZ1RleHQ9e2xvYWRpbmdUZXh0fSB7Li4ubG9hZGluZ1Byb3BzfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuXG4gICAgLy8gY2hpbGRQcm9wcyBhcmUgb3B0aW9uYWxseSBwYXNzZWQgdG8gYSBmdW5jdGlvbi1hcy1hLWNoaWxkXG4gICAgcmV0dXJuIGNoaWxkcmVuID8gY2hpbGRyZW4oZmluYWxTdGF0ZSwgbWFrZVRhYmxlLCB0aGlzKSA6IG1ha2VUYWJsZSgpXG4gIH1cbn1cbiJdfQ==

/***/ }),

/***/ "./node_modules/react-table/es/lifecycle.js":
/*!**************************************************!*\
  !*** ./node_modules/react-table/es/lifecycle.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* harmony default export */ __webpack_exports__["default"] = (function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.setStateWithData(this.getDataModel(this.getResolvedState(), true));
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.fireFetchData();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps, nextState) {
        var oldState = this.getResolvedState();
        var newState = this.getResolvedState(nextProps, nextState);

        // Do a deep compare of new and old `defaultOption` and
        // if they are different reset `option = defaultOption`
        var defaultableOptions = ['sorted', 'filtered', 'resized', 'expanded'];
        defaultableOptions.forEach(function (x) {
          var defaultName = 'default' + (x.charAt(0).toUpperCase() + x.slice(1));
          if (JSON.stringify(oldState[defaultName]) !== JSON.stringify(newState[defaultName])) {
            newState[x] = newState[defaultName];
          }
        });

        // If they change these table options, we need to reset defaults
        // or else we could get into a state where the user has changed the UI
        // and then disabled the ability to change it back.
        // e.g. If `filterable` has changed, set `filtered = defaultFiltered`
        var resettableOptions = ['sortable', 'filterable', 'resizable'];
        resettableOptions.forEach(function (x) {
          if (oldState[x] !== newState[x]) {
            var baseName = x.replace('able', '');
            var optionName = baseName + 'ed';
            var defaultName = 'default' + (optionName.charAt(0).toUpperCase() + optionName.slice(1));
            newState[optionName] = newState[defaultName];
          }
        });

        // Props that trigger a data update
        if (oldState.data !== newState.data || oldState.columns !== newState.columns || oldState.pivotBy !== newState.pivotBy || oldState.sorted !== newState.sorted || oldState.filtered !== newState.filtered) {
          this.setStateWithData(this.getDataModel(newState, oldState.data !== newState.data));
        }
      }
    }, {
      key: 'setStateWithData',
      value: function setStateWithData(newState, cb) {
        var _this2 = this;

        var oldState = this.getResolvedState();
        var newResolvedState = this.getResolvedState({}, newState);
        var freezeWhenExpanded = newResolvedState.freezeWhenExpanded;

        // Default to unfrozen state

        newResolvedState.frozen = false;

        // If freezeWhenExpanded is set, check for frozen conditions
        if (freezeWhenExpanded) {
          // if any rows are expanded, freeze the existing data and sorting
          var keys = Object.keys(newResolvedState.expanded);
          for (var i = 0; i < keys.length; i += 1) {
            if (newResolvedState.expanded[keys[i]]) {
              newResolvedState.frozen = true;
              break;
            }
          }
        }

        // If the data isn't frozen and either the data or
        // sorting model has changed, update the data
        if (oldState.frozen && !newResolvedState.frozen || oldState.sorted !== newResolvedState.sorted || oldState.filtered !== newResolvedState.filtered || oldState.showFilters !== newResolvedState.showFilters || !newResolvedState.frozen && oldState.resolvedData !== newResolvedState.resolvedData) {
          // Handle collapseOnsortedChange & collapseOnDataChange
          if (oldState.sorted !== newResolvedState.sorted && this.props.collapseOnSortingChange || oldState.filtered !== newResolvedState.filtered || oldState.showFilters !== newResolvedState.showFilters || oldState.sortedData && !newResolvedState.frozen && oldState.resolvedData !== newResolvedState.resolvedData && this.props.collapseOnDataChange) {
            newResolvedState.expanded = {};
          }

          Object.assign(newResolvedState, this.getSortedData(newResolvedState));
        }

        // Set page to 0 if filters change
        if (oldState.filtered !== newResolvedState.filtered) {
          newResolvedState.page = 0;
        }

        // Calculate pageSize all the time
        if (newResolvedState.sortedData) {
          newResolvedState.pages = newResolvedState.manual ? newResolvedState.pages : Math.ceil(newResolvedState.sortedData.length / newResolvedState.pageSize);
          newResolvedState.page = newResolvedState.manual ? newResolvedState.page : Math.max(newResolvedState.page >= newResolvedState.pages ? newResolvedState.pages - 1 : newResolvedState.page, 0);
        }

        return this.setState(newResolvedState, function () {
          if (cb) {
            cb();
          }
          if (oldState.page !== newResolvedState.page || oldState.pageSize !== newResolvedState.pageSize || oldState.sorted !== newResolvedState.sorted || oldState.filtered !== newResolvedState.filtered) {
            _this2.fireFetchData();
          }
        });
      }
    }]);

    return _class;
  }(Base);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWZlY3ljbGUuanMiXSwibmFtZXMiOlsic2V0U3RhdGVXaXRoRGF0YSIsImdldERhdGFNb2RlbCIsImdldFJlc29sdmVkU3RhdGUiLCJmaXJlRmV0Y2hEYXRhIiwibmV4dFByb3BzIiwibmV4dFN0YXRlIiwib2xkU3RhdGUiLCJuZXdTdGF0ZSIsImRlZmF1bHRhYmxlT3B0aW9ucyIsImZvckVhY2giLCJkZWZhdWx0TmFtZSIsIngiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc2V0dGFibGVPcHRpb25zIiwiYmFzZU5hbWUiLCJyZXBsYWNlIiwib3B0aW9uTmFtZSIsImRhdGEiLCJjb2x1bW5zIiwicGl2b3RCeSIsInNvcnRlZCIsImZpbHRlcmVkIiwiY2IiLCJuZXdSZXNvbHZlZFN0YXRlIiwiZnJlZXplV2hlbkV4cGFuZGVkIiwiZnJvemVuIiwia2V5cyIsIk9iamVjdCIsImV4cGFuZGVkIiwiaSIsImxlbmd0aCIsInNob3dGaWx0ZXJzIiwicmVzb2x2ZWREYXRhIiwicHJvcHMiLCJjb2xsYXBzZU9uU29ydGluZ0NoYW5nZSIsInNvcnRlZERhdGEiLCJjb2xsYXBzZU9uRGF0YUNoYW5nZSIsImFzc2lnbiIsImdldFNvcnRlZERhdGEiLCJwYWdlIiwicGFnZXMiLCJtYW51YWwiLCJNYXRoIiwiY2VpbCIsInBhZ2VTaXplIiwibWF4Iiwic2V0U3RhdGUiLCJCYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLGdCQUFlO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLDJDQUVXO0FBQ3BCLGFBQUtBLGdCQUFMLENBQXNCLEtBQUtDLFlBQUwsQ0FBa0IsS0FBS0MsZ0JBQUwsRUFBbEIsRUFBMkMsSUFBM0MsQ0FBdEI7QUFDRDtBQUpVO0FBQUE7QUFBQSwwQ0FNVTtBQUNuQixhQUFLQyxhQUFMO0FBQ0Q7QUFSVTtBQUFBO0FBQUEsZ0RBVWdCQyxTQVZo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QUFLRyxHQUFMLENBQ3hFdEIsaUJBQWlCZ0IsSUFBakIsSUFBeUJoQixpQkFBaUJpQixLQUExQyxHQUNJakIsaUJBQWlCaUIsS0FBakIsR0FBeUIsQ0FEN0IsR0FFSWpCLGlCQUFpQmdCLElBSG1ELEVBSXhFLENBSndFLENBQTFFO0FBTUQ7O0FBRUQsZUFBTyxLQUFLTyxRQUFMLENBQWN2QixnQkFBZCxFQUFnQyxZQUFNO0FBQzNDLGNBQUlELEVBQUosRUFBUTtBQUNOQTtBQUNEO0FBQ0QsY0FDRXBCLFNBQVNxQyxJQUFULEtBQWtCaEIsaUJBQWlCZ0IsSUFBbkMsSUFDQXJDLFNBQVMwQyxRQUFULEtBQXNCckIsaUJBQWlCcUIsUUFEdkMsSUFFQTFDLFNBQVNrQixNQUFULEtBQW9CRyxpQkFBaUJILE1BRnJDLElBR0FsQixTQUFTbUIsUUFBVCxLQUFzQkUsaUJBQWlCRixRQUp6QyxFQUtFO0FBQ0EsbUJBQUt0QixhQUFMO0FBQ0Q7QUFDRixTQVpNLENBQVA7QUFhRDtBQTlIVTs7QUFBQTtBQUFBLElBQ0NnRCxJQUREO0FBQUEsQ0FBZiIsImZpbGUiOiJsaWZlY3ljbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBCYXNlID0+XG4gIGNsYXNzIGV4dGVuZHMgQmFzZSB7XG4gICAgY29tcG9uZW50V2lsbE1vdW50ICgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh0aGlzLmdldERhdGFNb2RlbCh0aGlzLmdldFJlc29sdmVkU3RhdGUoKSwgdHJ1ZSkpXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQgKCkge1xuICAgICAgdGhpcy5maXJlRmV0Y2hEYXRhKClcbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuICAgICAgY29uc3Qgb2xkU3RhdGUgPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB0aGlzLmdldFJlc29sdmVkU3RhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpXG5cbiAgICAgIC8vIERvIGEgZGVlcCBjb21wYXJlIG9mIG5ldyBhbmQgb2xkIGBkZWZhdWx0T3B0aW9uYCBhbmRcbiAgICAgIC8vIGlmIHRoZXkgYXJlIGRpZmZlcmVudCByZXNldCBgb3B0aW9uID0gZGVmYXVsdE9wdGlvbmBcbiAgICAgIGNvbnN0IGRlZmF1bHRhYmxlT3B0aW9ucyA9IFsnc29ydGVkJywgJ2ZpbHRlcmVkJywgJ3Jlc2l6ZWQnLCAnZXhwYW5kZWQnXVxuICAgICAgZGVmYXVsdGFibGVPcHRpb25zLmZvckVhY2goeCA9PiB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHROYW1lID0gYGRlZmF1bHQke3guY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB4LnNsaWNlKDEpfWBcbiAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KG9sZFN0YXRlW2RlZmF1bHROYW1lXSkgIT09IEpTT04uc3RyaW5naWZ5KG5ld1N0YXRlW2RlZmF1bHROYW1lXSkpIHtcbiAgICAgICAgICBuZXdTdGF0ZVt4XSA9IG5ld1N0YXRlW2RlZmF1bHROYW1lXVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICAvLyBJZiB0aGV5IGNoYW5nZSB0aGVzZSB0YWJsZSBvcHRpb25zLCB3ZSBuZWVkIHRvIHJlc2V0IGRlZmF1bHRzXG4gICAgICAvLyBvciBlbHNlIHdlIGNvdWxkIGdldCBpbnRvIGEgc3RhdGUgd2hlcmUgdGhlIHVzZXIgaGFzIGNoYW5nZWQgdGhlIFVJXG4gICAgICAvLyBhbmQgdGhlbiBkaXNhYmxlZCB0aGUgYWJpbGl0eSB0byBjaGFuZ2UgaXQgYmFjay5cbiAgICAgIC8vIGUuZy4gSWYgYGZpbHRlcmFibGVgIGhhcyBjaGFuZ2VkLCBzZXQgYGZpbHRlcmVkID0gZGVmYXVsdEZpbHRlcmVkYFxuICAgICAgY29uc3QgcmVzZXR0YWJsZU9wdGlvbnMgPSBbJ3NvcnRhYmxlJywgJ2ZpbHRlcmFibGUnLCAncmVzaXphYmxlJ11cbiAgICAgIHJlc2V0dGFibGVPcHRpb25zLmZvckVhY2goeCA9PiB7XG4gICAgICAgIGlmIChvbGRTdGF0ZVt4XSAhPT0gbmV3U3RhdGVbeF0pIHtcbiAgICAgICAgICBjb25zdCBiYXNlTmFtZSA9IHgucmVwbGFjZSgnYWJsZScsICcnKVxuICAgICAgICAgIGNvbnN0IG9wdGlvbk5hbWUgPSBgJHtiYXNlTmFtZX1lZGBcbiAgICAgICAgICBjb25zdCBkZWZhdWx0TmFtZSA9IGBkZWZhdWx0JHtvcHRpb25OYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgb3B0aW9uTmFtZS5zbGljZSgxKX1gXG4gICAgICAgICAgbmV3U3RhdGVbb3B0aW9uTmFtZV0gPSBuZXdTdGF0ZVtkZWZhdWx0TmFtZV1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gUHJvcHMgdGhhdCB0cmlnZ2VyIGEgZGF0YSB1cGRhdGVcbiAgICAgIGlmIChcbiAgICAgICAgb2xkU3RhdGUuZGF0YSAhPT0gbmV3U3RhdGUuZGF0YSB8fFxuICAgICAgICBvbGRTdGF0ZS5jb2x1bW5zICE9PSBuZXdTdGF0ZS5jb2x1bW5zIHx8XG4gICAgICAgIG9sZFN0YXRlLnBpdm90QnkgIT09IG5ld1N0YXRlLnBpdm90QnkgfHxcbiAgICAgICAgb2xkU3RhdGUuc29ydGVkICE9PSBuZXdTdGF0ZS5zb3J0ZWQgfHxcbiAgICAgICAgb2xkU3RhdGUuZmlsdGVyZWQgIT09IG5ld1N0YXRlLmZpbHRlcmVkXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHRoaXMuZ2V0RGF0YU1vZGVsKG5ld1N0YXRlLCBvbGRTdGF0ZS5kYXRhICE9PSBuZXdTdGF0ZS5kYXRhKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTdGF0ZVdpdGhEYXRhIChuZXdTdGF0ZSwgY2IpIHtcbiAgICAgIGNvbnN0IG9sZFN0YXRlID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcbiAgICAgIGNvbnN0IG5ld1Jlc29sdmVkU3RhdGUgPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoe30sIG5ld1N0YXRlKVxuICAgICAgY29uc3QgeyBmcmVlemVXaGVuRXhwYW5kZWQgfSA9IG5ld1Jlc29sdmVkU3RhdGVcblxuICAgICAgLy8gRGVmYXVsdCB0byB1bmZyb3plbiBzdGF0ZVxuICAgICAgbmV3UmVzb2x2ZWRTdGF0ZS5mcm96ZW4gPSBmYWxzZVxuXG4gICAgICAvLyBJZiBmcmVlemVXaGVuRXhwYW5kZWQgaXMgc2V0LCBjaGVjayBmb3IgZnJvemVuIGNvbmRpdGlvbnNcbiAgICAgIGlmIChmcmVlemVXaGVuRXhwYW5kZWQpIHtcbiAgICAgICAgLy8gaWYgYW55IHJvd3MgYXJlIGV4cGFuZGVkLCBmcmVlemUgdGhlIGV4aXN0aW5nIGRhdGEgYW5kIHNvcnRpbmdcbiAgICAgICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG5ld1Jlc29sdmVkU3RhdGUuZXhwYW5kZWQpXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChuZXdSZXNvbHZlZFN0YXRlLmV4cGFuZGVkW2tleXNbaV1dKSB7XG4gICAgICAgICAgICBuZXdSZXNvbHZlZFN0YXRlLmZyb3plbiA9IHRydWVcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoZSBkYXRhIGlzbid0IGZyb3plbiBhbmQgZWl0aGVyIHRoZSBkYXRhIG9yXG4gICAgICAvLyBzb3J0aW5nIG1vZGVsIGhhcyBjaGFuZ2VkLCB1cGRhdGUgdGhlIGRhdGFcbiAgICAgIGlmIChcbiAgICAgICAgKG9sZFN0YXRlLmZyb3plbiAmJiAhbmV3UmVzb2x2ZWRTdGF0ZS5mcm96ZW4pIHx8XG4gICAgICAgIG9sZFN0YXRlLnNvcnRlZCAhPT0gbmV3UmVzb2x2ZWRTdGF0ZS5zb3J0ZWQgfHxcbiAgICAgICAgb2xkU3RhdGUuZmlsdGVyZWQgIT09IG5ld1Jlc29sdmVkU3RhdGUuZmlsdGVyZWQgfHxcbiAgICAgICAgb2xkU3RhdGUuc2hvd0ZpbHRlcnMgIT09IG5ld1Jlc29sdmVkU3RhdGUuc2hvd0ZpbHRlcnMgfHxcbiAgICAgICAgKCFuZXdSZXNvbHZlZFN0YXRlLmZyb3plbiAmJiBvbGRTdGF0ZS5yZXNvbHZlZERhdGEgIT09IG5ld1Jlc29sdmVkU3RhdGUucmVzb2x2ZWREYXRhKVxuICAgICAgKSB7XG4gICAgICAgIC8vIEhhbmRsZSBjb2xsYXBzZU9uc29ydGVkQ2hhbmdlICYgY29sbGFwc2VPbkRhdGFDaGFuZ2VcbiAgICAgICAgaWYgKFxuICAgICAgICAgIChvbGRTdGF0ZS5zb3J0ZWQgIT09IG5ld1Jlc29sdmVkU3RhdGUuc29ydGVkICYmIHRoaXMucHJvcHMuY29sbGFwc2VPblNvcnRpbmdDaGFuZ2UpIHx8XG4gICAgICAgICAgb2xkU3RhdGUuZmlsdGVyZWQgIT09IG5ld1Jlc29sdmVkU3RhdGUuZmlsdGVyZWQgfHxcbiAgICAgICAgICBvbGRTdGF0ZS5zaG93RmlsdGVycyAhPT0gbmV3UmVzb2x2ZWRTdGF0ZS5zaG93RmlsdGVycyB8fFxuICAgICAgICAgIChvbGRTdGF0ZS5zb3J0ZWREYXRhICYmXG4gICAgICAgICAgICAhbmV3UmVzb2x2ZWRTdGF0ZS5mcm96ZW4gJiZcbiAgICAgICAgICAgIG9sZFN0YXRlLnJlc29sdmVkRGF0YSAhPT0gbmV3UmVzb2x2ZWRTdGF0ZS5yZXNvbHZlZERhdGEgJiZcbiAgICAgICAgICAgIHRoaXMucHJvcHMuY29sbGFwc2VPbkRhdGFDaGFuZ2UpXG4gICAgICAgICkge1xuICAgICAgICAgIG5ld1Jlc29sdmVkU3RhdGUuZXhwYW5kZWQgPSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbihuZXdSZXNvbHZlZFN0YXRlLCB0aGlzLmdldFNvcnRlZERhdGEobmV3UmVzb2x2ZWRTdGF0ZSkpXG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBwYWdlIHRvIDAgaWYgZmlsdGVycyBjaGFuZ2VcbiAgICAgIGlmIChvbGRTdGF0ZS5maWx0ZXJlZCAhPT0gbmV3UmVzb2x2ZWRTdGF0ZS5maWx0ZXJlZCkge1xuICAgICAgICBuZXdSZXNvbHZlZFN0YXRlLnBhZ2UgPSAwXG4gICAgICB9XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBwYWdlU2l6ZSBhbGwgdGhlIHRpbWVcbiAgICAgIGlmIChuZXdSZXNvbHZlZFN0YXRlLnNvcnRlZERhdGEpIHtcbiAgICAgICAgbmV3UmVzb2x2ZWRTdGF0ZS5wYWdlcyA9IG5ld1Jlc29sdmVkU3RhdGUubWFudWFsXG4gICAgICAgICAgPyBuZXdSZXNvbHZlZFN0YXRlLnBhZ2VzXG4gICAgICAgICAgOiBNYXRoLmNlaWwobmV3UmVzb2x2ZWRTdGF0ZS5zb3J0ZWREYXRhLmxlbmd0aCAvIG5ld1Jlc29sdmVkU3RhdGUucGFnZVNpemUpXG4gICAgICAgIG5ld1Jlc29sdmVkU3RhdGUucGFnZSA9IG5ld1Jlc29sdmVkU3RhdGUubWFudWFsID8gbmV3UmVzb2x2ZWRTdGF0ZS5wYWdlIDogTWF0aC5tYXgoXG4gICAgICAgICAgbmV3UmVzb2x2ZWRTdGF0ZS5wYWdlID49IG5ld1Jlc29sdmVkU3RhdGUucGFnZXNcbiAgICAgICAgICAgID8gbmV3UmVzb2x2ZWRTdGF0ZS5wYWdlcyAtIDFcbiAgICAgICAgICAgIDogbmV3UmVzb2x2ZWRTdGF0ZS5wYWdlLFxuICAgICAgICAgIDBcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5zZXRTdGF0ZShuZXdSZXNvbHZlZFN0YXRlLCAoKSA9PiB7XG4gICAgICAgIGlmIChjYikge1xuICAgICAgICAgIGNiKClcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgb2xkU3RhdGUucGFnZSAhPT0gbmV3UmVzb2x2ZWRTdGF0ZS5wYWdlIHx8XG4gICAgICAgICAgb2xkU3RhdGUucGFnZVNpemUgIT09IG5ld1Jlc29sdmVkU3RhdGUucGFnZVNpemUgfHxcbiAgICAgICAgICBvbGRTdGF0ZS5zb3J0ZWQgIT09IG5ld1Jlc29sdmVkU3RhdGUuc29ydGVkIHx8XG4gICAgICAgICAgb2xkU3RhdGUuZmlsdGVyZWQgIT09IG5ld1Jlc29sdmVkU3RhdGUuZmlsdGVyZWRcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5maXJlRmV0Y2hEYXRhKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==

/***/ }),

/***/ "./node_modules/react-table/es/methods.js":
/*!************************************************!*\
  !*** ./node_modules/react-table/es/methods.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./node_modules/react-table/es/utils.js");
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




/* harmony default export */ __webpack_exports__["default"] = (function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'getResolvedState',
      value: function getResolvedState(props, state) {
        var resolvedState = _extends({}, _utils__WEBPACK_IMPORTED_MODULE_1__["default"].compactObject(this.state), _utils__WEBPACK_IMPORTED_MODULE_1__["default"].compactObject(this.props), _utils__WEBPACK_IMPORTED_MODULE_1__["default"].compactObject(state), _utils__WEBPACK_IMPORTED_MODULE_1__["default"].compactObject(props));
        return resolvedState;
      }
    }, {
      key: 'getDataModel',
      value: function getDataModel(newState, dataChanged) {
        var _this2 = this;

        var columns = newState.columns,
            _newState$pivotBy = newState.pivotBy,
            pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy,
            data = newState.data,
            resolveData = newState.resolveData,
            pivotIDKey = newState.pivotIDKey,
            pivotValKey = newState.pivotValKey,
            subRowsKey = newState.subRowsKey,
            aggregatedKey = newState.aggregatedKey,
            nestingLevelKey = newState.nestingLevelKey,
            originalKey = newState.originalKey,
            indexKey = newState.indexKey,
            groupedByPivotKey = newState.groupedByPivotKey,
            SubComponent = newState.SubComponent;

        // Determine if there are Header Groups

        var hasHeaderGroups = false;
        columns.forEach(function (column) {
          if (column.columns) {
            hasHeaderGroups = true;
          }
        });

        var columnsWithExpander = [].concat(_toConsumableArray(columns));

        var expanderColumn = columns.find(function (col) {
          return col.expander || col.columns && col.columns.some(function (col2) {
            return col2.expander;
          });
        });

        if (expanderColumn && !expanderColumn.expander) {
          expanderColumn = expanderColumn.columns.find(function (col) {
            return col.expander;
          });
        }
        // If we have SubComponent's we need to make sure we have an expander column
        if (SubComponent && !expanderColumn) {
          expanderColumn = { expander: true };
          columnsWithExpander = [expanderColumn].concat(_toConsumableArray(columnsWithExpander));
        }

        var makeDecoratedColumn = function makeDecoratedColumn(column, parentColumn) {
          var dcol = void 0;
          if (column.expander) {
            dcol = _extends({}, _this2.props.column, _this2.props.expanderDefaults, column);
          } else {
            dcol = _extends({}, _this2.props.column, column);
          }

          // Ensure minWidth is not greater than maxWidth if set
          if (dcol.maxWidth < dcol.minWidth) {
            dcol.minWidth = dcol.maxWidth;
          }

          if (parentColumn) {
            dcol.parentColumn = parentColumn;
          }

          // First check for string accessor
          if (typeof dcol.accessor === 'string') {
            dcol.id = dcol.id || dcol.accessor;
            var accessorString = dcol.accessor;
            dcol.accessor = function (row) {
              return _utils__WEBPACK_IMPORTED_MODULE_1__["default"].get(row, accessorString);
            };
            return dcol;
          }

          // Fall back to functional accessor (but require an ID)
          if (dcol.accessor && !dcol.id) {
            console.warn(dcol);
            throw new Error('A column id is required if using a non-string accessor for column above.');
          }

          // Fall back to an undefined accessor
          if (!dcol.accessor) {
            dcol.accessor = function () {
              return undefined;
            };
          }

          return dcol;
        };

        var allDecoratedColumns = [];

        // Decorate the columns
        var decorateAndAddToAll = function decorateAndAddToAll(column, parentColumn) {
          var decoratedColumn = makeDecoratedColumn(column, parentColumn);
          allDecoratedColumns.push(decoratedColumn);
          return decoratedColumn;
        };

        var decoratedColumns = columnsWithExpander.map(function (column) {
          if (column.columns) {
            return _extends({}, column, {
              columns: column.columns.map(function (d) {
                return decorateAndAddToAll(d, column);
              })
            });
          }
          return decorateAndAddToAll(column);
        });

        // Build the visible columns, headers and flat column list
        var visibleColumns = decoratedColumns.slice();
        var allVisibleColumns = [];

        visibleColumns = visibleColumns.map(function (column) {
          if (column.columns) {
            var visibleSubColumns = column.columns.filter(function (d) {
              return pivotBy.indexOf(d.id) > -1 ? false : _utils__WEBPACK_IMPORTED_MODULE_1__["default"].getFirstDefined(d.show, true);
            });
            return _extends({}, column, {
              columns: visibleSubColumns
            });
          }
          return column;
        });

        visibleColumns = visibleColumns.filter(function (column) {
          return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _utils__WEBPACK_IMPORTED_MODULE_1__["default"].getFirstDefined(column.show, true);
        });

        // Find any custom pivot location
        var pivotIndex = visibleColumns.findIndex(function (col) {
          return col.pivot;
        });

        // Handle Pivot Columns
        if (pivotBy.length) {
          // Retrieve the pivot columns in the correct pivot order
          var pivotColumns = [];
          pivotBy.forEach(function (pivotID) {
            var found = allDecoratedColumns.find(function (d) {
              return d.id === pivotID;
            });
            if (found) {
              pivotColumns.push(found);
            }
          });

          var PivotParentColumn = pivotColumns.reduce(function (prev, current) {
            return prev && prev === current.parentColumn && current.parentColumn;
          }, pivotColumns[0].parentColumn);

          var PivotGroupHeader = hasHeaderGroups && PivotParentColumn.Header;
          PivotGroupHeader = PivotGroupHeader || function () {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'strong',
              null,
              'Pivoted'
            );
          };

          var pivotColumnGroup = {
            Header: PivotGroupHeader,
            columns: pivotColumns.map(function (col) {
              return _extends({}, _this2.props.pivotDefaults, col, {
                pivoted: true
              });
            })

            // Place the pivotColumns back into the visibleColumns
          };if (pivotIndex >= 0) {
            pivotColumnGroup = _extends({}, visibleColumns[pivotIndex], pivotColumnGroup);
            visibleColumns.splice(pivotIndex, 1, pivotColumnGroup);
          } else {
            visibleColumns.unshift(pivotColumnGroup);
          }
        }

        // Build Header Groups
        var headerGroups = [];
        var currentSpan = [];

        // A convenience function to add a header and reset the currentSpan
        var addHeader = function addHeader(columns, column) {
          headerGroups.push(_extends({}, _this2.props.column, column, {
            columns: columns
          }));
          currentSpan = [];
        };

        // Build flat list of allVisibleColumns and HeaderGroups
        visibleColumns.forEach(function (column) {
          if (column.columns) {
            allVisibleColumns = allVisibleColumns.concat(column.columns);
            if (currentSpan.length > 0) {
              addHeader(currentSpan);
            }
            addHeader(column.columns, column);
            return;
          }
          allVisibleColumns.push(column);
          currentSpan.push(column);
        });
        if (hasHeaderGroups && currentSpan.length > 0) {
          addHeader(currentSpan);
        }

        // Access the data
        var accessRow = function accessRow(d, i) {
          var _row;

          var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          var row = (_row = {}, _defineProperty(_row, originalKey, d), _defineProperty(_row, indexKey, i), _defineProperty(_row, subRowsKey, d[subRowsKey]), _defineProperty(_row, nestingLevelKey, level), _row);
          allDecoratedColumns.forEach(function (column) {
            if (column.expander) return;
            row[column.id] = column.accessor(d);
          });
          if (row[subRowsKey]) {
            row[subRowsKey] = row[subRowsKey].map(function (d, i) {
              return accessRow(d, i, level + 1);
            });
          }
          return row;
        };

        // // If the data hasn't changed, just use the cached data
        var resolvedData = this.resolvedData;
        // If the data has changed, run the data resolver and cache the result
        if (!this.resolvedData || dataChanged) {
          resolvedData = resolveData(data);
          this.resolvedData = resolvedData;
        }
        // Use the resolved data
        resolvedData = resolvedData.map(function (d, i) {
          return accessRow(d, i);
        });

        // TODO: Make it possible to fabricate nested rows without pivoting
        var aggregatingColumns = allVisibleColumns.filter(function (d) {
          return !d.expander && d.aggregate;
        });

        // If pivoting, recursively group the data
        var aggregate = function aggregate(rows) {
          var aggregationValues = {};
          aggregatingColumns.forEach(function (column) {
            var values = rows.map(function (d) {
              return d[column.id];
            });
            aggregationValues[column.id] = column.aggregate(values, rows);
          });
          return aggregationValues;
        };
        if (pivotBy.length) {
          var groupRecursively = function groupRecursively(rows, keys) {
            var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            // This is the last level, just return the rows
            if (i === keys.length) {
              return rows;
            }
            // Group the rows together for this level
            var groupedRows = Object.entries(_utils__WEBPACK_IMPORTED_MODULE_1__["default"].groupBy(rows, keys[i])).map(function (_ref) {
              var _ref3;

              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _defineProperty(_ref3, nestingLevelKey, i), _defineProperty(_ref3, groupedByPivotKey, true), _ref3;
            });
            // Recurse into the subRows
            groupedRows = groupedRows.map(function (rowGroup) {
              var _extends2;

              var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
              return _extends({}, rowGroup, (_extends2 = {}, _defineProperty(_extends2, subRowsKey, subRows), _defineProperty(_extends2, aggregatedKey, true), _extends2), aggregate(subRows));
            });
            return groupedRows;
          };
          resolvedData = groupRecursively(resolvedData, pivotBy);
        }

        return _extends({}, newState, {
          resolvedData: resolvedData,
          allVisibleColumns: allVisibleColumns,
          headerGroups: headerGroups,
          allDecoratedColumns: allDecoratedColumns,
          hasHeaderGroups: hasHeaderGroups
        });
      }
    }, {
      key: 'getSortedData',
      value: function getSortedData(resolvedState) {
        var manual = resolvedState.manual,
            sorted = resolvedState.sorted,
            filtered = resolvedState.filtered,
            defaultFilterMethod = resolvedState.defaultFilterMethod,
            resolvedData = resolvedState.resolvedData,
            allVisibleColumns = resolvedState.allVisibleColumns,
            allDecoratedColumns = resolvedState.allDecoratedColumns;


        var sortMethodsByColumnID = {};

        allDecoratedColumns.filter(function (col) {
          return col.sortMethod;
        }).forEach(function (col) {
          sortMethodsByColumnID[col.id] = col.sortMethod;
        });

        // Resolve the data from either manual data or sorted data
        return {
          sortedData: manual ? resolvedData : this.sortData(this.filterData(resolvedData, filtered, defaultFilterMethod, allVisibleColumns), sorted, sortMethodsByColumnID)
        };
      }
    }, {
      key: 'fireFetchData',
      value: function fireFetchData() {
        // determine the current state, preferring certain state values over props
        var currentState = _extends({}, this.getResolvedState(), {
          page: this.getStateOrProp('page'),
          pageSize: this.getStateOrProp('pageSize'),
          filter: this.getStateOrProp('filter')
        });

        this.props.onFetchData(currentState, this);
      }
    }, {
      key: 'getPropOrState',
      value: function getPropOrState(key) {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["default"].getFirstDefined(this.props[key], this.state[key]);
      }
    }, {
      key: 'getStateOrProp',
      value: function getStateOrProp(key) {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["default"].getFirstDefined(this.state[key], this.props[key]);
      }
    }, {
      key: 'filterData',
      value: function filterData(data, filtered, defaultFilterMethod, allVisibleColumns) {
        var _this3 = this;

        var filteredData = data;

        if (filtered.length) {
          filteredData = filtered.reduce(function (filteredSoFar, nextFilter) {
            var column = allVisibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });

            // Don't filter hidden columns or columns that have had their filters disabled
            if (!column || column.filterable === false) {
              return filteredSoFar;
            }

            var filterMethod = column.filterMethod || defaultFilterMethod;

            // If 'filterAll' is set to true, pass the entire dataset to the filter method
            if (column.filterAll) {
              return filterMethod(nextFilter, filteredSoFar, column);
            }
            return filteredSoFar.filter(function (row) {
              return filterMethod(nextFilter, row, column);
            });
          }, filteredData);

          // Apply the filter to the subrows if we are pivoting, and then
          // filter any rows without subcolumns because it would be strange to show
          filteredData = filteredData.map(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return row;
            }
            return _extends({}, row, _defineProperty({}, _this3.props.subRowsKey, _this3.filterData(row[_this3.props.subRowsKey], filtered, defaultFilterMethod, allVisibleColumns)));
          }).filter(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return true;
            }
            return row[_this3.props.subRowsKey].length > 0;
          });
        }

        return filteredData;
      }
    }, {
      key: 'sortData',
      value: function sortData(data, sorted) {
        var _this4 = this;

        var sortMethodsByColumnID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (!sorted.length) {
          return data;
        }

        var sortedData = (this.props.orderByMethod || _utils__WEBPACK_IMPORTED_MODULE_1__["default"].orderBy)(data, sorted.map(function (sort) {
          // Support custom sorting methods for each column
          if (sortMethodsByColumnID[sort.id]) {
            return function (a, b) {
              return sortMethodsByColumnID[sort.id](a[sort.id], b[sort.id], sort.desc);
            };
          }
          return function (a, b) {
            return _this4.props.defaultSortMethod(a[sort.id], b[sort.id], sort.desc);
          };
        }), sorted.map(function (d) {
          return !d.desc;
        }), this.props.indexKey);

        sortedData.forEach(function (row) {
          if (!row[_this4.props.subRowsKey]) {
            return;
          }
          row[_this4.props.subRowsKey] = _this4.sortData(row[_this4.props.subRowsKey], sorted, sortMethodsByColumnID);
        });

        return sortedData;
      }
    }, {
      key: 'getMinRows',
      value: function getMinRows() {
        return _utils__WEBPACK_IMPORTED_MODULE_1__["default"].getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
      }

      // User actions

    }, {
      key: 'onPageChange',
      value: function onPageChange(page) {
        var _props = this.props,
            onPageChange = _props.onPageChange,
            collapseOnPageChange = _props.collapseOnPageChange;


        var newState = { page: page };
        if (collapseOnPageChange) {
          newState.expanded = {};
        }
        this.setStateWithData(newState, function () {
          return onPageChange && onPageChange(page);
        });
      }
    }, {
      key: 'onPageSizeChange',
      value: function onPageSizeChange(newPageSize) {
        var onPageSizeChange = this.props.onPageSizeChange;

        var _getResolvedState = this.getResolvedState(),
            pageSize = _getResolvedState.pageSize,
            page = _getResolvedState.page;

        // Normalize the page to display


        var currentRow = pageSize * page;
        var newPage = Math.floor(currentRow / newPageSize);

        this.setStateWithData({
          pageSize: newPageSize,
          page: newPage
        }, function () {
          return onPageSizeChange && onPageSizeChange(newPageSize, newPage);
        });
      }
    }, {
      key: 'sortColumn',
      value: function sortColumn(column, additive) {
        var _getResolvedState2 = this.getResolvedState(),
            sorted = _getResolvedState2.sorted,
            skipNextSort = _getResolvedState2.skipNextSort,
            defaultSortDesc = _getResolvedState2.defaultSortDesc;

        var firstSortDirection = Object.prototype.hasOwnProperty.call(column, 'defaultSortDesc') ? column.defaultSortDesc : defaultSortDesc;
        var secondSortDirection = !firstSortDirection;

        // we can't stop event propagation from the column resize move handlers
        // attached to the document because of react's synthetic events
        // so we have to prevent the sort function from actually sorting
        // if we click on the column resize element within a header.
        if (skipNextSort) {
          this.setStateWithData({
            skipNextSort: false
          });
          return;
        }

        var onSortedChange = this.props.onSortedChange;


        var newSorted = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].clone(sorted || []).map(function (d) {
          d.desc = _utils__WEBPACK_IMPORTED_MODULE_1__["default"].isSortingDesc(d);
          return d;
        });
        if (!_utils__WEBPACK_IMPORTED_MODULE_1__["default"].isArray(column)) {
          // Single-Sort
          var existingIndex = newSorted.findIndex(function (d) {
            return d.id === column.id;
          });
          if (existingIndex > -1) {
            var existing = newSorted[existingIndex];
            if (existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(existingIndex, 1);
              } else {
                existing.desc = firstSortDirection;
                newSorted = [existing];
              }
            } else {
              existing.desc = secondSortDirection;
              if (!additive) {
                newSorted = [existing];
              }
            }
          } else if (additive) {
            newSorted.push({
              id: column.id,
              desc: firstSortDirection
            });
          } else {
            newSorted = [{
              id: column.id,
              desc: firstSortDirection
            }];
          }
        } else {
          // Multi-Sort
          var _existingIndex = newSorted.findIndex(function (d) {
            return d.id === column[0].id;
          });
          // Existing Sorted Column
          if (_existingIndex > -1) {
            var _existing = newSorted[_existingIndex];
            if (_existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(_existingIndex, column.length);
              } else {
                column.forEach(function (d, i) {
                  newSorted[_existingIndex + i].desc = firstSortDirection;
                });
              }
            } else {
              column.forEach(function (d, i) {
                newSorted[_existingIndex + i].desc = secondSortDirection;
              });
            }
            if (!additive) {
              newSorted = newSorted.slice(_existingIndex, column.length);
            }
            // New Sort Column
          } else if (additive) {
            newSorted = newSorted.concat(column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            }));
          } else {
            newSorted = column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            });
          }
        }

        this.setStateWithData({
          page: !sorted.length && newSorted.length || !additive ? 0 : this.state.page,
          sorted: newSorted
        }, function () {
          return onSortedChange && onSortedChange(newSorted, column, additive);
        });
      }
    }, {
      key: 'filterColumn',
      value: function filterColumn(column, value) {
        var _getResolvedState3 = this.getResolvedState(),
            filtered = _getResolvedState3.filtered;

        var onFilteredChange = this.props.onFilteredChange;

        // Remove old filter first if it exists

        var newFiltering = (filtered || []).filter(function (x) {
          return x.id !== column.id;
        });

        if (value !== '') {
          newFiltering.push({
            id: column.id,
            value: value
          });
        }

        this.setStateWithData({
          filtered: newFiltering
        }, function () {
          return onFilteredChange && onFilteredChange(newFiltering, column, value);
        });
      }
    }, {
      key: 'resizeColumnStart',
      value: function resizeColumnStart(event, column, isTouch) {
        var _this5 = this;

        event.stopPropagation();
        var parentWidth = event.target.parentElement.getBoundingClientRect().width;

        var pageX = void 0;
        if (isTouch) {
          pageX = event.changedTouches[0].pageX;
        } else {
          pageX = event.pageX;
        }

        this.trapEvents = true;
        this.setStateWithData({
          currentlyResizing: {
            id: column.id,
            startX: pageX,
            parentWidth: parentWidth
          }
        }, function () {
          if (isTouch) {
            document.addEventListener('touchmove', _this5.resizeColumnMoving);
            document.addEventListener('touchcancel', _this5.resizeColumnEnd);
            document.addEventListener('touchend', _this5.resizeColumnEnd);
          } else {
            document.addEventListener('mousemove', _this5.resizeColumnMoving);
            document.addEventListener('mouseup', _this5.resizeColumnEnd);
            document.addEventListener('mouseleave', _this5.resizeColumnEnd);
          }
        });
      }
    }, {
      key: 'resizeColumnMoving',
      value: function resizeColumnMoving(event) {
        event.stopPropagation();
        var _props2 = this.props,
            onResizedChange = _props2.onResizedChange,
            column = _props2.column;

        var _getResolvedState4 = this.getResolvedState(),
            resized = _getResolvedState4.resized,
            currentlyResizing = _getResolvedState4.currentlyResizing,
            columns = _getResolvedState4.columns;

        var currentColumn = columns.find(function (c) {
          return c.accessor === currentlyResizing.id;
        });
        var minResizeWidth = currentColumn ? currentColumn.minResizeWidth : column.minResizeWidth;

        // Delete old value
        var newResized = resized.filter(function (x) {
          return x.id !== currentlyResizing.id;
        });

        var pageX = void 0;

        if (event.type === 'touchmove') {
          pageX = event.changedTouches[0].pageX;
        } else if (event.type === 'mousemove') {
          pageX = event.pageX;
        }

        var newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, minResizeWidth);

        newResized.push({
          id: currentlyResizing.id,
          value: newWidth
        });

        this.setStateWithData({
          resized: newResized
        }, function () {
          return onResizedChange && onResizedChange(newResized, event);
        });
      }
    }, {
      key: 'resizeColumnEnd',
      value: function resizeColumnEnd(event) {
        event.stopPropagation();
        var isTouch = event.type === 'touchend' || event.type === 'touchcancel';

        if (isTouch) {
          document.removeEventListener('touchmove', this.resizeColumnMoving);
          document.removeEventListener('touchcancel', this.resizeColumnEnd);
          document.removeEventListener('touchend', this.resizeColumnEnd);
        }

        // If its a touch event clear the mouse one's as well because sometimes
        // the mouseDown event gets called as well, but the mouseUp event doesn't
        document.removeEventListener('mousemove', this.resizeColumnMoving);
        document.removeEventListener('mouseup', this.resizeColumnEnd);
        document.removeEventListener('mouseleave', this.resizeColumnEnd);

        // The touch events don't propagate up to the sorting's onMouseDown event so
        // no need to prevent it from happening or else the first click after a touch
        // event resize will not sort the column.
        if (!isTouch) {
          this.setStateWithData({
            skipNextSort: true,
            currentlyResizing: false
          });
        }
      }
    }]);

    return _class;
  }(Base);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiXyIsInByb3BzIiwic3RhdGUiLCJyZXNvbHZlZFN0YXRlIiwiY29tcGFjdE9iamVjdCIsIm5ld1N0YXRlIiwiZGF0YUNoYW5nZWQiLCJjb2x1bW5zIiwicGl2b3RCeSIsImRhdGEiLCJyZXNvbHZlRGF0YSIsInBpdm90SURLZXkiLCJwaXZvdFZhbEtleSIsInN1YlJvd3NLZXkiLCJhZ2dyZWdhdGVkS2V5IiwibmVzdGluZ0xldmVsS2V5Iiwib3JpZ2luYWxLZXkiLCJpbmRleEtleSIsImdyb3VwZWRCeVBpdm90S2V5IiwiU3ViQ29tcG9uZW50IiwiaGFzSGVhZGVyR3JvdXBzIiwiZm9yRWFjaCIsImNvbHVtbiIsImNvbHVtbnNXaXRoRXhwYW5kZXIiLCJleHBhbmRlckNvbHVtbiIsImZpbmQiLCJjb2wiLCJleHBhbmRlciIsInNvbWUiLCJjb2wyIiwibWFrZURlY29yYXRlZENvbHVtbiIsInBhcmVudENvbHVtbiIsImRjb2wiLCJleHBhbmRlckRlZmF1bHRzIiwibWF4V2lkdGgiLCJtaW5XaWR0aCIsImFjY2Vzc29yIiwiaWQiLCJhY2Nlc3NvclN0cmluZyIsImdldCIsInJvdyIsImNvbnNvbGUiLCJ3YXJuIiwiRXJyb3IiLCJ1bmRlZmluZWQiLCJhbGxEZWNvcmF0ZWRDb2x1bW5zIiwiZGVjb3JhdGVBbmRBZGRUb0FsbCIsImRlY29yYXRlZENvbHVtbiIsInB1c2giLCJkZWNvcmF0ZWRDb2x1bW5zIiwibWFwIiwiZCIsInZpc2libGVDb2x1bW5zIiwic2xpY2UiLCJhbGxWaXNpYmxlQ29sdW1ucyIsInZpc2libGVTdWJDb2x1bW5zIiwiZmlsdGVyIiwiaW5kZXhPZiIsImdldEZpcnN0RGVmaW5lZCIsInNob3ciLCJsZW5ndGgiLCJwaXZvdEluZGV4IiwiZmluZEluZGV4IiwicGl2b3QiLCJwaXZvdENvbHVtbnMiLCJmb3VuZCIsInBpdm90SUQiLCJQaXZvdFBhcmVudENvbHVtbiIsInJlZHVjZSIsInByZXYiLCJjdXJyZW50IiwiUGl2b3RHcm91cEhlYWRlciIsIkhlYWRlciIsInBpdm90Q29sdW1uR3JvdXAiLCJwaXZvdERlZmF1bHRzIiwicGl2b3RlZCIsInNwbGljZSIsInVuc2hpZnQiLCJoZWFkZXJHcm91cHMiLCJjdXJyZW50U3BhbiIsImFkZEhlYWRlciIsImNvbmNhdCIsImFjY2Vzc1JvdyIsImkiLCJsZXZlbCIsInJlc29sdmVkRGF0YSIsImFnZ3JlZ2F0aW5nQ29sdW1ucyIsImFnZ3JlZ2F0ZSIsImFnZ3JlZ2F0aW9uVmFsdWVzIiwidmFsdWVzIiwicm93cyIsImdyb3VwUmVjdXJzaXZlbHkiLCJrZXlzIiwiZ3JvdXBlZFJvd3MiLCJPYmplY3QiLCJlbnRyaWVzIiwiZ3JvdXBCeSIsImtleSIsInZhbHVlIiwic3ViUm93cyIsInJvd0dyb3VwIiwibWFudWFsIiwic29ydGVkIiwiZmlsdGVyZWQiLCJkZWZhdWx0RmlsdGVyTWV0aG9kIiwic29ydE1ldGhvZHNCeUNvbHVtbklEIiwic29ydE1ldGhvZCIsInNvcnRlZERhdGEiLCJzb3J0RGF0YSIsImZpbHRlckRhdGEiLCJjdXJyZW50U3RhdGUiLCJnZXRSZXNvbHZlZFN0YXRlIiwicGFnZSIsImdldFN0YXRlT3JQcm9wIiwicGFnZVNpemUiLCJvbkZldGNoRGF0YSIsImZpbHRlcmVkRGF0YSIsImZpbHRlcmVkU29GYXIiLCJuZXh0RmlsdGVyIiwieCIsImZpbHRlcmFibGUiLCJmaWx0ZXJNZXRob2QiLCJmaWx0ZXJBbGwiLCJvcmRlckJ5TWV0aG9kIiwib3JkZXJCeSIsInNvcnQiLCJhIiwiYiIsImRlc2MiLCJkZWZhdWx0U29ydE1ldGhvZCIsIm1pblJvd3MiLCJvblBhZ2VDaGFuZ2UiLCJjb2xsYXBzZU9uUGFnZUNoYW5nZSIsImV4cGFuZGVkIiwic2V0U3RhdGVXaXRoRGF0YSIsIm5ld1BhZ2VTaXplIiwib25QYWdlU2l6ZUNoYW5nZSIsImN1cnJlbnRSb3ciLCJuZXdQYWdlIiwiTWF0aCIsImZsb29yIiwiYWRkaXRpdmUiLCJza2lwTmV4dFNvcnQiLCJkZWZhdWx0U29ydERlc2MiLCJmaXJzdFNvcnREaXJlY3Rpb24iLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJzZWNvbmRTb3J0RGlyZWN0aW9uIiwib25Tb3J0ZWRDaGFuZ2UiLCJuZXdTb3J0ZWQiLCJjbG9uZSIsImlzU29ydGluZ0Rlc2MiLCJpc0FycmF5IiwiZXhpc3RpbmdJbmRleCIsImV4aXN0aW5nIiwib25GaWx0ZXJlZENoYW5nZSIsIm5ld0ZpbHRlcmluZyIsImV2ZW50IiwiaXNUb3VjaCIsInN0b3BQcm9wYWdhdGlvbiIsInBhcmVudFdpZHRoIiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwicGFnZVgiLCJjaGFuZ2VkVG91Y2hlcyIsInRyYXBFdmVudHMiLCJjdXJyZW50bHlSZXNpemluZyIsInN0YXJ0WCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlc2l6ZUNvbHVtbk1vdmluZyIsInJlc2l6ZUNvbHVtbkVuZCIsIm9uUmVzaXplZENoYW5nZSIsInJlc2l6ZWQiLCJjdXJyZW50Q29sdW1uIiwiYyIsIm1pblJlc2l6ZVdpZHRoIiwibmV3UmVzaXplZCIsInR5cGUiLCJuZXdXaWR0aCIsIm1heCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJCYXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLENBQVAsTUFBYyxTQUFkOztBQUVBLGdCQUFlO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLHVDQUVPQyxLQUZQLEVBRWNDLEtBRmQsRUFFcUI7QUFDOUIsWUFBTUMsNkJBQ0RILEVBQUVJLGFBQUYsQ0FBZ0IsS0FBS0YsS0FBckIsQ0FEQyxFQUVERixFQUFFSSxhQUFGLENBQWdCLEtBQUtILEtBQXJCLENBRkMsRUFHREQsRUFBRUksYUFBRixDQUFnQkYs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IjoibWV0aG9kcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBfIGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IEJhc2UgPT5cbiAgY2xhc3MgZXh0ZW5kcyBCYXNlIHtcbiAgICBnZXRSZXNvbHZlZFN0YXRlIChwcm9wcywgc3RhdGUpIHtcbiAgICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB7XG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdCh0aGlzLnN0YXRlKSxcbiAgICAgICAgLi4uXy5jb21wYWN0T2JqZWN0KHRoaXMucHJvcHMpLFxuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3Qoc3RhdGUpLFxuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3QocHJvcHMpLFxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc29sdmVkU3RhdGVcbiAgICB9XG5cbiAgICBnZXREYXRhTW9kZWwgKG5ld1N0YXRlLCBkYXRhQ2hhbmdlZCkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBjb2x1bW5zLFxuICAgICAgICBwaXZvdEJ5ID0gW10sXG4gICAgICAgIGRhdGEsXG4gICAgICAgIHJlc29sdmVEYXRhLFxuICAgICAgICBwaXZvdElES2V5LFxuICAgICAgICBwaXZvdFZhbEtleSxcbiAgICAgICAgc3ViUm93c0tleSxcbiAgICAgICAgYWdncmVnYXRlZEtleSxcbiAgICAgICAgbmVzdGluZ0xldmVsS2V5LFxuICAgICAgICBvcmlnaW5hbEtleSxcbiAgICAgICAgaW5kZXhLZXksXG4gICAgICAgIGdyb3VwZWRCeVBpdm90S2V5LFxuICAgICAgICBTdWJDb21wb25lbnQsXG4gICAgICB9ID0gbmV3U3RhdGVcblxuICAgICAgLy8gRGV0ZXJtaW5lIGlmIHRoZXJlIGFyZSBIZWFkZXIgR3JvdXBzXG4gICAgICBsZXQgaGFzSGVhZGVyR3JvdXBzID0gZmFsc2VcbiAgICAgIGNvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcbiAgICAgICAgICBoYXNIZWFkZXJHcm91cHMgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIGxldCBjb2x1bW5zV2l0aEV4cGFuZGVyID0gWy4uLmNvbHVtbnNdXG5cbiAgICAgIGxldCBleHBhbmRlckNvbHVtbiA9IGNvbHVtbnMuZmluZChcbiAgICAgICAgY29sID0+IGNvbC5leHBhbmRlciB8fCAoY29sLmNvbHVtbnMgJiYgY29sLmNvbHVtbnMuc29tZShjb2wyID0+IGNvbDIuZXhwYW5kZXIpKVxuICAgICAgKVxuXG4gICAgICBpZiAoZXhwYW5kZXJDb2x1bW4gJiYgIWV4cGFuZGVyQ29sdW1uLmV4cGFuZGVyKSB7XG4gICAgICAgIGV4cGFuZGVyQ29sdW1uID0gZXhwYW5kZXJDb2x1bW4uY29sdW1ucy5maW5kKGNvbCA9PiBjb2wuZXhwYW5kZXIpXG4gICAgICB9XG4gICAgICAvLyBJZiB3ZSBoYXZlIFN1YkNvbXBvbmVudCdzIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlIGhhdmUgYW4gZXhwYW5kZXIgY29sdW1uXG4gICAgICBpZiAoU3ViQ29tcG9uZW50ICYmICFleHBhbmRlckNvbHVtbikge1xuICAgICAgICBleHBhbmRlckNvbHVtbiA9IHsgZXhwYW5kZXI6IHRydWUgfVxuICAgICAgICBjb2x1bW5zV2l0aEV4cGFuZGVyID0gW2V4cGFuZGVyQ29sdW1uLCAuLi5jb2x1bW5zV2l0aEV4cGFuZGVyXVxuICAgICAgfVxuXG4gICAgICBjb25zdCBtYWtlRGVjb3JhdGVkQ29sdW1uID0gKGNvbHVtbiwgcGFyZW50Q29sdW1uKSA9PiB7XG4gICAgICAgIGxldCBkY29sXG4gICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHtcbiAgICAgICAgICBkY29sID0ge1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jb2x1bW4sXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmV4cGFuZGVyRGVmYXVsdHMsXG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRjb2wgPSB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmNvbHVtbixcbiAgICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbnN1cmUgbWluV2lkdGggaXMgbm90IGdyZWF0ZXIgdGhhbiBtYXhXaWR0aCBpZiBzZXRcbiAgICAgICAgaWYgKGRjb2wubWF4V2lkdGggPCBkY29sLm1pbldpZHRoKSB7XG4gICAgICAgICAgZGNvbC5taW5XaWR0aCA9IGRjb2wubWF4V2lkdGhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnRDb2x1bW4pIHtcbiAgICAgICAgICBkY29sLnBhcmVudENvbHVtbiA9IHBhcmVudENvbHVtblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlyc3QgY2hlY2sgZm9yIHN0cmluZyBhY2Nlc3NvclxuICAgICAgICBpZiAodHlwZW9mIGRjb2wuYWNjZXNzb3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgZGNvbC5pZCA9IGRjb2wuaWQgfHwgZGNvbC5hY2Nlc3NvclxuICAgICAgICAgIGNvbnN0IGFjY2Vzc29yU3RyaW5nID0gZGNvbC5hY2Nlc3NvclxuICAgICAgICAgIGRjb2wuYWNjZXNzb3IgPSByb3cgPT4gXy5nZXQocm93LCBhY2Nlc3NvclN0cmluZylcbiAgICAgICAgICByZXR1cm4gZGNvbFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmFsbCBiYWNrIHRvIGZ1bmN0aW9uYWwgYWNjZXNzb3IgKGJ1dCByZXF1aXJlIGFuIElEKVxuICAgICAgICBpZiAoZGNvbC5hY2Nlc3NvciAmJiAhZGNvbC5pZCkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihkY29sKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdBIGNvbHVtbiBpZCBpcyByZXF1aXJlZCBpZiB1c2luZyBhIG5vbi1zdHJpbmcgYWNjZXNzb3IgZm9yIGNvbHVtbiBhYm92ZS4nXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmFsbCBiYWNrIHRvIGFuIHVuZGVmaW5lZCBhY2Nlc3NvclxuICAgICAgICBpZiAoIWRjb2wuYWNjZXNzb3IpIHtcbiAgICAgICAgICBkY29sLmFjY2Vzc29yID0gKCkgPT4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGNvbFxuICAgICAgfVxuXG4gICAgICBjb25zdCBhbGxEZWNvcmF0ZWRDb2x1bW5zID0gW11cblxuICAgICAgLy8gRGVjb3JhdGUgdGhlIGNvbHVtbnNcbiAgICAgIGNvbnN0IGRlY29yYXRlQW5kQWRkVG9BbGwgPSAoY29sdW1uLCBwYXJlbnRDb2x1bW4pID0+IHtcbiAgICAgICAgY29uc3QgZGVjb3JhdGVkQ29sdW1uID0gbWFrZURlY29yYXRlZENvbHVtbihjb2x1bW4sIHBhcmVudENvbHVtbilcbiAgICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucy5wdXNoKGRlY29yYXRlZENvbHVtbilcbiAgICAgICAgcmV0dXJuIGRlY29yYXRlZENvbHVtblxuICAgICAgfVxuXG4gICAgICBjb25zdCBkZWNvcmF0ZWRDb2x1bW5zID0gY29sdW1uc1dpdGhFeHBhbmRlci5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbi5jb2x1bW5zLm1hcChkID0+IGRlY29yYXRlQW5kQWRkVG9BbGwoZCwgY29sdW1uKSksXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZWNvcmF0ZUFuZEFkZFRvQWxsKGNvbHVtbilcbiAgICAgIH0pXG5cbiAgICAgIC8vIEJ1aWxkIHRoZSB2aXNpYmxlIGNvbHVtbnMsIGhlYWRlcnMgYW5kIGZsYXQgY29sdW1uIGxpc3RcbiAgICAgIGxldCB2aXNpYmxlQ29sdW1ucyA9IGRlY29yYXRlZENvbHVtbnMuc2xpY2UoKVxuICAgICAgbGV0IGFsbFZpc2libGVDb2x1bW5zID0gW11cblxuICAgICAgdmlzaWJsZUNvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgICAgY29uc3QgdmlzaWJsZVN1YkNvbHVtbnMgPSBjb2x1bW4uY29sdW1ucy5maWx0ZXIoXG4gICAgICAgICAgICBkID0+IChwaXZvdEJ5LmluZGV4T2YoZC5pZCkgPiAtMSA/IGZhbHNlIDogXy5nZXRGaXJzdERlZmluZWQoZC5zaG93LCB0cnVlKSlcbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICAgIGNvbHVtbnM6IHZpc2libGVTdWJDb2x1bW5zLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sdW1uXG4gICAgICB9KVxuXG4gICAgICB2aXNpYmxlQ29sdW1ucyA9IHZpc2libGVDb2x1bW5zLmZpbHRlcihcbiAgICAgICAgY29sdW1uID0+XG4gICAgICAgICAgY29sdW1uLmNvbHVtbnNcbiAgICAgICAgICAgID8gY29sdW1uLmNvbHVtbnMubGVuZ3RoXG4gICAgICAgICAgICA6IHBpdm90QnkuaW5kZXhPZihjb2x1bW4uaWQpID4gLTFcbiAgICAgICAgICAgICAgPyBmYWxzZVxuICAgICAgICAgICAgICA6IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi5zaG93LCB0cnVlKVxuICAgICAgKVxuXG4gICAgICAvLyBGaW5kIGFueSBjdXN0b20gcGl2b3QgbG9jYXRpb25cbiAgICAgIGNvbnN0IHBpdm90SW5kZXggPSB2aXNpYmxlQ29sdW1ucy5maW5kSW5kZXgoY29sID0+IGNvbC5waXZvdClcblxuICAgICAgLy8gSGFuZGxlIFBpdm90IENvbHVtbnNcbiAgICAgIGlmIChwaXZvdEJ5Lmxlbmd0aCkge1xuICAgICAgICAvLyBSZXRyaWV2ZSB0aGUgcGl2b3QgY29sdW1ucyBpbiB0aGUgY29ycmVjdCBwaXZvdCBvcmRlclxuICAgICAgICBjb25zdCBwaXZvdENvbHVtbnMgPSBbXVxuICAgICAgICBwaXZvdEJ5LmZvckVhY2gocGl2b3RJRCA9PiB7XG4gICAgICAgICAgY29uc3QgZm91bmQgPSBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZpbmQoZCA9PiBkLmlkID09PSBwaXZvdElEKVxuICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgcGl2b3RDb2x1bW5zLnB1c2goZm91bmQpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IFBpdm90UGFyZW50Q29sdW1uID0gcGl2b3RDb2x1bW5zLnJlZHVjZShcbiAgICAgICAgICAocHJldiwgY3VycmVudCkgPT4gcHJldiAmJiBwcmV2ID09PSBjdXJyZW50LnBhcmVudENvbHVtbiAmJiBjdXJyZW50LnBhcmVudENvbHVtbixcbiAgICAgICAgICBwaXZvdENvbHVtbnNbMF0ucGFyZW50Q29sdW1uXG4gICAgICAgIClcblxuICAgICAgICBsZXQgUGl2b3RHcm91cEhlYWRlciA9IGhhc0hlYWRlckdyb3VwcyAmJiBQaXZvdFBhcmVudENvbHVtbi5IZWFkZXJcbiAgICAgICAgUGl2b3RHcm91cEhlYWRlciA9IFBpdm90R3JvdXBIZWFkZXIgfHwgKCgpID0+IDxzdHJvbmc+UGl2b3RlZDwvc3Ryb25nPilcblxuICAgICAgICBsZXQgcGl2b3RDb2x1bW5Hcm91cCA9IHtcbiAgICAgICAgICBIZWFkZXI6IFBpdm90R3JvdXBIZWFkZXIsXG4gICAgICAgICAgY29sdW1uczogcGl2b3RDb2x1bW5zLm1hcChjb2wgPT4gKHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMucGl2b3REZWZhdWx0cyxcbiAgICAgICAgICAgIC4uLmNvbCxcbiAgICAgICAgICAgIHBpdm90ZWQ6IHRydWUsXG4gICAgICAgICAgfSkpLFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGxhY2UgdGhlIHBpdm90Q29sdW1ucyBiYWNrIGludG8gdGhlIHZpc2libGVDb2x1bW5zXG4gICAgICAgIGlmIChwaXZvdEluZGV4ID49IDApIHtcbiAgICAgICAgICBwaXZvdENvbHVtbkdyb3VwID0ge1xuICAgICAgICAgICAgLi4udmlzaWJsZUNvbHVtbnNbcGl2b3RJbmRleF0sXG4gICAgICAgICAgICAuLi5waXZvdENvbHVtbkdyb3VwLFxuICAgICAgICAgIH1cbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy5zcGxpY2UocGl2b3RJbmRleCwgMSwgcGl2b3RDb2x1bW5Hcm91cClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2aXNpYmxlQ29sdW1ucy51bnNoaWZ0KHBpdm90Q29sdW1uR3JvdXApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQnVpbGQgSGVhZGVyIEdyb3Vwc1xuICAgICAgY29uc3QgaGVhZGVyR3JvdXBzID0gW11cbiAgICAgIGxldCBjdXJyZW50U3BhbiA9IFtdXG5cbiAgICAgIC8vIEEgY29udmVuaWVuY2UgZnVuY3Rpb24gdG8gYWRkIGEgaGVhZGVyIGFuZCByZXNldCB0aGUgY3VycmVudFNwYW5cbiAgICAgIGNvbnN0IGFkZEhlYWRlciA9IChjb2x1bW5zLCBjb2x1bW4pID0+IHtcbiAgICAgICAgaGVhZGVyR3JvdXBzLnB1c2goe1xuICAgICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxuICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICBjb2x1bW5zLFxuICAgICAgICB9KVxuICAgICAgICBjdXJyZW50U3BhbiA9IFtdXG4gICAgICB9XG5cbiAgICAgIC8vIEJ1aWxkIGZsYXQgbGlzdCBvZiBhbGxWaXNpYmxlQ29sdW1ucyBhbmQgSGVhZGVyR3JvdXBzXG4gICAgICB2aXNpYmxlQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xuICAgICAgICAgIGFsbFZpc2libGVDb2x1bW5zID0gYWxsVmlzaWJsZUNvbHVtbnMuY29uY2F0KGNvbHVtbi5jb2x1bW5zKVxuICAgICAgICAgIGlmIChjdXJyZW50U3Bhbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBhZGRIZWFkZXIoY3VycmVudFNwYW4pXG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZEhlYWRlcihjb2x1bW4uY29sdW1ucywgY29sdW1uKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGFsbFZpc2libGVDb2x1bW5zLnB1c2goY29sdW1uKVxuICAgICAgICBjdXJyZW50U3Bhbi5wdXNoKGNvbHVtbilcbiAgICAgIH0pXG4gICAgICBpZiAoaGFzSGVhZGVyR3JvdXBzICYmIGN1cnJlbnRTcGFuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYWRkSGVhZGVyKGN1cnJlbnRTcGFuKVxuICAgICAgfVxuXG4gICAgICAvLyBBY2Nlc3MgdGhlIGRhdGFcbiAgICAgIGNvbnN0IGFjY2Vzc1JvdyA9IChkLCBpLCBsZXZlbCA9IDApID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0ge1xuICAgICAgICAgIFtvcmlnaW5hbEtleV06IGQsXG4gICAgICAgICAgW2luZGV4S2V5XTogaSxcbiAgICAgICAgICBbc3ViUm93c0tleV06IGRbc3ViUm93c0tleV0sXG4gICAgICAgICAgW25lc3RpbmdMZXZlbEtleV06IGxldmVsLFxuICAgICAgICB9XG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHJldHVyblxuICAgICAgICAgIHJvd1tjb2x1bW4uaWRdID0gY29sdW1uLmFjY2Vzc29yKGQpXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChyb3dbc3ViUm93c0tleV0pIHtcbiAgICAgICAgICByb3dbc3ViUm93c0tleV0gPSByb3dbc3ViUm93c0tleV0ubWFwKChkLCBpKSA9PiBhY2Nlc3NSb3coZCwgaSwgbGV2ZWwgKyAxKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm93XG4gICAgICB9XG5cbiAgICAgIC8vIC8vIElmIHRoZSBkYXRhIGhhc24ndCBjaGFuZ2VkLCBqdXN0IHVzZSB0aGUgY2FjaGVkIGRhdGFcbiAgICAgIGxldCByZXNvbHZlZERhdGEgPSB0aGlzLnJlc29sdmVkRGF0YVxuICAgICAgLy8gSWYgdGhlIGRhdGEgaGFzIGNoYW5nZWQsIHJ1biB0aGUgZGF0YSByZXNvbHZlciBhbmQgY2FjaGUgdGhlIHJlc3VsdFxuICAgICAgaWYgKCF0aGlzLnJlc29sdmVkRGF0YSB8fCBkYXRhQ2hhbmdlZCkge1xuICAgICAgICByZXNvbHZlZERhdGEgPSByZXNvbHZlRGF0YShkYXRhKVxuICAgICAgICB0aGlzLnJlc29sdmVkRGF0YSA9IHJlc29sdmVkRGF0YVxuICAgICAgfVxuICAgICAgLy8gVXNlIHRoZSByZXNvbHZlZCBkYXRhXG4gICAgICByZXNvbHZlZERhdGEgPSByZXNvbHZlZERhdGEubWFwKChkLCBpKSA9PiBhY2Nlc3NSb3coZCwgaSkpXG5cbiAgICAgIC8vIFRPRE86IE1ha2UgaXQgcG9zc2libGUgdG8gZmFicmljYXRlIG5lc3RlZCByb3dzIHdpdGhvdXQgcGl2b3RpbmdcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0aW5nQ29sdW1ucyA9IGFsbFZpc2libGVDb2x1bW5zLmZpbHRlcihkID0+ICFkLmV4cGFuZGVyICYmIGQuYWdncmVnYXRlKVxuXG4gICAgICAvLyBJZiBwaXZvdGluZywgcmVjdXJzaXZlbHkgZ3JvdXAgdGhlIGRhdGFcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0ZSA9IHJvd3MgPT4ge1xuICAgICAgICBjb25zdCBhZ2dyZWdhdGlvblZhbHVlcyA9IHt9XG4gICAgICAgIGFnZ3JlZ2F0aW5nQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWVzID0gcm93cy5tYXAoZCA9PiBkW2NvbHVtbi5pZF0pXG4gICAgICAgICAgYWdncmVnYXRpb25WYWx1ZXNbY29sdW1uLmlkXSA9IGNvbHVtbi5hZ2dyZWdhdGUodmFsdWVzLCByb3dzKVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYWdncmVnYXRpb25WYWx1ZXNcbiAgICAgIH1cbiAgICAgIGlmIChwaXZvdEJ5Lmxlbmd0aCkge1xuICAgICAgICBjb25zdCBncm91cFJlY3Vyc2l2ZWx5ID0gKHJvd3MsIGtleXMsIGkgPSAwKSA9PiB7XG4gICAgICAgICAgLy8gVGhpcyBpcyB0aGUgbGFzdCBsZXZlbCwganVzdCByZXR1cm4gdGhlIHJvd3NcbiAgICAgICAgICBpZiAoaSA9PT0ga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiByb3dzXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEdyb3VwIHRoZSByb3dzIHRvZ2V0aGVyIGZvciB0aGlzIGxldmVsXG4gICAgICAgICAgbGV0IGdyb3VwZWRSb3dzID0gT2JqZWN0LmVudHJpZXMoXy5ncm91cEJ5KHJvd3MsIGtleXNbaV0pKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKHtcbiAgICAgICAgICAgIFtwaXZvdElES2V5XToga2V5c1tpXSxcbiAgICAgICAgICAgIFtwaXZvdFZhbEtleV06IGtleSxcbiAgICAgICAgICAgIFtrZXlzW2ldXToga2V5LFxuICAgICAgICAgICAgW3N1YlJvd3NLZXldOiB2YWx1ZSxcbiAgICAgICAgICAgIFtuZXN0aW5nTGV2ZWxLZXldOiBpLFxuICAgICAgICAgICAgW2dyb3VwZWRCeVBpdm90S2V5XTogdHJ1ZSxcbiAgICAgICAgICB9KSlcbiAgICAgICAgICAvLyBSZWN1cnNlIGludG8gdGhlIHN1YlJvd3NcbiAgICAgICAgICBncm91cGVkUm93cyA9IGdyb3VwZWRSb3dzLm1hcChyb3dHcm91cCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWJSb3dzID0gZ3JvdXBSZWN1cnNpdmVseShyb3dHcm91cFtzdWJSb3dzS2V5XSwga2V5cywgaSArIDEpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5yb3dHcm91cCxcbiAgICAgICAgICAgICAgW3N1YlJvd3NLZXldOiBzdWJSb3dzLFxuICAgICAgICAgICAgICBbYWdncmVnYXRlZEtleV06IHRydWUsXG4gICAgICAgICAgICAgIC4uLmFnZ3JlZ2F0ZShzdWJSb3dzKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBncm91cGVkUm93c1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmVkRGF0YSA9IGdyb3VwUmVjdXJzaXZlbHkocmVzb2x2ZWREYXRhLCBwaXZvdEJ5KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5uZXdTdGF0ZSxcbiAgICAgICAgcmVzb2x2ZWREYXRhLFxuICAgICAgICBhbGxWaXNpYmxlQ29sdW1ucyxcbiAgICAgICAgaGVhZGVyR3JvdXBzLFxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLFxuICAgICAgICBoYXNIZWFkZXJHcm91cHMsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U29ydGVkRGF0YSAocmVzb2x2ZWRTdGF0ZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYW51YWwsXG4gICAgICAgIHNvcnRlZCxcbiAgICAgICAgZmlsdGVyZWQsXG4gICAgICAgIGRlZmF1bHRGaWx0ZXJNZXRob2QsXG4gICAgICAgIHJlc29sdmVkRGF0YSxcbiAgICAgICAgYWxsVmlzaWJsZUNvbHVtbnMsXG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMsXG4gICAgICB9ID0gcmVzb2x2ZWRTdGF0ZVxuXG4gICAgICBjb25zdCBzb3J0TWV0aG9kc0J5Q29sdW1uSUQgPSB7fVxuXG4gICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZpbHRlcihjb2wgPT4gY29sLnNvcnRNZXRob2QpLmZvckVhY2goY29sID0+IHtcbiAgICAgICAgc29ydE1ldGhvZHNCeUNvbHVtbklEW2NvbC5pZF0gPSBjb2wuc29ydE1ldGhvZFxuICAgICAgfSlcblxuICAgICAgLy8gUmVzb2x2ZSB0aGUgZGF0YSBmcm9tIGVpdGhlciBtYW51YWwgZGF0YSBvciBzb3J0ZWQgZGF0YVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc29ydGVkRGF0YTogbWFudWFsXG4gICAgICAgICAgPyByZXNvbHZlZERhdGFcbiAgICAgICAgICA6IHRoaXMuc29ydERhdGEoXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEocmVzb2x2ZWREYXRhLCBmaWx0ZXJlZCwgZGVmYXVsdEZpbHRlck1ldGhvZCwgYWxsVmlzaWJsZUNvbHVtbnMpLFxuICAgICAgICAgICAgc29ydGVkLFxuICAgICAgICAgICAgc29ydE1ldGhvZHNCeUNvbHVtbklEXG4gICAgICAgICAgKSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmaXJlRmV0Y2hEYXRhICgpIHtcbiAgICAgIC8vIGRldGVybWluZSB0aGUgY3VycmVudCBzdGF0ZSwgcHJlZmVycmluZyBjZXJ0YWluIHN0YXRlIHZhbHVlcyBvdmVyIHByb3BzXG4gICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB7XG4gICAgICAgIC4uLnRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpLFxuICAgICAgICBwYWdlOiB0aGlzLmdldFN0YXRlT3JQcm9wKCdwYWdlJyksXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLmdldFN0YXRlT3JQcm9wKCdwYWdlU2l6ZScpLFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZ2V0U3RhdGVPclByb3AoJ2ZpbHRlcicpLFxuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BzLm9uRmV0Y2hEYXRhKGN1cnJlbnRTdGF0ZSwgdGhpcylcbiAgICB9XG5cbiAgICBnZXRQcm9wT3JTdGF0ZSAoa2V5KSB7XG4gICAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQodGhpcy5wcm9wc1trZXldLCB0aGlzLnN0YXRlW2tleV0pXG4gICAgfVxuXG4gICAgZ2V0U3RhdGVPclByb3AgKGtleSkge1xuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMuc3RhdGVba2V5XSwgdGhpcy5wcm9wc1trZXldKVxuICAgIH1cblxuICAgIGZpbHRlckRhdGEgKGRhdGEsIGZpbHRlcmVkLCBkZWZhdWx0RmlsdGVyTWV0aG9kLCBhbGxWaXNpYmxlQ29sdW1ucykge1xuICAgICAgbGV0IGZpbHRlcmVkRGF0YSA9IGRhdGFcblxuICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCkge1xuICAgICAgICBmaWx0ZXJlZERhdGEgPSBmaWx0ZXJlZC5yZWR1Y2UoKGZpbHRlcmVkU29GYXIsIG5leHRGaWx0ZXIpID0+IHtcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSBhbGxWaXNpYmxlQ29sdW1ucy5maW5kKHggPT4geC5pZCA9PT0gbmV4dEZpbHRlci5pZClcblxuICAgICAgICAgIC8vIERvbid0IGZpbHRlciBoaWRkZW4gY29sdW1ucyBvciBjb2x1bW5zIHRoYXQgaGF2ZSBoYWQgdGhlaXIgZmlsdGVycyBkaXNhYmxlZFxuICAgICAgICAgIGlmICghY29sdW1uIHx8IGNvbHVtbi5maWx0ZXJhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkU29GYXJcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJNZXRob2QgPSBjb2x1bW4uZmlsdGVyTWV0aG9kIHx8IGRlZmF1bHRGaWx0ZXJNZXRob2RcblxuICAgICAgICAgIC8vIElmICdmaWx0ZXJBbGwnIGlzIHNldCB0byB0cnVlLCBwYXNzIHRoZSBlbnRpcmUgZGF0YXNldCB0byB0aGUgZmlsdGVyIG1ldGhvZFxuICAgICAgICAgIGlmIChjb2x1bW4uZmlsdGVyQWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyTWV0aG9kKG5leHRGaWx0ZXIsIGZpbHRlcmVkU29GYXIsIGNvbHVtbilcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZpbHRlcmVkU29GYXIuZmlsdGVyKHJvdyA9PiBmaWx0ZXJNZXRob2QobmV4dEZpbHRlciwgcm93LCBjb2x1bW4pKVxuICAgICAgICB9LCBmaWx0ZXJlZERhdGEpXG5cbiAgICAgICAgLy8gQXBwbHkgdGhlIGZpbHRlciB0byB0aGUgc3Vicm93cyBpZiB3ZSBhcmUgcGl2b3RpbmcsIGFuZCB0aGVuXG4gICAgICAgIC8vIGZpbHRlciBhbnkgcm93cyB3aXRob3V0IHN1YmNvbHVtbnMgYmVjYXVzZSBpdCB3b3VsZCBiZSBzdHJhbmdlIHRvIHNob3dcbiAgICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyZWREYXRhXG4gICAgICAgICAgLm1hcChyb3cgPT4ge1xuICAgICAgICAgICAgaWYgKCFyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSkge1xuICAgICAgICAgICAgICByZXR1cm4gcm93XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5yb3csXG4gICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN1YlJvd3NLZXldOiB0aGlzLmZpbHRlckRhdGEoXG4gICAgICAgICAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0sXG4gICAgICAgICAgICAgICAgZmlsdGVyZWQsXG4gICAgICAgICAgICAgICAgZGVmYXVsdEZpbHRlck1ldGhvZCxcbiAgICAgICAgICAgICAgICBhbGxWaXNpYmxlQ29sdW1uc1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihyb3cgPT4ge1xuICAgICAgICAgICAgaWYgKCFyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLmxlbmd0aCA+IDBcbiAgICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmlsdGVyZWREYXRhXG4gICAgfVxuXG4gICAgc29ydERhdGEgKGRhdGEsIHNvcnRlZCwgc29ydE1ldGhvZHNCeUNvbHVtbklEID0ge30pIHtcbiAgICAgIGlmICghc29ydGVkLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3J0ZWREYXRhID0gKHRoaXMucHJvcHMub3JkZXJCeU1ldGhvZCB8fCBfLm9yZGVyQnkpKFxuICAgICAgICBkYXRhLFxuICAgICAgICBzb3J0ZWQubWFwKHNvcnQgPT4ge1xuICAgICAgICAgIC8vIFN1cHBvcnQgY3VzdG9tIHNvcnRpbmcgbWV0aG9kcyBmb3IgZWFjaCBjb2x1bW5cbiAgICAgICAgICBpZiAoc29ydE1ldGhvZHNCeUNvbHVtbklEW3NvcnQuaWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gKGEsIGIpID0+IHNvcnRNZXRob2RzQnlDb2x1bW5JRFtzb3J0LmlkXShhW3NvcnQuaWRdLCBiW3NvcnQuaWRdLCBzb3J0LmRlc2MpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoYSwgYikgPT4gdGhpcy5wcm9wcy5kZWZhdWx0U29ydE1ldGhvZChhW3NvcnQuaWRdLCBiW3NvcnQuaWRdLCBzb3J0LmRlc2MpXG4gICAgICAgIH0pLFxuICAgICAgICBzb3J0ZWQubWFwKGQgPT4gIWQuZGVzYyksXG4gICAgICAgIHRoaXMucHJvcHMuaW5kZXhLZXlcbiAgICAgIClcblxuICAgICAgc29ydGVkRGF0YS5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICByb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSA9IHRoaXMuc29ydERhdGEoXG4gICAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0sXG4gICAgICAgICAgc29ydGVkLFxuICAgICAgICAgIHNvcnRNZXRob2RzQnlDb2x1bW5JRFxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gc29ydGVkRGF0YVxuICAgIH1cblxuICAgIGdldE1pblJvd3MgKCkge1xuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMucHJvcHMubWluUm93cywgdGhpcy5nZXRTdGF0ZU9yUHJvcCgncGFnZVNpemUnKSlcbiAgICB9XG5cbiAgICAvLyBVc2VyIGFjdGlvbnNcbiAgICBvblBhZ2VDaGFuZ2UgKHBhZ2UpIHtcbiAgICAgIGNvbnN0IHsgb25QYWdlQ2hhbmdlLCBjb2xsYXBzZU9uUGFnZUNoYW5nZSB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHsgcGFnZSB9XG4gICAgICBpZiAoY29sbGFwc2VPblBhZ2VDaGFuZ2UpIHtcbiAgICAgICAgbmV3U3RhdGUuZXhwYW5kZWQgPSB7fVxuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKG5ld1N0YXRlLCAoKSA9PiBvblBhZ2VDaGFuZ2UgJiYgb25QYWdlQ2hhbmdlKHBhZ2UpKVxuICAgIH1cblxuICAgIG9uUGFnZVNpemVDaGFuZ2UgKG5ld1BhZ2VTaXplKSB7XG4gICAgICBjb25zdCB7IG9uUGFnZVNpemVDaGFuZ2UgfSA9IHRoaXMucHJvcHNcbiAgICAgIGNvbnN0IHsgcGFnZVNpemUsIHBhZ2UgfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG5cbiAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgcGFnZSB0byBkaXNwbGF5XG4gICAgICBjb25zdCBjdXJyZW50Um93ID0gcGFnZVNpemUgKiBwYWdlXG4gICAgICBjb25zdCBuZXdQYWdlID0gTWF0aC5mbG9vcihjdXJyZW50Um93IC8gbmV3UGFnZVNpemUpXG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VTaXplOiBuZXdQYWdlU2l6ZSxcbiAgICAgICAgICBwYWdlOiBuZXdQYWdlLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiBvblBhZ2VTaXplQ2hhbmdlICYmIG9uUGFnZVNpemVDaGFuZ2UobmV3UGFnZVNpemUsIG5ld1BhZ2UpXG4gICAgICApXG4gICAgfVxuXG4gICAgc29ydENvbHVtbiAoY29sdW1uLCBhZGRpdGl2ZSkge1xuICAgICAgY29uc3QgeyBzb3J0ZWQsIHNraXBOZXh0U29ydCwgZGVmYXVsdFNvcnREZXNjIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuXG4gICAgICBjb25zdCBmaXJzdFNvcnREaXJlY3Rpb24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29sdW1uLCAnZGVmYXVsdFNvcnREZXNjJylcbiAgICAgICAgPyBjb2x1bW4uZGVmYXVsdFNvcnREZXNjXG4gICAgICAgIDogZGVmYXVsdFNvcnREZXNjXG4gICAgICBjb25zdCBzZWNvbmRTb3J0RGlyZWN0aW9uID0gIWZpcnN0U29ydERpcmVjdGlvblxuXG4gICAgICAvLyB3ZSBjYW4ndCBzdG9wIGV2ZW50IHByb3BhZ2F0aW9uIGZyb20gdGhlIGNvbHVtbiByZXNpemUgbW92ZSBoYW5kbGVyc1xuICAgICAgLy8gYXR0YWNoZWQgdG8gdGhlIGRvY3VtZW50IGJlY2F1c2Ugb2YgcmVhY3QncyBzeW50aGV0aWMgZXZlbnRzXG4gICAgICAvLyBzbyB3ZSBoYXZlIHRvIHByZXZlbnQgdGhlIHNvcnQgZnVuY3Rpb24gZnJvbSBhY3R1YWxseSBzb3J0aW5nXG4gICAgICAvLyBpZiB3ZSBjbGljayBvbiB0aGUgY29sdW1uIHJlc2l6ZSBlbGVtZW50IHdpdGhpbiBhIGhlYWRlci5cbiAgICAgIGlmIChza2lwTmV4dFNvcnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcbiAgICAgICAgICBza2lwTmV4dFNvcnQ6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBvblNvcnRlZENoYW5nZSB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICBsZXQgbmV3U29ydGVkID0gXy5jbG9uZShzb3J0ZWQgfHwgW10pLm1hcChkID0+IHtcbiAgICAgICAgZC5kZXNjID0gXy5pc1NvcnRpbmdEZXNjKGQpXG4gICAgICAgIHJldHVybiBkXG4gICAgICB9KVxuICAgICAgaWYgKCFfLmlzQXJyYXkoY29sdW1uKSkge1xuICAgICAgICAvLyBTaW5nbGUtU29ydFxuICAgICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGVkLmZpbmRJbmRleChkID0+IGQuaWQgPT09IGNvbHVtbi5pZClcbiAgICAgICAgaWYgKGV4aXN0aW5nSW5kZXggPiAtMSkge1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3U29ydGVkW2V4aXN0aW5nSW5kZXhdXG4gICAgICAgICAgaWYgKGV4aXN0aW5nLmRlc2MgPT09IHNlY29uZFNvcnREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgICAgICBuZXdTb3J0ZWQuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIDEpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBleGlzdGluZy5kZXNjID0gZmlyc3RTb3J0RGlyZWN0aW9uXG4gICAgICAgICAgICAgIG5ld1NvcnRlZCA9IFtleGlzdGluZ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhpc3RpbmcuZGVzYyA9IHNlY29uZFNvcnREaXJlY3Rpb25cbiAgICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkID0gW2V4aXN0aW5nXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgIG5ld1NvcnRlZC5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICBkZXNjOiBmaXJzdFNvcnREaXJlY3Rpb24sXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdTb3J0ZWQgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNdWx0aS1Tb3J0XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBuZXdTb3J0ZWQuZmluZEluZGV4KGQgPT4gZC5pZCA9PT0gY29sdW1uWzBdLmlkKVxuICAgICAgICAvLyBFeGlzdGluZyBTb3J0ZWQgQ29sdW1uXG4gICAgICAgIGlmIChleGlzdGluZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRlZFtleGlzdGluZ0luZGV4XVxuICAgICAgICAgIGlmIChleGlzdGluZy5kZXNjID09PSBzZWNvbmRTb3J0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkLnNwbGljZShleGlzdGluZ0luZGV4LCBjb2x1bW4ubGVuZ3RoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29sdW1uLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBuZXdTb3J0ZWRbZXhpc3RpbmdJbmRleCArIGldLmRlc2MgPSBmaXJzdFNvcnREaXJlY3Rpb25cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sdW1uLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkW2V4aXN0aW5nSW5kZXggKyBpXS5kZXNjID0gc2Vjb25kU29ydERpcmVjdGlvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFhZGRpdGl2ZSkge1xuICAgICAgICAgICAgbmV3U29ydGVkID0gbmV3U29ydGVkLnNsaWNlKGV4aXN0aW5nSW5kZXgsIGNvbHVtbi5sZW5ndGgpXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE5ldyBTb3J0IENvbHVtblxuICAgICAgICB9IGVsc2UgaWYgKGFkZGl0aXZlKSB7XG4gICAgICAgICAgbmV3U29ydGVkID0gbmV3U29ydGVkLmNvbmNhdChcbiAgICAgICAgICAgIGNvbHVtbi5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgICAgICAgZGVzYzogZmlyc3RTb3J0RGlyZWN0aW9uLFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1NvcnRlZCA9IGNvbHVtbi5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgICAgICBkZXNjOiBmaXJzdFNvcnREaXJlY3Rpb24sXG4gICAgICAgICAgfSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZTogKCFzb3J0ZWQubGVuZ3RoICYmIG5ld1NvcnRlZC5sZW5ndGgpIHx8ICFhZGRpdGl2ZSA/IDAgOiB0aGlzLnN0YXRlLnBhZ2UsXG4gICAgICAgICAgc29ydGVkOiBuZXdTb3J0ZWQsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IG9uU29ydGVkQ2hhbmdlICYmIG9uU29ydGVkQ2hhbmdlKG5ld1NvcnRlZCwgY29sdW1uLCBhZGRpdGl2ZSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBmaWx0ZXJDb2x1bW4gKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgIGNvbnN0IHsgZmlsdGVyZWQgfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG4gICAgICBjb25zdCB7IG9uRmlsdGVyZWRDaGFuZ2UgfSA9IHRoaXMucHJvcHNcblxuICAgICAgLy8gUmVtb3ZlIG9sZCBmaWx0ZXIgZmlyc3QgaWYgaXQgZXhpc3RzXG4gICAgICBjb25zdCBuZXdGaWx0ZXJpbmcgPSAoZmlsdGVyZWQgfHwgW10pLmZpbHRlcih4ID0+IHguaWQgIT09IGNvbHVtbi5pZClcblxuICAgICAgaWYgKHZhbHVlICE9PSAnJykge1xuICAgICAgICBuZXdGaWx0ZXJpbmcucHVzaCh7XG4gICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgZmlsdGVyZWQ6IG5ld0ZpbHRlcmluZyxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gb25GaWx0ZXJlZENoYW5nZSAmJiBvbkZpbHRlcmVkQ2hhbmdlKG5ld0ZpbHRlcmluZywgY29sdW1uLCB2YWx1ZSlcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXNpemVDb2x1bW5TdGFydCAoZXZlbnQsIGNvbHVtbiwgaXNUb3VjaCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IHBhcmVudFdpZHRoID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcblxuICAgICAgbGV0IHBhZ2VYXG4gICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICBwYWdlWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWdlWCA9IGV2ZW50LnBhZ2VYXG4gICAgICB9XG5cbiAgICAgIHRoaXMudHJhcEV2ZW50cyA9IHRydWVcbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIGN1cnJlbnRseVJlc2l6aW5nOiB7XG4gICAgICAgICAgICBpZDogY29sdW1uLmlkLFxuICAgICAgICAgICAgc3RhcnRYOiBwYWdlWCxcbiAgICAgICAgICAgIHBhcmVudFdpZHRoLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uTW92aW5nIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IHsgb25SZXNpemVkQ2hhbmdlLCBjb2x1bW4gfSA9IHRoaXMucHJvcHNcbiAgICAgIGNvbnN0IHsgcmVzaXplZCwgY3VycmVudGx5UmVzaXppbmcsIGNvbHVtbnMgfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG4gICAgICBjb25zdCBjdXJyZW50Q29sdW1uID0gY29sdW1ucy5maW5kKGMgPT4gYy5hY2Nlc3NvciA9PT0gY3VycmVudGx5UmVzaXppbmcuaWQpXG4gICAgICBjb25zdCBtaW5SZXNpemVXaWR0aCA9IGN1cnJlbnRDb2x1bW4gPyBjdXJyZW50Q29sdW1uLm1pblJlc2l6ZVdpZHRoIDogY29sdW1uLm1pblJlc2l6ZVdpZHRoXG5cbiAgICAgIC8vIERlbGV0ZSBvbGQgdmFsdWVcbiAgICAgIGNvbnN0IG5ld1Jlc2l6ZWQgPSByZXNpemVkLmZpbHRlcih4ID0+IHguaWQgIT09IGN1cnJlbnRseVJlc2l6aW5nLmlkKVxuXG4gICAgICBsZXQgcGFnZVhcblxuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlbW92ZScpIHtcbiAgICAgICAgcGFnZVggPSBldmVudC5wYWdlWFxuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdXaWR0aCA9IE1hdGgubWF4KFxuICAgICAgICBjdXJyZW50bHlSZXNpemluZy5wYXJlbnRXaWR0aCArIHBhZ2VYIC0gY3VycmVudGx5UmVzaXppbmcuc3RhcnRYLFxuICAgICAgICBtaW5SZXNpemVXaWR0aFxuICAgICAgKVxuXG4gICAgICBuZXdSZXNpemVkLnB1c2goe1xuICAgICAgICBpZDogY3VycmVudGx5UmVzaXppbmcuaWQsXG4gICAgICAgIHZhbHVlOiBuZXdXaWR0aCxcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIHJlc2l6ZWQ6IG5ld1Jlc2l6ZWQsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IG9uUmVzaXplZENoYW5nZSAmJiBvblJlc2l6ZWRDaGFuZ2UobmV3UmVzaXplZCwgZXZlbnQpXG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uRW5kIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IGlzVG91Y2ggPSBldmVudC50eXBlID09PSAndG91Y2hlbmQnIHx8IGV2ZW50LnR5cGUgPT09ICd0b3VjaGNhbmNlbCdcblxuICAgICAgaWYgKGlzVG91Y2gpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICB9XG5cbiAgICAgIC8vIElmIGl0cyBhIHRvdWNoIGV2ZW50IGNsZWFyIHRoZSBtb3VzZSBvbmUncyBhcyB3ZWxsIGJlY2F1c2Ugc29tZXRpbWVzXG4gICAgICAvLyB0aGUgbW91c2VEb3duIGV2ZW50IGdldHMgY2FsbGVkIGFzIHdlbGwsIGJ1dCB0aGUgbW91c2VVcCBldmVudCBkb2Vzbid0XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcblxuICAgICAgLy8gVGhlIHRvdWNoIGV2ZW50cyBkb24ndCBwcm9wYWdhdGUgdXAgdG8gdGhlIHNvcnRpbmcncyBvbk1vdXNlRG93biBldmVudCBzb1xuICAgICAgLy8gbm8gbmVlZCB0byBwcmV2ZW50IGl0IGZyb20gaGFwcGVuaW5nIG9yIGVsc2UgdGhlIGZpcnN0IGNsaWNrIGFmdGVyIGEgdG91Y2hcbiAgICAgIC8vIGV2ZW50IHJlc2l6ZSB3aWxsIG5vdCBzb3J0IHRoZSBjb2x1bW4uXG4gICAgICBpZiAoIWlzVG91Y2gpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcbiAgICAgICAgICBza2lwTmV4dFNvcnQ6IHRydWUsXG4gICAgICAgICAgY3VycmVudGx5UmVzaXppbmc6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19

/***/ }),

/***/ "./node_modules/react-table/es/pagination.js":
/*!***************************************************!*\
  !*** ./node_modules/react-table/es/pagination.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var defaultButton = function defaultButton(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    'button',
    _extends({ type: 'button' }, props, { className: '-btn' }),
    props.children
  );
};

var ReactTablePagination = function (_Component) {
  _inherits(ReactTablePagination, _Component);

  function ReactTablePagination(props) {
    _classCallCheck(this, ReactTablePagination);

    var _this = _possibleConstructorReturn(this, (ReactTablePagination.__proto__ || Object.getPrototypeOf(ReactTablePagination)).call(this, props));

    _this.getSafePage = _this.getSafePage.bind(_this);
    _this.changePage = _this.changePage.bind(_this);
    _this.applyPage = _this.applyPage.bind(_this);

    _this.state = {
      page: props.page
    };
    return _this;
  }

  _createClass(ReactTablePagination, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.page !== nextProps.page) {
        this.setState({ page: nextProps.page });
      }
    }
  }, {
    key: 'getSafePage',
    value: function getSafePage(page) {
      if (Number.isNaN(page)) {
        page = this.props.page;
      }
      return Math.min(Math.max(page, 0), this.props.pages - 1);
    }
  }, {
    key: 'changePage',
    value: function changePage(page) {
      page = this.getSafePage(page);
      this.setState({ page: page });
      if (this.props.page !== page) {
        this.props.onPageChange(page);
      }
    }
  }, {
    key: 'applyPage',
    value: function applyPage(e) {
      if (e) {
        e.preventDefault();
      }
      var page = this.state.page;
      this.changePage(page === '' ? this.props.page : page);
    }
  }, {
    key: 'getPageJumpProperties',
    value: function getPageJumpProperties() {
      var _this2 = this;

      return {
        onKeyPress: function onKeyPress(e) {
          if (e.which === 13 || e.keyCode === 13) {
            _this2.applyPage();
          }
        },
        onBlur: this.applyPage,
        value: this.state.page === '' ? '' : this.state.page + 1,
        onChange: function onChange(e) {
          var val = e.target.value;
          var page = val - 1;
          if (val === '') {
            return _this2.setState({ page: val });
          }
          _this2.setState({ page: _this2.getSafePage(page) });
        },
        inputType: this.state.page === '' ? 'text' : 'number',
        pageJumpText: this.props.pageJumpText
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          pages = _props.pages,
          page = _props.page,
          showPageSizeOptions = _props.showPageSizeOptions,
          pageSizeOptions = _props.pageSizeOptions,
          pageSize = _props.pageSize,
          showPageJump = _props.showPageJump,
          canPrevious = _props.canPrevious,
          canNext = _props.canNext,
          onPageSizeChange = _props.onPageSizeChange,
          className = _props.className,
          PreviousComponent = _props.PreviousComponent,
          NextComponent = _props.NextComponent,
          renderPageJump = _props.renderPageJump,
          renderCurrentPage = _props.renderCurrentPage,
          renderTotalPagesCount = _props.renderTotalPagesCount,
          renderPageSizeOptions = _props.renderPageSizeOptions;


      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'div',
        { className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(className, '-pagination'), style: this.props.style },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'div',
          { className: '-previous' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            PreviousComponent,
            {
              onClick: function onClick() {
                if (!canPrevious) return;
                _this3.changePage(page - 1);
              },
              disabled: !canPrevious
            },
            this.props.previousText
          )
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'div',
          { className: '-center' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            'span',
            { className: '-pageInfo' },
            this.props.pageText,
            ' ',
            showPageJump ? renderPageJump(this.getPageJumpProperties()) : renderCurrentPage(page),
            ' ',
            this.props.ofText,
            ' ',
            renderTotalPagesCount(pages)
          ),
          showPageSizeOptions && renderPageSizeOptions({
            pageSize: pageSize,
            rowsSelectorText: this.props.rowsSelectorText,
            pageSizeOptions: pageSizeOptions,
            onPageSizeChange: onPageSizeChange,
            rowsText: this.props.rowsText
          })
        ),
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          'div',
          { className: '-next' },
          react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
            NextComponent,
            {
              onClick: function onClick() {
                if (!canNext) return;
                _this3.changePage(page + 1);
              },
              disabled: !canNext
            },
            this.props.nextText
          )
        )
      );
    }
  }]);

  return ReactTablePagination;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ReactTablePagination.defaultProps = {
  PreviousComponent: defaultButton,
  NextComponent: defaultButton,
  renderPageJump: function renderPageJump(_ref) {
    var onChange = _ref.onChange,
        value = _ref.value,
        onBlur = _ref.onBlur,
        onKeyPress = _ref.onKeyPress,
        inputType = _ref.inputType,
        pageJumpText = _ref.pageJumpText;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      { className: '-pageJump' },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement('input', {
        'aria-label': pageJumpText,
        type: inputType,
        onChange: onChange,
        value: value,
        onBlur: onBlur,
        onKeyPress: onKeyPress
      })
    );
  },
  renderCurrentPage: function renderCurrentPage(page) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'span',
      { className: '-currentPage' },
      page + 1
    );
  },
  renderTotalPagesCount: function renderTotalPagesCount(pages) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'span',
      { className: '-totalPages' },
      pages || 1
    );
  },
  renderPageSizeOptions: function renderPageSizeOptions(_ref2) {
    var pageSize = _ref2.pageSize,
        pageSizeOptions = _ref2.pageSizeOptions,
        rowsSelectorText = _ref2.rowsSelectorText,
        onPageSizeChange = _ref2.onPageSizeChange,
        rowsText = _ref2.rowsText;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'span',
      { className: 'select-wrap -pageSizeOptions' },
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        'select',
        {
          'aria-label': rowsSelectorText,
          onChange: function onChange(e) {
            return onPageSizeChange(Number(e.target.value));
          },
          value: pageSize
        },
        pageSizeOptions.map(function (option, i) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
              'option',
              { key: i, value: option },
              option + ' ' + rowsText
            )
          );
        })
      )
    );
  }
};
/* harmony default export */ __webpack_exports__["default"] = (ReactTablePagination);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wYWdpbmF0aW9uLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiY2xhc3NuYW1lcyIsImRlZmF1bHRCdXR0b24iLCJwcm9wcyIsImNoaWxkcmVuIiwiUmVhY3RUYWJsZVBhZ2luYXRpb24iLCJnZXRTYWZlUGFnZSIsImJpbmQiLCJjaGFuZ2VQYWdlIiwiYXBwbHlQYWdlIiwic3RhdGUiLCJwYWdlIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJOdW1iZXIiLCJpc05hTiIsIk1hdGgiLCJtaW4iLCJtYXgiLCJwYWdlcyIsIm9uUGFnZUNoYW5nZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIm9uS2V5UHJlc3MiLCJ3aGljaCIsImtleUNvZGUiLCJvbkJsdXIiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwidmFsIiwidGFyZ2V0IiwiaW5wdXRUeXBlIiwicGFnZUp1bXBUZXh0Iiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplIiwic2hvd1BhZ2VKdW1wIiwiY2FuUHJldmlvdXMiLCJjYW5OZXh0Iiwib25QYWdlU2l6ZUNoYW5nZSIsImNsYXNzTmFtZSIsIlByZXZpb3VzQ29tcG9uZW50IiwiTmV4dENvbXBvbmVudCIsInJlbmRlclBhZ2VKdW1wIiwicmVuZGVyQ3VycmVudFBhZ2UiLCJyZW5kZXJUb3RhbFBhZ2VzQ291bnQiLCJyZW5kZXJQYWdlU2l6ZU9wdGlvbnMiLCJzdHlsZSIsInByZXZpb3VzVGV4dCIsInBhZ2VUZXh0IiwiZ2V0UGFnZUp1bXBQcm9wZXJ0aWVzIiwib2ZUZXh0Iiwicm93c1NlbGVjdG9yVGV4dCIsInJvd3NUZXh0IiwibmV4dFRleHQiLCJkZWZhdWx0UHJvcHMiLCJtYXAiLCJvcHRpb24iLCJpIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxJQUFnQkMsU0FBaEIsUUFBaUMsT0FBakM7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCOztBQUVBLElBQU1D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RSxvQkFBWUg7QUFOZDtBQURGLEtBSGM7QUFBQSxHQUhJO0FBaUJwQnFCLHFCQUFtQjtBQUFBLFdBQVE7QUFBQTtBQUFBLFFBQU0sV0FBVSxjQUFoQjtBQUFnQ2pDLGFBQU87QUFBdkMsS0FBUjtBQUFBLEdBakJDO0FBa0JwQmtDLHlCQUF1QjtBQUFBLFdBQVM7QUFBQTtBQUFBLFFBQU0sV0FBVSxhQUFoQjtBQUErQjFCLGVBQVM7QUFBeEMsS0FBVDtBQUFBLEdBbEJIO0FBbUJwQjJCLHlCQUF1QjtBQUFBLFFBQ3JCWCxRQURxQixTQUNyQkEsUUFEcUI7QUFBQSxRQUVyQkQsZUFGcUIsU0FFckJBLGVBRnFCO0FBQUEsUUFHckJrQixnQkFIcUIsU0FHckJBLGdCQUhxQjtBQUFBLFFBSXJCYixnQkFKcUIsU0FJckJBLGdCQUpxQjtBQUFBLFFBS3JCYyxRQUxxQixTQUtyQkEsUUFMcUI7QUFBQSxXQU9yQjtBQUFBO0FBQUEsUUFBTSxXQUFVLDhCQUFoQjtBQUNFO0FBQUE7QUFBQTtBQUNFLHdCQUFZRCxnQkFEZDtBQUVFLG9CQUFVO0FBQUEsbUJBQUtiLGlCQUFpQnpCLE9BQU9PLEVBQUVTLE1BQUYsQ0FBU0gsS0FBaEIsQ0FBakIsQ0FBTDtBQUFBLFdBRlo7QUFHRSxpQkFBT1E7QUFIVDtBQUtHRCx3QkFBZ0JzQixHQUFoQixDQUFvQixVQUFDQyxNQUFELEVBQVNDLENBQVQ7QUFBQTtBQUNuQjtBQUNBO0FBQUE7QUFBQSxnQkFBUSxLQUFLQSxDQUFiLEVBQWdCLE9BQU9ELE1BQXZCO0FBQ01BLG9CQUROLFNBQ2dCSjtBQURoQjtBQUZtQjtBQUFBLFNBQXBCO0FBTEg7QUFERixLQVBxQjtBQUFBO0FBbkJILEM7ZUFESGhELG9CIiwiZmlsZSI6InBhZ2luYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuXG5jb25zdCBkZWZhdWx0QnV0dG9uID0gcHJvcHMgPT4gKFxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB7Li4ucHJvcHN9IGNsYXNzTmFtZT1cIi1idG5cIj5cbiAgICB7cHJvcHMuY2hpbGRyZW59XG4gIDwvYnV0dG9uPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFjdFRhYmxlUGFnaW5hdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgUHJldmlvdXNDb21wb25lbnQ6IGRlZmF1bHRCdXR0b24sXG4gICAgTmV4dENvbXBvbmVudDogZGVmYXVsdEJ1dHRvbixcbiAgICByZW5kZXJQYWdlSnVtcDogKHtcbiAgICAgIG9uQ2hhbmdlLCB2YWx1ZSwgb25CbHVyLCBvbktleVByZXNzLCBpbnB1dFR5cGUsIHBhZ2VKdW1wVGV4dCxcbiAgICB9KSA9PiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIi1wYWdlSnVtcFwiPlxuICAgICAgICA8aW5wdXRcbiAgICAgICAgICBhcmlhLWxhYmVsPXtwYWdlSnVtcFRleHR9XG4gICAgICAgICAgdHlwZT17aW5wdXRUeXBlfVxuICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgb25CbHVyPXtvbkJsdXJ9XG4gICAgICAgICAgb25LZXlQcmVzcz17b25LZXlQcmVzc31cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICksXG4gICAgcmVuZGVyQ3VycmVudFBhZ2U6IHBhZ2UgPT4gPHNwYW4gY2xhc3NOYW1lPVwiLWN1cnJlbnRQYWdlXCI+e3BhZ2UgKyAxfTwvc3Bhbj4sXG4gICAgcmVuZGVyVG90YWxQYWdlc0NvdW50OiBwYWdlcyA9PiA8c3BhbiBjbGFzc05hbWU9XCItdG90YWxQYWdlc1wiPntwYWdlcyB8fCAxfTwvc3Bhbj4sXG4gICAgcmVuZGVyUGFnZVNpemVPcHRpb25zOiAoe1xuICAgICAgcGFnZVNpemUsXG4gICAgICBwYWdlU2l6ZU9wdGlvbnMsXG4gICAgICByb3dzU2VsZWN0b3JUZXh0LFxuICAgICAgb25QYWdlU2l6ZUNoYW5nZSxcbiAgICAgIHJvd3NUZXh0LFxuICAgIH0pID0+IChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInNlbGVjdC13cmFwIC1wYWdlU2l6ZU9wdGlvbnNcIj5cbiAgICAgICAgPHNlbGVjdFxuICAgICAgICAgIGFyaWEtbGFiZWw9e3Jvd3NTZWxlY3RvclRleHR9XG4gICAgICAgICAgb25DaGFuZ2U9e2UgPT4gb25QYWdlU2l6ZUNoYW5nZShOdW1iZXIoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgICB2YWx1ZT17cGFnZVNpemV9XG4gICAgICAgID5cbiAgICAgICAgICB7cGFnZVNpemVPcHRpb25zLm1hcCgob3B0aW9uLCBpKSA9PiAoXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5XG4gICAgICAgICAgICA8b3B0aW9uIGtleT17aX0gdmFsdWU9e29wdGlvbn0+XG4gICAgICAgICAgICAgIHtgJHtvcHRpb259ICR7cm93c1RleHR9YH1cbiAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvc3Bhbj5cbiAgICApLFxuICB9XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG5cbiAgICB0aGlzLmdldFNhZmVQYWdlID0gdGhpcy5nZXRTYWZlUGFnZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5jaGFuZ2VQYWdlID0gdGhpcy5jaGFuZ2VQYWdlLmJpbmQodGhpcylcbiAgICB0aGlzLmFwcGx5UGFnZSA9IHRoaXMuYXBwbHlQYWdlLmJpbmQodGhpcylcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBwYWdlOiBwcm9wcy5wYWdlLFxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgKG5leHRQcm9wcykge1xuICAgIGlmICh0aGlzLnByb3BzLnBhZ2UgIT09IG5leHRQcm9wcy5wYWdlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgcGFnZTogbmV4dFByb3BzLnBhZ2UgfSlcbiAgICB9XG4gIH1cblxuICBnZXRTYWZlUGFnZSAocGFnZSkge1xuICAgIGlmIChOdW1iZXIuaXNOYU4ocGFnZSkpIHtcbiAgICAgIHBhZ2UgPSB0aGlzLnByb3BzLnBhZ2VcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHBhZ2UsIDApLCB0aGlzLnByb3BzLnBhZ2VzIC0gMSlcbiAgfVxuXG4gIGNoYW5nZVBhZ2UgKHBhZ2UpIHtcbiAgICBwYWdlID0gdGhpcy5nZXRTYWZlUGFnZShwYWdlKVxuICAgIHRoaXMuc2V0U3RhdGUoeyBwYWdlIH0pXG4gICAgaWYgKHRoaXMucHJvcHMucGFnZSAhPT0gcGFnZSkge1xuICAgICAgdGhpcy5wcm9wcy5vblBhZ2VDaGFuZ2UocGFnZSlcbiAgICB9XG4gIH1cblxuICBhcHBseVBhZ2UgKGUpIHtcbiAgICBpZiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgfVxuICAgIGNvbnN0IHBhZ2UgPSB0aGlzLnN0YXRlLnBhZ2VcbiAgICB0aGlzLmNoYW5nZVBhZ2UocGFnZSA9PT0gJycgPyB0aGlzLnByb3BzLnBhZ2UgOiBwYWdlKVxuICB9XG5cbiAgZ2V0UGFnZUp1bXBQcm9wZXJ0aWVzICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb25LZXlQcmVzczogZSA9PiB7XG4gICAgICAgIGlmIChlLndoaWNoID09PSAxMyB8fCBlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgdGhpcy5hcHBseVBhZ2UoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25CbHVyOiB0aGlzLmFwcGx5UGFnZSxcbiAgICAgIHZhbHVlOiB0aGlzLnN0YXRlLnBhZ2UgPT09ICcnID8gJycgOiB0aGlzLnN0YXRlLnBhZ2UgKyAxLFxuICAgICAgb25DaGFuZ2U6IGUgPT4ge1xuICAgICAgICBjb25zdCB2YWwgPSBlLnRhcmdldC52YWx1ZVxuICAgICAgICBjb25zdCBwYWdlID0gdmFsIC0gMVxuICAgICAgICBpZiAodmFsID09PSAnJykge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHsgcGFnZTogdmFsIH0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhZ2U6IHRoaXMuZ2V0U2FmZVBhZ2UocGFnZSkgfSlcbiAgICAgIH0sXG4gICAgICBpbnB1dFR5cGU6IHRoaXMuc3RhdGUucGFnZSA9PT0gJycgPyAndGV4dCcgOiAnbnVtYmVyJyxcbiAgICAgIHBhZ2VKdW1wVGV4dDogdGhpcy5wcm9wcy5wYWdlSnVtcFRleHQsXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyICgpIHtcbiAgICBjb25zdCB7XG4gICAgICAvLyBDb21wdXRlZFxuICAgICAgcGFnZXMsXG4gICAgICAvLyBQcm9wc1xuICAgICAgcGFnZSxcbiAgICAgIHNob3dQYWdlU2l6ZU9wdGlvbnMsXG4gICAgICBwYWdlU2l6ZU9wdGlvbnMsXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHNob3dQYWdlSnVtcCxcbiAgICAgIGNhblByZXZpb3VzLFxuICAgICAgY2FuTmV4dCxcbiAgICAgIG9uUGFnZVNpemVDaGFuZ2UsXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBQcmV2aW91c0NvbXBvbmVudCxcbiAgICAgIE5leHRDb21wb25lbnQsXG4gICAgICByZW5kZXJQYWdlSnVtcCxcbiAgICAgIHJlbmRlckN1cnJlbnRQYWdlLFxuICAgICAgcmVuZGVyVG90YWxQYWdlc0NvdW50LFxuICAgICAgcmVuZGVyUGFnZVNpemVPcHRpb25zLFxuICAgIH0gPSB0aGlzLnByb3BzXG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzbmFtZXMoY2xhc3NOYW1lLCAnLXBhZ2luYXRpb24nKX0gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIi1wcmV2aW91c1wiPlxuICAgICAgICAgIDxQcmV2aW91c0NvbXBvbmVudFxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWNhblByZXZpb3VzKSByZXR1cm5cbiAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgLSAxKVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshY2FuUHJldmlvdXN9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoaXMucHJvcHMucHJldmlvdXNUZXh0fVxuICAgICAgICAgIDwvUHJldmlvdXNDb21wb25lbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIi1jZW50ZXJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCItcGFnZUluZm9cIj5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLnBhZ2VUZXh0fXsnICd9XG4gICAgICAgICAgICB7c2hvd1BhZ2VKdW1wID8gcmVuZGVyUGFnZUp1bXAodGhpcy5nZXRQYWdlSnVtcFByb3BlcnRpZXMoKSkgOiByZW5kZXJDdXJyZW50UGFnZShwYWdlKX17JyAnfVxuICAgICAgICAgICAge3RoaXMucHJvcHMub2ZUZXh0fSB7cmVuZGVyVG90YWxQYWdlc0NvdW50KHBhZ2VzKX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAge3Nob3dQYWdlU2l6ZU9wdGlvbnMgJiZcbiAgICAgICAgICAgIHJlbmRlclBhZ2VTaXplT3B0aW9ucyh7XG4gICAgICAgICAgICAgIHBhZ2VTaXplLFxuICAgICAgICAgICAgICByb3dzU2VsZWN0b3JUZXh0OiB0aGlzLnByb3BzLnJvd3NTZWxlY3RvclRleHQsXG4gICAgICAgICAgICAgIHBhZ2VTaXplT3B0aW9ucyxcbiAgICAgICAgICAgICAgb25QYWdlU2l6ZUNoYW5nZSxcbiAgICAgICAgICAgICAgcm93c1RleHQ6IHRoaXMucHJvcHMucm93c1RleHQsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiLW5leHRcIj5cbiAgICAgICAgICA8TmV4dENvbXBvbmVudFxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWNhbk5leHQpIHJldHVyblxuICAgICAgICAgICAgICB0aGlzLmNoYW5nZVBhZ2UocGFnZSArIDEpXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFjYW5OZXh0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt0aGlzLnByb3BzLm5leHRUZXh0fVxuICAgICAgICAgIDwvTmV4dENvbXBvbmVudD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cbiJdfQ==

/***/ }),

/***/ "./node_modules/react-table/es/propTypes.js":
/*!**************************************************!*\
  !*** ./node_modules/react-table/es/propTypes.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);


/* harmony default export */ __webpack_exports__["default"] = ({
  // General
  data: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.any,
  loading: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showPagination: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showPaginationTop: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showPaginationBottom: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  showPageSizeOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  pageSizeOptions: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  defaultPageSize: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
  showPageJump: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  collapseOnSortingChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  collapseOnPageChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  collapseOnDataChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  freezeWhenExpanded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  sortable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  resizable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  filterable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  defaultSortDesc: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
  defaultSorted: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  defaultFiltered: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  defaultResized: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array,
  defaultExpanded: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
  defaultFilterMethod: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  defaultSortMethod: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,

  // Controlled State Callbacks
  onPageChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onPageSizeChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onSortedChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onFilteredChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onResizedChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  onExpandedChange: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,

  // Pivoting
  pivotBy: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.array,

  // Key Constants
  pivotValKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  pivotIDKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  subRowsKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  aggregatedKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  nestingLevelKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  originalKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  indexKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  groupedByPivotKey: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,

  // Server-side Callbacks
  onFetchData: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,

  // Classes
  className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
  style: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,

  // Component decorators
  getProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTableProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTheadGroupProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTheadGroupTrProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTheadGroupThProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTheadProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTheadTrProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTheadThProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTheadFilterProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTheadFilterTrProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTheadFilterThProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTbodyProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTrGroupProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTrProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTdProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTfootProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTfootTrProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getTfootTdProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getPaginationProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getLoadingProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getNoDataProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
  getResizerProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,

  // Global Column Defaults
  columns: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    // Renderers
    Cell: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func]),
    Header: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func]),
    Footer: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func]),
    Aggregated: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func]),
    Pivot: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func]),
    PivotValue: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func]),
    Expander: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func]),
    Filter: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func]),

    // All Columns
    sortable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool, // use table default
    resizable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool, // use table default
    filterable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool, // use table default
    show: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    minWidth: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,
    minResizeWidth: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number,

    // Cells only
    className: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    style: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
    getProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,

    // Pivot only
    aggregate: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,

    // Headers only
    headerClassName: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    headerStyle: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
    getHeaderProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,

    // Footers only
    footerClassName: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.string,
    footerStyle: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,
    getFooterProps: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
    filterMethod: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func,
    filterAll: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    sortMethod: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func
  })),

  // Global Expander Column Defaults
  expanderDefaults: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
    sortable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    resizable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    filterable: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.bool,
    width: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.number
  }),

  pivotDefaults: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.object,

  // Text
  previousText: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  nextText: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  loadingText: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  noDataText: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  pageText: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  ofText: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  rowsText: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  pageJumpText: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,
  rowsSelectorText: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.node,

  // Components
  TableComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  TheadComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  TbodyComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  TrGroupComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  TrComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  ThComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  TdComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  TfootComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  FilterComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  ExpanderComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  PivotValueComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  AggregatedComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  // this is a computed default generated using
  PivotComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  // the ExpanderComponent and PivotValueComponent at run-time in methods.js
  PaginationComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  PreviousComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  NextComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  LoadingComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  NoDataComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  ResizerComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element]),
  PadRowComponent: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func, prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.element])
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wcm9wVHlwZXMuanMiXSwibmFtZXMiOlsiUHJvcFR5cGVzIiwiZGF0YSIsImFueSIsImxvYWRpbmciLCJib29sIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwic2hvd1BhZ2VTaXplT3B0aW9ucyIsInBhZ2VTaXplT3B0aW9ucyIsImFycmF5IiwiZGVmYXVsdFBhZ2VTaXplIiwibnVtYmVyIiwic2hvd1BhZ2VKdW1wIiwiY29sbGFwc2VPblNvcnRpbmdDaGFuZ2UiLCJjb2xsYXBzZU9uUGFnZUNoYW5nZSIsImNvbGxhcHNlT25EYXRhQ2hhbmdlIiwiZnJlZXplV2hlbkV4cGFuZGVkIiwic29ydGFibGUiLCJyZXNpemFibGUiLCJmaWx0ZXJhYmxlIiwiZGVmYXVsdFNvcnREZXNjIiwiZGVmYXVsdFNvcnRlZCIsImRlZmF1bHRGaWx0ZXJlZCIsImRlZmF1bHRSZXNpemVkIiwiZGVmYXVsdEV4cGFuZGVkIiwib2JqZWN0IiwiZGVmYXVsdEZpbHRlck1ldGhvZCIsImZ1bmMiLCJkZWZhdWx0U29ydE1ldGhvZCIsIm9uUGFnZUNoYW5nZSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJvblNvcnRlZENoYW5nZSIsIm9uRmlsdGVyZWRDaGFuZ2UiLCJvblJlc2l6ZWRDaGFuZ2UiLCJvbkV4cGFuZGVkQ2hhbmdlIiwicGl2b3RCeSIsInBpdm90VmFsS2V5Iiwic3RyaW5nIiwicGl2b3RJREtleSIsInN1YlJvd3NLZXkiLCJhZ2dyZWdhdGVkS2V5IiwibmVzdGluZ0xldmVsS2V5Iiwib3JpZ2luYWxLZXkiLCJpbmRleEtleSIsImdyb3VwZWRCeVBpdm90S2V5Iiwib25GZXRjaERhdGEiLCJjbGFzc05hbWUiLCJzdHlsZSIsImdldFByb3BzIiwiZ2V0VGFibGVQcm9wcyIsImdldFRoZWFkR3JvdXBQcm9wcyIsImdldFRoZWFkR3JvdXBUclByb3BzIiwiZ2V0VGhlYWRHcm91cFRoUHJvcHMiLCJnZXRUaGVhZFByb3BzIiwiZ2V0VGhlYWRUclByb3BzIiwiZ2V0VGhlYWRUaFByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJQcm9wcyIsImdldFRoZWFkRmlsdGVyVHJQcm9wcyIsImdldFRoZWFkRmlsdGVyVGhQcm9wcyIsImdldFRib2R5UHJvcHMiLCJnZXRUckdyb3VwUHJvcHMiLCJnZXRUclByb3BzIiwiZ2V0VGRQcm9wcyIsImdldFRmb290UHJvcHMiLCJnZXRUZm9vdFRyUHJvcHMiLCJnZXRUZm9vdFRkUHJvcHMiLCJnZXRQYWdpbmF0aW9uUHJvcHMiLCJnZXRMb2FkaW5nUHJvcHMiLCJnZXROb0RhdGFQcm9wcyIsImdldFJlc2l6ZXJQcm9wcyIsImNvbHVtbnMiLCJhcnJheU9mIiwic2hhcGUiLCJDZWxsIiwib25lT2ZUeXBlIiwiZWxlbWVudCIsIkhlYWRlciIsIkZvb3RlciIsIkFnZ3JlZ2F0ZWQiLCJQaXZvdCIsIlBpdm90VmFsdWUiLCJFeHBhbmRlciIsIkZpbHRlciIsInNob3ciLCJtaW5XaWR0aCIsIm1pblJlc2l6ZVdpZHRoIiwiYWdncmVnYXRlIiwiaGVhZGVyQ2xhc3NOYW1lIiwiaGVhZGVyU3R5bGUiLCJnZXRIZWFkZXJQcm9wcyIsImZvb3RlckNsYXNzTmFtZSIsImZvb3RlclN0eWxlIiwiZ2V0Rm9vdGVyUHJvcHMiLCJmaWx0ZXJNZXRob2QiLCJmaWx0ZXJBbGwiLCJzb3J0TWV0aG9kIiwiZXhwYW5kZXJEZWZhdWx0cyIsIndpZHRoIiwicGl2b3REZWZhdWx0cyIsInByZXZpb3VzVGV4dCIsIm5vZGUiLCJuZXh0VGV4dCIsImxvYWRpbmdUZXh0Iiwibm9EYXRhVGV4dCIsInBhZ2VUZXh0Iiwib2ZUZXh0Iiwicm93c1RleHQiLCJwYWdlSnVtcFRleHQiLCJyb3dzU2VsZWN0b3JUZXh0IiwiVGFibGVDb21wb25lbnQiLCJUaGVhZENvbXBvbmVudCIsIlRib2R5Q29tcG9uZW50IiwiVHJHcm91cENvbXBvbmVudCIsIlRyQ29tcG9uZW50IiwiVGhDb21wb25lbnQiLCJUZENvbXBvbmVudCIsIlRmb290Q29tcG9uZW50IiwiRmlsdGVyQ29tcG9uZW50IiwiRXhwYW5kZXJDb21wb25lbnQiLCJQaXZvdFZhbHVlQ29tcG9uZW50IiwiQWdncmVnYXRlZENvbXBvbmVudCIsIlBpdm90Q29tcG9uZW50IiwiUGFnaW5hdGlvbkNvbXBvbmVudCIsIlByZXZpb3VzQ29tcG9uZW50IiwiTmV4dENvbXBvbmVudCIsIkxvYWRpbmdDb21wb25lbnQiLCJOb0RhdGFDb21wb25lbnQiLCJSZXNpemVyQ29tcG9uZW50IiwiUGFkUm93Q29tcG9uZW50Il0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxTQUFQLE1BQXNCLFlBQXRCOztBQUVBLGVBQWU7QUFDYjtBQUNBQyxRQUFNRCxVQUFVRSxHQUZIO0FBR2JDLFdBQVNILFVBQVVJLElBSE47QUFJYkMsa0JBQWdCTCxVQUFVSSxJQUpiO0FBS2JFLHFCQUFtQk4sVUFBVUksSUFMaEI7QUFNYkcsd0JBQXNCUCxVQUFVSSxJQU5uQjtBQU9iSSx1QkFBcUJSLFVBQVVJLElBUGxCO0FBUWJLLG1CQUFpQlQsVUFBVVUsS0FSZDtBQVNiQyxtQkFBaUJYLFVBQVVZLE1BVGQ7QUFVYkMsZ0JBQWNiLFVBQVVJLElBVlg7QUFXYlUsMkJBQXlCZCxVQUFVSSxJQVh0QjtBQVliVyx3QkFBc0JmLFVBQVVJLElBWm5CO0FBYWJZLHdCQUFzQmhCLFVBQVVJLElBYm5CO0FBY2JhLHNCQUFvQmpCLFVBQVVJLElBZGpCO0FBZWJjLFlBQVVsQixVQUFVSSxJQWZQO0FBZ0JiZSxhQUFXbkIsVUFBVUksSUFoQlI7QUFpQmJnQixjQUFZcEIsVUFBVUksSUFqQlQ7QUFrQmJpQixtQkFBaUJyQixVQUFVSSxJQWxCZDtBQW1CYmtCLGlCQUFldEIsVUFBVVUsS0FuQlo7QUFvQmJhLG1CQUFpQnZCLFVBQVVVLEtBcEJkO0FBcUJiYyxrQkFBZ0J4QixVQUFVVSxLQXJCYjtBQXNCYmUsbUJBQWlCekIsVUFBVTBCLE1BdEJkO0FBdUJiQyx1QkFBcUIzQixVQUFVNEIsSUF2QmxCO0FBd0JiQyxxQkFBbUI3QixVQUFV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QUEzQixDQUFwQixDQWpLRjtBQWtLYmtELG9CQUFrQjlILFVBQVUyRSxTQUFWLENBQW9CLENBQUMzRSxVQUFVNEIsSUFBWCxFQUFpQjVCLFVBQVU0RSxPQUEzQixDQUFwQixDQWxLTDtBQW1LYm1ELG1CQUFpQi9ILFVBQVUyRSxTQUFWLENBQW9CLENBQUMzRSxVQUFVNEIsSUFBWCxFQUFpQjVCLFVBQVU0RSxPQUEzQixDQUFwQixDQW5LSjtBQW9LYm9ELG9CQUFrQmhJLFVBQVUyRSxTQUFWLENBQW9CLENBQUMzRSxVQUFVNEIsSUFBWCxFQUFpQjVCLFVBQVU0RSxPQUEzQixDQUFwQixDQXBLTDtBQXFLYnFELG1CQUFpQmpJLFVBQVUyRSxTQUFWLENBQW9CLENBQUMzRSxVQUFVNEIsSUFBWCxFQUFpQjVCLFVBQVU0RSxPQUEzQixDQUFwQjtBQXJLSixDQUFmIiwiZmlsZSI6InByb3BUeXBlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBHZW5lcmFsXG4gIGRhdGE6IFByb3BUeXBlcy5hbnksXG4gIGxvYWRpbmc6IFByb3BUeXBlcy5ib29sLFxuICBzaG93UGFnaW5hdGlvbjogUHJvcFR5cGVzLmJvb2wsXG4gIHNob3dQYWdpbmF0aW9uVG9wOiBQcm9wVHlwZXMuYm9vbCxcbiAgc2hvd1BhZ2luYXRpb25Cb3R0b206IFByb3BUeXBlcy5ib29sLFxuICBzaG93UGFnZVNpemVPcHRpb25zOiBQcm9wVHlwZXMuYm9vbCxcbiAgcGFnZVNpemVPcHRpb25zOiBQcm9wVHlwZXMuYXJyYXksXG4gIGRlZmF1bHRQYWdlU2l6ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgc2hvd1BhZ2VKdW1wOiBQcm9wVHlwZXMuYm9vbCxcbiAgY29sbGFwc2VPblNvcnRpbmdDaGFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICBjb2xsYXBzZU9uUGFnZUNoYW5nZTogUHJvcFR5cGVzLmJvb2wsXG4gIGNvbGxhcHNlT25EYXRhQ2hhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgZnJlZXplV2hlbkV4cGFuZGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgc29ydGFibGU6IFByb3BUeXBlcy5ib29sLFxuICByZXNpemFibGU6IFByb3BUeXBlcy5ib29sLFxuICBmaWx0ZXJhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgZGVmYXVsdFNvcnREZXNjOiBQcm9wVHlwZXMuYm9vbCxcbiAgZGVmYXVsdFNvcnRlZDogUHJvcFR5cGVzLmFycmF5LFxuICBkZWZhdWx0RmlsdGVyZWQ6IFByb3BUeXBlcy5hcnJheSxcbiAgZGVmYXVsdFJlc2l6ZWQ6IFByb3BUeXBlcy5hcnJheSxcbiAgZGVmYXVsdEV4cGFuZGVkOiBQcm9wVHlwZXMub2JqZWN0LFxuICBkZWZhdWx0RmlsdGVyTWV0aG9kOiBQcm9wVHlwZXMuZnVuYyxcbiAgZGVmYXVsdFNvcnRNZXRob2Q6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8vIENvbnRyb2xsZWQgU3RhdGUgQ2FsbGJhY2tzXG4gIG9uUGFnZUNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uUGFnZVNpemVDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblNvcnRlZENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uRmlsdGVyZWRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBvblJlc2l6ZWRDaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBvbkV4cGFuZGVkQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvLyBQaXZvdGluZ1xuICBwaXZvdEJ5OiBQcm9wVHlwZXMuYXJyYXksXG5cbiAgLy8gS2V5IENvbnN0YW50c1xuICBwaXZvdFZhbEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgcGl2b3RJREtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgc3ViUm93c0tleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgYWdncmVnYXRlZEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgbmVzdGluZ0xldmVsS2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBvcmlnaW5hbEtleTogUHJvcFR5cGVzLnN0cmluZyxcbiAgaW5kZXhLZXk6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGdyb3VwZWRCeVBpdm90S2V5OiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gIC8vIFNlcnZlci1zaWRlIENhbGxiYWNrc1xuICBvbkZldGNoRGF0YTogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLy8gQ2xhc3Nlc1xuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuXG4gIC8vIENvbXBvbmVudCBkZWNvcmF0b3JzXG4gIGdldFByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGFibGVQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFRoZWFkR3JvdXBQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFRoZWFkR3JvdXBUclByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGhlYWRHcm91cFRoUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRUaGVhZFByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGhlYWRUclByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGhlYWRUaFByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGhlYWRGaWx0ZXJQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFRoZWFkRmlsdGVyVHJQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFRoZWFkRmlsdGVyVGhQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFRib2R5UHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRUckdyb3VwUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRUclByb3BzOiBQcm9wVHlwZXMuZnVuYyxcbiAgZ2V0VGRQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFRmb290UHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRUZm9vdFRyUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRUZm9vdFRkUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRQYWdpbmF0aW9uUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXRMb2FkaW5nUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICBnZXROb0RhdGFQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG4gIGdldFJlc2l6ZXJQcm9wczogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLy8gR2xvYmFsIENvbHVtbiBEZWZhdWx0c1xuICBjb2x1bW5zOiBQcm9wVHlwZXMuYXJyYXlPZihcbiAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgLy8gUmVuZGVyZXJzXG4gICAgICBDZWxsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICAgIEhlYWRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgICBGb290ZXI6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5lbGVtZW50LCBQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZnVuY10pLFxuICAgICAgQWdncmVnYXRlZDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgICBQaXZvdDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5zdHJpbmcsIFByb3BUeXBlcy5mdW5jXSksXG4gICAgICBQaXZvdFZhbHVlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICAgIEV4cGFuZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmZ1bmNdKSxcbiAgICAgIEZpbHRlcjogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmVsZW1lbnQsIFByb3BUeXBlcy5mdW5jXSksXG5cbiAgICAgIC8vIEFsbCBDb2x1bW5zXG4gICAgICBzb3J0YWJsZTogUHJvcFR5cGVzLmJvb2wsIC8vIHVzZSB0YWJsZSBkZWZhdWx0XG4gICAgICByZXNpemFibGU6IFByb3BUeXBlcy5ib29sLCAvLyB1c2UgdGFibGUgZGVmYXVsdFxuICAgICAgZmlsdGVyYWJsZTogUHJvcFR5cGVzLmJvb2wsIC8vIHVzZSB0YWJsZSBkZWZhdWx0XG4gICAgICBzaG93OiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgIG1pbldpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgbWluUmVzaXplV2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG5cbiAgICAgIC8vIENlbGxzIG9ubHlcbiAgICAgIGNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgZ2V0UHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgICAvLyBQaXZvdCBvbmx5XG4gICAgICBhZ2dyZWdhdGU6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgICAvLyBIZWFkZXJzIG9ubHlcbiAgICAgIGhlYWRlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGhlYWRlclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgZ2V0SGVhZGVyUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgICAvLyBGb290ZXJzIG9ubHlcbiAgICAgIGZvb3RlckNsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIGZvb3RlclN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgICAgZ2V0Rm9vdGVyUHJvcHM6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgZmlsdGVyTWV0aG9kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICAgIGZpbHRlckFsbDogUHJvcFR5cGVzLmJvb2wsXG4gICAgICBzb3J0TWV0aG9kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICB9KVxuICApLFxuXG4gIC8vIEdsb2JhbCBFeHBhbmRlciBDb2x1bW4gRGVmYXVsdHNcbiAgZXhwYW5kZXJEZWZhdWx0czogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBzb3J0YWJsZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgcmVzaXphYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBmaWx0ZXJhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB3aWR0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgfSksXG5cbiAgcGl2b3REZWZhdWx0czogUHJvcFR5cGVzLm9iamVjdCxcblxuICAvLyBUZXh0XG4gIHByZXZpb3VzVGV4dDogUHJvcFR5cGVzLm5vZGUsXG4gIG5leHRUZXh0OiBQcm9wVHlwZXMubm9kZSxcbiAgbG9hZGluZ1RleHQ6IFByb3BUeXBlcy5ub2RlLFxuICBub0RhdGFUZXh0OiBQcm9wVHlwZXMubm9kZSxcbiAgcGFnZVRleHQ6IFByb3BUeXBlcy5ub2RlLFxuICBvZlRleHQ6IFByb3BUeXBlcy5ub2RlLFxuICByb3dzVGV4dDogUHJvcFR5cGVzLm5vZGUsXG4gIHBhZ2VKdW1wVGV4dDogUHJvcFR5cGVzLm5vZGUsXG4gIHJvd3NTZWxlY3RvclRleHQ6IFByb3BUeXBlcy5ub2RlLFxuXG4gIC8vIENvbXBvbmVudHNcbiAgVGFibGVDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBUaGVhZENvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIFRib2R5Q29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgVHJHcm91cENvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIFRyQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgVGhDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBUZENvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIFRmb290Q29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgRmlsdGVyQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgRXhwYW5kZXJDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBQaXZvdFZhbHVlQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgQWdncmVnYXRlZENvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIC8vIHRoaXMgaXMgYSBjb21wdXRlZCBkZWZhdWx0IGdlbmVyYXRlZCB1c2luZ1xuICBQaXZvdENvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIC8vIHRoZSBFeHBhbmRlckNvbXBvbmVudCBhbmQgUGl2b3RWYWx1ZUNvbXBvbmVudCBhdCBydW4tdGltZSBpbiBtZXRob2RzLmpzXG4gIFBhZ2luYXRpb25Db21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBQcmV2aW91c0NvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIE5leHRDb21wb25lbnQ6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1Byb3BUeXBlcy5mdW5jLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBMb2FkaW5nQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgTm9EYXRhQ29tcG9uZW50OiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZnVuYywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgUmVzaXplckNvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG4gIFBhZFJvd0NvbXBvbmVudDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLmZ1bmMsIFByb3BUeXBlcy5lbGVtZW50XSksXG59XG4iXX0=

/***/ }),

/***/ "./node_modules/react-table/es/utils.js":
/*!**********************************************!*\
  !*** ./node_modules/react-table/es/utils.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



//
/* harmony default export */ __webpack_exports__["default"] = ({
  get: get,
  set: set,
  takeRight: takeRight,
  last: last,
  orderBy: orderBy,
  range: range,
  remove: remove,
  clone: clone,
  getFirstDefined: getFirstDefined,
  sum: sum,
  makeTemplateComponent: makeTemplateComponent,
  groupBy: groupBy,
  isArray: isArray,
  splitProps: splitProps,
  compactObject: compactObject,
  isSortingDesc: isSortingDesc,
  normalizeComponent: normalizeComponent,
  asPx: asPx
});

function get(obj, path, def) {
  if (!path) {
    return obj;
  }
  var pathObj = makePathArray(path);
  var val = void 0;
  try {
    val = pathObj.reduce(function (current, pathPart) {
      return current[pathPart];
    }, obj);
  } catch (e) {
    // continue regardless of error
  }
  return typeof val !== 'undefined' ? val : def;
}

function set() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var path = arguments[1];
  var value = arguments[2];

  var keys = makePathArray(path);
  var keyPart = void 0;
  var cursor = obj;
  while ((keyPart = keys.shift()) && keys.length) {
    if (!cursor[keyPart]) {
      cursor[keyPart] = {};
    }
    cursor = cursor[keyPart];
  }
  cursor[keyPart] = value;
  return obj;
}

function takeRight(arr, n) {
  var start = n > arr.length ? 0 : arr.length - n;
  return arr.slice(start);
}

function last(arr) {
  return arr[arr.length - 1];
}

function range(n) {
  var arr = [];
  for (var i = 0; i < n; i += 1) {
    arr.push(n);
  }
  return arr;
}

function orderBy(arr, funcs, dirs, indexKey) {
  return arr.sort(function (rowA, rowB) {
    for (var i = 0; i < funcs.length; i += 1) {
      var comp = funcs[i];
      var desc = dirs[i] === false || dirs[i] === 'desc';
      var sortInt = comp(rowA, rowB);
      if (sortInt) {
        return desc ? -sortInt : sortInt;
      }
    }
    // Use the row index for tie breakers
    return dirs[0] ? rowA[indexKey] - rowB[indexKey] : rowB[indexKey] - rowA[indexKey];
  });
}

function remove(a, b) {
  return a.filter(function (o, i) {
    var r = b(o);
    if (r) {
      a.splice(i, 1);
      return true;
    }
    return false;
  });
}

function clone(a) {
  try {
    return JSON.parse(JSON.stringify(a, function (key, value) {
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    }));
  } catch (e) {
    return a;
  }
}

function getFirstDefined() {
  for (var i = 0; i < arguments.length; i += 1) {
    if (typeof (arguments.length <= i ? undefined : arguments[i]) !== 'undefined') {
      return arguments.length <= i ? undefined : arguments[i];
    }
  }
}

function sum(arr) {
  return arr.reduce(function (a, b) {
    return a + b;
  }, 0);
}

function makeTemplateComponent(compClass, displayName) {
  if (!displayName) {
    throw new Error('No displayName found for template component:', compClass);
  }
  var cmp = function cmp(_ref) {
    var children = _ref.children,
        className = _ref.className,
        rest = _objectWithoutProperties(_ref, ['children', 'className']);

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      'div',
      _extends({ className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(compClass, className) }, rest),
      children
    );
  };
  cmp.displayName = displayName;
  return cmp;
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x, i) {
    var resKey = typeof key === 'function' ? key(x, i) : x[key];
    rv[resKey] = isArray(rv[resKey]) ? rv[resKey] : [];
    rv[resKey].push(x);
    return rv;
  }, {});
}

function asPx(value) {
  value = Number(value);
  return Number.isNaN(value) ? null : value + 'px';
}

function isArray(a) {
  return Array.isArray(a);
}

// ########################################################################
// Non-exported Helpers
// ########################################################################

function makePathArray(obj) {
  return flattenDeep(obj).join('.').replace(/\[/g, '.').replace(/\]/g, '').split('.');
}

function flattenDeep(arr) {
  var newArr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isArray(arr)) {
    newArr.push(arr);
  } else {
    for (var i = 0; i < arr.length; i += 1) {
      flattenDeep(arr[i], newArr);
    }
  }
  return newArr;
}

function splitProps(_ref2) {
  var className = _ref2.className,
      style = _ref2.style,
      rest = _objectWithoutProperties(_ref2, ['className', 'style']);

  return {
    className: className,
    style: style,
    rest: rest || {}
  };
}

function compactObject(obj) {
  var newObj = {};
  if (obj) {
    Object.keys(obj).map(function (key) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] !== undefined && typeof obj[key] !== 'undefined') {
        newObj[key] = obj[key];
      }
      return true;
    });
  }
  return newObj;
}

function isSortingDesc(d) {
  return !!(d.sort === 'desc' || d.desc === true || d.asc === false);
}

function normalizeComponent(Comp) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Comp;

  return typeof Comp === 'function' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Comp, params) : fallback;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsImNsYXNzbmFtZXMiLCJnZXQiLCJzZXQiLCJ0YWtlUmlnaHQiLCJsYXN0Iiwib3JkZXJCeSIsInJhbmdlIiwicmVtb3ZlIiwiY2xvbmUiLCJnZXRGaXJzdERlZmluZWQiLCJzdW0iLCJtYWtlVGVtcGxhdGVDb21wb25lbnQiLCJncm91cEJ5IiwiaXNBcnJheSIsInNwbGl0UHJvcHMiLCJjb21wYWN0T2JqZWN0IiwiaXNTb3J0aW5nRGVzYyIsIm5vcm1hbGl6ZUNvbXBvbmVudCIsImFzUHgiLCJvYmoiLCJwYXRoIiwiZGVmIiwicGF0aE9iaiIsIm1ha2VQYXRoQXJyYXkiLCJ2YWwiLCJyZWR1Y2UiLCJjdXJyZW50IiwicGF0aFBhcnQiLCJlIiwidmFsdWUiLCJrZXlzIiwia2V5UGFydCIsImN1cnNvciIsInNoaWZ0IiwibGVuZ3RoIiwiYXJyIiwibiIsInN0YXJ0Iiwic2xpY2UiLCJpIiwicHVzaCIsImZ1bmNzIiwiZGlycyIsImluZGV4S2V5Iiwic29ydCIsInJvd0EiLCJyb3dCIiwiY29tcCIsImRlc2MiLCJzb3J0SW50IiwiYSIsImIiLCJmaWx0ZXIiLCJvIiwiciIsInNwbGljZSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImtleSIsInRvU3RyaW5nIiwiY29tcENsYXNzIiwiZGlzcGxheU5hbWUiLCJFcnJvciIsImNtcCIsImNoaWxkcmVuIiwiY2xhc3NOYW1lIiwicmVzdCIsInhzIiwicnYiLCJ4IiwicmVzS2V5IiwiTnVtYmVyIiwiaXNOYU4iLCJBcnJheSIsImZsYXR0ZW5EZWVwIiwiam9pbiIsInJlcGxhY2UiLCJzcGxpdCIsIm5ld0FyciIsInN0eWxlIiwibmV3T2JqIiwiT2JqZWN0IiwibWFwIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwidW5kZWZpbmVkIiwiZCIsImFzYyIsIkNvbXAiLCJwYXJhbXMiLCJmYWxsYmFjayJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU9BLEtBQVAsTUFBa0IsT0FBbEI7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLFlBQXZCO0FBQ0E7QUFDQSxlQUFlO0FBQ2JDLFVBRGE7QUFFYkMsVUFGYTtBQUdiQyxzQkFIYTtBQUliQyxZQUphO0FBS2JDLGtCQUxhO0FBTWJDLGNBTmE7QUFPYkMsZ0JBUGE7QUFRYkMsY0FSYTtBQVNiQyxrQ0FUYTtBQVViQyxVQVZhO0FBV2JDLDhDQVhhO0FBWWJDLGtCQVphO0FBYWJDLGtCQWJhO0FBY2JDLHdCQWRhO0FBZWJDLDhCQWZhO0FBZ0JiQyw4QkFoQmE7QUFpQmJDLHdDQWpCYTtBQWtCYkM7QUFsQmEsQ0FBZjs7QUFxQkEsU0FBU2pCLEdBQVQsQ0FBY2tCLEdBQWQsRUFBbUJDLElBQW5CLEVBQXlCQyxHQUF6QixFQUE4QjtBQUM1QixNQUFJLENBQUNELElBQUwsRUFBVztBQUNULFdBQU9ELEdBQVA7QUFDRDtBQUNELE1BQU1HLFVBQVVDLGNBQWNILElBQWQsQ0FBaEI7QUFDQSxNQUFJSSxZQUFKO0FBQ0EsTUFBSTtBQUNGQSxVQUFNRixRQUFRRyxNQUFSLENBQWUsVUFBQ0MsT0FBRCxFQUFVQyxRQUFWO0FBQUEsYUFBdUJELFFBQVFDLFFBQVIsQ0FBdkI7QUFBQSxLQUFmLEVBQXlEUixHQUF6RCxDQUFOO0FBQ0QsR0FGRCxDQUVFLE9BQU9TLENBQVAsRUFBVTtBQUNWO0FBQ0Q7QUFDRCxTQUFPLE9BQU9KLEdBQVAsS0FBZSxXQUFmLEdBQTZCQSxHQUE3QixHQUFtQ0gsR0FBMUM7QUFDRDs7QUFFRCxTQUFTbkIsR0FBVCxHQUFxQztBQUFBLE1BQXZCaUIsR0FBdUIsdUVBQWpCLEVBQWlCO0FBQUEsTUFBYkMsSUFBYTtBQUFBLE1BQVBTLEtBQU87O0FBQ25DLE1BQU1DLE9BQU9QLGNBQWNILElBQWQsQ0FBYjtBQUNBLE1BQUlXLGdCQUFKO0FBQ0EsTUFBSUMsU0FBU2IsR0FBYjtBQUNBLFNBQU8sQ0FBQ1ksVUFBVUQsS0FBS0csS0FBTCxFQUFYLEtBQTRCSCxLQUFLSSxNQUF4QyxFQUFnRDtBQUM5QyxRQUFJLENBQUNGLE9BQU9ELE9BQVAsQ0FBTCxFQUFzQjtBQUNwQkMsYUFBT0QsT0FBUCxJQUFrQixFQUFsQjtBQUNEO0FBQ0RDLGFBQVNBLE9BQU9ELE9BQVAsQ0FBVDtBQUNEO0FBQ0RDLFNBQU9ELE9BQVAsSUFBa0JGLEtBQWxCO0FBQ0EsU0FBT1YsR0FBUDtBQUNEOztBQUVELFNBQVNoQixTQUFULENBQW9CZ0MsR0FBcEIsRUFBeUJDLENBQXpCLEVBQTRCO0FBQzFCLE1BQU1DLFFBQVFELElBQUlELElBQUlELE1BQVIsR0FBaUIsQ0FBakIsR0FBcUJDLElBQUlELE1BQUosR0FBYUUsQ0FBaEQ7QUFDQSxTQUFPRCxJQUFJRyxLQUFKLENBQVVELEtBQVYsQ0FBUDtBQUNEOztBQUVELFNBQVNqQyxJQUFULENBQWUrQixHQUFmLEVBQW9CO0FBQ2xCLFNBQU9BLElBQUlBLElBQUlELE1BQUosR0FBYSxDQUFqQixDQUFQO0FBQ0Q7O0FBRUQsU0FBUzVCLEtBQVQsQ0FBZ0I4QixDQUFoQixFQUFtQjtBQUNqQixNQUFNRCxNQUFNLEVBQVo7QUFDQSxPQUFLLElBQUlJLElBQUksQ0FBYixFQUFnQkEsSUFBSUgsQ0FBcEIsRUFBdUJHLEtBQUssQ0FBNUIsRUFBK0I7QUFDN0JKLFFBQUlLLElBQUosQ0FBU0osQ0FBVDtBQUNEO0FBQ0QsU0FBT0QsR0FBUDtBQUNEOztBQUVELFNBQVM5QixPQUFULENBQWtCOEIsR0FBbEIsRUFBdUJNLEtBQXZCLEVBQThCQyxJQUE5QixFQUFvQ0MsUUFBcEMsRUFBOEM7QUFDNUMsU0FBT1IsSUFBSVMsSUFBSixDQUFTLFVBQUNDLElBQUQsRUFBT0MsSUFBUCxFQUFnQjtBQUM5QixTQUFLLElBQUlQLElBQUksQ0FBYixFQUFnQkEsSUFBSUUsTUFBTVAsTUFBMUIsRUFBa0NLLEtBQUssQ0FBdkMsRUFBMEM7QUFDeEMsVUFBTVEsT0FBT04sTUFBTUYsQ0FBTixDQUFiO0FBQ0EsVUFBTVMsT0FBT04sS0FBS0gsQ0FBTCxNQUFZLEtBQVosSUFBcUJHLEtBQUtILENBQUwsTUFBWSxNQUE5QztBQUNBLFVBQU1VLFVBQVVGLEtBQUtGLElBQUwsRUFBV0MsSUFBWCxDQUFoQjtBQUNBLFVBQUlHLE9BQUosRUFBYTtBQUNYLGVBQU9ELE9BQU8sQ0FBQ0MsT0FBUixHQUFrQkEsT0FBekI7QUFDRDtBQUNGO0FBQ0Q7QUFDQSxXQUFPUCxLQUFLLENBQUwsSUFBVUcsS0FBS0YsUUFBTCxJQUFpQkcsS0FBS0gsUUFBTCxDQUEzQixHQUE0Q0csS0FBS0gsUUFBTCxJQUFpQkUsS0FBS0YsUUFBTCxDQUFwRTtBQUNELEdBWE0sQ0FBUDtBQVlEOztBQUVELFNBQVNwQyxNQUFULENBQWlCMkMsQ0FBakIsRUFBb0JDLENBQXBCLEVBQXVCO0FBQ3JCLFNBQU9ELEVBQUVFLE1BQUYsQ0FBUyxVQUFDQyxDQUFELEVBQUlkLENBQUosRUFBVTtBQUN4QixRQUFNZSxJQUFJSCxFQUFFRSxDQUFGLENBQVY7QUFDQSxRQUFJQyxDQUFKLEVBQU87QUFDTEosUUFBRUssTUFBRixDQUFTaEIsQ0FBVCxFQUFZLENBQVo7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUNELFdBQU8sS0FBUDtBQUNELEdBUE0sQ0FBUDtBQVFEOztBQUVELFNBQVMvQixLQUFULENBQWdCMEMsQ0FBaEIsRUFBbUI7QUFDakIsTUFBSTtBQUNGLFdBQU9NLEtBQUtDLEtBQUwsQ0FDTEQsS0FBS0UsU0FBTCxDQUFlUixDQUFmLEVBQWtCLFVBQUNTLEdBQUQsRUFBTTlCLEtBQU4sRUFBZ0I7QUFDaEMsVUFBSSxPQUFPQSxLQUFQLEtBQWlCLFVBQXJCLEVBQWlDO0FBQy9CLGVBQU9BLE1BQU0rQixRQUFOLEVBQVA7QUFDRDtBQUNELGFBQU8vQixLQUFQO0FBQ0QsS0FMRCxDQURLLENBQVA7QUFRRCxHQVRELENBU0UsT0FBT0QsQ0FBUCxFQUFVO0FBQ1YsV0FBT3NCLENBQVA7QUFDRDtBQUNGOztBQUVELFNBQVN6QyxlQUFULEdBQW1DO0FBQ2pDLE9BQUssSUFBSThCLElBQUksQ0FBYixFQUFnQkEsSUFBSSxVQUFLTCxNQUF6QixFQUFpQ0ssS0FBSyxDQUF0QyxFQUF5QztBQUN2QyxRQUFJLDRCQUFZQSxDQUFaLHlCQUFZQSxDQUFaLE9BQW1CLFdBQXZCLEVBQW9DO0FBQ2xDLGlDQUFZQSxDQUFaLHlCQUFZQSxDQUFaO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFNBQVM3QixHQUFULENBQWN5QixHQUFkLEVBQW1CO0FBQ2pCLFNBQU9BLElBQUlWLE1BQUosQ0FBVyxVQUFDeUIsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVUQsSUFBSUMsQ0FBZDtBQUFBLEdBQVgsRUFBNEIsQ0FBNUIsQ0FBUDtBQUNEOztBQUVELFNBQVN4QyxxQkFBVCxDQUFnQ2tELFNBQWhDLEVBQTJDQyxXQUEzQyxFQUF3RDtBQUN0RCxNQUFJLENBQUNBLFdBQUwsRUFBa0I7QUFDaEIsVUFBTSxJQUFJQyxLQUFKLENBQVUsOENBQVYsRUFBMERGLFNBQTFELENBQU47QUFDRDtBQUNELE1BQU1HLE1BQU0sU0FBTkEsR0FBTTtBQUFBLFFBQUdDLFFBQUgsUUFBR0EsUUFBSDtBQUFBLFFBQWFDLFNBQWIsUUFBYUEsU0FBYjtBQUFBLFFBQTJCQyxJQUEzQjs7QUFBQSxXQUNWO0FBQUE7QUFBQSxpQkFBSyxXQUFXbkUsV0FBVzZELFNBQVgsRUFBc0JLLFNBQXRCLENBQWhCLElBQXNEQyxJQUF0RDtBQUNHRjtBQURILEtBRFU7QUFBQSxHQUFaO0FBS0FELE1BQUlGLFdBQUosR0FBa0JBLFdBQWxCO0FBQ0EsU0FBT0UsR0FBUDtBQUNEOztBQUVELFNBQVNwRCxPQUFULENBQWtCd0QsRUFBbEIsRUFBc0JULEdBQXRCLEVBQTJCO0FBQ3pCLFNBQU9TLEdBQUczQyxNQUFILENBQVUsVUFBQzRDLEVBQUQsRUFBS0MsQ0FBTCxFQUFRL0IsQ0FBUixFQUFjO0FBQzdCLFFBQU1nQyxTQUFTLE9BQU9aLEdBQVAsS0FBZSxVQUFmLEdBQTRCQSxJQUFJVyxDQUFKLEVBQU8vQixDQUFQLENBQTVCLEdBQXdDK0IsRUFBRVgsR0FBRixDQUF2RDtBQUNBVSxPQUFHRSxNQUFILElBQWExRCxRQUFRd0QsR0FBR0UsTUFBSCxDQUFSLElBQXNCRixHQUFHRSxNQUFILENBQXRCLEdBQW1DLEVBQWhEO0FBQ0FGLE9BQUdFLE1BQUgsRUFBVy9CLElBQVgsQ0FBZ0I4QixDQUFoQjtBQUNBLFdBQU9ELEVBQVA7QUFDRCxHQUxNLEVBS0osRUFMSSxDQUFQO0FBTUQ7O0FBRUQsU0FBU25ELElBQVQsQ0FBZVcsS0FBZixFQUFzQjtBQUNwQkEsVUFBUTJDLE9BQU8zQyxLQUFQLENBQVI7QUFDQSxTQUFPMkMsT0FBT0MsS0FBUCxDQUFhNUMsS0FBYixJQUFzQixJQUF0QixHQUFnQ0EsS0FBaEMsT0FBUDtBQUNEOztBQUVELFNBQVNoQixPQUFULENBQWtCcUMsQ0FBbEIsRUFBcUI7QUFDbkIsU0FBT3dCLE1BQU03RCxPQUFOLENBQWNxQyxDQUFkLENBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsU0FBUzNCLGFBQVQsQ0FBd0JKLEdBQXhCLEVBQTZCO0FBQzNCLFNBQU93RCxZQUFZeEQsR0FBWixFQUNKeUQsSUFESSxDQUNDLEdBREQsRUFFSkMsT0FGSSxDQUVJLEtBRkosRUFFVyxHQUZYLEVBR0pBLE9BSEksQ0FHSSxLQUhKLEVBR1csRUFIWCxFQUlKQyxLQUpJLENBSUUsR0FKRixDQUFQO0FBS0Q7O0FBRUQsU0FBU0gsV0FBVCxDQUFzQnhDLEdBQXRCLEVBQXdDO0FBQUEsTUFBYjRDLE1BQWEsdUVBQUosRUFBSTs7QUFDdEMsTUFBSSxDQUFDbEUsUUFBUXNCLEdBQVIsQ0FBTCxFQUFtQjtBQUNqQjRDLFdBQU92QyxJQUFQLENBQVlMLEdBQVo7QUFDRCxHQUZELE1BRU87QUFDTCxTQUFLLElBQUlJLElBQUksQ0FBYixFQUFnQkEsSUFBSUosSUFBSUQsTUFBeEIsRUFBZ0NLLEtBQUssQ0FBckMsRUFBd0M7QUFDdENvQyxrQkFBWXhDLElBQUlJLENBQUosQ0FBWixFQUFvQndDLE1BQXBCO0FBQ0Q7QUFDRjtBQUNELFNBQU9BLE1BQVA7QUFDRDs7QUFFRCxTQUFTakUsVUFBVCxRQUFvRDtBQUFBLE1BQTdCb0QsU0FBNkIsU0FBN0JBLFNBQTZCO0FBQUEsTUFBbEJjLEtBQWtCLFNBQWxCQSxLQUFrQjtBQUFBLE1BQVJiLElBQVE7O0FBQ2xELFNBQU87QUFDTEQsd0JBREs7QUFFTGMsZ0JBRks7QUFHTGIsVUFBTUEsUUFBUTtBQUhULEdBQVA7QUFLRDs7QUFFRCxTQUFTcEQsYUFBVCxDQUF3QkksR0FBeEIsRUFBNkI7QUFDM0IsTUFBTThELFNBQVMsRUFBZjtBQUNBLE1BQUk5RCxHQUFKLEVBQVM7QUFDUCtELFdBQU9wRCxJQUFQLENBQVlYLEdBQVosRUFBaUJnRSxHQUFqQixDQUFxQixlQUFPO0FBQzFCLFVBQ0VELE9BQU9FLFNBQVAsQ0FBaUJDLGNBQWpCLENBQWdDQyxJQUFoQyxDQUFxQ25FLEdBQXJDLEVBQTBDd0MsR0FBMUMsS0FDQXhDLElBQUl3QyxHQUFKLE1BQWE0QixTQURiLElBRUEsT0FBT3BFLElBQUl3QyxHQUFKLENBQVAsS0FBb0IsV0FIdEIsRUFJRTtBQUNBc0IsZUFBT3RCLEdBQVAsSUFBY3hDLElBQUl3QyxHQUFKLENBQWQ7QUFDRDtBQUNELGFBQU8sSUFBUDtBQUNELEtBVEQ7QUFVRDtBQUNELFNBQU9zQixNQUFQO0FBQ0Q7O0FBRUQsU0FBU2pFLGFBQVQsQ0FBd0J3RSxDQUF4QixFQUEyQjtBQUN6QixTQUFPLENBQUMsRUFBRUEsRUFBRTVDLElBQUYsS0FBVyxNQUFYLElBQXFCNEMsRUFBRXhDLElBQUYsS0FBVyxJQUFoQyxJQUF3Q3dDLEVBQUVDLEdBQUYsS0FBVSxLQUFwRCxDQUFSO0FBQ0Q7O0FBRUQsU0FBU3hFLGtCQUFULENBQTZCeUUsSUFBN0IsRUFBaUU7QUFBQSxNQUE5QkMsTUFBOEIsdUVBQXJCLEVBQXFCO0FBQUEsTUFBakJDLFFBQWlCLHVFQUFORixJQUFNOztBQUMvRCxTQUFPLE9BQU9BLElBQVAsS0FBZ0IsVUFBaEIsR0FDTCxvQkFBQyxJQUFELEVBQVVDLE1BQVYsQ0FESyxHQUdMQyxRQUhGO0FBS0QiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuLy9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0LFxuICBzZXQsXG4gIHRha2VSaWdodCxcbiAgbGFzdCxcbiAgb3JkZXJCeSxcbiAgcmFuZ2UsXG4gIHJlbW92ZSxcbiAgY2xvbmUsXG4gIGdldEZpcnN0RGVmaW5lZCxcbiAgc3VtLFxuICBtYWtlVGVtcGxhdGVDb21wb25lbnQsXG4gIGdyb3VwQnksXG4gIGlzQXJyYXksXG4gIHNwbGl0UHJvcHMsXG4gIGNvbXBhY3RPYmplY3QsXG4gIGlzU29ydGluZ0Rlc2MsXG4gIG5vcm1hbGl6ZUNvbXBvbmVudCxcbiAgYXNQeCxcbn1cblxuZnVuY3Rpb24gZ2V0IChvYmosIHBhdGgsIGRlZikge1xuICBpZiAoIXBhdGgpIHtcbiAgICByZXR1cm4gb2JqXG4gIH1cbiAgY29uc3QgcGF0aE9iaiA9IG1ha2VQYXRoQXJyYXkocGF0aClcbiAgbGV0IHZhbFxuICB0cnkge1xuICAgIHZhbCA9IHBhdGhPYmoucmVkdWNlKChjdXJyZW50LCBwYXRoUGFydCkgPT4gY3VycmVudFtwYXRoUGFydF0sIG9iailcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGNvbnRpbnVlIHJlZ2FyZGxlc3Mgb2YgZXJyb3JcbiAgfVxuICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcgPyB2YWwgOiBkZWZcbn1cblxuZnVuY3Rpb24gc2V0IChvYmogPSB7fSwgcGF0aCwgdmFsdWUpIHtcbiAgY29uc3Qga2V5cyA9IG1ha2VQYXRoQXJyYXkocGF0aClcbiAgbGV0IGtleVBhcnRcbiAgbGV0IGN1cnNvciA9IG9ialxuICB3aGlsZSAoKGtleVBhcnQgPSBrZXlzLnNoaWZ0KCkpICYmIGtleXMubGVuZ3RoKSB7XG4gICAgaWYgKCFjdXJzb3Jba2V5UGFydF0pIHtcbiAgICAgIGN1cnNvcltrZXlQYXJ0XSA9IHt9XG4gICAgfVxuICAgIGN1cnNvciA9IGN1cnNvcltrZXlQYXJ0XVxuICB9XG4gIGN1cnNvcltrZXlQYXJ0XSA9IHZhbHVlXG4gIHJldHVybiBvYmpcbn1cblxuZnVuY3Rpb24gdGFrZVJpZ2h0IChhcnIsIG4pIHtcbiAgY29uc3Qgc3RhcnQgPSBuID4gYXJyLmxlbmd0aCA/IDAgOiBhcnIubGVuZ3RoIC0gblxuICByZXR1cm4gYXJyLnNsaWNlKHN0YXJ0KVxufVxuXG5mdW5jdGlvbiBsYXN0IChhcnIpIHtcbiAgcmV0dXJuIGFyclthcnIubGVuZ3RoIC0gMV1cbn1cblxuZnVuY3Rpb24gcmFuZ2UgKG4pIHtcbiAgY29uc3QgYXJyID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpICs9IDEpIHtcbiAgICBhcnIucHVzaChuKVxuICB9XG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gb3JkZXJCeSAoYXJyLCBmdW5jcywgZGlycywgaW5kZXhLZXkpIHtcbiAgcmV0dXJuIGFyci5zb3J0KChyb3dBLCByb3dCKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgY29tcCA9IGZ1bmNzW2ldXG4gICAgICBjb25zdCBkZXNjID0gZGlyc1tpXSA9PT0gZmFsc2UgfHwgZGlyc1tpXSA9PT0gJ2Rlc2MnXG4gICAgICBjb25zdCBzb3J0SW50ID0gY29tcChyb3dBLCByb3dCKVxuICAgICAgaWYgKHNvcnRJbnQpIHtcbiAgICAgICAgcmV0dXJuIGRlc2MgPyAtc29ydEludCA6IHNvcnRJbnRcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVXNlIHRoZSByb3cgaW5kZXggZm9yIHRpZSBicmVha2Vyc1xuICAgIHJldHVybiBkaXJzWzBdID8gcm93QVtpbmRleEtleV0gLSByb3dCW2luZGV4S2V5XSA6IHJvd0JbaW5kZXhLZXldIC0gcm93QVtpbmRleEtleV1cbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVtb3ZlIChhLCBiKSB7XG4gIHJldHVybiBhLmZpbHRlcigobywgaSkgPT4ge1xuICAgIGNvbnN0IHIgPSBiKG8pXG4gICAgaWYgKHIpIHtcbiAgICAgIGEuc3BsaWNlKGksIDEpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcbn1cblxuZnVuY3Rpb24gY2xvbmUgKGEpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICAgIEpTT04uc3RyaW5naWZ5KGEsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZVxuICAgICAgfSlcbiAgICApXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gYVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpcnN0RGVmaW5lZCAoLi4uYXJncykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAodHlwZW9mIGFyZ3NbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gYXJnc1tpXVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzdW0gKGFycikge1xuICByZXR1cm4gYXJyLnJlZHVjZSgoYSwgYikgPT4gYSArIGIsIDApXG59XG5cbmZ1bmN0aW9uIG1ha2VUZW1wbGF0ZUNvbXBvbmVudCAoY29tcENsYXNzLCBkaXNwbGF5TmFtZSkge1xuICBpZiAoIWRpc3BsYXlOYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBkaXNwbGF5TmFtZSBmb3VuZCBmb3IgdGVtcGxhdGUgY29tcG9uZW50OicsIGNvbXBDbGFzcylcbiAgfVxuICBjb25zdCBjbXAgPSAoeyBjaGlsZHJlbiwgY2xhc3NOYW1lLCAuLi5yZXN0IH0pID0+IChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhjb21wQ2xhc3MsIGNsYXNzTmFtZSl9IHsuLi5yZXN0fT5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKVxuICBjbXAuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZVxuICByZXR1cm4gY21wXG59XG5cbmZ1bmN0aW9uIGdyb3VwQnkgKHhzLCBrZXkpIHtcbiAgcmV0dXJuIHhzLnJlZHVjZSgocnYsIHgsIGkpID0+IHtcbiAgICBjb25zdCByZXNLZXkgPSB0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nID8ga2V5KHgsIGkpIDogeFtrZXldXG4gICAgcnZbcmVzS2V5XSA9IGlzQXJyYXkocnZbcmVzS2V5XSkgPyBydltyZXNLZXldIDogW11cbiAgICBydltyZXNLZXldLnB1c2goeClcbiAgICByZXR1cm4gcnZcbiAgfSwge30pXG59XG5cbmZ1bmN0aW9uIGFzUHggKHZhbHVlKSB7XG4gIHZhbHVlID0gTnVtYmVyKHZhbHVlKVxuICByZXR1cm4gTnVtYmVyLmlzTmFOKHZhbHVlKSA/IG51bGwgOiBgJHt2YWx1ZX1weGBcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoYSkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhKVxufVxuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vIE5vbi1leHBvcnRlZCBIZWxwZXJzXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuZnVuY3Rpb24gbWFrZVBhdGhBcnJheSAob2JqKSB7XG4gIHJldHVybiBmbGF0dGVuRGVlcChvYmopXG4gICAgLmpvaW4oJy4nKVxuICAgIC5yZXBsYWNlKC9cXFsvZywgJy4nKVxuICAgIC5yZXBsYWNlKC9cXF0vZywgJycpXG4gICAgLnNwbGl0KCcuJylcbn1cblxuZnVuY3Rpb24gZmxhdHRlbkRlZXAgKGFyciwgbmV3QXJyID0gW10pIHtcbiAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICBuZXdBcnIucHVzaChhcnIpXG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGZsYXR0ZW5EZWVwKGFycltpXSwgbmV3QXJyKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3QXJyXG59XG5cbmZ1bmN0aW9uIHNwbGl0UHJvcHMgKHsgY2xhc3NOYW1lLCBzdHlsZSwgLi4ucmVzdCB9KSB7XG4gIHJldHVybiB7XG4gICAgY2xhc3NOYW1lLFxuICAgIHN0eWxlLFxuICAgIHJlc3Q6IHJlc3QgfHwge30sXG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcGFjdE9iamVjdCAob2JqKSB7XG4gIGNvbnN0IG5ld09iaiA9IHt9XG4gIGlmIChvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmXG4gICAgICAgIG9ialtrZXldICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgdHlwZW9mIG9ialtrZXldICE9PSAndW5kZWZpbmVkJ1xuICAgICAgKSB7XG4gICAgICAgIG5ld09ialtrZXldID0gb2JqW2tleV1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSlcbiAgfVxuICByZXR1cm4gbmV3T2JqXG59XG5cbmZ1bmN0aW9uIGlzU29ydGluZ0Rlc2MgKGQpIHtcbiAgcmV0dXJuICEhKGQuc29ydCA9PT0gJ2Rlc2MnIHx8IGQuZGVzYyA9PT0gdHJ1ZSB8fCBkLmFzYyA9PT0gZmFsc2UpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUNvbXBvbmVudCAoQ29tcCwgcGFyYW1zID0ge30sIGZhbGxiYWNrID0gQ29tcCkge1xuICByZXR1cm4gdHlwZW9mIENvbXAgPT09ICdmdW5jdGlvbicgPyAoXG4gICAgPENvbXAgey4uLnBhcmFtc30gLz5cbiAgKSA6IChcbiAgICBmYWxsYmFja1xuICApXG59XG4iXX0=

/***/ }),

/***/ "./node_modules/reselect/es/index.js":
/*!*******************************************!*\
  !*** ./node_modules/reselect/es/index.js ***!
  \*******************************************/
/*! exports provided: defaultMemoize, createSelectorCreator, createSelector, createStructuredSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMemoize", function() { return defaultMemoize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSelectorCreator", function() { return createSelectorCreator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSelector", function() { return createSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStructuredSelector", function() { return createStructuredSelector; });
function defaultEqualityCheck(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
  var length = prev.length;
  for (var i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;

  var lastArgs = null;
  var lastResult = null;
  // we reference arguments instead of spreading them for performance reasons
  return function () {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      // apply arguments instead of spreading for performance.
      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions));

    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
    var selector = memoize(function () {
      var params = [];
      var length = dependencies.length;

      for (var i = 0; i < length; i++) {
        // apply arguments instead of spreading and mutate a local list of params for performance.
        params.push(dependencies[i].apply(null, arguments));
      }

      // apply arguments instead of spreading for performance.
      return memoizedResultFunc.apply(null, params);
    });

    selector.resultFunc = resultFunc;
    selector.dependencies = dependencies;
    selector.recomputations = function () {
      return recomputations;
    };
    selector.resetRecomputations = function () {
      return recomputations = 0;
    };
    return selector;
  };
}

var createSelector = createSelectorCreator(defaultMemoize);

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : createSelector;

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }
  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      values[_key3] = arguments[_key3];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}

/***/ }),

/***/ "./public/app/core/components/Animations/FadeIn.tsx":
/*!**********************************************************!*\
  !*** ./public/app/core/components/Animations/FadeIn.tsx ***!
  \**********************************************************/
/*! exports provided: FadeIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FadeIn", function() { return FadeIn; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-transition-group/Transition */ "./node_modules/react-transition-group/Transition.js");
/* harmony import */ var react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_2__);



var FadeIn = function (props) {
    var defaultStyle = {
        transition: "opacity " + props.duration + "ms linear",
        opacity: 0,
    };
    var transitionStyles = {
        exited: { opacity: 0, display: 'none' },
        entering: { opacity: 0 },
        entered: { opacity: 1 },
        exiting: { opacity: 0 },
    };
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_transition_group_Transition__WEBPACK_IMPORTED_MODULE_2___default.a, { in: props.in, timeout: props.duration, unmountOnExit: props.unmountOnExit || false, onExited: props.onExited }, function (state) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { style: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, defaultStyle, transitionStyles[state]) }, props.children)); }));
};


/***/ }),

/***/ "./public/app/core/components/Select/DataSourcePicker.tsx":
/*!****************************************************************!*\
  !*** ./public/app/core/components/Select/DataSourcePicker.tsx ***!
  \****************************************************************/
/*! exports provided: DataSourcePicker, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSourcePicker", function() { return DataSourcePicker; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");

// Libraries

// Components

var DataSourcePicker = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DataSourcePicker, _super);
    function DataSourcePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (item) {
            var ds = _this.props.datasources.find(function (ds) { return ds.name === item.value; });
            _this.props.onChange(ds);
        };
        return _this;
    }
    DataSourcePicker.prototype.render = function () {
        var _a = this.props, datasources = _a.datasources, current = _a.current, autoFocus = _a.autoFocus, onBlur = _a.onBlur, openMenuOnFocus = _a.openMenuOnFocus;
        var options = datasources.map(function (ds) { return ({
            value: ds.name,
            label: ds.name,
            imgUrl: ds.meta.info.logos.small,
        }); });
        var value = current && {
            label: current.name,
            value: current.name,
            imgUrl: current.meta.info.logos.small,
        };
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["Select"], { className: "ds-picker", isMulti: false, isClearable: false, backspaceRemovesValue: false, onChange: this.onChange, options: options, autoFocus: autoFocus, onBlur: onBlur, openMenuOnFocus: openMenuOnFocus, maxMenuHeight: 500, placeholder: "Select datasource", noOptionsMessage: function () { return 'No datasources found'; }, value: value })));
    };
    DataSourcePicker.defaultProps = {
        autoFocus: false,
        openMenuOnFocus: false,
    };
    return DataSourcePicker;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

/* harmony default export */ __webpack_exports__["default"] = (DataSourcePicker);


/***/ }),

/***/ "./public/app/core/utils/reselect.ts":
/*!*******************************************!*\
  !*** ./public/app/core/utils/reselect.ts ***!
  \*******************************************/
/*! exports provided: createLodashMemoizedSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLodashMemoizedSelector", function() { return createLodashMemoizedSelector; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");


var hashFn = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (acc, val) { return acc + '-' + JSON.stringify(val); }, '');
};
var createLodashMemoizedSelector = Object(reselect__WEBPACK_IMPORTED_MODULE_1__["createSelectorCreator"])(lodash__WEBPACK_IMPORTED_MODULE_0__["memoize"], hashFn);


/***/ }),

/***/ "./public/app/features/explore/ElapsedTime.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/explore/ElapsedTime.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");



var INTERVAL = 150;
/**
 * Shows an incremental time ticker of elapsed time from some event.
 */
var ElapsedTime = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ElapsedTime, _super);
    function ElapsedTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            elapsed: 0,
        };
        _this.tick = function () {
            var jetzt = Date.now();
            var elapsed = jetzt - _this.offset;
            _this.setState({ elapsed: elapsed });
        };
        return _this;
    }
    ElapsedTime.prototype.start = function () {
        this.offset = Date.now();
        this.timer = window.setInterval(this.tick, INTERVAL);
    };
    ElapsedTime.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.time) {
            clearInterval(this.timer);
        }
        else if (this.props.time) {
            this.start();
        }
        if (nextProps.resetKey !== this.props.resetKey) {
            clearInterval(this.timer);
            this.start();
        }
    };
    ElapsedTime.prototype.componentDidMount = function () {
        this.start();
    };
    ElapsedTime.prototype.componentWillUnmount = function () {
        clearInterval(this.timer);
    };
    ElapsedTime.prototype.render = function () {
        var elapsed = this.state.elapsed;
        var _a = this.props, className = _a.className, time = _a.time, humanize = _a.humanize;
        var value = (time || elapsed) / 1000;
        var displayValue = value.toFixed(1) + "s";
        if (humanize) {
            var duration = Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["toDuration"])(elapsed);
            var hours = duration.hours();
            var minutes = duration.minutes();
            var seconds = duration.seconds();
            displayValue = hours ? hours + "h " + minutes + "m " + seconds + "s" : minutes ? " " + minutes + "m " + seconds + "s" : seconds + "s";
        }
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "elapsed-time " + className }, displayValue);
    };
    return ElapsedTime;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (ElapsedTime);


/***/ }),

/***/ "./public/app/features/explore/ErrorContainer.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/ErrorContainer.tsx ***!
  \********************************************************/
/*! exports provided: ErrorContainer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorContainer", function() { return ErrorContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/components/Animations/FadeIn */ "./public/app/core/components/Animations/FadeIn.tsx");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");



var ErrorContainer = function (props) {
    var queryErrors = props.queryErrors;
    var refId = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_2__["getValueWithRefId"])(queryErrors);
    var queryError = refId ? null : Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_2__["getFirstQueryErrorWithoutRefId"])(queryErrors);
    var showError = queryError ? true : false;
    var duration = showError ? 100 : 10;
    var message = queryError ? queryError.message : null;
    return (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_1__["FadeIn"], { in: showError, duration: duration },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-container" },
            react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-error alert" },
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-icon" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", { className: "fa fa-exclamation-triangle" })),
                react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-body" },
                    react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", { className: "alert-title" }, message))))));
};


/***/ }),

/***/ "./public/app/features/explore/Explore.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/explore/Explore.tsx ***!
  \*************************************************/
/*! exports provided: Explore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Explore", function() { return Explore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_virtualized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-virtualized */ "./node_modules/react-virtualized/dist/es/index.js");
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _LogsContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./LogsContainer */ "./public/app/features/explore/LogsContainer.tsx");
/* harmony import */ var _QueryRows__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./QueryRows */ "./public/app/features/explore/QueryRows.tsx");
/* harmony import */ var _TableContainer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./TableContainer */ "./public/app/features/explore/TableContainer.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var app_core_utils_emitter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! app/core/utils/emitter */ "./public/app/core/utils/emitter.ts");
/* harmony import */ var _ExploreToolbar__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./ExploreToolbar */ "./public/app/features/explore/ExploreToolbar.tsx");
/* harmony import */ var _NoDataSourceCallToAction__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./NoDataSourceCallToAction */ "./public/app/features/explore/NoDataSourceCallToAction.tsx");
/* harmony import */ var app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! app/core/components/Animations/FadeIn */ "./public/app/core/components/Animations/FadeIn.tsx");
/* harmony import */ var _profile_state_selectors__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../profile/state/selectors */ "./public/app/features/profile/state/selectors.ts");
/* harmony import */ var _ErrorContainer__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./ErrorContainer */ "./public/app/features/explore/ErrorContainer.tsx");
/* harmony import */ var _state_actionTypes__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var _ExploreGraphPanel__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./ExploreGraphPanel */ "./public/app/features/explore/ExploreGraphPanel.tsx");

// Libraries



// @ts-ignore



// Services & Utils

// Components




// Actions











var getStyles = Object(memoize_one__WEBPACK_IMPORTED_MODULE_6__["default"])(function () {
    return {
        logsMain: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_1 || (templateObject_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: logsMain;\n      // Is needed for some transition animations to work.\n      position: relative;\n    "], ["\n      label: logsMain;\n      // Is needed for some transition animations to work.\n      position: relative;\n    "]))),
    };
});
/**
 * Explore provides an area for quick query iteration for a given datasource.
 * Once a datasource is selected it populates the query section at the top.
 * When queries are run, their results are being displayed in the main section.
 * The datasource determines what kind of query editor it brings, and what kind
 * of results viewers it supports. The state is managed entirely in Redux.
 *
 * SPLIT VIEW
 *
 * Explore can have two Explore areas side-by-side. This is handled in `Wrapper.tsx`.
 * Since there can be multiple Explores (e.g., left and right) each action needs
 * the `exploreId` as first parameter so that the reducer knows which Explore state
 * is affected.
 *
 * DATASOURCE REQUESTS
 *
 * A click on Run Query creates transactions for all DataQueries for all expanded
 * result viewers. New runs are discarding previous runs. Upon completion a transaction
 * saves the result. The result viewers construct their data from the currently existing
 * transactions.
 *
 * The result viewers determine some of the query options sent to the datasource, e.g.,
 * `format`, to indicate eventual transformations by the datasources' result transformers.
 */
var Explore = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Explore, _super);
    function Explore(props) {
        var _this = _super.call(this, props) || this;
        _this.getRef = function (el) {
            _this.el = el;
        };
        _this.onChangeTime = function (rawRange) {
            var _a = _this.props, updateTimeRange = _a.updateTimeRange, exploreId = _a.exploreId;
            updateTimeRange({ exploreId: exploreId, rawRange: rawRange });
        };
        // Use this in help pages to set page to a single query
        _this.onClickExample = function (query) {
            _this.props.setQueries(_this.props.exploreId, [query]);
        };
        _this.onClickLabel = function (key, value) {
            _this.onModifyQueries({ type: 'ADD_FILTER', key: key, value: value });
        };
        _this.onModifyQueries = function (action, index) {
            var datasourceInstance = _this.props.datasourceInstance;
            if (datasourceInstance && datasourceInstance.modifyQuery) {
                var modifier = function (queries, modification) { return datasourceInstance.modifyQuery(queries, modification); };
                _this.props.modifyQueries(_this.props.exploreId, action, index, modifier);
            }
        };
        _this.onResize = function (size) {
            _this.props.changeSize(_this.props.exploreId, size);
        };
        _this.onStartScanning = function () {
            // Scanner will trigger a query
            _this.props.scanStart(_this.props.exploreId);
        };
        _this.onStopScanning = function () {
            _this.props.scanStopAction({ exploreId: _this.props.exploreId });
        };
        _this.onToggleGraph = function (showingGraph) {
            var _a = _this.props, toggleGraph = _a.toggleGraph, exploreId = _a.exploreId;
            toggleGraph(exploreId, showingGraph);
        };
        _this.onUpdateTimeRange = function (absoluteRange) {
            var _a = _this.props, updateTimeRange = _a.updateTimeRange, exploreId = _a.exploreId;
            updateTimeRange({ exploreId: exploreId, absoluteRange: absoluteRange });
        };
        _this.refreshExplore = function () {
            var _a = _this.props, exploreId = _a.exploreId, update = _a.update;
            if (update.queries || update.ui || update.range || update.datasource || update.mode) {
                _this.props.refreshExplore(exploreId);
            }
        };
        _this.renderEmptyState = function () {
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_NoDataSourceCallToAction__WEBPACK_IMPORTED_MODULE_17__["NoDataSourceCallToAction"], null)));
        };
        _this.onReconnect = function (event) {
            var _a = _this.props, exploreId = _a.exploreId, reconnectDatasource = _a.reconnectDatasource;
            event.preventDefault();
            reconnectDatasource(exploreId);
        };
        _this.exploreEvents = new app_core_utils_emitter__WEBPACK_IMPORTED_MODULE_15__["Emitter"]();
        return _this;
    }
    Explore.prototype.componentDidMount = function () {
        var _a = this.props, initialized = _a.initialized, exploreId = _a.exploreId, initialDatasource = _a.initialDatasource, initialQueries = _a.initialQueries, initialRange = _a.initialRange, mode = _a.mode, initialUI = _a.initialUI, originPanelId = _a.originPanelId;
        var width = this.el ? this.el.offsetWidth : 0;
        // initialize the whole explore first time we mount and if browser history contains a change in datasource
        if (!initialized) {
            this.props.initializeExplore(exploreId, initialDatasource, initialQueries, initialRange, mode, width, this.exploreEvents, initialUI, originPanelId);
        }
    };
    Explore.prototype.componentWillUnmount = function () {
        this.exploreEvents.removeAllListeners();
    };
    Explore.prototype.componentDidUpdate = function (prevProps) {
        this.refreshExplore();
    };
    Explore.prototype.render = function () {
        var _this = this;
        var _a = this.props, StartPage = _a.StartPage, datasourceInstance = _a.datasourceInstance, datasourceError = _a.datasourceError, datasourceLoading = _a.datasourceLoading, datasourceMissing = _a.datasourceMissing, exploreId = _a.exploreId, showingStartPage = _a.showingStartPage, split = _a.split, queryKeys = _a.queryKeys, mode = _a.mode, graphResult = _a.graphResult, loading = _a.loading, absoluteRange = _a.absoluteRange, showingGraph = _a.showingGraph, showingTable = _a.showingTable, timeZone = _a.timeZone, queryResponse = _a.queryResponse;
        var exploreClass = split ? 'explore explore-split' : 'explore';
        var styles = getStyles();
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: exploreClass, ref: this.getRef },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ExploreToolbar__WEBPACK_IMPORTED_MODULE_16__["ExploreToolbar"], { exploreId: exploreId, onChangeTime: this.onChangeTime }),
            datasourceLoading ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" }, "Loading datasource...") : null,
            datasourceMissing ? this.renderEmptyState() : null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Animations_FadeIn__WEBPACK_IMPORTED_MODULE_18__["FadeIn"], { duration: datasourceError ? 150 : 5, in: datasourceError ? true : false },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_8__["Alert"], { title: "Error connecting to datasource: " + datasourceError, button: { text: 'Reconnect', onClick: this.onReconnect } }))),
            datasourceInstance && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-container" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryRows__WEBPACK_IMPORTED_MODULE_10__["default"], { exploreEvents: this.exploreEvents, exploreId: exploreId, queryKeys: queryKeys }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ErrorContainer__WEBPACK_IMPORTED_MODULE_20__["ErrorContainer"], { queryErrors: [queryResponse.error] }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_virtualized__WEBPACK_IMPORTED_MODULE_5__["AutoSizer"], { onResize: this.onResize, disableHeight: true }, function (_a) {
                    var width = _a.width;
                    if (width === 0) {
                        return null;
                    }
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("main", { className: "m-t-2 " + styles.logsMain, style: { width: width } },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_8__["ErrorBoundaryAlert"], null,
                            showingStartPage && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "grafana-info-box grafana-info-box--max-lg" },
                                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(StartPage, { onClickExample: _this.onClickExample, datasource: datasourceInstance }))),
                            !showingStartPage && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
                                mode === app_types_explore__WEBPACK_IMPORTED_MODULE_13__["ExploreMode"].Metrics && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ExploreGraphPanel__WEBPACK_IMPORTED_MODULE_22__["ExploreGraphPanel"], { series: graphResult, width: width, loading: loading, absoluteRange: absoluteRange, isStacked: false, showPanel: true, showingGraph: showingGraph, showingTable: showingTable, timeZone: timeZone, onToggleGraph: _this.onToggleGraph, onUpdateTimeRange: _this.onUpdateTimeRange, showBars: false, showLines: true })),
                                mode === app_types_explore__WEBPACK_IMPORTED_MODULE_13__["ExploreMode"].Metrics && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_TableContainer__WEBPACK_IMPORTED_MODULE_11__["default"], { exploreId: exploreId, onClickCell: _this.onClickLabel })),
                                mode === app_types_explore__WEBPACK_IMPORTED_MODULE_13__["ExploreMode"].Logs && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LogsContainer__WEBPACK_IMPORTED_MODULE_9__["default"], { width: width, exploreId: exploreId, onClickLabel: _this.onClickLabel, onStartScanning: _this.onStartScanning, onStopScanning: _this.onStopScanning })))))));
                })))));
    };
    return Explore;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.PureComponent));

var ensureQueriesMemoized = Object(memoize_one__WEBPACK_IMPORTED_MODULE_6__["default"])(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_14__["ensureQueries"]);
var getTimeRangeFromUrlMemoized = Object(memoize_one__WEBPACK_IMPORTED_MODULE_6__["default"])(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_14__["getTimeRangeFromUrl"]);
function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId;
    var explore = state.explore;
    var split = explore.split;
    var item = explore[exploreId];
    var timeZone = Object(_profile_state_selectors__WEBPACK_IMPORTED_MODULE_19__["getTimeZone"])(state.user);
    var StartPage = item.StartPage, datasourceError = item.datasourceError, datasourceInstance = item.datasourceInstance, datasourceLoading = item.datasourceLoading, datasourceMissing = item.datasourceMissing, initialized = item.initialized, showingStartPage = item.showingStartPage, queryKeys = item.queryKeys, urlState = item.urlState, update = item.update, isLive = item.isLive, supportedModes = item.supportedModes, mode = item.mode, graphResult = item.graphResult, loading = item.loading, showingGraph = item.showingGraph, showingTable = item.showingTable, absoluteRange = item.absoluteRange, queryResponse = item.queryResponse;
    var _b = (urlState ||
        {}), datasource = _b.datasource, queries = _b.queries, urlRange = _b.range, urlMode = _b.mode, ui = _b.ui, originPanelId = _b.originPanelId;
    var initialDatasource = datasource || app_core_store__WEBPACK_IMPORTED_MODULE_7__["default"].get(Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_14__["lastUsedDatasourceKeyForOrgId"])(state.user.orgId));
    var initialQueries = ensureQueriesMemoized(queries);
    var initialRange = urlRange ? getTimeRangeFromUrlMemoized(urlRange, timeZone).raw : app_core_utils_explore__WEBPACK_IMPORTED_MODULE_14__["DEFAULT_RANGE"];
    var newMode;
    if (supportedModes.length) {
        var urlModeIsValid = supportedModes.includes(urlMode);
        var modeStateIsValid = supportedModes.includes(mode);
        if (modeStateIsValid) {
            newMode = mode;
        }
        else if (urlModeIsValid) {
            newMode = urlMode;
        }
        else {
            newMode = supportedModes[0];
        }
    }
    else {
        newMode = [app_types_explore__WEBPACK_IMPORTED_MODULE_13__["ExploreMode"].Metrics, app_types_explore__WEBPACK_IMPORTED_MODULE_13__["ExploreMode"].Logs].includes(mode) ? mode : app_types_explore__WEBPACK_IMPORTED_MODULE_13__["ExploreMode"].Metrics;
    }
    var initialUI = ui || app_core_utils_explore__WEBPACK_IMPORTED_MODULE_14__["DEFAULT_UI_STATE"];
    return {
        StartPage: StartPage,
        datasourceError: datasourceError,
        datasourceInstance: datasourceInstance,
        datasourceLoading: datasourceLoading,
        datasourceMissing: datasourceMissing,
        initialized: initialized,
        showingStartPage: showingStartPage,
        split: split,
        queryKeys: queryKeys,
        update: update,
        initialDatasource: initialDatasource,
        initialQueries: initialQueries,
        initialRange: initialRange,
        mode: newMode,
        initialUI: initialUI,
        isLive: isLive,
        graphResult: graphResult,
        loading: loading,
        showingGraph: showingGraph,
        showingTable: showingTable,
        absoluteRange: absoluteRange,
        queryResponse: queryResponse,
        originPanelId: originPanelId,
    };
}
var mapDispatchToProps = {
    changeSize: _state_actions__WEBPACK_IMPORTED_MODULE_12__["changeSize"],
    initializeExplore: _state_actions__WEBPACK_IMPORTED_MODULE_12__["initializeExplore"],
    modifyQueries: _state_actions__WEBPACK_IMPORTED_MODULE_12__["modifyQueries"],
    reconnectDatasource: _state_actions__WEBPACK_IMPORTED_MODULE_12__["reconnectDatasource"],
    refreshExplore: _state_actions__WEBPACK_IMPORTED_MODULE_12__["refreshExplore"],
    scanStart: _state_actions__WEBPACK_IMPORTED_MODULE_12__["scanStart"],
    scanStopAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_21__["scanStopAction"],
    setQueries: _state_actions__WEBPACK_IMPORTED_MODULE_12__["setQueries"],
    updateTimeRange: _state_actions__WEBPACK_IMPORTED_MODULE_12__["updateTimeRange"],
    toggleGraph: _state_actions__WEBPACK_IMPORTED_MODULE_12__["toggleGraph"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(Explore)));
var templateObject_1;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/ExploreGraphPanel.tsx":
/*!***********************************************************!*\
  !*** ./public/app/features/explore/ExploreGraphPanel.tsx ***!
  \***********************************************************/
/*! exports provided: ExploreGraphPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExploreGraphPanel", function() { return ExploreGraphPanel; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");





var MAX_NUMBER_OF_TIME_SERIES = 20;
var getStyles = function (theme) { return ({
    timeSeriesDisclaimer: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n    label: time-series-disclaimer;\n    width: 300px;\n    margin: ", " auto;\n    padding: 10px 0;\n    border-radius: ", ";\n    text-align: center;\n    background-color: ", ";\n  "], ["\n    label: time-series-disclaimer;\n    width: 300px;\n    margin: ", " auto;\n    padding: 10px 0;\n    border-radius: ", ";\n    text-align: center;\n    background-color: ", ";\n  "])), theme.spacing.sm, theme.border.radius.md, Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["selectThemeVariant"])({ light: theme.colors.white, dark: theme.colors.dark4 }, theme.type)),
    disclaimerIcon: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_2 || (templateObject_2 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n    label: disclaimer-icon;\n    color: ", ";\n    margin-right: ", ";\n  "], ["\n    label: disclaimer-icon;\n    color: ", ";\n    margin-right: ", ";\n  "])), theme.colors.yellow, theme.spacing.xs),
    showAllTimeSeries: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_3 || (templateObject_3 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n    label: show-all-time-series;\n    cursor: pointer;\n    color: ", ";\n  "], ["\n    label: show-all-time-series;\n    cursor: pointer;\n    color: ", ";\n  "])), theme.colors.linkExternal),
}); };
var UnThemedExploreGraphPanel = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](UnThemedExploreGraphPanel, _super);
    function UnThemedExploreGraphPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hiddenSeries: [],
            showAllTimeSeries: false,
        };
        _this.onShowAllTimeSeries = function () {
            _this.setState({
                showAllTimeSeries: true,
            });
        };
        _this.onClickGraphButton = function () {
            var _a = _this.props, onToggleGraph = _a.onToggleGraph, showingGraph = _a.showingGraph;
            if (onToggleGraph) {
                onToggleGraph(showingGraph);
            }
        };
        _this.onChangeTime = function (from, to) {
            var onUpdateTimeRange = _this.props.onUpdateTimeRange;
            onUpdateTimeRange({ from: from, to: to });
        };
        _this.renderGraph = function () {
            var _a = _this.props, width = _a.width, series = _a.series, onHiddenSeriesChanged = _a.onHiddenSeriesChanged, timeZone = _a.timeZone, absoluteRange = _a.absoluteRange, showPanel = _a.showPanel, showingGraph = _a.showingGraph, showingTable = _a.showingTable, showBars = _a.showBars, showLines = _a.showLines, isStacked = _a.isStacked;
            var showAllTimeSeries = _this.state.showAllTimeSeries;
            if (!series) {
                return null;
            }
            var timeRange = {
                from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeForTimeZone"])(timeZone, absoluteRange.from),
                to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeForTimeZone"])(timeZone, absoluteRange.to),
                raw: {
                    from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeForTimeZone"])(timeZone, absoluteRange.from),
                    to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_3__["dateTimeForTimeZone"])(timeZone, absoluteRange.to),
                },
            };
            var height = showPanel === false ? 100 : showingGraph && showingTable ? 200 : 400;
            var lineWidth = showLines ? 1 : 5;
            var seriesToShow = showAllTimeSeries ? series : series.slice(0, MAX_NUMBER_OF_TIME_SERIES);
            return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["GraphSeriesToggler"], { series: seriesToShow, onHiddenSeriesChanged: onHiddenSeriesChanged }, function (_a) {
                var onSeriesToggle = _a.onSeriesToggle, toggledSeries = _a.toggledSeries;
                return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["GraphWithLegend"], { displayMode: _grafana_ui__WEBPACK_IMPORTED_MODULE_4__["LegendDisplayMode"].List, height: height, isLegendVisible: true, placement: 'under', width: width, timeRange: timeRange, timeZone: timeZone, showBars: showBars, showLines: showLines, showPoints: false, onToggleSort: function () { }, series: toggledSeries, isStacked: isStacked, lineWidth: lineWidth, onSeriesToggle: onSeriesToggle, onHorizontalRegionSelected: _this.onChangeTime }));
            }));
        };
        return _this;
    }
    UnThemedExploreGraphPanel.prototype.render = function () {
        var _a = this.props, series = _a.series, showPanel = _a.showPanel, showingGraph = _a.showingGraph, loading = _a.loading, theme = _a.theme;
        var showAllTimeSeries = this.state.showAllTimeSeries;
        var style = getStyles(theme);
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            series && series.length > MAX_NUMBER_OF_TIME_SERIES && !showAllTimeSeries && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])([style.timeSeriesDisclaimer]) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(['fa fa-fw fa-warning', style.disclaimerIcon]) }), "Showing only " + MAX_NUMBER_OF_TIME_SERIES + " time series. ",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])([style.showAllTimeSeries]), onClick: this.onShowAllTimeSeries }, "Show all " + series.length))),
            showPanel && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { label: "Graph", collapsible: true, isOpen: showingGraph, loading: loading, onToggle: this.onClickGraphButton }, this.renderGraph())),
            !showPanel && this.renderGraph()));
    };
    return UnThemedExploreGraphPanel;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var ExploreGraphPanel = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["withTheme"])(UnThemedExploreGraphPanel);
ExploreGraphPanel.displayName = 'ExploreGraphPanel';
var templateObject_1, templateObject_2, templateObject_3;


/***/ }),

/***/ "./public/app/features/explore/ExploreTimeControls.tsx":
/*!*************************************************************!*\
  !*** ./public/app/features/explore/ExploreTimeControls.tsx ***!
  \*************************************************************/
/*! exports provided: ExploreTimeControls */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExploreTimeControls", function() { return ExploreTimeControls; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_ui_src_components_TimePicker_TimePicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui/src/components/TimePicker/TimePicker */ "./packages/grafana-ui/src/components/TimePicker/TimePicker.tsx");
/* harmony import */ var app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/timePicker */ "./public/app/core/utils/timePicker.ts");

// Libaries


// State
// Components

// Utils & Services


var ExploreTimeControls = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ExploreTimeControls, _super);
    function ExploreTimeControls() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onMoveTimePicker = function (direction) {
            var _a = _this.props, range = _a.range, onChangeTime = _a.onChangeTime, timeZone = _a.timeZone;
            var _b = Object(app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_5__["getShiftedTimeRange"])(direction, range), from = _b.from, to = _b.to;
            var nextTimeRange = {
                from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTimeForTimeZone"])(timeZone, from),
                to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTimeForTimeZone"])(timeZone, to),
            };
            onChangeTime(nextTimeRange);
        };
        _this.onMoveForward = function () { return _this.onMoveTimePicker(1); };
        _this.onMoveBack = function () { return _this.onMoveTimePicker(-1); };
        _this.onChangeTimePicker = function (timeRange) {
            _this.props.onChangeTime(timeRange.raw);
        };
        _this.onZoom = function () {
            var _a = _this.props, range = _a.range, onChangeTime = _a.onChangeTime, timeZone = _a.timeZone;
            var _b = Object(app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_5__["getZoomedTimeRange"])(range, 2), from = _b.from, to = _b.to;
            var nextTimeRange = {
                from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTimeForTimeZone"])(timeZone, from),
                to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["dateTimeForTimeZone"])(timeZone, to),
            };
            onChangeTime(nextTimeRange);
        };
        _this.setActiveTimeOption = function (timeOptions, rawTimeRange) {
            return timeOptions.map(function (option) {
                if (option.to === rawTimeRange.to && option.from === rawTimeRange.from) {
                    return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, option, { active: true });
                }
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, option, { active: false });
            });
        };
        return _this;
    }
    ExploreTimeControls.prototype.render = function () {
        var _a = this.props, range = _a.range, timeZone = _a.timeZone;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["TimePicker"], { value: range, onChange: this.onChangeTimePicker, timeZone: timeZone, onMoveBackward: this.onMoveBack, onMoveForward: this.onMoveForward, onZoom: this.onZoom, selectOptions: this.setActiveTimeOption(_grafana_ui_src_components_TimePicker_TimePicker__WEBPACK_IMPORTED_MODULE_4__["defaultSelectOptions"], range.raw) }));
    };
    return ExploreTimeControls;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));



/***/ }),

/***/ "./public/app/features/explore/ExploreToolbar.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/ExploreToolbar.tsx ***!
  \********************************************************/
/*! exports provided: UnConnectedExploreToolbar, ExploreToolbar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UnConnectedExploreToolbar", function() { return UnConnectedExploreToolbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExploreToolbar", function() { return ExploreToolbar; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash_omitBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/omitBy */ "./node_modules/lodash/omitBy.js");
/* harmony import */ var lodash_omitBy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_omitBy__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/components/Select/DataSourcePicker */ "./public/app/core/components/Select/DataSourcePicker.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _state_actionTypes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var app_core_actions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _profile_state_selectors__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../profile/state/selectors */ "./public/app/features/profile/state/selectors.ts");
/* harmony import */ var _dashboard_services_DashboardSrv__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../dashboard/services/DashboardSrv */ "./public/app/features/dashboard/services/DashboardSrv.ts");
/* harmony import */ var _core_utils_kbn__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../core/utils/kbn */ "./public/app/core/utils/kbn.ts");
/* harmony import */ var _ExploreTimeControls__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./ExploreTimeControls */ "./public/app/features/explore/ExploreTimeControls.tsx");
/* harmony import */ var _LiveTailButton__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./LiveTailButton */ "./public/app/features/explore/LiveTailButton.tsx");
/* harmony import */ var _ResponsiveButton__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./ResponsiveButton */ "./public/app/features/explore/ResponsiveButton.tsx");
/* harmony import */ var _RunButton__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./RunButton */ "./public/app/features/explore/RunButton.tsx");





















var getStyles = Object(memoize_one__WEBPACK_IMPORTED_MODULE_5__["default"])(function () {
    return {
        liveTailButtons: Object(emotion__WEBPACK_IMPORTED_MODULE_7__["css"])(templateObject_1 || (templateObject_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      margin-left: 10px;\n    "], ["\n      margin-left: 10px;\n    "]))),
    };
});
var UnConnectedExploreToolbar = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](UnConnectedExploreToolbar, _super);
    function UnConnectedExploreToolbar(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangeDatasource = function (option) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                this.props.changeDatasource(this.props.exploreId, option.value);
                return [2 /*return*/];
            });
        }); };
        _this.onClearAll = function () {
            _this.props.clearAll(_this.props.exploreId);
        };
        _this.onRunQuery = function () {
            return _this.props.runQueries(_this.props.exploreId);
        };
        _this.onChangeRefreshInterval = function (item) {
            var _a = _this.props, changeRefreshInterval = _a.changeRefreshInterval, exploreId = _a.exploreId;
            changeRefreshInterval(exploreId, item);
        };
        _this.onModeChange = function (mode) {
            var _a = _this.props, changeMode = _a.changeMode, exploreId = _a.exploreId;
            changeMode(exploreId, mode);
        };
        _this.returnToPanel = function (_a) {
            var _b = (_a === void 0 ? {} : _a).withChanges, withChanges = _b === void 0 ? false : _b;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
                var originPanelId, dashboardSrv, dash, titleSlug, dashViewOptions;
                return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_c) {
                    originPanelId = this.props.originPanelId;
                    dashboardSrv = Object(_dashboard_services_DashboardSrv__WEBPACK_IMPORTED_MODULE_15__["getDashboardSrv"])();
                    dash = dashboardSrv.getCurrent();
                    titleSlug = _core_utils_kbn__WEBPACK_IMPORTED_MODULE_16__["default"].slugifyForUrl(dash.title);
                    if (!withChanges) {
                        this.props.clearOrigin();
                    }
                    dashViewOptions = {
                        fullscreen: withChanges || dash.meta.fullscreen,
                        edit: withChanges || dash.meta.isEditing,
                    };
                    this.props.updateLocation({
                        path: "/d/" + dash.uid + "/:" + titleSlug,
                        query: tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, lodash_omitBy__WEBPACK_IMPORTED_MODULE_1___default()(dashViewOptions, function (v) { return !v; }), { panelId: originPanelId }),
                    });
                    return [2 /*return*/];
                });
            });
        };
        _this.stopLive = function () {
            var exploreId = _this.props.exploreId;
            _this.pauseLive();
            // TODO referencing this from perspective of refresh picker when there is designated button for it now is not
            //  great. Needs another refactor.
            _this.props.changeRefreshIntervalAction({ exploreId: exploreId, refreshInterval: _grafana_ui__WEBPACK_IMPORTED_MODULE_9__["RefreshPicker"].offOption.value });
        };
        _this.startLive = function () {
            var exploreId = _this.props.exploreId;
            _this.props.changeRefreshIntervalAction({ exploreId: exploreId, refreshInterval: _grafana_ui__WEBPACK_IMPORTED_MODULE_9__["RefreshPicker"].liveOption.value });
        };
        _this.pauseLive = function () {
            var exploreId = _this.props.exploreId;
            _this.props.setPausedStateAction({ exploreId: exploreId, isPaused: true });
        };
        _this.resumeLive = function () {
            var exploreId = _this.props.exploreId;
            _this.props.setPausedStateAction({ exploreId: exploreId, isPaused: false });
        };
        return _this;
    }
    UnConnectedExploreToolbar.prototype.render = function () {
        var _this = this;
        var _a = this.props, datasourceMissing = _a.datasourceMissing, exploreDatasources = _a.exploreDatasources, closeSplit = _a.closeSplit, exploreId = _a.exploreId, loading = _a.loading, range = _a.range, timeZone = _a.timeZone, selectedDatasource = _a.selectedDatasource, splitted = _a.splitted, refreshInterval = _a.refreshInterval, onChangeTime = _a.onChangeTime, split = _a.split, supportedModeOptions = _a.supportedModeOptions, selectedModeOption = _a.selectedModeOption, hasLiveOption = _a.hasLiveOption, isLive = _a.isLive, isPaused = _a.isPaused, originPanelId = _a.originPanelId;
        var styles = getStyles();
        var originDashboardIsEditable = Number.isInteger(originPanelId);
        var panelReturnClasses = classnames__WEBPACK_IMPORTED_MODULE_6___default()('btn', 'navbar-button', {
            'btn--radius-right-0': originDashboardIsEditable,
            'navbar-button navbar-button--border-right-0': originDashboardIsEditable,
        });
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: splitted ? 'explore-toolbar splitted' : 'explore-toolbar' },
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-item" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-header" },
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-header-title" }, exploreId === 'left' && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: "navbar-page-btn" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "gicon gicon-explore" }),
                        "Explore"))),
                    splitted && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("a", { className: "explore-toolbar-header-close", onClick: function () { return closeSplit(exploreId); } },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-times fa-fw" }))))),
            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-item" },
                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content" },
                    !datasourceMissing ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "datasource-picker" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(app_core_components_Select_DataSourcePicker__WEBPACK_IMPORTED_MODULE_10__["DataSourcePicker"], { onChange: this.onChangeDatasource, datasources: exploreDatasources, current: selectedDatasource })),
                        supportedModeOptions.length > 1 ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "query-type-toggle" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["ToggleButtonGroup"], { label: "", transparent: true },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["ToggleButton"], { key: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Metrics, value: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Metrics, onChange: this.onModeChange, selected: selectedModeOption.value === app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Metrics }, 'Metrics'),
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["ToggleButton"], { key: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs, value: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs, onChange: this.onModeChange, selected: selectedModeOption.value === app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs }, 'Logs')))) : null)) : null,
                    Number.isInteger(originPanelId) && !splitted && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["Tooltip"], { content: 'Return to panel', placement: "bottom" },
                            react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", { className: panelReturnClasses, onClick: function () { return _this.returnToPanel(); } },
                                react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("i", { className: "fa fa-arrow-left" }))),
                        originDashboardIsEditable && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["ButtonSelect"], { className: "navbar-button--attached btn--radius-left-0$", options: [{ label: 'Return to panel with changes', value: '' }], onChange: function () { return _this.returnToPanel({ withChanges: true }); }, maxMenuHeight: 380 })))),
                    exploreId === 'left' && !splitted ? (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ResponsiveButton__WEBPACK_IMPORTED_MODULE_19__["ResponsiveButton"], { splitted: splitted, title: "Split", onClick: split, iconClassName: "fa fa-fw fa-columns icon-margin-right", disabled: isLive }))) : null,
                    !isLive && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_ExploreTimeControls__WEBPACK_IMPORTED_MODULE_17__["ExploreTimeControls"], { exploreId: exploreId, range: range, timeZone: timeZone, onChangeTime: onChangeTime }))),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("button", { className: "btn navbar-button", onClick: this.onClearAll }, "Clear All")),
                    react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item" },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_RunButton__WEBPACK_IMPORTED_MODULE_20__["RunButton"], { refreshInterval: refreshInterval, onChangeRefreshInterval: this.onChangeRefreshInterval, splitted: splitted, loading: loading || (isLive && !isPaused), onRun: this.onRunQuery, showDropdown: !isLive }),
                        refreshInterval && react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_9__["SetInterval"], { func: this.onRunQuery, interval: refreshInterval, loading: loading })),
                    hasLiveOption && (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", { className: "explore-toolbar-content-item " + styles.liveTailButtons },
                        react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_LiveTailButton__WEBPACK_IMPORTED_MODULE_18__["LiveTailButton"], { isLive: isLive, isPaused: isPaused, start: this.startLive, pause: this.pauseLive, resume: this.resumeLive, stop: this.stopLive })))))));
    };
    return UnConnectedExploreToolbar;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));

var getModeOptionsMemoized = Object(memoize_one__WEBPACK_IMPORTED_MODULE_5__["default"])(function (supportedModes, mode) {
    var e_1, _a;
    var supportedModeOptions = [];
    var selectedModeOption = null;
    try {
        for (var supportedModes_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__values"](supportedModes), supportedModes_1_1 = supportedModes_1.next(); !supportedModes_1_1.done; supportedModes_1_1 = supportedModes_1.next()) {
            var supportedMode = supportedModes_1_1.value;
            switch (supportedMode) {
                case app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Metrics:
                    var option1 = {
                        value: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Metrics,
                        label: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Metrics,
                    };
                    supportedModeOptions.push(option1);
                    if (mode === app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Metrics) {
                        selectedModeOption = option1;
                    }
                    break;
                case app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs:
                    var option2 = {
                        value: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs,
                        label: app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs,
                    };
                    supportedModeOptions.push(option2);
                    if (mode === app_types_explore__WEBPACK_IMPORTED_MODULE_8__["ExploreMode"].Logs) {
                        selectedModeOption = option2;
                    }
                    break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (supportedModes_1_1 && !supportedModes_1_1.done && (_a = supportedModes_1.return)) _a.call(supportedModes_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return [supportedModeOptions, selectedModeOption];
});
var mapStateToProps = function (state, _a) {
    var exploreId = _a.exploreId;
    var splitted = state.explore.split;
    var exploreItem = state.explore[exploreId];
    var datasourceInstance = exploreItem.datasourceInstance, datasourceMissing = exploreItem.datasourceMissing, exploreDatasources = exploreItem.exploreDatasources, range = exploreItem.range, refreshInterval = exploreItem.refreshInterval, loading = exploreItem.loading, supportedModes = exploreItem.supportedModes, mode = exploreItem.mode, isLive = exploreItem.isLive, isPaused = exploreItem.isPaused, originPanelId = exploreItem.originPanelId, queries = exploreItem.queries;
    var selectedDatasource = datasourceInstance
        ? exploreDatasources.find(function (datasource) { return datasource.name === datasourceInstance.name; })
        : undefined;
    var hasLiveOption = datasourceInstance && datasourceInstance.meta && datasourceInstance.meta.streaming ? true : false;
    var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__read"](getModeOptionsMemoized(supportedModes, mode), 2), supportedModeOptions = _b[0], selectedModeOption = _b[1];
    return {
        datasourceMissing: datasourceMissing,
        exploreDatasources: exploreDatasources,
        loading: loading,
        range: range,
        timeZone: Object(_profile_state_selectors__WEBPACK_IMPORTED_MODULE_14__["getTimeZone"])(state.user),
        selectedDatasource: selectedDatasource,
        splitted: splitted,
        refreshInterval: refreshInterval,
        supportedModeOptions: supportedModeOptions,
        selectedModeOption: selectedModeOption,
        hasLiveOption: hasLiveOption,
        isLive: isLive,
        isPaused: isPaused,
        originPanelId: originPanelId,
        queries: queries,
    };
};
var mapDispatchToProps = {
    changeDatasource: _state_actions__WEBPACK_IMPORTED_MODULE_11__["changeDatasource"],
    updateLocation: app_core_actions__WEBPACK_IMPORTED_MODULE_13__["updateLocation"],
    changeRefreshInterval: _state_actions__WEBPACK_IMPORTED_MODULE_11__["changeRefreshInterval"],
    clearAll: _state_actions__WEBPACK_IMPORTED_MODULE_11__["clearQueries"],
    runQueries: _state_actions__WEBPACK_IMPORTED_MODULE_11__["runQueries"],
    closeSplit: _state_actions__WEBPACK_IMPORTED_MODULE_11__["splitClose"],
    split: _state_actions__WEBPACK_IMPORTED_MODULE_11__["splitOpen"],
    changeMode: _state_actions__WEBPACK_IMPORTED_MODULE_11__["changeMode"],
    clearOrigin: _state_actions__WEBPACK_IMPORTED_MODULE_11__["clearOrigin"],
    changeRefreshIntervalAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_12__["changeRefreshIntervalAction"],
    setPausedStateAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_12__["setPausedStateAction"],
};
var ExploreToolbar = Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(UnConnectedExploreToolbar));
var templateObject_1;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/LiveLogs.tsx":
/*!**************************************************!*\
  !*** ./public/app/features/explore/LiveLogs.tsx ***!
  \**************************************************/
/*! exports provided: LiveLogsWithTheme */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveLogsWithTheme", function() { return LiveLogsWithTheme; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tinycolor2__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _ElapsedTime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ElapsedTime */ "./public/app/features/explore/ElapsedTime.tsx");







var getStyles = function (theme) { return ({
    logsRowsLive: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n    label: logs-rows-live;\n    font-family: ", ";\n    font-size: ", ";\n    display: flex;\n    flex-flow: column nowrap;\n    height: 65vh;\n    overflow-y: auto;\n    :first-child {\n      margin-top: auto !important;\n    }\n  "], ["\n    label: logs-rows-live;\n    font-family: ", ";\n    font-size: ", ";\n    display: flex;\n    flex-flow: column nowrap;\n    height: 65vh;\n    overflow-y: auto;\n    :first-child {\n      margin-top: auto !important;\n    }\n  "])), theme.typography.fontFamily.monospace, theme.typography.size.sm),
    logsRowFresh: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_2 || (templateObject_2 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n    label: logs-row-fresh;\n    color: ", ";\n    background-color: ", ";\n    animation: fade 1s ease-out 1s 1 normal forwards;\n    @keyframes fade {\n      from {\n        background-color: ", ";\n      }\n      to {\n        background-color: transparent;\n      }\n    }\n  "], ["\n    label: logs-row-fresh;\n    color: ", ";\n    background-color: ",
        ";\n    animation: fade 1s ease-out 1s 1 normal forwards;\n    @keyframes fade {\n      from {\n        background-color: ",
        ";\n      }\n      to {\n        background-color: transparent;\n      }\n    }\n  "])), theme.colors.text, tinycolor2__WEBPACK_IMPORTED_MODULE_3___default()(theme.colors.blueLight)
        .setAlpha(0.25)
        .toString(), tinycolor2__WEBPACK_IMPORTED_MODULE_3___default()(theme.colors.blueLight)
        .setAlpha(0.25)
        .toString()),
    logsRowOld: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_3 || (templateObject_3 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n    label: logs-row-old;\n  "], ["\n    label: logs-row-old;\n  "]))),
    logsRowsIndicator: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_4 || (templateObject_4 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n    font-size: ", ";\n    padding-top: ", ";\n    display: flex;\n    align-items: center;\n  "], ["\n    font-size: ", ";\n    padding-top: ", ";\n    display: flex;\n    align-items: center;\n  "])), theme.typography.size.md, theme.spacing.sm),
    button: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_5 || (templateObject_5 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n    margin-right: ", ";\n  "], ["\n    margin-right: ", ";\n  "])), theme.spacing.sm),
}); };
var LiveLogs = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LiveLogs, _super);
    function LiveLogs(props) {
        var _this = _super.call(this, props) || this;
        _this.liveEndDiv = null;
        _this.scrollContainerRef = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef();
        _this.lastScrollPos = null;
        /**
         * Handle pausing when user scrolls up so that we stop resetting his position to the bottom when new row arrives.
         * We do not need to throttle it here much, adding new rows should be throttled/buffered itself in the query epics
         * and after you pause we remove the handler and add it after you manually resume, so this should not be fired often.
         */
        _this.onScroll = function (event) {
            var _a = _this.props, isPaused = _a.isPaused, onPause = _a.onPause;
            var _b = event.currentTarget, scrollTop = _b.scrollTop, clientHeight = _b.clientHeight, scrollHeight = _b.scrollHeight;
            var distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
            if (distanceFromBottom >= 5 && !isPaused) {
                onPause();
                _this.lastScrollPos = distanceFromBottom;
            }
        };
        _this.rowsToRender = function () {
            var isPaused = _this.props.isPaused;
            var rowsToRender = _this.state.logsResultToRender ? _this.state.logsResultToRender.rows : [];
            if (!isPaused) {
                // A perf optimisation here. Show just 100 rows when streaming and full length when the streaming is paused.
                rowsToRender = rowsToRender.slice(-100);
            }
            return rowsToRender;
        };
        /**
         * Check if row is fresh so we can apply special styling. This is bit naive and does not take into account rows
         * which arrive out of order. Because loki datasource sends full data instead of deltas we need to compare the
         * data and this is easier than doing some intersection of some uuid of each row (which we do not have now anyway)
         */
        _this.isFresh = function (row) {
            return row.timeEpochMs > _this.state.lastTimestamp;
        };
        _this.state = {
            logsResultToRender: props.logsResult,
            lastTimestamp: 0,
        };
        return _this;
    }
    LiveLogs.prototype.componentDidUpdate = function (prevProps) {
        if (!prevProps.isPaused && this.props.isPaused) {
            // So we paused the view and we changed the content size, but we want to keep the relative offset from the bottom.
            if (this.lastScrollPos) {
                // There is last scroll pos from when user scrolled up a bit so go to that position.
                var _a = this.scrollContainerRef.current, clientHeight = _a.clientHeight, scrollHeight = _a.scrollHeight;
                var scrollTop = scrollHeight - (this.lastScrollPos + clientHeight);
                this.scrollContainerRef.current.scrollTo(0, scrollTop);
                this.lastScrollPos = null;
            }
            else {
                // We do not have any position to jump to su the assumption is user just clicked pause. We can just scroll
                // to the bottom.
                if (this.liveEndDiv) {
                    this.liveEndDiv.scrollIntoView(false);
                }
            }
        }
    };
    LiveLogs.getDerivedStateFromProps = function (nextProps, state) {
        if (!nextProps.isPaused) {
            return {
                // We update what we show only if not paused. We keep any background subscriptions running and keep updating
                // our state, but we do not show the updates, this allows us start again showing correct result after resuming
                // without creating a gap in the log results.
                logsResultToRender: nextProps.logsResult,
                lastTimestamp: state.logsResultToRender && Object(lodash__WEBPACK_IMPORTED_MODULE_4__["last"])(state.logsResultToRender.rows)
                    ? Object(lodash__WEBPACK_IMPORTED_MODULE_4__["last"])(state.logsResultToRender.rows).timeEpochMs
                    : 0,
            };
        }
        else {
            return null;
        }
    };
    LiveLogs.prototype.render = function () {
        var _this = this;
        var _a = this.props, theme = _a.theme, timeZone = _a.timeZone, onPause = _a.onPause, onResume = _a.onResume, isPaused = _a.isPaused;
        var styles = getStyles(theme);
        var showUtc = timeZone === 'utc';
        var _b = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["getLogRowStyles"])(theme), logsRow = _b.logsRow, logsRowLocalTime = _b.logsRowLocalTime, logsRowMessage = _b.logsRowMessage;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { onScroll: isPaused ? undefined : this.onScroll, className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(['logs-rows', styles.logsRowsLive]), ref: this.scrollContainerRef },
                this.rowsToRender().map(function (row, index) {
                    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])(logsRow, _this.isFresh(row) ? styles.logsRowFresh : styles.logsRowOld), key: row.timeEpochMs + "-" + index },
                        showUtc && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])([logsRowLocalTime]), title: "Local: " + row.timeLocal + " (" + row.timeFromNow + ")" }, row.timeUtc)),
                        !showUtc && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])([logsRowLocalTime]), title: row.timeUtc + " (" + row.timeFromNow + ")" }, row.timeLocal)),
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])([logsRowMessage]) }, row.entry)));
                }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { ref: function (element) {
                        _this.liveEndDiv = element;
                        // This is triggered on every update so on every new row. It keeps the view scrolled at the bottom by
                        // default.
                        if (_this.liveEndDiv && !isPaused) {
                            _this.liveEndDiv.scrollIntoView(false);
                        }
                    } })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])([styles.logsRowsIndicator]) },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { onClick: isPaused ? onResume : onPause, className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])('btn btn-secondary', styles.button) },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])('fa', isPaused ? 'fa-play' : 'fa-pause') }),
                    "\u00A0",
                    isPaused ? 'Resume' : 'Pause'),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { onClick: this.props.stopLive, className: Object(emotion__WEBPACK_IMPORTED_MODULE_2__["cx"])('btn btn-inverse', styles.button) },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: 'fa fa-stop' }),
                    "\u00A0 Exit live mode"),
                isPaused || (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null,
                    "Last line received: ",
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ElapsedTime__WEBPACK_IMPORTED_MODULE_6__["default"], { resetKey: this.props.logsResult, humanize: true }),
                    " ago")))));
    };
    return LiveLogs;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var LiveLogsWithTheme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["withTheme"])(LiveLogs);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;


/***/ }),

/***/ "./public/app/features/explore/LiveTailButton.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/LiveTailButton.tsx ***!
  \********************************************************/
/*! exports provided: LiveTailButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiveTailButton", function() { return LiveTailButton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(tinycolor2__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");








var getStyles = Object(memoize_one__WEBPACK_IMPORTED_MODULE_4__["default"])(function (theme) {
    var orange = theme.type === _grafana_ui__WEBPACK_IMPORTED_MODULE_7__["GrafanaThemeType"].Dark ? '#FF780A' : '#ED5700';
    var orangeLighter = tinycolor2__WEBPACK_IMPORTED_MODULE_5___default()(orange)
        .lighten(10)
        .toString();
    var pulseTextColor = tinycolor2__WEBPACK_IMPORTED_MODULE_5___default()(orange)
        .desaturate(90)
        .toString();
    return {
        noRightBorderStyle: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_1 || (templateObject_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: noRightBorderStyle;\n      border-right: 0;\n    "], ["\n      label: noRightBorderStyle;\n      border-right: 0;\n    "]))),
        liveButton: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_2 || (templateObject_2 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: liveButton;\n      transition: background-color 1s, border-color 1s, color 1s;\n      margin: 0;\n    "], ["\n      label: liveButton;\n      transition: background-color 1s, border-color 1s, color 1s;\n      margin: 0;\n    "]))),
        isLive: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_3 || (templateObject_3 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: isLive;\n      border-color: ", ";\n      color: ", ";\n      background: transparent;\n      &:focus {\n        border-color: ", ";\n        color: ", ";\n      }\n      &:active,\n      &:hover {\n        border-color: ", ";\n        color: ", ";\n      }\n    "], ["\n      label: isLive;\n      border-color: ", ";\n      color: ", ";\n      background: transparent;\n      &:focus {\n        border-color: ", ";\n        color: ", ";\n      }\n      &:active,\n      &:hover {\n        border-color: ", ";\n        color: ", ";\n      }\n    "])), orange, orange, orange, orange, orangeLighter, orangeLighter),
        isPaused: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_4 || (templateObject_4 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: isPaused;\n      border-color: ", ";\n      background: transparent;\n      animation: pulse 3s ease-out 0s infinite normal forwards;\n      &:focus {\n        border-color: ", ";\n      }\n      &:active,\n      &:hover {\n        border-color: ", ";\n      }\n      @keyframes pulse {\n        0% {\n          color: ", ";\n        }\n        50% {\n          color: ", ";\n        }\n        100% {\n          color: ", ";\n        }\n      }\n    "], ["\n      label: isPaused;\n      border-color: ", ";\n      background: transparent;\n      animation: pulse 3s ease-out 0s infinite normal forwards;\n      &:focus {\n        border-color: ", ";\n      }\n      &:active,\n      &:hover {\n        border-color: ", ";\n      }\n      @keyframes pulse {\n        0% {\n          color: ", ";\n        }\n        50% {\n          color: ", ";\n        }\n        100% {\n          color: ", ";\n        }\n      }\n    "])), orange, orange, orangeLighter, pulseTextColor, orange, pulseTextColor),
        stopButtonEnter: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_5 || (templateObject_5 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: stopButtonEnter;\n      width: 0;\n      opacity: 0;\n      overflow: hidden;\n    "], ["\n      label: stopButtonEnter;\n      width: 0;\n      opacity: 0;\n      overflow: hidden;\n    "]))),
        stopButtonEnterActive: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_6 || (templateObject_6 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: stopButtonEnterActive;\n      opacity: 1;\n      width: 32px;\n      transition: opacity 500ms ease-in 50ms, width 500ms ease-in 50ms;\n    "], ["\n      label: stopButtonEnterActive;\n      opacity: 1;\n      width: 32px;\n      transition: opacity 500ms ease-in 50ms, width 500ms ease-in 50ms;\n    "]))),
        stopButtonExit: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_7 || (templateObject_7 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: stopButtonExit;\n      width: 32px;\n      opacity: 1;\n      overflow: hidden;\n    "], ["\n      label: stopButtonExit;\n      width: 32px;\n      opacity: 1;\n      overflow: hidden;\n    "]))),
        stopButtonExitActive: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_8 || (templateObject_8 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: stopButtonExitActive;\n      opacity: 0;\n      width: 0;\n      transition: opacity 500ms ease-in 50ms, width 500ms ease-in 50ms;\n    "], ["\n      label: stopButtonExitActive;\n      opacity: 0;\n      width: 0;\n      transition: opacity 500ms ease-in 50ms, width 500ms ease-in 50ms;\n    "]))),
    };
});
function LiveTailButton(props) {
    var _a;
    var start = props.start, pause = props.pause, resume = props.resume, isLive = props.isLive, isPaused = props.isPaused, stop = props.stop;
    var theme = Object(_grafana_ui__WEBPACK_IMPORTED_MODULE_7__["useTheme"])();
    var styles = getStyles(theme);
    var onClickMain = isLive ? (isPaused ? resume : pause) : start;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('btn navbar-button', styles.liveButton, (_a = {},
                _a["btn--radius-right-0 " + styles.noRightBorderStyle] = isLive,
                _a[styles.isLive] = isLive && !isPaused,
                _a[styles.isPaused] = isLive && isPaused,
                _a)), onClick: onClickMain },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('fa', isPaused || !isLive ? 'fa-play' : 'fa-pause') }),
            "\u00A0 Live tailing"),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_6__["CSSTransition"], { mountOnEnter: true, unmountOnExit: true, timeout: 500, in: isLive, classNames: {
                enter: styles.stopButtonEnter,
                enterActive: styles.stopButtonEnterActive,
                exit: styles.stopButtonExit,
                exitActive: styles.stopButtonExitActive,
            } },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null,
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button navbar-button--attached " + styles.isLive, onClick: stop },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: 'fa fa-stop' }))))));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8;


/***/ }),

/***/ "./public/app/features/explore/Logs.tsx":
/*!**********************************************!*\
  !*** ./public/app/features/explore/Logs.tsx ***!
  \**********************************************/
/*! exports provided: Logs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logs", function() { return Logs; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _ExploreGraphPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ExploreGraphPanel */ "./public/app/features/explore/ExploreGraphPanel.tsx");





function renderMetaItem(value, kind) {
    if (kind === _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsMetaKind"].LabelsMap) {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-meta-item__labels" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LogLabels"], { labels: value, plain: true, getRows: function () { return []; } })));
    }
    return value;
}
var Logs = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Logs, _super);
    function Logs() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showLabels: false,
            showTime: true,
        };
        _this.onChangeDedup = function (dedup) {
            var onDedupStrategyChange = _this.props.onDedupStrategyChange;
            if (_this.props.dedupStrategy === dedup) {
                return onDedupStrategyChange(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsDedupStrategy"].none);
            }
            return onDedupStrategyChange(dedup);
        };
        _this.onChangeLabels = function (event) {
            var target = event && event.target;
            if (target) {
                _this.setState({
                    showLabels: target.checked,
                });
            }
        };
        _this.onChangeTime = function (event) {
            var target = event && event.target;
            if (target) {
                _this.setState({
                    showTime: target.checked,
                });
            }
        };
        _this.onToggleLogLevel = function (hiddenRawLevels) {
            var hiddenLogLevels = hiddenRawLevels.map(function (level) { return _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogLevel"][level]; });
            _this.props.onToggleLogLevel(hiddenLogLevels);
        };
        _this.onClickScan = function (event) {
            event.preventDefault();
            if (_this.props.onStartScanning) {
                _this.props.onStartScanning();
            }
        };
        _this.onClickStopScan = function (event) {
            event.preventDefault();
            if (_this.props.onStopScanning) {
                _this.props.onStopScanning();
            }
        };
        return _this;
    }
    Logs.prototype.render = function () {
        var _this = this;
        var _a = this.props, data = _a.data, highlighterExpressions = _a.highlighterExpressions, _b = _a.loading, loading = _b === void 0 ? false : _b, onClickLabel = _a.onClickLabel, timeZone = _a.timeZone, scanning = _a.scanning, scanRange = _a.scanRange, width = _a.width, dedupedData = _a.dedupedData, absoluteRange = _a.absoluteRange, onChangeTime = _a.onChangeTime;
        if (!data) {
            return null;
        }
        var _c = this.state, showLabels = _c.showLabels, showTime = _c.showTime;
        var dedupStrategy = this.props.dedupStrategy;
        var hasData = data && data.rows && data.rows.length > 0;
        var dedupCount = dedupedData
            ? dedupedData.rows.reduce(function (sum, row) { return (row.duplicates ? sum + row.duplicates : sum); }, 0)
            : 0;
        var meta = data && data.meta ? tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](data.meta) : [];
        if (dedupStrategy !== _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsDedupStrategy"].none) {
            meta.push({
                label: 'Dedup count',
                value: dedupCount,
                kind: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsMetaKind"].Number,
            });
        }
        var scanText = scanRange ? "Scanning " + _grafana_data__WEBPACK_IMPORTED_MODULE_2__["rangeUtil"].describeTimeRange(scanRange) : 'Scanning...';
        var series = data && data.series ? data.series : [];
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-graph" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ExploreGraphPanel__WEBPACK_IMPORTED_MODULE_4__["ExploreGraphPanel"], { series: series, width: width, onHiddenSeriesChanged: this.onToggleLogLevel, loading: loading, absoluteRange: absoluteRange, isStacked: true, showPanel: false, showingGraph: true, showingTable: true, timeZone: timeZone, showBars: true, showLines: false, onUpdateTimeRange: onChangeTime })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-options" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-controls" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], { label: "Time", checked: showTime, onChange: this.onChangeTime, transparent: true }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["Switch"], { label: "Labels", checked: showLabels, onChange: this.onChangeLabels, transparent: true }),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["ToggleButtonGroup"], { label: "Dedup", transparent: true }, Object.keys(_grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsDedupStrategy"]).map(function (dedupType, i) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["ToggleButton"], { key: i, value: dedupType, onChange: _this.onChangeDedup, selected: dedupStrategy === dedupType, 
                        // @ts-ignore
                        tooltip: _grafana_data__WEBPACK_IMPORTED_MODULE_2__["LogsDedupDescription"][dedupType] }, dedupType)); })))),
            hasData && meta && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-meta" }, meta.map(function (item) { return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-meta__item", key: item.label },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-panel-meta__label" },
                    item.label,
                    ":"),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "logs-panel-meta__value" }, renderMetaItem(item.value, item.kind)))); }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LogRows"], { data: data, deduplicatedData: dedupedData, dedupStrategy: dedupStrategy, getRowContext: this.props.getRowContext, highlighterExpressions: highlighterExpressions, onClickLabel: onClickLabel, rowLimit: data ? data.rows.length : undefined, showLabels: showLabels, showTime: showTime, timeZone: timeZone }),
            !loading && !hasData && !scanning && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-nodata" },
                "No logs found.",
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "link", onClick: this.onClickScan }, "Scan for older logs"))),
            scanning && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "logs-panel-nodata" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", null, scanText),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "link", onClick: this.onClickStopScan }, "Stop scan")))));
    };
    return Logs;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));



/***/ }),

/***/ "./public/app/features/explore/LogsContainer.tsx":
/*!*******************************************************!*\
  !*** ./public/app/features/explore/LogsContainer.tsx ***!
  \*******************************************************/
/*! exports provided: LogsContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsContainer", function() { return LogsContainer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var app_features_explore_state_actionTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/features/explore/state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var app_features_explore_state_selectors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/features/explore/state/selectors */ "./public/app/features/explore/state/selectors.ts");
/* harmony import */ var _profile_state_selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../profile/state/selectors */ "./public/app/features/profile/state/selectors.ts");
/* harmony import */ var _LiveLogs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./LiveLogs */ "./public/app/features/explore/LiveLogs.tsx");
/* harmony import */ var _Logs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Logs */ "./public/app/features/explore/Logs.tsx");
/* harmony import */ var _utils_LogsCrossFadeTransition__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/LogsCrossFadeTransition */ "./public/app/features/explore/utils/LogsCrossFadeTransition.tsx");













var LogsContainer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](LogsContainer, _super);
    function LogsContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChangeTime = function (absoluteRange) {
            var _a = _this.props, exploreId = _a.exploreId, updateTimeRange = _a.updateTimeRange;
            updateTimeRange({ exploreId: exploreId, absoluteRange: absoluteRange });
        };
        _this.onStopLive = function () {
            var exploreId = _this.props.exploreId;
            _this.onPause();
            _this.props.stopLive({ exploreId: exploreId, refreshInterval: _grafana_ui__WEBPACK_IMPORTED_MODULE_4__["RefreshPicker"].offOption.value });
        };
        _this.onPause = function () {
            var exploreId = _this.props.exploreId;
            _this.props.setPausedStateAction({ exploreId: exploreId, isPaused: true });
        };
        _this.onResume = function () {
            var exploreId = _this.props.exploreId;
            _this.props.setPausedStateAction({ exploreId: exploreId, isPaused: false });
        };
        _this.handleDedupStrategyChange = function (dedupStrategy) {
            _this.props.changeDedupStrategy(_this.props.exploreId, dedupStrategy);
        };
        _this.handleToggleLogLevel = function (hiddenLogLevels) {
            var exploreId = _this.props.exploreId;
            _this.props.toggleLogLevelAction({
                exploreId: exploreId,
                hiddenLogLevels: hiddenLogLevels,
            });
        };
        _this.getLogRowContext = function (row, options) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, Promise, function () {
            var datasourceInstance;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                datasourceInstance = this.props.datasourceInstance;
                if (datasourceInstance) {
                    return [2 /*return*/, datasourceInstance.getLogRowContext(row, options)];
                }
                return [2 /*return*/, []];
            });
        }); };
        return _this;
    }
    LogsContainer.prototype.render = function () {
        var _a = this.props, loading = _a.loading, logsHighlighterExpressions = _a.logsHighlighterExpressions, logsResult = _a.logsResult, dedupedResult = _a.dedupedResult, onClickLabel = _a.onClickLabel, onStartScanning = _a.onStartScanning, onStopScanning = _a.onStopScanning, absoluteRange = _a.absoluteRange, timeZone = _a.timeZone, scanning = _a.scanning, range = _a.range, width = _a.width, isLive = _a.isLive;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_LogsCrossFadeTransition__WEBPACK_IMPORTED_MODULE_12__["LogsCrossFadeTransition"], { visible: isLive },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { label: "Logs", loading: false, isOpen: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_LiveLogs__WEBPACK_IMPORTED_MODULE_10__["LiveLogsWithTheme"], { logsResult: logsResult, timeZone: timeZone, stopLive: this.onStopLive, isPaused: this.props.isPaused, onPause: this.onPause, onResume: this.onResume }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_utils_LogsCrossFadeTransition__WEBPACK_IMPORTED_MODULE_12__["LogsCrossFadeTransition"], { visible: !isLive },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { label: "Logs", loading: loading, isOpen: true },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Logs__WEBPACK_IMPORTED_MODULE_11__["Logs"], { dedupStrategy: this.props.dedupStrategy || _grafana_data__WEBPACK_IMPORTED_MODULE_5__["LogsDedupStrategy"].none, data: logsResult, dedupedData: dedupedResult, highlighterExpressions: logsHighlighterExpressions, loading: loading, onChangeTime: this.onChangeTime, onClickLabel: onClickLabel, onStartScanning: onStartScanning, onStopScanning: onStopScanning, onDedupStrategyChange: this.handleDedupStrategyChange, onToggleLogLevel: this.handleToggleLogLevel, absoluteRange: absoluteRange, timeZone: timeZone, scanning: scanning, scanRange: range.raw, width: width, getRowContext: this.getLogRowContext })))));
    };
    return LogsContainer;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId;
    var explore = state.explore;
    // @ts-ignore
    var item = explore[exploreId];
    var logsHighlighterExpressions = item.logsHighlighterExpressions, logsResult = item.logsResult, loading = item.loading, scanning = item.scanning, datasourceInstance = item.datasourceInstance, isLive = item.isLive, isPaused = item.isPaused, range = item.range, absoluteRange = item.absoluteRange;
    var dedupStrategy = Object(app_features_explore_state_selectors__WEBPACK_IMPORTED_MODULE_8__["exploreItemUIStateSelector"])(item).dedupStrategy;
    var dedupedResult = Object(app_features_explore_state_selectors__WEBPACK_IMPORTED_MODULE_8__["deduplicatedLogsSelector"])(item);
    var timeZone = Object(_profile_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getTimeZone"])(state.user);
    return {
        loading: loading,
        logsHighlighterExpressions: logsHighlighterExpressions,
        logsResult: logsResult,
        scanning: scanning,
        timeZone: timeZone,
        dedupStrategy: dedupStrategy,
        dedupedResult: dedupedResult,
        datasourceInstance: datasourceInstance,
        isLive: isLive,
        isPaused: isPaused,
        range: range,
        absoluteRange: absoluteRange,
    };
}
var mapDispatchToProps = {
    changeDedupStrategy: _state_actions__WEBPACK_IMPORTED_MODULE_6__["changeDedupStrategy"],
    toggleLogLevelAction: app_features_explore_state_actionTypes__WEBPACK_IMPORTED_MODULE_7__["toggleLogLevelAction"],
    stopLive: app_features_explore_state_actionTypes__WEBPACK_IMPORTED_MODULE_7__["changeRefreshIntervalAction"],
    updateTimeRange: _state_actions__WEBPACK_IMPORTED_MODULE_6__["updateTimeRange"],
    setPausedStateAction: app_features_explore_state_actionTypes__WEBPACK_IMPORTED_MODULE_7__["setPausedStateAction"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(LogsContainer)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/NoDataSourceCallToAction.tsx":
/*!******************************************************************!*\
  !*** ./public/app/features/explore/NoDataSourceCallToAction.tsx ***!
  \******************************************************************/
/*! exports provided: NoDataSourceCallToAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoDataSourceCallToAction", function() { return NoDataSourceCallToAction; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");




var NoDataSourceCallToAction = function () {
    var theme = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["ThemeContext"]);
    var message = 'Explore requires at least one data source. Once you have added a data source, you can query it here.';
    var footer = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-rocket" }),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, " ProTip: You can also define data sources through configuration files. "),
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: "http://docs.grafana.org/administration/provisioning/#datasources?utm_source=explore", target: "_blank", rel: "noopener", className: "text-link" }, "Learn more")));
    var ctaElement = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["LinkButton"], { size: "lg", href: "/datasources/new", icon: "gicon gicon-datasources" }, "Add data source"));
    var cardClassName = Object(emotion__WEBPACK_IMPORTED_MODULE_2__["css"])(templateObject_1 || (templateObject_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n    max-width: ", ";\n    margin-top: ", ";\n    align-self: center;\n  "], ["\n    max-width: ", ";\n    margin-top: ", ";\n    align-self: center;\n  "])), theme.breakpoints.lg, theme.spacing.md);
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_3__["CallToActionCard"], { callToActionElement: ctaElement, className: cardClassName, footer: footer, message: message, theme: theme }));
};
var templateObject_1;


/***/ }),

/***/ "./public/app/features/explore/QueryEditor.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/explore/QueryEditor.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/runtime */ "./packages/grafana-runtime/src/index.ts");
/* harmony import */ var app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/features/dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var app_features_plugins_plugin_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/plugins/plugin_loader */ "./public/app/features/plugins/plugin_loader.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");

// Libraries

// Services




var QueryEditor = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryEditor, _super);
    function QueryEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryEditor.prototype.componentDidMount = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var _a, datasource, initialQuery, exploreEvents, range, loader, template, target, scopeProps;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_b) {
                if (!this.element) {
                    return [2 /*return*/];
                }
                _a = this.props, datasource = _a.datasource, initialQuery = _a.initialQuery, exploreEvents = _a.exploreEvents, range = _a.range;
                this.initTimeSrv(range);
                loader = Object(_grafana_runtime__WEBPACK_IMPORTED_MODULE_2__["getAngularLoader"])();
                template = '<plugin-component type="query-ctrl"> </plugin-component>';
                target = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ datasource: datasource.name }, initialQuery);
                scopeProps = {
                    ctrl: {
                        datasource: datasource,
                        target: target,
                        refresh: function () {
                            setTimeout(function () {
                                _this.props.onQueryChange(target);
                                _this.props.onExecuteQuery();
                            }, 1);
                        },
                        onQueryChange: function () {
                            setTimeout(function () {
                                _this.props.onQueryChange(target);
                            }, 1);
                        },
                        events: exploreEvents,
                        panel: { datasource: datasource, targets: [target] },
                        dashboard: {},
                    },
                };
                this.component = loader.load(this.element, scopeProps, template);
                this.angularScope = scopeProps.ctrl;
                setTimeout(function () {
                    _this.props.onQueryChange(target);
                    _this.props.onExecuteQuery();
                }, 1);
                return [2 /*return*/];
            });
        });
    };
    QueryEditor.prototype.componentDidUpdate = function (prevProps) {
        var hasToggledEditorMode = prevProps.textEditModeEnabled !== this.props.textEditModeEnabled;
        var hasNewError = prevProps.error !== this.props.error;
        if (this.component) {
            if (hasToggledEditorMode && this.angularScope && this.angularScope.toggleEditorMode) {
                this.angularScope.toggleEditorMode();
            }
            if (hasNewError || hasToggledEditorMode) {
                // Some query controllers listen to data error events and need a digest
                // for some reason this needs to be done in next tick
                setTimeout(this.component.digest);
            }
        }
    };
    QueryEditor.prototype.componentWillUnmount = function () {
        if (this.component) {
            this.component.destroy();
        }
    };
    QueryEditor.prototype.initTimeSrv = function (range) {
        var timeSrv = Object(app_features_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_3__["getTimeSrv"])();
        timeSrv.init({
            time: {
                from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["dateTime"])(range.from),
                to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_5__["dateTime"])(range.to),
            },
            refresh: false,
            getTimezone: function () { return 'utc'; },
            timeRangeUpdated: function () { return console.log('refreshDashboard!'); },
        });
    };
    QueryEditor.prototype.render = function () {
        var _this = this;
        return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-query", ref: function (element) { return (_this.element = element); }, style: { width: '100%' } });
    };
    return QueryEditor;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (QueryEditor);


/***/ }),

/***/ "./public/app/features/explore/QueryRow.tsx":
/*!**************************************************!*\
  !*** ./public/app/features/explore/QueryRow.tsx ***!
  \**************************************************/
/*! exports provided: QueryRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueryRow", function() { return QueryRow; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/has */ "./node_modules/lodash/has.js");
/* harmony import */ var lodash_has__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_has__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _QueryEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./QueryEditor */ "./public/app/features/explore/QueryEditor.tsx");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _state_actionTypes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var _QueryStatus__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./QueryStatus */ "./public/app/features/explore/QueryStatus.tsx");

// Libraries




// @ts-ignore

// Components

// Actions





var QueryRow = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryRow, _super);
    function QueryRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            textEditModeEnabled: false,
        };
        _this.onRunQuery = function () {
            var exploreId = _this.props.exploreId;
            _this.props.runQueries(exploreId);
        };
        _this.onChange = function (query, override) {
            var _a = _this.props, datasourceInstance = _a.datasourceInstance, exploreId = _a.exploreId, index = _a.index;
            _this.props.changeQuery(exploreId, query, index, override);
            if (query && !override && datasourceInstance.getHighlighterExpression && index === 0) {
                // Live preview of log search matches. Only use on first row for now
                _this.updateLogsHighlights(query);
            }
        };
        _this.onClickAddButton = function () {
            var _a = _this.props, exploreId = _a.exploreId, index = _a.index;
            _this.props.addQueryRow(exploreId, index);
        };
        _this.onClickClearButton = function () {
            _this.onChange(null, true);
        };
        _this.onClickHintFix = function (action) {
            var _a = _this.props, datasourceInstance = _a.datasourceInstance, exploreId = _a.exploreId, index = _a.index;
            if (datasourceInstance && datasourceInstance.modifyQuery) {
                var modifier = function (queries, action) { return datasourceInstance.modifyQuery(queries, action); };
                _this.props.modifyQueries(exploreId, action, index, modifier);
            }
        };
        _this.onClickRemoveButton = function () {
            var _a = _this.props, exploreId = _a.exploreId, index = _a.index;
            _this.props.removeQueryRowAction({ exploreId: exploreId, index: index });
            _this.props.runQueries(exploreId);
        };
        _this.onClickToggleEditorMode = function () {
            _this.setState({ textEditModeEnabled: !_this.state.textEditModeEnabled });
        };
        _this.updateLogsHighlights = lodash_debounce__WEBPACK_IMPORTED_MODULE_2___default()(function (value) {
            var datasourceInstance = _this.props.datasourceInstance;
            if (datasourceInstance.getHighlighterExpression) {
                var exploreId = _this.props.exploreId;
                var expressions = datasourceInstance.getHighlighterExpression(value);
                _this.props.highlightLogsExpressionAction({ exploreId: exploreId, expressions: expressions });
            }
        }, 500);
        return _this;
    }
    QueryRow.prototype.componentWillUnmount = function () {
        console.log('QueryRow will unmount');
    };
    QueryRow.prototype.render = function () {
        var _a = this.props, datasourceInstance = _a.datasourceInstance, history = _a.history, query = _a.query, exploreEvents = _a.exploreEvents, range = _a.range, absoluteRange = _a.absoluteRange, datasourceStatus = _a.datasourceStatus, queryResponse = _a.queryResponse, latency = _a.latency, mode = _a.mode;
        var canToggleEditorModes = mode === app_types_explore__WEBPACK_IMPORTED_MODULE_9__["ExploreMode"].Metrics && lodash_has__WEBPACK_IMPORTED_MODULE_3___default()(datasourceInstance, 'components.QueryCtrl.prototype.toggleEditorMode');
        var queryErrors = queryResponse.error && queryResponse.error.refId === query.refId ? [queryResponse.error] : [];
        var QueryField;
        if (mode === app_types_explore__WEBPACK_IMPORTED_MODULE_9__["ExploreMode"].Metrics && datasourceInstance.components.ExploreMetricsQueryField) {
            QueryField = datasourceInstance.components.ExploreMetricsQueryField;
        }
        else if (mode === app_types_explore__WEBPACK_IMPORTED_MODULE_9__["ExploreMode"].Logs && datasourceInstance.components.ExploreLogsQueryField) {
            QueryField = datasourceInstance.components.ExploreLogsQueryField;
        }
        else {
            QueryField = datasourceInstance.components.ExploreQueryField;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row-field flex-shrink-1" }, QueryField ? (
            //@ts-ignore
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(QueryField, { datasource: datasourceInstance, datasourceStatus: datasourceStatus, query: query, history: history, onRunQuery: this.onRunQuery, onHint: this.onClickHintFix, onChange: this.onChange, panelData: null, queryResponse: queryResponse, absoluteRange: absoluteRange })) : (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryEditor__WEBPACK_IMPORTED_MODULE_6__["default"], { error: queryErrors, datasource: datasourceInstance, onQueryChange: this.onChange, onExecuteQuery: this.onRunQuery, initialQuery: query, exploreEvents: exploreEvents, range: range, textEditModeEnabled: this.state.textEditModeEnabled }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-row-status" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryStatus__WEBPACK_IMPORTED_MODULE_11__["default"], { queryResponse: queryResponse, latency: latency })),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form-inline flex-shrink-0" },
                canToggleEditorModes && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "gf-form-label gf-form-label--btn", onClick: this.onClickToggleEditorMode },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-pencil" })))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "gf-form-label gf-form-label--btn", onClick: this.onClickClearButton },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-times" }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "gf-form-label gf-form-label--btn", onClick: this.onClickAddButton },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-plus" }))),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "gf-form-label gf-form-label--btn", onClick: this.onClickRemoveButton },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "fa fa-minus" }))))));
    };
    return QueryRow;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId, index = _a.index;
    var explore = state.explore;
    var item = explore[exploreId];
    var datasourceInstance = item.datasourceInstance, history = item.history, queries = item.queries, range = item.range, absoluteRange = item.absoluteRange, datasourceError = item.datasourceError, latency = item.latency, mode = item.mode, queryResponse = item.queryResponse;
    var query = queries[index];
    var datasourceStatus = datasourceError ? _grafana_ui__WEBPACK_IMPORTED_MODULE_8__["DataSourceStatus"].Disconnected : _grafana_ui__WEBPACK_IMPORTED_MODULE_8__["DataSourceStatus"].Connected;
    return {
        datasourceInstance: datasourceInstance,
        history: history,
        query: query,
        range: range,
        absoluteRange: absoluteRange,
        datasourceStatus: datasourceStatus,
        queryResponse: queryResponse,
        latency: latency,
        mode: mode,
    };
}
var mapDispatchToProps = {
    addQueryRow: _state_actions__WEBPACK_IMPORTED_MODULE_7__["addQueryRow"],
    changeQuery: _state_actions__WEBPACK_IMPORTED_MODULE_7__["changeQuery"],
    highlightLogsExpressionAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_10__["highlightLogsExpressionAction"],
    modifyQueries: _state_actions__WEBPACK_IMPORTED_MODULE_7__["modifyQueries"],
    removeQueryRowAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_10__["removeQueryRowAction"],
    runQueries: _state_actions__WEBPACK_IMPORTED_MODULE_7__["runQueries"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_4__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(QueryRow)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/QueryRows.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/explore/QueryRows.tsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _QueryRow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./QueryRow */ "./public/app/features/explore/QueryRow.tsx");

// Libraries

// Components

var QueryRows = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryRows, _super);
    function QueryRows() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryRows.prototype.render = function () {
        var _a = this.props, _b = _a.className, className = _b === void 0 ? '' : _b, exploreEvents = _a.exploreEvents, exploreId = _a.exploreId, queryKeys = _a.queryKeys;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className }, queryKeys.map(function (key, index) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_QueryRow__WEBPACK_IMPORTED_MODULE_2__["default"], { key: key, exploreEvents: exploreEvents, exploreId: exploreId, index: index });
        })));
    };
    return QueryRows;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (QueryRows);


/***/ }),

/***/ "./public/app/features/explore/QueryStatus.tsx":
/*!*****************************************************!*\
  !*** ./public/app/features/explore/QueryStatus.tsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ElapsedTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ElapsedTime */ "./public/app/features/explore/ElapsedTime.tsx");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");




function formatLatency(value) {
    return (value / 1000).toFixed(1) + "s";
}
var QueryStatusItem = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryStatusItem, _super);
    function QueryStatusItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryStatusItem.prototype.render = function () {
        var _a = this.props, queryResponse = _a.queryResponse, latency = _a.latency;
        var className = queryResponse.state === _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].Done || _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].Error
            ? 'query-transaction'
            : 'query-transaction query-transaction--loading';
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: className },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-transaction__duration" }, queryResponse.state === _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].Done || _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].Error ? formatLatency(latency) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ElapsedTime__WEBPACK_IMPORTED_MODULE_2__["default"], null))));
    };
    return QueryStatusItem;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
var QueryStatus = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](QueryStatus, _super);
    function QueryStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryStatus.prototype.render = function () {
        var _a = this.props, queryResponse = _a.queryResponse, latency = _a.latency;
        if (queryResponse.state === _grafana_data__WEBPACK_IMPORTED_MODULE_3__["LoadingState"].NotStarted) {
            return null;
        }
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "query-transactions" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(QueryStatusItem, { queryResponse: queryResponse, latency: latency })));
    };
    return QueryStatus;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (QueryStatus);


/***/ }),

/***/ "./public/app/features/explore/ResponsiveButton.tsx":
/*!**********************************************************!*\
  !*** ./public/app/features/explore/ResponsiveButton.tsx ***!
  \**********************************************************/
/*! exports provided: IconSide, ResponsiveButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconSide", function() { return IconSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponsiveButton", function() { return ResponsiveButton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


var IconSide;
(function (IconSide) {
    IconSide["left"] = "left";
    IconSide["right"] = "right";
})(IconSide || (IconSide = {}));
var ResponsiveButton = function (props) {
    var defaultProps = {
        iconSide: IconSide.left,
    };
    props = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, defaultProps, props);
    var title = props.title, onClick = props.onClick, buttonClassName = props.buttonClassName, iconClassName = props.iconClassName, splitted = props.splitted, iconSide = props.iconSide, disabled = props.disabled;
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", { className: "btn navbar-button " + (buttonClassName ? buttonClassName : ''), onClick: onClick, disabled: disabled || false },
        iconClassName && iconSide === IconSide.left ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "" + iconClassName }),
            "\u00A0")) : null,
        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", { className: "btn-title" }, !splitted ? title : ''),
        iconClassName && iconSide === IconSide.right ? (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            "\u00A0",
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", { className: "" + iconClassName }))) : null));
};


/***/ }),

/***/ "./public/app/features/explore/RunButton.tsx":
/*!***************************************************!*\
  !*** ./public/app/features/explore/RunButton.tsx ***!
  \***************************************************/
/*! exports provided: RunButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RunButton", function() { return RunButton; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ResponsiveButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ResponsiveButton */ "./public/app/features/explore/ResponsiveButton.tsx");







var getStyles = Object(memoize_one__WEBPACK_IMPORTED_MODULE_3__["default"])(function () {
    return {
        selectButtonOverride: Object(emotion__WEBPACK_IMPORTED_MODULE_4__["css"])(templateObject_1 || (templateObject_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: selectButtonOverride;\n      .select-button-value {\n        color: white !important;\n      }\n    "], ["\n      label: selectButtonOverride;\n      .select-button-value {\n        color: white !important;\n      }\n    "]))),
    };
});
function RunButton(props) {
    var splitted = props.splitted, loading = props.loading, onRun = props.onRun, onChangeRefreshInterval = props.onChangeRefreshInterval, refreshInterval = props.refreshInterval, showDropdown = props.showDropdown;
    var styles = getStyles();
    var runButton = (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ResponsiveButton__WEBPACK_IMPORTED_MODULE_6__["ResponsiveButton"], { splitted: splitted, title: "Run Query", onClick: onRun, buttonClassName: classnames__WEBPACK_IMPORTED_MODULE_5___default()('navbar-button--secondary', { 'btn--radius-right-0': showDropdown }), iconClassName: loading ? 'fa fa-spinner fa-fw fa-spin run-icon' : 'fa fa-refresh fa-fw' }));
    if (showDropdown) {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_2__["RefreshPicker"], { onIntervalChanged: onChangeRefreshInterval, value: refreshInterval, buttonSelectClassName: "navbar-button--secondary " + styles.selectButtonOverride, refreshButton: runButton }));
    }
    return runButton;
}
var templateObject_1;


/***/ }),

/***/ "./public/app/features/explore/Table.tsx":
/*!***********************************************!*\
  !*** ./public/app/features/explore/Table.tsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-table */ "./node_modules/react-table/es/index.js");
/* harmony import */ var app_core_table_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/table_model */ "./public/app/core/table_model.ts");





var EMPTY_TABLE = new app_core_table_model__WEBPACK_IMPORTED_MODULE_4__["default"]();
// Identify columns that contain values
var VALUE_REGEX = /^[Vv]alue #\d+/;
function prepareRows(rows, columnNames) {
    return rows.map(function (cells) { return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.zipObject(columnNames, cells); });
}
var Table = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getCellProps = function (state, rowInfo, column) {
            return {
                onClick: function (e) {
                    // Only handle click on link, not the cell
                    if (e.target) {
                        var link = e.target;
                        if (link.className === 'link') {
                            var columnKey = column.Header().props.title;
                            var rowValue = rowInfo.row[columnKey];
                            _this.props.onClickCell(columnKey, rowValue);
                        }
                    }
                },
            };
        };
        return _this;
    }
    Table.prototype.render = function () {
        var _a = this.props, data = _a.data, loading = _a.loading;
        var tableModel = data || EMPTY_TABLE;
        var columnNames = tableModel.columns.map(function (_a) {
            var text = _a.text;
            return text;
        });
        var columns = tableModel.columns.map(function (_a) {
            var filterable = _a.filterable, text = _a.text;
            return ({
                Header: function () { return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { title: text }, text); },
                accessor: text,
                className: VALUE_REGEX.test(text) ? 'text-right' : '',
                show: text !== 'Time',
                Cell: function (row) { return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", { className: filterable ? 'link' : '', title: text + ': ' + row.value }, typeof row.value === 'string' ? row.value : JSON.stringify(row.value))); },
            });
        });
        var noDataText = data ? 'The queries returned no data for a table.' : '';
        return (react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_table__WEBPACK_IMPORTED_MODULE_3__["default"], { columns: columns, data: tableModel.rows, getTdProps: this.getCellProps, loading: loading, minRows: 0, noDataText: noDataText, resolveData: function (data) { return prepareRows(data, columnNames); }, showPagination: Boolean(data) }));
    };
    return Table;
}(react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Table);


/***/ }),

/***/ "./public/app/features/explore/TableContainer.tsx":
/*!********************************************************!*\
  !*** ./public/app/features/explore/TableContainer.tsx ***!
  \********************************************************/
/*! exports provided: TableContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableContainer", function() { return TableContainer; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/explore/state/actions.ts");
/* harmony import */ var _Table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Table */ "./public/app/features/explore/Table.tsx");







var TableContainer = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TableContainer, _super);
    function TableContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickTableButton = function () {
            _this.props.toggleTable(_this.props.exploreId, _this.props.showingTable);
        };
        return _this;
    }
    TableContainer.prototype.render = function () {
        var _a = this.props, loading = _a.loading, onClickCell = _a.onClickCell, showingTable = _a.showingTable, tableResult = _a.tableResult;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_4__["Collapse"], { label: "Table", loading: loading, collapsible: true, isOpen: showingTable, onToggle: this.onClickTableButton }, tableResult && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Table__WEBPACK_IMPORTED_MODULE_6__["default"], { data: tableResult, loading: loading, onClickCell: onClickCell })));
    };
    return TableContainer;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state, _a) {
    var exploreId = _a.exploreId;
    var explore = state.explore;
    // @ts-ignore
    var item = explore[exploreId];
    var loadingInState = item.loading, showingTable = item.showingTable, tableResult = item.tableResult;
    var loading = tableResult && tableResult.rows.length > 0 ? false : loadingInState;
    return { loading: loading, showingTable: showingTable, tableResult: tableResult };
}
var mapDispatchToProps = {
    toggleTable: _state_actions__WEBPACK_IMPORTED_MODULE_5__["toggleTable"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(TableContainer)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/Wrapper.tsx":
/*!*************************************************!*\
  !*** ./public/app/features/explore/Wrapper.tsx ***!
  \*************************************************/
/*! exports provided: Wrapper, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Wrapper", function() { return Wrapper; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _Explore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Explore */ "./public/app/features/explore/Explore.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var _state_actionTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./state/actionTypes */ "./public/app/features/explore/state/actionTypes.ts");








var Wrapper = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](Wrapper, _super);
    function Wrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Wrapper.prototype.componentWillUnmount = function () {
        this.props.resetExploreAction({});
    };
    Wrapper.prototype.render = function () {
        var split = this.props.split;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-scrollbar-wrapper" },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["CustomScrollbar"], { autoHeightMin: '100%', autoHeightMax: '', className: "custom-scrollbar--page" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "explore-wrapper" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["ErrorBoundaryAlert"], { style: "page" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Explore__WEBPACK_IMPORTED_MODULE_5__["default"], { exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_4__["ExploreId"].left })),
                    split && (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_6__["ErrorBoundaryAlert"], { style: "page" },
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Explore__WEBPACK_IMPORTED_MODULE_5__["default"], { exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_4__["ExploreId"].right })))))));
    };
    return Wrapper;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]));

var mapStateToProps = function (state) {
    var split = state.explore.split;
    return { split: split };
};
var mapDispatchToProps = {
    resetExploreAction: _state_actionTypes__WEBPACK_IMPORTED_MODULE_7__["resetExploreAction"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(Wrapper)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/explore/state/actions.ts":
/*!******************************************************!*\
  !*** ./public/app/features/explore/state/actions.ts ***!
  \******************************************************/
/*! exports provided: addQueryRow, changeDatasource, changeMode, changeQuery, changeSize, updateTimeRange, changeRefreshInterval, clearQueries, clearOrigin, loadExploreDatasourcesAndSetDatasource, initializeExplore, loadDatasourceReady, importQueries, testDatasource, reconnectDatasource, loadDatasource, modifyQueries, runQueries, stateSave, updateTime, scanStart, setQueries, splitClose, splitOpen, toggleGraph, toggleTable, changeDedupStrategy, refreshExplore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addQueryRow", function() { return addQueryRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeDatasource", function() { return changeDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeMode", function() { return changeMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeQuery", function() { return changeQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeSize", function() { return changeSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTimeRange", function() { return updateTimeRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeRefreshInterval", function() { return changeRefreshInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearQueries", function() { return clearQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearOrigin", function() { return clearOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadExploreDatasourcesAndSetDatasource", function() { return loadExploreDatasourcesAndSetDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeExplore", function() { return initializeExplore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDatasourceReady", function() { return loadDatasourceReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importQueries", function() { return importQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testDatasource", function() { return testDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reconnectDatasource", function() { return reconnectDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadDatasource", function() { return loadDatasource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modifyQueries", function() { return modifyQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runQueries", function() { return runQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stateSave", function() { return stateSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateTime", function() { return updateTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scanStart", function() { return scanStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setQueries", function() { return setQueries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitClose", function() { return splitClose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "splitOpen", function() { return splitOpen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleGraph", function() { return toggleGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleTable", function() { return toggleTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeDedupStrategy", function() { return changeDedupStrategy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refreshExplore", function() { return refreshExplore; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var app_core_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/store */ "./public/app/core/store.ts");
/* harmony import */ var app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/features/plugins/datasource_srv */ "./public/app/features/plugins/datasource_srv.ts");
/* harmony import */ var app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/utils/explore */ "./public/app/core/utils/explore.ts");
/* harmony import */ var _grafana_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @grafana/data */ "./packages/grafana-data/src/index.ts");
/* harmony import */ var app_types_explore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/types/explore */ "./public/app/types/explore.ts");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./actionTypes */ "./public/app/features/explore/state/actionTypes.ts");
/* harmony import */ var app_features_profile_state_selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! app/features/profile/state/selectors */ "./public/app/features/profile/state/selectors.ts");
/* harmony import */ var _grafana_ui_src_components_RefreshPicker_RefreshPicker__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @grafana/ui/src/components/RefreshPicker/RefreshPicker */ "./packages/grafana-ui/src/components/RefreshPicker/RefreshPicker.tsx");
/* harmony import */ var app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/utils/timePicker */ "./public/app/core/utils/timePicker.ts");
/* harmony import */ var _core_actions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../core/actions */ "./public/app/core/actions/index.ts");
/* harmony import */ var _dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../dashboard/services/TimeSrv */ "./public/app/features/dashboard/services/TimeSrv.ts");
/* harmony import */ var _dashboard_state_runRequest__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../dashboard/state/runRequest */ "./public/app/features/dashboard/state/runRequest.ts");
var _this = undefined;

// Libraries


// Services & Utils












/**
 * Updates UI state and save it to the URL
 */
var updateExploreUIState = function (exploreId, uiStateFragment) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["updateUIStateAction"])(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({ exploreId: exploreId }, uiStateFragment)));
        dispatch(stateSave());
    };
};
/**
 * Adds a query row after the row with the given index.
 */
function addQueryRow(exploreId, index) {
    return function (dispatch, getState) {
        var queries = getState().explore[exploreId].queries;
        var query = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateEmptyQuery"])(queries, index);
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["addQueryRowAction"])({ exploreId: exploreId, index: index, query: query }));
    };
}
/**
 * Loads a new datasource identified by the given name.
 */
function changeDatasource(exploreId, datasource) {
    var _this = this;
    return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var newDataSourceInstance, currentDataSourceInstance, queries, orgId;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    newDataSourceInstance = null;
                    if (!!datasource) return [3 /*break*/, 2];
                    return [4 /*yield*/, Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_4__["getDatasourceSrv"])().get()];
                case 1:
                    newDataSourceInstance = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_4__["getDatasourceSrv"])().get(datasource)];
                case 3:
                    newDataSourceInstance = _a.sent();
                    _a.label = 4;
                case 4:
                    currentDataSourceInstance = getState().explore[exploreId].datasourceInstance;
                    queries = getState().explore[exploreId].queries;
                    orgId = getState().user.orgId;
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["updateDatasourceInstanceAction"])({ exploreId: exploreId, datasourceInstance: newDataSourceInstance }));
                    return [4 /*yield*/, dispatch(importQueries(exploreId, queries, currentDataSourceInstance, newDataSourceInstance))];
                case 5:
                    _a.sent();
                    if (getState().explore[exploreId].isLive) {
                        dispatch(changeRefreshInterval(exploreId, _grafana_ui_src_components_RefreshPicker_RefreshPicker__WEBPACK_IMPORTED_MODULE_10__["offOption"].value));
                    }
                    return [4 /*yield*/, dispatch(loadDatasource(exploreId, newDataSourceInstance, orgId))];
                case 6:
                    _a.sent();
                    dispatch(runQueries(exploreId));
                    return [2 /*return*/];
            }
        });
    }); };
}
/**
 * Change the display mode in Explore.
 */
function changeMode(exploreId, mode) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["clearQueriesAction"])({ exploreId: exploreId }));
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["changeModeAction"])({ exploreId: exploreId, mode: mode }));
    };
}
/**
 * Query change handler for the query row with the given index.
 * If `override` is reset the query modifications and run the queries. Use this to set queries via a link.
 */
function changeQuery(exploreId, query, index, override) {
    return function (dispatch, getState) {
        // Null query means reset
        if (query === null) {
            var queries = getState().explore[exploreId].queries;
            var _a = queries[index], refId = _a.refId, key = _a.key;
            query = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateNewKeyAndAddRefIdIfMissing"])({ refId: refId, key: key }, queries, index);
        }
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["changeQueryAction"])({ exploreId: exploreId, query: query, index: index, override: override }));
        if (override) {
            dispatch(runQueries(exploreId));
        }
    };
}
/**
 * Keep track of the Explore container size, in particular the width.
 * The width will be used to calculate graph intervals (number of datapoints).
 */
function changeSize(exploreId, _a) {
    var height = _a.height, width = _a.width;
    return Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["changeSizeAction"])({ exploreId: exploreId, height: height, width: width });
}
var updateTimeRange = function (options) {
    return function (dispatch) {
        dispatch(updateTime(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, options)));
        dispatch(runQueries(options.exploreId));
    };
};
/**
 * Change the refresh interval of Explore. Called from the Refresh picker.
 */
function changeRefreshInterval(exploreId, refreshInterval) {
    return Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["changeRefreshIntervalAction"])({ exploreId: exploreId, refreshInterval: refreshInterval });
}
/**
 * Clear all queries and results.
 */
function clearQueries(exploreId) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["scanStopAction"])({ exploreId: exploreId }));
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["clearQueriesAction"])({ exploreId: exploreId }));
        dispatch(stateSave());
    };
}
function clearOrigin() {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["clearOriginAction"])({ exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_7__["ExploreId"].left }));
    };
}
/**
 * Loads all explore data sources and sets the chosen datasource.
 * If there are no datasources a missing datasource action is dispatched.
 */
function loadExploreDatasourcesAndSetDatasource(exploreId, datasourceName) {
    return function (dispatch) {
        var exploreDatasources = Object(app_features_plugins_datasource_srv__WEBPACK_IMPORTED_MODULE_4__["getDatasourceSrv"])()
            .getExternal()
            .map(function (ds) {
            return ({
                value: ds.name,
                name: ds.name,
                meta: ds.meta,
            });
        });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["loadExploreDatasources"])({ exploreId: exploreId, exploreDatasources: exploreDatasources }));
        if (exploreDatasources.length >= 1) {
            dispatch(changeDatasource(exploreId, datasourceName));
        }
        else {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["loadDatasourceMissingAction"])({ exploreId: exploreId }));
        }
    };
}
/**
 * Initialize Explore state with state from the URL and the React component.
 * Call this only on components for with the Explore state has not been initialized.
 */
function initializeExplore(exploreId, datasourceName, queries, rawRange, mode, containerWidth, eventBridge, ui, originPanelId) {
    var _this = this;
    return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var timeZone, range;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            timeZone = Object(app_features_profile_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getTimeZone"])(getState().user);
            range = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["getTimeRange"])(timeZone, rawRange);
            dispatch(loadExploreDatasourcesAndSetDatasource(exploreId, datasourceName));
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["initializeExploreAction"])({
                exploreId: exploreId,
                containerWidth: containerWidth,
                eventBridge: eventBridge,
                queries: queries,
                range: range,
                mode: mode,
                ui: ui,
                originPanelId: originPanelId,
            }));
            dispatch(updateTime({ exploreId: exploreId }));
            return [2 /*return*/];
        });
    }); };
}
/**
 * Datasource loading was successfully completed.
 */
var loadDatasourceReady = function (exploreId, instance, orgId) {
    var historyKey = "grafana.explore.history." + instance.meta.id;
    var history = app_core_store__WEBPACK_IMPORTED_MODULE_3__["default"].getObject(historyKey, []);
    // Save last-used datasource
    app_core_store__WEBPACK_IMPORTED_MODULE_3__["default"].set(Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["lastUsedDatasourceKeyForOrgId"])(orgId), instance.name);
    return Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["loadDatasourceReadyAction"])({
        exploreId: exploreId,
        history: history,
    });
};
function importQueries(exploreId, queries, sourceDataSource, targetDataSource) {
    var _this = this;
    return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var importedQueries, nextQueries;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!sourceDataSource) {
                        // explore not initialized
                        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["queriesImportedAction"])({ exploreId: exploreId, queries: queries }));
                        return [2 /*return*/];
                    }
                    importedQueries = queries;
                    if (!(sourceDataSource.meta.id === targetDataSource.meta.id)) return [3 /*break*/, 1];
                    // Keep same queries if same type of datasource
                    importedQueries = tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"](queries);
                    return [3 /*break*/, 4];
                case 1:
                    if (!targetDataSource.importQueries) return [3 /*break*/, 3];
                    return [4 /*yield*/, targetDataSource.importQueries(queries, sourceDataSource.meta)];
                case 2:
                    // Datasource-specific importers
                    importedQueries = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    // Default is blank queries
                    importedQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["ensureQueries"])();
                    _a.label = 4;
                case 4:
                    nextQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["ensureQueries"])(importedQueries);
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["queriesImportedAction"])({ exploreId: exploreId, queries: nextQueries }));
                    return [2 /*return*/];
            }
        });
    }); };
}
/**
 * Tests datasource.
 */
var testDatasource = function (exploreId, instance) {
    return function (dispatch) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var datasourceError, testResult, error_1;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    datasourceError = null;
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["testDataSourcePendingAction"])({ exploreId: exploreId }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, instance.testDatasource()];
                case 2:
                    testResult = _a.sent();
                    datasourceError = testResult.status === 'success' ? null : testResult.message;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    datasourceError = (error_1 && error_1.statusText) || 'Network error';
                    return [3 /*break*/, 4];
                case 4:
                    if (datasourceError) {
                        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["testDataSourceFailureAction"])({ exploreId: exploreId, error: datasourceError }));
                        return [2 /*return*/];
                    }
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["testDataSourceSuccessAction"])({ exploreId: exploreId }));
                    return [2 /*return*/];
            }
        });
    }); };
};
/**
 * Reconnects datasource when there is a connection failure.
 */
var reconnectDatasource = function (exploreId) {
    return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var instance;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            instance = getState().explore[exploreId].datasourceInstance;
            dispatch(changeDatasource(exploreId, instance.name));
            return [2 /*return*/];
        });
    }); };
};
/**
 * Main action to asynchronously load a datasource. Dispatches lots of smaller actions for feedback.
 */
function loadDatasource(exploreId, instance, orgId) {
    var _this = this;
    return function (dispatch, getState) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
        var datasourceName;
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
            switch (_a.label) {
                case 0:
                    datasourceName = instance.name;
                    // Keep ID to track selection
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["loadDatasourcePendingAction"])({ exploreId: exploreId, requestedDatasourceName: datasourceName }));
                    return [4 /*yield*/, dispatch(testDatasource(exploreId, instance))];
                case 1:
                    _a.sent();
                    if (datasourceName !== getState().explore[exploreId].requestedDatasourceName) {
                        // User already changed datasource again, discard results
                        return [2 /*return*/];
                    }
                    if (instance.init) {
                        try {
                            instance.init();
                        }
                        catch (err) {
                            console.log(err);
                        }
                    }
                    if (datasourceName !== getState().explore[exploreId].requestedDatasourceName) {
                        // User already changed datasource again, discard results
                        return [2 /*return*/];
                    }
                    dispatch(loadDatasourceReady(exploreId, instance, orgId));
                    return [2 /*return*/];
            }
        });
    }); };
}
/**
 * Action to modify a query given a datasource-specific modifier action.
 * @param exploreId Explore area
 * @param modification Action object with a type, e.g., ADD_FILTER
 * @param index Optional query row index. If omitted, the modification is applied to all query rows.
 * @param modifier Function that executes the modification, typically `datasourceInstance.modifyQueries`.
 */
function modifyQueries(exploreId, modification, index, modifier) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["modifyQueriesAction"])({ exploreId: exploreId, modification: modification, index: index, modifier: modifier }));
        if (!modification.preventSubmit) {
            dispatch(runQueries(exploreId));
        }
    };
}
/**
 * Main action to run queries and dispatches sub-actions based on which result viewers are active
 */
function runQueries(exploreId) {
    return function (dispatch, getState) {
        dispatch(updateTime({ exploreId: exploreId }));
        var exploreItemState = getState().explore[exploreId];
        var datasourceInstance = exploreItemState.datasourceInstance, queries = exploreItemState.queries, datasourceError = exploreItemState.datasourceError, containerWidth = exploreItemState.containerWidth, live = exploreItemState.isLive, range = exploreItemState.range, scanning = exploreItemState.scanning, queryResponse = exploreItemState.queryResponse, querySubscription = exploreItemState.querySubscription, history = exploreItemState.history, mode = exploreItemState.mode, showingGraph = exploreItemState.showingGraph, showingTable = exploreItemState.showingTable;
        if (datasourceError) {
            // let's not run any queries if data source is in a faulty state
            return;
        }
        if (!Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["hasNonEmptyQuery"])(queries)) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["clearQueriesAction"])({ exploreId: exploreId }));
            dispatch(stateSave()); // Remember to save to state and update location
            return;
        }
        // Some datasource's query builders allow per-query interval limits,
        // but we're using the datasource interval limit for now
        var minInterval = datasourceInstance.interval;
        Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["stopQueryState"])(querySubscription);
        var queryOptions = {
            minInterval: minInterval,
            // This is used for logs streaming for buffer size, with undefined it falls back to datasource config if it
            // supports that.
            maxDataPoints: mode === app_types_explore__WEBPACK_IMPORTED_MODULE_7__["ExploreMode"].Logs ? undefined : containerWidth,
            liveStreaming: live,
            showingGraph: showingGraph,
            showingTable: showingTable,
        };
        var datasourceId = datasourceInstance.meta.id;
        var transaction = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["buildQueryTransaction"])(queries, queryOptions, range, scanning);
        var firstResponse = true;
        var newQuerySub = Object(_dashboard_state_runRequest__WEBPACK_IMPORTED_MODULE_14__["runRequest"])(datasourceInstance, transaction.request)
            .pipe(
        // Simple throttle for live tailing, in case of > 1000 rows per interval we spend about 200ms on processing and
        // rendering. In case this is optimized this can be tweaked, but also it should be only as fast as user
        // actually can see what is happening.
        live ? Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["throttleTime"])(500) : rxjs__WEBPACK_IMPORTED_MODULE_2__["identity"], Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (data) { return Object(_dashboard_state_runRequest__WEBPACK_IMPORTED_MODULE_14__["preProcessPanelData"])(data, queryResponse); }))
            .subscribe(function (data) {
            if (!data.error && firstResponse) {
                // Side-effect: Saving history in localstorage
                var nextHistory = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["updateHistory"])(history, datasourceId, queries);
                dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["historyUpdatedAction"])({ exploreId: exploreId, history: nextHistory }));
                dispatch(stateSave());
            }
            firstResponse = false;
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["queryStreamUpdatedAction"])({ exploreId: exploreId, response: data }));
            // Keep scanning for results if this was the last scanning transaction
            if (getState().explore[exploreId].scanning) {
                if (data.state === _grafana_data__WEBPACK_IMPORTED_MODULE_6__["LoadingState"].Done && data.series.length === 0) {
                    var range_1 = Object(app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_11__["getShiftedTimeRange"])(-1, getState().explore[exploreId].range);
                    dispatch(updateTime({ exploreId: exploreId, absoluteRange: range_1 }));
                    dispatch(runQueries(exploreId));
                }
                else {
                    // We can stop scanning if we have a result
                    dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["scanStopAction"])({ exploreId: exploreId }));
                }
            }
        });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["queryStoreSubscriptionAction"])({ exploreId: exploreId, querySubscription: newQuerySub }));
    };
}
var toRawTimeRange = function (range) {
    var from = range.raw.from;
    if (Object(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["isDateTime"])(from)) {
        from = from.valueOf().toString(10);
    }
    var to = range.raw.to;
    if (Object(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["isDateTime"])(to)) {
        to = to.valueOf().toString(10);
    }
    return {
        from: from,
        to: to,
    };
};
var stateSave = function () {
    return function (dispatch, getState) {
        var _a = getState().explore, left = _a.left, right = _a.right, split = _a.split;
        var orgId = getState().user.orgId.toString();
        var replace = left && left.urlReplaced === false;
        var urlStates = { orgId: orgId };
        var leftUrlState = {
            datasource: left.datasourceInstance.name,
            queries: left.queries.map(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["clearQueryKeys"]),
            range: toRawTimeRange(left.range),
            mode: left.mode,
            ui: {
                showingGraph: left.showingGraph,
                showingLogs: true,
                showingTable: left.showingTable,
                dedupStrategy: left.dedupStrategy,
            },
        };
        urlStates.left = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["serializeStateToUrlParam"])(leftUrlState, true);
        if (split) {
            var rightUrlState = {
                datasource: right.datasourceInstance.name,
                queries: right.queries.map(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["clearQueryKeys"]),
                range: toRawTimeRange(right.range),
                mode: right.mode,
                ui: {
                    showingGraph: right.showingGraph,
                    showingLogs: true,
                    showingTable: right.showingTable,
                    dedupStrategy: right.dedupStrategy,
                },
            };
            urlStates.right = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["serializeStateToUrlParam"])(rightUrlState, true);
        }
        dispatch(Object(_core_actions__WEBPACK_IMPORTED_MODULE_12__["updateLocation"])({ query: urlStates, replace: replace }));
        if (replace) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["setUrlReplacedAction"])({ exploreId: app_types_explore__WEBPACK_IMPORTED_MODULE_7__["ExploreId"].left }));
        }
    };
};
var updateTime = function (config) {
    return function (dispatch, getState) {
        var exploreId = config.exploreId, absRange = config.absoluteRange, actionRange = config.rawRange;
        var itemState = getState().explore[exploreId];
        var timeZone = Object(app_features_profile_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getTimeZone"])(getState().user);
        var rangeInState = itemState.range;
        var rawRange = rangeInState.raw;
        if (absRange) {
            rawRange = {
                from: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["dateTimeForTimeZone"])(timeZone, absRange.from),
                to: Object(_grafana_data__WEBPACK_IMPORTED_MODULE_6__["dateTimeForTimeZone"])(timeZone, absRange.to),
            };
        }
        if (actionRange) {
            rawRange = actionRange;
        }
        var range = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["getTimeRange"])(timeZone, rawRange);
        var absoluteRange = { from: range.from.valueOf(), to: range.to.valueOf() };
        Object(_dashboard_services_TimeSrv__WEBPACK_IMPORTED_MODULE_13__["getTimeSrv"])().init({
            time: range.raw,
            refresh: false,
            getTimezone: function () { return timeZone; },
            timeRangeUpdated: function () { return undefined; },
        });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["changeRangeAction"])({ exploreId: exploreId, range: range, absoluteRange: absoluteRange }));
    };
};
/**
 * Start a scan for more results using the given scanner.
 * @param exploreId Explore area
 * @param scanner Function that a) returns a new time range and b) triggers a query run for the new range
 */
function scanStart(exploreId) {
    return function (dispatch, getState) {
        // Register the scanner
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["scanStartAction"])({ exploreId: exploreId }));
        // Scanning must trigger query run, and return the new range
        var range = Object(app_core_utils_timePicker__WEBPACK_IMPORTED_MODULE_11__["getShiftedTimeRange"])(-1, getState().explore[exploreId].range);
        // Set the new range to be displayed
        dispatch(updateTime({ exploreId: exploreId, absoluteRange: range }));
        dispatch(runQueries(exploreId));
    };
}
/**
 * Reset queries to the given queries. Any modifications will be discarded.
 * Use this action for clicks on query examples. Triggers a query run.
 */
function setQueries(exploreId, rawQueries) {
    return function (dispatch, getState) {
        // Inject react keys into query objects
        var queries = getState().explore[exploreId].queries;
        var nextQueries = rawQueries.map(function (query, index) { return Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateNewKeyAndAddRefIdIfMissing"])(query, queries, index); });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["setQueriesAction"])({ exploreId: exploreId, queries: nextQueries }));
        dispatch(runQueries(exploreId));
    };
}
/**
 * Close the split view and save URL state.
 */
function splitClose(itemId) {
    return function (dispatch) {
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["splitCloseAction"])({ itemId: itemId }));
        dispatch(stateSave());
    };
}
/**
 * Open the split view and copy the left state to be the right state.
 * The right state is automatically initialized.
 * The copy keeps all query modifications but wipes the query results.
 */
function splitOpen() {
    return function (dispatch, getState) {
        // Clone left state to become the right state
        var leftState = getState().explore[app_types_explore__WEBPACK_IMPORTED_MODULE_7__["ExploreId"].left];
        var queryState = getState().location.query[app_types_explore__WEBPACK_IMPORTED_MODULE_7__["ExploreId"].left];
        var urlState = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["parseUrlState"])(queryState);
        var itemState = tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, leftState, { queries: leftState.queries.slice(), urlState: urlState });
        dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["splitOpenAction"])({ itemState: itemState }));
        dispatch(stateSave());
    };
}
/**
 * Creates action to collapse graph/logs/table panel. When panel is collapsed,
 * queries won't be run
 */
var togglePanelActionCreator = function (actionCreator) { return function (exploreId, isPanelVisible) {
    return function (dispatch) {
        var uiFragmentStateUpdate;
        var shouldRunQueries = !isPanelVisible;
        switch (actionCreator.type) {
            case _actionTypes__WEBPACK_IMPORTED_MODULE_8__["toggleGraphAction"].type:
                uiFragmentStateUpdate = { showingGraph: !isPanelVisible };
                break;
            case _actionTypes__WEBPACK_IMPORTED_MODULE_8__["toggleTableAction"].type:
                uiFragmentStateUpdate = { showingTable: !isPanelVisible };
                break;
        }
        dispatch(actionCreator({ exploreId: exploreId }));
        dispatch(updateExploreUIState(exploreId, uiFragmentStateUpdate));
        if (shouldRunQueries) {
            dispatch(runQueries(exploreId));
        }
    };
}; };
/**
 * Expand/collapse the graph result viewer. When collapsed, graph queries won't be run.
 */
var toggleGraph = togglePanelActionCreator(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["toggleGraphAction"]);
/**
 * Expand/collapse the table result viewer. When collapsed, table queries won't be run.
 */
var toggleTable = togglePanelActionCreator(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["toggleTableAction"]);
/**
 * Change logs deduplication strategy and update URL.
 */
var changeDedupStrategy = function (exploreId, dedupStrategy) {
    return function (dispatch) {
        dispatch(updateExploreUIState(exploreId, { dedupStrategy: dedupStrategy }));
    };
};
function refreshExplore(exploreId) {
    return function (dispatch, getState) {
        var itemState = getState().explore[exploreId];
        if (!itemState.initialized) {
            return;
        }
        var urlState = itemState.urlState, update = itemState.update, containerWidth = itemState.containerWidth, eventBridge = itemState.eventBridge;
        var datasource = urlState.datasource, queries = urlState.queries, urlRange = urlState.range, mode = urlState.mode, ui = urlState.ui, originPanelId = urlState.originPanelId;
        var refreshQueries = [];
        for (var index = 0; index < queries.length; index++) {
            var query = queries[index];
            refreshQueries.push(Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["generateNewKeyAndAddRefIdIfMissing"])(query, refreshQueries, index));
        }
        var timeZone = Object(app_features_profile_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getTimeZone"])(getState().user);
        var range = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["getTimeRangeFromUrl"])(urlRange, timeZone);
        // need to refresh datasource
        if (update.datasource) {
            var initialQueries = Object(app_core_utils_explore__WEBPACK_IMPORTED_MODULE_5__["ensureQueries"])(queries);
            dispatch(initializeExplore(exploreId, datasource, initialQueries, range, mode, containerWidth, eventBridge, ui, originPanelId));
            return;
        }
        if (update.range) {
            dispatch(updateTime({ exploreId: exploreId, rawRange: range.raw }));
        }
        // need to refresh ui state
        if (update.ui) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["updateUIStateAction"])(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, ui, { exploreId: exploreId })));
        }
        // need to refresh queries
        if (update.queries) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["setQueriesAction"])({ exploreId: exploreId, queries: refreshQueries }));
        }
        // need to refresh mode
        if (update.mode) {
            dispatch(Object(_actionTypes__WEBPACK_IMPORTED_MODULE_8__["changeModeAction"])({ exploreId: exploreId, mode: mode }));
        }
        // always run queries when refresh is needed
        if (update.queries || update.ui || update.range) {
            dispatch(runQueries(exploreId));
        }
    };
}


/***/ }),

/***/ "./public/app/features/explore/state/selectors.ts":
/*!********************************************************!*\
  !*** ./public/app/features/explore/state/selectors.ts ***!
  \********************************************************/
/*! exports provided: exploreItemUIStateSelector, deduplicatedLogsSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exploreItemUIStateSelector", function() { return exploreItemUIStateSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deduplicatedLogsSelector", function() { return deduplicatedLogsSelector; });
/* harmony import */ var app_core_utils_reselect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/utils/reselect */ "./public/app/core/utils/reselect.ts");
/* harmony import */ var app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/logs_model */ "./public/app/core/logs_model.ts");


var exploreItemUIStateSelector = function (itemState) {
    var showingGraph = itemState.showingGraph, showingTable = itemState.showingTable, showingStartPage = itemState.showingStartPage, dedupStrategy = itemState.dedupStrategy;
    return {
        showingGraph: showingGraph,
        showingTable: showingTable,
        showingStartPage: showingStartPage,
        dedupStrategy: dedupStrategy,
    };
};
var logsSelector = function (state) { return state.logsResult; };
var hiddenLogLevelsSelector = function (state) { return state.hiddenLogLevels; };
var dedupStrategySelector = function (state) { return state.dedupStrategy; };
var deduplicatedLogsSelector = Object(app_core_utils_reselect__WEBPACK_IMPORTED_MODULE_0__["createLodashMemoizedSelector"])(logsSelector, hiddenLogLevelsSelector, dedupStrategySelector, function (logs, hiddenLogLevels, dedupStrategy) {
    if (!logs) {
        return null;
    }
    var filteredData = Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__["filterLogLevels"])(logs, new Set(hiddenLogLevels));
    return Object(app_core_logs_model__WEBPACK_IMPORTED_MODULE_1__["dedupLogRows"])(filteredData, dedupStrategy);
});


/***/ }),

/***/ "./public/app/features/explore/utils/LogsCrossFadeTransition.tsx":
/*!***********************************************************************!*\
  !*** ./public/app/features/explore/utils/LogsCrossFadeTransition.tsx ***!
  \***********************************************************************/
/*! exports provided: LogsCrossFadeTransition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogsCrossFadeTransition", function() { return LogsCrossFadeTransition; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! memoize-one */ "./node_modules/memoize-one/dist/memoize-one.esm.js");
/* harmony import */ var emotion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! emotion */ "./node_modules/emotion/dist/index.esm.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-transition-group */ "./node_modules/react-transition-group/index.js");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_4__);





var transitionDuration = 500;
// We add a bit of delay to the transition as another perf optimisation. As at the start we need to render
// quite a bit of new rows, if we start transition at the same time there can be frame rate drop. This gives time
// for react to first render them and then do the animation.
var transitionDelay = 100;
var getStyles = Object(memoize_one__WEBPACK_IMPORTED_MODULE_2__["default"])(function () {
    return {
        logsEnter: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_1 || (templateObject_1 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: logsEnter;\n      position: absolute;\n      opacity: 0;\n      height: auto;\n      width: auto;\n    "], ["\n      label: logsEnter;\n      position: absolute;\n      opacity: 0;\n      height: auto;\n      width: auto;\n    "]))),
        logsEnterActive: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_2 || (templateObject_2 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: logsEnterActive;\n      opacity: 1;\n      transition: opacity ", "ms ease-out ", "ms;\n    "], ["\n      label: logsEnterActive;\n      opacity: 1;\n      transition: opacity ", "ms ease-out ", "ms;\n    "])), transitionDuration, transitionDelay),
        logsExit: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_3 || (templateObject_3 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: logsExit;\n      position: absolute;\n      opacity: 1;\n      height: auto;\n      width: auto;\n    "], ["\n      label: logsExit;\n      position: absolute;\n      opacity: 1;\n      height: auto;\n      width: auto;\n    "]))),
        logsExitActive: Object(emotion__WEBPACK_IMPORTED_MODULE_3__["css"])(templateObject_4 || (templateObject_4 = tslib__WEBPACK_IMPORTED_MODULE_0__["__makeTemplateObject"](["\n      label: logsExitActive;\n      opacity: 0;\n      transition: opacity ", "ms ease-out ", "ms;\n    "], ["\n      label: logsExitActive;\n      opacity: 0;\n      transition: opacity ", "ms ease-out ", "ms;\n    "])), transitionDuration, transitionDelay),
    };
});
/**
 * Cross fade transition component that is tied a bit too much to the logs containers so not very useful elsewhere
 * right now.
 */
function LogsCrossFadeTransition(props) {
    var visible = props.visible, children = props.children;
    var styles = getStyles();
    return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_transition_group__WEBPACK_IMPORTED_MODULE_4__["CSSTransition"], { in: visible, mountOnEnter: true, unmountOnExit: true, timeout: transitionDuration + transitionDelay, classNames: {
            enter: styles.logsEnter,
            enterActive: styles.logsEnterActive,
            exit: styles.logsExit,
            exitActive: styles.logsExitActive,
        } }, children));
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;


/***/ }),

/***/ "./public/app/features/profile/state/selectors.ts":
/*!********************************************************!*\
  !*** ./public/app/features/profile/state/selectors.ts ***!
  \********************************************************/
/*! exports provided: getTimeZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTimeZone", function() { return getTimeZone; });
var getTimeZone = function (state) { return state.timeZone; };


/***/ })

}]);
//# sourceMappingURL=explore.fb2366366adbbbf1d38b.js.map