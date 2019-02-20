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
        _this._Count3DLoad = 0.5;
        _this._Count2DLoad = 0.5;
        return _this;
    }
    LoadDirctor.prototype.ReStart = function () {
    };
    //
    LoadDirctor.prototype._Start = function () {
        Laya.loader.on(Laya.Event.ERROR, this, this._onError);
        Laya.loader.on(Laya.Event.COMPLETE, this, this._onComplete);
        this.Load();
        _super.prototype._Start.call(this);
        this._LoadFaile = false;
    };
    LoadDirctor.prototype._StartComplete = function () {
        _super.prototype._StartComplete.call(this);
        this.UI = APP.UIManager.Show(LoadUI);
        this.UI.Update();
    };
    LoadDirctor.prototype.Load = function () {
        this._Count2DLoad = 0;
        this._Count3DLoad = 0;
        this._CountValue = 0;
        this._LoadFaile = false;
        var resource2DArr = [
            { url: "res/uijson/PlayerList.json", type: Laya.Loader.JSON },
            { url: "res/uijson/Characters.json", type: Laya.Loader.JSON },
            { url: "res/uijson/SetPanel.json", type: Laya.Loader.JSON },
            { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS }
        ];
        var resource3DArr = ["http://www.gsjgame.com/Resource/LayaScene_L01_spr_plat_01/L01_spr_plat_01.lh",
            "http://www.gsjgame.com/Resource/LayaScene_L01_spr_plat_02/L01_spr_plat_02.lh",
            "http://www.gsjgame.com/Resource/LayaScene_L01_spr_plat_03/L01_spr_plat_03.lh",
            "http://www.gsjgame.com/Resource/LayaScene_L01_spr_barrier_01/L01_spr_barrier_01.lh",
            "http://www.gsjgame.com/Resource/LayaScene_L01_spr_barrier_02/L01_spr_barrier_02.lh",
            "http://www.gsjgame.com/Resource/LayaScene_L01_spr_barrier_03/L01_spr_barrier_03.lh",
            "http://www.gsjgame.com/Resource/LayaScene_child_01/child_01.lh"];
        this._Load(resource2DArr, resource3DArr);
    };
    LoadDirctor.prototype._Load = function (arr2D, arr3D) {
        if (arr2D === void 0) { arr2D = null; }
        if (arr3D === void 0) { arr3D = null; }
        if (arr2D != null) {
            //Laya.loader.load(arr2D,Laya.Handler.create(this,this._onLoaded),Laya.Handler.create(this,this._on2DProgress,null,false));
            Laya.loader.load(arr2D, null, Laya.Handler.create(this, this._on2DProgress, null, false));
        }
        else {
            this._CountValue += 0.5;
            this._Count2DLoad = 1;
        }
        if (arr3D != null) {
            //            Laya.loader.create(arr3D,Laya.Handler.create(this,this._on3DLoaded),Laya.Handler.create(this,this._on3DProgress,null,false));
            Laya.loader.create(arr3D, Laya.Handler.create(this, null), Laya.Handler.create(this, this._on3DProgress, null, false));
        }
        else {
            this._CountValue += 0.5;
            this._Count3DLoad = 1;
        }
    };
    LoadDirctor.prototype._onError = function (str) {
        this._LoadFaile = true;
        console.debug("LoadError:" + str);
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
    LoadDirctor.prototype._onComplete = function (data) {
        if (this._LoadFaile) {
            var thiDir = this;
            this.UI.Reload(function () { thiDir.Load(); });
        }
        else {
            this.UI.Complete(StageAPP.GuiderManager.EnterScene);
        }
        return;
    };
    LoadDirctor.prototype._Update = function () {
    };
    return LoadDirctor;
}(BaseDirector));
//# sourceMappingURL=LoadScene.js.map