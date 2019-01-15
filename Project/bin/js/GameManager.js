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
/*
作者:Mo
跳山羊场景核心功能
*/
//游戏玩法管理
var GameManager = /** @class */ (function () {
    //内部功能
    function GameManager() {
        this.SceneMgr = SceneManager.Mgr;
    }
    Object.defineProperty(GameManager, "Mgr", {
        get: function () {
            if (GameManager._Mgr == null) {
                GameManager._Mgr = new GameManager();
            }
            return GameManager._Mgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "GameDir", {
        get: function () {
            return this.CurScene.GameDir;
        },
        enumerable: true,
        configurable: true
    });
    //进入游戏场景走这个接口
    GameManager.prototype.EnterScene = function () {
        var newGameScene = new GameScene();
        SceneManager.Mgr.EnterScene(newGameScene);
        this.SceneMgr.CurScene = newGameScene;
        this.CurScene = newGameScene;
    };
    //常量定义
    //每行最大格子数
    GameManager.LineStepNum = 5 + 2;
    //最大行数
    GameManager.MaxLineNum = 11;
    //格子边长
    GameManager.StepLength = 0.5;
    //格子斜对角长度
    GameManager.StepDistance = Math.sqrt((GameManager.StepLength * GameManager.StepLength) * 2);
    return GameManager;
}());
//游戏场景
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    //内部功能
    function GameScene() {
        return _super.call(this) || this;
    }
    //对外接口
    GameScene.prototype.StartLoad = function () {
        this._LoadComplete();
        _super.prototype.StartLoad.call(this);
    };
    GameScene.prototype._Start = function () {
        _super.prototype._Start.call(this);
    };
    GameScene.prototype._Update = function () {
        _super.prototype._Update.call(this);
    };
    GameScene.prototype._GenDir = function () {
        this.GameDir = new GameDirector();
        this.CurDir = this.GameDir;
    };
    GameScene.prototype._LoadComplete = function () {
        this.Scene = new Laya.Scene();
        _super.prototype._LoadComplete.call(this);
    };
    return GameScene;
}(BaseScene));
//游戏导演
var GameDirector = /** @class */ (function (_super) {
    __extends(GameDirector, _super);
    //内部功能
    function GameDirector() {
        return _super.call(this) || this;
    }
    //对外接口
    GameDirector.prototype.Start = function () {
        this._Start();
    };
    //重新开始
    GameDirector.prototype.ReStart = function () {
        this._StartComplete();
    };
    //左右移动
    GameDirector.prototype.MoveStep = function (isRight) {
        //移动中不让输入
        if (this.Player.BaseCtrler.Time > 0) {
            return;
        }
        //var buff = this.Buffer;
        /*
        if(this.JudgeCanMove())
        {
            return;
        }
        */
        //获取下一层的Step
        var step = this.Player.CurStep;
        if (isRight) {
            step = step.RightParent;
        }
        else {
            step = step.LeftParent;
        }
        if (step == null) {
            return;
        }
        this.Player.CurStep = step;
        this.Player.BaseCtrler.StartMove();
    };
    //创建相关放这 这里重新开始不会走
    GameDirector.prototype._Start = function () {
        //创建方向光
        var directionLight = new Laya.DirectionLight();
        this.SceneMgr.CurScene.PutObj(directionLight);
        directionLight.color = new Laya.Vector3(1, 1, 1);
        directionLight.direction = new Laya.Vector3(1, -1, 0);
        //创建相机
        /*
        this.GameScene = GameManager.Mgr.CurScene;
        this.Camera = this.GameScene.Scene.getChildByName("Camera") as Laya.Camera;
        this.Camera.transform.localRotationEuler =new Laya.Vector3(-30,0,0);
        this.Camera.transform.position = new Laya.Vector3(0,0,0)
        this.Camera.transform.translate(new Laya.Vector3(0,2,6));
*/
        this.Camera = new GameCamera();
        this.Camera.transform.localRotationEuler = new Laya.Vector3(-30, 0, 0);
        this.SceneMgr.CurScene.PutObj(this.Camera);
        this.MountLines = [];
        var maxLineNum = GameManager.MaxLineNum;
        for (var lineIdx = maxLineNum - 1; lineIdx >= 0; --lineIdx) {
            var newMountLine = new MountLine(lineIdx, lineIdx);
            this.SceneMgr.CurScene.PutObj(newMountLine);
            this.MountLines[lineIdx] = newMountLine;
        }
        //创建UI
        var panelUI = new GameUI();
        var dir = this;
        panelUI.GamePanelUI.LeftTouch.on(Laya.Event.CLICK, null, function () {
            dir.InputCtrl.Input(!IsRight);
        });
        panelUI.GamePanelUI.RightTouch.on(Laya.Event.CLICK, null, function () {
            dir.InputCtrl.Input(IsRight);
        });
        this.PanelUI = panelUI;
        //创建玩家
        this.Player = new Player();
        this.SceneMgr.CurScene.PutObj(this.Player);
        _super.prototype._Start.call(this);
    };
    GameDirector.prototype._Leave = function () {
        _super.prototype._Leave.call(this);
    };
    //进入游戏的设置放这里 重新开始走这里
    GameDirector.prototype._StartComplete = function () {
        this.PanelUI.Open();
        var lines = this.MountLines;
        //创建输入控制器
        this.InputCtrl = new NormGameInput(this);
        for (var idx = 0; idx < lines.length; ++idx) {
            var line = this.MountLines[idx];
            line.SetLine(idx);
            if (idx > 0)
                lines[idx - 1].SetNextFloor(line);
            else
                this.Player.SetStep(line.GetStep(Math.floor(line.LogicLength / 2)));
        }
        this.Camera.Reset(new Laya.Vector3(), new Laya.Vector3(this.Player.Position.x, 4, 4), this.Player);
        _super.prototype._StartComplete.call(this);
    };
    GameDirector.prototype._Update = function () {
    };
    return GameDirector;
}(BaseDirector));
//# sourceMappingURL=GameManager.js.map