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
            this.BarrierList.push(new LayItemMgr(10, 11, ItemType.Empty, 10));
            this.BarrierList.push(new LayItemMgr(10, 4, ItemType.Rock, 10));
            this.BarrierList.push(new LayItemMgr(10, 2, ItemType.Thorn, 10));
            this.BarrierList.push(new LayItemMgr(15, 2, ItemType.Vine));
            this.RewardList.push(new LayItemMgr(10, 4, ItemType.Coin));
            this.RewardList.push(new LayItemMgr(10, 1, ItemType.Collector));
            this.RewardList.push(new LayItemMgr(10, 2, ItemType.Fly));
            this.RewardList.push(new LayItemMgr(20, 2, ItemType.Protect, 3));
            this.RewardList.push(new LayItemMgr(20, 2, ItemType.HolyProtect, 3));
            //this.RewardList.push(new LayItemMgr(10,10,ItemType.Coin))
            //this.BarrierList.push(new LayItemMgr(10,60,ItemType.Fly))
            ResetItemFactory();
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
            //分布图 物品idx:层数
            this.ItemList = new Array(range);
            this.TouchedFloor = 0;
            this.GenMap(startFloor);
        }
        Object.defineProperty(LayItemMgr.prototype, "Range", {
            get: function () {
                return this.ItemList.length;
            },
            enumerable: true,
            configurable: true
        });
        //层更新函数
        LayItemMgr.prototype.OnFloor = function (floor) {
            if (floor < this.TouchedFloor) {
                this.GenMap(floor);
            }
            if (floor >= this.StartFloor + this.Range) {
                this.GenMap(floor);
            }
        };
        //生成分布图
        LayItemMgr.prototype.GenMap = function (startFloor) {
            this.StartFloor = startFloor;
            var itemNum = this.ItemNum;
            for (var count = 0; count < this.ItemList.length; ++count) {
                this.ItemList[count] = 0;
            }
            var itemList = this.ItemList;
            for (var countNum = 0; countNum < itemNum; ++countNum) {
                var ItemFloor = Math.floor(Math.random() * this.Range);
                this.ItemList[ItemFloor] += 1;
            }
        };
        LayItemMgr.prototype.TakeItems = function (floor) {
            this.TouchedFloor = floor;
            return new LineItemInfo(this.ItemType, this.ItemList[floor - this.StartFloor]);
        };
        return LayItemMgr;
    }());
    Item.LayItemMgr = LayItemMgr;
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
        function BaseGameInput(input) {
            if (input === void 0) { input = null; }
            if (input == null) {
                input = this;
            }
            this.NextInput = input;
        }
        BaseGameInput.prototype.Update = function () { };
        BaseGameInput.prototype.Clear = function () { };
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
            _this._Dirty = false;
            _this._IsRight = false;
            return _this;
        }
        NormGameInput.prototype.Input = function (isRight) {
            //this.GameDir.MoveStep(isRight);
            this._Dirty = true;
            this._IsRight = isRight;
        };
        NormGameInput.prototype.Update = function () {
            if (this._Dirty && this.GameDir.Player.BaseCtrler.Time <= 0.1) {
                this._Dirty = false;
                this.GameDir.MoveStep(this._IsRight);
            }
        };
        NormGameInput.prototype.Clear = function () {
            this._Dirty = false;
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
            //Laya.stage.frameRate = "slow"
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
        this.InputCtrl.Clear();
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
        this.InputCtrl.Update();
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
        for (var safeStepIdx = 0; safeStepIdx < safeStepList.length; ++safeStepIdx) {
            randomPool.push(safeStepList[safeStepIdx]);
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
    path.ResourcePath = path.IsEditor ? "D:/GIt/Resources/LayaProject/FreshProject/myLaya/NetResource_3_8/" : "http://www.gsjgame.com/Resource/NetResource_3_8/";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rvb2wvTGF5YTIuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQmFzZS9CYXNlRW51bS50cyIsInNyYy9CYXNlL0Jhc2VGdW5jLnRzIiwic3JjL0Jhc2UvTGlmZU9iai50cyIsInNyYy9GcmFtZVdvcmsvQmFzZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL0ZyYW1lV29yay50cyIsInNyYy9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlci50cyIsInNyYy9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9VSU1hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FuaW1PYmoudHMiLCJzcmMvR2FtZS9CdWZmLnRzIiwic3JjL0dhbWUvR2FtZUNhbWVyYS50cyIsInNyYy9HYW1lL0dhbWVJdGVtLnRzIiwic3JjL0dhbWUvR2FtZVN0cnVjdC50cyIsInNyYy9HYW1lL0lucHV0LnRzIiwic3JjL0dhbWUvTW91bnRMaW5lLnRzIiwic3JjL0dhbWUvUGxheWVyLnRzIiwic3JjL0dhbWUvUGxheWVyQ3RybGVyLnRzIiwic3JjL0dhbWUvU3RlcC50cyIsInNyYy9NYWluLnRzIiwic3JjL1NjZW5lL0Jhc2VEaXJlY3Rvci50cyIsInNyYy9TY2VuZS9CYXNlU2NlbmUudHMiLCJzcmMvU2NlbmUvR2FtZURpcmVjdG9yLnRzIiwic3JjL1NjZW5lL0dhbWVTY2VuZS50cyIsInNyYy9TY2VuZS9HdWlkZXJNYW5hZ2VyLnRzIiwic3JjL1NjZW5lL0xvYWRTY2VuZS50cyIsInNyYy9VdGlsaXR5L1BhdGgudHMiLCJzcmMvVXRpbGl0eS9VSUZ1bmMudHMiLCJzcmMvY29udHJvbGVyL0FQUC50cyIsInNyYy9jb250cm9sZXIvR2FtZUNvbnRyb2xlci50cyIsInNyYy9zY3JpcHQvSXRlbUVsZW1lbnQudHMiLCJzcmMvc2NyaXB0L1JvbGVFbGVtZW50LnRzIiwic3JjL3VpL0JHLnRzIiwic3JjL3VpL0Jhc2VVSS50cyIsInNyYy91aS9DaGFyYWN0ZXJVSS50cyIsInNyYy91aS9FbmRHYW1lVUkudHMiLCJzcmMvdWkvRW50ZXJHYW1lVUkudHMiLCJzcmMvdWkvR2FtZVVJLnRzIiwic3JjL3VpL0l0ZW1MaXN0VUkudHMiLCJzcmMvdWkvUGxheWVyTGlzdFVJLnRzIiwic3JjL3VpL1NldFBhbmVsVUkudHMiLCJzcmMvdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBLElBQWMsUUFBUSxDQUVyQjtBQUZELFdBQWMsUUFBUTtJQUNsQixJQUFZLFVBQXNCO0lBQWxDLFdBQVksVUFBVTtRQUFFLHlDQUFHLENBQUE7UUFBQyw2Q0FBSyxDQUFBO0lBQUEsQ0FBQyxFQUF0QixVQUFVLEdBQVYsbUJBQVUsS0FBVixtQkFBVSxRQUFZO0lBQUEsQ0FBQztBQUN2QyxDQUFDLEVBRmEsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFFckI7Ozs7QUNBRDs7R0FFRztBQUNILElBQWMsUUFBUSxDQTBQckI7QUExUEQsV0FBYyxRQUFRO0lBQ2xCLElBQUssVUFBc0I7SUFBM0IsV0FBSyxVQUFVO1FBQUUseUNBQUcsQ0FBQTtRQUFDLDZDQUFLLENBQUE7SUFBQSxDQUFDLEVBQXRCLFVBQVUsS0FBVixVQUFVLFFBQVk7SUFBQSxDQUFDO0lBQzVCO1FBSUk7WUFFSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUM7UUFFRCxzQkFBSSxzQkFBSztpQkFBVDtnQkFFSSxPQUFRLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDeEIsQ0FBQzs7O1dBQUE7UUFDRCxxQkFBTyxHQUFQLFVBQVEsUUFBaUM7WUFF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QUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FQQSxBQU9DLENBUCtCLElBQUksQ0FBQyxJQUFJLEdBT3hDO0lBUFksYUFBVSxhQU90QixDQUFBO0lBQ0Q7UUFBa0MsZ0NBQVM7UUFHdkM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLHFDQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDTCxtQkFBQztJQUFELENBUkEsQUFRQyxDQVJpQyxJQUFJLENBQUMsSUFBSSxHQVExQztJQVJZLGVBQVksZUFReEIsQ0FBQTtJQUNEO1FBQWdDLDhCQUFTO1FBS3JDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVZBLEFBVUMsQ0FWK0IsSUFBSSxDQUFDLElBQUksR0FVeEM7SUFWWSxhQUFVLGFBVXRCLENBQUE7QUFDTCxDQUFDLEVBdkZhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQXVGZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgbW9kdWxlIEJhc2VFbnVtIHtcclxuICAgIGV4cG9ydCBlbnVtIFVJVHlwZUVudW0ge0xvdyxNaWRsZX07XHJcbn0iLCJpbXBvcnQgQmFzZU1nciBmcm9tIFwiLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCI7XHJcblxyXG4vKipcclxuICog5a6a5LmJ5Z+656GA57uT5p6E5L2TXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEJhc2VGdW5jIHtcclxuICAgIGVudW0gVUlUeXBlRW51bSB7TG93LE1pZGxlfTtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXA8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Db3VudDpudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfTWFwOntba2V5OiBzdHJpbmddOiBUfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9NYXAgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3JFYWNoKGNhbGxiYWNrOihtZ3I6VCxrZXk6c3RyaW5nKT0+dm9pZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgbWFwS2V5IGluIHRoaXMuX01hcClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fTWFwW21hcEtleV0sbWFwS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gb2JqIOaUvuWFpeWvueixoVxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0KCBvYmo6VCwga2V5OnN0cmluZyApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighdGhpcy5fTWFwW2tleV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICsrdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fTWFwW2tleV0gPSBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdldChrZXk6c3RyaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDnp7vpmaTmn5DkuKrlr7nosaFcclxuICAgICAgICAgKiBAcmV0dXJucyDooqvnp7vpmaTlr7nosaFcclxuICAgICAgICAgKi9cclxuICAgICAgICBSZW1vdmUoa2V5OnN0cmluZyk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIE9iajpUID0gdGhpcy5fTWFwW2tleV07XHJcbiAgICAgICAgICAgIGlmKE9iailcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTWFwW2tleV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOmUrlxyXG4gICAgICAgICAqIEByZXR1cm5zIOaYr+WQpuaLpeaciVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEhhcyhrZXk6c3RyaW5nKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9NYXBba2V5XSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm9kZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX1ZhbHVlOlQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfTmV4dDpOb2RlPFQ+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCApXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgVmFsdWUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBWYWx1ZSh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IE5leHQoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IE5leHQobm9kZTpOb2RlPFQ+KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX05leHQgPSBub2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBOb2RlUG9vbDxUPlxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBfTm9kZUxpc3Q6Tm9kZTxUPjtcclxuICAgICAgICBQdWxsQmFjayhub2RlOk5vZGU8VD4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBub2RlLlZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgbm9kZS5OZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYodGhpcy5fTm9kZUxpc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0Lk5leHQgPSBub2RlO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Ob2RlTGlzdCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQXF1aXJlKCk6Tm9kZTxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IHRoaXMuX05vZGVMaXN0O1xyXG4gICAgICAgICAgICBpZihub2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Ob2RlTGlzdCA9IHRoaXMuX05vZGVMaXN0Lk5leHQ7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm9kZVF1ZXVlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfQ291bnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfSGVhZDpOb2RlPFQ+XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFpbGVcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFBvcE5vZGUoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9Db3VudDwxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBub2RlOk5vZGU8VD4gPSBudWxsO1xyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5fSGVhZDtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZCA9IHRoaXMuX0hlYWQuTmV4dDtcclxuICAgICAgICAgICAgbm9kZS5OZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgLS10aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgLy/liKvmiorlsL7lt7TluKblh7rljrvkuoZcclxuICAgICAgICAgICAgaWYodGhpcy5fQ291bnQgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbGUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1c2godmFsdWU6VClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOk5vZGU8VD4gPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICBub2RlLlZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaE5vZGUobm9kZTpOb2RlPFQ+KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbm9kZS5OZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYodGhpcy5fQ291bnQgPT0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9IZWFkID0gbm9kZTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbGUuTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fVGFpbGUgPSBub2RlO1xyXG4gICAgICAgICAgICArK3RoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgQ2xlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEhlYWROb2RlKCk6Tm9kZTxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSGVhZE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGVhZFZhbHVlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fSGVhZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0hlYWQuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBUYWlsTm9kZSgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5UYWlsTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBUYWlsVmFsdWUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9UYWlsZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1RhaWxlLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4vKlxyXG4gICAgZXhwb3J0IGNsYXNzIExpbmtOb2RlTGlzdDxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX0hlYWROb2RlOk5vZGU8VD47XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFpbE5vZGU6Tm9kZTxUPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfQ291bnROb2RlOm51bWJlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkTm9kZSA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSB0aGlzLl9IZWFkTm9kZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlID0gdGhpcy5fSGVhZE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluWktOe7k+eCueWAvFxyXG4gICAgICAgICBcclxuICAgICAgICBnZXQgSGVhZFZhbHVlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9IZWFkTm9kZS5WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgQWRkKHZhbHVlOlQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3Tm9kZTpOb2RlPFQ+ID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgbmV3Tm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLkFkZE5vZGUobmV3Tm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFkZE5vZGUobmV3Tm9kZTpOb2RlPFQ+KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fVGFpbE5vZGUhPXRoaXMuX0hlYWROb2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsTm9kZS5OZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fSGVhZE5vZGUuTmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxufSIsIlxyXG5leHBvcnQgbW9kdWxlIEVudW0ge1xyXG4gICAgZXhwb3J0IGVudW0gTGlmZU9ialN0YXRleyBVblN0YXJ0ZWQsU3RhcnRpbmcsVXBkYXRpbmcsRW5kZWQgfVxyXG59XHJcbi8v6K+l5a+56LGh5qih5p2/55So5LqO5pyJIOW8gOWni+OAgei/m+ihjOaAp+OAgee7k+adnyDkuInnp43nirbmgIHnmoTlr7nosaFcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgTGlmZU9ialxyXG57XHJcbiAgICBPYmpTdGF0ZTpFbnVtLkxpZmVPYmpTdGF0ZTtcclxuICAgIGFic3RyYWN0IFN0YXJ0KCk6dm9pZDtcclxuXHJcbiAgICBVcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5PYmpTdGF0ZSA9PSBFbnVtLkxpZmVPYmpTdGF0ZS5VblN0YXJ0ZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuX1VwZGF0ZUZ1bmMgIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVXBkYXRlRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJvdGVjdGVkIF9VcGRhdGVGdW5jOigpPT52b2lkO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVXBkYXRlRnVuYz1udWxsO1xyXG4gICAgICAgIHRoaXMuT2JqU3RhdGU9RW51bS5MaWZlT2JqU3RhdGUuVW5TdGFydGVkO1xyXG4gICAgfVxyXG5cclxuICAgIC8v56a75byA5pe26L+b6KGM6YWN572uXHJcbiAgICBwcm90ZWN0ZWQgX0xlYXZlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VwZGF0ZUZ1bmMgPSB0aGlzLl9MZWF2ZWluZztcclxuICAgIH1cclxuXHJcbiAgICAvL+emu+W8gOaXtui/m+ihjOmFjee9riDnprvlvIDpgLvovpHmiafooYzlrozmiJDlkI7ov5vlhaXnu5PmnZ/nirbmgIFcclxuICAgIHByb3RlY3RlZCBfTGVhdmVpbmcoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTGVhdmVDb21wbGV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v56a75byA5YeG5aSH5a6M5q+VIOaJp+ihjOemu+W8gOmAu+i+kVxyXG4gICAgcHJvdGVjdGVkIF9MZWF2ZUNvbXBsZXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VcGRhdGVGdW5jID0gbnVsbDtcclxuICAgICAgICB0aGlzLk9ialN0YXRlPSBFbnVtLkxpZmVPYmpTdGF0ZS5FbmRlZDtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/m+WFpemFjee9rlxyXG4gICAgcHJvdGVjdGVkIF9TdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLk9ialN0YXRlPSBFbnVtLkxpZmVPYmpTdGF0ZS5TdGFydGluZztcclxuICAgICAgICB0aGlzLl9VcGRhdGVGdW5jID0gdGhpcy5fU3RhcnRpbmc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5byA5aeL5YeG5aSHIOWHhuWkh+Wwsee7quWQjuato+W8j+i/kOihjFxyXG4gICAgcHJvdGVjdGVkIF9TdGFydGluZygpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TdGFydENvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9TdGFydENvbXBsZXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VwZGF0ZUZ1bmMgPSB0aGlzLl9VcGRhdGU7XHJcbiAgICAgICAgdGhpcy5PYmpTdGF0ZT0gRW51bS5MaWZlT2JqU3RhdGUuVXBkYXRpbmc7XHJcbiAgICB9XHJcbiAgICAvL+aJp+ihjOi/h+eoi+S4reeahOWKn+iDvVxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IF9VcGRhdGUoKTp2b2lkO1xyXG59IiwiZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZU1nclxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlKCk7XHJcbn0iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtCYXNlRnVuY30gIGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmFtZVdvcmtcclxue1xyXG4gICAgX01nck1hcDpCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+Oy8vQmFzZVN0cnVjdC5NYXA8QmFzZU1hbmFnZXI+O1xyXG4gICAgX1RlbU1nckxpc3Q6QXJyYXk8QmFzZU1hbmFnZXI+O1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX01nck1hcCA9IG5ldyBCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRk06RnJhbWVXb3JrO1xyXG4gICAgc3RhdGljIGdldCBGTSgpOkZyYW1lV29ya1xyXG4gICAge1xyXG4gICAgICAgIGlmKEZyYW1lV29yay5fRk09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGcmFtZVdvcmsuX0ZNID0gbmV3IEZyYW1lV29yaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRnJhbWVXb3JrLl9GTTtcclxuICAgIH1cclxuICAgIC8vY29uc3RydWN0b3JcclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1wTWdyTGlzdCA9IG5ldyBBcnJheTxCYXNlTWFuYWdlcj4odGhpcy5fTWdyTWFwLkNvdW50KTtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAuZm9yRWFjaCggKG1ncjpCYXNlTWFuYWdlciAsIGtleTpzdHJpbmcpOnZvaWQgPT57XHJcbiAgICAgICAgICAgIHRlbXBNZ3JMaXN0LnB1c2gobWdyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRlbXBNZ3JMaXN0LmZvckVhY2goKG1ncixpZHgpPT57bWdyLlVwZGF0ZSgpO30pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRNYW5hZ2VyPFQgZXh0ZW5kcyBCYXNlTWFuYWdlcj4oIHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9ICk6VFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX01nck1hcC5IYXModHlwZS5OYW1lKCkpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX01nck1hcC5HZXQodHlwZS5OYW1lKCkpIGFzIFQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZXdNZ3I6VCA9IG5ldyB0eXBlKCk7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwLlNldChuZXdNZ3IsdHlwZS5OYW1lKCkpO1xyXG4gICAgICAgIHJldHVybiAgbmV3TWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgR2V0TWFuYWdlcjxUIGV4dGVuZHMgQmFzZU1hbmFnZXI+KHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9KTpUe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9NZ3JNYXAuR2V0KHR5cGUuTmFtZSgpKSBhcyBUO1xyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOa2iOaBr+aOp+WItuWZqFxyXG4gKi9cclxuaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmV4cG9ydCBtb2R1bGUgTWVzc2FnZU1EXHJcbntcclxuICAgIGV4cG9ydCBjb25zdCBHYW1lRXZlbnQgPVxyXG4gICAge1xyXG4gICAgICAgIFBsYXllckRlYXRoOlwiUGxheWVyRGVhdGhcIixcclxuICAgICAgICBHYW1lVGltZVVwOlwiR2FtZVRpbWVVcFwiLFxyXG4gICAgICAgIEdhbWVDb250aW51ZTpcIkdhbWVDb250aW51ZVwiXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBNZXNzYWdlQ2VudGVyIGV4dGVuZHMgQmFzZU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICBcIk1lc3NhZ2VDZW50ZXJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX01ncjpNZXNzYWdlQ2VudGVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0V2ZW50RGljdDp7W0tleTpzdHJpbmddOk1FdmVudH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBfR2V0RXZlbnQobmFtZTpzdHJpbmcpOk1FdmVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50Ok1FdmVudCA9IHRoaXMuX0V2ZW50RGljdFtuYW1lXTtcclxuICAgICAgICAgICAgaWYoZXZlbnQgPT0gdW5kZWZpbmVkfHwgZXZlbnQgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgTUV2ZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0W25hbWVdID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0ID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgc3RhdGljIGdldCBNZ3IoKTpNZXNzYWdlQ2VudGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihNZXNzYWdlQ2VudGVyLl9NZ3IgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWVzc2FnZUNlbnRlci5fTWdyID0gbmV3IE1lc3NhZ2VDZW50ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gTWVzc2FnZUNlbnRlci5fTWdyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo5YaMXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIOWnlOaJmFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqfSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAgKi9cclxuICAgICAgICBSZWdpc3QobmFtZTpzdHJpbmcsYWN0aW9uOigpPT52b2lkLGxpc3RlbmVyOk9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDpNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG5ld0RsZ3Q6RGVsZWdhdGUgPSBuZXcgRGVsZWdhdGUobGlzdGVuZXIsYWN0aW9uKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuQWRkKG5ld0RsZ3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jplIDmn5DkuKrnm5HlkKxcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24g5aeU5omYXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmp9IGxpc3RlbmVyIOebkeWQrOiAhVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERlc1JlZ2lzdChuYW1lOnN0cmluZyxhY3Rpb246KCk9Pnt9LGxpc3RlbmVyOk9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDpNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuUm12KGFjdGlvbixsaXN0ZW5lcilcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo6ZSA5p+Q5Liq5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmdpc3RJREsobmFtZTpzdHJpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgdmFyIGdldEV2ZW50Ok1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICAgZ2V0RXZlbnQuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFRyaWdnZXIobmFtZTpzdHJpbmcscGFyYW06YW55ID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDpNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WnlOaJmFxyXG5leHBvcnQgY2xhc3MgRGVsZWdhdGVcclxue1xyXG4gICAgTGlzdGVuZXI6T2JqZWN0O1xyXG4gICAgQWN0aW9uOigpPT52b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiDop6blj5FcclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAqL1xyXG4gICAgIEV4ZWN1dGUoIHBhcmFtOmFueSA9IG51bGwgKVxyXG4gICAgIHtcclxuICAgICAgICAgdGhpcy5BY3Rpb24uY2FsbCh0aGlzLkxpc3RlbmVyLHBhcmFtKTtcclxuICAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihsaXN0ZW5lcjpPYmplY3QsYWN0aW9uOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICB0aGlzLkFjdGlvbiA9IGFjdGlvbjtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8v5LqL5Lu2XHJcbmV4cG9ydCBjbGFzcyBNRXZlbnRcclxue1xyXG4gICAgIERlbGVnYXRlTGlzdDpBcnJheTxEZWxlZ2F0ZT47XHJcbiAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgIHtcclxuICAgICAgICAgdGhpcy5SZXNldCgpO1xyXG4gICAgIH1cclxuICAgICAvKipcclxuICAgICAqIOa3u+WKoOWnlOaJmFxyXG4gICAgICogQHBhcmFtIHtEZWxlZ2F0ZX0gZGxnIOa2iOaBr+WQjeWtl1xyXG4gICAgICovXHJcbiAgICAgQWRkKGRsZzpEZWxlZ2F0ZSlcclxuICAgICB7XHJcbiAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0LnB1c2goZGxnKTtcclxuICAgICB9XHJcbiAgICAgLyoqXHJcbiAgICAgKiDnp7vpmaTlp5TmiZhcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvbiDmtojmga/lkI3lrZdcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lciDmtojmga/lkI3lrZdcclxuICAgICAqL1xyXG4gICAgIFJtdiggYWN0aW9uOigpPT57fSxsaXN0ZW5lcjpPYmplY3QgPSBudWxsIClcclxuICAgICB7XHJcbiAgICAgICAgIHZhciBkbGd0TGlzdDpBcnJheTxEZWxlZ2F0ZT4gPSB0aGlzLkRlbGVnYXRlTGlzdDtcclxuICAgICAgICAgZm9yKHZhciBhcnJJZHg6bnVtYmVyPWRsZ3RMaXN0Lmxlbmd0aCAtMSA7YXJySWR4Pi0xOy0tYXJySWR4KVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICB2YXIgZGxndCA9IGRsZ3RMaXN0W2FycklkeF07XHJcbiAgICAgICAgICAgICBpZihhY3Rpb24gPT0gZGxndC5BY3Rpb24mJiBsaXN0ZW5lciA9PSBkbGd0Lkxpc3RlbmVyIClcclxuICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgZGxndExpc3Quc3BsaWNlKGFycklkeCwxKTtcclxuICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcbiAgICAgLy/ph43nva5cclxuICAgICBSZXNldCgpXHJcbiAgICAge1xyXG4gICAgICAgICB0aGlzLkRlbGVnYXRlTGlzdCA9IFtdXHJcbiAgICAgfVxyXG4gICAgIC8qKlxyXG4gICAgICog6Kem5Y+RXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgKi9cclxuICAgICBFeGVjdXRlKCBwYXJhbTphbnkgKVxyXG4gICAgIHtcclxuICAgICAgICAgdmFyIGRsZ3RMaXN0OkFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICBmb3IodmFyIGFycklkeDpudW1iZXI9ZGxndExpc3QubGVuZ3RoIC0xIDthcnJJZHg+LTE7LS1hcnJJZHgpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgIGRsZ3QuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcbn1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vLi4vU2NlbmUvQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCJcclxuXHJcbi8qKuS9nOiAhU1vXHJcbiog5Zy65pmv5Yqf6IO9XHJcbiovXHJcbi8v5Zy65pmv566h55CGXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgX0JHOiBMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX0JHTGF5ZXI6IExheWEuU3ByaXRlO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLl9CR0xheWVyKTtcclxuICAgICAgICAvL+a3u+WKoOWcuuaZr+euoeeQhlxyXG4gICAgICAgIHRoaXMuU2NlbmVOb2RlID0gTGF5YS5zdGFnZS5hZGRDaGlsZChuZXcgTGF5YS5TcHJpdGUoKSk7XHJcbiAgICB9XHJcbiAgICBzZXQgQkcoYmc6IExheWEuU3ByaXRlKSB7XHJcbiAgICAgICAgaWYgKCFiZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9CRykge1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5yZW1vdmVTZWxmO1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgdGhpcy5fQkcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0JHLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIuYWRkQ2hpbGQodGhpcy5fQkcpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEJHKCk6TGF5YS5TcHJpdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX0JHO1xyXG4gICAgfVxyXG4gICAgU2NlbmVOb2RlOiBMYXlhLk5vZGU7XHJcblxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTY2VuZU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9DdXJTY2VuZTogQmFzZVNjZW5lO1xyXG4gICAgZ2V0IEN1clNjZW5lKCk6IEJhc2VTY2VuZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0N1clNjZW5lO1xyXG4gICAgfVxyXG4gICAgc2V0IEN1clNjZW5lKHZhbHVlOiBCYXNlU2NlbmUpIHtcclxuICAgICAgICBpZiAodGhpcy5fQ3VyU2NlbmUgJiYgdGhpcy5fQ3VyU2NlbmUuU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fQ3VyU2NlbmUuU2NlbmUucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9DdXJTY2VuZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9DdXJTY2VuZSAmJiB0aGlzLl9DdXJTY2VuZS5TY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLlNjZW5lTm9kZS5hZGRDaGlsZCh0aGlzLl9DdXJTY2VuZS5TY2VuZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IEN1ckRpcigpOiBCYXNlRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZS5DdXJEaXI7XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJTY2VuZSh0YXJnZXRTY2VuZTogQmFzZVNjZW5lKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZSA9IHRhcmdldFNjZW5lO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZS5MZWF2ZSh0YXJnZXRTY2VuZSk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL3VpL0Jhc2VVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge1VJRnVuY30gZnJvbSBcIi4vLi4vVXRpbGl0eS9VSUZ1bmNcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyAgVUlNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXJcclxue1xyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIHByaXZhdGUgX1VJTm9kZTpMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX01pZGxlVUlOb2RlOkxheWEuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBfVUlEaWN0OntbbmFtZTpzdHJpbmddOkJhc2VVSX07XHJcbiAgICBwcml2YXRlIF9VcGRhdGVDb3VudDpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fVUlOb2RlID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgdGhpcy5fVUlOb2RlLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9VSU5vZGUuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fVUlOb2RlLm5hbWUgPSBcIlVJTm9kZVwiO1xyXG4gICAgICAgIHRoaXMuX01pZGxlVUlOb2RlID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLl9VSU5vZGUpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fTWlkbGVVSU5vZGUpO1xyXG4gICAgICAgIHRoaXMuX1VJRGljdCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX1VwZGF0ZUNvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgXCJVSU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICAvL+WumuW4p+WIt+aWsFVJXHJcbiAgICAgICAgaWYodGhpcy5fVXBkYXRlQ291bnQ+MTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVVJKHRoaXMuX1VJTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkodGhpcy5fTWlkbGVVSU5vZGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlVUkobm9kZTpMYXlhLlNwcml0ZSlcclxuICAgIHtcclxuICAgICAgICBmb3IobGV0IGlkeDpudW1iZXI7aWR4PG5vZGUubnVtQ2hpbGRyZW47ICsraWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHVpOkJhc2VVSSA9IG5vZGUuZ2V0Q2hpbGRBdChpZHgpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgdWkuVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIEFkZFVJKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgU2hvdzxUIGV4dGVuZHMgQmFzZVVJPih1aUNsYXNzOntuZXcgKG5hbWU6c3RyaW5nKTogVDsgTmFtZSgpOnN0cmluZyB9KTpUXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHN0cjpzdHJpbmcgPSB1aUNsYXNzLk5hbWUoKTsgICAgXHJcbiAgICAgICAgdmFyIG5ld1VJOkJhc2VVSSA9IHRoaXMuR2V0VUlCeU5hbWUoc3RyKTtcclxuICAgICAgICBuZXdVSSA9IG5ld1VJPT1udWxsP3RoaXMuQWRkVUlCeU5hbWUoc3RyLG5ldyB1aUNsYXNzKHN0cikpOm5ld1VJO1xyXG4gICAgICAgIHZhciBub2RlOkxheWEuU3ByaXRlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2gobmV3VUkuVUlUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/kuK3lsYLmrKFVSVxyXG4gICAgICAgICAgICBjYXNlIEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fTWlkbGVVSU5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9NaWRsZVVJTm9kZS5udW1DaGlsZHJlbjw9MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+mAmuefpeWvvOa8lOaaguWBnOa4uOaIj1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuVGltZVVwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9VSU5vZGU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNoaWxkTnVtOm51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgLy/miorkupLmlqXnmoTnqpflj6PlhbPmjolcclxuICAgICAgICBpZihuZXdVSS5Jc011dGV4JiZjaGlsZE51bT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSSA9IG5vZGUuZ2V0Q2hpbGRBdChub2RlLm51bUNoaWxkcmVuLTEpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgbGFzdFVJLnZpc2libGUgPSAhbGFzdFVJLklzTXV0ZXg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlLmFkZENoaWxkKG5ld1VJKTtcclxuICAgICAgICBuZXdVSS5PcGVuT1AoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1VJIGFzIFQ7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2UodWk6QmFzZVVJKVxyXG4gICAge1xyXG4gICAgICAgIHVpLnJlbW92ZVNlbGYoKTtcclxuXHJcbiAgICAgICAgdWkuQ2xvc2VPUCgpO1xyXG4gICAgICAgIHZhciBub2RlOkxheWEuU3ByaXRlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2godWkuVUlUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/kuK3lsYLmrKFVSVxyXG4gICAgICAgICAgICBjYXNlIEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fTWlkbGVVSU5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZihub2RlLm51bUNoaWxkcmVuPD0wKVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5YWz6Zet56qX5Y+jIOmAmuefpea4uOaIj+e7p+e7rVxyXG4gICAgICAgICAgICAgICAgICAgIC8vQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuQ29udGludWVUaW1lKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9VSU5vZGU7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGROdW06bnVtYmVyID0gbm9kZS5udW1DaGlsZHJlbjtcclxuICAgICAgICBpZihjaGlsZE51bT4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSTpCYXNlVUkgPSBub2RlLmdldENoaWxkQXQoY2hpbGROdW0tMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICBsYXN0VUkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIENsb3NlQ3VyVmlldygpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHVpOkJhc2VVSSA9dGhpcy5fVUlOb2RlLmdldENoaWxkQXQodGhpcy5fVUlOb2RlLm51bUNoaWxkcmVuLTEpIGFzIEJhc2VVSTtcclxuICAgICAgICB0aGlzLkNsb3NlKHVpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIoOmZpOaJgOacieiKgueCueS4iueahFVJXHJcbiAgICBDbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHVpTm9kZSA9IHRoaXMuX1VJTm9kZTtcclxuICAgICAgICB3aGlsZSAodWlOb2RlLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlOb2RlID0gdGhpcy5fTWlkbGVVSU5vZGVcclxuICAgICAgICB3aGlsZSAodWlOb2RlLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VUlCeU5hbWUobmFtZTpzdHJpbmcpOkJhc2VVSVxyXG4gICAge1xyXG4gICAgICAgIHZhciB1aSA9IHRoaXMuX1VJRGljdFtuYW1lXTtcclxuICAgICAgICB1aSA9IHVpPT11bmRlZmluZWQ/bnVsbDp1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcbiAgICBBZGRVSUJ5TmFtZShuYW1lOnN0cmluZyx1aTpCYXNlVUkpOkJhc2VVSVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJRGljdFtuYW1lXSA9IHVpO1xyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuICAgIFxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJCRy5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L1JvbGVFbGVtZW50LnRzXCIsUm9sZUVsZW1lbnQpO1xuICAgICAgICByZWcoXCJzY3JpcHQvSXRlbUVsZW1lbnQudHNcIixJdGVtRWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuIC8qKlxyXG4gKiDooajnjrDnlKjnmoTlr7nosaFcclxuICovXHJcbmV4cG9ydCBtb2R1bGUgQW5pbU9ialxyXG57XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKTtcclxuICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICBmb3IoIGxldCBjb3VudCA9MDtjb3VudCA8IDMwOysrY291bnQgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2VuQW5pbU9iajxBbmltQ29pbj4oQW5pbUNvaW4sbW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZW5BbmltT2JqPFQgZXh0ZW5kcyBCYXNlQW5pbU9iaj4oIGFuaW1DbGFzczp7bmV3IChuYW1lOnN0cmluZyxtb2RlbDpMYXlhLlNwcml0ZTNEKTogVDsgTmFtZSgpOnN0cmluZyB9LG1vZGVsOkxheWEuU3ByaXRlM0QgKTpUXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFuaW1PYmogPSBMYXlhLlBvb2wuZ2V0SXRlbShhbmltQ2xhc3MuTmFtZSgpKTtcclxuICAgICAgICBpZihhbmltT2JqPT1udWxsKVxyXG4gICAgICAgICAgICBhbmltT2JqID0gbmV3IGFuaW1DbGFzcyhhbmltQ2xhc3MuTmFtZSgpLG1vZGVsKTtcclxuICAgICAgICByZXR1cm4gYW5pbU9iajtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYWJzdHJhY3QgY2xhc3MgQmFzZUFuaW1PYmogZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbiAgICB7XHJcbiAgICAgICAgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlNjZW5lLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fRnJhbWVGdW5jKVxyXG4gICAgICAgIH1cclxuICAgICAgICBNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSBfTmFtZTpzdHJpbmc7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5fTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMub24oTGF5YS5FdmVudC5SRU1PVkVELHRoaXMsdGhpcy5fTGVhdmVTdGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBfRnJhbWVGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fSnVkZ2VDb21wbGV0ZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9GcmFtZUxvZ2ljRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+avj+W4p+aJp+ihjOmAu+i+keWKn+iDvVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICAvL+WIpOaWreS7u+WKoeWujOaIkFxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfSnVkZ2VDb21wbGV0ZSgpOmJvb2xlYW47XHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/nu5PmnZ/lpITnkIZcclxuICAgICAgICBwcm90ZWN0ZWQgX0xlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIodGhpcyx0aGlzLl9GcmFtZUZ1bmMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRm9yY2VMZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTGVhdmVTdGFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIEFuaW1Db2luIGV4dGVuZHMgQmFzZUFuaW1PYmpcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiQW5pbUNvaW5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgU2V0VGFyZ2V0KCB0YXJnZXQ6TGF5YS5TcHJpdGUzRCApICAgIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICBzdXBlci5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9UYXJnZXQ6TGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyxtb2RlbDpMYXlhLk1lc2hTcHJpdGUzRCA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihuYW1lLG1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBtb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+avj+W4p+aJp+ihjOmAu+i+keWKn+iDvVxyXG4gICAgICAgIHByb3RlY3RlZCBfRnJhbWVMb2dpY0Z1bmMoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGFkZFBTID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UG9zaXRpb24scG9zaXRpb24sYWRkUFMpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUoYWRkUFMsMC4xLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLmFkZChhZGRQUyxwb3NpdGlvbixwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/nu5PmnZ/lpITnkIZcclxuICAgICAgICBwcm90ZWN0ZWQgX0xlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5fTGVhdmVTdGFnZSgpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkFkZExvZ2ljR29sZCgxKTtcclxuICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIodGhpcy5uYW1lLHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+WIpOaWreS7u+WKoeWujOaIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfSnVkZ2VDb21wbGV0ZSgpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRQb3NpdGlvbiA9IHRoaXMuX1RhcmdldC50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgZGlzRGlyID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UG9zaXRpb24scG9zaXRpb24sZGlzRGlyKTtcclxuICAgICAgICAgICAgaWYoIExheWEuVmVjdG9yMy5zY2FsYXJMZW5ndGhTcXVhcmVkKGRpc0Rpcik8MC4xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQge1BsYXllckNvbnRyb2xlcn0gZnJvbSBcIi4vLi4vR2FtZS9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL0lucHV0XCI7XHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi9HYW1lU3RydWN0XCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vLi4vR2FtZS9TdGVwXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5leHBvcnQgbW9kdWxlIFBsYXllckJ1ZmZcclxue1xyXG4gICAgZXhwb3J0IGNsYXNzIEJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgVHlwZTpJdGVtLkl0ZW1UeXBlO1xyXG4gICAgICAgIElkeDpudW1iZXI7XHJcbiAgICAgICAgUGxheWVyOlBsYXllcjtcclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2VuQnVmZk1vZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTW9kID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVTcGhlcmUoMC4zLDgsOCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgICAgIC8v5Yib5bu65qih5Z6L5pi+56S65a+56LGhXHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkFkZEJ1ZmZNb2RlKHRoaXMuX0J1ZmZNb2QpO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9TdGFydEZ1bmMhPW51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1N0YXJ0RnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgQ29tcGxldGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQ29tcGxldGVCdWZmKHRoaXMuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5fQnVmZk1vZC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcHJvdGVjdGVkIF9CdWZmTW9kOkxheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IodHlwZTpJdGVtLkl0ZW1UeXBlLGlkeDpudW1iZXIgPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5JZHggPSBpZHg7XHJcbiAgICAgICAgICAgIHRoaXMuR2VuQnVmZk1vZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9TdGFydEZ1bmM6KCk9PnZvaWQ7XHJcbiAgICB9XHJcbiAgICBjbGFzcyBGbHlCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBTcGVlZDpudW1iZXI7XHJcbiAgICAgICAgRmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IHBsYXllci5DdXJTdGVwLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uLlkgKz10aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZS8yKnRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KCkpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLlNldFNhZmVQUyh0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjpudW1iZXI7ICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6bnVtYmVyPTAuMSxmbG9vcjpudW1iZXI9MTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtLkl0ZW1UeXBlLlJvcGUsUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5fRmluYWxaIC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24uej4tMC4yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HZXRTdGVwQnlMb2NhdGlvbih0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuUG9wQ3RybGVyKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGFzcyBQcm90ZWN0QnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgVGltZTpudW1iZXI7XHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOm51bWJlciA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtLkl0ZW1UeXBlLlByb3RlY3QsUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gQVBQLlNjZW5lTWFuYWdlci5DdXJEaXIuR2FtZVRpbWUrdGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVGltZTxBUFAuU2NlbmVNYW5hZ2VyLkN1ckRpci5HYW1lVGltZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFZpbmVCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBDb3VudFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIElucHV0RGlyOmJvb2xlYW47XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQodGhpcyx0aGlzLl9JbnB1dCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDb21wbGV0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvdW50VGltZTpudW1iZXIgPSAzLGlucHV0RGlyOmJvb2xlYW4gPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbS5JdGVtVHlwZS5WaW5lLDApO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50VGltZSA9IGNvdW50VGltZTtcclxuICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9IGlucHV0RGlyO1xyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZTtcclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpc1JpZ2h0OmJvb2xlYW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLklucHV0RGlyID09IGlzUmlnaHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSF0aGlzLklucHV0RGlyO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLkNvdW50VGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLkNvdW50VGltZTwwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1Nob3dHYW1lSW5mbygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzpzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ291bnRUaW1lPDApXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gXCJcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuSW5wdXREaXIgPT0gdHJ1ZT9cIlJpZ2h0XCI6XCJMZWZ0XCI7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuU2hvd0lucHV0SW5mbyhpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuLy/muLjmiI/kuK3nm7jmnLpcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNhbWVyYSBleHRlbmRzIExheWEuQ2FtZXJhXHJcbntcclxuICAgIEN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIEJhc2VQUzpMYXlhLlZlY3RvcjM7XHJcbiAgICBEeW5hbWljUFM6TGF5YS5WZWN0b3IzO1xyXG4gICAgUGxheWVyOlBsYXllcjtcclxuXHJcbiAgICBTZXRQbGFlcihwbGF5ZXI6UGxheWVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBSZXNldChEeW5hbWljUFM6TGF5YS5WZWN0b3IzLGJhc2VQUzpMYXlhLlZlY3RvcjMscGxheWVyOlBsYXllciApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5CYXNlUFMgPSBiYXNlUFM7XHJcbiAgICAgICAgdGhpcy5EeW5hbWljUFMgPSBEeW5hbWljUFM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orqHnrpflubborr7nva7kvY3nva5cclxuICAgIENvdW50U2V0UFMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5hZGQodGhpcy5CYXNlUFMsdGhpcy5EeW5hbWljUFMsbmV3UFMpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBzZXQgUG9zaXRpb24ocHM6TGF5YS5WZWN0b3IzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcHMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpOkxheWEuVmVjdG9yM1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHsgICBcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ3RybGVyID0gbmV3IEdhbWVDYW1lcmFDdHJsZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5EeW5hbWljUFMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuQmFzZVBTID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gbnVsbDtcclxuICAgICAgICAvL3RoaXMudGltZXJMb29wKDEsdGhpcy5DdHJsZXIsdGhpcy5DdHJsZXIuVXBkYXRlKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fVXBkYXRlKTtcclxuICAgICAgICB2YXIgc2t5Qm94OkxheWEuU2t5Qm94ID1uZXcgTGF5YS5Ta3lCb3goKTtcclxuICAgICAgICB0aGlzLmNsZWFyRmxhZyA9IExheWEuQmFzZUNhbWVyYS5DTEVBUkZMQUdfU0tZO1xyXG4gICAgICAgIC8vQ2FtZXJhLnNreVJlbmRlcmVyID0gc2t5Qm94Ll9yZW5kZXI7XHJcbiAgICAgICAgLy90aGlzLnNrID0gc2t5Qm94O1xyXG4gICAgICAgICAvL3BhdGhcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1VwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIEJhc2VHYW1lQ2FtZXJhQ3RybGVyXHJcbntcclxuICAgIENhbWVyYTpHYW1lQ2FtZXJhO1xyXG4gICAgQ3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyO1xyXG4gICAgYWJzdHJhY3QgVXBkYXRlKCk6dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBjYW1lcmE6R2FtZUNhbWVyYSxjdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXIgPSBudWxsIClcclxuICAgIHtcclxuICAgICAgICBpZihjdHJsZXIgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgY3RybGVyID0gdGhpczsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gY2FtZXJhO1xyXG4gICAgICAgIHRoaXMuQ3RybGVyID0gY3RybGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ2FtZXJhQ3RybGVyIGV4dGVuZHMgQmFzZUdhbWVDYW1lcmFDdHJsZXJcclxue1xyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkNhbWVyYT09bnVsbHx8IHRoaXMuQ2FtZXJhLlBsYXllciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgQ2FtZXJhUFMgPSB0aGlzLkNhbWVyYS5EeW5hbWljUFM7XHJcbiAgICAgICAgdmFyIFBsYXllclBTID0gdGhpcy5DYW1lcmEuUGxheWVyLl9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgICAgIENhbWVyYVBTLnggPSAwO1xyXG4gICAgICAgIHZhciBkaXNOdW0gPSBQbGF5ZXJQUy55IC0gQ2FtZXJhUFMueTtcclxuICAgICAgICB2YXIgZGlzWk51bSA9IFBsYXllclBTLnogLSBDYW1lcmFQUy56O1xyXG4gICAgICAgIGlmKE1hdGguYWJzKGRpc051bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnkgKz0gZGlzTnVtKjAuMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIE1hdGguYWJzKGRpc1pOdW0pPjAuMDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy56ICs9IGRpc1pOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5DYW1lcmEuRHluYW1pY1BTID1DYW1lcmFQUztcclxuICAgICAgICB0aGlzLkNhbWVyYS5Db3VudFNldFBTKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FtZXJhOkdhbWVDYW1lcmEsY3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBzdXBlcihjYW1lcmEsY3RybGVyKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7UGxheWVyQnVmZn0gZnJvbSBcIi4vQnVmZlwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtBbmltT2JqfSBmcm9tIFwiLi8uLi9HYW1lL0FuaW1PYmpcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCB7UGxheWVyQ29udHJvbGVyfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL0lucHV0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG50eXBlIEJhc2VQbGF5ZXJCdWZmID0gUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZjtcclxudHlwZSBBbmltQ29pbiA9IEFuaW1PYmouQW5pbUNvaW5cclxuXHJcbmV4cG9ydCBtb2R1bGUgSXRlbVxyXG57XHJcbiAgICAvL+eJqeWTgeagh+ivhlxyXG4gICAgY29uc3QgSXRlbUlEOnN0cmluZyA9IFwiSXRlbVwiO1xyXG4gICAgY29uc3QgTW9kZWxJRDpzdHJpbmcgPVwiTW9kZWxcIlxyXG4gICAgZXhwb3J0IGVudW0gTW9kZWxUeXBlXHJcbiAgICB7XHJcbiAgICAgICAgQ29pblxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGVudW0gSXRlbVR5cGUge1xyXG4gICAgICAgIE5vbmU9MCxcclxuICAgICAgICBFbXB0eSxcclxuICAgICAgICBSb2NrLFxyXG4gICAgICAgIFRob3JuLFxyXG4gICAgICAgIFByb3RlY3Q9MTEsXHJcbiAgICAgICAgSG9seVByb3RlY3QsXHJcbiAgICAgICAgRmx5LFxyXG4gICAgICAgIFJvcGUsXHJcbiAgICAgICAgVmluZSxcclxuICAgICAgICBDb2xsZWN0b3IsXHJcbiAgICAgICAgQ29pbj0yMCxcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIExpbmVJdGVtSW5mb1xyXG4gICAge1xyXG4gICAgICAgIFR5cGU6SXRlbVR5cGU7XHJcbiAgICAgICAgTnVtYmVyOm51bWJlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggdHlwZTpJdGVtVHlwZSxudW06bnVtYmVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtYmVyID0gbnVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/nianlk4HluIPlsYBcclxuICAgIGV4cG9ydCBjbGFzcyBJdGVtTGF5b3V0XHJcbiAgICB7XHJcbiAgICAgICAgUmV3YXJkTGlzdDpBcnJheTxMYXlJdGVtTWdyPjtcclxuICAgICAgICBCYXJyaWVyTGlzdDpBcnJheTxMYXlJdGVtTWdyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QgPSBuZXcgQXJyYXk8TGF5SXRlbU1ncj4oKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsMTEsSXRlbVR5cGUuRW1wdHksMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDQsSXRlbVR5cGUuUm9jaywxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsMixJdGVtVHlwZS5UaG9ybiwxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTUsMixJdGVtVHlwZS5WaW5lKSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDQsSXRlbVR5cGUuQ29pbikpXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDEsSXRlbVR5cGUuQ29sbGVjdG9yKSlcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsMixJdGVtVHlwZS5GbHkpKVxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigyMCwyLEl0ZW1UeXBlLlByb3RlY3QsMykpO1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigyMCwyLEl0ZW1UeXBlLkhvbHlQcm90ZWN0LDMpKTtcclxuICAgICAgICAgICAvL3RoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDEwLEl0ZW1UeXBlLkNvaW4pKVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL3RoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCw2MCxJdGVtVHlwZS5GbHkpKVxyXG4gICAgICAgICAgICBSZXNldEl0ZW1GYWN0b3J5KCApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBUYWtlTGluZVJld2FyZChmbG9vcjpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vcix0aGlzLlJld2FyZExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBUYWtlTGluZURpZmZpY3VsdHkoZmxvb3I6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVGFrZUl0ZW0oZmxvb3IsdGhpcy5CYXJyaWVyTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgVGFrZUl0ZW0oZmxvb3I6bnVtYmVyLCBNZ3JMaXN0OkFycmF5PExheUl0ZW1NZ3I+KTpBcnJheTxMaW5lSXRlbUluZm8+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmV0dXJuSW5mbyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgICAgIGZvciggdmFyIGxpc3RJZHggPSAwOyBsaXN0SWR4IDwgTWdyTGlzdC5sZW5ndGg7ICsrbGlzdElkeCApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1nckxpc3RbbGlzdElkeF0uT25GbG9vcihmbG9vcik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mbzpMaW5lSXRlbUluZm8gPSBNZ3JMaXN0W2xpc3RJZHhdLlRha2VJdGVtcyhmbG9vcik7XHJcbiAgICAgICAgICAgICAgICBpZihpbmZvLk51bWJlcj4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkluZm8ucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuSW5mbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6K+l5a+56LGh55qE5YiG5biD5Zu+5q+P5bGC562J5qaC546H5YiG5biDXHJcbiAgICBleHBvcnQgY2xhc3MgTGF5SXRlbU1nclxyXG4gICAge1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgSXRlbVR5cGU6SXRlbVR5cGU7XHJcbiAgICAgICAgLy/lvZPliY3lsYLmlbBcclxuICAgICAgICBDdXJGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgLy/ljLrpl7TliIbluIPmgLvmlbDph49cclxuICAgICAgICBJdGVtTnVtOm51bWJlcjtcclxuICAgICAgICAvL+W8gOWni+WIhuW4g+eahOWxguaVsFxyXG4gICAgICAgIFN0YXJ0Rmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIC8v5YiG5biD5Yy66Ze0XHJcbiAgICAgICAgLy/lt7Lojrflj5blsYLmoIforrBcclxuICAgICAgICBUb3VjaGVkRmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIEl0ZW1MaXN0OkFycmF5PG51bWJlcj47XHJcbiAgICAgICAgLy9yYW5nZeWMuumXtOiMg+WbtFxyXG4gICAgICAgIC8vbnVtIOWMuumXtOiMg+WbtOaVsOmHj1xyXG4gICAgICAgIC8vaXRlbVR5cGUg55Sf5Lqn55qE6YGT5YW357G75Z6LXHJcbiAgICAgICAgLy9zdGFydEZsb29yIOS7juWTquS4gOihjOW8gOWni+aKleaOt1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCByYW5nZTpudW1iZXIsbnVtOm51bWJlcixpdGVtVHlwZTpJdGVtVHlwZSxzdGFydEZsb29yOm51bWJlciA9IDEgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYobnVtID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICBudW0gPSAxO1xyXG4gICAgICAgICAgICBpZihzdGFydEZsb29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIC8v56ysMOWxguaYr+eOqeWutui1t+atpeS9jee9rlxyXG4gICAgICAgICAgICAgICAgc3RhcnRGbG9vciA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5DdXJGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbU51bSA9IG51bTtcclxuICAgICAgICAgICAgLy/liIbluIPlm74g54mp5ZOBaWR4OuWxguaVsFxyXG4gICAgICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5PG51bWJlcj4ocmFuZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuR2VuTWFwKHN0YXJ0Rmxvb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBSYW5nZSgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLkl0ZW1MaXN0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsYLmm7TmlrDlh73mlbBcclxuICAgICAgICBPbkZsb29yKGZsb29yOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGZsb29yPHRoaXMuVG91Y2hlZEZsb29yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZmxvb3I+PXRoaXMuU3RhcnRGbG9vciArIHRoaXMuUmFuZ2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2VuTWFwKGZsb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUn+aIkOWIhuW4g+WbvlxyXG4gICAgICAgIEdlbk1hcChzdGFydEZsb29yOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnRGbG9vciA9IHN0YXJ0Rmxvb3I7XHJcbiAgICAgICAgICAgIHZhciBpdGVtTnVtID0gdGhpcy5JdGVtTnVtO1xyXG4gICAgICAgICAgICBmb3IobGV0IGNvdW50Om51bWJlciA9IDA7IGNvdW50PCB0aGlzLkl0ZW1MaXN0Lmxlbmd0aDsrK2NvdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkl0ZW1MaXN0W2NvdW50XSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGl0ZW1MaXN0ID0gdGhpcy5JdGVtTGlzdDtcclxuICAgICAgICAgICAgZm9yKHZhciBjb3VudE51bTpudW1iZXIgPSAwOyBjb3VudE51bTxpdGVtTnVtOysrY291bnROdW0pXHJcbiAgICAgICAgICAgIHsgICBcclxuICAgICAgICAgICAgICAgIHZhciBJdGVtRmxvb3I6bnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMuUmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JdGVtTGlzdFtJdGVtRmxvb3JdICs9MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFRha2VJdGVtcyggZmxvb3I6bnVtYmVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG91Y2hlZEZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGluZUl0ZW1JbmZvKHRoaXMuSXRlbVR5cGUsdGhpcy5JdGVtTGlzdFtmbG9vciAtIHRoaXMuU3RhcnRGbG9vcl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIFJlc2V0OmJvb2xlYW47XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUmVzZXRJdGVtRmFjdG9yeSggKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUmVzZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBSZXNldCA9dHJ1ZTtcclxuICAgICAgICBmb3IodmFyIHRoZUtleSBpbiBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gcGFyc2VJbnQodGhlS2V5KTtcclxuICAgICAgICAgICAgaWYodHlwZSA8PSAyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKCBsZXQgY291bnQgPTA7Y291bnQgPCAzMDsrK2NvdW50IClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXM6IGFueSA9IEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW06U3RlcCA9IG5ldyBjbGFzKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoSXRlbUlEK3RoZUtleSxpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTdGVwSXRlbUZhY3RvcnkoIGl0ZW1UeXBlOkl0ZW1UeXBlLFN0ZXApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoU3RlcCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaXRlbVxyXG4gICAgICAgIHZhciBvYmpQb29sID0gTGF5YS5Qb29sO1xyXG4gICAgICAgIGl0ZW0gPSBvYmpQb29sLmdldEl0ZW0oSXRlbUlEK2l0ZW1UeXBlKVxyXG4gICAgICAgIGlmKGl0ZW09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV0hPW51bGwmJkdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXSE9dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xhczogYW55ID0gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBjbGFzKFN0ZXApO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IFN0ZXBJdGVtKGl0ZW1UeXBlLFN0ZXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5TdGVwID0gU3RlcDtcclxuICAgICAgICBpdGVtLlJlc2V0SXRlbSgpO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBTdGVwOlN0ZXA7XHJcbiAgICAgICAgSXRlbVR5cGU6SXRlbVR5cGU7XHJcbiAgICAgICAgTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBnZXQgSXNEaWZmaWN1bHR5KCk6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGU+MCYmdGhpcy5JdGVtVHlwZTwxMDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+WIpOaWreiDveS4jeiDvei1sOS4iuWOu1xyXG4gICAgICAgIGdldCBJc0ZvcmJpZGVuKCk6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGUgPT0gSXRlbVR5cGUuUm9jaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldEl0ZW0oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy90aGlzLl9Jbml0SXRlbU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0RW5hYmxlKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuTW9kZWwhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0ZXAuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBTZXRFbmFibGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5Nb2RlbD09bnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwuYWN0aXZlID10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBQdXRJdGVtID0gZnVuY3Rpb24oIGl0ZW1UeXBlID0gSXRlbVR5cGUuTm9uZSApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkRlc1Bhd24oKTtcclxuICAgICAgICAgICAgdGhpcy5TdGVwLlN0ZXBJdGVtID0gU3RlcEl0ZW1GYWN0b3J5KGl0ZW1UeXBlLHRoaXMuU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/mtojpmaQg5oqK6Ieq5bex5a2Y5YWl5YaF5a2Y5rGgXHJcbiAgICAgICAgRGVzUGF3bigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLk1vZGVsIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Nb2RlbC5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHZhciBvYmpQb29sID0gTGF5YS5Qb29sOy8vR00uT2JqUG9vbDtcclxuICAgICAgICAgICAgb2JqUG9vbC5yZWNvdmVyKEl0ZW1JRCt0aGlzLkl0ZW1UeXBlLHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5JdGVtVHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog56qB56C05L+d5oqkXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm6KKr56qB56C0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQnJlYWtQcm90ZWN0KHBsYXllcjpQbGF5ZXIpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjdXJCdWZmID0gcGxheWVyLkdldEJ1ZmYoUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgaWYoY3VyQnVmZilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKGN1ckJ1ZmYuVHlwZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckJ1ZmYuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkhvbHlQcm90ZWN0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAgZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBpdGVtVHlwZTpJdGVtVHlwZSxTdGVwOlN0ZXAgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5TdGVwID0gU3RlcDtcclxuICAgICAgICAgICAgdGhpcy5JdGVtVHlwZSA9IGl0ZW1UeXBlO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9Jbml0SXRlbU1vZGVsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXI6UGxheWVyLGJ1ZmY6QmFzZVBsYXllckJ1ZmYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuQWRkQnVmZihidWZmKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5pdEl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiggdGhpcy5Nb2RlbCE9bnVsbCYmIXRoaXMuTW9kZWwuZGVzdHJveWVkIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwcyA9IG5ldyBMYXlhLlZlY3RvcjMoMCxDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoLDApO1xyXG4gICAgICAgICAgICB0aGlzLl9HZW5JdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5Nb2RlbClcclxuICAgICAgICAgICAgICAgIHRoaXMuTW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gcHM7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLkl0ZW1UeXBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvY2s6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjMsIDAuMywgMC41KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xhc3MgUm9jayBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBNb2RlbE51bSA9IDM7XHJcbiAgICAgICAgY29uc3RydWN0b3IoU3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9jayxTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuTWVzaFNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IDErTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKlJvY2suTW9kZWxOdW0pO1xyXG4gICAgICAgICAgICB2YXIgTmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzBcIitpZHgpXHJcbiAgICAgICAgICAgIG1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKE5hbWUpXHJcbiAgICAgICAgICAgIG1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb2NrXSA9IFJvY2s7XHJcbiAgICBcclxuICAgIGNsYXNzIFRob3JuIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihTdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5UaG9ybixTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLkJyZWFrUHJvdGVjdChwbGF5ZXIpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5UcmlnZ2VyKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlRob3JuXSA9IFRob3JuO1xyXG4gICAgXHJcbiAgICBjbGFzcyBQcm90ZWN0IGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Qcm90ZWN0LHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX3NoaWVsZF8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKFByb3RlY3RCdWZmLklkeCkhPW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXIsbmV3IFByb3RlY3RCdWZmKDMwMDApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Qcm90ZWN0XSA9IFByb3RlY3Q7XHJcbiAgICBcclxuICAgIGNsYXNzIFByb3RlY3RCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHRpbWUg5oyB57ut5pe26Ze0XHJcbiAgICAgICAgICogQHBhcmFtIElzSG9seSDmmK/lkKbnu53lr7nml6DmlYxcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOm51bWJlciA9IDAsIElzSG9seTpib29sZWFuID0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJc0hvbHkgPyBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpJdGVtVHlwZS5Qcm90ZWN0LFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5TY2VuZU1hbmFnZXIuQ3VyRGlyLkdhbWVUaW1lK3RpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU8QVBQLlNjZW5lTWFuYWdlci5DdXJEaXIuR2FtZVRpbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsYXNzIEhvbHlQcm90ZWN0IGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Ib2x5UHJvdGVjdCxzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKFByb3RlY3RCdWZmLklkeCkhPW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXIsbmV3IFByb3RlY3RCdWZmKDMwMDAsdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkhvbHlQcm90ZWN0XSA9IEhvbHlQcm90ZWN0O1xyXG5cclxuICAgIGNsYXNzIENvaW4gZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIEZseVRvUGxheWVyKHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY29uaW46QW5pbUNvaW4gPSBBbmltT2JqLkdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1PYmouQW5pbUNvaW4sdGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIGNvbmluLlNldFRhcmdldChwbGF5ZXIpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkFkZEdvbGRVbkxvZ2ljR29sZCgxKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkFkZEdvbGQoMSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2luLHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkNvaW5dID0gQ29pbjtcclxuICAgIFxyXG4gICAgY2xhc3MgQ29sbGVjdGVyIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGxheWVyLkdldEJ1ZmYoQ29sbGVjdEJ1ZmYuSWR4KSE9bnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYobmV3IENvbGxlY3RCdWZmKDEwMDAwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2xsZWN0b3Isc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSsgTWF0aC5yYW5kb20oKSoyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fYWJzb3JkXCIpO1xyXG4gICAgICAgICAgICB2YXIgdGhlTW9kZWwgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gdGhlTW9kZWwuY2xvbmUoKTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkNvbGxlY3Rvcl0gPSBDb2xsZWN0ZXI7XHJcbiAgICBcclxuICAgIGNsYXNzIENvbGxlY3RCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIEdhbWVEaXI6R2FtZURpcmVjdG9yO1xyXG4gICAgICAgIENvdW50Rmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTpudW1iZXIgPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUHJvdGVjdCxDb2xsZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVEaXIgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyO1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSB0aGlzLkdhbWVEaXIuR2FtZVRpbWUrdGltZTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudEZsb29yID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRGbG9vciA9IHRoaXMuR2FtZURpci5QbGF5ZXJGbG9vciAtIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU8dGhpcy5HYW1lRGlyLkdhbWVUaW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuR2FtZURpci5QbGF5ZXJGbG9vciAtIHRoaXMuQ291bnRGbG9vcisxPDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5HYW1lRGlyLkxvb3BEb0Zsb29yU3RlcCh0aGlzLkNvdW50Rmxvb3IsdGhpcyx0aGlzLkNvdW50Q29pbnMpO1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLkNvdW50Rmxvb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBDb3VudENvaW5zKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHN0ZXAuU3RlcEl0ZW0uSXRlbVR5cGUgPT0gSXRlbVR5cGUuQ29pbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIENvaW46Q29pbiA9IHN0ZXAuU3RlcEl0ZW0gYXMgQ29pbjtcclxuICAgICAgICAgICAgICAgIENvaW4uRmx5VG9QbGF5ZXIodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGFzcyBGTHkgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZigwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYobmV3IEZseUJ1ZmYoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkZseSxzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxKyBNYXRoLnJhbmRvbSgpKjIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTsgXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuRmx5XSA9IEZMeTtcclxuICAgIFxyXG4gICAgY2xhc3MgRmx5QnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBTcGVlZDpudW1iZXI7XHJcbiAgICAgICAgRmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgdmFyIHRpbWU6bnVtYmVyID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5DdXJTdGVwID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPXRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlLzIqdGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmbHlDdHJsID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJGbHkodGhpcy5TcGVlZCk7XHJcbiAgICAgICAgICAgIGZseUN0cmwuU2V0UGxheWVyKHBsYXllcilcclxuICAgICAgICAgICAgcGxheWVyLkFkZEN0cmxlcihmbHlDdHJsKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQoKSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICBwbGF5ZXIuRmx5UHJlcGFyZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjpudW1iZXI7ICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6bnVtYmVyPTAuMTUsZmxvb3I6bnVtYmVyPTEwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9wZSxQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLl9GaW5hbFogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56Pi0wLjIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Qb3BDdHJsZXIoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xhc3MgUm9wZSBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKDApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgUm9wZUJ1ZmYoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUsc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjEsMC41LDAuMSkpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUm9wZV0gPSBSb3BlO1xyXG4gICAgXHJcbiAgICBjbGFzcyBSb3BlQnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBTcGVlZDpudW1iZXI7XHJcbiAgICAgICAgRmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLl9GaW5hbFogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56Pi0wLjIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5FbmQoc3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgRW5kKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9dGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gcGxheWVyLlBvc2l0aW9uLnogLSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMip0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDpudW1iZXI9MC4xLGZsb29yOm51bWJlcj0xMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUsUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0lucHV0KGlzUmlnaHQ6Ym9vbGVhbik6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlRmxvb3IgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLlBsYXllckZsb29yTGluZTtcclxuICAgICAgICAgICAgaWYoY2xvc2VGbG9vci5GbG9vck51bSUyIT0gdGhpcy5fRmluYWxMb2NhdGlvbi5ZJTIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlRmxvb3IgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdldEZsb29yQnlGbG9vcihjbG9zZUZsb29yLkZsb29yTnVtICsxICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IGNsb3NlRmxvb3IuR2V0U3RlcCggdGhpcy5fRmluYWxMb2NhdGlvbi5YICk7XHJcbiAgICAgICAgICAgIGlmKGlzUmlnaHQpXHJcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICAgICAgaWYoc3RlcC5TdGVwSXRlbS5Jc0ZvcmJpZGVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkVuZChzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsYXNzIFZpbmUgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY3VyQnVmZjpCYXNlUGxheWVyQnVmZiA9IHBsYXllci5HZXRCdWZmKDApO1xyXG4gICAgICAgICAgICBpZighdGhpcy5CcmVha1Byb3RlY3QocGxheWVyKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYobmV3IFZpbmVCdWZmKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5WaW5lLHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDErIE1hdGgucmFuZG9tKCkqMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IElkeCA9PSAxPyBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKTpwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpXHJcbiAgICAgICAgICAgIC8vdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIilcclxuICAgICAgICAgICAgLy92YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpOyBcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5WaW5lXSA9IFZpbmU7XHJcbiAgICBcclxuICAgIGNsYXNzIFZpbmVCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIENvdW50VGltZTpudW1iZXI7XHJcbiAgICAgICAgSW5wdXREaXI6Ym9vbGVhbjtcclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENvbXBsZXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoY291bnRUaW1lOm51bWJlciA9IDQsaW5wdXREaXI6Ym9vbGVhbiA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5WaW5lLDApO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50VGltZSA9IGNvdW50VGltZTtcclxuICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9IGlucHV0RGlyO1xyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZTtcclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpbnB1dERpcjpib29sZWFuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5JbnB1dERpciA9PSBpbnB1dERpcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9IXRoaXMuSW5wdXREaXI7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuQ291bnRUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ291bnRUaW1lPD0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1Nob3dHYW1lSW5mbygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzpzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ291bnRUaW1lPD0wKVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLklucHV0RGlyID09IHRydWU/XCJSaWdodFwiOlwiTGVmdFwiO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiZXhwb3J0IG1vZHVsZSBHYW1lU3RydWN0XHJcbntcclxuICAgIGV4cG9ydCBjbGFzcyBTZXRJbmZvIHtcclxuICAgICAgICBBdWRpb09uOiBib29sZWFuO1xyXG4gICAgICAgIE9QSXNSaWdodDogYm9vbGVhbjtcclxuICAgICAgICBUZXh0SW5mbzogc3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLkF1ZGlvT24gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLk9QSXNSaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVGV4dEluZm8gPSBcIkhlbGxvIFxcbiBIZWxsb1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBNTG9jYXRpb25cclxuICAgIHtcclxuICAgICAgICBnZXQgWCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0FyclswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFgoeDpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnJbMF0gPXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBZKCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQXJyWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgWSh5Om51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyclsxXSA9IHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0FycjpBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCB4Om51bWJlcix5Om51bWJlciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnIgPSBbeCx5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgdmFyIEl0ZW1EaWN0VHlwZTp7W0l0ZW1UeXBlOm51bWJlcl06YW55fTtcclxuICAgIEl0ZW1EaWN0VHlwZSA9IHsgfTtcclxufSIsIi8qKuS9nOiAhTpNb1xyXG4gKiDovpPlhaXnrqHnkIbnm7jlhbNcclxuICovXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZURpcmVjdG9yXCJcclxuZXhwb3J0IG1vZHVsZSBJbnB1dFxyXG57XHJcbi8v5Z+656GA6L6T5YWl5o6n5Yi25ZmoXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlR2FtZUlucHV0XHJcbntcclxuICAgIC8v5YWs5pyJXHJcbiAgICBOZXh0SW5wdXQ6QmFzZUdhbWVJbnB1dDtcclxuICAgIGFic3RyYWN0IElucHV0KGlzUmlnaHQ6Ym9vbGVhbik7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIGlucHV0IDpCYXNlR2FtZUlucHV0ID0gbnVsbCApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaW5wdXQgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlucHV0ID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5OZXh0SW5wdXQgPSBpbnB1dDtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG4gICAgQ2xlYXIoKXt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBESVlJbnB1dCBleHRlbmRzIEJhc2VHYW1lSW5wdXRcclxue1xyXG4gICAgSW5wdXQoaXNSaWdodDpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0xpc3RlbmVyKVxyXG4gICAgICAgICAgICB0aGlzLl9MaXN0ZW5lci5jYWxsKHRoaXMuX093bmVyLGlzUmlnaHQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfT3duZXI6YW55O1xyXG4gICAgcHJpdmF0ZSBfTGlzdGVuZXI6KGlzcmluZzpib29sZWFuKT0+dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKG93bmVyOmFueSA9IG51bGwsbGlzdGVuZXI6KGlzcmluZzpib29sZWFuKT0+dm9pZCA9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9Pd25lciA9IG93bmVyO1xyXG4gICAgICAgIHRoaXMuX0xpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIE5vcm1HYW1lSW5wdXQgZXh0ZW5kcyBCYXNlR2FtZUlucHV0XHJcbntcclxuICAgIEdhbWVEaXI6R2FtZURpcmVjdG9yO1xyXG4gICAgX0RpcnR5OmJvb2xlYW47XHJcbiAgICBfSXNSaWdodDpib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IoIGRpcjpHYW1lRGlyZWN0b3IsaW5wdXQ6QmFzZUdhbWVJbnB1dCA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGlucHV0KTtcclxuICAgICAgICB0aGlzLkdhbWVEaXIgPSBkaXI7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9Jc1JpZ2h0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBJbnB1dCggaXNSaWdodDpib29sZWFuIClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMuR2FtZURpci5Nb3ZlU3RlcChpc1JpZ2h0KTtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fSXNSaWdodCA9IGlzUmlnaHQ7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0RpcnR5JiZ0aGlzLkdhbWVEaXIuUGxheWVyLkJhc2VDdHJsZXIuVGltZTw9MC4xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lRGlyLk1vdmVTdGVwKHRoaXMuX0lzUmlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIENsZWFyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eT1mYWxzZTtcclxuICAgIH1cclxufVxyXG59XHJcbiIsImltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG5cclxuIC8qKuS9nOiAhTpNb1xyXG4gKuWcuuaZr+WGheWvueixoSBcclxuICovXHJcbi8v566h55CG5LiA5pW06KGMXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdW50TGluZSBleHRlbmRzIExheWEuU3ByaXRlM0Rcclxue1xyXG4gICAgTGF5T3V0RGlydHk6Ym9vbGVhbjtcclxuICAgIExpbmVJZHg6bnVtYmVyO1xyXG4gICAgRmxvb3JOdW06bnVtYmVyO1xyXG4gICAgU3RlcExpc3Q6U3RlcFtdO1xyXG4gICAgTG9naWNMZW5ndGg6bnVtYmVyO1xyXG4gICAgU3RlcEl0ZW06U3RlcEl0ZW07XHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+6I635Y+W5pi+56S65Ye65p2l55qE56ys5Yeg5Liq5bmz5Y+wXHJcbiAgICBHZXRTdGVwKGlkeDpudW1iZXIpOlN0ZXBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TdGVwTGlzdFtpZHggKyAxXTtcclxuICAgIH1cclxuICAgIC8v6K6+572u5q+P5bGCXHJcbiAgICBTZXRMaW5lKCBmbG9vcjpudW1iZXIgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkZsb29yTnVtID0gZmxvb3I7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgdmFyIHN0ZXBMZW5ndGggPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgIHZhciBzdGVwRGlzdGFuY2U9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZTtcclxuICAgICAgICBuZXdQUy55ID0gc3RlcExlbmd0aCpmbG9vcjtcclxuICAgICAgICBuZXdQUy56ID0gLXN0ZXBEaXN0YW5jZS8yICpmbG9vcjtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHZhciBzdGVwQXJyOlN0ZXBbXSA9IHRoaXMuU3RlcExpc3Q7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHN0YXJ0WCA9IDAgLSBzdGVwQXJyLmxlbmd0aC8yICogc3RlcERpc3RhbmNlO1xyXG4gICAgICAgIGlmKHRoaXMuSnVnZUlzTGVzc0xpbmUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBzdGVwRGlzdGFuY2UvMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICBmb3IoIHZhciBjb2x1bW4gPTAgO2NvbHVtbjxzdGVwQXJyLmxlbmd0aDsrK2NvbHVtbiApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3U3RlcDpTdGVwID0gc3RlcEFycltjb2x1bW5dO1xyXG4gICAgICAgICAgICB2YXIgc3RlcFZlY3RvciA9IG5ld1N0ZXAuUG9zaXRpb247XHJcbiAgICAgICAgICAgIHN0ZXBWZWN0b3IueCA9IHN0YXJ0WDtcclxuICAgICAgICAgICAgaWYodGhpcy5fU2V0ZWQmJihjb2x1bW4gPT0gMHx8Y29sdW1uPnRoaXMuTG9naWNMZW5ndGgpKVxyXG4gICAgICAgICAgICAgICAgbmV3U3RlcC5SZXNldFN0ZXAoc3RlcFZlY3Rvcix0cnVlKVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBuZXdTdGVwLlJlc2V0U3RlcChzdGVwVmVjdG9yKVxyXG4gICAgICAgICAgICBzdGFydFggKz0gc3RlcERpc3RhbmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9TZXRlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHN0ZXBBcnJbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc3RlcEFycltzdGVwQXJyLmxlbmd0aCAtMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fU2V0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmKCAhIHRoaXMuSnVnZUlzTGVzc0xpbmUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9naWNMZW5ndGggPSBzdGVwQXJyLmxlbmd0aC0yO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGVwQXJyW3N0ZXBBcnIubGVuZ3RoIC0yXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IHN0ZXBBcnIubGVuZ3RoIC0zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/liKTmlq3mmK/lkKbmlLbnvKnnmoTpgqPlsYJcclxuICAgIEp1Z2VJc0xlc3NMaW5lKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkZsb29yTnVtJTIgIT0gMDtcclxuICAgIH1cclxuICAgIC8v5bCG5q+P5Liq6IqC54K56ZO+5o6l5Yiw5LiL5LiA5bGCXHJcbiAgICBTZXROZXh0Rmxvb3IoIGxhc3RGbG9vcjpNb3VudExpbmUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WIpOaWreaYr+WQpuacieS4pOWktOerr+eCuVxyXG4gICAgICAgIHZhciBoYXZlUG9pbnQgPSBsYXN0Rmxvb3IuTG9naWNMZW5ndGggPnRoaXMuTG9naWNMZW5ndGhcclxuICAgICAgICBmb3IoIHZhciBzdGFydElkeDpudW1iZXIgPSAwO3N0YXJ0SWR4PCB0aGlzLkxvZ2ljTGVuZ3RoOysrc3RhcnRJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGVmdFBhcmVudDpTdGVwID1udWxsO1xyXG4gICAgICAgICAgICB2YXIgcmlnaHRQYXJlbnQ6U3RlcCA9bnVsbDtcclxuICAgICAgICAgICAgaWYoaGF2ZVBvaW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCsxKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGVmdFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4LTEpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHRoaVN0ZXAgPSB0aGlzLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlTdGVwLkxlZnRQYXJlbnQgPSBsZWZ0UGFyZW50O1xyXG4gICAgICAgICAgICBsZWZ0UGFyZW50LlJpZ2h0Q2hpbGQgPSB0aGlTdGVwO1xyXG5cclxuICAgICAgICAgICAgdGhpU3RlcC5SaWdodFBhcmVudCA9IHJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICByaWdodFBhcmVudC5MZWZ0Q2hpbGQgPSB0aGlTdGVwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5pWy56KO5LiA5bGCXHJcbiAgICBCcmVhaygpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2V0ZWQ6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKGxpbmVJZHg6bnVtYmVyLGZsb29yOm51bWJlciA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNvbHVtbnM6bnVtYmVyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTGluZVN0ZXBOdW07XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkxpbmVJZHggPSBsaW5lSWR4O1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB0aGlzLlN0ZXBMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1NldGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yKCB2YXIgU3RhcnRJZHg6bnVtYmVyID0gKGNvbHVtbnMgLTEpO1N0YXJ0SWR4Pj0wOy0tU3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N0ZXA6U3RlcCA9IG5ldyBTdGVwKHRoaXMsU3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ld1N0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXBMaXN0W1N0YXJ0SWR4XSA9IG5ld1N0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge1BsYXllckNvbnRyb2xlcn0gZnJvbSBcIi4vUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHtQbGF5ZXJCdWZmfSBmcm9tIFwiLi9CdWZmXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi4vVXRpbGl0eS9QYXRoXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxudmFyIG51bTpudW1iZXIgPSAwO1xyXG50eXBlIEJhc2VQbGF5ZXJCdWZmID0gUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZjtcclxuLy/or6XohJrmnKznlKjkuo7muLjmiI/njqnlrrblr7nosaHnrqHnkIZcclxuLy/njqnlrrblr7nosaFcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG57XHJcbiAgICBzZXQgQ3VyU3RlcChzdGVwOlN0ZXApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ3VyU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyU3RlcCgpOlN0ZXBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU3RlcDtcclxuICAgIH1cclxuICAgIEJhc2VDdHJsZXI6UGxheWVyQ29udHJvbGVyLlBsYXllck5vcm1DdHJsZXI7XHJcbiAgICBCdWZmQXJyOkFycmF5PFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmY+O1xyXG4gICAgLy96ZXJnXHJcbiAgICBJZE51bWJlcjpudW1iZXI7XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueOqeWutkJVRkZcclxuICAgICAqIEBwYXJhbSBpZHgg5qe95L2N5qOA5p+lXHJcbiAgICAgKiBAcmV0dXJucyDnqbrooajnpLrmsqHmnIlcclxuICAgICAqL1xyXG4gICAgR2V0QnVmZihpZHg6bnVtYmVyKTpQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLkJ1ZmZBcnJbaWR4XSAhPW51bGwmJnRoaXMuQnVmZkFycltpZHhdIT11bmRlZmluZWQpP3RoaXMuQnVmZkFycltpZHhdOm51bGw7XHJcbiAgICB9XHJcbiAgICAvL+aRhuaUvuinkuiJslxyXG4gICAgU2V0U3RlcChwdXRTdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBwdXRTdGVwO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHB1dFN0ZXAuUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBuZXdQUy55ICs9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBwdXRTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuVG91Y2hHcm91bmQoKTtcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3UFM6TGF5YS5WZWN0b3IzID0gbmV3UFMuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9naWNQb3NpdGlvbigpOkxheWEuVmVjdG9yM1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5biD5bGA5b2T5YmN5bGC5L2G5LiN56e75YqoXHJcbiAgICAgKiBAcGFyYW0ge1N0ZXB9IHN0ZXAg5LiL5LiA5q2l5Y+w6Zi2XHJcbiAgICAgKi9cclxuICAgIExheVN0ZXAoc3RlcDpTdGVwKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gc3RlcDtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gc3RlcC5Qb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+inpuWPkeWPsOmYtlxyXG4gICAgVG91Y2hHcm91bmQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuQ3VyU3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCh0aGlzLkN1clN0ZXAuU3RlcEl0ZW0uSXRlbVR5cGUgPT0gSXRlbS5JdGVtVHlwZS5Ob25lKSYmKHRoaXMuQ3VyU3RlcC5Jc0VtcHR5fHwodGhpcy5DdXJTdGVwLkxlZnRQYXJlbnQmJnRoaXMuQ3VyU3RlcC5SaWdodFBhcmVudCYmdGhpcy5DdXJTdGVwLkxlZnRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbiYmdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50LlN0ZXBJdGVtLklzRm9yYmlkZW4pKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5UcmlnZ2VyKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5Ub3VjaEl0ZW0odGhpcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog56e75YqoXHJcbiAgICAgKiBAcGFyYW0ge0xheWEuVmVjdG9yM30gdmVjdG9yIOenu+WKqOWQkemHj+WAvFxyXG4gICAgICovXHJcbiAgICBUcmFuc2xhdGUoIHZlY3RvcjpMYXlhLlZlY3RvcjMgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0udHJhbnNsYXRlKHZlY3Rvcik7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZCh0aGlzLl9Mb2dpY1Bvc2l0aW9uLHZlY3Rvcix0aGlzLl9Mb2dpY1Bvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOeOqeWutuaOp+WItuWZqFxyXG4gICAgICogQHBhcmFtIG5ld0N0cmxlciDmlrDnjqnlrrbmjqfliLblmahcclxuICAgICAqL1xyXG4gICAgQWRkQ3RybGVyKG5ld0N0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlciApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgY3RybGVyOlBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyID0gdGhpcy5fQ3RybGVyO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IG5ld0N0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuTmV4dEN0cmwgPWN0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuU2V0UGxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75Lqk5o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIFBvcEN0cmxlcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLl9DdHJsZXIuTmV4dEN0cmw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoEJVRkZcclxuICAgICAqIEBwYXJhbSBidWZmIFxyXG4gICAgICogQHBhcmFtIGluZGV4IFxyXG4gICAgICovXHJcbiAgICBBZGRCdWZmKGJ1ZmY6UGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZik6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHZhciBpbmRleDpudW1iZXIgPSBidWZmLklkeDtcclxuICAgICAgICBpZih0aGlzLkJ1ZmZBcnJbaW5kZXhdIT1udWxsfHx0aGlzLkJ1ZmZBcnJbaW5kZXhdIT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQnVmZkFycltpbmRleF0gPSBidWZmO1xyXG4gICAgICAgIGJ1ZmYuSWR4ID0gaW5kZXg7XHJcbiAgICAgICAgYnVmZi5TdGFydCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5re75YqgQlVGRuaooeWei1xyXG4gICAgICogQHBhcmFtIG1vZCBcclxuICAgICAqL1xyXG4gICAgQWRkQnVmZk1vZGUoIG1vZDpMYXlhLlNwcml0ZTNEIClcclxuICAgIHtcclxuICAgICAgICBpZihtb2QhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTm9kZS5hZGRDaGlsZChtb2QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog57uT5p2fQlVGRlxyXG4gICAgICovXHJcbiAgICBDb21wbGV0ZUJ1ZmYoaW5kZXg6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBidWZmOkJhc2VQbGF5ZXJCdWZmID0gdGhpcy5CdWZmQXJyW2luZGV4XTtcclxuICAgICAgICB0aGlzLkJ1ZmZBcnJbaW5kZXhdPW51bGw7XHJcbiAgICAgICAgaWYoYnVmZj09bnVsbHx8YnVmZj09dW5kZWZpbmVkIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+engeacieWxnuaAp1xyXG4gICAgX0xvZ2ljUG9zaXRpb246TGF5YS5WZWN0b3IzO1xyXG4gICAgX0J1ZmZOb2RlOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBfUGxheWVyTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIF9DdXJTdGVwOlN0ZXA7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB2YXIgTmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiYzAwMV9jaGlsZF8wMVwiKTtcclxuICAgICAgICB2YXIgUGxheWVyTW9kZWwgPSBMYXlhLkxvYWRlci5nZXRSZXMoTmFtZSk7XHJcbiAgICAgICAgdmFyIHNlY29uZFBsYXllcjpMYXlhLlNwcml0ZTNEID0gUGxheWVyTW9kZWwuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHNlY29uZFBsYXllcik7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcyk7XHJcbiAgICAgICAgLy/mt7vliqDoh6rlrprkuYnmqKHlnotcclxuICAgICAgICBzZWNvbmRQbGF5ZXIudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCksIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5vbihMYXlhLkV2ZW50LlJFTU9WRUQsdGhpcywoKT0+eyB0aGlzLmRlc3Ryb3koKSB9KVxyXG4gICAgICAgIHRoaXMuUmVzZXQoKTtcclxuICAgIH1cclxuICAgIF9VcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIGZvciggdmFyIGJ1ZmZJZHg6bnVtYmVyID0gMDtidWZmSWR4PDI7KytidWZmSWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQnVmZkFycltidWZmSWR4XSE9bnVsbHx8dGhpcy5CdWZmQXJyW2J1ZmZJZHhdIT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1ZmZBcnJbYnVmZklkeF0uVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgRmx5UHJlcGFyZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gbnVsbDtcclxuICAgIH1cclxuICAgIFJlc2V0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBudWxsO1xyXG4gICAgICAgIGlmKHRoaXMuX0J1ZmZOb2RlKVxyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fQnVmZk5vZGUgPSBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fQnVmZk5vZGUpO1xyXG4gICAgICAgIHRoaXMuQnVmZkFyciA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuQmFzZUN0cmxlciA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyTm9ybUN0cmxlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLkJhc2VDdHJsZXI7XHJcbiAgICAgICAgdGhpcy5fTG9naWNQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoMCwwKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fVXBkYXRlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX0N0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlcjtcclxuXHJcbiAgICBcclxufVxyXG5cclxuY2xhc3MgU3RlcERhdGFcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge31cclxuICAgIEdldERhdGEoIHN0ZXA6U3RlcCApXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXJDb250cm9sZXJcclxue1xyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQbGF5ZXJDdHJsZXJcclxuICAgIHtcclxuICAgICAgICAvL+WFrOWFseaOpeWPo1xyXG4gICAgICAgIE5leHRDdHJsOkJhc2VQbGF5ZXJDdHJsZXI7XHJcbiAgICAgICAgcGxheWVyOlBsYXllcjtcclxuICAgICAgICBcclxuICAgICAgICBVcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjpQbGF5ZXIpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBwbGF5ZXI6UGxheWVyLCBjdHJsZXI6QmFzZVBsYXllckN0cmxlciA9IG51bGwgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoY3RybGVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN0cmxlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5OZXh0Q3RybCA9IGN0cmxlcjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfVXBkYXRlKCk6dm9pZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/nlKjkuo7op5LoibLmraPluLjnirbmgIHkuIvnmoTnp7vliqhcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJOb3JtQ3RybGVyIGV4dGVuZHMgQmFzZVBsYXllckN0cmxlclxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIFN0YXJ0TW92ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkN1ckRpci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihwbGF5ZXI6UGxheWVyID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKHBsYXllcilcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5UaW1lPjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuVGltZTw9QVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuR2FtZVRpbWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuU2V0U3RlcCh0aGlzLnBsYXllci5DdXJTdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RUaW1lID0gdGhpcy5UaW1lLUxheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYXRlID0gKDEtbGFzdFRpbWUvIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU3RlcFBzOkxheWEuVmVjdG9yMyA9IHRoaXMucGxheWVyLkN1clN0ZXAuUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgU3RlcFBzLnkgKz1Db250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJwczpMYXlhLlZlY3RvcjMgPSB0aGlzLnBsYXllci5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBjdXJwcy55ICs9Q29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UHMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHMueCA9IChTdGVwUHMueCAtIGN1cnBzLngpKnJhdGUrIGN1cnBzLng7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHMueSA9IChTdGVwUHMueSAtIGN1cnBzLnkpKnJhdGUrY3VycHMueTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdQcy56ID0gKFN0ZXBQcy56IC0gY3VycHMueikqcmF0ZStjdXJwcy56O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuUG9zaXRpb24gPSBuZXdQcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/njqnlrrbpo57ooYxcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJGbHkgZXh0ZW5kcyBCYXNlUGxheWVyQ3RybGVyXHJcbiAgICB7XHJcbiAgICAgICAgU3BlZWQ6bnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueOqeWutlxyXG4gICAgICAgICAqIEBwYXJhbSBwbGF5ZXIg5pON5o6n6KeS6ImyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TZXRQbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgcGxheWVyLlRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCwwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9cclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjpudW1iZXI7ICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLnBsYXllciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy92YXIgdmVjdG9yID0gbmV3IExheWEuVmVjdG9yMygwLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsLTEqQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlLzIpO1xyXG4gICAgICAgICAgIC8vIExheWEuVmVjdG9yMy5zY2FsZSh2ZWN0b3IsdGhpcy5TcGVlZCx2ZWN0b3IpO1xyXG4gICAgICAgICAgIHZhciB2ZWN0b3I6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygwLDAuMTQ2LC0wLjEwMzk0KVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5UcmFuc2xhdGUodmVjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vTW91bnRMaW5lXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi9HYW1lU3RydWN0XCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG50eXBlIFN0ZXBJdGVtID0gSXRlbS5TdGVwSXRlbTtcclxudHlwZSBNTG9jYXRpb24gPSBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuLy/mraVcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlcCBleHRlbmRzIExheWEuU3ByaXRlM0Rcclxue1xyXG4gICAgLy/mqKHlnovkuKrmlbBcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RlcE1vZGVsTnVtOm51bWJlciA9IDM7XHJcblxyXG4gICAgTGVmdFBhcmVudDpTdGVwO1xyXG4gICAgUmlnaHRQYXJlbnQ6U3RlcDtcclxuICAgIExlZnRDaGlsZDpTdGVwO1xyXG4gICAgUmlnaHRDaGlsZDpTdGVwO1xyXG4gICAgU3RlcEl0ZW06U3RlcEl0ZW07XHJcbiAgICBSb2FkTnVtOm51bWJlcjtcclxuICAgIE1hcms6YW55O1xyXG4gICAgRmxvb3I6TW91bnRMaW5lO1xyXG4gICAgSWR4Om51bWJlcjtcclxuICAgIFxyXG4gICAgLy/lhazmnInmjqXlj6NcclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IExvY2F0aW9uKCk6TUxvY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHYW1lU3RydWN0Lk1Mb2NhdGlvbih0aGlzLklkeC0xLHRoaXMuRmxvb3IuRmxvb3JOdW0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRGVhZFJvYWQoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0lzRGVhZFJvYWR8fCF0aGlzLmFjdGl2ZXx8IHRoaXMuU3RlcEl0ZW0uSXNEaWZmaWN1bHR5O1xyXG4gICAgfVxyXG4gICAgc2V0IElzRGVhZFJvYWQodmFsdWU6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNGb3JiaWRlbigpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TdGVwSXRlbS5Jc0ZvcmJpZGVuO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRW1wdHkoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICEodGhpcy5hY3RpdmUmJnRoaXMuRmxvb3IuYWN0aXZlKTtcclxuICAgIH1cclxuICAgIFB1dEl0ZW0oIGl0ZW1FbnVtZTpJdGVtLkl0ZW1UeXBlIClcclxuICAgIHtcclxuICAgICAgICBpZihpdGVtRW51bWUgPT0gSXRlbS5JdGVtVHlwZS5FbXB0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID1mYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUHV0SXRlbShpdGVtRW51bWUpO1xyXG4gICAgfVxyXG5cclxuICAgIFJlc2V0U3RlcChuZXdQczpMYXlhLlZlY3RvcjMsaWdub3JlQWN0aXZlOmJvb2xlYW4gPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBvc2l0aW9uID0gbmV3UHM7XHJcbiAgICAgICAgaWYoIWlnbm9yZUFjdGl2ZSlcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBtb2RlbFBzID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5QdXRJdGVtKEl0ZW0uSXRlbVR5cGUuTm9uZSk7XHJcblxyXG4gICAgICAgIHRoaXMuTGVmdFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9hZE51bSA9IDA7XHJcbiAgICB9XHJcbiAgICBfU3RlcE1vZGVsOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBjb25zdHJ1Y3RvcihmbG9vcjpNb3VudExpbmUsaWR4Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICAvL3N1cGVyKG5ldyBMYXlhLkJveE1lc2goMSwxLDEpICk7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzKTtcclxuICAgICAgICBpZih0aGlzLklkeCAhPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSsgTWF0aC5yYW5kb20oKSpTdGVwLnN0ZXBNb2RlbE51bSk7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMFwiK0lkeClcclxuICAgICAgICAgICAgdmFyIG1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL3ZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKCBMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuNSwgMC41LCAwLjUpKSA7Ly9sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjbG9uZU1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICBjbG9uZU1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGNsb25lTW9kZWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtRmFjdG9yeShJdGVtLkl0ZW1UeXBlLk5vbmUsdGhpcyk7O1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgIHRoaXMuSWR4ID0gaWR4O1xyXG5cclxuICAgICAgICB0aGlzLkxlZnRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0Q2hpbGQgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb2FkTnVtID0gMDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX0lzRGVhZFJvYWQ6Ym9vbGVhbjtcclxuXHJcbn0iLCIvKipcclxuICog5L2c6ICFOk1vXHJcbiAqIOWQr+WKqOWcuuaZr1xyXG4gKi9cclxuLypcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCJcclxuY2xhc3MgTWFpbiB7XHJcbiAgICBDZW50ZXI6TGF5YS5TcHJpdGUzRDtcclxuICAgIERpcnR5OkJvb2xlYW47XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRMYXlhM0QuaW5pdCgwLDApO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GVUxMO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IExheWEuU3RhZ2UuU0NSRUVOX1ZFUlRJQ0FMO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25WID0gTGF5YS5TdGFnZS5BTElHTl9CT1RUT007XHJcbiAgICAgICAgLy/lvIDlkK/nu5/orqHkv6Hmga9cclxuICAgICAgICBMYXlhLlN0YXQuc2hvdygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5re75YqgM0TlnLrmma9cclxuICAgICAgICB2YXIgc2NlbmU6IExheWEuU2NlbmUzRCA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU2NlbmUzRCgpKSBhcyBMYXlhLlNjZW5lM0Q7XHJcblxyXG4gICAgICAgIC8v5re75Yqg54Wn55u45py6XHJcbiAgICAgICAgdmFyIGNhbWVyYTogTGF5YS5DYW1lcmEgPSAoc2NlbmUuYWRkQ2hpbGQobmV3IExheWEuQ2FtZXJhKDAsIDAuMSwgMTAwKSkpIGFzIExheWEuQ2FtZXJhO1xyXG4gICAgICAgIGNhbWVyYS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgMCwgMTApKTtcclxuICAgICAgICBjYW1lcmEudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDApLCB0cnVlLCBmYWxzZSk7XHJcblxyXG4gICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbiAgICAgICAgdmFyIGJveDogTGF5YS5NZXNoU3ByaXRlM0QgPSBzY2VuZS5hZGRDaGlsZChuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgxLCAxLCAxKSkpIGFzIExheWEuTWVzaFNwcml0ZTNEO1xyXG4gICAgICAgIGJveC50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgNDUsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuQ2VudGVyID0gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuXHJcbiAgICAgICAgdGhpcy5DZW50ZXIuYWRkQ2hpbGQoYm94KTtcclxuICAgICAgICBzY2VuZS5hZGRDaGlsZCh0aGlzLkNlbnRlcik7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5mcmFtZUxvb3AoMSx0aGlzLHRoaXMub25VcGRhdGUpO1xyXG4gICAgICAgIHZhciBBbm90aGVyOiBMYXlhLk1lc2hTcHJpdGUzRCA9IHNjZW5lLmFkZENoaWxkKG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDEsIDEsIDEpKSkgYXMgTGF5YS5NZXNoU3ByaXRlM0Q7XHJcbiAgICAgICAgQW5vdGhlci50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgNDUsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIGJveC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoLTEsLTEsMCk7XHJcbiAgICAgICAgQW5vdGhlci50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoMSwxLDApO1xyXG4gICAgICAgIHRoaXMuQ2VudGVyLmFkZENoaWxkKEFub3RoZXIpO1xyXG4gICAgICAgIC8vVUlGdW5jLkZpeFVJKG5ld1VJKTtcclxuICAgICAgICB0aGlzLkRpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG5cdG9uVXBkYXRlKCk6dm9pZFxyXG5cdHtcclxuICAgICAgICB0aGlzLkNlbnRlci50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwwLDAuMDEpKTtcclxuXHR9XHJcbn1cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuXHJcblxyXG5cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuKi9cclxuXHJcblxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgTG9hZFNjZW5lIGZyb20gXCIuL1NjZW5lL0xvYWRTY2VuZVwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuL1V0aWxpdHkvUGF0aFwiXHJcbmNsYXNzIEdhbWVcclxue1xyXG5cdF9GcmFtZTpGcmFtZVdvcms7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNzID0gQVBQO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEzRC5pbml0KDAsMCx0cnVlKTtcclxuICAgICAgICBHYW1lQ29uZmlnLmluaXQoKTtcclxuICAgICAgICAvL0xheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GSVhFRF9XSURUSDtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRlVMTDtcclxuICAgICAgICBcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBMYXlhLlN0YWdlLlNDUkVFTl9WRVJUSUNBTDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IExheWEuU3RhZ2UuQUxJR05fQk9UVE9NO1xyXG4gICAgICAgIGlmKExheWEuQnJvd3Nlci5vbkFuZHJvaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL0xheWEuc3RhZ2UuZnJhbWVSYXRlID0gXCJzbG93XCJcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lvIDlkK/nu5/orqHkv6Hmga9cclxuXHRcdExheWEuU3RhdC5zaG93KClcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcmVzQ29sID0gW3t1cmw6XCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpcInVpL1Jlc291cmNlL2xvY2FsY29tcC5hdGxhc1wiLHR5cGU6TGF5YS5Mb2FkZXIuQVRMQVN9XTtcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHJlc0NvbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZGVkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9GcmFtZSA9IEZyYW1lV29yay5GTTtcclxuICAgICAgICB0aGlzLl9GcmFtZS5BZGRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgdmFyIHNjZW5lTWdyOlNjZW5lTWFuYWdlciA9IHRoaXMuX0ZyYW1lLkFkZE1hbmFnZXI8U2NlbmVNYW5hZ2VyPihTY2VuZU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuX0ZyYW1lLkFkZE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG5cdFx0c2NlbmVNZ3IuRW50ZXJTY2VuZShuZXcgTG9hZFNjZW5lKCkpO1xyXG4gICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKDEsdGhpcyx0aGlzLlVwZGF0ZSk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoIClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMuU2NlbmVNZ3IuVXBkYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fRnJhbWUuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxudmFyIEdNID0gbmV3IEdhbWUoKTtcclxuIiwiaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgTGlmZU9iaiBmcm9tIFwiLi8uLi9CYXNlL0xpZmVPYmpcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuL0Jhc2VTY2VuZVwiO1xyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgQkcgZnJvbSBcIi4vLi4vdWkvQkdcIlxyXG5cclxuLy/lr7zmvJTln7rnsbtcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZURpcmVjdG9yIGV4dGVuZHMgTGlmZU9ialxyXG57XHJcbiAgICBcclxuICAgIF9MZWF2ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmdpc3RJREsoTWVzc2FnZU1ELkdhbWVFdmVudC5HYW1lVGltZVVwKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmdpc3RJREsoTWVzc2FnZU1ELkdhbWVFdmVudC5HYW1lQ29udGludWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN1cGVyLl9MZWF2ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIFRpbWVVcCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9UaW1lVXBDbG9jazw9MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vQVBQLk1lc3NhZ2VDZW50ZXIuVHJpZ2dlcihHYW1lRXZlbnQuR2FtZVRpbWVVcCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fVGltZVVwQ2xvY2s8PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQ29udGludWVUaW1lKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8vQVBQLk1lc3NhZ2VDZW50ZXIuVHJpZ2dlcihHYW1lRXZlbnQuR2FtZUNvbnRpbnVlKTtcclxuICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCArPSBMYXlhLnRpbWVyLmN1cnJUaW1lciAtIHRoaXMuX1RpbWVVcENsb2NrO1xyXG4gICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IEN1ckdhbWVUaW1lKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1N0YXJ0R2FtZVRpbWUgKyB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/np4HmnInlsZ7mgKflkozlip/og71cclxuICAgIHByaXZhdGUgX1N0YXJ0R2FtZVRpbWU6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfVGltZVVwQ291bnQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfVGltZVVwQ2xvY2s6bnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIF9VSU1ncjpVSU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIF9CRzpCRztcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgIHRoaXMuX1VJTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5TY2VuZU1nciA9IEFQUC5TY2VuZU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5fQkcgPSBBUFAuU2NlbmVNYW5hZ2VyLkJHIGFzIEJHO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9TdGFydENvbXBsZXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICB0aGlzLl9VSU1nci5DbGVhcigpO1xyXG4gICAgICAgIHN1cGVyLl9TdGFydENvbXBsZXRlKCk7XHJcbiAgICB9XHJcbiAgICBTY2VuZU1ncjpTY2VuZU1hbmFnZXI7XHJcblxyXG4gICAgZ2V0IEdhbWVUaW1lKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fVGltZVVwQ2xvY2s+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9UaW1lVXBDbG9jay0gdGhpcy5fU3RhcnRHYW1lVGltZSAtIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gTGF5YS50aW1lci5jdXJyVGltZXItIHRoaXMuX1N0YXJ0R2FtZVRpbWUgLSB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzZXQgR2FtZVRpbWUodmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIC8v5aSW6YOo5o6l5Y+jXHJcbiAgICBTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TdGFydCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9TdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgYWJzdHJhY3QgUmVTdGFydCgpOnZvaWQ7XHJcbn0iLCJpbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IExpZmVPYmogZnJvbSBcIi4vLi4vQmFzZS9MaWZlT2JqXCJcclxuaW1wb3J0IHtFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0xpZmVPYmpcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG4vL+WcuuaZr+Wfuuexu1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmUgZXh0ZW5kcyBMaWZlT2JqXHJcbntcclxuICAgIC8v5aSW6YOo5o6l5Y+jXHJcbiAgICBDdXJEaXI6QmFzZURpcmVjdG9yO1xyXG4gICAgSXNMb2FkQ29tcGxldGU6Ym9vbGVhbjtcclxuICAgIFNjZW5lOkxheWEuU2NlbmUzRDtcclxuICAgIElzTG9hZGluZzpib29sZWFuO1xyXG5cclxuICAgIC8v57uT5p2f5Zy65pmvXHJcbiAgICBMZWF2ZShuZXh0U3RhZ2U6QmFzZVNjZW5lKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTmV4dFNjZW5lID0gbmV4dFN0YWdlO1xyXG4gICAgICAgIG5leHRTdGFnZS5TdGFydExvYWQoKTtcclxuICAgICAgICB0aGlzLl9MZWF2ZSgpO1xyXG4gICAgfVxyXG4gICAgU3RhcnRMb2FkKCApLy87Ly9DYWxsQmFjazooKT0+dm9pZCk7Ly8pQ2FsbEJhY2soKTp2b2lkPT4pO1xyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSXNMb2FkaW5nID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/lvIDlp4vlnLrmma9cclxuICAgIFN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLklzTG9hZENvbXBsZXRlICYmICF0aGlzLklzTG9hZGluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0xvYWRDYWxsQmFjayA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Mb2FkQ2FsbEJhY2sgPSB0aGlzLl9TdGFydDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKCF0aGlzLklzTG9hZGluZylcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnQoKTtcclxuICAgIH1cclxuICAgIC8v5pS+5a+56LGhXHJcbiAgICBQdXRPYmoobm9kZTpMYXlhLlNwcml0ZTNEICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKG5vZGUgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFzZVNjZW5lIFB1dE9iaiBFcnJvcjplbXB0eSBTcHJpdGUzRFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgIHRoaXMuU2NlbmUuYWRkQ2hpbGQobm9kZSk7ICBcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJvdGVjdGVkIF9OZXh0U2NlbmU6QmFzZVNjZW5lOy8v5LiL5LiA5Liq5Zy65pmvXHJcbiAgICBwcm90ZWN0ZWQgX0xvYWRDYWxsQmFjazooKT0+dm9pZDtcclxuICAgIHByb3RlY3RlZCBfVUlNYW5hZ2VyOlVJTWFuYWdlcjtcclxuICAgIHByb3RlY3RlZCBfTWVzc2FnZU1ncjpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5Jc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLklzTG9hZENvbXBsZXRlID0gZmFsc2VcclxuICAgICAgICB0aGlzLkN1ckRpciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5TY2VuZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fVUlNYW5hZ2VyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5fTWVzc2FnZU1nciA9IEZXLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB0aGlzLl9Mb2FkQ2FsbEJhY2sgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX05leHRTY2VuZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9MZWF2aW5nKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSU1hbmFnZXIuQ2xlYXIoKTtcclxuXHJcbiAgICAgICAgaWYodGhpcy5DdXJEaXIuT2JqU3RhdGUgPT0gRW51bS5MaWZlT2JqU3RhdGUuRW5kZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5fTGVhdmVpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9MZWF2ZUNvbXBsZXRlKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5fTGVhdmVDb21wbGV0ZSgpO1xyXG4gICAgICAgIGlmKHRoaXMuU2NlbmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlNjZW5lLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5TY2VuZS5udW1DaGlsZHJlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFjdG9yID0gdGhpcy5TY2VuZS5nZXRDaGlsZEF0KDApO1xyXG4gICAgICAgICAgICAgICAgYWN0b3IucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlci5DbGVhcigpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUgPSB0aGlzLl9OZXh0U2NlbmU7XHJcbiAgICAgICAgLy96ZXJnIOWcuuaZr+S4jeefpemBk+S8muS4jeS8muWGheWtmOazhOa8j1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBpZiggdGhpcy5DdXJEaXIhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1ckRpci5VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0dlbkRpcigpOnZvaWQ7XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBfTG9hZENvbXBsZXRlKClcclxuICAgIHtcclxuICAgICAgIHRoaXMuSXNMb2FkQ29tcGxldGUgPSB0cnVlO1xyXG4gICAgICAgdGhpcy5Jc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICBpZih0aGlzLl9Mb2FkQ2FsbEJhY2shPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Mb2FkQ2FsbEJhY2soKTtcclxuICAgICAgICAgICAgdGhpcy5fTG9hZENhbGxCYWNrID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9TdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0KCk7XHJcbiAgICAgICAgaWYodGhpcy5TY2VuZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfU3RhcnRpbmcoKVxyXG4gICAge1xyXG4gICAgICAgIC8v6LWE5rqQ6YO95rKh5LiL5a6M5bCx5LiN6KaB6LWw5YW25a6D6YC76L6R5LqGXHJcbiAgICAgICAgaWYodGhpcy5Jc0xvYWRpbmcmJiB0aGlzLklzTG9hZENvbXBsZXRlIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xvYWRDb21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHN1cGVyLl9TdGFydGluZygpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9TdGFydENvbXBsZXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSU1hbmFnZXIuQ2xlYXIoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fR2VuRGlyKCk7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEVuZEdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbmRHYW1lVUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBHYW1lQ2FtZXJhIGZyb20gXCIuLy4uL0dhbWUvR2FtZUNhbWVyYVwiXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vLi4vR2FtZS9QbGF5ZXJcIlxyXG5pbXBvcnQge0lucHV0fSBmcm9tIFwiLi8uLi9HYW1lL0lucHV0XCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vLi4vR2FtZS9Nb3VudExpbmVcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEJHVUkgZnJvbSBcIi4uL3VpL0JHXCI7XHJcbnR5cGUgSXRlbUxheW91dCA9IEl0ZW0uSXRlbUxheW91dDtcclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuXHJcbi8v5ri45oiP5a+85ryUXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVEaXJlY3RvciBleHRlbmRzIEJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBDYW1lcmE6R2FtZUNhbWVyYTtcclxuICAgIEdhbWVTY2VuZTpCYXNlU2NlbmU7XHJcbiAgICBNb3VudExpbmVzOk1vdW50TGluZVtdO1xyXG4gICAgUGxheWVyOlBsYXllcjtcclxuICAgIElucHV0Q3RybDpJbnB1dC5CYXNlR2FtZUlucHV0O1xyXG4gICAgSXRlbUxheW91dDpJdGVtTGF5b3V0O1xyXG4gICAgQ3VyTGluZVJld2FyZHM6QXJyYXk8TGluZUl0ZW1JbmZvPjtcclxuICAgIEN1ckxpbmVCYXJyaWVyczpBcnJheTxMaW5lSXRlbUluZm8+O1xyXG4gICAgbmFtZTpudW1iZXI7XHJcbiAgICBGcmVzaEJHQ291bnQ6bnVtYmVyO1xyXG5cclxuICAgIGdldCBTYWZlTG9jYXRpb24oKTpHYW1lU3RydWN0Lk1Mb2NhdGlvblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TYWZlTG9jYXRpb247XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9TYWZlTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICBBZGRJbnB1dEN0cmxlcih2YWx1ZTpJbnB1dC5CYXNlR2FtZUlucHV0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsLkNsZWFyKCk7XHJcbiAgICAgICAgdmFsdWUuTmV4dElucHV0ID0gdGhpcy5JbnB1dEN0cmw7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFBvcElucHV0Q3RybGVyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IHRoaXMuSW5wdXRDdHJsLk5leHRJbnB1dDtcclxuICAgIH1cclxuICAgIEFkZEdvbGQobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtICs9IG51bTtcclxuICAgICAgICB0aGlzLkFkZExvZ2ljR29sZChudW0pO1xyXG4gICAgfVxyXG4gICAgQWRkR29sZFVuTG9naWNHb2xkKG51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fR29sZE51bSArPSBudW07XHJcbiAgICB9XHJcbiAgICBBZGRMb2dpY0dvbGQobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuQWRkR29sZChudW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5a6J5YWo5L2N572uXHJcbiAgICBTZXRTYWZlUFMobG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb24pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgaWYobG9jYXRpb24uWTx0aGlzLlRhaWxGTG9vci5GbG9vck51bXx8IGxvY2F0aW9uLlk+dGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVzZXRJdGVtKCBsb2NhdGlvbi5ZIClcclxuICAgIH1cclxuXHJcbiAgICAvL+S7juafkOS4gOWxguW8gOWni+S4gOWxguWxgumHjeaWsOaRhuaUvumBk+WFt1xyXG4gICAgUmVzZXRJdGVtKCBmbG9vcjpudW1iZXIgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICBmb3IobGV0IGxvb3BGbG9vcjpudW1iZXIgPSBmbG9vciA7bG9vcEZsb29yPD10aGlzLkhlYWRGbG9vci5GbG9vck51bTsrK2xvb3BGbG9vcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBmbG9vckxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb29wRmxvb3IpO1xyXG4gICAgICAgICAgICBmbG9vckxpbmUuTGF5T3V0RGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgZmxvb3JMaW5lLlNldExpbmUoZmxvb3JMaW5lLkZsb29yTnVtKTtcclxuICAgICAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShsb29wRmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+a4heeQhuWxgumBk+WFt1xyXG4gICAgQ2xlYXJGbG9vcihzdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgc3RlcEl0ZW0gPSBzdGVwLlN0ZXBJdGVtO1xyXG4gICAgICAgIHN0ZXAuUHV0SXRlbShJdGVtVHlwZS5Ob25lKTtcclxuICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGdldCBQYW5lbFVJKCk6R2FtZVVJXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1BhbmVsVUk7XHJcbiAgICB9XHJcbiAgICBzZXQgUGFuZWxVSSh2YWx1ZTpHYW1lVUkpXHJcbiAgICB7XHJcbiAgICAgICAgdmFsdWUuU2V0TGVmdFRvdWNoKHRoaXMsKCk9Pnt0aGlzLklucHV0Q3RybC5JbnB1dChmYWxzZSk7fSlcclxuICAgICAgICB2YWx1ZS5TZXRSaWdodFRvdWNoKHRoaXMsKCk9Pnt0aGlzLklucHV0Q3RybC5JbnB1dCh0cnVlKTt9KTsgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IEhlYWRGbG9vcigpOk1vdW50TGluZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbdGhpcy5fSGVhZEZsb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBUYWlsRkxvb3IoKTpNb3VudExpbmVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb3VudExpbmVzW3RoaXMuX1RhaWxGTG9vcklkeF07XHJcbiAgICB9XHJcbiAgICBnZXQgUGxheWVyRGlzdGFuY2UoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoKHRoaXMuUGxheWVyLlBvc2l0aW9uLnogLSB0aGlzLl9TdGFydFBvc2l0aW9uLnopLyhDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMikpO1xyXG4gICAgfVxyXG5cclxuICAgIERlYXRoKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciB1aTpFbmRHYW1lVUkgPSB0aGlzLl9VSU1nci5TaG93PEVuZEdhbWVVST4oRW5kR2FtZVVJKTtcclxuICAgICAgICAvL3VpLlNldEdhbWVJbmZvKHRoaXMuUGxheWVyRGlzdGFuY2UsdGhpcy5fR29sZE51bSk7XHJcbiAgICAgICAgdGhpcy5UaW1lVXAoKTtcclxuICAgIH1cclxuICAgIC8v5a+55aSW5o6l5Y+jXHJcbiAgICBTdGFydCggKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fU3RhcnQoKTtcclxuICAgIH1cclxuICAgIC8v6YeN5paw5byA5aeLXHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgIH1cclxuICAgIFNob3dJbnB1dEluZm8oaW5mbzpzdHJpbmcpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuU2hvd0lucHV0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuICAgIC8v5bem5Y+z56e75YqoXHJcbiAgICBNb3ZlU3RlcCggaXNSaWdodDpib29sZWFuIClcclxuICAgIHtcclxuICAgICAgICAvL3ZhciBidWZmID0gdGhpcy5CdWZmZXI7XHJcbiAgICAgICAgLy/ojrflj5bkuIvkuIDlsYLnmoRTdGVwXHJcbiAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IHRoaXMuUGxheWVyLkN1clN0ZXA7XHJcbiAgICAgICAgaWYoc3RlcCA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXNSaWdodClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoc3RlcCA9PSBudWxsfHxzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lsYLmlbDojrflj5bmn5DlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgR2V0Rmxvb3JCeUZsb29yKGZsb29yOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yOk1vdW50TGluZSA9IHRoaXMuVGFpbEZMb29yO1xyXG4gICAgICAgIGlmKGZsb29yPCB0YWlsRmxvb3IuRmxvb3JOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29ySUQgPSAoZmxvb3IgLSB0YWlsRmxvb3IuRmxvb3JOdW0gICsgdGhpcy5fVGFpbEZMb29ySWR4KSV0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbZmxvb3JJRF07XHJcbiAgICB9XHJcblxyXG4gICAgTG9vcERvRmxvb3JTdGVwKCBmbG9vcjpudW1iZXIsT3duZXI6YW55LGNhbGxCYWNrOihzdGVwOlN0ZXApPT52b2lkICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKGZsb29yPHRoaXMuVGFpbEZMb29yLkZsb29yTnVtfHxmbG9vcj50aGlzLkhlYWRGbG9vci5GbG9vck51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yTGluZTpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgZm9yKGxldCBpZHg9MDtpZHg8Zmxvb3JMaW5lLkxvZ2ljTGVuZ3RoOysraWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vckxpbmUuR2V0U3RlcChpZHgpO1xyXG4gICAgICAgICAgICBjYWxsQmFjay5jYWxsKE93bmVyLHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmui/h+WdkOagh+iOt+WPluWPsOmYtlxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOe0ouW8lSzlsYLmlbBcclxuICAgICAqL1xyXG4gICAgR2V0U3RlcEJ5TG9jYXRpb24obG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb24pOlN0ZXBcclxuICAgIHtcclxuICAgICAgICB2YXIgZ2V0U3RlcDpTdGVwID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9jYXRpb24uWSkuR2V0U3RlcChsb2NhdGlvbi5YKTtcclxuICAgICAgICByZXR1cm4gZ2V0U3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgUGxheWVyRmxvb3IoICk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGZsb29yOm51bWJlciA9IHRoaXMuX1N0YXJ0UG9zaXRpb24ueiAtIHRoaXMuUGxheWVyLkxvZ2ljUG9zaXRpb24uejtcclxuICAgICAgICBmbG9vciA9IE1hdGgucm91bmQoZmxvb3IvKCBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMikpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhmbG9vcik7XHJcbiAgICB9XHJcbiAgICBnZXQgUGxheWVyRmxvb3JMaW5lKCApOk1vdW50TGluZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLlBsYXllckZsb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBfSGVhZEZsb29ySWR4Om51bWJlcjtcclxuICAgIHByaXZhdGUgX1RhaWxGTG9vcklkeDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Db3VudFRpbWU6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQm9vdG9tRmxvb3I6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfU3RhcnRQb3NpdGlvbjpMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF9HYW1lVXBkYXRlOigpPT52b2lkO1xyXG4gICAgcHJpdmF0ZSBfUGFuZWxVSTpHYW1lVUk7XHJcbiAgICBwcml2YXRlIF9Hb2xkTnVtOm51bWJlcjtcclxuICAgIHByaXZhdGUgX0xvZ2ljR29sZE51bTpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9DdXJCRzpCR1VJO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkNhbWVyYSA9IG51bGw7ICBcclxuICAgICAgICB0aGlzLkdhbWVTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Nb3VudExpbmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLlBsYXllciA9bnVsbDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5JdGVtTGF5b3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yID0wO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0UG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5fUGFuZWxVSSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fQ3VyQkcgPSBBUFAuU2NlbmVNYW5hZ2VyLkJHIGFzIEJHVUk7XHJcbiAgICAgICAgdGhpcy5GcmVzaEJHQ291bnQgPSAwO1xyXG4gICAgfVxyXG4gICAgLy/liJvlu7rnm7jlhbPmlL7ov5kg6L+Z6YeM6YeN5paw5byA5aeL5LiN5Lya6LWwXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgLy/liJvlu7rmlrnlkJHlhYlcclxuICAgICAgICB2YXIgZGlyZWN0aW9uTGlnaHQgPSBuZXcgTGF5YS5EaXJlY3Rpb25MaWdodCgpO1xyXG4gICAgICAgIHRoaXMuU2NlbmVNZ3IuQ3VyU2NlbmUuUHV0T2JqKGRpcmVjdGlvbkxpZ2h0KTtcclxuICAgICAgICBkaXJlY3Rpb25MaWdodC5jb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgMSwgMSk7XHJcbiAgICAgICAgZGlyZWN0aW9uTGlnaHQuZGlyZWN0aW9uID0gbmV3IExheWEuVmVjdG9yMygxLCAtMSwgMCk7XHJcbiovXHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPW5ldyBHYW1lQ2FtZXJhKCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEudHJhbnNmb3JtLmxvY2FsUm90YXRpb25FdWxlciA9bmV3IExheWEuVmVjdG9yMygtMzAsMCwwKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLkNhbWVyYSk7XHJcblxyXG4gICAgICAgIHRoaXMuTW91bnRMaW5lcyA9IFtdO1xyXG4gICAgICAgIHZhciBtYXhMaW5lTnVtID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTWF4TGluZU51bTtcclxuICAgICAgICBmb3IoIHZhciBsaW5lSWR4Om51bWJlciA9IG1heExpbmVOdW0tMTtsaW5lSWR4Pj0wOy0tbGluZUlkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3TW91bnRMaW5lID0gbmV3IE1vdW50TGluZShsaW5lSWR4LGxpbmVJZHgpO1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaihuZXdNb3VudExpbmUpO1xyXG4gICAgICAgICAgICB0aGlzLk1vdW50TGluZXNbbGluZUlkeF0gPSBuZXdNb3VudExpbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yib5bu6VUlcclxuICAgICAgICB2YXIgZGlyOkdhbWVEaXJlY3RvciA9IHRoaXM7XHJcbiAgICAgICAgXHJcblxyXG4gICAgICAgIC8v5Yib5bu6546p5a62XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5QbGF5ZXIpO1xyXG5cclxuICAgICAgICAvL+WHhuWkh+eOqeWutuatu+S6oeS6i+S7tlxyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCx0aGlzLkRlYXRoLHRoaXMpO1xyXG4gICAgICAgIHN1cGVyLl9TdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6L+b5YWl5ri45oiP55qE6K6+572u5pS+6L+Z6YeMIOmHjeaWsOW8gOWni+i1sOi/memHjFxyXG4gICAgcHJvdGVjdGVkIF9TdGFydENvbXBsZXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9TYWZlTG9jYXRpb24gPSBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24oMCwwKTtcclxuICAgICAgICAvL+mHjee9rueJqeWTgVxyXG4gICAgICAgIHRoaXMuSXRlbUxheW91dCA9IG5ldyBJdGVtLkl0ZW1MYXlvdXQoKVxyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB2YXIgbGluZXM6TW91bnRMaW5lW10gPSB0aGlzLk1vdW50TGluZXM7XHJcbiAgICAgICAgLy/liJvlu7rovpPlhaXmjqfliLblmahcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG5ldyBJbnB1dC5Ob3JtR2FtZUlucHV0KHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9IGxpbmVzLmxlbmd0aCAtMTtcclxuICAgICAgICB0aGlzLl9UYWlsRkxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlJlc2V0KCk7XHJcbiAgICAgICAgZm9yKHZhciBpZHg6bnVtYmVyID0gMDtpZHg8bGluZXMubGVuZ3RoOysraWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpbmU6TW91bnRMaW5lID0gdGhpcy5Nb3VudExpbmVzW2lkeF07XHJcbiAgICAgICAgICAgIGxpbmUuU2V0TGluZShpZHgpO1xyXG4gICAgICAgICAgICBpZihpZHg+MClcclxuICAgICAgICAgICAgICAgIGxpbmVzW2lkeC0xXS5TZXROZXh0Rmxvb3IobGluZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIFBsYXllclN0ZXAgPSBsaW5lLkdldFN0ZXAoTWF0aC5mbG9vciggbGluZS5Mb2dpY0xlbmd0aC8yKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5TZXRTdGVwKFBsYXllclN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gUGxheWVyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1N0YXJ0UG9zaXRpb24gPSB0aGlzLlBsYXllci5Mb2dpY1Bvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShpZHgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbWVyYS5SZXNldChuZXcgTGF5YS5WZWN0b3IzKCksbmV3IExheWEuVmVjdG9yMyh0aGlzLlBsYXllci5Qb3NpdGlvbi54LENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGggKiAxMC41LENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGggKiA5KSx0aGlzLlBsYXllcik7XHJcbiAgICAgICAgdGhpcy5fR29sZE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy5fTG9naWNHb2xkTnVtID0gMDtcclxuXHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkgPSB0aGlzLl9VSU1nci5TaG93KEdhbWVVSSk7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gdGhpcy5HYW1lVGltZSArNjAwMDtcclxuICAgICAgICB0aGlzLl9Cb290b21GbG9vciA9IDA7XHJcbiAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSA9IHRoaXMuX1N0YXJ0Q291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fR2FtZVVwZGF0ZSE9bnVsbCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9HYW1lVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5q2j5bi46L+Q6KGM5pe255qE5q+P5bin6YC76L6RXHJcbiAgICBwcml2YXRlIF9SdW5HYW1lVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuRGlzdGFuY2UgPSB0aGlzLlBsYXllckRpc3RhbmNlO1xyXG4gICAgICAgIGlmKHRoaXMuRnJlc2hCR0NvdW50ID4gMTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9DdXJCRy5VcGRhdGVQYWdlKHRoaXMuUGxheWVyRGlzdGFuY2UpO1xyXG4gICAgICAgICAgICB0aGlzLkZyZXNoQkdDb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICsrdGhpcy5GcmVzaEJHQ291bnQ7XHJcblxyXG4gICAgICAgIHZhciBmbG9vVmVjdG9yOkxheWEuVmVjdG9yMyA9IHRoaXMuVGFpbEZMb29yLlBvc2l0aW9uO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGZsb29WZWN0b3IueiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLno+MypDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1B1c2hGTG9vcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9Db3VudFRpbWUgPCB0aGlzLkdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gdGhpcy5HYW1lVGltZSsgMzAwMDtcclxuICAgICAgICAgICAgdGhpcy5fRGVzdHJveUxpbmUodGhpcy5fQm9vdG9tRmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLl9Cb290b21GbG9vciArPSAxOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vlgJLorqHml7bmnJ/pl7TnmoTmr4/luKfpgLvovpFcclxuICAgIHByaXZhdGUgX1N0YXJ0Q291bnQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0aW1lOnN0cmluZyA9XCJcIlxyXG4gICAgICAgIHZhciBjb3VudFRpbWU6bnVtYmVyID0gdGhpcy5fQ291bnRUaW1lIC0gdGhpcy5HYW1lVGltZTtcclxuICAgICAgICBpZihjb3VudFRpbWU+MClcclxuICAgICAgICAgICAgdGltZSs9IE1hdGguZmxvb3IoIGNvdW50VGltZS8xMDAwKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9HYW1lVXBkYXRlID0gdGhpcy5fUnVuR2FtZVVwZGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gdGhpcy5HYW1lVGltZSArIDMwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5TZXRDb3VudFRpbWUodGltZSk7XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICAvL+WwhuWxguWQkeS4iuWPoFxyXG4gICAgcHJvdGVjdGVkIF9QdXNoRkxvb3IoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBwcmVIZWFkOk1vdW50TGluZSA9IHRoaXMuSGVhZEZsb29yO1xyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9KHRoaXMuX0hlYWRGbG9vcklkeCsxKSV0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuX1RhaWxGTG9vcklkeCA9ICh0aGlzLl9UYWlsRkxvb3JJZHggKzEpJXRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIEhlYWRmbG9vcjpudW1iZXIgPSBwcmVIZWFkLkZsb29yTnVtICsgMTtcclxuICAgICAgICB0aGlzLkhlYWRGbG9vci5TZXRMaW5lKEhlYWRmbG9vcik7XHJcbiAgICAgICAgcHJlSGVhZC5TZXROZXh0Rmxvb3IodGhpcy5IZWFkRmxvb3IpO1xyXG4gICAgICAgIGNvbnNvbGUudGltZShcIlB1dEl0ZW1cIik7XHJcbiAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShIZWFkZmxvb3IpOyAgIFxyXG4gICAgICAgIGNvbnNvbGUudGltZUVuZChcIlB1dEl0ZW1cIik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciDnianlk4HliJfooahcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIF9QdXRJdGVtSW5MaW5lKGZsb29yOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgc2FmZUNvbCA6e1trZXk6c3RyaW5nXSA6QXJyYXk8bnVtYmVyPjt9ID0ge307XHJcbiAgICAgICAgdmFyIGZsb29yTGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICAvL+W4g+e9rui/h+S6huS4jeeUqOWGjeW4g+e9ruS6hlxyXG4gICAgICAgIGlmKGZsb29yTGluZS5MYXlPdXREaXJ0eSlcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICBmbG9vckxpbmUuTGF5T3V0RGlydHkgPSB0cnVlO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgaWYoZmxvb3IgPj0gdGhpcy5fU2FmZUxvY2F0aW9uLlkgKyBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5NYXhMaW5lTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2FmZUNvbCA9IHRoaXMuX0NvdW50T3Blbkxpc3QoZmxvb3IpO1xyXG4gICAgICAgIH1lbHNlKi9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5pGG5pS+5YmN5YWI6K6h566X6K+l5bGC6YCa6Lev5oOF5Ya1IFxyXG4gICAgICAgICAgICBzYWZlQ29sID0ge31cclxuICAgICAgICAgICAgc2FmZUNvbFtcIm9cIl0gPSB0aGlzLl9Db3VudFJvYWRJbmZvKGZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lh7rnlJ/ngrnkuI3mlL7pgZPlhbdcclxuICAgICAgICBpZihmbG9vciA8MSB8fGZsb29yID09IHRoaXMuU2FmZUxvY2F0aW9uLlkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6I635Y+W6K+l6KGM6KaB5pGG5pS+55qE54mp5ZOBXHJcbiAgICAgICAgdGhpcy5fVGFrZUl0ZW1MaXN0KGZsb29yKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5qCH6K6w5LiA5p2h57ud5a+55a6J5YWo55qE6LevXHJcbiAgICAgICAgdmFyIHNhZmVJZHhDb2xsOnsgW2tleTogc3RyaW5nXTogbnVtYmVyOyB9ID17fTtcclxuICAgICAgICBmb3IodmFyIGNvbEtleSBpbiBzYWZlQ29sKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpc3QgPSBzYWZlQ29sW2NvbEtleV07XHJcbiAgICAgICAgICAgIHZhciBzYWZlSWR4ID0gbGlzdFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqbGlzdC5sZW5ndGgpXTtcclxuICAgICAgICAgICAgaWYoc2FmZUlkeENvbGxbc2FmZUlkeF09PXVuZGVmaW5lZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2FmZUlkeENvbGxbc2FmZUlkeF0gPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5oqK6ZyA6KaB5pS+6YGT5YW355qE5qC85a2Q5pS+5YWl6ZqP5py65rGgXHJcbiAgICAgICAgdmFyIGN1ckZsb29yOk1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICB2YXIgcmFuZG9tUG9vbDpBcnJheTxTdGVwPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8v5oqK5a6J5YWo55qE5qC85a2Q5pqC5pe256e75Ye65p2lXHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDpBcnJheTxTdGVwPiA9IG5ldyBBcnJheTxTdGVwPigpO1xyXG4gICAgICAgIGZvciggdmFyIHN0ZXBJZHg6bnVtYmVyID0gMDsgc3RlcElkeCA8IGN1ckZsb29yLkxvZ2ljTGVuZ3RoOysrc3RlcElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0U3RlcDpTdGVwID0gY3VyRmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYoc2FmZUlkeENvbGxbc3RlcElkeF09PXVuZGVmaW5lZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKGdldFN0ZXApO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aUvumZt+mYsVxyXG4gICAgICAgIHZhciBiYXJyaWVyc0xpc3Q6QXJyYXk8TGluZUl0ZW1JbmZvPiA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzO1xyXG4gICAgICAgIHRoaXMuX09yZ2luaXplUHV0SXRlbShiYXJyaWVyc0xpc3QscmFuZG9tUG9vbCx0cnVlKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+aRhuaUvumBk+WFt1xyXG4gICAgICAgIGZvcih2YXIgc2FmZVN0ZXBJZHg6bnVtYmVyID0gMDtzYWZlU3RlcElkeDxzYWZlU3RlcExpc3QubGVuZ3RoOysrc2FmZVN0ZXBJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByYW5kb21Qb29sLnB1c2goc2FmZVN0ZXBMaXN0W3NhZmVTdGVwSWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXdhcmRMaXN0ID0gdGhpcy5DdXJMaW5lUmV3YXJkcztcclxuICAgICAgICB0aGlzLl9Pcmdpbml6ZVB1dEl0ZW0ocmV3YXJkTGlzdCxyYW5kb21Qb29sKTtcclxuICAgICAgICAvL+WGjeasoeiuoeeul+mAmui3r+aDheWGtSBcclxuICAgICAgICAvL3RoaXMuX0NvdW50TGFzdEZsb29yUm9hZChmbG9vcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TGluZUl0ZW1JbmZvPn0gaXRlbUxpc3Qg54mp5ZOB5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFN0ZXA+fSByYW5kb21Qb29sIOWPsOmYtumbhuWQiFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0RlYWRSb2FkIOaYr+WQpuaYr+atu+i3r1xyXG4gICAgICovXHJcbiAgICBfT3JnaW5pemVQdXRJdGVtKGl0ZW1MaXN0OkFycmF5PExpbmVJdGVtSW5mbz4scmFuZG9tUG9vbDpBcnJheTxTdGVwPixpc0RlYWRSb2FkOmJvb2xlYW4gPSBudWxsKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKHZhciBpdGVtSWR4Om51bWJlciA9IDA7aXRlbUlkeCA8IGl0ZW1MaXN0Lmxlbmd0aDsrK2l0ZW1JZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzpMaW5lSXRlbUluZm8gPSBpdGVtTGlzdFtpdGVtSWR4XTtcclxuICAgICAgICAgICAgZm9yKHZhciBkaWZmaWN1bHR5TnVtOm51bWJlciA9IDA7IGRpZmZpY3VsdHlOdW08aW5mby5OdW1iZXI7KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihyYW5kb21Qb29sLmxlbmd0aDwxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/pmo/mnLrmiorpmpznoo3mlL7lhaXmoLzlrZDph4xcclxuICAgICAgICAgICAgICAgIHZhciByYW5kb21JZHg6bnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnJhbmRvbVBvb2wubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSByYW5kb21Qb29sW3JhbmRvbUlkeF07XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnNwbGljZShyYW5kb21JZHgsMSk7XHJcbiAgICAgICAgICAgICAgICBzdGVwLlB1dEl0ZW0oaW5mby5UeXBlKTtcclxuICAgICAgICAgICAgICAgIGlmKGlzRGVhZFJvYWQgIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IGlzRGVhZFJvYWQ7XHJcbiAgICAgICAgICAgICAgICAtLWluZm8uTnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHJhbmRvbVBvb2wubGVuZ3RoPDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGl0ZW1JZHg+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGl0ZW1MaXN0LnNwbGljZSgwLGl0ZW1JZHgpOyAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKumAkuW9kuiuoeeul+mAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yTnVtIOeJqeWTgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBfQ291bnRPcGVuTGlzdChmbG9vck51bTpudW1iZXIpOntba2V5OnN0cmluZ10gOkFycmF5PG51bWJlcj47fVxyXG4gICAge1xyXG4gICAgICAgIGZvcih2YXIgZmxvb3JDb3VudDpudW1iZXIgPSB0aGlzLlBsYXllckZsb29yOyBmbG9vckNvdW50PD1mbG9vck51bTsrK2Zsb29yQ291bnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZmxvb3I6TW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JDb3VudCk7XHJcbiAgICAgICAgICAgIGlmKGZsb29yID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGZvcih2YXIgc3RlcElkeCA9IDA7c3RlcElkeDxmbG9vci5Mb2dpY0xlbmd0aDsrK3N0ZXBJZHgpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgICAgIHN0ZXAuTWFyayA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3I6TW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IodGhpcy5QbGF5ZXJGbG9vcik7XHJcbiAgICAgICAgZm9yKHZhciBzdGVwSWR4ID0gMDtzdGVwSWR4PGZsb29yLkxvZ2ljTGVuZ3RoOysrc3RlcElkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYoIXN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTWFya1N0ZXBzKHN0ZXAsc3RlcElkeCxmbG9vck51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRhcmdldEZsb29yOk1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yTnVtKTtcclxuICAgICAgICAvL+aJvuWHuuiiq+agh+iusOeahOeCueW5tuaVtOeQhuaIkOmbhuWQiFxyXG4gICAgICAgIHZhciBjb2xsZWN0aW9uOntba2V5OnN0cmluZ10gOkFycmF5PG51bWJlcj47fSA9IHt9XHJcbiAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gXCJvXCJcclxuICAgICAgICBmb3IodmFyIG9wZW5JZHg6bnVtYmVyID0gMDtvcGVuSWR4PHRhcmdldEZsb29yLkxvZ2ljTGVuZ3RoOyArK29wZW5JZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1hcmtlZFN0ZXA6U3RlcCA9IHRhcmdldEZsb29yLkdldFN0ZXAob3BlbklkeCk7XHJcbiAgICAgICAgICAgIGlmKG1hcmtlZFN0ZXAuTWFyayE9dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgTmFtZTpzdHJpbmcgPSBuYW1lICsgbWFya2VkU3RlcC5NYXJrO1xyXG4gICAgICAgICAgICAgICAgaWYoY29sbGVjdGlvbltOYW1lXSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbltOYW1lXSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25bTmFtZV0ucHVzaChvcGVuSWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICrpgJLlvZLmoIforrDpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7U3RlcH0gc3RlcCDlj7DpmLZcclxuICAgICAqIEBwYXJhbSB7YW55fSBtYXJrIOagh+iusFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldEZsb29yTnVtIOebruagh+WxguaVsFxyXG4gICAgICovXHJcbiAgICBfTWFya1N0ZXBzKHN0ZXA6U3RlcCxtYXJrOmFueSx0YXJnZXRGbG9vck51bTpudW1iZXIpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICBpZihzdGVwLklzRGVhZFJvYWQpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZihzdGVwLkZsb29yLkZsb29yTnVtPj10YXJnZXRGbG9vck51bSApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihzdGVwLk1hcmsgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdGVwLk1hcmsgPSBtYXJrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsZWZ0T3Blbjpib29sZWFuO1xyXG4gICAgICAgIHZhciByaWdodE9wZW46Ym9vbGVhbjtcclxuICAgICAgICB2YXIgbGVmdFBhcmVudDpTdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgIGlmKGxlZnRQYXJlbnQgIT0gbnVsbCAmJiAhbGVmdFBhcmVudC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYobGVmdFBhcmVudC5NYXJrPT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBsZWZ0T3BlbiA9IHRoaXMuX01hcmtTdGVwcyhsZWZ0UGFyZW50LG1hcmssdGFyZ2V0Rmxvb3JOdW0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBsZWZ0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByaWdodFBhcmVudDpTdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICBpZihyaWdodFBhcmVudCAhPSBudWxsICYmICFyaWdodFBhcmVudC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocmlnaHRQYXJlbnQuTWFyaz09dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmlnaHRPcGVuID0gdGhpcy5fTWFya1N0ZXBzKHJpZ2h0UGFyZW50LG1hcmssdGFyZ2V0Rmxvb3JOdW0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByaWdodE9wZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzdGVwLk1hcmsgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RlcC5NYXJrID0gbWFya1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZighbGVmdE9wZW4mJiFyaWdodE9wZW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmnIDlkI7lho3orqHnrpfkuIDmrKHor6XlsYLpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vck51bSBcclxuICAgICAqL1xyXG4gICAgX0NvdW50TGFzdEZsb29yUm9hZChmbG9vck51bTpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZihmbG9vck51bSA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3IgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSk7XHJcbiAgICAgICAgdmFyIGxhc3RGbG9vciA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yTnVtIC0xICk7XHJcbiAgICAgICAgZm9yKHZhciBzdGVwSWR4ID0wO3N0ZXBJZHg8Zmxvb3IuTG9naWNMZW5ndGg7KytzdGVwSWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IGZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgIGlmKCFzdGVwLklzRGVhZFJvYWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBMZWZ0U3RlcCA9IHN0ZXAuTGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgdmFyIFJpZ2h0U3RlcCA9IHN0ZXAuUmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICAgIGlmKExlZnRTdGVwIT1udWxsKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFMZWZ0U3RlcC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytMZWZ0U3RlcC5Sb2FkTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKFJpZ2h0U3RlcCE9bnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZighUmlnaHRTdGVwLklzRGVhZFJvYWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK1JpZ2h0U3RlcC5Sb2FkTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IodmFyIGxhc3RTdGVwSWR4ID0gMDtsYXN0U3RlcElkeDwgbGFzdEZsb29yLkxvZ2ljTGVuZ3RoOysrbGFzdFN0ZXBJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RlcCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZighc3RlcC5Jc0RlYWRSb2FkJiZzdGVwLlJvYWROdW08MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy/lkJHkuIrpgJLlvZLmiormiYDmnInkuI7kuYvnm7jov57nmoToioLngrnmlbDnu5nkv67mraPkuoZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUvumBk+WFt+WJjeeul+mAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIFxyXG4gICAgICovXHJcbiAgICBfQ291bnRSb2FkSW5mbyhmbG9vcjpudW1iZXIpOkFycmF5PG51bWJlcj5cclxuICAgIHtcclxuICAgICAgICB2YXIgc2FmZVN0ZXBMaXN0OkFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgICAgICB2YXIgdGhpc0Zsb29yOk1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcm9hZE51bTpudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBsYXN0Rmxvb3I6TW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IgLTEpO1xyXG4gICAgICAgIGlmKGZsb29yID09IHRoaXMuX1NhZmVMb2NhdGlvbi5ZKVxyXG4gICAgICAgICAgICB0aGlzLl9SZXNldFN0ZXBJbmZvKHRoaXNGbG9vcik7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKHZhciBsb2dpY0lkeDpudW1iZXIgPSAwOyBsb2dpY0lkeDx0aGlzRmxvb3IuTG9naWNMZW5ndGg7Kytsb2dpY0lkeClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgICAgIHZhciBsZWZ0Q2hpbGQ6U3RlcCA9IHN0ZXAuTGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0Q2hpbGQ6U3RlcCA9IHN0ZXAuUmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICAgIGlmKGxlZnRDaGlsZCE9IG51bGwgJiYgIWxlZnRDaGlsZC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHJpZ2h0Q2hpbGQhPSBudWxsICYmICFyaWdodENoaWxkLklzRGVhZFJvYWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZVN0ZXBMaXN0LnB1c2gobG9naWNJZHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZihmbG9vciA9PSB0aGlzLl9TYWZlTG9jYXRpb24uWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzYWZlU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKHRoaXMuX1NhZmVMb2NhdGlvbi5YKTtcclxuICAgICAgICAgICAgc2FmZVN0ZXAuSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaCh0aGlzLl9TYWZlTG9jYXRpb24uWCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2FmZVN0ZXBMaXN0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3I6TW91bnRMaW5lKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzRmxvb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgbG9naWNJZHg6bnVtYmVyID0gMDsgbG9naWNJZHg8dGhpc0Zsb29yLkxvZ2ljTGVuZ3RoOysrbG9naWNJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gdGhpc0Zsb29yLkdldFN0ZXAobG9naWNJZHgpO1xyXG4gICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluafkOmBk+WFt+S/oeaBr1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9Zmxvb3IgXHJcbiAgICAgKi9cclxuICAgIF9UYWtlSXRlbUxpc3QoZmxvb3I6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciBpdGVtTGlzdCA9IG5ldyBBcnJheShsaW5lLkxvZ2ljTGVuZ3RoKTtcclxuICAgICAgICB2YXIgbGluZVJld2FyZHMgPSB0aGlzLkl0ZW1MYXlvdXQuVGFrZUxpbmVSZXdhcmQoZmxvb3IpO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSB0aGlzLkN1ckxpbmVSZXdhcmRzLmNvbmNhdChsaW5lUmV3YXJkcyk7XHJcbiAgICAgICAgaWYodGhpcy5TYWZlTG9jYXRpb24uWSA+Zmxvb3IgfHwgZmxvb3I+dGhpcy5TYWZlTG9jYXRpb24uWSsxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxpbmVCYXJyaWVycyA9IHRoaXMuSXRlbUxheW91dC5UYWtlTGluZURpZmZpY3VsdHkoZmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzLmNvbmNhdChsaW5lQmFycmllcnMpOyAgIFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5DdXJMaW5lQmFycmllcnMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWhjOmZt+afkOS4gOWxglxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9Zmxvb3IgXHJcbiAgICAgKi9cclxuICAgIF9EZXN0cm95TGluZShmbG9vcjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRhaWxGbG9vciA9IHRoaXMuVGFpbEZMb29yO1xyXG4gICAgICAgIGlmKGZsb29yIDx0YWlsRmxvb3IuRmxvb3JOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvcih2YXIgY291bnRGbG9vcjpudW1iZXIgPSB0YWlsRmxvb3IuRmxvb3JOdW07Y291bnRGbG9vcjw9IGZsb29yOysrY291bnRGbG9vcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRGbG9vcjpNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihjb3VudEZsb29yKTtcclxuICAgICAgICAgICAgdGFyZ2V0Rmxvb3IuQnJlYWsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgIH1cclxufVxyXG4iLCIvKlxyXG7kvZzogIU6TW9cclxu6Lez5bGx576K5Zy65pmv5qC45b+D5Yqf6IO9XHJcbiovXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW5kR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgR2FtZUNhbWVyYSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVDYW1lcmFcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLy4uL0dhbWUvUGxheWVyXCJcclxuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi8uLi91aS9HYW1lVUlcIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuLy4uL0dhbWUvTW91bnRMaW5lXCJcclxuaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vLi4vR2FtZS9TdGVwXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiO1xyXG50eXBlIEl0ZW1MYXlvdXQgPSBJdGVtLkl0ZW1MYXlvdXQ7XHJcbnR5cGUgTGluZUl0ZW1JbmZvID0gSXRlbS5MaW5lSXRlbUluZm87XHJcbnZhciBJdGVtVHlwZSA9IEl0ZW0uSXRlbVR5cGU7XHJcbi8v5ri45oiP5Zy65pmvXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIEJhc2VTY2VuZVxyXG57XHJcbiAgICBNb2RlbExvYWQ6Ym9vbGVhbjtcclxuICAgIEdhbWVEaXI6R2FtZURpcmVjdG9yO1xyXG4gICAgLy/lr7nlpJbmjqXlj6NcclxuICAgIFN0YXJ0TG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChbcGF0aC5HZXREZXBhdGhVSUpTKFwiUGxheWVyTGlzdFwiKSxwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpLHBhdGguR2V0RGVwYXRoVUlKUyhcIkVuZEdhbWVcIildLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9Mb2FkQ29tcGxldGUpKTtcclxuICAgICAgICBzdXBlci5TdGFydExvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBfU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuX1VwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfR2VuRGlyKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR2FtZURpciA9IG5ldyBHYW1lRGlyZWN0b3IoKTtcclxuICAgICAgICB0aGlzLkN1ckRpciA9IHRoaXMuR2FtZURpcjtcclxuXHJcbiAgICB9XHJcbiAgICAvL+emu+W8gOaXtui/m+ihjOmFjee9rlxyXG4gICAgcHJvdGVjdGVkIF9MZWF2ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9NZXNzYWdlTWdyLkRlc1JnaXN0SURLKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgIHN1cGVyLl9MZWF2ZSgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9Mb2FkQ29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU2NlbmUgPSBuZXcgTGF5YS5TY2VuZTNEKCk7XHJcbiAgICAgICAgdGhpcy5TY2VuZS5hbWJpZW50Q29sb3IgPSBuZXcgTGF5YS5WZWN0b3IzKDEsMSwxKVxyXG4gICAgICAgIHN1cGVyLl9Mb2FkQ29tcGxldGUoKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW50ZXJHYW1lVUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWlkZXJNYW5hZ2VyIFxyXG57XHJcbi8v5a+55aSW5o6l5Y+jXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTWdyOkd1aWRlck1hbmFnZXI7XHJcbiAgICBzdGF0aWMgZ2V0IE1ncigpOkd1aWRlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZihHdWlkZXJNYW5hZ2VyLl9NZ3IgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEd1aWRlck1hbmFnZXIuX01nciA9IG5ldyBHdWlkZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHdWlkZXJNYW5hZ2VyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBTY2VuZU1ncjpTY2VuZU1hbmFnZXI7XHJcbiAgICBDdXJTY2VuZTpHdWlkZXJTY2VuZTtcclxuICAgIGdldCBHYW1lRGlyKCk6R3VpZGVyRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTY2VuZS5HdWlkRGlyO1xyXG4gICAgfVxyXG4gICAgLy/ov5vlhaXmuLjmiI/lnLrmma/otbDov5nkuKrmjqXlj6NcclxuICAgIEVudGVyU2NlbmUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5ld0dhbWVTY2VuZSA9IG5ldyBHdWlkZXJTY2VuZSgpO1xyXG4gICAgICAgIHRoaXMuU2NlbmVNZ3IuRW50ZXJTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBuZXdHYW1lU2NlbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNjZW5lTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxTY2VuZU1hbmFnZXI+KFNjZW5lTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlclNjZW5lIGV4dGVuZHMgQmFzZVNjZW5lXHJcbntcclxuICAgIEd1aWREaXI6R3VpZGVyRGlyZWN0b3I7XHJcbiAgICBDdXJEaXI6QmFzZURpcmVjdG9yO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBTdGFydExvYWQoIClcclxuICAgIHtcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKFt7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIikgLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpwYXRoLkdldEF0bFBhdGgoXCJjb21wXCIpLHR5cGU6IExheWEuTG9hZGVyLkFUTEFTIH1dLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9Mb2FkQ29tcGxldGUpKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfR2VuRGlyKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR3VpZERpciA9IG5ldyBHdWlkZXJEaXJlY3RvcigpO1xyXG4gICAgICAgIHRoaXMuQ3VyRGlyID0gdGhpcy5HdWlkRGlyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJEaXJlY3RvciBleHRlbmRzIEJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBVSTpFbnRlckdhbWVVSTtcclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoIClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0Q29tcGxldGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgICAgICB0aGlzLlVJID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcikuU2hvdzxFbnRlckdhbWVVST4oRW50ZXJHYW1lVUkpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vLi4vdWkvbGF5YU1heFVJXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IExvYWRpbmdVSSBmcm9tIFwiLi8uLi91aS9VbkRvd25sb2FkL0xvYWRpbmdVSVwiXHJcbmltcG9ydCBGTVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuL0d1aWRlck1hbmFnZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBCRyBmcm9tIFwiLi8uLi91aS9CR1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkU2NlbmUgZXh0ZW5kcyBCYXNlU2NlbmVcclxue1xyXG4gICAgQ3VyRGlyOkJhc2VEaXJlY3RvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfR2VuRGlyKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyRGlyID0gbmV3IExvYWREaXJjdG9yKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFN0YXJ0TG9hZCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVzQ29sID0gW3t1cmw6XCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpcInVpL1Jlc291cmNlL2xvY2FsY29tcC5hdGxhc1wiLHR5cGU6TGF5YS5Mb2FkZXIuQVRMQVN9XTtcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHJlc0NvbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fTG9hZENvbXBsZXRlKSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuY2xhc3MgTG9hZERpcmN0b3IgZXh0ZW5kcyBCYXNlRGlyZWN0b3Jcclxue1xyXG4gICAgVUk6TG9hZGluZ1VJO1xyXG4gICAgXHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIF9Db3VudDJETG9hZDpudW1iZXI7XHJcbiAgICBfQ291bnQzRExvYWQ6bnVtYmVyO1xyXG4gICAgX0xvYWRGYWlsZTpib29sZWFuO1xyXG4gICAgX0NvdW50VmFsdWU6bnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fQ291bnQzRExvYWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5fQ291bnQyRExvYWQgPSAwLjU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9TdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub24oTGF5YS5FdmVudC5FUlJPUix0aGlzLHRoaXMuX29uRXJyb3IpO1xyXG4gICAgICAgIExheWEubG9hZGVyLm9uKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLl9vbkNvbXBsZXRlKTtcclxuICAgICAgICB0aGlzLkxvYWQoKTtcclxuICAgICAgICBzdXBlci5fU3RhcnQoKTtcclxuICAgICAgICB0aGlzLl9Mb2FkRmFpbGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0Q29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLl9TdGFydENvbXBsZXRlKCk7XHJcbiAgICAgICAgdGhpcy5VSSA9IEFQUC5VSU1hbmFnZXIuU2hvdzxMb2FkaW5nVUk+KExvYWRpbmdVSSk7XHJcbiAgICAgICAgdGhpcy5VSS5VcGRhdGUoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBMb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Db3VudDJETG9hZCA9MDtcclxuICAgICAgICB0aGlzLl9Db3VudDNETG9hZCA9MDtcclxuICAgICAgICB0aGlzLl9Db3VudFZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLl9Mb2FkRmFpbGUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UyREFyciA9IFtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAge3VybDpcInJlcy91aWpzb24vUGxheWVyTGlzdC5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfSxcclxuICAgICAgICAgICAge3VybDpcInJlcy91aWpzb24vQ2hhcmFjdGVycy5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfSxcclxuICAgICAgICAgICAge3VybDpcInJlcy91aWpzb24vU2V0UGFuZWwuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0sXHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJTZXRQYW5lbFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkNoYXJhY3RlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiUGxheWVyTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQkdcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImNvbXBcIilcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAvL3Jlc291cmNlMkRBcnIgPSBudWxsO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIHJlc291cmNlM0RBcnIgPSBbXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX3BsYXRfMDEvTDAxX3Nwcl9wbGF0XzAxLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX3BsYXRfMDIvTDAxX3Nwcl9wbGF0XzAyLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX3BsYXRfMDMvTDAxX3Nwcl9wbGF0XzAzLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX2JhcnJpZXJfMDEvTDAxX3Nwcl9iYXJyaWVyXzAxLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX2JhcnJpZXJfMDIvTDAxX3Nwcl9iYXJyaWVyXzAyLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfc3ByX2JhcnJpZXJfMDMvTDAxX3Nwcl9iYXJyaWVyXzAzLmxoXCIsXHJcbiAgICAgICAgXCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL0xheWFTY2VuZV9jaGlsZF8wMS9jaGlsZF8wMS5saFwiXSovXHJcbiAgICAgICAgTGF5YS5sb2FkZXIub24oTGF5YS5FdmVudC5FUlJPUix0aGlzLHRoaXMuX29uRXJyb3IpO1xyXG4gICAgICAgIExheWEubG9hZGVyLm9uKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLl9vbkNvbXBsZXRlKTtcclxuICAgICAgICAvL3ZhciByZXNvdXJjZTNEQXJyID0gW1wiQzovVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfYXV0X2JhcnJpZXJfMDIvTGF5YVNjZW5lX0wwMV9hdXRfYmFycmllcl8wMi9Db252ZW50aW9uYWwvTDAxX2F1dF9iYXJyaWVyXzAyLmxoXCJdO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTNEQXJyID0gWyBcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDFfY2hpbGRfMDFcIikgLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzA0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9jb2luXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfY2hvbXBlcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX3N0aW5nXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRcIiksXHJcbiAgICAgICAgLy9wYXRoLkdldFNreUJveChcInNreUN1YmVcIilcclxuICAgICAgICAvKlxyXG4gICAgICAgIHBhdGguUmVzb3VyY2VQYXRoICtcIkxheWFTY2VuZV9MMDFfc3ByX3BsYXRfMDMvQ29udmVudGlvbmFsL0wwMV9zcHJfcGxhdF8wMy5saFwiLFxyXG4gICAgICAgICovXHJcbiAgICAgICAgXS8vIFwiQzovVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfYXV0X2JhcnJpZXJfMDIvTGF5YVNjZW5lX0wwMV9hdXRfYmFycmllcl8wMi9Db252ZW50aW9uYWwvTDAxX2F1dF9iYXJyaWVyXzAyLmxoXCJdO1xyXG4gICAgICAgIHRoaXMuX0xvYWQocmVzb3VyY2UyREFycixyZXNvdXJjZTNEQXJyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9Mb2FkKGFycjJEOkFycmF5PGFueT4gPSBudWxsLGFycjNEOkFycmF5PGFueT49bnVsbClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZihhcnIyRCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgLy8gTGF5YS5sb2FkZXIubG9hZChhcnIyRCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fb25Mb2FkZWQpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9vbjJEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKGFycjJELG51bGwsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX29uMkRQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy5fQ291bnRWYWx1ZSs9MC41O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudDJETG9hZCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFycjNEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY3JlYXRlKGFycjNELExheWEuSGFuZGxlci5jcmVhdGUodGhpcyxudWxsKSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fb24zRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgIHRoaXMuX0NvdW50VmFsdWUrPTAuNTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQzRExvYWQgPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfb25FcnJvcihzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0xvYWRGYWlsZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvYWRFcnJvcjpcIitzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfb24zRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0NvdW50M0RMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMuVUkuVmFsdWUgPSAodGhpcy5fQ291bnQyRExvYWQgKyB0aGlzLl9Db3VudDNETG9hZCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX29uMkRQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9Db3VudDJETG9hZCA9dmFsdWUvMjtcclxuICAgICAgICB0aGlzLlVJLlZhbHVlID0gdGhpcy5fQ291bnQyRExvYWQgKyB0aGlzLl9Db3VudDNETG9hZDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfb25Db21wbGV0ZShkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aGlEaXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLlVJLlJlbG9hZChmdW5jdGlvbigpOnZvaWR7dGhpRGlyLkxvYWQoKX0gKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5CRyA9IG5ldyBCRygpO1xyXG4gICAgICAgICAgICB0aGlzLlVJLkNvbXBsZXRlKCgpPT57R3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICB0aGlzLlVJLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBwYXRoXHJcbntcclxuICAgIGV4cG9ydCB2YXIgSXNFZGl0b3I6Ym9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGV4cG9ydCB2YXIgU2NlbmVBc3NldFBhdGg6c3RyaW5nID0gXCJMYXlhU2NlbmVfXCI7XHJcbiAgICBleHBvcnQgdmFyIFJlc291cmNlUGF0aDpzdHJpbmcgPSBJc0VkaXRvcj9cIkQ6L0dJdC9SZXNvdXJjZXMvTGF5YVByb2plY3QvRnJlc2hQcm9qZWN0L215TGF5YS9OZXRSZXNvdXJjZV8zXzgvXCI6XCJodHRwOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL05ldFJlc291cmNlXzNfOC9cIjtcclxuICAgIGV4cG9ydCB2YXIgVUlQYXRoOnN0cmluZyA9IFJlc291cmNlUGF0aCArIFwiVUkvXCI7XHJcbiAgICBleHBvcnQgdmFyIE1vZGVsUGF0aDpzdHJpbmcgPSBSZXNvdXJjZVBhdGgrXCIzRC9cIlxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlkF0bOaWh+S7tui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0QXRsUGF0aChmaWxlTmFtZTpzdHJpbmcpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBVSVBhdGggKyBmaWxlTmFtZStcIi5hdGxhc1wiO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZVSUpzb27ot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldERlcGF0aFVJSlMoZmlsZU5hbWU6c3RyaW5nKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIFVJUGF0aCtmaWxlTmFtZStcIi5qc29uXCI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlmxo5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRMSChmaWxlTmFtZTpzdHJpbmcpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNb2RlbFBhdGggK1NjZW5lQXNzZXRQYXRoK2ZpbGVOYW1lK1wiL0NvbnZlbnRpb25hbC9cIiArZmlsZU5hbWUgKyBcIi5saFwiXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIFVJRnVuY1xyXG57XHJcbiAgICAvL+iuoeeul+e8qeaUvuWAvFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvdW50U2NhbGVGaXgoIHdpZHRoOm51bWJlciApOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF3aWR0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFnZVdpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB2YXIgc2NhbGU6bnVtYmVyID0gTGF5YS5zdGFnZS53aWR0aC93aWR0aDtcclxuICAgICAgICByZXR1cm4gIHNjYWxlO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEZpeFVJKCB2aWV3OkxheWEuU3ByaXRlIClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBVSUZ1bmMuQ291bnRTY2FsZUZpeCh2aWV3LndpZHRoKTtcclxuICAgICAgICB2aWV3LnNjYWxlWCA9IHNjYWxlO1xyXG4gICAgICAgIHZpZXcuc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgdmlldy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodC9zY2FsZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1nciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCIgXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQUFxyXG57XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTWVzc2FnZTpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgIHN0YXRpYyBnZXQgTWVzc2FnZU1hbmFnZXIoKTpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEFQUC5fTWVzc2FnZT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuX01lc3NhZ2UgPSBGVy5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX01lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX1VJTWFuYWdlcjpVSU1hbmFnZXI7XHJcbiAgICBzdGF0aWMgZ2V0IFVJTWFuYWdlcigpOlVJTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEFQUC5fVUlNYW5hZ2VyPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5fVUlNYW5hZ2VyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX1VJTWFuYWdlcjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIF9TY2VuZU1ncjpTY2VuZU1ncjtcclxuICAgIHN0YXRpYyBnZXQgU2NlbmVNYW5hZ2VyKCk6U2NlbmVNZ3JcclxuICAgIHtcclxuICAgICAgICBpZihBUFAuX1NjZW5lTWdyPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5fU2NlbmVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFNjZW5lTWdyPihTY2VuZU1ncik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX1NjZW5lTWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbiIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IFNldFBhbmVsVUkgZnJvbSBcIi4vLi4vdWkvU2V0UGFuZWxVSVwiXHJcbmltcG9ydCBDaGFyYWN0ZXJVSSBmcm9tIFwiLi8uLi91aS9DaGFyYWN0ZXJVSVwiXHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZVNjZW5lXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuL0FQUFwiXHJcblxyXG50eXBlIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGVyXHJcbntcclxuICAgIHN0YXRpYyBnZXQgR2FtZUNvbnRyb2xlcigpOkdhbWVDb250cm9sZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIEdhbWVDb250cm9sZXIuTWdyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ29udHJvbGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6IEdhbWVDb250cm9sZXI7XHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgTWdyKCk6IEdhbWVDb250cm9sZXIge1xyXG4gICAgICAgIGlmIChHYW1lQ29udHJvbGVyLl9NZ3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBHYW1lQ29udHJvbGVyLl9NZ3IgPSBuZXcgR2FtZUNvbnRyb2xlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR2FtZUNvbnRyb2xlci5fTWdyO1xyXG4gICAgfVxyXG4gICAgX0xpbmVTdGVwTnVtOm51bWJlcjtcclxuICAgIF9NYXhMaW5lTnVtOm51bWJlcjtcclxuICAgIF9TdGVwTGVuZ3RoOm51bWJlcjtcclxuICAgIF9TdGVwRGlzdGFuY2U6bnVtYmVyO1xyXG4gICAgX1BsYXllck1vdmVUaW1lOm51bWJlcjtcclxuICAgIC8v5bi46YeP5a6a5LmJXHJcbiAgICAvL+avj+ihjOacgOWkp+agvOWtkOaVsFxyXG4gICAgZ2V0IExpbmVTdGVwTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9MaW5lU3RlcE51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xpbmVTdGVwTnVtID0gNSsyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTGluZVN0ZXBOdW07XHJcbiAgICB9IFxyXG4gICAgLy/mnIDlpKfooYzmlbBcclxuICAgIGdldCBNYXhMaW5lTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9NYXhMaW5lTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTWF4TGluZU51bSA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTWF4TGluZU51bTtcclxuICAgIH0gXHJcbiAgICAvL+agvOWtkOi+uemVv1xyXG4gICAgZ2V0IFN0ZXBMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcExlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBMZW5ndGggPSAwLjk4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcExlbmd0aDtcclxuICAgIH1cclxuICAgIC8v5qC85a2Q5pac5a+56KeS6ZW/5bqmXHJcbiAgICBnZXQgU3RlcERpc3RhbmNlKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1N0ZXBEaXN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBEaXN0YW5jZSA9IE1hdGguc3FydCgodGhpcy5TdGVwTGVuZ3RoICogdGhpcy5TdGVwTGVuZ3RoKSAqIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcERpc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/njqnlrrbnp7vliqjml7bpl7RcclxuICAgIGdldCBQbGF5ZXJNb3ZlVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9QbGF5ZXJNb3ZlVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1BsYXllck1vdmVUaW1lID0gMC4wMiAqIDEwMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fUGxheWVyTW92ZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGxheWVySUQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJTZWxlY3RlZFwiICsgaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66K6+572u6Z2i5p2/XHJcbiAgICBTaG93U2V0UGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIFBhbmVsID0gQVBQLlVJTWFuYWdlci5TaG93PFNldFBhbmVsVUk+KFNldFBhbmVsVUkpOy8vIG5ldyBTZXRQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66KeS6Imy6Z2i5p2/XHJcbiAgICBwdWJsaWMgU2hvd0NoYXJhY3RlclBhbmVsKCkge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBBUFAuVUlNYW5hZ2VyLlNob3c8Q2hhcmFjdGVyVUk+KENoYXJhY3RlclVJKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TZXRJbmZvO1xyXG4gICAgZ2V0IFNldEluZm8oKTogR2FtZVN0cnVjdC5TZXRJbmZvIHtcclxuICAgICAgICBpZiAodGhpcy5fU2V0SW5mbyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1NldEluZm8gPSBuZXcgR2FtZVN0cnVjdC5TZXRJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TZXRJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBTZXRJbmZvKHZhbHVlOiBHYW1lU3RydWN0LlNldEluZm8pIHtcclxuICAgICAgICB0aGlzLl9TZXRJbmZvID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kv53lrZjorr7nva7mlbDmja5cclxuICAgIFNhdmVTZXRJbmZvKGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuU2V0SW5mbyA9IGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLy/or7vlj5borr7nva7kv6Hmga9cclxuICAgIEdldFNldEluZm8oKTogR2FtZVN0cnVjdC5TZXRJbmZvIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TZXRJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIEVudGVyR2FtZVVJKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuRW50ZXJTY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgRW50ZXJHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuRW50ZXJTY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEdhbWVEaXIoKTogR2FtZURpcmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIgYXMgR2FtZURpcmVjdG9yO1xyXG4gICAgfVxyXG4gICAgLy/ov5vlhaXmuLjmiI/lnLrmma/otbDov5nkuKrmjqXlj6NcclxuICAgIEVudGVyU2NlbmUoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIG5ld0dhbWVTY2VuZSA9IG5ldyBHYW1lU2NlbmUoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkVudGVyU2NlbmUobmV3R2FtZVNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkEJVRkbooajnjrDmlYjmnpxcclxuICAgIEdlbkJ1ZmZFZmZlY3QodHlwZTogSXRlbVR5cGUpOiBMYXlhLlNwcml0ZTNEIHtcclxuICAgICAgICByZXR1cm4gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtRWxlbWVudCBleHRlbmRzIExheWEuQm94ICB7XHJcbiAgICAvL1xyXG4gICAgSWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9CdG46IExheWEuQnV0dG9uO1xyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiAge1xyXG4gICAgICAgIGlmICh0aGlzLl9CdG4gPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG4gICAgU2V0QnRuKG93bmVyOiBhbnksIGxpc3RlbmVyOiAoKSA9PiB2b2lkKSAge1xyXG4gICAgICAgIHRoaXMuQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcbiAgICAvL1xyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlRWxlbWVudCBleHRlbmRzIExheWEuSW1hZ2Vcclxue1xyXG4gICAgLy9cclxuICAgIElkeDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9CdG46TGF5YS5CdXR0b247XHJcbiAgICBnZXQgQnRuKCk6TGF5YS5CdXR0b25cclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9CdG4gPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICAgICAgdGhpcy5fQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e1xyXG4gICAgICAgICAgICAgICAgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNldFBsYXllcklEKHRoaXMuSWR4KTtcclxuICAgICAgICAgICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9CdG47XHJcbiAgICB9XHJcbiAgICBSZXNldCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5CdG4pXHJcbiAgICAgICAge31cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0e0Jhc2VGdW5jfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJHVUkgZXh0ZW5kcyB1aS5CR1VJIHtcclxuICAgIFxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSkpO1xyXG4gICAgfVxyXG4gICAgLy9wcml2YXRlIF9Ta3lBcnI6QXJyYXk8TGF5YS5TcHJpdGU+O1xyXG4gICAgcHJpdmF0ZSBfU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9UZW1wU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9TY2FsZVNreTpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9TY2FsZUVhcnRoOm51bWJlcjtcclxuICAgIHByaXZhdGUgX0VhcnRoU3RhcnRQUzpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgd2lkaCA9IExheWEuc3RhZ2Uud2lkdGggO1xyXG4gICAgICAgIHZhciByYXRlID0gTWF0aC5jZWlsKExheWEuc3RhZ2UuaGVpZ2h0L3dpZGgpO1xyXG5cclxuICAgICAgICB0aGlzLl9Ta3lRdWUgPSBuZXcgQmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPigpO1xyXG4gICAgICAgIHRoaXMuX1RlbXBTa3lRdWUgPSBuZXcgQmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPigpO1xyXG4gICAgICAgICAvL25ldyBBcnJheTxMYXlhLkltYWdlPihyYXRlKzEpO1xyXG4gICAgICAgIGZvcihsZXQgc3RhcnRJZHggPSAwO3N0YXJ0SWR4PHJhdGUrMTsgKytzdGFydElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2U6TGF5YS5JbWFnZSA9IG5ldyBMYXlhLkltYWdlKCk7XHJcbiAgICAgICAgICAgIGltYWdlLmxvYWRJbWFnZShcImNvbXAvaW1nX2JhY2tncm91bmRfc3ByX3NreS5wbmdcIik7XHJcbiAgICAgICAgICAgIGltYWdlLndpZHRoID0gd2lkaDtcclxuICAgICAgICAgICAgaW1hZ2UuaGVpZ2h0ID0gd2lkaCt3aWRoKjAuMDE7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9Ta3lRdWUuUHVzaChpbWFnZSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICB0aGlzLlNldFNreSgwKTtcclxuICAgICAgICB2YXIgZWFydGggPSBuZXcgTGF5YS5JbWFnZSgpO1xyXG4gICAgICAgIGVhcnRoLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fRWFydGhTdGFydFBTID0gZWFydGgueTtcclxuICAgICAgICBlYXJ0aC5sb2FkSW1hZ2UoXCJjb21wL2ltZ19iYWNrZ3JvdW5kX3Nwci5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5fRWFydGggPSBlYXJ0aDtcclxuICAgICAgICBlYXJ0aC53aWR0aCA9IHdpZGg7XHJcbiAgICAgICAgZWFydGguaGVpZ2h0ID0gd2lkaDtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGVhcnRoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9TY2FsZVNreSA9IDAuMDAxXHJcbiAgICAgICAgdGhpcy5fU2NhbGVFYXJ0aCA9IDAuMDFcclxuICAgICAgICAvL3RoaXMuX0VhcnRoU3RhcnRQUyA9IHRoaXMuX0VhcnRoLnk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgZm9yKGxldCBzdGFydElkeDpudW1iZXIgPSAwO3N0YXJ0SWR4PHRoaXMuX1NreVF1ZS5Db3VudDsrK3N0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1NreUFycltzdGFydElkeF0ueSA9IHN0YXJ0SWR4ICogaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9FYXJ0aC55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0VhcnRoU3RhcnRQUyA9IHRoaXMuX0VhcnRoLnk7XHJcbiAgICB9Ki9cclxuICAgIC8v6auY5bqm6L2s5bGP5bmV6auY5bqm5YOP57SgXHJcbiAgICBIZWlnaHRUcmFuc1BpeCggaGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0Ki0wLjE7XHJcbiAgICB9XHJcbiAgICBTZXRTa3kocGl4SGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT4gPSB0aGlzLl9UZW1wU2t5UXVlO1xyXG4gICAgICAgIHRlbVNreVF1ZS5DbGVhcigpO1xyXG4gICAgICAgIHZhciBjb3VudDpudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHdoaWxlKHRoaXMuX1NreVF1ZS5Db3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6QmFzZUZ1bmMuTm9kZTxMYXlhLlNwcml0ZT4gPSB0aGlzLl9Ta3lRdWUuUG9wTm9kZSgpO1xyXG4gICAgICAgICAgICB2YXIgc2t5SW1nOkxheWEuU3ByaXRlID0gbm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgc2t5SW1nLnkgPSBjb3VudCAqIGhlaWdodCArIHBpeEhlaWdodCAtIGhlaWdodCAtIGhlaWdodCowLjAxO1xyXG4gICAgICAgICAgICB0ZW1Ta3lRdWUuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgIGlmKHNreUltZy55PkxheWEuc3RhZ2UuaGVpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBza3lJbWcueSA9IHRlbVNreVF1ZS5IZWFkVmFsdWUueSAtIGhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK2NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9UZW1wU2t5UXVlID0gdGhpcy5fU2t5UXVlO1xyXG4gICAgICAgIHRoaXMuX1NreVF1ZSA9IHRlbVNreVF1ZTtcclxuICAgIH1cclxuICAgIFNldEVhcnRoKGhlaWdodDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRWFydGgueSA9IHRoaXMuX0VhcnRoU3RhcnRQUyArIGhlaWdodDtcclxuICAgIH1cclxuICAgIFVwZGF0ZVBhZ2UoIGhlaWdodDpudW1iZXIgKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgLy9oZWlnaHQgPSB0aGlzLkhlaWdodFRyYW5zUGl4KGhlaWdodCk7XHJcbiAgICAgICAgLy92YXIgc2t5SGVpZ2h0UGl4ID0gaGVpZ2h0KnRoaXMuX1NjYWxlU2t5O1xyXG4gICAgICAgIHRoaXMuU2V0U2t5KGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5TZXRFYXJ0aChoZWlnaHQpO1xyXG4gICAgICAgIC8vdmFyIGVhcnRoSGVpZ2h0UGl4ID0gaGVpZ2h0O1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge1VJRnVuY30gZnJvbSBcIi4vLi4vVXRpbGl0eS9VSUZ1bmNcIlxyXG4vL1VJ5Z+657G7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VVSSBleHRlbmRzIExheWEuU3ByaXRlXHJcbntcclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKClcclxuICAgIHtcclxuICAgICAgICAvL1VJTWFuYWdlci4uQ2xvc2UodGhpcyk7XHJcbiAgICAgICAgdmFyIHVpTWdyOlVJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIE9wZW5PUCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIENsb3NlT1AoKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIERlc3Ryb3koIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgVUlUeXBlKCk6QmFzZUVudW0uVUlUeXBlRW51bVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9VSVR5cGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBJc011dGV4KCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Jc011dGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX05hbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vXHJcbiAgICBwcm90ZWN0ZWQgX1VJVHlwZTpCYXNlRW51bS5VSVR5cGVFbnVtO1xyXG4gICAgcHJvdGVjdGVkIF9Jc011dGV4OmJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX05hbWU6c3RyaW5nOyAgICBcclxuICAgIHByb3RlY3RlZCBfVUlNYW5hZ2VyOlVJTWFuYWdlclxyXG4gICAgcHJpdmF0ZSBfRGlydHk6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5Mb3c7XHJcbiAgICAgICAgdGhpcy5fSXNNdXRleCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7lVSei/m+ihjOmAgumFjVxyXG4gICAgICogQHBhcmFtIFVJIOmAgumFjVVJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGaXhVSShVSTpMYXlhLlZpZXcpXHJcbiAgICB7XHJcbiAgICAgICAgVUlGdW5jLkZpeFVJKFVJKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKFVJKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXREaXJ0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIENsZWFyRGlydHkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBVSVVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9EaXJ0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xlYXJEaXJ0eSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWJzdHJhY3QgVXBkYXRlKCk6dm9pZDtcclxufSIsIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgRlcgZnJvbSBcIi4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuaW1wb3J0IFJvbGVFbGVtZW50IGZyb20gXCIuLy4uL3NjcmlwdC9Sb2xlRWxlbWVudFwiXHJcblxyXG5jbGFzcyBFeHRlbmRDaGFyYWN0ZXJzVUkgZXh0ZW5kcyB1aS5DaGFyYWN0ZXJVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkNoYXJhY3RlclwiKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBcclxuICAgIHByaXZhdGUgX1JlbmRlckhhbmRsZXIoY2VsbDpMYXlhLkJveCxpbmRleDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcm9sZUVsZW1lbnQ6Um9sZUVsZW1lbnQgPSBjZWxsIGFzIFJvbGVFbGVtZW50O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LklkeCA9IGluZGV4O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlc2V0KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9VSTpFeHRlbmRDaGFyYWN0ZXJzVUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRDaGFyYWN0ZXJzVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB0aGlzLlNldExpc3QoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiQ2hhcmFjdGVyVUlcIjtcclxuICAgIH1cclxuICAgIFNldExpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsaXN0QXJyYXk6QXJyYXk8YW55PiA9IFtcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiXTtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QucmVuZGVySGFuZGxlciA9IG5ldyBMYXlhLkhhbmRsZXIodGhpcyx0aGlzLl9SZW5kZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5hcnJheSA9IGxpc3RBcnJheTtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0JhY2tUaW1lID0gMjAwOy8v6K6+572u5qmh55qu562L5Zue5by55pe26Ze044CC5Y2V5L2N5Li65q+r56eS44CCXHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNEaXN0YW5jZSA9IDUwXHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7R2FtZVN0cnVjdCB9ICBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmNsYXNzIEV4dGVuZEVuZEdhbWVVSSBleHRlbmRzIHVpLkVuZEdhbWVVSSB7XHJcbiAgICBQYW5lbDpMYXlhLlBhbmVsO1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJFbmRHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL3RoaXMuUGFuZWwgPSB0aGlzLlBhbmVsO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbC52U2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9NZW51ZUJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLEd1aWRlck1hbmFnZXIuTWdyLEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuX1NldEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dTZXRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRCdG4ub24oTGF5YS5FdmVudC5DTElDSyxDb250cm9sZXIuR2FtZUNvbnRyb2xlcixDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJFbmRHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIFVJOkV4dGVuZEVuZEdhbWVVSTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuVUk9IG5ldyBFeHRlbmRFbmRHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuVUkpO1xyXG4gICAgICAgIC8vdGhpcy5VSS5fQ2hhcmFjdGVyTGlzdC5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgdGhpcy5fVUlNYW5hZ2VyLlNob3c8UGxheWVyTGlzdFVJPihQbGF5ZXJMaXN0VUkpfSk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBGTSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFBsYXllckxpc3RVSSBmcm9tIFwiLi8uLi91aS9QbGF5ZXJMaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5jbGFzcyBFeHRlbmRFbnRlckdhbWVVSSBleHRlbmRzIHVpLkVudGVyVUkge1xyXG4gICAgUGFuZWw6TGF5YS5QYW5lbDtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuUGFuZWwgPSB0aGlzLl9QYW5lbDtcclxuICAgICAgICB0aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXIub24oTGF5YS5FdmVudC5DTElDSyxHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dDaGFyYWN0ZXJQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU2V0UGFuZWwub24oTGF5YS5FdmVudC5DTElDSyxHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dTZXRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnQub24oTGF5YS5FdmVudC5DTElDSyxHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9ICAgICAgICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50ZXJHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJFbnRlckdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOkV4dGVuZEVudGVyR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUk9IG5ldyBFeHRlbmRFbnRlckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHZhciB1aU1ncjpVSU1hbmFnZXIgPSB0aGlzLl9VSU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0NoYXJhY3Rlckxpc3Qub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57IHVpTWdyLlNob3c8UGxheWVyTGlzdFVJPihQbGF5ZXJMaXN0VUkpfSk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOWcuuaZr1VJXHJcbiAqL1xyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBJdGVtTGlzdFVJIGZyb20gXCIuL0l0ZW1MaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmNsYXNzIEV4dGVuZHNHYW1lVUkgZXh0ZW5kcyB1aS5HYW1lVUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBTZXRDb3VudFRpbWUoaW5mbzpzdHJpbmcgPVwiXCIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lLnRleHQgPWluZm87XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHJpdmF0ZSBfVUk6RXh0ZW5kc0dhbWVVSTtcclxuICAgIC8vXHJcbiAgICBEaXN0YW5jZVN0cjpBcnJheTxzdHJpbmc+O1xyXG4gICAgR29sZE51bVN0cjpBcnJheTxzdHJpbmc+O1xyXG4gICAgcHJpdmF0ZSBfR29sZDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Db3VudDpudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9Jc011dGV4ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fR29sZCA9IDA7XHJcbiAgICAgICAgdmFyIG9wSXNSaWdodCA9IEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRJbmZvLk9QSXNSaWdodDtcclxuICAgICAgICB0aGlzLl9VSS5fSXRlbUxpc3RCdG4ub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57IHRoaXMuX1VJTWFuYWdlci5TaG93PEl0ZW1MaXN0VUk+KEl0ZW1MaXN0VUkpfSlcclxuICAgICAgICB0aGlzLlNldENvdW50VGltZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHI9IHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gXCIwXCJcclxuICAgICAgICB0aGlzLl9TaG93RGlzdGFuY2UoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHIgPSB0aGlzLl9VSS5fVHh0R29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSBcIjBcIjtcclxuICAgICAgICB0aGlzLl9TaG93R29sZE51bSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2hvd0lucHV0SW5mbyhcIlwiKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5VcGRhdGUpO1xyXG4gICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TaG93RGlzdGFuY2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0ID0gdGhpcy5EaXN0YW5jZVN0clswXSt0aGlzLkRpc3RhbmNlU3RyWzFdO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfU2hvd0dvbGROdW0oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHRHb2xkLnRleHQgPSB0aGlzLkdvbGROdW1TdHJbMF0gKyB0aGlzLkdvbGROdW1TdHJbMV07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBBZGRHb2xkKGdvbGROdW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0dvbGQrPSBnb2xkTnVtO1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IHRoaXMuX0dvbGQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLlNldERpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBTZXRMZWZ0VG91Y2gob3duZXI6YW55LExpc3RlbmVyOigpPT52b2lkKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JpZ2h0X0xlZnRUb3VjaC5vbihMYXlhLkV2ZW50LkNMSUNLLG93bmVyLExpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRSaWdodFRvdWNoKG93bmVyOmFueSxMaXN0ZW5lcjooKT0+dm9pZCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9SaWdodF9SaWdodFRvdWNoLm9uKExheWEuRXZlbnQuQ0xJQ0ssb3duZXIsTGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldENvdW50VGltZShpbmZvOnN0cmluZyA9XCJcIilcclxuICAgIHtcclxuICAgICAgICBpZihpbmZvPT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fQ291bnREb3duVUkudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVQYW5lbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5TZXRDb3VudFRpbWUoaW5mbyk7XHJcbiAgICB9XHJcbiAgICBzZXQgR2FtZVBhbmVsKHZhbHVlOmJvb2xlYW4pXHJcbiAgICB7IFxyXG4gICAgICAgIHRoaXMuX1VJLl9HYW1lUGFuZWwudmlzaWJsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgc2V0IERpc3RhbmNlKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gdmFsdWUudG9GaXhlZCgyKTtcclxuICAgIH1cclxuICAgIHNldCBHb2xkTnVtKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgfVxyXG4gICAgU2hvd0lucHV0SW5mbyhpbmZvOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZUluZm8udGV4dCA9IGluZm87XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIC8v5pi+56S66YeR5biB5L+h5oGvXHJcbiAgICAgICAgdGhpcy5fU2hvd0dvbGROdW0oKTtcclxuICAgICAgICAvL+aYvuekuui3neemu+S/oeaBr1xyXG4gICAgICAgIHRoaXMuX1Nob3dEaXN0YW5jZSgpO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuLy4uL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcblxyXG5jbGFzcyBFeHRlbmRzSXRlbUxpc3RVSSBleHRlbmRzIHVpLkl0ZW1MaXN0VUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSkpO1xyXG4gICAgfVxyXG4gICAgU2V0TGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxpc3RBcnJheTpBcnJheTxhbnk+ID0gW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCJdO1xyXG4gICAgICAgIHRoaXMuX0xpc3QuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX0xpc3QucmVuZGVySGFuZGxlciA9IG5ldyBMYXlhLkhhbmRsZXIodGhpcyx0aGlzLl9SZW5kZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9MaXN0LmFycmF5ID0gbGlzdEFycmF5O1xyXG4gICAgICAgIHRoaXMuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNCYWNrVGltZSA9IDIwMDsvL+iuvue9ruapoeearueti+WbnuW8ueaXtumXtOOAguWNleS9jeS4uuavq+enkuOAglxyXG4gICAgICAgIHRoaXMuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNEaXN0YW5jZSA9IDUwXHJcbiAgICB9XHJcbiAgICBCdG5MaXN0ZW5lcjpNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIHByaXZhdGUgX1JlbmRlckhhbmRsZXIoY2VsbDpMYXlhLkJveCxpbmRleDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgcm9sZUVsZW1lbnQ6SXRlbUVsZW1lbnQgPSBjZWxsIGFzIEl0ZW1FbGVtZW50O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlNldEJ0bih0aGlzLkJ0bkxpc3RlbmVyLkxpc3RlbmVyLHRoaXMuQnRuTGlzdGVuZXIuQWN0aW9uKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtTGlzdFVJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiSXRlbUxpc3RVSVwiO1xyXG4gICAgfVxyXG4gICAgVUk6RXh0ZW5kc0l0ZW1MaXN0VUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLlVJID0gbmV3IEV4dGVuZHNJdGVtTGlzdFVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLlVJKTtcclxuICAgICAgICB0aGlzLlVJLkJ0bkxpc3RlbmVyID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZSh0aGlzLCgpPT57IHRoaXMuX1VJTWFuYWdlci5DbG9zZSh0aGlzKX0pXHJcbiAgICAgICAgdGhpcy5VSS5TZXRMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG59IiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5cclxuY2xhc3MgRXh0ZW5kUGxheWVyTGlzdCBleHRlbmRzIHVpLlBsYXllckxpc3RVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckxpc3RVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIlBsYXllckxpc3RVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIF9VSTpFeHRlbmRQbGF5ZXJMaXN0O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRQbGF5ZXJMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JldHVybk1haW4ub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG59XHJcbiIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmNsYXNzIEV4dGVuZHNTZXRQYW5lbFVJIGV4dGVuZHMgdWkuU2V0UGFuZWxVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e0FQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCl9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNTZXRQYW5lbFVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzU2V0UGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4geyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7IEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKSB9KTtcclxuICAgICAgICB0aGlzLlNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNldFBhbmVsVUlcIjtcclxuICAgIH1cclxuICAgIFNldFBhbmVsKCkge1xyXG4gICAgICAgIHZhciBpbmZvOiBHYW1lU3RydWN0LlNldEluZm8gPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HZXRTZXRJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5fVUkuX0F1ZGlvU3dpdGNoLnNlbGVjdGVkSW5kZXggPSBpbmZvLkF1ZGlvT24gPyAwIDogMTtcclxuICAgICAgICB0aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uT1BJc1JpZ2h0ID8gMSA6IDA7XHJcbiAgICAgICAgdGhpcy5fVUkuX1RleHQudGV4dCA9IGluZm8uVGV4dEluZm87XHJcbiAgICB9XHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICBpbmZvLkF1ZGlvT24gPSB0aGlzLl9VSS5fQXVkaW9Td2l0Y2guc2VsZWN0ZWRJbmRleCA9PSAwO1xyXG4gICAgICAgIGluZm8uT1BJc1JpZ2h0ID0gdGhpcy5fVUkuX09QU3dpdGNoLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TYXZlU2V0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZU9QKCkge1xyXG4gICAgICAgIHRoaXMuU2F2ZVBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge31cclxufVxyXG4iLCJpbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL0Jhc2VVSVwiXHJcbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XHJcblxyXG5tb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1Byb2dyZXNzOkxheWEuUHJvZ3Jlc3NCYXI7XHJcblx0XHRwdWJsaWMgX0d1aWRlcjpMYXlhLkltYWdlO1xyXG5cdFx0cHVibGljIF9FbnRlcjpMYXlhLkJ1dHRvbjtcclxuXHRcdHB1YmxpYyBFcnJvckluZm86TGF5YS5MYWJlbDtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTG9hZGluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEV4dExvYWRpbmdVSSBleHRlbmRzIHVpLkxvYWRpbmdVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBcIkxvYWRpbmdVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOnVpLkxvYWRpbmdVSTtcclxuICAgIF9DYWxsQmFjazooKT0+dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBuYW1lOnN0cmluZyApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgLy90aGlzLl9VSSA9bmV3IHVpLkxvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuX1VJID1uZXcgRXh0TG9hZGluZ1VJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSApO1xyXG4gICAgICAgIHRoaXMuVmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5fQ2FsbEJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB4Om51bWJlciA9IDA7XHJcbiAgICAgICAgeCArPSB0aGlzLl9VSS5fUHJvZ3Jlc3Mud2lkdGgqdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9HdWlkZXIucG9zKHgsdGhpcy5fVUkueSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFZhbHVlKG51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlID0gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQ29tcGxldGUoY2FsbEJhY2s6KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ2FsbEJhY2sgPSBjYWxsQmFjaztcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLmxhYmVsID0gXCJFbnRlclwiOy8vdGhpcy5fTmFtZVswXTtcclxuICAgIH1cclxuICAgIFJlbG9hZChjYWxsQmFjazooKT0+dm9pZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgQkdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0VhcnRoOkxheWEuSW1hZ2U7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJCR1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Hb2xkRGlzOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9MaXN0OkxheWEuTGlzdDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkNoYXJhY3RlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW5kR2FtZVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfR2FtZUluZm86TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1N0YXJ0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTWVudWVCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9TZXRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QbGF5ZXJMaXN0QnRuOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiRW5kR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW50ZXJVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1N0YXJ0OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUGFuZWw6TGF5YS5QYW5lbDtcblx0XHRwdWJsaWMgX1NldFBhbmVsOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyTGlzdDpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVudGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Db3VudERvd25VSTpMYXlhLkJveDtcblx0XHRwdWJsaWMgX0l0ZW1MaXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ291bnRUaW1lOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lSW5mbzpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfR2FtZVBhbmVsOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfVHh0RGlzdGFuY2U6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1R4dEdvbGQ6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1VzZUl0ZW06TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SaWdodF9MZWZ0VG91Y2g6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SaWdodF9SaWdodFRvdWNoOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0xpc3Q6TGF5YS5MaXN0O1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiSXRlbUxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1BsYXllckxpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBfUmV0dXJuTWFpbjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlBsYXllckxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9UZXh0OkxheWEuVGV4dEFyZWE7XG5cdFx0cHVibGljIF9SZXR1cm46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9BdWRpb1N3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG5cdFx0cHVibGljIF9PUFN3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJTZXRQYW5lbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
