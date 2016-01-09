export class DataBase {
    public createAt: string;
    public updateAt: string;
    public static _schema: Object;

    constructor(data?: any) {
        data && typeof data === "object" && this.copyData(data);
    }

    copyData(data: any) {
        for (let p in data) {
            this[p] = data[p];
        }
    }
}