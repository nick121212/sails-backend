import {DataBase} from "./data_base";

export class ToolbarItem extends DataBase {
    public title: string;
    public icon: string;
    public onClick: Function;
    public children: Array<ToolbarItem>;
    public href: string;
    public hash: string;
    public state: string;
    public params: any;

    constructor(data?: any) {
        super(data);
        this.children = [];
    }
}