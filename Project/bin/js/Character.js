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
/**作者:Mo
 *场景内对象
 */
//管理一整行
var MountLine = /** @class */ (function (_super) {
    __extends(MountLine, _super);
    function MountLine(lineIdx, floor) {
        if (floor === void 0) { floor = 0; }
        var _this = this;
        var columns = GameManager.LineStepNum;
        _this = _super.call(this) || this;
        _this.LineIdx = lineIdx;
        _this.FloorNum = floor;
        _this.StepList = [];
        _this.LogicLength = 0;
        for (var StartIdx = (columns - 1); StartIdx >= 0; --StartIdx) {
            var newStep = new Step();
            _this.addChild(newStep);
            _this.StepList[StartIdx] = newStep;
        }
        return _this;
    }
    Object.defineProperty(MountLine.prototype, "Position", {
        get: function () {
            return this.transform.position;
        },
        set: function (newPS) {
            this.transform.position = newPS;
        },
        enumerable: true,
        configurable: true
    });
    //设获取显示出来的第几个平台
    MountLine.prototype.GetStep = function (idx) {
        return this.StepList[idx + 1];
    };
    //设置每层
    MountLine.prototype.SetLine = function (floor) {
        this.FloorNum = floor;
        var newPS = this.transform.position;
        var stepLength = GameManager.StepLength;
        var stepDistance = GameManager.StepDistance;
        newPS.y = stepLength * floor;
        newPS.z = -stepDistance / 2 * floor;
        this.transform.position = newPS;
        var stepArr = this.StepList;
        var startX = 0 - stepArr.length / 2 * stepDistance;
        if (this.JugeIsLessLine()) {
            startX += stepDistance / 2;
        }
        for (var column = 0; column < stepArr.length; ++column) {
            var stepVector = stepArr[column].Position;
            stepVector.x = startX;
            stepArr[column].Position = stepVector;
            startX += stepDistance;
        }
        stepArr[0].active = false;
        stepArr[stepArr.length - 1].active = false;
        if (!this.JugeIsLessLine()) {
            this.LogicLength = stepArr.length - 2;
        }
        else {
            stepArr[stepArr.length - 2].active = false;
            this.LogicLength = stepArr.length - 3;
        }
    };
    //判断是否收缩的那层
    MountLine.prototype.JugeIsLessLine = function () {
        return this.FloorNum % 2 != 0;
    };
    //将每个节点链接到下一层
    MountLine.prototype.SetNextFloor = function (lastFloor) {
        //判断是否有两头端点
        var havePoint = lastFloor.LogicLength > this.LogicLength;
        for (var startIdx = 0; startIdx < this.LogicLength; ++startIdx) {
            var leftParent = null;
            var rightParent = null;
            if (havePoint) {
                leftParent = lastFloor.GetStep(startIdx);
                rightParent = lastFloor.GetStep(startIdx + 1);
            }
            else {
                leftParent = lastFloor.GetStep(startIdx - 1);
                rightParent = lastFloor.GetStep(startIdx);
            }
            var thiStep = this.GetStep(startIdx);
            thiStep.LeftParent = leftParent;
            leftParent.RightChild = thiStep;
            thiStep.RightParent = rightParent;
            rightParent.LeftChild = thiStep;
        }
    };
    return MountLine;
}(Laya.Sprite3D));
//步
var Step = /** @class */ (function (_super) {
    __extends(Step, _super);
    function Step() {
        var _this = _super.call(this, new Laya.BoxMesh(0.4, 0.4, 0.4)) || this;
        _this.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        _this.transform.position = new Laya.Vector3();
        _this.LeftParent = null;
        _this.RightParent = null;
        _this.LeftChild = null;
        _this.RightChild = null;
        return _this;
    }
    Object.defineProperty(Step.prototype, "Position", {
        get: function () {
            return this.transform.position.clone();
        },
        //公有接口
        set: function (newPS) {
            this.transform.position = newPS.clone();
        },
        enumerable: true,
        configurable: true
    });
    return Step;
}(Laya.MeshSprite3D));
//玩家对象
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this, new Laya.BoxMesh(0.4, 0.4, 0.4)) || this;
        _this.CurStep = null;
        GameManager.Mgr.CurScene.PutObj(_this);
        //添加自定义模型
        _this.transform.rotate(new Laya.Vector3(0, 0, 0), false, false);
        var material = new Laya.StandardMaterial();
        material.diffuseTexture = Laya.Texture2D.load("res/layabox.png");
        _this.meshRender.material = material;
        _this.BaseCtrler = new PlayerNormCtrler(_this);
        _this._Ctrler = _this.BaseCtrler;
        _this.timer.loop(1, _this, _this._Update);
        return _this;
        /*
        this.BuffModel = new Laya.MeshSprite3D(new Laya.BoxMesh(0.5,0.5,0.5));
        this.Model.addChild(this.BuffModel);
        this.BuffModel.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
        this.BuffFlyModel = new Laya.MeshSprite3D(new Laya.BoxMesh(0.6,0.6,0.1));
        this.Model.addChild(this.BuffFlyModel);
        this.PlayerState = PlayerState.None;*/
    }
    //摆放角色
    Player.prototype.SetStep = function (putStep) {
        this.CurStep = putStep;
        var newPS = putStep.Position.clone();
        newPS.y += GameManager.StepLength;
        this.Position = newPS;
    };
    Object.defineProperty(Player.prototype, "Position", {
        get: function () {
            return this.transform.position.clone();
        },
        set: function (newPS) {
            var newPS = newPS.clone();
            this.transform.position = newPS;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype._Update = function () {
        this._Ctrler.Update();
    };
    return Player;
}(Laya.MeshSprite3D));
var BasePlayerCtrler = /** @class */ (function () {
    function BasePlayerCtrler(player, ctrler) {
        if (ctrler === void 0) { ctrler = null; }
        if (ctrler == null) {
            ctrler = this;
        }
        this.NextCtrl = ctrler;
        this.player = player;
    }
    BasePlayerCtrler.prototype.Update = function () {
        this._Update();
    };
    return BasePlayerCtrler;
}());
//用于角色正常状态下的移动
var PlayerNormCtrler = /** @class */ (function (_super) {
    __extends(PlayerNormCtrler, _super);
    function PlayerNormCtrler(player) {
        var _this = _super.call(this, player) || this;
        _this.Time = -1;
        return _this;
    }
    PlayerNormCtrler.prototype.StartMove = function () {
        this.Time = Laya.timer.currTimer + PlayerMoveTime;
    };
    PlayerNormCtrler.prototype._Update = function () {
        if (this.Time > 0) {
            if (this.Time <= Laya.timer.currTimer) {
                this.Time = -1;
                this.player.SetStep(this.player.CurStep);
                return;
            }
            else {
                var lastTime = this.Time - Laya.timer.currTimer;
                var rate = (1 - lastTime / PlayerMoveTime);
                var StepPs = this.player.CurStep.Position;
                StepPs.y += GameManager.StepLength;
                var curps = this.player.Position;
                curps.y += GameManager.StepLength;
                var newPs = new Laya.Vector3();
                newPs.x = (StepPs.x - curps.x) * rate + curps.x;
                newPs.y = (StepPs.y - curps.y) * rate + curps.y;
                newPs.z = (StepPs.z - curps.z) * rate + curps.z;
                this.player.Position = newPs;
            }
        }
    };
    return PlayerNormCtrler;
}(BasePlayerCtrler));
//游戏中相机
var GameCamera = /** @class */ (function (_super) {
    __extends(GameCamera, _super);
    function GameCamera() {
        var _this = _super.call(this) || this;
        _this.Ctrler = new GameCameraCtrler(_this);
        _this.DynamicPS = _this.transform.position.clone();
        _this.BasePS = new Laya.Vector3();
        _this.Player = null;
        _this.timerLoop(1, _this.Ctrler, _this.Ctrler.Update);
        return _this;
    }
    GameCamera.prototype.SetPlaer = function (player) {
        if (player === void 0) { player = null; }
        this.Player = player;
    };
    GameCamera.prototype.Reset = function (DynamicPS, basePS, player) {
        this.Player = player;
        this.BasePS = basePS;
        this.DynamicPS = DynamicPS;
    };
    //计算并设置位置
    GameCamera.prototype.CountSetPS = function () {
        var newPS = this.transform.position;
        Laya.Vector3.add(this.BasePS, this.DynamicPS, newPS);
        this.transform.position = newPS;
    };
    Object.defineProperty(GameCamera.prototype, "Position", {
        get: function () {
            return this.transform.position.clone();
        },
        set: function (ps) {
            this.transform.position = ps.clone();
        },
        enumerable: true,
        configurable: true
    });
    return GameCamera;
}(Laya.Camera));
var BaseGameCameraCtrler = /** @class */ (function () {
    function BaseGameCameraCtrler(camera, ctrler) {
        if (ctrler === void 0) { ctrler = null; }
        if (ctrler == null) {
            ctrler = this;
        }
        this.Camera = camera;
        this.Ctrler = ctrler;
    }
    return BaseGameCameraCtrler;
}());
var GameCameraCtrler = /** @class */ (function (_super) {
    __extends(GameCameraCtrler, _super);
    function GameCameraCtrler(camera, ctrler) {
        if (ctrler === void 0) { ctrler = null; }
        return _super.call(this, camera, ctrler) || this;
    }
    GameCameraCtrler.prototype.Update = function () {
        if (this.Camera == null || this.Camera.Player == null) {
            return;
        }
        var CameraPS = this.Camera.DynamicPS;
        var PlayerPS = this.Camera.Player.CurStep.Position;
        CameraPS.x = 0;
        var disNum = PlayerPS.y - CameraPS.y;
        var disZNum = PlayerPS.z - CameraPS.z;
        if (Math.abs(disNum) > 0.01) {
            CameraPS.y += disNum * 0.1;
        }
        if (Math.abs(disZNum) > 0.01) {
            CameraPS.z += disZNum * 0.1;
        }
        this.Camera.DynamicPS = CameraPS;
        this.Camera.CountSetPS();
    };
    return GameCameraCtrler;
}(BaseGameCameraCtrler));
//# sourceMappingURL=Character.js.map