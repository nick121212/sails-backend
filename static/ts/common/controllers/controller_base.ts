import ref = require("ref");

export class ControllerBase {
    protected $rootScope: angular.IRootScopeService;
    protected $scope: angular.IScope;
    protected $q: angular.IQService;
    protected $http: angular.IHttpService;

    constructor(args: IArguments) {
        this.initInvoke(this.constructor.$inject, args);
    }

    initInvoke($inject: Array<string>, args: IArguments) {
        angular.forEach($inject, (value, key) => {
            this[value] = args[key];
        });
    }
}