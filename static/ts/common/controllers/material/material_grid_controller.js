var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "material_controller_base"], function (require, exports, material_controller_base_1) {
    var MaterialGridController = (function (_super) {
        __extends(MaterialGridController, _super);
        function MaterialGridController(args, clearToolbar) {
            var _this = this;
            if (clearToolbar === void 0) { clearToolbar = true; }
            _super.call(this, args);
            /**
             * 选中的数据
             * */
            this.selected = [];
            /**
             * 搜索数据，存放搜索表单的数据
            **/
            this.searchData = {};
            /**
             * 选中后上的按钮
             * */
            this.selectToolbars = [];
            /**
             * table上的按钮
             * */
            this.itemToolbars = [];
            /**
             * 分页数量列表
             * */
            this.rowSelect = [10, 30, 50];
            /**
             * 表格的列
             * */
            this.columns = [];
            /**
             * 全局搜索条件
             *  */
            this.defQuery = {};
            this.$scope.$on("$destory", function () {
                _this.abort();
            });
        }
        /**
         * 停止当前正在执行的ajax请求
         */
        MaterialGridController.prototype.abort = function () {
            this.$http && angular.forEach(this.$http.pendingRequests, function (request) {
                if (request["cancel"] && request.timeout) {
                    request["cancel"].resolve({
                        status: 200,
                        result_code: 0,
                        msg: "取消ajax加载！"
                    });
                }
            });
        };
        /**
         * 确认操作
         * opts：确认设置
         * serverInterfaces：调用的接口信息
         * filterData：处理数据函数
         * success：成功的回调函数
         */
        MaterialGridController.prototype.confirm = function (opts, serverInterfaces, filterData, success) {
            var _this = this;
            var confirm = this.$mdDialog.confirm()
                .title(opts.title)
                .textContent(opts.content)
                .targetEvent(opts.$event)
                .ok(opts.okContent || "确定")
                .cancel(opts.cancelContent || "取消");
            var promises = {};
            if (this.selected.length > 0 || opts.ignoreSelection) {
                this.$mdDialog.show(confirm).then(function () {
                    angular.forEach(serverInterfaces, function (fn, key) {
                        promises[key] = fn((filterData && filterData.call(_this, _this.selected)) || _this.selected);
                    });
                    _this.deferred = _this.$q.all(promises).then(function (data) {
                        opts.isRefresh && _this.getServerData();
                        _this.materialProvider.showMsg("执行成功!");
                        success && success.call(_this, data);
                    });
                });
            }
        };
        /**
         * 清理掉所有搜索字段
         */
        MaterialGridController.prototype.clearWhere = function () {
            for (var p in this.queryData.where) {
                delete this.queryData.where[p];
            }
        };
        /**
         * 显示/隐藏搜索栏
         * */
        MaterialGridController.prototype.toggleSearchBar = function () {
            var properties = ["page", "pageCount"];
            this.searchMode = !this.searchMode;
            if (this.searchMode === false) {
                for (var p in this.queryData) {
                    if (this.queryData.hasOwnProperty(p) && !properties.some(function (property) {
                        return property === p;
                    })) {
                        this.queryData[p] = null;
                    }
                    this.queryData.where = {};
                }
                this.$sForm && this.$sForm.$submitted && ((this.$sForm = null) || true) && this.getServerData();
            }
        };
        /**
         * 清理掉所有搜索字段
         */
        MaterialGridController.prototype.resetSearch = function () {
            this.clearWhere();
            this.searchData = {};
        };
        /**
         * 搜索
         * */
        MaterialGridController.prototype.doSearch = function (form) {
            var searchFilters = {};
            if (form.$dirty) {
                this.clearWhere();
                for (var p in this.searchData) {
                    if (!this.searchData.hasOwnProperty(p))
                        continue;
                    if (p.search("r-") === 0) {
                        this.queryData.where[p.replace("r-", "")] = this.searchData[p];
                    }
                }
                form.$setPristine();
                this.onPageChange(1, this.queryData.pageCount);
                this.getServerData();
                this.$sForm = form;
            }
        };
        /**
         * 清除选中的数据
         * */
        MaterialGridController.prototype.clearSelected = function () {
            this.selected.length = 0;
        };
        /**
         * 拉取服务器数据
         * */
        MaterialGridController.prototype.getServerData = function () {
            var _this = this;
            var promises = {};
            if (this.isBusy)
                return;
            this.clearSelected();
            this.isBusy = true;
            this.abort();
            angular.forEach(this.serverInterfaces, function (fn, key) {
                promises[key] = fn();
            });
            if (this.searchMode) {
                angular.extend(this.queryData.where, this.defQuery);
            }
            else {
                this.clearWhere();
                angular.extend(this.queryData.where, this.defQuery);
            }
            this.deferred = this.$q.all(promises).then(function (data) {
                _this.clientData = _this.dataFilter(data);
            }, function (data) {
                console.log(data);
            }).finally(function () {
                _this.isBusy = false;
            });
            return this.deferred;
        };
        /**
         * 分页改变时候调用
         * page ：当前第几页
         * pageCount：每页多少数据
         * */
        MaterialGridController.prototype.onPageChange = function (page, pageCount) {
            this.queryData.pageCount = pageCount;
            this.queryData.limit = pageCount;
            this.queryData.offset = pageCount * (page - 1);
            return this.getServerData();
        };
        /**
         * 排序改变时候调用
         * */
        MaterialGridController.prototype.onOrderChange = function (order) {
            this.queryData.order = order;
            return this.getServerData();
        };
        return MaterialGridController;
    })(material_controller_base_1.MaterialControllerBase);
    exports.MaterialGridController = MaterialGridController;
});
//# sourceMappingURL=material_grid_controller.js.map