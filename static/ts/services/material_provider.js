define(["require", "exports"], function (require, exports) {
    var Service = (function () {
        function Service() {
            this.provider = ["$state", "$stateParams", "$mdToast", "$mdDialog", function ($state, $stateParams, $mdToast, $mdDialog) {
                    var MaterialService = (function () {
                        function MaterialService() {
                        }
                        /**
                         * 阻止默认事件
                         * */
                        MaterialService.prototype.preventDefault = function ($event) {
                            $event && ($event.defaultPrevented = true) && $event.preventDefault();
                            return true;
                        };
                        /**
                         * 阻止冒泡
                         * */
                        MaterialService.prototype.stopPropagation = function ($event) {
                            $event && ($event.cancelBubble = true) && $event.stopPropagation();
                            return true;
                        };
                        /**
                         * 阻止默认事件  +  阻止冒泡
                         * */
                        MaterialService.prototype.stopAll = function ($event) {
                            this.preventDefault($event) && this.stopPropagation($event);
                        };
                        /**
                         * 关闭弹窗
                         * */
                        MaterialService.prototype.close = function () {
                            $mdDialog && $mdDialog.cancel();
                        };
                        /**
                        * angular的safe执行
                        */
                        MaterialService.prototype.safeApply = function ($scope, applyFn) {
                            if (!$scope.$$phase)
                                $scope.$apply(applyFn);
                            else
                                applyFn();
                        };
                        /**
                        * 弹出信息
                        */
                        MaterialService.prototype.alert = function (title, content) {
                            var alert = $mdDialog.show($mdDialog.alert()
                                .clickOutsideToClose(true)
                                .title(title)
                                .content(content || '操作成功！')
                                .ariaLabel(title)
                                .ok('知道了'));
                            return alert;
                        };
                        /**
                         * 弹出错误信息
                         * msg:提示的信息
                         */
                        MaterialService.prototype.showErrMsg = function (msg) {
                            $mdToast.show($mdToast.simple()
                                .textContent(msg || "error")
                                .position("bottom right")
                                .action("关闭")
                                .capsule(true)
                                .highlightAction(true)
                                .hideDelay(3000));
                        };
                        /**
                         * 弹出提示信息
                         * msg:提示的信息
                         * */
                        MaterialService.prototype.showMsg = function (msg) {
                            $mdToast.show($mdToast.simple()
                                .textContent(msg || "success")
                                .position("top right")
                                .action("关闭")
                                .capsule(true)
                                .highlightAction(true)
                                .hideDelay(3000));
                        };
                        /**
                         * 打开菜单
                         * */
                        MaterialService.prototype.openMenu = function ($mdOpenMenu, $event) {
                            $mdOpenMenu($event);
                        };
                        return MaterialService;
                    })();
                    return new MaterialService();
                }];
        }
        Service._name = "materialService";
        return Service;
    })();
    exports.Service = Service;
});
//# sourceMappingURL=material_provider.js.map