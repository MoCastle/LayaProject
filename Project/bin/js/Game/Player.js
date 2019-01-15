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
//该脚本用于游戏玩家对象管理
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
        _this._LogicPosition = new Laya.Vector3(0, 0);
        _this.timer.loop(1, _this, _this._Update);
        _this.BuffArr = new Array();
        _this._BuffNode = new Laya.Sprite3D();
        _this.addChild(_this._BuffNode);
        return _this;
    }
    //摆放角色
    Player.prototype.SetStep = function (putStep) {
        this.CurStep = putStep;
        var newPS = putStep.Position.clone();
        newPS.y += GameManager.StepLength;
        this.Position = newPS;
        this._LogicPosition = putStep.Position;
        this.TouchGround();
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
    Object.defineProperty(Player.prototype, "LogicPosition", {
        get: function () {
            return this._LogicPosition;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 布局当前层但不移动
     * @param {Step} step 下一步台阶
     */
    Player.prototype.LayStep = function (step) {
        this.CurStep = step;
        this._LogicPosition = step.Position;
    };
    //触发台阶
    Player.prototype.TouchGround = function () {
        //踩空是无药可救的
        if (this.CurStep.IsEmpty) {
            APP.MessageCenter.Trigger(GameEvent.PlayerDeath);
            return;
        }
        this.CurStep.StepItem.TouchItem(this);
    };
    /**
     * 移动
     * @param {Laya.Vector3} vector 移动向量值
     */
    Player.prototype.Translate = function (vector) {
        this.transform.translate(vector);
        Laya.Vector3.add(this._LogicPosition, vector, this._LogicPosition);
    };
    /**
     * 添加玩家控制器
     * @param newCtrler 新玩家控制器
     */
    Player.prototype.AddCtrler = function (newCtrler) {
        var ctrler = this._Ctrler;
        this._Ctrler = newCtrler;
        newCtrler.NextCtrl = ctrler;
        newCtrler.SetPlayer(this);
    };
    /**
     * 移交控制器
     */
    Player.prototype.PopCtrler = function () {
        this._Ctrler = this._Ctrler.NextCtrl;
    };
    /**
     * 添加BUFF
     * @param buff
     * @param index
     */
    Player.prototype.AddBuff = function (buff, index) {
        if (index === void 0) { index = 0; }
        if (this.BuffArr[index] != null || this.BuffArr[index] != undefined) {
            return false;
        }
        this.BuffArr[index] = buff;
        buff.IDX = index;
        buff.Player = this;
        buff.Start();
        return true;
    };
    /**
     * 添加BUFF模型
     * @param mod
     */
    Player.prototype.AddBuffMode = function (mod) {
        if (mod != null) {
            this._BuffNode.addChild(mod);
        }
    };
    /**
     * 结束BUFF
     */
    Player.prototype.CompleteBuff = function (index) {
        var buff = this.BuffArr[index];
        this.BuffArr[index] = null;
        if (buff == null || buff == undefined) {
            return;
        }
        buff.End();
    };
    Player.prototype._Update = function () {
        this._Ctrler.Update();
        for (var buffIdx = 0; buffIdx < this.BuffArr.length; ++buffIdx) {
            this.BuffArr[buffIdx].Update();
        }
    };
    return Player;
}(Laya.MeshSprite3D));
var BasePlayerBuff = /** @class */ (function () {
    function BasePlayerBuff(type, idx, update, start, end) {
        if (idx === void 0) { idx = 0; }
        if (update === void 0) { update = null; }
        if (start === void 0) { start = null; }
        if (end === void 0) { end = null; }
        this.Type = type;
        this.IDX = idx;
        this._UpdateFunc = update;
        this._StartFunc = start;
        this._EndFunc = end;
    }
    BasePlayerBuff.prototype.Update = function () {
        if (this._UpdateFunc != null) {
            this._UpdateFunc();
        }
    };
    BasePlayerBuff.prototype.Start = function () {
        //创建模型显示对象
        this.Player.AddBuffMode(new Laya.MeshSprite3D(new Laya.SphereMesh(0.3, 8, 8)));
        if (this._StartFunc != null) {
            this._StartFunc();
        }
    };
    BasePlayerBuff.prototype.End = function () {
        if (this._EndFunc != null) {
            this._EndFunc();
        }
    };
    return BasePlayerBuff;
}());
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
    BasePlayerCtrler.prototype.SetPlayer = function (player) {
        this.player = player;
    };
    return BasePlayerCtrler;
}());
//用于角色正常状态下的移动
var PlayerNormCtrler = /** @class */ (function (_super) {
    __extends(PlayerNormCtrler, _super);
    function PlayerNormCtrler(player) {
        if (player === void 0) { player = null; }
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
//玩家飞行
var PlayerFly = /** @class */ (function (_super) {
    __extends(PlayerFly, _super);
    function PlayerFly(speed, floor) {
        var _this = _super.call(this, null) || this;
        _this.Speed = speed;
        _this.Floor = floor;
        _this._FinalLocation = null;
        _this._FinalZ = 0;
        return _this;
    }
    /**
     * 设置玩家
     * @param player 操控角色
     */
    PlayerFly.prototype.SetPlayer = function (player) {
        _super.prototype.SetPlayer.call(this, player);
        this._FinalLocation = player.CurStep.Location;
        this._FinalLocation.Y += this.Floor;
        this._FinalZ = player.Position.z - GameManager.StepDistance / 2 * this.Floor;
    };
    PlayerFly.prototype.EndCtrl = function () {
        var step = APP.GameManager.GameDir.GetStepByLocation(this._FinalLocation);
        this.player.LayStep(step);
        this.player.BaseCtrler.StartMove();
        this.player.PopCtrler();
    };
    PlayerFly.prototype._Update = function () {
        if (this.player == null) {
            return;
        }
        if (this._FinalZ - this.player.Position.z > -0.2) {
            this.EndCtrl();
        }
        else {
            var vector = new Laya.Vector3(0, GameManager.StepLength, -GameManager.StepDistance / 2);
            Laya.Vector3.scale(vector, this.Speed, vector);
            this.player.Translate(vector);
        }
    };
    return PlayerFly;
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
        var PlayerPS = this.Camera.Player._LogicPosition;
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
//# sourceMappingURL=Player.js.map