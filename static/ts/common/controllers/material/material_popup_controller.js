var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "material_controller_base"], function (require, exports, material_controller_base_1) {
    var MaterialPopupController = (function (_super) {
        __extends(MaterialPopupController, _super);
        /**
         * 构造
         */
        function MaterialPopupController(args) {
            _super.call(this, args);
        }
        /**
         * 提交执行函数
         */
        MaterialPopupController.prototype.submit = function ($form, serverData) {
            var _this = this;
            var promises = {};
            // schemaForm 验证
            this.$rootScope.$broadcast("schemaFormValidate");
            if ($form.$dirty && $form.$valid && !this.isBusy) {
                // 整理接口数据
                angular.forEach(this.serverInterfaces, function (fn, key) {
                    promises[key] = fn(serverData || _this.formData);
                });
                // 执行接口
                this.$promise = this.$q.all(promises);
                if (this.serverInterfaces && this.$promise) {
                    (this.isBusy = true) && this.managerGrid && (this.managerGrid.isBusy = true);
                    this.$promise.then(function (datas) {
                        $form.$setPristine();
                        // 如果存在关闭函数则执行
                        if (_this.dialogCloseFn) {
                            _this.dialogCloseFn(datas);
                        }
                        else {
                            // 执行默认的关闭函数
                            _this.materialProvider.alert(_this.title, _this.content).finally(function () {
                                _this.managerGrid && _this.managerGrid.getServerData && _this.managerGrid.getServerData();
                            });
                        }
                    }).finally(function () {
                        _this.managerGrid && (_this.managerGrid.isBusy = false);
                        _this.isBusy = false;
                        _this.$promise = null;
                    });
                }
            }
        };
        return MaterialPopupController;
    })(material_controller_base_1.MaterialControllerBase);
    exports.MaterialPopupController = MaterialPopupController;
});
//# sourceMappingURL=material_popup_controller.js.map