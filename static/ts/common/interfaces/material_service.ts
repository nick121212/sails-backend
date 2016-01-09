import ref = require("ref");

export interface IMaterialService {
    preventDefault($event: MouseEvent);
    stopPropagation($event: MouseEvent);
    close();
    stopAll($event: MouseEvent);
    alert(title: string, content?: string);
    safeApply($scope: angular.IScope, applyFn: Function);
    showErrMsg(msg: string);
    showMsg(msg: string);
    openMenu($mdOpenMenu: any, $event: MouseEvent);
}