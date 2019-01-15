var APP = /** @class */ (function () {
    function APP() {
    }
    Object.defineProperty(APP, "MessageCenter", {
        //消息中心
        get: function () {
            return MessageCenter.Mgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP, "GameManager", {
        get: function () {
            return GameManager.Mgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP, "UIManager", {
        get: function () {
            return UIManager.Mgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP, "SceneManager", {
        get: function () {
            return SceneManager.Mgr;
        },
        enumerable: true,
        configurable: true
    });
    return APP;
}());
var StageAPP = /** @class */ (function () {
    function StageAPP() {
    }
    Object.defineProperty(StageAPP, "GameManager", {
        get: function () {
            return GameManager.Mgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StageAPP, "GuiderManager", {
        get: function () {
            return GuiderManager.Mgr;
        },
        enumerable: true,
        configurable: true
    });
    return StageAPP;
}());
//# sourceMappingURL=APP.js.map