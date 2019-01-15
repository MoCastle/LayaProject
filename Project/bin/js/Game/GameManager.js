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
var GameEvent = {
    PlayerDeath: "PlayerDeath",
};
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
    //生成BUFF表现效果
    GameManager.prototype.GenBuffEffect = function (type) {
        return new Laya.Sprite3D();
    };
    //常量定义
    //每行最大格子数
    GameManager.LineStepNum = 5 + 2;
    //最大行数
    GameManager.MaxLineNum = 13;
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
    function GameDirector() {
        var _this = _super.call(this) || this;
        _this.PanelUI = null;
        _this.Camera = null;
        _this.GameScene = null;
        _this.MountLines = null;
        _this.Player = null;
        _this.InputCtrl = null;
        _this.ItemLayout = null;
        _this.CurLineRewards = null;
        _this.CurLineBarriers = null;
        _this._HeadFloorIdx = 0;
        _this._TailFLoorIdx = 0;
        _this._CountTime = 0;
        _this._BootomFloor = 0;
        _this._StartPosition = new Laya.Vector3();
        return _this;
    }
    Object.defineProperty(GameDirector.prototype, "HeadFloor", {
        get: function () {
            return this.MountLines[this._HeadFloorIdx];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDirector.prototype, "TailFLoor", {
        get: function () {
            return this.MountLines[this._TailFLoorIdx];
        },
        enumerable: true,
        configurable: true
    });
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
        //获取下一层的Step
        var step = this.Player.CurStep;
        if (isRight) {
            step = step.RightParent;
        }
        else {
            step = step.LeftParent;
        }
        if (step == null || step.StepItem.IsForbiden) {
            return;
        }
        this.Player.LayStep(step);
        this.Player.BaseCtrler.StartMove();
    };
    /**
     * 根据层数获取某层
     * @param {number} floor
     */
    GameDirector.prototype.GetFloorByFloor = function (floor) {
        var tailFloor = this.TailFLoor;
        if (floor < tailFloor.FloorNum) {
            return null;
        }
        var floorID = (floor - tailFloor.FloorNum + this._TailFLoorIdx) % this.MountLines.length;
        return this.MountLines[floorID];
    };
    /**
     * 通过坐标获取台阶
     * @param location 索引,层数
     */
    GameDirector.prototype.GetStepByLocation = function (location) {
        var getStep = this.GetFloorByFloor(location.Y).GetStep(location.X);
        return getStep;
    };
    Object.defineProperty(GameDirector.prototype, "PlayerFloor", {
        get: function () {
            var floor = this._StartPosition.z - this.Player.LogicPosition.z;
            floor = Math.round(floor / (GameManager.StepDistance / 2));
            return floor;
        },
        enumerable: true,
        configurable: true
    });
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
        //准备玩家死亡事件
        APP.MessageCenter.Regist(GameEvent.PlayerDeath, this.ReStart, this);
        _super.prototype._Start.call(this);
    };
    GameDirector.prototype._Leave = function () {
        _super.prototype._Leave.call(this);
    };
    //进入游戏的设置放这里 重新开始走这里
    GameDirector.prototype._StartComplete = function () {
        //重置物品
        this.ItemLayout = new ItemLayout();
        this.CurLineRewards = new Array();
        this.CurLineBarriers = new Array();
        this.PanelUI.Open();
        var lines = this.MountLines;
        //创建输入控制器
        this.InputCtrl = new NormGameInput(this);
        this._HeadFloorIdx = lines.length - 1;
        this._TailFLoorIdx = 0;
        for (var idx = 0; idx < lines.length; ++idx) {
            var line = this.MountLines[idx];
            line.SetLine(idx);
            if (idx > 0)
                lines[idx - 1].SetNextFloor(line);
            else {
                this.Player.SetStep(line.GetStep(Math.floor(line.LogicLength / 2)));
                this._StartPosition = this.Player.LogicPosition.clone();
            }
            this._PutItemInLine(idx);
        }
        this.Camera.Reset(new Laya.Vector3(), new Laya.Vector3(this.Player.Position.x, 4.5, 4), this.Player);
        this._CountTime = Laya.timer.currTimer + 6000;
        _super.prototype._StartComplete.call(this);
        this._BootomFloor = 0;
    };
    GameDirector.prototype._Update = function () {
        var flooVector = this.TailFLoor.Position;
        if (flooVector.z - this.Player.Position.z > 3 * GameManager.StepDistance / 2) {
            this._PushFLoor();
        }
        if (this._CountTime < Laya.timer.currTimer) {
            this._CountTime = Laya.timer.currTimer + 3000;
            this._DestroyLine(this._BootomFloor);
            this._BootomFloor += 1;
        }
    };
    //将层向上叠
    GameDirector.prototype._PushFLoor = function () {
        var preHead = this.HeadFloor;
        this._HeadFloorIdx = (this._HeadFloorIdx + 1) % this.MountLines.length;
        this._TailFLoorIdx = (this._TailFLoorIdx + 1) % this.MountLines.length;
        var Headfloor = preHead.FloorNum + 1;
        this.HeadFloor.SetLine(Headfloor);
        preHead.SetNextFloor(this.HeadFloor);
        this._PutItemInLine(Headfloor);
        return true;
    };
    /**
     * 摆放物品
     * @param {number} floor 物品列表
     */
    GameDirector.prototype._PutItemInLine = function (floor) {
        var safeCol = {};
        if (floor >= GameManager.MaxLineNum) {
            safeCol = this._CountOpenList(floor);
        }
        else {
            //摆放前先计算该层通路情况 
            safeCol = {};
            safeCol["o"] = this._CountRoadInfo(floor);
        }
        if (floor < 1) {
            return;
        }
        //获取该行要摆放的物品
        this._TakeItemList(floor);
        //标记一条绝对安全的路
        var safeIdxColl = {};
        for (var colKey in safeCol) {
            var list = safeCol[colKey];
            var safeIdx = list[Math.floor(Math.random() * list.length)];
            if (safeIdxColl[safeIdx] == undefined) {
                safeIdxColl[safeIdx] = 1;
            }
        }
        //把需要放道具的格子放入随机池
        var curFloor = this.GetFloorByFloor(floor);
        var randomPool = new Array();
        //把安全的格子暂时移出来
        var safeStepList = new Array();
        for (var stepIdx = 0; stepIdx < curFloor.LogicLength; ++stepIdx) {
            var getStep = curFloor.GetStep(stepIdx);
            if (safeIdxColl[stepIdx] == undefined) {
                randomPool.push(getStep);
            }
            else {
                safeStepList.push(getStep);
            }
        }
        //放陷阱
        var barriersList = this.CurLineBarriers;
        this._OrginizePutItem(barriersList, randomPool);
        //摆放道具
        for (var safeStepIdx = 0; safeIdx < safeStepList.length; ++safeIdx) {
            randomPool.push(safeStepList[safeIdx]);
        }
        var rewardList = this.CurLineRewards;
        this._OrginizePutItem(rewardList, randomPool);
        //再次计算通路情况 
        this._CountLastFloorRoad(floor);
    };
    /**
     * 摆放物品
     * @param {Array<LineItemInfo>} itemList 物品列表
     * @param {Array<Step>} randomPool 台阶集合
     */
    GameDirector.prototype._OrginizePutItem = function (itemList, randomPool) {
        for (var itemIdx = 0; itemIdx < itemList.length; ++itemIdx) {
            var info = itemList[itemIdx];
            for (var difficultyNum = 0; difficultyNum < info.Number;) {
                if (randomPool.length < 1) {
                    break;
                }
                //随机把障碍放入格子里
                var randomIdx = Math.floor(Math.random() * randomPool.length);
                var step = randomPool[randomIdx];
                randomPool.splice(randomIdx, 1);
                step.PutItem(info.Type);
                --info.Number;
            }
            if (randomPool.length < 1) {
                break;
            }
        }
        if (itemIdx > 0) {
            itemList.splice(0, itemIdx);
        }
    };
    /**
     *递归计算通路情况
     * @param {number} floorNum 物品列表
     */
    GameDirector.prototype._CountOpenList = function (floorNum) {
        for (var floorCount = this.PlayerFloor; floorCount <= floorNum; ++floorCount) {
            var floor = this.GetFloorByFloor(floorCount);
            for (var stepIdx = 0; stepIdx < floor.LogicLength; ++stepIdx) {
                var step = floor.GetStep(stepIdx);
                step.Mark = undefined;
            }
        }
        var floor = this.GetFloorByFloor(this.PlayerFloor);
        for (var stepIdx = 0; stepIdx < floor.LogicLength; ++stepIdx) {
            var step = floor.GetStep(stepIdx);
            if (!step.IsDeadRoad) {
                this._MarkSteps(step, stepIdx, floorNum);
            }
        }
        var targetFloor = this.GetFloorByFloor(floorNum);
        //找出被标记的点并整理成集合
        var collection = {};
        var name = "o";
        for (var openIdx = 0; openIdx < targetFloor.LogicLength; ++openIdx) {
            var markedStep = targetFloor.GetStep(openIdx);
            if (markedStep.Mark != undefined) {
                var Name = name + markedStep.Mark;
                if (collection[Name] == undefined) {
                    collection[Name] = new Array();
                }
                collection[Name].push(openIdx);
            }
        }
        return collection;
    };
    /**
     *递归标记通路情况
     * @param {Step} step 台阶
     * @param {any} mark 标记
     * @param {number} targetFloorNum 目标层数
     */
    GameDirector.prototype._MarkSteps = function (step, mark, targetFloorNum) {
        if (step.IsDeadRoad)
            return false;
        if (step.Floor.FloorNum >= targetFloorNum) {
            if (step.Mark == undefined) {
                step.Mark = mark;
            }
            return true;
        }
        var leftOpen;
        var rightOpen;
        var leftParent = step.LeftParent;
        if (leftParent != null && !leftParent.IsDeadRoad) {
            if (leftParent.Mark == undefined)
                leftOpen = this._MarkSteps(leftParent, mark, targetFloorNum);
            else
                leftOpen = true;
        }
        var rightParent = step.RightParent;
        if (rightParent != null && !rightParent.IsDeadRoad) {
            if (rightParent.Mark == undefined)
                rightOpen = this._MarkSteps(rightParent, mark, targetFloorNum);
            else
                rightOpen = true;
        }
        if (step.Mark == undefined) {
            step.Mark = mark;
        }
        if (!leftOpen && !rightOpen) {
            step.IsDeadRoad = true;
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * 最后再计算一次该层通路情况
     * @param {number} floorNum
     */
    GameDirector.prototype._CountLastFloorRoad = function (floorNum) {
        if (floorNum < this.TailFLoor.FloorNum) {
            return;
        }
        var floor = this.GetFloorByFloor(floorNum);
        var lastFloor = this.GetFloorByFloor(floorNum - 1);
        for (var stepIdx = 0; stepIdx < floor.LogicLength; ++stepIdx) {
            var step = floor.GetStep(stepIdx);
            if (!step.IsDeadRoad) {
                var LeftStep = step.LeftChild;
                var RightStep = step.RightChild;
                if (LeftStep != null) {
                    if (!LeftStep.IsDeadRoad) {
                        ++LeftStep.RoadNum;
                    }
                }
                if (RightStep != null) {
                    if (!RightStep.IsDeadRoad) {
                        ++RightStep.RoadNum;
                    }
                }
            }
        }
        for (var lastStepIdx = 0; lastStepIdx < lastFloor.LogicLength; ++lastStepIdx) {
            var step = lastFloor.GetStep(stepIdx);
            if (!step.IsDeadRoad && step.RoadNum < 1) {
                step.IsDeadRoad = true;
                //向上递归把所有与之相连的节点数给修正了
            }
        }
    };
    /**
     * 放道具前算通路情况
     * @param {number} floor
     */
    GameDirector.prototype._CountRoadInfo = function (floor) {
        var safeStepList = [];
        var thisFloor = this.GetFloorByFloor(floor);
        var roadNum = 0;
        var lastFloor = this.GetFloorByFloor(floor - 1);
        for (var logicIdx = 0; logicIdx < thisFloor.LogicLength; ++logicIdx) {
            var step = thisFloor.GetStep(logicIdx);
            var leftChild = step.LeftChild;
            var rightChild = step.RightChild;
            if (leftChild != null && !leftChild.IsDeadRoad) {
                safeStepList.push(logicIdx);
            }
            else if (rightChild != null && !rightChild.IsDeadRoad) {
                safeStepList.push(logicIdx);
            }
            else {
                step.IsDeadRoad = true;
            }
        }
        if (floor == 0) {
            this.Player.CurStep.IsDeadRoad = false;
        }
        return safeStepList;
    };
    /**
     * 获取某道具信息
     * @param {number}floor
     */
    GameDirector.prototype._TakeItemList = function (floor) {
        var line = this.GetFloorByFloor(floor);
        var itemList = new Array(line.LogicLength);
        var lineRewards = this.ItemLayout.TakeLineReward(floor);
        this.CurLineRewards = this.CurLineRewards.concat(lineRewards);
        //if(this.TargetLocation.y>0&&( this.TargetLocation.y >=floor && this.TargetLocation.y<floor+3 ))
        //{
        //}else
        //{
        lineRewards = this.ItemLayout.TakeLineDifficulty(floor);
        this.CurLineBarriers = this.CurLineBarriers.concat(lineRewards);
        //}
    };
    /**
     * 塌陷某一层
     * @param {number}floor
     */
    GameDirector.prototype._DestroyLine = function (floor) {
        var tailFloor = this.TailFLoor;
        if (floor < tailFloor.FloorNum) {
            return;
        }
        for (var countFloor = tailFloor.FloorNum; countFloor <= floor; ++countFloor) {
            var targetFloor = this.GetFloorByFloor(countFloor);
            targetFloor.Break();
        }
        this.Player.TouchGround();
    };
    return GameDirector;
}(BaseDirector));
//# sourceMappingURL=GameManager.js.map