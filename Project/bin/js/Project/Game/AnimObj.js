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
/**
 * 表现用的对象
 */
function GenAnimObj(animClass, model) {
    var animObj = Laya.Pool.getItem(animClass.Name());
    if (animObj == null)
        animObj = new animClass(animClass.Name(), model);
    return animObj;
}
var BaseAnimObj = /** @class */ (function (_super) {
    __extends(BaseAnimObj, _super);
    function BaseAnimObj(name, model) {
        if (model === void 0) { model = null; }
        var _this = _super.call(this) || this;
        _this.Model = model.clone();
        _this.addChild(_this.Model);
        _this._Name = name;
        _this.on(Laya.Event.REMOVED, _this, _this._LeaveStage);
        return _this;
    }
    BaseAnimObj.prototype.Reset = function () {
        this.active = true;
        APP.SceneManager.CurScene.Scene.addChild(this);
        this.frameLoop(1, this, this._FrameFunc);
    };
    BaseAnimObj.prototype._FrameFunc = function () {
        if (this._JudgeComplete()) {
            this.removeSelf();
            return;
        }
        this._FrameLogicFunc();
    };
    //生命周期结束处理
    BaseAnimObj.prototype._LeaveStage = function () {
        Laya.Pool.recover(this._Name, this);
        this.clearTimer(this, this._FrameFunc);
        this.active = false;
    };
    return BaseAnimObj;
}(Laya.MeshSprite3D));
var AnimCoin = /** @class */ (function (_super) {
    __extends(AnimCoin, _super);
    function AnimCoin(name, model) {
        if (model === void 0) { model = null; }
        var _this = _super.call(this, name, model) || this;
        _this.transform.position = model.transform.position.clone();
        return _this;
    }
    AnimCoin.Name = function () {
        return "AnimCoin";
    };
    AnimCoin.prototype.SetTarget = function (target) {
        this._Target = target;
        _super.prototype.Reset.call(this);
    };
    //每帧执行逻辑功能
    AnimCoin.prototype._FrameLogicFunc = function () {
        var targetPosition = this._Target.transform.position;
        var position = this.transform.position;
        var addPS = new Laya.Vector3();
        Laya.Vector3.subtract(targetPosition, position, addPS);
        Laya.Vector3.scale(addPS, 0.08, addPS);
        Laya.Vector3.add(addPS, position, position);
        this.transform.position = position;
    };
    //生命周期结束处理
    AnimCoin.prototype._LeaveStage = function () {
        _super.prototype._LeaveStage.call(this);
        APP.GameManager.GameDir.AddLogicGold(1);
    };
    //判断任务完成
    AnimCoin.prototype._JudgeComplete = function () {
        var targetPosition = this._Target.transform.position;
        var position = this.transform.position;
        var disDir = new Laya.Vector3();
        Laya.Vector3.subtract(targetPosition, position, disDir);
        if (Laya.Vector3.scalarLengthSquared(disDir) < 0.1) {
            return true;
        }
        return false;
    };
    return AnimCoin;
}(BaseAnimObj));
//# sourceMappingURL=AnimObj.js.map