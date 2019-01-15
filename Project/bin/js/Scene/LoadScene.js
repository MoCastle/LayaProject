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
        var resCol = [{ url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS }, { url: "Loading.json", type: Laya.Loader.JSON }];
        Laya.loader.load(resCol, Laya.Handler.create(this, this._LoadComplete));
    };
    return LoadScene;
}(BaseScene));
var LoadDirctor = /** @class */ (function (_super) {
    __extends(LoadDirctor, _super);
    function LoadDirctor() {
        var _this = _super.call(this) || this;
        _this.UI = new LoadUI();
        _this.Count3DLoad = 0.5;
        _this.CountLoad = 0.5;
        return _this;
    }
    LoadDirctor.prototype.ReStart = function () {
    };
    LoadDirctor.prototype._Start = function () {
        APP.UIManager.Open(this.UI);
        this.UI.Update();
        this.Load();
        _super.prototype._Start.call(this);
    };
    LoadDirctor.prototype.Load = function () {
        this.CountLoad = 0;
        this.Count3DLoad = 0;
        Laya.loader.on(Laya.Event.ERROR, this, this._onError);
        var resourceArr = [{ url: "https://ldc.layabox.com/index/img/laya2_text.png" }, { url: "https://ldc.layabox.com/index/img/cloud_text.png" }, { url: "D:/TestProject/TSProject/Project/bin/res/layabox.png" }, { url: "C:/Users/Administrator/Desktop/mbg.png" }, { url: "https://raw.githubusercontent.com/MoCastle/Resources/master/lbl/Assets/Resource/LBL/tsx_bot129.Out.png" }];
        var resource3DArr = [{ url: "sdf.ls" }];
        this._Load(resourceArr, resource3DArr);
    };
    LoadDirctor.prototype._Load = function (arr2D, arr3D) {
        if (arr2D === void 0) { arr2D = null; }
        if (arr3D === void 0) { arr3D = null; }
        if (arr2D != null) {
            Laya.loader.load(arr2D, Laya.Handler.create(this, this._onLoaded), Laya.Handler.create(this, this._on2DProgress, null, false));
        }
        if (arr3D != null) {
            Laya.loader.create(arr3D, Laya.Handler.create(this, this._onLoaded3D), Laya.Handler.create(this, this._on3DProgress, null, false));
        }
    };
    LoadDirctor.prototype._onError = function (str) {
        console.debug(str);
    };
    LoadDirctor.prototype._on3DError = function (str) {
        console.debug(str);
    };
    LoadDirctor.prototype._on3DProgress = function (value) {
        this.Count3DLoad += value / 2;
        this.UI.Value = (this.CountLoad + this.Count3DLoad);
    };
    LoadDirctor.prototype._on2DProgress = function (value) {
        this.CountLoad += value / 2;
        this.UI.Value = this.CountLoad + this.Count3DLoad;
    };
    LoadDirctor.prototype._onLoaded = function () {
        if (this.CountLoad + this.Count3DLoad >= 1) {
            this.UI.Complete(StageAPP.GuiderManager.EnterScene);
        }
        else {
            this.UI.Reload(this.Load);
        }
    };
    LoadDirctor.prototype._onLoaded3D = function () {
    };
    LoadDirctor.prototype._Update = function () {
    };
    return LoadDirctor;
}(BaseDirector));
//# sourceMappingURL=LoadScene.js.map