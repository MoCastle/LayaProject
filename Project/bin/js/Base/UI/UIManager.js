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
 * UI管理
 */
var UIManager = /** @class */ (function () {
    //内部功能
    function UIManager() {
        this._UINode = new Laya.Sprite();
        Laya.stage.addChild(this._UINode);
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
    };
    UIManager.prototype.Close = function (ui) {
        ui.removeSelf();
    };
    //删除所有节点上的UI
    UIManager.prototype.Clear = function () {
        var uiNode = this._UINode;
        while (uiNode.numChildren) {
            uiNode.getChildAt(0).removeSelf();
        }
    };
    return UIManager;
}());
//UI基类
var BaseUI = /** @class */ (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        return _super.call(this) || this;
    }
    BaseUI.prototype.Open = function () {
        UIManager.Mgr.Open(this);
    };
    BaseUI.prototype.Close = function () {
        UIManager.Mgr.Close(this);
    };
    BaseUI.prototype.Destroy = function () {
        this.destroy();
    };
    return BaseUI;
}(Laya.Sprite));
//# sourceMappingURL=UIManager.js.map