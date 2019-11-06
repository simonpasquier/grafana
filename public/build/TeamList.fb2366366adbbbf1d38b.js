(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["TeamList"],{

/***/ "./public/app/features/teams/TeamList.tsx":
/*!************************************************!*\
  !*** ./public/app/features/teams/TeamList.tsx ***!
  \************************************************/
/*! exports provided: TeamList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamList", function() { return TeamList; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/components/Page/Page */ "./public/app/core/components/Page/Page.tsx");
/* harmony import */ var _grafana_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @grafana/ui */ "./packages/grafana-ui/src/index.ts");
/* harmony import */ var app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/EmptyListCTA/EmptyListCTA */ "./public/app/core/components/EmptyListCTA/EmptyListCTA.tsx");
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");
/* harmony import */ var _state_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./state/actions */ "./public/app/features/teams/state/actions.ts");
/* harmony import */ var _state_selectors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./state/selectors */ "./public/app/features/teams/state/selectors.ts");
/* harmony import */ var app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! app/core/selectors/navModel */ "./public/app/core/selectors/navModel.ts");
/* harmony import */ var app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! app/core/components/FilterInput/FilterInput */ "./public/app/core/components/FilterInput/FilterInput.tsx");
/* harmony import */ var app_core_config__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! app/core/config */ "./public/app/core/config.ts");
/* harmony import */ var app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! app/core/services/context_srv */ "./public/app/core/services/context_srv.ts");














var TeamList = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](TeamList, _super);
    function TeamList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.deleteTeam = function (team) {
            _this.props.deleteTeam(team.id);
        };
        _this.onSearchQueryChange = function (value) {
            _this.props.setSearchQuery(value);
        };
        return _this;
    }
    TeamList.prototype.componentDidMount = function () {
        this.fetchTeams();
    };
    TeamList.prototype.fetchTeams = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.loadTeams()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TeamList.prototype.renderTeam = function (team) {
        var _this = this;
        var _a = this.props, editorsCanAdmin = _a.editorsCanAdmin, signedInUser = _a.signedInUser;
        var permission = team.permission;
        var teamUrl = "org/teams/edit/" + team.id;
        var canDelete = Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["isPermissionTeamAdmin"])({ permission: permission, editorsCanAdmin: editorsCanAdmin, signedInUser: signedInUser });
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", { key: team.id },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "width-4 text-center link-td" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: teamUrl },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", { className: "filter-table__avatar", src: team.avatarUrl }))),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "link-td" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: teamUrl }, team.name)),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "link-td" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: teamUrl }, team.email)),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "link-td" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { href: teamUrl }, team.memberCount)),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("td", { className: "text-right" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_grafana_ui__WEBPACK_IMPORTED_MODULE_5__["DeleteButton"], { onConfirm: function () { return _this.deleteTeam(team); }, disabled: !canDelete }))));
    };
    TeamList.prototype.renderEmptyList = function () {
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_EmptyListCTA_EmptyListCTA__WEBPACK_IMPORTED_MODULE_6__["default"], { title: "You haven't created any teams yet.", buttonIcon: "gicon gicon-team", buttonLink: "org/teams/new", buttonTitle: " New team", proTip: "Assign folder and dashboard permissions to teams instead of users to ease administration.", proTipLink: "", proTipLinkTitle: "", proTipTarget: "_blank" }));
    };
    TeamList.prototype.renderTeamList = function () {
        var _this = this;
        var _a = this.props, teams = _a.teams, searchQuery = _a.searchQuery, editorsCanAdmin = _a.editorsCanAdmin, signedInUser = _a.signedInUser;
        var isCanAdminAndViewer = editorsCanAdmin && signedInUser.orgRole === app_types__WEBPACK_IMPORTED_MODULE_7__["OrgRole"].Viewer;
        var disabledClass = isCanAdminAndViewer ? ' disabled' : '';
        var newTeamHref = isCanAdminAndViewer ? '#' : 'org/teams/new';
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null,
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "gf-form gf-form--grow" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_FilterInput_FilterInput__WEBPACK_IMPORTED_MODULE_11__["FilterInput"], { labelClassName: "gf-form--has-input-icon gf-form--grow", inputClassName: "gf-form-input", placeholder: "Search teams", value: searchQuery, onChange: this.onSearchQueryChange })),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "page-action-bar__spacer" }),
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", { className: "btn btn-primary" + disabledClass, href: newTeamHref }, "New team")),
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", { className: "admin-list-table" },
                react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", { className: "filter-table filter-table--hover form-inline" },
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("thead", null,
                        react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null,
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Name"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Email"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, "Members"),
                            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", { style: { width: '1%' } }))),
                    react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, teams.map(function (team) { return _this.renderTeam(team); }))))));
    };
    TeamList.prototype.renderList = function () {
        var teamsCount = this.props.teamsCount;
        if (teamsCount > 0) {
            return this.renderTeamList();
        }
        else {
            return this.renderEmptyList();
        }
    };
    TeamList.prototype.render = function () {
        var _a = this.props, hasFetched = _a.hasFetched, navModel = _a.navModel;
        return (react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"], { navModel: navModel },
            react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(app_core_components_Page_Page__WEBPACK_IMPORTED_MODULE_4__["default"].Contents, { isLoading: !hasFetched }, hasFetched && this.renderList())));
    };
    return TeamList;
}(react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"]));

function mapStateToProps(state) {
    return {
        navModel: Object(app_core_selectors_navModel__WEBPACK_IMPORTED_MODULE_10__["getNavModel"])(state.navIndex, 'teams'),
        teams: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getTeams"])(state.teams),
        searchQuery: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getSearchQuery"])(state.teams),
        teamsCount: Object(_state_selectors__WEBPACK_IMPORTED_MODULE_9__["getTeamsCount"])(state.teams),
        hasFetched: state.teams.hasFetched,
        editorsCanAdmin: app_core_config__WEBPACK_IMPORTED_MODULE_12__["config"].editorsCanAdmin,
        signedInUser: app_core_services_context_srv__WEBPACK_IMPORTED_MODULE_13__["contextSrv"].user,
    };
}
var mapDispatchToProps = {
    loadTeams: _state_actions__WEBPACK_IMPORTED_MODULE_8__["loadTeams"],
    deleteTeam: _state_actions__WEBPACK_IMPORTED_MODULE_8__["deleteTeam"],
    setSearchQuery: _state_actions__WEBPACK_IMPORTED_MODULE_8__["setSearchQuery"],
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__["hot"])(module)(Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(TeamList)));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./public/app/features/teams/state/selectors.ts":
/*!******************************************************!*\
  !*** ./public/app/features/teams/state/selectors.ts ***!
  \******************************************************/
/*! exports provided: getSearchQuery, getSearchMemberQuery, getTeamGroups, getTeamsCount, getTeam, getTeams, getTeamMembers, isSignedInUserTeamAdmin, isPermissionTeamAdmin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchQuery", function() { return getSearchQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSearchMemberQuery", function() { return getSearchMemberQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamGroups", function() { return getTeamGroups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamsCount", function() { return getTeamsCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeam", function() { return getTeam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeams", function() { return getTeams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeamMembers", function() { return getTeamMembers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSignedInUserTeamAdmin", function() { return isSignedInUserTeamAdmin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPermissionTeamAdmin", function() { return isPermissionTeamAdmin; });
/* harmony import */ var app_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/types */ "./public/app/types/index.ts");

var getSearchQuery = function (state) { return state.searchQuery; };
var getSearchMemberQuery = function (state) { return state.searchMemberQuery; };
var getTeamGroups = function (state) { return state.groups; };
var getTeamsCount = function (state) { return state.teams.length; };
var getTeam = function (state, currentTeamId) {
    if (state.team.id === parseInt(currentTeamId, 10)) {
        return state.team;
    }
    return null;
};
var getTeams = function (state) {
    var regex = RegExp(state.searchQuery, 'i');
    return state.teams.filter(function (team) {
        return regex.test(team.name);
    });
};
var getTeamMembers = function (state) {
    var regex = RegExp(state.searchMemberQuery, 'i');
    return state.members.filter(function (member) {
        return regex.test(member.login) || regex.test(member.email);
    });
};
var isSignedInUserTeamAdmin = function (config) {
    var members = config.members, signedInUser = config.signedInUser, editorsCanAdmin = config.editorsCanAdmin;
    var userInMembers = members.find(function (m) { return m.userId === signedInUser.id; });
    var permission = userInMembers ? userInMembers.permission : app_types__WEBPACK_IMPORTED_MODULE_0__["TeamPermissionLevel"].Member;
    return isPermissionTeamAdmin({ permission: permission, signedInUser: signedInUser, editorsCanAdmin: editorsCanAdmin });
};
var isPermissionTeamAdmin = function (config) {
    var permission = config.permission, signedInUser = config.signedInUser, editorsCanAdmin = config.editorsCanAdmin;
    var isAdmin = signedInUser.isGrafanaAdmin || signedInUser.orgRole === app_types__WEBPACK_IMPORTED_MODULE_0__["OrgRole"].Admin;
    var userIsTeamAdmin = permission === app_types__WEBPACK_IMPORTED_MODULE_0__["TeamPermissionLevel"].Admin;
    var isSignedInUserTeamAdmin = isAdmin || userIsTeamAdmin;
    return isSignedInUserTeamAdmin || !editorsCanAdmin;
};


/***/ })

}]);
//# sourceMappingURL=TeamList.fb2366366adbbbf1d38b.js.map