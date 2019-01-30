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
    var ExtendEndUI = /** @class */ (function (_super) {
        __extends(ExtendEndUI, _super);
        function ExtendEndUI() {
            return _super.call(this) || this;
        }
        ExtendEndUI.prototype.createChildren = function () {
            var res = Laya.loader.getRes("res/uijson/EndGame.json");
            this.createView(res);
            _super.prototype.createChildren.call(this);
        };
        return ExtendEndUI;
    }(ui.EndGameUI));
    ui.ExtendEndUI = ExtendEndUI;
})(ui || (ui = {}));
var EndGameUI = /** @class */ (function (_super) {
    __extends(EndGameUI, _super);
    function EndGameUI(name) {
        var _this = _super.call(this, name) || this;
        _this._IsMutex = true;
        _this.UI = new ui.ExtendEndUI();
        _this.addChild(_this.UI);
        _this.UI._StartBtn.on(Laya.Event.CLICK, null, function () { APP.GameManager.GameDir.ReStart(); });
        _this.UI._MenueBtn.on(Laya.Event.CLICK, null, function () { StageAPP.GuiderManager.EnterScene(); });
        _this.UI._SetBtn.on(Laya.Event.CLICK, null, function () { APP.UIManager.Show(SetPanelUI); });
        _this.UI._PlayerListBtn.on(Laya.Event.CLICK, null, function () { APP.UIManager.Show(PlayerListUI); });
        _this.GameInfo = _this.UI._GameInfo.text.split("#");
        _this._ShowGameInfo();
        return _this;
    }
    EndGameUI.Name = function () {
        return "EndGameUI";
    };
    EndGameUI.prototype.SetGameInfo = function (dis, gold) {
        this.GameInfo[1] = dis.toFixed(0); //.toString();
        this.GameInfo[3] = gold.toString();
        this._ShowGameInfo();
    };
    EndGameUI.prototype._ShowGameInfo = function () {
        this.UI._GameInfo.text = this.GameInfo[0] + this.GameInfo[1] + "\n" + this.GameInfo[2] + this.GameInfo[3];
    };
    return EndGameUI;
}(BaseUI));
//# sourceMappingURL=EndUI.js.map