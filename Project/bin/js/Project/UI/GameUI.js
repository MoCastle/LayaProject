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
    var ExtendsGameSceneUI = /** @class */ (function (_super) {
        __extends(ExtendsGameSceneUI, _super);
        function ExtendsGameSceneUI() {
            var _this = _super.call(this) || this;
            _this.SetCountTime();
            return _this;
        }
        ExtendsGameSceneUI.prototype.createChildren = function () {
            var res = Laya.loader.getRes("res/uijson/GameScene.json");
            this.createView(res);
            _super.prototype.createChildren.call(this);
        };
        ExtendsGameSceneUI.prototype.SetCountTime = function (info) {
            if (info === void 0) { info = ""; }
            this._CountTime.text = info;
        };
        return ExtendsGameSceneUI;
    }(ui.GameSceneUI));
    ui.ExtendsGameSceneUI = ExtendsGameSceneUI;
})(ui || (ui = {}));
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super.call(this) || this;
        _this.UI = new ui.ExtendsGameSceneUI();
        _this.addChild(_this.UI);
        return _this;
    }
    Object.defineProperty(GameUI.prototype, "LeftTouch", {
        get: function () {
            return this.UI.LeftTouch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameUI.prototype, "RightTouch", {
        get: function () {
            return this.UI.RightTouch;
        },
        enumerable: true,
        configurable: true
    });
    return GameUI;
}(BaseUI));
//# sourceMappingURL=GameUI.js.map