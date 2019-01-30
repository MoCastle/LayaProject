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
    var PlayerList = /** @class */ (function (_super) {
        __extends(PlayerList, _super);
        function PlayerList() {
            return _super.call(this) || this;
        }
        PlayerList.prototype.createChildren = function () {
            var res = Laya.loader.getRes("res/uijson/PlayerList.json");
            this.createView(res);
            _super.prototype.createChildren.call(this);
        };
        return PlayerList;
    }(ui.PlayerListUI));
    ui.PlayerList = PlayerList;
})(ui || (ui = {}));
var PlayerListUI = /** @class */ (function (_super) {
    __extends(PlayerListUI, _super);
    function PlayerListUI(name) {
        var _this = _super.call(this, name) || this;
        _this._UIType = UITypeEnum.Midle;
        _this.UI = new ui.PlayerList();
        _this.addChild(_this.UI);
        _this.UI._ReturnMain.on(Laya.Event.CLICK, null, function () {
            StageAPP.GuiderManager.EnterScene();
        });
        return _this;
    }
    PlayerListUI.Name = function () {
        return "PlayerListUI";
    };
    return PlayerListUI;
}(BaseUI));
//# sourceMappingURL=PlayerListUI.js.map