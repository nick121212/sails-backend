import ref = require("ref");

export interface IConfirm {
    // 标题
    title: string;
    // 内容
    content: string;
    // target
    $event: MouseEvent;
    // 确认的文字
    okContent?: string;
    // 取消的文字
    cancelContent?: string;
    // 是否需要忽略选中的数据
    ignoreSelection?: boolean;
    // 是否需要刷新当前列表
    isRefresh: boolean;
}