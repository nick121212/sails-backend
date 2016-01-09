import ref = require("ref");
import {MaterialControllerBase} from "material_controller_base";
import {ClientData} from "../../models/client_data";
import {QueryData} from "../../models/query_data";
import {ToolbarItem} from "../models/toolbar_item";
import {IConfirm} from "../interfaces/confirm_data";
import {MaterialGridController} from "./material_grid_controller";

export abstract class MaterialPopupController<T> extends MaterialControllerBase {
    /**
     * shcmeaForm 中定义的Form JSON格式
     */
    public form: Array<any>;
    /**
     * 表单数据存放的变量
    */
    public formData: T;
    /**
     * 当前选中的数据
     */
    public currentItem: T;
    /**
     * 当前的数据列表
     */
    public managerGrid: MaterialGridController<any>;
    /**
     * 当前操作执行完毕后显示的内容
     */
    public content: string;
    /**
     * 接口执行后的Promise对象
     */
    private $promise: angular.IPromise<any>;
    /**
     * 接口执行成功后的回调函数
     */
    private dialogCloseFn: Function;

    /**
     * 构造
     */
    constructor(args: IArguments) {
        super(args);
    }
    /**
     * 提交执行函数
     */
    submit($form: ng.IFormController, serverData?: T) {
        let promises: { [index: string]: angular.IPromise<any> } = {};

        // schemaForm 验证
        this.$rootScope.$broadcast("schemaFormValidate");
        if ($form.$dirty && $form.$valid && !this.isBusy) {
            // 整理接口数据
            angular.forEach(this.serverInterfaces, (fn: Function, key: string) => {
                promises[key] = fn(serverData || this.formData);
            });
            // 执行接口
            this.$promise = this.$q.all(promises);

            if (this.serverInterfaces && this.$promise) {
                (this.isBusy = true) && this.managerGrid && (this.managerGrid.isBusy = true);
                this.$promise.then((datas: Object) => {
                    $form.$setPristine();
                    // 如果存在关闭函数则执行
                    if (this.dialogCloseFn) {
                        this.dialogCloseFn(datas);
                    } else {
                        // 执行默认的关闭函数
                        this.materialProvider.alert(this.title, this.content).finally(() => {
                            this.managerGrid && this.managerGrid.getServerData && this.managerGrid.getServerData();
                        });
                    }
                }).finally(() => {
                    this.managerGrid && (this.managerGrid.isBusy = false);
                    this.isBusy = false;
                    this.$promise = null;
                });
            }
        }
    }
}