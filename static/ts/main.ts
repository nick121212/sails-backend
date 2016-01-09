import ref = require("ref");

let config: RequireConfig = {
    baseUrl: "js",
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-animate": {
            deps: ["angular"]
        },
        "angular-aria": {
            deps: ["angular"]
        },
        "angular-material": {
            deps: ["angular-aria", "angular-animate"]
        },
        "angular-material-datatable": {
            deps: ["angular-material"]
        },
        "angular-material-icons": {
            deps: ["angular-material", "svg-morpheus"]
        },
        "angular-messages": {
            deps: ["angular-animate"]
        },
        "angular-permission": {
            deps: ["angular-ui-router"]
        },
        "angular-sanitize": {
            deps: ["angular"]
        },
        "schemaForm": {
            deps: ["objectpath", "tv4", "angular-sanitize"]
        },
        "angular-ui-router": {
            deps: ["angular"]
        },
        "material-sidemenu": {
            deps: ["angular-material"]
        },
        "angular-restangular": {
            deps: ["angular"]
        }
    },
    paths: {
        "angular": "../bower_components/angular/angular",
        "angular-animate": "../bower_components/angular-animate/angular-animate",
        "angular-aria": "../bower_components/angular-aria/angular-aria",
        "angular-material": "../bower_components/angular-material/angular-material",
        "angular-material-data-table": "../bower_components/angular-material-data-table/dist/md-data-table",
        "angular-material-icons": "../bower_components/angular-material-icons/angular-material-icons",
        "angular-messages": "../bower_components/angular-messages/angular-messages",
        "angular-permission": "../bower_components/angular-permission/dist/angular-permission",
        "angular-sanitize": "../bower_components/angular-sanitize/angular-sanitize",
        "schemaForm": "../bower_components/angular-schema-form/dist/schema-form",
        "angular-ui-router": "../bower_components/angular-ui-router/release/angular-ui-router",
        "lodash": "../bower_components/lodash/lodash",
        "material-sidemenu": "../bower_components/material-sidemenu/sidemenu",
        "moment": "../bower_components/moment/moment",
        "objectpath": "../bower_components/objectpath/lib/objectpath",
        "angular-restangular": "../bower_components/restangular/dist/restangular",
        "svg-morpheus": "../bower_components/svg-morpheus/compile/unminified/svg-morpheus",
        "tv4": "../bower_components/tv4/tv4"
    },
    deps: [
        "angular-ui-router",
        "material-sidemenu",
        "angular-permission",
        "angular-material",
        "schemaForm",
        "moment",
        "lodash",
        "angular-material-icons",
        "angular-restangular"
    ],
    config: {
        "modules/app": {
            deps: ["ui.router", "ngMaterial", "restangular", "ngAnimate", "ngMdIcons", "schemaForm", "sidemenu", "permission"]
        }
    },
    callback: () => {
        require(["bootstrap/bootstrap"]);
    },
    urlArgs: "@@version"
};

requirejs.config(config);