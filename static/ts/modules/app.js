define(["require", "exports", "module"], function (require, exports, config) {
    var AppModule = (function () {
        function AppModule(name) {
            this.module = angular.module(name, config.config().deps);
            this.config();
            this.run();
        }
        AppModule.prototype.config = function () {
            this.module.config([
                "$stateProvider",
                "$urlRouterProvider",
                "$httpProvider",
                "$mdThemingProvider",
                "$mdDateLocaleProvider",
                "sfErrorMessageProvider",
                "schemaFormDecoratorsProvider",
                "schemaFormProvider",
                "sfPathProvider",
                "mdSideMenuSectionsProvider",
                function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $mdDateLocaleProvider, sfErrorMessageProvider, schemaFormDecoratorsProvider, schemaFormProvider, sfPathProvider, mdSideMenuSectionsProvider) {
                }]);
        };
        AppModule.prototype.run = function () {
            this.module.run([
                "$rootScope",
                "$state",
                "$stateParams",
                "$q",
                "Permission",
                "Restangular",
                function ($rootScope, $state, $stateParams, $q, Permission, Restangular) {
                    $rootScope.$state = $state;
                    $rootScope.$stateParams = $stateParams;
                }
            ]);
        };
        return AppModule;
    })();
    exports.module = new AppModule("app_module").module;
});
//# sourceMappingURL=app.js.map