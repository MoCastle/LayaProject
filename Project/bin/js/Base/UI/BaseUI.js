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
//UI基类
var BaseUI = /** @class */ (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        var _this = _super.call(this) || this;
        _this._UIType = UITypeEnum.Low;
        return _this;
    }
    BaseUI.prototype.Open = function () {
        UIManager.Mgr.Open(this);
    };
    BaseUI.prototype.Close = function () {
        UIManager.Mgr.Close(this);
    };
    BaseUI.prototype.OpenOP = function () {
    };
    BaseUI.prototype.CloseOP = function () {
    };
    BaseUI.prototype.Destroy = function () {
        this.destroy();
    };
    Object.defineProperty(BaseUI.prototype, "UIType", {
        get: function () {
            return this._UIType;
        },
        enumerable: true,
        configurable: true
    });
    return BaseUI;
}(Laya.Sprite));
//# sourceMappingURL=BaseUI.js.map