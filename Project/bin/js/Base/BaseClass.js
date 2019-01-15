/**作者:Mo
 * 通用的公共基类
 */
//穿戴模式基类
var Clothe = /** @class */ (function () {
    function Clothe(close) {
        if (close === void 0) { close = null; }
        if (close == null) {
            close = this;
        }
        this.NextClose = close;
    }
    return Clothe;
}());
//# sourceMappingURL=BaseClass.js.map