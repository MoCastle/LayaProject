var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseEnum;
(function (BaseEnum) {
    var UITypeEnum;
    (function (UITypeEnum) {
        UITypeEnum[UITypeEnum["Low"] = 0] = "Low";
        UITypeEnum[UITypeEnum["Midle"] = 1] = "Midle";
    })(UITypeEnum = BaseEnum.UITypeEnum || (BaseEnum.UITypeEnum = {}));
    ;
})(BaseEnum = exports.BaseEnum || (exports.BaseEnum = {}));
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 定义基础结构体
 */
var BaseFunc;
(function (BaseFunc) {
    var UITypeEnum;
    (function (UITypeEnum) {
        UITypeEnum[UITypeEnum["Low"] = 0] = "Low";
        UITypeEnum[UITypeEnum["Midle"] = 1] = "Midle";
    })(UITypeEnum || (UITypeEnum = {}));
    ;
    var Map = /** @class */ (function () {
        function Map() {
            this._Map = {};
            this._Count = 0;
        }
        Object.defineProperty(Map.prototype, "Count", {
            get: function () {
                return this._Count;
            },
            enumerable: true,
            configurable: true
        });
        Map.prototype.forEach = function (callback) {
            for (var mapKey in this._Map) {
                callback(this._Map[mapKey], mapKey);
            }
        };
        /**
         *
         * @param obj 放入对象
         * @param key 键
         */
        Map.prototype.Set = function (obj, key) {
            if (!this._Map[key]) {
                ++this._Count;
            }
            this._Map[key] = obj;
        };
        Map.prototype.Get = function (key) {
            return this._Map[key];
        };
        /**
         *
         * @param key 移除某个对象
         * @returns 被移除对象
         */
        Map.prototype.Remove = function (key) {
            var Obj = this._Map[key];
            if (Obj) {
                this._Map[key] = null;
                --this._Count;
            }
            return Obj;
        };
        /**
         *
         * @param key 键
         * @returns 是否拥有
         */
        Map.prototype.Has = function (key) {
            if (this._Map[key]) {
                return true;
            }
            else
                return false;
        };
        return Map;
    }());
    BaseFunc.Map = Map;
})(BaseFunc = exports.BaseFunc || (exports.BaseFunc = {}));
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enum;
(function (Enum) {
    var LifeObjState;
    (function (LifeObjState) {
        LifeObjState[LifeObjState["UnStarted"] = 0] = "UnStarted";
        LifeObjState[LifeObjState["Starting"] = 1] = "Starting";
        LifeObjState[LifeObjState["Updating"] = 2] = "Updating";
        LifeObjState[LifeObjState["Ended"] = 3] = "Ended";
    })(LifeObjState = Enum.LifeObjState || (Enum.LifeObjState = {}));
})(Enum = exports.Enum || (exports.Enum = {}));
//该对象模板用于有 开始、进行性、结束 三种状态的对象
var LifeObj = /** @class */ (function () {
    function LifeObj() {
        this._UpdateFunc = null;
        this.ObjState = Enum.LifeObjState.UnStarted;
    }
    LifeObj.prototype.Update = function () {
        if (this.ObjState == Enum.LifeObjState.UnStarted) {
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
        this.ObjState = Enum.LifeObjState.Ended;
    };
    //进入配置
    LifeObj.prototype._Start = function () {
        this.ObjState = Enum.LifeObjState.Starting;
        this._UpdateFunc = this._Starting;
    };
    //开始准备 准备就绪后正式运行
    LifeObj.prototype._Starting = function () {
        this._StartComplete();
    };
    LifeObj.prototype._StartComplete = function () {
        this._UpdateFunc = this._Update;
        this.ObjState = Enum.LifeObjState.Updating;
    };
    return LifeObj;
}());
exports.default = LifeObj;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseMgr = /** @class */ (function () {
    function BaseMgr() {
    }
    return BaseMgr;
}());
exports.default = BaseMgr;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseFunc_1 = require("./../Base/BaseFunc");
var FrameWork = /** @class */ (function () {
    function FrameWork() {
        this._MgrMap = new BaseFunc_1.BaseFunc.Map();
    }
    Object.defineProperty(FrameWork, "FM", {
        get: function () {
            if (FrameWork._FM == null) {
                FrameWork._FM = new FrameWork();
            }
            return FrameWork._FM;
        },
        enumerable: true,
        configurable: true
    });
    //constructor
    FrameWork.prototype.Update = function () {
        var tempMgrList = new Array(this._MgrMap.Count);
        this._MgrMap.forEach(function (mgr, key) {
            tempMgrList.push(mgr);
        });
        tempMgrList.forEach(function (mgr, idx) { mgr.Update(); });
    };
    FrameWork.prototype.AddManager = function (type) {
        if (this._MgrMap.Has(type.Name())) {
            return this._MgrMap.Get(type.Name());
        }
        var newMgr = new type();
        this._MgrMap.Set(newMgr, type.Name());
        return newMgr;
    };
    FrameWork.prototype.GetManager = function (type) {
        return this._MgrMap.Get(type.Name());
    };
    return FrameWork;
}());
exports.default = FrameWork;
},{"./../Base/BaseFunc":2}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**作者:Mo
 * 消息控制器
 */
var BaseManager_1 = require("./BaseManager");
var MessageMD;
(function (MessageMD) {
    MessageMD.GameEvent = {
        PlayerDeath: "PlayerDeath",
        GameTimeUp: "GameTimeUp",
        GameContinue: "GameContinue"
    };
    var MessageCenter = /** @class */ (function (_super) {
        __extends(MessageCenter, _super);
        function MessageCenter() {
            var _this = _super.call(this) || this;
            _this._EventDict = {};
            return _this;
        }
        MessageCenter.Name = function () {
            return "MessageCenter";
        };
        /**
         * 获取事件
         * @param {string} name 消息名字
         */
        MessageCenter.prototype._GetEvent = function (name) {
            var event = this._EventDict[name];
            if (event == undefined || event == null) {
                event = new MEvent();
            }
            this._EventDict[name] = event;
            return event;
        };
        Object.defineProperty(MessageCenter, "Mgr", {
            get: function () {
                if (MessageCenter._Mgr == null) {
                    MessageCenter._Mgr = new MessageCenter();
                }
                return MessageCenter._Mgr;
            },
            enumerable: true,
            configurable: true
        });
        /**
        * 注册
        * @param {string} name 消息名字
        * @param {Function} action 委托
        * @param {Obj} listener 监听者
        */
        MessageCenter.prototype.Regist = function (name, action, listener) {
            var getEvent = this._GetEvent(name);
            var newDlgt = new Delegate(listener, action);
            getEvent.Add(newDlgt);
        };
        /**
         * 注销某个监听
         * @param {string} name 消息名字
         * @param {Function} action 委托
         * @param {Obj} listener 监听者
         */
        MessageCenter.prototype.DesRegist = function (name, action, listener) {
            var getEvent = this._GetEvent(name);
            getEvent.Rmv(action, listener);
        };
        /**
         * 注销某个事件
         * @param {string} name 消息名字
         */
        MessageCenter.prototype.DesRgistIDK = function (name) {
            var getEvent = this._GetEvent(name);
            getEvent.Reset();
        };
        /**
         * 触发
         * @param {string} name 消息名字
         * @param {any} param 消息名字
         */
        MessageCenter.prototype.Trigger = function (name, param) {
            if (param === void 0) { param = null; }
            var getEvent = this._GetEvent(name);
            getEvent.Execute(param);
        };
        MessageCenter.prototype.Update = function () {
        };
        return MessageCenter;
    }(BaseManager_1.default));
    MessageMD.MessageCenter = MessageCenter;
    //委托
    var Delegate = /** @class */ (function () {
        function Delegate(listener, action) {
            this.Listener = listener;
            this.Action = action;
        }
        /**
         * 触发
         * @param {any} param 消息名字
         */
        Delegate.prototype.Execute = function (param) {
            if (param === void 0) { param = null; }
            this.Action.call(this.Listener, param);
        };
        return Delegate;
    }());
    MessageMD.Delegate = Delegate;
    //事件
    var MEvent = /** @class */ (function () {
        function MEvent() {
            this.Reset();
        }
        /**
        * 添加委托
        * @param {Delegate} dlg 消息名字
        */
        MEvent.prototype.Add = function (dlg) {
            this.DelegateList.push(dlg);
        };
        /**
        * 移除委托
        * @param {function} action 消息名字
        * @param {Object} listener 消息名字
        */
        MEvent.prototype.Rmv = function (action, listener) {
            if (listener === void 0) { listener = null; }
            var dlgtList = this.DelegateList;
            for (var arrIdx = dlgtList.length - 1; arrIdx > -1; --arrIdx) {
                var dlgt = dlgtList[arrIdx];
                if (action == dlgt.Action && listener == dlgt.Listener) {
                    dlgtList.splice(arrIdx, 1);
                    return;
                }
            }
        };
        //重置
        MEvent.prototype.Reset = function () {
            this.DelegateList = [];
        };
        /**
        * 触发
        * @param {any} param 消息名字
        */
        MEvent.prototype.Execute = function (param) {
            var dlgtList = this.DelegateList;
            for (var arrIdx = dlgtList.length - 1; arrIdx > -1; --arrIdx) {
                var dlgt = dlgtList[arrIdx];
                dlgt.Execute(param);
            }
        };
        return MEvent;
    }());
    MessageMD.MEvent = MEvent;
})(MessageMD = exports.MessageMD || (exports.MessageMD = {}));
},{"./BaseManager":4}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseManager_1 = require("./../FrameWork/BaseManager");
/**作者Mo
* 场景功能
*/
//场景管理
var SceneManager = /** @class */ (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        var _this = _super.call(this) || this;
        _this.CurScene = null;
        //添加场景管理
        _this.SceneCtrler = Laya.stage.addChild(new Laya.Sprite());
        return _this;
    }
    SceneManager.Name = function () {
        return "SceneManager";
    };
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
}(BaseManager_1.default));
exports.default = SceneManager;
},{"./../FrameWork/BaseManager":4}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseManager_1 = require("./BaseManager");
var BaseEnum_1 = require("./../Base/BaseEnum");
var UIManager = /** @class */ (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        var _this = _super.call(this) || this;
        _this._UINode = new Laya.Sprite();
        _this._UINode.width = Laya.stage.width;
        _this._UINode.height = Laya.stage.height;
        _this._UINode.name = "UINode";
        _this._MidleUINode = new Laya.Sprite();
        Laya.stage.addChild(_this._UINode);
        Laya.stage.addChild(_this._MidleUINode);
        _this._UIDict = {};
        return _this;
    }
    UIManager.Name = function () {
        return "UIManager";
    };
    UIManager.prototype.Update = function () {
    };
    UIManager.prototype.AddUI = function () {
    };
    UIManager.prototype.Show = function (uiClass) {
        var str = uiClass.Name();
        var newUI = this.GetUIByName(str);
        newUI = newUI == null ? this.AddUIByName(str, new uiClass(str)) : newUI;
        newUI.width = 10; //Laya.stage.width;
        newUI.height = 10; //Laya.stage.height;
        var node = null;
        switch (newUI.UIType) {
            //中层次UI
            case BaseEnum_1.BaseEnum.UITypeEnum.Midle:
                node = this._MidleUINode;
                if (this._MidleUINode.numChildren <= 0) {
                    //通知导演暂停游戏
                    //APP.SceneManager.CurScene.CurDir.TimeUp();
                }
                break;
            //默认Ui全是低层次UI
            default:
                node = this._UINode;
                break;
        }
        var childNum = node.numChildren;
        //把互斥的窗口关掉
        if (newUI.IsMutex && childNum > 0) {
            var lastUI = node.getChildAt(node.numChildren - 1);
            lastUI.visible = !lastUI.IsMutex;
        }
        node.addChild(newUI);
        newUI.OpenOP();
        return newUI;
    };
    UIManager.prototype.Close = function (ui) {
        ui.removeSelf();
        ui.CloseOP();
        var node = null;
        switch (ui.UIType) {
            //中层次UI
            case BaseEnum_1.BaseEnum.UITypeEnum.Midle:
                node = this._MidleUINode;
                if (node.numChildren <= 0)
                    //关闭窗口 通知游戏继续
                    //APP.SceneManager.CurScene.CurDir.ContinueTime();
                    break;
            //默认Ui全是低层次UI
            default:
                node = this._UINode;
                break;
        }
        var childNum = node.numChildren;
        if (childNum > 0) {
            var lastUI = node.getChildAt(childNum - 1);
            lastUI.visible = true;
        }
    };
    UIManager.prototype.CloseCurView = function () {
        var ui = this._UINode.getChildAt(this._UINode.numChildren - 1);
        this.Close(ui);
    };
    //删除所有节点上的UI
    UIManager.prototype.Clear = function () {
        var uiNode = this._UINode;
        while (uiNode.numChildren) {
            var closeUI = uiNode.getChildAt(0); //.removeSelf();
            this.Close(closeUI);
        }
        uiNode = this._MidleUINode;
        while (uiNode.numChildren) {
            var closeUI = uiNode.getChildAt(0); //.removeSelf();
            this.Close(closeUI);
        }
    };
    UIManager.prototype.GetUIByName = function (name) {
        var ui = this._UIDict[name];
        ui = ui == undefined ? null : ui;
        return ui;
    };
    UIManager.prototype.AddUIByName = function (name, ui) {
        this._UIDict[name] = ui;
        return ui;
    };
    return UIManager;
}(BaseManager_1.default));
exports.default = UIManager;
},{"./../Base/BaseEnum":1,"./BaseManager":4}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APP_1 = require("./../controler/APP");
/**
* 表现用的对象
*/
var AnimObj;
(function (AnimObj) {
    function GenAnimObj(animClass, model) {
        var animObj = Laya.Pool.getItem(animClass.Name());
        if (animObj == null)
            animObj = new animClass(animClass.Name(), model);
        return animObj;
    }
    AnimObj.GenAnimObj = GenAnimObj;
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
            APP_1.default.SceneManager.CurScene.Scene.addChild(this);
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
    }(Laya.Sprite3D));
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
            APP_1.default.GameManager.GameDir.AddLogicGold(1);
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
    AnimObj.AnimCoin = AnimCoin;
})(AnimObj = exports.AnimObj || (exports.AnimObj = {}));
},{"./../controler/APP":27}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameItem_1 = require("./GameItem");
var PlayerCtrler_1 = require("./../Game/PlayerCtrler");
var Input_1 = require("./Input");
var APP_1 = require("./../controler/APP");
var PlayerBuff;
(function (PlayerBuff) {
    var BasePlayerBuff = /** @class */ (function () {
        function BasePlayerBuff(type, idx) {
            if (idx === void 0) { idx = 0; }
            this.Type = type;
            this.Idx = idx;
            this.GenBuffMod();
        }
        BasePlayerBuff.prototype.Update = function () {
        };
        BasePlayerBuff.prototype.GenBuffMod = function () {
            //this._BuffMod = new Laya.MeshSprite3D(new Laya.SphereMesh(0.3,8,8));
        };
        BasePlayerBuff.prototype.Start = function (player) {
            this.Player = player;
            //创建模型显示对象
            this.Player.AddBuffMode(this._BuffMod);
            if (this._StartFunc != null) {
                this._StartFunc();
            }
        };
        BasePlayerBuff.prototype.Complete = function () {
            this.Player.CompleteBuff(this.Idx);
            this._BuffMod.destroy();
        };
        return BasePlayerBuff;
    }());
    PlayerBuff.BasePlayerBuff = BasePlayerBuff;
    var FlyBuff = /** @class */ (function (_super) {
        __extends(FlyBuff, _super);
        function FlyBuff(speed, floor) {
            if (speed === void 0) { speed = 0.1; }
            if (floor === void 0) { floor = 10; }
            var _this = _super.call(this, GameItem_1.Item.ItemType.Rope, ProtectBuff.Idx) || this;
            _this.Speed = speed;
            _this.Floor = floor;
            _this._FinalLocation = null;
            _this._FinalZ = 0;
            return _this;
        }
        Object.defineProperty(FlyBuff, "Idx", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        FlyBuff.prototype.Start = function (player) {
            _super.prototype.Start.call(this, player);
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - APP_1.default.GameManager.StepDistance / 2 * this.Floor;
            var flyCtrl = new PlayerCtrler_1.PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player);
            player.AddCtrler(flyCtrl);
            APP_1.default.GameManager.GameDir.AddInputCtrler(new Input_1.Input.DIYInput());
            APP_1.default.GameManager.GameDir.SetSafePS(this._FinalLocation);
        };
        FlyBuff.prototype.Update = function () {
            if (this.Player == null) {
                return;
            }
            if (this._FinalZ - this.Player.Position.z > -0.2) {
                var step = APP_1.default.GameManager.GameDir.GetStepByLocation(this._FinalLocation);
                this.Player.LayStep(step);
                this.Player.BaseCtrler.StartMove();
                this.Player.PopCtrler();
                APP_1.default.GameManager.GameDir.PopInputCtrler();
                _super.prototype.Complete.call(this);
            }
        };
        return FlyBuff;
    }(BasePlayerBuff));
    var ProtectBuff = /** @class */ (function (_super) {
        __extends(ProtectBuff, _super);
        function ProtectBuff(time) {
            if (time === void 0) { time = 0; }
            var _this = _super.call(this, GameItem_1.Item.ItemType.Protect, ProtectBuff.Idx) || this;
            _this.Time = APP_1.default.SceneManager.CurDir.GameTime + time;
            return _this;
        }
        Object.defineProperty(ProtectBuff, "Idx", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ProtectBuff.prototype.Update = function () {
            if (this.Time < APP_1.default.SceneManager.CurDir.GameTime) {
                this.Complete();
            }
        };
        return ProtectBuff;
    }(BasePlayerBuff));
    var VineBuff = /** @class */ (function (_super) {
        __extends(VineBuff, _super);
        function VineBuff(countTime, inputDir) {
            if (countTime === void 0) { countTime = 3; }
            if (inputDir === void 0) { inputDir = true; }
            var _this = _super.call(this, GameItem_1.Item.ItemType.Vine, 0) || this;
            _this.CountTime = countTime;
            _this.InputDir = inputDir;
            _this._ShowGameInfo();
            return _this;
        }
        VineBuff.prototype.Start = function (player) {
            _super.prototype.Start.call(this, player);
            APP_1.default.GameManager.GameDir.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
        };
        VineBuff.prototype.Complete = function () {
            APP_1.default.GameManager.GameDir.PopInputCtrler();
            _super.prototype.Complete.call(this);
        };
        VineBuff.prototype._Input = function (isRight) {
            if (this.InputDir == isRight) {
                this.InputDir = !this.InputDir;
                --this.CountTime;
            }
            if (this.CountTime < 0) {
                this.Complete();
            }
            this._ShowGameInfo();
        };
        VineBuff.prototype._ShowGameInfo = function () {
            var info;
            if (this.CountTime < 0)
                info = "";
            else
                info = this.InputDir == true ? "Right" : "Left";
            APP_1.default.GameManager.GameDir.ShowInputInfo(info);
        };
        return VineBuff;
    }(BasePlayerBuff));
})(PlayerBuff = exports.PlayerBuff || (exports.PlayerBuff = {}));
},{"./../Game/PlayerCtrler":17,"./../controler/APP":27,"./GameItem":12,"./Input":14}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//游戏中相机
var GameCamera = /** @class */ (function (_super) {
    __extends(GameCamera, _super);
    function GameCamera() {
        var _this = _super.call(this) || this;
        _this.Ctrler = new GameCameraCtrler(_this);
        _this.DynamicPS = _this.transform.position.clone();
        _this.BasePS = new Laya.Vector3();
        _this.Player = null;
        //this.timerLoop(1,this.Ctrler,this.Ctrler.Update);
        _this.frameLoop(1, _this, _this._Update);
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
    GameCamera.prototype._Update = function () {
        this.Ctrler.Update();
    };
    return GameCamera;
}(Laya.Camera));
exports.default = GameCamera;
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
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameStruct_1 = require("./GameStruct");
var Buff_1 = require("./Buff");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var Path_1 = require("./../Utility/Path");
var AnimObj_1 = require("./../Game/AnimObj");
var APP_1 = require("./../controler/APP");
var PlayerCtrler_1 = require("./PlayerCtrler");
var Input_1 = require("./Input");
var Item;
(function (Item) {
    //物品标识
    var ItemID = "Item";
    var ItemType;
    (function (ItemType) {
        ItemType[ItemType["None"] = 0] = "None";
        ItemType[ItemType["Empty"] = 1] = "Empty";
        ItemType[ItemType["Rock"] = 2] = "Rock";
        ItemType[ItemType["Thorn"] = 3] = "Thorn";
        ItemType[ItemType["Protect"] = 11] = "Protect";
        ItemType[ItemType["Fly"] = 12] = "Fly";
        ItemType[ItemType["Rope"] = 13] = "Rope";
        ItemType[ItemType["Vine"] = 14] = "Vine";
        ItemType[ItemType["Collector"] = 15] = "Collector";
        ItemType[ItemType["Coin"] = 20] = "Coin";
    })(ItemType = Item.ItemType || (Item.ItemType = {}));
    var LineItemInfo = /** @class */ (function () {
        function LineItemInfo(type, num) {
            this.Type = type;
            this.Number = num;
        }
        return LineItemInfo;
    }());
    Item.LineItemInfo = LineItemInfo;
    //物品布局
    var ItemLayout = /** @class */ (function () {
        function ItemLayout() {
            this.RewardList = new Array();
            this.BarrierList = new Array();
            this.BarrierList.push(new LayItemMgr(10, 4, ItemType.Empty, 10));
            this.BarrierList.push(new LayItemMgr(10, 4, ItemType.Rock, 10));
            this.BarrierList.push(new LayItemMgr(10, 4, ItemType.Thorn, 10));
            this.BarrierList.push(new LayItemMgr(10, 10, ItemType.Protect, 10));
            this.BarrierList.push(new LayItemMgr(10, 4, ItemType.Vine));
            this.RewardList.push(new LayItemMgr(10, 4, ItemType.Fly));
            this.RewardList.push(new LayItemMgr(10, 2, ItemType.Rope));
            this.RewardList.push(new LayItemMgr(10, 10, ItemType.Coin));
            this.RewardList.push(new LayItemMgr(10, 1, ItemType.Collector));
        }
        ItemLayout.prototype.TakeLineReward = function (floor) {
            return this.TakeItem(floor, this.RewardList);
        };
        ItemLayout.prototype.TakeLineDifficulty = function (floor) {
            return this.TakeItem(floor, this.BarrierList);
        };
        ItemLayout.prototype.TakeItem = function (floor, MgrList) {
            var returnInfo = new Array();
            for (var listIdx = 0; listIdx < MgrList.length; ++listIdx) {
                MgrList[listIdx].OnFloor(floor);
                var info = MgrList[listIdx].TakeItems(floor);
                if (info.Number > 0) {
                    returnInfo.push(info);
                }
            }
            return returnInfo;
        };
        return ItemLayout;
    }());
    Item.ItemLayout = ItemLayout;
    //该对象的分布图每层等概率分布
    var LayItemMgr = /** @class */ (function () {
        //range区间范围
        //num 区间范围数量
        //itemType 生产的道具类型
        //startFloor 从哪一行开始投掷
        function LayItemMgr(range, num, itemType, startFloor) {
            if (startFloor === void 0) { startFloor = 1; }
            if (num == undefined)
                num = 1;
            if (startFloor == undefined)
                //第0层是玩家起步位置
                startFloor = 1;
            this.ItemType = itemType;
            this.CurFloor = 0;
            this.ItemNum = num;
            this.StartFloor = startFloor;
            this.Range = range;
            //分布图 物品idx:层数
            this.ItemList = new Array();
        }
        //层更新函数
        LayItemMgr.prototype.OnFloor = function (floor) {
            if (floor >= this.StartFloor) {
                this.GenMap();
            }
        };
        //生成分布图
        LayItemMgr.prototype.GenMap = function () {
            var startFloor = this.StartFloor;
            var itemNum = this.ItemNum;
            this.ItemList = new Array();
            var itemList = this.ItemList;
            for (var countNum = 0; countNum < itemNum; ++countNum) {
                var ItemFloor = Math.floor(Math.random() * this.Range) + startFloor;
                itemList.push(ItemFloor);
            }
            this.StartFloor += this.Range;
        };
        LayItemMgr.prototype.TakeItems = function (floor) {
            var countNum = 0;
            var itemList = this.ItemList;
            for (var itemIdx = 0; itemIdx < itemList.length; ++itemIdx) {
                if (itemList[itemIdx] == floor) {
                    ++countNum;
                    itemList.splice(itemIdx, 1);
                    --itemIdx;
                }
            }
            return new LineItemInfo(this.ItemType, countNum);
        };
        return LayItemMgr;
    }());
    Item.LayItemMgr = LayItemMgr;
    //该对象的分布图每层等概率分布
    //range区间范围
    //num 区间范围数量
    //itemType 生产的道具类型
    //startFloor 从哪一行开始投掷
    function ItemFactory(range, num, itemType, startFloor) {
        if (num == undefined)
            num = 1;
        if (startFloor == undefined)
            //第0层是玩家起步位置
            startFloor = 1;
        //道具类型
        this.ItemType = itemType;
        //当前层数
        this.CurFloor = 0;
        //区间分布总数量
        this.rangeNum = num;
        //开始分布的层数
        this.StartFloor = startFloor;
        //分布区间
        this.Range = range;
        //分布图 物品idx:层数
        this.ItemList = new Array();
    }
    Item.ItemFactory = ItemFactory;
    //层更新函数
    //floor 当前层
    ItemFactory.prototype.onFloor = function (floor) {
        if (floor >= this.StartFloor) {
            this.GenMap();
        }
    };
    //生成分布图
    ItemFactory.prototype.GenMap = function () {
        var startFloor = this.StartFloor;
        var rangeNum = this.rangeNum;
        this.ItemList = new Array();
        var itemList = this.ItemList;
        for (var ItemNum = 0; ItemNum < rangeNum; ++ItemNum) {
            var ItemFloor = Math.floor(Math.random() * this.Range) + startFloor;
            itemList.push(ItemFloor);
        }
        this.StartFloor += this.Range;
    };
    //拿某层物品数据
    ItemFactory.prototype.TakeItems = function (floor) {
        var countNum = 0;
        var itemList = this.ItemList;
        for (var itemIdx = 0; itemIdx < itemList.length; ++itemIdx) {
            if (itemList[itemIdx] == floor) {
                ++countNum;
                itemList.splice(itemIdx, 1);
                --itemIdx;
            }
        }
        return { ItemType: this.ItemType, Num: countNum };
    };
    function StepItemFactory(itemType, Step) {
        if (Step == undefined) {
            return;
        }
        if (itemType == undefined) {
            itemType = ItemType.None;
        }
        var item;
        var objPool = Laya.Pool;
        item = objPool.getItem(ItemID + itemType);
        if (item == null) {
            if (GameStruct_1.GameStruct.ItemDictType[itemType] != null && GameStruct_1.GameStruct.ItemDictType[itemType] != undefined) {
                var clas = GameStruct_1.GameStruct.ItemDictType[itemType];
                item = new clas(Step);
            }
            else {
                item = new StepItem(itemType, Step);
            }
        }
        item.Step = Step;
        item.ResetItem();
        return item;
    }
    Item.StepItemFactory = StepItemFactory;
    var StepItem = /** @class */ (function () {
        function StepItem(itemType, Step) {
            this.PutItem = function (itemType) {
                if (itemType === void 0) { itemType = ItemType.None; }
                this.DesPawn();
                this.Step.StepItem = StepItemFactory(itemType, this.Step);
            };
            if (itemType == undefined) {
                itemType = ItemType.None;
            }
            this.Step = Step;
            this.ItemType = itemType;
            this.Model = null;
        }
        Object.defineProperty(StepItem.prototype, "IsDifficulty", {
            get: function () {
                return this.ItemType > 0 && this.ItemType < 10;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StepItem.prototype, "IsForbiden", {
            //判断能不能走上去
            get: function () {
                return this.ItemType == ItemType.Rock;
            },
            enumerable: true,
            configurable: true
        });
        //重置
        StepItem.prototype.ResetItem = function () {
            this._InitItemModel();
            this.SetEnable();
            if (this.Model != null) {
                this.Step.addChild(this.Model);
            }
        };
        StepItem.prototype.SetDisable = function () {
            if (this.Model == null) {
                return;
            }
            this.Model.active = false;
        };
        StepItem.prototype.SetEnable = function () {
            if (this.Model == null) {
                return;
            }
            this.Model.active = true;
        };
        //消除 把自己存入内存池
        StepItem.prototype.DesPawn = function () {
            this.SetDisable();
            if (this.Model != null)
                this.Model.removeSelf();
            var objPool = Laya.Pool; //GM.ObjPool;
            objPool.recover(ItemID + this.ItemType, this);
        };
        /**
         * 触发
         * @param player
         */
        StepItem.prototype.TouchItem = function (player) {
            switch (this.ItemType) {
            }
        };
        StepItem.prototype._AddBuffToPlayer = function (player, buff) {
            if (player.AddBuff(buff)) {
                this.PutItem();
            }
        };
        StepItem.prototype._InitItemModel = function () {
            if (this.Model != null && !this.Model.destroyed) {
                return;
            }
            var ps = new Laya.Vector3(0, APP_1.default.GameManager.StepLength, 0);
            this._GenItemModel(ps);
            return this.Model;
        };
        StepItem.prototype._GenItemModel = function (ps) {
            var model = null;
            switch (this.ItemType) {
                case ItemType.Rock:
                    model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.3, 0.3, 0.5));
                    break;
            }
            if (model != null) {
                model.transform.position = ps;
            }
            this.Model = model;
        };
        return StepItem;
    }());
    Item.StepItem = StepItem;
    var Rock = /** @class */ (function (_super) {
        __extends(Rock, _super);
        function Rock(Step) {
            return _super.call(this, ItemType.Rock, Step) || this;
        }
        Rock.prototype._GenItemModel = function (ps) {
            var model = null;
            var idx = 1 + Math.floor(Math.random() * Rock.ModelNum);
            var road = "L0" + idx + "_spr_barrier_0" + idx + ".lh";
            model = Laya.loader.getRes(Path_1.path.GetLH(road)).clone();
            if (model != null) {
                model.transform.position = ps;
            }
            this.Model = model;
        };
        Rock.ModelNum = 3;
        return Rock;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Rock] = Rock;
    var Thorn = /** @class */ (function (_super) {
        __extends(Thorn, _super);
        function Thorn(Step) {
            return _super.call(this, ItemType.Thorn, Step) || this;
        }
        //由父类统一管理模型生成
        Thorn.prototype._GenItemModel = function (ps) {
            var model = null;
            model = new Laya.Sprite3D();
            model.transform.position = ps;
            this.Model = model;
        };
        Thorn.prototype.TouchItem = function (player) {
            if (player.GetBuff(ProtectBuff.Idx) != null && player.BuffArr[ProtectBuff.Idx].Type == ItemType.Protect) {
                player.GetBuff(ProtectBuff.Idx).Complete();
                this.PutItem();
            }
            else
                APP_1.default.MessageManager.Trigger(MessageCenter_1.MessageMD.GameEvent.PlayerDeath);
        };
        return Thorn;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Thorn] = Thorn;
    var Protect = /** @class */ (function (_super) {
        __extends(Protect, _super);
        function Protect(step) {
            return _super.call(this, ItemType.Protect, step) || this;
        }
        //由父类统一管理模型生成
        Protect.prototype._GenItemModel = function (ps) {
            var model = null;
            model = new Laya.Sprite3D(); //MeshSprite3D(new Laya.BoxMesh(0.1,0.1,0.1));
            model.transform.rotate(new Laya.Vector3(-30, 0, 0), true, false);
            model.transform.position = ps;
            this.Model = model;
        };
        Protect.prototype.TouchItem = function (player) {
            if (player.GetBuff(ProtectBuff.Idx) != null)
                return;
            this._AddBuffToPlayer(player, new ProtectBuff(3000));
        };
        return Protect;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Protect] = Protect;
    var ProtectBuff = /** @class */ (function (_super) {
        __extends(ProtectBuff, _super);
        function ProtectBuff(time) {
            if (time === void 0) { time = 0; }
            var _this = _super.call(this, ItemType.Protect, ProtectBuff.Idx) || this;
            _this.Time = APP_1.default.SceneManager.CurDir.GameTime + time;
            return _this;
        }
        Object.defineProperty(ProtectBuff, "Idx", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ProtectBuff.prototype.Update = function () {
            if (this.Time < APP_1.default.SceneManager.CurDir.GameTime) {
                this.Complete();
            }
        };
        return ProtectBuff;
    }(Buff_1.PlayerBuff.BasePlayerBuff));
    var Coin = /** @class */ (function (_super) {
        __extends(Coin, _super);
        function Coin(step) {
            return _super.call(this, ItemType.Coin, step) || this;
        }
        Coin.prototype.FlyToPlayer = function (player) {
            var conin = AnimObj_1.AnimObj.GenAnimObj(AnimObj_1.AnimObj.AnimCoin, this.Model);
            conin.SetTarget(player);
            APP_1.default.GameManager.GameDir.AddGoldUnLogicGold(1);
            this.PutItem();
        };
        Coin.prototype.TouchItem = function (player) {
            APP_1.default.GameManager.GameDir.AddGold(1);
            this.PutItem();
        };
        //由父类统一管理模型生成
        Coin.prototype._GenItemModel = function (ps) {
            var model = null;
            model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.2, 0.2, 0.2));
            model.transform.position = ps;
            this.Model = model;
        };
        return Coin;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Coin] = Coin;
    var Collecter = /** @class */ (function (_super) {
        __extends(Collecter, _super);
        function Collecter(step) {
            return _super.call(this, ItemType.Collector, step) || this;
        }
        Collecter.prototype.TouchItem = function (player) {
            if (player.GetBuff(CollectBuff.Idx) != null)
                return;
            player.AddBuff(new CollectBuff(10000));
            this.PutItem();
        };
        //由父类统一管理模型生成
        Collecter.prototype._GenItemModel = function (ps) {
            var model = null;
            model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(0.2, 10, 10));
            model.transform.position = ps;
            this.Model = model;
        };
        return Collecter;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Collector] = Collecter;
    var CollectBuff = /** @class */ (function (_super) {
        __extends(CollectBuff, _super);
        function CollectBuff(time) {
            if (time === void 0) { time = 0; }
            var _this = _super.call(this, ItemType.Protect, CollectBuff.Idx) || this;
            _this.GameDir = APP_1.default.GameManager.GameDir;
            _this.Time = _this.GameDir.GameTime + time;
            _this.CountFloor = 0;
            return _this;
        }
        Object.defineProperty(CollectBuff, "Idx", {
            get: function () {
                return 1;
            },
            enumerable: true,
            configurable: true
        });
        CollectBuff.prototype.Start = function (player) {
            _super.prototype.Start.call(this, player);
            this.CountFloor = this.GameDir.PlayerFloor - 2;
        };
        CollectBuff.prototype.Update = function () {
            if (this.Time < this.GameDir.GameTime) {
                this.Complete();
            }
            else {
                if (this.GameDir.PlayerFloor - this.CountFloor + 1 < 0) {
                    return;
                }
                this.GameDir.LoopDoFloorStep(this.CountFloor, this, this.CountCoins);
                ++this.CountFloor;
            }
        };
        CollectBuff.prototype.CountCoins = function (step) {
            if (step.StepItem.ItemType == ItemType.Coin) {
                var Coin = step.StepItem;
                Coin.FlyToPlayer(this.Player);
            }
        };
        return CollectBuff;
    }(Buff_1.PlayerBuff.BasePlayerBuff));
    var FLy = /** @class */ (function (_super) {
        __extends(FLy, _super);
        function FLy(step) {
            return _super.call(this, ItemType.Fly, step) || this;
        }
        FLy.prototype.TouchItem = function (player) {
            if (player.GetBuff(0))
                return;
            player.AddBuff(new FlyBuff());
        };
        //由父类统一管理模型生成
        FLy.prototype._GenItemModel = function (ps) {
            var model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.1));
            ps.y += 0.3;
            this.Model = model;
        };
        return FLy;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Fly] = FLy;
    var FlyBuff = /** @class */ (function (_super) {
        __extends(FlyBuff, _super);
        function FlyBuff(speed, floor) {
            if (speed === void 0) { speed = 0.1; }
            if (floor === void 0) { floor = 10; }
            var _this = _super.call(this, ItemType.Rope, ProtectBuff.Idx) || this;
            _this.Speed = speed;
            _this.Floor = floor;
            _this._FinalLocation = null;
            _this._FinalZ = 0;
            return _this;
        }
        Object.defineProperty(FlyBuff, "Idx", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        FlyBuff.prototype.Start = function (player) {
            _super.prototype.Start.call(this, player);
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - APP_1.default.GameManager.StepDistance / 2 * this.Floor;
            var flyCtrl = new PlayerCtrler_1.PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player);
            player.AddCtrler(flyCtrl);
            APP_1.default.GameManager.GameDir.AddInputCtrler(new Input_1.Input.DIYInput());
            APP_1.default.GameManager.GameDir.SetSafePS(this._FinalLocation);
        };
        FlyBuff.prototype.Update = function () {
            if (this.Player == null) {
                return;
            }
            if (this._FinalZ - this.Player.Position.z > -0.2) {
                var step = APP_1.default.GameManager.GameDir.GetStepByLocation(this._FinalLocation);
                this.Player.LayStep(step);
                this.Player.BaseCtrler.StartMove();
                this.Player.PopCtrler();
                APP_1.default.GameManager.GameDir.PopInputCtrler();
                _super.prototype.Complete.call(this);
            }
        };
        return FlyBuff;
    }(Buff_1.PlayerBuff.BasePlayerBuff));
    var Rope = /** @class */ (function (_super) {
        __extends(Rope, _super);
        function Rope(step) {
            return _super.call(this, ItemType.Rope, step) || this;
        }
        Rope.prototype.TouchItem = function (player) {
            if (player.GetBuff(0))
                return;
            player.AddBuff(new RopeBuff());
        };
        //由父类统一管理模型生成
        Rope.prototype._GenItemModel = function (ps) {
            var model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.1, 0.5, 0.1));
            model.transform.rotate(new Laya.Vector3(30, -45, 0), true, false);
            model.transform.position = ps;
            this.Model = model;
        };
        return Rope;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Rope] = Rope;
    var RopeBuff = /** @class */ (function (_super) {
        __extends(RopeBuff, _super);
        function RopeBuff(speed, floor) {
            if (speed === void 0) { speed = 0.1; }
            if (floor === void 0) { floor = 10; }
            var _this = _super.call(this, ItemType.Rope, ProtectBuff.Idx) || this;
            _this.Speed = speed;
            _this.Floor = floor;
            _this._FinalLocation = null;
            _this._FinalZ = 0;
            return _this;
        }
        Object.defineProperty(RopeBuff, "Idx", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        RopeBuff.prototype.Update = function () {
            if (this.Player == null) {
                return;
            }
            if (this._FinalZ - this.Player.Position.z > -0.2) {
                var step = APP_1.default.GameManager.GameDir.GetStepByLocation(this._FinalLocation);
                this.End(step);
            }
        };
        RopeBuff.prototype.End = function (step) {
            this.Player.LayStep(step);
            this.Player.BaseCtrler.StartMove();
            this.Player.PopCtrler();
            APP_1.default.GameManager.GameDir.PopInputCtrler();
            _super.prototype.Complete.call(this);
        };
        RopeBuff.prototype.Start = function (player) {
            _super.prototype.Start.call(this, player);
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - APP_1.default.GameManager.StepDistance / 2 * this.Floor;
            var flyCtrl = new PlayerCtrler_1.PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player);
            player.AddCtrler(flyCtrl);
            APP_1.default.GameManager.GameDir.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
            APP_1.default.GameManager.GameDir.SetSafePS(this._FinalLocation);
        };
        RopeBuff.prototype._Input = function (isRight) {
            var closeFloor = APP_1.default.GameManager.GameDir.PlayerFloorLine;
            if (closeFloor.FloorNum % 2 != this._FinalLocation.Y % 2) {
                closeFloor = APP_1.default.GameManager.GameDir.GetFloorByFloor(closeFloor.FloorNum + 1);
            }
            var step = closeFloor.GetStep(this._FinalLocation.X);
            if (isRight)
                step = step.RightParent;
            else
                step = step.LeftParent;
            if (step.StepItem.IsForbiden) {
                return;
            }
            this.End(step);
        };
        return RopeBuff;
    }(Buff_1.PlayerBuff.BasePlayerBuff));
    var Vine = /** @class */ (function (_super) {
        __extends(Vine, _super);
        function Vine(step) {
            return _super.call(this, ItemType.Vine, step) || this;
        }
        Vine.prototype.TouchItem = function (player) {
            var curBuff = player.GetBuff(0);
            if (curBuff && curBuff.Type == ItemType.Protect) {
                curBuff.Complete;
                this.PutItem();
            }
            else {
                if (curBuff) {
                    curBuff.Complete();
                }
                player.AddBuff(new VineBuff());
                this.PutItem();
                return;
            }
        };
        //由父类统一管理模型生成
        Vine.prototype._GenItemModel = function (ps) {
            var model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.7, 0.7, 0.1));
            model.transform.position = ps;
            this.Model = model;
        };
        return Vine;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Vine] = Vine;
    var VineBuff = /** @class */ (function (_super) {
        __extends(VineBuff, _super);
        function VineBuff(countTime, inputDir) {
            if (countTime === void 0) { countTime = 3; }
            if (inputDir === void 0) { inputDir = true; }
            var _this = _super.call(this, ItemType.Vine, 0) || this;
            _this.CountTime = countTime;
            _this.InputDir = inputDir;
            _this._ShowGameInfo();
            return _this;
        }
        VineBuff.prototype.Start = function (player) {
            _super.prototype.Start.call(this, player);
            APP_1.default.GameManager.GameDir.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
        };
        VineBuff.prototype.Complete = function () {
            APP_1.default.GameManager.GameDir.PopInputCtrler();
            _super.prototype.Complete.call(this);
        };
        VineBuff.prototype._Input = function (isRight) {
            if (this.InputDir == isRight) {
                this.InputDir = !this.InputDir;
                --this.CountTime;
            }
            if (this.CountTime < 0) {
                this.Complete();
            }
            this._ShowGameInfo();
        };
        VineBuff.prototype._ShowGameInfo = function () {
            var info;
            if (this.CountTime < 0)
                info = "";
            else
                info = this.InputDir == true ? "Right" : "Left";
            APP_1.default.GameManager.GameDir.ShowInputInfo(info);
        };
        return VineBuff;
    }(Buff_1.PlayerBuff.BasePlayerBuff));
})(Item = exports.Item || (exports.Item = {}));
},{"./../FrameWork/MessageCenter":6,"./../Game/AnimObj":9,"./../Utility/Path":26,"./../controler/APP":27,"./Buff":10,"./GameStruct":13,"./Input":14,"./PlayerCtrler":17}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameStruct;
(function (GameStruct) {
    var SetInfo = /** @class */ (function () {
        function SetInfo() {
            this.AudioOn = true;
            this.OPIsRight = true;
            this.TextInfo = "Hello \n Hello";
        }
        return SetInfo;
    }());
    GameStruct.SetInfo = SetInfo;
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
    GameStruct.MLocation = MLocation;
    GameStruct.ItemDictType = {};
})(GameStruct = exports.GameStruct || (exports.GameStruct = {}));
},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Input;
(function (Input) {
    //基础输入控制器
    var BaseGameInput = /** @class */ (function () {
        //私有
        function BaseGameInput(input) {
            if (input === void 0) { input = null; }
            if (input == null) {
                input = this;
            }
            this.NextInput = input;
        }
        return BaseGameInput;
    }());
    Input.BaseGameInput = BaseGameInput;
    var DIYInput = /** @class */ (function (_super) {
        __extends(DIYInput, _super);
        function DIYInput(owner, listener) {
            if (owner === void 0) { owner = null; }
            if (listener === void 0) { listener = null; }
            var _this = _super.call(this) || this;
            _this._Owner = owner;
            _this._Listener = listener;
            return _this;
        }
        DIYInput.prototype.Input = function (isRight) {
            if (this._Listener)
                this._Listener.call(this._Owner, isRight);
        };
        return DIYInput;
    }(BaseGameInput));
    Input.DIYInput = DIYInput;
    var NormGameInput = /** @class */ (function (_super) {
        __extends(NormGameInput, _super);
        function NormGameInput(dir, input) {
            if (input === void 0) { input = null; }
            var _this = _super.call(this, input) || this;
            _this.GameDir = dir;
            return _this;
        }
        NormGameInput.prototype.Input = function (isRight) {
            this.GameDir.MoveStep(isRight);
        };
        return NormGameInput;
    }(BaseGameInput));
    Input.NormGameInput = NormGameInput;
})(Input = exports.Input || (exports.Input = {}));
},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Step_1 = require("./Step");
var APP_1 = require("./../controler/APP");
/**作者:Mo
*场景内对象
*/
//管理一整行
var MountLine = /** @class */ (function (_super) {
    __extends(MountLine, _super);
    function MountLine(lineIdx, floor) {
        if (floor === void 0) { floor = 0; }
        var _this = this;
        var columns = APP_1.default.GameManager.LineStepNum;
        _this = _super.call(this) || this;
        _this.LineIdx = lineIdx;
        _this.FloorNum = floor;
        _this.StepList = [];
        _this.LogicLength = 0;
        for (var StartIdx = (columns - 1); StartIdx >= 0; --StartIdx) {
            var newStep = new Step_1.default(_this, StartIdx);
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
        this.active = true;
        this.FloorNum = floor;
        var newPS = this.transform.position;
        var stepLength = APP_1.default.GameManager.StepLength;
        var stepDistance = APP_1.default.GameManager.StepDistance;
        newPS.y = stepLength * floor;
        newPS.z = -stepDistance / 2 * floor;
        this.transform.position = newPS;
        var stepArr = this.StepList;
        var startX = 0 - stepArr.length / 2 * stepDistance;
        if (this.JugeIsLessLine()) {
            startX += stepDistance / 2;
        }
        for (var column = 0; column < stepArr.length; ++column) {
            var newStep = stepArr[column];
            var stepVector = newStep.Position;
            stepVector.x = startX;
            newStep.ResetStep(stepVector);
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
    //敲碎一层
    MountLine.prototype.Break = function () {
        this.active = false;
    };
    return MountLine;
}(Laya.Sprite3D));
exports.default = MountLine;
},{"./../controler/APP":27,"./Step":18}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerCtrler_1 = require("./PlayerCtrler");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var APP_1 = require("./../controler/APP");
var Path_1 = require("../Utility/Path");
var num = 0;
//该脚本用于游戏玩家对象管理
//玩家对象
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this._PlayerModel = Laya.Loader.getRes(Path_1.path.GetLH("child_01"));
        var secondPlayer = Laya.Sprite3D.instantiate(_this._PlayerModel, _this, false, new Laya.Vector3(0, 0, 0));
        APP_1.default.GameManager.CurScene.PutObj(_this);
        //添加自定义模型
        secondPlayer.transform.rotate(new Laya.Vector3(0, 180, 0), false, false);
        _this.on(Laya.Event.REMOVED, _this, function () { _this.destroy(); });
        _this.Reset();
        return _this;
    }
    Object.defineProperty(Player.prototype, "CurStep", {
        get: function () {
            return this._CurStep;
        },
        set: function (step) {
            this._CurStep = step;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.GetBuff = function (idx) {
        return (this.BuffArr[idx] != null && this.BuffArr[idx] != undefined) ? this.BuffArr[idx] : null;
    };
    //摆放角色
    Player.prototype.SetStep = function (putStep) {
        this.CurStep = putStep;
        var newPS = putStep.Position.clone();
        newPS.y += APP_1.default.GameManager.StepLength;
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
            APP_1.default.MessageManager.Trigger(MessageCenter_1.MessageMD.GameEvent.PlayerDeath);
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
    Player.prototype.AddBuff = function (buff) {
        var index = buff.Idx;
        if (this.BuffArr[index] != null || this.BuffArr[index] != undefined) {
            return false;
        }
        this.BuffArr[index] = buff;
        buff.Idx = index;
        buff.Start(this);
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
    };
    Player.prototype.Reset = function () {
        this.CurStep = null;
        if (this._BuffNode)
            this._BuffNode.destroy();
        this._BuffNode = new Laya.Sprite3D();
        this.addChild(this._BuffNode);
        this.BuffArr = new Array();
        this.BaseCtrler = new PlayerCtrler_1.PlayerControler.PlayerNormCtrler(this);
        this._Ctrler = this.BaseCtrler;
        this._LogicPosition = new Laya.Vector3(0, 0);
        this.frameLoop(1, this, this._Update);
    };
    Player.prototype._Update = function () {
        this._Ctrler.Update();
        for (var buffIdx = 0; buffIdx < 2; ++buffIdx) {
            if (this.BuffArr[buffIdx] != null || this.BuffArr[buffIdx] != undefined)
                this.BuffArr[buffIdx].Update();
        }
    };
    return Player;
}(Laya.Sprite3D));
exports.default = Player;
},{"../Utility/Path":26,"./../FrameWork/MessageCenter":6,"./../controler/APP":27,"./PlayerCtrler":17}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APP_1 = require("./../controler/APP");
var PlayerControler;
(function (PlayerControler) {
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
    PlayerControler.BasePlayerCtrler = BasePlayerCtrler;
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
            this.Time = APP_1.default.SceneManager.CurScene.CurDir.GameTime + APP_1.default.GameManager.PlayerMoveTime;
        };
        PlayerNormCtrler.prototype._Update = function () {
            if (this.Time > 0) {
                if (this.Time <= APP_1.default.GameManager.CurScene.CurDir.GameTime) {
                    this.Time = -1;
                    this.player.SetStep(this.player.CurStep);
                    return;
                }
                else {
                    var lastTime = this.Time - Laya.timer.currTimer;
                    var rate = (1 - lastTime / APP_1.default.GameManager.PlayerMoveTime);
                    var StepPs = this.player.CurStep.Position;
                    StepPs.y += APP_1.default.GameManager.StepLength;
                    var curps = this.player.Position;
                    curps.y += APP_1.default.GameManager.StepLength;
                    var newPs = new Laya.Vector3();
                    newPs.x = (StepPs.x - curps.x) * rate + curps.x;
                    newPs.y = (StepPs.y - curps.y) * rate + curps.y;
                    newPs.z = (StepPs.z - curps.z) * rate + curps.z;
                    this.player.Position = newPs;
                }
            }
            else {
                this.player.TouchGround();
            }
        };
        return PlayerNormCtrler;
    }(BasePlayerCtrler));
    PlayerControler.PlayerNormCtrler = PlayerNormCtrler;
    //玩家飞行
    var PlayerFly = /** @class */ (function (_super) {
        __extends(PlayerFly, _super);
        function PlayerFly(speed) {
            var _this = _super.call(this, null) || this;
            _this.Speed = speed;
            return _this;
        }
        /**
         * 设置玩家
         * @param player 操控角色
         */
        PlayerFly.prototype.SetPlayer = function (player) {
            _super.prototype.SetPlayer.call(this, player);
        };
        PlayerFly.prototype._Update = function () {
            if (this.player == null) {
                return;
            }
            var vector = new Laya.Vector3(0, APP_1.default.GameManager.StepLength, APP_1.default.GameManager.StepDistance / 2);
            Laya.Vector3.scale(vector, this.Speed, vector);
            this.player.Translate(vector);
        };
        return PlayerFly;
    }(BasePlayerCtrler));
    PlayerControler.PlayerFly = PlayerFly;
})(PlayerControler = exports.PlayerControler || (exports.PlayerControler = {}));
},{"./../controler/APP":27}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameItem_1 = require("./GameItem");
var GameStruct_1 = require("./GameStruct");
var Path_1 = require("./../Utility/Path");
var APP_1 = require("./../controler/APP");
//步
var Step = /** @class */ (function (_super) {
    __extends(Step, _super);
    function Step(floor, idx) {
        var _this = 
        //super(new Laya.BoxMesh(1,1,1) );
        _super.call(this) || this;
        APP_1.default.GameManager.CurScene.PutObj(_this);
        var Idx = Math.floor(1 + Math.random() * Step.stepModelNum);
        var name = "LayaScene_L0" + Idx + "_spr_plat_0" + Idx;
        var model = Laya.loader.getRes(Path_1.path.GetLH(name));
        var cloneModel = model.clone();
        _this.addChild(cloneModel);
        _this.transform.position = new Laya.Vector3();
        _this.StepItem = GameItem_1.Item.StepItemFactory(GameItem_1.Item.ItemType.None, _this);
        ;
        _this.StepItem.ResetItem();
        _this.Floor = floor;
        _this.Idx = idx;
        _this.LeftParent = null;
        _this.RightParent = null;
        _this.LeftChild = null;
        _this.RightChild = null;
        _this._IsDeadRoad = false;
        _this.RoadNum = 0;
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
    Object.defineProperty(Step.prototype, "Location", {
        get: function () {
            return new GameStruct_1.GameStruct.MLocation(this.Idx - 1, this.Floor.FloorNum);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Step.prototype, "IsDeadRoad", {
        get: function () {
            return this._IsDeadRoad || !this.active || this.StepItem.IsDifficulty;
        },
        set: function (value) {
            this._IsDeadRoad = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Step.prototype, "IsForbiden", {
        get: function () {
            return this.StepItem.IsForbiden;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Step.prototype, "IsEmpty", {
        get: function () {
            return !(this.active && this.Floor.active);
        },
        enumerable: true,
        configurable: true
    });
    Step.prototype.PutItem = function (itemEnume) {
        if (itemEnume == GameItem_1.Item.ItemType.Empty) {
            this.active = false;
            return;
        }
        else {
            this.active = true;
        }
        this.StepItem.PutItem(itemEnume);
    };
    Step.prototype.ResetStep = function (newPs) {
        this.Position = newPs;
        this.active = true;
        var modelPs = this.transform.position;
        this.StepItem.PutItem(GameItem_1.Item.ItemType.None);
        this.LeftParent = null;
        this.RightParent = null;
        this.LeftChild = null;
        this.RightChild = null;
        this._IsDeadRoad = false;
        this.RoadNum = 0;
    };
    //模型个数
    Step.stepModelNum = 3;
    return Step;
}(Laya.Sprite3D));
exports.default = Step;
},{"./../Utility/Path":26,"./../controler/APP":27,"./GameItem":12,"./GameStruct":13}],19:[function(require,module,exports){
"use strict";
/**
 * 作者:Mo
 * 启动场景
 */
Object.defineProperty(exports, "__esModule", { value: true });
var FrameWork_1 = require("./FrameWork/FrameWork");
var UIManager_1 = require("./FrameWork/UIManager");
var SceneManager_1 = require("./FrameWork/SceneManager");
var MessageCenter_1 = require("./FrameWork/MessageCenter");
var LoadScene_1 = require("./Scene/LoadScene");
var APP_1 = require("./controler/APP");
var Game = /** @class */ (function () {
    //SceneMgr:SceneManager;
    function Game() {
        var ss = APP_1.default;
        Laya3D.init(0, 0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM;
        //开启统计信息
        Laya.Stat.show();
        this._Frame = FrameWork_1.default.FM;
        this._Frame.AddManager(UIManager_1.default);
        this._Frame.AddManager(MessageCenter_1.MessageMD.MessageCenter);
        var sceneMgr = this._Frame.AddManager(SceneManager_1.default);
        sceneMgr.EnterScene(new LoadScene_1.default());
        Laya.timer.frameLoop(1, this, this.Update);
    }
    Game.prototype.Update = function () {
        //this.SceneMgr.Update();
        this._Frame.Update();
    };
    return Game;
}());
var GM = new Game();
/*/*
import TestBase from "./XTest/TestBase"
import RightChild from "./XTest/RightChild"
import LeftChild from "./XTest/LeftChild"

class Game
{
    //SceneMgr:SceneManager;
    constructor()
    {
        var leftChild:LeftChild = new LeftChild();
        var rightChild:RightChild = new RightChild();
        rightChild.Debug();
    }
}*/ 
},{"./FrameWork/FrameWork":5,"./FrameWork/MessageCenter":6,"./FrameWork/SceneManager":7,"./FrameWork/UIManager":8,"./Scene/LoadScene":25,"./controler/APP":27}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LifeObj_1 = require("./../Base/LifeObj");
var BaseDirector = /** @class */ (function (_super) {
    __extends(BaseDirector, _super);
    function BaseDirector() {
        return _super.call(this) || this;
    }
    BaseDirector.prototype._Leave = function () {
        ///APP.MessageManager.DesRgistIDK(MessageMD.GameEvent.GameTimeUp);
        //APP.MessageManager.DesRgistIDK(MessageMD.GameEvent.GameContinue);
        //var app = APP;
        _super.prototype._Leave.call(this);
    };
    BaseDirector.prototype.TimeUp = function () {
    };
    BaseDirector.prototype.Update = function () {
    };
    BaseDirector.prototype.ContinueTime = function () {
    };
    Object.defineProperty(BaseDirector.prototype, "CurGameTime", {
        get: function () {
            return this._StartGameTime + this._TimeUpCount;
        },
        enumerable: true,
        configurable: true
    });
    BaseDirector.prototype._StartComplete = function () {
    };
    Object.defineProperty(BaseDirector.prototype, "GameTime", {
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    //外部接口
    BaseDirector.prototype.Start = function () {
    };
    BaseDirector.prototype._Start = function () {
    };
    return BaseDirector;
}(LifeObj_1.default));
exports.default = BaseDirector;
/*

//导演基类
export default abstract class BaseDirector extends LifeObj
{
    
    _Leave():void
    {
        
        APP.MessageCenter.DesRgistIDK(GameEvent.GameTimeUp);
        APP.MessageCenter.DesRgistIDK(GameEvent.GameContinue);
        
        super._Leave();
    }

    TimeUp():void
    {
        if(this._TimeUpClock<=0)
        {
            //APP.MessageCenter.Trigger(GameEvent.GameTimeUp);
            this._TimeUpClock = Laya.timer.currTimer;
        }
    }

    Update()
    {
        if(this._TimeUpClock<=0)
        {
            super.Update();
        }
    }

    ContinueTime():void
    {
        //APP.MessageCenter.Trigger(GameEvent.GameContinue);
        this._TimeUpCount += Laya.timer.currTimer - this._TimeUpClock;
        this._TimeUpClock = -1;
    }

    get CurGameTime():number
    {
        return this._StartGameTime + this._TimeUpCount;
    }
    
    //私有属性和功能
    private _StartGameTime:number;
    private _TimeUpCount:number;
    private _TimeUpClock:number;
    protected _UIMgr:UIManager;
    protected _MessageMgr:MessageMD.MessageCenter;
    constructor()
    {
        super();
        this._TimeUpCount = 0;
        this._StartGameTime = 0;
        this._TimeUpClock = -1;
        this._UIMgr = FW.FM.GetManager<UIManager>(UIManager);
        this.SceneMgr = APP.SceneManager;
    }
    protected _StartComplete()
    {
        this._TimeUpCount = 0;
        this._StartGameTime = 0;
        this._TimeUpClock = -1;
        this._UIMgr.Clear();
        super._StartComplete();
    }
    SceneMgr:SceneManager;

    get GameTime():number
    {
        if(this._TimeUpClock>0)
        {
            return this._TimeUpClock- this._StartGameTime - this._TimeUpCount;
        }else
        {
            return Laya.timer.currTimer- this._StartGameTime - this._TimeUpCount;
        }
    }
    set GameTime(value:number)
    {
        this._StartGameTime = value;
    }
    //外部接口
    Start():void
    {
        this._Start();
    }
    protected _Start():void
    {
        this._StartGameTime = Laya.timer.currTimer;
        super._Start();
    }

    abstract ReStart():void;
}*/ 
},{"./../Base/LifeObj":3}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FrameWork_1 = require("./../FrameWork/FrameWork");
var UIManager_1 = require("./../FrameWork/UIManager");
var SceneManager_1 = require("./../FrameWork/SceneManager");
var LifeObj_1 = require("./../Base/LifeObj");
var LifeObj_2 = require("./../Base/LifeObj");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
//场景基类
var BaseScene = /** @class */ (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super.call(this) || this;
        _this.SceneMgr = FrameWork_1.default.FM.GetManager(SceneManager_1.default);
        _this.IsLoading = false;
        _this.IsLoadComplete = false;
        _this.CurDir = null;
        _this.Scene = null;
        _this._UIManager = FrameWork_1.default.FM.GetManager(UIManager_1.default);
        _this._MessageMgr = FrameWork_1.default.FM.GetManager(MessageCenter_1.MessageMD.MessageCenter);
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
        this._UIManager.Clear();
        if (this.CurDir.ObjState == LifeObj_2.Enum.LifeObjState.Ended) {
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
        this._UIManager.Clear();
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
        this._UIManager.Clear();
        this._GenDir();
        _super.prototype._StartComplete.call(this);
    };
    return BaseScene;
}(LifeObj_1.default));
exports.default = BaseScene;
},{"./../Base/LifeObj":3,"./../FrameWork/FrameWork":5,"./../FrameWork/MessageCenter":6,"./../FrameWork/SceneManager":7,"./../FrameWork/UIManager":8}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseDirector_1 = require("./BaseDirector");
var EndGameUI_1 = require("./../ui/EndGameUI");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var GameCamera_1 = require("./../Game/GameCamera");
var Player_1 = require("./../Game/Player");
var Input_1 = require("./../Game/Input");
var GameStruct_1 = require("./../Game/GameStruct");
var GameUI_1 = require("./../ui/GameUI");
var MountLine_1 = require("./../Game/MountLine");
var GameItem_1 = require("./../Game/GameItem");
var APP_1 = require("./../controler/APP");
var ItemType = GameItem_1.Item.ItemType;
//游戏导演
var GameDirector = /** @class */ (function (_super) {
    __extends(GameDirector, _super);
    function GameDirector() {
        var _this = _super.call(this) || this;
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
        _this._PanelUI = null;
        return _this;
    }
    Object.defineProperty(GameDirector.prototype, "SafeLocation", {
        get: function () {
            return this._SafeLocation;
        },
        enumerable: true,
        configurable: true
    });
    GameDirector.prototype.AddInputCtrler = function (value) {
        value.NextInput = this.InputCtrl;
        this.InputCtrl = value;
    };
    GameDirector.prototype.PopInputCtrler = function () {
        this.InputCtrl = this.InputCtrl.NextInput;
    };
    GameDirector.prototype.AddGold = function (num) {
        this._GoldNum += num;
        this.AddLogicGold(num);
    };
    GameDirector.prototype.AddGoldUnLogicGold = function (num) {
        this._GoldNum += num;
    };
    GameDirector.prototype.AddLogicGold = function (num) {
        this.PanelUI.AddGold(num);
    };
    //设置安全位置
    GameDirector.prototype.SetSafePS = function (location) {
        if (location.Y < this.TailFLoor.FloorNum) {
            return;
        }
        this._SafeLocation = location;
        if (location.Y <= this.HeadFloor.FloorNum) {
            var floorNum = location.Y;
            for (var index = 0; index < 2; ++index) {
                this.LoopDoFloorStep(floorNum + index, this, this.ClearFloor);
            }
        }
    };
    //清理层的负面道具
    GameDirector.prototype.ClearFloor = function (step) {
        var stepItem = step.StepItem;
        if (stepItem.IsDifficulty || stepItem.ItemType == ItemType.Vine) {
            step.PutItem(ItemType.Empty);
        }
    };
    Object.defineProperty(GameDirector.prototype, "PanelUI", {
        get: function () {
            return this._PanelUI;
        },
        set: function (value) {
            var _this = this;
            value.SetLeftTouch(this, function () { _this.InputCtrl.Input(false); });
            value.SetRightTouch(this, function () { _this.InputCtrl.Input(true); });
            this._PanelUI = value;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(GameDirector.prototype, "PlayerDistance", {
        get: function () {
            return Math.abs((this.Player.Position.z - this._StartPosition.z) / (APP_1.default.GameManager.StepDistance / 2));
        },
        enumerable: true,
        configurable: true
    });
    GameDirector.prototype.Death = function () {
        var ui = this._UIMgr.Show(EndGameUI_1.default);
        //ui.SetGameInfo(this.PlayerDistance,this._GoldNum);
        this.TimeUp();
    };
    //对外接口
    GameDirector.prototype.Start = function () {
        this._Start();
    };
    //重新开始
    GameDirector.prototype.ReStart = function () {
        this._StartComplete();
    };
    GameDirector.prototype.ShowInputInfo = function (info) {
        this.PanelUI.ShowInputInfo(info);
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
    GameDirector.prototype.LoopDoFloorStep = function (floor, Owner, callBack) {
        if (floor < this.TailFLoor.FloorNum || floor > this.HeadFloor.FloorNum) {
            return;
        }
        var floorLine = this.GetFloorByFloor(floor);
        for (var idx = 0; idx < floorLine.LogicLength; ++idx) {
            var step = floorLine.GetStep(idx);
            callBack.call(Owner, step);
        }
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
            floor = Math.round(floor / (APP_1.default.GameManager.StepDistance / 2));
            return Math.abs(floor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameDirector.prototype, "PlayerFloorLine", {
        get: function () {
            return this.GetFloorByFloor(this.PlayerFloor);
        },
        enumerable: true,
        configurable: true
    });
    //创建相关放这 这里重新开始不会走
    GameDirector.prototype._Start = function () {
        /*
        //创建方向光
        var directionLight = new Laya.DirectionLight();
        this.SceneMgr.CurScene.PutObj(directionLight);
        directionLight.color = new Laya.Vector3(1, 1, 1);
        directionLight.direction = new Laya.Vector3(1, -1, 0);
*/
        this.Camera = new GameCamera_1.default();
        this.Camera.transform.localRotationEuler = new Laya.Vector3(-30, 0, 0);
        this.SceneMgr.CurScene.PutObj(this.Camera);
        this.MountLines = [];
        var maxLineNum = APP_1.default.GameManager.MaxLineNum;
        for (var lineIdx = maxLineNum - 1; lineIdx >= 0; --lineIdx) {
            var newMountLine = new MountLine_1.default(lineIdx, lineIdx);
            this.SceneMgr.CurScene.PutObj(newMountLine);
            this.MountLines[lineIdx] = newMountLine;
        }
        //创建UI
        var dir = this;
        //创建玩家
        this.Player = new Player_1.default();
        this.SceneMgr.CurScene.PutObj(this.Player);
        //准备玩家死亡事件
        this._MessageMgr.Regist(MessageCenter_1.MessageMD.GameEvent.PlayerDeath, this.Death, this);
        _super.prototype._Start.call(this);
    };
    //进入游戏的设置放这里 重新开始走这里
    GameDirector.prototype._StartComplete = function () {
        this._SafeLocation = new GameStruct_1.GameStruct.MLocation(0, 0);
        //重置物品
        this.ItemLayout = new GameItem_1.Item.ItemLayout();
        this.CurLineRewards = new Array();
        this.CurLineBarriers = new Array();
        var lines = this.MountLines;
        //创建输入控制器
        this.InputCtrl = new Input_1.Input.NormGameInput(this);
        this._HeadFloorIdx = lines.length - 1;
        this._TailFLoorIdx = 0;
        this.Player.Reset();
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
        this.Camera.Reset(new Laya.Vector3(), new Laya.Vector3(this.Player.Position.x, APP_1.default.GameManager.StepLength * 9, APP_1.default.GameManager.StepLength * 8), this.Player);
        this._GoldNum = 0;
        this._LogicGoldNum = 0;
        _super.prototype._StartComplete.call(this);
        this.PanelUI = this._UIMgr.Show(GameUI_1.default);
        this._CountTime = this.GameTime + 6000;
        this._BootomFloor = 0;
        this._GameUpdate = this._StartCount;
    };
    GameDirector.prototype._Update = function () {
        if (this._GameUpdate != null) {
            this._GameUpdate();
        }
        /*
        */
    };
    //正常运行时的每帧逻辑
    GameDirector.prototype._RunGameUpdate = function () {
        this.PanelUI.Distance = this.PlayerDistance;
        var flooVector = this.TailFLoor.Position;
        if (flooVector.z - this.Player.Position.z > 3 * APP_1.default.GameManager.StepDistance / 2) {
            this._PushFLoor();
        }
        if (this._CountTime < this.GameTime) {
            this._CountTime = this.GameTime + 3000;
            this._DestroyLine(this._BootomFloor);
            this._BootomFloor += 1;
        }
    };
    //开始倒计时期间的每帧逻辑
    GameDirector.prototype._StartCount = function () {
        var time = "";
        var countTime = this._CountTime - this.GameTime;
        if (countTime > 0)
            time += Math.floor(countTime / 1000);
        else {
            this._GameUpdate = this._RunGameUpdate;
            this._CountTime = this.GameTime + 3000;
        }
        this.PanelUI.SetCountTime(time);
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
        if (floor >= this._SafeLocation.Y + APP_1.default.GameManager.MaxLineNum) {
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
        if (floor <= this._SafeLocation.Y + 1 && floor >= this._SafeLocation.Y) {
            for (var index = barriersList.length - 1; index > -1; --index) {
                barriersList.shift();
            }
        }
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
            if (floor == null)
                return;
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
}(BaseDirector_1.default));
exports.default = GameDirector;
},{"./../FrameWork/MessageCenter":6,"./../Game/GameCamera":11,"./../Game/GameItem":12,"./../Game/GameStruct":13,"./../Game/Input":14,"./../Game/MountLine":15,"./../Game/Player":16,"./../controler/APP":27,"./../ui/EndGameUI":30,"./../ui/GameUI":32,"./BaseDirector":20}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseScene_1 = require("./BaseScene");
var Path_1 = require("./../Utility/Path");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var GameItem_1 = require("./../Game/GameItem");
var GameDirector_1 = require("./GameDirector");
var ItemType = GameItem_1.Item.ItemType;
//游戏场景
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    //内部功能
    function GameScene() {
        return _super.call(this) || this;
    }
    //对外接口
    GameScene.prototype.StartLoad = function () {
        Laya.loader.load([Path_1.path.GetDepathUIJS("PlayerList"), Path_1.path.GetDepathUIJS("GameScene"), Path_1.path.GetDepathUIJS("EndGame")], Laya.Handler.create(this, this._LoadComplete));
        _super.prototype.StartLoad.call(this);
    };
    GameScene.prototype._Start = function () {
        _super.prototype._Start.call(this);
    };
    GameScene.prototype._Update = function () {
        _super.prototype._Update.call(this);
    };
    GameScene.prototype._GenDir = function () {
        this.GameDir = new GameDirector_1.default();
        this.CurDir = this.GameDir;
    };
    //离开时进行配置
    GameScene.prototype._Leave = function () {
        this._MessageMgr.DesRgistIDK(MessageCenter_1.MessageMD.GameEvent.PlayerDeath);
        _super.prototype._Leave.call(this);
    };
    GameScene.prototype._LoadComplete = function () {
        this.Scene = new Laya.Scene();
        _super.prototype._LoadComplete.call(this);
    };
    return GameScene;
}(BaseScene_1.default));
exports.default = GameScene;
},{"./../FrameWork/MessageCenter":6,"./../Game/GameItem":12,"./../Utility/Path":26,"./BaseScene":21,"./GameDirector":22}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SceneManager_1 = require("./../FrameWork/SceneManager");
var BaseScene_1 = require("./BaseScene");
var BaseDirector_1 = require("./BaseDirector");
var FrameWork_1 = require("./../FrameWork/FrameWork");
var UIManager_1 = require("./../FrameWork/UIManager");
var EnterGameUI_1 = require("./../ui/EnterGameUI");
var Path_1 = require("./../Utility/Path");
var GuiderManager = /** @class */ (function () {
    //内部功能
    function GuiderManager() {
        this.SceneMgr = FrameWork_1.default.FM.GetManager(SceneManager_1.default);
        this.CurScene = null;
    }
    Object.defineProperty(GuiderManager, "Mgr", {
        get: function () {
            if (GuiderManager._Mgr == null) {
                GuiderManager._Mgr = new GuiderManager();
            }
            return GuiderManager._Mgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GuiderManager.prototype, "GameDir", {
        get: function () {
            return this.CurScene.GuidDir;
        },
        enumerable: true,
        configurable: true
    });
    //进入游戏场景走这个接口
    GuiderManager.prototype.EnterScene = function () {
        var newGameScene = new GuiderScene();
        this.SceneMgr.EnterScene(newGameScene);
        this.CurScene = newGameScene;
    };
    return GuiderManager;
}());
exports.default = GuiderManager;
var GuiderScene = /** @class */ (function (_super) {
    __extends(GuiderScene, _super);
    function GuiderScene() {
        return _super.call(this) || this;
    }
    GuiderScene.prototype.StartLoad = function () {
        Laya.loader.load([{ url: Path_1.path.GetDepathUIJS("Enter"), type: Laya.Loader.JSON }, { url: Path_1.path.GetDepathUIJS("ItemList"), type: Laya.Loader.JSON }, { url: "res/atlas/comp.atlas", type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this._LoadComplete));
    };
    GuiderScene.prototype._GenDir = function () {
        this.GuidDir = new GuiderDirector();
        this.CurDir = this.GuidDir;
    };
    return GuiderScene;
}(BaseScene_1.default));
var GuiderDirector = /** @class */ (function (_super) {
    __extends(GuiderDirector, _super);
    function GuiderDirector() {
        return _super.call(this) || this;
    }
    GuiderDirector.prototype.ReStart = function () {
    };
    GuiderDirector.prototype._Start = function () {
        _super.prototype._Start.call(this);
    };
    GuiderDirector.prototype._StartComplete = function () {
        _super.prototype._StartComplete.call(this);
        this.UI = FrameWork_1.default.FM.GetManager(UIManager_1.default).Show(EnterGameUI_1.default);
    };
    GuiderDirector.prototype._Update = function () {
    };
    return GuiderDirector;
}(BaseDirector_1.default));
},{"./../FrameWork/FrameWork":5,"./../FrameWork/SceneManager":7,"./../FrameWork/UIManager":8,"./../Utility/Path":26,"./../ui/EnterGameUI":31,"./BaseDirector":20,"./BaseScene":21}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseScene_1 = require("./BaseScene");
var BaseDirector_1 = require("./BaseDirector");
var FrameWork_1 = require("./../FrameWork/FrameWork");
var UIManager_1 = require("./../FrameWork/UIManager");
var LoadingUI_1 = require("./../ui/UnDownload/LoadingUI");
var GuiderManager_1 = require("./GuiderManager");
var Path_1 = require("./../Utility/Path");
var LoadScene = /** @class */ (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        return _super.call(this) || this;
    }
    LoadScene.prototype._GenDir = function () {
        this.CurDir = new LoadDirctor();
    };
    LoadScene.prototype.StartLoad = function () {
        var resCol = [{ url: "ui/LoadUI.json", type: Laya.Loader.JSON }, { url: "ui/Resource/comp.atlas", type: Laya.Loader.ATLAS }];
        Laya.loader.load(resCol, Laya.Handler.create(this, this._LoadComplete));
    };
    return LoadScene;
}(BaseScene_1.default));
exports.default = LoadScene;
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
    LoadDirctor.prototype._Start = function () {
        Laya.loader.on(Laya.Event.ERROR, this, this._onError);
        Laya.loader.on(Laya.Event.COMPLETE, this, this._onComplete);
        this.Load();
        _super.prototype._Start.call(this);
        this._LoadFaile = false;
    };
    LoadDirctor.prototype._StartComplete = function () {
        _super.prototype._StartComplete.call(this);
        this.UI = FrameWork_1.default.FM.GetManager(UIManager_1.default).Show(LoadingUI_1.default);
        this.UI.Update();
    };
    LoadDirctor.prototype.Load = function () {
        this._Count2DLoad = 0;
        this._Count3DLoad = 0;
        this._CountValue = 0;
        this._LoadFaile = false;
        var resource2DArr = [
            /*
            {url:"res/uijson/PlayerList.json",type:Laya.Loader.JSON},
            {url:"res/uijson/Characters.json",type:Laya.Loader.JSON},
            {url:"res/uijson/SetPanel.json",type:Laya.Loader.JSON},
            */
            Path_1.path.GetDepathUIJS("Enter"),
            Path_1.path.GetDepathUIJS("SetPanel"),
            Path_1.path.GetDepathUIJS("ItemList"),
            Path_1.path.GetDepathUIJS("Character"),
            Path_1.path.GetDepathUIJS("PlayerList"),
            Path_1.path.GetAtlPath("comp")
        ];
        //resource2DArr = null;
        /*
        var resource3DArr = ["http://www.gsjgame.com/Resource/LayaScene_L01_spr_plat_01/L01_spr_plat_01.lh",
        "http://www.gsjgame.com/Resource/LayaScene_L01_spr_plat_02/L01_spr_plat_02.lh",
        "http://www.gsjgame.com/Resource/LayaScene_L01_spr_plat_03/L01_spr_plat_03.lh",
        "http://www.gsjgame.com/Resource/LayaScene_L01_spr_barrier_01/L01_spr_barrier_01.lh",
        "http://www.gsjgame.com/Resource/LayaScene_L01_spr_barrier_02/L01_spr_barrier_02.lh",
        "http://www.gsjgame.com/Resource/LayaScene_L01_spr_barrier_03/L01_spr_barrier_03.lh",
        "http://www.gsjgame.com/Resource/LayaScene_child_01/child_01.lh"]*/
        Laya.loader.on(Laya.Event.ERROR, this, this._onError);
        Laya.loader.on(Laya.Event.COMPLETE, this, this._onComplete);
        //var resource3DArr = ["C:/Users/Administrator/Desktop/Resource/LayaScene_L01_aut_barrier_02/LayaScene_L01_aut_barrier_02/Conventional/L01_aut_barrier_02.lh"];
        var resource3DArr = [Path_1.path.GetLH("c001_child_01"),
            Path_1.path.GetLH("L01_spr_barrier_01"),
            Path_1.path.GetLH("L01_spr_barrier_02"),
            Path_1.path.GetLH("L01_spr_barrier_03"),
            Path_1.path.GetLH("L01_spr_barrier_04"),
            Path_1.path.GetLH("L01_spr_plat_01"),
            Path_1.path.GetLH("L01_spr_plat_02"),
            Path_1.path.GetLH("L01_spr_plat_03"),
        ]; // "C:/Users/Administrator/Desktop/Resource/LayaScene_L01_aut_barrier_02/LayaScene_L01_aut_barrier_02/Conventional/L01_aut_barrier_02.lh"];
        this._Load(resource2DArr, resource3DArr);
    };
    LoadDirctor.prototype._Load = function (arr2D, arr3D) {
        if (arr2D === void 0) { arr2D = null; }
        if (arr3D === void 0) { arr3D = null; }
        if (arr2D != null) {
            // Laya.loader.load(arr2D,Laya.Handler.create(this,this._onLoaded),Laya.Handler.create(this,this._on2DProgress,null,false));
            Laya.loader.load(arr2D, null, Laya.Handler.create(this, this._on2DProgress, null, false));
        }
        else {
            this._CountValue += 0.5;
            this._Count2DLoad = 1;
        }
        if (arr3D != null) {
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
            this.UI.Complete(function () { GuiderManager_1.default.Mgr.EnterScene(); });
        }
        return;
    };
    LoadDirctor.prototype._Update = function () {
        this.UI.Update();
    };
    return LoadDirctor;
}(BaseDirector_1.default));
},{"./../FrameWork/FrameWork":5,"./../FrameWork/UIManager":8,"./../Utility/Path":26,"./../ui/UnDownload/LoadingUI":36,"./BaseDirector":20,"./BaseScene":21,"./GuiderManager":24}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path;
(function (path) {
    var IsEditor = true;
    path.SceneAssetPath = "LayaScene_";
    path.UIPath = IsEditor ? "D:/GIt/Resources/LayaProject/FreshProject/myLaya/NetResource/" : path.ResourcePath;
    path.ResourcePath = IsEditor ? "C:/Users/Administrator/Desktop/Resource/L01_laya/NetResources/" : "http://www.gsjgame.com/Resource/";
    /**
     * 获取Atl文件路径
     * @param fileName 文件名
     */
    function GetAtlPath(fileName) {
        return path.UIPath + fileName + ".atlas";
    }
    path.GetAtlPath = GetAtlPath;
    /**
     * 获取UIJson路径
     * @param fileName 文件名
     */
    function GetDepathUIJS(fileName) {
        return path.UIPath + fileName + ".json";
    }
    path.GetDepathUIJS = GetDepathUIJS;
    /**
     * 获取lh文件路径
     * @param fileName 文件名
     */
    function GetLH(fileName) {
        return path.ResourcePath + path.SceneAssetPath + fileName + "/Conventional/" + fileName + ".lh";
    }
    path.GetLH = GetLH;
})(path = exports.path || (exports.path = {}));
},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var GameStruct_1 = require("./../Game/GameStruct");
var UIManager_1 = require("./../FrameWork/UIManager");
var SceneManager_1 = require("./../FrameWork/SceneManager");
var FrameWork_1 = require("./../FrameWork/FrameWork");
var SetPanelUI_1 = require("./../ui/SetPanelUI");
var CharacterUI_1 = require("./../ui/CharacterUI");
var GameScene_1 = require("./../Scene/GameScene");
var APP = /** @class */ (function () {
    function APP() {
    }
    Object.defineProperty(APP, "MessageManager", {
        get: function () {
            if (APP._Message == null) {
                APP._Message = FrameWork_1.default.FM.GetManager(MessageCenter_1.MessageMD.MessageCenter);
            }
            return APP._Message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP, "UIManager", {
        get: function () {
            if (APP._UIManager == null) {
                APP._UIManager = FrameWork_1.default.FM.GetManager(UIManager_1.default);
            }
            return APP._UIManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP, "SceneManager", {
        get: function () {
            if (APP._SceneMgr == null) {
                APP._SceneMgr = FrameWork_1.default.FM.GetManager(SceneManager_1.default);
            }
            return APP._SceneMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP, "GameManager", {
        get: function () {
            return GameManager.Mgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP, "GameControler", {
        get: function () {
            return GameControler.Mgr;
        },
        enumerable: true,
        configurable: true
    });
    return APP;
}());
exports.default = APP;
var GameControler = /** @class */ (function () {
    function GameControler() {
        this.UIManager = FrameWork_1.default.FM.GetManager(UIManager_1.default);
    }
    Object.defineProperty(GameControler, "Mgr", {
        get: function () {
            if (GameControler._Mgr == null) {
                GameControler._Mgr = new GameControler();
            }
            return GameControler._Mgr;
        },
        enumerable: true,
        configurable: true
    });
    GameControler.prototype.SetPlayerID = function (id) {
        console.debug("Selected" + id);
    };
    //显示设置面板
    GameControler.prototype.ShowSetPanel = function () {
        var Panel = this.UIManager.Show(SetPanelUI_1.default); // new SetPanel();
    };
    //显示角色面板
    GameControler.prototype.ShowCharacterPanel = function () {
        var character = this.UIManager.Show(CharacterUI_1.default);
    };
    Object.defineProperty(GameControler.prototype, "SetInfo", {
        get: function () {
            if (this._SetInfo == null) {
                this._SetInfo = new GameStruct_1.GameStruct.SetInfo();
            }
            return this._SetInfo;
        },
        set: function (value) {
            this._SetInfo = value;
        },
        enumerable: true,
        configurable: true
    });
    //保存设置数据
    GameControler.prototype.SaveSetInfo = function (info) {
        this.SetInfo = info;
    };
    //读取设置信息
    GameControler.prototype.GetSetInfo = function () {
        return this.SetInfo;
    };
    GameControler.prototype.EnterGameUI = function () {
        GameManager.Mgr.EnterScene();
    };
    GameControler.prototype.EnterGame = function () {
        GameManager.Mgr.EnterScene();
    };
    return GameControler;
}());
//游戏玩法管理
var GameManager = /** @class */ (function () {
    //内部功能
    function GameManager() {
        this.SceneMgr = APP.SceneManager;
    }
    Object.defineProperty(GameManager.prototype, "LineStepNum", {
        //常量定义
        //每行最大格子数
        get: function () {
            return 5 + 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "MaxLineNum", {
        //最大行数
        get: function () {
            return 13;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "StepLength", {
        //格子边长
        get: function () {
            return 0.98;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "StepDistance", {
        //格子斜对角长度
        get: function () {
            return Math.sqrt((this.StepLength * this.StepLength) * 2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameManager.prototype, "PlayerMoveTime", {
        //玩家移动时间
        get: function () {
            return 0.02 * 10000;
            ;
        },
        enumerable: true,
        configurable: true
    });
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
        var newGameScene = new GameScene_1.default();
        this.SceneMgr.EnterScene(newGameScene);
        this.CurScene = newGameScene;
    };
    //生成BUFF表现效果
    GameManager.prototype.GenBuffEffect = function (type) {
        return new Laya.Sprite3D();
    };
    return GameManager;
}());
exports.GameManager = GameManager;
},{"./../FrameWork/FrameWork":5,"./../FrameWork/MessageCenter":6,"./../FrameWork/SceneManager":7,"./../FrameWork/UIManager":8,"./../Game/GameStruct":13,"./../Scene/GameScene":23,"./../ui/CharacterUI":29,"./../ui/SetPanelUI":35}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIManager_1 = require("./../FrameWork/UIManager");
var FrameWork_1 = require("./../FrameWork/FrameWork");
var BaseEnum_1 = require("./../Base/BaseEnum");
//UI基类
var BaseUI = /** @class */ (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI(name) {
        var _this = _super.call(this) || this;
        _this._UIType = BaseEnum_1.BaseEnum.UITypeEnum.Low;
        _this._IsMutex = false;
        _this._Name = name;
        _this._UIManager = FrameWork_1.default.FM.GetManager(UIManager_1.default);
        return _this;
    }
    BaseUI.prototype.Open = function () {
    };
    BaseUI.prototype.Close = function () {
        //UIManager..Close(this);
        var uiMgr = FrameWork_1.default.FM.GetManager(UIManager_1.default);
    };
    BaseUI.prototype.OpenOP = function () {
        this.visible = true;
    };
    BaseUI.prototype.CloseOP = function () {
    };
    BaseUI.prototype.Destroy = function () {
        this.destroy();
    };
    Object.defineProperty(BaseUI.prototype, "UIType", {
        get: function () {
            return this._UIType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseUI.prototype, "IsMutex", {
        get: function () {
            return this._IsMutex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseUI.prototype, "Name", {
        get: function () {
            return this._Name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 对UI进行适配
     * @param UI 适配UI
     */
    BaseUI.prototype.FixUI = function (UI) {
        UI.width = Laya.stage.width;
        UI.height = Laya.stage.height;
        this.addChild(UI);
    };
    return BaseUI;
}(Laya.Sprite));
exports.default = BaseUI;
},{"./../Base/BaseEnum":1,"./../FrameWork/FrameWork":5,"./../FrameWork/UIManager":8}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var Path_1 = require("./../Utility/Path");
var ExtendCharactersUI = /** @class */ (function (_super) {
    __extends(ExtendCharactersUI, _super);
    function ExtendCharactersUI() {
        return _super.call(this) || this;
    }
    ExtendCharactersUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("Character")));
    };
    return ExtendCharactersUI;
}(layaMaxUI_1.ui.CharacterUI));
var CharacterUI = /** @class */ (function (_super) {
    __extends(CharacterUI, _super);
    function CharacterUI(name) {
        var _this = _super.call(this, name) || this;
        _this._UI = new ExtendCharactersUI();
        _this.FixUI(_this._UI);
        _this.SetList();
        return _this;
    }
    CharacterUI.prototype._RenderHandler = function (cell, index) {
        var roleElement = cell;
        roleElement.Idx = index;
        roleElement.Reset();
    };
    CharacterUI.Name = function () {
        return "CharacterUI";
    };
    CharacterUI.prototype.SetList = function () {
        var listArray = ["", "", "", "", "", "", "", "", "", ""];
        this._UI._List.hScrollBarSkin = "";
        this._UI._List.renderHandler = new Laya.Handler(this, this._RenderHandler);
        this._UI._List.array = listArray;
        this._UI._List.scrollBar.elasticBackTime = 200; //设置橡皮筋回弹时间。单位为毫秒。
        this._UI._List.scrollBar.elasticDistance = 50;
    };
    return CharacterUI;
}(BaseUI_1.default));
exports.default = CharacterUI;
},{"./../Utility/Path":26,"./BaseUI":28,"./layaMaxUI":37}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var Path_1 = require("./../Utility/Path");
var APP_1 = require("./../controler/APP");
var ExtendEnterGameUI = /** @class */ (function (_super) {
    __extends(ExtendEnterGameUI, _super);
    function ExtendEnterGameUI() {
        var _this = _super.call(this) || this;
        //this.Panel = this.Panel;
        //this.Panel.vScrollBarSkin = "";
        //this.Panel.hScrollBarSkin = "";
        _this._MenueBtn.on(Laya.Event.CLICK, APP_1.default.GameControler, APP_1.default.GameControler.ShowCharacterPanel);
        _this._SetBtn.on(Laya.Event.CLICK, APP_1.default.GameControler, APP_1.default.GameControler.ShowSetPanel);
        _this._StartBtn.on(Laya.Event.CLICK, APP_1.default.GameControler, APP_1.default.GameControler.EnterGame);
        return _this;
    }
    ExtendEnterGameUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("EndGame")));
    };
    return ExtendEnterGameUI;
}(layaMaxUI_1.ui.EndGameUI));
var EnterGameUI = /** @class */ (function (_super) {
    __extends(EnterGameUI, _super);
    function EnterGameUI(name) {
        var _this = _super.call(this, name) || this;
        _this.UI = new ExtendEnterGameUI();
        _this.FixUI(_this.UI);
        return _this;
        //this.UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ this._UIManager.Show<PlayerListUI>(PlayerListUI)});
    }
    EnterGameUI.Name = function () {
        return "EnterGameUI";
    };
    return EnterGameUI;
}(BaseUI_1.default));
exports.default = EnterGameUI;
},{"./../Utility/Path":26,"./../controler/APP":27,"./BaseUI":28,"./layaMaxUI":37}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var Path_1 = require("./../Utility/Path");
var BaseUI_1 = require("./BaseUI");
var PlayerListUI_1 = require("./../ui/PlayerListUI");
var APP_1 = require("./../controler/APP");
var ExtendEnterGameUI = /** @class */ (function (_super) {
    __extends(ExtendEnterGameUI, _super);
    function ExtendEnterGameUI() {
        var _this = _super.call(this) || this;
        _this.Panel = _this._Panel;
        _this.Panel.vScrollBarSkin = "";
        _this.Panel.hScrollBarSkin = "";
        _this._Character.on(Laya.Event.CLICK, APP_1.default.GameControler, APP_1.default.GameControler.ShowCharacterPanel);
        _this._SetPanel.on(Laya.Event.CLICK, APP_1.default.GameControler, APP_1.default.GameControler.ShowSetPanel);
        _this._Start.on(Laya.Event.CLICK, APP_1.default.GameControler, APP_1.default.GameControler.EnterGame);
        return _this;
    }
    ExtendEnterGameUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("Enter")));
    };
    return ExtendEnterGameUI;
}(layaMaxUI_1.ui.EnterUI));
var EnterGameUI = /** @class */ (function (_super) {
    __extends(EnterGameUI, _super);
    function EnterGameUI(name) {
        var _this = _super.call(this, name) || this;
        _this._UI = new ExtendEnterGameUI();
        _this.FixUI(_this._UI);
        var uiMgr = _this._UIManager;
        _this._UI._CharacterList.on(Laya.Event.CLICK, null, function () { uiMgr.Show(PlayerListUI_1.default); });
        return _this;
    }
    EnterGameUI.Name = function () {
        return "EnterGameUI";
    };
    return EnterGameUI;
}(BaseUI_1.default));
exports.default = EnterGameUI;
},{"./../Utility/Path":26,"./../controler/APP":27,"./../ui/PlayerListUI":34,"./BaseUI":28,"./layaMaxUI":37}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**作者:Mo
 * 场景UI
 */
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var Path_1 = require("./../Utility/Path");
var ItemListUI_1 = require("./ItemListUI");
var APP_1 = require("./../controler/APP");
var ExtendsGameUI = /** @class */ (function (_super) {
    __extends(ExtendsGameUI, _super);
    function ExtendsGameUI() {
        return _super.call(this) || this;
    }
    ExtendsGameUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("Game")));
    };
    ExtendsGameUI.prototype.SetCountTime = function (info) {
        if (info === void 0) { info = ""; }
        this._CountTime.text = info;
    };
    return ExtendsGameUI;
}(layaMaxUI_1.ui.GameUI));
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI(name) {
        var _this = _super.call(this, name) || this;
        _this._IsMutex = true;
        _this._UI = new ExtendsGameUI();
        _this.FixUI(_this._UI);
        _this._Gold = 0;
        var opIsRight = APP_1.default.GameControler.SetInfo.OPIsRight;
        _this._UI._RightHandBtnList.visible = opIsRight;
        _this._UI._ItemListBtn.on(Laya.Event.CLICK, null, function () { _this._UIManager.Show(ItemListUI_1.default); });
        _this.SetCountTime();
        _this.DistanceStr = _this._UI._TxtDistance.text.split("#");
        _this.DistanceStr[1] = "0";
        _this._ShowDistance();
        _this.GoldNumStr = _this._UI._TxtGold.text.split("#");
        _this.GoldNumStr[1] = "0";
        _this._ShowGoldNum();
        _this.ShowInputInfo("");
        return _this;
    }
    GameUI.prototype._ShowDistance = function () {
        this._UI._TxtDistance.text = this.DistanceStr[0] + this.DistanceStr[1];
    };
    GameUI.prototype._ShowGoldNum = function () {
        this._UI._TxtGold.text = this.GoldNumStr[0] + this.GoldNumStr[1];
    };
    GameUI.Name = function () {
        return "GameUI";
    };
    GameUI.prototype.AddGold = function (goldNum) {
        this._Gold += goldNum;
        this.GoldNumStr[1] = this._Gold.toString();
        this._ShowGoldNum();
    };
    GameUI.prototype.SetLeftTouch = function (owner, Listener) {
        this._UI._Right_LeftTouch.on(Laya.Event.CLICK, owner, Listener);
    };
    GameUI.prototype.SetRightTouch = function (owner, Listener) {
        this._UI._Right_RightTouch.on(Laya.Event.CLICK, owner, Listener);
    };
    GameUI.prototype.SetCountTime = function (info) {
        if (info === void 0) { info = ""; }
        if (info == "") {
            this._UI._CountDownUI.visible = false;
            this.GamePanel = true;
        }
        else {
            this._UI.SetCountTime(info);
            this._UI._CountDownUI.visible = true;
            this.GamePanel = false;
        }
    };
    Object.defineProperty(GameUI.prototype, "GamePanel", {
        set: function (value) {
            this._UI._GamePanel.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameUI.prototype, "Distance", {
        set: function (value) {
            this.DistanceStr[1] = value.toFixed(2);
            this._ShowDistance();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameUI.prototype, "GoldNum", {
        set: function (value) {
            this.GoldNumStr[1] = value.toString();
            this._ShowGoldNum();
        },
        enumerable: true,
        configurable: true
    });
    GameUI.prototype.ShowInputInfo = function (info) {
        this._UI._GameInfo.text = info;
    };
    return GameUI;
}(BaseUI_1.default));
exports.default = GameUI;
},{"./../Utility/Path":26,"./../controler/APP":27,"./BaseUI":28,"./ItemListUI":33,"./layaMaxUI":37}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var BaseEnum_1 = require("./../Base/BaseEnum");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var ExtendsItemListUI = /** @class */ (function (_super) {
    __extends(ExtendsItemListUI, _super);
    function ExtendsItemListUI() {
        return _super.call(this) || this;
    }
    ExtendsItemListUI.prototype.createChildren = function () {
        var res = Laya.loader.getRes("res/uijson/ItemList.json");
        this.createView(res);
        _super.prototype.createChildren.call(this);
    };
    ExtendsItemListUI.prototype.SetList = function () {
        var listArray = ["", "", "", "", "", "", "", "", "", ""];
        this._List.hScrollBarSkin = "";
        this._List.renderHandler = new Laya.Handler(this, this._RenderHandler);
        this._List.array = listArray;
        this._List.scrollBar.elasticBackTime = 200; //设置橡皮筋回弹时间。单位为毫秒。
        this._List.scrollBar.elasticDistance = 50;
    };
    ExtendsItemListUI.prototype._RenderHandler = function (cell, index) {
        var roleElement = cell;
        roleElement.SetBtn(this.BtnListener.Listener, this.BtnListener.Action);
    };
    return ExtendsItemListUI;
}(layaMaxUI_1.ui.ItemListUI));
var ItemListUI = /** @class */ (function (_super) {
    __extends(ItemListUI, _super);
    function ItemListUI(name) {
        var _this = _super.call(this, name) || this;
        _this.UI = new ExtendsItemListUI();
        _this.addChild(_this.UI);
        _this.UI.BtnListener = new MessageCenter_1.MessageMD.Delegate(_this, function () { _this._UIManager.Close(_this); });
        _this.UI.SetList();
        _this._UIType = BaseEnum_1.BaseEnum.UITypeEnum.Midle;
        return _this;
    }
    ItemListUI.Name = function () {
        return "ItemListUI";
    };
    return ItemListUI;
}(BaseUI_1.default));
exports.default = ItemListUI;
var ItemElement = /** @class */ (function (_super) {
    __extends(ItemElement, _super);
    //
    function ItemElement() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ItemElement.prototype, "Btn", {
        get: function () {
            if (this._Btn == null) {
                this._Btn = this.getChildAt(1);
            }
            return this._Btn;
        },
        enumerable: true,
        configurable: true
    });
    ItemElement.prototype.SetBtn = function (owner, listener) {
        this.Btn.on(Laya.Event.CLICK, owner, listener);
    };
    return ItemElement;
}(Laya.Box));
},{"./../Base/BaseEnum":1,"./../FrameWork/MessageCenter":6,"./BaseUI":28,"./layaMaxUI":37}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var BaseEnum_1 = require("./../Base/BaseEnum");
var Path_1 = require("./../Utility/Path");
var GuiderManager_1 = require("../Scene/GuiderManager");
var ExtendPlayerList = /** @class */ (function (_super) {
    __extends(ExtendPlayerList, _super);
    function ExtendPlayerList() {
        return _super.call(this) || this;
    }
    ExtendPlayerList.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("PlayerList")));
    };
    return ExtendPlayerList;
}(layaMaxUI_1.ui.PlayerListUI));
var PlayerListUI = /** @class */ (function (_super) {
    __extends(PlayerListUI, _super);
    function PlayerListUI(name) {
        var _this = _super.call(this, name) || this;
        _this._UIType = BaseEnum_1.BaseEnum.UITypeEnum.Midle;
        _this._UI = new ExtendPlayerList();
        _this.addChild(_this._UI);
        _this.FixUI(_this._UI);
        _this._UI._ReturnMain.on(Laya.Event.CLICK, null, function () {
            GuiderManager_1.default.Mgr.EnterScene();
        });
        return _this;
    }
    PlayerListUI.Name = function () {
        return "PlayerListUI";
    };
    return PlayerListUI;
}(BaseUI_1.default));
exports.default = PlayerListUI;
},{"../Scene/GuiderManager":24,"./../Base/BaseEnum":1,"./../Utility/Path":26,"./BaseUI":28,"./layaMaxUI":37}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var BaseEnum_1 = require("./../Base/BaseEnum");
var Path_1 = require("./../Utility/Path");
var GameStruct_1 = require("./../Game/GameStruct");
var GuiderManager_1 = require("../Scene/GuiderManager");
var APP_1 = require("./../controler/APP");
var ExtendsSetPanelUI = /** @class */ (function (_super) {
    __extends(ExtendsSetPanelUI, _super);
    function ExtendsSetPanelUI() {
        return _super.call(this) || this;
        //this._Return.on(Laya.Event.CLICK,this,()=>{APP.UIManager.CloseCurView()});
    }
    ExtendsSetPanelUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("SetPanel")));
    };
    return ExtendsSetPanelUI;
}(layaMaxUI_1.ui.SetPanelUI));
var SetPanelUI = /** @class */ (function (_super) {
    __extends(SetPanelUI, _super);
    function SetPanelUI(name) {
        var _this = _super.call(this, name) || this;
        _this._UIType = BaseEnum_1.BaseEnum.UITypeEnum.Midle;
        _this._UI = new ExtendsSetPanelUI();
        _this.FixUI(_this._UI);
        _this._UI._Return.on(Laya.Event.CLICK, _this, function () { _this._UIManager.CloseCurView(); GuiderManager_1.default.Mgr.EnterScene(); });
        _this.SetPanel();
        return _this;
    }
    SetPanelUI.Name = function () {
        return "SetPanelUI";
    };
    SetPanelUI.prototype.SetPanel = function () {
        var info = APP_1.default.GameControler.GetSetInfo();
        this._UI._AudioSwitch.selectedIndex = info.AudioOn ? 0 : 1;
        this._UI._OPSwitch.selectedIndex = info.OPIsRight ? 1 : 0;
        this._UI._Text.text = info.TextInfo;
    };
    SetPanelUI.prototype.SavePanel = function () {
        var info = new GameStruct_1.GameStruct.SetInfo();
        info.AudioOn = this._UI._AudioSwitch.selectedIndex == 0;
        info.OPIsRight = this._UI._OPSwitch.selectedIndex == 1;
        APP_1.default.GameControler.SaveSetInfo(info);
    };
    SetPanelUI.prototype.CloseOP = function () {
        this.SavePanel();
    };
    return SetPanelUI;
}(BaseUI_1.default));
exports.default = SetPanelUI;
},{"../Scene/GuiderManager":24,"./../Base/BaseEnum":1,"./../Game/GameStruct":13,"./../Utility/Path":26,"./../controler/APP":27,"./BaseUI":28,"./layaMaxUI":37}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseUI_1 = require("./../BaseUI");
var ui;
(function (ui) {
    var LoadingUI = /** @class */ (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            return _super.call(this) || this;
        }
        LoadingUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("Loading");
        };
        return LoadingUI;
    }(Laya.View));
    ui.LoadingUI = LoadingUI;
})(ui || (ui = {}));
var ExtLoadingUI = /** @class */ (function (_super) {
    __extends(ExtLoadingUI, _super);
    function ExtLoadingUI() {
        return _super.call(this) || this;
    }
    ExtLoadingUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes("ui/LoadUI.json"));
    };
    return ExtLoadingUI;
}(ui.LoadingUI));
var LoadingUI = /** @class */ (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI(name) {
        var _this = _super.call(this, name) || this;
        //this._UI =new ui.LoadingUI();
        _this._UI = new ExtLoadingUI();
        _this.FixUI(_this._UI);
        _this.Value = 0;
        _this._UI.ErrorInfo.visible = false;
        _this._UI._Enter.visible = false;
        _this._UI._Enter.on(Laya.Event.CLICK, _this, function () {
            _this._CallBack();
        });
        return _this;
    }
    LoadingUI.Name = function () {
        return "LoadingUI";
    };
    LoadingUI.prototype.Update = function () {
        var x = 0;
        x += this._UI._Progress.width * this._UI._Progress.value;
        this._UI._Guider.pos(x, this._UI.y);
    };
    Object.defineProperty(LoadingUI.prototype, "Value", {
        set: function (num) {
            this._UI._Progress.value = num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingUI.prototype, "value", {
        get: function () {
            return this._UI._Progress.value;
        },
        enumerable: true,
        configurable: true
    });
    LoadingUI.prototype.Complete = function (callBack) {
        this._CallBack = callBack;
        this._UI._Enter.visible = true;
        this._UI._Enter.label = "Enter"; //this._Name[0];
    };
    LoadingUI.prototype.Reload = function (callBack) {
        this._UI.ErrorInfo.visible = true;
    };
    return LoadingUI;
}(BaseUI_1.default));
exports.default = LoadingUI;
},{"./../BaseUI":28}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui;
(function (ui) {
    var CharacterUI = /** @class */ (function (_super) {
        __extends(CharacterUI, _super);
        function CharacterUI() {
            return _super.call(this) || this;
        }
        CharacterUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("Character");
        };
        return CharacterUI;
    }(Laya.View));
    ui.CharacterUI = CharacterUI;
    var EndGameUI = /** @class */ (function (_super) {
        __extends(EndGameUI, _super);
        function EndGameUI() {
            return _super.call(this) || this;
        }
        EndGameUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("EndGame");
        };
        return EndGameUI;
    }(Laya.View));
    ui.EndGameUI = EndGameUI;
    var EnterUI = /** @class */ (function (_super) {
        __extends(EnterUI, _super);
        function EnterUI() {
            return _super.call(this) || this;
        }
        EnterUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("Enter");
        };
        return EnterUI;
    }(Laya.View));
    ui.EnterUI = EnterUI;
    var GameUI = /** @class */ (function (_super) {
        __extends(GameUI, _super);
        function GameUI() {
            return _super.call(this) || this;
        }
        GameUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("Game");
        };
        return GameUI;
    }(Laya.View));
    ui.GameUI = GameUI;
    var ItemListUI = /** @class */ (function (_super) {
        __extends(ItemListUI, _super);
        function ItemListUI() {
            return _super.call(this) || this;
        }
        ItemListUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("ItemList");
        };
        return ItemListUI;
    }(Laya.View));
    ui.ItemListUI = ItemListUI;
    var PlayerListUI = /** @class */ (function (_super) {
        __extends(PlayerListUI, _super);
        function PlayerListUI() {
            return _super.call(this) || this;
        }
        PlayerListUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("PlayerList");
        };
        return PlayerListUI;
    }(Laya.View));
    ui.PlayerListUI = PlayerListUI;
    var SetPanelUI = /** @class */ (function (_super) {
        __extends(SetPanelUI, _super);
        function SetPanelUI() {
            return _super.call(this) || this;
        }
        SetPanelUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("SetPanel");
        };
        return SetPanelUI;
    }(Laya.View));
    ui.SetPanelUI = SetPanelUI;
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[19])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rvb2wvTGF5YTIuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQmFzZS9CYXNlRW51bS50cyIsInNyYy9CYXNlL0Jhc2VGdW5jLnRzIiwic3JjL0Jhc2UvTGlmZU9iai50cyIsInNyYy9GcmFtZVdvcmsvQmFzZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL0ZyYW1lV29yay50cyIsInNyYy9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlci50cyIsInNyYy9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9VSU1hbmFnZXIudHMiLCJzcmMvR2FtZS9BbmltT2JqLnRzIiwic3JjL0dhbWUvQnVmZi50cyIsInNyYy9HYW1lL0dhbWVDYW1lcmEudHMiLCJzcmMvR2FtZS9HYW1lSXRlbS50cyIsInNyYy9HYW1lL0dhbWVTdHJ1Y3QudHMiLCJzcmMvR2FtZS9JbnB1dC50cyIsInNyYy9HYW1lL01vdW50TGluZS50cyIsInNyYy9HYW1lL1BsYXllci50cyIsInNyYy9HYW1lL1BsYXllckN0cmxlci50cyIsInNyYy9HYW1lL1N0ZXAudHMiLCJzcmMvTWFpbi50cyIsInNyYy9TY2VuZS9CYXNlRGlyZWN0b3IudHMiLCJzcmMvU2NlbmUvQmFzZVNjZW5lLnRzIiwic3JjL1NjZW5lL0dhbWVEaXJlY3Rvci50cyIsInNyYy9TY2VuZS9HYW1lU2NlbmUudHMiLCJzcmMvU2NlbmUvR3VpZGVyTWFuYWdlci50cyIsInNyYy9TY2VuZS9Mb2FkU2NlbmUudHMiLCJzcmMvVXRpbGl0eS9QYXRoLnRzIiwic3JjL2NvbnRyb2xlci9BUFAudHMiLCJzcmMvdWkvQmFzZVVJLnRzIiwic3JjL3VpL0NoYXJhY3RlclVJLnRzIiwic3JjL3VpL0VuZEdhbWVVSS50cyIsInNyYy91aS9FbnRlckdhbWVVSS50cyIsInNyYy91aS9HYW1lVUkudHMiLCJzcmMvdWkvSXRlbUxpc3RVSS50cyIsInNyYy91aS9QbGF5ZXJMaXN0VUkudHMiLCJzcmMvdWkvU2V0UGFuZWxVSS50cyIsInNyYy91aS9VbkRvd25sb2FkL0xvYWRpbmdVSS50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkEsSUFBYyxRQUFRLENBRXJCO0FBRkQsV0FBYyxRQUFRO0lBQ2xCLElBQVksVUFBc0I7SUFBbEMsV0FBWSxVQUFVO1FBQUUseUNBQUcsQ0FBQTtRQUFDLDZDQUFLLENBQUE7SUFBQSxDQUFDLEVBQXRCLFVBQVUsR0FBVixtQkFBVSxLQUFWLG1CQUFVLFFBQVk7SUFBQSxDQUFDO0FBQ3ZDLENBQUMsRUFGYSxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUVyQjs7OztBQ0FEOztHQUVHO0FBQ0gsSUFBYyxRQUFRLENBcUVyQjtBQXJFRCxXQUFjLFFBQVE7SUFDbEIsSUFBSyxVQUFzQjtJQUEzQixXQUFLLFVBQVU7UUFBRSx5Q0FBRyxDQUFBO1FBQUMsNkNBQUssQ0FBQTtJQUFBLENBQUMsRUFBdEIsVUFBVSxLQUFWLFVBQVUsUUFBWTtJQUFBLENBQUM7SUFDNUI7UUFJSTtZQUVJLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUVELHNCQUFJLHNCQUFLO2lCQUFUO2dCQUVJLE9BQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN4QixDQUFDOzs7V0FBQTtRQUNELHFCQUFPLEdBQVAsVUFBUSxRQUFpQztZQUVyQyxLQUFJLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQzNCO2dCQUNJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDO1FBQ0wsQ0FBQztRQUNEOzs7O1dBSUc7UUFDSCxpQkFB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LENBQUM7UUFDTCxpQkFBQztJQUFELENBVkEsQUFVQyxDQVYrQixJQUFJLENBQUMsSUFBSSxHQVV4QztJQVZZLGFBQVUsYUFVdEIsQ0FBQTtBQUNMLENBQUMsRUFoRmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBZ0ZmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBtb2R1bGUgQmFzZUVudW0ge1xyXG4gICAgZXhwb3J0IGVudW0gVUlUeXBlRW51bSB7TG93LE1pZGxlfTtcclxufSIsImltcG9ydCBCYXNlTWdyIGZyb20gXCIuLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIjtcclxuXHJcbi8qKlxyXG4gKiDlrprkuYnln7rnoYDnu5PmnoTkvZNcclxuICovXHJcbmV4cG9ydCBtb2R1bGUgQmFzZUZ1bmMge1xyXG4gICAgZW51bSBVSVR5cGVFbnVtIHtMb3csTWlkbGV9O1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcDxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX0NvdW50Om51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9NYXA6e1trZXk6IHN0cmluZ106IFR9O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX01hcCA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvckVhY2goY2FsbGJhY2s6KG1ncjpULGtleTpzdHJpbmcpPT52b2lkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBtYXBLZXkgaW4gdGhpcy5fTWFwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9NYXBbbWFwS2V5XSxtYXBLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBvYmog5pS+5YWl5a+56LGhXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDplK5cclxuICAgICAgICAgKi9cclxuICAgICAgICBTZXQoIG9iajpULCBrZXk6c3RyaW5nIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLl9NYXBba2V5XSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2V0KGtleTpzdHJpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuX01hcFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOenu+mZpOafkOS4quWvueixoVxyXG4gICAgICAgICAqIEByZXR1cm5zIOiiq+enu+mZpOWvueixoVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFJlbW92ZShrZXk6c3RyaW5nKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgT2JqOlQgPSB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICAgICAgaWYoT2JqKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm5oul5pyJXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgSGFzKGtleTpzdHJpbmcpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX01hcFtrZXldKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiXHJcbmV4cG9ydCBtb2R1bGUgRW51bSB7XHJcbiAgICBleHBvcnQgZW51bSBMaWZlT2JqU3RhdGV7IFVuU3RhcnRlZCxTdGFydGluZyxVcGRhdGluZyxFbmRlZCB9XHJcbn1cclxuLy/or6Xlr7nosaHmqKHmnb/nlKjkuo7mnIkg5byA5aeL44CB6L+b6KGM5oCn44CB57uT5p2fIOS4ieenjeeKtuaAgeeahOWvueixoVxyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBMaWZlT2JqXHJcbntcclxuICAgIE9ialN0YXRlOkVudW0uTGlmZU9ialN0YXRlO1xyXG4gICAgYWJzdHJhY3QgU3RhcnQoKTp2b2lkO1xyXG5cclxuICAgIFVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLk9ialN0YXRlID09IEVudW0uTGlmZU9ialN0YXRlLlVuU3RhcnRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fVXBkYXRlRnVuYyAhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGVGdW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcm90ZWN0ZWQgX1VwZGF0ZUZ1bmM6KCk9PnZvaWQ7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VcGRhdGVGdW5jPW51bGw7XHJcbiAgICAgICAgdGhpcy5PYmpTdGF0ZT1FbnVtLkxpZmVPYmpTdGF0ZS5VblN0YXJ0ZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nprvlvIDml7bov5vooYzphY3nva5cclxuICAgIHByb3RlY3RlZCBfTGVhdmUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVXBkYXRlRnVuYyA9IHRoaXMuX0xlYXZlaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8v56a75byA5pe26L+b6KGM6YWN572uIOemu+W8gOmAu+i+keaJp+ihjOWujOaIkOWQjui/m+WFpee7k+adn+eKtuaAgVxyXG4gICAgcHJvdGVjdGVkIF9MZWF2ZWluZygpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9MZWF2ZUNvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nprvlvIDlh4blpIflrozmr5Ug5omn6KGM56a75byA6YC76L6RXHJcbiAgICBwcm90ZWN0ZWQgX0xlYXZlQ29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VwZGF0ZUZ1bmMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuT2JqU3RhdGU9IEVudW0uTGlmZU9ialN0YXRlLkVuZGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6L+b5YWl6YWN572uXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuT2JqU3RhdGU9IEVudW0uTGlmZU9ialN0YXRlLlN0YXJ0aW5nO1xyXG4gICAgICAgIHRoaXMuX1VwZGF0ZUZ1bmMgPSB0aGlzLl9TdGFydGluZztcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/lvIDlp4vlh4blpIcg5YeG5aSH5bCx57uq5ZCO5q2j5byP6L+Q6KGMXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0aW5nKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0Q29tcGxldGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVXBkYXRlRnVuYyA9IHRoaXMuX1VwZGF0ZTtcclxuICAgICAgICB0aGlzLk9ialN0YXRlPSBFbnVtLkxpZmVPYmpTdGF0ZS5VcGRhdGluZztcclxuICAgIH1cclxuICAgIC8v5omn6KGM6L+H56iL5Lit55qE5Yqf6IO9XHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX1VwZGF0ZSgpOnZvaWQ7XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlTWdyXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGUoKTtcclxufSIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5pbXBvcnQge0Jhc2VGdW5jfSAgZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyYW1lV29ya1xyXG57XHJcbiAgICBfTWdyTWFwOkJhc2VGdW5jLk1hcDxCYXNlTWFuYWdlcj47Ly9CYXNlU3RydWN0Lk1hcDxCYXNlTWFuYWdlcj47XHJcbiAgICBfVGVtTWdyTGlzdDpBcnJheTxCYXNlTWFuYWdlcj47XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwID0gbmV3IEJhc2VGdW5jLk1hcDxCYXNlTWFuYWdlcj4oKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIF9GTTpGcmFtZVdvcms7XHJcbiAgICBzdGF0aWMgZ2V0IEZNKCk6RnJhbWVXb3JrXHJcbiAgICB7XHJcbiAgICAgICAgaWYoRnJhbWVXb3JrLl9GTT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZyYW1lV29yay5fRk0gPSBuZXcgRnJhbWVXb3JrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBGcmFtZVdvcmsuX0ZNO1xyXG4gICAgfVxyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbXBNZ3JMaXN0ID0gbmV3IEFycmF5PEJhc2VNYW5hZ2VyPih0aGlzLl9NZ3JNYXAuQ291bnQpO1xyXG4gICAgICAgIHRoaXMuX01nck1hcC5mb3JFYWNoKCAobWdyOkJhc2VNYW5hZ2VyICwga2V5OnN0cmluZyk6dm9pZCA9PntcclxuICAgICAgICAgICAgdGVtcE1nckxpc3QucHVzaChtZ3IpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGVtcE1nckxpc3QuZm9yRWFjaCgobWdyLGlkeCk9PnttZ3IuVXBkYXRlKCk7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZE1hbmFnZXI8VCBleHRlbmRzIEJhc2VNYW5hZ2VyPiggdHlwZTp7bmV3ICgpOiBUOyBOYW1lKCk6c3RyaW5nIH0gKTpUXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fTWdyTWFwLkhhcyh0eXBlLk5hbWUoKSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTWdyTWFwLkdldCh0eXBlLk5hbWUoKSkgYXMgVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld01ncjpUID0gbmV3IHR5cGUoKTtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAuU2V0KG5ld01ncix0eXBlLk5hbWUoKSk7XHJcbiAgICAgICAgcmV0dXJuICBuZXdNZ3I7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBHZXRNYW5hZ2VyPFQgZXh0ZW5kcyBCYXNlTWFuYWdlcj4odHlwZTp7bmV3ICgpOiBUOyBOYW1lKCk6c3RyaW5nIH0pOlR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX01nck1hcC5HZXQodHlwZS5OYW1lKCkpIGFzIFQ7XHJcbiAgICB9XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog5raI5oGv5o6n5Yi25ZmoXHJcbiAqL1xyXG5pbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuZXhwb3J0IG1vZHVsZSBNZXNzYWdlTURcclxue1xyXG4gICAgZXhwb3J0IGNvbnN0IEdhbWVFdmVudCA9XHJcbiAgICB7XHJcbiAgICAgICAgUGxheWVyRGVhdGg6XCJQbGF5ZXJEZWF0aFwiLFxyXG4gICAgICAgIEdhbWVUaW1lVXA6XCJHYW1lVGltZVVwXCIsXHJcbiAgICAgICAgR2FtZUNvbnRpbnVlOlwiR2FtZUNvbnRpbnVlXCJcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIE1lc3NhZ2VDZW50ZXIgZXh0ZW5kcyBCYXNlTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIFwiTWVzc2FnZUNlbnRlclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfTWdyOk1lc3NhZ2VDZW50ZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBfRXZlbnREaWN0OntbS2V5OnN0cmluZ106TUV2ZW50fTtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5bkuovku7ZcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIF9HZXRFdmVudChuYW1lOnN0cmluZyk6TUV2ZW50XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQ6TUV2ZW50ID0gdGhpcy5fRXZlbnREaWN0W25hbWVdO1xyXG4gICAgICAgICAgICBpZihldmVudCA9PSB1bmRlZmluZWR8fCBldmVudCA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBNRXZlbnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9FdmVudERpY3RbbmFtZV0gPSBldmVudDtcclxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9FdmVudERpY3QgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBzdGF0aWMgZ2V0IE1ncigpOk1lc3NhZ2VDZW50ZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKE1lc3NhZ2VDZW50ZXIuX01nciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNZXNzYWdlQ2VudGVyLl9NZ3IgPSBuZXcgTWVzc2FnZUNlbnRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBNZXNzYWdlQ2VudGVyLl9NZ3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jlhoxcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24g5aeU5omYXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmp9IGxpc3RlbmVyIOebkeWQrOiAhVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFJlZ2lzdChuYW1lOnN0cmluZyxhY3Rpb246KCk9PnZvaWQsbGlzdGVuZXI6T2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50Ok1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICB2YXIgbmV3RGxndDpEZWxlZ2F0ZSA9IG5ldyBEZWxlZ2F0ZShsaXN0ZW5lcixhY3Rpb24pO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5BZGQobmV3RGxndCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOmUgOafkOS4quebkeWQrFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiDlp5TmiZhcclxuICAgICAgICAgKiBAcGFyYW0ge09ian0gbGlzdGVuZXIg55uR5ZCs6ICFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmVnaXN0KG5hbWU6c3RyaW5nLGFjdGlvbjooKT0+e30sbGlzdGVuZXI6T2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50Ok1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5SbXYoYWN0aW9uLGxpc3RlbmVyKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jplIDmn5DkuKrkuovku7ZcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBEZXNSZ2lzdElESyhuYW1lOnN0cmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6TUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgICBnZXRFdmVudC5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVHJpZ2dlcihuYW1lOnN0cmluZyxwYXJhbTphbnkgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50Ok1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5FeGVjdXRlKHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpOnZvaWRcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5aeU5omYXHJcbmV4cG9ydCBjbGFzcyBEZWxlZ2F0ZVxyXG57XHJcbiAgICBMaXN0ZW5lcjpPYmplY3Q7XHJcbiAgICBBY3Rpb246KCk9PnZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIOinpuWPkVxyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICovXHJcbiAgICAgRXhlY3V0ZSggcGFyYW06YW55ID0gbnVsbCApXHJcbiAgICAge1xyXG4gICAgICAgICB0aGlzLkFjdGlvbi5jYWxsKHRoaXMuTGlzdGVuZXIscGFyYW0pO1xyXG4gICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGxpc3RlbmVyOk9iamVjdCxhY3Rpb246KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5MaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgIHRoaXMuQWN0aW9uID0gYWN0aW9uO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy/kuovku7ZcclxuZXhwb3J0IGNsYXNzIE1FdmVudFxyXG57XHJcbiAgICAgRGVsZWdhdGVMaXN0OkFycmF5PERlbGVnYXRlPjtcclxuICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAge1xyXG4gICAgICAgICB0aGlzLlJlc2V0KCk7XHJcbiAgICAgfVxyXG4gICAgIC8qKlxyXG4gICAgICog5re75Yqg5aeU5omYXHJcbiAgICAgKiBAcGFyYW0ge0RlbGVnYXRlfSBkbGcg5raI5oGv5ZCN5a2XXHJcbiAgICAgKi9cclxuICAgICBBZGQoZGxnOkRlbGVnYXRlKVxyXG4gICAgIHtcclxuICAgICAgICAgdGhpcy5EZWxlZ2F0ZUxpc3QucHVzaChkbGcpO1xyXG4gICAgIH1cclxuICAgICAvKipcclxuICAgICAqIOenu+mZpOWnlOaJmFxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uIOa2iOaBr+WQjeWtl1xyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmVyIOa2iOaBr+WQjeWtl1xyXG4gICAgICovXHJcbiAgICAgUm12KCBhY3Rpb246KCk9Pnt9LGxpc3RlbmVyOk9iamVjdCA9IG51bGwgKVxyXG4gICAgIHtcclxuICAgICAgICAgdmFyIGRsZ3RMaXN0OkFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICBmb3IodmFyIGFycklkeDpudW1iZXI9ZGxndExpc3QubGVuZ3RoIC0xIDthcnJJZHg+LTE7LS1hcnJJZHgpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgIGlmKGFjdGlvbiA9PSBkbGd0LkFjdGlvbiYmIGxpc3RlbmVyID09IGRsZ3QuTGlzdGVuZXIgKVxyXG4gICAgICAgICAgICAgeyBcclxuICAgICAgICAgICAgICAgICBkbGd0TGlzdC5zcGxpY2UoYXJySWR4LDEpO1xyXG4gICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgIH1cclxuICAgICAgICAgfVxyXG4gICAgIH1cclxuICAgICAvL+mHjee9rlxyXG4gICAgIFJlc2V0KClcclxuICAgICB7XHJcbiAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0ID0gW11cclxuICAgICB9XHJcbiAgICAgLyoqXHJcbiAgICAgKiDop6blj5FcclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAqL1xyXG4gICAgIEV4ZWN1dGUoIHBhcmFtOmFueSApXHJcbiAgICAge1xyXG4gICAgICAgICB2YXIgZGxndExpc3Q6QXJyYXk8RGVsZWdhdGU+ID0gdGhpcy5EZWxlZ2F0ZUxpc3Q7XHJcbiAgICAgICAgIGZvcih2YXIgYXJySWR4Om51bWJlcj1kbGd0TGlzdC5sZW5ndGggLTEgO2FycklkeD4tMTstLWFycklkeClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgdmFyIGRsZ3QgPSBkbGd0TGlzdFthcnJJZHhdO1xyXG4gICAgICAgICAgICAgZGxndC5FeGVjdXRlKHBhcmFtKTtcclxuICAgICAgICAgfVxyXG4gICAgIH1cclxufVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi8uLi9TY2VuZS9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIlxyXG4gLyoq5L2c6ICFTW9cclxuICog5Zy65pmv5Yqf6IO9XHJcbiAqL1xyXG4vL+WcuuaZr+euoeeQhlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlclxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgXCJTY2VuZU1hbmFnZXJcIjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzdGF0aWMgX01ncjpTY2VuZU1hbmFnZXI7XHJcbiAgICBTY2VuZUN0cmxlcjpMYXlhLk5vZGU7XHJcbiAgICBcclxuICAgIHByaXZhdGUgX0N1clNjZW5lOkJhc2VTY2VuZTtcclxuICAgIGdldCBDdXJTY2VuZSgpOkJhc2VTY2VuZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZTtcclxuICAgIH1cclxuICAgIHNldCBDdXJTY2VuZSh2YWx1ZTpCYXNlU2NlbmUpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ3VyU2NlbmUgPXZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IEN1ckRpcigpOkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZS5DdXJEaXI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgLy/mt7vliqDlnLrmma/nrqHnkIZcclxuICAgICAgICB0aGlzLlNjZW5lQ3RybGVyID0gTGF5YS5zdGFnZS5hZGRDaGlsZChuZXcgTGF5YS5TcHJpdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJTY2VuZSh0YXJnZXRTY2VuZTpCYXNlU2NlbmUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkN1clNjZW5lID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUgPSB0YXJnZXRTY2VuZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuTGVhdmUodGFyZ2V0U2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkN1clNjZW5lIT1udWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi91aS9CYXNlVUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgIFVJTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyXHJcbntcclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcml2YXRlIF9VSU5vZGU6TGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9NaWRsZVVJTm9kZTpMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX1VJRGljdDp7W25hbWU6c3RyaW5nXTpCYXNlVUl9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1VJTm9kZSA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMuX1VJTm9kZS53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUlOb2RlLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX1VJTm9kZS5uYW1lID0gXCJVSU5vZGVcIjtcclxuICAgICAgICB0aGlzLl9NaWRsZVVJTm9kZSA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fVUlOb2RlKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuX01pZGxlVUlOb2RlKTtcclxuICAgICAgICB0aGlzLl9VSURpY3QgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgXCJVSU1hbmFnZXJcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgfVxyXG4gICAgcHVibGljIEFkZFVJKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgU2hvdzxUIGV4dGVuZHMgQmFzZVVJPih1aUNsYXNzOntuZXcgKG5hbWU6c3RyaW5nKTogVDsgTmFtZSgpOnN0cmluZyB9KTpUXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHN0cjpzdHJpbmcgPSB1aUNsYXNzLk5hbWUoKTsgICAgXHJcbiAgICAgICAgdmFyIG5ld1VJOkJhc2VVSSA9IHRoaXMuR2V0VUlCeU5hbWUoc3RyKTtcclxuICAgICAgICBuZXdVSSA9IG5ld1VJPT1udWxsP3RoaXMuQWRkVUlCeU5hbWUoc3RyLG5ldyB1aUNsYXNzKHN0cikpOm5ld1VJO1xyXG4gICAgICAgIG5ld1VJLndpZHRoID0gMTA7Ly9MYXlhLnN0YWdlLndpZHRoO1xyXG5cdFx0bmV3VUkuaGVpZ2h0ID0gMTA7Ly9MYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB2YXIgbm9kZTpMYXlhLlNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoKG5ld1VJLlVJVHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5Lit5bGC5qyhVUlcclxuICAgICAgICAgICAgY2FzZSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlOlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuX01pZGxlVUlOb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fTWlkbGVVSU5vZGUubnVtQ2hpbGRyZW48PTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pgJrnn6Xlr7zmvJTmmoLlgZzmuLjmiI9cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLlRpbWVVcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/pu5jorqRVaeWFqOaYr+S9juWxguasoVVJXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fVUlOb2RlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjaGlsZE51bTpudW1iZXIgPSBub2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIC8v5oqK5LqS5pal55qE56qX5Y+j5YWz5o6JXHJcbiAgICAgICAgaWYobmV3VUkuSXNNdXRleCYmY2hpbGROdW0+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VUkgPSBub2RlLmdldENoaWxkQXQobm9kZS5udW1DaGlsZHJlbi0xKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIGxhc3RVSS52aXNpYmxlID0gIWxhc3RVSS5Jc011dGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5hZGRDaGlsZChuZXdVSSk7XHJcbiAgICAgICAgbmV3VUkuT3Blbk9QKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdVSSBhcyBUO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKHVpOkJhc2VVSSlcclxuICAgIHtcclxuICAgICAgICB1aS5yZW1vdmVTZWxmKCk7XHJcblxyXG4gICAgICAgIHVpLkNsb3NlT1AoKTtcclxuICAgICAgICB2YXIgbm9kZTpMYXlhLlNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoKHVpLlVJVHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5Lit5bGC5qyhVUlcclxuICAgICAgICAgICAgY2FzZSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlOlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuX01pZGxlVUlOb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYobm9kZS5udW1DaGlsZHJlbjw9MClcclxuICAgICAgICAgICAgICAgICAgICAvL+WFs+mXreeql+WPoyDpgJrnn6XmuLjmiI/nu6fnu61cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLkNvbnRpbnVlVGltZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/pu5jorqRVaeWFqOaYr+S9juWxguasoVVJXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fVUlOb2RlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNoaWxkTnVtOm51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgaWYoY2hpbGROdW0+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VUk6QmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGNoaWxkTnVtLTEpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgbGFzdFVJLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBDbG9zZUN1clZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB1aTpCYXNlVUkgPXRoaXMuX1VJTm9kZS5nZXRDaGlsZEF0KHRoaXMuX1VJTm9kZS5udW1DaGlsZHJlbi0xKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgdGhpcy5DbG9zZSh1aSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liKDpmaTmiYDmnInoioLngrnkuIrnmoRVSVxyXG4gICAgQ2xlYXIoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB1aU5vZGUgPSB0aGlzLl9VSU5vZGU7XHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgIHZhciBjbG9zZVVJOiBCYXNlVUkgPSB1aU5vZGUuZ2V0Q2hpbGRBdCgwKSBhcyBCYXNlVUk7Ly8ucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVpTm9kZSA9IHRoaXMuX01pZGxlVUlOb2RlXHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgIHZhciBjbG9zZVVJOiBCYXNlVUkgPSB1aU5vZGUuZ2V0Q2hpbGRBdCgwKSBhcyBCYXNlVUk7Ly8ucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEdldFVJQnlOYW1lKG5hbWU6c3RyaW5nKTpCYXNlVUlcclxuICAgIHtcclxuICAgICAgICB2YXIgdWkgPSB0aGlzLl9VSURpY3RbbmFtZV07XHJcbiAgICAgICAgdWkgPSB1aT09dW5kZWZpbmVkP251bGw6dWk7XHJcbiAgICAgICAgcmV0dXJuIHVpO1xyXG4gICAgfVxyXG4gICAgQWRkVUlCeU5hbWUobmFtZTpzdHJpbmcsdWk6QmFzZVVJKTpCYXNlVUlcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSURpY3RbbmFtZV0gPSB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcbiAgICBcclxufSIsImltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbiAvKipcclxuICog6KGo546w55So55qE5a+56LGhXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEFuaW1PYmpcclxue1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdlbkFuaW1PYmo8VCBleHRlbmRzIEJhc2VBbmltT2JqPiggYW5pbUNsYXNzOntuZXcgKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuU3ByaXRlM0QpOiBUOyBOYW1lKCk6c3RyaW5nIH0sbW9kZWw6TGF5YS5TcHJpdGUzRCApOlRcclxuICAgIHtcclxuICAgICAgICB2YXIgYW5pbU9iaiA9IExheWEuUG9vbC5nZXRJdGVtKGFuaW1DbGFzcy5OYW1lKCkpO1xyXG4gICAgICAgIGlmKGFuaW1PYmo9PW51bGwpXHJcbiAgICAgICAgICAgIGFuaW1PYmogPSBuZXcgYW5pbUNsYXNzKGFuaW1DbGFzcy5OYW1lKCksbW9kZWwpO1xyXG4gICAgICAgIHJldHVybiBhbmltT2JqO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhYnN0cmFjdCBjbGFzcyBCYXNlQW5pbU9iaiBleHRlbmRzIExheWEuU3ByaXRlM0RcclxuICAgIHtcclxuICAgICAgICBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuU2NlbmUuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVMb29wKDEsdGhpcyx0aGlzLl9GcmFtZUZ1bmMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIE1vZGVsOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIF9OYW1lOnN0cmluZztcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyxtb2RlbDpMYXlhLlNwcml0ZTNEID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLl9OYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgdGhpcy5vbihMYXlhLkV2ZW50LlJFTU9WRUQsdGhpcyx0aGlzLl9MZWF2ZVN0YWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvdGVjdGVkIF9GcmFtZUZ1bmMoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9KdWRnZUNvbXBsZXRlKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX0ZyYW1lTG9naWNGdW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5q+P5bin5omn6KGM6YC76L6R5Yqf6IO9XHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IF9GcmFtZUxvZ2ljRnVuYygpO1xyXG4gICAgICAgIC8v5Yik5pat5Lu75Yqh5a6M5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IF9KdWRnZUNvbXBsZXRlKCk6Ym9vbGVhbjtcclxuICAgICAgICAvL+eUn+WRveWRqOacn+e7k+adn+WkhOeQhlxyXG4gICAgICAgIHByb3RlY3RlZCBfTGVhdmVTdGFnZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMuX05hbWUsdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcih0aGlzLHRoaXMuX0ZyYW1lRnVuYyk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgQW5pbUNvaW4gZXh0ZW5kcyBCYXNlQW5pbU9ialxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJBbmltQ29pblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBTZXRUYXJnZXQoIHRhcmdldDpMYXlhLlNwcml0ZTNEICkgICAgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9UYXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHN1cGVyLlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RhcmdldDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuTWVzaFNwcml0ZTNEID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKG5hbWUsbW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v5q+P5bin5omn6KGM6YC76L6R5Yqf6IO9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9GcmFtZUxvZ2ljRnVuYygpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRQb3NpdGlvbiA9IHRoaXMuX1RhcmdldC50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgYWRkUFMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zdWJ0cmFjdCh0YXJnZXRQb3NpdGlvbixwb3NpdGlvbixhZGRQUyk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zY2FsZShhZGRQUywwLjA4LGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLmFkZChhZGRQUyxwb3NpdGlvbixwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/nu5PmnZ/lpITnkIZcclxuICAgICAgICBwcm90ZWN0ZWQgX0xlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5fTGVhdmVTdGFnZSgpO1xyXG4gICAgICAgICAgICBBUFAuR2FtZU1hbmFnZXIuR2FtZURpci5BZGRMb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGRpc0RpciA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGRpc0Rpcik7XHJcbiAgICAgICAgICAgIGlmKCBMYXlhLlZlY3RvcjMuc2NhbGFyTGVuZ3RoU3F1YXJlZChkaXNEaXIpPDAuMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IHtQbGF5ZXJDb250cm9sZXJ9IGZyb20gXCIuLy4uL0dhbWUvUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi9JbnB1dFwiO1xyXG5pbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uL0dhbWUvU3RlcFwiXHJcblxyXG5leHBvcnQgbW9kdWxlIFBsYXllckJ1ZmZcclxue1xyXG4gICAgZXhwb3J0IGNsYXNzIEJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgVHlwZTpJdGVtLkl0ZW1UeXBlO1xyXG4gICAgICAgIElkeDpudW1iZXI7XHJcbiAgICAgICAgUGxheWVyOlBsYXllcjtcclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2VuQnVmZk1vZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RoaXMuX0J1ZmZNb2QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QobmV3IExheWEuU3BoZXJlTWVzaCgwLjMsOCw4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICAgICAgLy/liJvlu7rmqKHlnovmmL7npLrlr7nosaFcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQWRkQnVmZk1vZGUodGhpcy5fQnVmZk1vZCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1N0YXJ0RnVuYyE9bnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU3RhcnRGdW5jKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBDb21wbGV0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5Db21wbGV0ZUJ1ZmYodGhpcy5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTW9kLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBwcm90ZWN0ZWQgX0J1ZmZNb2Q6TGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOkl0ZW0uSXRlbVR5cGUsaWR4Om51bWJlciA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLklkeCA9IGlkeDtcclxuICAgICAgICAgICAgdGhpcy5HZW5CdWZmTW9kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0RnVuYzooKT0+dm9pZDtcclxuICAgIH1cclxuICAgIGNsYXNzIEZseUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFNwZWVkOm51bWJlcjtcclxuICAgICAgICBGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPXRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQVBQLkdhbWVNYW5hZ2VyLlN0ZXBEaXN0YW5jZS8yKnRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCgpKTtcclxuICAgICAgICAgICAgQVBQLkdhbWVNYW5hZ2VyLkdhbWVEaXIuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDpudW1iZXI9MC4xLGZsb29yOm51bWJlcj0xMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW0uSXRlbVR5cGUuUm9wZSxQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLl9GaW5hbFogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56Pi0wLjIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSBBUFAuR2FtZU1hbmFnZXIuR2FtZURpci5HZXRTdGVwQnlMb2NhdGlvbih0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuUG9wQ3RybGVyKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3MgUHJvdGVjdEJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTpudW1iZXIgPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbS5JdGVtVHlwZS5Qcm90ZWN0LFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5TY2VuZU1hbmFnZXIuQ3VyRGlyLkdhbWVUaW1lK3RpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU8QVBQLlNjZW5lTWFuYWdlci5DdXJEaXIuR2FtZVRpbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBWaW5lQnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgQ291bnRUaW1lOm51bWJlcjtcclxuICAgICAgICBJbnB1dERpcjpib29sZWFuO1xyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENvbXBsZXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvdW50VGltZTpudW1iZXIgPSAzLGlucHV0RGlyOmJvb2xlYW4gPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbS5JdGVtVHlwZS5WaW5lLDApO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50VGltZSA9IGNvdW50VGltZTtcclxuICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9IGlucHV0RGlyO1xyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZTtcclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpc1JpZ2h0OmJvb2xlYW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLklucHV0RGlyID09IGlzUmlnaHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSF0aGlzLklucHV0RGlyO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLkNvdW50VGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLkNvdW50VGltZTwwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1Nob3dHYW1lSW5mbygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzpzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ291bnRUaW1lPDApXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gXCJcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuSW5wdXREaXIgPT0gdHJ1ZT9cIlJpZ2h0XCI6XCJMZWZ0XCI7XHJcbiAgICAgICAgICAgIEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5cclxuLy/muLjmiI/kuK3nm7jmnLpcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNhbWVyYSBleHRlbmRzIExheWEuQ2FtZXJhXHJcbntcclxuICAgIEN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIEJhc2VQUzpMYXlhLlZlY3RvcjM7XHJcbiAgICBEeW5hbWljUFM6TGF5YS5WZWN0b3IzO1xyXG4gICAgUGxheWVyOlBsYXllcjtcclxuXHJcbiAgICBTZXRQbGFlcihwbGF5ZXI6UGxheWVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBSZXNldChEeW5hbWljUFM6TGF5YS5WZWN0b3IzLGJhc2VQUzpMYXlhLlZlY3RvcjMscGxheWVyOlBsYXllciApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5CYXNlUFMgPSBiYXNlUFM7XHJcbiAgICAgICAgdGhpcy5EeW5hbWljUFMgPSBEeW5hbWljUFM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orqHnrpflubborr7nva7kvY3nva5cclxuICAgIENvdW50U2V0UFMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5hZGQodGhpcy5CYXNlUFMsdGhpcy5EeW5hbWljUFMsbmV3UFMpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBzZXQgUG9zaXRpb24ocHM6TGF5YS5WZWN0b3IzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcHMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpOkxheWEuVmVjdG9yM1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHsgICBcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ3RybGVyID0gbmV3IEdhbWVDYW1lcmFDdHJsZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5EeW5hbWljUFMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuQmFzZVBTID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gbnVsbDtcclxuICAgICAgICAvL3RoaXMudGltZXJMb29wKDEsdGhpcy5DdHJsZXIsdGhpcy5DdHJsZXIuVXBkYXRlKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fVXBkYXRlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1VwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIEJhc2VHYW1lQ2FtZXJhQ3RybGVyXHJcbntcclxuICAgIENhbWVyYTpHYW1lQ2FtZXJhO1xyXG4gICAgQ3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyO1xyXG4gICAgYWJzdHJhY3QgVXBkYXRlKCk6dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBjYW1lcmE6R2FtZUNhbWVyYSxjdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXIgPSBudWxsIClcclxuICAgIHtcclxuICAgICAgICBpZihjdHJsZXIgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgY3RybGVyID0gdGhpczsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gY2FtZXJhO1xyXG4gICAgICAgIHRoaXMuQ3RybGVyID0gY3RybGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ2FtZXJhQ3RybGVyIGV4dGVuZHMgQmFzZUdhbWVDYW1lcmFDdHJsZXJcclxue1xyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkNhbWVyYT09bnVsbHx8IHRoaXMuQ2FtZXJhLlBsYXllciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgQ2FtZXJhUFMgPSB0aGlzLkNhbWVyYS5EeW5hbWljUFM7XHJcbiAgICAgICAgdmFyIFBsYXllclBTID0gdGhpcy5DYW1lcmEuUGxheWVyLl9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgICAgIENhbWVyYVBTLnggPSAwO1xyXG4gICAgICAgIHZhciBkaXNOdW0gPSBQbGF5ZXJQUy55IC0gQ2FtZXJhUFMueTtcclxuICAgICAgICB2YXIgZGlzWk51bSA9IFBsYXllclBTLnogLSBDYW1lcmFQUy56O1xyXG4gICAgICAgIGlmKE1hdGguYWJzKGRpc051bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnkgKz0gZGlzTnVtKjAuMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIE1hdGguYWJzKGRpc1pOdW0pPjAuMDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy56ICs9IGRpc1pOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5DYW1lcmEuRHluYW1pY1BTID1DYW1lcmFQUztcclxuICAgICAgICB0aGlzLkNhbWVyYS5Db3VudFNldFBTKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FtZXJhOkdhbWVDYW1lcmEsY3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBzdXBlcihjYW1lcmEsY3RybGVyKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7UGxheWVyQnVmZn0gZnJvbSBcIi4vQnVmZlwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtBbmltT2JqfSBmcm9tIFwiLi8uLi9HYW1lL0FuaW1PYmpcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCB7UGxheWVyQ29udHJvbGVyfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL0lucHV0XCI7XHJcbnR5cGUgQmFzZVBsYXllckJ1ZmYgPSBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmO1xyXG50eXBlIEFuaW1Db2luID0gQW5pbU9iai5BbmltQ29pblxyXG5cclxuZXhwb3J0IG1vZHVsZSBJdGVtXHJcbntcclxuICAgIC8v54mp5ZOB5qCH6K+GXHJcbiAgICBjb25zdCBJdGVtSUQ6c3RyaW5nID0gXCJJdGVtXCI7XHJcbiAgICBleHBvcnQgZW51bSBJdGVtVHlwZSB7XHJcbiAgICAgICAgTm9uZT0wLFxyXG4gICAgICAgIEVtcHR5LFxyXG4gICAgICAgIFJvY2ssXHJcbiAgICAgICAgVGhvcm4sXHJcbiAgICAgICAgUHJvdGVjdD0xMSxcclxuICAgICAgICBGbHksXHJcbiAgICAgICAgUm9wZSxcclxuICAgICAgICBWaW5lLFxyXG4gICAgICAgIENvbGxlY3RvcixcclxuICAgICAgICBDb2luPTIwLFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgTGluZUl0ZW1JbmZvXHJcbiAgICB7XHJcbiAgICAgICAgVHlwZTpJdGVtVHlwZTtcclxuICAgICAgICBOdW1iZXI6bnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCB0eXBlOkl0ZW1UeXBlLG51bTpudW1iZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5OdW1iZXIgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eJqeWTgeW4g+WxgFxyXG4gICAgZXhwb3J0IGNsYXNzIEl0ZW1MYXlvdXRcclxuICAgIHtcclxuICAgICAgICBSZXdhcmRMaXN0OkFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIEJhcnJpZXJMaXN0OkFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0ID0gbmV3IEFycmF5PExheUl0ZW1NZ3I+KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCw0LEl0ZW1UeXBlLkVtcHR5LDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCw0LEl0ZW1UeXBlLlJvY2ssMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDQsSXRlbVR5cGUuVGhvcm4sMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDEwLEl0ZW1UeXBlLlByb3RlY3QsMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDQsSXRlbVR5cGUuVmluZSkpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCw0LEl0ZW1UeXBlLkZseSkpXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDIsSXRlbVR5cGUuUm9wZSkpXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDEwLEl0ZW1UeXBlLkNvaW4pKVxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwxLEl0ZW1UeXBlLkNvbGxlY3RvcikpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFRha2VMaW5lUmV3YXJkKGZsb29yOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRha2VJdGVtKGZsb29yLHRoaXMuUmV3YXJkTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFRha2VMaW5lRGlmZmljdWx0eShmbG9vcjpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vcix0aGlzLkJhcnJpZXJMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBUYWtlSXRlbShmbG9vcjpudW1iZXIsIE1nckxpc3Q6QXJyYXk8TGF5SXRlbU1ncj4pOkFycmF5PExpbmVJdGVtSW5mbz5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByZXR1cm5JbmZvID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICAgICAgZm9yKCB2YXIgbGlzdElkeCA9IDA7IGxpc3RJZHggPCBNZ3JMaXN0Lmxlbmd0aDsgKytsaXN0SWR4IClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWdyTGlzdFtsaXN0SWR4XS5PbkZsb29yKGZsb29yKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmZvOkxpbmVJdGVtSW5mbyA9IE1nckxpc3RbbGlzdElkeF0uVGFrZUl0ZW1zKGZsb29yKTtcclxuICAgICAgICAgICAgICAgIGlmKGluZm8uTnVtYmVyPjApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuSW5mby5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5JbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICAvL+ivpeWvueixoeeahOWIhuW4g+Wbvuavj+WxguetieamgueOh+WIhuW4g1xyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgTGF5SXRlbU1nclxyXG4gICAge1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgSXRlbVR5cGU6SXRlbVR5cGU7XHJcbiAgICAgICAgLy/lvZPliY3lsYLmlbBcclxuICAgICAgICBDdXJGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgLy/ljLrpl7TliIbluIPmgLvmlbDph49cclxuICAgICAgICBJdGVtTnVtOm51bWJlcjtcclxuICAgICAgICAvL+W8gOWni+WIhuW4g+eahOWxguaVsFxyXG4gICAgICAgIFN0YXJ0Rmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIC8v5YiG5biD5Yy66Ze0XHJcbiAgICAgICAgUmFuZ2U6bnVtYmVyO1xyXG4gICAgICAgIEl0ZW1MaXN0OkFycmF5PG51bWJlcj47XHJcbiAgICAgICAgLy9yYW5nZeWMuumXtOiMg+WbtFxyXG4gICAgICAgIC8vbnVtIOWMuumXtOiMg+WbtOaVsOmHj1xyXG4gICAgICAgIC8vaXRlbVR5cGUg55Sf5Lqn55qE6YGT5YW357G75Z6LXHJcbiAgICAgICAgLy9zdGFydEZsb29yIOS7juWTquS4gOihjOW8gOWni+aKleaOt1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCByYW5nZTpudW1iZXIsbnVtOm51bWJlcixpdGVtVHlwZTpJdGVtVHlwZSxzdGFydEZsb29yOm51bWJlciA9IDEgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYobnVtID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICBudW0gPSAxO1xyXG4gICAgICAgICAgICBpZihzdGFydEZsb29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIC8v56ysMOWxguaYr+eOqeWutui1t+atpeS9jee9rlxyXG4gICAgICAgICAgICAgICAgc3RhcnRGbG9vciA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5DdXJGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbU51bSA9IG51bTtcclxuICAgICAgICAgICAgdGhpcy5TdGFydEZsb29yID0gc3RhcnRGbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5SYW5nZSA9IHJhbmdlO1xyXG4gICAgICAgICAgICAvL+WIhuW4g+WbviDnianlk4FpZHg65bGC5pWwXHJcbiAgICAgICAgICAgIHRoaXMuSXRlbUxpc3QgPSBuZXcgQXJyYXk8bnVtYmVyPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WxguabtOaWsOWHveaVsFxyXG4gICAgICAgIE9uRmxvb3IoZmxvb3I6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZmxvb3I+PXRoaXMuU3RhcnRGbG9vcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HZW5NYXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUn+aIkOWIhuW4g+WbvlxyXG4gICAgICAgIEdlbk1hcCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRGbG9vciA9IHRoaXMuU3RhcnRGbG9vcjtcclxuICAgICAgICAgICAgdmFyIGl0ZW1OdW0gPSB0aGlzLkl0ZW1OdW07XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbUxpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgdmFyIGl0ZW1MaXN0ID0gdGhpcy5JdGVtTGlzdDtcclxuICAgICAgICAgICAgZm9yKHZhciBjb3VudE51bTpudW1iZXIgPSAwOyBjb3VudE51bTxpdGVtTnVtOysrY291bnROdW0pXHJcbiAgICAgICAgICAgIHsgICBcclxuICAgICAgICAgICAgICAgIHZhciBJdGVtRmxvb3I6bnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMuUmFuZ2UpICsgc3RhcnRGbG9vcjtcclxuICAgICAgICAgICAgICAgIGl0ZW1MaXN0LnB1c2goSXRlbUZsb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0Rmxvb3IgKz0gdGhpcy5SYW5nZTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBUYWtlSXRlbXMoIGZsb29yOm51bWJlciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY291bnROdW0gPSAwO1xyXG4gICAgICAgICAgICB2YXIgaXRlbUxpc3QgPSB0aGlzLkl0ZW1MaXN0O1xyXG4gICAgICAgICAgICBmb3IodmFyIGl0ZW1JZHggPSAwO2l0ZW1JZHg8aXRlbUxpc3QubGVuZ3RoOysraXRlbUlkeClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoaXRlbUxpc3RbaXRlbUlkeF0gPT0gZmxvb3IpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgKytjb3VudE51bTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtTGlzdC5zcGxpY2UoaXRlbUlkeCwxKTtcclxuICAgICAgICAgICAgICAgICAgICAtLWl0ZW1JZHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5lSXRlbUluZm8odGhpcy5JdGVtVHlwZSxjb3VudE51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+ivpeWvueixoeeahOWIhuW4g+Wbvuavj+WxguetieamgueOh+WIhuW4g1xyXG4gICAgLy9yYW5nZeWMuumXtOiMg+WbtFxyXG4gICAgLy9udW0g5Yy66Ze06IyD5Zu05pWw6YePXHJcbiAgICAvL2l0ZW1UeXBlIOeUn+S6p+eahOmBk+WFt+exu+Wei1xyXG4gICAgLy9zdGFydEZsb29yIOS7juWTquS4gOihjOW8gOWni+aKleaOt1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEl0ZW1GYWN0b3J5KCByYW5nZSxudW0saXRlbVR5cGUsc3RhcnRGbG9vciApXHJcbiAgICB7XHJcbiAgICAgICAgaWYobnVtID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgbnVtID0gMTtcclxuICAgICAgICBpZihzdGFydEZsb29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgLy/nrKww5bGC5piv546p5a626LW35q2l5L2N572uXHJcbiAgICAgICAgICAgIHN0YXJ0Rmxvb3IgPSAxO1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgdGhpcy5JdGVtVHlwZSA9IGl0ZW1UeXBlO1xyXG4gICAgICAgIC8v5b2T5YmN5bGC5pWwXHJcbiAgICAgICAgdGhpcy5DdXJGbG9vciA9IDA7XHJcbiAgICAgICAgLy/ljLrpl7TliIbluIPmgLvmlbDph49cclxuICAgICAgICB0aGlzLnJhbmdlTnVtID0gbnVtO1xyXG4gICAgICAgIC8v5byA5aeL5YiG5biD55qE5bGC5pWwXHJcbiAgICAgICAgdGhpcy5TdGFydEZsb29yID0gc3RhcnRGbG9vcjtcclxuICAgICAgICAvL+WIhuW4g+WMuumXtFxyXG4gICAgICAgIHRoaXMuUmFuZ2UgPSByYW5nZTtcclxuICAgICAgICAvL+WIhuW4g+WbviDnianlk4FpZHg65bGC5pWwXHJcbiAgICAgICAgdGhpcy5JdGVtTGlzdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgfVxyXG4gICAgLy/lsYLmm7TmlrDlh73mlbBcclxuICAgIC8vZmxvb3Ig5b2T5YmN5bGCXHJcbiAgICBJdGVtRmFjdG9yeS5wcm90b3R5cGUub25GbG9vcj0gZnVuY3Rpb24oZmxvb3IpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoZmxvb3I+PXRoaXMuU3RhcnRGbG9vcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuR2VuTWFwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/nlJ/miJDliIbluIPlm75cclxuICAgIEl0ZW1GYWN0b3J5LnByb3RvdHlwZS5HZW5NYXAgPSBmdW5jdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHN0YXJ0Rmxvb3IgPSB0aGlzLlN0YXJ0Rmxvb3I7XHJcbiAgICAgICAgdmFyIHJhbmdlTnVtID0gdGhpcy5yYW5nZU51bTtcclxuICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdmFyIGl0ZW1MaXN0ID0gdGhpcy5JdGVtTGlzdDtcclxuICAgICAgICBmb3IodmFyIEl0ZW1OdW0gPSAwOyBJdGVtTnVtPHJhbmdlTnVtOysrSXRlbU51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBJdGVtRmxvb3IgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGhpcy5SYW5nZSkgKyBzdGFydEZsb29yO1xyXG4gICAgICAgICAgICBpdGVtTGlzdC5wdXNoKEl0ZW1GbG9vcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU3RhcnRGbG9vciArPSB0aGlzLlJhbmdlO1xyXG4gICAgfVxyXG4gICAgLy/mi7/mn5DlsYLnianlk4HmlbDmja5cclxuICAgIEl0ZW1GYWN0b3J5LnByb3RvdHlwZS5UYWtlSXRlbXMgPSBmdW5jdGlvbiggZmxvb3IgKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjb3VudE51bSA9IDA7XHJcbiAgICAgICAgdmFyIGl0ZW1MaXN0ID0gdGhpcy5JdGVtTGlzdDtcclxuICAgICAgICBmb3IodmFyIGl0ZW1JZHggPSAwO2l0ZW1JZHg8aXRlbUxpc3QubGVuZ3RoOysraXRlbUlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGl0ZW1MaXN0W2l0ZW1JZHhdID09IGZsb29yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICArK2NvdW50TnVtO1xyXG4gICAgICAgICAgICAgICAgaXRlbUxpc3Quc3BsaWNlKGl0ZW1JZHgsMSk7XHJcbiAgICAgICAgICAgICAgICAtLWl0ZW1JZHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtJdGVtVHlwZTp0aGlzLkl0ZW1UeXBlLCBOdW06Y291bnROdW19O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gU3RlcEl0ZW1GYWN0b3J5KCBpdGVtVHlwZTpJdGVtVHlwZSxTdGVwKVxyXG4gICAge1xyXG4gICAgICAgIGlmKFN0ZXAgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGl0ZW1UeXBlID09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGl0ZW1UeXBlID0gSXRlbVR5cGUuTm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGl0ZW1cclxuICAgICAgICB2YXIgb2JqUG9vbCA9IExheWEuUG9vbDtcclxuICAgICAgICBpdGVtID0gb2JqUG9vbC5nZXRJdGVtKEl0ZW1JRCtpdGVtVHlwZSlcclxuICAgICAgICBpZihpdGVtPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdIT1udWxsJiZHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV0hPXVuZGVmaW5lZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXM6IGFueSA9IEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXTtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBuZXcgY2xhcyhTdGVwKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBTdGVwSXRlbShpdGVtVHlwZSxTdGVwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uU3RlcCA9IFN0ZXA7XHJcbiAgICAgICAgaXRlbS5SZXNldEl0ZW0oKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgU3RlcDpTdGVwO1xyXG4gICAgICAgIEl0ZW1UeXBlOkl0ZW1UeXBlO1xyXG4gICAgICAgIE1vZGVsOkxheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgZ2V0IElzRGlmZmljdWx0eSgpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkl0ZW1UeXBlPjAmJnRoaXMuSXRlbVR5cGU8MTA7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/liKTmlq3og73kuI3og73otbDkuIrljrtcclxuICAgICAgICBnZXQgSXNGb3JiaWRlbigpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkl0ZW1UeXBlID09IEl0ZW1UeXBlLlJvY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6YeN572uXHJcbiAgICAgICAgUmVzZXRJdGVtKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0luaXRJdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5TZXRFbmFibGUoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5Nb2RlbCE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RlcC5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBTZXREaXNhYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuTW9kZWw9PW51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFNldEVuYWJsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLk1vZGVsPT1udWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbC5hY3RpdmUgPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFB1dEl0ZW0gPSBmdW5jdGlvbiggaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVzUGF3bigpO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXAuU3RlcEl0ZW0gPSBTdGVwSXRlbUZhY3RvcnkoaXRlbVR5cGUsdGhpcy5TdGVwKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+a2iOmZpCDmioroh6rlt7HlrZjlhaXlhoXlrZjmsaBcclxuICAgICAgICBEZXNQYXduKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0RGlzYWJsZSgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLk1vZGVsIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Nb2RlbC5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHZhciBvYmpQb29sID0gTGF5YS5Qb29sOy8vR00uT2JqUG9vbDtcclxuICAgICAgICAgICAgb2JqUG9vbC5yZWNvdmVyKEl0ZW1JRCt0aGlzLkl0ZW1UeXBlLHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5JdGVtVHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoIGl0ZW1UeXBlOkl0ZW1UeXBlLFN0ZXA6U3RlcCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihpdGVtVHlwZSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1UeXBlID0gSXRlbVR5cGUuTm9uZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlN0ZXAgPSBTdGVwO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1UeXBlID0gaXRlbVR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWw9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXI6UGxheWVyLGJ1ZmY6QmFzZVBsYXllckJ1ZmYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuQWRkQnVmZihidWZmKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5pdEl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiggdGhpcy5Nb2RlbCE9bnVsbCYmIXRoaXMuTW9kZWwuZGVzdHJveWVkIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwcyA9IG5ldyBMYXlhLlZlY3RvcjMoMCxBUFAuR2FtZU1hbmFnZXIuU3RlcExlbmd0aCwwKTtcclxuICAgICAgICAgICAgdGhpcy5fR2VuSXRlbU1vZGVsKHBzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuTW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwocHM6TGF5YS5WZWN0b3IzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuSXRlbVR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9jazpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKG1vZGVsIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gcHM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsYXNzIFJvY2sgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgTW9kZWxOdW0gPSAzO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvY2ssU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKHBzOkxheWEuVmVjdG9yMylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLk1lc2hTcHJpdGUzRCA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSAxK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpSb2NrLk1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIHJvYWQgPSBcIkwwXCIraWR4K1wiX3Nwcl9iYXJyaWVyXzBcIitpZHgrXCIubGhcIlxyXG4gICAgICAgICAgICBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldExIKHJvYWQpKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBpZihtb2RlbCE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUm9ja10gPSBSb2NrO1xyXG4gICAgXHJcbiAgICBjbGFzcyBUaG9ybiBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoU3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVGhvcm4sU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwocHM6TGF5YS5WZWN0b3IzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsID0gbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuICAgICAgICAgICAgbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gcHM7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKFByb3RlY3RCdWZmLklkeCkhPW51bGwmJnBsYXllci5CdWZmQXJyW1Byb3RlY3RCdWZmLklkeF0uVHlwZSA9PSBJdGVtVHlwZS5Qcm90ZWN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuR2V0QnVmZihQcm90ZWN0QnVmZi5JZHgpLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlRyaWdnZXIoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuVGhvcm5dID0gVGhvcm47XHJcbiAgICBcclxuICAgIGNsYXNzIFByb3RlY3QgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlByb3RlY3Qsc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwocHM6TGF5YS5WZWN0b3IzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsID0gbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuU3ByaXRlM0QoKSAvL01lc2hTcHJpdGUzRChuZXcgTGF5YS5Cb3hNZXNoKDAuMSwwLjEsMC4xKSk7XHJcbiAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygtMzAsIDAsIDApLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZihQcm90ZWN0QnVmZi5JZHgpIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLl9BZGRCdWZmVG9QbGF5ZXIocGxheWVyLG5ldyBQcm90ZWN0QnVmZigzMDAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUHJvdGVjdF0gPSBQcm90ZWN0O1xyXG4gICAgXHJcbiAgICBjbGFzcyBQcm90ZWN0QnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBUaW1lOm51bWJlcjtcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6bnVtYmVyID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlByb3RlY3QsUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gQVBQLlNjZW5lTWFuYWdlci5DdXJEaXIuR2FtZVRpbWUrdGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVGltZTxBUFAuU2NlbmVNYW5hZ2VyLkN1ckRpci5HYW1lVGltZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGFzcyBDb2luIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBGbHlUb1BsYXllcihwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNvbmluOkFuaW1Db2luID0gQW5pbU9iai5HZW5BbmltT2JqPEFuaW1Db2luPihBbmltT2JqLkFuaW1Db2luLHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICBjb25pbi5TZXRUYXJnZXQocGxheWVyKTtcclxuICAgICAgICAgICAgQVBQLkdhbWVNYW5hZ2VyLkdhbWVEaXIuQWRkR29sZFVuTG9naWNHb2xkKDEpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLkFkZEdvbGQoMSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2luLHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKHBzOkxheWEuVmVjdG9yMylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4yLDAuMiwwLjIpKTtcclxuICAgICAgICAgICAgbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gcHM7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29pbl0gPSBDb2luO1xyXG4gICAgXHJcbiAgICBjbGFzcyBDb2xsZWN0ZXIgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZihDb2xsZWN0QnVmZi5JZHgpIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgQ29sbGVjdEJ1ZmYoMTAwMDApKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3RvcixzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbChwczpMYXlhLlZlY3RvcjMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IG51bGw7XHJcbiAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVTcGhlcmUoMC4yLDEwLDEwKSk7XHJcbiAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkNvbGxlY3Rvcl0gPSBDb2xsZWN0ZXI7XHJcbiAgICBcclxuICAgIGNsYXNzIENvbGxlY3RCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIEdhbWVEaXI6R2FtZURpcmVjdG9yO1xyXG4gICAgICAgIENvdW50Rmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTpudW1iZXIgPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUHJvdGVjdCxDb2xsZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVEaXIgPSBBUFAuR2FtZU1hbmFnZXIuR2FtZURpcjtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gdGhpcy5HYW1lRGlyLkdhbWVUaW1lK3RpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRGbG9vciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50Rmxvb3IgPSB0aGlzLkdhbWVEaXIuUGxheWVyRmxvb3IgLSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5UaW1lPHRoaXMuR2FtZURpci5HYW1lVGltZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLkdhbWVEaXIuUGxheWVyRmxvb3IgLSB0aGlzLkNvdW50Rmxvb3IrMTwwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpci5Mb29wRG9GbG9vclN0ZXAodGhpcy5Db3VudEZsb29yLHRoaXMsdGhpcy5Db3VudENvaW5zKTtcclxuICAgICAgICAgICAgICAgICsrdGhpcy5Db3VudEZsb29yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgQ291bnRDb2lucyhzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihzdGVwLlN0ZXBJdGVtLkl0ZW1UeXBlID09IEl0ZW1UeXBlLkNvaW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBDb2luOkNvaW4gPSBzdGVwLlN0ZXBJdGVtIGFzIENvaW47XHJcbiAgICAgICAgICAgICAgICBDb2luLkZseVRvUGxheWVyKHRoaXMuUGxheWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xhc3MgRkx5IGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGxheWVyLkdldEJ1ZmYoMCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKG5ldyBGbHlCdWZmKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5GbHksc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwocHM6TGF5YS5WZWN0b3IzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjUsMC41LDAuMSkpO1xyXG4gICAgICAgICAgICBwcy55Kz0gMC4zO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5GbHldID0gRkx5O1xyXG4gICAgXHJcbiAgICBjbGFzcyBGbHlCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFNwZWVkOm51bWJlcjtcclxuICAgICAgICBGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPXRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQVBQLkdhbWVNYW5hZ2VyLlN0ZXBEaXN0YW5jZS8yKnRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCgpKTtcclxuICAgICAgICAgICAgQVBQLkdhbWVNYW5hZ2VyLkdhbWVEaXIuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDpudW1iZXI9MC4xLGZsb29yOm51bWJlcj0xMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUsUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5fRmluYWxaIC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24uej4tMC4yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gQVBQLkdhbWVNYW5hZ2VyLkdhbWVEaXIuR2V0U3RlcEJ5TG9jYXRpb24odGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBBUFAuR2FtZU1hbmFnZXIuR2FtZURpci5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xhc3MgUm9wZSBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKDApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgUm9wZUJ1ZmYoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUsc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbChwczpMYXlhLlZlY3RvcjMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjEsMC41LDAuMSkpXHJcbiAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygzMCwgLTQ1LCAwKSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBtb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24gPSBwcztcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb3BlXSA9IFJvcGU7XHJcbiAgICBcclxuICAgIGNsYXNzIFJvcGVCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFNwZWVkOm51bWJlcjtcclxuICAgICAgICBGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0ZpbmFsWiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLno+LTAuMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5FbmQoc3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgRW5kKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgICAgICAgICBBUFAuR2FtZU1hbmFnZXIuR2FtZURpci5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPXRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQVBQLkdhbWVNYW5hZ2VyLlN0ZXBEaXN0YW5jZS8yKnRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgICAgIEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLlNldFNhZmVQUyh0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjpudW1iZXI7ICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6bnVtYmVyPTAuMSxmbG9vcjpudW1iZXI9MTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb3BlLFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gMDsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpc1JpZ2h0OmJvb2xlYW4pOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZUZsb29yID0gQVBQLkdhbWVNYW5hZ2VyLkdhbWVEaXIuUGxheWVyRmxvb3JMaW5lO1xyXG4gICAgICAgICAgICBpZihjbG9zZUZsb29yLkZsb29yTnVtJTIhPSB0aGlzLl9GaW5hbExvY2F0aW9uLlklMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VGbG9vciA9IEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLkdldEZsb29yQnlGbG9vcihjbG9zZUZsb29yLkZsb29yTnVtICsxICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IGNsb3NlRmxvb3IuR2V0U3RlcCggdGhpcy5fRmluYWxMb2NhdGlvbi5YICk7XHJcbiAgICAgICAgICAgIGlmKGlzUmlnaHQpXHJcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICAgICAgaWYoc3RlcC5TdGVwSXRlbS5Jc0ZvcmJpZGVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkVuZChzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsYXNzIFZpbmUgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY3VyQnVmZjpCYXNlUGxheWVyQnVmZiA9IHBsYXllci5HZXRCdWZmKDApO1xyXG4gICAgICAgICAgICBpZihjdXJCdWZmJiZjdXJCdWZmLlR5cGUgPT0gSXRlbVR5cGUuUHJvdGVjdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyQnVmZi5Db21wbGV0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoY3VyQnVmZilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJCdWZmLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgVmluZUJ1ZmYoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVmluZSxzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbChwczpMYXlhLlZlY3RvcjMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjcsMC43LDAuMSkpXHJcbiAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlZpbmVdID0gVmluZTtcclxuICAgIFxyXG4gICAgY2xhc3MgVmluZUJ1ZmYgZXh0ZW5kcyBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgQ291bnRUaW1lOm51bWJlcjtcclxuICAgICAgICBJbnB1dERpcjpib29sZWFuO1xyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENvbXBsZXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5HYW1lTWFuYWdlci5HYW1lRGlyLlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvdW50VGltZTpudW1iZXIgPSAzLGlucHV0RGlyOmJvb2xlYW4gPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVmluZSwwKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudFRpbWUgPSBjb3VudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSBpbnB1dERpcjtcclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaXNSaWdodDpib29sZWFuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5JbnB1dERpciA9PSBpc1JpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklucHV0RGlyID0hdGhpcy5JbnB1dERpcjtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5Db3VudFRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5Db3VudFRpbWU8MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9TaG93R2FtZUluZm8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGluZm86c3RyaW5nO1xyXG4gICAgICAgICAgICBpZih0aGlzLkNvdW50VGltZTwwKVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLklucHV0RGlyID09IHRydWU/XCJSaWdodFwiOlwiTGVmdFwiO1xyXG4gICAgICAgICAgICBBUFAuR2FtZU1hbmFnZXIuR2FtZURpci5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsImV4cG9ydCBtb2R1bGUgR2FtZVN0cnVjdFxyXG57XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0SW5mbyB7XHJcbiAgICAgICAgQXVkaW9PbjogYm9vbGVhbjtcclxuICAgICAgICBPUElzUmlnaHQ6IGJvb2xlYW47XHJcbiAgICAgICAgVGV4dEluZm86IHN0cmluZztcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5BdWRpb09uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5PUElzUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlRleHRJbmZvID0gXCJIZWxsbyBcXG4gSGVsbG9cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTUxvY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgZ2V0IFgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBYKHg6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzBdID14O1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgWSgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0FyclsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFkoeTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnJbMV0gPSB5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9BcnI6QXJyYXk8bnVtYmVyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggeDpudW1iZXIseTpudW1iZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyID0gW3gseV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IHZhciBJdGVtRGljdFR5cGU6e1tJdGVtVHlwZTpudW1iZXJdOmFueX07XHJcbiAgICBJdGVtRGljdFR5cGUgPSB7IH07XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog6L6T5YWl566h55CG55u45YWzXHJcbiAqL1xyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVEaXJlY3RvclwiXHJcbmV4cG9ydCBtb2R1bGUgSW5wdXRcclxue1xyXG4vL+WfuuehgOi+k+WFpeaOp+WItuWZqFxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVJbnB1dFxyXG57XHJcbiAgICAvL+WFrOaciVxyXG4gICAgTmV4dElucHV0OkJhc2VHYW1lSW5wdXQ7XHJcbiAgICBhYnN0cmFjdCBJbnB1dChpc1JpZ2h0OmJvb2xlYW4pO1xyXG5cclxuICAgIC8v56eB5pyJXHJcbiAgICBjb25zdHJ1Y3RvciggaW5wdXQgOkJhc2VHYW1lSW5wdXQgPSBudWxsIClcclxuICAgIHtcclxuICAgICAgICBpZihpbnB1dCA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLk5leHRJbnB1dCA9IGlucHV0O1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBESVlJbnB1dCBleHRlbmRzIEJhc2VHYW1lSW5wdXRcclxue1xyXG4gICAgSW5wdXQoaXNSaWdodDpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0xpc3RlbmVyKVxyXG4gICAgICAgICAgICB0aGlzLl9MaXN0ZW5lci5jYWxsKHRoaXMuX093bmVyLGlzUmlnaHQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX093bmVyOmFueTtcclxuICAgIHByaXZhdGUgX0xpc3RlbmVyOihpc3Jpbmc6Ym9vbGVhbik9PnZvaWQ7XHJcbiAgICBjb25zdHJ1Y3Rvcihvd25lcjphbnkgPSBudWxsLGxpc3RlbmVyOihpc3Jpbmc6Ym9vbGVhbik9PnZvaWQgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fT3duZXIgPSBvd25lcjtcclxuICAgICAgICB0aGlzLl9MaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBOb3JtR2FtZUlucHV0IGV4dGVuZHMgQmFzZUdhbWVJbnB1dFxyXG57XHJcbiAgICBHYW1lRGlyOkdhbWVEaXJlY3RvcjtcclxuICAgIGNvbnN0cnVjdG9yKCBkaXI6R2FtZURpcmVjdG9yLGlucHV0OkJhc2VHYW1lSW5wdXQgPSBudWxsIClcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpbnB1dCk7XHJcbiAgICAgICAgdGhpcy5HYW1lRGlyID0gZGlyO1xyXG4gICAgfVxyXG4gICAgSW5wdXQoIGlzUmlnaHQ6Ym9vbGVhbiApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HYW1lRGlyLk1vdmVTdGVwKGlzUmlnaHQpO1xyXG4gICAgfVxyXG59XHJcbn1cclxuIiwiaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG50eXBlIFN0ZXBJdGVtID0gSXRlbS5TdGVwSXRlbTtcclxuXHJcbiAvKirkvZzogIU6TW9cclxuICrlnLrmma/lhoXlr7nosaEgXHJcbiAqL1xyXG4vL+euoeeQhuS4gOaVtOihjFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VudExpbmUgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbntcclxuICAgIExpbmVJZHg6bnVtYmVyO1xyXG4gICAgRmxvb3JOdW06bnVtYmVyO1xyXG4gICAgU3RlcExpc3Q6U3RlcFtdO1xyXG4gICAgTG9naWNMZW5ndGg6bnVtYmVyO1xyXG4gICAgU3RlcEl0ZW06U3RlcEl0ZW07XHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+6I635Y+W5pi+56S65Ye65p2l55qE56ys5Yeg5Liq5bmz5Y+wXHJcbiAgICBHZXRTdGVwKGlkeDpudW1iZXIpOlN0ZXBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TdGVwTGlzdFtpZHggKyAxXTtcclxuICAgIH1cclxuICAgIC8v6K6+572u5q+P5bGCXHJcbiAgICBTZXRMaW5lKCBmbG9vcjpudW1iZXIgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB2YXIgbmV3UFMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICB2YXIgc3RlcExlbmd0aCA9IEFQUC5HYW1lTWFuYWdlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgIHZhciBzdGVwRGlzdGFuY2U9IEFQUC5HYW1lTWFuYWdlci5TdGVwRGlzdGFuY2U7XHJcbiAgICAgICAgbmV3UFMueSA9IHN0ZXBMZW5ndGgqZmxvb3I7XHJcbiAgICAgICAgbmV3UFMueiA9IC1zdGVwRGlzdGFuY2UvMiAqZmxvb3I7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgICAgICB2YXIgc3RlcEFycjpTdGVwW10gPSB0aGlzLlN0ZXBMaXN0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBzdGFydFggPSAwIC0gc3RlcEFyci5sZW5ndGgvMiAqIHN0ZXBEaXN0YW5jZTtcclxuICAgICAgICBpZih0aGlzLkp1Z2VJc0xlc3NMaW5lKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGFydFggKz0gc3RlcERpc3RhbmNlLzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgZm9yKCB2YXIgY29sdW1uID0wIDtjb2x1bW48c3RlcEFyci5sZW5ndGg7Kytjb2x1bW4gKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N0ZXA6U3RlcCA9IHN0ZXBBcnJbY29sdW1uXTtcclxuICAgICAgICAgICAgdmFyIHN0ZXBWZWN0b3IgPSBuZXdTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICBzdGVwVmVjdG9yLnggPSBzdGFydFg7XHJcbiAgICAgICAgICAgIG5ld1N0ZXAuUmVzZXRTdGVwKHN0ZXBWZWN0b3IpXHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBzdGVwRGlzdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ZXBBcnJbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc3RlcEFycltzdGVwQXJyLmxlbmd0aCAtMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYoICEgdGhpcy5KdWdlSXNMZXNzTGluZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IHN0ZXBBcnIubGVuZ3RoLTI7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXBBcnJbc3RlcEFyci5sZW5ndGggLTJdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkxvZ2ljTGVuZ3RoID0gc3RlcEFyci5sZW5ndGggLTM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+WIpOaWreaYr+WQpuaUtue8qeeahOmCo+WxglxyXG4gICAgSnVnZUlzTGVzc0xpbmUoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRmxvb3JOdW0lMiAhPSAwO1xyXG4gICAgfVxyXG4gICAgLy/lsIbmr4/kuKroioLngrnpk77mjqXliLDkuIvkuIDlsYJcclxuICAgIFNldE5leHRGbG9vciggbGFzdEZsb29yOk1vdW50TGluZSk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5pyJ5Lik5aS056uv54K5XHJcbiAgICAgICAgdmFyIGhhdmVQb2ludCA9IGxhc3RGbG9vci5Mb2dpY0xlbmd0aCA+dGhpcy5Mb2dpY0xlbmd0aFxyXG4gICAgICAgIGZvciggdmFyIHN0YXJ0SWR4Om51bWJlciA9IDA7c3RhcnRJZHg8IHRoaXMuTG9naWNMZW5ndGg7KytzdGFydElkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0UGFyZW50OlN0ZXAgPW51bGw7XHJcbiAgICAgICAgICAgIHZhciByaWdodFBhcmVudDpTdGVwID1udWxsO1xyXG4gICAgICAgICAgICBpZihoYXZlUG9pbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxlZnRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgICAgICByaWdodFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4KzEpO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgtMSk7XHJcbiAgICAgICAgICAgICAgICByaWdodFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGhpU3RlcCA9IHRoaXMuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgIHRoaVN0ZXAuTGVmdFBhcmVudCA9IGxlZnRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGxlZnRQYXJlbnQuUmlnaHRDaGlsZCA9IHRoaVN0ZXA7XHJcblxyXG4gICAgICAgICAgICB0aGlTdGVwLlJpZ2h0UGFyZW50ID0gcmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgICAgIHJpZ2h0UGFyZW50LkxlZnRDaGlsZCA9IHRoaVN0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/mlbLnoo7kuIDlsYJcclxuICAgIEJyZWFrKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihsaW5lSWR4Om51bWJlcixmbG9vcjpudW1iZXIgPSAwKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjb2x1bW5zOm51bWJlciA9IEFQUC5HYW1lTWFuYWdlci5MaW5lU3RlcE51bTtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuTGluZUlkeCA9IGxpbmVJZHg7XHJcbiAgICAgICAgdGhpcy5GbG9vck51bSA9IGZsb29yO1xyXG4gICAgICAgIHRoaXMuU3RlcExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLkxvZ2ljTGVuZ3RoID0gMDtcclxuICAgICAgICBmb3IoIHZhciBTdGFydElkeDpudW1iZXIgPSAoY29sdW1ucyAtMSk7U3RhcnRJZHg+PTA7LS1TdGFydElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3U3RlcDpTdGVwID0gbmV3IFN0ZXAodGhpcyxTdGFydElkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3U3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcExpc3RbU3RhcnRJZHhdID0gbmV3U3RlcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7UGxheWVyQ29udHJvbGVyfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQge1BsYXllckJ1ZmZ9IGZyb20gXCIuL0J1ZmZcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxudmFyIG51bTpudW1iZXIgPSAwO1xyXG50eXBlIEJhc2VQbGF5ZXJCdWZmID0gUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZjtcclxuLy/or6XohJrmnKznlKjkuo7muLjmiI/njqnlrrblr7nosaHnrqHnkIZcclxuLy/njqnlrrblr7nosaFcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG57XHJcbiAgICBzZXQgQ3VyU3RlcChzdGVwOlN0ZXApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ3VyU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyU3RlcCgpOlN0ZXBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU3RlcDtcclxuICAgIH1cclxuICAgIEJhc2VDdHJsZXI6UGxheWVyQ29udHJvbGVyLlBsYXllck5vcm1DdHJsZXI7XHJcbiAgICBCdWZmQXJyOkFycmF5PFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmY+O1xyXG4gICAgLy96ZXJnXHJcbiAgICBJZE51bWJlcjpudW1iZXI7XHJcbiAgICBHZXRCdWZmKGlkeDpudW1iZXIpOlBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuQnVmZkFycltpZHhdICE9bnVsbCYmdGhpcy5CdWZmQXJyW2lkeF0hPXVuZGVmaW5lZCk/dGhpcy5CdWZmQXJyW2lkeF06bnVsbDtcclxuICAgIH1cclxuICAgIC8v5pGG5pS+6KeS6ImyXHJcbiAgICBTZXRTdGVwKHB1dFN0ZXA6U3RlcCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IHB1dFN0ZXA7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gcHV0U3RlcC5Qb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIG5ld1BTLnkgKz0gQVBQLkdhbWVNYW5hZ2VyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBwdXRTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuVG91Y2hHcm91bmQoKTtcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3UFM6TGF5YS5WZWN0b3IzID0gbmV3UFMuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9naWNQb3NpdGlvbigpOkxheWEuVmVjdG9yM1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5biD5bGA5b2T5YmN5bGC5L2G5LiN56e75YqoXHJcbiAgICAgKiBAcGFyYW0ge1N0ZXB9IHN0ZXAg5LiL5LiA5q2l5Y+w6Zi2XHJcbiAgICAgKi9cclxuICAgIExheVN0ZXAoc3RlcDpTdGVwKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gc3RlcDtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gc3RlcC5Qb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+inpuWPkeWPsOmYtlxyXG4gICAgVG91Y2hHcm91bmQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/ouKnnqbrmmK/ml6Doja/lj6/mlZHnmoRcclxuICAgICAgICBpZih0aGlzLkN1clN0ZXAuSXNFbXB0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5UcmlnZ2VyKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5Ub3VjaEl0ZW0odGhpcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog56e75YqoXHJcbiAgICAgKiBAcGFyYW0ge0xheWEuVmVjdG9yM30gdmVjdG9yIOenu+WKqOWQkemHj+WAvFxyXG4gICAgICovXHJcbiAgICBUcmFuc2xhdGUoIHZlY3RvcjpMYXlhLlZlY3RvcjMgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0udHJhbnNsYXRlKHZlY3Rvcik7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZCh0aGlzLl9Mb2dpY1Bvc2l0aW9uLHZlY3Rvcix0aGlzLl9Mb2dpY1Bvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOeOqeWutuaOp+WItuWZqFxyXG4gICAgICogQHBhcmFtIG5ld0N0cmxlciDmlrDnjqnlrrbmjqfliLblmahcclxuICAgICAqL1xyXG4gICAgQWRkQ3RybGVyKG5ld0N0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlciApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgY3RybGVyOlBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyID0gdGhpcy5fQ3RybGVyO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IG5ld0N0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuTmV4dEN0cmwgPWN0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuU2V0UGxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75Lqk5o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIFBvcEN0cmxlcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLl9DdHJsZXIuTmV4dEN0cmw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoEJVRkZcclxuICAgICAqIEBwYXJhbSBidWZmIFxyXG4gICAgICogQHBhcmFtIGluZGV4IFxyXG4gICAgICovXHJcbiAgICBBZGRCdWZmKGJ1ZmY6UGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZik6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHZhciBpbmRleDpudW1iZXIgPSBidWZmLklkeDtcclxuICAgICAgICBpZih0aGlzLkJ1ZmZBcnJbaW5kZXhdIT1udWxsfHx0aGlzLkJ1ZmZBcnJbaW5kZXhdIT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQnVmZkFycltpbmRleF0gPSBidWZmO1xyXG4gICAgICAgIGJ1ZmYuSWR4ID0gaW5kZXg7XHJcbiAgICAgICAgYnVmZi5TdGFydCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5re75YqgQlVGRuaooeWei1xyXG4gICAgICogQHBhcmFtIG1vZCBcclxuICAgICAqL1xyXG4gICAgQWRkQnVmZk1vZGUoIG1vZDpMYXlhLlNwcml0ZTNEIClcclxuICAgIHtcclxuICAgICAgICBpZihtb2QhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTm9kZS5hZGRDaGlsZChtb2QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog57uT5p2fQlVGRlxyXG4gICAgICovXHJcbiAgICBDb21wbGV0ZUJ1ZmYoaW5kZXg6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBidWZmOkJhc2VQbGF5ZXJCdWZmID0gdGhpcy5CdWZmQXJyW2luZGV4XTtcclxuICAgICAgICB0aGlzLkJ1ZmZBcnJbaW5kZXhdPW51bGw7XHJcbiAgICAgICAgaWYoYnVmZj09bnVsbHx8YnVmZj09dW5kZWZpbmVkIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+engeacieWxnuaAp1xyXG4gICAgX0xvZ2ljUG9zaXRpb246TGF5YS5WZWN0b3IzO1xyXG4gICAgX0J1ZmZOb2RlOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBfUGxheWVyTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIF9DdXJTdGVwOlN0ZXA7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9QbGF5ZXJNb2RlbCA9IExheWEuTG9hZGVyLmdldFJlcyhwYXRoLkdldExIKFwiY2hpbGRfMDFcIikpO1xyXG4gICAgICAgIHZhciBzZWNvbmRQbGF5ZXI6TGF5YS5TcHJpdGUzRCA9IExheWEuU3ByaXRlM0QuaW5zdGFudGlhdGUodGhpcy5fUGxheWVyTW9kZWwsIHRoaXMsIGZhbHNlLCBuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDApKTtcclxuICAgICAgICBBUFAuR2FtZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMpO1xyXG4gICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbiAgICAgICAgc2Vjb25kUGxheWVyLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygwLCAxODAsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMub24oTGF5YS5FdmVudC5SRU1PVkVELHRoaXMsKCk9PnsgdGhpcy5kZXN0cm95KCkgfSlcclxuICAgICAgICB0aGlzLlJlc2V0KCk7XHJcbiAgICB9XHJcbiAgICBSZXNldCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gbnVsbDtcclxuICAgICAgICBpZih0aGlzLl9CdWZmTm9kZSlcclxuICAgICAgICAgICAgdGhpcy5fQnVmZk5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX0J1ZmZOb2RlID0gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX0J1ZmZOb2RlKTtcclxuICAgICAgICB0aGlzLkJ1ZmZBcnIgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLkJhc2VDdHJsZXIgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllck5vcm1DdHJsZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyID0gdGhpcy5CYXNlQ3RybGVyO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKDAsMCk7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX1VwZGF0ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9DdHJsZXI6UGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXI7XHJcblxyXG4gICAgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdHJsZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgZm9yKCB2YXIgYnVmZklkeDpudW1iZXIgPSAwO2J1ZmZJZHg8MjsrK2J1ZmZJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5CdWZmQXJyW2J1ZmZJZHhdIT1udWxsfHx0aGlzLkJ1ZmZBcnJbYnVmZklkeF0hPXVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMuQnVmZkFycltidWZmSWR4XS5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIjtcclxuXHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyQ29udHJvbGVyXHJcbntcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGxheWVyQ3RybGVyXHJcbiAgICB7XHJcbiAgICAgICAgLy/lhazlhbHmjqXlj6NcclxuICAgICAgICBOZXh0Q3RybDpCYXNlUGxheWVyQ3RybGVyO1xyXG4gICAgICAgIHBsYXllcjpQbGF5ZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgVXBkYXRlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNldFBsYXllcihwbGF5ZXI6UGxheWVyKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvciggcGxheWVyOlBsYXllciwgY3RybGVyOkJhc2VQbGF5ZXJDdHJsZXIgPSBudWxsIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGN0cmxlciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdHJsZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTmV4dEN0cmwgPSBjdHJsZXI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX1VwZGF0ZSgpOnZvaWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v55So5LqO6KeS6Imy5q2j5bi454q25oCB5LiL55qE56e75YqoXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTm9ybUN0cmxlciBleHRlbmRzIEJhc2VQbGF5ZXJDdHJsZXJcclxuICAgIHtcclxuICAgICAgICBUaW1lOm51bWJlcjtcclxuICAgICAgICBTdGFydE1vdmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuR2FtZVRpbWUgKyBBUFAuR2FtZU1hbmFnZXIuUGxheWVyTW92ZVRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHBsYXllcjpQbGF5ZXIgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5UaW1lPD1BUFAuR2FtZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLkdhbWVUaW1lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGltZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlNldFN0ZXAodGhpcy5wbGF5ZXIuQ3VyU3RlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VGltZSA9IHRoaXMuVGltZS1MYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmF0ZSA9ICgxLWxhc3RUaW1lLyBBUFAuR2FtZU1hbmFnZXIuUGxheWVyTW92ZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBTdGVwUHM6TGF5YS5WZWN0b3IzID0gdGhpcy5wbGF5ZXIuQ3VyU3RlcC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBTdGVwUHMueSArPUFQUC5HYW1lTWFuYWdlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJwczpMYXlhLlZlY3RvcjMgPSB0aGlzLnBsYXllci5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBjdXJwcy55ICs9QVBQLkdhbWVNYW5hZ2VyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1BzLnggPSAoU3RlcFBzLnggLSBjdXJwcy54KSpyYXRlKyBjdXJwcy54O1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1BzLnkgPSAoU3RlcFBzLnkgLSBjdXJwcy55KSpyYXRlK2N1cnBzLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHMueiA9IChTdGVwUHMueiAtIGN1cnBzLnopKnJhdGUrY3VycHMuejtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlBvc2l0aW9uID0gbmV3UHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlRvdWNoR3JvdW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v546p5a626aOe6KGMXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyRmx5IGV4dGVuZHMgQmFzZVBsYXllckN0cmxlclxyXG4gICAge1xyXG4gICAgICAgIFNwZWVkOm51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7njqnlrrZcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIOaTjeaOp+inkuiJslxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNldFBsYXllcihwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU2V0UGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9cclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjpudW1iZXI7ICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLnBsYXllciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZlY3RvciA9IG5ldyBMYXlhLlZlY3RvcjMoMCxBUFAuR2FtZU1hbmFnZXIuU3RlcExlbmd0aCxBUFAuR2FtZU1hbmFnZXIuU3RlcERpc3RhbmNlLzIpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUodmVjdG9yLHRoaXMuU3BlZWQsdmVjdG9yKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuVHJhbnNsYXRlKHZlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuL01vdW50TGluZVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxudHlwZSBTdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW07XHJcbnR5cGUgTUxvY2F0aW9uID0gR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbi8v5q2lXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXAgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbntcclxuICAgIC8v5qih5Z6L5Liq5pWwXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0ZXBNb2RlbE51bTpudW1iZXIgPSAzO1xyXG5cclxuICAgIExlZnRQYXJlbnQ6U3RlcDtcclxuICAgIFJpZ2h0UGFyZW50OlN0ZXA7XHJcbiAgICBMZWZ0Q2hpbGQ6U3RlcDtcclxuICAgIFJpZ2h0Q2hpbGQ6U3RlcDtcclxuICAgIFN0ZXBJdGVtOlN0ZXBJdGVtO1xyXG4gICAgUm9hZE51bTpudW1iZXI7XHJcbiAgICBNYXJrOmFueTtcclxuICAgIEZsb29yOk1vdW50TGluZTtcclxuICAgIElkeDpudW1iZXI7XHJcbiAgICBcclxuICAgIC8v5YWs5pyJ5o6l5Y+jXHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2NhdGlvbigpOk1Mb2NhdGlvblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24odGhpcy5JZHgtMSx0aGlzLkZsb29yLkZsb29yTnVtKTtcclxuICAgIH1cclxuICAgIGdldCBJc0RlYWRSb2FkKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Jc0RlYWRSb2FkfHwhdGhpcy5hY3RpdmV8fCB0aGlzLlN0ZXBJdGVtLklzRGlmZmljdWx0eTtcclxuICAgIH1cclxuICAgIHNldCBJc0RlYWRSb2FkKHZhbHVlOmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRm9yYmlkZW4oKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU3RlcEl0ZW0uSXNGb3JiaWRlbjtcclxuICAgIH1cclxuICAgIGdldCBJc0VtcHR5KCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAhKHRoaXMuYWN0aXZlJiZ0aGlzLkZsb29yLmFjdGl2ZSk7XHJcbiAgICB9XHJcbiAgICBQdXRJdGVtKCBpdGVtRW51bWU6SXRlbS5JdGVtVHlwZSApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaXRlbUVudW1lID09IEl0ZW0uSXRlbVR5cGUuRW1wdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9ZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlB1dEl0ZW0oaXRlbUVudW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBSZXNldFN0ZXAobmV3UHM6TGF5YS5WZWN0b3IzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUG9zaXRpb24gPSBuZXdQcztcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIG1vZGVsUHMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlB1dEl0ZW0oSXRlbS5JdGVtVHlwZS5Ob25lKTtcclxuXHJcbiAgICAgICAgdGhpcy5MZWZ0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxlZnRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb2FkTnVtID0gMDtcclxuICAgIH1cclxuICAgIF9TdGVwTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIGNvbnN0cnVjdG9yKGZsb29yOk1vdW50TGluZSxpZHg6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIC8vc3VwZXIobmV3IExheWEuQm94TWVzaCgxLDEsMSkgKTtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIEFQUC5HYW1lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcyk7XHJcbiAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSsgTWF0aC5yYW5kb20oKSpTdGVwLnN0ZXBNb2RlbE51bSk7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBcIkxheWFTY2VuZV9MMFwiK0lkeCArIFwiX3Nwcl9wbGF0XzBcIitJZHg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0TEgobmFtZSkpO1xyXG4gICAgICAgIHZhciBjbG9uZU1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGNsb25lTW9kZWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtRmFjdG9yeShJdGVtLkl0ZW1UeXBlLk5vbmUsdGhpcyk7O1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgIHRoaXMuSWR4ID0gaWR4O1xyXG5cclxuICAgICAgICB0aGlzLkxlZnRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0Q2hpbGQgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb2FkTnVtID0gMDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX0lzRGVhZFJvYWQ6Ym9vbGVhbjtcclxuXHJcbn0iLCIvKipcclxuICog5L2c6ICFOk1vXHJcbiAqIOWQr+WKqOWcuuaZr1xyXG4gKi9cclxuXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBMb2FkU2NlbmUgZnJvbSBcIi4vU2NlbmUvTG9hZFNjZW5lXCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi9jb250cm9sZXIvQVBQXCJcclxuY2xhc3MgR2FtZVxyXG57XHJcblx0X0ZyYW1lOkZyYW1lV29yaztcclxuICAgIC8vU2NlbmVNZ3I6U2NlbmVNYW5hZ2VyO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzcyA9IEFQUDtcclxuICAgICAgICBcclxuICAgICAgICBMYXlhM0QuaW5pdCgwLCAwKTtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRlVMTDtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBMYXlhLlN0YWdlLlNDUkVFTl9WRVJUSUNBTDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IExheWEuU3RhZ2UuQUxJR05fQk9UVE9NO1xyXG4gICAgICAgIC8v5byA5ZCv57uf6K6h5L+h5oGvXHJcblx0XHRMYXlhLlN0YXQuc2hvdygpO1xyXG5cdFx0XHJcblx0XHR0aGlzLl9GcmFtZSA9IEZyYW1lV29yay5GTTtcclxuICAgICAgICB0aGlzLl9GcmFtZS5BZGRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLl9GcmFtZS5BZGRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcblx0XHR2YXIgc2NlbmVNZ3I6U2NlbmVNYW5hZ2VyID0gdGhpcy5fRnJhbWUuQWRkTWFuYWdlcjxTY2VuZU1hbmFnZXI+KFNjZW5lTWFuYWdlcik7XHJcblx0XHRzY2VuZU1nci5FbnRlclNjZW5lKG5ldyBMb2FkU2NlbmUoKSk7XHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuVXBkYXRlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHRcclxuICAgIFVwZGF0ZSggKVxyXG4gICAge1xyXG5cdFx0Ly90aGlzLlNjZW5lTWdyLlVwZGF0ZSgpO1xyXG5cdFx0dGhpcy5fRnJhbWUuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxudmFyIEdNID0gbmV3IEdhbWUoKTtcclxuLyovKlxyXG5pbXBvcnQgVGVzdEJhc2UgZnJvbSBcIi4vWFRlc3QvVGVzdEJhc2VcIlxyXG5pbXBvcnQgUmlnaHRDaGlsZCBmcm9tIFwiLi9YVGVzdC9SaWdodENoaWxkXCJcclxuaW1wb3J0IExlZnRDaGlsZCBmcm9tIFwiLi9YVGVzdC9MZWZ0Q2hpbGRcIlxyXG5cclxuY2xhc3MgR2FtZVxyXG57XHJcbiAgICAvL1NjZW5lTWdyOlNjZW5lTWFuYWdlcjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB2YXIgbGVmdENoaWxkOkxlZnRDaGlsZCA9IG5ldyBMZWZ0Q2hpbGQoKTtcclxuICAgICAgICB2YXIgcmlnaHRDaGlsZDpSaWdodENoaWxkID0gbmV3IFJpZ2h0Q2hpbGQoKTtcclxuICAgICAgICByaWdodENoaWxkLkRlYnVnKCk7XHJcbiAgICB9XHJcbn0qLyIsImltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IExpZmVPYmogZnJvbSBcIi4vLi4vQmFzZS9MaWZlT2JqXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZURpcmVjdG9yIGV4dGVuZHMgTGlmZU9ialxyXG57XHJcbiAgICBcclxuICAgIF9MZWF2ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvLy9BUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmdpc3RJREsoTWVzc2FnZU1ELkdhbWVFdmVudC5HYW1lVGltZVVwKTtcclxuICAgICAgICAvL0FQUC5NZXNzYWdlTWFuYWdlci5EZXNSZ2lzdElESyhNZXNzYWdlTUQuR2FtZUV2ZW50LkdhbWVDb250aW51ZSk7XHJcbiAgICAgICAgLy92YXIgYXBwID0gQVBQO1xyXG4gICAgICAgIHN1cGVyLl9MZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIFRpbWVVcCgpOnZvaWRcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIENvbnRpbnVlVGltZSgpOnZvaWRcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgQ3VyR2FtZVRpbWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RhcnRHYW1lVGltZSArIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+engeacieWxnuaAp+WSjOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBfU3RhcnRHYW1lVGltZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9UaW1lVXBDb3VudDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9UaW1lVXBDbG9jazpudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX1VJTWdyOlVJTWFuYWdlcjtcclxuICAgIHByb3RlY3RlZCBfTWVzc2FnZU1ncjpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9TdGFydENvbXBsZXRlKClcclxuICAgIHtcclxuICAgIH1cclxuICAgIFNjZW5lTWdyOlNjZW5lTWFuYWdlcjtcclxuXHJcbiAgICBzZXQgR2FtZVRpbWUodmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgfVxyXG4gICAgLy/lpJbpg6jmjqXlj6NcclxuICAgIFN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9TdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBhYnN0cmFjdCBSZVN0YXJ0KCk6dm9pZDtcclxufVxyXG4vKlxyXG5cclxuLy/lr7zmvJTln7rnsbtcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZURpcmVjdG9yIGV4dGVuZHMgTGlmZU9ialxyXG57XHJcbiAgICBcclxuICAgIF9MZWF2ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBBUFAuTWVzc2FnZUNlbnRlci5EZXNSZ2lzdElESyhHYW1lRXZlbnQuR2FtZVRpbWVVcCk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VDZW50ZXIuRGVzUmdpc3RJREsoR2FtZUV2ZW50LkdhbWVDb250aW51ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuX0xlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVGltZVVwKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX1RpbWVVcENsb2NrPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lVGltZVVwKTtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9UaW1lVXBDbG9jazw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBDb250aW51ZVRpbWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lQ29udGludWUpO1xyXG4gICAgICAgIHRoaXMuX1RpbWVVcENvdW50ICs9IExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5fVGltZVVwQ2xvY2s7XHJcbiAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgQ3VyR2FtZVRpbWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RhcnRHYW1lVGltZSArIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+engeacieWxnuaAp+WSjOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBfU3RhcnRHYW1lVGltZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9UaW1lVXBDb3VudDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9UaW1lVXBDbG9jazpudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX1VJTWdyOlVJTWFuYWdlcjtcclxuICAgIHByb3RlY3RlZCBfTWVzc2FnZU1ncjpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgIHRoaXMuX1VJTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5TY2VuZU1nciA9IEFQUC5TY2VuZU1hbmFnZXI7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0Q29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgIHRoaXMuX1VJTWdyLkNsZWFyKCk7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgIH1cclxuICAgIFNjZW5lTWdyOlNjZW5lTWFuYWdlcjtcclxuXHJcbiAgICBnZXQgR2FtZVRpbWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9UaW1lVXBDbG9jaz4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1RpbWVVcENsb2NrLSB0aGlzLl9TdGFydEdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBMYXlhLnRpbWVyLmN1cnJUaW1lci0gdGhpcy5fU3RhcnRHYW1lVGltZSAtIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldCBHYW1lVGltZSh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy/lpJbpg6jmjqXlj6NcclxuICAgIFN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICBzdXBlci5fU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhYnN0cmFjdCBSZVN0YXJ0KCk6dm9pZDtcclxufSovIiwiaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBMaWZlT2JqIGZyb20gXCIuLy4uL0Jhc2UvTGlmZU9ialwiXHJcbmltcG9ydCB7RW51bX0gZnJvbSBcIi4vLi4vQmFzZS9MaWZlT2JqXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuLy/lnLrmma/ln7rnsbtcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZVNjZW5lIGV4dGVuZHMgTGlmZU9ialxyXG57XHJcbiAgICAvL+WklumDqOaOpeWPo1xyXG4gICAgU2NlbmVNZ3I6U2NlbmVNYW5hZ2VyO1xyXG4gICAgQ3VyRGlyOkJhc2VEaXJlY3RvcjtcclxuICAgIElzTG9hZENvbXBsZXRlOmJvb2xlYW47XHJcbiAgICBTY2VuZTpMYXlhLlNjZW5lO1xyXG4gICAgSXNMb2FkaW5nOmJvb2xlYW47XHJcblxyXG4gICAgLy/nu5PmnZ/lnLrmma9cclxuICAgIExlYXZlKG5leHRTdGFnZTpCYXNlU2NlbmUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9OZXh0U2NlbmUgPSBuZXh0U3RhZ2U7XHJcbiAgICAgICAgbmV4dFN0YWdlLlN0YXJ0TG9hZCgpO1xyXG4gICAgICAgIHRoaXMuX0xlYXZlKCk7XHJcbiAgICB9XHJcbiAgICBTdGFydExvYWQoICkvLzsvL0NhbGxCYWNrOigpPT52b2lkKTsvLylDYWxsQmFjaygpOnZvaWQ9Pik7XHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Jc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+W8gOWni+WcuuaZr1xyXG4gICAgU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuSXNMb2FkQ29tcGxldGUgJiYgIXRoaXMuSXNMb2FkaW5nKVxyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0TG9hZCgpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnQoKTtcclxuXHJcbiAgICAgICBpZih0aGlzLklzTG9hZGluZyAmJiB0aGlzLl9Mb2FkQ2FsbEJhY2sgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xvYWRDYWxsQmFjayA9IHRoaXMuX1N0YXJ0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5pS+5a+56LGhXHJcbiAgICBQdXRPYmoobm9kZTpMYXlhLlNwcml0ZTNEICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgICB0aGlzLlNjZW5lLmFkZENoaWxkKG5vZGUpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIHByb3RlY3RlZCBfTmV4dFNjZW5lOkJhc2VTY2VuZTsvL+S4i+S4gOS4quWcuuaZr1xyXG4gICAgcHJvdGVjdGVkIF9Mb2FkQ2FsbEJhY2s6KCk9PnZvaWQ7XHJcbiAgICBwcm90ZWN0ZWQgX1VJTWFuYWdlcjpVSU1hbmFnZXI7XHJcbiAgICBwcm90ZWN0ZWQgX01lc3NhZ2VNZ3I6TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuU2NlbmVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFNjZW5lTWFuYWdlcj4oU2NlbmVNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLklzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuSXNMb2FkQ29tcGxldGUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuQ3VyRGlyID0gbnVsbDtcclxuICAgICAgICB0aGlzLlNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLl9NZXNzYWdlTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIHRoaXMuX0xvYWRDYWxsQmFjayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fTmV4dFNjZW5lID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX0xlYXZpbmcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlci5DbGVhcigpO1xyXG5cclxuICAgICAgICBpZih0aGlzLkN1ckRpci5PYmpTdGF0ZSA9PSBFbnVtLkxpZmVPYmpTdGF0ZS5FbmRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLl9MZWF2ZWluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX0xlYXZlQ29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLl9MZWF2ZUNvbXBsZXRlKCk7XHJcbiAgICAgICAgaWYodGhpcy5TY2VuZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2NlbmUucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLlNjZW5lLm51bUNoaWxkcmVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0b3IgPSB0aGlzLlNjZW5lLmdldENoaWxkQXQoMCk7XHJcbiAgICAgICAgICAgICAgICBhY3Rvci5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUlNYW5hZ2VyLkNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5TY2VuZU1nci5DdXJTY2VuZSA9IHRoaXMuX05leHRTY2VuZTtcclxuICAgICAgICAvL3plcmcg5Zy65pmv5LiN55+l6YGT5Lya5LiN5Lya5YaF5a2Y5rOE5ryPXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9VcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCB0aGlzLkN1ckRpciE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyRGlyLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfR2VuRGlyKCk6dm9pZDtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9Mb2FkQ29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgdGhpcy5Jc0xvYWRDb21wbGV0ZSA9IHRydWU7XHJcbiAgICAgICB0aGlzLklzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuX0xvYWRDYWxsQmFjayE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xvYWRDYWxsQmFjaygpO1xyXG4gICAgICAgICAgICB0aGlzLl9Mb2FkQ2FsbEJhY2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNjZW5lTWdyLlNjZW5lQ3RybGVyLmFkZENoaWxkKHRoaXMuU2NlbmUpO1xyXG4gICAgICAgIHN1cGVyLl9TdGFydCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9TdGFydGluZygpXHJcbiAgICB7XHJcbiAgICAgICAgLy/otYTmupDpg73msqHkuIvlrozlsLHkuI3opoHotbDlhbblroPpgLvovpHkuoZcclxuICAgICAgICBpZih0aGlzLklzTG9hZGluZyYmIHRoaXMuSXNMb2FkQ29tcGxldGUgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTG9hZENvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc3VwZXIuX1N0YXJ0aW5nKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0Q29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlci5DbGVhcigpO1xyXG5cclxuICAgICAgICB0aGlzLl9HZW5EaXIoKTtcclxuICAgICAgICBzdXBlci5fU3RhcnRDb21wbGV0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW50ZXJHYW1lVUlcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7SW5wdXR9IGZyb20gXCIuLy4uL0dhbWUvSW5wdXRcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4vLi4vdWkvR2FtZVVJXCJcclxuaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi8uLi9HYW1lL01vdW50TGluZVwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbnR5cGUgSXRlbUxheW91dCA9IEl0ZW0uSXRlbUxheW91dDtcclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuXHJcbi8v5ri45oiP5a+85ryUXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVEaXJlY3RvciBleHRlbmRzIEJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBDYW1lcmE6R2FtZUNhbWVyYTtcclxuICAgIEdhbWVTY2VuZTpCYXNlU2NlbmU7XHJcbiAgICBNb3VudExpbmVzOk1vdW50TGluZVtdO1xyXG4gICAgUGxheWVyOlBsYXllcjtcclxuICAgIElucHV0Q3RybDpJbnB1dC5CYXNlR2FtZUlucHV0O1xyXG4gICAgSXRlbUxheW91dDpJdGVtTGF5b3V0O1xyXG4gICAgQ3VyTGluZVJld2FyZHM6QXJyYXk8TGluZUl0ZW1JbmZvPjtcclxuICAgIEN1ckxpbmVCYXJyaWVyczpBcnJheTxMaW5lSXRlbUluZm8+O1xyXG4gICAgbmFtZTpudW1iZXI7XHJcbiAgICBnZXQgU2FmZUxvY2F0aW9uKCk6R2FtZVN0cnVjdC5NTG9jYXRpb25cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU2FmZUxvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2FmZUxvY2F0aW9uOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgQWRkSW5wdXRDdHJsZXIodmFsdWU6SW5wdXQuQmFzZUdhbWVJbnB1dClcclxuICAgIHtcclxuICAgICAgICB2YWx1ZS5OZXh0SW5wdXQgPSB0aGlzLklucHV0Q3RybDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgUG9wSW5wdXRDdHJsZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdGhpcy5JbnB1dEN0cmwuTmV4dElucHV0O1xyXG4gICAgfVxyXG4gICAgQWRkR29sZChudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0dvbGROdW0gKz0gbnVtO1xyXG4gICAgICAgIHRoaXMuQWRkTG9naWNHb2xkKG51bSk7XHJcbiAgICB9XHJcbiAgICBBZGRHb2xkVW5Mb2dpY0dvbGQobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtICs9IG51bTtcclxuICAgIH1cclxuICAgIEFkZExvZ2ljR29sZChudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5BZGRHb2xkKG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7lronlhajkvY3nva5cclxuICAgIFNldFNhZmVQUyhsb2NhdGlvbjpHYW1lU3RydWN0Lk1Mb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICBpZihsb2NhdGlvbi5ZPHRoaXMuVGFpbEZMb29yLkZsb29yTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9TYWZlTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICBpZihsb2NhdGlvbi5ZPD10aGlzLkhlYWRGbG9vci5GbG9vck51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmbG9vck51bSA9IGxvY2F0aW9uLllcclxuICAgICAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7aW5kZXg8MjsrK2luZGV4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkxvb3BEb0Zsb29yU3RlcChmbG9vck51bStpbmRleCx0aGlzLHRoaXMuQ2xlYXJGbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvL+a4heeQhuWxgueahOi0n+mdoumBk+WFt1xyXG4gICAgQ2xlYXJGbG9vcihzdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgc3RlcEl0ZW0gPSBzdGVwLlN0ZXBJdGVtO1xyXG4gICAgICAgIGlmKHN0ZXBJdGVtLklzRGlmZmljdWx0eXx8c3RlcEl0ZW0uSXRlbVR5cGUgPT0gSXRlbVR5cGUuVmluZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXAuUHV0SXRlbShJdGVtVHlwZS5FbXB0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IFBhbmVsVUkoKTpHYW1lVUlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fUGFuZWxVSTtcclxuICAgIH1cclxuICAgIHNldCBQYW5lbFVJKHZhbHVlOkdhbWVVSSlcclxuICAgIHtcclxuICAgICAgICB2YWx1ZS5TZXRMZWZ0VG91Y2godGhpcywoKT0+e3RoaXMuSW5wdXRDdHJsLklucHV0KGZhbHNlKTt9KVxyXG4gICAgICAgIHZhbHVlLlNldFJpZ2h0VG91Y2godGhpcywoKT0+e3RoaXMuSW5wdXRDdHJsLklucHV0KHRydWUpO30pOyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fUGFuZWxVSSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgSGVhZEZsb29yKCk6TW91bnRMaW5lXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTW91bnRMaW5lc1t0aGlzLl9IZWFkRmxvb3JJZHhdO1xyXG4gICAgfVxyXG4gICAgZ2V0IFRhaWxGTG9vcigpOk1vdW50TGluZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbdGhpcy5fVGFpbEZMb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBQbGF5ZXJEaXN0YW5jZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicygodGhpcy5QbGF5ZXIuUG9zaXRpb24ueiAtIHRoaXMuX1N0YXJ0UG9zaXRpb24ueikvKEFQUC5HYW1lTWFuYWdlci5TdGVwRGlzdGFuY2UvMikpO1xyXG4gICAgfVxyXG5cclxuICAgIERlYXRoKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciB1aTpFbmRHYW1lVUkgPSB0aGlzLl9VSU1nci5TaG93PEVuZEdhbWVVST4oRW5kR2FtZVVJKTtcclxuICAgICAgICAvL3VpLlNldEdhbWVJbmZvKHRoaXMuUGxheWVyRGlzdGFuY2UsdGhpcy5fR29sZE51bSk7XHJcbiAgICAgICAgdGhpcy5UaW1lVXAoKTtcclxuICAgIH1cclxuICAgIC8v5a+55aSW5o6l5Y+jXHJcbiAgICBTdGFydCggKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU3RhcnQoKTtcclxuICAgIH1cclxuICAgIC8v6YeN5paw5byA5aeLXHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgIH1cclxuICAgIFNob3dJbnB1dEluZm8oaW5mbzpzdHJpbmcpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuU2hvd0lucHV0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuICAgIC8v5bem5Y+z56e75YqoXHJcbiAgICBNb3ZlU3RlcCggaXNSaWdodDpib29sZWFuIClcclxuICAgIHtcclxuICAgICAgICAvL+enu+WKqOS4reS4jeiuqei+k+WFpVxyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuVGltZT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3ZhciBidWZmID0gdGhpcy5CdWZmZXI7XHJcbiAgICAgICAgLy/ojrflj5bkuIvkuIDlsYLnmoRTdGVwXHJcbiAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IHRoaXMuUGxheWVyLkN1clN0ZXA7XHJcbiAgICAgICAgaWYoaXNSaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc3RlcCA9PSBudWxsfHxzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lsYLmlbDojrflj5bmn5DlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgR2V0Rmxvb3JCeUZsb29yKGZsb29yOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yOk1vdW50TGluZSA9IHRoaXMuVGFpbEZMb29yO1xyXG4gICAgICAgIGlmKGZsb29yPCB0YWlsRmxvb3IuRmxvb3JOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29ySUQgPSAoZmxvb3IgLSB0YWlsRmxvb3IuRmxvb3JOdW0gICsgdGhpcy5fVGFpbEZMb29ySWR4KSV0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbZmxvb3JJRF07XHJcbiAgICB9XHJcblxyXG4gICAgTG9vcERvRmxvb3JTdGVwKCBmbG9vcjpudW1iZXIsT3duZXI6YW55LGNhbGxCYWNrOihzdGVwOlN0ZXApPT52b2lkICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKGZsb29yPHRoaXMuVGFpbEZMb29yLkZsb29yTnVtfHxmbG9vcj50aGlzLkhlYWRGbG9vci5GbG9vck51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yTGluZTpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgZm9yKGxldCBpZHg9MDtpZHg8Zmxvb3JMaW5lLkxvZ2ljTGVuZ3RoOysraWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vckxpbmUuR2V0U3RlcChpZHgpO1xyXG4gICAgICAgICAgICBjYWxsQmFjay5jYWxsKE93bmVyLHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmui/h+WdkOagh+iOt+WPluWPsOmYtlxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOe0ouW8lSzlsYLmlbBcclxuICAgICAqL1xyXG4gICAgR2V0U3RlcEJ5TG9jYXRpb24obG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb24pOlN0ZXBcclxuICAgIHtcclxuICAgICAgICB2YXIgZ2V0U3RlcDpTdGVwID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9jYXRpb24uWSkuR2V0U3RlcChsb2NhdGlvbi5YKTtcclxuICAgICAgICByZXR1cm4gZ2V0U3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgUGxheWVyRmxvb3IoICk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGZsb29yOm51bWJlciA9IHRoaXMuX1N0YXJ0UG9zaXRpb24ueiAtIHRoaXMuUGxheWVyLkxvZ2ljUG9zaXRpb24uejtcclxuICAgICAgICBmbG9vciA9IE1hdGgucm91bmQoZmxvb3IvKCBBUFAuR2FtZU1hbmFnZXIuU3RlcERpc3RhbmNlLzIpKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoZmxvb3IpO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBsYXllckZsb29yTGluZSggKTpNb3VudExpbmVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5HZXRGbG9vckJ5Rmxvb3IodGhpcy5QbGF5ZXJGbG9vcik7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIHByaXZhdGUgX0hlYWRGbG9vcklkeDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9UYWlsRkxvb3JJZHg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQ291bnRUaW1lOm51bWJlcjtcclxuICAgIHByaXZhdGUgX0Jvb3RvbUZsb29yOm51bWJlcjtcclxuICAgIHByaXZhdGUgX1N0YXJ0UG9zaXRpb246TGF5YS5WZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSBfR2FtZVVwZGF0ZTooKT0+dm9pZDtcclxuICAgIHByaXZhdGUgX1BhbmVsVUk6R2FtZVVJO1xyXG4gICAgcHJpdmF0ZSBfR29sZE51bTpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Mb2dpY0dvbGROdW06bnVtYmVyO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkNhbWVyYSA9IG51bGw7ICBcclxuICAgICAgICB0aGlzLkdhbWVTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Nb3VudExpbmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLlBsYXllciA9bnVsbDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5JdGVtTGF5b3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yID0wO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0UG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5fUGFuZWxVSSA9IG51bGw7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvL+WIm+W7uuebuOWFs+aUvui/mSDov5nph4zph43mlrDlvIDlp4vkuI3kvJrotbBcclxuICAgIHByb3RlY3RlZCBfU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAvL+WIm+W7uuaWueWQkeWFiVxyXG4gICAgICAgIHZhciBkaXJlY3Rpb25MaWdodCA9IG5ldyBMYXlhLkRpcmVjdGlvbkxpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5TY2VuZU1nci5DdXJTY2VuZS5QdXRPYmooZGlyZWN0aW9uTGlnaHQpO1xyXG4gICAgICAgIGRpcmVjdGlvbkxpZ2h0LmNvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKTtcclxuICAgICAgICBkaXJlY3Rpb25MaWdodC5kaXJlY3Rpb24gPSBuZXcgTGF5YS5WZWN0b3IzKDEsIC0xLCAwKTtcclxuKi9cclxuICAgICAgICB0aGlzLkNhbWVyYSA9bmV3IEdhbWVDYW1lcmEoKTtcclxuICAgICAgICB0aGlzLkNhbWVyYS50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyID1uZXcgTGF5YS5WZWN0b3IzKC0zMCwwLDApO1xyXG4gICAgICAgIHRoaXMuU2NlbmVNZ3IuQ3VyU2NlbmUuUHV0T2JqKHRoaXMuQ2FtZXJhKTtcclxuXHJcbiAgICAgICAgdGhpcy5Nb3VudExpbmVzID0gW107XHJcbiAgICAgICAgdmFyIG1heExpbmVOdW0gPSBBUFAuR2FtZU1hbmFnZXIuTWF4TGluZU51bTtcclxuICAgICAgICBmb3IoIHZhciBsaW5lSWR4Om51bWJlciA9IG1heExpbmVOdW0tMTtsaW5lSWR4Pj0wOy0tbGluZUlkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3TW91bnRMaW5lID0gbmV3IE1vdW50TGluZShsaW5lSWR4LGxpbmVJZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNjZW5lTWdyLkN1clNjZW5lLlB1dE9iaihuZXdNb3VudExpbmUpO1xyXG4gICAgICAgICAgICB0aGlzLk1vdW50TGluZXNbbGluZUlkeF0gPSBuZXdNb3VudExpbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yib5bu6VUlcclxuICAgICAgICB2YXIgZGlyOkdhbWVEaXJlY3RvciA9IHRoaXM7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8v5Yib5bu6546p5a62XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5TY2VuZU1nci5DdXJTY2VuZS5QdXRPYmoodGhpcy5QbGF5ZXIpO1xyXG5cclxuICAgICAgICAvL+WHhuWkh+eOqeWutuatu+S6oeS6i+S7tlxyXG4gICAgICAgIHRoaXMuX01lc3NhZ2VNZ3IuUmVnaXN0KE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgsdGhpcy5EZWF0aCx0aGlzKTtcclxuICAgICAgICBzdXBlci5fU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/m+WFpea4uOaIj+eahOiuvue9ruaUvui/memHjCDph43mlrDlvIDlp4votbDov5nph4xcclxuICAgIHByb3RlY3RlZCBfU3RhcnRDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKDAsMCk7XHJcbiAgICAgICAgLy/ph43nva7nianlk4FcclxuICAgICAgICB0aGlzLkl0ZW1MYXlvdXQgPSBuZXcgSXRlbS5JdGVtTGF5b3V0KClcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdmFyIGxpbmVzOk1vdW50TGluZVtdID0gdGhpcy5Nb3VudExpbmVzO1xyXG4gICAgICAgIC8v5Yib5bu66L6T5YWl5o6n5Yi25ZmoXHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSBuZXcgSW5wdXQuTm9ybUdhbWVJbnB1dCh0aGlzKTtcclxuICAgICAgICB0aGlzLl9IZWFkRmxvb3JJZHggPSBsaW5lcy5sZW5ndGggLTE7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllci5SZXNldCgpO1xyXG4gICAgICAgIGZvcih2YXIgaWR4Om51bWJlciA9IDA7aWR4PGxpbmVzLmxlbmd0aDsrK2lkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lOk1vdW50TGluZSA9IHRoaXMuTW91bnRMaW5lc1tpZHhdO1xyXG4gICAgICAgICAgICBsaW5lLlNldExpbmUoaWR4KTtcclxuICAgICAgICAgICAgaWYoaWR4PjApXHJcbiAgICAgICAgICAgICAgICBsaW5lc1tpZHgtMV0uU2V0TmV4dEZsb29yKGxpbmUpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlNldFN0ZXAobGluZS5HZXRTdGVwKE1hdGguZmxvb3IoIGxpbmUuTG9naWNMZW5ndGgvMikpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1N0YXJ0UG9zaXRpb24gPSB0aGlzLlBsYXllci5Mb2dpY1Bvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShpZHgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbWVyYS5SZXNldChuZXcgTGF5YS5WZWN0b3IzKCksbmV3IExheWEuVmVjdG9yMyh0aGlzLlBsYXllci5Qb3NpdGlvbi54LEFQUC5HYW1lTWFuYWdlci5TdGVwTGVuZ3RoICogOSxBUFAuR2FtZU1hbmFnZXIuU3RlcExlbmd0aCAqIDgpLHRoaXMuUGxheWVyKTtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtID0gMDtcclxuICAgICAgICB0aGlzLl9Mb2dpY0dvbGROdW0gPSAwO1xyXG5cclxuICAgICAgICBzdXBlci5fU3RhcnRDb21wbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSSA9IHRoaXMuX1VJTWdyLlNob3coR2FtZVVJKTtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSB0aGlzLkdhbWVUaW1lICs2MDAwO1xyXG4gICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yID0gMDtcclxuICAgICAgICB0aGlzLl9HYW1lVXBkYXRlID0gdGhpcy5fU3RhcnRDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9HYW1lVXBkYXRlIT1udWxsIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0dhbWVVcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICAqL1xyXG4gICAgfVxyXG5cclxuICAgIC8v5q2j5bi46L+Q6KGM5pe255qE5q+P5bin6YC76L6RXHJcbiAgICBwcml2YXRlIF9SdW5HYW1lVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuRGlzdGFuY2UgPSB0aGlzLlBsYXllckRpc3RhbmNlO1xyXG4gICAgICAgIHZhciBmbG9vVmVjdG9yOkxheWEuVmVjdG9yMyA9IHRoaXMuVGFpbEZMb29yLlBvc2l0aW9uO1xyXG4gICAgICAgIGlmKGZsb29WZWN0b3IueiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLno+MypBUFAuR2FtZU1hbmFnZXIuU3RlcERpc3RhbmNlLzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9QdXNoRkxvb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fQ291bnRUaW1lIDwgdGhpcy5HYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUrIDMwMDA7XHJcbiAgICAgICAgICAgIHRoaXMuX0Rlc3Ryb3lMaW5lKHRoaXMuX0Jvb3RvbUZsb29yKTtcclxuICAgICAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgKz0gMTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5YCS6K6h5pe25pyf6Ze055qE5q+P5bin6YC76L6RXHJcbiAgICBwcml2YXRlIF9TdGFydENvdW50KClcclxuICAgIHtcclxuICAgICAgICB2YXIgdGltZTpzdHJpbmcgPVwiXCJcclxuICAgICAgICB2YXIgY291bnRUaW1lOm51bWJlciA9IHRoaXMuX0NvdW50VGltZSAtIHRoaXMuR2FtZVRpbWU7XHJcbiAgICAgICAgaWYoY291bnRUaW1lPjApXHJcbiAgICAgICAgICAgIHRpbWUrPSBNYXRoLmZsb29yKCBjb3VudFRpbWUvMTAwMCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSA9IHRoaXMuX1J1bkdhbWVVcGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUgKyAzMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBhbmVsVUkuU2V0Q291bnRUaW1lKHRpbWUpO1xyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgLy/lsIblsYLlkJHkuIrlj6BcclxuICAgIHByb3RlY3RlZCBfUHVzaEZMb29yKClcclxuICAgIHtcclxuICAgICAgICB2YXIgcHJlSGVhZDpNb3VudExpbmUgPSB0aGlzLkhlYWRGbG9vcjtcclxuICAgICAgICB0aGlzLl9IZWFkRmxvb3JJZHggPSh0aGlzLl9IZWFkRmxvb3JJZHgrMSkldGhpcy5Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLl9UYWlsRkxvb3JJZHggPSAodGhpcy5fVGFpbEZMb29ySWR4ICsxKSV0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBIZWFkZmxvb3I6bnVtYmVyID0gcHJlSGVhZC5GbG9vck51bSArIDE7XHJcbiAgICAgICAgdGhpcy5IZWFkRmxvb3IuU2V0TGluZShIZWFkZmxvb3IpO1xyXG4gICAgICAgIHByZUhlYWQuU2V0TmV4dEZsb29yKHRoaXMuSGVhZEZsb29yKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9QdXRJdGVtSW5MaW5lKEhlYWRmbG9vcik7ICAgXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciDnianlk4HliJfooahcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIF9QdXRJdGVtSW5MaW5lKGZsb29yOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgc2FmZUNvbCA6e1trZXk6c3RyaW5nXSA6QXJyYXk8bnVtYmVyPjt9ID0ge307XHJcbiAgICAgICAgaWYoZmxvb3IgPj0gdGhpcy5fU2FmZUxvY2F0aW9uLlkgKyBBUFAuR2FtZU1hbmFnZXIuTWF4TGluZU51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNhZmVDb2wgPSB0aGlzLl9Db3VudE9wZW5MaXN0KGZsb29yKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mkYbmlL7liY3lhYjorqHnrpfor6XlsYLpgJrot6/mg4XlhrUgXHJcbiAgICAgICAgICAgIHNhZmVDb2wgPSB7fVxyXG4gICAgICAgICAgICBzYWZlQ29sW1wib1wiXSA9IHRoaXMuX0NvdW50Um9hZEluZm8oZmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGlmKGZsb29yIDwxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iOt+WPluivpeihjOimgeaRhuaUvueahOeJqeWTgVxyXG4gICAgICAgIHRoaXMuX1Rha2VJdGVtTGlzdChmbG9vcilcclxuICAgICAgICBcclxuICAgICAgICAvL+agh+iusOS4gOadoee7neWvueWuieWFqOeahOi3r1xyXG4gICAgICAgIHZhciBzYWZlSWR4Q29sbDp7IFtrZXk6IHN0cmluZ106IG51bWJlcjsgfSA9e307XHJcbiAgICAgICAgZm9yKHZhciBjb2xLZXkgaW4gc2FmZUNvbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gc2FmZUNvbFtjb2xLZXldO1xyXG4gICAgICAgICAgICB2YXIgc2FmZUlkeCA9IGxpc3RbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmxpc3QubGVuZ3RoKV07XHJcbiAgICAgICAgICAgIGlmKHNhZmVJZHhDb2xsW3NhZmVJZHhdPT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNhZmVJZHhDb2xsW3NhZmVJZHhdID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aKiumcgOimgeaUvumBk+WFt+eahOagvOWtkOaUvuWFpemaj+acuuaxoFxyXG4gICAgICAgIHZhciBjdXJGbG9vcjpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgdmFyIHJhbmRvbVBvb2w6QXJyYXk8U3RlcD4gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAvL+aKiuWuieWFqOeahOagvOWtkOaaguaXtuenu+WHuuadpVxyXG4gICAgICAgIHZhciBzYWZlU3RlcExpc3Q6QXJyYXk8U3RlcD4gPSBuZXcgQXJyYXk8U3RlcD4oKTtcclxuICAgICAgICBmb3IoIHZhciBzdGVwSWR4Om51bWJlciA9IDA7IHN0ZXBJZHggPCBjdXJGbG9vci5Mb2dpY0xlbmd0aDsrK3N0ZXBJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGdldFN0ZXA6U3RlcCA9IGN1ckZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgIGlmKHNhZmVJZHhDb2xsW3N0ZXBJZHhdPT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBvb2wucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2FmZVN0ZXBMaXN0LnB1c2goZ2V0U3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mlL7pmbfpmLFcclxuICAgICAgICB2YXIgYmFycmllcnNMaXN0OkFycmF5PExpbmVJdGVtSW5mbz4gPSB0aGlzLkN1ckxpbmVCYXJyaWVycztcclxuICAgICAgICBpZihmbG9vcjw9dGhpcy5fU2FmZUxvY2F0aW9uLlkrMSYmZmxvb3I+PXRoaXMuX1NhZmVMb2NhdGlvbi5ZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpbmRleDpudW1iZXIgPSBiYXJyaWVyc0xpc3QubGVuZ3RoLTE7IGluZGV4Pi0xOy0taW5kZXgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJhcnJpZXJzTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX09yZ2luaXplUHV0SXRlbShiYXJyaWVyc0xpc3QscmFuZG9tUG9vbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/mkYbmlL7pgZPlhbdcclxuICAgICAgICBmb3IodmFyIHNhZmVTdGVwSWR4Om51bWJlciA9IDA7c2FmZUlkeDxzYWZlU3RlcExpc3QubGVuZ3RoOysrc2FmZUlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJhbmRvbVBvb2wucHVzaChzYWZlU3RlcExpc3Rbc2FmZUlkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmV3YXJkTGlzdCA9IHRoaXMuQ3VyTGluZVJld2FyZHM7XHJcbiAgICAgICAgdGhpcy5fT3JnaW5pemVQdXRJdGVtKHJld2FyZExpc3QscmFuZG9tUG9vbCk7XHJcbiAgICAgICAgLy/lho3mrKHorqHnrpfpgJrot6/mg4XlhrUgXHJcbiAgICAgICAgdGhpcy5fQ291bnRMYXN0Rmxvb3JSb2FkKGZsb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRhuaUvueJqeWTgVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxMaW5lSXRlbUluZm8+fSBpdGVtTGlzdCDnianlk4HliJfooahcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U3RlcD59IHJhbmRvbVBvb2wg5Y+w6Zi26ZuG5ZCIXHJcbiAgICAgKi9cclxuICAgIF9Pcmdpbml6ZVB1dEl0ZW0oaXRlbUxpc3Q6QXJyYXk8TGluZUl0ZW1JbmZvPixyYW5kb21Qb29sOkFycmF5PFN0ZXA+KTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKHZhciBpdGVtSWR4Om51bWJlciA9IDA7aXRlbUlkeCA8IGl0ZW1MaXN0Lmxlbmd0aDsrK2l0ZW1JZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzpMaW5lSXRlbUluZm8gPSBpdGVtTGlzdFtpdGVtSWR4XTtcclxuICAgICAgICAgICAgZm9yKHZhciBkaWZmaWN1bHR5TnVtOm51bWJlciA9IDA7IGRpZmZpY3VsdHlOdW08aW5mby5OdW1iZXI7KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihyYW5kb21Qb29sLmxlbmd0aDwxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/pmo/mnLrmiorpmpznoo3mlL7lhaXmoLzlrZDph4xcclxuICAgICAgICAgICAgICAgIHZhciByYW5kb21JZHg6bnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnJhbmRvbVBvb2wubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSByYW5kb21Qb29sW3JhbmRvbUlkeF07XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnNwbGljZShyYW5kb21JZHgsMSk7XHJcbiAgICAgICAgICAgICAgICBzdGVwLlB1dEl0ZW0oaW5mby5UeXBlKTtcclxuICAgICAgICAgICAgICAgIC0taW5mby5OdW1iZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocmFuZG9tUG9vbC5sZW5ndGg8MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXRlbUlkeD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXRlbUxpc3Quc3BsaWNlKDAsaXRlbUlkeCk7ICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAq6YCS5b2S6K6h566X6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3JOdW0g54mp5ZOB5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIF9Db3VudE9wZW5MaXN0KGZsb29yTnVtOm51bWJlcik6e1trZXk6c3RyaW5nXSA6QXJyYXk8bnVtYmVyPjt9XHJcbiAgICB7XHJcbiAgICAgICAgZm9yKHZhciBmbG9vckNvdW50Om51bWJlciA9IHRoaXMuUGxheWVyRmxvb3I7IGZsb29yQ291bnQ8PWZsb29yTnVtOysrZmxvb3JDb3VudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmbG9vcjpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vckNvdW50KTtcclxuICAgICAgICAgICAgaWYoZmxvb3IgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgZm9yKHZhciBzdGVwSWR4ID0gMDtzdGVwSWR4PGZsb29yLkxvZ2ljTGVuZ3RoOysrc3RlcElkeClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICAgICAgc3RlcC5NYXJrID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vcjpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLlBsYXllckZsb29yKTtcclxuICAgICAgICBmb3IodmFyIHN0ZXBJZHggPSAwO3N0ZXBJZHg8Zmxvb3IuTG9naWNMZW5ndGg7KytzdGVwSWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZighc3RlcC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9NYXJrU3RlcHMoc3RlcCxzdGVwSWR4LGZsb29yTnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGFyZ2V0Rmxvb3I6TW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JOdW0pO1xyXG4gICAgICAgIC8v5om+5Ye66KKr5qCH6K6w55qE54K55bm25pW055CG5oiQ6ZuG5ZCIXHJcbiAgICAgICAgdmFyIGNvbGxlY3Rpb246e1trZXk6c3RyaW5nXSA6QXJyYXk8bnVtYmVyPjt9ID0ge31cclxuICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBcIm9cIlxyXG4gICAgICAgIGZvcih2YXIgb3BlbklkeDpudW1iZXIgPSAwO29wZW5JZHg8dGFyZ2V0Rmxvb3IuTG9naWNMZW5ndGg7ICsrb3BlbklkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWFya2VkU3RlcDpTdGVwID0gdGFyZ2V0Rmxvb3IuR2V0U3RlcChvcGVuSWR4KTtcclxuICAgICAgICAgICAgaWYobWFya2VkU3RlcC5NYXJrIT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBOYW1lOnN0cmluZyA9IG5hbWUgKyBtYXJrZWRTdGVwLk1hcms7XHJcbiAgICAgICAgICAgICAgICBpZihjb2xsZWN0aW9uW05hbWVdID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uW05hbWVdID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbltOYW1lXS5wdXNoKG9wZW5JZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKumAkuW9kuagh+iusOmAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtTdGVwfSBzdGVwIOWPsOmYtlxyXG4gICAgICogQHBhcmFtIHthbnl9IG1hcmsg5qCH6K6wXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0Rmxvb3JOdW0g55uu5qCH5bGC5pWwXHJcbiAgICAgKi9cclxuICAgIF9NYXJrU3RlcHMoc3RlcDpTdGVwLG1hcms6YW55LHRhcmdldEZsb29yTnVtOm51bWJlcik6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGlmKHN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmKHN0ZXAuRmxvb3IuRmxvb3JOdW0+PXRhcmdldEZsb29yTnVtIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHN0ZXAuTWFyayA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0ZXAuTWFyayA9IG1hcmtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlZnRPcGVuOmJvb2xlYW47XHJcbiAgICAgICAgdmFyIHJpZ2h0T3Blbjpib29sZWFuO1xyXG4gICAgICAgIHZhciBsZWZ0UGFyZW50OlN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgaWYobGVmdFBhcmVudCAhPSBudWxsICYmICFsZWZ0UGFyZW50LklzRGVhZFJvYWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihsZWZ0UGFyZW50Lk1hcms9PXVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGxlZnRPcGVuID0gdGhpcy5fTWFya1N0ZXBzKGxlZnRQYXJlbnQsbWFyayx0YXJnZXRGbG9vck51bSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGxlZnRPcGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJpZ2h0UGFyZW50OlN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgIGlmKHJpZ2h0UGFyZW50ICE9IG51bGwgJiYgIXJpZ2h0UGFyZW50LklzRGVhZFJvYWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihyaWdodFBhcmVudC5NYXJrPT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICByaWdodE9wZW4gPSB0aGlzLl9NYXJrU3RlcHMocmlnaHRQYXJlbnQsbWFyayx0YXJnZXRGbG9vck51bSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJpZ2h0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0ZXAuTWFyayA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGVwLk1hcmsgPSBtYXJrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFsZWZ0T3BlbiYmIXJpZ2h0T3BlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOacgOWQjuWGjeiuoeeul+S4gOasoeivpeWxgumAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yTnVtIFxyXG4gICAgICovXHJcbiAgICBfQ291bnRMYXN0Rmxvb3JSb2FkKGZsb29yTnVtOm51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKGZsb29yTnVtIDwgdGhpcy5UYWlsRkxvb3IuRmxvb3JOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vciA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yTnVtKTtcclxuICAgICAgICB2YXIgbGFzdEZsb29yID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JOdW0gLTEgKTtcclxuICAgICAgICBmb3IodmFyIHN0ZXBJZHggPTA7c3RlcElkeDxmbG9vci5Mb2dpY0xlbmd0aDsrK3N0ZXBJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYoIXN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIExlZnRTdGVwID0gc3RlcC5MZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgUmlnaHRTdGVwID0gc3RlcC5SaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgICAgaWYoTGVmdFN0ZXAhPW51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIUxlZnRTdGVwLklzRGVhZFJvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK0xlZnRTdGVwLlJvYWROdW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoUmlnaHRTdGVwIT1udWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFSaWdodFN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrUmlnaHRTdGVwLlJvYWROdW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgbGFzdFN0ZXBJZHggPSAwO2xhc3RTdGVwSWR4PCBsYXN0Rmxvb3IuTG9naWNMZW5ndGg7KytsYXN0U3RlcElkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwID0gbGFzdEZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgIGlmKCFzdGVwLklzRGVhZFJvYWQmJnN0ZXAuUm9hZE51bTwxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAvL+WQkeS4iumAkuW9kuaKiuaJgOacieS4juS5i+ebuOi/nueahOiKgueCueaVsOe7meS/ruato+S6hlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS+6YGT5YW35YmN566X6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIF9Db3VudFJvYWRJbmZvKGZsb29yOm51bWJlcik6QXJyYXk8bnVtYmVyPlxyXG4gICAge1xyXG4gICAgICAgIHZhciBzYWZlU3RlcExpc3Q6QXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIHZhciB0aGlzRmxvb3I6TW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciByb2FkTnVtOm51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGxhc3RGbG9vcjpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vciAtMSk7XHJcbiAgICAgICAgZm9yKHZhciBsb2dpY0lkeDpudW1iZXIgPSAwOyBsb2dpY0lkeDx0aGlzRmxvb3IuTG9naWNMZW5ndGg7Kytsb2dpY0lkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0Q2hpbGQ6U3RlcCA9IHN0ZXAuTGVmdENoaWxkO1xyXG4gICAgICAgICAgICB2YXIgcmlnaHRDaGlsZDpTdGVwID0gc3RlcC5SaWdodENoaWxkO1xyXG4gICAgICAgICAgICBpZihsZWZ0Q2hpbGQhPSBudWxsICYmICFsZWZ0Q2hpbGQuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2FmZVN0ZXBMaXN0LnB1c2gobG9naWNJZHgpO1xyXG4gICAgICAgICAgICB9ZWxzZSBpZihyaWdodENoaWxkIT0gbnVsbCAmJiAhcmlnaHRDaGlsZC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGZsb29yID09IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5DdXJTdGVwLklzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNhZmVTdGVwTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluafkOmBk+WFt+S/oeaBr1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9Zmxvb3IgXHJcbiAgICAgKi9cclxuICAgIF9UYWtlSXRlbUxpc3QoZmxvb3I6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciBpdGVtTGlzdCA9IG5ldyBBcnJheShsaW5lLkxvZ2ljTGVuZ3RoKTtcclxuICAgICAgICB2YXIgbGluZVJld2FyZHMgPSB0aGlzLkl0ZW1MYXlvdXQuVGFrZUxpbmVSZXdhcmQoZmxvb3IpO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSB0aGlzLkN1ckxpbmVSZXdhcmRzLmNvbmNhdChsaW5lUmV3YXJkcyk7XHJcbiAgICAgICAgLy9pZih0aGlzLlRhcmdldExvY2F0aW9uLnk+MCYmKCB0aGlzLlRhcmdldExvY2F0aW9uLnkgPj1mbG9vciAmJiB0aGlzLlRhcmdldExvY2F0aW9uLnk8Zmxvb3IrMyApKVxyXG4gICAgICAgIC8ve1xyXG4gICAgICAgIC8vfWVsc2VcclxuICAgICAgICAvL3tcclxuICAgICAgICAgICAgbGluZVJld2FyZHMgPSB0aGlzLkl0ZW1MYXlvdXQuVGFrZUxpbmVEaWZmaWN1bHR5KGZsb29yKTtcclxuICAgICAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSB0aGlzLkN1ckxpbmVCYXJyaWVycy5jb25jYXQobGluZVJld2FyZHMpOyAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDloYzpmbfmn5DkuIDlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfWZsb29yIFxyXG4gICAgICovXHJcbiAgICBfRGVzdHJveUxpbmUoZmxvb3I6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0YWlsRmxvb3IgPSB0aGlzLlRhaWxGTG9vcjtcclxuICAgICAgICBpZihmbG9vciA8dGFpbEZsb29yLkZsb29yTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGNvdW50Rmxvb3I6bnVtYmVyID0gdGFpbEZsb29yLkZsb29yTnVtO2NvdW50Rmxvb3I8PSBmbG9vcjsrK2NvdW50Rmxvb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0Rmxvb3I6TW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoY291bnRGbG9vcik7XHJcbiAgICAgICAgICAgIHRhcmdldEZsb29yLkJyZWFrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUGxheWVyLlRvdWNoR3JvdW5kKCk7XHJcbiAgICB9XHJcbn0iLCIvKlxyXG7kvZzogIU6TW9cclxu6Lez5bGx576K5Zy65pmv5qC45b+D5Yqf6IO9XHJcbiovXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW5kR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgR2FtZUNhbWVyYSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVDYW1lcmFcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLy4uL0dhbWUvUGxheWVyXCJcclxuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi8uLi91aS9HYW1lVUlcIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuLy4uL0dhbWUvTW91bnRMaW5lXCJcclxuaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vLi4vR2FtZS9TdGVwXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi9HYW1lRGlyZWN0b3JcIlxyXG50eXBlIEl0ZW1MYXlvdXQgPSBJdGVtLkl0ZW1MYXlvdXQ7XHJcbnR5cGUgTGluZUl0ZW1JbmZvID0gSXRlbS5MaW5lSXRlbUluZm87XHJcbnZhciBJdGVtVHlwZSA9IEl0ZW0uSXRlbVR5cGU7XHJcbi8v5ri45oiP5Zy65pmvXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIEJhc2VTY2VuZVxyXG57XHJcbiAgICBNb2RlbExvYWQ6Ym9vbGVhbjtcclxuICAgIEdhbWVEaXI6R2FtZURpcmVjdG9yO1xyXG4gICAgLy/lr7nlpJbmjqXlj6NcclxuICAgIFN0YXJ0TG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChbcGF0aC5HZXREZXBhdGhVSUpTKFwiUGxheWVyTGlzdFwiKSxwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lU2NlbmVcIikscGF0aC5HZXREZXBhdGhVSUpTKFwiRW5kR2FtZVwiKV0sTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX0xvYWRDb21wbGV0ZSkpO1xyXG4gICAgICAgIHN1cGVyLlN0YXJ0TG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9TdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5fU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5fVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9HZW5EaXIoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HYW1lRGlyID0gbmV3IEdhbWVEaXJlY3RvcigpO1xyXG4gICAgICAgIHRoaXMuQ3VyRGlyID0gdGhpcy5HYW1lRGlyO1xyXG5cclxuICAgIH1cclxuICAgIC8v56a75byA5pe26L+b6KGM6YWN572uXHJcbiAgICBwcm90ZWN0ZWQgX0xlYXZlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX01lc3NhZ2VNZ3IuRGVzUmdpc3RJREsoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgc3VwZXIuX0xlYXZlKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX0xvYWRDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TY2VuZSA9IG5ldyBMYXlhLlNjZW5lKCk7XHJcbiAgICAgICAgc3VwZXIuX0xvYWRDb21wbGV0ZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1aWRlck1hbmFnZXIgXHJcbntcclxuLy/lr7nlpJbmjqXlj6NcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6R3VpZGVyTWFuYWdlcjtcclxuICAgIHN0YXRpYyBnZXQgTWdyKCk6R3VpZGVyTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEd1aWRlck1hbmFnZXIuX01nciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR3VpZGVyTWFuYWdlci5fTWdyID0gbmV3IEd1aWRlck1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEd1aWRlck1hbmFnZXIuX01ncjtcclxuICAgIH1cclxuICAgIFNjZW5lTWdyOlNjZW5lTWFuYWdlcjtcclxuICAgIEN1clNjZW5lOkd1aWRlclNjZW5lO1xyXG4gICAgZ2V0IEdhbWVEaXIoKTpHdWlkZXJEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clNjZW5lLkd1aWREaXI7XHJcbiAgICB9XHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr+i1sOi/meS4quaOpeWPo1xyXG4gICAgRW50ZXJTY2VuZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3R2FtZVNjZW5lID0gbmV3IEd1aWRlclNjZW5lKCk7XHJcbiAgICAgICAgdGhpcy5TY2VuZU1nci5FbnRlclNjZW5lKG5ld0dhbWVTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG5ld0dhbWVTY2VuZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU2NlbmVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFNjZW5lTWFuYWdlcj4oU2NlbmVNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyU2NlbmUgZXh0ZW5kcyBCYXNlU2NlbmVcclxue1xyXG4gICAgR3VpZERpcjpHdWlkZXJEaXJlY3RvcjtcclxuICAgIEN1ckRpcjpCYXNlRGlyZWN0b3I7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFN0YXJ0TG9hZCggKVxyXG4gICAge1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoW3t1cmw6cGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIikgLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSAsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOlwicmVzL2F0bGFzL2NvbXAuYXRsYXNcIix0eXBlOiBMYXlhLkxvYWRlci5BVExBUyB9XSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fTG9hZENvbXBsZXRlKSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX0dlbkRpcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkd1aWREaXIgPSBuZXcgR3VpZGVyRGlyZWN0b3IoKTtcclxuICAgICAgICB0aGlzLkN1ckRpciA9IHRoaXMuR3VpZERpcjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyRGlyZWN0b3IgZXh0ZW5kcyBCYXNlRGlyZWN0b3Jcclxue1xyXG4gICAgVUk6RW50ZXJHYW1lVUk7XHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLl9TdGFydCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9TdGFydENvbXBsZXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLl9TdGFydENvbXBsZXRlKCk7XHJcbiAgICAgICAgdGhpcy5VSSA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpLlNob3c8RW50ZXJHYW1lVUk+KEVudGVyR2FtZVVJKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuLy4uL3VpL2xheWFNYXhVSVwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBMb2FkaW5nVUkgZnJvbSBcIi4vLi4vdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUlcIlxyXG5pbXBvcnQgRk1Xb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi9HdWlkZXJNYW5hZ2VyXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZFNjZW5lIGV4dGVuZHMgQmFzZVNjZW5lXHJcbntcclxuICAgIEN1ckRpcjpCYXNlRGlyZWN0b3I7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX0dlbkRpcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1ckRpciA9IG5ldyBMb2FkRGlyY3RvcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBTdGFydExvYWQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlc0NvbCA9IFt7dXJsOlwidWkvTG9hZFVJLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6XCJ1aS9SZXNvdXJjZS9jb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU31dO1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQocmVzQ29sLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9Mb2FkQ29tcGxldGUpKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5jbGFzcyBMb2FkRGlyY3RvciBleHRlbmRzIEJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBVSTpMb2FkaW5nVUk7XHJcbiAgICBcclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICB9XHJcblxyXG4gICAgX0NvdW50MkRMb2FkOm51bWJlcjtcclxuICAgIF9Db3VudDNETG9hZDpudW1iZXI7XHJcbiAgICBfTG9hZEZhaWxlOmJvb2xlYW47XHJcbiAgICBfQ291bnRWYWx1ZTpudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9Db3VudDNETG9hZCA9IDAuNTtcclxuICAgICAgICB0aGlzLl9Db3VudDJETG9hZCA9IDAuNTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbihMYXlhLkV2ZW50LkVSUk9SLHRoaXMsdGhpcy5fb25FcnJvcik7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub24oTGF5YS5FdmVudC5DT01QTEVURSx0aGlzLHRoaXMuX29uQ29tcGxldGUpO1xyXG4gICAgICAgIHRoaXMuTG9hZCgpO1xyXG4gICAgICAgIHN1cGVyLl9TdGFydCgpO1xyXG4gICAgICAgIHRoaXMuX0xvYWRGYWlsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfU3RhcnRDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgICAgICB0aGlzLlVJID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpLlNob3c8TG9hZGluZ1VJPihMb2FkaW5nVUkpO1xyXG4gICAgICAgIHRoaXMuVUkuVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ291bnQyRExvYWQgPTA7XHJcbiAgICAgICAgdGhpcy5fQ291bnQzRExvYWQgPTA7XHJcbiAgICAgICAgdGhpcy5fQ291bnRWYWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fTG9hZEZhaWxlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJlc291cmNlMkRBcnIgPSBbXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIHt1cmw6XCJyZXMvdWlqc29uL1BsYXllckxpc3QuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0sXHJcbiAgICAgICAgICAgIHt1cmw6XCJyZXMvdWlqc29uL0NoYXJhY3RlcnMuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0sXHJcbiAgICAgICAgICAgIHt1cmw6XCJyZXMvdWlqc29uL1NldFBhbmVsLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LFxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiU2V0UGFuZWxcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJDaGFyYWN0ZXJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImNvbXBcIilcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAvL3Jlc291cmNlMkRBcnIgPSBudWxsO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIHJlc291cmNlM0RBcnIgPSBbXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX3BsYXRfMDEvTDAxX3Nwcl9wbGF0XzAxLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX3BsYXRfMDIvTDAxX3Nwcl9wbGF0XzAyLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX3BsYXRfMDMvTDAxX3Nwcl9wbGF0XzAzLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX2JhcnJpZXJfMDEvTDAxX3Nwcl9iYXJyaWVyXzAxLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX2JhcnJpZXJfMDIvTDAxX3Nwcl9iYXJyaWVyXzAyLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX2JhcnJpZXJfMDMvTDAxX3Nwcl9iYXJyaWVyXzAzLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9jaGlsZF8wMS9jaGlsZF8wMS5saFwiXSovXHJcbiAgICAgICAgTGF5YS5sb2FkZXIub24oTGF5YS5FdmVudC5FUlJPUix0aGlzLHRoaXMuX29uRXJyb3IpO1xyXG4gICAgICAgIExheWEubG9hZGVyLm9uKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLl9vbkNvbXBsZXRlKTtcclxuICAgICAgICAvL3ZhciByZXNvdXJjZTNEQXJyID0gW1wiQzovVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfYXV0X2JhcnJpZXJfMDIvTGF5YVNjZW5lX0wwMV9hdXRfYmFycmllcl8wMi9Db252ZW50aW9uYWwvTDAxX2F1dF9iYXJyaWVyXzAyLmxoXCJdO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTNEQXJyID0gWyBwYXRoLkdldExIKFwiYzAwMV9jaGlsZF8wMVwiKSAsXHJcbiAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wMVwiKSxcclxuICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAyXCIpLFxyXG4gICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDNcIiksXHJcbiAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wNFwiKSxcclxuICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAxXCIpLFxyXG4gICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDJcIiksXHJcbiAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wM1wiKSxcclxuICAgICAgICAvKlxyXG4gICAgICAgIHBhdGguUmVzb3VyY2VQYXRoICtcIkxheWFTY2VuZV9MMDFfc3ByX3BsYXRfMDMvQ29udmVudGlvbmFsL0wwMV9zcHJfcGxhdF8wMy5saFwiLFxyXG4gICAgICAgICovXHJcbiAgICAgICAgXS8vIFwiQzovVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfYXV0X2JhcnJpZXJfMDIvTGF5YVNjZW5lX0wwMV9hdXRfYmFycmllcl8wMi9Db252ZW50aW9uYWwvTDAxX2F1dF9iYXJyaWVyXzAyLmxoXCJdO1xyXG4gICAgICAgIHRoaXMuX0xvYWQocmVzb3VyY2UyREFycixyZXNvdXJjZTNEQXJyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9Mb2FkKGFycjJEOkFycmF5PGFueT4gPSBudWxsLGFycjNEOkFycmF5PGFueT49bnVsbClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZihhcnIyRCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgLy8gTGF5YS5sb2FkZXIubG9hZChhcnIyRCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fb25Mb2FkZWQpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9vbjJEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKGFycjJELG51bGwsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX29uMkRQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy5fQ291bnRWYWx1ZSs9MC41O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudDJETG9hZCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFycjNEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY3JlYXRlKGFycjNELExheWEuSGFuZGxlci5jcmVhdGUodGhpcyxudWxsKSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fb24zRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgIHRoaXMuX0NvdW50VmFsdWUrPTAuNTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQzRExvYWQgPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfb25FcnJvcihzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0xvYWRGYWlsZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvYWRFcnJvcjpcIitzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfb24zRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0NvdW50M0RMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMuVUkuVmFsdWUgPSAodGhpcy5fQ291bnQyRExvYWQgKyB0aGlzLl9Db3VudDNETG9hZCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX29uMkRQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9Db3VudDJETG9hZCA9dmFsdWUvMjtcclxuICAgICAgICB0aGlzLlVJLlZhbHVlID0gdGhpcy5fQ291bnQyRExvYWQgKyB0aGlzLl9Db3VudDNETG9hZDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfb25Db21wbGV0ZShkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aGlEaXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLlVJLlJlbG9hZChmdW5jdGlvbigpOnZvaWR7dGhpRGlyLkxvYWQoKX0gKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5VSS5Db21wbGV0ZSgoKT0+e0d1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgdGhpcy5VSS5VcGRhdGUoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgcGF0aFxyXG57XHJcbiAgICB2YXIgSXNFZGl0b3I6Ym9vbGVhbiA9IHRydWU7XHJcbiAgICBleHBvcnQgdmFyIFNjZW5lQXNzZXRQYXRoOnN0cmluZyA9IFwiTGF5YVNjZW5lX1wiO1xyXG4gICAgZXhwb3J0IHZhciBVSVBhdGg6c3RyaW5nID0gSXNFZGl0b3I/IFwiRDovR0l0L1Jlc291cmNlcy9MYXlhUHJvamVjdC9GcmVzaFByb2plY3QvbXlMYXlhL05ldFJlc291cmNlL1wiOlJlc291cmNlUGF0aDtcclxuICAgIGV4cG9ydCB2YXIgUmVzb3VyY2VQYXRoOnN0cmluZyA9IElzRWRpdG9yP1wiQzovVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL1Jlc291cmNlL0wwMV9sYXlhL05ldFJlc291cmNlcy9cIjpcImh0dHA6Ly93d3cuZ3NqZ2FtZS5jb20vUmVzb3VyY2UvXCI7XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WQXRs5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRBdGxQYXRoKGZpbGVOYW1lOnN0cmluZyk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFVJUGF0aCArIGZpbGVOYW1lK1wiLmF0bGFzXCI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPllVJSnNvbui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0RGVwYXRoVUlKUyhmaWxlTmFtZTpzdHJpbmcpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgVUlQYXRoK2ZpbGVOYW1lK1wiLmpzb25cIjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WbGjmlofku7bot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldExIKGZpbGVOYW1lOnN0cmluZyk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFJlc291cmNlUGF0aCArU2NlbmVBc3NldFBhdGgrZmlsZU5hbWUrXCIvQ29udmVudGlvbmFsL1wiICtmaWxlTmFtZSArIFwiLmxoXCJcclxuICAgIH1cclxufSIsImltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWdyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIiBcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgU2V0UGFuZWxVSSBmcm9tIFwiLi8uLi91aS9TZXRQYW5lbFVJXCJcclxuaW1wb3J0IENoYXJhY3RlclVJIGZyb20gXCIuLy4uL3VpL0NoYXJhY3RlclVJXCJcclxuaW1wb3J0IEdhbWVTY2VuZSBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lU2NlbmVcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVEaXJlY3RvclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUFBcclxue1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01lc3NhZ2U6TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcbiAgICBzdGF0aWMgZ2V0IE1lc3NhZ2VNYW5hZ2VyKCk6TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXJcclxuICAgIHtcclxuICAgICAgICBpZihBUFAuX01lc3NhZ2U9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLl9NZXNzYWdlID0gRlcuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLl9NZXNzYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9VSU1hbmFnZXI6VUlNYW5hZ2VyO1xyXG4gICAgc3RhdGljIGdldCBVSU1hbmFnZXIoKTpVSU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZihBUFAuX1VJTWFuYWdlcj09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLl9VSU1hbmFnZXI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfU2NlbmVNZ3I6U2NlbmVNZ3I7XHJcbiAgICBzdGF0aWMgZ2V0IFNjZW5lTWFuYWdlcigpOlNjZW5lTWdyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoQVBQLl9TY2VuZU1ncj09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuX1NjZW5lTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxTY2VuZU1ncj4oU2NlbmVNZ3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLl9TY2VuZU1ncjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgR2FtZU1hbmFnZXIoKTogR2FtZU1hbmFnZXIge1xyXG4gICAgICAgIHJldHVybiBHYW1lTWFuYWdlci5NZ3I7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IEdhbWVDb250cm9sZXIoKTpHYW1lQ29udHJvbGVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBHYW1lQ29udHJvbGVyLk1ncjtcclxuICAgIH1cclxufVxyXG5cclxudHlwZSBJdGVtVHlwZSA9IEl0ZW0uSXRlbVR5cGU7XHJcblxyXG5jbGFzcyBHYW1lQ29udHJvbGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6IEdhbWVDb250cm9sZXI7XHJcbiAgICBVSU1hbmFnZXI6IFVJTWFuYWdlcjtcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZ2V0IE1ncigpOiBHYW1lQ29udHJvbGVyIHtcclxuICAgICAgICBpZiAoR2FtZUNvbnRyb2xlci5fTWdyID09IG51bGwpIHtcclxuICAgICAgICAgICAgR2FtZUNvbnRyb2xlci5fTWdyID0gbmV3IEdhbWVDb250cm9sZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEdhbWVDb250cm9sZXIuX01ncjtcclxuICAgIH1cclxuXHJcbiAgICBTZXRQbGF5ZXJJRChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlNlbGVjdGVkXCIgKyBpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrorr7nva7pnaLmnb9cclxuICAgIFNob3dTZXRQYW5lbCgpIHtcclxuICAgICAgICB2YXIgUGFuZWwgPSB0aGlzLlVJTWFuYWdlci5TaG93PFNldFBhbmVsVUk+KFNldFBhbmVsVUkpOy8vIG5ldyBTZXRQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66KeS6Imy6Z2i5p2/XHJcbiAgICBwdWJsaWMgU2hvd0NoYXJhY3RlclBhbmVsKCkge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSB0aGlzLlVJTWFuYWdlci5TaG93PENoYXJhY3RlclVJPihDaGFyYWN0ZXJVSSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfU2V0SW5mbztcclxuICAgIGdldCBTZXRJbmZvKCk6IEdhbWVTdHJ1Y3QuU2V0SW5mbyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX1NldEluZm8gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9TZXRJbmZvID0gbmV3IEdhbWVTdHJ1Y3QuU2V0SW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU2V0SW5mbztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgU2V0SW5mbyh2YWx1ZTogR2FtZVN0cnVjdC5TZXRJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5fU2V0SW5mbyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5L+d5a2Y6K6+572u5pWw5o2uXHJcbiAgICBTYXZlU2V0SW5mbyhpbmZvOiBHYW1lU3RydWN0LlNldEluZm8pIHtcclxuICAgICAgICB0aGlzLlNldEluZm8gPSBpbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K+75Y+W6K6+572u5L+h5oGvXHJcbiAgICBHZXRTZXRJbmZvKCk6IEdhbWVTdHJ1Y3QuU2V0SW5mbyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU2V0SW5mbztcclxuICAgIH1cclxuXHJcbiAgICBFbnRlckdhbWVVSSgpOiB2b2lkIHtcclxuICAgICAgICBHYW1lTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgRW50ZXJHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIEdhbWVNYW5hZ2VyLk1nci5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vL+a4uOaIj+eOqeazleeuoeeQhlxyXG5leHBvcnQgY2xhc3MgR2FtZU1hbmFnZXIge1xyXG4gICAgLy/luLjph4/lrprkuYlcclxuICAgIC8v5q+P6KGM5pyA5aSn5qC85a2Q5pWwXHJcbiAgICBnZXQgTGluZVN0ZXBOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIDUgKyAyO1xyXG4gICAgfSBcclxuICAgIC8v5pyA5aSn6KGM5pWwXHJcbiAgICBnZXQgTWF4TGluZU51bSgpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gMTM7XHJcbiAgICB9IFxyXG4gICAgLy/moLzlrZDovrnplb9cclxuICAgIGdldCBTdGVwTGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIDAuOTg7XHJcbiAgICB9XHJcbiAgICAvL+agvOWtkOaWnOWvueinkumVv+W6plxyXG4gICAgZ2V0IFN0ZXBEaXN0YW5jZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoKHRoaXMuU3RlcExlbmd0aCAqIHRoaXMuU3RlcExlbmd0aCkgKiAyKTtcclxuICAgIH1cclxuICAgIC8v546p5a6256e75Yqo5pe26Ze0XHJcbiAgICBnZXQgUGxheWVyTW92ZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gMC4wMiAqIDEwMDAwOztcclxuICAgIH1cclxuXHJcbiAgICAvL+WvueWkluaOpeWPo1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjogR2FtZU1hbmFnZXI7XHJcbiAgICBzdGF0aWMgZ2V0IE1ncigpOiBHYW1lTWFuYWdlciB7XHJcbiAgICAgICAgaWYgKEdhbWVNYW5hZ2VyLl9NZ3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBHYW1lTWFuYWdlci5fTWdyID0gbmV3IEdhbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lTWFuYWdlci5fTWdyO1xyXG4gICAgfVxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuU2NlbmVNZ3IgPSBBUFAuU2NlbmVNYW5hZ2VyO1xyXG4gICAgfVxyXG4gICAgU2NlbmVNZ3I6IFNjZW5lTWdyO1xyXG5cclxuICAgIEN1clNjZW5lOiBHYW1lU2NlbmU7XHJcbiAgICBnZXQgR2FtZURpcigpOiBHYW1lRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clNjZW5lLkdhbWVEaXI7XHJcbiAgICB9XHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr+i1sOi/meS4quaOpeWPo1xyXG4gICAgRW50ZXJTY2VuZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbmV3R2FtZVNjZW5lID0gbmV3IEdhbWVTY2VuZSgpO1xyXG4gICAgICAgIHRoaXMuU2NlbmVNZ3IuRW50ZXJTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBuZXdHYW1lU2NlbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJBCVUZG6KGo546w5pWI5p6cXHJcbiAgICBHZW5CdWZmRWZmZWN0KHR5cGU6IEl0ZW1UeXBlKTogTGF5YS5TcHJpdGUzRCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG4vL1VJ5Z+657G7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VVSSBleHRlbmRzIExheWEuU3ByaXRlXHJcbntcclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKClcclxuICAgIHtcclxuICAgICAgICAvL1VJTWFuYWdlci4uQ2xvc2UodGhpcyk7XHJcbiAgICAgICAgdmFyIHVpTWdyOlVJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIE9wZW5PUCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIENsb3NlT1AoKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIERlc3Ryb3koIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgVUlUeXBlKCk6QmFzZUVudW0uVUlUeXBlRW51bVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9VSVR5cGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBJc011dGV4KCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Jc011dGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX05hbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vXHJcbiAgICBwcm90ZWN0ZWQgX1VJVHlwZTpCYXNlRW51bS5VSVR5cGVFbnVtO1xyXG4gICAgcHJvdGVjdGVkIF9Jc011dGV4OmJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX05hbWU6c3RyaW5nOyAgICBcclxuICAgIHByb3RlY3RlZCBfVUlNYW5hZ2VyOlVJTWFuYWdlclxyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLkxvdztcclxuICAgICAgICB0aGlzLl9Jc011dGV4ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fVUlNYW5hZ2VyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWvuVVJ6L+b6KGM6YCC6YWNXHJcbiAgICAgKiBAcGFyYW0gVUkg6YCC6YWNVUlcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZpeFVJKFVJOkxheWEuVmlldylcclxuICAgIHtcclxuICAgICAgICBVSS53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgVUkuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChVSSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEZXIGZyb20gXCIuLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcblxyXG5pbXBvcnQgUm9sZUVsZW1lbnQgZnJvbSBcIi4vLi4vc2NyaXB0L1JvbGVFbGVtZW50XCJcclxuXHJcbmNsYXNzIEV4dGVuZENoYXJhY3RlcnNVSSBleHRlbmRzIHVpLkNoYXJhY3RlclVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlclVJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfUmVuZGVySGFuZGxlcihjZWxsOkxheWEuQm94LGluZGV4Om51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciByb2xlRWxlbWVudDpSb2xlRWxlbWVudCA9IGNlbGwgYXMgUm9sZUVsZW1lbnQ7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuSWR4ID0gaW5kZXg7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVzZXQoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1VJOkV4dGVuZENoYXJhY3RlcnNVSTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZENoYXJhY3RlcnNVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuU2V0TGlzdCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJDaGFyYWN0ZXJVSVwiO1xyXG4gICAgfVxyXG4gICAgU2V0TGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxpc3RBcnJheTpBcnJheTxhbnk+ID0gW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCJdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5yZW5kZXJIYW5kbGVyID0gbmV3IExheWEuSGFuZGxlcih0aGlzLHRoaXMuX1JlbmRlckhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LmFycmF5ID0gbGlzdEFycmF5O1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0Rpc3RhbmNlID0gNTBcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQge0dhbWVTdHJ1Y3QgfSAgZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuXHJcbmNsYXNzIEV4dGVuZEVudGVyR2FtZVVJIGV4dGVuZHMgdWkuRW5kR2FtZVVJIHtcclxuICAgIFBhbmVsOkxheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVuZEdhbWVcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbCA9IHRoaXMuUGFuZWw7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMuUGFuZWwuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX01lbnVlQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssQVBQLkdhbWVDb250cm9sZXIsQVBQLkdhbWVDb250cm9sZXIuU2hvd0NoYXJhY3RlclBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TZXRCdG4ub24oTGF5YS5FdmVudC5DTElDSyxBUFAuR2FtZUNvbnRyb2xlcixBUFAuR2FtZUNvbnRyb2xlci5TaG93U2V0UGFuZWwpO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssQVBQLkdhbWVDb250cm9sZXIsQVBQLkdhbWVDb250cm9sZXIuRW50ZXJHYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50ZXJHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJFbnRlckdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgVUk6RXh0ZW5kRW50ZXJHYW1lVUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLlVJPSBuZXcgRXh0ZW5kRW50ZXJHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuVUkpO1xyXG4gICAgICAgIC8vdGhpcy5VSS5fQ2hhcmFjdGVyTGlzdC5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgdGhpcy5fVUlNYW5hZ2VyLlNob3c8UGxheWVyTGlzdFVJPihQbGF5ZXJMaXN0VUkpfSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IEZNIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgUGxheWVyTGlzdFVJIGZyb20gXCIuLy4uL3VpL1BsYXllckxpc3RVSVwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcblxyXG5jbGFzcyBFeHRlbmRFbnRlckdhbWVVSSBleHRlbmRzIHVpLkVudGVyVUkge1xyXG4gICAgUGFuZWw6TGF5YS5QYW5lbDtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuUGFuZWwgPSB0aGlzLl9QYW5lbDtcclxuICAgICAgICB0aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXIub24oTGF5YS5FdmVudC5DTElDSyxBUFAuR2FtZUNvbnRyb2xlcixBUFAuR2FtZUNvbnRyb2xlci5TaG93Q2hhcmFjdGVyUGFuZWwpO1xyXG4gICAgICAgIHRoaXMuX1NldFBhbmVsLm9uKExheWEuRXZlbnQuQ0xJQ0ssQVBQLkdhbWVDb250cm9sZXIsQVBQLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TdGFydC5vbihMYXlhLkV2ZW50LkNMSUNLLEFQUC5HYW1lQ29udHJvbGVyLEFQUC5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9ICAgICAgICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50ZXJHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJFbnRlckdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOkV4dGVuZEVudGVyR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUk9IG5ldyBFeHRlbmRFbnRlckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHZhciB1aU1ncjpVSU1hbmFnZXIgPSB0aGlzLl9VSU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0NoYXJhY3Rlckxpc3Qub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57IHVpTWdyLlNob3c8UGxheWVyTGlzdFVJPihQbGF5ZXJMaXN0VUkpfSk7XHJcbiAgICB9XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog5Zy65pmvVUlcclxuICovXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IEl0ZW1MaXN0VUkgZnJvbSBcIi4vSXRlbUxpc3RVSVwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmNsYXNzIEV4dGVuZHNHYW1lVUkgZXh0ZW5kcyB1aS5HYW1lVUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBTZXRDb3VudFRpbWUoaW5mbzpzdHJpbmcgPVwiXCIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lLnRleHQgPWluZm87XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHJpdmF0ZSBfVUk6RXh0ZW5kc0dhbWVVSTtcclxuICAgIC8vXHJcbiAgICBEaXN0YW5jZVN0cjpBcnJheTxzdHJpbmc+O1xyXG4gICAgR29sZE51bVN0cjpBcnJheTxzdHJpbmc+O1xyXG4gICAgX0dvbGQ6bnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fSXNNdXRleCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kc0dhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX0dvbGQgPSAwO1xyXG4gICAgICAgIHZhciBvcElzUmlnaHQgPSBBUFAuR2FtZUNvbnRyb2xlci5TZXRJbmZvLk9QSXNSaWdodDtcclxuICAgICAgICB0aGlzLl9VSS5fUmlnaHRIYW5kQnRuTGlzdC52aXNpYmxlID0gb3BJc1JpZ2h0O1xyXG4gICAgICAgIHRoaXMuX1VJLl9JdGVtTGlzdEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgdGhpcy5fVUlNYW5hZ2VyLlNob3c8SXRlbUxpc3RVST4oSXRlbUxpc3RVSSl9KVxyXG4gICAgICAgIHRoaXMuU2V0Q291bnRUaW1lKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5EaXN0YW5jZVN0cj0gdGhpcy5fVUkuX1R4dERpc3RhbmNlLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHJbMV0gPSBcIjBcIlxyXG4gICAgICAgIHRoaXMuX1Nob3dEaXN0YW5jZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuR29sZE51bVN0ciA9IHRoaXMuX1VJLl9UeHRHb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IFwiMFwiO1xyXG4gICAgICAgIHRoaXMuX1Nob3dHb2xkTnVtKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5TaG93SW5wdXRJbmZvKFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1Nob3dEaXN0YW5jZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1R4dERpc3RhbmNlLnRleHQgPSB0aGlzLkRpc3RhbmNlU3RyWzBdK3RoaXMuRGlzdGFuY2VTdHJbMV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgX1Nob3dHb2xkTnVtKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0R29sZC50ZXh0ID0gdGhpcy5Hb2xkTnVtU3RyWzBdICsgdGhpcy5Hb2xkTnVtU3RyWzFdO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIEFkZEdvbGQoZ29sZE51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fR29sZCs9IGdvbGROdW07XHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyWzFdID0gdGhpcy5fR29sZC50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuX1Nob3dHb2xkTnVtKCk7XHJcbiAgICB9XHJcbiAgICBTZXRMZWZ0VG91Y2gob3duZXI6YW55LExpc3RlbmVyOigpPT52b2lkKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JpZ2h0X0xlZnRUb3VjaC5vbihMYXlhLkV2ZW50LkNMSUNLLG93bmVyLExpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRSaWdodFRvdWNoKG93bmVyOmFueSxMaXN0ZW5lcjooKT0+dm9pZCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9SaWdodF9SaWdodFRvdWNoLm9uKExheWEuRXZlbnQuQ0xJQ0ssb3duZXIsTGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldENvdW50VGltZShpbmZvOnN0cmluZyA9XCJcIilcclxuICAgIHtcclxuICAgICAgICBpZihpbmZvPT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5TZXRDb3VudFRpbWUoaW5mbyk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9Db3VudERvd25VSS52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZVBhbmVsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0IEdhbWVQYW5lbCh2YWx1ZTpib29sZWFuKVxyXG4gICAgeyBcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZVBhbmVsLnZpc2libGUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCBEaXN0YW5jZSh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5EaXN0YW5jZVN0clsxXSA9IHZhbHVlLnRvRml4ZWQoMik7XHJcbiAgICAgICAgdGhpcy5fU2hvd0Rpc3RhbmNlKCk7XHJcbiAgICB9XHJcbiAgICBzZXQgR29sZE51bSh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyWzFdID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLl9TaG93R29sZE51bSgpO1xyXG4gICAgfVxyXG4gICAgU2hvd0lucHV0SW5mbyhpbmZvOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZUluZm8udGV4dCA9IGluZm87XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5cclxuXHJcbmNsYXNzIEV4dGVuZHNJdGVtTGlzdFVJIGV4dGVuZHMgdWkuSXRlbUxpc3RVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVzOkpTT04gPSBMYXlhLmxvYWRlci5nZXRSZXMoXCJyZXMvdWlqc29uL0l0ZW1MaXN0Lmpzb25cIik7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KHJlcyk7XHJcbiAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgIH1cclxuICAgIFNldExpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsaXN0QXJyYXk6QXJyYXk8YW55PiA9IFtcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiXTtcclxuICAgICAgICB0aGlzLl9MaXN0LmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9MaXN0LnJlbmRlckhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsdGhpcy5fUmVuZGVySGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fTGlzdC5hcnJheSA9IGxpc3RBcnJheTtcclxuICAgICAgICB0aGlzLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljRGlzdGFuY2UgPSA1MFxyXG4gICAgfVxyXG4gICAgQnRuTGlzdGVuZXI6TWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBwcml2YXRlIF9SZW5kZXJIYW5kbGVyKGNlbGw6TGF5YS5Cb3gsaW5kZXg6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJvbGVFbGVtZW50Okl0ZW1FbGVtZW50ID0gY2VsbCBhcyBJdGVtRWxlbWVudDtcclxuICAgICAgICByb2xlRWxlbWVudC5TZXRCdG4odGhpcy5CdG5MaXN0ZW5lci5MaXN0ZW5lcix0aGlzLkJ0bkxpc3RlbmVyLkFjdGlvbik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUxpc3RVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkl0ZW1MaXN0VUlcIjtcclxuICAgIH1cclxuICAgIFVJOkV4dGVuZHNJdGVtTGlzdFVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5VSSA9IG5ldyBFeHRlbmRzSXRlbUxpc3RVSSgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5VSSk7XHJcbiAgICAgICAgdGhpcy5VSS5CdG5MaXN0ZW5lciA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUodGhpcywoKT0+eyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2UodGhpcyl9KVxyXG4gICAgICAgIHRoaXMuVUkuU2V0TGlzdCgpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBJdGVtRWxlbWVudCBleHRlbmRzIExheWEuQm94XHJcbiAgICB7XHJcbiAgICAgICAgLy9cclxuICAgICAgICBJZHg6bnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX0J0bjpMYXlhLkJ1dHRvbjtcclxuICAgICAgICBnZXQgQnRuKCk6TGF5YS5CdXR0b25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0J0biA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9CdG4gPSB0aGlzLmdldENoaWxkQXQoMSkgYXMgTGF5YS5CdXR0b247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgICAgICB9XHJcbiAgICAgICAgU2V0QnRuKG93bmVyOmFueSxsaXN0ZW5lcjooKT0+dm9pZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssb3duZXIsbGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSIsImltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuXHJcbmNsYXNzIEV4dGVuZFBsYXllckxpc3QgZXh0ZW5kcyB1aS5QbGF5ZXJMaXN0VUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJMaXN0VUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJQbGF5ZXJMaXN0VUlcIjtcclxuICAgIH1cclxuXHJcbiAgICBfVUk6RXh0ZW5kUGxheWVyTGlzdDtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kUGxheWVyTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SZXR1cm5NYWluLm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+e1xyXG4gICAgICAgICAgICBHdWlkZXJNYW5hZ2VyLk1nci5FbnRlclNjZW5lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcblxyXG5jbGFzcyBFeHRlbmRzU2V0UGFuZWxVSSBleHRlbmRzIHVpLlNldFBhbmVsVUkge1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJTZXRQYW5lbFwiKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL3RoaXMuX1JldHVybi5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntBUFAuVUlNYW5hZ2VyLkNsb3NlQ3VyVmlldygpfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNTZXRQYW5lbFVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzU2V0UGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4geyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7IEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKSB9KTtcclxuICAgICAgICB0aGlzLlNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNldFBhbmVsVUlcIjtcclxuICAgIH1cclxuICAgIFNldFBhbmVsKCkge1xyXG4gICAgICAgIHZhciBpbmZvOiBHYW1lU3RydWN0LlNldEluZm8gPSBBUFAuR2FtZUNvbnRyb2xlci5HZXRTZXRJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5fVUkuX0F1ZGlvU3dpdGNoLnNlbGVjdGVkSW5kZXggPSBpbmZvLkF1ZGlvT24gPyAwIDogMTtcclxuICAgICAgICB0aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uT1BJc1JpZ2h0ID8gMSA6IDA7XHJcbiAgICAgICAgdGhpcy5fVUkuX1RleHQudGV4dCA9IGluZm8uVGV4dEluZm87XHJcbiAgICB9XHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICBpbmZvLkF1ZGlvT24gPSB0aGlzLl9VSS5fQXVkaW9Td2l0Y2guc2VsZWN0ZWRJbmRleCA9PSAwO1xyXG4gICAgICAgIGluZm8uT1BJc1JpZ2h0ID0gdGhpcy5fVUkuX09QU3dpdGNoLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICBBUFAuR2FtZUNvbnRyb2xlci5TYXZlU2V0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZU9QKCkge1xyXG4gICAgICAgIHRoaXMuU2F2ZVBhbmVsKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi9CYXNlVUlcIlxyXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xyXG5cclxubW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Qcm9ncmVzczpMYXlhLlByb2dyZXNzQmFyO1xyXG5cdFx0cHVibGljIF9HdWlkZXI6TGF5YS5JbWFnZTtcclxuXHRcdHB1YmxpYyBfRW50ZXI6TGF5YS5CdXR0b247XHJcblx0XHRwdWJsaWMgRXJyb3JJbmZvOkxheWEuTGFiZWw7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkxvYWRpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFeHRMb2FkaW5nVUkgZXh0ZW5kcyB1aS5Mb2FkaW5nVUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMoXCJ1aS9Mb2FkVUkuanNvblwiKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ1VJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgXCJMb2FkaW5nVUlcIjtcclxuICAgIH1cclxuICAgIF9VSTp1aS5Mb2FkaW5nVUk7XHJcbiAgICBfQ2FsbEJhY2s6KCk9PnZvaWQ7XHJcbiAgICBjb25zdHJ1Y3RvciggbmFtZTpzdHJpbmcgKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIC8vdGhpcy5fVUkgPW5ldyB1aS5Mb2FkaW5nVUkoKTtcclxuICAgICAgICB0aGlzLl9VSSA9bmV3IEV4dExvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkgKTtcclxuICAgICAgICB0aGlzLlZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci52aXNpYmxlID1mYWxzZTtcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuX0NhbGxCYWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgeDpudW1iZXIgPSAwO1xyXG4gICAgICAgIHggKz0gdGhpcy5fVUkuX1Byb2dyZXNzLndpZHRoKnRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZTtcclxuICAgICAgICB0aGlzLl9VSS5fR3VpZGVyLnBvcyh4LHRoaXMuX1VJLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBWYWx1ZShudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZSA9IG51bTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIENvbXBsZXRlKGNhbGxCYWNrOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0NhbGxCYWNrID0gY2FsbEJhY2s7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5sYWJlbCA9IFwiRW50ZXJcIjsvL3RoaXMuX05hbWVbMF07XHJcbiAgICB9XHJcbiAgICBSZWxvYWQoY2FsbEJhY2s6KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuRXJyb3JJbmZvLnZpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Hb2xkRGlzOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9MaXN0OkxheWEuTGlzdDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkNoYXJhY3RlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW5kR2FtZVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfR2FtZUluZm86TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1N0YXJ0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTWVudWVCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9TZXRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QbGF5ZXJMaXN0QnRuOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiRW5kR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW50ZXJVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1N0YXJ0OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUGFuZWw6TGF5YS5QYW5lbDtcblx0XHRwdWJsaWMgX1NldFBhbmVsOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyTGlzdDpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVudGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Db3VudERvd25VSTpMYXlhLkJveDtcblx0XHRwdWJsaWMgX0l0ZW1MaXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ291bnRUaW1lOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lUGFuZWw6TGF5YS5Cb3g7XG5cdFx0cHVibGljIF9UeHREaXN0YW5jZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfVXNlSXRlbTpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1R4dEdvbGQ6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1JpZ2h0SGFuZEJ0bkxpc3Q6TGF5YS5Cb3g7XG5cdFx0cHVibGljIF9SaWdodF9MZWZ0VG91Y2g6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SaWdodF9SaWdodFRvdWNoOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfR2FtZUluZm86TGF5YS5MYWJlbDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkdhbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEl0ZW1MaXN0VUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9MaXN0OkxheWEuTGlzdDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkl0ZW1MaXN0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJMaXN0VUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9QbGF5ZXJMaXN0OkxheWEuTGlzdDtcblx0XHRwdWJsaWMgX1JldHVybk1haW46TGF5YS5CdXR0b247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJQbGF5ZXJMaXN0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBTZXRQYW5lbFVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfVGV4dDpMYXlhLlRleHRBcmVhO1xuXHRcdHB1YmxpYyBfUmV0dXJuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQXVkaW9Td2l0Y2g6TGF5YS5SYWRpb0dyb3VwO1xuXHRcdHB1YmxpYyBfT1BTd2l0Y2g6TGF5YS5SYWRpb0dyb3VwO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiU2V0UGFuZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHIiXX0=
