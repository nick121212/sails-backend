import ref = require("ref");
import {MaterialControllerBase} from "material_controller_base";
import {ClientData} from "../../models/client_data";
import {QueryData} from "../../models/query_data";
import {ToolbarItem} from "../models/toolbar_item";
import {IConfirm} from "../interfaces/confirm_data";

export abstract class MaterialGridController<T> extends MaterialControllerBase {
    /**
     * 选中的数据
     * */
    public selected: Array<T> = [];
    /**
     * 服务器数据
     * */
    public clientData: ClientData<T>;
    /**
     * 服务器交互基础数据
     * */
    public queryData: QueryData;
    /**
     * 是否是搜索模式
     * */
    public searchMode: boolean;
    /**
     * 搜索表单
     * */
    public searchForm: Array<any>;
    /**
     * 数据返回后进行适配方法
     * */
    public dataFilter: Function;
    /**
     * 搜索数据，存放搜索表单的数据
    **/
    public searchData: Object = {};
    /**
     * 选中后上的按钮
     * */
    public selectToolbars: Array<ToolbarItem> = [];
    /**
     * table上的按钮
     * */
    public itemToolbars: Array<ToolbarItem> = [];
    /**
     * 分页数量列表
     * */
    public rowSelect: Array<number> = [10, 30, 50];
    /**
     * 表格的列
     * */
    public columns: Array<any> = [];
    /**
     * 表单form
     */
    private $sForm: angular.IFormController;
    /**
     * 全局搜索条件
     *  */
    public defQuery: Object = {};
    /**
     * promise返回值
     */
    public deferred: angular.IPromise<any>;

    constructor(args: IArguments, clearToolbar: boolean = true) {
        super(args);

        this.$scope.$on("$destory", () => {
            this.abort();
        });
    }
    /**
     * 停止当前正在执行的ajax请求
     */
    abort() {
        this.$http && angular.forEach(this.$http.pendingRequests, (request: angular.IRequestConfig) => {
            if (request["cancel"] && request.timeout) {
                request["cancel"].resolve({
                    status: 200,
                    result_code: 0,
                    msg: "取消ajax加载！"
                });
            }
        });
    }
    /**
     * 确认操作
     * opts：确认设置
     * serverInterfaces：调用的接口信息
     * filterData：处理数据函数
     * success：成功的回调函数
     */
    confirm(opts: IConfirm, serverInterfaces, filterData: Function, success: Function) {
        let confirm = this.$mdDialog.confirm()
            .title(opts.title)
            .textContent(opts.content)
            .targetEvent(opts.$event)
            .ok(opts.okContent || "确定")
            .cancel(opts.cancelContent || "取消");
        let promises: { [index: string]: angular.IPromise<any> } = {};

        if (this.selected.length > 0 || opts.ignoreSelection) {
            this.$mdDialog.show(confirm).then(() => {
                angular.forEach(serverInterfaces, (fn: Function, key: string) => {
                    promises[key] = fn((filterData && filterData.call(this, this.selected)) || this.selected);
                });
                this.deferred = this.$q.all(promises).then((data) => {
                    opts.isRefresh && this.getServerData();
                    this.materialProvider.showMsg("执行成功!");
                    success && success.call(this, data);
                });
            });
        }
    }
    /**
     * 清理掉所有搜索字段
     */
    private clearWhere() {
        for (let p in this.queryData.where) {
            delete this.queryData.where[p];
        }
    }
    /**
     * 显示/隐藏搜索栏
     * */
    toggleSearchBar() {
        const properties = ["page", "pageCount"];

        this.searchMode = !this.searchMode;
        if (this.searchMode === false) {
            for (var p in this.queryData) {
                if (this.queryData.hasOwnProperty(p) && !properties.some(function(property) {
                    return property === p;
                })) {
                    this.queryData[p] = null;
                }
                this.queryData.where = {};
            }
            this.$sForm && this.$sForm.$submitted && ((this.$sForm = null) || true) && this.getServerData();
        }
    }
    /**
     * 清理掉所有搜索字段
     */
    resetSearch() {
        this.clearWhere();
        this.searchData = {};
    }
    /**
     * 搜索
     * */
    doSearch(form: angular.IFormController) {
        let searchFilters = {};

        if (form.$dirty) {
            this.clearWhere();
            for (let p in this.searchData) {
                if (!this.searchData.hasOwnProperty(p)) continue;
                if (p.search("r-") === 0) {
                    this.queryData.where[p.replace("r-", "")] = this.searchData[p];
                }
            }
            form.$setPristine();
            this.onPageChange(1, this.queryData.pageCount);
            this.getServerData();
            this.$sForm = form;
        }
    }
    /**
     * 清除选中的数据
     * */
    clearSelected() {
        this.selected.length = 0;
    }
    /**
     * 拉取服务器数据
     * */
    getServerData() {
        let promises: { [index: string]: ng.IPromise<any> } = {};

        if (this.isBusy) return;
        this.clearSelected();
        this.isBusy = true;
        this.abort();

        angular.forEach(this.serverInterfaces, (fn: Function, key: string) => {
            promises[key] = fn();
        });

        if (this.searchMode) {
            angular.extend(this.queryData.where, this.defQuery);
        } else {
            this.clearWhere();
            angular.extend(this.queryData.where, this.defQuery);
        }
        this.deferred = this.$q.all(promises).then((data) => {
            this.clientData = this.dataFilter(data);
        }, (data) => {
            console.log(data);
        }).finally(() => {
            this.isBusy = false;
        });

        return this.deferred;
    }
    /**
     * 分页改变时候调用
     * page ：当前第几页
     * pageCount：每页多少数据
     * */
    onPageChange(page: number, pageCount: number) {
        this.queryData.pageCount = pageCount;
        this.queryData.limit = pageCount;
        this.queryData.offset = pageCount * (page - 1);

        return this.getServerData();
    }
    /**
     * 排序改变时候调用
     * */
    onOrderChange(order) {
        this.queryData.order = order;
        return this.getServerData();
    }
    abstract initColumns()
    abstract initToolbar()
    abstract initSearch()
}