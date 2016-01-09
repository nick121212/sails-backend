define(["require", "exports"], function (require, exports) {
    var DataBase = (function () {
        function DataBase(data) {
            data && typeof data === "object" && this.copyData(data);
        }
        DataBase.prototype.copyData = function (data) {
            for (var p in data) {
                this[p] = data[p];
            }
        };
        return DataBase;
    })();
    exports.DataBase = DataBase;
});
//# sourceMappingURL=data_base.js.map