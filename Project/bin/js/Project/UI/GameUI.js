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
/**作者:Mo
 * 场景UI
 */
var ui;
(function (ui) {
    var GameUI = /** @class */ (function (_super) {
        __extends(GameUI, _super);
        function GameUI() {
            return _super.call(this) || this;
        }
        GameUI.prototype.createChildren = function () {
            var res = Laya.loader.getRes("res/uijson/GameScene.json");
            this.createView(res);
            _super.prototype.createChildren.call(this);
        };
        GameUI.prototype.SetCountTime = function (info) {
            if (info === void 0) { info = ""; }
            this._CountTime.text = info;
        };
        return GameUI;
    }(ui.GameSceneUI));
    ui.GameUI = GameUI;
})(ui || (ui = {}));
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI(name) {
        var _this = _super.call(this, name) || this;
        _this._IsMutex = true;
        _this.UI = new ui.GameUI();
        _this.addChild(_this.UI);
        _this._Gold = 0;
        var opIsRight = ControlAPP.GameControler.SetInfo.OPIsRight;
        _this.UI._LeftHandBtnList.visible = !opIsRight;
        _this.UI._RightHandBtnList.visible = opIsRight;
        _this.UI._ItemListBtn.on(Laya.Event.CLICK, null, function () { APP.UIManager.Show(ItemListUI); });
        _this.SetCountTime();
        _this.DistanceStr = _this.UI._TxtDistance.text.split("#");
        _this.DistanceStr[1] = "0";
        _this._ShowDistance();
        _this.GoldNumStr = _this.UI._TxtGold.text.split("#");
        _this.GoldNumStr[1] = "0";
        _this._ShowGoldNum();
        _this.ShowInputInfo("");
        return _this;
    }
    GameUI.Name = function () {
        return "GameUI";
    };
    GameUI.prototype.AddGold = function (goldNum) {
        this._Gold += goldNum;
        this.GoldNumStr[1] = this._Gold.toString();
        this._ShowGoldNum();
    };
    GameUI.prototype.SetLeftTouch = function (owner, Listener) {
        this.UI._Left_LeftTouch.on(Laya.Event.CLICK, owner, Listener);
        this.UI._Right_LeftTouch.on(Laya.Event.CLICK, owner, Listener);
    };
    GameUI.prototype.SetRightTouch = function (owner, Listener) {
        this.UI._Left_RightTouch.on(Laya.Event.CLICK, owner, Listener);
        this.UI._Right_RightTouch.on(Laya.Event.CLICK, owner, Listener);
    };
    GameUI.prototype.SetCountTime = function (info) {
        if (info === void 0) { info = ""; }
        if (info == "") {
            this.UI._CountDownUI.visible = false;
            this.GamePanel = true;
        }
        else {
            this.UI.SetCountTime(info);
            this.UI._CountDownUI.visible = true;
            this.GamePanel = false;
        }
    };
    Object.defineProperty(GameUI.prototype, "GamePanel", {
        set: function (value) {
            this.UI._GamePanel.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameUI.prototype, "Distance", {
        set: function (value) {
            this.DistanceStr[1] = value.toFixed(2);
            this._ShowDistance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameUI.prototype, "GoldNum", {
        set: function (value) {
            this.GoldNumStr[1] = value.toString();
            this._ShowGoldNum();
        },
        enumerable: true,
        configurable: true
    });
    GameUI.prototype.ShowInputInfo = function (info) {
        this.UI._GameInfo.text = info;
    };
    GameUI.prototype._ShowDistance = function () {
        this.UI._TxtDistance.text = this.DistanceStr[0] + this.DistanceStr[1];
    };
    GameUI.prototype._ShowGoldNum = function () {
        this.UI._TxtGold.text = this.GoldNumStr[0] + this.GoldNumStr[1];
    };
    return GameUI;
}(BaseUI));
//# sourceMappingURL=GameUI.js.map