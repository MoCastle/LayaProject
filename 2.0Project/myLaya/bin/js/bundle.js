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
var PlayerEntity = require("./PlayerEntity");
var BaseAgent = /** @class */ (function () {
    function BaseAgent() {
        this.m_PlayerEntity = PlayerEntity.Player.PlayerEntity.Entity;
    }
    return BaseAgent;
}());
exports.default = BaseAgent;
},{"./PlayerEntity":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAgent_1 = require("./BaseAgent");
var GameAgent = /** @class */ (function (_super) {
    __extends(GameAgent, _super);
    function GameAgent() {
        return _super.call(this) || this;
    }
    Object.defineProperty(GameAgent, "Agent", {
        get: function () {
            if (this._Agent == null) {
                this._Agent = new GameAgent();
            }
            return this._Agent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameAgent.prototype, "CurLevel", {
        get: function () {
            return this.m_PlayerEntity.HistoryMaxLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameAgent.prototype, "CurCharacterID", {
        get: function () {
            return this.m_PlayerEntity.CurCharacterID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameAgent.prototype, "CurItem", {
        get: function () {
            return this.m_PlayerEntity.CurItem;
        },
        set: function (id) {
            if (!this.ItemList[id])
                return;
            this.m_PlayerEntity.CurItem = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameAgent.prototype, "ItemList", {
        get: function () {
            return this.m_PlayerEntity.ItemList;
        },
        enumerable: true,
        configurable: true
    });
    return GameAgent;
}(BaseAgent_1.default));
exports.GameAgent = GameAgent;
},{"./BaseAgent":1}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FrameWork_1 = require("./../FrameWork/FrameWork");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var Player;
(function (Player) {
    var Event = /** @class */ (function () {
        function Event() {
        }
        Event.OnMoneyChange = "OnMoneyChange";
        Event.OnCurCharacterIDChange = "OnCurCharacterIDChange";
        Event.OnHistoryMaxLevelChange = "OnHistoryMaxLevelChange";
        Event.OnCharacterListChange = "OnCharacterListChange";
        Event.OnCurItemChange = "OnCurItemChange";
        Event.OnItemListChange = "OnItemListChange";
        return Event;
    }());
    Player.Event = Event;
    var PlayerEntity = /** @class */ (function () {
        function PlayerEntity() {
            this.m_Money = 0;
            this.m_CurCharacterID = 0;
            this.m_CharacterList = [1];
            this.m_HistoryMaxLevel = 0;
            this.m_CurItem = 0;
            this.m_FrameWork = FrameWork_1.default.FM;
            this.m_MessageMgr = FrameWork_1.default.FM.GetManager(MessageCenter_1.MessageMD.MessageCenter);
            this.m_ItemList = [];
        }
        Object.defineProperty(PlayerEntity, "Entity", {
            get: function () {
                if (!PlayerEntity.m_Entity) {
                    PlayerEntity.m_Entity = new PlayerEntity;
                }
                return PlayerEntity.m_Entity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerEntity.prototype, "Money", {
            get: function () {
                return this.m_Money;
            },
            set: function (value) {
                if (value == this.m_Money) {
                    return;
                }
                this.m_MessageMgr.Fire(Event.OnMoneyChange);
                this.m_Money = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerEntity.prototype, "CurCharacterID", {
            get: function () {
                return this.m_CurCharacterID;
            },
            set: function (value) {
                if (value == this.m_CurCharacterID) {
                    return;
                }
                this.m_CurCharacterID = value;
                this.m_MessageMgr.Fire(Event.OnCurCharacterIDChange);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerEntity.prototype, "HistoryMaxLevel", {
            get: function () {
                return this.m_HistoryMaxLevel;
            },
            set: function (value) {
                if (value == this.m_HistoryMaxLevel) {
                    return;
                }
                this.m_MessageMgr.Fire(Event.OnHistoryMaxLevelChange);
                this.m_HistoryMaxLevel = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerEntity.prototype, "CharacterList", {
            get: function () {
                return this.m_CharacterList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerEntity.prototype, "CurItem", {
            get: function () {
                return this.m_CurItem;
            },
            set: function (value) {
                if (value == this.m_CurItem) {
                    return;
                }
                this.m_MessageMgr.Fire(Event.OnCurItemChange);
                this.m_CurItem = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerEntity.prototype, "ItemList", {
            get: function () {
                return this.m_ItemList;
            },
            enumerable: true,
            configurable: true
        });
        PlayerEntity.prototype.AddCharacter = function (id) {
            this.m_CharacterList[id] = 1;
            this.m_MessageMgr.Fire(Event.OnCharacterListChange);
        };
        PlayerEntity.prototype.AddItem = function (id) {
            if (!this.m_ItemList[id]) {
                this.m_ItemList[id] = 0;
            }
            ++this.m_ItemList[id];
            this.m_MessageMgr.Fire(Event.OnItemListChange);
        };
        return PlayerEntity;
    }());
    Player.PlayerEntity = PlayerEntity;
})(Player = exports.Player || (exports.Player = {}));
},{"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseAgent_1 = require("./BaseAgent");
var PlayerGuestAgent = /** @class */ (function (_super) {
    __extends(PlayerGuestAgent, _super);
    function PlayerGuestAgent() {
        return _super.call(this) || this;
    }
    Object.defineProperty(PlayerGuestAgent, "GuestAgent", {
        get: function () {
            if (this._Agent == null) {
                this._Agent = new PlayerGuestAgent();
            }
            return this._Agent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerGuestAgent.prototype, "Money", {
        get: function () {
            return this.m_PlayerEntity.Money;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerGuestAgent.prototype, "CharacterID", {
        get: function () {
            return this.m_PlayerEntity.CurCharacterID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerGuestAgent.prototype, "CharacterList", {
        get: function () {
            return this.m_PlayerEntity.CharacterList;
        },
        enumerable: true,
        configurable: true
    });
    PlayerGuestAgent.prototype.BuyCharacter = function (id) {
        //ToDo
        var price = 0;
        if (id < 0 || price < 0 || price > this.m_PlayerEntity.Money) {
            return;
        }
        this.m_PlayerEntity.Money -= id;
        this.m_PlayerEntity.AddCharacter(id);
    };
    PlayerGuestAgent.prototype.BuyItem = function (id) {
        var price = 0;
        if (id < 0 || price < 0) {
            return false;
        }
        if (price > this.m_PlayerEntity.Money) {
            return false;
        }
        this.m_PlayerEntity.Money -= price;
        this.m_PlayerEntity.AddItem(id);
        return true;
    };
    PlayerGuestAgent.prototype.SetCharacter = function (id) {
        var characterList = this.CharacterList;
        if (characterList[id]) {
            this.m_PlayerEntity.CurCharacterID = id;
        }
    };
    return PlayerGuestAgent;
}(BaseAgent_1.default));
exports.default = PlayerGuestAgent;
},{"./BaseAgent":1}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseMgr = /** @class */ (function () {
    function BaseMgr() {
    }
    return BaseMgr;
}());
exports.default = BaseMgr;
},{}],9:[function(require,module,exports){
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
},{"./../Base/BaseFunc":6}],10:[function(require,module,exports){
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
                this._EventDict[name] = event;
            }
            event = this._EventDict[name];
            return event;
        };
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
            return getEvent;
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
},{"./BaseManager":8}],11:[function(require,module,exports){
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
},{"./../FrameWork/BaseManager":8,"./../Scene/Scene":30}],12:[function(require,module,exports){
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
        rootBox.height = UIManager.g_UIHeight * scale;
        rootBox.width = UIManager.g_UIWidth;
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
},{"./../Base/BaseEnum":5,"./../Utility/UIFunc":33,"./BaseManager":8}],13:[function(require,module,exports){
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
    GameConfig.startScene = "Enter.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/ItemElement":36,"./script/RoleElement":37}],14:[function(require,module,exports){
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
},{"./../Utility/Path":32,"./../controler/APP":34,"./../controler/GameControler":35}],15:[function(require,module,exports){
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
},{"./../Game/PlayerCtrler":23,"./../controler/GameControler":35,"./GameItem":18,"./Input":20}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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
},{"./../FrameWork/MessageCenter":10,"./../Game/AnimObj":14,"./../Utility/Path":32,"./../controler/APP":34,"./../controler/GameControler":35,"./Buff":15,"./GameStruct":19,"./Input":20,"./PlayerCtrler":23}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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
},{"./../controler/GameControler":35,"./Step":24}],22:[function(require,module,exports){
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
},{"../Utility/Path":32,"./../FrameWork/MessageCenter":10,"./../controler/APP":34,"./../controler/GameControler":35,"./Character":16,"./GameItem":18,"./PlayerCtrler":23}],23:[function(require,module,exports){
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
},{"./../controler/APP":34,"./../controler/GameControler":35}],24:[function(require,module,exports){
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
},{"./../Utility/Path":32,"./../controler/APP":34,"./GameItem":18,"./GameStruct":19}],25:[function(require,module,exports){
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
},{"./FrameWork/FrameWork":9,"./FrameWork/MessageCenter":10,"./FrameWork/SceneManager":11,"./FrameWork/UIManager":12,"./GameConfig":13,"./Scene/LoadScene":29,"./controler/APP":34}],26:[function(require,module,exports){
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
},{"./../Utility/Path":32,"./Scene":30,"./ScenePlay/GameScenePlay":31}],27:[function(require,module,exports){
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
},{"./../Game/GameItem":18,"./../Scene/Scene":30,"./GameDirector":26}],28:[function(require,module,exports){
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
},{"../controler/APP":34,"./../Scene/Scene":30,"./../Utility/Path":32,"./../ui/EnterGameUI":42}],29:[function(require,module,exports){
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
},{"./../Scene/Scene":30,"./../Utility/Path":32,"./../controler/APP":34,"./../ui/BG":38,"./../ui/UnDownload/LoadingUI":46,"./GuiderManager":28}],30:[function(require,module,exports){
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
},{"../FrameWork/FrameWork":9,"./../Base/FSM":7,"./../FrameWork/MessageCenter":10,"./../controler/APP":34}],31:[function(require,module,exports){
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
            this.PanelUI.GamePanel = true;
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
},{"./../../FrameWork/MessageCenter":10,"./../../Game/GameCamera":17,"./../../Game/GameItem":18,"./../../Game/GameStruct":19,"./../../Game/Input":20,"./../../Game/MountLine":21,"./../../Game/Player":22,"./../../Scene/Scene":30,"./../../controler/APP":34,"./../../controler/GameControler":35,"./../../ui/EndGameUI":41,"./../../ui/GameUI":43}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path;
(function (path) {
    path.IsEditor = true;
    path.SceneAssetPath = "LayaScene_";
    path.ResourcePath = path.IsEditor ? "D:/GIt/Resources/LayaProject/2.0Project/myLaya/NetResource_3_29/" : "https://www.gsjgame.com/Resource/NetResource_3_29/";
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
},{}],33:[function(require,module,exports){
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
        var scale = stageWidth / width;
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
},{}],34:[function(require,module,exports){
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
},{"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10,"./../FrameWork/SceneManager":11,"./../FrameWork/UIManager":12}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameStruct_1 = require("./../Game/GameStruct");
var PlayerGuestAgent_1 = require("./../Agent/PlayerGuestAgent");
var SetPanelUI_1 = require("./../ui/SetPanelUI");
var CharacterUI_1 = require("./../ui/CharacterUI");
var GameScene_1 = require("./../Scene/GameScene");
var APP_1 = require("./APP");
var PlayerGuestAgent_2 = require("./../Agent/PlayerGuestAgent");
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
        var guestAgent = PlayerGuestAgent_1.default.GuestAgent;
        var characterList = guestAgent.CharacterList;
        if (!characterList[id]) {
            if (!guestAgent.BuyCharacter(id)) {
                return;
            }
        }
        guestAgent.SetCharacter(id);
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
    GameControler.prototype.BuyItem = function (id) {
        PlayerGuestAgent_2.default.GuestAgent.BuyItem(id);
    };
    return GameControler;
}());
},{"./../Agent/PlayerGuestAgent":4,"./../Game/GameStruct":19,"./../Scene/GameScene":27,"./../ui/CharacterUI":40,"./../ui/SetPanelUI":45,"./APP":34}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var ItemElement = /** @class */ (function (_super) {
    __extends(ItemElement, _super);
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
    Object.defineProperty(ItemElement.prototype, "ItemIdx", {
        set: function (id) {
            this.m_ItemIdx = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemElement.prototype, "Img", {
        get: function () {
            return this._Img;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemElement.prototype, "BuyBtn", {
        get: function () {
            return this._Btn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemElement.prototype, "IsGray", {
        get: function () {
            return this.Img.gray;
        },
        set: function (value) {
            this.Img.gray = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemElement.prototype, "Num", {
        set: function (num) {
            this.m_LabelString[1] = "" + num;
            this.m_NumLabel.text = this.m_LabelString[0] + this.m_LabelString[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemElement.prototype, "Price", {
        set: function (num) {
            this._Btn.text.text = "" + num;
        },
        enumerable: true,
        configurable: true
    });
    ItemElement.prototype.Init = function () {
        this._Img = this.getChildAt(0);
        this._Btn = this.getChildAt(1);
        this.m_NumLabel = this.getChildAt(2);
        this._Btn.on(Laya.Event.CLICK, this, this.BuyItem);
        this._Img.on(Laya.Event.CLICK, this, this.ChooseImg);
        if (!this.m_LabelString) {
            this.m_LabelString = this.m_NumLabel.text.split("#");
        }
    };
    ItemElement.prototype.ChooseImg = function () {
        if (this.m_ChooseItem)
            this.m_ChooseItem.Execute(this.m_ItemIdx);
    };
    ItemElement.prototype.BuyItem = function () {
        if (this.m_BuyItem)
            this.m_BuyItem.Execute(this.m_ItemIdx);
    };
    ItemElement.prototype.RegistBuy = function (owner, listener) {
        var newDelegate = new MessageCenter_1.MessageMD.Delegate(owner, listener);
        this.m_BuyItem = newDelegate;
    };
    ItemElement.prototype.RegistChoose = function (owner, listener) {
        var newDelegate = new MessageCenter_1.MessageMD.Delegate(owner, listener);
        this.m_ChooseItem = newDelegate;
    };
    return ItemElement;
}(Laya.Box));
exports.default = ItemElement;
},{"./../FrameWork/MessageCenter":10}],37:[function(require,module,exports){
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
                    GameControler_1.default.GameControler.SetPlayerID(_this.m_CharacterID);
                    APP_1.default.UIManager.CloseCurView();
                });
            }
            return this._Btn;
        },
        enumerable: true,
        configurable: true
    });
    RoleElement.prototype.Reset = function () {
        if (!this._Img) {
            this.Init();
        }
    };
    RoleElement.prototype.SetGray = function (isGray) {
        this._Img.gray = isGray;
    };
    RoleElement.prototype.RegistOnImgClick = function (eventFunction) {
        var id = this.m_CharacterID;
        this._Img.on(Laya.Event.CLICK, null, eventFunction); // owner, ()=>{ eventFunction(id) } )
    };
    Object.defineProperty(RoleElement.prototype, "CharacterID", {
        set: function (id) {
            this.m_CharacterID = id;
        },
        enumerable: true,
        configurable: true
    });
    RoleElement.prototype.Init = function () {
        this._Img = this.getChildAt(0);
    };
    return RoleElement;
}(Laya.Image));
exports.default = RoleElement;
},{"./../controler/APP":34,"./../controler/GameControler":35}],38:[function(require,module,exports){
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
},{"./../Base/BaseFunc":6,"./../Utility/Path":32,"./layaMaxUI":47}],39:[function(require,module,exports){
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
        this.Open();
    };
    BaseUI.prototype.CloseOP = function () {
        //this.visible = false;
        this.Close();
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
    Object.defineProperty(BaseUI.prototype, "Showing", {
        get: function () {
            return this._Showing;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 对UI进行适配
     * @param UI 适配UI
     */
    BaseUI.prototype.FixUI = function (UI) {
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
},{"./../Base/BaseEnum":5,"./../FrameWork/FrameWork":9,"./../FrameWork/UIManager":12}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var Path_1 = require("./../Utility/Path");
var GameControler_1 = require("./../controler/GameControler");
var APP_1 = require("./../controler/APP");
var PlayerGuestAgent_1 = require("./../Agent/PlayerGuestAgent");
var PlayerEntity_1 = require("./../Agent/PlayerEntity");
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
        _this.GetCharacterList();
        _this.SetList();
        _this.m_CharacterList = [];
        _this.m_GoldDiscribe = _this._UI._Gold.text.split("#");
        _this.OnMoneyChange();
        return _this;
    }
    CharacterUI.prototype._RenderHandler = function (cell, index) {
        var _this = this;
        var roleElement = cell;
        roleElement.Reset();
        var characterList = PlayerGuestAgent_1.default.GuestAgent.CharacterList;
        roleElement.gray = characterList[index] ? false : true;
        roleElement.CharacterID = index;
        roleElement.RegistOnImgClick(function () { _this.OnClickImg(index); });
    };
    CharacterUI.Name = function () {
        return "CharacterUI";
    };
    CharacterUI.prototype.GetCharacterList = function () {
        this.m_CharacterList = [0, 1];
    };
    CharacterUI.prototype.SetList = function () {
        var listArray = this.m_CharacterList;
        this._UI._List.hScrollBarSkin = "";
        this._UI._List.renderHandler = new Laya.Handler(this, this._RenderHandler);
        this._UI._List.array = listArray;
        this._UI._List.scrollBar.elasticBackTime = 200; //设置橡皮筋回弹时间。单位为毫秒。
        this._UI._List.scrollBar.elasticDistance = 50;
    };
    CharacterUI.prototype.Update = function () {
    };
    CharacterUI.prototype.Open = function () {
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnCurCharacterIDChange, this.OnNeedCloseUI, this);
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnMoneyChange, this.OnMoneyChange, this);
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnCharacterListChange, this.OnChangeList, this);
    };
    CharacterUI.prototype.Close = function () {
        APP_1.default.MessageManager.DesRegist(PlayerEntity_1.Player.Event.OnCurCharacterIDChange, this.OnNeedCloseUI, this);
        APP_1.default.MessageManager.DesRegist(PlayerEntity_1.Player.Event.OnMoneyChange, this.OnMoneyChange, this);
        APP_1.default.MessageManager.DesRegist(PlayerEntity_1.Player.Event.OnCharacterListChange, this.OnChangeList, this);
    };
    //事件
    CharacterUI.prototype.OnClickImg = function (id) {
        if (id == PlayerGuestAgent_1.default.GuestAgent.CharacterID) {
            APP_1.default.UIManager.Close(this);
            return;
        }
        GameControler_1.default.GameControler.SetPlayerID(id);
    };
    CharacterUI.prototype.OnNeedCloseUI = function () {
        if (!this.Showing) {
            return;
        }
        APP_1.default.UIManager.Close(this);
    };
    CharacterUI.prototype.OnChangeList = function () {
        if (!this.Showing) {
            return;
        }
        this._UI._List.refresh();
    };
    CharacterUI.prototype.OnMoneyChange = function () {
        if (!this.Showing) {
            return;
        }
        this.m_GoldDiscribe[1] = "" + PlayerGuestAgent_1.default.GuestAgent.Money;
        this._UI._Gold.text = this.m_GoldDiscribe[0] + this.m_GoldDiscribe[1];
    };
    return CharacterUI;
}(BaseUI_1.default));
exports.default = CharacterUI;
},{"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Utility/Path":32,"./../controler/APP":34,"./../controler/GameControler":35,"./BaseUI":39,"./layaMaxUI":47}],41:[function(require,module,exports){
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
},{"../Scene/GuiderManager":28,"./../Utility/Path":32,"./../controler/GameControler":35,"./BaseUI":39,"./layaMaxUI":47}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var Path_1 = require("./../Utility/Path");
var BaseUI_1 = require("./BaseUI");
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
        return _this;
        //this._UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ uiMgr.Show<PlayerListUI>(PlayerListUI)});
    }
    EnterGameUI.Name = function () {
        return "EnterGameUI";
    };
    EnterGameUI.prototype.Update = function () {
    };
    return EnterGameUI;
}(BaseUI_1.default));
exports.default = EnterGameUI;
},{"./../Utility/Path":32,"./../controler/GameControler":35,"./BaseUI":39,"./layaMaxUI":47}],43:[function(require,module,exports){
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
        //this._UI._LeftTouch.left = 0;
        //this._UI._LeftTouch.right = this.width/4;
        //this._UI._RightTouch.right = 0;
        //this._UI._RightTouch.left = this.width/2;
        var opIsRight = GameControler_1.default.GameControler.SetInfo.OPIsRight;
        _this._UI._ItemListBtn.on(Laya.Event.CLICK, null, function () {
            _this._UIManager.Show(ItemListUI_1.default);
        });
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
        this._UI._LeftTouch.on(Laya.Event.CLICK, owner, Listener);
    };
    GameUI.prototype.SetRightTouch = function (owner, Listener) {
        this._UI._RightTouch.on(Laya.Event.CLICK, owner, Listener);
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
},{"./../Utility/Path":32,"./../controler/GameControler":35,"./BaseUI":39,"./ItemListUI":44,"./layaMaxUI":47}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var Path_1 = require("./../Utility/Path");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var PlayerEntity_1 = require("./../Agent/PlayerEntity");
var PlayerGuestAgent_1 = require("./../Agent/PlayerGuestAgent");
var GameAgent_1 = require("./../Agent/GameAgent");
var APP_1 = require("./../controler/APP");
var BaseUI_1 = require("./BaseUI");
var ExtendsItemListUI = /** @class */ (function (_super) {
    __extends(ExtendsItemListUI, _super);
    function ExtendsItemListUI() {
        var _this = _super.call(this) || this;
        _this.m_ItemList = [];
        return _this;
    }
    ExtendsItemListUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("ItemList")));
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
        //this._UIType = BaseEnum.UITypeEnum.Midle;
        _this.UpdateList();
        _this.m_Gold = _this.UI._Gold.text.split("#");
        _this.UI._BG.alpha = 0;
        _this.UI._BG.on(Laya.Event.CLICK, _this, _this.CloseUI);
        return _this;
    }
    ItemListUI.Name = function () {
        return "ItemListUI";
    };
    ItemListUI.prototype.Open = function () {
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnMoneyChange, this.ShowGold, this);
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnItemListChange, this.RefreshList, this);
        this.ShowGold();
        this.UpdateList();
    };
    ItemListUI.prototype.Close = function () {
        APP_1.default.MessageManager.DesRegist(PlayerEntity_1.Player.Event.OnMoneyChange, this.ShowGold, this);
        APP_1.default.MessageManager.DesRegist(PlayerEntity_1.Player.Event.OnItemListChange, this.RefreshList, this);
    };
    ItemListUI.prototype.UpdateList = function () {
        this.m_ItemList = [0, 1];
        this.SetList(this.m_ItemList);
    };
    ItemListUI.prototype.RefreshList = function () {
        this.m_ItemList = [0, 1];
        this.FreshList(this.m_ItemList);
    };
    ItemListUI.prototype.ShowGold = function () {
        if (!this.Showing) {
            return;
        }
        this.m_Gold[1] = "" + PlayerGuestAgent_1.default.GuestAgent.Money;
        this.UI._Gold.text = this.m_Gold[0] + this.m_Gold[1];
    };
    ItemListUI.prototype._RenderHandler = function (cell, index) {
        var roleElement = cell;
        var itemList = GameAgent_1.GameAgent.Agent.ItemList;
        roleElement.Init();
        roleElement.ItemIdx = index;
        roleElement.RegistBuy(this, this.BuyItem);
        roleElement.RegistChoose(this, this.ChooseItem);
        roleElement.IsGray = itemList[index] ? false : true;
        roleElement.Num = itemList[index] ? itemList[index] : 0;
        //roleElement.SetBtn(this.BtnListener.Listener,this.BtnListener.Action);
    };
    ItemListUI.prototype.SetList = function (listArray) {
        //var listArray:Array<any> = this.m_ItemList;
        this.UI._List.hScrollBarSkin = "";
        this.UI._List.renderHandler = new Laya.Handler(this, this._RenderHandler);
        this.UI._List.array = listArray;
        this.UI._List.scrollBar.elasticBackTime = 200; //设置橡皮筋回弹时间。单位为毫秒。
        this.UI._List.scrollBar.elasticDistance = 50;
    };
    ItemListUI.prototype.FreshList = function (idList) {
        this.UI._List.array = idList;
        this.UI._List.refresh();
    };
    ItemListUI.prototype.Update = function () {
    };
    ItemListUI.prototype.BuyItem = function (id) {
        if (!this.Showing)
            return;
        PlayerGuestAgent_1.default.GuestAgent.BuyItem(id);
    };
    ItemListUI.prototype.ChooseItem = function (id) {
        if (!this.Showing)
            return;
        if (GameAgent_1.GameAgent.Agent.ItemList[id]) {
            GameAgent_1.GameAgent.Agent.CurItem = id;
            APP_1.default.UIManager.Close(this);
        }
    };
    ItemListUI.prototype.CloseUI = function () {
        APP_1.default.UIManager.Close(this);
    };
    return ItemListUI;
}(BaseUI_1.default));
exports.default = ItemListUI;
},{"./../Agent/GameAgent":2,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../FrameWork/MessageCenter":10,"./../Utility/Path":32,"./../controler/APP":34,"./BaseUI":39,"./layaMaxUI":47}],45:[function(require,module,exports){
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
},{"../Scene/GuiderManager":28,"./../Base/BaseEnum":5,"./../Game/GameStruct":19,"./../Utility/Path":32,"./../controler/GameControler":35,"./BaseUI":39,"./layaMaxUI":47}],46:[function(require,module,exports){
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
},{"./../BaseUI":39}],47:[function(require,module,exports){
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
},{}]},{},[25])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rvb2wvTGF5YTIuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQWdlbnQvQmFzZUFnZW50LnRzIiwic3JjL0FnZW50L0dhbWVBZ2VudC50cyIsInNyYy9BZ2VudC9QbGF5ZXJFbnRpdHkudHMiLCJzcmMvQWdlbnQvUGxheWVyR3Vlc3RBZ2VudC50cyIsInNyYy9CYXNlL0Jhc2VFbnVtLnRzIiwic3JjL0Jhc2UvQmFzZUZ1bmMudHMiLCJzcmMvQmFzZS9GU00udHMiLCJzcmMvRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9GcmFtZVdvcmsudHMiLCJzcmMvRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXIudHMiLCJzcmMvRnJhbWVXb3JrL1NjZW5lTWFuYWdlci50cyIsInNyYy9GcmFtZVdvcmsvVUlNYW5hZ2VyLnRzIiwic3JjL0dhbWVDb25maWcudHMiLCJzcmMvR2FtZS9BbmltT2JqLnRzIiwic3JjL0dhbWUvQnVmZi50cyIsInNyYy9HYW1lL0NoYXJhY3Rlci50cyIsInNyYy9HYW1lL0dhbWVDYW1lcmEudHMiLCJzcmMvR2FtZS9HYW1lSXRlbS50cyIsInNyYy9HYW1lL0dhbWVTdHJ1Y3QudHMiLCJzcmMvR2FtZS9JbnB1dC50cyIsInNyYy9HYW1lL01vdW50TGluZS50cyIsInNyYy9HYW1lL1BsYXllci50cyIsInNyYy9HYW1lL1BsYXllckN0cmxlci50cyIsInNyYy9HYW1lL1N0ZXAudHMiLCJzcmMvTWFpbi50cyIsInNyYy9TY2VuZS9HYW1lRGlyZWN0b3IudHMiLCJzcmMvU2NlbmUvR2FtZVNjZW5lLnRzIiwic3JjL1NjZW5lL0d1aWRlck1hbmFnZXIudHMiLCJzcmMvU2NlbmUvTG9hZFNjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lUGxheS9HYW1lU2NlbmVQbGF5LnRzIiwic3JjL1V0aWxpdHkvUGF0aC50cyIsInNyYy9VdGlsaXR5L1VJRnVuYy50cyIsInNyYy9jb250cm9sZXIvQVBQLnRzIiwic3JjL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyLnRzIiwic3JjL3NjcmlwdC9JdGVtRWxlbWVudC50cyIsInNyYy9zY3JpcHQvUm9sZUVsZW1lbnQudHMiLCJzcmMvdWkvQkcudHMiLCJzcmMvdWkvQmFzZVVJLnRzIiwic3JjL3VpL0NoYXJhY3RlclVJLnRzIiwic3JjL3VpL0VuZEdhbWVVSS50cyIsInNyYy91aS9FbnRlckdhbWVVSS50cyIsInNyYy91aS9HYW1lVUkudHMiLCJzcmMvdWkvSXRlbUxpc3RVSS50cyIsInNyYy91aS9TZXRQYW5lbFVJLnRzIiwic3JjL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNWQSw2Q0FBOEM7QUFDOUM7SUFHSTtRQUVJLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ2xFLENBQUM7SUFDTCxnQkFBQztBQUFELENBUEEsQUFPQyxJQUFBOzs7OztBQ1BELHlDQUFtQztBQUVuQztJQUErQiw2QkFBUztJQVNwQztlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQVJELHNCQUFXLGtCQUFLO2FBQWhCO1lBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO2FBQ2pDO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBS0Qsc0JBQVcsK0JBQVE7YUFBbkI7WUFFSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBRUQsc0JBQVcscUNBQWM7YUFBekI7WUFFSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO1FBQzlDLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsOEJBQU87YUFBbEI7WUFFSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLENBQUM7YUFPRCxVQUFtQixFQUFTO1lBRXhCLElBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFDakIsT0FBTztZQUNYLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FaQTtJQUVELHNCQUFXLCtCQUFRO2FBQW5CO1lBRUksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQTtRQUN2QyxDQUFDOzs7T0FBQTtJQVFMLGdCQUFDO0FBQUQsQ0F2Q0EsQUF1Q0MsQ0F2QzhCLG1CQUFTLEdBdUN2QztBQXZDWSw4QkFBUzs7OztBQ0Z0QixzREFBZ0Q7QUFDaEQsOERBQXNEO0FBQ3RELElBQWMsTUFBTSxDQTZIbkI7QUE3SEQsV0FBYyxNQUFNO0lBQ2hCO1FBQUE7UUFRQSxDQUFDO1FBTlUsbUJBQWEsR0FBVyxlQUFlLENBQUM7UUFDeEMsNEJBQXNCLEdBQVcsd0JBQXdCLENBQUM7UUFDMUQsNkJBQXVCLEdBQVcseUJBQXlCLENBQUM7UUFDNUQsMkJBQXFCLEdBQVcsdUJBQXVCLENBQUM7UUFDeEQscUJBQWUsR0FBVSxpQkFBaUIsQ0FBQztRQUMzQyxzQkFBZ0IsR0FBVSxrQkFBa0IsQ0FBQztRQUN4RCxZQUFDO0tBUkQsQUFRQyxJQUFBO0lBUlksWUFBSyxRQVFqQixDQUFBO0lBRUQ7UUFzRkk7WUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQVMsQ0FBQyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQTBCLHlCQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDOUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDekIsQ0FBQztRQTdGRCxzQkFBa0Isc0JBQU07aUJBQXhCO2dCQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFHO29CQUN6QixZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDakMsQ0FBQzs7O1dBQUE7UUFXRCxzQkFBVywrQkFBSztpQkFBaEI7Z0JBRUksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ3hCLENBQUM7aUJBQ0QsVUFBaUIsS0FBWTtnQkFFekIsSUFBRyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFDeEI7b0JBQ0ksT0FBTztpQkFDVjtnQkFDRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLENBQUM7OztXQVRBO1FBVUQsc0JBQVcsd0NBQWM7aUJBQXpCO2dCQUVJLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQ2pDLENBQUM7aUJBQ0QsVUFBMEIsS0FBWTtnQkFFbEMsSUFBRyxLQUFLLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUNqQztvQkFDSSxPQUFPO2lCQUNWO2dCQUNELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3pELENBQUM7OztXQVRBO1FBV0Qsc0JBQVcseUNBQWU7aUJBQTFCO2dCQUVJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLENBQUM7aUJBRUQsVUFBMkIsS0FBWTtnQkFFbkMsSUFBRyxLQUFLLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUNsQztvQkFDSSxPQUFPO2lCQUNWO2dCQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO2dCQUNyRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1lBQ25DLENBQUM7OztXQVZBO1FBWUQsc0JBQVcsdUNBQWE7aUJBQXhCO2dCQUdJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNoQyxDQUFDOzs7V0FBQTtRQUVELHNCQUFXLGlDQUFPO2lCQVVsQjtnQkFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsQ0FBQztpQkFiRCxVQUFtQixLQUFZO2dCQUUzQixJQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxFQUMxQjtvQkFDSSxPQUFPO2lCQUNWO2dCQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtnQkFDN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQzs7O1dBQUE7UUFPRCxzQkFBVyxrQ0FBUTtpQkFBbkI7Z0JBRUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7OztXQUFBO1FBYU0sbUNBQVksR0FBbkIsVUFBb0IsRUFBUztZQUV6QixJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRU0sOEJBQU8sR0FBZCxVQUFlLEVBQVM7WUFFcEIsSUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQ3ZCO2dCQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDTCxtQkFBQztJQUFELENBaEhBLEFBZ0hDLElBQUE7SUFoSFksbUJBQVksZUFnSHhCLENBQUE7QUFFTCxDQUFDLEVBN0hhLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQTZIbkI7Ozs7QUNoSUQseUNBQW1DO0FBQ25DO0lBQThDLG9DQUFTO0lBbUJuRDtlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQW5CRCxzQkFBVyw4QkFBVTthQUFyQjtZQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3hDO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsbUNBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDO1FBQ3JDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcseUNBQVc7YUFBdEI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO1FBQzlDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsMkNBQWE7YUFBeEI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBTU0sdUNBQVksR0FBbkIsVUFBb0IsRUFBVTtRQUMxQixNQUFNO1FBQ04sSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFHLEtBQUssR0FBRSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFHO1lBQ3pELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sa0NBQU8sR0FBZCxVQUFlLEVBQVU7UUFDckIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBRyxFQUFFLEdBQUcsQ0FBQyxJQUFHLEtBQUssR0FBRSxDQUFDLEVBQ3BCO1lBQ0ksT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFDcEM7WUFDSSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUNuQyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRU0sdUNBQVksR0FBbkIsVUFBb0IsRUFBRTtRQUVsQixJQUFJLGFBQWEsR0FBaUIsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNyRCxJQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUMsRUFDcEI7WUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7U0FDM0M7SUFDTCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQXhEQSxBQXdEQyxDQXhENkMsbUJBQVMsR0F3RHREOzs7OztBQ3pERCxJQUFjLFFBQVEsQ0FFckI7QUFGRCxXQUFjLFFBQVE7SUFDbEIsSUFBWSxVQUFzQjtJQUFsQyxXQUFZLFVBQVU7UUFBRSx5Q0FBRyxDQUFBO1FBQUMsNkNBQUssQ0FBQTtJQUFBLENBQUMsRUFBdEIsVUFBVSxHQUFWLG1CQUFVLEtBQVYsbUJBQVUsUUFBWTtJQUFBLENBQUM7QUFDdkMsQ0FBQyxFQUZhLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBRXJCOzs7O0FDQUQ7O0dBRUc7QUFDSCxJQUFjLFFBQVEsQ0E2UnJCO0FBN1JELFdBQWMsUUFBUTtJQUNsQixJQUFLLFVBQXNCO0lBQTNCLFdBQUssVUFBVTtRQUFFLHlDQUFHLENBQUE7UUFBQyw2Q0FBSyxDQUFBO0lBQUEsQ0FBQyxFQUF0QixVQUFVLEtBQVYsVUFBVSxRQUFZO0lBQUEsQ0FBQztJQUM1QjtRQUlJO1lBRUksSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDO1FBRUQsc0JBQUksc0JBQUs7aUJBQVQ7Z0JBRUksT0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBQ0QscUJBQU8sR0FBUCxVQUFRLFFBQWlDO1lBRXJDLEtBQUksSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksRUFDM0I7Z0JBQ0ksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsTUFBTSxDQUFDLENBQUM7YUFDdEM7UUFDTCxDQUFDO1FBQ0Q7Ozs7V0FJRztRQUNILGlCQUFHLEdBQUgsVUFBSyxHQUFLLEVBQUUsR0FBVTtZQUVsQixJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFDbEI7Z0JBQ0ksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ2pCO1lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDekIsQ0FBQztRQUNELGlCQUFHLEdBQUgsVUFBSSxHQUFVO1lBRVYsT0FBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRDs7OztXQUlHO1FBQ0gsb0JBQU0sR0FBTixVQUFPLEdBQVU7WUFFYixJQUFJLEdBQUcsR0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUcsR0FBRyxFQUNOO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDakI7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7UUFDRDs7OztXQUlHO1FBQ0gsaUJBQUcsR0FBSCxVQUFJLEdBQVU7WUFFVixJQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ2pCO2dCQUNJLE9BQVEsSUFBSSxDQUFDO2FBQ2hCOztnQkFDRyxPQUFPLEtBQUssQ0FBQztRQUNyQixDQUFDO1FBQ0wsVUFBQztJQUFELENBbEVBLEFBa0VDLElBQUE7SUFsRVksWUFBRyxNQWtFZixDQUFBO0lBRUQ7UUFJSTtRQUVBLENBQUM7UUFDRCxzQkFBSSx1QkFBSztpQkFBVDtnQkFFSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQztpQkFDRCxVQUFVLEtBQU87Z0JBRWIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDeEIsQ0FBQzs7O1dBSkE7UUFLRCxzQkFBSSxzQkFBSTtpQkFBUjtnQkFFSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQztpQkFDRCxVQUFTLElBQVk7Z0JBR2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUM7OztXQUxBO1FBTUwsV0FBQztJQUFELENBeEJBLEFBd0JDLElBQUE7SUF4QlksYUFBSSxPQXdCaEIsQ0FBQTtJQUVEO1FBQUE7UUE0QkEsQ0FBQztRQXpCRywyQkFBUSxHQUFSLFVBQVMsSUFBWTtZQUVqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFHLElBQUksQ0FBQyxTQUFTLEVBQ2pCO2dCQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUM5QjtpQkFDRDtnQkFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUN6QjtRQUNMLENBQUM7UUFDRCx5QkFBTSxHQUFOO1lBRUksSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNsQyxJQUFHLElBQUksRUFDUDtnQkFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQ3hDO2lCQUNEO2dCQUNJLElBQUksR0FBRyxJQUFJLElBQUksRUFBSyxDQUFDO2FBQ3hCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVMLGVBQUM7SUFBRCxDQTVCQSxBQTRCQyxJQUFBO0lBRUQ7UUFLSTtZQUVJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLENBQUM7UUFFRCxzQkFBSSw0QkFBSztpQkFBVDtnQkFFSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDdkIsQ0FBQzs7O1dBQUE7UUFFTSwyQkFBTyxHQUFkO1lBRUksSUFBRyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsRUFDaEI7Z0JBQ0ksT0FBUTthQUNYO1lBQ0QsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDO1lBQ3hCLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2QsVUFBVTtZQUNWLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQ25CO2dCQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVNLHdCQUFJLEdBQVgsVUFBWSxLQUFPO1lBRWYsSUFBSSxJQUFJLEdBQVcsSUFBSSxJQUFJLEVBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFFTSw0QkFBUSxHQUFmLFVBQWdCLElBQVk7WUFFeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFHLENBQUMsRUFDbEI7Z0JBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7YUFDckI7aUJBQ0Q7Z0JBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1lBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDTSx5QkFBSyxHQUFaO1lBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUNELHNCQUFXLCtCQUFRO2lCQUFuQjtnQkFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDekIsQ0FBQzs7O1dBQUE7UUFDRCxzQkFBVyxnQ0FBUztpQkFBcEI7Z0JBRUksSUFBRyxJQUFJLENBQUMsS0FBSyxFQUNiO29CQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQzNCO1lBQ0wsQ0FBQzs7O1dBQUE7UUFDRCxzQkFBVywrQkFBUTtpQkFBbkI7Z0JBRUksT0FBUSxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzFCLENBQUM7OztXQUFBO1FBQ0Qsc0JBQVcsZ0NBQVM7aUJBQXBCO2dCQUVJLElBQUcsSUFBSSxDQUFDLE1BQU0sRUFDZDtvQkFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2lCQUM1QjtZQUNMLENBQUM7OztXQUFBO1FBQ0wsZ0JBQUM7SUFBRCxDQWxGQSxBQWtGQyxJQUFBO0lBbEZZLGtCQUFTLFlBa0ZyQixDQUFBO0lBRUQ7UUFLSTtZQUVJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxRQUFRLEVBQUssQ0FBQztZQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksU0FBUyxFQUFLLENBQUM7UUFDekMsQ0FBQztRQUVNLG9CQUFJLEdBQVgsVUFBWSxLQUFPO1lBRWYsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRU0sbUJBQUcsR0FBVjtZQUVJLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0MsSUFBRyxJQUFJLEVBQ1A7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3JCO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUVELHNCQUFJLHdCQUFLO2lCQUFUO2dCQUVJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDakMsQ0FBQzs7O1dBQUE7UUFDTCxZQUFDO0lBQUQsQ0FqQ0EsQUFpQ0MsSUFBQTtJQWpDWSxjQUFLLFFBaUNqQixDQUFBO0lBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztXQXVDTztBQUVQLENBQUMsRUE3UmEsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUE2UnJCOzs7O0FDbFNELElBQWMsR0FBRyxDQWtFaEI7QUFsRUQsV0FBYyxLQUFHO0lBTWI7UUFLSSxhQUFhLFVBQW1CO1lBQW5CLDJCQUFBLEVBQUEsaUJBQW1CO1lBRTVCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQ2pDLENBQUM7UUFFRCxzQkFBSSx5QkFBUTtpQkFBWjtnQkFFSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQzs7O1dBQUE7UUFFRDs7O1dBR0c7UUFDSSx5QkFBVyxHQUFsQixVQUFtQixLQUFPO1lBRXRCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckIsSUFBSSxRQUFRLEdBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNqQyxJQUFHLFFBQVEsRUFDWDtnQkFDSSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDbEI7WUFDRCxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ2pCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztRQUMvQixDQUFDO1FBRU0sb0JBQU0sR0FBYjtZQUVJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDL0IsSUFBRyxRQUFRLEVBQ1g7Z0JBQ0ksUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ3JCO1FBQ0wsQ0FBQztRQUNMLFVBQUM7SUFBRCxDQXhDQSxBQXdDQyxJQUFBO0lBeENxQixTQUFHLE1Bd0N4QixDQUFBO0lBRUQ7UUFJSSxlQUFZLEtBQWlCO1lBQWpCLHNCQUFBLEVBQUEsWUFBaUI7WUFFekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQztRQUVNLHdCQUFRLEdBQWYsVUFBZ0IsS0FBVTtZQUV0QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDO1FBS0wsWUFBQztJQUFELENBakJBLEFBaUJDLElBQUE7SUFqQnFCLFdBQUssUUFpQjFCLENBQUE7QUFDTCxDQUFDLEVBbEVhLEdBQUcsR0FBSCxXQUFHLEtBQUgsV0FBRyxRQWtFaEI7Ozs7QUNsRUQ7SUFBQTtJQUdBLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FIQSxBQUdDLElBQUE7Ozs7O0FDRkQsK0NBQTRDO0FBQzVDO0lBSUk7UUFFSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksbUJBQVEsQ0FBQyxHQUFHLEVBQWUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsc0JBQVcsZUFBRTthQUFiO1lBRUksSUFBRyxTQUFTLENBQUMsR0FBRyxJQUFFLElBQUksRUFDdEI7Z0JBQ0ksU0FBUyxDQUFDLEdBQUcsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO2FBQ25DO1lBQ0QsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBQ0QsYUFBYTtJQUNOLDBCQUFNLEdBQWI7UUFFSSxJQUFJLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FBYyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFFLFVBQUMsR0FBZSxFQUFHLEdBQVU7WUFDL0MsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQTtRQUNGLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSw4QkFBVSxHQUFqQixVQUEwQyxJQUFnQztRQUV0RSxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUNoQztZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFNLENBQUM7U0FDN0M7UUFDRCxJQUFJLE1BQU0sR0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNyQyxPQUFRLE1BQU0sQ0FBQztJQUNuQixDQUFDO0lBRU0sOEJBQVUsR0FBakIsVUFBeUMsSUFBZ0M7UUFDckUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQU0sQ0FBQztJQUM5QyxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQXpDQSxBQXlDQyxJQUFBOzs7OztBQzNDRDs7R0FFRztBQUNILDZDQUF3QztBQUN4QyxJQUFjLFNBQVMsQ0E2SXRCO0FBN0lELFdBQWMsU0FBUztJQUNOLG1CQUFTLEdBQ2xCO1FBQ0ksV0FBVyxFQUFFLGFBQWE7UUFDMUIsVUFBVSxFQUFFLFlBQVk7UUFDeEIsWUFBWSxFQUFFLGNBQWM7S0FDL0IsQ0FBQTtJQUVMO1FBQW1DLGlDQUFXO1FBb0IxQztZQUFBLFlBQ0ksaUJBQU8sU0FFVjtZQURHLEtBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDOztRQUN6QixDQUFDO1FBdEJNLGtCQUFJLEdBQVg7WUFDSSxPQUFPLGVBQWUsQ0FBQztRQUMzQixDQUFDO1FBSUQ7OztXQUdHO1FBQ0ssaUNBQVMsR0FBakIsVUFBa0IsSUFBWTtZQUMxQixJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFDLElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFHO2dCQUN0QyxLQUFLLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7YUFDakM7WUFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBTUQ7Ozs7O1VBS0U7UUFDRiw4QkFBTSxHQUFOLFVBQU8sSUFBWSxFQUFFLE1BQWtCLEVBQUUsUUFBZ0I7WUFDckQsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxJQUFJLE9BQU8sR0FBYSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdkQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QixPQUFPLFFBQVEsQ0FBQTtRQUNuQixDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSCxpQ0FBUyxHQUFULFVBQVUsSUFBWSxFQUFFLE1BQWtCLEVBQUUsUUFBZ0I7WUFDeEQsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNsQyxDQUFDO1FBRUQ7OztXQUdHO1FBQ0gsbUNBQVcsR0FBWCxVQUFZLElBQVk7WUFDcEIsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSCw0QkFBSSxHQUFKLFVBQUssSUFBWSxFQUFFLEtBQWlCO1lBQWpCLHNCQUFBLEVBQUEsWUFBaUI7WUFDaEMsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDTSw4QkFBTSxHQUFiO1FBRUEsQ0FBQztRQUNMLG9CQUFDO0lBQUQsQ0F0RUEsQUFzRUMsQ0F0RWtDLHFCQUFXLEdBc0U3QztJQXRFWSx1QkFBYSxnQkFzRXpCLENBQUE7SUFDRCxJQUFJO0lBQ0o7UUFVSSxrQkFBWSxRQUFnQixFQUFFLE1BQTJCO1lBQ3JELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLENBQUM7UUFWRDs7O1dBR0c7UUFDSCwwQkFBTyxHQUFQLFVBQVEsS0FBaUI7WUFBakIsc0JBQUEsRUFBQSxZQUFpQjtZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFNTCxlQUFDO0lBQUQsQ0FmQSxBQWVDLElBQUE7SUFmWSxrQkFBUSxXQWVwQixDQUFBO0lBRUQsSUFBSTtJQUNKO1FBRUk7WUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakIsQ0FBQztRQUNEOzs7VUFHRTtRQUNGLG9CQUFHLEdBQUgsVUFBSSxHQUFhO1lBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNEOzs7O1VBSUU7UUFDRixvQkFBRyxHQUFILFVBQUksTUFBa0IsRUFBRSxRQUF1QjtZQUF2Qix5QkFBQSxFQUFBLGVBQXVCO1lBQzNDLElBQUksUUFBUSxHQUFvQixJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2xELEtBQUssSUFBSSxNQUFNLEdBQVcsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsTUFBTSxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFHO2dCQUNuRSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVCLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUc7b0JBQ3JELFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUMzQixPQUFPO2lCQUNWO2FBQ0o7UUFDTCxDQUFDO1FBQ0QsSUFBSTtRQUNKLHNCQUFLLEdBQUw7WUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQTtRQUMxQixDQUFDO1FBQ0Q7OztVQUdFO1FBQ0Ysd0JBQU8sR0FBUCxVQUFRLEtBQVU7WUFDZCxJQUFJLFFBQVEsR0FBb0IsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNsRCxLQUFLLElBQUksTUFBTSxHQUFXLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRztnQkFDbkUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZCO1FBQ0wsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQTFDQSxBQTBDQyxJQUFBO0lBMUNZLGdCQUFNLFNBMENsQixDQUFBO0FBQ0wsQ0FBQyxFQTdJYSxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQTZJdEI7Ozs7QUMvSUQsMERBQW9EO0FBRXBELDBDQUFzQztBQUV0QztJQUEwQyxnQ0FBVztJQWtCakQ7UUFBQSxZQUNJLGlCQUFPLFNBTVY7UUFMRyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVuQyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksYUFBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZDLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQzs7SUFDOUQsQ0FBQztJQXJCRCxzQkFBSSxrQ0FBUTthQUFaO1lBQ0ksSUFBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVE7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7WUFDcEMsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxnQ0FBTTthQUFWO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTtJQUVNLGlCQUFJLEdBQVg7UUFDSSxPQUFPLGNBQWMsQ0FBQztJQUMxQixDQUFDO0lBV00sa0NBQVcsR0FBbEIsVUFBbUIsUUFBeUI7UUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEMsSUFBRyxRQUFRLENBQUMsUUFBUSxFQUNwQjtZQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoRDtJQUNMLENBQUM7SUFFTSw2QkFBTSxHQUFiO1FBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQU1ELHNCQUFJLDRCQUFFO2FBY047WUFFSSxPQUFRLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDckIsQ0FBQzthQWpCRCxVQUFPLEVBQWU7WUFDbEIsSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDTCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7Z0JBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO2FBQ2pCO1lBQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFLTCxtQkFBQztBQUFELENBOURBLEFBOERDLENBOUR5QyxxQkFBVyxHQThEcEQ7O0FBRUQ7O0VBRUU7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQW1FRTs7OztBQzVJRiw2Q0FBd0M7QUFFeEMsK0NBQTZDO0FBQzdDLDhDQUE0QztBQUU1QyxJQUFLLFFBR0o7QUFIRCxXQUFLLFFBQVE7SUFDVCwyQ0FBTSxDQUFBO0lBQ04sMkNBQU0sQ0FBQTtBQUNWLENBQUMsRUFISSxRQUFRLEtBQVIsUUFBUSxRQUdaO0FBQ0Q7SUFBdUMsNkJBQVc7SUFnQzlDO1FBQUEsWUFDSSxpQkFBTyxTQWNWO1FBYkcsSUFBSSxPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7UUFDMUIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUV0QixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5QixLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFJLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztJQUM5RCxDQUFDO0lBcENPLDJCQUFPLEdBQWYsVUFBZ0IsSUFBYztRQUMxQixJQUFJLE9BQU8sR0FBYSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNoQixPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNuQixPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNsQixRQUFRLElBQUksRUFBRztZQUNYLEtBQUssUUFBUSxDQUFDLE1BQU07Z0JBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO2dCQUM1QixNQUFNO1lBQ1Y7Z0JBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7Z0JBQzNCLE1BQU07U0FDYjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxjQUFJLEdBQVg7UUFDSSxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBbUJELGdDQUFZLEdBQVo7UUFFSSxJQUFJLEtBQUssR0FBRyxlQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDOUMsT0FBTyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ3hDLENBQUM7SUFFTSwwQkFBTSxHQUFiO1FBQ0ksUUFBUTtRQUNSLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRztZQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFFTSw0QkFBUSxHQUFmLFVBQWdCLElBQWlCO1FBQzdCLEtBQUssSUFBSSxHQUFHLEdBQVcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFHO1lBQ3RELElBQUksRUFBRSxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFXLENBQUM7WUFDaEQsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztJQUVNLHlCQUFLLEdBQVo7SUFFQSxDQUFDO0lBRUQsd0JBQUksR0FBSixVQUF1QixPQUFpRDtRQUNwRSxJQUFJLEdBQUcsR0FBVyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDakMsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxLQUFLLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3hFLElBQUksSUFBSSxHQUFnQixJQUFJLENBQUM7UUFDN0IsUUFBUSxLQUFLLENBQUMsTUFBTSxFQUFHO1lBQ25CLE9BQU87WUFDUCxLQUFLLG1CQUFRLENBQUMsVUFBVSxDQUFDLEtBQUs7Z0JBQzFCLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUN4QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxJQUFJLENBQUMsRUFBRztvQkFDcEMsVUFBVTtvQkFDViw0Q0FBNEM7aUJBQy9DO2dCQUNELE1BQU07WUFDVixhQUFhO1lBQ2I7Z0JBQ0ksSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLE1BQU07U0FDYjtRQUVELElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDeEMsVUFBVTtRQUNWLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFHO1lBQ2hDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQVcsQ0FBQztZQUM3RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87Z0JBQ2YsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFZixPQUFPLEtBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQseUJBQUssR0FBTCxVQUFNLEVBQVU7UUFDWixFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2IsSUFBSSxJQUFJLEdBQWdCLElBQUksQ0FBQztRQUM3QixRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUc7WUFDaEIsT0FBTztZQUNQLEtBQUssbUJBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSztnQkFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDO29CQUNyQixhQUFhO29CQUNiLGtEQUFrRDtvQkFDbEQsTUFBTTtZQUNkLGFBQWE7WUFDYjtnQkFDSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTTtTQUNiO1FBQ0QsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUc7WUFDZixJQUFJLE1BQU0sR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQVcsQ0FBQztZQUM3RCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRUQsZ0NBQVksR0FBWjtRQUNJLElBQUksRUFBRSxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBVyxDQUFDO1FBQzNGLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELFlBQVk7SUFDWix5QkFBSyxHQUFMO1FBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMvQixPQUFPLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDdkIsSUFBSSxPQUFPLEdBQVcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBLGdCQUFnQjtZQUNyRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZCO1FBQ0QsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDekIsT0FBTyxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQ3ZCLElBQUksT0FBTyxHQUFXLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFXLENBQUMsQ0FBQSxnQkFBZ0I7WUFDckUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QjtJQUNMLENBQUM7SUFFRCwrQkFBVyxHQUFYLFVBQVksSUFBWTtRQUNwQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLEVBQUUsR0FBRyxFQUFFLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqQyxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFDRCwrQkFBVyxHQUFYLFVBQVksSUFBWSxFQUFFLEVBQVU7UUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDeEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBcEtNLG1CQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLG9CQUFVLEdBQUcsSUFBSSxDQUFDO0lBcUs3QixnQkFBQztDQXZLRCxBQXVLQyxDQXZLc0MscUJBQVcsR0F1S2pEO2tCQXZLb0IsU0FBUzs7OztBQ1Q5QixnR0FBZ0c7QUFDaEcsb0RBQThDO0FBQzlDLG9EQUE4QztBQUM5Qzs7RUFFRTtBQUNGO0lBYUk7SUFBYyxDQUFDO0lBQ1IsZUFBSSxHQUFYO1FBQ0ksSUFBSSxHQUFHLEdBQWEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFDN0MsR0FBRyxDQUFDLHVCQUF1QixFQUFDLHFCQUFXLENBQUMsQ0FBQztRQUN6QyxHQUFHLENBQUMsdUJBQXVCLEVBQUMscUJBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFqQk0sZ0JBQUssR0FBUSxHQUFHLENBQUM7SUFDakIsaUJBQU0sR0FBUSxJQUFJLENBQUM7SUFDbkIsb0JBQVMsR0FBUSxZQUFZLENBQUM7SUFDOUIscUJBQVUsR0FBUSxNQUFNLENBQUM7SUFDekIsaUJBQU0sR0FBUSxLQUFLLENBQUM7SUFDcEIsaUJBQU0sR0FBUSxNQUFNLENBQUM7SUFDckIscUJBQVUsR0FBSyxhQUFhLENBQUM7SUFDN0Isb0JBQVMsR0FBUSxFQUFFLENBQUM7SUFDcEIsZ0JBQUssR0FBUyxLQUFLLENBQUM7SUFDcEIsZUFBSSxHQUFTLEtBQUssQ0FBQztJQUNuQix1QkFBWSxHQUFTLEtBQUssQ0FBQztJQUMzQiw0QkFBaUIsR0FBUyxJQUFJLENBQUM7SUFPMUMsaUJBQUM7Q0FuQkQsQUFtQkMsSUFBQTtrQkFuQm9CLFVBQVU7QUFvQi9CLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7OztBQzFCbEIsMENBQW9DO0FBQ3BDLDhEQUFvRDtBQUNwRCwwQ0FBc0M7QUFDckM7O0VBRUU7QUFDSCxJQUFjLE9BQU8sQ0FxSHBCO0FBckhELFdBQWMsT0FBTztJQUVqQjtRQUVJLElBQUksSUFBSSxHQUFVLFdBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0MsSUFBSSxLQUFLLEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELEtBQUssSUFBSSxLQUFLLEdBQUUsQ0FBQyxFQUFDLEtBQUssR0FBRyxFQUFFLEVBQUMsRUFBRSxLQUFLLEVBQ3BDO1lBQ0ksVUFBVSxDQUFXLFFBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFSZSxZQUFJLE9BUW5CLENBQUE7SUFDRCxvQkFBbUQsU0FBb0UsRUFBQyxLQUFtQjtRQUV2SSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRCxJQUFHLE9BQU8sSUFBRSxJQUFJO1lBQ1osT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBTmUsa0JBQVUsYUFNekIsQ0FBQTtJQUVEO1FBQW1DLCtCQUFhO1FBVzVDLHFCQUFZLElBQVcsRUFBQyxLQUEwQjtZQUExQixzQkFBQSxFQUFBLFlBQTBCO1lBQWxELFlBRUksaUJBQU8sU0FLVjtZQUpHLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNCLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUMsS0FBSSxFQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7UUFDdEQsQ0FBQztRQWhCRCwyQkFBSyxHQUFMO1lBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsYUFBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzFDLENBQUM7UUFhUyxnQ0FBVSxHQUFwQjtZQUVJLElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUN4QjtnQkFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBS0QsVUFBVTtRQUNBLGlDQUFXLEdBQXJCO1lBRUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQ0QscUNBQWUsR0FBZjtZQUVJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQTNDQSxBQTJDQyxDQTNDa0MsSUFBSSxDQUFDLFFBQVEsR0EyQy9DO0lBRUQ7UUFBOEIsNEJBQVc7UUFhckMsa0JBQVksSUFBVyxFQUFDLEtBQThCO1lBQTlCLHNCQUFBLEVBQUEsWUFBOEI7WUFBdEQsWUFFSSxrQkFBTSxJQUFJLEVBQUMsS0FBSyxDQUFDLFNBRXBCO1lBREcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBQy9ELENBQUM7UUFmTSxhQUFJLEdBQVg7WUFFSSxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBRUQsNEJBQVMsR0FBVCxVQUFXLE1BQW9CO1lBRTNCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLGlCQUFNLEtBQUssV0FBRSxDQUFDO1FBQ2xCLENBQUM7UUFRRCxVQUFVO1FBQ0Esa0NBQWUsR0FBekI7WUFFSSxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFDLFFBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxVQUFVO1FBQ0EsOEJBQVcsR0FBckI7WUFFSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUNwQix1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxRQUFRO1FBQ0UsaUNBQWMsR0FBeEI7WUFFSSxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDdkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFDLFFBQVEsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUN0RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUMsR0FBRyxFQUNoRDtnQkFDSSxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQXBEQSxBQW9EQyxDQXBENkIsV0FBVyxHQW9EeEM7SUFwRFksZ0JBQVEsV0FvRHBCLENBQUE7QUFDTCxDQUFDLEVBckhhLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQXFIcEI7Ozs7QUMzSEQsdUNBQWlDO0FBQ2pDLHVEQUF3RDtBQUN4RCxpQ0FBZ0M7QUFLaEMsOERBQW9EO0FBRXBELElBQWMsVUFBVSxDQXNJdkI7QUF0SUQsV0FBYyxVQUFVO0lBQ3BCO1FBeUJJLHdCQUFZLElBQW1CLEVBQUUsR0FBZTtZQUFmLG9CQUFBLEVBQUEsT0FBZTtZQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBekJELCtCQUFNLEdBQU47UUFDQSxDQUFDO1FBQ0QsbUNBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBQ0QsOEJBQUssR0FBTCxVQUFNLE1BQWM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsVUFBVTtZQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUc7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNyQjtRQUNMLENBQUM7UUFFRCxpQ0FBUSxHQUFSO1lBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQVNMLHFCQUFDO0lBQUQsQ0EvQkEsQUErQkMsSUFBQTtJQS9CWSx5QkFBYyxpQkErQjFCLENBQUE7SUFDRDtRQUFzQiwyQkFBYztRQXNCaEMsaUJBQVksS0FBbUIsRUFBRSxLQUFrQjtZQUF2QyxzQkFBQSxFQUFBLFdBQW1CO1lBQUUsc0JBQUEsRUFBQSxVQUFrQjtZQUFuRCxZQUNJLGtCQUFNLGVBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FNN0M7WUFMRyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixLQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQzs7UUFFckIsQ0FBQztRQXpCRCxzQkFBVyxjQUFHO2lCQUFkO2dCQUNJLE9BQU8sQ0FBQyxDQUFDO1lBQ2IsQ0FBQzs7O1dBQUE7UUFDRCx1QkFBSyxHQUFMLFVBQU0sTUFBYztZQUNoQixpQkFBTSxLQUFLLFlBQUMsTUFBTSxDQUFDLENBQUE7WUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXpGLElBQUksT0FBTyxHQUFHLElBQUksOEJBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDekIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQix1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLGFBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzlFLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBWUQsd0JBQU0sR0FBTjtZQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUc7Z0JBQ3RCLE9BQU87YUFDVjtZQUNELElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUc7Z0JBQy9DLElBQUksSUFBSSxHQUFTLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNqRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBRXhCLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzFELGlCQUFNLFFBQVEsV0FBRSxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQTVDQSxBQTRDQyxDQTVDcUIsY0FBYyxHQTRDbkM7SUFDRDtRQUEwQiwrQkFBYztRQUtwQyxxQkFBWSxJQUFnQjtZQUFoQixxQkFBQSxFQUFBLFFBQWdCO21CQUN4QixrQkFBTSxlQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDO1lBQzdDLG9EQUFvRDtRQUN4RCxDQUFDO1FBTkQsc0JBQVcsa0JBQUc7aUJBQWQ7Z0JBQ0ksT0FBTyxDQUFDLENBQUM7WUFDYixDQUFDOzs7V0FBQTtRQUtELDRCQUFNLEdBQU47WUFDSTs7Ozs7Y0FLRTtRQUNOLENBQUM7UUFDTCxrQkFBQztJQUFELENBakJBLEFBaUJDLENBakJ5QixjQUFjLEdBaUJ2QztJQUVEO1FBQXVCLDRCQUFjO1FBV2pDLGtCQUFZLFNBQXFCLEVBQUUsUUFBd0I7WUFBL0MsMEJBQUEsRUFBQSxhQUFxQjtZQUFFLHlCQUFBLEVBQUEsZUFBd0I7WUFBM0QsWUFDSSxrQkFBTSxlQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsU0FJL0I7WUFIRyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O1FBQ3pCLENBQUM7UUFiRCx3QkFBSyxHQUFMLFVBQU0sTUFBYztZQUNoQixpQkFBTSxLQUFLLFlBQUMsTUFBTSxDQUFDLENBQUE7WUFDbkIsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxhQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuRyxDQUFDO1FBQ0QsMkJBQVEsR0FBUjtZQUNJLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDMUQsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDckIsQ0FBQztRQVFPLHlCQUFNLEdBQWQsVUFBZSxPQUFnQjtZQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFHO2dCQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDL0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3BCO1lBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRztnQkFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFDTyxnQ0FBYSxHQUFyQjtZQUNJLElBQUksSUFBWSxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDO2dCQUNsQixJQUFJLEdBQUcsRUFBRSxDQUFDOztnQkFFVixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3BELHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FwQ0EsQUFvQ0MsQ0FwQ3NCLGNBQWMsR0FvQ3BDO0FBQ0wsQ0FBQyxFQXRJYSxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQXNJdkI7Ozs7QUMvSUQsSUFBYyxTQUFTLENBa0N0QjtBQWxDRCxXQUFjLFNBQVM7SUFFbkIsSUFBWSxRQU9YO0lBUEQsV0FBWSxRQUFRO1FBRWhCLHlDQUFLLENBQUE7UUFDTCxxQ0FBRyxDQUFBO1FBQ0gsdUNBQUksQ0FBQTtRQUNKLHVDQUFJLENBQUE7UUFDSiwrQ0FBUSxDQUFBO0lBQ1osQ0FBQyxFQVBXLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBT25CO0lBQ0QsSUFBSSxRQUErQixDQUFDO0lBQ3BDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUNuQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUNuQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMvQixRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNqQyx3QkFBZ0MsUUFBaUI7UUFFN0MsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUhlLHdCQUFjLGlCQUc3QixDQUFBO0lBRUQ7UUFHSSwyQkFBYSxlQUE2QjtZQUV0QyxJQUFJLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFDTSx1Q0FBVyxHQUFsQixVQUFvQixRQUFRO1FBRzVCLENBQUM7UUFDTCx3QkFBQztJQUFELENBWEEsQUFXQyxJQUFBO0lBWFksMkJBQWlCLG9CQVc3QixDQUFBO0FBQ0wsQ0FBQyxFQWxDYSxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQWtDdEI7Ozs7QUNoQ0QsT0FBTztBQUNQO0lBQXdDLDhCQUFXO0lBbUMvQztRQUFBLFlBRUksaUJBQU8sU0FZVjtRQVhHLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUN6QyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pELEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsbURBQW1EO1FBQ25ELEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEtBQUksRUFBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQzs7UUFDL0Msc0NBQXNDO1FBQ3RDLG1CQUFtQjtRQUNsQixNQUFNO0lBQ1gsQ0FBQztJQTFDRCw2QkFBUSxHQUFSLFVBQVMsTUFBYTtRQUVsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsMEJBQUssR0FBTCxVQUFNLFNBQXNCLEVBQUMsTUFBbUIsRUFBQyxNQUFhO1FBRTFELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFFRCxTQUFTO0lBQ1QsK0JBQVUsR0FBVjtRQUVJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUNELHNCQUFJLGdDQUFRO2FBSVo7WUFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNDLENBQUM7YUFQRCxVQUFhLEVBQWU7WUFFeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBcUJPLDRCQUFPLEdBQWY7UUFFSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRXpCLENBQUM7SUFDTCxpQkFBQztBQUFELENBdkRBLEFBdURDLENBdkR1QyxJQUFJLENBQUMsTUFBTSxHQXVEbEQ7O0FBRUQ7SUFLSSw4QkFBYSxNQUFpQixFQUFDLE1BQWtDO1FBQWxDLHVCQUFBLEVBQUEsYUFBa0M7UUFFN0QsSUFBRyxNQUFNLElBQUksSUFBSSxFQUNqQjtZQUNHLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQWRBLEFBY0MsSUFBQTtBQUVEO0lBQStCLG9DQUFvQjtJQTJCL0MsMEJBQVksTUFBaUIsRUFBQyxNQUFrQztRQUFsQyx1QkFBQSxFQUFBLGFBQWtDO2VBRTVELGtCQUFNLE1BQU0sRUFBQyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQTVCRCxpQ0FBTSxHQUFOO1FBRUksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFFLElBQUksSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQ2pEO1lBQ0ksT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ2pELFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUMsSUFBSSxFQUN4QjtZQUNJLFFBQVEsQ0FBQyxDQUFDLElBQUksTUFBTSxHQUFDLEdBQUcsQ0FBQztTQUM1QjtRQUNELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBQyxJQUFJLEVBQzFCO1lBQ0ksUUFBUSxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUMsR0FBRyxDQUFDO1NBQzdCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUUsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQU1MLHVCQUFDO0FBQUQsQ0EvQkEsQUErQkMsQ0EvQjhCLG9CQUFvQixHQStCbEQ7Ozs7QUMzR0QsMkNBQXVDO0FBQ3ZDLCtCQUFpQztBQUNqQyw4REFBc0Q7QUFDdEQsMENBQXNDO0FBQ3RDLDZDQUF5QztBQUd6QywwQ0FBb0M7QUFFcEMsK0NBQThDO0FBQzlDLGlDQUFnQztBQUNoQyw4REFBb0Q7QUFJcEQsSUFBYyxJQUFJLENBbzBCakI7QUFwMEJELFdBQWMsSUFBSTtJQUVkLE1BQU07SUFDTixJQUFNLE1BQU0sR0FBVSxNQUFNLENBQUM7SUFDN0IsSUFBTSxPQUFPLEdBQVMsT0FBTyxDQUFBO0lBQzdCLElBQVksU0FHWDtJQUhELFdBQVksU0FBUztRQUVqQix5Q0FBSSxDQUFBO0lBQ1IsQ0FBQyxFQUhXLFNBQVMsR0FBVCxjQUFTLEtBQVQsY0FBUyxRQUdwQjtJQUNELElBQVksUUFZWDtJQVpELFdBQVksUUFBUTtRQUNoQix1Q0FBTSxDQUFBO1FBQ04seUNBQUssQ0FBQTtRQUNMLHVDQUFJLENBQUE7UUFDSix5Q0FBSyxDQUFBO1FBQ0wsdUNBQUksQ0FBQTtRQUNKLDhDQUFVLENBQUE7UUFDVixzREFBVyxDQUFBO1FBQ1gsc0NBQUcsQ0FBQTtRQUNILHdDQUFJLENBQUE7UUFDSixrREFBUyxDQUFBO1FBQ1Qsd0NBQU8sQ0FBQTtJQUNYLENBQUMsRUFaVyxRQUFRLEdBQVIsYUFBUSxLQUFSLGFBQVEsUUFZbkI7SUFFRDtRQUlJLHNCQUFhLElBQWEsRUFBQyxHQUFVO1lBRWpDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLENBQUM7UUFDTCxtQkFBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBVFksaUJBQVksZUFTeEIsQ0FBQTtJQUVELE1BQU07SUFDTjtRQUlJO1lBRUksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQUUzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBRXhELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBRTFELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7WUFDN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBRWhFLGdCQUFnQixFQUFHLENBQUM7UUFDeEIsQ0FBQztRQUVELG1DQUFjLEdBQWQsVUFBZSxLQUFZO1lBRXZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCx1Q0FBa0IsR0FBbEIsVUFBbUIsS0FBWTtZQUUzQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQsNkJBQVEsR0FBUixVQUFTLEtBQVksRUFBRSxPQUF5QjtZQUU1QyxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztZQUMzQyxLQUFLLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFDekQ7Z0JBQ0ksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxJQUFJLEdBQWdCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFELElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQ2hCO29CQUNJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pCO2FBQ0o7WUFDRCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQWhEQSxBQWdEQyxJQUFBO0lBaERZLGVBQVUsYUFnRHRCLENBQUE7SUFFRCxnQkFBZ0I7SUFDaEI7UUFjSSxXQUFXO1FBQ1gsWUFBWTtRQUNaLGtCQUFrQjtRQUNsQixxQkFBcUI7UUFDckIsb0JBQWEsS0FBWSxFQUFDLEdBQVUsRUFBQyxRQUFpQixFQUFDLFVBQXFCO1lBQXJCLDJCQUFBLEVBQUEsY0FBcUI7WUFFeEUsSUFBRyxHQUFHLElBQUksU0FBUztnQkFDWCxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLElBQUcsVUFBVSxJQUFJLFNBQVM7Z0JBQ3RCLFlBQVk7Z0JBQ1osVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNuQixjQUFjO1lBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBUyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzNCLENBQUM7UUFDRCxzQkFBSSw2QkFBSztpQkFBVDtnQkFFSSxPQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ2pDLENBQUM7OztXQUFBO1FBQ0QsT0FBTztRQUNQLDRCQUFPLEdBQVAsVUFBUSxLQUFZO1lBRWhCLElBQUcsS0FBSyxHQUFDLElBQUksQ0FBQyxZQUFZLEVBQzFCO2dCQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7WUFDRCxJQUFHLEtBQUssSUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQ3RDO2dCQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7UUFDTCxDQUFDO1FBQ0QsT0FBTztRQUNQLDJCQUFNLEdBQU4sVUFBTyxVQUFpQjtZQUVwQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzNCLEtBQUksSUFBSSxLQUFLLEdBQVUsQ0FBQyxFQUFFLEtBQUssR0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxFQUFFLEtBQUssRUFDN0Q7Z0JBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDNUI7WUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzdCLEtBQUksSUFBSSxRQUFRLEdBQVUsQ0FBQyxFQUFFLFFBQVEsR0FBQyxPQUFPLEVBQUMsRUFBRSxRQUFRLEVBQ3hEO2dCQUNJLElBQUksU0FBUyxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBRyxDQUFDLENBQUM7YUFDaEM7UUFDTCxDQUFDO1FBRUQsOEJBQVMsR0FBVCxVQUFXLEtBQVk7WUFFbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7UUFDTCxpQkFBQztJQUFELENBdkVBLEFBdUVDLElBQUE7SUF2RVksZUFBVSxhQXVFdEIsQ0FBQTtJQUVELElBQUksS0FBYSxDQUFDO0lBQ2xCO1FBRUksSUFBRyxLQUFLLEVBQ1I7WUFDSSxPQUFRO1NBQ1g7UUFDRCxLQUFLLEdBQUUsSUFBSSxDQUFDO1FBQ1osS0FBSSxJQUFJLE1BQU0sSUFBSSx1QkFBVSxDQUFDLFlBQVksRUFDekM7WUFDSSxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsSUFBRyxJQUFJLElBQUksQ0FBQyxFQUNaO2dCQUNJLFNBQVU7YUFDYjtZQUNELEtBQUssSUFBSSxLQUFLLEdBQUUsQ0FBQyxFQUFDLEtBQUssR0FBRyxFQUFFLEVBQUMsRUFBRSxLQUFLLEVBQ3BDO2dCQUNJLElBQUksSUFBSSxHQUFRLHVCQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLElBQUksR0FBUSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQzthQUN6QztTQUNKO0lBQ0wsQ0FBQztJQXJCZSxxQkFBZ0IsbUJBcUIvQixDQUFBO0lBQ0QseUJBQWlDLFFBQWlCLEVBQUMsSUFBSTtRQUVuRCxJQUFHLElBQUksSUFBSSxTQUFTLEVBQ3BCO1lBQ0ksT0FBTTtTQUNUO1FBQ0QsSUFBRyxRQUFRLElBQUksU0FBUyxFQUN4QjtZQUNJLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxJQUFJLENBQUE7UUFDUixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN2QyxJQUFHLElBQUksSUFBRSxJQUFJLEVBQ2I7WUFDSSxJQUFHLHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFFLElBQUksSUFBRSx1QkFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBRSxTQUFTLEVBQ3hGO2dCQUNJLElBQUksSUFBSSxHQUFRLHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7aUJBQ0Q7Z0JBQ0ksSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQTthQUNyQztTQUNKO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUEzQmUsb0JBQWUsa0JBMkI5QixDQUFBO0lBRUQ7UUFnRkksa0JBQWEsUUFBaUIsRUFBQyxJQUFTO1lBN0N4QyxZQUFPLEdBQUcsVUFBVSxRQUF3QjtnQkFBeEIseUJBQUEsRUFBQSxXQUFXLFFBQVEsQ0FBQyxJQUFJO2dCQUV4QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0QsQ0FBQyxDQUFBO1lBMkNHLElBQUcsUUFBUSxJQUFJLFNBQVMsRUFDeEI7Z0JBQ0ksUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDNUI7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFFLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDM0IsQ0FBQztRQXJGRCxzQkFBSSxrQ0FBWTtpQkFBaEI7Z0JBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxHQUFDLENBQUMsSUFBRSxJQUFJLENBQUMsUUFBUSxHQUFDLEVBQUUsSUFBRSxJQUFJLENBQUMsUUFBUSxJQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDNUUsQ0FBQzs7O1dBQUE7UUFHRCxzQkFBSSxnQ0FBVTtZQURkLFVBQVU7aUJBQ1Y7Z0JBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDMUMsQ0FBQzs7O1dBQUE7UUFDRCxJQUFJO1FBQ0osNEJBQVMsR0FBVDtZQUVJLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFHLElBQUksRUFDcEI7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQztRQUVELDRCQUFTLEdBQVQ7WUFFSSxJQUFHLElBQUksQ0FBQyxLQUFLLElBQUUsSUFBSSxFQUNuQjtnQkFDSSxPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRSxJQUFJLENBQUM7UUFDNUIsQ0FBQztRQU9ELGFBQWE7UUFDYiwwQkFBTyxHQUFQO1lBRUksSUFBRyxJQUFJLENBQUMsS0FBSyxJQUFFLElBQUk7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUEsYUFBYTtZQUNyQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFFRDs7O1dBR0c7UUFDSCw0QkFBUyxHQUFULFVBQVcsTUFBYTtZQUVwQixRQUFPLElBQUksQ0FBQyxRQUFRLEVBQ3BCO2FBRUM7UUFDTCxDQUFDO1FBQ0Q7OztXQUdHO1FBQ0gsK0JBQVksR0FBWixVQUFhLE1BQWE7WUFFdEIsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsSUFBRyxPQUFPLEVBQ1Y7Z0JBQ0ksUUFBTyxPQUFPLENBQUMsSUFBSSxFQUNuQjtvQkFDSSxLQUFLLFFBQVEsQ0FBQyxPQUFPO3dCQUNqQixPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQ3ZCLEtBQUssUUFBUSxDQUFDLFdBQVc7d0JBQ3pCLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7WUFDRCxPQUFRLEtBQUssQ0FBQztRQUNsQixDQUFDO1FBY0QsbUNBQWdCLEdBQWhCLFVBQWlCLE1BQWEsRUFBQyxJQUFtQjtZQUU5QyxJQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQ3ZCO2dCQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtRQUNMLENBQUM7UUFDTyxpQ0FBYyxHQUF0QjtZQUVJLElBQUksSUFBSSxDQUFDLEtBQUssSUFBRSxJQUFJLElBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDM0M7Z0JBQ0ksT0FBTzthQUNWO1lBQ0QsSUFBSSxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtnQkFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1RDtZQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBQ1MscUNBQWtCLEdBQTVCO1lBRUksSUFBSSxLQUFLLEdBQWlCLElBQUksQ0FBQztZQUMvQixRQUFPLElBQUksQ0FBQyxRQUFRLEVBQ3BCO2dCQUNJLEtBQUssUUFBUSxDQUFDLElBQUk7b0JBQ2QsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQy9FLE1BQU07Z0JBRU4sS0FBSyxRQUFRLENBQUMsSUFBSTtvQkFDbEIsTUFBTTtnQkFFTjtvQkFDSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDL0UsTUFBTTthQUNUO1lBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUVTLGdDQUFhLEdBQXZCO1lBRUksSUFBSSxLQUFLLEdBQWlCLElBQUksQ0FBQztZQUUvQixRQUFPLElBQUksQ0FBQyxRQUFRLEVBQ3BCO2dCQUNJLEtBQUssUUFBUSxDQUFDLElBQUk7b0JBQ2QsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQy9FLE1BQU07YUFDVDtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FuSkEsQUFtSkMsSUFBQTtJQW5KWSxhQUFRLFdBbUpwQixDQUFBO0lBRUQ7UUFBbUIsd0JBQVE7UUFHdkIsY0FBWSxJQUFTO21CQUVqQixrQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQztRQUM3QixDQUFDO1FBQ1MsNEJBQWEsR0FBdkI7WUFFSSxJQUFJLEtBQUssR0FBcUIsSUFBSSxDQUFDO1lBQ25DLElBQUksR0FBRyxHQUFHLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDcEQsSUFBSSxJQUFJLEdBQVUsV0FBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsR0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNyRCxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDaEMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBYmEsYUFBUSxHQUFHLENBQUMsQ0FBQztRQWMvQixXQUFDO0tBaEJELEFBZ0JDLENBaEJrQixRQUFRLEdBZ0IxQjtJQUNELHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFOUM7UUFBb0IseUJBQVE7UUFFeEIsZUFBWSxJQUFTO21CQUVqQixrQkFBTSxRQUFRLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQztRQUM5QixDQUFDO1FBQ0QsYUFBYTtRQUNILDZCQUFhLEdBQXZCO1lBRUksSUFBSSxJQUFJLEdBQVUsV0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUM3QyxJQUFJLEtBQUssR0FBaUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUNELHlCQUFTLEdBQVQsVUFBVyxNQUFhO1lBRXBCLElBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFFbkI7Z0JBQ0ksYUFBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMseUJBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3pELElBQUksSUFBSSxHQUFpQixJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM5RSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3RCO1FBQ0wsQ0FBQztRQUNMLFlBQUM7SUFBRCxDQXhCQSxBQXdCQyxDQXhCbUIsUUFBUSxHQXdCM0I7SUFDRCx1QkFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBRWhEO1FBQXNCLDJCQUFRO1FBRTFCLGlCQUFZLElBQVM7bUJBRWpCLGtCQUFNLFFBQVEsQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDO1FBQ2hDLENBQUM7UUFDRCxhQUFhO1FBQ0gsK0JBQWEsR0FBdkI7WUFFSSxJQUFJLElBQUksR0FBVSxXQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDOUMsSUFBSSxLQUFLLEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFFRCwyQkFBUyxHQUFULFVBQVcsTUFBYTtZQUVwQixJQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFFLElBQUk7Z0JBQ3BDLE9BQU87WUFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQXBCQSxBQW9CQyxDQXBCcUIsUUFBUSxHQW9CN0I7SUFDRCx1QkFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBRXBEO1FBQTBCLCtCQUF5QjtRQU8vQzs7OztXQUlHO1FBQ0gscUJBQVksSUFBZSxFQUFFLE1BQXNCO1lBQXZDLHFCQUFBLEVBQUEsUUFBZTtZQUFFLHVCQUFBLEVBQUEsY0FBc0I7WUFBbkQsWUFFSSxrQkFBTSxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUEsQ0FBQyxDQUFBLFFBQVEsQ0FBQyxPQUFPLEVBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUV4RTtZQURHLEtBQUksQ0FBQyxJQUFJLEdBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUM7O1FBQzlELENBQUM7UUFiRCxzQkFBVyxrQkFBRztpQkFBZDtnQkFFSSxPQUFPLENBQUMsQ0FBQztZQUNiLENBQUM7OztXQUFBO1FBV0QsNEJBQU0sR0FBTjtZQUVJLElBQUcsSUFBSSxDQUFDLElBQUksR0FBQyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUNyRDtnQkFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbkI7UUFDTCxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQXhCQSxBQXdCQyxDQXhCeUIsaUJBQVUsQ0FBQyxjQUFjLEdBd0JsRDtJQUNEO1FBQTBCLCtCQUFRO1FBRTlCLHFCQUFZLElBQVM7bUJBRWpCLGtCQUFNLFFBQVEsQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDO1FBQ3BDLENBQUM7UUFDRCxhQUFhO1FBQ0gsbUNBQWEsR0FBdkI7WUFFSSxJQUFJLElBQUksR0FBVSxXQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUE7WUFDbkQsSUFBSSxLQUFLLEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQzFELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFFRCwrQkFBUyxHQUFULFVBQVcsTUFBYTtZQUVwQixJQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFFLElBQUk7Z0JBQ3BDLE9BQU87WUFDWCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFDLElBQUksV0FBVyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDTCxrQkFBQztJQUFELENBcEJBLEFBb0JDLENBcEJ5QixRQUFRLEdBb0JqQztJQUNELHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxXQUFXLENBQUM7SUFFNUQ7UUFBbUIsd0JBQVE7UUFpQnZCLGNBQVksSUFBUzttQkFFakIsa0JBQU0sUUFBUSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUM7UUFDN0IsQ0FBQztRQWhCRCwwQkFBVyxHQUFYLFVBQVksTUFBYTtZQUVyQixJQUFJLEtBQUssR0FBWSxpQkFBTyxDQUFDLFVBQVUsQ0FBVyxpQkFBTyxDQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0UsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN4Qix1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBQ0Qsd0JBQVMsR0FBVCxVQUFXLE1BQWE7WUFFcEIsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFcEQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUM7UUFNRCxhQUFhO1FBQ0gsNEJBQWEsR0FBdkI7WUFFSSxJQUFJLElBQUksR0FBVSxXQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQzVDLElBQUksS0FBSyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUMxRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0wsV0FBQztJQUFELENBN0JBLEFBNkJDLENBN0JrQixRQUFRLEdBNkIxQjtJQUNELHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFOUM7UUFBd0IsNkJBQVE7UUFTNUIsbUJBQVksSUFBUzttQkFFakIsa0JBQU0sUUFBUSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUM7UUFDbEMsQ0FBQztRQVZELDZCQUFTLEdBQVQsVUFBVyxNQUFhO1lBRXBCLElBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUUsSUFBSTtnQkFDcEMsT0FBTztZQUNYLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQztRQUtELGFBQWE7UUFDSCxpQ0FBYSxHQUF2QjtZQUVJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLElBQUksR0FBVSxXQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDL0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxLQUFLLEdBQWlCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUUzQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQXZCQSxBQXVCQyxDQXZCdUIsUUFBUSxHQXVCL0I7SUFDRCx1QkFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBRXhEO1FBQTBCLCtCQUF5QjtRQVMvQyxxQkFBWSxJQUFlO1lBQWYscUJBQUEsRUFBQSxRQUFlO1lBQTNCLFlBRUksa0JBQU0sUUFBUSxDQUFDLE9BQU8sRUFBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFNBSTFDO1lBSEcsS0FBSSxDQUFDLE9BQU8sR0FBRyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDL0MsS0FBSSxDQUFDLElBQUksR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUM7WUFDdkMsS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7O1FBQ3hCLENBQUM7UUFWRCxzQkFBVyxrQkFBRztpQkFBZDtnQkFFSSxPQUFPLENBQUMsQ0FBQztZQUNiLENBQUM7OztXQUFBO1FBUUQsMkJBQUssR0FBTCxVQUFNLE1BQWE7WUFFZixpQkFBTSxLQUFLLFlBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCw0QkFBTSxHQUFOO1lBRUksSUFBRyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUNsQztnQkFDSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbkI7aUJBQ0Q7Z0JBQ0ksSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUMxRDtvQkFDSSxPQUFPO2lCQUNWO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzVFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUNyQjtRQUNMLENBQUM7UUFDTyxnQ0FBVSxHQUFsQixVQUFtQixJQUFTO1lBRXhCLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFDMUM7Z0JBQ0ksSUFBSSxJQUFJLEdBQVEsSUFBSSxDQUFDLFFBQWdCLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0E1Q0EsQUE0Q0MsQ0E1Q3lCLGlCQUFVLENBQUMsY0FBYyxHQTRDbEQ7SUFFRDtRQUFrQix1QkFBUTtRQVN0QixhQUFZLElBQVM7bUJBRWpCLGtCQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDO1FBQzVCLENBQUM7UUFWRCx1QkFBUyxHQUFULFVBQVcsTUFBYTtZQUVwQixJQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixPQUFPO1lBQ1gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQU1ELGFBQWE7UUFDSCwyQkFBYSxHQUF2QjtZQUVJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLElBQUksR0FBVSxXQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzlDLElBQUksS0FBSyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0wsVUFBQztJQUFELENBckJBLEFBcUJDLENBckJpQixRQUFRLEdBcUJ6QjtJQUNELHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFFNUM7UUFBc0IsMkJBQXlCO1FBZ0MzQyxpQkFBWSxLQUFpQixFQUFDLEtBQWU7WUFBakMsc0JBQUEsRUFBQSxZQUFpQjtZQUFDLHNCQUFBLEVBQUEsVUFBZTtZQUE3QyxZQUVJLGtCQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQU10QztZQUxHLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLEtBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDOztRQUVyQixDQUFDO1FBbkNELHNCQUFXLGNBQUc7aUJBQWQ7Z0JBRUksT0FBTyxDQUFDLENBQUM7WUFDYixDQUFDOzs7V0FBQTtRQUNELHVCQUFLLEdBQUwsVUFBTSxNQUFhO1lBRWYsaUJBQU0sS0FBSyxZQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ25CLElBQUksSUFBSSxHQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3ZDLElBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQ3pCO2dCQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNuQjtZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLHVCQUFTLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVyRixJQUFJLE9BQU8sR0FBRyxJQUFJLDhCQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3pCLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUIsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxhQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM5RSx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXhCLENBQUM7UUFhRCx3QkFBTSxHQUFOO1lBRUksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFDdEI7Z0JBQ0ksT0FBTzthQUNWO1lBQ0QsSUFBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUcsRUFDN0M7Z0JBQ0ksSUFBSSxJQUFJLEdBQVEsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2hHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFFeEIsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDMUQsaUJBQU0sUUFBUSxXQUFFLENBQUM7YUFDcEI7UUFDTCxDQUFDO1FBQ0wsY0FBQztJQUFELENBMURBLEFBMERDLENBMURxQixpQkFBVSxDQUFDLGNBQWMsR0EwRDlDO0lBRUQ7UUFBbUIsd0JBQVE7UUFRdkIsY0FBWSxJQUFTO21CQUVqQixrQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQztRQUM3QixDQUFDO1FBVEQsd0JBQVMsR0FBVCxVQUFXLE1BQWE7WUFFcEIsSUFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsT0FBTztZQUNYLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFNRCxhQUFhO1FBQ0gsNEJBQWEsR0FBdkI7WUFFSSxJQUFJLEtBQUssR0FBcUIsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUM5RixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0wsV0FBQztJQUFELENBbkJBLEFBbUJDLENBbkJrQixRQUFRLEdBbUIxQjtJQUNELHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFOUM7UUFBdUIsNEJBQXlCO1FBNkM1QyxrQkFBWSxLQUFnQixFQUFDLEtBQWU7WUFBaEMsc0JBQUEsRUFBQSxXQUFnQjtZQUFDLHNCQUFBLEVBQUEsVUFBZTtZQUE1QyxZQUVJLGtCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQU12QztZQUxHLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1lBQzNCLEtBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDOztRQUVyQixDQUFDO1FBaERELHNCQUFXLGVBQUc7aUJBQWQ7Z0JBRUksT0FBTyxDQUFDLENBQUM7WUFDYixDQUFDOzs7V0FBQTtRQUNELHlCQUFNLEdBQU47WUFFSSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUN0QjtnQkFDSSxPQUFPO2FBQ1Y7WUFDRCxJQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBRyxFQUM3QztnQkFDSSxJQUFJLElBQUksR0FBUSx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDaEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQjtRQUNMLENBQUM7UUFDRCxzQkFBRyxHQUFILFVBQUksSUFBUztZQUVULElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDeEIsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMxRCxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNyQixDQUFDO1FBQ0Qsd0JBQUssR0FBTCxVQUFNLE1BQWE7WUFFZixpQkFBTSxLQUFLLFlBQUMsTUFBTSxDQUFDLENBQUE7WUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXJGLElBQUksT0FBTyxHQUFHLElBQUksOEJBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDekIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQix1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLGFBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlGLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBYU8seUJBQU0sR0FBZCxVQUFlLE9BQWU7WUFFMUIsSUFBSSxVQUFVLEdBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDMUUsSUFBRyxVQUFVLENBQUMsUUFBUSxHQUFDLENBQUMsSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQ2xEO2dCQUNJLFVBQVUsR0FBRyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFFLENBQUMsQ0FBRSxDQUFDO2FBQ2xHO1lBQ0QsSUFBSSxJQUFJLEdBQVEsVUFBVSxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBRSxDQUFDO1lBQzVELElBQUcsT0FBTztnQkFDTixJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Z0JBRXhCLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLElBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQzNCO2dCQUNJLE9BQU07YUFDVDtZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQXhFQSxBQXdFQyxDQXhFc0IsaUJBQVUsQ0FBQyxjQUFjLEdBd0UvQztJQUVEO1FBQW1CLHdCQUFRO1FBV3ZCLGNBQVksSUFBUzttQkFFakIsa0JBQU0sUUFBUSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUM7UUFDN0IsQ0FBQztRQVpELHdCQUFTLEdBQVQsVUFBVyxNQUFhO1lBRXBCLElBQUksT0FBTyxHQUFrQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUM3QjtnQkFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQzthQUNsQztZQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBS0QsYUFBYTtRQUNILDRCQUFhLEdBQXZCO1lBRUksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksSUFBSSxHQUFVLEdBQUcsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDLFdBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQSxDQUFDLENBQUEsV0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1lBQ3hGLGtEQUFrRDtZQUNsRCxpREFBaUQ7WUFFakQsSUFBSSxLQUFLLEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFDTCxXQUFDO0lBQUQsQ0ExQkEsQUEwQkMsQ0ExQmtCLFFBQVEsR0EwQjFCO0lBQ0QsdUJBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUU5QztRQUF1Qiw0QkFBeUI7UUFjNUMsa0JBQVksU0FBb0IsRUFBQyxRQUF1QjtZQUE1QywwQkFBQSxFQUFBLGFBQW9CO1lBQUMseUJBQUEsRUFBQSxlQUF1QjtZQUF4RCxZQUVJLGtCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLFNBSXpCO1lBSEcsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztRQUN6QixDQUFDO1FBaEJELHdCQUFLLEdBQUwsVUFBTSxNQUFhO1lBRWYsaUJBQU0sS0FBSyxZQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ25CLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksYUFBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbEcsQ0FBQztRQUNELDJCQUFRLEdBQVI7WUFFSSx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFELGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ3JCLENBQUM7UUFTTyx5QkFBTSxHQUFkLFVBQWUsUUFBZ0I7WUFFM0IsSUFBRyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFDNUI7Z0JBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQzlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNwQjtZQUNELElBQUcsSUFBSSxDQUFDLFNBQVMsSUFBRSxDQUFDLEVBQ3BCO2dCQUNJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNuQjtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBQ08sZ0NBQWEsR0FBckI7WUFFSSxJQUFJLElBQVcsQ0FBQztZQUNoQixJQUFHLElBQUksQ0FBQyxTQUFTLElBQUUsQ0FBQztnQkFDaEIsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7Z0JBRVYsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFBLENBQUMsQ0FBQSxPQUFPLENBQUEsQ0FBQyxDQUFBLE1BQU0sQ0FBQztZQUNoRCx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBQ0wsZUFBQztJQUFELENBNUNBLEFBNENDLENBNUNzQixpQkFBVSxDQUFDLGNBQWMsR0E0Qy9DO0FBRUwsQ0FBQyxFQXAwQmEsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBbzBCakI7Ozs7QUNuMUJELElBQWMsVUFBVSxDQXNDdkI7QUF0Q0QsV0FBYyxVQUFVO0lBRXBCO1FBSUk7WUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDO1FBQ3JDLENBQUM7UUFDTCxjQUFDO0lBQUQsQ0FUQSxBQVNDLElBQUE7SUFUWSxrQkFBTyxVQVNuQixDQUFBO0lBQ0Q7UUFtQkksbUJBQWEsQ0FBUSxFQUFDLENBQVE7WUFFMUIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBcEJELHNCQUFJLHdCQUFDO2lCQUFMO2dCQUVJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixDQUFDO2lCQUNELFVBQU0sQ0FBUTtnQkFFVixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQztZQUNwQixDQUFDOzs7V0FKQTtRQUtELHNCQUFJLHdCQUFDO2lCQUFMO2dCQUVJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixDQUFDO2lCQUNELFVBQU0sQ0FBUTtnQkFFVixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDOzs7V0FKQTtRQVVMLGdCQUFDO0lBQUQsQ0F2QkEsQUF1QkMsSUFBQTtJQXZCWSxvQkFBUyxZQXVCckIsQ0FBQTtJQUVELFdBQUEsWUFBWSxHQUFHLEVBQUcsQ0FBQztBQUN2QixDQUFDLEVBdENhLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBc0N2Qjs7OztBQ2xDRCxJQUFjLEtBQUssQ0FxRWxCO0FBckVELFdBQWMsS0FBSztJQUVuQixTQUFTO0lBQ1Q7UUFNSSx1QkFBYSxLQUEyQjtZQUEzQixzQkFBQSxFQUFBLFlBQTJCO1lBRXBDLElBQUcsS0FBSyxJQUFJLElBQUksRUFDaEI7Z0JBQ0ksS0FBSyxHQUFHLElBQUksQ0FBQzthQUNoQjtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7UUFDRCw4QkFBTSxHQUFOLGNBQ0MsQ0FBQztRQUNGLDZCQUFLLEdBQUwsY0FBUSxDQUFDO1FBQ2Isb0JBQUM7SUFBRCxDQWpCQSxBQWlCQyxJQUFBO0lBakJxQixtQkFBYSxnQkFpQmxDLENBQUE7SUFFRDtRQUE4Qiw0QkFBYTtRQVN2QyxrQkFBWSxLQUFnQixFQUFDLFFBQXNDO1lBQXZELHNCQUFBLEVBQUEsWUFBZ0I7WUFBQyx5QkFBQSxFQUFBLGVBQXNDO1lBQW5FLFlBRUksaUJBQU8sU0FHVjtZQUZHLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDOztRQUM5QixDQUFDO1FBWkQsd0JBQUssR0FBTCxVQUFNLE9BQWU7WUFFakIsSUFBRyxJQUFJLENBQUMsU0FBUztnQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFTTCxlQUFDO0lBQUQsQ0FmQSxBQWVDLENBZjZCLGFBQWEsR0FlMUM7SUFmWSxjQUFRLFdBZXBCLENBQUE7SUFDRDtRQUFtQyxpQ0FBYTtRQUs1Qyx1QkFBYSxHQUFpQixFQUFDLEtBQTBCO1lBQTFCLHNCQUFBLEVBQUEsWUFBMEI7WUFBekQsWUFFSSxrQkFBTSxLQUFLLENBQUMsU0FJZjtZQUhHLEtBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDOztRQUMxQixDQUFDO1FBQ0QsNkJBQUssR0FBTCxVQUFPLE9BQWU7WUFFbEIsaUNBQWlDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQzVCLENBQUM7UUFDRCw4QkFBTSxHQUFOO1lBRUksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUUsR0FBRyxFQUN4RDtnQkFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hDO1FBQ0wsQ0FBQztRQUNELDZCQUFLLEdBQUw7WUFFSSxJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQTlCQSxBQThCQyxDQTlCa0MsYUFBYSxHQThCL0M7SUE5QlksbUJBQWEsZ0JBOEJ6QixDQUFBO0FBQ0QsQ0FBQyxFQXJFYSxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFxRWxCOzs7O0FDekVELCtCQUF5QjtBQUd6Qiw4REFBb0Q7QUFHbkQ7O0VBRUU7QUFDSCxPQUFPO0FBQ1A7SUFBdUMsNkJBQWE7SUE0R2hELG1CQUFZLE9BQWMsRUFBQyxLQUFnQjtRQUFoQixzQkFBQSxFQUFBLFNBQWdCO1FBQTNDLGlCQWdCQztRQWRHLElBQUksT0FBTyxHQUFVLHVCQUFTLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUN6RCxRQUFBLGlCQUFPLFNBQUM7UUFDUixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixLQUFLLElBQUksUUFBUSxHQUFVLENBQUMsT0FBTyxHQUFFLENBQUMsQ0FBQyxFQUFDLFFBQVEsSUFBRSxDQUFDLEVBQUMsRUFBRSxRQUFRLEVBQzlEO1lBQ0ksSUFBSSxPQUFPLEdBQVEsSUFBSSxjQUFJLENBQUMsS0FBSSxFQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUM7U0FDckM7O0lBQ0wsQ0FBQztJQXBIRCxzQkFBSSwrQkFBUTthQUlaO1lBRUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUNuQyxDQUFDO2FBUEQsVUFBYyxLQUFrQjtZQUU1QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFNRCxlQUFlO0lBQ2YsMkJBQU8sR0FBUCxVQUFRLEdBQVU7UUFFZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxNQUFNO0lBQ04sMkJBQU8sR0FBUCxVQUFTLEtBQVk7UUFHakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxVQUFVLEdBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBQ3BELElBQUksWUFBWSxHQUFFLHVCQUFTLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUN2RCxLQUFLLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBQyxLQUFLLENBQUM7UUFDM0IsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBQyxDQUFDLEdBQUUsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLE9BQU8sR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRW5DLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBRyxZQUFZLENBQUM7UUFDakQsSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQ3hCO1lBQ0ksTUFBTSxJQUFJLFlBQVksR0FBQyxDQUFDLENBQUM7U0FDNUI7UUFFQSxLQUFLLElBQUksTUFBTSxHQUFFLENBQUMsRUFBRSxNQUFNLEdBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxFQUFFLE1BQU0sRUFDbkQ7WUFDSSxJQUFJLE9BQU8sR0FBUSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNsQyxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFFLE1BQU0sR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNsRCxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQTs7Z0JBRWxDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakMsTUFBTSxJQUFJLFlBQVksQ0FBQztTQUMxQjtRQUVELElBQUcsSUFBSSxDQUFDLE1BQU07WUFDVixPQUFPO1FBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDMUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUMzQjtZQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7U0FDdkM7YUFDRDtZQUNJLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFFLENBQUMsQ0FBQztTQUN4QztJQUVMLENBQUM7SUFFRCxXQUFXO0lBQ1gsa0NBQWMsR0FBZDtRQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxhQUFhO0lBQ2IsZ0NBQVksR0FBWixVQUFjLFNBQW1CO1FBRTdCLFdBQVc7UUFDWCxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFFLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDdkQsS0FBSyxJQUFJLFFBQVEsR0FBVSxDQUFDLEVBQUMsUUFBUSxHQUFFLElBQUksQ0FBQyxXQUFXLEVBQUMsRUFBRSxRQUFRLEVBQ2xFO1lBQ0ksSUFBSSxVQUFVLEdBQU8sSUFBSSxDQUFDO1lBQzFCLElBQUksV0FBVyxHQUFPLElBQUksQ0FBQztZQUMzQixJQUFHLFNBQVMsRUFDWjtnQkFDSSxVQUFVLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9DO2lCQUNEO2dCQUNJLFVBQVUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDN0M7WUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBRWhDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQ2xDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUNELE1BQU07SUFDTix5QkFBSyxHQUFMO1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQW1CTCxnQkFBQztBQUFELENBN0hBLEFBNkhDLENBN0hzQyxJQUFJLENBQUMsUUFBUSxHQTZIbkQ7Ozs7O0FDdklELCtDQUE4QztBQUU5Qyw4REFBc0Q7QUFDdEQsMENBQW9DO0FBRXBDLHdDQUFzQztBQUN0Qyw4REFBb0Q7QUFDcEQsdUNBQStCO0FBQy9CLHlDQUFxQztBQUNyQyxJQUFJLEdBQUcsR0FBVSxDQUFDLENBQUM7QUFFbkIsZUFBZTtBQUNmLE1BQU07QUFDTjtJQUFvQywwQkFBYTtJQXFEN0M7UUFBQSxZQUVJLGlCQUFPLFNBY1Y7UUFiRyxLQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLElBQUksR0FBVSxXQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNDLElBQUksWUFBWSxHQUFpQixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDckQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1QixhQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLENBQUM7UUFFdkMsU0FBUztRQUNULFlBQVksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6RSxLQUFJLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RSxLQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFDLEtBQUksRUFBQyxjQUFNLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZELEtBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLEtBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7O0lBQ3JDLENBQUM7SUFyREQsc0JBQUksMkJBQU87YUFJWDtZQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO2FBUEQsVUFBWSxJQUFTO1lBRWpCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBTU8sOEJBQWEsR0FBckIsVUFBdUIsV0FBeUI7UUFFNUMsSUFBSSxDQUFDLFFBQVEsQ0FBRSxlQUFlLEVBQUUsUUFBUSxFQUFDLFdBQVcsRUFBRSxlQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxRQUFRLENBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFDLFdBQVcsRUFBRSxlQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxRQUFRLENBQUUscUJBQXFCLEVBQUUsTUFBTSxFQUFDLFdBQVcsRUFBRSxlQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFTyx5QkFBUSxHQUFoQixVQUFrQixZQUFtQixFQUFFLFFBQWUsRUFBRSxXQUF5QixFQUFFLFFBQXNCO1FBRXJHLElBQUksS0FBSyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDdkUsSUFBSSxTQUFTLEdBQWlCLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUU1QyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxRQUFPLFFBQVEsRUFDZjtZQUNJLEtBQUssTUFBTTtnQkFDUCxJQUFJLElBQUksR0FBaUIsV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQWtCLENBQUM7Z0JBQy9FLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzdCLE1BQU07WUFDTjtnQkFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBQyxTQUFTLENBQUMsQ0FBQztnQkFDakUsTUFBTTtTQUNUO1FBRUQsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDM0MsQ0FBQztJQXFCRCxzQkFBSyxHQUFMO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBRyxJQUFJLENBQUMsU0FBUztZQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDhCQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLElBQUksZ0JBQWdCLEdBQXNCLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDNUUsSUFBSSxTQUFTLEdBQVUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsd0JBQU8sR0FBUCxVQUFRLEdBQVU7UUFFZCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBRyxJQUFJLElBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDO0lBQzNGLENBQUM7SUFFRCxNQUFNO0lBQ04sd0JBQU8sR0FBUCxVQUFRLE9BQVk7UUFFaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxLQUFLLENBQUMsQ0FBQyxJQUFJLHVCQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxjQUFjLENBQUMscUJBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELHNCQUFJLDRCQUFRO2FBS1o7WUFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNDLENBQUM7YUFSRCxVQUFjLEtBQWtCO1lBRTVCLElBQUksS0FBSyxHQUFnQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBS0Qsc0JBQUksaUNBQWE7YUFBakI7WUFFSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFFRDs7O09BR0c7SUFDSCx3QkFBTyxHQUFQLFVBQVEsSUFBUztRQUViLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxDQUFDO0lBRUQsMEJBQVMsR0FBVDtRQUVJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLHFCQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7UUFDMUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQseUJBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELG9CQUFHLEdBQUg7UUFFSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxNQUFNO0lBQ04sNEJBQVcsR0FBWDtRQUVJLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQ3BDO1lBQ0ksT0FBUTtTQUNYO1FBQ0QsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUNqTztZQUNJLGFBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLHlCQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEUsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7O09BR0c7SUFDSCwwQkFBUyxHQUFULFVBQVcsTUFBbUI7UUFFMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRDs7O09BR0c7SUFDSCwwQkFBUyxHQUFULFVBQVUsU0FBMEM7UUFFaEQsSUFBSSxNQUFNLEdBQW9DLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDekIsU0FBUyxDQUFDLFFBQVEsR0FBRSxNQUFNLENBQUM7UUFDM0IsU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQ7O09BRUc7SUFDSCwwQkFBUyxHQUFUO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUN6QyxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILHdCQUFPLEdBQVAsVUFBUSxJQUE4QjtRQUVsQyxJQUFJLEtBQUssR0FBVSxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQzVCLElBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBRSxJQUFJLElBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBRSxTQUFTLEVBQzVEO1lBQ0ksT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLFNBQVMsR0FBaUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBRyxTQUFTLEVBQ1o7WUFDSSxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNEOzs7T0FHRztJQUNILDRCQUFXLEdBQVgsVUFBYSxHQUFpQjtRQUUxQixPQUFPO1FBQ1AsSUFBRyxHQUFHLElBQUUsSUFBSSxFQUNaO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDaEM7SUFDTCxDQUFDO0lBQ0Q7O09BRUc7SUFDSCw2QkFBWSxHQUFaLFVBQWEsS0FBWTtRQUVyQixJQUFJLElBQUksR0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLFNBQVMsR0FBaUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUQsSUFBRyxTQUFTO1lBQUUsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBQyxJQUFJLENBQUM7UUFDekIsSUFBRyxJQUFJLElBQUUsSUFBSSxJQUFFLElBQUksSUFBRSxTQUFTLEVBQzlCO1lBQ0ksT0FBTztTQUNWO0lBQ0wsQ0FBQztJQUVELHdCQUFPLEdBQVA7UUFFSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RCLEtBQUssSUFBSSxPQUFPLEdBQVUsQ0FBQyxFQUFDLE9BQU8sR0FBQyxDQUFDLEVBQUMsRUFBRSxPQUFPLEVBQy9DO1lBQ0ksSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFFLElBQUksSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFFLFNBQVM7Z0JBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBQ0QsMkJBQVUsR0FBVjtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0FqUUEsQUFpUUMsQ0FqUW1DLElBQUksQ0FBQyxRQUFRLEdBaVFoRDs7QUFFRDtJQUVJO0lBQ0MsQ0FBQztJQUNGLDBCQUFPLEdBQVAsVUFBUyxJQUFTO0lBR2xCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUE7Ozs7QUN2UkQsMENBQW9DO0FBRXBDLDhEQUFvRDtBQUNwRCxJQUFjLGVBQWUsQ0FvSDVCO0FBcEhELFdBQWMsZUFBZTtJQUV6QjtRQWVJLDBCQUFhLE1BQWEsRUFBRSxNQUE4QjtZQUE5Qix1QkFBQSxFQUFBLGFBQThCO1lBRXRELElBQUcsTUFBTSxJQUFJLElBQUksRUFDakI7Z0JBQ0ksTUFBTSxHQUFHLElBQUksQ0FBQzthQUNqQjtZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLENBQUM7UUFqQkQsaUNBQU0sR0FBTjtZQUVJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBQ0Qsb0NBQVMsR0FBVCxVQUFVLE1BQWE7WUFFbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDekIsQ0FBQztRQVlMLHVCQUFDO0lBQUQsQ0F6QkEsQUF5QkMsSUFBQTtJQXpCcUIsZ0NBQWdCLG1CQXlCckMsQ0FBQTtJQUVELGNBQWM7SUFDZDtRQUFzQyxvQ0FBZ0I7UUFTbEQsMEJBQVksTUFBb0I7WUFBcEIsdUJBQUEsRUFBQSxhQUFvQjtZQUFoQyxZQUVJLGtCQUFNLE1BQU0sQ0FBQyxTQUVoQjtZQURHLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7O1FBQ25CLENBQUM7UUFURCxvQ0FBUyxHQUFUO1lBRUksSUFBSSxDQUFDLElBQUksR0FBRyxhQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLHVCQUFTLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztZQUNqRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDO1FBTVMsa0NBQU8sR0FBakI7WUFFSSxJQUFHLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUNkO2dCQUNJLElBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxhQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN6RDtvQkFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pDLE9BQU87aUJBQ1Y7cUJBRUQ7b0JBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQkFDOUMsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxRQUFRLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQ3pFO3dCQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUMxQjtvQkFDRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsR0FBQyxRQUFRLEdBQUUsdUJBQVMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ2hFLElBQUksTUFBTSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7b0JBQ3ZELE1BQU0sQ0FBQyxDQUFDLElBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO29CQUM5QyxJQUFJLEtBQUssR0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7b0JBQzlDLEtBQUssQ0FBQyxDQUFDLElBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO29CQUM3QyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDL0IsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksR0FBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzVDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFFNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2lCQUNoQzthQUNKO2lCQUNEO2dCQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDN0I7UUFDTCxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQWpEQSxBQWlEQyxDQWpEcUMsZ0JBQWdCLEdBaURyRDtJQWpEWSxnQ0FBZ0IsbUJBaUQ1QixDQUFBO0lBRUQsTUFBTTtJQUNOO1FBQStCLDZCQUFnQjtRQWdCM0MsbUJBQVksS0FBWTtZQUF4QixZQUVJLGtCQUFNLElBQUksQ0FBQyxTQUVkO1lBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O1FBQ3ZCLENBQUM7UUFqQkQ7OztXQUdHO1FBQ0gsNkJBQVMsR0FBVCxVQUFVLE1BQWE7WUFFbkIsaUJBQU0sU0FBUyxZQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRSxDQUFDO1FBV1MsMkJBQU8sR0FBakI7WUFFSSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUN0QjtnQkFDSSxPQUFPO2FBQ1Y7WUFDRCxnSEFBZ0g7WUFDakgsZ0RBQWdEO1lBQ2hELElBQUksTUFBTSxHQUFnQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDTCxnQkFBQztJQUFELENBakNBLEFBaUNDLENBakM4QixnQkFBZ0IsR0FpQzlDO0lBakNZLHlCQUFTLFlBaUNyQixDQUFBO0FBQ0wsQ0FBQyxFQXBIYSxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQW9INUI7Ozs7QUN4SEQsdUNBQStCO0FBRS9CLDJDQUF1QztBQUN2QywwQ0FBc0M7QUFDdEMsMENBQW9DO0FBR3BDLEdBQUc7QUFDSDtJQUFrQyx3QkFBYTtJQXlFM0MsY0FBWSxLQUFlLEVBQUMsR0FBVTtRQUF0QztRQUVJLGtDQUFrQztRQUNsQyxpQkFBTyxTQTRCVjtRQTNCRyxhQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDdkMsSUFBRyxLQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFDaEI7WUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3pELElBQUksSUFBSSxHQUFVLFdBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUMsR0FBRyxDQUFDLENBQUE7WUFDbEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7UUFFRCxxR0FBcUc7UUFFckcsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25ELEtBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0MsS0FBSSxDQUFDLFFBQVEsR0FBRyxlQUFJLENBQUMsZUFBZSxDQUFDLGVBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFDLEtBQUksQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUMvRCxLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEtBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWYsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdkIsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7O0lBQ3JCLENBQUM7SUF4RkQsc0JBQUksMEJBQVE7YUFJWjtZQUVJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0MsQ0FBQztRQVJELE1BQU07YUFDTixVQUFjLEtBQWtCO1lBRTVCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLDBCQUFRO2FBQVo7WUFFSSxPQUFPLElBQUksdUJBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRSxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLDRCQUFVO2FBQWQ7WUFFSSxPQUFPLElBQUksQ0FBQyxXQUFXLElBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBQ3ZFLENBQUM7YUFDRCxVQUFlLEtBQWE7WUFFeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQzs7O09BSkE7SUFLRCxzQkFBSSw0QkFBVTthQUFkO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLHlCQUFPO2FBQVg7WUFFSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFDRCxzQkFBTyxHQUFQLFVBQVMsU0FBdUI7UUFFNUIsSUFBRyxTQUFTLElBQUksZUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQ25DO1lBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRSxLQUFLLENBQUM7WUFDbkIsT0FBTztTQUNWO2FBQ0Q7WUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCx3QkFBUyxHQUFULFVBQVUsS0FBa0IsRUFBQyxZQUE0QjtRQUE1Qiw2QkFBQSxFQUFBLG9CQUE0QjtRQUVyRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFHLENBQUMsWUFBWTtZQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQXJFRCxNQUFNO0lBQ1EsaUJBQVksR0FBVSxDQUFDLENBQUM7SUF3RzFDLFdBQUM7Q0EzR0QsQUEyR0MsQ0EzR2lDLElBQUksQ0FBQyxRQUFRLEdBMkc5QztrQkEzR29CLElBQUk7Ozs7QUNSekI7OztHQUdHO0FBQ0gsbURBQTZDO0FBQzdDLG1EQUE2QztBQUM3Qyx5REFBbUQ7QUFDbkQsMkRBQW1EO0FBQ25ELCtDQUF5QztBQUV6Qyx1Q0FBaUM7QUFDakMsMkNBQXFDO0FBRXJDO0lBR0k7UUFFSSxJQUFJLEVBQUUsR0FBRyxhQUFHLENBQUM7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsb0JBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFFN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDNUMsUUFBUTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFFVixJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFDLHlCQUF5QixFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLDZCQUE2QixFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDaEksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsdUJBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxNQUFNLEdBQUcsbUJBQVMsQ0FBQyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQTBCLHlCQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekUsSUFBSSxRQUFRLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFlLHNCQUFZLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBWSxtQkFBUyxDQUFDLENBQUM7UUFDbkQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLG1CQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxxQkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBQ0wsV0FBQztBQUFELENBbENBLEFBa0NDLElBQUE7QUFDRCxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDOzs7O0FDaERwQixpQ0FBNkI7QUFDN0IsMENBQXdDO0FBR3hDLDJEQUFxRDtBQUdyRDtJQUEwQyxnQ0FBa0I7SUFLeEQ7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFORCxzQkFBVyxrQ0FBUTthQUFuQjtZQUVJLE9BQU8sSUFBSSxDQUFDLFFBQXlCLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFJRCw0QkFBSyxHQUFMO1FBRUksSUFBSSxVQUFVLEdBQUcsQ0FBQyxXQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUMsV0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzdHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxhQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsSUFBSSx1QkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFDTSwwQkFBRyxHQUFWO0lBR0EsQ0FBQztJQUVMLG1CQUFDO0FBQUQsQ0FsQkEsQUFrQkMsQ0FsQnlDLGFBQUssQ0FBQyxZQUFZLEdBa0IzRDs7Ozs7QUNSRCwwQ0FBc0M7QUFHdEMsK0NBQXVDO0FBRXZDLCtDQUF5QztBQUt6QyxJQUFJLFFBQVEsR0FBRyxlQUFJLENBQUMsUUFBUSxDQUFDO0FBQzdCLE1BQU07QUFDTjtJQUF1Qyw2QkFBZTtJQVNsRCxNQUFNO0lBQ047UUFBQSxZQUVJLGlCQUFPLFNBRVY7UUFERyxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQzs7SUFDdkMsQ0FBQztJQVZTLCtCQUFXLEdBQXJCO1FBRUksT0FBTyxJQUFJLHNCQUFZLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBU0wsZ0JBQUM7QUFBRCxDQWhCQSxBQWdCQyxDQWhCc0MsYUFBSyxDQUFDLFNBQVMsR0FnQnJEOzs7OztBQ3hDRCxtREFBNkM7QUFDN0MsMENBQXNDO0FBQ3RDLDBDQUFzQztBQUN0Qyx3Q0FBbUM7QUFFbkM7SUEwQkksTUFBTTtJQUNOO1FBRUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQTFCRCxzQkFBVyxvQkFBRzthQUFkO1lBRUksSUFBRyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksRUFDN0I7Z0JBQ0ksYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO2FBQzVDO1lBQ0QsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcsa0NBQU87YUFBbEI7WUFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBQ0QsYUFBYTtJQUNiLGtDQUFVLEdBQVY7UUFFSSxJQUFJLFlBQVksR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLGFBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsWUFBWSxDQUFDO0lBQ2pDLENBQUM7SUFPTCxvQkFBQztBQUFELENBL0JBLEFBK0JDLElBQUE7O0FBRUQ7SUFBMEIsK0JBQWU7SUFJckM7ZUFFSSxpQkFBTztJQUNYLENBQUM7SUFFUyxpQ0FBVyxHQUFyQjtRQUVJLElBQUksUUFBUSxHQUFzQixJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ3ZELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFDTCxrQkFBQztBQUFELENBZEEsQUFjQyxDQWR5QixhQUFLLENBQUMsU0FBUyxHQWN4QztBQUVEO0lBQTZCLGtDQUFrQjtJQU8zQztlQUVJLGlCQUFPO0lBQ1gsQ0FBQztJQVJELGdDQUFPLEdBQVA7SUFHQSxDQUFDO0lBT00sOEJBQUssR0FBWjtRQUVJLElBQUksVUFBVSxHQUFHLENBQUMsRUFBQyxHQUFHLEVBQUMsV0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLEdBQUcsRUFBQyxXQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLFdBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMvTCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksYUFBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLElBQUksZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFDTSwrQkFBTSxHQUFiO0lBR0EsQ0FBQztJQUNNLDRCQUFHLEdBQVY7SUFHQSxDQUFDO0lBQ0wscUJBQUM7QUFBRCxDQXpCQSxBQXlCQyxDQXpCNEIsYUFBSyxDQUFDLFlBQVksR0F5QjlDO0FBRUQ7SUFBOEIsbUNBQW9CO0lBRzlDO2VBRUksaUJBQU87SUFDWCxDQUFDO0lBQ00sK0JBQUssR0FBWjtRQUVJLElBQUksQ0FBQyxFQUFFLEdBQUcsYUFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWMscUJBQVcsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFDTSw2QkFBRyxHQUFWO0lBR0EsQ0FBQztJQUNNLGdDQUFNLEdBQWI7SUFHQSxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQW5CQSxBQW1CQyxDQW5CNkIsYUFBSyxDQUFDLGNBQWMsR0FtQmpEOzs7O0FDdEdELDBDQUFzQztBQUN0QywwQ0FBc0M7QUFFdEMsMERBQW9EO0FBRXBELGlEQUEyQztBQUMzQywwQ0FBb0M7QUFDcEMsaUNBQTJCO0FBRTNCO0lBQXVDLDZCQUFlO0lBRWxEO2VBRUksaUJBQU87SUFDWCxDQUFDO0lBRVMsK0JBQVcsR0FBckI7UUFFSSxPQUFPLElBQUksV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FYQSxBQVdDLENBWHNDLGFBQUssQ0FBQyxTQUFTLEdBV3JEOztBQUlEO0lBQTBCLCtCQUFrQjtJQUV4QztlQUVJLGlCQUFPO0lBQ1gsQ0FBQztJQUVNLDJCQUFLLEdBQVo7UUFFSSxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFDLHlCQUF5QixFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLDZCQUE2QixFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDcEksSUFBSSxDQUFDLGNBQWMsQ0FBRSxJQUFJLGFBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxJQUFJLGNBQWMsRUFBRSxDQUFDLENBQUUsQ0FBQztJQUMxRixDQUFDO0lBRU0seUJBQUcsR0FBVjtJQUdBLENBQUM7SUFFRCw2QkFBTyxHQUFQO0lBRUEsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FyQkEsQUFxQkMsQ0FyQnlCLGFBQUssQ0FBQyxZQUFZLEdBcUIzQztBQUVELFFBQVE7QUFDUjtJQUE2QixrQ0FBb0I7SUFRN0M7UUFBQSxZQUVJLGlCQUFPLFNBS1Y7UUFKRyxLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQzs7SUFDMUIsQ0FBQztJQUVPLGtDQUFTLEdBQWpCO1FBRUksSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxhQUFhLEdBQUc7WUFDaEIsV0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDM0IsV0FBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7WUFDOUIsV0FBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7WUFDOUIsV0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7WUFDL0IsV0FBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7WUFDaEMsV0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFDeEIsV0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7U0FDdEIsQ0FBQztRQUVOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRCxJQUFJLGFBQWEsR0FBRztZQUNoQixXQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztZQUMzQixXQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO1lBQ2hDLFdBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7WUFDaEMsV0FBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztZQUNoQyxXQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO1lBQ2hDLFdBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7WUFDN0IsV0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztZQUM3QixXQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1lBQzdCLFdBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO1lBQzFCLFdBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQzNCLFdBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7WUFDNUIsV0FBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztZQUNqQyxXQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1lBQzdCLFdBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUM7WUFDOUIsV0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7WUFDM0IsV0FBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztTQUMvQixDQUFBO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUMsYUFBYSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVPLDZCQUFJLEdBQVosVUFBYSxLQUF1QixFQUFDLEtBQXFCO1FBQTdDLHNCQUFBLEVBQUEsWUFBdUI7UUFBQyxzQkFBQSxFQUFBLFlBQXFCO1FBR3RELElBQUcsS0FBSyxJQUFFLElBQUksRUFDZDtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksSUFBRyxHQUFHLENBQUM7U0FDM0I7UUFDRCxJQUFHLEtBQUssSUFBRSxJQUFJLEVBQ2Q7WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2hILElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLElBQUcsR0FBRyxDQUFDO1NBQzNCO0lBQ0wsQ0FBQztJQUVPLHFDQUFZLEdBQXBCLFVBQXFCLEtBQVk7UUFFN0IsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUNuQjtZQUNJLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUUsS0FBSyxHQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDTyxxQ0FBWSxHQUFwQixVQUFxQixLQUFZO1FBRzdCLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFDbkI7WUFDSSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFFLEtBQUssR0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ08sZ0NBQU8sR0FBZixVQUFnQixHQUFVO1FBRXRCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFUyxtQ0FBVSxHQUFwQixVQUFxQixJQUFJO1FBRXJCLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFDbkI7WUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsY0FBZ0IsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBLENBQUEsQ0FBQyxDQUFFLENBQUM7U0FDNUQ7YUFDRDtZQUNJLGFBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLElBQUksWUFBRSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBSyx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO1NBQ25FO1FBQ0QsT0FBTztJQUNYLENBQUM7SUFFTSw4QkFBSyxHQUFaO1FBRUksSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBWSxtQkFBUyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSw0QkFBRyxHQUFWO1FBRUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sK0JBQU0sR0FBYjtJQUVBLENBQUM7SUFDTCxxQkFBQztBQUFELENBaElBLEFBZ0lDLENBaEk0QixhQUFLLENBQUMsY0FBYyxHQWdJaEQ7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBcUJFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0lHOzs7O0FDelZILHFDQUFtQztBQUNuQyw4REFBd0Q7QUFHeEQsMENBQW9DO0FBQ3BDLG9EQUErQztBQUMvQyxJQUFjLEtBQUssQ0F1TGxCO0FBdkxELFdBQWMsS0FBSztJQUNmO1FBQThCLDRCQUFrQjtRQUU1QzttQkFDSSxpQkFBTztRQUNYLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FMQSxBQUtDLENBTDZCLFNBQUcsQ0FBQyxHQUFHLEdBS3BDO0lBTFksY0FBUSxXQUtwQixDQUFBO0lBRUQsTUFBTTtJQUNOO1FBQXdDLDZCQUFTO1FBaUI3QztZQUFBLFlBQ0ksaUJBQU8sU0FFVjtZQURHLEtBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUEwQix5QkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztRQUMvRixDQUFDO1FBWEQsc0JBQVcsK0JBQVE7aUJBQW5CO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDOzs7V0FBQTtRQUNELHNCQUFXLCtCQUFRO2lCQUFuQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQzs7O1dBQUE7UUFRTSwwQkFBTSxHQUFiLFVBQWMsUUFBdUI7WUFDakMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN0QztpQkFBTTtnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7YUFDeEQ7UUFDTCxDQUFDO1FBRU0seUJBQUssR0FBWjtZQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUVNLHVCQUFHLEdBQVY7WUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDM0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRTtvQkFDOUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3hDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztpQkFDdEI7YUFDSjtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDcEIsYUFBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRU0sMEJBQU0sR0FBYjtZQUNJLElBQUksSUFBSSxDQUFDLFVBQVU7Z0JBQ2YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxDQUFDO1FBRUwsZ0JBQUM7SUFBRCxDQXBEQSxBQW9EQyxDQXBEdUMsU0FBRyxDQUFDLEtBQUssR0FvRGhEO0lBcERxQixlQUFTLFlBb0Q5QixDQUFBO0lBRUQ7UUFBMkMsZ0NBQXVCO1FBcUI5RDtZQUFBLFlBQ0ksaUJBQU8sU0FLVjtZQUpHLEtBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxtQkFBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQTBCLHlCQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7O1FBQy9GLENBQUM7UUFuQkQsc0JBQUksa0NBQVE7WUFEWixTQUFTO2lCQUNUO2dCQUNJLElBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUU7b0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7aUJBQ3RFO3FCQUFNO29CQUNILE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2lCQUN6RTtZQUNMLENBQUM7aUJBQ0QsVUFBYSxLQUFhO2dCQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztZQUNoQyxDQUFDOzs7V0FIQTtRQUlELHNCQUFJLHFDQUFXO2lCQUFmO2dCQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ25ELENBQUM7OztXQUFBO1FBU00sOEJBQU8sR0FBZDtZQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBRU0sZ0NBQVMsR0FBaEI7WUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDL0MsQ0FBQztRQU1NLDZCQUFNLEdBQWI7WUFDSSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFO2dCQUN4QixrREFBa0Q7Z0JBQ2xELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDNUM7UUFDTCxDQUFDO1FBRU0sNkJBQU0sR0FBYjtZQUNJLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLGlCQUFNLE1BQU0sV0FBRSxDQUFDO2FBQ2xCO1FBQ0wsQ0FBQztRQUVNLG1DQUFZLEdBQW5CO1lBQ0ksb0RBQW9EO1lBQ3BELElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM5RCxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDRDs7O1dBR0c7UUFDSSxxQ0FBYyxHQUFyQixVQUF1QixZQUEyQjtZQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFDTCxtQkFBQztJQUFELENBckVBLEFBcUVDLENBckUwQyxTQUFHLENBQUMsR0FBRyxHQXFFakQ7SUFyRXFCLGtCQUFZLGVBcUVqQyxDQUFBO0lBRUQ7UUFBNkMsa0NBQVM7UUFFbEQ7WUFBQSxZQUNJLGlCQUFPLFNBRVY7WUFERyxLQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBMEIseUJBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7UUFDL0YsQ0FBQztRQUNMLHFCQUFDO0lBQUQsQ0FOQSxBQU1DLENBTjRDLFNBQUcsQ0FBQyxLQUFLLEdBTXJEO0lBTnFCLG9CQUFjLGlCQU1uQyxDQUFBO0lBRUQ7UUFBb0Msa0NBQWM7UUFPOUM7Ozs7O1dBS0c7UUFDSCx3QkFBWSxVQUFpQixFQUFFLFVBQWlCLEVBQUUsU0FBK0I7WUFBakYsWUFDSSxpQkFBTyxTQUlWO1lBSEcsS0FBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7WUFDL0IsS0FBSSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7WUFDL0IsS0FBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7O1FBQ2pDLENBQUM7UUFkRCxzQkFBVyx5Q0FBYTtpQkFBeEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsT0FBdUIsQ0FBQztZQUN4QyxDQUFDOzs7V0FBQTtRQWNNLCtCQUFNLEdBQWI7UUFFQSxDQUFDO1FBRU0sNEJBQUcsR0FBVjtRQUVBLENBQUM7UUFFTSw4QkFBSyxHQUFaO1lBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvRCxJQUFJLElBQUksQ0FBQyxZQUFZO2dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwRCxJQUFJLElBQUksQ0FBQyxZQUFZO2dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRU8scUNBQVksR0FBcEI7WUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUVMLHFCQUFDO0lBQUQsQ0F4Q0EsQUF3Q0MsQ0F4Q21DLGNBQWMsR0F3Q2pEO0lBeENZLG9CQUFjLGlCQXdDMUIsQ0FBQTtBQUNMLENBQUMsRUF2TGEsS0FBSyxHQUFMLGFBQUssS0FBTCxhQUFLLFFBdUxsQjs7OztBQzdMRCw2Q0FBMkM7QUFNM0Msa0RBQTRDO0FBQzVDLGlFQUEyRDtBQUMzRCxzREFBZ0Q7QUFDaEQsOENBQXdDO0FBQ3hDLDRDQUEwQztBQUMxQyxzREFBb0Q7QUFDcEQsNENBQXNDO0FBQ3RDLG9EQUE4QztBQUM5QyxrREFBNEM7QUFFNUMsNkNBQXVDO0FBQ3ZDLGlFQUF1RDtBQU92RCxJQUFJLFFBQVEsR0FBRyxlQUFJLENBQUMsUUFBUSxDQUFDO0FBRTdCLE1BQU07QUFDTjtJQUEyQyxpQ0FBb0I7SUEyQzNEO1FBQUEsWUFDSSxpQkFBTyxTQWtCVjtRQWpCRyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUU1QixLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pDLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsYUFBRyxDQUFDLFlBQVksQ0FBQyxFQUFVLENBQUM7UUFDMUMsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7O0lBQzFCLENBQUM7SUFyQ0Qsc0JBQUksdUNBQVk7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxrQ0FBTzthQUFYO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFDRCxVQUFZLEtBQWE7WUFBekIsaUJBSUM7WUFIRyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxjQUFRLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDaEUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsY0FBUSxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7OztPQUxBO0lBTUQsc0JBQUksb0NBQVM7YUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxvQ0FBUzthQUFiO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvQyxDQUFDOzs7T0FBQTtJQXVCRCxzQ0FBYyxHQUFkLFVBQWUsS0FBMEI7UUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUNELHNDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQzlDLENBQUM7SUFDRCwrQkFBTyxHQUFQLFVBQVEsR0FBVztRQUNmLElBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELDBDQUFrQixHQUFsQixVQUFtQixHQUFXO1FBQzFCLElBQUksQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxvQ0FBWSxHQUFaLFVBQWEsR0FBVztRQUVwQixJQUFJLENBQUMsYUFBYSxJQUFJLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzNDLENBQUM7SUFFRCxRQUFRO0lBQ1IsaUNBQVMsR0FBVCxVQUFVLFFBQThCO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQzlCLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFHO1lBQy9FLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsaUNBQVMsR0FBVCxVQUFVLEtBQWE7UUFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO1FBQ2hELEtBQUssSUFBSSxTQUFTLEdBQVcsS0FBSyxFQUFFLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLFNBQVMsRUFBRztZQUNwRixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELFNBQVMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQzlCLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbEM7SUFDTCxDQUFDO0lBRUQsT0FBTztJQUNQLGtDQUFVLEdBQVYsVUFBVyxJQUFVO1FBQ2pCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUVELDZCQUFLLEdBQUw7UUFDSSxJQUFJLEVBQUUsR0FBYyxhQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBWSxtQkFBUyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQy9CLG9EQUFvRDtJQUN4RCxDQUFDO0lBRUQsMkJBQUcsR0FBSDtJQUdBLENBQUM7SUFDRCxNQUFNO0lBQ04sK0JBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QscUNBQWEsR0FBYixVQUFjLElBQVk7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELE1BQU07SUFDTixnQ0FBUSxHQUFSLFVBQVMsT0FBZ0I7UUFDckIseUJBQXlCO1FBQ3pCLFlBQVk7UUFDWixJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNyQyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUc7WUFDZixPQUFPO1NBQ1Y7UUFDRCxJQUFJLE9BQU8sRUFBRztZQUNWLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzNCO2FBQU87WUFDSixJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRztZQUMzQyxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRDs7O09BR0c7SUFDSCx1Q0FBZSxHQUFmLFVBQWdCLEtBQWE7UUFDekIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQyxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFHO1lBQzdCLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUN6RixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELHVDQUFlLEdBQWYsVUFBZ0IsS0FBYSxFQUFFLEtBQVUsRUFBRSxRQUE4QjtRQUNyRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUc7WUFDckUsT0FBTztTQUNWO1FBQ0QsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2RCxLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLEdBQUcsRUFBRztZQUNuRCxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlCO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILHlDQUFpQixHQUFqQixVQUFrQixRQUE4QjtRQUM1QyxJQUFJLE9BQU8sR0FBUyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFRCxzQkFBSSxzQ0FBVzthQUFmO1lBQ0ksSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLHVCQUFTLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUNELHNCQUFJLDBDQUFlO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRCxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLG1DQUFRO2FBQVo7WUFFSSxPQUFRLElBQUksQ0FBQyxPQUF3QixDQUFDLFFBQVEsQ0FBQztRQUNuRCxDQUFDOzs7T0FBQTtJQUdELGtCQUFrQjtJQUNYLDZCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksb0JBQVUsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkUsYUFBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLFVBQVUsR0FBRyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUM7UUFDcEQsS0FBSyxJQUFJLE9BQU8sR0FBVyxVQUFVLEdBQUcsQ0FBQyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUc7WUFDakUsSUFBSSxZQUFZLEdBQUcsSUFBSSxtQkFBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuRCxhQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxZQUFZLENBQUM7U0FDM0M7UUFDRCxNQUFNO1FBRU4sTUFBTTtRQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7UUFDM0IsYUFBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5QyxVQUFVO1FBQ1YsYUFBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMseUJBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxvQkFBb0I7SUFDVixpQ0FBUyxHQUFuQjtRQUNJLGFBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7UUFDekUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHVCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNO1FBQ04sSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGVBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO1FBQ2hELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7UUFDakQsSUFBSSxLQUFLLEdBQWdCLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekMsU0FBUztRQUNULElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQixLQUFLLElBQUksR0FBRyxHQUFXLENBQUMsRUFBRSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRztZQUNsRCxJQUFJLElBQUksR0FBYyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDUCxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDaEM7Z0JBQ0YsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztnQkFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUMzRDtZQUNELElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLHVCQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsdUJBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoTCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUV2QixJQUFJLENBQUMsT0FBTyxHQUFHLGFBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDeEMsQ0FBQztJQUVNLDhCQUFNLEdBQWI7UUFDSSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFHO1lBQzNCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0QjtJQUNMLENBQUM7SUFFRCxZQUFZO0lBQ0osc0NBQWMsR0FBdEI7UUFDSSxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsRUFBRztZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztTQUN6QjtRQUNELEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUVwQixJQUFJLFVBQVUsR0FBaUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFFdkQsSUFBSSxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRztZQUN2RixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRztZQUNsQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsY0FBYztJQUNOLG1DQUFXLEdBQW5CO1FBQ0ksSUFBSSxJQUFJLEdBQVcsRUFBRSxDQUFBO1FBQ3JCLElBQUksU0FBUyxHQUFXLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN4RCxJQUFJLFNBQVMsR0FBRyxDQUFDO1lBQ2IsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ25DO1lBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQzlCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE9BQU87SUFDRyxrQ0FBVSxHQUFwQjtRQUNJLElBQUksT0FBTyxHQUFjLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDdkUsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDdkUsSUFBSSxTQUFTLEdBQVcsT0FBTyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFM0IsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7T0FHRztJQUNPLHNDQUFjLEdBQXhCLFVBQXlCLEtBQWE7UUFDbEMsSUFBSSxPQUFPLEdBQXNDLEVBQUUsQ0FBQztRQUNwRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLFlBQVk7UUFDWixJQUFJLFNBQVMsQ0FBQyxXQUFXO1lBQ3JCLE9BQU87UUFDWCxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUM3Qjs7OztlQUlPO1FBQ1A7WUFDSSxlQUFlO1lBQ2YsT0FBTyxHQUFHLEVBQUUsQ0FBQTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDO1FBQ0QsU0FBUztRQUNULElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUc7WUFDNUMsT0FBTztTQUNWO1FBQ0QsWUFBWTtRQUNaLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFekIsWUFBWTtRQUNaLElBQUksV0FBVyxHQUErQixFQUFFLENBQUM7UUFDakQsS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUc7WUFDekIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1RCxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLEVBQUc7Z0JBQ3BDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDNUI7U0FDSjtRQUNELGdCQUFnQjtRQUNoQixJQUFJLFFBQVEsR0FBYyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RELElBQUksVUFBVSxHQUFnQixJQUFJLEtBQUssRUFBRSxDQUFDO1FBQzFDLGFBQWE7UUFDYixJQUFJLFlBQVksR0FBZ0IsSUFBSSxLQUFLLEVBQVEsQ0FBQztRQUNsRCxLQUFLLElBQUksT0FBTyxHQUFXLENBQUMsRUFBRSxPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRztZQUN0RSxJQUFJLE9BQU8sR0FBUyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFNBQVMsRUFBRztnQkFDcEMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM1QjtpQkFBTztnQkFDSixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7UUFDRCxLQUFLO1FBQ0wsSUFBSSxZQUFZLEdBQXdCLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDN0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFdEQsTUFBTTtRQUNOLEtBQUssSUFBSSxXQUFXLEdBQVcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFHO1lBQ2pGLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDOUM7UUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDOUMsV0FBVztRQUNYLGtDQUFrQztJQUN0QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCx3Q0FBZ0IsR0FBaEIsVUFBaUIsUUFBNkIsRUFBRSxVQUF1QixFQUFFLFVBQTBCO1FBQTFCLDJCQUFBLEVBQUEsaUJBQTBCO1FBQy9GLEtBQUssSUFBSSxPQUFPLEdBQVcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUUsT0FBTyxFQUFHO1lBQ2pFLElBQUksSUFBSSxHQUFpQixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0MsS0FBSyxJQUFJLGFBQWEsR0FBVyxDQUFDLEVBQUUsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUk7Z0JBQy9ELElBQUksVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUc7b0JBQ3hCLE1BQU07aUJBQ1Q7Z0JBQ0QsWUFBWTtnQkFDWixJQUFJLFNBQVMsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3RFLElBQUksSUFBSSxHQUFTLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QixJQUFJLFVBQVUsSUFBSSxJQUFJO29CQUNsQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDakMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ2pCO1lBQ0QsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRztnQkFDeEIsTUFBTTthQUNUO1NBQ0o7UUFDRCxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUc7WUFDZCxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCxzQ0FBYyxHQUFkLFVBQWUsUUFBZ0I7UUFDM0IsS0FBSyxJQUFJLFVBQVUsR0FBVyxJQUFJLENBQUMsV0FBVyxFQUFFLFVBQVUsSUFBSSxRQUFRLEVBQUUsRUFBRSxVQUFVLEVBQUc7WUFDbkYsSUFBSSxLQUFLLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RCxJQUFJLEtBQUssSUFBSSxJQUFJO2dCQUNiLE9BQU87WUFDWCxLQUFLLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRztnQkFDM0QsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7YUFDekI7U0FDSjtRQUNELElBQUksS0FBSyxHQUFjLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzlELEtBQUssSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFHO1lBQzNELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUc7Z0JBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM1QztTQUNKO1FBQ0QsSUFBSSxXQUFXLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1RCxlQUFlO1FBQ2YsSUFBSSxVQUFVLEdBQXNDLEVBQUUsQ0FBQTtRQUN0RCxJQUFJLElBQUksR0FBVyxHQUFHLENBQUE7UUFDdEIsS0FBSyxJQUFJLE9BQU8sR0FBVyxDQUFDLEVBQUUsT0FBTyxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUc7WUFDekUsSUFBSSxVQUFVLEdBQVMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwRCxJQUFJLFVBQVUsQ0FBQyxJQUFJLElBQUksU0FBUyxFQUFHO2dCQUMvQixJQUFJLElBQUksR0FBVyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztnQkFDMUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxFQUFHO29CQUNoQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztpQkFDbEM7Z0JBRUQsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsQztTQUNKO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUNEOzs7OztPQUtHO0lBQ0gsa0NBQVUsR0FBVixVQUFXLElBQVUsRUFBRSxJQUFTLEVBQUUsY0FBc0I7UUFDcEQsSUFBSSxJQUFJLENBQUMsVUFBVTtZQUNmLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksY0FBYyxFQUFHO1lBQ3hDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEVBQUc7Z0JBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO2FBQ25CO1lBQ0QsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksUUFBaUIsQ0FBQztRQUN0QixJQUFJLFNBQWtCLENBQUM7UUFDdkIsSUFBSSxVQUFVLEdBQVMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN2QyxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFHO1lBQy9DLElBQUksVUFBVSxDQUFDLElBQUksSUFBSSxTQUFTO2dCQUM1QixRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDOztnQkFFN0QsUUFBUSxHQUFHLElBQUksQ0FBQztTQUN2QjtRQUNELElBQUksV0FBVyxHQUFTLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekMsSUFBSSxXQUFXLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsRUFBRztZQUNqRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksU0FBUztnQkFDN0IsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQzs7Z0JBRS9ELFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksU0FBUyxFQUFHO1lBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1NBQ25CO1FBQ0QsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLFNBQVMsRUFBRztZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixPQUFPLEtBQUssQ0FBQztTQUNoQjthQUFPO1lBQ0osT0FBTyxJQUFJLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCwyQ0FBbUIsR0FBbkIsVUFBb0IsUUFBZ0I7UUFDaEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUc7WUFDckMsT0FBTztTQUNWO1FBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRCxLQUFLLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRztZQUMzRCxJQUFJLElBQUksR0FBUyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFHO2dCQUNuQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUM5QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNoQyxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUc7b0JBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFHO3dCQUN2QixFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUM7cUJBQ3RCO2lCQUNKO2dCQUNELElBQUksU0FBUyxJQUFJLElBQUksRUFBRztvQkFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUc7d0JBQ3hCLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQztxQkFDdkI7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsS0FBSyxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUUsV0FBVyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxXQUFXLEVBQUc7WUFDM0UsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRztnQkFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7Z0JBQ3RCLHFCQUFxQjthQUN4QjtTQUNKO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILHNDQUFjLEdBQWQsVUFBZSxLQUFhO1FBQ3hCLElBQUksWUFBWSxHQUFrQixFQUFFLENBQUM7UUFDckMsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2RCxJQUFJLE9BQU8sR0FBVyxDQUFDLENBQUM7UUFDeEIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0I7WUFDRixLQUFLLElBQUksUUFBUSxHQUFXLENBQUMsRUFBRSxRQUFRLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRztnQkFDMUUsSUFBSSxJQUFJLEdBQVMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxTQUFTLEdBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDckMsSUFBSSxVQUFVLEdBQVMsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDdkMsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRztvQkFDN0MsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDL0I7cUJBQU0sSUFBSSxVQUFVLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRztvQkFDdEQsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDL0I7cUJBQ0s7b0JBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7aUJBQzFCO2FBRUo7U0FDSjtRQUVELElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFHO1lBQ2hDLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUM1QixZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0M7UUFFRCxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBRUQsc0NBQWMsR0FBZCxVQUFlLFNBQW9CO1FBQy9CLElBQUksQ0FBQyxTQUFTLEVBQUc7WUFDYixPQUFPO1NBQ1Y7UUFDRCxLQUFLLElBQUksUUFBUSxHQUFXLENBQUMsRUFBRSxRQUFRLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLFFBQVEsRUFBRztZQUMxRSxJQUFJLElBQUksR0FBUyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILHFDQUFhLEdBQWIsVUFBYyxLQUFhO1FBQ3ZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSSxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNDLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRztZQUNqRSxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7U0FFcEU7YUFDSztZQUNGLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztTQUN4RDtJQUVMLENBQUM7SUFDRDs7O09BR0c7SUFDSCxvQ0FBWSxHQUFaLFVBQWEsS0FBYTtRQUN0QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQy9CLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUc7WUFDN0IsT0FBTztTQUNWO1FBQ0QsS0FBSyxJQUFJLFVBQVUsR0FBVyxTQUFTLENBQUMsUUFBUSxFQUFFLFVBQVUsSUFBSSxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQUc7WUFDbEYsSUFBSSxXQUFXLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5RCxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFDTCxvQkFBQztBQUFELENBcm1CQSxBQXFtQkMsQ0FybUIwQyxhQUFLLENBQUMsY0FBYyxHQXFtQjlEOzs7OztBQ2hvQkQsSUFBYyxJQUFJLENBaUNqQjtBQWpDRCxXQUFjLElBQUk7SUFFSCxhQUFRLEdBQVcsSUFBSSxDQUFDO0lBRXhCLG1CQUFjLEdBQVUsWUFBWSxDQUFDO0lBQ3JDLGlCQUFZLEdBQVUsS0FBQSxRQUFRLENBQUEsQ0FBQyxDQUFBLGtFQUFrRSxDQUFBLENBQUMsQ0FBQSxvREFBb0QsQ0FBQztJQUN2SixXQUFNLEdBQVUsS0FBQSxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQ3JDLGNBQVMsR0FBVSxLQUFBLFlBQVksR0FBQyxLQUFLLENBQUE7SUFFaEQ7OztPQUdHO0lBQ0gsb0JBQTJCLFFBQWU7UUFFdEMsT0FBTyxLQUFBLE1BQU0sR0FBRyxRQUFRLEdBQUMsUUFBUSxDQUFDO0lBQ3RDLENBQUM7SUFIZSxlQUFVLGFBR3pCLENBQUE7SUFDRDs7O09BR0c7SUFDSCx1QkFBOEIsUUFBZTtRQUV6QyxPQUFRLEtBQUEsTUFBTSxHQUFDLFFBQVEsR0FBQyxPQUFPLENBQUM7SUFDcEMsQ0FBQztJQUhlLGtCQUFhLGdCQUc1QixDQUFBO0lBQ0Q7OztPQUdHO0lBQ0gsZUFBc0IsUUFBZTtRQUVqQyxPQUFPLEtBQUEsU0FBUyxHQUFFLEtBQUEsY0FBYyxHQUFDLFFBQVEsR0FBQyxnQkFBZ0IsR0FBRSxRQUFRLEdBQUcsS0FBSyxDQUFBO0lBQ2hGLENBQUM7SUFIZSxVQUFLLFFBR3BCLENBQUE7QUFDTCxDQUFDLEVBakNhLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQWlDakI7Ozs7QUNqQ0QsSUFBYyxNQUFNLENBb0JuQjtBQXBCRCxXQUFjLE1BQU07SUFFaEIsT0FBTztJQUNQLHVCQUErQixLQUFZO1FBRXZDLElBQUcsQ0FBQyxLQUFLLEVBQ1Q7WUFDSSxPQUFRO1NBQ1g7UUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLEtBQUssR0FBVSxVQUFVLEdBQUMsS0FBSyxDQUFDO1FBQ3BDLE9BQVEsS0FBSyxDQUFDO0lBQ2xCLENBQUM7SUFUZSxvQkFBYSxnQkFTNUIsQ0FBQTtJQUNELGVBQXVCLElBQWdCO1FBRW5DLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO0lBQzFDLENBQUM7SUFOZSxZQUFLLFFBTXBCLENBQUE7QUFDTCxDQUFDLEVBcEJhLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQW9CbkI7Ozs7QUNwQkQsOERBQXNEO0FBQ3RELHNEQUFnRDtBQUNoRCw0REFBa0Q7QUFDbEQsc0RBQXlDO0FBRXpDO0lBQUE7SUErQkEsQ0FBQztJQTVCRyxzQkFBVyxxQkFBYzthQUF6QjtZQUVJLElBQUcsR0FBRyxDQUFDLFFBQVEsSUFBRyxJQUFJLEVBQ3RCO2dCQUNJLEdBQUcsQ0FBQyxRQUFRLEdBQUcsbUJBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUEwQix5QkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3JGO1lBQ0QsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBR0Qsc0JBQVcsZ0JBQVM7YUFBcEI7WUFFSSxJQUFHLEdBQUcsQ0FBQyxVQUFVLElBQUcsSUFBSSxFQUN4QjtnQkFDSSxHQUFHLENBQUMsVUFBVSxHQUFHLG1CQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBWSxtQkFBUyxDQUFDLENBQUM7YUFDM0Q7WUFDRCxPQUFPLEdBQUcsQ0FBQyxVQUFVLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxtQkFBWTthQUF2QjtZQUVJLElBQUcsR0FBRyxDQUFDLFNBQVMsSUFBRyxJQUFJLEVBQ3ZCO2dCQUNJLEdBQUcsQ0FBQyxTQUFTLEdBQUcsbUJBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFXLHNCQUFRLENBQUMsQ0FBQzthQUN4RDtZQUNELE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVMLFVBQUM7QUFBRCxDQS9CQSxBQStCQyxJQUFBOzs7OztBQ25DRCxtREFBK0M7QUFDL0MsZ0VBQTZEO0FBQzdELGlEQUEyQztBQUMzQyxtREFBNkM7QUFDN0Msa0RBQTRDO0FBRTVDLDZCQUF1QjtBQUN2QixnRUFBMkQ7QUFHM0Q7SUFBQTtJQU1BLENBQUM7SUFKRyxzQkFBVywwQkFBYTthQUF4QjtZQUVJLE9BQVEsYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUNMLGdCQUFDO0FBQUQsQ0FOQSxBQU1DLElBQUE7O0FBRUQ7SUFFSTtJQUNBLENBQUM7SUFFRCxzQkFBVyxvQkFBRzthQUFkO1lBQ0ksSUFBSSxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDNUIsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO2FBQzVDO1lBQ0QsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBUUQsc0JBQUksc0NBQVc7UUFGZixNQUFNO1FBQ04sU0FBUzthQUNUO1lBRUksSUFBRyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQ3JCO2dCQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQzthQUMzQjtZQUNELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHFDQUFVO1FBRGQsTUFBTTthQUNOO1lBRUksSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQ3BCO2dCQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO2FBQ3pCO1lBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBRUQsc0JBQUkscUNBQVU7UUFEZCxNQUFNO2FBQ047WUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFDcEI7Z0JBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7YUFDM0I7WUFDRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBWTtRQURoQixTQUFTO2FBQ1Q7WUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFDdEI7Z0JBQ0ksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDM0U7WUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx5Q0FBYztRQURsQixRQUFRO2FBQ1I7WUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFDeEI7Z0JBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO2FBQ3ZDO1lBQ0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsbUNBQVcsR0FBWCxVQUFZLEVBQVU7UUFDbEIsSUFBSSxVQUFVLEdBQW9CLDBCQUFtQixDQUFDLFVBQVUsQ0FBQztRQUNqRSxJQUFJLGFBQWEsR0FBaUIsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUMzRCxJQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUNyQjtZQUNJLElBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUMvQjtnQkFDSSxPQUFPO2FBQ1Y7U0FDSjtRQUNELFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFFBQVE7SUFDUixvQ0FBWSxHQUFaO1FBQ0ksSUFBSSxLQUFLLEdBQUcsYUFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWEsb0JBQVUsQ0FBQyxDQUFDLENBQUEsa0JBQWtCO0lBQzdFLENBQUM7SUFFRCxRQUFRO0lBQ0QsMENBQWtCLEdBQXpCO1FBQ0ksSUFBSSxTQUFTLEdBQUcsYUFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWMscUJBQVcsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFHRCxzQkFBSSxrQ0FBTzthQUFYO1lBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHVCQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDNUM7WUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQVksS0FBeUI7WUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQzs7O09BSkE7SUFNRCxRQUFRO0lBQ1IsbUNBQVcsR0FBWCxVQUFZLElBQXdCO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxRQUFRO0lBQ1Isa0NBQVUsR0FBVjtRQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsbUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0QsaUNBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBQ0Qsc0JBQUksa0NBQU87YUFBWDtZQUNJLE9BQU8sYUFBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBd0IsQ0FBQztRQUM5RCxDQUFDOzs7T0FBQTtJQUNELGFBQWE7SUFDYixrQ0FBVSxHQUFWO1FBQ0ksSUFBSSxZQUFZLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7UUFDbkMsYUFBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFlBQVk7SUFDWixxQ0FBYSxHQUFiLFVBQWMsSUFBYztRQUN4QixPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCwrQkFBTyxHQUFQLFVBQVEsRUFBUztRQUViLDBCQUFnQixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FqSUEsQUFpSUMsSUFBQTs7OztBQ3BKRCw4REFBd0Q7QUFDeEQ7SUFBeUMsK0JBQVE7SUF1QzdDO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBL0JELHNCQUFJLDRCQUFHO2FBQVA7WUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFnQixDQUFDO2FBQ2pEO1lBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsZ0NBQU87YUFBbEIsVUFBbUIsRUFBVTtZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLDRCQUFHO2FBQWQ7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVywrQkFBTTthQUFqQjtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLCtCQUFNO2FBR2pCO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN6QixDQUFDO2FBTEQsVUFBa0IsS0FBYztZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFJRCxzQkFBVyw0QkFBRzthQUFkLFVBQWUsR0FBVztZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsOEJBQUs7YUFBaEIsVUFBaUIsR0FBVztZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQUtELDBCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFlLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFlLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFHO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztJQUVNLCtCQUFTLEdBQWhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWTtZQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLDZCQUFPLEdBQWQ7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSwrQkFBUyxHQUFoQixVQUFpQixLQUFVLEVBQUUsUUFBOEI7UUFDdkQsSUFBSSxXQUFXLEdBQUcsSUFBSSx5QkFBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUVNLGtDQUFZLEdBQW5CLFVBQW9CLEtBQVUsRUFBRSxRQUE4QjtRQUMxRCxJQUFJLFdBQVcsR0FBRyxJQUFJLHlCQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUNwQyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQXpFQSxBQXlFQyxDQXpFd0MsSUFBSSxDQUFDLEdBQUcsR0F5RWhEOzs7OztBQzFFRCw4REFBd0Q7QUFDeEQsMENBQW9DO0FBRXBDO0lBQXlDLCtCQUFVO0lBMEMvQztlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQXRDRCxzQkFBSSw0QkFBRzthQUFQO1lBQUEsaUJBU0M7WUFSRyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFnQixDQUFDO2dCQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQ2pDLHVCQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzVELGFBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxDQUFBO2FBQ0w7WUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCwyQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDZDtJQUNMLENBQUM7SUFFTSw2QkFBTyxHQUFkLFVBQWUsTUFBYztRQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVNLHNDQUFnQixHQUF2QixVQUF3QixhQUFzQjtRQUUxQyxJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxhQUFhLENBQUMsQ0FBQyxDQUFBLHFDQUFxQztJQUMzRixDQUFDO0lBRUQsc0JBQVcsb0NBQVc7YUFBdEIsVUFBdUIsRUFBUztZQUU1QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUNELDBCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFlLENBQUM7SUFDakQsQ0FBQztJQUtMLGtCQUFDO0FBQUQsQ0E3Q0EsQUE2Q0MsQ0E3Q3dDLElBQUksQ0FBQyxLQUFLLEdBNkNsRDs7Ozs7QUNoREQsMENBQXNDO0FBQ3RDLHlDQUE4QjtBQUM5QiwrQ0FBMEM7QUFFMUM7SUFBa0Msd0JBQU87SUFZckM7UUFBQSxZQUNJLGlCQUFPLFNBOEJWO1FBNUJHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFO1FBQzdCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLG1CQUFRLENBQUMsU0FBUyxFQUFlLENBQUM7UUFDckQsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLG1CQUFRLENBQUMsU0FBUyxFQUFlLENBQUM7UUFDeEQsZ0NBQWdDO1FBQ2pDLEtBQUksSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFDLFFBQVEsR0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUNoRDtZQUNJLElBQUksS0FBSyxHQUFjLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hDLEtBQUssQ0FBQyxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUNuRCxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNuQixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksR0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDO1lBQzlCLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7UUFDRCxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMvQyxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQy9DLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7UUFDdEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7O1FBQ3ZCLHFDQUFxQztJQUN6QyxDQUFDO0lBekNELDZCQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUF3Q0Q7Ozs7Ozs7Ozs7T0FVRztJQUNILFdBQVc7SUFDWCw2QkFBYyxHQUFkLFVBQWdCLE1BQWE7UUFFekIsT0FBTyxNQUFNLEdBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdkIsQ0FBQztJQUNELHFCQUFNLEdBQU4sVUFBTyxTQUFnQjtRQUVuQixJQUFJLFNBQVMsR0FBbUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNqRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEIsSUFBSSxLQUFLLEdBQVUsQ0FBQyxDQUFDO1FBQ3JCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzlCLE9BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUMxQjtZQUNJLElBQUksSUFBSSxHQUE4QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdELElBQUksTUFBTSxHQUFlLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsTUFBTSxHQUFHLFNBQVMsR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFDLElBQUksQ0FBQztZQUM3RCxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLElBQUcsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDN0I7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7YUFDN0M7WUFDRCxFQUFFLEtBQUssQ0FBQztTQUNYO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFDRCx1QkFBUSxHQUFSLFVBQVMsTUFBYTtRQUVsQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztJQUNoRCxDQUFDO0lBQ0QseUJBQVUsR0FBVixVQUFZLE1BQWE7UUFFckIsdUNBQXVDO1FBQ3ZDLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsOEJBQThCO0lBRWxDLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0E5RkEsQUE4RkMsQ0E5RmlDLGNBQUUsQ0FBQyxJQUFJLEdBOEZ4Qzs7Ozs7QUNsR0Qsc0RBQWdEO0FBQ2hELHNEQUF5QztBQUN6QywrQ0FBMkM7QUFJM0MsTUFBTTtBQUNOO0lBQTZDLDBCQUFRO0lBV2pELGdCQUFZLElBQVc7UUFBdkIsWUFFSSxpQkFBTyxTQVVWO1FBVEcsS0FBSSxDQUFDLE9BQU8sR0FBRyxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7UUFDdkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxtQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQVksbUJBQVMsQ0FBQyxDQUFDO1FBQ3pELEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEtBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztJQUNYLENBQUM7SUFDRCxxQkFBSSxHQUFKO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELHFCQUFJLEdBQUo7SUFFQSxDQUFDO0lBRUQsc0JBQUssR0FBTDtJQUVBLENBQUM7SUFFRCx1QkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCx3QkFBTyxHQUFQO1FBRUksdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsd0JBQU8sR0FBUDtRQUVJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsc0JBQUksMEJBQU07YUFBVjtZQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDJCQUFPO2FBQVg7WUFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3QkFBSTthQUFSO1lBRUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMkJBQU87YUFBWDtZQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVEOzs7T0FHRztJQUNJLHNCQUFLLEdBQVosVUFBYSxFQUFZO1FBRXJCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNNLHlCQUFRLEdBQWY7UUFFSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsc0JBQVcseUJBQUs7YUFBaEI7WUFFSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFTSwyQkFBVSxHQUFqQjtRQUVJLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDRCx5QkFBUSxHQUFSO1FBRUksSUFBRyxJQUFJLENBQUMsTUFBTSxFQUNkO1lBQ0ksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1NBQ3BCO0lBQ0wsQ0FBQztJQUVMLGFBQUM7QUFBRCxDQXhHQSxBQXdHQyxDQXhHNEMsSUFBSSxDQUFDLEdBQUcsR0F3R3BEOzs7OztBQzlHRCx5Q0FBZ0M7QUFDaEMsbUNBQTZCO0FBQzdCLDBDQUF3QztBQUN4Qyw4REFBd0Q7QUFDeEQsMENBQW9DO0FBSXBDLGdFQUEwRDtBQUUxRCx3REFBZ0Q7QUFFaEQ7SUFBaUMsc0NBQWM7SUFLM0M7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFORCwyQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBS0wseUJBQUM7QUFBRCxDQVJBLEFBUUMsQ0FSZ0MsY0FBRSxDQUFDLFdBQVcsR0FROUM7QUFFRDtJQUF5QywrQkFBTTtJQWEzQyxxQkFBWSxJQUFZO1FBQXhCLFlBQ0ksa0JBQU0sSUFBSSxDQUFDLFNBUWQ7UUFQRyxLQUFJLENBQUMsR0FBRyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztRQUNwQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDZixLQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckQsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztJQUN6QixDQUFDO0lBbEJPLG9DQUFjLEdBQXRCLFVBQXVCLElBQWMsRUFBRSxLQUFhO1FBQXBELGlCQU9DO1FBTkcsSUFBSSxXQUFXLEdBQWdCLElBQW1CLENBQUM7UUFDbkQsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLElBQUksYUFBYSxHQUFrQiwwQkFBZ0IsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzdFLFdBQVcsQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2RCxXQUFXLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUNoQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsY0FBUSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQVlNLGdCQUFJLEdBQVg7UUFDSSxPQUFPLGFBQWEsQ0FBQztJQUN6QixDQUFDO0lBRUQsc0NBQWdCLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsNkJBQU8sR0FBUDtRQUNJLElBQUksU0FBUyxHQUFlLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxDQUFBLGtCQUFrQjtRQUNqRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQTtJQUNqRCxDQUFDO0lBRUQsNEJBQU0sR0FBTjtJQUVBLENBQUM7SUFDRCwwQkFBSSxHQUFKO1FBQ0ksYUFBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RixhQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxxQkFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRixhQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxxQkFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRCwyQkFBSyxHQUFMO1FBQ0ksYUFBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RixhQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxxQkFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRixhQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxxQkFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxJQUFJO0lBQ0ksZ0NBQVUsR0FBbEIsVUFBbUIsRUFBVTtRQUN6QixJQUFJLEVBQUUsSUFBSSwwQkFBZ0IsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFHO1lBQ2hELGFBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLE9BQU87U0FDVjtRQUNELHVCQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU8sbUNBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRztZQUNoQixPQUFPO1NBQ1Y7UUFDRCxhQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU8sa0NBQVksR0FBcEI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRztZQUNoQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUM1QixDQUFDO0lBRU8sbUNBQWEsR0FBckI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRztZQUNoQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRywwQkFBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FyRkEsQUFxRkMsQ0FyRndDLGdCQUFNLEdBcUY5Qzs7Ozs7QUM1R0QseUNBQThCO0FBQzlCLG1DQUE2QjtBQUU3QiwwQ0FBc0M7QUFDdEMsd0RBQW1EO0FBRW5ELDhEQUFvRDtBQUVwRDtJQUE4QixtQ0FBWTtJQU10QztRQUFBLFlBRUksaUJBQU8sU0FPVjtRQU5HLDBCQUEwQjtRQUMxQixpQ0FBaUM7UUFDakMsaUNBQWlDO1FBQ2pDLEtBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLHVCQUFhLENBQUMsR0FBRyxFQUFDLHVCQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25GLEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLHVCQUFTLENBQUMsYUFBYSxFQUFDLHVCQUFTLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9GLEtBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLHVCQUFTLENBQUMsYUFBYSxFQUFDLHVCQUFTLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUNsRyxDQUFDO0lBYkQsd0NBQWMsR0FBZDtRQUVJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQVdMLHNCQUFDO0FBQUQsQ0FoQkEsQUFnQkMsQ0FoQjZCLGNBQUUsQ0FBQyxTQUFTLEdBZ0J6QztBQUVEO0lBQXVDLDZCQUFNO0lBT3pDLG1CQUFZLElBQVc7UUFBdkIsWUFFSSxrQkFBTSxJQUFJLENBQUMsU0FJZDtRQUhHLEtBQUksQ0FBQyxFQUFFLEdBQUUsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUMvQixLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7UUFDcEIsMkdBQTJHO0lBQy9HLENBQUM7SUFYTSxjQUFJLEdBQVg7UUFFSSxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBU0QsMEJBQU0sR0FBTjtJQUdBLENBQUM7SUFDTCxnQkFBQztBQUFELENBbEJBLEFBa0JDLENBbEJzQyxnQkFBTSxHQWtCNUM7Ozs7O0FDNUNELHlDQUE4QjtBQUM5QiwwQ0FBc0M7QUFDdEMsbUNBQTZCO0FBSTdCLDhEQUF3RDtBQUV4RDtJQUFnQyxxQ0FBVTtJQU10QztRQUFBLFlBRUksaUJBQU8sU0FPVjtRQU5HLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDL0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQy9CLEtBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLHVCQUFhLENBQUMsYUFBYSxFQUFDLHVCQUFhLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEgsS0FBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsdUJBQWEsQ0FBQyxhQUFhLEVBQUMsdUJBQWEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDekcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsdUJBQWEsQ0FBQyxhQUFhLEVBQUMsdUJBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ3ZHLENBQUM7SUFiRCwwQ0FBYyxHQUFkO1FBRUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBV0wsd0JBQUM7QUFBRCxDQWhCQSxBQWdCQyxDQWhCK0IsY0FBRSxDQUFDLE9BQU8sR0FnQnpDO0FBRUQ7SUFBeUMsK0JBQU07SUFPM0MscUJBQVksSUFBVztRQUF2QixZQUVJLGtCQUFNLElBQUksQ0FBQyxTQUtkO1FBSkcsS0FBSSxDQUFDLEdBQUcsR0FBRSxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDbEMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxLQUFLLEdBQWEsS0FBSSxDQUFDLFVBQVUsQ0FBQzs7UUFDdEMsa0dBQWtHO0lBQ3RHLENBQUM7SUFaTSxnQkFBSSxHQUFYO1FBRUksT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQVVELDRCQUFNLEdBQU47SUFHQSxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQW5CQSxBQW1CQyxDQW5Cd0MsZ0JBQU0sR0FtQjlDOzs7OztBQzdDRDs7R0FFRztBQUNILHlDQUE4QjtBQUM5QixtQ0FBNkI7QUFFN0IsMENBQXNDO0FBRXRDLDJDQUFxQztBQUNyQyw4REFBd0Q7QUFDeEQ7SUFBNEIsaUNBQVM7SUFVakM7ZUFFSSxpQkFBTztJQUNYLENBQUM7SUFYRCxzQ0FBYyxHQUFkO1FBRUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ0Qsb0NBQVksR0FBWixVQUFhLElBQWU7UUFBZixxQkFBQSxFQUFBLFNBQWU7UUFFeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUUsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFLTCxvQkFBQztBQUFELENBZEEsQUFjQyxDQWQyQixjQUFFLENBQUMsTUFBTSxHQWNwQztBQUNEO0lBQW9DLDBCQUFNO0lBTXRDLGdCQUFZLElBQVc7UUFBdkIsWUFFSSxrQkFBTSxJQUFJLENBQUMsU0FzQmQ7UUFyQkcsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsS0FBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQy9CLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLCtCQUErQjtRQUMvQiwyQ0FBMkM7UUFDM0MsaUNBQWlDO1FBQ2pDLDJDQUEyQztRQUMzQyxJQUFJLFNBQVMsR0FBRyx1QkFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQzlELEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7WUFDM0MsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQWEsb0JBQVUsQ0FBQyxDQUFBO1FBQUEsQ0FBQyxDQUFDLENBQUE7UUFDbEQsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLEtBQUksQ0FBQyxXQUFXLEdBQUUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RCxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtRQUN6QixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixLQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztJQUMzQixDQUFDO0lBRU8sOEJBQWEsR0FBckI7UUFFSSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTyw2QkFBWSxHQUFwQjtRQUVJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNNLFdBQUksR0FBWDtRQUVJLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQkFBSSx3QkFBSTthQUFSLFVBQVMsSUFBVztZQUVoQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFDRCw2QkFBWSxHQUFaLFVBQWEsS0FBUyxFQUFDLFFBQWlCO1FBRXBDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELDhCQUFhLEdBQWIsVUFBYyxLQUFTLEVBQUMsUUFBaUI7UUFFckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxRQUFRLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsNkJBQVksR0FBWixVQUFhLElBQWU7UUFBZixxQkFBQSxFQUFBLFNBQWU7UUFFeEIsSUFBRyxJQUFJLElBQUUsRUFBRSxFQUNYO1lBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN6QjthQUVEO1lBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxzQkFBSSw2QkFBUzthQUFiLFVBQWMsS0FBYTtZQUV2QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksNEJBQVE7YUFBWixVQUFhLEtBQVk7WUFFckIsSUFBSSxHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUM3QjtnQkFDSSxPQUFNO2FBQ1Q7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMxQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSwyQkFBTzthQUFYLFVBQVksS0FBWTtZQUVwQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFDRCw4QkFBYSxHQUFiLFVBQWMsSUFBVztRQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFDRCx1QkFBTSxHQUFOO1FBRUksUUFBUTtRQUNSLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixRQUFRO1FBQ1IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0F6R0EsQUF5R0MsQ0F6R21DLGdCQUFNLEdBeUd6Qzs7Ozs7QUNqSUQseUNBQThCO0FBRTlCLDBDQUFzQztBQUN0Qyw4REFBc0Q7QUFDdEQsd0RBQThDO0FBRTlDLGdFQUEwRDtBQUMxRCxrREFBOEM7QUFDOUMsMENBQW9DO0FBQ3BDLG1DQUE2QjtBQUk3QjtJQUFnQyxxQ0FBYTtJQUl6QztRQUFBLFlBRUksaUJBQU8sU0FFVjtRQURHLEtBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDOztJQUN6QixDQUFDO0lBQ0QsMENBQWMsR0FBZDtRQUVJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FiQSxBQWFDLENBYitCLGNBQUUsQ0FBQyxVQUFVLEdBYTVDO0FBQ0Q7SUFBd0MsOEJBQU07SUFTMUMsb0JBQVksSUFBVztRQUF2QixZQUVJLGtCQUFNLElBQUksQ0FBQyxTQVNkO1FBUkcsS0FBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDbEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsS0FBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEdBQUcsSUFBSSx5QkFBUyxDQUFDLFFBQVEsQ0FBQyxLQUFJLEVBQUMsY0FBTSxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFBO1FBQ3JGLDJDQUEyQztRQUMzQyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLEtBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDdEIsS0FBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLEtBQUksRUFBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7O0lBQ3RELENBQUM7SUFsQk0sZUFBSSxHQUFYO1FBRUksT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQWlCTSx5QkFBSSxHQUFYO1FBRUksYUFBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDekUsYUFBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUUvRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSwwQkFBSyxHQUFaO1FBRUksYUFBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUUsYUFBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRU0sK0JBQVUsR0FBakI7UUFFSSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxnQ0FBVyxHQUFsQjtRQUVJLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLDZCQUFRLEdBQWY7UUFFSSxJQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDaEI7WUFDSSxPQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFFLEVBQUUsR0FBRywwQkFBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLG1DQUFjLEdBQXRCLFVBQXVCLElBQWEsRUFBQyxLQUFZO1FBRTdDLElBQUksV0FBVyxHQUFlLElBQW1CLENBQUM7UUFDbEQsSUFBSSxRQUFRLEdBQWlCLHFCQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN0RCxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsV0FBVyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDNUIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQyxXQUFXLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsS0FBSyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUM7UUFDaEQsV0FBVyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQyxDQUFBLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUEsQ0FBQyxDQUFDO1FBQ3BELHdFQUF3RTtJQUM1RSxDQUFDO0lBRU8sNEJBQU8sR0FBZixVQUFnQixTQUFvQjtRQUVoQyw2Q0FBNkM7UUFDN0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLEdBQUcsQ0FBQyxDQUFBLGtCQUFrQjtRQUNoRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQTtJQUNoRCxDQUFDO0lBRU0sOEJBQVMsR0FBaEIsVUFBaUIsTUFBTTtRQUVuQixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCwyQkFBTSxHQUFOO0lBR0EsQ0FBQztJQUVPLDRCQUFPLEdBQWYsVUFBZ0IsRUFBUztRQUVyQixJQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87WUFDWixPQUFPO1FBQ1gsMEJBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU8sK0JBQVUsR0FBbEIsVUFBbUIsRUFBUztRQUV4QixJQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87WUFDWixPQUFPO1FBQ1gsSUFBRyxxQkFBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQy9CO1lBQ0kscUJBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUM3QixhQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFDTyw0QkFBTyxHQUFmO1FBRUksYUFBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FsSEEsQUFrSEMsQ0FsSHVDLGdCQUFNLEdBa0g3Qzs7Ozs7QUM5SUQseUNBQWdDO0FBQ2hDLG1DQUE2QjtBQUM3QiwrQ0FBNkM7QUFDN0MsMENBQXdDO0FBQ3hDLG1EQUErQztBQUMvQyx3REFBbUQ7QUFDbkQsOERBQW9EO0FBRXBEO0lBQWdDLHFDQUFhO0lBSXpDO2VBQ0ksaUJBQU87UUFDUCw0RUFBNEU7SUFDaEYsQ0FBQztJQU5ELDBDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFLTCx3QkFBQztBQUFELENBUkEsQUFRQyxDQVIrQixjQUFFLENBQUMsVUFBVSxHQVE1QztBQUVEO0lBQXdDLDhCQUFNO0lBRTFDLG9CQUFZLElBQVk7UUFBeEIsWUFDSSxrQkFBTSxJQUFJLENBQUMsU0FNZDtRQUxHLEtBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3pDLEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ25DLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFJLEVBQUUsY0FBUSxLQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsdUJBQWEsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0SCxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O0lBQ3BCLENBQUM7SUFDTSxlQUFJLEdBQVg7UUFDSSxPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0lBQ0QsNkJBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxHQUF1Qix1QkFBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwRSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3hDLENBQUM7SUFDRCw4QkFBUyxHQUFUO1FBQ0ksSUFBSSxJQUFJLEdBQXVCLElBQUksdUJBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO1FBQ3ZELHVCQUFTLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsNEJBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQ0QsMkJBQU0sR0FBTixjQUNDLENBQUM7SUFDTixpQkFBQztBQUFELENBL0JBLEFBK0JDLENBL0J1QyxnQkFBTSxHQStCN0M7Ozs7O0FDakRELHNDQUFnQztBQUtoQyxJQUFPLEVBQUUsQ0FZUjtBQVpELFdBQU8sRUFBRTtJQUNMO1FBQStCLDZCQUFTO1FBS3BDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixrQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQVZBLEFBVUMsQ0FWOEIsSUFBSSxDQUFDLElBQUksR0FVdkM7SUFWWSxZQUFTLFlBVXJCLENBQUE7QUFDTCxDQUFDLEVBWk0sRUFBRSxLQUFGLEVBQUUsUUFZUjtBQUVEO0lBQTJCLGdDQUFZO0lBTW5DO2VBRUksaUJBQU87SUFDWCxDQUFDO0lBUEQscUNBQWMsR0FBZDtRQUVJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFLTCxtQkFBQztBQUFELENBVkEsQUFVQyxDQVYwQixFQUFFLENBQUMsU0FBUyxHQVV0QztBQUVEO0lBQXVDLDZCQUFNO0lBUXpDLG1CQUFhLElBQVc7UUFBeEIsWUFFSSxrQkFBTSxJQUFJLENBQUMsU0FVZDtRQVRHLCtCQUErQjtRQUMvQixLQUFJLENBQUMsR0FBRyxHQUFFLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFFLENBQUM7UUFDdEIsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZixLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ25DLEtBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRSxLQUFLLENBQUM7UUFDL0IsS0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLEtBQUksRUFBQztZQUNyQyxLQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7O0lBQ1AsQ0FBQztJQWxCYSxjQUFJLEdBQWxCO1FBRUksT0FBUSxXQUFXLENBQUM7SUFDeEIsQ0FBQztJQWlCRCwwQkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLEdBQVUsQ0FBQyxDQUFDO1FBQ2pCLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsc0JBQUksNEJBQUs7YUFBVCxVQUFVLEdBQVU7WUFFaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw0QkFBSzthQUFUO1lBRUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFFRCw0QkFBUSxHQUFSLFVBQVMsUUFBaUI7UUFFdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUEsZ0JBQWdCO0lBQ3BELENBQUM7SUFDRCwwQkFBTSxHQUFOLFVBQU8sUUFBaUI7UUFFcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUwsZ0JBQUM7QUFBRCxDQW5EQSxBQW1EQyxDQW5Ec0MsZ0JBQU0sR0FtRDVDOzs7OztBQzlFRCxJQUFjLEVBQUUsQ0EyRmY7QUEzRkQsV0FBYyxFQUFFO0lBQ1o7UUFBMEIsd0JBQVM7UUFFL0I7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLDZCQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLENBQUM7UUFDTCxXQUFDO0lBQUQsQ0FQQSxBQU9DLENBUHlCLElBQUksQ0FBQyxJQUFJLEdBT2xDO0lBUFksT0FBSSxPQU9oQixDQUFBO0lBQ0Q7UUFBaUMsK0JBQVM7UUFLdEM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG9DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDTCxrQkFBQztJQUFELENBVkEsQUFVQyxDQVZnQyxJQUFJLENBQUMsSUFBSSxHQVV6QztJQVZZLGNBQVcsY0FVdkIsQ0FBQTtJQUNEO1FBQStCLDZCQUFTO1FBTXBDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixrQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQ0wsZ0JBQUM7SUFBRCxDQVhBLEFBV0MsQ0FYOEIsSUFBSSxDQUFDLElBQUksR0FXdkM7SUFYWSxZQUFTLFlBV3JCLENBQUE7SUFDRDtRQUE2QiwyQkFBUztRQU1sQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsZ0NBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQVhBLEFBV0MsQ0FYNEIsSUFBSSxDQUFDLElBQUksR0FXckM7SUFYWSxVQUFPLFVBV25CLENBQUE7SUFDRDtRQUE0QiwwQkFBUztRQVdqQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsK0JBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNMLGFBQUM7SUFBRCxDQWhCQSxBQWdCQyxDQWhCMkIsSUFBSSxDQUFDLElBQUksR0FnQnBDO0lBaEJZLFNBQU0sU0FnQmxCLENBQUE7SUFDRDtRQUFnQyw4QkFBUztRQUlyQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsbUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FUQSxBQVNDLENBVCtCLElBQUksQ0FBQyxJQUFJLEdBU3hDO0lBVFksYUFBVSxhQVN0QixDQUFBO0lBQ0Q7UUFBa0MsZ0NBQVM7UUFHdkM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLHFDQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFDTCxtQkFBQztJQUFELENBUkEsQUFRQyxDQVJpQyxJQUFJLENBQUMsSUFBSSxHQVExQztJQVJZLGVBQVksZUFReEIsQ0FBQTtJQUNEO1FBQWdDLDhCQUFTO1FBS3JDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVZBLEFBVUMsQ0FWK0IsSUFBSSxDQUFDLElBQUksR0FVeEM7SUFWWSxhQUFVLGFBVXRCLENBQUE7QUFDTCxDQUFDLEVBM0ZhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQTJGZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgKiBhcyBQbGF5ZXJFbnRpdHkgZnJvbSBcIi4vUGxheWVyRW50aXR5XCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUFnZW50XHJcbntcclxuICAgIHByb3RlY3RlZCBtX1BsYXllckVudGl0eTpQbGF5ZXJFbnRpdHkuUGxheWVyLlBsYXllckVudGl0eTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5ID0gUGxheWVyRW50aXR5LlBsYXllci5QbGF5ZXJFbnRpdHkuRW50aXR5O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtQbGF5ZXJ9IGZyb20gXCIuL1BsYXllckVudGl0eVwiXHJcbmltcG9ydCBCYXNlQWdlbnQgZnJvbSBcIi4vQmFzZUFnZW50XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lQWdlbnQgZXh0ZW5kcyBCYXNlQWdlbnQge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0FnZW50OiBHYW1lQWdlbnQ7XHJcblxyXG4gICAgc3RhdGljIGdldCBBZ2VudCgpOiBHYW1lQWdlbnQge1xyXG4gICAgICAgIGlmICh0aGlzLl9BZ2VudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FnZW50ID0gbmV3IEdhbWVBZ2VudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQWdlbnQ7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBDdXJMZXZlbCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lkhpc3RvcnlNYXhMZXZlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IEN1ckNoYXJhY3RlcklEKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgQ3VySXRlbSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBJdGVtTGlzdCgpOkFycmF5PG51bWJlcj5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5JdGVtTGlzdFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgQ3VySXRlbShpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuSXRlbUxpc3RbaWRdKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtID0gaWQ7XHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyIHtcclxuICAgIGV4cG9ydCBjbGFzcyBFdmVudFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBPbk1vbmV5Q2hhbmdlOiBzdHJpbmcgPSBcIk9uTW9uZXlDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJDaGFyYWN0ZXJJRENoYW5nZTogc3RyaW5nID0gXCJPbkN1ckNoYXJhY3RlcklEQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uSGlzdG9yeU1heExldmVsQ2hhbmdlOiBzdHJpbmcgPSBcIk9uSGlzdG9yeU1heExldmVsQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ2hhcmFjdGVyTGlzdENoYW5nZTogc3RyaW5nID0gXCJPbkNoYXJhY3Rlckxpc3RDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJJdGVtQ2hhbmdlOnN0cmluZyA9IFwiT25DdXJJdGVtQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uSXRlbUxpc3RDaGFuZ2U6c3RyaW5nID0gXCJPbkl0ZW1MaXN0Q2hhbmdlXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJFbnRpdHkge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIG1fRW50aXR5OiBQbGF5ZXJFbnRpdHk7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXQgRW50aXR5KCk6IFBsYXllckVudGl0eSAge1xyXG4gICAgICAgICAgICBpZiAoIVBsYXllckVudGl0eS5tX0VudGl0eSkgIHtcclxuICAgICAgICAgICAgICAgIFBsYXllckVudGl0eS5tX0VudGl0eSA9IG5ldyBQbGF5ZXJFbnRpdHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFBsYXllckVudGl0eS5tX0VudGl0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBtX01vbmV5Om51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1fQ3VyQ2hhcmFjdGVySUQ6bnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9IaXN0b3J5TWF4TGV2ZWw6bnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJMaXN0OkFycmF5PG51bWJlcj47XHJcbiAgICAgICAgcHJpdmF0ZSBtX0ZyYW1lV29yazpGcmFtZVdvcms7XHJcbiAgICAgICAgcHJpdmF0ZSBtX01lc3NhZ2VNZ3I6TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcbiAgICAgICAgLy/lvZPliY3mi6XpgInkuK3pgZPlhbdcclxuICAgICAgICBwcml2YXRlIG1fQ3VySXRlbTpudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OkFycmF5PG51bWJlcj47XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTW9uZXkoKTogbnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX01vbmV5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IE1vbmV5KHZhbHVlOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09IHRoaXMubV9Nb25leSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25Nb25leUNoYW5nZSlcclxuICAgICAgICAgICAgdGhpcy5tX01vbmV5ID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VyQ2hhcmFjdGVySUQoKTogbnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckNoYXJhY3RlcklEO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1ckNoYXJhY3RlcklEKHZhbHVlOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09IHRoaXMubV9DdXJDaGFyYWN0ZXJJRClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJDaGFyYWN0ZXJJRCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VyQ2hhcmFjdGVySURDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgZ2V0IEhpc3RvcnlNYXhMZXZlbCgpOiBudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSGlzdG9yeU1heExldmVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBIaXN0b3J5TWF4TGV2ZWwodmFsdWU6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT0gdGhpcy5tX0hpc3RvcnlNYXhMZXZlbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25IaXN0b3J5TWF4TGV2ZWxDaGFuZ2UpXHJcbiAgICAgICAgICAgIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2hhcmFjdGVyTGlzdCgpOiBBcnJheTxudW1iZXI+XHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNldCBDdXJJdGVtKHZhbHVlOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09IHRoaXMubV9DdXJJdGVtKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckl0ZW1DaGFuZ2UpXHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJJdGVtID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1ckl0ZW0oKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VySXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGdldCBJdGVtTGlzdCgpOkFycmF5PG51bWJlcj5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSXRlbUxpc3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9Nb25leSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJDaGFyYWN0ZXJJRCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9DaGFyYWN0ZXJMaXN0ID0gWzFdO1xyXG4gICAgICAgICAgICB0aGlzLm1fSGlzdG9yeU1heExldmVsID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckl0ZW0gPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fRnJhbWVXb3JrID0gRnJhbWVXb3JrLkZNO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nciA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgICAgIHRoaXMubV9JdGVtTGlzdCA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgQWRkQ2hhcmFjdGVyKGlkOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9DaGFyYWN0ZXJMaXN0W2lkXSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DaGFyYWN0ZXJMaXN0Q2hhbmdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBZGRJdGVtKGlkOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLm1fSXRlbUxpc3RbaWRdKSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0l0ZW1MaXN0W2lkXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKyt0aGlzLm1fSXRlbUxpc3RbaWRdO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgQmFzZUFnZW50IGZyb20gXCIuL0Jhc2VBZ2VudFwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckd1ZXN0QWdlbnQgZXh0ZW5kcyBCYXNlQWdlbnQge1xyXG4gICAgc3RhdGljIF9BZ2VudDogUGxheWVyR3Vlc3RBZ2VudDtcclxuICAgIHN0YXRpYyBnZXQgR3Vlc3RBZ2VudCgpOiBQbGF5ZXJHdWVzdEFnZW50IHtcclxuICAgICAgICBpZiAodGhpcy5fQWdlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9BZ2VudCA9IG5ldyBQbGF5ZXJHdWVzdEFnZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9BZ2VudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IE1vbmV5KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IENoYXJhY3RlcklEKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IENoYXJhY3Rlckxpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ2hhcmFjdGVyTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJ1eUNoYXJhY3RlcihpZDogbnVtYmVyKSAge1xyXG4gICAgICAgIC8vVG9Eb1xyXG4gICAgICAgIHZhciBwcmljZSA9IDA7XHJcbiAgICAgICAgaWYgKGlkIDwgMHx8IHByaWNlIDwwIHx8IHByaWNlID4gdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5IC09IGlkO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQWRkQ2hhcmFjdGVyKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQnV5SXRlbShpZDogbnVtYmVyKSAge1xyXG4gICAgICAgIHZhciBwcmljZSA9IDA7XHJcbiAgICAgICAgaWYoaWQgPCAwfHwgcHJpY2UgPDAgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwcmljZSA+IHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkgLT0gcHJpY2U7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5BZGRJdGVtKGlkKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0Q2hhcmFjdGVyKGlkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJMaXN0OkFycmF5PG51bWJlcj4gPSB0aGlzLkNoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgaWYoY2hhcmFjdGVyTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEID0gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBCYXNlRW51bSB7XHJcbiAgICBleHBvcnQgZW51bSBVSVR5cGVFbnVtIHtMb3csTWlkbGV9O1xyXG59IiwiaW1wb3J0IEJhc2VNZ3IgZnJvbSBcIi4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiO1xyXG5cclxuLyoqXHJcbiAqIOWumuS5ieWfuuehgOe7k+aehOS9k1xyXG4gKi9cclxuZXhwb3J0IG1vZHVsZSBCYXNlRnVuYyB7XHJcbiAgICBlbnVtIFVJVHlwZUVudW0ge0xvdyxNaWRsZX07XHJcbiAgICBleHBvcnQgY2xhc3MgTWFwPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfQ291bnQ6bnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX01hcDp7W2tleTogc3RyaW5nXTogVH07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTWFwID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDb3VudCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yRWFjaChjYWxsYmFjazoobWdyOlQsa2V5OnN0cmluZyk9PnZvaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IG1hcEtleSBpbiB0aGlzLl9NYXApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuX01hcFttYXBLZXldLG1hcEtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIG9iaiDmlL7lhaXlr7nosaFcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOmUrlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNldCggb2JqOlQsIGtleTpzdHJpbmcgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIXRoaXMuX01hcFtrZXldKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICArK3RoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX01hcFtrZXldID0gb2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHZXQoa2V5OnN0cmluZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5fTWFwW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg56e76Zmk5p+Q5Liq5a+56LGhXHJcbiAgICAgICAgICogQHJldHVybnMg6KKr56e76Zmk5a+56LGhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUmVtb3ZlKGtleTpzdHJpbmcpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBPYmo6VCA9IHRoaXMuX01hcFtrZXldO1xyXG4gICAgICAgICAgICBpZihPYmopXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX01hcFtrZXldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIE9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDplK5cclxuICAgICAgICAgKiBAcmV0dXJucyDmmK/lkKbmi6XmnIlcclxuICAgICAgICAgKi9cclxuICAgICAgICBIYXMoa2V5OnN0cmluZyk6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fTWFwW2tleV0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5vZGU8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9WYWx1ZTpUO1xyXG4gICAgICAgIHByaXZhdGUgX05leHQ6Tm9kZTxUPjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFZhbHVlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgVmFsdWUodmFsdWU6VClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBOZXh0KCk6Tm9kZTxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX05leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBOZXh0KG5vZGU6Tm9kZTxUPilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9OZXh0ID0gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgTm9kZVBvb2w8VD5cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgX05vZGVMaXN0Ok5vZGU8VD47XHJcbiAgICAgICAgUHVsbEJhY2sobm9kZTpOb2RlPFQ+KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX05vZGVMaXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Ob2RlTGlzdC5OZXh0ID0gbm9kZTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFxdWlyZSgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOk5vZGU8VD4gPSB0aGlzLl9Ob2RlTGlzdDtcclxuICAgICAgICAgICAgaWYobm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QgPSB0aGlzLl9Ob2RlTGlzdC5OZXh0O1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5vZGVRdWV1ZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX0NvdW50O1xyXG4gICAgICAgIHByaXZhdGUgX0hlYWQ6Tm9kZTxUPlxyXG4gICAgICAgIHByaXZhdGUgX1RhaWxlXHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBQb3BOb2RlKCk6Tm9kZTxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fQ291bnQ8MSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbm9kZTpOb2RlPFQ+ID0gbnVsbDtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX0hlYWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWQgPSB0aGlzLl9IZWFkLk5leHQ7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIC0tdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5Yir5oqK5bC+5be05bim5Ye65Y675LqGXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0NvdW50ID09IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoKHZhbHVlOlQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpOb2RlPFQ+ID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlB1c2hOb2RlKG5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1c2hOb2RlKG5vZGU6Tm9kZTxUPilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0NvdW50ID09MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fSGVhZCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxlLk5leHQgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbm9kZTtcclxuICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIENsZWFyKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fVGFpbGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIZWFkTm9kZSgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkhlYWROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEhlYWRWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0hlYWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9IZWFkLlZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGFpbE5vZGUoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuVGFpbE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGFpbFZhbHVlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fVGFpbGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9UYWlsZS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUXVldWU8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Ob2RlUG9vbDpOb2RlUG9vbDxUPjtcclxuICAgICAgICBwcml2YXRlIF9Ob2RlUXVldWU6Tm9kZVF1ZXVlPFQ+O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVQb29sID0gbmV3IE5vZGVQb29sPFQ+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVRdWV1ZSA9IG5ldyBOb2RlUXVldWU8VD4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoKHZhbHVlOlQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpOb2RlPFQ+ID0gdGhpcy5fTm9kZVBvb2wuQXF1aXJlKCk7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fTm9kZVF1ZXVlLlB1c2hOb2RlKG5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBvcCgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOk5vZGU8VD4gPSB0aGlzLl9Ob2RlUXVldWUuUG9wTm9kZSgpO1xyXG4gICAgICAgICAgICBpZihub2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUG9vbC5QdWxsQmFjayhub2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9Ob2RlUXVldWUuQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4vKlxyXG4gICAgZXhwb3J0IGNsYXNzIExpbmtOb2RlTGlzdDxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX0hlYWROb2RlOk5vZGU8VD47XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFpbE5vZGU6Tm9kZTxUPjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfQ291bnROb2RlOm51bWJlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkTm9kZSA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSB0aGlzLl9IZWFkTm9kZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlID0gdGhpcy5fSGVhZE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluWktOe7k+eCueWAvFxyXG4gICAgICAgICBcclxuICAgICAgICBnZXQgSGVhZFZhbHVlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9IZWFkTm9kZS5WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgQWRkKHZhbHVlOlQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3Tm9kZTpOb2RlPFQ+ID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgbmV3Tm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLkFkZE5vZGUobmV3Tm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFkZE5vZGUobmV3Tm9kZTpOb2RlPFQ+KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fVGFpbE5vZGUhPXRoaXMuX0hlYWROb2RlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsTm9kZS5OZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fSGVhZE5vZGUuTmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgIH1cclxuICAgIH0qL1xyXG5cclxufSIsImV4cG9ydCBtb2R1bGUgRlNNIFxyXG57XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElGU01cclxuICAgIHtcclxuICAgICAgICBVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGU00gPFQgZXh0ZW5kcyBTdGF0ZT4gXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1clN0YXRlOlQ7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1N0YXRlRGljdDp7W25hbWU6c3RyaW5nXTpUfTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoIHN0YXJ0U3RhdGU6VCA9IG51bGwgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0N1clN0YXRlID0gc3RhcnRTdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDdXJTdGF0ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyU3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmlLnlj5jnirbmgIFcclxuICAgICAgICAgKiBAcGFyYW0gc3RhdGUg6K6+572u54q25oCBXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIENoYW5nZVN0YXRlKHN0YXRlOlQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0ZS5TZXRPd25lcih0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGN1clN0YXRlOlQgPSB0aGlzLm1fQ3VyU3RhdGU7XHJcbiAgICAgICAgICAgIGlmKGN1clN0YXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJTdGF0ZS5FbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJTdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICBjdXJTdGF0ZS5TdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyU3RhdGUgPSBjdXJTdGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY3VyU3RhdGUgPSB0aGlzLm1fQ3VyU3RhdGU7XHJcbiAgICAgICAgICAgIGlmKGN1clN0YXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJTdGF0ZS5VcGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RhdGVcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9vd25lcjpJRlNNO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG93bmVyOklGU00gPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX293bmVyID0gb3duZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU2V0T3duZXIob3duZXI6SUZTTSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9vd25lciA9IG93bmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZSgpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBFbmQoKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgU3RhcnQoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VNZ3Jcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZSgpO1xyXG59IiwiaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7QmFzZUZ1bmN9ICBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJhbWVXb3JrXHJcbntcclxuICAgIF9NZ3JNYXA6QmFzZUZ1bmMuTWFwPEJhc2VNYW5hZ2VyPjsvL0Jhc2VTdHJ1Y3QuTWFwPEJhc2VNYW5hZ2VyPjtcclxuICAgIF9UZW1NZ3JMaXN0OkFycmF5PEJhc2VNYW5hZ2VyPjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAgPSBuZXcgQmFzZUZ1bmMuTWFwPEJhc2VNYW5hZ2VyPigpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0ZNOkZyYW1lV29yaztcclxuICAgIHN0YXRpYyBnZXQgRk0oKTpGcmFtZVdvcmtcclxuICAgIHtcclxuICAgICAgICBpZihGcmFtZVdvcmsuX0ZNPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRnJhbWVXb3JrLl9GTSA9IG5ldyBGcmFtZVdvcmsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEZyYW1lV29yay5fRk07XHJcbiAgICB9XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtcE1nckxpc3QgPSBuZXcgQXJyYXk8QmFzZU1hbmFnZXI+KHRoaXMuX01nck1hcC5Db3VudCk7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwLmZvckVhY2goIChtZ3I6QmFzZU1hbmFnZXIgLCBrZXk6c3RyaW5nKTp2b2lkID0+e1xyXG4gICAgICAgICAgICB0ZW1wTWdyTGlzdC5wdXNoKG1ncik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0ZW1wTWdyTGlzdC5mb3JFYWNoKChtZ3IsaWR4KT0+e21nci5VcGRhdGUoKTt9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWRkTWFuYWdlcjxUIGV4dGVuZHMgQmFzZU1hbmFnZXI+KCB0eXBlOntuZXcgKCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSApOlRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9NZ3JNYXAuSGFzKHR5cGUuTmFtZSgpKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9NZ3JNYXAuR2V0KHR5cGUuTmFtZSgpKSBhcyBUO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3TWdyOlQgPSBuZXcgdHlwZSgpO1xyXG4gICAgICAgIHRoaXMuX01nck1hcC5TZXQobmV3TWdyLHR5cGUuTmFtZSgpKTtcclxuICAgICAgICByZXR1cm4gIG5ld01ncjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEdldE1hbmFnZXI8VCBleHRlbmRzIEJhc2VNYW5hZ2VyPih0eXBlOntuZXcgKCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSk6VHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fTWdyTWFwLkdldCh0eXBlLk5hbWUoKSkgYXMgVDtcclxuICAgIH1cclxufSIsIi8qKuS9nOiAhTpNb1xyXG4gKiDmtojmga/mjqfliLblmahcclxuICovXHJcbmltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5leHBvcnQgbW9kdWxlIE1lc3NhZ2VNRCB7XHJcbiAgICBleHBvcnQgY29uc3QgR2FtZUV2ZW50ID1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckRlYXRoOiBcIlBsYXllckRlYXRoXCIsXHJcbiAgICAgICAgICAgIEdhbWVUaW1lVXA6IFwiR2FtZVRpbWVVcFwiLFxyXG4gICAgICAgICAgICBHYW1lQ29udGludWU6IFwiR2FtZUNvbnRpbnVlXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1lc3NhZ2VDZW50ZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciAge1xyXG4gICAgICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJNZXNzYWdlQ2VudGVyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6IE1lc3NhZ2VDZW50ZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfRXZlbnREaWN0OiB7IFtLZXk6IHN0cmluZ106IE1FdmVudCB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5bkuovku7ZcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIF9HZXRFdmVudChuYW1lOiBzdHJpbmcpOiBNRXZlbnQgIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50OiBNRXZlbnQgPSB0aGlzLl9FdmVudERpY3RbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChldmVudCA9PSB1bmRlZmluZWQgfHwgZXZlbnQgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IE1FdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0W25hbWVdID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXZlbnQgPSB0aGlzLl9FdmVudERpY3RbbmFtZV07XHJcbiAgICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9FdmVudERpY3QgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDms6jlhoxcclxuICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIOWnlOaJmFxyXG4gICAgICAgICogQHBhcmFtIHtPYmp9IGxpc3RlbmVyIOebkeWQrOiAhVxyXG4gICAgICAgICovXHJcbiAgICAgICAgUmVnaXN0KG5hbWU6IHN0cmluZywgYWN0aW9uOiAoKSA9PiB2b2lkLCBsaXN0ZW5lcjogT2JqZWN0KTpNRXZlbnQgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG5ld0RsZ3Q6IERlbGVnYXRlID0gbmV3IERlbGVnYXRlKGxpc3RlbmVyLCBhY3Rpb24pO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5BZGQobmV3RGxndCk7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRFdmVudFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo6ZSA5p+Q5Liq55uR5ZCsXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIOWnlOaJmFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqfSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAgKi9cclxuICAgICAgICBEZXNSZWdpc3QobmFtZTogc3RyaW5nLCBhY3Rpb246ICgpID0+IHZvaWQsIGxpc3RlbmVyOiBPYmplY3QpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LlJtdihhY3Rpb24sIGxpc3RlbmVyKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo6ZSA5p+Q5Liq5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmdpc3RJREsobmFtZTogc3RyaW5nKSAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6IE1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEZpcmUobmFtZTogc3RyaW5nLCBwYXJhbTogYW55ID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WnlOaJmFxyXG4gICAgZXhwb3J0IGNsYXNzIERlbGVnYXRlIHtcclxuICAgICAgICBMaXN0ZW5lcjogT2JqZWN0O1xyXG4gICAgICAgIEFjdGlvbjogKHBhcmFtOmFueSkgPT4gdm9pZDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRXhlY3V0ZShwYXJhbTogYW55ID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgdGhpcy5BY3Rpb24uY2FsbCh0aGlzLkxpc3RlbmVyLCBwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGxpc3RlbmVyOiBPYmplY3QsIGFjdGlvbjogKHBhcmFtOmFueSkgPT4gdm9pZCkgIHtcclxuICAgICAgICAgICAgdGhpcy5MaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgICAgICB0aGlzLkFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+S6i+S7tlxyXG4gICAgZXhwb3J0IGNsYXNzIE1FdmVudCB7XHJcbiAgICAgICAgRGVsZWdhdGVMaXN0OiBBcnJheTxEZWxlZ2F0ZT47XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgICAgICB0aGlzLlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog5re75Yqg5aeU5omYXHJcbiAgICAgICAgKiBAcGFyYW0ge0RlbGVnYXRlfSBkbGcg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgKi9cclxuICAgICAgICBBZGQoZGxnOiBEZWxlZ2F0ZSkgIHtcclxuICAgICAgICAgICAgdGhpcy5EZWxlZ2F0ZUxpc3QucHVzaChkbGcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIOenu+mZpOWnlOaJmFxyXG4gICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmVyIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICovXHJcbiAgICAgICAgUm12KGFjdGlvbjogKCkgPT4gdm9pZCwgbGlzdGVuZXI6IE9iamVjdCA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHZhciBkbGd0TGlzdDogQXJyYXk8RGVsZWdhdGU+ID0gdGhpcy5EZWxlZ2F0ZUxpc3Q7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGFycklkeDogbnVtYmVyID0gZGxndExpc3QubGVuZ3RoIC0gMTsgYXJySWR4ID4gLTE7IC0tYXJySWR4KSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRsZ3QgPSBkbGd0TGlzdFthcnJJZHhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSBkbGd0LkFjdGlvbiAmJiBsaXN0ZW5lciA9PSBkbGd0Lkxpc3RlbmVyKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRsZ3RMaXN0LnNwbGljZShhcnJJZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mHjee9rlxyXG4gICAgICAgIFJlc2V0KCkgIHtcclxuICAgICAgICAgICAgdGhpcy5EZWxlZ2F0ZUxpc3QgPSBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICovXHJcbiAgICAgICAgRXhlY3V0ZShwYXJhbTogYW55KSAge1xyXG4gICAgICAgICAgICB2YXIgZGxndExpc3Q6IEFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhcnJJZHg6IG51bWJlciA9IGRsZ3RMaXN0Lmxlbmd0aCAtIDE7IGFycklkeCA+IC0xOyAtLWFycklkeCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgICAgIGRsZ3QuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuLy4uL1NjZW5lL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vLi4vU2NlbmUvQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiXHJcbmltcG9ydCB7RlNNfSBmcm9tIFwiLi8uLi9CYXNlL0ZTTVwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgbV9TY2VuZUZTTTogU2NlbmUuU2NlbmVGU007XHJcbiAgICBwcml2YXRlIG1fU2NlbmVOb2RlOiBMYXlhLk5vZGU7XHJcbiAgICBcclxuICAgIGdldCBDdXJTY2VuZSgpOlNjZW5lLkJhc2VTY2VuZSB7XHJcbiAgICAgICAgaWYodGhpcy5tX1NjZW5lRlNNLkN1clN0YXRlKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX1NjZW5lRlNNLkN1clN0YXRlO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZ2V0IEN1ckRpcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clNjZW5lLkRpcmVjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2NlbmVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9CR0xheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLl9CR0xheWVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5tX1NjZW5lRlNNID0gbmV3IFNjZW5lLlNjZW5lRlNNKCk7XHJcbiAgICAgICAgdGhpcy5tX1NjZW5lTm9kZSA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU3ByaXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDaGFuZ2VTY2VuZShuZXdTY2VuZTogU2NlbmUuQmFzZVNjZW5lKSAge1xyXG4gICAgICAgIHRoaXMubV9TY2VuZUZTTS5DaGFuZ2VTdGF0ZShuZXdTY2VuZSk7XHJcbiAgICAgICAgaWYobmV3U2NlbmUuU2NlbmVPYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fU2NlbmVOb2RlLmFkZENoaWxkKG5ld1NjZW5lLlNjZW5lT2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ml6fpgLvovpFcclxuICAgIHByaXZhdGUgX0JHOiBMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX0JHTGF5ZXI6IExheWEuU3ByaXRlO1xyXG4gICAgXHJcbiAgICBzZXQgQkcoYmc6IExheWEuU3ByaXRlKSB7XHJcbiAgICAgICAgaWYgKCFiZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9CRykge1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5yZW1vdmVTZWxmO1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgdGhpcy5fQkcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0JHLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIuYWRkQ2hpbGQodGhpcy5fQkcpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEJHKCk6TGF5YS5TcHJpdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX0JHO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKirkvZzogIVNb1xyXG4qIOWcuuaZr+WKn+iDvVxyXG4qL1xyXG4vKlxyXG4vL+WcuuaZr+euoeeQhlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIF9CRzogTGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9CR0xheWVyOiBMYXlhLlNwcml0ZTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllciA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fQkdMYXllcik7XHJcbiAgICAgICAgLy/mt7vliqDlnLrmma/nrqHnkIZcclxuICAgICAgICB0aGlzLlNjZW5lTm9kZSA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU3ByaXRlKCkpO1xyXG4gICAgfVxyXG4gICAgc2V0IEJHKGJnOiBMYXlhLlNwcml0ZSkge1xyXG4gICAgICAgIGlmICghYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQkcpIHtcclxuICAgICAgICAgICAgdGhpcy5fQkcucmVtb3ZlU2VsZjtcclxuICAgICAgICAgICAgdGhpcy5fQkcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIHRoaXMuX0JHLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9CRy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyLmFkZENoaWxkKHRoaXMuX0JHKTtcclxuICAgIH1cclxuICAgIGdldCBCRygpOkxheWEuU3ByaXRlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9CRztcclxuICAgIH1cclxuICAgIFNjZW5lTm9kZTogTGF5YS5Ob2RlO1xyXG5cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2NlbmVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfQ3VyU2NlbmU6IEJhc2VTY2VuZTtcclxuICAgIGdldCBDdXJTY2VuZSgpOiBCYXNlU2NlbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZTtcclxuICAgIH1cclxuICAgIHNldCBDdXJTY2VuZSh2YWx1ZTogQmFzZVNjZW5lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N1clNjZW5lICYmIHRoaXMuX0N1clNjZW5lLlNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0N1clNjZW5lLlNjZW5lLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQ3VyU2NlbmUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5fQ3VyU2NlbmUgJiYgdGhpcy5fQ3VyU2NlbmUuU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5TY2VuZU5vZGUuYWRkQ2hpbGQodGhpcy5fQ3VyU2NlbmUuU2NlbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBDdXJEaXIoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU2NlbmUuQ3VyRGlyO1xyXG4gICAgfVxyXG5cclxuICAgIEVudGVyU2NlbmUodGFyZ2V0U2NlbmU6IEJhc2VTY2VuZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUgPSB0YXJnZXRTY2VuZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuTGVhdmUodGFyZ2V0U2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4qLyIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL3VpL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IFVJRnVuYyB9IGZyb20gXCIuLy4uL1V0aWxpdHkvVUlGdW5jXCJcclxuaW1wb3J0IHsgQmFzZUZ1bmMgfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuZW51bSBOb2RlVHlwZSB7XHJcbiAgICBCb3R0b20sXHJcbiAgICBNaWRkbGUsXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXIge1xyXG4gICAgc3RhdGljIGdfVUlXaWR0aCA9IDc1MDtcclxuICAgIHN0YXRpYyBnX1VJSGVpZ2h0ID0gMTMzNDtcclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcml2YXRlIG1fUm9vdE5vZGU6IExheWEuQm94O1xyXG4gICAgcHJpdmF0ZSBtX0JvdHRvbU5vZGU6IExheWEuQm94O1xyXG4gICAgcHJpdmF0ZSBtX01pZGxlTm9kZTogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIF9VSURpY3Q6IHsgW25hbWU6IHN0cmluZ106IEJhc2VVSSB9O1xyXG4gICAgcHJpdmF0ZSBfVXBkYXRlQ291bnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9VcGRhdGVUaW1lOm51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIEFkZE5vZGUobm9kZTogTm9kZVR5cGUpOiB2b2lkICB7XHJcbiAgICAgICAgdmFyIG5vZGVCb3g6IExheWEuQm94ID0gbmV3IExheWEuQm94KCk7XHJcbiAgICAgICAgbm9kZUJveC50b3AgPSAwO1xyXG4gICAgICAgIG5vZGVCb3guYm90dG9tID0gMDtcclxuICAgICAgICBub2RlQm94LmxlZnQgPSAwO1xyXG4gICAgICAgIG5vZGVCb3gucmlnaHQgPSAwO1xyXG4gICAgICAgIHN3aXRjaCAobm9kZSkgIHtcclxuICAgICAgICAgICAgY2FzZSBOb2RlVHlwZS5Cb3R0b206XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQm90dG9tTm9kZSA9IG5vZGVCb3g7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9NaWRsZU5vZGUgPSBub2RlQm94O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9Sb290Tm9kZS5hZGRDaGlsZChub2RlQm94KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nICB7XHJcbiAgICAgICAgcmV0dXJuIFwiVUlNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdmFyIHJvb3RCb3ggPSBuZXcgTGF5YS5Cb3goKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHJvb3RCb3gpO1xyXG4gICAgICAgIHRoaXMubV9Sb290Tm9kZSA9IHJvb3RCb3g7XHJcbiAgICAgICAgdGhpcy5vblNpemVDaGFuZ2UoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMubV9Sb290Tm9kZSk7XHJcbiAgICAgICAgdGhpcy5tX1VwZGF0ZVRpbWUgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLkFkZE5vZGUoTm9kZVR5cGUuQm90dG9tKTtcclxuICAgICAgICB0aGlzLkFkZE5vZGUoTm9kZVR5cGUuTWlkZGxlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9VSURpY3QgPSB7fTtcclxuICAgICAgICB0aGlzLl9VcGRhdGVDb3VudCA9IDA7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50LlJFU0laRSwgdGhpcywgdGhpcy5vblNpemVDaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2l6ZUNoYW5nZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gVUlGdW5jLkNvdW50U2NhbGVGaXgoVUlNYW5hZ2VyLmdfVUlXaWR0aCk7XHJcbiAgICAgICAgdmFyIHJvb3RCb3ggPSB0aGlzLm1fUm9vdE5vZGU7XHJcbiAgICAgICAgcm9vdEJveC5zY2FsZVggPSBzY2FsZTtcclxuICAgICAgICByb290Qm94LnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3guaGVpZ2h0ID0gVUlNYW5hZ2VyLmdfVUlIZWlnaHQgKiBzY2FsZTtcclxuICAgICAgICByb290Qm94LndpZHRoID0gVUlNYW5hZ2VyLmdfVUlXaWR0aDtcclxuICAgIH0gICAgXHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgLy/lrprluKfliLfmlrBVSVxyXG4gICAgICAgIGlmICh0aGlzLm1fVXBkYXRlVGltZSA8IExheWEudGltZXIuY3VyclRpbWVyKSAge1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVVJKHRoaXMubV9Cb3R0b21Ob2RlKTtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVVSSh0aGlzLm1fTWlkbGVOb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5fVXBkYXRlQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fVXBkYXRlVGltZSA9IExheWEudGltZXIuY3VyclRpbWVyICsgMzA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGVVSShub2RlOiBMYXlhLlNwcml0ZSkgIHtcclxuICAgICAgICBmb3IgKGxldCBpZHg6IG51bWJlciA9IDA7IGlkeCA8IG5vZGUubnVtQ2hpbGRyZW47ICsraWR4KSAge1xyXG4gICAgICAgICAgICB2YXIgdWk6IEJhc2VVSSA9IG5vZGUuZ2V0Q2hpbGRBdChpZHgpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgdWkuVUlVcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBBZGRVSSgpICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFNob3c8VCBleHRlbmRzIEJhc2VVST4odWlDbGFzczogeyBuZXcobmFtZTogc3RyaW5nKTogVDsgTmFtZSgpOiBzdHJpbmcgfSk6IFQgIHtcclxuICAgICAgICB2YXIgc3RyOiBzdHJpbmcgPSB1aUNsYXNzLk5hbWUoKTtcclxuICAgICAgICB2YXIgbmV3VUk6IEJhc2VVSSA9IHRoaXMuR2V0VUlCeU5hbWUoc3RyKTtcclxuICAgICAgICBuZXdVSSA9IG5ld1VJID09IG51bGwgPyB0aGlzLkFkZFVJQnlOYW1lKHN0ciwgbmV3IHVpQ2xhc3Moc3RyKSkgOiBuZXdVSTtcclxuICAgICAgICB2YXIgbm9kZTogTGF5YS5TcHJpdGUgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAobmV3VUkuVUlUeXBlKSAge1xyXG4gICAgICAgICAgICAvL+S4reWxguasoVVJXHJcbiAgICAgICAgICAgIGNhc2UgQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fTWlkbGVOb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubV9NaWRsZU5vZGUubnVtQ2hpbGRyZW4gPD0gMCkgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+mAmuefpeWvvOa8lOaaguWBnOa4uOaIj1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuVGltZVVwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/pu5jorqRVaeWFqOaYr+S9juWxguasoVVJXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjaGlsZE51bTogbnVtYmVyID0gbm9kZS5udW1DaGlsZHJlbjtcclxuICAgICAgICAvL+aKiuS6kuaWpeeahOeql+WPo+WFs+aOiVxyXG4gICAgICAgIGlmIChuZXdVSS5Jc011dGV4ICYmIGNoaWxkTnVtID4gMCkgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSSA9IG5vZGUuZ2V0Q2hpbGRBdChub2RlLm51bUNoaWxkcmVuIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICBpZiAoIWxhc3RVSS5Jc011dGV4KVxyXG4gICAgICAgICAgICAgICAgbGFzdFVJLkhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGUuYWRkQ2hpbGQobmV3VUkpO1xyXG4gICAgICAgIG5ld1VJLk9wZW5PUCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3VUkgYXMgVDtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZSh1aTogQmFzZVVJKSAge1xyXG4gICAgICAgIHVpLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB1aS5DbG9zZU9QKCk7XHJcbiAgICAgICAgdmFyIG5vZGU6IExheWEuU3ByaXRlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKHVpLlVJVHlwZSkgIHtcclxuICAgICAgICAgICAgLy/kuK3lsYLmrKFVSVxyXG4gICAgICAgICAgICBjYXNlIEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX01pZGxlTm9kZTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLm51bUNoaWxkcmVuIDw9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgLy/lhbPpl63nqpflj6Mg6YCa55+l5ri45oiP57un57utXHJcbiAgICAgICAgICAgICAgICAgICAgLy9BUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkN1ckRpci5Db250aW51ZVRpbWUoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/pu5jorqRVaeWFqOaYr+S9juWxguasoVVJXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNoaWxkTnVtOiBudW1iZXIgPSBub2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIGlmIChjaGlsZE51bSA+IDApICB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VUk6IEJhc2VVSSA9IG5vZGUuZ2V0Q2hpbGRBdChjaGlsZE51bSAtIDEpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgbGFzdFVJLk9wZW5PUCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBDbG9zZUN1clZpZXcoKSAge1xyXG4gICAgICAgIHZhciB1aTogQmFzZVVJID0gdGhpcy5tX0JvdHRvbU5vZGUuZ2V0Q2hpbGRBdCh0aGlzLm1fQm90dG9tTm9kZS5udW1DaGlsZHJlbiAtIDEpIGFzIEJhc2VVSTtcclxuICAgICAgICB0aGlzLkNsb3NlKHVpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIoOmZpOaJgOacieiKgueCueS4iueahFVJXHJcbiAgICBDbGVhcigpICB7XHJcbiAgICAgICAgdmFyIHVpTm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlO1xyXG4gICAgICAgIHdoaWxlICh1aU5vZGUubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVpTm9kZSA9IHRoaXMubV9NaWRsZU5vZGVcclxuICAgICAgICB3aGlsZSAodWlOb2RlLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZVVJOiBCYXNlVUkgPSB1aU5vZGUuZ2V0Q2hpbGRBdCgwKSBhcyBCYXNlVUk7Ly8ucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB0aGlzLkNsb3NlKGNsb3NlVUkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBHZXRVSUJ5TmFtZShuYW1lOiBzdHJpbmcpOiBCYXNlVUkgIHtcclxuICAgICAgICB2YXIgdWkgPSB0aGlzLl9VSURpY3RbbmFtZV07XHJcbiAgICAgICAgdWkgPSB1aSA9PSB1bmRlZmluZWQgPyBudWxsIDogdWk7XHJcbiAgICAgICAgcmV0dXJuIHVpO1xyXG4gICAgfVxyXG4gICAgQWRkVUlCeU5hbWUobmFtZTogc3RyaW5nLCB1aTogQmFzZVVJKTogQmFzZVVJICB7XHJcbiAgICAgICAgdGhpcy5fVUlEaWN0W25hbWVdID0gdWk7XHJcbiAgICAgICAgcmV0dXJuIHVpO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgUm9sZUVsZW1lbnQgZnJvbSBcIi4vc2NyaXB0L1JvbGVFbGVtZW50XCJcbmltcG9ydCBJdGVtRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvSXRlbUVsZW1lbnRcIlxyXG4vKlxyXG4qIOa4uOaIj+WIneWni+WMlumFjee9rjtcclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHN0YXRpYyB3aWR0aDpudW1iZXI9NjQwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9MTEzNjtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwiZml4ZWR3aWR0aFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwibm9uZVwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJ0b3BcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwibGVmdFwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiRW50ZXIuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBzdGF0OmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgcGh5c2ljc0RlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgZXhwb3J0U2NlbmVUb0pzb246Ym9vbGVhbj10cnVlO1xyXG4gICAgY29uc3RydWN0b3IoKXt9XHJcbiAgICBzdGF0aWMgaW5pdCgpe1xyXG4gICAgICAgIHZhciByZWc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xyXG4gICAgICAgIHJlZyhcInNjcmlwdC9Sb2xlRWxlbWVudC50c1wiLFJvbGVFbGVtZW50KTtcbiAgICAgICAgcmVnKFwic2NyaXB0L0l0ZW1FbGVtZW50LnRzXCIsSXRlbUVsZW1lbnQpO1xyXG4gICAgfVxyXG59XHJcbkdhbWVDb25maWcuaW5pdCgpOyIsImltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbiAvKipcclxuICog6KGo546w55So55qE5a+56LGhXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEFuaW1PYmpcclxue1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIik7XHJcbiAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgZm9yKCBsZXQgY291bnQgPTA7Y291bnQgPCAzMDsrK2NvdW50IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1Db2luLG1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2VuQW5pbU9iajxUIGV4dGVuZHMgQmFzZUFuaW1PYmo+KCBhbmltQ2xhc3M6e25ldyAobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSxtb2RlbDpMYXlhLlNwcml0ZTNEICk6VFxyXG4gICAge1xyXG4gICAgICAgIHZhciBhbmltT2JqID0gTGF5YS5Qb29sLmdldEl0ZW0oYW5pbUNsYXNzLk5hbWUoKSk7XHJcbiAgICAgICAgaWYoYW5pbU9iaj09bnVsbClcclxuICAgICAgICAgICAgYW5pbU9iaiA9IG5ldyBhbmltQ2xhc3MoYW5pbUNsYXNzLk5hbWUoKSxtb2RlbCk7XHJcbiAgICAgICAgcmV0dXJuIGFuaW1PYmo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFic3RyYWN0IGNsYXNzIEJhc2VBbmltT2JqIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG4gICAge1xyXG4gICAgICAgIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5TY2VuZU9iai5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX0ZyYW1lRnVuYylcclxuICAgICAgICB9XHJcbiAgICAgICAgTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX05hbWU6c3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLm9uKExheWEuRXZlbnQuUkVNT1ZFRCx0aGlzLHRoaXMuX0xlYXZlU3RhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lRnVuYygpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0p1ZGdlQ29tcGxldGUoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0ZyYW1lTG9naWNGdW5jKCk7XHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuO1xyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKHRoaXMsdGhpcy5fRnJhbWVGdW5jKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZvcmNlTGVhdmVTdGFnZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBBbmltQ29pbiBleHRlbmRzIEJhc2VBbmltT2JqXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkFuaW1Db2luXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFNldFRhcmdldCggdGFyZ2V0OkxheWEuU3ByaXRlM0QgKSAgICBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgc3VwZXIuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFyZ2V0OkxheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIobmFtZSxtb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lTG9naWNGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBvc2l0aW9uID0gdGhpcy5fVGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBhZGRQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKGFkZFBTLDAuMSxhZGRQUyk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5hZGQoYWRkUFMscG9zaXRpb24scG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRMb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMubmFtZSx0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGRpc0RpciA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGRpc0Rpcik7XHJcbiAgICAgICAgICAgIGlmKCBMYXlhLlZlY3RvcjMuc2NhbGFyTGVuZ3RoU3F1YXJlZChkaXNEaXIpPDAuMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgeyBQbGF5ZXJDb250cm9sZXIgfSBmcm9tIFwiLi8uLi9HYW1lL1BsYXllckN0cmxlclwiXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vSW5wdXRcIjtcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIjtcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyQnVmZiB7XHJcbiAgICBleHBvcnQgY2xhc3MgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBUeXBlOiBJdGVtLkl0ZW1UeXBlO1xyXG4gICAgICAgIElkeDogbnVtYmVyO1xyXG4gICAgICAgIFBsYXllcjogUGxheWVyO1xyXG4gICAgICAgIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdlbkJ1ZmZNb2QoKSAge1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTW9kID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVTcGhlcmUoMC4zLCA4LCA4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICAgICAgLy/liJvlu7rmqKHlnovmmL7npLrlr7nosaFcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQWRkQnVmZk1vZGUodGhpcy5fQnVmZk1vZCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkZseSgpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9TdGFydEZ1bmMgIT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1N0YXJ0RnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBDb21wbGV0ZSgpICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkNvbXBsZXRlQnVmZih0aGlzLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZNb2QuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHByb3RlY3RlZCBfQnVmZk1vZDogTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBJdGVtLkl0ZW1UeXBlLCBpZHg6IG51bWJlciA9IDApICB7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuSWR4ID0gaWR4O1xyXG4gICAgICAgICAgICB0aGlzLkdlbkJ1ZmZNb2QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfU3RhcnRGdW5jOiAoKSA9PiB2b2lkO1xyXG4gICAgfVxyXG4gICAgY2xhc3MgRmx5QnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmICB7XHJcbiAgICAgICAgU3BlZWQ6IG51bWJlcjtcclxuICAgICAgICBGbG9vcjogbnVtYmVyO1xyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9IHRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlIC8gMiAqIHRoaXMuRmxvb3I7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KCkpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNldFNhZmVQUyh0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIgPSAwLjEsIGZsb29yOiBudW1iZXIgPSAxMCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbS5JdGVtVHlwZS5Sb3BlLCBQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXIgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fRmluYWxaIC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24ueiA+IC0wLjIpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuR2V0U3RlcEJ5TG9jYXRpb24odGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGFzcyBQcm90ZWN0QnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmICB7XHJcbiAgICAgICAgVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6IG51bWJlciAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTogbnVtYmVyID0gMCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbS5JdGVtVHlwZS5Qcm90ZWN0LCBQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuVGltZSA9IEFQUC5TY2VuZU1hbmFnZXIuQ3VyRGlyLkdhbWVUaW1lK3RpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIGlmKHRoaXMuVGltZTxBUFAuU2NlbmVNYW5hZ2VyLkN1ckRpci5HYW1lVGltZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFZpbmVCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBDb3VudFRpbWU6IG51bWJlcjtcclxuICAgICAgICBJbnB1dERpcjogYm9vbGVhbjtcclxuICAgICAgICBTdGFydChwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLCB0aGlzLl9JbnB1dCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDb21wbGV0ZSgpICB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoY291bnRUaW1lOiBudW1iZXIgPSAzLCBpbnB1dERpcjogYm9vbGVhbiA9IHRydWUpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW0uSXRlbVR5cGUuVmluZSwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRUaW1lID0gY291bnRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklucHV0RGlyID0gaW5wdXREaXI7XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9UaW1lO1xyXG4gICAgICAgIHByaXZhdGUgX0lucHV0KGlzUmlnaHQ6IGJvb2xlYW4pICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLklucHV0RGlyID09IGlzUmlnaHQpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklucHV0RGlyID0gIXRoaXMuSW5wdXREaXI7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuQ291bnRUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvdW50VGltZSA8IDApICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1Nob3dHYW1lSW5mbygpICB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvdW50VGltZSA8IDApXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gXCJcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuSW5wdXREaXIgPT0gdHJ1ZSA/IFwiUmlnaHRcIiA6IFwiTGVmdFwiO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiZXhwb3J0IG1vZHVsZSBDaGFyYWN0ZXJcclxue1xyXG4gICAgZXhwb3J0IGVudW0gQW5pbUVudW1cclxuICAgIHtcclxuICAgICAgICBTdGFuZCxcclxuICAgICAgICBGbHksXHJcbiAgICAgICAgRmFsbCxcclxuICAgICAgICBKdW1wLFxyXG4gICAgICAgIEp1bXBkb3duXHJcbiAgICB9XHJcbiAgICB2YXIgQW5pbVR5cGU6e1tuYW1lOm51bWJlcl06c3RyaW5nfTtcclxuICAgIEFuaW1UeXBlID0ge307XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5TdGFuZF0gPSBcInN0YW5kXCI7XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5KdW1wXSA9IFwianVtcHVwXCI7XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5KdW1wZG93bl0gPSBcImp1bXBkb3duXCI7XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5GbHldID0gXCJmbHlcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkZhbGxdID0gXCJmYWxsXCI7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUGxheWVyQW5pbU5hbWUoIG5hbWVFbnVtOkFuaW1FbnVtICk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEFuaW1UeXBlW25hbWVFbnVtXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIENoYXJhY3RlckFuaW1hdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0FuaW1hdG9yOkxheWEuQW5pbWF0b3I7XHJcbiAgICAgICAgY29uc3RydWN0b3IoIFBsYXllckNoYXJhY3RlcjpMYXlhLlNwcml0ZTNEIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9BbmltYXRvciA9IFBsYXllckNoYXJhY3Rlci5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBTd2l0Y2hTdGF0ZSggQW5pbUVudW0gKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbi8v5ri45oiP5Lit55u45py6XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDYW1lcmEgZXh0ZW5kcyBMYXlhLkNhbWVyYVxyXG57XHJcbiAgICBDdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXI7XHJcbiAgICBCYXNlUFM6TGF5YS5WZWN0b3IzO1xyXG4gICAgRHluYW1pY1BTOkxheWEuVmVjdG9yMztcclxuICAgIFBsYXllcjpQbGF5ZXI7XHJcblxyXG4gICAgU2V0UGxhZXIocGxheWVyOlBsYXllcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgUmVzZXQoRHluYW1pY1BTOkxheWEuVmVjdG9yMyxiYXNlUFM6TGF5YS5WZWN0b3IzLHBsYXllcjpQbGF5ZXIgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIHRoaXMuQmFzZVBTID0gYmFzZVBTO1xyXG4gICAgICAgIHRoaXMuRHluYW1pY1BTID0gRHluYW1pY1BTO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6h566X5bm26K6+572u5L2N572uXHJcbiAgICBDb3VudFNldFBTKClcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3UFMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMuQmFzZVBTLHRoaXMuRHluYW1pY1BTLG5ld1BTKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgc2V0IFBvc2l0aW9uKHBzOkxheWEuVmVjdG9yMylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTpMYXlhLlZlY3RvcjNcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7ICAgXHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN0cmxlciA9IG5ldyBHYW1lQ2FtZXJhQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuRHluYW1pY1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgLy90aGlzLnRpbWVyTG9vcCgxLHRoaXMuQ3RybGVyLHRoaXMuQ3RybGVyLlVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX1VwZGF0ZSk7XHJcbiAgICAgICAgdmFyIHNreUJveDpMYXlhLlNreUJveCA9bmV3IExheWEuU2t5Qm94KCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckZsYWcgPSBMYXlhLkJhc2VDYW1lcmEuQ0xFQVJGTEFHX1NLWTtcclxuICAgICAgICAvL0NhbWVyYS5za3lSZW5kZXJlciA9IHNreUJveC5fcmVuZGVyO1xyXG4gICAgICAgIC8vdGhpcy5zayA9IHNreUJveDtcclxuICAgICAgICAgLy9wYXRoXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9VcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3RybGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBCYXNlR2FtZUNhbWVyYUN0cmxlclxyXG57XHJcbiAgICBDYW1lcmE6R2FtZUNhbWVyYTtcclxuICAgIEN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIGFic3RyYWN0IFVwZGF0ZSgpOnZvaWQ7XHJcbiAgICBjb25zdHJ1Y3RvciggY2FtZXJhOkdhbWVDYW1lcmEsY3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbCApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY3RybGVyID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGN0cmxlciA9IHRoaXM7IFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICB0aGlzLkN0cmxlciA9IGN0cmxlcjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR2FtZUNhbWVyYUN0cmxlciBleHRlbmRzIEJhc2VHYW1lQ2FtZXJhQ3RybGVyXHJcbntcclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5DYW1lcmE9PW51bGx8fCB0aGlzLkNhbWVyYS5QbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIENhbWVyYVBTID0gdGhpcy5DYW1lcmEuRHluYW1pY1BTO1xyXG4gICAgICAgIHZhciBQbGF5ZXJQUyA9IHRoaXMuQ2FtZXJhLlBsYXllci5fTG9naWNQb3NpdGlvbjtcclxuICAgICAgICBDYW1lcmFQUy54ID0gMDtcclxuICAgICAgICB2YXIgZGlzTnVtID0gUGxheWVyUFMueSAtIENhbWVyYVBTLnk7XHJcbiAgICAgICAgdmFyIGRpc1pOdW0gPSBQbGF5ZXJQUy56IC0gQ2FtZXJhUFMuejtcclxuICAgICAgICBpZihNYXRoLmFicyhkaXNOdW0pPjAuMDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy55ICs9IGRpc051bSowLjE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCBNYXRoLmFicyhkaXNaTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueiArPSBkaXNaTnVtKjAuMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQ2FtZXJhLkR5bmFtaWNQUyA9Q2FtZXJhUFM7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuQ291bnRTZXRQUygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbWVyYTpHYW1lQ2FtZXJhLGN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlciA9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoY2FtZXJhLGN0cmxlcik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQge1BsYXllckJ1ZmZ9IGZyb20gXCIuL0J1ZmZcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7QW5pbU9ian0gZnJvbSBcIi4vLi4vR2FtZS9BbmltT2JqXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQge1BsYXllckNvbnRyb2xlcn0gZnJvbSBcIi4vUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi9JbnB1dFwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxudHlwZSBCYXNlUGxheWVyQnVmZiA9IFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmY7XHJcbnR5cGUgQW5pbUNvaW4gPSBBbmltT2JqLkFuaW1Db2luXHJcblxyXG5leHBvcnQgbW9kdWxlIEl0ZW1cclxue1xyXG4gICAgLy/nianlk4HmoIfor4ZcclxuICAgIGNvbnN0IEl0ZW1JRDpzdHJpbmcgPSBcIkl0ZW1cIjtcclxuICAgIGNvbnN0IE1vZGVsSUQ6c3RyaW5nID1cIk1vZGVsXCJcclxuICAgIGV4cG9ydCBlbnVtIE1vZGVsVHlwZVxyXG4gICAge1xyXG4gICAgICAgIENvaW5cclxuICAgIH1cclxuICAgIGV4cG9ydCBlbnVtIEl0ZW1UeXBlIHtcclxuICAgICAgICBOb25lPTAsXHJcbiAgICAgICAgRW1wdHksXHJcbiAgICAgICAgUm9jayxcclxuICAgICAgICBUaG9ybixcclxuICAgICAgICBWaW5lLFxyXG4gICAgICAgIFByb3RlY3Q9MTEsXHJcbiAgICAgICAgSG9seVByb3RlY3QsXHJcbiAgICAgICAgRmx5LFxyXG4gICAgICAgIFJvcGUsXHJcbiAgICAgICAgQ29sbGVjdG9yLFxyXG4gICAgICAgIENvaW49MjAsXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBMaW5lSXRlbUluZm9cclxuICAgIHtcclxuICAgICAgICBUeXBlOkl0ZW1UeXBlO1xyXG4gICAgICAgIE51bWJlcjpudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IoIHR5cGU6SXRlbVR5cGUsbnVtOm51bWJlciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLk51bWJlciA9IG51bTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v54mp5ZOB5biD5bGAXHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxheW91dFxyXG4gICAge1xyXG4gICAgICAgIFJld2FyZExpc3Q6QXJyYXk8TGF5SXRlbU1ncj47XHJcbiAgICAgICAgQmFycmllckxpc3Q6QXJyYXk8TGF5SXRlbU1ncj47XHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0ID0gbmV3IEFycmF5PExheUl0ZW1NZ3I+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QgPSBuZXcgQXJyYXk8TGF5SXRlbU1ncj4oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwxLEl0ZW1UeXBlLkVtcHR5LDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCw1LEl0ZW1UeXBlLlJvY2ssMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDIsSXRlbVR5cGUuVGhvcm4sMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDIsSXRlbVR5cGUuVmluZSwxMCkpXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLDEsSXRlbVR5cGUuQ29pbikpXHJcblxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwxLEl0ZW1UeXBlLkZseSwyMCkpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwxLEl0ZW1UeXBlLkNvbGxlY3RvcikpXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLDEsSXRlbVR5cGUuUHJvdGVjdCkpO1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwxLEl0ZW1UeXBlLkhvbHlQcm90ZWN0KSk7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIFJlc2V0SXRlbUZhY3RvcnkoICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFRha2VMaW5lUmV3YXJkKGZsb29yOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRha2VJdGVtKGZsb29yLHRoaXMuUmV3YXJkTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFRha2VMaW5lRGlmZmljdWx0eShmbG9vcjpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vcix0aGlzLkJhcnJpZXJMaXN0KTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBUYWtlSXRlbShmbG9vcjpudW1iZXIsIE1nckxpc3Q6QXJyYXk8TGF5SXRlbU1ncj4pOkFycmF5PExpbmVJdGVtSW5mbz5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciByZXR1cm5JbmZvID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICAgICAgZm9yKCB2YXIgbGlzdElkeCA9IDA7IGxpc3RJZHggPCBNZ3JMaXN0Lmxlbmd0aDsgKytsaXN0SWR4IClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTWdyTGlzdFtsaXN0SWR4XS5PbkZsb29yKGZsb29yKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmZvOkxpbmVJdGVtSW5mbyA9IE1nckxpc3RbbGlzdElkeF0uVGFrZUl0ZW1zKGZsb29yKTtcclxuICAgICAgICAgICAgICAgIGlmKGluZm8uTnVtYmVyPjApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuSW5mby5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5JbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/or6Xlr7nosaHnmoTliIbluIPlm77mr4/lsYLnrYnmpoLnjofliIbluINcclxuICAgIGV4cG9ydCBjbGFzcyBMYXlJdGVtTWdyXHJcbiAgICB7XHJcbiAgICAgICAgLy/pgZPlhbfnsbvlnotcclxuICAgICAgICBJdGVtVHlwZTpJdGVtVHlwZTtcclxuICAgICAgICAvL+W9k+WJjeWxguaVsFxyXG4gICAgICAgIEN1ckZsb29yOm51bWJlcjtcclxuICAgICAgICAvL+WMuumXtOWIhuW4g+aAu+aVsOmHj1xyXG4gICAgICAgIEl0ZW1OdW06bnVtYmVyO1xyXG4gICAgICAgIC8v5byA5aeL5YiG5biD55qE5bGC5pWwXHJcbiAgICAgICAgU3RhcnRGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgLy/liIbluIPljLrpl7RcclxuICAgICAgICAvL+W3suiOt+WPluWxguagh+iusFxyXG4gICAgICAgIFRvdWNoZWRGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgSXRlbUxpc3Q6QXJyYXk8bnVtYmVyPjtcclxuICAgICAgICAvL3Jhbmdl5Yy66Ze06IyD5Zu0XHJcbiAgICAgICAgLy9udW0g5Yy66Ze06IyD5Zu05pWw6YePXHJcbiAgICAgICAgLy9pdGVtVHlwZSDnlJ/kuqfnmoTpgZPlhbfnsbvlnotcclxuICAgICAgICAvL3N0YXJ0Rmxvb3Ig5LuO5ZOq5LiA6KGM5byA5aeL5oqV5o63XHJcbiAgICAgICAgY29uc3RydWN0b3IoIHJhbmdlOm51bWJlcixudW06bnVtYmVyLGl0ZW1UeXBlOkl0ZW1UeXBlLHN0YXJ0Rmxvb3I6bnVtYmVyID0gMSApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihudW0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIG51bSA9IDE7XHJcbiAgICAgICAgICAgIGlmKHN0YXJ0Rmxvb3IgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgLy/nrKww5bGC5piv546p5a626LW35q2l5L2N572uXHJcbiAgICAgICAgICAgICAgICBzdGFydEZsb29yID0gMTtcclxuICAgICAgICAgICAgdGhpcy5JdGVtVHlwZSA9IGl0ZW1UeXBlO1xyXG4gICAgICAgICAgICB0aGlzLkN1ckZsb29yID0gMDtcclxuICAgICAgICAgICAgdGhpcy5JdGVtTnVtID0gbnVtO1xyXG4gICAgICAgICAgICAvL+WIhuW4g+WbviDnianlk4FpZHg65bGC5pWwXHJcbiAgICAgICAgICAgIHRoaXMuSXRlbUxpc3QgPSBuZXcgQXJyYXk8bnVtYmVyPihyYW5nZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG91Y2hlZEZsb29yID0gMDtcclxuICAgICAgICAgICAgdGhpcy5HZW5NYXAoc3RhcnRGbG9vcilcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFJhbmdlKCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuSXRlbUxpc3QubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WxguabtOaWsOWHveaVsFxyXG4gICAgICAgIE9uRmxvb3IoZmxvb3I6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZmxvb3I8dGhpcy5Ub3VjaGVkRmxvb3IpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2VuTWFwKGZsb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihmbG9vcj49dGhpcy5TdGFydEZsb29yICsgdGhpcy5SYW5nZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HZW5NYXAoZmxvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sf5oiQ5YiG5biD5Zu+XHJcbiAgICAgICAgR2VuTWFwKHN0YXJ0Rmxvb3I6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5TdGFydEZsb29yID0gc3RhcnRGbG9vcjtcclxuICAgICAgICAgICAgdmFyIGl0ZW1OdW0gPSB0aGlzLkl0ZW1OdW07XHJcbiAgICAgICAgICAgIGZvcihsZXQgY291bnQ6bnVtYmVyID0gMDsgY291bnQ8IHRoaXMuSXRlbUxpc3QubGVuZ3RoOysrY291bnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXRlbUxpc3RbY291bnRdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXRlbUxpc3QgPSB0aGlzLkl0ZW1MaXN0O1xyXG4gICAgICAgICAgICBmb3IodmFyIGNvdW50TnVtOm51bWJlciA9IDA7IGNvdW50TnVtPGl0ZW1OdW07Kytjb3VudE51bSlcclxuICAgICAgICAgICAgeyAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIEl0ZW1GbG9vcjpudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqdGhpcy5SYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkl0ZW1MaXN0W0l0ZW1GbG9vcl0gKz0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgVGFrZUl0ZW1zKCBmbG9vcjpudW1iZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Ub3VjaGVkRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5lSXRlbUluZm8odGhpcy5JdGVtVHlwZSx0aGlzLkl0ZW1MaXN0W2Zsb29yIC0gdGhpcy5TdGFydEZsb29yXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICB2YXIgUmVzZXQ6Ym9vbGVhbjtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZXNldEl0ZW1GYWN0b3J5KCApOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZihSZXNldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJlc2V0ID10cnVlO1xyXG4gICAgICAgIGZvcih2YXIgdGhlS2V5IGluIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBwYXJzZUludCh0aGVLZXkpO1xyXG4gICAgICAgICAgICBpZih0eXBlIDw9IDIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IoIGxldCBjb3VudCA9MDtjb3VudCA8IDMwOysrY291bnQgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xhczogYW55ID0gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbdHlwZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbTpTdGVwID0gbmV3IGNsYXMobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihJdGVtSUQrdGhlS2V5LGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFN0ZXBJdGVtRmFjdG9yeSggaXRlbVR5cGU6SXRlbVR5cGUsU3RlcClcclxuICAgIHtcclxuICAgICAgICBpZihTdGVwID09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihpdGVtVHlwZSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpdGVtXHJcbiAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7XHJcbiAgICAgICAgaXRlbSA9IG9ialBvb2wuZ2V0SXRlbShJdGVtSUQraXRlbVR5cGUpXHJcbiAgICAgICAgaWYoaXRlbT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXSE9bnVsbCYmR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdIT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGFzOiBhbnkgPSBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV07XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IGNsYXMoU3RlcCk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBuZXcgU3RlcEl0ZW0oaXRlbVR5cGUsU3RlcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLlN0ZXAgPSBTdGVwO1xyXG4gICAgICAgIGl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFN0ZXA6U3RlcDtcclxuICAgICAgICBJdGVtVHlwZTpJdGVtVHlwZTtcclxuICAgICAgICBNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIHByaXZhdGUgbV9BbmltYXRvcjpMYXlhLkFuaW1hdG9yO1xyXG4gICAgICAgIGdldCBJc0RpZmZpY3VsdHkoKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtVHlwZT4wJiZ0aGlzLkl0ZW1UeXBlPDEwJiZ0aGlzLkl0ZW1UeXBlIT0gSXRlbVR5cGUuVmluZTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+WIpOaWreiDveS4jeiDvei1sOS4iuWOu1xyXG4gICAgICAgIGdldCBJc0ZvcmJpZGVuKCk6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGUgPT0gSXRlbVR5cGUuUm9jaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldEl0ZW0oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy90aGlzLl9Jbml0SXRlbU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0RW5hYmxlKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuTW9kZWwhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0ZXAuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBTZXRFbmFibGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5Nb2RlbD09bnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwuYWN0aXZlID10cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBQdXRJdGVtID0gZnVuY3Rpb24oIGl0ZW1UeXBlID0gSXRlbVR5cGUuTm9uZSApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkRlc1Bhd24oKTtcclxuICAgICAgICAgICAgdGhpcy5TdGVwLlN0ZXBJdGVtID0gU3RlcEl0ZW1GYWN0b3J5KGl0ZW1UeXBlLHRoaXMuU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/mtojpmaQg5oqK6Ieq5bex5a2Y5YWl5YaF5a2Y5rGgXHJcbiAgICAgICAgRGVzUGF3bigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLk1vZGVsIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Nb2RlbC5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHZhciBvYmpQb29sID0gTGF5YS5Qb29sOy8vR00uT2JqUG9vbDtcclxuICAgICAgICAgICAgb2JqUG9vbC5yZWNvdmVyKEl0ZW1JRCt0aGlzLkl0ZW1UeXBlLHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5JdGVtVHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog56qB56C05L+d5oqkXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm6KKr56qB56C0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQnJlYWtQcm90ZWN0KHBsYXllcjpQbGF5ZXIpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjdXJCdWZmID0gcGxheWVyLkdldEJ1ZmYoUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgaWYoY3VyQnVmZilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKGN1ckJ1ZmYuVHlwZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckJ1ZmYuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkhvbHlQcm90ZWN0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAgZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBpdGVtVHlwZTpJdGVtVHlwZSxTdGVwOlN0ZXAgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5TdGVwID0gU3RlcDtcclxuICAgICAgICAgICAgdGhpcy5JdGVtVHlwZSA9IGl0ZW1UeXBlO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9Jbml0SXRlbU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9BbmltYXRvciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXI6UGxheWVyLGJ1ZmY6QmFzZVBsYXllckJ1ZmYpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuQWRkQnVmZihidWZmKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5pdEl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiggdGhpcy5Nb2RlbCE9bnVsbCYmIXRoaXMuTW9kZWwuZGVzdHJveWVkIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwcyA9IG5ldyBMYXlhLlZlY3RvcjMoMCxDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoLDApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fR2VuSXRlbU1vZGVsKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuTW9kZWwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gcHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSB0aGlzLk1vZGVsLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Nb2RlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9UZXN0R2VudEl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IG51bGw7XHJcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLkl0ZW1UeXBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvY2s6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjMsIDAuMywgMC41KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ob25lOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogICAgICBcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTsgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuSXRlbVR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9jazpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGFzcyBSb2NrIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1vZGVsTnVtID0gMztcclxuICAgICAgICBjb25zdHJ1Y3RvcihTdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb2NrLFN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgaWR4ID0gMStNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqUm9jay5Nb2RlbE51bSk7XHJcbiAgICAgICAgICAgIHZhciBOYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMFwiK2lkeClcclxuICAgICAgICAgICAgbW9kZWwgPSBMYXlhLmxvYWRlci5nZXRSZXMoTmFtZSlcclxuICAgICAgICAgICAgbW9kZWwgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlJvY2tdID0gUm9jaztcclxuICAgIFxyXG4gICAgY2xhc3MgVGhvcm4gZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlRob3JuLFN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJ0cmFwX3N0aW5nXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQnJlYWtQcm90ZWN0KHBsYXllcikpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoKTtcclxuICAgICAgICAgICAgICAgIHZhciBhbmltOkxheWEuQW5pbWF0b3IgPSB0aGlzLk1vZGVsLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KFwidG91Y2hcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5UaG9ybl0gPSBUaG9ybjtcclxuICAgIFxyXG4gICAgY2xhc3MgUHJvdGVjdCBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUHJvdGVjdCxzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZihQcm90ZWN0QnVmZi5JZHgpIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLl9BZGRCdWZmVG9QbGF5ZXIocGxheWVyLG5ldyBQcm90ZWN0QnVmZigzMDAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUHJvdGVjdF0gPSBQcm90ZWN0O1xyXG4gICAgXHJcbiAgICBjbGFzcyBQcm90ZWN0QnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBUaW1lOm51bWJlcjtcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB0aW1lIOaMgee7reaXtumXtFxyXG4gICAgICAgICAqIEBwYXJhbSBJc0hvbHkg5piv5ZCm57ud5a+55peg5pWMXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTpudW1iZXIgPSAwLCBJc0hvbHk6Ym9vbGVhbiA9IGZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXNIb2x5ID8gSXRlbVR5cGUuSG9seVByb3RlY3Q6SXRlbVR5cGUuUHJvdGVjdCxQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVUaW1lK3RpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU8Q29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lVGltZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3MgSG9seVByb3RlY3QgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkhvbHlQcm90ZWN0LHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGxheWVyLkdldEJ1ZmYoUHJvdGVjdEJ1ZmYuSWR4KSE9bnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5fQWRkQnVmZlRvUGxheWVyKHBsYXllcixuZXcgUHJvdGVjdEJ1ZmYoMzAwMCx0cnVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuSG9seVByb3RlY3RdID0gSG9seVByb3RlY3Q7XHJcblxyXG4gICAgY2xhc3MgQ29pbiBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgLy9Ub0RvXHJcbiAgICAgICAgcHJpdmF0ZSBtX3RvdWNoZWQ6Qm9vbGVhblxyXG4gICAgICAgIEZseVRvUGxheWVyKHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY29uaW46QW5pbUNvaW4gPSBBbmltT2JqLkdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1PYmouQW5pbUNvaW4sdGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIGNvbmluLlNldFRhcmdldChwbGF5ZXIpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZEdvbGRVbkxvZ2ljR29sZCgxKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZEdvbGQoMSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuQ29pbixzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9jb2luXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Db2luXSA9IENvaW47XHJcbiAgICBcclxuICAgIGNsYXNzIENvbGxlY3RlciBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKENvbGxlY3RCdWZmLklkeCkhPW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKG5ldyBDb2xsZWN0QnVmZigxMDAwMCkpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuQ29sbGVjdG9yLHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDErIE1hdGgucmFuZG9tKCkqMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2Fic29yZF8wMVwiKTtcclxuICAgICAgICAgICAgdmFyIHRoZU1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IHRoZU1vZGVsLmNsb25lKCk7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Db2xsZWN0b3JdID0gQ29sbGVjdGVyO1xyXG4gICAgXHJcbiAgICBjbGFzcyBDb2xsZWN0QnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBUaW1lOm51bWJlcjtcclxuICAgICAgICBHYW1lRGlyOkdhbWVEaXJlY3RvcjtcclxuICAgICAgICBDb3VudEZsb29yOm51bWJlcjtcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6bnVtYmVyID0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlByb3RlY3QsQ29sbGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lRGlyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpcjtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gdGhpcy5HYW1lRGlyLkdhbWVUaW1lK3RpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRGbG9vciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50Rmxvb3IgPSB0aGlzLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3IgLSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5UaW1lPHRoaXMuR2FtZURpci5HYW1lVGltZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3IgLSB0aGlzLkNvdW50Rmxvb3IrMTwwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpci5HYW1lUGxheS5Mb29wRG9GbG9vclN0ZXAodGhpcy5Db3VudEZsb29yLHRoaXMsdGhpcy5Db3VudENvaW5zKTtcclxuICAgICAgICAgICAgICAgICsrdGhpcy5Db3VudEZsb29yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgQ291bnRDb2lucyhzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihzdGVwLlN0ZXBJdGVtLkl0ZW1UeXBlID09IEl0ZW1UeXBlLkNvaW4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBDb2luOkNvaW4gPSBzdGVwLlN0ZXBJdGVtIGFzIENvaW47XHJcbiAgICAgICAgICAgICAgICBDb2luLkZseVRvUGxheWVyKHRoaXMuUGxheWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xhc3MgRkx5IGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGxheWVyLkdldEJ1ZmYoMCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKG5ldyBGbHlCdWZmKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5GbHksc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSsgTWF0aC5yYW5kb20oKSoyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fZmx5ZXJfMDFcIik7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKCk7IFxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkZseV0gPSBGTHk7XHJcbiAgICBcclxuICAgIGNsYXNzIEZseUJ1ZmYgZXh0ZW5kcyBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgU3BlZWQ6bnVtYmVyO1xyXG4gICAgICAgIEZsb29yOm51bWJlcjtcclxuICAgICAgICBcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIHZhciB0aW1lOm51bWJlciA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuQ3VyU3RlcCA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IHBsYXllci5DdXJTdGVwLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uLlkgKz10aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZS8yKnRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KCkpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNldFNhZmVQUyh0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgcGxheWVyLkZseVByZXBhcmUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjpHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbFo6bnVtYmVyOyAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOm51bWJlcj0wLjE1LGZsb29yOm51bWJlcj0xMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkZseSxQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLl9GaW5hbFogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56Pi0wLjIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Qb3BDdHJsZXIoKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xhc3MgUm9wZSBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKDApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgUm9wZUJ1ZmYoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUsc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjEsMC41LDAuMSkpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUm9wZV0gPSBSb3BlO1xyXG4gICAgXHJcbiAgICBjbGFzcyBSb3BlQnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBTcGVlZDpudW1iZXI7XHJcbiAgICAgICAgRmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuUGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLl9GaW5hbFogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56Pi0wLjIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5FbmQoc3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgRW5kKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9dGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gcGxheWVyLlBvc2l0aW9uLnogLSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMip0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDpudW1iZXI9MC4xLGZsb29yOm51bWJlcj0xMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUsUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0lucHV0KGlzUmlnaHQ6Ym9vbGVhbik6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlRmxvb3IgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBsYXllckZsb29yTGluZTtcclxuICAgICAgICAgICAgaWYoY2xvc2VGbG9vci5GbG9vck51bSUyIT0gdGhpcy5fRmluYWxMb2NhdGlvbi5ZJTIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlRmxvb3IgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldEZsb29yQnlGbG9vcihjbG9zZUZsb29yLkZsb29yTnVtICsxICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0ZXA6U3RlcCA9IGNsb3NlRmxvb3IuR2V0U3RlcCggdGhpcy5fRmluYWxMb2NhdGlvbi5YICk7XHJcbiAgICAgICAgICAgIGlmKGlzUmlnaHQpXHJcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICAgICAgaWYoc3RlcC5TdGVwSXRlbS5Jc0ZvcmJpZGVuKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkVuZChzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsYXNzIFZpbmUgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY3VyQnVmZjpCYXNlUGxheWVyQnVmZiA9IHBsYXllci5HZXRCdWZmKDApO1xyXG4gICAgICAgICAgICBpZighdGhpcy5CcmVha1Byb3RlY3QocGxheWVyKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYobmV3IFZpbmVCdWZmKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5WaW5lLHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDErIE1hdGgucmFuZG9tKCkqMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IElkeCA9PSAxPyBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKTpwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpXHJcbiAgICAgICAgICAgIC8vdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIilcclxuICAgICAgICAgICAgLy92YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpOyBcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5WaW5lXSA9IFZpbmU7XHJcbiAgICBcclxuICAgIGNsYXNzIFZpbmVCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIENvdW50VGltZTpudW1iZXI7XHJcbiAgICAgICAgSW5wdXREaXI6Ym9vbGVhbjtcclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENvbXBsZXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoY291bnRUaW1lOm51bWJlciA9IDQsaW5wdXREaXI6Ym9vbGVhbiA9IHRydWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5WaW5lLDApO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50VGltZSA9IGNvdW50VGltZTtcclxuICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9IGlucHV0RGlyO1xyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZTtcclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpbnB1dERpcjpib29sZWFuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5JbnB1dERpciA9PSBpbnB1dERpcilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9IXRoaXMuSW5wdXREaXI7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuQ291bnRUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ291bnRUaW1lPD0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1Nob3dHYW1lSW5mbygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzpzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQ291bnRUaW1lPD0wKVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLklucHV0RGlyID09IHRydWU/XCJSaWdodFwiOlwiTGVmdFwiO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiZXhwb3J0IG1vZHVsZSBHYW1lU3RydWN0XHJcbntcclxuICAgIGV4cG9ydCBjbGFzcyBTZXRJbmZvIHtcclxuICAgICAgICBBdWRpb09uOiBib29sZWFuO1xyXG4gICAgICAgIE9QSXNSaWdodDogYm9vbGVhbjtcclxuICAgICAgICBUZXh0SW5mbzogc3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLkF1ZGlvT24gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLk9QSXNSaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVGV4dEluZm8gPSBcIkhlbGxvIFxcbiBIZWxsb1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBNTG9jYXRpb25cclxuICAgIHtcclxuICAgICAgICBnZXQgWCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0FyclswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFgoeDpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnJbMF0gPXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBZKCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQXJyWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgWSh5Om51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyclsxXSA9IHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0FycjpBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCB4Om51bWJlcix5Om51bWJlciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnIgPSBbeCx5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgdmFyIEl0ZW1EaWN0VHlwZTp7W0l0ZW1UeXBlOm51bWJlcl06YW55fTtcclxuICAgIEl0ZW1EaWN0VHlwZSA9IHsgfTtcclxufSIsIi8qKuS9nOiAhTpNb1xyXG4gKiDovpPlhaXnrqHnkIbnm7jlhbNcclxuICovXHJcbmltcG9ydCBHYW1lU2NlbmVQbGF5IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lUGxheS9HYW1lU2NlbmVQbGF5XCJcclxuZXhwb3J0IG1vZHVsZSBJbnB1dFxyXG57XHJcbi8v5Z+656GA6L6T5YWl5o6n5Yi25ZmoXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlR2FtZUlucHV0XHJcbntcclxuICAgIC8v5YWs5pyJXHJcbiAgICBOZXh0SW5wdXQ6QmFzZUdhbWVJbnB1dDtcclxuICAgIGFic3RyYWN0IElucHV0KGlzUmlnaHQ6Ym9vbGVhbik7XHJcblxyXG4gICAgY29uc3RydWN0b3IoIGlucHV0IDpCYXNlR2FtZUlucHV0ID0gbnVsbCApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaW5wdXQgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlucHV0ID0gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5OZXh0SW5wdXQgPSBpbnB1dDtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG4gICAgQ2xlYXIoKXt9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBESVlJbnB1dCBleHRlbmRzIEJhc2VHYW1lSW5wdXRcclxue1xyXG4gICAgSW5wdXQoaXNSaWdodDpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0xpc3RlbmVyKVxyXG4gICAgICAgICAgICB0aGlzLl9MaXN0ZW5lci5jYWxsKHRoaXMuX093bmVyLGlzUmlnaHQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfT3duZXI6YW55O1xyXG4gICAgcHJpdmF0ZSBfTGlzdGVuZXI6KGlzcmluZzpib29sZWFuKT0+dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKG93bmVyOmFueSA9IG51bGwsbGlzdGVuZXI6KGlzcmluZzpib29sZWFuKT0+dm9pZCA9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9Pd25lciA9IG93bmVyO1xyXG4gICAgICAgIHRoaXMuX0xpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIE5vcm1HYW1lSW5wdXQgZXh0ZW5kcyBCYXNlR2FtZUlucHV0XHJcbntcclxuICAgIEdhbWVEaXI6R2FtZVNjZW5lUGxheTtcclxuICAgIF9EaXJ0eTpib29sZWFuO1xyXG4gICAgX0lzUmlnaHQ6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKCBkaXI6R2FtZVNjZW5lUGxheSxpbnB1dDpCYXNlR2FtZUlucHV0ID0gbnVsbCApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoaW5wdXQpO1xyXG4gICAgICAgIHRoaXMuR2FtZURpciA9IGRpcjtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX0lzUmlnaHQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIElucHV0KCBpc1JpZ2h0OmJvb2xlYW4gKVxyXG4gICAge1xyXG4gICAgICAgIC8vdGhpcy5HYW1lRGlyLk1vdmVTdGVwKGlzUmlnaHQpO1xyXG4gICAgICAgIHRoaXMuX0RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9Jc1JpZ2h0ID0gaXNSaWdodDtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fRGlydHkmJnRoaXMuR2FtZURpci5QbGF5ZXIuQmFzZUN0cmxlci5UaW1lPD0wLjEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVEaXIuTW92ZVN0ZXAodGhpcy5fSXNSaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgQ2xlYXIoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0RpcnR5PWZhbHNlO1xyXG4gICAgfVxyXG59XHJcbn1cclxuIiwiaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxudHlwZSBTdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW07XHJcblxyXG4gLyoq5L2c6ICFOk1vXHJcbiAq5Zy65pmv5YaF5a+56LGhIFxyXG4gKi9cclxuLy/nrqHnkIbkuIDmlbTooYxcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW91bnRMaW5lIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG57XHJcbiAgICBMYXlPdXREaXJ0eTpib29sZWFuO1xyXG4gICAgTGluZUlkeDpudW1iZXI7XHJcbiAgICBGbG9vck51bTpudW1iZXI7XHJcbiAgICBTdGVwTGlzdDpTdGVwW107XHJcbiAgICBMb2dpY0xlbmd0aDpudW1iZXI7XHJcbiAgICBTdGVwSXRlbTpTdGVwSXRlbTtcclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7ojrflj5bmmL7npLrlh7rmnaXnmoTnrKzlh6DkuKrlubPlj7BcclxuICAgIEdldFN0ZXAoaWR4Om51bWJlcik6U3RlcFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlN0ZXBMaXN0W2lkeCArIDFdO1xyXG4gICAgfVxyXG4gICAgLy/orr7nva7mr4/lsYJcclxuICAgIFNldExpbmUoIGZsb29yOm51bWJlciApOnZvaWRcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLkxheU91dERpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB2YXIgbmV3UFMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICB2YXIgc3RlcExlbmd0aCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgdmFyIHN0ZXBEaXN0YW5jZT0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlO1xyXG4gICAgICAgIG5ld1BTLnkgPSBzdGVwTGVuZ3RoKmZsb29yO1xyXG4gICAgICAgIG5ld1BTLnogPSAtc3RlcERpc3RhbmNlLzIgKmZsb29yO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICAgICAgdmFyIHN0ZXBBcnI6U3RlcFtdID0gdGhpcy5TdGVwTGlzdDtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgc3RhcnRYID0gMCAtIHN0ZXBBcnIubGVuZ3RoLzIgKiBzdGVwRGlzdGFuY2U7XHJcbiAgICAgICAgaWYodGhpcy5KdWdlSXNMZXNzTGluZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhcnRYICs9IHN0ZXBEaXN0YW5jZS8yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIGZvciggdmFyIGNvbHVtbiA9MCA7Y29sdW1uPHN0ZXBBcnIubGVuZ3RoOysrY29sdW1uIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuZXdTdGVwOlN0ZXAgPSBzdGVwQXJyW2NvbHVtbl07XHJcbiAgICAgICAgICAgIHZhciBzdGVwVmVjdG9yID0gbmV3U3RlcC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgc3RlcFZlY3Rvci54ID0gc3RhcnRYO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9TZXRlZCYmKGNvbHVtbiA9PSAwfHxjb2x1bW4+dGhpcy5Mb2dpY0xlbmd0aCkpXHJcbiAgICAgICAgICAgICAgICBuZXdTdGVwLlJlc2V0U3RlcChzdGVwVmVjdG9yLHRydWUpXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG5ld1N0ZXAuUmVzZXRTdGVwKHN0ZXBWZWN0b3IpXHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBzdGVwRGlzdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX1NldGVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc3RlcEFyclswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzdGVwQXJyW3N0ZXBBcnIubGVuZ3RoIC0xXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9TZXRlZCA9IHRydWU7XHJcbiAgICAgICAgaWYoICEgdGhpcy5KdWdlSXNMZXNzTGluZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IHN0ZXBBcnIubGVuZ3RoLTI7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXBBcnJbc3RlcEFyci5sZW5ndGggLTJdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkxvZ2ljTGVuZ3RoID0gc3RlcEFyci5sZW5ndGggLTM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+WIpOaWreaYr+WQpuaUtue8qeeahOmCo+WxglxyXG4gICAgSnVnZUlzTGVzc0xpbmUoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRmxvb3JOdW0lMiAhPSAwO1xyXG4gICAgfVxyXG4gICAgLy/lsIbmr4/kuKroioLngrnpk77mjqXliLDkuIvkuIDlsYJcclxuICAgIFNldE5leHRGbG9vciggbGFzdEZsb29yOk1vdW50TGluZSk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5pyJ5Lik5aS056uv54K5XHJcbiAgICAgICAgdmFyIGhhdmVQb2ludCA9IGxhc3RGbG9vci5Mb2dpY0xlbmd0aCA+dGhpcy5Mb2dpY0xlbmd0aFxyXG4gICAgICAgIGZvciggdmFyIHN0YXJ0SWR4Om51bWJlciA9IDA7c3RhcnRJZHg8IHRoaXMuTG9naWNMZW5ndGg7KytzdGFydElkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0UGFyZW50OlN0ZXAgPW51bGw7XHJcbiAgICAgICAgICAgIHZhciByaWdodFBhcmVudDpTdGVwID1udWxsO1xyXG4gICAgICAgICAgICBpZihoYXZlUG9pbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxlZnRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgICAgICByaWdodFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4KzEpO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgtMSk7XHJcbiAgICAgICAgICAgICAgICByaWdodFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGhpU3RlcCA9IHRoaXMuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgIHRoaVN0ZXAuTGVmdFBhcmVudCA9IGxlZnRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGxlZnRQYXJlbnQuUmlnaHRDaGlsZCA9IHRoaVN0ZXA7XHJcblxyXG4gICAgICAgICAgICB0aGlTdGVwLlJpZ2h0UGFyZW50ID0gcmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgICAgIHJpZ2h0UGFyZW50LkxlZnRDaGlsZCA9IHRoaVN0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/mlbLnoo7kuIDlsYJcclxuICAgIEJyZWFrKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9TZXRlZDpib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IobGluZUlkeDpudW1iZXIsZmxvb3I6bnVtYmVyID0gMClcclxuICAgIHtcclxuICAgICAgICB2YXIgY29sdW1uczpudW1iZXIgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5MaW5lU3RlcE51bTtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuTGluZUlkeCA9IGxpbmVJZHg7XHJcbiAgICAgICAgdGhpcy5GbG9vck51bSA9IGZsb29yO1xyXG4gICAgICAgIHRoaXMuU3RlcExpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLkxvZ2ljTGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLkxheU91dERpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fU2V0ZWQgPSBmYWxzZTtcclxuICAgICAgICBmb3IoIHZhciBTdGFydElkeDpudW1iZXIgPSAoY29sdW1ucyAtMSk7U3RhcnRJZHg+PTA7LS1TdGFydElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3U3RlcDpTdGVwID0gbmV3IFN0ZXAodGhpcyxTdGFydElkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3U3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcExpc3RbU3RhcnRJZHhdID0gbmV3U3RlcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7UGxheWVyQ29udHJvbGVyfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQge1BsYXllckJ1ZmZ9IGZyb20gXCIuL0J1ZmZcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbmltcG9ydCB7Q2hhcmFjdGVyfSBmcm9tIFwiLi9DaGFyYWN0ZXJcIlxyXG52YXIgbnVtOm51bWJlciA9IDA7XHJcbnR5cGUgQmFzZVBsYXllckJ1ZmYgPSBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmO1xyXG4vL+ivpeiEmuacrOeUqOS6jua4uOaIj+eOqeWutuWvueixoeeuoeeQhlxyXG4vL+eOqeWutuWvueixoVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbnsgICBcclxuICAgIC8v56eB5pyJ5bGe5oCnXHJcbiAgICBfTG9naWNQb3NpdGlvbjpMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF9CdWZmTm9kZTpMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBfUGxheWVyTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIHByaXZhdGUgX0N1clN0ZXA6U3RlcDtcclxuICAgIHByaXZhdGUgX0N0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlcjtcclxuICAgIHByaXZhdGUgbV9BbmltYXRvcjpMYXlhLkFuaW1hdG9yO1xyXG4gICAgcHJpdmF0ZSBtX0J1ZmZNb2RlbDp7W25hbWU6bnVtYmVyXTpMYXlhLlNwcml0ZTNEfVxyXG4gICAgXHJcbiAgICBCYXNlQ3RybGVyOlBsYXllckNvbnRyb2xlci5QbGF5ZXJOb3JtQ3RybGVyO1xyXG4gICAgQnVmZkFycjpBcnJheTxQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmPjtcclxuICAgIC8vemVyZ1xyXG4gICAgSWROdW1iZXI6bnVtYmVyO1xyXG5cclxuICAgIHNldCBDdXJTdGVwKHN0ZXA6U3RlcClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdXJTdGVwID0gc3RlcDtcclxuICAgIH1cclxuICAgIGdldCBDdXJTdGVwKCk6U3RlcFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgSW5pdEJVZmZNb2RlbCggcGxheWVyTW9kZWw6TGF5YS5TcHJpdGUzRCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZXRNb2RlbCggXCJpdGVtX2ZseWVyXzAxXCIsIFwiUl9oYW5kXCIscGxheWVyTW9kZWwsIEl0ZW0uSXRlbVR5cGUuRmx5KTtcclxuICAgICAgICB0aGlzLlNldE1vZGVsKCBcIml0ZW1fc2hpZWxkXzAxXCIsIFwiaGVhZFwiLHBsYXllck1vZGVsLCBJdGVtLkl0ZW1UeXBlLlByb3RlY3QpO1xyXG4gICAgICAgIHRoaXMuU2V0TW9kZWwoIFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiLCBcImhlYWRcIixwbGF5ZXJNb2RlbCwgSXRlbS5JdGVtVHlwZS5Ib2x5UHJvdGVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTZXRNb2RlbCggcmVzb3VyY2VOYW1lOnN0cmluZywgbm9kZU5hbWU6c3RyaW5nLCBwbGF5ZXJNb2RlbDpMYXlhLlNwcml0ZTNELCBpdGVtVHlwZTpJdGVtLkl0ZW1UeXBlIClcclxuICAgIHtcclxuICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldExIKHJlc291cmNlTmFtZSkpO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6TGF5YS5TcHJpdGUzRCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcGxheWVyTW9kZWwuZ2V0Q2hpbGRBdCgwKS5hZGRDaGlsZChidWZmTW9kZWwpO1xyXG4gICAgICAgIHN3aXRjaChub2RlTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJoZWFkXCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZTpMYXlhLlNwcml0ZTNEID0gcGxheWVyTW9kZWwuZ2V0Q2hpbGRCeU5hbWUobm9kZU5hbWUpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yLmxpbmtTcHJpdGUzRFRvQXZhdGFyTm9kZShub2RlTmFtZSxidWZmTW9kZWwpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgYnVmZk1vZGVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV9CdWZmTW9kZWxbaXRlbVR5cGVdID0gYnVmZk1vZGVsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsID0ge307XHJcbiAgICAgICAgdmFyIE5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcImMwMDFfY2hpbGRfMDFcIik7XHJcbiAgICAgICAgdmFyIFBsYXllck1vZGVsID0gTGF5YS5Mb2FkZXIuZ2V0UmVzKE5hbWUpO1xyXG4gICAgICAgIHZhciBzZWNvbmRQbGF5ZXI6TGF5YS5TcHJpdGUzRCA9IFBsYXllck1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChzZWNvbmRQbGF5ZXIpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMpO1xyXG5cclxuICAgICAgICAvL+a3u+WKoOiHquWumuS5ieaooeWei1xyXG4gICAgICAgIHNlY29uZFBsYXllci50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgMTgwLCAwKSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBzZWNvbmRQbGF5ZXIuZ2V0Q2hpbGRBdCgwKS5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgdGhpcy5vbihMYXlhLkV2ZW50LlJFTU9WRUQsdGhpcywoKT0+eyB0aGlzLmRlc3Ryb3koKSB9KVxyXG4gICAgICAgIHRoaXMuUmVzZXQoKTtcclxuICAgICAgICB0aGlzLkluaXRCVWZmTW9kZWwoc2Vjb25kUGxheWVyKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIFJlc2V0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBudWxsO1xyXG4gICAgICAgIGlmKHRoaXMuX0J1ZmZOb2RlKVxyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fQnVmZk5vZGUgPSBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fQnVmZk5vZGUpO1xyXG4gICAgICAgIHRoaXMuQnVmZkFyciA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuQmFzZUN0cmxlciA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyTm9ybUN0cmxlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLkJhc2VDdHJsZXI7XHJcbiAgICAgICAgdGhpcy5fTG9naWNQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoMCwwKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fVXBkYXRlKTtcclxuICAgICAgICB2YXIgZGVmYXVsdEFuaW1TdGF0ZTpMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLm1fQW5pbWF0b3IuZ2V0RGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgdmFyIHN0YXRlTmFtZTpzdHJpbmcgPSBkZWZhdWx0QW5pbVN0YXRlLm5hbWU7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoc3RhdGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueOqeWutkJVRkZcclxuICAgICAqIEBwYXJhbSBpZHgg5qe95L2N5qOA5p+lXHJcbiAgICAgKiBAcmV0dXJucyDnqbrooajnpLrmsqHmnIlcclxuICAgICAqL1xyXG4gICAgR2V0QnVmZihpZHg6bnVtYmVyKTpQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLkJ1ZmZBcnJbaWR4XSAhPW51bGwmJnRoaXMuQnVmZkFycltpZHhdIT11bmRlZmluZWQpP3RoaXMuQnVmZkFycltpZHhdOm51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mkYbmlL7op5LoibJcclxuICAgIFNldFN0ZXAocHV0U3RlcDpTdGVwKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gcHV0U3RlcDtcclxuICAgICAgICB2YXIgbmV3UFMgPSBwdXRTdGVwLlBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgbmV3UFMueSArPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuUG9zaXRpb24gPSBuZXdQUztcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gcHV0U3RlcC5Qb3NpdGlvbjtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLlN0YW5kKSk7XHJcbiAgICAgICAgdGhpcy5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgfVxyXG4gICAgc2V0IFBvc2l0aW9uKCBuZXdQUzpMYXlhLlZlY3RvcjMgKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdQUzpMYXlhLlZlY3RvcjMgPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTpMYXlhLlZlY3RvcjNcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2dpY1Bvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0xvZ2ljUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluIPlsYDlvZPliY3lsYLkvYbkuI3np7vliqhcclxuICAgICAqIEBwYXJhbSB7U3RlcH0gc3RlcCDkuIvkuIDmraXlj7DpmLZcclxuICAgICAqL1xyXG4gICAgTGF5U3RlcChzdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBzdGVwO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBzdGVwLlBvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBTdGFydE1vdmUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoIENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uSnVtcCkgKTtcclxuICAgICAgICB0aGlzLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgSnVtcERvd24oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5KdW1wZG93bikpO1xyXG4gICAgfVxyXG5cclxuICAgIEZseSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkZseSkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFBsYXllckRlYXRoOmJvb2xlYW47XHJcbiAgICAvL+inpuWPkeWPsOmYtlxyXG4gICAgVG91Y2hHcm91bmQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJEZWF0aCB8fCAhdGhpcy5DdXJTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoKHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5JdGVtVHlwZSA9PSBJdGVtLkl0ZW1UeXBlLk5vbmUpJiYodGhpcy5DdXJTdGVwLklzRW1wdHl8fCh0aGlzLkN1clN0ZXAuTGVmdFBhcmVudCYmdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50JiZ0aGlzLkN1clN0ZXAuTGVmdFBhcmVudC5TdGVwSXRlbS5Jc0ZvcmJpZGVuJiZ0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbikpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uRmFsbCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5Ub3VjaEl0ZW0odGhpcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog56e75YqoXHJcbiAgICAgKiBAcGFyYW0ge0xheWEuVmVjdG9yM30gdmVjdG9yIOenu+WKqOWQkemHj+WAvFxyXG4gICAgICovXHJcbiAgICBUcmFuc2xhdGUoIHZlY3RvcjpMYXlhLlZlY3RvcjMgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0udHJhbnNsYXRlKHZlY3Rvcik7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZCh0aGlzLl9Mb2dpY1Bvc2l0aW9uLHZlY3Rvcix0aGlzLl9Mb2dpY1Bvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOeOqeWutuaOp+WItuWZqFxyXG4gICAgICogQHBhcmFtIG5ld0N0cmxlciDmlrDnjqnlrrbmjqfliLblmahcclxuICAgICAqL1xyXG4gICAgQWRkQ3RybGVyKG5ld0N0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlciApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgY3RybGVyOlBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyID0gdGhpcy5fQ3RybGVyO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IG5ld0N0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuTmV4dEN0cmwgPWN0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuU2V0UGxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75Lqk5o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIFBvcEN0cmxlcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLl9DdHJsZXIuTmV4dEN0cmw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoEJVRkZcclxuICAgICAqIEBwYXJhbSBidWZmIFxyXG4gICAgICogQHBhcmFtIGluZGV4IFxyXG4gICAgICovXHJcbiAgICBBZGRCdWZmKGJ1ZmY6UGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZik6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHZhciBpbmRleDpudW1iZXIgPSBidWZmLklkeDtcclxuICAgICAgICBpZih0aGlzLkJ1ZmZBcnJbaW5kZXhdIT1udWxsfHx0aGlzLkJ1ZmZBcnJbaW5kZXhdIT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBidWZmTW9kZWw6TGF5YS5TcHJpdGUzRCA9IHRoaXMubV9CdWZmTW9kZWxbYnVmZi5UeXBlXTtcclxuICAgICAgICBpZihidWZmTW9kZWwpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYnVmZk1vZGVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQnVmZkFycltpbmRleF0gPSBidWZmO1xyXG4gICAgICAgIGJ1ZmYuSWR4ID0gaW5kZXg7XHJcbiAgICAgICAgYnVmZi5TdGFydCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5re75YqgQlVGRuaooeWei1xyXG4gICAgICogQHBhcmFtIG1vZCBcclxuICAgICAqL1xyXG4gICAgQWRkQnVmZk1vZGUoIG1vZDpMYXlhLlNwcml0ZTNEIClcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYobW9kIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQnVmZk5vZGUuYWRkQ2hpbGQobW9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOe7k+adn0JVRkZcclxuICAgICAqL1xyXG4gICAgQ29tcGxldGVCdWZmKGluZGV4Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgYnVmZjpCYXNlUGxheWVyQnVmZiA9IHRoaXMuQnVmZkFycltpbmRleF07XHJcbiAgICAgICAgdmFyIGJ1ZmZNb2RlbDpMYXlhLlNwcml0ZTNEID0gdGhpcy5tX0J1ZmZNb2RlbFtidWZmLlR5cGVdO1xyXG4gICAgICAgIGlmKGJ1ZmZNb2RlbCkgYnVmZk1vZGVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVmZkFycltpbmRleF09bnVsbDtcclxuICAgICAgICBpZihidWZmPT1udWxsfHxidWZmPT11bmRlZmluZWQgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdHJsZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgZm9yKCB2YXIgYnVmZklkeDpudW1iZXIgPSAwO2J1ZmZJZHg8MjsrK2J1ZmZJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5CdWZmQXJyW2J1ZmZJZHhdIT1udWxsfHx0aGlzLkJ1ZmZBcnJbYnVmZklkeF0hPXVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMuQnVmZkFycltidWZmSWR4XS5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBGbHlQcmVwYXJlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTdGVwRGF0YVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7fVxyXG4gICAgR2V0RGF0YSggc3RlcDpTdGVwIClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi9HYW1lU3RydWN0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5leHBvcnQgbW9kdWxlIFBsYXllckNvbnRyb2xlclxyXG57XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBsYXllckN0cmxlclxyXG4gICAge1xyXG4gICAgICAgIC8v5YWs5YWx5o6l5Y+jXHJcbiAgICAgICAgTmV4dEN0cmw6QmFzZVBsYXllckN0cmxlcjtcclxuICAgICAgICBwbGF5ZXI6UGxheWVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFVwZGF0ZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTZXRQbGF5ZXIocGxheWVyOlBsYXllcik6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgY29uc3RydWN0b3IoIHBsYXllcjpQbGF5ZXIsIGN0cmxlcjpCYXNlUGxheWVyQ3RybGVyID0gbnVsbCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihjdHJsZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3RybGVyID0gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk5leHRDdHJsID0gY3RybGVyO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IF9VcGRhdGUoKTp2b2lkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eUqOS6juinkuiJsuato+W4uOeKtuaAgeS4i+eahOenu+WKqFxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllck5vcm1DdHJsZXIgZXh0ZW5kcyBCYXNlUGxheWVyQ3RybGVyXHJcbiAgICB7XHJcbiAgICAgICAgVGltZTpudW1iZXI7XHJcbiAgICAgICAgSXNGYWxsaW5nOmJvb2xlYW47XHJcbiAgICAgICAgU3RhcnRNb3ZlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuRGlyZWN0b3IuR2FtZVRpbWUgKyBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5QbGF5ZXJNb3ZlVGltZTtcclxuICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IocGxheWVyOlBsYXllciA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVGltZT4wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLlRpbWU8PUFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuRGlyZWN0b3IuR2FtZVRpbWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuU2V0U3RlcCh0aGlzLnBsYXllci5DdXJTdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RUaW1lID0gdGhpcy5UaW1lLUxheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLklzRmFsbGluZyA9IGZhbHNlICYmIGxhc3RUaW1lKjIgPiB0aGlzLlRpbWUtTGF5YS50aW1lci5jdXJyVGltZXIpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLkp1bXBEb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYXRlID0gKDEtbGFzdFRpbWUvIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgU3RlcFBzOkxheWEuVmVjdG9yMyA9IHRoaXMucGxheWVyLkN1clN0ZXAuUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgU3RlcFBzLnkgKz1Db250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJwczpMYXlhLlZlY3RvcjMgPSB0aGlzLnBsYXllci5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBjdXJwcy55ICs9Q29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UHMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHMueCA9IChTdGVwUHMueCAtIGN1cnBzLngpKnJhdGUrIGN1cnBzLng7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHMueSA9IChTdGVwUHMueSAtIGN1cnBzLnkpKnJhdGUrY3VycHMueTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdQcy56ID0gKFN0ZXBQcy56IC0gY3VycHMueikqcmF0ZStjdXJwcy56O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuUG9zaXRpb24gPSBuZXdQcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/njqnlrrbpo57ooYxcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJGbHkgZXh0ZW5kcyBCYXNlUGxheWVyQ3RybGVyXHJcbiAgICB7XHJcbiAgICAgICAgU3BlZWQ6bnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueOqeWutlxyXG4gICAgICAgICAqIEBwYXJhbSBwbGF5ZXIg5pON5o6n6KeS6ImyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjpQbGF5ZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5TZXRQbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgcGxheWVyLlRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCwwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy9cclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjpudW1iZXI7ICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLnBsYXllciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy92YXIgdmVjdG9yID0gbmV3IExheWEuVmVjdG9yMygwLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsLTEqQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlLzIpO1xyXG4gICAgICAgICAgIC8vIExheWEuVmVjdG9yMy5zY2FsZSh2ZWN0b3IsdGhpcy5TcGVlZCx2ZWN0b3IpO1xyXG4gICAgICAgICAgIHZhciB2ZWN0b3I6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygwLDAuMTQ2LC0wLjEwMzk0KVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5UcmFuc2xhdGUodmVjdG9yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vTW91bnRMaW5lXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi9HYW1lU3RydWN0XCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG50eXBlIFN0ZXBJdGVtID0gSXRlbS5TdGVwSXRlbTtcclxudHlwZSBNTG9jYXRpb24gPSBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuLy/mraVcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlcCBleHRlbmRzIExheWEuU3ByaXRlM0Rcclxue1xyXG4gICAgLy/mqKHlnovkuKrmlbBcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RlcE1vZGVsTnVtOm51bWJlciA9IDM7XHJcblxyXG4gICAgTGVmdFBhcmVudDpTdGVwO1xyXG4gICAgUmlnaHRQYXJlbnQ6U3RlcDtcclxuICAgIExlZnRDaGlsZDpTdGVwO1xyXG4gICAgUmlnaHRDaGlsZDpTdGVwO1xyXG4gICAgU3RlcEl0ZW06U3RlcEl0ZW07XHJcbiAgICBSb2FkTnVtOm51bWJlcjtcclxuICAgIE1hcms6YW55O1xyXG4gICAgRmxvb3I6TW91bnRMaW5lO1xyXG4gICAgSWR4Om51bWJlcjtcclxuICAgIFxyXG4gICAgLy/lhazmnInmjqXlj6NcclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IExvY2F0aW9uKCk6TUxvY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHYW1lU3RydWN0Lk1Mb2NhdGlvbih0aGlzLklkeC0xLHRoaXMuRmxvb3IuRmxvb3JOdW0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRGVhZFJvYWQoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0lzRGVhZFJvYWR8fCF0aGlzLmFjdGl2ZXx8IHRoaXMuU3RlcEl0ZW0uSXNEaWZmaWN1bHR5O1xyXG4gICAgfVxyXG4gICAgc2V0IElzRGVhZFJvYWQodmFsdWU6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNGb3JiaWRlbigpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TdGVwSXRlbS5Jc0ZvcmJpZGVuO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRW1wdHkoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICEodGhpcy5hY3RpdmUmJnRoaXMuRmxvb3IuYWN0aXZlKTtcclxuICAgIH1cclxuICAgIFB1dEl0ZW0oIGl0ZW1FbnVtZTpJdGVtLkl0ZW1UeXBlIClcclxuICAgIHtcclxuICAgICAgICBpZihpdGVtRW51bWUgPT0gSXRlbS5JdGVtVHlwZS5FbXB0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID1mYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUHV0SXRlbShpdGVtRW51bWUpO1xyXG4gICAgfVxyXG5cclxuICAgIFJlc2V0U3RlcChuZXdQczpMYXlhLlZlY3RvcjMsaWdub3JlQWN0aXZlOmJvb2xlYW4gPSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBvc2l0aW9uID0gbmV3UHM7XHJcbiAgICAgICAgaWYoIWlnbm9yZUFjdGl2ZSlcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHZhciBtb2RlbFBzID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5QdXRJdGVtKEl0ZW0uSXRlbVR5cGUuTm9uZSk7XHJcblxyXG4gICAgICAgIHRoaXMuTGVmdFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9hZE51bSA9IDA7XHJcbiAgICB9XHJcbiAgICBfU3RlcE1vZGVsOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBjb25zdHJ1Y3RvcihmbG9vcjpNb3VudExpbmUsaWR4Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICAvL3N1cGVyKG5ldyBMYXlhLkJveE1lc2goMSwxLDEpICk7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzKTtcclxuICAgICAgICBpZih0aGlzLklkeCAhPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSsgTWF0aC5yYW5kb20oKSpTdGVwLnN0ZXBNb2RlbE51bSk7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMFwiK0lkeClcclxuICAgICAgICAgICAgdmFyIG1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL21vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKCBMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuNSwgMC41LCAwLjUpKSA7Ly9sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjbG9uZU1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICBjbG9uZU1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGNsb25lTW9kZWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtRmFjdG9yeShJdGVtLkl0ZW1UeXBlLk5vbmUsdGhpcyk7O1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgIHRoaXMuSWR4ID0gaWR4O1xyXG5cclxuICAgICAgICB0aGlzLkxlZnRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0Q2hpbGQgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb2FkTnVtID0gMDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX0lzRGVhZFJvYWQ6Ym9vbGVhbjtcclxuXHJcbn0iLCIvKipcclxuICog5L2c6ICFOk1vXHJcbiAqIOWQr+WKqOWcuuaZr1xyXG4gKi9cclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IExvYWRTY2VuZSBmcm9tIFwiLi9TY2VuZS9Mb2FkU2NlbmVcIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5pbXBvcnQgQVBQIGZyb20gXCIuL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi9VdGlsaXR5L1BhdGhcIlxyXG5jbGFzcyBHYW1lXHJcbntcclxuXHRfRnJhbWU6RnJhbWVXb3JrO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzcyA9IEFQUDtcclxuICAgICAgICBMYXlhM0QuaW5pdCgwLDAsdHJ1ZSk7XHJcbiAgICAgICAgR2FtZUNvbmZpZy5pbml0KCk7XHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRklYRURfV0lEVEg7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gTGF5YS5TdGFnZS5TQ1JFRU5fVkVSVElDQUw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBMYXlhLlN0YWdlLkFMSUdOX0JPVFRPTTtcclxuICAgICAgICAvL+W8gOWQr+e7n+iuoeS/oeaBr1xyXG5cdFx0TGF5YS5TdGF0LnNob3coKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciByZXNDb2wgPSBbe3VybDpcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOlwidWkvUmVzb3VyY2UvbG9jYWxjb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU31dO1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQocmVzQ29sLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkZWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0ZyYW1lID0gRnJhbWVXb3JrLkZNO1xyXG4gICAgICAgIHRoaXMuX0ZyYW1lLkFkZE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB2YXIgc2NlbmVNZ3I6U2NlbmVNYW5hZ2VyID0gdGhpcy5fRnJhbWUuQWRkTWFuYWdlcjxTY2VuZU1hbmFnZXI+KFNjZW5lTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5fRnJhbWUuQWRkTWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcblx0XHRzY2VuZU1nci5DaGFuZ2VTY2VuZShuZXcgTG9hZFNjZW5lKCkpO1xyXG4gICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKDEsdGhpcyx0aGlzLlVwZGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRnJhbWUuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxudmFyIEdNID0gbmV3IEdhbWUoKTtcclxuIiwiaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vU2NlbmVcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHsgUGxheWVyQnVmZiB9IGZyb20gXCIuLy4uL0dhbWUvQnVmZlwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEdhbWVTY2VuZVBsYXkgZnJvbSBcIi4vU2NlbmVQbGF5L0dhbWVTY2VuZVBsYXlcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVEaXJlY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvciB7XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVQbGF5KCk6R2FtZVNjZW5lUGxheVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clN0YXRlIGFzIEdhbWVTY2VuZVBsYXk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZExpc3QyRCA9IFtwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVcIikscGF0aC5HZXREZXBhdGhVSUpTKFwiRW5kR2FtZVwiKV07XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VTdGF0ZShuZXcgU2NlbmUuTG9hZFNjZW5lTG9naWMobG9hZExpc3QyRCxudWxsLG5ldyBHYW1lU2NlbmVQbGF5KCkpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiLypcclxu5L2c6ICFOk1vXHJcbui3s+Wxsee+iuWcuuaZr+aguOW/g+WKn+iDvVxyXG4qL1xyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW50ZXJHYW1lVUlcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7SW5wdXR9IGZyb20gXCIuLy4uL0dhbWUvSW5wdXRcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi8uLi91aS9HYW1lVUlcIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuLy4uL0dhbWUvTW91bnRMaW5lXCJcclxuaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vLi4vR2FtZS9TdGVwXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiO1xyXG50eXBlIEl0ZW1MYXlvdXQgPSBJdGVtLkl0ZW1MYXlvdXQ7XHJcbnR5cGUgTGluZUl0ZW1JbmZvID0gSXRlbS5MaW5lSXRlbUluZm87XHJcbnZhciBJdGVtVHlwZSA9IEl0ZW0uSXRlbVR5cGU7XHJcbi8v5ri45oiP5Zy65pmvXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVxyXG57XHJcbiAgICBNb2RlbExvYWQ6Ym9vbGVhbjtcclxuICAgIEdhbWVEaXI6R2FtZURpcmVjdG9yO1xyXG4gICAgcHJvdGVjdGVkIEdlbkRpcmVjdG9yKCk6R2FtZURpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHYW1lRGlyZWN0b3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1NjZW5lT2JqID0gbmV3IExheWEuU2NlbmUzRDtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsImltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLi9jb250cm9sZXIvQVBQXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWlkZXJNYW5hZ2VyIFxyXG57XHJcbi8v5a+55aSW5o6l5Y+jXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTWdyOkd1aWRlck1hbmFnZXI7XHJcbiAgICBzdGF0aWMgZ2V0IE1ncigpOkd1aWRlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZihHdWlkZXJNYW5hZ2VyLl9NZ3IgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEd1aWRlck1hbmFnZXIuX01nciA9IG5ldyBHdWlkZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHdWlkZXJNYW5hZ2VyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBTY2VuZU1ncjpTY2VuZU1hbmFnZXI7XHJcbiAgICBDdXJTY2VuZTpHdWlkZXJTY2VuZTtcclxuICAgIHB1YmxpYyBnZXQgR2FtZURpcigpOkd1aWRlckRpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ3VyU2NlbmUuR3VpZERpcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR3VpZGVyU2NlbmUoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkNoYW5nZVNjZW5lKG5ld0dhbWVTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG5ld0dhbWVTY2VuZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJTY2VuZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVxyXG57XHJcbiAgICBHdWlkRGlyOkd1aWRlckRpcmVjdG9yO1xyXG4gICAgQ3VyRGlyOkJhc2VEaXJlY3RvcjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICB2YXIgRGlyZWN0b3I6U2NlbmUuQmFzZURpcmVjdG9yID0gbmV3IEd1aWRlckRpcmVjdG9yKCk7XHJcbiAgICAgICAgcmV0dXJuIERpcmVjdG9yO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJEaXJlY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxvYWQyRExpc3QgPSBbe3VybDpwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSAsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKSx0eXBlOiBMYXlhLkxvYWRlci5BVExBUyB9XTtcclxuICAgICAgICB0aGlzLkNoYW5nZUdhbWVQbGF5KG5ldyBTY2VuZS5Mb2FkU2NlbmVMb2dpYyhsb2FkMkRMaXN0LG51bGwsbmV3IEd1aWRlclNjZW5lUGxheSgpKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIEVuZCgpOnZvaWRcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlclNjZW5lUGxheSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllXHJcbntcclxuICAgIFVJOkVudGVyR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9ICAgIFxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJID0gQVBQLlVJTWFuYWdlci5TaG93PEVudGVyR2FtZVVJPihFbnRlckdhbWVVSSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi8uLi91aS9sYXlhTWF4VUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IExvYWRpbmdVSSBmcm9tIFwiLi8uLi91aS9VbkRvd25sb2FkL0xvYWRpbmdVSVwiXHJcbmltcG9ydCBGTVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuL0d1aWRlck1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQkcgZnJvbSBcIi4vLi4vdWkvQkdcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZFNjZW5lIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IExvYWREaXJjdG9yKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuY2xhc3MgTG9hZERpcmN0b3IgZXh0ZW5kcyBTY2VuZS5CYXNlRGlyZWN0b3Jcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZExpc3QyRCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6XCJ1aS9SZXNvdXJjZS9sb2NhbGNvbXAuYXRsYXNcIix0eXBlOkxheWEuTG9hZGVyLkFUTEFTfV07XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VHYW1lUGxheSggbmV3IFNjZW5lLkxvYWRTY2VuZUxvZ2ljKGxvYWRMaXN0MkQsbnVsbCxuZXcgTG9hZFNjZW5lUGxheWUoKSkgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgUmVTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgIH1cclxufVxyXG5cclxuLy/liqDovb3lnLrmma/pgLvovpFcclxuY2xhc3MgTG9hZFNjZW5lUGxheWUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVQbGF5ZVxyXG57XHJcbiAgICBwcml2YXRlIG1fQ291bnQyRExvYWQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50M0RMb2FkOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Mb2FkRmFpbGU6Ym9vbGVhbjtcclxuICAgIHByaXZhdGUgbV9Db3VudFZhbHVlOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Mb2FkaW5nVUk6TG9hZGluZ1VJO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV9Db3VudFZhbHVlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFN0YXJ0TG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UyREFyciA9IFtcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEubG9hZGVyLm9uY2UoTGF5YS5FdmVudC5FUlJPUix0aGlzLHRoaXMub25FcnJvcik7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5vbkNvbXBsZXRlKTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UzREFyciA9IFsgXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJjMDAxX2NoaWxkXzAxXCIpICxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wMlwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wNFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wMlwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fZmx5ZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX3NoaWVsZF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fdW50b3VjaGFibGVfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX2Nob21wZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX2VudGFuZ2xlXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fYWJzb3JkXzAxXCIpLFxyXG4gICAgICAgIF1cclxuICAgICAgICB0aGlzLkxvYWQocmVzb3VyY2UyREFycixyZXNvdXJjZTNEQXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIExvYWQoYXJyMkQ6QXJyYXk8YW55PiA9IG51bGwsYXJyM0Q6QXJyYXk8YW55Pj1udWxsKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGFycjJEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIubG9hZChhcnIyRCxudWxsLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uMkRQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudFZhbHVlIC09MC41O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhcnIzRCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmNyZWF0ZShhcnIzRCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsbnVsbCksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub24zRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgLT0wLjU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb24zRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLm1fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPXZhbHVlLzI7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5WYWx1ZSA9ICh0aGlzLm1fQ291bnQyRExvYWQgKyB0aGlzLm1fQ291bnQzRExvYWQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbjJEUHJvZ3Jlc3ModmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMubV9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9dmFsdWUvMjtcclxuICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLlZhbHVlID0gKHRoaXMubV9Db3VudDJETG9hZCArIHRoaXMubV9Db3VudDNETG9hZCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uRXJyb3Ioc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiTG9hZEVycm9yOlwiK3N0cik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ29tcGxldGUoZGF0YSlcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLm1fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoaURpciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuUmVsb2FkKGZ1bmN0aW9uKCk6dm9pZHt0aGlEaXIuTG9hZCgpfSApO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkJHID0gbmV3IEJHKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuQ29tcGxldGUoKCk9PntHdWlkZXJNYW5hZ2VyLk1nci5FbnRlclNjZW5lKCl9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8TG9hZGluZ1VJPihMb2FkaW5nVUkpO1xyXG4gICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9IDAuNTtcclxuICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAxO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlN0YXJ0TG9hZCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRDb21wbGV0ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgIH1cclxufVxyXG4vKlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkU2NlbmUgZXh0ZW5kcyBCYXNlU2NlbmVcclxue1xyXG4gICAgQ3VyRGlyOkJhc2VEaXJlY3RvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfR2VuRGlyKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyRGlyID0gbmV3IExvYWREaXJjdG9yKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFN0YXJ0TG9hZCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgcmVzQ29sID0gW3t1cmw6XCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpcInVpL1Jlc291cmNlL2xvY2FsY29tcC5hdGxhc1wiLHR5cGU6TGF5YS5Mb2FkZXIuQVRMQVN9XTtcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHJlc0NvbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fTG9hZENvbXBsZXRlKSk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4qL1xyXG4vKlxyXG5jbGFzcyBMb2FkRGlyY3RvciBleHRlbmRzIEJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBVSTpMb2FkaW5nVUk7XHJcbiAgICBcclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICB9XHJcblxyXG4gICAgX0NvdW50MkRMb2FkOm51bWJlcjtcclxuICAgIF9Db3VudDNETG9hZDpudW1iZXI7XHJcbiAgICBfTG9hZEZhaWxlOmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9Db3VudDNETG9hZCA9IDAuNTtcclxuICAgICAgICB0aGlzLl9Db3VudDJETG9hZCA9IDAuNTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0KClcclxuICAgIHtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbihMYXlhLkV2ZW50LkVSUk9SLHRoaXMsdGhpcy5fb25FcnJvcik7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub24oTGF5YS5FdmVudC5DT01QTEVURSx0aGlzLHRoaXMuX29uQ29tcGxldGUpO1xyXG4gICAgICAgIHRoaXMuTG9hZCgpO1xyXG4gICAgICAgIHN1cGVyLl9TdGFydCgpO1xyXG4gICAgICAgIHRoaXMuX0xvYWRGYWlsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfU3RhcnRDb21wbGV0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuX1N0YXJ0Q29tcGxldGUoKTtcclxuICAgICAgICB0aGlzLlVJID0gQVBQLlVJTWFuYWdlci5TaG93PExvYWRpbmdVST4oTG9hZGluZ1VJKTtcclxuICAgICAgICB0aGlzLlVJLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIExvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0NvdW50MkRMb2FkID0wO1xyXG4gICAgICAgIHRoaXMuX0NvdW50M0RMb2FkID0wO1xyXG4gICAgICAgIHRoaXMuX0NvdW50VmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX0xvYWRGYWlsZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTJEQXJyID0gW1xyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiU2V0UGFuZWxcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJDaGFyYWN0ZXJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkJHXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJjb21wXCIpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgLy9yZXNvdXJjZTJEQXJyID0gbnVsbDtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBMYXlhLmxvYWRlci5vbihMYXlhLkV2ZW50LkVSUk9SLHRoaXMsdGhpcy5fb25FcnJvcik7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub24oTGF5YS5FdmVudC5DT01QTEVURSx0aGlzLHRoaXMuX29uQ29tcGxldGUpO1xyXG4gICAgICAgIC8vdmFyIHJlc291cmNlM0RBcnIgPSBbXCJDOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvUmVzb3VyY2UvTGF5YVNjZW5lX0wwMV9hdXRfYmFycmllcl8wMi9MYXlhU2NlbmVfTDAxX2F1dF9iYXJyaWVyXzAyL0NvbnZlbnRpb25hbC9MMDFfYXV0X2JhcnJpZXJfMDIubGhcIl07XHJcbiAgICAgICAgdmFyIHJlc291cmNlM0RBcnIgPSBbIFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV9jaGlsZF8wMVwiKSAsXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDRcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2ZseWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfc3RpbmdfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2Fic29yZF8wMVwiKSxcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICBdLy8gXCJDOi9Vc2Vycy9BZG1pbmlzdHJhdG9yL0Rlc2t0b3AvUmVzb3VyY2UvTGF5YVNjZW5lX0wwMV9hdXRfYmFycmllcl8wMi9MYXlhU2NlbmVfTDAxX2F1dF9iYXJyaWVyXzAyL0NvbnZlbnRpb25hbC9MMDFfYXV0X2JhcnJpZXJfMDIubGhcIl07XHJcbiAgICAgICAgdGhpcy5fTG9hZChyZXNvdXJjZTJEQXJyLHJlc291cmNlM0RBcnIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX0xvYWQoYXJyMkQ6QXJyYXk8YW55PiA9IG51bGwsYXJyM0Q6QXJyYXk8YW55Pj1udWxsKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGFycjJEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAvLyBMYXlhLmxvYWRlci5sb2FkKGFycjJELExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9vbkxvYWRlZCksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX29uMkRQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQoYXJyMkQsbnVsbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fb24yRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICB0aGlzLl9Db3VudFZhbHVlKz0wLjU7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50MkRMb2FkID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXJyM0QhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jcmVhdGUoYXJyM0QsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLG51bGwpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9vbjNEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy5fQ291bnRWYWx1ZSs9MC41O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudDNETG9hZCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9vbkVycm9yKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTG9hZEZhaWxlID0gdHJ1ZTtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiTG9hZEVycm9yOlwiK3N0cik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9vbjNEUHJvZ3Jlc3ModmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQ291bnQzRExvYWQgPXZhbHVlLzI7XHJcbiAgICAgICAgdGhpcy5VSS5WYWx1ZSA9ICh0aGlzLl9Db3VudDJETG9hZCArIHRoaXMuX0NvdW50M0RMb2FkKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfb24yRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0NvdW50MkRMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMuVUkuVmFsdWUgPSB0aGlzLl9Db3VudDJETG9hZCArIHRoaXMuX0NvdW50M0RMb2FkO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9vbkNvbXBsZXRlKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoaURpciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuUmVsb2FkKGZ1bmN0aW9uKCk6dm9pZHt0aGlEaXIuTG9hZCgpfSApO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkJHID0gbmV3IEJHKCk7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuQ29tcGxldGUoKCk9PntHdWlkZXJNYW5hZ2VyLk1nci5FbnRlclNjZW5lKCl9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgIHRoaXMuVUkuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn0qLyIsImltcG9ydCB7IEZTTSB9IGZyb20gXCIuLy4uL0Jhc2UvRlNNXCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcbmV4cG9ydCBtb2R1bGUgU2NlbmUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFNjZW5lRlNNIGV4dGVuZHMgRlNNLkZTTTxCYXNlU2NlbmU+XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Zy65pmv5Luj55CGXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNjZW5lIGV4dGVuZHMgRlNNLlN0YXRlIHtcclxuICAgICAgICBwcml2YXRlIF9TdGFydEdhbWVUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDbG9jazogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbV9TY2VuZU9iajogTGF5YS5TY2VuZTNEO1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0RpcmVjdG9yOiBCYXNlRGlyZWN0b3I7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU2NlbmVPYmooKTogTGF5YS5TY2VuZTNEIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9TY2VuZU9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBEaXJlY3RvcigpOiBCYXNlRGlyZWN0b3Ige1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0RpcmVjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IEdlbkRpcmVjdG9yKCk6IEJhc2VEaXJlY3RvcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2UgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1dE9iaihzcHJpdGUzRDogTGF5YS5TcHJpdGUzRCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX1NjZW5lT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fU2NlbmVPYmouYWRkQ2hpbGQoc3ByaXRlM0QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCYXNlU2NlbmUgUHV0T2JqIEVycm9yOmVtcHR5IFNwcml0ZTNEXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaXJlY3RvciA9IHRoaXMuR2VuRGlyZWN0b3IoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yLlN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW5kKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TY2VuZU9iai5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5TY2VuZU9iai5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RvciA9IHRoaXMuU2NlbmVPYmouZ2V0Q2hpbGRBdCgwKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5EaXJlY3Rvci5FbmQoKTtcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9EaXJlY3RvcilcclxuICAgICAgICAgICAgICAgIHRoaXMubV9EaXJlY3Rvci5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRGlyZWN0b3IgZXh0ZW5kcyBGU00uRlNNPEJhc2VTY2VuZVBsYXllPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0R2FtZVRpbWU6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENsb2NrOiBudW1iZXI7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcblxyXG4gICAgICAgIC8v56eB5pyJ5bGe5oCn5ZKM5Yqf6IO9XHJcbiAgICAgICAgZ2V0IEdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9UaW1lVXBDbG9jayAtIHRoaXMuX1N0YXJ0R2FtZVRpbWUgLSB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBMYXlhLnRpbWVyLmN1cnJUaW1lciAtIHRoaXMuX1N0YXJ0R2FtZVRpbWUgLSB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgR2FtZVRpbWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBDdXJHYW1lVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fU3RhcnRHYW1lVGltZSArIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2UgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFJlU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnRUaW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnRUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgU3RhcnQoKTogdm9pZCA7XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBFbmQoKTogdm9pZDtcclxuXHJcbiAgICAgICAgcHVibGljIFRpbWVVcCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RpbWVVcENsb2NrIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIC8vQVBQLk1lc3NhZ2VDZW50ZXIuVHJpZ2dlcihHYW1lRXZlbnQuR2FtZVRpbWVVcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGltZVVwQ2xvY2sgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBDb250aW51ZVRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vQVBQLk1lc3NhZ2VDZW50ZXIuVHJpZ2dlcihHYW1lRXZlbnQuR2FtZUNvbnRpbnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgKz0gTGF5YS50aW1lci5jdXJyVGltZXIgLSB0aGlzLl9UaW1lVXBDbG9jaztcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5YiH5o2i5Ymn5pysXHJcbiAgICAgICAgICogQHBhcmFtIG5ld1NjZW5lUGxheSDmlrDliafmnKxcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgQ2hhbmdlR2FtZVBsYXkoIG5ld1NjZW5lUGxheTpCYXNlU2NlbmVQbGF5ZSApOiB2b2lkICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlU3RhdGUobmV3U2NlbmVQbGF5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTY2VuZVBsYXllIGV4dGVuZHMgRlNNLlN0YXRlIHtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRTY2VuZUxvZ2ljIGV4dGVuZHMgQmFzZVNjZW5lUGxheWUge1xyXG4gICAgICAgIHByaXZhdGUgbV9Mb2FkMkRMaXN0OiBhbnlbXTtcclxuICAgICAgICBwcml2YXRlIG1fTG9hZDNETGlzdDogYW55W107XHJcbiAgICAgICAgcHJpdmF0ZSBtX05leHRTY2VuZTogU2NlbmUuQmFzZVNjZW5lUGxheWU7XHJcbiAgICAgICAgcHVibGljIGdldCBPd25lckRpcmVjdG9yKCk6IEJhc2VEaXJlY3RvciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fb3duZXIgYXMgQmFzZURpcmVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gbG9hZDJETGlzdCAyROWKoOi9veWIl+ihqFxyXG4gICAgICAgICAqIEBwYXJhbSBsb2FkM0RMaXN0IDNE5Yqg6L295YiX6KGoXHJcbiAgICAgICAgICogQHBhcmFtIG5leHRTY2VuZSDkuIvkuIDmoLzlnLrmma9cclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3Rvcihsb2FkMkRMaXN0OiBhbnlbXSwgbG9hZDNETGlzdDogYW55W10sIG5leHRTY2VuZTogU2NlbmUuQmFzZVNjZW5lUGxheWUpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWQyRExpc3QgPSBsb2FkMkRMaXN0O1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZDNETGlzdCA9IGxvYWQzRExpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubV9OZXh0U2NlbmUgPSBuZXh0U2NlbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmQoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0KCkge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsIHRoaXMsIHRoaXMuTG9hZENvbXBsZXRlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9Mb2FkMkRMaXN0KVxyXG4gICAgICAgICAgICAgICAgTGF5YS5sb2FkZXIubG9hZCh0aGlzLm1fTG9hZDJETGlzdCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fTG9hZDNETGlzdClcclxuICAgICAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQodGhpcy5tX0xvYWQzRExpc3QsIG51bGwsIG51bGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMb2FkQ29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuT3duZXJEaXJlY3Rvci5DaGFuZ2VTdGF0ZSh0aGlzLm1fTmV4dFNjZW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi8uLi8uLi9TY2VuZS9TY2VuZVwiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vLi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi8uLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vLi4vLi4vdWkvRW5kR2FtZVVJXCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgR2FtZUNhbWVyYSBmcm9tIFwiLi8uLi8uLi9HYW1lL0dhbWVDYW1lcmFcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLy4uLy4uL0dhbWUvUGxheWVyXCJcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi8uLi8uLi9HYW1lL0lucHV0XCJcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuLy4uLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4vLi4vLi4vdWkvR2FtZVVJXCJcclxuaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi8uLi8uLi9HYW1lL01vdW50TGluZVwiXHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi8uLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vLi4vLi4vR2FtZS9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBCR1VJIGZyb20gXCIuLy4uLy4uL3VpL0JHXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgR2FtZVNjZW5lIGZyb20gXCIuLi9HYW1lU2NlbmVcIjtcclxuXHJcbnR5cGUgSXRlbUxheW91dCA9IEl0ZW0uSXRlbUxheW91dDtcclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuXHJcbi8v5ri45oiP5a+85ryUXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZVBsYXkgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVQbGF5ZSB7XHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBfSGVhZEZsb29ySWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9UYWlsRkxvb3JJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0NvdW50VGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQm9vdG9tRmxvb3I6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX1N0YXJ0UG9zaXRpb246IExheWEuVmVjdG9yMztcclxuICAgIHByaXZhdGUgX0dhbWVVcGRhdGU6ICgpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9QYW5lbFVJOiBHYW1lVUk7XHJcbiAgICBwcml2YXRlIF9Hb2xkTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Mb2dpY0dvbGROdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0N1ckJHOiBCR1VJO1xyXG4gICAgcHJpdmF0ZSBfU2FmZUxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuXHJcbiAgICBDYW1lcmE6IEdhbWVDYW1lcmE7XHJcbiAgICBHYW1lU2NlbmU6IEJhc2VTY2VuZTtcclxuICAgIE1vdW50TGluZXM6IE1vdW50TGluZVtdO1xyXG4gICAgUGxheWVyOiBQbGF5ZXI7XHJcbiAgICBJbnB1dEN0cmw6IElucHV0LkJhc2VHYW1lSW5wdXQ7XHJcbiAgICBJdGVtTGF5b3V0OiBJdGVtTGF5b3V0O1xyXG4gICAgQ3VyTGluZVJld2FyZHM6IEFycmF5PExpbmVJdGVtSW5mbz47XHJcbiAgICBDdXJMaW5lQmFycmllcnM6IEFycmF5PExpbmVJdGVtSW5mbz47XHJcbiAgICBuYW1lOiBudW1iZXI7XHJcbiAgICBGcmVzaEJHQ291bnQ6IG51bWJlcjtcclxuXHJcbiAgICBnZXQgU2FmZUxvY2F0aW9uKCk6IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NhZmVMb2NhdGlvbjtcclxuICAgIH1cclxuICAgIGdldCBQYW5lbFVJKCk6IEdhbWVVSSAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9QYW5lbFVJO1xyXG4gICAgfVxyXG4gICAgc2V0IFBhbmVsVUkodmFsdWU6IEdhbWVVSSkgIHtcclxuICAgICAgICB2YWx1ZS5TZXRMZWZ0VG91Y2godGhpcywgKCkgPT4geyB0aGlzLklucHV0Q3RybC5JbnB1dChmYWxzZSk7IH0pXHJcbiAgICAgICAgdmFsdWUuU2V0UmlnaHRUb3VjaCh0aGlzLCAoKSA9PiB7IHRoaXMuSW5wdXRDdHJsLklucHV0KHRydWUpOyB9KTtcclxuICAgICAgICB0aGlzLl9QYW5lbFVJID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXQgSGVhZEZsb29yKCk6IE1vdW50TGluZSAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbdGhpcy5fSGVhZEZsb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBUYWlsRkxvb3IoKTogTW91bnRMaW5lICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTW91bnRMaW5lc1t0aGlzLl9UYWlsRkxvb3JJZHhdO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gbnVsbDtcclxuICAgICAgICB0aGlzLkdhbWVTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Nb3VudExpbmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuSXRlbUxheW91dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9IZWFkRmxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMuX1RhaWxGTG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9Cb290b21GbG9vciA9IDA7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLl9QYW5lbFVJID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9DdXJCRyA9IEFQUC5TY2VuZU1hbmFnZXIuQkcgYXMgQkdVSTtcclxuICAgICAgICB0aGlzLkZyZXNoQkdDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkSW5wdXRDdHJsZXIodmFsdWU6IElucHV0LkJhc2VHYW1lSW5wdXQpICB7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwuQ2xlYXIoKTtcclxuICAgICAgICB2YWx1ZS5OZXh0SW5wdXQgPSB0aGlzLklucHV0Q3RybDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgUG9wSW5wdXRDdHJsZXIoKSAge1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdGhpcy5JbnB1dEN0cmwuTmV4dElucHV0O1xyXG4gICAgfVxyXG4gICAgQWRkR29sZChudW06IG51bWJlcikgIHtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtICs9IG51bTtcclxuICAgICAgICB0aGlzLkFkZExvZ2ljR29sZChudW0pO1xyXG4gICAgfVxyXG4gICAgQWRkR29sZFVuTG9naWNHb2xkKG51bTogbnVtYmVyKSAge1xyXG4gICAgICAgIHRoaXMuX0dvbGROdW0gKz0gbnVtO1xyXG4gICAgfVxyXG4gICAgQWRkTG9naWNHb2xkKG51bTogbnVtYmVyKSAge1xyXG5cclxuICAgICAgICB0aGlzLl9Mb2dpY0dvbGROdW0gKz0gbnVtO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5Hb2xkID0gdGhpcy5fTG9naWNHb2xkTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5a6J5YWo5L2N572uXHJcbiAgICBTZXRTYWZlUFMobG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKSAge1xyXG4gICAgICAgIHRoaXMuX1NhZmVMb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgICAgIGlmIChsb2NhdGlvbi5ZIDwgdGhpcy5UYWlsRkxvb3IuRmxvb3JOdW0gfHwgbG9jYXRpb24uWSA+IHRoaXMuSGVhZEZsb29yLkZsb29yTnVtKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVzZXRJdGVtKGxvY2F0aW9uLlkpXHJcbiAgICB9XHJcblxyXG4gICAgLy/ku47mn5DkuIDlsYLlvIDlp4vkuIDlsYLlsYLph43mlrDmkYbmlL7pgZPlhbdcclxuICAgIFJlc2V0SXRlbShmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICBmb3IgKGxldCBsb29wRmxvb3I6IG51bWJlciA9IGZsb29yOyBsb29wRmxvb3IgPD0gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW07ICsrbG9vcEZsb29yKSAge1xyXG4gICAgICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9vcEZsb29yKTtcclxuICAgICAgICAgICAgZmxvb3JMaW5lLkxheU91dERpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZsb29yTGluZS5TZXRMaW5lKGZsb29yTGluZS5GbG9vck51bSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1B1dEl0ZW1JbkxpbmUobG9vcEZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/muIXnkIblsYLpgZPlhbdcclxuICAgIENsZWFyRmxvb3Ioc3RlcDogU3RlcCk6IHZvaWQgIHtcclxuICAgICAgICB2YXIgc3RlcEl0ZW0gPSBzdGVwLlN0ZXBJdGVtO1xyXG4gICAgICAgIHN0ZXAuUHV0SXRlbShJdGVtVHlwZS5Ob25lKTtcclxuICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBEZWF0aCgpOiB2b2lkICB7XHJcbiAgICAgICAgdmFyIHVpOiBFbmRHYW1lVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8RW5kR2FtZVVJPihFbmRHYW1lVUkpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlBsYXllckRlYXRoID0gdHJ1ZTtcclxuICAgICAgICAvL3VpLlNldEdhbWVJbmZvKHRoaXMuUGxheWVyRGlzdGFuY2UsdGhpcy5fR29sZE51bSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIEVuZCgpOnZvaWRcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICAvL+mHjeaWsOW8gOWni1xyXG4gICAgUmVTdGFydCgpOiB2b2lkICB7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUoKTtcclxuICAgIH1cclxuICAgIFNob3dJbnB1dEluZm8oaW5mbzogc3RyaW5nKTogdm9pZCAge1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgfVxyXG4gICAgLy/lt6blj7Pnp7vliqhcclxuICAgIE1vdmVTdGVwKGlzUmlnaHQ6IGJvb2xlYW4pICB7XHJcbiAgICAgICAgLy92YXIgYnVmZiA9IHRoaXMuQnVmZmVyO1xyXG4gICAgICAgIC8v6I635Y+W5LiL5LiA5bGC55qEU3RlcFxyXG4gICAgICAgIHZhciBzdGVwOiBTdGVwID0gdGhpcy5QbGF5ZXIuQ3VyU3RlcDtcclxuICAgICAgICBpZiAoc3RlcCA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1JpZ2h0KSAge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICB9IGVsc2UgIHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGVwID09IG51bGwgfHwgc3RlcC5TdGVwSXRlbS5Jc0ZvcmJpZGVuKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5bGC5pWw6I635Y+W5p+Q5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIEdldEZsb29yQnlGbG9vcihmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgIHZhciB0YWlsRmxvb3I6IE1vdW50TGluZSA9IHRoaXMuVGFpbEZMb29yO1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRhaWxGbG9vci5GbG9vck51bSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vcklEID0gKGZsb29yIC0gdGFpbEZsb29yLkZsb29yTnVtICsgdGhpcy5fVGFpbEZMb29ySWR4KSAlIHRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTW91bnRMaW5lc1tmbG9vcklEXTtcclxuICAgIH1cclxuXHJcbiAgICBMb29wRG9GbG9vclN0ZXAoZmxvb3I6IG51bWJlciwgT3duZXI6IGFueSwgY2FsbEJhY2s6IChzdGVwOiBTdGVwKSA9PiB2b2lkKTogdm9pZCAge1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtIHx8IGZsb29yID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yTGluZTogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGZsb29yTGluZS5Mb2dpY0xlbmd0aDsgKytpZHgpICB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwID0gZmxvb3JMaW5lLkdldFN0ZXAoaWR4KTtcclxuICAgICAgICAgICAgY2FsbEJhY2suY2FsbChPd25lciwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H5Z2Q5qCH6I635Y+W5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0gbG9jYXRpb24g57Si5byVLOWxguaVsFxyXG4gICAgICovXHJcbiAgICBHZXRTdGVwQnlMb2NhdGlvbihsb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb24pOiBTdGVwICB7XHJcbiAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb2NhdGlvbi5ZKS5HZXRTdGVwKGxvY2F0aW9uLlgpO1xyXG4gICAgICAgIHJldHVybiBnZXRTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBQbGF5ZXJGbG9vcigpOiBudW1iZXIgIHtcclxuICAgICAgICB2YXIgZmxvb3I6IG51bWJlciA9IHRoaXMuX1N0YXJ0UG9zaXRpb24ueiAtIHRoaXMuUGxheWVyLkxvZ2ljUG9zaXRpb24uejtcclxuICAgICAgICBmbG9vciA9IE1hdGgucm91bmQoZmxvb3IgLyAoQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlIC8gMikpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhmbG9vcik7XHJcbiAgICB9XHJcbiAgICBnZXQgUGxheWVyRmxvb3JMaW5lKCk6IE1vdW50TGluZSAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLlBsYXllckZsb29yKTtcclxuICAgIH1cclxuICAgIGdldCBHYW1lVGltZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5tX293bmVyIGFzIEdhbWVEaXJlY3RvcikuR2FtZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvL+WIm+W7uuebuOWFs+aUvui/mSDov5nph4zph43mlrDlvIDlp4vkuI3kvJrotbBcclxuICAgIHB1YmxpYyBTdGFydCgpOiB2b2lkICB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBuZXcgR2FtZUNhbWVyYSgpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIgPSBuZXcgTGF5YS5WZWN0b3IzKC0zMCwgMCwgMCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5DYW1lcmEpO1xyXG5cclxuICAgICAgICB0aGlzLk1vdW50TGluZXMgPSBbXTtcclxuICAgICAgICB2YXIgbWF4TGluZU51bSA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLk1heExpbmVOdW07XHJcbiAgICAgICAgZm9yICh2YXIgbGluZUlkeDogbnVtYmVyID0gbWF4TGluZU51bSAtIDE7IGxpbmVJZHggPj0gMDsgLS1saW5lSWR4KSAge1xyXG4gICAgICAgICAgICB2YXIgbmV3TW91bnRMaW5lID0gbmV3IE1vdW50TGluZShsaW5lSWR4LCBsaW5lSWR4KTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoobmV3TW91bnRMaW5lKTtcclxuICAgICAgICAgICAgdGhpcy5Nb3VudExpbmVzW2xpbmVJZHhdID0gbmV3TW91bnRMaW5lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WIm+W7ulVJXHJcblxyXG4gICAgICAgIC8v5Yib5bu6546p5a62XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5QbGF5ZXIpO1xyXG5cclxuICAgICAgICAvL+WHhuWkh+eOqeWutuatu+S6oeS6i+S7tlxyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCwgdGhpcy5EZWF0aCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/ov5vlhaXmuLjmiI/nmoTorr7nva7mlL7ov5nph4wg6YeN5paw5byA5aeL6LWw6L+Z6YeMXHJcbiAgICBwcm90ZWN0ZWQgU3RhcnRHYW1lKCkgIHtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlNjZW5lT2JqLmFtYmllbnRDb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwxLDEpXHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKDAsIDApO1xyXG4gICAgICAgIC8v6YeN572u54mp5ZOBXHJcbiAgICAgICAgdGhpcy5JdGVtTGF5b3V0ID0gbmV3IEl0ZW0uSXRlbUxheW91dCgpXHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHZhciBsaW5lczogTW91bnRMaW5lW10gPSB0aGlzLk1vdW50TGluZXM7XHJcbiAgICAgICAgLy/liJvlu7rovpPlhaXmjqfliLblmahcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG5ldyBJbnB1dC5Ob3JtR2FtZUlucHV0KHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9IGxpbmVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllci5SZXNldCgpO1xyXG4gICAgICAgIGZvciAodmFyIGlkeDogbnVtYmVyID0gMDsgaWR4IDwgbGluZXMubGVuZ3RoOyArK2lkeCkgIHtcclxuICAgICAgICAgICAgdmFyIGxpbmU6IE1vdW50TGluZSA9IHRoaXMuTW91bnRMaW5lc1tpZHhdO1xyXG4gICAgICAgICAgICBsaW5lLlNldExpbmUoaWR4KTtcclxuICAgICAgICAgICAgaWYgKGlkeCA+IDApXHJcbiAgICAgICAgICAgICAgICBsaW5lc1tpZHggLSAxXS5TZXROZXh0Rmxvb3IobGluZSk7XHJcbiAgICAgICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgICAgIHZhciBQbGF5ZXJTdGVwID0gbGluZS5HZXRTdGVwKE1hdGguZmxvb3IobGluZS5Mb2dpY0xlbmd0aCAvIDIpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlNldFN0ZXAoUGxheWVyU3RlcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TYWZlTG9jYXRpb24gPSBQbGF5ZXJTdGVwLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU3RhcnRQb3NpdGlvbiA9IHRoaXMuUGxheWVyLkxvZ2ljUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9QdXRJdGVtSW5MaW5lKGlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FtZXJhLlJlc2V0KG5ldyBMYXlhLlZlY3RvcjMoKSwgbmV3IExheWEuVmVjdG9yMyh0aGlzLlBsYXllci5Qb3NpdGlvbi54LCBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoICogMTAuNSwgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCAqIDkpLCB0aGlzLlBsYXllcik7XHJcbiAgICAgICAgdGhpcy5fR29sZE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy5fTG9naWNHb2xkTnVtID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5QYW5lbFVJID0gQVBQLlVJTWFuYWdlci5TaG93KEdhbWVVSSk7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkdvbGQgPSAwO1xyXG4gICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUgKyA2MDAwO1xyXG4gICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yID0gMDtcclxuICAgICAgICB0aGlzLl9HYW1lVXBkYXRlID0gdGhpcy5fU3RhcnRDb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQgIHtcclxuICAgICAgICBpZiAodGhpcy5fR2FtZVVwZGF0ZSAhPSBudWxsKSAge1xyXG4gICAgICAgICAgICB0aGlzLl9HYW1lVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5q2j5bi46L+Q6KGM5pe255qE5q+P5bin6YC76L6RXHJcbiAgICBwcml2YXRlIF9SdW5HYW1lVXBkYXRlKCkgIHtcclxuICAgICAgICB2YXIgZGlzdDogbnVtYmVyID0gdGhpcy5QbGF5ZXJGbG9vcjtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuRGlzdGFuY2UgPSBNYXRoLmZsb29yKGRpc3QpO1xyXG4gICAgICAgIGlmICh0aGlzLkZyZXNoQkdDb3VudCA+IDEwKSAge1xyXG4gICAgICAgICAgICB0aGlzLl9DdXJCRy5VcGRhdGVQYWdlKGRpc3QpO1xyXG4gICAgICAgICAgICB0aGlzLkZyZXNoQkdDb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICsrdGhpcy5GcmVzaEJHQ291bnQ7XHJcblxyXG4gICAgICAgIHZhciBmbG9vVmVjdG9yOiBMYXlhLlZlY3RvcjMgPSB0aGlzLlRhaWxGTG9vci5Qb3NpdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKGZsb29WZWN0b3IueiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLnogPiAzICogQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlIC8gMikgIHtcclxuICAgICAgICAgICAgdGhpcy5fUHVzaEZMb29yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9Db3VudFRpbWUgPCB0aGlzLkdhbWVUaW1lKSAge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSB0aGlzLkdhbWVUaW1lICsgMzAwMDtcclxuICAgICAgICAgICAgdGhpcy5fRGVzdHJveUxpbmUodGhpcy5fQm9vdG9tRmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLl9Cb290b21GbG9vciArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLklucHV0Q3RybC5VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+W8gOWni+WAkuiuoeaXtuacn+mXtOeahOavj+W4p+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBfU3RhcnRDb3VudCgpICB7XHJcbiAgICAgICAgdmFyIHRpbWU6IHN0cmluZyA9IFwiXCJcclxuICAgICAgICB2YXIgY291bnRUaW1lOiBudW1iZXIgPSB0aGlzLl9Db3VudFRpbWUgLSB0aGlzLkdhbWVUaW1lO1xyXG4gICAgICAgIGlmIChjb3VudFRpbWUgPiAwKVxyXG4gICAgICAgICAgICB0aW1lICs9IE1hdGguZmxvb3IoY291bnRUaW1lIC8gMTAwMCk7XHJcbiAgICAgICAgZWxzZSAge1xyXG4gICAgICAgICAgICB0aGlzLlBhbmVsVUkuR2FtZVBhbmVsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSA9IHRoaXMuX1J1bkdhbWVVcGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUgKyAzMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBhbmVsVUkuU2V0Q291bnRUaW1lKHRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5bGC5ZCR5LiK5Y+gXHJcbiAgICBwcm90ZWN0ZWQgX1B1c2hGTG9vcigpICB7XHJcbiAgICAgICAgdmFyIHByZUhlYWQ6IE1vdW50TGluZSA9IHRoaXMuSGVhZEZsb29yO1xyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9ICh0aGlzLl9IZWFkRmxvb3JJZHggKyAxKSAlIHRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gKHRoaXMuX1RhaWxGTG9vcklkeCArIDEpICUgdGhpcy5Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICB2YXIgSGVhZGZsb29yOiBudW1iZXIgPSBwcmVIZWFkLkZsb29yTnVtICsgMTtcclxuICAgICAgICB0aGlzLkhlYWRGbG9vci5TZXRMaW5lKEhlYWRmbG9vcik7XHJcbiAgICAgICAgcHJlSGVhZC5TZXROZXh0Rmxvb3IodGhpcy5IZWFkRmxvb3IpO1xyXG4gICAgICAgIGNvbnNvbGUudGltZShcIlB1dEl0ZW1cIik7XHJcbiAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShIZWFkZmxvb3IpO1xyXG4gICAgICAgIGNvbnNvbGUudGltZUVuZChcIlB1dEl0ZW1cIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pGG5pS+54mp5ZOBXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3Ig54mp5ZOB5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBfUHV0SXRlbUluTGluZShmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgIHZhciBzYWZlQ29sOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PG51bWJlcj47IH0gPSB7fTtcclxuICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIC8v5biD572u6L+H5LqG5LiN55So5YaN5biD572u5LqGXHJcbiAgICAgICAgaWYgKGZsb29yTGluZS5MYXlPdXREaXJ0eSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZsb29yTGluZS5MYXlPdXREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgLypcclxuICAgICAgICBpZihmbG9vciA+PSB0aGlzLl9TYWZlTG9jYXRpb24uWSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLk1heExpbmVOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzYWZlQ29sID0gdGhpcy5fQ291bnRPcGVuTGlzdChmbG9vcik7XHJcbiAgICAgICAgfWVsc2UqL1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mkYbmlL7liY3lhYjorqHnrpfor6XlsYLpgJrot6/mg4XlhrUgXHJcbiAgICAgICAgICAgIHNhZmVDb2wgPSB7fVxyXG4gICAgICAgICAgICBzYWZlQ29sW1wib1wiXSA9IHRoaXMuX0NvdW50Um9hZEluZm8oZmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WHuueUn+eCueS4jeaUvumBk+WFt1xyXG4gICAgICAgIGlmIChmbG9vciA8IDEgfHwgZmxvb3IgPT0gdGhpcy5TYWZlTG9jYXRpb24uWSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iOt+WPluivpeihjOimgeaRhuaUvueahOeJqeWTgVxyXG4gICAgICAgIHRoaXMuX1Rha2VJdGVtTGlzdChmbG9vcilcclxuXHJcbiAgICAgICAgLy/moIforrDkuIDmnaHnu53lr7nlronlhajnmoTot69cclxuICAgICAgICB2YXIgc2FmZUlkeENvbGw6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyOyB9ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgY29sS2V5IGluIHNhZmVDb2wpICB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gc2FmZUNvbFtjb2xLZXldO1xyXG4gICAgICAgICAgICB2YXIgc2FmZUlkeCA9IGxpc3RbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGlzdC5sZW5ndGgpXTtcclxuICAgICAgICAgICAgaWYgKHNhZmVJZHhDb2xsW3NhZmVJZHhdID09IHVuZGVmaW5lZCkgIHtcclxuICAgICAgICAgICAgICAgIHNhZmVJZHhDb2xsW3NhZmVJZHhdID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aKiumcgOimgeaUvumBk+WFt+eahOagvOWtkOaUvuWFpemaj+acuuaxoFxyXG4gICAgICAgIHZhciBjdXJGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciByYW5kb21Qb29sOiBBcnJheTxTdGVwPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8v5oqK5a6J5YWo55qE5qC85a2Q5pqC5pe256e75Ye65p2lXHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDogQXJyYXk8U3RlcD4gPSBuZXcgQXJyYXk8U3RlcD4oKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4OiBudW1iZXIgPSAwOyBzdGVwSWR4IDwgY3VyRmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkgIHtcclxuICAgICAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSBjdXJGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoc2FmZUlkeENvbGxbc3RlcElkeF0gPT0gdW5kZWZpbmVkKSAge1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKGdldFN0ZXApO1xyXG4gICAgICAgICAgICB9IGVsc2UgIHtcclxuICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGdldFN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pS+6Zm36ZixXHJcbiAgICAgICAgdmFyIGJhcnJpZXJzTGlzdDogQXJyYXk8TGluZUl0ZW1JbmZvPiA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzO1xyXG4gICAgICAgIHRoaXMuX09yZ2luaXplUHV0SXRlbShiYXJyaWVyc0xpc3QsIHJhbmRvbVBvb2wsIHRydWUpO1xyXG5cclxuICAgICAgICAvL+aRhuaUvumBk+WFt1xyXG4gICAgICAgIGZvciAodmFyIHNhZmVTdGVwSWR4OiBudW1iZXIgPSAwOyBzYWZlU3RlcElkeCA8IHNhZmVTdGVwTGlzdC5sZW5ndGg7ICsrc2FmZVN0ZXBJZHgpICB7XHJcbiAgICAgICAgICAgIHJhbmRvbVBvb2wucHVzaChzYWZlU3RlcExpc3Rbc2FmZVN0ZXBJZHhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJld2FyZExpc3QgPSB0aGlzLkN1ckxpbmVSZXdhcmRzO1xyXG4gICAgICAgIHRoaXMuX09yZ2luaXplUHV0SXRlbShyZXdhcmRMaXN0LCByYW5kb21Qb29sKTtcclxuICAgICAgICAvL+WGjeasoeiuoeeul+mAmui3r+aDheWGtSBcclxuICAgICAgICAvL3RoaXMuX0NvdW50TGFzdEZsb29yUm9hZChmbG9vcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TGluZUl0ZW1JbmZvPn0gaXRlbUxpc3Qg54mp5ZOB5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFN0ZXA+fSByYW5kb21Qb29sIOWPsOmYtumbhuWQiFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0RlYWRSb2FkIOaYr+WQpuaYr+atu+i3r1xyXG4gICAgICovXHJcbiAgICBfT3JnaW5pemVQdXRJdGVtKGl0ZW1MaXN0OiBBcnJheTxMaW5lSXRlbUluZm8+LCByYW5kb21Qb29sOiBBcnJheTxTdGVwPiwgaXNEZWFkUm9hZDogYm9vbGVhbiA9IG51bGwpOiB2b2lkICB7XHJcbiAgICAgICAgZm9yICh2YXIgaXRlbUlkeDogbnVtYmVyID0gMDsgaXRlbUlkeCA8IGl0ZW1MaXN0Lmxlbmd0aDsgKytpdGVtSWR4KSAge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzogTGluZUl0ZW1JbmZvID0gaXRlbUxpc3RbaXRlbUlkeF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGRpZmZpY3VsdHlOdW06IG51bWJlciA9IDA7IGRpZmZpY3VsdHlOdW0gPCBpbmZvLk51bWJlcjspICB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tUG9vbC5sZW5ndGggPCAxKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/pmo/mnLrmiorpmpznoo3mlL7lhaXmoLzlrZDph4xcclxuICAgICAgICAgICAgICAgIHZhciByYW5kb21JZHg6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHJhbmRvbVBvb2wubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gcmFuZG9tUG9vbFtyYW5kb21JZHhdO1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tUG9vbC5zcGxpY2UocmFuZG9tSWR4LCAxKTtcclxuICAgICAgICAgICAgICAgIHN0ZXAuUHV0SXRlbShpbmZvLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRGVhZFJvYWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSBpc0RlYWRSb2FkO1xyXG4gICAgICAgICAgICAgICAgLS1pbmZvLk51bWJlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmFuZG9tUG9vbC5sZW5ndGggPCAxKSAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW1JZHggPiAwKSAge1xyXG4gICAgICAgICAgICBpdGVtTGlzdC5zcGxpY2UoMCwgaXRlbUlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICrpgJLlvZLorqHnrpfpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vck51bSDnianlk4HliJfooahcclxuICAgICAqL1xyXG4gICAgX0NvdW50T3Blbkxpc3QoZmxvb3JOdW06IG51bWJlcik6IHsgW2tleTogc3RyaW5nXTogQXJyYXk8bnVtYmVyPjsgfSAge1xyXG4gICAgICAgIGZvciAodmFyIGZsb29yQ291bnQ6IG51bWJlciA9IHRoaXMuUGxheWVyRmxvb3I7IGZsb29yQ291bnQgPD0gZmxvb3JOdW07ICsrZmxvb3JDb3VudCkgIHtcclxuICAgICAgICAgICAgdmFyIGZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vckNvdW50KTtcclxuICAgICAgICAgICAgaWYgKGZsb29yID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGZvciAodmFyIHN0ZXBJZHggPSAwOyBzdGVwSWR4IDwgZmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgICAgIHN0ZXAuTWFyayA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKHRoaXMuUGxheWVyRmxvb3IpO1xyXG4gICAgICAgIGZvciAodmFyIHN0ZXBJZHggPSAwOyBzdGVwSWR4IDwgZmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoIXN0ZXAuSXNEZWFkUm9hZCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX01hcmtTdGVwcyhzdGVwLCBzdGVwSWR4LCBmbG9vck51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRhcmdldEZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSk7XHJcbiAgICAgICAgLy/mib7lh7rooqvmoIforrDnmoTngrnlubbmlbTnkIbmiJDpm4blkIhcclxuICAgICAgICB2YXIgY29sbGVjdGlvbjogeyBba2V5OiBzdHJpbmddOiBBcnJheTxudW1iZXI+OyB9ID0ge31cclxuICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gXCJvXCJcclxuICAgICAgICBmb3IgKHZhciBvcGVuSWR4OiBudW1iZXIgPSAwOyBvcGVuSWR4IDwgdGFyZ2V0Rmxvb3IuTG9naWNMZW5ndGg7ICsrb3BlbklkeCkgIHtcclxuICAgICAgICAgICAgdmFyIG1hcmtlZFN0ZXA6IFN0ZXAgPSB0YXJnZXRGbG9vci5HZXRTdGVwKG9wZW5JZHgpO1xyXG4gICAgICAgICAgICBpZiAobWFya2VkU3RlcC5NYXJrICE9IHVuZGVmaW5lZCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBOYW1lOiBzdHJpbmcgPSBuYW1lICsgbWFya2VkU3RlcC5NYXJrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb25bTmFtZV0gPT0gdW5kZWZpbmVkKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25bTmFtZV0gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uW05hbWVdLnB1c2gob3BlbklkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAq6YCS5b2S5qCH6K6w6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge1N0ZXB9IHN0ZXAg5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gbWFyayDmoIforrBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXRGbG9vck51bSDnm67moIflsYLmlbBcclxuICAgICAqL1xyXG4gICAgX01hcmtTdGVwcyhzdGVwOiBTdGVwLCBtYXJrOiBhbnksIHRhcmdldEZsb29yTnVtOiBudW1iZXIpOiBib29sZWFuICB7XHJcbiAgICAgICAgaWYgKHN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChzdGVwLkZsb29yLkZsb29yTnVtID49IHRhcmdldEZsb29yTnVtKSAge1xyXG4gICAgICAgICAgICBpZiAoc3RlcC5NYXJrID09IHVuZGVmaW5lZCkgIHtcclxuICAgICAgICAgICAgICAgIHN0ZXAuTWFyayA9IG1hcmtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlZnRPcGVuOiBib29sZWFuO1xyXG4gICAgICAgIHZhciByaWdodE9wZW46IGJvb2xlYW47XHJcbiAgICAgICAgdmFyIGxlZnRQYXJlbnQ6IFN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgaWYgKGxlZnRQYXJlbnQgIT0gbnVsbCAmJiAhbGVmdFBhcmVudC5Jc0RlYWRSb2FkKSAge1xyXG4gICAgICAgICAgICBpZiAobGVmdFBhcmVudC5NYXJrID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGxlZnRPcGVuID0gdGhpcy5fTWFya1N0ZXBzKGxlZnRQYXJlbnQsIG1hcmssIHRhcmdldEZsb29yTnVtKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgbGVmdE9wZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmlnaHRQYXJlbnQ6IFN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgIGlmIChyaWdodFBhcmVudCAhPSBudWxsICYmICFyaWdodFBhcmVudC5Jc0RlYWRSb2FkKSAge1xyXG4gICAgICAgICAgICBpZiAocmlnaHRQYXJlbnQuTWFyayA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICByaWdodE9wZW4gPSB0aGlzLl9NYXJrU3RlcHMocmlnaHRQYXJlbnQsIG1hcmssIHRhcmdldEZsb29yTnVtKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmlnaHRPcGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0ZXAuTWFyayA9PSB1bmRlZmluZWQpICB7XHJcbiAgICAgICAgICAgIHN0ZXAuTWFyayA9IG1hcmtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFsZWZ0T3BlbiAmJiAhcmlnaHRPcGVuKSAge1xyXG4gICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOacgOWQjuWGjeiuoeeul+S4gOasoeivpeWxgumAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yTnVtIFxyXG4gICAgICovXHJcbiAgICBfQ291bnRMYXN0Rmxvb3JSb2FkKGZsb29yTnVtOiBudW1iZXIpOiB2b2lkICB7XHJcbiAgICAgICAgaWYgKGZsb29yTnVtIDwgdGhpcy5UYWlsRkxvb3IuRmxvb3JOdW0pICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JOdW0pO1xyXG4gICAgICAgIHZhciBsYXN0Rmxvb3IgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSAtIDEpO1xyXG4gICAgICAgIGZvciAodmFyIHN0ZXBJZHggPSAwOyBzdGVwSWR4IDwgZmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoIXN0ZXAuSXNEZWFkUm9hZCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBMZWZ0U3RlcCA9IHN0ZXAuTGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgdmFyIFJpZ2h0U3RlcCA9IHN0ZXAuUmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICAgIGlmIChMZWZ0U3RlcCAhPSBudWxsKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghTGVmdFN0ZXAuSXNEZWFkUm9hZCkgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytMZWZ0U3RlcC5Sb2FkTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChSaWdodFN0ZXAgIT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIVJpZ2h0U3RlcC5Jc0RlYWRSb2FkKSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK1JpZ2h0U3RlcC5Sb2FkTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBsYXN0U3RlcElkeCA9IDA7IGxhc3RTdGVwSWR4IDwgbGFzdEZsb29yLkxvZ2ljTGVuZ3RoOyArK2xhc3RTdGVwSWR4KSAge1xyXG4gICAgICAgICAgICB2YXIgc3RlcCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoIXN0ZXAuSXNEZWFkUm9hZCAmJiBzdGVwLlJvYWROdW0gPCAxKSAge1xyXG4gICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy/lkJHkuIrpgJLlvZLmiormiYDmnInkuI7kuYvnm7jov57nmoToioLngrnmlbDnu5nkv67mraPkuoZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUvumBk+WFt+WJjeeul+mAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIFxyXG4gICAgICovXHJcbiAgICBfQ291bnRSb2FkSW5mbyhmbG9vcjogbnVtYmVyKTogQXJyYXk8bnVtYmVyPiAge1xyXG4gICAgICAgIHZhciBzYWZlU3RlcExpc3Q6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgICAgICB2YXIgdGhpc0Zsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcblxyXG4gICAgICAgIHZhciByb2FkTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBsYXN0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yIC0gMSk7XHJcbiAgICAgICAgaWYgKGZsb29yID09IHRoaXMuX1NhZmVMb2NhdGlvbi5ZKVxyXG4gICAgICAgICAgICB0aGlzLl9SZXNldFN0ZXBJbmZvKHRoaXNGbG9vcik7XHJcbiAgICAgICAgZWxzZSAge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBsb2dpY0lkeDogbnVtYmVyID0gMDsgbG9naWNJZHggPCB0aGlzRmxvb3IuTG9naWNMZW5ndGg7ICsrbG9naWNJZHgpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgICAgIHZhciBsZWZ0Q2hpbGQ6IFN0ZXAgPSBzdGVwLkxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodENoaWxkOiBTdGVwID0gc3RlcC5SaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnRDaGlsZCAhPSBudWxsICYmICFsZWZ0Q2hpbGQuSXNEZWFkUm9hZCkgIHtcclxuICAgICAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJpZ2h0Q2hpbGQgIT0gbnVsbCAmJiAhcmlnaHRDaGlsZC5Jc0RlYWRSb2FkKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZsb29yID09IHRoaXMuX1NhZmVMb2NhdGlvbi5ZKSAge1xyXG4gICAgICAgICAgICB2YXIgc2FmZVN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcCh0aGlzLl9TYWZlTG9jYXRpb24uWCk7XHJcbiAgICAgICAgICAgIHNhZmVTdGVwLklzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2FmZVN0ZXBMaXN0LnB1c2godGhpcy5fU2FmZUxvY2F0aW9uLlgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNhZmVTdGVwTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBfUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3I6IE1vdW50TGluZSkgIHtcclxuICAgICAgICBpZiAoIXRoaXNGbG9vcikgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBsb2dpY0lkeDogbnVtYmVyID0gMDsgbG9naWNJZHggPCB0aGlzRmxvb3IuTG9naWNMZW5ndGg7ICsrbG9naWNJZHgpICB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gdGhpc0Zsb29yLkdldFN0ZXAobG9naWNJZHgpO1xyXG4gICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluafkOmBk+WFt+S/oeaBr1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9Zmxvb3IgXHJcbiAgICAgKi9cclxuICAgIF9UYWtlSXRlbUxpc3QoZmxvb3I6IG51bWJlcikgIHtcclxuICAgICAgICB2YXIgbGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICB2YXIgaXRlbUxpc3QgPSBuZXcgQXJyYXkobGluZS5Mb2dpY0xlbmd0aCk7XHJcbiAgICAgICAgdmFyIGxpbmVSZXdhcmRzID0gdGhpcy5JdGVtTGF5b3V0LlRha2VMaW5lUmV3YXJkKGZsb29yKTtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gdGhpcy5DdXJMaW5lUmV3YXJkcy5jb25jYXQobGluZVJld2FyZHMpO1xyXG4gICAgICAgIGlmICh0aGlzLlNhZmVMb2NhdGlvbi5ZID4gZmxvb3IgfHwgZmxvb3IgPiB0aGlzLlNhZmVMb2NhdGlvbi5ZICsgMSkgIHtcclxuICAgICAgICAgICAgdmFyIGxpbmVCYXJyaWVycyA9IHRoaXMuSXRlbUxheW91dC5UYWtlTGluZURpZmZpY3VsdHkoZmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzLmNvbmNhdChsaW5lQmFycmllcnMpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5DdXJMaW5lQmFycmllcnMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDloYzpmbfmn5DkuIDlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfWZsb29yIFxyXG4gICAgICovXHJcbiAgICBfRGVzdHJveUxpbmUoZmxvb3I6IG51bWJlcikgIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGFpbEZsb29yLkZsb29yTnVtKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGNvdW50Rmxvb3I6IG51bWJlciA9IHRhaWxGbG9vci5GbG9vck51bTsgY291bnRGbG9vciA8PSBmbG9vcjsgKytjb3VudEZsb29yKSAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGNvdW50Rmxvb3IpO1xyXG4gICAgICAgICAgICB0YXJnZXRGbG9vci5CcmVhaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBsYXllci5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBwYXRoXHJcbntcclxuICAgIGV4cG9ydCB2YXIgSXNFZGl0b3I6Ym9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgZXhwb3J0IHZhciBTY2VuZUFzc2V0UGF0aDpzdHJpbmcgPSBcIkxheWFTY2VuZV9cIjtcclxuICAgIGV4cG9ydCB2YXIgUmVzb3VyY2VQYXRoOnN0cmluZyA9IElzRWRpdG9yP1wiRDovR0l0L1Jlc291cmNlcy9MYXlhUHJvamVjdC8yLjBQcm9qZWN0L215TGF5YS9OZXRSZXNvdXJjZV8zXzI5L1wiOlwiaHR0cHM6Ly93d3cuZ3NqZ2FtZS5jb20vUmVzb3VyY2UvTmV0UmVzb3VyY2VfM18yOS9cIjtcclxuICAgIGV4cG9ydCB2YXIgVUlQYXRoOnN0cmluZyA9IFJlc291cmNlUGF0aCArIFwiVUkvXCI7XHJcbiAgICBleHBvcnQgdmFyIE1vZGVsUGF0aDpzdHJpbmcgPSBSZXNvdXJjZVBhdGgrXCIzRC9cIlxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlkF0bOaWh+S7tui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0QXRsUGF0aChmaWxlTmFtZTpzdHJpbmcpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBVSVBhdGggKyBmaWxlTmFtZStcIi5hdGxhc1wiO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZVSUpzb27ot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldERlcGF0aFVJSlMoZmlsZU5hbWU6c3RyaW5nKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIFVJUGF0aCtmaWxlTmFtZStcIi5qc29uXCI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlmxo5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRMSChmaWxlTmFtZTpzdHJpbmcpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBNb2RlbFBhdGggK1NjZW5lQXNzZXRQYXRoK2ZpbGVOYW1lK1wiL0NvbnZlbnRpb25hbC9cIiArZmlsZU5hbWUgKyBcIi5saFwiXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIFVJRnVuY1xyXG57XHJcbiAgICAvL+iuoeeul+e8qeaUvuWAvFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvdW50U2NhbGVGaXgoIHdpZHRoOm51bWJlciApOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF3aWR0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFnZVdpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB2YXIgc2NhbGU6bnVtYmVyID0gc3RhZ2VXaWR0aC93aWR0aDtcclxuICAgICAgICByZXR1cm4gIHNjYWxlO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEZpeFVJKCB2aWV3OkxheWEuU3ByaXRlIClcclxuICAgIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBVSUZ1bmMuQ291bnRTY2FsZUZpeCh2aWV3LndpZHRoKTtcclxuICAgICAgICB2aWV3LnNjYWxlWCA9IHNjYWxlO1xyXG4gICAgICAgIHZpZXcuc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgdmlldy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodC9zY2FsZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1nciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCIgXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQUFxyXG57XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTWVzc2FnZTpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgIHN0YXRpYyBnZXQgTWVzc2FnZU1hbmFnZXIoKTpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEFQUC5fTWVzc2FnZT09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuX01lc3NhZ2UgPSBGVy5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX01lc3NhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX1VJTWFuYWdlcjpVSU1hbmFnZXI7XHJcbiAgICBzdGF0aWMgZ2V0IFVJTWFuYWdlcigpOlVJTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEFQUC5fVUlNYW5hZ2VyPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5fVUlNYW5hZ2VyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX1VJTWFuYWdlcjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIF9TY2VuZU1ncjpTY2VuZU1ncjtcclxuICAgIHN0YXRpYyBnZXQgU2NlbmVNYW5hZ2VyKCk6U2NlbmVNZ3JcclxuICAgIHtcclxuICAgICAgICBpZihBUFAuX1NjZW5lTWdyPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5fU2NlbmVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFNjZW5lTWdyPihTY2VuZU1ncik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuX1NjZW5lTWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbiIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IFBsYXllckd1ZXN0RGVsZWdhdGUgZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiXHJcbmltcG9ydCBTZXRQYW5lbFVJIGZyb20gXCIuLy4uL3VpL1NldFBhbmVsVUlcIlxyXG5pbXBvcnQgQ2hhcmFjdGVyVUkgZnJvbSBcIi4vLi4vdWkvQ2hhcmFjdGVyVUlcIlxyXG5pbXBvcnQgR2FtZVNjZW5lIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVTY2VuZVwiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi9BUFBcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCI7XHJcblxyXG50eXBlIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGVyXHJcbntcclxuICAgIHN0YXRpYyBnZXQgR2FtZUNvbnRyb2xlcigpOkdhbWVDb250cm9sZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIEdhbWVDb250cm9sZXIuTWdyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ29udHJvbGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6IEdhbWVDb250cm9sZXI7XHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBnZXQgTWdyKCk6IEdhbWVDb250cm9sZXIge1xyXG4gICAgICAgIGlmIChHYW1lQ29udHJvbGVyLl9NZ3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBHYW1lQ29udHJvbGVyLl9NZ3IgPSBuZXcgR2FtZUNvbnRyb2xlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR2FtZUNvbnRyb2xlci5fTWdyO1xyXG4gICAgfVxyXG4gICAgX0xpbmVTdGVwTnVtOm51bWJlcjtcclxuICAgIF9NYXhMaW5lTnVtOm51bWJlcjtcclxuICAgIF9TdGVwTGVuZ3RoOm51bWJlcjtcclxuICAgIF9TdGVwRGlzdGFuY2U6bnVtYmVyO1xyXG4gICAgX1BsYXllck1vdmVUaW1lOm51bWJlcjtcclxuICAgIC8v5bi46YeP5a6a5LmJXHJcbiAgICAvL+avj+ihjOacgOWkp+agvOWtkOaVsFxyXG4gICAgZ2V0IExpbmVTdGVwTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9MaW5lU3RlcE51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xpbmVTdGVwTnVtID0gNSsyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTGluZVN0ZXBOdW07XHJcbiAgICB9IFxyXG4gICAgLy/mnIDlpKfooYzmlbBcclxuICAgIGdldCBNYXhMaW5lTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9NYXhMaW5lTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTWF4TGluZU51bSA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTWF4TGluZU51bTtcclxuICAgIH0gXHJcbiAgICAvL+agvOWtkOi+uemVv1xyXG4gICAgZ2V0IFN0ZXBMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcExlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBMZW5ndGggPSAwLjk4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcExlbmd0aDtcclxuICAgIH1cclxuICAgIC8v5qC85a2Q5pac5a+56KeS6ZW/5bqmXHJcbiAgICBnZXQgU3RlcERpc3RhbmNlKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1N0ZXBEaXN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBEaXN0YW5jZSA9IE1hdGguc3FydCgodGhpcy5TdGVwTGVuZ3RoICogdGhpcy5TdGVwTGVuZ3RoKSAqIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcERpc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/njqnlrrbnp7vliqjml7bpl7RcclxuICAgIGdldCBQbGF5ZXJNb3ZlVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9QbGF5ZXJNb3ZlVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1BsYXllck1vdmVUaW1lID0gMC4wMiAqIDEwMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fUGxheWVyTW92ZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGxheWVySUQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBndWVzdEFnZW50OlBsYXllckd1ZXN0QWdlbnQgPSBQbGF5ZXJHdWVzdERlbGVnYXRlLkd1ZXN0QWdlbnQ7XHJcbiAgICAgICAgdmFyIGNoYXJhY3Rlckxpc3Q6QXJyYXk8bnVtYmVyPiA9IGd1ZXN0QWdlbnQuQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICBpZighY2hhcmFjdGVyTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighZ3Vlc3RBZ2VudC5CdXlDaGFyYWN0ZXIoaWQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ3Vlc3RBZ2VudC5TZXRDaGFyYWN0ZXIoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66K6+572u6Z2i5p2/XHJcbiAgICBTaG93U2V0UGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIFBhbmVsID0gQVBQLlVJTWFuYWdlci5TaG93PFNldFBhbmVsVUk+KFNldFBhbmVsVUkpOy8vIG5ldyBTZXRQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66KeS6Imy6Z2i5p2/XHJcbiAgICBwdWJsaWMgU2hvd0NoYXJhY3RlclBhbmVsKCkge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBBUFAuVUlNYW5hZ2VyLlNob3c8Q2hhcmFjdGVyVUk+KENoYXJhY3RlclVJKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TZXRJbmZvO1xyXG4gICAgZ2V0IFNldEluZm8oKTogR2FtZVN0cnVjdC5TZXRJbmZvIHtcclxuICAgICAgICBpZiAodGhpcy5fU2V0SW5mbyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1NldEluZm8gPSBuZXcgR2FtZVN0cnVjdC5TZXRJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TZXRJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBTZXRJbmZvKHZhbHVlOiBHYW1lU3RydWN0LlNldEluZm8pIHtcclxuICAgICAgICB0aGlzLl9TZXRJbmZvID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kv53lrZjorr7nva7mlbDmja5cclxuICAgIFNhdmVTZXRJbmZvKGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuU2V0SW5mbyA9IGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLy/or7vlj5borr7nva7kv6Hmga9cclxuICAgIEdldFNldEluZm8oKTogR2FtZVN0cnVjdC5TZXRJbmZvIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TZXRJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIEVudGVyR2FtZVVJKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuRW50ZXJTY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgRW50ZXJHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuRW50ZXJTY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEdhbWVEaXIoKTogR2FtZURpcmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5EaXJlY3RvciBhcyBHYW1lRGlyZWN0b3I7XHJcbiAgICB9XHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr+i1sOi/meS4quaOpeWPo1xyXG4gICAgRW50ZXJTY2VuZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbmV3R2FtZVNjZW5lID0gbmV3IEdhbWVTY2VuZSgpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ2hhbmdlU2NlbmUobmV3R2FtZVNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkEJVRkbooajnjrDmlYjmnpxcclxuICAgIEdlbkJ1ZmZFZmZlY3QodHlwZTogSXRlbVR5cGUpOiBMYXlhLlNwcml0ZTNEIHtcclxuICAgICAgICByZXR1cm4gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuICAgIH1cclxuXHJcbiAgICBCdXlJdGVtKGlkOm51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5CdXlJdGVtKGlkKTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1FbGVtZW50IGV4dGVuZHMgTGF5YS5Cb3gge1xyXG4gICAgLy9cclxuICAgIHByaXZhdGUgbV9JdGVtSWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9CdG46IExheWEuQnV0dG9uO1xyXG4gICAgcHJpdmF0ZSBfSW1nOiBMYXlhLkltYWdlO1xyXG4gICAgcHJpdmF0ZSBtX051bUxhYmVsOiBMYXlhLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBtX0xhYmVsU3RyaW5nOiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgbV9CdXlJdGVtOiBNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBwcml2YXRlIG1fQ2hvb3NlSXRlbTogTWVzc2FnZU1ELkRlbGVnYXRlO1xyXG5cclxuICAgIGdldCBCdG4oKTogTGF5YS5CdXR0b24ge1xyXG4gICAgICAgIGlmICh0aGlzLl9CdG4gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9CdG4gPSB0aGlzLmdldENoaWxkQXQoMSkgYXMgTGF5YS5CdXR0b247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9CdG47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IEl0ZW1JZHgoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9JdGVtSWR4ID0gaWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgSW1nKCk6IExheWEuSW1hZ2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9JbWc7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEJ1eUJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgSXNHcmF5KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5JbWcuZ3JheSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBJc0dyYXkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuSW1nLmdyYXk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IE51bShudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9MYWJlbFN0cmluZ1sxXSA9IFwiXCIgKyBudW07XHJcbiAgICAgICAgdGhpcy5tX051bUxhYmVsLnRleHQgPSB0aGlzLm1fTGFiZWxTdHJpbmdbMF0gKyB0aGlzLm1fTGFiZWxTdHJpbmdbMV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IFByaWNlKG51bTogbnVtYmVyKSAge1xyXG4gICAgICAgIHRoaXMuX0J0bi50ZXh0LnRleHQgPSBcIlwiICsgbnVtO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBJbml0KCkge1xyXG4gICAgICAgIHRoaXMuX0ltZyA9IHRoaXMuZ2V0Q2hpbGRBdCgwKSBhcyBMYXlhLkltYWdlO1xyXG4gICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICB0aGlzLm1fTnVtTGFiZWwgPSB0aGlzLmdldENoaWxkQXQoMikgYXMgTGF5YS5MYWJlbDtcclxuICAgICAgICB0aGlzLl9CdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5CdXlJdGVtKTtcclxuICAgICAgICB0aGlzLl9JbWcub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5DaG9vc2VJbWcpO1xyXG4gICAgICAgIGlmICghdGhpcy5tX0xhYmVsU3RyaW5nKSAge1xyXG4gICAgICAgICAgICB0aGlzLm1fTGFiZWxTdHJpbmcgPSB0aGlzLm1fTnVtTGFiZWwudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDaG9vc2VJbWcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9DaG9vc2VJdGVtKVxyXG4gICAgICAgICAgICB0aGlzLm1fQ2hvb3NlSXRlbS5FeGVjdXRlKHRoaXMubV9JdGVtSWR4KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQnV5SXRlbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5tX0J1eUl0ZW0pXHJcbiAgICAgICAgICAgIHRoaXMubV9CdXlJdGVtLkV4ZWN1dGUodGhpcy5tX0l0ZW1JZHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RCdXkob3duZXI6IGFueSwgbGlzdGVuZXI6IChpZDogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdmFyIG5ld0RlbGVnYXRlID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZShvd25lciwgbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubV9CdXlJdGVtID0gbmV3RGVsZWdhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdENob29zZShvd25lcjogYW55LCBsaXN0ZW5lcjogKGlkOiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICB2YXIgbmV3RGVsZWdhdGUgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5tX0Nob29zZUl0ZW0gPSBuZXdEZWxlZ2F0ZTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGVFbGVtZW50IGV4dGVuZHMgTGF5YS5JbWFnZSB7XHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBfQnRuOiBMYXlhLkJ1dHRvbjtcclxuICAgIHByaXZhdGUgX0ltZzogTGF5YS5JbWFnZTtcclxuICAgIHByaXZhdGUgbV9PbkNsaWNrSW1nOihpZDpudW1iZXIpPT52b2lkO1xyXG4gICAgcHJpdmF0ZSBtX0NoYXJhY3RlcklEOm51bWJlcjtcclxuICAgIGdldCBCdG4oKTogTGF5YS5CdXR0b24ge1xyXG4gICAgICAgIGlmICh0aGlzLl9CdG4gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9CdG4gPSB0aGlzLmdldENoaWxkQXQoMSkgYXMgTGF5YS5CdXR0b247XHJcbiAgICAgICAgICAgIHRoaXMuX0J0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0UGxheWVySUQodGhpcy5tX0NoYXJhY3RlcklEKTtcclxuICAgICAgICAgICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9CdG47XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9JbWcpIHtcclxuICAgICAgICAgICAgdGhpcy5Jbml0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldEdyYXkoaXNHcmF5OmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fSW1nLmdyYXkgPSBpc0dyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdE9uSW1nQ2xpY2soZXZlbnRGdW5jdGlvbjooKT0+dm9pZClcclxuICAgIHtcclxuICAgICAgICB2YXIgaWQ9dGhpcy5tX0NoYXJhY3RlcklEO1xyXG4gICAgICAgIHRoaXMuX0ltZy5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsZXZlbnRGdW5jdGlvbik7Ly8gb3duZXIsICgpPT57IGV2ZW50RnVuY3Rpb24oaWQpIH0gKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgQ2hhcmFjdGVySUQoaWQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJJRCA9IGlkO1xyXG4gICAgfVxyXG4gICAgSW5pdCgpICB7XHJcbiAgICAgICAgdGhpcy5fSW1nID0gdGhpcy5nZXRDaGlsZEF0KDApIGFzIExheWEuSW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0e0Jhc2VGdW5jfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJHVUkgZXh0ZW5kcyB1aS5CR1VJIHtcclxuICAgIFxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSkpO1xyXG4gICAgfVxyXG4gICAgLy9wcml2YXRlIF9Ta3lBcnI6QXJyYXk8TGF5YS5TcHJpdGU+O1xyXG4gICAgcHJpdmF0ZSBfU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9UZW1wU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9TY2FsZVNreTpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9TY2FsZUVhcnRoOm51bWJlcjtcclxuICAgIHByaXZhdGUgX0VhcnRoU3RhcnRQUzpudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgd2lkaCA9IExheWEuc3RhZ2Uud2lkdGggO1xyXG4gICAgICAgIHZhciByYXRlID0gTWF0aC5jZWlsKExheWEuc3RhZ2UuaGVpZ2h0L3dpZGgpO1xyXG5cclxuICAgICAgICB0aGlzLl9Ta3lRdWUgPSBuZXcgQmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPigpO1xyXG4gICAgICAgIHRoaXMuX1RlbXBTa3lRdWUgPSBuZXcgQmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPigpO1xyXG4gICAgICAgICAvL25ldyBBcnJheTxMYXlhLkltYWdlPihyYXRlKzEpO1xyXG4gICAgICAgIGZvcihsZXQgc3RhcnRJZHggPSAwO3N0YXJ0SWR4PHJhdGUrMTsgKytzdGFydElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2U6TGF5YS5JbWFnZSA9IG5ldyBMYXlhLkltYWdlKCk7XHJcbiAgICAgICAgICAgIGltYWdlLmxvYWRJbWFnZShcImNvbXAvaW1nX2JhY2tncm91bmRfc3ByX3NreS5wbmdcIik7XHJcbiAgICAgICAgICAgIGltYWdlLndpZHRoID0gd2lkaDtcclxuICAgICAgICAgICAgaW1hZ2UuaGVpZ2h0ID0gd2lkaCt3aWRoKjAuMDE7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9Ta3lRdWUuUHVzaChpbWFnZSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICB0aGlzLlNldFNreSgwKTtcclxuICAgICAgICB2YXIgZWFydGggPSBuZXcgTGF5YS5JbWFnZSgpO1xyXG4gICAgICAgIGVhcnRoLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fRWFydGhTdGFydFBTID0gZWFydGgueTtcclxuICAgICAgICBlYXJ0aC5sb2FkSW1hZ2UoXCJjb21wL2ltZ19iYWNrZ3JvdW5kX3Nwci5wbmdcIik7XHJcbiAgICAgICAgdGhpcy5fRWFydGggPSBlYXJ0aDtcclxuICAgICAgICBlYXJ0aC53aWR0aCA9IHdpZGg7XHJcbiAgICAgICAgZWFydGguaGVpZ2h0ID0gd2lkaDtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGVhcnRoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9TY2FsZVNreSA9IDAuMDAxXHJcbiAgICAgICAgdGhpcy5fU2NhbGVFYXJ0aCA9IDAuMDFcclxuICAgICAgICAvL3RoaXMuX0VhcnRoU3RhcnRQUyA9IHRoaXMuX0VhcnRoLnk7XHJcbiAgICB9XHJcbiAgICAvKlxyXG4gICAgSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgZm9yKGxldCBzdGFydElkeDpudW1iZXIgPSAwO3N0YXJ0SWR4PHRoaXMuX1NreVF1ZS5Db3VudDsrK3N0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1NreUFycltzdGFydElkeF0ueSA9IHN0YXJ0SWR4ICogaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9FYXJ0aC55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0VhcnRoU3RhcnRQUyA9IHRoaXMuX0VhcnRoLnk7XHJcbiAgICB9Ki9cclxuICAgIC8v6auY5bqm6L2s5bGP5bmV6auY5bqm5YOP57SgXHJcbiAgICBIZWlnaHRUcmFuc1BpeCggaGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0Ki0wLjE7XHJcbiAgICB9XHJcbiAgICBTZXRTa3kocGl4SGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT4gPSB0aGlzLl9UZW1wU2t5UXVlO1xyXG4gICAgICAgIHRlbVNreVF1ZS5DbGVhcigpO1xyXG4gICAgICAgIHZhciBjb3VudDpudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHdoaWxlKHRoaXMuX1NreVF1ZS5Db3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6QmFzZUZ1bmMuTm9kZTxMYXlhLlNwcml0ZT4gPSB0aGlzLl9Ta3lRdWUuUG9wTm9kZSgpO1xyXG4gICAgICAgICAgICB2YXIgc2t5SW1nOkxheWEuU3ByaXRlID0gbm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgc2t5SW1nLnkgPSBjb3VudCAqIGhlaWdodCArIHBpeEhlaWdodCAtIGhlaWdodCAtIGhlaWdodCowLjAxO1xyXG4gICAgICAgICAgICB0ZW1Ta3lRdWUuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgIGlmKHNreUltZy55PkxheWEuc3RhZ2UuaGVpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBza3lJbWcueSA9IHRlbVNreVF1ZS5IZWFkVmFsdWUueSAtIGhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK2NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9UZW1wU2t5UXVlID0gdGhpcy5fU2t5UXVlO1xyXG4gICAgICAgIHRoaXMuX1NreVF1ZSA9IHRlbVNreVF1ZTtcclxuICAgIH1cclxuICAgIFNldEVhcnRoKGhlaWdodDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRWFydGgueSA9IHRoaXMuX0VhcnRoU3RhcnRQUyArIGhlaWdodDtcclxuICAgIH1cclxuICAgIFVwZGF0ZVBhZ2UoIGhlaWdodDpudW1iZXIgKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgLy9oZWlnaHQgPSB0aGlzLkhlaWdodFRyYW5zUGl4KGhlaWdodCk7XHJcbiAgICAgICAgLy92YXIgc2t5SGVpZ2h0UGl4ID0gaGVpZ2h0KnRoaXMuX1NjYWxlU2t5O1xyXG4gICAgICAgIHRoaXMuU2V0U2t5KGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5TZXRFYXJ0aChoZWlnaHQpO1xyXG4gICAgICAgIC8vdmFyIGVhcnRoSGVpZ2h0UGl4ID0gaGVpZ2h0O1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge1VJRnVuY30gZnJvbSBcIi4vLi4vVXRpbGl0eS9VSUZ1bmNcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5cclxuLy9VSeWfuuexu1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlVUkgZXh0ZW5kcyBMYXlhLkJveFxyXG57XHJcbiAgICBcclxuICAgIFxyXG4gICAgLy9cclxuICAgIHByb3RlY3RlZCBfVUlUeXBlOkJhc2VFbnVtLlVJVHlwZUVudW07XHJcbiAgICBwcm90ZWN0ZWQgX0lzTXV0ZXg6Ym9vbGVhbjtcclxuICAgIHByb3RlY3RlZCBfTmFtZTpzdHJpbmc7ICAgIFxyXG4gICAgcHJvdGVjdGVkIF9VSU1hbmFnZXI6VUlNYW5hZ2VyXHJcbiAgICBwcml2YXRlIF9EaXJ0eTpib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfU2hvd2luZzpib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLkxvdztcclxuICAgICAgICB0aGlzLl9Jc011dGV4ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fVUlNYW5hZ2VyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5fU2hvd2luZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sZWZ0ID0gMDtcclxuXHQgICAgdGhpcy5yaWdodCA9IDA7XHJcblx0XHR0aGlzLmJvdHRvbSA9IDA7XHJcblx0XHR0aGlzLnRvcCA9IDA7XHJcbiAgICB9XHJcbiAgICBIaWRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZSgpXHJcbiAgICB7XHJcbiAgICB9XHJcblxyXG4gICAgT3Blbk9QKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuT3BlbigpO1xyXG4gICAgfVxyXG4gICAgQ2xvc2VPUCgpXHJcbiAgICB7XHJcbiAgICAgICAgLy90aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgRGVzdHJveSggKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBVSVR5cGUoKTpCYXNlRW51bS5VSVR5cGVFbnVtXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1VJVHlwZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IElzTXV0ZXgoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0lzTXV0ZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgU2hvd2luZygpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU2hvd2luZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWvuVVJ6L+b6KGM6YCC6YWNXHJcbiAgICAgKiBAcGFyYW0gVUkg6YCC6YWNVUlcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZpeFVJKFVJOkxheWEuVmlldylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKFVJKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXREaXJ0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgRGlydHkoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0RpcnR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbGVhckRpcnR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgVUlVcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fRGlydHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLkNsZWFyRGlydHkoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBVcGRhdGUoKTp2b2lkO1xyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBGVyBmcm9tIFwiLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiO1xyXG5pbXBvcnQgUm9sZUVsZW1lbnQgZnJvbSBcIi4vLi4vc2NyaXB0L1JvbGVFbGVtZW50XCJcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyRW50aXR5XCJcclxuXHJcbmNsYXNzIEV4dGVuZENoYXJhY3RlcnNVSSBleHRlbmRzIHVpLkNoYXJhY3RlclVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBCYXNlVUkge1xyXG5cclxuICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJMaXN0OiBBcnJheTxhbnk+O1xyXG4gICAgcHJpdmF0ZSBtX0dvbGREaXNjcmliZTogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIF9SZW5kZXJIYW5kbGVyKGNlbGw6IExheWEuQm94LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHJvbGVFbGVtZW50OiBSb2xlRWxlbWVudCA9IGNlbGwgYXMgUm9sZUVsZW1lbnQ7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVzZXQoKTtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDogQXJyYXk8bnVtYmVyPiA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LmdyYXkgPSBjaGFyYWN0ZXJMaXN0W2luZGV4XSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgICByb2xlRWxlbWVudC5DaGFyYWN0ZXJJRCA9IGluZGV4O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlZ2lzdE9uSW1nQ2xpY2soKCkgPT4geyB0aGlzLk9uQ2xpY2tJbWcoaW5kZXgpIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfVUk6IEV4dGVuZENoYXJhY3RlcnNVSTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZENoYXJhY3RlcnNVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuR2V0Q2hhcmFjdGVyTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuU2V0TGlzdCgpO1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5tX0dvbGREaXNjcmliZSA9IHRoaXMuX1VJLl9Hb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuT25Nb25leUNoYW5nZSgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJDaGFyYWN0ZXJVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIEdldENoYXJhY3Rlckxpc3QoKSAge1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJMaXN0ID0gWzAsIDFdO1xyXG4gICAgfVxyXG5cclxuICAgIFNldExpc3QoKSB7XHJcbiAgICAgICAgdmFyIGxpc3RBcnJheTogQXJyYXk8YW55PiA9IHRoaXMubV9DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5yZW5kZXJIYW5kbGVyID0gbmV3IExheWEuSGFuZGxlcih0aGlzLCB0aGlzLl9SZW5kZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5hcnJheSA9IGxpc3RBcnJheTtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0JhY2tUaW1lID0gMjAwOy8v6K6+572u5qmh55qu562L5Zue5by55pe26Ze044CC5Y2V5L2N5Li65q+r56eS44CCXHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNEaXN0YW5jZSA9IDUwXHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCkge1xyXG5cclxuICAgIH1cclxuICAgIE9wZW4oKSAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VyQ2hhcmFjdGVySURDaGFuZ2UsIHRoaXMuT25OZWVkQ2xvc2VVSSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSwgdGhpcy5Pbk1vbmV5Q2hhbmdlLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5PbkNoYXJhY3Rlckxpc3RDaGFuZ2UsIHRoaXMuT25DaGFuZ2VMaXN0LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZSgpICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJDaGFyYWN0ZXJJRENoYW5nZSwgdGhpcy5Pbk5lZWRDbG9zZVVJLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLCB0aGlzLk9uTW9uZXlDaGFuZ2UsIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSwgdGhpcy5PbkNoYW5nZUxpc3QsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5LqL5Lu2XHJcbiAgICBwcml2YXRlIE9uQ2xpY2tJbWcoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChpZCA9PSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQ2hhcmFjdGVySUQpICB7XHJcbiAgICAgICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2UodGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNldFBsYXllcklEKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uTmVlZENsb3NlVUkoKTogdm9pZCAge1xyXG4gICAgICAgIGlmICghdGhpcy5TaG93aW5nKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2UodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbkNoYW5nZUxpc3QoKSAge1xyXG4gICAgICAgIGlmICghdGhpcy5TaG93aW5nKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnJlZnJlc2goKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25Nb25leUNoYW5nZSgpICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0dvbGREaXNjcmliZVsxXSA9IFwiXCIgKyBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXk7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dvbGQudGV4dCA9IHRoaXMubV9Hb2xkRGlzY3JpYmVbMF0gKyB0aGlzLm1fR29sZERpc2NyaWJlWzFdO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7R2FtZVN0cnVjdCB9ICBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmNsYXNzIEV4dGVuZEVuZEdhbWVVSSBleHRlbmRzIHVpLkVuZEdhbWVVSSB7XHJcbiAgICBQYW5lbDpMYXlhLlBhbmVsO1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJFbmRHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL3RoaXMuUGFuZWwgPSB0aGlzLlBhbmVsO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbC52U2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9NZW51ZUJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLEd1aWRlck1hbmFnZXIuTWdyLEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuX1NldEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dTZXRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRCdG4ub24oTGF5YS5FdmVudC5DTElDSyxDb250cm9sZXIuR2FtZUNvbnRyb2xlcixDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJFbmRHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIFVJOkV4dGVuZEVuZEdhbWVVSTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuVUk9IG5ldyBFeHRlbmRFbmRHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuVUkpO1xyXG4gICAgICAgIC8vdGhpcy5VSS5fQ2hhcmFjdGVyTGlzdC5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgdGhpcy5fVUlNYW5hZ2VyLlNob3c8UGxheWVyTGlzdFVJPihQbGF5ZXJMaXN0VUkpfSk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBGTSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFBsYXllckxpc3RVSSBmcm9tIFwiLi8uLi91aS9QbGF5ZXJMaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5jbGFzcyBFeHRlbmRFbnRlckdhbWVVSSBleHRlbmRzIHVpLkVudGVyVUkge1xyXG4gICAgUGFuZWw6TGF5YS5QYW5lbDtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuUGFuZWwgPSB0aGlzLl9QYW5lbDtcclxuICAgICAgICB0aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXIub24oTGF5YS5FdmVudC5DTElDSyxHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dDaGFyYWN0ZXJQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU2V0UGFuZWwub24oTGF5YS5FdmVudC5DTElDSyxHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dTZXRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnQub24oTGF5YS5FdmVudC5DTElDSyxHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9ICAgICAgICBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50ZXJHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJFbnRlckdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOkV4dGVuZEVudGVyR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUk9IG5ldyBFeHRlbmRFbnRlckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHZhciB1aU1ncjpVSU1hbmFnZXIgPSB0aGlzLl9VSU1hbmFnZXI7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fQ2hhcmFjdGVyTGlzdC5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgdWlNZ3IuU2hvdzxQbGF5ZXJMaXN0VUk+KFBsYXllckxpc3RVSSl9KTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog5Zy65pmvVUlcclxuICovXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IEl0ZW1MaXN0VUkgZnJvbSBcIi4vSXRlbUxpc3RVSVwiXHJcbmltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuY2xhc3MgRXh0ZW5kc0dhbWVVSSBleHRlbmRzIHVpLkdhbWVVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVcIikpKTtcclxuICAgIH1cclxuICAgIFNldENvdW50VGltZShpbmZvOnN0cmluZyA9XCJcIilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUudGV4dCA9aW5mbztcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBwcml2YXRlIF9VSTpFeHRlbmRzR2FtZVVJO1xyXG4gICAgLy9cclxuICAgIERpc3RhbmNlU3RyOkFycmF5PHN0cmluZz47XHJcbiAgICBHb2xkTnVtU3RyOkFycmF5PHN0cmluZz47XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9Jc011dGV4ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fTGVmdFRvdWNoLmxlZnQgPSAwO1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX0xlZnRUb3VjaC5yaWdodCA9IHRoaXMud2lkdGgvNDtcclxuICAgICAgICAvL3RoaXMuX1VJLl9SaWdodFRvdWNoLnJpZ2h0ID0gMDtcclxuICAgICAgICAvL3RoaXMuX1VJLl9SaWdodFRvdWNoLmxlZnQgPSB0aGlzLndpZHRoLzI7XHJcbiAgICAgICAgdmFyIG9wSXNSaWdodCA9IEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRJbmZvLk9QSXNSaWdodDtcclxuICAgICAgICB0aGlzLl9VSS5fSXRlbUxpc3RCdG4ub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57IFxyXG4gICAgICAgICAgICB0aGlzLl9VSU1hbmFnZXIuU2hvdzxJdGVtTGlzdFVJPihJdGVtTGlzdFVJKX0pXHJcbiAgICAgICAgdGhpcy5TZXRDb3VudFRpbWUoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyPSB0aGlzLl9VSS5fVHh0RGlzdGFuY2UudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgdGhpcy5EaXN0YW5jZVN0clsxXSA9IFwiMFwiXHJcbiAgICAgICAgdGhpcy5fU2hvd0Rpc3RhbmNlKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyID0gdGhpcy5fVUkuX1R4dEdvbGQudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyWzFdID0gXCIwXCI7XHJcbiAgICAgICAgdGhpcy5fU2hvd0dvbGROdW0oKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLlNob3dJbnB1dEluZm8oXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfU2hvd0Rpc3RhbmNlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0RGlzdGFuY2UudGV4dCA9IHRoaXMuRGlzdGFuY2VTdHJbMF0rdGhpcy5EaXN0YW5jZVN0clsxXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBfU2hvd0dvbGROdW0oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHRHb2xkLnRleHQgPSB0aGlzLkdvbGROdW1TdHJbMF0gKyB0aGlzLkdvbGROdW1TdHJbMV07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXQgR29sZChnb2xkOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSBnb2xkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgU2V0TGVmdFRvdWNoKG93bmVyOmFueSxMaXN0ZW5lcjooKT0+dm9pZCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9MZWZ0VG91Y2gub24oTGF5YS5FdmVudC5DTElDSyxvd25lcixMaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UmlnaHRUb3VjaChvd25lcjphbnksTGlzdGVuZXI6KCk9PnZvaWQpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fUmlnaHRUb3VjaC5vbihMYXlhLkV2ZW50LkNMSUNLLG93bmVyLExpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRDb3VudFRpbWUoaW5mbzpzdHJpbmcgPVwiXCIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaW5mbz09XCJcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9Db3VudERvd25VSS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZVBhbmVsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuU2V0Q291bnRUaW1lKGluZm8pO1xyXG4gICAgfVxyXG4gICAgc2V0IEdhbWVQYW5lbCh2YWx1ZTpib29sZWFuKVxyXG4gICAgeyBcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZVBhbmVsLnZpc2libGUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCBEaXN0YW5jZSh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGRpcyA9IFwiXCIgKyB2YWx1ZTtcclxuICAgICAgICBpZihkaXMgPT0gdGhpcy5EaXN0YW5jZVN0clsxXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gZGlzO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIHNldCBHb2xkTnVtKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIFNob3dJbnB1dEluZm8oaW5mbzpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dhbWVJbmZvLnRleHQgPSBpbmZvO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICAvL+aYvuekuumHkeW4geS/oeaBr1xyXG4gICAgICAgIHRoaXMuX1Nob3dHb2xkTnVtKCk7XHJcbiAgICAgICAgLy/mmL7npLrot53nprvkv6Hmga9cclxuICAgICAgICB0aGlzLl9TaG93RGlzdGFuY2UoKTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQge1BsYXllcn0gZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IHtHYW1lQWdlbnR9IGZyb20gXCIuLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuLy4uL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcblxyXG5jbGFzcyBFeHRlbmRzSXRlbUxpc3RVSSBleHRlbmRzIHVpLkl0ZW1MaXN0VUlcclxue1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OkFycmF5PG51bWJlcj5cclxuICAgIEJ0bkxpc3RlbmVyOk1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9JdGVtTGlzdCA9IFtdO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1MaXN0VUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJJdGVtTGlzdFVJXCI7XHJcbiAgICB9XHJcbiAgICBVSTpFeHRlbmRzSXRlbUxpc3RVSTtcclxuICAgIG1fR29sZDpzdHJpbmdbXTtcclxuICAgIG1fSXRlbUxpc3Q6QXJyYXk8bnVtYmVyPjtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuVUkgPSBuZXcgRXh0ZW5kc0l0ZW1MaXN0VUkoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuVUkpO1xyXG4gICAgICAgIHRoaXMuVUkuQnRuTGlzdGVuZXIgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKHRoaXMsKCk9PnsgdGhpcy5fVUlNYW5hZ2VyLkNsb3NlKHRoaXMpfSlcclxuICAgICAgICAvL3RoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5tX0dvbGQgPSB0aGlzLlVJLl9Hb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuVUkuX0JHLmFscGhhID0gMDtcclxuICAgICAgICB0aGlzLlVJLl9CRy5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy5DbG9zZVVJKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPcGVuKClcclxuICAgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLHRoaXMuU2hvd0dvbGQsdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25JdGVtTGlzdENoYW5nZSx0aGlzLlJlZnJlc2hMaXN0LHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2hvd0dvbGQoKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUxpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsdGhpcy5TaG93R29sZCx0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlLHRoaXMuUmVmcmVzaExpc3QsdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZUxpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9JdGVtTGlzdCA9IFswLDFdO1xyXG4gICAgICAgIHRoaXMuU2V0TGlzdCh0aGlzLm1fSXRlbUxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWZyZXNoTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gWzAsMV07XHJcbiAgICAgICAgdGhpcy5GcmVzaExpc3QodGhpcy5tX0l0ZW1MaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd0dvbGQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLlNob3dpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0dvbGRbMV0gPVwiXCIgKyBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXk7XHJcbiAgICAgICAgdGhpcy5VSS5fR29sZC50ZXh0ID0gdGhpcy5tX0dvbGRbMF0gKyB0aGlzLm1fR29sZFsxXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9SZW5kZXJIYW5kbGVyKGNlbGw6TGF5YS5Cb3gsaW5kZXg6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJvbGVFbGVtZW50Okl0ZW1FbGVtZW50ID0gY2VsbCBhcyBJdGVtRWxlbWVudDtcclxuICAgICAgICB2YXIgaXRlbUxpc3Q6QXJyYXk8bnVtYmVyPiA9IEdhbWVBZ2VudC5BZ2VudC5JdGVtTGlzdDtcclxuICAgICAgICByb2xlRWxlbWVudC5Jbml0KCk7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuSXRlbUlkeCA9IGluZGV4O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlZ2lzdEJ1eSh0aGlzLHRoaXMuQnV5SXRlbSk7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVnaXN0Q2hvb3NlKHRoaXMsdGhpcy5DaG9vc2VJdGVtKTtcclxuICAgICAgICByb2xlRWxlbWVudC5Jc0dyYXkgPSBpdGVtTGlzdFtpbmRleF0/ZmFsc2U6dHJ1ZTtcclxuICAgICAgICByb2xlRWxlbWVudC5OdW0gPSBpdGVtTGlzdFtpbmRleF0/aXRlbUxpc3RbaW5kZXhdOjA7XHJcbiAgICAgICAgLy9yb2xlRWxlbWVudC5TZXRCdG4odGhpcy5CdG5MaXN0ZW5lci5MaXN0ZW5lcix0aGlzLkJ0bkxpc3RlbmVyLkFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTZXRMaXN0KGxpc3RBcnJheTpBcnJheTxhbnk+KVxyXG4gICAge1xyXG4gICAgICAgIC8vdmFyIGxpc3RBcnJheTpBcnJheTxhbnk+ID0gdGhpcy5tX0l0ZW1MaXN0O1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QucmVuZGVySGFuZGxlciA9IG5ldyBMYXlhLkhhbmRsZXIodGhpcyx0aGlzLl9SZW5kZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LmFycmF5ID0gbGlzdEFycmF5O1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNCYWNrVGltZSA9IDIwMDsvL+iuvue9ruapoeearueti+WbnuW8ueaXtumXtOOAguWNleS9jeS4uuavq+enkuOAglxyXG4gICAgICAgIHRoaXMuVUkuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNEaXN0YW5jZSA9IDUwXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEZyZXNoTGlzdChpZExpc3QpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5hcnJheSA9IGlkTGlzdDtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBCdXlJdGVtKGlkOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5TaG93aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkJ1eUl0ZW0oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2hvb3NlSXRlbShpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuU2hvd2luZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKEdhbWVBZ2VudC5BZ2VudC5JdGVtTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VySXRlbSA9IGlkO1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgQ2xvc2VVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmNsYXNzIEV4dGVuZHNTZXRQYW5lbFVJIGV4dGVuZHMgdWkuU2V0UGFuZWxVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e0FQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCl9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNTZXRQYW5lbFVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzU2V0UGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4geyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7IEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKSB9KTtcclxuICAgICAgICB0aGlzLlNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNldFBhbmVsVUlcIjtcclxuICAgIH1cclxuICAgIFNldFBhbmVsKCkge1xyXG4gICAgICAgIHZhciBpbmZvOiBHYW1lU3RydWN0LlNldEluZm8gPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HZXRTZXRJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5fVUkuX0F1ZGlvU3dpdGNoLnNlbGVjdGVkSW5kZXggPSBpbmZvLkF1ZGlvT24gPyAwIDogMTtcclxuICAgICAgICB0aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uT1BJc1JpZ2h0ID8gMSA6IDA7XHJcbiAgICAgICAgdGhpcy5fVUkuX1RleHQudGV4dCA9IGluZm8uVGV4dEluZm87XHJcbiAgICB9XHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICBpbmZvLkF1ZGlvT24gPSB0aGlzLl9VSS5fQXVkaW9Td2l0Y2guc2VsZWN0ZWRJbmRleCA9PSAwO1xyXG4gICAgICAgIGluZm8uT1BJc1JpZ2h0ID0gdGhpcy5fVUkuX09QU3dpdGNoLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TYXZlU2V0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZU9QKCkge1xyXG4gICAgICAgIHRoaXMuU2F2ZVBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge31cclxufVxyXG4iLCJpbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL0Jhc2VVSVwiXHJcbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XHJcblxyXG5tb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1Byb2dyZXNzOkxheWEuUHJvZ3Jlc3NCYXI7XHJcblx0XHRwdWJsaWMgX0d1aWRlcjpMYXlhLkltYWdlO1xyXG5cdFx0cHVibGljIF9FbnRlcjpMYXlhLkJ1dHRvbjtcclxuXHRcdHB1YmxpYyBFcnJvckluZm86TGF5YS5MYWJlbDtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTG9hZGluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEV4dExvYWRpbmdVSSBleHRlbmRzIHVpLkxvYWRpbmdVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBcIkxvYWRpbmdVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOnVpLkxvYWRpbmdVSTtcclxuICAgIF9DYWxsQmFjazooKT0+dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBuYW1lOnN0cmluZyApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgLy90aGlzLl9VSSA9bmV3IHVpLkxvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuX1VJID1uZXcgRXh0TG9hZGluZ1VJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSApO1xyXG4gICAgICAgIHRoaXMuVmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5fQ2FsbEJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgeDpudW1iZXIgPSAwO1xyXG4gICAgICAgIHggKz0gdGhpcy5fVUkuX1Byb2dyZXNzLndpZHRoKnRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZTtcclxuICAgICAgICB0aGlzLl9VSS5fR3VpZGVyLnBvcyh4LHRoaXMuX1VJLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBWYWx1ZShudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZSA9IG51bTtcclxuICAgICAgICB0aGlzLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQ29tcGxldGUoY2FsbEJhY2s6KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ2FsbEJhY2sgPSBjYWxsQmFjaztcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLmxhYmVsID0gXCJFbnRlclwiOy8vdGhpcy5fTmFtZVswXTtcclxuICAgIH1cclxuICAgIFJlbG9hZChjYWxsQmFjazooKT0+dm9pZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgQkdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0VhcnRoOkxheWEuSW1hZ2U7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJCR1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9UaGVCRzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBfR29sZDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfTGlzdDpMYXlhLkxpc3Q7XG5cdFx0cHVibGljIF9JbWc6YW55O1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiQ2hhcmFjdGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBFbmRHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9HYW1lSW5mbzpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfU3RhcnRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9NZW51ZUJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1NldEJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BsYXllckxpc3RCdG46TGF5YS5CdXR0b247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJFbmRHYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBFbnRlclVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfU3RhcnQ6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9DaGFyYWN0ZXI6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QYW5lbDpMYXlhLlBhbmVsO1xuXHRcdHB1YmxpYyBfU2V0UGFuZWw6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9DaGFyYWN0ZXJMaXN0OkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiRW50ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0NvdW50RG93blVJOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfSXRlbUxpc3RCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9Db3VudFRpbWU6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX0dhbWVJbmZvOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lUGFuZWw6TGF5YS5Cb3g7XG5cdFx0cHVibGljIF9UeHREaXN0YW5jZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfVHh0R29sZDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfUmlnaHRUb3VjaDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0xlZnRUb3VjaDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1VzZUl0ZW06TGF5YS5CdXR0b247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJHYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBJdGVtTGlzdFVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfQkc6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgX0xpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBfR29sZDpMYXlhLkxhYmVsO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiSXRlbUxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1BsYXllckxpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBfUmV0dXJuTWFpbjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlBsYXllckxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9UZXh0OkxheWEuVGV4dEFyZWE7XG5cdFx0cHVibGljIF9SZXR1cm46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9BdWRpb1N3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG5cdFx0cHVibGljIF9PUFN3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJTZXRQYW5lbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
