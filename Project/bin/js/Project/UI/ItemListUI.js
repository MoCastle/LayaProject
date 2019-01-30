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
            var res = Laya.loader.getRes("res/uijson/ItemList.json");
            this.createView(res);
            _super.prototype.createChildren.call(this);
        };
        ExtendsItemListUI.prototype.SetList = function () {
            var listArray = ["", "", "", "", "", "", "", "", "", ""];
            this._List.hScrollBarSkin = "";
            this._List.renderHandler = new Laya.Handler(this, this._RenderHandler);
            this._List.array = listArray;
            this._List.scrollBar.elasticBackTime = 200; //设置橡皮筋回弹时间。单位为毫秒。
            this._List.scrollBar.elasticDistance = 50;
        };
        ExtendsItemListUI.prototype._RenderHandler = function (cell, index) {
            var roleElement = cell;
            roleElement.SetBtn(this.BtnListener.Listener, this.BtnListener.Action);
        };
        return ExtendsItemListUI;
    }(ui.ItemListUI));
    ui.ExtendsItemListUI = ExtendsItemListUI;
})(ui || (ui = {}));
var ItemListUI = /** @class */ (function (_super) {
    __extends(ItemListUI, _super);
    function ItemListUI(name) {
        var _this = _super.call(this, name) || this;
        _this.UI = new ui.ExtendsItemListUI();
        _this.addChild(_this.UI);
        _this.UI.BtnListener = new Delegate(_this, function () { APP.UIManager.Close(_this); });
        _this.UI.SetList();
        _this._UIType = UITypeEnum.Midle;
        return _this;
    }
    ItemListUI.Name = function () {
        return "ItemListUI";
    };
    return ItemListUI;
}(BaseUI));
var ItemElement = /** @class */ (function (_super) {
    __extends(ItemElement, _super);
    //
    function ItemElement() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ItemElement.prototype, "Btn", {
        get: function () {
            if (this._Btn == null) {
                this._Btn = this.getChildAt(1);
            }
            return this._Btn;
        },
        enumerable: true,
        configurable: true
    });
    ItemElement.prototype.SetBtn = function (owner, listener) {
        this.Btn.on(Laya.Event.CLICK, owner, listener);
    };
    return ItemElement;
}(Laya.Box));
//# sourceMappingURL=ItemListUI.js.map