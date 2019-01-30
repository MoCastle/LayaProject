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
var ui;
(function (ui) {
    var ExtendsLoadUI = /** @class */ (function (_super) {
        __extends(ExtendsLoadUI, _super);
        function ExtendsLoadUI() {
            var _this = _super.call(this) || this;
            _this.Guider = _this._Guider;
            _this.Progress = _this._Progress;
            _this.Enter = _this._Enter;
            _this._Name = _this.Enter.label.split("#");
            _this.Enter.visible = false;
            _this.Enter.on(Laya.Event.CLICK, _this, _this._OnClickButton);
            return _this;
        }
        ExtendsLoadUI.prototype.Update = function () {
            var x = 0;
            x += this.Progress.width * this.Progress.value;
            this.Guider.pos(x, this.Guider.y);
        };
        ExtendsLoadUI.prototype.createChildren = function () {
            var res = Laya.loader.getRes("res/uijson/Loading.json");
            this.createView(res);
            _super.prototype.createChildren.call(this);
        };
        Object.defineProperty(ExtendsLoadUI.prototype, "Value", {
            set: function (num) {
                this.Progress.value = num;
                this.Update();
            },
            enumerable: true,
            configurable: true
        });
        ExtendsLoadUI.prototype.Complete = function (callBack) {
            this._CallBack = callBack;
            this.Enter.visible = true;
            this.Enter.label = this._Name[0];
        };
        ExtendsLoadUI.prototype.Reload = function (callBack) {
            this._CallBack = function () { this.Enter.visible = false; callBack(); };
            this.Enter.visible = true;
            this.Enter.label = this._Name[1];
        };
        ExtendsLoadUI.prototype._OnClickButton = function () {
            if (this._CallBack != null) {
                this._CallBack();
            }
        };
        return ExtendsLoadUI;
    }(ui.LoadingUI));
    ui.ExtendsLoadUI = ExtendsLoadUI;
})(ui || (ui = {}));
var LoadUI = /** @class */ (function (_super) {
    __extends(LoadUI, _super);
    function LoadUI(name) {
        var _this = _super.call(this, name) || this;
        _this.LoadUI = new ui.ExtendsLoadUI();
        _this.addChild(_this.LoadUI);
        return _this;
    }
    LoadUI.Name = function () {
        return "LoadUI";
    };
    LoadUI.prototype.Update = function () {
        this.LoadUI.Update();
    };
    Object.defineProperty(LoadUI.prototype, "Value", {
        set: function (num) {
            this.LoadUI.Value = num;
        },
        enumerable: true,
        configurable: true
    });
    LoadUI.prototype.Complete = function (callBack) {
        this.LoadUI.Complete(callBack);
    };
    LoadUI.prototype.Reload = function (callBack) {
        this.LoadUI.Reload(callBack);
    };
    return LoadUI;
}(BaseUI));
//# sourceMappingURL=LoadingUI.js.map