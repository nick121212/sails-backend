var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./data_base"], function (require, exports, data_base_1) {
    var QueryData = (function (_super) {
        __extends(QueryData, _super);
        function QueryData(data) {
            _super.call(this, data);
            this.where = {};
            this.include = [];
            this.offset = 0;
            this.limit = 10;
            this.pageCount = 10;
        }
        return QueryData;
    })(data_base_1.DataBase);
    exports.QueryData = QueryData;
});
//# sourceMappingURL=query_data.js.map