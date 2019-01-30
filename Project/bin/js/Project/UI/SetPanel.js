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
    var ExtendsSetPanel = /** @class */ (function (_super) {
        __extends(ExtendsSetPanel, _super);
        function ExtendsSetPanel() {
            var _this = _super.call(this) || this;
            //this._Return.on(Laya.Event.CLICK,this,()=>{APP.UIManager.CloseCurView()});
            _this._Return.on(Laya.Event.CLICK, _this, function () { APP.UIManager.CloseCurView(); StageAPP.GuiderManager.EnterScene(); });
            _this.SetPanel();
            return _this;
        }
        ExtendsSetPanel.prototype.createChildren = function () {
            var res = Laya.loader.getRes("res/uijson/SetPanel.json");
            this.createView(res);
            _super.prototype.createChildren.call(this);
        };
        ExtendsSetPanel.prototype.SetPanel = function () {
            var info = ControlAPP.GameControler.GetSetInfo();
            this._AudioSwitch.selectedIndex = info.AudioOn ? 0 : 1;
            this._OPSwitch.selectedIndex = info.OPIsRight ? 1 : 0;
            this._Text.text = info.TextInfo;
        };
        ExtendsSetPanel.prototype.SavePanel = function () {
            var info = new SetInfo();
            info.AudioOn = this._AudioSwitch.selectedIndex == 0;
            info.OPIsRight = this._OPSwitch.selectedIndex == 1;
            ControlAPP.GameControler.SaveSetInfo(info);
        };
        ExtendsSetPanel.prototype.CloseOP = function () {
            this.SavePanel();
        };
        return ExtendsSetPanel;
    }(ui.SetPanelUI));
    ui.ExtendsSetPanel = ExtendsSetPanel;
})(ui || (ui = {}));
var SetPanelUI = /** @class */ (function (_super) {
    __extends(SetPanelUI, _super);
    function SetPanelUI(name) {
        var _this = _super.call(this, name) || this;
        _this._UIType = UITypeEnum.Midle;
        _this.UI = new ui.ExtendsSetPanel();
        _this.addChild(_this.UI);
        return _this;
    }
    SetPanelUI.Name = function () {
        return "SetPanel";
    };
    SetPanelUI.prototype.SetPanel = function () {
        this.UI.SetPanel();
    };
    SetPanelUI.prototype.SavePanel = function () {
        this.UI.SavePanel();
    };
    SetPanelUI.prototype.CloseOP = function () {
        this.UI.CloseOP();
    };
    return SetPanelUI;
}(BaseUI));
//# sourceMappingURL=SetPanel.js.map