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
            return this.m_PlayerEntity.CurLevel;
        },
        set: function (value) {
            this.m_PlayerEntity.CurLevel = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameAgent.prototype, "CurMaxLevel", {
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
                this.m_Money = value;
                this.m_MessageMgr.Fire(Event.OnMoneyChange);
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
                this.m_HistoryMaxLevel = value;
                this.m_MessageMgr.Fire(Event.OnHistoryMaxLevelChange);
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
                this.m_CurItem = value;
                this.m_MessageMgr.Fire(Event.OnCurItemChange);
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
                this.m_CurScore = value;
                this.m_MessageMgr.Fire(Event.OnCurScoreChange);
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
var GameAPP_1 = require("./../controler/GameAPP");
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
        var price = GameAPP_1.default.ItemMgr.GetPrice(id);
        if (id < 0 || price < 0 || price > this.m_PlayerEntity.Money) {
            return;
        }
        this.m_PlayerEntity.Money -= id;
        this.m_PlayerEntity.AddCharacter(id);
    };
    PlayerGuestAgent.prototype.BuyItem = function (id) {
        var price = GameAPP_1.default.ItemMgr.GetPrice(id);
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
},{"./../controler/GameAPP":39,"./BaseAgent":1}],5:[function(require,module,exports){
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
},{"./../FrameWork/BaseManager":8,"./../Scene/Scene":34}],12:[function(require,module,exports){
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
},{"./../Base/BaseEnum":5,"./../Utility/UIFunc":37,"./BaseManager":8}],14:[function(require,module,exports){
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
},{"./script/ItemElement":41,"./script/RoleElement":42}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path_1 = require("../Utility/Path");
var GameManager_1 = require("./GameManager");
var CharacterManager = /** @class */ (function (_super) {
    __extends(CharacterManager, _super);
    function CharacterManager() {
        return _super.call(this, "CharacterInfo") || this;
    }
    Object.defineProperty(CharacterManager, "Mgr", {
        get: function () {
            if (!CharacterManager.g_Mgr) {
                CharacterManager.g_Mgr = new CharacterManager();
            }
            return CharacterManager.g_Mgr;
        },
        enumerable: true,
        configurable: true
    });
    CharacterManager.prototype.GenInfo = function (data) {
        return new CharacterInfo(data);
    };
    CharacterManager.prototype.GetSkillItem = function (id) {
        var info = this.GetInfo(id);
        if (info)
            return info.ItemList;
        return null;
    };
    CharacterManager.prototype.GetPrice = function (id) {
        var info = this.GetInfo(id);
        if (info)
            return info.Price;
        return null;
    };
    CharacterManager.prototype.GetCharacterInfo = function (id) {
        return this.GetInfo(id);
    };
    CharacterManager.prototype.GetCharacterModel = function (id, level) {
        var info = this.GetInfo(id);
        if (!info)
            return;
        var characterData = this.GetCharacterInfo(id);
        var sampleModel = Laya.loader.getRes(Path_1.path.GetLH(characterData.GetName(level)));
        var model = sampleModel.clone();
        return model;
    };
    return CharacterManager;
}(GameManager_1.GameManager.BaseManager));
exports.default = CharacterManager;
var CharacterInfo = /** @class */ (function (_super) {
    __extends(CharacterInfo, _super);
    function CharacterInfo(characterData) {
        var _this = _super.call(this, characterData) || this;
        _this.m_ModelID = characterData.ModelID ? characterData.ModelID : "";
        _this.m_StateLsit = characterData.StateList ? characterData.StateList : "";
        _this.m_ItemList = characterData.ItemList ? characterData.ItemList : [];
        _this.m_ExtendID = characterData.ExtendID ? characterData.ExtendID : "";
        return _this;
    }
    Object.defineProperty(CharacterInfo.prototype, "ItemList", {
        get: function () {
            return this.m_ItemList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterInfo.prototype, "Price", {
        get: function () {
            return this.m_Price;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterInfo.prototype, "ID", {
        get: function () {
            return this.m_ID;
        },
        enumerable: true,
        configurable: true
    });
    CharacterInfo.prototype.GetName = function (level) {
        var state;
        if (this.m_StateLsit.length > 0)
            state = this.m_StateLsit[level] ? this.m_StateLsit[level] : this.m_StateLsit[this.m_StateLsit.length - 1];
        else
            state = "";
        return this.m_ModelID + state + this.m_ExtendID;
    };
    return CharacterInfo;
}(GameManager_1.GameManager.BaseInfo));
},{"../Utility/Path":36,"./GameManager":16}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path_1 = require("../Utility/Path");
var GameManager;
(function (GameManager) {
    var BaseManager = /** @class */ (function () {
        function BaseManager(name) {
            this.m_Map = {};
            this.m_BottomID = -1;
            var configInfo = Laya.loader.getRes(Path_1.path.GetJsonPath(name));
            for (var key in configInfo) {
                var data = configInfo[key];
                var dataInfo = this.GenInfo(data);
                this.m_Map[dataInfo.ID] = dataInfo;
                if (dataInfo.ID != -1)
                    this.m_BottomID = dataInfo.ID;
            }
        }
        BaseManager.prototype.GetInfo = function (id) {
            if (!id || id < 0) {
                id = 0;
            }
            var BaseInfo = this.m_Map[id];
            if (!BaseInfo) {
                BaseInfo = this.m_Map[this.m_BottomID];
            }
            if (BaseInfo) {
                return BaseInfo;
            }
            else {
                return null;
            }
        };
        /**
         * 获取ID数组
         */
        BaseManager.prototype.GetIDList = function () {
            var map = this.m_Map;
            var IDList = [];
            for (var key in map) {
                var data = map[key];
                if (data)
                    IDList.push(data.ID);
            }
            return IDList;
        };
        return BaseManager;
    }());
    GameManager.BaseManager = BaseManager;
    var BaseInfo = /** @class */ (function () {
        function BaseInfo(data) {
            this.m_ID = data.ID ? Number(data.ID) : -1;
        }
        Object.defineProperty(BaseInfo.prototype, "ID", {
            get: function () {
                return this.m_ID;
            },
            enumerable: true,
            configurable: true
        });
        return BaseInfo;
    }());
    GameManager.BaseInfo = BaseInfo;
})(GameManager = exports.GameManager || (exports.GameManager = {}));
},{"../Utility/Path":36}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameManager_1 = require("./GameManager");
var ItemManager = /** @class */ (function (_super) {
    __extends(ItemManager, _super);
    function ItemManager() {
        return _super.call(this, "ItemInfo") || this;
    }
    Object.defineProperty(ItemManager, "Mgr", {
        get: function () {
            if (!ItemManager.g_Mgr) {
                ItemManager.g_Mgr = new ItemManager();
            }
            return ItemManager.g_Mgr;
        },
        enumerable: true,
        configurable: true
    });
    ItemManager.prototype.GenInfo = function (data) {
        return new ItemInfo(data);
    };
    /**
     * 获取道具价格
     * @param id 道具ID
     */
    ItemManager.prototype.GetPrice = function (id) {
        var info = this.GetInfo(id);
        if (info)
            return info.Price;
    };
    /**
    * 获取ID数组
    */
    ItemManager.prototype.GetSellItemIDList = function () {
        var map = this.m_Map;
        var IDList = [];
        for (var key in map) {
            var data = map[key];
            if (data) {
                var itemInfo = data;
                if (itemInfo.Price >= 0)
                    IDList.push(data.ID);
            }
        }
        return IDList;
    };
    return ItemManager;
}(GameManager_1.GameManager.BaseManager));
exports.default = ItemManager;
var ItemInfo = /** @class */ (function (_super) {
    __extends(ItemInfo, _super);
    function ItemInfo(data) {
        var _this = _super.call(this, data) || this;
        _this.m_ModelName = data.ModelName ? data.ModelName : "";
        _this.m_ExtendID = data.ExtendID ? data.ExtendID : "";
        _this.m_Price = data.Price ? Number(data.Price) : 0;
        return _this;
    }
    Object.defineProperty(ItemInfo.prototype, "Name", {
        get: function () {
            return this.m_ModelName + this.m_ExtendID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInfo.prototype, "Price", {
        get: function () {
            return this.m_Price;
        },
        enumerable: true,
        configurable: true
    });
    return ItemInfo;
}(GameManager_1.GameManager.BaseInfo));
},{"./GameManager":16}],18:[function(require,module,exports){
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
},{"./../Utility/Path":36,"./../controler/APP":38,"./../controler/GameControler":40}],19:[function(require,module,exports){
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
},{"./../Game/PlayerCtrler":27,"./../controler/GameControler":40,"./GameItem":22,"./Input":24}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
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
            var _this = _super.call(this, ItemType.Collector, CollectBuff.Idx) || this;
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
},{"./../FrameWork/MessageCenter":10,"./../Game/AnimObj":18,"./../Utility/Path":36,"./../controler/APP":38,"./../controler/GameControler":40,"./Buff":19,"./GameStruct":23,"./Input":24,"./PlayerCtrler":27}],23:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
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
},{"./../controler/GameControler":40,"./Step":28}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayerCtrler_1 = require("./PlayerCtrler");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var APP_1 = require("./../controler/APP");
var Path_1 = require("../Utility/Path");
var GameControler_1 = require("./../controler/GameControler");
var GameItem_1 = require("./GameItem");
var Character_1 = require("./Character");
var GameAPP_1 = require("./../controler/GameAPP");
var num = 0;
//该脚本用于游戏玩家对象管理
//玩家对象
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.m_BuffModel = {};
        APP_1.default.SceneManager.CurScene.PutObj(_this);
        //添加自定义模型
        _this.on(Laya.Event.REMOVED, _this, function () { _this.destroy(); });
        var mgr = GameAPP_1.default.CharacterMgr;
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
    Player.prototype.SetPlayerModel = function (model) {
        this.addChild(model);
        model.transform.rotate(new Laya.Vector3(0, 180, 0), false, false);
        this.m_Animator = model.getChildAt(0).getComponent(Laya.Animator);
        var layer = this.m_Animator.getControllerLayer()._statesMap;
        this.m_StateMap = {};
        for (var key in layer) {
            this.m_StateMap[key] = 1;
        }
        this.InitBUffModel(model);
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
            var clipName = Character_1.Character.PlayerAnimName(Character_1.Character.AnimEnum.Fall);
            if (this.m_StateMap[clipName])
                this.m_Animator.play(clipName);
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
},{"../Utility/Path":36,"./../FrameWork/MessageCenter":10,"./../controler/APP":38,"./../controler/GameAPP":39,"./../controler/GameControler":40,"./Character":20,"./GameItem":22,"./PlayerCtrler":27}],27:[function(require,module,exports){
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
},{"./../controler/APP":38,"./../controler/GameControler":40}],28:[function(require,module,exports){
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
},{"./../Utility/Path":36,"./../controler/APP":38,"./GameItem":22,"./GameStruct":23}],29:[function(require,module,exports){
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
},{"./FrameWork/UIManager":13,"./GameConfig":14,"./Scene/LoadScene":33,"./controler/APP":38}],30:[function(require,module,exports){
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
},{"./../Utility/Path":36,"./Scene":34,"./ScenePlay/GameScenePlay":35}],31:[function(require,module,exports){
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
},{"./../Game/GameItem":22,"./../Scene/Scene":34,"./GameDirector":30}],32:[function(require,module,exports){
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
},{"../controler/APP":38,"./../Scene/Scene":34,"./../Utility/Path":36,"./../ui/EnterGameUI":47}],33:[function(require,module,exports){
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
            Path_1.path.GetAtlPath("comp"),
            Path_1.path.GetJsonPath("CharacterInfo"),
            Path_1.path.GetJsonPath("ItemInfo"),
            Path_1.path.GetJsonPath("LevelInfo"),
            Path_1.path.GetJsonPath("ObstacleInfo")
        ];
        Laya.loader.once(Laya.Event.ERROR, this, this.onError);
        Laya.loader.once(Laya.Event.COMPLETE, this, this.onComplete);
        var resource3DArr = [
            Path_1.path.GetLH("c001_child_01"),
            Path_1.path.GetLH("c001_adult_01"),
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
},{"./../Scene/Scene":34,"./../Utility/Path":36,"./../controler/APP":38,"./../ui/BG":43,"./../ui/UnDownload/LoadingUI":51,"./GuiderManager":32}],34:[function(require,module,exports){
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
},{"../FrameWork/FrameWork":9,"./../Base/FSM":7,"./../FrameWork/MessageCenter":10,"./../controler/APP":38}],35:[function(require,module,exports){
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
var GameAPP_1 = require("../../controler/GameAPP");
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
        var player = new Player_1.default();
        this.Player = player;
        var gameAgent = GameAgent_1.GameAgent.Agent;
        var playerModel = GameAPP_1.default.CharacterMgr.GetCharacterModel(gameAgent.CurCharacterID, gameAgent.CurLevel);
        player.SetPlayerModel(playerModel);
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
},{"../../controler/GameAPP":39,"./../../Agent/GameAgent":2,"./../../FrameWork/MessageCenter":10,"./../../Game/GameCamera":21,"./../../Game/GameItem":22,"./../../Game/GameStruct":23,"./../../Game/Input":24,"./../../Game/MountLine":25,"./../../Game/Player":26,"./../../Scene/Scene":34,"./../../controler/APP":38,"./../../controler/GameControler":40,"./../../ui/EndGameUI":46,"./../../ui/GameUI":48}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path;
(function (path) {
    path.IsEditor = true;
    path.version = "?v=1";
    path.SceneAssetPath = "LayaScene_";
    path.ResourcePath = path.IsEditor ? "../NetResource_3_29/" : "https://www.gsjgame.com/Resource/NetResource_3_29/";
    path.UIPath = path.ResourcePath + "UI/";
    path.ModelPath = path.ResourcePath + "3D/";
    path.ConfigPath = path.ResourcePath + "Config/";
    /**
     * 获取Atl文件路径
     * @param fileName 文件名
     */
    function GetAtlPath(fileName) {
        return path.UIPath + fileName + ".atlas" + path.version;
    }
    path.GetAtlPath = GetAtlPath;
    /**
     * 获取UIJson路径
     * @param fileName 文件名
     */
    function GetDepathUIJS(fileName) {
        return path.UIPath + fileName + ".json" + path.version;
    }
    path.GetDepathUIJS = GetDepathUIJS;
    /**
     * 获取lh文件路径
     * @param fileName 文件名
     */
    function GetLH(fileName) {
        return path.ModelPath + path.SceneAssetPath + fileName + "/Conventional/" + fileName + ".lh" + path.version;
    }
    path.GetLH = GetLH;
    /**
     * 获取加载Json路径
     * @param fileName 文件名
     */
    function GetJsonPath(fileName) {
        return path.ConfigPath + fileName + ".json" + path.version;
    }
    path.GetJsonPath = GetJsonPath;
})(path = exports.path || (exports.path = {}));
},{}],37:[function(require,module,exports){
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
},{}],38:[function(require,module,exports){
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
},{"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10,"./../FrameWork/SceneManager":11,"./../FrameWork/TimeManager":12,"./../FrameWork/UIManager":13}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterMamager_1 = require("./../GameManager/CharacterMamager");
var ItemManager_1 = require("./../GameManager/ItemManager");
var GameAPP = /** @class */ (function () {
    function GameAPP() {
    }
    Object.defineProperty(GameAPP, "CharacterMgr", {
        get: function () {
            return CharacterMamager_1.default.Mgr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameAPP, "ItemMgr", {
        get: function () {
            return ItemManager_1.default.Mgr;
        },
        enumerable: true,
        configurable: true
    });
    return GameAPP;
}());
exports.default = GameAPP;
},{"./../GameManager/CharacterMamager":15,"./../GameManager/ItemManager":17}],40:[function(require,module,exports){
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
},{"./../Agent/PlayerGuestAgent":4,"./../Game/GameStruct":23,"./../Scene/GameScene":31,"./../ui/CharacterUI":45,"./../ui/SetPanelUI":50,"./APP":38}],41:[function(require,module,exports){
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
    Object.defineProperty(ItemElement.prototype, "BtnLable", {
        set: function (str) {
            if (!str)
                return;
            this._Btn.text.text = str;
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
},{"./../FrameWork/MessageCenter":10}],42:[function(require,module,exports){
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
},{"./../controler/APP":38,"./../controler/GameControler":40}],43:[function(require,module,exports){
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
},{"./../Base/BaseFunc":6,"./../Utility/Path":36,"./layaMaxUI":52}],44:[function(require,module,exports){
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
},{"./../Base/BaseEnum":5,"./../FrameWork/FrameWork":9,"./../FrameWork/UIManager":13}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var Path_1 = require("./../Utility/Path");
var GameControler_1 = require("./../controler/GameControler");
var APP_1 = require("./../controler/APP");
var PlayerGuestAgent_1 = require("./../Agent/PlayerGuestAgent");
var PlayerEntity_1 = require("./../Agent/PlayerEntity");
var GameAPP_1 = require("../controler/GameAPP");
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
        this.m_CharacterList = GameAPP_1.default.CharacterMgr.GetIDList();
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
},{"../controler/GameAPP":39,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Utility/Path":36,"./../controler/APP":38,"./../controler/GameControler":40,"./BaseUI":44,"./layaMaxUI":52}],46:[function(require,module,exports){
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
},{"../Scene/GuiderManager":32,"./../Utility/Path":36,"./../controler/GameControler":40,"./BaseUI":44,"./layaMaxUI":52}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var Path_1 = require("./../Utility/Path");
var BaseUI_1 = require("./BaseUI");
var GameControler_1 = require("./../controler/GameControler");
var GameAgent_1 = require("./../Agent/GameAgent");
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
        _this.m_BtnGroup = [];
        //this._UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ uiMgr.Show<PlayerListUI>(PlayerListUI)});
        _this._UI._Rank.visible = false;
        return _this;
    }
    EnterGameUI.Name = function () {
        return "EnterGameUI";
    };
    EnterGameUI.prototype.InitBtnGroup = function () {
        var CurMaxLevel = GameAgent_1.GameAgent.Agent.CurMaxLevel;
        var curLevel = GameAgent_1.GameAgent.Agent.CurLevel;
        var btnNum = this._UI._Group.numChildren;
        var group = this.m_BtnGroup;
        for (var idx = 0; idx < btnNum; ++idx) {
            var btn = this._UI._Group.getChildAt(idx);
            btn.idx = idx;
            btn.on(Laya.Event.CLICK, this, this.OnChoose);
            btn.gray = true;
            group.push(btn);
        }
        group[curLevel].gray = false;
    };
    EnterGameUI.prototype.Open = function () {
        this.InitBtnGroup();
    };
    EnterGameUI.prototype.Update = function () {
    };
    //事件
    EnterGameUI.prototype.OnChoose = function (info) {
        var target = info.target;
        var idx = target.idx;
        GameAgent_1.GameAgent.Agent.CurLevel = idx;
        this.m_BtnGroup.forEach(function (img) {
            img.gray = true;
        });
        this.m_BtnGroup[idx].gray = false;
    };
    return EnterGameUI;
}(BaseUI_1.default));
exports.default = EnterGameUI;
},{"./../Agent/GameAgent":2,"./../Utility/Path":36,"./../controler/GameControler":40,"./BaseUI":44,"./layaMaxUI":52}],48:[function(require,module,exports){
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
},{"./../Utility/Path":36,"./../controler/GameControler":40,"./BaseUI":44,"./ItemListUI":49,"./layaMaxUI":52}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var Path_1 = require("./../Utility/Path");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var PlayerEntity_1 = require("./../Agent/PlayerEntity");
var GameAgent_1 = require("./../Agent/GameAgent");
var APP_1 = require("./../controler/APP");
var BaseUI_1 = require("./BaseUI");
var PlayerGuestAgent_1 = require("./../Agent/PlayerGuestAgent");
var GameAPP_1 = require("./../controler/GameAPP");
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
        this.GetItemList();
        this.SetList(this.m_ItemList);
    };
    ItemListUI.prototype.RefreshList = function () {
        this.GetItemList();
        this.FreshList(this.m_ItemList);
    };
    ItemListUI.prototype.GetItemList = function () {
        this.m_ItemList = GameAPP_1.default.ItemMgr.GetSellItemIDList();
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
        roleElement.ItemIdx = this.m_ItemList[index];
        roleElement.RegistBuy(this, this.BuyItem);
        roleElement.RegistChoose(this, this.ChooseItem);
        roleElement.IsGray = itemList[this.m_ItemList[index]] ? false : true;
        roleElement.Num = itemList[this.m_ItemList[index]] ? itemList[this.m_ItemList[index]] : 0;
        roleElement.BtnLable = "" + GameAPP_1.default.ItemMgr.GetPrice(this.m_ItemList[index]) + "$";
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
},{"./../Agent/GameAgent":2,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../FrameWork/MessageCenter":10,"./../Utility/Path":36,"./../controler/APP":38,"./../controler/GameAPP":39,"./BaseUI":44,"./layaMaxUI":52}],50:[function(require,module,exports){
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
},{"../Scene/GuiderManager":32,"./../Base/BaseEnum":5,"./../Game/GameStruct":23,"./../Utility/Path":36,"./../controler/GameControler":40,"./BaseUI":44,"./layaMaxUI":52}],51:[function(require,module,exports){
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
},{"./../BaseUI":44}],52:[function(require,module,exports){
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
    }(Laya.View));
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
},{}]},{},[29])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rvb2wvTGF5YTIuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQWdlbnQvQmFzZUFnZW50LnRzIiwic3JjL0FnZW50L0dhbWVBZ2VudC50cyIsInNyYy9BZ2VudC9QbGF5ZXJFbnRpdHkudHMiLCJzcmMvQWdlbnQvUGxheWVyR3Vlc3RBZ2VudC50cyIsInNyYy9CYXNlL0Jhc2VFbnVtLnRzIiwic3JjL0Jhc2UvQmFzZUZ1bmMudHMiLCJzcmMvQmFzZS9GU00udHMiLCJzcmMvRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9GcmFtZVdvcmsudHMiLCJzcmMvRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXIudHMiLCJzcmMvRnJhbWVXb3JrL1NjZW5lTWFuYWdlci50cyIsInNyYy9GcmFtZVdvcmsvVGltZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL1VJTWFuYWdlci50cyIsInNyYy9HYW1lQ29uZmlnLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0NoYXJhY3Rlck1hbWFnZXIudHMiLCJzcmMvR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXIudHMiLCJzcmMvR2FtZU1hbmFnZXIvSXRlbU1hbmFnZXIudHMiLCJzcmMvR2FtZS9BbmltT2JqLnRzIiwic3JjL0dhbWUvQnVmZi50cyIsInNyYy9HYW1lL0NoYXJhY3Rlci50cyIsInNyYy9HYW1lL0dhbWVDYW1lcmEudHMiLCJzcmMvR2FtZS9HYW1lSXRlbS50cyIsInNyYy9HYW1lL0dhbWVTdHJ1Y3QudHMiLCJzcmMvR2FtZS9JbnB1dC50cyIsInNyYy9HYW1lL01vdW50TGluZS50cyIsInNyYy9HYW1lL1BsYXllci50cyIsInNyYy9HYW1lL1BsYXllckN0cmxlci50cyIsInNyYy9HYW1lL1N0ZXAudHMiLCJzcmMvTWFpbi50cyIsInNyYy9TY2VuZS9HYW1lRGlyZWN0b3IudHMiLCJzcmMvU2NlbmUvR2FtZVNjZW5lLnRzIiwic3JjL1NjZW5lL0d1aWRlck1hbmFnZXIudHMiLCJzcmMvU2NlbmUvTG9hZFNjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lUGxheS9HYW1lU2NlbmVQbGF5LnRzIiwic3JjL1V0aWxpdHkvUGF0aC50cyIsInNyYy9VdGlsaXR5L1VJRnVuYy50cyIsInNyYy9jb250cm9sZXIvQVBQLnRzIiwic3JjL2NvbnRyb2xlci9HYW1lQVBQLnRzIiwic3JjL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyLnRzIiwic3JjL3NjcmlwdC9JdGVtRWxlbWVudC50cyIsInNyYy9zY3JpcHQvUm9sZUVsZW1lbnQudHMiLCJzcmMvdWkvQkcudHMiLCJzcmMvdWkvQmFzZVVJLnRzIiwic3JjL3VpL0NoYXJhY3RlclVJLnRzIiwic3JjL3VpL0VuZEdhbWVVSS50cyIsInNyYy91aS9FbnRlckdhbWVVSS50cyIsInNyYy91aS9HYW1lVUkudHMiLCJzcmMvdWkvSXRlbUxpc3RVSS50cyIsInNyYy91aS9TZXRQYW5lbFVJLnRzIiwic3JjL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNWQSw2Q0FBOEM7QUFDOUM7SUFHSTtRQUVJLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ2xFLENBQUM7SUFDTCxnQkFBQztBQUFELENBUEEsQUFPQyxJQUFBOzs7OztBQ1BELHlDQUFtQztBQUVuQztJQUErQiw2QkFBUztJQWtDcEM7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFqQ0Qsc0JBQVcsa0JBQUs7YUFBaEI7WUFDSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO2dCQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7YUFDakM7WUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQkFBUTthQUFuQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUM7UUFDeEMsQ0FBQzthQUNELFVBQW9CLEtBQWE7WUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLENBQUM7OztPQUhBO0lBSUQsc0JBQVcsa0NBQVc7YUFBdEI7WUFFSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDO1FBQy9DLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcscUNBQWM7YUFBekI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDO1FBQzlDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsOEJBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDO1FBQ3ZDLENBQUM7YUFJRCxVQUFtQixFQUFVO1lBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQztnQkFDbEIsT0FBTztZQUNYLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FSQTtJQUNELHNCQUFXLCtCQUFRO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQTtRQUN2QyxDQUFDOzs7T0FBQTtJQVVNLDJCQUFPLEdBQWQsVUFBZSxJQUFXO1FBRXRCLElBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFDLENBQUMsRUFDbEI7WUFDSSxPQUFNO1NBQ1Q7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDN0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUFFTSw0QkFBUSxHQUFmLFVBQWdCLEtBQVk7UUFFeEIsSUFBRyxDQUFDLEtBQUssSUFBSSxLQUFLLEdBQUMsQ0FBQyxFQUNwQjtZQUNJLE9BQU07U0FDVDtRQUNELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqRCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDekMsQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0ExREEsQUEwREMsQ0ExRDhCLG1CQUFTLEdBMER2QztBQTFEWSw4QkFBUzs7OztBQ0Z0QixzREFBZ0Q7QUFDaEQsOERBQXNEO0FBQ3RELElBQWMsTUFBTSxDQThKbkI7QUE5SkQsV0FBYyxNQUFNO0lBQ2hCO1FBQUE7UUFVQSxDQUFDO1FBUlUsbUJBQWEsR0FBVyxlQUFlLENBQUM7UUFDeEMsNEJBQXNCLEdBQVcsd0JBQXdCLENBQUM7UUFDMUQsNkJBQXVCLEdBQVcseUJBQXlCLENBQUM7UUFDNUQsc0JBQWdCLEdBQVUsa0JBQWtCLENBQUM7UUFDN0MsMkJBQXFCLEdBQVcsdUJBQXVCLENBQUM7UUFDeEQscUJBQWUsR0FBVSxpQkFBaUIsQ0FBQztRQUMzQyxzQkFBZ0IsR0FBVSxrQkFBa0IsQ0FBQztRQUM3QyxzQkFBZ0IsR0FBVSxrQkFBa0IsQ0FBQztRQUN4RCxZQUFDO0tBVkQsQUFVQyxJQUFBO0lBVlksWUFBSyxRQVVqQixDQUFBO0lBRUQ7UUFvSEk7WUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsbUJBQVMsQ0FBQyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxtQkFBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQTBCLHlCQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDOUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQTVIRCxzQkFBa0Isc0JBQU07aUJBQXhCO2dCQUNJLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFHO29CQUN6QixZQUFZLENBQUMsUUFBUSxHQUFHLElBQUksWUFBWSxDQUFDO2lCQUM1QztnQkFDRCxPQUFPLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFDakMsQ0FBQzs7O1dBQUE7UUFxQkQsc0JBQVcsK0JBQUs7aUJBQWhCO2dCQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QixDQUFDO2lCQUNELFVBQWlCLEtBQVk7Z0JBRXpCLElBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQ3hCO29CQUNJLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUMvQyxDQUFDOzs7V0FUQTtRQVVELHNCQUFXLHdDQUFjO2lCQUF6QjtnQkFFSSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUNqQyxDQUFDO2lCQUNELFVBQTBCLEtBQVk7Z0JBRWxDLElBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFDakM7b0JBQ0ksT0FBTztpQkFDVjtnQkFDRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN6RCxDQUFDOzs7V0FUQTtRQVVELHNCQUFXLGtDQUFRO2lCQUFuQjtnQkFFSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxVQUFVLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNsRSxDQUFDO2lCQUNELFVBQW9CLEtBQVk7Z0JBRTVCLElBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQ3pCO29CQUNJLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ25ELENBQUM7OztXQVRBO1FBVUQsc0JBQVcseUNBQWU7aUJBQTFCO2dCQUVJLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLENBQUM7aUJBQ0QsVUFBMkIsS0FBWTtnQkFFbkMsSUFBRyxLQUFLLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUNsQztvQkFDSSxPQUFPO2lCQUNWO2dCQUNELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1lBQ3pELENBQUM7OztXQVRBO1FBVUQsc0JBQVcsdUNBQWE7aUJBQXhCO2dCQUdJLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNoQyxDQUFDOzs7V0FBQTtRQUNELHNCQUFXLGlDQUFPO2lCQVNsQjtnQkFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUIsQ0FBQztpQkFaRCxVQUFtQixLQUFZO2dCQUUzQixJQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsU0FBUyxFQUMxQjtvQkFDSSxPQUFPO2lCQUNWO2dCQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDakQsQ0FBQzs7O1dBQUE7UUFLRCxzQkFBVyxrQ0FBUTtpQkFBbkI7Z0JBRUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7OztXQUFBO1FBQ0Qsc0JBQVcsa0NBQVE7aUJBQW5CO2dCQUVJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDO2lCQUNELFVBQW9CLEtBQVk7Z0JBRTVCLElBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLEVBQzFCO29CQUNJLE9BQU07aUJBQ1Q7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ25ELENBQUM7OztXQVRBO1FBdUJNLG1DQUFZLEdBQW5CLFVBQW9CLEVBQVM7WUFFekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVNLDhCQUFPLEdBQWQsVUFBZSxFQUFTO1lBRXBCLElBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUN2QjtnQkFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMzQjtZQUNELEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQS9JQSxBQStJQyxJQUFBO0lBL0lZLG1CQUFZLGVBK0l4QixDQUFBO0FBRUwsQ0FBQyxFQTlKYSxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUE4Sm5COzs7O0FDaktELHlDQUFtQztBQUNuQyxrREFBNEM7QUFDNUM7SUFBOEMsb0NBQVM7SUFtQm5EO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBbkJELHNCQUFXLDhCQUFVO2FBQXJCO1lBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7YUFDeEM7WUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxtQ0FBSzthQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVyx5Q0FBVzthQUF0QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVywyQ0FBYTthQUF4QjtZQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFNTSx1Q0FBWSxHQUFuQixVQUFvQixFQUFVO1FBQzFCLE1BQU07UUFDTixJQUFJLEtBQUssR0FBRyxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFHLEtBQUssR0FBRSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFHO1lBQ3pELE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRU0sa0NBQU8sR0FBZCxVQUFlLEVBQVU7UUFDckIsSUFBSSxLQUFLLEdBQUcsaUJBQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUcsRUFBRSxHQUFHLENBQUMsSUFBRyxLQUFLLEdBQUUsQ0FBQyxFQUNwQjtZQUNJLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQ3BDO1lBQ0ksT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHVDQUFZLEdBQW5CLFVBQW9CLEVBQUU7UUFFbEIsSUFBSSxhQUFhLEdBQWlCLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDckQsSUFBRyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQ3BCO1lBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1NBQzNDO0lBQ0wsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0F4REEsQUF3REMsQ0F4RDZDLG1CQUFTLEdBd0R0RDs7Ozs7QUMxREQsSUFBYyxRQUFRLENBRXJCO0FBRkQsV0FBYyxRQUFRO0lBQ2xCLElBQVksVUFBc0I7SUFBbEMsV0FBWSxVQUFVO1FBQUUseUNBQUcsQ0FBQTtRQUFDLDZDQUFLLENBQUE7SUFBQSxDQUFDLEVBQXRCLFVBQVUsR0FBVixtQkFBVSxLQUFWLG1CQUFVLFFBQVk7SUFBQSxDQUFDO0FBQ3ZDLENBQUMsRUFGYSxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQUVyQjs7OztBQ0FEOztHQUVHO0FBQ0gsSUFBYyxRQUFRLENBNlJyQjtBQTdSRCxXQUFjLFFBQVE7SUFDbEIsSUFBSyxVQUFzQjtJQUEzQixXQUFLLFVBQVU7UUFBRSx5Q0FBRyxDQUFBO1FBQUMsNkNBQUssQ0FBQTtJQUFBLENBQUMsRUFBdEIsVUFBVSxLQUFWLFVBQVUsUUFBWTtJQUFBLENBQUM7SUFDNUI7UUFJSTtZQUVJLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUVELHNCQUFJLHNCQUFLO2lCQUFUO2dCQUVJLE9BQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN4QixDQUFDOzs7V0FBQTtRQUNELHFCQUFPLEdBQVAsVUFBUSxRQUFpQztZQUVyQyxLQUFJLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQzNCO2dCQUNJLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3RDO1FBQ0wsQ0FBQztRQUNEOzs7O1dBSUc7UUFDSCxpQkFBRyxHQUFILFVBQUssR0FBSyxFQUFFLEdBQVU7WUFFbEIsSUFBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ2xCO2dCQUNJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNqQjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLENBQUM7UUFDRCxpQkFBRyxHQUFILFVBQUksR0FBVTtZQUVWLE9BQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQ0Q7Ozs7V0FJRztRQUNILG9CQUFNLEdBQU4sVUFBTyxHQUFVO1lBRWIsSUFBSSxHQUFHLEdBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixJQUFHLEdBQUcsRUFDTjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDdEIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ2pCO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO1FBQ0Q7Ozs7V0FJRztRQUNILGlCQUFHLEdBQUgsVUFBSSxHQUFVO1lBRVYsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUNqQjtnQkFDSSxPQUFRLElBQUksQ0FBQzthQUNoQjs7Z0JBQ0csT0FBTyxLQUFLLENBQUM7UUFDckIsQ0FBQztRQUNMLFVBQUM7SUFBRCxDQWxFQSxBQWtFQyxJQUFBO0lBbEVZLFlBQUcsTUFrRWYsQ0FBQTtJQUVEO1FBSUk7UUFFQSxDQUFDO1FBQ0Qsc0JBQUksdUJBQUs7aUJBQVQ7Z0JBRUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7aUJBQ0QsVUFBVSxLQUFPO2dCQUViLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUM7OztXQUpBO1FBS0Qsc0JBQUksc0JBQUk7aUJBQVI7Z0JBRUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RCLENBQUM7aUJBQ0QsVUFBUyxJQUFZO2dCQUdqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUN0QixDQUFDOzs7V0FMQTtRQU1MLFdBQUM7SUFBRCxDQXhCQSxBQXdCQyxJQUFBO0lBeEJZLGFBQUksT0F3QmhCLENBQUE7SUFFRDtRQUFBO1FBNEJBLENBQUM7UUF6QkcsMkJBQVEsR0FBUixVQUFTLElBQVk7WUFFakIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDakIsSUFBRyxJQUFJLENBQUMsU0FBUyxFQUNqQjtnQkFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7YUFDOUI7aUJBQ0Q7Z0JBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7YUFDekI7UUFDTCxDQUFDO1FBQ0QseUJBQU0sR0FBTjtZQUVJLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEMsSUFBRyxJQUFJLEVBQ1A7Z0JBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzthQUN4QztpQkFDRDtnQkFDSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUssQ0FBQzthQUN4QjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFTCxlQUFDO0lBQUQsQ0E1QkEsQUE0QkMsSUFBQTtJQUVEO1FBS0k7WUFFSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDO1FBRUQsc0JBQUksNEJBQUs7aUJBQVQ7Z0JBRUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLENBQUM7OztXQUFBO1FBRU0sMkJBQU8sR0FBZDtZQUVJLElBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQ2hCO2dCQUNJLE9BQVE7YUFDWDtZQUNELElBQUksSUFBSSxHQUFXLElBQUksQ0FBQztZQUN4QixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUNkLFVBQVU7WUFDVixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUNuQjtnQkFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzthQUN0QjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFTSx3QkFBSSxHQUFYLFVBQVksS0FBTztZQUVmLElBQUksSUFBSSxHQUFXLElBQUksSUFBSSxFQUFLLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBRU0sNEJBQVEsR0FBZixVQUFnQixJQUFZO1lBRXhCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBRyxDQUFDLEVBQ2xCO2dCQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ3JCO2lCQUNEO2dCQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBQ00seUJBQUssR0FBWjtZQUVJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUM7UUFDRCxzQkFBVywrQkFBUTtpQkFBbkI7Z0JBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pCLENBQUM7OztXQUFBO1FBQ0Qsc0JBQVcsZ0NBQVM7aUJBQXBCO2dCQUVJLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtvQkFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO2lCQUMzQjtZQUNMLENBQUM7OztXQUFBO1FBQ0Qsc0JBQVcsK0JBQVE7aUJBQW5CO2dCQUVJLE9BQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMxQixDQUFDOzs7V0FBQTtRQUNELHNCQUFXLGdDQUFTO2lCQUFwQjtnQkFFSSxJQUFHLElBQUksQ0FBQyxNQUFNLEVBQ2Q7b0JBQ0ksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDNUI7WUFDTCxDQUFDOzs7V0FBQTtRQUNMLGdCQUFDO0lBQUQsQ0FsRkEsQUFrRkMsSUFBQTtJQWxGWSxrQkFBUyxZQWtGckIsQ0FBQTtJQUVEO1FBS0k7WUFFSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksUUFBUSxFQUFLLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsRUFBSyxDQUFDO1FBQ3pDLENBQUM7UUFFTSxvQkFBSSxHQUFYLFVBQVksS0FBTztZQUVmLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVNLG1CQUFHLEdBQVY7WUFFSSxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdDLElBQUcsSUFBSSxFQUNQO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNyQjtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxzQkFBSSx3QkFBSztpQkFBVDtnQkFFSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ2pDLENBQUM7OztXQUFBO1FBQ0wsWUFBQztJQUFELENBakNBLEFBaUNDLElBQUE7SUFqQ1ksY0FBSyxRQWlDakIsQ0FBQTtJQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0F1Q087QUFFUCxDQUFDLEVBN1JhLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBNlJyQjs7OztBQ2xTRCxJQUFjLEdBQUcsQ0FrRWhCO0FBbEVELFdBQWMsS0FBRztJQU1iO1FBS0ksYUFBYSxVQUFtQjtZQUFuQiwyQkFBQSxFQUFBLGlCQUFtQjtZQUU1QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUNqQyxDQUFDO1FBRUQsc0JBQUkseUJBQVE7aUJBQVo7Z0JBRUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7OztXQUFBO1FBRUQ7OztXQUdHO1FBQ0kseUJBQVcsR0FBbEIsVUFBbUIsS0FBTztZQUV0QixLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLElBQUksUUFBUSxHQUFLLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDakMsSUFBRyxRQUFRLEVBQ1g7Z0JBQ0ksUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ2xCO1lBQ0QsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNqQixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDL0IsQ0FBQztRQUVNLG9CQUFNLEdBQWI7WUFFSSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQy9CLElBQUcsUUFBUSxFQUNYO2dCQUNJLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNyQjtRQUNMLENBQUM7UUFDTCxVQUFDO0lBQUQsQ0F4Q0EsQUF3Q0MsSUFBQTtJQXhDcUIsU0FBRyxNQXdDeEIsQ0FBQTtJQUVEO1FBSUksZUFBWSxLQUFpQjtZQUFqQixzQkFBQSxFQUFBLFlBQWlCO1lBRXpCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7UUFFTSx3QkFBUSxHQUFmLFVBQWdCLEtBQVU7WUFFdEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDekIsQ0FBQztRQUtMLFlBQUM7SUFBRCxDQWpCQSxBQWlCQyxJQUFBO0lBakJxQixXQUFLLFFBaUIxQixDQUFBO0FBQ0wsQ0FBQyxFQWxFYSxHQUFHLEdBQUgsV0FBRyxLQUFILFdBQUcsUUFrRWhCOzs7O0FDbEVEO0lBQUE7SUFHQSxDQUFDO0lBQUQsY0FBQztBQUFELENBSEEsQUFHQyxJQUFBOzs7OztBQ0ZELCtDQUE0QztBQUM1QztJQUlJO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLG1CQUFRLENBQUMsR0FBRyxFQUFlLENBQUM7SUFDbkQsQ0FBQztJQUVELHNCQUFXLGVBQUU7YUFBYjtZQUVJLElBQUcsU0FBUyxDQUFDLEdBQUcsSUFBRSxJQUFJLEVBQ3RCO2dCQUNJLFNBQVMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQzthQUNuQztZQUNELE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUNELGFBQWE7SUFDTiwwQkFBTSxHQUFiO1FBRUksSUFBSSxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQWMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRSxVQUFDLEdBQWUsRUFBRyxHQUFVO1lBQy9DLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUE7UUFDRixXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sOEJBQVUsR0FBakIsVUFBMEMsSUFBZ0M7UUFFdEUsSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFDaEM7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBTSxDQUFDO1NBQzdDO1FBQ0QsSUFBSSxNQUFNLEdBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckMsT0FBUSxNQUFNLENBQUM7SUFDbkIsQ0FBQztJQUVNLDhCQUFVLEdBQWpCLFVBQXlDLElBQWdDO1FBQ3JFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFNLENBQUM7SUFDOUMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0F6Q0EsQUF5Q0MsSUFBQTs7Ozs7QUMzQ0Q7O0dBRUc7QUFDSCw2Q0FBd0M7QUFDeEMsSUFBYyxTQUFTLENBNkl0QjtBQTdJRCxXQUFjLFNBQVM7SUFDTixtQkFBUyxHQUNsQjtRQUNJLFdBQVcsRUFBRSxhQUFhO1FBQzFCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFlBQVksRUFBRSxjQUFjO0tBQy9CLENBQUE7SUFFTDtRQUFtQyxpQ0FBVztRQW9CMUM7WUFBQSxZQUNJLGlCQUFPLFNBRVY7WUFERyxLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7UUFDekIsQ0FBQztRQXRCTSxrQkFBSSxHQUFYO1lBQ0ksT0FBTyxlQUFlLENBQUM7UUFDM0IsQ0FBQztRQUlEOzs7V0FHRztRQUNLLGlDQUFTLEdBQWpCLFVBQWtCLElBQVk7WUFDMUIsSUFBSSxLQUFLLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksS0FBSyxJQUFJLElBQUksRUFBRztnQkFDdEMsS0FBSyxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ2pDO1lBQ0QsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQU1EOzs7OztVQUtFO1FBQ0YsOEJBQU0sR0FBTixVQUFPLElBQVksRUFBRSxNQUFrQixFQUFFLFFBQWdCO1lBQ3JELElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsSUFBSSxPQUFPLEdBQWEsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZELFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEIsT0FBTyxRQUFRLENBQUE7UUFDbkIsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0gsaUNBQVMsR0FBVCxVQUFVLElBQVksRUFBRSxNQUFrQixFQUFFLFFBQWdCO1lBQ3hELElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDbEMsQ0FBQztRQUVEOzs7V0FHRztRQUNILG1DQUFXLEdBQVgsVUFBWSxJQUFZO1lBQ3BCLElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFFRDs7OztXQUlHO1FBQ0gsNEJBQUksR0FBSixVQUFLLElBQVksRUFBRSxLQUFpQjtZQUFqQixzQkFBQSxFQUFBLFlBQWlCO1lBQ2hDLElBQUksUUFBUSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQ00sOEJBQU0sR0FBYjtRQUVBLENBQUM7UUFDTCxvQkFBQztJQUFELENBdEVBLEFBc0VDLENBdEVrQyxxQkFBVyxHQXNFN0M7SUF0RVksdUJBQWEsZ0JBc0V6QixDQUFBO0lBQ0QsSUFBSTtJQUNKO1FBVUksa0JBQVksUUFBZ0IsRUFBRSxNQUEyQjtZQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDO1FBVkQ7OztXQUdHO1FBQ0gsMEJBQU8sR0FBUCxVQUFRLEtBQWlCO1lBQWpCLHNCQUFBLEVBQUEsWUFBaUI7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBTUwsZUFBQztJQUFELENBZkEsQUFlQyxJQUFBO0lBZlksa0JBQVEsV0FlcEIsQ0FBQTtJQUVELElBQUk7SUFDSjtRQUVJO1lBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFDRDs7O1VBR0U7UUFDRixvQkFBRyxHQUFILFVBQUksR0FBYTtZQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLENBQUM7UUFDRDs7OztVQUlFO1FBQ0Ysb0JBQUcsR0FBSCxVQUFJLE1BQWtCLEVBQUUsUUFBdUI7WUFBdkIseUJBQUEsRUFBQSxlQUF1QjtZQUMzQyxJQUFJLFFBQVEsR0FBb0IsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNsRCxLQUFLLElBQUksTUFBTSxHQUFXLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRztnQkFDbkUsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1QixJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFHO29CQUNyRCxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDM0IsT0FBTztpQkFDVjthQUNKO1FBQ0wsQ0FBQztRQUNELElBQUk7UUFDSixzQkFBSyxHQUFMO1lBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUE7UUFDMUIsQ0FBQztRQUNEOzs7VUFHRTtRQUNGLHdCQUFPLEdBQVAsVUFBUSxLQUFVO1lBQ2QsSUFBSSxRQUFRLEdBQW9CLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDbEQsS0FBSyxJQUFJLE1BQU0sR0FBVyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUc7Z0JBQ25FLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2QjtRQUNMLENBQUM7UUFDTCxhQUFDO0lBQUQsQ0ExQ0EsQUEwQ0MsSUFBQTtJQTFDWSxnQkFBTSxTQTBDbEIsQ0FBQTtBQUNMLENBQUMsRUE3SWEsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUE2SXRCOzs7O0FDL0lELDBEQUFvRDtBQUVwRCwwQ0FBc0M7QUFFdEM7SUFBMEMsZ0NBQVc7SUFrQmpEO1FBQUEsWUFDSSxpQkFBTyxTQU1WO1FBTEcsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFbkMsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGFBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7O0lBQzlELENBQUM7SUFyQkQsc0JBQUksa0NBQVE7YUFBWjtZQUNJLElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRO2dCQUN2QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ3BDLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksZ0NBQU07YUFBVjtZQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFFTSxpQkFBSSxHQUFYO1FBQ0ksT0FBTyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQVdNLGtDQUFXLEdBQWxCLFVBQW1CLFFBQXlCO1FBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUcsUUFBUSxDQUFDLFFBQVEsRUFDcEI7WUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEQ7SUFDTCxDQUFDO0lBRU0sNkJBQU0sR0FBYjtRQUNJLElBQUksSUFBSSxDQUFDLFFBQVE7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFNRCxzQkFBSSw0QkFBRTthQWNOO1lBRUksT0FBUSxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQ3JCLENBQUM7YUFqQkQsVUFBTyxFQUFlO1lBQ2xCLElBQUksQ0FBQyxFQUFFLEVBQUU7Z0JBQ0wsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO2dCQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzthQUNqQjtZQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7OztPQUFBO0lBS0wsbUJBQUM7QUFBRCxDQTlEQSxBQThEQyxDQTlEeUMscUJBQVcsR0E4RHBEOztBQUVEOztFQUVFO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFtRUU7Ozs7QUM1SUYsMERBQW9EO0FBQ3BEO0lBQXlDLCtCQUFXO0lBa0JoRDtRQUFBLFlBQ0ksaUJBQU8sU0FJVjtRQUhHLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDeEMsS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBQ3ZELENBQUM7SUF0Qk0sZ0JBQUksR0FBWDtRQUNJLE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFNRCxzQkFBVyxtQ0FBVTthQUFyQjtZQUVJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLGlDQUFRO2FBQW5CO1lBRUksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBU00sNEJBQU0sR0FBYjtRQUNJLElBQUcsSUFBSSxDQUFDLFVBQVUsRUFDbEI7WUFDSSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDeEMsQ0FBQztJQUVNLDJCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRU0sOEJBQVEsR0FBZjtRQUVJLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFBO0lBQzNCLENBQUM7SUFDTCxrQkFBQztBQUFELENBekNBLEFBeUNDLENBekN3QyxxQkFBVyxHQXlDbkQ7Ozs7O0FDMUNELDZDQUF3QztBQUV4QywrQ0FBNkM7QUFDN0MsOENBQTRDO0FBRTVDLElBQUssUUFHSjtBQUhELFdBQUssUUFBUTtJQUNULDJDQUFNLENBQUE7SUFDTiwyQ0FBTSxDQUFBO0FBQ1YsQ0FBQyxFQUhJLFFBQVEsS0FBUixRQUFRLFFBR1o7QUFDRDtJQUF1Qyw2QkFBVztJQWlDOUM7UUFBQSxZQUNJLGlCQUFPLFNBa0JWO1FBaEJHLElBQUksT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUNwQyxPQUFPLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0IsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7UUFDMUIsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUV0QixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5QixLQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFJLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztJQUU5RCxDQUFDO0lBekNPLDJCQUFPLEdBQWYsVUFBZ0IsSUFBYztRQUMxQixJQUFJLE9BQU8sR0FBYSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN2QyxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNoQixPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNuQixPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNsQixRQUFRLElBQUksRUFBRztZQUNYLEtBQUssUUFBUSxDQUFDLE1BQU07Z0JBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO2dCQUM1QixNQUFNO1lBQ1Y7Z0JBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7Z0JBQzNCLE1BQU07U0FDYjtRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLCtCQUErQjtJQUNuQyxDQUFDO0lBRU0sY0FBSSxHQUFYO1FBQ0ksT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQXVCRCxnQ0FBWSxHQUFaO1FBRUksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM5QixlQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUM7Ozs7Ozs4Q0FNc0M7SUFDMUMsQ0FBQztJQUVNLDBCQUFNLEdBQWI7UUFFSSxRQUFRO1FBQ1IsSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQ2pEO0lBRUwsQ0FBQztJQUVNLDRCQUFRLEdBQWYsVUFBZ0IsSUFBaUI7UUFDN0IsS0FBSyxJQUFJLEdBQUcsR0FBVyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUc7WUFDdEQsSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQVcsQ0FBQztZQUNoRCxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7SUFDTCxDQUFDO0lBRU0seUJBQUssR0FBWjtJQUVBLENBQUM7SUFFRCx3QkFBSSxHQUFKLFVBQXVCLE9BQWlEO1FBQ3BFLElBQUksR0FBRyxHQUFXLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLEtBQUssR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDeEUsSUFBSSxJQUFJLEdBQWdCLElBQUksQ0FBQztRQUM3QixRQUFRLEtBQUssQ0FBQyxNQUFNLEVBQUc7WUFDbkIsT0FBTztZQUNQLEtBQUssbUJBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSztnQkFDMUIsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3hCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLElBQUksQ0FBQyxFQUFHO29CQUNwQyxVQUFVO29CQUNWLDRDQUE0QztpQkFDL0M7Z0JBQ0QsTUFBTTtZQUNWLGFBQWE7WUFDYjtnQkFDSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztnQkFDekIsTUFBTTtTQUNiO1FBRUQsSUFBSSxRQUFRLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxVQUFVO1FBQ1YsSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUc7WUFDaEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBVyxDQUFDO1lBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztnQkFDZixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDckI7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVmLE9BQU8sS0FBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCx5QkFBSyxHQUFMLFVBQU0sRUFBVTtRQUNaLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDYixJQUFJLElBQUksR0FBZ0IsSUFBSSxDQUFDO1FBQzdCLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRztZQUNoQixPQUFPO1lBQ1AsS0FBSyxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLO2dCQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDeEIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUM7b0JBQ3JCLGFBQWE7b0JBQ2Isa0RBQWtEO29CQUNsRCxNQUFNO1lBQ2QsYUFBYTtZQUNiO2dCQUNJLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN6QixNQUFNO1NBQ2I7UUFDRCxJQUFJLFFBQVEsR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3hDLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRztZQUNmLElBQUksTUFBTSxHQUFXLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBVyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRCxnQ0FBWSxHQUFaO1FBQ0ksSUFBSSxFQUFFLEdBQVcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFXLENBQUM7UUFDM0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsWUFBWTtJQUNaLHlCQUFLLEdBQUw7UUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQy9CLE9BQU8sTUFBTSxDQUFDLFdBQVcsRUFBRTtZQUN2QixJQUFJLE9BQU8sR0FBVyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBVyxDQUFDLENBQUEsZ0JBQWdCO1lBQ3JFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdkI7UUFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQTtRQUN6QixPQUFPLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDdkIsSUFBSSxPQUFPLEdBQVcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQVcsQ0FBQyxDQUFBLGdCQUFnQjtZQUNyRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0wsQ0FBQztJQUVELCtCQUFXLEdBQVgsVUFBWSxJQUFZO1FBQ3BCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsRUFBRSxHQUFHLEVBQUUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUNELCtCQUFXLEdBQVgsVUFBWSxJQUFZLEVBQUUsRUFBVTtRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUE5S00sbUJBQVMsR0FBRyxHQUFHLENBQUM7SUFDaEIsb0JBQVUsR0FBRyxJQUFJLENBQUM7SUErSzdCLGdCQUFDO0NBakxELEFBaUxDLENBakxzQyxxQkFBVyxHQWlMakQ7a0JBakxvQixTQUFTOzs7O0FDVDlCLGdHQUFnRztBQUNoRyxvREFBOEM7QUFDOUMsb0RBQThDO0FBQzlDOztFQUVFO0FBQ0Y7SUFhSTtJQUFjLENBQUM7SUFDUixlQUFJLEdBQVg7UUFDSSxJQUFJLEdBQUcsR0FBYSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxHQUFHLENBQUMsdUJBQXVCLEVBQUMscUJBQVcsQ0FBQyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBQyxxQkFBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQWpCTSxnQkFBSyxHQUFRLEdBQUcsQ0FBQztJQUNqQixpQkFBTSxHQUFRLElBQUksQ0FBQztJQUNuQixvQkFBUyxHQUFRLFlBQVksQ0FBQztJQUM5QixxQkFBVSxHQUFRLE1BQU0sQ0FBQztJQUN6QixpQkFBTSxHQUFRLEtBQUssQ0FBQztJQUNwQixpQkFBTSxHQUFRLE1BQU0sQ0FBQztJQUNyQixxQkFBVSxHQUFLLFlBQVksQ0FBQztJQUM1QixvQkFBUyxHQUFRLEVBQUUsQ0FBQztJQUNwQixnQkFBSyxHQUFTLEtBQUssQ0FBQztJQUNwQixlQUFJLEdBQVMsS0FBSyxDQUFDO0lBQ25CLHVCQUFZLEdBQVMsS0FBSyxDQUFDO0lBQzNCLDRCQUFpQixHQUFTLElBQUksQ0FBQztJQU8xQyxpQkFBQztDQW5CRCxBQW1CQyxJQUFBO2tCQW5Cb0IsVUFBVTtBQW9CL0IsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDOzs7O0FDMUJsQix3Q0FBdUM7QUFDdkMsNkNBQTJDO0FBQzNDO0lBQThDLG9DQUF1QjtJQVFqRTtlQUNJLGtCQUFNLGVBQWUsQ0FBQztJQUMxQixDQUFDO0lBUkQsc0JBQWtCLHVCQUFHO2FBQXJCO1lBQ0ksSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRTtnQkFDekIsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLElBQUksZ0JBQWdCLEVBQUUsQ0FBQzthQUNuRDtZQUNELE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBSVMsa0NBQU8sR0FBakIsVUFBa0IsSUFBUTtRQUV0QixPQUFPLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFTSx1Q0FBWSxHQUFuQixVQUFvQixFQUFFO1FBQ2xCLElBQUksSUFBSSxHQUFpQixJQUFJLENBQUMsT0FBTyxDQUFnQixFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFHLElBQUk7WUFDSCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLG1DQUFRLEdBQWYsVUFBZ0IsRUFBRTtRQUNkLElBQUksSUFBSSxHQUFpQixJQUFJLENBQUMsT0FBTyxDQUFnQixFQUFFLENBQUMsQ0FBQztRQUN6RCxJQUFHLElBQUk7WUFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLDJDQUFnQixHQUF2QixVQUF3QixFQUFFO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBZ0IsRUFBRSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLDRDQUFpQixHQUF4QixVQUF5QixFQUFVLEVBQUUsS0FBYTtRQUM5QyxJQUFJLElBQUksR0FBaUIsSUFBSSxDQUFDLE9BQU8sQ0FBZ0IsRUFBRSxDQUFDLENBQUM7UUFDekQsSUFBRyxDQUFDLElBQUk7WUFDSixPQUFRO1FBQ1osSUFBSSxhQUFhLEdBQWtCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM3RCxJQUFJLFdBQVcsR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5RixJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEMsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0EzQ0EsQUEyQ0MsQ0EzQzZDLHlCQUFXLENBQUMsV0FBVyxHQTJDcEU7O0FBQ0Q7SUFBNEIsaUNBQW9CO0lBZ0I1Qyx1QkFBWSxhQUFrQjtRQUE5QixZQUNJLGtCQUFNLGFBQWEsQ0FBQyxTQUt2QjtRQUpHLEtBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BFLEtBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzFFLEtBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3ZFLEtBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOztJQUMzRSxDQUFDO0lBZkQsc0JBQVcsbUNBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVyxnQ0FBSzthQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLDZCQUFFO2FBQWI7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFTTSwrQkFBTyxHQUFkLFVBQWUsS0FBYTtRQUN4QixJQUFJLEtBQWEsQ0FBQztRQUNsQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDM0IsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7O1lBRTFHLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDcEQsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsQ0FoQzJCLHlCQUFXLENBQUMsUUFBUSxHQWdDL0M7Ozs7QUM5RUQsd0NBQXVDO0FBQ3ZDLElBQWMsV0FBVyxDQXlEeEI7QUF6REQsV0FBYyxXQUFXO0lBQ3JCO1FBR0kscUJBQVksSUFBWTtZQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwRSxLQUFLLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTtnQkFDeEIsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLFFBQVEsR0FBYSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUM7Z0JBQ25DLElBQUksUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQzthQUNyQztRQUNMLENBQUM7UUFFUyw2QkFBTyxHQUFqQixVQUFzQyxFQUFVO1lBQzVDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRztnQkFFaEIsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNWO1lBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsUUFBUSxFQUFHO2dCQUNaLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMxQztZQUNELElBQUksUUFBUSxFQUFHO2dCQUNYLE9BQU8sUUFBYSxDQUFDO2FBQ3hCO2lCQUFPO2dCQUNKLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDO1FBQ0Q7O1dBRUc7UUFDSSwrQkFBUyxHQUFoQjtZQUNJLElBQUksR0FBRyxHQUErQixJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2pELElBQUksTUFBTSxHQUFrQixFQUFFLENBQUE7WUFDOUIsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUc7Z0JBQ2xCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDbkIsSUFBRyxJQUFJO29CQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQzVCO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0E1Q0EsQUE0Q0MsSUFBQTtJQTVDcUIsdUJBQVcsY0E0Q2hDLENBQUE7SUFFRDtRQU1JLGtCQUFZLElBQVM7WUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBTkQsc0JBQVcsd0JBQUU7aUJBQWI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3JCLENBQUM7OztXQUFBO1FBS0wsZUFBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBVFksb0JBQVEsV0FTcEIsQ0FBQTtBQUNMLENBQUMsRUF6RGEsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUF5RHhCOzs7O0FDekRELDZDQUEyQztBQUMzQztJQUF5QywrQkFBdUI7SUFRNUQ7ZUFDSSxrQkFBTSxVQUFVLENBQUM7SUFDckIsQ0FBQztJQVJELHNCQUFrQixrQkFBRzthQUFyQjtZQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUNwQixXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7YUFDekM7WUFDRCxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFJUyw2QkFBTyxHQUFqQixVQUFrQixJQUFTO1FBQ3ZCLE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLDhCQUFRLEdBQWYsVUFBZ0IsRUFBVTtRQUN0QixJQUFJLElBQUksR0FBYSxJQUFJLENBQUMsT0FBTyxDQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELElBQUksSUFBSTtZQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBRUQ7O01BRUU7SUFDSyx1Q0FBaUIsR0FBeEI7UUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3JCLElBQUksTUFBTSxHQUFrQixFQUFFLENBQUE7UUFDOUIsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDakIsSUFBSSxJQUFJLEdBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ3hCLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksUUFBUSxHQUFhLElBQWdCLENBQUM7Z0JBQzFDLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDO29CQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUM1QjtTQUNKO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0F6Q0EsQUF5Q0MsQ0F6Q3dDLHlCQUFXLENBQUMsV0FBVyxHQXlDL0Q7O0FBRUQ7SUFBdUIsNEJBQW9CO0lBV3ZDLGtCQUFZLElBQVM7UUFBckIsWUFDSSxrQkFBTSxJQUFJLENBQUMsU0FJZDtRQUhHLEtBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3hELEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3JELEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUN2RCxDQUFDO0lBWEQsc0JBQVcsMEJBQUk7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzlDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsMkJBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFPTCxlQUFDO0FBQUQsQ0FqQkEsQUFpQkMsQ0FqQnNCLHlCQUFXLENBQUMsUUFBUSxHQWlCMUM7Ozs7QUM5REQsMENBQW9DO0FBQ3BDLDhEQUFvRDtBQUNwRCwwQ0FBc0M7QUFDckM7O0VBRUU7QUFDSCxJQUFjLE9BQU8sQ0FxSHBCO0FBckhELFdBQWMsT0FBTztJQUVqQjtRQUVJLElBQUksSUFBSSxHQUFVLFdBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0MsSUFBSSxLQUFLLEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELEtBQUssSUFBSSxLQUFLLEdBQUUsQ0FBQyxFQUFDLEtBQUssR0FBRyxFQUFFLEVBQUMsRUFBRSxLQUFLLEVBQ3BDO1lBQ0ksVUFBVSxDQUFXLFFBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFSZSxZQUFJLE9BUW5CLENBQUE7SUFDRCxvQkFBbUQsU0FBb0UsRUFBQyxLQUFtQjtRQUV2SSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNsRCxJQUFHLE9BQU8sSUFBRSxJQUFJO1lBQ1osT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUNwRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBTmUsa0JBQVUsYUFNekIsQ0FBQTtJQUVEO1FBQW1DLCtCQUFhO1FBVzVDLHFCQUFZLElBQVcsRUFBQyxLQUEwQjtZQUExQixzQkFBQSxFQUFBLFlBQTBCO1lBQWxELFlBRUksaUJBQU8sU0FLVjtZQUpHLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzNCLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLEtBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUMsS0FBSSxFQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7UUFDdEQsQ0FBQztRQWhCRCwyQkFBSyxHQUFMO1lBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsYUFBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzFDLENBQUM7UUFhUyxnQ0FBVSxHQUFwQjtZQUVJLElBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUN4QjtnQkFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUMzQixDQUFDO1FBS0QsVUFBVTtRQUNBLGlDQUFXLEdBQXJCO1lBRUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBQ0QscUNBQWUsR0FBZjtZQUVJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQTNDQSxBQTJDQyxDQTNDa0MsSUFBSSxDQUFDLFFBQVEsR0EyQy9DO0lBRUQ7UUFBOEIsNEJBQVc7UUFhckMsa0JBQVksSUFBVyxFQUFDLEtBQThCO1lBQTlCLHNCQUFBLEVBQUEsWUFBOEI7WUFBdEQsWUFFSSxrQkFBTSxJQUFJLEVBQUMsS0FBSyxDQUFDLFNBRXBCO1lBREcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7O1FBQy9ELENBQUM7UUFmTSxhQUFJLEdBQVg7WUFFSSxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBRUQsNEJBQVMsR0FBVCxVQUFXLE1BQW9CO1lBRTNCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ3RCLGlCQUFNLEtBQUssV0FBRSxDQUFDO1FBQ2xCLENBQUM7UUFRRCxVQUFVO1FBQ0Esa0NBQWUsR0FBekI7WUFFSSxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDdkMsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFDLFFBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3ZDLENBQUM7UUFFRCxVQUFVO1FBQ0EsOEJBQVcsR0FBckI7WUFFSSxpQkFBTSxXQUFXLFdBQUUsQ0FBQztZQUNwQix1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxRQUFRO1FBQ0UsaUNBQWMsR0FBeEI7WUFFSSxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDdkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFDLFFBQVEsRUFBQyxNQUFNLENBQUMsQ0FBQztZQUN0RCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLEdBQUMsR0FBRyxFQUNoRDtnQkFDSSxPQUFPLElBQUksQ0FBQzthQUNmO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQXBEQSxBQW9EQyxDQXBENkIsV0FBVyxHQW9EeEM7SUFwRFksZ0JBQVEsV0FvRHBCLENBQUE7QUFDTCxDQUFDLEVBckhhLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQXFIcEI7Ozs7QUMzSEQsdUNBQWlDO0FBQ2pDLHVEQUF3RDtBQUN4RCxpQ0FBZ0M7QUFLaEMsOERBQW9EO0FBRXBELElBQWMsVUFBVSxDQXNJdkI7QUF0SUQsV0FBYyxVQUFVO0lBQ3BCO1FBeUJJLHdCQUFZLElBQW1CLEVBQUUsR0FBZTtZQUFmLG9CQUFBLEVBQUEsT0FBZTtZQUM1QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBekJELCtCQUFNLEdBQU47UUFDQSxDQUFDO1FBQ0QsbUNBQVUsR0FBVjtZQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBQ0QsOEJBQUssR0FBTCxVQUFNLE1BQWM7WUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDckIsVUFBVTtZQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFBO1lBQ2pCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUc7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUNyQjtRQUNMLENBQUM7UUFFRCxpQ0FBUSxHQUFSO1lBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQVNMLHFCQUFDO0lBQUQsQ0EvQkEsQUErQkMsSUFBQTtJQS9CWSx5QkFBYyxpQkErQjFCLENBQUE7SUFDRDtRQUFzQiwyQkFBYztRQXNCaEMsaUJBQVksS0FBbUIsRUFBRSxLQUFrQjtZQUF2QyxzQkFBQSxFQUFBLFdBQW1CO1lBQUUsc0JBQUEsRUFBQSxVQUFrQjtZQUFuRCxZQUNJLGtCQUFNLGVBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FNN0M7WUFMRyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixLQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQzs7UUFFckIsQ0FBQztRQXpCRCxzQkFBVyxjQUFHO2lCQUFkO2dCQUNJLE9BQU8sQ0FBQyxDQUFDO1lBQ2IsQ0FBQzs7O1dBQUE7UUFDRCx1QkFBSyxHQUFMLFVBQU0sTUFBYztZQUNoQixpQkFBTSxLQUFLLFlBQUMsTUFBTSxDQUFDLENBQUE7WUFDbkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXpGLElBQUksT0FBTyxHQUFHLElBQUksOEJBQWUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDekIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQix1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLGFBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzlFLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBWUQsd0JBQU0sR0FBTjtZQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUc7Z0JBQ3RCLE9BQU87YUFDVjtZQUNELElBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUc7Z0JBQy9DLElBQUksSUFBSSxHQUFTLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNqRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBRXhCLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQzFELGlCQUFNLFFBQVEsV0FBRSxDQUFDO2FBQ3BCO1FBQ0wsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQTVDQSxBQTRDQyxDQTVDcUIsY0FBYyxHQTRDbkM7SUFDRDtRQUEwQiwrQkFBYztRQUtwQyxxQkFBWSxJQUFnQjtZQUFoQixxQkFBQSxFQUFBLFFBQWdCO21CQUN4QixrQkFBTSxlQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDO1lBQzdDLG9EQUFvRDtRQUN4RCxDQUFDO1FBTkQsc0JBQVcsa0JBQUc7aUJBQWQ7Z0JBQ0ksT0FBTyxDQUFDLENBQUM7WUFDYixDQUFDOzs7V0FBQTtRQUtELDRCQUFNLEdBQU47WUFDSTs7Ozs7Y0FLRTtRQUNOLENBQUM7UUFDTCxrQkFBQztJQUFELENBakJBLEFBaUJDLENBakJ5QixjQUFjLEdBaUJ2QztJQUVEO1FBQXVCLDRCQUFjO1FBV2pDLGtCQUFZLFNBQXFCLEVBQUUsUUFBd0I7WUFBL0MsMEJBQUEsRUFBQSxhQUFxQjtZQUFFLHlCQUFBLEVBQUEsZUFBd0I7WUFBM0QsWUFDSSxrQkFBTSxlQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsU0FJL0I7WUFIRyxLQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7O1FBQ3pCLENBQUM7UUFiRCx3QkFBSyxHQUFMLFVBQU0sTUFBYztZQUNoQixpQkFBTSxLQUFLLFlBQUMsTUFBTSxDQUFDLENBQUE7WUFDbkIsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxhQUFLLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuRyxDQUFDO1FBQ0QsMkJBQVEsR0FBUjtZQUNJLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDMUQsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDckIsQ0FBQztRQVFPLHlCQUFNLEdBQWQsVUFBZSxPQUFnQjtZQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFHO2dCQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDL0IsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3BCO1lBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRztnQkFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1lBQ0QsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFDTyxnQ0FBYSxHQUFyQjtZQUNJLElBQUksSUFBWSxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDO2dCQUNsQixJQUFJLEdBQUcsRUFBRSxDQUFDOztnQkFFVixJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQ3BELHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFDTCxlQUFDO0lBQUQsQ0FwQ0EsQUFvQ0MsQ0FwQ3NCLGNBQWMsR0FvQ3BDO0FBQ0wsQ0FBQyxFQXRJYSxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQXNJdkI7Ozs7QUMvSUQsSUFBYyxTQUFTLENBa0N0QjtBQWxDRCxXQUFjLFNBQVM7SUFFbkIsSUFBWSxRQU9YO0lBUEQsV0FBWSxRQUFRO1FBRWhCLHlDQUFLLENBQUE7UUFDTCxxQ0FBRyxDQUFBO1FBQ0gsdUNBQUksQ0FBQTtRQUNKLHVDQUFJLENBQUE7UUFDSiwrQ0FBUSxDQUFBO0lBQ1osQ0FBQyxFQVBXLFFBQVEsR0FBUixrQkFBUSxLQUFSLGtCQUFRLFFBT25CO0lBQ0QsSUFBSSxRQUErQixDQUFDO0lBQ3BDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUNuQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUNuQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUMvQixRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNqQyx3QkFBZ0MsUUFBaUI7UUFFN0MsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUhlLHdCQUFjLGlCQUc3QixDQUFBO0lBRUQ7UUFHSSwyQkFBYSxlQUE2QjtZQUV0QyxJQUFJLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFDTSx1Q0FBVyxHQUFsQixVQUFvQixRQUFRO1FBRzVCLENBQUM7UUFDTCx3QkFBQztJQUFELENBWEEsQUFXQyxJQUFBO0lBWFksMkJBQWlCLG9CQVc3QixDQUFBO0FBQ0wsQ0FBQyxFQWxDYSxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQWtDdEI7Ozs7QUNoQ0QsT0FBTztBQUNQO0lBQXdDLDhCQUFXO0lBbUMvQztRQUFBLFlBRUksaUJBQU8sU0FZVjtRQVhHLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsQ0FBQztRQUN6QyxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pELEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsbURBQW1EO1FBQ25ELEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEtBQUksRUFBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQzs7UUFDL0Msc0NBQXNDO1FBQ3RDLG1CQUFtQjtRQUNsQixNQUFNO0lBQ1gsQ0FBQztJQTFDRCw2QkFBUSxHQUFSLFVBQVMsTUFBYTtRQUVsQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBRUQsMEJBQUssR0FBTCxVQUFNLFNBQXNCLEVBQUMsTUFBbUIsRUFBQyxNQUFhO1FBRTFELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFFRCxTQUFTO0lBQ1QsK0JBQVUsR0FBVjtRQUVJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUNELHNCQUFJLGdDQUFRO2FBSVo7WUFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNDLENBQUM7YUFQRCxVQUFhLEVBQWU7WUFFeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pDLENBQUM7OztPQUFBO0lBcUJPLDRCQUFPLEdBQWY7UUFFSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRXpCLENBQUM7SUFDTCxpQkFBQztBQUFELENBdkRBLEFBdURDLENBdkR1QyxJQUFJLENBQUMsTUFBTSxHQXVEbEQ7O0FBRUQ7SUFLSSw4QkFBYSxNQUFpQixFQUFDLE1BQWtDO1FBQWxDLHVCQUFBLEVBQUEsYUFBa0M7UUFFN0QsSUFBRyxNQUFNLElBQUksSUFBSSxFQUNqQjtZQUNHLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDaEI7UUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN6QixDQUFDO0lBQ0wsMkJBQUM7QUFBRCxDQWRBLEFBY0MsSUFBQTtBQUVEO0lBQStCLG9DQUFvQjtJQTJCL0MsMEJBQVksTUFBaUIsRUFBQyxNQUFrQztRQUFsQyx1QkFBQSxFQUFBLGFBQWtDO2VBRTVELGtCQUFNLE1BQU0sRUFBQyxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQTVCRCxpQ0FBTSxHQUFOO1FBRUksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFFLElBQUksSUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQ2pEO1lBQ0ksT0FBTztTQUNWO1FBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQ2pELFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUMsSUFBSSxFQUN4QjtZQUNJLFFBQVEsQ0FBQyxDQUFDLElBQUksTUFBTSxHQUFDLEdBQUcsQ0FBQztTQUM1QjtRQUNELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBQyxJQUFJLEVBQzFCO1lBQ0ksUUFBUSxDQUFDLENBQUMsSUFBSSxPQUFPLEdBQUMsR0FBRyxDQUFDO1NBQzdCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUUsUUFBUSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQU1MLHVCQUFDO0FBQUQsQ0EvQkEsQUErQkMsQ0EvQjhCLG9CQUFvQixHQStCbEQ7Ozs7QUMzR0QsMkNBQXlDO0FBQ3pDLCtCQUFtQztBQUNuQyw4REFBd0Q7QUFDeEQsMENBQXdDO0FBQ3hDLDZDQUEyQztBQUczQywwQ0FBb0M7QUFFcEMsK0NBQWdEO0FBQ2hELGlDQUFnQztBQUNoQyw4REFBb0Q7QUFJcEQsSUFBYyxJQUFJLENBMnJCakI7QUEzckJELFdBQWMsSUFBSTtJQUNkLE1BQU07SUFDTixJQUFNLE1BQU0sR0FBVyxNQUFNLENBQUM7SUFDOUIsSUFBTSxPQUFPLEdBQVcsT0FBTyxDQUFBO0lBQy9CLElBQVksU0FFWDtJQUZELFdBQVksU0FBUztRQUNqQix5Q0FBSSxDQUFBO0lBQ1IsQ0FBQyxFQUZXLFNBQVMsR0FBVCxjQUFTLEtBQVQsY0FBUyxRQUVwQjtJQUNELElBQVksUUFZWDtJQVpELFdBQVksUUFBUTtRQUNoQix1Q0FBUSxDQUFBO1FBQ1IseUNBQUssQ0FBQTtRQUNMLHVDQUFJLENBQUE7UUFDSix5Q0FBSyxDQUFBO1FBQ0wsdUNBQUksQ0FBQTtRQUNKLDhDQUFZLENBQUE7UUFDWixzREFBVyxDQUFBO1FBQ1gsc0NBQUcsQ0FBQTtRQUNILHdDQUFJLENBQUE7UUFDSixrREFBUyxDQUFBO1FBQ1Qsd0NBQVMsQ0FBQTtJQUNiLENBQUMsRUFaVyxRQUFRLEdBQVIsYUFBUSxLQUFSLGFBQVEsUUFZbkI7SUFFRDtRQUdJLHNCQUFZLElBQWMsRUFBRSxHQUFXO1lBQ25DLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLENBQUM7UUFDTCxtQkFBQztJQUFELENBUEEsQUFPQyxJQUFBO0lBUFksaUJBQVksZUFPeEIsQ0FBQTtJQUVELE1BQU07SUFDTjtRQUdJO1lBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQUUzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBRTFELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBRTdELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBRWxFLGdCQUFnQixFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVELG1DQUFjLEdBQWQsVUFBZSxLQUFhO1lBQ3hCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCx1Q0FBa0IsR0FBbEIsVUFBbUIsS0FBYTtZQUM1QixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRUQsNkJBQVEsR0FBUixVQUFTLEtBQWEsRUFBRSxPQUEwQjtZQUM5QyxJQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztZQUMzQyxLQUFLLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLE9BQU8sRUFBRztnQkFDeEQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxJQUFJLEdBQWlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNELElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUc7b0JBQ2xCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pCO2FBQ0o7WUFDRCxPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQXpDQSxBQXlDQyxJQUFBO0lBekNZLGVBQVUsYUF5Q3RCLENBQUE7SUFFRCxnQkFBZ0I7SUFDaEI7UUFhSSxXQUFXO1FBQ1gsWUFBWTtRQUNaLGtCQUFrQjtRQUNsQixxQkFBcUI7UUFDckIsb0JBQVksS0FBYSxFQUFFLEdBQVcsRUFBRSxRQUFrQixFQUFFLFVBQXNCO1lBQXRCLDJCQUFBLEVBQUEsY0FBc0I7WUFDOUUsSUFBSSxHQUFHLElBQUksU0FBUztnQkFDaEIsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNaLElBQUksVUFBVSxJQUFJLFNBQVM7Z0JBQ3ZCLFlBQVk7Z0JBQ1osVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztZQUNuQixjQUFjO1lBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBUyxLQUFLLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzNCLENBQUM7UUFDRCxzQkFBSSw2QkFBSztpQkFBVDtnQkFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ2hDLENBQUM7OztXQUFBO1FBQ0QsT0FBTztRQUNQLDRCQUFPLEdBQVAsVUFBUSxLQUFhO1lBQ2pCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUc7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7WUFDRCxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUc7Z0JBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7UUFDTCxDQUFDO1FBQ0QsT0FBTztRQUNQLDJCQUFNLEdBQU4sVUFBTyxVQUFrQjtZQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzNCLEtBQUssSUFBSSxLQUFLLEdBQVcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRztnQkFDaEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDNUI7WUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzdCLEtBQUssSUFBSSxRQUFRLEdBQVcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUc7Z0JBQzVELElBQUksU0FBUyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakM7UUFDTCxDQUFDO1FBRUQsOEJBQVMsR0FBVCxVQUFVLEtBQWE7WUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsT0FBTyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUM7UUFDTCxpQkFBQztJQUFELENBN0RBLEFBNkRDLElBQUE7SUE3RFksZUFBVSxhQTZEdEIsQ0FBQTtJQUVELElBQUksS0FBYyxDQUFDO0lBQ25CO1FBQ0ksSUFBSSxLQUFLLEVBQUc7WUFDUixPQUFPO1NBQ1Y7UUFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2IsS0FBSyxJQUFJLE1BQU0sSUFBSSx1QkFBVSxDQUFDLFlBQVksRUFBRztZQUN6QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFHO2dCQUNaLFNBQVM7YUFDWjtZQUNELEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUc7Z0JBQ3RDLElBQUksSUFBSSxHQUFRLHVCQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLElBQUksR0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUM1QztTQUNKO0lBQ0wsQ0FBQztJQWhCZSxxQkFBZ0IsbUJBZ0IvQixDQUFBO0lBQ0QseUJBQWdDLFFBQWtCLEVBQUUsSUFBSTtRQUNwRCxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUc7WUFDcEIsT0FBTTtTQUNUO1FBQ0QsSUFBSSxRQUFRLElBQUksU0FBUyxFQUFHO1lBQ3hCLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1NBQzVCO1FBQ0QsSUFBSSxJQUFJLENBQUE7UUFDUixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQTtRQUN6QyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUc7WUFDZixJQUFJLHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSSx1QkFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxTQUFTLEVBQUc7Z0JBQzlGLElBQUksSUFBSSxHQUFRLHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7aUJBQU87Z0JBQ0osSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTthQUN0QztTQUNKO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFyQmUsb0JBQWUsa0JBcUI5QixDQUFBO0lBRUQ7UUFrRUksa0JBQVksUUFBa0IsRUFBRSxJQUFVO1lBdEMxQyxZQUFPLEdBQUcsVUFBVSxRQUF3QjtnQkFBeEIseUJBQUEsRUFBQSxXQUFXLFFBQVEsQ0FBQyxJQUFJO2dCQUN4QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUQsQ0FBQyxDQUFBO1lBb0NHLElBQUksUUFBUSxJQUFJLFNBQVMsRUFBRztnQkFDeEIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDNUI7WUFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDM0IsQ0FBQztRQXRFRCxzQkFBSSxrQ0FBWTtpQkFBaEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDckYsQ0FBQzs7O1dBQUE7UUFHRCxzQkFBSSxnQ0FBVTtZQURkLFVBQVU7aUJBQ1Y7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDMUMsQ0FBQzs7O1dBQUE7UUFDRCxJQUFJO1FBQ0osNEJBQVMsR0FBVDtZQUNJLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRztnQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQztRQUVELDRCQUFTLEdBQVQ7WUFDSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFHO2dCQUNyQixPQUFPO2FBQ1Y7WUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDN0IsQ0FBQztRQU1ELGFBQWE7UUFDYiwwQkFBTyxHQUFQO1lBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUk7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBLGFBQWE7WUFDckMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBRUQ7OztXQUdHO1FBQ0gsNEJBQVMsR0FBVCxVQUFVLE1BQWM7WUFDcEIsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFHO2FBRXZCO1FBQ0wsQ0FBQztRQUNEOzs7V0FHRztRQUNILCtCQUFZLEdBQVosVUFBYSxNQUFjO1lBQ3ZCLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLElBQUksT0FBTyxFQUFHO2dCQUNWLFFBQVEsT0FBTyxDQUFDLElBQUksRUFBRztvQkFDbkIsS0FBSyxRQUFRLENBQUMsT0FBTzt3QkFDakIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN2QixLQUFLLFFBQVEsQ0FBQyxXQUFXO3dCQUNyQixPQUFPLElBQUksQ0FBQztpQkFDbkI7YUFDSjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFZRCxtQ0FBZ0IsR0FBaEIsVUFBaUIsTUFBYyxFQUFFLElBQW9CO1lBQ2pELElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRztnQkFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2xCO1FBQ0wsQ0FBQztRQUNPLGlDQUFjLEdBQXRCO1lBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFHO2dCQUM5QyxPQUFPO2FBQ1Y7WUFDRCxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLHVCQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVwRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFHO2dCQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzVEO1lBQ0QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7UUFDUyxxQ0FBa0IsR0FBNUI7WUFDSSxJQUFJLEtBQUssR0FBa0IsSUFBSSxDQUFDO1lBQ2hDLFFBQVEsSUFBSSxDQUFDLFFBQVEsRUFBRztnQkFDcEIsS0FBSyxRQUFRLENBQUMsSUFBSTtvQkFDZCxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDM0UsTUFBTTtnQkFFVixLQUFLLFFBQVEsQ0FBQyxJQUFJO29CQUNkLE1BQU07Z0JBRVY7b0JBQ0ksS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzNFLE1BQU07YUFDYjtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFFUyxnQ0FBYSxHQUF2QjtZQUNJLElBQUksS0FBSyxHQUFrQixJQUFJLENBQUM7WUFFaEMsUUFBUSxJQUFJLENBQUMsUUFBUSxFQUFHO2dCQUNwQixLQUFLLFFBQVEsQ0FBQyxJQUFJO29CQUNkLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMzRSxNQUFNO2FBQ2I7WUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0wsZUFBQztJQUFELENBMUhBLEFBMEhDLElBQUE7SUExSFksYUFBUSxXQTBIcEIsQ0FBQTtJQUVEO1FBQW1CLHdCQUFRO1FBRXZCLGNBQVksSUFBVTttQkFDbEIsa0JBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7UUFDOUIsQ0FBQztRQUNTLDRCQUFhLEdBQXZCO1lBQ0ksSUFBSSxLQUFLLEdBQXNCLElBQUksQ0FBQztZQUNwQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hELElBQUksSUFBSSxHQUFXLFdBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxDQUFDLENBQUE7WUFDeEQsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ2hDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQVhhLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFZL0IsV0FBQztLQWJELEFBYUMsQ0Fia0IsUUFBUSxHQWExQjtJQUNELHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7SUFFOUM7UUFBb0IseUJBQVE7UUFDeEIsZUFBWSxJQUFVO21CQUNsQixrQkFBTSxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUMvQixDQUFDO1FBQ0QsYUFBYTtRQUNILDZCQUFhLEdBQXZCO1lBQ0ksSUFBSSxJQUFJLEdBQVcsV0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtZQUM5QyxJQUFJLEtBQUssR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDNUQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUNELHlCQUFTLEdBQVQsVUFBVSxNQUFjO1lBQ3BCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDYjtnQkFDRixhQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyx5QkFBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDekQsSUFBSSxJQUFJLEdBQWtCLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQy9FLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEI7UUFDTCxDQUFDO1FBQ0wsWUFBQztJQUFELENBbkJBLEFBbUJDLENBbkJtQixRQUFRLEdBbUIzQjtJQUNELHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7SUFFaEQ7UUFBc0IsMkJBQVE7UUFDMUIsaUJBQVksSUFBVTttQkFDbEIsa0JBQU0sUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUM7UUFDakMsQ0FBQztRQUNELGFBQWE7UUFDSCwrQkFBYSxHQUF2QjtZQUNJLElBQUksSUFBSSxHQUFXLFdBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtZQUMvQyxJQUFJLEtBQUssR0FBa0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDM0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQztRQUVELDJCQUFTLEdBQVQsVUFBVSxNQUFjO1lBQ3BCLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSTtnQkFDdkMsT0FBTztZQUNYLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ0wsY0FBQztJQUFELENBaEJBLEFBZ0JDLENBaEJxQixRQUFRLEdBZ0I3QjtJQUNELHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUM7SUFFcEQ7UUFBMEIsK0JBQXlCO1FBSy9DOzs7O1dBSUc7UUFDSCxxQkFBWSxJQUFnQixFQUFFLE1BQXVCO1lBQXpDLHFCQUFBLEVBQUEsUUFBZ0I7WUFBRSx1QkFBQSxFQUFBLGNBQXVCO1lBQXJELFlBQ0ksa0JBQU0sTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FFM0U7WUFERyxLQUFJLENBQUMsSUFBSSxHQUFHLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOztRQUNoRSxDQUFDO1FBWEQsc0JBQVcsa0JBQUc7aUJBQWQ7Z0JBQ0ksT0FBTyxDQUFDLENBQUM7WUFDYixDQUFDOzs7V0FBQTtRQVVELDRCQUFNLEdBQU47WUFDSSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRztnQkFDdkQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ25CO1FBQ0wsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FuQkEsQUFtQkMsQ0FuQnlCLGlCQUFVLENBQUMsY0FBYyxHQW1CbEQ7SUFDRDtRQUEwQiwrQkFBUTtRQUM5QixxQkFBWSxJQUFVO21CQUNsQixrQkFBTSxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQztRQUNyQyxDQUFDO1FBQ0QsYUFBYTtRQUNILG1DQUFhLEdBQXZCO1lBQ0ksSUFBSSxJQUFJLEdBQVcsV0FBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1lBQ3BELElBQUksS0FBSyxHQUFrQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUMzRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBRUQsK0JBQVMsR0FBVCxVQUFVLE1BQWM7WUFDcEIsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJO2dCQUN2QyxPQUFPO1lBQ1gsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQWhCQSxBQWdCQyxDQWhCeUIsUUFBUSxHQWdCakM7SUFDRCx1QkFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsV0FBVyxDQUFDO0lBRTVEO1FBQW1CLHdCQUFRO1FBY3ZCLGNBQVksSUFBVTttQkFDbEIsa0JBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7UUFDOUIsQ0FBQztRQWJELDBCQUFXLEdBQVgsVUFBWSxNQUFjO1lBQ3RCLElBQUksS0FBSyxHQUFhLGlCQUFPLENBQUMsVUFBVSxDQUFXLGlCQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUM7UUFDRCx3QkFBUyxHQUFULFVBQVUsTUFBYztZQUNwQix1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQztRQUtELGFBQWE7UUFDSCw0QkFBYSxHQUF2QjtZQUNJLElBQUksSUFBSSxHQUFXLFdBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7WUFDN0MsSUFBSSxLQUFLLEdBQWtCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQzNELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFDTCxXQUFDO0lBQUQsQ0F4QkEsQUF3QkMsQ0F4QmtCLFFBQVEsR0F3QjFCO0lBQ0QsdUJBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUU5QztRQUF3Qiw2QkFBUTtRQU81QixtQkFBWSxJQUFVO21CQUNsQixrQkFBTSxRQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQztRQUNuQyxDQUFDO1FBUkQsNkJBQVMsR0FBVCxVQUFVLE1BQWM7WUFDcEIsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJO2dCQUN2QyxPQUFPO1lBQ1gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBSUQsYUFBYTtRQUNILGlDQUFhLEdBQXZCO1lBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksSUFBSSxHQUFXLFdBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNoRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxJQUFJLEtBQUssR0FBa0IsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRTVDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFDTCxnQkFBQztJQUFELENBbkJBLEFBbUJDLENBbkJ1QixRQUFRLEdBbUIvQjtJQUNELHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7SUFFeEQ7UUFBMEIsK0JBQXlCO1FBTy9DLHFCQUFZLElBQWdCO1lBQWhCLHFCQUFBLEVBQUEsUUFBZ0I7WUFBNUIsWUFDSSxrQkFBTSxRQUFRLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FJN0M7WUFIRyxLQUFJLENBQUMsT0FBTyxHQUFHLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUMvQyxLQUFJLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUN6QyxLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzs7UUFDeEIsQ0FBQztRQVJELHNCQUFXLGtCQUFHO2lCQUFkO2dCQUNJLE9BQU8sQ0FBQyxDQUFDO1lBQ2IsQ0FBQzs7O1dBQUE7UUFPRCwyQkFBSyxHQUFMLFVBQU0sTUFBYztZQUNoQixpQkFBTSxLQUFLLFlBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCw0QkFBTSxHQUFOO1lBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFHO2dCQUNwQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbkI7aUJBQU87Z0JBQ0osSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFHO29CQUM5RCxPQUFPO2lCQUNWO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzlFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUNyQjtRQUNMLENBQUM7UUFDTyxnQ0FBVSxHQUFsQixVQUFtQixJQUFVO1lBQ3pCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRztnQkFDMUMsSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLFFBQWdCLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztRQUNMLGtCQUFDO0lBQUQsQ0FsQ0EsQUFrQ0MsQ0FsQ3lCLGlCQUFVLENBQUMsY0FBYyxHQWtDbEQ7SUFFRDtRQUFrQix1QkFBUTtRQU90QixhQUFZLElBQVU7bUJBQ2xCLGtCQUFNLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO1FBQzdCLENBQUM7UUFSRCx1QkFBUyxHQUFULFVBQVUsTUFBYztZQUNwQixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixPQUFPO1lBQ1gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDbEMsQ0FBQztRQUtELGFBQWE7UUFDSCwyQkFBYSxHQUF2QjtZQUNJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLElBQUksR0FBVyxXQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQy9DLElBQUksS0FBSyxHQUFrQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1RCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0wsVUFBQztJQUFELENBakJBLEFBaUJDLENBakJpQixRQUFRLEdBaUJ6QjtJQUNELHVCQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7SUFFNUM7UUFBc0IsMkJBQXlCO1FBNEIzQyxpQkFBWSxLQUFvQixFQUFFLEtBQWtCO1lBQXhDLHNCQUFBLEVBQUEsWUFBb0I7WUFBRSxzQkFBQSxFQUFBLFVBQWtCO1lBQXBELFlBQ0ksa0JBQU0sUUFBUSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLFNBTXZDO1lBTEcsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7WUFDM0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7O1FBRXJCLENBQUM7UUEvQkQsc0JBQVcsY0FBRztpQkFBZDtnQkFDSSxPQUFPLENBQUMsQ0FBQztZQUNiLENBQUM7OztXQUFBO1FBQ0QsdUJBQUssR0FBTCxVQUFNLE1BQWM7WUFDaEIsaUJBQU0sS0FBSyxZQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ25CLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3hDLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUc7Z0JBQ3pCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNuQjtZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7WUFDOUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLHVCQUFTLENBQUMsYUFBYSxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV6RixJQUFJLE9BQU8sR0FBRyxJQUFJLDhCQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3pCLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUIsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxhQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM5RSx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRXhCLENBQUM7UUFZRCx3QkFBTSxHQUFOO1lBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRztnQkFDdEIsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRztnQkFDL0MsSUFBSSxJQUFJLEdBQVMsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2pHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFFeEIsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDMUQsaUJBQU0sUUFBUSxXQUFFLENBQUM7YUFDcEI7UUFDTCxDQUFDO1FBQ0wsY0FBQztJQUFELENBbERBLEFBa0RDLENBbERxQixpQkFBVSxDQUFDLGNBQWMsR0FrRDlDO0lBRUQ7UUFBbUIsd0JBQVE7UUFNdkIsY0FBWSxJQUFVO21CQUNsQixrQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztRQUM5QixDQUFDO1FBUEQsd0JBQVMsR0FBVCxVQUFVLE1BQWM7WUFDcEIsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDakIsT0FBTztZQUNYLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFLRCxhQUFhO1FBQ0gsNEJBQWEsR0FBdkI7WUFDSSxJQUFJLEtBQUssR0FBc0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUNqRyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBQ0wsV0FBQztJQUFELENBZkEsQUFlQyxDQWZrQixRQUFRLEdBZTFCO0lBQ0QsdUJBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUU5QztRQUF1Qiw0QkFBeUI7UUFzQzVDLGtCQUFZLEtBQW1CLEVBQUUsS0FBa0I7WUFBdkMsc0JBQUEsRUFBQSxXQUFtQjtZQUFFLHNCQUFBLEVBQUEsVUFBa0I7WUFBbkQsWUFDSSxrQkFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsU0FNeEM7WUFMRyxLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztZQUMzQixLQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQzs7UUFFckIsQ0FBQztRQXpDRCxzQkFBVyxlQUFHO2lCQUFkO2dCQUNJLE9BQU8sQ0FBQyxDQUFDO1lBQ2IsQ0FBQzs7O1dBQUE7UUFDRCx5QkFBTSxHQUFOO1lBQ0ksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRztnQkFDdEIsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRztnQkFDL0MsSUFBSSxJQUFJLEdBQVMsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2pHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEI7UUFDTCxDQUFDO1FBQ0Qsc0JBQUcsR0FBSCxVQUFJLElBQVU7WUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3hCLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDMUQsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDckIsQ0FBQztRQUNELHdCQUFLLEdBQUwsVUFBTSxNQUFjO1lBQ2hCLGlCQUFNLEtBQUssWUFBQyxNQUFNLENBQUMsQ0FBQTtZQUNuQixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1lBQzlDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFekYsSUFBSSxPQUFPLEdBQUcsSUFBSSw4QkFBZSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN6QixNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksYUFBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDL0YsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVFLENBQUM7UUFZTyx5QkFBTSxHQUFkLFVBQWUsT0FBZ0I7WUFDM0IsSUFBSSxVQUFVLEdBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDMUUsSUFBSSxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUc7Z0JBQ3ZELFVBQVUsR0FBRyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2xHO1lBQ0QsSUFBSSxJQUFJLEdBQVMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELElBQUksT0FBTztnQkFDUCxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Z0JBRXhCLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUc7Z0JBQzNCLE9BQU07YUFDVDtZQUNELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQTdEQSxBQTZEQyxDQTdEc0IsaUJBQVUsQ0FBQyxjQUFjLEdBNkQvQztJQUVEO1FBQW1CLHdCQUFRO1FBUXZCLGNBQVksSUFBVTttQkFDbEIsa0JBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7UUFDOUIsQ0FBQztRQVRELHdCQUFTLEdBQVQsVUFBVSxNQUFjO1lBQ3BCLElBQUksT0FBTyxHQUFtQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFHO2dCQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQzthQUNsQztZQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBSUQsYUFBYTtRQUNILDRCQUFhLEdBQXZCO1lBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksSUFBSSxHQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1lBQzVGLGtEQUFrRDtZQUNsRCxpREFBaUQ7WUFFakQsSUFBSSxLQUFLLEdBQWtCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFDTCxXQUFDO0lBQUQsQ0FyQkEsQUFxQkMsQ0FyQmtCLFFBQVEsR0FxQjFCO0lBQ0QsdUJBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztJQUU5QztRQUF1Qiw0QkFBeUI7UUFXNUMsa0JBQVksU0FBcUIsRUFBRSxRQUF3QjtZQUEvQywwQkFBQSxFQUFBLGFBQXFCO1lBQUUseUJBQUEsRUFBQSxlQUF3QjtZQUEzRCxZQUNJLGtCQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLFNBSTFCO1lBSEcsS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDOztRQUN6QixDQUFDO1FBYkQsd0JBQUssR0FBTCxVQUFNLE1BQWM7WUFDaEIsaUJBQU0sS0FBSyxZQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ25CLHVCQUFTLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksYUFBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbkcsQ0FBQztRQUNELDJCQUFRLEdBQVI7WUFDSSx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQzFELGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ3JCLENBQUM7UUFRTyx5QkFBTSxHQUFkLFVBQWUsUUFBaUI7WUFDNUIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFBRztnQkFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQy9CLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNwQjtZQUNELElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLEVBQUc7Z0JBQ3RCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUNuQjtZQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBQ08sZ0NBQWEsR0FBckI7WUFDSSxJQUFJLElBQVksQ0FBQztZQUNqQixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQztnQkFDbkIsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7Z0JBRVYsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNwRCx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBQ0wsZUFBQztJQUFELENBcENBLEFBb0NDLENBcENzQixpQkFBVSxDQUFDLGNBQWMsR0FvQy9DO0FBRUwsQ0FBQyxFQTNyQmEsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBMnJCakI7Ozs7QUMxc0JELElBQWMsVUFBVSxDQXNDdkI7QUF0Q0QsV0FBYyxVQUFVO0lBRXBCO1FBSUk7WUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDO1FBQ3JDLENBQUM7UUFDTCxjQUFDO0lBQUQsQ0FUQSxBQVNDLElBQUE7SUFUWSxrQkFBTyxVQVNuQixDQUFBO0lBQ0Q7UUFtQkksbUJBQWEsQ0FBUSxFQUFDLENBQVE7WUFFMUIsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDO1FBcEJELHNCQUFJLHdCQUFDO2lCQUFMO2dCQUVJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixDQUFDO2lCQUNELFVBQU0sQ0FBUTtnQkFFVixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQztZQUNwQixDQUFDOzs7V0FKQTtRQUtELHNCQUFJLHdCQUFDO2lCQUFMO2dCQUVJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixDQUFDO2lCQUNELFVBQU0sQ0FBUTtnQkFFVixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDOzs7V0FKQTtRQVVMLGdCQUFDO0lBQUQsQ0F2QkEsQUF1QkMsSUFBQTtJQXZCWSxvQkFBUyxZQXVCckIsQ0FBQTtJQUVELFdBQUEsWUFBWSxHQUFHLEVBQUcsQ0FBQztBQUN2QixDQUFDLEVBdENhLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBc0N2Qjs7OztBQ2xDRCxJQUFjLEtBQUssQ0FxRWxCO0FBckVELFdBQWMsS0FBSztJQUVuQixTQUFTO0lBQ1Q7UUFNSSx1QkFBYSxLQUEyQjtZQUEzQixzQkFBQSxFQUFBLFlBQTJCO1lBRXBDLElBQUcsS0FBSyxJQUFJLElBQUksRUFDaEI7Z0JBQ0ksS0FBSyxHQUFHLElBQUksQ0FBQzthQUNoQjtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7UUFDRCw4QkFBTSxHQUFOLGNBQ0MsQ0FBQztRQUNGLDZCQUFLLEdBQUwsY0FBUSxDQUFDO1FBQ2Isb0JBQUM7SUFBRCxDQWpCQSxBQWlCQyxJQUFBO0lBakJxQixtQkFBYSxnQkFpQmxDLENBQUE7SUFFRDtRQUE4Qiw0QkFBYTtRQVN2QyxrQkFBWSxLQUFnQixFQUFDLFFBQXNDO1lBQXZELHNCQUFBLEVBQUEsWUFBZ0I7WUFBQyx5QkFBQSxFQUFBLGVBQXNDO1lBQW5FLFlBRUksaUJBQU8sU0FHVjtZQUZHLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDOztRQUM5QixDQUFDO1FBWkQsd0JBQUssR0FBTCxVQUFNLE9BQWU7WUFFakIsSUFBRyxJQUFJLENBQUMsU0FBUztnQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFTTCxlQUFDO0lBQUQsQ0FmQSxBQWVDLENBZjZCLGFBQWEsR0FlMUM7SUFmWSxjQUFRLFdBZXBCLENBQUE7SUFDRDtRQUFtQyxpQ0FBYTtRQUs1Qyx1QkFBYSxHQUFpQixFQUFDLEtBQTBCO1lBQTFCLHNCQUFBLEVBQUEsWUFBMEI7WUFBekQsWUFFSSxrQkFBTSxLQUFLLENBQUMsU0FJZjtZQUhHLEtBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQ25CLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDOztRQUMxQixDQUFDO1FBQ0QsNkJBQUssR0FBTCxVQUFPLE9BQWU7WUFFbEIsaUNBQWlDO1lBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQzVCLENBQUM7UUFDRCw4QkFBTSxHQUFOO1lBRUksSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUUsR0FBRyxFQUN4RDtnQkFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hDO1FBQ0wsQ0FBQztRQUNELDZCQUFLLEdBQUw7WUFFSSxJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDO1FBQ0wsb0JBQUM7SUFBRCxDQTlCQSxBQThCQyxDQTlCa0MsYUFBYSxHQThCL0M7SUE5QlksbUJBQWEsZ0JBOEJ6QixDQUFBO0FBQ0QsQ0FBQyxFQXJFYSxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFxRWxCOzs7O0FDekVELCtCQUF5QjtBQUd6Qiw4REFBb0Q7QUFHbkQ7O0VBRUU7QUFDSCxPQUFPO0FBQ1A7SUFBdUMsNkJBQWE7SUE0R2hELG1CQUFZLE9BQWMsRUFBQyxLQUFnQjtRQUFoQixzQkFBQSxFQUFBLFNBQWdCO1FBQTNDLGlCQWdCQztRQWRHLElBQUksT0FBTyxHQUFVLHVCQUFTLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUN6RCxRQUFBLGlCQUFPLFNBQUM7UUFDUixLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixLQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixLQUFLLElBQUksUUFBUSxHQUFVLENBQUMsT0FBTyxHQUFFLENBQUMsQ0FBQyxFQUFDLFFBQVEsSUFBRSxDQUFDLEVBQUMsRUFBRSxRQUFRLEVBQzlEO1lBQ0ksSUFBSSxPQUFPLEdBQVEsSUFBSSxjQUFJLENBQUMsS0FBSSxFQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUM7U0FDckM7O0lBQ0wsQ0FBQztJQXBIRCxzQkFBSSwrQkFBUTthQUlaO1lBRUksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUNuQyxDQUFDO2FBUEQsVUFBYyxLQUFrQjtZQUU1QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDcEMsQ0FBQzs7O09BQUE7SUFNRCxlQUFlO0lBQ2YsMkJBQU8sR0FBUCxVQUFRLEdBQVU7UUFFZCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxNQUFNO0lBQ04sMkJBQU8sR0FBUCxVQUFTLEtBQVk7UUFHakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDcEMsSUFBSSxVQUFVLEdBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1FBQ3BELElBQUksWUFBWSxHQUFFLHVCQUFTLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztRQUN2RCxLQUFLLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBQyxLQUFLLENBQUM7UUFDM0IsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBQyxDQUFDLEdBQUUsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLE9BQU8sR0FBVSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRW5DLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBRyxZQUFZLENBQUM7UUFDakQsSUFBRyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQ3hCO1lBQ0ksTUFBTSxJQUFJLFlBQVksR0FBQyxDQUFDLENBQUM7U0FDNUI7UUFFQSxLQUFLLElBQUksTUFBTSxHQUFFLENBQUMsRUFBRSxNQUFNLEdBQUMsT0FBTyxDQUFDLE1BQU0sRUFBQyxFQUFFLE1BQU0sRUFDbkQ7WUFDSSxJQUFJLE9BQU8sR0FBUSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztZQUNsQyxVQUFVLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUUsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFFLE1BQU0sR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNsRCxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQTs7Z0JBRWxDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakMsTUFBTSxJQUFJLFlBQVksQ0FBQztTQUMxQjtRQUVELElBQUcsSUFBSSxDQUFDLE1BQU07WUFDVixPQUFPO1FBQ1gsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDMUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUMzQjtZQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7U0FDdkM7YUFDRDtZQUNJLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFFLENBQUMsQ0FBQztTQUN4QztJQUVMLENBQUM7SUFFRCxXQUFXO0lBQ1gsa0NBQWMsR0FBZDtRQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsR0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxhQUFhO0lBQ2IsZ0NBQVksR0FBWixVQUFjLFNBQW1CO1FBRTdCLFdBQVc7UUFDWCxJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUMsV0FBVyxHQUFFLElBQUksQ0FBQyxXQUFXLENBQUE7UUFDdkQsS0FBSyxJQUFJLFFBQVEsR0FBVSxDQUFDLEVBQUMsUUFBUSxHQUFFLElBQUksQ0FBQyxXQUFXLEVBQUMsRUFBRSxRQUFRLEVBQ2xFO1lBQ0ksSUFBSSxVQUFVLEdBQU8sSUFBSSxDQUFDO1lBQzFCLElBQUksV0FBVyxHQUFPLElBQUksQ0FBQztZQUMzQixJQUFHLFNBQVMsRUFDWjtnQkFDSSxVQUFVLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDekMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDO2FBQy9DO2lCQUNEO2dCQUNJLFVBQVUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsV0FBVyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDN0M7WUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQ2hDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBRWhDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQ2xDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQUNELE1BQU07SUFDTix5QkFBSyxHQUFMO1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQW1CTCxnQkFBQztBQUFELENBN0hBLEFBNkhDLENBN0hzQyxJQUFJLENBQUMsUUFBUSxHQTZIbkQ7Ozs7O0FDdklELCtDQUE4QztBQUU5Qyw4REFBc0Q7QUFDdEQsMENBQW9DO0FBRXBDLHdDQUFzQztBQUN0Qyw4REFBb0Q7QUFDcEQsdUNBQStCO0FBQy9CLHlDQUFxQztBQUNyQyxrREFBNEM7QUFFNUMsSUFBSSxHQUFHLEdBQVUsQ0FBQyxDQUFDO0FBRW5CLGVBQWU7QUFDZixNQUFNO0FBQ047SUFBb0MsMEJBQWE7SUFxRDdDO1FBQUEsWUFFSSxpQkFBTyxTQU9WO1FBTkcsS0FBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsYUFBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBRXZDLFNBQVM7UUFDVCxLQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFDLEtBQUksRUFBQyxjQUFNLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZELElBQUksR0FBRyxHQUFvQixpQkFBTyxDQUFDLFlBQVksQ0FBQzs7SUFDcEQsQ0FBQztJQTlDRCxzQkFBSSwyQkFBTzthQUlYO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFQRCxVQUFZLElBQVM7WUFFakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFNTyw4QkFBYSxHQUFyQixVQUF1QixXQUF5QjtRQUU1QyxJQUFJLENBQUMsUUFBUSxDQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUMsV0FBVyxFQUFFLGVBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUMsV0FBVyxFQUFFLGVBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxxQkFBcUIsRUFBRSxNQUFNLEVBQUMsV0FBVyxFQUFFLGVBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVPLHlCQUFRLEdBQWhCLFVBQWtCLFlBQW1CLEVBQUUsUUFBZSxFQUFFLFdBQXlCLEVBQUUsUUFBc0I7UUFFckcsSUFBSSxLQUFLLEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN2RSxJQUFJLFNBQVMsR0FBaUIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTVDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzlDLFFBQU8sUUFBUSxFQUNmO1lBQ0ksS0FBSyxNQUFNO2dCQUNQLElBQUksSUFBSSxHQUFpQixXQUFXLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBa0IsQ0FBQztnQkFDL0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0IsTUFBTTtZQUNOO2dCQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsUUFBUSxFQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNO1NBQ1Q7UUFFRCxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUMzQyxDQUFDO0lBYU0sK0JBQWMsR0FBckIsVUFBdUIsS0FBbUI7UUFFdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsSUFBSSxLQUFLLEdBQWlCLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDMUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsS0FBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQ3BCO1lBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxzQkFBSyxHQUFMO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBRyxJQUFJLENBQUMsU0FBUztZQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDhCQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLElBQUksZ0JBQWdCLEdBQXNCLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDNUUsSUFBSSxTQUFTLEdBQVUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsd0JBQU8sR0FBUCxVQUFRLEdBQVU7UUFFZCxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBRyxJQUFJLElBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBRSxTQUFTLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDLENBQUEsSUFBSSxDQUFDO0lBQzNGLENBQUM7SUFFRCxNQUFNO0lBQ04sd0JBQU8sR0FBUCxVQUFRLE9BQVk7UUFFaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxLQUFLLENBQUMsQ0FBQyxJQUFJLHVCQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQVMsQ0FBQyxjQUFjLENBQUMscUJBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELHNCQUFJLDRCQUFRO2FBS1o7WUFFSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNDLENBQUM7YUFSRCxVQUFjLEtBQWtCO1lBRTVCLElBQUksS0FBSyxHQUFnQixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBS0Qsc0JBQUksaUNBQWE7YUFBakI7WUFFSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFFRDs7O09BR0c7SUFDSCx3QkFBTyxHQUFQLFVBQVEsSUFBUztRQUViLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxDQUFDO0lBRUQsMEJBQVMsR0FBVDtRQUVJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLHFCQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7UUFDMUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQseUJBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVELG9CQUFHLEdBQUg7UUFFSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxxQkFBUyxDQUFDLGNBQWMsQ0FBQyxxQkFBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxNQUFNO0lBQ04sNEJBQVcsR0FBWDtRQUVJLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQ3BDO1lBQ0ksT0FBUTtTQUNYO1FBQ0QsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxlQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUNqTztZQUNJLGFBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLHlCQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3pELElBQUksUUFBUSxHQUFVLHFCQUFTLENBQUMsY0FBYyxDQUFDLHFCQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hFLElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25DLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMEJBQVMsR0FBVCxVQUFXLE1BQW1CO1FBRTFCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMEJBQVMsR0FBVCxVQUFVLFNBQTBDO1FBRWhELElBQUksTUFBTSxHQUFvQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO1FBQ3pCLFNBQVMsQ0FBQyxRQUFRLEdBQUUsTUFBTSxDQUFDO1FBQzNCLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMEJBQVMsR0FBVDtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDekMsQ0FBQztJQUNEOzs7O09BSUc7SUFDSCx3QkFBTyxHQUFQLFVBQVEsSUFBOEI7UUFFbEMsSUFBSSxLQUFLLEdBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUM1QixJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUUsSUFBSSxJQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUUsU0FBUyxFQUM1RDtZQUNJLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsSUFBSSxTQUFTLEdBQWlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELElBQUcsU0FBUyxFQUNaO1lBQ0ksU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDRDs7O09BR0c7SUFDSCw0QkFBVyxHQUFYLFVBQWEsR0FBaUI7UUFFMUIsT0FBTztRQUNQLElBQUcsR0FBRyxJQUFFLElBQUksRUFDWjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUNEOztPQUVHO0lBQ0gsNkJBQVksR0FBWixVQUFhLEtBQVk7UUFFckIsSUFBSSxJQUFJLEdBQWtCLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxTQUFTLEdBQWlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFELElBQUcsU0FBUztZQUFFLFNBQVMsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUcsSUFBSSxJQUFFLElBQUksSUFBRSxJQUFJLElBQUUsU0FBUyxFQUM5QjtZQUNJLE9BQU87U0FDVjtJQUNMLENBQUM7SUFFRCx3QkFBTyxHQUFQO1FBRUksSUFBRyxJQUFJLENBQUMsV0FBVztZQUNmLE9BQU87UUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3RCLEtBQUssSUFBSSxPQUFPLEdBQVUsQ0FBQyxFQUFDLE9BQU8sR0FBQyxDQUFDLEVBQUMsRUFBRSxPQUFPLEVBQy9DO1lBQ0ksSUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFFLElBQUksSUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFFLFNBQVM7Z0JBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEM7SUFDTCxDQUFDO0lBQ0QsMkJBQVUsR0FBVjtRQUVJLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0EzUUEsQUEyUUMsQ0EzUW1DLElBQUksQ0FBQyxRQUFRLEdBMlFoRDs7QUFFRDtJQUVJO0lBQ0MsQ0FBQztJQUNGLDBCQUFPLEdBQVAsVUFBUyxJQUFTO0lBR2xCLENBQUM7SUFDTCxlQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUE7Ozs7QUNuU0QsMENBQW9DO0FBRXBDLDhEQUFvRDtBQUNwRCxJQUFjLGVBQWUsQ0FvSDVCO0FBcEhELFdBQWMsZUFBZTtJQUV6QjtRQWVJLDBCQUFhLE1BQWEsRUFBRSxNQUE4QjtZQUE5Qix1QkFBQSxFQUFBLGFBQThCO1lBRXRELElBQUcsTUFBTSxJQUFJLElBQUksRUFDakI7Z0JBQ0ksTUFBTSxHQUFHLElBQUksQ0FBQzthQUNqQjtZQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLENBQUM7UUFqQkQsaUNBQU0sR0FBTjtZQUVJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBQ0Qsb0NBQVMsR0FBVCxVQUFVLE1BQWE7WUFFbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDekIsQ0FBQztRQVlMLHVCQUFDO0lBQUQsQ0F6QkEsQUF5QkMsSUFBQTtJQXpCcUIsZ0NBQWdCLG1CQXlCckMsQ0FBQTtJQUVELGNBQWM7SUFDZDtRQUFzQyxvQ0FBZ0I7UUFTbEQsMEJBQVksTUFBb0I7WUFBcEIsdUJBQUEsRUFBQSxhQUFvQjtZQUFoQyxZQUVJLGtCQUFNLE1BQU0sQ0FBQyxTQUVoQjtZQURHLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7O1FBQ25CLENBQUM7UUFURCxvQ0FBUyxHQUFUO1lBRUksSUFBSSxDQUFDLElBQUksR0FBRyxhQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLHVCQUFTLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQztZQUNqRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDO1FBTVMsa0NBQU8sR0FBakI7WUFFSSxJQUFHLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUNkO2dCQUNJLElBQUcsSUFBSSxDQUFDLElBQUksSUFBRSxhQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN6RDtvQkFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3pDLE9BQU87aUJBQ1Y7cUJBRUQ7b0JBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQkFDOUMsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssSUFBSSxRQUFRLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQ3pFO3dCQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO3dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO3FCQUMxQjtvQkFDRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsR0FBQyxRQUFRLEdBQUUsdUJBQVMsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ2hFLElBQUksTUFBTSxHQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7b0JBQ3ZELE1BQU0sQ0FBQyxDQUFDLElBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO29CQUM5QyxJQUFJLEtBQUssR0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7b0JBQzlDLEtBQUssQ0FBQyxDQUFDLElBQUcsdUJBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO29CQUM3QyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDL0IsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksR0FBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzVDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLEdBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFFNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2lCQUNoQzthQUNKO2lCQUNEO2dCQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDN0I7UUFDTCxDQUFDO1FBQ0wsdUJBQUM7SUFBRCxDQWpEQSxBQWlEQyxDQWpEcUMsZ0JBQWdCLEdBaURyRDtJQWpEWSxnQ0FBZ0IsbUJBaUQ1QixDQUFBO0lBRUQsTUFBTTtJQUNOO1FBQStCLDZCQUFnQjtRQWdCM0MsbUJBQVksS0FBWTtZQUF4QixZQUVJLGtCQUFNLElBQUksQ0FBQyxTQUVkO1lBREcsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O1FBQ3ZCLENBQUM7UUFqQkQ7OztXQUdHO1FBQ0gsNkJBQVMsR0FBVCxVQUFVLE1BQWE7WUFFbkIsaUJBQU0sU0FBUyxZQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvRSxDQUFDO1FBV1MsMkJBQU8sR0FBakI7WUFFSSxJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUN0QjtnQkFDSSxPQUFPO2FBQ1Y7WUFDRCxnSEFBZ0g7WUFDakgsZ0RBQWdEO1lBQ2hELElBQUksTUFBTSxHQUFnQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDTCxnQkFBQztJQUFELENBakNBLEFBaUNDLENBakM4QixnQkFBZ0IsR0FpQzlDO0lBakNZLHlCQUFTLFlBaUNyQixDQUFBO0FBQ0wsQ0FBQyxFQXBIYSxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQW9INUI7Ozs7QUN4SEQsdUNBQStCO0FBRS9CLDJDQUF1QztBQUN2QywwQ0FBc0M7QUFDdEMsMENBQW9DO0FBR3BDLEdBQUc7QUFDSDtJQUFrQyx3QkFBYTtJQXlFM0MsY0FBWSxLQUFlLEVBQUMsR0FBVTtRQUF0QztRQUVJLGtDQUFrQztRQUNsQyxpQkFBTyxTQTRCVjtRQTNCRyxhQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLENBQUM7UUFDdkMsSUFBRyxLQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFDaEI7WUFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3pELElBQUksSUFBSSxHQUFVLFdBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUMsR0FBRyxDQUFDLENBQUE7WUFDbEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDeEM7UUFFRCxxR0FBcUc7UUFFckcsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CLFVBQVUsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25ELEtBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0MsS0FBSSxDQUFDLFFBQVEsR0FBRyxlQUFJLENBQUMsZUFBZSxDQUFDLGVBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFDLEtBQUksQ0FBQyxDQUFDO1FBQUEsQ0FBQztRQUMvRCxLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzFCLEtBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLEtBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBRWYsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdkIsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsS0FBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7O0lBQ3JCLENBQUM7SUF4RkQsc0JBQUksMEJBQVE7YUFJWjtZQUVJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDM0MsQ0FBQztRQVJELE1BQU07YUFDTixVQUFjLEtBQWtCO1lBRTVCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTtJQUtELHNCQUFJLDBCQUFRO2FBQVo7WUFFSSxPQUFPLElBQUksdUJBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRSxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLDRCQUFVO2FBQWQ7WUFFSSxPQUFPLElBQUksQ0FBQyxXQUFXLElBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBQ3ZFLENBQUM7YUFDRCxVQUFlLEtBQWE7WUFFeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsQ0FBQzs7O09BSkE7SUFLRCxzQkFBSSw0QkFBVTthQUFkO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQztRQUNwQyxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLHlCQUFPO2FBQVg7WUFFSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsQ0FBQzs7O09BQUE7SUFDRCxzQkFBTyxHQUFQLFVBQVMsU0FBdUI7UUFFNUIsSUFBRyxTQUFTLElBQUksZUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQ25DO1lBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRSxLQUFLLENBQUM7WUFDbkIsT0FBTztTQUNWO2FBQ0Q7WUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUN0QjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCx3QkFBUyxHQUFULFVBQVUsS0FBa0IsRUFBQyxZQUE0QjtRQUE1Qiw2QkFBQSxFQUFBLG9CQUE0QjtRQUVyRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFHLENBQUMsWUFBWTtZQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQXJFRCxNQUFNO0lBQ1EsaUJBQVksR0FBVSxDQUFDLENBQUM7SUF3RzFDLFdBQUM7Q0EzR0QsQUEyR0MsQ0EzR2lDLElBQUksQ0FBQyxRQUFRLEdBMkc5QztrQkEzR29CLElBQUk7Ozs7QUNGekIsK0NBQXlDO0FBRXpDLHVDQUFpQztBQUNqQywyQ0FBcUM7QUFFckMsbURBQThDO0FBQzlDO0lBR0k7UUFFSSxJQUFJLEVBQUUsR0FBRyxhQUFHLENBQUM7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsb0JBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixzREFBc0Q7UUFDdEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7UUFFN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDNUMsUUFBUTtRQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFFVixJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFDLHlCQUF5QixFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLDZCQUE2QixFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDaEksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsdUJBQVEsR0FBUjtRQUVJLGFBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLElBQUksUUFBUSxHQUFnQixhQUFHLENBQUMsWUFBWSxDQUFDO1FBQzdDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxtQkFBUyxFQUFFLENBQUMsQ0FBQztRQUN0QyxhQUFHLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBWSxtQkFBUyxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELHFCQUFNLEdBQU47UUFFSSxhQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FqQ0EsQUFpQ0MsSUFBQTtBQUNELElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Ozs7QUM5Q3BCLGlDQUE2QjtBQUM3QiwwQ0FBd0M7QUFHeEMsMkRBQXFEO0FBR3JEO0lBQTBDLGdDQUFrQjtJQUt4RDtlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQU5ELHNCQUFXLGtDQUFRO2FBQW5CO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBeUIsQ0FBQztRQUMxQyxDQUFDOzs7T0FBQTtJQUlELDRCQUFLLEdBQUw7UUFFSSxJQUFJLFVBQVUsR0FBRyxDQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQUMsV0FBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBQyxXQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDN0csSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLGFBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxJQUFJLHVCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUNNLDBCQUFHLEdBQVY7SUFHQSxDQUFDO0lBRUwsbUJBQUM7QUFBRCxDQWxCQSxBQWtCQyxDQWxCeUMsYUFBSyxDQUFDLFlBQVksR0FrQjNEOzs7OztBQ1JELDBDQUFzQztBQUd0QywrQ0FBdUM7QUFFdkMsK0NBQXlDO0FBS3pDLElBQUksUUFBUSxHQUFHLGVBQUksQ0FBQyxRQUFRLENBQUM7QUFDN0IsTUFBTTtBQUNOO0lBQXVDLDZCQUFlO0lBU2xELE1BQU07SUFDTjtRQUFBLFlBRUksaUJBQU8sU0FFVjtRQURHLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDOztJQUN2QyxDQUFDO0lBVlMsK0JBQVcsR0FBckI7UUFFSSxPQUFPLElBQUksc0JBQVksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFTTCxnQkFBQztBQUFELENBaEJBLEFBZ0JDLENBaEJzQyxhQUFLLENBQUMsU0FBUyxHQWdCckQ7Ozs7O0FDeENELG1EQUE2QztBQUM3QywwQ0FBc0M7QUFDdEMsMENBQXNDO0FBQ3RDLHdDQUFtQztBQUVuQztJQTBCSSxNQUFNO0lBQ047UUFFSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBMUJELHNCQUFXLG9CQUFHO2FBQWQ7WUFFSSxJQUFHLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUM3QjtnQkFDSSxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7YUFDNUM7WUFDRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFHRCxzQkFBVyxrQ0FBTzthQUFsQjtZQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFDRCxhQUFhO0lBQ2Isa0NBQVUsR0FBVjtRQUVJLElBQUksWUFBWSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDckMsYUFBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxZQUFZLENBQUM7SUFDakMsQ0FBQztJQU9MLG9CQUFDO0FBQUQsQ0EvQkEsQUErQkMsSUFBQTs7QUFFRDtJQUEwQiwrQkFBZTtJQUlyQztlQUVJLGlCQUFPO0lBQ1gsQ0FBQztJQUVTLGlDQUFXLEdBQXJCO1FBRUksSUFBSSxRQUFRLEdBQXNCLElBQUksY0FBYyxFQUFFLENBQUM7UUFDdkQsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FkQSxBQWNDLENBZHlCLGFBQUssQ0FBQyxTQUFTLEdBY3hDO0FBRUQ7SUFBNkIsa0NBQWtCO0lBTzNDO2VBRUksaUJBQU87SUFDWCxDQUFDO0lBUkQsZ0NBQU8sR0FBUDtJQUdBLENBQUM7SUFPTSw4QkFBSyxHQUFaO1FBRUksSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFDLEdBQUcsRUFBQyxXQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxFQUFDLEVBQUMsR0FBRyxFQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxHQUFHLEVBQUMsV0FBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9MLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxhQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsSUFBSSxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUNNLCtCQUFNLEdBQWI7SUFHQSxDQUFDO0lBQ00sNEJBQUcsR0FBVjtJQUdBLENBQUM7SUFDTCxxQkFBQztBQUFELENBekJBLEFBeUJDLENBekI0QixhQUFLLENBQUMsWUFBWSxHQXlCOUM7QUFFRDtJQUE4QixtQ0FBb0I7SUFHOUM7ZUFFSSxpQkFBTztJQUNYLENBQUM7SUFDTSwrQkFBSyxHQUFaO1FBRUksSUFBSSxDQUFDLEVBQUUsR0FBRyxhQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBYyxxQkFBVyxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUNNLDZCQUFHLEdBQVY7SUFHQSxDQUFDO0lBQ00sZ0NBQU0sR0FBYjtJQUdBLENBQUM7SUFDTCxzQkFBQztBQUFELENBbkJBLEFBbUJDLENBbkI2QixhQUFLLENBQUMsY0FBYyxHQW1CakQ7Ozs7QUN0R0QsMENBQXNDO0FBQ3RDLDBDQUFzQztBQUV0QywwREFBb0Q7QUFFcEQsaURBQTJDO0FBQzNDLDBDQUFvQztBQUNwQyxpQ0FBMkI7QUFFM0I7SUFBdUMsNkJBQWU7SUFFbEQ7ZUFFSSxpQkFBTztJQUNYLENBQUM7SUFFUywrQkFBVyxHQUFyQjtRQUVJLE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQVhBLEFBV0MsQ0FYc0MsYUFBSyxDQUFDLFNBQVMsR0FXckQ7O0FBSUQ7SUFBMEIsK0JBQWtCO0lBRXhDO2VBRUksaUJBQU87SUFDWCxDQUFDO0lBRU0sMkJBQUssR0FBWjtRQUVJLElBQUksVUFBVSxHQUFHLENBQUMsRUFBQyxHQUFHLEVBQUMseUJBQXlCLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxHQUFHLEVBQUMsNkJBQTZCLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNwSSxJQUFJLENBQUMsY0FBYyxDQUFFLElBQUksYUFBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLElBQUksY0FBYyxFQUFFLENBQUMsQ0FBRSxDQUFDO0lBQzFGLENBQUM7SUFFTSx5QkFBRyxHQUFWO0lBR0EsQ0FBQztJQUVELDZCQUFPLEdBQVA7SUFFQSxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQXJCQSxBQXFCQyxDQXJCeUIsYUFBSyxDQUFDLFlBQVksR0FxQjNDO0FBRUQsUUFBUTtBQUNSO0lBQTZCLGtDQUFvQjtJQVE3QztRQUFBLFlBRUksaUJBQU8sU0FLVjtRQUpHLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDOztJQUMxQixDQUFDO0lBRU8sa0NBQVMsR0FBakI7UUFFSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLGFBQWEsR0FBRztZQUNoQixXQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztZQUMzQixXQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztZQUM5QixXQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztZQUM5QixXQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztZQUMvQixXQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztZQUNoQyxXQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUN4QixXQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUN2QixXQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztZQUNqQyxXQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztZQUM1QixXQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztZQUM3QixXQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztTQUMvQixDQUFDO1FBRU4sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELElBQUksYUFBYSxHQUFHO1lBQ2hCLFdBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQzNCLFdBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQzNCLFdBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7WUFDaEMsV0FBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztZQUNoQyxXQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO1lBQ2hDLFdBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7WUFDaEMsV0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztZQUM3QixXQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1lBQzdCLFdBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7WUFDN0IsV0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUM7WUFDMUIsV0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7WUFDM0IsV0FBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztZQUM1QixXQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDO1lBQ2pDLFdBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7WUFDN0IsV0FBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztZQUM5QixXQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztZQUMzQixXQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1NBQy9CLENBQUE7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBQyxhQUFhLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU8sNkJBQUksR0FBWixVQUFhLEtBQXVCLEVBQUMsS0FBcUI7UUFBN0Msc0JBQUEsRUFBQSxZQUF1QjtRQUFDLHNCQUFBLEVBQUEsWUFBcUI7UUFHdEQsSUFBRyxLQUFLLElBQUUsSUFBSSxFQUNkO1lBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNwRixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxJQUFHLEdBQUcsQ0FBQztTQUMzQjtRQUNELElBQUcsS0FBSyxJQUFFLElBQUksRUFDZDtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEgsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLFlBQVksSUFBRyxHQUFHLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRU8scUNBQVksR0FBcEIsVUFBcUIsS0FBWTtRQUU3QixJQUFHLElBQUksQ0FBQyxXQUFXLEVBQ25CO1lBQ0ksT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRSxLQUFLLEdBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNPLHFDQUFZLEdBQXBCLFVBQXFCLEtBQVk7UUFHN0IsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUNuQjtZQUNJLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxhQUFhLEdBQUUsS0FBSyxHQUFDLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDTyxnQ0FBTyxHQUFmLFVBQWdCLEdBQVU7UUFFdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVTLG1DQUFVLEdBQXBCLFVBQXFCLElBQUk7UUFFckIsSUFBRyxJQUFJLENBQUMsV0FBVyxFQUNuQjtZQUNJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxjQUFnQixNQUFNLENBQUMsSUFBSSxFQUFFLENBQUEsQ0FBQSxDQUFDLENBQUUsQ0FBQztTQUM1RDthQUNEO1lBQ0ksYUFBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsSUFBSSxZQUFFLEVBQUUsQ0FBQztZQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxjQUFLLHVCQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFBLENBQUEsQ0FBQyxDQUFDLENBQUM7U0FDbkU7UUFDRCxPQUFPO0lBQ1gsQ0FBQztJQUVNLDhCQUFLLEdBQVo7UUFFSSxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFZLG1CQUFTLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUN6QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLDRCQUFHLEdBQVY7UUFFSSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSwrQkFBTSxHQUFiO0lBRUEsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0FySUEsQUFxSUMsQ0FySTRCLGFBQUssQ0FBQyxjQUFjLEdBcUloRDs7OztBQ3hMRCxxQ0FBbUM7QUFDbkMsOERBQXdEO0FBR3hELDBDQUFvQztBQUNwQyxvREFBK0M7QUFDL0MsSUFBYyxLQUFLLENBdUxsQjtBQXZMRCxXQUFjLEtBQUs7SUFDZjtRQUE4Qiw0QkFBa0I7UUFFNUM7bUJBQ0ksaUJBQU87UUFDWCxDQUFDO1FBQ0wsZUFBQztJQUFELENBTEEsQUFLQyxDQUw2QixTQUFHLENBQUMsR0FBRyxHQUtwQztJQUxZLGNBQVEsV0FLcEIsQ0FBQTtJQUVELE1BQU07SUFDTjtRQUF3Qyw2QkFBUztRQWlCN0M7WUFBQSxZQUNJLGlCQUFPLFNBRVY7WUFERyxLQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBMEIseUJBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7UUFDL0YsQ0FBQztRQVhELHNCQUFXLCtCQUFRO2lCQUFuQjtnQkFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDM0IsQ0FBQzs7O1dBQUE7UUFDRCxzQkFBVywrQkFBUTtpQkFBbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7OztXQUFBO1FBUU0sMEJBQU0sR0FBYixVQUFjLFFBQXVCO1lBQ2pDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2FBQ3hEO1FBQ0wsQ0FBQztRQUVNLHlCQUFLLEdBQVo7WUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFFTSx1QkFBRyxHQUFWO1lBQ0ksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQzNCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUU7b0JBQzlCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4QyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7aUJBQ3RCO2FBQ0o7WUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLGFBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsQ0FBQztRQUVNLDBCQUFNLEdBQWI7WUFDSSxJQUFJLElBQUksQ0FBQyxVQUFVO2dCQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakMsQ0FBQztRQUVMLGdCQUFDO0lBQUQsQ0FwREEsQUFvREMsQ0FwRHVDLFNBQUcsQ0FBQyxLQUFLLEdBb0RoRDtJQXBEcUIsZUFBUyxZQW9EOUIsQ0FBQTtJQUVEO1FBQTJDLGdDQUF1QjtRQXFCOUQ7WUFBQSxZQUNJLGlCQUFPLFNBS1Y7WUFKRyxLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUN0QixLQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUN4QixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUEwQix5QkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztRQUMvRixDQUFDO1FBbkJELHNCQUFJLGtDQUFRO1lBRFosU0FBUztpQkFDVDtnQkFDSSxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFO29CQUN2QixPQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO2lCQUN0RTtxQkFBTTtvQkFDSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztpQkFDekU7WUFDTCxDQUFDO2lCQUNELFVBQWEsS0FBYTtnQkFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7WUFDaEMsQ0FBQzs7O1dBSEE7UUFJRCxzQkFBSSxxQ0FBVztpQkFBZjtnQkFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUNuRCxDQUFDOzs7V0FBQTtRQVNNLDhCQUFPLEdBQWQ7WUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUVNLGdDQUFTLEdBQWhCO1lBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQy9DLENBQUM7UUFNTSw2QkFBTSxHQUFiO1lBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsRUFBRTtnQkFDeEIsa0RBQWtEO2dCQUNsRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO2FBQzVDO1FBQ0wsQ0FBQztRQUVNLDZCQUFNLEdBQWI7WUFDSSxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxFQUFFO2dCQUN4QixpQkFBTSxNQUFNLFdBQUUsQ0FBQzthQUNsQjtRQUNMLENBQUM7UUFFTSxtQ0FBWSxHQUFuQjtZQUNJLG9EQUFvRDtZQUNwRCxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDO1FBQ0Q7OztXQUdHO1FBQ0kscUNBQWMsR0FBckIsVUFBdUIsWUFBMkI7WUFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQXJFQSxBQXFFQyxDQXJFMEMsU0FBRyxDQUFDLEdBQUcsR0FxRWpEO0lBckVxQixrQkFBWSxlQXFFakMsQ0FBQTtJQUVEO1FBQTZDLGtDQUFTO1FBRWxEO1lBQUEsWUFDSSxpQkFBTyxTQUVWO1lBREcsS0FBSSxDQUFDLFNBQVMsR0FBRyxtQkFBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQTBCLHlCQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7O1FBQy9GLENBQUM7UUFDTCxxQkFBQztJQUFELENBTkEsQUFNQyxDQU40QyxTQUFHLENBQUMsS0FBSyxHQU1yRDtJQU5xQixvQkFBYyxpQkFNbkMsQ0FBQTtJQUVEO1FBQW9DLGtDQUFjO1FBTzlDOzs7OztXQUtHO1FBQ0gsd0JBQVksVUFBaUIsRUFBRSxVQUFpQixFQUFFLFNBQStCO1lBQWpGLFlBQ0ksaUJBQU8sU0FJVjtZQUhHLEtBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO1lBQy9CLEtBQUksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDO1lBQy9CLEtBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDOztRQUNqQyxDQUFDO1FBZEQsc0JBQVcseUNBQWE7aUJBQXhCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLE9BQXVCLENBQUM7WUFDeEMsQ0FBQzs7O1dBQUE7UUFjTSwrQkFBTSxHQUFiO1FBRUEsQ0FBQztRQUVNLDRCQUFHLEdBQVY7UUFFQSxDQUFDO1FBRU0sOEJBQUssR0FBWjtZQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDL0QsSUFBSSxJQUFJLENBQUMsWUFBWTtnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEQsSUFBSSxJQUFJLENBQUMsWUFBWTtnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUVPLHFDQUFZLEdBQXBCO1lBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFTCxxQkFBQztJQUFELENBeENBLEFBd0NDLENBeENtQyxjQUFjLEdBd0NqRDtJQXhDWSxvQkFBYyxpQkF3QzFCLENBQUE7QUFDTCxDQUFDLEVBdkxhLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQXVMbEI7Ozs7QUM3TEQsNkNBQTJDO0FBTTNDLGtEQUE0QztBQUM1QyxpRUFBMkQ7QUFDM0Qsc0RBQWdEO0FBQ2hELDhDQUF3QztBQUN4Qyw0Q0FBMEM7QUFDMUMsc0RBQW9EO0FBQ3BELDRDQUFzQztBQUN0QyxvREFBOEM7QUFDOUMsa0RBQTRDO0FBRTVDLDZDQUF1QztBQUN2QyxpRUFBdUQ7QUFJdkQscURBQW1EO0FBQ25ELG1EQUE4QztBQUk5QyxJQUFJLFFBQVEsR0FBRyxlQUFJLENBQUMsUUFBUSxDQUFDO0FBRTdCLE1BQU07QUFDTjtJQUEyQyxpQ0FBb0I7SUEwRDNEO1FBQUEsWUFDSSxpQkFBTyxTQWtCVjtRQWpCRyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUU1QixLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixLQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNwQixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixLQUFJLENBQUMsY0FBYyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pDLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsYUFBRyxDQUFDLFlBQVksQ0FBQyxFQUFVLENBQUM7UUFDMUMsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7O0lBQzFCLENBQUM7SUFwREQsc0JBQUksdUNBQVk7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxrQ0FBTzthQUFYO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFDRCxVQUFZLEtBQWE7WUFBekIsaUJBSUM7WUFIRyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxjQUFRLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDaEUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsY0FBUSxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7OztPQUxBO0lBTUQsc0JBQUksb0NBQVM7YUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0MsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxvQ0FBUzthQUFiO1lBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvQyxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLHNDQUFXO2FBQWY7WUFDSSxJQUFJLEtBQUssR0FBVyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDeEUsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsdUJBQVMsQ0FBQyxhQUFhLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsbUNBQVE7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMENBQWU7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksbUNBQVE7YUFBWjtZQUNJLE9BQVEsSUFBSSxDQUFDLE9BQXdCLENBQUMsUUFBUSxDQUFDO1FBQ25ELENBQUM7OztPQUFBO0lBdUJELHNDQUFjLEdBQWQsVUFBZSxLQUEwQjtRQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBQ0Qsc0NBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDOUMsQ0FBQztJQUNELCtCQUFPLEdBQVAsVUFBUSxHQUFXO1FBQ2YsSUFBSSxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0QsMENBQWtCLEdBQWxCLFVBQW1CLEdBQVc7UUFDMUIsSUFBSSxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUM7SUFDekIsQ0FBQztJQUNELG9DQUFZLEdBQVosVUFBYSxHQUFXO1FBRXBCLElBQUksQ0FBQyxhQUFhLElBQUksR0FBRyxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDM0MsQ0FBQztJQUVELFFBQVE7SUFDUixpQ0FBUyxHQUFULFVBQVUsUUFBOEI7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDOUIsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDOUUsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUVELGlCQUFpQjtJQUNqQixpQ0FBUyxHQUFULFVBQVUsS0FBYTtRQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO1FBQ2pELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7UUFDaEQsS0FBSyxJQUFJLFNBQVMsR0FBVyxLQUFLLEVBQUUsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFO1lBQ25GLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEQsU0FBUyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDOUIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNsQztJQUNMLENBQUM7SUFFRCxPQUFPO0lBQ1Asa0NBQVUsR0FBVixVQUFXLElBQVU7UUFDakIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQsNkJBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixvREFBb0Q7SUFDeEQsQ0FBQztJQUVELDJCQUFHLEdBQUg7SUFFQSxDQUFDO0lBQ0QsTUFBTTtJQUNOLCtCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELHFDQUFhLEdBQWIsVUFBYyxJQUFZO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFDRCxNQUFNO0lBQ04sZ0NBQVEsR0FBUixVQUFTLE9BQWdCO1FBQ3JCLHlCQUF5QjtRQUN6QixZQUFZO1FBQ1osSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDckMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2QsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMzQjthQUFNO1lBQ0gsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDMUMsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsdUNBQWUsR0FBZixVQUFnQixLQUFhO1FBQ3pCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUM1QixPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDekYsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCx1Q0FBZSxHQUFmLFVBQWdCLEtBQWEsRUFBRSxLQUFVLEVBQUUsUUFBOEI7UUFDckUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQ3BFLE9BQU87U0FDVjtRQUNELElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkQsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUU7WUFDbEQsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5QjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCx5Q0FBaUIsR0FBakIsVUFBa0IsUUFBOEI7UUFDNUMsSUFBSSxPQUFPLEdBQVMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RSxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsa0JBQWtCO0lBQ1gsNkJBQUssR0FBWjtRQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxvQkFBVSxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN2RSxhQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksVUFBVSxHQUFHLHVCQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUNwRCxLQUFLLElBQUksT0FBTyxHQUFXLFVBQVUsR0FBRyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRTtZQUNoRSxJQUFJLFlBQVksR0FBRyxJQUFJLG1CQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELGFBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFlBQVksQ0FBQztTQUMzQztRQUNELE1BQU07UUFFTixNQUFNO1FBQ04sSUFBSSxNQUFNLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxTQUFTLEdBQUcscUJBQVMsQ0FBQyxLQUFLLENBQUM7UUFDaEMsSUFBSSxXQUFXLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuQyxhQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlDLFVBQVU7UUFDVixhQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyx5QkFBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELG9CQUFvQjtJQUNWLGlDQUFTLEdBQW5CO1FBQ0ksYUFBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUMzRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BELE1BQU07UUFDTixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksZUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7UUFDaEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztRQUNqRCxJQUFJLEtBQUssR0FBZ0IsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QyxTQUFTO1FBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGFBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLEtBQUssSUFBSSxHQUFHLEdBQVcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFO1lBQ2pELElBQUksSUFBSSxHQUFjLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNQLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNqQztnQkFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO2dCQUN6QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQzNEO1lBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1QjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsdUJBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLElBQUksRUFBRSx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hMLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN4QyxDQUFDO0lBRU0sOEJBQU0sR0FBYjtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUdELFlBQVk7SUFDSixzQ0FBYyxHQUF0QjtRQUNJLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLHFDQUFxQztRQUM1RSxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRXBCLElBQUksVUFBVSxHQUFpQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUV2RCxJQUFJLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFO1lBQ3RGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNyQjtRQUNELElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxjQUFjO0lBQ04sbUNBQVcsR0FBbkI7UUFDSSxJQUFJLElBQUksR0FBVyxFQUFFLENBQUE7UUFDckIsSUFBSSxTQUFTLEdBQVcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3hELElBQUksU0FBUyxHQUFHLENBQUM7WUFDYixJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7YUFDcEM7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsT0FBTztJQUNHLGtDQUFVLEdBQXBCO1FBQ0ksSUFBSSxPQUFPLEdBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUN2RSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUN2RSxJQUFJLFNBQVMsR0FBVyxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUzQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ08sc0NBQWMsR0FBeEIsVUFBeUIsS0FBYTtRQUNsQyxJQUFJLE9BQU8sR0FBc0MsRUFBRSxDQUFDO1FBQ3BELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsWUFBWTtRQUNaLElBQUksU0FBUyxDQUFDLFdBQVc7WUFDckIsT0FBTztRQUNYLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQzdCOzs7O2VBSU87UUFDUDtZQUNJLGVBQWU7WUFDZixPQUFPLEdBQUcsRUFBRSxDQUFBO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0M7UUFDRCxTQUFTO1FBQ1QsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRTtZQUMzQyxPQUFPO1NBQ1Y7UUFDRCxZQUFZO1FBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUV6QixZQUFZO1FBQ1osSUFBSSxXQUFXLEdBQStCLEVBQUUsQ0FBQztRQUNqRCxLQUFLLElBQUksTUFBTSxJQUFJLE9BQU8sRUFBRTtZQUN4QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFNBQVMsRUFBRTtnQkFDbkMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QjtTQUNKO1FBQ0QsZ0JBQWdCO1FBQ2hCLElBQUksUUFBUSxHQUFjLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEQsSUFBSSxVQUFVLEdBQWdCLElBQUksS0FBSyxFQUFFLENBQUM7UUFDMUMsYUFBYTtRQUNiLElBQUksWUFBWSxHQUFnQixJQUFJLEtBQUssRUFBUSxDQUFDO1FBQ2xELEtBQUssSUFBSSxPQUFPLEdBQVcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFO1lBQ3JFLElBQUksT0FBTyxHQUFTLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksU0FBUyxFQUFFO2dCQUNuQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzVCO2lCQUFNO2dCQUNILFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDOUI7U0FDSjtRQUNELEtBQUs7UUFDTCxJQUFJLFlBQVksR0FBd0IsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM3RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV0RCxNQUFNO1FBQ04sS0FBSyxJQUFJLFdBQVcsR0FBVyxDQUFDLEVBQUUsV0FBVyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUU7WUFDaEYsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUNELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM5QyxXQUFXO1FBQ1gsa0NBQWtDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILHdDQUFnQixHQUFoQixVQUFpQixRQUE2QixFQUFFLFVBQXVCLEVBQUUsVUFBMEI7UUFBMUIsMkJBQUEsRUFBQSxpQkFBMEI7UUFDL0YsS0FBSyxJQUFJLE9BQU8sR0FBVyxDQUFDLEVBQUUsT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxPQUFPLEVBQUU7WUFDaEUsSUFBSSxJQUFJLEdBQWlCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQyxLQUFLLElBQUksYUFBYSxHQUFXLENBQUMsRUFBRSxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRztnQkFDOUQsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDdkIsTUFBTTtpQkFDVDtnQkFDRCxZQUFZO2dCQUNaLElBQUksU0FBUyxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDdEUsSUFBSSxJQUFJLEdBQVMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QyxVQUFVLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLElBQUksVUFBVSxJQUFJLElBQUk7b0JBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2dCQUNqQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDakI7WUFDRCxJQUFJLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUN2QixNQUFNO2FBQ1Q7U0FDSjtRQUNELElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtZQUNiLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQy9CO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILHNDQUFjLEdBQWQsVUFBZSxRQUFnQjtRQUMzQixLQUFLLElBQUksVUFBVSxHQUFXLElBQUksQ0FBQyxXQUFXLEVBQUUsVUFBVSxJQUFJLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRTtZQUNsRixJQUFJLEtBQUssR0FBYyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELElBQUksS0FBSyxJQUFJLElBQUk7Z0JBQ2IsT0FBTztZQUNYLEtBQUssSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFO2dCQUMxRCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNsQyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQzthQUN6QjtTQUNKO1FBQ0QsSUFBSSxLQUFLLEdBQWMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDOUQsS0FBSyxJQUFJLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUU7WUFDMUQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQzVDO1NBQ0o7UUFDRCxJQUFJLFdBQVcsR0FBYyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVELGVBQWU7UUFDZixJQUFJLFVBQVUsR0FBc0MsRUFBRSxDQUFBO1FBQ3RELElBQUksSUFBSSxHQUFXLEdBQUcsQ0FBQTtRQUN0QixLQUFLLElBQUksT0FBTyxHQUFXLENBQUMsRUFBRSxPQUFPLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRTtZQUN4RSxJQUFJLFVBQVUsR0FBUyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELElBQUksVUFBVSxDQUFDLElBQUksSUFBSSxTQUFTLEVBQUU7Z0JBQzlCLElBQUksSUFBSSxHQUFXLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO2dCQUMxQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUU7b0JBQy9CLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO2lCQUNsQztnQkFFRCxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ2xDO1NBQ0o7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBQ0Q7Ozs7O09BS0c7SUFDSCxrQ0FBVSxHQUFWLFVBQVcsSUFBVSxFQUFFLElBQVMsRUFBRSxjQUFzQjtRQUNwRCxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQ2YsT0FBTyxLQUFLLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxjQUFjLEVBQUU7WUFDdkMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLFNBQVMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7YUFDbkI7WUFDRCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsSUFBSSxRQUFpQixDQUFDO1FBQ3RCLElBQUksU0FBa0IsQ0FBQztRQUN2QixJQUFJLFVBQVUsR0FBUyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7WUFDOUMsSUFBSSxVQUFVLENBQUMsSUFBSSxJQUFJLFNBQVM7Z0JBQzVCLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7O2dCQUU3RCxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBQ0QsSUFBSSxXQUFXLEdBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QyxJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFO1lBQ2hELElBQUksV0FBVyxDQUFDLElBQUksSUFBSSxTQUFTO2dCQUM3QixTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDOztnQkFFL0QsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUNELElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7U0FDbkI7UUFDRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILDJDQUFtQixHQUFuQixVQUFvQixRQUFnQjtRQUNoQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUNwQyxPQUFPO1NBQ1Y7UUFDRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25ELEtBQUssSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLEVBQUUsT0FBTyxFQUFFO1lBQzFELElBQUksSUFBSSxHQUFTLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2xCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzlCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQ2hDLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtvQkFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7d0JBQ3RCLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQztxQkFDdEI7aUJBQ0o7Z0JBQ0QsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFO29CQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRTt3QkFDdkIsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDO3FCQUN2QjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxLQUFLLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsRUFBRSxFQUFFLFdBQVcsRUFBRTtZQUMxRSxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQTtnQkFDdEIscUJBQXFCO2FBQ3hCO1NBQ0o7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsc0NBQWMsR0FBZCxVQUFlLEtBQWE7UUFDeEIsSUFBSSxZQUFZLEdBQWtCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZELElBQUksT0FBTyxHQUFXLENBQUMsQ0FBQztRQUN4QixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM5QjtZQUNELEtBQUssSUFBSSxRQUFRLEdBQVcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxFQUFFO2dCQUN6RSxJQUFJLElBQUksR0FBUyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLFNBQVMsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNyQyxJQUFJLFVBQVUsR0FBUyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUN2QyxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO29CQUM1QyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMvQjtxQkFBTSxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFO29CQUNyRCxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2lCQUMvQjtxQkFDSTtvQkFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztpQkFDMUI7YUFFSjtTQUNKO1FBRUQsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUU7WUFDL0IsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELFFBQVEsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQzVCLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQztRQUVELE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxzQ0FBYyxHQUFkLFVBQWUsU0FBb0I7UUFDL0IsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNaLE9BQU87U0FDVjtRQUNELEtBQUssSUFBSSxRQUFRLEdBQVcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxFQUFFO1lBQ3pFLElBQUksSUFBSSxHQUFTLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gscUNBQWEsR0FBYixVQUFjLEtBQWE7UUFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxJQUFJLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5RCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxHQUFHLEtBQUssSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hFLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUVwRTthQUNJO1lBQ0QsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztJQUNEOzs7T0FHRztJQUNILG9DQUFZLEdBQVosVUFBYSxLQUFhO1FBQ3RCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0IsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUM1QixPQUFPO1NBQ1Y7UUFDRCxLQUFLLElBQUksVUFBVSxHQUFXLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBVSxJQUFJLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBRTtZQUNqRixJQUFJLFdBQVcsR0FBYyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzlELFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVPLHdDQUFnQixHQUF4QjtRQUNJLGFBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLHlCQUFTLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hGLElBQUksRUFBRSxHQUFjLGFBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFZLG1CQUFTLENBQUMsQ0FBQztRQUM3RCxxQkFBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLHFCQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFDTCxvQkFBQztBQUFELENBaG5CQSxBQWduQkMsQ0FobkIwQyxhQUFLLENBQUMsY0FBYyxHQWduQjlEOzs7OztBQzdvQkQsSUFBYyxJQUFJLENBd0NqQjtBQXhDRCxXQUFjLElBQUk7SUFDSCxhQUFRLEdBQVksSUFBSSxDQUFDO0lBQ3pCLFlBQU8sR0FBVyxNQUFNLENBQUM7SUFDekIsbUJBQWMsR0FBVyxZQUFZLENBQUM7SUFDdEMsaUJBQVksR0FBVyxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLG9EQUFvRCxDQUFDO0lBQ2hILFdBQU0sR0FBVyxLQUFBLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDdEMsY0FBUyxHQUFXLEtBQUEsWUFBWSxHQUFHLEtBQUssQ0FBQTtJQUN4QyxlQUFVLEdBQVcsS0FBQSxZQUFZLEdBQUcsU0FBUyxDQUFBO0lBRXhEOzs7T0FHRztJQUNILG9CQUEyQixRQUFnQjtRQUN2QyxPQUFPLEtBQUEsTUFBTSxHQUFHLFFBQVEsR0FBRyxRQUFRLEdBQUcsS0FBQSxPQUFPLENBQUM7SUFDbEQsQ0FBQztJQUZlLGVBQVUsYUFFekIsQ0FBQTtJQUVEOzs7T0FHRztJQUNILHVCQUE4QixRQUFnQjtRQUMxQyxPQUFPLEtBQUEsTUFBTSxHQUFHLFFBQVEsR0FBRyxPQUFPLEdBQUcsS0FBQSxPQUFPLENBQUM7SUFDakQsQ0FBQztJQUZlLGtCQUFhLGdCQUU1QixDQUFBO0lBRUQ7OztPQUdHO0lBQ0gsZUFBc0IsUUFBZ0I7UUFDbEMsT0FBTyxLQUFBLFNBQVMsR0FBRyxLQUFBLGNBQWMsR0FBRyxRQUFRLEdBQUcsZ0JBQWdCLEdBQUcsUUFBUSxHQUFHLEtBQUssR0FBRyxLQUFBLE9BQU8sQ0FBQztJQUNqRyxDQUFDO0lBRmUsVUFBSyxRQUVwQixDQUFBO0lBRUQ7OztPQUdHO0lBQ0gscUJBQTRCLFFBQWdCO1FBQ3hDLE9BQU8sS0FBQSxVQUFVLEdBQUcsUUFBUSxHQUFHLE9BQU8sR0FBRyxLQUFBLE9BQU8sQ0FBQztJQUNyRCxDQUFDO0lBRmUsZ0JBQVcsY0FFMUIsQ0FBQTtBQUNMLENBQUMsRUF4Q2EsSUFBSSxHQUFKLFlBQUksS0FBSixZQUFJLFFBd0NqQjs7OztBQ3hDRCxJQUFjLE1BQU0sQ0FnQm5CO0FBaEJELFdBQWMsTUFBTTtJQUNoQixPQUFPO0lBQ1AsdUJBQThCLEtBQWE7UUFDdkMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLE9BQU87U0FDVjtRQUNELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ2xDLElBQUksS0FBSyxHQUFXLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDdkMsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQVBlLG9CQUFhLGdCQU81QixDQUFBO0lBQ0QsZUFBc0IsSUFBaUIsRUFBRSxLQUFhO1FBQ2xELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUM1QyxDQUFDO0lBTGUsWUFBSyxRQUtwQixDQUFBO0FBQ0wsQ0FBQyxFQWhCYSxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFnQm5COzs7O0FDaEJELDhEQUF3RDtBQUN4RCxzREFBZ0Q7QUFDaEQsNERBQWtEO0FBQ2xELHNEQUF5QztBQUN6QywwREFBb0Q7QUFDcEQsc0RBQWlEO0FBRWpEO0lBQUE7SUEwQ0EsQ0FBQztJQXBDRyxzQkFBVyxnQkFBUzthQUFwQjtZQUVJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLHFCQUFjO2FBQXpCO1lBQ0ksT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsZ0JBQVM7YUFBcEI7WUFDSSxJQUFJLEdBQUcsQ0FBQyxXQUFXLElBQUksSUFBSSxFQUFHO2dCQUMxQixHQUFHLENBQUMsV0FBVyxHQUFHLG1CQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBWSxtQkFBUyxDQUFDLENBQUM7YUFDNUQ7WUFDRCxPQUFPLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDM0IsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVyxtQkFBWTthQUF2QjtZQUNJLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUc7Z0JBQ3pCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsbUJBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFXLHNCQUFRLENBQUMsQ0FBQzthQUN6RDtZQUNELE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLGtCQUFXO2FBQXRCO1lBRUksSUFBSSxHQUFHLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRztnQkFDeEIsR0FBRyxDQUFDLFNBQVMsR0FBRyxtQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQWMscUJBQVcsQ0FBQyxDQUFDO2FBQzlEO1lBQ0QsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQ3pCLENBQUM7OztPQUFBO0lBQ2EsUUFBSSxHQUFsQjtRQUVJLEdBQUcsQ0FBQyxXQUFXLEdBQUcsbUJBQVMsQ0FBQyxFQUFFLENBQUM7UUFDL0IsSUFBSSxFQUFFLEdBQWMsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUNwQyxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQTBCLHlCQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDaEYsR0FBRyxDQUFDLFVBQVUsR0FBSSxFQUFFLENBQUMsVUFBVSxDQUFXLHNCQUFRLENBQUMsQ0FBQztRQUNwRCxHQUFHLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQWMscUJBQVcsQ0FBQyxDQUFDO1FBQ3hELEdBQUcsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBWSxtQkFBUyxDQUFDLENBQUM7SUFFMUQsQ0FBQztJQUNMLFVBQUM7QUFBRCxDQTFDQSxBQTBDQyxJQUFBOzs7OztBQ2pERCxzRUFBZ0U7QUFDaEUsNERBQXNEO0FBQ3REO0lBQUE7SUFVQSxDQUFDO0lBUkcsc0JBQWtCLHVCQUFZO2FBQTlCO1lBRUksT0FBTywwQkFBZ0IsQ0FBQyxHQUFHLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBa0Isa0JBQU87YUFBekI7WUFFSSxPQUFPLHFCQUFXLENBQUMsR0FBRyxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBQ0wsY0FBQztBQUFELENBVkEsQUFVQyxJQUFBOzs7OztBQ1hELG1EQUErQztBQUMvQyxnRUFBNkQ7QUFDN0QsaURBQTJDO0FBQzNDLG1EQUE2QztBQUM3QyxrREFBNEM7QUFFNUMsNkJBQXVCO0FBQ3ZCLGdFQUEyRDtBQUczRDtJQUFBO0lBTUEsQ0FBQztJQUpHLHNCQUFXLDBCQUFhO2FBQXhCO1lBRUksT0FBUSxhQUFhLENBQUMsR0FBRyxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBQ0wsZ0JBQUM7QUFBRCxDQU5BLEFBTUMsSUFBQTs7QUFFRDtJQUVJO0lBQ0EsQ0FBQztJQUVELHNCQUFXLG9CQUFHO2FBQWQ7WUFDSSxJQUFJLGFBQWEsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUM1QixhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7YUFDNUM7WUFDRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFRRCxzQkFBSSxzQ0FBVztRQUZmLE1BQU07UUFDTixTQUFTO2FBQ1Q7WUFFSSxJQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDckI7Z0JBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDO2FBQzNCO1lBQ0QsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQUkscUNBQVU7UUFEZCxNQUFNO2FBQ047WUFFSSxJQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFDcEI7Z0JBQ0ksSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7YUFDekI7WUFDRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDNUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxQ0FBVTtRQURkLE1BQU07YUFDTjtZQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUNwQjtnQkFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUMzQjtZQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFZO1FBRGhCLFNBQVM7YUFDVDtZQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUN0QjtnQkFDSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMzRTtZQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHlDQUFjO1FBRGxCLFFBQVE7YUFDUjtZQUNJLElBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUN4QjtnQkFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7YUFDdkM7WUFDRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFFRCxtQ0FBVyxHQUFYLFVBQVksRUFBVTtRQUNsQixJQUFJLFVBQVUsR0FBb0IsMEJBQW1CLENBQUMsVUFBVSxDQUFDO1FBQ2pFLElBQUksYUFBYSxHQUFpQixVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzNELElBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEVBQ3JCO1lBQ0ksSUFBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEVBQy9CO2dCQUNJLE9BQU87YUFDVjtTQUNKO1FBQ0QsVUFBVSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsUUFBUTtJQUNSLG9DQUFZLEdBQVo7UUFDSSxJQUFJLEtBQUssR0FBRyxhQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBYSxvQkFBVSxDQUFDLENBQUMsQ0FBQSxrQkFBa0I7SUFDN0UsQ0FBQztJQUVELFFBQVE7SUFDRCwwQ0FBa0IsR0FBekI7UUFDSSxJQUFJLFNBQVMsR0FBRyxhQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBYyxxQkFBVyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUdELHNCQUFJLGtDQUFPO2FBQVg7WUFDSSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO2dCQUN2QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksdUJBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUM1QztZQUNELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDO2FBRUQsVUFBWSxLQUF5QjtZQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDOzs7T0FKQTtJQU1ELFFBQVE7SUFDUixtQ0FBVyxHQUFYLFVBQVksSUFBd0I7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVELFFBQVE7SUFDUixrQ0FBVSxHQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxpQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFDRCxzQkFBSSxrQ0FBTzthQUFYO1lBQ0ksT0FBTyxhQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxRQUF3QixDQUFDO1FBQzlELENBQUM7OztPQUFBO0lBQ0QsYUFBYTtJQUNiLGtDQUFVLEdBQVY7UUFDSSxJQUFJLFlBQVksR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztRQUNuQyxhQUFHLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsWUFBWTtJQUNaLHFDQUFhLEdBQWIsVUFBYyxJQUFjO1FBQ3hCLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELCtCQUFPLEdBQVAsVUFBUSxFQUFTO1FBRWIsMEJBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQWpJQSxBQWlJQyxJQUFBOzs7O0FDcEpELDhEQUF3RDtBQUN4RDtJQUF5QywrQkFBUTtJQTZDN0M7ZUFDSSxpQkFBTztJQUNYLENBQUM7SUFyQ0Qsc0JBQUksNEJBQUc7YUFBUDtZQUNJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQWdCLENBQUM7YUFDakQ7WUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVyxnQ0FBTzthQUFsQixVQUFtQixFQUFVO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsNEJBQUc7YUFBZDtZQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLCtCQUFNO2FBQWpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsaUNBQVE7YUFBbkIsVUFBb0IsR0FBVTtZQUUxQixJQUFHLENBQUMsR0FBRztnQkFDSCxPQUFPO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLCtCQUFNO2FBR2pCO1lBQ0ksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztRQUN6QixDQUFDO2FBTEQsVUFBa0IsS0FBYztZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFDMUIsQ0FBQzs7O09BQUE7SUFJRCxzQkFBVyw0QkFBRzthQUFkLFVBQWUsR0FBVztZQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsOEJBQUs7YUFBaEIsVUFBaUIsR0FBVztZQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztRQUNuQyxDQUFDOzs7T0FBQTtJQUtELDBCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFlLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFlLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFHO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztJQUVNLCtCQUFTLEdBQWhCO1FBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWTtZQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVNLDZCQUFPLEdBQWQ7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSwrQkFBUyxHQUFoQixVQUFpQixLQUFVLEVBQUUsUUFBOEI7UUFDdkQsSUFBSSxXQUFXLEdBQUcsSUFBSSx5QkFBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUVNLGtDQUFZLEdBQW5CLFVBQW9CLEtBQVUsRUFBRSxRQUE4QjtRQUMxRCxJQUFJLFdBQVcsR0FBRyxJQUFJLHlCQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUNwQyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQS9FQSxBQStFQyxDQS9Fd0MsSUFBSSxDQUFDLEdBQUcsR0ErRWhEOzs7OztBQ2hGRCw4REFBd0Q7QUFDeEQsMENBQW9DO0FBRXBDO0lBQXlDLCtCQUFVO0lBMEMvQztlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQXRDRCxzQkFBSSw0QkFBRzthQUFQO1lBQUEsaUJBU0M7WUFSRyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNuQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFnQixDQUFDO2dCQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7b0JBQ2pDLHVCQUFhLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQzVELGFBQUcsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxDQUFBO2FBQ0w7WUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFFRCwyQkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDWixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDZDtJQUNMLENBQUM7SUFFTSw2QkFBTyxHQUFkLFVBQWUsTUFBYztRQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7SUFDNUIsQ0FBQztJQUVNLHNDQUFnQixHQUF2QixVQUF3QixhQUFzQjtRQUUxQyxJQUFJLEVBQUUsR0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxhQUFhLENBQUMsQ0FBQyxDQUFBLHFDQUFxQztJQUMzRixDQUFDO0lBRUQsc0JBQVcsb0NBQVc7YUFBdEIsVUFBdUIsRUFBUztZQUU1QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUNELDBCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFlLENBQUM7SUFDakQsQ0FBQztJQUtMLGtCQUFDO0FBQUQsQ0E3Q0EsQUE2Q0MsQ0E3Q3dDLElBQUksQ0FBQyxLQUFLLEdBNkNsRDs7Ozs7QUNoREQsMENBQXNDO0FBQ3RDLHlDQUE4QjtBQUM5QiwrQ0FBMEM7QUFFMUM7SUFBa0Msd0JBQU87SUFZckM7UUFBQSxZQUNJLGlCQUFPLFNBOEJWO1FBNUJHLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFFO1FBQzdCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsSUFBSSxDQUFDLENBQUM7UUFFN0MsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLG1CQUFRLENBQUMsU0FBUyxFQUFlLENBQUM7UUFDckQsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLG1CQUFRLENBQUMsU0FBUyxFQUFlLENBQUM7UUFDeEQsZ0NBQWdDO1FBQ2pDLEtBQUksSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFDLFFBQVEsR0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUNoRDtZQUNJLElBQUksS0FBSyxHQUFjLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hDLEtBQUssQ0FBQyxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUNuRCxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNuQixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksR0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDO1lBQzlCLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDNUI7UUFDRCxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDN0IsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUMvQyxLQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQy9DLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ25CLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckIsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUE7UUFDdEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUE7O1FBQ3ZCLHFDQUFxQztJQUN6QyxDQUFDO0lBekNELDZCQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUF3Q0Q7Ozs7Ozs7Ozs7T0FVRztJQUNILFdBQVc7SUFDWCw2QkFBYyxHQUFkLFVBQWdCLE1BQWE7UUFFekIsT0FBTyxNQUFNLEdBQUMsQ0FBQyxHQUFHLENBQUM7SUFDdkIsQ0FBQztJQUNELHFCQUFNLEdBQU4sVUFBTyxTQUFnQjtRQUVuQixJQUFJLFNBQVMsR0FBbUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNqRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEIsSUFBSSxLQUFLLEdBQVUsQ0FBQyxDQUFDO1FBQ3JCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQzlCLE9BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUMxQjtZQUNJLElBQUksSUFBSSxHQUE4QixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzdELElBQUksTUFBTSxHQUFlLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsTUFBTSxHQUFHLFNBQVMsR0FBRyxNQUFNLEdBQUcsTUFBTSxHQUFDLElBQUksQ0FBQztZQUM3RCxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLElBQUcsTUFBTSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDN0I7Z0JBQ0ksTUFBTSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7YUFDN0M7WUFDRCxFQUFFLEtBQUssQ0FBQztTQUNYO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFDRCx1QkFBUSxHQUFSLFVBQVMsTUFBYTtRQUVsQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztJQUNoRCxDQUFDO0lBQ0QseUJBQVUsR0FBVixVQUFZLE1BQWE7UUFFckIsdUNBQXVDO1FBQ3ZDLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEIsOEJBQThCO0lBRWxDLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0E5RkEsQUE4RkMsQ0E5RmlDLGNBQUUsQ0FBQyxJQUFJLEdBOEZ4Qzs7Ozs7QUNsR0Qsc0RBQWdEO0FBQ2hELHNEQUF5QztBQUN6QywrQ0FBMkM7QUFJM0MsTUFBTTtBQUNOO0lBQTZDLDBCQUFRO0lBV2pELGdCQUFZLElBQVc7UUFBdkIsWUFFSSxpQkFBTyxTQVVWO1FBVEcsS0FBSSxDQUFDLE9BQU8sR0FBRyxtQkFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7UUFDdkMsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxtQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQVksbUJBQVMsQ0FBQyxDQUFDO1FBQ3pELEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLEtBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLEtBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLEtBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDOztJQUNYLENBQUM7SUFDRCxxQkFBSSxHQUFKO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELHFCQUFJLEdBQUo7SUFFQSxDQUFDO0lBRUQsc0JBQUssR0FBTDtJQUVBLENBQUM7SUFFRCx1QkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCx3QkFBTyxHQUFQO1FBRUksdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsd0JBQU8sR0FBUDtRQUVJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsc0JBQUksMEJBQU07YUFBVjtZQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDJCQUFPO2FBQVg7WUFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3QkFBSTthQUFSO1lBRUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMkJBQU87YUFBWDtZQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVEOzs7T0FHRztJQUNJLHNCQUFLLEdBQVosVUFBYSxFQUFZO1FBRXJCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUNNLHlCQUFRLEdBQWY7UUFFSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUN2QixDQUFDO0lBRUQsc0JBQVcseUJBQUs7YUFBaEI7WUFFSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQzs7O09BQUE7SUFFTSwyQkFBVSxHQUFqQjtRQUVJLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFDRCx5QkFBUSxHQUFSO1FBRUksSUFBRyxJQUFJLENBQUMsTUFBTSxFQUNkO1lBQ0ksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1NBQ3BCO0lBQ0wsQ0FBQztJQUVMLGFBQUM7QUFBRCxDQXhHQSxBQXdHQyxDQXhHNEMsSUFBSSxDQUFDLEdBQUcsR0F3R3BEOzs7OztBQzlHRCx5Q0FBZ0M7QUFDaEMsbUNBQTZCO0FBQzdCLDBDQUF3QztBQUN4Qyw4REFBd0Q7QUFDeEQsMENBQW9DO0FBSXBDLGdFQUEwRDtBQUUxRCx3REFBZ0Q7QUFDaEQsZ0RBQTJDO0FBRTNDO0lBQWlDLHNDQUFjO0lBSzNDO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBTkQsMkNBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUtMLHlCQUFDO0FBQUQsQ0FSQSxBQVFDLENBUmdDLGNBQUUsQ0FBQyxXQUFXLEdBUTlDO0FBRUQ7SUFBeUMsK0JBQU07SUFhM0MscUJBQVksSUFBWTtRQUF4QixZQUNJLGtCQUFNLElBQUksQ0FBQyxTQVFkO1FBUEcsS0FBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDcEMsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsS0FBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsS0FBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JELEtBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7SUFDekIsQ0FBQztJQWxCTyxvQ0FBYyxHQUF0QixVQUF1QixJQUFjLEVBQUUsS0FBYTtRQUFwRCxpQkFPQztRQU5HLElBQUksV0FBVyxHQUFnQixJQUFtQixDQUFDO1FBQ25ELFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQixJQUFJLGFBQWEsR0FBa0IsMEJBQWdCLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUM3RSxXQUFXLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDdkQsV0FBVyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDaEMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLGNBQVEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFZTSxnQkFBSSxHQUFYO1FBQ0ksT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUVELHNDQUFnQixHQUFoQjtRQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVELDZCQUFPLEdBQVA7UUFDSSxJQUFJLFNBQVMsR0FBZSxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2pELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsQ0FBQSxrQkFBa0I7UUFDakUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUE7SUFDakQsQ0FBQztJQUVELDRCQUFNLEdBQU47SUFFQSxDQUFDO0lBQ0QsMEJBQUksR0FBSjtRQUNJLGFBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLHFCQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekYsYUFBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEYsYUFBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRUQsMkJBQUssR0FBTDtRQUNJLGFBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLHFCQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUYsYUFBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkYsYUFBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsSUFBSTtJQUNJLGdDQUFVLEdBQWxCLFVBQW1CLEVBQVU7UUFDekIsSUFBSSxFQUFFLElBQUksMEJBQWdCLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRztZQUNoRCxhQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQixPQUFPO1NBQ1Y7UUFDRCx1QkFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVPLG1DQUFhLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUc7WUFDaEIsT0FBTztTQUNWO1FBQ0QsYUFBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVPLGtDQUFZLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUc7WUFDaEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUVPLG1DQUFhLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUc7WUFDaEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsMEJBQWdCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFDTCxrQkFBQztBQUFELENBckZBLEFBcUZDLENBckZ3QyxnQkFBTSxHQXFGOUM7Ozs7O0FDN0dELHlDQUE4QjtBQUM5QixtQ0FBNkI7QUFFN0IsMENBQXNDO0FBQ3RDLHdEQUFtRDtBQUVuRCw4REFBb0Q7QUFFcEQ7SUFBOEIsbUNBQVk7SUFNdEM7UUFBQSxZQUVJLGlCQUFPLFNBT1Y7UUFORywwQkFBMEI7UUFDMUIsaUNBQWlDO1FBQ2pDLGlDQUFpQztRQUNqQyxLQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyx1QkFBYSxDQUFDLEdBQUcsRUFBQyx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRixLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyx1QkFBUyxDQUFDLGFBQWEsRUFBQyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvRixLQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyx1QkFBUyxDQUFDLGFBQWEsRUFBQyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDbEcsQ0FBQztJQWJELHdDQUFjLEdBQWQ7UUFFSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFXTCxzQkFBQztBQUFELENBaEJBLEFBZ0JDLENBaEI2QixjQUFFLENBQUMsU0FBUyxHQWdCekM7QUFFRDtJQUF1Qyw2QkFBTTtJQU96QyxtQkFBWSxJQUFXO1FBQXZCLFlBRUksa0JBQU0sSUFBSSxDQUFDLFNBSWQ7UUFIRyxLQUFJLENBQUMsRUFBRSxHQUFFLElBQUksZUFBZSxFQUFFLENBQUM7UUFDL0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7O1FBQ3BCLDJHQUEyRztJQUMvRyxDQUFDO0lBWE0sY0FBSSxHQUFYO1FBRUksT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQVNELDBCQUFNLEdBQU47SUFHQSxDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQWxCQSxBQWtCQyxDQWxCc0MsZ0JBQU0sR0FrQjVDOzs7OztBQzVDRCx5Q0FBZ0M7QUFDaEMsMENBQXdDO0FBQ3hDLG1DQUE2QjtBQUk3Qiw4REFBd0Q7QUFDeEQsa0RBQWdEO0FBRWhEO0lBQWdDLHFDQUFVO0lBS3RDO1FBQUEsWUFDSSxpQkFBTyxTQU9WO1FBTkcsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUMvQixLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDL0IsS0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsdUJBQWEsQ0FBQyxhQUFhLEVBQUUsdUJBQWEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNsSCxLQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSx1QkFBYSxDQUFDLGFBQWEsRUFBRSx1QkFBYSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzRyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSx1QkFBYSxDQUFDLGFBQWEsRUFBRSx1QkFBYSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDekcsQ0FBQztJQVhELDBDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFVTCx3QkFBQztBQUFELENBZEEsQUFjQyxDQWQrQixjQUFFLENBQUMsT0FBTyxHQWN6QztBQUVEO0lBQXlDLCtCQUFNO0lBTTNDLHFCQUFZLElBQVk7UUFBeEIsWUFDSSxrQkFBTSxJQUFJLENBQUMsU0FPZDtRQU5HLEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ25DLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksS0FBSyxHQUFjLEtBQUksQ0FBQyxVQUFVLENBQUM7UUFDdkMsS0FBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDckIsa0dBQWtHO1FBQ2xHLEtBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O0lBQ25DLENBQUM7SUFiTSxnQkFBSSxHQUFYO1FBQ0ksT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQWFPLGtDQUFZLEdBQXBCO1FBQ0ksSUFBSSxXQUFXLEdBQUcscUJBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO1FBQzlDLElBQUksUUFBUSxHQUFHLHFCQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN4QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDekMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1QixLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFO1lBQ25DLElBQUksR0FBRyxHQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQWUsQ0FBQztZQUM3RCxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNkLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUM3QyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNoQixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO1FBQ0QsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVNLDBCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELDRCQUFNLEdBQU47SUFFQSxDQUFDO0lBRUQsSUFBSTtJQUNKLDhCQUFRLEdBQVIsVUFBUyxJQUFXO1FBQ2hCLElBQUksTUFBTSxHQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxHQUFHLEdBQVcsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUM3QixxQkFBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBZTtZQUNwQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztJQUN0QyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQWpEQSxBQWlEQyxDQWpEd0MsZ0JBQU0sR0FpRDlDOzs7OztBQzFFRDs7R0FFRztBQUNILHlDQUE4QjtBQUM5QixtQ0FBNkI7QUFFN0IsMENBQXNDO0FBRXRDLDJDQUFxQztBQUNyQyw4REFBd0Q7QUFDeEQ7SUFBNEIsaUNBQVM7SUFVakM7ZUFFSSxpQkFBTztJQUNYLENBQUM7SUFYRCxzQ0FBYyxHQUFkO1FBRUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBQ0Qsb0NBQVksR0FBWixVQUFhLElBQWU7UUFBZixxQkFBQSxFQUFBLFNBQWU7UUFFeEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEdBQUUsSUFBSSxDQUFDO0lBQy9CLENBQUM7SUFLTCxvQkFBQztBQUFELENBZEEsQUFjQyxDQWQyQixjQUFFLENBQUMsTUFBTSxHQWNwQztBQUNEO0lBQW9DLDBCQUFNO0lBTXRDLGdCQUFZLElBQVc7UUFBdkIsWUFFSSxrQkFBTSxJQUFJLENBQUMsU0FzQmQ7UUFyQkcsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsS0FBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDO1FBQy9CLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLCtCQUErQjtRQUMvQiwyQ0FBMkM7UUFDM0MsaUNBQWlDO1FBQ2pDLDJDQUEyQztRQUMzQyxJQUFJLFNBQVMsR0FBRyx1QkFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQzlELEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUM7WUFDM0MsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQWEsb0JBQVUsQ0FBQyxDQUFBO1FBQUEsQ0FBQyxDQUFDLENBQUE7UUFDbEQsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLEtBQUksQ0FBQyxXQUFXLEdBQUUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RCxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtRQUN6QixLQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3pCLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixLQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztJQUMzQixDQUFDO0lBRU8sOEJBQWEsR0FBckI7UUFFSSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTyw2QkFBWSxHQUFwQjtRQUVJLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUNNLFdBQUksR0FBWDtRQUVJLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxzQkFBSSx3QkFBSTthQUFSLFVBQVMsSUFBVztZQUVoQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFDRCw2QkFBWSxHQUFaLFVBQWEsS0FBUyxFQUFDLFFBQWlCO1FBRXBDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELDhCQUFhLEdBQWIsVUFBYyxLQUFTLEVBQUMsUUFBaUI7UUFFckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxRQUFRLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsNkJBQVksR0FBWixVQUFhLElBQWU7UUFBZixxQkFBQSxFQUFBLFNBQWU7UUFFeEIsSUFBRyxJQUFJLElBQUUsRUFBRSxFQUNYO1lBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN6QjthQUVEO1lBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFDLElBQUksQ0FBQztZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxzQkFBSSw2QkFBUzthQUFiLFVBQWMsS0FBYTtZQUV2QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3hDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksNEJBQVE7YUFBWixVQUFhLEtBQVk7WUFFckIsSUFBSSxHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUM3QjtnQkFDSSxPQUFNO2FBQ1Q7WUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUMxQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSwyQkFBTzthQUFYLFVBQVksS0FBWTtZQUVwQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQzs7O09BQUE7SUFDRCw4QkFBYSxHQUFiLFVBQWMsSUFBVztRQUVyQixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFDRCx1QkFBTSxHQUFOO1FBRUksUUFBUTtRQUNSLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixRQUFRO1FBQ1IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDTCxhQUFDO0FBQUQsQ0F6R0EsQUF5R0MsQ0F6R21DLGdCQUFNLEdBeUd6Qzs7Ozs7QUNqSUQseUNBQThCO0FBRTlCLDBDQUFzQztBQUN0Qyw4REFBc0Q7QUFDdEQsd0RBQThDO0FBQzlDLGtEQUE4QztBQUM5QywwQ0FBb0M7QUFDcEMsbUNBQTZCO0FBSTdCLGdFQUEwRDtBQUMxRCxrREFBNEM7QUFFNUM7SUFBZ0MscUNBQWE7SUFJekM7UUFBQSxZQUVJLGlCQUFPLFNBRVY7UUFERyxLQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7SUFDekIsQ0FBQztJQUNELDBDQUFjLEdBQWQ7UUFFSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFDTCx3QkFBQztBQUFELENBYkEsQUFhQyxDQWIrQixjQUFFLENBQUMsVUFBVSxHQWE1QztBQUNEO0lBQXdDLDhCQUFNO0lBVTFDLG9CQUFZLElBQVc7UUFBdkIsWUFFSSxrQkFBTSxJQUFJLENBQUMsU0FTZDtRQVJHLEtBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ2xDLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZCLEtBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxHQUFHLElBQUkseUJBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSSxFQUFDLGNBQU0sS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQTtRQUNyRiwyQ0FBMkM7UUFDM0MsS0FBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxLQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxLQUFJLEVBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBOztJQUN0RCxDQUFDO0lBbkJNLGVBQUksR0FBWDtRQUVJLE9BQU8sWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFrQk0seUJBQUksR0FBWDtRQUVJLGFBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLHFCQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pFLGFBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLHFCQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFFL0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU0sMEJBQUssR0FBWjtRQUVJLGFBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLHFCQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVFLGFBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLHFCQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVNLCtCQUFVLEdBQWpCO1FBRUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxnQ0FBVyxHQUFsQjtRQUVJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sZ0NBQVcsR0FBbEI7UUFFSSxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVNLDZCQUFRLEdBQWY7UUFFSSxJQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDaEI7WUFDSSxPQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFFLEVBQUUsR0FBRywwQkFBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLG1DQUFjLEdBQXRCLFVBQXVCLElBQWEsRUFBQyxLQUFZO1FBRTdDLElBQUksV0FBVyxHQUFlLElBQW1CLENBQUM7UUFDbEQsSUFBSSxRQUFRLEdBQWlCLHFCQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUN0RCxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsV0FBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsV0FBVyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBQSxLQUFLLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQztRQUNqRSxXQUFXLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUN0RixXQUFXLENBQUMsUUFBUSxHQUFHLEVBQUUsR0FBRyxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUNuRix3RUFBd0U7SUFDNUUsQ0FBQztJQUVPLDRCQUFPLEdBQWYsVUFBZ0IsU0FBb0I7UUFFaEMsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUMsQ0FBQSxrQkFBa0I7UUFDaEUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUE7SUFDaEQsQ0FBQztJQUVNLDhCQUFTLEdBQWhCLFVBQWlCLE1BQU07UUFFbkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsMkJBQU0sR0FBTjtJQUdBLENBQUM7SUFFTyw0QkFBTyxHQUFmLFVBQWdCLEVBQVM7UUFFckIsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQ1osT0FBTztRQUNYLDBCQUFnQixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVPLCtCQUFVLEdBQWxCLFVBQW1CLEVBQVM7UUFFeEIsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQ1osT0FBTztRQUNYLElBQUcscUJBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUMvQjtZQUNJLHFCQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDN0IsYUFBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDTCxDQUFDO0lBQ08sNEJBQU8sR0FBZjtRQUVJLGFBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFDTCxpQkFBQztBQUFELENBekhBLEFBeUhDLENBekh1QyxnQkFBTSxHQXlIN0M7Ozs7O0FDdEpELHlDQUFnQztBQUNoQyxtQ0FBNkI7QUFDN0IsK0NBQTZDO0FBQzdDLDBDQUF3QztBQUN4QyxtREFBK0M7QUFDL0Msd0RBQW1EO0FBQ25ELDhEQUFvRDtBQUVwRDtJQUFnQyxxQ0FBYTtJQUl6QztlQUNJLGlCQUFPO1FBQ1AsNEVBQTRFO0lBQ2hGLENBQUM7SUFORCwwQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBS0wsd0JBQUM7QUFBRCxDQVJBLEFBUUMsQ0FSK0IsY0FBRSxDQUFDLFVBQVUsR0FRNUM7QUFFRDtJQUF3Qyw4QkFBTTtJQUUxQyxvQkFBWSxJQUFZO1FBQXhCLFlBQ0ksa0JBQU0sSUFBSSxDQUFDLFNBTWQ7UUFMRyxLQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUN6QyxLQUFJLENBQUMsR0FBRyxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUNuQyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSSxFQUFFLGNBQVEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLHVCQUFhLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEgsS0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOztJQUNwQixDQUFDO0lBQ00sZUFBSSxHQUFYO1FBQ0ksT0FBTyxZQUFZLENBQUM7SUFDeEIsQ0FBQztJQUNELDZCQUFRLEdBQVI7UUFDSSxJQUFJLElBQUksR0FBdUIsdUJBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxDQUFDO0lBQ0QsOEJBQVMsR0FBVDtRQUNJLElBQUksSUFBSSxHQUF1QixJQUFJLHVCQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQztRQUN2RCx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELDRCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNELDJCQUFNLEdBQU4sY0FDQyxDQUFDO0lBQ04saUJBQUM7QUFBRCxDQS9CQSxBQStCQyxDQS9CdUMsZ0JBQU0sR0ErQjdDOzs7OztBQ2pERCxzQ0FBZ0M7QUFLaEMsSUFBTyxFQUFFLENBWVI7QUFaRCxXQUFPLEVBQUU7SUFDTDtRQUErQiw2QkFBUztRQUtwQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsa0NBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FWQSxBQVVDLENBVjhCLElBQUksQ0FBQyxJQUFJLEdBVXZDO0lBVlksWUFBUyxZQVVyQixDQUFBO0FBQ0wsQ0FBQyxFQVpNLEVBQUUsS0FBRixFQUFFLFFBWVI7QUFFRDtJQUEyQixnQ0FBWTtJQU1uQztlQUVJLGlCQUFPO0lBQ1gsQ0FBQztJQVBELHFDQUFjLEdBQWQ7UUFFSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBS0wsbUJBQUM7QUFBRCxDQVZBLEFBVUMsQ0FWMEIsRUFBRSxDQUFDLFNBQVMsR0FVdEM7QUFFRDtJQUF1Qyw2QkFBTTtJQVF6QyxtQkFBYSxJQUFXO1FBQXhCLFlBRUksa0JBQU0sSUFBSSxDQUFDLFNBVWQ7UUFURywrQkFBK0I7UUFDL0IsS0FBSSxDQUFDLEdBQUcsR0FBRSxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzdCLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNuQyxLQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUUsS0FBSyxDQUFDO1FBQy9CLEtBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxLQUFJLEVBQUM7WUFDckMsS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDOztJQUNQLENBQUM7SUFsQmEsY0FBSSxHQUFsQjtRQUVJLE9BQVEsV0FBVyxDQUFDO0lBQ3hCLENBQUM7SUFpQkQsMEJBQU0sR0FBTjtRQUVJLElBQUksQ0FBQyxHQUFVLENBQUMsQ0FBQztRQUNqQixDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELHNCQUFJLDRCQUFLO2FBQVQsVUFBVSxHQUFVO1lBRWhCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNEJBQUs7YUFBVDtZQUVJLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQ3BDLENBQUM7OztPQUFBO0lBRUQsNEJBQVEsR0FBUixVQUFTLFFBQWlCO1FBRXRCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFBLGdCQUFnQjtJQUNwRCxDQUFDO0lBQ0QsMEJBQU0sR0FBTixVQUFPLFFBQWlCO1FBRXBCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVMLGdCQUFDO0FBQUQsQ0FuREEsQUFtREMsQ0FuRHNDLGdCQUFNLEdBbUQ1Qzs7Ozs7QUM5RUQsSUFBYyxFQUFFLENBa0dmO0FBbEdELFdBQWMsRUFBRTtJQUNaO1FBQTBCLHdCQUFTO1FBRS9CO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2Qiw2QkFBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBQ0wsV0FBQztJQUFELENBUEEsQUFPQyxDQVB5QixJQUFJLENBQUMsSUFBSSxHQU9sQztJQVBZLE9BQUksT0FPaEIsQ0FBQTtJQUNEO1FBQWlDLCtCQUFTO1FBR3RDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixvQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoQyxDQUFDO1FBQ0wsa0JBQUM7SUFBRCxDQVJBLEFBUUMsQ0FSZ0MsSUFBSSxDQUFDLElBQUksR0FRekM7SUFSWSxjQUFXLGNBUXZCLENBQUE7SUFDRDtRQUErQiw2QkFBUztRQU1wQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsa0NBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUNMLGdCQUFDO0lBQUQsQ0FYQSxBQVdDLENBWDhCLElBQUksQ0FBQyxJQUFJLEdBV3ZDO0lBWFksWUFBUyxZQVdyQixDQUFBO0lBQ0Q7UUFBNkIsMkJBQVM7UUFRbEM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLGdDQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDTCxjQUFDO0lBQUQsQ0FiQSxBQWFDLENBYjRCLElBQUksQ0FBQyxJQUFJLEdBYXJDO0lBYlksVUFBTyxVQWFuQixDQUFBO0lBQ0Q7UUFBNEIsMEJBQVM7UUFXakM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLCtCQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFDTCxhQUFDO0lBQUQsQ0FoQkEsQUFnQkMsQ0FoQjJCLElBQUksQ0FBQyxJQUFJLEdBZ0JwQztJQWhCWSxTQUFNLFNBZ0JsQixDQUFBO0lBQ0Q7UUFBZ0MsOEJBQVM7UUFDckM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG1DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDTCxpQkFBQztJQUFELENBTkEsQUFNQyxDQU4rQixJQUFJLENBQUMsSUFBSSxHQU14QztJQU5ZLGFBQVUsYUFNdEIsQ0FBQTtJQUNEO1FBQWdDLDhCQUFTO1FBSXJDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVRBLEFBU0MsQ0FUK0IsSUFBSSxDQUFDLElBQUksR0FTeEM7SUFUWSxhQUFVLGFBU3RCLENBQUE7SUFDRDtRQUFrQyxnQ0FBUztRQUd2QzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIscUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FSQSxBQVFDLENBUmlDLElBQUksQ0FBQyxJQUFJLEdBUTFDO0lBUlksZUFBWSxlQVF4QixDQUFBO0lBQ0Q7UUFBZ0MsOEJBQVM7UUFLckM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG1DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDTCxpQkFBQztJQUFELENBVkEsQUFVQyxDQVYrQixJQUFJLENBQUMsSUFBSSxHQVV4QztJQVZZLGFBQVUsYUFVdEIsQ0FBQTtBQUNMLENBQUMsRUFsR2EsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBa0dmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCAqIGFzIFBsYXllckVudGl0eSBmcm9tIFwiLi9QbGF5ZXJFbnRpdHlcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlQWdlbnRcclxue1xyXG4gICAgcHJvdGVjdGVkIG1fUGxheWVyRW50aXR5OlBsYXllckVudGl0eS5QbGF5ZXIuUGxheWVyRW50aXR5O1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkgPSBQbGF5ZXJFbnRpdHkuUGxheWVyLlBsYXllckVudGl0eS5FbnRpdHk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQgQmFzZUFnZW50IGZyb20gXCIuL0Jhc2VBZ2VudFwiXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZUFnZW50IGV4dGVuZHMgQmFzZUFnZW50IHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9BZ2VudDogR2FtZUFnZW50O1xyXG5cclxuICAgIHN0YXRpYyBnZXQgQWdlbnQoKTogR2FtZUFnZW50IHtcclxuICAgICAgICBpZiAodGhpcy5fQWdlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9BZ2VudCA9IG5ldyBHYW1lQWdlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0FnZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgQ3VyTGV2ZWwoKTogbnVtYmVyICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyTGV2ZWw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IEN1ckxldmVsKHZhbHVlOiBudW1iZXIpICB7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJMZXZlbCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDdXJNYXhMZXZlbCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lkhpc3RvcnlNYXhMZXZlbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VyQ2hhcmFjdGVySUQoKTogbnVtYmVyICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEN1ckl0ZW0oKTogbnVtYmVyICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VySXRlbTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgSXRlbUxpc3QoKTogQXJyYXk8bnVtYmVyPiAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lkl0ZW1MaXN0XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IEN1ckl0ZW0oaWQ6IG51bWJlcikgIHtcclxuICAgICAgICBpZiAoIXRoaXMuSXRlbUxpc3RbaWRdKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtID0gaWQ7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRHb2xkKGdvbGQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFnb2xkIHx8IGdvbGQ8MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbW9uZXkgPSB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5ICsgZ29sZDtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5ID0gbW9uZXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZFNjb3JlKHNjb3JlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZighc2NvcmUgfHwgc2NvcmU8MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2NvcmUgPSB0aGlzLm1fUGxheWVyRW50aXR5LkN1clNjb3JlICsgc2NvcmU7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJTY29yZSA9IHNjb3JlO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyIHtcclxuICAgIGV4cG9ydCBjbGFzcyBFdmVudFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBPbk1vbmV5Q2hhbmdlOiBzdHJpbmcgPSBcIk9uTW9uZXlDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJDaGFyYWN0ZXJJRENoYW5nZTogc3RyaW5nID0gXCJPbkN1ckNoYXJhY3RlcklEQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uSGlzdG9yeU1heExldmVsQ2hhbmdlOiBzdHJpbmcgPSBcIk9uSGlzdG9yeU1heExldmVsQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VyTGV2ZWxDaGFuZ2U6c3RyaW5nID0gXCJPbkN1ckxldmVsQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ2hhcmFjdGVyTGlzdENoYW5nZTogc3RyaW5nID0gXCJPbkNoYXJhY3Rlckxpc3RDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJJdGVtQ2hhbmdlOnN0cmluZyA9IFwiT25DdXJJdGVtQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uSXRlbUxpc3RDaGFuZ2U6c3RyaW5nID0gXCJPbkl0ZW1MaXN0Q2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VyU2NvcmVDaGFuZ2U6c3RyaW5nID0gXCJPbkN1clNjb3JlQ2hhbmdlXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJFbnRpdHkge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIG1fRW50aXR5OiBQbGF5ZXJFbnRpdHk7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXQgRW50aXR5KCk6IFBsYXllckVudGl0eSAge1xyXG4gICAgICAgICAgICBpZiAoIVBsYXllckVudGl0eS5tX0VudGl0eSkgIHtcclxuICAgICAgICAgICAgICAgIFBsYXllckVudGl0eS5tX0VudGl0eSA9IG5ldyBQbGF5ZXJFbnRpdHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFBsYXllckVudGl0eS5tX0VudGl0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBtX0ZyYW1lV29yazpGcmFtZVdvcms7XHJcbiAgICAgICAgcHJpdmF0ZSBtX01lc3NhZ2VNZ3I6TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/pkrFcclxuICAgICAgICBwcml2YXRlIG1fTW9uZXk6bnVtYmVyO1xyXG4gICAgICAgIC8v6YCJ5Lit6KeS6ImySURcclxuICAgICAgICBwcml2YXRlIG1fQ3VyQ2hhcmFjdGVySUQ6bnVtYmVyO1xyXG4gICAgICAgIC8v546p5a625bey6Kej6ZSB55qE5pyA6auY5YWz5Y2hXHJcbiAgICAgICAgcHJpdmF0ZSBtX0hpc3RvcnlNYXhMZXZlbDpudW1iZXI7XHJcbiAgICAgICAgLy/lvZPliY3pgInkuK3lhbPljaFcclxuICAgICAgICBwcml2YXRlIG1fQ3VyTGV2ZWw6bnVtYmVyO1xyXG4gICAgICAgIC8v6KeS6Imy5YiX6KGoXHJcbiAgICAgICAgcHJpdmF0ZSBtX0NoYXJhY3Rlckxpc3Q6QXJyYXk8bnVtYmVyPjtcclxuICAgICAgICAvL+W9k+WJjeaLpemAieS4remBk+WFt1xyXG4gICAgICAgIHByaXZhdGUgbV9DdXJJdGVtOm51bWJlcjtcclxuICAgICAgICAvL+eJqeWTgeWIl+ihqFxyXG4gICAgICAgIHByaXZhdGUgbV9JdGVtTGlzdDpBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8v56ev5YiGXHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1clNjb3JlOm51bWJlcjtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBNb25leSgpOiBudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fTW9uZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgTW9uZXkodmFsdWU6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT0gdGhpcy5tX01vbmV5KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX01vbmV5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25Nb25leUNoYW5nZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJDaGFyYWN0ZXJJRCgpOiBudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ3VyQ2hhcmFjdGVySUQodmFsdWU6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT0gdGhpcy5tX0N1ckNoYXJhY3RlcklEKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1ckNoYXJhY3RlcklEID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJDaGFyYWN0ZXJJRENoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VyTGV2ZWwoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyTGV2ZWw/dGhpcy5tX0N1ckxldmVsOnRoaXMubV9IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ3VyTGV2ZWwodmFsdWU6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodmFsdWUgPT0gdGhpcy5DdXJMZXZlbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJMZXZlbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VyTGV2ZWxDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEhpc3RvcnlNYXhMZXZlbCgpOiBudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSGlzdG9yeU1heExldmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEhpc3RvcnlNYXhMZXZlbCh2YWx1ZTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih2YWx1ZSA9PSB0aGlzLm1fSGlzdG9yeU1heExldmVsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0hpc3RvcnlNYXhMZXZlbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uSGlzdG9yeU1heExldmVsQ2hhbmdlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IENoYXJhY3Rlckxpc3QoKTogQXJyYXk8bnVtYmVyPlxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJJdGVtKHZhbHVlOm51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHZhbHVlID09IHRoaXMubV9DdXJJdGVtKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1ckl0ZW0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckl0ZW1DaGFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VySXRlbSgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEl0ZW1MaXN0KCk6QXJyYXk8bnVtYmVyPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9JdGVtTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJTY29yZSgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJTY29yZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJTY29yZSh2YWx1ZTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLm1fQ3VyU2NvcmUgPSB2YWx1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1clNjb3JlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJTY29yZUNoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgdGhpcy5tX01vbmV5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckNoYXJhY3RlcklEID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBbMV07XHJcbiAgICAgICAgICAgIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VySXRlbSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9GcmFtZVdvcmsgPSBGcmFtZVdvcmsuRk07XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTY29yZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBBZGRDaGFyYWN0ZXIoaWQ6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3RbaWRdID0gMTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkNoYXJhY3Rlckxpc3RDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFkZEl0ZW0oaWQ6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIXRoaXMubV9JdGVtTGlzdFtpZF0pIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fSXRlbUxpc3RbaWRdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK3RoaXMubV9JdGVtTGlzdFtpZF07XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25JdGVtTGlzdENoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBCYXNlQWdlbnQgZnJvbSBcIi4vQmFzZUFnZW50XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJHdWVzdEFnZW50IGV4dGVuZHMgQmFzZUFnZW50IHtcclxuICAgIHN0YXRpYyBfQWdlbnQ6IFBsYXllckd1ZXN0QWdlbnQ7XHJcbiAgICBzdGF0aWMgZ2V0IEd1ZXN0QWdlbnQoKTogUGxheWVyR3Vlc3RBZ2VudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0FnZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQWdlbnQgPSBuZXcgUGxheWVyR3Vlc3RBZ2VudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQWdlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBNb25leSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkNoYXJhY3Rlckxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlDaGFyYWN0ZXIoaWQ6IG51bWJlcikgIHtcclxuICAgICAgICAvL1RvRG9cclxuICAgICAgICB2YXIgcHJpY2UgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0UHJpY2UoaWQpO1xyXG4gICAgICAgIGlmIChpZCA8IDB8fCBwcmljZSA8MCB8fCBwcmljZSA+IHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSAtPSBpZDtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkFkZENoYXJhY3RlcihpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJ1eUl0ZW0oaWQ6IG51bWJlcikgIHtcclxuICAgICAgICB2YXIgcHJpY2UgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0UHJpY2UoaWQpO1xyXG4gICAgICAgIGlmKGlkIDwgMHx8IHByaWNlIDwwIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocHJpY2UgPiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5IC09IHByaWNlO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQWRkSXRlbShpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldENoYXJhY3RlcihpZClcclxuICAgIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDpBcnJheTxudW1iZXI+ID0gdGhpcy5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIGlmKGNoYXJhY3Rlckxpc3RbaWRdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJDaGFyYWN0ZXJJRCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgQmFzZUVudW0ge1xyXG4gICAgZXhwb3J0IGVudW0gVUlUeXBlRW51bSB7TG93LE1pZGxlfTtcclxufSIsImltcG9ydCBCYXNlTWdyIGZyb20gXCIuLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIjtcclxuXHJcbi8qKlxyXG4gKiDlrprkuYnln7rnoYDnu5PmnoTkvZNcclxuICovXHJcbmV4cG9ydCBtb2R1bGUgQmFzZUZ1bmMge1xyXG4gICAgZW51bSBVSVR5cGVFbnVtIHtMb3csTWlkbGV9O1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcDxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX0NvdW50Om51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9NYXA6e1trZXk6IHN0cmluZ106IFR9O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX01hcCA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvckVhY2goY2FsbGJhY2s6KG1ncjpULGtleTpzdHJpbmcpPT52b2lkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBtYXBLZXkgaW4gdGhpcy5fTWFwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9NYXBbbWFwS2V5XSxtYXBLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBvYmog5pS+5YWl5a+56LGhXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDplK5cclxuICAgICAgICAgKi9cclxuICAgICAgICBTZXQoIG9iajpULCBrZXk6c3RyaW5nIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLl9NYXBba2V5XSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2V0KGtleTpzdHJpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuX01hcFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOenu+mZpOafkOS4quWvueixoVxyXG4gICAgICAgICAqIEByZXR1cm5zIOiiq+enu+mZpOWvueixoVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFJlbW92ZShrZXk6c3RyaW5nKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgT2JqOlQgPSB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICAgICAgaWYoT2JqKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm5oul5pyJXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgSGFzKGtleTpzdHJpbmcpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX01hcFtrZXldKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBOb2RlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfVmFsdWU6VDtcclxuICAgICAgICBwcml2YXRlIF9OZXh0Ok5vZGU8VD47XHJcbiAgICAgICAgY29uc3RydWN0b3IoIClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFZhbHVlKHZhbHVlOlQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgTmV4dCgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9OZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgTmV4dChub2RlOk5vZGU8VD4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIE5vZGVQb29sPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9Ob2RlTGlzdDpOb2RlPFQ+O1xyXG4gICAgICAgIFB1bGxCYWNrKG5vZGU6Tm9kZTxUPilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9Ob2RlTGlzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QuTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0ID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBBcXVpcmUoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpOb2RlPFQ+ID0gdGhpcy5fTm9kZUxpc3Q7XHJcbiAgICAgICAgICAgIGlmKG5vZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0ID0gdGhpcy5fTm9kZUxpc3QuTmV4dDtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBOb2RlUXVldWU8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Db3VudDtcclxuICAgICAgICBwcml2YXRlIF9IZWFkOk5vZGU8VD5cclxuICAgICAgICBwcml2YXRlIF9UYWlsZVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDb3VudCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgUG9wTm9kZSgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0NvdW50PDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IG51bGw7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9IZWFkO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkID0gdGhpcy5fSGVhZC5OZXh0O1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICAvL+WIq+aKiuWwvuW3tOW4puWHuuWOu+S6hlxyXG4gICAgICAgICAgICBpZih0aGlzLl9Db3VudCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaCh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoTm9kZShub2RlOk5vZGU8VD4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9Db3VudCA9PTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWQgPSBub2RlO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsZS5OZXh0ID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG5vZGU7XHJcbiAgICAgICAgICAgICsrdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGVhZE5vZGUoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5IZWFkTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIZWFkVmFsdWUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9IZWFkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fSGVhZC5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFRhaWxOb2RlKCk6Tm9kZTxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLlRhaWxOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFRhaWxWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1RhaWxlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fVGFpbGUudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFF1ZXVlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfTm9kZVBvb2w6Tm9kZVBvb2w8VD47XHJcbiAgICAgICAgcHJpdmF0ZSBfTm9kZVF1ZXVlOk5vZGVRdWV1ZTxUPjtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUG9vbCA9IG5ldyBOb2RlUG9vbDxUPigpO1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUXVldWUgPSBuZXcgTm9kZVF1ZXVlPFQ+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaCh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IHRoaXMuX05vZGVQb29sLkFxdWlyZSgpO1xyXG4gICAgICAgICAgICBub2RlLlZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVRdWV1ZS5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQb3AoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpOb2RlPFQ+ID0gdGhpcy5fTm9kZVF1ZXVlLlBvcE5vZGUoKTtcclxuICAgICAgICAgICAgaWYobm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fTm9kZVBvb2wuUHVsbEJhY2sobm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTm9kZVF1ZXVlLkNvdW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuLypcclxuICAgIGV4cG9ydCBjbGFzcyBMaW5rTm9kZUxpc3Q8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9IZWFkTm9kZTpOb2RlPFQ+O1xyXG4gICAgICAgIHByaXZhdGUgX1RhaWxOb2RlOk5vZGU8VD47XHJcblxyXG4gICAgICAgIHByaXZhdGUgX0NvdW50Tm9kZTpudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZE5vZGUgPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkTm9kZS5OZXh0ID0gdGhpcy5fSGVhZE5vZGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9UYWlsTm9kZSA9IHRoaXMuX0hlYWROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5blpLTnu5PngrnlgLxcclxuICAgICAgICAgXHJcbiAgICAgICAgZ2V0IEhlYWRWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5fSGVhZE5vZGUuVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIEFkZCh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld05vZGU6Tm9kZTxUPiA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIG5ld05vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5BZGROb2RlKG5ld05vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBBZGROb2RlKG5ld05vZGU6Tm9kZTxUPilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1RhaWxOb2RlIT10aGlzLl9IZWFkTm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUuTmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbn0iLCJleHBvcnQgbW9kdWxlIEZTTSBcclxue1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRlNNXHJcbiAgICB7XHJcbiAgICAgICAgVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgRlNNIDxUIGV4dGVuZHMgU3RhdGU+IFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgbV9DdXJTdGF0ZTpUO1xyXG4gICAgICAgIHByaXZhdGUgbV9TdGF0ZURpY3Q6e1tuYW1lOnN0cmluZ106VH07XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBzdGFydFN0YXRlOlQgPSBudWxsIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTdGF0ZSA9IHN0YXJ0U3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ3VyU3RhdGUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pS55Y+Y54q25oCBXHJcbiAgICAgICAgICogQHBhcmFtIHN0YXRlIOiuvue9rueKtuaAgVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBDaGFuZ2VTdGF0ZShzdGF0ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdGUuU2V0T3duZXIodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBjdXJTdGF0ZTpUID0gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgICAgICBpZihjdXJTdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhdGUuRW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VyU3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgY3VyU3RhdGUuU3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1clN0YXRlID0gY3VyU3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGN1clN0YXRlID0gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgICAgICBpZihjdXJTdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhdGUuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fb3duZXI6SUZTTTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3Rvcihvd25lcjpJRlNNID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9vd25lciA9IG93bmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFNldE93bmVyKG93bmVyOklGU00pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fb3duZXIgPSBvd25lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGUoKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgRW5kKCk7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFN0YXJ0KCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlTWdyXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGUoKTtcclxufSIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5pbXBvcnQge0Jhc2VGdW5jfSAgZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyYW1lV29ya1xyXG57XHJcbiAgICBfTWdyTWFwOkJhc2VGdW5jLk1hcDxCYXNlTWFuYWdlcj47Ly9CYXNlU3RydWN0Lk1hcDxCYXNlTWFuYWdlcj47XHJcbiAgICBfVGVtTWdyTGlzdDpBcnJheTxCYXNlTWFuYWdlcj47XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwID0gbmV3IEJhc2VGdW5jLk1hcDxCYXNlTWFuYWdlcj4oKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIF9GTTpGcmFtZVdvcms7XHJcbiAgICBzdGF0aWMgZ2V0IEZNKCk6RnJhbWVXb3JrXHJcbiAgICB7XHJcbiAgICAgICAgaWYoRnJhbWVXb3JrLl9GTT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZyYW1lV29yay5fRk0gPSBuZXcgRnJhbWVXb3JrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBGcmFtZVdvcmsuX0ZNO1xyXG4gICAgfVxyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbXBNZ3JMaXN0ID0gbmV3IEFycmF5PEJhc2VNYW5hZ2VyPih0aGlzLl9NZ3JNYXAuQ291bnQpO1xyXG4gICAgICAgIHRoaXMuX01nck1hcC5mb3JFYWNoKCAobWdyOkJhc2VNYW5hZ2VyICwga2V5OnN0cmluZyk6dm9pZCA9PntcclxuICAgICAgICAgICAgdGVtcE1nckxpc3QucHVzaChtZ3IpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGVtcE1nckxpc3QuZm9yRWFjaCgobWdyLGlkeCk9PnttZ3IuVXBkYXRlKCk7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZE1hbmFnZXI8VCBleHRlbmRzIEJhc2VNYW5hZ2VyPiggdHlwZTp7bmV3ICgpOiBUOyBOYW1lKCk6c3RyaW5nIH0gKTpUXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fTWdyTWFwLkhhcyh0eXBlLk5hbWUoKSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTWdyTWFwLkdldCh0eXBlLk5hbWUoKSkgYXMgVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld01ncjpUID0gbmV3IHR5cGUoKTtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAuU2V0KG5ld01ncix0eXBlLk5hbWUoKSk7XHJcbiAgICAgICAgcmV0dXJuICBuZXdNZ3I7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBHZXRNYW5hZ2VyPFQgZXh0ZW5kcyBCYXNlTWFuYWdlcj4odHlwZTp7bmV3ICgpOiBUOyBOYW1lKCk6c3RyaW5nIH0pOlR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX01nck1hcC5HZXQodHlwZS5OYW1lKCkpIGFzIFQ7XHJcbiAgICB9XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog5raI5oGv5o6n5Yi25ZmoXHJcbiAqL1xyXG5pbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuZXhwb3J0IG1vZHVsZSBNZXNzYWdlTUQge1xyXG4gICAgZXhwb3J0IGNvbnN0IEdhbWVFdmVudCA9XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJEZWF0aDogXCJQbGF5ZXJEZWF0aFwiLFxyXG4gICAgICAgICAgICBHYW1lVGltZVVwOiBcIkdhbWVUaW1lVXBcIixcclxuICAgICAgICAgICAgR2FtZUNvbnRpbnVlOiBcIkdhbWVDb250aW51ZVwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXNzYWdlQ2VudGVyIGV4dGVuZHMgQmFzZU1hbmFnZXIgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTWVzc2FnZUNlbnRlclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfTWdyOiBNZXNzYWdlQ2VudGVyO1xyXG4gICAgICAgIHByaXZhdGUgX0V2ZW50RGljdDogeyBbS2V5OiBzdHJpbmddOiBNRXZlbnQgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBfR2V0RXZlbnQobmFtZTogc3RyaW5nKTogTUV2ZW50ICB7XHJcbiAgICAgICAgICAgIHZhciBldmVudDogTUV2ZW50ID0gdGhpcy5fRXZlbnREaWN0W25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgPT0gdW5kZWZpbmVkIHx8IGV2ZW50ID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBNRXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0V2ZW50RGljdFtuYW1lXSA9IGV2ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV2ZW50ID0gdGhpcy5fRXZlbnREaWN0W25hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0ID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog5rOo5YaMXHJcbiAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiDlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7T2JqfSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJlZ2lzdChuYW1lOiBzdHJpbmcsIGFjdGlvbjogKCkgPT4gdm9pZCwgbGlzdGVuZXI6IE9iamVjdCk6TUV2ZW50ICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBuZXdEbGd0OiBEZWxlZ2F0ZSA9IG5ldyBEZWxlZ2F0ZShsaXN0ZW5lciwgYWN0aW9uKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuQWRkKG5ld0RsZ3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0RXZlbnRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOmUgOafkOS4quebkeWQrFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiDlp5TmiZhcclxuICAgICAgICAgKiBAcGFyYW0ge09ian0gbGlzdGVuZXIg55uR5ZCs6ICFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmVnaXN0KG5hbWU6IHN0cmluZywgYWN0aW9uOiAoKSA9PiB2b2lkLCBsaXN0ZW5lcjogT2JqZWN0KSAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6IE1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5SbXYoYWN0aW9uLCBsaXN0ZW5lcilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOmUgOafkOS4quS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERlc1JnaXN0SURLKG5hbWU6IHN0cmluZykgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuUmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBGaXJlKG5hbWU6IHN0cmluZywgcGFyYW06IGFueSA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lp5TmiZhcclxuICAgIGV4cG9ydCBjbGFzcyBEZWxlZ2F0ZSB7XHJcbiAgICAgICAgTGlzdGVuZXI6IE9iamVjdDtcclxuICAgICAgICBBY3Rpb246IChwYXJhbTphbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEV4ZWN1dGUocGFyYW06IGFueSA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aW9uLmNhbGwodGhpcy5MaXN0ZW5lciwgcGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihsaXN0ZW5lcjogT2JqZWN0LCBhY3Rpb246IChwYXJhbTphbnkpID0+IHZvaWQpICB7XHJcbiAgICAgICAgICAgIHRoaXMuTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICAgICAgdGhpcy5BY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/kuovku7ZcclxuICAgIGV4cG9ydCBjbGFzcyBNRXZlbnQge1xyXG4gICAgICAgIERlbGVnYXRlTGlzdDogQXJyYXk8RGVsZWdhdGU+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgdGhpcy5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIOa3u+WKoOWnlOaJmFxyXG4gICAgICAgICogQHBhcmFtIHtEZWxlZ2F0ZX0gZGxnIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICovXHJcbiAgICAgICAgQWRkKGRsZzogRGVsZWdhdGUpICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0LnB1c2goZGxnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDnp7vpmaTlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvbiDmtojmga/lkI3lrZdcclxuICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lciDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJtdihhY3Rpb246ICgpID0+IHZvaWQsIGxpc3RlbmVyOiBPYmplY3QgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB2YXIgZGxndExpc3Q6IEFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhcnJJZHg6IG51bWJlciA9IGRsZ3RMaXN0Lmxlbmd0aCAtIDE7IGFycklkeCA+IC0xOyAtLWFycklkeCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gZGxndC5BY3Rpb24gJiYgbGlzdGVuZXIgPT0gZGxndC5MaXN0ZW5lcikgIHtcclxuICAgICAgICAgICAgICAgICAgICBkbGd0TGlzdC5zcGxpY2UoYXJySWR4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldCgpICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0ID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDop6blj5FcclxuICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIEV4ZWN1dGUocGFyYW06IGFueSkgIHtcclxuICAgICAgICAgICAgdmFyIGRsZ3RMaXN0OiBBcnJheTxEZWxlZ2F0ZT4gPSB0aGlzLkRlbGVnYXRlTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgYXJySWR4OiBudW1iZXIgPSBkbGd0TGlzdC5sZW5ndGggLSAxOyBhcnJJZHggPiAtMTsgLS1hcnJJZHgpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGxndCA9IGRsZ3RMaXN0W2FycklkeF07XHJcbiAgICAgICAgICAgICAgICBkbGd0LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi8uLi9TY2VuZS9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIlxyXG5pbXBvcnQge0ZTTX0gZnJvbSBcIi4vLi4vQmFzZS9GU01cIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIG1fU2NlbmVGU006IFNjZW5lLlNjZW5lRlNNO1xyXG4gICAgcHJpdmF0ZSBtX1NjZW5lTm9kZTogTGF5YS5Ob2RlO1xyXG4gICAgXHJcbiAgICBnZXQgQ3VyU2NlbmUoKTpTY2VuZS5CYXNlU2NlbmUge1xyXG4gICAgICAgIGlmKHRoaXMubV9TY2VuZUZTTS5DdXJTdGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9TY2VuZUZTTS5DdXJTdGF0ZTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldCBDdXJEaXIoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTY2VuZS5EaXJlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNjZW5lTWFuYWdlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllciA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fQkdMYXllcik7XHJcblxyXG4gICAgICAgIHRoaXMubV9TY2VuZUZTTSA9IG5ldyBTY2VuZS5TY2VuZUZTTSgpO1xyXG4gICAgICAgIHRoaXMubV9TY2VuZU5vZGUgPSBMYXlhLnN0YWdlLmFkZENoaWxkKG5ldyBMYXlhLlNwcml0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2hhbmdlU2NlbmUobmV3U2NlbmU6IFNjZW5lLkJhc2VTY2VuZSkgIHtcclxuICAgICAgICB0aGlzLm1fU2NlbmVGU00uQ2hhbmdlU3RhdGUobmV3U2NlbmUpO1xyXG4gICAgICAgIGlmKG5ld1NjZW5lLlNjZW5lT2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX1NjZW5lTm9kZS5hZGRDaGlsZChuZXdTY2VuZS5TY2VuZU9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pen6YC76L6RXHJcbiAgICBwcml2YXRlIF9CRzogTGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9CR0xheWVyOiBMYXlhLlNwcml0ZTtcclxuICAgIFxyXG4gICAgc2V0IEJHKGJnOiBMYXlhLlNwcml0ZSkge1xyXG4gICAgICAgIGlmICghYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQkcpIHtcclxuICAgICAgICAgICAgdGhpcy5fQkcucmVtb3ZlU2VsZjtcclxuICAgICAgICAgICAgdGhpcy5fQkcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIHRoaXMuX0JHLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9CRy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyLmFkZENoaWxkKHRoaXMuX0JHKTtcclxuICAgIH1cclxuICAgIGdldCBCRygpOkxheWEuU3ByaXRlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9CRztcclxuICAgIH1cclxufVxyXG5cclxuLyoq5L2c6ICFTW9cclxuKiDlnLrmma/lip/og71cclxuKi9cclxuLypcclxuLy/lnLrmma/nrqHnkIZcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBfQkc6IExheWEuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBfQkdMYXllcjogTGF5YS5TcHJpdGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuX0JHTGF5ZXIpO1xyXG4gICAgICAgIC8v5re75Yqg5Zy65pmv566h55CGXHJcbiAgICAgICAgdGhpcy5TY2VuZU5vZGUgPSBMYXlhLnN0YWdlLmFkZENoaWxkKG5ldyBMYXlhLlNwcml0ZSgpKTtcclxuICAgIH1cclxuICAgIHNldCBCRyhiZzogTGF5YS5TcHJpdGUpIHtcclxuICAgICAgICBpZiAoIWJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX0JHKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLnJlbW92ZVNlbGY7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB0aGlzLl9CRy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fQkcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllci5hZGRDaGlsZCh0aGlzLl9CRyk7XHJcbiAgICB9XHJcbiAgICBnZXQgQkcoKTpMYXlhLlNwcml0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fQkc7XHJcbiAgICB9XHJcbiAgICBTY2VuZU5vZGU6IExheWEuTm9kZTtcclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNjZW5lTWFuYWdlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX0N1clNjZW5lOiBCYXNlU2NlbmU7XHJcbiAgICBnZXQgQ3VyU2NlbmUoKTogQmFzZVNjZW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU2NlbmU7XHJcbiAgICB9XHJcbiAgICBzZXQgQ3VyU2NlbmUodmFsdWU6IEJhc2VTY2VuZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9DdXJTY2VuZSAmJiB0aGlzLl9DdXJTY2VuZS5TY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9DdXJTY2VuZS5TY2VuZS5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0N1clNjZW5lID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N1clNjZW5lICYmIHRoaXMuX0N1clNjZW5lLlNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2NlbmVOb2RlLmFkZENoaWxkKHRoaXMuX0N1clNjZW5lLlNjZW5lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyRGlyKCk6IEJhc2VEaXJlY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0N1clNjZW5lLkN1ckRpcjtcclxuICAgIH1cclxuXHJcbiAgICBFbnRlclNjZW5lKHRhcmdldFNjZW5lOiBCYXNlU2NlbmUpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lID0gdGFyZ2V0U2NlbmU7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLkxlYXZlKHRhcmdldFNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUgIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZS5VcGRhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuKi8iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlRpbWVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1fU3RhcnRUaW1lOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9HYW1lVGltZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fRnJhbWVUaW1lOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Jc1BhdXNlZDpib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgU3RhcnRUaW1lcigpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fU3RhcnRUaW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBHYW1lVGltZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fR2FtZVRpbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9TdGFydFRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICB0aGlzLm1fR2FtZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMubV9GcmFtZVRpbWUgPSAxIC9OdW1iZXIoTGF5YS5zdGFnZS5mcmFtZVJhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKSAge1xyXG4gICAgICAgIGlmKHRoaXMubV9Jc1BhdXNlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0dhbWVUaW1lICs9IHRoaXMubV9GcmFtZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhdXNlKCl7XHJcbiAgICAgICAgdGhpcy5tX0lzUGF1c2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ29udGludWUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Jc1BhdXNlZCA9IGZhbHNlXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi91aS9CYXNlVUlcIlxyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBVSUZ1bmMgfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1VJRnVuY1wiXHJcbmltcG9ydCB7IEJhc2VGdW5jIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcbmVudW0gTm9kZVR5cGUge1xyXG4gICAgQm90dG9tLFxyXG4gICAgTWlkZGxlLFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHN0YXRpYyBnX1VJV2lkdGggPSA3NTA7XHJcbiAgICBzdGF0aWMgZ19VSUhlaWdodCA9IDEzMzQ7XHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBtX1Jvb3ROb2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgbV9Cb3R0b21Ob2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgbV9NaWRsZU5vZGU6IExheWEuQm94O1xyXG4gICAgcHJpdmF0ZSBfVUlEaWN0OiB7IFtuYW1lOiBzdHJpbmddOiBCYXNlVUkgfTtcclxuICAgIHByaXZhdGUgX1VwZGF0ZUNvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fVXBkYXRlVGltZTpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBBZGROb2RlKG5vZGU6IE5vZGVUeXBlKTogdm9pZCAge1xyXG4gICAgICAgIHZhciBub2RlQm94OiBMYXlhLkJveCA9IG5ldyBMYXlhLkJveCgpO1xyXG4gICAgICAgIG5vZGVCb3gudG9wID0gMDtcclxuICAgICAgICBub2RlQm94LmJvdHRvbSA9IDA7XHJcbiAgICAgICAgbm9kZUJveC5sZWZ0ID0gMDtcclxuICAgICAgICBub2RlQm94LnJpZ2h0ID0gMDtcclxuICAgICAgICBzd2l0Y2ggKG5vZGUpICB7XHJcbiAgICAgICAgICAgIGNhc2UgTm9kZVR5cGUuQm90dG9tOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0JvdHRvbU5vZGUgPSBub2RlQm94O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWlkbGVOb2RlID0gbm9kZUJveDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUm9vdE5vZGUuYWRkQ2hpbGQobm9kZUJveCk7XHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLmFkZENoaWxkKG5vZGVCb3gpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcgIHtcclxuICAgICAgICByZXR1cm4gXCJVSU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcm9vdEJveCA9IG5ldyBMYXlhLkJveCgpO1xyXG4gICAgICAgIHJvb3RCb3gud2lkdGggPSBVSU1hbmFnZXIuZ19VSVdpZHRoO1xyXG4gICAgICAgIHJvb3RCb3guaGVpZ2h0ID0gVUlNYW5hZ2VyLmdfVUlIZWlnaHQ7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChyb290Qm94KTtcclxuICAgICAgICB0aGlzLm1fUm9vdE5vZGUgPSByb290Qm94O1xyXG4gICAgICAgIHRoaXMub25TaXplQ2hhbmdlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLm1fUm9vdE5vZGUpO1xyXG4gICAgICAgIHRoaXMubV9VcGRhdGVUaW1lID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5BZGROb2RlKE5vZGVUeXBlLkJvdHRvbSk7XHJcbiAgICAgICAgdGhpcy5BZGROb2RlKE5vZGVUeXBlLk1pZGRsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fVUlEaWN0ID0ge307XHJcbiAgICAgICAgdGhpcy5fVXBkYXRlQ291bnQgPSAwO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5SRVNJWkUsIHRoaXMsIHRoaXMub25TaXplQ2hhbmdlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblNpemVDaGFuZ2UoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByb290Qm94ID0gdGhpcy5tX1Jvb3ROb2RlO1xyXG4gICAgICAgIFVJRnVuYy5GaXhVSShyb290Qm94LFVJTWFuYWdlci5nX1VJV2lkdGgpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIHNjYWxlID0gVUlGdW5jLkNvdW50U2NhbGVGaXgoVUlNYW5hZ2VyLmdfVUlXaWR0aCk7XHJcbiAgICAgICAgdmFyIHJvb3RCb3ggPSB0aGlzLm1fUm9vdE5vZGU7XHJcbiAgICAgICAgcm9vdEJveC5zY2FsZVggPSBzY2FsZTtcclxuICAgICAgICByb290Qm94LnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3guaGVpZ2h0ID0gVUlNYW5hZ2VyLmdfVUlIZWlnaHQgKiBzY2FsZTtcclxuICAgICAgICByb290Qm94LndpZHRoID0gVUlNYW5hZ2VyLmdfVUlXaWR0aDsqL1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCkgIHtcclxuICAgICAgICBcclxuICAgICAgICAvL+WumuW4p+WIt+aWsFVJXHJcbiAgICAgICAgaWYgKHRoaXMubV9VcGRhdGVUaW1lIDwgTGF5YS50aW1lci5jdXJyVGltZXIpICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkodGhpcy5tX0JvdHRvbU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVVJKHRoaXMubV9NaWRsZU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9VcGRhdGVUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXIgKyAzMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZVVJKG5vZGU6IExheWEuU3ByaXRlKSAge1xyXG4gICAgICAgIGZvciAobGV0IGlkeDogbnVtYmVyID0gMDsgaWR4IDwgbm9kZS5udW1DaGlsZHJlbjsgKytpZHgpICB7XHJcbiAgICAgICAgICAgIHZhciB1aTogQmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGlkeCkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICB1aS5VSVVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEFkZFVJKCkgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgU2hvdzxUIGV4dGVuZHMgQmFzZVVJPih1aUNsYXNzOiB7IG5ldyhuYW1lOiBzdHJpbmcpOiBUOyBOYW1lKCk6IHN0cmluZyB9KTogVCAge1xyXG4gICAgICAgIHZhciBzdHI6IHN0cmluZyA9IHVpQ2xhc3MuTmFtZSgpO1xyXG4gICAgICAgIHZhciBuZXdVSTogQmFzZVVJID0gdGhpcy5HZXRVSUJ5TmFtZShzdHIpO1xyXG4gICAgICAgIG5ld1VJID0gbmV3VUkgPT0gbnVsbCA/IHRoaXMuQWRkVUlCeU5hbWUoc3RyLCBuZXcgdWlDbGFzcyhzdHIpKSA6IG5ld1VJO1xyXG4gICAgICAgIHZhciBub2RlOiBMYXlhLlNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoIChuZXdVSS5VSVR5cGUpICB7XHJcbiAgICAgICAgICAgIC8v5Lit5bGC5qyhVUlcclxuICAgICAgICAgICAgY2FzZSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlOlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9NaWRsZU5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tX01pZGxlTm9kZS5udW1DaGlsZHJlbiA8PSAwKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6YCa55+l5a+85ryU5pqC5YGc5ri45oiPXHJcbiAgICAgICAgICAgICAgICAgICAgLy9BUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkN1ckRpci5UaW1lVXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNoaWxkTnVtOiBudW1iZXIgPSBub2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIC8v5oqK5LqS5pal55qE56qX5Y+j5YWz5o6JXHJcbiAgICAgICAgaWYgKG5ld1VJLklzTXV0ZXggJiYgY2hpbGROdW0gPiAwKSAge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVJID0gbm9kZS5nZXRDaGlsZEF0KG5vZGUubnVtQ2hpbGRyZW4gLSAxKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIGlmICghbGFzdFVJLklzTXV0ZXgpXHJcbiAgICAgICAgICAgICAgICBsYXN0VUkuSGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5hZGRDaGlsZChuZXdVSSk7XHJcbiAgICAgICAgbmV3VUkuT3Blbk9QKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdVSSBhcyBUO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKHVpOiBCYXNlVUkpICB7XHJcbiAgICAgICAgdWkucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIHVpLkNsb3NlT1AoKTtcclxuICAgICAgICB2YXIgbm9kZTogTGF5YS5TcHJpdGUgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAodWkuVUlUeXBlKSAge1xyXG4gICAgICAgICAgICAvL+S4reWxguasoVVJXHJcbiAgICAgICAgICAgIGNhc2UgQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fTWlkbGVOb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubnVtQ2hpbGRyZW4gPD0gMClcclxuICAgICAgICAgICAgICAgICAgICAvL+WFs+mXreeql+WPoyDpgJrnn6XmuLjmiI/nu6fnu61cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLkNvbnRpbnVlVGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGROdW06IG51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgaWYgKGNoaWxkTnVtID4gMCkgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSTogQmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGNoaWxkTnVtIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICBsYXN0VUkuT3Blbk9QKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIENsb3NlQ3VyVmlldygpICB7XHJcbiAgICAgICAgdmFyIHVpOiBCYXNlVUkgPSB0aGlzLm1fQm90dG9tTm9kZS5nZXRDaGlsZEF0KHRoaXMubV9Cb3R0b21Ob2RlLm51bUNoaWxkcmVuIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UodWkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yig6Zmk5omA5pyJ6IqC54K55LiK55qEVUlcclxuICAgIENsZWFyKCkgIHtcclxuICAgICAgICB2YXIgdWlOb2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VVSTogQmFzZVVJID0gdWlOb2RlLmdldENoaWxkQXQoMCkgYXMgQmFzZVVJOy8vLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlOb2RlID0gdGhpcy5tX01pZGxlTm9kZVxyXG4gICAgICAgIHdoaWxlICh1aU5vZGUubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEdldFVJQnlOYW1lKG5hbWU6IHN0cmluZyk6IEJhc2VVSSAge1xyXG4gICAgICAgIHZhciB1aSA9IHRoaXMuX1VJRGljdFtuYW1lXTtcclxuICAgICAgICB1aSA9IHVpID09IHVuZGVmaW5lZCA/IG51bGwgOiB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcbiAgICBBZGRVSUJ5TmFtZShuYW1lOiBzdHJpbmcsIHVpOiBCYXNlVUkpOiBCYXNlVUkgIHtcclxuICAgICAgICB0aGlzLl9VSURpY3RbbmFtZV0gPSB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJHYW1lLnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvUm9sZUVsZW1lbnQudHNcIixSb2xlRWxlbWVudCk7XG4gICAgICAgIHJlZyhcInNjcmlwdC9JdGVtRWxlbWVudC50c1wiLEl0ZW1FbGVtZW50KTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyTWFuYWdlciBleHRlbmRzIEdhbWVNYW5hZ2VyLkJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfTWdyOiBDaGFyYWN0ZXJNYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTWdyKCk6IENoYXJhY3Rlck1hbmFnZXIge1xyXG4gICAgICAgIGlmICghQ2hhcmFjdGVyTWFuYWdlci5nX01ncikge1xyXG4gICAgICAgICAgICBDaGFyYWN0ZXJNYW5hZ2VyLmdfTWdyID0gbmV3IENoYXJhY3Rlck1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENoYXJhY3Rlck1hbmFnZXIuZ19NZ3I7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkNoYXJhY3RlckluZm9cIik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgR2VuSW5mbyhkYXRhOmFueSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IENoYXJhY3RlckluZm8oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFNraWxsSXRlbShpZCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHZhciBpbmZvOkNoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmKGluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvLkl0ZW1MaXN0O1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRQcmljZShpZCk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGluZm86Q2hhcmFjdGVySW5mbyA9IHRoaXMuR2V0SW5mbzxDaGFyYWN0ZXJJbmZvPihpZCk7XHJcbiAgICAgICAgaWYoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uUHJpY2U7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldENoYXJhY3RlckluZm8oaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0Q2hhcmFjdGVyTW9kZWwoaWQ6IG51bWJlciwgbGV2ZWw6IG51bWJlcik6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHZhciBpbmZvOkNoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmKCFpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm4gO1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJEYXRhOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRDaGFyYWN0ZXJJbmZvKGlkKTtcclxuICAgICAgICB2YXIgc2FtcGxlTW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRMSChjaGFyYWN0ZXJEYXRhLkdldE5hbWUobGV2ZWwpKSk7XHJcbiAgICAgICAgdmFyIG1vZGVsID0gc2FtcGxlTW9kZWwuY2xvbmUoKTtcclxuICAgICAgICByZXR1cm4gbW9kZWw7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQ2hhcmFjdGVySW5mbyBleHRlbmRzIEdhbWVNYW5hZ2VyLkJhc2VJbmZvIHtcclxuICAgIHByaXZhdGUgbV9QcmljZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX01vZGVsSUQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgbV9TdGF0ZUxzaXQ6IEFycmF5PHN0cmluZz47XHJcbiAgICBwcml2YXRlIG1fRXh0ZW5kSUQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgbV9JdGVtTGlzdDogQXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IEl0ZW1MaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fSXRlbUxpc3Q7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IFByaWNlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QcmljZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgSUQoKTogbnVtYmVyICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9JRDtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJhY3RlckRhdGE6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKGNoYXJhY3RlckRhdGEpO1xyXG4gICAgICAgIHRoaXMubV9Nb2RlbElEID0gY2hhcmFjdGVyRGF0YS5Nb2RlbElEID8gY2hhcmFjdGVyRGF0YS5Nb2RlbElEIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fU3RhdGVMc2l0ID0gY2hhcmFjdGVyRGF0YS5TdGF0ZUxpc3QgPyBjaGFyYWN0ZXJEYXRhLlN0YXRlTGlzdCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gY2hhcmFjdGVyRGF0YS5JdGVtTGlzdCA/IGNoYXJhY3RlckRhdGEuSXRlbUxpc3QgOiBbXTtcclxuICAgICAgICB0aGlzLm1fRXh0ZW5kSUQgPSBjaGFyYWN0ZXJEYXRhLkV4dGVuZElEID8gY2hhcmFjdGVyRGF0YS5FeHRlbmRJRCA6IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldE5hbWUobGV2ZWw6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIHN0YXRlOiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHRoaXMubV9TdGF0ZUxzaXQubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgc3RhdGUgPSB0aGlzLm1fU3RhdGVMc2l0W2xldmVsXSA/IHRoaXMubV9TdGF0ZUxzaXRbbGV2ZWxdIDogdGhpcy5tX1N0YXRlTHNpdFt0aGlzLm1fU3RhdGVMc2l0Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc3RhdGUgPSBcIlwiO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW9kZWxJRCArIHN0YXRlICsgdGhpcy5tX0V4dGVuZElEO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuZXhwb3J0IG1vZHVsZSBHYW1lTWFuYWdlciB7XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZU1hbmFnZXIge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01hcDogeyBbbmFtZTogc3RyaW5nXTogQmFzZUluZm8gfTtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9Cb3R0b21JRDogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLm1fTWFwID0ge307XHJcbiAgICAgICAgICAgIHRoaXMubV9Cb3R0b21JRCA9IC0xO1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnSW5mbzogb2JqZWN0ID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0SnNvblBhdGgobmFtZSkpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29uZmlnSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBjb25maWdJbmZvW2tleV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YUluZm86IEJhc2VJbmZvID0gdGhpcy5HZW5JbmZvKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01hcFtkYXRhSW5mby5JRF0gPSBkYXRhSW5mbztcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhSW5mby5JRCAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fQm90dG9tSUQgPSBkYXRhSW5mby5JRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgR2VuSW5mbyhkYXRhKTogQmFzZUluZm87XHJcbiAgICAgICAgcHJvdGVjdGVkIEdldEluZm88VCBleHRlbmRzIEJhc2VJbmZvPihpZDogbnVtYmVyKTogVCAge1xyXG4gICAgICAgICAgICBpZiAoIWlkIHx8IGlkIDwgMCkgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIEJhc2VJbmZvID0gdGhpcy5tX01hcFtpZF07XHJcbiAgICAgICAgICAgIGlmICghQmFzZUluZm8pICB7XHJcbiAgICAgICAgICAgICAgICBCYXNlSW5mbyA9IHRoaXMubV9NYXBbdGhpcy5tX0JvdHRvbUlEXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQmFzZUluZm8pICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQmFzZUluZm8gYXMgVDtcclxuICAgICAgICAgICAgfSBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5ZJROaVsOe7hFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBHZXRJRExpc3QoKTogQXJyYXk8bnVtYmVyPiAge1xyXG4gICAgICAgICAgICB2YXIgbWFwOiB7IFtJRDogbnVtYmVyXTogQmFzZUluZm8gfSA9IHRoaXMubV9NYXA7XHJcbiAgICAgICAgICAgIHZhciBJRExpc3Q6IEFycmF5PG51bWJlcj4gPSBbXVxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFwKSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBtYXBba2V5XVxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBJRExpc3QucHVzaChkYXRhLklEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gSURMaXN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQmFzZUluZm8ge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0lEOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGdldCBJRCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0lEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9JRCA9IGRhdGEuSUQgPyBOdW1iZXIoZGF0YS5JRCkgOiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbU1hbmFnZXIgZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX01ncjogSXRlbU1hbmFnZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBNZ3IoKTogSXRlbU1hbmFnZXIge1xyXG4gICAgICAgIGlmICghSXRlbU1hbmFnZXIuZ19NZ3IpIHtcclxuICAgICAgICAgICAgSXRlbU1hbmFnZXIuZ19NZ3IgPSBuZXcgSXRlbU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEl0ZW1NYW5hZ2VyLmdfTWdyO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJJdGVtSW5mb1wiKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBHZW5JbmZvKGRhdGE6IGFueSk6IEdhbWVNYW5hZ2VyLkJhc2VJbmZvIHtcclxuICAgICAgICByZXR1cm4gbmV3IEl0ZW1JbmZvKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumBk+WFt+S7t+agvFxyXG4gICAgICogQHBhcmFtIGlkIOmBk+WFt0lEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQcmljZShpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgaW5mbzogSXRlbUluZm8gPSB0aGlzLkdldEluZm88SXRlbUluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uUHJpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiOt+WPlklE5pWw57uEXHJcbiAgICAqL1xyXG4gICAgcHVibGljIEdldFNlbGxJdGVtSURMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHZhciBtYXAgPSB0aGlzLm1fTWFwO1xyXG4gICAgICAgIHZhciBJRExpc3Q6IEFycmF5PG51bWJlcj4gPSBbXVxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBtYXApIHtcclxuICAgICAgICAgICAgdmFyIGRhdGE6IGFueSA9IG1hcFtrZXldXHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbUluZm86IEl0ZW1JbmZvID0gZGF0YSBhcyBJdGVtSW5mbztcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtSW5mby5QcmljZSA+PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIElETGlzdC5wdXNoKGRhdGEuSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBJRExpc3Q7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEl0ZW1JbmZvIGV4dGVuZHMgR2FtZU1hbmFnZXIuQmFzZUluZm8ge1xyXG4gICAgcHJpdmF0ZSBtX01vZGVsTmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0V4dGVuZElEOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fUHJpY2U6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vZGVsTmFtZSArIHRoaXMubV9FeHRlbmRJRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUHJpY2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1ByaWNlO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5tX01vZGVsTmFtZSA9IGRhdGEuTW9kZWxOYW1lID8gZGF0YS5Nb2RlbE5hbWUgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9FeHRlbmRJRCA9IGRhdGEuRXh0ZW5kSUQgPyBkYXRhLkV4dGVuZElEIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fUHJpY2UgPSBkYXRhLlByaWNlID8gTnVtYmVyKGRhdGEuUHJpY2UpIDogMDtcclxuICAgIH1cclxufSIsImltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbiAvKipcclxuICog6KGo546w55So55qE5a+56LGhXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEFuaW1PYmpcclxue1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIik7XHJcbiAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgZm9yKCBsZXQgY291bnQgPTA7Y291bnQgPCAzMDsrK2NvdW50IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1Db2luLG1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2VuQW5pbU9iajxUIGV4dGVuZHMgQmFzZUFuaW1PYmo+KCBhbmltQ2xhc3M6e25ldyAobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSxtb2RlbDpMYXlhLlNwcml0ZTNEICk6VFxyXG4gICAge1xyXG4gICAgICAgIHZhciBhbmltT2JqID0gTGF5YS5Qb29sLmdldEl0ZW0oYW5pbUNsYXNzLk5hbWUoKSk7XHJcbiAgICAgICAgaWYoYW5pbU9iaj09bnVsbClcclxuICAgICAgICAgICAgYW5pbU9iaiA9IG5ldyBhbmltQ2xhc3MoYW5pbUNsYXNzLk5hbWUoKSxtb2RlbCk7XHJcbiAgICAgICAgcmV0dXJuIGFuaW1PYmo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFic3RyYWN0IGNsYXNzIEJhc2VBbmltT2JqIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG4gICAge1xyXG4gICAgICAgIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5TY2VuZU9iai5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX0ZyYW1lRnVuYylcclxuICAgICAgICB9XHJcbiAgICAgICAgTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX05hbWU6c3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLm9uKExheWEuRXZlbnQuUkVNT1ZFRCx0aGlzLHRoaXMuX0xlYXZlU3RhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lRnVuYygpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0p1ZGdlQ29tcGxldGUoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0ZyYW1lTG9naWNGdW5jKCk7XHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuO1xyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKHRoaXMsdGhpcy5fRnJhbWVGdW5jKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZvcmNlTGVhdmVTdGFnZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBBbmltQ29pbiBleHRlbmRzIEJhc2VBbmltT2JqXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkFuaW1Db2luXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFNldFRhcmdldCggdGFyZ2V0OkxheWEuU3ByaXRlM0QgKSAgICBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgc3VwZXIuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFyZ2V0OkxheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIobmFtZSxtb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lTG9naWNGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBvc2l0aW9uID0gdGhpcy5fVGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBhZGRQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKGFkZFBTLDAuMSxhZGRQUyk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5hZGQoYWRkUFMscG9zaXRpb24scG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRMb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMubmFtZSx0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGRpc0RpciA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGRpc0Rpcik7XHJcbiAgICAgICAgICAgIGlmKCBMYXlhLlZlY3RvcjMuc2NhbGFyTGVuZ3RoU3F1YXJlZChkaXNEaXIpPDAuMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgeyBQbGF5ZXJDb250cm9sZXIgfSBmcm9tIFwiLi8uLi9HYW1lL1BsYXllckN0cmxlclwiXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vSW5wdXRcIjtcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIjtcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyQnVmZiB7XHJcbiAgICBleHBvcnQgY2xhc3MgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBUeXBlOiBJdGVtLkl0ZW1UeXBlO1xyXG4gICAgICAgIElkeDogbnVtYmVyO1xyXG4gICAgICAgIFBsYXllcjogUGxheWVyO1xyXG4gICAgICAgIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdlbkJ1ZmZNb2QoKSAge1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTW9kID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVTcGhlcmUoMC4zLCA4LCA4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICAgICAgLy/liJvlu7rmqKHlnovmmL7npLrlr7nosaFcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQWRkQnVmZk1vZGUodGhpcy5fQnVmZk1vZCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkZseSgpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9TdGFydEZ1bmMgIT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1N0YXJ0RnVuYygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBDb21wbGV0ZSgpICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkNvbXBsZXRlQnVmZih0aGlzLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZNb2QuZGVzdHJveSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL1xyXG4gICAgICAgIHByb3RlY3RlZCBfQnVmZk1vZDogTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBJdGVtLkl0ZW1UeXBlLCBpZHg6IG51bWJlciA9IDApICB7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuSWR4ID0gaWR4O1xyXG4gICAgICAgICAgICB0aGlzLkdlbkJ1ZmZNb2QoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfU3RhcnRGdW5jOiAoKSA9PiB2b2lkO1xyXG4gICAgfVxyXG4gICAgY2xhc3MgRmx5QnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmICB7XHJcbiAgICAgICAgU3BlZWQ6IG51bWJlcjtcclxuICAgICAgICBGbG9vcjogbnVtYmVyO1xyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9IHRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlIC8gMiAqIHRoaXMuRmxvb3I7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KCkpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNldFNhZmVQUyh0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIgPSAwLjEsIGZsb29yOiBudW1iZXIgPSAxMCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbS5JdGVtVHlwZS5Sb3BlLCBQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXIgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fRmluYWxaIC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24ueiA+IC0wLjIpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuR2V0U3RlcEJ5TG9jYXRpb24odGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGFzcyBQcm90ZWN0QnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmICB7XHJcbiAgICAgICAgVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6IG51bWJlciAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTogbnVtYmVyID0gMCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbS5JdGVtVHlwZS5Qcm90ZWN0LCBQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICAvL3RoaXMuVGltZSA9IEFQUC5TY2VuZU1hbmFnZXIuQ3VyRGlyLkdhbWVUaW1lK3RpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIGlmKHRoaXMuVGltZTxBUFAuU2NlbmVNYW5hZ2VyLkN1ckRpci5HYW1lVGltZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFZpbmVCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBDb3VudFRpbWU6IG51bWJlcjtcclxuICAgICAgICBJbnB1dERpcjogYm9vbGVhbjtcclxuICAgICAgICBTdGFydChwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLCB0aGlzLl9JbnB1dCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDb21wbGV0ZSgpICB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoY291bnRUaW1lOiBudW1iZXIgPSAzLCBpbnB1dERpcjogYm9vbGVhbiA9IHRydWUpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW0uSXRlbVR5cGUuVmluZSwgMCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRUaW1lID0gY291bnRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklucHV0RGlyID0gaW5wdXREaXI7XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9UaW1lO1xyXG4gICAgICAgIHByaXZhdGUgX0lucHV0KGlzUmlnaHQ6IGJvb2xlYW4pICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLklucHV0RGlyID09IGlzUmlnaHQpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklucHV0RGlyID0gIXRoaXMuSW5wdXREaXI7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuQ291bnRUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvdW50VGltZSA8IDApICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1Nob3dHYW1lSW5mbygpICB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvdW50VGltZSA8IDApXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gXCJcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuSW5wdXREaXIgPT0gdHJ1ZSA/IFwiUmlnaHRcIiA6IFwiTGVmdFwiO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiZXhwb3J0IG1vZHVsZSBDaGFyYWN0ZXJcclxue1xyXG4gICAgZXhwb3J0IGVudW0gQW5pbUVudW1cclxuICAgIHtcclxuICAgICAgICBTdGFuZCxcclxuICAgICAgICBGbHksXHJcbiAgICAgICAgRmFsbCxcclxuICAgICAgICBKdW1wLFxyXG4gICAgICAgIEp1bXBkb3duXHJcbiAgICB9XHJcbiAgICB2YXIgQW5pbVR5cGU6e1tuYW1lOm51bWJlcl06c3RyaW5nfTtcclxuICAgIEFuaW1UeXBlID0ge307XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5TdGFuZF0gPSBcInN0YW5kXCI7XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5KdW1wXSA9IFwianVtcHVwXCI7XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5KdW1wZG93bl0gPSBcImp1bXBkb3duXCI7XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5GbHldID0gXCJmbHlcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkZhbGxdID0gXCJmYWxsXCI7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUGxheWVyQW5pbU5hbWUoIG5hbWVFbnVtOkFuaW1FbnVtICk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEFuaW1UeXBlW25hbWVFbnVtXTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIENoYXJhY3RlckFuaW1hdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0FuaW1hdG9yOkxheWEuQW5pbWF0b3I7XHJcbiAgICAgICAgY29uc3RydWN0b3IoIFBsYXllckNoYXJhY3RlcjpMYXlhLlNwcml0ZTNEIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9BbmltYXRvciA9IFBsYXllckNoYXJhY3Rlci5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBTd2l0Y2hTdGF0ZSggQW5pbUVudW0gKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbi8v5ri45oiP5Lit55u45py6XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDYW1lcmEgZXh0ZW5kcyBMYXlhLkNhbWVyYVxyXG57XHJcbiAgICBDdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXI7XHJcbiAgICBCYXNlUFM6TGF5YS5WZWN0b3IzO1xyXG4gICAgRHluYW1pY1BTOkxheWEuVmVjdG9yMztcclxuICAgIFBsYXllcjpQbGF5ZXI7XHJcblxyXG4gICAgU2V0UGxhZXIocGxheWVyOlBsYXllcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgUmVzZXQoRHluYW1pY1BTOkxheWEuVmVjdG9yMyxiYXNlUFM6TGF5YS5WZWN0b3IzLHBsYXllcjpQbGF5ZXIgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIHRoaXMuQmFzZVBTID0gYmFzZVBTO1xyXG4gICAgICAgIHRoaXMuRHluYW1pY1BTID0gRHluYW1pY1BTO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6h566X5bm26K6+572u5L2N572uXHJcbiAgICBDb3VudFNldFBTKClcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3UFMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMuQmFzZVBTLHRoaXMuRHluYW1pY1BTLG5ld1BTKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgc2V0IFBvc2l0aW9uKHBzOkxheWEuVmVjdG9yMylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTpMYXlhLlZlY3RvcjNcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7ICAgXHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN0cmxlciA9IG5ldyBHYW1lQ2FtZXJhQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuRHluYW1pY1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgLy90aGlzLnRpbWVyTG9vcCgxLHRoaXMuQ3RybGVyLHRoaXMuQ3RybGVyLlVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX1VwZGF0ZSk7XHJcbiAgICAgICAgdmFyIHNreUJveDpMYXlhLlNreUJveCA9bmV3IExheWEuU2t5Qm94KCk7XHJcbiAgICAgICAgdGhpcy5jbGVhckZsYWcgPSBMYXlhLkJhc2VDYW1lcmEuQ0xFQVJGTEFHX1NLWTtcclxuICAgICAgICAvL0NhbWVyYS5za3lSZW5kZXJlciA9IHNreUJveC5fcmVuZGVyO1xyXG4gICAgICAgIC8vdGhpcy5zayA9IHNreUJveDtcclxuICAgICAgICAgLy9wYXRoXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9VcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3RybGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBCYXNlR2FtZUNhbWVyYUN0cmxlclxyXG57XHJcbiAgICBDYW1lcmE6R2FtZUNhbWVyYTtcclxuICAgIEN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIGFic3RyYWN0IFVwZGF0ZSgpOnZvaWQ7XHJcbiAgICBjb25zdHJ1Y3RvciggY2FtZXJhOkdhbWVDYW1lcmEsY3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbCApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoY3RybGVyID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgIGN0cmxlciA9IHRoaXM7IFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICB0aGlzLkN0cmxlciA9IGN0cmxlcjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR2FtZUNhbWVyYUN0cmxlciBleHRlbmRzIEJhc2VHYW1lQ2FtZXJhQ3RybGVyXHJcbntcclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5DYW1lcmE9PW51bGx8fCB0aGlzLkNhbWVyYS5QbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIENhbWVyYVBTID0gdGhpcy5DYW1lcmEuRHluYW1pY1BTO1xyXG4gICAgICAgIHZhciBQbGF5ZXJQUyA9IHRoaXMuQ2FtZXJhLlBsYXllci5fTG9naWNQb3NpdGlvbjtcclxuICAgICAgICBDYW1lcmFQUy54ID0gMDtcclxuICAgICAgICB2YXIgZGlzTnVtID0gUGxheWVyUFMueSAtIENhbWVyYVBTLnk7XHJcbiAgICAgICAgdmFyIGRpc1pOdW0gPSBQbGF5ZXJQUy56IC0gQ2FtZXJhUFMuejtcclxuICAgICAgICBpZihNYXRoLmFicyhkaXNOdW0pPjAuMDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy55ICs9IGRpc051bSowLjE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCBNYXRoLmFicyhkaXNaTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueiArPSBkaXNaTnVtKjAuMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQ2FtZXJhLkR5bmFtaWNQUyA9Q2FtZXJhUFM7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuQ291bnRTZXRQUygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNhbWVyYTpHYW1lQ2FtZXJhLGN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlciA9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoY2FtZXJhLGN0cmxlcik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7IFBsYXllckJ1ZmYgfSBmcm9tIFwiLi9CdWZmXCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHsgQW5pbU9iaiB9IGZyb20gXCIuLy4uL0dhbWUvQW5pbU9ialwiXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IHsgUGxheWVyQ29udHJvbGVyIH0gZnJvbSBcIi4vUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi9JbnB1dFwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxudHlwZSBCYXNlUGxheWVyQnVmZiA9IFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmY7XHJcbnR5cGUgQW5pbUNvaW4gPSBBbmltT2JqLkFuaW1Db2luXHJcblxyXG5leHBvcnQgbW9kdWxlIEl0ZW0ge1xyXG4gICAgLy/nianlk4HmoIfor4ZcclxuICAgIGNvbnN0IEl0ZW1JRDogc3RyaW5nID0gXCJJdGVtXCI7XHJcbiAgICBjb25zdCBNb2RlbElEOiBzdHJpbmcgPSBcIk1vZGVsXCJcclxuICAgIGV4cG9ydCBlbnVtIE1vZGVsVHlwZSAge1xyXG4gICAgICAgIENvaW5cclxuICAgIH1cclxuICAgIGV4cG9ydCBlbnVtIEl0ZW1UeXBlIHtcclxuICAgICAgICBOb25lID0gMCxcclxuICAgICAgICBFbXB0eSxcclxuICAgICAgICBSb2NrLFxyXG4gICAgICAgIFRob3JuLFxyXG4gICAgICAgIFZpbmUsXHJcbiAgICAgICAgUHJvdGVjdCA9IDExLFxyXG4gICAgICAgIEhvbHlQcm90ZWN0LFxyXG4gICAgICAgIEZseSxcclxuICAgICAgICBSb3BlLFxyXG4gICAgICAgIENvbGxlY3RvcixcclxuICAgICAgICBDb2luID0gMjAsXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIExpbmVJdGVtSW5mbyAge1xyXG4gICAgICAgIFR5cGU6IEl0ZW1UeXBlO1xyXG4gICAgICAgIE51bWJlcjogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGU6IEl0ZW1UeXBlLCBudW06IG51bWJlcikgIHtcclxuICAgICAgICAgICAgdGhpcy5UeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5OdW1iZXIgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v54mp5ZOB5biD5bGAXHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxheW91dCAge1xyXG4gICAgICAgIFJld2FyZExpc3Q6IEFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIEJhcnJpZXJMaXN0OiBBcnJheTxMYXlJdGVtTWdyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0ID0gbmV3IEFycmF5PExheUl0ZW1NZ3I+KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDEsIEl0ZW1UeXBlLkVtcHR5LCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDUsIEl0ZW1UeXBlLlJvY2ssIDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMiwgSXRlbVR5cGUuVGhvcm4sIDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMiwgSXRlbVR5cGUuVmluZSwgMTApKVxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMSwgSXRlbVR5cGUuQ29pbikpXHJcblxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMSwgSXRlbVR5cGUuRmx5LCAyMCkpXHJcblxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMSwgSXRlbVR5cGUuQ29sbGVjdG9yKSlcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsIDEsIEl0ZW1UeXBlLlByb3RlY3QpKTtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsIDEsIEl0ZW1UeXBlLkhvbHlQcm90ZWN0KSk7XHJcblxyXG4gICAgICAgICAgICBSZXNldEl0ZW1GYWN0b3J5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWtlTGluZVJld2FyZChmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vciwgdGhpcy5SZXdhcmRMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VMaW5lRGlmZmljdWx0eShmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vciwgdGhpcy5CYXJyaWVyTGlzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWtlSXRlbShmbG9vcjogbnVtYmVyLCBNZ3JMaXN0OiBBcnJheTxMYXlJdGVtTWdyPik6IEFycmF5PExpbmVJdGVtSW5mbz4gIHtcclxuICAgICAgICAgICAgdmFyIHJldHVybkluZm8gPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBsaXN0SWR4ID0gMDsgbGlzdElkeCA8IE1nckxpc3QubGVuZ3RoOyArK2xpc3RJZHgpICB7XHJcbiAgICAgICAgICAgICAgICBNZ3JMaXN0W2xpc3RJZHhdLk9uRmxvb3IoZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm86IExpbmVJdGVtSW5mbyA9IE1nckxpc3RbbGlzdElkeF0uVGFrZUl0ZW1zKGZsb29yKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLk51bWJlciA+IDApICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuSW5mby5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5JbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+ivpeWvueixoeeahOWIhuW4g+Wbvuavj+WxguetieamgueOh+WIhuW4g1xyXG4gICAgZXhwb3J0IGNsYXNzIExheUl0ZW1NZ3IgIHtcclxuICAgICAgICAvL+mBk+WFt+exu+Wei1xyXG4gICAgICAgIEl0ZW1UeXBlOiBJdGVtVHlwZTtcclxuICAgICAgICAvL+W9k+WJjeWxguaVsFxyXG4gICAgICAgIEN1ckZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgLy/ljLrpl7TliIbluIPmgLvmlbDph49cclxuICAgICAgICBJdGVtTnVtOiBudW1iZXI7XHJcbiAgICAgICAgLy/lvIDlp4vliIbluIPnmoTlsYLmlbBcclxuICAgICAgICBTdGFydEZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgLy/liIbluIPljLrpl7RcclxuICAgICAgICAvL+W3suiOt+WPluWxguagh+iusFxyXG4gICAgICAgIFRvdWNoZWRGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIEl0ZW1MaXN0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8vcmFuZ2XljLrpl7TojIPlm7RcclxuICAgICAgICAvL251bSDljLrpl7TojIPlm7TmlbDph49cclxuICAgICAgICAvL2l0ZW1UeXBlIOeUn+S6p+eahOmBk+WFt+exu+Wei1xyXG4gICAgICAgIC8vc3RhcnRGbG9vciDku47lk6rkuIDooYzlvIDlp4vmipXmjrdcclxuICAgICAgICBjb25zdHJ1Y3RvcihyYW5nZTogbnVtYmVyLCBudW06IG51bWJlciwgaXRlbVR5cGU6IEl0ZW1UeXBlLCBzdGFydEZsb29yOiBudW1iZXIgPSAxKSAge1xyXG4gICAgICAgICAgICBpZiAobnVtID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIG51bSA9IDE7XHJcbiAgICAgICAgICAgIGlmIChzdGFydEZsb29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIC8v56ysMOWxguaYr+eOqeWutui1t+atpeS9jee9rlxyXG4gICAgICAgICAgICAgICAgc3RhcnRGbG9vciA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5DdXJGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbU51bSA9IG51bTtcclxuICAgICAgICAgICAgLy/liIbluIPlm74g54mp5ZOBaWR4OuWxguaVsFxyXG4gICAgICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5PG51bWJlcj4ocmFuZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuR2VuTWFwKHN0YXJ0Rmxvb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBSYW5nZSgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbUxpc3QubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WxguabtOaWsOWHveaVsFxyXG4gICAgICAgIE9uRmxvb3IoZmxvb3I6IG51bWJlcikgIHtcclxuICAgICAgICAgICAgaWYgKGZsb29yIDwgdGhpcy5Ub3VjaGVkRmxvb3IpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGZsb29yID49IHRoaXMuU3RhcnRGbG9vciArIHRoaXMuUmFuZ2UpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlJ/miJDliIbluIPlm75cclxuICAgICAgICBHZW5NYXAoc3RhcnRGbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0Rmxvb3IgPSBzdGFydEZsb29yO1xyXG4gICAgICAgICAgICB2YXIgaXRlbU51bSA9IHRoaXMuSXRlbU51bTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY291bnQ6IG51bWJlciA9IDA7IGNvdW50IDwgdGhpcy5JdGVtTGlzdC5sZW5ndGg7ICsrY291bnQpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkl0ZW1MaXN0W2NvdW50XSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGl0ZW1MaXN0ID0gdGhpcy5JdGVtTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgY291bnROdW06IG51bWJlciA9IDA7IGNvdW50TnVtIDwgaXRlbU51bTsgKytjb3VudE51bSkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBJdGVtRmxvb3I6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuUmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JdGVtTGlzdFtJdGVtRmxvb3JdICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VJdGVtcyhmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpbmVJdGVtSW5mbyh0aGlzLkl0ZW1UeXBlLCB0aGlzLkl0ZW1MaXN0W2Zsb29yIC0gdGhpcy5TdGFydEZsb29yXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBSZXNldDogYm9vbGVhbjtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZXNldEl0ZW1GYWN0b3J5KCk6IHZvaWQgIHtcclxuICAgICAgICBpZiAoUmVzZXQpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIHRoZUtleSBpbiBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZSkgIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBwYXJzZUludCh0aGVLZXkpO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA8PSAyKSAge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgY291bnQgPSAwOyBjb3VudCA8IDMwOyArK2NvdW50KSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXM6IGFueSA9IEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW06IFN0ZXAgPSBuZXcgY2xhcyhudWxsKTtcclxuICAgICAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKEl0ZW1JRCArIHRoZUtleSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gU3RlcEl0ZW1GYWN0b3J5KGl0ZW1UeXBlOiBJdGVtVHlwZSwgU3RlcCkgIHtcclxuICAgICAgICBpZiAoU3RlcCA9PSB1bmRlZmluZWQpICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKSAge1xyXG4gICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpdGVtXHJcbiAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7XHJcbiAgICAgICAgaXRlbSA9IG9ialBvb2wuZ2V0SXRlbShJdGVtSUQgKyBpdGVtVHlwZSlcclxuICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBpZiAoR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdICE9IG51bGwgJiYgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdICE9IHVuZGVmaW5lZCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGFzOiBhbnkgPSBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV07XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IGNsYXMoU3RlcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBTdGVwSXRlbShpdGVtVHlwZSwgU3RlcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLlN0ZXAgPSBTdGVwO1xyXG4gICAgICAgIGl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN0ZXBJdGVtICB7XHJcbiAgICAgICAgU3RlcDogU3RlcDtcclxuICAgICAgICBJdGVtVHlwZTogSXRlbVR5cGU7XHJcbiAgICAgICAgTW9kZWw6IExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0FuaW1hdG9yOiBMYXlhLkFuaW1hdG9yO1xyXG4gICAgICAgIGdldCBJc0RpZmZpY3VsdHkoKTogYm9vbGVhbiAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtVHlwZSA+IDAgJiYgdGhpcy5JdGVtVHlwZSA8IDEwICYmIHRoaXMuSXRlbVR5cGUgIT0gSXRlbVR5cGUuVmluZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Yik5pat6IO95LiN6IO96LWw5LiK5Y67XHJcbiAgICAgICAgZ2V0IElzRm9yYmlkZW4oKTogYm9vbGVhbiAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtVHlwZSA9PSBJdGVtVHlwZS5Sb2NrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mHjee9rlxyXG4gICAgICAgIFJlc2V0SXRlbSgpICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5fSW5pdEl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLlNldEVuYWJsZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCAhPSBudWxsKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGVwLmFkZENoaWxkKHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBTZXRFbmFibGUoKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUHV0SXRlbSA9IGZ1bmN0aW9uIChpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmUpICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVzUGF3bigpO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXAuU3RlcEl0ZW0gPSBTdGVwSXRlbUZhY3RvcnkoaXRlbVR5cGUsIHRoaXMuU3RlcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+a2iOmZpCDmioroh6rlt7HlrZjlhaXlhoXlrZjmsaBcclxuICAgICAgICBEZXNQYXduKCkgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTW9kZWwgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMuTW9kZWwucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB2YXIgb2JqUG9vbCA9IExheWEuUG9vbDsvL0dNLk9ialBvb2w7XHJcbiAgICAgICAgICAgIG9ialBvb2wucmVjb3ZlcihJdGVtSUQgKyB0aGlzLkl0ZW1UeXBlLCB0aGlzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSBwbGF5ZXIgXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuSXRlbVR5cGUpICB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOeqgeegtOS/neaKpFxyXG4gICAgICAgICAqIEByZXR1cm5zIOaYr+WQpuiiq+eqgeegtFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEJyZWFrUHJvdGVjdChwbGF5ZXI6IFBsYXllcik6IGJvb2xlYW4gIHtcclxuICAgICAgICAgICAgdmFyIGN1ckJ1ZmYgPSBwbGF5ZXIuR2V0QnVmZihQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICBpZiAoY3VyQnVmZikgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY3VyQnVmZi5UeXBlKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUHJvdGVjdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQnVmZi5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuSG9seVByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoaXRlbVR5cGU6IEl0ZW1UeXBlLCBTdGVwOiBTdGVwKSAge1xyXG4gICAgICAgICAgICBpZiAoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKSAge1xyXG4gICAgICAgICAgICAgICAgaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcCA9IFN0ZXA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0luaXRJdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9BZGRCdWZmVG9QbGF5ZXIocGxheWVyOiBQbGF5ZXIsIGJ1ZmY6IEJhc2VQbGF5ZXJCdWZmKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkFkZEJ1ZmYoYnVmZikpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9Jbml0SXRlbU1vZGVsKCkgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTW9kZWwgIT0gbnVsbCAmJiAhdGhpcy5Nb2RlbC5kZXN0cm95ZWQpICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHBzID0gbmV3IExheWEuVmVjdG9yMygwLCBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoLCAwKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX0dlbkl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gcHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSB0aGlzLk1vZGVsLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Nb2RlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9UZXN0R2VudEl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IG51bGw7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5JdGVtVHlwZSkgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9jazpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLk5vbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuSXRlbVR5cGUpICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvY2s6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjMsIDAuMywgMC41KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBSb2NrIGV4dGVuZHMgU3RlcEl0ZW0gIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1vZGVsTnVtID0gMztcclxuICAgICAgICBjb25zdHJ1Y3RvcihTdGVwOiBTdGVwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb2NrLCBTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuTWVzaFNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IDEgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBSb2NrLk1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIE5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMFwiICsgaWR4KVxyXG4gICAgICAgICAgICBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhOYW1lKVxyXG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb2NrXSA9IFJvY2s7XHJcblxyXG4gICAgY2xhc3MgVGhvcm4gZXh0ZW5kcyBTdGVwSXRlbSAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlRob3JuLCBTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpOiB2b2lkICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkJyZWFrUHJvdGVjdChwbGF5ZXIpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFuaW06IExheWEuQW5pbWF0b3IgPSB0aGlzLk1vZGVsLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KFwidG91Y2hcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5UaG9ybl0gPSBUaG9ybjtcclxuXHJcbiAgICBjbGFzcyBQcm90ZWN0IGV4dGVuZHMgU3RlcEl0ZW0gIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Qcm90ZWN0LCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoUHJvdGVjdEJ1ZmYuSWR4KSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLl9BZGRCdWZmVG9QbGF5ZXIocGxheWVyLCBuZXcgUHJvdGVjdEJ1ZmYoMzAwMCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlByb3RlY3RdID0gUHJvdGVjdDtcclxuXHJcbiAgICBjbGFzcyBQcm90ZWN0QnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgc3RhdGljIGdldCBJZHgoKTogbnVtYmVyICB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gdGltZSDmjIHnu63ml7bpl7RcclxuICAgICAgICAgKiBAcGFyYW0gSXNIb2x5IOaYr+WQpue7neWvueaXoOaVjFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6IG51bWJlciA9IDAsIElzSG9seTogYm9vbGVhbiA9IGZhbHNlKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJc0hvbHkgPyBJdGVtVHlwZS5Ib2x5UHJvdGVjdCA6IEl0ZW1UeXBlLlByb3RlY3QsIFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVRpbWUgKyB0aW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UaW1lIDwgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lVGltZSkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsYXNzIEhvbHlQcm90ZWN0IGV4dGVuZHMgU3RlcEl0ZW0gIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Ib2x5UHJvdGVjdCwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fdW50b3VjaGFibGVfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoUHJvdGVjdEJ1ZmYuSWR4KSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLl9BZGRCdWZmVG9QbGF5ZXIocGxheWVyLCBuZXcgUHJvdGVjdEJ1ZmYoMzAwMCwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkhvbHlQcm90ZWN0XSA9IEhvbHlQcm90ZWN0O1xyXG5cclxuICAgIGNsYXNzIENvaW4gZXh0ZW5kcyBTdGVwSXRlbSAge1xyXG4gICAgICAgIC8vVG9Eb1xyXG4gICAgICAgIHByaXZhdGUgbV90b3VjaGVkOiBCb29sZWFuXHJcbiAgICAgICAgRmx5VG9QbGF5ZXIocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHZhciBjb25pbjogQW5pbUNvaW4gPSBBbmltT2JqLkdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1PYmouQW5pbUNvaW4sIHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICBjb25pbi5TZXRUYXJnZXQocGxheWVyKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRHb2xkVW5Mb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkR29sZCgxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2luLCBzdGVwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29pbl0gPSBDb2luO1xyXG5cclxuICAgIGNsYXNzIENvbGxlY3RlciBleHRlbmRzIFN0ZXBJdGVtICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoQ29sbGVjdEJ1ZmYuSWR4KSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgQ29sbGVjdEJ1ZmYoMTAwMDApKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3Rvciwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxICsgTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fYWJzb3JkXzAxXCIpO1xyXG4gICAgICAgICAgICB2YXIgdGhlTW9kZWwgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IHRoZU1vZGVsLmNsb25lKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29sbGVjdG9yXSA9IENvbGxlY3RlcjtcclxuXHJcbiAgICBjbGFzcyBDb2xsZWN0QnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgR2FtZURpcjogR2FtZURpcmVjdG9yO1xyXG4gICAgICAgIENvdW50Rmxvb3I6IG51bWJlcjtcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6IG51bWJlciA9IDApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3RvciwgQ29sbGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lRGlyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpcjtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gdGhpcy5HYW1lRGlyLkdhbWVUaW1lICsgdGltZTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudEZsb29yID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRGbG9vciA9IHRoaXMuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vciAtIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPCB0aGlzLkdhbWVEaXIuR2FtZVRpbWUpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vciAtIHRoaXMuQ291bnRGbG9vciArIDEgPCAwKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpci5HYW1lUGxheS5Mb29wRG9GbG9vclN0ZXAodGhpcy5Db3VudEZsb29yLCB0aGlzLCB0aGlzLkNvdW50Q29pbnMpO1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLkNvdW50Rmxvb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBDb3VudENvaW5zKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIGlmIChzdGVwLlN0ZXBJdGVtLkl0ZW1UeXBlID09IEl0ZW1UeXBlLkNvaW4pICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgQ29pbjogQ29pbiA9IHN0ZXAuU3RlcEl0ZW0gYXMgQ29pbjtcclxuICAgICAgICAgICAgICAgIENvaW4uRmx5VG9QbGF5ZXIodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEZMeSBleHRlbmRzIFN0ZXBJdGVtICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoMCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKG5ldyBGbHlCdWZmKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuRmx5LCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDEgKyBNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5GbHldID0gRkx5O1xyXG5cclxuICAgIGNsYXNzIEZseUJ1ZmYgZXh0ZW5kcyBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmICB7XHJcbiAgICAgICAgU3BlZWQ6IG51bWJlcjtcclxuICAgICAgICBGbG9vcjogbnVtYmVyO1xyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIHZhciB0aW1lOiBudW1iZXIgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5DdXJTdGVwID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IHBsYXllci5DdXJTdGVwLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uLlkgKz0gdGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gcGxheWVyLlBvc2l0aW9uLnogLSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UgLyAyICogdGhpcy5GbG9vcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbHlDdHJsID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJGbHkodGhpcy5TcGVlZCk7XHJcbiAgICAgICAgICAgIGZseUN0cmwuU2V0UGxheWVyKHBsYXllcilcclxuICAgICAgICAgICAgcGxheWVyLkFkZEN0cmxlcihmbHlDdHJsKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQoKSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICBwbGF5ZXIuRmx5UHJlcGFyZSgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIgPSAwLjE1LCBmbG9vcjogbnVtYmVyID0gMTApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkZseSwgUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX0ZpbmFsWiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLnogPiAtMC4yKSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5Qb3BDdHJsZXIoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFJvcGUgZXh0ZW5kcyBTdGVwSXRlbSAge1xyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5HZXRCdWZmKDApKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgUm9wZUJ1ZmYoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5NZXNoU3ByaXRlM0QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjEsIDAuNSwgMC4xKSlcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlJvcGVdID0gUm9wZTtcclxuXHJcbiAgICBjbGFzcyBSb3BlQnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIEZsb29yOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6IG51bWJlciAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX0ZpbmFsWiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLnogPiAtMC4yKSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5FbmQoc3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgRW5kKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9IHRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlIC8gMiAqIHRoaXMuRmxvb3I7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsIHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlciA9IDAuMSwgZmxvb3I6IG51bWJlciA9IDEwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb3BlLCBQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpc1JpZ2h0OiBib29sZWFuKTogdm9pZCAge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VGbG9vciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3JMaW5lO1xyXG4gICAgICAgICAgICBpZiAoY2xvc2VGbG9vci5GbG9vck51bSAlIDIgIT0gdGhpcy5fRmluYWxMb2NhdGlvbi5ZICUgMikgIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlRmxvb3IgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldEZsb29yQnlGbG9vcihjbG9zZUZsb29yLkZsb29yTnVtICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBjbG9zZUZsb29yLkdldFN0ZXAodGhpcy5fRmluYWxMb2NhdGlvbi5YKTtcclxuICAgICAgICAgICAgaWYgKGlzUmlnaHQpXHJcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICAgICAgaWYgKHN0ZXAuU3RlcEl0ZW0uSXNGb3JiaWRlbikgIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuRW5kKHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBWaW5lIGV4dGVuZHMgU3RlcEl0ZW0gIHtcclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHZhciBjdXJCdWZmOiBCYXNlUGxheWVyQnVmZiA9IHBsYXllci5HZXRCdWZmKDApO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuQnJlYWtQcm90ZWN0KHBsYXllcikpICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZihuZXcgVmluZUJ1ZmYoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlZpbmUsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSArIE1hdGgucmFuZG9tKCkgKiAyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IElkeCA9PSAxID8gcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIikgOiBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpXHJcbiAgICAgICAgICAgIC8vdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIilcclxuICAgICAgICAgICAgLy92YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpXHJcblxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlZpbmVdID0gVmluZTtcclxuXHJcbiAgICBjbGFzcyBWaW5lQnVmZiBleHRlbmRzIFBsYXllckJ1ZmYuQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBDb3VudFRpbWU6IG51bWJlcjtcclxuICAgICAgICBJbnB1dERpcjogYm9vbGVhbjtcclxuICAgICAgICBTdGFydChwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICAgICAgc3VwZXIuU3RhcnQocGxheWVyKVxyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLCB0aGlzLl9JbnB1dCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBDb21wbGV0ZSgpICB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgc3VwZXIuQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoY291bnRUaW1lOiBudW1iZXIgPSA0LCBpbnB1dERpcjogYm9vbGVhbiA9IHRydWUpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlZpbmUsIDApO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50VGltZSA9IGNvdW50VGltZTtcclxuICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9IGlucHV0RGlyO1xyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZTtcclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpbnB1dERpcjogYm9vbGVhbikgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuSW5wdXREaXIgPT0gaW5wdXREaXIpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklucHV0RGlyID0gIXRoaXMuSW5wdXREaXI7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuQ291bnRUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvdW50VGltZSA8PSAwKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9TaG93R2FtZUluZm8oKSAge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzogc3RyaW5nO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Db3VudFRpbWUgPD0gMClcclxuICAgICAgICAgICAgICAgIGluZm8gPSBcIlwiO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gdGhpcy5JbnB1dERpciA9PSB0cnVlID8gXCJSaWdodFwiIDogXCJMZWZ0XCI7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2hvd0lucHV0SW5mbyhpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBtb2R1bGUgR2FtZVN0cnVjdFxyXG57XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0SW5mbyB7XHJcbiAgICAgICAgQXVkaW9PbjogYm9vbGVhbjtcclxuICAgICAgICBPUElzUmlnaHQ6IGJvb2xlYW47XHJcbiAgICAgICAgVGV4dEluZm86IHN0cmluZztcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5BdWRpb09uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5PUElzUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlRleHRJbmZvID0gXCJIZWxsbyBcXG4gSGVsbG9cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTUxvY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgZ2V0IFgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBYKHg6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzBdID14O1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgWSgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0FyclsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFkoeTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnJbMV0gPSB5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9BcnI6QXJyYXk8bnVtYmVyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggeDpudW1iZXIseTpudW1iZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyID0gW3gseV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IHZhciBJdGVtRGljdFR5cGU6e1tJdGVtVHlwZTpudW1iZXJdOmFueX07XHJcbiAgICBJdGVtRGljdFR5cGUgPSB7IH07XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog6L6T5YWl566h55CG55u45YWzXHJcbiAqL1xyXG5pbXBvcnQgR2FtZVNjZW5lUGxheSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheVwiXHJcbmV4cG9ydCBtb2R1bGUgSW5wdXRcclxue1xyXG4vL+WfuuehgOi+k+WFpeaOp+WItuWZqFxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVJbnB1dFxyXG57XHJcbiAgICAvL+WFrOaciVxyXG4gICAgTmV4dElucHV0OkJhc2VHYW1lSW5wdXQ7XHJcbiAgICBhYnN0cmFjdCBJbnB1dChpc1JpZ2h0OmJvb2xlYW4pO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBpbnB1dCA6QmFzZUdhbWVJbnB1dCA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGlucHV0ID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuTmV4dElucHV0ID0gaW5wdXQ7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge31cclxuICAgIENsZWFyKCl7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRElZSW5wdXQgZXh0ZW5kcyBCYXNlR2FtZUlucHV0XHJcbntcclxuICAgIElucHV0KGlzUmlnaHQ6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9MaXN0ZW5lcilcclxuICAgICAgICAgICAgdGhpcy5fTGlzdGVuZXIuY2FsbCh0aGlzLl9Pd25lcixpc1JpZ2h0KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX093bmVyOmFueTtcclxuICAgIHByaXZhdGUgX0xpc3RlbmVyOihpc3Jpbmc6Ym9vbGVhbik9PnZvaWQ7XHJcbiAgICBjb25zdHJ1Y3Rvcihvd25lcjphbnkgPSBudWxsLGxpc3RlbmVyOihpc3Jpbmc6Ym9vbGVhbik9PnZvaWQgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fT3duZXIgPSBvd25lcjtcclxuICAgICAgICB0aGlzLl9MaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBOb3JtR2FtZUlucHV0IGV4dGVuZHMgQmFzZUdhbWVJbnB1dFxyXG57XHJcbiAgICBHYW1lRGlyOkdhbWVTY2VuZVBsYXk7XHJcbiAgICBfRGlydHk6Ym9vbGVhbjtcclxuICAgIF9Jc1JpZ2h0OmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvciggZGlyOkdhbWVTY2VuZVBsYXksaW5wdXQ6QmFzZUdhbWVJbnB1dCA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGlucHV0KTtcclxuICAgICAgICB0aGlzLkdhbWVEaXIgPSBkaXI7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9Jc1JpZ2h0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBJbnB1dCggaXNSaWdodDpib29sZWFuIClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMuR2FtZURpci5Nb3ZlU3RlcChpc1JpZ2h0KTtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fSXNSaWdodCA9IGlzUmlnaHQ7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0RpcnR5JiZ0aGlzLkdhbWVEaXIuUGxheWVyLkJhc2VDdHJsZXIuVGltZTw9MC4xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lRGlyLk1vdmVTdGVwKHRoaXMuX0lzUmlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIENsZWFyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eT1mYWxzZTtcclxuICAgIH1cclxufVxyXG59XHJcbiIsImltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG5cclxuIC8qKuS9nOiAhTpNb1xyXG4gKuWcuuaZr+WGheWvueixoSBcclxuICovXHJcbi8v566h55CG5LiA5pW06KGMXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdW50TGluZSBleHRlbmRzIExheWEuU3ByaXRlM0Rcclxue1xyXG4gICAgTGF5T3V0RGlydHk6Ym9vbGVhbjtcclxuICAgIExpbmVJZHg6bnVtYmVyO1xyXG4gICAgRmxvb3JOdW06bnVtYmVyO1xyXG4gICAgU3RlcExpc3Q6U3RlcFtdO1xyXG4gICAgTG9naWNMZW5ndGg6bnVtYmVyO1xyXG4gICAgU3RlcEl0ZW06U3RlcEl0ZW07XHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+6I635Y+W5pi+56S65Ye65p2l55qE56ys5Yeg5Liq5bmz5Y+wXHJcbiAgICBHZXRTdGVwKGlkeDpudW1iZXIpOlN0ZXBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TdGVwTGlzdFtpZHggKyAxXTtcclxuICAgIH1cclxuICAgIC8v6K6+572u5q+P5bGCXHJcbiAgICBTZXRMaW5lKCBmbG9vcjpudW1iZXIgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkZsb29yTnVtID0gZmxvb3I7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgdmFyIHN0ZXBMZW5ndGggPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgIHZhciBzdGVwRGlzdGFuY2U9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZTtcclxuICAgICAgICBuZXdQUy55ID0gc3RlcExlbmd0aCpmbG9vcjtcclxuICAgICAgICBuZXdQUy56ID0gLXN0ZXBEaXN0YW5jZS8yICpmbG9vcjtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHZhciBzdGVwQXJyOlN0ZXBbXSA9IHRoaXMuU3RlcExpc3Q7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHN0YXJ0WCA9IDAgLSBzdGVwQXJyLmxlbmd0aC8yICogc3RlcERpc3RhbmNlO1xyXG4gICAgICAgIGlmKHRoaXMuSnVnZUlzTGVzc0xpbmUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBzdGVwRGlzdGFuY2UvMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICBmb3IoIHZhciBjb2x1bW4gPTAgO2NvbHVtbjxzdGVwQXJyLmxlbmd0aDsrK2NvbHVtbiApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3U3RlcDpTdGVwID0gc3RlcEFycltjb2x1bW5dO1xyXG4gICAgICAgICAgICB2YXIgc3RlcFZlY3RvciA9IG5ld1N0ZXAuUG9zaXRpb247XHJcbiAgICAgICAgICAgIHN0ZXBWZWN0b3IueCA9IHN0YXJ0WDtcclxuICAgICAgICAgICAgaWYodGhpcy5fU2V0ZWQmJihjb2x1bW4gPT0gMHx8Y29sdW1uPnRoaXMuTG9naWNMZW5ndGgpKVxyXG4gICAgICAgICAgICAgICAgbmV3U3RlcC5SZXNldFN0ZXAoc3RlcFZlY3Rvcix0cnVlKVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBuZXdTdGVwLlJlc2V0U3RlcChzdGVwVmVjdG9yKVxyXG4gICAgICAgICAgICBzdGFydFggKz0gc3RlcERpc3RhbmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9TZXRlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHN0ZXBBcnJbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc3RlcEFycltzdGVwQXJyLmxlbmd0aCAtMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fU2V0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmKCAhIHRoaXMuSnVnZUlzTGVzc0xpbmUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9naWNMZW5ndGggPSBzdGVwQXJyLmxlbmd0aC0yO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGVwQXJyW3N0ZXBBcnIubGVuZ3RoIC0yXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IHN0ZXBBcnIubGVuZ3RoIC0zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/liKTmlq3mmK/lkKbmlLbnvKnnmoTpgqPlsYJcclxuICAgIEp1Z2VJc0xlc3NMaW5lKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkZsb29yTnVtJTIgIT0gMDtcclxuICAgIH1cclxuICAgIC8v5bCG5q+P5Liq6IqC54K56ZO+5o6l5Yiw5LiL5LiA5bGCXHJcbiAgICBTZXROZXh0Rmxvb3IoIGxhc3RGbG9vcjpNb3VudExpbmUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WIpOaWreaYr+WQpuacieS4pOWktOerr+eCuVxyXG4gICAgICAgIHZhciBoYXZlUG9pbnQgPSBsYXN0Rmxvb3IuTG9naWNMZW5ndGggPnRoaXMuTG9naWNMZW5ndGhcclxuICAgICAgICBmb3IoIHZhciBzdGFydElkeDpudW1iZXIgPSAwO3N0YXJ0SWR4PCB0aGlzLkxvZ2ljTGVuZ3RoOysrc3RhcnRJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGVmdFBhcmVudDpTdGVwID1udWxsO1xyXG4gICAgICAgICAgICB2YXIgcmlnaHRQYXJlbnQ6U3RlcCA9bnVsbDtcclxuICAgICAgICAgICAgaWYoaGF2ZVBvaW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCsxKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGVmdFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4LTEpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHRoaVN0ZXAgPSB0aGlzLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlTdGVwLkxlZnRQYXJlbnQgPSBsZWZ0UGFyZW50O1xyXG4gICAgICAgICAgICBsZWZ0UGFyZW50LlJpZ2h0Q2hpbGQgPSB0aGlTdGVwO1xyXG5cclxuICAgICAgICAgICAgdGhpU3RlcC5SaWdodFBhcmVudCA9IHJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICByaWdodFBhcmVudC5MZWZ0Q2hpbGQgPSB0aGlTdGVwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5pWy56KO5LiA5bGCXHJcbiAgICBCcmVhaygpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2V0ZWQ6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKGxpbmVJZHg6bnVtYmVyLGZsb29yOm51bWJlciA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNvbHVtbnM6bnVtYmVyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTGluZVN0ZXBOdW07XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkxpbmVJZHggPSBsaW5lSWR4O1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB0aGlzLlN0ZXBMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1NldGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yKCB2YXIgU3RhcnRJZHg6bnVtYmVyID0gKGNvbHVtbnMgLTEpO1N0YXJ0SWR4Pj0wOy0tU3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N0ZXA6U3RlcCA9IG5ldyBTdGVwKHRoaXMsU3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ld1N0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXBMaXN0W1N0YXJ0SWR4XSA9IG5ld1N0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge1BsYXllckNvbnRyb2xlcn0gZnJvbSBcIi4vUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHtQbGF5ZXJCdWZmfSBmcm9tIFwiLi9CdWZmXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQge0NoYXJhY3Rlcn0gZnJvbSBcIi4vQ2hhcmFjdGVyXCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIlxyXG5pbXBvcnQgQ2hhcmFjdGVyTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvQ2hhcmFjdGVyTWFtYWdlclwiO1xyXG52YXIgbnVtOm51bWJlciA9IDA7XHJcbnR5cGUgQmFzZVBsYXllckJ1ZmYgPSBQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmO1xyXG4vL+ivpeiEmuacrOeUqOS6jua4uOaIj+eOqeWutuWvueixoeeuoeeQhlxyXG4vL+eOqeWutuWvueixoVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbnsgICBcclxuICAgIC8v56eB5pyJ5bGe5oCnXHJcbiAgICBfTG9naWNQb3NpdGlvbjpMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF9CdWZmTm9kZTpMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBfUGxheWVyTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIHByaXZhdGUgX0N1clN0ZXA6U3RlcDtcclxuICAgIHByaXZhdGUgX0N0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlcjtcclxuICAgIHByaXZhdGUgbV9BbmltYXRvcjpMYXlhLkFuaW1hdG9yO1xyXG4gICAgcHJpdmF0ZSBtX0J1ZmZNb2RlbDp7W25hbWU6bnVtYmVyXTpMYXlhLlNwcml0ZTNEfVxyXG4gICAgXHJcbiAgICBCYXNlQ3RybGVyOlBsYXllckNvbnRyb2xlci5QbGF5ZXJOb3JtQ3RybGVyO1xyXG4gICAgQnVmZkFycjpBcnJheTxQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmPjtcclxuICAgIC8vemVyZ1xyXG4gICAgSWROdW1iZXI6bnVtYmVyO1xyXG5cclxuICAgIHNldCBDdXJTdGVwKHN0ZXA6U3RlcClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdXJTdGVwID0gc3RlcDtcclxuICAgIH1cclxuICAgIGdldCBDdXJTdGVwKCk6U3RlcFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgSW5pdEJVZmZNb2RlbCggcGxheWVyTW9kZWw6TGF5YS5TcHJpdGUzRCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZXRNb2RlbCggXCJpdGVtX2ZseWVyXzAxXCIsIFwiUl9oYW5kXCIscGxheWVyTW9kZWwsIEl0ZW0uSXRlbVR5cGUuRmx5KTtcclxuICAgICAgICB0aGlzLlNldE1vZGVsKCBcIml0ZW1fc2hpZWxkXzAxXCIsIFwiaGVhZFwiLHBsYXllck1vZGVsLCBJdGVtLkl0ZW1UeXBlLlByb3RlY3QpO1xyXG4gICAgICAgIHRoaXMuU2V0TW9kZWwoIFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiLCBcImhlYWRcIixwbGF5ZXJNb2RlbCwgSXRlbS5JdGVtVHlwZS5Ib2x5UHJvdGVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTZXRNb2RlbCggcmVzb3VyY2VOYW1lOnN0cmluZywgbm9kZU5hbWU6c3RyaW5nLCBwbGF5ZXJNb2RlbDpMYXlhLlNwcml0ZTNELCBpdGVtVHlwZTpJdGVtLkl0ZW1UeXBlIClcclxuICAgIHtcclxuICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldExIKHJlc291cmNlTmFtZSkpO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6TGF5YS5TcHJpdGUzRCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcGxheWVyTW9kZWwuZ2V0Q2hpbGRBdCgwKS5hZGRDaGlsZChidWZmTW9kZWwpO1xyXG4gICAgICAgIHN3aXRjaChub2RlTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJoZWFkXCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZTpMYXlhLlNwcml0ZTNEID0gcGxheWVyTW9kZWwuZ2V0Q2hpbGRCeU5hbWUobm9kZU5hbWUpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yLmxpbmtTcHJpdGUzRFRvQXZhdGFyTm9kZShub2RlTmFtZSxidWZmTW9kZWwpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgYnVmZk1vZGVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV9CdWZmTW9kZWxbaXRlbVR5cGVdID0gYnVmZk1vZGVsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsID0ge307XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcyk7XHJcblxyXG4gICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbiAgICAgICAgdGhpcy5vbihMYXlhLkV2ZW50LlJFTU9WRUQsdGhpcywoKT0+eyB0aGlzLmRlc3Ryb3koKSB9KVxyXG4gICAgICAgIHZhciBtZ3I6Q2hhcmFjdGVyTWFuYWdlciA9IEdhbWVBUFAuQ2hhcmFjdGVyTWdyO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtX1N0YXRlTWFwOnt9XHJcbiAgICBwdWJsaWMgU2V0UGxheWVyTW9kZWwoIG1vZGVsOkxheWEuU3ByaXRlM0QgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobW9kZWwpO1xyXG4gICAgICAgIG1vZGVsLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygwLCAxODAsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvciA9IG1vZGVsLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIHZhciBsYXllcjpMYXlhLk1hcExheWVyID0gdGhpcy5tX0FuaW1hdG9yLmdldENvbnRyb2xsZXJMYXllcigpLl9zdGF0ZXNNYXA7XHJcbiAgICAgICAgdGhpcy5tX1N0YXRlTWFwID0ge307XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX1N0YXRlTWFwW2tleV0gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkluaXRCVWZmTW9kZWwobW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIFJlc2V0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBudWxsO1xyXG4gICAgICAgIGlmKHRoaXMuX0J1ZmZOb2RlKVxyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fQnVmZk5vZGUgPSBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fQnVmZk5vZGUpO1xyXG4gICAgICAgIHRoaXMuQnVmZkFyciA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuQmFzZUN0cmxlciA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyTm9ybUN0cmxlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLkJhc2VDdHJsZXI7XHJcbiAgICAgICAgdGhpcy5fTG9naWNQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoMCwwKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fVXBkYXRlKTtcclxuICAgICAgICB2YXIgZGVmYXVsdEFuaW1TdGF0ZTpMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLm1fQW5pbWF0b3IuZ2V0RGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgdmFyIHN0YXRlTmFtZTpzdHJpbmcgPSBkZWZhdWx0QW5pbVN0YXRlLm5hbWU7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoc3RhdGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueOqeWutkJVRkZcclxuICAgICAqIEBwYXJhbSBpZHgg5qe95L2N5qOA5p+lXHJcbiAgICAgKiBAcmV0dXJucyDnqbrooajnpLrmsqHmnIlcclxuICAgICAqL1xyXG4gICAgR2V0QnVmZihpZHg6bnVtYmVyKTpQbGF5ZXJCdWZmLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLkJ1ZmZBcnJbaWR4XSAhPW51bGwmJnRoaXMuQnVmZkFycltpZHhdIT11bmRlZmluZWQpP3RoaXMuQnVmZkFycltpZHhdOm51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mkYbmlL7op5LoibJcclxuICAgIFNldFN0ZXAocHV0U3RlcDpTdGVwKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gcHV0U3RlcDtcclxuICAgICAgICB2YXIgbmV3UFMgPSBwdXRTdGVwLlBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgbmV3UFMueSArPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuUG9zaXRpb24gPSBuZXdQUztcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gcHV0U3RlcC5Qb3NpdGlvbjtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLlN0YW5kKSk7XHJcbiAgICAgICAgdGhpcy5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgfVxyXG4gICAgc2V0IFBvc2l0aW9uKCBuZXdQUzpMYXlhLlZlY3RvcjMgKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdQUzpMYXlhLlZlY3RvcjMgPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTpMYXlhLlZlY3RvcjNcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2dpY1Bvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0xvZ2ljUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluIPlsYDlvZPliY3lsYLkvYbkuI3np7vliqhcclxuICAgICAqIEBwYXJhbSB7U3RlcH0gc3RlcCDkuIvkuIDmraXlj7DpmLZcclxuICAgICAqL1xyXG4gICAgTGF5U3RlcChzdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBzdGVwO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBzdGVwLlBvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBTdGFydE1vdmUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoIENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uSnVtcCkgKTtcclxuICAgICAgICB0aGlzLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgSnVtcERvd24oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5KdW1wZG93bikpO1xyXG4gICAgfVxyXG5cclxuICAgIEZseSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkZseSkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFBsYXllckRlYXRoOmJvb2xlYW47XHJcbiAgICAvL+inpuWPkeWPsOmYtlxyXG4gICAgVG91Y2hHcm91bmQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJEZWF0aCB8fCAhdGhpcy5DdXJTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoKHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5JdGVtVHlwZSA9PSBJdGVtLkl0ZW1UeXBlLk5vbmUpJiYodGhpcy5DdXJTdGVwLklzRW1wdHl8fCh0aGlzLkN1clN0ZXAuTGVmdFBhcmVudCYmdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50JiZ0aGlzLkN1clN0ZXAuTGVmdFBhcmVudC5TdGVwSXRlbS5Jc0ZvcmJpZGVuJiZ0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbikpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgICAgIHZhciBjbGlwTmFtZTpzdHJpbmcgPSBDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkZhbGwpO1xyXG4gICAgICAgICAgICBpZih0aGlzLm1fU3RhdGVNYXBbY2xpcE5hbWVdKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoY2xpcE5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5Ub3VjaEl0ZW0odGhpcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog56e75YqoXHJcbiAgICAgKiBAcGFyYW0ge0xheWEuVmVjdG9yM30gdmVjdG9yIOenu+WKqOWQkemHj+WAvFxyXG4gICAgICovXHJcbiAgICBUcmFuc2xhdGUoIHZlY3RvcjpMYXlhLlZlY3RvcjMgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0udHJhbnNsYXRlKHZlY3Rvcik7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZCh0aGlzLl9Mb2dpY1Bvc2l0aW9uLHZlY3Rvcix0aGlzLl9Mb2dpY1Bvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOeOqeWutuaOp+WItuWZqFxyXG4gICAgICogQHBhcmFtIG5ld0N0cmxlciDmlrDnjqnlrrbmjqfliLblmahcclxuICAgICAqL1xyXG4gICAgQWRkQ3RybGVyKG5ld0N0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlciApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgY3RybGVyOlBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyID0gdGhpcy5fQ3RybGVyO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IG5ld0N0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuTmV4dEN0cmwgPWN0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuU2V0UGxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75Lqk5o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIFBvcEN0cmxlcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLl9DdHJsZXIuTmV4dEN0cmw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoEJVRkZcclxuICAgICAqIEBwYXJhbSBidWZmIFxyXG4gICAgICogQHBhcmFtIGluZGV4IFxyXG4gICAgICovXHJcbiAgICBBZGRCdWZmKGJ1ZmY6UGxheWVyQnVmZi5CYXNlUGxheWVyQnVmZik6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHZhciBpbmRleDpudW1iZXIgPSBidWZmLklkeDtcclxuICAgICAgICBpZih0aGlzLkJ1ZmZBcnJbaW5kZXhdIT1udWxsfHx0aGlzLkJ1ZmZBcnJbaW5kZXhdIT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBidWZmTW9kZWw6TGF5YS5TcHJpdGUzRCA9IHRoaXMubV9CdWZmTW9kZWxbYnVmZi5UeXBlXTtcclxuICAgICAgICBpZihidWZmTW9kZWwpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYnVmZk1vZGVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQnVmZkFycltpbmRleF0gPSBidWZmO1xyXG4gICAgICAgIGJ1ZmYuSWR4ID0gaW5kZXg7XHJcbiAgICAgICAgYnVmZi5TdGFydCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5re75YqgQlVGRuaooeWei1xyXG4gICAgICogQHBhcmFtIG1vZCBcclxuICAgICAqL1xyXG4gICAgQWRkQnVmZk1vZGUoIG1vZDpMYXlhLlNwcml0ZTNEIClcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYobW9kIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQnVmZk5vZGUuYWRkQ2hpbGQobW9kKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOe7k+adn0JVRkZcclxuICAgICAqL1xyXG4gICAgQ29tcGxldGVCdWZmKGluZGV4Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgYnVmZjpCYXNlUGxheWVyQnVmZiA9IHRoaXMuQnVmZkFycltpbmRleF07XHJcbiAgICAgICAgdmFyIGJ1ZmZNb2RlbDpMYXlhLlNwcml0ZTNEID0gdGhpcy5tX0J1ZmZNb2RlbFtidWZmLlR5cGVdO1xyXG4gICAgICAgIGlmKGJ1ZmZNb2RlbCkgYnVmZk1vZGVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVmZkFycltpbmRleF09bnVsbDtcclxuICAgICAgICBpZihidWZmPT1udWxsfHxidWZmPT11bmRlZmluZWQgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckRlYXRoKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIGZvciggdmFyIGJ1ZmZJZHg6bnVtYmVyID0gMDtidWZmSWR4PDI7KytidWZmSWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQnVmZkFycltidWZmSWR4XSE9bnVsbHx8dGhpcy5CdWZmQXJyW2J1ZmZJZHhdIT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1ZmZBcnJbYnVmZklkeF0uVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgRmx5UHJlcGFyZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RlcERhdGFcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge31cclxuICAgIEdldERhdGEoIHN0ZXA6U3RlcCApXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXJDb250cm9sZXJcclxue1xyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQbGF5ZXJDdHJsZXJcclxuICAgIHtcclxuICAgICAgICAvL+WFrOWFseaOpeWPo1xyXG4gICAgICAgIE5leHRDdHJsOkJhc2VQbGF5ZXJDdHJsZXI7XHJcbiAgICAgICAgcGxheWVyOlBsYXllcjtcclxuICAgICAgICBcclxuICAgICAgICBVcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjpQbGF5ZXIpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBwbGF5ZXI6UGxheWVyLCBjdHJsZXI6QmFzZVBsYXllckN0cmxlciA9IG51bGwgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoY3RybGVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN0cmxlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5OZXh0Q3RybCA9IGN0cmxlcjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfVXBkYXRlKCk6dm9pZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/nlKjkuo7op5LoibLmraPluLjnirbmgIHkuIvnmoTnp7vliqhcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJOb3JtQ3RybGVyIGV4dGVuZHMgQmFzZVBsYXllckN0cmxlclxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIElzRmFsbGluZzpib29sZWFuO1xyXG4gICAgICAgIFN0YXJ0TW92ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkRpcmVjdG9yLkdhbWVUaW1lICsgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuUGxheWVyTW92ZVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSXNGYWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHBsYXllcjpQbGF5ZXIgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5UaW1lPD1BUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkRpcmVjdG9yLkdhbWVUaW1lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGltZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlNldFN0ZXAodGhpcy5wbGF5ZXIuQ3VyU3RlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VGltZSA9IHRoaXMuVGltZS1MYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy5Jc0ZhbGxpbmcgPSBmYWxzZSAmJiBsYXN0VGltZSoyID4gdGhpcy5UaW1lLUxheWEudGltZXIuY3VyclRpbWVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5KdW1wRG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmF0ZSA9ICgxLWxhc3RUaW1lLyBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5QbGF5ZXJNb3ZlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFN0ZXBQczpMYXlhLlZlY3RvcjMgPSB0aGlzLnBsYXllci5DdXJTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIFN0ZXBQcy55ICs9Q29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycHM6TGF5YS5WZWN0b3IzID0gdGhpcy5wbGF5ZXIuUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycHMueSArPUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1BzLnggPSAoU3RlcFBzLnggLSBjdXJwcy54KSpyYXRlKyBjdXJwcy54O1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1BzLnkgPSAoU3RlcFBzLnkgLSBjdXJwcy55KSpyYXRlK2N1cnBzLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHMueiA9IChTdGVwUHMueiAtIGN1cnBzLnopKnJhdGUrY3VycHMuejtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlBvc2l0aW9uID0gbmV3UHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlRvdWNoR3JvdW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v546p5a626aOe6KGMXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyRmx5IGV4dGVuZHMgQmFzZVBsYXllckN0cmxlclxyXG4gICAge1xyXG4gICAgICAgIFNwZWVkOm51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7njqnlrrZcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIOaTjeaOp+inkuiJslxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNldFBsYXllcihwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU2V0UGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIHBsYXllci5UcmFuc2xhdGUobmV3IExheWEuVmVjdG9yMygwLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsMCkpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjpHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbFo6bnVtYmVyOyAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdmFyIHZlY3RvciA9IG5ldyBMYXlhLlZlY3RvcjMoMCxDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoLC0xKkNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZS8yKTtcclxuICAgICAgICAgICAvLyBMYXlhLlZlY3RvcjMuc2NhbGUodmVjdG9yLHRoaXMuU3BlZWQsdmVjdG9yKTtcclxuICAgICAgICAgICB2YXIgdmVjdG9yOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoMCwwLjE0NiwtMC4xMDM5NClcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuVHJhbnNsYXRlKHZlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuL01vdW50TGluZVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxudHlwZSBTdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW07XHJcbnR5cGUgTUxvY2F0aW9uID0gR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbi8v5q2lXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXAgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbntcclxuICAgIC8v5qih5Z6L5Liq5pWwXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0ZXBNb2RlbE51bTpudW1iZXIgPSAzO1xyXG5cclxuICAgIExlZnRQYXJlbnQ6U3RlcDtcclxuICAgIFJpZ2h0UGFyZW50OlN0ZXA7XHJcbiAgICBMZWZ0Q2hpbGQ6U3RlcDtcclxuICAgIFJpZ2h0Q2hpbGQ6U3RlcDtcclxuICAgIFN0ZXBJdGVtOlN0ZXBJdGVtO1xyXG4gICAgUm9hZE51bTpudW1iZXI7XHJcbiAgICBNYXJrOmFueTtcclxuICAgIEZsb29yOk1vdW50TGluZTtcclxuICAgIElkeDpudW1iZXI7XHJcbiAgICBcclxuICAgIC8v5YWs5pyJ5o6l5Y+jXHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2NhdGlvbigpOk1Mb2NhdGlvblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24odGhpcy5JZHgtMSx0aGlzLkZsb29yLkZsb29yTnVtKTtcclxuICAgIH1cclxuICAgIGdldCBJc0RlYWRSb2FkKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Jc0RlYWRSb2FkfHwhdGhpcy5hY3RpdmV8fCB0aGlzLlN0ZXBJdGVtLklzRGlmZmljdWx0eTtcclxuICAgIH1cclxuICAgIHNldCBJc0RlYWRSb2FkKHZhbHVlOmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRm9yYmlkZW4oKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU3RlcEl0ZW0uSXNGb3JiaWRlbjtcclxuICAgIH1cclxuICAgIGdldCBJc0VtcHR5KCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAhKHRoaXMuYWN0aXZlJiZ0aGlzLkZsb29yLmFjdGl2ZSk7XHJcbiAgICB9XHJcbiAgICBQdXRJdGVtKCBpdGVtRW51bWU6SXRlbS5JdGVtVHlwZSApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaXRlbUVudW1lID09IEl0ZW0uSXRlbVR5cGUuRW1wdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9ZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlB1dEl0ZW0oaXRlbUVudW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBSZXNldFN0ZXAobmV3UHM6TGF5YS5WZWN0b3IzLGlnbm9yZUFjdGl2ZTpib29sZWFuID0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BzO1xyXG4gICAgICAgIGlmKCFpZ25vcmVBY3RpdmUpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB2YXIgbW9kZWxQcyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUHV0SXRlbShJdGVtLkl0ZW1UeXBlLk5vbmUpO1xyXG5cclxuICAgICAgICB0aGlzLkxlZnRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlJvYWROdW0gPSAwO1xyXG4gICAgfVxyXG4gICAgX1N0ZXBNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgY29uc3RydWN0b3IoZmxvb3I6TW91bnRMaW5lLGlkeDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgLy9zdXBlcihuZXcgTGF5YS5Cb3hNZXNoKDEsMSwxKSApO1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcyk7XHJcbiAgICAgICAgaWYodGhpcy5JZHggIT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDErIE1hdGgucmFuZG9tKCkqU3RlcC5zdGVwTW9kZWxOdW0pO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzBcIitJZHgpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9tb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRCggTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjUsIDAuNSwgMC41KSkgOy8vbG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2xvbmVNb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgY2xvbmVNb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChjbG9uZU1vZGVsKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtID0gSXRlbS5TdGVwSXRlbUZhY3RvcnkoSXRlbS5JdGVtVHlwZS5Ob25lLHRoaXMpOztcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlJlc2V0SXRlbSgpO1xyXG4gICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICB0aGlzLklkeCA9IGlkeDtcclxuXHJcbiAgICAgICAgdGhpcy5MZWZ0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxlZnRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodENoaWxkID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9hZE51bSA9IDA7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9Jc0RlYWRSb2FkOmJvb2xlYW47XHJcblxyXG59IiwiLyoqXHJcbiAqIOS9nOiAhTpNb1xyXG4gKiDlkK/liqjlnLrmma9cclxuICovXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBMb2FkU2NlbmUgZnJvbSBcIi4vU2NlbmUvTG9hZFNjZW5lXCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCI7XHJcbmNsYXNzIEdhbWVcclxue1xyXG5cdF9GcmFtZTpGcmFtZVdvcms7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNzID0gQVBQO1xyXG4gICAgICAgIExheWEzRC5pbml0KDAsMCx0cnVlKTtcclxuICAgICAgICBHYW1lQ29uZmlnLmluaXQoKTtcclxuICAgICAgICAvL0xheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GSVhFRF9XSURUSDtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRlVMTDtcclxuICAgICAgICBcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBMYXlhLlN0YWdlLlNDUkVFTl9WRVJUSUNBTDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IExheWEuU3RhZ2UuQUxJR05fQk9UVE9NO1xyXG4gICAgICAgIC8v5byA5ZCv57uf6K6h5L+h5oGvXHJcblx0XHRMYXlhLlN0YXQuc2hvdygpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHJlc0NvbCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6XCJ1aS9SZXNvdXJjZS9sb2NhbGNvbXAuYXRsYXNcIix0eXBlOkxheWEuTG9hZGVyLkFUTEFTfV07XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChyZXNDb2wsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLkluaXQoKTtcclxuICAgICAgICB2YXIgc2NlbmVNZ3I6U2NlbmVNYW5hZ2VyID0gQVBQLlNjZW5lTWFuYWdlcjtcclxuICAgICAgICBzY2VuZU1nci5DaGFuZ2VTY2VuZShuZXcgTG9hZFNjZW5lKCkpO1xyXG4gICAgICAgIEFQUC5GcmFtZVdvcmsuQWRkTWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcilcclxuICAgICAgICBMYXlhLnRpbWVyLmZyYW1lTG9vcCgzLHRoaXMsdGhpcy5VcGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSggKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5GcmFtZVdvcmsuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxudmFyIEdNID0gbmV3IEdhbWUoKTtcclxuIiwiaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vU2NlbmVcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHsgUGxheWVyQnVmZiB9IGZyb20gXCIuLy4uL0dhbWUvQnVmZlwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEdhbWVTY2VuZVBsYXkgZnJvbSBcIi4vU2NlbmVQbGF5L0dhbWVTY2VuZVBsYXlcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVEaXJlY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvciB7XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVQbGF5KCk6R2FtZVNjZW5lUGxheVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clN0YXRlIGFzIEdhbWVTY2VuZVBsYXk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZExpc3QyRCA9IFtwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVcIikscGF0aC5HZXREZXBhdGhVSUpTKFwiRW5kR2FtZVwiKV07XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VTdGF0ZShuZXcgU2NlbmUuTG9hZFNjZW5lTG9naWMobG9hZExpc3QyRCxudWxsLG5ldyBHYW1lU2NlbmVQbGF5KCkpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiLypcclxu5L2c6ICFOk1vXHJcbui3s+Wxsee+iuWcuuaZr+aguOW/g+WKn+iDvVxyXG4qL1xyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW50ZXJHYW1lVUlcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7SW5wdXR9IGZyb20gXCIuLy4uL0dhbWUvSW5wdXRcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi8uLi91aS9HYW1lVUlcIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuLy4uL0dhbWUvTW91bnRMaW5lXCJcclxuaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vLi4vR2FtZS9TdGVwXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiO1xyXG50eXBlIEl0ZW1MYXlvdXQgPSBJdGVtLkl0ZW1MYXlvdXQ7XHJcbnR5cGUgTGluZUl0ZW1JbmZvID0gSXRlbS5MaW5lSXRlbUluZm87XHJcbnZhciBJdGVtVHlwZSA9IEl0ZW0uSXRlbVR5cGU7XHJcbi8v5ri45oiP5Zy65pmvXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVxyXG57XHJcbiAgICBNb2RlbExvYWQ6Ym9vbGVhbjtcclxuICAgIEdhbWVEaXI6R2FtZURpcmVjdG9yO1xyXG4gICAgcHJvdGVjdGVkIEdlbkRpcmVjdG9yKCk6R2FtZURpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHYW1lRGlyZWN0b3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1NjZW5lT2JqID0gbmV3IExheWEuU2NlbmUzRDtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsImltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLi9jb250cm9sZXIvQVBQXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWlkZXJNYW5hZ2VyIFxyXG57XHJcbi8v5a+55aSW5o6l5Y+jXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTWdyOkd1aWRlck1hbmFnZXI7XHJcbiAgICBzdGF0aWMgZ2V0IE1ncigpOkd1aWRlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZihHdWlkZXJNYW5hZ2VyLl9NZ3IgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEd1aWRlck1hbmFnZXIuX01nciA9IG5ldyBHdWlkZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHdWlkZXJNYW5hZ2VyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBTY2VuZU1ncjpTY2VuZU1hbmFnZXI7XHJcbiAgICBDdXJTY2VuZTpHdWlkZXJTY2VuZTtcclxuICAgIHB1YmxpYyBnZXQgR2FtZURpcigpOkd1aWRlckRpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ3VyU2NlbmUuR3VpZERpcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR3VpZGVyU2NlbmUoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkNoYW5nZVNjZW5lKG5ld0dhbWVTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG5ld0dhbWVTY2VuZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJTY2VuZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVxyXG57XHJcbiAgICBHdWlkRGlyOkd1aWRlckRpcmVjdG9yO1xyXG4gICAgQ3VyRGlyOkJhc2VEaXJlY3RvcjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICB2YXIgRGlyZWN0b3I6U2NlbmUuQmFzZURpcmVjdG9yID0gbmV3IEd1aWRlckRpcmVjdG9yKCk7XHJcbiAgICAgICAgcmV0dXJuIERpcmVjdG9yO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJEaXJlY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxvYWQyRExpc3QgPSBbe3VybDpwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSAsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKSx0eXBlOiBMYXlhLkxvYWRlci5BVExBUyB9XTtcclxuICAgICAgICB0aGlzLkNoYW5nZUdhbWVQbGF5KG5ldyBTY2VuZS5Mb2FkU2NlbmVMb2dpYyhsb2FkMkRMaXN0LG51bGwsbmV3IEd1aWRlclNjZW5lUGxheSgpKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIEVuZCgpOnZvaWRcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlclNjZW5lUGxheSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllXHJcbntcclxuICAgIFVJOkVudGVyR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9ICAgIFxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJID0gQVBQLlVJTWFuYWdlci5TaG93PEVudGVyR2FtZVVJPihFbnRlckdhbWVVSSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi8uLi91aS9sYXlhTWF4VUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IExvYWRpbmdVSSBmcm9tIFwiLi8uLi91aS9VbkRvd25sb2FkL0xvYWRpbmdVSVwiXHJcbmltcG9ydCBGTVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuL0d1aWRlck1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQkcgZnJvbSBcIi4vLi4vdWkvQkdcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZFNjZW5lIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IExvYWREaXJjdG9yKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuY2xhc3MgTG9hZERpcmN0b3IgZXh0ZW5kcyBTY2VuZS5CYXNlRGlyZWN0b3Jcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZExpc3QyRCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6XCJ1aS9SZXNvdXJjZS9sb2NhbGNvbXAuYXRsYXNcIix0eXBlOkxheWEuTG9hZGVyLkFUTEFTfV07XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VHYW1lUGxheSggbmV3IFNjZW5lLkxvYWRTY2VuZUxvZ2ljKGxvYWRMaXN0MkQsbnVsbCxuZXcgTG9hZFNjZW5lUGxheWUoKSkgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgUmVTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgIH1cclxufVxyXG5cclxuLy/liqDovb3lnLrmma/pgLvovpFcclxuY2xhc3MgTG9hZFNjZW5lUGxheWUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVQbGF5ZVxyXG57XHJcbiAgICBwcml2YXRlIG1fQ291bnQyRExvYWQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50M0RMb2FkOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Mb2FkRmFpbGU6Ym9vbGVhbjtcclxuICAgIHByaXZhdGUgbV9Db3VudFZhbHVlOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Mb2FkaW5nVUk6TG9hZGluZ1VJO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV9Db3VudFZhbHVlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFN0YXJ0TG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UyREFyciA9IFtcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIkNoYXJhY3RlckluZm9cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0SnNvblBhdGgoXCJJdGVtSW5mb1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIkxldmVsSW5mb1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIk9ic3RhY2xlSW5mb1wiKVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEubG9hZGVyLm9uY2UoTGF5YS5FdmVudC5FUlJPUix0aGlzLHRoaXMub25FcnJvcik7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5vbkNvbXBsZXRlKTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UzREFyciA9IFsgXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJjMDAxX2NoaWxkXzAxXCIpICxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDFfYWR1bHRfMDFcIikgLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzA0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9jb2luXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfY2hvbXBlcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX3N0aW5nXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRfMDFcIiksXHJcbiAgICAgICAgXVxyXG4gICAgICAgIHRoaXMuTG9hZChyZXNvdXJjZTJEQXJyLHJlc291cmNlM0RBcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgTG9hZChhcnIyRDpBcnJheTxhbnk+ID0gbnVsbCxhcnIzRDpBcnJheTxhbnk+PW51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXJyMkQhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKGFycjJELG51bGwsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub24yRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgLT0wLjU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFycjNEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY3JlYXRlKGFycjNELExheWEuSGFuZGxlci5jcmVhdGUodGhpcyxudWxsKSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbjNEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSAtPTAuNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbjNEUHJvZ3Jlc3ModmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubV9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9dmFsdWUvMjtcclxuICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLlZhbHVlID0gKHRoaXMubV9Db3VudDJETG9hZCArIHRoaXMubV9Db3VudDNETG9hZCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uMkRQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuVmFsdWUgPSAodGhpcy5tX0NvdW50MkRMb2FkICsgdGhpcy5tX0NvdW50M0RMb2FkKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25FcnJvcihzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJMb2FkRXJyb3I6XCIrc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Db21wbGV0ZShkYXRhKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubV9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGhpRGlyID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5SZWxvYWQoZnVuY3Rpb24oKTp2b2lke3RoaURpci5Mb2FkKCl9ICk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQkcgPSBuZXcgQkcoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5Db21wbGV0ZSgoKT0+e0d1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdVSSA9IEFQUC5VSU1hbmFnZXIuU2hvdzxMb2FkaW5nVUk+KExvYWRpbmdVSSk7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID0gMC41O1xyXG4gICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9IDAuNTtcclxuICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuU3RhcnRMb2FkKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZENvbXBsZXRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRlNNIH0gZnJvbSBcIi4vLi4vQmFzZS9GU01cIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuZXhwb3J0IG1vZHVsZSBTY2VuZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgU2NlbmVGU00gZXh0ZW5kcyBGU00uRlNNPEJhc2VTY2VuZT5cclxuICAgIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lnLrmma/ku6PnkIZcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmUgZXh0ZW5kcyBGU00uU3RhdGUge1xyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0R2FtZVRpbWU6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENsb2NrOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBtX1NjZW5lT2JqOiBMYXlhLlNjZW5lM0Q7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fRGlyZWN0b3I6IEJhc2VEaXJlY3RvcjtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBTY2VuZU9iaigpOiBMYXlhLlNjZW5lM0Qge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX1NjZW5lT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IERpcmVjdG9yKCk6IEJhc2VEaXJlY3RvciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fRGlyZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgR2VuRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHV0T2JqKHNwcml0ZTNEOiBMYXlhLlNwcml0ZTNEKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fU2NlbmVPYmopIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9TY2VuZU9iai5hZGRDaGlsZChzcHJpdGUzRCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJhc2VTY2VuZSBQdXRPYmogRXJyb3I6ZW1wdHkgU3ByaXRlM0RcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yID0gdGhpcy5HZW5EaXJlY3RvcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fRGlyZWN0b3IuU3RhcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNjZW5lT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNjZW5lT2JqLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLlNjZW5lT2JqLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdG9yID0gdGhpcy5TY2VuZU9iai5nZXRDaGlsZEF0KDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkRpcmVjdG9yLkVuZCgpO1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0RpcmVjdG9yKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yLlVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VEaXJlY3RvciBleHRlbmRzIEZTTS5GU008QmFzZVNjZW5lUGxheWU+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfU3RhcnRHYW1lVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ2xvY2s6IG51bWJlcjtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgLy/np4HmnInlsZ7mgKflkozlip/og71cclxuICAgICAgICBnZXQgR2FtZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RpbWVVcENsb2NrID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1RpbWVVcENsb2NrIC0gdGhpcy5fU3RhcnRHYW1lVGltZSAtIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5fU3RhcnRHYW1lVGltZSAtIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBHYW1lVGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IEN1ckdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9TdGFydEdhbWVUaW1lICsgdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmVTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5TdGFydFRpbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydFRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBTdGFydCgpOiB2b2lkIDtcclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IEVuZCgpOiB2b2lkO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGltZVVwKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGltZVVwQ2xvY2sgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lVGltZVVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5VcGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIENvbnRpbnVlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lQ29udGludWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCArPSBMYXlhLnRpbWVyLmN1cnJUaW1lciAtIHRoaXMuX1RpbWVVcENsb2NrO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliIfmjaLliafmnKxcclxuICAgICAgICAgKiBAcGFyYW0gbmV3U2NlbmVQbGF5IOaWsOWJp+acrFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBDaGFuZ2VHYW1lUGxheSggbmV3U2NlbmVQbGF5OkJhc2VTY2VuZVBsYXllICk6IHZvaWQgIHtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VTdGF0ZShuZXdTY2VuZVBsYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNjZW5lUGxheWUgZXh0ZW5kcyBGU00uU3RhdGUge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2UgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTG9hZFNjZW5lTG9naWMgZXh0ZW5kcyBCYXNlU2NlbmVQbGF5ZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0xvYWQyRExpc3Q6IGFueVtdO1xyXG4gICAgICAgIHByaXZhdGUgbV9Mb2FkM0RMaXN0OiBhbnlbXTtcclxuICAgICAgICBwcml2YXRlIG1fTmV4dFNjZW5lOiBTY2VuZS5CYXNlU2NlbmVQbGF5ZTtcclxuICAgICAgICBwdWJsaWMgZ2V0IE93bmVyRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9vd25lciBhcyBCYXNlRGlyZWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBsb2FkMkRMaXN0IDJE5Yqg6L295YiX6KGoXHJcbiAgICAgICAgICogQHBhcmFtIGxvYWQzRExpc3QgM0TliqDovb3liJfooahcclxuICAgICAgICAgKiBAcGFyYW0gbmV4dFNjZW5lIOS4i+S4gOagvOWcuuaZr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGxvYWQyRExpc3Q6IGFueVtdLCBsb2FkM0RMaXN0OiBhbnlbXSwgbmV4dFNjZW5lOiBTY2VuZS5CYXNlU2NlbmVQbGF5ZSkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZDJETGlzdCA9IGxvYWQyRExpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkM0RMaXN0ID0gbG9hZDNETGlzdDtcclxuICAgICAgICAgICAgdGhpcy5tX05leHRTY2VuZSA9IG5leHRTY2VuZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVuZCgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLm9uY2UoTGF5YS5FdmVudC5DT01QTEVURSwgdGhpcywgdGhpcy5Mb2FkQ29tcGxldGUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0xvYWQyRExpc3QpXHJcbiAgICAgICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMubV9Mb2FkMkRMaXN0LCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9Mb2FkM0RMaXN0KVxyXG4gICAgICAgICAgICAgICAgTGF5YS5sb2FkZXIubG9hZCh0aGlzLm1fTG9hZDNETGlzdCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExvYWRDb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5Pd25lckRpcmVjdG9yLkNoYW5nZVN0YXRlKHRoaXMubV9OZXh0U2NlbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLy4uLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi8uLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuLy4uL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEVuZEdhbWVVSSBmcm9tIFwiLi8uLi8uLi91aS9FbmRHYW1lVUlcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBHYW1lQ2FtZXJhIGZyb20gXCIuLy4uLy4uL0dhbWUvR2FtZUNhbWVyYVwiXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vLi4vLi4vR2FtZS9QbGF5ZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuLy4uLy4uL0dhbWUvSW5wdXRcIlxyXG5pbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi8uLi8uLi91aS9HYW1lVUlcIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuLy4uLy4uL0dhbWUvTW91bnRMaW5lXCJcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLy4uLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEJHVUkgZnJvbSBcIi4vLi4vLi4vdWkvQkdcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4uL0dhbWVTY2VuZVwiO1xyXG5pbXBvcnQgeyBHYW1lQWdlbnQgfSBmcm9tIFwiLi8uLi8uLi9BZ2VudC9HYW1lQWdlbnRcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIjtcclxuXHJcbnR5cGUgSXRlbUxheW91dCA9IEl0ZW0uSXRlbUxheW91dDtcclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuXHJcbi8v5ri45oiP5a+85ryUXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZVBsYXkgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVQbGF5ZSB7XHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBfSGVhZEZsb29ySWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9UYWlsRkxvb3JJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0NvdW50VGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQm9vdG9tRmxvb3I6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX1N0YXJ0UG9zaXRpb246IExheWEuVmVjdG9yMztcclxuICAgIHByaXZhdGUgX0dhbWVVcGRhdGU6ICgpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9QYW5lbFVJOiBHYW1lVUk7XHJcbiAgICBwcml2YXRlIF9Hb2xkTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Mb2dpY0dvbGROdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0N1ckJHOiBCR1VJO1xyXG4gICAgcHJpdmF0ZSBfU2FmZUxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuXHJcbiAgICBDYW1lcmE6IEdhbWVDYW1lcmE7XHJcbiAgICBHYW1lU2NlbmU6IEJhc2VTY2VuZTtcclxuICAgIE1vdW50TGluZXM6IE1vdW50TGluZVtdO1xyXG4gICAgUGxheWVyOiBQbGF5ZXI7XHJcbiAgICBJbnB1dEN0cmw6IElucHV0LkJhc2VHYW1lSW5wdXQ7XHJcbiAgICBJdGVtTGF5b3V0OiBJdGVtTGF5b3V0O1xyXG4gICAgQ3VyTGluZVJld2FyZHM6IEFycmF5PExpbmVJdGVtSW5mbz47XHJcbiAgICBDdXJMaW5lQmFycmllcnM6IEFycmF5PExpbmVJdGVtSW5mbz47XHJcbiAgICBuYW1lOiBudW1iZXI7XHJcbiAgICBGcmVzaEJHQ291bnQ6IG51bWJlcjtcclxuXHJcbiAgICBnZXQgU2FmZUxvY2F0aW9uKCk6IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU2FmZUxvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBhbmVsVUkoKTogR2FtZVVJIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fUGFuZWxVSTtcclxuICAgIH1cclxuICAgIHNldCBQYW5lbFVJKHZhbHVlOiBHYW1lVUkpIHtcclxuICAgICAgICB2YWx1ZS5TZXRMZWZ0VG91Y2godGhpcywgKCkgPT4geyB0aGlzLklucHV0Q3RybC5JbnB1dChmYWxzZSk7IH0pXHJcbiAgICAgICAgdmFsdWUuU2V0UmlnaHRUb3VjaCh0aGlzLCAoKSA9PiB7IHRoaXMuSW5wdXRDdHJsLklucHV0KHRydWUpOyB9KTtcclxuICAgICAgICB0aGlzLl9QYW5lbFVJID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXQgSGVhZEZsb29yKCk6IE1vdW50TGluZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTW91bnRMaW5lc1t0aGlzLl9IZWFkRmxvb3JJZHhdO1xyXG4gICAgfVxyXG4gICAgZ2V0IFRhaWxGTG9vcigpOiBNb3VudExpbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbdGhpcy5fVGFpbEZMb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBQbGF5ZXJGbG9vcigpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBmbG9vcjogbnVtYmVyID0gdGhpcy5fU3RhcnRQb3NpdGlvbi56IC0gdGhpcy5QbGF5ZXIuTG9naWNQb3NpdGlvbi56O1xyXG4gICAgICAgIGZsb29yID0gTWF0aC5yb3VuZChmbG9vciAvIChDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UgLyAyKSk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGZsb29yKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgRGlzdGFuY2UoKTogbnVtYmVyICB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5QbGF5ZXJGbG9vcilcclxuICAgIH1cclxuXHJcbiAgICBnZXQgUGxheWVyRmxvb3JMaW5lKCk6IE1vdW50TGluZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0Rmxvb3JCeUZsb29yKHRoaXMuUGxheWVyRmxvb3IpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEdhbWVUaW1lKCk6IG51bWJlciAge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5tX293bmVyIGFzIEdhbWVEaXJlY3RvcikuR2FtZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkNhbWVyYSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5HYW1lU2NlbmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTW91bnRMaW5lcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gbnVsbDtcclxuICAgICAgICB0aGlzLkl0ZW1MYXlvdXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fSGVhZEZsb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLl9UYWlsRkxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMuX0NvdW50VGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgPSAwO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0UG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5fUGFuZWxVSSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fQ3VyQkcgPSBBUFAuU2NlbmVNYW5hZ2VyLkJHIGFzIEJHVUk7XHJcbiAgICAgICAgdGhpcy5GcmVzaEJHQ291bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIEFkZElucHV0Q3RybGVyKHZhbHVlOiBJbnB1dC5CYXNlR2FtZUlucHV0KSB7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwuQ2xlYXIoKTtcclxuICAgICAgICB2YWx1ZS5OZXh0SW5wdXQgPSB0aGlzLklucHV0Q3RybDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgUG9wSW5wdXRDdHJsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSB0aGlzLklucHV0Q3RybC5OZXh0SW5wdXQ7XHJcbiAgICB9XHJcbiAgICBBZGRHb2xkKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fR29sZE51bSArPSBudW07XHJcbiAgICAgICAgdGhpcy5BZGRMb2dpY0dvbGQobnVtKTtcclxuICAgIH1cclxuICAgIEFkZEdvbGRVbkxvZ2ljR29sZChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX0dvbGROdW0gKz0gbnVtO1xyXG4gICAgfVxyXG4gICAgQWRkTG9naWNHb2xkKG51bTogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIHRoaXMuX0xvZ2ljR29sZE51bSArPSBudW07XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkdvbGQgPSB0aGlzLl9Mb2dpY0dvbGROdW07XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7lronlhajkvY3nva5cclxuICAgIFNldFNhZmVQUyhsb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb24pIHtcclxuICAgICAgICB0aGlzLl9TYWZlTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICBpZiAobG9jYXRpb24uWSA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtIHx8IGxvY2F0aW9uLlkgPiB0aGlzLkhlYWRGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVzZXRJdGVtKGxvY2F0aW9uLlkpXHJcbiAgICB9XHJcblxyXG4gICAgLy/ku47mn5DkuIDlsYLlvIDlp4vkuIDlsYLlsYLph43mlrDmkYbmlL7pgZPlhbdcclxuICAgIFJlc2V0SXRlbShmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZVJld2FyZHMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIGZvciAobGV0IGxvb3BGbG9vcjogbnVtYmVyID0gZmxvb3I7IGxvb3BGbG9vciA8PSB0aGlzLkhlYWRGbG9vci5GbG9vck51bTsgKytsb29wRmxvb3IpIHtcclxuICAgICAgICAgICAgdmFyIGZsb29yTGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGxvb3BGbG9vcik7XHJcbiAgICAgICAgICAgIGZsb29yTGluZS5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmbG9vckxpbmUuU2V0TGluZShmbG9vckxpbmUuRmxvb3JOdW0pO1xyXG4gICAgICAgICAgICB0aGlzLl9QdXRJdGVtSW5MaW5lKGxvb3BGbG9vcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5riF55CG5bGC6YGT5YW3XHJcbiAgICBDbGVhckZsb29yKHN0ZXA6IFN0ZXApOiB2b2lkIHtcclxuICAgICAgICB2YXIgc3RlcEl0ZW0gPSBzdGVwLlN0ZXBJdGVtO1xyXG4gICAgICAgIHN0ZXAuUHV0SXRlbShJdGVtVHlwZS5Ob25lKTtcclxuICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBEZWF0aCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLlBsYXllci5QbGF5ZXJEZWF0aCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tX09uR2FtZUNvbXBsZXRlKCk7XHJcbiAgICAgICAgLy91aS5TZXRHYW1lSW5mbyh0aGlzLlBsYXllckRpc3RhbmNlLHRoaXMuX0dvbGROdW0pO1xyXG4gICAgfVxyXG5cclxuICAgIEVuZCgpOiB2b2lkICB7XHJcblxyXG4gICAgfVxyXG4gICAgLy/ph43mlrDlvIDlp4tcclxuICAgIFJlU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUoKTtcclxuICAgIH1cclxuICAgIFNob3dJbnB1dEluZm8oaW5mbzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICB9XHJcbiAgICAvL+W3puWPs+enu+WKqFxyXG4gICAgTW92ZVN0ZXAoaXNSaWdodDogYm9vbGVhbikge1xyXG4gICAgICAgIC8vdmFyIGJ1ZmYgPSB0aGlzLkJ1ZmZlcjtcclxuICAgICAgICAvL+iOt+WPluS4i+S4gOWxgueahFN0ZXBcclxuICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHRoaXMuUGxheWVyLkN1clN0ZXA7XHJcbiAgICAgICAgaWYgKHN0ZXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1JpZ2h0KSB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RlcCA9PSBudWxsIHx8IHN0ZXAuU3RlcEl0ZW0uSXNGb3JiaWRlbikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5bGC5pWw6I635Y+W5p+Q5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIEdldEZsb29yQnlGbG9vcihmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHRhaWxGbG9vcjogTW91bnRMaW5lID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGFpbEZsb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3JJRCA9IChmbG9vciAtIHRhaWxGbG9vci5GbG9vck51bSArIHRoaXMuX1RhaWxGTG9vcklkeCkgJSB0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbZmxvb3JJRF07XHJcbiAgICB9XHJcblxyXG4gICAgTG9vcERvRmxvb3JTdGVwKGZsb29yOiBudW1iZXIsIE93bmVyOiBhbnksIGNhbGxCYWNrOiAoc3RlcDogU3RlcCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtIHx8IGZsb29yID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3JMaW5lOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZmxvb3JMaW5lLkxvZ2ljTGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcCA9IGZsb29yTGluZS5HZXRTdGVwKGlkeCk7XHJcbiAgICAgICAgICAgIGNhbGxCYWNrLmNhbGwoT3duZXIsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmui/h+WdkOagh+iOt+WPluWPsOmYtlxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOe0ouW8lSzlsYLmlbBcclxuICAgICAqL1xyXG4gICAgR2V0U3RlcEJ5TG9jYXRpb24obG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKTogU3RlcCB7XHJcbiAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb2NhdGlvbi5ZKS5HZXRTdGVwKGxvY2F0aW9uLlgpO1xyXG4gICAgICAgIHJldHVybiBnZXRTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yib5bu655u45YWz5pS+6L+ZIOi/memHjOmHjeaWsOW8gOWni+S4jeS8mui1sFxyXG4gICAgcHVibGljIFN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gbmV3IEdhbWVDYW1lcmEoKTtcclxuICAgICAgICB0aGlzLkNhbWVyYS50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyID0gbmV3IExheWEuVmVjdG9yMygtMzAsIDAsIDApO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMuQ2FtZXJhKTtcclxuXHJcbiAgICAgICAgdGhpcy5Nb3VudExpbmVzID0gW107XHJcbiAgICAgICAgdmFyIG1heExpbmVOdW0gPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5NYXhMaW5lTnVtO1xyXG4gICAgICAgIGZvciAodmFyIGxpbmVJZHg6IG51bWJlciA9IG1heExpbmVOdW0gLSAxOyBsaW5lSWR4ID49IDA7IC0tbGluZUlkeCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3TW91bnRMaW5lID0gbmV3IE1vdW50TGluZShsaW5lSWR4LCBsaW5lSWR4KTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoobmV3TW91bnRMaW5lKTtcclxuICAgICAgICAgICAgdGhpcy5Nb3VudExpbmVzW2xpbmVJZHhdID0gbmV3TW91bnRMaW5lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WIm+W7ulVJXHJcblxyXG4gICAgICAgIC8v5Yib5bu6546p5a62XHJcbiAgICAgICAgdmFyIHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB2YXIgZ2FtZUFnZW50ID0gR2FtZUFnZW50LkFnZW50O1xyXG4gICAgICAgIHZhciBwbGF5ZXJNb2RlbCA9IEdhbWVBUFAuQ2hhcmFjdGVyTWdyLkdldENoYXJhY3Rlck1vZGVsKGdhbWVBZ2VudC5DdXJDaGFyYWN0ZXJJRCxnYW1lQWdlbnQuQ3VyTGV2ZWwpO1xyXG4gICAgICAgIHBsYXllci5TZXRQbGF5ZXJNb2RlbChwbGF5ZXJNb2RlbCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5QbGF5ZXIpO1xyXG5cclxuICAgICAgICAvL+WHhuWkh+eOqeWutuatu+S6oeS6i+S7tlxyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCwgdGhpcy5EZWF0aCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/m+WFpea4uOaIj+eahOiuvue9ruaUvui/memHjCDph43mlrDlvIDlp4votbDov5nph4xcclxuICAgIHByb3RlY3RlZCBTdGFydEdhbWUoKSB7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5TY2VuZU9iai5hbWJpZW50Q29sb3IgPSBuZXcgTGF5YS5WZWN0b3IzKDEsIDEsIDEpXHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKDAsIDApO1xyXG4gICAgICAgIC8v6YeN572u54mp5ZOBXHJcbiAgICAgICAgdGhpcy5JdGVtTGF5b3V0ID0gbmV3IEl0ZW0uSXRlbUxheW91dCgpXHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHZhciBsaW5lczogTW91bnRMaW5lW10gPSB0aGlzLk1vdW50TGluZXM7XHJcbiAgICAgICAgLy/liJvlu7rovpPlhaXmjqfliLblmahcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG5ldyBJbnB1dC5Ob3JtR2FtZUlucHV0KHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9IGxpbmVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllci5SZXNldCgpO1xyXG4gICAgICAgIGZvciAodmFyIGlkeDogbnVtYmVyID0gMDsgaWR4IDwgbGluZXMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICB2YXIgbGluZTogTW91bnRMaW5lID0gdGhpcy5Nb3VudExpbmVzW2lkeF07XHJcbiAgICAgICAgICAgIGxpbmUuU2V0TGluZShpZHgpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ID4gMClcclxuICAgICAgICAgICAgICAgIGxpbmVzW2lkeCAtIDFdLlNldE5leHRGbG9vcihsaW5lKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgUGxheWVyU3RlcCA9IGxpbmUuR2V0U3RlcChNYXRoLmZsb29yKGxpbmUuTG9naWNMZW5ndGggLyAyKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5TZXRTdGVwKFBsYXllclN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gUGxheWVyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1N0YXJ0UG9zaXRpb24gPSB0aGlzLlBsYXllci5Mb2dpY1Bvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShpZHgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbWVyYS5SZXNldChuZXcgTGF5YS5WZWN0b3IzKCksIG5ldyBMYXlhLlZlY3RvcjModGhpcy5QbGF5ZXIuUG9zaXRpb24ueCwgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCAqIDEwLjUsIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGggKiA5KSwgdGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgIHRoaXMuX0dvbGROdW0gPSAwO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljR29sZE51bSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuUGFuZWxVSSA9IEFQUC5VSU1hbmFnZXIuU2hvdyhHYW1lVUkpO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5Hb2xkID0gMDtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSB0aGlzLkdhbWVUaW1lICsgNjAwMDtcclxuICAgICAgICB0aGlzLl9Cb290b21GbG9vciA9IDA7XHJcbiAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSA9IHRoaXMuX1N0YXJ0Q291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fR2FtZVVwZGF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0dhbWVVcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8v5q2j5bi46L+Q6KGM5pe255qE5q+P5bin6YC76L6RXHJcbiAgICBwcml2YXRlIF9SdW5HYW1lVXBkYXRlKCkge1xyXG4gICAgICAgIHZhciBkaXN0OiBudW1iZXIgPSB0aGlzLlBsYXllckZsb29yO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5EaXN0YW5jZSA9IHRoaXMuRGlzdGFuY2U7IC8vdGhpcy5EaXN0YW5jZSgpOy8vTWF0aC5mbG9vcihkaXN0KTtcclxuICAgICAgICBpZiAodGhpcy5GcmVzaEJHQ291bnQgPiAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9DdXJCRy5VcGRhdGVQYWdlKGRpc3QpO1xyXG4gICAgICAgICAgICB0aGlzLkZyZXNoQkdDb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICsrdGhpcy5GcmVzaEJHQ291bnQ7XHJcblxyXG4gICAgICAgIHZhciBmbG9vVmVjdG9yOiBMYXlhLlZlY3RvcjMgPSB0aGlzLlRhaWxGTG9vci5Qb3NpdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKGZsb29WZWN0b3IueiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLnogPiAzICogQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlIC8gMikge1xyXG4gICAgICAgICAgICB0aGlzLl9QdXNoRkxvb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX0NvdW50VGltZSA8IHRoaXMuR2FtZVRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gdGhpcy5HYW1lVGltZSArIDMwMDA7XHJcbiAgICAgICAgICAgIHRoaXMuX0Rlc3Ryb3lMaW5lKHRoaXMuX0Jvb3RvbUZsb29yKTtcclxuICAgICAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vlgJLorqHml7bmnJ/pl7TnmoTmr4/luKfpgLvovpFcclxuICAgIHByaXZhdGUgX1N0YXJ0Q291bnQoKSB7XHJcbiAgICAgICAgdmFyIHRpbWU6IHN0cmluZyA9IFwiXCJcclxuICAgICAgICB2YXIgY291bnRUaW1lOiBudW1iZXIgPSB0aGlzLl9Db3VudFRpbWUgLSB0aGlzLkdhbWVUaW1lO1xyXG4gICAgICAgIGlmIChjb3VudFRpbWUgPiAwKVxyXG4gICAgICAgICAgICB0aW1lICs9IE1hdGguZmxvb3IoY291bnRUaW1lIC8gMTAwMCk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuUGFuZWxVSS5HYW1lUGFuZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9HYW1lVXBkYXRlID0gdGhpcy5fUnVuR2FtZVVwZGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gdGhpcy5HYW1lVGltZSArIDMwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5TZXRDb3VudFRpbWUodGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsIblsYLlkJHkuIrlj6BcclxuICAgIHByb3RlY3RlZCBfUHVzaEZMb29yKCkge1xyXG4gICAgICAgIHZhciBwcmVIZWFkOiBNb3VudExpbmUgPSB0aGlzLkhlYWRGbG9vcjtcclxuICAgICAgICB0aGlzLl9IZWFkRmxvb3JJZHggPSAodGhpcy5fSGVhZEZsb29ySWR4ICsgMSkgJSB0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuX1RhaWxGTG9vcklkeCA9ICh0aGlzLl9UYWlsRkxvb3JJZHggKyAxKSAlIHRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIEhlYWRmbG9vcjogbnVtYmVyID0gcHJlSGVhZC5GbG9vck51bSArIDE7XHJcbiAgICAgICAgdGhpcy5IZWFkRmxvb3IuU2V0TGluZShIZWFkZmxvb3IpO1xyXG4gICAgICAgIHByZUhlYWQuU2V0TmV4dEZsb29yKHRoaXMuSGVhZEZsb29yKTtcclxuICAgICAgICBjb25zb2xlLnRpbWUoXCJQdXRJdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuX1B1dEl0ZW1JbkxpbmUoSGVhZGZsb29yKTtcclxuICAgICAgICBjb25zb2xlLnRpbWVFbmQoXCJQdXRJdGVtXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRhuaUvueJqeWTgVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIOeJqeWTgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgX1B1dEl0ZW1JbkxpbmUoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBzYWZlQ29sOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PG51bWJlcj47IH0gPSB7fTtcclxuICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIC8v5biD572u6L+H5LqG5LiN55So5YaN5biD572u5LqGXHJcbiAgICAgICAgaWYgKGZsb29yTGluZS5MYXlPdXREaXJ0eSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZsb29yTGluZS5MYXlPdXREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgLypcclxuICAgICAgICBpZihmbG9vciA+PSB0aGlzLl9TYWZlTG9jYXRpb24uWSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLk1heExpbmVOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzYWZlQ29sID0gdGhpcy5fQ291bnRPcGVuTGlzdChmbG9vcik7XHJcbiAgICAgICAgfWVsc2UqL1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mkYbmlL7liY3lhYjorqHnrpfor6XlsYLpgJrot6/mg4XlhrUgXHJcbiAgICAgICAgICAgIHNhZmVDb2wgPSB7fVxyXG4gICAgICAgICAgICBzYWZlQ29sW1wib1wiXSA9IHRoaXMuX0NvdW50Um9hZEluZm8oZmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WHuueUn+eCueS4jeaUvumBk+WFt1xyXG4gICAgICAgIGlmIChmbG9vciA8IDEgfHwgZmxvb3IgPT0gdGhpcy5TYWZlTG9jYXRpb24uWSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6I635Y+W6K+l6KGM6KaB5pGG5pS+55qE54mp5ZOBXHJcbiAgICAgICAgdGhpcy5fVGFrZUl0ZW1MaXN0KGZsb29yKVxyXG5cclxuICAgICAgICAvL+agh+iusOS4gOadoee7neWvueWuieWFqOeahOi3r1xyXG4gICAgICAgIHZhciBzYWZlSWR4Q29sbDogeyBba2V5OiBzdHJpbmddOiBudW1iZXI7IH0gPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBjb2xLZXkgaW4gc2FmZUNvbCkge1xyXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHNhZmVDb2xbY29sS2V5XTtcclxuICAgICAgICAgICAgdmFyIHNhZmVJZHggPSBsaXN0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpc3QubGVuZ3RoKV07XHJcbiAgICAgICAgICAgIGlmIChzYWZlSWR4Q29sbFtzYWZlSWR4XSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNhZmVJZHhDb2xsW3NhZmVJZHhdID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aKiumcgOimgeaUvumBk+WFt+eahOagvOWtkOaUvuWFpemaj+acuuaxoFxyXG4gICAgICAgIHZhciBjdXJGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciByYW5kb21Qb29sOiBBcnJheTxTdGVwPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8v5oqK5a6J5YWo55qE5qC85a2Q5pqC5pe256e75Ye65p2lXHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDogQXJyYXk8U3RlcD4gPSBuZXcgQXJyYXk8U3RlcD4oKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4OiBudW1iZXIgPSAwOyBzdGVwSWR4IDwgY3VyRmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkge1xyXG4gICAgICAgICAgICB2YXIgZ2V0U3RlcDogU3RlcCA9IGN1ckZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgIGlmIChzYWZlSWR4Q29sbFtzdGVwSWR4XSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBvb2wucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGdldFN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pS+6Zm36ZixXHJcbiAgICAgICAgdmFyIGJhcnJpZXJzTGlzdDogQXJyYXk8TGluZUl0ZW1JbmZvPiA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzO1xyXG4gICAgICAgIHRoaXMuX09yZ2luaXplUHV0SXRlbShiYXJyaWVyc0xpc3QsIHJhbmRvbVBvb2wsIHRydWUpO1xyXG5cclxuICAgICAgICAvL+aRhuaUvumBk+WFt1xyXG4gICAgICAgIGZvciAodmFyIHNhZmVTdGVwSWR4OiBudW1iZXIgPSAwOyBzYWZlU3RlcElkeCA8IHNhZmVTdGVwTGlzdC5sZW5ndGg7ICsrc2FmZVN0ZXBJZHgpIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKHNhZmVTdGVwTGlzdFtzYWZlU3RlcElkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmV3YXJkTGlzdCA9IHRoaXMuQ3VyTGluZVJld2FyZHM7XHJcbiAgICAgICAgdGhpcy5fT3JnaW5pemVQdXRJdGVtKHJld2FyZExpc3QsIHJhbmRvbVBvb2wpO1xyXG4gICAgICAgIC8v5YaN5qyh6K6h566X6YCa6Lev5oOF5Ya1IFxyXG4gICAgICAgIC8vdGhpcy5fQ291bnRMYXN0Rmxvb3JSb2FkKGZsb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRhuaUvueJqeWTgVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxMaW5lSXRlbUluZm8+fSBpdGVtTGlzdCDnianlk4HliJfooahcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U3RlcD59IHJhbmRvbVBvb2wg5Y+w6Zi26ZuG5ZCIXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRGVhZFJvYWQg5piv5ZCm5piv5q276LevXHJcbiAgICAgKi9cclxuICAgIF9Pcmdpbml6ZVB1dEl0ZW0oaXRlbUxpc3Q6IEFycmF5PExpbmVJdGVtSW5mbz4sIHJhbmRvbVBvb2w6IEFycmF5PFN0ZXA+LCBpc0RlYWRSb2FkOiBib29sZWFuID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAodmFyIGl0ZW1JZHg6IG51bWJlciA9IDA7IGl0ZW1JZHggPCBpdGVtTGlzdC5sZW5ndGg7ICsraXRlbUlkeCkge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzogTGluZUl0ZW1JbmZvID0gaXRlbUxpc3RbaXRlbUlkeF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGRpZmZpY3VsdHlOdW06IG51bWJlciA9IDA7IGRpZmZpY3VsdHlOdW0gPCBpbmZvLk51bWJlcjspIHtcclxuICAgICAgICAgICAgICAgIGlmIChyYW5kb21Qb29sLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v6ZqP5py65oqK6Zqc56KN5pS+5YWl5qC85a2Q6YeMXHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tSWR4OiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYW5kb21Qb29sLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHJhbmRvbVBvb2xbcmFuZG9tSWR4XTtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBvb2wuc3BsaWNlKHJhbmRvbUlkeCwgMSk7XHJcbiAgICAgICAgICAgICAgICBzdGVwLlB1dEl0ZW0oaW5mby5UeXBlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0RlYWRSb2FkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gaXNEZWFkUm9hZDtcclxuICAgICAgICAgICAgICAgIC0taW5mby5OdW1iZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJhbmRvbVBvb2wubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW1JZHggPiAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW1MaXN0LnNwbGljZSgwLCBpdGVtSWR4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKumAkuW9kuiuoeeul+mAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yTnVtIOeJqeWTgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBfQ291bnRPcGVuTGlzdChmbG9vck51bTogbnVtYmVyKTogeyBba2V5OiBzdHJpbmddOiBBcnJheTxudW1iZXI+OyB9IHtcclxuICAgICAgICBmb3IgKHZhciBmbG9vckNvdW50OiBudW1iZXIgPSB0aGlzLlBsYXllckZsb29yOyBmbG9vckNvdW50IDw9IGZsb29yTnVtOyArK2Zsb29yQ291bnQpIHtcclxuICAgICAgICAgICAgdmFyIGZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vckNvdW50KTtcclxuICAgICAgICAgICAgaWYgKGZsb29yID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGZvciAodmFyIHN0ZXBJZHggPSAwOyBzdGVwSWR4IDwgZmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICAgICAgc3RlcC5NYXJrID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IodGhpcy5QbGF5ZXJGbG9vcik7XHJcbiAgICAgICAgZm9yICh2YXIgc3RlcElkeCA9IDA7IHN0ZXBJZHggPCBmbG9vci5Mb2dpY0xlbmd0aDsgKytzdGVwSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX01hcmtTdGVwcyhzdGVwLCBzdGVwSWR4LCBmbG9vck51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRhcmdldEZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSk7XHJcbiAgICAgICAgLy/mib7lh7rooqvmoIforrDnmoTngrnlubbmlbTnkIbmiJDpm4blkIhcclxuICAgICAgICB2YXIgY29sbGVjdGlvbjogeyBba2V5OiBzdHJpbmddOiBBcnJheTxudW1iZXI+OyB9ID0ge31cclxuICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gXCJvXCJcclxuICAgICAgICBmb3IgKHZhciBvcGVuSWR4OiBudW1iZXIgPSAwOyBvcGVuSWR4IDwgdGFyZ2V0Rmxvb3IuTG9naWNMZW5ndGg7ICsrb3BlbklkeCkge1xyXG4gICAgICAgICAgICB2YXIgbWFya2VkU3RlcDogU3RlcCA9IHRhcmdldEZsb29yLkdldFN0ZXAob3BlbklkeCk7XHJcbiAgICAgICAgICAgIGlmIChtYXJrZWRTdGVwLk1hcmsgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgTmFtZTogc3RyaW5nID0gbmFtZSArIG1hcmtlZFN0ZXAuTWFyaztcclxuICAgICAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uW05hbWVdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25bTmFtZV0gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uW05hbWVdLnB1c2gob3BlbklkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAq6YCS5b2S5qCH6K6w6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge1N0ZXB9IHN0ZXAg5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gbWFyayDmoIforrBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXRGbG9vck51bSDnm67moIflsYLmlbBcclxuICAgICAqL1xyXG4gICAgX01hcmtTdGVwcyhzdGVwOiBTdGVwLCBtYXJrOiBhbnksIHRhcmdldEZsb29yTnVtOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoc3RlcC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHN0ZXAuRmxvb3IuRmxvb3JOdW0gPj0gdGFyZ2V0Rmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgaWYgKHN0ZXAuTWFyayA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0ZXAuTWFyayA9IG1hcmtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlZnRPcGVuOiBib29sZWFuO1xyXG4gICAgICAgIHZhciByaWdodE9wZW46IGJvb2xlYW47XHJcbiAgICAgICAgdmFyIGxlZnRQYXJlbnQ6IFN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgaWYgKGxlZnRQYXJlbnQgIT0gbnVsbCAmJiAhbGVmdFBhcmVudC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgIGlmIChsZWZ0UGFyZW50Lk1hcmsgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgbGVmdE9wZW4gPSB0aGlzLl9NYXJrU3RlcHMobGVmdFBhcmVudCwgbWFyaywgdGFyZ2V0Rmxvb3JOdW0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBsZWZ0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByaWdodFBhcmVudDogU3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgaWYgKHJpZ2h0UGFyZW50ICE9IG51bGwgJiYgIXJpZ2h0UGFyZW50LklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgaWYgKHJpZ2h0UGFyZW50Lk1hcmsgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmlnaHRPcGVuID0gdGhpcy5fTWFya1N0ZXBzKHJpZ2h0UGFyZW50LCBtYXJrLCB0YXJnZXRGbG9vck51bSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJpZ2h0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGVwLk1hcmsgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHN0ZXAuTWFyayA9IG1hcmtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFsZWZ0T3BlbiAmJiAhcmlnaHRPcGVuKSB7XHJcbiAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnIDlkI7lho3orqHnrpfkuIDmrKHor6XlsYLpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vck51bSBcclxuICAgICAqL1xyXG4gICAgX0NvdW50TGFzdEZsb29yUm9hZChmbG9vck51bTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGZsb29yTnVtIDwgdGhpcy5UYWlsRkxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3IgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSk7XHJcbiAgICAgICAgdmFyIGxhc3RGbG9vciA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yTnVtIC0gMSk7XHJcbiAgICAgICAgZm9yICh2YXIgc3RlcElkeCA9IDA7IHN0ZXBJZHggPCBmbG9vci5Mb2dpY0xlbmd0aDsgKytzdGVwSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBMZWZ0U3RlcCA9IHN0ZXAuTGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgdmFyIFJpZ2h0U3RlcCA9IHN0ZXAuUmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICAgIGlmIChMZWZ0U3RlcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFMZWZ0U3RlcC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrTGVmdFN0ZXAuUm9hZE51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoUmlnaHRTdGVwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIVJpZ2h0U3RlcC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrUmlnaHRTdGVwLlJvYWROdW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGxhc3RTdGVwSWR4ID0gMDsgbGFzdFN0ZXBJZHggPCBsYXN0Rmxvb3IuTG9naWNMZW5ndGg7ICsrbGFzdFN0ZXBJZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQgJiYgc3RlcC5Sb2FkTnVtIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy/lkJHkuIrpgJLlvZLmiormiYDmnInkuI7kuYvnm7jov57nmoToioLngrnmlbDnu5nkv67mraPkuoZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUvumBk+WFt+WJjeeul+mAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIFxyXG4gICAgICovXHJcbiAgICBfQ291bnRSb2FkSW5mbyhmbG9vcjogbnVtYmVyKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIHZhciB0aGlzRmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuXHJcbiAgICAgICAgdmFyIHJvYWROdW06IG51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGxhc3RGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IgLSAxKTtcclxuICAgICAgICBpZiAoZmxvb3IgPT0gdGhpcy5fU2FmZUxvY2F0aW9uLlkpXHJcbiAgICAgICAgICAgIHRoaXMuX1Jlc2V0U3RlcEluZm8odGhpc0Zsb29yKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgbG9naWNJZHg6IG51bWJlciA9IDA7IGxvZ2ljSWR4IDwgdGhpc0Zsb29yLkxvZ2ljTGVuZ3RoOyArK2xvZ2ljSWR4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgICAgIHZhciBsZWZ0Q2hpbGQ6IFN0ZXAgPSBzdGVwLkxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodENoaWxkOiBTdGVwID0gc3RlcC5SaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnRDaGlsZCAhPSBudWxsICYmICFsZWZ0Q2hpbGQuSXNEZWFkUm9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmlnaHRDaGlsZCAhPSBudWxsICYmICFyaWdodENoaWxkLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZsb29yID09IHRoaXMuX1NhZmVMb2NhdGlvbi5ZKSB7XHJcbiAgICAgICAgICAgIHZhciBzYWZlU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKHRoaXMuX1NhZmVMb2NhdGlvbi5YKTtcclxuICAgICAgICAgICAgc2FmZVN0ZXAuSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaCh0aGlzLl9TYWZlTG9jYXRpb24uWCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2FmZVN0ZXBMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIF9SZXNldFN0ZXBJbmZvKHRoaXNGbG9vcjogTW91bnRMaW5lKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzRmxvb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBsb2dpY0lkeDogbnVtYmVyID0gMDsgbG9naWNJZHggPCB0aGlzRmxvb3IuTG9naWNMZW5ndGg7ICsrbG9naWNJZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5p+Q6YGT5YW35L+h5oGvXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX1Rha2VJdGVtTGlzdChmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgdmFyIGl0ZW1MaXN0ID0gbmV3IEFycmF5KGxpbmUuTG9naWNMZW5ndGgpO1xyXG4gICAgICAgIHZhciBsaW5lUmV3YXJkcyA9IHRoaXMuSXRlbUxheW91dC5UYWtlTGluZVJld2FyZChmbG9vcik7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IHRoaXMuQ3VyTGluZVJld2FyZHMuY29uY2F0KGxpbmVSZXdhcmRzKTtcclxuICAgICAgICBpZiAodGhpcy5TYWZlTG9jYXRpb24uWSA+IGZsb29yIHx8IGZsb29yID4gdGhpcy5TYWZlTG9jYXRpb24uWSArIDEpIHtcclxuICAgICAgICAgICAgdmFyIGxpbmVCYXJyaWVycyA9IHRoaXMuSXRlbUxheW91dC5UYWtlTGluZURpZmZpY3VsdHkoZmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzLmNvbmNhdChsaW5lQmFycmllcnMpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkN1ckxpbmVCYXJyaWVycy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5aGM6Zm35p+Q5LiA5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX0Rlc3Ryb3lMaW5lKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGFpbEZsb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgY291bnRGbG9vcjogbnVtYmVyID0gdGFpbEZsb29yLkZsb29yTnVtOyBjb3VudEZsb29yIDw9IGZsb29yOyArK2NvdW50Rmxvb3IpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldEZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihjb3VudEZsb29yKTtcclxuICAgICAgICAgICAgdGFyZ2V0Rmxvb3IuQnJlYWsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG1fT25HYW1lQ29tcGxldGUoKSAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCwgdGhpcy5EZWF0aCwgdGhpcyk7XHJcbiAgICAgICAgdmFyIHVpOiBFbmRHYW1lVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8RW5kR2FtZVVJPihFbmRHYW1lVUkpO1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5BZGRHb2xkKHRoaXMuX0dvbGROdW0pO1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5BZGRTY29yZSh0aGlzLl9Hb2xkTnVtICogMTAgKyB0aGlzLkRpc3RhbmNlICogMTApO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBwYXRoIHtcclxuICAgIGV4cG9ydCB2YXIgSXNFZGl0b3I6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgZXhwb3J0IHZhciB2ZXJzaW9uOiBzdHJpbmcgPSBcIj92PTFcIjtcclxuICAgIGV4cG9ydCB2YXIgU2NlbmVBc3NldFBhdGg6IHN0cmluZyA9IFwiTGF5YVNjZW5lX1wiO1xyXG4gICAgZXhwb3J0IHZhciBSZXNvdXJjZVBhdGg6IHN0cmluZyA9IElzRWRpdG9yID8gXCIuLi9OZXRSZXNvdXJjZV8zXzI5L1wiIDogXCJodHRwczovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9OZXRSZXNvdXJjZV8zXzI5L1wiO1xyXG4gICAgZXhwb3J0IHZhciBVSVBhdGg6IHN0cmluZyA9IFJlc291cmNlUGF0aCArIFwiVUkvXCI7XHJcbiAgICBleHBvcnQgdmFyIE1vZGVsUGF0aDogc3RyaW5nID0gUmVzb3VyY2VQYXRoICsgXCIzRC9cIlxyXG4gICAgZXhwb3J0IHZhciBDb25maWdQYXRoOiBzdHJpbmcgPSBSZXNvdXJjZVBhdGggKyBcIkNvbmZpZy9cIlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WQXRs5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRBdGxQYXRoKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBVSVBhdGggKyBmaWxlTmFtZSArIFwiLmF0bGFzXCIgKyB2ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WVUlKc29u6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXREZXBhdGhVSUpTKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBVSVBhdGggKyBmaWxlTmFtZSArIFwiLmpzb25cIiArIHZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZsaOaWh+S7tui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0TEgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIE1vZGVsUGF0aCArIFNjZW5lQXNzZXRQYXRoICsgZmlsZU5hbWUgKyBcIi9Db252ZW50aW9uYWwvXCIgKyBmaWxlTmFtZSArIFwiLmxoXCIgKyB2ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Yqg6L29SnNvbui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0SnNvblBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIENvbmZpZ1BhdGggKyBmaWxlTmFtZSArIFwiLmpzb25cIiArIHZlcnNpb247XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIFVJRnVuYyB7XHJcbiAgICAvL+iuoeeul+e8qeaUvuWAvFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvdW50U2NhbGVGaXgod2lkdGg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCF3aWR0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFnZVdpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB2YXIgc2NhbGU6IG51bWJlciA9IHN0YWdlV2lkdGggLyB3aWR0aDtcclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gRml4VUkodmlldzogTGF5YS5TcHJpdGUsIHdpZHRoOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBVSUZ1bmMuQ291bnRTY2FsZUZpeCh3aWR0aCA/IHdpZHRoIDogdmlldy53aWR0aCk7XHJcbiAgICAgICAgdmlldy5zY2FsZVggPSBzY2FsZTtcclxuICAgICAgICB2aWV3LnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgIHZpZXcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQgLyBzY2FsZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWdyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBUaW1lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVGltZU1hbmFnZXJcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQUCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX1NjZW5lTWdyOiBTY2VuZU1ncjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfVGltZU1ncjogVGltZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX1VJTWFuYWdlcjogVUlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfRnJhbWVXb3JrOkZyYW1lV29yaztcclxuICAgIHN0YXRpYyBnZXQgRnJhbWVXb3JrKCk6RnJhbWVXb3JrXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ19GcmFtZVdvcms7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IE1lc3NhZ2VNYW5hZ2VyKCk6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyICB7XHJcbiAgICAgICAgcmV0dXJuIEFQUC5nX01lc3NhZ2U7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IFVJTWFuYWdlcigpOiBVSU1hbmFnZXIgIHtcclxuICAgICAgICBpZiAoQVBQLmdfVUlNYW5hZ2VyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIEFQUC5nX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLmdfVUlNYW5hZ2VyO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBTY2VuZU1hbmFnZXIoKTogU2NlbmVNZ3IgIHtcclxuICAgICAgICBpZiAoQVBQLmdfU2NlbmVNZ3IgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgQVBQLmdfU2NlbmVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFNjZW5lTWdyPihTY2VuZU1ncik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuZ19TY2VuZU1ncjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgVGltZU1hbmFnZXIoKTogVGltZU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZiAoQVBQLmdfVGltZU1nciA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBBUFAuZ19UaW1lTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxUaW1lTWFuYWdlcj4oVGltZU1hbmFnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLmdfVGltZU1ncjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLmdfRnJhbWVXb3JrID0gRnJhbWVXb3JrLkZNO1xyXG4gICAgICAgIHZhciBmbTpGcmFtZVdvcmsgID0gQVBQLmdfRnJhbWVXb3JrO1xyXG4gICAgICAgIEFQUC5nX01lc3NhZ2UgPSBmbS5BZGRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgQVBQLmdfU2NlbmVNZ3IgPSAgZm0uQWRkTWFuYWdlcjxTY2VuZU1ncj4oU2NlbmVNZ3IpO1xyXG4gICAgICAgIEFQUC5nX1RpbWVNZ3IgPSBmbS5BZGRNYW5hZ2VyPFRpbWVNYW5hZ2VyPihUaW1lTWFuYWdlcik7XHJcbiAgICAgICAgQVBQLmdfVUlNYW5hZ2VyID0gZm0uQWRkTWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCBDaGFyYWN0ZXJNYW5hZ2VyIGZyb20gXCIuLy4uL0dhbWVNYW5hZ2VyL0NoYXJhY3Rlck1hbWFnZXJcIlxyXG5pbXBvcnQgSXRlbU1hbmFnZXIgZnJvbSBcIi4vLi4vR2FtZU1hbmFnZXIvSXRlbU1hbmFnZXJcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQVBQXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IENoYXJhY3Rlck1ncigpOkNoYXJhY3Rlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gQ2hhcmFjdGVyTWFuYWdlci5NZ3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJdGVtTWdyKCk6SXRlbU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSXRlbU1hbmFnZXIuTWdyO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3REZWxlZ2F0ZSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IFNldFBhbmVsVUkgZnJvbSBcIi4vLi4vdWkvU2V0UGFuZWxVSVwiXHJcbmltcG9ydCBDaGFyYWN0ZXJVSSBmcm9tIFwiLi8uLi91aS9DaGFyYWN0ZXJVSVwiXHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZVNjZW5lXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuL0FQUFwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuXHJcbnR5cGUgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sZXJcclxue1xyXG4gICAgc3RhdGljIGdldCBHYW1lQ29udHJvbGVyKCk6R2FtZUNvbnRyb2xlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgR2FtZUNvbnRyb2xlci5NZ3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDb250cm9sZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjogR2FtZUNvbnRyb2xlcjtcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBNZ3IoKTogR2FtZUNvbnRyb2xlciB7XHJcbiAgICAgICAgaWYgKEdhbWVDb250cm9sZXIuX01nciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIEdhbWVDb250cm9sZXIuX01nciA9IG5ldyBHYW1lQ29udHJvbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lQ29udHJvbGVyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBfTGluZVN0ZXBOdW06bnVtYmVyO1xyXG4gICAgX01heExpbmVOdW06bnVtYmVyO1xyXG4gICAgX1N0ZXBMZW5ndGg6bnVtYmVyO1xyXG4gICAgX1N0ZXBEaXN0YW5jZTpudW1iZXI7XHJcbiAgICBfUGxheWVyTW92ZVRpbWU6bnVtYmVyO1xyXG4gICAgLy/luLjph4/lrprkuYlcclxuICAgIC8v5q+P6KGM5pyA5aSn5qC85a2Q5pWwXHJcbiAgICBnZXQgTGluZVN0ZXBOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX0xpbmVTdGVwTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTGluZVN0ZXBOdW0gPSA1KzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9MaW5lU3RlcE51bTtcclxuICAgIH0gXHJcbiAgICAvL+acgOWkp+ihjOaVsFxyXG4gICAgZ2V0IE1heExpbmVOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX01heExpbmVOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9NYXhMaW5lTnVtID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9NYXhMaW5lTnVtO1xyXG4gICAgfSBcclxuICAgIC8v5qC85a2Q6L656ZW/XHJcbiAgICBnZXQgU3RlcExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9TdGVwTGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RlcExlbmd0aCA9IDAuOTg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGVwTGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgLy/moLzlrZDmlpzlr7nop5Lplb/luqZcclxuICAgIGdldCBTdGVwRGlzdGFuY2UoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcERpc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RlcERpc3RhbmNlID0gTWF0aC5zcXJ0KCh0aGlzLlN0ZXBMZW5ndGggKiB0aGlzLlN0ZXBMZW5ndGgpICogMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGVwRGlzdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+eOqeWutuenu+WKqOaXtumXtFxyXG4gICAgZ2V0IFBsYXllck1vdmVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1BsYXllck1vdmVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fUGxheWVyTW92ZVRpbWUgPSAwLjAyICogMTAwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9QbGF5ZXJNb3ZlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRQbGF5ZXJJRChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGd1ZXN0QWdlbnQ6UGxheWVyR3Vlc3RBZ2VudCA9IFBsYXllckd1ZXN0RGVsZWdhdGUuR3Vlc3RBZ2VudDtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDpBcnJheTxudW1iZXI+ID0gZ3Vlc3RBZ2VudC5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIGlmKCFjaGFyYWN0ZXJMaXN0W2lkXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFndWVzdEFnZW50LkJ1eUNoYXJhY3RlcihpZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBndWVzdEFnZW50LlNldENoYXJhY3RlcihpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrorr7nva7pnaLmnb9cclxuICAgIFNob3dTZXRQYW5lbCgpIHtcclxuICAgICAgICB2YXIgUGFuZWwgPSBBUFAuVUlNYW5hZ2VyLlNob3c8U2V0UGFuZWxVST4oU2V0UGFuZWxVSSk7Ly8gbmV3IFNldFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrop5LoibLpnaLmnb9cclxuICAgIHB1YmxpYyBTaG93Q2hhcmFjdGVyUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IEFQUC5VSU1hbmFnZXIuU2hvdzxDaGFyYWN0ZXJVST4oQ2hhcmFjdGVyVUkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1NldEluZm87XHJcbiAgICBnZXQgU2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIGlmICh0aGlzLl9TZXRJbmZvID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFNldEluZm8odmFsdWU6IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuX1NldEluZm8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/neWtmOiuvue9ruaVsOaNrlxyXG4gICAgU2F2ZVNldEluZm8oaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5TZXRJbmZvID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvL+ivu+WPluiuvue9ruS/oeaBr1xyXG4gICAgR2V0U2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJHYW1lVUkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBFbnRlckdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZURpcigpOiBHYW1lRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkRpcmVjdG9yIGFzIEdhbWVEaXJlY3RvcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR2FtZVNjZW5lKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DaGFuZ2VTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQQlVGRuihqOeOsOaViOaenFxyXG4gICAgR2VuQnVmZkVmZmVjdCh0eXBlOiBJdGVtVHlwZSk6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEJ1eUl0ZW0oaWQ6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkJ1eUl0ZW0oaWQpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUVsZW1lbnQgZXh0ZW5kcyBMYXlhLkJveCB7XHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1JZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0J0bjogTGF5YS5CdXR0b247XHJcbiAgICBwcml2YXRlIF9JbWc6IExheWEuSW1hZ2U7XHJcbiAgICBwcml2YXRlIG1fTnVtTGFiZWw6IExheWEuTGFiZWw7XHJcbiAgICBwcml2YXRlIG1fTGFiZWxTdHJpbmc6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBtX0J1eUl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIHByaXZhdGUgbV9DaG9vc2VJdGVtOiBNZXNzYWdlTUQuRGVsZWdhdGU7XHJcblxyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J0biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgSXRlbUlkeChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1JZHggPSBpZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBJbWcoKTogTGF5YS5JbWFnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0ltZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQnV5QnRuKCk6IExheWEuQnV0dG9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBCdG5MYWJsZShzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFzdHIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9CdG4udGV4dC50ZXh0ID0gc3RyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBJc0dyYXkodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLkltZy5ncmF5ID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IElzR3JheSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5JbWcuZ3JheTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgTnVtKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0xhYmVsU3RyaW5nWzFdID0gXCJcIiArIG51bTtcclxuICAgICAgICB0aGlzLm1fTnVtTGFiZWwudGV4dCA9IHRoaXMubV9MYWJlbFN0cmluZ1swXSArIHRoaXMubV9MYWJlbFN0cmluZ1sxXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgUHJpY2UobnVtOiBudW1iZXIpICB7XHJcbiAgICAgICAgdGhpcy5fQnRuLnRleHQudGV4dCA9IFwiXCIgKyBudW07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5fSW1nID0gdGhpcy5nZXRDaGlsZEF0KDApIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgIHRoaXMubV9OdW1MYWJlbCA9IHRoaXMuZ2V0Q2hpbGRBdCgyKSBhcyBMYXlhLkxhYmVsO1xyXG4gICAgICAgIHRoaXMuX0J0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkJ1eUl0ZW0pO1xyXG4gICAgICAgIHRoaXMuX0ltZy5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkNob29zZUltZyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1fTGFiZWxTdHJpbmcpICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9MYWJlbFN0cmluZyA9IHRoaXMubV9OdW1MYWJlbC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENob29zZUltZygpIHtcclxuICAgICAgICBpZiAodGhpcy5tX0Nob29zZUl0ZW0pXHJcbiAgICAgICAgICAgIHRoaXMubV9DaG9vc2VJdGVtLkV4ZWN1dGUodGhpcy5tX0l0ZW1JZHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlJdGVtKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQnV5SXRlbSlcclxuICAgICAgICAgICAgdGhpcy5tX0J1eUl0ZW0uRXhlY3V0ZSh0aGlzLm1fSXRlbUlkeCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdEJ1eShvd25lcjogYW55LCBsaXN0ZW5lcjogKGlkOiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICB2YXIgbmV3RGVsZWdhdGUgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5tX0J1eUl0ZW0gPSBuZXdEZWxlZ2F0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0Q2hvb3NlKG93bmVyOiBhbnksIGxpc3RlbmVyOiAoaWQ6IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciBuZXdEZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fQ2hvb3NlSXRlbSA9IG5ld0RlbGVnYXRlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZUVsZW1lbnQgZXh0ZW5kcyBMYXlhLkltYWdlIHtcclxuICAgIC8vXHJcbiAgICBwcml2YXRlIF9CdG46IExheWEuQnV0dG9uO1xyXG4gICAgcHJpdmF0ZSBfSW1nOiBMYXlhLkltYWdlO1xyXG4gICAgcHJpdmF0ZSBtX09uQ2xpY2tJbWc6KGlkOm51bWJlcik9PnZvaWQ7XHJcbiAgICBwcml2YXRlIG1fQ2hhcmFjdGVySUQ6bnVtYmVyO1xyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J0biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICAgICAgdGhpcy5fQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRQbGF5ZXJJRCh0aGlzLm1fQ2hhcmFjdGVySUQpO1xyXG4gICAgICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuXHJcbiAgICBSZXNldCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX0ltZykge1xyXG4gICAgICAgICAgICB0aGlzLkluaXQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0R3JheShpc0dyYXk6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9JbWcuZ3JheSA9IGlzR3JheTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0T25JbWdDbGljayhldmVudEZ1bmN0aW9uOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBpZD10aGlzLm1fQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdGhpcy5fSW1nLm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCxldmVudEZ1bmN0aW9uKTsvLyBvd25lciwgKCk9PnsgZXZlbnRGdW5jdGlvbihpZCkgfSApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBDaGFyYWN0ZXJJRChpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3RlcklEID0gaWQ7XHJcbiAgICB9XHJcbiAgICBJbml0KCkgIHtcclxuICAgICAgICB0aGlzLl9JbWcgPSB0aGlzLmdldENoaWxkQXQoMCkgYXMgTGF5YS5JbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnR7QmFzZUZ1bmN9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQkdVSSBleHRlbmRzIHVpLkJHVUkge1xyXG4gICAgXHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkJHXCIpKSk7XHJcbiAgICB9XHJcbiAgICAvL3ByaXZhdGUgX1NreUFycjpBcnJheTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9Ta3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1RlbXBTa3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1NjYWxlU2t5Om51bWJlcjtcclxuICAgIHByaXZhdGUgX1NjYWxlRWFydGg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfRWFydGhTdGFydFBTOm51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB3aWRoID0gTGF5YS5zdGFnZS53aWR0aCA7XHJcbiAgICAgICAgdmFyIHJhdGUgPSBNYXRoLmNlaWwoTGF5YS5zdGFnZS5oZWlnaHQvd2lkaCk7XHJcblxyXG4gICAgICAgIHRoaXMuX1NreVF1ZSA9IG5ldyBCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+KCk7XHJcbiAgICAgICAgdGhpcy5fVGVtcFNreVF1ZSA9IG5ldyBCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+KCk7XHJcbiAgICAgICAgIC8vbmV3IEFycmF5PExheWEuSW1hZ2U+KHJhdGUrMSk7XHJcbiAgICAgICAgZm9yKGxldCBzdGFydElkeCA9IDA7c3RhcnRJZHg8cmF0ZSsxOyArK3N0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZTpMYXlhLkltYWdlID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1hZ2UubG9hZEltYWdlKFwiY29tcC9pbWdfYmFja2dyb3VuZF9zcHJfc2t5LnBuZ1wiKTtcclxuICAgICAgICAgICAgaW1hZ2Uud2lkdGggPSB3aWRoO1xyXG4gICAgICAgICAgICBpbWFnZS5oZWlnaHQgPSB3aWRoK3dpZGgqMC4wMTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChpbWFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1NreVF1ZS5QdXNoKGltYWdlKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIHRoaXMuU2V0U2t5KDApO1xyXG4gICAgICAgIHZhciBlYXJ0aCA9IG5ldyBMYXlhLkltYWdlKCk7XHJcbiAgICAgICAgZWFydGgueSA9IExheWEuc3RhZ2UuaGVpZ2h0IC0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9FYXJ0aFN0YXJ0UFMgPSBlYXJ0aC55O1xyXG4gICAgICAgIGVhcnRoLmxvYWRJbWFnZShcImNvbXAvaW1nX2JhY2tncm91bmRfc3ByLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLl9FYXJ0aCA9IGVhcnRoO1xyXG4gICAgICAgIGVhcnRoLndpZHRoID0gd2lkaDtcclxuICAgICAgICBlYXJ0aC5oZWlnaHQgPSB3aWRoO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoZWFydGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1NjYWxlU2t5ID0gMC4wMDFcclxuICAgICAgICB0aGlzLl9TY2FsZUVhcnRoID0gMC4wMVxyXG4gICAgICAgIC8vdGhpcy5fRWFydGhTdGFydFBTID0gdGhpcy5fRWFydGgueTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBJbml0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICBmb3IobGV0IHN0YXJ0SWR4Om51bWJlciA9IDA7c3RhcnRJZHg8dGhpcy5fU2t5UXVlLkNvdW50Oysrc3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU2t5QXJyW3N0YXJ0SWR4XS55ID0gc3RhcnRJZHggKiBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0VhcnRoLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fRWFydGhTdGFydFBTID0gdGhpcy5fRWFydGgueTtcclxuICAgIH0qL1xyXG4gICAgLy/pq5jluqbovazlsY/luZXpq5jluqblg4/ntKBcclxuICAgIEhlaWdodFRyYW5zUGl4KCBoZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBoZWlnaHQqLTAuMTtcclxuICAgIH1cclxuICAgIFNldFNreShwaXhIZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1Ta3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPiA9IHRoaXMuX1RlbXBTa3lRdWU7XHJcbiAgICAgICAgdGVtU2t5UXVlLkNsZWFyKCk7XHJcbiAgICAgICAgdmFyIGNvdW50Om51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgd2hpbGUodGhpcy5fU2t5UXVlLkNvdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpCYXNlRnVuYy5Ob2RlPExheWEuU3ByaXRlPiA9IHRoaXMuX1NreVF1ZS5Qb3BOb2RlKCk7XHJcbiAgICAgICAgICAgIHZhciBza3lJbWc6TGF5YS5TcHJpdGUgPSBub2RlLlZhbHVlO1xyXG4gICAgICAgICAgICBza3lJbWcueSA9IGNvdW50ICogaGVpZ2h0ICsgcGl4SGVpZ2h0IC0gaGVpZ2h0IC0gaGVpZ2h0KjAuMDE7XHJcbiAgICAgICAgICAgIHRlbVNreVF1ZS5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICAgICAgaWYoc2t5SW1nLnk+TGF5YS5zdGFnZS5oZWlnaHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNreUltZy55ID0gdGVtU2t5UXVlLkhlYWRWYWx1ZS55IC0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICsrY291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1RlbXBTa3lRdWUgPSB0aGlzLl9Ta3lRdWU7XHJcbiAgICAgICAgdGhpcy5fU2t5UXVlID0gdGVtU2t5UXVlO1xyXG4gICAgfVxyXG4gICAgU2V0RWFydGgoaGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9FYXJ0aC55ID0gdGhpcy5fRWFydGhTdGFydFBTICsgaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgVXBkYXRlUGFnZSggaGVpZ2h0Om51bWJlciApXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICAvL2hlaWdodCA9IHRoaXMuSGVpZ2h0VHJhbnNQaXgoaGVpZ2h0KTtcclxuICAgICAgICAvL3ZhciBza3lIZWlnaHRQaXggPSBoZWlnaHQqdGhpcy5fU2NhbGVTa3k7XHJcbiAgICAgICAgdGhpcy5TZXRTa3koaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLlNldEVhcnRoKGhlaWdodCk7XHJcbiAgICAgICAgLy92YXIgZWFydGhIZWlnaHRQaXggPSBoZWlnaHQ7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7VUlGdW5jfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1VJRnVuY1wiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcblxyXG4vL1VJ5Z+657G7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VVSSBleHRlbmRzIExheWEuQm94XHJcbntcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL1xyXG4gICAgcHJvdGVjdGVkIF9VSVR5cGU6QmFzZUVudW0uVUlUeXBlRW51bTtcclxuICAgIHByb3RlY3RlZCBfSXNNdXRleDpib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9OYW1lOnN0cmluZzsgICAgXHJcbiAgICBwcm90ZWN0ZWQgX1VJTWFuYWdlcjpVSU1hbmFnZXJcclxuICAgIHByaXZhdGUgX0RpcnR5OmJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9TaG93aW5nOmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTG93O1xyXG4gICAgICAgIHRoaXMuX0lzTXV0ZXggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9OYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLl9TaG93aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxlZnQgPSAwO1xyXG5cdCAgICB0aGlzLnJpZ2h0ID0gMDtcclxuXHRcdHRoaXMuYm90dG9tID0gMDtcclxuXHRcdHRoaXMudG9wID0gMDtcclxuICAgIH1cclxuICAgIEhpZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuT1AoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5PcGVuKCk7XHJcbiAgICB9XHJcbiAgICBDbG9zZU9QKClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBEZXN0cm95KCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFVJVHlwZSgpOkJhc2VFbnVtLlVJVHlwZUVudW1cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUlUeXBlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgSXNNdXRleCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNNdXRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTaG93aW5nKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TaG93aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+5VUnov5vooYzpgILphY1cclxuICAgICAqIEBwYXJhbSBVSSDpgILphY1VSVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRml4VUkoVUk6TGF5YS5WaWV3KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoVUkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldERpcnR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBEaXJ0eSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fRGlydHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENsZWFyRGlydHkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBVSVVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9EaXJ0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xlYXJEaXJ0eSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IFVwZGF0ZSgpOnZvaWQ7XHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEZXIGZyb20gXCIuLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi8uLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVBUFBcIjtcclxuXHJcbmNsYXNzIEV4dGVuZENoYXJhY3RlcnNVSSBleHRlbmRzIHVpLkNoYXJhY3RlclVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBCYXNlVUkge1xyXG5cclxuICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJMaXN0OiBBcnJheTxhbnk+O1xyXG4gICAgcHJpdmF0ZSBtX0dvbGREaXNjcmliZTogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIF9SZW5kZXJIYW5kbGVyKGNlbGw6IExheWEuQm94LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHJvbGVFbGVtZW50OiBSb2xlRWxlbWVudCA9IGNlbGwgYXMgUm9sZUVsZW1lbnQ7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVzZXQoKTtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDogQXJyYXk8bnVtYmVyPiA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LmdyYXkgPSBjaGFyYWN0ZXJMaXN0W2luZGV4XSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgICByb2xlRWxlbWVudC5DaGFyYWN0ZXJJRCA9IGluZGV4O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlZ2lzdE9uSW1nQ2xpY2soKCkgPT4geyB0aGlzLk9uQ2xpY2tJbWcoaW5kZXgpIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfVUk6IEV4dGVuZENoYXJhY3RlcnNVSTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZENoYXJhY3RlcnNVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuR2V0Q2hhcmFjdGVyTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuU2V0TGlzdCgpO1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5tX0dvbGREaXNjcmliZSA9IHRoaXMuX1VJLl9Hb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuT25Nb25leUNoYW5nZSgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJDaGFyYWN0ZXJVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIEdldENoYXJhY3Rlckxpc3QoKSAge1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJMaXN0ID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3IuR2V0SURMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0TGlzdCgpIHtcclxuICAgICAgICB2YXIgbGlzdEFycmF5OiBBcnJheTxhbnk+ID0gdGhpcy5tX0NoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnJlbmRlckhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsIHRoaXMuX1JlbmRlckhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LmFycmF5ID0gbGlzdEFycmF5O1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0Rpc3RhbmNlID0gNTBcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgT3BlbigpICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJDaGFyYWN0ZXJJRENoYW5nZSwgdGhpcy5Pbk5lZWRDbG9zZVVJLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLCB0aGlzLk9uTW9uZXlDaGFuZ2UsIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSwgdGhpcy5PbkNoYW5nZUxpc3QsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKCkgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckNoYXJhY3RlcklEQ2hhbmdlLCB0aGlzLk9uTmVlZENsb3NlVUksIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsIHRoaXMuT25Nb25leUNoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DaGFyYWN0ZXJMaXN0Q2hhbmdlLCB0aGlzLk9uQ2hhbmdlTGlzdCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuovku7ZcclxuICAgIHByaXZhdGUgT25DbGlja0ltZyhpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGlkID09IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5DaGFyYWN0ZXJJRCkgIHtcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0UGxheWVySUQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25OZWVkQ2xvc2VVSSgpOiB2b2lkICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2hhbmdlTGlzdCgpICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QucmVmcmVzaCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbk1vbmV5Q2hhbmdlKCkgIHtcclxuICAgICAgICBpZiAoIXRoaXMuU2hvd2luZykgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fR29sZERpc2NyaWJlWzFdID0gXCJcIiArIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leTtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC50ZXh0ID0gdGhpcy5tX0dvbGREaXNjcmliZVswXSArIHRoaXMubV9Hb2xkRGlzY3JpYmVbMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtHYW1lU3RydWN0IH0gIGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kRW5kR2FtZVVJIGV4dGVuZHMgdWkuRW5kR2FtZVVJIHtcclxuICAgIFBhbmVsOkxheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVuZEdhbWVcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbCA9IHRoaXMuUGFuZWw7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMuUGFuZWwuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX01lbnVlQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssR3VpZGVyTWFuYWdlci5NZ3IsR3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5fU2V0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssQ29udHJvbGVyLkdhbWVDb250cm9sZXIsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TdGFydEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZEdhbWVVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkVuZEdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgVUk6RXh0ZW5kRW5kR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5VST0gbmV3IEV4dGVuZEVuZEdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5VSSk7XHJcbiAgICAgICAgLy90aGlzLlVJLl9DaGFyYWN0ZXJMaXN0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyB0aGlzLl9VSU1hbmFnZXIuU2hvdzxQbGF5ZXJMaXN0VUk+KFBsYXllckxpc3RVSSl9KTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBGTSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFBsYXllckxpc3RVSSBmcm9tIFwiLi8uLi91aS9QbGF5ZXJMaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcblxyXG5jbGFzcyBFeHRlbmRFbnRlckdhbWVVSSBleHRlbmRzIHVpLkVudGVyVUkge1xyXG4gICAgUGFuZWw6IExheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuUGFuZWwgPSB0aGlzLl9QYW5lbDtcclxuICAgICAgICB0aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXIub24oTGF5YS5FdmVudC5DTElDSywgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd0NoYXJhY3RlclBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TZXRQYW5lbC5vbihMYXlhLkV2ZW50LkNMSUNLLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TaG93U2V0UGFuZWwpO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlciwgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGVyR2FtZVVJIGV4dGVuZHMgQmFzZVVJIHtcclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiRW50ZXJHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIF9VSTogRXh0ZW5kRW50ZXJHYW1lVUk7XHJcbiAgICBwcml2YXRlIG1fQnRuR3JvdXA6IEFycmF5PExheWEuSW1hZ2U+O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kRW50ZXJHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB2YXIgdWlNZ3I6IFVJTWFuYWdlciA9IHRoaXMuX1VJTWFuYWdlcjtcclxuICAgICAgICB0aGlzLm1fQnRuR3JvdXAgPSBbXTtcclxuICAgICAgICAvL3RoaXMuX1VJLl9DaGFyYWN0ZXJMaXN0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyB1aU1nci5TaG93PFBsYXllckxpc3RVST4oUGxheWVyTGlzdFVJKX0pO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SYW5rLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEluaXRCdG5Hcm91cCgpIHtcclxuICAgICAgICB2YXIgQ3VyTWF4TGV2ZWwgPSBHYW1lQWdlbnQuQWdlbnQuQ3VyTWF4TGV2ZWw7XHJcbiAgICAgICAgdmFyIGN1ckxldmVsID0gR2FtZUFnZW50LkFnZW50LkN1ckxldmVsO1xyXG4gICAgICAgIHZhciBidG5OdW0gPSB0aGlzLl9VSS5fR3JvdXAubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgdmFyIGdyb3VwID0gdGhpcy5tX0J0bkdyb3VwO1xyXG4gICAgICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGJ0bk51bTsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIGJ0bjogYW55ID0gdGhpcy5fVUkuX0dyb3VwLmdldENoaWxkQXQoaWR4KSBhcyBMYXlhLkltYWdlO1xyXG4gICAgICAgICAgICBidG4uaWR4ID0gaWR4O1xyXG4gICAgICAgICAgICBidG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5PbkNob29zZSlcclxuICAgICAgICAgICAgYnRuLmdyYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICBncm91cC5wdXNoKGJ0bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyb3VwW2N1ckxldmVsXS5ncmF5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5Jbml0QnRuR3JvdXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v5LqL5Lu2XHJcbiAgICBPbkNob29zZShpbmZvOiBFdmVudCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQ6YW55ID0gaW5mby50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGlkeDogbnVtYmVyID0gdGFyZ2V0LmlkeDtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VyTGV2ZWwgPSBpZHg7XHJcbiAgICAgICAgdGhpcy5tX0J0bkdyb3VwLmZvckVhY2goKGltZzogTGF5YS5JbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICBpbWcuZ3JheSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tX0J0bkdyb3VwW2lkeF0uZ3JheSA9IGZhbHNlO1xyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOWcuuaZr1VJXHJcbiAqL1xyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBJdGVtTGlzdFVJIGZyb20gXCIuL0l0ZW1MaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmNsYXNzIEV4dGVuZHNHYW1lVUkgZXh0ZW5kcyB1aS5HYW1lVUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBTZXRDb3VudFRpbWUoaW5mbzpzdHJpbmcgPVwiXCIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lLnRleHQgPWluZm87XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHJpdmF0ZSBfVUk6RXh0ZW5kc0dhbWVVSTtcclxuICAgIC8vXHJcbiAgICBEaXN0YW5jZVN0cjpBcnJheTxzdHJpbmc+O1xyXG4gICAgR29sZE51bVN0cjpBcnJheTxzdHJpbmc+O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fSXNNdXRleCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kc0dhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX0xlZnRUb3VjaC5sZWZ0ID0gMDtcclxuICAgICAgICAvL3RoaXMuX1VJLl9MZWZ0VG91Y2gucmlnaHQgPSB0aGlzLndpZHRoLzQ7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fUmlnaHRUb3VjaC5yaWdodCA9IDA7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fUmlnaHRUb3VjaC5sZWZ0ID0gdGhpcy53aWR0aC8yO1xyXG4gICAgICAgIHZhciBvcElzUmlnaHQgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0SW5mby5PUElzUmlnaHQ7XHJcbiAgICAgICAgdGhpcy5fVUkuX0l0ZW1MaXN0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyBcclxuICAgICAgICAgICAgdGhpcy5fVUlNYW5hZ2VyLlNob3c8SXRlbUxpc3RVST4oSXRlbUxpc3RVSSl9KVxyXG4gICAgICAgIHRoaXMuU2V0Q291bnRUaW1lKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5EaXN0YW5jZVN0cj0gdGhpcy5fVUkuX1R4dERpc3RhbmNlLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHJbMV0gPSBcIjBcIlxyXG4gICAgICAgIHRoaXMuX1Nob3dEaXN0YW5jZSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuR29sZE51bVN0ciA9IHRoaXMuX1VJLl9UeHRHb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IFwiMFwiO1xyXG4gICAgICAgIHRoaXMuX1Nob3dHb2xkTnVtKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5TaG93SW5wdXRJbmZvKFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1Nob3dEaXN0YW5jZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1R4dERpc3RhbmNlLnRleHQgPSB0aGlzLkRpc3RhbmNlU3RyWzBdK3RoaXMuRGlzdGFuY2VTdHJbMV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgX1Nob3dHb2xkTnVtKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0R29sZC50ZXh0ID0gdGhpcy5Hb2xkTnVtU3RyWzBdICsgdGhpcy5Hb2xkTnVtU3RyWzFdO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0IEdvbGQoZ29sZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyWzFdID0gZ29sZC50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIFNldExlZnRUb3VjaChvd25lcjphbnksTGlzdGVuZXI6KCk9PnZvaWQpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fTGVmdFRvdWNoLm9uKExheWEuRXZlbnQuQ0xJQ0ssb3duZXIsTGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldFJpZ2h0VG91Y2gob3duZXI6YW55LExpc3RlbmVyOigpPT52b2lkKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JpZ2h0VG91Y2gub24oTGF5YS5FdmVudC5DTElDSyxvd25lcixMaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0Q291bnRUaW1lKGluZm86c3RyaW5nID1cIlwiKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGluZm89PVwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fQ291bnREb3duVUkudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVQYW5lbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9Db3VudERvd25VSS52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZVBhbmVsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLlNldENvdW50VGltZShpbmZvKTtcclxuICAgIH1cclxuICAgIHNldCBHYW1lUGFuZWwodmFsdWU6Ym9vbGVhbilcclxuICAgIHsgXHJcbiAgICAgICAgdGhpcy5fVUkuX0dhbWVQYW5lbC52aXNpYmxlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgRGlzdGFuY2UodmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBkaXMgPSBcIlwiICsgdmFsdWU7XHJcbiAgICAgICAgaWYoZGlzID09IHRoaXMuRGlzdGFuY2VTdHJbMV0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5EaXN0YW5jZVN0clsxXSA9IGRpcztcclxuICAgICAgICB0aGlzLlNldERpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBzZXQgR29sZE51bSh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyWzFdID0gdmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLlNldERpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBTaG93SW5wdXRJbmZvKGluZm86c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9HYW1lSW5mby50ZXh0ID0gaW5mbztcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgLy/mmL7npLrph5HluIHkv6Hmga9cclxuICAgICAgICB0aGlzLl9TaG93R29sZE51bSgpO1xyXG4gICAgICAgIC8v5pi+56S66Led56a75L+h5oGvXHJcbiAgICAgICAgdGhpcy5fU2hvd0Rpc3RhbmNlKCk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IHtQbGF5ZXJ9IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckVudGl0eVwiXHJcbmltcG9ydCB7R2FtZUFnZW50fSBmcm9tIFwiLi8uLi9BZ2VudC9HYW1lQWdlbnRcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBJdGVtRWxlbWVudCBmcm9tIFwiLi8uLi9zY3JpcHQvSXRlbUVsZW1lbnRcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiXHJcblxyXG5jbGFzcyBFeHRlbmRzSXRlbUxpc3RVSSBleHRlbmRzIHVpLkl0ZW1MaXN0VUlcclxue1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OkFycmF5PG51bWJlcj5cclxuICAgIEJ0bkxpc3RlbmVyOk1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9JdGVtTGlzdCA9IFtdO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1MaXN0VUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJJdGVtTGlzdFVJXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIFVJOkV4dGVuZHNJdGVtTGlzdFVJO1xyXG4gICAgcHJpdmF0ZSBtX0dvbGQ6c3RyaW5nW107XHJcbiAgICBwcml2YXRlIG1fSXRlbUxpc3Q6QXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLlVJID0gbmV3IEV4dGVuZHNJdGVtTGlzdFVJKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLlVJKTtcclxuICAgICAgICB0aGlzLlVJLkJ0bkxpc3RlbmVyID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZSh0aGlzLCgpPT57IHRoaXMuX1VJTWFuYWdlci5DbG9zZSh0aGlzKX0pXHJcbiAgICAgICAgLy90aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIHRoaXMubV9Hb2xkID0gdGhpcy5VSS5fR29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLlVJLl9CRy5hbHBoYSA9IDA7XHJcbiAgICAgICAgdGhpcy5VSS5fQkcub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMuQ2xvc2VVSSlcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSx0aGlzLlNob3dHb2xkLHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UsdGhpcy5SZWZyZXNoTGlzdCx0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLlNob3dHb2xkKCk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENsb3NlKClcclxuICAgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLHRoaXMuU2hvd0dvbGQsdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25JdGVtTGlzdENoYW5nZSx0aGlzLlJlZnJlc2hMaXN0LHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGVMaXN0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkdldEl0ZW1MaXN0KCk7XHJcbiAgICAgICAgdGhpcy5TZXRMaXN0KHRoaXMubV9JdGVtTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZnJlc2hMaXN0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkdldEl0ZW1MaXN0KCk7XHJcbiAgICAgICAgdGhpcy5GcmVzaExpc3QodGhpcy5tX0l0ZW1MaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0SXRlbUxpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9JdGVtTGlzdCA9IEdhbWVBUFAuSXRlbU1nci5HZXRTZWxsSXRlbUlETGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTaG93R29sZCgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuU2hvd2luZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fR29sZFsxXSA9XCJcIiArIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leTtcclxuICAgICAgICB0aGlzLlVJLl9Hb2xkLnRleHQgPSB0aGlzLm1fR29sZFswXSArIHRoaXMubV9Hb2xkWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1JlbmRlckhhbmRsZXIoY2VsbDpMYXlhLkJveCxpbmRleDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgcm9sZUVsZW1lbnQ6SXRlbUVsZW1lbnQgPSBjZWxsIGFzIEl0ZW1FbGVtZW50O1xyXG4gICAgICAgIHZhciBpdGVtTGlzdDpBcnJheTxudW1iZXI+ID0gR2FtZUFnZW50LkFnZW50Lkl0ZW1MaXN0O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LkluaXQoKTtcclxuICAgICAgICByb2xlRWxlbWVudC5JdGVtSWR4ID0gdGhpcy5tX0l0ZW1MaXN0W2luZGV4XTtcclxuICAgICAgICByb2xlRWxlbWVudC5SZWdpc3RCdXkodGhpcyx0aGlzLkJ1eUl0ZW0pO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlZ2lzdENob29zZSh0aGlzLHRoaXMuQ2hvb3NlSXRlbSk7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuSXNHcmF5ID0gaXRlbUxpc3RbdGhpcy5tX0l0ZW1MaXN0W2luZGV4XV0/ZmFsc2U6dHJ1ZTtcclxuICAgICAgICByb2xlRWxlbWVudC5OdW0gPSBpdGVtTGlzdFt0aGlzLm1fSXRlbUxpc3RbaW5kZXhdXT9pdGVtTGlzdFt0aGlzLm1fSXRlbUxpc3RbaW5kZXhdXTowO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LkJ0bkxhYmxlID0gXCJcIiArIEdhbWVBUFAuSXRlbU1nci5HZXRQcmljZSh0aGlzLm1fSXRlbUxpc3RbaW5kZXhdKSArIFwiJFwiO1xyXG4gICAgICAgIC8vcm9sZUVsZW1lbnQuU2V0QnRuKHRoaXMuQnRuTGlzdGVuZXIuTGlzdGVuZXIsdGhpcy5CdG5MaXN0ZW5lci5BY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0TGlzdChsaXN0QXJyYXk6QXJyYXk8YW55PilcclxuICAgIHtcclxuICAgICAgICAvL3ZhciBsaXN0QXJyYXk6QXJyYXk8YW55PiA9IHRoaXMubV9JdGVtTGlzdDtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnJlbmRlckhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsdGhpcy5fUmVuZGVySGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5hcnJheSA9IGxpc3RBcnJheTtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljRGlzdGFuY2UgPSA1MFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBGcmVzaExpc3QoaWRMaXN0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QuYXJyYXkgPSBpZExpc3Q7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgQnV5SXRlbShpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuU2hvd2luZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5CdXlJdGVtKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENob29zZUl0ZW0oaWQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLlNob3dpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZihHYW1lQWdlbnQuQWdlbnQuSXRlbUxpc3RbaWRdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LkN1ckl0ZW0gPSBpZDtcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIENsb3NlVUkoKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2UodGhpcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5jbGFzcyBFeHRlbmRzU2V0UGFuZWxVSSBleHRlbmRzIHVpLlNldFBhbmVsVUkge1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJTZXRQYW5lbFwiKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL3RoaXMuX1JldHVybi5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntBUFAuVUlNYW5hZ2VyLkNsb3NlQ3VyVmlldygpfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBCYXNlVUkge1xyXG4gICAgX1VJOiBFeHRlbmRzU2V0UGFuZWxVSTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kc1NldFBhbmVsVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB0aGlzLl9VSS5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsICgpID0+IHsgdGhpcy5fVUlNYW5hZ2VyLkNsb3NlQ3VyVmlldygpOyBHdWlkZXJNYW5hZ2VyLk1nci5FbnRlclNjZW5lKCkgfSk7XHJcbiAgICAgICAgdGhpcy5TZXRQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTZXRQYW5lbFVJXCI7XHJcbiAgICB9XHJcbiAgICBTZXRQYW5lbCgpIHtcclxuICAgICAgICB2YXIgaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2V0U2V0SW5mbygpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9BdWRpb1N3aXRjaC5zZWxlY3RlZEluZGV4ID0gaW5mby5BdWRpb09uID8gMCA6IDE7XHJcbiAgICAgICAgdGhpcy5fVUkuX09QU3dpdGNoLnNlbGVjdGVkSW5kZXggPSBpbmZvLk9QSXNSaWdodCA/IDEgOiAwO1xyXG4gICAgICAgIHRoaXMuX1VJLl9UZXh0LnRleHQgPSBpbmZvLlRleHRJbmZvO1xyXG4gICAgfVxyXG4gICAgU2F2ZVBhbmVsKCkge1xyXG4gICAgICAgIHZhciBpbmZvOiBHYW1lU3RydWN0LlNldEluZm8gPSBuZXcgR2FtZVN0cnVjdC5TZXRJbmZvKCk7XHJcbiAgICAgICAgaW5mby5BdWRpb09uID0gdGhpcy5fVUkuX0F1ZGlvU3dpdGNoLnNlbGVjdGVkSW5kZXggPT0gMDtcclxuICAgICAgICBpbmZvLk9QSXNSaWdodCA9IHRoaXMuX1VJLl9PUFN3aXRjaC5zZWxlY3RlZEluZGV4ID09IDE7XHJcbiAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2F2ZVNldEluZm8oaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2VPUCgpIHtcclxuICAgICAgICB0aGlzLlNhdmVQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHt9XHJcbn1cclxuIiwiaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi9CYXNlVUlcIlxyXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xyXG5cclxubW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Qcm9ncmVzczpMYXlhLlByb2dyZXNzQmFyO1xyXG5cdFx0cHVibGljIF9HdWlkZXI6TGF5YS5JbWFnZTtcclxuXHRcdHB1YmxpYyBfRW50ZXI6TGF5YS5CdXR0b247XHJcblx0XHRwdWJsaWMgRXJyb3JJbmZvOkxheWEuTGFiZWw7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkxvYWRpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFeHRMb2FkaW5nVUkgZXh0ZW5kcyB1aS5Mb2FkaW5nVUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMoXCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ1VJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgXCJMb2FkaW5nVUlcIjtcclxuICAgIH1cclxuICAgIF9VSTp1aS5Mb2FkaW5nVUk7XHJcbiAgICBfQ2FsbEJhY2s6KCk9PnZvaWQ7XHJcbiAgICBjb25zdHJ1Y3RvciggbmFtZTpzdHJpbmcgKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIC8vdGhpcy5fVUkgPW5ldyB1aS5Mb2FkaW5nVUkoKTtcclxuICAgICAgICB0aGlzLl9VSSA9bmV3IEV4dExvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkgKTtcclxuICAgICAgICB0aGlzLlZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci52aXNpYmxlID1mYWxzZTtcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuX0NhbGxCYWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHg6bnVtYmVyID0gMDtcclxuICAgICAgICB4ICs9IHRoaXMuX1VJLl9Qcm9ncmVzcy53aWR0aCp0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fVUkuX0d1aWRlci5wb3MoeCx0aGlzLl9VSS55KTtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgVmFsdWUobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWUgPSBudW07XHJcbiAgICAgICAgdGhpcy5VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIENvbXBsZXRlKGNhbGxCYWNrOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0NhbGxCYWNrID0gY2FsbEJhY2s7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5sYWJlbCA9IFwiRW50ZXJcIjsvL3RoaXMuX05hbWVbMF07XHJcbiAgICB9XHJcbiAgICBSZWxvYWQoY2FsbEJhY2s6KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuRXJyb3JJbmZvLnZpc2libGUgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbmV4cG9ydCBtb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEJHVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9FYXJ0aDpMYXlhLkltYWdlO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiQkdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIENoYXJhY3RlclVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfR29sZDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfTGlzdDpMYXlhLkxpc3Q7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJDaGFyYWN0ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEVuZEdhbWVVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0dhbWVJbmZvOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9TdGFydEJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX01lbnVlQnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfU2V0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUGxheWVyTGlzdEJ0bjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVuZEdhbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEVudGVyVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9TdGFydDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0NoYXJhY3RlcjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BhbmVsOkxheWEuUGFuZWw7XG5cdFx0cHVibGljIF9Hcm91cDpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBfU2V0UGFuZWw6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9DaGFyYWN0ZXJMaXN0OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUmFuazpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVudGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Db3VudERvd25VSTpMYXlhLkJveDtcblx0XHRwdWJsaWMgX0l0ZW1MaXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ291bnRUaW1lOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lSW5mbzpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfR2FtZVBhbmVsOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfVHh0RGlzdGFuY2U6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1R4dEdvbGQ6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX0xlZnRUb3VjaDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1JpZ2h0VG91Y2g6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9Vc2VJdGVtOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVJhbmtVSSBleHRlbmRzIExheWEuVmlldyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkdhbWVSYW5rXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBJdGVtTGlzdFVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfQkc6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgX0xpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBfR29sZDpMYXlhLkxhYmVsO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiSXRlbUxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1BsYXllckxpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBfUmV0dXJuTWFpbjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlBsYXllckxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9UZXh0OkxheWEuVGV4dEFyZWE7XG5cdFx0cHVibGljIF9SZXR1cm46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9BdWRpb1N3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG5cdFx0cHVibGljIF9PUFN3aXRjaDpMYXlhLlJhZGlvR3JvdXA7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJTZXRQYW5lbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
