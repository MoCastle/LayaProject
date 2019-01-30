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
    var ExtendCharactersUI = /** @class */ (function (_super) {
        __extends(ExtendCharactersUI, _super);
        function ExtendCharactersUI() {
            var _this = _super.call(this) || this;
            _this.SetList();
            return _this;
        }
        ExtendCharactersUI.prototype.createChildren = function () {
            var res = Laya.loader.getRes("res/uijson/Characters.json");
            this.createView(res);
            _super.prototype.createChildren.call(this);
        };
        ExtendCharactersUI.prototype.SetList = function () {
            var listArray = ["", "", "", "", "", "", "", "", "", ""];
            this._List.hScrollBarSkin = "";
            this._List.renderHandler = new Laya.Handler(this, this._RenderHandler);
            this._List.array = listArray;
            this._List.scrollBar.elasticBackTime = 200; //设置橡皮筋回弹时间。单位为毫秒。
            this._List.scrollBar.elasticDistance = 50;
        };
        ExtendCharactersUI.prototype._RenderHandler = function (cell, index) {
            var roleElement = cell;
            roleElement.Idx = index;
            roleElement.Reset();
        };
        return ExtendCharactersUI;
    }(ui.CharactersUI));
    ui.ExtendCharactersUI = ExtendCharactersUI;
})(ui || (ui = {}));
var CharacterUI = /** @class */ (function (_super) {
    __extends(CharacterUI, _super);
    function CharacterUI(name) {
        var _this = _super.call(this, name) || this;
        _this.addChild(new ui.ExtendCharactersUI());
        return _this;
    }
    CharacterUI.Name = function () {
        return "CharacterUI";
    };
    return CharacterUI;
}(BaseUI));
var RoleElement = /** @class */ (function (_super) {
    __extends(RoleElement, _super);
    //
    function RoleElement() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RoleElement.prototype, "Btn", {
        get: function () {
            var _this = this;
            if (this._Btn == null) {
                this._Btn = this.getChildAt(1);
                this._Btn.on(Laya.Event.CLICK, this, function () {
                    ControlAPP.GameControler.SetPlayerID(_this.Idx);
                    APP.UIManager.CloseCurView();
                });
            }
            return this._Btn;
        },
        enumerable: true,
        configurable: true
    });
    RoleElement.prototype.Reset = function () {
        if (this.Btn) { }
    };
    return RoleElement;
}(Laya.Box));
//# sourceMappingURL=CharacterUI.js.map