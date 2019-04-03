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
    var Queue = /** @class */ (function () {
        function Queue() {
            this._NodePool = new NodePool();
            this._NodeQueue = new NodeQueue();
        }
        Queue.prototype.Push = function (value) {
            var node = this._NodePool.Aquire();
            node.Value = value;
            this._NodeQueue.PushNode(node);
        };
        Queue.prototype.Pop = function () {
            var node = this._NodeQueue.PopNode();
            if (node) {
                return node.Value;
            }
            this._NodePool.PullBack(node);
            return null;
        };
        Object.defineProperty(Queue.prototype, "Count", {
            get: function () {
                return this._NodeQueue.Count;
            },
            enumerable: true,
            configurable: true
        });
        return Queue;
    }());
    BaseFunc.Queue = Queue;
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
var FSM;
(function (FSM_1) {
    var FSM = /** @class */ (function () {
        function FSM(startState) {
            if (startState === void 0) { startState = null; }
            this.m_CurState = startState;
        }
        Object.defineProperty(FSM.prototype, "CurState", {
            get: function () {
                return this.m_CurState;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 改变状态
         * @param state 设置状态
         */
        FSM.prototype.ChangeState = function (state) {
            state.SetOwner(this);
            var curState = this.m_CurState;
            if (curState) {
                curState.End();
            }
            curState = state;
            curState.Start();
            this.m_CurState = curState;
        };
        FSM.prototype.Update = function () {
            var curState = this.m_CurState;
            if (curState) {
                curState.Update();
            }
        };
        return FSM;
    }());
    FSM_1.FSM = FSM;
    var State = /** @class */ (function () {
        function State(owner) {
            if (owner === void 0) { owner = null; }
            this.m_owner = owner;
        }
        State.prototype.SetOwner = function (owner) {
            this.m_owner = owner;
        };
        return State;
    }());
    FSM_1.State = State;
})(FSM = exports.FSM || (exports.FSM = {}));
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
        MessageCenter.prototype.Fire = function (name, param) {
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
var Scene_1 = require("./../Scene/Scene");
var SceneManager = /** @class */ (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        var _this = _super.call(this) || this;
        _this._BGLayer = new Laya.Sprite();
        Laya.stage.addChild(_this._BGLayer);
        _this.m_SceneFSM = new Scene_1.Scene.SceneFSM();
        _this.m_SceneNode = Laya.stage.addChild(new Laya.Sprite());
        return _this;
    }
    Object.defineProperty(SceneManager.prototype, "CurScene", {
        get: function () {
            if (this.m_SceneFSM.CurState)
                return this.m_SceneFSM.CurState;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SceneManager.prototype, "CurDir", {
        get: function () {
            return this.CurScene.Director;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.Name = function () {
        return "SceneManager";
    };
    SceneManager.prototype.ChangeScene = function (newScene) {
        this.m_SceneFSM.ChangeState(newScene);
        if (newScene.SceneObj) {
            this.m_SceneNode.addChild(newScene.SceneObj);
        }
    };
    SceneManager.prototype.Update = function () {
        if (this.CurScene)
            this.CurScene.Update();
    };
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
    return SceneManager;
}(BaseManager_1.default));
exports.default = SceneManager;
/**作者Mo
* 场景功能
*/
/*
//场景管理
export default class SceneManager extends BaseManager {
    private _BG: Laya.Sprite;
    private _BGLayer: Laya.Sprite;
    constructor() {
        super();
        this.CurScene = null;
        this._BGLayer = new Laya.Sprite();
        Laya.stage.addChild(this._BGLayer);
        //添加场景管理
        this.SceneNode = Laya.stage.addChild(new Laya.Sprite());
    }
    set BG(bg: Laya.Sprite) {
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
    }
    get BG():Laya.Sprite
    {
        return  this._BG;
    }
    SceneNode: Laya.Node;

    static Name(): string {
        return "SceneManager";
    }

    private _CurScene: BaseScene;
    get CurScene(): BaseScene {
        return this._CurScene;
    }
    set CurScene(value: BaseScene) {
        if (this._CurScene && this._CurScene.Scene) {
            this._CurScene.Scene.removeSelf();
        }
        this._CurScene = value;
        if (this._CurScene && this._CurScene.Scene) {
            this.SceneNode.addChild(this._CurScene.Scene);
        }
    }
    get CurDir(): BaseDirector {
        return this._CurScene.CurDir;
    }

    EnterScene(targetScene: BaseScene): void {
        if (this.CurScene == null)
            this.CurScene = targetScene;
        else
            this.CurScene.Leave(targetScene);
    }

    Update(): void {
        if (this.CurScene != null)
            this.CurScene.Update();
    }
}

*/ 
},{"./../FrameWork/BaseManager":4,"./../Scene/Scene":26}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseManager_1 = require("./BaseManager");
var BaseEnum_1 = require("./../Base/BaseEnum");
var UIFunc_1 = require("./../Utility/UIFunc");
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Bottom"] = 0] = "Bottom";
    NodeType[NodeType["Middle"] = 1] = "Middle";
})(NodeType || (NodeType = {}));
var UIManager = /** @class */ (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        var _this = _super.call(this) || this;
        var rootBox = new Laya.Box();
        Laya.stage.addChild(rootBox);
        _this.m_RootNode = rootBox;
        _this.onSizeChange();
        Laya.stage.addChild(_this.m_RootNode);
        _this.m_UpdateTime = 0;
        _this.AddNode(NodeType.Bottom);
        _this.AddNode(NodeType.Middle);
        _this._UIDict = {};
        _this._UpdateCount = 0;
        Laya.stage.on(Laya.Event.RESIZE, _this, _this.onSizeChange);
        return _this;
    }
    UIManager.prototype.AddNode = function (node) {
        var nodeBox = new Laya.Box();
        nodeBox.top = 0;
        nodeBox.bottom = 0;
        nodeBox.left = 0;
        nodeBox.right = 0;
        switch (node) {
            case NodeType.Bottom:
                this.m_BottomNode = nodeBox;
                break;
            default:
                this.m_MidleNode = nodeBox;
                break;
        }
        this.m_RootNode.addChild(nodeBox);
    };
    UIManager.Name = function () {
        return "UIManager";
    };
    UIManager.prototype.onSizeChange = function () {
        var scale = UIFunc_1.UIFunc.CountScaleFix(UIManager.g_UIWidth);
        var rootBox = this.m_RootNode;
        rootBox.scaleX = scale;
        rootBox.scaleY = scale;
        rootBox.height = UIManager.g_UIHeight / scale;
        rootBox.size(Laya.stage.width, Laya.stage.height);
    };
    UIManager.prototype.Update = function () {
        //定帧刷新UI
        if (this.m_UpdateTime < Laya.timer.currTimer) {
            this.UpdateUI(this.m_BottomNode);
            this.UpdateUI(this.m_MidleNode);
            this._UpdateCount = 0;
            this.m_UpdateTime = Laya.timer.currTimer + 30;
        }
    };
    UIManager.prototype.UpdateUI = function (node) {
        for (var idx = 0; idx < node.numChildren; ++idx) {
            var ui = node.getChildAt(idx);
            ui.UIUpdate();
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
                node = this.m_MidleNode;
                if (this.m_MidleNode.numChildren <= 0) {
                    //通知导演暂停游戏
                    //APP.SceneManager.CurScene.CurDir.TimeUp();
                }
                break;
            //默认Ui全是低层次UI
            default:
                node = this.m_BottomNode;
                break;
        }
        var childNum = node.numChildren;
        //把互斥的窗口关掉
        if (newUI.IsMutex && childNum > 0) {
            var lastUI = node.getChildAt(node.numChildren - 1);
            if (!lastUI.IsMutex)
                lastUI.Hide();
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
                node = this.m_MidleNode;
                if (node.numChildren <= 0)
                    //关闭窗口 通知游戏继续
                    //APP.SceneManager.CurScene.CurDir.ContinueTime();
                    break;
            //默认Ui全是低层次UI
            default:
                node = this.m_BottomNode;
                break;
        }
        var childNum = node.numChildren;
        if (childNum > 0) {
            var lastUI = node.getChildAt(childNum - 1);
            lastUI.OpenOP();
        }
    };
    UIManager.prototype.CloseCurView = function () {
        var ui = this.m_BottomNode.getChildAt(this.m_BottomNode.numChildren - 1);
        this.Close(ui);
    };
    //删除所有节点上的UI
    UIManager.prototype.Clear = function () {
        var uiNode = this.m_BottomNode;
        while (uiNode.numChildren) {
            var closeUI = uiNode.getChildAt(0); //.removeSelf();
            this.Close(closeUI);
        }
        uiNode = this.m_MidleNode;
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
    UIManager.g_UIWidth = 750;
    UIManager.g_UIHeight = 1334;
    return UIManager;
}(BaseManager_1.default));
exports.default = UIManager;
},{"./../Base/BaseEnum":1,"./../Utility/UIFunc":29,"./BaseManager":4}],9:[function(require,module,exports){
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
},{"./script/ItemElement":32,"./script/RoleElement":33}],10:[function(require,module,exports){
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
            APP_1.default.SceneManager.CurScene.SceneObj.addChild(this);
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
            GameControler_1.default.GameControler.GameDir.GamePlay.AddLogicGold(1);
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
},{"./../Utility/Path":28,"./../controler/APP":30,"./../controler/GameControler":31}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameItem_1 = require("./GameItem");
var PlayerCtrler_1 = require("./../Game/PlayerCtrler");
var Input_1 = require("./Input");
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
            this.Player.Fly();
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
            GameControler_1.default.GameControler.GameDir.GamePlay.AddInputCtrler(new Input_1.Input.DIYInput());
            GameControler_1.default.GameControler.GameDir.GamePlay.SetSafePS(this._FinalLocation);
        };
        FlyBuff.prototype.Update = function () {
            if (this.Player == null) {
                return;
            }
            if (this._FinalZ - this.Player.Position.z > -0.2) {
                var step = GameControler_1.default.GameControler.GameDir.GamePlay.GetStepByLocation(this._FinalLocation);
                this.Player.LayStep(step);
                this.Player.BaseCtrler.StartMove();
                this.Player.PopCtrler();
                GameControler_1.default.GameControler.GameDir.GamePlay.PopInputCtrler();
                _super.prototype.Complete.call(this);
            }
        };
        return FlyBuff;
    }(BasePlayerBuff));
    var ProtectBuff = /** @class */ (function (_super) {
        __extends(ProtectBuff, _super);
        function ProtectBuff(time) {
            if (time === void 0) { time = 0; }
            return _super.call(this, GameItem_1.Item.ItemType.Protect, ProtectBuff.Idx) || this;
            //this.Time = APP.SceneManager.CurDir.GameTime+time;
        }
        Object.defineProperty(ProtectBuff, "Idx", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        ProtectBuff.prototype.Update = function () {
            /*
            if(this.Time<APP.SceneManager.CurDir.GameTime)
            {
                this.Complete();
            }
            */
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
            GameControler_1.default.GameControler.GameDir.GamePlay.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
        };
        VineBuff.prototype.Complete = function () {
            GameControler_1.default.GameControler.GameDir.GamePlay.PopInputCtrler();
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
            GameControler_1.default.GameControler.GameDir.GamePlay.ShowInputInfo(info);
        };
        return VineBuff;
    }(BasePlayerBuff));
})(PlayerBuff = exports.PlayerBuff || (exports.PlayerBuff = {}));
},{"./../Game/PlayerCtrler":19,"./../controler/GameControler":31,"./GameItem":14,"./Input":16}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Character;
(function (Character) {
    var AnimEnum;
    (function (AnimEnum) {
        AnimEnum[AnimEnum["Stand"] = 0] = "Stand";
        AnimEnum[AnimEnum["Fly"] = 1] = "Fly";
        AnimEnum[AnimEnum["Fall"] = 2] = "Fall";
        AnimEnum[AnimEnum["Jump"] = 3] = "Jump";
        AnimEnum[AnimEnum["Jumpdown"] = 4] = "Jumpdown";
    })(AnimEnum = Character.AnimEnum || (Character.AnimEnum = {}));
    var AnimType;
    AnimType = {};
    AnimType[AnimEnum.Stand] = "stand";
    AnimType[AnimEnum.Jump] = "jumpup";
    AnimType[AnimEnum.Jumpdown] = "jumpdown";
    AnimType[AnimEnum.Fly] = "fly";
    AnimType[AnimEnum.Fall] = "fall";
    function PlayerAnimName(nameEnum) {
        return AnimType[nameEnum];
    }
    Character.PlayerAnimName = PlayerAnimName;
    var CharacterAnimator = /** @class */ (function () {
        function CharacterAnimator(PlayerCharacter) {
            this.m_Animator = PlayerCharacter.getComponent(Laya.Animator);
        }
        CharacterAnimator.prototype.SwitchState = function (AnimEnum) {
        };
        return CharacterAnimator;
    }());
    Character.CharacterAnimator = CharacterAnimator;
})(Character = exports.Character || (exports.Character = {}));
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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
        ItemType[ItemType["Vine"] = 4] = "Vine";
        ItemType[ItemType["Protect"] = 11] = "Protect";
        ItemType[ItemType["HolyProtect"] = 12] = "HolyProtect";
        ItemType[ItemType["Fly"] = 13] = "Fly";
        ItemType[ItemType["Rope"] = 14] = "Rope";
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
            this.BarrierList.push(new LayItemMgr(10, 1, ItemType.Empty, 10));
            this.BarrierList.push(new LayItemMgr(10, 5, ItemType.Rock, 10));
            this.BarrierList.push(new LayItemMgr(10, 2, ItemType.Thorn, 10));
            this.BarrierList.push(new LayItemMgr(10, 2, ItemType.Vine, 10));
            this.RewardList.push(new LayItemMgr(10, 1, ItemType.Coin));
            this.RewardList.push(new LayItemMgr(50, 1, ItemType.Fly, 20));
            this.RewardList.push(new LayItemMgr(50, 1, ItemType.Collector));
            this.RewardList.push(new LayItemMgr(50, 1, ItemType.Protect));
            this.RewardList.push(new LayItemMgr(50, 1, ItemType.HolyProtect));
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
            this.m_Animator = null;
        }
        Object.defineProperty(StepItem.prototype, "IsDifficulty", {
            get: function () {
                return this.ItemType > 0 && this.ItemType < 10 && this.ItemType != ItemType.Vine;
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
            if (this.Model) {
                this.Model.transform.position = ps;
                this.m_Animator = this.Model.getComponent(Laya.Animator);
            }
            return this.Model;
        };
        StepItem.prototype._TestGentItemModel = function () {
            var model = null;
            switch (this.ItemType) {
                case ItemType.Rock:
                    model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.3, 0.3, 0.5));
                    break;
                case ItemType.None:
                    break;
                default:
                    model = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(0.3, 0.3, 0.5));
                    break;
            }
            this.Model = model;
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
            else {
                APP_1.default.MessageManager.Fire(MessageCenter_1.MessageMD.GameEvent.PlayerDeath);
                var anim = this.Model.getChildAt(0).getComponent(Laya.Animator);
                anim.play("touch");
            }
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
            _this.Time = GameControler_1.default.GameControler.GameDir.GameTime + time;
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
            if (this.Time < GameControler_1.default.GameControler.GameDir.GameTime) {
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
            GameControler_1.default.GameControler.GameDir.GamePlay.AddGoldUnLogicGold(1);
            this.PutItem();
        };
        Coin.prototype.TouchItem = function (player) {
            GameControler_1.default.GameControler.GameDir.GamePlay.AddGold(1);
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
            var name = Path_1.path.GetLH("item_absord_01");
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
            this.CountFloor = this.GameDir.GamePlay.PlayerFloor - 2;
        };
        CollectBuff.prototype.Update = function () {
            if (this.Time < this.GameDir.GameTime) {
                this.Complete();
            }
            else {
                if (this.GameDir.GamePlay.PlayerFloor - this.CountFloor + 1 < 0) {
                    return;
                }
                this.GameDir.GamePlay.LoopDoFloorStep(this.CountFloor, this, this.CountCoins);
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
            var _this = _super.call(this, ItemType.Fly, ProtectBuff.Idx) || this;
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
            GameControler_1.default.GameControler.GameDir.GamePlay.AddInputCtrler(new Input_1.Input.DIYInput());
            GameControler_1.default.GameControler.GameDir.GamePlay.SetSafePS(this._FinalLocation);
            player.FlyPrepare();
        };
        FlyBuff.prototype.Update = function () {
            if (this.Player == null) {
                return;
            }
            if (this._FinalZ - this.Player.Position.z > -0.2) {
                var step = GameControler_1.default.GameControler.GameDir.GamePlay.GetStepByLocation(this._FinalLocation);
                this.Player.LayStep(step);
                this.Player.BaseCtrler.StartMove();
                this.Player.PopCtrler();
                GameControler_1.default.GameControler.GameDir.GamePlay.PopInputCtrler();
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
                var step = GameControler_1.default.GameControler.GameDir.GamePlay.GetStepByLocation(this._FinalLocation);
                this.End(step);
            }
        };
        RopeBuff.prototype.End = function (step) {
            this.Player.LayStep(step);
            this.Player.BaseCtrler.StartMove();
            this.Player.PopCtrler();
            GameControler_1.default.GameControler.GameDir.GamePlay.PopInputCtrler();
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
            GameControler_1.default.GameControler.GameDir.GamePlay.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
            GameControler_1.default.GameControler.GameDir.GamePlay.SetSafePS(this._FinalLocation);
        };
        RopeBuff.prototype._Input = function (isRight) {
            var closeFloor = GameControler_1.default.GameControler.GameDir.GamePlay.PlayerFloorLine;
            if (closeFloor.FloorNum % 2 != this._FinalLocation.Y % 2) {
                closeFloor = GameControler_1.default.GameControler.GameDir.GamePlay.GetFloorByFloor(closeFloor.FloorNum + 1);
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
            GameControler_1.default.GameControler.GameDir.GamePlay.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
        };
        VineBuff.prototype.Complete = function () {
            GameControler_1.default.GameControler.GameDir.GamePlay.PopInputCtrler();
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
            GameControler_1.default.GameControler.GameDir.GamePlay.ShowInputInfo(info);
        };
        return VineBuff;
    }(Buff_1.PlayerBuff.BasePlayerBuff));
})(Item = exports.Item || (exports.Item = {}));
},{"./../FrameWork/MessageCenter":6,"./../Game/AnimObj":10,"./../Utility/Path":28,"./../controler/APP":30,"./../controler/GameControler":31,"./Buff":11,"./GameStruct":15,"./Input":16,"./PlayerCtrler":19}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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
},{"./../controler/GameControler":31,"./Step":20}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerCtrler_1 = require("./PlayerCtrler");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var APP_1 = require("./../controler/APP");
var Path_1 = require("../Utility/Path");
var GameControler_1 = require("./../controler/GameControler");
var GameItem_1 = require("./GameItem");
var Character_1 = require("./Character");
var num = 0;
//该脚本用于游戏玩家对象管理
//玩家对象
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.m_BuffModel = {};
        var Name = Path_1.path.GetLH("c001_child_01");
        var PlayerModel = Laya.Loader.getRes(Name);
        var secondPlayer = PlayerModel.clone();
        _this.addChild(secondPlayer);
        APP_1.default.SceneManager.CurScene.PutObj(_this);
        //添加自定义模型
        secondPlayer.transform.rotate(new Laya.Vector3(0, 180, 0), false, false);
        _this.m_Animator = secondPlayer.getChildAt(0).getComponent(Laya.Animator);
        _this.on(Laya.Event.REMOVED, _this, function () { _this.destroy(); });
        _this.Reset();
        _this.InitBUffModel(secondPlayer);
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
    Player.prototype.InitBUffModel = function (playerModel) {
        this.SetModel("item_flyer_01", "R_hand", playerModel, GameItem_1.Item.ItemType.Fly);
        this.SetModel("item_shield_01", "head", playerModel, GameItem_1.Item.ItemType.Protect);
        this.SetModel("item_untouchable_01", "head", playerModel, GameItem_1.Item.ItemType.HolyProtect);
    };
    Player.prototype.SetModel = function (resourceName, nodeName, playerModel, itemType) {
        var model = Laya.loader.getRes(Path_1.path.GetLH(resourceName));
        var buffModel = model.clone();
        playerModel.getChildAt(0).addChild(buffModel);
        switch (nodeName) {
            case "head":
                var node = playerModel.getChildByName(nodeName);
                node.addChild(buffModel);
                break;
            default:
                this.m_Animator.linkSprite3DToAvatarNode(nodeName, buffModel);
                break;
        }
        buffModel.active = false;
        this.m_BuffModel[itemType] = buffModel;
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
        var defaultAnimState = this.m_Animator.getDefaultState();
        var stateName = defaultAnimState.name;
        this.m_Animator.play(stateName);
    };
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
        this.m_Animator.play(Character_1.Character.PlayerAnimName(Character_1.Character.AnimEnum.Stand));
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
    Player.prototype.StartMove = function () {
        this.m_Animator.play(Character_1.Character.PlayerAnimName(Character_1.Character.AnimEnum.Jump));
        this.BaseCtrler.StartMove();
    };
    Player.prototype.JumpDown = function () {
        this.m_Animator.play(Character_1.Character.PlayerAnimName(Character_1.Character.AnimEnum.Jumpdown));
    };
    Player.prototype.Fly = function () {
        this.m_Animator.play(Character_1.Character.PlayerAnimName(Character_1.Character.AnimEnum.Fly));
    };
    //触发台阶
    Player.prototype.TouchGround = function () {
        if (this.PlayerDeath || !this.CurStep) {
            return;
        }
        if ((this.CurStep.StepItem.ItemType == GameItem_1.Item.ItemType.None) && (this.CurStep.IsEmpty || (this.CurStep.LeftParent && this.CurStep.RightParent && this.CurStep.LeftParent.StepItem.IsForbiden && this.CurStep.RightParent.StepItem.IsForbiden))) {
            APP_1.default.MessageManager.Fire(MessageCenter_1.MessageMD.GameEvent.PlayerDeath);
            this.m_Animator.play(Character_1.Character.PlayerAnimName(Character_1.Character.AnimEnum.Fall));
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
        var buffModel = this.m_BuffModel[buff.Type];
        if (buffModel) {
            buffModel.active = true;
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
        return;
        if (mod != null) {
            this._BuffNode.addChild(mod);
        }
    };
    /**
     * 结束BUFF
     */
    Player.prototype.CompleteBuff = function (index) {
        var buff = this.BuffArr[index];
        var buffModel = this.m_BuffModel[buff.Type];
        if (buffModel)
            buffModel.active = false;
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
},{"../Utility/Path":28,"./../FrameWork/MessageCenter":6,"./../controler/APP":30,"./../controler/GameControler":31,"./Character":12,"./GameItem":14,"./PlayerCtrler":19}],19:[function(require,module,exports){
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
            this.Time = APP_1.default.SceneManager.CurScene.Director.GameTime + GameControler_1.default.GameControler.PlayerMoveTime;
            this.IsFalling = false;
        };
        PlayerNormCtrler.prototype._Update = function () {
            if (this.Time > 0) {
                if (this.Time <= APP_1.default.SceneManager.CurScene.Director.GameTime) {
                    this.Time = -1;
                    this.player.SetStep(this.player.CurStep);
                    return;
                }
                else {
                    var lastTime = this.Time - Laya.timer.currTimer;
                    if (this.IsFalling = false && lastTime * 2 > this.Time - Laya.timer.currTimer) {
                        this.IsFalling = true;
                        this.player.JumpDown();
                    }
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
},{"./../controler/APP":30,"./../controler/GameControler":31}],20:[function(require,module,exports){
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
        //model = new Laya.MeshSprite3D( Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5)) ;//loader.getRes(name);
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
},{"./../Utility/Path":28,"./../controler/APP":30,"./GameItem":14,"./GameStruct":15}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 作者:Mo
 * 启动场景
 */
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
        sceneMgr.ChangeScene(new LoadScene_1.default());
        Laya.timer.frameLoop(1, this, this.Update);
    };
    Game.prototype.Update = function () {
        this._Frame.Update();
    };
    return Game;
}());
var GM = new Game();
},{"./FrameWork/FrameWork":5,"./FrameWork/MessageCenter":6,"./FrameWork/SceneManager":7,"./FrameWork/UIManager":8,"./GameConfig":9,"./Scene/LoadScene":25,"./controler/APP":30}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene_1 = require("./Scene");
var Path_1 = require("./../Utility/Path");
var GameScenePlay_1 = require("./ScenePlay/GameScenePlay");
var GameDirector = /** @class */ (function (_super) {
    __extends(GameDirector, _super);
    function GameDirector() {
        return _super.call(this) || this;
    }
    Object.defineProperty(GameDirector.prototype, "GamePlay", {
        get: function () {
            return this.CurState;
        },
        enumerable: true,
        configurable: true
    });
    GameDirector.prototype.Start = function () {
        var loadList2D = [Path_1.path.GetDepathUIJS("PlayerList"), Path_1.path.GetDepathUIJS("Game"), Path_1.path.GetDepathUIJS("EndGame")];
        this.ChangeState(new Scene_1.Scene.LoadSceneLogic(loadList2D, null, new GameScenePlay_1.default()));
    };
    GameDirector.prototype.End = function () {
    };
    return GameDirector;
}(Scene_1.Scene.BaseDirector));
exports.default = GameDirector;
},{"./../Utility/Path":28,"./Scene":26,"./ScenePlay/GameScenePlay":27}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene_1 = require("./../Scene/Scene");
var GameItem_1 = require("./../Game/GameItem");
var GameDirector_1 = require("./GameDirector");
var ItemType = GameItem_1.Item.ItemType;
//游戏场景
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    //内部功能
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.m_SceneObj = new Laya.Scene3D;
        return _this;
    }
    GameScene.prototype.GenDirector = function () {
        return new GameDirector_1.default();
    };
    return GameScene;
}(Scene_1.Scene.BaseScene));
exports.default = GameScene;
},{"./../Game/GameItem":14,"./../Scene/Scene":26,"./GameDirector":22}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnterGameUI_1 = require("./../ui/EnterGameUI");
var Path_1 = require("./../Utility/Path");
var Scene_1 = require("./../Scene/Scene");
var APP_1 = require("../controler/APP");
var GuiderManager = /** @class */ (function () {
    //内部功能
    function GuiderManager() {
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
        APP_1.default.SceneManager.ChangeScene(newGameScene);
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
    GuiderScene.prototype.GenDirector = function () {
        var Director = new GuiderDirector();
        return Director;
    };
    return GuiderScene;
}(Scene_1.Scene.BaseScene));
var GuiderDirector = /** @class */ (function (_super) {
    __extends(GuiderDirector, _super);
    function GuiderDirector() {
        return _super.call(this) || this;
    }
    GuiderDirector.prototype.ReStart = function () {
    };
    GuiderDirector.prototype.Start = function () {
        var load2DList = [{ url: Path_1.path.GetDepathUIJS("Enter"), type: Laya.Loader.JSON }, { url: Path_1.path.GetDepathUIJS("ItemList"), type: Laya.Loader.JSON }, { url: Path_1.path.GetAtlPath("comp"), type: Laya.Loader.ATLAS }];
        this.ChangeGamePlay(new Scene_1.Scene.LoadSceneLogic(load2DList, null, new GuiderScenePlay()));
    };
    GuiderDirector.prototype.Update = function () {
    };
    GuiderDirector.prototype.End = function () {
    };
    return GuiderDirector;
}(Scene_1.Scene.BaseDirector));
var GuiderScenePlay = /** @class */ (function (_super) {
    __extends(GuiderScenePlay, _super);
    function GuiderScenePlay() {
        return _super.call(this) || this;
    }
    GuiderScenePlay.prototype.Start = function () {
        this.UI = APP_1.default.UIManager.Show(EnterGameUI_1.default);
    };
    GuiderScenePlay.prototype.End = function () {
    };
    GuiderScenePlay.prototype.Update = function () {
    };
    return GuiderScenePlay;
}(Scene_1.Scene.BaseScenePlaye));
},{"../controler/APP":30,"./../Scene/Scene":26,"./../Utility/Path":28,"./../ui/EnterGameUI":38}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path_1 = require("./../Utility/Path");
var Scene_1 = require("./../Scene/Scene");
var LoadingUI_1 = require("./../ui/UnDownload/LoadingUI");
var GuiderManager_1 = require("./GuiderManager");
var APP_1 = require("./../controler/APP");
var BG_1 = require("./../ui/BG");
var LoadScene = /** @class */ (function (_super) {
    __extends(LoadScene, _super);
    function LoadScene() {
        return _super.call(this) || this;
    }
    LoadScene.prototype.GenDirector = function () {
        return new LoadDirctor();
    };
    return LoadScene;
}(Scene_1.Scene.BaseScene));
exports.default = LoadScene;
var LoadDirctor = /** @class */ (function (_super) {
    __extends(LoadDirctor, _super);
    function LoadDirctor() {
        return _super.call(this) || this;
    }
    LoadDirctor.prototype.Start = function () {
        var loadList2D = [{ url: "ui/Resource/LoadUI.json", type: Laya.Loader.JSON }, { url: "ui/Resource/localcomp.atlas", type: Laya.Loader.ATLAS }];
        this.ChangeGamePlay(new Scene_1.Scene.LoadSceneLogic(loadList2D, null, new LoadScenePlaye()));
    };
    LoadDirctor.prototype.End = function () {
    };
    LoadDirctor.prototype.ReStart = function () {
    };
    return LoadDirctor;
}(Scene_1.Scene.BaseDirector));
//加载场景逻辑
var LoadScenePlaye = /** @class */ (function (_super) {
    __extends(LoadScenePlaye, _super);
    function LoadScenePlaye() {
        var _this = _super.call(this) || this;
        _this.m_Count2DLoad = 0;
        _this.m_Count3DLoad = 0;
        _this.m_LoadFaile = false;
        _this.m_CountValue = 0;
        return _this;
    }
    LoadScenePlaye.prototype.StartLoad = function () {
        this.m_CountValue = 0;
        this.m_LoadFaile = false;
        var resource2DArr = [
            Path_1.path.GetDepathUIJS("Enter"),
            Path_1.path.GetDepathUIJS("SetPanel"),
            Path_1.path.GetDepathUIJS("ItemList"),
            Path_1.path.GetDepathUIJS("Character"),
            Path_1.path.GetDepathUIJS("PlayerList"),
            Path_1.path.GetDepathUIJS("BG"),
            Path_1.path.GetAtlPath("comp")
        ];
        Laya.loader.once(Laya.Event.ERROR, this, this.onError);
        Laya.loader.once(Laya.Event.COMPLETE, this, this.onComplete);
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
            Path_1.path.GetLH("item_absord_01"),
        ];
        this.Load(resource2DArr, resource3DArr);
    };
    LoadScenePlaye.prototype.Load = function (arr2D, arr3D) {
        if (arr2D === void 0) { arr2D = null; }
        if (arr3D === void 0) { arr3D = null; }
        if (arr2D != null) {
            Laya.loader.load(arr2D, null, Laya.Handler.create(this, this.on2DProgress, null, false));
            this.m_Count2DLoad = 0;
            this.m_CountValue -= 0.5;
        }
        if (arr3D != null) {
            Laya.loader.create(arr3D, Laya.Handler.create(this, null), Laya.Handler.create(this, this.on3DProgress, null, false));
            this.m_Count3DLoad = 0;
            this.m_CountValue -= 0.5;
        }
    };
    LoadScenePlaye.prototype.on3DProgress = function (value) {
        if (this.m_LoadFaile) {
            return;
        }
        this.m_Count3DLoad = value / 2;
        this.m_LoadingUI.Value = (this.m_Count2DLoad + this.m_Count3DLoad);
    };
    LoadScenePlaye.prototype.on2DProgress = function (value) {
        if (this.m_LoadFaile) {
            return;
        }
        this.m_Count2DLoad = value / 2;
        this.m_LoadingUI.Value = (this.m_Count2DLoad + this.m_Count3DLoad);
    };
    LoadScenePlaye.prototype.onError = function (str) {
        this.m_LoadFaile = true;
        console.debug("LoadError:" + str);
    };
    LoadScenePlaye.prototype.onComplete = function (data) {
        if (this.m_LoadFaile) {
            var thiDir = this;
            this.m_LoadingUI.Reload(function () { thiDir.Load(); });
        }
        else {
            APP_1.default.SceneManager.BG = new BG_1.default();
            this.m_LoadingUI.Complete(function () { GuiderManager_1.default.Mgr.EnterScene(); });
        }
        return;
    };
    LoadScenePlaye.prototype.Start = function () {
        this.m_LoadingUI = APP_1.default.UIManager.Show(LoadingUI_1.default);
        this.m_Count3DLoad = 0.5;
        this.m_Count2DLoad = 0.5;
        this.m_CountValue = 1;
        this.m_LoadFaile = false;
        this.StartLoad();
    };
    LoadScenePlaye.prototype.End = function () {
        console.log("LoadComplete");
    };
    LoadScenePlaye.prototype.Update = function () {
    };
    return LoadScenePlaye;
}(Scene_1.Scene.BaseScenePlaye));
/*
export default class LoadScene extends BaseScene
{
    CurDir:BaseDirector;

    constructor()
    {
        super();
    }
    protected _GenDir():void
    {
        this.CurDir = new LoadDirctor();
    }
    
    StartLoad():void
    {
        var resCol = [{url:"ui/Resource/LoadUI.json",type:Laya.Loader.JSON},{url:"ui/Resource/localcomp.atlas",type:Laya.Loader.ATLAS}];
        Laya.loader.load(resCol,Laya.Handler.create(this,this._LoadComplete));
    }
    
}
*/
/*
class LoadDirctor extends BaseDirector
{
    UI:LoadingUI;
    
    ReStart():void
    {
    }

    _Count2DLoad:number;
    _Count3DLoad:number;
    _LoadFaile:boolean;
    constructor()
    {
        super();
        this._Count3DLoad = 0.5;
        this._Count2DLoad = 0.5;
    }

    protected _Start()
    {
        Laya.loader.on(Laya.Event.ERROR,this,this._onError);
        Laya.loader.on(Laya.Event.COMPLETE,this,this._onComplete);
        this.Load();
        super._Start();
        this._LoadFaile = false;
    }

    protected _StartComplete()
    {
        super._StartComplete();
        this.UI = APP.UIManager.Show<LoadingUI>(LoadingUI);
        this.UI.Update();
    }
    protected Load()
    {
        this._Count2DLoad =0;
        this._Count3DLoad =0;
        this._CountValue = 0;
        this._LoadFaile = false;
        var resource2DArr = [
            path.GetDepathUIJS("Enter"),
            path.GetDepathUIJS("SetPanel"),
            path.GetDepathUIJS("ItemList"),
            path.GetDepathUIJS("Character"),
            path.GetDepathUIJS("PlayerList"),
            path.GetDepathUIJS("BG"),
            path.GetAtlPath("comp")
            ];
        //resource2DArr = null;
        
        
        Laya.loader.on(Laya.Event.ERROR,this,this._onError);
        Laya.loader.on(Laya.Event.COMPLETE,this,this._onComplete);
        //var resource3DArr = ["C:/Users/Administrator/Desktop/Resource/LayaScene_L01_aut_barrier_02/LayaScene_L01_aut_barrier_02/Conventional/L01_aut_barrier_02.lh"];
        var resource3DArr = [
            path.GetLH("c001_child_01") ,
            path.GetLH("L01_spr_barrier_01"),
            path.GetLH("L01_spr_barrier_02"),
            path.GetLH("L01_spr_barrier_03"),
            path.GetLH("L01_spr_barrier_04"),
            path.GetLH("L01_spr_plat_01"),
            path.GetLH("L01_spr_plat_02"),
            path.GetLH("L01_spr_plat_03"),
            path.GetLH("item_coin_01"),
            path.GetLH("item_flyer_01"),
            path.GetLH("item_shield_01"),
            path.GetLH("item_untouchable_01"),
            path.GetLH("trap_chomper_01"),
            path.GetLH("trap_entangle_01"),
            path.GetLH("trap_sting_01"),
            path.GetLH("item_absord_01"),
        
        
        ]// "C:/Users/Administrator/Desktop/Resource/LayaScene_L01_aut_barrier_02/LayaScene_L01_aut_barrier_02/Conventional/L01_aut_barrier_02.lh"];
        this._Load(resource2DArr,resource3DArr);
    }
    
    protected _Load(arr2D:Array<any> = null,arr3D:Array<any>=null)
    {
        
        if(arr2D!=null)
        {
           // Laya.loader.load(arr2D,Laya.Handler.create(this,this._onLoaded),Laya.Handler.create(this,this._on2DProgress,null,false));
            Laya.loader.load(arr2D,null,Laya.Handler.create(this,this._on2DProgress,null,false));
            
        }else
        {
             this._CountValue+=0.5;
            this._Count2DLoad = 1;
        }
        if(arr3D!=null)
        {
            Laya.loader.create(arr3D,Laya.Handler.create(this,null),Laya.Handler.create(this,this._on3DProgress,null,false));
        }else
        {
             this._CountValue+=0.5;
            this._Count3DLoad = 1;
        }
    }
    protected _onError(str:string)
    {
        this._LoadFaile = true;
        console.debug("LoadError:"+str);
    }

    protected _on3DProgress(value:number)
    {
        if(this._LoadFaile)
        {
            return;
        }
        this._Count3DLoad =value/2;
        this.UI.Value = (this._Count2DLoad + this._Count3DLoad);
    }
    protected _on2DProgress(value:number)
    {
        
        if(this._LoadFaile)
        {
            return;
        }
        this._Count2DLoad =value/2;
        this.UI.Value = this._Count2DLoad + this._Count3DLoad;
    }
    protected _onComplete(data)
    {
        if(this._LoadFaile)
        {
            var thiDir = this;
            this.UI.Reload(function():void{thiDir.Load()} );
        }else
        {
            APP.SceneManager.BG = new BG();
            this.UI.Complete(()=>{GuiderManager.Mgr.EnterScene()});
        }
        return;
    }
    
    protected _Update():void
    {
       this.UI.Update();
    }
}*/ 
},{"./../Scene/Scene":26,"./../Utility/Path":28,"./../controler/APP":30,"./../ui/BG":34,"./../ui/UnDownload/LoadingUI":43,"./GuiderManager":24}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FSM_1 = require("./../Base/FSM");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var APP_1 = require("./../controler/APP");
var FrameWork_1 = require("../FrameWork/FrameWork");
var Scene;
(function (Scene) {
    var SceneFSM = /** @class */ (function (_super) {
        __extends(SceneFSM, _super);
        function SceneFSM() {
            return _super.call(this) || this;
        }
        return SceneFSM;
    }(FSM_1.FSM.FSM));
    Scene.SceneFSM = SceneFSM;
    //场景代理
    var BaseScene = /** @class */ (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            var _this = _super.call(this) || this;
            _this.m_Message = FrameWork_1.default.FM.GetManager(MessageCenter_1.MessageMD.MessageCenter);
            return _this;
        }
        Object.defineProperty(BaseScene.prototype, "SceneObj", {
            get: function () {
                return this.m_SceneObj;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseScene.prototype, "Director", {
            get: function () {
                return this.m_Director;
            },
            enumerable: true,
            configurable: true
        });
        BaseScene.prototype.PutObj = function (sprite3D) {
            if (this.m_SceneObj) {
                this.m_SceneObj.addChild(sprite3D);
            }
            else {
                console.log("BaseScene PutObj Error:empty Sprite3D");
            }
        };
        BaseScene.prototype.Start = function () {
            this.m_Director = this.GenDirector();
            this.m_Director.Start();
        };
        BaseScene.prototype.End = function () {
            if (this.SceneObj) {
                this.SceneObj.removeSelf();
                while (this.SceneObj.numChildren) {
                    var actor = this.SceneObj.getChildAt(0);
                    actor.removeSelf();
                }
            }
            this.Director.End();
            APP_1.default.UIManager.Clear();
        };
        BaseScene.prototype.Update = function () {
            if (this.m_Director)
                this.m_Director.Update();
        };
        return BaseScene;
    }(FSM_1.FSM.State));
    Scene.BaseScene = BaseScene;
    var BaseDirector = /** @class */ (function (_super) {
        __extends(BaseDirector, _super);
        function BaseDirector() {
            var _this = _super.call(this) || this;
            _this._TimeUpCount = 0;
            _this._StartGameTime = 0;
            _this._TimeUpClock = -1;
            _this.m_Message = FrameWork_1.default.FM.GetManager(MessageCenter_1.MessageMD.MessageCenter);
            return _this;
        }
        Object.defineProperty(BaseDirector.prototype, "GameTime", {
            //私有属性和功能
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
        Object.defineProperty(BaseDirector.prototype, "CurGameTime", {
            get: function () {
                return this._StartGameTime + this._TimeUpCount;
            },
            enumerable: true,
            configurable: true
        });
        BaseDirector.prototype.ReStart = function () {
            this.StartTime();
        };
        BaseDirector.prototype.StartTime = function () {
            this._TimeUpCount = 0;
            this._StartGameTime = 0;
            this._TimeUpClock = -1;
            this._StartGameTime = Laya.timer.currTimer;
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
        /**
         * 切换剧本
         * @param newScenePlay 新剧本
         */
        BaseDirector.prototype.ChangeGamePlay = function (newScenePlay) {
            this.ChangeState(newScenePlay);
        };
        return BaseDirector;
    }(FSM_1.FSM.FSM));
    Scene.BaseDirector = BaseDirector;
    var BaseScenePlaye = /** @class */ (function (_super) {
        __extends(BaseScenePlaye, _super);
        function BaseScenePlaye() {
            var _this = _super.call(this) || this;
            _this.m_Message = FrameWork_1.default.FM.GetManager(MessageCenter_1.MessageMD.MessageCenter);
            return _this;
        }
        return BaseScenePlaye;
    }(FSM_1.FSM.State));
    Scene.BaseScenePlaye = BaseScenePlaye;
    var LoadSceneLogic = /** @class */ (function (_super) {
        __extends(LoadSceneLogic, _super);
        /**
         *
         * @param load2DList 2D加载列表
         * @param load3DList 3D加载列表
         * @param nextScene 下一格场景
         */
        function LoadSceneLogic(load2DList, load3DList, nextScene) {
            var _this = _super.call(this) || this;
            _this.m_Load2DList = load2DList;
            _this.m_Load3DList = load3DList;
            _this.m_NextScene = nextScene;
            return _this;
        }
        Object.defineProperty(LoadSceneLogic.prototype, "OwnerDirector", {
            get: function () {
                return this.m_owner;
            },
            enumerable: true,
            configurable: true
        });
        LoadSceneLogic.prototype.Update = function () {
        };
        LoadSceneLogic.prototype.End = function () {
        };
        LoadSceneLogic.prototype.Start = function () {
            Laya.loader.once(Laya.Event.COMPLETE, this, this.LoadComplete);
            if (this.m_Load2DList)
                Laya.loader.load(this.m_Load2DList, null, null);
            if (this.m_Load3DList)
                Laya.loader.load(this.m_Load3DList, null, null);
        };
        LoadSceneLogic.prototype.LoadComplete = function () {
            this.OwnerDirector.ChangeState(this.m_NextScene);
        };
        return LoadSceneLogic;
    }(BaseScenePlaye));
    Scene.LoadSceneLogic = LoadSceneLogic;
})(Scene = exports.Scene || (exports.Scene = {}));
},{"../FrameWork/FrameWork":5,"./../Base/FSM":3,"./../FrameWork/MessageCenter":6,"./../controler/APP":30}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Scene_1 = require("./../../Scene/Scene");
var EndGameUI_1 = require("./../../ui/EndGameUI");
var MessageCenter_1 = require("./../../FrameWork/MessageCenter");
var GameCamera_1 = require("./../../Game/GameCamera");
var Player_1 = require("./../../Game/Player");
var Input_1 = require("./../../Game/Input");
var GameStruct_1 = require("./../../Game/GameStruct");
var GameUI_1 = require("./../../ui/GameUI");
var MountLine_1 = require("./../../Game/MountLine");
var GameItem_1 = require("./../../Game/GameItem");
var APP_1 = require("./../../controler/APP");
var GameControler_1 = require("./../../controler/GameControler");
var ItemType = GameItem_1.Item.ItemType;
//游戏导演
var GameScenePlay = /** @class */ (function (_super) {
    __extends(GameScenePlay, _super);
    function GameScenePlay() {
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
    Object.defineProperty(GameScenePlay.prototype, "SafeLocation", {
        get: function () {
            return this._SafeLocation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameScenePlay.prototype, "PanelUI", {
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
    Object.defineProperty(GameScenePlay.prototype, "HeadFloor", {
        get: function () {
            return this.MountLines[this._HeadFloorIdx];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameScenePlay.prototype, "TailFLoor", {
        get: function () {
            return this.MountLines[this._TailFLoorIdx];
        },
        enumerable: true,
        configurable: true
    });
    GameScenePlay.prototype.AddInputCtrler = function (value) {
        this.InputCtrl.Clear();
        value.NextInput = this.InputCtrl;
        this.InputCtrl = value;
    };
    GameScenePlay.prototype.PopInputCtrler = function () {
        this.InputCtrl = this.InputCtrl.NextInput;
    };
    GameScenePlay.prototype.AddGold = function (num) {
        this._GoldNum += num;
        this.AddLogicGold(num);
    };
    GameScenePlay.prototype.AddGoldUnLogicGold = function (num) {
        this._GoldNum += num;
    };
    GameScenePlay.prototype.AddLogicGold = function (num) {
        this._LogicGoldNum += num;
        this.PanelUI.Gold = this._LogicGoldNum;
    };
    //设置安全位置
    GameScenePlay.prototype.SetSafePS = function (location) {
        this._SafeLocation = location;
        if (location.Y < this.TailFLoor.FloorNum || location.Y > this.HeadFloor.FloorNum) {
            return;
        }
        this.ResetItem(location.Y);
    };
    //从某一层开始一层层重新摆放道具
    GameScenePlay.prototype.ResetItem = function (floor) {
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
    GameScenePlay.prototype.ClearFloor = function (step) {
        var stepItem = step.StepItem;
        step.PutItem(ItemType.None);
        step.IsDeadRoad = false;
    };
    GameScenePlay.prototype.Death = function () {
        var ui = APP_1.default.UIManager.Show(EndGameUI_1.default);
        this.Player.PlayerDeath = true;
        //ui.SetGameInfo(this.PlayerDistance,this._GoldNum);
    };
    GameScenePlay.prototype.End = function () {
    };
    //重新开始
    GameScenePlay.prototype.ReStart = function () {
        this.StartGame();
    };
    GameScenePlay.prototype.ShowInputInfo = function (info) {
        this.PanelUI.ShowInputInfo(info);
    };
    //左右移动
    GameScenePlay.prototype.MoveStep = function (isRight) {
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
        this.Player.StartMove();
    };
    /**
     * 根据层数获取某层
     * @param {number} floor
     */
    GameScenePlay.prototype.GetFloorByFloor = function (floor) {
        var tailFloor = this.TailFLoor;
        if (floor < tailFloor.FloorNum) {
            return null;
        }
        var floorID = (floor - tailFloor.FloorNum + this._TailFLoorIdx) % this.MountLines.length;
        return this.MountLines[floorID];
    };
    GameScenePlay.prototype.LoopDoFloorStep = function (floor, Owner, callBack) {
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
    GameScenePlay.prototype.GetStepByLocation = function (location) {
        var getStep = this.GetFloorByFloor(location.Y).GetStep(location.X);
        return getStep;
    };
    Object.defineProperty(GameScenePlay.prototype, "PlayerFloor", {
        get: function () {
            var floor = this._StartPosition.z - this.Player.LogicPosition.z;
            floor = Math.round(floor / (GameControler_1.default.GameControler.StepDistance / 2));
            return Math.abs(floor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameScenePlay.prototype, "PlayerFloorLine", {
        get: function () {
            return this.GetFloorByFloor(this.PlayerFloor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameScenePlay.prototype, "GameTime", {
        get: function () {
            return this.m_owner.GameTime;
        },
        enumerable: true,
        configurable: true
    });
    //创建相关放这 这里重新开始不会走
    GameScenePlay.prototype.Start = function () {
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
        //创建玩家
        this.Player = new Player_1.default();
        APP_1.default.SceneManager.CurScene.PutObj(this.Player);
        //准备玩家死亡事件
        APP_1.default.MessageManager.Regist(MessageCenter_1.MessageMD.GameEvent.PlayerDeath, this.Death, this);
        this.StartGame();
    };
    //进入游戏的设置放这里 重新开始走这里
    GameScenePlay.prototype.StartGame = function () {
        APP_1.default.SceneManager.CurScene.SceneObj.ambientColor = new Laya.Vector3(1, 1, 1);
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
        this.PanelUI = APP_1.default.UIManager.Show(GameUI_1.default);
        this.PanelUI.Gold = 0;
        this._CountTime = this.GameTime + 6000;
        this._BootomFloor = 0;
        this._GameUpdate = this._StartCount;
    };
    GameScenePlay.prototype.Update = function () {
        if (this._GameUpdate != null) {
            this._GameUpdate();
        }
    };
    //正常运行时的每帧逻辑
    GameScenePlay.prototype._RunGameUpdate = function () {
        var dist = this.PlayerFloor;
        this.PanelUI.Distance = Math.floor(dist);
        if (this.FreshBGCount > 10) {
            this._CurBG.UpdatePage(dist);
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
    GameScenePlay.prototype._StartCount = function () {
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
    GameScenePlay.prototype._PushFLoor = function () {
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
    GameScenePlay.prototype._PutItemInLine = function (floor) {
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
    GameScenePlay.prototype._OrginizePutItem = function (itemList, randomPool, isDeadRoad) {
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
    GameScenePlay.prototype._CountOpenList = function (floorNum) {
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
    GameScenePlay.prototype._MarkSteps = function (step, mark, targetFloorNum) {
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
    GameScenePlay.prototype._CountLastFloorRoad = function (floorNum) {
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
    GameScenePlay.prototype._CountRoadInfo = function (floor) {
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
    GameScenePlay.prototype._ResetStepInfo = function (thisFloor) {
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
    GameScenePlay.prototype._TakeItemList = function (floor) {
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
    GameScenePlay.prototype._DestroyLine = function (floor) {
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
    return GameScenePlay;
}(Scene_1.Scene.BaseScenePlaye));
exports.default = GameScenePlay;
},{"./../../FrameWork/MessageCenter":6,"./../../Game/GameCamera":13,"./../../Game/GameItem":14,"./../../Game/GameStruct":15,"./../../Game/Input":16,"./../../Game/MountLine":17,"./../../Game/Player":18,"./../../Scene/Scene":26,"./../../controler/APP":30,"./../../controler/GameControler":31,"./../../ui/EndGameUI":37,"./../../ui/GameUI":39}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path;
(function (path) {
    path.IsEditor = true;
    path.resVersion = "1";
    path.SceneAssetPath = "LayaScene_";
    path.ResourcePath = path.IsEditor ? "../NetResource_3_29/" : "https://www.gsjgame.com/Resource/NetResource_3_29/";
    path.UIPath = path.ResourcePath + "UI/";
    path.ModelPath = path.ResourcePath + "3D/";
    /**
     * 获取Atl文件路径
     * @param fileName 文件名
     */
    function GetAtlPath(fileName) {
        return path.UIPath + fileName + ".atlas?v=" + this.resVersion;
    }
    path.GetAtlPath = GetAtlPath;
    /**
     * 获取UIJson路径
     * @param fileName 文件名
     */
    function GetDepathUIJS(fileName) {
        return path.UIPath + fileName + ".json?v=" + this.resVersion;
    }
    path.GetDepathUIJS = GetDepathUIJS;
    /**
     * 获取lh文件路径
     * @param fileName 文件名
     */
    function GetLH(fileName) {
        return path.ModelPath + path.SceneAssetPath + fileName + "/Conventional/" + fileName + ".lh?v=" + this.resVersion;
    }
    path.GetLH = GetLH;
})(path = exports.path || (exports.path = {}));
},{}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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
},{"./../FrameWork/FrameWork":5,"./../FrameWork/MessageCenter":6,"./../FrameWork/SceneManager":7,"./../FrameWork/UIManager":8}],31:[function(require,module,exports){
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
            return APP_1.default.SceneManager.CurScene.Director;
        },
        enumerable: true,
        configurable: true
    });
    //进入游戏场景走这个接口
    GameControler.prototype.EnterScene = function () {
        var newGameScene = new GameScene_1.default();
        APP_1.default.SceneManager.ChangeScene(newGameScene);
    };
    //生成BUFF表现效果
    GameControler.prototype.GenBuffEffect = function (type) {
        return new Laya.Sprite3D();
    };
    return GameControler;
}());
},{"./../Game/GameStruct":15,"./../Scene/GameScene":23,"./../ui/CharacterUI":36,"./../ui/SetPanelUI":42,"./APP":30}],32:[function(require,module,exports){
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
},{}],33:[function(require,module,exports){
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
},{"./../controler/APP":30,"./../controler/GameControler":31}],34:[function(require,module,exports){
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
},{"./../Base/BaseFunc":2,"./../Utility/Path":28,"./layaMaxUI":44}],35:[function(require,module,exports){
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
        _this._Showing = true;
        _this.left = 0;
        _this.right = 0;
        _this.bottom = 0;
        _this.top = 0;
        return _this;
    }
    BaseUI.prototype.Hide = function () {
        this.visible = false;
    };
    BaseUI.prototype.Open = function () {
    };
    BaseUI.prototype.Close = function () {
    };
    BaseUI.prototype.OpenOP = function () {
        this.visible = true;
    };
    BaseUI.prototype.CloseOP = function () {
        this.visible = false;
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
        // UIFunc.FixUI(UI);
        this.addChild(UI);
    };
    BaseUI.prototype.SetDirty = function () {
        this._Dirty = true;
    };
    Object.defineProperty(BaseUI.prototype, "Dirty", {
        get: function () {
            return this._Dirty;
        },
        enumerable: true,
        configurable: true
    });
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
}(Laya.Box));
exports.default = BaseUI;
},{"./../Base/BaseEnum":1,"./../FrameWork/FrameWork":5,"./../FrameWork/UIManager":8}],36:[function(require,module,exports){
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
},{"./../Utility/Path":28,"./BaseUI":35,"./layaMaxUI":44}],37:[function(require,module,exports){
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
},{"../Scene/GuiderManager":24,"./../Utility/Path":28,"./../controler/GameControler":31,"./BaseUI":35,"./layaMaxUI":44}],38:[function(require,module,exports){
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
},{"./../Utility/Path":28,"./../controler/GameControler":31,"./../ui/PlayerListUI":41,"./BaseUI":35,"./layaMaxUI":44}],39:[function(require,module,exports){
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
    Object.defineProperty(GameUI.prototype, "Gold", {
        set: function (gold) {
            this.GoldNumStr[1] = gold.toString();
            this.SetDirty();
        },
        enumerable: true,
        configurable: true
    });
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
            var dis = "" + value;
            if (dis == this.DistanceStr[1]) {
                return;
            }
            this.DistanceStr[1] = dis;
            this.SetDirty();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameUI.prototype, "GoldNum", {
        set: function (value) {
            this.GoldNumStr[1] = value.toString();
            this.SetDirty();
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
},{"./../Utility/Path":28,"./../controler/GameControler":31,"./BaseUI":35,"./ItemListUI":40,"./layaMaxUI":44}],40:[function(require,module,exports){
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
},{"./../Base/BaseEnum":1,"./../FrameWork/MessageCenter":6,"./../Utility/Path":28,"./BaseUI":35,"./layaMaxUI":44}],41:[function(require,module,exports){
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
},{"../Scene/GuiderManager":24,"./../Base/BaseEnum":1,"./../Utility/Path":28,"./BaseUI":35,"./layaMaxUI":44}],42:[function(require,module,exports){
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
},{"../Scene/GuiderManager":24,"./../Base/BaseEnum":1,"./../Game/GameStruct":15,"./../Utility/Path":28,"./../controler/GameControler":31,"./BaseUI":35,"./layaMaxUI":44}],43:[function(require,module,exports){
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
            this.Update();
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
},{"./../BaseUI":35}],44:[function(require,module,exports){
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
    var GameRankUI = /** @class */ (function (_super) {
        __extends(GameRankUI, _super);
        function GameRankUI() {
            return _super.call(this) || this;
        }
        GameRankUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("GameRank");
        };
        return GameRankUI;
    }(Laya.Scene));
    ui.GameRankUI = GameRankUI;
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
},{}]},{},[21])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0Jhc2UvQmFzZUVudW0udHMiLCJzcmMvQmFzZS9CYXNlRnVuYy50cyIsInNyYy9CYXNlL0ZTTS50cyIsInNyYy9GcmFtZVdvcmsvQmFzZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL0ZyYW1lV29yay50cyIsInNyYy9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlci50cyIsInNyYy9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9VSU1hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lL0FuaW1PYmoudHMiLCJzcmMvR2FtZS9CdWZmLnRzIiwic3JjL0dhbWUvQ2hhcmFjdGVyLnRzIiwic3JjL0dhbWUvR2FtZUNhbWVyYS50cyIsInNyYy9HYW1lL0dhbWVJdGVtLnRzIiwic3JjL0dhbWUvR2FtZVN0cnVjdC50cyIsInNyYy9HYW1lL0lucHV0LnRzIiwic3JjL0dhbWUvTW91bnRMaW5lLnRzIiwic3JjL0dhbWUvUGxheWVyLnRzIiwic3JjL0dhbWUvUGxheWVyQ3RybGVyLnRzIiwic3JjL0dhbWUvU3RlcC50cyIsInNyYy9NYWluLnRzIiwic3JjL1NjZW5lL0dhbWVEaXJlY3Rvci50cyIsInNyYy9TY2VuZS9HYW1lU2NlbmUudHMiLCJzcmMvU2NlbmUvR3VpZGVyTWFuYWdlci50cyIsInNyYy9TY2VuZS9Mb2FkU2NlbmUudHMiLCJzcmMvU2NlbmUvU2NlbmUudHMiLCJzcmMvU2NlbmUvU2NlbmVQbGF5L0dhbWVTY2VuZVBsYXkudHMiLCJzcmMvVXRpbGl0eS9QYXRoLnRzIiwic3JjL1V0aWxpdHkvVUlGdW5jLnRzIiwic3JjL2NvbnRyb2xlci9BUFAudHMiLCJzcmMvY29udHJvbGVyL0dhbWVDb250cm9sZXIudHMiLCJzcmMvc2NyaXB0L0l0ZW1FbGVtZW50LnRzIiwic3JjL3NjcmlwdC9Sb2xlRWxlbWVudC50cyIsInNyYy91aS9CRy50cyIsInNyYy91aS9CYXNlVUkudHMiLCJzcmMvdWkvQ2hhcmFjdGVyVUkudHMiLCJzcmMvdWkvRW5kR2FtZVVJLnRzIiwic3JjL3VpL0VudGVyR2FtZVVJLnRzIiwic3JjL3VpL0dhbWVVSS50cyIsInNyYy91aS9JdGVtTGlzdFVJLnRzIiwic3JjL3VpL1BsYXllckxpc3RVSS50cyIsInNyYy91aS9TZXRQYW5lbFVJLnRzIiwic3JjL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNWQSxJQUFjLFFBQVEsQ0FFckI7QUFGRCxXQUFjLFFBQVE7SUFDbEIsSUFBWSxVQUFzQjtJQUFsQyxXQUFZLFVBQVU7UUFBRSx5Q0FBRyxDQUFBO1FBQUMsNkNBQUssQ0FBQTtJQUFBLENBQUMsRUFBdEIsVUFBVSxHQUFWLG1CQUFVLEtBQVYsbUJBQVUsUUFBWTtJQUFBLENBQUM7QUFDdkMsQ0FBQyxFQUZhLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBRXJCOzs7O0FDQUQ7O0dBRUc7QUFDSCxJQUFjLFFBQVEsQ0E2UnJCO0FBN1JELFdBQWMsUUFBUTtJQUNsQixJQUFLLFVBQXNCO0lBQTNCLFdBQUssVUFBVTtRQUFFLHlDQUFHLENBQUE7UUFBQyw2Q0FBSyxDQUFBO0lBQUEsQ0FBQyxFQUF0QixVQUFVLEtBQVYsVUFBVSxRQUFZO0lBQUEsQ0FBQztJQUM1QjtRQUlJO1lBRUksSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDO1FBRUQsc0JBQUksc0JBQUs7aUJBQVQ7Z0JBRUksT0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBQ0QscUJBQU8sR0FBUCxV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QUFRQyxDQVJpQyxJQUFJLENBQUMsSUFBSSxHQVExQztJQVJZLGVBQVksZUFReEIsQ0FBQTtJQUNEO1FBQWdDLDhCQUFTO1FBS3JDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVZBLEFBVUMsQ0FWK0IsSUFBSSxDQUFDLElBQUksR0FVeEM7SUFWWSxhQUFVLGFBVXRCLENBQUE7QUFDTCxDQUFDLEVBL0ZhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQStGZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgbW9kdWxlIEJhc2VFbnVtIHtcclxuICAgIGV4cG9ydCBlbnVtIFVJVHlwZUVudW0ge0xvdyxNaWRsZX07XHJcbn0iLCJpbXBvcnQgQmFzZU1nciBmcm9tIFwiLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCI7XHJcblxyXG4vKipcclxuICog5a6a5LmJ5Z+656GA57uT5p6E5L2TXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEJhc2VGdW5jIHtcclxuICAgIGVudW0gVUlUeXBlRW51bSB7TG93LE1pZGxlfTtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXA8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Db3VudDpudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfTWFwOntba2V5OiBzdHJpbmddOiBUfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9NYXAgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3JFYWNoKGNhbGxiYWNrOihtZ3I6VCxrZXk6c3RyaW5nKT0+dm9pZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgbWFwS2V5IGluIHRoaXMuX01hcClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fTWFwW21hcEtleV0sbWFwS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gb2JqIOaUvuWFpeWvueixoVxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0KCBvYmo6VCwga2V5OnN0cmluZyApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighdGhpcy5fTWFwW2tleV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICsrdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fTWFwW2tleV0gPSBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdldChrZXk6c3RyaW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDnp7vpmaTmn5DkuKrlr7nosaFcclxuICAgICAgICAgKiBAcmV0dXJucyDooqvnp7vpmaTlr7nosaFcclxuICAgICAgICAgKi9cclxuICAgICAgICBSZW1vdmUoa2V5OnN0cmluZyk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIE9iajpUID0gdGhpcy5fTWFwW2tleV07XHJcbiAgICAgICAgICAgIGlmKE9iailcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTWFwW2tleV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOmUrlxyXG4gICAgICAgICAqIEByZXR1cm5zIOaYr+WQpuaLpeaciVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEhhcyhrZXk6c3RyaW5nKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9NYXBba2V5XSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm9kZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX1ZhbHVlOlQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfTmV4dDpOb2RlPFQ+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCApXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgVmFsdWUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBWYWx1ZSh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IE5leHQoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IE5leHQobm9kZTpOb2RlPFQ+KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX05leHQgPSBub2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBOb2RlUG9vbDxUPlxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBfTm9kZUxpc3Q6Tm9kZTxUPjtcclxuICAgICAgICBQdWxsQmFjayhub2RlOk5vZGU8VD4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBub2RlLlZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgbm9kZS5OZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYodGhpcy5fTm9kZUxpc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0Lk5leHQgPSBub2RlO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Ob2RlTGlzdCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQXF1aXJlKCk6Tm9kZTxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IHRoaXMuX05vZGVMaXN0O1xyXG4gICAgICAgICAgICBpZihub2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Ob2RlTGlzdCA9IHRoaXMuX05vZGVMaXN0Lk5leHQ7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm9kZVF1ZXVlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfQ291bnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfSGVhZDpOb2RlPFQ+XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFpbGVcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFBvcE5vZGUoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9Db3VudDwxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBub2RlOk5vZGU8VD4gPSBudWxsO1xyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5fSGVhZDtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZCA9IHRoaXMuX0hlYWQuTmV4dDtcclxuICAgICAgICAgICAgbm9kZS5OZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgLS10aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgLy/liKvmiorlsL7lt7TluKblh7rljrvkuoZcclxuICAgICAgICAgICAgaWYodGhpcy5fQ291bnQgPT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbGUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1c2godmFsdWU6VClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOk5vZGU8VD4gPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICBub2RlLlZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaE5vZGUobm9kZTpOb2RlPFQ+KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbm9kZS5OZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYodGhpcy5fQ291bnQgPT0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9IZWFkID0gbm9kZTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbGUuTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fVGFpbGUgPSBub2RlO1xyXG4gICAgICAgICAgICArK3RoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgQ2xlYXIoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEhlYWROb2RlKCk6Tm9kZTxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSGVhZE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGVhZFZhbHVlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fSGVhZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0hlYWQuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBUYWlsTm9kZSgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5UYWlsTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBUYWlsVmFsdWUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9UYWlsZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1RhaWxlLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBRdWV1ZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX05vZGVQb29sOk5vZGVQb29sPFQ+O1xyXG4gICAgICAgIHByaXZhdGUgX05vZGVRdWV1ZTpOb2RlUXVldWU8VD47XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTm9kZVBvb2wgPSBuZXcgTm9kZVBvb2w8VD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fTm9kZVF1ZXVlID0gbmV3IE5vZGVRdWV1ZTxUPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1c2godmFsdWU6VClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOk5vZGU8VD4gPSB0aGlzLl9Ob2RlUG9vbC5BcXVpcmUoKTtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUXVldWUuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUG9wKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IHRoaXMuX05vZGVRdWV1ZS5Qb3BOb2RlKCk7XHJcbiAgICAgICAgICAgIGlmKG5vZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLlZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVQb29sLlB1bGxCYWNrKG5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDb3VudCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX05vZGVRdWV1ZS5Db3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbi8qXHJcbiAgICBleHBvcnQgY2xhc3MgTGlua05vZGVMaXN0PFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfSGVhZE5vZGU6Tm9kZTxUPjtcclxuICAgICAgICBwcml2YXRlIF9UYWlsTm9kZTpOb2RlPFQ+O1xyXG5cclxuICAgICAgICBwcml2YXRlIF9Db3VudE5vZGU6bnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZE5vZGUuTmV4dCA9IHRoaXMuX0hlYWROb2RlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUgPSB0aGlzLl9IZWFkTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5aS057uT54K55YC8XHJcbiAgICAgICAgIFxyXG4gICAgICAgIGdldCBIZWFkVmFsdWUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuX0hlYWROb2RlLlZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBBZGQodmFsdWU6VClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuZXdOb2RlOk5vZGU8VD4gPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICBuZXdOb2RlLlZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkTm9kZShuZXdOb2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQWRkTm9kZShuZXdOb2RlOk5vZGU8VD4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9UYWlsTm9kZSE9dGhpcy5fSGVhZE5vZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlLk5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9IZWFkTm9kZS5OZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9UYWlsTm9kZSA9IG5ld05vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfSovXHJcblxyXG59IiwiZXhwb3J0IG1vZHVsZSBGU00gXHJcbntcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUZTTVxyXG4gICAge1xyXG4gICAgICAgIFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZTTSA8VCBleHRlbmRzIFN0YXRlPiBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIG1fQ3VyU3RhdGU6VDtcclxuICAgICAgICBwcml2YXRlIG1fU3RhdGVEaWN0OntbbmFtZTpzdHJpbmddOlR9O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvciggc3RhcnRTdGF0ZTpUID0gbnVsbCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyU3RhdGUgPSBzdGFydFN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IEN1clN0YXRlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaUueWPmOeKtuaAgVxyXG4gICAgICAgICAqIEBwYXJhbSBzdGF0ZSDorr7nva7nirbmgIFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgQ2hhbmdlU3RhdGUoc3RhdGU6VClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXRlLlNldE93bmVyKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgY3VyU3RhdGU6VCA9IHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICAgICAgaWYoY3VyU3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1clN0YXRlLkVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1clN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgIGN1clN0YXRlLlN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTdGF0ZSA9IGN1clN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjdXJTdGF0ZSA9IHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICAgICAgaWYoY3VyU3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1clN0YXRlLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX293bmVyOklGU007XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Iob3duZXI6SUZTTSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fb3duZXIgPSBvd25lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTZXRPd25lcihvd25lcjpJRlNNKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX293bmVyID0gb3duZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlKCk7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IEVuZCgpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBTdGFydCgpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZU1nclxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlKCk7XHJcbn0iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtCYXNlRnVuY30gIGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmFtZVdvcmtcclxue1xyXG4gICAgX01nck1hcDpCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+Oy8vQmFzZVN0cnVjdC5NYXA8QmFzZU1hbmFnZXI+O1xyXG4gICAgX1RlbU1nckxpc3Q6QXJyYXk8QmFzZU1hbmFnZXI+O1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX01nck1hcCA9IG5ldyBCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRk06RnJhbWVXb3JrO1xyXG4gICAgc3RhdGljIGdldCBGTSgpOkZyYW1lV29ya1xyXG4gICAge1xyXG4gICAgICAgIGlmKEZyYW1lV29yay5fRk09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGcmFtZVdvcmsuX0ZNID0gbmV3IEZyYW1lV29yaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRnJhbWVXb3JrLl9GTTtcclxuICAgIH1cclxuICAgIC8vY29uc3RydWN0b3JcclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1wTWdyTGlzdCA9IG5ldyBBcnJheTxCYXNlTWFuYWdlcj4odGhpcy5fTWdyTWFwLkNvdW50KTtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAuZm9yRWFjaCggKG1ncjpCYXNlTWFuYWdlciAsIGtleTpzdHJpbmcpOnZvaWQgPT57XHJcbiAgICAgICAgICAgIHRlbXBNZ3JMaXN0LnB1c2gobWdyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRlbXBNZ3JMaXN0LmZvckVhY2goKG1ncixpZHgpPT57bWdyLlVwZGF0ZSgpO30pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRNYW5hZ2VyPFQgZXh0ZW5kcyBCYXNlTWFuYWdlcj4oIHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9ICk6VFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX01nck1hcC5IYXModHlwZS5OYW1lKCkpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX01nck1hcC5HZXQodHlwZS5OYW1lKCkpIGFzIFQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZXdNZ3I6VCA9IG5ldyB0eXBlKCk7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwLlNldChuZXdNZ3IsdHlwZS5OYW1lKCkpO1xyXG4gICAgICAgIHJldHVybiAgbmV3TWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgR2V0TWFuYWdlcjxUIGV4dGVuZHMgQmFzZU1hbmFnZXI+KHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9KTpUe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9NZ3JNYXAuR2V0KHR5cGUuTmFtZSgpKSBhcyBUO1xyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOa2iOaBr+aOp+WItuWZqFxyXG4gKi9cclxuaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmV4cG9ydCBtb2R1bGUgTWVzc2FnZU1EXHJcbntcclxuICAgIGV4cG9ydCBjb25zdCBHYW1lRXZlbnQgPVxyXG4gICAge1xyXG4gICAgICAgIFBsYXllckRlYXRoOlwiUGxheWVyRGVhdGhcIixcclxuICAgICAgICBHYW1lVGltZVVwOlwiR2FtZVRpbWVVcFwiLFxyXG4gICAgICAgIEdhbWVDb250aW51ZTpcIkdhbWVDb250aW51ZVwiXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBNZXNzYWdlQ2VudGVyIGV4dGVuZHMgQmFzZU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICBcIk1lc3NhZ2VDZW50ZXJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX01ncjpNZXNzYWdlQ2VudGVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0V2ZW50RGljdDp7W0tleTpzdHJpbmddOk1FdmVudH07XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBfR2V0RXZlbnQobmFtZTpzdHJpbmcpOk1FdmVudFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50Ok1FdmVudCA9IHRoaXMuX0V2ZW50RGljdFtuYW1lXTtcclxuICAgICAgICAgICAgaWYoZXZlbnQgPT0gdW5kZWZpbmVkfHwgZXZlbnQgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgTUV2ZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0W25hbWVdID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0ID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgc3RhdGljIGdldCBNZ3IoKTpNZXNzYWdlQ2VudGVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihNZXNzYWdlQ2VudGVyLl9NZ3IgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWVzc2FnZUNlbnRlci5fTWdyID0gbmV3IE1lc3NhZ2VDZW50ZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gTWVzc2FnZUNlbnRlci5fTWdyO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo5YaMXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIOWnlOaJmFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqfSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAgKi9cclxuICAgICAgICBSZWdpc3QobmFtZTpzdHJpbmcsYWN0aW9uOigpPT52b2lkLGxpc3RlbmVyOk9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDpNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG5ld0RsZ3Q6RGVsZWdhdGUgPSBuZXcgRGVsZWdhdGUobGlzdGVuZXIsYWN0aW9uKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuQWRkKG5ld0RsZ3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jplIDmn5DkuKrnm5HlkKxcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24g5aeU5omYXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmp9IGxpc3RlbmVyIOebkeWQrOiAhVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERlc1JlZ2lzdChuYW1lOnN0cmluZyxhY3Rpb246KCk9Pnt9LGxpc3RlbmVyOk9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDpNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuUm12KGFjdGlvbixsaXN0ZW5lcilcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo6ZSA5p+Q5Liq5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmdpc3RJREsobmFtZTpzdHJpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgdmFyIGdldEV2ZW50Ok1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICAgZ2V0RXZlbnQuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEZpcmUobmFtZTpzdHJpbmcscGFyYW06YW55ID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDpNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WnlOaJmFxyXG5leHBvcnQgY2xhc3MgRGVsZWdhdGVcclxue1xyXG4gICAgTGlzdGVuZXI6T2JqZWN0O1xyXG4gICAgQWN0aW9uOigpPT52b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiDop6blj5FcclxuICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAqL1xyXG4gICAgIEV4ZWN1dGUoIHBhcmFtOmFueSA9IG51bGwgKVxyXG4gICAgIHtcclxuICAgICAgICAgdGhpcy5BY3Rpb24uY2FsbCh0aGlzLkxpc3RlbmVyLHBhcmFtKTtcclxuICAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihsaXN0ZW5lcjpPYmplY3QsYWN0aW9uOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICB0aGlzLkFjdGlvbiA9IGFjdGlvbjtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8v5LqL5Lu2XHJcbmV4cG9ydCBjbGFzcyBNRXZlbnRcclxue1xyXG4gICAgIERlbGVnYXRlTGlzdDpBcnJheTxEZWxlZ2F0ZT47XHJcbiAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgIHtcclxuICAgICAgICAgdGhpcy5SZXNldCgpO1xyXG4gICAgIH1cclxuICAgICAvKipcclxuICAgICAqIOa3u+WKoOWnlOaJmFxyXG4gICAgICogQHBhcmFtIHtEZWxlZ2F0ZX0gZGxnIOa2iOaBr+WQjeWtl1xyXG4gICAgICovXHJcbiAgICAgQWRkKGRsZzpEZWxlZ2F0ZSlcclxuICAgICB7XHJcbiAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0LnB1c2goZGxnKTtcclxuICAgICB9XHJcbiAgICAgLyoqXHJcbiAgICAgKiDnp7vpmaTlp5TmiZhcclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvbiDmtojmga/lkI3lrZdcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lciDmtojmga/lkI3lrZdcclxuICAgICAqL1xyXG4gICAgIFJtdiggYWN0aW9uOigpPT57fSxsaXN0ZW5lcjpPYmplY3QgPSBudWxsIClcclxuICAgICB7XHJcbiAgICAgICAgIHZhciBkbGd0TGlzdDpBcnJheTxEZWxlZ2F0ZT4gPSB0aGlzLkRlbGVnYXRlTGlzdDtcclxuICAgICAgICAgZm9yKHZhciBhcnJJZHg6bnVtYmVyPWRsZ3RMaXN0Lmxlbmd0aCAtMSA7YXJySWR4Pi0xOy0tYXJySWR4KVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICB2YXIgZGxndCA9IGRsZ3RMaXN0W2FycklkeF07XHJcbiAgICAgICAgICAgICBpZihhY3Rpb24gPT0gZGxndC5BY3Rpb24mJiBsaXN0ZW5lciA9PSBkbGd0Lkxpc3RlbmVyIClcclxuICAgICAgICAgICAgIHsgXHJcbiAgICAgICAgICAgICAgICAgZGxndExpc3Quc3BsaWNlKGFycklkeCwxKTtcclxuICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcbiAgICAgLy/ph43nva5cclxuICAgICBSZXNldCgpXHJcbiAgICAge1xyXG4gICAgICAgICB0aGlzLkRlbGVnYXRlTGlzdCA9IFtdXHJcbiAgICAgfVxyXG4gICAgIC8qKlxyXG4gICAgICog6Kem5Y+RXHJcbiAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgKi9cclxuICAgICBFeGVjdXRlKCBwYXJhbTphbnkgKVxyXG4gICAgIHtcclxuICAgICAgICAgdmFyIGRsZ3RMaXN0OkFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICBmb3IodmFyIGFycklkeDpudW1iZXI9ZGxndExpc3QubGVuZ3RoIC0xIDthcnJJZHg+LTE7LS1hcnJJZHgpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgIGRsZ3QuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgIH1cclxuICAgICB9XHJcbn1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vLi4vU2NlbmUvQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCJcclxuaW1wb3J0IHtGU019IGZyb20gXCIuLy4uL0Jhc2UvRlNNXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBtX1NjZW5lRlNNOiBTY2VuZS5TY2VuZUZTTTtcclxuICAgIHByaXZhdGUgbV9TY2VuZU5vZGU6IExheWEuTm9kZTtcclxuICAgIFxyXG4gICAgZ2V0IEN1clNjZW5lKCk6U2NlbmUuQmFzZVNjZW5lIHtcclxuICAgICAgICBpZih0aGlzLm1fU2NlbmVGU00uQ3VyU3RhdGUpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fU2NlbmVGU00uQ3VyU3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyRGlyKCk6U2NlbmUuQmFzZURpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ3VyU2NlbmUuRGlyZWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTY2VuZU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuX0JHTGF5ZXIpO1xyXG5cclxuICAgICAgICB0aGlzLm1fU2NlbmVGU00gPSBuZXcgU2NlbmUuU2NlbmVGU00oKTtcclxuICAgICAgICB0aGlzLm1fU2NlbmVOb2RlID0gTGF5YS5zdGFnZS5hZGRDaGlsZChuZXcgTGF5YS5TcHJpdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENoYW5nZVNjZW5lKG5ld1NjZW5lOiBTY2VuZS5CYXNlU2NlbmUpICB7XHJcbiAgICAgICAgdGhpcy5tX1NjZW5lRlNNLkNoYW5nZVN0YXRlKG5ld1NjZW5lKTtcclxuICAgICAgICBpZihuZXdTY2VuZS5TY2VuZU9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9TY2VuZU5vZGUuYWRkQ2hpbGQobmV3U2NlbmUuU2NlbmVPYmopO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSlcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZS5VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aXp+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBfQkc6IExheWEuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBfQkdMYXllcjogTGF5YS5TcHJpdGU7XHJcbiAgICBcclxuICAgIHNldCBCRyhiZzogTGF5YS5TcHJpdGUpIHtcclxuICAgICAgICBpZiAoIWJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX0JHKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLnJlbW92ZVNlbGY7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB0aGlzLl9CRy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fQkcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllci5hZGRDaGlsZCh0aGlzLl9CRyk7XHJcbiAgICB9XHJcbiAgICBnZXQgQkcoKTpMYXlhLlNwcml0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fQkc7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKuS9nOiAhU1vXHJcbiog5Zy65pmv5Yqf6IO9XHJcbiovXHJcbi8qXHJcbi8v5Zy65pmv566h55CGXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgX0JHOiBMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX0JHTGF5ZXI6IExheWEuU3ByaXRlO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLl9CR0xheWVyKTtcclxuICAgICAgICAvL+a3u+WKoOWcuuaZr+euoeeQhlxyXG4gICAgICAgIHRoaXMuU2NlbmVOb2RlID0gTGF5YS5zdGFnZS5hZGRDaGlsZChuZXcgTGF5YS5TcHJpdGUoKSk7XHJcbiAgICB9XHJcbiAgICBzZXQgQkcoYmc6IExheWEuU3ByaXRlKSB7XHJcbiAgICAgICAgaWYgKCFiZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9CRykge1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5yZW1vdmVTZWxmO1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgdGhpcy5fQkcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0JHLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIuYWRkQ2hpbGQodGhpcy5fQkcpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEJHKCk6TGF5YS5TcHJpdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX0JHO1xyXG4gICAgfVxyXG4gICAgU2NlbmVOb2RlOiBMYXlhLk5vZGU7XHJcblxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTY2VuZU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9DdXJTY2VuZTogQmFzZVNjZW5lO1xyXG4gICAgZ2V0IEN1clNjZW5lKCk6IEJhc2VTY2VuZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0N1clNjZW5lO1xyXG4gICAgfVxyXG4gICAgc2V0IEN1clNjZW5lKHZhbHVlOiBCYXNlU2NlbmUpIHtcclxuICAgICAgICBpZiAodGhpcy5fQ3VyU2NlbmUgJiYgdGhpcy5fQ3VyU2NlbmUuU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fQ3VyU2NlbmUuU2NlbmUucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9DdXJTY2VuZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9DdXJTY2VuZSAmJiB0aGlzLl9DdXJTY2VuZS5TY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLlNjZW5lTm9kZS5hZGRDaGlsZCh0aGlzLl9DdXJTY2VuZS5TY2VuZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IEN1ckRpcigpOiBCYXNlRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZS5DdXJEaXI7XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJTY2VuZSh0YXJnZXRTY2VuZTogQmFzZVNjZW5lKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZSA9IHRhcmdldFNjZW5lO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZS5MZWF2ZSh0YXJnZXRTY2VuZSk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiovIiwiaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vLi4vdWkvQmFzZVVJXCJcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgVUlGdW5jIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9VSUZ1bmNcIlxyXG5pbXBvcnQgeyBCYXNlRnVuYyB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5lbnVtIE5vZGVUeXBlIHtcclxuICAgIEJvdHRvbSxcclxuICAgIE1pZGRsZSxcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBzdGF0aWMgZ19VSVdpZHRoID0gNzUwO1xyXG4gICAgc3RhdGljIGdfVUlIZWlnaHQgPSAxMzM0O1xyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIHByaXZhdGUgbV9Sb290Tm9kZTogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIG1fQm90dG9tTm9kZTogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIG1fTWlkbGVOb2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgX1VJRGljdDogeyBbbmFtZTogc3RyaW5nXTogQmFzZVVJIH07XHJcbiAgICBwcml2YXRlIF9VcGRhdGVDb3VudDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1VwZGF0ZVRpbWU6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgQWRkTm9kZShub2RlOiBOb2RlVHlwZSk6IHZvaWQgIHtcclxuICAgICAgICB2YXIgbm9kZUJveDogTGF5YS5Cb3ggPSBuZXcgTGF5YS5Cb3goKTtcclxuICAgICAgICBub2RlQm94LnRvcCA9IDA7XHJcbiAgICAgICAgbm9kZUJveC5ib3R0b20gPSAwO1xyXG4gICAgICAgIG5vZGVCb3gubGVmdCA9IDA7XHJcbiAgICAgICAgbm9kZUJveC5yaWdodCA9IDA7XHJcbiAgICAgICAgc3dpdGNoIChub2RlKSAge1xyXG4gICAgICAgICAgICBjYXNlIE5vZGVUeXBlLkJvdHRvbTpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9Cb3R0b21Ob2RlID0gbm9kZUJveDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01pZGxlTm9kZSA9IG5vZGVCb3g7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX1Jvb3ROb2RlLmFkZENoaWxkKG5vZGVCb3gpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcgIHtcclxuICAgICAgICByZXR1cm4gXCJVSU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB2YXIgcm9vdEJveCA9IG5ldyBMYXlhLkJveCgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQocm9vdEJveCk7XHJcbiAgICAgICAgdGhpcy5tX1Jvb3ROb2RlID0gcm9vdEJveDtcclxuICAgICAgICB0aGlzLm9uU2l6ZUNoYW5nZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5tX1Jvb3ROb2RlKTtcclxuICAgICAgICB0aGlzLm1fVXBkYXRlVGltZSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuQWRkTm9kZShOb2RlVHlwZS5Cb3R0b20pO1xyXG4gICAgICAgIHRoaXMuQWRkTm9kZShOb2RlVHlwZS5NaWRkbGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1VJRGljdCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX1VwZGF0ZUNvdW50ID0gMDtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuUkVTSVpFLCB0aGlzLCB0aGlzLm9uU2l6ZUNoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TaXplQ2hhbmdlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBVSUZ1bmMuQ291bnRTY2FsZUZpeChVSU1hbmFnZXIuZ19VSVdpZHRoKTtcclxuICAgICAgICB2YXIgcm9vdEJveCA9IHRoaXMubV9Sb290Tm9kZTtcclxuICAgICAgICByb290Qm94LnNjYWxlWCA9IHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3guc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgcm9vdEJveC5oZWlnaHQgPSBVSU1hbmFnZXIuZ19VSUhlaWdodCAvIHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3guc2l6ZShMYXlhLnN0YWdlLndpZHRoLCBMYXlhLnN0YWdlLmhlaWdodCk7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKSAge1xyXG4gICAgICAgIC8v5a6a5bin5Yi35pawVUlcclxuICAgICAgICBpZiAodGhpcy5tX1VwZGF0ZVRpbWUgPCBMYXlhLnRpbWVyLmN1cnJUaW1lcikgIHtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVVSSh0aGlzLm1fQm90dG9tTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkodGhpcy5tX01pZGxlTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VwZGF0ZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX1VwZGF0ZVRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lciArIDMwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlVUkobm9kZTogTGF5YS5TcHJpdGUpICB7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4OiBudW1iZXIgPSAwOyBpZHggPCBub2RlLm51bUNoaWxkcmVuOyArK2lkeCkgIHtcclxuICAgICAgICAgICAgdmFyIHVpOiBCYXNlVUkgPSBub2RlLmdldENoaWxkQXQoaWR4KSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIHVpLlVJVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgQWRkVUkoKSAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBTaG93PFQgZXh0ZW5kcyBCYXNlVUk+KHVpQ2xhc3M6IHsgbmV3KG5hbWU6IHN0cmluZyk6IFQ7IE5hbWUoKTogc3RyaW5nIH0pOiBUICB7XHJcbiAgICAgICAgdmFyIHN0cjogc3RyaW5nID0gdWlDbGFzcy5OYW1lKCk7XHJcbiAgICAgICAgdmFyIG5ld1VJOiBCYXNlVUkgPSB0aGlzLkdldFVJQnlOYW1lKHN0cik7XHJcbiAgICAgICAgbmV3VUkgPSBuZXdVSSA9PSBudWxsID8gdGhpcy5BZGRVSUJ5TmFtZShzdHIsIG5ldyB1aUNsYXNzKHN0cikpIDogbmV3VUk7XHJcbiAgICAgICAgdmFyIG5vZGU6IExheWEuU3ByaXRlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKG5ld1VJLlVJVHlwZSkgIHtcclxuICAgICAgICAgICAgLy/kuK3lsYLmrKFVSVxyXG4gICAgICAgICAgICBjYXNlIEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX01pZGxlTm9kZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1fTWlkbGVOb2RlLm51bUNoaWxkcmVuIDw9IDApICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pgJrnn6Xlr7zmvJTmmoLlgZzmuLjmiI9cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLlRpbWVVcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8v6buY6K6kVWnlhajmmK/kvY7lsYLmrKFVSVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2hpbGROdW06IG51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgLy/miorkupLmlqXnmoTnqpflj6PlhbPmjolcclxuICAgICAgICBpZiAobmV3VUkuSXNNdXRleCAmJiBjaGlsZE51bSA+IDApICB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VUkgPSBub2RlLmdldENoaWxkQXQobm9kZS5udW1DaGlsZHJlbiAtIDEpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgaWYgKCFsYXN0VUkuSXNNdXRleClcclxuICAgICAgICAgICAgICAgIGxhc3RVSS5IaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlLmFkZENoaWxkKG5ld1VJKTtcclxuICAgICAgICBuZXdVSS5PcGVuT1AoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld1VJIGFzIFQ7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2UodWk6IEJhc2VVSSkgIHtcclxuICAgICAgICB1aS5yZW1vdmVTZWxmKCk7XHJcblxyXG4gICAgICAgIHVpLkNsb3NlT1AoKTtcclxuICAgICAgICB2YXIgbm9kZTogTGF5YS5TcHJpdGUgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAodWkuVUlUeXBlKSAge1xyXG4gICAgICAgICAgICAvL+S4reWxguasoVVJXHJcbiAgICAgICAgICAgIGNhc2UgQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fTWlkbGVOb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubnVtQ2hpbGRyZW4gPD0gMClcclxuICAgICAgICAgICAgICAgICAgICAvL+WFs+mXreeql+WPoyDpgJrnn6XmuLjmiI/nu6fnu61cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLkNvbnRpbnVlVGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGROdW06IG51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgaWYgKGNoaWxkTnVtID4gMCkgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSTogQmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGNoaWxkTnVtIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICBsYXN0VUkuT3Blbk9QKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIENsb3NlQ3VyVmlldygpICB7XHJcbiAgICAgICAgdmFyIHVpOiBCYXNlVUkgPSB0aGlzLm1fQm90dG9tTm9kZS5nZXRDaGlsZEF0KHRoaXMubV9Cb3R0b21Ob2RlLm51bUNoaWxkcmVuIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UodWkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yig6Zmk5omA5pyJ6IqC54K55LiK55qEVUlcclxuICAgIENsZWFyKCkgIHtcclxuICAgICAgICB2YXIgdWlOb2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VVSTogQmFzZVVJID0gdWlOb2RlLmdldENoaWxkQXQoMCkgYXMgQmFzZVVJOy8vLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlOb2RlID0gdGhpcy5tX01pZGxlTm9kZVxyXG4gICAgICAgIHdoaWxlICh1aU5vZGUubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEdldFVJQnlOYW1lKG5hbWU6IHN0cmluZyk6IEJhc2VVSSAge1xyXG4gICAgICAgIHZhciB1aSA9IHRoaXMuX1VJRGljdFtuYW1lXTtcclxuICAgICAgICB1aSA9IHVpID09IHVuZGVmaW5lZCA/IG51bGwgOiB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcbiAgICBBZGRVSUJ5TmFtZShuYW1lOiBzdHJpbmcsIHVpOiBCYXNlVUkpOiBCYXNlVUkgIHtcclxuICAgICAgICB0aGlzLl9VSURpY3RbbmFtZV0gPSB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJCRy5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L1JvbGVFbGVtZW50LnRzXCIsUm9sZUVsZW1lbnQpO1xuICAgICAgICByZWcoXCJzY3JpcHQvSXRlbUVsZW1lbnQudHNcIixJdGVtRWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuIC8qKlxyXG4gKiDooajnjrDnlKjnmoTlr7nosaFcclxuICovXHJcbmV4cG9ydCBtb2R1bGUgQW5pbU9ialxyXG57XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKTtcclxuICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICBmb3IoIGxldCBjb3VudCA9MDtjb3VudCA8IDMwOysrY291bnQgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2VuQW5pbU9iajxBbmltQ29pbj4oQW5pbUNvaW4sbW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZW5BbmltT2JqPFQgZXh0ZW5kcyBCYXNlQW5pbU9iaj4oIGFuaW1DbGFzczp7bmV3IChuYW1lOnN0cmluZyxtb2RlbDpMYXlhLlNwcml0ZTNEKTogVDsgTmFtZSgpOnN0cmluZyB9LG1vZGVsOkxheWEuU3ByaXRlM0QgKTpUXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFuaW1PYmogPSBMYXlhLlBvb2wuZ2V0SXRlbShhbmltQ2xhc3MuTmFtZSgpKTtcclxuICAgICAgICBpZihhbmltT2JqPT1udWxsKVxyXG4gICAgICAgICAgICBhbmltT2JqID0gbmV3IGFuaW1DbGFzcyhhbmltQ2xhc3MuTmFtZSgpLG1vZGVsKTtcclxuICAgICAgICByZXR1cm4gYW5pbU9iajtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYWJzdHJhY3QgY2xhc3MgQmFzZUFuaW1PYmogZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbiAgICB7XHJcbiAgICAgICAgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlNjZW5lT2JqLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fRnJhbWVGdW5jKVxyXG4gICAgICAgIH1cclxuICAgICAgICBNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSBfTmFtZTpzdHJpbmc7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5fTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMub24oTGF5YS5FdmVudC5SRU1PVkVELHRoaXMsdGhpcy5fTGVhdmVTdGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBfRnJhbWVGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fSnVkZ2VDb21wbGV0ZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9GcmFtZUxvZ2ljRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+avj+W4p+aJp+ihjOmAu+i+keWKn+iDvVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICAvL+WIpOaWreS7u+WKoeWujOaIkFxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfSnVkZ2VDb21wbGV0ZSgpOmJvb2xlYW47XHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/nu5PmnZ/lpITnkIZcclxuICAgICAgICBwcm90ZWN0ZWQgX0xlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIodGhpcyx0aGlzLl9GcmFtZUZ1bmMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRm9yY2VMZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTGVhdmVTdGFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIEFuaW1Db2luIGV4dGVuZHMgQmFzZUFuaW1PYmpcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiQW5pbUNvaW5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgU2V0VGFyZ2V0KCB0YXJnZXQ6TGF5YS5TcHJpdGUzRCApICAgIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICBzdXBlci5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9UYXJnZXQ6TGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyxtb2RlbDpMYXlhLk1lc2hTcHJpdGUzRCA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihuYW1lLG1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBtb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+avj+W4p+aJp+ihjOmAu+i+keWKn+iDvVxyXG4gICAgICAgIHByb3RlY3RlZCBfRnJhbWVMb2dpY0Z1bmMoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGFkZFBTID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UG9zaXRpb24scG9zaXRpb24sYWRkUFMpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUoYWRkUFMsMC4xLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLmFkZChhZGRQUyxwb3NpdGlvbixwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/nu5PmnZ/lpITnkIZcclxuICAgICAgICBwcm90ZWN0ZWQgX0xlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5fTGVhdmVTdGFnZSgpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZExvZ2ljR29sZCgxKTtcclxuICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIodGhpcy5uYW1lLHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+WIpOaWreS7u+WKoeWujOaIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfSnVkZ2VDb21wbGV0ZSgpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRQb3NpdGlvbiA9IHRoaXMuX1RhcmdldC50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgZGlzRGlyID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UG9zaXRpb24scG9zaXRpb24sZGlzRGlyKTtcclxuICAgICAgICAgICAgaWYoIExheWEuVmVjdG9yMy5zY2FsYXJMZW5ndGhTcXVhcmVkKGRpc0Rpcik8MC4xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbmltcG9ydCB7IFBsYXllckNvbnRyb2xlciB9IGZyb20gXCIuLy4uL0dhbWUvUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi9JbnB1dFwiO1xyXG5pbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXJCdWZmIHtcclxuICAgIGV4cG9ydCBjbGFzcyBCYXNlUGxheWVyQnVmZiAge1xyXG4gICAgICAgIFR5cGU6IEl0ZW0uSXRlbVR5cGU7XHJcbiAgICAgICAgSWR4OiBudW1iZXI7XHJcbiAgICAgICAgUGxheWVyOiBQbGF5ZXI7XHJcbiAgICAgICAgVXBkYXRlKCkgIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2VuQnVmZk1vZCgpICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZNb2QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZVNwaGVyZSgwLjMsIDgsIDgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgICAgICAvL+WIm+W7uuaooeWei+aYvuekuuWvueixoVxyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5BZGRCdWZmTW9kZSh0aGlzLl9CdWZmTW9kKTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuRmx5KClcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1N0YXJ0RnVuYyAhPSBudWxsKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU3RhcnRGdW5jKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIENvbXBsZXRlKCkgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQ29tcGxldGVCdWZmKHRoaXMuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5fQnVmZk1vZC5kZXN0cm95KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcHJvdGVjdGVkIF9CdWZmTW9kOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGU6IEl0ZW0uSXRlbVR5cGUsIGlkeDogbnVtYmVyID0gMCkgIHtcclxuICAgICAgICAgICAgdGhpcy5UeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5JZHggPSBpZHg7XHJcbiAgICAgICAgICAgIHRoaXMuR2VuQnVmZk1vZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9TdGFydEZ1bmM6ICgpID0+IHZvaWQ7XHJcbiAgICB9XHJcbiAgICBjbGFzcyBGbHlCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIEZsb29yOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6IG51bWJlciAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IHBsYXllci5DdXJTdGVwLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uLlkgKz0gdGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gcGxheWVyLlBvc2l0aW9uLnogLSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UgLyAyICogdGhpcy5GbG9vcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbHlDdHJsID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJGbHkodGhpcy5TcGVlZCk7XHJcbiAgICAgICAgICAgIGZseUN0cmwuU2V0UGxheWVyKHBsYXllcilcclxuICAgICAgICAgICAgcGxheWVyLkFkZEN0cmxlcihmbHlDdHJsKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQoKSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlciA9IDAuMSwgZmxvb3I6IG51bWJlciA9IDEwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtLkl0ZW1UeXBlLlJvcGUsIFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gMDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlBsYXllciA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9GaW5hbFogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56ID4gLTAuMikgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HZXRTdGVwQnlMb2NhdGlvbih0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuUG9wQ3RybGVyKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsYXNzIFByb3RlY3RCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTogbnVtYmVyICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOiBudW1iZXIgPSAwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtLkl0ZW1UeXBlLlByb3RlY3QsIFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIC8vdGhpcy5UaW1lID0gQVBQLlNjZW5lTWFuYWdlci5DdXJEaXIuR2FtZVRpbWUrdGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkgIHtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgaWYodGhpcy5UaW1lPEFQUC5TY2VuZU1hbmFnZXIuQ3VyRGlyLkdhbWVUaW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKi9cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVmluZUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiAge1xyXG4gICAgICAgIENvdW50VGltZTogbnVtYmVyO1xyXG4gICAgICAgIElucHV0RGlyOiBib29sZWFuO1xyXG4gICAgICAgIFN0YXJ0KHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsIHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENvbXBsZXRlKCkgIHtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb3VudFRpbWU6IG51bWJlciA9IDMsIGlucHV0RGlyOiBib29sZWFuID0gdHJ1ZSkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbS5JdGVtVHlwZS5WaW5lLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudFRpbWUgPSBjb3VudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSBpbnB1dERpcjtcclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaXNSaWdodDogYm9vbGVhbikgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuSW5wdXREaXIgPT0gaXNSaWdodCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSAhdGhpcy5JbnB1dERpcjtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5Db3VudFRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuQ291bnRUaW1lIDwgMCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfU2hvd0dhbWVJbmZvKCkgIHtcclxuICAgICAgICAgICAgdmFyIGluZm86IHN0cmluZztcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ291bnRUaW1lIDwgMClcclxuICAgICAgICAgICAgICAgIGluZm8gPSBcIlwiO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gdGhpcy5JbnB1dERpciA9PSB0cnVlID8gXCJSaWdodFwiIDogXCJMZWZ0XCI7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2hvd0lucHV0SW5mbyhpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJleHBvcnQgbW9kdWxlIENoYXJhY3RlclxyXG57XHJcbiAgICBleHBvcnQgZW51bSBBbmltRW51bVxyXG4gICAge1xyXG4gICAgICAgIFN0YW5kLFxyXG4gICAgICAgIEZseSxcclxuICAgICAgICBGYWxsLFxyXG4gICAgICAgIEp1bXAsXHJcbiAgICAgICAgSnVtcGRvd25cclxuICAgIH1cclxuICAgIHZhciBBbmltVHlwZTp7W25hbWU6bnVtYmVyXTpzdHJpbmd9O1xyXG4gICAgQW5pbVR5cGUgPSB7fTtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLlN0YW5kXSA9IFwic3RhbmRcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkp1bXBdID0gXCJqdW1wdXBcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkp1bXBkb3duXSA9IFwianVtcGRvd25cIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkZseV0gPSBcImZseVwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uRmFsbF0gPSBcImZhbGxcIjtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQbGF5ZXJBbmltTmFtZSggbmFtZUVudW06QW5pbUVudW0gKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gQW5pbVR5cGVbbmFtZUVudW1dO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyQW5pbWF0b3JcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIG1fQW5pbWF0b3I6TGF5YS5BbmltYXRvcjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggUGxheWVyQ2hhcmFjdGVyOkxheWEuU3ByaXRlM0QgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gUGxheWVyQ2hhcmFjdGVyLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFN3aXRjaFN0YXRlKCBBbmltRW51bSApXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuLy/muLjmiI/kuK3nm7jmnLpcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNhbWVyYSBleHRlbmRzIExheWEuQ2FtZXJhXHJcbntcclxuICAgIEN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIEJhc2VQUzpMYXlhLlZlY3RvcjM7XHJcbiAgICBEeW5hbWljUFM6TGF5YS5WZWN0b3IzO1xyXG4gICAgUGxheWVyOlBsYXllcjtcclxuXHJcbiAgICBTZXRQbGFlcihwbGF5ZXI6UGxheWVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBSZXNldChEeW5hbWljUFM6TGF5YS5WZWN0b3IzLGJhc2VQUzpMYXlhLlZlY3RvcjMscGxheWVyOlBsYXllciApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5CYXNlUFMgPSBiYXNlUFM7XHJcbiAgICAgICAgdGhpcy5EeW5hbWljUFMgPSBEeW5hbWljUFM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orqHnrpflubborr7nva7kvY3nva5cclxuICAgIENvdW50U2V0UFMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5hZGQodGhpcy5CYXNlUFMsdGhpcy5EeW5hbWljUFMsbmV3UFMpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBzZXQgUG9zaXRpb24ocHM6TGF5YS5WZWN0b3IzKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcHMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpOkxheWEuVmVjdG9yM1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHsgICBcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ3RybGVyID0gbmV3IEdhbWVDYW1lcmFDdHJsZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5EeW5hbWljUFMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuQmFzZVBTID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gbnVsbDtcclxuICAgICAgICAvL3RoaXMudGltZXJMb29wKDEsdGhpcy5DdHJsZXIsdGhpcy5DdHJsZXIuVXBkYXRlKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fVXBkYXRlKTtcclxuICAgICAgICB2YXIgc2t5Qm94OkxheWEuU2t5Qm94ID1uZXcgTGF5YS5Ta3lCb3goKTtcclxuICAgICAgICB0aGlzLmNsZWFyRmxhZyA9IExheWEuQmFzZUNhbWVyYS5DTEVBUkZMQUdfU0tZO1xyXG4gICAgICAgIC8vQ2FtZXJhLnNreVJlbmRlcmVyID0gc2t5Qm94Ll9yZW5kZXI7XHJcbiAgICAgICAgLy90aGlzLnNrID0gc2t5Qm94O1xyXG4gICAgICAgICAvL3BhdGhcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1VwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbmFic3RyYWN0IGNsYXNzIEJhc2VHYW1lQ2FtZXJhQ3RybGVyXHJcbntcclxuICAgIENhbWVyYTpHYW1lQ2FtZXJhO1xyXG4gICAgQ3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyO1xyXG4gICAgYWJzdHJhY3QgVXBkYXRlKCk6dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBjYW1lcmE6R2FtZUNhbWVyYSxjdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXIgPSBudWxsIClcclxuICAgIHtcclxuICAgICAgICBpZihjdHJsZXIgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgY3RybGVyID0gdGhpczsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gY2FtZXJhO1xyXG4gICAgICAgIHRoaXMuQ3RybGVyID0gY3RybGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ2FtZXJhQ3RybGVyIGV4dGVuZHMgQmFzZUdhbWVDYW1lcmFDdHJsZXJcclxue1xyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLkNhbWVyYT09bnVsbHx8IHRoaXMuQ2FtZXJhLlBsYXllciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB2YXIgQ2FtZXJhUFMgPSB0aGlzLkNhbWVyYS5EeW5hbWljUFM7XHJcbiAgICAgICAgdmFyIFBsYXllclBTID0gdGhpcy5DYW1lcmEuUGxheWVyLl9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgICAgIENhbWVyYVBTLnggPSAwO1xyXG4gICAgICAgIHZhciBkaXNOdW0gPSBQbGF5ZXJQUy55IC0gQ2FtZXJhUFMueTtcclxuICAgICAgICB2YXIgZGlzWk51bSA9IFBsYXllclBTLnogLSBDYW1lcmFQUy56O1xyXG4gICAgICAgIGlmKE1hdGguYWJzKGRpc051bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnkgKz0gZGlzTnVtKjAuMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIE1hdGguYWJzKGRpc1pOdW0pPjAuMDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy56ICs9IGRpc1pOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5DYW1lcmEuRHluYW1pY1BTID1DYW1lcmFQUztcclxuICAgICAgICB0aGlzLkNhbWVyYS5Db3VudFNldFBTKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoY2FtZXJhOkdhbWVDYW1lcmEsY3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBzdXBlcihjYW1lcmEsY3RybGVyKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7UGxheWVyQnVmZn0gZnJvbSBcIi4vQnVmZlwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtBbmltT2JqfSBmcm9tIFwiLi8uLi9HYW1lL0FuaW1PYmpcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCB7UGxheWVyQ29udHJvbGVyfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL0lucHV0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG50eXBlIEJhc2VQbGF5ZXJCdWZmID0gUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZjtcclxudHlwZSBBbmltQ29pbiA9IEFuaW1PYmouQW5pbUNvaW5cclxuXHJcbmV4cG9ydCBtb2R1bGUgSXRlbVxyXG57XHJcbiAgICAvL+eJqeWTgeagh+ivhlxyXG4gICAgY29uc3QgSXRlbUlEOnN0cmluZyA9IFwiSXRlbVwiO1xyXG4gICAgY29uc3QgTW9kZWxJRDpzdHJpbmcgPVwiTW9kZWxcIlxyXG4gICAgZXhwb3J0IGVudW0gTW9kZWxUeXBlXHJcbiAgICB7XHJcbiAgICAgICAgQ29pblxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGVudW0gSXRlbVR5cGUge1xyXG4gICAgICAgIE5vbmU9MCxcclxuICAgICAgICBFbXB0eSxcclxuICAgICAgICBSb2NrLFxyXG4gICAgICAgIFRob3JuLFxyXG4gICAgICAgIFZpbmUsXHJcbiAgICAgICAgUHJvdGVjdD0xMSxcclxuICAgICAgICBIb2x5UHJvdGVjdCxcclxuICAgICAgICBGbHksXHJcbiAgICAgICAgUm9wZSxcclxuICAgICAgICBDb2xsZWN0b3IsXHJcbiAgICAgICAgQ29pbj0yMCxcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIExpbmVJdGVtSW5mb1xyXG4gICAge1xyXG4gICAgICAgIFR5cGU6SXRlbVR5cGU7XHJcbiAgICAgICAgTnVtYmVyOm51bWJlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggdHlwZTpJdGVtVHlwZSxudW06bnVtYmVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtYmVyID0gbnVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/nianlk4HluIPlsYBcclxuICAgIGV4cG9ydCBjbGFzcyBJdGVtTGF5b3V0XHJcbiAgICB7XHJcbiAgICAgICAgUmV3YXJkTGlzdDpBcnJheTxMYXlJdGVtTWdyPjtcclxuICAgICAgICBCYXJyaWVyTGlzdDpBcnJheTxMYXlJdGVtTWdyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QgPSBuZXcgQXJyYXk8TGF5SXRlbU1ncj4oKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDEsSXRlbVR5cGUuRW1wdHksMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDUsSXRlbVR5cGUuUm9jaywxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsMixJdGVtVHlwZS5UaG9ybiwxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsMixJdGVtVHlwZS5WaW5lLDEwKSlcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsMSxJdGVtVHlwZS5Db2luKSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLDEsSXRlbVR5cGUuRmx5LDIwKSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLDEsSXRlbVR5cGUuQ29sbGVjdG9yKSlcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsMSxJdGVtVHlwZS5Qcm90ZWN0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLDEsSXRlbVR5cGUuSG9seVByb3RlY3QpKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgUmVzZXRJdGVtRmFjdG9yeSggKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgVGFrZUxpbmVSZXdhcmQoZmxvb3I6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVGFrZUl0ZW0oZmxvb3IsdGhpcy5SZXdhcmRMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgVGFrZUxpbmVEaWZmaWN1bHR5KGZsb29yOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRha2VJdGVtKGZsb29yLHRoaXMuQmFycmllckxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFRha2VJdGVtKGZsb29yOm51bWJlciwgTWdyTGlzdDpBcnJheTxMYXlJdGVtTWdyPik6QXJyYXk8TGluZUl0ZW1JbmZvPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHJldHVybkluZm8gPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgICAgICBmb3IoIHZhciBsaXN0SWR4ID0gMDsgbGlzdElkeCA8IE1nckxpc3QubGVuZ3RoOyArK2xpc3RJZHggKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBNZ3JMaXN0W2xpc3RJZHhdLk9uRmxvb3IoZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm86TGluZUl0ZW1JbmZvID0gTWdyTGlzdFtsaXN0SWR4XS5UYWtlSXRlbXMoZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYoaW5mby5OdW1iZXI+MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5JbmZvLnB1c2goaW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+ivpeWvueixoeeahOWIhuW4g+Wbvuavj+WxguetieamgueOh+WIhuW4g1xyXG4gICAgZXhwb3J0IGNsYXNzIExheUl0ZW1NZ3JcclxuICAgIHtcclxuICAgICAgICAvL+mBk+WFt+exu+Wei1xyXG4gICAgICAgIEl0ZW1UeXBlOkl0ZW1UeXBlO1xyXG4gICAgICAgIC8v5b2T5YmN5bGC5pWwXHJcbiAgICAgICAgQ3VyRmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIC8v5Yy66Ze05YiG5biD5oC75pWw6YePXHJcbiAgICAgICAgSXRlbU51bTpudW1iZXI7XHJcbiAgICAgICAgLy/lvIDlp4vliIbluIPnmoTlsYLmlbBcclxuICAgICAgICBTdGFydEZsb29yOm51bWJlcjtcclxuICAgICAgICAvL+WIhuW4g+WMuumXtFxyXG4gICAgICAgIC8v5bey6I635Y+W5bGC5qCH6K6wXHJcbiAgICAgICAgVG91Y2hlZEZsb29yOm51bWJlcjtcclxuICAgICAgICBJdGVtTGlzdDpBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8vcmFuZ2XljLrpl7TojIPlm7RcclxuICAgICAgICAvL251bSDljLrpl7TojIPlm7TmlbDph49cclxuICAgICAgICAvL2l0ZW1UeXBlIOeUn+S6p+eahOmBk+WFt+exu+Wei1xyXG4gICAgICAgIC8vc3RhcnRGbG9vciDku47lk6rkuIDooYzlvIDlp4vmipXmjrdcclxuICAgICAgICBjb25zdHJ1Y3RvciggcmFuZ2U6bnVtYmVyLG51bTpudW1iZXIsaXRlbVR5cGU6SXRlbVR5cGUsc3RhcnRGbG9vcjpudW1iZXIgPSAxIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKG51bSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbnVtID0gMTtcclxuICAgICAgICAgICAgaWYoc3RhcnRGbG9vciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAvL+esrDDlsYLmmK/njqnlrrbotbfmraXkvY3nva5cclxuICAgICAgICAgICAgICAgIHN0YXJ0Rmxvb3IgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1UeXBlID0gaXRlbVR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VyRmxvb3IgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1OdW0gPSBudW07XHJcbiAgICAgICAgICAgIC8v5YiG5biD5Zu+IOeJqeWTgWlkeDrlsYLmlbBcclxuICAgICAgICAgICAgdGhpcy5JdGVtTGlzdCA9IG5ldyBBcnJheTxudW1iZXI+KHJhbmdlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub3VjaGVkRmxvb3IgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkdlbk1hcChzdGFydEZsb29yKVxyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgUmFuZ2UoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5JdGVtTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bGC5pu05paw5Ye95pWwXHJcbiAgICAgICAgT25GbG9vcihmbG9vcjpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihmbG9vcjx0aGlzLlRvdWNoZWRGbG9vcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HZW5NYXAoZmxvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGZsb29yPj10aGlzLlN0YXJ0Rmxvb3IgKyB0aGlzLlJhbmdlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlJ/miJDliIbluIPlm75cclxuICAgICAgICBHZW5NYXAoc3RhcnRGbG9vcjpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0Rmxvb3IgPSBzdGFydEZsb29yO1xyXG4gICAgICAgICAgICB2YXIgaXRlbU51bSA9IHRoaXMuSXRlbU51bTtcclxuICAgICAgICAgICAgZm9yKGxldCBjb3VudDpudW1iZXIgPSAwOyBjb3VudDwgdGhpcy5JdGVtTGlzdC5sZW5ndGg7Kytjb3VudClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JdGVtTGlzdFtjb3VudF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpdGVtTGlzdCA9IHRoaXMuSXRlbUxpc3Q7XHJcbiAgICAgICAgICAgIGZvcih2YXIgY291bnROdW06bnVtYmVyID0gMDsgY291bnROdW08aXRlbU51bTsrK2NvdW50TnVtKVxyXG4gICAgICAgICAgICB7ICAgXHJcbiAgICAgICAgICAgICAgICB2YXIgSXRlbUZsb29yOm51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0aGlzLlJhbmdlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXRlbUxpc3RbSXRlbUZsb29yXSArPTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBUYWtlSXRlbXMoIGZsb29yOm51bWJlciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpbmVJdGVtSW5mbyh0aGlzLkl0ZW1UeXBlLHRoaXMuSXRlbUxpc3RbZmxvb3IgLSB0aGlzLlN0YXJ0Rmxvb3JdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHZhciBSZXNldDpib29sZWFuO1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJlc2V0SXRlbUZhY3RvcnkoICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKFJlc2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVzZXQgPXRydWU7XHJcbiAgICAgICAgZm9yKHZhciB0aGVLZXkgaW4gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHBhcnNlSW50KHRoZUtleSk7XHJcbiAgICAgICAgICAgIGlmKHR5cGUgPD0gMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29udGludWUgO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciggbGV0IGNvdW50ID0wO2NvdW50IDwgMzA7Kytjb3VudCApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGFzOiBhbnkgPSBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVt0eXBlXTtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtOlN0ZXAgPSBuZXcgY2xhcyhudWxsKTtcclxuICAgICAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKEl0ZW1JRCt0aGVLZXksaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gU3RlcEl0ZW1GYWN0b3J5KCBpdGVtVHlwZTpJdGVtVHlwZSxTdGVwKVxyXG4gICAge1xyXG4gICAgICAgIGlmKFN0ZXAgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGl0ZW1UeXBlID09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGl0ZW1UeXBlID0gSXRlbVR5cGUuTm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGl0ZW1cclxuICAgICAgICB2YXIgb2JqUG9vbCA9IExheWEuUG9vbDtcclxuICAgICAgICBpdGVtID0gb2JqUG9vbC5nZXRJdGVtKEl0ZW1JRCtpdGVtVHlwZSlcclxuICAgICAgICBpZihpdGVtPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdIT1udWxsJiZHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV0hPXVuZGVmaW5lZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXM6IGFueSA9IEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXTtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBuZXcgY2xhcyhTdGVwKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBTdGVwSXRlbShpdGVtVHlwZSxTdGVwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uU3RlcCA9IFN0ZXA7XHJcbiAgICAgICAgaXRlbS5SZXNldEl0ZW0oKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgU3RlcDpTdGVwO1xyXG4gICAgICAgIEl0ZW1UeXBlOkl0ZW1UeXBlO1xyXG4gICAgICAgIE1vZGVsOkxheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0FuaW1hdG9yOkxheWEuQW5pbWF0b3I7XHJcbiAgICAgICAgZ2V0IElzRGlmZmljdWx0eSgpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkl0ZW1UeXBlPjAmJnRoaXMuSXRlbVR5cGU8MTAmJnRoaXMuSXRlbVR5cGUhPSBJdGVtVHlwZS5WaW5lO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v5Yik5pat6IO95LiN6IO96LWw5LiK5Y67XHJcbiAgICAgICAgZ2V0IElzRm9yYmlkZW4oKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtVHlwZSA9PSBJdGVtVHlwZS5Sb2NrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mHjee9rlxyXG4gICAgICAgIFJlc2V0SXRlbSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3RoaXMuX0luaXRJdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5TZXRFbmFibGUoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5Nb2RlbCE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RlcC5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFNldEVuYWJsZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLk1vZGVsPT1udWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbC5hY3RpdmUgPXRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFB1dEl0ZW0gPSBmdW5jdGlvbiggaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVzUGF3bigpO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXAuU3RlcEl0ZW0gPSBTdGVwSXRlbUZhY3RvcnkoaXRlbVR5cGUsdGhpcy5TdGVwKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+a2iOmZpCDmioroh6rlt7HlrZjlhaXlhoXlrZjmsaBcclxuICAgICAgICBEZXNQYXduKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuTW9kZWwhPW51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vZGVsLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7Ly9HTS5PYmpQb29sO1xyXG4gICAgICAgICAgICBvYmpQb29sLnJlY292ZXIoSXRlbUlEK3RoaXMuSXRlbVR5cGUsdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSBwbGF5ZXIgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLkl0ZW1UeXBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnqoHnoLTkv53miqRcclxuICAgICAgICAgKiBAcmV0dXJucyDmmK/lkKbooqvnqoHnoLRcclxuICAgICAgICAgKi9cclxuICAgICAgICBCcmVha1Byb3RlY3QocGxheWVyOlBsYXllcik6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGN1ckJ1ZmYgPSBwbGF5ZXIuR2V0QnVmZihQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICBpZihjdXJCdWZmKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goY3VyQnVmZi5UeXBlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUHJvdGVjdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQnVmZi5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuSG9seVByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoIGl0ZW1UeXBlOkl0ZW1UeXBlLFN0ZXA6U3RlcCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihpdGVtVHlwZSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1UeXBlID0gSXRlbVR5cGUuTm9uZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlN0ZXAgPSBTdGVwO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1UeXBlID0gaXRlbVR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWw9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0luaXRJdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBfQWRkQnVmZlRvUGxheWVyKHBsYXllcjpQbGF5ZXIsYnVmZjpCYXNlUGxheWVyQnVmZilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5BZGRCdWZmKGJ1ZmYpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9Jbml0SXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCB0aGlzLk1vZGVsIT1udWxsJiYhdGhpcy5Nb2RlbC5kZXN0cm95ZWQgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBzID0gbmV3IExheWEuVmVjdG9yMygwLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9HZW5JdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5Nb2RlbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Nb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24gPSBwcztcclxuICAgICAgICAgICAgICAgIHRoaXMubV9BbmltYXRvciA9IHRoaXMuTW9kZWwuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgX1Rlc3RHZW50SXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuSXRlbVR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9jazpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLk5vbmU6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpOyAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IG51bGw7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5JdGVtVHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Sb2NrOlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsYXNzIFJvY2sgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgTW9kZWxOdW0gPSAzO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvY2ssU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLk1lc2hTcHJpdGUzRCA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSAxK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpSb2NrLk1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIE5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wXCIraWR4KVxyXG4gICAgICAgICAgICBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhOYW1lKVxyXG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUm9ja10gPSBSb2NrO1xyXG4gICAgXHJcbiAgICBjbGFzcyBUaG9ybiBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoU3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVGhvcm4sU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcInRyYXBfc3RpbmdfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyICk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5CcmVha1Byb3RlY3QocGxheWVyKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFuaW06TGF5YS5BbmltYXRvciA9IHRoaXMuTW9kZWwuZ2V0Q2hpbGRBdCgwKS5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoXCJ0b3VjaFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlRob3JuXSA9IFRob3JuO1xyXG4gICAgXHJcbiAgICBjbGFzcyBQcm90ZWN0IGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Qcm90ZWN0LHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX3NoaWVsZF8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKFByb3RlY3RCdWZmLklkeCkhPW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXIsbmV3IFByb3RlY3RCdWZmKDMwMDApKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Qcm90ZWN0XSA9IFByb3RlY3Q7XHJcbiAgICBcclxuICAgIGNsYXNzIFByb3RlY3RCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHRpbWUg5oyB57ut5pe26Ze0XHJcbiAgICAgICAgICogQHBhcmFtIElzSG9seSDmmK/lkKbnu53lr7nml6DmlYxcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOm51bWJlciA9IDAsIElzSG9seTpib29sZWFuID0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJc0hvbHkgPyBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpJdGVtVHlwZS5Qcm90ZWN0LFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVRpbWUrdGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVGltZTxDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVUaW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGFzcyBIb2x5UHJvdGVjdCBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuSG9seVByb3RlY3Qsc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fdW50b3VjaGFibGVfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZihQcm90ZWN0QnVmZi5JZHgpIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLl9BZGRCdWZmVG9QbGF5ZXIocGxheWVyLG5ldyBQcm90ZWN0QnVmZigzMDAwLHRydWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Ib2x5UHJvdGVjdF0gPSBIb2x5UHJvdGVjdDtcclxuXHJcbiAgICBjbGFzcyBDb2luIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICAvL1RvRG9cclxuICAgICAgICBwcml2YXRlIG1fdG91Y2hlZDpCb29sZWFuXHJcbiAgICAgICAgRmx5VG9QbGF5ZXIocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjb25pbjpBbmltQ29pbiA9IEFuaW1PYmouR2VuQW5pbU9iajxBbmltQ29pbj4oQW5pbU9iai5BbmltQ29pbix0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgY29uaW4uU2V0VGFyZ2V0KHBsYXllcik7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkR29sZFVuTG9naWNHb2xkKDEpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkR29sZCgxKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2luLHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkNvaW5dID0gQ29pbjtcclxuICAgIFxyXG4gICAgY2xhc3MgQ29sbGVjdGVyIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGxheWVyLkdldEJ1ZmYoQ29sbGVjdEJ1ZmYuSWR4KSE9bnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYobmV3IENvbGxlY3RCdWZmKDEwMDAwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2xsZWN0b3Isc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSsgTWF0aC5yYW5kb20oKSoyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fYWJzb3JkXzAxXCIpO1xyXG4gICAgICAgICAgICB2YXIgdGhlTW9kZWwgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gdGhlTW9kZWwuY2xvbmUoKTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkNvbGxlY3Rvcl0gPSBDb2xsZWN0ZXI7XHJcbiAgICBcclxuICAgIGNsYXNzIENvbGxlY3RCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIEdhbWVEaXI6R2FtZURpcmVjdG9yO1xyXG4gICAgICAgIENvdW50Rmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTpudW1iZXIgPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUHJvdGVjdCxDb2xsZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVEaXIgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyO1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSB0aGlzLkdhbWVEaXIuR2FtZVRpbWUrdGltZTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudEZsb29yID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRGbG9vciA9IHRoaXMuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vciAtIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU8dGhpcy5HYW1lRGlyLkdhbWVUaW1lKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vciAtIHRoaXMuQ291bnRGbG9vcisxPDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5HYW1lRGlyLkdhbWVQbGF5Lkxvb3BEb0Zsb29yU3RlcCh0aGlzLkNvdW50Rmxvb3IsdGhpcyx0aGlzLkNvdW50Q29pbnMpO1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLkNvdW50Rmxvb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBDb3VudENvaW5zKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHN0ZXAuU3RlcEl0ZW0uSXRlbVR5cGUgPT0gSXRlbVR5cGUuQ29pbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIENvaW46Q29pbiA9IHN0ZXAuU3RlcEl0ZW0gYXMgQ29pbjtcclxuICAgICAgICAgICAgICAgIENvaW4uRmx5VG9QbGF5ZXIodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGFzcyBGTHkgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZigwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYobmV3IEZseUJ1ZmYoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkZseSxzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxKyBNYXRoLnJhbmRvbSgpKjIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTsgXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuRmx5XSA9IEZMeTtcclxuICAgIFxyXG4gICAgY2xhc3MgRmx5QnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBTcGVlZDpudW1iZXI7XHJcbiAgICAgICAgRmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgdmFyIHRpbWU6bnVtYmVyID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5DdXJTdGVwID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPXRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlLzIqdGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmbHlDdHJsID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJGbHkodGhpcy5TcGVlZCk7XHJcbiAgICAgICAgICAgIGZseUN0cmwuU2V0UGxheWVyKHBsYXllcilcclxuICAgICAgICAgICAgcGxheWVyLkFkZEN0cmxlcihmbHlDdHJsKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQoKSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICBwbGF5ZXIuRmx5UHJlcGFyZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjpudW1iZXI7ICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6bnVtYmVyPTAuMTUsZmxvb3I6bnVtYmVyPTEwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuRmx5LFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gMDsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0ZpbmFsWiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLno+LTAuMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuR2V0U3RlcEJ5TG9jYXRpb24odGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGFzcyBSb3BlIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGxheWVyLkdldEJ1ZmYoMCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKG5ldyBSb3BlQnVmZigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9wZSxzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLk1lc2hTcHJpdGUzRCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMSwwLjUsMC4xKSlcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb3BlXSA9IFJvcGU7XHJcbiAgICBcclxuICAgIGNsYXNzIFJvcGVCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFNwZWVkOm51bWJlcjtcclxuICAgICAgICBGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5QbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0ZpbmFsWiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLno+LTAuMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuR2V0U3RlcEJ5TG9jYXRpb24odGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkVuZChzdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBFbmQoc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuUG9wQ3RybGVyKCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IHBsYXllci5DdXJTdGVwLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uLlkgKz10aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZS8yKnRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsdGhpcy5fSW5wdXQpKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TZXRTYWZlUFModGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjpHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbFo6bnVtYmVyOyAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOm51bWJlcj0wLjEsZmxvb3I6bnVtYmVyPTEwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9wZSxQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaXNSaWdodDpib29sZWFuKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VGbG9vciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3JMaW5lO1xyXG4gICAgICAgICAgICBpZihjbG9zZUZsb29yLkZsb29yTnVtJTIhPSB0aGlzLl9GaW5hbExvY2F0aW9uLlklMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VGbG9vciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuR2V0Rmxvb3JCeUZsb29yKGNsb3NlRmxvb3IuRmxvb3JOdW0gKzEgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gY2xvc2VGbG9vci5HZXRTdGVwKCB0aGlzLl9GaW5hbExvY2F0aW9uLlggKTtcclxuICAgICAgICAgICAgaWYoaXNSaWdodClcclxuICAgICAgICAgICAgICAgIHN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgICAgICBpZihzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuRW5kKHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xhc3MgVmluZSBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjdXJCdWZmOkJhc2VQbGF5ZXJCdWZmID0gcGxheWVyLkdldEJ1ZmYoMCk7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLkJyZWFrUHJvdGVjdChwbGF5ZXIpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgVmluZUJ1ZmYoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlZpbmUsc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSsgTWF0aC5yYW5kb20oKSoyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gSWR4ID09IDE/IHBhdGguR2V0TEgoXCJ0cmFwX2VudGFuZ2xlXzAxXCIpOnBhdGguR2V0TEgoXCJ0cmFwX2Nob21wZXJfMDFcIilcclxuICAgICAgICAgICAgLy92YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKVxyXG4gICAgICAgICAgICAvL3ZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJ0cmFwX2Nob21wZXJfMDFcIilcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKCk7IFxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlZpbmVdID0gVmluZTtcclxuICAgIFxyXG4gICAgY2xhc3MgVmluZUJ1ZmYgZXh0ZW5kcyBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgQ291bnRUaW1lOm51bWJlcjtcclxuICAgICAgICBJbnB1dERpcjpib29sZWFuO1xyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsdGhpcy5fSW5wdXQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ29tcGxldGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb3VudFRpbWU6bnVtYmVyID0gNCxpbnB1dERpcjpib29sZWFuID0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlZpbmUsMCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRUaW1lID0gY291bnRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklucHV0RGlyID0gaW5wdXREaXI7XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9UaW1lO1xyXG4gICAgICAgIHByaXZhdGUgX0lucHV0KGlucHV0RGlyOmJvb2xlYW4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLklucHV0RGlyID09IGlucHV0RGlyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklucHV0RGlyID0hdGhpcy5JbnB1dERpcjtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5Db3VudFRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5Db3VudFRpbWU8PTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfU2hvd0dhbWVJbmZvKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOnN0cmluZztcclxuICAgICAgICAgICAgaWYodGhpcy5Db3VudFRpbWU8PTApXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gXCJcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuSW5wdXREaXIgPT0gdHJ1ZT9cIlJpZ2h0XCI6XCJMZWZ0XCI7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2hvd0lucHV0SW5mbyhpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCJleHBvcnQgbW9kdWxlIEdhbWVTdHJ1Y3Rcclxue1xyXG4gICAgZXhwb3J0IGNsYXNzIFNldEluZm8ge1xyXG4gICAgICAgIEF1ZGlvT246IGJvb2xlYW47XHJcbiAgICAgICAgT1BJc1JpZ2h0OiBib29sZWFuO1xyXG4gICAgICAgIFRleHRJbmZvOiBzdHJpbmc7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQXVkaW9PbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuT1BJc1JpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5UZXh0SW5mbyA9IFwiSGVsbG8gXFxuIEhlbGxvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE1Mb2NhdGlvblxyXG4gICAge1xyXG4gICAgICAgIGdldCBYKCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQXJyWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgWCh4Om51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyclswXSA9eDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFkoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBZKHk6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzFdID0geTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfQXJyOkFycmF5PG51bWJlcj47XHJcbiAgICAgICAgY29uc3RydWN0b3IoIHg6bnVtYmVyLHk6bnVtYmVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyciA9IFt4LHldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCB2YXIgSXRlbURpY3RUeXBlOntbSXRlbVR5cGU6bnVtYmVyXTphbnl9O1xyXG4gICAgSXRlbURpY3RUeXBlID0geyB9O1xyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOi+k+WFpeeuoeeQhuebuOWFs1xyXG4gKi9cclxuaW1wb3J0IEdhbWVTY2VuZVBsYXkgZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVQbGF5L0dhbWVTY2VuZVBsYXlcIlxyXG5leHBvcnQgbW9kdWxlIElucHV0XHJcbntcclxuLy/ln7rnoYDovpPlhaXmjqfliLblmahcclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VHYW1lSW5wdXRcclxue1xyXG4gICAgLy/lhazmnIlcclxuICAgIE5leHRJbnB1dDpCYXNlR2FtZUlucHV0O1xyXG4gICAgYWJzdHJhY3QgSW5wdXQoaXNSaWdodDpib29sZWFuKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggaW5wdXQgOkJhc2VHYW1lSW5wdXQgPSBudWxsIClcclxuICAgIHtcclxuICAgICAgICBpZihpbnB1dCA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLk5leHRJbnB1dCA9IGlucHV0O1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHt9XHJcbiAgICBDbGVhcigpe31cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIERJWUlucHV0IGV4dGVuZHMgQmFzZUdhbWVJbnB1dFxyXG57XHJcbiAgICBJbnB1dChpc1JpZ2h0OmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fTGlzdGVuZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0xpc3RlbmVyLmNhbGwodGhpcy5fT3duZXIsaXNSaWdodCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9Pd25lcjphbnk7XHJcbiAgICBwcml2YXRlIF9MaXN0ZW5lcjooaXNyaW5nOmJvb2xlYW4pPT52b2lkO1xyXG4gICAgY29uc3RydWN0b3Iob3duZXI6YW55ID0gbnVsbCxsaXN0ZW5lcjooaXNyaW5nOmJvb2xlYW4pPT52b2lkID0gbnVsbClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX093bmVyID0gb3duZXI7XHJcbiAgICAgICAgdGhpcy5fTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgTm9ybUdhbWVJbnB1dCBleHRlbmRzIEJhc2VHYW1lSW5wdXRcclxue1xyXG4gICAgR2FtZURpcjpHYW1lU2NlbmVQbGF5O1xyXG4gICAgX0RpcnR5OmJvb2xlYW47XHJcbiAgICBfSXNSaWdodDpib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IoIGRpcjpHYW1lU2NlbmVQbGF5LGlucHV0OkJhc2VHYW1lSW5wdXQgPSBudWxsIClcclxuICAgIHtcclxuICAgICAgICBzdXBlcihpbnB1dCk7XHJcbiAgICAgICAgdGhpcy5HYW1lRGlyID0gZGlyO1xyXG4gICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fSXNSaWdodCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgSW5wdXQoIGlzUmlnaHQ6Ym9vbGVhbiApXHJcbiAgICB7XHJcbiAgICAgICAgLy90aGlzLkdhbWVEaXIuTW92ZVN0ZXAoaXNSaWdodCk7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX0lzUmlnaHQgPSBpc1JpZ2h0O1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9EaXJ0eSYmdGhpcy5HYW1lRGlyLlBsYXllci5CYXNlQ3RybGVyLlRpbWU8PTAuMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZURpci5Nb3ZlU3RlcCh0aGlzLl9Jc1JpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBDbGVhcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRGlydHk9ZmFsc2U7XHJcbiAgICB9XHJcbn1cclxufVxyXG4iLCJpbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG50eXBlIFN0ZXBJdGVtID0gSXRlbS5TdGVwSXRlbTtcclxuXHJcbiAvKirkvZzogIU6TW9cclxuICrlnLrmma/lhoXlr7nosaEgXHJcbiAqL1xyXG4vL+euoeeQhuS4gOaVtOihjFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VudExpbmUgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbntcclxuICAgIExheU91dERpcnR5OmJvb2xlYW47XHJcbiAgICBMaW5lSWR4Om51bWJlcjtcclxuICAgIEZsb29yTnVtOm51bWJlcjtcclxuICAgIFN0ZXBMaXN0OlN0ZXBbXTtcclxuICAgIExvZ2ljTGVuZ3RoOm51bWJlcjtcclxuICAgIFN0ZXBJdGVtOlN0ZXBJdGVtO1xyXG4gICAgc2V0IFBvc2l0aW9uKCBuZXdQUzpMYXlhLlZlY3RvcjMgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvuiOt+WPluaYvuekuuWHuuadpeeahOesrOWHoOS4quW5s+WPsFxyXG4gICAgR2V0U3RlcChpZHg6bnVtYmVyKTpTdGVwXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU3RlcExpc3RbaWR4ICsgMV07XHJcbiAgICB9XHJcbiAgICAvL+iuvue9ruavj+WxglxyXG4gICAgU2V0TGluZSggZmxvb3I6bnVtYmVyICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuTGF5T3V0RGlydHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5GbG9vck51bSA9IGZsb29yO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgIHZhciBzdGVwTGVuZ3RoID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICB2YXIgc3RlcERpc3RhbmNlPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2U7XHJcbiAgICAgICAgbmV3UFMueSA9IHN0ZXBMZW5ndGgqZmxvb3I7XHJcbiAgICAgICAgbmV3UFMueiA9IC1zdGVwRGlzdGFuY2UvMiAqZmxvb3I7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgICAgICB2YXIgc3RlcEFycjpTdGVwW10gPSB0aGlzLlN0ZXBMaXN0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBzdGFydFggPSAwIC0gc3RlcEFyci5sZW5ndGgvMiAqIHN0ZXBEaXN0YW5jZTtcclxuICAgICAgICBpZih0aGlzLkp1Z2VJc0xlc3NMaW5lKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGFydFggKz0gc3RlcERpc3RhbmNlLzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgZm9yKCB2YXIgY29sdW1uID0wIDtjb2x1bW48c3RlcEFyci5sZW5ndGg7Kytjb2x1bW4gKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N0ZXA6U3RlcCA9IHN0ZXBBcnJbY29sdW1uXTtcclxuICAgICAgICAgICAgdmFyIHN0ZXBWZWN0b3IgPSBuZXdTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICBzdGVwVmVjdG9yLnggPSBzdGFydFg7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1NldGVkJiYoY29sdW1uID09IDB8fGNvbHVtbj50aGlzLkxvZ2ljTGVuZ3RoKSlcclxuICAgICAgICAgICAgICAgIG5ld1N0ZXAuUmVzZXRTdGVwKHN0ZXBWZWN0b3IsdHJ1ZSlcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgbmV3U3RlcC5SZXNldFN0ZXAoc3RlcFZlY3RvcilcclxuICAgICAgICAgICAgc3RhcnRYICs9IHN0ZXBEaXN0YW5jZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fU2V0ZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBzdGVwQXJyWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHN0ZXBBcnJbc3RlcEFyci5sZW5ndGggLTFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1NldGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiggISB0aGlzLkp1Z2VJc0xlc3NMaW5lKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkxvZ2ljTGVuZ3RoID0gc3RlcEFyci5sZW5ndGgtMjtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RlcEFycltzdGVwQXJyLmxlbmd0aCAtMl0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuTG9naWNMZW5ndGggPSBzdGVwQXJyLmxlbmd0aCAtMztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5Yik5pat5piv5ZCm5pS257yp55qE6YKj5bGCXHJcbiAgICBKdWdlSXNMZXNzTGluZSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5GbG9vck51bSUyICE9IDA7XHJcbiAgICB9XHJcbiAgICAvL+Wwhuavj+S4quiKgueCuemTvuaOpeWIsOS4i+S4gOWxglxyXG4gICAgU2V0TmV4dEZsb29yKCBsYXN0Rmxvb3I6TW91bnRMaW5lKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbmnInkuKTlpLTnq6/ngrlcclxuICAgICAgICB2YXIgaGF2ZVBvaW50ID0gbGFzdEZsb29yLkxvZ2ljTGVuZ3RoID50aGlzLkxvZ2ljTGVuZ3RoXHJcbiAgICAgICAgZm9yKCB2YXIgc3RhcnRJZHg6bnVtYmVyID0gMDtzdGFydElkeDwgdGhpcy5Mb2dpY0xlbmd0aDsrK3N0YXJ0SWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxlZnRQYXJlbnQ6U3RlcCA9bnVsbDtcclxuICAgICAgICAgICAgdmFyIHJpZ2h0UGFyZW50OlN0ZXAgPW51bGw7XHJcbiAgICAgICAgICAgIGlmKGhhdmVQb2ludClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGVmdFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgrMSk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxlZnRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeC0xKTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB0aGlTdGVwID0gdGhpcy5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgdGhpU3RlcC5MZWZ0UGFyZW50ID0gbGVmdFBhcmVudDtcclxuICAgICAgICAgICAgbGVmdFBhcmVudC5SaWdodENoaWxkID0gdGhpU3RlcDtcclxuXHJcbiAgICAgICAgICAgIHRoaVN0ZXAuUmlnaHRQYXJlbnQgPSByaWdodFBhcmVudDtcclxuICAgICAgICAgICAgcmlnaHRQYXJlbnQuTGVmdENoaWxkID0gdGhpU3RlcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+aVsueijuS4gOWxglxyXG4gICAgQnJlYWsoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1NldGVkOmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihsaW5lSWR4Om51bWJlcixmbG9vcjpudW1iZXIgPSAwKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjb2x1bW5zOm51bWJlciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkxpbmVTdGVwTnVtO1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5MaW5lSWR4ID0gbGluZUlkeDtcclxuICAgICAgICB0aGlzLkZsb29yTnVtID0gZmxvb3I7XHJcbiAgICAgICAgdGhpcy5TdGVwTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuTG9naWNMZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuTGF5T3V0RGlydHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9TZXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciggdmFyIFN0YXJ0SWR4Om51bWJlciA9IChjb2x1bW5zIC0xKTtTdGFydElkeD49MDstLVN0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuZXdTdGVwOlN0ZXAgPSBuZXcgU3RlcCh0aGlzLFN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChuZXdTdGVwKTtcclxuICAgICAgICAgICAgdGhpcy5TdGVwTGlzdFtTdGFydElkeF0gPSBuZXdTdGVwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHtQbGF5ZXJDb250cm9sZXJ9IGZyb20gXCIuL1BsYXllckN0cmxlclwiXHJcbmltcG9ydCB7UGxheWVyQnVmZn0gZnJvbSBcIi4vQnVmZlwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IHtDaGFyYWN0ZXJ9IGZyb20gXCIuL0NoYXJhY3RlclwiXHJcbnZhciBudW06bnVtYmVyID0gMDtcclxudHlwZSBCYXNlUGxheWVyQnVmZiA9IFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmY7XHJcbi8v6K+l6ISa5pys55So5LqO5ri45oiP546p5a625a+56LGh566h55CGXHJcbi8v546p5a625a+56LGhXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIExheWEuU3ByaXRlM0RcclxueyAgIFxyXG4gICAgLy/np4HmnInlsZ7mgKdcclxuICAgIF9Mb2dpY1Bvc2l0aW9uOkxheWEuVmVjdG9yMztcclxuICAgIHByaXZhdGUgX0J1ZmZOb2RlOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBwcml2YXRlIF9QbGF5ZXJNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBfQ3VyU3RlcDpTdGVwO1xyXG4gICAgcHJpdmF0ZSBfQ3RybGVyOlBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyO1xyXG4gICAgcHJpdmF0ZSBtX0FuaW1hdG9yOkxheWEuQW5pbWF0b3I7XHJcbiAgICBwcml2YXRlIG1fQnVmZk1vZGVsOntbbmFtZTpudW1iZXJdOkxheWEuU3ByaXRlM0R9XHJcbiAgICBcclxuICAgIEJhc2VDdHJsZXI6UGxheWVyQ29udHJvbGVyLlBsYXllck5vcm1DdHJsZXI7XHJcbiAgICBCdWZmQXJyOkFycmF5PFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmY+O1xyXG4gICAgLy96ZXJnXHJcbiAgICBJZE51bWJlcjpudW1iZXI7XHJcblxyXG4gICAgc2V0IEN1clN0ZXAoc3RlcDpTdGVwKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0N1clN0ZXAgPSBzdGVwO1xyXG4gICAgfVxyXG4gICAgZ2V0IEN1clN0ZXAoKTpTdGVwXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0N1clN0ZXA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBJbml0QlVmZk1vZGVsKCBwbGF5ZXJNb2RlbDpMYXlhLlNwcml0ZTNEIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNldE1vZGVsKCBcIml0ZW1fZmx5ZXJfMDFcIiwgXCJSX2hhbmRcIixwbGF5ZXJNb2RlbCwgSXRlbS5JdGVtVHlwZS5GbHkpO1xyXG4gICAgICAgIHRoaXMuU2V0TW9kZWwoIFwiaXRlbV9zaGllbGRfMDFcIiwgXCJoZWFkXCIscGxheWVyTW9kZWwsIEl0ZW0uSXRlbVR5cGUuUHJvdGVjdCk7XHJcbiAgICAgICAgdGhpcy5TZXRNb2RlbCggXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIsIFwiaGVhZFwiLHBsYXllck1vZGVsLCBJdGVtLkl0ZW1UeXBlLkhvbHlQcm90ZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNldE1vZGVsKCByZXNvdXJjZU5hbWU6c3RyaW5nLCBub2RlTmFtZTpzdHJpbmcsIHBsYXllck1vZGVsOkxheWEuU3ByaXRlM0QsIGl0ZW1UeXBlOkl0ZW0uSXRlbVR5cGUgKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0TEgocmVzb3VyY2VOYW1lKSk7XHJcbiAgICAgICAgdmFyIGJ1ZmZNb2RlbDpMYXlhLlNwcml0ZTNEID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICBcclxuICAgICAgICBwbGF5ZXJNb2RlbC5nZXRDaGlsZEF0KDApLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgc3dpdGNoKG5vZGVOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBcImhlYWRcIjpcclxuICAgICAgICAgICAgICAgIHZhciBub2RlOkxheWEuU3ByaXRlM0QgPSBwbGF5ZXJNb2RlbC5nZXRDaGlsZEJ5TmFtZShub2RlTmFtZSkgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWRkQ2hpbGQoYnVmZk1vZGVsKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IubGlua1Nwcml0ZTNEVG9BdmF0YXJOb2RlKG5vZGVOYW1lLGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBidWZmTW9kZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX0J1ZmZNb2RlbFtpdGVtVHlwZV0gPSBidWZmTW9kZWw7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9CdWZmTW9kZWwgPSB7fTtcclxuICAgICAgICB2YXIgTmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiYzAwMV9jaGlsZF8wMVwiKTtcclxuICAgICAgICB2YXIgUGxheWVyTW9kZWwgPSBMYXlhLkxvYWRlci5nZXRSZXMoTmFtZSk7XHJcbiAgICAgICAgdmFyIHNlY29uZFBsYXllcjpMYXlhLlNwcml0ZTNEID0gUGxheWVyTW9kZWwuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHNlY29uZFBsYXllcik7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcyk7XHJcblxyXG4gICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbiAgICAgICAgc2Vjb25kUGxheWVyLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygwLCAxODAsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvciA9IHNlY29uZFBsYXllci5nZXRDaGlsZEF0KDApLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICB0aGlzLm9uKExheWEuRXZlbnQuUkVNT1ZFRCx0aGlzLCgpPT57IHRoaXMuZGVzdHJveSgpIH0pXHJcbiAgICAgICAgdGhpcy5SZXNldCgpO1xyXG4gICAgICAgIHRoaXMuSW5pdEJVZmZNb2RlbChzZWNvbmRQbGF5ZXIpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgUmVzZXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IG51bGw7XHJcbiAgICAgICAgaWYodGhpcy5fQnVmZk5vZGUpXHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9CdWZmTm9kZSA9IG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9CdWZmTm9kZSk7XHJcbiAgICAgICAgdGhpcy5CdWZmQXJyID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5CYXNlQ3RybGVyID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJOb3JtQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IHRoaXMuQmFzZUN0cmxlcjtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygwLDApO1xyXG4gICAgICAgIHRoaXMuZnJhbWVMb29wKDEsdGhpcyx0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHZhciBkZWZhdWx0QW5pbVN0YXRlOkxheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMubV9BbmltYXRvci5nZXREZWZhdWx0U3RhdGUoKTtcclxuICAgICAgICB2YXIgc3RhdGVOYW1lOnN0cmluZyA9IGRlZmF1bHRBbmltU3RhdGUubmFtZTtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShzdGF0ZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W546p5a62QlVGRlxyXG4gICAgICogQHBhcmFtIGlkeCDmp73kvY3mo4Dmn6VcclxuICAgICAqIEByZXR1cm5zIOepuuihqOekuuayoeaciVxyXG4gICAgICovXHJcbiAgICBHZXRCdWZmKGlkeDpudW1iZXIpOlBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuQnVmZkFycltpZHhdICE9bnVsbCYmdGhpcy5CdWZmQXJyW2lkeF0hPXVuZGVmaW5lZCk/dGhpcy5CdWZmQXJyW2lkeF06bnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+aRhuaUvuinkuiJslxyXG4gICAgU2V0U3RlcChwdXRTdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBwdXRTdGVwO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHB1dFN0ZXAuUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBuZXdQUy55ICs9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBwdXRTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uU3RhbmQpKTtcclxuICAgICAgICB0aGlzLlRvdWNoR3JvdW5kKCk7XHJcbiAgICB9XHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5ld1BTOkxheWEuVmVjdG9yMyA9IG5ld1BTLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpOkxheWEuVmVjdG9yM1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IExvZ2ljUG9zaXRpb24oKTpMYXlhLlZlY3RvcjNcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fTG9naWNQb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW4g+WxgOW9k+WJjeWxguS9huS4jeenu+WKqFxyXG4gICAgICogQHBhcmFtIHtTdGVwfSBzdGVwIOS4i+S4gOatpeWPsOmYtlxyXG4gICAgICovXHJcbiAgICBMYXlTdGVwKHN0ZXA6U3RlcCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IHN0ZXA7XHJcbiAgICAgICAgdGhpcy5fTG9naWNQb3NpdGlvbiA9IHN0ZXAuUG9zaXRpb247XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFN0YXJ0TW92ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheSggQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5KdW1wKSApO1xyXG4gICAgICAgIHRoaXMuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBKdW1wRG93bigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkp1bXBkb3duKSk7XHJcbiAgICB9XHJcblxyXG4gICAgRmx5KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uRmx5KSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgUGxheWVyRGVhdGg6Ym9vbGVhbjtcclxuICAgIC8v6Kem5Y+R5Y+w6Zi2XHJcbiAgICBUb3VjaEdyb3VuZCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckRlYXRoIHx8ICF0aGlzLkN1clN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZigodGhpcy5DdXJTdGVwLlN0ZXBJdGVtLkl0ZW1UeXBlID09IEl0ZW0uSXRlbVR5cGUuTm9uZSkmJih0aGlzLkN1clN0ZXAuSXNFbXB0eXx8KHRoaXMuQ3VyU3RlcC5MZWZ0UGFyZW50JiZ0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQmJnRoaXMuQ3VyU3RlcC5MZWZ0UGFyZW50LlN0ZXBJdGVtLklzRm9yYmlkZW4mJnRoaXMuQ3VyU3RlcC5SaWdodFBhcmVudC5TdGVwSXRlbS5Jc0ZvcmJpZGVuKSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5GYWxsKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwLlN0ZXBJdGVtLlRvdWNoSXRlbSh0aGlzKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vliqhcclxuICAgICAqIEBwYXJhbSB7TGF5YS5WZWN0b3IzfSB2ZWN0b3Ig56e75Yqo5ZCR6YeP5YC8XHJcbiAgICAgKi9cclxuICAgIFRyYW5zbGF0ZSggdmVjdG9yOkxheWEuVmVjdG9yMyApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS50cmFuc2xhdGUodmVjdG9yKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMuX0xvZ2ljUG9zaXRpb24sdmVjdG9yLHRoaXMuX0xvZ2ljUG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg546p5a625o6n5Yi25ZmoXHJcbiAgICAgKiBAcGFyYW0gbmV3Q3RybGVyIOaWsOeOqeWutuaOp+WItuWZqFxyXG4gICAgICovXHJcbiAgICBBZGRDdHJsZXIobmV3Q3RybGVyOlBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciBjdHJsZXI6UGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXIgPSB0aGlzLl9DdHJsZXI7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyID0gbmV3Q3RybGVyO1xyXG4gICAgICAgIG5ld0N0cmxlci5OZXh0Q3RybCA9Y3RybGVyO1xyXG4gICAgICAgIG5ld0N0cmxlci5TZXRQbGF5ZXIodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vkuqTmjqfliLblmahcclxuICAgICAqL1xyXG4gICAgUG9wQ3RybGVyKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IHRoaXMuX0N0cmxlci5OZXh0Q3RybDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5re75YqgQlVGRlxyXG4gICAgICogQHBhcmFtIGJ1ZmYgXHJcbiAgICAgKiBAcGFyYW0gaW5kZXggXHJcbiAgICAgKi9cclxuICAgIEFkZEJ1ZmYoYnVmZjpQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZGV4Om51bWJlciA9IGJ1ZmYuSWR4O1xyXG4gICAgICAgIGlmKHRoaXMuQnVmZkFycltpbmRleF0hPW51bGx8fHRoaXMuQnVmZkFycltpbmRleF0hPXVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGJ1ZmZNb2RlbDpMYXlhLlNwcml0ZTNEID0gdGhpcy5tX0J1ZmZNb2RlbFtidWZmLlR5cGVdO1xyXG4gICAgICAgIGlmKGJ1ZmZNb2RlbCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBidWZmTW9kZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5CdWZmQXJyW2luZGV4XSA9IGJ1ZmY7XHJcbiAgICAgICAgYnVmZi5JZHggPSBpbmRleDtcclxuICAgICAgICBidWZmLlN0YXJ0KHRoaXMpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqBCVUZG5qih5Z6LXHJcbiAgICAgKiBAcGFyYW0gbW9kIFxyXG4gICAgICovXHJcbiAgICBBZGRCdWZmTW9kZSggbW9kOkxheWEuU3ByaXRlM0QgKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBpZihtb2QhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTm9kZS5hZGRDaGlsZChtb2QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog57uT5p2fQlVGRlxyXG4gICAgICovXHJcbiAgICBDb21wbGV0ZUJ1ZmYoaW5kZXg6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBidWZmOkJhc2VQbGF5ZXJCdWZmID0gdGhpcy5CdWZmQXJyW2luZGV4XTtcclxuICAgICAgICB2YXIgYnVmZk1vZGVsOkxheWEuU3ByaXRlM0QgPSB0aGlzLm1fQnVmZk1vZGVsW2J1ZmYuVHlwZV07XHJcbiAgICAgICAgaWYoYnVmZk1vZGVsKSBidWZmTW9kZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdWZmQXJyW2luZGV4XT1udWxsO1xyXG4gICAgICAgIGlmKGJ1ZmY9PW51bGx8fGJ1ZmY9PXVuZGVmaW5lZCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBfVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0N0cmxlci5VcGRhdGUoKTtcclxuICAgICAgICBmb3IoIHZhciBidWZmSWR4Om51bWJlciA9IDA7YnVmZklkeDwyOysrYnVmZklkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLkJ1ZmZBcnJbYnVmZklkeF0hPW51bGx8fHRoaXMuQnVmZkFycltidWZmSWR4XSE9dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5CdWZmQXJyW2J1ZmZJZHhdLlVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEZseVByZXBhcmUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0ZXBEYXRhXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHt9XHJcbiAgICBHZXREYXRhKCBzdGVwOlN0ZXAgKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyQ29udHJvbGVyXHJcbntcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGxheWVyQ3RybGVyXHJcbiAgICB7XHJcbiAgICAgICAgLy/lhazlhbHmjqXlj6NcclxuICAgICAgICBOZXh0Q3RybDpCYXNlUGxheWVyQ3RybGVyO1xyXG4gICAgICAgIHBsYXllcjpQbGF5ZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgVXBkYXRlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNldFBsYXllcihwbGF5ZXI6UGxheWVyKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvciggcGxheWVyOlBsYXllciwgY3RybGVyOkJhc2VQbGF5ZXJDdHJsZXIgPSBudWxsIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGN0cmxlciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdHJsZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTmV4dEN0cmwgPSBjdHJsZXI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX1VwZGF0ZSgpOnZvaWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v55So5LqO6KeS6Imy5q2j5bi454q25oCB5LiL55qE56e75YqoXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTm9ybUN0cmxlciBleHRlbmRzIEJhc2VQbGF5ZXJDdHJsZXJcclxuICAgIHtcclxuICAgICAgICBUaW1lOm51bWJlcjtcclxuICAgICAgICBJc0ZhbGxpbmc6Ym9vbGVhbjtcclxuICAgICAgICBTdGFydE1vdmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5EaXJlY3Rvci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihwbGF5ZXI6UGxheWVyID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKHBsYXllcilcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5UaW1lPjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuVGltZTw9QVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5EaXJlY3Rvci5HYW1lVGltZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRpbWUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5TZXRTdGVwKHRoaXMucGxheWVyLkN1clN0ZXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdFRpbWUgPSB0aGlzLlRpbWUtTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIHRoaXMuSXNGYWxsaW5nID0gZmFsc2UgJiYgbGFzdFRpbWUqMiA+IHRoaXMuVGltZS1MYXlhLnRpbWVyLmN1cnJUaW1lcilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuSXNGYWxsaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuSnVtcERvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhdGUgPSAoMS1sYXN0VGltZS8gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuUGxheWVyTW92ZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBTdGVwUHM6TGF5YS5WZWN0b3IzID0gdGhpcy5wbGF5ZXIuQ3VyU3RlcC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBTdGVwUHMueSArPUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnBzOkxheWEuVmVjdG9yMyA9IHRoaXMucGxheWVyLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnBzLnkgKz1Db250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQcyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdQcy54ID0gKFN0ZXBQcy54IC0gY3VycHMueCkqcmF0ZSsgY3VycHMueDtcclxuICAgICAgICAgICAgICAgICAgICBuZXdQcy55ID0gKFN0ZXBQcy55IC0gY3VycHMueSkqcmF0ZStjdXJwcy55O1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1BzLnogPSAoU3RlcFBzLnogLSBjdXJwcy56KSpyYXRlK2N1cnBzLno7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5Qb3NpdGlvbiA9IG5ld1BzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eOqeWutumjnuihjFxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckZseSBleHRlbmRzIEJhc2VQbGF5ZXJDdHJsZXJcclxuICAgIHtcclxuICAgICAgICBTcGVlZDpudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u546p5a62XHJcbiAgICAgICAgICogQHBhcmFtIHBsYXllciDmk43mjqfop5LoibJcclxuICAgICAgICAgKi9cclxuICAgICAgICBTZXRQbGF5ZXIocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlNldFBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuVHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCxDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoLDApKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3ZhciB2ZWN0b3IgPSBuZXcgTGF5YS5WZWN0b3IzKDAsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCwtMSpDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMik7XHJcbiAgICAgICAgICAgLy8gTGF5YS5WZWN0b3IzLnNjYWxlKHZlY3Rvcix0aGlzLlNwZWVkLHZlY3Rvcik7XHJcbiAgICAgICAgICAgdmFyIHZlY3RvcjpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsMC4xNDYsLTAuMTAzOTQpXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLlRyYW5zbGF0ZSh2ZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi9Nb3VudExpbmVcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG50eXBlIE1Mb2NhdGlvbiA9IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4vL+atpVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG57XHJcbiAgICAvL+aooeWei+S4quaVsFxyXG4gICAgcHVibGljIHN0YXRpYyBzdGVwTW9kZWxOdW06bnVtYmVyID0gMztcclxuXHJcbiAgICBMZWZ0UGFyZW50OlN0ZXA7XHJcbiAgICBSaWdodFBhcmVudDpTdGVwO1xyXG4gICAgTGVmdENoaWxkOlN0ZXA7XHJcbiAgICBSaWdodENoaWxkOlN0ZXA7XHJcbiAgICBTdGVwSXRlbTpTdGVwSXRlbTtcclxuICAgIFJvYWROdW06bnVtYmVyO1xyXG4gICAgTWFyazphbnk7XHJcbiAgICBGbG9vcjpNb3VudExpbmU7XHJcbiAgICBJZHg6bnVtYmVyO1xyXG4gICAgXHJcbiAgICAvL+WFrOacieaOpeWPo1xyXG4gICAgc2V0IFBvc2l0aW9uKCBuZXdQUzpMYXlhLlZlY3RvcjMgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9jYXRpb24oKTpNTG9jYXRpb25cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKHRoaXMuSWR4LTEsdGhpcy5GbG9vci5GbG9vck51bSk7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNEZWFkUm9hZCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNEZWFkUm9hZHx8IXRoaXMuYWN0aXZlfHwgdGhpcy5TdGVwSXRlbS5Jc0RpZmZpY3VsdHk7XHJcbiAgICB9XHJcbiAgICBzZXQgSXNEZWFkUm9hZCh2YWx1ZTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBJc0ZvcmJpZGVuKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlN0ZXBJdGVtLklzRm9yYmlkZW47XHJcbiAgICB9XHJcbiAgICBnZXQgSXNFbXB0eSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gISh0aGlzLmFjdGl2ZSYmdGhpcy5GbG9vci5hY3RpdmUpO1xyXG4gICAgfVxyXG4gICAgUHV0SXRlbSggaXRlbUVudW1lOkl0ZW0uSXRlbVR5cGUgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGl0ZW1FbnVtZSA9PSBJdGVtLkl0ZW1UeXBlLkVtcHR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPWZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5QdXRJdGVtKGl0ZW1FbnVtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXRTdGVwKG5ld1BzOkxheWEuVmVjdG9yMyxpZ25vcmVBY3RpdmU6Ym9vbGVhbiA9IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUG9zaXRpb24gPSBuZXdQcztcclxuICAgICAgICBpZighaWdub3JlQWN0aXZlKVxyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIG1vZGVsUHMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlB1dEl0ZW0oSXRlbS5JdGVtVHlwZS5Ob25lKTtcclxuXHJcbiAgICAgICAgdGhpcy5MZWZ0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxlZnRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb2FkTnVtID0gMDtcclxuICAgIH1cclxuICAgIF9TdGVwTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIGNvbnN0cnVjdG9yKGZsb29yOk1vdW50TGluZSxpZHg6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIC8vc3VwZXIobmV3IExheWEuQm94TWVzaCgxLDEsMSkgKTtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMpO1xyXG4gICAgICAgIGlmKHRoaXMuSWR4ICE9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxKyBNYXRoLnJhbmRvbSgpKlN0ZXAuc3RlcE1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wXCIrSWR4KVxyXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoIExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC41LCAwLjUsIDAuNSkpIDsvL2xvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGNsb25lTW9kZWwgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIGNsb25lTW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoY2xvbmVNb2RlbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW1GYWN0b3J5KEl0ZW0uSXRlbVR5cGUuTm9uZSx0aGlzKTs7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5SZXNldEl0ZW0oKTtcclxuICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgdGhpcy5JZHggPSBpZHg7XHJcblxyXG4gICAgICAgIHRoaXMuTGVmdFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRDaGlsZCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlJvYWROdW0gPSAwO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfSXNEZWFkUm9hZDpib29sZWFuO1xyXG5cclxufSIsIi8qKlxyXG4gKiDkvZzogIU6TW9cclxuICog5ZCv5Yqo5Zy65pmvXHJcbiAqL1xyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgTG9hZFNjZW5lIGZyb20gXCIuL1NjZW5lL0xvYWRTY2VuZVwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuL1V0aWxpdHkvUGF0aFwiXHJcbmNsYXNzIEdhbWVcclxue1xyXG5cdF9GcmFtZTpGcmFtZVdvcms7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNzID0gQVBQO1xyXG4gICAgICAgIExheWEzRC5pbml0KDAsMCx0cnVlKTtcclxuICAgICAgICBHYW1lQ29uZmlnLmluaXQoKTtcclxuICAgICAgICAvL0xheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GSVhFRF9XSURUSDtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRlVMTDtcclxuICAgICAgICBcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBMYXlhLlN0YWdlLlNDUkVFTl9WRVJUSUNBTDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IExheWEuU3RhZ2UuQUxJR05fQk9UVE9NO1xyXG4gICAgICAgIC8v5byA5ZCv57uf6K6h5L+h5oGvXHJcblx0XHRMYXlhLlN0YXQuc2hvdygpXHJcbiAgICAgICAgdmFyIHJlc0NvbCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6XCJ1aS9SZXNvdXJjZS9sb2NhbGNvbXAuYXRsYXNcIix0eXBlOkxheWEuTG9hZGVyLkFUTEFTfV07XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChyZXNDb2wsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRnJhbWUgPSBGcmFtZVdvcmsuRk07XHJcbiAgICAgICAgdGhpcy5fRnJhbWUuQWRkTWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIHZhciBzY2VuZU1ncjpTY2VuZU1hbmFnZXIgPSB0aGlzLl9GcmFtZS5BZGRNYW5hZ2VyPFNjZW5lTWFuYWdlcj4oU2NlbmVNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLl9GcmFtZS5BZGRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuXHRcdHNjZW5lTWdyLkNoYW5nZVNjZW5lKG5ldyBMb2FkU2NlbmUoKSk7XHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuVXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9GcmFtZS5VcGRhdGUoKTtcclxuICAgIH1cclxufVxyXG52YXIgR00gPSBuZXcgR2FtZSgpO1xyXG4iLCJpbXBvcnQge1NjZW5lfSBmcm9tIFwiLi9TY2VuZVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgeyBQbGF5ZXJCdWZmIH0gZnJvbSBcIi4vLi4vR2FtZS9CdWZmXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR2FtZVNjZW5lUGxheSBmcm9tIFwiLi9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheVwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZURpcmVjdG9yIGV4dGVuZHMgU2NlbmUuQmFzZURpcmVjdG9yIHtcclxuICAgIHB1YmxpYyBnZXQgR2FtZVBsYXkoKTpHYW1lU2NlbmVQbGF5XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ3VyU3RhdGUgYXMgR2FtZVNjZW5lUGxheTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsb2FkTGlzdDJEID0gW3BhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIikscGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVwiKSxwYXRoLkdldERlcGF0aFVJSlMoXCJFbmRHYW1lXCIpXTtcclxuICAgICAgICB0aGlzLkNoYW5nZVN0YXRlKG5ldyBTY2VuZS5Mb2FkU2NlbmVMb2dpYyhsb2FkTGlzdDJELG51bGwsbmV3IEdhbWVTY2VuZVBsYXkoKSkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIEVuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCIvKlxyXG7kvZzogIU6TW9cclxu6Lez5bGx576K5Zy65pmv5qC45b+D5Yqf6IO9XHJcbiovXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW5kR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgR2FtZUNhbWVyYSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVDYW1lcmFcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLy4uL0dhbWUvUGxheWVyXCJcclxuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vLi4vR2FtZS9Nb3VudExpbmVcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbnR5cGUgSXRlbUxheW91dCA9IEl0ZW0uSXRlbUxheW91dDtcclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuLy/muLjmiI/lnLrmma9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lXHJcbntcclxuICAgIE1vZGVsTG9hZDpib29sZWFuO1xyXG4gICAgR2FtZURpcjpHYW1lRGlyZWN0b3I7XHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpHYW1lRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdhbWVEaXJlY3RvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fU2NlbmVPYmogPSBuZXcgTGF5YS5TY2VuZTNEO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEVudGVyR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VudGVyR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4uL2NvbnRyb2xlci9BUFBcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1aWRlck1hbmFnZXIgXHJcbntcclxuLy/lr7nlpJbmjqXlj6NcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6R3VpZGVyTWFuYWdlcjtcclxuICAgIHN0YXRpYyBnZXQgTWdyKCk6R3VpZGVyTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEd1aWRlck1hbmFnZXIuX01nciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR3VpZGVyTWFuYWdlci5fTWdyID0gbmV3IEd1aWRlck1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEd1aWRlck1hbmFnZXIuX01ncjtcclxuICAgIH1cclxuICAgIFNjZW5lTWdyOlNjZW5lTWFuYWdlcjtcclxuICAgIEN1clNjZW5lOkd1aWRlclNjZW5lO1xyXG4gICAgcHVibGljIGdldCBHYW1lRGlyKCk6R3VpZGVyRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTY2VuZS5HdWlkRGlyO1xyXG4gICAgfVxyXG4gICAgLy/ov5vlhaXmuLjmiI/lnLrmma/otbDov5nkuKrmjqXlj6NcclxuICAgIEVudGVyU2NlbmUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5ld0dhbWVTY2VuZSA9IG5ldyBHdWlkZXJTY2VuZSgpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ2hhbmdlU2NlbmUobmV3R2FtZVNjZW5lKTtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbmV3R2FtZVNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlclNjZW5lIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lXHJcbntcclxuICAgIEd1aWREaXI6R3VpZGVyRGlyZWN0b3I7XHJcbiAgICBDdXJEaXI6QmFzZURpcmVjdG9yO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaXJlY3RvcjpTY2VuZS5CYXNlRGlyZWN0b3IgPSBuZXcgR3VpZGVyRGlyZWN0b3IoKTtcclxuICAgICAgICByZXR1cm4gRGlyZWN0b3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlckRpcmVjdG9yIGV4dGVuZHMgU2NlbmUuQmFzZURpcmVjdG9yXHJcbntcclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoIClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZDJETGlzdCA9IFt7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIikgLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpwYXRoLkdldEF0bFBhdGgoXCJjb21wXCIpLHR5cGU6IExheWEuTG9hZGVyLkFUTEFTIH1dO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlR2FtZVBsYXkobmV3IFNjZW5lLkxvYWRTY2VuZUxvZ2ljKGxvYWQyRExpc3QsbnVsbCxuZXcgR3VpZGVyU2NlbmVQbGF5KCkpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKCk6dm9pZFxyXG4gICAge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyU2NlbmVQbGF5IGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lUGxheWVcclxue1xyXG4gICAgVUk6RW50ZXJHYW1lVUk7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH0gICAgXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8RW50ZXJHYW1lVUk+KEVudGVyR2FtZVVJKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuLy4uL3VpL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgTG9hZGluZ1VJIGZyb20gXCIuLy4uL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJXCJcclxuaW1wb3J0IEZNV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4vR3VpZGVyTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBCRyBmcm9tIFwiLi8uLi91aS9CR1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkU2NlbmUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgTG9hZERpcmN0b3IoKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5jbGFzcyBMb2FkRGlyY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsb2FkTGlzdDJEID0gW3t1cmw6XCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpcInVpL1Jlc291cmNlL2xvY2FsY29tcC5hdGxhc1wiLHR5cGU6TGF5YS5Mb2FkZXIuQVRMQVN9XTtcclxuICAgICAgICB0aGlzLkNoYW5nZUdhbWVQbGF5KCBuZXcgU2NlbmUuTG9hZFNjZW5lTG9naWMobG9hZExpc3QyRCxudWxsLG5ldyBMb2FkU2NlbmVQbGF5ZSgpKSApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+WKoOi9veWcuuaZr+mAu+i+kVxyXG5jbGFzcyBMb2FkU2NlbmVQbGF5ZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllXHJcbntcclxuICAgIHByaXZhdGUgbV9Db3VudDJETG9hZDpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fQ291bnQzRExvYWQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0xvYWRGYWlsZTpib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50VmFsdWU6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0xvYWRpbmdVSTpMb2FkaW5nVUk7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID0gMDtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU3RhcnRMb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTJEQXJyID0gW1xyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiU2V0UGFuZWxcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJDaGFyYWN0ZXJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkJHXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJjb21wXCIpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkVSUk9SLHRoaXMsdGhpcy5vbkVycm9yKTtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLm9uQ29tcGxldGUpO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTNEQXJyID0gWyBcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDFfY2hpbGRfMDFcIikgLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzA0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9jb2luXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfY2hvbXBlcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX3N0aW5nXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRfMDFcIiksXHJcbiAgICAgICAgXVxyXG4gICAgICAgIHRoaXMuTG9hZChyZXNvdXJjZTJEQXJyLHJlc291cmNlM0RBcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgTG9hZChhcnIyRDpBcnJheTxhbnk+ID0gbnVsbCxhcnIzRDpBcnJheTxhbnk+PW51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXJyMkQhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKGFycjJELG51bGwsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub24yRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgLT0wLjU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFycjNEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY3JlYXRlKGFycjNELExheWEuSGFuZGxlci5jcmVhdGUodGhpcyxudWxsKSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbjNEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSAtPTAuNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbjNEUHJvZ3Jlc3ModmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubV9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9dmFsdWUvMjtcclxuICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLlZhbHVlID0gKHRoaXMubV9Db3VudDJETG9hZCArIHRoaXMubV9Db3VudDNETG9hZCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uMkRQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuVmFsdWUgPSAodGhpcy5tX0NvdW50MkRMb2FkICsgdGhpcy5tX0NvdW50M0RMb2FkKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25FcnJvcihzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJMb2FkRXJyb3I6XCIrc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Db21wbGV0ZShkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubV9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGhpRGlyID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5SZWxvYWQoZnVuY3Rpb24oKTp2b2lke3RoaURpci5Mb2FkKCl9ICk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQkcgPSBuZXcgQkcoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5Db21wbGV0ZSgoKT0+e0d1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdVSSA9IEFQUC5VSU1hbmFnZXIuU2hvdzxMb2FkaW5nVUk+KExvYWRpbmdVSSk7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID0gMC41O1xyXG4gICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9IDAuNTtcclxuICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU3RhcnRMb2FkKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZENvbXBsZXRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgfVxyXG59XHJcbi8qXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRTY2VuZSBleHRlbmRzIEJhc2VTY2VuZVxyXG57XHJcbiAgICBDdXJEaXI6QmFzZURpcmVjdG9yO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9HZW5EaXIoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJEaXIgPSBuZXcgTG9hZERpcmN0b3IoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgU3RhcnRMb2FkKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciByZXNDb2wgPSBbe3VybDpcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOlwidWkvUmVzb3VyY2UvbG9jYWxjb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU31dO1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQocmVzQ29sLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9Mb2FkQ29tcGxldGUpKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiovXHJcbi8qXHJcbmNsYXNzIExvYWREaXJjdG9yIGV4dGVuZHMgQmFzZURpcmVjdG9yXHJcbntcclxuICAgIFVJOkxvYWRpbmdVSTtcclxuICAgIFxyXG4gICAgUmVTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBfQ291bnQyRExvYWQ6bnVtYmVyO1xyXG4gICAgX0NvdW50M0RMb2FkOm51bWJlcjtcclxuICAgIF9Mb2FkRmFpbGU6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX0NvdW50M0RMb2FkID0gMC41O1xyXG4gICAgICAgIHRoaXMuX0NvdW50MkRMb2FkID0gMC41O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIExheWEubG9hZGVyLm9uKExheWEuRXZlbnQuRVJST1IsdGhpcyx0aGlzLl9vbkVycm9yKTtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbihMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5fb25Db21wbGV0ZSk7XHJcbiAgICAgICAgdGhpcy5Mb2FkKCk7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5fTG9hZEZhaWxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9TdGFydENvbXBsZXRlKClcclxuICAgIHtcclxuICAgICAgICBzdXBlci5fU3RhcnRDb21wbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8TG9hZGluZ1VJPihMb2FkaW5nVUkpO1xyXG4gICAgICAgIHRoaXMuVUkuVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgTG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ291bnQyRExvYWQgPTA7XHJcbiAgICAgICAgdGhpcy5fQ291bnQzRExvYWQgPTA7XHJcbiAgICAgICAgdGhpcy5fQ291bnRWYWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fTG9hZEZhaWxlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJlc291cmNlMkRBcnIgPSBbXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJTZXRQYW5lbFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkNoYXJhY3RlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiUGxheWVyTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQkdcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImNvbXBcIilcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAvL3Jlc291cmNlMkRBcnIgPSBudWxsO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEubG9hZGVyLm9uKExheWEuRXZlbnQuRVJST1IsdGhpcyx0aGlzLl9vbkVycm9yKTtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbihMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5fb25Db21wbGV0ZSk7XHJcbiAgICAgICAgLy92YXIgcmVzb3VyY2UzREFyciA9IFtcIkM6L1VzZXJzL0FkbWluaXN0cmF0b3IvRGVza3RvcC9SZXNvdXJjZS9MYXlhU2NlbmVfTDAxX2F1dF9iYXJyaWVyXzAyL0xheWFTY2VuZV9MMDFfYXV0X2JhcnJpZXJfMDIvQ29udmVudGlvbmFsL0wwMV9hdXRfYmFycmllcl8wMi5saFwiXTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UzREFyciA9IFsgXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJjMDAxX2NoaWxkXzAxXCIpICxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wMlwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wNFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wMlwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fZmx5ZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX3NoaWVsZF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fdW50b3VjaGFibGVfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX2Nob21wZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX2VudGFuZ2xlXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fYWJzb3JkXzAxXCIpLFxyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIF0vLyBcIkM6L1VzZXJzL0FkbWluaXN0cmF0b3IvRGVza3RvcC9SZXNvdXJjZS9MYXlhU2NlbmVfTDAxX2F1dF9iYXJyaWVyXzAyL0xheWFTY2VuZV9MMDFfYXV0X2JhcnJpZXJfMDIvQ29udmVudGlvbmFsL0wwMV9hdXRfYmFycmllcl8wMi5saFwiXTtcclxuICAgICAgICB0aGlzLl9Mb2FkKHJlc291cmNlMkRBcnIscmVzb3VyY2UzREFycik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBfTG9hZChhcnIyRDpBcnJheTxhbnk+ID0gbnVsbCxhcnIzRDpBcnJheTxhbnk+PW51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXJyMkQhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIC8vIExheWEubG9hZGVyLmxvYWQoYXJyMkQsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX29uTG9hZGVkKSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fb24yRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIubG9hZChhcnIyRCxudWxsLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9vbjJEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgIHRoaXMuX0NvdW50VmFsdWUrPTAuNTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQyRExvYWQgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhcnIzRCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmNyZWF0ZShhcnIzRCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsbnVsbCksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX29uM0RQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICB0aGlzLl9Db3VudFZhbHVlKz0wLjU7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50M0RMb2FkID0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX29uRXJyb3Ioc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Mb2FkRmFpbGUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJMb2FkRXJyb3I6XCIrc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX29uM0RQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9Db3VudDNETG9hZCA9dmFsdWUvMjtcclxuICAgICAgICB0aGlzLlVJLlZhbHVlID0gKHRoaXMuX0NvdW50MkRMb2FkICsgdGhpcy5fQ291bnQzRExvYWQpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9vbjJEUHJvZ3Jlc3ModmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQ291bnQyRExvYWQgPXZhbHVlLzI7XHJcbiAgICAgICAgdGhpcy5VSS5WYWx1ZSA9IHRoaXMuX0NvdW50MkRMb2FkICsgdGhpcy5fQ291bnQzRExvYWQ7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX29uQ29tcGxldGUoZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGhpRGlyID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5VSS5SZWxvYWQoZnVuY3Rpb24oKTp2b2lke3RoaURpci5Mb2FkKCl9ICk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQkcgPSBuZXcgQkcoKTtcclxuICAgICAgICAgICAgdGhpcy5VSS5Db21wbGV0ZSgoKT0+e0d1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgdGhpcy5VSS5VcGRhdGUoKTtcclxuICAgIH1cclxufSovIiwiaW1wb3J0IHsgRlNNIH0gZnJvbSBcIi4vLi4vQmFzZS9GU01cIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuZXhwb3J0IG1vZHVsZSBTY2VuZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgU2NlbmVGU00gZXh0ZW5kcyBGU00uRlNNPEJhc2VTY2VuZT5cclxuICAgIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lnLrmma/ku6PnkIZcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmUgZXh0ZW5kcyBGU00uU3RhdGUge1xyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0R2FtZVRpbWU6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENsb2NrOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBtX1NjZW5lT2JqOiBMYXlhLlNjZW5lM0Q7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fRGlyZWN0b3I6IEJhc2VEaXJlY3RvcjtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBTY2VuZU9iaigpOiBMYXlhLlNjZW5lM0Qge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX1NjZW5lT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IERpcmVjdG9yKCk6IEJhc2VEaXJlY3RvciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fRGlyZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgR2VuRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHV0T2JqKHNwcml0ZTNEOiBMYXlhLlNwcml0ZTNEKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fU2NlbmVPYmopIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9TY2VuZU9iai5hZGRDaGlsZChzcHJpdGUzRCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJhc2VTY2VuZSBQdXRPYmogRXJyb3I6ZW1wdHkgU3ByaXRlM0RcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yID0gdGhpcy5HZW5EaXJlY3RvcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fRGlyZWN0b3IuU3RhcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNjZW5lT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNjZW5lT2JqLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLlNjZW5lT2JqLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdG9yID0gdGhpcy5TY2VuZU9iai5nZXRDaGlsZEF0KDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkRpcmVjdG9yLkVuZCgpO1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0RpcmVjdG9yKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yLlVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VEaXJlY3RvciBleHRlbmRzIEZTTS5GU008QmFzZVNjZW5lUGxheWU+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfU3RhcnRHYW1lVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ2xvY2s6IG51bWJlcjtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgLy/np4HmnInlsZ7mgKflkozlip/og71cclxuICAgICAgICBnZXQgR2FtZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RpbWVVcENsb2NrID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1RpbWVVcENsb2NrIC0gdGhpcy5fU3RhcnRHYW1lVGltZSAtIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5fU3RhcnRHYW1lVGltZSAtIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBHYW1lVGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IEN1ckdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9TdGFydEdhbWVUaW1lICsgdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmVTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5TdGFydFRpbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydFRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBTdGFydCgpOiB2b2lkIDtcclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IEVuZCgpOiB2b2lkO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGltZVVwKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGltZVVwQ2xvY2sgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lVGltZVVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5VcGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIENvbnRpbnVlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lQ29udGludWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCArPSBMYXlhLnRpbWVyLmN1cnJUaW1lciAtIHRoaXMuX1RpbWVVcENsb2NrO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliIfmjaLliafmnKxcclxuICAgICAgICAgKiBAcGFyYW0gbmV3U2NlbmVQbGF5IOaWsOWJp+acrFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBDaGFuZ2VHYW1lUGxheSggbmV3U2NlbmVQbGF5OkJhc2VTY2VuZVBsYXllICk6IHZvaWQgIHtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VTdGF0ZShuZXdTY2VuZVBsYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNjZW5lUGxheWUgZXh0ZW5kcyBGU00uU3RhdGUge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2UgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTG9hZFNjZW5lTG9naWMgZXh0ZW5kcyBCYXNlU2NlbmVQbGF5ZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0xvYWQyRExpc3Q6IGFueVtdO1xyXG4gICAgICAgIHByaXZhdGUgbV9Mb2FkM0RMaXN0OiBhbnlbXTtcclxuICAgICAgICBwcml2YXRlIG1fTmV4dFNjZW5lOiBTY2VuZS5CYXNlU2NlbmVQbGF5ZTtcclxuICAgICAgICBwdWJsaWMgZ2V0IE93bmVyRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9vd25lciBhcyBCYXNlRGlyZWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBsb2FkMkRMaXN0IDJE5Yqg6L295YiX6KGoXHJcbiAgICAgICAgICogQHBhcmFtIGxvYWQzRExpc3QgM0TliqDovb3liJfooahcclxuICAgICAgICAgKiBAcGFyYW0gbmV4dFNjZW5lIOS4i+S4gOagvOWcuuaZr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGxvYWQyRExpc3Q6IGFueVtdLCBsb2FkM0RMaXN0OiBhbnlbXSwgbmV4dFNjZW5lOiBTY2VuZS5CYXNlU2NlbmVQbGF5ZSkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZDJETGlzdCA9IGxvYWQyRExpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkM0RMaXN0ID0gbG9hZDNETGlzdDtcclxuICAgICAgICAgICAgdGhpcy5tX05leHRTY2VuZSA9IG5leHRTY2VuZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVuZCgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLm9uY2UoTGF5YS5FdmVudC5DT01QTEVURSwgdGhpcywgdGhpcy5Mb2FkQ29tcGxldGUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0xvYWQyRExpc3QpXHJcbiAgICAgICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMubV9Mb2FkMkRMaXN0LCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9Mb2FkM0RMaXN0KVxyXG4gICAgICAgICAgICAgICAgTGF5YS5sb2FkZXIubG9hZCh0aGlzLm1fTG9hZDNETGlzdCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExvYWRDb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5Pd25lckRpcmVjdG9yLkNoYW5nZVN0YXRlKHRoaXMubV9OZXh0U2NlbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLy4uLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi8uLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuLy4uL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEVuZEdhbWVVSSBmcm9tIFwiLi8uLi8uLi91aS9FbmRHYW1lVUlcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBHYW1lQ2FtZXJhIGZyb20gXCIuLy4uLy4uL0dhbWUvR2FtZUNhbWVyYVwiXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vLi4vLi4vR2FtZS9QbGF5ZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuLy4uLy4uL0dhbWUvSW5wdXRcIlxyXG5pbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi8uLi8uLi91aS9HYW1lVUlcIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuLy4uLy4uL0dhbWUvTW91bnRMaW5lXCJcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLy4uLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEJHVUkgZnJvbSBcIi4vLi4vLi4vdWkvQkdcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4uL0dhbWVTY2VuZVwiO1xyXG5cclxudHlwZSBJdGVtTGF5b3V0ID0gSXRlbS5JdGVtTGF5b3V0O1xyXG50eXBlIExpbmVJdGVtSW5mbyA9IEl0ZW0uTGluZUl0ZW1JbmZvO1xyXG52YXIgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG5cclxuLy/muLjmiI/lr7zmvJRcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lUGxheSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllIHtcclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcml2YXRlIF9IZWFkRmxvb3JJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX1RhaWxGTG9vcklkeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQ291bnRUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Cb290b21GbG9vcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfU3RhcnRQb3NpdGlvbjogTGF5YS5WZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSBfR2FtZVVwZGF0ZTogKCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgX1BhbmVsVUk6IEdhbWVVSTtcclxuICAgIHByaXZhdGUgX0dvbGROdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0xvZ2ljR29sZE51bTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQ3VyQkc6IEJHVUk7XHJcbiAgICBwcml2YXRlIF9TYWZlTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG5cclxuICAgIENhbWVyYTogR2FtZUNhbWVyYTtcclxuICAgIEdhbWVTY2VuZTogQmFzZVNjZW5lO1xyXG4gICAgTW91bnRMaW5lczogTW91bnRMaW5lW107XHJcbiAgICBQbGF5ZXI6IFBsYXllcjtcclxuICAgIElucHV0Q3RybDogSW5wdXQuQmFzZUdhbWVJbnB1dDtcclxuICAgIEl0ZW1MYXlvdXQ6IEl0ZW1MYXlvdXQ7XHJcbiAgICBDdXJMaW5lUmV3YXJkczogQXJyYXk8TGluZUl0ZW1JbmZvPjtcclxuICAgIEN1ckxpbmVCYXJyaWVyczogQXJyYXk8TGluZUl0ZW1JbmZvPjtcclxuICAgIG5hbWU6IG51bWJlcjtcclxuICAgIEZyZXNoQkdDb3VudDogbnVtYmVyO1xyXG5cclxuICAgIGdldCBTYWZlTG9jYXRpb24oKTogR2FtZVN0cnVjdC5NTG9jYXRpb24gIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU2FmZUxvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBhbmVsVUkoKTogR2FtZVVJICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1BhbmVsVUk7XHJcbiAgICB9XHJcbiAgICBzZXQgUGFuZWxVSSh2YWx1ZTogR2FtZVVJKSAge1xyXG4gICAgICAgIHZhbHVlLlNldExlZnRUb3VjaCh0aGlzLCAoKSA9PiB7IHRoaXMuSW5wdXRDdHJsLklucHV0KGZhbHNlKTsgfSlcclxuICAgICAgICB2YWx1ZS5TZXRSaWdodFRvdWNoKHRoaXMsICgpID0+IHsgdGhpcy5JbnB1dEN0cmwuSW5wdXQodHJ1ZSk7IH0pO1xyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBIZWFkRmxvb3IoKTogTW91bnRMaW5lICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTW91bnRMaW5lc1t0aGlzLl9IZWFkRmxvb3JJZHhdO1xyXG4gICAgfVxyXG4gICAgZ2V0IFRhaWxGTG9vcigpOiBNb3VudExpbmUgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb3VudExpbmVzW3RoaXMuX1RhaWxGTG9vcklkeF07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuR2FtZVNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLk1vdW50TGluZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5JdGVtTGF5b3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yID0gMDtcclxuICAgICAgICB0aGlzLl9TdGFydFBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0N1ckJHID0gQVBQLlNjZW5lTWFuYWdlci5CRyBhcyBCR1VJO1xyXG4gICAgICAgIHRoaXMuRnJlc2hCR0NvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBBZGRJbnB1dEN0cmxlcih2YWx1ZTogSW5wdXQuQmFzZUdhbWVJbnB1dCkgIHtcclxuICAgICAgICB0aGlzLklucHV0Q3RybC5DbGVhcigpO1xyXG4gICAgICAgIHZhbHVlLk5leHRJbnB1dCA9IHRoaXMuSW5wdXRDdHJsO1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBQb3BJbnB1dEN0cmxlcigpICB7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSB0aGlzLklucHV0Q3RybC5OZXh0SW5wdXQ7XHJcbiAgICB9XHJcbiAgICBBZGRHb2xkKG51bTogbnVtYmVyKSAge1xyXG4gICAgICAgIHRoaXMuX0dvbGROdW0gKz0gbnVtO1xyXG4gICAgICAgIHRoaXMuQWRkTG9naWNHb2xkKG51bSk7XHJcbiAgICB9XHJcbiAgICBBZGRHb2xkVW5Mb2dpY0dvbGQobnVtOiBudW1iZXIpICB7XHJcbiAgICAgICAgdGhpcy5fR29sZE51bSArPSBudW07XHJcbiAgICB9XHJcbiAgICBBZGRMb2dpY0dvbGQobnVtOiBudW1iZXIpICB7XHJcblxyXG4gICAgICAgIHRoaXMuX0xvZ2ljR29sZE51bSArPSBudW07XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkdvbGQgPSB0aGlzLl9Mb2dpY0dvbGROdW07XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7lronlhajkvY3nva5cclxuICAgIFNldFNhZmVQUyhsb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb24pICB7XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uLlkgPCB0aGlzLlRhaWxGTG9vci5GbG9vck51bSB8fCBsb2NhdGlvbi5ZID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5SZXNldEl0ZW0obG9jYXRpb24uWSlcclxuICAgIH1cclxuXHJcbiAgICAvL+S7juafkOS4gOWxguW8gOWni+S4gOWxguWxgumHjeaWsOaRhuaUvumBk+WFt1xyXG4gICAgUmVzZXRJdGVtKGZsb29yOiBudW1iZXIpICB7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIGZvciAobGV0IGxvb3BGbG9vcjogbnVtYmVyID0gZmxvb3I7IGxvb3BGbG9vciA8PSB0aGlzLkhlYWRGbG9vci5GbG9vck51bTsgKytsb29wRmxvb3IpICB7XHJcbiAgICAgICAgICAgIHZhciBmbG9vckxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb29wRmxvb3IpO1xyXG4gICAgICAgICAgICBmbG9vckxpbmUuTGF5T3V0RGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgZmxvb3JMaW5lLlNldExpbmUoZmxvb3JMaW5lLkZsb29yTnVtKTtcclxuICAgICAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShsb29wRmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+a4heeQhuWxgumBk+WFt1xyXG4gICAgQ2xlYXJGbG9vcihzdGVwOiBTdGVwKTogdm9pZCAge1xyXG4gICAgICAgIHZhciBzdGVwSXRlbSA9IHN0ZXAuU3RlcEl0ZW07XHJcbiAgICAgICAgc3RlcC5QdXRJdGVtKEl0ZW1UeXBlLk5vbmUpO1xyXG4gICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIERlYXRoKCk6IHZvaWQgIHtcclxuICAgICAgICB2YXIgdWk6IEVuZEdhbWVVSSA9IEFQUC5VSU1hbmFnZXIuU2hvdzxFbmRHYW1lVUk+KEVuZEdhbWVVSSk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUGxheWVyRGVhdGggPSB0cnVlO1xyXG4gICAgICAgIC8vdWkuU2V0R2FtZUluZm8odGhpcy5QbGF5ZXJEaXN0YW5jZSx0aGlzLl9Hb2xkTnVtKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgRW5kKCk6dm9pZFxyXG4gICAge1xyXG5cclxuICAgIH1cclxuICAgIC8v6YeN5paw5byA5aeLXHJcbiAgICBSZVN0YXJ0KCk6IHZvaWQgIHtcclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG4gICAgU2hvd0lucHV0SW5mbyhpbmZvOiBzdHJpbmcpOiB2b2lkICB7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICB9XHJcbiAgICAvL+W3puWPs+enu+WKqFxyXG4gICAgTW92ZVN0ZXAoaXNSaWdodDogYm9vbGVhbikgIHtcclxuICAgICAgICAvL3ZhciBidWZmID0gdGhpcy5CdWZmZXI7XHJcbiAgICAgICAgLy/ojrflj5bkuIvkuIDlsYLnmoRTdGVwXHJcbiAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSB0aGlzLlBsYXllci5DdXJTdGVwO1xyXG4gICAgICAgIGlmIChzdGVwID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzUmlnaHQpICB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgIH0gZWxzZSAge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0ZXAgPT0gbnVsbCB8fCBzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lsYLmlbDojrflj5bmn5DlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgR2V0Rmxvb3JCeUZsb29yKGZsb29yOiBudW1iZXIpICB7XHJcbiAgICAgICAgdmFyIHRhaWxGbG9vcjogTW91bnRMaW5lID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGFpbEZsb29yLkZsb29yTnVtKSAge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29ySUQgPSAoZmxvb3IgLSB0YWlsRmxvb3IuRmxvb3JOdW0gKyB0aGlzLl9UYWlsRkxvb3JJZHgpICUgdGhpcy5Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb3VudExpbmVzW2Zsb29ySURdO1xyXG4gICAgfVxyXG5cclxuICAgIExvb3BEb0Zsb29yU3RlcChmbG9vcjogbnVtYmVyLCBPd25lcjogYW55LCBjYWxsQmFjazogKHN0ZXA6IFN0ZXApID0+IHZvaWQpOiB2b2lkICB7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGhpcy5UYWlsRkxvb3IuRmxvb3JOdW0gfHwgZmxvb3IgPiB0aGlzLkhlYWRGbG9vci5GbG9vck51bSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3JMaW5lOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZmxvb3JMaW5lLkxvZ2ljTGVuZ3RoOyArK2lkeCkgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vckxpbmUuR2V0U3RlcChpZHgpO1xyXG4gICAgICAgICAgICBjYWxsQmFjay5jYWxsKE93bmVyLCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4flnZDmoIfojrflj5blj7DpmLZcclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiDntKLlvJUs5bGC5pWwXHJcbiAgICAgKi9cclxuICAgIEdldFN0ZXBCeUxvY2F0aW9uKGxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbik6IFN0ZXAgIHtcclxuICAgICAgICB2YXIgZ2V0U3RlcDogU3RlcCA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGxvY2F0aW9uLlkpLkdldFN0ZXAobG9jYXRpb24uWCk7XHJcbiAgICAgICAgcmV0dXJuIGdldFN0ZXA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFBsYXllckZsb29yKCk6IG51bWJlciAge1xyXG4gICAgICAgIHZhciBmbG9vcjogbnVtYmVyID0gdGhpcy5fU3RhcnRQb3NpdGlvbi56IC0gdGhpcy5QbGF5ZXIuTG9naWNQb3NpdGlvbi56O1xyXG4gICAgICAgIGZsb29yID0gTWF0aC5yb3VuZChmbG9vciAvIChDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UgLyAyKSk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGZsb29yKTtcclxuICAgIH1cclxuICAgIGdldCBQbGF5ZXJGbG9vckxpbmUoKTogTW91bnRMaW5lICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0Rmxvb3JCeUZsb29yKHRoaXMuUGxheWVyRmxvb3IpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEdhbWVUaW1lKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm1fb3duZXIgYXMgR2FtZURpcmVjdG9yKS5HYW1lVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8v5Yib5bu655u45YWz5pS+6L+ZIOi/memHjOmHjeaWsOW8gOWni+S4jeS8mui1sFxyXG4gICAgcHVibGljIFN0YXJ0KCk6IHZvaWQgIHtcclxuICAgICAgICB0aGlzLkNhbWVyYSA9IG5ldyBHYW1lQ2FtZXJhKCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEudHJhbnNmb3JtLmxvY2FsUm90YXRpb25FdWxlciA9IG5ldyBMYXlhLlZlY3RvcjMoLTMwLCAwLCAwKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLkNhbWVyYSk7XHJcblxyXG4gICAgICAgIHRoaXMuTW91bnRMaW5lcyA9IFtdO1xyXG4gICAgICAgIHZhciBtYXhMaW5lTnVtID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTWF4TGluZU51bTtcclxuICAgICAgICBmb3IgKHZhciBsaW5lSWR4OiBudW1iZXIgPSBtYXhMaW5lTnVtIC0gMTsgbGluZUlkeCA+PSAwOyAtLWxpbmVJZHgpICB7XHJcbiAgICAgICAgICAgIHZhciBuZXdNb3VudExpbmUgPSBuZXcgTW91bnRMaW5lKGxpbmVJZHgsIGxpbmVJZHgpO1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaihuZXdNb3VudExpbmUpO1xyXG4gICAgICAgICAgICB0aGlzLk1vdW50TGluZXNbbGluZUlkeF0gPSBuZXdNb3VudExpbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yib5bu6VUlcclxuXHJcbiAgICAgICAgLy/liJvlu7rnjqnlrrZcclxuICAgICAgICB0aGlzLlBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLlBsYXllcik7XHJcblxyXG4gICAgICAgIC8v5YeG5aSH546p5a625q275Lqh5LqL5Lu2XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoLCB0aGlzLkRlYXRoLCB0aGlzKTtcclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+i/m+WFpea4uOaIj+eahOiuvue9ruaUvui/memHjCDph43mlrDlvIDlp4votbDov5nph4xcclxuICAgIHByb3RlY3RlZCBTdGFydEdhbWUoKSAge1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuU2NlbmVPYmouYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLDEsMSlcclxuICAgICAgICB0aGlzLl9TYWZlTG9jYXRpb24gPSBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24oMCwgMCk7XHJcbiAgICAgICAgLy/ph43nva7nianlk4FcclxuICAgICAgICB0aGlzLkl0ZW1MYXlvdXQgPSBuZXcgSXRlbS5JdGVtTGF5b3V0KClcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdmFyIGxpbmVzOiBNb3VudExpbmVbXSA9IHRoaXMuTW91bnRMaW5lcztcclxuICAgICAgICAvL+WIm+W7uui+k+WFpeaOp+WItuWZqFxyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gbmV3IElucHV0Lk5vcm1HYW1lSW5wdXQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fSGVhZEZsb29ySWR4ID0gbGluZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLl9UYWlsRkxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlJlc2V0KCk7XHJcbiAgICAgICAgZm9yICh2YXIgaWR4OiBudW1iZXIgPSAwOyBpZHggPCBsaW5lcy5sZW5ndGg7ICsraWR4KSAge1xyXG4gICAgICAgICAgICB2YXIgbGluZTogTW91bnRMaW5lID0gdGhpcy5Nb3VudExpbmVzW2lkeF07XHJcbiAgICAgICAgICAgIGxpbmUuU2V0TGluZShpZHgpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ID4gMClcclxuICAgICAgICAgICAgICAgIGxpbmVzW2lkeCAtIDFdLlNldE5leHRGbG9vcihsaW5lKTtcclxuICAgICAgICAgICAgZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIFBsYXllclN0ZXAgPSBsaW5lLkdldFN0ZXAoTWF0aC5mbG9vcihsaW5lLkxvZ2ljTGVuZ3RoIC8gMikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuU2V0U3RlcChQbGF5ZXJTdGVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1NhZmVMb2NhdGlvbiA9IFBsYXllclN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TdGFydFBvc2l0aW9uID0gdGhpcy5QbGF5ZXIuTG9naWNQb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1B1dEl0ZW1JbkxpbmUoaWR4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuUmVzZXQobmV3IExheWEuVmVjdG9yMygpLCBuZXcgTGF5YS5WZWN0b3IzKHRoaXMuUGxheWVyLlBvc2l0aW9uLngsIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGggKiAxMC41LCBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoICogOSksIHRoaXMuUGxheWVyKTtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtID0gMDtcclxuICAgICAgICB0aGlzLl9Mb2dpY0dvbGROdW0gPSAwO1xyXG5cclxuICAgICAgICB0aGlzLlBhbmVsVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3coR2FtZVVJKTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuR29sZCA9IDA7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gdGhpcy5HYW1lVGltZSArIDYwMDA7XHJcbiAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgPSAwO1xyXG4gICAgICAgIHRoaXMuX0dhbWVVcGRhdGUgPSB0aGlzLl9TdGFydENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCAge1xyXG4gICAgICAgIGlmICh0aGlzLl9HYW1lVXBkYXRlICE9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0dhbWVVcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mraPluLjov5DooYzml7bnmoTmr4/luKfpgLvovpFcclxuICAgIHByaXZhdGUgX1J1bkdhbWVVcGRhdGUoKSAge1xyXG4gICAgICAgIHZhciBkaXN0OiBudW1iZXIgPSB0aGlzLlBsYXllckZsb29yO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5EaXN0YW5jZSA9IE1hdGguZmxvb3IoZGlzdCk7XHJcbiAgICAgICAgaWYgKHRoaXMuRnJlc2hCR0NvdW50ID4gMTApICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0N1ckJHLlVwZGF0ZVBhZ2UoZGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuRnJlc2hCR0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgKyt0aGlzLkZyZXNoQkdDb3VudDtcclxuXHJcbiAgICAgICAgdmFyIGZsb29WZWN0b3I6IExheWEuVmVjdG9yMyA9IHRoaXMuVGFpbEZMb29yLlBvc2l0aW9uO1xyXG5cclxuICAgICAgICBpZiAoZmxvb1ZlY3Rvci56IC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24ueiA+IDMgKiBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UgLyAyKSAge1xyXG4gICAgICAgICAgICB0aGlzLl9QdXNoRkxvb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX0NvdW50VGltZSA8IHRoaXMuR2FtZVRpbWUpICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUgKyAzMDAwO1xyXG4gICAgICAgICAgICB0aGlzLl9EZXN0cm95TGluZSh0aGlzLl9Cb290b21GbG9vcik7XHJcbiAgICAgICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5YCS6K6h5pe25pyf6Ze055qE5q+P5bin6YC76L6RXHJcbiAgICBwcml2YXRlIF9TdGFydENvdW50KCkgIHtcclxuICAgICAgICB2YXIgdGltZTogc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIHZhciBjb3VudFRpbWU6IG51bWJlciA9IHRoaXMuX0NvdW50VGltZSAtIHRoaXMuR2FtZVRpbWU7XHJcbiAgICAgICAgaWYgKGNvdW50VGltZSA+IDApXHJcbiAgICAgICAgICAgIHRpbWUgKz0gTWF0aC5mbG9vcihjb3VudFRpbWUgLyAxMDAwKTtcclxuICAgICAgICBlbHNlICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0dhbWVVcGRhdGUgPSB0aGlzLl9SdW5HYW1lVXBkYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSB0aGlzLkdhbWVUaW1lICsgMzAwMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlNldENvdW50VGltZSh0aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WwhuWxguWQkeS4iuWPoFxyXG4gICAgcHJvdGVjdGVkIF9QdXNoRkxvb3IoKSAge1xyXG4gICAgICAgIHZhciBwcmVIZWFkOiBNb3VudExpbmUgPSB0aGlzLkhlYWRGbG9vcjtcclxuICAgICAgICB0aGlzLl9IZWFkRmxvb3JJZHggPSAodGhpcy5fSGVhZEZsb29ySWR4ICsgMSkgJSB0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuX1RhaWxGTG9vcklkeCA9ICh0aGlzLl9UYWlsRkxvb3JJZHggKyAxKSAlIHRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIEhlYWRmbG9vcjogbnVtYmVyID0gcHJlSGVhZC5GbG9vck51bSArIDE7XHJcbiAgICAgICAgdGhpcy5IZWFkRmxvb3IuU2V0TGluZShIZWFkZmxvb3IpO1xyXG4gICAgICAgIHByZUhlYWQuU2V0TmV4dEZsb29yKHRoaXMuSGVhZEZsb29yKTtcclxuICAgICAgICBjb25zb2xlLnRpbWUoXCJQdXRJdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuX1B1dEl0ZW1JbkxpbmUoSGVhZGZsb29yKTtcclxuICAgICAgICBjb25zb2xlLnRpbWVFbmQoXCJQdXRJdGVtXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRhuaUvueJqeWTgVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIOeJqeWTgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgX1B1dEl0ZW1JbkxpbmUoZmxvb3I6IG51bWJlcikgIHtcclxuICAgICAgICB2YXIgc2FmZUNvbDogeyBba2V5OiBzdHJpbmddOiBBcnJheTxudW1iZXI+OyB9ID0ge307XHJcbiAgICAgICAgdmFyIGZsb29yTGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICAvL+W4g+e9rui/h+S6huS4jeeUqOWGjeW4g+e9ruS6hlxyXG4gICAgICAgIGlmIChmbG9vckxpbmUuTGF5T3V0RGlydHkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBmbG9vckxpbmUuTGF5T3V0RGlydHkgPSB0cnVlO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgaWYoZmxvb3IgPj0gdGhpcy5fU2FmZUxvY2F0aW9uLlkgKyBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5NYXhMaW5lTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2FmZUNvbCA9IHRoaXMuX0NvdW50T3Blbkxpc3QoZmxvb3IpO1xyXG4gICAgICAgIH1lbHNlKi9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5pGG5pS+5YmN5YWI6K6h566X6K+l5bGC6YCa6Lev5oOF5Ya1IFxyXG4gICAgICAgICAgICBzYWZlQ29sID0ge31cclxuICAgICAgICAgICAgc2FmZUNvbFtcIm9cIl0gPSB0aGlzLl9Db3VudFJvYWRJbmZvKGZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lh7rnlJ/ngrnkuI3mlL7pgZPlhbdcclxuICAgICAgICBpZiAoZmxvb3IgPCAxIHx8IGZsb29yID09IHRoaXMuU2FmZUxvY2F0aW9uLlkpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ojrflj5bor6XooYzopoHmkYbmlL7nmoTnianlk4FcclxuICAgICAgICB0aGlzLl9UYWtlSXRlbUxpc3QoZmxvb3IpXHJcblxyXG4gICAgICAgIC8v5qCH6K6w5LiA5p2h57ud5a+55a6J5YWo55qE6LevXHJcbiAgICAgICAgdmFyIHNhZmVJZHhDb2xsOiB7IFtrZXk6IHN0cmluZ106IG51bWJlcjsgfSA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGNvbEtleSBpbiBzYWZlQ29sKSAge1xyXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHNhZmVDb2xbY29sS2V5XTtcclxuICAgICAgICAgICAgdmFyIHNhZmVJZHggPSBsaXN0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpc3QubGVuZ3RoKV07XHJcbiAgICAgICAgICAgIGlmIChzYWZlSWR4Q29sbFtzYWZlSWR4XSA9PSB1bmRlZmluZWQpICB7XHJcbiAgICAgICAgICAgICAgICBzYWZlSWR4Q29sbFtzYWZlSWR4XSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/miorpnIDopoHmlL7pgZPlhbfnmoTmoLzlrZDmlL7lhaXpmo/mnLrmsaBcclxuICAgICAgICB2YXIgY3VyRmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICB2YXIgcmFuZG9tUG9vbDogQXJyYXk8U3RlcD4gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAvL+aKiuWuieWFqOeahOagvOWtkOaaguaXtuenu+WHuuadpVxyXG4gICAgICAgIHZhciBzYWZlU3RlcExpc3Q6IEFycmF5PFN0ZXA+ID0gbmV3IEFycmF5PFN0ZXA+KCk7XHJcbiAgICAgICAgZm9yICh2YXIgc3RlcElkeDogbnVtYmVyID0gMDsgc3RlcElkeCA8IGN1ckZsb29yLkxvZ2ljTGVuZ3RoOyArK3N0ZXBJZHgpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRTdGVwOiBTdGVwID0gY3VyRmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKHNhZmVJZHhDb2xsW3N0ZXBJZHhdID09IHVuZGVmaW5lZCkgIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBvb2wucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfSBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aUvumZt+mYsVxyXG4gICAgICAgIHZhciBiYXJyaWVyc0xpc3Q6IEFycmF5PExpbmVJdGVtSW5mbz4gPSB0aGlzLkN1ckxpbmVCYXJyaWVycztcclxuICAgICAgICB0aGlzLl9Pcmdpbml6ZVB1dEl0ZW0oYmFycmllcnNMaXN0LCByYW5kb21Qb29sLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy/mkYbmlL7pgZPlhbdcclxuICAgICAgICBmb3IgKHZhciBzYWZlU3RlcElkeDogbnVtYmVyID0gMDsgc2FmZVN0ZXBJZHggPCBzYWZlU3RlcExpc3QubGVuZ3RoOyArK3NhZmVTdGVwSWR4KSAge1xyXG4gICAgICAgICAgICByYW5kb21Qb29sLnB1c2goc2FmZVN0ZXBMaXN0W3NhZmVTdGVwSWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXdhcmRMaXN0ID0gdGhpcy5DdXJMaW5lUmV3YXJkcztcclxuICAgICAgICB0aGlzLl9Pcmdpbml6ZVB1dEl0ZW0ocmV3YXJkTGlzdCwgcmFuZG9tUG9vbCk7XHJcbiAgICAgICAgLy/lho3mrKHorqHnrpfpgJrot6/mg4XlhrUgXHJcbiAgICAgICAgLy90aGlzLl9Db3VudExhc3RGbG9vclJvYWQoZmxvb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pGG5pS+54mp5ZOBXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PExpbmVJdGVtSW5mbz59IGl0ZW1MaXN0IOeJqeWTgeWIl+ihqFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTdGVwPn0gcmFuZG9tUG9vbCDlj7DpmLbpm4blkIhcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEZWFkUm9hZCDmmK/lkKbmmK/mrbvot69cclxuICAgICAqL1xyXG4gICAgX09yZ2luaXplUHV0SXRlbShpdGVtTGlzdDogQXJyYXk8TGluZUl0ZW1JbmZvPiwgcmFuZG9tUG9vbDogQXJyYXk8U3RlcD4sIGlzRGVhZFJvYWQ6IGJvb2xlYW4gPSBudWxsKTogdm9pZCAge1xyXG4gICAgICAgIGZvciAodmFyIGl0ZW1JZHg6IG51bWJlciA9IDA7IGl0ZW1JZHggPCBpdGVtTGlzdC5sZW5ndGg7ICsraXRlbUlkeCkgIHtcclxuICAgICAgICAgICAgdmFyIGluZm86IExpbmVJdGVtSW5mbyA9IGl0ZW1MaXN0W2l0ZW1JZHhdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkaWZmaWN1bHR5TnVtOiBudW1iZXIgPSAwOyBkaWZmaWN1bHR5TnVtIDwgaW5mby5OdW1iZXI7KSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJhbmRvbVBvb2wubGVuZ3RoIDwgMSkgIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v6ZqP5py65oqK6Zqc56KN5pS+5YWl5qC85a2Q6YeMXHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tSWR4OiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYW5kb21Qb29sLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHJhbmRvbVBvb2xbcmFuZG9tSWR4XTtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBvb2wuc3BsaWNlKHJhbmRvbUlkeCwgMSk7XHJcbiAgICAgICAgICAgICAgICBzdGVwLlB1dEl0ZW0oaW5mby5UeXBlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0RlYWRSb2FkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gaXNEZWFkUm9hZDtcclxuICAgICAgICAgICAgICAgIC0taW5mby5OdW1iZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJhbmRvbVBvb2wubGVuZ3RoIDwgMSkgIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtSWR4ID4gMCkgIHtcclxuICAgICAgICAgICAgaXRlbUxpc3Quc3BsaWNlKDAsIGl0ZW1JZHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAq6YCS5b2S6K6h566X6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3JOdW0g54mp5ZOB5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIF9Db3VudE9wZW5MaXN0KGZsb29yTnVtOiBudW1iZXIpOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PG51bWJlcj47IH0gIHtcclxuICAgICAgICBmb3IgKHZhciBmbG9vckNvdW50OiBudW1iZXIgPSB0aGlzLlBsYXllckZsb29yOyBmbG9vckNvdW50IDw9IGZsb29yTnVtOyArK2Zsb29yQ291bnQpICB7XHJcbiAgICAgICAgICAgIHZhciBmbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JDb3VudCk7XHJcbiAgICAgICAgICAgIGlmIChmbG9vciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzdGVwSWR4ID0gMDsgc3RlcElkeCA8IGZsb29yLkxvZ2ljTGVuZ3RoOyArK3N0ZXBJZHgpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcCA9IGZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgICAgICBzdGVwLk1hcmsgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLlBsYXllckZsb29yKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4ID0gMDsgc3RlcElkeCA8IGZsb29yLkxvZ2ljTGVuZ3RoOyArK3N0ZXBJZHgpICB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9NYXJrU3RlcHMoc3RlcCwgc3RlcElkeCwgZmxvb3JOdW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0YXJnZXRGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JOdW0pO1xyXG4gICAgICAgIC8v5om+5Ye66KKr5qCH6K6w55qE54K55bm25pW055CG5oiQ6ZuG5ZCIXHJcbiAgICAgICAgdmFyIGNvbGxlY3Rpb246IHsgW2tleTogc3RyaW5nXTogQXJyYXk8bnVtYmVyPjsgfSA9IHt9XHJcbiAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IFwib1wiXHJcbiAgICAgICAgZm9yICh2YXIgb3BlbklkeDogbnVtYmVyID0gMDsgb3BlbklkeCA8IHRhcmdldEZsb29yLkxvZ2ljTGVuZ3RoOyArK29wZW5JZHgpICB7XHJcbiAgICAgICAgICAgIHZhciBtYXJrZWRTdGVwOiBTdGVwID0gdGFyZ2V0Rmxvb3IuR2V0U3RlcChvcGVuSWR4KTtcclxuICAgICAgICAgICAgaWYgKG1hcmtlZFN0ZXAuTWFyayAhPSB1bmRlZmluZWQpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgTmFtZTogc3RyaW5nID0gbmFtZSArIG1hcmtlZFN0ZXAuTWFyaztcclxuICAgICAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uW05hbWVdID09IHVuZGVmaW5lZCkgIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uW05hbWVdID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbltOYW1lXS5wdXNoKG9wZW5JZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKumAkuW9kuagh+iusOmAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtTdGVwfSBzdGVwIOWPsOmYtlxyXG4gICAgICogQHBhcmFtIHthbnl9IG1hcmsg5qCH6K6wXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0Rmxvb3JOdW0g55uu5qCH5bGC5pWwXHJcbiAgICAgKi9cclxuICAgIF9NYXJrU3RlcHMoc3RlcDogU3RlcCwgbWFyazogYW55LCB0YXJnZXRGbG9vck51bTogbnVtYmVyKTogYm9vbGVhbiAge1xyXG4gICAgICAgIGlmIChzdGVwLklzRGVhZFJvYWQpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoc3RlcC5GbG9vci5GbG9vck51bSA+PSB0YXJnZXRGbG9vck51bSkgIHtcclxuICAgICAgICAgICAgaWYgKHN0ZXAuTWFyayA9PSB1bmRlZmluZWQpICB7XHJcbiAgICAgICAgICAgICAgICBzdGVwLk1hcmsgPSBtYXJrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsZWZ0T3BlbjogYm9vbGVhbjtcclxuICAgICAgICB2YXIgcmlnaHRPcGVuOiBib29sZWFuO1xyXG4gICAgICAgIHZhciBsZWZ0UGFyZW50OiBTdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgIGlmIChsZWZ0UGFyZW50ICE9IG51bGwgJiYgIWxlZnRQYXJlbnQuSXNEZWFkUm9hZCkgIHtcclxuICAgICAgICAgICAgaWYgKGxlZnRQYXJlbnQuTWFyayA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBsZWZ0T3BlbiA9IHRoaXMuX01hcmtTdGVwcyhsZWZ0UGFyZW50LCBtYXJrLCB0YXJnZXRGbG9vck51bSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGxlZnRPcGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJpZ2h0UGFyZW50OiBTdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICBpZiAocmlnaHRQYXJlbnQgIT0gbnVsbCAmJiAhcmlnaHRQYXJlbnQuSXNEZWFkUm9hZCkgIHtcclxuICAgICAgICAgICAgaWYgKHJpZ2h0UGFyZW50Lk1hcmsgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmlnaHRPcGVuID0gdGhpcy5fTWFya1N0ZXBzKHJpZ2h0UGFyZW50LCBtYXJrLCB0YXJnZXRGbG9vck51bSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJpZ2h0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGVwLk1hcmsgPT0gdW5kZWZpbmVkKSAge1xyXG4gICAgICAgICAgICBzdGVwLk1hcmsgPSBtYXJrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbGVmdE9wZW4gJiYgIXJpZ2h0T3BlbikgIHtcclxuICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnIDlkI7lho3orqHnrpfkuIDmrKHor6XlsYLpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vck51bSBcclxuICAgICAqL1xyXG4gICAgX0NvdW50TGFzdEZsb29yUm9hZChmbG9vck51bTogbnVtYmVyKTogdm9pZCAge1xyXG4gICAgICAgIGlmIChmbG9vck51bSA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vciA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yTnVtKTtcclxuICAgICAgICB2YXIgbGFzdEZsb29yID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JOdW0gLSAxKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4ID0gMDsgc3RlcElkeCA8IGZsb29yLkxvZ2ljTGVuZ3RoOyArK3N0ZXBJZHgpICB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgTGVmdFN0ZXAgPSBzdGVwLkxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICAgIHZhciBSaWdodFN0ZXAgPSBzdGVwLlJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoTGVmdFN0ZXAgIT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUxlZnRTdGVwLklzRGVhZFJvYWQpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrTGVmdFN0ZXAuUm9hZE51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoUmlnaHRTdGVwICE9IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFSaWdodFN0ZXAuSXNEZWFkUm9hZCkgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytSaWdodFN0ZXAuUm9hZE51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgbGFzdFN0ZXBJZHggPSAwOyBsYXN0U3RlcElkeCA8IGxhc3RGbG9vci5Mb2dpY0xlbmd0aDsgKytsYXN0U3RlcElkeCkgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQgJiYgc3RlcC5Sb2FkTnVtIDwgMSkgIHtcclxuICAgICAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIC8v5ZCR5LiK6YCS5b2S5oqK5omA5pyJ5LiO5LmL55u46L+e55qE6IqC54K55pWw57uZ5L+u5q2j5LqGXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlL7pgZPlhbfliY3nrpfpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgX0NvdW50Um9hZEluZm8oZmxvb3I6IG51bWJlcik6IEFycmF5PG51bWJlcj4gIHtcclxuICAgICAgICB2YXIgc2FmZVN0ZXBMaXN0OiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICAgICAgdmFyIHRoaXNGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG5cclxuICAgICAgICB2YXIgcm9hZE51bTogbnVtYmVyID0gMDtcclxuICAgICAgICB2YXIgbGFzdEZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vciAtIDEpO1xyXG4gICAgICAgIGlmIChmbG9vciA9PSB0aGlzLl9TYWZlTG9jYXRpb24uWSlcclxuICAgICAgICAgICAgdGhpcy5fUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3IpO1xyXG4gICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgbG9naWNJZHg6IG51bWJlciA9IDA7IGxvZ2ljSWR4IDwgdGhpc0Zsb29yLkxvZ2ljTGVuZ3RoOyArK2xvZ2ljSWR4KSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVmdENoaWxkOiBTdGVwID0gc3RlcC5MZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRDaGlsZDogU3RlcCA9IHN0ZXAuUmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICAgIGlmIChsZWZ0Q2hpbGQgIT0gbnVsbCAmJiAhbGVmdENoaWxkLklzRGVhZFJvYWQpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZVN0ZXBMaXN0LnB1c2gobG9naWNJZHgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyaWdodENoaWxkICE9IG51bGwgJiYgIXJpZ2h0Q2hpbGQuSXNEZWFkUm9hZCkgIHtcclxuICAgICAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmbG9vciA9PSB0aGlzLl9TYWZlTG9jYXRpb24uWSkgIHtcclxuICAgICAgICAgICAgdmFyIHNhZmVTdGVwID0gdGhpc0Zsb29yLkdldFN0ZXAodGhpcy5fU2FmZUxvY2F0aW9uLlgpO1xyXG4gICAgICAgICAgICBzYWZlU3RlcC5Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKHRoaXMuX1NhZmVMb2NhdGlvbi5YKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzYWZlU3RlcExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgX1Jlc2V0U3RlcEluZm8odGhpc0Zsb29yOiBNb3VudExpbmUpICB7XHJcbiAgICAgICAgaWYgKCF0aGlzRmxvb3IpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgbG9naWNJZHg6IG51bWJlciA9IDA7IGxvZ2ljSWR4IDwgdGhpc0Zsb29yLkxvZ2ljTGVuZ3RoOyArK2xvZ2ljSWR4KSAge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmn5DpgZPlhbfkv6Hmga9cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfWZsb29yIFxyXG4gICAgICovXHJcbiAgICBfVGFrZUl0ZW1MaXN0KGZsb29yOiBudW1iZXIpICB7XHJcbiAgICAgICAgdmFyIGxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgdmFyIGl0ZW1MaXN0ID0gbmV3IEFycmF5KGxpbmUuTG9naWNMZW5ndGgpO1xyXG4gICAgICAgIHZhciBsaW5lUmV3YXJkcyA9IHRoaXMuSXRlbUxheW91dC5UYWtlTGluZVJld2FyZChmbG9vcik7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IHRoaXMuQ3VyTGluZVJld2FyZHMuY29uY2F0KGxpbmVSZXdhcmRzKTtcclxuICAgICAgICBpZiAodGhpcy5TYWZlTG9jYXRpb24uWSA+IGZsb29yIHx8IGZsb29yID4gdGhpcy5TYWZlTG9jYXRpb24uWSArIDEpICB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lQmFycmllcnMgPSB0aGlzLkl0ZW1MYXlvdXQuVGFrZUxpbmVEaWZmaWN1bHR5KGZsb29yKTtcclxuICAgICAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSB0aGlzLkN1ckxpbmVCYXJyaWVycy5jb25jYXQobGluZUJhcnJpZXJzKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ3VyTGluZUJhcnJpZXJzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5aGM6Zm35p+Q5LiA5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX0Rlc3Ryb3lMaW5lKGZsb29yOiBudW1iZXIpICB7XHJcbiAgICAgICAgdmFyIHRhaWxGbG9vciA9IHRoaXMuVGFpbEZMb29yO1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRhaWxGbG9vci5GbG9vck51bSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBjb3VudEZsb29yOiBudW1iZXIgPSB0YWlsRmxvb3IuRmxvb3JOdW07IGNvdW50Rmxvb3IgPD0gZmxvb3I7ICsrY291bnRGbG9vcikgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldEZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihjb3VudEZsb29yKTtcclxuICAgICAgICAgICAgdGFyZ2V0Rmxvb3IuQnJlYWsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgcGF0aFxyXG57XHJcbiAgICBleHBvcnQgdmFyIElzRWRpdG9yOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGV4cG9ydCB2YXIgcmVzVmVyc2lvbiA9IFwiMVwiO1xyXG4gICAgZXhwb3J0IHZhciBTY2VuZUFzc2V0UGF0aDpzdHJpbmcgPSBcIkxheWFTY2VuZV9cIjtcclxuICAgIGV4cG9ydCB2YXIgUmVzb3VyY2VQYXRoOnN0cmluZyA9IElzRWRpdG9yP1wiLi4vTmV0UmVzb3VyY2VfM18yOS9cIjpcImh0dHBzOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL05ldFJlc291cmNlXzNfMjkvXCI7XHJcbiAgICBleHBvcnQgdmFyIFVJUGF0aDpzdHJpbmcgPSBSZXNvdXJjZVBhdGggKyBcIlVJL1wiO1xyXG4gICAgZXhwb3J0IHZhciBNb2RlbFBhdGg6c3RyaW5nID0gUmVzb3VyY2VQYXRoK1wiM0QvXCJcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZBdGzmlofku7bot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEF0bFBhdGgoZmlsZU5hbWU6c3RyaW5nKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gVUlQYXRoICsgZmlsZU5hbWUrXCIuYXRsYXM/dj1cIiArIHRoaXMucmVzVmVyc2lvbjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WVUlKc29u6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXREZXBhdGhVSUpTKGZpbGVOYW1lOnN0cmluZyk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBVSVBhdGgrZmlsZU5hbWUrXCIuanNvbj92PVwiICsgdGhpcy5yZXNWZXJzaW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZsaOaWh+S7tui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0TEgoZmlsZU5hbWU6c3RyaW5nKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTW9kZWxQYXRoICtTY2VuZUFzc2V0UGF0aCtmaWxlTmFtZStcIi9Db252ZW50aW9uYWwvXCIgK2ZpbGVOYW1lICsgXCIubGg/dj1cIiArIHRoaXMucmVzVmVyc2lvbjtcclxuICAgIH1cclxufSAiLCJleHBvcnQgbW9kdWxlIFVJRnVuY1xyXG57XHJcbiAgICAvL+iuoeeul+e8qeaUvuWAvFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvdW50U2NhbGVGaXgoIHdpZHRoOm51bWJlciApOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF3aWR0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFnZVdpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB2YXIgc2NhbGU6bnVtYmVyID0gTGF5YS5zdGFnZS53aWR0aC93aWR0aDtcclxuICAgICAgICByZXR1cm4gIHNjYWxlO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEZpeFVJKCB2aWV3OkxheWEuU3ByaXRlIClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBVSUZ1bmMuQ291bnRTY2FsZUZpeCh2aWV3LndpZHRoKTtcclxuICAgICAgICB2aWV3LnNjYWxlWCA9IHNjYWxlO1xyXG4gICAgICAgIHZpZXcuc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgdmlldy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodC9zY2FsZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1nciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCIgXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQUFxyXG57XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTWVzc2FnZTpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgIHN0YXRpYyBnZXQgTWVzc2FnZU1hbmFnZXIoKTpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEFQUC5fTWVzc2FnZT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuX01lc3NhZ2UgPSBGVy5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX01lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX1VJTWFuYWdlcjpVSU1hbmFnZXI7XHJcbiAgICBzdGF0aWMgZ2V0IFVJTWFuYWdlcigpOlVJTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEFQUC5fVUlNYW5hZ2VyPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5fVUlNYW5hZ2VyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX1VJTWFuYWdlcjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIF9TY2VuZU1ncjpTY2VuZU1ncjtcclxuICAgIHN0YXRpYyBnZXQgU2NlbmVNYW5hZ2VyKCk6U2NlbmVNZ3JcclxuICAgIHtcclxuICAgICAgICBpZihBUFAuX1NjZW5lTWdyPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5fU2NlbmVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFNjZW5lTWdyPihTY2VuZU1ncik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX1NjZW5lTWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbiIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IFNldFBhbmVsVUkgZnJvbSBcIi4vLi4vdWkvU2V0UGFuZWxVSVwiXHJcbmltcG9ydCBDaGFyYWN0ZXJVSSBmcm9tIFwiLi8uLi91aS9DaGFyYWN0ZXJVSVwiXHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZVNjZW5lXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuL0FQUFwiXHJcblxyXG50eXBlIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGVyXHJcbntcclxuICAgIHN0YXRpYyBnZXQgR2FtZUNvbnRyb2xlcigpOkdhbWVDb250cm9sZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIEdhbWVDb250cm9sZXIuTWdyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ29udHJvbGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6IEdhbWVDb250cm9sZXI7XHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgTWdyKCk6IEdhbWVDb250cm9sZXIge1xyXG4gICAgICAgIGlmIChHYW1lQ29udHJvbGVyLl9NZ3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBHYW1lQ29udHJvbGVyLl9NZ3IgPSBuZXcgR2FtZUNvbnRyb2xlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR2FtZUNvbnRyb2xlci5fTWdyO1xyXG4gICAgfVxyXG4gICAgX0xpbmVTdGVwTnVtOm51bWJlcjtcclxuICAgIF9NYXhMaW5lTnVtOm51bWJlcjtcclxuICAgIF9TdGVwTGVuZ3RoOm51bWJlcjtcclxuICAgIF9TdGVwRGlzdGFuY2U6bnVtYmVyO1xyXG4gICAgX1BsYXllck1vdmVUaW1lOm51bWJlcjtcclxuICAgIC8v5bi46YeP5a6a5LmJXHJcbiAgICAvL+avj+ihjOacgOWkp+agvOWtkOaVsFxyXG4gICAgZ2V0IExpbmVTdGVwTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9MaW5lU3RlcE51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xpbmVTdGVwTnVtID0gNSsyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTGluZVN0ZXBOdW07XHJcbiAgICB9IFxyXG4gICAgLy/mnIDlpKfooYzmlbBcclxuICAgIGdldCBNYXhMaW5lTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9NYXhMaW5lTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTWF4TGluZU51bSA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTWF4TGluZU51bTtcclxuICAgIH0gXHJcbiAgICAvL+agvOWtkOi+uemVv1xyXG4gICAgZ2V0IFN0ZXBMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcExlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBMZW5ndGggPSAwLjk4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcExlbmd0aDtcclxuICAgIH1cclxuICAgIC8v5qC85a2Q5pac5a+56KeS6ZW/5bqmXHJcbiAgICBnZXQgU3RlcERpc3RhbmNlKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1N0ZXBEaXN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBEaXN0YW5jZSA9IE1hdGguc3FydCgodGhpcy5TdGVwTGVuZ3RoICogdGhpcy5TdGVwTGVuZ3RoKSAqIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcERpc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/njqnlrrbnp7vliqjml7bpl7RcclxuICAgIGdldCBQbGF5ZXJNb3ZlVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9QbGF5ZXJNb3ZlVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1BsYXllck1vdmVUaW1lID0gMC4wMiAqIDEwMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fUGxheWVyTW92ZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGxheWVySUQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJTZWxlY3RlZFwiICsgaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66K6+572u6Z2i5p2/XHJcbiAgICBTaG93U2V0UGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIFBhbmVsID0gQVBQLlVJTWFuYWdlci5TaG93PFNldFBhbmVsVUk+KFNldFBhbmVsVUkpOy8vIG5ldyBTZXRQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66KeS6Imy6Z2i5p2/XHJcbiAgICBwdWJsaWMgU2hvd0NoYXJhY3RlclBhbmVsKCkge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBBUFAuVUlNYW5hZ2VyLlNob3c8Q2hhcmFjdGVyVUk+KENoYXJhY3RlclVJKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TZXRJbmZvO1xyXG4gICAgZ2V0IFNldEluZm8oKTogR2FtZVN0cnVjdC5TZXRJbmZvIHtcclxuICAgICAgICBpZiAodGhpcy5fU2V0SW5mbyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1NldEluZm8gPSBuZXcgR2FtZVN0cnVjdC5TZXRJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TZXRJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBTZXRJbmZvKHZhbHVlOiBHYW1lU3RydWN0LlNldEluZm8pIHtcclxuICAgICAgICB0aGlzLl9TZXRJbmZvID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kv53lrZjorr7nva7mlbDmja5cclxuICAgIFNhdmVTZXRJbmZvKGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuU2V0SW5mbyA9IGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLy/or7vlj5borr7nva7kv6Hmga9cclxuICAgIEdldFNldEluZm8oKTogR2FtZVN0cnVjdC5TZXRJbmZvIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TZXRJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIEVudGVyR2FtZVVJKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuRW50ZXJTY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgRW50ZXJHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuRW50ZXJTY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEdhbWVEaXIoKTogR2FtZURpcmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5EaXJlY3RvciBhcyBHYW1lRGlyZWN0b3I7XHJcbiAgICB9XHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr+i1sOi/meS4quaOpeWPo1xyXG4gICAgRW50ZXJTY2VuZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbmV3R2FtZVNjZW5lID0gbmV3IEdhbWVTY2VuZSgpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ2hhbmdlU2NlbmUobmV3R2FtZVNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkEJVRkbooajnjrDmlYjmnpxcclxuICAgIEdlbkJ1ZmZFZmZlY3QodHlwZTogSXRlbVR5cGUpOiBMYXlhLlNwcml0ZTNEIHtcclxuICAgICAgICByZXR1cm4gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtRWxlbWVudCBleHRlbmRzIExheWEuQm94ICB7XHJcbiAgICAvL1xyXG4gICAgSWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9CdG46IExheWEuQnV0dG9uO1xyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiAge1xyXG4gICAgICAgIGlmICh0aGlzLl9CdG4gPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG4gICAgU2V0QnRuKG93bmVyOiBhbnksIGxpc3RlbmVyOiAoKSA9PiB2b2lkKSAge1xyXG4gICAgICAgIHRoaXMuQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcbiAgICAvL1xyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlRWxlbWVudCBleHRlbmRzIExheWEuSW1hZ2Vcclxue1xyXG4gICAgLy9cclxuICAgIElkeDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9CdG46TGF5YS5CdXR0b247XHJcbiAgICBnZXQgQnRuKCk6TGF5YS5CdXR0b25cclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9CdG4gPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICAgICAgdGhpcy5fQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e1xyXG4gICAgICAgICAgICAgICAgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNldFBsYXllcklEKHRoaXMuSWR4KTtcclxuICAgICAgICAgICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9CdG47XHJcbiAgICB9XHJcbiAgICBSZXNldCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5CdG4pXHJcbiAgICAgICAge31cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0e0Jhc2VGdW5jfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJHVUkgZXh0ZW5kcyB1aS5CR1VJIHtcclxuICAgIFxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSkpO1xyXG4gICAgfVxyXG4gICAgLy9wcml2YXRlIF9Ta3lBcnI6QXJyYXk8TGF5YS5TcHJpdGU+O1xyXG4gICAgcHJpdmF0ZSBfU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9UZW1wU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9TY2FsZVNreTpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9TY2FsZUVhcnRoOm51bWJlcjtcclxuICAgIHByaXZhdGUgX0VhcnRoU3RhcnRQUzpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgd2lkaCA9IExheWEuc3RhZ2Uud2lkdGggO1xyXG4gICAgICAgIHZhciByYXRlID0gTWF0aC5jZWlsKExheWEuc3RhZ2UuaGVpZ2h0L3dpZGgpO1xyXG5cclxuICAgICAgICB0aGlzLl9Ta3lRdWUgPSBuZXcgQmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPigpO1xyXG4gICAgICAgIHRoaXMuX1RlbXBTa3lRdWUgPSBuZXcgQmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPigpO1xyXG4gICAgICAgICAvL25ldyBBcnJheTxMYXlhLkltYWdlPihyYXRlKzEpO1xyXG4gICAgICAgIGZvcihsZXQgc3RhcnRJZHggPSAwO3N0YXJ0SWR4PHJhdGUrMTsgKytzdGFydElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2U6TGF5YS5JbWFnZSA9IG5ldyBMYXlhLkltYWdlKCk7XHJcbiAgICAgICAgICAgIGltYWdlLmxvYWRJbWFnZShcImNvbXAvaW1nX2JhY2tncm91bmRfc3ByX3NreS5wbmdcIik7XHJcbiAgICAgICAgICAgIGltYWdlLndpZHRoID0gd2lkaDtcclxuICAgICAgICAgICAgaW1hZ2UuaGVpZ2h0ID0gd2lkaCt3aWRoKjAuMDE7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9Ta3lRdWUuUHVzaChpbWFnZSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICB0aGlzLlNldFNreSgwKTtcclxuICAgICAgICB2YXIgZWFydGggPSBuZXcgTGF5YS5JbWFnZSgpO1xyXG4gICAgICAgIGVhcnRoLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fRWFydGhTdGFydFBTID0gZWFydGgueTtcclxuICAgICAgICBlYXJ0aC5sb2FkSW1hZ2UoXCJjb21wL2ltZ19iYWNrZ3JvdW5kX3Nwci5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5fRWFydGggPSBlYXJ0aDtcclxuICAgICAgICBlYXJ0aC53aWR0aCA9IHdpZGg7XHJcbiAgICAgICAgZWFydGguaGVpZ2h0ID0gd2lkaDtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGVhcnRoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9TY2FsZVNreSA9IDAuMDAxXHJcbiAgICAgICAgdGhpcy5fU2NhbGVFYXJ0aCA9IDAuMDFcclxuICAgICAgICAvL3RoaXMuX0VhcnRoU3RhcnRQUyA9IHRoaXMuX0VhcnRoLnk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgZm9yKGxldCBzdGFydElkeDpudW1iZXIgPSAwO3N0YXJ0SWR4PHRoaXMuX1NreVF1ZS5Db3VudDsrK3N0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1NreUFycltzdGFydElkeF0ueSA9IHN0YXJ0SWR4ICogaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9FYXJ0aC55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0VhcnRoU3RhcnRQUyA9IHRoaXMuX0VhcnRoLnk7XHJcbiAgICB9Ki9cclxuICAgIC8v6auY5bqm6L2s5bGP5bmV6auY5bqm5YOP57SgXHJcbiAgICBIZWlnaHRUcmFuc1BpeCggaGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0Ki0wLjE7XHJcbiAgICB9XHJcbiAgICBTZXRTa3kocGl4SGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT4gPSB0aGlzLl9UZW1wU2t5UXVlO1xyXG4gICAgICAgIHRlbVNreVF1ZS5DbGVhcigpO1xyXG4gICAgICAgIHZhciBjb3VudDpudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHdoaWxlKHRoaXMuX1NreVF1ZS5Db3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6QmFzZUZ1bmMuTm9kZTxMYXlhLlNwcml0ZT4gPSB0aGlzLl9Ta3lRdWUuUG9wTm9kZSgpO1xyXG4gICAgICAgICAgICB2YXIgc2t5SW1nOkxheWEuU3ByaXRlID0gbm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgc2t5SW1nLnkgPSBjb3VudCAqIGhlaWdodCArIHBpeEhlaWdodCAtIGhlaWdodCAtIGhlaWdodCowLjAxO1xyXG4gICAgICAgICAgICB0ZW1Ta3lRdWUuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgIGlmKHNreUltZy55PkxheWEuc3RhZ2UuaGVpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBza3lJbWcueSA9IHRlbVNreVF1ZS5IZWFkVmFsdWUueSAtIGhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK2NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9UZW1wU2t5UXVlID0gdGhpcy5fU2t5UXVlO1xyXG4gICAgICAgIHRoaXMuX1NreVF1ZSA9IHRlbVNreVF1ZTtcclxuICAgIH1cclxuICAgIFNldEVhcnRoKGhlaWdodDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRWFydGgueSA9IHRoaXMuX0VhcnRoU3RhcnRQUyArIGhlaWdodDtcclxuICAgIH1cclxuICAgIFVwZGF0ZVBhZ2UoIGhlaWdodDpudW1iZXIgKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgLy9oZWlnaHQgPSB0aGlzLkhlaWdodFRyYW5zUGl4KGhlaWdodCk7XHJcbiAgICAgICAgLy92YXIgc2t5SGVpZ2h0UGl4ID0gaGVpZ2h0KnRoaXMuX1NjYWxlU2t5O1xyXG4gICAgICAgIHRoaXMuU2V0U2t5KGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5TZXRFYXJ0aChoZWlnaHQpO1xyXG4gICAgICAgIC8vdmFyIGVhcnRoSGVpZ2h0UGl4ID0gaGVpZ2h0O1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge1VJRnVuY30gZnJvbSBcIi4vLi4vVXRpbGl0eS9VSUZ1bmNcIlxyXG4vL1VJ5Z+657G7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VVSSBleHRlbmRzIExheWEuQm94XHJcbntcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL1xyXG4gICAgcHJvdGVjdGVkIF9VSVR5cGU6QmFzZUVudW0uVUlUeXBlRW51bTtcclxuICAgIHByb3RlY3RlZCBfSXNNdXRleDpib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9OYW1lOnN0cmluZzsgICAgXHJcbiAgICBwcm90ZWN0ZWQgX1VJTWFuYWdlcjpVSU1hbmFnZXJcclxuICAgIHByaXZhdGUgX0RpcnR5OmJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9TaG93aW5nOmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTG93O1xyXG4gICAgICAgIHRoaXMuX0lzTXV0ZXggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9OYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLl9TaG93aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxlZnQgPSAwO1xyXG5cdCAgICB0aGlzLnJpZ2h0ID0gMDtcclxuXHRcdHRoaXMuYm90dG9tID0gMDtcclxuXHRcdHRoaXMudG9wID0gMDtcclxuICAgIH1cclxuICAgIEhpZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuT1AoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBDbG9zZU9QKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBEZXN0cm95KCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFVJVHlwZSgpOkJhc2VFbnVtLlVJVHlwZUVudW1cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUlUeXBlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgSXNNdXRleCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNNdXRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+5VUnov5vooYzpgILphY1cclxuICAgICAqIEBwYXJhbSBVSSDpgILphY1VSVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRml4VUkoVUk6TGF5YS5WaWV3KVxyXG4gICAge1xyXG4gICAgICAgLy8gVUlGdW5jLkZpeFVJKFVJKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKFVJKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXREaXJ0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgRGlydHkoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0RpcnR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbGVhckRpcnR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgVUlVcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fRGlydHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLkNsZWFyRGlydHkoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBVcGRhdGUoKTp2b2lkO1xyXG59IiwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBGVyBmcm9tIFwiLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiO1xyXG5pbXBvcnQgUm9sZUVsZW1lbnQgZnJvbSBcIi4vLi4vc2NyaXB0L1JvbGVFbGVtZW50XCJcclxuXHJcbmNsYXNzIEV4dGVuZENoYXJhY3RlcnNVSSBleHRlbmRzIHVpLkNoYXJhY3RlclVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlclVJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfUmVuZGVySGFuZGxlcihjZWxsOkxheWEuQm94LGluZGV4Om51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciByb2xlRWxlbWVudDpSb2xlRWxlbWVudCA9IGNlbGwgYXMgUm9sZUVsZW1lbnQ7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuSWR4ID0gaW5kZXg7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVzZXQoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1VJOkV4dGVuZENoYXJhY3RlcnNVSTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZENoYXJhY3RlcnNVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuU2V0TGlzdCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJDaGFyYWN0ZXJVSVwiO1xyXG4gICAgfVxyXG4gICAgU2V0TGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxpc3RBcnJheTpBcnJheTxhbnk+ID0gW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCJdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5yZW5kZXJIYW5kbGVyID0gbmV3IExheWEuSGFuZGxlcih0aGlzLHRoaXMuX1JlbmRlckhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LmFycmF5ID0gbGlzdEFycmF5O1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0Rpc3RhbmNlID0gNTBcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtHYW1lU3RydWN0IH0gIGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kRW5kR2FtZVVJIGV4dGVuZHMgdWkuRW5kR2FtZVVJIHtcclxuICAgIFBhbmVsOkxheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVuZEdhbWVcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbCA9IHRoaXMuUGFuZWw7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMuUGFuZWwuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX01lbnVlQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssR3VpZGVyTWFuYWdlci5NZ3IsR3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5fU2V0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssQ29udHJvbGVyLkdhbWVDb250cm9sZXIsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TdGFydEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZEdhbWVVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkVuZEdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgVUk6RXh0ZW5kRW5kR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5VST0gbmV3IEV4dGVuZEVuZEdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5VSSk7XHJcbiAgICAgICAgLy90aGlzLlVJLl9DaGFyYWN0ZXJMaXN0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyB0aGlzLl9VSU1hbmFnZXIuU2hvdzxQbGF5ZXJMaXN0VUk+KFBsYXllckxpc3RVSSl9KTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IEZNIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgUGxheWVyTGlzdFVJIGZyb20gXCIuLy4uL3VpL1BsYXllckxpc3RVSVwiXHJcbmltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmNsYXNzIEV4dGVuZEVudGVyR2FtZVVJIGV4dGVuZHMgdWkuRW50ZXJVSSB7XHJcbiAgICBQYW5lbDpMYXlhLlBhbmVsO1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5QYW5lbCA9IHRoaXMuX1BhbmVsO1xyXG4gICAgICAgIHRoaXMuUGFuZWwudlNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuUGFuZWwuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX0NoYXJhY3Rlci5vbihMYXlhLkV2ZW50LkNMSUNLLEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlcixHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd0NoYXJhY3RlclBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TZXRQYW5lbC5vbihMYXlhLkV2ZW50LkNMSUNLLEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlcixHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TdGFydC5vbihMYXlhLkV2ZW50LkNMSUNLLEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlcixHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuRW50ZXJHYW1lKTtcclxuICAgIH0gICAgICAgIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRlckdhbWVVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkVudGVyR2FtZVVJXCI7XHJcbiAgICB9XHJcbiAgICBfVUk6RXh0ZW5kRW50ZXJHYW1lVUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VST0gbmV3IEV4dGVuZEVudGVyR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdmFyIHVpTWdyOlVJTWFuYWdlciA9IHRoaXMuX1VJTWFuYWdlcjtcclxuICAgICAgICB0aGlzLl9VSS5fQ2hhcmFjdGVyTGlzdC5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgdWlNZ3IuU2hvdzxQbGF5ZXJMaXN0VUk+KFBsYXllckxpc3RVSSl9KTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog5Zy65pmvVUlcclxuICovXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IEl0ZW1MaXN0VUkgZnJvbSBcIi4vSXRlbUxpc3RVSVwiXHJcbmltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuY2xhc3MgRXh0ZW5kc0dhbWVVSSBleHRlbmRzIHVpLkdhbWVVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVcIikpKTtcclxuICAgIH1cclxuICAgIFNldENvdW50VGltZShpbmZvOnN0cmluZyA9XCJcIilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUudGV4dCA9aW5mbztcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBwcml2YXRlIF9VSTpFeHRlbmRzR2FtZVVJO1xyXG4gICAgLy9cclxuICAgIERpc3RhbmNlU3RyOkFycmF5PHN0cmluZz47XHJcbiAgICBHb2xkTnVtU3RyOkFycmF5PHN0cmluZz47XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9Jc011dGV4ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIG9wSXNSaWdodCA9IEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRJbmZvLk9QSXNSaWdodDtcclxuICAgICAgICB0aGlzLl9VSS5fSXRlbUxpc3RCdG4ub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57IHRoaXMuX1VJTWFuYWdlci5TaG93PEl0ZW1MaXN0VUk+KEl0ZW1MaXN0VUkpfSlcclxuICAgICAgICB0aGlzLlNldENvdW50VGltZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHI9IHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gXCIwXCJcclxuICAgICAgICB0aGlzLl9TaG93RGlzdGFuY2UoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHIgPSB0aGlzLl9VSS5fVHh0R29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSBcIjBcIjtcclxuICAgICAgICB0aGlzLl9TaG93R29sZE51bSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2hvd0lucHV0SW5mbyhcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TaG93RGlzdGFuY2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0ID0gdGhpcy5EaXN0YW5jZVN0clswXSt0aGlzLkRpc3RhbmNlU3RyWzFdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIF9TaG93R29sZE51bSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1R4dEdvbGQudGV4dCA9IHRoaXMuR29sZE51bVN0clswXSArIHRoaXMuR29sZE51bVN0clsxXTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiR2FtZVVJXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldCBHb2xkKGdvbGQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IGdvbGQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLlNldERpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBTZXRMZWZ0VG91Y2gob3duZXI6YW55LExpc3RlbmVyOigpPT52b2lkKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JpZ2h0X0xlZnRUb3VjaC5vbihMYXlhLkV2ZW50LkNMSUNLLG93bmVyLExpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRSaWdodFRvdWNoKG93bmVyOmFueSxMaXN0ZW5lcjooKT0+dm9pZCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9SaWdodF9SaWdodFRvdWNoLm9uKExheWEuRXZlbnQuQ0xJQ0ssb3duZXIsTGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldENvdW50VGltZShpbmZvOnN0cmluZyA9XCJcIilcclxuICAgIHtcclxuICAgICAgICBpZihpbmZvPT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fQ291bnREb3duVUkudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVQYW5lbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5TZXRDb3VudFRpbWUoaW5mbyk7XHJcbiAgICB9XHJcbiAgICBzZXQgR2FtZVBhbmVsKHZhbHVlOmJvb2xlYW4pXHJcbiAgICB7IFxyXG4gICAgICAgIHRoaXMuX1VJLl9HYW1lUGFuZWwudmlzaWJsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgc2V0IERpc3RhbmNlKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgZGlzID0gXCJcIiArIHZhbHVlO1xyXG4gICAgICAgIGlmKGRpcyA9PSB0aGlzLkRpc3RhbmNlU3RyWzFdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHJbMV0gPSBkaXM7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgc2V0IEdvbGROdW0odmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgU2hvd0lucHV0SW5mbyhpbmZvOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZUluZm8udGV4dCA9IGluZm87XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIC8v5pi+56S66YeR5biB5L+h5oGvXHJcbiAgICAgICAgdGhpcy5fU2hvd0dvbGROdW0oKTtcclxuICAgICAgICAvL+aYvuekuui3neemu+S/oeaBr1xyXG4gICAgICAgIHRoaXMuX1Nob3dEaXN0YW5jZSgpO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuLy4uL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcblxyXG5jbGFzcyBFeHRlbmRzSXRlbUxpc3RVSSBleHRlbmRzIHVpLkl0ZW1MaXN0VUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSkpO1xyXG4gICAgfVxyXG4gICAgU2V0TGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxpc3RBcnJheTpBcnJheTxhbnk+ID0gW1wiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCIsXCJcIixcIlwiLFwiXCJdO1xyXG4gICAgICAgIHRoaXMuX0xpc3QuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX0xpc3QucmVuZGVySGFuZGxlciA9IG5ldyBMYXlhLkhhbmRsZXIodGhpcyx0aGlzLl9SZW5kZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9MaXN0LmFycmF5ID0gbGlzdEFycmF5O1xyXG4gICAgICAgIHRoaXMuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNCYWNrVGltZSA9IDIwMDsvL+iuvue9ruapoeearueti+WbnuW8ueaXtumXtOOAguWNleS9jeS4uuavq+enkuOAglxyXG4gICAgICAgIHRoaXMuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNEaXN0YW5jZSA9IDUwXHJcbiAgICB9XHJcbiAgICBCdG5MaXN0ZW5lcjpNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIHByaXZhdGUgX1JlbmRlckhhbmRsZXIoY2VsbDpMYXlhLkJveCxpbmRleDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgcm9sZUVsZW1lbnQ6SXRlbUVsZW1lbnQgPSBjZWxsIGFzIEl0ZW1FbGVtZW50O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlNldEJ0bih0aGlzLkJ0bkxpc3RlbmVyLkxpc3RlbmVyLHRoaXMuQnRuTGlzdGVuZXIuQWN0aW9uKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtTGlzdFVJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiSXRlbUxpc3RVSVwiO1xyXG4gICAgfVxyXG4gICAgVUk6RXh0ZW5kc0l0ZW1MaXN0VUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLlVJID0gbmV3IEV4dGVuZHNJdGVtTGlzdFVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLlVJKTtcclxuICAgICAgICB0aGlzLlVJLkJ0bkxpc3RlbmVyID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZSh0aGlzLCgpPT57IHRoaXMuX1VJTWFuYWdlci5DbG9zZSh0aGlzKX0pXHJcbiAgICAgICAgdGhpcy5VSS5TZXRMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG59IiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5cclxuY2xhc3MgRXh0ZW5kUGxheWVyTGlzdCBleHRlbmRzIHVpLlBsYXllckxpc3RVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckxpc3RVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIlBsYXllckxpc3RVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIF9VSTpFeHRlbmRQbGF5ZXJMaXN0O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRQbGF5ZXJMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JldHVybk1haW4ub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57XHJcbiAgICAgICAgICAgIEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG59XHJcbiIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmNsYXNzIEV4dGVuZHNTZXRQYW5lbFVJIGV4dGVuZHMgdWkuU2V0UGFuZWxVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e0FQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCl9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNTZXRQYW5lbFVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzU2V0UGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4geyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7IEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKSB9KTtcclxuICAgICAgICB0aGlzLlNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNldFBhbmVsVUlcIjtcclxuICAgIH1cclxuICAgIFNldFBhbmVsKCkge1xyXG4gICAgICAgIHZhciBpbmZvOiBHYW1lU3RydWN0LlNldEluZm8gPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HZXRTZXRJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5fVUkuX0F1ZGlvU3dpdGNoLnNlbGVjdGVkSW5kZXggPSBpbmZvLkF1ZGlvT24gPyAwIDogMTtcclxuICAgICAgICB0aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uT1BJc1JpZ2h0ID8gMSA6IDA7XHJcbiAgICAgICAgdGhpcy5fVUkuX1RleHQudGV4dCA9IGluZm8uVGV4dEluZm87XHJcbiAgICB9XHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICBpbmZvLkF1ZGlvT24gPSB0aGlzLl9VSS5fQXVkaW9Td2l0Y2guc2VsZWN0ZWRJbmRleCA9PSAwO1xyXG4gICAgICAgIGluZm8uT1BJc1JpZ2h0ID0gdGhpcy5fVUkuX09QU3dpdGNoLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TYXZlU2V0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZU9QKCkge1xyXG4gICAgICAgIHRoaXMuU2F2ZVBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge31cclxufVxyXG4iLCJpbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL0Jhc2VVSVwiXHJcbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XHJcblxyXG5tb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1Byb2dyZXNzOkxheWEuUHJvZ3Jlc3NCYXI7XHJcblx0XHRwdWJsaWMgX0d1aWRlcjpMYXlhLkltYWdlO1xyXG5cdFx0cHVibGljIF9FbnRlcjpMYXlhLkJ1dHRvbjtcclxuXHRcdHB1YmxpYyBFcnJvckluZm86TGF5YS5MYWJlbDtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTG9hZGluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEV4dExvYWRpbmdVSSBleHRlbmRzIHVpLkxvYWRpbmdVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBcIkxvYWRpbmdVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOnVpLkxvYWRpbmdVSTtcclxuICAgIF9DYWxsQmFjazooKT0+dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBuYW1lOnN0cmluZyApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgLy90aGlzLl9VSSA9bmV3IHVpLkxvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuX1VJID1uZXcgRXh0TG9hZGluZ1VJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSApO1xyXG4gICAgICAgIHRoaXMuVmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5fQ2FsbEJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB4Om51bWJlciA9IDA7XHJcbiAgICAgICAgeCArPSB0aGlzLl9VSS5fUHJvZ3Jlc3Mud2lkdGgqdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9HdWlkZXIucG9zKHgsdGhpcy5fVUkueSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFZhbHVlKG51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBDb21wbGV0ZShjYWxsQmFjazooKT0+dm9pZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DYWxsQmFjayA9IGNhbGxCYWNrO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIubGFiZWwgPSBcIkVudGVyXCI7Ly90aGlzLl9OYW1lWzBdO1xyXG4gICAgfVxyXG4gICAgUmVsb2FkKGNhbGxCYWNrOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBCR1VJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfRWFydGg6TGF5YS5JbWFnZTtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkJHXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0dvbGREaXM6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX0xpc3Q6TGF5YS5MaXN0O1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiQ2hhcmFjdGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBFbmRHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9HYW1lSW5mbzpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfU3RhcnRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9NZW51ZUJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1NldEJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BsYXllckxpc3RCdG46TGF5YS5CdXR0b247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJFbmRHYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBFbnRlclVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfU3RhcnQ6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9DaGFyYWN0ZXI6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QYW5lbDpMYXlhLlBhbmVsO1xuXHRcdHB1YmxpYyBfU2V0UGFuZWw6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9DaGFyYWN0ZXJMaXN0OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUmFuazpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVudGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Db3VudERvd25VSTpMYXlhLkJveDtcblx0XHRwdWJsaWMgX0l0ZW1MaXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ291bnRUaW1lOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lSW5mbzpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfR2FtZVBhbmVsOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfVHh0RGlzdGFuY2U6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1R4dEdvbGQ6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1VzZUl0ZW06TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SaWdodF9MZWZ0VG91Y2g6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SaWdodF9SaWdodFRvdWNoOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVJhbmtVSSBleHRlbmRzIExheWEuU2NlbmUge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJHYW1lUmFua1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0xpc3Q6TGF5YS5MaXN0O1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiSXRlbUxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1BsYXllckxpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBfUmV0dXJuTWFpbjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlBsYXllckxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9UZXh0OkxheWEuVGV4dEFyZWE7XG5cdFx0cHVibGljIF9SZXR1cm46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9BdWRpb1N3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG5cdFx0cHVibGljIF9PUFN3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJTZXRQYW5lbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
