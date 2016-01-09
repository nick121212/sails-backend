var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./data_base"], function (require, exports, data_base_1) {
    var ToolbarItem = (function (_super) {
        __extends(ToolbarItem, _super);
        function ToolbarItem(data) {
            _super.call(this, data);
            this.children = [];
        }
        return ToolbarItem;
    })(data_base_1.DataBase);
    exports.ToolbarItem = ToolbarItem;
});
//# sourceMappingURL=toolbar_item.js.map