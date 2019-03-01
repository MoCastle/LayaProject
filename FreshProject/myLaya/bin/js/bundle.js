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
        _this._BGLayer = new Laya.Sprite();
        Laya.stage.addChild(_this._BGLayer);
        //添加场景管理
        _this.SceneNode = Laya.stage.addChild(new Laya.Sprite());
        return _this;
    }
    Object.defineProperty(SceneManager.prototype, "BG", {
        set: function (bg) {
            if (!bg) {
                return;
            }
            if (this._BG) {
                this._BG.removeSelf;
                this._BG.destroy();
                this._BG = bg;
            }
            this._BG = bg;
            this._BG.width = Laya.stage.width;
            this._BG.height = Laya.stage.height;
            this._BGLayer.addChild(this._BG);
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.Name = function () {
        return "SceneManager";
    };
    Object.defineProperty(SceneManager.prototype, "CurScene", {
        get: function () {
            return this._CurScene;
        },
        set: function (value) {
            if (this._CurScene && this._CurScene.Scene) {
                this._CurScene.Scene.removeSelf();
            }
            this._CurScene = value;
            if (this._CurScene && this._CurScene.Scene) {
                this.SceneNode.addChild(this._CurScene.Scene);
            }
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
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var RoleElement_1 = require("./script/RoleElement");
var ItemElement_1 = require("./script/ItemElement");
/*
* 游戏初始化配置;
*/
var GameConfig = /** @class */ (function () {
    function GameConfig() {
    }
    GameConfig.init = function () {
        var reg = Laya.ClassUtils.regClass;
        reg("script/RoleElement.ts", RoleElement_1.default);
        reg("script/ItemElement.ts", ItemElement_1.default);
    };
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Game.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/ItemElement":31,"./script/RoleElement":32}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APP_1 = require("./../controler/APP");
var GameControler_1 = require("./../controler/GameControler");
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
            GameControler_1.default.GameControler.GameDir.AddLogicGold(1);
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
},{"./../controler/APP":29,"./../controler/GameControler":30}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameItem_1 = require("./GameItem");
var PlayerCtrler_1 = require("./../Game/PlayerCtrler");
var Input_1 = require("./Input");
var APP_1 = require("./../controler/APP");
var GameControler_1 = require("./../controler/GameControler");
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
            this._BuffMod = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(0.3, 8, 8));
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
            this._FinalZ = player.Position.z - GameControler_1.default.GameControler.StepDistance / 2 * this.Floor;
            var flyCtrl = new PlayerCtrler_1.PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player);
            player.AddCtrler(flyCtrl);
            GameControler_1.default.GameControler.GameDir.AddInputCtrler(new Input_1.Input.DIYInput());
            GameControler_1.default.GameControler.GameDir.SetSafePS(this._FinalLocation);
        };
        FlyBuff.prototype.Update = function () {
            if (this.Player == null) {
                return;
            }
            if (this._FinalZ - this.Player.Position.z > -0.2) {
                var step = GameControler_1.default.GameControler.GameDir.GetStepByLocation(this._FinalLocation);
                this.Player.LayStep(step);
                this.Player.BaseCtrler.StartMove();
                this.Player.PopCtrler();
                GameControler_1.default.GameControler.GameDir.PopInputCtrler();
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
            GameControler_1.default.GameControler.GameDir.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
        };
        VineBuff.prototype.Complete = function () {
            GameControler_1.default.GameControler.GameDir.PopInputCtrler();
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
            GameControler_1.default.GameControler.GameDir.ShowInputInfo(info);
        };
        return VineBuff;
    }(BasePlayerBuff));
})(PlayerBuff = exports.PlayerBuff || (exports.PlayerBuff = {}));
},{"./../Game/PlayerCtrler":18,"./../controler/APP":29,"./../controler/GameControler":30,"./GameItem":13,"./Input":15}],12:[function(require,module,exports){
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
        var skyBox = new Laya.SkyBox();
        _this.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        return _this;
        //Camera.skyRenderer = skyBox._render;
        //this.sk = skyBox;
        //path
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
},{}],13:[function(require,module,exports){
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
var GameControler_1 = require("./../controler/GameControler");
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
            this.BarrierList.push(new LayItemMgr(10, 8, ItemType.Empty, 10));
            this.BarrierList.push(new LayItemMgr(10, 8, ItemType.Rock, 10));
            this.BarrierList.push(new LayItemMgr(10, 8, ItemType.Thorn, 10));
            this.BarrierList.push(new LayItemMgr(10, 10, ItemType.Protect, 10));
            this.BarrierList.push(new LayItemMgr(15, 1, ItemType.Vine));
            this.RewardList.push(new LayItemMgr(10, 2, ItemType.Fly));
            this.RewardList.push(new LayItemMgr(10, 3, ItemType.Coin));
            //this.RewardList.push(new LayItemMgr(10,1,ItemType.Collector))
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
            this.FllorMark = 0;
        }
        //层更新函数
        LayItemMgr.prototype.OnFloor = function (floor) {
            if (floor < this.FllorMark) {
                this.StartFloor = floor;
                this.GenMap();
            }
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
            this.FllorMark = floor;
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
            var ps = new Laya.Vector3(0, GameControler_1.default.GameControler.StepLength, 0);
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
            var Name = Path_1.path.GetLH("L01_spr_barrier_0" + idx);
            model = Laya.loader.getRes(Name);
            model = model.clone();
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
            var name = Path_1.path.GetLH("trap_sting_01");
            var model = Laya.loader.getRes(name).clone();
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
            var name = Path_1.path.GetLH("item_shield_01");
            var model = Laya.loader.getRes(name).clone();
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
            GameControler_1.default.GameControler.GameDir.AddGoldUnLogicGold(1);
            this.PutItem();
        };
        Coin.prototype.TouchItem = function (player) {
            GameControler_1.default.GameControler.GameDir.AddGold(1);
            this.PutItem();
        };
        //由父类统一管理模型生成
        Coin.prototype._GenItemModel = function (ps) {
            var name = Path_1.path.GetLH("item_coin_01");
            var model = Laya.loader.getRes(name).clone();
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
            _this.GameDir = GameControler_1.default.GameControler.GameDir;
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
            var Idx = Math.floor(1 + Math.random() * 2);
            var name = Path_1.path.GetLH("item_flyer_01");
            var model = Laya.loader.getRes(name).clone();
            ps.y += 0.3;
            model.transform.position = ps;
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
            if (player.CurStep == null) {
                this.Complete();
            }
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - GameControler_1.default.GameControler.StepDistance / 2 * this.Floor;
            var flyCtrl = new PlayerCtrler_1.PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player);
            player.AddCtrler(flyCtrl);
            GameControler_1.default.GameControler.GameDir.AddInputCtrler(new Input_1.Input.DIYInput());
            GameControler_1.default.GameControler.GameDir.SetSafePS(this._FinalLocation);
            player.FlyPrepare();
        };
        FlyBuff.prototype.Update = function () {
            if (this.Player == null) {
                return;
            }
            if (this._FinalZ - this.Player.Position.z > -0.2) {
                var step = GameControler_1.default.GameControler.GameDir.GetStepByLocation(this._FinalLocation);
                this.Player.LayStep(step);
                this.Player.BaseCtrler.StartMove();
                this.Player.PopCtrler();
                GameControler_1.default.GameControler.GameDir.PopInputCtrler();
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
                var step = GameControler_1.default.GameControler.GameDir.GetStepByLocation(this._FinalLocation);
                this.End(step);
            }
        };
        RopeBuff.prototype.End = function (step) {
            this.Player.LayStep(step);
            this.Player.BaseCtrler.StartMove();
            this.Player.PopCtrler();
            GameControler_1.default.GameControler.GameDir.PopInputCtrler();
            _super.prototype.Complete.call(this);
        };
        RopeBuff.prototype.Start = function (player) {
            _super.prototype.Start.call(this, player);
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - GameControler_1.default.GameControler.StepDistance / 2 * this.Floor;
            var flyCtrl = new PlayerCtrler_1.PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player);
            player.AddCtrler(flyCtrl);
            GameControler_1.default.GameControler.GameDir.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
            GameControler_1.default.GameControler.GameDir.SetSafePS(this._FinalLocation);
        };
        RopeBuff.prototype._Input = function (isRight) {
            var closeFloor = GameControler_1.default.GameControler.GameDir.PlayerFloorLine;
            if (closeFloor.FloorNum % 2 != this._FinalLocation.Y % 2) {
                closeFloor = GameControler_1.default.GameControler.GameDir.GetFloorByFloor(closeFloor.FloorNum + 1);
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
            var Idx = Math.floor(1 + Math.random() * 2);
            var name = Idx == 1 ? Path_1.path.GetLH("trap_entangle_01") : Path_1.path.GetLH("trap_chomper_01");
            var model = Laya.loader.getRes(name).clone();
            model.transform.position = ps;
            this.Model = model;
        };
        return Vine;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Vine] = Vine;
    var VineBuff = /** @class */ (function (_super) {
        __extends(VineBuff, _super);
        function VineBuff(countTime, inputDir) {
            if (countTime === void 0) { countTime = 4; }
            if (inputDir === void 0) { inputDir = true; }
            var _this = _super.call(this, ItemType.Vine, 0) || this;
            _this.CountTime = countTime;
            _this.InputDir = inputDir;
            _this._ShowGameInfo();
            return _this;
        }
        VineBuff.prototype.Start = function (player) {
            _super.prototype.Start.call(this, player);
            GameControler_1.default.GameControler.GameDir.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
        };
        VineBuff.prototype.Complete = function () {
            GameControler_1.default.GameControler.GameDir.PopInputCtrler();
            _super.prototype.Complete.call(this);
        };
        VineBuff.prototype._Input = function (isRight) {
            if (this.InputDir == isRight) {
                this.InputDir = !this.InputDir;
                --this.CountTime;
            }
            if (this.CountTime <= 0) {
                this.Complete();
            }
            this._ShowGameInfo();
        };
        VineBuff.prototype._ShowGameInfo = function () {
            var info;
            if (this.CountTime <= 0)
                info = "";
            else
                info = this.InputDir == true ? "Right" : "Left";
            GameControler_1.default.GameControler.GameDir.ShowInputInfo(info);
        };
        return VineBuff;
    }(Buff_1.PlayerBuff.BasePlayerBuff));
})(Item = exports.Item || (exports.Item = {}));
},{"./../FrameWork/MessageCenter":6,"./../Game/AnimObj":10,"./../Utility/Path":27,"./../controler/APP":29,"./../controler/GameControler":30,"./Buff":11,"./GameStruct":14,"./Input":15,"./PlayerCtrler":18}],14:[function(require,module,exports){
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
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Step_1 = require("./Step");
var GameControler_1 = require("./../controler/GameControler");
/**作者:Mo
*场景内对象
*/
//管理一整行
var MountLine = /** @class */ (function (_super) {
    __extends(MountLine, _super);
    function MountLine(lineIdx, floor) {
        if (floor === void 0) { floor = 0; }
        var _this = this;
        var columns = GameControler_1.default.GameControler.LineStepNum;
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
        var stepLength = GameControler_1.default.GameControler.StepLength;
        var stepDistance = GameControler_1.default.GameControler.StepDistance;
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
},{"./../controler/GameControler":30,"./Step":19}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerCtrler_1 = require("./PlayerCtrler");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var APP_1 = require("./../controler/APP");
var Path_1 = require("../Utility/Path");
var GameControler_1 = require("./../controler/GameControler");
var GameItem_1 = require("./GameItem");
var num = 0;
//该脚本用于游戏玩家对象管理
//玩家对象
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        var Name = Path_1.path.GetLH("c001_child_01");
        var PlayerModel = Laya.Loader.getRes(Name);
        var secondPlayer = PlayerModel.clone();
        _this.addChild(secondPlayer);
        APP_1.default.SceneManager.CurScene.PutObj(_this);
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
        newPS.y += GameControler_1.default.GameControler.StepLength;
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
        if ((this.CurStep.StepItem.ItemType == GameItem_1.Item.ItemType.None) && (this.CurStep.IsEmpty || (this.CurStep.LeftParent && this.CurStep.RightParent && this.CurStep.LeftParent.StepItem.IsForbiden && this.CurStep.RightParent.StepItem.IsForbiden))) {
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
    Player.prototype._Update = function () {
        this._Ctrler.Update();
        for (var buffIdx = 0; buffIdx < 2; ++buffIdx) {
            if (this.BuffArr[buffIdx] != null || this.BuffArr[buffIdx] != undefined)
                this.BuffArr[buffIdx].Update();
        }
    };
    Player.prototype.FlyPrepare = function () {
        this.CurStep = null;
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
    return Player;
}(Laya.Sprite3D));
exports.default = Player;
var StepData = /** @class */ (function () {
    function StepData() {
    }
    StepData.prototype.GetData = function (step) {
    };
    return StepData;
}());
},{"../Utility/Path":27,"./../FrameWork/MessageCenter":6,"./../controler/APP":29,"./../controler/GameControler":30,"./GameItem":13,"./PlayerCtrler":18}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APP_1 = require("./../controler/APP");
var GameControler_1 = require("./../controler/GameControler");
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
            this.Time = APP_1.default.SceneManager.CurScene.CurDir.GameTime + GameControler_1.default.GameControler.PlayerMoveTime;
        };
        PlayerNormCtrler.prototype._Update = function () {
            if (this.Time > 0) {
                if (this.Time <= APP_1.default.SceneManager.CurScene.CurDir.GameTime) {
                    this.Time = -1;
                    this.player.SetStep(this.player.CurStep);
                    return;
                }
                else {
                    var lastTime = this.Time - Laya.timer.currTimer;
                    var rate = (1 - lastTime / GameControler_1.default.GameControler.PlayerMoveTime);
                    var StepPs = this.player.CurStep.Position;
                    StepPs.y += GameControler_1.default.GameControler.StepLength;
                    var curps = this.player.Position;
                    curps.y += GameControler_1.default.GameControler.StepLength;
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
            player.Translate(new Laya.Vector3(0, GameControler_1.default.GameControler.StepLength, 0));
        };
        PlayerFly.prototype._Update = function () {
            if (this.player == null) {
                return;
            }
            var vector = new Laya.Vector3(0, GameControler_1.default.GameControler.StepLength, -1 * GameControler_1.default.GameControler.StepDistance / 2);
            Laya.Vector3.scale(vector, this.Speed, vector);
            this.player.Translate(vector);
        };
        return PlayerFly;
    }(BasePlayerCtrler));
    PlayerControler.PlayerFly = PlayerFly;
})(PlayerControler = exports.PlayerControler || (exports.PlayerControler = {}));
},{"./../controler/APP":29,"./../controler/GameControler":30}],19:[function(require,module,exports){
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
        APP_1.default.SceneManager.CurScene.PutObj(_this);
        var Idx = Math.floor(1 + Math.random() * Step.stepModelNum);
        var name = Path_1.path.GetLH("L01_spr_plat_0" + Idx);
        var model = Laya.loader.getRes(name);
        //var model:Laya.Sprite3D = new Laya.MeshSprite3D( Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5)) ;//loader.getRes(name);
        var cloneModel = model.clone();
        cloneModel.transform.position = new Laya.Vector3();
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
},{"./../Utility/Path":27,"./../controler/APP":29,"./GameItem":13,"./GameStruct":14}],20:[function(require,module,exports){
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
var GameConfig_1 = require("./GameConfig");
var Game = /** @class */ (function () {
    function Game() {
        var ss = APP_1.default;
        Laya3D.init(0, 0);
        GameConfig_1.default.init();
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM;
        //开启统计信息
        Laya.Stat.show();
        var resCol = [{ url: "ui/Resource/LoadUI.json", type: Laya.Loader.JSON }, { url: "ui/Resource/localcomp.atlas", type: Laya.Loader.ATLAS }];
        Laya.loader.load(resCol, Laya.Handler.create(this, this.onLoaded));
    }
    Game.prototype.onLoaded = function () {
        this._Frame = FrameWork_1.default.FM;
        this._Frame.AddManager(MessageCenter_1.MessageMD.MessageCenter);
        var sceneMgr = this._Frame.AddManager(SceneManager_1.default);
        this._Frame.AddManager(UIManager_1.default);
        sceneMgr.EnterScene(new LoadScene_1.default());
        Laya.timer.frameLoop(1, this, this.Update);
    };
    Game.prototype.Update = function () {
        //this.SceneMgr.Update();
        this._Frame.Update();
    };
    return Game;
}());
var GM = new Game();
},{"./FrameWork/FrameWork":5,"./FrameWork/MessageCenter":6,"./FrameWork/SceneManager":7,"./FrameWork/UIManager":8,"./GameConfig":9,"./Scene/LoadScene":26,"./controler/APP":29}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FrameWork_1 = require("./../FrameWork/FrameWork");
var UIManager_1 = require("./../FrameWork/UIManager");
var LifeObj_1 = require("./../Base/LifeObj");
var APP_1 = require("./../controler/APP");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
//导演基类
var BaseDirector = /** @class */ (function (_super) {
    __extends(BaseDirector, _super);
    function BaseDirector() {
        var _this = _super.call(this) || this;
        _this._TimeUpCount = 0;
        _this._StartGameTime = 0;
        _this._TimeUpClock = -1;
        _this._UIMgr = FrameWork_1.default.FM.GetManager(UIManager_1.default);
        _this.SceneMgr = APP_1.default.SceneManager;
        _this._BG = APP_1.default.SceneManager.BG;
        return _this;
    }
    BaseDirector.prototype._Leave = function () {
        APP_1.default.MessageManager.DesRgistIDK(MessageCenter_1.MessageMD.GameEvent.GameTimeUp);
        APP_1.default.MessageManager.DesRgistIDK(MessageCenter_1.MessageMD.GameEvent.GameContinue);
        _super.prototype._Leave.call(this);
    };
    BaseDirector.prototype.TimeUp = function () {
        if (this._TimeUpClock <= 0) {
            //APP.MessageCenter.Trigger(GameEvent.GameTimeUp);
            this._TimeUpClock = Laya.timer.currTimer;
        }
    };
    BaseDirector.prototype.Update = function () {
        if (this._TimeUpClock <= 0) {
            _super.prototype.Update.call(this);
        }
    };
    BaseDirector.prototype.ContinueTime = function () {
        //APP.MessageCenter.Trigger(GameEvent.GameContinue);
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
        this._UIMgr.Clear();
        _super.prototype._StartComplete.call(this);
    };
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
    return BaseDirector;
}(LifeObj_1.default));
exports.default = BaseDirector;
},{"./../Base/LifeObj":3,"./../FrameWork/FrameWork":5,"./../FrameWork/MessageCenter":6,"./../FrameWork/UIManager":8,"./../controler/APP":29}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FrameWork_1 = require("./../FrameWork/FrameWork");
var UIManager_1 = require("./../FrameWork/UIManager");
var LifeObj_1 = require("./../Base/LifeObj");
var LifeObj_2 = require("./../Base/LifeObj");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var APP_1 = require("./../controler/APP");
//场景基类
var BaseScene = /** @class */ (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super.call(this) || this;
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
        if (!this.IsLoadComplete && !this.IsLoading) {
            this.StartLoad();
            if (this._LoadCallBack == null) {
                this._LoadCallBack = this._Start;
            }
        }
        else if (!this.IsLoading)
            this._Start();
    };
    //放对象
    BaseScene.prototype.PutObj = function (node) {
        if (node == null) {
            console.log("BaseScene PutObj Error:empty Sprite3D");
        }
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
        APP_1.default.SceneManager.CurScene = this._NextScene;
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
        _super.prototype._Start.call(this);
        if (this.Scene) {
            APP_1.default.SceneManager.CurScene = this;
        }
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
},{"./../Base/LifeObj":3,"./../FrameWork/FrameWork":5,"./../FrameWork/MessageCenter":6,"./../FrameWork/UIManager":8,"./../controler/APP":29}],23:[function(require,module,exports){
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
var GameControler_1 = require("./../controler/GameControler");
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
    //从某一层开始一层层重新摆放道具
    GameDirector.prototype.ResetItem = function (floor) {
        for (var floor_1; floor_1 <= this.HeadFloor.FloorNum; ++floor_1) {
            var floorLine = this.GetFloorByFloor(floor_1);
            this.LoopDoFloorStep(floor_1, this, this.ClearFloor);
            this._PutItemInLine(floor_1);
        }
    };
    //清理层道具
    GameDirector.prototype.ClearFloor = function (step) {
        var stepItem = step.StepItem;
        step.PutItem(ItemType.None);
        step.IsDeadRoad = false;
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
            return Math.abs((this.Player.Position.z - this._StartPosition.z) / (GameControler_1.default.GameControler.StepDistance / 2));
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
        if (step == null) {
            return;
        }
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
            floor = Math.round(floor / (GameControler_1.default.GameControler.StepDistance / 2));
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
        APP_1.default.SceneManager.CurScene.PutObj(this.Camera);
        this.MountLines = [];
        var maxLineNum = GameControler_1.default.GameControler.MaxLineNum;
        for (var lineIdx = maxLineNum - 1; lineIdx >= 0; --lineIdx) {
            var newMountLine = new MountLine_1.default(lineIdx, lineIdx);
            APP_1.default.SceneManager.CurScene.PutObj(newMountLine);
            this.MountLines[lineIdx] = newMountLine;
        }
        //创建UI
        var dir = this;
        //创建玩家
        this.Player = new Player_1.default();
        APP_1.default.SceneManager.CurScene.PutObj(this.Player);
        //准备玩家死亡事件
        APP_1.default.MessageManager.Regist(MessageCenter_1.MessageMD.GameEvent.PlayerDeath, this.Death, this);
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
                var PlayerStep = line.GetStep(Math.floor(line.LogicLength / 2));
                this.Player.SetStep(PlayerStep);
                this._SafeLocation = PlayerStep.Location;
                this._StartPosition = this.Player.LogicPosition.clone();
            }
            this._PutItemInLine(idx);
        }
        this.Camera.Reset(new Laya.Vector3(), new Laya.Vector3(this.Player.Position.x, GameControler_1.default.GameControler.StepLength * 10.5, GameControler_1.default.GameControler.StepLength * 9), this.Player);
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
    };
    //正常运行时的每帧逻辑
    GameDirector.prototype._RunGameUpdate = function () {
        this.PanelUI.Distance = this.PlayerDistance;
        var flooVector = this.TailFLoor.Position;
        if (flooVector.z - this.Player.Position.z > 3 * GameControler_1.default.GameControler.StepDistance / 2) {
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
        if (floor >= this._SafeLocation.Y + GameControler_1.default.GameControler.MaxLineNum) {
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
        if (floor == this._SafeLocation.Y)
            this._ResetStepInfo(lastFloor);
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
        if (floor == this._SafeLocation.Y) {
            var safeStep = thisFloor.GetStep(this._SafeLocation.X);
            safeStep.IsDeadRoad = false;
        }
        return safeStepList;
    };
    GameDirector.prototype._ResetStepInfo = function (thisFloor) {
        if (!thisFloor) {
            return;
        }
        for (var logicIdx = 0; logicIdx < thisFloor.LogicLength; ++logicIdx) {
            var step = thisFloor.GetStep(logicIdx);
            step.IsDeadRoad = true;
        }
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
        if (this.SafeLocation.Y < 1 || this.SafeLocation.Y < floor || this.SafeLocation.Y + 1 > floor) {
            var lineBarriers = this.ItemLayout.TakeLineDifficulty(floor);
            this.CurLineBarriers = this.CurLineBarriers.concat(lineBarriers);
        }
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
},{"./../FrameWork/MessageCenter":6,"./../Game/GameCamera":12,"./../Game/GameItem":13,"./../Game/GameStruct":14,"./../Game/Input":15,"./../Game/MountLine":16,"./../Game/Player":17,"./../controler/APP":29,"./../controler/GameControler":30,"./../ui/EndGameUI":36,"./../ui/GameUI":38,"./BaseDirector":21}],24:[function(require,module,exports){
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
        Laya.loader.load([Path_1.path.GetDepathUIJS("PlayerList"), Path_1.path.GetDepathUIJS("Game"), Path_1.path.GetDepathUIJS("EndGame")], Laya.Handler.create(this, this._LoadComplete));
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
        this.Scene = new Laya.Scene3D();
        this.Scene.ambientColor = new Laya.Vector3(1, 1, 1);
        _super.prototype._LoadComplete.call(this);
    };
    return GameScene;
}(BaseScene_1.default));
exports.default = GameScene;
},{"./../FrameWork/MessageCenter":6,"./../Game/GameItem":13,"./../Utility/Path":27,"./BaseScene":22,"./GameDirector":23}],25:[function(require,module,exports){
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
        Laya.loader.load([{ url: Path_1.path.GetDepathUIJS("Enter"), type: Laya.Loader.JSON }, { url: Path_1.path.GetDepathUIJS("ItemList"), type: Laya.Loader.JSON }, { url: Path_1.path.GetAtlPath("comp"), type: Laya.Loader.ATLAS }], Laya.Handler.create(this, this._LoadComplete));
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
},{"./../FrameWork/FrameWork":5,"./../FrameWork/SceneManager":7,"./../FrameWork/UIManager":8,"./../Utility/Path":27,"./../ui/EnterGameUI":37,"./BaseDirector":21,"./BaseScene":22}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseScene_1 = require("./BaseScene");
var BaseDirector_1 = require("./BaseDirector");
var LoadingUI_1 = require("./../ui/UnDownload/LoadingUI");
var GuiderManager_1 = require("./GuiderManager");
var Path_1 = require("./../Utility/Path");
var APP_1 = require("./../controler/APP");
var BG_1 = require("./../ui/BG");
var LoadScene = /** @class */ (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        return _super.call(this) || this;
    }
    LoadScene.prototype._GenDir = function () {
        this.CurDir = new LoadDirctor();
    };
    LoadScene.prototype.StartLoad = function () {
        var resCol = [{ url: "ui/Resource/LoadUI.json", type: Laya.Loader.JSON }, { url: "ui/Resource/localcomp.atlas", type: Laya.Loader.ATLAS }];
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
        this.UI = APP_1.default.UIManager.Show(LoadingUI_1.default);
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
            Path_1.path.GetDepathUIJS("BG"),
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
            Path_1.path.GetLH("item_coin_01"),
            Path_1.path.GetLH("item_flyer_01"),
            Path_1.path.GetLH("item_shield_01"),
            Path_1.path.GetLH("item_untouchable_01"),
            Path_1.path.GetLH("trap_chomper_01"),
            Path_1.path.GetLH("trap_entangle_01"),
            Path_1.path.GetLH("trap_sting_01"),
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
            APP_1.default.SceneManager.BG = new BG_1.default();
            this.UI.Complete(function () { GuiderManager_1.default.Mgr.EnterScene(); });
        }
        return;
    };
    LoadDirctor.prototype._Update = function () {
        this.UI.Update();
    };
    return LoadDirctor;
}(BaseDirector_1.default));
},{"./../Utility/Path":27,"./../controler/APP":29,"./../ui/BG":33,"./../ui/UnDownload/LoadingUI":42,"./BaseDirector":21,"./BaseScene":22,"./GuiderManager":25}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path;
(function (path) {
    var IsEditor = false;
    path.SceneAssetPath = "LayaScene_";
    path.ResourcePath = IsEditor ? "D:/GIt/Resources/LayaProject/FreshProject/myLaya/NetResource/" : "http://www.gsjgame.com/Resource/NetResource/";
    path.UIPath = path.ResourcePath + "UI/";
    path.ModelPath = path.ResourcePath + "3D/";
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
        return path.ModelPath + path.SceneAssetPath + fileName + "/Conventional/" + fileName + ".lh";
    }
    path.GetLH = GetLH;
})(path = exports.path || (exports.path = {}));
},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIFunc;
(function (UIFunc) {
    //计算缩放值
    function CountScaleFix(width) {
        if (!width) {
            return;
        }
        var stageWidth = Laya.stage.width;
        var scale = Laya.stage.width / width;
        return scale;
    }
    UIFunc.CountScaleFix = CountScaleFix;
    function FixUI(view) {
        var scale = UIFunc.CountScaleFix(view.width);
        view.scaleX = scale;
        view.scaleY = scale;
        view.height = Laya.stage.height / scale;
    }
    UIFunc.FixUI = FixUI;
})(UIFunc = exports.UIFunc || (exports.UIFunc = {}));
},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var UIManager_1 = require("./../FrameWork/UIManager");
var SceneManager_1 = require("./../FrameWork/SceneManager");
var FrameWork_1 = require("./../FrameWork/FrameWork");
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
    return APP;
}());
exports.default = APP;
},{"./../FrameWork/FrameWork":5,"./../FrameWork/MessageCenter":6,"./../FrameWork/SceneManager":7,"./../FrameWork/UIManager":8}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameStruct_1 = require("./../Game/GameStruct");
var SetPanelUI_1 = require("./../ui/SetPanelUI");
var CharacterUI_1 = require("./../ui/CharacterUI");
var GameScene_1 = require("./../Scene/GameScene");
var APP_1 = require("./APP");
var Controler = /** @class */ (function () {
    function Controler() {
    }
    Object.defineProperty(Controler, "GameControler", {
        get: function () {
            return GameControler.Mgr;
        },
        enumerable: true,
        configurable: true
    });
    return Controler;
}());
exports.default = Controler;
var GameControler = /** @class */ (function () {
    function GameControler() {
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
    Object.defineProperty(GameControler.prototype, "LineStepNum", {
        //常量定义
        //每行最大格子数
        get: function () {
            if (!this._LineStepNum) {
                this._LineStepNum = 5 + 2;
            }
            return this._LineStepNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameControler.prototype, "MaxLineNum", {
        //最大行数
        get: function () {
            if (!this._MaxLineNum) {
                this._MaxLineNum = 13;
            }
            return this._MaxLineNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameControler.prototype, "StepLength", {
        //格子边长
        get: function () {
            if (!this._StepLength) {
                this._StepLength = 0.98;
            }
            return this._StepLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameControler.prototype, "StepDistance", {
        //格子斜对角长度
        get: function () {
            if (!this._StepDistance) {
                this._StepDistance = Math.sqrt((this.StepLength * this.StepLength) * 2);
            }
            return this._StepDistance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameControler.prototype, "PlayerMoveTime", {
        //玩家移动时间
        get: function () {
            if (!this._PlayerMoveTime) {
                this._PlayerMoveTime = 0.02 * 10000;
            }
            return this._PlayerMoveTime;
        },
        enumerable: true,
        configurable: true
    });
    GameControler.prototype.SetPlayerID = function (id) {
        console.debug("Selected" + id);
    };
    //显示设置面板
    GameControler.prototype.ShowSetPanel = function () {
        var Panel = APP_1.default.UIManager.Show(SetPanelUI_1.default); // new SetPanel();
    };
    //显示角色面板
    GameControler.prototype.ShowCharacterPanel = function () {
        var character = APP_1.default.UIManager.Show(CharacterUI_1.default);
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
        this.EnterScene();
    };
    GameControler.prototype.EnterGame = function () {
        this.EnterScene();
    };
    Object.defineProperty(GameControler.prototype, "GameDir", {
        get: function () {
            return APP_1.default.SceneManager.CurScene.CurDir;
        },
        enumerable: true,
        configurable: true
    });
    //进入游戏场景走这个接口
    GameControler.prototype.EnterScene = function () {
        var newGameScene = new GameScene_1.default();
        APP_1.default.SceneManager.EnterScene(newGameScene);
    };
    //生成BUFF表现效果
    GameControler.prototype.GenBuffEffect = function (type) {
        return new Laya.Sprite3D();
    };
    return GameControler;
}());
},{"./../Game/GameStruct":14,"./../Scene/GameScene":24,"./../ui/CharacterUI":35,"./../ui/SetPanelUI":41,"./APP":29}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = ItemElement;
},{}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameControler_1 = require("./../controler/GameControler");
var APP_1 = require("./../controler/APP");
var RoleElement = /** @class */ (function (_super) {
    __extends(RoleElement, _super);
    function RoleElement() {
        return _super.call(this) || this;
    }
    Object.defineProperty(RoleElement.prototype, "Btn", {
        get: function () {
            var _this = this;
            if (this._Btn == null) {
                this._Btn = this.getChildAt(1);
                this._Btn.on(Laya.Event.CLICK, this, function () {
                    GameControler_1.default.GameControler.SetPlayerID(_this.Idx);
                    APP_1.default.UIManager.CloseCurView();
                });
            }
            return this._Btn;
        },
        enumerable: true,
        configurable: true
    });
    RoleElement.prototype.Reset = function () {
        if (this.Btn) { }
    };
    return RoleElement;
}(Laya.Image));
exports.default = RoleElement;
},{"./../controler/APP":29,"./../controler/GameControler":30}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path_1 = require("./../Utility/Path");
var layaMaxUI_1 = require("./layaMaxUI");
var BGUI = /** @class */ (function (_super) {
    __extends(BGUI, _super);
    function BGUI() {
        var _this = _super.call(this) || this;
        var skyMod = _this._SkyModel;
        var earth = _this._Earth;
        var widh = Laya.stage.width;
        var rate = Math.ceil(Laya.stage.height / widh);
        skyMod.width = widh; //Laya.stage.width;
        skyMod.height = widh;
        earth.width = widh;
        earth.height = widh;
        _this._SkyArr = new Array(rate);
        for (var startIdx = 0; startIdx < _this._SkyArr.length; ++startIdx) {
            _this._SkyArr[startIdx] = new Laya.Image();
            //this._SkyArr[startIdx]._cloneTo(skyMod)
            _this._SkyArr[startIdx].loadImage("comp/img_background_spr_sky.png");
            _this._SkyArr[startIdx].width = widh;
            _this._SkyArr[startIdx].height = widh;
            _this._Panel.addChild(_this._SkyArr[startIdx]);
        }
        skyMod.visible = false;
        _this.Init();
        return _this;
    }
    BGUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("BG")));
    };
    BGUI.prototype.Init = function () {
        var height = Laya.stage.width;
        for (var startIdx = 0; startIdx < this._SkyArr.length; ++startIdx) {
            this._SkyArr[startIdx].y = startIdx * height;
        }
    };
    BGUI.prototype.UpdatePage = function (height) {
    };
    return BGUI;
}(layaMaxUI_1.ui.BGUI));
exports.default = BGUI;
},{"./../Utility/Path":27,"./layaMaxUI":43}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIManager_1 = require("./../FrameWork/UIManager");
var FrameWork_1 = require("./../FrameWork/FrameWork");
var BaseEnum_1 = require("./../Base/BaseEnum");
var UIFunc_1 = require("./../Utility/UIFunc");
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
        UIFunc_1.UIFunc.FixUI(UI);
        this.addChild(UI);
    };
    return BaseUI;
}(Laya.Sprite));
exports.default = BaseUI;
},{"./../Base/BaseEnum":1,"./../FrameWork/FrameWork":5,"./../FrameWork/UIManager":8,"./../Utility/UIFunc":28}],35:[function(require,module,exports){
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
},{"./../Utility/Path":27,"./BaseUI":34,"./layaMaxUI":43}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var Path_1 = require("./../Utility/Path");
var GuiderManager_1 = require("../Scene/GuiderManager");
var GameControler_1 = require("./../controler/GameControler");
var ExtendEndGameUI = /** @class */ (function (_super) {
    __extends(ExtendEndGameUI, _super);
    function ExtendEndGameUI() {
        var _this = _super.call(this) || this;
        //this.Panel = this.Panel;
        //this.Panel.vScrollBarSkin = "";
        //this.Panel.hScrollBarSkin = "";
        _this._MenueBtn.on(Laya.Event.CLICK, GuiderManager_1.default.Mgr, GuiderManager_1.default.Mgr.EnterScene);
        _this._SetBtn.on(Laya.Event.CLICK, GameControler_1.default.GameControler, GameControler_1.default.GameControler.ShowSetPanel);
        _this._StartBtn.on(Laya.Event.CLICK, GameControler_1.default.GameControler, GameControler_1.default.GameControler.EnterGame);
        return _this;
    }
    ExtendEndGameUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("EndGame")));
    };
    return ExtendEndGameUI;
}(layaMaxUI_1.ui.EndGameUI));
var EndGameUI = /** @class */ (function (_super) {
    __extends(EndGameUI, _super);
    function EndGameUI(name) {
        var _this = _super.call(this, name) || this;
        _this.UI = new ExtendEndGameUI();
        _this.FixUI(_this.UI);
        return _this;
        //this.UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ this._UIManager.Show<PlayerListUI>(PlayerListUI)});
    }
    EndGameUI.Name = function () {
        return "EndGameUI";
    };
    return EndGameUI;
}(BaseUI_1.default));
exports.default = EndGameUI;
},{"../Scene/GuiderManager":25,"./../Utility/Path":27,"./../controler/GameControler":30,"./BaseUI":34,"./layaMaxUI":43}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var Path_1 = require("./../Utility/Path");
var BaseUI_1 = require("./BaseUI");
var PlayerListUI_1 = require("./../ui/PlayerListUI");
var GameControler_1 = require("./../controler/GameControler");
var ExtendEnterGameUI = /** @class */ (function (_super) {
    __extends(ExtendEnterGameUI, _super);
    function ExtendEnterGameUI() {
        var _this = _super.call(this) || this;
        _this.Panel = _this._Panel;
        _this.Panel.vScrollBarSkin = "";
        _this.Panel.hScrollBarSkin = "";
        _this._Character.on(Laya.Event.CLICK, GameControler_1.default.GameControler, GameControler_1.default.GameControler.ShowCharacterPanel);
        _this._SetPanel.on(Laya.Event.CLICK, GameControler_1.default.GameControler, GameControler_1.default.GameControler.ShowSetPanel);
        _this._Start.on(Laya.Event.CLICK, GameControler_1.default.GameControler, GameControler_1.default.GameControler.EnterGame);
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
},{"./../Utility/Path":27,"./../controler/GameControler":30,"./../ui/PlayerListUI":40,"./BaseUI":34,"./layaMaxUI":43}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**作者:Mo
 * 场景UI
 */
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var Path_1 = require("./../Utility/Path");
var ItemListUI_1 = require("./ItemListUI");
var GameControler_1 = require("./../controler/GameControler");
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
        var opIsRight = GameControler_1.default.GameControler.SetInfo.OPIsRight;
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
},{"./../Utility/Path":27,"./../controler/GameControler":30,"./BaseUI":34,"./ItemListUI":39,"./layaMaxUI":43}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var BaseEnum_1 = require("./../Base/BaseEnum");
var Path_1 = require("./../Utility/Path");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var ExtendsItemListUI = /** @class */ (function (_super) {
    __extends(ExtendsItemListUI, _super);
    function ExtendsItemListUI() {
        return _super.call(this) || this;
    }
    ExtendsItemListUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("ItemList")));
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
        _this.FixUI(_this.UI);
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
},{"./../Base/BaseEnum":1,"./../FrameWork/MessageCenter":6,"./../Utility/Path":27,"./BaseUI":34,"./layaMaxUI":43}],40:[function(require,module,exports){
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
},{"../Scene/GuiderManager":25,"./../Base/BaseEnum":1,"./../Utility/Path":27,"./BaseUI":34,"./layaMaxUI":43}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var BaseEnum_1 = require("./../Base/BaseEnum");
var Path_1 = require("./../Utility/Path");
var GameStruct_1 = require("./../Game/GameStruct");
var GuiderManager_1 = require("../Scene/GuiderManager");
var GameControler_1 = require("./../controler/GameControler");
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
        var info = GameControler_1.default.GameControler.GetSetInfo();
        this._UI._AudioSwitch.selectedIndex = info.AudioOn ? 0 : 1;
        this._UI._OPSwitch.selectedIndex = info.OPIsRight ? 1 : 0;
        this._UI._Text.text = info.TextInfo;
    };
    SetPanelUI.prototype.SavePanel = function () {
        var info = new GameStruct_1.GameStruct.SetInfo();
        info.AudioOn = this._UI._AudioSwitch.selectedIndex == 0;
        info.OPIsRight = this._UI._OPSwitch.selectedIndex == 1;
        GameControler_1.default.GameControler.SaveSetInfo(info);
    };
    SetPanelUI.prototype.CloseOP = function () {
        this.SavePanel();
    };
    return SetPanelUI;
}(BaseUI_1.default));
exports.default = SetPanelUI;
},{"../Scene/GuiderManager":25,"./../Base/BaseEnum":1,"./../Game/GameStruct":14,"./../Utility/Path":27,"./../controler/GameControler":30,"./BaseUI":34,"./layaMaxUI":43}],42:[function(require,module,exports){
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
        this.createView(Laya.loader.getRes("ui/Resource/LoadUI.json"));
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
},{"./../BaseUI":34}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ui;
(function (ui) {
    var BGUI = /** @class */ (function (_super) {
        __extends(BGUI, _super);
        function BGUI() {
            return _super.call(this) || this;
        }
        BGUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("BG");
        };
        return BGUI;
    }(Laya.View));
    ui.BGUI = BGUI;
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
},{}]},{},[20])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rvb2wvTGF5YTIuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQmFzZS9CYXNlRW51bS50cyIsInNyYy9CYXNlL0Jhc2VGdW5jLnRzIiwic3JjL0Jhc2UvTGlmZU9iai50cyIsInNyYy9GcmFtZVdvcmsvQmFzZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL0ZyYW1lV29yay50cyIsInNyYy9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlci50cyIsInNyYy9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9VSU1hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FuaW1PYmoudHMiLCJzcmMvR2FtZS9CdWZmLnRzIiwic3JjL0dhbWUvR2FtZUNhbWVyYS50cyIsInNyYy9HYW1lL0dhbWVJdGVtLnRzIiwic3JjL0dhbWUvR2FtZVN0cnVjdC50cyIsInNyYy9HYW1lL0lucHV0LnRzIiwic3JjL0dhbWUvTW91bnRMaW5lLnRzIiwic3JjL0dhbWUvUGxheWVyLnRzIiwic3JjL0dhbWUvUGxheWVyQ3RybGVyLnRzIiwic3JjL0dhbWUvU3RlcC50cyIsInNyYy9NYWluLnRzIiwic3JjL1NjZW5lL0Jhc2VEaXJlY3Rvci50cyIsInNyYy9TY2VuZS9CYXNlU2NlbmUudHMiLCJzcmMvU2NlbmUvR2FtZURpcmVjdG9yLnRzIiwic3JjL1NjZW5lL0dhbWVTY2VuZS50cyIsInNyYy9TY2VuZS9HdWlkZXJNYW5hZ2VyLnRzIiwic3JjL1NjZW5lL0xvYWRTY2VuZS50cyIsInNyYy9VdGlsaXR5L1BhdGgudHMiLCJzcmMvVXRpbGl0eS9VSUZ1bmMudHMiLCJzcmMvY29udHJvbGVyL0FQUC50cyIsInNyYy9jb250cm9sZXIvR2FtZUNvbnRyb2xlci50cyIsInNyYy9zY3JpcHQvSXRlbUVsZW1lbnQudHMiLCJzcmMvc2NyaXB0L1JvbGVFbGVtZW50LnRzIiwic3JjL3VpL0JHLnRzIiwic3JjL3VpL0Jhc2VVSS50cyIsInNyYy91aS9DaGFyYWN0ZXJVSS50cyIsInNyYy91aS9FbmRHYW1lVUkudHMiLCJzcmMvdWkvRW50ZXJHYW1lVUkudHMiLCJzcmMvdWkvR2FtZVVJLnRzIiwic3JjL3VpL0l0ZW1MaXN0VUkudHMiLCJzcmMvdWkvUGxheWVyTGlzdFVJLnRzIiwic3JjL3VpL1NldFBhbmVsVUkudHMiLCJzcmMvdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBLElBQWMsUUFBUSxDQUVyQjtBQUZELFdBQWMsUUFBUTtJQUNsQixJQUFZLFVBQXNCO0lBQWxDLFdBQVksVUFBVTtRQUFFLHlDQUFHLENBQUE7UUFBQyw2Q0FBSyxDQUFBO0lBQUEsQ0FBQyxFQUF0QixVQUFVLEdBQVYsbUJBQVUsS0FBVixtQkFBVSxRQUFZO0lBQUEsQ0FBQztBQUN2QyxDQUFDLEVBRmEsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFFckI7Ozs7QUNBRDs7R0FFRztBQUNILElBQWMsUUFBUSxDQXFFckI7QUFyRUQsV0FBYyxRQUFRO0lBQ2xCLElBQUssVUFBc0I7SUFBM0IsV0FBSyxVQUFVO1FBQUUseUNBQUcsQ0FBQTtRQUFDLDZDQUFLLENBQUE7SUFBQSxDQUFDLEVBQXRCLFVBQVUsS0FBVixVQUFVLFFBQVk7SUFBQSxDQUFDO0lBQzVCO1FBSUk7WUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUM7UUFFRCxzQkFBSSxzQkFBSztpQkFBVDtnQkFFSSxPQUFRLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDeEIsQ0FBQzs7O1dBQUE7UUFDRCxxQkFBTyxHQUFQLFVBQVEsUUFBaUM7WUFF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M0IsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQWhCQSxBQWdCQyxDQWhCMkIsSUFBSSxDQUFDLElBQUksR0FnQnBDO0lBaEJZLFNBQU0sU0FnQmxCLENBQUE7SUFDRDtRQUFnQyw4QkFBUztRQUVyQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsbUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FQQSxBQU9DLENBUCtCLElBQUksQ0FBQyxJQUFJLEdBT3hDO0lBUFksYUFBVSxhQU90QixDQUFBO0lBQ0Q7UUFBa0MsZ0NBQVM7UUFHdkM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLHFDQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDTCxtQkFBQztJQUFELENBUkEsQUFRQyxDQVJpQyxJQUFJLENBQUMsSUFBSSxHQVExQztJQVJZLGVBQVksZUFReEIsQ0FBQTtJQUNEO1FBQWdDLDhCQUFTO1FBS3JDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVZBLEFBVUMsQ0FWK0IsSUFBSSxDQUFDLElBQUksR0FVeEM7SUFWWSxhQUFVLGFBVXRCLENBQUE7QUFDTCxDQUFDLEVBekZhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQXlGZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgbW9kdWxlIEJhc2VFbnVtIHtcclxuICAgIGV4cG9ydCBlbnVtIFVJVHlwZUVudW0ge0xvdyxNaWRsZX07XHJcbn0iLCJpbXBvcnQgQmFzZU1nciBmcm9tIFwiLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCI7XHJcblxyXG4vKipcclxuICog5a6a5LmJ5Z+656GA57uT5p6E5L2TXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEJhc2VGdW5jIHtcclxuICAgIGVudW0gVUlUeXBlRW51bSB7TG93LE1pZGxlfTtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXA8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Db3VudDpudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfTWFwOntba2V5OiBzdHJpbmddOiBUfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9NYXAgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3JFYWNoKGNhbGxiYWNrOihtZ3I6VCxrZXk6c3RyaW5nKT0+dm9pZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgbWFwS2V5IGluIHRoaXMuX01hcClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fTWFwW21hcEtleV0sbWFwS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gb2JqIOaUvuWFpeWvueixoVxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0KCBvYmo6VCwga2V5OnN0cmluZyApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighdGhpcy5fTWFwW2tleV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICsrdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fTWFwW2tleV0gPSBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdldChrZXk6c3RyaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDnp7vpmaTmn5DkuKrlr7nosaFcclxuICAgICAgICAgKiBAcmV0dXJucyDooqvnp7vpmaTlr7nosaFcclxuICAgICAgICAgKi9cclxuICAgICAgICBSZW1vdmUoa2V5OnN0cmluZyk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIE9iajpUID0gdGhpcy5fTWFwW2tleV07XHJcbiAgICAgICAgICAgIGlmKE9iailcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTWFwW2tleV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOmUrlxyXG4gICAgICAgICAqIEByZXR1cm5zIOaYr+WQpuaLpeaciVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEhhcyhrZXk6c3RyaW5nKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9NYXBba2V5XSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIlxyXG5leHBvcnQgbW9kdWxlIEVudW0ge1xyXG4gICAgZXhwb3J0IGVudW0gTGlmZU9ialN0YXRleyBVblN0YXJ0ZWQsU3RhcnRpbmcsVXBkYXRpbmcsRW5kZWQgfVxyXG59XHJcbi8v6K+l5a+56LGh5qih5p2/55So5LqO5pyJIOW8gOWni+OAgei/m+ihjOaAp+OAgee7k+adnyDkuInnp43nirbmgIHnmoTlr7nosaFcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgTGlmZU9ialxyXG57XHJcbiAgICBPYmpTdGF0ZTpFbnVtLkxpZmVPYmpTdGF0ZTtcclxuICAgIGFic3RyYWN0IFN0YXJ0KCk6dm9pZDtcclxuXHJcbiAgICBVcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5PYmpTdGF0ZSA9PSBFbnVtLkxpZmVPYmpTdGF0ZS5VblN0YXJ0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX1VwZGF0ZUZ1bmMgIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVXBkYXRlRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJvdGVjdGVkIF9VcGRhdGVGdW5jOigpPT52b2lkO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVXBkYXRlRnVuYz1udWxsO1xyXG4gICAgICAgIHRoaXMuT2JqU3RhdGU9RW51bS5MaWZlT2JqU3RhdGUuVW5TdGFydGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8v56a75byA5pe26L+b6KGM6YWN572uXHJcbiAgICBwcm90ZWN0ZWQgX0xlYXZlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VwZGF0ZUZ1bmMgPSB0aGlzLl9MZWF2ZWluZztcclxuICAgIH1cclxuXHJcbiAgICAvL+emu+W8gOaXtui/m+ihjOmFjee9riDnprvlvIDpgLvovpHmiafooYzlrozmiJDlkI7ov5vlhaXnu5PmnZ/nirbmgIFcclxuICAgIHByb3RlY3RlZCBfTGVhdmVpbmcoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTGVhdmVDb21wbGV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v56a75byA5YeG5aSH5a6M5q+VIOaJp+ihjOemu+W8gOmAu+i+kVxyXG4gICAgcHJvdGVjdGVkIF9MZWF2ZUNvbXBsZXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VcGRhdGVGdW5jID0gbnVsbDtcclxuICAgICAgICB0aGlzLk9ialN0YXRlPSBFbnVtLkxpZmVPYmpTdGF0ZS5FbmRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/m+WFpemFjee9rlxyXG4gICAgcHJvdGVjdGVkIF9TdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLk9ialN0YXRlPSBFbnVtLkxpZmVPYmpTdGF0ZS5TdGFydGluZztcclxuICAgICAgICB0aGlzLl9VcGRhdGVGdW5jID0gdGhpcy5fU3RhcnRpbmc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5byA5aeL5YeG5aSHIOWHhuWkh+Wwsee7quWQjuato+W8j+i/kOihjFxyXG4gICAgcHJvdGVjdGVkIF9TdGFydGluZygpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TdGFydENvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9TdGFydENvbXBsZXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VwZGF0ZUZ1bmMgPSB0aGlzLl9VcGRhdGU7XHJcbiAgICAgICAgdGhpcy5PYmpTdGF0ZT0gRW51bS5MaWZlT2JqU3RhdGUuVXBkYXRpbmc7XHJcbiAgICB9XHJcbiAgICAvL+aJp+ihjOi/h+eoi+S4reeahOWKn+iDvVxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9VcGRhdGUoKTp2b2lkO1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZU1nclxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlKCk7XHJcbn0iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtCYXNlRnVuY30gIGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmFtZVdvcmtcclxue1xyXG4gICAgX01nck1hcDpCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+Oy8vQmFzZVN0cnVjdC5NYXA8QmFzZU1hbmFnZXI+O1xyXG4gICAgX1RlbU1nckxpc3Q6QXJyYXk8QmFzZU1hbmFnZXI+O1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX01nck1hcCA9IG5ldyBCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRk06RnJhbWVXb3JrO1xyXG4gICAgc3RhdGljIGdldCBGTSgpOkZyYW1lV29ya1xyXG4gICAge1xyXG4gICAgICAgIGlmKEZyYW1lV29yay5fRk09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGcmFtZVdvcmsuX0ZNID0gbmV3IEZyYW1lV29yaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRnJhbWVXb3JrLl9GTTtcclxuICAgIH1cclxuICAgIC8vY29uc3RydWN0b3JcclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1wTWdyTGlzdCA9IG5ldyBBcnJheTxCYXNlTWFuYWdlcj4odGhpcy5fTWdyTWFwLkNvdW50KTtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAuZm9yRWFjaCggKG1ncjpCYXNlTWFuYWdlciAsIGtleTpzdHJpbmcpOnZvaWQgPT57XHJcbiAgICAgICAgICAgIHRlbXBNZ3JMaXN0LnB1c2gobWdyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRlbXBNZ3JMaXN0LmZvckVhY2goKG1ncixpZHgpPT57bWdyLlVwZGF0ZSgpO30pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRNYW5hZ2VyPFQgZXh0ZW5kcyBCYXNlTWFuYWdlcj4oIHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9ICk6VFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX01nck1hcC5IYXModHlwZS5OYW1lKCkpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX01nck1hcC5HZXQodHlwZS5OYW1lKCkpIGFzIFQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZXdNZ3I6VCA9IG5ldyB0eXBlKCk7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwLlNldChuZXdNZ3IsdHlwZS5OYW1lKCkpO1xyXG4gICAgICAgIHJldHVybiAgbmV3TWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgR2V0TWFuYWdlcjxUIGV4dGVuZHMgQmFzZU1hbmFnZXI+KHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9KTpUe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9NZ3JNYXAuR2V0KHR5cGUuTmFtZSgpKSBhcyBUO1xyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOa2iOaBr+aOp+WItuWZqFxyXG4gKi9cclxuaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmV4cG9ydCBtb2R1bGUgTWVzc2FnZU1EXHJcbntcclxuICAgIGV4cG9ydCBjb25zdCBHYW1lRXZlbnQgPVxyXG4gICAge1xyXG4gICAgICAgIFBsYXllckRlYXRoOlwiUGxheWVyRGVhdGhcIixcclxuICAgICAgICBHYW1lVGltZVVwOlwiR2FtZVRpbWVVcFwiLFxyXG4gICAgICAgIEdhbWVDb250aW51ZTpcIkdhbWVDb250aW51ZVwiXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBNZXNzYWdlQ2VudGVyIGV4dGVuZHMgQmFzZU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICBcIk1lc3NhZ2VDZW50ZXJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX01ncjpNZXNzYWdlQ2VudGVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0V2ZW50RGljdDp7W0tleTpzdHJpbmddOk1FdmVudH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBfR2V0RXZlbnQobmFtZTpzdHJpbmcpOk1FdmVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50Ok1FdmVudCA9IHRoaXMuX0V2ZW50RGljdFtuYW1lXTtcclxuICAgICAgICAgICAgaWYoZXZlbnQgPT0gdW5kZWZpbmVkfHwgZXZlbnQgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgTUV2ZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0W25hbWVdID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0ID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgc3RhdGljIGdldCBNZ3IoKTpNZXNzYWdlQ2VudGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihNZXNzYWdlQ2VudGVyLl9NZ3IgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWVzc2FnZUNlbnRlci5fTWdyID0gbmV3IE1lc3NhZ2VDZW50ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gTWVzc2FnZUNlbnRlci5fTWdyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo5YaMXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIOWnlOaJmFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqfSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAgKi9cclxuICAgICAgICBSZWdpc3QobmFtZTpzdHJpbmcsYWN0aW9uOigpPT52b2lkLGxpc3RlbmVyOk9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDpNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG5ld0RsZ3Q6RGVsZWdhdGUgPSBuZXcgRGVsZWdhdGUobGlzdGVuZXIsYWN0aW9uKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuQWRkKG5ld0RsZ3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jplIDmn5DkuKrnm5HlkKxcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24g5aeU5omYXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmp9IGxpc3RlbmVyIOebkeWQrOiAhVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERlc1JlZ2lzdChuYW1lOnN0cmluZyxhY3Rpb246KCk9Pnt9LGxpc3RlbmVyOk9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDpNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuUm12KGFjdGlvbixsaXN0ZW5lcilcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo6ZSA5p+Q5Liq5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmdpc3RJREsobmFtZTpzdHJpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgdmFyIGdldEV2ZW50Ok1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICAgZ2V0RXZlbnQuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFRyaWdnZXIobmFtZTpzdHJpbmcscGFyYW06YW55ID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDpNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WnlOaJmFxyXG5leHBvcnQgY2xhc3MgRGVsZWdhdGVcclxue1xyXG4gICAgTGlzdGVuZXI6T2JqZWN0O1xyXG4gICAgQWN0aW9uOigpPT52b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiDop6blj5FcclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAqL1xyXG4gICAgIEV4ZWN1dGUoIHBhcmFtOmFueSA9IG51bGwgKVxyXG4gICAgIHtcclxuICAgICAgICAgdGhpcy5BY3Rpb24uY2FsbCh0aGlzLkxpc3RlbmVyLHBhcmFtKTtcclxuICAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihsaXN0ZW5lcjpPYmplY3QsYWN0aW9uOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICB0aGlzLkFjdGlvbiA9IGFjdGlvbjtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8v5LqL5Lu2XHJcbmV4cG9ydCBjbGFzcyBNRXZlbnRcclxue1xyXG4gICAgIERlbGVnYXRlTGlzdDpBcnJheTxEZWxlZ2F0ZT47XHJcbiAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgIHtcclxuICAgICAgICAgdGhpcy5SZXNldCgpO1xyXG4gICAgIH1cclxuICAgICAvKipcclxuICAgICAqIOa3u+WKoOWnlOaJmFxyXG4gICAgICogQHBhcmFtIHtEZWxlZ2F0ZX0gZGxnIOa2iOaBr+WQjeWtl1xyXG4gICAgICovXHJcbiAgICAgQWRkKGRsZzpEZWxlZ2F0ZSlcclxuICAgICB7XHJcbiAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0LnB1c2goZGxnKTtcclxuICAgICB9XHJcbiAgICAgLyoqXHJcbiAgICAgKiDnp7vpmaTlp5TmiZhcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvbiDmtojmga/lkI3lrZdcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lciDmtojmga/lkI3lrZdcclxuICAgICAqL1xyXG4gICAgIFJtdiggYWN0aW9uOigpPT57fSxsaXN0ZW5lcjpPYmplY3QgPSBudWxsIClcclxuICAgICB7XHJcbiAgICAgICAgIHZhciBkbGd0TGlzdDpBcnJheTxEZWxlZ2F0ZT4gPSB0aGlzLkRlbGVnYXRlTGlzdDtcclxuICAgICAgICAgZm9yKHZhciBhcnJJZHg6bnVtYmVyPWRsZ3RMaXN0Lmxlbmd0aCAtMSA7YXJySWR4Pi0xOy0tYXJySWR4KVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICB2YXIgZGxndCA9IGRsZ3RMaXN0W2FycklkeF07XHJcbiAgICAgICAgICAgICBpZihhY3Rpb24gPT0gZGxndC5BY3Rpb24mJiBsaXN0ZW5lciA9PSBkbGd0Lkxpc3RlbmVyIClcclxuICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgZGxndExpc3Quc3BsaWNlKGFycklkeCwxKTtcclxuICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcbiAgICAgLy/ph43nva5cclxuICAgICBSZXNldCgpXHJcbiAgICAge1xyXG4gICAgICAgICB0aGlzLkRlbGVnYXRlTGlzdCA9IFtdXHJcbiAgICAgfVxyXG4gICAgIC8qKlxyXG4gICAgICog6Kem5Y+RXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgKi9cclxuICAgICBFeGVjdXRlKCBwYXJhbTphbnkgKVxyXG4gICAgIHtcclxuICAgICAgICAgdmFyIGRsZ3RMaXN0OkFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICBmb3IodmFyIGFycklkeDpudW1iZXI9ZGxndExpc3QubGVuZ3RoIC0xIDthcnJJZHg+LTE7LS1hcnJJZHgpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgIGRsZ3QuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcbn1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vLi4vU2NlbmUvQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCJcclxuXHJcbi8qKuS9nOiAhU1vXHJcbiog5Zy65pmv5Yqf6IO9XHJcbiovXHJcbi8v5Zy65pmv566h55CGXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgX0JHOiBMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX0JHTGF5ZXI6IExheWEuU3ByaXRlO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLl9CR0xheWVyKTtcclxuICAgICAgICAvL+a3u+WKoOWcuuaZr+euoeeQhlxyXG4gICAgICAgIHRoaXMuU2NlbmVOb2RlID0gTGF5YS5zdGFnZS5hZGRDaGlsZChuZXcgTGF5YS5TcHJpdGUoKSk7XHJcbiAgICB9XHJcbiAgICBzZXQgQkcoYmc6IExheWEuVmlldykge1xyXG4gICAgICAgIGlmICghYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQkcpIHtcclxuICAgICAgICAgICAgdGhpcy5fQkcucmVtb3ZlU2VsZjtcclxuICAgICAgICAgICAgdGhpcy5fQkcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIHRoaXMuX0JHLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9CRy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyLmFkZENoaWxkKHRoaXMuX0JHKTtcclxuICAgIH1cclxuICAgIFNjZW5lTm9kZTogTGF5YS5Ob2RlO1xyXG5cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2NlbmVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfQ3VyU2NlbmU6IEJhc2VTY2VuZTtcclxuICAgIGdldCBDdXJTY2VuZSgpOiBCYXNlU2NlbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZTtcclxuICAgIH1cclxuICAgIHNldCBDdXJTY2VuZSh2YWx1ZTogQmFzZVNjZW5lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N1clNjZW5lICYmIHRoaXMuX0N1clNjZW5lLlNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0N1clNjZW5lLlNjZW5lLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQ3VyU2NlbmUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5fQ3VyU2NlbmUgJiYgdGhpcy5fQ3VyU2NlbmUuU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5TY2VuZU5vZGUuYWRkQ2hpbGQodGhpcy5fQ3VyU2NlbmUuU2NlbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBDdXJEaXIoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU2NlbmUuQ3VyRGlyO1xyXG4gICAgfVxyXG5cclxuICAgIEVudGVyU2NlbmUodGFyZ2V0U2NlbmU6IEJhc2VTY2VuZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUgPSB0YXJnZXRTY2VuZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuTGVhdmUodGFyZ2V0U2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi91aS9CYXNlVUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtVSUZ1bmN9IGZyb20gXCIuLy4uL1V0aWxpdHkvVUlGdW5jXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgIFVJTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyXHJcbntcclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcml2YXRlIF9VSU5vZGU6TGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9NaWRsZVVJTm9kZTpMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX1VJRGljdDp7W25hbWU6c3RyaW5nXTpCYXNlVUl9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1VJTm9kZSA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMuX1VJTm9kZS53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUlOb2RlLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX1VJTm9kZS5uYW1lID0gXCJVSU5vZGVcIjtcclxuICAgICAgICB0aGlzLl9NaWRsZVVJTm9kZSA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fVUlOb2RlKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuX01pZGxlVUlOb2RlKTtcclxuICAgICAgICB0aGlzLl9VSURpY3QgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgXCJVSU1hbmFnZXJcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgfVxyXG4gICAgcHVibGljIEFkZFVJKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgU2hvdzxUIGV4dGVuZHMgQmFzZVVJPih1aUNsYXNzOntuZXcgKG5hbWU6c3RyaW5nKTogVDsgTmFtZSgpOnN0cmluZyB9KTpUXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHN0cjpzdHJpbmcgPSB1aUNsYXNzLk5hbWUoKTsgICAgXHJcbiAgICAgICAgdmFyIG5ld1VJOkJhc2VVSSA9IHRoaXMuR2V0VUlCeU5hbWUoc3RyKTtcclxuICAgICAgICBuZXdVSSA9IG5ld1VJPT1udWxsP3RoaXMuQWRkVUlCeU5hbWUoc3RyLG5ldyB1aUNsYXNzKHN0cikpOm5ld1VJO1xyXG4gICAgICAgIHZhciBub2RlOkxheWEuU3ByaXRlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2gobmV3VUkuVUlUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/kuK3lsYLmrKFVSVxyXG4gICAgICAgICAgICBjYXNlIEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fTWlkbGVVSU5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9NaWRsZVVJTm9kZS5udW1DaGlsZHJlbjw9MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+mAmuefpeWvvOa8lOaaguWBnOa4uOaIj1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuVGltZVVwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9VSU5vZGU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNoaWxkTnVtOm51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgLy/miorkupLmlqXnmoTnqpflj6PlhbPmjolcclxuICAgICAgICBpZihuZXdVSS5Jc011dGV4JiZjaGlsZE51bT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSSA9IG5vZGUuZ2V0Q2hpbGRBdChub2RlLm51bUNoaWxkcmVuLTEpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgbGFzdFVJLnZpc2libGUgPSAhbGFzdFVJLklzTXV0ZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlLmFkZENoaWxkKG5ld1VJKTtcclxuICAgICAgICBuZXdVSS5PcGVuT1AoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1VJIGFzIFQ7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2UodWk6QmFzZVVJKVxyXG4gICAge1xyXG4gICAgICAgIHVpLnJlbW92ZVNlbGYoKTtcclxuXHJcbiAgICAgICAgdWkuQ2xvc2VPUCgpO1xyXG4gICAgICAgIHZhciBub2RlOkxheWEuU3ByaXRlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2godWkuVUlUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/kuK3lsYLmrKFVSVxyXG4gICAgICAgICAgICBjYXNlIEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fTWlkbGVVSU5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZihub2RlLm51bUNoaWxkcmVuPD0wKVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5YWz6Zet56qX5Y+jIOmAmuefpea4uOaIj+e7p+e7rVxyXG4gICAgICAgICAgICAgICAgICAgIC8vQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuQ29udGludWVUaW1lKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9VSU5vZGU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGROdW06bnVtYmVyID0gbm9kZS5udW1DaGlsZHJlbjtcclxuICAgICAgICBpZihjaGlsZE51bT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSTpCYXNlVUkgPSBub2RlLmdldENoaWxkQXQoY2hpbGROdW0tMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICBsYXN0VUkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIENsb3NlQ3VyVmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHVpOkJhc2VVSSA9dGhpcy5fVUlOb2RlLmdldENoaWxkQXQodGhpcy5fVUlOb2RlLm51bUNoaWxkcmVuLTEpIGFzIEJhc2VVSTtcclxuICAgICAgICB0aGlzLkNsb3NlKHVpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIoOmZpOaJgOacieiKgueCueS4iueahFVJXHJcbiAgICBDbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHVpTm9kZSA9IHRoaXMuX1VJTm9kZTtcclxuICAgICAgICB3aGlsZSAodWlOb2RlLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlOb2RlID0gdGhpcy5fTWlkbGVVSU5vZGVcclxuICAgICAgICB3aGlsZSAodWlOb2RlLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VUlCeU5hbWUobmFtZTpzdHJpbmcpOkJhc2VVSVxyXG4gICAge1xyXG4gICAgICAgIHZhciB1aSA9IHRoaXMuX1VJRGljdFtuYW1lXTtcclxuICAgICAgICB1aSA9IHVpPT11bmRlZmluZWQ/bnVsbDp1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcbiAgICBBZGRVSUJ5TmFtZShuYW1lOnN0cmluZyx1aTpCYXNlVUkpOkJhc2VVSVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJRGljdFtuYW1lXSA9IHVpO1xyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuICAgIFxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJHYW1lLnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvUm9sZUVsZW1lbnQudHNcIixSb2xlRWxlbWVudCk7XG4gICAgICAgIHJlZyhcInNjcmlwdC9JdGVtRWxlbWVudC50c1wiLEl0ZW1FbGVtZW50KTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuIC8qKlxyXG4gKiDooajnjrDnlKjnmoTlr7nosaFcclxuICovXHJcbmV4cG9ydCBtb2R1bGUgQW5pbU9ialxyXG57XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2VuQW5pbU9iajxUIGV4dGVuZHMgQmFzZUFuaW1PYmo+KCBhbmltQ2xhc3M6e25ldyAobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSxtb2RlbDpMYXlhLlNwcml0ZTNEICk6VFxyXG4gICAge1xyXG4gICAgICAgIHZhciBhbmltT2JqID0gTGF5YS5Qb29sLmdldEl0ZW0oYW5pbUNsYXNzLk5hbWUoKSk7XHJcbiAgICAgICAgaWYoYW5pbU9iaj09bnVsbClcclxuICAgICAgICAgICAgYW5pbU9iaiA9IG5ldyBhbmltQ2xhc3MoYW5pbUNsYXNzLk5hbWUoKSxtb2RlbCk7XHJcbiAgICAgICAgcmV0dXJuIGFuaW1PYmo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFic3RyYWN0IGNsYXNzIEJhc2VBbmltT2JqIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG4gICAge1xyXG4gICAgICAgIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5TY2VuZS5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX0ZyYW1lRnVuYylcclxuICAgICAgICB9XHJcbiAgICAgICAgTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX05hbWU6c3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLm9uKExheWEuRXZlbnQuUkVNT1ZFRCx0aGlzLHRoaXMuX0xlYXZlU3RhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lRnVuYygpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0p1ZGdlQ29tcGxldGUoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0ZyYW1lTG9naWNGdW5jKCk7XHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuO1xyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIodGhpcy5fTmFtZSx0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKHRoaXMsdGhpcy5fRnJhbWVGdW5jKTtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBBbmltQ29pbiBleHRlbmRzIEJhc2VBbmltT2JqXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkFuaW1Db2luXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFNldFRhcmdldCggdGFyZ2V0OkxheWEuU3ByaXRlM0QgKSAgICBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgc3VwZXIuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFyZ2V0OkxheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIobmFtZSxtb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lTG9naWNGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBvc2l0aW9uID0gdGhpcy5fVGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBhZGRQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKGFkZFBTLDAuMDgsYWRkUFMpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKGFkZFBTLHBvc2l0aW9uLHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+eUn+WRveWRqOacn+e7k+adn+WkhOeQhlxyXG4gICAgICAgIHByb3RlY3RlZCBfTGVhdmVTdGFnZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLl9MZWF2ZVN0YWdlKCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuQWRkTG9naWNHb2xkKDEpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v5Yik5pat5Lu75Yqh5a6M5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9KdWRnZUNvbXBsZXRlKCk6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBvc2l0aW9uID0gdGhpcy5fVGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBkaXNEaXIgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zdWJ0cmFjdCh0YXJnZXRQb3NpdGlvbixwb3NpdGlvbixkaXNEaXIpO1xyXG4gICAgICAgICAgICBpZiggTGF5YS5WZWN0b3IzLnNjYWxhckxlbmd0aFNxdWFyZWQoZGlzRGlyKTwwLjEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbmltcG9ydCB7UGxheWVyQ29udHJvbGVyfSBmcm9tIFwiLi8uLi9HYW1lL1BsYXllckN0cmxlclwiXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vSW5wdXRcIjtcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIjtcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyQnVmZlxyXG57XHJcbiAgICBleHBvcnQgY2xhc3MgQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBUeXBlOkl0ZW0uSXRlbVR5cGU7XHJcbiAgICAgICAgSWR4Om51bWJlcjtcclxuICAgICAgICBQbGF5ZXI6UGxheWVyO1xyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgICAgICBHZW5CdWZmTW9kKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZNb2QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZVNwaGVyZSgwLjMsOCw4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICAgICAgLy/liJvlu7rmqKHlnovmmL7npLrlr7nosaFcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQWRkQnVmZk1vZGUodGhpcy5fQnVmZk1vZCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1N0YXJ0RnVuYyE9bnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU3RhcnRGdW5jKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBDb21wbGV0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5Db21wbGV0ZUJ1ZmYodGhpcy5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTW9kLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBwcm90ZWN0ZWQgX0J1ZmZNb2Q6TGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOkl0ZW0uSXRlbVR5cGUsaWR4Om51bWJlciA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLklkeCA9IGlkeDtcclxuICAgICAgICAgICAgdGhpcy5HZW5CdWZmTW9kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0RnVuYzooKT0+dm9pZDtcclxuICAgIH1cclxuICAgIGNsYXNzIEZseUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFNwZWVkOm51bWJlcjtcclxuICAgICAgICBGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPXRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlLzIqdGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmbHlDdHJsID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJGbHkodGhpcy5TcGVlZCk7XHJcbiAgICAgICAgICAgIGZseUN0cmwuU2V0UGxheWVyKHBsYXllcilcclxuICAgICAgICAgICAgcGxheWVyLkFkZEN0cmxlcihmbHlDdHJsKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQoKSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDpudW1iZXI9MC4xLGZsb29yOm51bWJlcj0xMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW0uSXRlbVR5cGUuUm9wZSxQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLl9GaW5hbFogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56Pi0wLjIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Qb3BDdHJsZXIoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsYXNzIFByb3RlY3RCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBUaW1lOm51bWJlcjtcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6bnVtYmVyID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW0uSXRlbVR5cGUuUHJvdGVjdCxQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuU2NlbmVNYW5hZ2VyLkN1ckRpci5HYW1lVGltZSt0aW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5UaW1lPEFQUC5TY2VuZU1hbmFnZXIuQ3VyRGlyLkdhbWVUaW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVmluZUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIENvdW50VGltZTpudW1iZXI7XHJcbiAgICAgICAgSW5wdXREaXI6Ym9vbGVhbjtcclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENvbXBsZXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoY291bnRUaW1lOm51bWJlciA9IDMsaW5wdXREaXI6Ym9vbGVhbiA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtLkl0ZW1UeXBlLlZpbmUsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRUaW1lID0gY291bnRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklucHV0RGlyID0gaW5wdXREaXI7XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9UaW1lO1xyXG4gICAgICAgIHByaXZhdGUgX0lucHV0KGlzUmlnaHQ6Ym9vbGVhbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuSW5wdXREaXIgPT0gaXNSaWdodClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9IXRoaXMuSW5wdXREaXI7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuQ291bnRUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ291bnRUaW1lPDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfU2hvd0dhbWVJbmZvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOnN0cmluZztcclxuICAgICAgICAgICAgaWYodGhpcy5Db3VudFRpbWU8MClcclxuICAgICAgICAgICAgICAgIGluZm8gPSBcIlwiO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gdGhpcy5JbnB1dERpciA9PSB0cnVlP1wiUmlnaHRcIjpcIkxlZnRcIjtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG4vL+a4uOaIj+S4reebuOaculxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ2FtZXJhIGV4dGVuZHMgTGF5YS5DYW1lcmFcclxue1xyXG4gICAgQ3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyO1xyXG4gICAgQmFzZVBTOkxheWEuVmVjdG9yMztcclxuICAgIER5bmFtaWNQUzpMYXlhLlZlY3RvcjM7XHJcbiAgICBQbGF5ZXI6UGxheWVyO1xyXG5cclxuICAgIFNldFBsYWVyKHBsYXllcjpQbGF5ZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFJlc2V0KER5bmFtaWNQUzpMYXlhLlZlY3RvcjMsYmFzZVBTOkxheWEuVmVjdG9yMyxwbGF5ZXI6UGxheWVyIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IGJhc2VQUztcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IER5bmFtaWNQUztcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul+W5tuiuvue9ruS9jee9rlxyXG4gICAgQ291bnRTZXRQUygpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZCh0aGlzLkJhc2VQUyx0aGlzLkR5bmFtaWNQUyxuZXdQUyk7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbihwczpMYXlhLlZlY3RvcjMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBwcy5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAgeyAgIFxyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIgPSBuZXcgR2FtZUNhbWVyYUN0cmxlcih0aGlzKTtcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5CYXNlUFMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIC8vdGhpcy50aW1lckxvb3AoMSx0aGlzLkN0cmxlcix0aGlzLkN0cmxlci5VcGRhdGUpO1xyXG4gICAgICAgIHRoaXMuZnJhbWVMb29wKDEsdGhpcyx0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHZhciBza3lCb3g6TGF5YS5Ta3lCb3ggPW5ldyBMYXlhLlNreUJveCgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJGbGFnID0gTGF5YS5CYXNlQ2FtZXJhLkNMRUFSRkxBR19TS1k7XHJcbiAgICAgICAgLy9DYW1lcmEuc2t5UmVuZGVyZXIgPSBza3lCb3guX3JlbmRlcjtcclxuICAgICAgICAvL3RoaXMuc2sgPSBza3lCb3g7XHJcbiAgICAgICAgIC8vcGF0aFxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN0cmxlci5VcGRhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVDYW1lcmFDdHJsZXJcclxue1xyXG4gICAgQ2FtZXJhOkdhbWVDYW1lcmE7XHJcbiAgICBDdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXI7XHJcbiAgICBhYnN0cmFjdCBVcGRhdGUoKTp2b2lkO1xyXG4gICAgY29uc3RydWN0b3IoIGNhbWVyYTpHYW1lQ2FtZXJhLGN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlciA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGN0cmxlciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBjdHJsZXIgPSB0aGlzOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBjYW1lcmE7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIgPSBjdHJsZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDYW1lcmFDdHJsZXIgZXh0ZW5kcyBCYXNlR2FtZUNhbWVyYUN0cmxlclxyXG57XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuQ2FtZXJhPT1udWxsfHwgdGhpcy5DYW1lcmEuUGxheWVyID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBDYW1lcmFQUyA9IHRoaXMuQ2FtZXJhLkR5bmFtaWNQUztcclxuICAgICAgICB2YXIgUGxheWVyUFMgPSB0aGlzLkNhbWVyYS5QbGF5ZXIuX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlzTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggTWF0aC5hYnMoZGlzWk51bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnogKz0gZGlzWk51bSowLjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNhbWVyYS5EeW5hbWljUFMgPUNhbWVyYVBTO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLkNvdW50U2V0UFMoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW1lcmE6R2FtZUNhbWVyYSxjdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXIgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGNhbWVyYSxjdHJsZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi9HYW1lU3RydWN0XCJcclxuaW1wb3J0IHtQbGF5ZXJCdWZmfSBmcm9tIFwiLi9CdWZmXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0FuaW1PYmp9IGZyb20gXCIuLy4uL0dhbWUvQW5pbU9ialwiXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IHtQbGF5ZXJDb250cm9sZXJ9IGZyb20gXCIuL1BsYXllckN0cmxlclwiXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vSW5wdXRcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbnR5cGUgQmFzZVBsYXllckJ1ZmYgPSBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmO1xyXG50eXBlIEFuaW1Db2luID0gQW5pbU9iai5BbmltQ29pblxyXG5cclxuZXhwb3J0IG1vZHVsZSBJdGVtXHJcbntcclxuICAgIC8v54mp5ZOB5qCH6K+GXHJcbiAgICBjb25zdCBJdGVtSUQ6c3RyaW5nID0gXCJJdGVtXCI7XHJcbiAgICBleHBvcnQgZW51bSBJdGVtVHlwZSB7XHJcbiAgICAgICAgTm9uZT0wLFxyXG4gICAgICAgIEVtcHR5LFxyXG4gICAgICAgIFJvY2ssXHJcbiAgICAgICAgVGhvcm4sXHJcbiAgICAgICAgUHJvdGVjdD0xMSxcclxuICAgICAgICBGbHksXHJcbiAgICAgICAgUm9wZSxcclxuICAgICAgICBWaW5lLFxyXG4gICAgICAgIENvbGxlY3RvcixcclxuICAgICAgICBDb2luPTIwLFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgTGluZUl0ZW1JbmZvXHJcbiAgICB7XHJcbiAgICAgICAgVHlwZTpJdGVtVHlwZTtcclxuICAgICAgICBOdW1iZXI6bnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCB0eXBlOkl0ZW1UeXBlLG51bTpudW1iZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5OdW1iZXIgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eJqeWTgeW4g+WxgFxyXG4gICAgZXhwb3J0IGNsYXNzIEl0ZW1MYXlvdXRcclxuICAgIHtcclxuICAgICAgICBSZXdhcmRMaXN0OkFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIEJhcnJpZXJMaXN0OkFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0ID0gbmV3IEFycmF5PExheUl0ZW1NZ3I+KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCw4LEl0ZW1UeXBlLkVtcHR5LDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCw4LEl0ZW1UeXBlLlJvY2ssMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDgsSXRlbVR5cGUuVGhvcm4sMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDEwLEl0ZW1UeXBlLlByb3RlY3QsMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDE1LDEsSXRlbVR5cGUuVmluZSkpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwyLEl0ZW1UeXBlLkZseSkpXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDMsSXRlbVR5cGUuQ29pbikpXHJcbiAgICAgICAgICAgIC8vdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsMSxJdGVtVHlwZS5Db2xsZWN0b3IpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBUYWtlTGluZVJld2FyZChmbG9vcjpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vcix0aGlzLlJld2FyZExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBUYWtlTGluZURpZmZpY3VsdHkoZmxvb3I6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVGFrZUl0ZW0oZmxvb3IsdGhpcy5CYXJyaWVyTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgVGFrZUl0ZW0oZmxvb3I6bnVtYmVyLCBNZ3JMaXN0OkFycmF5PExheUl0ZW1NZ3I+KTpBcnJheTxMaW5lSXRlbUluZm8+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmV0dXJuSW5mbyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgICAgIGZvciggdmFyIGxpc3RJZHggPSAwOyBsaXN0SWR4IDwgTWdyTGlzdC5sZW5ndGg7ICsrbGlzdElkeCApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1nckxpc3RbbGlzdElkeF0uT25GbG9vcihmbG9vcik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mbzpMaW5lSXRlbUluZm8gPSBNZ3JMaXN0W2xpc3RJZHhdLlRha2VJdGVtcyhmbG9vcik7XHJcbiAgICAgICAgICAgICAgICBpZihpbmZvLk51bWJlcj4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkluZm8ucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuSW5mbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6K+l5a+56LGh55qE5YiG5biD5Zu+5q+P5bGC562J5qaC546H5YiG5biDXHJcbiAgICBleHBvcnQgY2xhc3MgTGF5SXRlbU1nclxyXG4gICAge1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgSXRlbVR5cGU6SXRlbVR5cGU7XHJcbiAgICAgICAgLy/lvZPliY3lsYLmlbBcclxuICAgICAgICBDdXJGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgLy/ljLrpl7TliIbluIPmgLvmlbDph49cclxuICAgICAgICBJdGVtTnVtOm51bWJlcjtcclxuICAgICAgICAvL+W8gOWni+WIhuW4g+eahOWxguaVsFxyXG4gICAgICAgIFN0YXJ0Rmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIC8v5YiG5biD5Yy66Ze0XHJcbiAgICAgICAgUmFuZ2U6bnVtYmVyO1xyXG4gICAgICAgIC8v5bey6I635Y+W5bGC5qCH6K6wXHJcbiAgICAgICAgRmxsb3JNYXJrOm51bWJlcjtcclxuICAgICAgICBJdGVtTGlzdDpBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8vcmFuZ2XljLrpl7TojIPlm7RcclxuICAgICAgICAvL251bSDljLrpl7TojIPlm7TmlbDph49cclxuICAgICAgICAvL2l0ZW1UeXBlIOeUn+S6p+eahOmBk+WFt+exu+Wei1xyXG4gICAgICAgIC8vc3RhcnRGbG9vciDku47lk6rkuIDooYzlvIDlp4vmipXmjrdcclxuICAgICAgICBjb25zdHJ1Y3RvciggcmFuZ2U6bnVtYmVyLG51bTpudW1iZXIsaXRlbVR5cGU6SXRlbVR5cGUsc3RhcnRGbG9vcjpudW1iZXIgPSAxIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKG51bSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbnVtID0gMTtcclxuICAgICAgICAgICAgaWYoc3RhcnRGbG9vciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAvL+esrDDlsYLmmK/njqnlrrbotbfmraXkvY3nva5cclxuICAgICAgICAgICAgICAgIHN0YXJ0Rmxvb3IgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1UeXBlID0gaXRlbVR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VyRmxvb3IgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1OdW0gPSBudW07XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnRGbG9vciA9IHN0YXJ0Rmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuUmFuZ2UgPSByYW5nZTtcclxuICAgICAgICAgICAgLy/liIbluIPlm74g54mp5ZOBaWR4OuWxguaVsFxyXG4gICAgICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICAgICAgdGhpcy5GbGxvck1hcmsgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WxguabtOaWsOWHveaVsFxyXG4gICAgICAgIE9uRmxvb3IoZmxvb3I6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZmxvb3I8dGhpcy5GbGxvck1hcmspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhcnRGbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HZW5NYXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihmbG9vcj49dGhpcy5TdGFydEZsb29yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sf5oiQ5YiG5biD5Zu+XHJcbiAgICAgICAgR2VuTWFwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydEZsb29yID0gdGhpcy5TdGFydEZsb29yO1xyXG4gICAgICAgICAgICB2YXIgaXRlbU51bSA9IHRoaXMuSXRlbU51bTtcclxuICAgICAgICAgICAgdGhpcy5JdGVtTGlzdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB2YXIgaXRlbUxpc3QgPSB0aGlzLkl0ZW1MaXN0O1xyXG4gICAgICAgICAgICBmb3IodmFyIGNvdW50TnVtOm51bWJlciA9IDA7IGNvdW50TnVtPGl0ZW1OdW07Kytjb3VudE51bSlcclxuICAgICAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIEl0ZW1GbG9vcjpudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGhpcy5SYW5nZSkgKyBzdGFydEZsb29yO1xyXG4gICAgICAgICAgICAgICAgaXRlbUxpc3QucHVzaChJdGVtRmxvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnRGbG9vciArPSB0aGlzLlJhbmdlO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFRha2VJdGVtcyggZmxvb3I6bnVtYmVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRmxsb3JNYXJrID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHZhciBjb3VudE51bSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBpdGVtTGlzdCA9IHRoaXMuSXRlbUxpc3Q7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaXRlbUlkeCA9IDA7aXRlbUlkeDxpdGVtTGlzdC5sZW5ndGg7KytpdGVtSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtTGlzdFtpdGVtSWR4XSA9PSBmbG9vcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICArK2NvdW50TnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1MaXN0LnNwbGljZShpdGVtSWR4LDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC0taXRlbUlkeDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpbmVJdGVtSW5mbyh0aGlzLkl0ZW1UeXBlLGNvdW50TnVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6K+l5a+56LGh55qE5YiG5biD5Zu+5q+P5bGC562J5qaC546H5YiG5biDXHJcbiAgICAvL3Jhbmdl5Yy66Ze06IyD5Zu0XHJcbiAgICAvL251bSDljLrpl7TojIPlm7TmlbDph49cclxuICAgIC8vaXRlbVR5cGUg55Sf5Lqn55qE6YGT5YW357G75Z6LXHJcbiAgICAvL3N0YXJ0Rmxvb3Ig5LuO5ZOq5LiA6KGM5byA5aeL5oqV5o63XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSXRlbUZhY3RvcnkoIHJhbmdlLG51bSxpdGVtVHlwZSxzdGFydEZsb29yIClcclxuICAgIHtcclxuICAgICAgICBpZihudW0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBudW0gPSAxO1xyXG4gICAgICAgIGlmKHN0YXJ0Rmxvb3IgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAvL+esrDDlsYLmmK/njqnlrrbotbfmraXkvY3nva5cclxuICAgICAgICAgICAgc3RhcnRGbG9vciA9IDE7XHJcbiAgICAgICAgLy/pgZPlhbfnsbvlnotcclxuICAgICAgICB0aGlzLkl0ZW1UeXBlID0gaXRlbVR5cGU7XHJcbiAgICAgICAgLy/lvZPliY3lsYLmlbBcclxuICAgICAgICB0aGlzLkN1ckZsb29yID0gMDtcclxuICAgICAgICAvL+WMuumXtOWIhuW4g+aAu+aVsOmHj1xyXG4gICAgICAgIHRoaXMucmFuZ2VOdW0gPSBudW07XHJcbiAgICAgICAgLy/lvIDlp4vliIbluIPnmoTlsYLmlbBcclxuICAgICAgICB0aGlzLlN0YXJ0Rmxvb3IgPSBzdGFydEZsb29yO1xyXG4gICAgICAgIC8v5YiG5biD5Yy66Ze0XHJcbiAgICAgICAgdGhpcy5SYW5nZSA9IHJhbmdlO1xyXG4gICAgICAgIC8v5YiG5biD5Zu+IOeJqeWTgWlkeDrlsYLmlbBcclxuICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5KCk7XHJcbiAgICB9XHJcbiAgICAvL+WxguabtOaWsOWHveaVsFxyXG4gICAgLy9mbG9vciDlvZPliY3lsYJcclxuICAgIEl0ZW1GYWN0b3J5LnByb3RvdHlwZS5vbkZsb29yPSBmdW5jdGlvbihmbG9vcilcclxuICAgIHtcclxuICAgICAgICBpZihmbG9vcj49dGhpcy5TdGFydEZsb29yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5HZW5NYXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+eUn+aIkOWIhuW4g+WbvlxyXG4gICAgSXRlbUZhY3RvcnkucHJvdG90eXBlLkdlbk1hcCA9IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgc3RhcnRGbG9vciA9IHRoaXMuU3RhcnRGbG9vcjtcclxuICAgICAgICB2YXIgcmFuZ2VOdW0gPSB0aGlzLnJhbmdlTnVtO1xyXG4gICAgICAgIHRoaXMuSXRlbUxpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB2YXIgaXRlbUxpc3QgPSB0aGlzLkl0ZW1MaXN0O1xyXG4gICAgICAgIGZvcih2YXIgSXRlbU51bSA9IDA7IEl0ZW1OdW08cmFuZ2VOdW07KytJdGVtTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIEl0ZW1GbG9vciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLlJhbmdlKSArIHN0YXJ0Rmxvb3I7XHJcbiAgICAgICAgICAgIGl0ZW1MaXN0LnB1c2goSXRlbUZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5TdGFydEZsb29yICs9IHRoaXMuUmFuZ2U7XHJcbiAgICB9XHJcbiAgICAvL+aLv+afkOWxgueJqeWTgeaVsOaNrlxyXG4gICAgSXRlbUZhY3RvcnkucHJvdG90eXBlLlRha2VJdGVtcyA9IGZ1bmN0aW9uKCBmbG9vciApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNvdW50TnVtID0gMDtcclxuICAgICAgICB2YXIgaXRlbUxpc3QgPSB0aGlzLkl0ZW1MaXN0O1xyXG4gICAgICAgIGZvcih2YXIgaXRlbUlkeCA9IDA7aXRlbUlkeDxpdGVtTGlzdC5sZW5ndGg7KytpdGVtSWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoaXRlbUxpc3RbaXRlbUlkeF0gPT0gZmxvb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICsrY291bnROdW07XHJcbiAgICAgICAgICAgICAgICBpdGVtTGlzdC5zcGxpY2UoaXRlbUlkeCwxKTtcclxuICAgICAgICAgICAgICAgIC0taXRlbUlkeDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge0l0ZW1UeXBlOnRoaXMuSXRlbVR5cGUsIE51bTpjb3VudE51bX07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTdGVwSXRlbUZhY3RvcnkoIGl0ZW1UeXBlOkl0ZW1UeXBlLFN0ZXApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoU3RlcCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaXRlbVxyXG4gICAgICAgIHZhciBvYmpQb29sID0gTGF5YS5Qb29sO1xyXG4gICAgICAgIGl0ZW0gPSBvYmpQb29sLmdldEl0ZW0oSXRlbUlEK2l0ZW1UeXBlKVxyXG4gICAgICAgIGlmKGl0ZW09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV0hPW51bGwmJkdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXSE9dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xhczogYW55ID0gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBjbGFzKFN0ZXApO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IFN0ZXBJdGVtKGl0ZW1UeXBlLFN0ZXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5TdGVwID0gU3RlcDtcclxuICAgICAgICBpdGVtLlJlc2V0SXRlbSgpO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBTdGVwOlN0ZXA7XHJcbiAgICAgICAgSXRlbVR5cGU6SXRlbVR5cGU7XHJcbiAgICAgICAgTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBnZXQgSXNEaWZmaWN1bHR5KCk6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGU+MCYmdGhpcy5JdGVtVHlwZTwxMDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+WIpOaWreiDveS4jeiDvei1sOS4iuWOu1xyXG4gICAgICAgIGdldCBJc0ZvcmJpZGVuKCk6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGUgPT0gSXRlbVR5cGUuUm9jaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldEl0ZW0oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fSW5pdEl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLlNldEVuYWJsZSgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLk1vZGVsIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGVwLmFkZENoaWxkKHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNldERpc2FibGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5Nb2RlbD09bnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgU2V0RW5hYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuTW9kZWw9PW51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsLmFjdGl2ZSA9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUHV0SXRlbSA9IGZ1bmN0aW9uKCBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmUgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5EZXNQYXduKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcC5TdGVwSXRlbSA9IFN0ZXBJdGVtRmFjdG9yeShpdGVtVHlwZSx0aGlzLlN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v5raI6ZmkIOaKiuiHquW3seWtmOWFpeWGheWtmOaxoFxyXG4gICAgICAgIERlc1Bhd24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TZXREaXNhYmxlKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuTW9kZWwhPW51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vZGVsLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7Ly9HTS5PYmpQb29sO1xyXG4gICAgICAgICAgICBvYmpQb29sLnJlY292ZXIoSXRlbUlEK3RoaXMuSXRlbVR5cGUsdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSBwbGF5ZXIgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLkl0ZW1UeXBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvciggaXRlbVR5cGU6SXRlbVR5cGUsU3RlcDpTdGVwIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGl0ZW1UeXBlID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcCA9IFN0ZXA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbD0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBfQWRkQnVmZlRvUGxheWVyKHBsYXllcjpQbGF5ZXIsYnVmZjpCYXNlUGxheWVyQnVmZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5BZGRCdWZmKGJ1ZmYpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9Jbml0SXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCB0aGlzLk1vZGVsIT1udWxsJiYhdGhpcy5Nb2RlbC5kZXN0cm95ZWQgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBzID0gbmV3IExheWEuVmVjdG9yMygwLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0dlbkl0ZW1Nb2RlbChwcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKHBzOkxheWEuVmVjdG9yMylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLkl0ZW1UeXBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvY2s6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjMsIDAuMywgMC41KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihtb2RlbCE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGFzcyBSb2NrIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1vZGVsTnVtID0gMztcclxuICAgICAgICBjb25zdHJ1Y3RvcihTdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb2NrLFN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbChwczpMYXlhLlZlY3RvcjMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gMStNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqUm9jay5Nb2RlbE51bSk7XHJcbiAgICAgICAgICAgIHZhciBOYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMFwiK2lkeClcclxuICAgICAgICAgICAgbW9kZWwgPSBMYXlhLmxvYWRlci5nZXRSZXMoTmFtZSlcclxuICAgICAgICAgICAgbW9kZWwgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgICAgICBpZihtb2RlbCE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUm9ja10gPSBSb2NrO1xyXG4gICAgXHJcbiAgICBjbGFzcyBUaG9ybiBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoU3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVGhvcm4sU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwocHM6TGF5YS5WZWN0b3IzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcInRyYXBfc3RpbmdfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gcHM7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKFByb3RlY3RCdWZmLklkeCkhPW51bGwmJnBsYXllci5CdWZmQXJyW1Byb3RlY3RCdWZmLklkeF0uVHlwZSA9PSBJdGVtVHlwZS5Qcm90ZWN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuR2V0QnVmZihQcm90ZWN0QnVmZi5JZHgpLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlRyaWdnZXIoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuVGhvcm5dID0gVGhvcm47XHJcbiAgICBcclxuICAgIGNsYXNzIFByb3RlY3QgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlByb3RlY3Qsc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwocHM6TGF5YS5WZWN0b3IzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygtMzAsIDAsIDApLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZihQcm90ZWN0QnVmZi5JZHgpIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLl9BZGRCdWZmVG9QbGF5ZXIocGxheWVyLG5ldyBQcm90ZWN0QnVmZigzMDAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUHJvdGVjdF0gPSBQcm90ZWN0O1xyXG4gICAgXHJcbiAgICBjbGFzcyBQcm90ZWN0QnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBUaW1lOm51bWJlcjtcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6bnVtYmVyID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlByb3RlY3QsUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gQVBQLlNjZW5lTWFuYWdlci5DdXJEaXIuR2FtZVRpbWUrdGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVGltZTxBUFAuU2NlbmVNYW5hZ2VyLkN1ckRpci5HYW1lVGltZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGFzcyBDb2luIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBGbHlUb1BsYXllcihwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNvbmluOkFuaW1Db2luID0gQW5pbU9iai5HZW5BbmltT2JqPEFuaW1Db2luPihBbmltT2JqLkFuaW1Db2luLHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICBjb25pbi5TZXRUYXJnZXQocGxheWVyKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5BZGRHb2xkVW5Mb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5BZGRHb2xkKDEpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuQ29pbixzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbChwczpMYXlhLlZlY3RvcjMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9jb2luXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gcHM7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29pbl0gPSBDb2luO1xyXG4gICAgXHJcbiAgICBjbGFzcyBDb2xsZWN0ZXIgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZihDb2xsZWN0QnVmZi5JZHgpIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgQ29sbGVjdEJ1ZmYoMTAwMDApKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3RvcixzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbChwczpMYXlhLlZlY3RvcjMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IG51bGw7XHJcbiAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVTcGhlcmUoMC4yLDEwLDEwKSk7XHJcbiAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkNvbGxlY3Rvcl0gPSBDb2xsZWN0ZXI7XHJcbiAgICBcclxuICAgIGNsYXNzIENvbGxlY3RCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIEdhbWVEaXI6R2FtZURpcmVjdG9yO1xyXG4gICAgICAgIENvdW50Rmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTpudW1iZXIgPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUHJvdGVjdCxDb2xsZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVEaXIgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyO1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSB0aGlzLkdhbWVEaXIuR2FtZVRpbWUrdGltZTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudEZsb29yID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRGbG9vciA9IHRoaXMuR2FtZURpci5QbGF5ZXJGbG9vciAtIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU8dGhpcy5HYW1lRGlyLkdhbWVUaW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuR2FtZURpci5QbGF5ZXJGbG9vciAtIHRoaXMuQ291bnRGbG9vcisxPDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5HYW1lRGlyLkxvb3BEb0Zsb29yU3RlcCh0aGlzLkNvdW50Rmxvb3IsdGhpcyx0aGlzLkNvdW50Q29pbnMpO1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLkNvdW50Rmxvb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBDb3VudENvaW5zKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHN0ZXAuU3RlcEl0ZW0uSXRlbVR5cGUgPT0gSXRlbVR5cGUuQ29pbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIENvaW46Q29pbiA9IHN0ZXAuU3RlcEl0ZW0gYXMgQ29pbjtcclxuICAgICAgICAgICAgICAgIENvaW4uRmx5VG9QbGF5ZXIodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGFzcyBGTHkgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZigwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYobmV3IEZseUJ1ZmYoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkZseSxzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbChwczpMYXlhLlZlY3RvcjMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxKyBNYXRoLnJhbmRvbSgpKjIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTsgXHJcbiAgICAgICAgICAgIHBzLnkrPSAwLjM7XHJcbiAgICAgICAgICAgIG1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkZseV0gPSBGTHk7XHJcbiAgICBcclxuICAgIGNsYXNzIEZseUJ1ZmYgZXh0ZW5kcyBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgU3BlZWQ6bnVtYmVyO1xyXG4gICAgICAgIEZsb29yOm51bWJlcjtcclxuICAgICAgICBcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIGlmKHBsYXllci5DdXJTdGVwID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPXRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlLzIqdGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmbHlDdHJsID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJGbHkodGhpcy5TcGVlZCk7XHJcbiAgICAgICAgICAgIGZseUN0cmwuU2V0UGxheWVyKHBsYXllcilcclxuICAgICAgICAgICAgcGxheWVyLkFkZEN0cmxlcihmbHlDdHJsKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQoKSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICBwbGF5ZXIuRmx5UHJlcGFyZSgpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDpudW1iZXI9MC4xLGZsb29yOm51bWJlcj0xMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUsUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5fRmluYWxaIC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24uej4tMC4yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HZXRTdGVwQnlMb2NhdGlvbih0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuUG9wQ3RybGVyKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsYXNzIFJvcGUgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZigwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYobmV3IFJvcGVCdWZmKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb3BlLHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwocHM6TGF5YS5WZWN0b3IzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuTWVzaFNwcml0ZTNEID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4xLDAuNSwwLjEpKVxyXG4gICAgICAgICAgICBtb2RlbC50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMzAsIC00NSwgMCksIHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gcHM7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUm9wZV0gPSBSb3BlO1xyXG4gICAgXHJcbiAgICBjbGFzcyBSb3BlQnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBTcGVlZDpudW1iZXI7XHJcbiAgICAgICAgRmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLl9GaW5hbFogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56Pi0wLjIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5FbmQoc3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgRW5kKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9dGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gcGxheWVyLlBvc2l0aW9uLnogLSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMip0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDpudW1iZXI9MC4xLGZsb29yOm51bWJlcj0xMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUsUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0lucHV0KGlzUmlnaHQ6Ym9vbGVhbik6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlRmxvb3IgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLlBsYXllckZsb29yTGluZTtcclxuICAgICAgICAgICAgaWYoY2xvc2VGbG9vci5GbG9vck51bSUyIT0gdGhpcy5fRmluYWxMb2NhdGlvbi5ZJTIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlRmxvb3IgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdldEZsb29yQnlGbG9vcihjbG9zZUZsb29yLkZsb29yTnVtICsxICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IGNsb3NlRmxvb3IuR2V0U3RlcCggdGhpcy5fRmluYWxMb2NhdGlvbi5YICk7XHJcbiAgICAgICAgICAgIGlmKGlzUmlnaHQpXHJcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICAgICAgaWYoc3RlcC5TdGVwSXRlbS5Jc0ZvcmJpZGVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkVuZChzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsYXNzIFZpbmUgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY3VyQnVmZjpCYXNlUGxheWVyQnVmZiA9IHBsYXllci5HZXRCdWZmKDApO1xyXG4gICAgICAgICAgICBpZihjdXJCdWZmJiZjdXJCdWZmLlR5cGUgPT0gSXRlbVR5cGUuUHJvdGVjdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyQnVmZi5Db21wbGV0ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoY3VyQnVmZilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJCdWZmLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgVmluZUJ1ZmYoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVmluZSxzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbChwczpMYXlhLlZlY3RvcjMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxKyBNYXRoLnJhbmRvbSgpKjIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBJZHggPT0gMT8gcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIik6cGF0aC5HZXRMSChcInRyYXBfY2hvbXBlcl8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpOyBcclxuICAgICAgICAgICAgbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gcHM7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuVmluZV0gPSBWaW5lO1xyXG4gICAgXHJcbiAgICBjbGFzcyBWaW5lQnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBDb3VudFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIElucHV0RGlyOmJvb2xlYW47XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQodGhpcyx0aGlzLl9JbnB1dCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDb21wbGV0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvdW50VGltZTpudW1iZXIgPSA0LGlucHV0RGlyOmJvb2xlYW4gPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVmluZSwwKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudFRpbWUgPSBjb3VudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSBpbnB1dERpcjtcclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaXNSaWdodDpib29sZWFuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5JbnB1dERpciA9PSBpc1JpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklucHV0RGlyID0hdGhpcy5JbnB1dERpcjtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5Db3VudFRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5Db3VudFRpbWU8PTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfU2hvd0dhbWVJbmZvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOnN0cmluZztcclxuICAgICAgICAgICAgaWYodGhpcy5Db3VudFRpbWU8PTApXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gXCJcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuSW5wdXREaXIgPT0gdHJ1ZT9cIlJpZ2h0XCI6XCJMZWZ0XCI7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuU2hvd0lucHV0SW5mbyhpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCJleHBvcnQgbW9kdWxlIEdhbWVTdHJ1Y3Rcclxue1xyXG4gICAgZXhwb3J0IGNsYXNzIFNldEluZm8ge1xyXG4gICAgICAgIEF1ZGlvT246IGJvb2xlYW47XHJcbiAgICAgICAgT1BJc1JpZ2h0OiBib29sZWFuO1xyXG4gICAgICAgIFRleHRJbmZvOiBzdHJpbmc7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQXVkaW9PbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuT1BJc1JpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5UZXh0SW5mbyA9IFwiSGVsbG8gXFxuIEhlbGxvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE1Mb2NhdGlvblxyXG4gICAge1xyXG4gICAgICAgIGdldCBYKCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQXJyWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgWCh4Om51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyclswXSA9eDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFkoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBZKHk6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzFdID0geTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfQXJyOkFycmF5PG51bWJlcj47XHJcbiAgICAgICAgY29uc3RydWN0b3IoIHg6bnVtYmVyLHk6bnVtYmVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyciA9IFt4LHldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCB2YXIgSXRlbURpY3RUeXBlOntbSXRlbVR5cGU6bnVtYmVyXTphbnl9O1xyXG4gICAgSXRlbURpY3RUeXBlID0geyB9O1xyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOi+k+WFpeeuoeeQhuebuOWFs1xyXG4gKi9cclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5leHBvcnQgbW9kdWxlIElucHV0XHJcbntcclxuLy/ln7rnoYDovpPlhaXmjqfliLblmahcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VHYW1lSW5wdXRcclxue1xyXG4gICAgLy/lhazmnIlcclxuICAgIE5leHRJbnB1dDpCYXNlR2FtZUlucHV0O1xyXG4gICAgYWJzdHJhY3QgSW5wdXQoaXNSaWdodDpib29sZWFuKTtcclxuXHJcbiAgICAvL+engeaciVxyXG4gICAgY29uc3RydWN0b3IoIGlucHV0IDpCYXNlR2FtZUlucHV0ID0gbnVsbCApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaW5wdXQgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlucHV0ID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5OZXh0SW5wdXQgPSBpbnB1dDtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRElZSW5wdXQgZXh0ZW5kcyBCYXNlR2FtZUlucHV0XHJcbntcclxuICAgIElucHV0KGlzUmlnaHQ6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9MaXN0ZW5lcilcclxuICAgICAgICAgICAgdGhpcy5fTGlzdGVuZXIuY2FsbCh0aGlzLl9Pd25lcixpc1JpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9Pd25lcjphbnk7XHJcbiAgICBwcml2YXRlIF9MaXN0ZW5lcjooaXNyaW5nOmJvb2xlYW4pPT52b2lkO1xyXG4gICAgY29uc3RydWN0b3Iob3duZXI6YW55ID0gbnVsbCxsaXN0ZW5lcjooaXNyaW5nOmJvb2xlYW4pPT52b2lkID0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX093bmVyID0gb3duZXI7XHJcbiAgICAgICAgdGhpcy5fTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgTm9ybUdhbWVJbnB1dCBleHRlbmRzIEJhc2VHYW1lSW5wdXRcclxue1xyXG4gICAgR2FtZURpcjpHYW1lRGlyZWN0b3I7XHJcbiAgICBjb25zdHJ1Y3RvciggZGlyOkdhbWVEaXJlY3RvcixpbnB1dDpCYXNlR2FtZUlucHV0ID0gbnVsbCApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXQpO1xyXG4gICAgICAgIHRoaXMuR2FtZURpciA9IGRpcjtcclxuICAgIH1cclxuICAgIElucHV0KCBpc1JpZ2h0OmJvb2xlYW4gKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR2FtZURpci5Nb3ZlU3RlcChpc1JpZ2h0KTtcclxuICAgIH1cclxufVxyXG59XHJcbiIsImltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG5cclxuIC8qKuS9nOiAhTpNb1xyXG4gKuWcuuaZr+WGheWvueixoSBcclxuICovXHJcbi8v566h55CG5LiA5pW06KGMXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdW50TGluZSBleHRlbmRzIExheWEuU3ByaXRlM0Rcclxue1xyXG4gICAgTGluZUlkeDpudW1iZXI7XHJcbiAgICBGbG9vck51bTpudW1iZXI7XHJcbiAgICBTdGVwTGlzdDpTdGVwW107XHJcbiAgICBMb2dpY0xlbmd0aDpudW1iZXI7XHJcbiAgICBTdGVwSXRlbTpTdGVwSXRlbTtcclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7ojrflj5bmmL7npLrlh7rmnaXnmoTnrKzlh6DkuKrlubPlj7BcclxuICAgIEdldFN0ZXAoaWR4Om51bWJlcik6U3RlcFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlN0ZXBMaXN0W2lkeCArIDFdO1xyXG4gICAgfVxyXG4gICAgLy/orr7nva7mr4/lsYJcclxuICAgIFNldExpbmUoIGZsb29yOm51bWJlciApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5GbG9vck51bSA9IGZsb29yO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgIHZhciBzdGVwTGVuZ3RoID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICB2YXIgc3RlcERpc3RhbmNlPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2U7XHJcbiAgICAgICAgbmV3UFMueSA9IHN0ZXBMZW5ndGgqZmxvb3I7XHJcbiAgICAgICAgbmV3UFMueiA9IC1zdGVwRGlzdGFuY2UvMiAqZmxvb3I7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgICAgICB2YXIgc3RlcEFycjpTdGVwW10gPSB0aGlzLlN0ZXBMaXN0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBzdGFydFggPSAwIC0gc3RlcEFyci5sZW5ndGgvMiAqIHN0ZXBEaXN0YW5jZTtcclxuICAgICAgICBpZih0aGlzLkp1Z2VJc0xlc3NMaW5lKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGFydFggKz0gc3RlcERpc3RhbmNlLzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgZm9yKCB2YXIgY29sdW1uID0wIDtjb2x1bW48c3RlcEFyci5sZW5ndGg7Kytjb2x1bW4gKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N0ZXA6U3RlcCA9IHN0ZXBBcnJbY29sdW1uXTtcclxuICAgICAgICAgICAgdmFyIHN0ZXBWZWN0b3IgPSBuZXdTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICBzdGVwVmVjdG9yLnggPSBzdGFydFg7XHJcbiAgICAgICAgICAgIG5ld1N0ZXAuUmVzZXRTdGVwKHN0ZXBWZWN0b3IpXHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBzdGVwRGlzdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0ZXBBcnJbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc3RlcEFycltzdGVwQXJyLmxlbmd0aCAtMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgaWYoICEgdGhpcy5KdWdlSXNMZXNzTGluZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IHN0ZXBBcnIubGVuZ3RoLTI7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXBBcnJbc3RlcEFyci5sZW5ndGggLTJdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkxvZ2ljTGVuZ3RoID0gc3RlcEFyci5sZW5ndGggLTM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+WIpOaWreaYr+WQpuaUtue8qeeahOmCo+WxglxyXG4gICAgSnVnZUlzTGVzc0xpbmUoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRmxvb3JOdW0lMiAhPSAwO1xyXG4gICAgfVxyXG4gICAgLy/lsIbmr4/kuKroioLngrnpk77mjqXliLDkuIvkuIDlsYJcclxuICAgIFNldE5leHRGbG9vciggbGFzdEZsb29yOk1vdW50TGluZSk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5pyJ5Lik5aS056uv54K5XHJcbiAgICAgICAgdmFyIGhhdmVQb2ludCA9IGxhc3RGbG9vci5Mb2dpY0xlbmd0aCA+dGhpcy5Mb2dpY0xlbmd0aFxyXG4gICAgICAgIGZvciggdmFyIHN0YXJ0SWR4Om51bWJlciA9IDA7c3RhcnRJZHg8IHRoaXMuTG9naWNMZW5ndGg7KytzdGFydElkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0UGFyZW50OlN0ZXAgPW51bGw7XHJcbiAgICAgICAgICAgIHZhciByaWdodFBhcmVudDpTdGVwID1udWxsO1xyXG4gICAgICAgICAgICBpZihoYXZlUG9pbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxlZnRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgICAgICByaWdodFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4KzEpO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgtMSk7XHJcbiAgICAgICAgICAgICAgICByaWdodFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGhpU3RlcCA9IHRoaXMuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgIHRoaVN0ZXAuTGVmdFBhcmVudCA9IGxlZnRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGxlZnRQYXJlbnQuUmlnaHRDaGlsZCA9IHRoaVN0ZXA7XHJcblxyXG4gICAgICAgICAgICB0aGlTdGVwLlJpZ2h0UGFyZW50ID0gcmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgICAgIHJpZ2h0UGFyZW50LkxlZnRDaGlsZCA9IHRoaVN0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/mlbLnoo7kuIDlsYJcclxuICAgIEJyZWFrKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihsaW5lSWR4Om51bWJlcixmbG9vcjpudW1iZXIgPSAwKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjb2x1bW5zOm51bWJlciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkxpbmVTdGVwTnVtO1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5MaW5lSWR4ID0gbGluZUlkeDtcclxuICAgICAgICB0aGlzLkZsb29yTnVtID0gZmxvb3I7XHJcbiAgICAgICAgdGhpcy5TdGVwTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuTG9naWNMZW5ndGggPSAwO1xyXG4gICAgICAgIGZvciggdmFyIFN0YXJ0SWR4Om51bWJlciA9IChjb2x1bW5zIC0xKTtTdGFydElkeD49MDstLVN0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuZXdTdGVwOlN0ZXAgPSBuZXcgU3RlcCh0aGlzLFN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChuZXdTdGVwKTtcclxuICAgICAgICAgICAgdGhpcy5TdGVwTGlzdFtTdGFydElkeF0gPSBuZXdTdGVwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHtQbGF5ZXJDb250cm9sZXJ9IGZyb20gXCIuL1BsYXllckN0cmxlclwiXHJcbmltcG9ydCB7UGxheWVyQnVmZn0gZnJvbSBcIi4vQnVmZlwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbnZhciBudW06bnVtYmVyID0gMDtcclxudHlwZSBCYXNlUGxheWVyQnVmZiA9IFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmY7XHJcbi8v6K+l6ISa5pys55So5LqO5ri45oiP546p5a625a+56LGh566h55CGXHJcbi8v546p5a625a+56LGhXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIExheWEuU3ByaXRlM0Rcclxue1xyXG4gICAgc2V0IEN1clN0ZXAoc3RlcDpTdGVwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0N1clN0ZXAgPSBzdGVwO1xyXG4gICAgfVxyXG4gICAgZ2V0IEN1clN0ZXAoKTpTdGVwXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0N1clN0ZXA7XHJcbiAgICB9XHJcbiAgICBCYXNlQ3RybGVyOlBsYXllckNvbnRyb2xlci5QbGF5ZXJOb3JtQ3RybGVyO1xyXG4gICAgQnVmZkFycjpBcnJheTxQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmPjtcclxuICAgIC8vemVyZ1xyXG4gICAgSWROdW1iZXI6bnVtYmVyO1xyXG4gICAgR2V0QnVmZihpZHg6bnVtYmVyKTpQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLkJ1ZmZBcnJbaWR4XSAhPW51bGwmJnRoaXMuQnVmZkFycltpZHhdIT11bmRlZmluZWQpP3RoaXMuQnVmZkFycltpZHhdOm51bGw7XHJcbiAgICB9XHJcbiAgICAvL+aRhuaUvuinkuiJslxyXG4gICAgU2V0U3RlcChwdXRTdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBwdXRTdGVwO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHB1dFN0ZXAuUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBuZXdQUy55ICs9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBwdXRTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuVG91Y2hHcm91bmQoKTtcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3UFM6TGF5YS5WZWN0b3IzID0gbmV3UFMuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9naWNQb3NpdGlvbigpOkxheWEuVmVjdG9yM1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5biD5bGA5b2T5YmN5bGC5L2G5LiN56e75YqoXHJcbiAgICAgKiBAcGFyYW0ge1N0ZXB9IHN0ZXAg5LiL5LiA5q2l5Y+w6Zi2XHJcbiAgICAgKi9cclxuICAgIExheVN0ZXAoc3RlcDpTdGVwKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gc3RlcDtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gc3RlcC5Qb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+inpuWPkeWPsOmYtlxyXG4gICAgVG91Y2hHcm91bmQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYoKHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5JdGVtVHlwZSA9PSBJdGVtLkl0ZW1UeXBlLk5vbmUpJiYodGhpcy5DdXJTdGVwLklzRW1wdHl8fCh0aGlzLkN1clN0ZXAuTGVmdFBhcmVudCYmdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50JiZ0aGlzLkN1clN0ZXAuTGVmdFBhcmVudC5TdGVwSXRlbS5Jc0ZvcmJpZGVuJiZ0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbikpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlRyaWdnZXIoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwLlN0ZXBJdGVtLlRvdWNoSXRlbSh0aGlzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vliqhcclxuICAgICAqIEBwYXJhbSB7TGF5YS5WZWN0b3IzfSB2ZWN0b3Ig56e75Yqo5ZCR6YeP5YC8XHJcbiAgICAgKi9cclxuICAgIFRyYW5zbGF0ZSggdmVjdG9yOkxheWEuVmVjdG9yMyApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS50cmFuc2xhdGUodmVjdG9yKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMuX0xvZ2ljUG9zaXRpb24sdmVjdG9yLHRoaXMuX0xvZ2ljUG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg546p5a625o6n5Yi25ZmoXHJcbiAgICAgKiBAcGFyYW0gbmV3Q3RybGVyIOaWsOeOqeWutuaOp+WItuWZqFxyXG4gICAgICovXHJcbiAgICBBZGRDdHJsZXIobmV3Q3RybGVyOlBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciBjdHJsZXI6UGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXIgPSB0aGlzLl9DdHJsZXI7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyID0gbmV3Q3RybGVyO1xyXG4gICAgICAgIG5ld0N0cmxlci5OZXh0Q3RybCA9Y3RybGVyO1xyXG4gICAgICAgIG5ld0N0cmxlci5TZXRQbGF5ZXIodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vkuqTmjqfliLblmahcclxuICAgICAqL1xyXG4gICAgUG9wQ3RybGVyKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IHRoaXMuX0N0cmxlci5OZXh0Q3RybDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5re75YqgQlVGRlxyXG4gICAgICogQHBhcmFtIGJ1ZmYgXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggXHJcbiAgICAgKi9cclxuICAgIEFkZEJ1ZmYoYnVmZjpQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZGV4Om51bWJlciA9IGJ1ZmYuSWR4O1xyXG4gICAgICAgIGlmKHRoaXMuQnVmZkFycltpbmRleF0hPW51bGx8fHRoaXMuQnVmZkFycltpbmRleF0hPXVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5CdWZmQXJyW2luZGV4XSA9IGJ1ZmY7XHJcbiAgICAgICAgYnVmZi5JZHggPSBpbmRleDtcclxuICAgICAgICBidWZmLlN0YXJ0KHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqBCVUZG5qih5Z6LXHJcbiAgICAgKiBAcGFyYW0gbW9kIFxyXG4gICAgICovXHJcbiAgICBBZGRCdWZmTW9kZSggbW9kOkxheWEuU3ByaXRlM0QgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKG1vZCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZOb2RlLmFkZENoaWxkKG1vZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5PmnZ9CVUZGXHJcbiAgICAgKi9cclxuICAgIENvbXBsZXRlQnVmZihpbmRleDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGJ1ZmY6QmFzZVBsYXllckJ1ZmYgPSB0aGlzLkJ1ZmZBcnJbaW5kZXhdO1xyXG4gICAgICAgIHRoaXMuQnVmZkFycltpbmRleF09bnVsbDtcclxuICAgICAgICBpZihidWZmPT1udWxsfHxidWZmPT11bmRlZmluZWQgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v56eB5pyJ5bGe5oCnXHJcbiAgICBfTG9naWNQb3NpdGlvbjpMYXlhLlZlY3RvcjM7XHJcbiAgICBfQnVmZk5vZGU6TGF5YS5TcHJpdGUzRDtcclxuICAgIF9QbGF5ZXJNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgX0N1clN0ZXA6U3RlcDtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHZhciBOYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJjMDAxX2NoaWxkXzAxXCIpO1xyXG4gICAgICAgIHZhciBQbGF5ZXJNb2RlbCA9IExheWEuTG9hZGVyLmdldFJlcyhOYW1lKTtcclxuICAgICAgICB2YXIgc2Vjb25kUGxheWVyOkxheWEuU3ByaXRlM0QgPSBQbGF5ZXJNb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoc2Vjb25kUGxheWVyKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzKTtcclxuICAgICAgICAvL+a3u+WKoOiHquWumuS5ieaooeWei1xyXG4gICAgICAgIHNlY29uZFBsYXllci50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgMTgwLCAwKSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLm9uKExheWEuRXZlbnQuUkVNT1ZFRCx0aGlzLCgpPT57IHRoaXMuZGVzdHJveSgpIH0pXHJcbiAgICAgICAgdGhpcy5SZXNldCgpO1xyXG4gICAgfVxyXG4gICAgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdHJsZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgZm9yKCB2YXIgYnVmZklkeDpudW1iZXIgPSAwO2J1ZmZJZHg8MjsrK2J1ZmZJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5CdWZmQXJyW2J1ZmZJZHhdIT1udWxsfHx0aGlzLkJ1ZmZBcnJbYnVmZklkeF0hPXVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMuQnVmZkFycltidWZmSWR4XS5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBGbHlQcmVwYXJlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgUmVzZXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IG51bGw7XHJcbiAgICAgICAgaWYodGhpcy5fQnVmZk5vZGUpXHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9CdWZmTm9kZSA9IG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9CdWZmTm9kZSk7XHJcbiAgICAgICAgdGhpcy5CdWZmQXJyID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5CYXNlQ3RybGVyID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJOb3JtQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IHRoaXMuQmFzZUN0cmxlcjtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygwLDApO1xyXG4gICAgICAgIHRoaXMuZnJhbWVMb29wKDEsdGhpcyx0aGlzLl9VcGRhdGUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfQ3RybGVyOlBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyO1xyXG5cclxuICAgIFxyXG59XHJcblxyXG5jbGFzcyBTdGVwRGF0YVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7fVxyXG4gICAgR2V0RGF0YSggc3RlcDpTdGVwIClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi9HYW1lU3RydWN0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5leHBvcnQgbW9kdWxlIFBsYXllckNvbnRyb2xlclxyXG57XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBsYXllckN0cmxlclxyXG4gICAge1xyXG4gICAgICAgIC8v5YWs5YWx5o6l5Y+jXHJcbiAgICAgICAgTmV4dEN0cmw6QmFzZVBsYXllckN0cmxlcjtcclxuICAgICAgICBwbGF5ZXI6UGxheWVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFVwZGF0ZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTZXRQbGF5ZXIocGxheWVyOlBsYXllcik6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgY29uc3RydWN0b3IoIHBsYXllcjpQbGF5ZXIsIGN0cmxlcjpCYXNlUGxheWVyQ3RybGVyID0gbnVsbCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihjdHJsZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3RybGVyID0gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk5leHRDdHJsID0gY3RybGVyO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IF9VcGRhdGUoKTp2b2lkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eUqOS6juinkuiJsuato+W4uOeKtuaAgeS4i+eahOenu+WKqFxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllck5vcm1DdHJsZXIgZXh0ZW5kcyBCYXNlUGxheWVyQ3RybGVyXHJcbiAgICB7XHJcbiAgICAgICAgVGltZTpudW1iZXI7XHJcbiAgICAgICAgU3RhcnRNb3ZlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLkdhbWVUaW1lICsgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuUGxheWVyTW92ZVRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHBsYXllcjpQbGF5ZXIgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5UaW1lPD1BUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkN1ckRpci5HYW1lVGltZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRpbWUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5TZXRTdGVwKHRoaXMucGxheWVyLkN1clN0ZXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdFRpbWUgPSB0aGlzLlRpbWUtTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhdGUgPSAoMS1sYXN0VGltZS8gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuUGxheWVyTW92ZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBTdGVwUHM6TGF5YS5WZWN0b3IzID0gdGhpcy5wbGF5ZXIuQ3VyU3RlcC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBTdGVwUHMueSArPUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnBzOkxheWEuVmVjdG9yMyA9IHRoaXMucGxheWVyLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnBzLnkgKz1Db250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQcyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdQcy54ID0gKFN0ZXBQcy54IC0gY3VycHMueCkqcmF0ZSsgY3VycHMueDtcclxuICAgICAgICAgICAgICAgICAgICBuZXdQcy55ID0gKFN0ZXBQcy55IC0gY3VycHMueSkqcmF0ZStjdXJwcy55O1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1BzLnogPSAoU3RlcFBzLnogLSBjdXJwcy56KSpyYXRlK2N1cnBzLno7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5Qb3NpdGlvbiA9IG5ld1BzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eOqeWutumjnuihjFxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckZseSBleHRlbmRzIEJhc2VQbGF5ZXJDdHJsZXJcclxuICAgIHtcclxuICAgICAgICBTcGVlZDpudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u546p5a62XHJcbiAgICAgICAgICogQHBhcmFtIHBsYXllciDmk43mjqfop5LoibJcclxuICAgICAgICAgKi9cclxuICAgICAgICBTZXRQbGF5ZXIocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlNldFBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuVHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCxDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoLDApKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmVjdG9yID0gbmV3IExheWEuVmVjdG9yMygwLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsLTEqQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlLzIpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKHZlY3Rvcix0aGlzLlNwZWVkLHZlY3Rvcik7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLlRyYW5zbGF0ZSh2ZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi9Nb3VudExpbmVcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG50eXBlIE1Mb2NhdGlvbiA9IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4vL+atpVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG57XHJcbiAgICAvL+aooeWei+S4quaVsFxyXG4gICAgcHVibGljIHN0YXRpYyBzdGVwTW9kZWxOdW06bnVtYmVyID0gMztcclxuXHJcbiAgICBMZWZ0UGFyZW50OlN0ZXA7XHJcbiAgICBSaWdodFBhcmVudDpTdGVwO1xyXG4gICAgTGVmdENoaWxkOlN0ZXA7XHJcbiAgICBSaWdodENoaWxkOlN0ZXA7XHJcbiAgICBTdGVwSXRlbTpTdGVwSXRlbTtcclxuICAgIFJvYWROdW06bnVtYmVyO1xyXG4gICAgTWFyazphbnk7XHJcbiAgICBGbG9vcjpNb3VudExpbmU7XHJcbiAgICBJZHg6bnVtYmVyO1xyXG4gICAgXHJcbiAgICAvL+WFrOacieaOpeWPo1xyXG4gICAgc2V0IFBvc2l0aW9uKCBuZXdQUzpMYXlhLlZlY3RvcjMgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9jYXRpb24oKTpNTG9jYXRpb25cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKHRoaXMuSWR4LTEsdGhpcy5GbG9vci5GbG9vck51bSk7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNEZWFkUm9hZCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNEZWFkUm9hZHx8IXRoaXMuYWN0aXZlfHwgdGhpcy5TdGVwSXRlbS5Jc0RpZmZpY3VsdHk7XHJcbiAgICB9XHJcbiAgICBzZXQgSXNEZWFkUm9hZCh2YWx1ZTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBJc0ZvcmJpZGVuKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlN0ZXBJdGVtLklzRm9yYmlkZW47XHJcbiAgICB9XHJcbiAgICBnZXQgSXNFbXB0eSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gISh0aGlzLmFjdGl2ZSYmdGhpcy5GbG9vci5hY3RpdmUpO1xyXG4gICAgfVxyXG4gICAgUHV0SXRlbSggaXRlbUVudW1lOkl0ZW0uSXRlbVR5cGUgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGl0ZW1FbnVtZSA9PSBJdGVtLkl0ZW1UeXBlLkVtcHR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPWZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5QdXRJdGVtKGl0ZW1FbnVtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXRTdGVwKG5ld1BzOkxheWEuVmVjdG9yMylcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBvc2l0aW9uID0gbmV3UHM7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBtb2RlbFBzID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5QdXRJdGVtKEl0ZW0uSXRlbVR5cGUuTm9uZSk7XHJcblxyXG4gICAgICAgIHRoaXMuTGVmdFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9hZE51bSA9IDA7XHJcbiAgICB9XHJcbiAgICBfU3RlcE1vZGVsOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBjb25zdHJ1Y3RvcihmbG9vcjpNb3VudExpbmUsaWR4Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICAvL3N1cGVyKG5ldyBMYXlhLkJveE1lc2goMSwxLDEpICk7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzKTtcclxuICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxKyBNYXRoLnJhbmRvbSgpKlN0ZXAuc3RlcE1vZGVsTnVtKTtcclxuICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzBcIitJZHgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgIC8vdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoIExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC41LCAwLjUsIDAuNSkpIDsvL2xvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGNsb25lTW9kZWwgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIGNsb25lTW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoY2xvbmVNb2RlbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW1GYWN0b3J5KEl0ZW0uSXRlbVR5cGUuTm9uZSx0aGlzKTs7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5SZXNldEl0ZW0oKTtcclxuICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgdGhpcy5JZHggPSBpZHg7XHJcblxyXG4gICAgICAgIHRoaXMuTGVmdFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRDaGlsZCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlJvYWROdW0gPSAwO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfSXNEZWFkUm9hZDpib29sZWFuO1xyXG5cclxufSIsIi8qKlxyXG4gKiDkvZzogIU6TW9cclxuICog5ZCv5Yqo5Zy65pmvXHJcbiAqL1xyXG5cclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IExvYWRTY2VuZSBmcm9tIFwiLi9TY2VuZS9Mb2FkU2NlbmVcIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5pbXBvcnQgQVBQIGZyb20gXCIuL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCJcclxuY2xhc3MgR2FtZVxyXG57XHJcblx0X0ZyYW1lOkZyYW1lV29yaztcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB2YXIgc3MgPSBBUFA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTGF5YTNELmluaXQoMCwgMCk7XHJcbiAgICAgICAgR2FtZUNvbmZpZy5pbml0KCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gTGF5YS5TdGFnZS5TQ1JFRU5fVkVSVElDQUw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBMYXlhLlN0YWdlLkFMSUdOX0JPVFRPTTtcclxuICAgICAgICAvL+W8gOWQr+e7n+iuoeS/oeaBr1xyXG5cdFx0TGF5YS5TdGF0LnNob3coKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcmVzQ29sID0gW3t1cmw6XCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpcInVpL1Jlc291cmNlL2xvY2FsY29tcC5hdGxhc1wiLHR5cGU6TGF5YS5Mb2FkZXIuQVRMQVN9XTtcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHJlc0NvbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCkpO1xyXG4gICAgfVxyXG4gICAgb25Mb2FkZWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0ZyYW1lID0gRnJhbWVXb3JrLkZNO1xyXG4gICAgICAgIHRoaXMuX0ZyYW1lLkFkZE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB2YXIgc2NlbmVNZ3I6U2NlbmVNYW5hZ2VyID0gdGhpcy5fRnJhbWUuQWRkTWFuYWdlcjxTY2VuZU1hbmFnZXI+KFNjZW5lTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5fRnJhbWUuQWRkTWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcblx0XHRzY2VuZU1nci5FbnRlclNjZW5lKG5ldyBMb2FkU2NlbmUoKSk7XHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuVXBkYXRlKTtcclxuICAgIH1cclxuXHRcclxuICAgIFVwZGF0ZSggKVxyXG4gICAge1xyXG5cdFx0Ly90aGlzLlNjZW5lTWdyLlVwZGF0ZSgpO1xyXG5cdFx0dGhpcy5fRnJhbWUuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxudmFyIEdNID0gbmV3IEdhbWUoKTsiLCJpbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBMaWZlT2JqIGZyb20gXCIuLy4uL0Jhc2UvTGlmZU9ialwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCI7XHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBCRyBmcm9tIFwiLi8uLi91aS9CR1wiXHJcblxyXG4vL+WvvOa8lOWfuuexu1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlRGlyZWN0b3IgZXh0ZW5kcyBMaWZlT2JqXHJcbntcclxuICAgIFxyXG4gICAgX0xlYXZlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZ2lzdElESyhNZXNzYWdlTUQuR2FtZUV2ZW50LkdhbWVUaW1lVXApO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZ2lzdElESyhNZXNzYWdlTUQuR2FtZUV2ZW50LkdhbWVDb250aW51ZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuX0xlYXZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVGltZVVwKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX1RpbWVVcENsb2NrPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lVGltZVVwKTtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9UaW1lVXBDbG9jazw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBDb250aW51ZVRpbWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lQ29udGludWUpO1xyXG4gICAgICAgIHRoaXMuX1RpbWVVcENvdW50ICs9IExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5fVGltZVVwQ2xvY2s7XHJcbiAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgQ3VyR2FtZVRpbWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RhcnRHYW1lVGltZSArIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+engeacieWxnuaAp+WSjOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBfU3RhcnRHYW1lVGltZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9UaW1lVXBDb3VudDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9UaW1lVXBDbG9jazpudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX1VJTWdyOlVJTWFuYWdlcjtcclxuICAgIHByaXZhdGUgX0JHOkJHO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgdGhpcy5fVUlNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLlNjZW5lTWdyID0gQVBQLlNjZW5lTWFuYWdlcjtcclxuICAgICAgICB0aGlzLl9CRyA9IEFQUC5TY2VuZU1hbmFnZXIuQkcgYXMgQkc7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0Q29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgIHRoaXMuX1VJTWdyLkNsZWFyKCk7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgIH1cclxuICAgIFNjZW5lTWdyOlNjZW5lTWFuYWdlcjtcclxuXHJcbiAgICBnZXQgR2FtZVRpbWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9UaW1lVXBDbG9jaz4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1RpbWVVcENsb2NrLSB0aGlzLl9TdGFydEdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBMYXlhLnRpbWVyLmN1cnJUaW1lci0gdGhpcy5fU3RhcnRHYW1lVGltZSAtIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNldCBHYW1lVGltZSh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy/lpJbpg6jmjqXlj6NcclxuICAgIFN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICBzdXBlci5fU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhYnN0cmFjdCBSZVN0YXJ0KCk6dm9pZDtcclxufSIsImltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgTGlmZU9iaiBmcm9tIFwiLi8uLi9CYXNlL0xpZmVPYmpcIlxyXG5pbXBvcnQge0VudW19IGZyb20gXCIuLy4uL0Jhc2UvTGlmZU9ialwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbi8v5Zy65pmv5Z+657G7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VTY2VuZSBleHRlbmRzIExpZmVPYmpcclxue1xyXG4gICAgLy/lpJbpg6jmjqXlj6NcclxuICAgIEN1ckRpcjpCYXNlRGlyZWN0b3I7XHJcbiAgICBJc0xvYWRDb21wbGV0ZTpib29sZWFuO1xyXG4gICAgU2NlbmU6TGF5YS5TY2VuZTNEO1xyXG4gICAgSXNMb2FkaW5nOmJvb2xlYW47XHJcblxyXG4gICAgLy/nu5PmnZ/lnLrmma9cclxuICAgIExlYXZlKG5leHRTdGFnZTpCYXNlU2NlbmUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9OZXh0U2NlbmUgPSBuZXh0U3RhZ2U7XHJcbiAgICAgICAgbmV4dFN0YWdlLlN0YXJ0TG9hZCgpO1xyXG4gICAgICAgIHRoaXMuX0xlYXZlKCk7XHJcbiAgICB9XHJcbiAgICBTdGFydExvYWQoICkvLzsvL0NhbGxCYWNrOigpPT52b2lkKTsvLylDYWxsQmFjaygpOnZvaWQ9Pik7XHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Jc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+W8gOWni+WcuuaZr1xyXG4gICAgU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuSXNMb2FkQ29tcGxldGUgJiYgIXRoaXMuSXNMb2FkaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TdGFydExvYWQoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5fTG9hZENhbGxCYWNrID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0xvYWRDYWxsQmFjayA9IHRoaXMuX1N0YXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoIXRoaXMuSXNMb2FkaW5nKVxyXG4gICAgICAgICAgICB0aGlzLl9TdGFydCgpO1xyXG4gICAgfVxyXG4gICAgLy/mlL7lr7nosaFcclxuICAgIFB1dE9iaihub2RlOkxheWEuU3ByaXRlM0QgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYobm9kZSA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCYXNlU2NlbmUgUHV0T2JqIEVycm9yOmVtcHR5IFNwcml0ZTNEXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgdGhpcy5TY2VuZS5hZGRDaGlsZChub2RlKTsgIFxyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcm90ZWN0ZWQgX05leHRTY2VuZTpCYXNlU2NlbmU7Ly/kuIvkuIDkuKrlnLrmma9cclxuICAgIHByb3RlY3RlZCBfTG9hZENhbGxCYWNrOigpPT52b2lkO1xyXG4gICAgcHJvdGVjdGVkIF9VSU1hbmFnZXI6VUlNYW5hZ2VyO1xyXG4gICAgcHJvdGVjdGVkIF9NZXNzYWdlTWdyOk1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLklzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuSXNMb2FkQ29tcGxldGUgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuQ3VyRGlyID0gbnVsbDtcclxuICAgICAgICB0aGlzLlNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLl9NZXNzYWdlTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIHRoaXMuX0xvYWRDYWxsQmFjayA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fTmV4dFNjZW5lID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX0xlYXZpbmcoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlci5DbGVhcigpO1xyXG5cclxuICAgICAgICBpZih0aGlzLkN1ckRpci5PYmpTdGF0ZSA9PSBFbnVtLkxpZmVPYmpTdGF0ZS5FbmRlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLl9MZWF2ZWluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX0xlYXZlQ29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLl9MZWF2ZUNvbXBsZXRlKCk7XHJcbiAgICAgICAgaWYodGhpcy5TY2VuZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU2NlbmUucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLlNjZW5lLm51bUNoaWxkcmVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWN0b3IgPSB0aGlzLlNjZW5lLmdldENoaWxkQXQoMCk7XHJcbiAgICAgICAgICAgICAgICBhY3Rvci5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUlNYW5hZ2VyLkNsZWFyKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZSA9IHRoaXMuX05leHRTY2VuZTtcclxuICAgICAgICAvL3plcmcg5Zy65pmv5LiN55+l6YGT5Lya5LiN5Lya5YaF5a2Y5rOE5ryPXHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9VcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCB0aGlzLkN1ckRpciE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyRGlyLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfR2VuRGlyKCk6dm9pZDtcclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9Mb2FkQ29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgdGhpcy5Jc0xvYWRDb21wbGV0ZSA9IHRydWU7XHJcbiAgICAgICB0aGlzLklzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHRoaXMuX0xvYWRDYWxsQmFjayE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xvYWRDYWxsQmFjaygpO1xyXG4gICAgICAgICAgICB0aGlzLl9Mb2FkQ2FsbEJhY2sgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5fU3RhcnQoKTtcclxuICAgICAgICBpZih0aGlzLlNjZW5lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZSA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9TdGFydGluZygpXHJcbiAgICB7XHJcbiAgICAgICAgLy/otYTmupDpg73msqHkuIvlrozlsLHkuI3opoHotbDlhbblroPpgLvovpHkuoZcclxuICAgICAgICBpZih0aGlzLklzTG9hZGluZyYmIHRoaXMuSXNMb2FkQ29tcGxldGUgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTG9hZENvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc3VwZXIuX1N0YXJ0aW5nKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0Q29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlci5DbGVhcigpO1xyXG5cclxuICAgICAgICB0aGlzLl9HZW5EaXIoKTtcclxuICAgICAgICBzdXBlci5fU3RhcnRDb21wbGV0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7SW5wdXR9IGZyb20gXCIuLy4uL0dhbWUvSW5wdXRcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4vLi4vdWkvR2FtZVVJXCJcclxuaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi8uLi9HYW1lL01vdW50TGluZVwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG50eXBlIEl0ZW1MYXlvdXQgPSBJdGVtLkl0ZW1MYXlvdXQ7XHJcbnR5cGUgTGluZUl0ZW1JbmZvID0gSXRlbS5MaW5lSXRlbUluZm87XHJcbnZhciBJdGVtVHlwZSA9IEl0ZW0uSXRlbVR5cGU7XHJcblxyXG4vL+a4uOaIj+WvvOa8lFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lRGlyZWN0b3IgZXh0ZW5kcyBCYXNlRGlyZWN0b3Jcclxue1xyXG4gICAgQ2FtZXJhOkdhbWVDYW1lcmE7XHJcbiAgICBHYW1lU2NlbmU6QmFzZVNjZW5lO1xyXG4gICAgTW91bnRMaW5lczpNb3VudExpbmVbXTtcclxuICAgIFBsYXllcjpQbGF5ZXI7XHJcbiAgICBJbnB1dEN0cmw6SW5wdXQuQmFzZUdhbWVJbnB1dDtcclxuICAgIEl0ZW1MYXlvdXQ6SXRlbUxheW91dDtcclxuICAgIEN1ckxpbmVSZXdhcmRzOkFycmF5PExpbmVJdGVtSW5mbz47XHJcbiAgICBDdXJMaW5lQmFycmllcnM6QXJyYXk8TGluZUl0ZW1JbmZvPjtcclxuICAgIG5hbWU6bnVtYmVyO1xyXG4gICAgZ2V0IFNhZmVMb2NhdGlvbigpOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NhZmVMb2NhdGlvbjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1NhZmVMb2NhdGlvbjpHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgIEFkZElucHV0Q3RybGVyKHZhbHVlOklucHV0LkJhc2VHYW1lSW5wdXQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFsdWUuTmV4dElucHV0ID0gdGhpcy5JbnB1dEN0cmw7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFBvcElucHV0Q3RybGVyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IHRoaXMuSW5wdXRDdHJsLk5leHRJbnB1dDtcclxuICAgIH1cclxuICAgIEFkZEdvbGQobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtICs9IG51bTtcclxuICAgICAgICB0aGlzLkFkZExvZ2ljR29sZChudW0pO1xyXG4gICAgfVxyXG4gICAgQWRkR29sZFVuTG9naWNHb2xkKG51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fR29sZE51bSArPSBudW07XHJcbiAgICB9XHJcbiAgICBBZGRMb2dpY0dvbGQobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuQWRkR29sZChudW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5a6J5YWo5L2N572uXHJcbiAgICBTZXRTYWZlUFMobG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgaWYobG9jYXRpb24uWTx0aGlzLlRhaWxGTG9vci5GbG9vck51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgaWYobG9jYXRpb24uWTw9dGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmxvb3JOdW0gPSBsb2NhdGlvbi5ZXHJcbiAgICAgICAgICAgIGZvcihsZXQgaW5kZXggPSAwO2luZGV4PDI7KytpbmRleClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Mb29wRG9GbG9vclN0ZXAoZmxvb3JOdW0raW5kZXgsdGhpcyx0aGlzLkNsZWFyRmxvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5LuO5p+Q5LiA5bGC5byA5aeL5LiA5bGC5bGC6YeN5paw5pGG5pS+6YGT5YW3XHJcbiAgICBSZXNldEl0ZW0oIGZsb29yOm51bWJlciApXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBmbG9vcjpudW1iZXI7Zmxvb3I8PXRoaXMuSGVhZEZsb29yLkZsb29yTnVtOysrZmxvb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLkxvb3BEb0Zsb29yU3RlcChmbG9vcix0aGlzLHRoaXMuQ2xlYXJGbG9vcik7XHJcbiAgICAgICAgICAgIHRoaXMuX1B1dEl0ZW1JbkxpbmUoZmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+a4heeQhuWxgumBk+WFt1xyXG4gICAgQ2xlYXJGbG9vcihzdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgc3RlcEl0ZW0gPSBzdGVwLlN0ZXBJdGVtO1xyXG4gICAgICAgIHN0ZXAuUHV0SXRlbShJdGVtVHlwZS5Ob25lKTtcclxuICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGdldCBQYW5lbFVJKCk6R2FtZVVJXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1BhbmVsVUk7XHJcbiAgICB9XHJcbiAgICBzZXQgUGFuZWxVSSh2YWx1ZTpHYW1lVUkpXHJcbiAgICB7XHJcbiAgICAgICAgdmFsdWUuU2V0TGVmdFRvdWNoKHRoaXMsKCk9Pnt0aGlzLklucHV0Q3RybC5JbnB1dChmYWxzZSk7fSlcclxuICAgICAgICB2YWx1ZS5TZXRSaWdodFRvdWNoKHRoaXMsKCk9Pnt0aGlzLklucHV0Q3RybC5JbnB1dCh0cnVlKTt9KTsgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IEhlYWRGbG9vcigpOk1vdW50TGluZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbdGhpcy5fSGVhZEZsb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBUYWlsRkxvb3IoKTpNb3VudExpbmVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb3VudExpbmVzW3RoaXMuX1RhaWxGTG9vcklkeF07XHJcbiAgICB9XHJcbiAgICBnZXQgUGxheWVyRGlzdGFuY2UoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoKHRoaXMuUGxheWVyLlBvc2l0aW9uLnogLSB0aGlzLl9TdGFydFBvc2l0aW9uLnopLyhDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMikpO1xyXG4gICAgfVxyXG5cclxuICAgIERlYXRoKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciB1aTpFbmRHYW1lVUkgPSB0aGlzLl9VSU1nci5TaG93PEVuZEdhbWVVST4oRW5kR2FtZVVJKTtcclxuICAgICAgICAvL3VpLlNldEdhbWVJbmZvKHRoaXMuUGxheWVyRGlzdGFuY2UsdGhpcy5fR29sZE51bSk7XHJcbiAgICAgICAgdGhpcy5UaW1lVXAoKTtcclxuICAgIH1cclxuICAgIC8v5a+55aSW5o6l5Y+jXHJcbiAgICBTdGFydCggKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU3RhcnQoKTtcclxuICAgIH1cclxuICAgIC8v6YeN5paw5byA5aeLXHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgIH1cclxuICAgIFNob3dJbnB1dEluZm8oaW5mbzpzdHJpbmcpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuU2hvd0lucHV0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuICAgIC8v5bem5Y+z56e75YqoXHJcbiAgICBNb3ZlU3RlcCggaXNSaWdodDpib29sZWFuIClcclxuICAgIHtcclxuICAgICAgICAvL+enu+WKqOS4reS4jeiuqei+k+WFpVxyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuVGltZT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3ZhciBidWZmID0gdGhpcy5CdWZmZXI7XHJcbiAgICAgICAgLy/ojrflj5bkuIvkuIDlsYLnmoRTdGVwXHJcbiAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IHRoaXMuUGxheWVyLkN1clN0ZXA7XHJcbiAgICAgICAgaWYoc3RlcCA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNSaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc3RlcCA9PSBudWxsfHxzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lsYLmlbDojrflj5bmn5DlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgR2V0Rmxvb3JCeUZsb29yKGZsb29yOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yOk1vdW50TGluZSA9IHRoaXMuVGFpbEZMb29yO1xyXG4gICAgICAgIGlmKGZsb29yPCB0YWlsRmxvb3IuRmxvb3JOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29ySUQgPSAoZmxvb3IgLSB0YWlsRmxvb3IuRmxvb3JOdW0gICsgdGhpcy5fVGFpbEZMb29ySWR4KSV0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbZmxvb3JJRF07XHJcbiAgICB9XHJcblxyXG4gICAgTG9vcERvRmxvb3JTdGVwKCBmbG9vcjpudW1iZXIsT3duZXI6YW55LGNhbGxCYWNrOihzdGVwOlN0ZXApPT52b2lkICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKGZsb29yPHRoaXMuVGFpbEZMb29yLkZsb29yTnVtfHxmbG9vcj50aGlzLkhlYWRGbG9vci5GbG9vck51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yTGluZTpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgZm9yKGxldCBpZHg9MDtpZHg8Zmxvb3JMaW5lLkxvZ2ljTGVuZ3RoOysraWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vckxpbmUuR2V0U3RlcChpZHgpO1xyXG4gICAgICAgICAgICBjYWxsQmFjay5jYWxsKE93bmVyLHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmui/h+WdkOagh+iOt+WPluWPsOmYtlxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOe0ouW8lSzlsYLmlbBcclxuICAgICAqL1xyXG4gICAgR2V0U3RlcEJ5TG9jYXRpb24obG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb24pOlN0ZXBcclxuICAgIHtcclxuICAgICAgICB2YXIgZ2V0U3RlcDpTdGVwID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9jYXRpb24uWSkuR2V0U3RlcChsb2NhdGlvbi5YKTtcclxuICAgICAgICByZXR1cm4gZ2V0U3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgUGxheWVyRmxvb3IoICk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGZsb29yOm51bWJlciA9IHRoaXMuX1N0YXJ0UG9zaXRpb24ueiAtIHRoaXMuUGxheWVyLkxvZ2ljUG9zaXRpb24uejtcclxuICAgICAgICBmbG9vciA9IE1hdGgucm91bmQoZmxvb3IvKCBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMikpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhmbG9vcik7XHJcbiAgICB9XHJcbiAgICBnZXQgUGxheWVyRmxvb3JMaW5lKCApOk1vdW50TGluZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLlBsYXllckZsb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBfSGVhZEZsb29ySWR4Om51bWJlcjtcclxuICAgIHByaXZhdGUgX1RhaWxGTG9vcklkeDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Db3VudFRpbWU6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQm9vdG9tRmxvb3I6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfU3RhcnRQb3NpdGlvbjpMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF9HYW1lVXBkYXRlOigpPT52b2lkO1xyXG4gICAgcHJpdmF0ZSBfUGFuZWxVSTpHYW1lVUk7XHJcbiAgICBwcml2YXRlIF9Hb2xkTnVtOm51bWJlcjtcclxuICAgIHByaXZhdGUgX0xvZ2ljR29sZE51bTpudW1iZXI7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gbnVsbDsgIFxyXG4gICAgICAgIHRoaXMuR2FtZVNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLk1vdW50TGluZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID1udWxsO1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gbnVsbDtcclxuICAgICAgICB0aGlzLkl0ZW1MYXlvdXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fSGVhZEZsb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLl9UYWlsRkxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMuX0NvdW50VGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgPTA7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLl9QYW5lbFVJID0gbnVsbDtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIC8v5Yib5bu655u45YWz5pS+6L+ZIOi/memHjOmHjeaWsOW8gOWni+S4jeS8mui1sFxyXG4gICAgcHJvdGVjdGVkIF9TdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvKlxyXG4gICAgICAgIC8v5Yib5bu65pa55ZCR5YWJXHJcbiAgICAgICAgdmFyIGRpcmVjdGlvbkxpZ2h0ID0gbmV3IExheWEuRGlyZWN0aW9uTGlnaHQoKTtcclxuICAgICAgICB0aGlzLlNjZW5lTWdyLkN1clNjZW5lLlB1dE9iaihkaXJlY3Rpb25MaWdodCk7XHJcbiAgICAgICAgZGlyZWN0aW9uTGlnaHQuY29sb3IgPSBuZXcgTGF5YS5WZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgIGRpcmVjdGlvbkxpZ2h0LmRpcmVjdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgLTEsIDApO1xyXG4qL1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhID1uZXcgR2FtZUNhbWVyYSgpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIgPW5ldyBMYXlhLlZlY3RvcjMoLTMwLDAsMCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5DYW1lcmEpO1xyXG5cclxuICAgICAgICB0aGlzLk1vdW50TGluZXMgPSBbXTtcclxuICAgICAgICB2YXIgbWF4TGluZU51bSA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLk1heExpbmVOdW07XHJcbiAgICAgICAgZm9yKCB2YXIgbGluZUlkeDpudW1iZXIgPSBtYXhMaW5lTnVtLTE7bGluZUlkeD49MDstLWxpbmVJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld01vdW50TGluZSA9IG5ldyBNb3VudExpbmUobGluZUlkeCxsaW5lSWR4KTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoobmV3TW91bnRMaW5lKTtcclxuICAgICAgICAgICAgdGhpcy5Nb3VudExpbmVzW2xpbmVJZHhdID0gbmV3TW91bnRMaW5lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WIm+W7ulVJXHJcbiAgICAgICAgdmFyIGRpcjpHYW1lRGlyZWN0b3IgPSB0aGlzO1xyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvL+WIm+W7uueOqeWutlxyXG4gICAgICAgIHRoaXMuUGxheWVyID0gbmV3IFBsYXllcigpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMuUGxheWVyKTtcclxuXHJcbiAgICAgICAgLy/lh4blpIfnjqnlrrbmrbvkuqHkuovku7ZcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgsdGhpcy5EZWF0aCx0aGlzKTtcclxuICAgICAgICBzdXBlci5fU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/m+WFpea4uOaIj+eahOiuvue9ruaUvui/memHjCDph43mlrDlvIDlp4votbDov5nph4xcclxuICAgIHByb3RlY3RlZCBfU3RhcnRDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKDAsMCk7XHJcbiAgICAgICAgLy/ph43nva7nianlk4FcclxuICAgICAgICB0aGlzLkl0ZW1MYXlvdXQgPSBuZXcgSXRlbS5JdGVtTGF5b3V0KClcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdmFyIGxpbmVzOk1vdW50TGluZVtdID0gdGhpcy5Nb3VudExpbmVzO1xyXG4gICAgICAgIC8v5Yib5bu66L6T5YWl5o6n5Yi25ZmoXHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSBuZXcgSW5wdXQuTm9ybUdhbWVJbnB1dCh0aGlzKTtcclxuICAgICAgICB0aGlzLl9IZWFkRmxvb3JJZHggPSBsaW5lcy5sZW5ndGggLTE7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllci5SZXNldCgpO1xyXG4gICAgICAgIGZvcih2YXIgaWR4Om51bWJlciA9IDA7aWR4PGxpbmVzLmxlbmd0aDsrK2lkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lOk1vdW50TGluZSA9IHRoaXMuTW91bnRMaW5lc1tpZHhdO1xyXG4gICAgICAgICAgICBsaW5lLlNldExpbmUoaWR4KTtcclxuICAgICAgICAgICAgaWYoaWR4PjApXHJcbiAgICAgICAgICAgICAgICBsaW5lc1tpZHgtMV0uU2V0TmV4dEZsb29yKGxpbmUpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBQbGF5ZXJTdGVwID0gbGluZS5HZXRTdGVwKE1hdGguZmxvb3IoIGxpbmUuTG9naWNMZW5ndGgvMikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuU2V0U3RlcChQbGF5ZXJTdGVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1NhZmVMb2NhdGlvbiA9IFBsYXllclN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TdGFydFBvc2l0aW9uID0gdGhpcy5QbGF5ZXIuTG9naWNQb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1B1dEl0ZW1JbkxpbmUoaWR4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuUmVzZXQobmV3IExheWEuVmVjdG9yMygpLG5ldyBMYXlhLlZlY3RvcjModGhpcy5QbGF5ZXIuUG9zaXRpb24ueCxDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoICogMTAuNSxDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoICogOSksdGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgIHRoaXMuX0dvbGROdW0gPSAwO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljR29sZE51bSA9IDA7XHJcblxyXG4gICAgICAgIHN1cGVyLl9TdGFydENvbXBsZXRlKCk7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJID0gdGhpcy5fVUlNZ3IuU2hvdyhHYW1lVUkpO1xyXG4gICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUgKzYwMDA7XHJcbiAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgPSAwO1xyXG4gICAgICAgIHRoaXMuX0dhbWVVcGRhdGUgPSB0aGlzLl9TdGFydENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0dhbWVVcGRhdGUhPW51bGwgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+ato+W4uOi/kOihjOaXtueahOavj+W4p+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBfUnVuR2FtZVVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkRpc3RhbmNlID0gdGhpcy5QbGF5ZXJEaXN0YW5jZTtcclxuICAgICAgICB2YXIgZmxvb1ZlY3RvcjpMYXlhLlZlY3RvcjMgPSB0aGlzLlRhaWxGTG9vci5Qb3NpdGlvbjtcclxuICAgICAgICBpZihmbG9vVmVjdG9yLnogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56PjMqQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlLzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9QdXNoRkxvb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fQ291bnRUaW1lIDwgdGhpcy5HYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUrIDMwMDA7XHJcbiAgICAgICAgICAgIHRoaXMuX0Rlc3Ryb3lMaW5lKHRoaXMuX0Jvb3RvbUZsb29yKTtcclxuICAgICAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgKz0gMTsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5YCS6K6h5pe25pyf6Ze055qE5q+P5bin6YC76L6RXHJcbiAgICBwcml2YXRlIF9TdGFydENvdW50KClcclxuICAgIHtcclxuICAgICAgICB2YXIgdGltZTpzdHJpbmcgPVwiXCJcclxuICAgICAgICB2YXIgY291bnRUaW1lOm51bWJlciA9IHRoaXMuX0NvdW50VGltZSAtIHRoaXMuR2FtZVRpbWU7XHJcbiAgICAgICAgaWYoY291bnRUaW1lPjApXHJcbiAgICAgICAgICAgIHRpbWUrPSBNYXRoLmZsb29yKCBjb3VudFRpbWUvMTAwMCk7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSA9IHRoaXMuX1J1bkdhbWVVcGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUgKyAzMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBhbmVsVUkuU2V0Q291bnRUaW1lKHRpbWUpO1xyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgLy/lsIblsYLlkJHkuIrlj6BcclxuICAgIHByb3RlY3RlZCBfUHVzaEZMb29yKClcclxuICAgIHtcclxuICAgICAgICB2YXIgcHJlSGVhZDpNb3VudExpbmUgPSB0aGlzLkhlYWRGbG9vcjtcclxuICAgICAgICB0aGlzLl9IZWFkRmxvb3JJZHggPSh0aGlzLl9IZWFkRmxvb3JJZHgrMSkldGhpcy5Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLl9UYWlsRkxvb3JJZHggPSAodGhpcy5fVGFpbEZMb29ySWR4ICsxKSV0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBIZWFkZmxvb3I6bnVtYmVyID0gcHJlSGVhZC5GbG9vck51bSArIDE7XHJcbiAgICAgICAgdGhpcy5IZWFkRmxvb3IuU2V0TGluZShIZWFkZmxvb3IpO1xyXG4gICAgICAgIHByZUhlYWQuU2V0TmV4dEZsb29yKHRoaXMuSGVhZEZsb29yKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9QdXRJdGVtSW5MaW5lKEhlYWRmbG9vcik7ICAgXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciDnianlk4HliJfooahcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIF9QdXRJdGVtSW5MaW5lKGZsb29yOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgc2FmZUNvbCA6e1trZXk6c3RyaW5nXSA6QXJyYXk8bnVtYmVyPjt9ID0ge307XHJcbiAgICAgICAgaWYoZmxvb3IgPj0gdGhpcy5fU2FmZUxvY2F0aW9uLlkgKyBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5NYXhMaW5lTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2FmZUNvbCA9IHRoaXMuX0NvdW50T3Blbkxpc3QoZmxvb3IpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+aRhuaUvuWJjeWFiOiuoeeul+ivpeWxgumAmui3r+aDheWGtSBcclxuICAgICAgICAgICAgc2FmZUNvbCA9IHt9XHJcbiAgICAgICAgICAgIHNhZmVDb2xbXCJvXCJdID0gdGhpcy5fQ291bnRSb2FkSW5mbyhmbG9vcik7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgaWYoZmxvb3IgPDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6I635Y+W6K+l6KGM6KaB5pGG5pS+55qE54mp5ZOBXHJcbiAgICAgICAgdGhpcy5fVGFrZUl0ZW1MaXN0KGZsb29yKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5qCH6K6w5LiA5p2h57ud5a+55a6J5YWo55qE6LevXHJcbiAgICAgICAgdmFyIHNhZmVJZHhDb2xsOnsgW2tleTogc3RyaW5nXTogbnVtYmVyOyB9ID17fTtcclxuICAgICAgICBmb3IodmFyIGNvbEtleSBpbiBzYWZlQ29sKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpc3QgPSBzYWZlQ29sW2NvbEtleV07XHJcbiAgICAgICAgICAgIHZhciBzYWZlSWR4ID0gbGlzdFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqbGlzdC5sZW5ndGgpXTtcclxuICAgICAgICAgICAgaWYoc2FmZUlkeENvbGxbc2FmZUlkeF09PXVuZGVmaW5lZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2FmZUlkeENvbGxbc2FmZUlkeF0gPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5oqK6ZyA6KaB5pS+6YGT5YW355qE5qC85a2Q5pS+5YWl6ZqP5py65rGgXHJcbiAgICAgICAgdmFyIGN1ckZsb29yOk1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICB2YXIgcmFuZG9tUG9vbDpBcnJheTxTdGVwPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8v5oqK5a6J5YWo55qE5qC85a2Q5pqC5pe256e75Ye65p2lXHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDpBcnJheTxTdGVwPiA9IG5ldyBBcnJheTxTdGVwPigpO1xyXG4gICAgICAgIGZvciggdmFyIHN0ZXBJZHg6bnVtYmVyID0gMDsgc3RlcElkeCA8IGN1ckZsb29yLkxvZ2ljTGVuZ3RoOysrc3RlcElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0U3RlcDpTdGVwID0gY3VyRmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYoc2FmZUlkeENvbGxbc3RlcElkeF09PXVuZGVmaW5lZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKGdldFN0ZXApO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aUvumZt+mYsVxyXG4gICAgICAgIHZhciBiYXJyaWVyc0xpc3Q6QXJyYXk8TGluZUl0ZW1JbmZvPiA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzO1xyXG4gICAgICAgIGlmKGZsb29yPD10aGlzLl9TYWZlTG9jYXRpb24uWSsxJiZmbG9vcj49dGhpcy5fU2FmZUxvY2F0aW9uLlkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGluZGV4Om51bWJlciA9IGJhcnJpZXJzTGlzdC5sZW5ndGgtMTsgaW5kZXg+LTE7LS1pbmRleClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYmFycmllcnNMaXN0LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fT3JnaW5pemVQdXRJdGVtKGJhcnJpZXJzTGlzdCxyYW5kb21Qb29sKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+aRhuaUvumBk+WFt1xyXG4gICAgICAgIGZvcih2YXIgc2FmZVN0ZXBJZHg6bnVtYmVyID0gMDtzYWZlSWR4PHNhZmVTdGVwTGlzdC5sZW5ndGg7KytzYWZlSWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKHNhZmVTdGVwTGlzdFtzYWZlSWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXdhcmRMaXN0ID0gdGhpcy5DdXJMaW5lUmV3YXJkcztcclxuICAgICAgICB0aGlzLl9Pcmdpbml6ZVB1dEl0ZW0ocmV3YXJkTGlzdCxyYW5kb21Qb29sKTtcclxuICAgICAgICAvL+WGjeasoeiuoeeul+mAmui3r+aDheWGtSBcclxuICAgICAgICB0aGlzLl9Db3VudExhc3RGbG9vclJvYWQoZmxvb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pGG5pS+54mp5ZOBXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PExpbmVJdGVtSW5mbz59IGl0ZW1MaXN0IOeJqeWTgeWIl+ihqFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTdGVwPn0gcmFuZG9tUG9vbCDlj7DpmLbpm4blkIhcclxuICAgICAqL1xyXG4gICAgX09yZ2luaXplUHV0SXRlbShpdGVtTGlzdDpBcnJheTxMaW5lSXRlbUluZm8+LHJhbmRvbVBvb2w6QXJyYXk8U3RlcD4pOnZvaWRcclxuICAgIHtcclxuICAgICAgICBmb3IodmFyIGl0ZW1JZHg6bnVtYmVyID0gMDtpdGVtSWR4IDwgaXRlbUxpc3QubGVuZ3RoOysraXRlbUlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOkxpbmVJdGVtSW5mbyA9IGl0ZW1MaXN0W2l0ZW1JZHhdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGRpZmZpY3VsdHlOdW06bnVtYmVyID0gMDsgZGlmZmljdWx0eU51bTxpbmZvLk51bWJlcjspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHJhbmRvbVBvb2wubGVuZ3RoPDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+maj+acuuaKiumanOeijeaUvuWFpeagvOWtkOmHjFxyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbUlkeDpudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcmFuZG9tUG9vbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IHJhbmRvbVBvb2xbcmFuZG9tSWR4XTtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBvb2wuc3BsaWNlKHJhbmRvbUlkeCwxKTtcclxuICAgICAgICAgICAgICAgIHN0ZXAuUHV0SXRlbShpbmZvLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgLS1pbmZvLk51bWJlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihyYW5kb21Qb29sLmxlbmd0aDwxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpdGVtSWR4PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpdGVtTGlzdC5zcGxpY2UoMCxpdGVtSWR4KTsgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICrpgJLlvZLorqHnrpfpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vck51bSDnianlk4HliJfooahcclxuICAgICAqL1xyXG4gICAgX0NvdW50T3Blbkxpc3QoZmxvb3JOdW06bnVtYmVyKTp7W2tleTpzdHJpbmddIDpBcnJheTxudW1iZXI+O31cclxuICAgIHtcclxuICAgICAgICBmb3IodmFyIGZsb29yQ291bnQ6bnVtYmVyID0gdGhpcy5QbGF5ZXJGbG9vcjsgZmxvb3JDb3VudDw9Zmxvb3JOdW07KytmbG9vckNvdW50KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZsb29yOk1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yQ291bnQpO1xyXG4gICAgICAgICAgICBpZihmbG9vciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBmb3IodmFyIHN0ZXBJZHggPSAwO3N0ZXBJZHg8Zmxvb3IuTG9naWNMZW5ndGg7KytzdGVwSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcCA9IGZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgICAgICBzdGVwLk1hcmsgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yOk1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKHRoaXMuUGxheWVyRmxvb3IpO1xyXG4gICAgICAgIGZvcih2YXIgc3RlcElkeCA9IDA7c3RlcElkeDxmbG9vci5Mb2dpY0xlbmd0aDsrK3N0ZXBJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RlcCA9IGZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgIGlmKCFzdGVwLklzRGVhZFJvYWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX01hcmtTdGVwcyhzdGVwLHN0ZXBJZHgsZmxvb3JOdW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0YXJnZXRGbG9vcjpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSk7XHJcbiAgICAgICAgLy/mib7lh7rooqvmoIforrDnmoTngrnlubbmlbTnkIbmiJDpm4blkIhcclxuICAgICAgICB2YXIgY29sbGVjdGlvbjp7W2tleTpzdHJpbmddIDpBcnJheTxudW1iZXI+O30gPSB7fVxyXG4gICAgICAgIHZhciBuYW1lOnN0cmluZyA9IFwib1wiXHJcbiAgICAgICAgZm9yKHZhciBvcGVuSWR4Om51bWJlciA9IDA7b3BlbklkeDx0YXJnZXRGbG9vci5Mb2dpY0xlbmd0aDsgKytvcGVuSWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtYXJrZWRTdGVwOlN0ZXAgPSB0YXJnZXRGbG9vci5HZXRTdGVwKG9wZW5JZHgpO1xyXG4gICAgICAgICAgICBpZihtYXJrZWRTdGVwLk1hcmshPXVuZGVmaW5lZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIE5hbWU6c3RyaW5nID0gbmFtZSArIG1hcmtlZFN0ZXAuTWFyaztcclxuICAgICAgICAgICAgICAgIGlmKGNvbGxlY3Rpb25bTmFtZV0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25bTmFtZV0gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uW05hbWVdLnB1c2gob3BlbklkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAq6YCS5b2S5qCH6K6w6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge1N0ZXB9IHN0ZXAg5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gbWFyayDmoIforrBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXRGbG9vck51bSDnm67moIflsYLmlbBcclxuICAgICAqL1xyXG4gICAgX01hcmtTdGVwcyhzdGVwOlN0ZXAsbWFyazphbnksdGFyZ2V0Rmxvb3JOdW06bnVtYmVyKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgaWYoc3RlcC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYoc3RlcC5GbG9vci5GbG9vck51bT49dGFyZ2V0Rmxvb3JOdW0gKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoc3RlcC5NYXJrID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RlcC5NYXJrID0gbWFya1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbGVmdE9wZW46Ym9vbGVhbjtcclxuICAgICAgICB2YXIgcmlnaHRPcGVuOmJvb2xlYW47XHJcbiAgICAgICAgdmFyIGxlZnRQYXJlbnQ6U3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICBpZihsZWZ0UGFyZW50ICE9IG51bGwgJiYgIWxlZnRQYXJlbnQuSXNEZWFkUm9hZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGxlZnRQYXJlbnQuTWFyaz09dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgbGVmdE9wZW4gPSB0aGlzLl9NYXJrU3RlcHMobGVmdFBhcmVudCxtYXJrLHRhcmdldEZsb29yTnVtKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgbGVmdE9wZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmlnaHRQYXJlbnQ6U3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgaWYocmlnaHRQYXJlbnQgIT0gbnVsbCAmJiAhcmlnaHRQYXJlbnQuSXNEZWFkUm9hZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHJpZ2h0UGFyZW50Lk1hcms9PXVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHJpZ2h0T3BlbiA9IHRoaXMuX01hcmtTdGVwcyhyaWdodFBhcmVudCxtYXJrLHRhcmdldEZsb29yTnVtKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmlnaHRPcGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoc3RlcC5NYXJrID09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXAuTWFyayA9IG1hcmtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIWxlZnRPcGVuJiYhcmlnaHRPcGVuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5pyA5ZCO5YaN6K6h566X5LiA5qyh6K+l5bGC6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3JOdW0gXHJcbiAgICAgKi9cclxuICAgIF9Db3VudExhc3RGbG9vclJvYWQoZmxvb3JOdW06bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYoZmxvb3JOdW0gPCB0aGlzLlRhaWxGTG9vci5GbG9vck51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JOdW0pO1xyXG4gICAgICAgIHZhciBsYXN0Rmxvb3IgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSAtMSApO1xyXG4gICAgICAgIGZvcih2YXIgc3RlcElkeCA9MDtzdGVwSWR4PGZsb29yLkxvZ2ljTGVuZ3RoOysrc3RlcElkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZighc3RlcC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgTGVmdFN0ZXAgPSBzdGVwLkxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICAgIHZhciBSaWdodFN0ZXAgPSBzdGVwLlJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICBpZihMZWZ0U3RlcCE9bnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZighTGVmdFN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrTGVmdFN0ZXAuUm9hZE51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihSaWdodFN0ZXAhPW51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIVJpZ2h0U3RlcC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytSaWdodFN0ZXAuUm9hZE51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBsYXN0U3RlcElkeCA9IDA7bGFzdFN0ZXBJZHg8IGxhc3RGbG9vci5Mb2dpY0xlbmd0aDsrK2xhc3RTdGVwSWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYoIXN0ZXAuSXNEZWFkUm9hZCYmc3RlcC5Sb2FkTnVtPDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIC8v5ZCR5LiK6YCS5b2S5oqK5omA5pyJ5LiO5LmL55u46L+e55qE6IqC54K55pWw57uZ5L+u5q2j5LqGXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlL7pgZPlhbfliY3nrpfpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgX0NvdW50Um9hZEluZm8oZmxvb3I6bnVtYmVyKTpBcnJheTxudW1iZXI+XHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDpBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICAgICAgdmFyIHRoaXNGbG9vcjpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHJvYWROdW06bnVtYmVyID0gMDtcclxuICAgICAgICB2YXIgbGFzdEZsb29yOk1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yIC0xKTtcclxuICAgICAgICBpZihmbG9vciA9PSB0aGlzLl9TYWZlTG9jYXRpb24uWSlcclxuICAgICAgICAgICAgdGhpcy5fUmVzZXRTdGVwSW5mbyhsYXN0Rmxvb3IpO1xyXG4gICAgICAgIGZvcih2YXIgbG9naWNJZHg6bnVtYmVyID0gMDsgbG9naWNJZHg8dGhpc0Zsb29yLkxvZ2ljTGVuZ3RoOysrbG9naWNJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gdGhpc0Zsb29yLkdldFN0ZXAobG9naWNJZHgpO1xyXG4gICAgICAgICAgICB2YXIgbGVmdENoaWxkOlN0ZXAgPSBzdGVwLkxlZnRDaGlsZDtcclxuICAgICAgICAgICAgdmFyIHJpZ2h0Q2hpbGQ6U3RlcCA9IHN0ZXAuUmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgaWYobGVmdENoaWxkIT0gbnVsbCAmJiAhbGVmdENoaWxkLklzRGVhZFJvYWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgfWVsc2UgaWYocmlnaHRDaGlsZCE9IG51bGwgJiYgIXJpZ2h0Q2hpbGQuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2FmZVN0ZXBMaXN0LnB1c2gobG9naWNJZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZmxvb3IgPT0gdGhpcy5fU2FmZUxvY2F0aW9uLlkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc2FmZVN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcCh0aGlzLl9TYWZlTG9jYXRpb24uWCk7XHJcbiAgICAgICAgICAgIHNhZmVTdGVwLklzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzYWZlU3RlcExpc3Q7XHJcbiAgICB9XHJcbiAgICBfUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3I6TW91bnRMaW5lKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzRmxvb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgbG9naWNJZHg6bnVtYmVyID0gMDsgbG9naWNJZHg8dGhpc0Zsb29yLkxvZ2ljTGVuZ3RoOysrbG9naWNJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gdGhpc0Zsb29yLkdldFN0ZXAobG9naWNJZHgpO1xyXG4gICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluafkOmBk+WFt+S/oeaBr1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9Zmxvb3IgXHJcbiAgICAgKi9cclxuICAgIF9UYWtlSXRlbUxpc3QoZmxvb3I6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciBpdGVtTGlzdCA9IG5ldyBBcnJheShsaW5lLkxvZ2ljTGVuZ3RoKTtcclxuICAgICAgICB2YXIgbGluZVJld2FyZHMgPSB0aGlzLkl0ZW1MYXlvdXQuVGFrZUxpbmVSZXdhcmQoZmxvb3IpO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSB0aGlzLkN1ckxpbmVSZXdhcmRzLmNvbmNhdChsaW5lUmV3YXJkcyk7XHJcbiAgICAgICAgaWYodGhpcy5TYWZlTG9jYXRpb24uWTwxfHwgdGhpcy5TYWZlTG9jYXRpb24uWSA8Zmxvb3IgfHwgdGhpcy5TYWZlTG9jYXRpb24uWSsxPmZsb29yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpbmVCYXJyaWVycyA9IHRoaXMuSXRlbUxheW91dC5UYWtlTGluZURpZmZpY3VsdHkoZmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzLmNvbmNhdChsaW5lQmFycmllcnMpOyAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5aGM6Zm35p+Q5LiA5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX0Rlc3Ryb3lMaW5lKGZsb29yOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYoZmxvb3IgPHRhaWxGbG9vci5GbG9vck51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBjb3VudEZsb29yOm51bWJlciA9IHRhaWxGbG9vci5GbG9vck51bTtjb3VudEZsb29yPD0gZmxvb3I7Kytjb3VudEZsb29yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldEZsb29yOk1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGNvdW50Rmxvb3IpO1xyXG4gICAgICAgICAgICB0YXJnZXRGbG9vci5CcmVhaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBsYXllci5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgfVxyXG59IiwiLypcclxu5L2c6ICFOk1vXHJcbui3s+Wxsee+iuWcuuaZr+aguOW/g+WKn+iDvVxyXG4qL1xyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW50ZXJHYW1lVUlcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7SW5wdXR9IGZyb20gXCIuLy4uL0dhbWUvSW5wdXRcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4vLi4vdWkvR2FtZVVJXCJcclxuaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi8uLi9HYW1lL01vdW50TGluZVwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxudHlwZSBJdGVtTGF5b3V0ID0gSXRlbS5JdGVtTGF5b3V0O1xyXG50eXBlIExpbmVJdGVtSW5mbyA9IEl0ZW0uTGluZUl0ZW1JbmZvO1xyXG52YXIgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG4vL+a4uOaIj+WcuuaZr1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBCYXNlU2NlbmVcclxue1xyXG4gICAgTW9kZWxMb2FkOmJvb2xlYW47XHJcbiAgICBHYW1lRGlyOkdhbWVEaXJlY3RvcjtcclxuICAgIC8v5a+55aSW5o6l5Y+jXHJcbiAgICBTdGFydExvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoW3BhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIikscGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVwiKSxwYXRoLkdldERlcGF0aFVJSlMoXCJFbmRHYW1lXCIpXSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fTG9hZENvbXBsZXRlKSk7XHJcbiAgICAgICAgc3VwZXIuU3RhcnRMb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLl9TdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLl9VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX0dlbkRpcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkdhbWVEaXIgPSBuZXcgR2FtZURpcmVjdG9yKCk7XHJcbiAgICAgICAgdGhpcy5DdXJEaXIgPSB0aGlzLkdhbWVEaXI7XHJcblxyXG4gICAgfVxyXG4gICAgLy/nprvlvIDml7bov5vooYzphY3nva5cclxuICAgIHByb3RlY3RlZCBfTGVhdmUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTWVzc2FnZU1nci5EZXNSZ2lzdElESyhNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoKTtcclxuICAgICAgICBzdXBlci5fTGVhdmUoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfTG9hZENvbXBsZXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNjZW5lID0gbmV3IExheWEuU2NlbmUzRCgpO1xyXG4gICAgICAgIHRoaXMuU2NlbmUuYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLDEsMSlcclxuICAgICAgICBzdXBlci5fTG9hZENvbXBsZXRlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEVudGVyR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VudGVyR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VpZGVyTWFuYWdlciBcclxue1xyXG4vL+WvueWkluaOpeWPo1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjpHdWlkZXJNYW5hZ2VyO1xyXG4gICAgc3RhdGljIGdldCBNZ3IoKTpHdWlkZXJNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR3VpZGVyTWFuYWdlci5fTWdyID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHdWlkZXJNYW5hZ2VyLl9NZ3IgPSBuZXcgR3VpZGVyTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR3VpZGVyTWFuYWdlci5fTWdyO1xyXG4gICAgfVxyXG4gICAgU2NlbmVNZ3I6U2NlbmVNYW5hZ2VyO1xyXG4gICAgQ3VyU2NlbmU6R3VpZGVyU2NlbmU7XHJcbiAgICBnZXQgR2FtZURpcigpOkd1aWRlckRpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ3VyU2NlbmUuR3VpZERpcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR3VpZGVyU2NlbmUoKTtcclxuICAgICAgICB0aGlzLlNjZW5lTWdyLkVudGVyU2NlbmUobmV3R2FtZVNjZW5lKTtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbmV3R2FtZVNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TY2VuZU1nciA9IEZXLkZNLkdldE1hbmFnZXI8U2NlbmVNYW5hZ2VyPihTY2VuZU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJTY2VuZSBleHRlbmRzIEJhc2VTY2VuZVxyXG57XHJcbiAgICBHdWlkRGlyOkd1aWRlckRpcmVjdG9yO1xyXG4gICAgQ3VyRGlyOkJhc2VEaXJlY3RvcjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgU3RhcnRMb2FkKCApXHJcbiAgICB7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChbe3VybDpwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSAsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKSx0eXBlOiBMYXlhLkxvYWRlci5BVExBUyB9XSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fTG9hZENvbXBsZXRlKSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX0dlbkRpcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkd1aWREaXIgPSBuZXcgR3VpZGVyRGlyZWN0b3IoKTtcclxuICAgICAgICB0aGlzLkN1ckRpciA9IHRoaXMuR3VpZERpcjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyRGlyZWN0b3IgZXh0ZW5kcyBCYXNlRGlyZWN0b3Jcclxue1xyXG4gICAgVUk6RW50ZXJHYW1lVUk7XHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLl9TdGFydCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9TdGFydENvbXBsZXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLl9TdGFydENvbXBsZXRlKCk7XHJcbiAgICAgICAgdGhpcy5VSSA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpLlNob3c8RW50ZXJHYW1lVUk+KEVudGVyR2FtZVVJKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuLy4uL3VpL2xheWFNYXhVSVwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBMb2FkaW5nVUkgZnJvbSBcIi4vLi4vdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUlcIlxyXG5pbXBvcnQgRk1Xb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi9HdWlkZXJNYW5hZ2VyXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQkcgZnJvbSBcIi4vLi4vdWkvQkdcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZFNjZW5lIGV4dGVuZHMgQmFzZVNjZW5lXHJcbntcclxuICAgIEN1ckRpcjpCYXNlRGlyZWN0b3I7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX0dlbkRpcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1ckRpciA9IG5ldyBMb2FkRGlyY3RvcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBTdGFydExvYWQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlc0NvbCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6XCJ1aS9SZXNvdXJjZS9sb2NhbGNvbXAuYXRsYXNcIix0eXBlOkxheWEuTG9hZGVyLkFUTEFTfV07XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChyZXNDb2wsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX0xvYWRDb21wbGV0ZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmNsYXNzIExvYWREaXJjdG9yIGV4dGVuZHMgQmFzZURpcmVjdG9yXHJcbntcclxuICAgIFVJOkxvYWRpbmdVSTtcclxuICAgIFxyXG4gICAgUmVTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBfQ291bnQyRExvYWQ6bnVtYmVyO1xyXG4gICAgX0NvdW50M0RMb2FkOm51bWJlcjtcclxuICAgIF9Mb2FkRmFpbGU6Ym9vbGVhbjtcclxuICAgIF9Db3VudFZhbHVlOm51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX0NvdW50M0RMb2FkID0gMC41O1xyXG4gICAgICAgIHRoaXMuX0NvdW50MkRMb2FkID0gMC41O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIExheWEubG9hZGVyLm9uKExheWEuRXZlbnQuRVJST1IsdGhpcyx0aGlzLl9vbkVycm9yKTtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbihMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5fb25Db21wbGV0ZSk7XHJcbiAgICAgICAgdGhpcy5Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5fTG9hZEZhaWxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9TdGFydENvbXBsZXRlKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5fU3RhcnRDb21wbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8TG9hZGluZ1VJPihMb2FkaW5nVUkpO1xyXG4gICAgICAgIHRoaXMuVUkuVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ291bnQyRExvYWQgPTA7XHJcbiAgICAgICAgdGhpcy5fQ291bnQzRExvYWQgPTA7XHJcbiAgICAgICAgdGhpcy5fQ291bnRWYWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fTG9hZEZhaWxlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJlc291cmNlMkRBcnIgPSBbXHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIHt1cmw6XCJyZXMvdWlqc29uL1BsYXllckxpc3QuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0sXHJcbiAgICAgICAgICAgIHt1cmw6XCJyZXMvdWlqc29uL0NoYXJhY3RlcnMuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0sXHJcbiAgICAgICAgICAgIHt1cmw6XCJyZXMvdWlqc29uL1NldFBhbmVsLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LFxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiU2V0UGFuZWxcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJDaGFyYWN0ZXJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkJHXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJjb21wXCIpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgLy9yZXNvdXJjZTJEQXJyID0gbnVsbDtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciByZXNvdXJjZTNEQXJyID0gW1wiaHR0cDovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9MYXlhU2NlbmVfTDAxX3Nwcl9wbGF0XzAxL0wwMV9zcHJfcGxhdF8wMS5saFwiLFxyXG4gICAgICAgIFwiaHR0cDovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9MYXlhU2NlbmVfTDAxX3Nwcl9wbGF0XzAyL0wwMV9zcHJfcGxhdF8wMi5saFwiLFxyXG4gICAgICAgIFwiaHR0cDovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9MYXlhU2NlbmVfTDAxX3Nwcl9wbGF0XzAzL0wwMV9zcHJfcGxhdF8wMy5saFwiLFxyXG4gICAgICAgIFwiaHR0cDovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9MYXlhU2NlbmVfTDAxX3Nwcl9iYXJyaWVyXzAxL0wwMV9zcHJfYmFycmllcl8wMS5saFwiLFxyXG4gICAgICAgIFwiaHR0cDovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9MYXlhU2NlbmVfTDAxX3Nwcl9iYXJyaWVyXzAyL0wwMV9zcHJfYmFycmllcl8wMi5saFwiLFxyXG4gICAgICAgIFwiaHR0cDovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9MYXlhU2NlbmVfTDAxX3Nwcl9iYXJyaWVyXzAzL0wwMV9zcHJfYmFycmllcl8wMy5saFwiLFxyXG4gICAgICAgIFwiaHR0cDovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9MYXlhU2NlbmVfY2hpbGRfMDEvY2hpbGRfMDEubGhcIl0qL1xyXG4gICAgICAgIExheWEubG9hZGVyLm9uKExheWEuRXZlbnQuRVJST1IsdGhpcyx0aGlzLl9vbkVycm9yKTtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbihMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5fb25Db21wbGV0ZSk7XHJcbiAgICAgICAgLy92YXIgcmVzb3VyY2UzREFyciA9IFtcIkM6L1VzZXJzL0FkbWluaXN0cmF0b3IvRGVza3RvcC9SZXNvdXJjZS9MYXlhU2NlbmVfTDAxX2F1dF9iYXJyaWVyXzAyL0xheWFTY2VuZV9MMDFfYXV0X2JhcnJpZXJfMDIvQ29udmVudGlvbmFsL0wwMV9hdXRfYmFycmllcl8wMi5saFwiXTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UzREFyciA9IFsgcGF0aC5HZXRMSChcImMwMDFfY2hpbGRfMDFcIikgLFxyXG4gICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDFcIiksXHJcbiAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wMlwiKSxcclxuICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAzXCIpLFxyXG4gICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDRcIiksXHJcbiAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wMVwiKSxcclxuICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAyXCIpLFxyXG4gICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDNcIiksXHJcbiAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKSxcclxuICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKSxcclxuICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIiksXHJcbiAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fdW50b3VjaGFibGVfMDFcIiksXHJcbiAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfY2hvbXBlcl8wMVwiKSxcclxuICAgICAgICBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKSxcclxuICAgICAgICBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKSxcclxuICAgICAgICAvL3BhdGguR2V0U2t5Qm94KFwic2t5Q3ViZVwiKVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgcGF0aC5SZXNvdXJjZVBhdGggK1wiTGF5YVNjZW5lX0wwMV9zcHJfcGxhdF8wMy9Db252ZW50aW9uYWwvTDAxX3Nwcl9wbGF0XzAzLmxoXCIsXHJcbiAgICAgICAgKi9cclxuICAgICAgICBdLy8gXCJDOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvUmVzb3VyY2UvTGF5YVNjZW5lX0wwMV9hdXRfYmFycmllcl8wMi9MYXlhU2NlbmVfTDAxX2F1dF9iYXJyaWVyXzAyL0NvbnZlbnRpb25hbC9MMDFfYXV0X2JhcnJpZXJfMDIubGhcIl07XHJcbiAgICAgICAgdGhpcy5fTG9hZChyZXNvdXJjZTJEQXJyLHJlc291cmNlM0RBcnIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX0xvYWQoYXJyMkQ6QXJyYXk8YW55PiA9IG51bGwsYXJyM0Q6QXJyYXk8YW55Pj1udWxsKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGFycjJEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAvLyBMYXlhLmxvYWRlci5sb2FkKGFycjJELExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9vbkxvYWRlZCksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX29uMkRQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQoYXJyMkQsbnVsbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fb24yRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICB0aGlzLl9Db3VudFZhbHVlKz0wLjU7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50MkRMb2FkID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXJyM0QhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jcmVhdGUoYXJyM0QsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLG51bGwpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9vbjNEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy5fQ291bnRWYWx1ZSs9MC41O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudDNETG9hZCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9vbkVycm9yKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTG9hZEZhaWxlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiTG9hZEVycm9yOlwiK3N0cik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9vbjNEUHJvZ3Jlc3ModmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQ291bnQzRExvYWQgPXZhbHVlLzI7XHJcbiAgICAgICAgdGhpcy5VSS5WYWx1ZSA9ICh0aGlzLl9Db3VudDJETG9hZCArIHRoaXMuX0NvdW50M0RMb2FkKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfb24yRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0NvdW50MkRMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMuVUkuVmFsdWUgPSB0aGlzLl9Db3VudDJETG9hZCArIHRoaXMuX0NvdW50M0RMb2FkO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9vbkNvbXBsZXRlKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoaURpciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuUmVsb2FkKGZ1bmN0aW9uKCk6dm9pZHt0aGlEaXIuTG9hZCgpfSApO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkJHID0gbmV3IEJHKCk7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuQ29tcGxldGUoKCk9PntHdWlkZXJNYW5hZ2VyLk1nci5FbnRlclNjZW5lKCl9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgIHRoaXMuVUkuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIHBhdGhcclxue1xyXG4gICAgdmFyIElzRWRpdG9yOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBleHBvcnQgdmFyIFNjZW5lQXNzZXRQYXRoOnN0cmluZyA9IFwiTGF5YVNjZW5lX1wiO1xyXG4gICAgZXhwb3J0IHZhciBSZXNvdXJjZVBhdGg6c3RyaW5nID0gSXNFZGl0b3I/XCJEOi9HSXQvUmVzb3VyY2VzL0xheWFQcm9qZWN0L0ZyZXNoUHJvamVjdC9teUxheWEvTmV0UmVzb3VyY2UvXCI6XCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL05ldFJlc291cmNlL1wiO1xyXG4gICAgZXhwb3J0IHZhciBVSVBhdGg6c3RyaW5nID0gUmVzb3VyY2VQYXRoICsgXCJVSS9cIjtcclxuICAgIGV4cG9ydCB2YXIgTW9kZWxQYXRoOnN0cmluZyA9IFJlc291cmNlUGF0aCtcIjNEL1wiXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WQXRs5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRBdGxQYXRoKGZpbGVOYW1lOnN0cmluZyk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFVJUGF0aCArIGZpbGVOYW1lK1wiLmF0bGFzXCI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPllVJSnNvbui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0RGVwYXRoVUlKUyhmaWxlTmFtZTpzdHJpbmcpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgVUlQYXRoK2ZpbGVOYW1lK1wiLmpzb25cIjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WbGjmlofku7bot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldExIKGZpbGVOYW1lOnN0cmluZyk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1vZGVsUGF0aCArU2NlbmVBc3NldFBhdGgrZmlsZU5hbWUrXCIvQ29udmVudGlvbmFsL1wiICtmaWxlTmFtZSArIFwiLmxoXCJcclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgVUlGdW5jXHJcbntcclxuICAgIC8v6K6h566X57yp5pS+5YC8XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ291bnRTY2FsZUZpeCggd2lkdGg6bnVtYmVyICk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXdpZHRoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YWdlV2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHZhciBzY2FsZTpudW1iZXIgPSBMYXlhLnN0YWdlLndpZHRoL3dpZHRoO1xyXG4gICAgICAgIHJldHVybiAgc2NhbGU7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gRml4VUkoIHZpZXc6TGF5YS5TcHJpdGUgKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzY2FsZSA9IFVJRnVuYy5Db3VudFNjYWxlRml4KHZpZXcud2lkdGgpO1xyXG4gICAgICAgIHZpZXcuc2NhbGVYID0gc2NhbGU7XHJcbiAgICAgICAgdmlldy5zY2FsZVkgPSBzY2FsZTtcclxuICAgICAgICB2aWV3LmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0L3NjYWxlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWdyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIiBcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBQXHJcbntcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZXNzYWdlOk1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG4gICAgc3RhdGljIGdldCBNZXNzYWdlTWFuYWdlcigpOk1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoQVBQLl9NZXNzYWdlPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5fTWVzc2FnZSA9IEZXLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFQUC5fTWVzc2FnZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfVUlNYW5hZ2VyOlVJTWFuYWdlcjtcclxuICAgIHN0YXRpYyBnZXQgVUlNYW5hZ2VyKCk6VUlNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoQVBQLl9VSU1hbmFnZXI9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLl9VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFQUC5fVUlNYW5hZ2VyO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX1NjZW5lTWdyOlNjZW5lTWdyO1xyXG4gICAgc3RhdGljIGdldCBTY2VuZU1hbmFnZXIoKTpTY2VuZU1nclxyXG4gICAge1xyXG4gICAgICAgIGlmKEFQUC5fU2NlbmVNZ3I9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLl9TY2VuZU1nciA9IEZXLkZNLkdldE1hbmFnZXI8U2NlbmVNZ3I+KFNjZW5lTWdyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFQUC5fU2NlbmVNZ3I7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuIiwiaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgU2V0UGFuZWxVSSBmcm9tIFwiLi8uLi91aS9TZXRQYW5lbFVJXCJcclxuaW1wb3J0IENoYXJhY3RlclVJIGZyb20gXCIuLy4uL3VpL0NoYXJhY3RlclVJXCJcclxuaW1wb3J0IEdhbWVTY2VuZSBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lU2NlbmVcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vQVBQXCJcclxuXHJcbnR5cGUgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sZXJcclxue1xyXG4gICAgc3RhdGljIGdldCBHYW1lQ29udHJvbGVyKCk6R2FtZUNvbnRyb2xlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgR2FtZUNvbnRyb2xlci5NZ3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDb250cm9sZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjogR2FtZUNvbnRyb2xlcjtcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBNZ3IoKTogR2FtZUNvbnRyb2xlciB7XHJcbiAgICAgICAgaWYgKEdhbWVDb250cm9sZXIuX01nciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIEdhbWVDb250cm9sZXIuX01nciA9IG5ldyBHYW1lQ29udHJvbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lQ29udHJvbGVyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBfTGluZVN0ZXBOdW06bnVtYmVyO1xyXG4gICAgX01heExpbmVOdW06bnVtYmVyO1xyXG4gICAgX1N0ZXBMZW5ndGg6bnVtYmVyO1xyXG4gICAgX1N0ZXBEaXN0YW5jZTpudW1iZXI7XHJcbiAgICBfUGxheWVyTW92ZVRpbWU6bnVtYmVyO1xyXG4gICAgLy/luLjph4/lrprkuYlcclxuICAgIC8v5q+P6KGM5pyA5aSn5qC85a2Q5pWwXHJcbiAgICBnZXQgTGluZVN0ZXBOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX0xpbmVTdGVwTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTGluZVN0ZXBOdW0gPSA1KzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9MaW5lU3RlcE51bTtcclxuICAgIH0gXHJcbiAgICAvL+acgOWkp+ihjOaVsFxyXG4gICAgZ2V0IE1heExpbmVOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX01heExpbmVOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9NYXhMaW5lTnVtID0gMTM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9NYXhMaW5lTnVtO1xyXG4gICAgfSBcclxuICAgIC8v5qC85a2Q6L656ZW/XHJcbiAgICBnZXQgU3RlcExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9TdGVwTGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RlcExlbmd0aCA9IDAuOTg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGVwTGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgLy/moLzlrZDmlpzlr7nop5Lplb/luqZcclxuICAgIGdldCBTdGVwRGlzdGFuY2UoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcERpc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RlcERpc3RhbmNlID0gTWF0aC5zcXJ0KCh0aGlzLlN0ZXBMZW5ndGggKiB0aGlzLlN0ZXBMZW5ndGgpICogMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGVwRGlzdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+eOqeWutuenu+WKqOaXtumXtFxyXG4gICAgZ2V0IFBsYXllck1vdmVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1BsYXllck1vdmVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fUGxheWVyTW92ZVRpbWUgPSAwLjAyICogMTAwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9QbGF5ZXJNb3ZlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRQbGF5ZXJJRChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIlNlbGVjdGVkXCIgKyBpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrorr7nva7pnaLmnb9cclxuICAgIFNob3dTZXRQYW5lbCgpIHtcclxuICAgICAgICB2YXIgUGFuZWwgPSBBUFAuVUlNYW5hZ2VyLlNob3c8U2V0UGFuZWxVST4oU2V0UGFuZWxVSSk7Ly8gbmV3IFNldFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrop5LoibLpnaLmnb9cclxuICAgIHB1YmxpYyBTaG93Q2hhcmFjdGVyUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IEFQUC5VSU1hbmFnZXIuU2hvdzxDaGFyYWN0ZXJVST4oQ2hhcmFjdGVyVUkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1NldEluZm87XHJcbiAgICBnZXQgU2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIGlmICh0aGlzLl9TZXRJbmZvID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFNldEluZm8odmFsdWU6IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuX1NldEluZm8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/neWtmOiuvue9ruaVsOaNrlxyXG4gICAgU2F2ZVNldEluZm8oaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5TZXRJbmZvID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvL+ivu+WPluiuvue9ruS/oeaBr1xyXG4gICAgR2V0U2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJHYW1lVUkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBFbnRlckdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZURpcigpOiBHYW1lRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkN1ckRpciBhcyBHYW1lRGlyZWN0b3I7XHJcbiAgICB9XHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr+i1sOi/meS4quaOpeWPo1xyXG4gICAgRW50ZXJTY2VuZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbmV3R2FtZVNjZW5lID0gbmV3IEdhbWVTY2VuZSgpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuRW50ZXJTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQQlVGRuihqOeOsOaViOaenFxyXG4gICAgR2VuQnVmZkVmZmVjdCh0eXBlOiBJdGVtVHlwZSk6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1FbGVtZW50IGV4dGVuZHMgTGF5YS5Cb3ggIHtcclxuICAgIC8vXHJcbiAgICBJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0J0bjogTGF5YS5CdXR0b247XHJcbiAgICBnZXQgQnRuKCk6IExheWEuQnV0dG9uICB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J0biA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICB0aGlzLl9CdG4gPSB0aGlzLmdldENoaWxkQXQoMSkgYXMgTGF5YS5CdXR0b247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9CdG47XHJcbiAgICB9XHJcbiAgICBTZXRCdG4ob3duZXI6IGFueSwgbGlzdGVuZXI6ICgpID0+IHZvaWQpICB7XHJcbiAgICAgICAgdGhpcy5CdG4ub24oTGF5YS5FdmVudC5DTElDSywgb3duZXIsIGxpc3RlbmVyKTtcclxuICAgIH1cclxuICAgIC8vXHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGVFbGVtZW50IGV4dGVuZHMgTGF5YS5JbWFnZVxyXG57XHJcbiAgICAvL1xyXG4gICAgSWR4Om51bWJlcjtcclxuICAgIHByaXZhdGUgX0J0bjpMYXlhLkJ1dHRvbjtcclxuICAgIGdldCBCdG4oKTpMYXlhLkJ1dHRvblxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0J0biA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgICAgICB0aGlzLl9CdG4ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57XHJcbiAgICAgICAgICAgICAgICBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0UGxheWVySUQodGhpcy5JZHgpO1xyXG4gICAgICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuICAgIFJlc2V0KClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkJ0bilcclxuICAgICAgICB7fVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQkdVSSBleHRlbmRzIHVpLkJHVUkge1xyXG4gICAgXHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkJHXCIpKSk7XHJcbiAgICB9XHJcbiAgICBfU2t5QXJyOkFycmF5PExheWEuU3ByaXRlPjtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdmFyIHNreU1vZCA9IHRoaXMuX1NreU1vZGVsO1xyXG4gICAgICAgIHZhciBlYXJ0aCA9IHRoaXMuX0VhcnRoO1xyXG4gICAgICAgIHZhciB3aWRoID0gTGF5YS5zdGFnZS53aWR0aCA7XHJcbiAgICAgICAgdmFyIHJhdGUgPSBNYXRoLmNlaWwoTGF5YS5zdGFnZS5oZWlnaHQvd2lkaCk7XHJcbiAgICAgICAgc2t5TW9kLndpZHRoID0gd2lkaDsvL0xheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgc2t5TW9kLmhlaWdodCA9IHdpZGg7XHJcbiAgICAgICAgZWFydGgud2lkdGggPSB3aWRoO1xyXG4gICAgICAgIGVhcnRoLmhlaWdodCA9IHdpZGg7XHJcbiAgICAgICAgdGhpcy5fU2t5QXJyID0gbmV3IEFycmF5PExheWEuSW1hZ2U+KHJhdGUpO1xyXG4gICAgICAgIGZvcihsZXQgc3RhcnRJZHggPSAwO3N0YXJ0SWR4PHRoaXMuX1NreUFyci5sZW5ndGg7KytzdGFydElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Ta3lBcnJbc3RhcnRJZHhdID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgICAgICAgICAgLy90aGlzLl9Ta3lBcnJbc3RhcnRJZHhdLl9jbG9uZVRvKHNreU1vZClcclxuICAgICAgICAgICAgdGhpcy5fU2t5QXJyW3N0YXJ0SWR4XS5sb2FkSW1hZ2UoXCJjb21wL2ltZ19iYWNrZ3JvdW5kX3Nwcl9za3kucG5nXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9Ta3lBcnJbc3RhcnRJZHhdLndpZHRoID0gd2lkaDtcclxuICAgICAgICAgICAgdGhpcy5fU2t5QXJyW3N0YXJ0SWR4XS5oZWlnaHQgPSB3aWRoO1xyXG4gICAgICAgICAgICB0aGlzLl9QYW5lbC5hZGRDaGlsZCh0aGlzLl9Ta3lBcnJbc3RhcnRJZHhdKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIHNreU1vZC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Jbml0KCk7XHJcbiAgICB9XHJcbiAgICBTa3lEcm9wU3BlZWQ6bnVtYmVyO1xyXG4gICAgUGxhbkRyb3BTcGVlZDpudW1iZXI7XHJcbiAgICBJbml0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICBmb3IobGV0IHN0YXJ0SWR4ID0gMDtzdGFydElkeDx0aGlzLl9Ta3lBcnIubGVuZ3RoOysrc3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU2t5QXJyW3N0YXJ0SWR4XS55ID0gc3RhcnRJZHggKiBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgVXBkYXRlUGFnZSggaGVpZ2h0Om51bWJlciApXHJcbiAgICB7ICAgICAgICBcclxuXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtVSUZ1bmN9IGZyb20gXCIuLy4uL1V0aWxpdHkvVUlGdW5jXCJcclxuLy9VSeWfuuexu1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlVUkgZXh0ZW5kcyBMYXlhLlNwcml0ZVxyXG57XHJcbiAgICBPcGVuKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy9VSU1hbmFnZXIuLkNsb3NlKHRoaXMpO1xyXG4gICAgICAgIHZhciB1aU1ncjpVSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuT1AoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBDbG9zZU9QKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBEZXN0cm95KCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFVJVHlwZSgpOkJhc2VFbnVtLlVJVHlwZUVudW1cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUlUeXBlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgSXNNdXRleCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNNdXRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9OYW1lO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL1xyXG4gICAgcHJvdGVjdGVkIF9VSVR5cGU6QmFzZUVudW0uVUlUeXBlRW51bTtcclxuICAgIHByb3RlY3RlZCBfSXNNdXRleDpib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9OYW1lOnN0cmluZzsgICAgXHJcbiAgICBwcm90ZWN0ZWQgX1VJTWFuYWdlcjpVSU1hbmFnZXJcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5Mb3c7XHJcbiAgICAgICAgdGhpcy5fSXNNdXRleCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7lVSei/m+ihjOmAgumFjVxyXG4gICAgICogQHBhcmFtIFVJIOmAgumFjVVJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGaXhVSShVSTpMYXlhLlZpZXcpXHJcbiAgICB7XHJcbiAgICAgICAgVUlGdW5jLkZpeFVJKFVJKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKFVJKTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgRlcgZnJvbSBcIi4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuaW1wb3J0IFJvbGVFbGVtZW50IGZyb20gXCIuLy4uL3NjcmlwdC9Sb2xlRWxlbWVudFwiXHJcblxyXG5jbGFzcyBFeHRlbmRDaGFyYWN0ZXJzVUkgZXh0ZW5kcyB1aS5DaGFyYWN0ZXJVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkNoYXJhY3RlclwiKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBcclxuICAgIHByaXZhdGUgX1JlbmRlckhhbmRsZXIoY2VsbDpMYXlhLkJveCxpbmRleDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcm9sZUVsZW1lbnQ6Um9sZUVsZW1lbnQgPSBjZWxsIGFzIFJvbGVFbGVtZW50O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LklkeCA9IGluZGV4O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlc2V0KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9VSTpFeHRlbmRDaGFyYWN0ZXJzVUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRDaGFyYWN0ZXJzVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB0aGlzLlNldExpc3QoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiQ2hhcmFjdGVyVUlcIjtcclxuICAgIH1cclxuICAgIFNldExpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBsaXN0QXJyYXk6QXJyYXk8YW55PiA9IFtcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiXTtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QucmVuZGVySGFuZGxlciA9IG5ldyBMYXlhLkhhbmRsZXIodGhpcyx0aGlzLl9SZW5kZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5hcnJheSA9IGxpc3RBcnJheTtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0JhY2tUaW1lID0gMjAwOy8v6K6+572u5qmh55qu562L5Zue5by55pe26Ze044CC5Y2V5L2N5Li65q+r56eS44CCXHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNEaXN0YW5jZSA9IDUwXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtHYW1lU3RydWN0IH0gIGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kRW5kR2FtZVVJIGV4dGVuZHMgdWkuRW5kR2FtZVVJIHtcclxuICAgIFBhbmVsOkxheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVuZEdhbWVcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbCA9IHRoaXMuUGFuZWw7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMuUGFuZWwuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX01lbnVlQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssR3VpZGVyTWFuYWdlci5NZ3IsR3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5fU2V0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssQ29udHJvbGVyLkdhbWVDb250cm9sZXIsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TdGFydEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZEdhbWVVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkVuZEdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgVUk6RXh0ZW5kRW5kR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5VST0gbmV3IEV4dGVuZEVuZEdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5VSSk7XHJcbiAgICAgICAgLy90aGlzLlVJLl9DaGFyYWN0ZXJMaXN0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyB0aGlzLl9VSU1hbmFnZXIuU2hvdzxQbGF5ZXJMaXN0VUk+KFBsYXllckxpc3RVSSl9KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgRk0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBQbGF5ZXJMaXN0VUkgZnJvbSBcIi4vLi4vdWkvUGxheWVyTGlzdFVJXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kRW50ZXJHYW1lVUkgZXh0ZW5kcyB1aS5FbnRlclVJIHtcclxuICAgIFBhbmVsOkxheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlBhbmVsID0gdGhpcy5fUGFuZWw7XHJcbiAgICAgICAgdGhpcy5QYW5lbC52U2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5QYW5lbC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fQ2hhcmFjdGVyLm9uKExheWEuRXZlbnQuQ0xJQ0ssR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TaG93Q2hhcmFjdGVyUGFuZWwpO1xyXG4gICAgICAgIHRoaXMuX1NldFBhbmVsLm9uKExheWEuRXZlbnQuQ0xJQ0ssR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TaG93U2V0UGFuZWwpO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpO1xyXG4gICAgfSAgICAgICAgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGVyR2FtZVVJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiRW50ZXJHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIF9VSTpFeHRlbmRFbnRlckdhbWVVSTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJPSBuZXcgRXh0ZW5kRW50ZXJHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB2YXIgdWlNZ3I6VUlNYW5hZ2VyID0gdGhpcy5fVUlNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuX1VJLl9DaGFyYWN0ZXJMaXN0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyB1aU1nci5TaG93PFBsYXllckxpc3RVST4oUGxheWVyTGlzdFVJKX0pO1xyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOWcuuaZr1VJXHJcbiAqL1xyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBJdGVtTGlzdFVJIGZyb20gXCIuL0l0ZW1MaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmNsYXNzIEV4dGVuZHNHYW1lVUkgZXh0ZW5kcyB1aS5HYW1lVUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBTZXRDb3VudFRpbWUoaW5mbzpzdHJpbmcgPVwiXCIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lLnRleHQgPWluZm87XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHJpdmF0ZSBfVUk6RXh0ZW5kc0dhbWVVSTtcclxuICAgIC8vXHJcbiAgICBEaXN0YW5jZVN0cjpBcnJheTxzdHJpbmc+O1xyXG4gICAgR29sZE51bVN0cjpBcnJheTxzdHJpbmc+O1xyXG4gICAgX0dvbGQ6bnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fSXNNdXRleCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kc0dhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX0dvbGQgPSAwO1xyXG4gICAgICAgIHZhciBvcElzUmlnaHQgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0SW5mby5PUElzUmlnaHQ7XHJcbiAgICAgICAgdGhpcy5fVUkuX0l0ZW1MaXN0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyB0aGlzLl9VSU1hbmFnZXIuU2hvdzxJdGVtTGlzdFVJPihJdGVtTGlzdFVJKX0pXHJcbiAgICAgICAgdGhpcy5TZXRDb3VudFRpbWUoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyPSB0aGlzLl9VSS5fVHh0RGlzdGFuY2UudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgdGhpcy5EaXN0YW5jZVN0clsxXSA9IFwiMFwiXHJcbiAgICAgICAgdGhpcy5fU2hvd0Rpc3RhbmNlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyID0gdGhpcy5fVUkuX1R4dEdvbGQudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyWzFdID0gXCIwXCI7XHJcbiAgICAgICAgdGhpcy5fU2hvd0dvbGROdW0oKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLlNob3dJbnB1dEluZm8oXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfU2hvd0Rpc3RhbmNlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0RGlzdGFuY2UudGV4dCA9IHRoaXMuRGlzdGFuY2VTdHJbMF0rdGhpcy5EaXN0YW5jZVN0clsxXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfU2hvd0dvbGROdW0oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHRHb2xkLnRleHQgPSB0aGlzLkdvbGROdW1TdHJbMF0gKyB0aGlzLkdvbGROdW1TdHJbMV07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgQWRkR29sZChnb2xkTnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Hb2xkKz0gZ29sZE51bTtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSB0aGlzLl9Hb2xkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5fU2hvd0dvbGROdW0oKTtcclxuICAgIH1cclxuICAgIFNldExlZnRUb3VjaChvd25lcjphbnksTGlzdGVuZXI6KCk9PnZvaWQpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fUmlnaHRfTGVmdFRvdWNoLm9uKExheWEuRXZlbnQuQ0xJQ0ssb3duZXIsTGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldFJpZ2h0VG91Y2gob3duZXI6YW55LExpc3RlbmVyOigpPT52b2lkKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JpZ2h0X1JpZ2h0VG91Y2gub24oTGF5YS5FdmVudC5DTElDSyxvd25lcixMaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0Q291bnRUaW1lKGluZm86c3RyaW5nID1cIlwiKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGluZm89PVwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fQ291bnREb3duVUkudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVQYW5lbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLlNldENvdW50VGltZShpbmZvKTtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXQgR2FtZVBhbmVsKHZhbHVlOmJvb2xlYW4pXHJcbiAgICB7IFxyXG4gICAgICAgIHRoaXMuX1VJLl9HYW1lUGFuZWwudmlzaWJsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgc2V0IERpc3RhbmNlKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gdmFsdWUudG9GaXhlZCgyKTtcclxuICAgICAgICB0aGlzLl9TaG93RGlzdGFuY2UoKTtcclxuICAgIH1cclxuICAgIHNldCBHb2xkTnVtKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuX1Nob3dHb2xkTnVtKCk7XHJcbiAgICB9XHJcbiAgICBTaG93SW5wdXRJbmZvKGluZm86c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9HYW1lSW5mby50ZXh0ID0gaW5mbztcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBJdGVtRWxlbWVudCBmcm9tIFwiLi8uLi9zY3JpcHQvSXRlbUVsZW1lbnRcIlxyXG5cclxuY2xhc3MgRXh0ZW5kc0l0ZW1MaXN0VUkgZXh0ZW5kcyB1aS5JdGVtTGlzdFVJXHJcbntcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIikpKTtcclxuICAgIH1cclxuICAgIFNldExpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsaXN0QXJyYXk6QXJyYXk8YW55PiA9IFtcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiXTtcclxuICAgICAgICB0aGlzLl9MaXN0LmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9MaXN0LnJlbmRlckhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsdGhpcy5fUmVuZGVySGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fTGlzdC5hcnJheSA9IGxpc3RBcnJheTtcclxuICAgICAgICB0aGlzLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljRGlzdGFuY2UgPSA1MFxyXG4gICAgfVxyXG4gICAgQnRuTGlzdGVuZXI6TWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICAgICAgXHJcbiAgICBwcml2YXRlIF9SZW5kZXJIYW5kbGVyKGNlbGw6TGF5YS5Cb3gsaW5kZXg6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJvbGVFbGVtZW50Okl0ZW1FbGVtZW50ID0gY2VsbCBhcyBJdGVtRWxlbWVudDtcclxuICAgICAgICByb2xlRWxlbWVudC5TZXRCdG4odGhpcy5CdG5MaXN0ZW5lci5MaXN0ZW5lcix0aGlzLkJ0bkxpc3RlbmVyLkFjdGlvbik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUxpc3RVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkl0ZW1MaXN0VUlcIjtcclxuICAgIH1cclxuICAgIFVJOkV4dGVuZHNJdGVtTGlzdFVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5VSSA9IG5ldyBFeHRlbmRzSXRlbUxpc3RVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5VSSk7XHJcbiAgICAgICAgdGhpcy5VSS5CdG5MaXN0ZW5lciA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUodGhpcywoKT0+eyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2UodGhpcyl9KVxyXG4gICAgICAgIHRoaXMuVUkuU2V0TGlzdCgpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5cclxuY2xhc3MgRXh0ZW5kUGxheWVyTGlzdCBleHRlbmRzIHVpLlBsYXllckxpc3RVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckxpc3RVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIlBsYXllckxpc3RVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIF9VSTpFeHRlbmRQbGF5ZXJMaXN0O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRQbGF5ZXJMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JldHVybk1haW4ub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5jbGFzcyBFeHRlbmRzU2V0UGFuZWxVSSBleHRlbmRzIHVpLlNldFBhbmVsVUkge1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJTZXRQYW5lbFwiKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL3RoaXMuX1JldHVybi5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntBUFAuVUlNYW5hZ2VyLkNsb3NlQ3VyVmlldygpfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNTZXRQYW5lbFVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzU2V0UGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4geyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7IEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKSB9KTtcclxuICAgICAgICB0aGlzLlNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNldFBhbmVsVUlcIjtcclxuICAgIH1cclxuICAgIFNldFBhbmVsKCkge1xyXG4gICAgICAgIHZhciBpbmZvOiBHYW1lU3RydWN0LlNldEluZm8gPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HZXRTZXRJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5fVUkuX0F1ZGlvU3dpdGNoLnNlbGVjdGVkSW5kZXggPSBpbmZvLkF1ZGlvT24gPyAwIDogMTtcclxuICAgICAgICB0aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uT1BJc1JpZ2h0ID8gMSA6IDA7XHJcbiAgICAgICAgdGhpcy5fVUkuX1RleHQudGV4dCA9IGluZm8uVGV4dEluZm87XHJcbiAgICB9XHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICBpbmZvLkF1ZGlvT24gPSB0aGlzLl9VSS5fQXVkaW9Td2l0Y2guc2VsZWN0ZWRJbmRleCA9PSAwO1xyXG4gICAgICAgIGluZm8uT1BJc1JpZ2h0ID0gdGhpcy5fVUkuX09QU3dpdGNoLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TYXZlU2V0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZU9QKCkge1xyXG4gICAgICAgIHRoaXMuU2F2ZVBhbmVsKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi9CYXNlVUlcIlxyXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xyXG5cclxubW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Qcm9ncmVzczpMYXlhLlByb2dyZXNzQmFyO1xyXG5cdFx0cHVibGljIF9HdWlkZXI6TGF5YS5JbWFnZTtcclxuXHRcdHB1YmxpYyBfRW50ZXI6TGF5YS5CdXR0b247XHJcblx0XHRwdWJsaWMgRXJyb3JJbmZvOkxheWEuTGFiZWw7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkxvYWRpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFeHRMb2FkaW5nVUkgZXh0ZW5kcyB1aS5Mb2FkaW5nVUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMoXCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ1VJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgXCJMb2FkaW5nVUlcIjtcclxuICAgIH1cclxuICAgIF9VSTp1aS5Mb2FkaW5nVUk7XHJcbiAgICBfQ2FsbEJhY2s6KCk9PnZvaWQ7XHJcbiAgICBjb25zdHJ1Y3RvciggbmFtZTpzdHJpbmcgKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIC8vdGhpcy5fVUkgPW5ldyB1aS5Mb2FkaW5nVUkoKTtcclxuICAgICAgICB0aGlzLl9VSSA9bmV3IEV4dExvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkgKTtcclxuICAgICAgICB0aGlzLlZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci52aXNpYmxlID1mYWxzZTtcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuX0NhbGxCYWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgeDpudW1iZXIgPSAwO1xyXG4gICAgICAgIHggKz0gdGhpcy5fVUkuX1Byb2dyZXNzLndpZHRoKnRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZTtcclxuICAgICAgICB0aGlzLl9VSS5fR3VpZGVyLnBvcyh4LHRoaXMuX1VJLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBWYWx1ZShudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZSA9IG51bTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIENvbXBsZXRlKGNhbGxCYWNrOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0NhbGxCYWNrID0gY2FsbEJhY2s7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5sYWJlbCA9IFwiRW50ZXJcIjsvL3RoaXMuX05hbWVbMF07XHJcbiAgICB9XHJcbiAgICBSZWxvYWQoY2FsbEJhY2s6KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuRXJyb3JJbmZvLnZpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgQkdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1BhbmVsOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfU2t5TW9kZWw6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgX0VhcnRoOkxheWEuSW1hZ2U7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJCR1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Hb2xkRGlzOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9MaXN0OkxheWEuTGlzdDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkNoYXJhY3RlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW5kR2FtZVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfR2FtZUluZm86TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1N0YXJ0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTWVudWVCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9TZXRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QbGF5ZXJMaXN0QnRuOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiRW5kR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW50ZXJVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1N0YXJ0OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUGFuZWw6TGF5YS5QYW5lbDtcblx0XHRwdWJsaWMgX1NldFBhbmVsOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyTGlzdDpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVudGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Db3VudERvd25VSTpMYXlhLkJveDtcblx0XHRwdWJsaWMgX0l0ZW1MaXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ291bnRUaW1lOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lUGFuZWw6TGF5YS5Cb3g7XG5cdFx0cHVibGljIF9UeHREaXN0YW5jZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfVXNlSXRlbTpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1R4dEdvbGQ6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1JpZ2h0X0xlZnRUb3VjaDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1JpZ2h0X1JpZ2h0VG91Y2g6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9HYW1lSW5mbzpMYXlhLkxhYmVsO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0xpc3Q6TGF5YS5MaXN0O1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiSXRlbUxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1BsYXllckxpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBfUmV0dXJuTWFpbjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlBsYXllckxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9UZXh0OkxheWEuVGV4dEFyZWE7XG5cdFx0cHVibGljIF9SZXR1cm46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9BdWRpb1N3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG5cdFx0cHVibGljIF9PUFN3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJTZXRQYW5lbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
