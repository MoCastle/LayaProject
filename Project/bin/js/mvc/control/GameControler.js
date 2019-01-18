var GameControler = /** @class */ (function () {
    function GameControler() {
    }
    Object.defineProperty(GameControler, "Mgr", {
        get: function () {
            if (GameControler._Mgr == null) {
                GameControler._Mgr = new GameControler();
            }
            return GameControler._Mgr;
        },
        enumerable: true,
        configurable: true
    });
    GameControler.prototype.SetPlayerID = function (id) {
        console.debug("Selected" + id);
    };
    //显示设置面板
    GameControler.prototype.ShowSetPanel = function () {
        var Panel = new SetPanel();
        APP.UIManager.Open(Panel);
    };
    //显示角色面板
    GameControler.prototype.ShowCharacterPanel = function () {
        var character = new CharacterUI();
        APP.UIManager.Open(character);
    };
    Object.defineProperty(GameControler.prototype, "SetInfo", {
        get: function () {
            if (this._SetInfo == null) {
                this._SetInfo = new SetInfo();
            }
            return this._SetInfo;
        },
        set: function (value) {
            this._SetInfo = value;
        },
        enumerable: true,
        configurable: true
    });
    //保存设置数据
    GameControler.prototype.SaveSetInfo = function (info) {
        this.SetInfo = info;
    };
    //读取设置信息
    GameControler.prototype.GetSetInfo = function () {
        return this.SetInfo;
    };
    GameControler.prototype.EnterGameUI = function () {
        APP.GameManager.EnterScene();
    };
    GameControler.prototype.EnterGame = function () {
        APP.GameManager.EnterScene();
    };
    return GameControler;
}());
var SetInfo = /** @class */ (function () {
    function SetInfo() {
        this.AudioOn = true;
        this.OPIsRight = true;
        this.TextInfo = "Hello \n Hello";
    }
    return SetInfo;
}());
//# sourceMappingURL=GameControler.js.map