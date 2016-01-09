define(["require", "exports"], function (require, exports) {
    var ControllerBase = (function () {
        function ControllerBase(args) {
            this.initInvoke(this.constructor.$inject, args);
        }
        ControllerBase.prototype.initInvoke = function ($inject, args) {
            var _this = this;
            angular.forEach($inject, function (value, key) {
                _this[value] = args[key];
            });
        };
        return ControllerBase;
    })();
    exports.ControllerBase = ControllerBase;
});
//# sourceMappingURL=controller_base.js.map