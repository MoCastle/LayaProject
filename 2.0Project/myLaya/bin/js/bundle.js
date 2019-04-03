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
    GameAgent.prototype.AddGold = function (gold) {
        if (!gold || gold < 0) {
            return;
        }
        var money = this.m_PlayerEntity.Money + gold;
        this.m_PlayerEntity.Money = money;
    };
    GameAgent.prototype.AddScore = function (score) {
        if (!score || score < 0) {
            return;
        }
        var score = this.m_PlayerEntity.CurScore + score;
        this.m_PlayerEntity.CurScore = score;
    };
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
        Event.OnCurLevelChange = "OnCurLevelChange";
        Event.OnCharacterListChange = "OnCharacterListChange";
        Event.OnCurItemChange = "OnCurItemChange";
        Event.OnItemListChange = "OnItemListChange";
        Event.OnCurScoreChange = "OnCurScoreChange";
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
            this.m_CurScore = 0;
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
        Object.defineProperty(PlayerEntity.prototype, "CurLevel", {
            get: function () {
                return this.m_CurLevel ? this.m_CurLevel : this.m_HistoryMaxLevel;
            },
            set: function (value) {
                if (value == this.CurLevel) {
                    return;
                }
                this.m_CurLevel = value;
                this.m_MessageMgr.Fire(Event.OnCurLevelChange);
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
        Object.defineProperty(PlayerEntity.prototype, "CurScore", {
            get: function () {
                return this.m_CurScore;
            },
            set: function (value) {
                if (this.m_CurScore = value) {
                    return;
                }
                this.m_MessageMgr.Fire(Event.OnCurScoreChange);
                this.m_CurScore = value;
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
},{"./../FrameWork/BaseManager":8,"./../Scene/Scene":31}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseManager_1 = require("./../FrameWork/BaseManager");
var TimeManager = /** @class */ (function (_super) {
    __extends(TimeManager, _super);
    function TimeManager() {
        var _this = _super.call(this) || this;
        _this.m_StartTime = Laya.timer.currTimer;
        _this.m_GameTime = 0;
        _this.m_FrameTime = 1 / Number(Laya.stage.frameRate);
        return _this;
    }
    TimeManager.Name = function () {
        return "TimeManager";
    };
    Object.defineProperty(TimeManager.prototype, "StartTimer", {
        get: function () {
            return this.m_StartTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimeManager.prototype, "GameTime", {
        get: function () {
            return this.m_GameTime;
        },
        enumerable: true,
        configurable: true
    });
    TimeManager.prototype.Update = function () {
        if (this.m_IsPaused) {
            return;
        }
        this.m_GameTime += this.m_FrameTime;
    };
    TimeManager.prototype.Pause = function () {
        this.m_IsPaused = true;
    };
    TimeManager.prototype.Continue = function () {
        this.m_IsPaused = false;
    };
    return TimeManager;
}(BaseManager_1.default));
exports.default = TimeManager;
},{"./../FrameWork/BaseManager":8}],13:[function(require,module,exports){
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
        rootBox.width = UIManager.g_UIWidth;
        rootBox.height = UIManager.g_UIHeight;
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
        //Laya.stage.addChild(nodeBox);
    };
    UIManager.Name = function () {
        return "UIManager";
    };
    UIManager.prototype.onSizeChange = function () {
        var rootBox = this.m_RootNode;
        UIFunc_1.UIFunc.FixUI(rootBox, UIManager.g_UIWidth);
        /*
        var scale = UIFunc.CountScaleFix(UIManager.g_UIWidth);
        var rootBox = this.m_RootNode;
        rootBox.scaleX = scale;
        rootBox.scaleY = scale;
        rootBox.height = UIManager.g_UIHeight * scale;
        rootBox.width = UIManager.g_UIWidth;*/
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
},{"./../Base/BaseEnum":5,"./../Utility/UIFunc":34,"./BaseManager":8}],14:[function(require,module,exports){
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
},{"./script/ItemElement":37,"./script/RoleElement":38}],15:[function(require,module,exports){
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
},{"./../Utility/Path":33,"./../controler/APP":35,"./../controler/GameControler":36}],16:[function(require,module,exports){
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
},{"./../Game/PlayerCtrler":24,"./../controler/GameControler":36,"./GameItem":19,"./Input":21}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
},{"./../FrameWork/MessageCenter":10,"./../Game/AnimObj":15,"./../Utility/Path":33,"./../controler/APP":35,"./../controler/GameControler":36,"./Buff":16,"./GameStruct":20,"./Input":21,"./PlayerCtrler":24}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
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
},{"./../controler/GameControler":36,"./Step":25}],23:[function(require,module,exports){
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
        if (this.PlayerDeath)
            return;
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
},{"../Utility/Path":33,"./../FrameWork/MessageCenter":10,"./../controler/APP":35,"./../controler/GameControler":36,"./Character":17,"./GameItem":19,"./PlayerCtrler":24}],24:[function(require,module,exports){
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
},{"./../controler/APP":35,"./../controler/GameControler":36}],25:[function(require,module,exports){
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
},{"./../Utility/Path":33,"./../controler/APP":35,"./GameItem":19,"./GameStruct":20}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadScene_1 = require("./Scene/LoadScene");
var APP_1 = require("./controler/APP");
var GameConfig_1 = require("./GameConfig");
var UIManager_1 = require("./FrameWork/UIManager");
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
        APP_1.default.Init();
        var sceneMgr = APP_1.default.SceneManager;
        sceneMgr.ChangeScene(new LoadScene_1.default());
        APP_1.default.FrameWork.AddManager(UIManager_1.default);
        Laya.timer.frameLoop(3, this, this.Update);
    };
    Game.prototype.Update = function () {
        APP_1.default.FrameWork.Update();
    };
    return Game;
}());
var GM = new Game();
},{"./FrameWork/UIManager":13,"./GameConfig":14,"./Scene/LoadScene":30,"./controler/APP":35}],27:[function(require,module,exports){
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
},{"./../Utility/Path":33,"./Scene":31,"./ScenePlay/GameScenePlay":32}],28:[function(require,module,exports){
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
},{"./../Game/GameItem":19,"./../Scene/Scene":31,"./GameDirector":27}],29:[function(require,module,exports){
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
},{"../controler/APP":35,"./../Scene/Scene":31,"./../Utility/Path":33,"./../ui/EnterGameUI":43}],30:[function(require,module,exports){
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
},{"./../Scene/Scene":31,"./../Utility/Path":33,"./../controler/APP":35,"./../ui/BG":39,"./../ui/UnDownload/LoadingUI":47,"./GuiderManager":29}],31:[function(require,module,exports){
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
},{"../FrameWork/FrameWork":9,"./../Base/FSM":7,"./../FrameWork/MessageCenter":10,"./../controler/APP":35}],32:[function(require,module,exports){
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
var GameAgent_1 = require("./../../Agent/GameAgent");
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
    Object.defineProperty(GameScenePlay.prototype, "PlayerFloor", {
        get: function () {
            var floor = this._StartPosition.z - this.Player.LogicPosition.z;
            floor = Math.round(floor / (GameControler_1.default.GameControler.StepDistance / 2));
            return Math.abs(floor);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameScenePlay.prototype, "Distance", {
        get: function () {
            return Math.floor(this.PlayerFloor);
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
        this.Player.PlayerDeath = true;
        this.m_OnGameComplete();
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
        this.PanelUI.Distance = this.Distance; //this.Distance();//Math.floor(dist);
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
    GameScenePlay.prototype.m_OnGameComplete = function () {
        APP_1.default.MessageManager.DesRegist(MessageCenter_1.MessageMD.GameEvent.PlayerDeath, this.Death, this);
        var ui = APP_1.default.UIManager.Show(EndGameUI_1.default);
        GameAgent_1.GameAgent.Agent.AddGold(this._GoldNum);
        GameAgent_1.GameAgent.Agent.AddScore(this._GoldNum * 10 + this.Distance * 10);
    };
    return GameScenePlay;
}(Scene_1.Scene.BaseScenePlaye));
exports.default = GameScenePlay;
},{"./../../Agent/GameAgent":2,"./../../FrameWork/MessageCenter":10,"./../../Game/GameCamera":18,"./../../Game/GameItem":19,"./../../Game/GameStruct":20,"./../../Game/Input":21,"./../../Game/MountLine":22,"./../../Game/Player":23,"./../../Scene/Scene":31,"./../../controler/APP":35,"./../../controler/GameControler":36,"./../../ui/EndGameUI":42,"./../../ui/GameUI":44}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path;
(function (path) {
    path.IsEditor = true;
    path.SceneAssetPath = "LayaScene_";
    path.ResourcePath = path.IsEditor ? "../NetResource_3_29/" : "https://www.gsjgame.com/Resource/NetResource_3_29/";
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
},{}],34:[function(require,module,exports){
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
    function FixUI(view, width) {
        var scale = UIFunc.CountScaleFix(width ? width : view.width);
        view.scaleX = scale;
        view.scaleY = scale;
        view.height = Laya.stage.height / scale;
    }
    UIFunc.FixUI = FixUI;
})(UIFunc = exports.UIFunc || (exports.UIFunc = {}));
},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var UIManager_1 = require("./../FrameWork/UIManager");
var SceneManager_1 = require("./../FrameWork/SceneManager");
var FrameWork_1 = require("./../FrameWork/FrameWork");
var TimeManager_1 = require("./../FrameWork/TimeManager");
var FrameWork_2 = require("./../FrameWork/FrameWork");
var APP = /** @class */ (function () {
    function APP() {
    }
    Object.defineProperty(APP, "FrameWork", {
        get: function () {
            return this.g_FrameWork;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP, "MessageManager", {
        get: function () {
            return APP.g_Message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP, "UIManager", {
        get: function () {
            if (APP.g_UIManager == null) {
                APP.g_UIManager = FrameWork_1.default.FM.GetManager(UIManager_1.default);
            }
            return APP.g_UIManager;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP, "SceneManager", {
        get: function () {
            if (APP.g_SceneMgr == null) {
                APP.g_SceneMgr = FrameWork_1.default.FM.GetManager(SceneManager_1.default);
            }
            return APP.g_SceneMgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP, "TimeManager", {
        get: function () {
            if (APP.g_TimeMgr == null) {
                APP.g_TimeMgr = FrameWork_1.default.FM.GetManager(TimeManager_1.default);
            }
            return APP.g_TimeMgr;
        },
        enumerable: true,
        configurable: true
    });
    APP.Init = function () {
        APP.g_FrameWork = FrameWork_2.default.FM;
        var fm = APP.g_FrameWork;
        APP.g_Message = fm.AddManager(MessageCenter_1.MessageMD.MessageCenter);
        APP.g_SceneMgr = fm.AddManager(SceneManager_1.default);
        APP.g_TimeMgr = fm.AddManager(TimeManager_1.default);
        APP.g_UIManager = fm.AddManager(UIManager_1.default);
    };
    return APP;
}());
exports.default = APP;
},{"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10,"./../FrameWork/SceneManager":11,"./../FrameWork/TimeManager":12,"./../FrameWork/UIManager":13}],36:[function(require,module,exports){
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
},{"./../Agent/PlayerGuestAgent":4,"./../Game/GameStruct":20,"./../Scene/GameScene":28,"./../ui/CharacterUI":41,"./../ui/SetPanelUI":46,"./APP":35}],37:[function(require,module,exports){
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
},{"./../FrameWork/MessageCenter":10}],38:[function(require,module,exports){
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
},{"./../controler/APP":35,"./../controler/GameControler":36}],39:[function(require,module,exports){
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
},{"./../Base/BaseFunc":6,"./../Utility/Path":33,"./layaMaxUI":48}],40:[function(require,module,exports){
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
},{"./../Base/BaseEnum":5,"./../FrameWork/FrameWork":9,"./../FrameWork/UIManager":13}],41:[function(require,module,exports){
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
},{"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Utility/Path":33,"./../controler/APP":35,"./../controler/GameControler":36,"./BaseUI":40,"./layaMaxUI":48}],42:[function(require,module,exports){
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
},{"../Scene/GuiderManager":29,"./../Utility/Path":33,"./../controler/GameControler":36,"./BaseUI":40,"./layaMaxUI":48}],43:[function(require,module,exports){
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
},{"./../Utility/Path":33,"./../controler/GameControler":36,"./BaseUI":40,"./layaMaxUI":48}],44:[function(require,module,exports){
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
},{"./../Utility/Path":33,"./../controler/GameControler":36,"./BaseUI":40,"./ItemListUI":45,"./layaMaxUI":48}],45:[function(require,module,exports){
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
},{"./../Agent/GameAgent":2,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../FrameWork/MessageCenter":10,"./../Utility/Path":33,"./../controler/APP":35,"./BaseUI":40,"./layaMaxUI":48}],46:[function(require,module,exports){
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
},{"../Scene/GuiderManager":29,"./../Base/BaseEnum":5,"./../Game/GameStruct":20,"./../Utility/Path":33,"./../controler/GameControler":36,"./BaseUI":40,"./layaMaxUI":48}],47:[function(require,module,exports){
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
},{"./../BaseUI":40}],48:[function(require,module,exports){
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
},{}]},{},[26])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rvb2wvTGF5YTIuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQWdlbnQvQmFzZUFnZW50LnRzIiwic3JjL0FnZW50L0dhbWVBZ2VudC50cyIsInNyYy9BZ2VudC9QbGF5ZXJFbnRpdHkudHMiLCJzcmMvQWdlbnQvUGxheWVyR3Vlc3RBZ2VudC50cyIsInNyYy9CYXNlL0Jhc2VFbnVtLnRzIiwic3JjL0Jhc2UvQmFzZUZ1bmMudHMiLCJzcmMvQmFzZS9GU00udHMiLCJzcmMvRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9GcmFtZVdvcmsudHMiLCJzcmMvRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXIudHMiLCJzcmMvRnJhbWVXb3JrL1NjZW5lTWFuYWdlci50cyIsInNyYy9GcmFtZVdvcmsvVGltZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL1VJTWFuYWdlci50cyIsInNyYy9HYW1lQ29uZmlnLnRzIiwic3JjL0dhbWUvQW5pbU9iai50cyIsInNyYy9HYW1lL0J1ZmYudHMiLCJzcmMvR2FtZS9DaGFyYWN0ZXIudHMiLCJzcmMvR2FtZS9HYW1lQ2FtZXJhLnRzIiwic3JjL0dhbWUvR2FtZUl0ZW0udHMiLCJzcmMvR2FtZS9HYW1lU3RydWN0LnRzIiwic3JjL0dhbWUvSW5wdXQudHMiLCJzcmMvR2FtZS9Nb3VudExpbmUudHMiLCJzcmMvR2FtZS9QbGF5ZXIudHMiLCJzcmMvR2FtZS9QbGF5ZXJDdHJsZXIudHMiLCJzcmMvR2FtZS9TdGVwLnRzIiwic3JjL01haW4udHMiLCJzcmMvU2NlbmUvR2FtZURpcmVjdG9yLnRzIiwic3JjL1NjZW5lL0dhbWVTY2VuZS50cyIsInNyYy9TY2VuZS9HdWlkZXJNYW5hZ2VyLnRzIiwic3JjL1NjZW5lL0xvYWRTY2VuZS50cyIsInNyYy9TY2VuZS9TY2VuZS50cyIsInNyYy9TY2VuZS9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheS50cyIsInNyYy9VdGlsaXR5L1BhdGgudHMiLCJzcmMvVXRpbGl0eS9VSUZ1bmMudHMiLCJzcmMvY29udHJvbGVyL0FQUC50cyIsInNyYy9jb250cm9sZXIvR2FtZUNvbnRyb2xlci50cyIsInNyYy9zY3JpcHQvSXRlbUVsZW1lbnQudHMiLCJzcmMvc2NyaXB0L1JvbGVFbGVtZW50LnRzIiwic3JjL3VpL0JHLnRzIiwic3JjL3VpL0Jhc2VVSS50cyIsInNyYy91aS9DaGFyYWN0ZXJVSS50cyIsInNyYy91aS9FbmRHYW1lVUkudHMiLCJzcmMvdWkvRW50ZXJHYW1lVUkudHMiLCJzcmMvdWkvR2FtZVVJLnRzIiwic3JjL3VpL0l0ZW1MaXN0VUkudHMiLCJzcmMvdWkvU2V0UGFuZWxVSS50cyIsInNyYy91aS9VbkRvd25sb2FkL0xvYWRpbmdVSS50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDVkEsNkNBQThDO0FBQzlDO0lBR0k7UUFFSSxJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztJQUNsRSxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTs7Ozs7QUNQRCx5Q0FBbUM7QUFFbkM7SUFBK0IsNkJBQVM7SUEyQnBDO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBMUJELHNCQUFXLGtCQUFLO2FBQWhCO1lBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO2FBQ2pDO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsK0JBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDO1FB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LEtBQUssRUFBYyxDQUFDO1lBRTNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQzVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFFeEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxRQUFRLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFFMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtZQUM3RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxVQUFVLENBQUMs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SUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVRBLEFBU0MsQ0FUK0IsSUFBSSxDQUFDLElBQUksR0FTeEM7SUFUWSxhQUFVLGFBU3RCLENBQUE7SUFDRDtRQUFrQyxnQ0FBUztRQUd2QzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIscUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FSQSxBQVFDLENBUmlDLElBQUksQ0FBQyxJQUFJLEdBUTFDO0lBUlksZUFBWSxlQVF4QixDQUFBO0lBQ0Q7UUFBZ0MsOEJBQVM7UUFLckM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG1DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDTCxpQkFBQztJQUFELENBVkEsQUFVQyxDQVYrQixJQUFJLENBQUMsSUFBSSxHQVV4QztJQVZZLGFBQVUsYUFVdEIsQ0FBQTtBQUNMLENBQUMsRUEzRmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBMkZmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCAqIGFzIFBsYXllckVudGl0eSBmcm9tIFwiLi9QbGF5ZXJFbnRpdHlcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlQWdlbnRcclxue1xyXG4gICAgcHJvdGVjdGVkIG1fUGxheWVyRW50aXR5OlBsYXllckVudGl0eS5QbGF5ZXIuUGxheWVyRW50aXR5O1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkgPSBQbGF5ZXJFbnRpdHkuUGxheWVyLlBsYXllckVudGl0eS5FbnRpdHk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQgQmFzZUFnZW50IGZyb20gXCIuL0Jhc2VBZ2VudFwiXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZUFnZW50IGV4dGVuZHMgQmFzZUFnZW50IHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9BZ2VudDogR2FtZUFnZW50O1xyXG5cclxuICAgIHN0YXRpYyBnZXQgQWdlbnQoKTogR2FtZUFnZW50IHtcclxuICAgICAgICBpZiAodGhpcy5fQWdlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9BZ2VudCA9IG5ldyBHYW1lQWdlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0FnZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgQ3VyTGV2ZWwoKTogbnVtYmVyICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuSGlzdG9yeU1heExldmVsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDdXJDaGFyYWN0ZXJJRCgpOiBudW1iZXIgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJDaGFyYWN0ZXJJRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VySXRlbSgpOiBudW1iZXIgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBJdGVtTGlzdCgpOiBBcnJheTxudW1iZXI+ICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuSXRlbUxpc3RcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgQ3VySXRlbShpZDogbnVtYmVyKSAge1xyXG4gICAgICAgIGlmICghdGhpcy5JdGVtTGlzdFtpZF0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW0gPSBpZDtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZEdvbGQoZ29sZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIWdvbGQgfHwgZ29sZDwwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtb25leSA9IHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkgKyBnb2xkO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkgPSBtb25leTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWRkU2NvcmUoc2NvcmU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFzY29yZSB8fCBzY29yZTwwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzY29yZSA9IHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyU2NvcmUgKyBzY29yZTtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1clNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXIge1xyXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50XHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE9uTW9uZXlDaGFuZ2U6IHN0cmluZyA9IFwiT25Nb25leUNoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckNoYXJhY3RlcklEQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VyQ2hhcmFjdGVySURDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25IaXN0b3J5TWF4TGV2ZWxDaGFuZ2U6IHN0cmluZyA9IFwiT25IaXN0b3J5TWF4TGV2ZWxDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJMZXZlbENoYW5nZTpzdHJpbmcgPSBcIk9uQ3VyTGV2ZWxDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DaGFyYWN0ZXJMaXN0Q2hhbmdlOiBzdHJpbmcgPSBcIk9uQ2hhcmFjdGVyTGlzdENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckl0ZW1DaGFuZ2U6c3RyaW5nID0gXCJPbkN1ckl0ZW1DaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25JdGVtTGlzdENoYW5nZTpzdHJpbmcgPSBcIk9uSXRlbUxpc3RDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJTY29yZUNoYW5nZTpzdHJpbmcgPSBcIk9uQ3VyU2NvcmVDaGFuZ2VcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckVudGl0eSB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgbV9FbnRpdHk6IFBsYXllckVudGl0eTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldCBFbnRpdHkoKTogUGxheWVyRW50aXR5ICB7XHJcbiAgICAgICAgICAgIGlmICghUGxheWVyRW50aXR5Lm1fRW50aXR5KSAge1xyXG4gICAgICAgICAgICAgICAgUGxheWVyRW50aXR5Lm1fRW50aXR5ID0gbmV3IFBsYXllckVudGl0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUGxheWVyRW50aXR5Lm1fRW50aXR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIG1fRnJhbWVXb3JrOkZyYW1lV29yaztcclxuICAgICAgICBwcml2YXRlIG1fTWVzc2FnZU1ncjpNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgICAgICBcclxuICAgICAgICAvL+mSsVxyXG4gICAgICAgIHByaXZhdGUgbV9Nb25leTpudW1iZXI7XHJcbiAgICAgICAgLy/pgInkuK3op5LoibJJRFxyXG4gICAgICAgIHByaXZhdGUgbV9DdXJDaGFyYWN0ZXJJRDpudW1iZXI7XHJcbiAgICAgICAgLy/njqnlrrblt7Lop6PplIHnmoTmnIDpq5jlhbPljaFcclxuICAgICAgICBwcml2YXRlIG1fSGlzdG9yeU1heExldmVsOm51bWJlcjtcclxuICAgICAgICAvL+W9k+WJjemAieS4reWFs+WNoVxyXG4gICAgICAgIHByaXZhdGUgbV9DdXJMZXZlbDpudW1iZXI7XHJcbiAgICAgICAgLy/op5LoibLliJfooahcclxuICAgICAgICBwcml2YXRlIG1fQ2hhcmFjdGVyTGlzdDpBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8v5b2T5YmN5oul6YCJ5Lit6YGT5YW3XHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1ckl0ZW06bnVtYmVyO1xyXG4gICAgICAgIC8v54mp5ZOB5YiX6KGoXHJcbiAgICAgICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OkFycmF5PG51bWJlcj47XHJcbiAgICAgICAgLy/np6/liIZcclxuICAgICAgICBwcml2YXRlIG1fQ3VyU2NvcmU6bnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE1vbmV5KCk6IG51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9Nb25leTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBNb25leSh2YWx1ZTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PSB0aGlzLm1fTW9uZXkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uTW9uZXlDaGFuZ2UpXHJcbiAgICAgICAgICAgIHRoaXMubV9Nb25leSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1ckNoYXJhY3RlcklEKCk6IG51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJDaGFyYWN0ZXJJRDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJDaGFyYWN0ZXJJRCh2YWx1ZTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PSB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckNoYXJhY3RlcklEQ2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJMZXZlbCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJMZXZlbD90aGlzLm1fQ3VyTGV2ZWw6dGhpcy5tX0hpc3RvcnlNYXhMZXZlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJMZXZlbCh2YWx1ZTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PSB0aGlzLkN1ckxldmVsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1ckxldmVsID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJMZXZlbENoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGlzdG9yeU1heExldmVsKCk6IG51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgSGlzdG9yeU1heExldmVsKHZhbHVlOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09IHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uSGlzdG9yeU1heExldmVsQ2hhbmdlKVxyXG4gICAgICAgICAgICB0aGlzLm1fSGlzdG9yeU1heExldmVsID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2hhcmFjdGVyTGlzdCgpOiBBcnJheTxudW1iZXI+XHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1ckl0ZW0odmFsdWU6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT0gdGhpcy5tX0N1ckl0ZW0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VySXRlbUNoYW5nZSlcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckl0ZW0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJJdGVtKCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXRlbUxpc3QoKTpBcnJheTxudW1iZXI+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0l0ZW1MaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1clNjb3JlKCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1clNjb3JlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1clNjb3JlKHZhbHVlOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMubV9DdXJTY29yZSA9IHZhbHVlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VyU2NvcmVDaGFuZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyU2NvcmUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgICAgICB0aGlzLm1fTW9uZXkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdCA9IFsxXTtcclxuICAgICAgICAgICAgdGhpcy5tX0hpc3RvcnlNYXhMZXZlbCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJJdGVtID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0ZyYW1lV29yayA9IEZyYW1lV29yay5GTTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1clNjb3JlID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIEFkZENoYXJhY3RlcihpZDpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdFtpZF0gPSAxO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQWRkSXRlbShpZDpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighdGhpcy5tX0l0ZW1MaXN0W2lkXSkgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9JdGVtTGlzdFtpZF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICsrdGhpcy5tX0l0ZW1MaXN0W2lkXTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEJhc2VBZ2VudCBmcm9tIFwiLi9CYXNlQWdlbnRcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJHdWVzdEFnZW50IGV4dGVuZHMgQmFzZUFnZW50IHtcclxuICAgIHN0YXRpYyBfQWdlbnQ6IFBsYXllckd1ZXN0QWdlbnQ7XHJcbiAgICBzdGF0aWMgZ2V0IEd1ZXN0QWdlbnQoKTogUGxheWVyR3Vlc3RBZ2VudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0FnZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQWdlbnQgPSBuZXcgUGxheWVyR3Vlc3RBZ2VudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQWdlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBNb25leSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkNoYXJhY3Rlckxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlDaGFyYWN0ZXIoaWQ6IG51bWJlcikgIHtcclxuICAgICAgICAvL1RvRG9cclxuICAgICAgICB2YXIgcHJpY2UgPSAwO1xyXG4gICAgICAgIGlmIChpZCA8IDB8fCBwcmljZSA8MCB8fCBwcmljZSA+IHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSAtPSBpZDtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkFkZENoYXJhY3RlcihpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJ1eUl0ZW0oaWQ6IG51bWJlcikgIHtcclxuICAgICAgICB2YXIgcHJpY2UgPSAwO1xyXG4gICAgICAgIGlmKGlkIDwgMHx8IHByaWNlIDwwIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocHJpY2UgPiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5IC09IHByaWNlO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQWRkSXRlbShpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldENoYXJhY3RlcihpZClcclxuICAgIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDpBcnJheTxudW1iZXI+ID0gdGhpcy5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIGlmKGNoYXJhY3Rlckxpc3RbaWRdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJDaGFyYWN0ZXJJRCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgQmFzZUVudW0ge1xyXG4gICAgZXhwb3J0IGVudW0gVUlUeXBlRW51bSB7TG93LE1pZGxlfTtcclxufSIsImltcG9ydCBCYXNlTWdyIGZyb20gXCIuLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIjtcclxuXHJcbi8qKlxyXG4gKiDlrprkuYnln7rnoYDnu5PmnoTkvZNcclxuICovXHJcbmV4cG9ydCBtb2R1bGUgQmFzZUZ1bmMge1xyXG4gICAgZW51bSBVSVR5cGVFbnVtIHtMb3csTWlkbGV9O1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcDxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX0NvdW50Om51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9NYXA6e1trZXk6IHN0cmluZ106IFR9O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX01hcCA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvckVhY2goY2FsbGJhY2s6KG1ncjpULGtleTpzdHJpbmcpPT52b2lkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBtYXBLZXkgaW4gdGhpcy5fTWFwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9NYXBbbWFwS2V5XSxtYXBLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBvYmog5pS+5YWl5a+56LGhXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDplK5cclxuICAgICAgICAgKi9cclxuICAgICAgICBTZXQoIG9iajpULCBrZXk6c3RyaW5nIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLl9NYXBba2V5XSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2V0KGtleTpzdHJpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuX01hcFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOenu+mZpOafkOS4quWvueixoVxyXG4gICAgICAgICAqIEByZXR1cm5zIOiiq+enu+mZpOWvueixoVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFJlbW92ZShrZXk6c3RyaW5nKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgT2JqOlQgPSB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICAgICAgaWYoT2JqKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm5oul5pyJXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgSGFzKGtleTpzdHJpbmcpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX01hcFtrZXldKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBOb2RlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfVmFsdWU6VDtcclxuICAgICAgICBwcml2YXRlIF9OZXh0Ok5vZGU8VD47XHJcbiAgICAgICAgY29uc3RydWN0b3IoIClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFZhbHVlKHZhbHVlOlQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgTmV4dCgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9OZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgTmV4dChub2RlOk5vZGU8VD4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIE5vZGVQb29sPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9Ob2RlTGlzdDpOb2RlPFQ+O1xyXG4gICAgICAgIFB1bGxCYWNrKG5vZGU6Tm9kZTxUPilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9Ob2RlTGlzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QuTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0ID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBBcXVpcmUoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpOb2RlPFQ+ID0gdGhpcy5fTm9kZUxpc3Q7XHJcbiAgICAgICAgICAgIGlmKG5vZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0ID0gdGhpcy5fTm9kZUxpc3QuTmV4dDtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBOb2RlUXVldWU8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Db3VudDtcclxuICAgICAgICBwcml2YXRlIF9IZWFkOk5vZGU8VD5cclxuICAgICAgICBwcml2YXRlIF9UYWlsZVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDb3VudCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgUG9wTm9kZSgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0NvdW50PDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IG51bGw7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9IZWFkO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkID0gdGhpcy5fSGVhZC5OZXh0O1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICAvL+WIq+aKiuWwvuW3tOW4puWHuuWOu+S6hlxyXG4gICAgICAgICAgICBpZih0aGlzLl9Db3VudCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaCh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoTm9kZShub2RlOk5vZGU8VD4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9Db3VudCA9PTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWQgPSBub2RlO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsZS5OZXh0ID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG5vZGU7XHJcbiAgICAgICAgICAgICsrdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGVhZE5vZGUoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5IZWFkTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIZWFkVmFsdWUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9IZWFkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fSGVhZC5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFRhaWxOb2RlKCk6Tm9kZTxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLlRhaWxOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFRhaWxWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1RhaWxlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fVGFpbGUudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFF1ZXVlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfTm9kZVBvb2w6Tm9kZVBvb2w8VD47XHJcbiAgICAgICAgcHJpdmF0ZSBfTm9kZVF1ZXVlOk5vZGVRdWV1ZTxUPjtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUG9vbCA9IG5ldyBOb2RlUG9vbDxUPigpO1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUXVldWUgPSBuZXcgTm9kZVF1ZXVlPFQ+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaCh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IHRoaXMuX05vZGVQb29sLkFxdWlyZSgpO1xyXG4gICAgICAgICAgICBub2RlLlZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVRdWV1ZS5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQb3AoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpOb2RlPFQ+ID0gdGhpcy5fTm9kZVF1ZXVlLlBvcE5vZGUoKTtcclxuICAgICAgICAgICAgaWYobm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fTm9kZVBvb2wuUHVsbEJhY2sobm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTm9kZVF1ZXVlLkNvdW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuLypcclxuICAgIGV4cG9ydCBjbGFzcyBMaW5rTm9kZUxpc3Q8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9IZWFkTm9kZTpOb2RlPFQ+O1xyXG4gICAgICAgIHByaXZhdGUgX1RhaWxOb2RlOk5vZGU8VD47XHJcblxyXG4gICAgICAgIHByaXZhdGUgX0NvdW50Tm9kZTpudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZE5vZGUgPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkTm9kZS5OZXh0ID0gdGhpcy5fSGVhZE5vZGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9UYWlsTm9kZSA9IHRoaXMuX0hlYWROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5blpLTnu5PngrnlgLxcclxuICAgICAgICAgXHJcbiAgICAgICAgZ2V0IEhlYWRWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5fSGVhZE5vZGUuVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIEFkZCh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld05vZGU6Tm9kZTxUPiA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIG5ld05vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5BZGROb2RlKG5ld05vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBBZGROb2RlKG5ld05vZGU6Tm9kZTxUPilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1RhaWxOb2RlIT10aGlzLl9IZWFkTm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUuTmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbn0iLCJleHBvcnQgbW9kdWxlIEZTTSBcclxue1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRlNNXHJcbiAgICB7XHJcbiAgICAgICAgVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgRlNNIDxUIGV4dGVuZHMgU3RhdGU+IFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgbV9DdXJTdGF0ZTpUO1xyXG4gICAgICAgIHByaXZhdGUgbV9TdGF0ZURpY3Q6e1tuYW1lOnN0cmluZ106VH07XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBzdGFydFN0YXRlOlQgPSBudWxsIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTdGF0ZSA9IHN0YXJ0U3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ3VyU3RhdGUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pS55Y+Y54q25oCBXHJcbiAgICAgICAgICogQHBhcmFtIHN0YXRlIOiuvue9rueKtuaAgVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBDaGFuZ2VTdGF0ZShzdGF0ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdGUuU2V0T3duZXIodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBjdXJTdGF0ZTpUID0gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgICAgICBpZihjdXJTdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhdGUuRW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VyU3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgY3VyU3RhdGUuU3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1clN0YXRlID0gY3VyU3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGN1clN0YXRlID0gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgICAgICBpZihjdXJTdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhdGUuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fb3duZXI6SUZTTTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3Rvcihvd25lcjpJRlNNID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9vd25lciA9IG93bmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFNldE93bmVyKG93bmVyOklGU00pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fb3duZXIgPSBvd25lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGUoKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgRW5kKCk7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFN0YXJ0KCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlTWdyXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGUoKTtcclxufSIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5pbXBvcnQge0Jhc2VGdW5jfSAgZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyYW1lV29ya1xyXG57XHJcbiAgICBfTWdyTWFwOkJhc2VGdW5jLk1hcDxCYXNlTWFuYWdlcj47Ly9CYXNlU3RydWN0Lk1hcDxCYXNlTWFuYWdlcj47XHJcbiAgICBfVGVtTWdyTGlzdDpBcnJheTxCYXNlTWFuYWdlcj47XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwID0gbmV3IEJhc2VGdW5jLk1hcDxCYXNlTWFuYWdlcj4oKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIF9GTTpGcmFtZVdvcms7XHJcbiAgICBzdGF0aWMgZ2V0IEZNKCk6RnJhbWVXb3JrXHJcbiAgICB7XHJcbiAgICAgICAgaWYoRnJhbWVXb3JrLl9GTT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZyYW1lV29yay5fRk0gPSBuZXcgRnJhbWVXb3JrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBGcmFtZVdvcmsuX0ZNO1xyXG4gICAgfVxyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbXBNZ3JMaXN0ID0gbmV3IEFycmF5PEJhc2VNYW5hZ2VyPih0aGlzLl9NZ3JNYXAuQ291bnQpO1xyXG4gICAgICAgIHRoaXMuX01nck1hcC5mb3JFYWNoKCAobWdyOkJhc2VNYW5hZ2VyICwga2V5OnN0cmluZyk6dm9pZCA9PntcclxuICAgICAgICAgICAgdGVtcE1nckxpc3QucHVzaChtZ3IpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGVtcE1nckxpc3QuZm9yRWFjaCgobWdyLGlkeCk9PnttZ3IuVXBkYXRlKCk7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZE1hbmFnZXI8VCBleHRlbmRzIEJhc2VNYW5hZ2VyPiggdHlwZTp7bmV3ICgpOiBUOyBOYW1lKCk6c3RyaW5nIH0gKTpUXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fTWdyTWFwLkhhcyh0eXBlLk5hbWUoKSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTWdyTWFwLkdldCh0eXBlLk5hbWUoKSkgYXMgVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld01ncjpUID0gbmV3IHR5cGUoKTtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAuU2V0KG5ld01ncix0eXBlLk5hbWUoKSk7XHJcbiAgICAgICAgcmV0dXJuICBuZXdNZ3I7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBHZXRNYW5hZ2VyPFQgZXh0ZW5kcyBCYXNlTWFuYWdlcj4odHlwZTp7bmV3ICgpOiBUOyBOYW1lKCk6c3RyaW5nIH0pOlR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX01nck1hcC5HZXQodHlwZS5OYW1lKCkpIGFzIFQ7XHJcbiAgICB9XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog5raI5oGv5o6n5Yi25ZmoXHJcbiAqL1xyXG5pbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuZXhwb3J0IG1vZHVsZSBNZXNzYWdlTUQge1xyXG4gICAgZXhwb3J0IGNvbnN0IEdhbWVFdmVudCA9XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJEZWF0aDogXCJQbGF5ZXJEZWF0aFwiLFxyXG4gICAgICAgICAgICBHYW1lVGltZVVwOiBcIkdhbWVUaW1lVXBcIixcclxuICAgICAgICAgICAgR2FtZUNvbnRpbnVlOiBcIkdhbWVDb250aW51ZVwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXNzYWdlQ2VudGVyIGV4dGVuZHMgQmFzZU1hbmFnZXIgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTWVzc2FnZUNlbnRlclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfTWdyOiBNZXNzYWdlQ2VudGVyO1xyXG4gICAgICAgIHByaXZhdGUgX0V2ZW50RGljdDogeyBbS2V5OiBzdHJpbmddOiBNRXZlbnQgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBfR2V0RXZlbnQobmFtZTogc3RyaW5nKTogTUV2ZW50ICB7XHJcbiAgICAgICAgICAgIHZhciBldmVudDogTUV2ZW50ID0gdGhpcy5fRXZlbnREaWN0W25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgPT0gdW5kZWZpbmVkIHx8IGV2ZW50ID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBNRXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0V2ZW50RGljdFtuYW1lXSA9IGV2ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV2ZW50ID0gdGhpcy5fRXZlbnREaWN0W25hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0ID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog5rOo5YaMXHJcbiAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiDlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7T2JqfSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJlZ2lzdChuYW1lOiBzdHJpbmcsIGFjdGlvbjogKCkgPT4gdm9pZCwgbGlzdGVuZXI6IE9iamVjdCk6TUV2ZW50ICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBuZXdEbGd0OiBEZWxlZ2F0ZSA9IG5ldyBEZWxlZ2F0ZShsaXN0ZW5lciwgYWN0aW9uKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuQWRkKG5ld0RsZ3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0RXZlbnRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOmUgOafkOS4quebkeWQrFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiDlp5TmiZhcclxuICAgICAgICAgKiBAcGFyYW0ge09ian0gbGlzdGVuZXIg55uR5ZCs6ICFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmVnaXN0KG5hbWU6IHN0cmluZywgYWN0aW9uOiAoKSA9PiB2b2lkLCBsaXN0ZW5lcjogT2JqZWN0KSAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6IE1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5SbXYoYWN0aW9uLCBsaXN0ZW5lcilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOmUgOafkOS4quS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERlc1JnaXN0SURLKG5hbWU6IHN0cmluZykgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuUmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBGaXJlKG5hbWU6IHN0cmluZywgcGFyYW06IGFueSA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lp5TmiZhcclxuICAgIGV4cG9ydCBjbGFzcyBEZWxlZ2F0ZSB7XHJcbiAgICAgICAgTGlzdGVuZXI6IE9iamVjdDtcclxuICAgICAgICBBY3Rpb246IChwYXJhbTphbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEV4ZWN1dGUocGFyYW06IGFueSA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aW9uLmNhbGwodGhpcy5MaXN0ZW5lciwgcGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihsaXN0ZW5lcjogT2JqZWN0LCBhY3Rpb246IChwYXJhbTphbnkpID0+IHZvaWQpICB7XHJcbiAgICAgICAgICAgIHRoaXMuTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICAgICAgdGhpcy5BY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/kuovku7ZcclxuICAgIGV4cG9ydCBjbGFzcyBNRXZlbnQge1xyXG4gICAgICAgIERlbGVnYXRlTGlzdDogQXJyYXk8RGVsZWdhdGU+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgdGhpcy5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIOa3u+WKoOWnlOaJmFxyXG4gICAgICAgICogQHBhcmFtIHtEZWxlZ2F0ZX0gZGxnIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICovXHJcbiAgICAgICAgQWRkKGRsZzogRGVsZWdhdGUpICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0LnB1c2goZGxnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDnp7vpmaTlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvbiDmtojmga/lkI3lrZdcclxuICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lciDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJtdihhY3Rpb246ICgpID0+IHZvaWQsIGxpc3RlbmVyOiBPYmplY3QgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB2YXIgZGxndExpc3Q6IEFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhcnJJZHg6IG51bWJlciA9IGRsZ3RMaXN0Lmxlbmd0aCAtIDE7IGFycklkeCA+IC0xOyAtLWFycklkeCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gZGxndC5BY3Rpb24gJiYgbGlzdGVuZXIgPT0gZGxndC5MaXN0ZW5lcikgIHtcclxuICAgICAgICAgICAgICAgICAgICBkbGd0TGlzdC5zcGxpY2UoYXJySWR4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldCgpICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0ID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDop6blj5FcclxuICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIEV4ZWN1dGUocGFyYW06IGFueSkgIHtcclxuICAgICAgICAgICAgdmFyIGRsZ3RMaXN0OiBBcnJheTxEZWxlZ2F0ZT4gPSB0aGlzLkRlbGVnYXRlTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgYXJySWR4OiBudW1iZXIgPSBkbGd0TGlzdC5sZW5ndGggLSAxOyBhcnJJZHggPiAtMTsgLS1hcnJJZHgpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGxndCA9IGRsZ3RMaXN0W2FycklkeF07XHJcbiAgICAgICAgICAgICAgICBkbGd0LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi8uLi9TY2VuZS9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIlxyXG5pbXBvcnQge0ZTTX0gZnJvbSBcIi4vLi4vQmFzZS9GU01cIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIG1fU2NlbmVGU006IFNjZW5lLlNjZW5lRlNNO1xyXG4gICAgcHJpdmF0ZSBtX1NjZW5lTm9kZTogTGF5YS5Ob2RlO1xyXG4gICAgXHJcbiAgICBnZXQgQ3VyU2NlbmUoKTpTY2VuZS5CYXNlU2NlbmUge1xyXG4gICAgICAgIGlmKHRoaXMubV9TY2VuZUZTTS5DdXJTdGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9TY2VuZUZTTS5DdXJTdGF0ZTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldCBDdXJEaXIoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTY2VuZS5EaXJlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNjZW5lTWFuYWdlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllciA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fQkdMYXllcik7XHJcblxyXG4gICAgICAgIHRoaXMubV9TY2VuZUZTTSA9IG5ldyBTY2VuZS5TY2VuZUZTTSgpO1xyXG4gICAgICAgIHRoaXMubV9TY2VuZU5vZGUgPSBMYXlhLnN0YWdlLmFkZENoaWxkKG5ldyBMYXlhLlNwcml0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2hhbmdlU2NlbmUobmV3U2NlbmU6IFNjZW5lLkJhc2VTY2VuZSkgIHtcclxuICAgICAgICB0aGlzLm1fU2NlbmVGU00uQ2hhbmdlU3RhdGUobmV3U2NlbmUpO1xyXG4gICAgICAgIGlmKG5ld1NjZW5lLlNjZW5lT2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX1NjZW5lTm9kZS5hZGRDaGlsZChuZXdTY2VuZS5TY2VuZU9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pen6YC76L6RXHJcbiAgICBwcml2YXRlIF9CRzogTGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9CR0xheWVyOiBMYXlhLlNwcml0ZTtcclxuICAgIFxyXG4gICAgc2V0IEJHKGJnOiBMYXlhLlNwcml0ZSkge1xyXG4gICAgICAgIGlmICghYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQkcpIHtcclxuICAgICAgICAgICAgdGhpcy5fQkcucmVtb3ZlU2VsZjtcclxuICAgICAgICAgICAgdGhpcy5fQkcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIHRoaXMuX0JHLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9CRy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyLmFkZENoaWxkKHRoaXMuX0JHKTtcclxuICAgIH1cclxuICAgIGdldCBCRygpOkxheWEuU3ByaXRlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9CRztcclxuICAgIH1cclxufVxyXG5cclxuLyoq5L2c6ICFTW9cclxuKiDlnLrmma/lip/og71cclxuKi9cclxuLypcclxuLy/lnLrmma/nrqHnkIZcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBfQkc6IExheWEuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBfQkdMYXllcjogTGF5YS5TcHJpdGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuX0JHTGF5ZXIpO1xyXG4gICAgICAgIC8v5re75Yqg5Zy65pmv566h55CGXHJcbiAgICAgICAgdGhpcy5TY2VuZU5vZGUgPSBMYXlhLnN0YWdlLmFkZENoaWxkKG5ldyBMYXlhLlNwcml0ZSgpKTtcclxuICAgIH1cclxuICAgIHNldCBCRyhiZzogTGF5YS5TcHJpdGUpIHtcclxuICAgICAgICBpZiAoIWJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX0JHKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLnJlbW92ZVNlbGY7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB0aGlzLl9CRy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fQkcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllci5hZGRDaGlsZCh0aGlzLl9CRyk7XHJcbiAgICB9XHJcbiAgICBnZXQgQkcoKTpMYXlhLlNwcml0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fQkc7XHJcbiAgICB9XHJcbiAgICBTY2VuZU5vZGU6IExheWEuTm9kZTtcclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNjZW5lTWFuYWdlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX0N1clNjZW5lOiBCYXNlU2NlbmU7XHJcbiAgICBnZXQgQ3VyU2NlbmUoKTogQmFzZVNjZW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU2NlbmU7XHJcbiAgICB9XHJcbiAgICBzZXQgQ3VyU2NlbmUodmFsdWU6IEJhc2VTY2VuZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9DdXJTY2VuZSAmJiB0aGlzLl9DdXJTY2VuZS5TY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9DdXJTY2VuZS5TY2VuZS5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0N1clNjZW5lID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N1clNjZW5lICYmIHRoaXMuX0N1clNjZW5lLlNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2NlbmVOb2RlLmFkZENoaWxkKHRoaXMuX0N1clNjZW5lLlNjZW5lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyRGlyKCk6IEJhc2VEaXJlY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0N1clNjZW5lLkN1ckRpcjtcclxuICAgIH1cclxuXHJcbiAgICBFbnRlclNjZW5lKHRhcmdldFNjZW5lOiBCYXNlU2NlbmUpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lID0gdGFyZ2V0U2NlbmU7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLkxlYXZlKHRhcmdldFNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUgIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZS5VcGRhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuKi8iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlRpbWVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1fU3RhcnRUaW1lOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9HYW1lVGltZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fRnJhbWVUaW1lOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Jc1BhdXNlZDpib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgU3RhcnRUaW1lcigpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fU3RhcnRUaW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBHYW1lVGltZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fR2FtZVRpbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9TdGFydFRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICB0aGlzLm1fR2FtZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMubV9GcmFtZVRpbWUgPSAxIC9OdW1iZXIoTGF5YS5zdGFnZS5mcmFtZVJhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKSAge1xyXG4gICAgICAgIGlmKHRoaXMubV9Jc1BhdXNlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0dhbWVUaW1lICs9IHRoaXMubV9GcmFtZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhdXNlKCl7XHJcbiAgICAgICAgdGhpcy5tX0lzUGF1c2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ29udGludWUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Jc1BhdXNlZCA9IGZhbHNlXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi91aS9CYXNlVUlcIlxyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBVSUZ1bmMgfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1VJRnVuY1wiXHJcbmltcG9ydCB7IEJhc2VGdW5jIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcbmVudW0gTm9kZVR5cGUge1xyXG4gICAgQm90dG9tLFxyXG4gICAgTWlkZGxlLFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHN0YXRpYyBnX1VJV2lkdGggPSA3NTA7XHJcbiAgICBzdGF0aWMgZ19VSUhlaWdodCA9IDEzMzQ7XHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBtX1Jvb3ROb2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgbV9Cb3R0b21Ob2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgbV9NaWRsZU5vZGU6IExheWEuQm94O1xyXG4gICAgcHJpdmF0ZSBfVUlEaWN0OiB7IFtuYW1lOiBzdHJpbmddOiBCYXNlVUkgfTtcclxuICAgIHByaXZhdGUgX1VwZGF0ZUNvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fVXBkYXRlVGltZTpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBBZGROb2RlKG5vZGU6IE5vZGVUeXBlKTogdm9pZCAge1xyXG4gICAgICAgIHZhciBub2RlQm94OiBMYXlhLkJveCA9IG5ldyBMYXlhLkJveCgpO1xyXG4gICAgICAgIG5vZGVCb3gudG9wID0gMDtcclxuICAgICAgICBub2RlQm94LmJvdHRvbSA9IDA7XHJcbiAgICAgICAgbm9kZUJveC5sZWZ0ID0gMDtcclxuICAgICAgICBub2RlQm94LnJpZ2h0ID0gMDtcclxuICAgICAgICBzd2l0Y2ggKG5vZGUpICB7XHJcbiAgICAgICAgICAgIGNhc2UgTm9kZVR5cGUuQm90dG9tOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0JvdHRvbU5vZGUgPSBub2RlQm94O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWlkbGVOb2RlID0gbm9kZUJveDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUm9vdE5vZGUuYWRkQ2hpbGQobm9kZUJveCk7XHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLmFkZENoaWxkKG5vZGVCb3gpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcgIHtcclxuICAgICAgICByZXR1cm4gXCJVSU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcm9vdEJveCA9IG5ldyBMYXlhLkJveCgpO1xyXG4gICAgICAgIHJvb3RCb3gud2lkdGggPSBVSU1hbmFnZXIuZ19VSVdpZHRoO1xyXG4gICAgICAgIHJvb3RCb3guaGVpZ2h0ID0gVUlNYW5hZ2VyLmdfVUlIZWlnaHQ7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChyb290Qm94KTtcclxuICAgICAgICB0aGlzLm1fUm9vdE5vZGUgPSByb290Qm94O1xyXG4gICAgICAgIHRoaXMub25TaXplQ2hhbmdlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLm1fUm9vdE5vZGUpO1xyXG4gICAgICAgIHRoaXMubV9VcGRhdGVUaW1lID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5BZGROb2RlKE5vZGVUeXBlLkJvdHRvbSk7XHJcbiAgICAgICAgdGhpcy5BZGROb2RlKE5vZGVUeXBlLk1pZGRsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fVUlEaWN0ID0ge307XHJcbiAgICAgICAgdGhpcy5fVXBkYXRlQ291bnQgPSAwO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5SRVNJWkUsIHRoaXMsIHRoaXMub25TaXplQ2hhbmdlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblNpemVDaGFuZ2UoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByb290Qm94ID0gdGhpcy5tX1Jvb3ROb2RlO1xyXG4gICAgICAgIFVJRnVuYy5GaXhVSShyb290Qm94LFVJTWFuYWdlci5nX1VJV2lkdGgpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIHNjYWxlID0gVUlGdW5jLkNvdW50U2NhbGVGaXgoVUlNYW5hZ2VyLmdfVUlXaWR0aCk7XHJcbiAgICAgICAgdmFyIHJvb3RCb3ggPSB0aGlzLm1fUm9vdE5vZGU7XHJcbiAgICAgICAgcm9vdEJveC5zY2FsZVggPSBzY2FsZTtcclxuICAgICAgICByb290Qm94LnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3guaGVpZ2h0ID0gVUlNYW5hZ2VyLmdfVUlIZWlnaHQgKiBzY2FsZTtcclxuICAgICAgICByb290Qm94LndpZHRoID0gVUlNYW5hZ2VyLmdfVUlXaWR0aDsqL1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCkgIHtcclxuICAgICAgICBcclxuICAgICAgICAvL+WumuW4p+WIt+aWsFVJXHJcbiAgICAgICAgaWYgKHRoaXMubV9VcGRhdGVUaW1lIDwgTGF5YS50aW1lci5jdXJyVGltZXIpICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkodGhpcy5tX0JvdHRvbU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVVJKHRoaXMubV9NaWRsZU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9VcGRhdGVUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXIgKyAzMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZVVJKG5vZGU6IExheWEuU3ByaXRlKSAge1xyXG4gICAgICAgIGZvciAobGV0IGlkeDogbnVtYmVyID0gMDsgaWR4IDwgbm9kZS5udW1DaGlsZHJlbjsgKytpZHgpICB7XHJcbiAgICAgICAgICAgIHZhciB1aTogQmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGlkeCkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICB1aS5VSVVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEFkZFVJKCkgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgU2hvdzxUIGV4dGVuZHMgQmFzZVVJPih1aUNsYXNzOiB7IG5ldyhuYW1lOiBzdHJpbmcpOiBUOyBOYW1lKCk6IHN0cmluZyB9KTogVCAge1xyXG4gICAgICAgIHZhciBzdHI6IHN0cmluZyA9IHVpQ2xhc3MuTmFtZSgpO1xyXG4gICAgICAgIHZhciBuZXdVSTogQmFzZVVJID0gdGhpcy5HZXRVSUJ5TmFtZShzdHIpO1xyXG4gICAgICAgIG5ld1VJID0gbmV3VUkgPT0gbnVsbCA/IHRoaXMuQWRkVUlCeU5hbWUoc3RyLCBuZXcgdWlDbGFzcyhzdHIpKSA6IG5ld1VJO1xyXG4gICAgICAgIHZhciBub2RlOiBMYXlhLlNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoIChuZXdVSS5VSVR5cGUpICB7XHJcbiAgICAgICAgICAgIC8v5Lit5bGC5qyhVUlcclxuICAgICAgICAgICAgY2FzZSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlOlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9NaWRsZU5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tX01pZGxlTm9kZS5udW1DaGlsZHJlbiA8PSAwKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6YCa55+l5a+85ryU5pqC5YGc5ri45oiPXHJcbiAgICAgICAgICAgICAgICAgICAgLy9BUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkN1ckRpci5UaW1lVXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNoaWxkTnVtOiBudW1iZXIgPSBub2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIC8v5oqK5LqS5pal55qE56qX5Y+j5YWz5o6JXHJcbiAgICAgICAgaWYgKG5ld1VJLklzTXV0ZXggJiYgY2hpbGROdW0gPiAwKSAge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVJID0gbm9kZS5nZXRDaGlsZEF0KG5vZGUubnVtQ2hpbGRyZW4gLSAxKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIGlmICghbGFzdFVJLklzTXV0ZXgpXHJcbiAgICAgICAgICAgICAgICBsYXN0VUkuSGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5hZGRDaGlsZChuZXdVSSk7XHJcbiAgICAgICAgbmV3VUkuT3Blbk9QKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdVSSBhcyBUO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKHVpOiBCYXNlVUkpICB7XHJcbiAgICAgICAgdWkucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIHVpLkNsb3NlT1AoKTtcclxuICAgICAgICB2YXIgbm9kZTogTGF5YS5TcHJpdGUgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAodWkuVUlUeXBlKSAge1xyXG4gICAgICAgICAgICAvL+S4reWxguasoVVJXHJcbiAgICAgICAgICAgIGNhc2UgQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fTWlkbGVOb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubnVtQ2hpbGRyZW4gPD0gMClcclxuICAgICAgICAgICAgICAgICAgICAvL+WFs+mXreeql+WPoyDpgJrnn6XmuLjmiI/nu6fnu61cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLkNvbnRpbnVlVGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGROdW06IG51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgaWYgKGNoaWxkTnVtID4gMCkgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSTogQmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGNoaWxkTnVtIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICBsYXN0VUkuT3Blbk9QKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIENsb3NlQ3VyVmlldygpICB7XHJcbiAgICAgICAgdmFyIHVpOiBCYXNlVUkgPSB0aGlzLm1fQm90dG9tTm9kZS5nZXRDaGlsZEF0KHRoaXMubV9Cb3R0b21Ob2RlLm51bUNoaWxkcmVuIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UodWkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yig6Zmk5omA5pyJ6IqC54K55LiK55qEVUlcclxuICAgIENsZWFyKCkgIHtcclxuICAgICAgICB2YXIgdWlOb2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VVSTogQmFzZVVJID0gdWlOb2RlLmdldENoaWxkQXQoMCkgYXMgQmFzZVVJOy8vLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlOb2RlID0gdGhpcy5tX01pZGxlTm9kZVxyXG4gICAgICAgIHdoaWxlICh1aU5vZGUubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEdldFVJQnlOYW1lKG5hbWU6IHN0cmluZyk6IEJhc2VVSSAge1xyXG4gICAgICAgIHZhciB1aSA9IHRoaXMuX1VJRGljdFtuYW1lXTtcclxuICAgICAgICB1aSA9IHVpID09IHVuZGVmaW5lZCA/IG51bGwgOiB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcbiAgICBBZGRVSUJ5TmFtZShuYW1lOiBzdHJpbmcsIHVpOiBCYXNlVUkpOiBCYXNlVUkgIHtcclxuICAgICAgICB0aGlzLl9VSURpY3RbbmFtZV0gPSB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJHYW1lLnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvUm9sZUVsZW1lbnQudHNcIixSb2xlRWxlbWVudCk7XG4gICAgICAgIHJlZyhcInNjcmlwdC9JdGVtRWxlbWVudC50c1wiLEl0ZW1FbGVtZW50KTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG4gLyoqXHJcbiAqIOihqOeOsOeUqOeahOWvueixoVxyXG4gKi9cclxuZXhwb3J0IG1vZHVsZSBBbmltT2JqXHJcbntcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBJbml0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9jb2luXzAxXCIpO1xyXG4gICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgIGZvciggbGV0IGNvdW50ID0wO2NvdW50IDwgMzA7Kytjb3VudCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHZW5BbmltT2JqPEFuaW1Db2luPihBbmltQ29pbixtb2RlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdlbkFuaW1PYmo8VCBleHRlbmRzIEJhc2VBbmltT2JqPiggYW5pbUNsYXNzOntuZXcgKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuU3ByaXRlM0QpOiBUOyBOYW1lKCk6c3RyaW5nIH0sbW9kZWw6TGF5YS5TcHJpdGUzRCApOlRcclxuICAgIHtcclxuICAgICAgICB2YXIgYW5pbU9iaiA9IExheWEuUG9vbC5nZXRJdGVtKGFuaW1DbGFzcy5OYW1lKCkpO1xyXG4gICAgICAgIGlmKGFuaW1PYmo9PW51bGwpXHJcbiAgICAgICAgICAgIGFuaW1PYmogPSBuZXcgYW5pbUNsYXNzKGFuaW1DbGFzcy5OYW1lKCksbW9kZWwpO1xyXG4gICAgICAgIHJldHVybiBhbmltT2JqO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBhYnN0cmFjdCBjbGFzcyBCYXNlQW5pbU9iaiBleHRlbmRzIExheWEuU3ByaXRlM0RcclxuICAgIHtcclxuICAgICAgICBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuU2NlbmVPYmouYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZnJhbWVMb29wKDEsdGhpcyx0aGlzLl9GcmFtZUZ1bmMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIE1vZGVsOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIF9OYW1lOnN0cmluZztcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyxtb2RlbDpMYXlhLlNwcml0ZTNEID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLl9OYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgdGhpcy5vbihMYXlhLkV2ZW50LlJFTU9WRUQsdGhpcyx0aGlzLl9MZWF2ZVN0YWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJvdGVjdGVkIF9GcmFtZUZ1bmMoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9KdWRnZUNvbXBsZXRlKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX0ZyYW1lTG9naWNGdW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5q+P5bin5omn6KGM6YC76L6R5Yqf6IO9XHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IF9GcmFtZUxvZ2ljRnVuYygpO1xyXG4gICAgICAgIC8v5Yik5pat5Lu75Yqh5a6M5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IF9KdWRnZUNvbXBsZXRlKCk6Ym9vbGVhbjtcclxuICAgICAgICAvL+eUn+WRveWRqOacn+e7k+adn+WkhOeQhlxyXG4gICAgICAgIHByb3RlY3RlZCBfTGVhdmVTdGFnZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lcih0aGlzLHRoaXMuX0ZyYW1lRnVuYyk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBGb3JjZUxlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9MZWF2ZVN0YWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgQW5pbUNvaW4gZXh0ZW5kcyBCYXNlQW5pbU9ialxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJBbmltQ29pblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBTZXRUYXJnZXQoIHRhcmdldDpMYXlhLlNwcml0ZTNEICkgICAgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9UYXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHN1cGVyLlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RhcmdldDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuTWVzaFNwcml0ZTNEID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKG5hbWUsbW9kZWwpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v5q+P5bin5omn6KGM6YC76L6R5Yqf6IO9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9GcmFtZUxvZ2ljRnVuYygpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRQb3NpdGlvbiA9IHRoaXMuX1RhcmdldC50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgYWRkUFMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zdWJ0cmFjdCh0YXJnZXRQb3NpdGlvbixwb3NpdGlvbixhZGRQUyk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zY2FsZShhZGRQUywwLjEsYWRkUFMpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKGFkZFBTLHBvc2l0aW9uLHBvc2l0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+eUn+WRveWRqOacn+e7k+adn+WkhOeQhlxyXG4gICAgICAgIHByb3RlY3RlZCBfTGVhdmVTdGFnZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLl9MZWF2ZVN0YWdlKCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkTG9naWNHb2xkKDEpO1xyXG4gICAgICAgICAgICBMYXlhLlBvb2wucmVjb3Zlcih0aGlzLm5hbWUsdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yik5pat5Lu75Yqh5a6M5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9KdWRnZUNvbXBsZXRlKCk6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBvc2l0aW9uID0gdGhpcy5fVGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBkaXNEaXIgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zdWJ0cmFjdCh0YXJnZXRQb3NpdGlvbixwb3NpdGlvbixkaXNEaXIpO1xyXG4gICAgICAgICAgICBpZiggTGF5YS5WZWN0b3IzLnNjYWxhckxlbmd0aFNxdWFyZWQoZGlzRGlyKTwwLjEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IHsgUGxheWVyQ29udHJvbGVyIH0gZnJvbSBcIi4vLi4vR2FtZS9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL0lucHV0XCI7XHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi9HYW1lU3RydWN0XCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vLi4vR2FtZS9TdGVwXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5leHBvcnQgbW9kdWxlIFBsYXllckJ1ZmYge1xyXG4gICAgZXhwb3J0IGNsYXNzIEJhc2VQbGF5ZXJCdWZmICB7XHJcbiAgICAgICAgVHlwZTogSXRlbS5JdGVtVHlwZTtcclxuICAgICAgICBJZHg6IG51bWJlcjtcclxuICAgICAgICBQbGF5ZXI6IFBsYXllcjtcclxuICAgICAgICBVcGRhdGUoKSAge1xyXG4gICAgICAgIH1cclxuICAgICAgICBHZW5CdWZmTW9kKCkgIHtcclxuICAgICAgICAgICAgdGhpcy5fQnVmZk1vZCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlU3BoZXJlKDAuMywgOCwgOCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgICAgIC8v5Yib5bu65qih5Z6L5pi+56S65a+56LGhXHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkFkZEJ1ZmZNb2RlKHRoaXMuX0J1ZmZNb2QpO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5GbHkoKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fU3RhcnRGdW5jICE9IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TdGFydEZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQ29tcGxldGUoKSAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5Db21wbGV0ZUJ1ZmYodGhpcy5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTW9kLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBwcm90ZWN0ZWQgX0J1ZmZNb2Q6IExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IodHlwZTogSXRlbS5JdGVtVHlwZSwgaWR4OiBudW1iZXIgPSAwKSAge1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLklkeCA9IGlkeDtcclxuICAgICAgICAgICAgdGhpcy5HZW5CdWZmTW9kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0RnVuYzogKCkgPT4gdm9pZDtcclxuICAgIH1cclxuICAgIGNsYXNzIEZseUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiAge1xyXG4gICAgICAgIFNwZWVkOiBudW1iZXI7XHJcbiAgICAgICAgRmxvb3I6IG51bWJlcjtcclxuXHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTogbnVtYmVyICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPSB0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZSAvIDIgKiB0aGlzLkZsb29yO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCgpKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TZXRTYWZlUFModGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbFo6IG51bWJlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDogbnVtYmVyID0gMC4xLCBmbG9vcjogbnVtYmVyID0gMTApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW0uSXRlbVR5cGUuUm9wZSwgUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX0ZpbmFsWiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLnogPiAtMC4yKSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Qb3BDdHJsZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3MgUHJvdGVjdEJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiAge1xyXG4gICAgICAgIFRpbWU6IG51bWJlcjtcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6IG51bWJlciA9IDApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW0uSXRlbVR5cGUuUHJvdGVjdCwgUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgLy90aGlzLlRpbWUgPSBBUFAuU2NlbmVNYW5hZ2VyLkN1ckRpci5HYW1lVGltZSt0aW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAge1xyXG4gICAgICAgICAgICAvKlxyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU8QVBQLlNjZW5lTWFuYWdlci5DdXJEaXIuR2FtZVRpbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBWaW5lQnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmICB7XHJcbiAgICAgICAgQ291bnRUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgSW5wdXREaXI6IGJvb2xlYW47XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQodGhpcywgdGhpcy5fSW5wdXQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ29tcGxldGUoKSAge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvdW50VGltZTogbnVtYmVyID0gMywgaW5wdXREaXI6IGJvb2xlYW4gPSB0cnVlKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtLkl0ZW1UeXBlLlZpbmUsIDApO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50VGltZSA9IGNvdW50VGltZTtcclxuICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9IGlucHV0RGlyO1xyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZTtcclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpc1JpZ2h0OiBib29sZWFuKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5JbnB1dERpciA9PSBpc1JpZ2h0KSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9ICF0aGlzLklucHV0RGlyO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLkNvdW50VGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5Db3VudFRpbWUgPCAwKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9TaG93R2FtZUluZm8oKSAge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzogc3RyaW5nO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Db3VudFRpbWUgPCAwKVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLklucHV0RGlyID09IHRydWUgPyBcIlJpZ2h0XCIgOiBcIkxlZnRcIjtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImV4cG9ydCBtb2R1bGUgQ2hhcmFjdGVyXHJcbntcclxuICAgIGV4cG9ydCBlbnVtIEFuaW1FbnVtXHJcbiAgICB7XHJcbiAgICAgICAgU3RhbmQsXHJcbiAgICAgICAgRmx5LFxyXG4gICAgICAgIEZhbGwsXHJcbiAgICAgICAgSnVtcCxcclxuICAgICAgICBKdW1wZG93blxyXG4gICAgfVxyXG4gICAgdmFyIEFuaW1UeXBlOntbbmFtZTpudW1iZXJdOnN0cmluZ307XHJcbiAgICBBbmltVHlwZSA9IHt9O1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uU3RhbmRdID0gXCJzdGFuZFwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uSnVtcF0gPSBcImp1bXB1cFwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uSnVtcGRvd25dID0gXCJqdW1wZG93blwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uRmx5XSA9IFwiZmx5XCI7XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5GYWxsXSA9IFwiZmFsbFwiO1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFBsYXllckFuaW1OYW1lKCBuYW1lRW51bTpBbmltRW51bSApOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBBbmltVHlwZVtuYW1lRW51bV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJBbmltYXRvclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgbV9BbmltYXRvcjpMYXlhLkFuaW1hdG9yO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBQbGF5ZXJDaGFyYWN0ZXI6TGF5YS5TcHJpdGUzRCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBQbGF5ZXJDaGFyYWN0ZXIuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgU3dpdGNoU3RhdGUoIEFuaW1FbnVtIClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG4vL+a4uOaIj+S4reebuOaculxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ2FtZXJhIGV4dGVuZHMgTGF5YS5DYW1lcmFcclxue1xyXG4gICAgQ3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyO1xyXG4gICAgQmFzZVBTOkxheWEuVmVjdG9yMztcclxuICAgIER5bmFtaWNQUzpMYXlhLlZlY3RvcjM7XHJcbiAgICBQbGF5ZXI6UGxheWVyO1xyXG5cclxuICAgIFNldFBsYWVyKHBsYXllcjpQbGF5ZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFJlc2V0KER5bmFtaWNQUzpMYXlhLlZlY3RvcjMsYmFzZVBTOkxheWEuVmVjdG9yMyxwbGF5ZXI6UGxheWVyIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IGJhc2VQUztcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IER5bmFtaWNQUztcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul+W5tuiuvue9ruS9jee9rlxyXG4gICAgQ291bnRTZXRQUygpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZCh0aGlzLkJhc2VQUyx0aGlzLkR5bmFtaWNQUyxuZXdQUyk7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbihwczpMYXlhLlZlY3RvcjMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBwcy5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAgeyAgIFxyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIgPSBuZXcgR2FtZUNhbWVyYUN0cmxlcih0aGlzKTtcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5CYXNlUFMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIC8vdGhpcy50aW1lckxvb3AoMSx0aGlzLkN0cmxlcix0aGlzLkN0cmxlci5VcGRhdGUpO1xyXG4gICAgICAgIHRoaXMuZnJhbWVMb29wKDEsdGhpcyx0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHZhciBza3lCb3g6TGF5YS5Ta3lCb3ggPW5ldyBMYXlhLlNreUJveCgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJGbGFnID0gTGF5YS5CYXNlQ2FtZXJhLkNMRUFSRkxBR19TS1k7XHJcbiAgICAgICAgLy9DYW1lcmEuc2t5UmVuZGVyZXIgPSBza3lCb3guX3JlbmRlcjtcclxuICAgICAgICAvL3RoaXMuc2sgPSBza3lCb3g7XHJcbiAgICAgICAgIC8vcGF0aFxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN0cmxlci5VcGRhdGUoKTtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVDYW1lcmFDdHJsZXJcclxue1xyXG4gICAgQ2FtZXJhOkdhbWVDYW1lcmE7XHJcbiAgICBDdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXI7XHJcbiAgICBhYnN0cmFjdCBVcGRhdGUoKTp2b2lkO1xyXG4gICAgY29uc3RydWN0b3IoIGNhbWVyYTpHYW1lQ2FtZXJhLGN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlciA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGN0cmxlciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBjdHJsZXIgPSB0aGlzOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBjYW1lcmE7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIgPSBjdHJsZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDYW1lcmFDdHJsZXIgZXh0ZW5kcyBCYXNlR2FtZUNhbWVyYUN0cmxlclxyXG57XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuQ2FtZXJhPT1udWxsfHwgdGhpcy5DYW1lcmEuUGxheWVyID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBDYW1lcmFQUyA9IHRoaXMuQ2FtZXJhLkR5bmFtaWNQUztcclxuICAgICAgICB2YXIgUGxheWVyUFMgPSB0aGlzLkNhbWVyYS5QbGF5ZXIuX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlzTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggTWF0aC5hYnMoZGlzWk51bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnogKz0gZGlzWk51bSowLjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNhbWVyYS5EeW5hbWljUFMgPUNhbWVyYVBTO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLkNvdW50U2V0UFMoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW1lcmE6R2FtZUNhbWVyYSxjdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXIgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGNhbWVyYSxjdHJsZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi9HYW1lU3RydWN0XCJcclxuaW1wb3J0IHtQbGF5ZXJCdWZmfSBmcm9tIFwiLi9CdWZmXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0FuaW1PYmp9IGZyb20gXCIuLy4uL0dhbWUvQW5pbU9ialwiXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IHtQbGF5ZXJDb250cm9sZXJ9IGZyb20gXCIuL1BsYXllckN0cmxlclwiXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vSW5wdXRcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbnR5cGUgQmFzZVBsYXllckJ1ZmYgPSBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmO1xyXG50eXBlIEFuaW1Db2luID0gQW5pbU9iai5BbmltQ29pblxyXG5cclxuZXhwb3J0IG1vZHVsZSBJdGVtXHJcbntcclxuICAgIC8v54mp5ZOB5qCH6K+GXHJcbiAgICBjb25zdCBJdGVtSUQ6c3RyaW5nID0gXCJJdGVtXCI7XHJcbiAgICBjb25zdCBNb2RlbElEOnN0cmluZyA9XCJNb2RlbFwiXHJcbiAgICBleHBvcnQgZW51bSBNb2RlbFR5cGVcclxuICAgIHtcclxuICAgICAgICBDb2luXHJcbiAgICB9XHJcbiAgICBleHBvcnQgZW51bSBJdGVtVHlwZSB7XHJcbiAgICAgICAgTm9uZT0wLFxyXG4gICAgICAgIEVtcHR5LFxyXG4gICAgICAgIFJvY2ssXHJcbiAgICAgICAgVGhvcm4sXHJcbiAgICAgICAgVmluZSxcclxuICAgICAgICBQcm90ZWN0PTExLFxyXG4gICAgICAgIEhvbHlQcm90ZWN0LFxyXG4gICAgICAgIEZseSxcclxuICAgICAgICBSb3BlLFxyXG4gICAgICAgIENvbGxlY3RvcixcclxuICAgICAgICBDb2luPTIwLFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgTGluZUl0ZW1JbmZvXHJcbiAgICB7XHJcbiAgICAgICAgVHlwZTpJdGVtVHlwZTtcclxuICAgICAgICBOdW1iZXI6bnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCB0eXBlOkl0ZW1UeXBlLG51bTpudW1iZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5OdW1iZXIgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eJqeWTgeW4g+WxgFxyXG4gICAgZXhwb3J0IGNsYXNzIEl0ZW1MYXlvdXRcclxuICAgIHtcclxuICAgICAgICBSZXdhcmRMaXN0OkFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIEJhcnJpZXJMaXN0OkFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0ID0gbmV3IEFycmF5PExheUl0ZW1NZ3I+KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsMSxJdGVtVHlwZS5FbXB0eSwxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsNSxJdGVtVHlwZS5Sb2NrLDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwyLEl0ZW1UeXBlLlRob3JuLDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwyLEl0ZW1UeXBlLlZpbmUsMTApKVxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwxLEl0ZW1UeXBlLkNvaW4pKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsMSxJdGVtVHlwZS5GbHksMjApKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsMSxJdGVtVHlwZS5Db2xsZWN0b3IpKVxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwxLEl0ZW1UeXBlLlByb3RlY3QpKTtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsMSxJdGVtVHlwZS5Ib2x5UHJvdGVjdCkpO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBSZXNldEl0ZW1GYWN0b3J5KCApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBUYWtlTGluZVJld2FyZChmbG9vcjpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vcix0aGlzLlJld2FyZExpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBUYWtlTGluZURpZmZpY3VsdHkoZmxvb3I6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVGFrZUl0ZW0oZmxvb3IsdGhpcy5CYXJyaWVyTGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgVGFrZUl0ZW0oZmxvb3I6bnVtYmVyLCBNZ3JMaXN0OkFycmF5PExheUl0ZW1NZ3I+KTpBcnJheTxMaW5lSXRlbUluZm8+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgcmV0dXJuSW5mbyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgICAgIGZvciggdmFyIGxpc3RJZHggPSAwOyBsaXN0SWR4IDwgTWdyTGlzdC5sZW5ndGg7ICsrbGlzdElkeCApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE1nckxpc3RbbGlzdElkeF0uT25GbG9vcihmbG9vcik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mbzpMaW5lSXRlbUluZm8gPSBNZ3JMaXN0W2xpc3RJZHhdLlRha2VJdGVtcyhmbG9vcik7XHJcbiAgICAgICAgICAgICAgICBpZihpbmZvLk51bWJlcj4wKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkluZm8ucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuSW5mbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v6K+l5a+56LGh55qE5YiG5biD5Zu+5q+P5bGC562J5qaC546H5YiG5biDXHJcbiAgICBleHBvcnQgY2xhc3MgTGF5SXRlbU1nclxyXG4gICAge1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgSXRlbVR5cGU6SXRlbVR5cGU7XHJcbiAgICAgICAgLy/lvZPliY3lsYLmlbBcclxuICAgICAgICBDdXJGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgLy/ljLrpl7TliIbluIPmgLvmlbDph49cclxuICAgICAgICBJdGVtTnVtOm51bWJlcjtcclxuICAgICAgICAvL+W8gOWni+WIhuW4g+eahOWxguaVsFxyXG4gICAgICAgIFN0YXJ0Rmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIC8v5YiG5biD5Yy66Ze0XHJcbiAgICAgICAgLy/lt7Lojrflj5blsYLmoIforrBcclxuICAgICAgICBUb3VjaGVkRmxvb3I6bnVtYmVyO1xyXG4gICAgICAgIEl0ZW1MaXN0OkFycmF5PG51bWJlcj47XHJcbiAgICAgICAgLy9yYW5nZeWMuumXtOiMg+WbtFxyXG4gICAgICAgIC8vbnVtIOWMuumXtOiMg+WbtOaVsOmHj1xyXG4gICAgICAgIC8vaXRlbVR5cGUg55Sf5Lqn55qE6YGT5YW357G75Z6LXHJcbiAgICAgICAgLy9zdGFydEZsb29yIOS7juWTquS4gOihjOW8gOWni+aKleaOt1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCByYW5nZTpudW1iZXIsbnVtOm51bWJlcixpdGVtVHlwZTpJdGVtVHlwZSxzdGFydEZsb29yOm51bWJlciA9IDEgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYobnVtID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICBudW0gPSAxO1xyXG4gICAgICAgICAgICBpZihzdGFydEZsb29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIC8v56ysMOWxguaYr+eOqeWutui1t+atpeS9jee9rlxyXG4gICAgICAgICAgICAgICAgc3RhcnRGbG9vciA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5DdXJGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbU51bSA9IG51bTtcclxuICAgICAgICAgICAgLy/liIbluIPlm74g54mp5ZOBaWR4OuWxguaVsFxyXG4gICAgICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5PG51bWJlcj4ocmFuZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuR2VuTWFwKHN0YXJ0Rmxvb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBSYW5nZSgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLkl0ZW1MaXN0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsYLmm7TmlrDlh73mlbBcclxuICAgICAgICBPbkZsb29yKGZsb29yOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGZsb29yPHRoaXMuVG91Y2hlZEZsb29yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoZmxvb3I+PXRoaXMuU3RhcnRGbG9vciArIHRoaXMuUmFuZ2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2VuTWFwKGZsb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUn+aIkOWIhuW4g+WbvlxyXG4gICAgICAgIEdlbk1hcChzdGFydEZsb29yOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnRGbG9vciA9IHN0YXJ0Rmxvb3I7XHJcbiAgICAgICAgICAgIHZhciBpdGVtTnVtID0gdGhpcy5JdGVtTnVtO1xyXG4gICAgICAgICAgICBmb3IobGV0IGNvdW50Om51bWJlciA9IDA7IGNvdW50PCB0aGlzLkl0ZW1MaXN0Lmxlbmd0aDsrK2NvdW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkl0ZW1MaXN0W2NvdW50XSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGl0ZW1MaXN0ID0gdGhpcy5JdGVtTGlzdDtcclxuICAgICAgICAgICAgZm9yKHZhciBjb3VudE51bTpudW1iZXIgPSAwOyBjb3VudE51bTxpdGVtTnVtOysrY291bnROdW0pXHJcbiAgICAgICAgICAgIHsgICBcclxuICAgICAgICAgICAgICAgIHZhciBJdGVtRmxvb3I6bnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRoaXMuUmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JdGVtTGlzdFtJdGVtRmxvb3JdICs9MTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIFRha2VJdGVtcyggZmxvb3I6bnVtYmVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVG91Y2hlZEZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGluZUl0ZW1JbmZvKHRoaXMuSXRlbVR5cGUsdGhpcy5JdGVtTGlzdFtmbG9vciAtIHRoaXMuU3RhcnRGbG9vcl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgdmFyIFJlc2V0OmJvb2xlYW47XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUmVzZXRJdGVtRmFjdG9yeSggKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYoUmVzZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBSZXNldCA9dHJ1ZTtcclxuICAgICAgICBmb3IodmFyIHRoZUtleSBpbiBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gcGFyc2VJbnQodGhlS2V5KTtcclxuICAgICAgICAgICAgaWYodHlwZSA8PSAyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZSA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKCBsZXQgY291bnQgPTA7Y291bnQgPCAzMDsrK2NvdW50IClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXM6IGFueSA9IEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW06U3RlcCA9IG5ldyBjbGFzKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoSXRlbUlEK3RoZUtleSxpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTdGVwSXRlbUZhY3RvcnkoIGl0ZW1UeXBlOkl0ZW1UeXBlLFN0ZXApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoU3RlcCA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaXRlbVxyXG4gICAgICAgIHZhciBvYmpQb29sID0gTGF5YS5Qb29sO1xyXG4gICAgICAgIGl0ZW0gPSBvYmpQb29sLmdldEl0ZW0oSXRlbUlEK2l0ZW1UeXBlKVxyXG4gICAgICAgIGlmKGl0ZW09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV0hPW51bGwmJkdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXSE9dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xhczogYW55ID0gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBjbGFzKFN0ZXApO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IFN0ZXBJdGVtKGl0ZW1UeXBlLFN0ZXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5TdGVwID0gU3RlcDtcclxuICAgICAgICBpdGVtLlJlc2V0SXRlbSgpO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBTdGVwOlN0ZXA7XHJcbiAgICAgICAgSXRlbVR5cGU6SXRlbVR5cGU7XHJcbiAgICAgICAgTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBwcml2YXRlIG1fQW5pbWF0b3I6TGF5YS5BbmltYXRvcjtcclxuICAgICAgICBnZXQgSXNEaWZmaWN1bHR5KCk6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGU+MCYmdGhpcy5JdGVtVHlwZTwxMCYmdGhpcy5JdGVtVHlwZSE9IEl0ZW1UeXBlLlZpbmU7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/liKTmlq3og73kuI3og73otbDkuIrljrtcclxuICAgICAgICBnZXQgSXNGb3JiaWRlbigpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkl0ZW1UeXBlID09IEl0ZW1UeXBlLlJvY2s7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6YeN572uXHJcbiAgICAgICAgUmVzZXRJdGVtKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5fSW5pdEl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLlNldEVuYWJsZSgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLk1vZGVsIT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGVwLmFkZENoaWxkKHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgU2V0RW5hYmxlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuTW9kZWw9PW51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsLmFjdGl2ZSA9dHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUHV0SXRlbSA9IGZ1bmN0aW9uKCBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmUgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5EZXNQYXduKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcC5TdGVwSXRlbSA9IFN0ZXBJdGVtRmFjdG9yeShpdGVtVHlwZSx0aGlzLlN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v5raI6ZmkIOaKiuiHquW3seWtmOWFpeWGheWtmOaxoFxyXG4gICAgICAgIERlc1Bhd24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5Nb2RlbCE9bnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuTW9kZWwucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB2YXIgb2JqUG9vbCA9IExheWEuUG9vbDsvL0dNLk9ialBvb2w7XHJcbiAgICAgICAgICAgIG9ialBvb2wucmVjb3ZlcihJdGVtSUQrdGhpcy5JdGVtVHlwZSx0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHBsYXllciBcclxuICAgICAgICAgKi9cclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3dpdGNoKHRoaXMuSXRlbVR5cGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOeqgeegtOS/neaKpFxyXG4gICAgICAgICAqIEByZXR1cm5zIOaYr+WQpuiiq+eqgeegtFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEJyZWFrUHJvdGVjdChwbGF5ZXI6UGxheWVyKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY3VyQnVmZiA9IHBsYXllci5HZXRCdWZmKFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIGlmKGN1ckJ1ZmYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaChjdXJCdWZmLlR5cGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Qcm90ZWN0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJCdWZmLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvciggaXRlbVR5cGU6SXRlbVR5cGUsU3RlcDpTdGVwIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGl0ZW1UeXBlID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcCA9IFN0ZXA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbD0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fSW5pdEl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIF9BZGRCdWZmVG9QbGF5ZXIocGxheWVyOlBsYXllcixidWZmOkJhc2VQbGF5ZXJCdWZmKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGxheWVyLkFkZEJ1ZmYoYnVmZikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0luaXRJdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIHRoaXMuTW9kZWwhPW51bGwmJiF0aGlzLk1vZGVsLmRlc3Ryb3llZCApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCwwKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuX0dlbkl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLk1vZGVsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gdGhpcy5Nb2RlbC5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuTW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfVGVzdEdlbnRJdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsO1xyXG4gICAgICAgICAgICBzd2l0Y2godGhpcy5JdGVtVHlwZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Sb2NrOlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuTm9uZTpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjMsIDAuMywgMC41KSk7ICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLkl0ZW1UeXBlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvY2s6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjMsIDAuMywgMC41KSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xhc3MgUm9jayBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBNb2RlbE51bSA9IDM7XHJcbiAgICAgICAgY29uc3RydWN0b3IoU3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9jayxTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuTWVzaFNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IDErTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKlJvY2suTW9kZWxOdW0pO1xyXG4gICAgICAgICAgICB2YXIgTmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzBcIitpZHgpXHJcbiAgICAgICAgICAgIG1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKE5hbWUpXHJcbiAgICAgICAgICAgIG1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb2NrXSA9IFJvY2s7XHJcbiAgICBcclxuICAgIGNsYXNzIFRob3JuIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihTdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5UaG9ybixTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLkJyZWFrUHJvdGVjdChwbGF5ZXIpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5pbTpMYXlhLkFuaW1hdG9yID0gdGhpcy5Nb2RlbC5nZXRDaGlsZEF0KDApLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShcInRvdWNoXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuVGhvcm5dID0gVGhvcm47XHJcbiAgICBcclxuICAgIGNsYXNzIFByb3RlY3QgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlByb3RlY3Qsc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYocGxheWVyLkdldEJ1ZmYoUHJvdGVjdEJ1ZmYuSWR4KSE9bnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5fQWRkQnVmZlRvUGxheWVyKHBsYXllcixuZXcgUHJvdGVjdEJ1ZmYoMzAwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlByb3RlY3RdID0gUHJvdGVjdDtcclxuICAgIFxyXG4gICAgY2xhc3MgUHJvdGVjdEJ1ZmYgZXh0ZW5kcyBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgVGltZTpudW1iZXI7XHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gdGltZSDmjIHnu63ml7bpl7RcclxuICAgICAgICAgKiBAcGFyYW0gSXNIb2x5IOaYr+WQpue7neWvueaXoOaVjFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6bnVtYmVyID0gMCwgSXNIb2x5OmJvb2xlYW4gPSBmYWxzZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKElzSG9seSA/IEl0ZW1UeXBlLkhvbHlQcm90ZWN0Okl0ZW1UeXBlLlByb3RlY3QsUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lVGltZSt0aW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5UaW1lPENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVRpbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsYXNzIEhvbHlQcm90ZWN0IGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Ib2x5UHJvdGVjdCxzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKFByb3RlY3RCdWZmLklkeCkhPW51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXIsbmV3IFByb3RlY3RCdWZmKDMwMDAsdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkhvbHlQcm90ZWN0XSA9IEhvbHlQcm90ZWN0O1xyXG5cclxuICAgIGNsYXNzIENvaW4gZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIC8vVG9Eb1xyXG4gICAgICAgIHByaXZhdGUgbV90b3VjaGVkOkJvb2xlYW5cclxuICAgICAgICBGbHlUb1BsYXllcihwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNvbmluOkFuaW1Db2luID0gQW5pbU9iai5HZW5BbmltT2JqPEFuaW1Db2luPihBbmltT2JqLkFuaW1Db2luLHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICBjb25pbi5TZXRUYXJnZXQocGxheWVyKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRHb2xkVW5Mb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRHb2xkKDEpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvaW4sc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29pbl0gPSBDb2luO1xyXG4gICAgXHJcbiAgICBjbGFzcyBDb2xsZWN0ZXIgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZihDb2xsZWN0QnVmZi5JZHgpIT1udWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgQ29sbGVjdEJ1ZmYoMTAwMDApKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6U3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3RvcixzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxKyBNYXRoLnJhbmRvbSgpKjIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRfMDFcIik7XHJcbiAgICAgICAgICAgIHZhciB0aGVNb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSB0aGVNb2RlbC5jbG9uZSgpOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29sbGVjdG9yXSA9IENvbGxlY3RlcjtcclxuICAgIFxyXG4gICAgY2xhc3MgQ29sbGVjdEJ1ZmYgZXh0ZW5kcyBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgVGltZTpudW1iZXI7XHJcbiAgICAgICAgR2FtZURpcjpHYW1lRGlyZWN0b3I7XHJcbiAgICAgICAgQ291bnRGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOm51bWJlciA9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Qcm90ZWN0LENvbGxlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZURpciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXI7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IHRoaXMuR2FtZURpci5HYW1lVGltZSt0aW1lO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50Rmxvb3IgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudEZsb29yID0gdGhpcy5HYW1lRGlyLkdhbWVQbGF5LlBsYXllckZsb29yIC0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuVGltZTx0aGlzLkdhbWVEaXIuR2FtZVRpbWUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5HYW1lRGlyLkdhbWVQbGF5LlBsYXllckZsb29yIC0gdGhpcy5Db3VudEZsb29yKzE8MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVEaXIuR2FtZVBsYXkuTG9vcERvRmxvb3JTdGVwKHRoaXMuQ291bnRGbG9vcix0aGlzLHRoaXMuQ291bnRDb2lucyk7XHJcbiAgICAgICAgICAgICAgICArK3RoaXMuQ291bnRGbG9vcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIENvdW50Q29pbnMoc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoc3RlcC5TdGVwSXRlbS5JdGVtVHlwZSA9PSBJdGVtVHlwZS5Db2luKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgQ29pbjpDb2luID0gc3RlcC5TdGVwSXRlbSBhcyBDb2luO1xyXG4gICAgICAgICAgICAgICAgQ29pbi5GbHlUb1BsYXllcih0aGlzLlBsYXllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsYXNzIEZMeSBleHRlbmRzIFN0ZXBJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKCBwbGF5ZXI6UGxheWVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHBsYXllci5HZXRCdWZmKDApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgRmx5QnVmZigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuRmx5LHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDErIE1hdGgucmFuZG9tKCkqMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2ZseWVyXzAxXCIpO1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpOyBcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsOyAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5GbHldID0gRkx5O1xyXG4gICAgXHJcbiAgICBjbGFzcyBGbHlCdWZmIGV4dGVuZHMgUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIFNwZWVkOm51bWJlcjtcclxuICAgICAgICBGbG9vcjpudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICB2YXIgdGltZTpudW1iZXIgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICAgICAgaWYocGxheWVyLkN1clN0ZXAgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9dGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gcGxheWVyLlBvc2l0aW9uLnogLSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMip0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCgpKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TZXRTYWZlUFModGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHBsYXllci5GbHlQcmVwYXJlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDpudW1iZXI9MC4xNSxmbG9vcjpudW1iZXI9MTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5GbHksUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwOyBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5fRmluYWxaIC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24uej4tMC4yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HZXRTdGVwQnlMb2NhdGlvbih0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuUG9wQ3RybGVyKCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsYXNzIFJvcGUgZXh0ZW5kcyBTdGVwSXRlbVxyXG4gICAge1xyXG4gICAgICAgIFRvdWNoSXRlbSggcGxheWVyOlBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihwbGF5ZXIuR2V0QnVmZigwKSlcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYobmV3IFJvcGVCdWZmKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb3BlLHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuTWVzaFNwcml0ZTNEID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4xLDAuNSwwLjEpKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7ICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlJvcGVdID0gUm9wZTtcclxuICAgIFxyXG4gICAgY2xhc3MgUm9wZUJ1ZmYgZXh0ZW5kcyBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgU3BlZWQ6bnVtYmVyO1xyXG4gICAgICAgIEZsb29yOm51bWJlcjtcclxuICAgICAgICBcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlBsYXllciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5fRmluYWxaIC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24uej4tMC4yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDpTdGVwID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HZXRTdGVwQnlMb2NhdGlvbih0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuRW5kKHN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEVuZChzdGVwOlN0ZXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5Qb3BDdHJsZXIoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydChwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPXRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlLzIqdGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBmbHlDdHJsID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJGbHkodGhpcy5TcGVlZCk7XHJcbiAgICAgICAgICAgIGZseUN0cmwuU2V0UGxheWVyKHBsYXllcilcclxuICAgICAgICAgICAgcGxheWVyLkFkZEN0cmxlcihmbHlDdHJsKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQodGhpcyx0aGlzLl9JbnB1dCkpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNldFNhZmVQUyh0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOkdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjpudW1iZXI7ICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6bnVtYmVyPTAuMSxmbG9vcjpudW1iZXI9MTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb3BlLFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gMDsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpc1JpZ2h0OmJvb2xlYW4pOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZUZsb29yID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vckxpbmU7XHJcbiAgICAgICAgICAgIGlmKGNsb3NlRmxvb3IuRmxvb3JOdW0lMiE9IHRoaXMuX0ZpbmFsTG9jYXRpb24uWSUyKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZUZsb29yID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HZXRGbG9vckJ5Rmxvb3IoY2xvc2VGbG9vci5GbG9vck51bSArMSApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdGVwOlN0ZXAgPSBjbG9zZUZsb29yLkdldFN0ZXAoIHRoaXMuX0ZpbmFsTG9jYXRpb24uWCApO1xyXG4gICAgICAgICAgICBpZihpc1JpZ2h0KVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGlmKHN0ZXAuU3RlcEl0ZW0uSXNGb3JiaWRlbilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5FbmQoc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGFzcyBWaW5lIGV4dGVuZHMgU3RlcEl0ZW1cclxuICAgIHtcclxuICAgICAgICBUb3VjaEl0ZW0oIHBsYXllcjpQbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGN1ckJ1ZmY6QmFzZVBsYXllckJ1ZmYgPSBwbGF5ZXIuR2V0QnVmZigwKTtcclxuICAgICAgICAgICAgaWYoIXRoaXMuQnJlYWtQcm90ZWN0KHBsYXllcikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKG5ldyBWaW5lQnVmZigpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDpTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVmluZSxzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxKyBNYXRoLnJhbmRvbSgpKjIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBJZHggPT0gMT8gcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIik6cGF0aC5HZXRMSChcInRyYXBfY2hvbXBlcl8wMVwiKVxyXG4gICAgICAgICAgICAvL3ZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJ0cmFwX2VudGFuZ2xlXzAxXCIpXHJcbiAgICAgICAgICAgIC8vdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcInRyYXBfY2hvbXBlcl8wMVwiKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTsgXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDsgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuVmluZV0gPSBWaW5lO1xyXG4gICAgXHJcbiAgICBjbGFzcyBWaW5lQnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICBDb3VudFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIElucHV0RGlyOmJvb2xlYW47XHJcbiAgICAgICAgU3RhcnQocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQodGhpcyx0aGlzLl9JbnB1dCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDb21wbGV0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvdW50VGltZTpudW1iZXIgPSA0LGlucHV0RGlyOmJvb2xlYW4gPSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVmluZSwwKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudFRpbWUgPSBjb3VudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSBpbnB1dERpcjtcclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaW5wdXREaXI6Ym9vbGVhbilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuSW5wdXREaXIgPT0gaW5wdXREaXIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSF0aGlzLklucHV0RGlyO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLkNvdW50VGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLkNvdW50VGltZTw9MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9TaG93R2FtZUluZm8oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGluZm86c3RyaW5nO1xyXG4gICAgICAgICAgICBpZih0aGlzLkNvdW50VGltZTw9MClcclxuICAgICAgICAgICAgICAgIGluZm8gPSBcIlwiO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gdGhpcy5JbnB1dERpciA9PSB0cnVlP1wiUmlnaHRcIjpcIkxlZnRcIjtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsImV4cG9ydCBtb2R1bGUgR2FtZVN0cnVjdFxyXG57XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0SW5mbyB7XHJcbiAgICAgICAgQXVkaW9PbjogYm9vbGVhbjtcclxuICAgICAgICBPUElzUmlnaHQ6IGJvb2xlYW47XHJcbiAgICAgICAgVGV4dEluZm86IHN0cmluZztcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5BdWRpb09uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5PUElzUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlRleHRJbmZvID0gXCJIZWxsbyBcXG4gSGVsbG9cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTUxvY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgZ2V0IFgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBYKHg6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzBdID14O1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgWSgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0FyclsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFkoeTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnJbMV0gPSB5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9BcnI6QXJyYXk8bnVtYmVyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggeDpudW1iZXIseTpudW1iZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyID0gW3gseV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IHZhciBJdGVtRGljdFR5cGU6e1tJdGVtVHlwZTpudW1iZXJdOmFueX07XHJcbiAgICBJdGVtRGljdFR5cGUgPSB7IH07XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog6L6T5YWl566h55CG55u45YWzXHJcbiAqL1xyXG5pbXBvcnQgR2FtZVNjZW5lUGxheSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheVwiXHJcbmV4cG9ydCBtb2R1bGUgSW5wdXRcclxue1xyXG4vL+WfuuehgOi+k+WFpeaOp+WItuWZqFxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVJbnB1dFxyXG57XHJcbiAgICAvL+WFrOaciVxyXG4gICAgTmV4dElucHV0OkJhc2VHYW1lSW5wdXQ7XHJcbiAgICBhYnN0cmFjdCBJbnB1dChpc1JpZ2h0OmJvb2xlYW4pO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBpbnB1dCA6QmFzZUdhbWVJbnB1dCA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGlucHV0ID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuTmV4dElucHV0ID0gaW5wdXQ7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge31cclxuICAgIENsZWFyKCl7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRElZSW5wdXQgZXh0ZW5kcyBCYXNlR2FtZUlucHV0XHJcbntcclxuICAgIElucHV0KGlzUmlnaHQ6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9MaXN0ZW5lcilcclxuICAgICAgICAgICAgdGhpcy5fTGlzdGVuZXIuY2FsbCh0aGlzLl9Pd25lcixpc1JpZ2h0KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX093bmVyOmFueTtcclxuICAgIHByaXZhdGUgX0xpc3RlbmVyOihpc3Jpbmc6Ym9vbGVhbik9PnZvaWQ7XHJcbiAgICBjb25zdHJ1Y3Rvcihvd25lcjphbnkgPSBudWxsLGxpc3RlbmVyOihpc3Jpbmc6Ym9vbGVhbik9PnZvaWQgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fT3duZXIgPSBvd25lcjtcclxuICAgICAgICB0aGlzLl9MaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBOb3JtR2FtZUlucHV0IGV4dGVuZHMgQmFzZUdhbWVJbnB1dFxyXG57XHJcbiAgICBHYW1lRGlyOkdhbWVTY2VuZVBsYXk7XHJcbiAgICBfRGlydHk6Ym9vbGVhbjtcclxuICAgIF9Jc1JpZ2h0OmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvciggZGlyOkdhbWVTY2VuZVBsYXksaW5wdXQ6QmFzZUdhbWVJbnB1dCA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGlucHV0KTtcclxuICAgICAgICB0aGlzLkdhbWVEaXIgPSBkaXI7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9Jc1JpZ2h0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBJbnB1dCggaXNSaWdodDpib29sZWFuIClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMuR2FtZURpci5Nb3ZlU3RlcChpc1JpZ2h0KTtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fSXNSaWdodCA9IGlzUmlnaHQ7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0RpcnR5JiZ0aGlzLkdhbWVEaXIuUGxheWVyLkJhc2VDdHJsZXIuVGltZTw9MC4xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lRGlyLk1vdmVTdGVwKHRoaXMuX0lzUmlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIENsZWFyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eT1mYWxzZTtcclxuICAgIH1cclxufVxyXG59XHJcbiIsImltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG5cclxuIC8qKuS9nOiAhTpNb1xyXG4gKuWcuuaZr+WGheWvueixoSBcclxuICovXHJcbi8v566h55CG5LiA5pW06KGMXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdW50TGluZSBleHRlbmRzIExheWEuU3ByaXRlM0Rcclxue1xyXG4gICAgTGF5T3V0RGlydHk6Ym9vbGVhbjtcclxuICAgIExpbmVJZHg6bnVtYmVyO1xyXG4gICAgRmxvb3JOdW06bnVtYmVyO1xyXG4gICAgU3RlcExpc3Q6U3RlcFtdO1xyXG4gICAgTG9naWNMZW5ndGg6bnVtYmVyO1xyXG4gICAgU3RlcEl0ZW06U3RlcEl0ZW07XHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+6I635Y+W5pi+56S65Ye65p2l55qE56ys5Yeg5Liq5bmz5Y+wXHJcbiAgICBHZXRTdGVwKGlkeDpudW1iZXIpOlN0ZXBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TdGVwTGlzdFtpZHggKyAxXTtcclxuICAgIH1cclxuICAgIC8v6K6+572u5q+P5bGCXHJcbiAgICBTZXRMaW5lKCBmbG9vcjpudW1iZXIgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkZsb29yTnVtID0gZmxvb3I7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgdmFyIHN0ZXBMZW5ndGggPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgIHZhciBzdGVwRGlzdGFuY2U9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZTtcclxuICAgICAgICBuZXdQUy55ID0gc3RlcExlbmd0aCpmbG9vcjtcclxuICAgICAgICBuZXdQUy56ID0gLXN0ZXBEaXN0YW5jZS8yICpmbG9vcjtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHZhciBzdGVwQXJyOlN0ZXBbXSA9IHRoaXMuU3RlcExpc3Q7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHN0YXJ0WCA9IDAgLSBzdGVwQXJyLmxlbmd0aC8yICogc3RlcERpc3RhbmNlO1xyXG4gICAgICAgIGlmKHRoaXMuSnVnZUlzTGVzc0xpbmUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBzdGVwRGlzdGFuY2UvMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICBmb3IoIHZhciBjb2x1bW4gPTAgO2NvbHVtbjxzdGVwQXJyLmxlbmd0aDsrK2NvbHVtbiApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3U3RlcDpTdGVwID0gc3RlcEFycltjb2x1bW5dO1xyXG4gICAgICAgICAgICB2YXIgc3RlcFZlY3RvciA9IG5ld1N0ZXAuUG9zaXRpb247XHJcbiAgICAgICAgICAgIHN0ZXBWZWN0b3IueCA9IHN0YXJ0WDtcclxuICAgICAgICAgICAgaWYodGhpcy5fU2V0ZWQmJihjb2x1bW4gPT0gMHx8Y29sdW1uPnRoaXMuTG9naWNMZW5ndGgpKVxyXG4gICAgICAgICAgICAgICAgbmV3U3RlcC5SZXNldFN0ZXAoc3RlcFZlY3Rvcix0cnVlKVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBuZXdTdGVwLlJlc2V0U3RlcChzdGVwVmVjdG9yKVxyXG4gICAgICAgICAgICBzdGFydFggKz0gc3RlcERpc3RhbmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9TZXRlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHN0ZXBBcnJbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc3RlcEFycltzdGVwQXJyLmxlbmd0aCAtMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fU2V0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmKCAhIHRoaXMuSnVnZUlzTGVzc0xpbmUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9naWNMZW5ndGggPSBzdGVwQXJyLmxlbmd0aC0yO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGVwQXJyW3N0ZXBBcnIubGVuZ3RoIC0yXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IHN0ZXBBcnIubGVuZ3RoIC0zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/liKTmlq3mmK/lkKbmlLbnvKnnmoTpgqPlsYJcclxuICAgIEp1Z2VJc0xlc3NMaW5lKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkZsb29yTnVtJTIgIT0gMDtcclxuICAgIH1cclxuICAgIC8v5bCG5q+P5Liq6IqC54K56ZO+5o6l5Yiw5LiL5LiA5bGCXHJcbiAgICBTZXROZXh0Rmxvb3IoIGxhc3RGbG9vcjpNb3VudExpbmUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WIpOaWreaYr+WQpuacieS4pOWktOerr+eCuVxyXG4gICAgICAgIHZhciBoYXZlUG9pbnQgPSBsYXN0Rmxvb3IuTG9naWNMZW5ndGggPnRoaXMuTG9naWNMZW5ndGhcclxuICAgICAgICBmb3IoIHZhciBzdGFydElkeDpudW1iZXIgPSAwO3N0YXJ0SWR4PCB0aGlzLkxvZ2ljTGVuZ3RoOysrc3RhcnRJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGVmdFBhcmVudDpTdGVwID1udWxsO1xyXG4gICAgICAgICAgICB2YXIgcmlnaHRQYXJlbnQ6U3RlcCA9bnVsbDtcclxuICAgICAgICAgICAgaWYoaGF2ZVBvaW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCsxKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGVmdFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4LTEpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHRoaVN0ZXAgPSB0aGlzLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlTdGVwLkxlZnRQYXJlbnQgPSBsZWZ0UGFyZW50O1xyXG4gICAgICAgICAgICBsZWZ0UGFyZW50LlJpZ2h0Q2hpbGQgPSB0aGlTdGVwO1xyXG5cclxuICAgICAgICAgICAgdGhpU3RlcC5SaWdodFBhcmVudCA9IHJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICByaWdodFBhcmVudC5MZWZ0Q2hpbGQgPSB0aGlTdGVwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5pWy56KO5LiA5bGCXHJcbiAgICBCcmVhaygpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2V0ZWQ6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKGxpbmVJZHg6bnVtYmVyLGZsb29yOm51bWJlciA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNvbHVtbnM6bnVtYmVyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTGluZVN0ZXBOdW07XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkxpbmVJZHggPSBsaW5lSWR4O1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB0aGlzLlN0ZXBMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1NldGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yKCB2YXIgU3RhcnRJZHg6bnVtYmVyID0gKGNvbHVtbnMgLTEpO1N0YXJ0SWR4Pj0wOy0tU3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N0ZXA6U3RlcCA9IG5ldyBTdGVwKHRoaXMsU3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ld1N0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXBMaXN0W1N0YXJ0SWR4XSA9IG5ld1N0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge1BsYXllckNvbnRyb2xlcn0gZnJvbSBcIi4vUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHtQbGF5ZXJCdWZmfSBmcm9tIFwiLi9CdWZmXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQge0NoYXJhY3Rlcn0gZnJvbSBcIi4vQ2hhcmFjdGVyXCJcclxudmFyIG51bTpudW1iZXIgPSAwO1xyXG50eXBlIEJhc2VQbGF5ZXJCdWZmID0gUGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZjtcclxuLy/or6XohJrmnKznlKjkuo7muLjmiI/njqnlrrblr7nosaHnrqHnkIZcclxuLy/njqnlrrblr7nosaFcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG57ICAgXHJcbiAgICAvL+engeacieWxnuaAp1xyXG4gICAgX0xvZ2ljUG9zaXRpb246TGF5YS5WZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSBfQnVmZk5vZGU6TGF5YS5TcHJpdGUzRDtcclxuICAgIHByaXZhdGUgX1BsYXllck1vZGVsOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBwcml2YXRlIF9DdXJTdGVwOlN0ZXA7XHJcbiAgICBwcml2YXRlIF9DdHJsZXI6UGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXI7XHJcbiAgICBwcml2YXRlIG1fQW5pbWF0b3I6TGF5YS5BbmltYXRvcjtcclxuICAgIHByaXZhdGUgbV9CdWZmTW9kZWw6e1tuYW1lOm51bWJlcl06TGF5YS5TcHJpdGUzRH1cclxuICAgIFxyXG4gICAgQmFzZUN0cmxlcjpQbGF5ZXJDb250cm9sZXIuUGxheWVyTm9ybUN0cmxlcjtcclxuICAgIEJ1ZmZBcnI6QXJyYXk8UGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZj47XHJcbiAgICAvL3plcmdcclxuICAgIElkTnVtYmVyOm51bWJlcjtcclxuXHJcbiAgICBzZXQgQ3VyU3RlcChzdGVwOlN0ZXApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ3VyU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyU3RlcCgpOlN0ZXBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU3RlcDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEluaXRCVWZmTW9kZWwoIHBsYXllck1vZGVsOkxheWEuU3ByaXRlM0QgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuU2V0TW9kZWwoIFwiaXRlbV9mbHllcl8wMVwiLCBcIlJfaGFuZFwiLHBsYXllck1vZGVsLCBJdGVtLkl0ZW1UeXBlLkZseSk7XHJcbiAgICAgICAgdGhpcy5TZXRNb2RlbCggXCJpdGVtX3NoaWVsZF8wMVwiLCBcImhlYWRcIixwbGF5ZXJNb2RlbCwgSXRlbS5JdGVtVHlwZS5Qcm90ZWN0KTtcclxuICAgICAgICB0aGlzLlNldE1vZGVsKCBcIml0ZW1fdW50b3VjaGFibGVfMDFcIiwgXCJoZWFkXCIscGxheWVyTW9kZWwsIEl0ZW0uSXRlbVR5cGUuSG9seVByb3RlY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0TW9kZWwoIHJlc291cmNlTmFtZTpzdHJpbmcsIG5vZGVOYW1lOnN0cmluZywgcGxheWVyTW9kZWw6TGF5YS5TcHJpdGUzRCwgaXRlbVR5cGU6SXRlbS5JdGVtVHlwZSApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRMSChyZXNvdXJjZU5hbWUpKTtcclxuICAgICAgICB2YXIgYnVmZk1vZGVsOkxheWEuU3ByaXRlM0QgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHBsYXllck1vZGVsLmdldENoaWxkQXQoMCkuYWRkQ2hpbGQoYnVmZk1vZGVsKTtcclxuICAgICAgICBzd2l0Y2gobm9kZU5hbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVhZFwiOlxyXG4gICAgICAgICAgICAgICAgdmFyIG5vZGU6TGF5YS5TcHJpdGUzRCA9IHBsYXllck1vZGVsLmdldENoaWxkQnlOYW1lKG5vZGVOYW1lKSBhcyBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5hZGRDaGlsZChidWZmTW9kZWwpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9BbmltYXRvci5saW5rU3ByaXRlM0RUb0F2YXRhck5vZGUobm9kZU5hbWUsYnVmZk1vZGVsKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGJ1ZmZNb2RlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsW2l0ZW1UeXBlXSA9IGJ1ZmZNb2RlbDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX0J1ZmZNb2RlbCA9IHt9O1xyXG4gICAgICAgIHZhciBOYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJjMDAxX2NoaWxkXzAxXCIpO1xyXG4gICAgICAgIHZhciBQbGF5ZXJNb2RlbCA9IExheWEuTG9hZGVyLmdldFJlcyhOYW1lKTtcclxuICAgICAgICB2YXIgc2Vjb25kUGxheWVyOkxheWEuU3ByaXRlM0QgPSBQbGF5ZXJNb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoc2Vjb25kUGxheWVyKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzKTtcclxuXHJcbiAgICAgICAgLy/mt7vliqDoh6rlrprkuYnmqKHlnotcclxuICAgICAgICBzZWNvbmRQbGF5ZXIudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCksIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gc2Vjb25kUGxheWVyLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIHRoaXMub24oTGF5YS5FdmVudC5SRU1PVkVELHRoaXMsKCk9PnsgdGhpcy5kZXN0cm95KCkgfSlcclxuICAgICAgICB0aGlzLlJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5Jbml0QlVmZk1vZGVsKHNlY29uZFBsYXllcik7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBSZXNldCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gbnVsbDtcclxuICAgICAgICBpZih0aGlzLl9CdWZmTm9kZSlcclxuICAgICAgICAgICAgdGhpcy5fQnVmZk5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX0J1ZmZOb2RlID0gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX0J1ZmZOb2RlKTtcclxuICAgICAgICB0aGlzLkJ1ZmZBcnIgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLkJhc2VDdHJsZXIgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllck5vcm1DdHJsZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyID0gdGhpcy5CYXNlQ3RybGVyO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKDAsMCk7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX1VwZGF0ZSk7XHJcbiAgICAgICAgdmFyIGRlZmF1bHRBbmltU3RhdGU6TGF5YS5BbmltYXRvclN0YXRlID0gdGhpcy5tX0FuaW1hdG9yLmdldERlZmF1bHRTdGF0ZSgpO1xyXG4gICAgICAgIHZhciBzdGF0ZU5hbWU6c3RyaW5nID0gZGVmYXVsdEFuaW1TdGF0ZS5uYW1lO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KHN0YXRlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bnjqnlrrZCVUZGXHJcbiAgICAgKiBAcGFyYW0gaWR4IOanveS9jeajgOafpVxyXG4gICAgICogQHJldHVybnMg56m66KGo56S65rKh5pyJXHJcbiAgICAgKi9cclxuICAgIEdldEJ1ZmYoaWR4Om51bWJlcik6UGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5CdWZmQXJyW2lkeF0gIT1udWxsJiZ0aGlzLkJ1ZmZBcnJbaWR4XSE9dW5kZWZpbmVkKT90aGlzLkJ1ZmZBcnJbaWR4XTpudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pGG5pS+6KeS6ImyXHJcbiAgICBTZXRTdGVwKHB1dFN0ZXA6U3RlcCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IHB1dFN0ZXA7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gcHV0U3RlcC5Qb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIG5ld1BTLnkgKz0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICB0aGlzLlBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICAgICAgdGhpcy5fTG9naWNQb3NpdGlvbiA9IHB1dFN0ZXAuUG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5TdGFuZCkpO1xyXG4gICAgICAgIHRoaXMuVG91Y2hHcm91bmQoKTtcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3UFM6TGF5YS5WZWN0b3IzID0gbmV3UFMuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9naWNQb3NpdGlvbigpOkxheWEuVmVjdG9yM1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5biD5bGA5b2T5YmN5bGC5L2G5LiN56e75YqoXHJcbiAgICAgKiBAcGFyYW0ge1N0ZXB9IHN0ZXAg5LiL5LiA5q2l5Y+w6Zi2XHJcbiAgICAgKi9cclxuICAgIExheVN0ZXAoc3RlcDpTdGVwKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gc3RlcDtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gc3RlcC5Qb3NpdGlvbjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgU3RhcnRNb3ZlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KCBDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkp1bXApICk7XHJcbiAgICAgICAgdGhpcy5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEp1bXBEb3duKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uSnVtcGRvd24pKTtcclxuICAgIH1cclxuXHJcbiAgICBGbHkoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5GbHkpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBQbGF5ZXJEZWF0aDpib29sZWFuO1xyXG4gICAgLy/op6blj5Hlj7DpmLZcclxuICAgIFRvdWNoR3JvdW5kKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyRGVhdGggfHwgIXRoaXMuQ3VyU3RlcClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCh0aGlzLkN1clN0ZXAuU3RlcEl0ZW0uSXRlbVR5cGUgPT0gSXRlbS5JdGVtVHlwZS5Ob25lKSYmKHRoaXMuQ3VyU3RlcC5Jc0VtcHR5fHwodGhpcy5DdXJTdGVwLkxlZnRQYXJlbnQmJnRoaXMuQ3VyU3RlcC5SaWdodFBhcmVudCYmdGhpcy5DdXJTdGVwLkxlZnRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbiYmdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50LlN0ZXBJdGVtLklzRm9yYmlkZW4pKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkZhbGwpKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkN1clN0ZXAuU3RlcEl0ZW0uVG91Y2hJdGVtKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOenu+WKqFxyXG4gICAgICogQHBhcmFtIHtMYXlhLlZlY3RvcjN9IHZlY3RvciDnp7vliqjlkJHph4/lgLxcclxuICAgICAqL1xyXG4gICAgVHJhbnNsYXRlKCB2ZWN0b3I6TGF5YS5WZWN0b3IzICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnRyYW5zbGF0ZSh2ZWN0b3IpO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5hZGQodGhpcy5fTG9naWNQb3NpdGlvbix2ZWN0b3IsdGhpcy5fTG9naWNQb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDnjqnlrrbmjqfliLblmahcclxuICAgICAqIEBwYXJhbSBuZXdDdHJsZXIg5paw546p5a625o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIEFkZEN0cmxlcihuZXdDdHJsZXI6UGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXIgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGN0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlciA9IHRoaXMuX0N0cmxlcjtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSBuZXdDdHJsZXI7XHJcbiAgICAgICAgbmV3Q3RybGVyLk5leHRDdHJsID1jdHJsZXI7XHJcbiAgICAgICAgbmV3Q3RybGVyLlNldFBsYXllcih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+S6pOaOp+WItuWZqFxyXG4gICAgICovXHJcbiAgICBQb3BDdHJsZXIoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyID0gdGhpcy5fQ3RybGVyLk5leHRDdHJsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqBCVUZGXHJcbiAgICAgKiBAcGFyYW0gYnVmZiBcclxuICAgICAqIEBwYXJhbSBpbmRleCBcclxuICAgICAqL1xyXG4gICAgQWRkQnVmZihidWZmOlBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmYpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICB2YXIgaW5kZXg6bnVtYmVyID0gYnVmZi5JZHg7XHJcbiAgICAgICAgaWYodGhpcy5CdWZmQXJyW2luZGV4XSE9bnVsbHx8dGhpcy5CdWZmQXJyW2luZGV4XSE9dW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYnVmZk1vZGVsOkxheWEuU3ByaXRlM0QgPSB0aGlzLm1fQnVmZk1vZGVsW2J1ZmYuVHlwZV07XHJcbiAgICAgICAgaWYoYnVmZk1vZGVsKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJ1ZmZNb2RlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkJ1ZmZBcnJbaW5kZXhdID0gYnVmZjtcclxuICAgICAgICBidWZmLklkeCA9IGluZGV4O1xyXG4gICAgICAgIGJ1ZmYuU3RhcnQodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoEJVRkbmqKHlnotcclxuICAgICAqIEBwYXJhbSBtb2QgXHJcbiAgICAgKi9cclxuICAgIEFkZEJ1ZmZNb2RlKCBtb2Q6TGF5YS5TcHJpdGUzRCApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKG1vZCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZOb2RlLmFkZENoaWxkKG1vZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5PmnZ9CVUZGXHJcbiAgICAgKi9cclxuICAgIENvbXBsZXRlQnVmZihpbmRleDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGJ1ZmY6QmFzZVBsYXllckJ1ZmYgPSB0aGlzLkJ1ZmZBcnJbaW5kZXhdO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6TGF5YS5TcHJpdGUzRCA9IHRoaXMubV9CdWZmTW9kZWxbYnVmZi5UeXBlXTtcclxuICAgICAgICBpZihidWZmTW9kZWwpIGJ1ZmZNb2RlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1ZmZBcnJbaW5kZXhdPW51bGw7XHJcbiAgICAgICAgaWYoYnVmZj09bnVsbHx8YnVmZj09dW5kZWZpbmVkIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9VcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJEZWF0aClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlci5VcGRhdGUoKTtcclxuICAgICAgICBmb3IoIHZhciBidWZmSWR4Om51bWJlciA9IDA7YnVmZklkeDwyOysrYnVmZklkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLkJ1ZmZBcnJbYnVmZklkeF0hPW51bGx8fHRoaXMuQnVmZkFycltidWZmSWR4XSE9dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5CdWZmQXJyW2J1ZmZJZHhdLlVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEZseVByZXBhcmUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0ZXBEYXRhXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHt9XHJcbiAgICBHZXREYXRhKCBzdGVwOlN0ZXAgKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyQ29udHJvbGVyXHJcbntcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGxheWVyQ3RybGVyXHJcbiAgICB7XHJcbiAgICAgICAgLy/lhazlhbHmjqXlj6NcclxuICAgICAgICBOZXh0Q3RybDpCYXNlUGxheWVyQ3RybGVyO1xyXG4gICAgICAgIHBsYXllcjpQbGF5ZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgVXBkYXRlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNldFBsYXllcihwbGF5ZXI6UGxheWVyKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvciggcGxheWVyOlBsYXllciwgY3RybGVyOkJhc2VQbGF5ZXJDdHJsZXIgPSBudWxsIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGN0cmxlciA9PSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdHJsZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTmV4dEN0cmwgPSBjdHJsZXI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX1VwZGF0ZSgpOnZvaWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v55So5LqO6KeS6Imy5q2j5bi454q25oCB5LiL55qE56e75YqoXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTm9ybUN0cmxlciBleHRlbmRzIEJhc2VQbGF5ZXJDdHJsZXJcclxuICAgIHtcclxuICAgICAgICBUaW1lOm51bWJlcjtcclxuICAgICAgICBJc0ZhbGxpbmc6Ym9vbGVhbjtcclxuICAgICAgICBTdGFydE1vdmUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5EaXJlY3Rvci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihwbGF5ZXI6UGxheWVyID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyKHBsYXllcilcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5UaW1lPjApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuVGltZTw9QVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5EaXJlY3Rvci5HYW1lVGltZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlRpbWUgPSAtMTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5TZXRTdGVwKHRoaXMucGxheWVyLkN1clN0ZXApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdFRpbWUgPSB0aGlzLlRpbWUtTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIHRoaXMuSXNGYWxsaW5nID0gZmFsc2UgJiYgbGFzdFRpbWUqMiA+IHRoaXMuVGltZS1MYXlhLnRpbWVyLmN1cnJUaW1lcilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuSXNGYWxsaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuSnVtcERvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhdGUgPSAoMS1sYXN0VGltZS8gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuUGxheWVyTW92ZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBTdGVwUHM6TGF5YS5WZWN0b3IzID0gdGhpcy5wbGF5ZXIuQ3VyU3RlcC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICBTdGVwUHMueSArPUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnBzOkxheWEuVmVjdG9yMyA9IHRoaXMucGxheWVyLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnBzLnkgKz1Db250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQcyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdQcy54ID0gKFN0ZXBQcy54IC0gY3VycHMueCkqcmF0ZSsgY3VycHMueDtcclxuICAgICAgICAgICAgICAgICAgICBuZXdQcy55ID0gKFN0ZXBQcy55IC0gY3VycHMueSkqcmF0ZStjdXJwcy55O1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1BzLnogPSAoU3RlcFBzLnogLSBjdXJwcy56KSpyYXRlK2N1cnBzLno7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5Qb3NpdGlvbiA9IG5ld1BzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eOqeWutumjnuihjFxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckZseSBleHRlbmRzIEJhc2VQbGF5ZXJDdHJsZXJcclxuICAgIHtcclxuICAgICAgICBTcGVlZDpudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u546p5a62XHJcbiAgICAgICAgICogQHBhcmFtIHBsYXllciDmk43mjqfop5LoibJcclxuICAgICAgICAgKi9cclxuICAgICAgICBTZXRQbGF5ZXIocGxheWVyOlBsYXllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlNldFBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuVHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCxDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoLDApKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246R2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOm51bWJlcjsgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMucGxheWVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3ZhciB2ZWN0b3IgPSBuZXcgTGF5YS5WZWN0b3IzKDAsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCwtMSpDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMik7XHJcbiAgICAgICAgICAgLy8gTGF5YS5WZWN0b3IzLnNjYWxlKHZlY3Rvcix0aGlzLlNwZWVkLHZlY3Rvcik7XHJcbiAgICAgICAgICAgdmFyIHZlY3RvcjpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsMC4xNDYsLTAuMTAzOTQpXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLlRyYW5zbGF0ZSh2ZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi9Nb3VudExpbmVcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG50eXBlIE1Mb2NhdGlvbiA9IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4vL+atpVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG57XHJcbiAgICAvL+aooeWei+S4quaVsFxyXG4gICAgcHVibGljIHN0YXRpYyBzdGVwTW9kZWxOdW06bnVtYmVyID0gMztcclxuXHJcbiAgICBMZWZ0UGFyZW50OlN0ZXA7XHJcbiAgICBSaWdodFBhcmVudDpTdGVwO1xyXG4gICAgTGVmdENoaWxkOlN0ZXA7XHJcbiAgICBSaWdodENoaWxkOlN0ZXA7XHJcbiAgICBTdGVwSXRlbTpTdGVwSXRlbTtcclxuICAgIFJvYWROdW06bnVtYmVyO1xyXG4gICAgTWFyazphbnk7XHJcbiAgICBGbG9vcjpNb3VudExpbmU7XHJcbiAgICBJZHg6bnVtYmVyO1xyXG4gICAgXHJcbiAgICAvL+WFrOacieaOpeWPo1xyXG4gICAgc2V0IFBvc2l0aW9uKCBuZXdQUzpMYXlhLlZlY3RvcjMgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9jYXRpb24oKTpNTG9jYXRpb25cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKHRoaXMuSWR4LTEsdGhpcy5GbG9vci5GbG9vck51bSk7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNEZWFkUm9hZCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNEZWFkUm9hZHx8IXRoaXMuYWN0aXZlfHwgdGhpcy5TdGVwSXRlbS5Jc0RpZmZpY3VsdHk7XHJcbiAgICB9XHJcbiAgICBzZXQgSXNEZWFkUm9hZCh2YWx1ZTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBJc0ZvcmJpZGVuKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlN0ZXBJdGVtLklzRm9yYmlkZW47XHJcbiAgICB9XHJcbiAgICBnZXQgSXNFbXB0eSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gISh0aGlzLmFjdGl2ZSYmdGhpcy5GbG9vci5hY3RpdmUpO1xyXG4gICAgfVxyXG4gICAgUHV0SXRlbSggaXRlbUVudW1lOkl0ZW0uSXRlbVR5cGUgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGl0ZW1FbnVtZSA9PSBJdGVtLkl0ZW1UeXBlLkVtcHR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPWZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5QdXRJdGVtKGl0ZW1FbnVtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXRTdGVwKG5ld1BzOkxheWEuVmVjdG9yMyxpZ25vcmVBY3RpdmU6Ym9vbGVhbiA9IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUG9zaXRpb24gPSBuZXdQcztcclxuICAgICAgICBpZighaWdub3JlQWN0aXZlKVxyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIG1vZGVsUHMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlB1dEl0ZW0oSXRlbS5JdGVtVHlwZS5Ob25lKTtcclxuXHJcbiAgICAgICAgdGhpcy5MZWZ0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxlZnRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb2FkTnVtID0gMDtcclxuICAgIH1cclxuICAgIF9TdGVwTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIGNvbnN0cnVjdG9yKGZsb29yOk1vdW50TGluZSxpZHg6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIC8vc3VwZXIobmV3IExheWEuQm94TWVzaCgxLDEsMSkgKTtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMpO1xyXG4gICAgICAgIGlmKHRoaXMuSWR4ICE9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxKyBNYXRoLnJhbmRvbSgpKlN0ZXAuc3RlcE1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wXCIrSWR4KVxyXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoIExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC41LCAwLjUsIDAuNSkpIDsvL2xvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGNsb25lTW9kZWwgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIGNsb25lTW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoY2xvbmVNb2RlbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW1GYWN0b3J5KEl0ZW0uSXRlbVR5cGUuTm9uZSx0aGlzKTs7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5SZXNldEl0ZW0oKTtcclxuICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgdGhpcy5JZHggPSBpZHg7XHJcblxyXG4gICAgICAgIHRoaXMuTGVmdFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRDaGlsZCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlJvYWROdW0gPSAwO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfSXNEZWFkUm9hZDpib29sZWFuO1xyXG5cclxufSIsIi8qKlxyXG4gKiDkvZzogIU6TW9cclxuICog5ZCv5Yqo5Zy65pmvXHJcbiAqL1xyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgTG9hZFNjZW5lIGZyb20gXCIuL1NjZW5lL0xvYWRTY2VuZVwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiO1xyXG5jbGFzcyBHYW1lXHJcbntcclxuXHRfRnJhbWU6RnJhbWVXb3JrO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzcyA9IEFQUDtcclxuICAgICAgICBMYXlhM0QuaW5pdCgwLDAsdHJ1ZSk7XHJcbiAgICAgICAgR2FtZUNvbmZpZy5pbml0KCk7XHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRklYRURfV0lEVEg7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gTGF5YS5TdGFnZS5TQ1JFRU5fVkVSVElDQUw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBMYXlhLlN0YWdlLkFMSUdOX0JPVFRPTTtcclxuICAgICAgICAvL+W8gOWQr+e7n+iuoeS/oeaBr1xyXG5cdFx0TGF5YS5TdGF0LnNob3coKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciByZXNDb2wgPSBbe3VybDpcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOlwidWkvUmVzb3VyY2UvbG9jYWxjb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU31dO1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQocmVzQ29sLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkZWQoKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5Jbml0KCk7XHJcbiAgICAgICAgdmFyIHNjZW5lTWdyOlNjZW5lTWFuYWdlciA9IEFQUC5TY2VuZU1hbmFnZXI7XHJcbiAgICAgICAgc2NlbmVNZ3IuQ2hhbmdlU2NlbmUobmV3IExvYWRTY2VuZSgpKTtcclxuICAgICAgICBBUFAuRnJhbWVXb3JrLkFkZE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpXHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMyx0aGlzLHRoaXMuVXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoIClcclxuICAgIHtcclxuICAgICAgICBBUFAuRnJhbWVXb3JrLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcbnZhciBHTSA9IG5ldyBHYW1lKCk7XHJcbiIsImltcG9ydCB7U2NlbmV9IGZyb20gXCIuL1NjZW5lXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7IFBsYXllckJ1ZmYgfSBmcm9tIFwiLi8uLi9HYW1lL0J1ZmZcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHYW1lU2NlbmVQbGF5IGZyb20gXCIuL1NjZW5lUGxheS9HYW1lU2NlbmVQbGF5XCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lRGlyZWN0b3IgZXh0ZW5kcyBTY2VuZS5CYXNlRGlyZWN0b3Ige1xyXG4gICAgcHVibGljIGdldCBHYW1lUGxheSgpOkdhbWVTY2VuZVBsYXlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTdGF0ZSBhcyBHYW1lU2NlbmVQbGF5O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxvYWRMaXN0MkQgPSBbcGF0aC5HZXREZXBhdGhVSUpTKFwiUGxheWVyTGlzdFwiKSxwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpLHBhdGguR2V0RGVwYXRoVUlKUyhcIkVuZEdhbWVcIildO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlU3RhdGUobmV3IFNjZW5lLkxvYWRTY2VuZUxvZ2ljKGxvYWRMaXN0MkQsbnVsbCxuZXcgR2FtZVNjZW5lUGxheSgpKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsIi8qXHJcbuS9nOiAhTpNb1xyXG7ot7PlsbHnvorlnLrmma/moLjlv4Plip/og71cclxuKi9cclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEVudGVyR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VudGVyR2FtZVVJXCJcclxuaW1wb3J0IEVuZEdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbmRHYW1lVUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBHYW1lQ2FtZXJhIGZyb20gXCIuLy4uL0dhbWUvR2FtZUNhbWVyYVwiXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vLi4vR2FtZS9QbGF5ZXJcIlxyXG5pbXBvcnQge0lucHV0fSBmcm9tIFwiLi8uLi9HYW1lL0lucHV0XCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4vLi4vdWkvR2FtZVVJXCJcclxuaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi8uLi9HYW1lL01vdW50TGluZVwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxudHlwZSBJdGVtTGF5b3V0ID0gSXRlbS5JdGVtTGF5b3V0O1xyXG50eXBlIExpbmVJdGVtSW5mbyA9IEl0ZW0uTGluZUl0ZW1JbmZvO1xyXG52YXIgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG4vL+a4uOaIj+WcuuaZr1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVcclxue1xyXG4gICAgTW9kZWxMb2FkOmJvb2xlYW47XHJcbiAgICBHYW1lRGlyOkdhbWVEaXJlY3RvcjtcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOkdhbWVEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgR2FtZURpcmVjdG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9TY2VuZU9iaiA9IG5ldyBMYXlhLlNjZW5lM0Q7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCJpbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW50ZXJHYW1lVUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0FQUFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VpZGVyTWFuYWdlciBcclxue1xyXG4vL+WvueWkluaOpeWPo1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjpHdWlkZXJNYW5hZ2VyO1xyXG4gICAgc3RhdGljIGdldCBNZ3IoKTpHdWlkZXJNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR3VpZGVyTWFuYWdlci5fTWdyID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHdWlkZXJNYW5hZ2VyLl9NZ3IgPSBuZXcgR3VpZGVyTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR3VpZGVyTWFuYWdlci5fTWdyO1xyXG4gICAgfVxyXG4gICAgU2NlbmVNZ3I6U2NlbmVNYW5hZ2VyO1xyXG4gICAgQ3VyU2NlbmU6R3VpZGVyU2NlbmU7XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVEaXIoKTpHdWlkZXJEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clNjZW5lLkd1aWREaXI7XHJcbiAgICB9XHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr+i1sOi/meS4quaOpeWPo1xyXG4gICAgRW50ZXJTY2VuZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3R2FtZVNjZW5lID0gbmV3IEd1aWRlclNjZW5lKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DaGFuZ2VTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBuZXdHYW1lU2NlbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyU2NlbmUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVcclxue1xyXG4gICAgR3VpZERpcjpHdWlkZXJEaXJlY3RvcjtcclxuICAgIEN1ckRpcjpCYXNlRGlyZWN0b3I7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIEdlbkRpcmVjdG9yKCk6U2NlbmUuQmFzZURpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIERpcmVjdG9yOlNjZW5lLkJhc2VEaXJlY3RvciA9IG5ldyBHdWlkZXJEaXJlY3RvcigpO1xyXG4gICAgICAgIHJldHVybiBEaXJlY3RvcjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyRGlyZWN0b3IgZXh0ZW5kcyBTY2VuZS5CYXNlRGlyZWN0b3Jcclxue1xyXG4gICAgUmVTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvciggKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciBsb2FkMkRMaXN0ID0gW3t1cmw6cGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIikgLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSAsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOnBhdGguR2V0QXRsUGF0aChcImNvbXBcIiksdHlwZTogTGF5YS5Mb2FkZXIuQVRMQVMgfV07XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VHYW1lUGxheShuZXcgU2NlbmUuTG9hZFNjZW5lTG9naWMobG9hZDJETGlzdCxudWxsLG5ldyBHdWlkZXJTY2VuZVBsYXkoKSkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHB1YmxpYyBFbmQoKTp2b2lkXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJTY2VuZVBsYXkgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVQbGF5ZVxyXG57XHJcbiAgICBVSTpFbnRlckdhbWVVSTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfSAgICBcclxuICAgIHB1YmxpYyBTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5VSSA9IEFQUC5VSU1hbmFnZXIuU2hvdzxFbnRlckdhbWVVST4oRW50ZXJHYW1lVUkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIEVuZCgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vLi4vdWkvbGF5YU1heFVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBMb2FkaW5nVUkgZnJvbSBcIi4vLi4vdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUlcIlxyXG5pbXBvcnQgRk1Xb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi9HdWlkZXJNYW5hZ2VyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEJHIGZyb20gXCIuLy4uL3VpL0JHXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRTY2VuZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIEdlbkRpcmVjdG9yKCk6U2NlbmUuQmFzZURpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMb2FkRGlyY3RvcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmNsYXNzIExvYWREaXJjdG9yIGV4dGVuZHMgU2NlbmUuQmFzZURpcmVjdG9yXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxvYWRMaXN0MkQgPSBbe3VybDpcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOlwidWkvUmVzb3VyY2UvbG9jYWxjb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU31dO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlR2FtZVBsYXkoIG5ldyBTY2VuZS5Mb2FkU2NlbmVMb2dpYyhsb2FkTGlzdDJELG51bGwsbmV3IExvYWRTY2VuZVBsYXllKCkpICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEVuZCgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5Yqg6L295Zy65pmv6YC76L6RXHJcbmNsYXNzIExvYWRTY2VuZVBsYXllIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lUGxheWVcclxue1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50MkRMb2FkOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Db3VudDNETG9hZDpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fTG9hZEZhaWxlOmJvb2xlYW47XHJcbiAgICBwcml2YXRlIG1fQ291bnRWYWx1ZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fTG9hZGluZ1VJOkxvYWRpbmdVSTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMDtcclxuICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTdGFydExvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Db3VudFZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJlc291cmNlMkRBcnIgPSBbXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJTZXRQYW5lbFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkNoYXJhY3RlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiUGxheWVyTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQkdcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImNvbXBcIilcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICBcclxuICAgICAgICBMYXlhLmxvYWRlci5vbmNlKExheWEuRXZlbnQuRVJST1IsdGhpcyx0aGlzLm9uRXJyb3IpO1xyXG4gICAgICAgIExheWEubG9hZGVyLm9uY2UoTGF5YS5FdmVudC5DT01QTEVURSx0aGlzLHRoaXMub25Db21wbGV0ZSk7XHJcbiAgICAgICAgdmFyIHJlc291cmNlM0RBcnIgPSBbIFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV9jaGlsZF8wMVwiKSAsXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDRcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2ZseWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfc3RpbmdfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2Fic29yZF8wMVwiKSxcclxuICAgICAgICBdXHJcbiAgICAgICAgdGhpcy5Mb2FkKHJlc291cmNlMkRBcnIscmVzb3VyY2UzREFycik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMb2FkKGFycjJEOkFycmF5PGFueT4gPSBudWxsLGFycjNEOkFycmF5PGFueT49bnVsbClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZihhcnIyRCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQoYXJyMkQsbnVsbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbjJEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSAtPTAuNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXJyM0QhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jcmVhdGUoYXJyM0QsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLG51bGwpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uM0RQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudFZhbHVlIC09MC41O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uM0RQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuVmFsdWUgPSAodGhpcy5tX0NvdW50MkRMb2FkICsgdGhpcy5tX0NvdW50M0RMb2FkKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb24yRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLm1fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPXZhbHVlLzI7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5WYWx1ZSA9ICh0aGlzLm1fQ291bnQyRExvYWQgKyB0aGlzLm1fQ291bnQzRExvYWQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkVycm9yKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvYWRFcnJvcjpcIitzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNvbXBsZXRlKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aGlEaXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLlJlbG9hZChmdW5jdGlvbigpOnZvaWR7dGhpRGlyLkxvYWQoKX0gKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5CRyA9IG5ldyBCRygpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLkNvbXBsZXRlKCgpPT57R3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fTG9hZGluZ1VJID0gQVBQLlVJTWFuYWdlci5TaG93PExvYWRpbmdVST4oTG9hZGluZ1VJKTtcclxuICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMC41O1xyXG4gICAgICAgIHRoaXMubV9Db3VudFZhbHVlID0gMTtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5TdGFydExvYWQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEVuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2FkQ29tcGxldGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICB9XHJcbn1cclxuLypcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZFNjZW5lIGV4dGVuZHMgQmFzZVNjZW5lXHJcbntcclxuICAgIEN1ckRpcjpCYXNlRGlyZWN0b3I7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX0dlbkRpcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1ckRpciA9IG5ldyBMb2FkRGlyY3RvcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBTdGFydExvYWQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJlc0NvbCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6XCJ1aS9SZXNvdXJjZS9sb2NhbGNvbXAuYXRsYXNcIix0eXBlOkxheWEuTG9hZGVyLkFUTEFTfV07XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChyZXNDb2wsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX0xvYWRDb21wbGV0ZSkpO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuKi9cclxuLypcclxuY2xhc3MgTG9hZERpcmN0b3IgZXh0ZW5kcyBCYXNlRGlyZWN0b3Jcclxue1xyXG4gICAgVUk6TG9hZGluZ1VJO1xyXG4gICAgXHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIF9Db3VudDJETG9hZDpudW1iZXI7XHJcbiAgICBfQ291bnQzRExvYWQ6bnVtYmVyO1xyXG4gICAgX0xvYWRGYWlsZTpib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fQ291bnQzRExvYWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5fQ291bnQyRExvYWQgPSAwLjU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9TdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub24oTGF5YS5FdmVudC5FUlJPUix0aGlzLHRoaXMuX29uRXJyb3IpO1xyXG4gICAgICAgIExheWEubG9hZGVyLm9uKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLl9vbkNvbXBsZXRlKTtcclxuICAgICAgICB0aGlzLkxvYWQoKTtcclxuICAgICAgICBzdXBlci5fU3RhcnQoKTtcclxuICAgICAgICB0aGlzLl9Mb2FkRmFpbGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX1N0YXJ0Q29tcGxldGUoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLl9TdGFydENvbXBsZXRlKCk7XHJcbiAgICAgICAgdGhpcy5VSSA9IEFQUC5VSU1hbmFnZXIuU2hvdzxMb2FkaW5nVUk+KExvYWRpbmdVSSk7XHJcbiAgICAgICAgdGhpcy5VSS5VcGRhdGUoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBMb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9Db3VudDJETG9hZCA9MDtcclxuICAgICAgICB0aGlzLl9Db3VudDNETG9hZCA9MDtcclxuICAgICAgICB0aGlzLl9Db3VudFZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLl9Mb2FkRmFpbGUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UyREFyciA9IFtcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIC8vcmVzb3VyY2UyREFyciA9IG51bGw7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgTGF5YS5sb2FkZXIub24oTGF5YS5FdmVudC5FUlJPUix0aGlzLHRoaXMuX29uRXJyb3IpO1xyXG4gICAgICAgIExheWEubG9hZGVyLm9uKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLl9vbkNvbXBsZXRlKTtcclxuICAgICAgICAvL3ZhciByZXNvdXJjZTNEQXJyID0gW1wiQzovVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfYXV0X2JhcnJpZXJfMDIvTGF5YVNjZW5lX0wwMV9hdXRfYmFycmllcl8wMi9Db252ZW50aW9uYWwvTDAxX2F1dF9iYXJyaWVyXzAyLmxoXCJdO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTNEQXJyID0gWyBcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDFfY2hpbGRfMDFcIikgLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzA0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9jb2luXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfY2hvbXBlcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX3N0aW5nXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRfMDFcIiksXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXS8vIFwiQzovVXNlcnMvQWRtaW5pc3RyYXRvci9EZXNrdG9wL1Jlc291cmNlL0xheWFTY2VuZV9MMDFfYXV0X2JhcnJpZXJfMDIvTGF5YVNjZW5lX0wwMV9hdXRfYmFycmllcl8wMi9Db252ZW50aW9uYWwvTDAxX2F1dF9iYXJyaWVyXzAyLmxoXCJdO1xyXG4gICAgICAgIHRoaXMuX0xvYWQocmVzb3VyY2UyREFycixyZXNvdXJjZTNEQXJyKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9Mb2FkKGFycjJEOkFycmF5PGFueT4gPSBudWxsLGFycjNEOkFycmF5PGFueT49bnVsbClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZihhcnIyRCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgLy8gTGF5YS5sb2FkZXIubG9hZChhcnIyRCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fb25Mb2FkZWQpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLl9vbjJEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKGFycjJELG51bGwsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuX29uMkRQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy5fQ291bnRWYWx1ZSs9MC41O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudDJETG9hZCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFycjNEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY3JlYXRlKGFycjNELExheWEuSGFuZGxlci5jcmVhdGUodGhpcyxudWxsKSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5fb24zRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgIHRoaXMuX0NvdW50VmFsdWUrPTAuNTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQzRExvYWQgPSAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfb25FcnJvcihzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0xvYWRGYWlsZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvYWRFcnJvcjpcIitzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfb24zRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0NvdW50M0RMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMuVUkuVmFsdWUgPSAodGhpcy5fQ291bnQyRExvYWQgKyB0aGlzLl9Db3VudDNETG9hZCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX29uMkRQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9Db3VudDJETG9hZCA9dmFsdWUvMjtcclxuICAgICAgICB0aGlzLlVJLlZhbHVlID0gdGhpcy5fQ291bnQyRExvYWQgKyB0aGlzLl9Db3VudDNETG9hZDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfb25Db21wbGV0ZShkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aGlEaXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLlVJLlJlbG9hZChmdW5jdGlvbigpOnZvaWR7dGhpRGlyLkxvYWQoKX0gKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5CRyA9IG5ldyBCRygpO1xyXG4gICAgICAgICAgICB0aGlzLlVJLkNvbXBsZXRlKCgpPT57R3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICB0aGlzLlVJLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59Ki8iLCJpbXBvcnQgeyBGU00gfSBmcm9tIFwiLi8uLi9CYXNlL0ZTTVwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiO1xyXG5leHBvcnQgbW9kdWxlIFNjZW5lIHtcclxuICAgIGV4cG9ydCBjbGFzcyBTY2VuZUZTTSBleHRlbmRzIEZTTS5GU008QmFzZVNjZW5lPlxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WcuuaZr+S7o+eQhlxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTY2VuZSBleHRlbmRzIEZTTS5TdGF0ZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBfU3RhcnRHYW1lVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ2xvY2s6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG1fU2NlbmVPYmo6IExheWEuU2NlbmUzRDtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9EaXJlY3RvcjogQmFzZURpcmVjdG9yO1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNjZW5lT2JqKCk6IExheWEuU2NlbmUzRCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fU2NlbmVPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9EaXJlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBHZW5EaXJlY3RvcigpOiBCYXNlRGlyZWN0b3I7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXRPYmooc3ByaXRlM0Q6IExheWEuU3ByaXRlM0QpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9TY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX1NjZW5lT2JqLmFkZENoaWxkKHNwcml0ZTNEKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFzZVNjZW5lIFB1dE9iaiBFcnJvcjplbXB0eSBTcHJpdGUzRFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1fRGlyZWN0b3IgPSB0aGlzLkdlbkRpcmVjdG9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaXJlY3Rvci5TdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVuZCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuU2NlbmVPYmopIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2NlbmVPYmoucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuU2NlbmVPYmoubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0b3IgPSB0aGlzLlNjZW5lT2JqLmdldENoaWxkQXQoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0b3IucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuRGlyZWN0b3IuRW5kKCk7XHJcbiAgICAgICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fRGlyZWN0b3IpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fRGlyZWN0b3IuVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZURpcmVjdG9yIGV4dGVuZHMgRlNNLkZTTTxCYXNlU2NlbmVQbGF5ZT5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9TdGFydEdhbWVUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDbG9jazogbnVtYmVyO1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG5cclxuICAgICAgICAvL+engeacieWxnuaAp+WSjOWKn+iDvVxyXG4gICAgICAgIGdldCBHYW1lVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGltZVVwQ2xvY2sgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fVGltZVVwQ2xvY2sgLSB0aGlzLl9TdGFydEdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTGF5YS50aW1lci5jdXJyVGltZXIgLSB0aGlzLl9TdGFydEdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IEdhbWVUaW1lKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgQ3VyR2FtZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1N0YXJ0R2FtZVRpbWUgKyB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0VGltZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0VGltZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFN0YXJ0KCk6IHZvaWQgO1xyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgRW5kKCk6IHZvaWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUaW1lVXAoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL0FQUC5NZXNzYWdlQ2VudGVyLlRyaWdnZXIoR2FtZUV2ZW50LkdhbWVUaW1lVXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RpbWVVcENsb2NrIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHN1cGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQ29udGludWVUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvL0FQUC5NZXNzYWdlQ2VudGVyLlRyaWdnZXIoR2FtZUV2ZW50LkdhbWVDb250aW51ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ICs9IExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5fVGltZVVwQ2xvY2s7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIh+aNouWJp+acrFxyXG4gICAgICAgICAqIEBwYXJhbSBuZXdTY2VuZVBsYXkg5paw5Ymn5pysXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIENoYW5nZUdhbWVQbGF5KCBuZXdTY2VuZVBsYXk6QmFzZVNjZW5lUGxheWUgKTogdm9pZCAge1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVN0YXRlKG5ld1NjZW5lUGxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmVQbGF5ZSBleHRlbmRzIEZTTS5TdGF0ZSB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkU2NlbmVMb2dpYyBleHRlbmRzIEJhc2VTY2VuZVBsYXllIHtcclxuICAgICAgICBwcml2YXRlIG1fTG9hZDJETGlzdDogYW55W107XHJcbiAgICAgICAgcHJpdmF0ZSBtX0xvYWQzRExpc3Q6IGFueVtdO1xyXG4gICAgICAgIHByaXZhdGUgbV9OZXh0U2NlbmU6IFNjZW5lLkJhc2VTY2VuZVBsYXllO1xyXG4gICAgICAgIHB1YmxpYyBnZXQgT3duZXJEaXJlY3RvcigpOiBCYXNlRGlyZWN0b3Ige1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX293bmVyIGFzIEJhc2VEaXJlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGxvYWQyRExpc3QgMkTliqDovb3liJfooahcclxuICAgICAgICAgKiBAcGFyYW0gbG9hZDNETGlzdCAzROWKoOi9veWIl+ihqFxyXG4gICAgICAgICAqIEBwYXJhbSBuZXh0U2NlbmUg5LiL5LiA5qC85Zy65pmvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IobG9hZDJETGlzdDogYW55W10sIGxvYWQzRExpc3Q6IGFueVtdLCBuZXh0U2NlbmU6IFNjZW5lLkJhc2VTY2VuZVBsYXllKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkMkRMaXN0ID0gbG9hZDJETGlzdDtcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWQzRExpc3QgPSBsb2FkM0RMaXN0O1xyXG4gICAgICAgICAgICB0aGlzLm1fTmV4dFNjZW5lID0gbmV4dFNjZW5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW5kKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydCgpIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLCB0aGlzLCB0aGlzLkxvYWRDb21wbGV0ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fTG9hZDJETGlzdClcclxuICAgICAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQodGhpcy5tX0xvYWQyRExpc3QsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0xvYWQzRExpc3QpXHJcbiAgICAgICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMubV9Mb2FkM0RMaXN0LCBudWxsLCBudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTG9hZENvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLk93bmVyRGlyZWN0b3IuQ2hhbmdlU3RhdGUodGhpcy5tX05leHRTY2VuZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vLi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuLy4uL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vLi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi8uLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vLi4vLi4vR2FtZS9Nb3VudExpbmVcIlxyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQkdVSSBmcm9tIFwiLi8uLi8uLi91aS9CR1wiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEdhbWVTY2VuZSBmcm9tIFwiLi4vR2FtZVNjZW5lXCI7XHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLy4uLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcblxyXG50eXBlIEl0ZW1MYXlvdXQgPSBJdGVtLkl0ZW1MYXlvdXQ7XHJcbnR5cGUgTGluZUl0ZW1JbmZvID0gSXRlbS5MaW5lSXRlbUluZm87XHJcbnZhciBJdGVtVHlwZSA9IEl0ZW0uSXRlbVR5cGU7XHJcblxyXG4vL+a4uOaIj+WvvOa8lFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmVQbGF5IGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lUGxheWUge1xyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIHByaXZhdGUgX0hlYWRGbG9vcklkeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfVGFpbEZMb29ySWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Db3VudFRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0Jvb3RvbUZsb29yOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9TdGFydFBvc2l0aW9uOiBMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF9HYW1lVXBkYXRlOiAoKSA9PiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBfUGFuZWxVSTogR2FtZVVJO1xyXG4gICAgcHJpdmF0ZSBfR29sZE51bTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfTG9naWNHb2xkTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9DdXJCRzogQkdVSTtcclxuICAgIHByaXZhdGUgX1NhZmVMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcblxyXG4gICAgQ2FtZXJhOiBHYW1lQ2FtZXJhO1xyXG4gICAgR2FtZVNjZW5lOiBCYXNlU2NlbmU7XHJcbiAgICBNb3VudExpbmVzOiBNb3VudExpbmVbXTtcclxuICAgIFBsYXllcjogUGxheWVyO1xyXG4gICAgSW5wdXRDdHJsOiBJbnB1dC5CYXNlR2FtZUlucHV0O1xyXG4gICAgSXRlbUxheW91dDogSXRlbUxheW91dDtcclxuICAgIEN1ckxpbmVSZXdhcmRzOiBBcnJheTxMaW5lSXRlbUluZm8+O1xyXG4gICAgQ3VyTGluZUJhcnJpZXJzOiBBcnJheTxMaW5lSXRlbUluZm8+O1xyXG4gICAgbmFtZTogbnVtYmVyO1xyXG4gICAgRnJlc2hCR0NvdW50OiBudW1iZXI7XHJcblxyXG4gICAgZ2V0IFNhZmVMb2NhdGlvbigpOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NhZmVMb2NhdGlvbjtcclxuICAgIH1cclxuICAgIGdldCBQYW5lbFVJKCk6IEdhbWVVSSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1BhbmVsVUk7XHJcbiAgICB9XHJcbiAgICBzZXQgUGFuZWxVSSh2YWx1ZTogR2FtZVVJKSB7XHJcbiAgICAgICAgdmFsdWUuU2V0TGVmdFRvdWNoKHRoaXMsICgpID0+IHsgdGhpcy5JbnB1dEN0cmwuSW5wdXQoZmFsc2UpOyB9KVxyXG4gICAgICAgIHZhbHVlLlNldFJpZ2h0VG91Y2godGhpcywgKCkgPT4geyB0aGlzLklucHV0Q3RybC5JbnB1dCh0cnVlKTsgfSk7XHJcbiAgICAgICAgdGhpcy5fUGFuZWxVSSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IEhlYWRGbG9vcigpOiBNb3VudExpbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbdGhpcy5fSGVhZEZsb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBUYWlsRkxvb3IoKTogTW91bnRMaW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb3VudExpbmVzW3RoaXMuX1RhaWxGTG9vcklkeF07XHJcbiAgICB9XHJcbiAgICBnZXQgUGxheWVyRmxvb3IoKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgZmxvb3I6IG51bWJlciA9IHRoaXMuX1N0YXJ0UG9zaXRpb24ueiAtIHRoaXMuUGxheWVyLkxvZ2ljUG9zaXRpb24uejtcclxuICAgICAgICBmbG9vciA9IE1hdGgucm91bmQoZmxvb3IgLyAoQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlIC8gMikpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhmbG9vcik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IERpc3RhbmNlKCk6IG51bWJlciAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuUGxheWVyRmxvb3IpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFBsYXllckZsb29yTGluZSgpOiBNb3VudExpbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLlBsYXllckZsb29yKTtcclxuICAgIH1cclxuICAgIGdldCBHYW1lVGltZSgpOiBudW1iZXIgIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMubV9vd25lciBhcyBHYW1lRGlyZWN0b3IpLkdhbWVUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuR2FtZVNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLk1vdW50TGluZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5JdGVtTGF5b3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yID0gMDtcclxuICAgICAgICB0aGlzLl9TdGFydFBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0N1ckJHID0gQVBQLlNjZW5lTWFuYWdlci5CRyBhcyBCR1VJO1xyXG4gICAgICAgIHRoaXMuRnJlc2hCR0NvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBBZGRJbnB1dEN0cmxlcih2YWx1ZTogSW5wdXQuQmFzZUdhbWVJbnB1dCkge1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsLkNsZWFyKCk7XHJcbiAgICAgICAgdmFsdWUuTmV4dElucHV0ID0gdGhpcy5JbnB1dEN0cmw7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFBvcElucHV0Q3RybGVyKCkge1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdGhpcy5JbnB1dEN0cmwuTmV4dElucHV0O1xyXG4gICAgfVxyXG4gICAgQWRkR29sZChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX0dvbGROdW0gKz0gbnVtO1xyXG4gICAgICAgIHRoaXMuQWRkTG9naWNHb2xkKG51bSk7XHJcbiAgICB9XHJcbiAgICBBZGRHb2xkVW5Mb2dpY0dvbGQobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtICs9IG51bTtcclxuICAgIH1cclxuICAgIEFkZExvZ2ljR29sZChudW06IG51bWJlcikge1xyXG5cclxuICAgICAgICB0aGlzLl9Mb2dpY0dvbGROdW0gKz0gbnVtO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5Hb2xkID0gdGhpcy5fTG9naWNHb2xkTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5a6J5YWo5L2N572uXHJcbiAgICBTZXRTYWZlUFMobG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uLlkgPCB0aGlzLlRhaWxGTG9vci5GbG9vck51bSB8fCBsb2NhdGlvbi5ZID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlJlc2V0SXRlbShsb2NhdGlvbi5ZKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5LuO5p+Q5LiA5bGC5byA5aeL5LiA5bGC5bGC6YeN5paw5pGG5pS+6YGT5YW3XHJcbiAgICBSZXNldEl0ZW0oZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICBmb3IgKGxldCBsb29wRmxvb3I6IG51bWJlciA9IGZsb29yOyBsb29wRmxvb3IgPD0gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW07ICsrbG9vcEZsb29yKSB7XHJcbiAgICAgICAgICAgIHZhciBmbG9vckxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb29wRmxvb3IpO1xyXG4gICAgICAgICAgICBmbG9vckxpbmUuTGF5T3V0RGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgZmxvb3JMaW5lLlNldExpbmUoZmxvb3JMaW5lLkZsb29yTnVtKTtcclxuICAgICAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShsb29wRmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+a4heeQhuWxgumBk+WFt1xyXG4gICAgQ2xlYXJGbG9vcihzdGVwOiBTdGVwKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHN0ZXBJdGVtID0gc3RlcC5TdGVwSXRlbTtcclxuICAgICAgICBzdGVwLlB1dEl0ZW0oSXRlbVR5cGUuTm9uZSk7XHJcbiAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgRGVhdGgoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUGxheWVyRGVhdGggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV9PbkdhbWVDb21wbGV0ZSgpO1xyXG4gICAgICAgIC8vdWkuU2V0R2FtZUluZm8odGhpcy5QbGF5ZXJEaXN0YW5jZSx0aGlzLl9Hb2xkTnVtKTtcclxuICAgIH1cclxuXHJcbiAgICBFbmQoKTogdm9pZCAge1xyXG5cclxuICAgIH1cclxuICAgIC8v6YeN5paw5byA5aeLXHJcbiAgICBSZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuU3RhcnRHYW1lKCk7XHJcbiAgICB9XHJcbiAgICBTaG93SW5wdXRJbmZvKGluZm86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgfVxyXG4gICAgLy/lt6blj7Pnp7vliqhcclxuICAgIE1vdmVTdGVwKGlzUmlnaHQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAvL3ZhciBidWZmID0gdGhpcy5CdWZmZXI7XHJcbiAgICAgICAgLy/ojrflj5bkuIvkuIDlsYLnmoRTdGVwXHJcbiAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSB0aGlzLlBsYXllci5DdXJTdGVwO1xyXG4gICAgICAgIGlmIChzdGVwID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNSaWdodCkge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0ZXAgPT0gbnVsbCB8fCBzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICB0aGlzLlBsYXllci5TdGFydE1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWxguaVsOiOt+WPluafkOWxglxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIFxyXG4gICAgICovXHJcbiAgICBHZXRGbG9vckJ5Rmxvb3IoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciB0YWlsRmxvb3I6IE1vdW50TGluZSA9IHRoaXMuVGFpbEZMb29yO1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRhaWxGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29ySUQgPSAoZmxvb3IgLSB0YWlsRmxvb3IuRmxvb3JOdW0gKyB0aGlzLl9UYWlsRkxvb3JJZHgpICUgdGhpcy5Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb3VudExpbmVzW2Zsb29ySURdO1xyXG4gICAgfVxyXG5cclxuICAgIExvb3BEb0Zsb29yU3RlcChmbG9vcjogbnVtYmVyLCBPd25lcjogYW55LCBjYWxsQmFjazogKHN0ZXA6IFN0ZXApID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZmxvb3IgPCB0aGlzLlRhaWxGTG9vci5GbG9vck51bSB8fCBmbG9vciA+IHRoaXMuSGVhZEZsb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yTGluZTogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGZsb29yTGluZS5Mb2dpY0xlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vckxpbmUuR2V0U3RlcChpZHgpO1xyXG4gICAgICAgICAgICBjYWxsQmFjay5jYWxsKE93bmVyLCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4flnZDmoIfojrflj5blj7DpmLZcclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiDntKLlvJUs5bGC5pWwXHJcbiAgICAgKi9cclxuICAgIEdldFN0ZXBCeUxvY2F0aW9uKGxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbik6IFN0ZXAge1xyXG4gICAgICAgIHZhciBnZXRTdGVwOiBTdGVwID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9jYXRpb24uWSkuR2V0U3RlcChsb2NhdGlvbi5YKTtcclxuICAgICAgICByZXR1cm4gZ2V0U3RlcDtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvL+WIm+W7uuebuOWFs+aUvui/mSDov5nph4zph43mlrDlvIDlp4vkuI3kvJrotbBcclxuICAgIHB1YmxpYyBTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkNhbWVyYSA9IG5ldyBHYW1lQ2FtZXJhKCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEudHJhbnNmb3JtLmxvY2FsUm90YXRpb25FdWxlciA9IG5ldyBMYXlhLlZlY3RvcjMoLTMwLCAwLCAwKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLkNhbWVyYSk7XHJcblxyXG4gICAgICAgIHRoaXMuTW91bnRMaW5lcyA9IFtdO1xyXG4gICAgICAgIHZhciBtYXhMaW5lTnVtID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTWF4TGluZU51bTtcclxuICAgICAgICBmb3IgKHZhciBsaW5lSWR4OiBudW1iZXIgPSBtYXhMaW5lTnVtIC0gMTsgbGluZUlkeCA+PSAwOyAtLWxpbmVJZHgpIHtcclxuICAgICAgICAgICAgdmFyIG5ld01vdW50TGluZSA9IG5ldyBNb3VudExpbmUobGluZUlkeCwgbGluZUlkeCk7XHJcbiAgICAgICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKG5ld01vdW50TGluZSk7XHJcbiAgICAgICAgICAgIHRoaXMuTW91bnRMaW5lc1tsaW5lSWR4XSA9IG5ld01vdW50TGluZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/liJvlu7pVSVxyXG5cclxuICAgICAgICAvL+WIm+W7uueOqeWutlxyXG4gICAgICAgIHRoaXMuUGxheWVyID0gbmV3IFBsYXllcigpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMuUGxheWVyKTtcclxuXHJcbiAgICAgICAgLy/lh4blpIfnjqnlrrbmrbvkuqHkuovku7ZcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgsIHRoaXMuRGVhdGgsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuU3RhcnRHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ov5vlhaXmuLjmiI/nmoTorr7nva7mlL7ov5nph4wg6YeN5paw5byA5aeL6LWw6L+Z6YeMXHJcbiAgICBwcm90ZWN0ZWQgU3RhcnRHYW1lKCkge1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuU2NlbmVPYmouYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKVxyXG4gICAgICAgIHRoaXMuX1NhZmVMb2NhdGlvbiA9IG5ldyBHYW1lU3RydWN0Lk1Mb2NhdGlvbigwLCAwKTtcclxuICAgICAgICAvL+mHjee9rueJqeWTgVxyXG4gICAgICAgIHRoaXMuSXRlbUxheW91dCA9IG5ldyBJdGVtLkl0ZW1MYXlvdXQoKVxyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB2YXIgbGluZXM6IE1vdW50TGluZVtdID0gdGhpcy5Nb3VudExpbmVzO1xyXG4gICAgICAgIC8v5Yib5bu66L6T5YWl5o6n5Yi25ZmoXHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSBuZXcgSW5wdXQuTm9ybUdhbWVJbnB1dCh0aGlzKTtcclxuICAgICAgICB0aGlzLl9IZWFkRmxvb3JJZHggPSBsaW5lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMuX1RhaWxGTG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUmVzZXQoKTtcclxuICAgICAgICBmb3IgKHZhciBpZHg6IG51bWJlciA9IDA7IGlkeCA8IGxpbmVzLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIGxpbmU6IE1vdW50TGluZSA9IHRoaXMuTW91bnRMaW5lc1tpZHhdO1xyXG4gICAgICAgICAgICBsaW5lLlNldExpbmUoaWR4KTtcclxuICAgICAgICAgICAgaWYgKGlkeCA+IDApXHJcbiAgICAgICAgICAgICAgICBsaW5lc1tpZHggLSAxXS5TZXROZXh0Rmxvb3IobGluZSk7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIFBsYXllclN0ZXAgPSBsaW5lLkdldFN0ZXAoTWF0aC5mbG9vcihsaW5lLkxvZ2ljTGVuZ3RoIC8gMikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuU2V0U3RlcChQbGF5ZXJTdGVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1NhZmVMb2NhdGlvbiA9IFBsYXllclN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TdGFydFBvc2l0aW9uID0gdGhpcy5QbGF5ZXIuTG9naWNQb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1B1dEl0ZW1JbkxpbmUoaWR4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuUmVzZXQobmV3IExheWEuVmVjdG9yMygpLCBuZXcgTGF5YS5WZWN0b3IzKHRoaXMuUGxheWVyLlBvc2l0aW9uLngsIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGggKiAxMC41LCBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoICogOSksIHRoaXMuUGxheWVyKTtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtID0gMDtcclxuICAgICAgICB0aGlzLl9Mb2dpY0dvbGROdW0gPSAwO1xyXG5cclxuICAgICAgICB0aGlzLlBhbmVsVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3coR2FtZVVJKTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuR29sZCA9IDA7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gdGhpcy5HYW1lVGltZSArIDYwMDA7XHJcbiAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgPSAwO1xyXG4gICAgICAgIHRoaXMuX0dhbWVVcGRhdGUgPSB0aGlzLl9TdGFydENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0dhbWVVcGRhdGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9HYW1lVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+ato+W4uOi/kOihjOaXtueahOavj+W4p+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBfUnVuR2FtZVVwZGF0ZSgpIHtcclxuICAgICAgICB2YXIgZGlzdDogbnVtYmVyID0gdGhpcy5QbGF5ZXJGbG9vcjtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuRGlzdGFuY2UgPSB0aGlzLkRpc3RhbmNlOyAvL3RoaXMuRGlzdGFuY2UoKTsvL01hdGguZmxvb3IoZGlzdCk7XHJcbiAgICAgICAgaWYgKHRoaXMuRnJlc2hCR0NvdW50ID4gMTApIHtcclxuICAgICAgICAgICAgdGhpcy5fQ3VyQkcuVXBkYXRlUGFnZShkaXN0KTtcclxuICAgICAgICAgICAgdGhpcy5GcmVzaEJHQ291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICArK3RoaXMuRnJlc2hCR0NvdW50O1xyXG5cclxuICAgICAgICB2YXIgZmxvb1ZlY3RvcjogTGF5YS5WZWN0b3IzID0gdGhpcy5UYWlsRkxvb3IuUG9zaXRpb247XHJcblxyXG4gICAgICAgIGlmIChmbG9vVmVjdG9yLnogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56ID4gMyAqIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZSAvIDIpIHtcclxuICAgICAgICAgICAgdGhpcy5fUHVzaEZMb29yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9Db3VudFRpbWUgPCB0aGlzLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUgKyAzMDAwO1xyXG4gICAgICAgICAgICB0aGlzLl9EZXN0cm95TGluZSh0aGlzLl9Cb290b21GbG9vcik7XHJcbiAgICAgICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5YCS6K6h5pe25pyf6Ze055qE5q+P5bin6YC76L6RXHJcbiAgICBwcml2YXRlIF9TdGFydENvdW50KCkge1xyXG4gICAgICAgIHZhciB0aW1lOiBzdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgdmFyIGNvdW50VGltZTogbnVtYmVyID0gdGhpcy5fQ291bnRUaW1lIC0gdGhpcy5HYW1lVGltZTtcclxuICAgICAgICBpZiAoY291bnRUaW1lID4gMClcclxuICAgICAgICAgICAgdGltZSArPSBNYXRoLmZsb29yKGNvdW50VGltZSAvIDEwMDApO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLlBhbmVsVUkuR2FtZVBhbmVsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSA9IHRoaXMuX1J1bkdhbWVVcGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUgKyAzMDAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBhbmVsVUkuU2V0Q291bnRUaW1lKHRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5bGC5ZCR5LiK5Y+gXHJcbiAgICBwcm90ZWN0ZWQgX1B1c2hGTG9vcigpIHtcclxuICAgICAgICB2YXIgcHJlSGVhZDogTW91bnRMaW5lID0gdGhpcy5IZWFkRmxvb3I7XHJcbiAgICAgICAgdGhpcy5fSGVhZEZsb29ySWR4ID0gKHRoaXMuX0hlYWRGbG9vcklkeCArIDEpICUgdGhpcy5Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLl9UYWlsRkxvb3JJZHggPSAodGhpcy5fVGFpbEZMb29ySWR4ICsgMSkgJSB0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBIZWFkZmxvb3I6IG51bWJlciA9IHByZUhlYWQuRmxvb3JOdW0gKyAxO1xyXG4gICAgICAgIHRoaXMuSGVhZEZsb29yLlNldExpbmUoSGVhZGZsb29yKTtcclxuICAgICAgICBwcmVIZWFkLlNldE5leHRGbG9vcih0aGlzLkhlYWRGbG9vcik7XHJcbiAgICAgICAgY29uc29sZS50aW1lKFwiUHV0SXRlbVwiKTtcclxuICAgICAgICB0aGlzLl9QdXRJdGVtSW5MaW5lKEhlYWRmbG9vcik7XHJcbiAgICAgICAgY29uc29sZS50aW1lRW5kKFwiUHV0SXRlbVwiKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciDnianlk4HliJfooahcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIF9QdXRJdGVtSW5MaW5lKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgc2FmZUNvbDogeyBba2V5OiBzdHJpbmddOiBBcnJheTxudW1iZXI+OyB9ID0ge307XHJcbiAgICAgICAgdmFyIGZsb29yTGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICAvL+W4g+e9rui/h+S6huS4jeeUqOWGjeW4g+e9ruS6hlxyXG4gICAgICAgIGlmIChmbG9vckxpbmUuTGF5T3V0RGlydHkpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBmbG9vckxpbmUuTGF5T3V0RGlydHkgPSB0cnVlO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgaWYoZmxvb3IgPj0gdGhpcy5fU2FmZUxvY2F0aW9uLlkgKyBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5NYXhMaW5lTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2FmZUNvbCA9IHRoaXMuX0NvdW50T3Blbkxpc3QoZmxvb3IpO1xyXG4gICAgICAgIH1lbHNlKi9cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5pGG5pS+5YmN5YWI6K6h566X6K+l5bGC6YCa6Lev5oOF5Ya1IFxyXG4gICAgICAgICAgICBzYWZlQ29sID0ge31cclxuICAgICAgICAgICAgc2FmZUNvbFtcIm9cIl0gPSB0aGlzLl9Db3VudFJvYWRJbmZvKGZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lh7rnlJ/ngrnkuI3mlL7pgZPlhbdcclxuICAgICAgICBpZiAoZmxvb3IgPCAxIHx8IGZsb29yID09IHRoaXMuU2FmZUxvY2F0aW9uLlkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iOt+WPluivpeihjOimgeaRhuaUvueahOeJqeWTgVxyXG4gICAgICAgIHRoaXMuX1Rha2VJdGVtTGlzdChmbG9vcilcclxuXHJcbiAgICAgICAgLy/moIforrDkuIDmnaHnu53lr7nlronlhajnmoTot69cclxuICAgICAgICB2YXIgc2FmZUlkeENvbGw6IHsgW2tleTogc3RyaW5nXTogbnVtYmVyOyB9ID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgY29sS2V5IGluIHNhZmVDb2wpIHtcclxuICAgICAgICAgICAgdmFyIGxpc3QgPSBzYWZlQ29sW2NvbEtleV07XHJcbiAgICAgICAgICAgIHZhciBzYWZlSWR4ID0gbGlzdFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsaXN0Lmxlbmd0aCldO1xyXG4gICAgICAgICAgICBpZiAoc2FmZUlkeENvbGxbc2FmZUlkeF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzYWZlSWR4Q29sbFtzYWZlSWR4XSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/miorpnIDopoHmlL7pgZPlhbfnmoTmoLzlrZDmlL7lhaXpmo/mnLrmsaBcclxuICAgICAgICB2YXIgY3VyRmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICB2YXIgcmFuZG9tUG9vbDogQXJyYXk8U3RlcD4gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAvL+aKiuWuieWFqOeahOagvOWtkOaaguaXtuenu+WHuuadpVxyXG4gICAgICAgIHZhciBzYWZlU3RlcExpc3Q6IEFycmF5PFN0ZXA+ID0gbmV3IEFycmF5PFN0ZXA+KCk7XHJcbiAgICAgICAgZm9yICh2YXIgc3RlcElkeDogbnVtYmVyID0gMDsgc3RlcElkeCA8IGN1ckZsb29yLkxvZ2ljTGVuZ3RoOyArK3N0ZXBJZHgpIHtcclxuICAgICAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSBjdXJGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoc2FmZUlkeENvbGxbc3RlcElkeF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnB1c2goZ2V0U3RlcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aUvumZt+mYsVxyXG4gICAgICAgIHZhciBiYXJyaWVyc0xpc3Q6IEFycmF5PExpbmVJdGVtSW5mbz4gPSB0aGlzLkN1ckxpbmVCYXJyaWVycztcclxuICAgICAgICB0aGlzLl9Pcmdpbml6ZVB1dEl0ZW0oYmFycmllcnNMaXN0LCByYW5kb21Qb29sLCB0cnVlKTtcclxuXHJcbiAgICAgICAgLy/mkYbmlL7pgZPlhbdcclxuICAgICAgICBmb3IgKHZhciBzYWZlU3RlcElkeDogbnVtYmVyID0gMDsgc2FmZVN0ZXBJZHggPCBzYWZlU3RlcExpc3QubGVuZ3RoOyArK3NhZmVTdGVwSWR4KSB7XHJcbiAgICAgICAgICAgIHJhbmRvbVBvb2wucHVzaChzYWZlU3RlcExpc3Rbc2FmZVN0ZXBJZHhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJld2FyZExpc3QgPSB0aGlzLkN1ckxpbmVSZXdhcmRzO1xyXG4gICAgICAgIHRoaXMuX09yZ2luaXplUHV0SXRlbShyZXdhcmRMaXN0LCByYW5kb21Qb29sKTtcclxuICAgICAgICAvL+WGjeasoeiuoeeul+mAmui3r+aDheWGtSBcclxuICAgICAgICAvL3RoaXMuX0NvdW50TGFzdEZsb29yUm9hZChmbG9vcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TGluZUl0ZW1JbmZvPn0gaXRlbUxpc3Qg54mp5ZOB5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFN0ZXA+fSByYW5kb21Qb29sIOWPsOmYtumbhuWQiFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0RlYWRSb2FkIOaYr+WQpuaYr+atu+i3r1xyXG4gICAgICovXHJcbiAgICBfT3JnaW5pemVQdXRJdGVtKGl0ZW1MaXN0OiBBcnJheTxMaW5lSXRlbUluZm8+LCByYW5kb21Qb29sOiBBcnJheTxTdGVwPiwgaXNEZWFkUm9hZDogYm9vbGVhbiA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKHZhciBpdGVtSWR4OiBudW1iZXIgPSAwOyBpdGVtSWR4IDwgaXRlbUxpc3QubGVuZ3RoOyArK2l0ZW1JZHgpIHtcclxuICAgICAgICAgICAgdmFyIGluZm86IExpbmVJdGVtSW5mbyA9IGl0ZW1MaXN0W2l0ZW1JZHhdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkaWZmaWN1bHR5TnVtOiBudW1iZXIgPSAwOyBkaWZmaWN1bHR5TnVtIDwgaW5mby5OdW1iZXI7KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tUG9vbC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+maj+acuuaKiumanOeijeaUvuWFpeagvOWtkOmHjFxyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbUlkeDogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmFuZG9tUG9vbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSByYW5kb21Qb29sW3JhbmRvbUlkeF07XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnNwbGljZShyYW5kb21JZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgc3RlcC5QdXRJdGVtKGluZm8uVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWFkUm9hZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IGlzRGVhZFJvYWQ7XHJcbiAgICAgICAgICAgICAgICAtLWluZm8uTnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyYW5kb21Qb29sLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtSWR4ID4gMCkge1xyXG4gICAgICAgICAgICBpdGVtTGlzdC5zcGxpY2UoMCwgaXRlbUlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICrpgJLlvZLorqHnrpfpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vck51bSDnianlk4HliJfooahcclxuICAgICAqL1xyXG4gICAgX0NvdW50T3Blbkxpc3QoZmxvb3JOdW06IG51bWJlcik6IHsgW2tleTogc3RyaW5nXTogQXJyYXk8bnVtYmVyPjsgfSB7XHJcbiAgICAgICAgZm9yICh2YXIgZmxvb3JDb3VudDogbnVtYmVyID0gdGhpcy5QbGF5ZXJGbG9vcjsgZmxvb3JDb3VudCA8PSBmbG9vck51bTsgKytmbG9vckNvdW50KSB7XHJcbiAgICAgICAgICAgIHZhciBmbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JDb3VudCk7XHJcbiAgICAgICAgICAgIGlmIChmbG9vciA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzdGVwSWR4ID0gMDsgc3RlcElkeCA8IGZsb29yLkxvZ2ljTGVuZ3RoOyArK3N0ZXBJZHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgICAgIHN0ZXAuTWFyayA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKHRoaXMuUGxheWVyRmxvb3IpO1xyXG4gICAgICAgIGZvciAodmFyIHN0ZXBJZHggPSAwOyBzdGVwSWR4IDwgZmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcCA9IGZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgIGlmICghc3RlcC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9NYXJrU3RlcHMoc3RlcCwgc3RlcElkeCwgZmxvb3JOdW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB0YXJnZXRGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JOdW0pO1xyXG4gICAgICAgIC8v5om+5Ye66KKr5qCH6K6w55qE54K55bm25pW055CG5oiQ6ZuG5ZCIXHJcbiAgICAgICAgdmFyIGNvbGxlY3Rpb246IHsgW2tleTogc3RyaW5nXTogQXJyYXk8bnVtYmVyPjsgfSA9IHt9XHJcbiAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IFwib1wiXHJcbiAgICAgICAgZm9yICh2YXIgb3BlbklkeDogbnVtYmVyID0gMDsgb3BlbklkeCA8IHRhcmdldEZsb29yLkxvZ2ljTGVuZ3RoOyArK29wZW5JZHgpIHtcclxuICAgICAgICAgICAgdmFyIG1hcmtlZFN0ZXA6IFN0ZXAgPSB0YXJnZXRGbG9vci5HZXRTdGVwKG9wZW5JZHgpO1xyXG4gICAgICAgICAgICBpZiAobWFya2VkU3RlcC5NYXJrICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIE5hbWU6IHN0cmluZyA9IG5hbWUgKyBtYXJrZWRTdGVwLk1hcms7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29sbGVjdGlvbltOYW1lXSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWN0aW9uW05hbWVdID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbltOYW1lXS5wdXNoKG9wZW5JZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKumAkuW9kuagh+iusOmAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtTdGVwfSBzdGVwIOWPsOmYtlxyXG4gICAgICogQHBhcmFtIHthbnl9IG1hcmsg5qCH6K6wXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdGFyZ2V0Rmxvb3JOdW0g55uu5qCH5bGC5pWwXHJcbiAgICAgKi9cclxuICAgIF9NYXJrU3RlcHMoc3RlcDogU3RlcCwgbWFyazogYW55LCB0YXJnZXRGbG9vck51bTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChzdGVwLkZsb29yLkZsb29yTnVtID49IHRhcmdldEZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGVwLk1hcmsgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzdGVwLk1hcmsgPSBtYXJrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsZWZ0T3BlbjogYm9vbGVhbjtcclxuICAgICAgICB2YXIgcmlnaHRPcGVuOiBib29sZWFuO1xyXG4gICAgICAgIHZhciBsZWZ0UGFyZW50OiBTdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgIGlmIChsZWZ0UGFyZW50ICE9IG51bGwgJiYgIWxlZnRQYXJlbnQuSXNEZWFkUm9hZCkge1xyXG4gICAgICAgICAgICBpZiAobGVmdFBhcmVudC5NYXJrID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGxlZnRPcGVuID0gdGhpcy5fTWFya1N0ZXBzKGxlZnRQYXJlbnQsIG1hcmssIHRhcmdldEZsb29yTnVtKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgbGVmdE9wZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmlnaHRQYXJlbnQ6IFN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgIGlmIChyaWdodFBhcmVudCAhPSBudWxsICYmICFyaWdodFBhcmVudC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgIGlmIChyaWdodFBhcmVudC5NYXJrID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHJpZ2h0T3BlbiA9IHRoaXMuX01hcmtTdGVwcyhyaWdodFBhcmVudCwgbWFyaywgdGFyZ2V0Rmxvb3JOdW0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICByaWdodE9wZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RlcC5NYXJrID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzdGVwLk1hcmsgPSBtYXJrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghbGVmdE9wZW4gJiYgIXJpZ2h0T3Blbikge1xyXG4gICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pyA5ZCO5YaN6K6h566X5LiA5qyh6K+l5bGC6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3JOdW0gXHJcbiAgICAgKi9cclxuICAgIF9Db3VudExhc3RGbG9vclJvYWQoZmxvb3JOdW06IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChmbG9vck51bSA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JOdW0pO1xyXG4gICAgICAgIHZhciBsYXN0Rmxvb3IgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSAtIDEpO1xyXG4gICAgICAgIGZvciAodmFyIHN0ZXBJZHggPSAwOyBzdGVwSWR4IDwgZmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IGZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgIGlmICghc3RlcC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgTGVmdFN0ZXAgPSBzdGVwLkxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICAgIHZhciBSaWdodFN0ZXAgPSBzdGVwLlJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoTGVmdFN0ZXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghTGVmdFN0ZXAuSXNEZWFkUm9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK0xlZnRTdGVwLlJvYWROdW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKFJpZ2h0U3RlcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFSaWdodFN0ZXAuSXNEZWFkUm9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICArK1JpZ2h0U3RlcC5Sb2FkTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBsYXN0U3RlcElkeCA9IDA7IGxhc3RTdGVwSWR4IDwgbGFzdEZsb29yLkxvZ2ljTGVuZ3RoOyArK2xhc3RTdGVwSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwID0gbGFzdEZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgIGlmICghc3RlcC5Jc0RlYWRSb2FkICYmIHN0ZXAuUm9hZE51bSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIC8v5ZCR5LiK6YCS5b2S5oqK5omA5pyJ5LiO5LmL55u46L+e55qE6IqC54K55pWw57uZ5L+u5q2j5LqGXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlL7pgZPlhbfliY3nrpfpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgX0NvdW50Um9hZEluZm8oZmxvb3I6IG51bWJlcik6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHZhciBzYWZlU3RlcExpc3Q6IEFycmF5PG51bWJlcj4gPSBbXTtcclxuICAgICAgICB2YXIgdGhpc0Zsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcblxyXG4gICAgICAgIHZhciByb2FkTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBsYXN0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yIC0gMSk7XHJcbiAgICAgICAgaWYgKGZsb29yID09IHRoaXMuX1NhZmVMb2NhdGlvbi5ZKVxyXG4gICAgICAgICAgICB0aGlzLl9SZXNldFN0ZXBJbmZvKHRoaXNGbG9vcik7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGxvZ2ljSWR4OiBudW1iZXIgPSAwOyBsb2dpY0lkeCA8IHRoaXNGbG9vci5Mb2dpY0xlbmd0aDsgKytsb2dpY0lkeCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVmdENoaWxkOiBTdGVwID0gc3RlcC5MZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRDaGlsZDogU3RlcCA9IHN0ZXAuUmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICAgIGlmIChsZWZ0Q2hpbGQgIT0gbnVsbCAmJiAhbGVmdENoaWxkLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJpZ2h0Q2hpbGQgIT0gbnVsbCAmJiAhcmlnaHRDaGlsZC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZVN0ZXBMaXN0LnB1c2gobG9naWNJZHgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChmbG9vciA9PSB0aGlzLl9TYWZlTG9jYXRpb24uWSkge1xyXG4gICAgICAgICAgICB2YXIgc2FmZVN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcCh0aGlzLl9TYWZlTG9jYXRpb24uWCk7XHJcbiAgICAgICAgICAgIHNhZmVTdGVwLklzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2FmZVN0ZXBMaXN0LnB1c2godGhpcy5fU2FmZUxvY2F0aW9uLlgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNhZmVTdGVwTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBfUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3I6IE1vdW50TGluZSkge1xyXG4gICAgICAgIGlmICghdGhpc0Zsb29yKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgbG9naWNJZHg6IG51bWJlciA9IDA7IGxvZ2ljSWR4IDwgdGhpc0Zsb29yLkxvZ2ljTGVuZ3RoOyArK2xvZ2ljSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gdGhpc0Zsb29yLkdldFN0ZXAobG9naWNJZHgpO1xyXG4gICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluafkOmBk+WFt+S/oeaBr1xyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9Zmxvb3IgXHJcbiAgICAgKi9cclxuICAgIF9UYWtlSXRlbUxpc3QoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBsaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciBpdGVtTGlzdCA9IG5ldyBBcnJheShsaW5lLkxvZ2ljTGVuZ3RoKTtcclxuICAgICAgICB2YXIgbGluZVJld2FyZHMgPSB0aGlzLkl0ZW1MYXlvdXQuVGFrZUxpbmVSZXdhcmQoZmxvb3IpO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSB0aGlzLkN1ckxpbmVSZXdhcmRzLmNvbmNhdChsaW5lUmV3YXJkcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuU2FmZUxvY2F0aW9uLlkgPiBmbG9vciB8fCBmbG9vciA+IHRoaXMuU2FmZUxvY2F0aW9uLlkgKyAxKSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lQmFycmllcnMgPSB0aGlzLkl0ZW1MYXlvdXQuVGFrZUxpbmVEaWZmaWN1bHR5KGZsb29yKTtcclxuICAgICAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSB0aGlzLkN1ckxpbmVCYXJyaWVycy5jb25jYXQobGluZUJhcnJpZXJzKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5DdXJMaW5lQmFycmllcnMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWhjOmZt+afkOS4gOWxglxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9Zmxvb3IgXHJcbiAgICAgKi9cclxuICAgIF9EZXN0cm95TGluZShmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHRhaWxGbG9vciA9IHRoaXMuVGFpbEZMb29yO1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRhaWxGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGNvdW50Rmxvb3I6IG51bWJlciA9IHRhaWxGbG9vci5GbG9vck51bTsgY291bnRGbG9vciA8PSBmbG9vcjsgKytjb3VudEZsb29yKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoY291bnRGbG9vcik7XHJcbiAgICAgICAgICAgIHRhcmdldEZsb29yLkJyZWFrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUGxheWVyLlRvdWNoR3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBtX09uR2FtZUNvbXBsZXRlKCkgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgsIHRoaXMuRGVhdGgsIHRoaXMpO1xyXG4gICAgICAgIHZhciB1aTogRW5kR2FtZVVJID0gQVBQLlVJTWFuYWdlci5TaG93PEVuZEdhbWVVST4oRW5kR2FtZVVJKTtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQWRkR29sZCh0aGlzLl9Hb2xkTnVtKTtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQWRkU2NvcmUodGhpcy5fR29sZE51bSAqIDEwICsgdGhpcy5EaXN0YW5jZSAqIDEwKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgcGF0aFxyXG57XHJcbiAgICBleHBvcnQgdmFyIElzRWRpdG9yOmJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGV4cG9ydCB2YXIgU2NlbmVBc3NldFBhdGg6c3RyaW5nID0gXCJMYXlhU2NlbmVfXCI7XHJcbiAgICBleHBvcnQgdmFyIFJlc291cmNlUGF0aDpzdHJpbmcgPSBJc0VkaXRvcj9cIi4uL05ldFJlc291cmNlXzNfMjkvXCI6XCJodHRwczovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9OZXRSZXNvdXJjZV8zXzI5L1wiO1xyXG4gICAgZXhwb3J0IHZhciBVSVBhdGg6c3RyaW5nID0gUmVzb3VyY2VQYXRoICsgXCJVSS9cIjtcclxuICAgIGV4cG9ydCB2YXIgTW9kZWxQYXRoOnN0cmluZyA9IFJlc291cmNlUGF0aCtcIjNEL1wiXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WQXRs5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRBdGxQYXRoKGZpbGVOYW1lOnN0cmluZyk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFVJUGF0aCArIGZpbGVOYW1lK1wiLmF0bGFzXCI7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPllVJSnNvbui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0RGVwYXRoVUlKUyhmaWxlTmFtZTpzdHJpbmcpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgVUlQYXRoK2ZpbGVOYW1lK1wiLmpzb25cIjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WbGjmlofku7bot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldExIKGZpbGVOYW1lOnN0cmluZyk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIE1vZGVsUGF0aCArU2NlbmVBc3NldFBhdGgrZmlsZU5hbWUrXCIvQ29udmVudGlvbmFsL1wiICtmaWxlTmFtZSArIFwiLmxoXCJcclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgVUlGdW5jIHtcclxuICAgIC8v6K6h566X57yp5pS+5YC8XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ291bnRTY2FsZUZpeCh3aWR0aDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXdpZHRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YWdlV2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHZhciBzY2FsZTogbnVtYmVyID0gc3RhZ2VXaWR0aCAvIHdpZHRoO1xyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBGaXhVSSh2aWV3OiBMYXlhLlNwcml0ZSwgd2lkdGg6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBzY2FsZSA9IFVJRnVuYy5Db3VudFNjYWxlRml4KHdpZHRoID8gd2lkdGggOiB2aWV3LndpZHRoKTtcclxuICAgICAgICB2aWV3LnNjYWxlWCA9IHNjYWxlO1xyXG4gICAgICAgIHZpZXcuc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgdmlldy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodCAvIHNjYWxlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgU2NlbmVNZ3IgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFRpbWVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9UaW1lTWFuYWdlclwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBQIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfU2NlbmVNZ3I6IFNjZW5lTWdyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19UaW1lTWdyOiBUaW1lTWFuYWdlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfVUlNYW5hZ2VyOiBVSU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19GcmFtZVdvcms6RnJhbWVXb3JrO1xyXG4gICAgc3RhdGljIGdldCBGcmFtZVdvcmsoKTpGcmFtZVdvcmtcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nX0ZyYW1lV29yaztcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgTWVzc2FnZU1hbmFnZXIoKTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIgIHtcclxuICAgICAgICByZXR1cm4gQVBQLmdfTWVzc2FnZTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgVUlNYW5hZ2VyKCk6IFVJTWFuYWdlciAge1xyXG4gICAgICAgIGlmIChBUFAuZ19VSU1hbmFnZXIgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgQVBQLmdfVUlNYW5hZ2VyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuZ19VSU1hbmFnZXI7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IFNjZW5lTWFuYWdlcigpOiBTY2VuZU1nciAge1xyXG4gICAgICAgIGlmIChBUFAuZ19TY2VuZU1nciA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBBUFAuZ19TY2VuZU1nciA9IEZXLkZNLkdldE1hbmFnZXI8U2NlbmVNZ3I+KFNjZW5lTWdyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFQUC5nX1NjZW5lTWdyO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBUaW1lTWFuYWdlcigpOiBUaW1lTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmIChBUFAuZ19UaW1lTWdyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIEFQUC5nX1RpbWVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFRpbWVNYW5hZ2VyPihUaW1lTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuZ19UaW1lTWdyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBJbml0KClcclxuICAgIHtcclxuICAgICAgICBBUFAuZ19GcmFtZVdvcmsgPSBGcmFtZVdvcmsuRk07XHJcbiAgICAgICAgdmFyIGZtOkZyYW1lV29yayAgPSBBUFAuZ19GcmFtZVdvcms7XHJcbiAgICAgICAgQVBQLmdfTWVzc2FnZSA9IGZtLkFkZE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICBBUFAuZ19TY2VuZU1nciA9ICBmbS5BZGRNYW5hZ2VyPFNjZW5lTWdyPihTY2VuZU1ncik7XHJcbiAgICAgICAgQVBQLmdfVGltZU1nciA9IGZtLkFkZE1hbmFnZXI8VGltZU1hbmFnZXI+KFRpbWVNYW5hZ2VyKTtcclxuICAgICAgICBBUFAuZ19VSU1hbmFnZXIgPSBmbS5BZGRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3REZWxlZ2F0ZSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IFNldFBhbmVsVUkgZnJvbSBcIi4vLi4vdWkvU2V0UGFuZWxVSVwiXHJcbmltcG9ydCBDaGFyYWN0ZXJVSSBmcm9tIFwiLi8uLi91aS9DaGFyYWN0ZXJVSVwiXHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZVNjZW5lXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuL0FQUFwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuXHJcbnR5cGUgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sZXJcclxue1xyXG4gICAgc3RhdGljIGdldCBHYW1lQ29udHJvbGVyKCk6R2FtZUNvbnRyb2xlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgR2FtZUNvbnRyb2xlci5NZ3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDb250cm9sZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjogR2FtZUNvbnRyb2xlcjtcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBNZ3IoKTogR2FtZUNvbnRyb2xlciB7XHJcbiAgICAgICAgaWYgKEdhbWVDb250cm9sZXIuX01nciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIEdhbWVDb250cm9sZXIuX01nciA9IG5ldyBHYW1lQ29udHJvbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lQ29udHJvbGVyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBfTGluZVN0ZXBOdW06bnVtYmVyO1xyXG4gICAgX01heExpbmVOdW06bnVtYmVyO1xyXG4gICAgX1N0ZXBMZW5ndGg6bnVtYmVyO1xyXG4gICAgX1N0ZXBEaXN0YW5jZTpudW1iZXI7XHJcbiAgICBfUGxheWVyTW92ZVRpbWU6bnVtYmVyO1xyXG4gICAgLy/luLjph4/lrprkuYlcclxuICAgIC8v5q+P6KGM5pyA5aSn5qC85a2Q5pWwXHJcbiAgICBnZXQgTGluZVN0ZXBOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX0xpbmVTdGVwTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTGluZVN0ZXBOdW0gPSA1KzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9MaW5lU3RlcE51bTtcclxuICAgIH0gXHJcbiAgICAvL+acgOWkp+ihjOaVsFxyXG4gICAgZ2V0IE1heExpbmVOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX01heExpbmVOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9NYXhMaW5lTnVtID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9NYXhMaW5lTnVtO1xyXG4gICAgfSBcclxuICAgIC8v5qC85a2Q6L656ZW/XHJcbiAgICBnZXQgU3RlcExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9TdGVwTGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RlcExlbmd0aCA9IDAuOTg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGVwTGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgLy/moLzlrZDmlpzlr7nop5Lplb/luqZcclxuICAgIGdldCBTdGVwRGlzdGFuY2UoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcERpc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RlcERpc3RhbmNlID0gTWF0aC5zcXJ0KCh0aGlzLlN0ZXBMZW5ndGggKiB0aGlzLlN0ZXBMZW5ndGgpICogMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGVwRGlzdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+eOqeWutuenu+WKqOaXtumXtFxyXG4gICAgZ2V0IFBsYXllck1vdmVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1BsYXllck1vdmVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fUGxheWVyTW92ZVRpbWUgPSAwLjAyICogMTAwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9QbGF5ZXJNb3ZlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRQbGF5ZXJJRChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGd1ZXN0QWdlbnQ6UGxheWVyR3Vlc3RBZ2VudCA9IFBsYXllckd1ZXN0RGVsZWdhdGUuR3Vlc3RBZ2VudDtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDpBcnJheTxudW1iZXI+ID0gZ3Vlc3RBZ2VudC5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIGlmKCFjaGFyYWN0ZXJMaXN0W2lkXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFndWVzdEFnZW50LkJ1eUNoYXJhY3RlcihpZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBndWVzdEFnZW50LlNldENoYXJhY3RlcihpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrorr7nva7pnaLmnb9cclxuICAgIFNob3dTZXRQYW5lbCgpIHtcclxuICAgICAgICB2YXIgUGFuZWwgPSBBUFAuVUlNYW5hZ2VyLlNob3c8U2V0UGFuZWxVST4oU2V0UGFuZWxVSSk7Ly8gbmV3IFNldFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrop5LoibLpnaLmnb9cclxuICAgIHB1YmxpYyBTaG93Q2hhcmFjdGVyUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IEFQUC5VSU1hbmFnZXIuU2hvdzxDaGFyYWN0ZXJVST4oQ2hhcmFjdGVyVUkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1NldEluZm87XHJcbiAgICBnZXQgU2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIGlmICh0aGlzLl9TZXRJbmZvID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFNldEluZm8odmFsdWU6IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuX1NldEluZm8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/neWtmOiuvue9ruaVsOaNrlxyXG4gICAgU2F2ZVNldEluZm8oaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5TZXRJbmZvID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvL+ivu+WPluiuvue9ruS/oeaBr1xyXG4gICAgR2V0U2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJHYW1lVUkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBFbnRlckdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZURpcigpOiBHYW1lRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkRpcmVjdG9yIGFzIEdhbWVEaXJlY3RvcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR2FtZVNjZW5lKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DaGFuZ2VTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQQlVGRuihqOeOsOaViOaenFxyXG4gICAgR2VuQnVmZkVmZmVjdCh0eXBlOiBJdGVtVHlwZSk6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEJ1eUl0ZW0oaWQ6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkJ1eUl0ZW0oaWQpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUVsZW1lbnQgZXh0ZW5kcyBMYXlhLkJveCB7XHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1JZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0J0bjogTGF5YS5CdXR0b247XHJcbiAgICBwcml2YXRlIF9JbWc6IExheWEuSW1hZ2U7XHJcbiAgICBwcml2YXRlIG1fTnVtTGFiZWw6IExheWEuTGFiZWw7XHJcbiAgICBwcml2YXRlIG1fTGFiZWxTdHJpbmc6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBtX0J1eUl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIHByaXZhdGUgbV9DaG9vc2VJdGVtOiBNZXNzYWdlTUQuRGVsZWdhdGU7XHJcblxyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J0biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgSXRlbUlkeChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1JZHggPSBpZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBJbWcoKTogTGF5YS5JbWFnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0ltZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQnV5QnRuKCk6IExheWEuQnV0dG9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBJc0dyYXkodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLkltZy5ncmF5ID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IElzR3JheSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5JbWcuZ3JheTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgTnVtKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0xhYmVsU3RyaW5nWzFdID0gXCJcIiArIG51bTtcclxuICAgICAgICB0aGlzLm1fTnVtTGFiZWwudGV4dCA9IHRoaXMubV9MYWJlbFN0cmluZ1swXSArIHRoaXMubV9MYWJlbFN0cmluZ1sxXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgUHJpY2UobnVtOiBudW1iZXIpICB7XHJcbiAgICAgICAgdGhpcy5fQnRuLnRleHQudGV4dCA9IFwiXCIgKyBudW07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5fSW1nID0gdGhpcy5nZXRDaGlsZEF0KDApIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgIHRoaXMubV9OdW1MYWJlbCA9IHRoaXMuZ2V0Q2hpbGRBdCgyKSBhcyBMYXlhLkxhYmVsO1xyXG4gICAgICAgIHRoaXMuX0J0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkJ1eUl0ZW0pO1xyXG4gICAgICAgIHRoaXMuX0ltZy5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkNob29zZUltZyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1fTGFiZWxTdHJpbmcpICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9MYWJlbFN0cmluZyA9IHRoaXMubV9OdW1MYWJlbC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENob29zZUltZygpIHtcclxuICAgICAgICBpZiAodGhpcy5tX0Nob29zZUl0ZW0pXHJcbiAgICAgICAgICAgIHRoaXMubV9DaG9vc2VJdGVtLkV4ZWN1dGUodGhpcy5tX0l0ZW1JZHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlJdGVtKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQnV5SXRlbSlcclxuICAgICAgICAgICAgdGhpcy5tX0J1eUl0ZW0uRXhlY3V0ZSh0aGlzLm1fSXRlbUlkeCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdEJ1eShvd25lcjogYW55LCBsaXN0ZW5lcjogKGlkOiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICB2YXIgbmV3RGVsZWdhdGUgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5tX0J1eUl0ZW0gPSBuZXdEZWxlZ2F0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0Q2hvb3NlKG93bmVyOiBhbnksIGxpc3RlbmVyOiAoaWQ6IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciBuZXdEZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fQ2hvb3NlSXRlbSA9IG5ld0RlbGVnYXRlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZUVsZW1lbnQgZXh0ZW5kcyBMYXlhLkltYWdlIHtcclxuICAgIC8vXHJcbiAgICBwcml2YXRlIF9CdG46IExheWEuQnV0dG9uO1xyXG4gICAgcHJpdmF0ZSBfSW1nOiBMYXlhLkltYWdlO1xyXG4gICAgcHJpdmF0ZSBtX09uQ2xpY2tJbWc6KGlkOm51bWJlcik9PnZvaWQ7XHJcbiAgICBwcml2YXRlIG1fQ2hhcmFjdGVySUQ6bnVtYmVyO1xyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J0biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICAgICAgdGhpcy5fQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRQbGF5ZXJJRCh0aGlzLm1fQ2hhcmFjdGVySUQpO1xyXG4gICAgICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuXHJcbiAgICBSZXNldCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX0ltZykge1xyXG4gICAgICAgICAgICB0aGlzLkluaXQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0R3JheShpc0dyYXk6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9JbWcuZ3JheSA9IGlzR3JheTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0T25JbWdDbGljayhldmVudEZ1bmN0aW9uOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBpZD10aGlzLm1fQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdGhpcy5fSW1nLm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCxldmVudEZ1bmN0aW9uKTsvLyBvd25lciwgKCk9PnsgZXZlbnRGdW5jdGlvbihpZCkgfSApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBDaGFyYWN0ZXJJRChpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3RlcklEID0gaWQ7XHJcbiAgICB9XHJcbiAgICBJbml0KCkgIHtcclxuICAgICAgICB0aGlzLl9JbWcgPSB0aGlzLmdldENoaWxkQXQoMCkgYXMgTGF5YS5JbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnR7QmFzZUZ1bmN9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQkdVSSBleHRlbmRzIHVpLkJHVUkge1xyXG4gICAgXHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkJHXCIpKSk7XHJcbiAgICB9XHJcbiAgICAvL3ByaXZhdGUgX1NreUFycjpBcnJheTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9Ta3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1RlbXBTa3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1NjYWxlU2t5Om51bWJlcjtcclxuICAgIHByaXZhdGUgX1NjYWxlRWFydGg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfRWFydGhTdGFydFBTOm51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB3aWRoID0gTGF5YS5zdGFnZS53aWR0aCA7XHJcbiAgICAgICAgdmFyIHJhdGUgPSBNYXRoLmNlaWwoTGF5YS5zdGFnZS5oZWlnaHQvd2lkaCk7XHJcblxyXG4gICAgICAgIHRoaXMuX1NreVF1ZSA9IG5ldyBCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+KCk7XHJcbiAgICAgICAgdGhpcy5fVGVtcFNreVF1ZSA9IG5ldyBCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+KCk7XHJcbiAgICAgICAgIC8vbmV3IEFycmF5PExheWEuSW1hZ2U+KHJhdGUrMSk7XHJcbiAgICAgICAgZm9yKGxldCBzdGFydElkeCA9IDA7c3RhcnRJZHg8cmF0ZSsxOyArK3N0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZTpMYXlhLkltYWdlID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1hZ2UubG9hZEltYWdlKFwiY29tcC9pbWdfYmFja2dyb3VuZF9zcHJfc2t5LnBuZ1wiKTtcclxuICAgICAgICAgICAgaW1hZ2Uud2lkdGggPSB3aWRoO1xyXG4gICAgICAgICAgICBpbWFnZS5oZWlnaHQgPSB3aWRoK3dpZGgqMC4wMTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChpbWFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1NreVF1ZS5QdXNoKGltYWdlKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIHRoaXMuU2V0U2t5KDApO1xyXG4gICAgICAgIHZhciBlYXJ0aCA9IG5ldyBMYXlhLkltYWdlKCk7XHJcbiAgICAgICAgZWFydGgueSA9IExheWEuc3RhZ2UuaGVpZ2h0IC0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9FYXJ0aFN0YXJ0UFMgPSBlYXJ0aC55O1xyXG4gICAgICAgIGVhcnRoLmxvYWRJbWFnZShcImNvbXAvaW1nX2JhY2tncm91bmRfc3ByLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLl9FYXJ0aCA9IGVhcnRoO1xyXG4gICAgICAgIGVhcnRoLndpZHRoID0gd2lkaDtcclxuICAgICAgICBlYXJ0aC5oZWlnaHQgPSB3aWRoO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoZWFydGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1NjYWxlU2t5ID0gMC4wMDFcclxuICAgICAgICB0aGlzLl9TY2FsZUVhcnRoID0gMC4wMVxyXG4gICAgICAgIC8vdGhpcy5fRWFydGhTdGFydFBTID0gdGhpcy5fRWFydGgueTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBJbml0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICBmb3IobGV0IHN0YXJ0SWR4Om51bWJlciA9IDA7c3RhcnRJZHg8dGhpcy5fU2t5UXVlLkNvdW50Oysrc3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU2t5QXJyW3N0YXJ0SWR4XS55ID0gc3RhcnRJZHggKiBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0VhcnRoLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fRWFydGhTdGFydFBTID0gdGhpcy5fRWFydGgueTtcclxuICAgIH0qL1xyXG4gICAgLy/pq5jluqbovazlsY/luZXpq5jluqblg4/ntKBcclxuICAgIEhlaWdodFRyYW5zUGl4KCBoZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBoZWlnaHQqLTAuMTtcclxuICAgIH1cclxuICAgIFNldFNreShwaXhIZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1Ta3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPiA9IHRoaXMuX1RlbXBTa3lRdWU7XHJcbiAgICAgICAgdGVtU2t5UXVlLkNsZWFyKCk7XHJcbiAgICAgICAgdmFyIGNvdW50Om51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgd2hpbGUodGhpcy5fU2t5UXVlLkNvdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpCYXNlRnVuYy5Ob2RlPExheWEuU3ByaXRlPiA9IHRoaXMuX1NreVF1ZS5Qb3BOb2RlKCk7XHJcbiAgICAgICAgICAgIHZhciBza3lJbWc6TGF5YS5TcHJpdGUgPSBub2RlLlZhbHVlO1xyXG4gICAgICAgICAgICBza3lJbWcueSA9IGNvdW50ICogaGVpZ2h0ICsgcGl4SGVpZ2h0IC0gaGVpZ2h0IC0gaGVpZ2h0KjAuMDE7XHJcbiAgICAgICAgICAgIHRlbVNreVF1ZS5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICAgICAgaWYoc2t5SW1nLnk+TGF5YS5zdGFnZS5oZWlnaHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNreUltZy55ID0gdGVtU2t5UXVlLkhlYWRWYWx1ZS55IC0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICsrY291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1RlbXBTa3lRdWUgPSB0aGlzLl9Ta3lRdWU7XHJcbiAgICAgICAgdGhpcy5fU2t5UXVlID0gdGVtU2t5UXVlO1xyXG4gICAgfVxyXG4gICAgU2V0RWFydGgoaGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9FYXJ0aC55ID0gdGhpcy5fRWFydGhTdGFydFBTICsgaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgVXBkYXRlUGFnZSggaGVpZ2h0Om51bWJlciApXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICAvL2hlaWdodCA9IHRoaXMuSGVpZ2h0VHJhbnNQaXgoaGVpZ2h0KTtcclxuICAgICAgICAvL3ZhciBza3lIZWlnaHRQaXggPSBoZWlnaHQqdGhpcy5fU2NhbGVTa3k7XHJcbiAgICAgICAgdGhpcy5TZXRTa3koaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLlNldEVhcnRoKGhlaWdodCk7XHJcbiAgICAgICAgLy92YXIgZWFydGhIZWlnaHRQaXggPSBoZWlnaHQ7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7VUlGdW5jfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1VJRnVuY1wiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcblxyXG4vL1VJ5Z+657G7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VVSSBleHRlbmRzIExheWEuQm94XHJcbntcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL1xyXG4gICAgcHJvdGVjdGVkIF9VSVR5cGU6QmFzZUVudW0uVUlUeXBlRW51bTtcclxuICAgIHByb3RlY3RlZCBfSXNNdXRleDpib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9OYW1lOnN0cmluZzsgICAgXHJcbiAgICBwcm90ZWN0ZWQgX1VJTWFuYWdlcjpVSU1hbmFnZXJcclxuICAgIHByaXZhdGUgX0RpcnR5OmJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9TaG93aW5nOmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTG93O1xyXG4gICAgICAgIHRoaXMuX0lzTXV0ZXggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9OYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLl9TaG93aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxlZnQgPSAwO1xyXG5cdCAgICB0aGlzLnJpZ2h0ID0gMDtcclxuXHRcdHRoaXMuYm90dG9tID0gMDtcclxuXHRcdHRoaXMudG9wID0gMDtcclxuICAgIH1cclxuICAgIEhpZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuT1AoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5PcGVuKCk7XHJcbiAgICB9XHJcbiAgICBDbG9zZU9QKClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBEZXN0cm95KCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFVJVHlwZSgpOkJhc2VFbnVtLlVJVHlwZUVudW1cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUlUeXBlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgSXNNdXRleCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNNdXRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTaG93aW5nKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TaG93aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+5VUnov5vooYzpgILphY1cclxuICAgICAqIEBwYXJhbSBVSSDpgILphY1VSVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRml4VUkoVUk6TGF5YS5WaWV3KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoVUkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldERpcnR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBEaXJ0eSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fRGlydHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENsZWFyRGlydHkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBVSVVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9EaXJ0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xlYXJEaXJ0eSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IFVwZGF0ZSgpOnZvaWQ7XHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEZXIGZyb20gXCIuLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi8uLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJFbnRpdHlcIlxyXG5cclxuY2xhc3MgRXh0ZW5kQ2hhcmFjdGVyc1VJIGV4dGVuZHMgdWkuQ2hhcmFjdGVyVUkge1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJDaGFyYWN0ZXJcIikpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJVSSBleHRlbmRzIEJhc2VVSSB7XHJcblxyXG4gICAgcHJpdmF0ZSBtX0NoYXJhY3Rlckxpc3Q6IEFycmF5PGFueT47XHJcbiAgICBwcml2YXRlIG1fR29sZERpc2NyaWJlOiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgX1JlbmRlckhhbmRsZXIoY2VsbDogTGF5YS5Cb3gsIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB2YXIgcm9sZUVsZW1lbnQ6IFJvbGVFbGVtZW50ID0gY2VsbCBhcyBSb2xlRWxlbWVudDtcclxuICAgICAgICByb2xlRWxlbWVudC5SZXNldCgpO1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJMaXN0OiBBcnJheTxudW1iZXI+ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkNoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuZ3JheSA9IGNoYXJhY3Rlckxpc3RbaW5kZXhdID8gZmFsc2UgOiB0cnVlO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LkNoYXJhY3RlcklEID0gaW5kZXg7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVnaXN0T25JbWdDbGljaygoKSA9PiB7IHRoaXMuT25DbGlja0ltZyhpbmRleCkgfSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9VSTogRXh0ZW5kQ2hhcmFjdGVyc1VJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kQ2hhcmFjdGVyc1VJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5HZXRDaGFyYWN0ZXJMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5TZXRMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLm1fR29sZERpc2NyaWJlID0gdGhpcy5fVUkuX0dvbGQudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgdGhpcy5Pbk1vbmV5Q2hhbmdlKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkNoYXJhY3RlclVJXCI7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0Q2hhcmFjdGVyTGlzdCgpICB7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBbMCwgMV07XHJcbiAgICB9XHJcblxyXG4gICAgU2V0TGlzdCgpIHtcclxuICAgICAgICB2YXIgbGlzdEFycmF5OiBBcnJheTxhbnk+ID0gdGhpcy5tX0NoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnJlbmRlckhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsIHRoaXMuX1JlbmRlckhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LmFycmF5ID0gbGlzdEFycmF5O1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0Rpc3RhbmNlID0gNTBcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgT3BlbigpICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJDaGFyYWN0ZXJJRENoYW5nZSwgdGhpcy5Pbk5lZWRDbG9zZVVJLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLCB0aGlzLk9uTW9uZXlDaGFuZ2UsIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSwgdGhpcy5PbkNoYW5nZUxpc3QsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKCkgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckNoYXJhY3RlcklEQ2hhbmdlLCB0aGlzLk9uTmVlZENsb3NlVUksIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsIHRoaXMuT25Nb25leUNoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DaGFyYWN0ZXJMaXN0Q2hhbmdlLCB0aGlzLk9uQ2hhbmdlTGlzdCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuovku7ZcclxuICAgIHByaXZhdGUgT25DbGlja0ltZyhpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGlkID09IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5DaGFyYWN0ZXJJRCkgIHtcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0UGxheWVySUQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25OZWVkQ2xvc2VVSSgpOiB2b2lkICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2hhbmdlTGlzdCgpICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QucmVmcmVzaCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbk1vbmV5Q2hhbmdlKCkgIHtcclxuICAgICAgICBpZiAoIXRoaXMuU2hvd2luZykgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fR29sZERpc2NyaWJlWzFdID0gXCJcIiArIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leTtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC50ZXh0ID0gdGhpcy5tX0dvbGREaXNjcmliZVswXSArIHRoaXMubV9Hb2xkRGlzY3JpYmVbMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtHYW1lU3RydWN0IH0gIGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kRW5kR2FtZVVJIGV4dGVuZHMgdWkuRW5kR2FtZVVJIHtcclxuICAgIFBhbmVsOkxheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVuZEdhbWVcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbCA9IHRoaXMuUGFuZWw7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMuUGFuZWwuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX01lbnVlQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssR3VpZGVyTWFuYWdlci5NZ3IsR3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5fU2V0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssQ29udHJvbGVyLkdhbWVDb250cm9sZXIsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TdGFydEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZEdhbWVVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkVuZEdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgVUk6RXh0ZW5kRW5kR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5VST0gbmV3IEV4dGVuZEVuZEdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5VSSk7XHJcbiAgICAgICAgLy90aGlzLlVJLl9DaGFyYWN0ZXJMaXN0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyB0aGlzLl9VSU1hbmFnZXIuU2hvdzxQbGF5ZXJMaXN0VUk+KFBsYXllckxpc3RVSSl9KTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IEZNIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgUGxheWVyTGlzdFVJIGZyb20gXCIuLy4uL3VpL1BsYXllckxpc3RVSVwiXHJcbmltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmNsYXNzIEV4dGVuZEVudGVyR2FtZVVJIGV4dGVuZHMgdWkuRW50ZXJVSSB7XHJcbiAgICBQYW5lbDpMYXlhLlBhbmVsO1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5QYW5lbCA9IHRoaXMuX1BhbmVsO1xyXG4gICAgICAgIHRoaXMuUGFuZWwudlNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuUGFuZWwuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX0NoYXJhY3Rlci5vbihMYXlhLkV2ZW50LkNMSUNLLEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlcixHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd0NoYXJhY3RlclBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TZXRQYW5lbC5vbihMYXlhLkV2ZW50LkNMSUNLLEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlcixHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TdGFydC5vbihMYXlhLkV2ZW50LkNMSUNLLEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlcixHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuRW50ZXJHYW1lKTtcclxuICAgIH0gICAgICAgIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRlckdhbWVVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkVudGVyR2FtZVVJXCI7XHJcbiAgICB9XHJcbiAgICBfVUk6RXh0ZW5kRW50ZXJHYW1lVUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VST0gbmV3IEV4dGVuZEVudGVyR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdmFyIHVpTWdyOlVJTWFuYWdlciA9IHRoaXMuX1VJTWFuYWdlcjtcclxuICAgICAgICAvL3RoaXMuX1VJLl9DaGFyYWN0ZXJMaXN0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyB1aU1nci5TaG93PFBsYXllckxpc3RVST4oUGxheWVyTGlzdFVJKX0pO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsIi8qKuS9nOiAhTpNb1xyXG4gKiDlnLrmma9VSVxyXG4gKi9cclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgSXRlbUxpc3RVSSBmcm9tIFwiLi9JdGVtTGlzdFVJXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5jbGFzcyBFeHRlbmRzR2FtZVVJIGV4dGVuZHMgdWkuR2FtZVVJXHJcbntcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVwiKSkpO1xyXG4gICAgfVxyXG4gICAgU2V0Q291bnRUaW1lKGluZm86c3RyaW5nID1cIlwiKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0NvdW50VGltZS50ZXh0ID1pbmZvO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVVJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHByaXZhdGUgX1VJOkV4dGVuZHNHYW1lVUk7XHJcbiAgICAvL1xyXG4gICAgRGlzdGFuY2VTdHI6QXJyYXk8c3RyaW5nPjtcclxuICAgIEdvbGROdW1TdHI6QXJyYXk8c3RyaW5nPjtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX0lzTXV0ZXggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICAvL3RoaXMuX1VJLl9MZWZ0VG91Y2gubGVmdCA9IDA7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fTGVmdFRvdWNoLnJpZ2h0ID0gdGhpcy53aWR0aC80O1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX1JpZ2h0VG91Y2gucmlnaHQgPSAwO1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX1JpZ2h0VG91Y2gubGVmdCA9IHRoaXMud2lkdGgvMjtcclxuICAgICAgICB2YXIgb3BJc1JpZ2h0ID0gR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNldEluZm8uT1BJc1JpZ2h0O1xyXG4gICAgICAgIHRoaXMuX1VJLl9JdGVtTGlzdEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgXHJcbiAgICAgICAgICAgIHRoaXMuX1VJTWFuYWdlci5TaG93PEl0ZW1MaXN0VUk+KEl0ZW1MaXN0VUkpfSlcclxuICAgICAgICB0aGlzLlNldENvdW50VGltZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHI9IHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gXCIwXCJcclxuICAgICAgICB0aGlzLl9TaG93RGlzdGFuY2UoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHIgPSB0aGlzLl9VSS5fVHh0R29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSBcIjBcIjtcclxuICAgICAgICB0aGlzLl9TaG93R29sZE51bSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2hvd0lucHV0SW5mbyhcIlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TaG93RGlzdGFuY2UoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0ID0gdGhpcy5EaXN0YW5jZVN0clswXSt0aGlzLkRpc3RhbmNlU3RyWzFdO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIF9TaG93R29sZE51bSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1R4dEdvbGQudGV4dCA9IHRoaXMuR29sZE51bVN0clswXSArIHRoaXMuR29sZE51bVN0clsxXTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiR2FtZVVJXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHNldCBHb2xkKGdvbGQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IGdvbGQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLlNldERpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBTZXRMZWZ0VG91Y2gob3duZXI6YW55LExpc3RlbmVyOigpPT52b2lkKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xlZnRUb3VjaC5vbihMYXlhLkV2ZW50LkNMSUNLLG93bmVyLExpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRSaWdodFRvdWNoKG93bmVyOmFueSxMaXN0ZW5lcjooKT0+dm9pZCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9SaWdodFRvdWNoLm9uKExheWEuRXZlbnQuQ0xJQ0ssb3duZXIsTGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldENvdW50VGltZShpbmZvOnN0cmluZyA9XCJcIilcclxuICAgIHtcclxuICAgICAgICBpZihpbmZvPT1cIlwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fQ291bnREb3duVUkudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVQYW5lbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5TZXRDb3VudFRpbWUoaW5mbyk7XHJcbiAgICB9XHJcbiAgICBzZXQgR2FtZVBhbmVsKHZhbHVlOmJvb2xlYW4pXHJcbiAgICB7IFxyXG4gICAgICAgIHRoaXMuX1VJLl9HYW1lUGFuZWwudmlzaWJsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgc2V0IERpc3RhbmNlKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgZGlzID0gXCJcIiArIHZhbHVlO1xyXG4gICAgICAgIGlmKGRpcyA9PSB0aGlzLkRpc3RhbmNlU3RyWzFdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHJbMV0gPSBkaXM7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgc2V0IEdvbGROdW0odmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgU2hvd0lucHV0SW5mbyhpbmZvOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZUluZm8udGV4dCA9IGluZm87XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIC8v5pi+56S66YeR5biB5L+h5oGvXHJcbiAgICAgICAgdGhpcy5fU2hvd0dvbGROdW0oKTtcclxuICAgICAgICAvL+aYvuekuui3neemu+S/oeaBr1xyXG4gICAgICAgIHRoaXMuX1Nob3dEaXN0YW5jZSgpO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7UGxheWVyfSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIlxyXG5pbXBvcnQge0dhbWVBZ2VudH0gZnJvbSBcIi4vLi4vQWdlbnQvR2FtZUFnZW50XCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgSXRlbUVsZW1lbnQgZnJvbSBcIi4vLi4vc2NyaXB0L0l0ZW1FbGVtZW50XCJcclxuXHJcbmNsYXNzIEV4dGVuZHNJdGVtTGlzdFVJIGV4dGVuZHMgdWkuSXRlbUxpc3RVSVxyXG57XHJcbiAgICBwcml2YXRlIG1fSXRlbUxpc3Q6QXJyYXk8bnVtYmVyPlxyXG4gICAgQnRuTGlzdGVuZXI6TWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gW107XHJcbiAgICB9XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUxpc3RVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkl0ZW1MaXN0VUlcIjtcclxuICAgIH1cclxuICAgIFVJOkV4dGVuZHNJdGVtTGlzdFVJO1xyXG4gICAgbV9Hb2xkOnN0cmluZ1tdO1xyXG4gICAgbV9JdGVtTGlzdDpBcnJheTxudW1iZXI+O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5VSSA9IG5ldyBFeHRlbmRzSXRlbUxpc3RVSSgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5VSSk7XHJcbiAgICAgICAgdGhpcy5VSS5CdG5MaXN0ZW5lciA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUodGhpcywoKT0+eyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2UodGhpcyl9KVxyXG4gICAgICAgIC8vdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUxpc3QoKTtcclxuICAgICAgICB0aGlzLm1fR29sZCA9IHRoaXMuVUkuX0dvbGQudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgdGhpcy5VSS5fQkcuYWxwaGEgPSAwO1xyXG4gICAgICAgIHRoaXMuVUkuX0JHLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcyx0aGlzLkNsb3NlVUkpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsdGhpcy5TaG93R29sZCx0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlLHRoaXMuUmVmcmVzaExpc3QsdGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5TaG93R29sZCgpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSx0aGlzLlNob3dHb2xkLHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UsdGhpcy5SZWZyZXNoTGlzdCx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gWzAsMV07XHJcbiAgICAgICAgdGhpcy5TZXRMaXN0KHRoaXMubV9JdGVtTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZnJlc2hMaXN0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBbMCwxXTtcclxuICAgICAgICB0aGlzLkZyZXNoTGlzdCh0aGlzLm1fSXRlbUxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaG93R29sZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuU2hvd2luZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fR29sZFsxXSA9XCJcIiArIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leTtcclxuICAgICAgICB0aGlzLlVJLl9Hb2xkLnRleHQgPSB0aGlzLm1fR29sZFswXSArIHRoaXMubV9Hb2xkWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1JlbmRlckhhbmRsZXIoY2VsbDpMYXlhLkJveCxpbmRleDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgcm9sZUVsZW1lbnQ6SXRlbUVsZW1lbnQgPSBjZWxsIGFzIEl0ZW1FbGVtZW50O1xyXG4gICAgICAgIHZhciBpdGVtTGlzdDpBcnJheTxudW1iZXI+ID0gR2FtZUFnZW50LkFnZW50Lkl0ZW1MaXN0O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LkluaXQoKTtcclxuICAgICAgICByb2xlRWxlbWVudC5JdGVtSWR4ID0gaW5kZXg7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVnaXN0QnV5KHRoaXMsdGhpcy5CdXlJdGVtKTtcclxuICAgICAgICByb2xlRWxlbWVudC5SZWdpc3RDaG9vc2UodGhpcyx0aGlzLkNob29zZUl0ZW0pO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LklzR3JheSA9IGl0ZW1MaXN0W2luZGV4XT9mYWxzZTp0cnVlO1xyXG4gICAgICAgIHJvbGVFbGVtZW50Lk51bSA9IGl0ZW1MaXN0W2luZGV4XT9pdGVtTGlzdFtpbmRleF06MDtcclxuICAgICAgICAvL3JvbGVFbGVtZW50LlNldEJ0bih0aGlzLkJ0bkxpc3RlbmVyLkxpc3RlbmVyLHRoaXMuQnRuTGlzdGVuZXIuQWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNldExpc3QobGlzdEFycmF5OkFycmF5PGFueT4pXHJcbiAgICB7XHJcbiAgICAgICAgLy92YXIgbGlzdEFycmF5OkFycmF5PGFueT4gPSB0aGlzLm1fSXRlbUxpc3Q7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5yZW5kZXJIYW5kbGVyID0gbmV3IExheWEuSGFuZGxlcih0aGlzLHRoaXMuX1JlbmRlckhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QuYXJyYXkgPSBsaXN0QXJyYXk7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0JhY2tUaW1lID0gMjAwOy8v6K6+572u5qmh55qu562L5Zue5by55pe26Ze044CC5Y2V5L2N5Li65q+r56eS44CCXHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0Rpc3RhbmNlID0gNTBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRnJlc2hMaXN0KGlkTGlzdClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LmFycmF5ID0gaWRMaXN0O1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIEJ1eUl0ZW0oaWQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLlNob3dpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQnV5SXRlbShpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBDaG9vc2VJdGVtKGlkOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5TaG93aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYoR2FtZUFnZW50LkFnZW50Lkl0ZW1MaXN0W2lkXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdhbWVBZ2VudC5BZ2VudC5DdXJJdGVtID0gaWQ7XHJcbiAgICAgICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2UodGhpcyk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBDbG9zZVVJKClcclxuICAgIHtcclxuICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kc1NldFBhbmVsVUkgZXh0ZW5kcyB1aS5TZXRQYW5lbFVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiU2V0UGFuZWxcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy90aGlzLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57QVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXRQYW5lbFVJIGV4dGVuZHMgQmFzZVVJIHtcclxuICAgIF9VSTogRXh0ZW5kc1NldFBhbmVsVUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNTZXRQYW5lbFVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JldHVybi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCAoKSA9PiB7IHRoaXMuX1VJTWFuYWdlci5DbG9zZUN1clZpZXcoKTsgR3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpIH0pO1xyXG4gICAgICAgIHRoaXMuU2V0UGFuZWwoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2V0UGFuZWxVSVwiO1xyXG4gICAgfVxyXG4gICAgU2V0UGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdldFNldEluZm8oKTtcclxuICAgICAgICB0aGlzLl9VSS5fQXVkaW9Td2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uQXVkaW9PbiA/IDAgOiAxO1xyXG4gICAgICAgIHRoaXMuX1VJLl9PUFN3aXRjaC5zZWxlY3RlZEluZGV4ID0gaW5mby5PUElzUmlnaHQgPyAxIDogMDtcclxuICAgICAgICB0aGlzLl9VSS5fVGV4dC50ZXh0ID0gaW5mby5UZXh0SW5mbztcclxuICAgIH1cclxuICAgIFNhdmVQYW5lbCgpIHtcclxuICAgICAgICB2YXIgaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvID0gbmV3IEdhbWVTdHJ1Y3QuU2V0SW5mbygpO1xyXG4gICAgICAgIGluZm8uQXVkaW9PbiA9IHRoaXMuX1VJLl9BdWRpb1N3aXRjaC5zZWxlY3RlZEluZGV4ID09IDA7XHJcbiAgICAgICAgaW5mby5PUElzUmlnaHQgPSB0aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9PSAxO1xyXG4gICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNhdmVTZXRJbmZvKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlT1AoKSB7XHJcbiAgICAgICAgdGhpcy5TYXZlUGFuZWwoKTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG59XHJcbiIsImltcG9ydCBCYXNlVUkgZnJvbSBcIi4vLi4vQmFzZVVJXCJcclxuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcclxuXHJcbm1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTG9hZGluZ1VJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfUHJvZ3Jlc3M6TGF5YS5Qcm9ncmVzc0JhcjtcclxuXHRcdHB1YmxpYyBfR3VpZGVyOkxheWEuSW1hZ2U7XHJcblx0XHRwdWJsaWMgX0VudGVyOkxheWEuQnV0dG9uO1xyXG5cdFx0cHVibGljIEVycm9ySW5mbzpMYXlhLkxhYmVsO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJMb2FkaW5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRXh0TG9hZGluZ1VJIGV4dGVuZHMgdWkuTG9hZGluZ1VJXHJcbntcclxuICAgIGNyZWF0ZUNoaWxkcmVuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKFwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIikpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmdVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIFwiTG9hZGluZ1VJXCI7XHJcbiAgICB9XHJcbiAgICBfVUk6dWkuTG9hZGluZ1VJO1xyXG4gICAgX0NhbGxCYWNrOigpPT52b2lkO1xyXG4gICAgY29uc3RydWN0b3IoIG5hbWU6c3RyaW5nIClcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICAvL3RoaXMuX1VJID1uZXcgdWkuTG9hZGluZ1VJKCk7XHJcbiAgICAgICAgdGhpcy5fVUkgPW5ldyBFeHRMb2FkaW5nVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJICk7XHJcbiAgICAgICAgdGhpcy5WYWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fVUkuRXJyb3JJbmZvLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIudmlzaWJsZSA9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLl9DYWxsQmFjaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB4Om51bWJlciA9IDA7XHJcbiAgICAgICAgeCArPSB0aGlzLl9VSS5fUHJvZ3Jlc3Mud2lkdGgqdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9HdWlkZXIucG9zKHgsdGhpcy5fVUkueSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFZhbHVlKG51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBDb21wbGV0ZShjYWxsQmFjazooKT0+dm9pZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DYWxsQmFjayA9IGNhbGxCYWNrO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIubGFiZWwgPSBcIkVudGVyXCI7Ly90aGlzLl9OYW1lWzBdO1xyXG4gICAgfVxyXG4gICAgUmVsb2FkKGNhbGxCYWNrOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBCR1VJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfRWFydGg6TGF5YS5JbWFnZTtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkJHXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1RoZUJHOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIF9Hb2xkOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9MaXN0OkxheWEuTGlzdDtcblx0XHRwdWJsaWMgX0ltZzphbnk7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJDaGFyYWN0ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEVuZEdhbWVVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0dhbWVJbmZvOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9TdGFydEJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX01lbnVlQnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfU2V0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUGxheWVyTGlzdEJ0bjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVuZEdhbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEVudGVyVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9TdGFydDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0NoYXJhY3RlcjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BhbmVsOkxheWEuUGFuZWw7XG5cdFx0cHVibGljIF9TZXRQYW5lbDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0NoYXJhY3Rlckxpc3Q6TGF5YS5CdXR0b247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJFbnRlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfQ291bnREb3duVUk6TGF5YS5Cb3g7XG5cdFx0cHVibGljIF9JdGVtTGlzdEJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0NvdW50VGltZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfR2FtZUluZm86TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX0dhbWVQYW5lbDpMYXlhLkJveDtcblx0XHRwdWJsaWMgX1R4dERpc3RhbmNlOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9UeHRHb2xkOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9SaWdodFRvdWNoOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTGVmdFRvdWNoOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfVXNlSXRlbTpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkdhbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEl0ZW1MaXN0VUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9CRzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBfTGlzdDpMYXlhLkxpc3Q7XG5cdFx0cHVibGljIF9Hb2xkOkxheWEuTGFiZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJJdGVtTGlzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTGlzdFVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfUGxheWVyTGlzdDpMYXlhLkxpc3Q7XG5cdFx0cHVibGljIF9SZXR1cm5NYWluOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiUGxheWVyTGlzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1RleHQ6TGF5YS5UZXh0QXJlYTtcblx0XHRwdWJsaWMgX1JldHVybjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0F1ZGlvU3dpdGNoOkxheWEuUmFkaW9Hcm91cDtcblx0XHRwdWJsaWMgX09QU3dpdGNoOkxheWEuUmFkaW9Hcm91cDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlNldFBhbmVsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyIl19
