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
    Object.defineProperty(SceneManager.prototype, "CurScene", {
        get: function () {
            return this._CurScene;
        },
        set: function (value) {
            this._CurScene = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "CurDir", {
        get: function () {
            return this._CurScene.CurDir;
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
        if (this.CurScene != null)
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
        APP.UIManager.Clear();
        if (this.CurDir.ObjState == LifeObjState.Ended) {
            _super.prototype._Leaveing.call(this);
        }
    };
    BaseScene.prototype._LeaveComplete = function () {
        _super.prototype._LeaveComplete.call(this);
        if (this.Scene) {
            this.Scene.removeSelf();
            while (this.Scene.numChildren) {
                var actor = this.Scene.getChildAt(0);
                actor.removeSelf();
            }
        }
        this.SceneMgr.CurScene = this._NextScene;
        //zerg 场景不知道会不会内存泄漏
    };
    BaseScene.prototype._Update = function () {
        if (this.CurDir != null)
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
    BaseScene.prototype._Starting = function () {
        //资源都没下完就不要走其它逻辑了
        if (this.IsLoading && this.IsLoadComplete) {
            this._LoadComplete();
        }
        else
            _super.prototype._Starting.call(this);
    };
    BaseScene.prototype._StartComplete = function () {
        APP.UIManager.Clear();
        this._GenDir();
        _super.prototype._StartComplete.call(this);
    };
    return BaseScene;
}(LifeObj));
//导演基类
var BaseDirector = /** @class */ (function (_super) {
    __extends(BaseDirector, _super);
    function BaseDirector() {
        var _this = _super.call(this) || this;
        _this.SceneMgr = GM.SceneMgr;
        _this._TimeUpCount = 0;
        _this._StartGameTime = 0;
        _this._TimeUpClock = -1;
        return _this;
    }
    Object.defineProperty(BaseDirector.prototype, "GameTime", {
        get: function () {
            if (this._TimeUpClock > 0) {
                return this._TimeUpClock - this._StartGameTime - this._TimeUpCount;
            }
            else {
                return Laya.timer.currTimer - this._StartGameTime - this._TimeUpCount;
            }
        },
        set: function (value) {
            this._StartGameTime = value;
        },
        enumerable: true,
        configurable: true
    });
    //外部接口
    BaseDirector.prototype.Start = function () {
        this._Start();
    };
    BaseDirector.prototype._Start = function () {
        this._StartGameTime = Laya.timer.currTimer;
        _super.prototype._Start.call(this);
    };
    BaseDirector.prototype._Leave = function () {
        APP.MessageCenter.DesRgistIDK(GameEvent.GameTimeUp);
        APP.MessageCenter.DesRgistIDK(GameEvent.GameContinue);
        _super.prototype._Leave.call(this);
    };
    BaseDirector.prototype.TimeUp = function () {
        if (this._TimeUpClock <= 0) {
            APP.MessageCenter.Trigger(GameEvent.GameTimeUp);
            this._TimeUpClock = Laya.timer.currTimer;
        }
    };
    BaseDirector.prototype.Update = function () {
        if (this._TimeUpClock <= 0) {
            _super.prototype.Update.call(this);
        }
    };
    BaseDirector.prototype.ContinueTime = function () {
        APP.MessageCenter.Trigger(GameEvent.GameContinue);
        this._TimeUpCount += Laya.timer.currTimer - this._TimeUpClock;
        this._TimeUpClock = -1;
    };
    Object.defineProperty(BaseDirector.prototype, "CurGameTime", {
        get: function () {
            return this._StartGameTime + this._TimeUpCount;
        },
        enumerable: true,
        configurable: true
    });
    BaseDirector.prototype._StartComplete = function () {
        this._TimeUpCount = 0;
        this._StartGameTime = 0;
        this._TimeUpClock = -1;
        APP.UIManager.Clear();
        _super.prototype._StartComplete.call(this);
    };
    return BaseDirector;
}(LifeObj));
//# sourceMappingURL=Scene.js.map