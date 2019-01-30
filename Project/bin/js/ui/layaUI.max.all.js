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
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var CharactersUI = /** @class */ (function (_super) {
        __extends(CharactersUI, _super);
        function CharactersUI() {
            return _super.call(this) || this;
        }
        CharactersUI.prototype.createChildren = function () {
            View.regComponent("RoleElement", RoleElement);
            _super.prototype.createChildren.call(this);
            this.loadUI("Characters");
        };
        return CharactersUI;
    }(View));
    ui.CharactersUI = CharactersUI;
})(ui || (ui = {}));
(function (ui) {
    var EndGameUI = /** @class */ (function (_super) {
        __extends(EndGameUI, _super);
        function EndGameUI() {
            return _super.call(this) || this;
        }
        EndGameUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadUI("EndGame");
        };
        return EndGameUI;
    }(View));
    ui.EndGameUI = EndGameUI;
})(ui || (ui = {}));
(function (ui) {
    var EnterSceneUI = /** @class */ (function (_super) {
        __extends(EnterSceneUI, _super);
        function EnterSceneUI() {
            return _super.call(this) || this;
        }
        EnterSceneUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadUI("EnterScene");
        };
        return EnterSceneUI;
    }(View));
    ui.EnterSceneUI = EnterSceneUI;
})(ui || (ui = {}));
(function (ui) {
    var GameSceneUI = /** @class */ (function (_super) {
        __extends(GameSceneUI, _super);
        function GameSceneUI() {
            return _super.call(this) || this;
        }
        GameSceneUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadUI("GameScene");
        };
        return GameSceneUI;
    }(View));
    ui.GameSceneUI = GameSceneUI;
})(ui || (ui = {}));
(function (ui) {
    var ItemListUI = /** @class */ (function (_super) {
        __extends(ItemListUI, _super);
        function ItemListUI() {
            return _super.call(this) || this;
        }
        ItemListUI.prototype.createChildren = function () {
            View.regComponent("ItemElement", ItemElement);
            _super.prototype.createChildren.call(this);
            this.loadUI("ItemList");
        };
        return ItemListUI;
    }(View));
    ui.ItemListUI = ItemListUI;
})(ui || (ui = {}));
(function (ui) {
    var LoadingUI = /** @class */ (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadUI("Loading");
        };
        return LoadingUI;
    }(View));
    ui.LoadingUI = LoadingUI;
})(ui || (ui = {}));
(function (ui) {
    var PlayerListUI = /** @class */ (function (_super) {
        __extends(PlayerListUI, _super);
        function PlayerListUI() {
            return _super.call(this) || this;
        }
        PlayerListUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadUI("PlayerList");
        };
        return PlayerListUI;
    }(View));
    ui.PlayerListUI = PlayerListUI;
})(ui || (ui = {}));
(function (ui) {
    var SetPanelUI = /** @class */ (function (_super) {
        __extends(SetPanelUI, _super);
        function SetPanelUI() {
            return _super.call(this) || this;
        }
        SetPanelUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadUI("SetPanel");
        };
        return SetPanelUI;
    }(View));
    ui.SetPanelUI = SetPanelUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map