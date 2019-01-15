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
    var EnterGameUI = /** @class */ (function (_super) {
        __extends(EnterGameUI, _super);
        function EnterGameUI() {
            var _this = _super.call(this) || this;
            _this.Panel = _this._Panel;
            _this.Panel.vScrollBarSkin = "";
            _this.Panel.hScrollBarSkin = "";
            return _this;
        }
        EnterGameUI.prototype.createChildren = function () {
            var res = Laya.loader.getRes("EnterScene.json");
            this.createView(res);
            _super.prototype.createChildren.call(this);
        };
        return EnterGameUI;
    }(ui.EnterSceneUI));
    ui.EnterGameUI = EnterGameUI;
})(ui || (ui = {}));
var EnterGameUI = /** @class */ (function (_super) {
    __extends(EnterGameUI, _super);
    function EnterGameUI() {
        var _this = _super.call(this) || this;
        _this._UI = new ui.EnterGameUI();
        _this.addChild(_this._UI);
        return _this;
    }
    return EnterGameUI;
}(BaseUI));
//# sourceMappingURL=EnterGameUI.js.map