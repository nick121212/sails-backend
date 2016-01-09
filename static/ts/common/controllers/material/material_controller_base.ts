import ref = require("ref");
import {ControllerBase} from "../controller_base";
import {IMaterialService} from "../interfaces/material_service";

export class MaterialControllerBase extends ControllerBase {
    /**
     * ngMaterial的基础provider封装
     * */
    protected materialProvider: IMaterialService;
    /**
     * ngMaterial 弹窗服务
     * */
    protected $mdDialog: angular.material.IDialogService;
    /**
     * 是否处于忙碌状态
     * */
    public isBusy: boolean = false;
    /**
     * 用户表单的验证
     * */
    public schema: Object;
    /**
     * 用于多个接口同时返回
     * */
    public serverInterfaces: { [index: string]: angular.IPromise<any> } = {};
    /**
     * 标题  
     * */
    public title: string;
    /**
     * 图标，依赖于angular-material-icons
     * */
    public icon: any;
    /**
     * 构造
     * args: arguments
     * */
    constructor(args: IArguments) {
        super(args);
    }
}