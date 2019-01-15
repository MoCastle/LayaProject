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
/**作者Mo
 * 场景功能
 */
//场景管理
var SceneManager = /** @class */ (function () {
    function SceneManager() {
        this.CurScene = null;
        //添加场景管理
        this.SceneCtrler = Laya.stage.addChild(new Laya.Sprite());
    }
    Object.defineProperty(SceneManager, "Mgr", {
        get: function () {
            if (this._Mgr == null) {
                this._Mgr = new SceneManager();
            }
            return this._Mgr;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.EnterScene = function (targetScene) {
        if (this.CurScene == null)
            this.CurScene = targetScene;
        else
            this.CurScene.Leave(targetScene);
    };
    SceneManager.prototype.Update = function () {
        this.CurScene.Update();
    };
    return SceneManager;
}());
//场景基类
var BaseScene = /** @class */ (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super.call(this) || this;
        _this.SceneMgr = SceneManager.Mgr;
        _this.IsLoading = false;
        _this.IsLoadComplete = false;
        _this.CurDir = null;
        _this.Scene = null;
        _this._LoadCallBack = null;
        _this._NextScene = null;
        return _this;
    }
    //结束场景
    BaseScene.prototype.Leave = function (nextStage) {
        this._NextScene = nextStage;
        nextStage.StartLoad();
        this._Leave();
    };
    BaseScene.prototype.StartLoad = function () {
        this.IsLoading = true;
    };
    //开始场景
    BaseScene.prototype.Start = function () {
        if (!this.IsLoadComplete && !this.IsLoading)
            this.StartLoad();
        else
            this._Start();
        if (this.IsLoading && this._LoadCallBack == null) {
            this._LoadCallBack = this._Start;
        }
    };
    //放对象
    BaseScene.prototype.PutObj = function (node) {
        this.Scene.addChild(node);
    };
    BaseScene.prototype._Leaving = function () {
        if (this.CurDir.ObjState == LifeObjState.Ended) {
            _super.prototype._Leaveing.call(this);
        }
    };
    BaseScene.prototype._LeaveComplete = function () {
        this._LeaveComplete();
        this.SceneMgr.CurScene = this._NextScene;
    };
    BaseScene.prototype._Update = function () {
        if (this.IsLoadComplete && this.CurDir != null)
            this.CurDir.Update();
    };
    BaseScene.prototype._LoadComplete = function () {
        this.IsLoadComplete = true;
        this.IsLoading = false;
        if (this._LoadCallBack != null) {
            this._LoadCallBack();
            this._LoadCallBack = null;
        }
    };
    BaseScene.prototype._Start = function () {
        if (this.Scene == null) {
            console.debug("Error: wrong");
        }
        this.SceneMgr.SceneCtrler.addChild(this.Scene);
        _super.prototype._Start.call(this);
    };
    BaseScene.prototype._StartComplete = function () {
        this._GenDir();
        _super.prototype._StartComplete.call(this);
    };
    return BaseScene;
}(LifeObj));
//导演基类
var BaseDirector = /** @class */ (function (_super) {
    __extends(BaseDirector, _super);
    //私有属性和功能
    function BaseDirector() {
        var _this = _super.call(this) || this;
        _this.SceneMgr = GM.SceneMgr;
        return _this;
    }
    //外部接口
    BaseDirector.prototype.Start = function () {
        this._Start();
    };
    BaseDirector.prototype.Leave = function () {
        this._Leave();
    };
    return BaseDirector;
}(LifeObj));
//# sourceMappingURL=Scene.js.map