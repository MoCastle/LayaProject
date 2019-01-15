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
var UIComponents = /** @class */ (function () {
    function UIComponents() {
    }
    return UIComponents;
}());
//滑动相册
var SlipPhotoMap = /** @class */ (function (_super) {
    __extends(SlipPhotoMap, _super);
    function SlipPhotoMap(panelContain) {
        return _super.call(this) || this;
    }
    return SlipPhotoMap;
}(Laya.Sprite));
//滑动列表
var SlipList = /** @class */ (function () {
    function SlipList() {
    }
    return SlipList;
}());
//# sourceMappingURL=UIComponents.js.map