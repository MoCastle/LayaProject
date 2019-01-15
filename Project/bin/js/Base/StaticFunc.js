/*
作者Mo 通用功能放在这
*/
//静态常量定义
//输入常量 左/右
var IsRight = true;
var PlayerMoveTime = 0.02 * 10000;
//const PlayerMoveTime:number =0.02;
var LifeObjState;
(function (LifeObjState) {
    LifeObjState[LifeObjState["UnStarted"] = 0] = "UnStarted";
    LifeObjState[LifeObjState["Starting"] = 1] = "Starting";
    LifeObjState[LifeObjState["Updating"] = 2] = "Updating";
    LifeObjState[LifeObjState["Ended"] = 3] = "Ended";
})(LifeObjState || (LifeObjState = {}));
var MLocation = /** @class */ (function () {
    function MLocation(x, y) {
        this._Arr = [x, y];
    }
    Object.defineProperty(MLocation.prototype, "X", {
        get: function () {
            return this._Arr[0];
        },
        set: function (x) {
            this._Arr[0] = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MLocation.prototype, "Y", {
        get: function () {
            return this._Arr[1];
        },
        set: function (y) {
            this._Arr[1] = y;
        },
        enumerable: true,
        configurable: true
    });
    return MLocation;
}());
//该对象模板用于有 开始、进行性、结束 三种状态的对象
var LifeObj = /** @class */ (function () {
    function LifeObj() {
        this._UpdateFunc = null;
        this.ObjState = LifeObjState.UnStarted;
    }
    LifeObj.prototype.Update = function () {
        if (this.ObjState == LifeObjState.UnStarted) {
            this.Start();
        }
        if (this._UpdateFunc != null) {
            this._UpdateFunc();
        }
    };
    //离开时进行配置
    LifeObj.prototype._Leave = function () {
        this._UpdateFunc = this._Leaveing;
    };
    //离开时进行配置 离开逻辑执行完成后进入结束状态
    LifeObj.prototype._Leaveing = function () {
        this._LeaveComplete();
    };
    //离开准备完毕 执行离开逻辑
    LifeObj.prototype._LeaveComplete = function () {
        this._UpdateFunc = null;
        this.ObjState = LifeObjState.Ended;
        APP.UIManager.Clear();
    };
    //进入配置
    LifeObj.prototype._Start = function () {
        this.ObjState = LifeObjState.Starting;
        this._UpdateFunc = this._Starting;
    };
    //开始准备 准备就绪后正式运行
    LifeObj.prototype._Starting = function () {
        this._StartComplete();
    };
    LifeObj.prototype._StartComplete = function () {
        this._UpdateFunc = this._Update;
        this.ObjState = LifeObjState.Updating;
    };
    return LifeObj;
}());
//# sourceMappingURL=StaticFunc.js.map