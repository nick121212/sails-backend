var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../controller_base"], function (require, exports, controller_base_1) {
    var MaterialControllerBase = (function (_super) {
        __extends(MaterialControllerBase, _super);
        /**
         * 构造
         * args: arguments
         * */
        function MaterialControllerBase(args) {
            _super.call(this, args);
            /**
             * 是否处于忙碌状态
             * */
            this.isBusy = false;
            /**
             * 用于多个接口同时返回
             * */
            this.serverInterfaces = {};
        }
        return MaterialControllerBase;
    })(controller_base_1.ControllerBase);
    exports.MaterialControllerBase = MaterialControllerBase;
});
//# sourceMappingURL=material_controller_base.js.map