var PlayerManager = /** @class */ (function () {
    function PlayerManager() {
        this._PlayerData = new PlayerData();
    }
    Object.defineProperty(PlayerManager, "Mgr", {
        get: function () {
            if (PlayerManager._Mgr == null) {
                PlayerManager._Mgr = new PlayerManager();
            }
            return PlayerManager._Mgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerManager.prototype, "PlayerData", {
        get: function () {
            return this._PlayerData;
        },
        set: function (value) {
            this._PlayerData = value;
        },
        enumerable: true,
        configurable: true
    });
    return PlayerManager;
}());
var PlayerData = /** @class */ (function () {
    function PlayerData() {
    }
    return PlayerData;
}());
//# sourceMappingURL=PlayerManager.js.map