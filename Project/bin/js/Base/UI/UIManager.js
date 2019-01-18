/**作者:Mo
 * UI管理
 */
var UITypeEnum;
(function (UITypeEnum) {
    UITypeEnum[UITypeEnum["Low"] = 0] = "Low";
    UITypeEnum[UITypeEnum["Midle"] = 1] = "Midle";
})(UITypeEnum || (UITypeEnum = {}));
;
var UIManager = /** @class */ (function () {
    //内部功能
    function UIManager() {
        this._UINode = new Laya.Sprite();
        this._MidleUINode = new Laya.Sprite();
        Laya.stage.addChild(this._UINode);
        Laya.stage.addChild(this._MidleUINode);
    }
    Object.defineProperty(UIManager, "Mgr", {
        get: function () {
            if (UIManager._Mgr == null) {
                UIManager._Mgr = new UIManager();
            }
            return UIManager._Mgr;
        },
        enumerable: true,
        configurable: true
    });
    UIManager.prototype.Open = function (ui) {
        this._UINode.addChild(ui);
        ui.OpenOP();
    };
    UIManager.prototype.Close = function (ui) {
        ui.removeSelf();
        ui.CloseOP();
    };
    UIManager.prototype.CloseCurView = function () {
        var ui = this._UINode.getChildAt(this._UINode.numChildren - 1);
        this.Close(ui);
    };
    //删除所有节点上的UI
    UIManager.prototype.Clear = function () {
        var uiNode = this._UINode;
        while (uiNode.numChildren) {
            uiNode.getChildAt(0).removeSelf();
        }
        uiNode = this._MidleUINode;
        while (uiNode.numChildren) {
            uiNode.getChildAt(0).removeSelf();
        }
    };
    return UIManager;
}());
//# sourceMappingURL=UIManager.js.map