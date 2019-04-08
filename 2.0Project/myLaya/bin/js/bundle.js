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
var PlayerEntity_1 = require("./PlayerEntity");
var GameModule_1 = require("./../Game/GameModule");
var APP_1 = require("./../controler/APP");
var GameAPP_1 = require("../controler/GameAPP");
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
    Object.defineProperty(GameAgent.prototype, "CurItemNum", {
        get: function () {
            return this.m_PlayerEntity.CurItemNum < this.m_UseItemNum ? this.m_PlayerEntity.CurItem : this.m_UseItemNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameAgent.prototype, "SkillItemNum", {
        get: function () {
            return this.m_SkillItemNum;
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
    GameAgent.prototype.ResetGameItem = function () {
        this.m_UseItemNum = this.m_PlayerEntity.CurItem > 0 ? 1 : 0;
        APP_1.default.MessageManager.Fire(PlayerEntity_1.Player.Event.OnCurItemNumChange);
    };
    GameAgent.prototype.ResetSkillItem = function () {
        var CharacterID = this.m_PlayerEntity.CurCharacterID;
        this.m_SkillItemNum = GameAPP_1.default.CharacterMgr.GetSkillItem(CharacterID) < 0 ? 0 : 1;
        APP_1.default.MessageManager.Fire(GameModule_1.GameModule.Event.OnCharacterItemChange);
    };
    GameAgent.prototype.UseGameItem = function () {
        if (this.m_UseItemNum < 1) {
            return;
        }
        --this.m_UseItemNum;
        this.m_PlayerEntity.ReduceItem(this.CurItem);
    };
    GameAgent.prototype.UseCharacterSkillItem = function () {
        if (this.m_SkillItemNum < 1) {
            return;
        }
        --this.m_SkillItemNum;
        APP_1.default.MessageManager.Fire(GameModule_1.GameModule.Event.OnCharacterItemChange);
    };
    return GameAgent;
}(BaseAgent_1.default));
exports.GameAgent = GameAgent;
},{"../controler/GameAPP":39,"./../Game/GameModule":22,"./../controler/APP":38,"./BaseAgent":1,"./PlayerEntity":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var FrameWork_1 = require("./../FrameWork/FrameWork");
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
        Event.OnCurItemNumChange = "OnCurItemNumChange";
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
        Object.defineProperty(PlayerEntity.prototype, "CurItemNum", {
            get: function () {
                return this.GetItemNum(this.CurItem);
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
            if (id == this.CurItem)
                this.m_MessageMgr.Fire(Event.OnCurItemNumChange);
        };
        PlayerEntity.prototype.ReduceItem = function (id) {
            if (!this.m_ItemList[id] || this.m_ItemList[id] < 1) {
                return;
            }
            --this.m_ItemList[id];
            this.m_MessageMgr.Fire(Event.OnItemListChange);
            if (id == this.CurItem)
                this.m_MessageMgr.Fire(Event.OnCurItemNumChange);
        };
        PlayerEntity.prototype.GetItemNum = function (id) {
            var num = this.m_ItemList[id];
            num = num ? num : 0;
            return num;
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
            return info.Item;
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
        _this.m_Item = characterData.Item ? characterData.Item : -1;
        _this.m_ExtendID = characterData.ExtendID ? characterData.ExtendID : "";
        return _this;
    }
    Object.defineProperty(CharacterInfo.prototype, "Item", {
        get: function () {
            return this.m_Item;
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
},{}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameStruct_1 = require("./GameStruct");
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
    function ItemBuffFactory(itemType) {
        var buff = null;
        switch (itemType) {
            case ItemType.Fly:
                buff = new FlyBuff();
                break;
            case ItemType.Collector:
                buff = new CollectBuff(10000);
                break;
            case ItemType.Protect:
                buff = new ProtectBuff(3000);
                break;
            case ItemType.HolyProtect:
                buff = new ProtectBuff(3000, true);
                break;
            case ItemType.Vine:
                buff = new VineBuff();
                break;
            case ItemType.Rope:
                buff = new RopeBuff();
                break;
        }
        return buff;
    }
    Item.ItemBuffFactory = ItemBuffFactory;
    function AddBuffToPlayer(itemType) {
        var buff; // = ItemBuffFactory();
        switch (itemType) {
            case ItemType.Fly:
                buff = new FlyBuff();
                break;
            case ItemType.Collector:
                buff = new CollectBuff(10000);
                break;
            case ItemType.Protect:
                buff = new ProtectBuff(3000);
                break;
            case ItemType.HolyProtect:
                buff = new ProtectBuff(3000, true);
                break;
            case ItemType.Vine:
                buff = new VineBuff();
                break;
            case ItemType.Rope:
                buff = new RopeBuff();
                break;
        }
        return true;
    }
    Item.AddBuffToPlayer = AddBuffToPlayer;
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
        StepItem.prototype.GenBuff = function () {
            return ItemBuffFactory(this.ItemType);
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
    Item.BasePlayerBuff = BasePlayerBuff;
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
            var Buff = this.GenBuff();
            this._AddBuffToPlayer(player, Buff);
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
    }(BasePlayerBuff));
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
            var Buff = this.GenBuff();
            this._AddBuffToPlayer(player, Buff);
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
            player.AddBuff(this.GenBuff());
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
    }(BasePlayerBuff));
    var FLy = /** @class */ (function (_super) {
        __extends(FLy, _super);
        function FLy(step) {
            return _super.call(this, ItemType.Fly, step) || this;
        }
        FLy.prototype.TouchItem = function (player) {
            if (player.GetBuff(0))
                return;
            player.AddBuff(this.GenBuff());
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
    }(BasePlayerBuff));
    var Rope = /** @class */ (function (_super) {
        __extends(Rope, _super);
        function Rope(step) {
            return _super.call(this, ItemType.Rope, step) || this;
        }
        Rope.prototype.TouchItem = function (player) {
            if (player.GetBuff(0))
                return;
            player.AddBuff(this.GenBuff());
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
    }(BasePlayerBuff));
    var Vine = /** @class */ (function (_super) {
        __extends(Vine, _super);
        function Vine(step) {
            return _super.call(this, ItemType.Vine, step) || this;
        }
        Vine.prototype.TouchItem = function (player) {
            var curBuff = player.GetBuff(0);
            if (!this.BreakProtect(player)) {
                player.AddBuff(this.GenBuff());
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
    }(BasePlayerBuff));
})(Item = exports.Item || (exports.Item = {}));
},{"./../FrameWork/MessageCenter":10,"./../Game/AnimObj":18,"./../Utility/Path":36,"./../controler/APP":38,"./../controler/GameControler":40,"./GameStruct":23,"./Input":24,"./PlayerCtrler":27}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModule;
(function (GameModule) {
    var Event = /** @class */ (function () {
        function Event() {
        }
        Event.OnCharacterItemChange = "OnCharacterItemChange";
        return Event;
    }());
    GameModule.Event = Event;
})(GameModule = exports.GameModule || (exports.GameModule = {}));
},{}],23:[function(require,module,exports){
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
},{"../Utility/Path":36,"./../FrameWork/MessageCenter":10,"./../controler/APP":38,"./../controler/GameAPP":39,"./../controler/GameControler":40,"./Character":19,"./GameItem":21,"./PlayerCtrler":27}],27:[function(require,module,exports){
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
},{"./../Utility/Path":36,"./../controler/APP":38,"./GameItem":21,"./GameStruct":23}],29:[function(require,module,exports){
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
},{"./../Game/GameItem":21,"./../Scene/Scene":34,"./GameDirector":30}],32:[function(require,module,exports){
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
        this.OnGameComplete();
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
        this.PanelUI.RegistClickPlayerItem(this, this.UsePlayerItem);
        this.PanelUI.RegistClickSkillItem(this, this.UseSkillItem);
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
            GameAgent_1.GameAgent.Agent.ResetGameItem();
            GameAgent_1.GameAgent.Agent.ResetSkillItem();
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
    GameScenePlay.prototype.UseSkillItem = function () {
        GameAgent_1.GameAgent.Agent.UseCharacterSkillItem();
    };
    GameScenePlay.prototype.UsePlayerItem = function () {
        GameAgent_1.GameAgent.Agent.UseGameItem();
    };
    GameScenePlay.prototype.OnGameComplete = function () {
        APP_1.default.MessageManager.DesRegist(MessageCenter_1.MessageMD.GameEvent.PlayerDeath, this.Death, this);
        var ui = APP_1.default.UIManager.Show(EndGameUI_1.default);
        GameAgent_1.GameAgent.Agent.AddGold(this._GoldNum);
        GameAgent_1.GameAgent.Agent.AddScore(this._GoldNum * 10 + this.Distance * 10);
    };
    return GameScenePlay;
}(Scene_1.Scene.BaseScenePlaye));
exports.default = GameScenePlay;
},{"../../controler/GameAPP":39,"./../../Agent/GameAgent":2,"./../../FrameWork/MessageCenter":10,"./../../Game/GameCamera":20,"./../../Game/GameItem":21,"./../../Game/GameStruct":23,"./../../Game/Input":24,"./../../Game/MountLine":25,"./../../Game/Player":26,"./../../Scene/Scene":34,"./../../controler/APP":38,"./../../controler/GameControler":40,"./../../ui/EndGameUI":46,"./../../ui/GameUI":48}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path;
(function (path) {
    path.IsEditor = false;
    path.version = "?v=2";
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
var PlayerEntity_1 = require("./../Agent/PlayerEntity");
var GameModule_1 = require("../Game/GameModule");
var GameAgent_1 = require("../Agent/GameAgent");
var Path_1 = require("./../Utility/Path");
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var BaseUI_1 = require("./BaseUI");
var ItemListUI_1 = require("./ItemListUI");
var GameControler_1 = require("./../controler/GameControler");
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
        _this._UI._PlayerItem.on(Laya.Event.CLICK, _this, _this.OnClickPlayerItem);
        _this._UI._SkillItem.on(Laya.Event.CLICK, _this, _this.OnClickSkillItem);
        return _this;
    }
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
    GameUI.prototype.ShowItem = function () {
        this.ShowPlayerItem();
        this.ShowCharacteerItem();
    };
    /**
     * 显示玩家选择道具
     */
    GameUI.prototype.ShowPlayerItem = function () {
        var itemNum = GameAgent_1.GameAgent.Agent.CurItemNum;
        if (itemNum < 1) {
            this._UI._PlayerItem.visible = false;
        }
        else {
            this._UI._PlayerItem.visible = true;
        }
    };
    /**
     * 显示角色道具
     */
    GameUI.prototype.ShowCharacteerItem = function () {
        var itemNum = GameAgent_1.GameAgent.Agent.SkillItemNum;
        if (itemNum < 1) {
            this._UI._SkillItem.visible = false;
        }
        else {
            this._UI._SkillItem.visible = true;
        }
    };
    GameUI.prototype.ShowInputInfo = function (info) {
        this._UI._GameInfo.text = info;
    };
    GameUI.prototype.Open = function () {
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnCurItemNumChange, this.ShowPlayerItem, this);
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnCurItemChange, this.ShowPlayerItem, this);
        APP_1.default.MessageManager.Regist(GameModule_1.GameModule.Event.OnCharacterItemChange, this.ShowCharacteerItem, this);
        this.ShowItem();
    };
    GameUI.prototype.Close = function () {
        APP_1.default.MessageManager.DesRegist(PlayerEntity_1.Player.Event.OnCurItemNumChange, this.ShowPlayerItem, this);
        APP_1.default.MessageManager.DesRegist(PlayerEntity_1.Player.Event.OnCurItemChange, this.ShowPlayerItem, this);
        APP_1.default.MessageManager.DesRegist(GameModule_1.GameModule.Event.OnCharacterItemChange, this.ShowCharacteerItem, this);
    };
    GameUI.prototype.Update = function () {
        //显示金币信息
        this._ShowGoldNum();
        //显示距离信息
        this._ShowDistance();
    };
    GameUI.prototype.RegistClickSkillItem = function (owner, listener) {
        var delegate = new MessageCenter_1.MessageMD.Delegate(owner, listener);
        this.m_onClickSkillItem = delegate;
    };
    GameUI.prototype.RegistClickPlayerItem = function (owner, listener) {
        var delegate = new MessageCenter_1.MessageMD.Delegate(owner, listener);
        this.m_onCLickPlayerItem = delegate;
    };
    GameUI.prototype.OnClickSkillItem = function () {
        this.m_onClickSkillItem.Execute();
    };
    GameUI.prototype.OnClickPlayerItem = function () {
        this.m_onCLickPlayerItem.Execute();
    };
    return GameUI;
}(BaseUI_1.default));
exports.default = GameUI;
},{"../Agent/GameAgent":2,"../Game/GameModule":22,"./../Agent/PlayerEntity":3,"./../FrameWork/MessageCenter":10,"./../Utility/Path":36,"./../controler/APP":38,"./../controler/GameControler":40,"./BaseUI":44,"./ItemListUI":49,"./layaMaxUI":52}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseEnum_1 = require("./../Base/BaseEnum");
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
        _this._UIType = BaseEnum_1.BaseEnum.UITypeEnum.Midle;
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
},{"./../Agent/GameAgent":2,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Base/BaseEnum":5,"./../FrameWork/MessageCenter":10,"./../Utility/Path":36,"./../controler/APP":38,"./../controler/GameAPP":39,"./BaseUI":44,"./layaMaxUI":52}],50:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Rvb2wvTGF5YTIuMC9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvQWdlbnQvQmFzZUFnZW50LnRzIiwic3JjL0FnZW50L0dhbWVBZ2VudC50cyIsInNyYy9BZ2VudC9QbGF5ZXJFbnRpdHkudHMiLCJzcmMvQWdlbnQvUGxheWVyR3Vlc3RBZ2VudC50cyIsInNyYy9CYXNlL0Jhc2VFbnVtLnRzIiwic3JjL0Jhc2UvQmFzZUZ1bmMudHMiLCJzcmMvQmFzZS9GU00udHMiLCJzcmMvRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9GcmFtZVdvcmsudHMiLCJzcmMvRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXIudHMiLCJzcmMvRnJhbWVXb3JrL1NjZW5lTWFuYWdlci50cyIsInNyYy9GcmFtZVdvcmsvVGltZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL1VJTWFuYWdlci50cyIsInNyYy9HYW1lQ29uZmlnLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0NoYXJhY3Rlck1hbWFnZXIudHMiLCJzcmMvR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXIudHMiLCJzcmMvR2FtZU1hbmFnZXIvSXRlbU1hbmFnZXIudHMiLCJzcmMvR2FtZS9BbmltT2JqLnRzIiwic3JjL0dhbWUvQ2hhcmFjdGVyLnRzIiwic3JjL0dhbWUvR2FtZUNhbWVyYS50cyIsInNyYy9HYW1lL0dhbWVJdGVtLnRzIiwic3JjL0dhbWUvR2FtZU1vZHVsZS50cyIsInNyYy9HYW1lL0dhbWVTdHJ1Y3QudHMiLCJzcmMvR2FtZS9JbnB1dC50cyIsInNyYy9HYW1lL01vdW50TGluZS50cyIsInNyYy9HYW1lL1BsYXllci50cyIsInNyYy9HYW1lL1BsYXllckN0cmxlci50cyIsInNyYy9HYW1lL1N0ZXAudHMiLCJzcmMvTWFpbi50cyIsInNyYy9TY2VuZS9HYW1lRGlyZWN0b3IudHMiLCJzcmMvU2NlbmUvR2FtZVNjZW5lLnRzIiwic3JjL1NjZW5lL0d1aWRlck1hbmFnZXIudHMiLCJzcmMvU2NlbmUvTG9hZFNjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lUGxheS9HYW1lU2NlbmVQbGF5LnRzIiwic3JjL1V0aWxpdHkvUGF0aC50cyIsInNyYy9VdGlsaXR5L1VJRnVuYy50cyIsInNyYy9jb250cm9sZXIvQVBQLnRzIiwic3JjL2NvbnRyb2xlci9HYW1lQVBQLnRzIiwic3JjL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyLnRzIiwic3JjL3NjcmlwdC9JdGVtRWxlbWVudC50cyIsInNyYy9zY3JpcHQvUm9sZUVsZW1lbnQudHMiLCJzcmMvdWkvQkcudHMiLCJzcmMvdWkvQmFzZVVJLnRzIiwic3JjL3VpL0NoYXJhY3RlclVJLnRzIiwic3JjL3VpL0VuZEdhbWVVSS50cyIsInNyYy91aS9FbnRlckdhbWVVSS50cyIsInNyYy91aS9HYW1lVUkudHMiLCJzcmMvdWkvSXRlbUxpc3RVSS50cyIsInNyYy91aS9TZXRQYW5lbFVJLnRzIiwic3JjL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNWQSw2Q0FBOEM7QUFDOUM7SUFHSTtRQUVJLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ2xFLENBQUM7SUFDTCxnQkFBQztBQUFELENBUEEsQUFPQyxJQUFBOzs7OztBQ1JELCtDQUF1QztBQUN2QyxtREFBaUQ7QUFFakQsMENBQW9DO0FBQ3BDLGdEQUEyQztBQUMzQyx5Q0FBbUM7QUFFbkM7SUFBK0IsNkJBQVM7SUE0Q3BDO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBM0NELHNCQUFXLGtCQUFLO2FBQWhCO1lBQ0ksSUFBSSxJQUFJLENB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LEtBQUssRUFBYyxDQUFDO1lBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQUUzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBRTFELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBRTdELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUE7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMs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Q0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDTCxpQkFBQztJQUFELENBVEEsQUFTQyxDQVQrQixJQUFJLENBQUMsSUFBSSxHQVN4QztJQVRZLGFBQVUsYUFTdEIsQ0FBQTtJQUNEO1FBQWtDLGdDQUFTO1FBR3ZDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixxQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQVJBLEFBUUMsQ0FSaUMsSUFBSSxDQUFDLElBQUksR0FRMUM7SUFSWSxlQUFZLGVBUXhCLENBQUE7SUFDRDtRQUFnQyw4QkFBUztRQUtyQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsbUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FWQSxBQVVDLENBVitCLElBQUksQ0FBQyxJQUFJLEdBVXhDO0lBVlksYUFBVSxhQVV0QixDQUFBO0FBQ0wsQ0FBQyxFQW5HYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUFtR2YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0ICogYXMgUGxheWVyRW50aXR5IGZyb20gXCIuL1BsYXllckVudGl0eVwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VBZ2VudFxyXG57XHJcbiAgICBwcm90ZWN0ZWQgbV9QbGF5ZXJFbnRpdHk6UGxheWVyRW50aXR5LlBsYXllci5QbGF5ZXJFbnRpdHk7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eSA9IFBsYXllckVudGl0eS5QbGF5ZXIuUGxheWVyRW50aXR5LkVudGl0eTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL1BsYXllckVudGl0eVwiXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVNb2R1bGVcIlxyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuLy4uL0dhbWVNYW5hZ2VyL0dhbWVNYW5hZ2VyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQVBQXCI7XHJcbmltcG9ydCBCYXNlQWdlbnQgZnJvbSBcIi4vQmFzZUFnZW50XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBHYW1lQWdlbnQgZXh0ZW5kcyBCYXNlQWdlbnQge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0FnZW50OiBHYW1lQWdlbnQ7XHJcblxyXG4gICAgc3RhdGljIGdldCBBZ2VudCgpOiBHYW1lQWdlbnQge1xyXG4gICAgICAgIGlmICh0aGlzLl9BZ2VudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FnZW50ID0gbmV3IEdhbWVBZ2VudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQWdlbnQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1fVXNlSXRlbU51bTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1NraWxsSXRlbUlEOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fU2tpbGxJdGVtTnVtOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGdldCBDdXJMZXZlbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckxldmVsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBDdXJMZXZlbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJMZXZlbCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDdXJNYXhMZXZlbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lkhpc3RvcnlNYXhMZXZlbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VyQ2hhcmFjdGVySUQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJDaGFyYWN0ZXJJRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VySXRlbSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEl0ZW1MaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lkl0ZW1MaXN0XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IEN1ckl0ZW0oaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5JdGVtTGlzdFtpZF0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW0gPSBpZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VySXRlbU51bSgpOiBudW1iZXIgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtTnVtIDwgdGhpcy5tX1VzZUl0ZW1OdW0gPyB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW0gOiB0aGlzLm1fVXNlSXRlbU51bTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgU2tpbGxJdGVtTnVtKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9Ta2lsbEl0ZW1OdW07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWRkR29sZChnb2xkOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIWdvbGQgfHwgZ29sZCA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtb25leSA9IHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkgKyBnb2xkO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkgPSBtb25leTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWRkU2NvcmUoc2NvcmU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghc2NvcmUgfHwgc2NvcmUgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2NvcmUgPSB0aGlzLm1fUGxheWVyRW50aXR5LkN1clNjb3JlICsgc2NvcmU7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJTY29yZSA9IHNjb3JlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldEdhbWVJdGVtKCkge1xyXG4gICAgICAgIHRoaXMubV9Vc2VJdGVtTnVtID0gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtID4gMCA/IDEgOiAwO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKFBsYXllci5FdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldFNraWxsSXRlbSgpIHtcclxuICAgICAgICB2YXIgQ2hhcmFjdGVySUQ6bnVtYmVyID0gdGhpcy5tX1BsYXllckVudGl0eS5DdXJDaGFyYWN0ZXJJRDtcclxuICAgICAgICB0aGlzLm1fU2tpbGxJdGVtTnVtID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3IuR2V0U2tpbGxJdGVtKENoYXJhY3RlcklEKSA8IDAgPyAwIDogMTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShHYW1lTW9kdWxlLkV2ZW50Lk9uQ2hhcmFjdGVySXRlbUNoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVzZUdhbWVJdGVtKCkgIHtcclxuICAgICAgICBpZiAodGhpcy5tX1VzZUl0ZW1OdW0gPCAxKSAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLS0gdGhpcy5tX1VzZUl0ZW1OdW07XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5SZWR1Y2VJdGVtKHRoaXMuQ3VySXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVzZUNoYXJhY3RlclNraWxsSXRlbSgpICB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9Ta2lsbEl0ZW1OdW08MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLS10aGlzLm1fU2tpbGxJdGVtTnVtO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKEdhbWVNb2R1bGUuRXZlbnQuT25DaGFyYWN0ZXJJdGVtQ2hhbmdlKTtcclxuICAgIH1cclxufVxyXG4iLCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5cclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXIge1xyXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50IHtcclxuICAgICAgICBzdGF0aWMgT25Nb25leUNoYW5nZTogc3RyaW5nID0gXCJPbk1vbmV5Q2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VyQ2hhcmFjdGVySURDaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJDaGFyYWN0ZXJJRENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkhpc3RvcnlNYXhMZXZlbENoYW5nZTogc3RyaW5nID0gXCJPbkhpc3RvcnlNYXhMZXZlbENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckxldmVsQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VyTGV2ZWxDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DaGFyYWN0ZXJMaXN0Q2hhbmdlOiBzdHJpbmcgPSBcIk9uQ2hhcmFjdGVyTGlzdENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckl0ZW1DaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJJdGVtQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uSXRlbUxpc3RDaGFuZ2U6IHN0cmluZyA9IFwiT25JdGVtTGlzdENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1clNjb3JlQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VyU2NvcmVDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJJdGVtTnVtQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VySXRlbU51bUNoYW5nZVwiXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckVudGl0eSB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgbV9FbnRpdHk6IFBsYXllckVudGl0eTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldCBFbnRpdHkoKTogUGxheWVyRW50aXR5IHtcclxuICAgICAgICAgICAgaWYgKCFQbGF5ZXJFbnRpdHkubV9FbnRpdHkpIHtcclxuICAgICAgICAgICAgICAgIFBsYXllckVudGl0eS5tX0VudGl0eSA9IG5ldyBQbGF5ZXJFbnRpdHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFBsYXllckVudGl0eS5tX0VudGl0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBtX0ZyYW1lV29yazogRnJhbWVXb3JrO1xyXG4gICAgICAgIHByaXZhdGUgbV9NZXNzYWdlTWdyOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgLy/pkrFcclxuICAgICAgICBwcml2YXRlIG1fTW9uZXk6IG51bWJlcjtcclxuICAgICAgICAvL+mAieS4reinkuiJsklEXHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1ckNoYXJhY3RlcklEOiBudW1iZXI7XHJcbiAgICAgICAgLy/njqnlrrblt7Lop6PplIHnmoTmnIDpq5jlhbPljaFcclxuICAgICAgICBwcml2YXRlIG1fSGlzdG9yeU1heExldmVsOiBudW1iZXI7XHJcbiAgICAgICAgLy/lvZPliY3pgInkuK3lhbPljaFcclxuICAgICAgICBwcml2YXRlIG1fQ3VyTGV2ZWw6IG51bWJlcjtcclxuICAgICAgICAvL+inkuiJsuWIl+ihqFxyXG4gICAgICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJMaXN0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8v5b2T5YmN5oul6YCJ5Lit6YGT5YW3XHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1ckl0ZW06IG51bWJlcjtcclxuICAgICAgICAvL+eJqeWTgeWIl+ihqFxyXG4gICAgICAgIHByaXZhdGUgbV9JdGVtTGlzdDogQXJyYXk8bnVtYmVyPjtcclxuICAgICAgICAvL+enr+WIhlxyXG4gICAgICAgIHByaXZhdGUgbV9DdXJTY29yZTogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE1vbmV5KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fTW9uZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgTW9uZXkodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdGhpcy5tX01vbmV5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX01vbmV5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25Nb25leUNoYW5nZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckNoYXJhY3RlcklEO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1ckNoYXJhY3RlcklEKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9DdXJDaGFyYWN0ZXJJRCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJDaGFyYWN0ZXJJRCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VyQ2hhcmFjdGVySURDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1ckxldmVsKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyTGV2ZWwgPyB0aGlzLm1fQ3VyTGV2ZWwgOiB0aGlzLm1fSGlzdG9yeU1heExldmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1ckxldmVsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMuQ3VyTGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyTGV2ZWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckxldmVsQ2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIaXN0b3J5TWF4TGV2ZWwoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgSGlzdG9yeU1heExldmVsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fSGlzdG9yeU1heExldmVsID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25IaXN0b3J5TWF4TGV2ZWxDaGFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2hhcmFjdGVyTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJJdGVtKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9DdXJJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1ckl0ZW0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckl0ZW1DaGFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VySXRlbSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VySXRlbU51bSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5HZXRJdGVtTnVtKHRoaXMuQ3VySXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXRlbUxpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSXRlbUxpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VyU2NvcmUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJTY29yZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJTY29yZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fQ3VyU2NvcmUgPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1clNjb3JlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJTY29yZUNoYW5nZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tX01vbmV5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckNoYXJhY3RlcklEID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBbMV07XHJcbiAgICAgICAgICAgIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VySXRlbSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9GcmFtZVdvcmsgPSBGcmFtZVdvcmsuRk07XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gW107XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTY29yZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQWRkQ2hhcmFjdGVyKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3RbaWRdID0gMTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkNoYXJhY3Rlckxpc3RDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFkZEl0ZW0oaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubV9JdGVtTGlzdFtpZF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9JdGVtTGlzdFtpZF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICsrdGhpcy5tX0l0ZW1MaXN0W2lkXTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlKTtcclxuICAgICAgICAgICAgaWYgKGlkID09IHRoaXMuQ3VySXRlbSlcclxuICAgICAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJJdGVtTnVtQ2hhbmdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWR1Y2VJdGVtKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm1fSXRlbUxpc3RbaWRdIHx8IHRoaXMubV9JdGVtTGlzdFtpZF0gPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAtLXRoaXMubV9JdGVtTGlzdFtpZF07XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25JdGVtTGlzdENoYW5nZSk7XHJcbiAgICAgICAgICAgIGlmIChpZCA9PSB0aGlzLkN1ckl0ZW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VySXRlbU51bUNoYW5nZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgR2V0SXRlbU51bShpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBudW06IG51bWJlciA9IHRoaXMubV9JdGVtTGlzdFtpZF07XHJcbiAgICAgICAgICAgIG51bSA9IG51bSA/IG51bSA6IDA7XHJcbiAgICAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBCYXNlQWdlbnQgZnJvbSBcIi4vQmFzZUFnZW50XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJHdWVzdEFnZW50IGV4dGVuZHMgQmFzZUFnZW50IHtcclxuICAgIHN0YXRpYyBfQWdlbnQ6IFBsYXllckd1ZXN0QWdlbnQ7XHJcbiAgICBzdGF0aWMgZ2V0IEd1ZXN0QWdlbnQoKTogUGxheWVyR3Vlc3RBZ2VudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0FnZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQWdlbnQgPSBuZXcgUGxheWVyR3Vlc3RBZ2VudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQWdlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBNb25leSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkNoYXJhY3Rlckxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlDaGFyYWN0ZXIoaWQ6IG51bWJlcikgIHtcclxuICAgICAgICAvL1RvRG9cclxuICAgICAgICB2YXIgcHJpY2UgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0UHJpY2UoaWQpO1xyXG4gICAgICAgIGlmIChpZCA8IDB8fCBwcmljZSA8MCB8fCBwcmljZSA+IHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSAtPSBpZDtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkFkZENoYXJhY3RlcihpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJ1eUl0ZW0oaWQ6IG51bWJlcikgIHtcclxuICAgICAgICB2YXIgcHJpY2UgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0UHJpY2UoaWQpO1xyXG4gICAgICAgIGlmKGlkIDwgMHx8IHByaWNlIDwwIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocHJpY2UgPiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5IC09IHByaWNlO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQWRkSXRlbShpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldENoYXJhY3RlcihpZClcclxuICAgIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDpBcnJheTxudW1iZXI+ID0gdGhpcy5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIGlmKGNoYXJhY3Rlckxpc3RbaWRdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJDaGFyYWN0ZXJJRCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgQmFzZUVudW0ge1xyXG4gICAgZXhwb3J0IGVudW0gVUlUeXBlRW51bSB7TG93LE1pZGxlfTtcclxufSIsImltcG9ydCBCYXNlTWdyIGZyb20gXCIuLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIjtcclxuXHJcbi8qKlxyXG4gKiDlrprkuYnln7rnoYDnu5PmnoTkvZNcclxuICovXHJcbmV4cG9ydCBtb2R1bGUgQmFzZUZ1bmMge1xyXG4gICAgZW51bSBVSVR5cGVFbnVtIHtMb3csTWlkbGV9O1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcDxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX0NvdW50Om51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9NYXA6e1trZXk6IHN0cmluZ106IFR9O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX01hcCA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvckVhY2goY2FsbGJhY2s6KG1ncjpULGtleTpzdHJpbmcpPT52b2lkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBtYXBLZXkgaW4gdGhpcy5fTWFwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9NYXBbbWFwS2V5XSxtYXBLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBvYmog5pS+5YWl5a+56LGhXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDplK5cclxuICAgICAgICAgKi9cclxuICAgICAgICBTZXQoIG9iajpULCBrZXk6c3RyaW5nIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLl9NYXBba2V5XSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2V0KGtleTpzdHJpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gIHRoaXMuX01hcFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOenu+mZpOafkOS4quWvueixoVxyXG4gICAgICAgICAqIEByZXR1cm5zIOiiq+enu+mZpOWvueixoVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFJlbW92ZShrZXk6c3RyaW5nKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgT2JqOlQgPSB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICAgICAgaWYoT2JqKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm5oul5pyJXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgSGFzKGtleTpzdHJpbmcpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX01hcFtrZXldKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHRydWU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBOb2RlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfVmFsdWU6VDtcclxuICAgICAgICBwcml2YXRlIF9OZXh0Ok5vZGU8VD47XHJcbiAgICAgICAgY29uc3RydWN0b3IoIClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFZhbHVlKHZhbHVlOlQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgTmV4dCgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9OZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgTmV4dChub2RlOk5vZGU8VD4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5fTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIE5vZGVQb29sPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9Ob2RlTGlzdDpOb2RlPFQ+O1xyXG4gICAgICAgIFB1bGxCYWNrKG5vZGU6Tm9kZTxUPilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9Ob2RlTGlzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QuTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0ID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBBcXVpcmUoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpOb2RlPFQ+ID0gdGhpcy5fTm9kZUxpc3Q7XHJcbiAgICAgICAgICAgIGlmKG5vZGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0ID0gdGhpcy5fTm9kZUxpc3QuTmV4dDtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBOb2RlUXVldWU8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Db3VudDtcclxuICAgICAgICBwcml2YXRlIF9IZWFkOk5vZGU8VD5cclxuICAgICAgICBwcml2YXRlIF9UYWlsZVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDb3VudCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgUG9wTm9kZSgpOk5vZGU8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0NvdW50PDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IG51bGw7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9IZWFkO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkID0gdGhpcy5fSGVhZC5OZXh0O1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICAvL+WIq+aKiuWwvuW3tOW4puWHuuWOu+S6hlxyXG4gICAgICAgICAgICBpZih0aGlzLl9Db3VudCA9PSAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaCh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoTm9kZShub2RlOk5vZGU8VD4pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9Db3VudCA9PTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWQgPSBub2RlO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsZS5OZXh0ID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG5vZGU7XHJcbiAgICAgICAgICAgICsrdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBDbGVhcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGVhZE5vZGUoKTpOb2RlPFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5IZWFkTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIZWFkVmFsdWUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9IZWFkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fSGVhZC5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFRhaWxOb2RlKCk6Tm9kZTxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLlRhaWxOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFRhaWxWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1RhaWxlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fVGFpbGUudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFF1ZXVlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfTm9kZVBvb2w6Tm9kZVBvb2w8VD47XHJcbiAgICAgICAgcHJpdmF0ZSBfTm9kZVF1ZXVlOk5vZGVRdWV1ZTxUPjtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUG9vbCA9IG5ldyBOb2RlUG9vbDxUPigpO1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUXVldWUgPSBuZXcgTm9kZVF1ZXVlPFQ+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaCh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6Tm9kZTxUPiA9IHRoaXMuX05vZGVQb29sLkFxdWlyZSgpO1xyXG4gICAgICAgICAgICBub2RlLlZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVRdWV1ZS5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQb3AoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpOb2RlPFQ+ID0gdGhpcy5fTm9kZVF1ZXVlLlBvcE5vZGUoKTtcclxuICAgICAgICAgICAgaWYobm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fTm9kZVBvb2wuUHVsbEJhY2sobm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTm9kZVF1ZXVlLkNvdW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuLypcclxuICAgIGV4cG9ydCBjbGFzcyBMaW5rTm9kZUxpc3Q8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9IZWFkTm9kZTpOb2RlPFQ+O1xyXG4gICAgICAgIHByaXZhdGUgX1RhaWxOb2RlOk5vZGU8VD47XHJcblxyXG4gICAgICAgIHByaXZhdGUgX0NvdW50Tm9kZTpudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZE5vZGUgPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkTm9kZS5OZXh0ID0gdGhpcy5fSGVhZE5vZGU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9UYWlsTm9kZSA9IHRoaXMuX0hlYWROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5blpLTnu5PngrnlgLxcclxuICAgICAgICAgXHJcbiAgICAgICAgZ2V0IEhlYWRWYWx1ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5fSGVhZE5vZGUuVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIEFkZCh2YWx1ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld05vZGU6Tm9kZTxUPiA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIG5ld05vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5BZGROb2RlKG5ld05vZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBBZGROb2RlKG5ld05vZGU6Tm9kZTxUPilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1RhaWxOb2RlIT10aGlzLl9IZWFkTm9kZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUuTmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9Ki9cclxuXHJcbn0iLCJleHBvcnQgbW9kdWxlIEZTTSBcclxue1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRlNNXHJcbiAgICB7XHJcbiAgICAgICAgVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgRlNNIDxUIGV4dGVuZHMgU3RhdGU+IFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgbV9DdXJTdGF0ZTpUO1xyXG4gICAgICAgIHByaXZhdGUgbV9TdGF0ZURpY3Q6e1tuYW1lOnN0cmluZ106VH07XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBzdGFydFN0YXRlOlQgPSBudWxsIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTdGF0ZSA9IHN0YXJ0U3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ3VyU3RhdGUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pS55Y+Y54q25oCBXHJcbiAgICAgICAgICogQHBhcmFtIHN0YXRlIOiuvue9rueKtuaAgVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBDaGFuZ2VTdGF0ZShzdGF0ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdGUuU2V0T3duZXIodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBjdXJTdGF0ZTpUID0gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgICAgICBpZihjdXJTdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhdGUuRW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VyU3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgY3VyU3RhdGUuU3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1clN0YXRlID0gY3VyU3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGN1clN0YXRlID0gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgICAgICBpZihjdXJTdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhdGUuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fb3duZXI6SUZTTTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3Rvcihvd25lcjpJRlNNID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9vd25lciA9IG93bmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFNldE93bmVyKG93bmVyOklGU00pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fb3duZXIgPSBvd25lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGUoKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgRW5kKCk7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFN0YXJ0KCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlTWdyXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGUoKTtcclxufSIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5pbXBvcnQge0Jhc2VGdW5jfSAgZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyYW1lV29ya1xyXG57XHJcbiAgICBfTWdyTWFwOkJhc2VGdW5jLk1hcDxCYXNlTWFuYWdlcj47Ly9CYXNlU3RydWN0Lk1hcDxCYXNlTWFuYWdlcj47XHJcbiAgICBfVGVtTWdyTGlzdDpBcnJheTxCYXNlTWFuYWdlcj47XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwID0gbmV3IEJhc2VGdW5jLk1hcDxCYXNlTWFuYWdlcj4oKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIF9GTTpGcmFtZVdvcms7XHJcbiAgICBzdGF0aWMgZ2V0IEZNKCk6RnJhbWVXb3JrXHJcbiAgICB7XHJcbiAgICAgICAgaWYoRnJhbWVXb3JrLl9GTT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZyYW1lV29yay5fRk0gPSBuZXcgRnJhbWVXb3JrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBGcmFtZVdvcmsuX0ZNO1xyXG4gICAgfVxyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbXBNZ3JMaXN0ID0gbmV3IEFycmF5PEJhc2VNYW5hZ2VyPih0aGlzLl9NZ3JNYXAuQ291bnQpO1xyXG4gICAgICAgIHRoaXMuX01nck1hcC5mb3JFYWNoKCAobWdyOkJhc2VNYW5hZ2VyICwga2V5OnN0cmluZyk6dm9pZCA9PntcclxuICAgICAgICAgICAgdGVtcE1nckxpc3QucHVzaChtZ3IpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGVtcE1nckxpc3QuZm9yRWFjaCgobWdyLGlkeCk9PnttZ3IuVXBkYXRlKCk7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZE1hbmFnZXI8VCBleHRlbmRzIEJhc2VNYW5hZ2VyPiggdHlwZTp7bmV3ICgpOiBUOyBOYW1lKCk6c3RyaW5nIH0gKTpUXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fTWdyTWFwLkhhcyh0eXBlLk5hbWUoKSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTWdyTWFwLkdldCh0eXBlLk5hbWUoKSkgYXMgVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld01ncjpUID0gbmV3IHR5cGUoKTtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAuU2V0KG5ld01ncix0eXBlLk5hbWUoKSk7XHJcbiAgICAgICAgcmV0dXJuICBuZXdNZ3I7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBHZXRNYW5hZ2VyPFQgZXh0ZW5kcyBCYXNlTWFuYWdlcj4odHlwZTp7bmV3ICgpOiBUOyBOYW1lKCk6c3RyaW5nIH0pOlR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX01nck1hcC5HZXQodHlwZS5OYW1lKCkpIGFzIFQ7XHJcbiAgICB9XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog5raI5oGv5o6n5Yi25ZmoXHJcbiAqL1xyXG5pbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuZXhwb3J0IG1vZHVsZSBNZXNzYWdlTUQge1xyXG4gICAgZXhwb3J0IGNvbnN0IEdhbWVFdmVudCA9XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJEZWF0aDogXCJQbGF5ZXJEZWF0aFwiLFxyXG4gICAgICAgICAgICBHYW1lVGltZVVwOiBcIkdhbWVUaW1lVXBcIixcclxuICAgICAgICAgICAgR2FtZUNvbnRpbnVlOiBcIkdhbWVDb250aW51ZVwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXNzYWdlQ2VudGVyIGV4dGVuZHMgQmFzZU1hbmFnZXIgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTWVzc2FnZUNlbnRlclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfTWdyOiBNZXNzYWdlQ2VudGVyO1xyXG4gICAgICAgIHByaXZhdGUgX0V2ZW50RGljdDogeyBbS2V5OiBzdHJpbmddOiBNRXZlbnQgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBfR2V0RXZlbnQobmFtZTogc3RyaW5nKTogTUV2ZW50ICB7XHJcbiAgICAgICAgICAgIHZhciBldmVudDogTUV2ZW50ID0gdGhpcy5fRXZlbnREaWN0W25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgPT0gdW5kZWZpbmVkIHx8IGV2ZW50ID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBNRXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0V2ZW50RGljdFtuYW1lXSA9IGV2ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV2ZW50ID0gdGhpcy5fRXZlbnREaWN0W25hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0ID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog5rOo5YaMXHJcbiAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiDlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7T2JqfSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJlZ2lzdChuYW1lOiBzdHJpbmcsIGFjdGlvbjogKCkgPT4gdm9pZCwgbGlzdGVuZXI6IE9iamVjdCk6TUV2ZW50ICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBuZXdEbGd0OiBEZWxlZ2F0ZSA9IG5ldyBEZWxlZ2F0ZShsaXN0ZW5lciwgYWN0aW9uKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuQWRkKG5ld0RsZ3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0RXZlbnRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOmUgOafkOS4quebkeWQrFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiDlp5TmiZhcclxuICAgICAgICAgKiBAcGFyYW0ge09ian0gbGlzdGVuZXIg55uR5ZCs6ICFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmVnaXN0KG5hbWU6IHN0cmluZywgYWN0aW9uOiAoKSA9PiB2b2lkLCBsaXN0ZW5lcjogT2JqZWN0KSAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6IE1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5SbXYoYWN0aW9uLCBsaXN0ZW5lcilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOmUgOafkOS4quS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERlc1JnaXN0SURLKG5hbWU6IHN0cmluZykgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuUmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBGaXJlKG5hbWU6IHN0cmluZywgcGFyYW06IGFueSA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lp5TmiZhcclxuICAgIGV4cG9ydCBjbGFzcyBEZWxlZ2F0ZSB7XHJcbiAgICAgICAgTGlzdGVuZXI6IE9iamVjdDtcclxuICAgICAgICBBY3Rpb246IChwYXJhbTphbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEV4ZWN1dGUocGFyYW06IGFueSA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aW9uLmNhbGwodGhpcy5MaXN0ZW5lciwgcGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihsaXN0ZW5lcjogT2JqZWN0LCBhY3Rpb246IChwYXJhbTphbnkpID0+IHZvaWQpICB7XHJcbiAgICAgICAgICAgIHRoaXMuTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICAgICAgdGhpcy5BY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/kuovku7ZcclxuICAgIGV4cG9ydCBjbGFzcyBNRXZlbnQge1xyXG4gICAgICAgIERlbGVnYXRlTGlzdDogQXJyYXk8RGVsZWdhdGU+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgdGhpcy5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIOa3u+WKoOWnlOaJmFxyXG4gICAgICAgICogQHBhcmFtIHtEZWxlZ2F0ZX0gZGxnIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICovXHJcbiAgICAgICAgQWRkKGRsZzogRGVsZWdhdGUpICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0LnB1c2goZGxnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDnp7vpmaTlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvbiDmtojmga/lkI3lrZdcclxuICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lciDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJtdihhY3Rpb246ICgpID0+IHZvaWQsIGxpc3RlbmVyOiBPYmplY3QgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB2YXIgZGxndExpc3Q6IEFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhcnJJZHg6IG51bWJlciA9IGRsZ3RMaXN0Lmxlbmd0aCAtIDE7IGFycklkeCA+IC0xOyAtLWFycklkeCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gZGxndC5BY3Rpb24gJiYgbGlzdGVuZXIgPT0gZGxndC5MaXN0ZW5lcikgIHtcclxuICAgICAgICAgICAgICAgICAgICBkbGd0TGlzdC5zcGxpY2UoYXJySWR4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldCgpICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0ID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDop6blj5FcclxuICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIEV4ZWN1dGUocGFyYW06IGFueSkgIHtcclxuICAgICAgICAgICAgdmFyIGRsZ3RMaXN0OiBBcnJheTxEZWxlZ2F0ZT4gPSB0aGlzLkRlbGVnYXRlTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgYXJySWR4OiBudW1iZXIgPSBkbGd0TGlzdC5sZW5ndGggLSAxOyBhcnJJZHggPiAtMTsgLS1hcnJJZHgpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGxndCA9IGRsZ3RMaXN0W2FycklkeF07XHJcbiAgICAgICAgICAgICAgICBkbGd0LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi8uLi9TY2VuZS9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIlxyXG5pbXBvcnQge0ZTTX0gZnJvbSBcIi4vLi4vQmFzZS9GU01cIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIG1fU2NlbmVGU006IFNjZW5lLlNjZW5lRlNNO1xyXG4gICAgcHJpdmF0ZSBtX1NjZW5lTm9kZTogTGF5YS5Ob2RlO1xyXG4gICAgXHJcbiAgICBnZXQgQ3VyU2NlbmUoKTpTY2VuZS5CYXNlU2NlbmUge1xyXG4gICAgICAgIGlmKHRoaXMubV9TY2VuZUZTTS5DdXJTdGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9TY2VuZUZTTS5DdXJTdGF0ZTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldCBDdXJEaXIoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTY2VuZS5EaXJlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNjZW5lTWFuYWdlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllciA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fQkdMYXllcik7XHJcblxyXG4gICAgICAgIHRoaXMubV9TY2VuZUZTTSA9IG5ldyBTY2VuZS5TY2VuZUZTTSgpO1xyXG4gICAgICAgIHRoaXMubV9TY2VuZU5vZGUgPSBMYXlhLnN0YWdlLmFkZENoaWxkKG5ldyBMYXlhLlNwcml0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2hhbmdlU2NlbmUobmV3U2NlbmU6IFNjZW5lLkJhc2VTY2VuZSkgIHtcclxuICAgICAgICB0aGlzLm1fU2NlbmVGU00uQ2hhbmdlU3RhdGUobmV3U2NlbmUpO1xyXG4gICAgICAgIGlmKG5ld1NjZW5lLlNjZW5lT2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX1NjZW5lTm9kZS5hZGRDaGlsZChuZXdTY2VuZS5TY2VuZU9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pen6YC76L6RXHJcbiAgICBwcml2YXRlIF9CRzogTGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9CR0xheWVyOiBMYXlhLlNwcml0ZTtcclxuICAgIFxyXG4gICAgc2V0IEJHKGJnOiBMYXlhLlNwcml0ZSkge1xyXG4gICAgICAgIGlmICghYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQkcpIHtcclxuICAgICAgICAgICAgdGhpcy5fQkcucmVtb3ZlU2VsZjtcclxuICAgICAgICAgICAgdGhpcy5fQkcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIHRoaXMuX0JHLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9CRy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyLmFkZENoaWxkKHRoaXMuX0JHKTtcclxuICAgIH1cclxuICAgIGdldCBCRygpOkxheWEuU3ByaXRlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9CRztcclxuICAgIH1cclxufVxyXG5cclxuLyoq5L2c6ICFTW9cclxuKiDlnLrmma/lip/og71cclxuKi9cclxuLypcclxuLy/lnLrmma/nrqHnkIZcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBfQkc6IExheWEuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBfQkdMYXllcjogTGF5YS5TcHJpdGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuX0JHTGF5ZXIpO1xyXG4gICAgICAgIC8v5re75Yqg5Zy65pmv566h55CGXHJcbiAgICAgICAgdGhpcy5TY2VuZU5vZGUgPSBMYXlhLnN0YWdlLmFkZENoaWxkKG5ldyBMYXlhLlNwcml0ZSgpKTtcclxuICAgIH1cclxuICAgIHNldCBCRyhiZzogTGF5YS5TcHJpdGUpIHtcclxuICAgICAgICBpZiAoIWJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX0JHKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLnJlbW92ZVNlbGY7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB0aGlzLl9CRy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fQkcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllci5hZGRDaGlsZCh0aGlzLl9CRyk7XHJcbiAgICB9XHJcbiAgICBnZXQgQkcoKTpMYXlhLlNwcml0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fQkc7XHJcbiAgICB9XHJcbiAgICBTY2VuZU5vZGU6IExheWEuTm9kZTtcclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNjZW5lTWFuYWdlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX0N1clNjZW5lOiBCYXNlU2NlbmU7XHJcbiAgICBnZXQgQ3VyU2NlbmUoKTogQmFzZVNjZW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU2NlbmU7XHJcbiAgICB9XHJcbiAgICBzZXQgQ3VyU2NlbmUodmFsdWU6IEJhc2VTY2VuZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9DdXJTY2VuZSAmJiB0aGlzLl9DdXJTY2VuZS5TY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9DdXJTY2VuZS5TY2VuZS5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0N1clNjZW5lID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N1clNjZW5lICYmIHRoaXMuX0N1clNjZW5lLlNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2NlbmVOb2RlLmFkZENoaWxkKHRoaXMuX0N1clNjZW5lLlNjZW5lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyRGlyKCk6IEJhc2VEaXJlY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0N1clNjZW5lLkN1ckRpcjtcclxuICAgIH1cclxuXHJcbiAgICBFbnRlclNjZW5lKHRhcmdldFNjZW5lOiBCYXNlU2NlbmUpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lID0gdGFyZ2V0U2NlbmU7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLkxlYXZlKHRhcmdldFNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUgIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZS5VcGRhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuKi8iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlRpbWVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1fU3RhcnRUaW1lOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9HYW1lVGltZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fRnJhbWVUaW1lOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Jc1BhdXNlZDpib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgU3RhcnRUaW1lcigpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fU3RhcnRUaW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBHYW1lVGltZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fR2FtZVRpbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9TdGFydFRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICB0aGlzLm1fR2FtZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMubV9GcmFtZVRpbWUgPSAxIC9OdW1iZXIoTGF5YS5zdGFnZS5mcmFtZVJhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKSAge1xyXG4gICAgICAgIGlmKHRoaXMubV9Jc1BhdXNlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0dhbWVUaW1lICs9IHRoaXMubV9GcmFtZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhdXNlKCl7XHJcbiAgICAgICAgdGhpcy5tX0lzUGF1c2VkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ29udGludWUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Jc1BhdXNlZCA9IGZhbHNlXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi91aS9CYXNlVUlcIlxyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBVSUZ1bmMgfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1VJRnVuY1wiXHJcbmltcG9ydCB7IEJhc2VGdW5jIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcbmVudW0gTm9kZVR5cGUge1xyXG4gICAgQm90dG9tLFxyXG4gICAgTWlkZGxlLFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHN0YXRpYyBnX1VJV2lkdGggPSA3NTA7XHJcbiAgICBzdGF0aWMgZ19VSUhlaWdodCA9IDEzMzQ7XHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBtX1Jvb3ROb2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgbV9Cb3R0b21Ob2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgbV9NaWRsZU5vZGU6IExheWEuQm94O1xyXG4gICAgcHJpdmF0ZSBfVUlEaWN0OiB7IFtuYW1lOiBzdHJpbmddOiBCYXNlVUkgfTtcclxuICAgIHByaXZhdGUgX1VwZGF0ZUNvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fVXBkYXRlVGltZTpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBBZGROb2RlKG5vZGU6IE5vZGVUeXBlKTogdm9pZCAge1xyXG4gICAgICAgIHZhciBub2RlQm94OiBMYXlhLkJveCA9IG5ldyBMYXlhLkJveCgpO1xyXG4gICAgICAgIG5vZGVCb3gudG9wID0gMDtcclxuICAgICAgICBub2RlQm94LmJvdHRvbSA9IDA7XHJcbiAgICAgICAgbm9kZUJveC5sZWZ0ID0gMDtcclxuICAgICAgICBub2RlQm94LnJpZ2h0ID0gMDtcclxuICAgICAgICBzd2l0Y2ggKG5vZGUpICB7XHJcbiAgICAgICAgICAgIGNhc2UgTm9kZVR5cGUuQm90dG9tOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0JvdHRvbU5vZGUgPSBub2RlQm94O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWlkbGVOb2RlID0gbm9kZUJveDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUm9vdE5vZGUuYWRkQ2hpbGQobm9kZUJveCk7XHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLmFkZENoaWxkKG5vZGVCb3gpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcgIHtcclxuICAgICAgICByZXR1cm4gXCJVSU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcm9vdEJveCA9IG5ldyBMYXlhLkJveCgpO1xyXG4gICAgICAgIHJvb3RCb3gud2lkdGggPSBVSU1hbmFnZXIuZ19VSVdpZHRoO1xyXG4gICAgICAgIHJvb3RCb3guaGVpZ2h0ID0gVUlNYW5hZ2VyLmdfVUlIZWlnaHQ7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChyb290Qm94KTtcclxuICAgICAgICB0aGlzLm1fUm9vdE5vZGUgPSByb290Qm94O1xyXG4gICAgICAgIHRoaXMub25TaXplQ2hhbmdlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLm1fUm9vdE5vZGUpO1xyXG4gICAgICAgIHRoaXMubV9VcGRhdGVUaW1lID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5BZGROb2RlKE5vZGVUeXBlLkJvdHRvbSk7XHJcbiAgICAgICAgdGhpcy5BZGROb2RlKE5vZGVUeXBlLk1pZGRsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fVUlEaWN0ID0ge307XHJcbiAgICAgICAgdGhpcy5fVXBkYXRlQ291bnQgPSAwO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5SRVNJWkUsIHRoaXMsIHRoaXMub25TaXplQ2hhbmdlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblNpemVDaGFuZ2UoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByb290Qm94ID0gdGhpcy5tX1Jvb3ROb2RlO1xyXG4gICAgICAgIFVJRnVuYy5GaXhVSShyb290Qm94LFVJTWFuYWdlci5nX1VJV2lkdGgpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIHNjYWxlID0gVUlGdW5jLkNvdW50U2NhbGVGaXgoVUlNYW5hZ2VyLmdfVUlXaWR0aCk7XHJcbiAgICAgICAgdmFyIHJvb3RCb3ggPSB0aGlzLm1fUm9vdE5vZGU7XHJcbiAgICAgICAgcm9vdEJveC5zY2FsZVggPSBzY2FsZTtcclxuICAgICAgICByb290Qm94LnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3guaGVpZ2h0ID0gVUlNYW5hZ2VyLmdfVUlIZWlnaHQgKiBzY2FsZTtcclxuICAgICAgICByb290Qm94LndpZHRoID0gVUlNYW5hZ2VyLmdfVUlXaWR0aDsqL1xyXG4gICAgfSAgICBcclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCkgIHtcclxuICAgICAgICBcclxuICAgICAgICAvL+WumuW4p+WIt+aWsFVJXHJcbiAgICAgICAgaWYgKHRoaXMubV9VcGRhdGVUaW1lIDwgTGF5YS50aW1lci5jdXJyVGltZXIpICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkodGhpcy5tX0JvdHRvbU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVVJKHRoaXMubV9NaWRsZU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9VcGRhdGVUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXIgKyAzMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZVVJKG5vZGU6IExheWEuU3ByaXRlKSAge1xyXG4gICAgICAgIGZvciAobGV0IGlkeDogbnVtYmVyID0gMDsgaWR4IDwgbm9kZS5udW1DaGlsZHJlbjsgKytpZHgpICB7XHJcbiAgICAgICAgICAgIHZhciB1aTogQmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGlkeCkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICB1aS5VSVVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEFkZFVJKCkgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgU2hvdzxUIGV4dGVuZHMgQmFzZVVJPih1aUNsYXNzOiB7IG5ldyhuYW1lOiBzdHJpbmcpOiBUOyBOYW1lKCk6IHN0cmluZyB9KTogVCAge1xyXG4gICAgICAgIHZhciBzdHI6IHN0cmluZyA9IHVpQ2xhc3MuTmFtZSgpO1xyXG4gICAgICAgIHZhciBuZXdVSTogQmFzZVVJID0gdGhpcy5HZXRVSUJ5TmFtZShzdHIpO1xyXG4gICAgICAgIG5ld1VJID0gbmV3VUkgPT0gbnVsbCA/IHRoaXMuQWRkVUlCeU5hbWUoc3RyLCBuZXcgdWlDbGFzcyhzdHIpKSA6IG5ld1VJO1xyXG4gICAgICAgIHZhciBub2RlOiBMYXlhLlNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoIChuZXdVSS5VSVR5cGUpICB7XHJcbiAgICAgICAgICAgIC8v5Lit5bGC5qyhVUlcclxuICAgICAgICAgICAgY2FzZSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlOlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9NaWRsZU5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tX01pZGxlTm9kZS5udW1DaGlsZHJlbiA8PSAwKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6YCa55+l5a+85ryU5pqC5YGc5ri45oiPXHJcbiAgICAgICAgICAgICAgICAgICAgLy9BUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkN1ckRpci5UaW1lVXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNoaWxkTnVtOiBudW1iZXIgPSBub2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIC8v5oqK5LqS5pal55qE56qX5Y+j5YWz5o6JXHJcbiAgICAgICAgaWYgKG5ld1VJLklzTXV0ZXggJiYgY2hpbGROdW0gPiAwKSAge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVJID0gbm9kZS5nZXRDaGlsZEF0KG5vZGUubnVtQ2hpbGRyZW4gLSAxKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIGlmICghbGFzdFVJLklzTXV0ZXgpXHJcbiAgICAgICAgICAgICAgICBsYXN0VUkuSGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5hZGRDaGlsZChuZXdVSSk7XHJcbiAgICAgICAgbmV3VUkuT3Blbk9QKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdVSSBhcyBUO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKHVpOiBCYXNlVUkpICB7XHJcbiAgICAgICAgdWkucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIHVpLkNsb3NlT1AoKTtcclxuICAgICAgICB2YXIgbm9kZTogTGF5YS5TcHJpdGUgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAodWkuVUlUeXBlKSAge1xyXG4gICAgICAgICAgICAvL+S4reWxguasoVVJXHJcbiAgICAgICAgICAgIGNhc2UgQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fTWlkbGVOb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubnVtQ2hpbGRyZW4gPD0gMClcclxuICAgICAgICAgICAgICAgICAgICAvL+WFs+mXreeql+WPoyDpgJrnn6XmuLjmiI/nu6fnu61cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLkNvbnRpbnVlVGltZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGROdW06IG51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgaWYgKGNoaWxkTnVtID4gMCkgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSTogQmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGNoaWxkTnVtIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICBsYXN0VUkuT3Blbk9QKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIENsb3NlQ3VyVmlldygpICB7XHJcbiAgICAgICAgdmFyIHVpOiBCYXNlVUkgPSB0aGlzLm1fQm90dG9tTm9kZS5nZXRDaGlsZEF0KHRoaXMubV9Cb3R0b21Ob2RlLm51bUNoaWxkcmVuIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UodWkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yig6Zmk5omA5pyJ6IqC54K55LiK55qEVUlcclxuICAgIENsZWFyKCkgIHtcclxuICAgICAgICB2YXIgdWlOb2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VVSTogQmFzZVVJID0gdWlOb2RlLmdldENoaWxkQXQoMCkgYXMgQmFzZVVJOy8vLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlOb2RlID0gdGhpcy5tX01pZGxlTm9kZVxyXG4gICAgICAgIHdoaWxlICh1aU5vZGUubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEdldFVJQnlOYW1lKG5hbWU6IHN0cmluZyk6IEJhc2VVSSAge1xyXG4gICAgICAgIHZhciB1aSA9IHRoaXMuX1VJRGljdFtuYW1lXTtcclxuICAgICAgICB1aSA9IHVpID09IHVuZGVmaW5lZCA/IG51bGwgOiB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcbiAgICBBZGRVSUJ5TmFtZShuYW1lOiBzdHJpbmcsIHVpOiBCYXNlVUkpOiBCYXNlVUkgIHtcclxuICAgICAgICB0aGlzLl9VSURpY3RbbmFtZV0gPSB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJHYW1lLnNjZW5lXCI7XHJcbiAgICBzdGF0aWMgc2NlbmVSb290OnN0cmluZz1cIlwiO1xyXG4gICAgc3RhdGljIGRlYnVnOmJvb2xlYW49ZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvUm9sZUVsZW1lbnQudHNcIixSb2xlRWxlbWVudCk7XG4gICAgICAgIHJlZyhcInNjcmlwdC9JdGVtRWxlbWVudC50c1wiLEl0ZW1FbGVtZW50KTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyTWFuYWdlciBleHRlbmRzIEdhbWVNYW5hZ2VyLkJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfTWdyOiBDaGFyYWN0ZXJNYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTWdyKCk6IENoYXJhY3Rlck1hbmFnZXIge1xyXG4gICAgICAgIGlmICghQ2hhcmFjdGVyTWFuYWdlci5nX01ncikge1xyXG4gICAgICAgICAgICBDaGFyYWN0ZXJNYW5hZ2VyLmdfTWdyID0gbmV3IENoYXJhY3Rlck1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENoYXJhY3Rlck1hbmFnZXIuZ19NZ3I7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkNoYXJhY3RlckluZm9cIik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgR2VuSW5mbyhkYXRhOmFueSlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IENoYXJhY3RlckluZm8oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFNraWxsSXRlbShpZCk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGluZm86Q2hhcmFjdGVySW5mbyA9IHRoaXMuR2V0SW5mbzxDaGFyYWN0ZXJJbmZvPihpZCk7XHJcbiAgICAgICAgaWYoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uSXRlbTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0UHJpY2UoaWQpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBpbmZvOkNoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmKGluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvLlByaWNlO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRDaGFyYWN0ZXJJbmZvKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0SW5mbzxDaGFyYWN0ZXJJbmZvPihpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldENoYXJhY3Rlck1vZGVsKGlkOiBudW1iZXIsIGxldmVsOiBudW1iZXIpOiBMYXlhLlNwcml0ZTNEIHtcclxuICAgICAgICB2YXIgaW5mbzpDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZighaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyRGF0YTogQ2hhcmFjdGVySW5mbyA9IHRoaXMuR2V0Q2hhcmFjdGVySW5mbyhpZCk7XHJcbiAgICAgICAgdmFyIHNhbXBsZU1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0TEgoY2hhcmFjdGVyRGF0YS5HZXROYW1lKGxldmVsKSkpO1xyXG4gICAgICAgIHZhciBtb2RlbCA9IHNhbXBsZU1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgcmV0dXJuIG1vZGVsO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIENoYXJhY3RlckluZm8gZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlSW5mbyB7XHJcbiAgICBwcml2YXRlIG1fUHJpY2U6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Nb2RlbElEOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fU3RhdGVMc2l0OiBBcnJheTxzdHJpbmc+O1xyXG4gICAgcHJpdmF0ZSBtX0V4dGVuZElEOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fSXRlbTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgSXRlbSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fSXRlbTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUHJpY2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1ByaWNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBJRCgpOiBudW1iZXIgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0lEO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoY2hhcmFjdGVyRGF0YTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoY2hhcmFjdGVyRGF0YSk7XHJcbiAgICAgICAgdGhpcy5tX01vZGVsSUQgPSBjaGFyYWN0ZXJEYXRhLk1vZGVsSUQgPyBjaGFyYWN0ZXJEYXRhLk1vZGVsSUQgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9TdGF0ZUxzaXQgPSBjaGFyYWN0ZXJEYXRhLlN0YXRlTGlzdCA/IGNoYXJhY3RlckRhdGEuU3RhdGVMaXN0IDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fSXRlbSA9IGNoYXJhY3RlckRhdGEuSXRlbSA/IGNoYXJhY3RlckRhdGEuSXRlbSA6IC0xO1xyXG4gICAgICAgIHRoaXMubV9FeHRlbmRJRCA9IGNoYXJhY3RlckRhdGEuRXh0ZW5kSUQgPyBjaGFyYWN0ZXJEYXRhLkV4dGVuZElEIDogXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0TmFtZShsZXZlbDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgc3RhdGU6IHN0cmluZztcclxuICAgICAgICBpZiAodGhpcy5tX1N0YXRlTHNpdC5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICBzdGF0ZSA9IHRoaXMubV9TdGF0ZUxzaXRbbGV2ZWxdID8gdGhpcy5tX1N0YXRlTHNpdFtsZXZlbF0gOiB0aGlzLm1fU3RhdGVMc2l0W3RoaXMubV9TdGF0ZUxzaXQubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICBzdGF0ZSA9IFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9Nb2RlbElEICsgc3RhdGUgKyB0aGlzLm1fRXh0ZW5kSUQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5leHBvcnQgbW9kdWxlIEdhbWVNYW5hZ2VyIHtcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlTWFuYWdlciB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBCYXNlSW5mbyB9O1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0JvdHRvbUlEOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9NYXAgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5tX0JvdHRvbUlEID0gLTE7XHJcbiAgICAgICAgICAgIHZhciBjb25maWdJbmZvOiBvYmplY3QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRKc29uUGF0aChuYW1lKSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjb25maWdJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGNvbmZpZ0luZm9ba2V5XTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhSW5mbzogQmFzZUluZm8gPSB0aGlzLkdlbkluZm8oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWFwW2RhdGFJbmZvLklEXSA9IGRhdGFJbmZvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFJbmZvLklEICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9Cb3R0b21JRCA9IGRhdGFJbmZvLklEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBHZW5JbmZvKGRhdGEpOiBCYXNlSW5mbztcclxuICAgICAgICBwcm90ZWN0ZWQgR2V0SW5mbzxUIGV4dGVuZHMgQmFzZUluZm8+KGlkOiBudW1iZXIpOiBUICB7XHJcbiAgICAgICAgICAgIGlmICghaWQgfHwgaWQgPCAwKSAge1xyXG5cclxuICAgICAgICAgICAgICAgIGlkID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgQmFzZUluZm8gPSB0aGlzLm1fTWFwW2lkXTtcclxuICAgICAgICAgICAgaWYgKCFCYXNlSW5mbykgIHtcclxuICAgICAgICAgICAgICAgIEJhc2VJbmZvID0gdGhpcy5tX01hcFt0aGlzLm1fQm90dG9tSURdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChCYXNlSW5mbykgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCYXNlSW5mbyBhcyBUO1xyXG4gICAgICAgICAgICB9IGVsc2UgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPlklE5pWw57uEXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIEdldElETGlzdCgpOiBBcnJheTxudW1iZXI+ICB7XHJcbiAgICAgICAgICAgIHZhciBtYXA6IHsgW0lEOiBudW1iZXJdOiBCYXNlSW5mbyB9ID0gdGhpcy5tX01hcDtcclxuICAgICAgICAgICAgdmFyIElETGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtYXApICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG1hcFtrZXldXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIElETGlzdC5wdXNoKGRhdGEuSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBJRExpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBCYXNlSW5mbyB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fSUQ6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgZ2V0IElEKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0lEID0gZGF0YS5JRCA/IE51bWJlcihkYXRhLklEKSA6IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi4vVXRpbGl0eS9QYXRoXCI7XHJcbmltcG9ydCB7IEdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4vR2FtZU1hbmFnZXJcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtTWFuYWdlciBleHRlbmRzIEdhbWVNYW5hZ2VyLkJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfTWdyOiBJdGVtTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IE1ncigpOiBJdGVtTWFuYWdlciB7XHJcbiAgICAgICAgaWYgKCFJdGVtTWFuYWdlci5nX01ncikge1xyXG4gICAgICAgICAgICBJdGVtTWFuYWdlci5nX01nciA9IG5ldyBJdGVtTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gSXRlbU1hbmFnZXIuZ19NZ3I7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkl0ZW1JbmZvXCIpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIEdlbkluZm8oZGF0YTogYW55KTogR2FtZU1hbmFnZXIuQmFzZUluZm8ge1xyXG4gICAgICAgIHJldHVybiBuZXcgSXRlbUluZm8oZGF0YSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6YGT5YW35Lu35qC8XHJcbiAgICAgKiBAcGFyYW0gaWQg6YGT5YW3SURcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldFByaWNlKGlkOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBpbmZvOiBJdGVtSW5mbyA9IHRoaXMuR2V0SW5mbzxJdGVtSW5mbz4oaWQpO1xyXG4gICAgICAgIGlmIChpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm4gaW5mby5QcmljZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+WSUTmlbDnu4RcclxuICAgICovXHJcbiAgICBwdWJsaWMgR2V0U2VsbEl0ZW1JRExpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgdmFyIG1hcCA9IHRoaXMubV9NYXA7XHJcbiAgICAgICAgdmFyIElETGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG1hcCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YTogYW55ID0gbWFwW2tleV1cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtSW5mbzogSXRlbUluZm8gPSBkYXRhIGFzIEl0ZW1JbmZvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLlByaWNlID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgSURMaXN0LnB1c2goZGF0YS5JRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIElETGlzdDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSXRlbUluZm8gZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlSW5mbyB7XHJcbiAgICBwcml2YXRlIG1fTW9kZWxOYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fRXh0ZW5kSUQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgbV9QcmljZTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW9kZWxOYW1lICsgdGhpcy5tX0V4dGVuZElEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBQcmljZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUHJpY2U7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihkYXRhKTtcclxuICAgICAgICB0aGlzLm1fTW9kZWxOYW1lID0gZGF0YS5Nb2RlbE5hbWUgPyBkYXRhLk1vZGVsTmFtZSA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0V4dGVuZElEID0gZGF0YS5FeHRlbmRJRCA/IGRhdGEuRXh0ZW5kSUQgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9QcmljZSA9IGRhdGEuUHJpY2UgPyBOdW1iZXIoZGF0YS5QcmljZSkgOiAwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuIC8qKlxyXG4gKiDooajnjrDnlKjnmoTlr7nosaFcclxuICovXHJcbmV4cG9ydCBtb2R1bGUgQW5pbU9ialxyXG57XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKTtcclxuICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICBmb3IoIGxldCBjb3VudCA9MDtjb3VudCA8IDMwOysrY291bnQgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2VuQW5pbU9iajxBbmltQ29pbj4oQW5pbUNvaW4sbW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZW5BbmltT2JqPFQgZXh0ZW5kcyBCYXNlQW5pbU9iaj4oIGFuaW1DbGFzczp7bmV3IChuYW1lOnN0cmluZyxtb2RlbDpMYXlhLlNwcml0ZTNEKTogVDsgTmFtZSgpOnN0cmluZyB9LG1vZGVsOkxheWEuU3ByaXRlM0QgKTpUXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFuaW1PYmogPSBMYXlhLlBvb2wuZ2V0SXRlbShhbmltQ2xhc3MuTmFtZSgpKTtcclxuICAgICAgICBpZihhbmltT2JqPT1udWxsKVxyXG4gICAgICAgICAgICBhbmltT2JqID0gbmV3IGFuaW1DbGFzcyhhbmltQ2xhc3MuTmFtZSgpLG1vZGVsKTtcclxuICAgICAgICByZXR1cm4gYW5pbU9iajtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYWJzdHJhY3QgY2xhc3MgQmFzZUFuaW1PYmogZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbiAgICB7XHJcbiAgICAgICAgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlNjZW5lT2JqLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fRnJhbWVGdW5jKVxyXG4gICAgICAgIH1cclxuICAgICAgICBNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSBfTmFtZTpzdHJpbmc7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5fTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMub24oTGF5YS5FdmVudC5SRU1PVkVELHRoaXMsdGhpcy5fTGVhdmVTdGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBfRnJhbWVGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fSnVkZ2VDb21wbGV0ZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9GcmFtZUxvZ2ljRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+avj+W4p+aJp+ihjOmAu+i+keWKn+iDvVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICAvL+WIpOaWreS7u+WKoeWujOaIkFxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfSnVkZ2VDb21wbGV0ZSgpOmJvb2xlYW47XHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/nu5PmnZ/lpITnkIZcclxuICAgICAgICBwcm90ZWN0ZWQgX0xlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIodGhpcyx0aGlzLl9GcmFtZUZ1bmMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRm9yY2VMZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTGVhdmVTdGFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIEFuaW1Db2luIGV4dGVuZHMgQmFzZUFuaW1PYmpcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiQW5pbUNvaW5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgU2V0VGFyZ2V0KCB0YXJnZXQ6TGF5YS5TcHJpdGUzRCApICAgIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICBzdXBlci5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9UYXJnZXQ6TGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyxtb2RlbDpMYXlhLk1lc2hTcHJpdGUzRCA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihuYW1lLG1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBtb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+avj+W4p+aJp+ihjOmAu+i+keWKn+iDvVxyXG4gICAgICAgIHByb3RlY3RlZCBfRnJhbWVMb2dpY0Z1bmMoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGFkZFBTID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UG9zaXRpb24scG9zaXRpb24sYWRkUFMpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUoYWRkUFMsMC4xLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLmFkZChhZGRQUyxwb3NpdGlvbixwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/nu5PmnZ/lpITnkIZcclxuICAgICAgICBwcm90ZWN0ZWQgX0xlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5fTGVhdmVTdGFnZSgpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZExvZ2ljR29sZCgxKTtcclxuICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIodGhpcy5uYW1lLHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+WIpOaWreS7u+WKoeWujOaIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfSnVkZ2VDb21wbGV0ZSgpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRQb3NpdGlvbiA9IHRoaXMuX1RhcmdldC50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgZGlzRGlyID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UG9zaXRpb24scG9zaXRpb24sZGlzRGlyKTtcclxuICAgICAgICAgICAgaWYoIExheWEuVmVjdG9yMy5zY2FsYXJMZW5ndGhTcXVhcmVkKGRpc0Rpcik8MC4xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBtb2R1bGUgQ2hhcmFjdGVyXHJcbntcclxuICAgIGV4cG9ydCBlbnVtIEFuaW1FbnVtXHJcbiAgICB7XHJcbiAgICAgICAgU3RhbmQsXHJcbiAgICAgICAgRmx5LFxyXG4gICAgICAgIEZhbGwsXHJcbiAgICAgICAgSnVtcCxcclxuICAgICAgICBKdW1wZG93blxyXG4gICAgfVxyXG4gICAgdmFyIEFuaW1UeXBlOntbbmFtZTpudW1iZXJdOnN0cmluZ307XHJcbiAgICBBbmltVHlwZSA9IHt9O1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uU3RhbmRdID0gXCJzdGFuZFwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uSnVtcF0gPSBcImp1bXB1cFwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uSnVtcGRvd25dID0gXCJqdW1wZG93blwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uRmx5XSA9IFwiZmx5XCI7XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5GYWxsXSA9IFwiZmFsbFwiO1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFBsYXllckFuaW1OYW1lKCBuYW1lRW51bTpBbmltRW51bSApOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBBbmltVHlwZVtuYW1lRW51bV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJBbmltYXRvclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgbV9BbmltYXRvcjpMYXlhLkFuaW1hdG9yO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBQbGF5ZXJDaGFyYWN0ZXI6TGF5YS5TcHJpdGUzRCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBQbGF5ZXJDaGFyYWN0ZXIuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgU3dpdGNoU3RhdGUoIEFuaW1FbnVtIClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG4vL+a4uOaIj+S4reebuOaculxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ2FtZXJhIGV4dGVuZHMgTGF5YS5DYW1lcmFcclxue1xyXG4gICAgQ3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyO1xyXG4gICAgQmFzZVBTOkxheWEuVmVjdG9yMztcclxuICAgIER5bmFtaWNQUzpMYXlhLlZlY3RvcjM7XHJcbiAgICBQbGF5ZXI6UGxheWVyO1xyXG5cclxuICAgIFNldFBsYWVyKHBsYXllcjpQbGF5ZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFJlc2V0KER5bmFtaWNQUzpMYXlhLlZlY3RvcjMsYmFzZVBTOkxheWEuVmVjdG9yMyxwbGF5ZXI6UGxheWVyIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IGJhc2VQUztcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IER5bmFtaWNQUztcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul+W5tuiuvue9ruS9jee9rlxyXG4gICAgQ291bnRTZXRQUygpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZCh0aGlzLkJhc2VQUyx0aGlzLkR5bmFtaWNQUyxuZXdQUyk7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbihwczpMYXlhLlZlY3RvcjMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBwcy5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAgeyAgIFxyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIgPSBuZXcgR2FtZUNhbWVyYUN0cmxlcih0aGlzKTtcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5CYXNlUFMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIC8vdGhpcy50aW1lckxvb3AoMSx0aGlzLkN0cmxlcix0aGlzLkN0cmxlci5VcGRhdGUpO1xyXG4gICAgICAgIHRoaXMuZnJhbWVMb29wKDEsdGhpcyx0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHZhciBza3lCb3g6TGF5YS5Ta3lCb3ggPW5ldyBMYXlhLlNreUJveCgpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJGbGFnID0gTGF5YS5CYXNlQ2FtZXJhLkNMRUFSRkxBR19TS1k7XHJcbiAgICAgICAgLy9DYW1lcmEuc2t5UmVuZGVyZXIgPSBza3lCb3guX3JlbmRlcjtcclxuICAgICAgICAvL3RoaXMuc2sgPSBza3lCb3g7XHJcbiAgICAgICAgIC8vcGF0aFxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN0cmxlci5VcGRhdGUoKTtcclxuICAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVDYW1lcmFDdHJsZXJcclxue1xyXG4gICAgQ2FtZXJhOkdhbWVDYW1lcmE7XHJcbiAgICBDdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXI7XHJcbiAgICBhYnN0cmFjdCBVcGRhdGUoKTp2b2lkO1xyXG4gICAgY29uc3RydWN0b3IoIGNhbWVyYTpHYW1lQ2FtZXJhLGN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlciA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGN0cmxlciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBjdHJsZXIgPSB0aGlzOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBjYW1lcmE7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIgPSBjdHJsZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDYW1lcmFDdHJsZXIgZXh0ZW5kcyBCYXNlR2FtZUNhbWVyYUN0cmxlclxyXG57XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuQ2FtZXJhPT1udWxsfHwgdGhpcy5DYW1lcmEuUGxheWVyID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBDYW1lcmFQUyA9IHRoaXMuQ2FtZXJhLkR5bmFtaWNQUztcclxuICAgICAgICB2YXIgUGxheWVyUFMgPSB0aGlzLkNhbWVyYS5QbGF5ZXIuX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlzTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggTWF0aC5hYnMoZGlzWk51bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnogKz0gZGlzWk51bSowLjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNhbWVyYS5EeW5hbWljUFMgPUNhbWVyYVBTO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLkNvdW50U2V0UFMoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW1lcmE6R2FtZUNhbWVyYSxjdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXIgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGNhbWVyYSxjdHJsZXIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgeyBBbmltT2JqIH0gZnJvbSBcIi4vLi4vR2FtZS9BbmltT2JqXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgeyBQbGF5ZXJDb250cm9sZXIgfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL0lucHV0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG50eXBlIEFuaW1Db2luID0gQW5pbU9iai5BbmltQ29pblxyXG5leHBvcnQgbW9kdWxlIEl0ZW0ge1xyXG4gICAgLy/nianlk4HmoIfor4ZcclxuICAgIGNvbnN0IEl0ZW1JRDogc3RyaW5nID0gXCJJdGVtXCI7XHJcbiAgICBjb25zdCBNb2RlbElEOiBzdHJpbmcgPSBcIk1vZGVsXCJcclxuICAgIGV4cG9ydCBlbnVtIE1vZGVsVHlwZSAge1xyXG4gICAgICAgIENvaW5cclxuICAgIH1cclxuICAgIGV4cG9ydCBlbnVtIEl0ZW1UeXBlIHtcclxuICAgICAgICBOb25lID0gMCxcclxuICAgICAgICBFbXB0eSxcclxuICAgICAgICBSb2NrLFxyXG4gICAgICAgIFRob3JuLFxyXG4gICAgICAgIFZpbmUsXHJcbiAgICAgICAgUHJvdGVjdCA9IDExLFxyXG4gICAgICAgIEhvbHlQcm90ZWN0LFxyXG4gICAgICAgIEZseSxcclxuICAgICAgICBSb3BlLFxyXG4gICAgICAgIENvbGxlY3RvcixcclxuICAgICAgICBDb2luID0gMjAsXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIExpbmVJdGVtSW5mbyAge1xyXG4gICAgICAgIFR5cGU6IEl0ZW1UeXBlO1xyXG4gICAgICAgIE51bWJlcjogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGU6IEl0ZW1UeXBlLCBudW06IG51bWJlcikgIHtcclxuICAgICAgICAgICAgdGhpcy5UeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5OdW1iZXIgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v54mp5ZOB5biD5bGAXHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxheW91dCAge1xyXG4gICAgICAgIFJld2FyZExpc3Q6IEFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIEJhcnJpZXJMaXN0OiBBcnJheTxMYXlJdGVtTWdyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0ID0gbmV3IEFycmF5PExheUl0ZW1NZ3I+KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDEsIEl0ZW1UeXBlLkVtcHR5LCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDUsIEl0ZW1UeXBlLlJvY2ssIDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMiwgSXRlbVR5cGUuVGhvcm4sIDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMiwgSXRlbVR5cGUuVmluZSwgMTApKVxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMSwgSXRlbVR5cGUuQ29pbikpXHJcblxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMSwgSXRlbVR5cGUuRmx5LCAyMCkpXHJcblxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMSwgSXRlbVR5cGUuQ29sbGVjdG9yKSlcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsIDEsIEl0ZW1UeXBlLlByb3RlY3QpKTtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsIDEsIEl0ZW1UeXBlLkhvbHlQcm90ZWN0KSk7XHJcblxyXG4gICAgICAgICAgICBSZXNldEl0ZW1GYWN0b3J5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWtlTGluZVJld2FyZChmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vciwgdGhpcy5SZXdhcmRMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VMaW5lRGlmZmljdWx0eShmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vciwgdGhpcy5CYXJyaWVyTGlzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWtlSXRlbShmbG9vcjogbnVtYmVyLCBNZ3JMaXN0OiBBcnJheTxMYXlJdGVtTWdyPik6IEFycmF5PExpbmVJdGVtSW5mbz4gIHtcclxuICAgICAgICAgICAgdmFyIHJldHVybkluZm8gPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBsaXN0SWR4ID0gMDsgbGlzdElkeCA8IE1nckxpc3QubGVuZ3RoOyArK2xpc3RJZHgpICB7XHJcbiAgICAgICAgICAgICAgICBNZ3JMaXN0W2xpc3RJZHhdLk9uRmxvb3IoZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm86IExpbmVJdGVtSW5mbyA9IE1nckxpc3RbbGlzdElkeF0uVGFrZUl0ZW1zKGZsb29yKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLk51bWJlciA+IDApICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuSW5mby5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5JbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+ivpeWvueixoeeahOWIhuW4g+Wbvuavj+WxguetieamgueOh+WIhuW4g1xyXG4gICAgZXhwb3J0IGNsYXNzIExheUl0ZW1NZ3IgIHtcclxuICAgICAgICAvL+mBk+WFt+exu+Wei1xyXG4gICAgICAgIEl0ZW1UeXBlOiBJdGVtVHlwZTtcclxuICAgICAgICAvL+W9k+WJjeWxguaVsFxyXG4gICAgICAgIEN1ckZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgLy/ljLrpl7TliIbluIPmgLvmlbDph49cclxuICAgICAgICBJdGVtTnVtOiBudW1iZXI7XHJcbiAgICAgICAgLy/lvIDlp4vliIbluIPnmoTlsYLmlbBcclxuICAgICAgICBTdGFydEZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgLy/liIbluIPljLrpl7RcclxuICAgICAgICAvL+W3suiOt+WPluWxguagh+iusFxyXG4gICAgICAgIFRvdWNoZWRGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIEl0ZW1MaXN0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8vcmFuZ2XljLrpl7TojIPlm7RcclxuICAgICAgICAvL251bSDljLrpl7TojIPlm7TmlbDph49cclxuICAgICAgICAvL2l0ZW1UeXBlIOeUn+S6p+eahOmBk+WFt+exu+Wei1xyXG4gICAgICAgIC8vc3RhcnRGbG9vciDku47lk6rkuIDooYzlvIDlp4vmipXmjrdcclxuICAgICAgICBjb25zdHJ1Y3RvcihyYW5nZTogbnVtYmVyLCBudW06IG51bWJlciwgaXRlbVR5cGU6IEl0ZW1UeXBlLCBzdGFydEZsb29yOiBudW1iZXIgPSAxKSAge1xyXG4gICAgICAgICAgICBpZiAobnVtID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIG51bSA9IDE7XHJcbiAgICAgICAgICAgIGlmIChzdGFydEZsb29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIC8v56ysMOWxguaYr+eOqeWutui1t+atpeS9jee9rlxyXG4gICAgICAgICAgICAgICAgc3RhcnRGbG9vciA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5DdXJGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbU51bSA9IG51bTtcclxuICAgICAgICAgICAgLy/liIbluIPlm74g54mp5ZOBaWR4OuWxguaVsFxyXG4gICAgICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5PG51bWJlcj4ocmFuZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuR2VuTWFwKHN0YXJ0Rmxvb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBSYW5nZSgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbUxpc3QubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WxguabtOaWsOWHveaVsFxyXG4gICAgICAgIE9uRmxvb3IoZmxvb3I6IG51bWJlcikgIHtcclxuICAgICAgICAgICAgaWYgKGZsb29yIDwgdGhpcy5Ub3VjaGVkRmxvb3IpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGZsb29yID49IHRoaXMuU3RhcnRGbG9vciArIHRoaXMuUmFuZ2UpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlJ/miJDliIbluIPlm75cclxuICAgICAgICBHZW5NYXAoc3RhcnRGbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0Rmxvb3IgPSBzdGFydEZsb29yO1xyXG4gICAgICAgICAgICB2YXIgaXRlbU51bSA9IHRoaXMuSXRlbU51bTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY291bnQ6IG51bWJlciA9IDA7IGNvdW50IDwgdGhpcy5JdGVtTGlzdC5sZW5ndGg7ICsrY291bnQpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkl0ZW1MaXN0W2NvdW50XSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGl0ZW1MaXN0ID0gdGhpcy5JdGVtTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgY291bnROdW06IG51bWJlciA9IDA7IGNvdW50TnVtIDwgaXRlbU51bTsgKytjb3VudE51bSkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBJdGVtRmxvb3I6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuUmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JdGVtTGlzdFtJdGVtRmxvb3JdICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VJdGVtcyhmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpbmVJdGVtSW5mbyh0aGlzLkl0ZW1UeXBlLCB0aGlzLkl0ZW1MaXN0W2Zsb29yIC0gdGhpcy5TdGFydEZsb29yXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBSZXNldDogYm9vbGVhbjtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZXNldEl0ZW1GYWN0b3J5KCk6IHZvaWQgIHtcclxuICAgICAgICBpZiAoUmVzZXQpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIHRoZUtleSBpbiBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZSkgIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBwYXJzZUludCh0aGVLZXkpO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA8PSAyKSAge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgY291bnQgPSAwOyBjb3VudCA8IDMwOyArK2NvdW50KSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXM6IGFueSA9IEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW06IFN0ZXAgPSBuZXcgY2xhcyhudWxsKTtcclxuICAgICAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKEl0ZW1JRCArIHRoZUtleSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gU3RlcEl0ZW1GYWN0b3J5KGl0ZW1UeXBlOiBJdGVtVHlwZSwgU3RlcCkgIHtcclxuICAgICAgICBpZiAoU3RlcCA9PSB1bmRlZmluZWQpICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKSAge1xyXG4gICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpdGVtXHJcbiAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7XHJcbiAgICAgICAgaXRlbSA9IG9ialBvb2wuZ2V0SXRlbShJdGVtSUQgKyBpdGVtVHlwZSlcclxuICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBpZiAoR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdICE9IG51bGwgJiYgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdICE9IHVuZGVmaW5lZCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGFzOiBhbnkgPSBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV07XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IGNsYXMoU3RlcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBTdGVwSXRlbShpdGVtVHlwZSwgU3RlcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLlN0ZXAgPSBTdGVwO1xyXG4gICAgICAgIGl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSXRlbUJ1ZmZGYWN0b3J5KGl0ZW1UeXBlOkl0ZW1UeXBlKTpCYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIHZhciBidWZmOkJhc2VQbGF5ZXJCdWZmID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2goaXRlbVR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkZseTpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgRmx5QnVmZigpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Db2xsZWN0b3I6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IENvbGxlY3RCdWZmKDEwMDAwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUHJvdGVjdDpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUHJvdGVjdEJ1ZmYoMzAwMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkhvbHlQcm90ZWN0OlxyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5ldyBQcm90ZWN0QnVmZigzMDAwLCB0cnVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuVmluZTpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgVmluZUJ1ZmYoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9wZTpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUm9wZUJ1ZmYoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEFkZEJ1ZmZUb1BsYXllcihpdGVtVHlwZTpJdGVtVHlwZSk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHZhciBidWZmOkJhc2VQbGF5ZXJCdWZmOy8vID0gSXRlbUJ1ZmZGYWN0b3J5KCk7XHJcbiAgICAgICAgc3dpdGNoKGl0ZW1UeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5GbHk6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IEZseUJ1ZmYoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuQ29sbGVjdG9yOlxyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5ldyBDb2xsZWN0QnVmZigxMDAwMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFByb3RlY3RCdWZmKDMwMDApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUHJvdGVjdEJ1ZmYoMzAwMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlZpbmU6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFZpbmVCdWZmKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvcGU6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFJvcGVCdWZmKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBTdGVwSXRlbSAge1xyXG4gICAgICAgIFN0ZXA6IFN0ZXA7XHJcbiAgICAgICAgSXRlbVR5cGU6IEl0ZW1UeXBlO1xyXG4gICAgICAgIE1vZGVsOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIHByaXZhdGUgbV9BbmltYXRvcjogTGF5YS5BbmltYXRvcjtcclxuICAgICAgICBnZXQgSXNEaWZmaWN1bHR5KCk6IGJvb2xlYW4gIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGUgPiAwICYmIHRoaXMuSXRlbVR5cGUgPCAxMCAmJiB0aGlzLkl0ZW1UeXBlICE9IEl0ZW1UeXBlLlZpbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreiDveS4jeiDvei1sOS4iuWOu1xyXG4gICAgICAgIGdldCBJc0ZvcmJpZGVuKCk6IGJvb2xlYW4gIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGUgPT0gSXRlbVR5cGUuUm9jaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldEl0ZW0oKSAge1xyXG4gICAgICAgICAgICAvL3RoaXMuX0luaXRJdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5TZXRFbmFibGUoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTW9kZWwgIT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RlcC5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU2V0RW5hYmxlKCkgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTW9kZWwgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFB1dEl0ZW0gPSBmdW5jdGlvbiAoaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lKSAge1xyXG4gICAgICAgICAgICB0aGlzLkRlc1Bhd24oKTtcclxuICAgICAgICAgICAgdGhpcy5TdGVwLlN0ZXBJdGVtID0gU3RlcEl0ZW1GYWN0b3J5KGl0ZW1UeXBlLCB0aGlzLlN0ZXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mtojpmaQg5oqK6Ieq5bex5a2Y5YWl5YaF5a2Y5rGgXHJcbiAgICAgICAgRGVzUGF3bigpICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vZGVsLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7Ly9HTS5PYmpQb29sO1xyXG4gICAgICAgICAgICBvYmpQb29sLnJlY292ZXIoSXRlbUlEICsgdGhpcy5JdGVtVHlwZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLkl0ZW1UeXBlKSAge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEdlbkJ1ZmYoKTpCYXNlUGxheWVyQnVmZlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEl0ZW1CdWZmRmFjdG9yeSh0aGlzLkl0ZW1UeXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog56qB56C05L+d5oqkXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm6KKr56qB56C0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQnJlYWtQcm90ZWN0KHBsYXllcjogUGxheWVyKTogYm9vbGVhbiAge1xyXG4gICAgICAgICAgICB2YXIgY3VyQnVmZiA9IHBsYXllci5HZXRCdWZmKFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIGlmIChjdXJCdWZmKSAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjdXJCdWZmLlR5cGUpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Qcm90ZWN0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJCdWZmLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihpdGVtVHlwZTogSXRlbVR5cGUsIFN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtVHlwZSA9PSB1bmRlZmluZWQpICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5TdGVwID0gU3RlcDtcclxuICAgICAgICAgICAgdGhpcy5JdGVtVHlwZSA9IGl0ZW1UeXBlO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fSW5pdEl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXI6IFBsYXllciwgYnVmZjogQmFzZVBsYXllckJ1ZmYpICB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuQWRkQnVmZihidWZmKSkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0luaXRJdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCAhPSBudWxsICYmICF0aGlzLk1vZGVsLmRlc3Ryb3llZCkgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsIDApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fR2VuSXRlbU1vZGVsKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Nb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24gPSBwcztcclxuICAgICAgICAgICAgICAgIHRoaXMubV9BbmltYXRvciA9IHRoaXMuTW9kZWwuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgX1Rlc3RHZW50SXRlbU1vZGVsKCkgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLkl0ZW1UeXBlKSAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Sb2NrOlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuTm9uZTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5JdGVtVHlwZSkgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9jazpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBCYXNlUGxheWVyQnVmZiAge1xyXG4gICAgICAgIFR5cGU6IEl0ZW0uSXRlbVR5cGU7XHJcbiAgICAgICAgSWR4OiBudW1iZXI7XHJcbiAgICAgICAgUGxheWVyOiBQbGF5ZXI7XHJcbiAgICAgICAgVXBkYXRlKCkgIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2VuQnVmZk1vZCgpICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZNb2QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZVNwaGVyZSgwLjMsIDgsIDgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgICAgICAvL+WIm+W7uuaooeWei+aYvuekuuWvueixoVxyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5GbHkoKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fU3RhcnRGdW5jICE9IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TdGFydEZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQ29tcGxldGUoKSAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5Db21wbGV0ZUJ1ZmYodGhpcy5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTW9kLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBwcm90ZWN0ZWQgX0J1ZmZNb2Q6IExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IodHlwZTogSXRlbS5JdGVtVHlwZSwgaWR4OiBudW1iZXIgPSAwKSAge1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLklkeCA9IGlkeDtcclxuICAgICAgICAgICAgdGhpcy5HZW5CdWZmTW9kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0RnVuYzogKCkgPT4gdm9pZDtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBSb2NrIGV4dGVuZHMgU3RlcEl0ZW0gIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1vZGVsTnVtID0gMztcclxuICAgICAgICBjb25zdHJ1Y3RvcihTdGVwOiBTdGVwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb2NrLCBTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuTWVzaFNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IDEgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBSb2NrLk1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIE5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMFwiICsgaWR4KVxyXG4gICAgICAgICAgICBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhOYW1lKVxyXG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb2NrXSA9IFJvY2s7XHJcblxyXG4gICAgY2xhc3MgVGhvcm4gZXh0ZW5kcyBTdGVwSXRlbSAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlRob3JuLCBTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpOiB2b2lkICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkJyZWFrUHJvdGVjdChwbGF5ZXIpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFuaW06IExheWEuQW5pbWF0b3IgPSB0aGlzLk1vZGVsLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KFwidG91Y2hcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5UaG9ybl0gPSBUaG9ybjtcclxuXHJcbiAgICBjbGFzcyBQcm90ZWN0IGV4dGVuZHMgU3RlcEl0ZW0gIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Qcm90ZWN0LCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoUHJvdGVjdEJ1ZmYuSWR4KSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgQnVmZjpCYXNlUGxheWVyQnVmZiA9IHRoaXMuR2VuQnVmZigpO1xyXG4gICAgICAgICAgICB0aGlzLl9BZGRCdWZmVG9QbGF5ZXIocGxheWVyLCBCdWZmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Qcm90ZWN0XSA9IFByb3RlY3Q7XHJcblxyXG4gICAgY2xhc3MgUHJvdGVjdEJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiAge1xyXG4gICAgICAgIFRpbWU6IG51bWJlcjtcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB0aW1lIOaMgee7reaXtumXtFxyXG4gICAgICAgICAqIEBwYXJhbSBJc0hvbHkg5piv5ZCm57ud5a+55peg5pWMXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTogbnVtYmVyID0gMCwgSXNIb2x5OiBib29sZWFuID0gZmFsc2UpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKElzSG9seSA/IEl0ZW1UeXBlLkhvbHlQcm90ZWN0IDogSXRlbVR5cGUuUHJvdGVjdCwgUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lVGltZSArIHRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPCBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVUaW1lKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3MgSG9seVByb3RlY3QgZXh0ZW5kcyBTdGVwSXRlbSAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkhvbHlQcm90ZWN0LCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuR2V0QnVmZihQcm90ZWN0QnVmZi5JZHgpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBCdWZmOkJhc2VQbGF5ZXJCdWZmID0gdGhpcy5HZW5CdWZmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXIsIEJ1ZmYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkhvbHlQcm90ZWN0XSA9IEhvbHlQcm90ZWN0O1xyXG5cclxuICAgIGNsYXNzIENvaW4gZXh0ZW5kcyBTdGVwSXRlbSAge1xyXG4gICAgICAgIC8vVG9Eb1xyXG4gICAgICAgIHByaXZhdGUgbV90b3VjaGVkOiBCb29sZWFuXHJcbiAgICAgICAgRmx5VG9QbGF5ZXIocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHZhciBjb25pbjogQW5pbUNvaW4gPSBBbmltT2JqLkdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1PYmouQW5pbUNvaW4sIHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICBjb25pbi5TZXRUYXJnZXQocGxheWVyKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRHb2xkVW5Mb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkR29sZCgxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2luLCBzdGVwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29pbl0gPSBDb2luO1xyXG5cclxuICAgIGNsYXNzIENvbGxlY3RlciBleHRlbmRzIFN0ZXBJdGVtICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoQ29sbGVjdEJ1ZmYuSWR4KSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZiggdGhpcy5HZW5CdWZmKCkpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuQ29sbGVjdG9yLCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDEgKyBNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRfMDFcIik7XHJcbiAgICAgICAgICAgIHZhciB0aGVNb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gdGhlTW9kZWwuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Db2xsZWN0b3JdID0gQ29sbGVjdGVyO1xyXG5cclxuICAgIGNsYXNzIENvbGxlY3RCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgR2FtZURpcjogR2FtZURpcmVjdG9yO1xyXG4gICAgICAgIENvdW50Rmxvb3I6IG51bWJlcjtcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6IG51bWJlciA9IDApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3RvciwgQ29sbGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lRGlyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpcjtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gdGhpcy5HYW1lRGlyLkdhbWVUaW1lICsgdGltZTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudEZsb29yID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRGbG9vciA9IHRoaXMuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vciAtIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPCB0aGlzLkdhbWVEaXIuR2FtZVRpbWUpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vciAtIHRoaXMuQ291bnRGbG9vciArIDEgPCAwKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpci5HYW1lUGxheS5Mb29wRG9GbG9vclN0ZXAodGhpcy5Db3VudEZsb29yLCB0aGlzLCB0aGlzLkNvdW50Q29pbnMpO1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLkNvdW50Rmxvb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBDb3VudENvaW5zKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIGlmIChzdGVwLlN0ZXBJdGVtLkl0ZW1UeXBlID09IEl0ZW1UeXBlLkNvaW4pICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgQ29pbjogQ29pbiA9IHN0ZXAuU3RlcEl0ZW0gYXMgQ29pbjtcclxuICAgICAgICAgICAgICAgIENvaW4uRmx5VG9QbGF5ZXIodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEZMeSBleHRlbmRzIFN0ZXBJdGVtICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoMCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKHRoaXMuR2VuQnVmZigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkZseSwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxICsgTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fZmx5ZXJfMDFcIik7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuRmx5XSA9IEZMeTtcclxuXHJcbiAgICBjbGFzcyBGbHlCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIEZsb29yOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6IG51bWJlciAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgdmFyIHRpbWU6IG51bWJlciA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkN1clN0ZXAgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPSB0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZSAvIDIgKiB0aGlzLkZsb29yO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCgpKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TZXRTYWZlUFModGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHBsYXllci5GbHlQcmVwYXJlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlciA9IDAuMTUsIGZsb29yOiBudW1iZXIgPSAxMCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuRmx5LCBQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXIgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fRmluYWxaIC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24ueiA+IC0wLjIpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuR2V0U3RlcEJ5TG9jYXRpb24odGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUm9wZSBleHRlbmRzIFN0ZXBJdGVtICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoMCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKHRoaXMuR2VuQnVmZigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9wZSwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLk1lc2hTcHJpdGUzRCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMSwgMC41LCAwLjEpKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUm9wZV0gPSBSb3BlO1xyXG5cclxuICAgIGNsYXNzIFJvcGVCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIEZsb29yOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6IG51bWJlciAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX0ZpbmFsWiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLnogPiAtMC4yKSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5FbmQoc3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgRW5kKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9IHRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlIC8gMiAqIHRoaXMuRmxvb3I7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsIHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlciA9IDAuMSwgZmxvb3I6IG51bWJlciA9IDEwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb3BlLCBQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpc1JpZ2h0OiBib29sZWFuKTogdm9pZCAge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VGbG9vciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3JMaW5lO1xyXG4gICAgICAgICAgICBpZiAoY2xvc2VGbG9vci5GbG9vck51bSAlIDIgIT0gdGhpcy5fRmluYWxMb2NhdGlvbi5ZICUgMikgIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlRmxvb3IgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldEZsb29yQnlGbG9vcihjbG9zZUZsb29yLkZsb29yTnVtICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBjbG9zZUZsb29yLkdldFN0ZXAodGhpcy5fRmluYWxMb2NhdGlvbi5YKTtcclxuICAgICAgICAgICAgaWYgKGlzUmlnaHQpXHJcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICAgICAgaWYgKHN0ZXAuU3RlcEl0ZW0uSXNGb3JiaWRlbikgIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuRW5kKHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBWaW5lIGV4dGVuZHMgU3RlcEl0ZW0gIHtcclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHZhciBjdXJCdWZmOiBCYXNlUGxheWVyQnVmZiA9IHBsYXllci5HZXRCdWZmKDApO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuQnJlYWtQcm90ZWN0KHBsYXllcikpICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZih0aGlzLkdlbkJ1ZmYoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlZpbmUsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSArIE1hdGgucmFuZG9tKCkgKiAyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IElkeCA9PSAxID8gcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIikgOiBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpXHJcbiAgICAgICAgICAgIC8vdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIilcclxuICAgICAgICAgICAgLy92YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpXHJcblxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlZpbmVdID0gVmluZTtcclxuXHJcbiAgICBjbGFzcyBWaW5lQnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmICB7XHJcbiAgICAgICAgQ291bnRUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgSW5wdXREaXI6IGJvb2xlYW47XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQodGhpcywgdGhpcy5fSW5wdXQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ29tcGxldGUoKSAge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvdW50VGltZTogbnVtYmVyID0gNCwgaW5wdXREaXI6IGJvb2xlYW4gPSB0cnVlKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5WaW5lLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudFRpbWUgPSBjb3VudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSBpbnB1dERpcjtcclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaW5wdXREaXI6IGJvb2xlYW4pICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLklucHV0RGlyID09IGlucHV0RGlyKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9ICF0aGlzLklucHV0RGlyO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLkNvdW50VGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5Db3VudFRpbWUgPD0gMCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfU2hvd0dhbWVJbmZvKCkgIHtcclxuICAgICAgICAgICAgdmFyIGluZm86IHN0cmluZztcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ291bnRUaW1lIDw9IDApXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gXCJcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuSW5wdXREaXIgPT0gdHJ1ZSA/IFwiUmlnaHRcIiA6IFwiTGVmdFwiO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgbW9kdWxlIEdhbWVNb2R1bGVcclxue1xyXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPbkNoYXJhY3Rlckl0ZW1DaGFuZ2U6c3RyaW5nID0gXCJPbkNoYXJhY3Rlckl0ZW1DaGFuZ2VcIjtcclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgR2FtZVN0cnVjdFxyXG57XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0SW5mbyB7XHJcbiAgICAgICAgQXVkaW9PbjogYm9vbGVhbjtcclxuICAgICAgICBPUElzUmlnaHQ6IGJvb2xlYW47XHJcbiAgICAgICAgVGV4dEluZm86IHN0cmluZztcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5BdWRpb09uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5PUElzUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlRleHRJbmZvID0gXCJIZWxsbyBcXG4gSGVsbG9cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTUxvY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgZ2V0IFgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBYKHg6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzBdID14O1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgWSgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0FyclsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFkoeTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnJbMV0gPSB5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9BcnI6QXJyYXk8bnVtYmVyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggeDpudW1iZXIseTpudW1iZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyID0gW3gseV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IHZhciBJdGVtRGljdFR5cGU6e1tJdGVtVHlwZTpudW1iZXJdOmFueX07XHJcbiAgICBJdGVtRGljdFR5cGUgPSB7IH07XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog6L6T5YWl566h55CG55u45YWzXHJcbiAqL1xyXG5pbXBvcnQgR2FtZVNjZW5lUGxheSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheVwiXHJcbmV4cG9ydCBtb2R1bGUgSW5wdXRcclxue1xyXG4vL+WfuuehgOi+k+WFpeaOp+WItuWZqFxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVJbnB1dFxyXG57XHJcbiAgICAvL+WFrOaciVxyXG4gICAgTmV4dElucHV0OkJhc2VHYW1lSW5wdXQ7XHJcbiAgICBhYnN0cmFjdCBJbnB1dChpc1JpZ2h0OmJvb2xlYW4pO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCBpbnB1dCA6QmFzZUdhbWVJbnB1dCA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGlucHV0ID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuTmV4dElucHV0ID0gaW5wdXQ7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge31cclxuICAgIENsZWFyKCl7fVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRElZSW5wdXQgZXh0ZW5kcyBCYXNlR2FtZUlucHV0XHJcbntcclxuICAgIElucHV0KGlzUmlnaHQ6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9MaXN0ZW5lcilcclxuICAgICAgICAgICAgdGhpcy5fTGlzdGVuZXIuY2FsbCh0aGlzLl9Pd25lcixpc1JpZ2h0KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX093bmVyOmFueTtcclxuICAgIHByaXZhdGUgX0xpc3RlbmVyOihpc3Jpbmc6Ym9vbGVhbik9PnZvaWQ7XHJcbiAgICBjb25zdHJ1Y3Rvcihvd25lcjphbnkgPSBudWxsLGxpc3RlbmVyOihpc3Jpbmc6Ym9vbGVhbik9PnZvaWQgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fT3duZXIgPSBvd25lcjtcclxuICAgICAgICB0aGlzLl9MaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBOb3JtR2FtZUlucHV0IGV4dGVuZHMgQmFzZUdhbWVJbnB1dFxyXG57XHJcbiAgICBHYW1lRGlyOkdhbWVTY2VuZVBsYXk7XHJcbiAgICBfRGlydHk6Ym9vbGVhbjtcclxuICAgIF9Jc1JpZ2h0OmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvciggZGlyOkdhbWVTY2VuZVBsYXksaW5wdXQ6QmFzZUdhbWVJbnB1dCA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGlucHV0KTtcclxuICAgICAgICB0aGlzLkdhbWVEaXIgPSBkaXI7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9Jc1JpZ2h0ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBJbnB1dCggaXNSaWdodDpib29sZWFuIClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMuR2FtZURpci5Nb3ZlU3RlcChpc1JpZ2h0KTtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fSXNSaWdodCA9IGlzUmlnaHQ7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0RpcnR5JiZ0aGlzLkdhbWVEaXIuUGxheWVyLkJhc2VDdHJsZXIuVGltZTw9MC4xKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lRGlyLk1vdmVTdGVwKHRoaXMuX0lzUmlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIENsZWFyKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eT1mYWxzZTtcclxuICAgIH1cclxufVxyXG59XHJcbiIsImltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG5cclxuIC8qKuS9nOiAhTpNb1xyXG4gKuWcuuaZr+WGheWvueixoSBcclxuICovXHJcbi8v566h55CG5LiA5pW06KGMXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdW50TGluZSBleHRlbmRzIExheWEuU3ByaXRlM0Rcclxue1xyXG4gICAgTGF5T3V0RGlydHk6Ym9vbGVhbjtcclxuICAgIExpbmVJZHg6bnVtYmVyO1xyXG4gICAgRmxvb3JOdW06bnVtYmVyO1xyXG4gICAgU3RlcExpc3Q6U3RlcFtdO1xyXG4gICAgTG9naWNMZW5ndGg6bnVtYmVyO1xyXG4gICAgU3RlcEl0ZW06U3RlcEl0ZW07XHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+6I635Y+W5pi+56S65Ye65p2l55qE56ys5Yeg5Liq5bmz5Y+wXHJcbiAgICBHZXRTdGVwKGlkeDpudW1iZXIpOlN0ZXBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TdGVwTGlzdFtpZHggKyAxXTtcclxuICAgIH1cclxuICAgIC8v6K6+572u5q+P5bGCXHJcbiAgICBTZXRMaW5lKCBmbG9vcjpudW1iZXIgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkZsb29yTnVtID0gZmxvb3I7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgdmFyIHN0ZXBMZW5ndGggPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgIHZhciBzdGVwRGlzdGFuY2U9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZTtcclxuICAgICAgICBuZXdQUy55ID0gc3RlcExlbmd0aCpmbG9vcjtcclxuICAgICAgICBuZXdQUy56ID0gLXN0ZXBEaXN0YW5jZS8yICpmbG9vcjtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHZhciBzdGVwQXJyOlN0ZXBbXSA9IHRoaXMuU3RlcExpc3Q7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHN0YXJ0WCA9IDAgLSBzdGVwQXJyLmxlbmd0aC8yICogc3RlcERpc3RhbmNlO1xyXG4gICAgICAgIGlmKHRoaXMuSnVnZUlzTGVzc0xpbmUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBzdGVwRGlzdGFuY2UvMjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICBmb3IoIHZhciBjb2x1bW4gPTAgO2NvbHVtbjxzdGVwQXJyLmxlbmd0aDsrK2NvbHVtbiApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbmV3U3RlcDpTdGVwID0gc3RlcEFycltjb2x1bW5dO1xyXG4gICAgICAgICAgICB2YXIgc3RlcFZlY3RvciA9IG5ld1N0ZXAuUG9zaXRpb247XHJcbiAgICAgICAgICAgIHN0ZXBWZWN0b3IueCA9IHN0YXJ0WDtcclxuICAgICAgICAgICAgaWYodGhpcy5fU2V0ZWQmJihjb2x1bW4gPT0gMHx8Y29sdW1uPnRoaXMuTG9naWNMZW5ndGgpKVxyXG4gICAgICAgICAgICAgICAgbmV3U3RlcC5SZXNldFN0ZXAoc3RlcFZlY3Rvcix0cnVlKVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBuZXdTdGVwLlJlc2V0U3RlcChzdGVwVmVjdG9yKVxyXG4gICAgICAgICAgICBzdGFydFggKz0gc3RlcERpc3RhbmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLl9TZXRlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHN0ZXBBcnJbMF0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgc3RlcEFycltzdGVwQXJyLmxlbmd0aCAtMV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fU2V0ZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmKCAhIHRoaXMuSnVnZUlzTGVzc0xpbmUoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuTG9naWNMZW5ndGggPSBzdGVwQXJyLmxlbmd0aC0yO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGVwQXJyW3N0ZXBBcnIubGVuZ3RoIC0yXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IHN0ZXBBcnIubGVuZ3RoIC0zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/liKTmlq3mmK/lkKbmlLbnvKnnmoTpgqPlsYJcclxuICAgIEp1Z2VJc0xlc3NMaW5lKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkZsb29yTnVtJTIgIT0gMDtcclxuICAgIH1cclxuICAgIC8v5bCG5q+P5Liq6IqC54K56ZO+5o6l5Yiw5LiL5LiA5bGCXHJcbiAgICBTZXROZXh0Rmxvb3IoIGxhc3RGbG9vcjpNb3VudExpbmUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WIpOaWreaYr+WQpuacieS4pOWktOerr+eCuVxyXG4gICAgICAgIHZhciBoYXZlUG9pbnQgPSBsYXN0Rmxvb3IuTG9naWNMZW5ndGggPnRoaXMuTG9naWNMZW5ndGhcclxuICAgICAgICBmb3IoIHZhciBzdGFydElkeDpudW1iZXIgPSAwO3N0YXJ0SWR4PCB0aGlzLkxvZ2ljTGVuZ3RoOysrc3RhcnRJZHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbGVmdFBhcmVudDpTdGVwID1udWxsO1xyXG4gICAgICAgICAgICB2YXIgcmlnaHRQYXJlbnQ6U3RlcCA9bnVsbDtcclxuICAgICAgICAgICAgaWYoaGF2ZVBvaW50KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCsxKTtcclxuICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGVmdFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4LTEpO1xyXG4gICAgICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHRoaVN0ZXAgPSB0aGlzLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlTdGVwLkxlZnRQYXJlbnQgPSBsZWZ0UGFyZW50O1xyXG4gICAgICAgICAgICBsZWZ0UGFyZW50LlJpZ2h0Q2hpbGQgPSB0aGlTdGVwO1xyXG5cclxuICAgICAgICAgICAgdGhpU3RlcC5SaWdodFBhcmVudCA9IHJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICByaWdodFBhcmVudC5MZWZ0Q2hpbGQgPSB0aGlTdGVwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5pWy56KO5LiA5bGCXHJcbiAgICBCcmVhaygpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2V0ZWQ6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKGxpbmVJZHg6bnVtYmVyLGZsb29yOm51bWJlciA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNvbHVtbnM6bnVtYmVyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTGluZVN0ZXBOdW07XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkxpbmVJZHggPSBsaW5lSWR4O1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB0aGlzLlN0ZXBMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1NldGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yKCB2YXIgU3RhcnRJZHg6bnVtYmVyID0gKGNvbHVtbnMgLTEpO1N0YXJ0SWR4Pj0wOy0tU3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N0ZXA6U3RlcCA9IG5ldyBTdGVwKHRoaXMsU3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ld1N0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXBMaXN0W1N0YXJ0SWR4XSA9IG5ld1N0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge1BsYXllckNvbnRyb2xlcn0gZnJvbSBcIi4vUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQge0NoYXJhY3Rlcn0gZnJvbSBcIi4vQ2hhcmFjdGVyXCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIlxyXG5pbXBvcnQgQ2hhcmFjdGVyTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvQ2hhcmFjdGVyTWFtYWdlclwiO1xyXG52YXIgbnVtOm51bWJlciA9IDA7XHJcbi8v6K+l6ISa5pys55So5LqO5ri45oiP546p5a625a+56LGh566h55CGXHJcbi8v546p5a625a+56LGhXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIExheWEuU3ByaXRlM0RcclxueyAgIFxyXG4gICAgLy/np4HmnInlsZ7mgKdcclxuICAgIF9Mb2dpY1Bvc2l0aW9uOkxheWEuVmVjdG9yMztcclxuICAgIHByaXZhdGUgX0J1ZmZOb2RlOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBwcml2YXRlIF9QbGF5ZXJNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBfQ3VyU3RlcDpTdGVwO1xyXG4gICAgcHJpdmF0ZSBfQ3RybGVyOlBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyO1xyXG4gICAgcHJpdmF0ZSBtX0FuaW1hdG9yOkxheWEuQW5pbWF0b3I7XHJcbiAgICBwcml2YXRlIG1fQnVmZk1vZGVsOntbbmFtZTpudW1iZXJdOkxheWEuU3ByaXRlM0R9XHJcbiAgICBcclxuICAgIEJhc2VDdHJsZXI6UGxheWVyQ29udHJvbGVyLlBsYXllck5vcm1DdHJsZXI7XHJcbiAgICBCdWZmQXJyOkFycmF5PEl0ZW0uQmFzZVBsYXllckJ1ZmY+O1xyXG4gICAgSWROdW1iZXI6bnVtYmVyO1xyXG5cclxuICAgIHNldCBDdXJTdGVwKHN0ZXA6U3RlcClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdXJTdGVwID0gc3RlcDtcclxuICAgIH1cclxuICAgIGdldCBDdXJTdGVwKCk6U3RlcFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgSW5pdEJVZmZNb2RlbCggcGxheWVyTW9kZWw6TGF5YS5TcHJpdGUzRCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5TZXRNb2RlbCggXCJpdGVtX2ZseWVyXzAxXCIsIFwiUl9oYW5kXCIscGxheWVyTW9kZWwsIEl0ZW0uSXRlbVR5cGUuRmx5KTtcclxuICAgICAgICB0aGlzLlNldE1vZGVsKCBcIml0ZW1fc2hpZWxkXzAxXCIsIFwiaGVhZFwiLHBsYXllck1vZGVsLCBJdGVtLkl0ZW1UeXBlLlByb3RlY3QpO1xyXG4gICAgICAgIHRoaXMuU2V0TW9kZWwoIFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiLCBcImhlYWRcIixwbGF5ZXJNb2RlbCwgSXRlbS5JdGVtVHlwZS5Ib2x5UHJvdGVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTZXRNb2RlbCggcmVzb3VyY2VOYW1lOnN0cmluZywgbm9kZU5hbWU6c3RyaW5nLCBwbGF5ZXJNb2RlbDpMYXlhLlNwcml0ZTNELCBpdGVtVHlwZTpJdGVtLkl0ZW1UeXBlIClcclxuICAgIHtcclxuICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldExIKHJlc291cmNlTmFtZSkpO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6TGF5YS5TcHJpdGUzRCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcGxheWVyTW9kZWwuZ2V0Q2hpbGRBdCgwKS5hZGRDaGlsZChidWZmTW9kZWwpO1xyXG4gICAgICAgIHN3aXRjaChub2RlTmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJoZWFkXCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgbm9kZTpMYXlhLlNwcml0ZTNEID0gcGxheWVyTW9kZWwuZ2V0Q2hpbGRCeU5hbWUobm9kZU5hbWUpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgICAgICAgICBub2RlLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yLmxpbmtTcHJpdGUzRFRvQXZhdGFyTm9kZShub2RlTmFtZSxidWZmTW9kZWwpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgYnVmZk1vZGVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV9CdWZmTW9kZWxbaXRlbVR5cGVdID0gYnVmZk1vZGVsO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsID0ge307XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcyk7XHJcblxyXG4gICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbiAgICAgICAgdGhpcy5vbihMYXlhLkV2ZW50LlJFTU9WRUQsdGhpcywoKT0+eyB0aGlzLmRlc3Ryb3koKSB9KVxyXG4gICAgICAgIHZhciBtZ3I6Q2hhcmFjdGVyTWFuYWdlciA9IEdhbWVBUFAuQ2hhcmFjdGVyTWdyO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtX1N0YXRlTWFwOnt9XHJcbiAgICBwdWJsaWMgU2V0UGxheWVyTW9kZWwoIG1vZGVsOkxheWEuU3ByaXRlM0QgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobW9kZWwpO1xyXG4gICAgICAgIG1vZGVsLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygwLCAxODAsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvciA9IG1vZGVsLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIHZhciBsYXllcjpMYXlhLk1hcExheWVyID0gdGhpcy5tX0FuaW1hdG9yLmdldENvbnRyb2xsZXJMYXllcigpLl9zdGF0ZXNNYXA7XHJcbiAgICAgICAgdGhpcy5tX1N0YXRlTWFwID0ge307XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gbGF5ZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX1N0YXRlTWFwW2tleV0gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkluaXRCVWZmTW9kZWwobW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIFJlc2V0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBudWxsO1xyXG4gICAgICAgIGlmKHRoaXMuX0J1ZmZOb2RlKVxyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fQnVmZk5vZGUgPSBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fQnVmZk5vZGUpO1xyXG4gICAgICAgIHRoaXMuQnVmZkFyciA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuQmFzZUN0cmxlciA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyTm9ybUN0cmxlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLkJhc2VDdHJsZXI7XHJcbiAgICAgICAgdGhpcy5fTG9naWNQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoMCwwKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fVXBkYXRlKTtcclxuICAgICAgICB2YXIgZGVmYXVsdEFuaW1TdGF0ZTpMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLm1fQW5pbWF0b3IuZ2V0RGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgdmFyIHN0YXRlTmFtZTpzdHJpbmcgPSBkZWZhdWx0QW5pbVN0YXRlLm5hbWU7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoc3RhdGVOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueOqeWutkJVRkZcclxuICAgICAqIEBwYXJhbSBpZHgg5qe95L2N5qOA5p+lXHJcbiAgICAgKiBAcmV0dXJucyDnqbrooajnpLrmsqHmnIlcclxuICAgICAqL1xyXG4gICAgR2V0QnVmZihpZHg6bnVtYmVyKTpJdGVtLkJhc2VQbGF5ZXJCdWZmXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLkJ1ZmZBcnJbaWR4XSAhPW51bGwmJnRoaXMuQnVmZkFycltpZHhdIT11bmRlZmluZWQpP3RoaXMuQnVmZkFycltpZHhdOm51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mkYbmlL7op5LoibJcclxuICAgIFNldFN0ZXAocHV0U3RlcDpTdGVwKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gcHV0U3RlcDtcclxuICAgICAgICB2YXIgbmV3UFMgPSBwdXRTdGVwLlBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgbmV3UFMueSArPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuUG9zaXRpb24gPSBuZXdQUztcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gcHV0U3RlcC5Qb3NpdGlvbjtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLlN0YW5kKSk7XHJcbiAgICAgICAgdGhpcy5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgfVxyXG4gICAgc2V0IFBvc2l0aW9uKCBuZXdQUzpMYXlhLlZlY3RvcjMgKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdQUzpMYXlhLlZlY3RvcjMgPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTpMYXlhLlZlY3RvcjNcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2dpY1Bvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0xvZ2ljUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluIPlsYDlvZPliY3lsYLkvYbkuI3np7vliqhcclxuICAgICAqIEBwYXJhbSB7U3RlcH0gc3RlcCDkuIvkuIDmraXlj7DpmLZcclxuICAgICAqL1xyXG4gICAgTGF5U3RlcChzdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBzdGVwO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBzdGVwLlBvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBTdGFydE1vdmUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoIENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uSnVtcCkgKTtcclxuICAgICAgICB0aGlzLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgSnVtcERvd24oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5KdW1wZG93bikpO1xyXG4gICAgfVxyXG5cclxuICAgIEZseSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkZseSkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFBsYXllckRlYXRoOmJvb2xlYW47XHJcbiAgICAvL+inpuWPkeWPsOmYtlxyXG4gICAgVG91Y2hHcm91bmQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJEZWF0aCB8fCAhdGhpcy5DdXJTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoKHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5JdGVtVHlwZSA9PSBJdGVtLkl0ZW1UeXBlLk5vbmUpJiYodGhpcy5DdXJTdGVwLklzRW1wdHl8fCh0aGlzLkN1clN0ZXAuTGVmdFBhcmVudCYmdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50JiZ0aGlzLkN1clN0ZXAuTGVmdFBhcmVudC5TdGVwSXRlbS5Jc0ZvcmJpZGVuJiZ0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbikpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgICAgIHZhciBjbGlwTmFtZTpzdHJpbmcgPSBDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkZhbGwpO1xyXG4gICAgICAgICAgICBpZih0aGlzLm1fU3RhdGVNYXBbY2xpcE5hbWVdKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoY2xpcE5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5Ub3VjaEl0ZW0odGhpcyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog56e75YqoXHJcbiAgICAgKiBAcGFyYW0ge0xheWEuVmVjdG9yM30gdmVjdG9yIOenu+WKqOWQkemHj+WAvFxyXG4gICAgICovXHJcbiAgICBUcmFuc2xhdGUoIHZlY3RvcjpMYXlhLlZlY3RvcjMgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0udHJhbnNsYXRlKHZlY3Rvcik7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZCh0aGlzLl9Mb2dpY1Bvc2l0aW9uLHZlY3Rvcix0aGlzLl9Mb2dpY1Bvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOeOqeWutuaOp+WItuWZqFxyXG4gICAgICogQHBhcmFtIG5ld0N0cmxlciDmlrDnjqnlrrbmjqfliLblmahcclxuICAgICAqL1xyXG4gICAgQWRkQ3RybGVyKG5ld0N0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlciApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgY3RybGVyOlBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyID0gdGhpcy5fQ3RybGVyO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IG5ld0N0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuTmV4dEN0cmwgPWN0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuU2V0UGxheWVyKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75Lqk5o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIFBvcEN0cmxlcigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLl9DdHJsZXIuTmV4dEN0cmw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoEJVRkZcclxuICAgICAqIEBwYXJhbSBidWZmIFxyXG4gICAgICogQHBhcmFtIGluZGV4IFxyXG4gICAgICovXHJcbiAgICBBZGRCdWZmKGJ1ZmY6SXRlbS5CYXNlUGxheWVyQnVmZik6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHZhciBpbmRleDpudW1iZXIgPSBidWZmLklkeDtcclxuICAgICAgICBpZih0aGlzLkJ1ZmZBcnJbaW5kZXhdIT1udWxsfHx0aGlzLkJ1ZmZBcnJbaW5kZXhdIT11bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBidWZmTW9kZWw6TGF5YS5TcHJpdGUzRCA9IHRoaXMubV9CdWZmTW9kZWxbYnVmZi5UeXBlXTtcclxuICAgICAgICBpZihidWZmTW9kZWwpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYnVmZk1vZGVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQnVmZkFycltpbmRleF0gPSBidWZmO1xyXG4gICAgICAgIGJ1ZmYuSWR4ID0gaW5kZXg7XHJcbiAgICAgICAgYnVmZi5TdGFydCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5PmnZ9CVUZGXHJcbiAgICAgKi9cclxuICAgIENvbXBsZXRlQnVmZihpbmRleDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGJ1ZmY6SXRlbS5CYXNlUGxheWVyQnVmZiA9IHRoaXMuQnVmZkFycltpbmRleF07XHJcbiAgICAgICAgdmFyIGJ1ZmZNb2RlbDpMYXlhLlNwcml0ZTNEID0gdGhpcy5tX0J1ZmZNb2RlbFtidWZmLlR5cGVdO1xyXG4gICAgICAgIGlmKGJ1ZmZNb2RlbCkgYnVmZk1vZGVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVmZkFycltpbmRleF09bnVsbDtcclxuICAgICAgICBpZihidWZmPT1udWxsfHxidWZmPT11bmRlZmluZWQgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgX1VwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLlBsYXllckRlYXRoKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIGZvciggdmFyIGJ1ZmZJZHg6bnVtYmVyID0gMDtidWZmSWR4PDI7KytidWZmSWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuQnVmZkFycltidWZmSWR4XSE9bnVsbHx8dGhpcy5CdWZmQXJyW2J1ZmZJZHhdIT11bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1ZmZBcnJbYnVmZklkeF0uVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgRmx5UHJlcGFyZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RlcERhdGFcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge31cclxuICAgIEdldERhdGEoIHN0ZXA6U3RlcCApXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXJDb250cm9sZXJcclxue1xyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQbGF5ZXJDdHJsZXJcclxuICAgIHtcclxuICAgICAgICAvL+WFrOWFseaOpeWPo1xyXG4gICAgICAgIE5leHRDdHJsOkJhc2VQbGF5ZXJDdHJsZXI7XHJcbiAgICAgICAgcGxheWVyOlBsYXllcjtcclxuICAgICAgICBcclxuICAgICAgICBVcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjpQbGF5ZXIpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBwbGF5ZXI6UGxheWVyLCBjdHJsZXI6QmFzZVBsYXllckN0cmxlciA9IG51bGwgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoY3RybGVyID09IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN0cmxlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5OZXh0Q3RybCA9IGN0cmxlcjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfVXBkYXRlKCk6dm9pZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/nlKjkuo7op5LoibLmraPluLjnirbmgIHkuIvnmoTnp7vliqhcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJOb3JtQ3RybGVyIGV4dGVuZHMgQmFzZVBsYXllckN0cmxlclxyXG4gICAge1xyXG4gICAgICAgIFRpbWU6bnVtYmVyO1xyXG4gICAgICAgIElzRmFsbGluZzpib29sZWFuO1xyXG4gICAgICAgIFN0YXJ0TW92ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkRpcmVjdG9yLkdhbWVUaW1lICsgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuUGxheWVyTW92ZVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSXNGYWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHBsYXllcjpQbGF5ZXIgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRpbWU+MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5UaW1lPD1BUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkRpcmVjdG9yLkdhbWVUaW1lKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGltZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlNldFN0ZXAodGhpcy5wbGF5ZXIuQ3VyU3RlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VGltZSA9IHRoaXMuVGltZS1MYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICAgICAgICAgICAgICBpZiggdGhpcy5Jc0ZhbGxpbmcgPSBmYWxzZSAmJiBsYXN0VGltZSoyID4gdGhpcy5UaW1lLUxheWEudGltZXIuY3VyclRpbWVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5KdW1wRG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmF0ZSA9ICgxLWxhc3RUaW1lLyBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5QbGF5ZXJNb3ZlVGltZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIFN0ZXBQczpMYXlhLlZlY3RvcjMgPSB0aGlzLnBsYXllci5DdXJTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIFN0ZXBQcy55ICs9Q29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycHM6TGF5YS5WZWN0b3IzID0gdGhpcy5wbGF5ZXIuUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycHMueSArPUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1BzLnggPSAoU3RlcFBzLnggLSBjdXJwcy54KSpyYXRlKyBjdXJwcy54O1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1BzLnkgPSAoU3RlcFBzLnkgLSBjdXJwcy55KSpyYXRlK2N1cnBzLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3UHMueiA9IChTdGVwUHMueiAtIGN1cnBzLnopKnJhdGUrY3VycHMuejtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlBvc2l0aW9uID0gbmV3UHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlRvdWNoR3JvdW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v546p5a626aOe6KGMXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyRmx5IGV4dGVuZHMgQmFzZVBsYXllckN0cmxlclxyXG4gICAge1xyXG4gICAgICAgIFNwZWVkOm51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7njqnlrrZcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIOaTjeaOp+inkuiJslxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNldFBsYXllcihwbGF5ZXI6UGxheWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuU2V0UGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIHBsYXllci5UcmFuc2xhdGUobmV3IExheWEuVmVjdG9yMygwLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsMCkpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjpHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbFo6bnVtYmVyOyAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5wbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdmFyIHZlY3RvciA9IG5ldyBMYXlhLlZlY3RvcjMoMCxDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoLC0xKkNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZS8yKTtcclxuICAgICAgICAgICAvLyBMYXlhLlZlY3RvcjMuc2NhbGUodmVjdG9yLHRoaXMuU3BlZWQsdmVjdG9yKTtcclxuICAgICAgICAgICB2YXIgdmVjdG9yOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoMCwwLjE0NiwtMC4xMDM5NClcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuVHJhbnNsYXRlKHZlY3Rvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuL01vdW50TGluZVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxudHlwZSBTdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW07XHJcbnR5cGUgTUxvY2F0aW9uID0gR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbi8v5q2lXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXAgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbntcclxuICAgIC8v5qih5Z6L5Liq5pWwXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0ZXBNb2RlbE51bTpudW1iZXIgPSAzO1xyXG5cclxuICAgIExlZnRQYXJlbnQ6U3RlcDtcclxuICAgIFJpZ2h0UGFyZW50OlN0ZXA7XHJcbiAgICBMZWZ0Q2hpbGQ6U3RlcDtcclxuICAgIFJpZ2h0Q2hpbGQ6U3RlcDtcclxuICAgIFN0ZXBJdGVtOlN0ZXBJdGVtO1xyXG4gICAgUm9hZE51bTpudW1iZXI7XHJcbiAgICBNYXJrOmFueTtcclxuICAgIEZsb29yOk1vdW50TGluZTtcclxuICAgIElkeDpudW1iZXI7XHJcbiAgICBcclxuICAgIC8v5YWs5pyJ5o6l5Y+jXHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2NhdGlvbigpOk1Mb2NhdGlvblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24odGhpcy5JZHgtMSx0aGlzLkZsb29yLkZsb29yTnVtKTtcclxuICAgIH1cclxuICAgIGdldCBJc0RlYWRSb2FkKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Jc0RlYWRSb2FkfHwhdGhpcy5hY3RpdmV8fCB0aGlzLlN0ZXBJdGVtLklzRGlmZmljdWx0eTtcclxuICAgIH1cclxuICAgIHNldCBJc0RlYWRSb2FkKHZhbHVlOmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRm9yYmlkZW4oKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU3RlcEl0ZW0uSXNGb3JiaWRlbjtcclxuICAgIH1cclxuICAgIGdldCBJc0VtcHR5KCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAhKHRoaXMuYWN0aXZlJiZ0aGlzLkZsb29yLmFjdGl2ZSk7XHJcbiAgICB9XHJcbiAgICBQdXRJdGVtKCBpdGVtRW51bWU6SXRlbS5JdGVtVHlwZSApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaXRlbUVudW1lID09IEl0ZW0uSXRlbVR5cGUuRW1wdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9ZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlB1dEl0ZW0oaXRlbUVudW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBSZXNldFN0ZXAobmV3UHM6TGF5YS5WZWN0b3IzLGlnbm9yZUFjdGl2ZTpib29sZWFuID0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BzO1xyXG4gICAgICAgIGlmKCFpZ25vcmVBY3RpdmUpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB2YXIgbW9kZWxQcyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUHV0SXRlbShJdGVtLkl0ZW1UeXBlLk5vbmUpO1xyXG5cclxuICAgICAgICB0aGlzLkxlZnRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlJvYWROdW0gPSAwO1xyXG4gICAgfVxyXG4gICAgX1N0ZXBNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgY29uc3RydWN0b3IoZmxvb3I6TW91bnRMaW5lLGlkeDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgLy9zdXBlcihuZXcgTGF5YS5Cb3hNZXNoKDEsMSwxKSApO1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcyk7XHJcbiAgICAgICAgaWYodGhpcy5JZHggIT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDErIE1hdGgucmFuZG9tKCkqU3RlcC5zdGVwTW9kZWxOdW0pO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzBcIitJZHgpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9tb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRCggTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjUsIDAuNSwgMC41KSkgOy8vbG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2xvbmVNb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgY2xvbmVNb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChjbG9uZU1vZGVsKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtID0gSXRlbS5TdGVwSXRlbUZhY3RvcnkoSXRlbS5JdGVtVHlwZS5Ob25lLHRoaXMpOztcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlJlc2V0SXRlbSgpO1xyXG4gICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICB0aGlzLklkeCA9IGlkeDtcclxuXHJcbiAgICAgICAgdGhpcy5MZWZ0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxlZnRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodENoaWxkID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9hZE51bSA9IDA7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9Jc0RlYWRSb2FkOmJvb2xlYW47XHJcblxyXG59IiwiLyoqXHJcbiAqIOS9nOiAhTpNb1xyXG4gKiDlkK/liqjlnLrmma9cclxuICovXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBMb2FkU2NlbmUgZnJvbSBcIi4vU2NlbmUvTG9hZFNjZW5lXCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCI7XHJcbmNsYXNzIEdhbWVcclxue1xyXG5cdF9GcmFtZTpGcmFtZVdvcms7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNzID0gQVBQO1xyXG4gICAgICAgIExheWEzRC5pbml0KDAsMCx0cnVlKTtcclxuICAgICAgICBHYW1lQ29uZmlnLmluaXQoKTtcclxuICAgICAgICAvL0xheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GSVhFRF9XSURUSDtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRlVMTDtcclxuICAgICAgICBcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBMYXlhLlN0YWdlLlNDUkVFTl9WRVJUSUNBTDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IExheWEuU3RhZ2UuQUxJR05fQk9UVE9NO1xyXG4gICAgICAgIC8v5byA5ZCv57uf6K6h5L+h5oGvXHJcblx0XHRMYXlhLlN0YXQuc2hvdygpXHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHJlc0NvbCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6XCJ1aS9SZXNvdXJjZS9sb2NhbGNvbXAuYXRsYXNcIix0eXBlOkxheWEuTG9hZGVyLkFUTEFTfV07XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChyZXNDb2wsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLkluaXQoKTtcclxuICAgICAgICB2YXIgc2NlbmVNZ3I6U2NlbmVNYW5hZ2VyID0gQVBQLlNjZW5lTWFuYWdlcjtcclxuICAgICAgICBzY2VuZU1nci5DaGFuZ2VTY2VuZShuZXcgTG9hZFNjZW5lKCkpO1xyXG4gICAgICAgIEFQUC5GcmFtZVdvcmsuQWRkTWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcilcclxuICAgICAgICBMYXlhLnRpbWVyLmZyYW1lTG9vcCgzLHRoaXMsdGhpcy5VcGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSggKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5GcmFtZVdvcmsuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxudmFyIEdNID0gbmV3IEdhbWUoKTtcclxuIiwiaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vU2NlbmVcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR2FtZVNjZW5lUGxheSBmcm9tIFwiLi9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheVwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZURpcmVjdG9yIGV4dGVuZHMgU2NlbmUuQmFzZURpcmVjdG9yIHtcclxuICAgIHB1YmxpYyBnZXQgR2FtZVBsYXkoKTpHYW1lU2NlbmVQbGF5XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ3VyU3RhdGUgYXMgR2FtZVNjZW5lUGxheTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsb2FkTGlzdDJEID0gW3BhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIikscGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVwiKSxwYXRoLkdldERlcGF0aFVJSlMoXCJFbmRHYW1lXCIpXTtcclxuICAgICAgICB0aGlzLkNoYW5nZVN0YXRlKG5ldyBTY2VuZS5Mb2FkU2NlbmVMb2dpYyhsb2FkTGlzdDJELG51bGwsbmV3IEdhbWVTY2VuZVBsYXkoKSkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIEVuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCIvKlxyXG7kvZzogIU6TW9cclxu6Lez5bGx576K5Zy65pmv5qC45b+D5Yqf6IO9XHJcbiovXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW5kR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgR2FtZUNhbWVyYSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVDYW1lcmFcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLy4uL0dhbWUvUGxheWVyXCJcclxuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vLi4vR2FtZS9Nb3VudExpbmVcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbnR5cGUgSXRlbUxheW91dCA9IEl0ZW0uSXRlbUxheW91dDtcclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuLy/muLjmiI/lnLrmma9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lXHJcbntcclxuICAgIE1vZGVsTG9hZDpib29sZWFuO1xyXG4gICAgR2FtZURpcjpHYW1lRGlyZWN0b3I7XHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpHYW1lRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdhbWVEaXJlY3RvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fU2NlbmVPYmogPSBuZXcgTGF5YS5TY2VuZTNEO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEVudGVyR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VudGVyR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4uL2NvbnRyb2xlci9BUFBcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1aWRlck1hbmFnZXIgXHJcbntcclxuLy/lr7nlpJbmjqXlj6NcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6R3VpZGVyTWFuYWdlcjtcclxuICAgIHN0YXRpYyBnZXQgTWdyKCk6R3VpZGVyTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEd1aWRlck1hbmFnZXIuX01nciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR3VpZGVyTWFuYWdlci5fTWdyID0gbmV3IEd1aWRlck1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEd1aWRlck1hbmFnZXIuX01ncjtcclxuICAgIH1cclxuICAgIFNjZW5lTWdyOlNjZW5lTWFuYWdlcjtcclxuICAgIEN1clNjZW5lOkd1aWRlclNjZW5lO1xyXG4gICAgcHVibGljIGdldCBHYW1lRGlyKCk6R3VpZGVyRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTY2VuZS5HdWlkRGlyO1xyXG4gICAgfVxyXG4gICAgLy/ov5vlhaXmuLjmiI/lnLrmma/otbDov5nkuKrmjqXlj6NcclxuICAgIEVudGVyU2NlbmUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5ld0dhbWVTY2VuZSA9IG5ldyBHdWlkZXJTY2VuZSgpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ2hhbmdlU2NlbmUobmV3R2FtZVNjZW5lKTtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbmV3R2FtZVNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlclNjZW5lIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lXHJcbntcclxuICAgIEd1aWREaXI6R3VpZGVyRGlyZWN0b3I7XHJcbiAgICBDdXJEaXI6QmFzZURpcmVjdG9yO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaXJlY3RvcjpTY2VuZS5CYXNlRGlyZWN0b3IgPSBuZXcgR3VpZGVyRGlyZWN0b3IoKTtcclxuICAgICAgICByZXR1cm4gRGlyZWN0b3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlckRpcmVjdG9yIGV4dGVuZHMgU2NlbmUuQmFzZURpcmVjdG9yXHJcbntcclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoIClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZDJETGlzdCA9IFt7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIikgLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpwYXRoLkdldEF0bFBhdGgoXCJjb21wXCIpLHR5cGU6IExheWEuTG9hZGVyLkFUTEFTIH1dO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlR2FtZVBsYXkobmV3IFNjZW5lLkxvYWRTY2VuZUxvZ2ljKGxvYWQyRExpc3QsbnVsbCxuZXcgR3VpZGVyU2NlbmVQbGF5KCkpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKCk6dm9pZFxyXG4gICAge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyU2NlbmVQbGF5IGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lUGxheWVcclxue1xyXG4gICAgVUk6RW50ZXJHYW1lVUk7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH0gICAgXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8RW50ZXJHYW1lVUk+KEVudGVyR2FtZVVJKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuLy4uL3VpL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgTG9hZGluZ1VJIGZyb20gXCIuLy4uL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJXCJcclxuaW1wb3J0IEZNV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4vR3VpZGVyTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBCRyBmcm9tIFwiLi8uLi91aS9CR1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkU2NlbmUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgTG9hZERpcmN0b3IoKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5jbGFzcyBMb2FkRGlyY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsb2FkTGlzdDJEID0gW3t1cmw6XCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpcInVpL1Jlc291cmNlL2xvY2FsY29tcC5hdGxhc1wiLHR5cGU6TGF5YS5Mb2FkZXIuQVRMQVN9XTtcclxuICAgICAgICB0aGlzLkNoYW5nZUdhbWVQbGF5KCBuZXcgU2NlbmUuTG9hZFNjZW5lTG9naWMobG9hZExpc3QyRCxudWxsLG5ldyBMb2FkU2NlbmVQbGF5ZSgpKSApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+WKoOi9veWcuuaZr+mAu+i+kVxyXG5jbGFzcyBMb2FkU2NlbmVQbGF5ZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllXHJcbntcclxuICAgIHByaXZhdGUgbV9Db3VudDJETG9hZDpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fQ291bnQzRExvYWQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0xvYWRGYWlsZTpib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50VmFsdWU6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0xvYWRpbmdVSTpMb2FkaW5nVUk7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID0gMDtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU3RhcnRMb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTJEQXJyID0gW1xyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiU2V0UGFuZWxcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJDaGFyYWN0ZXJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkJHXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJjb21wXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEpzb25QYXRoKFwiQ2hhcmFjdGVySW5mb1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIkl0ZW1JbmZvXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEpzb25QYXRoKFwiTGV2ZWxJbmZvXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEpzb25QYXRoKFwiT2JzdGFjbGVJbmZvXCIpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkVSUk9SLHRoaXMsdGhpcy5vbkVycm9yKTtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLm9uQ29tcGxldGUpO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTNEQXJyID0gWyBcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDFfY2hpbGRfMDFcIikgLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV9hZHVsdF8wMVwiKSAsXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDRcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2ZseWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfc3RpbmdfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2Fic29yZF8wMVwiKSxcclxuICAgICAgICBdXHJcbiAgICAgICAgdGhpcy5Mb2FkKHJlc291cmNlMkRBcnIscmVzb3VyY2UzREFycik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMb2FkKGFycjJEOkFycmF5PGFueT4gPSBudWxsLGFycjNEOkFycmF5PGFueT49bnVsbClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZihhcnIyRCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQoYXJyMkQsbnVsbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbjJEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSAtPTAuNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXJyM0QhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jcmVhdGUoYXJyM0QsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLG51bGwpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uM0RQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudFZhbHVlIC09MC41O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uM0RQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuVmFsdWUgPSAodGhpcy5tX0NvdW50MkRMb2FkICsgdGhpcy5tX0NvdW50M0RMb2FkKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb24yRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLm1fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPXZhbHVlLzI7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5WYWx1ZSA9ICh0aGlzLm1fQ291bnQyRExvYWQgKyB0aGlzLm1fQ291bnQzRExvYWQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkVycm9yKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IHRydWU7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvYWRFcnJvcjpcIitzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNvbXBsZXRlKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aGlEaXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLlJlbG9hZChmdW5jdGlvbigpOnZvaWR7dGhpRGlyLkxvYWQoKX0gKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5CRyA9IG5ldyBCRygpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLkNvbXBsZXRlKCgpPT57R3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fTG9hZGluZ1VJID0gQVBQLlVJTWFuYWdlci5TaG93PExvYWRpbmdVST4oTG9hZGluZ1VJKTtcclxuICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMC41O1xyXG4gICAgICAgIHRoaXMubV9Db3VudFZhbHVlID0gMTtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5TdGFydExvYWQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEVuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2FkQ29tcGxldGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBGU00gfSBmcm9tIFwiLi8uLi9CYXNlL0ZTTVwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiO1xyXG5leHBvcnQgbW9kdWxlIFNjZW5lIHtcclxuICAgIGV4cG9ydCBjbGFzcyBTY2VuZUZTTSBleHRlbmRzIEZTTS5GU008QmFzZVNjZW5lPlxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WcuuaZr+S7o+eQhlxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTY2VuZSBleHRlbmRzIEZTTS5TdGF0ZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBfU3RhcnRHYW1lVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ2xvY2s6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG1fU2NlbmVPYmo6IExheWEuU2NlbmUzRDtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9EaXJlY3RvcjogQmFzZURpcmVjdG9yO1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNjZW5lT2JqKCk6IExheWEuU2NlbmUzRCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fU2NlbmVPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9EaXJlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBHZW5EaXJlY3RvcigpOiBCYXNlRGlyZWN0b3I7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXRPYmooc3ByaXRlM0Q6IExheWEuU3ByaXRlM0QpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9TY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX1NjZW5lT2JqLmFkZENoaWxkKHNwcml0ZTNEKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFzZVNjZW5lIFB1dE9iaiBFcnJvcjplbXB0eSBTcHJpdGUzRFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1fRGlyZWN0b3IgPSB0aGlzLkdlbkRpcmVjdG9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaXJlY3Rvci5TdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVuZCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuU2NlbmVPYmopIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2NlbmVPYmoucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuU2NlbmVPYmoubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0b3IgPSB0aGlzLlNjZW5lT2JqLmdldENoaWxkQXQoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0b3IucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuRGlyZWN0b3IuRW5kKCk7XHJcbiAgICAgICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fRGlyZWN0b3IpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fRGlyZWN0b3IuVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZURpcmVjdG9yIGV4dGVuZHMgRlNNLkZTTTxCYXNlU2NlbmVQbGF5ZT5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9TdGFydEdhbWVUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDbG9jazogbnVtYmVyO1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG5cclxuICAgICAgICAvL+engeacieWxnuaAp+WSjOWKn+iDvVxyXG4gICAgICAgIGdldCBHYW1lVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGltZVVwQ2xvY2sgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fVGltZVVwQ2xvY2sgLSB0aGlzLl9TdGFydEdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTGF5YS50aW1lci5jdXJyVGltZXIgLSB0aGlzLl9TdGFydEdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IEdhbWVUaW1lKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgQ3VyR2FtZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1N0YXJ0R2FtZVRpbWUgKyB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0VGltZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0VGltZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFN0YXJ0KCk6IHZvaWQgO1xyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgRW5kKCk6IHZvaWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUaW1lVXAoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL0FQUC5NZXNzYWdlQ2VudGVyLlRyaWdnZXIoR2FtZUV2ZW50LkdhbWVUaW1lVXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RpbWVVcENsb2NrIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHN1cGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQ29udGludWVUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvL0FQUC5NZXNzYWdlQ2VudGVyLlRyaWdnZXIoR2FtZUV2ZW50LkdhbWVDb250aW51ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ICs9IExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5fVGltZVVwQ2xvY2s7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIh+aNouWJp+acrFxyXG4gICAgICAgICAqIEBwYXJhbSBuZXdTY2VuZVBsYXkg5paw5Ymn5pysXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIENoYW5nZUdhbWVQbGF5KCBuZXdTY2VuZVBsYXk6QmFzZVNjZW5lUGxheWUgKTogdm9pZCAge1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVN0YXRlKG5ld1NjZW5lUGxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmVQbGF5ZSBleHRlbmRzIEZTTS5TdGF0ZSB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkU2NlbmVMb2dpYyBleHRlbmRzIEJhc2VTY2VuZVBsYXllIHtcclxuICAgICAgICBwcml2YXRlIG1fTG9hZDJETGlzdDogYW55W107XHJcbiAgICAgICAgcHJpdmF0ZSBtX0xvYWQzRExpc3Q6IGFueVtdO1xyXG4gICAgICAgIHByaXZhdGUgbV9OZXh0U2NlbmU6IFNjZW5lLkJhc2VTY2VuZVBsYXllO1xyXG4gICAgICAgIHB1YmxpYyBnZXQgT3duZXJEaXJlY3RvcigpOiBCYXNlRGlyZWN0b3Ige1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX293bmVyIGFzIEJhc2VEaXJlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGxvYWQyRExpc3QgMkTliqDovb3liJfooahcclxuICAgICAgICAgKiBAcGFyYW0gbG9hZDNETGlzdCAzROWKoOi9veWIl+ihqFxyXG4gICAgICAgICAqIEBwYXJhbSBuZXh0U2NlbmUg5LiL5LiA5qC85Zy65pmvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IobG9hZDJETGlzdDogYW55W10sIGxvYWQzRExpc3Q6IGFueVtdLCBuZXh0U2NlbmU6IFNjZW5lLkJhc2VTY2VuZVBsYXllKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkMkRMaXN0ID0gbG9hZDJETGlzdDtcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWQzRExpc3QgPSBsb2FkM0RMaXN0O1xyXG4gICAgICAgICAgICB0aGlzLm1fTmV4dFNjZW5lID0gbmV4dFNjZW5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW5kKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydCgpIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLCB0aGlzLCB0aGlzLkxvYWRDb21wbGV0ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fTG9hZDJETGlzdClcclxuICAgICAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQodGhpcy5tX0xvYWQyRExpc3QsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0xvYWQzRExpc3QpXHJcbiAgICAgICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMubV9Mb2FkM0RMaXN0LCBudWxsLCBudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTG9hZENvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLk93bmVyRGlyZWN0b3IuQ2hhbmdlU3RhdGUodGhpcy5tX05leHRTY2VuZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vLi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuLy4uL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vLi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi8uLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vLi4vLi4vR2FtZS9Nb3VudExpbmVcIlxyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQkdVSSBmcm9tIFwiLi8uLi8uLi91aS9CR1wiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEdhbWVTY2VuZSBmcm9tIFwiLi4vR2FtZVNjZW5lXCI7XHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLy4uLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcbmltcG9ydCBHYW1lQVBQIGZyb20gXCIuLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiO1xyXG5cclxudHlwZSBJdGVtTGF5b3V0ID0gSXRlbS5JdGVtTGF5b3V0O1xyXG50eXBlIExpbmVJdGVtSW5mbyA9IEl0ZW0uTGluZUl0ZW1JbmZvO1xyXG52YXIgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG5cclxuLy/muLjmiI/lr7zmvJRcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lUGxheSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllIHtcclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcml2YXRlIF9IZWFkRmxvb3JJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX1RhaWxGTG9vcklkeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQ291bnRUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Cb290b21GbG9vcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfU3RhcnRQb3NpdGlvbjogTGF5YS5WZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSBfR2FtZVVwZGF0ZTogKCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgX1BhbmVsVUk6IEdhbWVVSTtcclxuICAgIHByaXZhdGUgX0dvbGROdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0xvZ2ljR29sZE51bTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQ3VyQkc6IEJHVUk7XHJcbiAgICBwcml2YXRlIF9TYWZlTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG5cclxuICAgIENhbWVyYTogR2FtZUNhbWVyYTtcclxuICAgIEdhbWVTY2VuZTogQmFzZVNjZW5lO1xyXG4gICAgTW91bnRMaW5lczogTW91bnRMaW5lW107XHJcbiAgICBQbGF5ZXI6IFBsYXllcjtcclxuICAgIElucHV0Q3RybDogSW5wdXQuQmFzZUdhbWVJbnB1dDtcclxuICAgIEl0ZW1MYXlvdXQ6IEl0ZW1MYXlvdXQ7XHJcbiAgICBDdXJMaW5lUmV3YXJkczogQXJyYXk8TGluZUl0ZW1JbmZvPjtcclxuICAgIEN1ckxpbmVCYXJyaWVyczogQXJyYXk8TGluZUl0ZW1JbmZvPjtcclxuICAgIG5hbWU6IG51bWJlcjtcclxuICAgIEZyZXNoQkdDb3VudDogbnVtYmVyO1xyXG5cclxuICAgIGdldCBTYWZlTG9jYXRpb24oKTogR2FtZVN0cnVjdC5NTG9jYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TYWZlTG9jYXRpb247XHJcbiAgICB9XHJcbiAgICBnZXQgUGFuZWxVSSgpOiBHYW1lVUkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9QYW5lbFVJO1xyXG4gICAgfVxyXG4gICAgc2V0IFBhbmVsVUkodmFsdWU6IEdhbWVVSSkge1xyXG4gICAgICAgIHZhbHVlLlNldExlZnRUb3VjaCh0aGlzLCAoKSA9PiB7IHRoaXMuSW5wdXRDdHJsLklucHV0KGZhbHNlKTsgfSlcclxuICAgICAgICB2YWx1ZS5TZXRSaWdodFRvdWNoKHRoaXMsICgpID0+IHsgdGhpcy5JbnB1dEN0cmwuSW5wdXQodHJ1ZSk7IH0pO1xyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBIZWFkRmxvb3IoKTogTW91bnRMaW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb3VudExpbmVzW3RoaXMuX0hlYWRGbG9vcklkeF07XHJcbiAgICB9XHJcbiAgICBnZXQgVGFpbEZMb29yKCk6IE1vdW50TGluZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTW91bnRMaW5lc1t0aGlzLl9UYWlsRkxvb3JJZHhdO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBsYXllckZsb29yKCk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGZsb29yOiBudW1iZXIgPSB0aGlzLl9TdGFydFBvc2l0aW9uLnogLSB0aGlzLlBsYXllci5Mb2dpY1Bvc2l0aW9uLno7XHJcbiAgICAgICAgZmxvb3IgPSBNYXRoLnJvdW5kKGZsb29yIC8gKENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZSAvIDIpKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoZmxvb3IpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBEaXN0YW5jZSgpOiBudW1iZXIgIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLlBsYXllckZsb29yKVxyXG4gICAgfVxyXG5cclxuICAgIGdldCBQbGF5ZXJGbG9vckxpbmUoKTogTW91bnRMaW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5HZXRGbG9vckJ5Rmxvb3IodGhpcy5QbGF5ZXJGbG9vcik7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZVRpbWUoKTogbnVtYmVyICB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm1fb3duZXIgYXMgR2FtZURpcmVjdG9yKS5HYW1lVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gbnVsbDtcclxuICAgICAgICB0aGlzLkdhbWVTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Nb3VudExpbmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuSXRlbUxheW91dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9IZWFkRmxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMuX1RhaWxGTG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9Cb290b21GbG9vciA9IDA7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLl9QYW5lbFVJID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9DdXJCRyA9IEFQUC5TY2VuZU1hbmFnZXIuQkcgYXMgQkdVSTtcclxuICAgICAgICB0aGlzLkZyZXNoQkdDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkSW5wdXRDdHJsZXIodmFsdWU6IElucHV0LkJhc2VHYW1lSW5wdXQpIHtcclxuICAgICAgICB0aGlzLklucHV0Q3RybC5DbGVhcigpO1xyXG4gICAgICAgIHZhbHVlLk5leHRJbnB1dCA9IHRoaXMuSW5wdXRDdHJsO1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBQb3BJbnB1dEN0cmxlcigpIHtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IHRoaXMuSW5wdXRDdHJsLk5leHRJbnB1dDtcclxuICAgIH1cclxuICAgIEFkZEdvbGQobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtICs9IG51bTtcclxuICAgICAgICB0aGlzLkFkZExvZ2ljR29sZChudW0pO1xyXG4gICAgfVxyXG4gICAgQWRkR29sZFVuTG9naWNHb2xkKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fR29sZE51bSArPSBudW07XHJcbiAgICB9XHJcbiAgICBBZGRMb2dpY0dvbGQobnVtOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgdGhpcy5fTG9naWNHb2xkTnVtICs9IG51bTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuR29sZCA9IHRoaXMuX0xvZ2ljR29sZE51bTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9ruWuieWFqOS9jee9rlxyXG4gICAgU2V0U2FmZVBTKGxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbikge1xyXG4gICAgICAgIHRoaXMuX1NhZmVMb2NhdGlvbiA9IGxvY2F0aW9uO1xyXG4gICAgICAgIGlmIChsb2NhdGlvbi5ZIDwgdGhpcy5UYWlsRkxvb3IuRmxvb3JOdW0gfHwgbG9jYXRpb24uWSA+IHRoaXMuSGVhZEZsb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5SZXNldEl0ZW0obG9jYXRpb24uWSlcclxuICAgIH1cclxuXHJcbiAgICAvL+S7juafkOS4gOWxguW8gOWni+S4gOWxguWxgumHjeaWsOaRhuaUvumBk+WFt1xyXG4gICAgUmVzZXRJdGVtKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgbG9vcEZsb29yOiBudW1iZXIgPSBmbG9vcjsgbG9vcEZsb29yIDw9IHRoaXMuSGVhZEZsb29yLkZsb29yTnVtOyArK2xvb3BGbG9vcikge1xyXG4gICAgICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9vcEZsb29yKTtcclxuICAgICAgICAgICAgZmxvb3JMaW5lLkxheU91dERpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZsb29yTGluZS5TZXRMaW5lKGZsb29yTGluZS5GbG9vck51bSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1B1dEl0ZW1JbkxpbmUobG9vcEZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/muIXnkIblsYLpgZPlhbdcclxuICAgIENsZWFyRmxvb3Ioc3RlcDogU3RlcCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBzdGVwSXRlbSA9IHN0ZXAuU3RlcEl0ZW07XHJcbiAgICAgICAgc3RlcC5QdXRJdGVtKEl0ZW1UeXBlLk5vbmUpO1xyXG4gICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIERlYXRoKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlBsYXllckRlYXRoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLk9uR2FtZUNvbXBsZXRlKCk7XHJcbiAgICAgICAgLy91aS5TZXRHYW1lSW5mbyh0aGlzLlBsYXllckRpc3RhbmNlLHRoaXMuX0dvbGROdW0pO1xyXG4gICAgfVxyXG5cclxuICAgIEVuZCgpOiB2b2lkICB7XHJcblxyXG4gICAgfVxyXG4gICAgLy/ph43mlrDlvIDlp4tcclxuICAgIFJlU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUoKTtcclxuICAgIH1cclxuICAgIFNob3dJbnB1dEluZm8oaW5mbzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICB9XHJcbiAgICAvL+W3puWPs+enu+WKqFxyXG4gICAgTW92ZVN0ZXAoaXNSaWdodDogYm9vbGVhbikge1xyXG4gICAgICAgIC8vdmFyIGJ1ZmYgPSB0aGlzLkJ1ZmZlcjtcclxuICAgICAgICAvL+iOt+WPluS4i+S4gOWxgueahFN0ZXBcclxuICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHRoaXMuUGxheWVyLkN1clN0ZXA7XHJcbiAgICAgICAgaWYgKHN0ZXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1JpZ2h0KSB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc3RlcCA9PSBudWxsIHx8IHN0ZXAuU3RlcEl0ZW0uSXNGb3JiaWRlbikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5bGC5pWw6I635Y+W5p+Q5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIEdldEZsb29yQnlGbG9vcihmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHRhaWxGbG9vcjogTW91bnRMaW5lID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGFpbEZsb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3JJRCA9IChmbG9vciAtIHRhaWxGbG9vci5GbG9vck51bSArIHRoaXMuX1RhaWxGTG9vcklkeCkgJSB0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbZmxvb3JJRF07XHJcbiAgICB9XHJcblxyXG4gICAgTG9vcERvRmxvb3JTdGVwKGZsb29yOiBudW1iZXIsIE93bmVyOiBhbnksIGNhbGxCYWNrOiAoc3RlcDogU3RlcCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtIHx8IGZsb29yID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3JMaW5lOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZmxvb3JMaW5lLkxvZ2ljTGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcCA9IGZsb29yTGluZS5HZXRTdGVwKGlkeCk7XHJcbiAgICAgICAgICAgIGNhbGxCYWNrLmNhbGwoT3duZXIsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmui/h+WdkOagh+iOt+WPluWPsOmYtlxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOe0ouW8lSzlsYLmlbBcclxuICAgICAqL1xyXG4gICAgR2V0U3RlcEJ5TG9jYXRpb24obG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKTogU3RlcCB7XHJcbiAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb2NhdGlvbi5ZKS5HZXRTdGVwKGxvY2F0aW9uLlgpO1xyXG4gICAgICAgIHJldHVybiBnZXRTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yib5bu655u45YWz5pS+6L+ZIOi/memHjOmHjeaWsOW8gOWni+S4jeS8mui1sFxyXG4gICAgcHVibGljIFN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gbmV3IEdhbWVDYW1lcmEoKTtcclxuICAgICAgICB0aGlzLkNhbWVyYS50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyID0gbmV3IExheWEuVmVjdG9yMygtMzAsIDAsIDApO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMuQ2FtZXJhKTtcclxuXHJcbiAgICAgICAgdGhpcy5Nb3VudExpbmVzID0gW107XHJcbiAgICAgICAgdmFyIG1heExpbmVOdW0gPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5NYXhMaW5lTnVtO1xyXG4gICAgICAgIGZvciAodmFyIGxpbmVJZHg6IG51bWJlciA9IG1heExpbmVOdW0gLSAxOyBsaW5lSWR4ID49IDA7IC0tbGluZUlkeCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3TW91bnRMaW5lID0gbmV3IE1vdW50TGluZShsaW5lSWR4LCBsaW5lSWR4KTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoobmV3TW91bnRMaW5lKTtcclxuICAgICAgICAgICAgdGhpcy5Nb3VudExpbmVzW2xpbmVJZHhdID0gbmV3TW91bnRMaW5lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WIm+W7ulVJXHJcblxyXG4gICAgICAgIC8v5Yib5bu6546p5a62XHJcbiAgICAgICAgdmFyIHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB2YXIgZ2FtZUFnZW50ID0gR2FtZUFnZW50LkFnZW50O1xyXG4gICAgICAgIHZhciBwbGF5ZXJNb2RlbCA9IEdhbWVBUFAuQ2hhcmFjdGVyTWdyLkdldENoYXJhY3Rlck1vZGVsKGdhbWVBZ2VudC5DdXJDaGFyYWN0ZXJJRCxnYW1lQWdlbnQuQ3VyTGV2ZWwpO1xyXG4gICAgICAgIHBsYXllci5TZXRQbGF5ZXJNb2RlbChwbGF5ZXJNb2RlbCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5QbGF5ZXIpO1xyXG5cclxuICAgICAgICAvL+WHhuWkh+eOqeWutuatu+S6oeS6i+S7tlxyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCwgdGhpcy5EZWF0aCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/m+WFpea4uOaIj+eahOiuvue9ruaUvui/memHjCDph43mlrDlvIDlp4votbDov5nph4xcclxuICAgIHByb3RlY3RlZCBTdGFydEdhbWUoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5TY2VuZU9iai5hbWJpZW50Q29sb3IgPSBuZXcgTGF5YS5WZWN0b3IzKDEsIDEsIDEpXHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKDAsIDApO1xyXG4gICAgICAgIC8v6YeN572u54mp5ZOBXHJcbiAgICAgICAgdGhpcy5JdGVtTGF5b3V0ID0gbmV3IEl0ZW0uSXRlbUxheW91dCgpXHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHZhciBsaW5lczogTW91bnRMaW5lW10gPSB0aGlzLk1vdW50TGluZXM7XHJcbiAgICAgICAgLy/liJvlu7rovpPlhaXmjqfliLblmahcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG5ldyBJbnB1dC5Ob3JtR2FtZUlucHV0KHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9IGxpbmVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllci5SZXNldCgpO1xyXG4gICAgICAgIGZvciAodmFyIGlkeDogbnVtYmVyID0gMDsgaWR4IDwgbGluZXMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICB2YXIgbGluZTogTW91bnRMaW5lID0gdGhpcy5Nb3VudExpbmVzW2lkeF07XHJcbiAgICAgICAgICAgIGxpbmUuU2V0TGluZShpZHgpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ID4gMClcclxuICAgICAgICAgICAgICAgIGxpbmVzW2lkeCAtIDFdLlNldE5leHRGbG9vcihsaW5lKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgUGxheWVyU3RlcCA9IGxpbmUuR2V0U3RlcChNYXRoLmZsb29yKGxpbmUuTG9naWNMZW5ndGggLyAyKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5TZXRTdGVwKFBsYXllclN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gUGxheWVyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1N0YXJ0UG9zaXRpb24gPSB0aGlzLlBsYXllci5Mb2dpY1Bvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShpZHgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbWVyYS5SZXNldChuZXcgTGF5YS5WZWN0b3IzKCksIG5ldyBMYXlhLlZlY3RvcjModGhpcy5QbGF5ZXIuUG9zaXRpb24ueCwgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCAqIDEwLjUsIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGggKiA5KSwgdGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgIHRoaXMuX0dvbGROdW0gPSAwO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljR29sZE51bSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuUGFuZWxVSSA9IEFQUC5VSU1hbmFnZXIuU2hvdyhHYW1lVUkpO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5SZWdpc3RDbGlja1BsYXllckl0ZW0odGhpcyx0aGlzLlVzZVBsYXllckl0ZW0pO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5SZWdpc3RDbGlja1NraWxsSXRlbSh0aGlzLHRoaXMuVXNlU2tpbGxJdGVtKTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuR29sZCA9IDA7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gdGhpcy5HYW1lVGltZSArIDYwMDA7XHJcbiAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgPSAwO1xyXG4gICAgICAgIHRoaXMuX0dhbWVVcGRhdGUgPSB0aGlzLl9TdGFydENvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0dhbWVVcGRhdGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9HYW1lVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL+ato+W4uOi/kOihjOaXtueahOavj+W4p+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBfUnVuR2FtZVVwZGF0ZSgpIHtcclxuICAgICAgICB2YXIgZGlzdDogbnVtYmVyID0gdGhpcy5QbGF5ZXJGbG9vcjtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuRGlzdGFuY2UgPSB0aGlzLkRpc3RhbmNlOyAvL3RoaXMuRGlzdGFuY2UoKTsvL01hdGguZmxvb3IoZGlzdCk7XHJcbiAgICAgICAgaWYgKHRoaXMuRnJlc2hCR0NvdW50ID4gMTApIHtcclxuICAgICAgICAgICAgdGhpcy5fQ3VyQkcuVXBkYXRlUGFnZShkaXN0KTtcclxuICAgICAgICAgICAgdGhpcy5GcmVzaEJHQ291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICArK3RoaXMuRnJlc2hCR0NvdW50O1xyXG5cclxuICAgICAgICB2YXIgZmxvb1ZlY3RvcjogTGF5YS5WZWN0b3IzID0gdGhpcy5UYWlsRkxvb3IuUG9zaXRpb247XHJcblxyXG4gICAgICAgIGlmIChmbG9vVmVjdG9yLnogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56ID4gMyAqIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZSAvIDIpIHtcclxuICAgICAgICAgICAgdGhpcy5fUHVzaEZMb29yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9Db3VudFRpbWUgPCB0aGlzLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUgKyAzMDAwO1xyXG4gICAgICAgICAgICB0aGlzLl9EZXN0cm95TGluZSh0aGlzLl9Cb290b21GbG9vcik7XHJcbiAgICAgICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5YCS6K6h5pe25pyf6Ze055qE5q+P5bin6YC76L6RXHJcbiAgICBwcml2YXRlIF9TdGFydENvdW50KCkge1xyXG4gICAgICAgIHZhciB0aW1lOiBzdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgdmFyIGNvdW50VGltZTogbnVtYmVyID0gdGhpcy5fQ291bnRUaW1lIC0gdGhpcy5HYW1lVGltZTtcclxuICAgICAgICBpZiAoY291bnRUaW1lID4gMClcclxuICAgICAgICAgICAgdGltZSArPSBNYXRoLmZsb29yKGNvdW50VGltZSAvIDEwMDApO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLlBhbmVsVUkuR2FtZVBhbmVsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSA9IHRoaXMuX1J1bkdhbWVVcGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50VGltZSA9IHRoaXMuR2FtZVRpbWUgKyAzMDAwO1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuUmVzZXRHYW1lSXRlbSgpO1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuUmVzZXRTa2lsbEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlNldENvdW50VGltZSh0aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WwhuWxguWQkeS4iuWPoFxyXG4gICAgcHJvdGVjdGVkIF9QdXNoRkxvb3IoKSB7XHJcbiAgICAgICAgdmFyIHByZUhlYWQ6IE1vdW50TGluZSA9IHRoaXMuSGVhZEZsb29yO1xyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9ICh0aGlzLl9IZWFkRmxvb3JJZHggKyAxKSAlIHRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gKHRoaXMuX1RhaWxGTG9vcklkeCArIDEpICUgdGhpcy5Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICB2YXIgSGVhZGZsb29yOiBudW1iZXIgPSBwcmVIZWFkLkZsb29yTnVtICsgMTtcclxuICAgICAgICB0aGlzLkhlYWRGbG9vci5TZXRMaW5lKEhlYWRmbG9vcik7XHJcbiAgICAgICAgcHJlSGVhZC5TZXROZXh0Rmxvb3IodGhpcy5IZWFkRmxvb3IpO1xyXG4gICAgICAgIGNvbnNvbGUudGltZShcIlB1dEl0ZW1cIik7XHJcbiAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShIZWFkZmxvb3IpO1xyXG4gICAgICAgIGNvbnNvbGUudGltZUVuZChcIlB1dEl0ZW1cIik7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pGG5pS+54mp5ZOBXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3Ig54mp5ZOB5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBfUHV0SXRlbUluTGluZShmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHNhZmVDb2w6IHsgW2tleTogc3RyaW5nXTogQXJyYXk8bnVtYmVyPjsgfSA9IHt9O1xyXG4gICAgICAgIHZhciBmbG9vckxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgLy/luIPnva7ov4fkuobkuI3nlKjlho3luIPnva7kuoZcclxuICAgICAgICBpZiAoZmxvb3JMaW5lLkxheU91dERpcnR5KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZmxvb3JMaW5lLkxheU91dERpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGlmKGZsb29yID49IHRoaXMuX1NhZmVMb2NhdGlvbi5ZICsgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTWF4TGluZU51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNhZmVDb2wgPSB0aGlzLl9Db3VudE9wZW5MaXN0KGZsb29yKTtcclxuICAgICAgICB9ZWxzZSovXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+aRhuaUvuWJjeWFiOiuoeeul+ivpeWxgumAmui3r+aDheWGtSBcclxuICAgICAgICAgICAgc2FmZUNvbCA9IHt9XHJcbiAgICAgICAgICAgIHNhZmVDb2xbXCJvXCJdID0gdGhpcy5fQ291bnRSb2FkSW5mbyhmbG9vcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Ye655Sf54K55LiN5pS+6YGT5YW3XHJcbiAgICAgICAgaWYgKGZsb29yIDwgMSB8fCBmbG9vciA9PSB0aGlzLlNhZmVMb2NhdGlvbi5ZKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ojrflj5bor6XooYzopoHmkYbmlL7nmoTnianlk4FcclxuICAgICAgICB0aGlzLl9UYWtlSXRlbUxpc3QoZmxvb3IpXHJcblxyXG4gICAgICAgIC8v5qCH6K6w5LiA5p2h57ud5a+55a6J5YWo55qE6LevXHJcbiAgICAgICAgdmFyIHNhZmVJZHhDb2xsOiB7IFtrZXk6IHN0cmluZ106IG51bWJlcjsgfSA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGNvbEtleSBpbiBzYWZlQ29sKSB7XHJcbiAgICAgICAgICAgIHZhciBsaXN0ID0gc2FmZUNvbFtjb2xLZXldO1xyXG4gICAgICAgICAgICB2YXIgc2FmZUlkeCA9IGxpc3RbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGlzdC5sZW5ndGgpXTtcclxuICAgICAgICAgICAgaWYgKHNhZmVJZHhDb2xsW3NhZmVJZHhdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc2FmZUlkeENvbGxbc2FmZUlkeF0gPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5oqK6ZyA6KaB5pS+6YGT5YW355qE5qC85a2Q5pS+5YWl6ZqP5py65rGgXHJcbiAgICAgICAgdmFyIGN1ckZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgdmFyIHJhbmRvbVBvb2w6IEFycmF5PFN0ZXA+ID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgLy/miorlronlhajnmoTmoLzlrZDmmoLml7bnp7vlh7rmnaVcclxuICAgICAgICB2YXIgc2FmZVN0ZXBMaXN0OiBBcnJheTxTdGVwPiA9IG5ldyBBcnJheTxTdGVwPigpO1xyXG4gICAgICAgIGZvciAodmFyIHN0ZXBJZHg6IG51bWJlciA9IDA7IHN0ZXBJZHggPCBjdXJGbG9vci5Mb2dpY0xlbmd0aDsgKytzdGVwSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBnZXRTdGVwOiBTdGVwID0gY3VyRmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKHNhZmVJZHhDb2xsW3N0ZXBJZHhdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKGdldFN0ZXApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2FmZVN0ZXBMaXN0LnB1c2goZ2V0U3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mlL7pmbfpmLFcclxuICAgICAgICB2YXIgYmFycmllcnNMaXN0OiBBcnJheTxMaW5lSXRlbUluZm8+ID0gdGhpcy5DdXJMaW5lQmFycmllcnM7XHJcbiAgICAgICAgdGhpcy5fT3JnaW5pemVQdXRJdGVtKGJhcnJpZXJzTGlzdCwgcmFuZG9tUG9vbCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIC8v5pGG5pS+6YGT5YW3XHJcbiAgICAgICAgZm9yICh2YXIgc2FmZVN0ZXBJZHg6IG51bWJlciA9IDA7IHNhZmVTdGVwSWR4IDwgc2FmZVN0ZXBMaXN0Lmxlbmd0aDsgKytzYWZlU3RlcElkeCkge1xyXG4gICAgICAgICAgICByYW5kb21Qb29sLnB1c2goc2FmZVN0ZXBMaXN0W3NhZmVTdGVwSWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXdhcmRMaXN0ID0gdGhpcy5DdXJMaW5lUmV3YXJkcztcclxuICAgICAgICB0aGlzLl9Pcmdpbml6ZVB1dEl0ZW0ocmV3YXJkTGlzdCwgcmFuZG9tUG9vbCk7XHJcbiAgICAgICAgLy/lho3mrKHorqHnrpfpgJrot6/mg4XlhrUgXHJcbiAgICAgICAgLy90aGlzLl9Db3VudExhc3RGbG9vclJvYWQoZmxvb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pGG5pS+54mp5ZOBXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PExpbmVJdGVtSW5mbz59IGl0ZW1MaXN0IOeJqeWTgeWIl+ihqFxyXG4gICAgICogQHBhcmFtIHtBcnJheTxTdGVwPn0gcmFuZG9tUG9vbCDlj7DpmLbpm4blkIhcclxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNEZWFkUm9hZCDmmK/lkKbmmK/mrbvot69cclxuICAgICAqL1xyXG4gICAgX09yZ2luaXplUHV0SXRlbShpdGVtTGlzdDogQXJyYXk8TGluZUl0ZW1JbmZvPiwgcmFuZG9tUG9vbDogQXJyYXk8U3RlcD4sIGlzRGVhZFJvYWQ6IGJvb2xlYW4gPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgZm9yICh2YXIgaXRlbUlkeDogbnVtYmVyID0gMDsgaXRlbUlkeCA8IGl0ZW1MaXN0Lmxlbmd0aDsgKytpdGVtSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOiBMaW5lSXRlbUluZm8gPSBpdGVtTGlzdFtpdGVtSWR4XTtcclxuICAgICAgICAgICAgZm9yICh2YXIgZGlmZmljdWx0eU51bTogbnVtYmVyID0gMDsgZGlmZmljdWx0eU51bSA8IGluZm8uTnVtYmVyOykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJhbmRvbVBvb2wubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy/pmo/mnLrmiorpmpznoo3mlL7lhaXmoLzlrZDph4xcclxuICAgICAgICAgICAgICAgIHZhciByYW5kb21JZHg6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHJhbmRvbVBvb2wubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gcmFuZG9tUG9vbFtyYW5kb21JZHhdO1xyXG4gICAgICAgICAgICAgICAgcmFuZG9tUG9vbC5zcGxpY2UocmFuZG9tSWR4LCAxKTtcclxuICAgICAgICAgICAgICAgIHN0ZXAuUHV0SXRlbShpbmZvLlR5cGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzRGVhZFJvYWQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSBpc0RlYWRSb2FkO1xyXG4gICAgICAgICAgICAgICAgLS1pbmZvLk51bWJlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocmFuZG9tUG9vbC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbUlkeCA+IDApIHtcclxuICAgICAgICAgICAgaXRlbUxpc3Quc3BsaWNlKDAsIGl0ZW1JZHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAq6YCS5b2S6K6h566X6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3JOdW0g54mp5ZOB5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIF9Db3VudE9wZW5MaXN0KGZsb29yTnVtOiBudW1iZXIpOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PG51bWJlcj47IH0ge1xyXG4gICAgICAgIGZvciAodmFyIGZsb29yQ291bnQ6IG51bWJlciA9IHRoaXMuUGxheWVyRmxvb3I7IGZsb29yQ291bnQgPD0gZmxvb3JOdW07ICsrZmxvb3JDb3VudCkge1xyXG4gICAgICAgICAgICB2YXIgZmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yQ291bnQpO1xyXG4gICAgICAgICAgICBpZiAoZmxvb3IgPT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgZm9yICh2YXIgc3RlcElkeCA9IDA7IHN0ZXBJZHggPCBmbG9vci5Mb2dpY0xlbmd0aDsgKytzdGVwSWR4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcCA9IGZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgICAgICBzdGVwLk1hcmsgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLlBsYXllckZsb29yKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4ID0gMDsgc3RlcElkeCA8IGZsb29yLkxvZ2ljTGVuZ3RoOyArK3N0ZXBJZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoIXN0ZXAuSXNEZWFkUm9hZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTWFya1N0ZXBzKHN0ZXAsIHN0ZXBJZHgsIGZsb29yTnVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGFyZ2V0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yTnVtKTtcclxuICAgICAgICAvL+aJvuWHuuiiq+agh+iusOeahOeCueW5tuaVtOeQhuaIkOmbhuWQiFxyXG4gICAgICAgIHZhciBjb2xsZWN0aW9uOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PG51bWJlcj47IH0gPSB7fVxyXG4gICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBcIm9cIlxyXG4gICAgICAgIGZvciAodmFyIG9wZW5JZHg6IG51bWJlciA9IDA7IG9wZW5JZHggPCB0YXJnZXRGbG9vci5Mb2dpY0xlbmd0aDsgKytvcGVuSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBtYXJrZWRTdGVwOiBTdGVwID0gdGFyZ2V0Rmxvb3IuR2V0U3RlcChvcGVuSWR4KTtcclxuICAgICAgICAgICAgaWYgKG1hcmtlZFN0ZXAuTWFyayAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBOYW1lOiBzdHJpbmcgPSBuYW1lICsgbWFya2VkU3RlcC5NYXJrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbGxlY3Rpb25bTmFtZV0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVjdGlvbltOYW1lXSA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25bTmFtZV0ucHVzaChvcGVuSWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICrpgJLlvZLmoIforrDpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7U3RlcH0gc3RlcCDlj7DpmLZcclxuICAgICAqIEBwYXJhbSB7YW55fSBtYXJrIOagh+iusFxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRhcmdldEZsb29yTnVtIOebruagh+WxguaVsFxyXG4gICAgICovXHJcbiAgICBfTWFya1N0ZXBzKHN0ZXA6IFN0ZXAsIG1hcms6IGFueSwgdGFyZ2V0Rmxvb3JOdW06IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChzdGVwLklzRGVhZFJvYWQpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoc3RlcC5GbG9vci5GbG9vck51bSA+PSB0YXJnZXRGbG9vck51bSkge1xyXG4gICAgICAgICAgICBpZiAoc3RlcC5NYXJrID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc3RlcC5NYXJrID0gbWFya1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbGVmdE9wZW46IGJvb2xlYW47XHJcbiAgICAgICAgdmFyIHJpZ2h0T3BlbjogYm9vbGVhbjtcclxuICAgICAgICB2YXIgbGVmdFBhcmVudDogU3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICBpZiAobGVmdFBhcmVudCAhPSBudWxsICYmICFsZWZ0UGFyZW50LklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgaWYgKGxlZnRQYXJlbnQuTWFyayA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBsZWZ0T3BlbiA9IHRoaXMuX01hcmtTdGVwcyhsZWZ0UGFyZW50LCBtYXJrLCB0YXJnZXRGbG9vck51bSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGxlZnRPcGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJpZ2h0UGFyZW50OiBTdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICBpZiAocmlnaHRQYXJlbnQgIT0gbnVsbCAmJiAhcmlnaHRQYXJlbnQuSXNEZWFkUm9hZCkge1xyXG4gICAgICAgICAgICBpZiAocmlnaHRQYXJlbnQuTWFyayA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICByaWdodE9wZW4gPSB0aGlzLl9NYXJrU3RlcHMocmlnaHRQYXJlbnQsIG1hcmssIHRhcmdldEZsb29yTnVtKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgcmlnaHRPcGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0ZXAuTWFyayA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc3RlcC5NYXJrID0gbWFya1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWxlZnRPcGVuICYmICFyaWdodE9wZW4pIHtcclxuICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOacgOWQjuWGjeiuoeeul+S4gOasoeivpeWxgumAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yTnVtIFxyXG4gICAgICovXHJcbiAgICBfQ291bnRMYXN0Rmxvb3JSb2FkKGZsb29yTnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZmxvb3JOdW0gPCB0aGlzLlRhaWxGTG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vciA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yTnVtKTtcclxuICAgICAgICB2YXIgbGFzdEZsb29yID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3JOdW0gLSAxKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4ID0gMDsgc3RlcElkeCA8IGZsb29yLkxvZ2ljTGVuZ3RoOyArK3N0ZXBJZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoIXN0ZXAuSXNEZWFkUm9hZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIExlZnRTdGVwID0gc3RlcC5MZWZ0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgUmlnaHRTdGVwID0gc3RlcC5SaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgICAgaWYgKExlZnRTdGVwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIUxlZnRTdGVwLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytMZWZ0U3RlcC5Sb2FkTnVtO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChSaWdodFN0ZXAgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghUmlnaHRTdGVwLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgKytSaWdodFN0ZXAuUm9hZE51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgbGFzdFN0ZXBJZHggPSAwOyBsYXN0U3RlcElkeCA8IGxhc3RGbG9vci5Mb2dpY0xlbmd0aDsgKytsYXN0U3RlcElkeCkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoIXN0ZXAuSXNEZWFkUm9hZCAmJiBzdGVwLlJvYWROdW0gPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAvL+WQkeS4iumAkuW9kuaKiuaJgOacieS4juS5i+ebuOi/nueahOiKgueCueaVsOe7meS/ruato+S6hlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS+6YGT5YW35YmN566X6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIF9Db3VudFJvYWRJbmZvKGZsb29yOiBudW1iZXIpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICB2YXIgc2FmZVN0ZXBMaXN0OiBBcnJheTxudW1iZXI+ID0gW107XHJcbiAgICAgICAgdmFyIHRoaXNGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG5cclxuICAgICAgICB2YXIgcm9hZE51bTogbnVtYmVyID0gMDtcclxuICAgICAgICB2YXIgbGFzdEZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vciAtIDEpO1xyXG4gICAgICAgIGlmIChmbG9vciA9PSB0aGlzLl9TYWZlTG9jYXRpb24uWSlcclxuICAgICAgICAgICAgdGhpcy5fUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3IpO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBsb2dpY0lkeDogbnVtYmVyID0gMDsgbG9naWNJZHggPCB0aGlzRmxvb3IuTG9naWNMZW5ndGg7ICsrbG9naWNJZHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gdGhpc0Zsb29yLkdldFN0ZXAobG9naWNJZHgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRDaGlsZDogU3RlcCA9IHN0ZXAuTGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0Q2hpbGQ6IFN0ZXAgPSBzdGVwLlJpZ2h0Q2hpbGQ7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVmdENoaWxkICE9IG51bGwgJiYgIWxlZnRDaGlsZC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZVN0ZXBMaXN0LnB1c2gobG9naWNJZHgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyaWdodENoaWxkICE9IG51bGwgJiYgIXJpZ2h0Q2hpbGQuSXNEZWFkUm9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZmxvb3IgPT0gdGhpcy5fU2FmZUxvY2F0aW9uLlkpIHtcclxuICAgICAgICAgICAgdmFyIHNhZmVTdGVwID0gdGhpc0Zsb29yLkdldFN0ZXAodGhpcy5fU2FmZUxvY2F0aW9uLlgpO1xyXG4gICAgICAgICAgICBzYWZlU3RlcC5Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKHRoaXMuX1NhZmVMb2NhdGlvbi5YKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzYWZlU3RlcExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgX1Jlc2V0U3RlcEluZm8odGhpc0Zsb29yOiBNb3VudExpbmUpIHtcclxuICAgICAgICBpZiAoIXRoaXNGbG9vcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGxvZ2ljSWR4OiBudW1iZXIgPSAwOyBsb2dpY0lkeCA8IHRoaXNGbG9vci5Mb2dpY0xlbmd0aDsgKytsb2dpY0lkeCkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmn5DpgZPlhbfkv6Hmga9cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfWZsb29yIFxyXG4gICAgICovXHJcbiAgICBfVGFrZUl0ZW1MaXN0KGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgbGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICB2YXIgaXRlbUxpc3QgPSBuZXcgQXJyYXkobGluZS5Mb2dpY0xlbmd0aCk7XHJcbiAgICAgICAgdmFyIGxpbmVSZXdhcmRzID0gdGhpcy5JdGVtTGF5b3V0LlRha2VMaW5lUmV3YXJkKGZsb29yKTtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gdGhpcy5DdXJMaW5lUmV3YXJkcy5jb25jYXQobGluZVJld2FyZHMpO1xyXG4gICAgICAgIGlmICh0aGlzLlNhZmVMb2NhdGlvbi5ZID4gZmxvb3IgfHwgZmxvb3IgPiB0aGlzLlNhZmVMb2NhdGlvbi5ZICsgMSkge1xyXG4gICAgICAgICAgICB2YXIgbGluZUJhcnJpZXJzID0gdGhpcy5JdGVtTGF5b3V0LlRha2VMaW5lRGlmZmljdWx0eShmbG9vcik7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gdGhpcy5DdXJMaW5lQmFycmllcnMuY29uY2F0KGxpbmVCYXJyaWVycyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ3VyTGluZUJhcnJpZXJzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDloYzpmbfmn5DkuIDlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfWZsb29yIFxyXG4gICAgICovXHJcbiAgICBfRGVzdHJveUxpbmUoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciB0YWlsRmxvb3IgPSB0aGlzLlRhaWxGTG9vcjtcclxuICAgICAgICBpZiAoZmxvb3IgPCB0YWlsRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBjb3VudEZsb29yOiBudW1iZXIgPSB0YWlsRmxvb3IuRmxvb3JOdW07IGNvdW50Rmxvb3IgPD0gZmxvb3I7ICsrY291bnRGbG9vcikge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGNvdW50Rmxvb3IpO1xyXG4gICAgICAgICAgICB0YXJnZXRGbG9vci5CcmVhaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBsYXllci5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVc2VTa2lsbEl0ZW0oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5Vc2VDaGFyYWN0ZXJTa2lsbEl0ZW0oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXNlUGxheWVySXRlbSgpXHJcbiAgICB7XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LlVzZUdhbWVJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbkdhbWVDb21wbGV0ZSgpICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoLCB0aGlzLkRlYXRoLCB0aGlzKTtcclxuICAgICAgICB2YXIgdWk6IEVuZEdhbWVVSSA9IEFQUC5VSU1hbmFnZXIuU2hvdzxFbmRHYW1lVUk+KEVuZEdhbWVVSSk7XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LkFkZEdvbGQodGhpcy5fR29sZE51bSk7XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LkFkZFNjb3JlKHRoaXMuX0dvbGROdW0gKiAxMCArIHRoaXMuRGlzdGFuY2UgKiAxMCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIHBhdGgge1xyXG4gICAgZXhwb3J0IHZhciBJc0VkaXRvcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZXhwb3J0IHZhciB2ZXJzaW9uOiBzdHJpbmcgPSBcIj92PTJcIjtcclxuICAgIGV4cG9ydCB2YXIgU2NlbmVBc3NldFBhdGg6IHN0cmluZyA9IFwiTGF5YVNjZW5lX1wiO1xyXG4gICAgZXhwb3J0IHZhciBSZXNvdXJjZVBhdGg6IHN0cmluZyA9IElzRWRpdG9yID8gXCIuLi9OZXRSZXNvdXJjZV8zXzI5L1wiIDogXCJodHRwczovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9OZXRSZXNvdXJjZV8zXzI5L1wiO1xyXG4gICAgZXhwb3J0IHZhciBVSVBhdGg6IHN0cmluZyA9IFJlc291cmNlUGF0aCArIFwiVUkvXCI7XHJcbiAgICBleHBvcnQgdmFyIE1vZGVsUGF0aDogc3RyaW5nID0gUmVzb3VyY2VQYXRoICsgXCIzRC9cIlxyXG4gICAgZXhwb3J0IHZhciBDb25maWdQYXRoOiBzdHJpbmcgPSBSZXNvdXJjZVBhdGggKyBcIkNvbmZpZy9cIlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WQXRs5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRBdGxQYXRoKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBVSVBhdGggKyBmaWxlTmFtZSArIFwiLmF0bGFzXCIgKyB2ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WVUlKc29u6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXREZXBhdGhVSUpTKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBVSVBhdGggKyBmaWxlTmFtZSArIFwiLmpzb25cIiArIHZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZsaOaWh+S7tui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0TEgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIE1vZGVsUGF0aCArIFNjZW5lQXNzZXRQYXRoICsgZmlsZU5hbWUgKyBcIi9Db252ZW50aW9uYWwvXCIgKyBmaWxlTmFtZSArIFwiLmxoXCIgKyB2ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Yqg6L29SnNvbui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0SnNvblBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIENvbmZpZ1BhdGggKyBmaWxlTmFtZSArIFwiLmpzb25cIiArIHZlcnNpb247XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIFVJRnVuYyB7XHJcbiAgICAvL+iuoeeul+e8qeaUvuWAvFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvdW50U2NhbGVGaXgod2lkdGg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCF3aWR0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFnZVdpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB2YXIgc2NhbGU6IG51bWJlciA9IHN0YWdlV2lkdGggLyB3aWR0aDtcclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gRml4VUkodmlldzogTGF5YS5TcHJpdGUsIHdpZHRoOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBVSUZ1bmMuQ291bnRTY2FsZUZpeCh3aWR0aCA/IHdpZHRoIDogdmlldy53aWR0aCk7XHJcbiAgICAgICAgdmlldy5zY2FsZVggPSBzY2FsZTtcclxuICAgICAgICB2aWV3LnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgIHZpZXcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQgLyBzY2FsZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWdyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBUaW1lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVGltZU1hbmFnZXJcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQUCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX1NjZW5lTWdyOiBTY2VuZU1ncjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfVGltZU1ncjogVGltZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX1VJTWFuYWdlcjogVUlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfRnJhbWVXb3JrOkZyYW1lV29yaztcclxuICAgIHN0YXRpYyBnZXQgRnJhbWVXb3JrKCk6RnJhbWVXb3JrXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ19GcmFtZVdvcms7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IE1lc3NhZ2VNYW5hZ2VyKCk6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyICB7XHJcbiAgICAgICAgcmV0dXJuIEFQUC5nX01lc3NhZ2U7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IFVJTWFuYWdlcigpOiBVSU1hbmFnZXIgIHtcclxuICAgICAgICBpZiAoQVBQLmdfVUlNYW5hZ2VyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIEFQUC5nX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLmdfVUlNYW5hZ2VyO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBTY2VuZU1hbmFnZXIoKTogU2NlbmVNZ3IgIHtcclxuICAgICAgICBpZiAoQVBQLmdfU2NlbmVNZ3IgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgQVBQLmdfU2NlbmVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFNjZW5lTWdyPihTY2VuZU1ncik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuZ19TY2VuZU1ncjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgVGltZU1hbmFnZXIoKTogVGltZU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZiAoQVBQLmdfVGltZU1nciA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBBUFAuZ19UaW1lTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxUaW1lTWFuYWdlcj4oVGltZU1hbmFnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLmdfVGltZU1ncjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLmdfRnJhbWVXb3JrID0gRnJhbWVXb3JrLkZNO1xyXG4gICAgICAgIHZhciBmbTpGcmFtZVdvcmsgID0gQVBQLmdfRnJhbWVXb3JrO1xyXG4gICAgICAgIEFQUC5nX01lc3NhZ2UgPSBmbS5BZGRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgQVBQLmdfU2NlbmVNZ3IgPSAgZm0uQWRkTWFuYWdlcjxTY2VuZU1ncj4oU2NlbmVNZ3IpO1xyXG4gICAgICAgIEFQUC5nX1RpbWVNZ3IgPSBmbS5BZGRNYW5hZ2VyPFRpbWVNYW5hZ2VyPihUaW1lTWFuYWdlcik7XHJcbiAgICAgICAgQVBQLmdfVUlNYW5hZ2VyID0gZm0uQWRkTWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCBDaGFyYWN0ZXJNYW5hZ2VyIGZyb20gXCIuLy4uL0dhbWVNYW5hZ2VyL0NoYXJhY3Rlck1hbWFnZXJcIlxyXG5pbXBvcnQgSXRlbU1hbmFnZXIgZnJvbSBcIi4vLi4vR2FtZU1hbmFnZXIvSXRlbU1hbmFnZXJcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQVBQXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IENoYXJhY3Rlck1ncigpOkNoYXJhY3Rlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gQ2hhcmFjdGVyTWFuYWdlci5NZ3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJdGVtTWdyKCk6SXRlbU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSXRlbU1hbmFnZXIuTWdyO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3REZWxlZ2F0ZSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IFNldFBhbmVsVUkgZnJvbSBcIi4vLi4vdWkvU2V0UGFuZWxVSVwiXHJcbmltcG9ydCBDaGFyYWN0ZXJVSSBmcm9tIFwiLi8uLi91aS9DaGFyYWN0ZXJVSVwiXHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZVNjZW5lXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuL0FQUFwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuXHJcbnR5cGUgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sZXJcclxue1xyXG4gICAgc3RhdGljIGdldCBHYW1lQ29udHJvbGVyKCk6R2FtZUNvbnRyb2xlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgR2FtZUNvbnRyb2xlci5NZ3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDb250cm9sZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjogR2FtZUNvbnRyb2xlcjtcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBNZ3IoKTogR2FtZUNvbnRyb2xlciB7XHJcbiAgICAgICAgaWYgKEdhbWVDb250cm9sZXIuX01nciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIEdhbWVDb250cm9sZXIuX01nciA9IG5ldyBHYW1lQ29udHJvbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lQ29udHJvbGVyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBfTGluZVN0ZXBOdW06bnVtYmVyO1xyXG4gICAgX01heExpbmVOdW06bnVtYmVyO1xyXG4gICAgX1N0ZXBMZW5ndGg6bnVtYmVyO1xyXG4gICAgX1N0ZXBEaXN0YW5jZTpudW1iZXI7XHJcbiAgICBfUGxheWVyTW92ZVRpbWU6bnVtYmVyO1xyXG4gICAgLy/luLjph4/lrprkuYlcclxuICAgIC8v5q+P6KGM5pyA5aSn5qC85a2Q5pWwXHJcbiAgICBnZXQgTGluZVN0ZXBOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX0xpbmVTdGVwTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTGluZVN0ZXBOdW0gPSA1KzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9MaW5lU3RlcE51bTtcclxuICAgIH0gXHJcbiAgICAvL+acgOWkp+ihjOaVsFxyXG4gICAgZ2V0IE1heExpbmVOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX01heExpbmVOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9NYXhMaW5lTnVtID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9NYXhMaW5lTnVtO1xyXG4gICAgfSBcclxuICAgIC8v5qC85a2Q6L656ZW/XHJcbiAgICBnZXQgU3RlcExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9TdGVwTGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RlcExlbmd0aCA9IDAuOTg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGVwTGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgLy/moLzlrZDmlpzlr7nop5Lplb/luqZcclxuICAgIGdldCBTdGVwRGlzdGFuY2UoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcERpc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RlcERpc3RhbmNlID0gTWF0aC5zcXJ0KCh0aGlzLlN0ZXBMZW5ndGggKiB0aGlzLlN0ZXBMZW5ndGgpICogMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGVwRGlzdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+eOqeWutuenu+WKqOaXtumXtFxyXG4gICAgZ2V0IFBsYXllck1vdmVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1BsYXllck1vdmVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fUGxheWVyTW92ZVRpbWUgPSAwLjAyICogMTAwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9QbGF5ZXJNb3ZlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRQbGF5ZXJJRChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGd1ZXN0QWdlbnQ6UGxheWVyR3Vlc3RBZ2VudCA9IFBsYXllckd1ZXN0RGVsZWdhdGUuR3Vlc3RBZ2VudDtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDpBcnJheTxudW1iZXI+ID0gZ3Vlc3RBZ2VudC5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIGlmKCFjaGFyYWN0ZXJMaXN0W2lkXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFndWVzdEFnZW50LkJ1eUNoYXJhY3RlcihpZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBndWVzdEFnZW50LlNldENoYXJhY3RlcihpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrorr7nva7pnaLmnb9cclxuICAgIFNob3dTZXRQYW5lbCgpIHtcclxuICAgICAgICB2YXIgUGFuZWwgPSBBUFAuVUlNYW5hZ2VyLlNob3c8U2V0UGFuZWxVST4oU2V0UGFuZWxVSSk7Ly8gbmV3IFNldFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrop5LoibLpnaLmnb9cclxuICAgIHB1YmxpYyBTaG93Q2hhcmFjdGVyUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IEFQUC5VSU1hbmFnZXIuU2hvdzxDaGFyYWN0ZXJVST4oQ2hhcmFjdGVyVUkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1NldEluZm87XHJcbiAgICBnZXQgU2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIGlmICh0aGlzLl9TZXRJbmZvID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFNldEluZm8odmFsdWU6IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuX1NldEluZm8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/neWtmOiuvue9ruaVsOaNrlxyXG4gICAgU2F2ZVNldEluZm8oaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5TZXRJbmZvID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvL+ivu+WPluiuvue9ruS/oeaBr1xyXG4gICAgR2V0U2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJHYW1lVUkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBFbnRlckdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZURpcigpOiBHYW1lRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkRpcmVjdG9yIGFzIEdhbWVEaXJlY3RvcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR2FtZVNjZW5lKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DaGFuZ2VTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQQlVGRuihqOeOsOaViOaenFxyXG4gICAgR2VuQnVmZkVmZmVjdCh0eXBlOiBJdGVtVHlwZSk6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEJ1eUl0ZW0oaWQ6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkJ1eUl0ZW0oaWQpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUVsZW1lbnQgZXh0ZW5kcyBMYXlhLkJveCB7XHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1JZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0J0bjogTGF5YS5CdXR0b247XHJcbiAgICBwcml2YXRlIF9JbWc6IExheWEuSW1hZ2U7XHJcbiAgICBwcml2YXRlIG1fTnVtTGFiZWw6IExheWEuTGFiZWw7XHJcbiAgICBwcml2YXRlIG1fTGFiZWxTdHJpbmc6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBtX0J1eUl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIHByaXZhdGUgbV9DaG9vc2VJdGVtOiBNZXNzYWdlTUQuRGVsZWdhdGU7XHJcblxyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J0biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgSXRlbUlkeChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1JZHggPSBpZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBJbWcoKTogTGF5YS5JbWFnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0ltZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQnV5QnRuKCk6IExheWEuQnV0dG9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBCdG5MYWJsZShzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFzdHIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9CdG4udGV4dC50ZXh0ID0gc3RyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBJc0dyYXkodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLkltZy5ncmF5ID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IElzR3JheSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5JbWcuZ3JheTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgTnVtKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0xhYmVsU3RyaW5nWzFdID0gXCJcIiArIG51bTtcclxuICAgICAgICB0aGlzLm1fTnVtTGFiZWwudGV4dCA9IHRoaXMubV9MYWJlbFN0cmluZ1swXSArIHRoaXMubV9MYWJlbFN0cmluZ1sxXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgUHJpY2UobnVtOiBudW1iZXIpICB7XHJcbiAgICAgICAgdGhpcy5fQnRuLnRleHQudGV4dCA9IFwiXCIgKyBudW07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5fSW1nID0gdGhpcy5nZXRDaGlsZEF0KDApIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgIHRoaXMubV9OdW1MYWJlbCA9IHRoaXMuZ2V0Q2hpbGRBdCgyKSBhcyBMYXlhLkxhYmVsO1xyXG4gICAgICAgIHRoaXMuX0J0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkJ1eUl0ZW0pO1xyXG4gICAgICAgIHRoaXMuX0ltZy5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkNob29zZUltZyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1fTGFiZWxTdHJpbmcpICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9MYWJlbFN0cmluZyA9IHRoaXMubV9OdW1MYWJlbC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENob29zZUltZygpIHtcclxuICAgICAgICBpZiAodGhpcy5tX0Nob29zZUl0ZW0pXHJcbiAgICAgICAgICAgIHRoaXMubV9DaG9vc2VJdGVtLkV4ZWN1dGUodGhpcy5tX0l0ZW1JZHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlJdGVtKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQnV5SXRlbSlcclxuICAgICAgICAgICAgdGhpcy5tX0J1eUl0ZW0uRXhlY3V0ZSh0aGlzLm1fSXRlbUlkeCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdEJ1eShvd25lcjogYW55LCBsaXN0ZW5lcjogKGlkOiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICB2YXIgbmV3RGVsZWdhdGUgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5tX0J1eUl0ZW0gPSBuZXdEZWxlZ2F0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0Q2hvb3NlKG93bmVyOiBhbnksIGxpc3RlbmVyOiAoaWQ6IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciBuZXdEZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fQ2hvb3NlSXRlbSA9IG5ld0RlbGVnYXRlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZUVsZW1lbnQgZXh0ZW5kcyBMYXlhLkltYWdlIHtcclxuICAgIC8vXHJcbiAgICBwcml2YXRlIF9CdG46IExheWEuQnV0dG9uO1xyXG4gICAgcHJpdmF0ZSBfSW1nOiBMYXlhLkltYWdlO1xyXG4gICAgcHJpdmF0ZSBtX09uQ2xpY2tJbWc6KGlkOm51bWJlcik9PnZvaWQ7XHJcbiAgICBwcml2YXRlIG1fQ2hhcmFjdGVySUQ6bnVtYmVyO1xyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J0biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICAgICAgdGhpcy5fQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRQbGF5ZXJJRCh0aGlzLm1fQ2hhcmFjdGVySUQpO1xyXG4gICAgICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuXHJcbiAgICBSZXNldCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX0ltZykge1xyXG4gICAgICAgICAgICB0aGlzLkluaXQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0R3JheShpc0dyYXk6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9JbWcuZ3JheSA9IGlzR3JheTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0T25JbWdDbGljayhldmVudEZ1bmN0aW9uOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBpZD10aGlzLm1fQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdGhpcy5fSW1nLm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCxldmVudEZ1bmN0aW9uKTsvLyBvd25lciwgKCk9PnsgZXZlbnRGdW5jdGlvbihpZCkgfSApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBDaGFyYWN0ZXJJRChpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3RlcklEID0gaWQ7XHJcbiAgICB9XHJcbiAgICBJbml0KCkgIHtcclxuICAgICAgICB0aGlzLl9JbWcgPSB0aGlzLmdldENoaWxkQXQoMCkgYXMgTGF5YS5JbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnR7QmFzZUZ1bmN9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQkdVSSBleHRlbmRzIHVpLkJHVUkge1xyXG4gICAgXHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkJHXCIpKSk7XHJcbiAgICB9XHJcbiAgICAvL3ByaXZhdGUgX1NreUFycjpBcnJheTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9Ta3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1RlbXBTa3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1NjYWxlU2t5Om51bWJlcjtcclxuICAgIHByaXZhdGUgX1NjYWxlRWFydGg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfRWFydGhTdGFydFBTOm51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB3aWRoID0gTGF5YS5zdGFnZS53aWR0aCA7XHJcbiAgICAgICAgdmFyIHJhdGUgPSBNYXRoLmNlaWwoTGF5YS5zdGFnZS5oZWlnaHQvd2lkaCk7XHJcblxyXG4gICAgICAgIHRoaXMuX1NreVF1ZSA9IG5ldyBCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+KCk7XHJcbiAgICAgICAgdGhpcy5fVGVtcFNreVF1ZSA9IG5ldyBCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+KCk7XHJcbiAgICAgICAgIC8vbmV3IEFycmF5PExheWEuSW1hZ2U+KHJhdGUrMSk7XHJcbiAgICAgICAgZm9yKGxldCBzdGFydElkeCA9IDA7c3RhcnRJZHg8cmF0ZSsxOyArK3N0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZTpMYXlhLkltYWdlID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1hZ2UubG9hZEltYWdlKFwiY29tcC9pbWdfYmFja2dyb3VuZF9zcHJfc2t5LnBuZ1wiKTtcclxuICAgICAgICAgICAgaW1hZ2Uud2lkdGggPSB3aWRoO1xyXG4gICAgICAgICAgICBpbWFnZS5oZWlnaHQgPSB3aWRoK3dpZGgqMC4wMTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChpbWFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1NreVF1ZS5QdXNoKGltYWdlKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIHRoaXMuU2V0U2t5KDApO1xyXG4gICAgICAgIHZhciBlYXJ0aCA9IG5ldyBMYXlhLkltYWdlKCk7XHJcbiAgICAgICAgZWFydGgueSA9IExheWEuc3RhZ2UuaGVpZ2h0IC0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9FYXJ0aFN0YXJ0UFMgPSBlYXJ0aC55O1xyXG4gICAgICAgIGVhcnRoLmxvYWRJbWFnZShcImNvbXAvaW1nX2JhY2tncm91bmRfc3ByLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLl9FYXJ0aCA9IGVhcnRoO1xyXG4gICAgICAgIGVhcnRoLndpZHRoID0gd2lkaDtcclxuICAgICAgICBlYXJ0aC5oZWlnaHQgPSB3aWRoO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoZWFydGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1NjYWxlU2t5ID0gMC4wMDFcclxuICAgICAgICB0aGlzLl9TY2FsZUVhcnRoID0gMC4wMVxyXG4gICAgICAgIC8vdGhpcy5fRWFydGhTdGFydFBTID0gdGhpcy5fRWFydGgueTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBJbml0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICBmb3IobGV0IHN0YXJ0SWR4Om51bWJlciA9IDA7c3RhcnRJZHg8dGhpcy5fU2t5UXVlLkNvdW50Oysrc3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU2t5QXJyW3N0YXJ0SWR4XS55ID0gc3RhcnRJZHggKiBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0VhcnRoLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fRWFydGhTdGFydFBTID0gdGhpcy5fRWFydGgueTtcclxuICAgIH0qL1xyXG4gICAgLy/pq5jluqbovazlsY/luZXpq5jluqblg4/ntKBcclxuICAgIEhlaWdodFRyYW5zUGl4KCBoZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBoZWlnaHQqLTAuMTtcclxuICAgIH1cclxuICAgIFNldFNreShwaXhIZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1Ta3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPiA9IHRoaXMuX1RlbXBTa3lRdWU7XHJcbiAgICAgICAgdGVtU2t5UXVlLkNsZWFyKCk7XHJcbiAgICAgICAgdmFyIGNvdW50Om51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgd2hpbGUodGhpcy5fU2t5UXVlLkNvdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpCYXNlRnVuYy5Ob2RlPExheWEuU3ByaXRlPiA9IHRoaXMuX1NreVF1ZS5Qb3BOb2RlKCk7XHJcbiAgICAgICAgICAgIHZhciBza3lJbWc6TGF5YS5TcHJpdGUgPSBub2RlLlZhbHVlO1xyXG4gICAgICAgICAgICBza3lJbWcueSA9IGNvdW50ICogaGVpZ2h0ICsgcGl4SGVpZ2h0IC0gaGVpZ2h0IC0gaGVpZ2h0KjAuMDE7XHJcbiAgICAgICAgICAgIHRlbVNreVF1ZS5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICAgICAgaWYoc2t5SW1nLnk+TGF5YS5zdGFnZS5oZWlnaHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNreUltZy55ID0gdGVtU2t5UXVlLkhlYWRWYWx1ZS55IC0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICsrY291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1RlbXBTa3lRdWUgPSB0aGlzLl9Ta3lRdWU7XHJcbiAgICAgICAgdGhpcy5fU2t5UXVlID0gdGVtU2t5UXVlO1xyXG4gICAgfVxyXG4gICAgU2V0RWFydGgoaGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9FYXJ0aC55ID0gdGhpcy5fRWFydGhTdGFydFBTICsgaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgVXBkYXRlUGFnZSggaGVpZ2h0Om51bWJlciApXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICAvL2hlaWdodCA9IHRoaXMuSGVpZ2h0VHJhbnNQaXgoaGVpZ2h0KTtcclxuICAgICAgICAvL3ZhciBza3lIZWlnaHRQaXggPSBoZWlnaHQqdGhpcy5fU2NhbGVTa3k7XHJcbiAgICAgICAgdGhpcy5TZXRTa3koaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLlNldEVhcnRoKGhlaWdodCk7XHJcbiAgICAgICAgLy92YXIgZWFydGhIZWlnaHRQaXggPSBoZWlnaHQ7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7VUlGdW5jfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1VJRnVuY1wiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcblxyXG4vL1VJ5Z+657G7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VVSSBleHRlbmRzIExheWEuQm94XHJcbntcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL1xyXG4gICAgcHJvdGVjdGVkIF9VSVR5cGU6QmFzZUVudW0uVUlUeXBlRW51bTtcclxuICAgIHByb3RlY3RlZCBfSXNNdXRleDpib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9OYW1lOnN0cmluZzsgICAgXHJcbiAgICBwcm90ZWN0ZWQgX1VJTWFuYWdlcjpVSU1hbmFnZXJcclxuICAgIHByaXZhdGUgX0RpcnR5OmJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9TaG93aW5nOmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTG93O1xyXG4gICAgICAgIHRoaXMuX0lzTXV0ZXggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9OYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLl9TaG93aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxlZnQgPSAwO1xyXG5cdCAgICB0aGlzLnJpZ2h0ID0gMDtcclxuXHRcdHRoaXMuYm90dG9tID0gMDtcclxuXHRcdHRoaXMudG9wID0gMDtcclxuICAgIH1cclxuICAgIEhpZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuT1AoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5PcGVuKCk7XHJcbiAgICB9XHJcbiAgICBDbG9zZU9QKClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBEZXN0cm95KCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFVJVHlwZSgpOkJhc2VFbnVtLlVJVHlwZUVudW1cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUlUeXBlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgSXNNdXRleCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNNdXRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTaG93aW5nKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TaG93aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+5VUnov5vooYzpgILphY1cclxuICAgICAqIEBwYXJhbSBVSSDpgILphY1VSVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRml4VUkoVUk6TGF5YS5WaWV3KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoVUkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldERpcnR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBEaXJ0eSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fRGlydHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENsZWFyRGlydHkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBVSVVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9EaXJ0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xlYXJEaXJ0eSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IFVwZGF0ZSgpOnZvaWQ7XHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEZXIGZyb20gXCIuLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi8uLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVBUFBcIjtcclxuXHJcbmNsYXNzIEV4dGVuZENoYXJhY3RlcnNVSSBleHRlbmRzIHVpLkNoYXJhY3RlclVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBCYXNlVUkge1xyXG5cclxuICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJMaXN0OiBBcnJheTxhbnk+O1xyXG4gICAgcHJpdmF0ZSBtX0dvbGREaXNjcmliZTogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIF9SZW5kZXJIYW5kbGVyKGNlbGw6IExheWEuQm94LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHJvbGVFbGVtZW50OiBSb2xlRWxlbWVudCA9IGNlbGwgYXMgUm9sZUVsZW1lbnQ7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVzZXQoKTtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDogQXJyYXk8bnVtYmVyPiA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LmdyYXkgPSBjaGFyYWN0ZXJMaXN0W2luZGV4XSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgICAgICByb2xlRWxlbWVudC5DaGFyYWN0ZXJJRCA9IGluZGV4O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlZ2lzdE9uSW1nQ2xpY2soKCkgPT4geyB0aGlzLk9uQ2xpY2tJbWcoaW5kZXgpIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfVUk6IEV4dGVuZENoYXJhY3RlcnNVSTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZENoYXJhY3RlcnNVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuR2V0Q2hhcmFjdGVyTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuU2V0TGlzdCgpO1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5tX0dvbGREaXNjcmliZSA9IHRoaXMuX1VJLl9Hb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuT25Nb25leUNoYW5nZSgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJDaGFyYWN0ZXJVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIEdldENoYXJhY3Rlckxpc3QoKSAge1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJMaXN0ID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3IuR2V0SURMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0TGlzdCgpIHtcclxuICAgICAgICB2YXIgbGlzdEFycmF5OiBBcnJheTxhbnk+ID0gdGhpcy5tX0NoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnJlbmRlckhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsIHRoaXMuX1JlbmRlckhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LmFycmF5ID0gbGlzdEFycmF5O1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0Rpc3RhbmNlID0gNTBcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgT3BlbigpICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJDaGFyYWN0ZXJJRENoYW5nZSwgdGhpcy5Pbk5lZWRDbG9zZVVJLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLCB0aGlzLk9uTW9uZXlDaGFuZ2UsIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSwgdGhpcy5PbkNoYW5nZUxpc3QsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKCkgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckNoYXJhY3RlcklEQ2hhbmdlLCB0aGlzLk9uTmVlZENsb3NlVUksIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsIHRoaXMuT25Nb25leUNoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DaGFyYWN0ZXJMaXN0Q2hhbmdlLCB0aGlzLk9uQ2hhbmdlTGlzdCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuovku7ZcclxuICAgIHByaXZhdGUgT25DbGlja0ltZyhpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGlkID09IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5DaGFyYWN0ZXJJRCkgIHtcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0UGxheWVySUQoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25OZWVkQ2xvc2VVSSgpOiB2b2lkICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2hhbmdlTGlzdCgpICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QucmVmcmVzaCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbk1vbmV5Q2hhbmdlKCkgIHtcclxuICAgICAgICBpZiAoIXRoaXMuU2hvd2luZykgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fR29sZERpc2NyaWJlWzFdID0gXCJcIiArIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leTtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC50ZXh0ID0gdGhpcy5tX0dvbGREaXNjcmliZVswXSArIHRoaXMubV9Hb2xkRGlzY3JpYmVbMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtHYW1lU3RydWN0IH0gIGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kRW5kR2FtZVVJIGV4dGVuZHMgdWkuRW5kR2FtZVVJIHtcclxuICAgIFBhbmVsOkxheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVuZEdhbWVcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbCA9IHRoaXMuUGFuZWw7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMuUGFuZWwuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX01lbnVlQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssR3VpZGVyTWFuYWdlci5NZ3IsR3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5fU2V0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssQ29udHJvbGVyLkdhbWVDb250cm9sZXIsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TdGFydEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZEdhbWVVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkVuZEdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgVUk6RXh0ZW5kRW5kR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5VST0gbmV3IEV4dGVuZEVuZEdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5VSSk7XHJcbiAgICAgICAgLy90aGlzLlVJLl9DaGFyYWN0ZXJMaXN0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyB0aGlzLl9VSU1hbmFnZXIuU2hvdzxQbGF5ZXJMaXN0VUk+KFBsYXllckxpc3RVSSl9KTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBGTSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFBsYXllckxpc3RVSSBmcm9tIFwiLi8uLi91aS9QbGF5ZXJMaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcblxyXG5jbGFzcyBFeHRlbmRFbnRlckdhbWVVSSBleHRlbmRzIHVpLkVudGVyVUkge1xyXG4gICAgUGFuZWw6IExheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuUGFuZWwgPSB0aGlzLl9QYW5lbDtcclxuICAgICAgICB0aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXIub24oTGF5YS5FdmVudC5DTElDSywgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd0NoYXJhY3RlclBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TZXRQYW5lbC5vbihMYXlhLkV2ZW50LkNMSUNLLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TaG93U2V0UGFuZWwpO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlciwgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGVyR2FtZVVJIGV4dGVuZHMgQmFzZVVJIHtcclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiRW50ZXJHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIF9VSTogRXh0ZW5kRW50ZXJHYW1lVUk7XHJcbiAgICBwcml2YXRlIG1fQnRuR3JvdXA6IEFycmF5PExheWEuSW1hZ2U+O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kRW50ZXJHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB2YXIgdWlNZ3I6IFVJTWFuYWdlciA9IHRoaXMuX1VJTWFuYWdlcjtcclxuICAgICAgICB0aGlzLm1fQnRuR3JvdXAgPSBbXTtcclxuICAgICAgICAvL3RoaXMuX1VJLl9DaGFyYWN0ZXJMaXN0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyB1aU1nci5TaG93PFBsYXllckxpc3RVST4oUGxheWVyTGlzdFVJKX0pO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SYW5rLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEluaXRCdG5Hcm91cCgpIHtcclxuICAgICAgICB2YXIgQ3VyTWF4TGV2ZWwgPSBHYW1lQWdlbnQuQWdlbnQuQ3VyTWF4TGV2ZWw7XHJcbiAgICAgICAgdmFyIGN1ckxldmVsID0gR2FtZUFnZW50LkFnZW50LkN1ckxldmVsO1xyXG4gICAgICAgIHZhciBidG5OdW0gPSB0aGlzLl9VSS5fR3JvdXAubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgdmFyIGdyb3VwID0gdGhpcy5tX0J0bkdyb3VwO1xyXG4gICAgICAgIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGJ0bk51bTsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIGJ0bjogYW55ID0gdGhpcy5fVUkuX0dyb3VwLmdldENoaWxkQXQoaWR4KSBhcyBMYXlhLkltYWdlO1xyXG4gICAgICAgICAgICBidG4uaWR4ID0gaWR4O1xyXG4gICAgICAgICAgICBidG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5PbkNob29zZSlcclxuICAgICAgICAgICAgYnRuLmdyYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICBncm91cC5wdXNoKGJ0bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdyb3VwW2N1ckxldmVsXS5ncmF5ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5Jbml0QnRuR3JvdXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8v5LqL5Lu2XHJcbiAgICBPbkNob29zZShpbmZvOiBFdmVudCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQ6YW55ID0gaW5mby50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGlkeDogbnVtYmVyID0gdGFyZ2V0LmlkeDtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VyTGV2ZWwgPSBpZHg7XHJcbiAgICAgICAgdGhpcy5tX0J0bkdyb3VwLmZvckVhY2goKGltZzogTGF5YS5JbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICBpbWcuZ3JheSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tX0J0bkdyb3VwW2lkeF0uZ3JheSA9IGZhbHNlO1xyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOWcuuaZr1VJXHJcbiAqL1xyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckVudGl0eVwiXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi4vR2FtZS9HYW1lTW9kdWxlXCI7XHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLi9BZ2VudC9HYW1lQWdlbnRcIjtcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgSXRlbUxpc3RVSSBmcm9tIFwiLi9JdGVtTGlzdFVJXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5cclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiO1xyXG5jbGFzcyBFeHRlbmRzR2FtZVVJIGV4dGVuZHMgdWkuR2FtZVVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVwiKSkpO1xyXG4gICAgfVxyXG4gICAgU2V0Q291bnRUaW1lKGluZm86IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUudGV4dCA9IGluZm87XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBwcml2YXRlIF9VSTogRXh0ZW5kc0dhbWVVSTtcclxuICAgIHByaXZhdGUgbV9vbkNsaWNrU2tpbGxJdGVtOiBNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBwcml2YXRlIG1fb25DTGlja1BsYXllckl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIC8vXHJcbiAgICBwdWJsaWMgRGlzdGFuY2VTdHI6IEFycmF5PHN0cmluZz47XHJcbiAgICBwdWJsaWMgR29sZE51bVN0cjogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICBzZXQgR2FtZVBhbmVsKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dhbWVQYW5lbC52aXNpYmxlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgRGlzdGFuY2UodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBkaXMgPSBcIlwiICsgdmFsdWU7XHJcbiAgICAgICAgaWYgKGRpcyA9PSB0aGlzLkRpc3RhbmNlU3RyWzFdKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gZGlzO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIHNldCBHb2xkTnVtKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1Nob3dEaXN0YW5jZSgpIHtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0RGlzdGFuY2UudGV4dCA9IHRoaXMuRGlzdGFuY2VTdHJbMF0gKyB0aGlzLkRpc3RhbmNlU3RyWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1Nob3dHb2xkTnVtKCkge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHRHb2xkLnRleHQgPSB0aGlzLkdvbGROdW1TdHJbMF0gKyB0aGlzLkdvbGROdW1TdHJbMV07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgc2V0IEdvbGQoZ29sZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyWzFdID0gZ29sZC50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX0lzTXV0ZXggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB2YXIgb3BJc1JpZ2h0ID0gR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNldEluZm8uT1BJc1JpZ2h0O1xyXG4gICAgICAgIHRoaXMuX1VJLl9JdGVtTGlzdEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJTWFuYWdlci5TaG93PEl0ZW1MaXN0VUk+KEl0ZW1MaXN0VUkpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLlNldENvdW50VGltZSgpO1xyXG5cclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyID0gdGhpcy5fVUkuX1R4dERpc3RhbmNlLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHJbMV0gPSBcIjBcIlxyXG4gICAgICAgIHRoaXMuX1Nob3dEaXN0YW5jZSgpO1xyXG5cclxuICAgICAgICB0aGlzLkdvbGROdW1TdHIgPSB0aGlzLl9VSS5fVHh0R29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSBcIjBcIjtcclxuICAgICAgICB0aGlzLl9TaG93R29sZE51bSgpO1xyXG5cclxuICAgICAgICB0aGlzLlNob3dJbnB1dEluZm8oXCJcIik7XHJcbiAgICAgICAgdGhpcy5fVUkuX1BsYXllckl0ZW0ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5PbkNsaWNrUGxheWVySXRlbSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1NraWxsSXRlbS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2xpY2tTa2lsbEl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIFNldExlZnRUb3VjaChvd25lcjogYW55LCBMaXN0ZW5lcjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX1VJLl9MZWZ0VG91Y2gub24oTGF5YS5FdmVudC5DTElDSywgb3duZXIsIExpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRSaWdodFRvdWNoKG93bmVyOiBhbnksIExpc3RlbmVyOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JpZ2h0VG91Y2gub24oTGF5YS5FdmVudC5DTElDSywgb3duZXIsIExpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRDb3VudFRpbWUoaW5mbzogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIGlmIChpbmZvID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVQYW5lbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5TZXRDb3VudFRpbWUoaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgU2hvd0l0ZW0oKSB7XHJcbiAgICAgICAgdGhpcy5TaG93UGxheWVySXRlbSgpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NoYXJhY3RlZXJJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrnjqnlrrbpgInmi6npgZPlhbdcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIFNob3dQbGF5ZXJJdGVtKCkge1xyXG4gICAgICAgIHZhciBpdGVtTnVtID0gR2FtZUFnZW50LkFnZW50LkN1ckl0ZW1OdW07XHJcbiAgICAgICAgaWYgKGl0ZW1OdW0gPCAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9QbGF5ZXJJdGVtLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fUGxheWVySXRlbS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrop5LoibLpgZPlhbdcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIFNob3dDaGFyYWN0ZWVySXRlbSgpIHtcclxuICAgICAgICB2YXIgaXRlbU51bSA9IEdhbWVBZ2VudC5BZ2VudC5Ta2lsbEl0ZW1OdW07XHJcbiAgICAgICAgaWYgKGl0ZW1OdW0gPCAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9Ta2lsbEl0ZW0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9Ta2lsbEl0ZW0udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFNob3dJbnB1dEluZm8oaW5mbzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dhbWVJbmZvLnRleHQgPSBpbmZvO1xyXG4gICAgfVxyXG4gICAgT3BlbigpIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UsIHRoaXMuU2hvd1BsYXllckl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VySXRlbUNoYW5nZSwgdGhpcy5TaG93UGxheWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChHYW1lTW9kdWxlLkV2ZW50Lk9uQ2hhcmFjdGVySXRlbUNoYW5nZSwgdGhpcy5TaG93Q2hhcmFjdGVlckl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuU2hvd0l0ZW0oKTtcclxuICAgIH1cclxuICAgIENsb3NlKCkge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VySXRlbU51bUNoYW5nZSwgdGhpcy5TaG93UGxheWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJJdGVtQ2hhbmdlLCB0aGlzLlNob3dQbGF5ZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KEdhbWVNb2R1bGUuRXZlbnQuT25DaGFyYWN0ZXJJdGVtQ2hhbmdlLCB0aGlzLlNob3dDaGFyYWN0ZWVySXRlbSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgLy/mmL7npLrph5HluIHkv6Hmga9cclxuICAgICAgICB0aGlzLl9TaG93R29sZE51bSgpO1xyXG4gICAgICAgIC8v5pi+56S66Led56a75L+h5oGvXHJcbiAgICAgICAgdGhpcy5fU2hvd0Rpc3RhbmNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdENsaWNrU2tpbGxJdGVtKG93bmVyOiBPYmplY3QsIGxpc3RlbmVyOiAocGFyYW06IGFueSkgPT4gYW55KSB7XHJcbiAgICAgICAgdmFyIGRlbGVnYXRlOiBNZXNzYWdlTUQuRGVsZWdhdGUgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5tX29uQ2xpY2tTa2lsbEl0ZW0gPSBkZWxlZ2F0ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBSZWdpc3RDbGlja1BsYXllckl0ZW0ob3duZXI6IE9iamVjdCwgbGlzdGVuZXI6IChwYXJhbTogYW55KSA9PiBhbnkpIHtcclxuICAgICAgICB2YXIgZGVsZWdhdGU6IE1lc3NhZ2VNRC5EZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fb25DTGlja1BsYXllckl0ZW0gPSBkZWxlZ2F0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tTa2lsbEl0ZW0oKSB7XHJcbiAgICAgICAgdGhpcy5tX29uQ2xpY2tTa2lsbEl0ZW0uRXhlY3V0ZSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBPbkNsaWNrUGxheWVySXRlbSgpIHtcclxuICAgICAgICB0aGlzLm1fb25DTGlja1BsYXllckl0ZW0uRXhlY3V0ZSgpO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7UGxheWVyfSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQge0dhbWVBZ2VudH0gZnJvbSBcIi4vLi4vQWdlbnQvR2FtZUFnZW50XCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgSXRlbUVsZW1lbnQgZnJvbSBcIi4vLi4vc2NyaXB0L0l0ZW1FbGVtZW50XCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIlxyXG5cclxuY2xhc3MgRXh0ZW5kc0l0ZW1MaXN0VUkgZXh0ZW5kcyB1aS5JdGVtTGlzdFVJXHJcbntcclxuICAgIHByaXZhdGUgbV9JdGVtTGlzdDpBcnJheTxudW1iZXI+XHJcbiAgICBCdG5MaXN0ZW5lcjpNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBbXTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIikpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtTGlzdFVJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiSXRlbUxpc3RVSVwiO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBVSTpFeHRlbmRzSXRlbUxpc3RVSTtcclxuICAgIHByaXZhdGUgbV9Hb2xkOnN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OkFycmF5PG51bWJlcj47XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5VSSA9IG5ldyBFeHRlbmRzSXRlbUxpc3RVSSgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5VSSk7XHJcbiAgICAgICAgdGhpcy5VSS5CdG5MaXN0ZW5lciA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUodGhpcywoKT0+eyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2UodGhpcyl9KVxyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5tX0dvbGQgPSB0aGlzLlVJLl9Hb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuVUkuX0JHLmFscGhhID0gMDtcclxuICAgICAgICB0aGlzLlVJLl9CRy5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy5DbG9zZVVJKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPcGVuKClcclxuICAgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLHRoaXMuU2hvd0dvbGQsdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25JdGVtTGlzdENoYW5nZSx0aGlzLlJlZnJlc2hMaXN0LHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuU2hvd0dvbGQoKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUxpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsdGhpcy5TaG93R29sZCx0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlLHRoaXMuUmVmcmVzaExpc3QsdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZUxpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR2V0SXRlbUxpc3QoKTtcclxuICAgICAgICB0aGlzLlNldExpc3QodGhpcy5tX0l0ZW1MaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVmcmVzaExpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR2V0SXRlbUxpc3QoKTtcclxuICAgICAgICB0aGlzLkZyZXNoTGlzdCh0aGlzLm1fSXRlbUxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRJdGVtTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gR2FtZUFQUC5JdGVtTWdyLkdldFNlbGxJdGVtSURMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dHb2xkKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5TaG93aW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9Hb2xkWzFdID1cIlwiICsgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5O1xyXG4gICAgICAgIHRoaXMuVUkuX0dvbGQudGV4dCA9IHRoaXMubV9Hb2xkWzBdICsgdGhpcy5tX0dvbGRbMV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfUmVuZGVySGFuZGxlcihjZWxsOkxheWEuQm94LGluZGV4Om51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciByb2xlRWxlbWVudDpJdGVtRWxlbWVudCA9IGNlbGwgYXMgSXRlbUVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIGl0ZW1MaXN0OkFycmF5PG51bWJlcj4gPSBHYW1lQWdlbnQuQWdlbnQuSXRlbUxpc3Q7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuSW5pdCgpO1xyXG4gICAgICAgIHJvbGVFbGVtZW50Lkl0ZW1JZHggPSB0aGlzLm1fSXRlbUxpc3RbaW5kZXhdO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlZ2lzdEJ1eSh0aGlzLHRoaXMuQnV5SXRlbSk7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVnaXN0Q2hvb3NlKHRoaXMsdGhpcy5DaG9vc2VJdGVtKTtcclxuICAgICAgICByb2xlRWxlbWVudC5Jc0dyYXkgPSBpdGVtTGlzdFt0aGlzLm1fSXRlbUxpc3RbaW5kZXhdXT9mYWxzZTp0cnVlO1xyXG4gICAgICAgIHJvbGVFbGVtZW50Lk51bSA9IGl0ZW1MaXN0W3RoaXMubV9JdGVtTGlzdFtpbmRleF1dP2l0ZW1MaXN0W3RoaXMubV9JdGVtTGlzdFtpbmRleF1dOjA7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuQnRuTGFibGUgPSBcIlwiICsgR2FtZUFQUC5JdGVtTWdyLkdldFByaWNlKHRoaXMubV9JdGVtTGlzdFtpbmRleF0pICsgXCIkXCI7XHJcbiAgICAgICAgLy9yb2xlRWxlbWVudC5TZXRCdG4odGhpcy5CdG5MaXN0ZW5lci5MaXN0ZW5lcix0aGlzLkJ0bkxpc3RlbmVyLkFjdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTZXRMaXN0KGxpc3RBcnJheTpBcnJheTxhbnk+KVxyXG4gICAge1xyXG4gICAgICAgIC8vdmFyIGxpc3RBcnJheTpBcnJheTxhbnk+ID0gdGhpcy5tX0l0ZW1MaXN0O1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QucmVuZGVySGFuZGxlciA9IG5ldyBMYXlhLkhhbmRsZXIodGhpcyx0aGlzLl9SZW5kZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LmFycmF5ID0gbGlzdEFycmF5O1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNCYWNrVGltZSA9IDIwMDsvL+iuvue9ruapoeearueti+WbnuW8ueaXtumXtOOAguWNleS9jeS4uuavq+enkuOAglxyXG4gICAgICAgIHRoaXMuVUkuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNEaXN0YW5jZSA9IDUwXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEZyZXNoTGlzdChpZExpc3QpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5hcnJheSA9IGlkTGlzdDtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnJlZnJlc2goKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBCdXlJdGVtKGlkOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5TaG93aW5nKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkJ1eUl0ZW0oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2hvb3NlSXRlbShpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuU2hvd2luZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKEdhbWVBZ2VudC5BZ2VudC5JdGVtTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VySXRlbSA9IGlkO1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgQ2xvc2VVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmNsYXNzIEV4dGVuZHNTZXRQYW5lbFVJIGV4dGVuZHMgdWkuU2V0UGFuZWxVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e0FQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCl9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNTZXRQYW5lbFVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzU2V0UGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4geyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7IEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKSB9KTtcclxuICAgICAgICB0aGlzLlNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNldFBhbmVsVUlcIjtcclxuICAgIH1cclxuICAgIFNldFBhbmVsKCkge1xyXG4gICAgICAgIHZhciBpbmZvOiBHYW1lU3RydWN0LlNldEluZm8gPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HZXRTZXRJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5fVUkuX0F1ZGlvU3dpdGNoLnNlbGVjdGVkSW5kZXggPSBpbmZvLkF1ZGlvT24gPyAwIDogMTtcclxuICAgICAgICB0aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uT1BJc1JpZ2h0ID8gMSA6IDA7XHJcbiAgICAgICAgdGhpcy5fVUkuX1RleHQudGV4dCA9IGluZm8uVGV4dEluZm87XHJcbiAgICB9XHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICBpbmZvLkF1ZGlvT24gPSB0aGlzLl9VSS5fQXVkaW9Td2l0Y2guc2VsZWN0ZWRJbmRleCA9PSAwO1xyXG4gICAgICAgIGluZm8uT1BJc1JpZ2h0ID0gdGhpcy5fVUkuX09QU3dpdGNoLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TYXZlU2V0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZU9QKCkge1xyXG4gICAgICAgIHRoaXMuU2F2ZVBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge31cclxufVxyXG4iLCJpbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL0Jhc2VVSVwiXHJcbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XHJcblxyXG5tb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1Byb2dyZXNzOkxheWEuUHJvZ3Jlc3NCYXI7XHJcblx0XHRwdWJsaWMgX0d1aWRlcjpMYXlhLkltYWdlO1xyXG5cdFx0cHVibGljIF9FbnRlcjpMYXlhLkJ1dHRvbjtcclxuXHRcdHB1YmxpYyBFcnJvckluZm86TGF5YS5MYWJlbDtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTG9hZGluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEV4dExvYWRpbmdVSSBleHRlbmRzIHVpLkxvYWRpbmdVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBcIkxvYWRpbmdVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOnVpLkxvYWRpbmdVSTtcclxuICAgIF9DYWxsQmFjazooKT0+dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBuYW1lOnN0cmluZyApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgLy90aGlzLl9VSSA9bmV3IHVpLkxvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuX1VJID1uZXcgRXh0TG9hZGluZ1VJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSApO1xyXG4gICAgICAgIHRoaXMuVmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5fQ2FsbEJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgeDpudW1iZXIgPSAwO1xyXG4gICAgICAgIHggKz0gdGhpcy5fVUkuX1Byb2dyZXNzLndpZHRoKnRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZTtcclxuICAgICAgICB0aGlzLl9VSS5fR3VpZGVyLnBvcyh4LHRoaXMuX1VJLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBWYWx1ZShudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZSA9IG51bTtcclxuICAgICAgICB0aGlzLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQ29tcGxldGUoY2FsbEJhY2s6KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ2FsbEJhY2sgPSBjYWxsQmFjaztcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLmxhYmVsID0gXCJFbnRlclwiOy8vdGhpcy5fTmFtZVswXTtcclxuICAgIH1cclxuICAgIFJlbG9hZChjYWxsQmFjazooKT0+dm9pZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgQkdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0VhcnRoOkxheWEuSW1hZ2U7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJCR1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Hb2xkOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9MaXN0OkxheWEuTGlzdDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkNoYXJhY3RlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW5kR2FtZVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfR2FtZUluZm86TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1N0YXJ0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTWVudWVCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9TZXRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QbGF5ZXJMaXN0QnRuOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiRW5kR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW50ZXJVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1N0YXJ0OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUGFuZWw6TGF5YS5QYW5lbDtcblx0XHRwdWJsaWMgX0dyb3VwOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIF9TZXRQYW5lbDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0NoYXJhY3Rlckxpc3Q6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SYW5rOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiRW50ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0NvdW50RG93blVJOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfSXRlbUxpc3RCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9Db3VudFRpbWU6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX0dhbWVJbmZvOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lUGFuZWw6TGF5YS5Cb3g7XG5cdFx0cHVibGljIF9UeHREaXN0YW5jZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfVHh0R29sZDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfTGVmdFRvdWNoOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUmlnaHRUb3VjaDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1NraWxsSXRlbTpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BsYXllckl0ZW06TGF5YS5CdXR0b247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJHYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lUmFua1VJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVJhbmtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEl0ZW1MaXN0VUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9CRzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBfTGlzdDpMYXlhLkxpc3Q7XG5cdFx0cHVibGljIF9Hb2xkOkxheWEuTGFiZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJJdGVtTGlzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTGlzdFVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfUGxheWVyTGlzdDpMYXlhLkxpc3Q7XG5cdFx0cHVibGljIF9SZXR1cm5NYWluOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiUGxheWVyTGlzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1RleHQ6TGF5YS5UZXh0QXJlYTtcblx0XHRwdWJsaWMgX1JldHVybjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0F1ZGlvU3dpdGNoOkxheWEuUmFkaW9Hcm91cDtcblx0XHRwdWJsaWMgX09QU3dpdGNoOkxheWEuUmFkaW9Hcm91cDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlNldFBhbmVsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyIl19
