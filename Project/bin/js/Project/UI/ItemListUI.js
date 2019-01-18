var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ui;
(function (ui) {
    var ExtendsItemListUI = /** @class */ (function (_super) {
        __extends(ExtendsItemListUI, _super);
        function ExtendsItemListUI() {
            return _super.call(this) || this;
        }
        ExtendsItemListUI.prototype.createChildren = function () {
            var res = Laya.loader.getRes("res/uijson/ItemListUI.json");
            this.createView(res);
            _super.prototype.createChildren.call(this);
        };
        return ExtendsItemListUI;
    }(ui.ItemListUI));
    ui.ExtendsItemListUI = ExtendsItemListUI;
})(ui || (ui = {}));
var ItemListUI = /** @class */ (function (_super) {
    __extends(ItemListUI, _super);
    function ItemListUI() {
        var _this = _super.call(this) || this;
        _this.addChild(new ui.ExtendsItemListUI());
        return _this;
    }
    return ItemListUI;
}(BaseUI));
//# sourceMappingURL=ItemListUI.js.map