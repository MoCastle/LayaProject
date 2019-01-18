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
    var ExtendEnterGameUI = /** @class */ (function (_super) {
        __extends(ExtendEnterGameUI, _super);
        function ExtendEnterGameUI() {
            var _this = _super.call(this) || this;
            _this.Panel = _this._Panel;
            _this.Panel.vScrollBarSkin = "";
            _this.Panel.hScrollBarSkin = "";
            _this._Character.on(Laya.Event.CLICK, null, ControlAPP.GameControler.ShowCharacterPanel);
            _this._SetPanel.on(Laya.Event.CLICK, null, ControlAPP.GameControler.ShowSetPanel);
            _this._Start.on(Laya.Event.CLICK, null, ControlAPP.GameControler.EnterGame);
            return _this;
        }
        ExtendEnterGameUI.prototype.createChildren = function () {
            var res = Laya.loader.getRes("res/uijson/EnterScene.json");
            this.createView(res);
            _super.prototype.createChildren.call(this);
        };
        return ExtendEnterGameUI;
    }(ui.EnterSceneUI));
    ui.ExtendEnterGameUI = ExtendEnterGameUI;
})(ui || (ui = {}));
var EnterGameUI = /** @class */ (function (_super) {
    __extends(EnterGameUI, _super);
    function EnterGameUI() {
        var _this = _super.call(this) || this;
        _this.UI = new ui.ExtendEnterGameUI();
        _this.addChild(_this.UI);
        return _this;
    }
    return EnterGameUI;
}(BaseUI));
//# sourceMappingURL=EnterGameUI.js.map