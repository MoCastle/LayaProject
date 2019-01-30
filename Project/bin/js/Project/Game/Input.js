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
 * 输入管理相关
 */
//基础输入控制器
var BaseGameInput = /** @class */ (function () {
    //私有
    function BaseGameInput(input) {
        if (input === void 0) { input = null; }
        if (input == null) {
            input = this;
        }
        this.NextInput = input;
    }
    return BaseGameInput;
}());
var DIYInput = /** @class */ (function (_super) {
    __extends(DIYInput, _super);
    function DIYInput(owner, listener) {
        if (owner === void 0) { owner = null; }
        if (listener === void 0) { listener = null; }
        var _this = _super.call(this) || this;
        _this._Owner = owner;
        _this._Listener = listener;
        return _this;
    }
    DIYInput.prototype.Input = function (isRight) {
        if (this._Listener)
            this._Listener.call(this._Owner, isRight);
    };
    return DIYInput;
}(BaseGameInput));
var NormGameInput = /** @class */ (function (_super) {
    __extends(NormGameInput, _super);
    function NormGameInput(dir, input) {
        if (input === void 0) { input = null; }
        var _this = _super.call(this, input) || this;
        _this.GameDir = dir;
        return _this;
    }
    NormGameInput.prototype.Input = function (isRight) {
        this.GameDir.MoveStep(isRight);
    };
    return NormGameInput;
}(BaseGameInput));
//# sourceMappingURL=Input.js.map