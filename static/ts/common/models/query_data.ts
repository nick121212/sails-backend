import {DataBase} from "./data_base";

export class QueryData extends DataBase {
    public order: string;
    public where: any = {};
    public include: Array<string> = [];
    public offset: number = 0;
    public limit: number = 10;
    public pageCount: number = 10;

    constructor(data?: Object) {
        super(data);
    }
}