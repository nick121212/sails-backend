import ref = require('ref');
import config = require('module');

class AppModule {
    module: angular.IModule;

    constructor(name: string) {
        this.module = angular.module(name, config.config().deps);
        this.config();
        this.run();
    }

    config() {
        this.module.config([
            '$stateProvider',
            '$urlRouterProvider',
            '$httpProvider',
            '$mdThemingProvider',
            '$mdDateLocaleProvider',
            'sfErrorMessageProvider',
            'schemaFormDecoratorsProvider',
            'schemaFormProvider',
            'sfPathProvider',
            'mdSideMenuSectionsProvider',
            ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider,
                $mdDateLocaleProvider, sfErrorMessageProvider, schemaFormDecoratorsProvider,
                schemaFormProvider, sfPathProvider, mdSideMenuSectionsProvider): void=> {

            }]
        );
    }

    run() {
        this.module.run([
            '$rootScope',
            '$state',
            '$stateParams',
            '$q',
            '$cookieStore',
            'config',
            'Permission',
            'PassportService',
            'Restangular',
            ($rootScope, $state, $stateParams, $q, $cookieStore, config, Permission, passportService, Restangular): void=> {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);
    }
}

export var module = new AppModule('app_module').module;