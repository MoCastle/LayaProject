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
var LoadScene = /** @class */ (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        return _super.call(this) || this;
    }
    LoadScene.prototype._GenDir = function () {
        this.CurDir = new LoadDirctor();
    };
    LoadScene.prototype.StartLoad = function () {
        var resCol = [{ url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS }, { url: "res/uijson/Loading.json", type: Laya.Loader.JSON }];
        Laya.loader.load(resCol, Laya.Handler.create(this, this._LoadComplete));
    };
    return LoadScene;
}(BaseScene));
var LoadDirctor = /** @class */ (function (_super) {
    __extends(LoadDirctor, _super);
    function LoadDirctor() {
        var _this = _super.call(this) || this;
        _this.UI = new LoadUI();
        _this._Count3DLoad = 0.5;
        _this._Count2DLoad = 0.5;
        return _this;
    }
    LoadDirctor.prototype.ReStart = function () {
    };
    //
    LoadDirctor.prototype._Start = function () {
        APP.UIManager.Open(this.UI);
        this.UI.Update();
        this.Load();
        _super.prototype._Start.call(this);
        this._LoadFaile = false;
        Laya.loader.on(Laya.Event.ERROR, this, this._onError);
    };
    LoadDirctor.prototype.Load = function () {
        this._Count2DLoad = 0;
        this._Count3DLoad = 0;
        this._CountValue = 0;
        this._LoadFaile = false;
        var resource2DArr = [
            { url: "res/uijson/Characters.json", type: Laya.Loader.JSON },
            { url: "res/uijson/SetPanel.json", type: Laya.Loader.JSON },
            { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS }
        ];
        var resource3DArr = [{ url: "res/LayaScene_TestLBL/TestLBL.ls" }];
        this._Load(resource2DArr, resource3DArr);
    };
    LoadDirctor.prototype._Load = function (arr2D, arr3D) {
        if (arr2D === void 0) { arr2D = null; }
        if (arr3D === void 0) { arr3D = null; }
        if (arr2D != null) {
            Laya.loader.load(arr2D, Laya.Handler.create(this, this._onLoaded), Laya.Handler.create(this, this._on2DProgress, null, false));
        }
        if (arr3D != null) {
            Laya.loader.create(arr3D, Laya.Handler.create(this, this._on3DLoaded), Laya.Handler.create(this, this._on3DProgress, null, false));
        }
    };
    LoadDirctor.prototype._onError = function (str) {
        this._LoadFaile = true;
        console.debug(str);
    };
    LoadDirctor.prototype._on3DProgress = function (value) {
        if (this._LoadFaile) {
            return;
        }
        this._Count3DLoad = value / 2;
        this.UI.Value = (this._Count2DLoad + this._Count3DLoad);
    };
    LoadDirctor.prototype._on2DProgress = function (value) {
        if (this._LoadFaile) {
            return;
        }
        this._Count2DLoad = value / 2;
        this.UI.Value = this._Count2DLoad + this._Count3DLoad;
    };
    LoadDirctor.prototype._onLoaded = function () {
        this._CountValue += 0.5;
        if (this._CountValue >= 1) {
            if (this._LoadFaile) {
                var thiDir = this;
                this.UI.Reload(function () { thiDir.Load(); });
            }
            else
                this.UI.Complete(StageAPP.GuiderManager.EnterScene);
        }
    };
    LoadDirctor.prototype._on3DLoaded = function () {
        this._CountValue += 0.5;
        if (this._CountValue >= 1) {
            if (this._LoadFaile) {
                var thiDir = this;
                this.UI.Reload(function () { thiDir.Load(); });
            }
            else
                this.UI.Complete(StageAPP.GuiderManager.EnterScene);
        }
    };
    LoadDirctor.prototype._Update = function () {
    };
    return LoadDirctor;
}(BaseDirector));
//# sourceMappingURL=LoadScene.js.map