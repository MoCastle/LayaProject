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
    var Node = /** @class */ (function () {
        function Node() {
        }
        Object.defineProperty(Node.prototype, "Value", {
            get: function () {
                return this._Value;
            },
            set: function (value) {
                this._Value = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Node.prototype, "Next", {
            get: function () {
                return this._Next;
            },
            set: function (node) {
                this._Next = node;
            },
            enumerable: true,
            configurable: true
        });
        return Node;
    }());
    BaseFunc.Node = Node;
    var NodePool = /** @class */ (function () {
        function NodePool() {
        }
        NodePool.prototype.PullBack = function (node) {
            node.Value = null;
            node.Next = null;
            if (this._NodeList) {
                this._NodeList.Next = node;
            }
            else {
                this._NodeList = node;
            }
        };
        NodePool.prototype.Aquire = function () {
            var node = this._NodeList;
            if (node) {
                this._NodeList = this._NodeList.Next;
            }
            else {
                node = new Node();
            }
            return node;
        };
        return NodePool;
    }());
    var NodeQueue = /** @class */ (function () {
        function NodeQueue() {
            this._Count = 0;
        }
        Object.defineProperty(NodeQueue.prototype, "Count", {
            get: function () {
                return this._Count;
            },
            enumerable: true,
            configurable: true
        });
        NodeQueue.prototype.PopNode = function () {
            if (this._Count < 1) {
                return;
            }
            var node = null;
            node = this._Head;
            this._Head = this._Head.Next;
            node.Next = null;
            --this._Count;
            //别把尾巴带出去了
            if (this._Count == 0) {
                this._Taile = null;
            }
            return node;
        };
        NodeQueue.prototype.Push = function (value) {
            var node = new Node();
            node.Value = value;
            this.PushNode(node);
        };
        NodeQueue.prototype.PushNode = function (node) {
            node.Next = null;
            if (this._Count == 0) {
                this._Head = node;
            }
            else {
                this._Taile.Next = node;
            }
            this._Taile = node;
            ++this._Count;
        };
        NodeQueue.prototype.Clear = function () {
            this._Count = 0;
            this._Taile = null;
            this._Head = null;
        };
        Object.defineProperty(NodeQueue.prototype, "HeadNode", {
            get: function () {
                return this.HeadNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeQueue.prototype, "HeadValue", {
            get: function () {
                if (this._Head) {
                    return this._Head.Value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeQueue.prototype, "TailNode", {
            get: function () {
                return this.TailNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NodeQueue.prototype, "TailValue", {
            get: function () {
                if (this._Taile) {
                    return this._Taile.value;
                }
            },
            enumerable: true,
            configurable: true
        });
        return NodeQueue;
    }());
    BaseFunc.NodeQueue = NodeQueue;
    /*
        export class LinkNodeList<T>
        {
            private _HeadNode:Node<T>;
            private _TailNode:Node<T>;
    
            private _CountNode:number;
            constructor()
            {
                this._HeadNode = new Node<T>();
                this._HeadNode.Next = this._HeadNode;
    
                this._TailNode = this._HeadNode;
            }
            /**
             * 获取头结点值
             
            get HeadValue():T
            {
                return  this._HeadNode.Value;
            }
            
            Add(value:T)
            {
                var newNode:Node<T> = new Node<T>();
                newNode.Value = value;
                this.AddNode(newNode);
            }
            AddNode(newNode:Node<T>)
            {
                if(this._TailNode!=this._HeadNode)
                {
                    this._TailNode.Next = newNode;
                }else
                {
                    this._HeadNode.Next = newNode;
                }
                this._TailNode = newNode;
            }
        }*/
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
        get: function () {
            return this._BG;
        },
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
        _this._UpdateCount = 0;
        return _this;
    }
    UIManager.Name = function () {
        return "UIManager";
    };
    UIManager.prototype.Update = function () {
        //定帧刷新UI
        if (this._UpdateCount > 10) {
            this.UpdateUI(this._UINode);
            this.UpdateUI(this._MidleUINode);
        }
    };
    UIManager.prototype.UpdateUI = function (node) {
        for (var idx = void 0; idx < node.numChildren; ++idx) {
            var ui = node.getChildAt(idx);
            ui.Update();
        }
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
    GameConfig.startScene = "BG.scene";
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
var Path_1 = require("./../Utility/Path");
/**
* 表现用的对象
*/
var AnimObj;
(function (AnimObj) {
    function Init() {
        var name = Path_1.path.GetLH("item_coin_01");
        var model = Laya.loader.getRes(name);
        for (var count = 0; count < 30; ++count) {
            GenAnimObj(AnimCoin, model);
        }
    }
    AnimObj.Init = Init;
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
            this.clearTimer(this, this._FrameFunc);
            this.removeSelf();
        };
        BaseAnimObj.prototype.ForceLeaveStage = function () {
            this._LeaveStage();
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
            Laya.Vector3.scale(addPS, 0.1, addPS);
            Laya.Vector3.add(addPS, position, position);
            this.transform.position = position;
        };
        //生命周期结束处理
        AnimCoin.prototype._LeaveStage = function () {
            _super.prototype._LeaveStage.call(this);
            GameControler_1.default.GameControler.GameDir.AddLogicGold(1);
            Laya.Pool.recover(this.name, this);
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
},{"./../Utility/Path":27,"./../controler/APP":29,"./../controler/GameControler":30}],11:[function(require,module,exports){
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
    var ModelID = "Model";
    var ModelType;
    (function (ModelType) {
        ModelType[ModelType["Coin"] = 0] = "Coin";
    })(ModelType = Item.ModelType || (Item.ModelType = {}));
    var ItemType;
    (function (ItemType) {
        ItemType[ItemType["None"] = 0] = "None";
        ItemType[ItemType["Empty"] = 1] = "Empty";
        ItemType[ItemType["Rock"] = 2] = "Rock";
        ItemType[ItemType["Thorn"] = 3] = "Thorn";
        ItemType[ItemType["Protect"] = 11] = "Protect";
        ItemType[ItemType["HolyProtect"] = 12] = "HolyProtect";
        ItemType[ItemType["Fly"] = 13] = "Fly";
        ItemType[ItemType["Rope"] = 14] = "Rope";
        ItemType[ItemType["Vine"] = 15] = "Vine";
        ItemType[ItemType["Collector"] = 16] = "Collector";
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
            /*
            this.BarrierList.push(new LayItemMgr(10,11,ItemType.Empty,10));
            this.BarrierList.push(new LayItemMgr(10,4,ItemType.Rock,10));
            this.BarrierList.push(new LayItemMgr(10,2,ItemType.Thorn,10));
            this.BarrierList.push(new LayItemMgr(15,2,ItemType.Vine))
            
            this.RewardList.push(new LayItemMgr(10,4,ItemType.Coin))
            this.RewardList.push(new LayItemMgr(10,1,ItemType.Collector))
            this.RewardList.push(new LayItemMgr(10,2,ItemType.Fly))
            this.RewardList.push(new LayItemMgr(20,2,ItemType.Protect,3));
            this.RewardList.push(new LayItemMgr(20,2,ItemType.HolyProtect,3));
            */
            this.BarrierList.push(new LayItemMgr(10, 60, ItemType.Empty, 10));
            this.RewardList.push(new LayItemMgr(10, 60, ItemType.Fly));
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
            ResetItemFactory();
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
    var Reset;
    function ResetItemFactory() {
        if (Reset) {
            return;
        }
        Reset = true;
        for (var theKey in GameStruct_1.GameStruct.ItemDictType) {
            var type = parseInt(theKey);
            if (type <= 2) {
                continue;
            }
            for (var count = 0; count < 30; ++count) {
                var clas = GameStruct_1.GameStruct.ItemDictType[type];
                var item = new clas(null);
                Laya.Pool.recover(ItemID + theKey, item);
            }
        }
    }
    Item.ResetItemFactory = ResetItemFactory;
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
            this._InitItemModel();
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
            //this._InitItemModel();
            this.SetEnable();
            if (this.Model != null) {
                this.Step.addChild(this.Model);
            }
        };
        StepItem.prototype.SetEnable = function () {
            if (this.Model == null) {
                return;
            }
            this.Model.active = true;
        };
        //消除 把自己存入内存池
        StepItem.prototype.DesPawn = function () {
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
        /**
         * 突破保护
         * @returns 是否被突破
         */
        StepItem.prototype.BreakProtect = function (player) {
            var curBuff = player.GetBuff(ProtectBuff.Idx);
            if (curBuff) {
                switch (curBuff.Type) {
                    case ItemType.Protect:
                        curBuff.Complete();
                    case ItemType.HolyProtect:
                        return true;
                }
            }
            return false;
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
            this._GenItemModel();
            if (this.Model)
                this.Model.transform.position = ps;
            return this.Model;
        };
        StepItem.prototype._GenItemModel = function () {
            var model = null;
            switch (this.ItemType) {
                case ItemType.Rock:
                    model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.3, 0.3, 0.5));
                    break;
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
        Rock.prototype._GenItemModel = function () {
            var model = null;
            var idx = 1 + Math.floor(Math.random() * Rock.ModelNum);
            var Name = Path_1.path.GetLH("L01_spr_barrier_0" + idx);
            model = Laya.loader.getRes(Name);
            model = model.clone();
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
        Thorn.prototype._GenItemModel = function () {
            var name = Path_1.path.GetLH("trap_sting_01");
            var model = Laya.loader.getRes(name).clone();
            this.Model = model;
        };
        Thorn.prototype.TouchItem = function (player) {
            if (this.BreakProtect(player))
                this.PutItem();
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
        Protect.prototype._GenItemModel = function () {
            var name = Path_1.path.GetLH("item_shield_01");
            var model = Laya.loader.getRes(name).clone();
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
        /**
         *
         * @param time 持续时间
         * @param IsHoly 是否绝对无敌
         */
        function ProtectBuff(time, IsHoly) {
            if (time === void 0) { time = 0; }
            if (IsHoly === void 0) { IsHoly = false; }
            var _this = _super.call(this, IsHoly ? ItemType.HolyProtect : ItemType.Protect, ProtectBuff.Idx) || this;
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
    var HolyProtect = /** @class */ (function (_super) {
        __extends(HolyProtect, _super);
        function HolyProtect(step) {
            return _super.call(this, ItemType.HolyProtect, step) || this;
        }
        //由父类统一管理模型生成
        HolyProtect.prototype._GenItemModel = function () {
            var name = Path_1.path.GetLH("item_untouchable_01");
            var model = Laya.loader.getRes(name).clone();
            this.Model = model;
        };
        HolyProtect.prototype.TouchItem = function (player) {
            if (player.GetBuff(ProtectBuff.Idx) != null)
                return;
            this._AddBuffToPlayer(player, new ProtectBuff(3000, true));
        };
        return HolyProtect;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.HolyProtect] = HolyProtect;
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
        Coin.prototype._GenItemModel = function () {
            var name = Path_1.path.GetLH("item_coin_01");
            var model = Laya.loader.getRes(name).clone();
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
        Collecter.prototype._GenItemModel = function () {
            var Idx = Math.floor(1 + Math.random() * 2);
            var name = Path_1.path.GetLH("item_absord");
            var theModel = Laya.loader.getRes(name);
            var model = theModel.clone();
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
        FLy.prototype._GenItemModel = function () {
            var Idx = Math.floor(1 + Math.random() * 2);
            var name = Path_1.path.GetLH("item_flyer_01");
            var model = Laya.loader.getRes(name).clone();
            this.Model = model;
        };
        return FLy;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Fly] = FLy;
    var FlyBuff = /** @class */ (function (_super) {
        __extends(FlyBuff, _super);
        function FlyBuff(speed, floor) {
            if (speed === void 0) { speed = 0.15; }
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
            var time = Laya.timer.currTimer;
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
        Rope.prototype._GenItemModel = function () {
            var model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.1, 0.5, 0.1));
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
            if (!this.BreakProtect(player)) {
                player.AddBuff(new VineBuff());
            }
            this.PutItem();
        };
        //由父类统一管理模型生成
        Vine.prototype._GenItemModel = function () {
            var Idx = Math.floor(1 + Math.random() * 2);
            var name = Idx == 1 ? Path_1.path.GetLH("trap_entangle_01") : Path_1.path.GetLH("trap_chomper_01");
            //var name:string = path.GetLH("trap_entangle_01")
            //var name:string = path.GetLH("trap_chomper_01")
            var model = Laya.loader.getRes(name).clone();
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
        VineBuff.prototype._Input = function (inputDir) {
            if (this.InputDir == inputDir) {
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
        _this.LayOutDirty = false;
        _this._Seted = false;
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
        this.LayOutDirty = false;
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
            if (this._Seted && (column == 0 || column > this.LogicLength))
                newStep.ResetStep(stepVector, true);
            else
                newStep.ResetStep(stepVector);
            startX += stepDistance;
        }
        if (this._Seted)
            return;
        stepArr[0].active = false;
        stepArr[stepArr.length - 1].active = false;
        this._Seted = true;
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
    /**
     * 获取玩家BUFF
     * @param idx 槽位检查
     * @returns 空表示没有
     */
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
        if (!this.CurStep) {
            return;
        }
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
            //var vector = new Laya.Vector3(0,Controler.GameControler.StepLength,-1*Controler.GameControler.StepDistance/2);
            // Laya.Vector3.scale(vector,this.Speed,vector);
            var vector = new Laya.Vector3(0, 0.146, -0.10394);
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
        if (_this.Idx != 0) {
            var Idx = Math.floor(1 + Math.random() * Step.stepModelNum);
            var name = Path_1.path.GetLH("L01_spr_plat_0" + Idx);
            var model = Laya.loader.getRes(name);
        }
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
    Step.prototype.ResetStep = function (newPs, ignoreActive) {
        if (ignoreActive === void 0) { ignoreActive = false; }
        this.Position = newPs;
        if (!ignoreActive)
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
/*
import {ui} from "./ui/layaMaxUI"
class Main {
    Center:Laya.Sprite3D;
    Dirty:Boolean;
    constructor() {
        Laya3D.init(0,0);
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM;
        //开启统计信息
        Laya.Stat.show();
        
        //添加3D场景
        var scene: Laya.Scene3D = Laya.stage.addChild(new Laya.Scene3D()) as Laya.Scene3D;

        //添加照相机
        var camera: Laya.Camera = (scene.addChild(new Laya.Camera(0, 0.1, 100))) as Laya.Camera;
        camera.transform.translate(new Laya.Vector3(0, 0, 10));
        camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);

        //添加自定义模型
        var box: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        box.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        this.Center = new Laya.Sprite3D();

        this.Center.addChild(box);
        scene.addChild(this.Center);
        Laya.stage.frameLoop(1,this,this.onUpdate);
        var Another: Laya.MeshSprite3D = scene.addChild(new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(1, 1, 1))) as Laya.MeshSprite3D;
        Another.transform.rotate(new Laya.Vector3(0, 45, 0), false, false);
        box.transform.localPosition = new Laya.Vector3(-1,-1,0);
        Another.transform.localPosition = new Laya.Vector3(1,1,0);
        this.Center.addChild(Another);
        //UIFunc.FixUI(newUI);
        this.Dirty = true;
    }
    
    onUpdate():void
    {
        this.Center.transform.rotate(new Laya.Vector3(0,0,0.01));
    }
}
//激活启动类
new Main();



//激活启动类
new Main();
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
        Laya3D.init(0, 0, true);
        GameConfig_1.default.init();
        //Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM;
        if (Laya.Browser.onAndroid) {
            Laya.stage.frameRate = "slow";
        }
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
        _this._CurBG = APP_1.default.SceneManager.BG;
        _this.FreshBGCount = 0;
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
        this._SafeLocation = location;
        if (location.Y < this.TailFLoor.FloorNum || location.Y > this.HeadFloor.FloorNum) {
            return;
        }
        this.ResetItem(location.Y);
    };
    //从某一层开始一层层重新摆放道具
    GameDirector.prototype.ResetItem = function (floor) {
        this.CurLineBarriers = new Array();
        this.CurLineRewards = new Array();
        for (var loopFloor = floor; loopFloor <= this.HeadFloor.FloorNum; ++loopFloor) {
            var floorLine = this.GetFloorByFloor(loopFloor);
            floorLine.LayOutDirty = false;
            floorLine.SetLine(floorLine.FloorNum);
            this._PutItemInLine(loopFloor);
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
        if (this.FreshBGCount > 10) {
            this._CurBG.UpdatePage(this.PlayerDistance);
            this.FreshBGCount = 0;
        }
        ++this.FreshBGCount;
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
        console.time("PutItem");
        this._PutItemInLine(Headfloor);
        console.timeEnd("PutItem");
        return true;
    };
    /**
     * 摆放物品
     * @param {number} floor 物品列表
     */
    GameDirector.prototype._PutItemInLine = function (floor) {
        var safeCol = {};
        var floorLine = this.GetFloorByFloor(floor);
        //布置过了不用再布置了
        if (floorLine.LayOutDirty)
            return;
        floorLine.LayOutDirty = true;
        /*
        if(floor >= this._SafeLocation.Y + Controler.GameControler.MaxLineNum)
        {
            safeCol = this._CountOpenList(floor);
        }else*/
        {
            //摆放前先计算该层通路情况 
            safeCol = {};
            safeCol["o"] = this._CountRoadInfo(floor);
        }
        //出生点不放道具
        if (floor < 1 || floor == this.SafeLocation.Y) {
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
        this._OrginizePutItem(barriersList, randomPool, true);
        //摆放道具
        for (var safeStepIdx = 0; safeIdx < safeStepList.length; ++safeIdx) {
            randomPool.push(safeStepList[safeIdx]);
        }
        var rewardList = this.CurLineRewards;
        this._OrginizePutItem(rewardList, randomPool);
        //再次计算通路情况 
        //this._CountLastFloorRoad(floor);
    };
    /**
     * 摆放物品
     * @param {Array<LineItemInfo>} itemList 物品列表
     * @param {Array<Step>} randomPool 台阶集合
     * @param {boolean} isDeadRoad 是否是死路
     */
    GameDirector.prototype._OrginizePutItem = function (itemList, randomPool, isDeadRoad) {
        if (isDeadRoad === void 0) { isDeadRoad = null; }
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
                if (isDeadRoad != null)
                    step.IsDeadRoad = isDeadRoad;
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
            this._ResetStepInfo(thisFloor);
        else {
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
        }
        if (floor == this._SafeLocation.Y) {
            var safeStep = thisFloor.GetStep(this._SafeLocation.X);
            safeStep.IsDeadRoad = false;
            safeStepList.push(this._SafeLocation.X);
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
        if (this.SafeLocation.Y > floor || floor > this.SafeLocation.Y + 1) {
            var lineBarriers = this.ItemLayout.TakeLineDifficulty(floor);
            this.CurLineBarriers = this.CurLineBarriers.concat(lineBarriers);
        }
        else {
            if (this.CurLineBarriers.length > 0)
                this.CurLineBarriers = new Array();
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
        var resource3DArr = [
            Path_1.path.GetLH("c001_child_01"),
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
            Path_1.path.GetLH("item_absord"),
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
    path.IsEditor = false;
    path.SceneAssetPath = "LayaScene_";
    path.ResourcePath = path.IsEditor ? "D:/GIt/Resources/LayaProject/FreshProject/myLaya/NetResource/" : "http://www.gsjgame.com/Resource/NetResource/";
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
                this._MaxLineNum = 10;
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
var BaseFunc_1 = require("./../Base/BaseFunc");
var BGUI = /** @class */ (function (_super) {
    __extends(BGUI, _super);
    function BGUI() {
        var _this = _super.call(this) || this;
        var widh = Laya.stage.width;
        var rate = Math.ceil(Laya.stage.height / widh);
        _this._SkyQue = new BaseFunc_1.BaseFunc.NodeQueue();
        _this._TempSkyQue = new BaseFunc_1.BaseFunc.NodeQueue();
        //new Array<Laya.Image>(rate+1);
        for (var startIdx = 0; startIdx < rate + 1; ++startIdx) {
            var image = new Laya.Image();
            image.loadImage("comp/img_background_spr_sky.png");
            image.width = widh;
            image.height = widh + widh * 0.01;
            _this.addChild(image);
            _this._SkyQue.Push(image);
        }
        _this.SetSky(0);
        var earth = new Laya.Image();
        earth.y = Laya.stage.height - Laya.stage.width;
        _this._EarthStartPS = earth.y;
        earth.loadImage("comp/img_background_spr.png");
        _this._Earth = earth;
        earth.width = widh;
        earth.height = widh;
        _this.addChild(earth);
        _this._ScaleSky = 0.001;
        _this._ScaleEarth = 0.01;
        return _this;
        //this._EarthStartPS = this._Earth.y;
    }
    BGUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("BG")));
    };
    /*
    Init()
    {
        var height = Laya.stage.width;
        for(let startIdx:number = 0;startIdx<this._SkyQue.Count;++startIdx )
        {
            this._SkyArr[startIdx].y = startIdx * height;
        }
        this._Earth.y = Laya.stage.height - Laya.stage.width;
        this._EarthStartPS = this._Earth.y;
    }*/
    //高度转屏幕高度像素
    BGUI.prototype.HeightTransPix = function (height) {
        return height * -0.1;
    };
    BGUI.prototype.SetSky = function (pixHeight) {
        var temSkyQue = this._TempSkyQue;
        temSkyQue.Clear();
        var count = 0;
        var height = Laya.stage.width;
        while (this._SkyQue.Count > 0) {
            var node = this._SkyQue.PopNode();
            var skyImg = node.Value;
            skyImg.y = count * height + pixHeight - height - height * 0.01;
            temSkyQue.PushNode(node);
            if (skyImg.y > Laya.stage.height) {
                skyImg.y = temSkyQue.HeadValue.y - height;
            }
            ++count;
        }
        this._TempSkyQue = this._SkyQue;
        this._SkyQue = temSkyQue;
    };
    BGUI.prototype.SetEarth = function (height) {
        this._Earth.y = this._EarthStartPS + height;
    };
    BGUI.prototype.UpdatePage = function (height) {
        //height = this.HeightTransPix(height);
        //var skyHeightPix = height*this._ScaleSky;
        this.SetSky(height);
        this.SetEarth(height);
        //var earthHeightPix = height;
    };
    return BGUI;
}(layaMaxUI_1.ui.BGUI));
exports.default = BGUI;
},{"./../Base/BaseFunc":2,"./../Utility/Path":27,"./layaMaxUI":43}],34:[function(require,module,exports){
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
    BaseUI.prototype.SetDirty = function () {
        this._Dirty = true;
    };
    BaseUI.prototype.ClearDirty = function () {
        this._Dirty = false;
    };
    BaseUI.prototype.UIUpdate = function () {
        if (this._Dirty) {
            this.Update();
            this.ClearDirty();
        }
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
    CharacterUI.prototype.Update = function () {
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
    EndGameUI.prototype.Update = function () {
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
    EnterGameUI.prototype.Update = function () {
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
        _this.frameLoop(1, _this, _this.Update);
        _this._Count = 0;
        return _this;
    }
    GameUI.prototype._ShowDistance = function () {
        this._UI._TxtDistance.text = this.DistanceStr[0] + this.DistanceStr[1];
        this.SetDirty();
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
        this.SetDirty();
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
            this._UI._CountDownUI.visible = true;
            this.GamePanel = false;
        }
        this._UI.SetCountTime(info);
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameUI.prototype, "GoldNum", {
        set: function (value) {
            this.GoldNumStr[1] = value.toString();
        },
        enumerable: true,
        configurable: true
    });
    GameUI.prototype.ShowInputInfo = function (info) {
        this._UI._GameInfo.text = info;
    };
    GameUI.prototype.Update = function () {
        //显示金币信息
        this._ShowGoldNum();
        //显示距离信息
        this._ShowDistance();
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
    ItemListUI.prototype.Update = function () { };
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
    PlayerListUI.prototype.Update = function () { };
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
    SetPanelUI.prototype.Update = function () { };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rvb2wvTGF5YTIuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQmFzZS9CYXNlRW51bS50cyIsInNyYy9CYXNlL0Jhc2VGdW5jLnRzIiwic3JjL0Jhc2UvTGlmZU9iai50cyIsInNyYy9GcmFtZVdvcmsvQmFzZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL0ZyYW1lV29yay50cyIsInNyYy9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlci50cyIsInNyYy9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9VSU1hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FuaW1PYmoudHMiLCJzcmMvR2FtZS9CdWZmLnRzIiwic3JjL0dhbWUvR2FtZUNhbWVyYS50cyIsInNyYy9HYW1lL0dhbWVJdGVtLnRzIiwic3JjL0dhbWUvR2FtZVN0cnVjdC50cyIsInNyYy9HYW1lL0lucHV0LnRzIiwic3JjL0dhbWUvTW91bnRMaW5lLnRzIiwic3JjL0dhbWUvUGxheWVyLnRzIiwic3JjL0dhbWUvUGxheWVyQ3RybGVyLnRzIiwic3JjL0dhbWUvU3RlcC50cyIsInNyYy9NYWluLnRzIiwic3JjL1NjZW5lL0Jhc2VEaXJlY3Rvci50cyIsInNyYy9TY2VuZS9CYXNlU2NlbmUudHMiLCJzcmMvU2NlbmUvR2FtZURpcmVjdG9yLnRzIiwic3JjL1NjZW5lL0dhbWVTY2VuZS50cyIsInNyYy9TY2VuZS9HdWlkZXJNYW5hZ2VyLnRzIiwic3JjL1NjZW5lL0xvYWRTY2VuZS50cyIsInNyYy9VdGlsaXR5L1BhdGgudHMiLCJzcmMvVXRpbGl0eS9VSUZ1bmMudHMiLCJzcmMvY29udHJvbGVyL0FQUC50cyIsInNyYy9jb250cm9sZXIvR2FtZUNvbnRyb2xlci50cyIsInNyYy9zY3JpcHQvSXRlbUVsZW1lbnQudHMiLCJzcmMvc2NyaXB0L1JvbGVFbGVtZW50LnRzIiwic3JjL3VpL0JHLnRzIiwic3JjL3VpL0Jhc2VVSS50cyIsInNyYy91aS9DaGFyYWN0ZXJVSS50cyIsInNyYy91aS9FbmRHYW1lVUkudHMiLCJzcmMvdWkvRW50ZXJHYW1lVUkudHMiLCJzcmMvdWkvR2FtZVVJLnRzIiwic3JjL3VpL0l0ZW1MaXN0VUkudHMiLCJzcmMvdWkvUGxheWVyTGlzdFVJLnRzIiwic3JjL3VpL1NldFBhbmVsVUkudHMiLCJzcmMvdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBLElBQWMsUUFBUSxDQUVyQjtBQUZELFdBQWMsUUFBUTtJQUNsQixJQUFZLFVBQXNCO0lBQWxDLFdBQVksVUFBVTtRQUFFLHlDQUFHLENBQUE7UUFBQyw2Q0FBSyxDQUFBO0lBQUEsQ0FBQyxFQUF0QixVQUFVLEdBQVYsbUJBQVUsS0FBVixtQkFBVSxRQUFZO0lBQUEsQ0FBQztBQUN2QyxDQUFDLEVBRmEsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFFckI7Ozs7QUNBRDs7R0FFRztBQUNILElBQWMsUUFBUSxDQTBQckI7QUExUEQsV0FBYyxRQUFRO0lBQ2xCLElBQUssVUFBc0I7SUFBM0IsV0FBSyxVQUFVO1FBQUUseUNBQUcsQ0FBQTtRQUFDLDZDQUFLLENBQUE7SUFBQSxDQUFDLEVBQXRCLFVBQVUsS0FBVixVQUFVLFFBQVk7SUFBQSxDQUFDO0lBQzVCO1FBSUk7WUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUM7UUFFRCxzQkFBSSxzQkFBSztpQkFBVDtnQkFFSSxPQUFRLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDeEIsQ0FBQzs7O1dBQUE7UUFDRCxxQkFBTyxHQUFQLFVBQVEsUUFBaUM7WUFF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QUksR0FRMUM7SUFSWSxlQUFZLGVBUXhCLENBQUE7SUFDRDtRQUFnQyw4QkFBUztRQUtyQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsbUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FWQSxBQVVDLENBVitCLElBQUksQ0FBQyxJQUFJLEdBVXhDO0lBVlksYUFBVSxhQVV0QixDQUFBO0FBQ0wsQ0FBQyxFQXZGYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUF1RmYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IG1vZHVsZSBCYXNlRW51bSB7XHJcbiAgICBleHBvcnQgZW51bSBVSVR5cGVFbnVtIHtMb3csTWlkbGV9O1xyXG59IiwiaW1wb3J0IEJhc2VNZ3IgZnJvbSBcIi4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiO1xyXG5cclxuLyoqXHJcbiAqIOWumuS5ieWfuuehgOe7k+aehOS9k1xyXG4gKi9cclxuZXhwb3J0IG1vZHVsZSBCYXNlRnVuYyB7XHJcbiAgICBlbnVtIFVJVHlwZUVudW0ge0xvdyxNaWRsZX07XHJcbiAgICBleHBvcnQgY2xhc3MgTWFwPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfQ291bnQ6bnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX01hcDp7W2tleTogc3RyaW5nXTogVH07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTWFwID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDb3VudCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yRWFjaChjYWxsYmFjazoobWdyOlQsa2V5OnN0cmluZyk9PnZvaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IG1hcEtleSBpbiB0aGlzLl9NYXApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuX01hcFttYXBLZXldLG1hcEtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIG9iaiDmlL7lhaXlr7nosaFcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOmUrlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNldCggb2JqOlQsIGtleTpzdHJpbmcgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIXRoaXMuX01hcFtrZXldKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICArK3RoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX01hcFtrZXldID0gb2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHZXQoa2V5OnN0cmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5fTWFwW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg56e76Zmk5p+Q5Liq5a+56LGhXHJcbiAgICAgICAgICogQHJldHVybnMg6KKr56e76Zmk5a+56LGhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUmVtb3ZlKGtleTpzdHJpbmcpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBPYmo6VCA9IHRoaXMuX01hcFtrZXldO1xyXG4gICAgICAgICAgICBpZihPYmopXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX01hcFtrZXldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIE9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDplK5cclxuICAgICAgICAgKiBAcmV0dXJucyDmmK/lkKbmi6XmnIlcclxuICAgICAgICAgKi9cclxuICAgICAgICBIYXMoa2V5OnN0cmluZyk6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fTWFwW2tleV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5vZGU8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9WYWx1ZTpUO1xyXG4gICAgICAgIHByaXZhdGUgX05leHQ6Tm9kZTxUPjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFZhbHVlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgVmFsdWUodmFsdWU6VClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBOZXh0KCk6Tm9kZTxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX05leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBOZXh0KG5vZGU6Tm9kZTxUPilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9OZXh0ID0gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgTm9kZVBvb2w8VD5cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgX05vZGVMaXN0Ok5vZGU8VD47XHJcbiAgICAgICAgUHVsbEJhY2sobm9kZTpOb2RlPFQ+KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX05vZGVMaXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Ob2RlTGlzdC5OZXh0ID0gbm9kZTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFxdWlyZSgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOk5vZGU8VD4gPSB0aGlzLl9Ob2RlTGlzdDtcclxuICAgICAgICAgICAgaWYobm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QgPSB0aGlzLl9Ob2RlTGlzdC5OZXh0O1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5vZGVRdWV1ZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX0NvdW50O1xyXG4gICAgICAgIHByaXZhdGUgX0hlYWQ6Tm9kZTxUPlxyXG4gICAgICAgIHByaXZhdGUgX1RhaWxlXHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBQb3BOb2RlKCk6Tm9kZTxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fQ291bnQ8MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbm9kZTpOb2RlPFQ+ID0gbnVsbDtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX0hlYWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWQgPSB0aGlzLl9IZWFkLk5leHQ7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIC0tdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5Yir5oqK5bC+5be05bim5Ye65Y675LqGXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0NvdW50ID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoKHZhbHVlOlQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpOb2RlPFQ+ID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlB1c2hOb2RlKG5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1c2hOb2RlKG5vZGU6Tm9kZTxUPilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0NvdW50ID09MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fSGVhZCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxlLk5leHQgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbm9kZTtcclxuICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIENsZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fVGFpbGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIZWFkTm9kZSgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkhlYWROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEhlYWRWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0hlYWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9IZWFkLlZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGFpbE5vZGUoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuVGFpbE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGFpbFZhbHVlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fVGFpbGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9UYWlsZS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuLypcclxuICAgIGV4cG9ydCBjbGFzcyBMaW5rTm9kZUxpc3Q8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9IZWFkTm9kZTpOb2RlPFQ+O1xyXG4gICAgICAgIHByaXZhdGUgX1RhaWxOb2RlOk5vZGU8VD47XHJcblxyXG4gICAgICAgIHByaXZhdGUgX0NvdW50Tm9kZTpudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZE5vZGUgPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkTm9kZS5OZXh0ID0gdGhpcy5fSGVhZE5vZGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9UYWlsTm9kZSA9IHRoaXMuX0hlYWROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5blpLTnu5PngrnlgLxcclxuICAgICAgICAgXHJcbiAgICAgICAgZ2V0IEhlYWRWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5fSGVhZE5vZGUuVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIEFkZCh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld05vZGU6Tm9kZTxUPiA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIG5ld05vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5BZGROb2RlKG5ld05vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBBZGROb2RlKG5ld05vZGU6Tm9kZTxUPilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1RhaWxOb2RlIT10aGlzLl9IZWFkTm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUuTmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbn0iLCJcclxuZXhwb3J0IG1vZHVsZSBFbnVtIHtcclxuICAgIGV4cG9ydCBlbnVtIExpZmVPYmpTdGF0ZXsgVW5TdGFydGVkLFN0YXJ0aW5nLFVwZGF0aW5nLEVuZGVkIH1cclxufVxyXG4vL+ivpeWvueixoeaooeadv+eUqOS6juaciSDlvIDlp4vjgIHov5vooYzmgKfjgIHnu5PmnZ8g5LiJ56eN54q25oCB55qE5a+56LGhXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIExpZmVPYmpcclxue1xyXG4gICAgT2JqU3RhdGU6RW51bS5MaWZlT2JqU3RhdGU7XHJcbiAgICBhYnN0cmFjdCBTdGFydCgpOnZvaWQ7XHJcblxyXG4gICAgVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuT2JqU3RhdGUgPT0gRW51bS5MaWZlT2JqU3RhdGUuVW5TdGFydGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TdGFydCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9VcGRhdGVGdW5jICE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VwZGF0ZUZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIHByb3RlY3RlZCBfVXBkYXRlRnVuYzooKT0+dm9pZDtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VwZGF0ZUZ1bmM9bnVsbDtcclxuICAgICAgICB0aGlzLk9ialN0YXRlPUVudW0uTGlmZU9ialN0YXRlLlVuU3RhcnRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvL+emu+W8gOaXtui/m+ihjOmFjee9rlxyXG4gICAgcHJvdGVjdGVkIF9MZWF2ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VcGRhdGVGdW5jID0gdGhpcy5fTGVhdmVpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nprvlvIDml7bov5vooYzphY3nva4g56a75byA6YC76L6R5omn6KGM5a6M5oiQ5ZCO6L+b5YWl57uT5p2f54q25oCBXHJcbiAgICBwcm90ZWN0ZWQgX0xlYXZlaW5nKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0xlYXZlQ29tcGxldGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+emu+W8gOWHhuWkh+WujOavlSDmiafooYznprvlvIDpgLvovpFcclxuICAgIHByb3RlY3RlZCBfTGVhdmVDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVXBkYXRlRnVuYyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5PYmpTdGF0ZT0gRW51bS5MaWZlT2JqU3RhdGUuRW5kZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ov5vlhaXphY3nva5cclxuICAgIHByb3RlY3RlZCBfU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5PYmpTdGF0ZT0gRW51bS5MaWZlT2JqU3RhdGUuU3RhcnRpbmc7XHJcbiAgICAgICAgdGhpcy5fVXBkYXRlRnVuYyA9IHRoaXMuX1N0YXJ0aW5nO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+W8gOWni+WHhuWkhyDlh4blpIflsLHnu6rlkI7mraPlvI/ov5DooYxcclxuICAgIHByb3RlY3RlZCBfU3RhcnRpbmcoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRDb21wbGV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfU3RhcnRDb21wbGV0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VcGRhdGVGdW5jID0gdGhpcy5fVXBkYXRlO1xyXG4gICAgICAgIHRoaXMuT2JqU3RhdGU9IEVudW0uTGlmZU9ialN0YXRlLlVwZGF0aW5nO1xyXG4gICAgfVxyXG4gICAgLy/miafooYzov4fnqIvkuK3nmoTlip/og71cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfVXBkYXRlKCk6dm9pZDtcclxufSIsImV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VNZ3Jcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZSgpO1xyXG59IiwiaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7QmFzZUZ1bmN9ICBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJhbWVXb3JrXHJcbntcclxuICAgIF9NZ3JNYXA6QmFzZUZ1bmMuTWFwPEJhc2VNYW5hZ2VyPjsvL0Jhc2VTdHJ1Y3QuTWFwPEJhc2VNYW5hZ2VyPjtcclxuICAgIF9UZW1NZ3JMaXN0OkFycmF5PEJhc2VNYW5hZ2VyPjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAgPSBuZXcgQmFzZUZ1bmMuTWFwPEJhc2VNYW5hZ2VyPigpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0ZNOkZyYW1lV29yaztcclxuICAgIHN0YXRpYyBnZXQgRk0oKTpGcmFtZVdvcmtcclxuICAgIHtcclxuICAgICAgICBpZihGcmFtZVdvcmsuX0ZNPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRnJhbWVXb3JrLl9GTSA9IG5ldyBGcmFtZVdvcmsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEZyYW1lV29yay5fRk07XHJcbiAgICB9XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtcE1nckxpc3QgPSBuZXcgQXJyYXk8QmFzZU1hbmFnZXI+KHRoaXMuX01nck1hcC5Db3VudCk7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwLmZvckVhY2goIChtZ3I6QmFzZU1hbmFnZXIgLCBrZXk6c3RyaW5nKTp2b2lkID0+e1xyXG4gICAgICAgICAgICB0ZW1wTWdyTGlzdC5wdXNoKG1ncik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0ZW1wTWdyTGlzdC5mb3JFYWNoKChtZ3IsaWR4KT0+e21nci5VcGRhdGUoKTt9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWRkTWFuYWdlcjxUIGV4dGVuZHMgQmFzZU1hbmFnZXI+KCB0eXBlOntuZXcgKCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSApOlRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9NZ3JNYXAuSGFzKHR5cGUuTmFtZSgpKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9NZ3JNYXAuR2V0KHR5cGUuTmFtZSgpKSBhcyBUO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3TWdyOlQgPSBuZXcgdHlwZSgpO1xyXG4gICAgICAgIHRoaXMuX01nck1hcC5TZXQobmV3TWdyLHR5cGUuTmFtZSgpKTtcclxuICAgICAgICByZXR1cm4gIG5ld01ncjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEdldE1hbmFnZXI8VCBleHRlbmRzIEJhc2VNYW5hZ2VyPih0eXBlOntuZXcgKCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSk6VHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fTWdyTWFwLkdldCh0eXBlLk5hbWUoKSkgYXMgVDtcclxuICAgIH1cclxufSIsIi8qKuS9nOiAhTpNb1xyXG4gKiDmtojmga/mjqfliLblmahcclxuICovXHJcbmltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5leHBvcnQgbW9kdWxlIE1lc3NhZ2VNRFxyXG57XHJcbiAgICBleHBvcnQgY29uc3QgR2FtZUV2ZW50ID1cclxuICAgIHtcclxuICAgICAgICBQbGF5ZXJEZWF0aDpcIlBsYXllckRlYXRoXCIsXHJcbiAgICAgICAgR2FtZVRpbWVVcDpcIkdhbWVUaW1lVXBcIixcclxuICAgICAgICBHYW1lQ29udGludWU6XCJHYW1lQ29udGludWVcIlxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgTWVzc2FnZUNlbnRlciBleHRlbmRzIEJhc2VNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgXCJNZXNzYWdlQ2VudGVyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6TWVzc2FnZUNlbnRlcjtcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIF9FdmVudERpY3Q6e1tLZXk6c3RyaW5nXTpNRXZlbnR9O1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgX0dldEV2ZW50KG5hbWU6c3RyaW5nKTpNRXZlbnRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBldmVudDpNRXZlbnQgPSB0aGlzLl9FdmVudERpY3RbbmFtZV07XHJcbiAgICAgICAgICAgIGlmKGV2ZW50ID09IHVuZGVmaW5lZHx8IGV2ZW50ID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IE1FdmVudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX0V2ZW50RGljdFtuYW1lXSA9IGV2ZW50O1xyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0V2ZW50RGljdCA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHN0YXRpYyBnZXQgTWdyKCk6TWVzc2FnZUNlbnRlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoTWVzc2FnZUNlbnRlci5fTWdyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1lc3NhZ2VDZW50ZXIuX01nciA9IG5ldyBNZXNzYWdlQ2VudGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIE1lc3NhZ2VDZW50ZXIuX01ncjtcclxuICAgICAgICB9XHJcbiAgICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOWGjFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiDlp5TmiZhcclxuICAgICAgICAgKiBAcGFyYW0ge09ian0gbGlzdGVuZXIg55uR5ZCs6ICFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUmVnaXN0KG5hbWU6c3RyaW5nLGFjdGlvbjooKT0+dm9pZCxsaXN0ZW5lcjpPYmplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6TUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBuZXdEbGd0OkRlbGVnYXRlID0gbmV3IERlbGVnYXRlKGxpc3RlbmVyLGFjdGlvbik7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LkFkZChuZXdEbGd0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo6ZSA5p+Q5Liq55uR5ZCsXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIOWnlOaJmFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqfSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAgKi9cclxuICAgICAgICBEZXNSZWdpc3QobmFtZTpzdHJpbmcsYWN0aW9uOigpPT57fSxsaXN0ZW5lcjpPYmplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6TUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LlJtdihhY3Rpb24sbGlzdGVuZXIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOmUgOafkOS4quS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERlc1JnaXN0SURLKG5hbWU6c3RyaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgIHZhciBnZXRFdmVudDpNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgIGdldEV2ZW50LlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBUcmlnZ2VyKG5hbWU6c3RyaW5nLHBhcmFtOmFueSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6TUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lp5TmiZhcclxuZXhwb3J0IGNsYXNzIERlbGVnYXRlXHJcbntcclxuICAgIExpc3RlbmVyOk9iamVjdDtcclxuICAgIEFjdGlvbjooKT0+dm9pZDtcclxuICAgIC8qKlxyXG4gICAgICog6Kem5Y+RXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgKi9cclxuICAgICBFeGVjdXRlKCBwYXJhbTphbnkgPSBudWxsIClcclxuICAgICB7XHJcbiAgICAgICAgIHRoaXMuQWN0aW9uLmNhbGwodGhpcy5MaXN0ZW5lcixwYXJhbSk7XHJcbiAgICAgfVxyXG4gICAgY29uc3RydWN0b3IobGlzdGVuZXI6T2JqZWN0LGFjdGlvbjooKT0+dm9pZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgdGhpcy5BY3Rpb24gPSBhY3Rpb247XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vL+S6i+S7tlxyXG5leHBvcnQgY2xhc3MgTUV2ZW50XHJcbntcclxuICAgICBEZWxlZ2F0ZUxpc3Q6QXJyYXk8RGVsZWdhdGU+O1xyXG4gICAgIGNvbnN0cnVjdG9yKClcclxuICAgICB7XHJcbiAgICAgICAgIHRoaXMuUmVzZXQoKTtcclxuICAgICB9XHJcbiAgICAgLyoqXHJcbiAgICAgKiDmt7vliqDlp5TmiZhcclxuICAgICAqIEBwYXJhbSB7RGVsZWdhdGV9IGRsZyDmtojmga/lkI3lrZdcclxuICAgICAqL1xyXG4gICAgIEFkZChkbGc6RGVsZWdhdGUpXHJcbiAgICAge1xyXG4gICAgICAgICB0aGlzLkRlbGVnYXRlTGlzdC5wdXNoKGRsZyk7XHJcbiAgICAgfVxyXG4gICAgIC8qKlxyXG4gICAgICog56e76Zmk5aeU5omYXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBhY3Rpb24g5raI5oGv5ZCN5a2XXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuZXIg5raI5oGv5ZCN5a2XXHJcbiAgICAgKi9cclxuICAgICBSbXYoIGFjdGlvbjooKT0+e30sbGlzdGVuZXI6T2JqZWN0ID0gbnVsbCApXHJcbiAgICAge1xyXG4gICAgICAgICB2YXIgZGxndExpc3Q6QXJyYXk8RGVsZWdhdGU+ID0gdGhpcy5EZWxlZ2F0ZUxpc3Q7XHJcbiAgICAgICAgIGZvcih2YXIgYXJySWR4Om51bWJlcj1kbGd0TGlzdC5sZW5ndGggLTEgO2FycklkeD4tMTstLWFycklkeClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgdmFyIGRsZ3QgPSBkbGd0TGlzdFthcnJJZHhdO1xyXG4gICAgICAgICAgICAgaWYoYWN0aW9uID09IGRsZ3QuQWN0aW9uJiYgbGlzdGVuZXIgPT0gZGxndC5MaXN0ZW5lciApXHJcbiAgICAgICAgICAgICB7IFxyXG4gICAgICAgICAgICAgICAgIGRsZ3RMaXN0LnNwbGljZShhcnJJZHgsMSk7XHJcbiAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICB9XHJcbiAgICAgfVxyXG4gICAgIC8v6YeN572uXHJcbiAgICAgUmVzZXQoKVxyXG4gICAgIHtcclxuICAgICAgICAgdGhpcy5EZWxlZ2F0ZUxpc3QgPSBbXVxyXG4gICAgIH1cclxuICAgICAvKipcclxuICAgICAqIOinpuWPkVxyXG4gICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICovXHJcbiAgICAgRXhlY3V0ZSggcGFyYW06YW55IClcclxuICAgICB7XHJcbiAgICAgICAgIHZhciBkbGd0TGlzdDpBcnJheTxEZWxlZ2F0ZT4gPSB0aGlzLkRlbGVnYXRlTGlzdDtcclxuICAgICAgICAgZm9yKHZhciBhcnJJZHg6bnVtYmVyPWRsZ3RMaXN0Lmxlbmd0aCAtMSA7YXJySWR4Pi0xOy0tYXJySWR4KVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICB2YXIgZGxndCA9IGRsZ3RMaXN0W2FycklkeF07XHJcbiAgICAgICAgICAgICBkbGd0LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgICB9XHJcbiAgICAgfVxyXG59XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuLy4uL1NjZW5lL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vLi4vU2NlbmUvQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiXHJcblxyXG4vKirkvZzogIVNb1xyXG4qIOWcuuaZr+WKn+iDvVxyXG4qL1xyXG4vL+WcuuaZr+euoeeQhlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIF9CRzogTGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9CR0xheWVyOiBMYXlhLlNwcml0ZTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllciA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fQkdMYXllcik7XHJcbiAgICAgICAgLy/mt7vliqDlnLrmma/nrqHnkIZcclxuICAgICAgICB0aGlzLlNjZW5lTm9kZSA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU3ByaXRlKCkpO1xyXG4gICAgfVxyXG4gICAgc2V0IEJHKGJnOiBMYXlhLlNwcml0ZSkge1xyXG4gICAgICAgIGlmICghYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQkcpIHtcclxuICAgICAgICAgICAgdGhpcy5fQkcucmVtb3ZlU2VsZjtcclxuICAgICAgICAgICAgdGhpcy5fQkcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIHRoaXMuX0JHLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9CRy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyLmFkZENoaWxkKHRoaXMuX0JHKTtcclxuICAgIH1cclxuICAgIGdldCBCRygpOkxheWEuU3ByaXRlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9CRztcclxuICAgIH1cclxuICAgIFNjZW5lTm9kZTogTGF5YS5Ob2RlO1xyXG5cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2NlbmVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfQ3VyU2NlbmU6IEJhc2VTY2VuZTtcclxuICAgIGdldCBDdXJTY2VuZSgpOiBCYXNlU2NlbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZTtcclxuICAgIH1cclxuICAgIHNldCBDdXJTY2VuZSh2YWx1ZTogQmFzZVNjZW5lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N1clNjZW5lICYmIHRoaXMuX0N1clNjZW5lLlNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0N1clNjZW5lLlNjZW5lLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQ3VyU2NlbmUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5fQ3VyU2NlbmUgJiYgdGhpcy5fQ3VyU2NlbmUuU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5TY2VuZU5vZGUuYWRkQ2hpbGQodGhpcy5fQ3VyU2NlbmUuU2NlbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBDdXJEaXIoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU2NlbmUuQ3VyRGlyO1xyXG4gICAgfVxyXG5cclxuICAgIEVudGVyU2NlbmUodGFyZ2V0U2NlbmU6IEJhc2VTY2VuZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUgPSB0YXJnZXRTY2VuZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuTGVhdmUodGFyZ2V0U2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi91aS9CYXNlVUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtVSUZ1bmN9IGZyb20gXCIuLy4uL1V0aWxpdHkvVUlGdW5jXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgIFVJTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyXHJcbntcclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcml2YXRlIF9VSU5vZGU6TGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9NaWRsZVVJTm9kZTpMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX1VJRGljdDp7W25hbWU6c3RyaW5nXTpCYXNlVUl9O1xyXG4gICAgcHJpdmF0ZSBfVXBkYXRlQ291bnQ6bnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1VJTm9kZSA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIHRoaXMuX1VJTm9kZS53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUlOb2RlLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX1VJTm9kZS5uYW1lID0gXCJVSU5vZGVcIjtcclxuICAgICAgICB0aGlzLl9NaWRsZVVJTm9kZSA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fVUlOb2RlKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuX01pZGxlVUlOb2RlKTtcclxuICAgICAgICB0aGlzLl9VSURpY3QgPSB7fTtcclxuICAgICAgICB0aGlzLl9VcGRhdGVDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIFwiVUlNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy/lrprluKfliLfmlrBVSVxyXG4gICAgICAgIGlmKHRoaXMuX1VwZGF0ZUNvdW50PjEwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVVSSh0aGlzLl9VSU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVVJKHRoaXMuX01pZGxlVUlOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZVVJKG5vZGU6TGF5YS5TcHJpdGUpXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpZHg6bnVtYmVyO2lkeDxub2RlLm51bUNoaWxkcmVuOyArK2lkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB1aTpCYXNlVUkgPSBub2RlLmdldENoaWxkQXQoaWR4KSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIHVpLlVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBBZGRVSSgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFNob3c8VCBleHRlbmRzIEJhc2VVST4odWlDbGFzczp7bmV3IChuYW1lOnN0cmluZyk6IFQ7IE5hbWUoKTpzdHJpbmcgfSk6VFxyXG4gICAge1xyXG4gICAgICAgIHZhciBzdHI6c3RyaW5nID0gdWlDbGFzcy5OYW1lKCk7ICAgIFxyXG4gICAgICAgIHZhciBuZXdVSTpCYXNlVUkgPSB0aGlzLkdldFVJQnlOYW1lKHN0cik7XHJcbiAgICAgICAgbmV3VUkgPSBuZXdVST09bnVsbD90aGlzLkFkZFVJQnlOYW1lKHN0cixuZXcgdWlDbGFzcyhzdHIpKTpuZXdVSTtcclxuICAgICAgICB2YXIgbm9kZTpMYXlhLlNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoKG5ld1VJLlVJVHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5Lit5bGC5qyhVUlcclxuICAgICAgICAgICAgY2FzZSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlOlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuX01pZGxlVUlOb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fTWlkbGVVSU5vZGUubnVtQ2hpbGRyZW48PTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pgJrnn6Xlr7zmvJTmmoLlgZzmuLjmiI9cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLlRpbWVVcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/pu5jorqRVaeWFqOaYr+S9juWxguasoVVJXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fVUlOb2RlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjaGlsZE51bTpudW1iZXIgPSBub2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIC8v5oqK5LqS5pal55qE56qX5Y+j5YWz5o6JXHJcbiAgICAgICAgaWYobmV3VUkuSXNNdXRleCYmY2hpbGROdW0+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VUkgPSBub2RlLmdldENoaWxkQXQobm9kZS5udW1DaGlsZHJlbi0xKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIGxhc3RVSS52aXNpYmxlID0gIWxhc3RVSS5Jc011dGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5hZGRDaGlsZChuZXdVSSk7XHJcbiAgICAgICAgbmV3VUkuT3Blbk9QKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdVSSBhcyBUO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKHVpOkJhc2VVSSlcclxuICAgIHtcclxuICAgICAgICB1aS5yZW1vdmVTZWxmKCk7XHJcblxyXG4gICAgICAgIHVpLkNsb3NlT1AoKTtcclxuICAgICAgICB2YXIgbm9kZTpMYXlhLlNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoKHVpLlVJVHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5Lit5bGC5qyhVUlcclxuICAgICAgICAgICAgY2FzZSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlOlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMuX01pZGxlVUlOb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYobm9kZS5udW1DaGlsZHJlbjw9MClcclxuICAgICAgICAgICAgICAgICAgICAvL+WFs+mXreeql+WPoyDpgJrnn6XmuLjmiI/nu6fnu61cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLkNvbnRpbnVlVGltZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/pu5jorqRVaeWFqOaYr+S9juWxguasoVVJXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fVUlOb2RlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNoaWxkTnVtOm51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgaWYoY2hpbGROdW0+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VUk6QmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGNoaWxkTnVtLTEpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgbGFzdFVJLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBDbG9zZUN1clZpZXcoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB1aTpCYXNlVUkgPXRoaXMuX1VJTm9kZS5nZXRDaGlsZEF0KHRoaXMuX1VJTm9kZS5udW1DaGlsZHJlbi0xKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgdGhpcy5DbG9zZSh1aSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liKDpmaTmiYDmnInoioLngrnkuIrnmoRVSVxyXG4gICAgQ2xlYXIoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB1aU5vZGUgPSB0aGlzLl9VSU5vZGU7XHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgIHZhciBjbG9zZVVJOiBCYXNlVUkgPSB1aU5vZGUuZ2V0Q2hpbGRBdCgwKSBhcyBCYXNlVUk7Ly8ucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVpTm9kZSA9IHRoaXMuX01pZGxlVUlOb2RlXHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgIHZhciBjbG9zZVVJOiBCYXNlVUkgPSB1aU5vZGUuZ2V0Q2hpbGRBdCgwKSBhcyBCYXNlVUk7Ly8ucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEdldFVJQnlOYW1lKG5hbWU6c3RyaW5nKTpCYXNlVUlcclxuICAgIHtcclxuICAgICAgICB2YXIgdWkgPSB0aGlzLl9VSURpY3RbbmFtZV07XHJcbiAgICAgICAgdWkgPSB1aT09dW5kZWZpbmVkP251bGw6dWk7XHJcbiAgICAgICAgcmV0dXJuIHVpO1xyXG4gICAgfVxyXG4gICAgQWRkVUlCeU5hbWUobmFtZTpzdHJpbmcsdWk6QmFzZVVJKTpCYXNlVUlcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSURpY3RbbmFtZV0gPSB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcbiAgICBcclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgUm9sZUVsZW1lbnQgZnJvbSBcIi4vc2NyaXB0L1JvbGVFbGVtZW50XCJcbmltcG9ydCBJdGVtRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvSXRlbUVsZW1lbnRcIlxyXG4vKlxyXG4qIOa4uOaIj+WIneWni+WMlumFjee9rjtcclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHN0YXRpYyB3aWR0aDpudW1iZXI9NjQwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9MTEzNjtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwiZml4ZWR3aWR0aFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwibm9uZVwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJ0b3BcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwibGVmdFwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiQkcuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcInNjcmlwdC9Sb2xlRWxlbWVudC50c1wiLFJvbGVFbGVtZW50KTtcbiAgICAgICAgcmVnKFwic2NyaXB0L0l0ZW1FbGVtZW50LnRzXCIsSXRlbUVsZW1lbnQpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbiAvKipcclxuICog6KGo546w55So55qE5a+56LGhXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEFuaW1PYmpcclxue1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIik7XHJcbiAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgZm9yKCBsZXQgY291bnQgPTA7Y291bnQgPCAzMDsrK2NvdW50IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1Db2luLG1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2VuQW5pbU9iajxUIGV4dGVuZHMgQmFzZUFuaW1PYmo+KCBhbmltQ2xhc3M6e25ldyAobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSxtb2RlbDpMYXlhLlNwcml0ZTNEICk6VFxyXG4gICAge1xyXG4gICAgICAgIHZhciBhbmltT2JqID0gTGF5YS5Qb29sLmdldEl0ZW0oYW5pbUNsYXNzLk5hbWUoKSk7XHJcbiAgICAgICAgaWYoYW5pbU9iaj09bnVsbClcclxuICAgICAgICAgICAgYW5pbU9iaiA9IG5ldyBhbmltQ2xhc3MoYW5pbUNsYXNzLk5hbWUoKSxtb2RlbCk7XHJcbiAgICAgICAgcmV0dXJuIGFuaW1PYmo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFic3RyYWN0IGNsYXNzIEJhc2VBbmltT2JqIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG4gICAge1xyXG4gICAgICAgIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5TY2VuZS5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX0ZyYW1lRnVuYylcclxuICAgICAgICB9XHJcbiAgICAgICAgTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX05hbWU6c3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLm9uKExheWEuRXZlbnQuUkVNT1ZFRCx0aGlzLHRoaXMuX0xlYXZlU3RhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lRnVuYygpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0p1ZGdlQ29tcGxldGUoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0ZyYW1lTG9naWNGdW5jKCk7XHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuO1xyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKHRoaXMsdGhpcy5fRnJhbWVGdW5jKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZvcmNlTGVhdmVTdGFnZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBBbmltQ29pbiBleHRlbmRzIEJhc2VBbmltT2JqXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkFuaW1Db2luXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFNldFRhcmdldCggdGFyZ2V0OkxheWEuU3ByaXRlM0QgKSAgICBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgc3VwZXIuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFyZ2V0OkxheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIobmFtZSxtb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lTG9naWNGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBvc2l0aW9uID0gdGhpcy5fVGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBhZGRQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKGFkZFBTLDAuMSxhZGRQUyk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5hZGQoYWRkUFMscG9zaXRpb24scG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5BZGRMb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMubmFtZSx0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGRpc0RpciA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGRpc0Rpcik7XHJcbiAgICAgICAgICAgIGlmKCBMYXlhLlZlY3RvcjMuc2NhbGFyTGVuZ3RoU3F1YXJlZChkaXNEaXIpPDAuMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IHtQbGF5ZXJDb250cm9sZXJ9IGZyb20gXCIuLy4uL0dhbWUvUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi9JbnB1dFwiO1xyXG5pbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXJCdWZmXHJcbntcclxuICAgIGV4cG9ydCBjbGFzcyBCYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFR5cGU6SXRlbS5JdGVtVHlwZTtcclxuICAgICAgICBJZHg6bnVtYmVyO1xyXG4gICAgICAgIFBsYXllcjpQbGF5ZXI7XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdlbkJ1ZmZNb2QoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQnVmZk1vZCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlU3BoZXJlKDAuMyw4LDgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgICAgICAvL+WIm+W7uuaooeWei+aYvuekuuWvueixoVxyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5BZGRCdWZmTW9kZSh0aGlzLl9CdWZmTW9kKTtcclxuICAgICAgICAgICAgaWYodGhpcy5fU3RhcnRGdW5jIT1udWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TdGFydEZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIENvbXBsZXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkNvbXBsZXRlQnVmZih0aGlzLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZNb2QuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHByb3RlY3RlZCBfQnVmZk1vZDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGU6SXRlbS5JdGVtVHlwZSxpZHg6bnVtYmVyID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuSWR4ID0gaWR4O1xyXG4gICAgICAgICAgICB0aGlzLkdlbkJ1ZmZNb2QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfU3RhcnRGdW5jOigpPT52b2lkO1xyXG4gICAgfVxyXG4gICAgY2xhc3MgRmx5QnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgU3BlZWQ6bnVtYmVyO1xyXG4gICAgICAgIEZsb29yOm51bWJlcjtcclxuICAgICAgICBcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9dGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gcGxheWVyLlBvc2l0aW9uLnogLSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMip0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCgpKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5TZXRTYWZlUFModGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjpHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbFo6bnVtYmVyOyAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOm51bWJlcj0wLjEsZmxvb3I6bnVtYmVyPTEwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbS5JdGVtVHlwZS5Sb3BlLFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gMDsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0ZpbmFsWiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLno+LTAuMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2V0U3RlcEJ5TG9jYXRpb24odGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3MgUHJvdGVjdEJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTpudW1iZXIgPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbS5JdGVtVHlwZS5Qcm90ZWN0LFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5TY2VuZU1hbmFnZXIuQ3VyRGlyLkdhbWVUaW1lK3RpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU8QVBQLlNjZW5lTWFuYWdlci5DdXJEaXIuR2FtZVRpbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBWaW5lQnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgQ291bnRUaW1lOm51bWJlcjtcclxuICAgICAgICBJbnB1dERpcjpib29sZWFuO1xyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsdGhpcy5fSW5wdXQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ29tcGxldGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb3VudFRpbWU6bnVtYmVyID0gMyxpbnB1dERpcjpib29sZWFuID0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW0uSXRlbVR5cGUuVmluZSwwKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudFRpbWUgPSBjb3VudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSBpbnB1dERpcjtcclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaXNSaWdodDpib29sZWFuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5JbnB1dERpciA9PSBpc1JpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklucHV0RGlyID0hdGhpcy5JbnB1dERpcjtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5Db3VudFRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5Db3VudFRpbWU8MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9TaG93R2FtZUluZm8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGluZm86c3RyaW5nO1xyXG4gICAgICAgICAgICBpZih0aGlzLkNvdW50VGltZTwwKVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLklucHV0RGlyID09IHRydWU/XCJSaWdodFwiOlwiTGVmdFwiO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbi8v5ri45oiP5Lit55u45py6XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDYW1lcmEgZXh0ZW5kcyBMYXlhLkNhbWVyYVxyXG57XHJcbiAgICBDdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXI7XHJcbiAgICBCYXNlUFM6TGF5YS5WZWN0b3IzO1xyXG4gICAgRHluYW1pY1BTOkxheWEuVmVjdG9yMztcclxuICAgIFBsYXllcjpQbGF5ZXI7XHJcblxyXG4gICAgU2V0UGxhZXIocGxheWVyOlBsYXllcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgUmVzZXQoRHluYW1pY1BTOkxheWEuVmVjdG9yMyxiYXNlUFM6TGF5YS5WZWN0b3IzLHBsYXllcjpQbGF5ZXIgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIHRoaXMuQmFzZVBTID0gYmFzZVBTO1xyXG4gICAgICAgIHRoaXMuRHluYW1pY1BTID0gRHluYW1pY1BTO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6h566X5bm26K6+572u5L2N572uXHJcbiAgICBDb3VudFNldFBTKClcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3UFMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMuQmFzZVBTLHRoaXMuRHluYW1pY1BTLG5ld1BTKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgc2V0IFBvc2l0aW9uKHBzOkxheWEuVmVjdG9yMylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTpMYXlhLlZlY3RvcjNcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7ICAgXHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN0cmxlciA9IG5ldyBHYW1lQ2FtZXJhQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuRHluYW1pY1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgLy90aGlzLnRpbWVyTG9vcCgxLHRoaXMuQ3RybGVyLHRoaXMuQ3RybGVyLlVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX1VwZGF0ZSk7XHJcbiAgICAgICAgdmFyIHNreUJveDpMYXlhLlNreUJveCA9bmV3IExheWEuU2t5Qm94KCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckZsYWcgPSBMYXlhLkJhc2VDYW1lcmEuQ0xFQVJGTEFHX1NLWTtcclxuICAgICAgICAvL0NhbWVyYS5za3lSZW5kZXJlciA9IHNreUJveC5fcmVuZGVyO1xyXG4gICAgICAgIC8vdGhpcy5zayA9IHNreUJveDtcclxuICAgICAgICAgLy9wYXRoXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9VcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3RybGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBCYXNlR2FtZUNhbWVyYUN0cmxlclxyXG57XHJcbiAgICBDYW1lcmE6R2FtZUNhbWVyYTtcclxuICAgIEN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIGFic3RyYWN0IFVwZGF0ZSgpOnZvaWQ7XHJcbiAgICBjb25zdHJ1Y3RvciggY2FtZXJhOkdhbWVDYW1lcmEsY3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbCApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY3RybGVyID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGN0cmxlciA9IHRoaXM7IFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICB0aGlzLkN0cmxlciA9IGN0cmxlcjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR2FtZUNhbWVyYUN0cmxlciBleHRlbmRzIEJhc2VHYW1lQ2FtZXJhQ3RybGVyXHJcbntcclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5DYW1lcmE9PW51bGx8fCB0aGlzLkNhbWVyYS5QbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIENhbWVyYVBTID0gdGhpcy5DYW1lcmEuRHluYW1pY1BTO1xyXG4gICAgICAgIHZhciBQbGF5ZXJQUyA9IHRoaXMuQ2FtZXJhLlBsYXllci5fTG9naWNQb3NpdGlvbjtcclxuICAgICAgICBDYW1lcmFQUy54ID0gMDtcclxuICAgICAgICB2YXIgZGlzTnVtID0gUGxheWVyUFMueSAtIENhbWVyYVBTLnk7XHJcbiAgICAgICAgdmFyIGRpc1pOdW0gPSBQbGF5ZXJQUy56IC0gQ2FtZXJhUFMuejtcclxuICAgICAgICBpZihNYXRoLmFicyhkaXNOdW0pPjAuMDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy55ICs9IGRpc051bSowLjE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCBNYXRoLmFicyhkaXNaTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueiArPSBkaXNaTnVtKjAuMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQ2FtZXJhLkR5bmFtaWNQUyA9Q2FtZXJhUFM7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuQ291bnRTZXRQUygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbWVyYTpHYW1lQ2FtZXJhLGN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlciA9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoY2FtZXJhLGN0cmxlcik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQge1BsYXllckJ1ZmZ9IGZyb20gXCIuL0J1ZmZcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7QW5pbU9ian0gZnJvbSBcIi4vLi4vR2FtZS9BbmltT2JqXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQge1BsYXllckNvbnRyb2xlcn0gZnJvbSBcIi4vUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi9JbnB1dFwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxudHlwZSBCYXNlUGxheWVyQnVmZiA9IFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmY7XHJcbnR5cGUgQW5pbUNvaW4gPSBBbmltT2JqLkFuaW1Db2luXHJcblxyXG5leHBvcnQgbW9kdWxlIEl0ZW1cclxue1xyXG4gICAgLy/nianlk4HmoIfor4ZcclxuICAgIGNvbnN0IEl0ZW1JRDpzdHJpbmcgPSBcIkl0ZW1cIjtcclxuICAgIGNvbnN0IE1vZGVsSUQ6c3RyaW5nID1cIk1vZGVsXCJcclxuICAgIGV4cG9ydCBlbnVtIE1vZGVsVHlwZVxyXG4gICAge1xyXG4gICAgICAgIENvaW5cclxuICAgIH1cclxuICAgIGV4cG9ydCBlbnVtIEl0ZW1UeXBlIHtcclxuICAgICAgICBOb25lPTAsXHJcbiAgICAgICAgRW1wdHksXHJcbiAgICAgICAgUm9jayxcclxuICAgICAgICBUaG9ybixcclxuICAgICAgICBQcm90ZWN0PTExLFxyXG4gICAgICAgIEhvbHlQcm90ZWN0LFxyXG4gICAgICAgIEZseSxcclxuICAgICAgICBSb3BlLFxyXG4gICAgICAgIFZpbmUsXHJcbiAgICAgICAgQ29sbGVjdG9yLFxyXG4gICAgICAgIENvaW49MjAsXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBMaW5lSXRlbUluZm9cclxuICAgIHtcclxuICAgICAgICBUeXBlOkl0ZW1UeXBlO1xyXG4gICAgICAgIE51bWJlcjpudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IoIHR5cGU6SXRlbVR5cGUsbnVtOm51bWJlciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLk51bWJlciA9IG51bTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v54mp5ZOB5biD5bGAXHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxheW91dFxyXG4gICAge1xyXG4gICAgICAgIFJld2FyZExpc3Q6QXJyYXk8TGF5SXRlbU1ncj47XHJcbiAgICAgICAgQmFycmllckxpc3Q6QXJyYXk8TGF5SXRlbU1ncj47XHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0ID0gbmV3IEFycmF5PExheUl0ZW1NZ3I+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QgPSBuZXcgQXJyYXk8TGF5SXRlbU1ncj4oKTtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDExLEl0ZW1UeXBlLkVtcHR5LDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCw0LEl0ZW1UeXBlLlJvY2ssMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDIsSXRlbVR5cGUuVGhvcm4sMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDE1LDIsSXRlbVR5cGUuVmluZSkpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCw0LEl0ZW1UeXBlLkNvaW4pKVxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwxLEl0ZW1UeXBlLkNvbGxlY3RvcikpXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDIsSXRlbVR5cGUuRmx5KSlcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMjAsMixJdGVtVHlwZS5Qcm90ZWN0LDMpKTtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMjAsMixJdGVtVHlwZS5Ib2x5UHJvdGVjdCwzKSk7XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCw2MCxJdGVtVHlwZS5FbXB0eSwxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCw2MCxJdGVtVHlwZS5GbHkpKVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBUYWtlTGluZVJld2FyZChmbG9vcjpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vcix0aGlzLlJld2FyZExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBUYWtlTGluZURpZmZpY3VsdHkoZmxvb3I6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVGFrZUl0ZW0oZmxvb3IsdGhpcy5CYXJyaWVyTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgVGFrZUl0ZW0oZmxvb3I6bnVtYmVyLCBNZ3JMaXN0OkFycmF5PExheUl0ZW1NZ3I+KTpBcnJheTxMaW5lSXRlbUluZm8+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmV0dXJuSW5mbyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgICAgIGZvciggdmFyIGxpc3RJZHggPSAwOyBsaXN0SWR4IDwgTWdyTGlzdC5sZW5ndGg7ICsrbGlzdElkeCApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1nckxpc3RbbGlzdElkeF0uT25GbG9vcihmbG9vcik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mbzpMaW5lSXRlbUluZm8gPSBNZ3JMaXN0W2xpc3RJZHhdLlRha2VJdGVtcyhmbG9vcik7XHJcbiAgICAgICAgICAgICAgICBpZihpbmZvLk51bWJlcj4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkluZm8ucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuSW5mbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6K+l5a+56LGh55qE5YiG5biD5Zu+5q+P5bGC562J5qaC546H5YiG5biDXHJcbiAgICBleHBvcnQgY2xhc3MgTGF5SXRlbU1nclxyXG4gICAge1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgSXRlbVR5cGU6SXRlbVR5cGU7XHJcbiAgICAgICAgLy/lvZPliY3lsYLmlbBcclxuICAgICAgICBDdXJGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgLy/ljLrpl7TliIbluIPmgLvmlbDph49cclxuICAgICAgICBJdGVtTnVtOm51bWJlcjtcclxuICAgICAgICAvL+W8gOWni+WIhuW4g+eahOWxguaVsFxyXG4gICAgICAgIFN0YXJ0Rmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIC8v5YiG5biD5Yy66Ze0XHJcbiAgICAgICAgUmFuZ2U6bnVtYmVyO1xyXG4gICAgICAgIC8v5bey6I635Y+W5bGC5qCH6K6wXHJcbiAgICAgICAgRmxsb3JNYXJrOm51bWJlcjtcclxuICAgICAgICBJdGVtTGlzdDpBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8vcmFuZ2XljLrpl7TojIPlm7RcclxuICAgICAgICAvL251bSDljLrpl7TojIPlm7TmlbDph49cclxuICAgICAgICAvL2l0ZW1UeXBlIOeUn+S6p+eahOmBk+WFt+exu+Wei1xyXG4gICAgICAgIC8vc3RhcnRGbG9vciDku47lk6rkuIDooYzlvIDlp4vmipXmjrdcclxuICAgICAgICBjb25zdHJ1Y3RvciggcmFuZ2U6bnVtYmVyLG51bTpudW1iZXIsaXRlbVR5cGU6SXRlbVR5cGUsc3RhcnRGbG9vcjpudW1iZXIgPSAxIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKG51bSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbnVtID0gMTtcclxuICAgICAgICAgICAgaWYoc3RhcnRGbG9vciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAvL+esrDDlsYLmmK/njqnlrrbotbfmraXkvY3nva5cclxuICAgICAgICAgICAgICAgIHN0YXJ0Rmxvb3IgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1UeXBlID0gaXRlbVR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VyRmxvb3IgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1OdW0gPSBudW07XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnRGbG9vciA9IHN0YXJ0Rmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuUmFuZ2UgPSByYW5nZTtcclxuICAgICAgICAgICAgLy/liIbluIPlm74g54mp5ZOBaWR4OuWxguaVsFxyXG4gICAgICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5PG51bWJlcj4oKTtcclxuICAgICAgICAgICAgdGhpcy5GbGxvck1hcmsgPSAwO1xyXG4gICAgICAgICAgICBSZXNldEl0ZW1GYWN0b3J5KCApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WxguabtOaWsOWHveaVsFxyXG4gICAgICAgIE9uRmxvb3IoZmxvb3I6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZmxvb3I8dGhpcy5GbGxvck1hcmspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RhcnRGbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HZW5NYXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihmbG9vcj49dGhpcy5TdGFydEZsb29yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sf5oiQ5YiG5biD5Zu+XHJcbiAgICAgICAgR2VuTWFwKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzdGFydEZsb29yID0gdGhpcy5TdGFydEZsb29yO1xyXG4gICAgICAgICAgICB2YXIgaXRlbU51bSA9IHRoaXMuSXRlbU51bTtcclxuICAgICAgICAgICAgdGhpcy5JdGVtTGlzdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICB2YXIgaXRlbUxpc3QgPSB0aGlzLkl0ZW1MaXN0O1xyXG4gICAgICAgICAgICBmb3IodmFyIGNvdW50TnVtOm51bWJlciA9IDA7IGNvdW50TnVtPGl0ZW1OdW07Kytjb3VudE51bSlcclxuICAgICAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIEl0ZW1GbG9vcjpudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGhpcy5SYW5nZSkgKyBzdGFydEZsb29yO1xyXG4gICAgICAgICAgICAgICAgaXRlbUxpc3QucHVzaChJdGVtRmxvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnRGbG9vciArPSB0aGlzLlJhbmdlO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFRha2VJdGVtcyggZmxvb3I6bnVtYmVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRmxsb3JNYXJrID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHZhciBjb3VudE51bSA9IDA7XHJcbiAgICAgICAgICAgIHZhciBpdGVtTGlzdCA9IHRoaXMuSXRlbUxpc3Q7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaXRlbUlkeCA9IDA7aXRlbUlkeDxpdGVtTGlzdC5sZW5ndGg7KytpdGVtSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihpdGVtTGlzdFtpdGVtSWR4XSA9PSBmbG9vcilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICArK2NvdW50TnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1MaXN0LnNwbGljZShpdGVtSWR4LDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC0taXRlbUlkeDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpbmVJdGVtSW5mbyh0aGlzLkl0ZW1UeXBlLGNvdW50TnVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6K+l5a+56LGh55qE5YiG5biD5Zu+5q+P5bGC562J5qaC546H5YiG5biDXHJcbiAgICAvL3Jhbmdl5Yy66Ze06IyD5Zu0XHJcbiAgICAvL251bSDljLrpl7TojIPlm7TmlbDph49cclxuICAgIC8vaXRlbVR5cGUg55Sf5Lqn55qE6YGT5YW357G75Z6LXHJcbiAgICAvL3N0YXJ0Rmxvb3Ig5LuO5ZOq5LiA6KGM5byA5aeL5oqV5o63XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSXRlbUZhY3RvcnkoIHJhbmdlLG51bSxpdGVtVHlwZSxzdGFydEZsb29yIClcclxuICAgIHtcclxuICAgICAgICBpZihudW0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBudW0gPSAxO1xyXG4gICAgICAgIGlmKHN0YXJ0Rmxvb3IgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAvL+esrDDlsYLmmK/njqnlrrbotbfmraXkvY3nva5cclxuICAgICAgICAgICAgc3RhcnRGbG9vciA9IDE7XHJcbiAgICAgICAgLy/pgZPlhbfnsbvlnotcclxuICAgICAgICB0aGlzLkl0ZW1UeXBlID0gaXRlbVR5cGU7XHJcbiAgICAgICAgLy/lvZPliY3lsYLmlbBcclxuICAgICAgICB0aGlzLkN1ckZsb29yID0gMDtcclxuICAgICAgICAvL+WMuumXtOWIhuW4g+aAu+aVsOmHj1xyXG4gICAgICAgIHRoaXMucmFuZ2VOdW0gPSBudW07XHJcbiAgICAgICAgLy/lvIDlp4vliIbluIPnmoTlsYLmlbBcclxuICAgICAgICB0aGlzLlN0YXJ0Rmxvb3IgPSBzdGFydEZsb29yO1xyXG4gICAgICAgIC8v5YiG5biD5Yy66Ze0XHJcbiAgICAgICAgdGhpcy5SYW5nZSA9IHJhbmdlO1xyXG4gICAgICAgIC8v5YiG5biD5Zu+IOeJqeWTgWlkeDrlsYLmlbBcclxuICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5KCk7XHJcbiAgICB9XHJcbiAgICAvL+WxguabtOaWsOWHveaVsFxyXG4gICAgLy9mbG9vciDlvZPliY3lsYJcclxuICAgIEl0ZW1GYWN0b3J5LnByb3RvdHlwZS5vbkZsb29yPSBmdW5jdGlvbihmbG9vcilcclxuICAgIHtcclxuICAgICAgICBpZihmbG9vcj49dGhpcy5TdGFydEZsb29yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5HZW5NYXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+eUn+aIkOWIhuW4g+WbvlxyXG4gICAgSXRlbUZhY3RvcnkucHJvdG90eXBlLkdlbk1hcCA9IGZ1bmN0aW9uKClcclxuICAgIHtcclxuICAgICAgICB2YXIgc3RhcnRGbG9vciA9IHRoaXMuU3RhcnRGbG9vcjtcclxuICAgICAgICB2YXIgcmFuZ2VOdW0gPSB0aGlzLnJhbmdlTnVtO1xyXG4gICAgICAgIHRoaXMuSXRlbUxpc3QgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB2YXIgaXRlbUxpc3QgPSB0aGlzLkl0ZW1MaXN0O1xyXG4gICAgICAgIGZvcih2YXIgSXRlbU51bSA9IDA7IEl0ZW1OdW08cmFuZ2VOdW07KytJdGVtTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIEl0ZW1GbG9vciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLlJhbmdlKSArIHN0YXJ0Rmxvb3I7XHJcbiAgICAgICAgICAgIGl0ZW1MaXN0LnB1c2goSXRlbUZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5TdGFydEZsb29yICs9IHRoaXMuUmFuZ2U7XHJcbiAgICB9XHJcbiAgICAvL+aLv+afkOWxgueJqeWTgeaVsOaNrlxyXG4gICAgSXRlbUZhY3RvcnkucHJvdG90eXBlLlRha2VJdGVtcyA9IGZ1bmN0aW9uKCBmbG9vciApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNvdW50TnVtID0gMDtcclxuICAgICAgICB2YXIgaXRlbUxpc3QgPSB0aGlzLkl0ZW1MaXN0O1xyXG4gICAgICAgIGZvcih2YXIgaXRlbUlkeCA9IDA7aXRlbUlkeDxpdGVtTGlzdC5sZW5ndGg7KytpdGVtSWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoaXRlbUxpc3RbaXRlbUlkeF0gPT0gZmxvb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICsrY291bnROdW07XHJcbiAgICAgICAgICAgICAgICBpdGVtTGlzdC5zcGxpY2UoaXRlbUlkeCwxKTtcclxuICAgICAgICAgICAgICAgIC0taXRlbUlkeDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge0l0ZW1UeXBlOnRoaXMuSXRlbVR5cGUsIE51bTpjb3VudE51bX07XHJcbiAgICB9XHJcbiAgICB2YXIgUmVzZXQ6Ym9vbGVhbjtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZXNldEl0ZW1GYWN0b3J5KCApOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZihSZXNldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJlc2V0ID10cnVlO1xyXG4gICAgICAgIGZvcih2YXIgdGhlS2V5IGluIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBwYXJzZUludCh0aGVLZXkpO1xyXG4gICAgICAgICAgICBpZih0eXBlIDw9IDIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IoIGxldCBjb3VudCA9MDtjb3VudCA8IDMwOysrY291bnQgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xhczogYW55ID0gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbdHlwZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbTpTdGVwID0gbmV3IGNsYXMobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihJdGVtSUQrdGhlS2V5LGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFN0ZXBJdGVtRmFjdG9yeSggaXRlbVR5cGU6SXRlbVR5cGUsU3RlcClcclxuICAgIHtcclxuICAgICAgICBpZihTdGVwID09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpdGVtVHlwZSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpdGVtXHJcbiAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7XHJcbiAgICAgICAgaXRlbSA9IG9ialBvb2wuZ2V0SXRlbShJdGVtSUQraXRlbVR5cGUpXHJcbiAgICAgICAgaWYoaXRlbT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXSE9bnVsbCYmR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdIT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGFzOiBhbnkgPSBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV07XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IGNsYXMoU3RlcCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBuZXcgU3RlcEl0ZW0oaXRlbVR5cGUsU3RlcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLlN0ZXAgPSBTdGVwO1xyXG4gICAgICAgIGl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFN0ZXA6U3RlcDtcclxuICAgICAgICBJdGVtVHlwZTpJdGVtVHlwZTtcclxuICAgICAgICBNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIGdldCBJc0RpZmZpY3VsdHkoKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtVHlwZT4wJiZ0aGlzLkl0ZW1UeXBlPDEwO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v5Yik5pat6IO95LiN6IO96LWw5LiK5Y67XHJcbiAgICAgICAgZ2V0IElzRm9yYmlkZW4oKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtVHlwZSA9PSBJdGVtVHlwZS5Sb2NrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mHjee9rlxyXG4gICAgICAgIFJlc2V0SXRlbSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RoaXMuX0luaXRJdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5TZXRFbmFibGUoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5Nb2RlbCE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RlcC5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFNldEVuYWJsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLk1vZGVsPT1udWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbC5hY3RpdmUgPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFB1dEl0ZW0gPSBmdW5jdGlvbiggaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVzUGF3bigpO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXAuU3RlcEl0ZW0gPSBTdGVwSXRlbUZhY3RvcnkoaXRlbVR5cGUsdGhpcy5TdGVwKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+a2iOmZpCDmioroh6rlt7HlrZjlhaXlhoXlrZjmsaBcclxuICAgICAgICBEZXNQYXduKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuTW9kZWwhPW51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vZGVsLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7Ly9HTS5PYmpQb29sO1xyXG4gICAgICAgICAgICBvYmpQb29sLnJlY292ZXIoSXRlbUlEK3RoaXMuSXRlbVR5cGUsdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSBwbGF5ZXIgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLkl0ZW1UeXBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnqoHnoLTkv53miqRcclxuICAgICAgICAgKiBAcmV0dXJucyDmmK/lkKbooqvnqoHnoLRcclxuICAgICAgICAgKi9cclxuICAgICAgICBCcmVha1Byb3RlY3QocGxheWVyOlBsYXllcik6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGN1ckJ1ZmYgPSBwbGF5ZXIuR2V0QnVmZihQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICBpZihjdXJCdWZmKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goY3VyQnVmZi5UeXBlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUHJvdGVjdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQnVmZi5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuSG9seVByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoIGl0ZW1UeXBlOkl0ZW1UeXBlLFN0ZXA6U3RlcCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihpdGVtVHlwZSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1UeXBlID0gSXRlbVR5cGUuTm9uZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlN0ZXAgPSBTdGVwO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1UeXBlID0gaXRlbVR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWw9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0luaXRJdGVtTW9kZWwoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBfQWRkQnVmZlRvUGxheWVyKHBsYXllcjpQbGF5ZXIsYnVmZjpCYXNlUGxheWVyQnVmZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5BZGRCdWZmKGJ1ZmYpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9Jbml0SXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCB0aGlzLk1vZGVsIT1udWxsJiYhdGhpcy5Nb2RlbC5kZXN0cm95ZWQgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBzID0gbmV3IExheWEuVmVjdG9yMygwLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0dlbkl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLk1vZGVsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Nb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24gPSBwcztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuTW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuSXRlbVR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9jazpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGFzcyBSb2NrIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1vZGVsTnVtID0gMztcclxuICAgICAgICBjb25zdHJ1Y3RvcihTdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb2NrLFN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gMStNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqUm9jay5Nb2RlbE51bSk7XHJcbiAgICAgICAgICAgIHZhciBOYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMFwiK2lkeClcclxuICAgICAgICAgICAgbW9kZWwgPSBMYXlhLmxvYWRlci5nZXRSZXMoTmFtZSlcclxuICAgICAgICAgICAgbW9kZWwgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlJvY2tdID0gUm9jaztcclxuICAgIFxyXG4gICAgY2xhc3MgVGhvcm4gZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlRob3JuLFN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJ0cmFwX3N0aW5nXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQnJlYWtQcm90ZWN0KHBsYXllcikpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlRyaWdnZXIoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuVGhvcm5dID0gVGhvcm47XHJcbiAgICBcclxuICAgIGNsYXNzIFByb3RlY3QgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlByb3RlY3Qsc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGxheWVyLkdldEJ1ZmYoUHJvdGVjdEJ1ZmYuSWR4KSE9bnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5fQWRkQnVmZlRvUGxheWVyKHBsYXllcixuZXcgUHJvdGVjdEJ1ZmYoMzAwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlByb3RlY3RdID0gUHJvdGVjdDtcclxuICAgIFxyXG4gICAgY2xhc3MgUHJvdGVjdEJ1ZmYgZXh0ZW5kcyBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgVGltZTpudW1iZXI7XHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gdGltZSDmjIHnu63ml7bpl7RcclxuICAgICAgICAgKiBAcGFyYW0gSXNIb2x5IOaYr+WQpue7neWvueaXoOaVjFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6bnVtYmVyID0gMCwgSXNIb2x5OmJvb2xlYW4gPSBmYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKElzSG9seSA/IEl0ZW1UeXBlLkhvbHlQcm90ZWN0Okl0ZW1UeXBlLlByb3RlY3QsUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gQVBQLlNjZW5lTWFuYWdlci5DdXJEaXIuR2FtZVRpbWUrdGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVGltZTxBUFAuU2NlbmVNYW5hZ2VyLkN1ckRpci5HYW1lVGltZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3MgSG9seVByb3RlY3QgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkhvbHlQcm90ZWN0LHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGxheWVyLkdldEJ1ZmYoUHJvdGVjdEJ1ZmYuSWR4KSE9bnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5fQWRkQnVmZlRvUGxheWVyKHBsYXllcixuZXcgUHJvdGVjdEJ1ZmYoMzAwMCx0cnVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuSG9seVByb3RlY3RdID0gSG9seVByb3RlY3Q7XHJcblxyXG4gICAgY2xhc3MgQ29pbiBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgRmx5VG9QbGF5ZXIocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjb25pbjpBbmltQ29pbiA9IEFuaW1PYmouR2VuQW5pbU9iajxBbmltQ29pbj4oQW5pbU9iai5BbmltQ29pbix0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgY29uaW4uU2V0VGFyZ2V0KHBsYXllcik7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuQWRkR29sZFVuTG9naWNHb2xkKDEpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuQWRkR29sZCgxKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvaW4sc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29pbl0gPSBDb2luO1xyXG4gICAgXHJcbiAgICBjbGFzcyBDb2xsZWN0ZXIgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZihDb2xsZWN0QnVmZi5JZHgpIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgQ29sbGVjdEJ1ZmYoMTAwMDApKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3RvcixzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxKyBNYXRoLnJhbmRvbSgpKjIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRcIik7XHJcbiAgICAgICAgICAgIHZhciB0aGVNb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSB0aGVNb2RlbC5jbG9uZSgpOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29sbGVjdG9yXSA9IENvbGxlY3RlcjtcclxuICAgIFxyXG4gICAgY2xhc3MgQ29sbGVjdEJ1ZmYgZXh0ZW5kcyBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgVGltZTpudW1iZXI7XHJcbiAgICAgICAgR2FtZURpcjpHYW1lRGlyZWN0b3I7XHJcbiAgICAgICAgQ291bnRGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOm51bWJlciA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Qcm90ZWN0LENvbGxlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZURpciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXI7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IHRoaXMuR2FtZURpci5HYW1lVGltZSt0aW1lO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50Rmxvb3IgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudEZsb29yID0gdGhpcy5HYW1lRGlyLlBsYXllckZsb29yIC0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVGltZTx0aGlzLkdhbWVEaXIuR2FtZVRpbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5HYW1lRGlyLlBsYXllckZsb29yIC0gdGhpcy5Db3VudEZsb29yKzE8MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVEaXIuTG9vcERvRmxvb3JTdGVwKHRoaXMuQ291bnRGbG9vcix0aGlzLHRoaXMuQ291bnRDb2lucyk7XHJcbiAgICAgICAgICAgICAgICArK3RoaXMuQ291bnRGbG9vcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIENvdW50Q29pbnMoc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoc3RlcC5TdGVwSXRlbS5JdGVtVHlwZSA9PSBJdGVtVHlwZS5Db2luKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgQ29pbjpDb2luID0gc3RlcC5TdGVwSXRlbSBhcyBDb2luO1xyXG4gICAgICAgICAgICAgICAgQ29pbi5GbHlUb1BsYXllcih0aGlzLlBsYXllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsYXNzIEZMeSBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKDApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgRmx5QnVmZigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuRmx5LHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDErIE1hdGgucmFuZG9tKCkqMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2ZseWVyXzAxXCIpO1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpOyBcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5GbHldID0gRkx5O1xyXG4gICAgXHJcbiAgICBjbGFzcyBGbHlCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFNwZWVkOm51bWJlcjtcclxuICAgICAgICBGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICB2YXIgdGltZTpudW1iZXIgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICAgICAgaWYocGxheWVyLkN1clN0ZXAgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9dGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gcGxheWVyLlBvc2l0aW9uLnogLSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMip0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCgpKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5TZXRTYWZlUFModGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHBsYXllci5GbHlQcmVwYXJlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDpudW1iZXI9MC4xNSxmbG9vcjpudW1iZXI9MTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb3BlLFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gMDsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0ZpbmFsWiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLno+LTAuMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2V0U3RlcEJ5TG9jYXRpb24odGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGFzcyBSb3BlIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGxheWVyLkdldEJ1ZmYoMCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKG5ldyBSb3BlQnVmZigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9wZSxzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLk1lc2hTcHJpdGUzRCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMSwwLjUsMC4xKSlcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb3BlXSA9IFJvcGU7XHJcbiAgICBcclxuICAgIGNsYXNzIFJvcGVCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFNwZWVkOm51bWJlcjtcclxuICAgICAgICBGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0ZpbmFsWiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLno+LTAuMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2V0U3RlcEJ5TG9jYXRpb24odGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkVuZChzdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBFbmQoc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuUG9wQ3RybGVyKCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IHBsYXllci5DdXJTdGVwLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uLlkgKz10aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZS8yKnRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsdGhpcy5fSW5wdXQpKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5TZXRTYWZlUFModGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjpHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbFo6bnVtYmVyOyAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOm51bWJlcj0wLjEsZmxvb3I6bnVtYmVyPTEwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9wZSxQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaXNSaWdodDpib29sZWFuKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VGbG9vciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuUGxheWVyRmxvb3JMaW5lO1xyXG4gICAgICAgICAgICBpZihjbG9zZUZsb29yLkZsb29yTnVtJTIhPSB0aGlzLl9GaW5hbExvY2F0aW9uLlklMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VGbG9vciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2V0Rmxvb3JCeUZsb29yKGNsb3NlRmxvb3IuRmxvb3JOdW0gKzEgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gY2xvc2VGbG9vci5HZXRTdGVwKCB0aGlzLl9GaW5hbExvY2F0aW9uLlggKTtcclxuICAgICAgICAgICAgaWYoaXNSaWdodClcclxuICAgICAgICAgICAgICAgIHN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgICAgICBpZihzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuRW5kKHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xhc3MgVmluZSBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjdXJCdWZmOkJhc2VQbGF5ZXJCdWZmID0gcGxheWVyLkdldEJ1ZmYoMCk7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLkJyZWFrUHJvdGVjdChwbGF5ZXIpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgVmluZUJ1ZmYoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlZpbmUsc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSsgTWF0aC5yYW5kb20oKSoyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gSWR4ID09IDE/IHBhdGguR2V0TEgoXCJ0cmFwX2VudGFuZ2xlXzAxXCIpOnBhdGguR2V0TEgoXCJ0cmFwX2Nob21wZXJfMDFcIilcclxuICAgICAgICAgICAgLy92YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKVxyXG4gICAgICAgICAgICAvL3ZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJ0cmFwX2Nob21wZXJfMDFcIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKCk7IFxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlZpbmVdID0gVmluZTtcclxuICAgIFxyXG4gICAgY2xhc3MgVmluZUJ1ZmYgZXh0ZW5kcyBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgQ291bnRUaW1lOm51bWJlcjtcclxuICAgICAgICBJbnB1dERpcjpib29sZWFuO1xyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsdGhpcy5fSW5wdXQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ29tcGxldGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb3VudFRpbWU6bnVtYmVyID0gNCxpbnB1dERpcjpib29sZWFuID0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlZpbmUsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRUaW1lID0gY291bnRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklucHV0RGlyID0gaW5wdXREaXI7XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9UaW1lO1xyXG4gICAgICAgIHByaXZhdGUgX0lucHV0KGlucHV0RGlyOmJvb2xlYW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLklucHV0RGlyID09IGlucHV0RGlyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklucHV0RGlyID0hdGhpcy5JbnB1dERpcjtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5Db3VudFRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5Db3VudFRpbWU8PTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfU2hvd0dhbWVJbmZvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOnN0cmluZztcclxuICAgICAgICAgICAgaWYodGhpcy5Db3VudFRpbWU8PTApXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gXCJcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuSW5wdXREaXIgPT0gdHJ1ZT9cIlJpZ2h0XCI6XCJMZWZ0XCI7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuU2hvd0lucHV0SW5mbyhpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCJleHBvcnQgbW9kdWxlIEdhbWVTdHJ1Y3Rcclxue1xyXG4gICAgZXhwb3J0IGNsYXNzIFNldEluZm8ge1xyXG4gICAgICAgIEF1ZGlvT246IGJvb2xlYW47XHJcbiAgICAgICAgT1BJc1JpZ2h0OiBib29sZWFuO1xyXG4gICAgICAgIFRleHRJbmZvOiBzdHJpbmc7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQXVkaW9PbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuT1BJc1JpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5UZXh0SW5mbyA9IFwiSGVsbG8gXFxuIEhlbGxvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE1Mb2NhdGlvblxyXG4gICAge1xyXG4gICAgICAgIGdldCBYKCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQXJyWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgWCh4Om51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyclswXSA9eDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFkoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBZKHk6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzFdID0geTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfQXJyOkFycmF5PG51bWJlcj47XHJcbiAgICAgICAgY29uc3RydWN0b3IoIHg6bnVtYmVyLHk6bnVtYmVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyciA9IFt4LHldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCB2YXIgSXRlbURpY3RUeXBlOntbSXRlbVR5cGU6bnVtYmVyXTphbnl9O1xyXG4gICAgSXRlbURpY3RUeXBlID0geyB9O1xyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOi+k+WFpeeuoeeQhuebuOWFs1xyXG4gKi9cclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5leHBvcnQgbW9kdWxlIElucHV0XHJcbntcclxuLy/ln7rnoYDovpPlhaXmjqfliLblmahcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VHYW1lSW5wdXRcclxue1xyXG4gICAgLy/lhazmnIlcclxuICAgIE5leHRJbnB1dDpCYXNlR2FtZUlucHV0O1xyXG4gICAgYWJzdHJhY3QgSW5wdXQoaXNSaWdodDpib29sZWFuKTtcclxuXHJcbiAgICAvL+engeaciVxyXG4gICAgY29uc3RydWN0b3IoIGlucHV0IDpCYXNlR2FtZUlucHV0ID0gbnVsbCApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaW5wdXQgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlucHV0ID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5OZXh0SW5wdXQgPSBpbnB1dDtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRElZSW5wdXQgZXh0ZW5kcyBCYXNlR2FtZUlucHV0XHJcbntcclxuICAgIElucHV0KGlzUmlnaHQ6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9MaXN0ZW5lcilcclxuICAgICAgICAgICAgdGhpcy5fTGlzdGVuZXIuY2FsbCh0aGlzLl9Pd25lcixpc1JpZ2h0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9Pd25lcjphbnk7XHJcbiAgICBwcml2YXRlIF9MaXN0ZW5lcjooaXNyaW5nOmJvb2xlYW4pPT52b2lkO1xyXG4gICAgY29uc3RydWN0b3Iob3duZXI6YW55ID0gbnVsbCxsaXN0ZW5lcjooaXNyaW5nOmJvb2xlYW4pPT52b2lkID0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX093bmVyID0gb3duZXI7XHJcbiAgICAgICAgdGhpcy5fTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgTm9ybUdhbWVJbnB1dCBleHRlbmRzIEJhc2VHYW1lSW5wdXRcclxue1xyXG4gICAgR2FtZURpcjpHYW1lRGlyZWN0b3I7XHJcbiAgICBjb25zdHJ1Y3RvciggZGlyOkdhbWVEaXJlY3RvcixpbnB1dDpCYXNlR2FtZUlucHV0ID0gbnVsbCApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXQpO1xyXG4gICAgICAgIHRoaXMuR2FtZURpciA9IGRpcjtcclxuICAgIH1cclxuICAgIElucHV0KCBpc1JpZ2h0OmJvb2xlYW4gKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR2FtZURpci5Nb3ZlU3RlcChpc1JpZ2h0KTtcclxuICAgIH1cclxufVxyXG59XHJcbiIsImltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG5cclxuIC8qKuS9nOiAhTpNb1xyXG4gKuWcuuaZr+WGheWvueixoSBcclxuICovXHJcbi8v566h55CG5LiA5pW06KGMXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdW50TGluZSBleHRlbmRzIExheWEuU3ByaXRlM0Rcclxue1xyXG4gICAgTGF5T3V0RGlydHk6Ym9vbGVhbjtcclxuICAgIExpbmVJZHg6bnVtYmVyO1xyXG4gICAgRmxvb3JOdW06bnVtYmVyO1xyXG4gICAgU3RlcExpc3Q6U3RlcFtdO1xyXG4gICAgTG9naWNMZW5ndGg6bnVtYmVyO1xyXG4gICAgU3RlcEl0ZW06U3RlcEl0ZW07XHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+6I635Y+W5pi+56S65Ye65p2l55qE56ys5Yeg5Liq5bmz5Y+wXHJcbiAgICBHZXRTdGVwKGlkeDpudW1iZXIpOlN0ZXBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TdGVwTGlzdFtpZHggKyAxXTtcclxuICAgIH1cclxuICAgIC8v6K6+572u5q+P5bGCXHJcbiAgICBTZXRMaW5lKCBmbG9vcjpudW1iZXIgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkZsb29yTnVtID0gZmxvb3I7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgdmFyIHN0ZXBMZW5ndGggPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgIHZhciBzdGVwRGlzdGFuY2U9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZTtcclxuICAgICAgICBuZXdQUy55ID0gc3RlcExlbmd0aCpmbG9vcjtcclxuICAgICAgICBuZXdQUy56ID0gLXN0ZXBEaXN0YW5jZS8yICpmbG9vcjtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHZhciBzdGVwQXJyOlN0ZXBbXSA9IHRoaXMuU3RlcExpc3Q7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHN0YXJ0WCA9IDAgLSBzdGVwQXJyLmxlbmd0aC8yICogc3RlcERpc3RhbmNlO1xyXG4gICAgICAgIGlmKHRoaXMuSnVnZUlzTGVzc0xpbmUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBzdGVwRGlzdGFuY2UvMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICBmb3IoIHZhciBjb2x1bW4gPTAgO2NvbHVtbjxzdGVwQXJyLmxlbmd0aDsrK2NvbHVtbiApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3U3RlcDpTdGVwID0gc3RlcEFycltjb2x1bW5dO1xyXG4gICAgICAgICAgICB2YXIgc3RlcFZlY3RvciA9IG5ld1N0ZXAuUG9zaXRpb247XHJcbiAgICAgICAgICAgIHN0ZXBWZWN0b3IueCA9IHN0YXJ0WDtcclxuICAgICAgICAgICAgaWYodGhpcy5fU2V0ZWQmJihjb2x1bW4gPT0gMHx8Y29sdW1uPnRoaXMuTG9naWNMZW5ndGgpKVxyXG4gICAgICAgICAgICAgICAgbmV3U3RlcC5SZXNldFN0ZXAoc3RlcFZlY3Rvcix0cnVlKVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBuZXdTdGVwLlJlc2V0U3RlcChzdGVwVmVjdG9yKVxyXG4gICAgICAgICAgICBzdGFydFggKz0gc3RlcERpc3RhbmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9TZXRlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHN0ZXBBcnJbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc3RlcEFycltzdGVwQXJyLmxlbmd0aCAtMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fU2V0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmKCAhIHRoaXMuSnVnZUlzTGVzc0xpbmUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9naWNMZW5ndGggPSBzdGVwQXJyLmxlbmd0aC0yO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGVwQXJyW3N0ZXBBcnIubGVuZ3RoIC0yXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IHN0ZXBBcnIubGVuZ3RoIC0zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/liKTmlq3mmK/lkKbmlLbnvKnnmoTpgqPlsYJcclxuICAgIEp1Z2VJc0xlc3NMaW5lKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkZsb29yTnVtJTIgIT0gMDtcclxuICAgIH1cclxuICAgIC8v5bCG5q+P5Liq6IqC54K56ZO+5o6l5Yiw5LiL5LiA5bGCXHJcbiAgICBTZXROZXh0Rmxvb3IoIGxhc3RGbG9vcjpNb3VudExpbmUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WIpOaWreaYr+WQpuacieS4pOWktOerr+eCuVxyXG4gICAgICAgIHZhciBoYXZlUG9pbnQgPSBsYXN0Rmxvb3IuTG9naWNMZW5ndGggPnRoaXMuTG9naWNMZW5ndGhcclxuICAgICAgICBmb3IoIHZhciBzdGFydElkeDpudW1iZXIgPSAwO3N0YXJ0SWR4PCB0aGlzLkxvZ2ljTGVuZ3RoOysrc3RhcnRJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGVmdFBhcmVudDpTdGVwID1udWxsO1xyXG4gICAgICAgICAgICB2YXIgcmlnaHRQYXJlbnQ6U3RlcCA9bnVsbDtcclxuICAgICAgICAgICAgaWYoaGF2ZVBvaW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCsxKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGVmdFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4LTEpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHRoaVN0ZXAgPSB0aGlzLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlTdGVwLkxlZnRQYXJlbnQgPSBsZWZ0UGFyZW50O1xyXG4gICAgICAgICAgICBsZWZ0UGFyZW50LlJpZ2h0Q2hpbGQgPSB0aGlTdGVwO1xyXG5cclxuICAgICAgICAgICAgdGhpU3RlcC5SaWdodFBhcmVudCA9IHJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICByaWdodFBhcmVudC5MZWZ0Q2hpbGQgPSB0aGlTdGVwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5pWy56KO5LiA5bGCXHJcbiAgICBCcmVhaygpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2V0ZWQ6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKGxpbmVJZHg6bnVtYmVyLGZsb29yOm51bWJlciA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNvbHVtbnM6bnVtYmVyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTGluZVN0ZXBOdW07XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkxpbmVJZHggPSBsaW5lSWR4O1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB0aGlzLlN0ZXBMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1NldGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yKCB2YXIgU3RhcnRJZHg6bnVtYmVyID0gKGNvbHVtbnMgLTEpO1N0YXJ0SWR4Pj0wOy0tU3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N0ZXA6U3RlcCA9IG5ldyBTdGVwKHRoaXMsU3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ld1N0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXBMaXN0W1N0YXJ0SWR4XSA9IG5ld1N0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge1BsYXllckNvbnRyb2xlcn0gZnJvbSBcIi4vUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHtQbGF5ZXJCdWZmfSBmcm9tIFwiLi9CdWZmXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi4vVXRpbGl0eS9QYXRoXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxudmFyIG51bTpudW1iZXIgPSAwO1xyXG50eXBlIEJhc2VQbGF5ZXJCdWZmID0gUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZjtcclxuLy/or6XohJrmnKznlKjkuo7muLjmiI/njqnlrrblr7nosaHnrqHnkIZcclxuLy/njqnlrrblr7nosaFcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG57XHJcbiAgICBzZXQgQ3VyU3RlcChzdGVwOlN0ZXApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ3VyU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyU3RlcCgpOlN0ZXBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU3RlcDtcclxuICAgIH1cclxuICAgIEJhc2VDdHJsZXI6UGxheWVyQ29udHJvbGVyLlBsYXllck5vcm1DdHJsZXI7XHJcbiAgICBCdWZmQXJyOkFycmF5PFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmY+O1xyXG4gICAgLy96ZXJnXHJcbiAgICBJZE51bWJlcjpudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueOqeWutkJVRkZcclxuICAgICAqIEBwYXJhbSBpZHgg5qe95L2N5qOA5p+lXHJcbiAgICAgKiBAcmV0dXJucyDnqbrooajnpLrmsqHmnIlcclxuICAgICAqL1xyXG4gICAgR2V0QnVmZihpZHg6bnVtYmVyKTpQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLkJ1ZmZBcnJbaWR4XSAhPW51bGwmJnRoaXMuQnVmZkFycltpZHhdIT11bmRlZmluZWQpP3RoaXMuQnVmZkFycltpZHhdOm51bGw7XHJcbiAgICB9XHJcbiAgICAvL+aRhuaUvuinkuiJslxyXG4gICAgU2V0U3RlcChwdXRTdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBwdXRTdGVwO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHB1dFN0ZXAuUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBuZXdQUy55ICs9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBwdXRTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuVG91Y2hHcm91bmQoKTtcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3UFM6TGF5YS5WZWN0b3IzID0gbmV3UFMuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9naWNQb3NpdGlvbigpOkxheWEuVmVjdG9yM1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5biD5bGA5b2T5YmN5bGC5L2G5LiN56e75YqoXHJcbiAgICAgKiBAcGFyYW0ge1N0ZXB9IHN0ZXAg5LiL5LiA5q2l5Y+w6Zi2XHJcbiAgICAgKi9cclxuICAgIExheVN0ZXAoc3RlcDpTdGVwKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gc3RlcDtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gc3RlcC5Qb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+inpuWPkeWPsOmYtlxyXG4gICAgVG91Y2hHcm91bmQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuQ3VyU3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCh0aGlzLkN1clN0ZXAuU3RlcEl0ZW0uSXRlbVR5cGUgPT0gSXRlbS5JdGVtVHlwZS5Ob25lKSYmKHRoaXMuQ3VyU3RlcC5Jc0VtcHR5fHwodGhpcy5DdXJTdGVwLkxlZnRQYXJlbnQmJnRoaXMuQ3VyU3RlcC5SaWdodFBhcmVudCYmdGhpcy5DdXJTdGVwLkxlZnRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbiYmdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50LlN0ZXBJdGVtLklzRm9yYmlkZW4pKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5UcmlnZ2VyKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5Ub3VjaEl0ZW0odGhpcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog56e75YqoXHJcbiAgICAgKiBAcGFyYW0ge0xheWEuVmVjdG9yM30gdmVjdG9yIOenu+WKqOWQkemHj+WAvFxyXG4gICAgICovXHJcbiAgICBUcmFuc2xhdGUoIHZlY3RvcjpMYXlhLlZlY3RvcjMgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0udHJhbnNsYXRlKHZlY3Rvcik7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZCh0aGlzLl9Mb2dpY1Bvc2l0aW9uLHZlY3Rvcix0aGlzLl9Mb2dpY1Bvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOeOqeWutuaOp+WItuWZqFxyXG4gICAgICogQHBhcmFtIG5ld0N0cmxlciDmlrDnjqnlrrbmjqfliLblmahcclxuICAgICAqL1xyXG4gICAgQWRkQ3RybGVyKG5ld0N0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlciApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgY3RybGVyOlBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyID0gdGhpcy5fQ3RybGVyO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IG5ld0N0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuTmV4dEN0cmwgPWN0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuU2V0UGxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75Lqk5o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIFBvcEN0cmxlcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLl9DdHJsZXIuTmV4dEN0cmw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoEJVRkZcclxuICAgICAqIEBwYXJhbSBidWZmIFxyXG4gICAgICogQHBhcmFtIGluZGV4IFxyXG4gICAgICovXHJcbiAgICBBZGRCdWZmKGJ1ZmY6UGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZik6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHZhciBpbmRleDpudW1iZXIgPSBidWZmLklkeDtcclxuICAgICAgICBpZih0aGlzLkJ1ZmZBcnJbaW5kZXhdIT1udWxsfHx0aGlzLkJ1ZmZBcnJbaW5kZXhdIT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQnVmZkFycltpbmRleF0gPSBidWZmO1xyXG4gICAgICAgIGJ1ZmYuSWR4ID0gaW5kZXg7XHJcbiAgICAgICAgYnVmZi5TdGFydCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5re75YqgQlVGRuaooeWei1xyXG4gICAgICogQHBhcmFtIG1vZCBcclxuICAgICAqL1xyXG4gICAgQWRkQnVmZk1vZGUoIG1vZDpMYXlhLlNwcml0ZTNEIClcclxuICAgIHtcclxuICAgICAgICBpZihtb2QhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTm9kZS5hZGRDaGlsZChtb2QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog57uT5p2fQlVGRlxyXG4gICAgICovXHJcbiAgICBDb21wbGV0ZUJ1ZmYoaW5kZXg6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBidWZmOkJhc2VQbGF5ZXJCdWZmID0gdGhpcy5CdWZmQXJyW2luZGV4XTtcclxuICAgICAgICB0aGlzLkJ1ZmZBcnJbaW5kZXhdPW51bGw7XHJcbiAgICAgICAgaWYoYnVmZj09bnVsbHx8YnVmZj09dW5kZWZpbmVkIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+engeacieWxnuaAp1xyXG4gICAgX0xvZ2ljUG9zaXRpb246TGF5YS5WZWN0b3IzO1xyXG4gICAgX0J1ZmZOb2RlOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBfUGxheWVyTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIF9DdXJTdGVwOlN0ZXA7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB2YXIgTmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiYzAwMV9jaGlsZF8wMVwiKTtcclxuICAgICAgICB2YXIgUGxheWVyTW9kZWwgPSBMYXlhLkxvYWRlci5nZXRSZXMoTmFtZSk7XHJcbiAgICAgICAgdmFyIHNlY29uZFBsYXllcjpMYXlhLlNwcml0ZTNEID0gUGxheWVyTW9kZWwuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHNlY29uZFBsYXllcik7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcyk7XHJcbiAgICAgICAgLy/mt7vliqDoh6rlrprkuYnmqKHlnotcclxuICAgICAgICBzZWNvbmRQbGF5ZXIudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCksIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5vbihMYXlhLkV2ZW50LlJFTU9WRUQsdGhpcywoKT0+eyB0aGlzLmRlc3Ryb3koKSB9KVxyXG4gICAgICAgIHRoaXMuUmVzZXQoKTtcclxuICAgIH1cclxuICAgIF9VcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIGZvciggdmFyIGJ1ZmZJZHg6bnVtYmVyID0gMDtidWZmSWR4PDI7KytidWZmSWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQnVmZkFycltidWZmSWR4XSE9bnVsbHx8dGhpcy5CdWZmQXJyW2J1ZmZJZHhdIT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1ZmZBcnJbYnVmZklkeF0uVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgRmx5UHJlcGFyZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gbnVsbDtcclxuICAgIH1cclxuICAgIFJlc2V0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBudWxsO1xyXG4gICAgICAgIGlmKHRoaXMuX0J1ZmZOb2RlKVxyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fQnVmZk5vZGUgPSBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fQnVmZk5vZGUpO1xyXG4gICAgICAgIHRoaXMuQnVmZkFyciA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuQmFzZUN0cmxlciA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyTm9ybUN0cmxlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLkJhc2VDdHJsZXI7XHJcbiAgICAgICAgdGhpcy5fTG9naWNQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoMCwwKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fVXBkYXRlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX0N0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlcjtcclxuXHJcbiAgICBcclxufVxyXG5cclxuY2xhc3MgU3RlcERhdGFcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge31cclxuICAgIEdldERhdGEoIHN0ZXA6U3RlcCApXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXJDb250cm9sZXJcclxue1xyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQbGF5ZXJDdHJsZXJcclxuICAgIHtcclxuICAgICAgICAvL+WFrOWFseaOpeWPo1xyXG4gICAgICAgIE5leHRDdHJsOkJhc2VQbGF5ZXJDdHJsZXI7XHJcbiAgICAgICAgcGxheWVyOlBsYXllcjtcclxuICAgICAgICBcclxuICAgICAgICBVcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjpQbGF5ZXIpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBwbGF5ZXI6UGxheWVyLCBjdHJsZXI6QmFzZVBsYXllckN0cmxlciA9IG51bGwgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoY3RybGVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN0cmxlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5OZXh0Q3RybCA9IGN0cmxlcjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfVXBkYXRlKCk6dm9pZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/nlKjkuo7op5LoibLmraPluLjnirbmgIHkuIvnmoTnp7vliqhcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJOb3JtQ3RybGVyIGV4dGVuZHMgQmFzZVBsYXllckN0cmxlclxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIFN0YXJ0TW92ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkN1ckRpci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihwbGF5ZXI6UGxheWVyID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKHBsYXllcilcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5UaW1lPjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuVGltZTw9QVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuR2FtZVRpbWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuU2V0U3RlcCh0aGlzLnBsYXllci5DdXJTdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RUaW1lID0gdGhpcy5UaW1lLUxheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYXRlID0gKDEtbGFzdFRpbWUvIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU3RlcFBzOkxheWEuVmVjdG9yMyA9IHRoaXMucGxheWVyLkN1clN0ZXAuUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgU3RlcFBzLnkgKz1Db250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJwczpMYXlhLlZlY3RvcjMgPSB0aGlzLnBsYXllci5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBjdXJwcy55ICs9Q29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UHMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHMueCA9IChTdGVwUHMueCAtIGN1cnBzLngpKnJhdGUrIGN1cnBzLng7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHMueSA9IChTdGVwUHMueSAtIGN1cnBzLnkpKnJhdGUrY3VycHMueTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdQcy56ID0gKFN0ZXBQcy56IC0gY3VycHMueikqcmF0ZStjdXJwcy56O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuUG9zaXRpb24gPSBuZXdQcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/njqnlrrbpo57ooYxcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJGbHkgZXh0ZW5kcyBCYXNlUGxheWVyQ3RybGVyXHJcbiAgICB7XHJcbiAgICAgICAgU3BlZWQ6bnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueOqeWutlxyXG4gICAgICAgICAqIEBwYXJhbSBwbGF5ZXIg5pON5o6n6KeS6ImyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TZXRQbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgcGxheWVyLlRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCwwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9cclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjpudW1iZXI7ICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLnBsYXllciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy92YXIgdmVjdG9yID0gbmV3IExheWEuVmVjdG9yMygwLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsLTEqQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlLzIpO1xyXG4gICAgICAgICAgIC8vIExheWEuVmVjdG9yMy5zY2FsZSh2ZWN0b3IsdGhpcy5TcGVlZCx2ZWN0b3IpO1xyXG4gICAgICAgICAgIHZhciB2ZWN0b3I6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygwLDAuMTQ2LC0wLjEwMzk0KVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5UcmFuc2xhdGUodmVjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vTW91bnRMaW5lXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi9HYW1lU3RydWN0XCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG50eXBlIFN0ZXBJdGVtID0gSXRlbS5TdGVwSXRlbTtcclxudHlwZSBNTG9jYXRpb24gPSBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuLy/mraVcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlcCBleHRlbmRzIExheWEuU3ByaXRlM0Rcclxue1xyXG4gICAgLy/mqKHlnovkuKrmlbBcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RlcE1vZGVsTnVtOm51bWJlciA9IDM7XHJcblxyXG4gICAgTGVmdFBhcmVudDpTdGVwO1xyXG4gICAgUmlnaHRQYXJlbnQ6U3RlcDtcclxuICAgIExlZnRDaGlsZDpTdGVwO1xyXG4gICAgUmlnaHRDaGlsZDpTdGVwO1xyXG4gICAgU3RlcEl0ZW06U3RlcEl0ZW07XHJcbiAgICBSb2FkTnVtOm51bWJlcjtcclxuICAgIE1hcms6YW55O1xyXG4gICAgRmxvb3I6TW91bnRMaW5lO1xyXG4gICAgSWR4Om51bWJlcjtcclxuICAgIFxyXG4gICAgLy/lhazmnInmjqXlj6NcclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IExvY2F0aW9uKCk6TUxvY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHYW1lU3RydWN0Lk1Mb2NhdGlvbih0aGlzLklkeC0xLHRoaXMuRmxvb3IuRmxvb3JOdW0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRGVhZFJvYWQoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0lzRGVhZFJvYWR8fCF0aGlzLmFjdGl2ZXx8IHRoaXMuU3RlcEl0ZW0uSXNEaWZmaWN1bHR5O1xyXG4gICAgfVxyXG4gICAgc2V0IElzRGVhZFJvYWQodmFsdWU6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNGb3JiaWRlbigpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TdGVwSXRlbS5Jc0ZvcmJpZGVuO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRW1wdHkoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICEodGhpcy5hY3RpdmUmJnRoaXMuRmxvb3IuYWN0aXZlKTtcclxuICAgIH1cclxuICAgIFB1dEl0ZW0oIGl0ZW1FbnVtZTpJdGVtLkl0ZW1UeXBlIClcclxuICAgIHtcclxuICAgICAgICBpZihpdGVtRW51bWUgPT0gSXRlbS5JdGVtVHlwZS5FbXB0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID1mYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUHV0SXRlbShpdGVtRW51bWUpO1xyXG4gICAgfVxyXG5cclxuICAgIFJlc2V0U3RlcChuZXdQczpMYXlhLlZlY3RvcjMsaWdub3JlQWN0aXZlOmJvb2xlYW4gPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBvc2l0aW9uID0gbmV3UHM7XHJcbiAgICAgICAgaWYoIWlnbm9yZUFjdGl2ZSlcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBtb2RlbFBzID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5QdXRJdGVtKEl0ZW0uSXRlbVR5cGUuTm9uZSk7XHJcblxyXG4gICAgICAgIHRoaXMuTGVmdFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9hZE51bSA9IDA7XHJcbiAgICB9XHJcbiAgICBfU3RlcE1vZGVsOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBjb25zdHJ1Y3RvcihmbG9vcjpNb3VudExpbmUsaWR4Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICAvL3N1cGVyKG5ldyBMYXlhLkJveE1lc2goMSwxLDEpICk7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzKTtcclxuICAgICAgICBpZih0aGlzLklkeCAhPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSsgTWF0aC5yYW5kb20oKSpTdGVwLnN0ZXBNb2RlbE51bSk7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMFwiK0lkeClcclxuICAgICAgICAgICAgdmFyIG1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3ZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKCBMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuNSwgMC41LCAwLjUpKSA7Ly9sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjbG9uZU1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICBjbG9uZU1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGNsb25lTW9kZWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtRmFjdG9yeShJdGVtLkl0ZW1UeXBlLk5vbmUsdGhpcyk7O1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgIHRoaXMuSWR4ID0gaWR4O1xyXG5cclxuICAgICAgICB0aGlzLkxlZnRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0Q2hpbGQgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb2FkTnVtID0gMDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX0lzRGVhZFJvYWQ6Ym9vbGVhbjtcclxuXHJcbn0iLCIvKipcclxuICog5L2c6ICFOk1vXHJcbiAqIOWQr+WKqOWcuuaZr1xyXG4gKi9cclxuLypcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCJcclxuY2xhc3MgTWFpbiB7XHJcbiAgICBDZW50ZXI6TGF5YS5TcHJpdGUzRDtcclxuICAgIERpcnR5OkJvb2xlYW47XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRMYXlhM0QuaW5pdCgwLDApO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GVUxMO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IExheWEuU3RhZ2UuU0NSRUVOX1ZFUlRJQ0FMO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25WID0gTGF5YS5TdGFnZS5BTElHTl9CT1RUT007XHJcbiAgICAgICAgLy/lvIDlkK/nu5/orqHkv6Hmga9cclxuICAgICAgICBMYXlhLlN0YXQuc2hvdygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5re75YqgM0TlnLrmma9cclxuICAgICAgICB2YXIgc2NlbmU6IExheWEuU2NlbmUzRCA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU2NlbmUzRCgpKSBhcyBMYXlhLlNjZW5lM0Q7XHJcblxyXG4gICAgICAgIC8v5re75Yqg54Wn55u45py6XHJcbiAgICAgICAgdmFyIGNhbWVyYTogTGF5YS5DYW1lcmEgPSAoc2NlbmUuYWRkQ2hpbGQobmV3IExheWEuQ2FtZXJhKDAsIDAuMSwgMTAwKSkpIGFzIExheWEuQ2FtZXJhO1xyXG4gICAgICAgIGNhbWVyYS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgMCwgMTApKTtcclxuICAgICAgICBjYW1lcmEudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDApLCB0cnVlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbiAgICAgICAgdmFyIGJveDogTGF5YS5NZXNoU3ByaXRlM0QgPSBzY2VuZS5hZGRDaGlsZChuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgxLCAxLCAxKSkpIGFzIExheWEuTWVzaFNwcml0ZTNEO1xyXG4gICAgICAgIGJveC50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgNDUsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuQ2VudGVyID0gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuXHJcbiAgICAgICAgdGhpcy5DZW50ZXIuYWRkQ2hpbGQoYm94KTtcclxuICAgICAgICBzY2VuZS5hZGRDaGlsZCh0aGlzLkNlbnRlcik7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5mcmFtZUxvb3AoMSx0aGlzLHRoaXMub25VcGRhdGUpO1xyXG4gICAgICAgIHZhciBBbm90aGVyOiBMYXlhLk1lc2hTcHJpdGUzRCA9IHNjZW5lLmFkZENoaWxkKG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDEsIDEsIDEpKSkgYXMgTGF5YS5NZXNoU3ByaXRlM0Q7XHJcbiAgICAgICAgQW5vdGhlci50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgNDUsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIGJveC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoLTEsLTEsMCk7XHJcbiAgICAgICAgQW5vdGhlci50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoMSwxLDApO1xyXG4gICAgICAgIHRoaXMuQ2VudGVyLmFkZENoaWxkKEFub3RoZXIpO1xyXG4gICAgICAgIC8vVUlGdW5jLkZpeFVJKG5ld1VJKTtcclxuICAgICAgICB0aGlzLkRpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG5cdG9uVXBkYXRlKCk6dm9pZFxyXG5cdHtcclxuICAgICAgICB0aGlzLkNlbnRlci50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwwLDAuMDEpKTtcclxuXHR9XHJcbn1cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuXHJcblxyXG5cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuKi9cclxuXHJcblxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgTG9hZFNjZW5lIGZyb20gXCIuL1NjZW5lL0xvYWRTY2VuZVwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuL1V0aWxpdHkvUGF0aFwiXHJcbmNsYXNzIEdhbWVcclxue1xyXG5cdF9GcmFtZTpGcmFtZVdvcms7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNzID0gQVBQO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEzRC5pbml0KDAsMCx0cnVlKTtcclxuICAgICAgICBHYW1lQ29uZmlnLmluaXQoKTtcclxuICAgICAgICAvL0xheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GSVhFRF9XSURUSDtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRlVMTDtcclxuICAgICAgICBcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBMYXlhLlN0YWdlLlNDUkVFTl9WRVJUSUNBTDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IExheWEuU3RhZ2UuQUxJR05fQk9UVE9NO1xyXG4gICAgICAgIGlmKExheWEuQnJvd3Nlci5vbkFuZHJvaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLnN0YWdlLmZyYW1lUmF0ZSA9IFwic2xvd1wiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5byA5ZCv57uf6K6h5L+h5oGvXHJcblx0XHRMYXlhLlN0YXQuc2hvdygpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHJlc0NvbCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6XCJ1aS9SZXNvdXJjZS9sb2NhbGNvbXAuYXRsYXNcIix0eXBlOkxheWEuTG9hZGVyLkFUTEFTfV07XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChyZXNDb2wsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRnJhbWUgPSBGcmFtZVdvcmsuRk07XHJcbiAgICAgICAgdGhpcy5fRnJhbWUuQWRkTWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIHZhciBzY2VuZU1ncjpTY2VuZU1hbmFnZXIgPSB0aGlzLl9GcmFtZS5BZGRNYW5hZ2VyPFNjZW5lTWFuYWdlcj4oU2NlbmVNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLl9GcmFtZS5BZGRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuXHRcdHNjZW5lTWdyLkVudGVyU2NlbmUobmV3IExvYWRTY2VuZSgpKTtcclxuICAgICAgICBMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5VcGRhdGUpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKCApXHJcbiAgICB7XHJcbiAgICAgICAgLy90aGlzLlNjZW5lTWdyLlVwZGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuX0ZyYW1lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcbnZhciBHTSA9IG5ldyBHYW1lKCk7XHJcbiIsImltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IExpZmVPYmogZnJvbSBcIi4vLi4vQmFzZS9MaWZlT2JqXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIjtcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEJHIGZyb20gXCIuLy4uL3VpL0JHXCJcclxuXHJcbi8v5a+85ryU5Z+657G7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VEaXJlY3RvciBleHRlbmRzIExpZmVPYmpcclxue1xyXG4gICAgXHJcbiAgICBfTGVhdmUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JnaXN0SURLKE1lc3NhZ2VNRC5HYW1lRXZlbnQuR2FtZVRpbWVVcCk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JnaXN0SURLKE1lc3NhZ2VNRC5HYW1lRXZlbnQuR2FtZUNvbnRpbnVlKTtcclxuICAgICAgICBcclxuICAgICAgICBzdXBlci5fTGVhdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBUaW1lVXAoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fVGltZVVwQ2xvY2s8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0FQUC5NZXNzYWdlQ2VudGVyLlRyaWdnZXIoR2FtZUV2ZW50LkdhbWVUaW1lVXApO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX1RpbWVVcENsb2NrPD0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIENvbnRpbnVlVGltZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL0FQUC5NZXNzYWdlQ2VudGVyLlRyaWdnZXIoR2FtZUV2ZW50LkdhbWVDb250aW51ZSk7XHJcbiAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgKz0gTGF5YS50aW1lci5jdXJyVGltZXIgLSB0aGlzLl9UaW1lVXBDbG9jaztcclxuICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBDdXJHYW1lVGltZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGFydEdhbWVUaW1lICsgdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v56eB5pyJ5bGe5oCn5ZKM5Yqf6IO9XHJcbiAgICBwcml2YXRlIF9TdGFydEdhbWVUaW1lOm51bWJlcjtcclxuICAgIHByaXZhdGUgX1RpbWVVcENvdW50Om51bWJlcjtcclxuICAgIHByaXZhdGUgX1RpbWVVcENsb2NrOm51bWJlcjtcclxuICAgIHByb3RlY3RlZCBfVUlNZ3I6VUlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBfQkc6Qkc7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICB0aGlzLl9VSU1nciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuU2NlbmVNZ3IgPSBBUFAuU2NlbmVNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMuX0JHID0gQVBQLlNjZW5lTWFuYWdlci5CRyBhcyBCRztcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfU3RhcnRDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgdGhpcy5fVUlNZ3IuQ2xlYXIoKTtcclxuICAgICAgICBzdXBlci5fU3RhcnRDb21wbGV0ZSgpO1xyXG4gICAgfVxyXG4gICAgU2NlbmVNZ3I6U2NlbmVNYW5hZ2VyO1xyXG5cclxuICAgIGdldCBHYW1lVGltZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX1RpbWVVcENsb2NrPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fVGltZVVwQ2xvY2stIHRoaXMuX1N0YXJ0R2FtZVRpbWUgLSB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIExheWEudGltZXIuY3VyclRpbWVyLSB0aGlzLl9TdGFydEdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0IEdhbWVUaW1lKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICAvL+WklumDqOaOpeWPo1xyXG4gICAgU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU3RhcnQoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgIHN1cGVyLl9TdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFic3RyYWN0IFJlU3RhcnQoKTp2b2lkO1xyXG59IiwiaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBMaWZlT2JqIGZyb20gXCIuLy4uL0Jhc2UvTGlmZU9ialwiXHJcbmltcG9ydCB7RW51bX0gZnJvbSBcIi4vLi4vQmFzZS9MaWZlT2JqXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuLy/lnLrmma/ln7rnsbtcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZVNjZW5lIGV4dGVuZHMgTGlmZU9ialxyXG57XHJcbiAgICAvL+WklumDqOaOpeWPo1xyXG4gICAgQ3VyRGlyOkJhc2VEaXJlY3RvcjtcclxuICAgIElzTG9hZENvbXBsZXRlOmJvb2xlYW47XHJcbiAgICBTY2VuZTpMYXlhLlNjZW5lM0Q7XHJcbiAgICBJc0xvYWRpbmc6Ym9vbGVhbjtcclxuXHJcbiAgICAvL+e7k+adn+WcuuaZr1xyXG4gICAgTGVhdmUobmV4dFN0YWdlOkJhc2VTY2VuZSk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX05leHRTY2VuZSA9IG5leHRTdGFnZTtcclxuICAgICAgICBuZXh0U3RhZ2UuU3RhcnRMb2FkKCk7XHJcbiAgICAgICAgdGhpcy5fTGVhdmUoKTtcclxuICAgIH1cclxuICAgIFN0YXJ0TG9hZCggKS8vOy8vQ2FsbEJhY2s6KCk9PnZvaWQpOy8vKUNhbGxCYWNrKCk6dm9pZD0+KTtcclxuICAgIHtcclxuICAgICAgICB0aGlzLklzTG9hZGluZyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5byA5aeL5Zy65pmvXHJcbiAgICBTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5Jc0xvYWRDb21wbGV0ZSAmJiAhdGhpcy5Jc0xvYWRpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0TG9hZCgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9Mb2FkQ2FsbEJhY2sgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTG9hZENhbGxCYWNrID0gdGhpcy5fU3RhcnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZighdGhpcy5Jc0xvYWRpbmcpXHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICAvL+aUvuWvueixoVxyXG4gICAgUHV0T2JqKG5vZGU6TGF5YS5TcHJpdGUzRCApOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZihub2RlID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJhc2VTY2VuZSBQdXRPYmogRXJyb3I6ZW1wdHkgU3ByaXRlM0RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICB0aGlzLlNjZW5lLmFkZENoaWxkKG5vZGUpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIHByb3RlY3RlZCBfTmV4dFNjZW5lOkJhc2VTY2VuZTsvL+S4i+S4gOS4quWcuuaZr1xyXG4gICAgcHJvdGVjdGVkIF9Mb2FkQ2FsbEJhY2s6KCk9PnZvaWQ7XHJcbiAgICBwcm90ZWN0ZWQgX1VJTWFuYWdlcjpVSU1hbmFnZXI7XHJcbiAgICBwcm90ZWN0ZWQgX01lc3NhZ2VNZ3I6TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuSXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Jc0xvYWRDb21wbGV0ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5DdXJEaXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuU2NlbmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuX01lc3NhZ2VNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgdGhpcy5fTG9hZENhbGxCYWNrID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9OZXh0U2NlbmUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfTGVhdmluZygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUlNYW5hZ2VyLkNsZWFyKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuQ3VyRGlyLk9ialN0YXRlID09IEVudW0uTGlmZU9ialN0YXRlLkVuZGVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuX0xlYXZlaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfTGVhdmVDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuX0xlYXZlQ29tcGxldGUoKTtcclxuICAgICAgICBpZih0aGlzLlNjZW5lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TY2VuZS5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHdoaWxlKHRoaXMuU2NlbmUubnVtQ2hpbGRyZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBhY3RvciA9IHRoaXMuU2NlbmUuZ2V0Q2hpbGRBdCgwKTtcclxuICAgICAgICAgICAgICAgIGFjdG9yLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSU1hbmFnZXIuQ2xlYXIoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lID0gdGhpcy5fTmV4dFNjZW5lO1xyXG4gICAgICAgIC8vemVyZyDlnLrmma/kuI3nn6XpgZPkvJrkuI3kvJrlhoXlrZjms4TmvI9cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIHRoaXMuQ3VyRGlyIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5DdXJEaXIuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9HZW5EaXIoKTp2b2lkO1xyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX0xvYWRDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICB0aGlzLklzTG9hZENvbXBsZXRlID0gdHJ1ZTtcclxuICAgICAgIHRoaXMuSXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgaWYodGhpcy5fTG9hZENhbGxCYWNrIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTG9hZENhbGxCYWNrKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0xvYWRDYWxsQmFjayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLl9TdGFydCgpO1xyXG4gICAgICAgIGlmKHRoaXMuU2NlbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0aW5nKClcclxuICAgIHtcclxuICAgICAgICAvL+i1hOa6kOmDveayoeS4i+WujOWwseS4jeimgei1sOWFtuWug+mAu+i+keS6hlxyXG4gICAgICAgIGlmKHRoaXMuSXNMb2FkaW5nJiYgdGhpcy5Jc0xvYWRDb21wbGV0ZSApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Mb2FkQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzdXBlci5fU3RhcnRpbmcoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfU3RhcnRDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUlNYW5hZ2VyLkNsZWFyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX0dlbkRpcigpO1xyXG4gICAgICAgIHN1cGVyLl9TdGFydENvbXBsZXRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW5kR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgR2FtZUNhbWVyYSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVDYW1lcmFcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLy4uL0dhbWUvUGxheWVyXCJcclxuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi8uLi91aS9HYW1lVUlcIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuLy4uL0dhbWUvTW91bnRMaW5lXCJcclxuaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vLi4vR2FtZS9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBCR1VJIGZyb20gXCIuLi91aS9CR1wiO1xyXG50eXBlIEl0ZW1MYXlvdXQgPSBJdGVtLkl0ZW1MYXlvdXQ7XHJcbnR5cGUgTGluZUl0ZW1JbmZvID0gSXRlbS5MaW5lSXRlbUluZm87XHJcbnZhciBJdGVtVHlwZSA9IEl0ZW0uSXRlbVR5cGU7XHJcblxyXG4vL+a4uOaIj+WvvOa8lFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lRGlyZWN0b3IgZXh0ZW5kcyBCYXNlRGlyZWN0b3Jcclxue1xyXG4gICAgQ2FtZXJhOkdhbWVDYW1lcmE7XHJcbiAgICBHYW1lU2NlbmU6QmFzZVNjZW5lO1xyXG4gICAgTW91bnRMaW5lczpNb3VudExpbmVbXTtcclxuICAgIFBsYXllcjpQbGF5ZXI7XHJcbiAgICBJbnB1dEN0cmw6SW5wdXQuQmFzZUdhbWVJbnB1dDtcclxuICAgIEl0ZW1MYXlvdXQ6SXRlbUxheW91dDtcclxuICAgIEN1ckxpbmVSZXdhcmRzOkFycmF5PExpbmVJdGVtSW5mbz47XHJcbiAgICBDdXJMaW5lQmFycmllcnM6QXJyYXk8TGluZUl0ZW1JbmZvPjtcclxuICAgIG5hbWU6bnVtYmVyO1xyXG4gICAgRnJlc2hCR0NvdW50Om51bWJlcjtcclxuXHJcbiAgICBnZXQgU2FmZUxvY2F0aW9uKCk6R2FtZVN0cnVjdC5NTG9jYXRpb25cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU2FmZUxvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2FmZUxvY2F0aW9uOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgQWRkSW5wdXRDdHJsZXIodmFsdWU6SW5wdXQuQmFzZUdhbWVJbnB1dClcclxuICAgIHtcclxuICAgICAgICB2YWx1ZS5OZXh0SW5wdXQgPSB0aGlzLklucHV0Q3RybDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgUG9wSW5wdXRDdHJsZXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdGhpcy5JbnB1dEN0cmwuTmV4dElucHV0O1xyXG4gICAgfVxyXG4gICAgQWRkR29sZChudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0dvbGROdW0gKz0gbnVtO1xyXG4gICAgICAgIHRoaXMuQWRkTG9naWNHb2xkKG51bSk7XHJcbiAgICB9XHJcbiAgICBBZGRHb2xkVW5Mb2dpY0dvbGQobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtICs9IG51bTtcclxuICAgIH1cclxuICAgIEFkZExvZ2ljR29sZChudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5BZGRHb2xkKG51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7lronlhajkvY3nva5cclxuICAgIFNldFNhZmVQUyhsb2NhdGlvbjpHYW1lU3RydWN0Lk1Mb2NhdGlvbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TYWZlTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICBpZihsb2NhdGlvbi5ZPHRoaXMuVGFpbEZMb29yLkZsb29yTnVtfHwgbG9jYXRpb24uWT50aGlzLkhlYWRGbG9vci5GbG9vck51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5SZXNldEl0ZW0oIGxvY2F0aW9uLlkgKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5LuO5p+Q5LiA5bGC5byA5aeL5LiA5bGC5bGC6YeN5paw5pGG5pS+6YGT5YW3XHJcbiAgICBSZXNldEl0ZW0oIGZsb29yOm51bWJlciApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIGZvcihsZXQgbG9vcEZsb29yOm51bWJlciA9IGZsb29yIDtsb29wRmxvb3I8PXRoaXMuSGVhZEZsb29yLkZsb29yTnVtOysrbG9vcEZsb29yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGZsb29yTGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGxvb3BGbG9vcik7XHJcbiAgICAgICAgICAgIGZsb29yTGluZS5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmbG9vckxpbmUuU2V0TGluZShmbG9vckxpbmUuRmxvb3JOdW0pO1xyXG4gICAgICAgICAgICB0aGlzLl9QdXRJdGVtSW5MaW5lKGxvb3BGbG9vcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5riF55CG5bGC6YGT5YW3XHJcbiAgICBDbGVhckZsb29yKHN0ZXA6U3RlcCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciBzdGVwSXRlbSA9IHN0ZXAuU3RlcEl0ZW07XHJcbiAgICAgICAgc3RlcC5QdXRJdGVtKEl0ZW1UeXBlLk5vbmUpO1xyXG4gICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBhbmVsVUkoKTpHYW1lVUlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fUGFuZWxVSTtcclxuICAgIH1cclxuICAgIHNldCBQYW5lbFVJKHZhbHVlOkdhbWVVSSlcclxuICAgIHtcclxuICAgICAgICB2YWx1ZS5TZXRMZWZ0VG91Y2godGhpcywoKT0+e3RoaXMuSW5wdXRDdHJsLklucHV0KGZhbHNlKTt9KVxyXG4gICAgICAgIHZhbHVlLlNldFJpZ2h0VG91Y2godGhpcywoKT0+e3RoaXMuSW5wdXRDdHJsLklucHV0KHRydWUpO30pOyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fUGFuZWxVSSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgSGVhZEZsb29yKCk6TW91bnRMaW5lXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTW91bnRMaW5lc1t0aGlzLl9IZWFkRmxvb3JJZHhdO1xyXG4gICAgfVxyXG4gICAgZ2V0IFRhaWxGTG9vcigpOk1vdW50TGluZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbdGhpcy5fVGFpbEZMb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBQbGF5ZXJEaXN0YW5jZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicygodGhpcy5QbGF5ZXIuUG9zaXRpb24ueiAtIHRoaXMuX1N0YXJ0UG9zaXRpb24ueikvKENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZS8yKSk7XHJcbiAgICB9XHJcblxyXG4gICAgRGVhdGgoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHVpOkVuZEdhbWVVSSA9IHRoaXMuX1VJTWdyLlNob3c8RW5kR2FtZVVJPihFbmRHYW1lVUkpO1xyXG4gICAgICAgIC8vdWkuU2V0R2FtZUluZm8odGhpcy5QbGF5ZXJEaXN0YW5jZSx0aGlzLl9Hb2xkTnVtKTtcclxuICAgICAgICB0aGlzLlRpbWVVcCgpO1xyXG4gICAgfVxyXG4gICAgLy/lr7nlpJbmjqXlj6NcclxuICAgIFN0YXJ0KCApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TdGFydCgpO1xyXG4gICAgfVxyXG4gICAgLy/ph43mlrDlvIDlp4tcclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRDb21wbGV0ZSgpO1xyXG4gICAgfVxyXG4gICAgU2hvd0lucHV0SW5mbyhpbmZvOnN0cmluZyk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgfVxyXG4gICAgLy/lt6blj7Pnp7vliqhcclxuICAgIE1vdmVTdGVwKCBpc1JpZ2h0OmJvb2xlYW4gKVxyXG4gICAge1xyXG4gICAgICAgIC8v56e75Yqo5Lit5LiN6K6p6L6T5YWlXHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5UaW1lPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdmFyIGJ1ZmYgPSB0aGlzLkJ1ZmZlcjtcclxuICAgICAgICAvL+iOt+WPluS4i+S4gOWxgueahFN0ZXBcclxuICAgICAgICB2YXIgc3RlcDpTdGVwID0gdGhpcy5QbGF5ZXIuQ3VyU3RlcDtcclxuICAgICAgICBpZihzdGVwID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpc1JpZ2h0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihzdGVwID09IG51bGx8fHN0ZXAuU3RlcEl0ZW0uSXNGb3JiaWRlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICB0aGlzLlBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWxguaVsOiOt+WPluafkOWxglxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIFxyXG4gICAgICovXHJcbiAgICBHZXRGbG9vckJ5Rmxvb3IoZmxvb3I6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0YWlsRmxvb3I6TW91bnRMaW5lID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYoZmxvb3I8IHRhaWxGbG9vci5GbG9vck51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3JJRCA9IChmbG9vciAtIHRhaWxGbG9vci5GbG9vck51bSAgKyB0aGlzLl9UYWlsRkxvb3JJZHgpJXRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTW91bnRMaW5lc1tmbG9vcklEXTtcclxuICAgIH1cclxuXHJcbiAgICBMb29wRG9GbG9vclN0ZXAoIGZsb29yOm51bWJlcixPd25lcjphbnksY2FsbEJhY2s6KHN0ZXA6U3RlcCk9PnZvaWQgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYoZmxvb3I8dGhpcy5UYWlsRkxvb3IuRmxvb3JOdW18fGZsb29yPnRoaXMuSGVhZEZsb29yLkZsb29yTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3JMaW5lOk1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICBmb3IobGV0IGlkeD0wO2lkeDxmbG9vckxpbmUuTG9naWNMZW5ndGg7KytpZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RlcCA9IGZsb29yTGluZS5HZXRTdGVwKGlkeCk7XHJcbiAgICAgICAgICAgIGNhbGxCYWNrLmNhbGwoT3duZXIsc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H5Z2Q5qCH6I635Y+W5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0gbG9jYXRpb24g57Si5byVLOWxguaVsFxyXG4gICAgICovXHJcbiAgICBHZXRTdGVwQnlMb2NhdGlvbihsb2NhdGlvbjpHYW1lU3RydWN0Lk1Mb2NhdGlvbik6U3RlcFxyXG4gICAge1xyXG4gICAgICAgIHZhciBnZXRTdGVwOlN0ZXAgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb2NhdGlvbi5ZKS5HZXRTdGVwKGxvY2F0aW9uLlgpO1xyXG4gICAgICAgIHJldHVybiBnZXRTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBQbGF5ZXJGbG9vciggKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICB2YXIgZmxvb3I6bnVtYmVyID0gdGhpcy5fU3RhcnRQb3NpdGlvbi56IC0gdGhpcy5QbGF5ZXIuTG9naWNQb3NpdGlvbi56O1xyXG4gICAgICAgIGZsb29yID0gTWF0aC5yb3VuZChmbG9vci8oIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZS8yKSk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGZsb29yKTtcclxuICAgIH1cclxuICAgIGdldCBQbGF5ZXJGbG9vckxpbmUoICk6TW91bnRMaW5lXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0Rmxvb3JCeUZsb29yKHRoaXMuUGxheWVyRmxvb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcml2YXRlIF9IZWFkRmxvb3JJZHg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfVGFpbEZMb29ySWR4Om51bWJlcjtcclxuICAgIHByaXZhdGUgX0NvdW50VGltZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Cb290b21GbG9vcjpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9TdGFydFBvc2l0aW9uOkxheWEuVmVjdG9yMztcclxuICAgIHByaXZhdGUgX0dhbWVVcGRhdGU6KCk9PnZvaWQ7XHJcbiAgICBwcml2YXRlIF9QYW5lbFVJOkdhbWVVSTtcclxuICAgIHByaXZhdGUgX0dvbGROdW06bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfTG9naWNHb2xkTnVtOm51bWJlcjtcclxuICAgIHByaXZhdGUgX0N1ckJHOkJHVUk7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gbnVsbDsgIFxyXG4gICAgICAgIHRoaXMuR2FtZVNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLk1vdW50TGluZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID1udWxsO1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gbnVsbDtcclxuICAgICAgICB0aGlzLkl0ZW1MYXlvdXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fSGVhZEZsb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLl9UYWlsRkxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMuX0NvdW50VGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgPTA7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLl9QYW5lbFVJID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9DdXJCRyA9IEFQUC5TY2VuZU1hbmFnZXIuQkcgYXMgQkdVSTtcclxuICAgICAgICB0aGlzLkZyZXNoQkdDb3VudCA9IDA7XHJcbiAgICB9XHJcbiAgICAvL+WIm+W7uuebuOWFs+aUvui/mSDov5nph4zph43mlrDlvIDlp4vkuI3kvJrotbBcclxuICAgIHByb3RlY3RlZCBfU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAvL+WIm+W7uuaWueWQkeWFiVxyXG4gICAgICAgIHZhciBkaXJlY3Rpb25MaWdodCA9IG5ldyBMYXlhLkRpcmVjdGlvbkxpZ2h0KCk7XHJcbiAgICAgICAgdGhpcy5TY2VuZU1nci5DdXJTY2VuZS5QdXRPYmooZGlyZWN0aW9uTGlnaHQpO1xyXG4gICAgICAgIGRpcmVjdGlvbkxpZ2h0LmNvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKTtcclxuICAgICAgICBkaXJlY3Rpb25MaWdodC5kaXJlY3Rpb24gPSBuZXcgTGF5YS5WZWN0b3IzKDEsIC0xLCAwKTtcclxuKi9cclxuICAgICAgICB0aGlzLkNhbWVyYSA9bmV3IEdhbWVDYW1lcmEoKTtcclxuICAgICAgICB0aGlzLkNhbWVyYS50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyID1uZXcgTGF5YS5WZWN0b3IzKC0zMCwwLDApO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMuQ2FtZXJhKTtcclxuXHJcbiAgICAgICAgdGhpcy5Nb3VudExpbmVzID0gW107XHJcbiAgICAgICAgdmFyIG1heExpbmVOdW0gPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5NYXhMaW5lTnVtO1xyXG4gICAgICAgIGZvciggdmFyIGxpbmVJZHg6bnVtYmVyID0gbWF4TGluZU51bS0xO2xpbmVJZHg+PTA7LS1saW5lSWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuZXdNb3VudExpbmUgPSBuZXcgTW91bnRMaW5lKGxpbmVJZHgsbGluZUlkeCk7XHJcbiAgICAgICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKG5ld01vdW50TGluZSk7XHJcbiAgICAgICAgICAgIHRoaXMuTW91bnRMaW5lc1tsaW5lSWR4XSA9IG5ld01vdW50TGluZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/liJvlu7pVSVxyXG4gICAgICAgIHZhciBkaXI6R2FtZURpcmVjdG9yID0gdGhpcztcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgLy/liJvlu7rnjqnlrrZcclxuICAgICAgICB0aGlzLlBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLlBsYXllcik7XHJcblxyXG4gICAgICAgIC8v5YeG5aSH546p5a625q275Lqh5LqL5Lu2XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoLHRoaXMuRGVhdGgsdGhpcyk7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ov5vlhaXmuLjmiI/nmoTorr7nva7mlL7ov5nph4wg6YeN5paw5byA5aeL6LWw6L+Z6YeMXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0Q29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1NhZmVMb2NhdGlvbiA9IG5ldyBHYW1lU3RydWN0Lk1Mb2NhdGlvbigwLDApO1xyXG4gICAgICAgIC8v6YeN572u54mp5ZOBXHJcbiAgICAgICAgdGhpcy5JdGVtTGF5b3V0ID0gbmV3IEl0ZW0uSXRlbUxheW91dCgpXHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHZhciBsaW5lczpNb3VudExpbmVbXSA9IHRoaXMuTW91bnRMaW5lcztcclxuICAgICAgICAvL+WIm+W7uui+k+WFpeaOp+WItuWZqFxyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gbmV3IElucHV0Lk5vcm1HYW1lSW5wdXQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fSGVhZEZsb29ySWR4ID0gbGluZXMubGVuZ3RoIC0xO1xyXG4gICAgICAgIHRoaXMuX1RhaWxGTG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUmVzZXQoKTtcclxuICAgICAgICBmb3IodmFyIGlkeDpudW1iZXIgPSAwO2lkeDxsaW5lcy5sZW5ndGg7KytpZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGluZTpNb3VudExpbmUgPSB0aGlzLk1vdW50TGluZXNbaWR4XTtcclxuICAgICAgICAgICAgbGluZS5TZXRMaW5lKGlkeCk7XHJcbiAgICAgICAgICAgIGlmKGlkeD4wKVxyXG4gICAgICAgICAgICAgICAgbGluZXNbaWR4LTFdLlNldE5leHRGbG9vcihsaW5lKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgUGxheWVyU3RlcCA9IGxpbmUuR2V0U3RlcChNYXRoLmZsb29yKCBsaW5lLkxvZ2ljTGVuZ3RoLzIpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlNldFN0ZXAoUGxheWVyU3RlcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TYWZlTG9jYXRpb24gPSBQbGF5ZXJTdGVwLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU3RhcnRQb3NpdGlvbiA9IHRoaXMuUGxheWVyLkxvZ2ljUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9QdXRJdGVtSW5MaW5lKGlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FtZXJhLlJlc2V0KG5ldyBMYXlhLlZlY3RvcjMoKSxuZXcgTGF5YS5WZWN0b3IzKHRoaXMuUGxheWVyLlBvc2l0aW9uLngsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCAqIDEwLjUsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCAqIDkpLHRoaXMuUGxheWVyKTtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtID0gMDtcclxuICAgICAgICB0aGlzLl9Mb2dpY0dvbGROdW0gPSAwO1xyXG5cclxuICAgICAgICBzdXBlci5fU3RhcnRDb21wbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSSA9IHRoaXMuX1VJTWdyLlNob3coR2FtZVVJKTtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSB0aGlzLkdhbWVUaW1lICs2MDAwO1xyXG4gICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yID0gMDtcclxuICAgICAgICB0aGlzLl9HYW1lVXBkYXRlID0gdGhpcy5fU3RhcnRDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9HYW1lVXBkYXRlIT1udWxsIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0dhbWVVcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mraPluLjov5DooYzml7bnmoTmr4/luKfpgLvovpFcclxuICAgIHByaXZhdGUgX1J1bkdhbWVVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5EaXN0YW5jZSA9IHRoaXMuUGxheWVyRGlzdGFuY2U7XHJcbiAgICAgICAgaWYodGhpcy5GcmVzaEJHQ291bnQgPiAxMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0N1ckJHLlVwZGF0ZVBhZ2UodGhpcy5QbGF5ZXJEaXN0YW5jZSk7XHJcbiAgICAgICAgICAgIHRoaXMuRnJlc2hCR0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgKyt0aGlzLkZyZXNoQkdDb3VudDtcclxuXHJcbiAgICAgICAgdmFyIGZsb29WZWN0b3I6TGF5YS5WZWN0b3IzID0gdGhpcy5UYWlsRkxvb3IuUG9zaXRpb247XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoZmxvb1ZlY3Rvci56IC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24uej4zKkNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZS8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fUHVzaEZMb29yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX0NvdW50VGltZSA8IHRoaXMuR2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSB0aGlzLkdhbWVUaW1lKyAzMDAwO1xyXG4gICAgICAgICAgICB0aGlzLl9EZXN0cm95TGluZSh0aGlzLl9Cb290b21GbG9vcik7XHJcbiAgICAgICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yICs9IDE7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+W8gOWni+WAkuiuoeaXtuacn+mXtOeahOavj+W4p+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBfU3RhcnRDb3VudCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRpbWU6c3RyaW5nID1cIlwiXHJcbiAgICAgICAgdmFyIGNvdW50VGltZTpudW1iZXIgPSB0aGlzLl9Db3VudFRpbWUgLSB0aGlzLkdhbWVUaW1lO1xyXG4gICAgICAgIGlmKGNvdW50VGltZT4wKVxyXG4gICAgICAgICAgICB0aW1lKz0gTWF0aC5mbG9vciggY291bnRUaW1lLzEwMDApO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0dhbWVVcGRhdGUgPSB0aGlzLl9SdW5HYW1lVXBkYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSB0aGlzLkdhbWVUaW1lICsgMzAwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlNldENvdW50VGltZSh0aW1lKTtcclxuICAgIH1cclxuICAgICBcclxuICAgIC8v5bCG5bGC5ZCR5LiK5Y+gXHJcbiAgICBwcm90ZWN0ZWQgX1B1c2hGTG9vcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHByZUhlYWQ6TW91bnRMaW5lID0gdGhpcy5IZWFkRmxvb3I7XHJcbiAgICAgICAgdGhpcy5fSGVhZEZsb29ySWR4ID0odGhpcy5fSGVhZEZsb29ySWR4KzEpJXRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gKHRoaXMuX1RhaWxGTG9vcklkeCArMSkldGhpcy5Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICB2YXIgSGVhZGZsb29yOm51bWJlciA9IHByZUhlYWQuRmxvb3JOdW0gKyAxO1xyXG4gICAgICAgIHRoaXMuSGVhZEZsb29yLlNldExpbmUoSGVhZGZsb29yKTtcclxuICAgICAgICBwcmVIZWFkLlNldE5leHRGbG9vcih0aGlzLkhlYWRGbG9vcik7XHJcbiAgICAgICAgY29uc29sZS50aW1lKFwiUHV0SXRlbVwiKTtcclxuICAgICAgICB0aGlzLl9QdXRJdGVtSW5MaW5lKEhlYWRmbG9vcik7ICAgXHJcbiAgICAgICAgY29uc29sZS50aW1lRW5kKFwiUHV0SXRlbVwiKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRhuaUvueJqeWTgVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIOeJqeWTgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgX1B1dEl0ZW1JbkxpbmUoZmxvb3I6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzYWZlQ29sIDp7W2tleTpzdHJpbmddIDpBcnJheTxudW1iZXI+O30gPSB7fTtcclxuICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIC8v5biD572u6L+H5LqG5LiN55So5YaN5biD572u5LqGXHJcbiAgICAgICAgaWYoZmxvb3JMaW5lLkxheU91dERpcnR5KVxyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIGZsb29yTGluZS5MYXlPdXREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgLypcclxuICAgICAgICBpZihmbG9vciA+PSB0aGlzLl9TYWZlTG9jYXRpb24uWSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLk1heExpbmVOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzYWZlQ29sID0gdGhpcy5fQ291bnRPcGVuTGlzdChmbG9vcik7XHJcbiAgICAgICAgfWVsc2UqL1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mkYbmlL7liY3lhYjorqHnrpfor6XlsYLpgJrot6/mg4XlhrUgXHJcbiAgICAgICAgICAgIHNhZmVDb2wgPSB7fVxyXG4gICAgICAgICAgICBzYWZlQ29sW1wib1wiXSA9IHRoaXMuX0NvdW50Um9hZEluZm8oZmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WHuueUn+eCueS4jeaUvumBk+WFt1xyXG4gICAgICAgIGlmKGZsb29yIDwxIHx8Zmxvb3IgPT0gdGhpcy5TYWZlTG9jYXRpb24uWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ojrflj5bor6XooYzopoHmkYbmlL7nmoTnianlk4FcclxuICAgICAgICB0aGlzLl9UYWtlSXRlbUxpc3QoZmxvb3IpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/moIforrDkuIDmnaHnu53lr7nlronlhajnmoTot69cclxuICAgICAgICB2YXIgc2FmZUlkeENvbGw6eyBba2V5OiBzdHJpbmddOiBudW1iZXI7IH0gPXt9O1xyXG4gICAgICAgIGZvcih2YXIgY29sS2V5IGluIHNhZmVDb2wpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHNhZmVDb2xbY29sS2V5XTtcclxuICAgICAgICAgICAgdmFyIHNhZmVJZHggPSBsaXN0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpsaXN0Lmxlbmd0aCldO1xyXG4gICAgICAgICAgICBpZihzYWZlSWR4Q29sbFtzYWZlSWR4XT09dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzYWZlSWR4Q29sbFtzYWZlSWR4XSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/miorpnIDopoHmlL7pgZPlhbfnmoTmoLzlrZDmlL7lhaXpmo/mnLrmsaBcclxuICAgICAgICB2YXIgY3VyRmxvb3I6TW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciByYW5kb21Qb29sOkFycmF5PFN0ZXA+ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgLy/miorlronlhajnmoTmoLzlrZDmmoLml7bnp7vlh7rmnaVcclxuICAgICAgICB2YXIgc2FmZVN0ZXBMaXN0OkFycmF5PFN0ZXA+ID0gbmV3IEFycmF5PFN0ZXA+KCk7XHJcbiAgICAgICAgZm9yKCB2YXIgc3RlcElkeDpudW1iZXIgPSAwOyBzdGVwSWR4IDwgY3VyRmxvb3IuTG9naWNMZW5ndGg7KytzdGVwSWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRTdGVwOlN0ZXAgPSBjdXJGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZihzYWZlSWR4Q29sbFtzdGVwSWR4XT09dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnB1c2goZ2V0U3RlcCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGdldFN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pS+6Zm36ZixXHJcbiAgICAgICAgdmFyIGJhcnJpZXJzTGlzdDpBcnJheTxMaW5lSXRlbUluZm8+ID0gdGhpcy5DdXJMaW5lQmFycmllcnM7XHJcbiAgICAgICAgdGhpcy5fT3JnaW5pemVQdXRJdGVtKGJhcnJpZXJzTGlzdCxyYW5kb21Qb29sLHRydWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5pGG5pS+6YGT5YW3XHJcbiAgICAgICAgZm9yKHZhciBzYWZlU3RlcElkeDpudW1iZXIgPSAwO3NhZmVJZHg8c2FmZVN0ZXBMaXN0Lmxlbmd0aDsrK3NhZmVJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByYW5kb21Qb29sLnB1c2goc2FmZVN0ZXBMaXN0W3NhZmVJZHhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJld2FyZExpc3QgPSB0aGlzLkN1ckxpbmVSZXdhcmRzO1xyXG4gICAgICAgIHRoaXMuX09yZ2luaXplUHV0SXRlbShyZXdhcmRMaXN0LHJhbmRvbVBvb2wpO1xyXG4gICAgICAgIC8v5YaN5qyh6K6h566X6YCa6Lev5oOF5Ya1IFxyXG4gICAgICAgIC8vdGhpcy5fQ291bnRMYXN0Rmxvb3JSb2FkKGZsb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRhuaUvueJqeWTgVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxMaW5lSXRlbUluZm8+fSBpdGVtTGlzdCDnianlk4HliJfooahcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U3RlcD59IHJhbmRvbVBvb2wg5Y+w6Zi26ZuG5ZCIXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRGVhZFJvYWQg5piv5ZCm5piv5q276LevXHJcbiAgICAgKi9cclxuICAgIF9Pcmdpbml6ZVB1dEl0ZW0oaXRlbUxpc3Q6QXJyYXk8TGluZUl0ZW1JbmZvPixyYW5kb21Qb29sOkFycmF5PFN0ZXA+LGlzRGVhZFJvYWQ6Ym9vbGVhbiA9IG51bGwpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBmb3IodmFyIGl0ZW1JZHg6bnVtYmVyID0gMDtpdGVtSWR4IDwgaXRlbUxpc3QubGVuZ3RoOysraXRlbUlkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOkxpbmVJdGVtSW5mbyA9IGl0ZW1MaXN0W2l0ZW1JZHhdO1xyXG4gICAgICAgICAgICBmb3IodmFyIGRpZmZpY3VsdHlOdW06bnVtYmVyID0gMDsgZGlmZmljdWx0eU51bTxpbmZvLk51bWJlcjspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHJhbmRvbVBvb2wubGVuZ3RoPDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+maj+acuuaKiumanOeijeaUvuWFpeagvOWtkOmHjFxyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbUlkeDpudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcmFuZG9tUG9vbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IHJhbmRvbVBvb2xbcmFuZG9tSWR4XTtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBvb2wuc3BsaWNlKHJhbmRvbUlkeCwxKTtcclxuICAgICAgICAgICAgICAgIHN0ZXAuUHV0SXRlbShpbmZvLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYoaXNEZWFkUm9hZCAhPW51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gaXNEZWFkUm9hZDtcclxuICAgICAgICAgICAgICAgIC0taW5mby5OdW1iZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYocmFuZG9tUG9vbC5sZW5ndGg8MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXRlbUlkeD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXRlbUxpc3Quc3BsaWNlKDAsaXRlbUlkeCk7ICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAq6YCS5b2S6K6h566X6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3JOdW0g54mp5ZOB5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIF9Db3VudE9wZW5MaXN0KGZsb29yTnVtOm51bWJlcik6e1trZXk6c3RyaW5nXSA6QXJyYXk8bnVtYmVyPjt9XHJcbiAgICB7XHJcbiAgICAgICAgZm9yKHZhciBmbG9vckNvdW50Om51bWJlciA9IHRoaXMuUGxheWVyRmxvb3I7IGZsb29yQ291bnQ8PWZsb29yTnVtOysrZmxvb3JDb3VudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmbG9vcjpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vckNvdW50KTtcclxuICAgICAgICAgICAgaWYoZmxvb3IgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgZm9yKHZhciBzdGVwSWR4ID0gMDtzdGVwSWR4PGZsb29yLkxvZ2ljTGVuZ3RoOysrc3RlcElkeClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICAgICAgc3RlcC5NYXJrID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vcjpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLlBsYXllckZsb29yKTtcclxuICAgICAgICBmb3IodmFyIHN0ZXBJZHggPSAwO3N0ZXBJZHg8Zmxvb3IuTG9naWNMZW5ndGg7KytzdGVwSWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZighc3RlcC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9NYXJrU3RlcHMoc3RlcCxzdGVwSWR4LGZsb29yTnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGFyZ2V0Rmxvb3I6TW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JOdW0pO1xyXG4gICAgICAgIC8v5om+5Ye66KKr5qCH6K6w55qE54K55bm25pW055CG5oiQ6ZuG5ZCIXHJcbiAgICAgICAgdmFyIGNvbGxlY3Rpb246e1trZXk6c3RyaW5nXSA6QXJyYXk8bnVtYmVyPjt9ID0ge31cclxuICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBcIm9cIlxyXG4gICAgICAgIGZvcih2YXIgb3BlbklkeDpudW1iZXIgPSAwO29wZW5JZHg8dGFyZ2V0Rmxvb3IuTG9naWNMZW5ndGg7ICsrb3BlbklkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbWFya2VkU3RlcDpTdGVwID0gdGFyZ2V0Rmxvb3IuR2V0U3RlcChvcGVuSWR4KTtcclxuICAgICAgICAgICAgaWYobWFya2VkU3RlcC5NYXJrIT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBOYW1lOnN0cmluZyA9IG5hbWUgKyBtYXJrZWRTdGVwLk1hcms7XHJcbiAgICAgICAgICAgICAgICBpZihjb2xsZWN0aW9uW05hbWVdID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uW05hbWVdID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbltOYW1lXS5wdXNoKG9wZW5JZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKumAkuW9kuagh+iusOmAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtTdGVwfSBzdGVwIOWPsOmYtlxyXG4gICAgICogQHBhcmFtIHthbnl9IG1hcmsg5qCH6K6wXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0Rmxvb3JOdW0g55uu5qCH5bGC5pWwXHJcbiAgICAgKi9cclxuICAgIF9NYXJrU3RlcHMoc3RlcDpTdGVwLG1hcms6YW55LHRhcmdldEZsb29yTnVtOm51bWJlcik6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIGlmKHN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmKHN0ZXAuRmxvb3IuRmxvb3JOdW0+PXRhcmdldEZsb29yTnVtIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHN0ZXAuTWFyayA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0ZXAuTWFyayA9IG1hcmtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlZnRPcGVuOmJvb2xlYW47XHJcbiAgICAgICAgdmFyIHJpZ2h0T3Blbjpib29sZWFuO1xyXG4gICAgICAgIHZhciBsZWZ0UGFyZW50OlN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgaWYobGVmdFBhcmVudCAhPSBudWxsICYmICFsZWZ0UGFyZW50LklzRGVhZFJvYWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihsZWZ0UGFyZW50Lk1hcms9PXVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGxlZnRPcGVuID0gdGhpcy5fTWFya1N0ZXBzKGxlZnRQYXJlbnQsbWFyayx0YXJnZXRGbG9vck51bSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGxlZnRPcGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJpZ2h0UGFyZW50OlN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgIGlmKHJpZ2h0UGFyZW50ICE9IG51bGwgJiYgIXJpZ2h0UGFyZW50LklzRGVhZFJvYWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihyaWdodFBhcmVudC5NYXJrPT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICByaWdodE9wZW4gPSB0aGlzLl9NYXJrU3RlcHMocmlnaHRQYXJlbnQsbWFyayx0YXJnZXRGbG9vck51bSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJpZ2h0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHN0ZXAuTWFyayA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGVwLk1hcmsgPSBtYXJrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCFsZWZ0T3BlbiYmIXJpZ2h0T3BlbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOacgOWQjuWGjeiuoeeul+S4gOasoeivpeWxgumAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yTnVtIFxyXG4gICAgICovXHJcbiAgICBfQ291bnRMYXN0Rmxvb3JSb2FkKGZsb29yTnVtOm51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKGZsb29yTnVtIDwgdGhpcy5UYWlsRkxvb3IuRmxvb3JOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vciA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yTnVtKTtcclxuICAgICAgICB2YXIgbGFzdEZsb29yID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JOdW0gLTEgKTtcclxuICAgICAgICBmb3IodmFyIHN0ZXBJZHggPTA7c3RlcElkeDxmbG9vci5Mb2dpY0xlbmd0aDsrK3N0ZXBJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYoIXN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIExlZnRTdGVwID0gc3RlcC5MZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgUmlnaHRTdGVwID0gc3RlcC5SaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgICAgaWYoTGVmdFN0ZXAhPW51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIUxlZnRTdGVwLklzRGVhZFJvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK0xlZnRTdGVwLlJvYWROdW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoUmlnaHRTdGVwIT1udWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFSaWdodFN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrUmlnaHRTdGVwLlJvYWROdW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgbGFzdFN0ZXBJZHggPSAwO2xhc3RTdGVwSWR4PCBsYXN0Rmxvb3IuTG9naWNMZW5ndGg7KytsYXN0U3RlcElkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwID0gbGFzdEZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgIGlmKCFzdGVwLklzRGVhZFJvYWQmJnN0ZXAuUm9hZE51bTwxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAvL+WQkeS4iumAkuW9kuaKiuaJgOacieS4juS5i+ebuOi/nueahOiKgueCueaVsOe7meS/ruato+S6hlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS+6YGT5YW35YmN566X6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIF9Db3VudFJvYWRJbmZvKGZsb29yOm51bWJlcik6QXJyYXk8bnVtYmVyPlxyXG4gICAge1xyXG4gICAgICAgIHZhciBzYWZlU3RlcExpc3Q6QXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIHZhciB0aGlzRmxvb3I6TW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciByb2FkTnVtOm51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGxhc3RGbG9vcjpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vciAtMSk7XHJcbiAgICAgICAgaWYoZmxvb3IgPT0gdGhpcy5fU2FmZUxvY2F0aW9uLlkpXHJcbiAgICAgICAgICAgIHRoaXMuX1Jlc2V0U3RlcEluZm8odGhpc0Zsb29yKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IodmFyIGxvZ2ljSWR4Om51bWJlciA9IDA7IGxvZ2ljSWR4PHRoaXNGbG9vci5Mb2dpY0xlbmd0aDsrK2xvZ2ljSWR4KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gdGhpc0Zsb29yLkdldFN0ZXAobG9naWNJZHgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRDaGlsZDpTdGVwID0gc3RlcC5MZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRDaGlsZDpTdGVwID0gc3RlcC5SaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgICAgaWYobGVmdENoaWxkIT0gbnVsbCAmJiAhbGVmdENoaWxkLklzRGVhZFJvYWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZVN0ZXBMaXN0LnB1c2gobG9naWNJZHgpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYocmlnaHRDaGlsZCE9IG51bGwgJiYgIXJpZ2h0Q2hpbGQuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGZsb29yID09IHRoaXMuX1NhZmVMb2NhdGlvbi5ZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHNhZmVTdGVwID0gdGhpc0Zsb29yLkdldFN0ZXAodGhpcy5fU2FmZUxvY2F0aW9uLlgpO1xyXG4gICAgICAgICAgICBzYWZlU3RlcC5Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKHRoaXMuX1NhZmVMb2NhdGlvbi5YKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzYWZlU3RlcExpc3Q7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9SZXNldFN0ZXBJbmZvKHRoaXNGbG9vcjpNb3VudExpbmUpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXNGbG9vcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBsb2dpY0lkeDpudW1iZXIgPSAwOyBsb2dpY0lkeDx0aGlzRmxvb3IuTG9naWNMZW5ndGg7Kytsb2dpY0lkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5p+Q6YGT5YW35L+h5oGvXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX1Rha2VJdGVtTGlzdChmbG9vcjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgdmFyIGl0ZW1MaXN0ID0gbmV3IEFycmF5KGxpbmUuTG9naWNMZW5ndGgpO1xyXG4gICAgICAgIHZhciBsaW5lUmV3YXJkcyA9IHRoaXMuSXRlbUxheW91dC5UYWtlTGluZVJld2FyZChmbG9vcik7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IHRoaXMuQ3VyTGluZVJld2FyZHMuY29uY2F0KGxpbmVSZXdhcmRzKTtcclxuICAgICAgICBpZih0aGlzLlNhZmVMb2NhdGlvbi5ZID5mbG9vciB8fCBmbG9vcj50aGlzLlNhZmVMb2NhdGlvbi5ZKzEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGluZUJhcnJpZXJzID0gdGhpcy5JdGVtTGF5b3V0LlRha2VMaW5lRGlmZmljdWx0eShmbG9vcik7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gdGhpcy5DdXJMaW5lQmFycmllcnMuY29uY2F0KGxpbmVCYXJyaWVycyk7ICAgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLkN1ckxpbmVCYXJyaWVycy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5aGM6Zm35p+Q5LiA5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX0Rlc3Ryb3lMaW5lKGZsb29yOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYoZmxvb3IgPHRhaWxGbG9vci5GbG9vck51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKHZhciBjb3VudEZsb29yOm51bWJlciA9IHRhaWxGbG9vci5GbG9vck51bTtjb3VudEZsb29yPD0gZmxvb3I7Kytjb3VudEZsb29yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldEZsb29yOk1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGNvdW50Rmxvb3IpO1xyXG4gICAgICAgICAgICB0YXJnZXRGbG9vci5CcmVhaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBsYXllci5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qXHJcbuS9nOiAhTpNb1xyXG7ot7PlsbHnvorlnLrmma/moLjlv4Plip/og71cclxuKi9cclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEVudGVyR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VudGVyR2FtZVVJXCJcclxuaW1wb3J0IEVuZEdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbmRHYW1lVUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBHYW1lQ2FtZXJhIGZyb20gXCIuLy4uL0dhbWUvR2FtZUNhbWVyYVwiXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vLi4vR2FtZS9QbGF5ZXJcIlxyXG5pbXBvcnQge0lucHV0fSBmcm9tIFwiLi8uLi9HYW1lL0lucHV0XCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vLi4vR2FtZS9Nb3VudExpbmVcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbnR5cGUgSXRlbUxheW91dCA9IEl0ZW0uSXRlbUxheW91dDtcclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuLy/muLjmiI/lnLrmma9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgQmFzZVNjZW5lXHJcbntcclxuICAgIE1vZGVsTG9hZDpib29sZWFuO1xyXG4gICAgR2FtZURpcjpHYW1lRGlyZWN0b3I7XHJcbiAgICAvL+WvueWkluaOpeWPo1xyXG4gICAgU3RhcnRMb2FkKClcclxuICAgIHtcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKFtwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVcIikscGF0aC5HZXREZXBhdGhVSUpTKFwiRW5kR2FtZVwiKV0sTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX0xvYWRDb21wbGV0ZSkpO1xyXG4gICAgICAgIHN1cGVyLlN0YXJ0TG9hZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9TdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5fU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5fVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9HZW5EaXIoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HYW1lRGlyID0gbmV3IEdhbWVEaXJlY3RvcigpO1xyXG4gICAgICAgIHRoaXMuQ3VyRGlyID0gdGhpcy5HYW1lRGlyO1xyXG5cclxuICAgIH1cclxuICAgIC8v56a75byA5pe26L+b6KGM6YWN572uXHJcbiAgICBwcm90ZWN0ZWQgX0xlYXZlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX01lc3NhZ2VNZ3IuRGVzUmdpc3RJREsoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgc3VwZXIuX0xlYXZlKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX0xvYWRDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TY2VuZSA9IG5ldyBMYXlhLlNjZW5lM0QoKTtcclxuICAgICAgICB0aGlzLlNjZW5lLmFtYmllbnRDb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwxLDEpXHJcbiAgICAgICAgc3VwZXIuX0xvYWRDb21wbGV0ZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1aWRlck1hbmFnZXIgXHJcbntcclxuLy/lr7nlpJbmjqXlj6NcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6R3VpZGVyTWFuYWdlcjtcclxuICAgIHN0YXRpYyBnZXQgTWdyKCk6R3VpZGVyTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEd1aWRlck1hbmFnZXIuX01nciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR3VpZGVyTWFuYWdlci5fTWdyID0gbmV3IEd1aWRlck1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEd1aWRlck1hbmFnZXIuX01ncjtcclxuICAgIH1cclxuICAgIFNjZW5lTWdyOlNjZW5lTWFuYWdlcjtcclxuICAgIEN1clNjZW5lOkd1aWRlclNjZW5lO1xyXG4gICAgZ2V0IEdhbWVEaXIoKTpHdWlkZXJEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clNjZW5lLkd1aWREaXI7XHJcbiAgICB9XHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr+i1sOi/meS4quaOpeWPo1xyXG4gICAgRW50ZXJTY2VuZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3R2FtZVNjZW5lID0gbmV3IEd1aWRlclNjZW5lKCk7XHJcbiAgICAgICAgdGhpcy5TY2VuZU1nci5FbnRlclNjZW5lKG5ld0dhbWVTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG5ld0dhbWVTY2VuZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU2NlbmVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFNjZW5lTWFuYWdlcj4oU2NlbmVNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyU2NlbmUgZXh0ZW5kcyBCYXNlU2NlbmVcclxue1xyXG4gICAgR3VpZERpcjpHdWlkZXJEaXJlY3RvcjtcclxuICAgIEN1ckRpcjpCYXNlRGlyZWN0b3I7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFN0YXJ0TG9hZCggKVxyXG4gICAge1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQoW3t1cmw6cGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIikgLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSAsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOnBhdGguR2V0QXRsUGF0aChcImNvbXBcIiksdHlwZTogTGF5YS5Mb2FkZXIuQVRMQVMgfV0sTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX0xvYWRDb21wbGV0ZSkpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9HZW5EaXIoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HdWlkRGlyID0gbmV3IEd1aWRlckRpcmVjdG9yKCk7XHJcbiAgICAgICAgdGhpcy5DdXJEaXIgPSB0aGlzLkd1aWREaXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlckRpcmVjdG9yIGV4dGVuZHMgQmFzZURpcmVjdG9yXHJcbntcclxuICAgIFVJOkVudGVyR2FtZVVJO1xyXG4gICAgUmVTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciggKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9TdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5fU3RhcnQoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfU3RhcnRDb21wbGV0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5fU3RhcnRDb21wbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuVUkgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKS5TaG93PEVudGVyR2FtZVVJPihFbnRlckdhbWVVSSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi8uLi91aS9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgTG9hZGluZ1VJIGZyb20gXCIuLy4uL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJXCJcclxuaW1wb3J0IEZNV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4vR3VpZGVyTWFuYWdlclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEJHIGZyb20gXCIuLy4uL3VpL0JHXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRTY2VuZSBleHRlbmRzIEJhc2VTY2VuZVxyXG57XHJcbiAgICBDdXJEaXI6QmFzZURpcmVjdG9yO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9HZW5EaXIoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJEaXIgPSBuZXcgTG9hZERpcmN0b3IoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgU3RhcnRMb2FkKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciByZXNDb2wgPSBbe3VybDpcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOlwidWkvUmVzb3VyY2UvbG9jYWxjb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU31dO1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQocmVzQ29sLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9Mb2FkQ29tcGxldGUpKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5jbGFzcyBMb2FkRGlyY3RvciBleHRlbmRzIEJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBVSTpMb2FkaW5nVUk7XHJcbiAgICBcclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICB9XHJcblxyXG4gICAgX0NvdW50MkRMb2FkOm51bWJlcjtcclxuICAgIF9Db3VudDNETG9hZDpudW1iZXI7XHJcbiAgICBfTG9hZEZhaWxlOmJvb2xlYW47XHJcbiAgICBfQ291bnRWYWx1ZTpudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9Db3VudDNETG9hZCA9IDAuNTtcclxuICAgICAgICB0aGlzLl9Db3VudDJETG9hZCA9IDAuNTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbihMYXlhLkV2ZW50LkVSUk9SLHRoaXMsdGhpcy5fb25FcnJvcik7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub24oTGF5YS5FdmVudC5DT01QTEVURSx0aGlzLHRoaXMuX29uQ29tcGxldGUpO1xyXG4gICAgICAgIHRoaXMuTG9hZCgpO1xyXG4gICAgICAgIHN1cGVyLl9TdGFydCgpO1xyXG4gICAgICAgIHRoaXMuX0xvYWRGYWlsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfU3RhcnRDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgICAgICB0aGlzLlVJID0gQVBQLlVJTWFuYWdlci5TaG93PExvYWRpbmdVST4oTG9hZGluZ1VJKTtcclxuICAgICAgICB0aGlzLlVJLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIExvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0NvdW50MkRMb2FkID0wO1xyXG4gICAgICAgIHRoaXMuX0NvdW50M0RMb2FkID0wO1xyXG4gICAgICAgIHRoaXMuX0NvdW50VmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX0xvYWRGYWlsZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTJEQXJyID0gW1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICB7dXJsOlwicmVzL3VpanNvbi9QbGF5ZXJMaXN0Lmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LFxyXG4gICAgICAgICAgICB7dXJsOlwicmVzL3VpanNvbi9DaGFyYWN0ZXJzLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LFxyXG4gICAgICAgICAgICB7dXJsOlwicmVzL3VpanNvbi9TZXRQYW5lbC5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfSxcclxuICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIC8vcmVzb3VyY2UyREFyciA9IG51bGw7XHJcbiAgICAgICAgLypcclxuICAgICAgICB2YXIgcmVzb3VyY2UzREFyciA9IFtcImh0dHA6Ly93d3cuZ3NqZ2FtZS5jb20vUmVzb3VyY2UvTGF5YVNjZW5lX0wwMV9zcHJfcGxhdF8wMS9MMDFfc3ByX3BsYXRfMDEubGhcIixcclxuICAgICAgICBcImh0dHA6Ly93d3cuZ3NqZ2FtZS5jb20vUmVzb3VyY2UvTGF5YVNjZW5lX0wwMV9zcHJfcGxhdF8wMi9MMDFfc3ByX3BsYXRfMDIubGhcIixcclxuICAgICAgICBcImh0dHA6Ly93d3cuZ3NqZ2FtZS5jb20vUmVzb3VyY2UvTGF5YVNjZW5lX0wwMV9zcHJfcGxhdF8wMy9MMDFfc3ByX3BsYXRfMDMubGhcIixcclxuICAgICAgICBcImh0dHA6Ly93d3cuZ3NqZ2FtZS5jb20vUmVzb3VyY2UvTGF5YVNjZW5lX0wwMV9zcHJfYmFycmllcl8wMS9MMDFfc3ByX2JhcnJpZXJfMDEubGhcIixcclxuICAgICAgICBcImh0dHA6Ly93d3cuZ3NqZ2FtZS5jb20vUmVzb3VyY2UvTGF5YVNjZW5lX0wwMV9zcHJfYmFycmllcl8wMi9MMDFfc3ByX2JhcnJpZXJfMDIubGhcIixcclxuICAgICAgICBcImh0dHA6Ly93d3cuZ3NqZ2FtZS5jb20vUmVzb3VyY2UvTGF5YVNjZW5lX0wwMV9zcHJfYmFycmllcl8wMy9MMDFfc3ByX2JhcnJpZXJfMDMubGhcIixcclxuICAgICAgICBcImh0dHA6Ly93d3cuZ3NqZ2FtZS5jb20vUmVzb3VyY2UvTGF5YVNjZW5lX2NoaWxkXzAxL2NoaWxkXzAxLmxoXCJdKi9cclxuICAgICAgICBMYXlhLmxvYWRlci5vbihMYXlhLkV2ZW50LkVSUk9SLHRoaXMsdGhpcy5fb25FcnJvcik7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub24oTGF5YS5FdmVudC5DT01QTEVURSx0aGlzLHRoaXMuX29uQ29tcGxldGUpO1xyXG4gICAgICAgIC8vdmFyIHJlc291cmNlM0RBcnIgPSBbXCJDOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvUmVzb3VyY2UvTGF5YVNjZW5lX0wwMV9hdXRfYmFycmllcl8wMi9MYXlhU2NlbmVfTDAxX2F1dF9iYXJyaWVyXzAyL0NvbnZlbnRpb25hbC9MMDFfYXV0X2JhcnJpZXJfMDIubGhcIl07XHJcbiAgICAgICAgdmFyIHJlc291cmNlM0RBcnIgPSBbIFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV9jaGlsZF8wMVwiKSAsXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDRcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2ZseWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfc3RpbmdfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2Fic29yZFwiKSxcclxuICAgICAgICAvL3BhdGguR2V0U2t5Qm94KFwic2t5Q3ViZVwiKVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgcGF0aC5SZXNvdXJjZVBhdGggK1wiTGF5YVNjZW5lX0wwMV9zcHJfcGxhdF8wMy9Db252ZW50aW9uYWwvTDAxX3Nwcl9wbGF0XzAzLmxoXCIsXHJcbiAgICAgICAgKi9cclxuICAgICAgICBdLy8gXCJDOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvUmVzb3VyY2UvTGF5YVNjZW5lX0wwMV9hdXRfYmFycmllcl8wMi9MYXlhU2NlbmVfTDAxX2F1dF9iYXJyaWVyXzAyL0NvbnZlbnRpb25hbC9MMDFfYXV0X2JhcnJpZXJfMDIubGhcIl07XHJcbiAgICAgICAgdGhpcy5fTG9hZChyZXNvdXJjZTJEQXJyLHJlc291cmNlM0RBcnIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX0xvYWQoYXJyMkQ6QXJyYXk8YW55PiA9IG51bGwsYXJyM0Q6QXJyYXk8YW55Pj1udWxsKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGFycjJEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAvLyBMYXlhLmxvYWRlci5sb2FkKGFycjJELExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9vbkxvYWRlZCksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX29uMkRQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQoYXJyMkQsbnVsbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fb24yRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICB0aGlzLl9Db3VudFZhbHVlKz0wLjU7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50MkRMb2FkID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXJyM0QhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jcmVhdGUoYXJyM0QsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLG51bGwpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9vbjNEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy5fQ291bnRWYWx1ZSs9MC41O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudDNETG9hZCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9vbkVycm9yKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTG9hZEZhaWxlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiTG9hZEVycm9yOlwiK3N0cik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9vbjNEUHJvZ3Jlc3ModmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQ291bnQzRExvYWQgPXZhbHVlLzI7XHJcbiAgICAgICAgdGhpcy5VSS5WYWx1ZSA9ICh0aGlzLl9Db3VudDJETG9hZCArIHRoaXMuX0NvdW50M0RMb2FkKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfb24yRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0NvdW50MkRMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMuVUkuVmFsdWUgPSB0aGlzLl9Db3VudDJETG9hZCArIHRoaXMuX0NvdW50M0RMb2FkO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9vbkNvbXBsZXRlKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoaURpciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuUmVsb2FkKGZ1bmN0aW9uKCk6dm9pZHt0aGlEaXIuTG9hZCgpfSApO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkJHID0gbmV3IEJHKCk7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuQ29tcGxldGUoKCk9PntHdWlkZXJNYW5hZ2VyLk1nci5FbnRlclNjZW5lKCl9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgIHRoaXMuVUkuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIHBhdGhcclxue1xyXG4gICAgZXhwb3J0IHZhciBJc0VkaXRvcjpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgZXhwb3J0IHZhciBTY2VuZUFzc2V0UGF0aDpzdHJpbmcgPSBcIkxheWFTY2VuZV9cIjtcclxuICAgIGV4cG9ydCB2YXIgUmVzb3VyY2VQYXRoOnN0cmluZyA9IElzRWRpdG9yP1wiRDovR0l0L1Jlc291cmNlcy9MYXlhUHJvamVjdC9GcmVzaFByb2plY3QvbXlMYXlhL05ldFJlc291cmNlL1wiOlwiaHR0cDovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9OZXRSZXNvdXJjZS9cIjtcclxuICAgIGV4cG9ydCB2YXIgVUlQYXRoOnN0cmluZyA9IFJlc291cmNlUGF0aCArIFwiVUkvXCI7XHJcbiAgICBleHBvcnQgdmFyIE1vZGVsUGF0aDpzdHJpbmcgPSBSZXNvdXJjZVBhdGgrXCIzRC9cIlxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlkF0bOaWh+S7tui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0QXRsUGF0aChmaWxlTmFtZTpzdHJpbmcpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBVSVBhdGggKyBmaWxlTmFtZStcIi5hdGxhc1wiO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZVSUpzb27ot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldERlcGF0aFVJSlMoZmlsZU5hbWU6c3RyaW5nKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIFVJUGF0aCtmaWxlTmFtZStcIi5qc29uXCI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlmxo5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRMSChmaWxlTmFtZTpzdHJpbmcpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNb2RlbFBhdGggK1NjZW5lQXNzZXRQYXRoK2ZpbGVOYW1lK1wiL0NvbnZlbnRpb25hbC9cIiArZmlsZU5hbWUgKyBcIi5saFwiXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIFVJRnVuY1xyXG57XHJcbiAgICAvL+iuoeeul+e8qeaUvuWAvFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvdW50U2NhbGVGaXgoIHdpZHRoOm51bWJlciApOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF3aWR0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFnZVdpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB2YXIgc2NhbGU6bnVtYmVyID0gTGF5YS5zdGFnZS53aWR0aC93aWR0aDtcclxuICAgICAgICByZXR1cm4gIHNjYWxlO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEZpeFVJKCB2aWV3OkxheWEuU3ByaXRlIClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBVSUZ1bmMuQ291bnRTY2FsZUZpeCh2aWV3LndpZHRoKTtcclxuICAgICAgICB2aWV3LnNjYWxlWCA9IHNjYWxlO1xyXG4gICAgICAgIHZpZXcuc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgdmlldy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodC9zY2FsZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1nciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCIgXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQUFxyXG57XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTWVzc2FnZTpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgIHN0YXRpYyBnZXQgTWVzc2FnZU1hbmFnZXIoKTpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEFQUC5fTWVzc2FnZT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuX01lc3NhZ2UgPSBGVy5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX01lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX1VJTWFuYWdlcjpVSU1hbmFnZXI7XHJcbiAgICBzdGF0aWMgZ2V0IFVJTWFuYWdlcigpOlVJTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEFQUC5fVUlNYW5hZ2VyPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5fVUlNYW5hZ2VyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX1VJTWFuYWdlcjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIF9TY2VuZU1ncjpTY2VuZU1ncjtcclxuICAgIHN0YXRpYyBnZXQgU2NlbmVNYW5hZ2VyKCk6U2NlbmVNZ3JcclxuICAgIHtcclxuICAgICAgICBpZihBUFAuX1NjZW5lTWdyPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5fU2NlbmVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFNjZW5lTWdyPihTY2VuZU1ncik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX1NjZW5lTWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbiIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IFNldFBhbmVsVUkgZnJvbSBcIi4vLi4vdWkvU2V0UGFuZWxVSVwiXHJcbmltcG9ydCBDaGFyYWN0ZXJVSSBmcm9tIFwiLi8uLi91aS9DaGFyYWN0ZXJVSVwiXHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZVNjZW5lXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuL0FQUFwiXHJcblxyXG50eXBlIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGVyXHJcbntcclxuICAgIHN0YXRpYyBnZXQgR2FtZUNvbnRyb2xlcigpOkdhbWVDb250cm9sZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIEdhbWVDb250cm9sZXIuTWdyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ29udHJvbGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6IEdhbWVDb250cm9sZXI7XHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgTWdyKCk6IEdhbWVDb250cm9sZXIge1xyXG4gICAgICAgIGlmIChHYW1lQ29udHJvbGVyLl9NZ3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBHYW1lQ29udHJvbGVyLl9NZ3IgPSBuZXcgR2FtZUNvbnRyb2xlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR2FtZUNvbnRyb2xlci5fTWdyO1xyXG4gICAgfVxyXG4gICAgX0xpbmVTdGVwTnVtOm51bWJlcjtcclxuICAgIF9NYXhMaW5lTnVtOm51bWJlcjtcclxuICAgIF9TdGVwTGVuZ3RoOm51bWJlcjtcclxuICAgIF9TdGVwRGlzdGFuY2U6bnVtYmVyO1xyXG4gICAgX1BsYXllck1vdmVUaW1lOm51bWJlcjtcclxuICAgIC8v5bi46YeP5a6a5LmJXHJcbiAgICAvL+avj+ihjOacgOWkp+agvOWtkOaVsFxyXG4gICAgZ2V0IExpbmVTdGVwTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9MaW5lU3RlcE51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xpbmVTdGVwTnVtID0gNSsyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTGluZVN0ZXBOdW07XHJcbiAgICB9IFxyXG4gICAgLy/mnIDlpKfooYzmlbBcclxuICAgIGdldCBNYXhMaW5lTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9NYXhMaW5lTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTWF4TGluZU51bSA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTWF4TGluZU51bTtcclxuICAgIH0gXHJcbiAgICAvL+agvOWtkOi+uemVv1xyXG4gICAgZ2V0IFN0ZXBMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcExlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBMZW5ndGggPSAwLjk4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcExlbmd0aDtcclxuICAgIH1cclxuICAgIC8v5qC85a2Q5pac5a+56KeS6ZW/5bqmXHJcbiAgICBnZXQgU3RlcERpc3RhbmNlKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1N0ZXBEaXN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBEaXN0YW5jZSA9IE1hdGguc3FydCgodGhpcy5TdGVwTGVuZ3RoICogdGhpcy5TdGVwTGVuZ3RoKSAqIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcERpc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/njqnlrrbnp7vliqjml7bpl7RcclxuICAgIGdldCBQbGF5ZXJNb3ZlVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9QbGF5ZXJNb3ZlVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1BsYXllck1vdmVUaW1lID0gMC4wMiAqIDEwMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fUGxheWVyTW92ZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGxheWVySUQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJTZWxlY3RlZFwiICsgaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66K6+572u6Z2i5p2/XHJcbiAgICBTaG93U2V0UGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIFBhbmVsID0gQVBQLlVJTWFuYWdlci5TaG93PFNldFBhbmVsVUk+KFNldFBhbmVsVUkpOy8vIG5ldyBTZXRQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66KeS6Imy6Z2i5p2/XHJcbiAgICBwdWJsaWMgU2hvd0NoYXJhY3RlclBhbmVsKCkge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBBUFAuVUlNYW5hZ2VyLlNob3c8Q2hhcmFjdGVyVUk+KENoYXJhY3RlclVJKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TZXRJbmZvO1xyXG4gICAgZ2V0IFNldEluZm8oKTogR2FtZVN0cnVjdC5TZXRJbmZvIHtcclxuICAgICAgICBpZiAodGhpcy5fU2V0SW5mbyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1NldEluZm8gPSBuZXcgR2FtZVN0cnVjdC5TZXRJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TZXRJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBTZXRJbmZvKHZhbHVlOiBHYW1lU3RydWN0LlNldEluZm8pIHtcclxuICAgICAgICB0aGlzLl9TZXRJbmZvID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kv53lrZjorr7nva7mlbDmja5cclxuICAgIFNhdmVTZXRJbmZvKGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuU2V0SW5mbyA9IGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLy/or7vlj5borr7nva7kv6Hmga9cclxuICAgIEdldFNldEluZm8oKTogR2FtZVN0cnVjdC5TZXRJbmZvIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TZXRJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIEVudGVyR2FtZVVJKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuRW50ZXJTY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgRW50ZXJHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuRW50ZXJTY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEdhbWVEaXIoKTogR2FtZURpcmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIgYXMgR2FtZURpcmVjdG9yO1xyXG4gICAgfVxyXG4gICAgLy/ov5vlhaXmuLjmiI/lnLrmma/otbDov5nkuKrmjqXlj6NcclxuICAgIEVudGVyU2NlbmUoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIG5ld0dhbWVTY2VuZSA9IG5ldyBHYW1lU2NlbmUoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkVudGVyU2NlbmUobmV3R2FtZVNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkEJVRkbooajnjrDmlYjmnpxcclxuICAgIEdlbkJ1ZmZFZmZlY3QodHlwZTogSXRlbVR5cGUpOiBMYXlhLlNwcml0ZTNEIHtcclxuICAgICAgICByZXR1cm4gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtRWxlbWVudCBleHRlbmRzIExheWEuQm94ICB7XHJcbiAgICAvL1xyXG4gICAgSWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9CdG46IExheWEuQnV0dG9uO1xyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiAge1xyXG4gICAgICAgIGlmICh0aGlzLl9CdG4gPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG4gICAgU2V0QnRuKG93bmVyOiBhbnksIGxpc3RlbmVyOiAoKSA9PiB2b2lkKSAge1xyXG4gICAgICAgIHRoaXMuQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcbiAgICAvL1xyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlRWxlbWVudCBleHRlbmRzIExheWEuSW1hZ2Vcclxue1xyXG4gICAgLy9cclxuICAgIElkeDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9CdG46TGF5YS5CdXR0b247XHJcbiAgICBnZXQgQnRuKCk6TGF5YS5CdXR0b25cclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9CdG4gPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICAgICAgdGhpcy5fQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e1xyXG4gICAgICAgICAgICAgICAgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNldFBsYXllcklEKHRoaXMuSWR4KTtcclxuICAgICAgICAgICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9CdG47XHJcbiAgICB9XHJcbiAgICBSZXNldCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5CdG4pXHJcbiAgICAgICAge31cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0e0Jhc2VGdW5jfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJHVUkgZXh0ZW5kcyB1aS5CR1VJIHtcclxuICAgIFxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSkpO1xyXG4gICAgfVxyXG4gICAgLy9wcml2YXRlIF9Ta3lBcnI6QXJyYXk8TGF5YS5TcHJpdGU+O1xyXG4gICAgcHJpdmF0ZSBfU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9UZW1wU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9TY2FsZVNreTpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9TY2FsZUVhcnRoOm51bWJlcjtcclxuICAgIHByaXZhdGUgX0VhcnRoU3RhcnRQUzpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgd2lkaCA9IExheWEuc3RhZ2Uud2lkdGggO1xyXG4gICAgICAgIHZhciByYXRlID0gTWF0aC5jZWlsKExheWEuc3RhZ2UuaGVpZ2h0L3dpZGgpO1xyXG5cclxuICAgICAgICB0aGlzLl9Ta3lRdWUgPSBuZXcgQmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPigpO1xyXG4gICAgICAgIHRoaXMuX1RlbXBTa3lRdWUgPSBuZXcgQmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPigpO1xyXG4gICAgICAgICAvL25ldyBBcnJheTxMYXlhLkltYWdlPihyYXRlKzEpO1xyXG4gICAgICAgIGZvcihsZXQgc3RhcnRJZHggPSAwO3N0YXJ0SWR4PHJhdGUrMTsgKytzdGFydElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2U6TGF5YS5JbWFnZSA9IG5ldyBMYXlhLkltYWdlKCk7XHJcbiAgICAgICAgICAgIGltYWdlLmxvYWRJbWFnZShcImNvbXAvaW1nX2JhY2tncm91bmRfc3ByX3NreS5wbmdcIik7XHJcbiAgICAgICAgICAgIGltYWdlLndpZHRoID0gd2lkaDtcclxuICAgICAgICAgICAgaW1hZ2UuaGVpZ2h0ID0gd2lkaCt3aWRoKjAuMDE7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9Ta3lRdWUuUHVzaChpbWFnZSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICB0aGlzLlNldFNreSgwKTtcclxuICAgICAgICB2YXIgZWFydGggPSBuZXcgTGF5YS5JbWFnZSgpO1xyXG4gICAgICAgIGVhcnRoLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fRWFydGhTdGFydFBTID0gZWFydGgueTtcclxuICAgICAgICBlYXJ0aC5sb2FkSW1hZ2UoXCJjb21wL2ltZ19iYWNrZ3JvdW5kX3Nwci5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5fRWFydGggPSBlYXJ0aDtcclxuICAgICAgICBlYXJ0aC53aWR0aCA9IHdpZGg7XHJcbiAgICAgICAgZWFydGguaGVpZ2h0ID0gd2lkaDtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGVhcnRoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9TY2FsZVNreSA9IDAuMDAxXHJcbiAgICAgICAgdGhpcy5fU2NhbGVFYXJ0aCA9IDAuMDFcclxuICAgICAgICAvL3RoaXMuX0VhcnRoU3RhcnRQUyA9IHRoaXMuX0VhcnRoLnk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgZm9yKGxldCBzdGFydElkeDpudW1iZXIgPSAwO3N0YXJ0SWR4PHRoaXMuX1NreVF1ZS5Db3VudDsrK3N0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1NreUFycltzdGFydElkeF0ueSA9IHN0YXJ0SWR4ICogaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9FYXJ0aC55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0VhcnRoU3RhcnRQUyA9IHRoaXMuX0VhcnRoLnk7XHJcbiAgICB9Ki9cclxuICAgIC8v6auY5bqm6L2s5bGP5bmV6auY5bqm5YOP57SgXHJcbiAgICBIZWlnaHRUcmFuc1BpeCggaGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0Ki0wLjE7XHJcbiAgICB9XHJcbiAgICBTZXRTa3kocGl4SGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT4gPSB0aGlzLl9UZW1wU2t5UXVlO1xyXG4gICAgICAgIHRlbVNreVF1ZS5DbGVhcigpO1xyXG4gICAgICAgIHZhciBjb3VudDpudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHdoaWxlKHRoaXMuX1NreVF1ZS5Db3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6QmFzZUZ1bmMuTm9kZTxMYXlhLlNwcml0ZT4gPSB0aGlzLl9Ta3lRdWUuUG9wTm9kZSgpO1xyXG4gICAgICAgICAgICB2YXIgc2t5SW1nOkxheWEuU3ByaXRlID0gbm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgc2t5SW1nLnkgPSBjb3VudCAqIGhlaWdodCArIHBpeEhlaWdodCAtIGhlaWdodCAtIGhlaWdodCowLjAxO1xyXG4gICAgICAgICAgICB0ZW1Ta3lRdWUuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgIGlmKHNreUltZy55PkxheWEuc3RhZ2UuaGVpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBza3lJbWcueSA9IHRlbVNreVF1ZS5IZWFkVmFsdWUueSAtIGhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK2NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9UZW1wU2t5UXVlID0gdGhpcy5fU2t5UXVlO1xyXG4gICAgICAgIHRoaXMuX1NreVF1ZSA9IHRlbVNreVF1ZTtcclxuICAgIH1cclxuICAgIFNldEVhcnRoKGhlaWdodDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRWFydGgueSA9IHRoaXMuX0VhcnRoU3RhcnRQUyArIGhlaWdodDtcclxuICAgIH1cclxuICAgIFVwZGF0ZVBhZ2UoIGhlaWdodDpudW1iZXIgKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgLy9oZWlnaHQgPSB0aGlzLkhlaWdodFRyYW5zUGl4KGhlaWdodCk7XHJcbiAgICAgICAgLy92YXIgc2t5SGVpZ2h0UGl4ID0gaGVpZ2h0KnRoaXMuX1NjYWxlU2t5O1xyXG4gICAgICAgIHRoaXMuU2V0U2t5KGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5TZXRFYXJ0aChoZWlnaHQpO1xyXG4gICAgICAgIC8vdmFyIGVhcnRoSGVpZ2h0UGl4ID0gaGVpZ2h0O1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge1VJRnVuY30gZnJvbSBcIi4vLi4vVXRpbGl0eS9VSUZ1bmNcIlxyXG4vL1VJ5Z+657G7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VVSSBleHRlbmRzIExheWEuU3ByaXRlXHJcbntcclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKClcclxuICAgIHtcclxuICAgICAgICAvL1VJTWFuYWdlci4uQ2xvc2UodGhpcyk7XHJcbiAgICAgICAgdmFyIHVpTWdyOlVJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIE9wZW5PUCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIENsb3NlT1AoKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIERlc3Ryb3koIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgVUlUeXBlKCk6QmFzZUVudW0uVUlUeXBlRW51bVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9VSVR5cGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBJc011dGV4KCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Jc011dGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX05hbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vXHJcbiAgICBwcm90ZWN0ZWQgX1VJVHlwZTpCYXNlRW51bS5VSVR5cGVFbnVtO1xyXG4gICAgcHJvdGVjdGVkIF9Jc011dGV4OmJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX05hbWU6c3RyaW5nOyAgICBcclxuICAgIHByb3RlY3RlZCBfVUlNYW5hZ2VyOlVJTWFuYWdlclxyXG4gICAgcHJpdmF0ZSBfRGlydHk6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5Mb3c7XHJcbiAgICAgICAgdGhpcy5fSXNNdXRleCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7lVSei/m+ihjOmAgumFjVxyXG4gICAgICogQHBhcmFtIFVJIOmAgumFjVVJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGaXhVSShVSTpMYXlhLlZpZXcpXHJcbiAgICB7XHJcbiAgICAgICAgVUlGdW5jLkZpeFVJKFVJKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKFVJKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXREaXJ0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIENsZWFyRGlydHkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBVSVVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9EaXJ0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xlYXJEaXJ0eSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWJzdHJhY3QgVXBkYXRlKCk6dm9pZDtcclxufSIsIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgRlcgZnJvbSBcIi4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuaW1wb3J0IFJvbGVFbGVtZW50IGZyb20gXCIuLy4uL3NjcmlwdC9Sb2xlRWxlbWVudFwiXHJcblxyXG5jbGFzcyBFeHRlbmRDaGFyYWN0ZXJzVUkgZXh0ZW5kcyB1aS5DaGFyYWN0ZXJVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkNoYXJhY3RlclwiKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBcclxuICAgIHByaXZhdGUgX1JlbmRlckhhbmRsZXIoY2VsbDpMYXlhLkJveCxpbmRleDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcm9sZUVsZW1lbnQ6Um9sZUVsZW1lbnQgPSBjZWxsIGFzIFJvbGVFbGVtZW50O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LklkeCA9IGluZGV4O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlc2V0KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9VSTpFeHRlbmRDaGFyYWN0ZXJzVUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRDaGFyYWN0ZXJzVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB0aGlzLlNldExpc3QoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiQ2hhcmFjdGVyVUlcIjtcclxuICAgIH1cclxuICAgIFNldExpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsaXN0QXJyYXk6QXJyYXk8YW55PiA9IFtcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiXTtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QucmVuZGVySGFuZGxlciA9IG5ldyBMYXlhLkhhbmRsZXIodGhpcyx0aGlzLl9SZW5kZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5hcnJheSA9IGxpc3RBcnJheTtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0JhY2tUaW1lID0gMjAwOy8v6K6+572u5qmh55qu562L5Zue5by55pe26Ze044CC5Y2V5L2N5Li65q+r56eS44CCXHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNEaXN0YW5jZSA9IDUwXHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7R2FtZVN0cnVjdCB9ICBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmNsYXNzIEV4dGVuZEVuZEdhbWVVSSBleHRlbmRzIHVpLkVuZEdhbWVVSSB7XHJcbiAgICBQYW5lbDpMYXlhLlBhbmVsO1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJFbmRHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL3RoaXMuUGFuZWwgPSB0aGlzLlBhbmVsO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbC52U2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9NZW51ZUJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLEd1aWRlck1hbmFnZXIuTWdyLEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuX1NldEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dTZXRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRCdG4ub24oTGF5YS5FdmVudC5DTElDSyxDb250cm9sZXIuR2FtZUNvbnRyb2xlcixDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJFbmRHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIFVJOkV4dGVuZEVuZEdhbWVVSTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuVUk9IG5ldyBFeHRlbmRFbmRHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuVUkpO1xyXG4gICAgICAgIC8vdGhpcy5VSS5fQ2hhcmFjdGVyTGlzdC5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgdGhpcy5fVUlNYW5hZ2VyLlNob3c8UGxheWVyTGlzdFVJPihQbGF5ZXJMaXN0VUkpfSk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBGTSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFBsYXllckxpc3RVSSBmcm9tIFwiLi8uLi91aS9QbGF5ZXJMaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5jbGFzcyBFeHRlbmRFbnRlckdhbWVVSSBleHRlbmRzIHVpLkVudGVyVUkge1xyXG4gICAgUGFuZWw6TGF5YS5QYW5lbDtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuUGFuZWwgPSB0aGlzLl9QYW5lbDtcclxuICAgICAgICB0aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXIub24oTGF5YS5FdmVudC5DTElDSyxHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dDaGFyYWN0ZXJQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU2V0UGFuZWwub24oTGF5YS5FdmVudC5DTElDSyxHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dTZXRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnQub24oTGF5YS5FdmVudC5DTElDSyxHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9ICAgICAgICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50ZXJHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJFbnRlckdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOkV4dGVuZEVudGVyR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUk9IG5ldyBFeHRlbmRFbnRlckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHZhciB1aU1ncjpVSU1hbmFnZXIgPSB0aGlzLl9VSU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0NoYXJhY3Rlckxpc3Qub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57IHVpTWdyLlNob3c8UGxheWVyTGlzdFVJPihQbGF5ZXJMaXN0VUkpfSk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOWcuuaZr1VJXHJcbiAqL1xyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBJdGVtTGlzdFVJIGZyb20gXCIuL0l0ZW1MaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmNsYXNzIEV4dGVuZHNHYW1lVUkgZXh0ZW5kcyB1aS5HYW1lVUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBTZXRDb3VudFRpbWUoaW5mbzpzdHJpbmcgPVwiXCIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lLnRleHQgPWluZm87XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHJpdmF0ZSBfVUk6RXh0ZW5kc0dhbWVVSTtcclxuICAgIC8vXHJcbiAgICBEaXN0YW5jZVN0cjpBcnJheTxzdHJpbmc+O1xyXG4gICAgR29sZE51bVN0cjpBcnJheTxzdHJpbmc+O1xyXG4gICAgcHJpdmF0ZSBfR29sZDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Db3VudDpudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9Jc011dGV4ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fR29sZCA9IDA7XHJcbiAgICAgICAgdmFyIG9wSXNSaWdodCA9IEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRJbmZvLk9QSXNSaWdodDtcclxuICAgICAgICB0aGlzLl9VSS5fSXRlbUxpc3RCdG4ub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57IHRoaXMuX1VJTWFuYWdlci5TaG93PEl0ZW1MaXN0VUk+KEl0ZW1MaXN0VUkpfSlcclxuICAgICAgICB0aGlzLlNldENvdW50VGltZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHI9IHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gXCIwXCJcclxuICAgICAgICB0aGlzLl9TaG93RGlzdGFuY2UoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHIgPSB0aGlzLl9VSS5fVHh0R29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSBcIjBcIjtcclxuICAgICAgICB0aGlzLl9TaG93R29sZE51bSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2hvd0lucHV0SW5mbyhcIlwiKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5VcGRhdGUpO1xyXG4gICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TaG93RGlzdGFuY2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0ID0gdGhpcy5EaXN0YW5jZVN0clswXSt0aGlzLkRpc3RhbmNlU3RyWzFdO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfU2hvd0dvbGROdW0oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHRHb2xkLnRleHQgPSB0aGlzLkdvbGROdW1TdHJbMF0gKyB0aGlzLkdvbGROdW1TdHJbMV07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBBZGRHb2xkKGdvbGROdW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0dvbGQrPSBnb2xkTnVtO1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IHRoaXMuX0dvbGQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLlNldERpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBTZXRMZWZ0VG91Y2gob3duZXI6YW55LExpc3RlbmVyOigpPT52b2lkKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JpZ2h0X0xlZnRUb3VjaC5vbihMYXlhLkV2ZW50LkNMSUNLLG93bmVyLExpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRSaWdodFRvdWNoKG93bmVyOmFueSxMaXN0ZW5lcjooKT0+dm9pZCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9SaWdodF9SaWdodFRvdWNoLm9uKExheWEuRXZlbnQuQ0xJQ0ssb3duZXIsTGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldENvdW50VGltZShpbmZvOnN0cmluZyA9XCJcIilcclxuICAgIHtcclxuICAgICAgICBpZihpbmZvPT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fQ291bnREb3duVUkudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVQYW5lbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5TZXRDb3VudFRpbWUoaW5mbyk7XHJcbiAgICB9XHJcbiAgICBzZXQgR2FtZVBhbmVsKHZhbHVlOmJvb2xlYW4pXHJcbiAgICB7IFxyXG4gICAgICAgIHRoaXMuX1VJLl9HYW1lUGFuZWwudmlzaWJsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgc2V0IERpc3RhbmNlKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gdmFsdWUudG9GaXhlZCgyKTtcclxuICAgIH1cclxuICAgIHNldCBHb2xkTnVtKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgU2hvd0lucHV0SW5mbyhpbmZvOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZUluZm8udGV4dCA9IGluZm87XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIC8v5pi+56S66YeR5biB5L+h5oGvXHJcbiAgICAgICAgdGhpcy5fU2hvd0dvbGROdW0oKTtcclxuICAgICAgICAvL+aYvuekuui3neemu+S/oeaBr1xyXG4gICAgICAgIHRoaXMuX1Nob3dEaXN0YW5jZSgpO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuLy4uL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcblxyXG5jbGFzcyBFeHRlbmRzSXRlbUxpc3RVSSBleHRlbmRzIHVpLkl0ZW1MaXN0VUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSkpO1xyXG4gICAgfVxyXG4gICAgU2V0TGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxpc3RBcnJheTpBcnJheTxhbnk+ID0gW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCJdO1xyXG4gICAgICAgIHRoaXMuX0xpc3QuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX0xpc3QucmVuZGVySGFuZGxlciA9IG5ldyBMYXlhLkhhbmRsZXIodGhpcyx0aGlzLl9SZW5kZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9MaXN0LmFycmF5ID0gbGlzdEFycmF5O1xyXG4gICAgICAgIHRoaXMuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNCYWNrVGltZSA9IDIwMDsvL+iuvue9ruapoeearueti+WbnuW8ueaXtumXtOOAguWNleS9jeS4uuavq+enkuOAglxyXG4gICAgICAgIHRoaXMuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNEaXN0YW5jZSA9IDUwXHJcbiAgICB9XHJcbiAgICBCdG5MaXN0ZW5lcjpNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIHByaXZhdGUgX1JlbmRlckhhbmRsZXIoY2VsbDpMYXlhLkJveCxpbmRleDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgcm9sZUVsZW1lbnQ6SXRlbUVsZW1lbnQgPSBjZWxsIGFzIEl0ZW1FbGVtZW50O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlNldEJ0bih0aGlzLkJ0bkxpc3RlbmVyLkxpc3RlbmVyLHRoaXMuQnRuTGlzdGVuZXIuQWN0aW9uKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtTGlzdFVJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiSXRlbUxpc3RVSVwiO1xyXG4gICAgfVxyXG4gICAgVUk6RXh0ZW5kc0l0ZW1MaXN0VUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLlVJID0gbmV3IEV4dGVuZHNJdGVtTGlzdFVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLlVJKTtcclxuICAgICAgICB0aGlzLlVJLkJ0bkxpc3RlbmVyID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZSh0aGlzLCgpPT57IHRoaXMuX1VJTWFuYWdlci5DbG9zZSh0aGlzKX0pXHJcbiAgICAgICAgdGhpcy5VSS5TZXRMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG59IiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5cclxuY2xhc3MgRXh0ZW5kUGxheWVyTGlzdCBleHRlbmRzIHVpLlBsYXllckxpc3RVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckxpc3RVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIlBsYXllckxpc3RVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIF9VSTpFeHRlbmRQbGF5ZXJMaXN0O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRQbGF5ZXJMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JldHVybk1haW4ub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG59XHJcbiIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmNsYXNzIEV4dGVuZHNTZXRQYW5lbFVJIGV4dGVuZHMgdWkuU2V0UGFuZWxVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e0FQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCl9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNTZXRQYW5lbFVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzU2V0UGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4geyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7IEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKSB9KTtcclxuICAgICAgICB0aGlzLlNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNldFBhbmVsVUlcIjtcclxuICAgIH1cclxuICAgIFNldFBhbmVsKCkge1xyXG4gICAgICAgIHZhciBpbmZvOiBHYW1lU3RydWN0LlNldEluZm8gPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HZXRTZXRJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5fVUkuX0F1ZGlvU3dpdGNoLnNlbGVjdGVkSW5kZXggPSBpbmZvLkF1ZGlvT24gPyAwIDogMTtcclxuICAgICAgICB0aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uT1BJc1JpZ2h0ID8gMSA6IDA7XHJcbiAgICAgICAgdGhpcy5fVUkuX1RleHQudGV4dCA9IGluZm8uVGV4dEluZm87XHJcbiAgICB9XHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICBpbmZvLkF1ZGlvT24gPSB0aGlzLl9VSS5fQXVkaW9Td2l0Y2guc2VsZWN0ZWRJbmRleCA9PSAwO1xyXG4gICAgICAgIGluZm8uT1BJc1JpZ2h0ID0gdGhpcy5fVUkuX09QU3dpdGNoLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TYXZlU2V0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZU9QKCkge1xyXG4gICAgICAgIHRoaXMuU2F2ZVBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge31cclxufVxyXG4iLCJpbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL0Jhc2VVSVwiXHJcbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XHJcblxyXG5tb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1Byb2dyZXNzOkxheWEuUHJvZ3Jlc3NCYXI7XHJcblx0XHRwdWJsaWMgX0d1aWRlcjpMYXlhLkltYWdlO1xyXG5cdFx0cHVibGljIF9FbnRlcjpMYXlhLkJ1dHRvbjtcclxuXHRcdHB1YmxpYyBFcnJvckluZm86TGF5YS5MYWJlbDtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTG9hZGluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEV4dExvYWRpbmdVSSBleHRlbmRzIHVpLkxvYWRpbmdVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBcIkxvYWRpbmdVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOnVpLkxvYWRpbmdVSTtcclxuICAgIF9DYWxsQmFjazooKT0+dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBuYW1lOnN0cmluZyApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgLy90aGlzLl9VSSA9bmV3IHVpLkxvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuX1VJID1uZXcgRXh0TG9hZGluZ1VJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSApO1xyXG4gICAgICAgIHRoaXMuVmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5fQ2FsbEJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB4Om51bWJlciA9IDA7XHJcbiAgICAgICAgeCArPSB0aGlzLl9VSS5fUHJvZ3Jlc3Mud2lkdGgqdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9HdWlkZXIucG9zKHgsdGhpcy5fVUkueSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFZhbHVlKG51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlID0gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQ29tcGxldGUoY2FsbEJhY2s6KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ2FsbEJhY2sgPSBjYWxsQmFjaztcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLmxhYmVsID0gXCJFbnRlclwiOy8vdGhpcy5fTmFtZVswXTtcclxuICAgIH1cclxuICAgIFJlbG9hZChjYWxsQmFjazooKT0+dm9pZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgQkdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0VhcnRoOkxheWEuSW1hZ2U7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJCR1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Hb2xkRGlzOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9MaXN0OkxheWEuTGlzdDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkNoYXJhY3RlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW5kR2FtZVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfR2FtZUluZm86TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1N0YXJ0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTWVudWVCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9TZXRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QbGF5ZXJMaXN0QnRuOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiRW5kR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW50ZXJVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1N0YXJ0OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUGFuZWw6TGF5YS5QYW5lbDtcblx0XHRwdWJsaWMgX1NldFBhbmVsOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyTGlzdDpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVudGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Db3VudERvd25VSTpMYXlhLkJveDtcblx0XHRwdWJsaWMgX0l0ZW1MaXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ291bnRUaW1lOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lSW5mbzpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfR2FtZVBhbmVsOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfVHh0RGlzdGFuY2U6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1R4dEdvbGQ6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1VzZUl0ZW06TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SaWdodF9MZWZ0VG91Y2g6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SaWdodF9SaWdodFRvdWNoOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0xpc3Q6TGF5YS5MaXN0O1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiSXRlbUxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1BsYXllckxpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBfUmV0dXJuTWFpbjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlBsYXllckxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9UZXh0OkxheWEuVGV4dEFyZWE7XG5cdFx0cHVibGljIF9SZXR1cm46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9BdWRpb1N3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG5cdFx0cHVibGljIF9PUFN3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJTZXRQYW5lbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
