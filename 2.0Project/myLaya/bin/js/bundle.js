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
    Object.defineProperty(GameAgent.prototype, "CurScore", {
        get: function () {
            return this.m_PlayerEntity.CurScore;
        },
        enumerable: true,
        configurable: true
    });
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
var WechatOpen_1 = require("../platform/WechatOpen");
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
                WechatOpen_1.WechatOpen.getInstances().updateScore(value);
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
},{"../platform/WechatOpen":41,"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10}],4:[function(require,module,exports){
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
    var SmoothDampVector3 = /** @class */ (function () {
        function SmoothDampVector3(smoothTime, maxSpeed) {
            if (maxSpeed === void 0) { maxSpeed = 10; }
            this.m_CurrentVelocity = 0;
            this.m_SmoothTime = smoothTime;
            this.m_MaxSpeed = maxSpeed;
            this.m_MaxMoveNum = this.m_MaxSpeed * this.m_SmoothTime;
        }
        SmoothDampVector3.prototype.SmoothDamp = function (current, target, deltaTime) {
            if (deltaTime === void 0) { deltaTime = 1 / 60; }
            var num = 2 / this.m_SmoothTime;
            var num2 = num * deltaTime;
            var num3 = 1 / (1 + num2 + 0.48 * num2 * num2 + 0.235 * num2 * num2 * num2);
            var num4 = current - target;
            var num5 = target;
            var num6 = this.m_MaxSpeed * this.m_SmoothTime;
            num4 = num4 > -num6 && num4 < num6 ? num4 : (num4 > num6 ? num6 : -num6);
            target = current - num4;
            var num7 = (this.m_CurrentVelocity + num * num4) * deltaTime;
            this.m_CurrentVelocity = (this.m_CurrentVelocity - num * num7) * num3;
            var num8 = target + (num4 + num7) * num3;
            if (num5 - current > 0 == num8 > num5) {
                num8 = num5;
                this.m_CurrentVelocity = (num8 - num5) / deltaTime;
            }
            return num8;
        };
        return SmoothDampVector3;
    }());
    BaseFunc.SmoothDampVector3 = SmoothDampVector3;
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
        if (!this.m_BottomNode) {
            return;
        }
        var numChild = this.m_BottomNode.numChildren;
        for (var i = 0; i < numChild; i++) {
            var node = this.m_BottomNode.getChildAt(i);
            if (node && node["Layout"]) {
                node["Layout"]();
            }
        }
        numChild = this.m_BottomNode.numChildren;
        for (var i = 0; i < numChild; i++) {
            var node = this.m_BottomNode.getChildAt(i);
            if (node && node["Layout"]) {
                node["Layout"]();
            }
        }
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
        if (newUI.UIType == BaseEnum_1.BaseEnum.UITypeEnum.Midle && node.numChildren > 0) {
            node.visible = true;
        }
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
                if (node.numChildren <= 0) {
                    node.visible = false;
                }
                // this.Clear();
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
    GameConfig.startScene = "EndGame.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/ItemElement":42,"./script/RoleElement":43}],15:[function(require,module,exports){
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
var BaseFunc_1 = require("../Base/BaseFunc");
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
        _this.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        _this.m_CountPS = new BaseFunc_1.BaseFunc.SmoothDampVector3(2);
        return _this;
        //Camera.skyRenderer = skyBox._render;
        //this.sk = skyBox;
        //path
    }
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
        var newPS = this.transform.position.clone();
        Laya.Vector3.add(this.BasePS, this.DynamicPS, newPS);
        var scale = this.m_CountPS.SmoothDamp(0, Laya.Vector3.distance(this.transform.position, newPS));
        //this.transform.position = newPS;
        Laya.Vector3.lerp(this.transform.position, newPS, scale, newPS);
        this.transform.position = newPS; //this.m_CountPS.Count(this.transform.position,newPS) //newPS;
    };
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
        /*
        var CameraPS = this.Camera.DynamicPS;
        var PlayerPS = this.Camera.Player._LogicPosition;
        CameraPS.x = 0;
        var disNum = PlayerPS.y - CameraPS.y;
        var disZNum = PlayerPS.z - CameraPS.z;
        if(Math.abs(disNum)>0.01)
        {
            CameraPS.y += disNum*0.1;
        }
        if( Math.abs(disZNum)>0.01)
        {
            CameraPS.z += disZNum*0.1;
        }

        this.Camera.DynamicPS =CameraPS;*/
        var CameraPS = this.Camera.DynamicPS;
        var PlayerPS = this.Camera.Player._LogicPosition;
        CameraPS.x = 0;
        var disNum = PlayerPS.y - CameraPS.y;
        var disZNum = PlayerPS.z - CameraPS.z;
        if (Math.abs(disNum) > 0.01) {
            CameraPS.y += disNum;
        }
        if (Math.abs(disZNum) > 0.01) {
            CameraPS.z += disZNum;
        }
        this.Camera.DynamicPS = CameraPS;
        this.Camera.CountSetPS();
    };
    return GameCameraCtrler;
}(BaseGameCameraCtrler));
},{"../Base/BaseFunc":6}],21:[function(require,module,exports){
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
            if (this._Dirty && this.GameDir.Player.BaseCtrler.IsFalling) {
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
        this.transform.rotate(new Laya.Vector3(0, 180, 0), false, false);
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
            _this.IsFalling = true;
            return _this;
        }
        Object.defineProperty(PlayerNormCtrler.prototype, "MiddlePS", {
            get: function () {
                var midlePS = new Laya.Vector3();
                Laya.Vector3.lerp(this.m_StartPS, this.m_TargetPS, 0.5, midlePS);
                midlePS.y += GameControler_1.default.GameControler.StepLength;
                return midlePS;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerNormCtrler.prototype, "LastTime", {
            get: function () {
                var lastTime = GameControler_1.default.GameControler.PlayerMoveTime - (this.Time - Laya.timer.currTimer);
                return lastTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PlayerNormCtrler.prototype, "TimePercent", {
            /**已消耗时间百分比 */
            get: function () {
                return this.LastTime / GameControler_1.default.GameControler.PlayerMoveTime;
            },
            enumerable: true,
            configurable: true
        });
        PlayerNormCtrler.prototype.StartMove = function () {
            this.Time = Laya.timer.currTimer + GameControler_1.default.GameControler.PlayerMoveTime;
            this.IsFalling = false;
            this.m_StartPS = this.player.Position;
            this.m_TargetPS = this.player.CurStep.Position;
            this.m_TargetPS.y += GameControler_1.default.GameControler.StepLength;
            var rotation = new Laya.Quaternion();
            var lookToPS = this.m_TargetPS.clone();
            lookToPS.y = this.m_StartPS.y;
            lookToPS.z = -lookToPS.z;
            var upDir = new Laya.Vector3();
            upDir.y = 1;
            var startPS = this.m_StartPS.clone();
            startPS.z = -startPS.z;
            Laya.Quaternion.lookAt(startPS, lookToPS, upDir, rotation);
            this.player.transform.rotation = rotation;
        };
        PlayerNormCtrler.prototype._Update = function () {
            if (this.Time > 0) {
                if (this.Time <= Laya.timer.currTimer) {
                    this.Time = -1;
                    this.player.SetStep(this.player.CurStep);
                    return;
                }
                else {
                    var lastTime = this.LastTime;
                    var rate = this.TimePercent;
                    var moveTimeRate = 0;
                    var fallTimePoint = 0.4;
                    var startPS;
                    var targetPS;
                    if (rate > fallTimePoint) {
                        if (!this.IsFalling) {
                            this.IsFalling = true;
                            this.player.JumpDown();
                            this.player.TouchGround();
                        }
                        moveTimeRate = (rate - fallTimePoint) / (1 - fallTimePoint);
                        targetPS = this.m_TargetPS;
                        startPS = this.MiddlePS;
                    }
                    else {
                        moveTimeRate = rate / fallTimePoint;
                        targetPS = this.MiddlePS;
                        startPS = this.m_StartPS;
                    }
                    if (this.player.PlayerDeath)
                        return;
                    var newPs = new Laya.Vector3();
                    Laya.Vector3.lerp(startPS, targetPS, moveTimeRate, newPs);
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
},{"./../controler/GameControler":40}],28:[function(require,module,exports){
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
        Laya3D.init(750, 1334, true);
        GameConfig_1.default.init();
        //Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM;
        //开启统计信息
        Laya.Stat.show();
        var resCol = [{ url: "ui/Resource/localcomp.atlas", type: Laya.Loader.ATLAS }, { url: "ui/Resource/LoadUI.json", type: Laya.Loader.JSON }];
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
},{"../controler/APP":38,"./../Scene/Scene":34,"./../Utility/Path":36,"./../ui/EnterGameUI":48}],33:[function(require,module,exports){
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
        _this.m_LoadFaile = "";
        _this.m_CountValue = 0;
        return _this;
    }
    LoadScenePlaye.prototype.StartLoad = function () {
        this.m_CountValue = 0;
        this.m_LoadFaile = "";
        var resource2DArr = [
            Path_1.path.GetDepathUIJS("Enter"),
            Path_1.path.GetDepathUIJS("GameRank"),
            Path_1.path.GetDepathUIJS("SetPanel"),
            Path_1.path.GetDepathUIJS("ItemList"),
            Path_1.path.GetDepathUIJS("Character"),
            Path_1.path.GetDepathUIJS("PlayerList"),
            Path_1.path.GetDepathUIJS("BG"),
            Path_1.path.GetAtlPath("entersceneui"),
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
        this.m_LoadFaile += str;
        console.debug("LoadError:" + str);
    };
    LoadScenePlaye.prototype.onComplete = function (data) {
        if (this.m_LoadFaile) {
            var thiDir = this;
            this.m_LoadingUI.Reload(this.m_LoadFaile, function () { thiDir.Load(); });
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
        this.m_LoadFaile = "";
        this.StartLoad();
    };
    LoadScenePlaye.prototype.End = function () {
        console.log("LoadComplete");
    };
    LoadScenePlaye.prototype.Update = function () {
    };
    return LoadScenePlaye;
}(Scene_1.Scene.BaseScenePlaye));
},{"./../Scene/Scene":34,"./../Utility/Path":36,"./../controler/APP":38,"./../ui/BG":44,"./../ui/UnDownload/LoadingUI":53,"./GuiderManager":32}],34:[function(require,module,exports){
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
var WechatOpen_1 = require("../../platform/WechatOpen");
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
        WechatOpen_1.WechatOpen.getInstances().drawpass(this._LogicGoldNum + GameAgent_1.GameAgent.Agent.CurScore);
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
        WechatOpen_1.WechatOpen.getInstances().drawpass(0);
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
},{"../../controler/GameAPP":39,"../../platform/WechatOpen":41,"./../../Agent/GameAgent":2,"./../../FrameWork/MessageCenter":10,"./../../Game/GameCamera":20,"./../../Game/GameItem":21,"./../../Game/GameStruct":23,"./../../Game/Input":24,"./../../Game/MountLine":25,"./../../Game/Player":26,"./../../Scene/Scene":34,"./../../controler/APP":38,"./../../controler/GameControler":40,"./../../ui/EndGameUI":47,"./../../ui/GameUI":49}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path;
(function (path) {
    path.IsEditor = true;
    path.version = "";
    path.SceneAssetPath = "LayaScene_";
    path.ResourcePath = path.IsEditor ? "NetResource_3_29/" : "https://www.gsjgame.com/Resource/NetResource_3_29/";
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
var RankPanelUI_1 = require("./../ui/RankPanelUI");
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
    //显示排行榜面板
    GameControler.prototype.ShowRankPanel = function () {
        // if(!Laya.Browser.onWeiXin || typeof wx == "undefined") {
        //     return;
        // }
        var Panel = APP_1.default.UIManager.Show(RankPanelUI_1.default); // new SetPanel();
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
},{"./../Agent/PlayerGuestAgent":4,"./../Game/GameStruct":23,"./../Scene/GameScene":31,"./../ui/CharacterUI":46,"./../ui/RankPanelUI":51,"./../ui/SetPanelUI":52,"./APP":38}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WechatOpen = /** @class */ (function () {
    function WechatOpen() {
        this.dataContext = null;
        this.isDrawRank = false;
        if (typeof wx != "undefined") {
            this.dataContext = window["wx"].getOpenDataContext();
        }
    }
    /**
     * 获取当前对象实列
     */
    WechatOpen.getInstances = function () {
        if (!WechatOpen.wechatOpen) {
            WechatOpen.wechatOpen = new WechatOpen();
        }
        return WechatOpen.wechatOpen;
    };
    WechatOpen.prototype.updateScore = function (score) {
        this.postMessageToOpen({
            command: "update",
            score: score
        });
    };
    WechatOpen.prototype.drawpass = function (score) {
        this.postMessageToOpen({
            command: "drawpass",
            score: score
        });
    };
    WechatOpen.prototype.clearcanvase = function () {
        this.postMessageToOpen({
            command: "clearcanvase"
        });
    };
    WechatOpen.prototype.closeRank = function () {
        this.postMessageToOpen({
            command: "close"
        });
    };
    WechatOpen.prototype.showRange = function () {
        this.postMessageToOpen({
            command: "range",
        });
    };
    WechatOpen.prototype.clearScore = function () {
        this.postMessageToOpen({
            command: "clearScore"
        });
    };
    WechatOpen.prototype.openRank = function () {
        this.postMessageToOpen({
            command: "open"
        });
    };
    WechatOpen.prototype.postMessageToOpen = function (data) {
        if (this.dataContext) {
            this.dataContext.postMessage(data);
        }
    };
    WechatOpen.wechatOpen = null;
    return WechatOpen;
}());
exports.WechatOpen = WechatOpen;
},{}],42:[function(require,module,exports){
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
},{"./../FrameWork/MessageCenter":10}],43:[function(require,module,exports){
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
},{"./../controler/APP":38,"./../controler/GameControler":40}],44:[function(require,module,exports){
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
},{"./../Base/BaseFunc":6,"./../Utility/Path":36,"./layaMaxUI":54}],45:[function(require,module,exports){
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
    BaseUI.prototype.Layout = function () {
    };
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
},{"./../Base/BaseEnum":5,"./../FrameWork/FrameWork":9,"./../FrameWork/UIManager":13}],46:[function(require,module,exports){
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
        //this.m_GoldDiscribe = this._UI._Gold.text.split("#");
        _this.OnMoneyChange();
        _this._UI._Gold.text = PlayerGuestAgent_1.default.GuestAgent.Money + "";
        _this._UI._Gold.stroke = 2;
        _this._UI._Gold.strokeColor = "0xff0000";
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
        //this.m_GoldDiscribe[1] = "" + PlayerGuestAgent.GuestAgent.Money;
        //this._UI._Gold.text = this.m_GoldDiscribe[0] + this.m_GoldDiscribe[1];
    };
    return CharacterUI;
}(BaseUI_1.default));
exports.default = CharacterUI;
},{"../controler/GameAPP":39,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Utility/Path":36,"./../controler/APP":38,"./../controler/GameControler":40,"./BaseUI":45,"./layaMaxUI":54}],47:[function(require,module,exports){
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
    EndGameUI.prototype.Layout = function () {
        _super.prototype.Layout.call(this);
        if (!this.UI || !this.UI.bg) {
            return;
        }
        this.UI.bg.width = Laya.stage.width;
        this.UI.bg.height = Laya.stage.height;
    };
    return EndGameUI;
}(BaseUI_1.default));
exports.default = EndGameUI;
},{"../Scene/GuiderManager":32,"./../Utility/Path":36,"./../controler/GameControler":40,"./BaseUI":45,"./layaMaxUI":54}],48:[function(require,module,exports){
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
        //this._Character.on(Laya.Event.CLICK, this, this.showCharacter);
        _this._SetPanel.on(Laya.Event.CLICK, GameControler_1.default.GameControler, GameControler_1.default.GameControler.ShowSetPanel);
        //this._Rank.on(Laya.Event.CLICK, GameControler.GameControler, GameControler.GameControler.ShowRankPanel);
        //this._Start.on(Laya.Event.CLICK, GameControler.GameControler, GameControler.GameControler.EnterGame);
        _this._Start.on(Laya.Event.CLICK, _this, _this.onStart);
        _this._CharacterList.visible = false;
        _this.Panel.visible = false;
        _this._Rank["initX"] = _this._Rank.x;
        _this._Rank["initY"] = _this._Rank.y;
        _this._SetPanel["initX"] = _this._SetPanel.x;
        _this._SetPanel["initY"] = _this._SetPanel.y;
        _this._Start["initX"] = _this._Start.x;
        _this._Start["initY"] = _this._Start.y;
        _this._Character["initX"] = _this._Character.x;
        _this._Character["initY"] = _this._Character.y;
        _this.adv["initX"] = _this.adv.x;
        _this.adv["initY"] = _this.adv.y;
        return _this;
    }
    ExtendEnterGameUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("Enter")));
    };
    ExtendEnterGameUI.prototype.onStart = function () {
        Laya.Tween.to(this._Rank, { y: this._Rank.y + Laya.stage.height - this._Character.y }, 150, Laya.Ease.sineIn);
        Laya.Tween.to(this._SetPanel, { y: this._SetPanel.y + Laya.stage.height - this._Character.y }, 150, Laya.Ease.sineIn);
        Laya.Tween.to(this._Start, { x: this._Start.y + Laya.stage.width - this._Start.x }, 250, Laya.Ease.sineIn, Laya.Handler.create(GameControler_1.default.GameControler, GameControler_1.default.GameControler.EnterGame));
        Laya.Tween.to(this._Character, { y: this._Character.y - Laya.stage.height }, 150, Laya.Ease.sineIn);
        Laya.Tween.to(this.adv, { y: this.adv.y + Laya.stage.height - this._Character.y }, 150, Laya.Ease.sineIn);
        Laya.Tween.to(this._logo, { alpha: 0.2 }, 100, Laya.Ease.sineIn);
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
        // var img = new Laya.Image();
        // img.loadImage("urere");
        // this.addChild(img);
        //this._UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ uiMgr.Show<PlayerListUI>(PlayerListUI)});
        _this.Layout();
        return _this;
    }
    EnterGameUI.Name = function () {
        return "EnterGameUI";
    };
    EnterGameUI.prototype.OpenOP = function () {
        _super.prototype.OpenOP.call(this);
        this._UI._logo.alpha = 1;
        if (!this._UI._Rank["initX"]) {
            return;
        }
        this._UI._Rank.x = this._UI._Rank["initX"];
        this._UI._Rank.y = this._UI._Rank["initY"];
        this._UI._SetPanel.x = this._UI._SetPanel["initX"];
        this._UI._SetPanel.y = this._UI._SetPanel["initY"];
        this._UI._Start.x = this._UI._Start["initX"];
        this._UI._Start.y = this._UI._Start["initY"];
        this._UI._Character.x = this._UI._Character["initX"];
        this._UI._Character.y = this._UI._Character["initY"];
        this._UI.adv.x = this._UI.adv["initX"];
        this._UI.adv.y = this._UI.adv["initY"];
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
    EnterGameUI.prototype.Layout = function () {
        _super.prototype.Layout.call(this);
        if (!this._UI || !this._UI.bg) {
            return;
        }
        this._UI.bg.width = Laya.stage.width;
        this._UI.bg.height = Laya.stage.height;
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
},{"./../Agent/GameAgent":2,"./../Utility/Path":36,"./../controler/GameControler":40,"./BaseUI":45,"./layaMaxUI":54}],49:[function(require,module,exports){
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
},{"../Agent/GameAgent":2,"../Game/GameModule":22,"./../Agent/PlayerEntity":3,"./../FrameWork/MessageCenter":10,"./../Utility/Path":36,"./../controler/APP":38,"./../controler/GameControler":40,"./BaseUI":45,"./ItemListUI":50,"./layaMaxUI":54}],50:[function(require,module,exports){
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
        return _this;
        //this.m_Gold = this.UI._Gold.text.split("#");
        //this.UI._BG.alpha = 0;
        //this.UI._BG.on(Laya.Event.CLICK,this,this.CloseUI)
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
        //this.UI._Gold.text = this.m_Gold[0] + this.m_Gold[1];
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
},{"./../Agent/GameAgent":2,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Base/BaseEnum":5,"./../FrameWork/MessageCenter":10,"./../Utility/Path":36,"./../controler/APP":38,"./../controler/GameAPP":39,"./BaseUI":45,"./layaMaxUI":54}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var BaseEnum_1 = require("./../Base/BaseEnum");
var WechatOpen_1 = require("../platform/WechatOpen");
var Path_1 = require("./../Utility/Path");
var ExtendsRankPanelUI = /** @class */ (function (_super) {
    __extends(ExtendsRankPanelUI, _super);
    function ExtendsRankPanelUI() {
        return _super.call(this) || this;
        //this._Return.on(Laya.Event.CLICK,this,()=>{APP.UIManager.CloseCurView()});
    }
    ExtendsRankPanelUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("GameRank")));
    };
    return ExtendsRankPanelUI;
}(layaMaxUI_1.ui.GameRankUI));
var RankPanelUI = /** @class */ (function (_super) {
    __extends(RankPanelUI, _super);
    function RankPanelUI(name) {
        var _this = _super.call(this, name) || this;
        _this._UIType = BaseEnum_1.BaseEnum.UITypeEnum.Midle;
        _this._UI = new ExtendsRankPanelUI();
        _this.FixUI(_this._UI);
        _this._UI.closeBtn.on(Laya.Event.CLICK, _this, function () {
            WechatOpen_1.WechatOpen.getInstances().closeRank();
            _this._UIManager.Close(_this);
        });
        return _this;
    }
    RankPanelUI.Name = function () {
        return "RankPanelUI";
    };
    RankPanelUI.prototype.Open = function () {
        WechatOpen_1.WechatOpen.getInstances().openRank();
    };
    RankPanelUI.prototype.SavePanel = function () {
        // this.rankTexture.bitmap.alwaysChange = false;
        // this.rankTexture.disposeBitmap();
    };
    RankPanelUI.prototype.CloseOP = function () {
        this.SavePanel();
    };
    RankPanelUI.prototype.Update = function () { };
    return RankPanelUI;
}(BaseUI_1.default));
exports.default = RankPanelUI;
},{"../platform/WechatOpen":41,"./../Base/BaseEnum":5,"./../Utility/Path":36,"./BaseUI":45,"./layaMaxUI":54}],52:[function(require,module,exports){
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
        // this._UI._AudioSwitch.selectedIndex = info.AudioOn ? 0 : 1;
        // this._UI._OPSwitch.selectedIndex = info.OPIsRight ? 1 : 0;
        // this._UI._Text.text = info.TextInfo;
    };
    SetPanelUI.prototype.SavePanel = function () {
        var info = new GameStruct_1.GameStruct.SetInfo();
        // info.AudioOn = this._UI._AudioSwitch.selectedIndex == 0;
        // info.OPIsRight = this._UI._OPSwitch.selectedIndex == 1;
        // Controler.GameControler.SaveSetInfo(info);
    };
    SetPanelUI.prototype.Layout = function () {
        _super.prototype.Layout.call(this);
        if (!this._UI || !this._UI.bg) {
            return;
        }
        this._UI.bg.width = Laya.stage.width;
        this._UI.bg.height = Laya.stage.height;
    };
    SetPanelUI.prototype.CloseOP = function () {
        this.SavePanel();
    };
    SetPanelUI.prototype.Update = function () { };
    return SetPanelUI;
}(BaseUI_1.default));
exports.default = SetPanelUI;
},{"../Scene/GuiderManager":32,"./../Base/BaseEnum":5,"./../Game/GameStruct":23,"./../Utility/Path":36,"./../controler/GameControler":40,"./BaseUI":45,"./layaMaxUI":54}],53:[function(require,module,exports){
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
        _this.Layout();
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
    LoadingUI.prototype.Layout = function () {
        if (!this._UI || !this._UI["bg"]) {
            return;
        }
        this._UI["bg"].width = Laya.stage.width;
        this._UI["bg"].height = Laya.stage.height;
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
        callBack();
        // this._CallBack = callBack;
        // this._UI._Enter.visible = true;
        // this._UI._Enter.label = "Enter";//this._Name[0];
    };
    LoadingUI.prototype.Reload = function (str, callBack) {
        this._UI.ErrorInfo.text = str;
        this._UI.ErrorInfo.visible = true;
        this._UI.ErrorInfo.width = Laya.stage.width;
        this._UI.ErrorInfo.height = Laya.stage.height;
    };
    return LoadingUI;
}(BaseUI_1.default));
exports.default = LoadingUI;
},{"./../BaseUI":45}],54:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FnZW50L0Jhc2VBZ2VudC50cyIsInNyYy9BZ2VudC9HYW1lQWdlbnQudHMiLCJzcmMvQWdlbnQvUGxheWVyRW50aXR5LnRzIiwic3JjL0FnZW50L1BsYXllckd1ZXN0QWdlbnQudHMiLCJzcmMvQmFzZS9CYXNlRW51bS50cyIsInNyYy9CYXNlL0Jhc2VGdW5jLnRzIiwic3JjL0Jhc2UvRlNNLnRzIiwic3JjL0ZyYW1lV29yay9CYXNlTWFuYWdlci50cyIsInNyYy9GcmFtZVdvcmsvRnJhbWVXb3JrLnRzIiwic3JjL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyLnRzIiwic3JjL0ZyYW1lV29yay9TY2VuZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL1RpbWVNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9VSU1hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0dhbWVNYW5hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0l0ZW1NYW5hZ2VyLnRzIiwic3JjL0dhbWUvQW5pbU9iai50cyIsInNyYy9HYW1lL0NoYXJhY3Rlci50cyIsInNyYy9HYW1lL0dhbWVDYW1lcmEudHMiLCJzcmMvR2FtZS9HYW1lSXRlbS50cyIsInNyYy9HYW1lL0dhbWVNb2R1bGUudHMiLCJzcmMvR2FtZS9HYW1lU3RydWN0LnRzIiwic3JjL0dhbWUvSW5wdXQudHMiLCJzcmMvR2FtZS9Nb3VudExpbmUudHMiLCJzcmMvR2FtZS9QbGF5ZXIudHMiLCJzcmMvR2FtZS9QbGF5ZXJDdHJsZXIudHMiLCJzcmMvR2FtZS9TdGVwLnRzIiwic3JjL01haW4udHMiLCJzcmMvU2NlbmUvR2FtZURpcmVjdG9yLnRzIiwic3JjL1NjZW5lL0dhbWVTY2VuZS50cyIsInNyYy9TY2VuZS9HdWlkZXJNYW5hZ2VyLnRzIiwic3JjL1NjZW5lL0xvYWRTY2VuZS50cyIsInNyYy9TY2VuZS9TY2VuZS50cyIsInNyYy9TY2VuZS9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheS50cyIsInNyYy9VdGlsaXR5L1BhdGgudHMiLCJzcmMvVXRpbGl0eS9VSUZ1bmMudHMiLCJzcmMvY29udHJvbGVyL0FQUC50cyIsInNyYy9jb250cm9sZXIvR2FtZUFQUC50cyIsInNyYy9jb250cm9sZXIvR2FtZUNvbnRyb2xlci50cyIsInNyYy9wbGF0Zm9ybS9XZWNoYXRPcGVuLnRzIiwic3JjL3NjcmlwdC9JdGVtRWxlbWVudC50cyIsInNyYy9zY3JpcHQvUm9sZUVsZW1lbnQudHMiLCJzcmMvdWkvQkcudHMiLCJzcmMvdWkvQmFzZVVJLnRzIiwic3JjL3VpL0NoYXJhY3RlclVJLnRzIiwic3JjL3VpL0VuZEdhbWVVSS50cyIsInNyYy91aS9FbnRlckdhbWVVSS50cyIsInNyYy91aS9HYW1lVUkudHMiLCJzcmMvdWkvSXRlbUxpc3RVSS50cyIsInNyYy91aS9SYW5rUGFuZWxVSS50cyIsInNyYy91aS9TZXRQYW5lbFVJLnRzIiwic3JjL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNWQSw2Q0FBOEM7QUFDOUM7SUFHSTtRQUVJLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ2xFLENBQUM7SUFDTCxnQkFBQztBQUFELENBUEEsQUFPQyxJQUFBOzs7OztBQ1JELCtDQUF1QztBQUN2QyxtREFBaUQ7QUFFakQsMENBQW9DO0FBQ3BDLGdEQUEyQztBQUMzQyx5Q0FBbUM7QUFFbkM7SUFBK0IsNkJBQVM7SUE0Q3BDO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lB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S0FBSyxFQUFjLENBQUM7WUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBRTNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7WUFFMUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFFN0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtZQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxP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QUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0csSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BILElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsdUJBQWEsQ0FBQyxhQUFhLEVBQUUsdUJBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsTSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEcsSUFBSSxDQUFDLEtBQUss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RCxDQVhBLEFBV0MsQ0FYK0IsSUFBSSxDQUFDLElBQUksR0FXeEM7SUFYWSxhQUFVLGFBV3RCLENBQUE7QUFDTCxDQUFDLEVBekdhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQXlHZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgKiBhcyBQbGF5ZXJFbnRpdHkgZnJvbSBcIi4vUGxheWVyRW50aXR5XCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUFnZW50XHJcbntcclxuICAgIHByb3RlY3RlZCBtX1BsYXllckVudGl0eTpQbGF5ZXJFbnRpdHkuUGxheWVyLlBsYXllckVudGl0eTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5ID0gUGxheWVyRW50aXR5LlBsYXllci5QbGF5ZXJFbnRpdHkuRW50aXR5O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLy4uL0dhbWUvR2FtZU1vZHVsZVwiXHJcbmltcG9ydCB7IEdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4vLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVBUFBcIjtcclxuaW1wb3J0IEJhc2VBZ2VudCBmcm9tIFwiLi9CYXNlQWdlbnRcIlxyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVBZ2VudCBleHRlbmRzIEJhc2VBZ2VudCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfQWdlbnQ6IEdhbWVBZ2VudDtcclxuXHJcbiAgICBzdGF0aWMgZ2V0IEFnZW50KCk6IEdhbWVBZ2VudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0FnZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQWdlbnQgPSBuZXcgR2FtZUFnZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9BZ2VudDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbV9Vc2VJdGVtTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fU2tpbGxJdGVtSUQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Ta2lsbEl0ZW1OdW06IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IEN1ckxldmVsKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyTGV2ZWw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IEN1ckxldmVsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckxldmVsID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEN1ck1heExldmVsKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuSGlzdG9yeU1heExldmVsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDdXJDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDdXJJdGVtKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VySXRlbTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgSXRlbUxpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuSXRlbUxpc3RcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgQ3VySXRlbShpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLkl0ZW1MaXN0W2lkXSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VySXRlbSA9IGlkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDdXJJdGVtTnVtKCk6IG51bWJlciAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW1OdW0gPCB0aGlzLm1fVXNlSXRlbU51bSA/IHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VySXRlbSA6IHRoaXMubV9Vc2VJdGVtTnVtO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBTa2lsbEl0ZW1OdW0oKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1NraWxsSXRlbU51bTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRHb2xkKGdvbGQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghZ29sZCB8fCBnb2xkIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1vbmV5ID0gdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSArIGdvbGQ7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSA9IG1vbmV5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRTY29yZShzY29yZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCFzY29yZSB8fCBzY29yZSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzY29yZSA9IHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyU2NvcmUgKyBzY29yZTtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1clNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBDdXJTY29yZSgpOm51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyU2NvcmU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBSZXNldEdhbWVJdGVtKCkge1xyXG4gICAgICAgIHRoaXMubV9Vc2VJdGVtTnVtID0gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtID4gMCA/IDEgOiAwO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKFBsYXllci5FdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldFNraWxsSXRlbSgpIHtcclxuICAgICAgICB2YXIgQ2hhcmFjdGVySUQ6bnVtYmVyID0gdGhpcy5tX1BsYXllckVudGl0eS5DdXJDaGFyYWN0ZXJJRDtcclxuICAgICAgICB0aGlzLm1fU2tpbGxJdGVtTnVtID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3IuR2V0U2tpbGxJdGVtKENoYXJhY3RlcklEKSA8IDAgPyAwIDogMTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShHYW1lTW9kdWxlLkV2ZW50Lk9uQ2hhcmFjdGVySXRlbUNoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVzZUdhbWVJdGVtKCkgIHtcclxuICAgICAgICBpZiAodGhpcy5tX1VzZUl0ZW1OdW0gPCAxKSAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLS0gdGhpcy5tX1VzZUl0ZW1OdW07XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5SZWR1Y2VJdGVtKHRoaXMuQ3VySXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVzZUNoYXJhY3RlclNraWxsSXRlbSgpICB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9Ta2lsbEl0ZW1OdW08MSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLS10aGlzLm1fU2tpbGxJdGVtTnVtO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKEdhbWVNb2R1bGUuRXZlbnQuT25DaGFyYWN0ZXJJdGVtQ2hhbmdlKTtcclxuICAgIH1cclxufVxyXG4iLCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgeyBXZWNoYXRPcGVuIH0gZnJvbSBcIi4uL3BsYXRmb3JtL1dlY2hhdE9wZW5cIjtcclxuXHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyIHtcclxuICAgIGV4cG9ydCBjbGFzcyBFdmVudCB7XHJcbiAgICAgICAgc3RhdGljIE9uTW9uZXlDaGFuZ2U6IHN0cmluZyA9IFwiT25Nb25leUNoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckNoYXJhY3RlcklEQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VyQ2hhcmFjdGVySURDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25IaXN0b3J5TWF4TGV2ZWxDaGFuZ2U6IHN0cmluZyA9IFwiT25IaXN0b3J5TWF4TGV2ZWxDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJMZXZlbENoYW5nZTogc3RyaW5nID0gXCJPbkN1ckxldmVsQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ2hhcmFjdGVyTGlzdENoYW5nZTogc3RyaW5nID0gXCJPbkNoYXJhY3Rlckxpc3RDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJJdGVtQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VySXRlbUNoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkl0ZW1MaXN0Q2hhbmdlOiBzdHJpbmcgPSBcIk9uSXRlbUxpc3RDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJTY29yZUNoYW5nZTogc3RyaW5nID0gXCJPbkN1clNjb3JlQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VySXRlbU51bUNoYW5nZTogc3RyaW5nID0gXCJPbkN1ckl0ZW1OdW1DaGFuZ2VcIlxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJFbnRpdHkge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIG1fRW50aXR5OiBQbGF5ZXJFbnRpdHk7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXQgRW50aXR5KCk6IFBsYXllckVudGl0eSB7XHJcbiAgICAgICAgICAgIGlmICghUGxheWVyRW50aXR5Lm1fRW50aXR5KSB7XHJcbiAgICAgICAgICAgICAgICBQbGF5ZXJFbnRpdHkubV9FbnRpdHkgPSBuZXcgUGxheWVyRW50aXR5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQbGF5ZXJFbnRpdHkubV9FbnRpdHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgbV9GcmFtZVdvcms6IEZyYW1lV29yaztcclxuICAgICAgICBwcml2YXRlIG1fTWVzc2FnZU1ncjogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcblxyXG4gICAgICAgIC8v6ZKxXHJcbiAgICAgICAgcHJpdmF0ZSBtX01vbmV5OiBudW1iZXI7XHJcbiAgICAgICAgLy/pgInkuK3op5LoibJJRFxyXG4gICAgICAgIHByaXZhdGUgbV9DdXJDaGFyYWN0ZXJJRDogbnVtYmVyO1xyXG4gICAgICAgIC8v546p5a625bey6Kej6ZSB55qE5pyA6auY5YWz5Y2hXHJcbiAgICAgICAgcHJpdmF0ZSBtX0hpc3RvcnlNYXhMZXZlbDogbnVtYmVyO1xyXG4gICAgICAgIC8v5b2T5YmN6YCJ5Lit5YWz5Y2hXHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1ckxldmVsOiBudW1iZXI7XHJcbiAgICAgICAgLy/op5LoibLliJfooahcclxuICAgICAgICBwcml2YXRlIG1fQ2hhcmFjdGVyTGlzdDogQXJyYXk8bnVtYmVyPjtcclxuICAgICAgICAvL+W9k+WJjeaLpemAieS4remBk+WFt1xyXG4gICAgICAgIHByaXZhdGUgbV9DdXJJdGVtOiBudW1iZXI7XHJcbiAgICAgICAgLy/nianlk4HliJfooahcclxuICAgICAgICBwcml2YXRlIG1fSXRlbUxpc3Q6IEFycmF5PG51bWJlcj47XHJcbiAgICAgICAgLy/np6/liIZcclxuICAgICAgICBwcml2YXRlIG1fQ3VyU2NvcmU6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBNb25leSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX01vbmV5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IE1vbmV5KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9Nb25leSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9Nb25leSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uTW9uZXlDaGFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VyQ2hhcmFjdGVySUQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJDaGFyYWN0ZXJJRDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJDaGFyYWN0ZXJJRCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckNoYXJhY3RlcklEQ2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJMZXZlbCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckxldmVsID8gdGhpcy5tX0N1ckxldmVsIDogdGhpcy5tX0hpc3RvcnlNYXhMZXZlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJMZXZlbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLkN1ckxldmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1ckxldmVsID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJMZXZlbENoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGlzdG9yeU1heExldmVsKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSGlzdG9yeU1heExldmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEhpc3RvcnlNYXhMZXZlbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLm1fSGlzdG9yeU1heExldmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0hpc3RvcnlNYXhMZXZlbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uSGlzdG9yeU1heExldmVsQ2hhbmdlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IENoYXJhY3Rlckxpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0NoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ3VySXRlbSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLm1fQ3VySXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJJdGVtID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJJdGVtQ2hhbmdlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1ckl0ZW0oKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1ckl0ZW1OdW0oKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuR2V0SXRlbU51bSh0aGlzLkN1ckl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEl0ZW1MaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0l0ZW1MaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1clNjb3JlKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyU2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ3VyU2NvcmUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0N1clNjb3JlID0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTY29yZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBXZWNoYXRPcGVuLmdldEluc3RhbmNlcygpLnVwZGF0ZVNjb3JlKHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1clNjb3JlQ2hhbmdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1fTW9uZXkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdCA9IFsxXTtcclxuICAgICAgICAgICAgdGhpcy5tX0hpc3RvcnlNYXhMZXZlbCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJJdGVtID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0ZyYW1lV29yayA9IEZyYW1lV29yay5GTTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1clNjb3JlID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBZGRDaGFyYWN0ZXIoaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdFtpZF0gPSAxO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQWRkSXRlbShpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5tX0l0ZW1MaXN0W2lkXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0l0ZW1MaXN0W2lkXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKyt0aGlzLm1fSXRlbUxpc3RbaWRdO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UpO1xyXG4gICAgICAgICAgICBpZiAoaWQgPT0gdGhpcy5DdXJJdGVtKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFJlZHVjZUl0ZW0oaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubV9JdGVtTGlzdFtpZF0gfHwgdGhpcy5tX0l0ZW1MaXN0W2lkXSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC0tdGhpcy5tX0l0ZW1MaXN0W2lkXTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlKTtcclxuICAgICAgICAgICAgaWYgKGlkID09IHRoaXMuQ3VySXRlbSlcclxuICAgICAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJJdGVtTnVtQ2hhbmdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBHZXRJdGVtTnVtKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIG51bTogbnVtYmVyID0gdGhpcy5tX0l0ZW1MaXN0W2lkXTtcclxuICAgICAgICAgICAgbnVtID0gbnVtID8gbnVtIDogMDtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEJhc2VBZ2VudCBmcm9tIFwiLi9CYXNlQWdlbnRcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckd1ZXN0QWdlbnQgZXh0ZW5kcyBCYXNlQWdlbnQge1xyXG4gICAgc3RhdGljIF9BZ2VudDogUGxheWVyR3Vlc3RBZ2VudDtcclxuICAgIHN0YXRpYyBnZXQgR3Vlc3RBZ2VudCgpOiBQbGF5ZXJHdWVzdEFnZW50IHtcclxuICAgICAgICBpZiAodGhpcy5fQWdlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9BZ2VudCA9IG5ldyBQbGF5ZXJHdWVzdEFnZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9BZ2VudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IE1vbmV5KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IENoYXJhY3RlcklEKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IENoYXJhY3Rlckxpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ2hhcmFjdGVyTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJ1eUNoYXJhY3RlcihpZDogbnVtYmVyKSAge1xyXG4gICAgICAgIC8vVG9Eb1xyXG4gICAgICAgIHZhciBwcmljZSA9IEdhbWVBUFAuSXRlbU1nci5HZXRQcmljZShpZCk7XHJcbiAgICAgICAgaWYgKGlkIDwgMHx8IHByaWNlIDwwIHx8IHByaWNlID4gdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5IC09IGlkO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQWRkQ2hhcmFjdGVyKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQnV5SXRlbShpZDogbnVtYmVyKSAge1xyXG4gICAgICAgIHZhciBwcmljZSA9IEdhbWVBUFAuSXRlbU1nci5HZXRQcmljZShpZCk7XHJcbiAgICAgICAgaWYoaWQgPCAwfHwgcHJpY2UgPDAgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwcmljZSA+IHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkgLT0gcHJpY2U7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5BZGRJdGVtKGlkKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0Q2hhcmFjdGVyKGlkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJMaXN0OkFycmF5PG51bWJlcj4gPSB0aGlzLkNoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgaWYoY2hhcmFjdGVyTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEID0gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBCYXNlRW51bSB7XHJcbiAgICBleHBvcnQgZW51bSBVSVR5cGVFbnVtIHtMb3csTWlkbGV9O1xyXG59IiwiaW1wb3J0IEJhc2VNZ3IgZnJvbSBcIi4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiO1xyXG5cclxuLyoqXHJcbiAqIOWumuS5ieWfuuehgOe7k+aehOS9k1xyXG4gKi9cclxuZXhwb3J0IG1vZHVsZSBCYXNlRnVuYyB7XHJcbiAgICBlbnVtIFVJVHlwZUVudW0geyBMb3csIE1pZGxlIH07XHJcbiAgICBleHBvcnQgY2xhc3MgTWFwPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9NYXA6IHsgW2tleTogc3RyaW5nXTogVCB9O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9NYXAgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yRWFjaChjYWxsYmFjazogKG1ncjogVCwga2V5OiBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbWFwS2V5IGluIHRoaXMuX01hcCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fTWFwW21hcEtleV0sIG1hcEtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIG9iaiDmlL7lhaXlr7nosaFcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOmUrlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNldChvYmo6IFQsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICsrdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fTWFwW2tleV0gPSBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdldChrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTWFwW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg56e76Zmk5p+Q5Liq5a+56LGhXHJcbiAgICAgICAgICogQHJldHVybnMg6KKr56e76Zmk5a+56LGhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUmVtb3ZlKGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgICAgIHZhciBPYmo6IFQgPSB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICAgICAgaWYgKE9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTWFwW2tleV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOmUrlxyXG4gICAgICAgICAqIEByZXR1cm5zIOaYr+WQpuaLpeaciVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5vZGU8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9WYWx1ZTogVDtcclxuICAgICAgICBwcml2YXRlIF9OZXh0OiBOb2RlPFQ+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgVmFsdWUoKTogVCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFZhbHVlKHZhbHVlOiBUKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBOZXh0KCk6IE5vZGU8VD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IE5leHQobm9kZTogTm9kZTxUPikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIE5vZGVQb29sPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9Ob2RlTGlzdDogTm9kZTxUPjtcclxuICAgICAgICBQdWxsQmFjayhub2RlOiBOb2RlPFQ+KSB7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fTm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0Lk5leHQgPSBub2RlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFxdWlyZSgpOiBOb2RlPFQ+IHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6IE5vZGU8VD4gPSB0aGlzLl9Ob2RlTGlzdDtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0ID0gdGhpcy5fTm9kZUxpc3QuTmV4dDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5vZGVRdWV1ZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX0NvdW50O1xyXG4gICAgICAgIHByaXZhdGUgX0hlYWQ6IE5vZGU8VD5cclxuICAgICAgICBwcml2YXRlIF9UYWlsZVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBvcE5vZGUoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9Db3VudCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IG51bGw7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9IZWFkO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkID0gdGhpcy5fSGVhZC5OZXh0O1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICAvL+WIq+aKiuWwvuW3tOW4puWHuuWOu+S6hlxyXG4gICAgICAgICAgICBpZiAodGhpcy5fQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbGUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1c2godmFsdWU6IFQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6IE5vZGU8VD4gPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICBub2RlLlZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaE5vZGUobm9kZTogTm9kZTxUPikge1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fSGVhZCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsZS5OZXh0ID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG5vZGU7XHJcbiAgICAgICAgICAgICsrdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBDbGVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEhlYWROb2RlKCk6IE5vZGU8VD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5IZWFkTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIZWFkVmFsdWUoKTogVCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9IZWFkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fSGVhZC5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFRhaWxOb2RlKCk6IE5vZGU8VD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWlsTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBUYWlsVmFsdWUoKTogVCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UYWlsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1RhaWxlLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBRdWV1ZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX05vZGVQb29sOiBOb2RlUG9vbDxUPjtcclxuICAgICAgICBwcml2YXRlIF9Ob2RlUXVldWU6IE5vZGVRdWV1ZTxUPjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVQb29sID0gbmV3IE5vZGVQb29sPFQ+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVRdWV1ZSA9IG5ldyBOb2RlUXVldWU8VD4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoKHZhbHVlOiBUKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOiBOb2RlPFQ+ID0gdGhpcy5fTm9kZVBvb2wuQXF1aXJlKCk7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fTm9kZVF1ZXVlLlB1c2hOb2RlKG5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBvcCgpOiBUIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6IE5vZGU8VD4gPSB0aGlzLl9Ob2RlUXVldWUuUG9wTm9kZSgpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fTm9kZVBvb2wuUHVsbEJhY2sobm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9Ob2RlUXVldWUuQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFNtb290aERhbXBWZWN0b3IzIHtcclxuICAgICAgICBwcml2YXRlIG1fQ3VycmVudFZlbG9jaXR5OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1Ntb290aFRpbWU6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1fTWF4U3BlZWQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1fTWF4TW92ZU51bTpudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc21vb3RoVGltZTogbnVtYmVyLCBtYXhTcGVlZDogbnVtYmVyID0gMTApIHtcclxuICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9TbW9vdGhUaW1lID0gc21vb3RoVGltZTtcclxuICAgICAgICAgICAgdGhpcy5tX01heFNwZWVkID0gbWF4U3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMubV9NYXhNb3ZlTnVtID0gdGhpcy5tX01heFNwZWVkICogdGhpcy5tX1Ntb290aFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBTbW9vdGhEYW1wKGN1cnJlbnQ6bnVtYmVyLHRhcmdldDpudW1iZXIsZGVsdGFUaW1lOm51bWJlciA9IDEvNjApOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG51bTpudW1iZXIgPSAyL3RoaXMubV9TbW9vdGhUaW1lO1xyXG4gICAgICAgICAgICB2YXIgbnVtMjpudW1iZXIgPSBudW0gKiBkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIHZhciBudW0zOm51bWJlciA9IDEvKDErbnVtMiswLjQ4Km51bTIqbnVtMiswLjIzNSpudW0yKm51bTIqbnVtMik7XHJcbiAgICAgICAgICAgIHZhciBudW00Om51bWJlciA9IGN1cnJlbnQgLSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHZhciBudW01Om51bWJlciA9IHRhcmdldDtcclxuICAgICAgICAgICAgdmFyIG51bTY6bnVtYmVyID0gdGhpcy5tX01heFNwZWVkICogdGhpcy5tX1Ntb290aFRpbWU7XHJcbiAgICAgICAgICAgIG51bTQgPSBudW00ID4tbnVtNiYmbnVtNDxudW02P251bTQ6KG51bTQ+bnVtNj9udW02Oi1udW02KTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gY3VycmVudCAtIG51bTQ7XHJcbiAgICAgICAgICAgIHZhciBudW03Om51bWJlciA9ICh0aGlzLm1fQ3VycmVudFZlbG9jaXR5K251bSpudW00KSpkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJyZW50VmVsb2NpdHkgPSAodGhpcy5tX0N1cnJlbnRWZWxvY2l0eSAtIG51bSpudW03KSpudW0zO1xyXG4gICAgICAgICAgICB2YXIgbnVtODpudW1iZXIgPSB0YXJnZXQgKyhudW00K251bTcpKm51bTM7XHJcbiAgICAgICAgICAgIGlmKG51bTUgLSBjdXJyZW50ID4gMCA9PSBudW04Pm51bTUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG51bTggPSBudW01O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9IChudW04IC0gbnVtNSkvZGVsdGFUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudW04O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgIHB1YmxpYyBDb3VudChjdXJQUzogTGF5YS5WZWN0b3IzLCB0YXJnZXRQUzogTGF5YS5WZWN0b3IzLCBkZWx0YVRpbWU6IG51bWJlciA9IDEgLyA2MCk6TGF5YS5WZWN0b3IzIHtcclxuICAgICAgICAgICAgdmFyIG1heE1vdmU6IG51bWJlciA9IHRoaXMubV9NYXhNb3ZlTnVtO1xyXG4gICAgICAgICAgICB2YXIgcnVuVGltZVJhdGU6IG51bWJlciA9IDIgKiBkZWx0YVRpbWUgLyB0aGlzLm1fU21vb3RoVGltZTtcclxuICAgICAgICAgICAgdmFyIHRpbWVSYXRpbzogbnVtYmVyID0gMSAvICgxICsgcnVuVGltZVJhdGUgKyAwLjQ4ICogcnVuVGltZVJhdGUgKiBydW5UaW1lUmF0ZSArIDAuMjM1ICogcnVuVGltZVJhdGUgKiBydW5UaW1lUmF0ZSAqIHJ1blRpbWVSYXRlKTtcclxuICAgICAgICAgICAgdmFyIGdhcDogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UFMsIGN1clBTLCBnYXApO1xyXG4gICAgICAgICAgICB2YXIgbW92ZURpcjogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMubm9ybWFsaXplKGdhcCwgbW92ZURpcik7XHJcbiAgICAgICAgICAgIC8v6YCf5bqm5L+u5q2jXHJcbiAgICAgICAgICAgIHZhciBtb3ZlRGlzdGFuY2U6IG51bWJlciA9IExheWEuVmVjdG9yMy5kaXN0YW5jZSh0YXJnZXRQUywgY3VyUFMpO1xyXG4gICAgICAgICAgICBtb3ZlRGlzdGFuY2UgPSBtb3ZlRGlzdGFuY2UgPCBtYXhNb3ZlICYmIG1vdmVEaXN0YW5jZSA+IC1tYXhNb3ZlID8gbW92ZURpc3RhbmNlIDogKG1vdmVEaXN0YW5jZSA+IG1heE1vdmUgPyBtYXhNb3ZlIDogLW1heE1vdmUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1ck1vdmVEaXN0YWNuZTpudW1iZXIgPSAoIHRoaXMubV9DdXJyZW50VmVsb2NpdHkgKyAyKihtb3ZlRGlzdGFuY2UvdGhpcy5tX1Ntb290aFRpbWUpKSpkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJyZW50VmVsb2NpdHkgPSAodGhpcy5tX0N1cnJlbnRWZWxvY2l0eSAtIDIqY3VyTW92ZURpc3RhY25lL3RoaXMubV9TbW9vdGhUaW1lKSp0aW1lUmF0aW87XHJcbiAgICAgICAgICAgIHZhciBlbmRQUzpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2NhbGUgPSAobW92ZURpc3RhbmNlICsgY3VyTW92ZURpc3RhY25lKSp0aW1lUmF0aW87XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zY2FsZShtb3ZlRGlyLHNjYWxlLGVuZFBTKTtcclxuICAgICAgICAgICAgLy9MYXlhLlZlY3RvcjMuYWRkKHRhcmdldFBTLGVuZFBTLGVuZFBTKVxyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKGN1clBTLGVuZFBTLGVuZFBTKTtcclxuICAgICAgICAgICAgdmFyIGVuZE1vdmVEaXI6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QoY3VyUFMsZW5kUFMsZW5kTW92ZURpcik7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCBMYXlhLlZlY3RvcjMuZG90KG1vdmVEaXIsZW5kTW92ZURpcikgPCAwICkvL0xheWEuVmVjdG9yMy5kaXN0YW5jZSh0YXJnZXRQUyxjdXJQUykgKiBMYXlhLlZlY3RvcjMuZGlzdGFuY2UodGFyZ2V0UFMsZW5kUFMpPDAgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbmRQUyA9IHRhcmdldFBTO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGVuZFBTO1xyXG4gICAgICAgICAgICAvL0xheWEuVmVjdG9yMy5zY2FsZShtb3ZlRGlyLG1vdmVEaXN0YW5jZSxlbmQpO1xyXG4gICAgICAgICAgICAvL3RhcmdldFBTICsgTGF5YS5WZWN0b3IzLmFkZChtb3ZlRGlzdGFuY2UsY3VyTW92ZURpc3RhY25lLGVuZFNwZWVkKSAobW92ZURpc3RhbmNlICsgY3VyTW92ZURpc3RhY25lKTtcclxuICAgICAgICB9Ki9cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBMaW5rTm9kZUxpc3Q8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByaXZhdGUgX0hlYWROb2RlOk5vZGU8VD47XHJcbiAgICAgICAgICAgIHByaXZhdGUgX1RhaWxOb2RlOk5vZGU8VD47XHJcbiAgICBcclxuICAgICAgICAgICAgcHJpdmF0ZSBfQ291bnROb2RlOm51bWJlcjtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9IZWFkTm9kZSA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9IZWFkTm9kZS5OZXh0ID0gdGhpcy5fSGVhZE5vZGU7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlID0gdGhpcy5fSGVhZE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOiOt+WPluWktOe7k+eCueWAvFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdldCBIZWFkVmFsdWUoKTpUXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgdGhpcy5fSGVhZE5vZGUuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEFkZCh2YWx1ZTpUKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZTpOb2RlPFQ+ID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgICAgIG5ld05vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWRkTm9kZShuZXdOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBBZGROb2RlKG5ld05vZGU6Tm9kZTxUPilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fVGFpbE5vZGUhPXRoaXMuX0hlYWROb2RlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlLk5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9IZWFkTm9kZS5OZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG5cclxufSIsImV4cG9ydCBtb2R1bGUgRlNNIFxyXG57XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElGU01cclxuICAgIHtcclxuICAgICAgICBVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGU00gPFQgZXh0ZW5kcyBTdGF0ZT4gXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1clN0YXRlOlQ7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1N0YXRlRGljdDp7W25hbWU6c3RyaW5nXTpUfTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoIHN0YXJ0U3RhdGU6VCA9IG51bGwgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0N1clN0YXRlID0gc3RhcnRTdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDdXJTdGF0ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyU3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmlLnlj5jnirbmgIFcclxuICAgICAgICAgKiBAcGFyYW0gc3RhdGUg6K6+572u54q25oCBXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIENoYW5nZVN0YXRlKHN0YXRlOlQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0ZS5TZXRPd25lcih0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGN1clN0YXRlOlQgPSB0aGlzLm1fQ3VyU3RhdGU7XHJcbiAgICAgICAgICAgIGlmKGN1clN0YXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJTdGF0ZS5FbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJTdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICBjdXJTdGF0ZS5TdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyU3RhdGUgPSBjdXJTdGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY3VyU3RhdGUgPSB0aGlzLm1fQ3VyU3RhdGU7XHJcbiAgICAgICAgICAgIGlmKGN1clN0YXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJTdGF0ZS5VcGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RhdGVcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9vd25lcjpJRlNNO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG93bmVyOklGU00gPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX293bmVyID0gb3duZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU2V0T3duZXIob3duZXI6SUZTTSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9vd25lciA9IG93bmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZSgpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBFbmQoKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgU3RhcnQoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VNZ3Jcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZSgpO1xyXG59IiwiaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7QmFzZUZ1bmN9ICBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJhbWVXb3JrXHJcbntcclxuICAgIF9NZ3JNYXA6QmFzZUZ1bmMuTWFwPEJhc2VNYW5hZ2VyPjsvL0Jhc2VTdHJ1Y3QuTWFwPEJhc2VNYW5hZ2VyPjtcclxuICAgIF9UZW1NZ3JMaXN0OkFycmF5PEJhc2VNYW5hZ2VyPjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAgPSBuZXcgQmFzZUZ1bmMuTWFwPEJhc2VNYW5hZ2VyPigpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0ZNOkZyYW1lV29yaztcclxuICAgIHN0YXRpYyBnZXQgRk0oKTpGcmFtZVdvcmtcclxuICAgIHtcclxuICAgICAgICBpZihGcmFtZVdvcmsuX0ZNPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRnJhbWVXb3JrLl9GTSA9IG5ldyBGcmFtZVdvcmsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEZyYW1lV29yay5fRk07XHJcbiAgICB9XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtcE1nckxpc3QgPSBuZXcgQXJyYXk8QmFzZU1hbmFnZXI+KHRoaXMuX01nck1hcC5Db3VudCk7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwLmZvckVhY2goIChtZ3I6QmFzZU1hbmFnZXIgLCBrZXk6c3RyaW5nKTp2b2lkID0+e1xyXG4gICAgICAgICAgICB0ZW1wTWdyTGlzdC5wdXNoKG1ncik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0ZW1wTWdyTGlzdC5mb3JFYWNoKChtZ3IsaWR4KT0+e21nci5VcGRhdGUoKTt9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWRkTWFuYWdlcjxUIGV4dGVuZHMgQmFzZU1hbmFnZXI+KCB0eXBlOntuZXcgKCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSApOlRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9NZ3JNYXAuSGFzKHR5cGUuTmFtZSgpKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9NZ3JNYXAuR2V0KHR5cGUuTmFtZSgpKSBhcyBUO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3TWdyOlQgPSBuZXcgdHlwZSgpO1xyXG4gICAgICAgIHRoaXMuX01nck1hcC5TZXQobmV3TWdyLHR5cGUuTmFtZSgpKTtcclxuICAgICAgICByZXR1cm4gIG5ld01ncjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEdldE1hbmFnZXI8VCBleHRlbmRzIEJhc2VNYW5hZ2VyPih0eXBlOntuZXcgKCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSk6VHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fTWdyTWFwLkdldCh0eXBlLk5hbWUoKSkgYXMgVDtcclxuICAgIH1cclxufSIsIi8qKuS9nOiAhTpNb1xyXG4gKiDmtojmga/mjqfliLblmahcclxuICovXHJcbmltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5leHBvcnQgbW9kdWxlIE1lc3NhZ2VNRCB7XHJcbiAgICBleHBvcnQgY29uc3QgR2FtZUV2ZW50ID1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckRlYXRoOiBcIlBsYXllckRlYXRoXCIsXHJcbiAgICAgICAgICAgIEdhbWVUaW1lVXA6IFwiR2FtZVRpbWVVcFwiLFxyXG4gICAgICAgICAgICBHYW1lQ29udGludWU6IFwiR2FtZUNvbnRpbnVlXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1lc3NhZ2VDZW50ZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciAge1xyXG4gICAgICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJNZXNzYWdlQ2VudGVyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6IE1lc3NhZ2VDZW50ZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfRXZlbnREaWN0OiB7IFtLZXk6IHN0cmluZ106IE1FdmVudCB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5bkuovku7ZcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIF9HZXRFdmVudChuYW1lOiBzdHJpbmcpOiBNRXZlbnQgIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50OiBNRXZlbnQgPSB0aGlzLl9FdmVudERpY3RbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChldmVudCA9PSB1bmRlZmluZWQgfHwgZXZlbnQgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IE1FdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0W25hbWVdID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXZlbnQgPSB0aGlzLl9FdmVudERpY3RbbmFtZV07XHJcbiAgICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9FdmVudERpY3QgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDms6jlhoxcclxuICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIOWnlOaJmFxyXG4gICAgICAgICogQHBhcmFtIHtPYmp9IGxpc3RlbmVyIOebkeWQrOiAhVxyXG4gICAgICAgICovXHJcbiAgICAgICAgUmVnaXN0KG5hbWU6IHN0cmluZywgYWN0aW9uOiAoKSA9PiB2b2lkLCBsaXN0ZW5lcjogT2JqZWN0KTpNRXZlbnQgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG5ld0RsZ3Q6IERlbGVnYXRlID0gbmV3IERlbGVnYXRlKGxpc3RlbmVyLCBhY3Rpb24pO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5BZGQobmV3RGxndCk7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRFdmVudFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo6ZSA5p+Q5Liq55uR5ZCsXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIOWnlOaJmFxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqfSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAgKi9cclxuICAgICAgICBEZXNSZWdpc3QobmFtZTogc3RyaW5nLCBhY3Rpb246ICgpID0+IHZvaWQsIGxpc3RlbmVyOiBPYmplY3QpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LlJtdihhY3Rpb24sIGxpc3RlbmVyKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo6ZSA5p+Q5Liq5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmdpc3RJREsobmFtZTogc3RyaW5nKSAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6IE1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEZpcmUobmFtZTogc3RyaW5nLCBwYXJhbTogYW55ID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WnlOaJmFxyXG4gICAgZXhwb3J0IGNsYXNzIERlbGVnYXRlIHtcclxuICAgICAgICBMaXN0ZW5lcjogT2JqZWN0O1xyXG4gICAgICAgIEFjdGlvbjogKHBhcmFtOmFueSkgPT4gdm9pZDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRXhlY3V0ZShwYXJhbTogYW55ID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgdGhpcy5BY3Rpb24uY2FsbCh0aGlzLkxpc3RlbmVyLCBwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGxpc3RlbmVyOiBPYmplY3QsIGFjdGlvbjogKHBhcmFtOmFueSkgPT4gdm9pZCkgIHtcclxuICAgICAgICAgICAgdGhpcy5MaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgICAgICB0aGlzLkFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+S6i+S7tlxyXG4gICAgZXhwb3J0IGNsYXNzIE1FdmVudCB7XHJcbiAgICAgICAgRGVsZWdhdGVMaXN0OiBBcnJheTxEZWxlZ2F0ZT47XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgICAgICB0aGlzLlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog5re75Yqg5aeU5omYXHJcbiAgICAgICAgKiBAcGFyYW0ge0RlbGVnYXRlfSBkbGcg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgKi9cclxuICAgICAgICBBZGQoZGxnOiBEZWxlZ2F0ZSkgIHtcclxuICAgICAgICAgICAgdGhpcy5EZWxlZ2F0ZUxpc3QucHVzaChkbGcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIOenu+mZpOWnlOaJmFxyXG4gICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmVyIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICovXHJcbiAgICAgICAgUm12KGFjdGlvbjogKCkgPT4gdm9pZCwgbGlzdGVuZXI6IE9iamVjdCA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHZhciBkbGd0TGlzdDogQXJyYXk8RGVsZWdhdGU+ID0gdGhpcy5EZWxlZ2F0ZUxpc3Q7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGFycklkeDogbnVtYmVyID0gZGxndExpc3QubGVuZ3RoIC0gMTsgYXJySWR4ID4gLTE7IC0tYXJySWR4KSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRsZ3QgPSBkbGd0TGlzdFthcnJJZHhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSBkbGd0LkFjdGlvbiAmJiBsaXN0ZW5lciA9PSBkbGd0Lkxpc3RlbmVyKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRsZ3RMaXN0LnNwbGljZShhcnJJZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mHjee9rlxyXG4gICAgICAgIFJlc2V0KCkgIHtcclxuICAgICAgICAgICAgdGhpcy5EZWxlZ2F0ZUxpc3QgPSBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICovXHJcbiAgICAgICAgRXhlY3V0ZShwYXJhbTogYW55KSAge1xyXG4gICAgICAgICAgICB2YXIgZGxndExpc3Q6IEFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhcnJJZHg6IG51bWJlciA9IGRsZ3RMaXN0Lmxlbmd0aCAtIDE7IGFycklkeCA+IC0xOyAtLWFycklkeCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgICAgIGRsZ3QuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuLy4uL1NjZW5lL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vLi4vU2NlbmUvQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiXHJcbmltcG9ydCB7RlNNfSBmcm9tIFwiLi8uLi9CYXNlL0ZTTVwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgbV9TY2VuZUZTTTogU2NlbmUuU2NlbmVGU007XHJcbiAgICBwcml2YXRlIG1fU2NlbmVOb2RlOiBMYXlhLk5vZGU7XHJcbiAgICBcclxuICAgIGdldCBDdXJTY2VuZSgpOlNjZW5lLkJhc2VTY2VuZSB7XHJcbiAgICAgICAgaWYodGhpcy5tX1NjZW5lRlNNLkN1clN0YXRlKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX1NjZW5lRlNNLkN1clN0YXRlO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZ2V0IEN1ckRpcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clNjZW5lLkRpcmVjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2NlbmVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9CR0xheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLl9CR0xheWVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5tX1NjZW5lRlNNID0gbmV3IFNjZW5lLlNjZW5lRlNNKCk7XHJcbiAgICAgICAgdGhpcy5tX1NjZW5lTm9kZSA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU3ByaXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDaGFuZ2VTY2VuZShuZXdTY2VuZTogU2NlbmUuQmFzZVNjZW5lKSAge1xyXG4gICAgICAgIHRoaXMubV9TY2VuZUZTTS5DaGFuZ2VTdGF0ZShuZXdTY2VuZSk7XHJcbiAgICAgICAgaWYobmV3U2NlbmUuU2NlbmVPYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fU2NlbmVOb2RlLmFkZENoaWxkKG5ld1NjZW5lLlNjZW5lT2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ml6fpgLvovpFcclxuICAgIHByaXZhdGUgX0JHOiBMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX0JHTGF5ZXI6IExheWEuU3ByaXRlO1xyXG4gICAgXHJcbiAgICBzZXQgQkcoYmc6IExheWEuU3ByaXRlKSB7XHJcbiAgICAgICAgaWYgKCFiZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9CRykge1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5yZW1vdmVTZWxmO1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgdGhpcy5fQkcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0JHLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIuYWRkQ2hpbGQodGhpcy5fQkcpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEJHKCk6TGF5YS5TcHJpdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX0JHO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKirkvZzogIVNb1xyXG4qIOWcuuaZr+WKn+iDvVxyXG4qL1xyXG4vKlxyXG4vL+WcuuaZr+euoeeQhlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIF9CRzogTGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9CR0xheWVyOiBMYXlhLlNwcml0ZTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllciA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fQkdMYXllcik7XHJcbiAgICAgICAgLy/mt7vliqDlnLrmma/nrqHnkIZcclxuICAgICAgICB0aGlzLlNjZW5lTm9kZSA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU3ByaXRlKCkpO1xyXG4gICAgfVxyXG4gICAgc2V0IEJHKGJnOiBMYXlhLlNwcml0ZSkge1xyXG4gICAgICAgIGlmICghYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQkcpIHtcclxuICAgICAgICAgICAgdGhpcy5fQkcucmVtb3ZlU2VsZjtcclxuICAgICAgICAgICAgdGhpcy5fQkcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIHRoaXMuX0JHLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9CRy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyLmFkZENoaWxkKHRoaXMuX0JHKTtcclxuICAgIH1cclxuICAgIGdldCBCRygpOkxheWEuU3ByaXRlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9CRztcclxuICAgIH1cclxuICAgIFNjZW5lTm9kZTogTGF5YS5Ob2RlO1xyXG5cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2NlbmVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfQ3VyU2NlbmU6IEJhc2VTY2VuZTtcclxuICAgIGdldCBDdXJTY2VuZSgpOiBCYXNlU2NlbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZTtcclxuICAgIH1cclxuICAgIHNldCBDdXJTY2VuZSh2YWx1ZTogQmFzZVNjZW5lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N1clNjZW5lICYmIHRoaXMuX0N1clNjZW5lLlNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0N1clNjZW5lLlNjZW5lLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQ3VyU2NlbmUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5fQ3VyU2NlbmUgJiYgdGhpcy5fQ3VyU2NlbmUuU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5TY2VuZU5vZGUuYWRkQ2hpbGQodGhpcy5fQ3VyU2NlbmUuU2NlbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBDdXJEaXIoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU2NlbmUuQ3VyRGlyO1xyXG4gICAgfVxyXG5cclxuICAgIEVudGVyU2NlbmUodGFyZ2V0U2NlbmU6IEJhc2VTY2VuZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUgPSB0YXJnZXRTY2VuZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuTGVhdmUodGFyZ2V0U2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4qLyIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiVGltZU1hbmFnZXJcIjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbV9TdGFydFRpbWU6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0dhbWVUaW1lOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9GcmFtZVRpbWU6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0lzUGF1c2VkOmJvb2xlYW47XHJcblxyXG4gICAgcHVibGljIGdldCBTdGFydFRpbWVyKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9TdGFydFRpbWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVUaW1lKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9HYW1lVGltZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1N0YXJ0VGltZSA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgIHRoaXMubV9HYW1lVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0ZyYW1lVGltZSA9IDEgL051bWJlcihMYXlhLnN0YWdlLmZyYW1lUmF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgaWYodGhpcy5tX0lzUGF1c2VkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fR2FtZVRpbWUgKz0gdGhpcy5tX0ZyYW1lVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGF1c2UoKXtcclxuICAgICAgICB0aGlzLm1fSXNQYXVzZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDb250aW51ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0lzUGF1c2VkID0gZmFsc2VcclxuICAgIH1cclxufSIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL3VpL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IFVJRnVuYyB9IGZyb20gXCIuLy4uL1V0aWxpdHkvVUlGdW5jXCJcclxuaW1wb3J0IHsgQmFzZUZ1bmMgfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuZW51bSBOb2RlVHlwZSB7XHJcbiAgICBCb3R0b20sXHJcbiAgICBNaWRkbGUsXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXIge1xyXG4gICAgc3RhdGljIGdfVUlXaWR0aCA9IDc1MDtcclxuICAgIHN0YXRpYyBnX1VJSGVpZ2h0ID0gMTMzNDtcclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcml2YXRlIG1fUm9vdE5vZGU6IExheWEuQm94O1xyXG4gICAgcHJpdmF0ZSBtX0JvdHRvbU5vZGU6IExheWEuQm94O1xyXG4gICAgcHJpdmF0ZSBtX01pZGxlTm9kZTogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIF9VSURpY3Q6IHsgW25hbWU6IHN0cmluZ106IEJhc2VVSSB9O1xyXG4gICAgcHJpdmF0ZSBfVXBkYXRlQ291bnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9VcGRhdGVUaW1lOm51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIEFkZE5vZGUobm9kZTogTm9kZVR5cGUpOiB2b2lkICB7XHJcbiAgICAgICAgdmFyIG5vZGVCb3g6IExheWEuQm94ID0gbmV3IExheWEuQm94KCk7XHJcbiAgICAgICAgbm9kZUJveC50b3AgPSAwO1xyXG4gICAgICAgIG5vZGVCb3guYm90dG9tID0gMDtcclxuICAgICAgICBub2RlQm94LmxlZnQgPSAwO1xyXG4gICAgICAgIG5vZGVCb3gucmlnaHQgPSAwO1xyXG4gICAgICAgIHN3aXRjaCAobm9kZSkgIHtcclxuICAgICAgICAgICAgY2FzZSBOb2RlVHlwZS5Cb3R0b206XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQm90dG9tTm9kZSA9IG5vZGVCb3g7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9NaWRsZU5vZGUgPSBub2RlQm94O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9Sb290Tm9kZS5hZGRDaGlsZChub2RlQm94KTtcclxuICAgICAgICAvL0xheWEuc3RhZ2UuYWRkQ2hpbGQobm9kZUJveCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyAge1xyXG4gICAgICAgIHJldHVybiBcIlVJTWFuYWdlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciByb290Qm94ID0gbmV3IExheWEuQm94KCk7XHJcbiAgICAgICAgcm9vdEJveC53aWR0aCA9IFVJTWFuYWdlci5nX1VJV2lkdGg7XHJcbiAgICAgICAgcm9vdEJveC5oZWlnaHQgPSBVSU1hbmFnZXIuZ19VSUhlaWdodDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHJvb3RCb3gpO1xyXG4gICAgICAgIHRoaXMubV9Sb290Tm9kZSA9IHJvb3RCb3g7XHJcbiAgICAgICAgdGhpcy5vblNpemVDaGFuZ2UoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMubV9Sb290Tm9kZSk7XHJcbiAgICAgICAgdGhpcy5tX1VwZGF0ZVRpbWUgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLkFkZE5vZGUoTm9kZVR5cGUuQm90dG9tKTtcclxuICAgICAgICB0aGlzLkFkZE5vZGUoTm9kZVR5cGUuTWlkZGxlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9VSURpY3QgPSB7fTtcclxuICAgICAgICB0aGlzLl9VcGRhdGVDb3VudCA9IDA7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50LlJFU0laRSwgdGhpcywgdGhpcy5vblNpemVDaGFuZ2UpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uU2l6ZUNoYW5nZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJvb3RCb3ggPSB0aGlzLm1fUm9vdE5vZGU7XHJcbiAgICAgICAgVUlGdW5jLkZpeFVJKHJvb3RCb3gsVUlNYW5hZ2VyLmdfVUlXaWR0aCk7XHJcbiAgICAgICAgLypcclxuICAgICAgICB2YXIgc2NhbGUgPSBVSUZ1bmMuQ291bnRTY2FsZUZpeChVSU1hbmFnZXIuZ19VSVdpZHRoKTtcclxuICAgICAgICB2YXIgcm9vdEJveCA9IHRoaXMubV9Sb290Tm9kZTtcclxuICAgICAgICByb290Qm94LnNjYWxlWCA9IHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3guc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgcm9vdEJveC5oZWlnaHQgPSBVSU1hbmFnZXIuZ19VSUhlaWdodCAqIHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3gud2lkdGggPSBVSU1hbmFnZXIuZ19VSVdpZHRoOyovXHJcbiAgICAgICAgaWYoIXRoaXMubV9Cb3R0b21Ob2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG51bUNoaWxkID0gdGhpcy5tX0JvdHRvbU5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbnVtQ2hpbGQ7aSArKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlLmdldENoaWxkQXQoaSk7XHJcbiAgICAgICAgICAgIGlmKG5vZGUgJiYgbm9kZVtcIkxheW91dFwiXSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZVtcIkxheW91dFwiXSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBudW1DaGlsZCA9IHRoaXMubV9Cb3R0b21Ob2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IG51bUNoaWxkO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZS5nZXRDaGlsZEF0KGkpO1xyXG4gICAgICAgICAgICBpZihub2RlICYmIG5vZGVbXCJMYXlvdXRcIl0pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVbXCJMYXlvdXRcIl0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKSAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5a6a5bin5Yi35pawVUlcclxuICAgICAgICBpZiAodGhpcy5tX1VwZGF0ZVRpbWUgPCBMYXlhLnRpbWVyLmN1cnJUaW1lcikgIHtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVVSSh0aGlzLm1fQm90dG9tTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkodGhpcy5tX01pZGxlTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VwZGF0ZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX1VwZGF0ZVRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lciArIDMwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlVUkobm9kZTogTGF5YS5TcHJpdGUpICB7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4OiBudW1iZXIgPSAwOyBpZHggPCBub2RlLm51bUNoaWxkcmVuOyArK2lkeCkgIHtcclxuICAgICAgICAgICAgdmFyIHVpOiBCYXNlVUkgPSBub2RlLmdldENoaWxkQXQoaWR4KSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIHVpLlVJVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgQWRkVUkoKSAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBTaG93PFQgZXh0ZW5kcyBCYXNlVUk+KHVpQ2xhc3M6IHsgbmV3KG5hbWU6IHN0cmluZyk6IFQ7IE5hbWUoKTogc3RyaW5nIH0pOiBUICB7XHJcbiAgICAgICAgdmFyIHN0cjogc3RyaW5nID0gdWlDbGFzcy5OYW1lKCk7XHJcbiAgICAgICAgdmFyIG5ld1VJOiBCYXNlVUkgPSB0aGlzLkdldFVJQnlOYW1lKHN0cik7XHJcbiAgICAgICAgbmV3VUkgPSBuZXdVSSA9PSBudWxsID8gdGhpcy5BZGRVSUJ5TmFtZShzdHIsIG5ldyB1aUNsYXNzKHN0cikpIDogbmV3VUk7XHJcbiAgICAgICAgdmFyIG5vZGU6IExheWEuU3ByaXRlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKG5ld1VJLlVJVHlwZSkgIHtcclxuICAgICAgICAgICAgLy/kuK3lsYLmrKFVSVxyXG4gICAgICAgICAgICBjYXNlIEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX01pZGxlTm9kZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1fTWlkbGVOb2RlLm51bUNoaWxkcmVuIDw9IDApICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pgJrnn6Xlr7zmvJTmmoLlgZzmuLjmiI9cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLlRpbWVVcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8v6buY6K6kVWnlhajmmK/kvY7lsYLmrKFVSVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2hpbGROdW06IG51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgLy/miorkupLmlqXnmoTnqpflj6PlhbPmjolcclxuICAgICAgICBpZiAobmV3VUkuSXNNdXRleCAmJiBjaGlsZE51bSA+IDApICB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VUkgPSBub2RlLmdldENoaWxkQXQobm9kZS5udW1DaGlsZHJlbiAtIDEpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgaWYgKCFsYXN0VUkuSXNNdXRleClcclxuICAgICAgICAgICAgICAgIGxhc3RVSS5IaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlLmFkZENoaWxkKG5ld1VJKTtcclxuICAgICAgICBuZXdVSS5PcGVuT1AoKTtcclxuICAgICAgICBpZiAobmV3VUkuVUlUeXBlID09IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGUgJiYgbm9kZS5udW1DaGlsZHJlbiA+IDApIHtcclxuICAgICAgICAgICAgbm9kZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXdVSSBhcyBUO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKHVpOiBCYXNlVUkpICB7XHJcbiAgICAgICAgdWkucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIHVpLkNsb3NlT1AoKTtcclxuICAgICAgICB2YXIgbm9kZTogTGF5YS5TcHJpdGUgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAodWkuVUlUeXBlKSAge1xyXG4gICAgICAgICAgICAvL+S4reWxguasoVVJXHJcbiAgICAgICAgICAgIGNhc2UgQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fTWlkbGVOb2RlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLm51bUNoaWxkcmVuIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgLy8gdGhpcy5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5YWz6Zet56qX5Y+jIOmAmuefpea4uOaIj+e7p+e7rVxyXG4gICAgICAgICAgICAgICAgICAgIC8vQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuQ29udGludWVUaW1lKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNoaWxkTnVtOiBudW1iZXIgPSBub2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIGlmIChjaGlsZE51bSA+IDApICB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VUk6IEJhc2VVSSA9IG5vZGUuZ2V0Q2hpbGRBdChjaGlsZE51bSAtIDEpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgbGFzdFVJLk9wZW5PUCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBDbG9zZUN1clZpZXcoKSAge1xyXG4gICAgICAgIHZhciB1aTogQmFzZVVJID0gdGhpcy5tX0JvdHRvbU5vZGUuZ2V0Q2hpbGRBdCh0aGlzLm1fQm90dG9tTm9kZS5udW1DaGlsZHJlbiAtIDEpIGFzIEJhc2VVSTtcclxuICAgICAgICB0aGlzLkNsb3NlKHVpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIoOmZpOaJgOacieiKgueCueS4iueahFVJXHJcbiAgICBDbGVhcigpICB7XHJcbiAgICAgICAgdmFyIHVpTm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlO1xyXG4gICAgICAgIHdoaWxlICh1aU5vZGUubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVpTm9kZSA9IHRoaXMubV9NaWRsZU5vZGVcclxuICAgICAgICB3aGlsZSAodWlOb2RlLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZVVJOiBCYXNlVUkgPSB1aU5vZGUuZ2V0Q2hpbGRBdCgwKSBhcyBCYXNlVUk7Ly8ucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB0aGlzLkNsb3NlKGNsb3NlVUkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBHZXRVSUJ5TmFtZShuYW1lOiBzdHJpbmcpOiBCYXNlVUkgIHtcclxuICAgICAgICB2YXIgdWkgPSB0aGlzLl9VSURpY3RbbmFtZV07XHJcbiAgICAgICAgdWkgPSB1aSA9PSB1bmRlZmluZWQgPyBudWxsIDogdWk7XHJcbiAgICAgICAgcmV0dXJuIHVpO1xyXG4gICAgfVxyXG4gICAgQWRkVUlCeU5hbWUobmFtZTogc3RyaW5nLCB1aTogQmFzZVVJKTogQmFzZVVJICB7XHJcbiAgICAgICAgdGhpcy5fVUlEaWN0W25hbWVdID0gdWk7XHJcbiAgICAgICAgcmV0dXJuIHVpO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgUm9sZUVsZW1lbnQgZnJvbSBcIi4vc2NyaXB0L1JvbGVFbGVtZW50XCJcbmltcG9ydCBJdGVtRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvSXRlbUVsZW1lbnRcIlxyXG4vKlxyXG4qIOa4uOaIj+WIneWni+WMlumFjee9rjtcclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHN0YXRpYyB3aWR0aDpudW1iZXI9NjQwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9MTEzNjtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwiZml4ZWR3aWR0aFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwibm9uZVwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJ0b3BcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwibGVmdFwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiRW5kR2FtZS5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L1JvbGVFbGVtZW50LnRzXCIsUm9sZUVsZW1lbnQpO1xuICAgICAgICByZWcoXCJzY3JpcHQvSXRlbUVsZW1lbnQudHNcIixJdGVtRWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3Rlck1hbmFnZXIgZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX01ncjogQ2hhcmFjdGVyTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IE1ncigpOiBDaGFyYWN0ZXJNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIUNoYXJhY3Rlck1hbmFnZXIuZ19NZ3IpIHtcclxuICAgICAgICAgICAgQ2hhcmFjdGVyTWFuYWdlci5nX01nciA9IG5ldyBDaGFyYWN0ZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJNYW5hZ2VyLmdfTWdyO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJDaGFyYWN0ZXJJbmZvXCIpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIEdlbkluZm8oZGF0YTphbnkpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDaGFyYWN0ZXJJbmZvKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRTa2lsbEl0ZW0oaWQpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBpbmZvOkNoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmKGluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvLkl0ZW07XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFByaWNlKGlkKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgaW5mbzpDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZihpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm4gaW5mby5QcmljZTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0Q2hhcmFjdGVySW5mbyhpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRDaGFyYWN0ZXJNb2RlbChpZDogbnVtYmVyLCBsZXZlbDogbnVtYmVyKTogTGF5YS5TcHJpdGUzRCB7XHJcbiAgICAgICAgdmFyIGluZm86Q2hhcmFjdGVySW5mbyA9IHRoaXMuR2V0SW5mbzxDaGFyYWN0ZXJJbmZvPihpZCk7XHJcbiAgICAgICAgaWYoIWluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlckRhdGE6IENoYXJhY3RlckluZm8gPSB0aGlzLkdldENoYXJhY3RlckluZm8oaWQpO1xyXG4gICAgICAgIHZhciBzYW1wbGVNb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldExIKGNoYXJhY3RlckRhdGEuR2V0TmFtZShsZXZlbCkpKTtcclxuICAgICAgICB2YXIgbW9kZWwgPSBzYW1wbGVNb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIHJldHVybiBtb2RlbDtcclxuICAgIH1cclxufVxyXG5jbGFzcyBDaGFyYWN0ZXJJbmZvIGV4dGVuZHMgR2FtZU1hbmFnZXIuQmFzZUluZm8ge1xyXG4gICAgcHJpdmF0ZSBtX1ByaWNlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fTW9kZWxJRDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX1N0YXRlTHNpdDogQXJyYXk8c3RyaW5nPjtcclxuICAgIHByaXZhdGUgbV9FeHRlbmRJRDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW06IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IEl0ZW0oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0l0ZW07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IFByaWNlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QcmljZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgSUQoKTogbnVtYmVyICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9JRDtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGNoYXJhY3RlckRhdGE6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKGNoYXJhY3RlckRhdGEpO1xyXG4gICAgICAgIHRoaXMubV9Nb2RlbElEID0gY2hhcmFjdGVyRGF0YS5Nb2RlbElEID8gY2hhcmFjdGVyRGF0YS5Nb2RlbElEIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fU3RhdGVMc2l0ID0gY2hhcmFjdGVyRGF0YS5TdGF0ZUxpc3QgPyBjaGFyYWN0ZXJEYXRhLlN0YXRlTGlzdCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW0gPSBjaGFyYWN0ZXJEYXRhLkl0ZW0gPyBjaGFyYWN0ZXJEYXRhLkl0ZW0gOiAtMTtcclxuICAgICAgICB0aGlzLm1fRXh0ZW5kSUQgPSBjaGFyYWN0ZXJEYXRhLkV4dGVuZElEID8gY2hhcmFjdGVyRGF0YS5FeHRlbmRJRCA6IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldE5hbWUobGV2ZWw6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIHN0YXRlOiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHRoaXMubV9TdGF0ZUxzaXQubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgc3RhdGUgPSB0aGlzLm1fU3RhdGVMc2l0W2xldmVsXSA/IHRoaXMubV9TdGF0ZUxzaXRbbGV2ZWxdIDogdGhpcy5tX1N0YXRlTHNpdFt0aGlzLm1fU3RhdGVMc2l0Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgc3RhdGUgPSBcIlwiO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW9kZWxJRCArIHN0YXRlICsgdGhpcy5tX0V4dGVuZElEO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuZXhwb3J0IG1vZHVsZSBHYW1lTWFuYWdlciB7XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZU1hbmFnZXIge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01hcDogeyBbbmFtZTogc3RyaW5nXTogQmFzZUluZm8gfTtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9Cb3R0b21JRDogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLm1fTWFwID0ge307XHJcbiAgICAgICAgICAgIHRoaXMubV9Cb3R0b21JRCA9IC0xO1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnSW5mbzogb2JqZWN0ID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0SnNvblBhdGgobmFtZSkpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29uZmlnSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBjb25maWdJbmZvW2tleV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YUluZm86IEJhc2VJbmZvID0gdGhpcy5HZW5JbmZvKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01hcFtkYXRhSW5mby5JRF0gPSBkYXRhSW5mbztcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhSW5mby5JRCAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fQm90dG9tSUQgPSBkYXRhSW5mby5JRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgR2VuSW5mbyhkYXRhKTogQmFzZUluZm87XHJcbiAgICAgICAgcHJvdGVjdGVkIEdldEluZm88VCBleHRlbmRzIEJhc2VJbmZvPihpZDogbnVtYmVyKTogVCAge1xyXG4gICAgICAgICAgICBpZiAoIWlkIHx8IGlkIDwgMCkgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIEJhc2VJbmZvID0gdGhpcy5tX01hcFtpZF07XHJcbiAgICAgICAgICAgIGlmICghQmFzZUluZm8pICB7XHJcbiAgICAgICAgICAgICAgICBCYXNlSW5mbyA9IHRoaXMubV9NYXBbdGhpcy5tX0JvdHRvbUlEXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQmFzZUluZm8pICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQmFzZUluZm8gYXMgVDtcclxuICAgICAgICAgICAgfSBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5ZJROaVsOe7hFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBHZXRJRExpc3QoKTogQXJyYXk8bnVtYmVyPiAge1xyXG4gICAgICAgICAgICB2YXIgbWFwOiB7IFtJRDogbnVtYmVyXTogQmFzZUluZm8gfSA9IHRoaXMubV9NYXA7XHJcbiAgICAgICAgICAgIHZhciBJRExpc3Q6IEFycmF5PG51bWJlcj4gPSBbXVxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFwKSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBtYXBba2V5XVxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBJRExpc3QucHVzaChkYXRhLklEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gSURMaXN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQmFzZUluZm8ge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0lEOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGdldCBJRCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0lEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9JRCA9IGRhdGEuSUQgPyBOdW1iZXIoZGF0YS5JRCkgOiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbU1hbmFnZXIgZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX01ncjogSXRlbU1hbmFnZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBNZ3IoKTogSXRlbU1hbmFnZXIge1xyXG4gICAgICAgIGlmICghSXRlbU1hbmFnZXIuZ19NZ3IpIHtcclxuICAgICAgICAgICAgSXRlbU1hbmFnZXIuZ19NZ3IgPSBuZXcgSXRlbU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEl0ZW1NYW5hZ2VyLmdfTWdyO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJJdGVtSW5mb1wiKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBHZW5JbmZvKGRhdGE6IGFueSk6IEdhbWVNYW5hZ2VyLkJhc2VJbmZvIHtcclxuICAgICAgICByZXR1cm4gbmV3IEl0ZW1JbmZvKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumBk+WFt+S7t+agvFxyXG4gICAgICogQHBhcmFtIGlkIOmBk+WFt0lEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQcmljZShpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgaW5mbzogSXRlbUluZm8gPSB0aGlzLkdldEluZm88SXRlbUluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uUHJpY2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiOt+WPlklE5pWw57uEXHJcbiAgICAqL1xyXG4gICAgcHVibGljIEdldFNlbGxJdGVtSURMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHZhciBtYXAgPSB0aGlzLm1fTWFwO1xyXG4gICAgICAgIHZhciBJRExpc3Q6IEFycmF5PG51bWJlcj4gPSBbXVxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBtYXApIHtcclxuICAgICAgICAgICAgdmFyIGRhdGE6IGFueSA9IG1hcFtrZXldXHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbUluZm86IEl0ZW1JbmZvID0gZGF0YSBhcyBJdGVtSW5mbztcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtSW5mby5QcmljZSA+PSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIElETGlzdC5wdXNoKGRhdGEuSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBJRExpc3Q7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEl0ZW1JbmZvIGV4dGVuZHMgR2FtZU1hbmFnZXIuQmFzZUluZm8ge1xyXG4gICAgcHJpdmF0ZSBtX01vZGVsTmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0V4dGVuZElEOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fUHJpY2U6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vZGVsTmFtZSArIHRoaXMubV9FeHRlbmRJRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUHJpY2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1ByaWNlO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoZGF0YSk7XHJcbiAgICAgICAgdGhpcy5tX01vZGVsTmFtZSA9IGRhdGEuTW9kZWxOYW1lID8gZGF0YS5Nb2RlbE5hbWUgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9FeHRlbmRJRCA9IGRhdGEuRXh0ZW5kSUQgPyBkYXRhLkV4dGVuZElEIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fUHJpY2UgPSBkYXRhLlByaWNlID8gTnVtYmVyKGRhdGEuUHJpY2UpIDogMDtcclxuICAgIH1cclxufSIsImltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbiAvKipcclxuICog6KGo546w55So55qE5a+56LGhXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEFuaW1PYmpcclxue1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIik7XHJcbiAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgZm9yKCBsZXQgY291bnQgPTA7Y291bnQgPCAzMDsrK2NvdW50IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1Db2luLG1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2VuQW5pbU9iajxUIGV4dGVuZHMgQmFzZUFuaW1PYmo+KCBhbmltQ2xhc3M6e25ldyAobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSxtb2RlbDpMYXlhLlNwcml0ZTNEICk6VFxyXG4gICAge1xyXG4gICAgICAgIHZhciBhbmltT2JqID0gTGF5YS5Qb29sLmdldEl0ZW0oYW5pbUNsYXNzLk5hbWUoKSk7XHJcbiAgICAgICAgaWYoYW5pbU9iaj09bnVsbClcclxuICAgICAgICAgICAgYW5pbU9iaiA9IG5ldyBhbmltQ2xhc3MoYW5pbUNsYXNzLk5hbWUoKSxtb2RlbCk7XHJcbiAgICAgICAgcmV0dXJuIGFuaW1PYmo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFic3RyYWN0IGNsYXNzIEJhc2VBbmltT2JqIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG4gICAge1xyXG4gICAgICAgIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5TY2VuZU9iai5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX0ZyYW1lRnVuYylcclxuICAgICAgICB9XHJcbiAgICAgICAgTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX05hbWU6c3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLm9uKExheWEuRXZlbnQuUkVNT1ZFRCx0aGlzLHRoaXMuX0xlYXZlU3RhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lRnVuYygpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0p1ZGdlQ29tcGxldGUoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0ZyYW1lTG9naWNGdW5jKCk7XHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuO1xyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKHRoaXMsdGhpcy5fRnJhbWVGdW5jKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZvcmNlTGVhdmVTdGFnZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBBbmltQ29pbiBleHRlbmRzIEJhc2VBbmltT2JqXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkFuaW1Db2luXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFNldFRhcmdldCggdGFyZ2V0OkxheWEuU3ByaXRlM0QgKSAgICBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgc3VwZXIuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFyZ2V0OkxheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIobmFtZSxtb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lTG9naWNGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBvc2l0aW9uID0gdGhpcy5fVGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBhZGRQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKGFkZFBTLDAuMSxhZGRQUyk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5hZGQoYWRkUFMscG9zaXRpb24scG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRMb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMubmFtZSx0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGRpc0RpciA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGRpc0Rpcik7XHJcbiAgICAgICAgICAgIGlmKCBMYXlhLlZlY3RvcjMuc2NhbGFyTGVuZ3RoU3F1YXJlZChkaXNEaXIpPDAuMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgbW9kdWxlIENoYXJhY3RlclxyXG57XHJcbiAgICBleHBvcnQgZW51bSBBbmltRW51bVxyXG4gICAge1xyXG4gICAgICAgIFN0YW5kLFxyXG4gICAgICAgIEZseSxcclxuICAgICAgICBGYWxsLFxyXG4gICAgICAgIEp1bXAsXHJcbiAgICAgICAgSnVtcGRvd25cclxuICAgIH1cclxuICAgIHZhciBBbmltVHlwZTp7W25hbWU6bnVtYmVyXTpzdHJpbmd9O1xyXG4gICAgQW5pbVR5cGUgPSB7fTtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLlN0YW5kXSA9IFwic3RhbmRcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkp1bXBdID0gXCJqdW1wdXBcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkp1bXBkb3duXSA9IFwianVtcGRvd25cIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkZseV0gPSBcImZseVwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uRmFsbF0gPSBcImZhbGxcIjtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQbGF5ZXJBbmltTmFtZSggbmFtZUVudW06QW5pbUVudW0gKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gQW5pbVR5cGVbbmFtZUVudW1dO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyQW5pbWF0b3JcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIG1fQW5pbWF0b3I6TGF5YS5BbmltYXRvcjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggUGxheWVyQ2hhcmFjdGVyOkxheWEuU3ByaXRlM0QgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gUGxheWVyQ2hhcmFjdGVyLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFN3aXRjaFN0YXRlKCBBbmltRW51bSApXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHsgQmFzZUZ1bmMgfSBmcm9tIFwiLi4vQmFzZS9CYXNlRnVuY1wiO1xyXG4vL+a4uOaIj+S4reebuOaculxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ2FtZXJhIGV4dGVuZHMgTGF5YS5DYW1lcmFcclxue1xyXG4gICAgQ3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyO1xyXG4gICAgQmFzZVBTOkxheWEuVmVjdG9yMztcclxuICAgIER5bmFtaWNQUzpMYXlhLlZlY3RvcjM7XHJcbiAgICBQbGF5ZXI6UGxheWVyO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50UFM6QmFzZUZ1bmMuU21vb3RoRGFtcFZlY3RvcjM7XHJcblxyXG4gICAgc2V0IFBvc2l0aW9uKHBzOkxheWEuVmVjdG9yMylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTpMYXlhLlZlY3RvcjNcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7ICAgXHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN0cmxlciA9IG5ldyBHYW1lQ2FtZXJhQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuRHluYW1pY1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgLy90aGlzLnRpbWVyTG9vcCgxLHRoaXMuQ3RybGVyLHRoaXMuQ3RybGVyLlVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX1VwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5jbGVhckZsYWcgPSBMYXlhLkJhc2VDYW1lcmEuQ0xFQVJGTEFHX1NLWTtcclxuICAgICAgICB0aGlzLm1fQ291bnRQUyA9IG5ldyBCYXNlRnVuYy5TbW9vdGhEYW1wVmVjdG9yMygyKVxyXG4gICAgICAgIC8vQ2FtZXJhLnNreVJlbmRlcmVyID0gc2t5Qm94Ll9yZW5kZXI7XHJcbiAgICAgICAgLy90aGlzLnNrID0gc2t5Qm94O1xyXG4gICAgICAgICAvL3BhdGhcclxuICAgIH1cclxuXHJcbiAgICBTZXRQbGFlcihwbGF5ZXI6UGxheWVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBSZXNldChEeW5hbWljUFM6TGF5YS5WZWN0b3IzLGJhc2VQUzpMYXlhLlZlY3RvcjMscGxheWVyOlBsYXllciApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5CYXNlUFMgPSBiYXNlUFM7XHJcbiAgICAgICAgdGhpcy5EeW5hbWljUFMgPSBEeW5hbWljUFM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orqHnrpflubborr7nva7kvY3nva5cclxuICAgIENvdW50U2V0UFMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZCh0aGlzLkJhc2VQUyx0aGlzLkR5bmFtaWNQUyxuZXdQUyk7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gdGhpcy5tX0NvdW50UFMuU21vb3RoRGFtcCgwLCBMYXlhLlZlY3RvcjMuZGlzdGFuY2UodGhpcy50cmFuc2Zvcm0ucG9zaXRpb24sbmV3UFMpIClcclxuICAgICAgICAvL3RoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmxlcnAodGhpcy50cmFuc2Zvcm0ucG9zaXRpb24sbmV3UFMsc2NhbGUsbmV3UFMpXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUzsgLy90aGlzLm1fQ291bnRQUy5Db3VudCh0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbixuZXdQUykgLy9uZXdQUztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9VcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3RybGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBCYXNlR2FtZUNhbWVyYUN0cmxlclxyXG57XHJcbiAgICBcclxuICAgIFxyXG4gICAgQ2FtZXJhOkdhbWVDYW1lcmE7XHJcbiAgICBDdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXI7XHJcbiAgICBhYnN0cmFjdCBVcGRhdGUoKTp2b2lkO1xyXG4gICAgY29uc3RydWN0b3IoIGNhbWVyYTpHYW1lQ2FtZXJhLGN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlciA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGN0cmxlciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBjdHJsZXIgPSB0aGlzOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBjYW1lcmE7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIgPSBjdHJsZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDYW1lcmFDdHJsZXIgZXh0ZW5kcyBCYXNlR2FtZUNhbWVyYUN0cmxlclxyXG57XHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW1lcmE6R2FtZUNhbWVyYSxjdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXIgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGNhbWVyYSxjdHJsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5DYW1lcmE9PW51bGx8fCB0aGlzLkNhbWVyYS5QbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICB2YXIgQ2FtZXJhUFMgPSB0aGlzLkNhbWVyYS5EeW5hbWljUFM7XHJcbiAgICAgICAgdmFyIFBsYXllclBTID0gdGhpcy5DYW1lcmEuUGxheWVyLl9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgICAgIENhbWVyYVBTLnggPSAwO1xyXG4gICAgICAgIHZhciBkaXNOdW0gPSBQbGF5ZXJQUy55IC0gQ2FtZXJhUFMueTtcclxuICAgICAgICB2YXIgZGlzWk51bSA9IFBsYXllclBTLnogLSBDYW1lcmFQUy56O1xyXG4gICAgICAgIGlmKE1hdGguYWJzKGRpc051bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnkgKz0gZGlzTnVtKjAuMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIE1hdGguYWJzKGRpc1pOdW0pPjAuMDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy56ICs9IGRpc1pOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5DYW1lcmEuRHluYW1pY1BTID1DYW1lcmFQUzsqL1xyXG4gICAgICAgIHZhciBDYW1lcmFQUyA9IHRoaXMuQ2FtZXJhLkR5bmFtaWNQUztcclxuICAgICAgICB2YXIgUGxheWVyUFMgPSB0aGlzLkNhbWVyYS5QbGF5ZXIuX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlzTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCBNYXRoLmFicyhkaXNaTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueiArPSBkaXNaTnVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5DYW1lcmEuRHluYW1pY1BTID0gQ2FtZXJhUFM7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuQ291bnRTZXRQUygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgeyBBbmltT2JqIH0gZnJvbSBcIi4vLi4vR2FtZS9BbmltT2JqXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgeyBQbGF5ZXJDb250cm9sZXIgfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL0lucHV0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG50eXBlIEFuaW1Db2luID0gQW5pbU9iai5BbmltQ29pblxyXG5leHBvcnQgbW9kdWxlIEl0ZW0ge1xyXG4gICAgLy/nianlk4HmoIfor4ZcclxuICAgIGNvbnN0IEl0ZW1JRDogc3RyaW5nID0gXCJJdGVtXCI7XHJcbiAgICBjb25zdCBNb2RlbElEOiBzdHJpbmcgPSBcIk1vZGVsXCJcclxuICAgIGV4cG9ydCBlbnVtIE1vZGVsVHlwZSAge1xyXG4gICAgICAgIENvaW5cclxuICAgIH1cclxuICAgIGV4cG9ydCBlbnVtIEl0ZW1UeXBlIHtcclxuICAgICAgICBOb25lID0gMCxcclxuICAgICAgICBFbXB0eSxcclxuICAgICAgICBSb2NrLFxyXG4gICAgICAgIFRob3JuLFxyXG4gICAgICAgIFZpbmUsXHJcbiAgICAgICAgUHJvdGVjdCA9IDExLFxyXG4gICAgICAgIEhvbHlQcm90ZWN0LFxyXG4gICAgICAgIEZseSxcclxuICAgICAgICBSb3BlLFxyXG4gICAgICAgIENvbGxlY3RvcixcclxuICAgICAgICBDb2luID0gMjAsXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIExpbmVJdGVtSW5mbyAge1xyXG4gICAgICAgIFR5cGU6IEl0ZW1UeXBlO1xyXG4gICAgICAgIE51bWJlcjogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGU6IEl0ZW1UeXBlLCBudW06IG51bWJlcikgIHtcclxuICAgICAgICAgICAgdGhpcy5UeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5OdW1iZXIgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v54mp5ZOB5biD5bGAXHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxheW91dCAge1xyXG4gICAgICAgIFJld2FyZExpc3Q6IEFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIEJhcnJpZXJMaXN0OiBBcnJheTxMYXlJdGVtTWdyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0ID0gbmV3IEFycmF5PExheUl0ZW1NZ3I+KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDEsIEl0ZW1UeXBlLkVtcHR5LCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDUsIEl0ZW1UeXBlLlJvY2ssIDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMiwgSXRlbVR5cGUuVGhvcm4sIDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMiwgSXRlbVR5cGUuVmluZSwgMTApKVxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMSwgSXRlbVR5cGUuQ29pbikpXHJcblxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMSwgSXRlbVR5cGUuRmx5LCAyMCkpXHJcblxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMSwgSXRlbVR5cGUuQ29sbGVjdG9yKSlcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsIDEsIEl0ZW1UeXBlLlByb3RlY3QpKTtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsIDEsIEl0ZW1UeXBlLkhvbHlQcm90ZWN0KSk7XHJcblxyXG4gICAgICAgICAgICBSZXNldEl0ZW1GYWN0b3J5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWtlTGluZVJld2FyZChmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vciwgdGhpcy5SZXdhcmRMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VMaW5lRGlmZmljdWx0eShmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vciwgdGhpcy5CYXJyaWVyTGlzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWtlSXRlbShmbG9vcjogbnVtYmVyLCBNZ3JMaXN0OiBBcnJheTxMYXlJdGVtTWdyPik6IEFycmF5PExpbmVJdGVtSW5mbz4gIHtcclxuICAgICAgICAgICAgdmFyIHJldHVybkluZm8gPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBsaXN0SWR4ID0gMDsgbGlzdElkeCA8IE1nckxpc3QubGVuZ3RoOyArK2xpc3RJZHgpICB7XHJcbiAgICAgICAgICAgICAgICBNZ3JMaXN0W2xpc3RJZHhdLk9uRmxvb3IoZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm86IExpbmVJdGVtSW5mbyA9IE1nckxpc3RbbGlzdElkeF0uVGFrZUl0ZW1zKGZsb29yKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLk51bWJlciA+IDApICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuSW5mby5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5JbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+ivpeWvueixoeeahOWIhuW4g+Wbvuavj+WxguetieamgueOh+WIhuW4g1xyXG4gICAgZXhwb3J0IGNsYXNzIExheUl0ZW1NZ3IgIHtcclxuICAgICAgICAvL+mBk+WFt+exu+Wei1xyXG4gICAgICAgIEl0ZW1UeXBlOiBJdGVtVHlwZTtcclxuICAgICAgICAvL+W9k+WJjeWxguaVsFxyXG4gICAgICAgIEN1ckZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgLy/ljLrpl7TliIbluIPmgLvmlbDph49cclxuICAgICAgICBJdGVtTnVtOiBudW1iZXI7XHJcbiAgICAgICAgLy/lvIDlp4vliIbluIPnmoTlsYLmlbBcclxuICAgICAgICBTdGFydEZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgLy/liIbluIPljLrpl7RcclxuICAgICAgICAvL+W3suiOt+WPluWxguagh+iusFxyXG4gICAgICAgIFRvdWNoZWRGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIEl0ZW1MaXN0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8vcmFuZ2XljLrpl7TojIPlm7RcclxuICAgICAgICAvL251bSDljLrpl7TojIPlm7TmlbDph49cclxuICAgICAgICAvL2l0ZW1UeXBlIOeUn+S6p+eahOmBk+WFt+exu+Wei1xyXG4gICAgICAgIC8vc3RhcnRGbG9vciDku47lk6rkuIDooYzlvIDlp4vmipXmjrdcclxuICAgICAgICBjb25zdHJ1Y3RvcihyYW5nZTogbnVtYmVyLCBudW06IG51bWJlciwgaXRlbVR5cGU6IEl0ZW1UeXBlLCBzdGFydEZsb29yOiBudW1iZXIgPSAxKSAge1xyXG4gICAgICAgICAgICBpZiAobnVtID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIG51bSA9IDE7XHJcbiAgICAgICAgICAgIGlmIChzdGFydEZsb29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIC8v56ysMOWxguaYr+eOqeWutui1t+atpeS9jee9rlxyXG4gICAgICAgICAgICAgICAgc3RhcnRGbG9vciA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5DdXJGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbU51bSA9IG51bTtcclxuICAgICAgICAgICAgLy/liIbluIPlm74g54mp5ZOBaWR4OuWxguaVsFxyXG4gICAgICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5PG51bWJlcj4ocmFuZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuR2VuTWFwKHN0YXJ0Rmxvb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBSYW5nZSgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbUxpc3QubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WxguabtOaWsOWHveaVsFxyXG4gICAgICAgIE9uRmxvb3IoZmxvb3I6IG51bWJlcikgIHtcclxuICAgICAgICAgICAgaWYgKGZsb29yIDwgdGhpcy5Ub3VjaGVkRmxvb3IpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGZsb29yID49IHRoaXMuU3RhcnRGbG9vciArIHRoaXMuUmFuZ2UpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlJ/miJDliIbluIPlm75cclxuICAgICAgICBHZW5NYXAoc3RhcnRGbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0Rmxvb3IgPSBzdGFydEZsb29yO1xyXG4gICAgICAgICAgICB2YXIgaXRlbU51bSA9IHRoaXMuSXRlbU51bTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY291bnQ6IG51bWJlciA9IDA7IGNvdW50IDwgdGhpcy5JdGVtTGlzdC5sZW5ndGg7ICsrY291bnQpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkl0ZW1MaXN0W2NvdW50XSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGl0ZW1MaXN0ID0gdGhpcy5JdGVtTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgY291bnROdW06IG51bWJlciA9IDA7IGNvdW50TnVtIDwgaXRlbU51bTsgKytjb3VudE51bSkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBJdGVtRmxvb3I6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuUmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JdGVtTGlzdFtJdGVtRmxvb3JdICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VJdGVtcyhmbG9vcjogbnVtYmVyKSAge1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpbmVJdGVtSW5mbyh0aGlzLkl0ZW1UeXBlLCB0aGlzLkl0ZW1MaXN0W2Zsb29yIC0gdGhpcy5TdGFydEZsb29yXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBSZXNldDogYm9vbGVhbjtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZXNldEl0ZW1GYWN0b3J5KCk6IHZvaWQgIHtcclxuICAgICAgICBpZiAoUmVzZXQpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIHRoZUtleSBpbiBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZSkgIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBwYXJzZUludCh0aGVLZXkpO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA8PSAyKSAge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgY291bnQgPSAwOyBjb3VudCA8IDMwOyArK2NvdW50KSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXM6IGFueSA9IEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW06IFN0ZXAgPSBuZXcgY2xhcyhudWxsKTtcclxuICAgICAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKEl0ZW1JRCArIHRoZUtleSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gU3RlcEl0ZW1GYWN0b3J5KGl0ZW1UeXBlOiBJdGVtVHlwZSwgU3RlcCkgIHtcclxuICAgICAgICBpZiAoU3RlcCA9PSB1bmRlZmluZWQpICB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKSAge1xyXG4gICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpdGVtXHJcbiAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7XHJcbiAgICAgICAgaXRlbSA9IG9ialBvb2wuZ2V0SXRlbShJdGVtSUQgKyBpdGVtVHlwZSlcclxuICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBpZiAoR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdICE9IG51bGwgJiYgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdICE9IHVuZGVmaW5lZCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGFzOiBhbnkgPSBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV07XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IGNsYXMoU3RlcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBTdGVwSXRlbShpdGVtVHlwZSwgU3RlcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLlN0ZXAgPSBTdGVwO1xyXG4gICAgICAgIGl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSXRlbUJ1ZmZGYWN0b3J5KGl0ZW1UeXBlOkl0ZW1UeXBlKTpCYXNlUGxheWVyQnVmZlxyXG4gICAge1xyXG4gICAgICAgIHZhciBidWZmOkJhc2VQbGF5ZXJCdWZmID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2goaXRlbVR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkZseTpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgRmx5QnVmZigpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Db2xsZWN0b3I6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IENvbGxlY3RCdWZmKDEwMDAwKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUHJvdGVjdDpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUHJvdGVjdEJ1ZmYoMzAwMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkhvbHlQcm90ZWN0OlxyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5ldyBQcm90ZWN0QnVmZigzMDAwLCB0cnVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuVmluZTpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgVmluZUJ1ZmYoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9wZTpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUm9wZUJ1ZmYoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBidWZmO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEFkZEJ1ZmZUb1BsYXllcihpdGVtVHlwZTpJdGVtVHlwZSk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHZhciBidWZmOkJhc2VQbGF5ZXJCdWZmOy8vID0gSXRlbUJ1ZmZGYWN0b3J5KCk7XHJcbiAgICAgICAgc3dpdGNoKGl0ZW1UeXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5GbHk6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IEZseUJ1ZmYoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuQ29sbGVjdG9yOlxyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5ldyBDb2xsZWN0QnVmZigxMDAwMCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFByb3RlY3RCdWZmKDMwMDApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUHJvdGVjdEJ1ZmYoMzAwMCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlZpbmU6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFZpbmVCdWZmKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvcGU6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFJvcGVCdWZmKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBTdGVwSXRlbSAge1xyXG4gICAgICAgIFN0ZXA6IFN0ZXA7XHJcbiAgICAgICAgSXRlbVR5cGU6IEl0ZW1UeXBlO1xyXG4gICAgICAgIE1vZGVsOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIHByaXZhdGUgbV9BbmltYXRvcjogTGF5YS5BbmltYXRvcjtcclxuICAgICAgICBnZXQgSXNEaWZmaWN1bHR5KCk6IGJvb2xlYW4gIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGUgPiAwICYmIHRoaXMuSXRlbVR5cGUgPCAxMCAmJiB0aGlzLkl0ZW1UeXBlICE9IEl0ZW1UeXBlLlZpbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreiDveS4jeiDvei1sOS4iuWOu1xyXG4gICAgICAgIGdldCBJc0ZvcmJpZGVuKCk6IGJvb2xlYW4gIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGUgPT0gSXRlbVR5cGUuUm9jaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldEl0ZW0oKSAge1xyXG4gICAgICAgICAgICAvL3RoaXMuX0luaXRJdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5TZXRFbmFibGUoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTW9kZWwgIT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RlcC5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU2V0RW5hYmxlKCkgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTW9kZWwgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFB1dEl0ZW0gPSBmdW5jdGlvbiAoaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lKSAge1xyXG4gICAgICAgICAgICB0aGlzLkRlc1Bhd24oKTtcclxuICAgICAgICAgICAgdGhpcy5TdGVwLlN0ZXBJdGVtID0gU3RlcEl0ZW1GYWN0b3J5KGl0ZW1UeXBlLCB0aGlzLlN0ZXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/mtojpmaQg5oqK6Ieq5bex5a2Y5YWl5YaF5a2Y5rGgXHJcbiAgICAgICAgRGVzUGF3bigpICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vZGVsLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7Ly9HTS5PYmpQb29sO1xyXG4gICAgICAgICAgICBvYmpQb29sLnJlY292ZXIoSXRlbUlEICsgdGhpcy5JdGVtVHlwZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLkl0ZW1UeXBlKSAge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEdlbkJ1ZmYoKTpCYXNlUGxheWVyQnVmZlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEl0ZW1CdWZmRmFjdG9yeSh0aGlzLkl0ZW1UeXBlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog56qB56C05L+d5oqkXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm6KKr56qB56C0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQnJlYWtQcm90ZWN0KHBsYXllcjogUGxheWVyKTogYm9vbGVhbiAge1xyXG4gICAgICAgICAgICB2YXIgY3VyQnVmZiA9IHBsYXllci5HZXRCdWZmKFByb3RlY3RCdWZmLklkeCk7XHJcbiAgICAgICAgICAgIGlmIChjdXJCdWZmKSAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjdXJCdWZmLlR5cGUpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Qcm90ZWN0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJCdWZmLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihpdGVtVHlwZTogSXRlbVR5cGUsIFN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtVHlwZSA9PSB1bmRlZmluZWQpICB7XHJcbiAgICAgICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5TdGVwID0gU3RlcDtcclxuICAgICAgICAgICAgdGhpcy5JdGVtVHlwZSA9IGl0ZW1UeXBlO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fSW5pdEl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXI6IFBsYXllciwgYnVmZjogQmFzZVBsYXllckJ1ZmYpICB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuQWRkQnVmZihidWZmKSkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0luaXRJdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCAhPSBudWxsICYmICF0aGlzLk1vZGVsLmRlc3Ryb3llZCkgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsIDApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fR2VuSXRlbU1vZGVsKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Nb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24gPSBwcztcclxuICAgICAgICAgICAgICAgIHRoaXMubV9BbmltYXRvciA9IHRoaXMuTW9kZWwuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgX1Rlc3RHZW50SXRlbU1vZGVsKCkgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLkl0ZW1UeXBlKSAge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Sb2NrOlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuTm9uZTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5JdGVtVHlwZSkgIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9jazpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBCYXNlUGxheWVyQnVmZiAge1xyXG4gICAgICAgIFR5cGU6IEl0ZW0uSXRlbVR5cGU7XHJcbiAgICAgICAgSWR4OiBudW1iZXI7XHJcbiAgICAgICAgUGxheWVyOiBQbGF5ZXI7XHJcbiAgICAgICAgVXBkYXRlKCkgIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2VuQnVmZk1vZCgpICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZNb2QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZVNwaGVyZSgwLjMsIDgsIDgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgICAgICAvL+WIm+W7uuaooeWei+aYvuekuuWvueixoVxyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5GbHkoKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fU3RhcnRGdW5jICE9IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TdGFydEZ1bmMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgQ29tcGxldGUoKSAge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5Db21wbGV0ZUJ1ZmYodGhpcy5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTW9kLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9cclxuICAgICAgICBwcm90ZWN0ZWQgX0J1ZmZNb2Q6IExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IodHlwZTogSXRlbS5JdGVtVHlwZSwgaWR4OiBudW1iZXIgPSAwKSAge1xyXG4gICAgICAgICAgICB0aGlzLlR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB0aGlzLklkeCA9IGlkeDtcclxuICAgICAgICAgICAgdGhpcy5HZW5CdWZmTW9kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0RnVuYzogKCkgPT4gdm9pZDtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBSb2NrIGV4dGVuZHMgU3RlcEl0ZW0gIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1vZGVsTnVtID0gMztcclxuICAgICAgICBjb25zdHJ1Y3RvcihTdGVwOiBTdGVwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb2NrLCBTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuTWVzaFNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IDEgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBSb2NrLk1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIE5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMFwiICsgaWR4KVxyXG4gICAgICAgICAgICBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhOYW1lKVxyXG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb2NrXSA9IFJvY2s7XHJcblxyXG4gICAgY2xhc3MgVGhvcm4gZXh0ZW5kcyBTdGVwSXRlbSAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlRob3JuLCBTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpOiB2b2lkICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkJyZWFrUHJvdGVjdChwbGF5ZXIpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFuaW06IExheWEuQW5pbWF0b3IgPSB0aGlzLk1vZGVsLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgICAgICAgICAgYW5pbS5wbGF5KFwidG91Y2hcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5UaG9ybl0gPSBUaG9ybjtcclxuXHJcbiAgICBjbGFzcyBQcm90ZWN0IGV4dGVuZHMgU3RlcEl0ZW0gIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Qcm90ZWN0LCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoUHJvdGVjdEJ1ZmYuSWR4KSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB2YXIgQnVmZjpCYXNlUGxheWVyQnVmZiA9IHRoaXMuR2VuQnVmZigpO1xyXG4gICAgICAgICAgICB0aGlzLl9BZGRCdWZmVG9QbGF5ZXIocGxheWVyLCBCdWZmKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Qcm90ZWN0XSA9IFByb3RlY3Q7XHJcblxyXG4gICAgY2xhc3MgUHJvdGVjdEJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiAge1xyXG4gICAgICAgIFRpbWU6IG51bWJlcjtcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSB0aW1lIOaMgee7reaXtumXtFxyXG4gICAgICAgICAqIEBwYXJhbSBJc0hvbHkg5piv5ZCm57ud5a+55peg5pWMXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTogbnVtYmVyID0gMCwgSXNIb2x5OiBib29sZWFuID0gZmFsc2UpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKElzSG9seSA/IEl0ZW1UeXBlLkhvbHlQcm90ZWN0IDogSXRlbVR5cGUuUHJvdGVjdCwgUHJvdGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lVGltZSArIHRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPCBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVUaW1lKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5Db21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3MgSG9seVByb3RlY3QgZXh0ZW5kcyBTdGVwSXRlbSAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkhvbHlQcm90ZWN0LCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuR2V0QnVmZihQcm90ZWN0QnVmZi5JZHgpICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHZhciBCdWZmOkJhc2VQbGF5ZXJCdWZmID0gdGhpcy5HZW5CdWZmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXIsIEJ1ZmYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkhvbHlQcm90ZWN0XSA9IEhvbHlQcm90ZWN0O1xyXG5cclxuICAgIGNsYXNzIENvaW4gZXh0ZW5kcyBTdGVwSXRlbSAge1xyXG4gICAgICAgIC8vVG9Eb1xyXG4gICAgICAgIHByaXZhdGUgbV90b3VjaGVkOiBCb29sZWFuXHJcbiAgICAgICAgRmx5VG9QbGF5ZXIocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHZhciBjb25pbjogQW5pbUNvaW4gPSBBbmltT2JqLkdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1PYmouQW5pbUNvaW4sIHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICBjb25pbi5TZXRUYXJnZXQocGxheWVyKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRHb2xkVW5Mb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkR29sZCgxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2luLCBzdGVwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29pbl0gPSBDb2luO1xyXG5cclxuICAgIGNsYXNzIENvbGxlY3RlciBleHRlbmRzIFN0ZXBJdGVtICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoQ29sbGVjdEJ1ZmYuSWR4KSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZiggdGhpcy5HZW5CdWZmKCkpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuQ29sbGVjdG9yLCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpICB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDEgKyBNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRfMDFcIik7XHJcbiAgICAgICAgICAgIHZhciB0aGVNb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gdGhlTW9kZWwuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Db2xsZWN0b3JdID0gQ29sbGVjdGVyO1xyXG5cclxuICAgIGNsYXNzIENvbGxlY3RCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgR2FtZURpcjogR2FtZURpcmVjdG9yO1xyXG4gICAgICAgIENvdW50Rmxvb3I6IG51bWJlcjtcclxuICAgICAgICBzdGF0aWMgZ2V0IElkeCgpOiBudW1iZXIgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6IG51bWJlciA9IDApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3RvciwgQ29sbGVjdEJ1ZmYuSWR4KTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lRGlyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpcjtcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gdGhpcy5HYW1lRGlyLkdhbWVUaW1lICsgdGltZTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudEZsb29yID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRGbG9vciA9IHRoaXMuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vciAtIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPCB0aGlzLkdhbWVEaXIuR2FtZVRpbWUpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vciAtIHRoaXMuQ291bnRGbG9vciArIDEgPCAwKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpci5HYW1lUGxheS5Mb29wRG9GbG9vclN0ZXAodGhpcy5Db3VudEZsb29yLCB0aGlzLCB0aGlzLkNvdW50Q29pbnMpO1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLkNvdW50Rmxvb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBDb3VudENvaW5zKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIGlmIChzdGVwLlN0ZXBJdGVtLkl0ZW1UeXBlID09IEl0ZW1UeXBlLkNvaW4pICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgQ29pbjogQ29pbiA9IHN0ZXAuU3RlcEl0ZW0gYXMgQ29pbjtcclxuICAgICAgICAgICAgICAgIENvaW4uRmx5VG9QbGF5ZXIodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEZMeSBleHRlbmRzIFN0ZXBJdGVtICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoMCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKHRoaXMuR2VuQnVmZigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkZseSwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxICsgTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fZmx5ZXJfMDFcIik7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuRmx5XSA9IEZMeTtcclxuXHJcbiAgICBjbGFzcyBGbHlCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIEZsb29yOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6IG51bWJlciAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgdmFyIHRpbWU6IG51bWJlciA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkN1clN0ZXAgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPSB0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZSAvIDIgKiB0aGlzLkZsb29yO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCgpKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TZXRTYWZlUFModGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHBsYXllci5GbHlQcmVwYXJlKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlciA9IDAuMTUsIGZsb29yOiBudW1iZXIgPSAxMCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuRmx5LCBQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXIgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fRmluYWxaIC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24ueiA+IC0wLjIpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuR2V0U3RlcEJ5TG9jYXRpb24odGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG5cclxuICAgICAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUm9wZSBleHRlbmRzIFN0ZXBJdGVtICB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkdldEJ1ZmYoMCkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKHRoaXMuR2VuQnVmZigpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9wZSwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkgIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLk1lc2hTcHJpdGUzRCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMSwgMC41LCAwLjEpKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUm9wZV0gPSBSb3BlO1xyXG5cclxuICAgIGNsYXNzIFJvcGVCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIEZsb29yOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgSWR4KCk6IG51bWJlciAge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX0ZpbmFsWiAtIHRoaXMuUGxheWVyLlBvc2l0aW9uLnogPiAtMC4yKSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5FbmQoc3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgRW5kKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KHBsYXllcjogUGxheWVyKSAge1xyXG4gICAgICAgICAgICBzdXBlci5TdGFydChwbGF5ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9IHRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlIC8gMiAqIHRoaXMuRmxvb3I7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsIHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlciA9IDAuMSwgZmxvb3I6IG51bWJlciA9IDEwKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb3BlLCBQcm90ZWN0QnVmZi5JZHgpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpc1JpZ2h0OiBib29sZWFuKTogdm9pZCAge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VGbG9vciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3JMaW5lO1xyXG4gICAgICAgICAgICBpZiAoY2xvc2VGbG9vci5GbG9vck51bSAlIDIgIT0gdGhpcy5fRmluYWxMb2NhdGlvbi5ZICUgMikgIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlRmxvb3IgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldEZsb29yQnlGbG9vcihjbG9zZUZsb29yLkZsb29yTnVtICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBjbG9zZUZsb29yLkdldFN0ZXAodGhpcy5fRmluYWxMb2NhdGlvbi5YKTtcclxuICAgICAgICAgICAgaWYgKGlzUmlnaHQpXHJcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICAgICAgaWYgKHN0ZXAuU3RlcEl0ZW0uSXNGb3JiaWRlbikgIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuRW5kKHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBWaW5lIGV4dGVuZHMgU3RlcEl0ZW0gIHtcclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHZhciBjdXJCdWZmOiBCYXNlUGxheWVyQnVmZiA9IHBsYXllci5HZXRCdWZmKDApO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuQnJlYWtQcm90ZWN0KHBsYXllcikpICB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIuQWRkQnVmZih0aGlzLkdlbkJ1ZmYoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApICB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlZpbmUsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSArIE1hdGgucmFuZG9tKCkgKiAyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IElkeCA9PSAxID8gcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIikgOiBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpXHJcbiAgICAgICAgICAgIC8vdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIilcclxuICAgICAgICAgICAgLy92YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpXHJcblxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlZpbmVdID0gVmluZTtcclxuXHJcbiAgICBjbGFzcyBWaW5lQnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmICB7XHJcbiAgICAgICAgQ291bnRUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgSW5wdXREaXI6IGJvb2xlYW47XHJcbiAgICAgICAgU3RhcnQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgICAgIHN1cGVyLlN0YXJ0KHBsYXllcilcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQodGhpcywgdGhpcy5fSW5wdXQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgQ29tcGxldGUoKSAge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgICAgIHN1cGVyLkNvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvdW50VGltZTogbnVtYmVyID0gNCwgaW5wdXREaXI6IGJvb2xlYW4gPSB0cnVlKSAge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5WaW5lLCAwKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudFRpbWUgPSBjb3VudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSBpbnB1dERpcjtcclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaW5wdXREaXI6IGJvb2xlYW4pICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLklucHV0RGlyID09IGlucHV0RGlyKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9ICF0aGlzLklucHV0RGlyO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLkNvdW50VGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5Db3VudFRpbWUgPD0gMCkgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfU2hvd0dhbWVJbmZvKCkgIHtcclxuICAgICAgICAgICAgdmFyIGluZm86IHN0cmluZztcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ291bnRUaW1lIDw9IDApXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gXCJcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuSW5wdXREaXIgPT0gdHJ1ZSA/IFwiUmlnaHRcIiA6IFwiTGVmdFwiO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCJleHBvcnQgbW9kdWxlIEdhbWVNb2R1bGVcclxue1xyXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPbkNoYXJhY3Rlckl0ZW1DaGFuZ2U6c3RyaW5nID0gXCJPbkNoYXJhY3Rlckl0ZW1DaGFuZ2VcIjtcclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgR2FtZVN0cnVjdFxyXG57XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0SW5mbyB7XHJcbiAgICAgICAgQXVkaW9PbjogYm9vbGVhbjtcclxuICAgICAgICBPUElzUmlnaHQ6IGJvb2xlYW47XHJcbiAgICAgICAgVGV4dEluZm86IHN0cmluZztcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5BdWRpb09uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5PUElzUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlRleHRJbmZvID0gXCJIZWxsbyBcXG4gSGVsbG9cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTUxvY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgZ2V0IFgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBYKHg6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzBdID14O1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgWSgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0FyclsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFkoeTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnJbMV0gPSB5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9BcnI6QXJyYXk8bnVtYmVyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggeDpudW1iZXIseTpudW1iZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyID0gW3gseV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IHZhciBJdGVtRGljdFR5cGU6e1tJdGVtVHlwZTpudW1iZXJdOmFueX07XHJcbiAgICBJdGVtRGljdFR5cGUgPSB7IH07XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog6L6T5YWl566h55CG55u45YWzXHJcbiAqL1xyXG5pbXBvcnQgR2FtZVNjZW5lUGxheSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheVwiXHJcbmV4cG9ydCBtb2R1bGUgSW5wdXQge1xyXG4gICAgLy/ln7rnoYDovpPlhaXmjqfliLblmahcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlR2FtZUlucHV0IHtcclxuICAgICAgICAvL+WFrOaciVxyXG4gICAgICAgIE5leHRJbnB1dDogQmFzZUdhbWVJbnB1dDtcclxuICAgICAgICBhYnN0cmFjdCBJbnB1dChpc1JpZ2h0OiBib29sZWFuKTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoaW5wdXQ6IEJhc2VHYW1lSW5wdXQgPSBudWxsKSAge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk5leHRJbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAgeyB9XHJcbiAgICAgICAgQ2xlYXIoKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRElZSW5wdXQgZXh0ZW5kcyBCYXNlR2FtZUlucHV0IHtcclxuICAgICAgICBJbnB1dChpc1JpZ2h0OiBib29sZWFuKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9MaXN0ZW5lci5jYWxsKHRoaXMuX093bmVyLCBpc1JpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfT3duZXI6IGFueTtcclxuICAgICAgICBwcml2YXRlIF9MaXN0ZW5lcjogKGlzcmluZzogYm9vbGVhbikgPT4gdm9pZDtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihvd25lcjogYW55ID0gbnVsbCwgbGlzdGVuZXI6IChpc3Jpbmc6IGJvb2xlYW4pID0+IHZvaWQgPSBudWxsKSAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9Pd25lciA9IG93bmVyO1xyXG4gICAgICAgICAgICB0aGlzLl9MaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBOb3JtR2FtZUlucHV0IGV4dGVuZHMgQmFzZUdhbWVJbnB1dCB7XHJcbiAgICAgICAgR2FtZURpcjogR2FtZVNjZW5lUGxheTtcclxuICAgICAgICBfRGlydHk6IGJvb2xlYW47XHJcbiAgICAgICAgX0lzUmlnaHQ6IGJvb2xlYW47XHJcbiAgICAgICAgY29uc3RydWN0b3IoZGlyOiBHYW1lU2NlbmVQbGF5LCBpbnB1dDogQmFzZUdhbWVJbnB1dCA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKGlucHV0KTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lRGlyID0gZGlyO1xyXG4gICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9Jc1JpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIElucHV0KGlzUmlnaHQ6IGJvb2xlYW4pICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5HYW1lRGlyLk1vdmVTdGVwKGlzUmlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX0lzUmlnaHQgPSBpc1JpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fRGlydHkgJiYgdGhpcy5HYW1lRGlyLlBsYXllci5CYXNlQ3RybGVyLklzRmFsbGluZykgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVEaXIuTW92ZVN0ZXAodGhpcy5fSXNSaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQ2xlYXIoKSAge1xyXG4gICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG50eXBlIFN0ZXBJdGVtID0gSXRlbS5TdGVwSXRlbTtcclxuXHJcbiAvKirkvZzogIU6TW9cclxuICrlnLrmma/lhoXlr7nosaEgXHJcbiAqL1xyXG4vL+euoeeQhuS4gOaVtOihjFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VudExpbmUgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbntcclxuICAgIExheU91dERpcnR5OmJvb2xlYW47XHJcbiAgICBMaW5lSWR4Om51bWJlcjtcclxuICAgIEZsb29yTnVtOm51bWJlcjtcclxuICAgIFN0ZXBMaXN0OlN0ZXBbXTtcclxuICAgIExvZ2ljTGVuZ3RoOm51bWJlcjtcclxuICAgIFN0ZXBJdGVtOlN0ZXBJdGVtO1xyXG4gICAgc2V0IFBvc2l0aW9uKCBuZXdQUzpMYXlhLlZlY3RvcjMgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvuiOt+WPluaYvuekuuWHuuadpeeahOesrOWHoOS4quW5s+WPsFxyXG4gICAgR2V0U3RlcChpZHg6bnVtYmVyKTpTdGVwXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU3RlcExpc3RbaWR4ICsgMV07XHJcbiAgICB9XHJcbiAgICAvL+iuvue9ruavj+WxglxyXG4gICAgU2V0TGluZSggZmxvb3I6bnVtYmVyICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuTGF5T3V0RGlydHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5GbG9vck51bSA9IGZsb29yO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgIHZhciBzdGVwTGVuZ3RoID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICB2YXIgc3RlcERpc3RhbmNlPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2U7XHJcbiAgICAgICAgbmV3UFMueSA9IHN0ZXBMZW5ndGgqZmxvb3I7XHJcbiAgICAgICAgbmV3UFMueiA9IC1zdGVwRGlzdGFuY2UvMiAqZmxvb3I7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgICAgICB2YXIgc3RlcEFycjpTdGVwW10gPSB0aGlzLlN0ZXBMaXN0O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBzdGFydFggPSAwIC0gc3RlcEFyci5sZW5ndGgvMiAqIHN0ZXBEaXN0YW5jZTtcclxuICAgICAgICBpZih0aGlzLkp1Z2VJc0xlc3NMaW5lKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGFydFggKz0gc3RlcERpc3RhbmNlLzI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgZm9yKCB2YXIgY29sdW1uID0wIDtjb2x1bW48c3RlcEFyci5sZW5ndGg7Kytjb2x1bW4gKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N0ZXA6U3RlcCA9IHN0ZXBBcnJbY29sdW1uXTtcclxuICAgICAgICAgICAgdmFyIHN0ZXBWZWN0b3IgPSBuZXdTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICBzdGVwVmVjdG9yLnggPSBzdGFydFg7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX1NldGVkJiYoY29sdW1uID09IDB8fGNvbHVtbj50aGlzLkxvZ2ljTGVuZ3RoKSlcclxuICAgICAgICAgICAgICAgIG5ld1N0ZXAuUmVzZXRTdGVwKHN0ZXBWZWN0b3IsdHJ1ZSlcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgbmV3U3RlcC5SZXNldFN0ZXAoc3RlcFZlY3RvcilcclxuICAgICAgICAgICAgc3RhcnRYICs9IHN0ZXBEaXN0YW5jZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5fU2V0ZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBzdGVwQXJyWzBdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHN0ZXBBcnJbc3RlcEFyci5sZW5ndGggLTFdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1NldGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiggISB0aGlzLkp1Z2VJc0xlc3NMaW5lKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLkxvZ2ljTGVuZ3RoID0gc3RlcEFyci5sZW5ndGgtMjtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RlcEFycltzdGVwQXJyLmxlbmd0aCAtMl0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuTG9naWNMZW5ndGggPSBzdGVwQXJyLmxlbmd0aCAtMztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5Yik5pat5piv5ZCm5pS257yp55qE6YKj5bGCXHJcbiAgICBKdWdlSXNMZXNzTGluZSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5GbG9vck51bSUyICE9IDA7XHJcbiAgICB9XHJcbiAgICAvL+Wwhuavj+S4quiKgueCuemTvuaOpeWIsOS4i+S4gOWxglxyXG4gICAgU2V0TmV4dEZsb29yKCBsYXN0Rmxvb3I6TW91bnRMaW5lKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbmnInkuKTlpLTnq6/ngrlcclxuICAgICAgICB2YXIgaGF2ZVBvaW50ID0gbGFzdEZsb29yLkxvZ2ljTGVuZ3RoID50aGlzLkxvZ2ljTGVuZ3RoXHJcbiAgICAgICAgZm9yKCB2YXIgc3RhcnRJZHg6bnVtYmVyID0gMDtzdGFydElkeDwgdGhpcy5Mb2dpY0xlbmd0aDsrK3N0YXJ0SWR4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGxlZnRQYXJlbnQ6U3RlcCA9bnVsbDtcclxuICAgICAgICAgICAgdmFyIHJpZ2h0UGFyZW50OlN0ZXAgPW51bGw7XHJcbiAgICAgICAgICAgIGlmKGhhdmVQb2ludClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbGVmdFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgrMSk7XHJcbiAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxlZnRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeC0xKTtcclxuICAgICAgICAgICAgICAgIHJpZ2h0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciB0aGlTdGVwID0gdGhpcy5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgdGhpU3RlcC5MZWZ0UGFyZW50ID0gbGVmdFBhcmVudDtcclxuICAgICAgICAgICAgbGVmdFBhcmVudC5SaWdodENoaWxkID0gdGhpU3RlcDtcclxuXHJcbiAgICAgICAgICAgIHRoaVN0ZXAuUmlnaHRQYXJlbnQgPSByaWdodFBhcmVudDtcclxuICAgICAgICAgICAgcmlnaHRQYXJlbnQuTGVmdENoaWxkID0gdGhpU3RlcDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+aVsueijuS4gOWxglxyXG4gICAgQnJlYWsoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1NldGVkOmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihsaW5lSWR4Om51bWJlcixmbG9vcjpudW1iZXIgPSAwKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjb2x1bW5zOm51bWJlciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkxpbmVTdGVwTnVtO1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5MaW5lSWR4ID0gbGluZUlkeDtcclxuICAgICAgICB0aGlzLkZsb29yTnVtID0gZmxvb3I7XHJcbiAgICAgICAgdGhpcy5TdGVwTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuTG9naWNMZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuTGF5T3V0RGlydHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9TZXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIGZvciggdmFyIFN0YXJ0SWR4Om51bWJlciA9IChjb2x1bW5zIC0xKTtTdGFydElkeD49MDstLVN0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuZXdTdGVwOlN0ZXAgPSBuZXcgU3RlcCh0aGlzLFN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChuZXdTdGVwKTtcclxuICAgICAgICAgICAgdGhpcy5TdGVwTGlzdFtTdGFydElkeF0gPSBuZXdTdGVwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHtQbGF5ZXJDb250cm9sZXJ9IGZyb20gXCIuL1BsYXllckN0cmxlclwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IHtDaGFyYWN0ZXJ9IGZyb20gXCIuL0NoYXJhY3RlclwiXHJcbmltcG9ydCBHYW1lQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQVBQXCJcclxuaW1wb3J0IENoYXJhY3Rlck1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyL0NoYXJhY3Rlck1hbWFnZXJcIjtcclxudmFyIG51bTpudW1iZXIgPSAwO1xyXG4vL+ivpeiEmuacrOeUqOS6jua4uOaIj+eOqeWutuWvueixoeeuoeeQhlxyXG4vL+eOqeWutuWvueixoVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbnsgICBcclxuICAgIC8v56eB5pyJ5bGe5oCnXHJcbiAgICBfTG9naWNQb3NpdGlvbjpMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF9CdWZmTm9kZTpMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBfUGxheWVyTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIHByaXZhdGUgX0N1clN0ZXA6U3RlcDtcclxuICAgIHByaXZhdGUgX0N0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlcjtcclxuICAgIHByaXZhdGUgbV9BbmltYXRvcjpMYXlhLkFuaW1hdG9yO1xyXG4gICAgcHJpdmF0ZSBtX0J1ZmZNb2RlbDp7W25hbWU6bnVtYmVyXTpMYXlhLlNwcml0ZTNEfVxyXG4gICAgXHJcbiAgICBCYXNlQ3RybGVyOlBsYXllckNvbnRyb2xlci5QbGF5ZXJOb3JtQ3RybGVyO1xyXG4gICAgQnVmZkFycjpBcnJheTxJdGVtLkJhc2VQbGF5ZXJCdWZmPjtcclxuICAgIElkTnVtYmVyOm51bWJlcjtcclxuXHJcbiAgICBzZXQgQ3VyU3RlcChzdGVwOlN0ZXApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ3VyU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyU3RlcCgpOlN0ZXBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU3RlcDtcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3UFM6TGF5YS5WZWN0b3IzID0gbmV3UFMuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKCk6TGF5YS5WZWN0b3IzXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9naWNQb3NpdGlvbigpOkxheWEuVmVjdG9yM1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9CdWZmTW9kZWwgPSB7fTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzKTtcclxuXHJcbiAgICAgICAgLy/mt7vliqDoh6rlrprkuYnmqKHlnotcclxuICAgICAgICB0aGlzLm9uKExheWEuRXZlbnQuUkVNT1ZFRCx0aGlzLCgpPT57IHRoaXMuZGVzdHJveSgpIH0pXHJcbiAgICAgICAgdmFyIG1ncjpDaGFyYWN0ZXJNYW5hZ2VyID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBJbml0QlVmZk1vZGVsKCBwbGF5ZXJNb2RlbDpMYXlhLlNwcml0ZTNEIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlNldE1vZGVsKCBcIml0ZW1fZmx5ZXJfMDFcIiwgXCJSX2hhbmRcIixwbGF5ZXJNb2RlbCwgSXRlbS5JdGVtVHlwZS5GbHkpO1xyXG4gICAgICAgIHRoaXMuU2V0TW9kZWwoIFwiaXRlbV9zaGllbGRfMDFcIiwgXCJoZWFkXCIscGxheWVyTW9kZWwsIEl0ZW0uSXRlbVR5cGUuUHJvdGVjdCk7XHJcbiAgICAgICAgdGhpcy5TZXRNb2RlbCggXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIsIFwiaGVhZFwiLHBsYXllck1vZGVsLCBJdGVtLkl0ZW1UeXBlLkhvbHlQcm90ZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNldE1vZGVsKCByZXNvdXJjZU5hbWU6c3RyaW5nLCBub2RlTmFtZTpzdHJpbmcsIHBsYXllck1vZGVsOkxheWEuU3ByaXRlM0QsIGl0ZW1UeXBlOkl0ZW0uSXRlbVR5cGUgKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBtb2RlbDpMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0TEgocmVzb3VyY2VOYW1lKSk7XHJcbiAgICAgICAgdmFyIGJ1ZmZNb2RlbDpMYXlhLlNwcml0ZTNEID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICBcclxuICAgICAgICBwbGF5ZXJNb2RlbC5nZXRDaGlsZEF0KDApLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgc3dpdGNoKG5vZGVOYW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBcImhlYWRcIjpcclxuICAgICAgICAgICAgICAgIHZhciBub2RlOkxheWEuU3ByaXRlM0QgPSBwbGF5ZXJNb2RlbC5nZXRDaGlsZEJ5TmFtZShub2RlTmFtZSkgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICAgICAgICAgIG5vZGUuYWRkQ2hpbGQoYnVmZk1vZGVsKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IubGlua1Nwcml0ZTNEVG9BdmF0YXJOb2RlKG5vZGVOYW1lLGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBidWZmTW9kZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX0J1ZmZNb2RlbFtpdGVtVHlwZV0gPSBidWZmTW9kZWw7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBtX1N0YXRlTWFwOnt9XHJcbiAgICBwdWJsaWMgU2V0UGxheWVyTW9kZWwoIG1vZGVsOkxheWEuU3ByaXRlM0QgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobW9kZWwpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCksIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gbW9kZWwuZ2V0Q2hpbGRBdCgwKS5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgdmFyIGxheWVyOkxheWEuTWFwTGF5ZXIgPSB0aGlzLm1fQW5pbWF0b3IuZ2V0Q29udHJvbGxlckxheWVyKCkuX3N0YXRlc01hcDtcclxuICAgICAgICB0aGlzLm1fU3RhdGVNYXAgPSB7fTtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiBsYXllciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fU3RhdGVNYXBba2V5XSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSW5pdEJVZmZNb2RlbChtb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IG51bGw7XHJcbiAgICAgICAgaWYodGhpcy5fQnVmZk5vZGUpXHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9CdWZmTm9kZSA9IG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9CdWZmTm9kZSk7XHJcbiAgICAgICAgdGhpcy5CdWZmQXJyID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5CYXNlQ3RybGVyID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJOb3JtQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IHRoaXMuQmFzZUN0cmxlcjtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygwLDApO1xyXG4gICAgICAgIHRoaXMuZnJhbWVMb29wKDEsdGhpcyx0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHZhciBkZWZhdWx0QW5pbVN0YXRlOkxheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMubV9BbmltYXRvci5nZXREZWZhdWx0U3RhdGUoKTtcclxuICAgICAgICB2YXIgc3RhdGVOYW1lOnN0cmluZyA9IGRlZmF1bHRBbmltU3RhdGUubmFtZTtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShzdGF0ZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W546p5a62QlVGRlxyXG4gICAgICogQHBhcmFtIGlkeCDmp73kvY3mo4Dmn6VcclxuICAgICAqIEByZXR1cm5zIOepuuihqOekuuayoeaciVxyXG4gICAgICovXHJcbiAgICBHZXRCdWZmKGlkeDpudW1iZXIpOkl0ZW0uQmFzZVBsYXllckJ1ZmZcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuQnVmZkFycltpZHhdICE9bnVsbCYmdGhpcy5CdWZmQXJyW2lkeF0hPXVuZGVmaW5lZCk/dGhpcy5CdWZmQXJyW2lkeF06bnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvL+aRhuaUvuinkuiJslxyXG4gICAgU2V0U3RlcChwdXRTdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBwdXRTdGVwO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHB1dFN0ZXAuUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBuZXdQUy55ICs9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBwdXRTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uU3RhbmQpKTtcclxuICAgICAgICB0aGlzLlRvdWNoR3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluIPlsYDlvZPliY3lsYLkvYbkuI3np7vliqhcclxuICAgICAqIEBwYXJhbSB7U3RlcH0gc3RlcCDkuIvkuIDmraXlj7DpmLZcclxuICAgICAqL1xyXG4gICAgTGF5U3RlcChzdGVwOlN0ZXApOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBzdGVwO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBzdGVwLlBvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBTdGFydE1vdmUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoIENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uSnVtcCkgKTtcclxuICAgICAgICB0aGlzLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgSnVtcERvd24oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5KdW1wZG93bikpO1xyXG4gICAgfVxyXG5cclxuICAgIEZseSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkZseSkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFBsYXllckRlYXRoOmJvb2xlYW47XHJcbiAgICAvL+inpuWPkeWPsOmYtlxyXG4gICAgVG91Y2hHcm91bmQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJEZWF0aCB8fCAhdGhpcy5DdXJTdGVwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoKHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5JdGVtVHlwZSA9PSBJdGVtLkl0ZW1UeXBlLk5vbmUpJiYodGhpcy5DdXJTdGVwLklzRW1wdHl8fCh0aGlzLkN1clN0ZXAuTGVmdFBhcmVudCYmdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50JiZ0aGlzLkN1clN0ZXAuTGVmdFBhcmVudC5TdGVwSXRlbS5Jc0ZvcmJpZGVuJiZ0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbikpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgICAgIHZhciBjbGlwTmFtZTpzdHJpbmcgPSBDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkZhbGwpO1xyXG4gICAgICAgICAgICBpZih0aGlzLm1fU3RhdGVNYXBbY2xpcE5hbWVdKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoY2xpcE5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5Ub3VjaEl0ZW0odGhpcyk7XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICAvKipcclxuICAgICAqIOenu+WKqFxyXG4gICAgICogQHBhcmFtIHtMYXlhLlZlY3RvcjN9IHZlY3RvciDnp7vliqjlkJHph4/lgLxcclxuICAgICAqL1xyXG4gICAgVHJhbnNsYXRlKCB2ZWN0b3I6TGF5YS5WZWN0b3IzICk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnRyYW5zbGF0ZSh2ZWN0b3IpO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5hZGQodGhpcy5fTG9naWNQb3NpdGlvbix2ZWN0b3IsdGhpcy5fTG9naWNQb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDnjqnlrrbmjqfliLblmahcclxuICAgICAqIEBwYXJhbSBuZXdDdHJsZXIg5paw546p5a625o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIEFkZEN0cmxlcihuZXdDdHJsZXI6UGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXIgKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGN0cmxlcjpQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlciA9IHRoaXMuX0N0cmxlcjtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSBuZXdDdHJsZXI7XHJcbiAgICAgICAgbmV3Q3RybGVyLk5leHRDdHJsID1jdHJsZXI7XHJcbiAgICAgICAgbmV3Q3RybGVyLlNldFBsYXllcih0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+S6pOaOp+WItuWZqFxyXG4gICAgICovXHJcbiAgICBQb3BDdHJsZXIoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyID0gdGhpcy5fQ3RybGVyLk5leHRDdHJsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqBCVUZGXHJcbiAgICAgKiBAcGFyYW0gYnVmZiBcclxuICAgICAqIEBwYXJhbSBpbmRleCBcclxuICAgICAqL1xyXG4gICAgQWRkQnVmZihidWZmOkl0ZW0uQmFzZVBsYXllckJ1ZmYpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICB2YXIgaW5kZXg6bnVtYmVyID0gYnVmZi5JZHg7XHJcbiAgICAgICAgaWYodGhpcy5CdWZmQXJyW2luZGV4XSE9bnVsbHx8dGhpcy5CdWZmQXJyW2luZGV4XSE9dW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYnVmZk1vZGVsOkxheWEuU3ByaXRlM0QgPSB0aGlzLm1fQnVmZk1vZGVsW2J1ZmYuVHlwZV07XHJcbiAgICAgICAgaWYoYnVmZk1vZGVsKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJ1ZmZNb2RlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkJ1ZmZBcnJbaW5kZXhdID0gYnVmZjtcclxuICAgICAgICBidWZmLklkeCA9IGluZGV4O1xyXG4gICAgICAgIGJ1ZmYuU3RhcnQodGhpcyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog57uT5p2fQlVGRlxyXG4gICAgICovXHJcbiAgICBDb21wbGV0ZUJ1ZmYoaW5kZXg6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBidWZmOkl0ZW0uQmFzZVBsYXllckJ1ZmYgPSB0aGlzLkJ1ZmZBcnJbaW5kZXhdO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6TGF5YS5TcHJpdGUzRCA9IHRoaXMubV9CdWZmTW9kZWxbYnVmZi5UeXBlXTtcclxuICAgICAgICBpZihidWZmTW9kZWwpIGJ1ZmZNb2RlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1ZmZBcnJbaW5kZXhdPW51bGw7XHJcbiAgICAgICAgaWYoYnVmZj09bnVsbHx8YnVmZj09dW5kZWZpbmVkIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9VcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXJEZWF0aClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlci5VcGRhdGUoKTtcclxuICAgICAgICBmb3IoIHZhciBidWZmSWR4Om51bWJlciA9IDA7YnVmZklkeDwyOysrYnVmZklkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZih0aGlzLkJ1ZmZBcnJbYnVmZklkeF0hPW51bGx8fHRoaXMuQnVmZkFycltidWZmSWR4XSE9dW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5CdWZmQXJyW2J1ZmZJZHhdLlVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEZseVByZXBhcmUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0ZXBEYXRhXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHt9XHJcbiAgICBHZXREYXRhKCBzdGVwOlN0ZXAgKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyQ29udHJvbGVyIHtcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGxheWVyQ3RybGVyIHtcclxuICAgICAgICAvL+WFrOWFseaOpeWPo1xyXG4gICAgICAgIE5leHRDdHJsOiBCYXNlUGxheWVyQ3RybGVyO1xyXG4gICAgICAgIHBsYXllcjogUGxheWVyO1xyXG5cclxuICAgICAgICBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTZXRQbGF5ZXIocGxheWVyOiBQbGF5ZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllciwgY3RybGVyOiBCYXNlUGxheWVyQ3RybGVyID0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY3RybGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGN0cmxlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5OZXh0Q3RybCA9IGN0cmxlcjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfVXBkYXRlKCk6IHZvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlKjkuo7op5LoibLmraPluLjnirbmgIHkuIvnmoTnp7vliqhcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJOb3JtQ3RybGVyIGV4dGVuZHMgQmFzZVBsYXllckN0cmxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1N0YXJ0UFM6IExheWEuVmVjdG9yMztcclxuICAgICAgICBwcml2YXRlIG1fVGFyZ2V0UFM6IExheWEuVmVjdG9yMztcclxuICAgICAgICBwcml2YXRlIGdldCBNaWRkbGVQUygpOiBMYXlhLlZlY3RvcjMge1xyXG4gICAgICAgICAgICB2YXIgbWlkbGVQUzogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMubGVycCh0aGlzLm1fU3RhcnRQUywgdGhpcy5tX1RhcmdldFBTLCAwLjUsIG1pZGxlUFMpO1xyXG4gICAgICAgICAgICBtaWRsZVBTLnkgKz0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICAgICAgcmV0dXJuIG1pZGxlUFM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIElzRmFsbGluZzogYm9vbGVhbjtcclxuICAgICAgICBUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IExhc3RUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VGltZTogbnVtYmVyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuUGxheWVyTW92ZVRpbWUgLSAodGhpcy5UaW1lIC0gTGF5YS50aW1lci5jdXJyVGltZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKuW3sua2iOiAl+aXtumXtOeZvuWIhuavlCAqL1xyXG4gICAgICAgIGdldCBUaW1lUGVyY2VudCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5MYXN0VGltZSAvIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydE1vdmUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IExheWEudGltZXIuY3VyclRpbWVyICsgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuUGxheWVyTW92ZVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSXNGYWxsaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubV9TdGFydFBTID0gdGhpcy5wbGF5ZXIuUG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubV9UYXJnZXRQUyA9IHRoaXMucGxheWVyLkN1clN0ZXAuUG9zaXRpb247XHJcbiAgICAgICAgICAgIHRoaXMubV9UYXJnZXRQUy55ICs9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciByb3RhdGlvbjogTGF5YS5RdWF0ZXJuaW9uID0gbmV3IExheWEuUXVhdGVybmlvbigpO1xyXG4gICAgICAgICAgICB2YXIgbG9va1RvUFMgPSB0aGlzLm1fVGFyZ2V0UFMuY2xvbmUoKTtcclxuICAgICAgICAgICAgbG9va1RvUFMueSA9IHRoaXMubV9TdGFydFBTLnk7XHJcbiAgICAgICAgICAgIGxvb2tUb1BTLnogPSAtbG9va1RvUFMuelxyXG4gICAgICAgICAgICB2YXIgdXBEaXI6IExheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgdXBEaXIueSA9IDE7XHJcbiAgICAgICAgICAgIHZhciBzdGFydFBTOkxheWEuVmVjdG9yMyA9IHRoaXMubV9TdGFydFBTLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHN0YXJ0UFMueiA9IC1zdGFydFBTLno7XHJcbiAgICAgICAgICAgIExheWEuUXVhdGVybmlvbi5sb29rQXQoc3RhcnRQUywgbG9va1RvUFMsIHVwRGlyLCByb3RhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnRyYW5zZm9ybS5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllciA9IG51bGwpIHtcclxuICAgICAgICAgICAgc3VwZXIocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5UaW1lIDw9IExheWEudGltZXIuY3VyclRpbWVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuU2V0U3RlcCh0aGlzLnBsYXllci5DdXJTdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFzdFRpbWU6IG51bWJlciA9IHRoaXMuTGFzdFRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhdGU6IG51bWJlciA9IHRoaXMuVGltZVBlcmNlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vdmVUaW1lUmF0ZTogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmFsbFRpbWVQb2ludDogbnVtYmVyID0gMC40O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydFBTOiBMYXlhLlZlY3RvcjM7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldFBTOiBMYXlhLlZlY3RvcjM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhdGUgPiBmYWxsVGltZVBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5Jc0ZhbGxpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuSXNGYWxsaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLkp1bXBEb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVUaW1lUmF0ZSA9IChyYXRlIC0gZmFsbFRpbWVQb2ludCkgLyAoMSAtIGZhbGxUaW1lUG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQUyA9IHRoaXMubV9UYXJnZXRQUztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQUyA9IHRoaXMuTWlkZGxlUFM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVRpbWVSYXRlID0gcmF0ZSAvIGZhbGxUaW1lUG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFBTID0gdGhpcy5NaWRkbGVQUztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQUyA9IHRoaXMubV9TdGFydFBTO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuUGxheWVyRGVhdGgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3UHMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTGF5YS5WZWN0b3IzLmxlcnAoc3RhcnRQUywgdGFyZ2V0UFMsIG1vdmVUaW1lUmF0ZSwgbmV3UHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlBvc2l0aW9uID0gbmV3UHM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v546p5a626aOe6KGMXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyRmx5IGV4dGVuZHMgQmFzZVBsYXllckN0cmxlciB7XHJcbiAgICAgICAgU3BlZWQ6IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7njqnlrrZcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIOaTjeaOp+inkuiJslxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNldFBsYXllcihwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICBzdXBlci5TZXRQbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgcGxheWVyLlRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsIDApKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBzdXBlcihudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy92YXIgdmVjdG9yID0gbmV3IExheWEuVmVjdG9yMygwLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsLTEqQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlLzIpO1xyXG4gICAgICAgICAgICAvLyBMYXlhLlZlY3RvcjMuc2NhbGUodmVjdG9yLHRoaXMuU3BlZWQsdmVjdG9yKTtcclxuICAgICAgICAgICAgdmFyIHZlY3RvcjogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygwLCAwLjE0NiwgLTAuMTAzOTQpXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLlRyYW5zbGF0ZSh2ZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQge0l0ZW19IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi9Nb3VudExpbmVcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG50eXBlIE1Mb2NhdGlvbiA9IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4vL+atpVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG57XHJcbiAgICAvL+aooeWei+S4quaVsFxyXG4gICAgcHVibGljIHN0YXRpYyBzdGVwTW9kZWxOdW06bnVtYmVyID0gMztcclxuXHJcbiAgICBMZWZ0UGFyZW50OlN0ZXA7XHJcbiAgICBSaWdodFBhcmVudDpTdGVwO1xyXG4gICAgTGVmdENoaWxkOlN0ZXA7XHJcbiAgICBSaWdodENoaWxkOlN0ZXA7XHJcbiAgICBTdGVwSXRlbTpTdGVwSXRlbTtcclxuICAgIFJvYWROdW06bnVtYmVyO1xyXG4gICAgTWFyazphbnk7XHJcbiAgICBGbG9vcjpNb3VudExpbmU7XHJcbiAgICBJZHg6bnVtYmVyO1xyXG4gICAgXHJcbiAgICAvL+WFrOacieaOpeWPo1xyXG4gICAgc2V0IFBvc2l0aW9uKCBuZXdQUzpMYXlhLlZlY3RvcjMgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9jYXRpb24oKTpNTG9jYXRpb25cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKHRoaXMuSWR4LTEsdGhpcy5GbG9vci5GbG9vck51bSk7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNEZWFkUm9hZCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNEZWFkUm9hZHx8IXRoaXMuYWN0aXZlfHwgdGhpcy5TdGVwSXRlbS5Jc0RpZmZpY3VsdHk7XHJcbiAgICB9XHJcbiAgICBzZXQgSXNEZWFkUm9hZCh2YWx1ZTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBJc0ZvcmJpZGVuKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlN0ZXBJdGVtLklzRm9yYmlkZW47XHJcbiAgICB9XHJcbiAgICBnZXQgSXNFbXB0eSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gISh0aGlzLmFjdGl2ZSYmdGhpcy5GbG9vci5hY3RpdmUpO1xyXG4gICAgfVxyXG4gICAgUHV0SXRlbSggaXRlbUVudW1lOkl0ZW0uSXRlbVR5cGUgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGl0ZW1FbnVtZSA9PSBJdGVtLkl0ZW1UeXBlLkVtcHR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPWZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5QdXRJdGVtKGl0ZW1FbnVtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXRTdGVwKG5ld1BzOkxheWEuVmVjdG9yMyxpZ25vcmVBY3RpdmU6Ym9vbGVhbiA9IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUG9zaXRpb24gPSBuZXdQcztcclxuICAgICAgICBpZighaWdub3JlQWN0aXZlKVxyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdmFyIG1vZGVsUHMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlB1dEl0ZW0oSXRlbS5JdGVtVHlwZS5Ob25lKTtcclxuXHJcbiAgICAgICAgdGhpcy5MZWZ0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxlZnRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb2FkTnVtID0gMDtcclxuICAgIH1cclxuICAgIF9TdGVwTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIGNvbnN0cnVjdG9yKGZsb29yOk1vdW50TGluZSxpZHg6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIC8vc3VwZXIobmV3IExheWEuQm94TWVzaCgxLDEsMSkgKTtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMpO1xyXG4gICAgICAgIGlmKHRoaXMuSWR4ICE9IDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxKyBNYXRoLnJhbmRvbSgpKlN0ZXAuc3RlcE1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wXCIrSWR4KVxyXG4gICAgICAgICAgICB2YXIgbW9kZWwgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoIExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC41LCAwLjUsIDAuNSkpIDsvL2xvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGNsb25lTW9kZWwgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIGNsb25lTW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoY2xvbmVNb2RlbCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW1GYWN0b3J5KEl0ZW0uSXRlbVR5cGUuTm9uZSx0aGlzKTs7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5SZXNldEl0ZW0oKTtcclxuICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgdGhpcy5JZHggPSBpZHg7XHJcblxyXG4gICAgICAgIHRoaXMuTGVmdFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRDaGlsZCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlJvYWROdW0gPSAwO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfSXNEZWFkUm9hZDpib29sZWFuO1xyXG5cclxufSIsIi8qKlxyXG4gKiDkvZzogIU6TW9cclxuICog5ZCv5Yqo5Zy65pmvXHJcbiAqL1xyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgTG9hZFNjZW5lIGZyb20gXCIuL1NjZW5lL0xvYWRTY2VuZVwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiO1xyXG5jbGFzcyBHYW1lXHJcbntcclxuXHRfRnJhbWU6RnJhbWVXb3JrO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzcyA9IEFQUDtcclxuICAgICAgICBMYXlhM0QuaW5pdCg3NTAsMTMzNCx0cnVlKTtcclxuICAgICAgICBHYW1lQ29uZmlnLmluaXQoKTtcclxuICAgICAgICAvL0xheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GVUxMO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GSVhFRF9XSURUSDtcclxuICAgICAgICBcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBMYXlhLlN0YWdlLlNDUkVFTl9WRVJUSUNBTDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IExheWEuU3RhZ2UuQUxJR05fQk9UVE9NO1xyXG4gICAgICAgIC8v5byA5ZCv57uf6K6h5L+h5oGvXHJcblx0XHRMYXlhLlN0YXQuc2hvdygpXHJcbiAgICAgICAgdmFyIHJlc0NvbCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvbG9jYWxjb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU30se3VybDpcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfV07XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChyZXNDb2wsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLkluaXQoKTtcclxuICAgICAgICB2YXIgc2NlbmVNZ3I6U2NlbmVNYW5hZ2VyID0gQVBQLlNjZW5lTWFuYWdlcjtcclxuICAgICAgICBzY2VuZU1nci5DaGFuZ2VTY2VuZShuZXcgTG9hZFNjZW5lKCkpO1xyXG4gICAgICAgIEFQUC5GcmFtZVdvcmsuQWRkTWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcilcclxuICAgICAgICBMYXlhLnRpbWVyLmZyYW1lTG9vcCgzLHRoaXMsdGhpcy5VcGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSggKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5GcmFtZVdvcmsuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxudmFyIEdNID0gbmV3IEdhbWUoKTtcclxuIiwiaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vU2NlbmVcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR2FtZVNjZW5lUGxheSBmcm9tIFwiLi9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheVwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZURpcmVjdG9yIGV4dGVuZHMgU2NlbmUuQmFzZURpcmVjdG9yIHtcclxuICAgIHB1YmxpYyBnZXQgR2FtZVBsYXkoKTpHYW1lU2NlbmVQbGF5XHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ3VyU3RhdGUgYXMgR2FtZVNjZW5lUGxheTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsb2FkTGlzdDJEID0gW3BhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIikscGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVwiKSxwYXRoLkdldERlcGF0aFVJSlMoXCJFbmRHYW1lXCIpXTtcclxuICAgICAgICB0aGlzLkNoYW5nZVN0YXRlKG5ldyBTY2VuZS5Mb2FkU2NlbmVMb2dpYyhsb2FkTGlzdDJELG51bGwsbmV3IEdhbWVTY2VuZVBsYXkoKSkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIEVuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCIvKlxyXG7kvZzogIU6TW9cclxu6Lez5bGx576K5Zy65pmv5qC45b+D5Yqf6IO9XHJcbiovXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW5kR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgR2FtZUNhbWVyYSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVDYW1lcmFcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLy4uL0dhbWUvUGxheWVyXCJcclxuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vLi4vR2FtZS9Nb3VudExpbmVcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbnR5cGUgSXRlbUxheW91dCA9IEl0ZW0uSXRlbUxheW91dDtcclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuLy/muLjmiI/lnLrmma9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lXHJcbntcclxuICAgIE1vZGVsTG9hZDpib29sZWFuO1xyXG4gICAgR2FtZURpcjpHYW1lRGlyZWN0b3I7XHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpHYW1lRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdhbWVEaXJlY3RvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fU2NlbmVPYmogPSBuZXcgTGF5YS5TY2VuZTNEO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEVudGVyR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VudGVyR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4uL2NvbnRyb2xlci9BUFBcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEd1aWRlck1hbmFnZXIgXHJcbntcclxuLy/lr7nlpJbmjqXlj6NcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6R3VpZGVyTWFuYWdlcjtcclxuICAgIHN0YXRpYyBnZXQgTWdyKCk6R3VpZGVyTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmKEd1aWRlck1hbmFnZXIuX01nciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR3VpZGVyTWFuYWdlci5fTWdyID0gbmV3IEd1aWRlck1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEd1aWRlck1hbmFnZXIuX01ncjtcclxuICAgIH1cclxuICAgIFNjZW5lTWdyOlNjZW5lTWFuYWdlcjtcclxuICAgIEN1clNjZW5lOkd1aWRlclNjZW5lO1xyXG4gICAgcHVibGljIGdldCBHYW1lRGlyKCk6R3VpZGVyRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTY2VuZS5HdWlkRGlyO1xyXG4gICAgfVxyXG4gICAgLy/ov5vlhaXmuLjmiI/lnLrmma/otbDov5nkuKrmjqXlj6NcclxuICAgIEVudGVyU2NlbmUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5ld0dhbWVTY2VuZSA9IG5ldyBHdWlkZXJTY2VuZSgpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ2hhbmdlU2NlbmUobmV3R2FtZVNjZW5lKTtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbmV3R2FtZVNjZW5lO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlclNjZW5lIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lXHJcbntcclxuICAgIEd1aWREaXI6R3VpZGVyRGlyZWN0b3I7XHJcbiAgICBDdXJEaXI6QmFzZURpcmVjdG9yO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaXJlY3RvcjpTY2VuZS5CYXNlRGlyZWN0b3IgPSBuZXcgR3VpZGVyRGlyZWN0b3IoKTtcclxuICAgICAgICByZXR1cm4gRGlyZWN0b3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlckRpcmVjdG9yIGV4dGVuZHMgU2NlbmUuQmFzZURpcmVjdG9yXHJcbntcclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoIClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZDJETGlzdCA9IFt7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIikgLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpwYXRoLkdldEF0bFBhdGgoXCJjb21wXCIpLHR5cGU6IExheWEuTG9hZGVyLkFUTEFTIH1dO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlR2FtZVBsYXkobmV3IFNjZW5lLkxvYWRTY2VuZUxvZ2ljKGxvYWQyRExpc3QsbnVsbCxuZXcgR3VpZGVyU2NlbmVQbGF5KCkpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKCk6dm9pZFxyXG4gICAge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyU2NlbmVQbGF5IGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lUGxheWVcclxue1xyXG4gICAgVUk6RW50ZXJHYW1lVUk7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH0gICAgXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8RW50ZXJHYW1lVUk+KEVudGVyR2FtZVVJKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuLy4uL3VpL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgTG9hZGluZ1VJIGZyb20gXCIuLy4uL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJXCJcclxuaW1wb3J0IEZNV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4vR3VpZGVyTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBCRyBmcm9tIFwiLi8uLi91aS9CR1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkU2NlbmUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgTG9hZERpcmN0b3IoKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5jbGFzcyBMb2FkRGlyY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsb2FkTGlzdDJEID0gW3t1cmw6XCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpcInVpL1Jlc291cmNlL2xvY2FsY29tcC5hdGxhc1wiLHR5cGU6TGF5YS5Mb2FkZXIuQVRMQVN9XTtcclxuICAgICAgICB0aGlzLkNoYW5nZUdhbWVQbGF5KCBuZXcgU2NlbmUuTG9hZFNjZW5lTG9naWMobG9hZExpc3QyRCxudWxsLG5ldyBMb2FkU2NlbmVQbGF5ZSgpKSApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+WKoOi9veWcuuaZr+mAu+i+kVxyXG5jbGFzcyBMb2FkU2NlbmVQbGF5ZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllXHJcbntcclxuICAgIHByaXZhdGUgbV9Db3VudDJETG9hZDpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fQ291bnQzRExvYWQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0xvYWRGYWlsZTpzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fQ291bnRWYWx1ZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fTG9hZGluZ1VJOkxvYWRpbmdVSTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMDtcclxuICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9Db3VudFZhbHVlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFN0YXJ0TG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBcIlwiO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTJEQXJyID0gW1xyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVJhbmtcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiZW50ZXJzY2VuZXVpXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJjb21wXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEpzb25QYXRoKFwiQ2hhcmFjdGVySW5mb1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIkl0ZW1JbmZvXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEpzb25QYXRoKFwiTGV2ZWxJbmZvXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEpzb25QYXRoKFwiT2JzdGFjbGVJbmZvXCIpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkVSUk9SLHRoaXMsdGhpcy5vbkVycm9yKTtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLm9uQ29tcGxldGUpO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTNEQXJyID0gWyBcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDFfY2hpbGRfMDFcIikgLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV9hZHVsdF8wMVwiKSAsXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDRcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2ZseWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfc3RpbmdfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2Fic29yZF8wMVwiKSxcclxuICAgICAgICBdXHJcbiAgICAgICAgdGhpcy5Mb2FkKHJlc291cmNlMkRBcnIscmVzb3VyY2UzREFycik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMb2FkKGFycjJEOkFycmF5PGFueT4gPSBudWxsLGFycjNEOkFycmF5PGFueT49bnVsbClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZihhcnIyRCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQoYXJyMkQsbnVsbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbjJEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSAtPTAuNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXJyM0QhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jcmVhdGUoYXJyM0QsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLG51bGwpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uM0RQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudFZhbHVlIC09MC41O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uM0RQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuVmFsdWUgPSAodGhpcy5tX0NvdW50MkRMb2FkICsgdGhpcy5tX0NvdW50M0RMb2FkKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb24yRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLm1fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPXZhbHVlLzI7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5WYWx1ZSA9ICh0aGlzLm1fQ291bnQyRExvYWQgKyB0aGlzLm1fQ291bnQzRExvYWQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkVycm9yKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSArPSBzdHI7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvYWRFcnJvcjpcIitzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNvbXBsZXRlKGRhdGEpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aGlEaXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLlJlbG9hZCh0aGlzLm1fTG9hZEZhaWxlLGZ1bmN0aW9uKCk6dm9pZHt0aGlEaXIuTG9hZCgpfSApO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkJHID0gbmV3IEJHKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuQ29tcGxldGUoKCk9PntHdWlkZXJNYW5hZ2VyLk1nci5FbnRlclNjZW5lKCl9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8TG9hZGluZ1VJPihMb2FkaW5nVUkpO1xyXG4gICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9IDAuNTtcclxuICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAxO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuU3RhcnRMb2FkKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZENvbXBsZXRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRlNNIH0gZnJvbSBcIi4vLi4vQmFzZS9GU01cIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuZXhwb3J0IG1vZHVsZSBTY2VuZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgU2NlbmVGU00gZXh0ZW5kcyBGU00uRlNNPEJhc2VTY2VuZT5cclxuICAgIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lnLrmma/ku6PnkIZcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmUgZXh0ZW5kcyBGU00uU3RhdGUge1xyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0R2FtZVRpbWU6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENsb2NrOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBtX1NjZW5lT2JqOiBMYXlhLlNjZW5lM0Q7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fRGlyZWN0b3I6IEJhc2VEaXJlY3RvcjtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBTY2VuZU9iaigpOiBMYXlhLlNjZW5lM0Qge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX1NjZW5lT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IERpcmVjdG9yKCk6IEJhc2VEaXJlY3RvciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fRGlyZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgR2VuRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHV0T2JqKHNwcml0ZTNEOiBMYXlhLlNwcml0ZTNEKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fU2NlbmVPYmopIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9TY2VuZU9iai5hZGRDaGlsZChzcHJpdGUzRCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJhc2VTY2VuZSBQdXRPYmogRXJyb3I6ZW1wdHkgU3ByaXRlM0RcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yID0gdGhpcy5HZW5EaXJlY3RvcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fRGlyZWN0b3IuU3RhcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNjZW5lT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNjZW5lT2JqLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLlNjZW5lT2JqLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdG9yID0gdGhpcy5TY2VuZU9iai5nZXRDaGlsZEF0KDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkRpcmVjdG9yLkVuZCgpO1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0RpcmVjdG9yKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yLlVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VEaXJlY3RvciBleHRlbmRzIEZTTS5GU008QmFzZVNjZW5lUGxheWU+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfU3RhcnRHYW1lVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ2xvY2s6IG51bWJlcjtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgLy/np4HmnInlsZ7mgKflkozlip/og71cclxuICAgICAgICBnZXQgR2FtZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RpbWVVcENsb2NrID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1RpbWVVcENsb2NrIC0gdGhpcy5fU3RhcnRHYW1lVGltZSAtIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5fU3RhcnRHYW1lVGltZSAtIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBHYW1lVGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IEN1ckdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9TdGFydEdhbWVUaW1lICsgdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmVTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5TdGFydFRpbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydFRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBTdGFydCgpOiB2b2lkIDtcclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IEVuZCgpOiB2b2lkO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGltZVVwKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGltZVVwQ2xvY2sgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lVGltZVVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5VcGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIENvbnRpbnVlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lQ29udGludWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCArPSBMYXlhLnRpbWVyLmN1cnJUaW1lciAtIHRoaXMuX1RpbWVVcENsb2NrO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliIfmjaLliafmnKxcclxuICAgICAgICAgKiBAcGFyYW0gbmV3U2NlbmVQbGF5IOaWsOWJp+acrFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBDaGFuZ2VHYW1lUGxheSggbmV3U2NlbmVQbGF5OkJhc2VTY2VuZVBsYXllICk6IHZvaWQgIHtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VTdGF0ZShuZXdTY2VuZVBsYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNjZW5lUGxheWUgZXh0ZW5kcyBGU00uU3RhdGUge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2UgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTG9hZFNjZW5lTG9naWMgZXh0ZW5kcyBCYXNlU2NlbmVQbGF5ZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0xvYWQyRExpc3Q6IGFueVtdO1xyXG4gICAgICAgIHByaXZhdGUgbV9Mb2FkM0RMaXN0OiBhbnlbXTtcclxuICAgICAgICBwcml2YXRlIG1fTmV4dFNjZW5lOiBTY2VuZS5CYXNlU2NlbmVQbGF5ZTtcclxuICAgICAgICBwdWJsaWMgZ2V0IE93bmVyRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9vd25lciBhcyBCYXNlRGlyZWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBsb2FkMkRMaXN0IDJE5Yqg6L295YiX6KGoXHJcbiAgICAgICAgICogQHBhcmFtIGxvYWQzRExpc3QgM0TliqDovb3liJfooahcclxuICAgICAgICAgKiBAcGFyYW0gbmV4dFNjZW5lIOS4i+S4gOagvOWcuuaZr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGxvYWQyRExpc3Q6IGFueVtdLCBsb2FkM0RMaXN0OiBhbnlbXSwgbmV4dFNjZW5lOiBTY2VuZS5CYXNlU2NlbmVQbGF5ZSkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZDJETGlzdCA9IGxvYWQyRExpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkM0RMaXN0ID0gbG9hZDNETGlzdDtcclxuICAgICAgICAgICAgdGhpcy5tX05leHRTY2VuZSA9IG5leHRTY2VuZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVuZCgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLm9uY2UoTGF5YS5FdmVudC5DT01QTEVURSwgdGhpcywgdGhpcy5Mb2FkQ29tcGxldGUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0xvYWQyRExpc3QpXHJcbiAgICAgICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMubV9Mb2FkMkRMaXN0LCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9Mb2FkM0RMaXN0KVxyXG4gICAgICAgICAgICAgICAgTGF5YS5sb2FkZXIubG9hZCh0aGlzLm1fTG9hZDNETGlzdCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExvYWRDb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5Pd25lckRpcmVjdG9yLkNoYW5nZVN0YXRlKHRoaXMubV9OZXh0U2NlbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLy4uLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi8uLi9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuLy4uL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEVuZEdhbWVVSSBmcm9tIFwiLi8uLi8uLi91aS9FbmRHYW1lVUlcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBHYW1lQ2FtZXJhIGZyb20gXCIuLy4uLy4uL0dhbWUvR2FtZUNhbWVyYVwiXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vLi4vLi4vR2FtZS9QbGF5ZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuLy4uLy4uL0dhbWUvSW5wdXRcIlxyXG5pbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi8uLi8uLi91aS9HYW1lVUlcIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuLy4uLy4uL0dhbWUvTW91bnRMaW5lXCJcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLy4uLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEJHVUkgZnJvbSBcIi4vLi4vLi4vdWkvQkdcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4uL0dhbWVTY2VuZVwiO1xyXG5pbXBvcnQgeyBHYW1lQWdlbnQgfSBmcm9tIFwiLi8uLi8uLi9BZ2VudC9HYW1lQWdlbnRcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIjtcclxuaW1wb3J0IHsgV2VjaGF0T3BlbiB9IGZyb20gXCIuLi8uLi9wbGF0Zm9ybS9XZWNoYXRPcGVuXCI7XHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCI7XHJcblxyXG50eXBlIEl0ZW1MYXlvdXQgPSBJdGVtLkl0ZW1MYXlvdXQ7XHJcbnR5cGUgTGluZUl0ZW1JbmZvID0gSXRlbS5MaW5lSXRlbUluZm87XHJcbnZhciBJdGVtVHlwZSA9IEl0ZW0uSXRlbVR5cGU7XHJcblxyXG4vL+a4uOaIj+WvvOa8lFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmVQbGF5IGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lUGxheWUge1xyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIHByaXZhdGUgX0hlYWRGbG9vcklkeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfVGFpbEZMb29ySWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Db3VudFRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0Jvb3RvbUZsb29yOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9TdGFydFBvc2l0aW9uOiBMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF9HYW1lVXBkYXRlOiAoKSA9PiB2b2lkO1xyXG4gICAgcHJpdmF0ZSBfUGFuZWxVSTogR2FtZVVJO1xyXG4gICAgcHJpdmF0ZSBfR29sZE51bTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfTG9naWNHb2xkTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9DdXJCRzogQkdVSTtcclxuICAgIHByaXZhdGUgX1NhZmVMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcblxyXG4gICAgQ2FtZXJhOiBHYW1lQ2FtZXJhO1xyXG4gICAgR2FtZVNjZW5lOiBCYXNlU2NlbmU7XHJcbiAgICBNb3VudExpbmVzOiBNb3VudExpbmVbXTtcclxuICAgIFBsYXllcjogUGxheWVyO1xyXG4gICAgSW5wdXRDdHJsOiBJbnB1dC5CYXNlR2FtZUlucHV0O1xyXG4gICAgSXRlbUxheW91dDogSXRlbUxheW91dDtcclxuICAgIEN1ckxpbmVSZXdhcmRzOiBBcnJheTxMaW5lSXRlbUluZm8+O1xyXG4gICAgQ3VyTGluZUJhcnJpZXJzOiBBcnJheTxMaW5lSXRlbUluZm8+O1xyXG4gICAgbmFtZTogbnVtYmVyO1xyXG4gICAgRnJlc2hCR0NvdW50OiBudW1iZXI7XHJcblxyXG4gICAgZ2V0IFNhZmVMb2NhdGlvbigpOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NhZmVMb2NhdGlvbjtcclxuICAgIH1cclxuICAgIGdldCBQYW5lbFVJKCk6IEdhbWVVSSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1BhbmVsVUk7XHJcbiAgICB9XHJcbiAgICBzZXQgUGFuZWxVSSh2YWx1ZTogR2FtZVVJKSB7XHJcbiAgICAgICAgdmFsdWUuU2V0TGVmdFRvdWNoKHRoaXMsICgpID0+IHsgdGhpcy5JbnB1dEN0cmwuSW5wdXQoZmFsc2UpOyB9KVxyXG4gICAgICAgIHZhbHVlLlNldFJpZ2h0VG91Y2godGhpcywgKCkgPT4geyB0aGlzLklucHV0Q3RybC5JbnB1dCh0cnVlKTsgfSk7XHJcbiAgICAgICAgdGhpcy5fUGFuZWxVSSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IEhlYWRGbG9vcigpOiBNb3VudExpbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbdGhpcy5fSGVhZEZsb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBUYWlsRkxvb3IoKTogTW91bnRMaW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb3VudExpbmVzW3RoaXMuX1RhaWxGTG9vcklkeF07XHJcbiAgICB9XHJcbiAgICBnZXQgUGxheWVyRmxvb3IoKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgZmxvb3I6IG51bWJlciA9IHRoaXMuX1N0YXJ0UG9zaXRpb24ueiAtIHRoaXMuUGxheWVyLkxvZ2ljUG9zaXRpb24uejtcclxuICAgICAgICBmbG9vciA9IE1hdGgucm91bmQoZmxvb3IgLyAoQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlIC8gMikpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhmbG9vcik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IERpc3RhbmNlKCk6IG51bWJlciAge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuUGxheWVyRmxvb3IpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFBsYXllckZsb29yTGluZSgpOiBNb3VudExpbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLlBsYXllckZsb29yKTtcclxuICAgIH1cclxuICAgIGdldCBHYW1lVGltZSgpOiBudW1iZXIgIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMubV9vd25lciBhcyBHYW1lRGlyZWN0b3IpLkdhbWVUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuR2FtZVNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLk1vdW50TGluZXMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5JdGVtTGF5b3V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX0Jvb3RvbUZsb29yID0gMDtcclxuICAgICAgICB0aGlzLl9TdGFydFBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0N1ckJHID0gQVBQLlNjZW5lTWFuYWdlci5CRyBhcyBCR1VJO1xyXG4gICAgICAgIHRoaXMuRnJlc2hCR0NvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBBZGRJbnB1dEN0cmxlcih2YWx1ZTogSW5wdXQuQmFzZUdhbWVJbnB1dCkge1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsLkNsZWFyKCk7XHJcbiAgICAgICAgdmFsdWUuTmV4dElucHV0ID0gdGhpcy5JbnB1dEN0cmw7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIFBvcElucHV0Q3RybGVyKCkge1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdGhpcy5JbnB1dEN0cmwuTmV4dElucHV0O1xyXG4gICAgfVxyXG4gICAgQWRkR29sZChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX0dvbGROdW0gKz0gbnVtO1xyXG4gICAgICAgIHRoaXMuQWRkTG9naWNHb2xkKG51bSk7XHJcbiAgICB9XHJcbiAgICBBZGRHb2xkVW5Mb2dpY0dvbGQobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9Hb2xkTnVtICs9IG51bTtcclxuICAgIH1cclxuICAgIEFkZExvZ2ljR29sZChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljR29sZE51bSArPSBudW07XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkdvbGQgPSB0aGlzLl9Mb2dpY0dvbGROdW07XHJcbiAgICAgICAgV2VjaGF0T3Blbi5nZXRJbnN0YW5jZXMoKS5kcmF3cGFzcyh0aGlzLl9Mb2dpY0dvbGROdW0gKyBHYW1lQWdlbnQuQWdlbnQuQ3VyU2NvcmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5a6J5YWo5L2N572uXHJcbiAgICBTZXRTYWZlUFMobG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uLlkgPCB0aGlzLlRhaWxGTG9vci5GbG9vck51bSB8fCBsb2NhdGlvbi5ZID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlJlc2V0SXRlbShsb2NhdGlvbi5ZKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5LuO5p+Q5LiA5bGC5byA5aeL5LiA5bGC5bGC6YeN5paw5pGG5pS+6YGT5YW3XHJcbiAgICBSZXNldEl0ZW0oZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICBmb3IgKGxldCBsb29wRmxvb3I6IG51bWJlciA9IGZsb29yOyBsb29wRmxvb3IgPD0gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW07ICsrbG9vcEZsb29yKSB7XHJcbiAgICAgICAgICAgIHZhciBmbG9vckxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb29wRmxvb3IpO1xyXG4gICAgICAgICAgICBmbG9vckxpbmUuTGF5T3V0RGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgZmxvb3JMaW5lLlNldExpbmUoZmxvb3JMaW5lLkZsb29yTnVtKTtcclxuICAgICAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShsb29wRmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+a4heeQhuWxgumBk+WFt1xyXG4gICAgQ2xlYXJGbG9vcihzdGVwOiBTdGVwKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHN0ZXBJdGVtID0gc3RlcC5TdGVwSXRlbTtcclxuICAgICAgICBzdGVwLlB1dEl0ZW0oSXRlbVR5cGUuTm9uZSk7XHJcbiAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgRGVhdGgoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUGxheWVyRGVhdGggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuT25HYW1lQ29tcGxldGUoKTtcclxuICAgICAgICAvL3VpLlNldEdhbWVJbmZvKHRoaXMuUGxheWVyRGlzdGFuY2UsdGhpcy5fR29sZE51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgRW5kKCk6IHZvaWQgIHtcclxuXHJcbiAgICB9XHJcbiAgICAvL+mHjeaWsOW8gOWni1xyXG4gICAgUmVTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG4gICAgU2hvd0lucHV0SW5mbyhpbmZvOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuU2hvd0lucHV0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuICAgIC8v5bem5Y+z56e75YqoXHJcbiAgICBNb3ZlU3RlcChpc1JpZ2h0OiBib29sZWFuKSB7XHJcbiAgICAgICAgLy92YXIgYnVmZiA9IHRoaXMuQnVmZmVyO1xyXG4gICAgICAgIC8v6I635Y+W5LiL5LiA5bGC55qEU3RlcFxyXG4gICAgICAgIHZhciBzdGVwOiBTdGVwID0gdGhpcy5QbGF5ZXIuQ3VyU3RlcDtcclxuICAgICAgICBpZiAoc3RlcCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzUmlnaHQpIHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGVwID09IG51bGwgfHwgc3RlcC5TdGVwSXRlbS5Jc0ZvcmJpZGVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lsYLmlbDojrflj5bmn5DlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgR2V0Rmxvb3JCeUZsb29yKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yOiBNb3VudExpbmUgPSB0aGlzLlRhaWxGTG9vcjtcclxuICAgICAgICBpZiAoZmxvb3IgPCB0YWlsRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vcklEID0gKGZsb29yIC0gdGFpbEZsb29yLkZsb29yTnVtICsgdGhpcy5fVGFpbEZMb29ySWR4KSAlIHRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuTW91bnRMaW5lc1tmbG9vcklEXTtcclxuICAgIH1cclxuXHJcbiAgICBMb29wRG9GbG9vclN0ZXAoZmxvb3I6IG51bWJlciwgT3duZXI6IGFueSwgY2FsbEJhY2s6IChzdGVwOiBTdGVwKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGhpcy5UYWlsRkxvb3IuRmxvb3JOdW0gfHwgZmxvb3IgPiB0aGlzLkhlYWRGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vckxpbmU6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBmbG9vckxpbmUuTG9naWNMZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwID0gZmxvb3JMaW5lLkdldFN0ZXAoaWR4KTtcclxuICAgICAgICAgICAgY2FsbEJhY2suY2FsbChPd25lciwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H5Z2Q5qCH6I635Y+W5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0gbG9jYXRpb24g57Si5byVLOWxguaVsFxyXG4gICAgICovXHJcbiAgICBHZXRTdGVwQnlMb2NhdGlvbihsb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb24pOiBTdGVwIHtcclxuICAgICAgICB2YXIgZ2V0U3RlcDogU3RlcCA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGxvY2F0aW9uLlkpLkdldFN0ZXAobG9jYXRpb24uWCk7XHJcbiAgICAgICAgcmV0dXJuIGdldFN0ZXA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJvlu7rnm7jlhbPmlL7ov5kg6L+Z6YeM6YeN5paw5byA5aeL5LiN5Lya6LWwXHJcbiAgICBwdWJsaWMgU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBuZXcgR2FtZUNhbWVyYSgpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIgPSBuZXcgTGF5YS5WZWN0b3IzKC0zMCwgMCwgMCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5DYW1lcmEpO1xyXG5cclxuICAgICAgICB0aGlzLk1vdW50TGluZXMgPSBbXTtcclxuICAgICAgICB2YXIgbWF4TGluZU51bSA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLk1heExpbmVOdW07XHJcbiAgICAgICAgZm9yICh2YXIgbGluZUlkeDogbnVtYmVyID0gbWF4TGluZU51bSAtIDE7IGxpbmVJZHggPj0gMDsgLS1saW5lSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdNb3VudExpbmUgPSBuZXcgTW91bnRMaW5lKGxpbmVJZHgsIGxpbmVJZHgpO1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaihuZXdNb3VudExpbmUpO1xyXG4gICAgICAgICAgICB0aGlzLk1vdW50TGluZXNbbGluZUlkeF0gPSBuZXdNb3VudExpbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yib5bu6VUlcclxuXHJcbiAgICAgICAgLy/liJvlu7rnjqnlrrZcclxuICAgICAgICB2YXIgcGxheWVyID0gbmV3IFBsYXllcigpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIHZhciBnYW1lQWdlbnQgPSBHYW1lQWdlbnQuQWdlbnQ7XHJcbiAgICAgICAgdmFyIHBsYXllck1vZGVsID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3IuR2V0Q2hhcmFjdGVyTW9kZWwoZ2FtZUFnZW50LkN1ckNoYXJhY3RlcklELGdhbWVBZ2VudC5DdXJMZXZlbCk7XHJcbiAgICAgICAgcGxheWVyLlNldFBsYXllck1vZGVsKHBsYXllck1vZGVsKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLlBsYXllcik7XHJcblxyXG4gICAgICAgIC8v5YeG5aSH546p5a625q275Lqh5LqL5Lu2XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoLCB0aGlzLkRlYXRoLCB0aGlzKTtcclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6L+b5YWl5ri45oiP55qE6K6+572u5pS+6L+Z6YeMIOmHjeaWsOW8gOWni+i1sOi/memHjFxyXG4gICAgcHJvdGVjdGVkIFN0YXJ0R2FtZSgpIHtcclxuICAgICAgICBcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlNjZW5lT2JqLmFtYmllbnRDb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgMSwgMSlcclxuICAgICAgICB0aGlzLl9TYWZlTG9jYXRpb24gPSBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24oMCwgMCk7XHJcbiAgICAgICAgLy/ph43nva7nianlk4FcclxuICAgICAgICB0aGlzLkl0ZW1MYXlvdXQgPSBuZXcgSXRlbS5JdGVtTGF5b3V0KClcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdmFyIGxpbmVzOiBNb3VudExpbmVbXSA9IHRoaXMuTW91bnRMaW5lcztcclxuICAgICAgICAvL+WIm+W7uui+k+WFpeaOp+WItuWZqFxyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gbmV3IElucHV0Lk5vcm1HYW1lSW5wdXQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fSGVhZEZsb29ySWR4ID0gbGluZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLl9UYWlsRkxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlJlc2V0KCk7XHJcbiAgICAgICAgZm9yICh2YXIgaWR4OiBudW1iZXIgPSAwOyBpZHggPCBsaW5lcy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lOiBNb3VudExpbmUgPSB0aGlzLk1vdW50TGluZXNbaWR4XTtcclxuICAgICAgICAgICAgbGluZS5TZXRMaW5lKGlkeCk7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAwKVxyXG4gICAgICAgICAgICAgICAgbGluZXNbaWR4IC0gMV0uU2V0TmV4dEZsb29yKGxpbmUpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciBQbGF5ZXJTdGVwID0gbGluZS5HZXRTdGVwKE1hdGguZmxvb3IobGluZS5Mb2dpY0xlbmd0aCAvIDIpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuUGxheWVyLlNldFN0ZXAoUGxheWVyU3RlcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TYWZlTG9jYXRpb24gPSBQbGF5ZXJTdGVwLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU3RhcnRQb3NpdGlvbiA9IHRoaXMuUGxheWVyLkxvZ2ljUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9QdXRJdGVtSW5MaW5lKGlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FtZXJhLlJlc2V0KG5ldyBMYXlhLlZlY3RvcjMoKSwgbmV3IExheWEuVmVjdG9yMyh0aGlzLlBsYXllci5Qb3NpdGlvbi54LCBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoICogMTAuNSwgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCAqIDkpLCB0aGlzLlBsYXllcik7XHJcbiAgICAgICAgdGhpcy5fR29sZE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy5fTG9naWNHb2xkTnVtID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5QYW5lbFVJID0gQVBQLlVJTWFuYWdlci5TaG93KEdhbWVVSSk7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlJlZ2lzdENsaWNrUGxheWVySXRlbSh0aGlzLHRoaXMuVXNlUGxheWVySXRlbSk7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlJlZ2lzdENsaWNrU2tpbGxJdGVtKHRoaXMsdGhpcy5Vc2VTa2lsbEl0ZW0pO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5Hb2xkID0gMDtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSB0aGlzLkdhbWVUaW1lICsgNjAwMDtcclxuICAgICAgICB0aGlzLl9Cb290b21GbG9vciA9IDA7XHJcbiAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSA9IHRoaXMuX1N0YXJ0Q291bnQ7XHJcbiAgICAgICAgV2VjaGF0T3Blbi5nZXRJbnN0YW5jZXMoKS5kcmF3cGFzcygwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9HYW1lVXBkYXRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy/mraPluLjov5DooYzml7bnmoTmr4/luKfpgLvovpFcclxuICAgIHByaXZhdGUgX1J1bkdhbWVVcGRhdGUoKSB7XHJcbiAgICAgICAgdmFyIGRpc3Q6IG51bWJlciA9IHRoaXMuUGxheWVyRmxvb3I7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkRpc3RhbmNlID0gdGhpcy5EaXN0YW5jZTsgLy90aGlzLkRpc3RhbmNlKCk7Ly9NYXRoLmZsb29yKGRpc3QpO1xyXG4gICAgICAgIGlmICh0aGlzLkZyZXNoQkdDb3VudCA+IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0N1ckJHLlVwZGF0ZVBhZ2UoZGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuRnJlc2hCR0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgKyt0aGlzLkZyZXNoQkdDb3VudDtcclxuXHJcbiAgICAgICAgdmFyIGZsb29WZWN0b3I6IExheWEuVmVjdG9yMyA9IHRoaXMuVGFpbEZMb29yLlBvc2l0aW9uO1xyXG5cclxuICAgICAgICBpZiAoZmxvb1ZlY3Rvci56IC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24ueiA+IDMgKiBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UgLyAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1B1c2hGTG9vcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQ291bnRUaW1lIDwgdGhpcy5HYW1lVGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSB0aGlzLkdhbWVUaW1lICsgMzAwMDtcclxuICAgICAgICAgICAgdGhpcy5fRGVzdHJveUxpbmUodGhpcy5fQm9vdG9tRmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLl9Cb290b21GbG9vciArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLklucHV0Q3RybC5VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+W8gOWni+WAkuiuoeaXtuacn+mXtOeahOavj+W4p+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBfU3RhcnRDb3VudCgpIHtcclxuICAgICAgICB2YXIgdGltZTogc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIHZhciBjb3VudFRpbWU6IG51bWJlciA9IHRoaXMuX0NvdW50VGltZSAtIHRoaXMuR2FtZVRpbWU7XHJcbiAgICAgICAgaWYgKGNvdW50VGltZSA+IDApXHJcbiAgICAgICAgICAgIHRpbWUgKz0gTWF0aC5mbG9vcihjb3VudFRpbWUgLyAxMDAwKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5QYW5lbFVJLkdhbWVQYW5lbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX0dhbWVVcGRhdGUgPSB0aGlzLl9SdW5HYW1lVXBkYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudFRpbWUgPSB0aGlzLkdhbWVUaW1lICsgMzAwMDtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LlJlc2V0R2FtZUl0ZW0oKTtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LlJlc2V0U2tpbGxJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5TZXRDb3VudFRpbWUodGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsIblsYLlkJHkuIrlj6BcclxuICAgIHByb3RlY3RlZCBfUHVzaEZMb29yKCkge1xyXG4gICAgICAgIHZhciBwcmVIZWFkOiBNb3VudExpbmUgPSB0aGlzLkhlYWRGbG9vcjtcclxuICAgICAgICB0aGlzLl9IZWFkRmxvb3JJZHggPSAodGhpcy5fSGVhZEZsb29ySWR4ICsgMSkgJSB0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuX1RhaWxGTG9vcklkeCA9ICh0aGlzLl9UYWlsRkxvb3JJZHggKyAxKSAlIHRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgdmFyIEhlYWRmbG9vcjogbnVtYmVyID0gcHJlSGVhZC5GbG9vck51bSArIDE7XHJcbiAgICAgICAgdGhpcy5IZWFkRmxvb3IuU2V0TGluZShIZWFkZmxvb3IpO1xyXG4gICAgICAgIHByZUhlYWQuU2V0TmV4dEZsb29yKHRoaXMuSGVhZEZsb29yKTtcclxuICAgICAgICBjb25zb2xlLnRpbWUoXCJQdXRJdGVtXCIpO1xyXG4gICAgICAgIHRoaXMuX1B1dEl0ZW1JbkxpbmUoSGVhZGZsb29yKTtcclxuICAgICAgICBjb25zb2xlLnRpbWVFbmQoXCJQdXRJdGVtXCIpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRhuaUvueJqeWTgVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIOeJqeWTgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgX1B1dEl0ZW1JbkxpbmUoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBzYWZlQ29sOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PG51bWJlcj47IH0gPSB7fTtcclxuICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIC8v5biD572u6L+H5LqG5LiN55So5YaN5biD572u5LqGXHJcbiAgICAgICAgaWYgKGZsb29yTGluZS5MYXlPdXREaXJ0eSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZsb29yTGluZS5MYXlPdXREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgLypcclxuICAgICAgICBpZihmbG9vciA+PSB0aGlzLl9TYWZlTG9jYXRpb24uWSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLk1heExpbmVOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzYWZlQ29sID0gdGhpcy5fQ291bnRPcGVuTGlzdChmbG9vcik7XHJcbiAgICAgICAgfWVsc2UqL1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mkYbmlL7liY3lhYjorqHnrpfor6XlsYLpgJrot6/mg4XlhrUgXHJcbiAgICAgICAgICAgIHNhZmVDb2wgPSB7fVxyXG4gICAgICAgICAgICBzYWZlQ29sW1wib1wiXSA9IHRoaXMuX0NvdW50Um9hZEluZm8oZmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WHuueUn+eCueS4jeaUvumBk+WFt1xyXG4gICAgICAgIGlmIChmbG9vciA8IDEgfHwgZmxvb3IgPT0gdGhpcy5TYWZlTG9jYXRpb24uWSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6I635Y+W6K+l6KGM6KaB5pGG5pS+55qE54mp5ZOBXHJcbiAgICAgICAgdGhpcy5fVGFrZUl0ZW1MaXN0KGZsb29yKVxyXG5cclxuICAgICAgICAvL+agh+iusOS4gOadoee7neWvueWuieWFqOeahOi3r1xyXG4gICAgICAgIHZhciBzYWZlSWR4Q29sbDogeyBba2V5OiBzdHJpbmddOiBudW1iZXI7IH0gPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBjb2xLZXkgaW4gc2FmZUNvbCkge1xyXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHNhZmVDb2xbY29sS2V5XTtcclxuICAgICAgICAgICAgdmFyIHNhZmVJZHggPSBsaXN0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpc3QubGVuZ3RoKV07XHJcbiAgICAgICAgICAgIGlmIChzYWZlSWR4Q29sbFtzYWZlSWR4XSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNhZmVJZHhDb2xsW3NhZmVJZHhdID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aKiumcgOimgeaUvumBk+WFt+eahOagvOWtkOaUvuWFpemaj+acuuaxoFxyXG4gICAgICAgIHZhciBjdXJGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciByYW5kb21Qb29sOiBBcnJheTxTdGVwPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8v5oqK5a6J5YWo55qE5qC85a2Q5pqC5pe256e75Ye65p2lXHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDogQXJyYXk8U3RlcD4gPSBuZXcgQXJyYXk8U3RlcD4oKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4OiBudW1iZXIgPSAwOyBzdGVwSWR4IDwgY3VyRmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkge1xyXG4gICAgICAgICAgICB2YXIgZ2V0U3RlcDogU3RlcCA9IGN1ckZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgIGlmIChzYWZlSWR4Q29sbFtzdGVwSWR4XSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBvb2wucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGdldFN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pS+6Zm36ZixXHJcbiAgICAgICAgdmFyIGJhcnJpZXJzTGlzdDogQXJyYXk8TGluZUl0ZW1JbmZvPiA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzO1xyXG4gICAgICAgIHRoaXMuX09yZ2luaXplUHV0SXRlbShiYXJyaWVyc0xpc3QsIHJhbmRvbVBvb2wsIHRydWUpO1xyXG5cclxuICAgICAgICAvL+aRhuaUvumBk+WFt1xyXG4gICAgICAgIGZvciAodmFyIHNhZmVTdGVwSWR4OiBudW1iZXIgPSAwOyBzYWZlU3RlcElkeCA8IHNhZmVTdGVwTGlzdC5sZW5ndGg7ICsrc2FmZVN0ZXBJZHgpIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKHNhZmVTdGVwTGlzdFtzYWZlU3RlcElkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmV3YXJkTGlzdCA9IHRoaXMuQ3VyTGluZVJld2FyZHM7XHJcbiAgICAgICAgdGhpcy5fT3JnaW5pemVQdXRJdGVtKHJld2FyZExpc3QsIHJhbmRvbVBvb2wpO1xyXG4gICAgICAgIC8v5YaN5qyh6K6h566X6YCa6Lev5oOF5Ya1IFxyXG4gICAgICAgIC8vdGhpcy5fQ291bnRMYXN0Rmxvb3JSb2FkKGZsb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRhuaUvueJqeWTgVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxMaW5lSXRlbUluZm8+fSBpdGVtTGlzdCDnianlk4HliJfooahcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U3RlcD59IHJhbmRvbVBvb2wg5Y+w6Zi26ZuG5ZCIXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRGVhZFJvYWQg5piv5ZCm5piv5q276LevXHJcbiAgICAgKi9cclxuICAgIF9Pcmdpbml6ZVB1dEl0ZW0oaXRlbUxpc3Q6IEFycmF5PExpbmVJdGVtSW5mbz4sIHJhbmRvbVBvb2w6IEFycmF5PFN0ZXA+LCBpc0RlYWRSb2FkOiBib29sZWFuID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAodmFyIGl0ZW1JZHg6IG51bWJlciA9IDA7IGl0ZW1JZHggPCBpdGVtTGlzdC5sZW5ndGg7ICsraXRlbUlkeCkge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzogTGluZUl0ZW1JbmZvID0gaXRlbUxpc3RbaXRlbUlkeF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGRpZmZpY3VsdHlOdW06IG51bWJlciA9IDA7IGRpZmZpY3VsdHlOdW0gPCBpbmZvLk51bWJlcjspIHtcclxuICAgICAgICAgICAgICAgIGlmIChyYW5kb21Qb29sLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v6ZqP5py65oqK6Zqc56KN5pS+5YWl5qC85a2Q6YeMXHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tSWR4OiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYW5kb21Qb29sLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHJhbmRvbVBvb2xbcmFuZG9tSWR4XTtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBvb2wuc3BsaWNlKHJhbmRvbUlkeCwgMSk7XHJcbiAgICAgICAgICAgICAgICBzdGVwLlB1dEl0ZW0oaW5mby5UeXBlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0RlYWRSb2FkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gaXNEZWFkUm9hZDtcclxuICAgICAgICAgICAgICAgIC0taW5mby5OdW1iZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJhbmRvbVBvb2wubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW1JZHggPiAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW1MaXN0LnNwbGljZSgwLCBpdGVtSWR4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKumAkuW9kuiuoeeul+mAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yTnVtIOeJqeWTgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBfQ291bnRPcGVuTGlzdChmbG9vck51bTogbnVtYmVyKTogeyBba2V5OiBzdHJpbmddOiBBcnJheTxudW1iZXI+OyB9IHtcclxuICAgICAgICBmb3IgKHZhciBmbG9vckNvdW50OiBudW1iZXIgPSB0aGlzLlBsYXllckZsb29yOyBmbG9vckNvdW50IDw9IGZsb29yTnVtOyArK2Zsb29yQ291bnQpIHtcclxuICAgICAgICAgICAgdmFyIGZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vckNvdW50KTtcclxuICAgICAgICAgICAgaWYgKGZsb29yID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGZvciAodmFyIHN0ZXBJZHggPSAwOyBzdGVwSWR4IDwgZmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICAgICAgc3RlcC5NYXJrID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IodGhpcy5QbGF5ZXJGbG9vcik7XHJcbiAgICAgICAgZm9yICh2YXIgc3RlcElkeCA9IDA7IHN0ZXBJZHggPCBmbG9vci5Mb2dpY0xlbmd0aDsgKytzdGVwSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX01hcmtTdGVwcyhzdGVwLCBzdGVwSWR4LCBmbG9vck51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRhcmdldEZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSk7XHJcbiAgICAgICAgLy/mib7lh7rooqvmoIforrDnmoTngrnlubbmlbTnkIbmiJDpm4blkIhcclxuICAgICAgICB2YXIgY29sbGVjdGlvbjogeyBba2V5OiBzdHJpbmddOiBBcnJheTxudW1iZXI+OyB9ID0ge31cclxuICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gXCJvXCJcclxuICAgICAgICBmb3IgKHZhciBvcGVuSWR4OiBudW1iZXIgPSAwOyBvcGVuSWR4IDwgdGFyZ2V0Rmxvb3IuTG9naWNMZW5ndGg7ICsrb3BlbklkeCkge1xyXG4gICAgICAgICAgICB2YXIgbWFya2VkU3RlcDogU3RlcCA9IHRhcmdldEZsb29yLkdldFN0ZXAob3BlbklkeCk7XHJcbiAgICAgICAgICAgIGlmIChtYXJrZWRTdGVwLk1hcmsgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgTmFtZTogc3RyaW5nID0gbmFtZSArIG1hcmtlZFN0ZXAuTWFyaztcclxuICAgICAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uW05hbWVdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25bTmFtZV0gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uW05hbWVdLnB1c2gob3BlbklkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAq6YCS5b2S5qCH6K6w6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge1N0ZXB9IHN0ZXAg5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gbWFyayDmoIforrBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXRGbG9vck51bSDnm67moIflsYLmlbBcclxuICAgICAqL1xyXG4gICAgX01hcmtTdGVwcyhzdGVwOiBTdGVwLCBtYXJrOiBhbnksIHRhcmdldEZsb29yTnVtOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoc3RlcC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHN0ZXAuRmxvb3IuRmxvb3JOdW0gPj0gdGFyZ2V0Rmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgaWYgKHN0ZXAuTWFyayA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0ZXAuTWFyayA9IG1hcmtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlZnRPcGVuOiBib29sZWFuO1xyXG4gICAgICAgIHZhciByaWdodE9wZW46IGJvb2xlYW47XHJcbiAgICAgICAgdmFyIGxlZnRQYXJlbnQ6IFN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgaWYgKGxlZnRQYXJlbnQgIT0gbnVsbCAmJiAhbGVmdFBhcmVudC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgIGlmIChsZWZ0UGFyZW50Lk1hcmsgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgbGVmdE9wZW4gPSB0aGlzLl9NYXJrU3RlcHMobGVmdFBhcmVudCwgbWFyaywgdGFyZ2V0Rmxvb3JOdW0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBsZWZ0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByaWdodFBhcmVudDogU3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgaWYgKHJpZ2h0UGFyZW50ICE9IG51bGwgJiYgIXJpZ2h0UGFyZW50LklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgaWYgKHJpZ2h0UGFyZW50Lk1hcmsgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmlnaHRPcGVuID0gdGhpcy5fTWFya1N0ZXBzKHJpZ2h0UGFyZW50LCBtYXJrLCB0YXJnZXRGbG9vck51bSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJpZ2h0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGVwLk1hcmsgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHN0ZXAuTWFyayA9IG1hcmtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFsZWZ0T3BlbiAmJiAhcmlnaHRPcGVuKSB7XHJcbiAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnIDlkI7lho3orqHnrpfkuIDmrKHor6XlsYLpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vck51bSBcclxuICAgICAqL1xyXG4gICAgX0NvdW50TGFzdEZsb29yUm9hZChmbG9vck51bTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGZsb29yTnVtIDwgdGhpcy5UYWlsRkxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3IgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSk7XHJcbiAgICAgICAgdmFyIGxhc3RGbG9vciA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yTnVtIC0gMSk7XHJcbiAgICAgICAgZm9yICh2YXIgc3RlcElkeCA9IDA7IHN0ZXBJZHggPCBmbG9vci5Mb2dpY0xlbmd0aDsgKytzdGVwSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBMZWZ0U3RlcCA9IHN0ZXAuTGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgdmFyIFJpZ2h0U3RlcCA9IHN0ZXAuUmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICAgIGlmIChMZWZ0U3RlcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFMZWZ0U3RlcC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrTGVmdFN0ZXAuUm9hZE51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoUmlnaHRTdGVwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIVJpZ2h0U3RlcC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrUmlnaHRTdGVwLlJvYWROdW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGxhc3RTdGVwSWR4ID0gMDsgbGFzdFN0ZXBJZHggPCBsYXN0Rmxvb3IuTG9naWNMZW5ndGg7ICsrbGFzdFN0ZXBJZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQgJiYgc3RlcC5Sb2FkTnVtIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy/lkJHkuIrpgJLlvZLmiormiYDmnInkuI7kuYvnm7jov57nmoToioLngrnmlbDnu5nkv67mraPkuoZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUvumBk+WFt+WJjeeul+mAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIFxyXG4gICAgICovXHJcbiAgICBfQ291bnRSb2FkSW5mbyhmbG9vcjogbnVtYmVyKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIHZhciB0aGlzRmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuXHJcbiAgICAgICAgdmFyIHJvYWROdW06IG51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGxhc3RGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IgLSAxKTtcclxuICAgICAgICBpZiAoZmxvb3IgPT0gdGhpcy5fU2FmZUxvY2F0aW9uLlkpXHJcbiAgICAgICAgICAgIHRoaXMuX1Jlc2V0U3RlcEluZm8odGhpc0Zsb29yKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgbG9naWNJZHg6IG51bWJlciA9IDA7IGxvZ2ljSWR4IDwgdGhpc0Zsb29yLkxvZ2ljTGVuZ3RoOyArK2xvZ2ljSWR4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgICAgIHZhciBsZWZ0Q2hpbGQ6IFN0ZXAgPSBzdGVwLkxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodENoaWxkOiBTdGVwID0gc3RlcC5SaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnRDaGlsZCAhPSBudWxsICYmICFsZWZ0Q2hpbGQuSXNEZWFkUm9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmlnaHRDaGlsZCAhPSBudWxsICYmICFyaWdodENoaWxkLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZsb29yID09IHRoaXMuX1NhZmVMb2NhdGlvbi5ZKSB7XHJcbiAgICAgICAgICAgIHZhciBzYWZlU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKHRoaXMuX1NhZmVMb2NhdGlvbi5YKTtcclxuICAgICAgICAgICAgc2FmZVN0ZXAuSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaCh0aGlzLl9TYWZlTG9jYXRpb24uWCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2FmZVN0ZXBMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIF9SZXNldFN0ZXBJbmZvKHRoaXNGbG9vcjogTW91bnRMaW5lKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzRmxvb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBsb2dpY0lkeDogbnVtYmVyID0gMDsgbG9naWNJZHggPCB0aGlzRmxvb3IuTG9naWNMZW5ndGg7ICsrbG9naWNJZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5p+Q6YGT5YW35L+h5oGvXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX1Rha2VJdGVtTGlzdChmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgdmFyIGl0ZW1MaXN0ID0gbmV3IEFycmF5KGxpbmUuTG9naWNMZW5ndGgpO1xyXG4gICAgICAgIHZhciBsaW5lUmV3YXJkcyA9IHRoaXMuSXRlbUxheW91dC5UYWtlTGluZVJld2FyZChmbG9vcik7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IHRoaXMuQ3VyTGluZVJld2FyZHMuY29uY2F0KGxpbmVSZXdhcmRzKTtcclxuICAgICAgICBpZiAodGhpcy5TYWZlTG9jYXRpb24uWSA+IGZsb29yIHx8IGZsb29yID4gdGhpcy5TYWZlTG9jYXRpb24uWSArIDEpIHtcclxuICAgICAgICAgICAgdmFyIGxpbmVCYXJyaWVycyA9IHRoaXMuSXRlbUxheW91dC5UYWtlTGluZURpZmZpY3VsdHkoZmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzLmNvbmNhdChsaW5lQmFycmllcnMpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkN1ckxpbmVCYXJyaWVycy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5aGM6Zm35p+Q5LiA5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX0Rlc3Ryb3lMaW5lKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGFpbEZsb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgY291bnRGbG9vcjogbnVtYmVyID0gdGFpbEZsb29yLkZsb29yTnVtOyBjb3VudEZsb29yIDw9IGZsb29yOyArK2NvdW50Rmxvb3IpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldEZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihjb3VudEZsb29yKTtcclxuICAgICAgICAgICAgdGFyZ2V0Rmxvb3IuQnJlYWsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXNlU2tpbGxJdGVtKClcclxuICAgIHtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuVXNlQ2hhcmFjdGVyU2tpbGxJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVzZVBsYXllckl0ZW0oKVxyXG4gICAge1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5Vc2VHYW1lSXRlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25HYW1lQ29tcGxldGUoKSAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCwgdGhpcy5EZWF0aCwgdGhpcyk7XHJcbiAgICAgICAgdmFyIHVpOiBFbmRHYW1lVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8RW5kR2FtZVVJPihFbmRHYW1lVUkpO1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5BZGRHb2xkKHRoaXMuX0dvbGROdW0pO1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5BZGRTY29yZSh0aGlzLl9Hb2xkTnVtICogMTAgKyB0aGlzLkRpc3RhbmNlICogMTApO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBwYXRoIHtcclxuICAgIGV4cG9ydCB2YXIgSXNFZGl0b3I6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgZXhwb3J0IHZhciB2ZXJzaW9uOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgZXhwb3J0IHZhciBTY2VuZUFzc2V0UGF0aDogc3RyaW5nID0gXCJMYXlhU2NlbmVfXCI7XHJcbiAgICBleHBvcnQgdmFyIFJlc291cmNlUGF0aDogc3RyaW5nID0gSXNFZGl0b3IgPyBcIk5ldFJlc291cmNlXzNfMjkvXCIgOiBcImh0dHBzOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL05ldFJlc291cmNlXzNfMjkvXCI7XHJcbiAgICBleHBvcnQgdmFyIFVJUGF0aDogc3RyaW5nID0gUmVzb3VyY2VQYXRoICsgXCJVSS9cIjtcclxuICAgIGV4cG9ydCB2YXIgTW9kZWxQYXRoOiBzdHJpbmcgPSBSZXNvdXJjZVBhdGggKyBcIjNEL1wiXHJcbiAgICBleHBvcnQgdmFyIENvbmZpZ1BhdGg6IHN0cmluZyA9IFJlc291cmNlUGF0aCArIFwiQ29uZmlnL1wiXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZBdGzmlofku7bot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEF0bFBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFVJUGF0aCArIGZpbGVOYW1lICsgXCIuYXRsYXNcIiArIHZlcnNpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZVSUpzb27ot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldERlcGF0aFVJSlMoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFVJUGF0aCArIGZpbGVOYW1lICsgXCIuanNvblwiICsgdmVyc2lvbjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZsaOaWh+S7tui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0TEgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIE1vZGVsUGF0aCArIFNjZW5lQXNzZXRQYXRoICsgZmlsZU5hbWUgKyBcIi9Db252ZW50aW9uYWwvXCIgKyBmaWxlTmFtZSArIFwiLmxoXCIgKyB2ZXJzaW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Yqg6L29SnNvbui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0SnNvblBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIENvbmZpZ1BhdGggKyBmaWxlTmFtZSArIFwiLmpzb25cIiArIHZlcnNpb247XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIFVJRnVuYyB7XHJcbiAgICAvL+iuoeeul+e8qeaUvuWAvFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvdW50U2NhbGVGaXgod2lkdGg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCF3aWR0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFnZVdpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB2YXIgc2NhbGU6IG51bWJlciA9IHN0YWdlV2lkdGggLyB3aWR0aDtcclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gRml4VUkodmlldzogTGF5YS5TcHJpdGUsIHdpZHRoOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBVSUZ1bmMuQ291bnRTY2FsZUZpeCh3aWR0aCA/IHdpZHRoIDogdmlldy53aWR0aCk7XHJcbiAgICAgICAgdmlldy5zY2FsZVggPSBzY2FsZTtcclxuICAgICAgICB2aWV3LnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgIHZpZXcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQgLyBzY2FsZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWdyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBUaW1lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVGltZU1hbmFnZXJcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQUCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX1NjZW5lTWdyOiBTY2VuZU1ncjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfVGltZU1ncjogVGltZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX1VJTWFuYWdlcjogVUlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfRnJhbWVXb3JrOkZyYW1lV29yaztcclxuICAgIHN0YXRpYyBnZXQgRnJhbWVXb3JrKCk6RnJhbWVXb3JrXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ19GcmFtZVdvcms7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IE1lc3NhZ2VNYW5hZ2VyKCk6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyICB7XHJcbiAgICAgICAgcmV0dXJuIEFQUC5nX01lc3NhZ2U7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IFVJTWFuYWdlcigpOiBVSU1hbmFnZXIgIHtcclxuICAgICAgICBpZiAoQVBQLmdfVUlNYW5hZ2VyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIEFQUC5nX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLmdfVUlNYW5hZ2VyO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBTY2VuZU1hbmFnZXIoKTogU2NlbmVNZ3IgIHtcclxuICAgICAgICBpZiAoQVBQLmdfU2NlbmVNZ3IgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgQVBQLmdfU2NlbmVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFNjZW5lTWdyPihTY2VuZU1ncik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuZ19TY2VuZU1ncjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgVGltZU1hbmFnZXIoKTogVGltZU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZiAoQVBQLmdfVGltZU1nciA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBBUFAuZ19UaW1lTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxUaW1lTWFuYWdlcj4oVGltZU1hbmFnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLmdfVGltZU1ncjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLmdfRnJhbWVXb3JrID0gRnJhbWVXb3JrLkZNO1xyXG4gICAgICAgIHZhciBmbTpGcmFtZVdvcmsgID0gQVBQLmdfRnJhbWVXb3JrO1xyXG4gICAgICAgIEFQUC5nX01lc3NhZ2UgPSBmbS5BZGRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgQVBQLmdfU2NlbmVNZ3IgPSAgZm0uQWRkTWFuYWdlcjxTY2VuZU1ncj4oU2NlbmVNZ3IpO1xyXG4gICAgICAgIEFQUC5nX1RpbWVNZ3IgPSBmbS5BZGRNYW5hZ2VyPFRpbWVNYW5hZ2VyPihUaW1lTWFuYWdlcik7XHJcbiAgICAgICAgQVBQLmdfVUlNYW5hZ2VyID0gZm0uQWRkTWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCBDaGFyYWN0ZXJNYW5hZ2VyIGZyb20gXCIuLy4uL0dhbWVNYW5hZ2VyL0NoYXJhY3Rlck1hbWFnZXJcIlxyXG5pbXBvcnQgSXRlbU1hbmFnZXIgZnJvbSBcIi4vLi4vR2FtZU1hbmFnZXIvSXRlbU1hbmFnZXJcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQVBQXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IENoYXJhY3Rlck1ncigpOkNoYXJhY3Rlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gQ2hhcmFjdGVyTWFuYWdlci5NZ3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJdGVtTWdyKCk6SXRlbU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSXRlbU1hbmFnZXIuTWdyO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3REZWxlZ2F0ZSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IFNldFBhbmVsVUkgZnJvbSBcIi4vLi4vdWkvU2V0UGFuZWxVSVwiXHJcbmltcG9ydCBSYW5rUGFuZWxVSSBmcm9tIFwiLi8uLi91aS9SYW5rUGFuZWxVSVwiXHJcbmltcG9ydCBDaGFyYWN0ZXJVSSBmcm9tIFwiLi8uLi91aS9DaGFyYWN0ZXJVSVwiXHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZVNjZW5lXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuL0FQUFwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuXHJcbnR5cGUgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sZXJcclxue1xyXG4gICAgc3RhdGljIGdldCBHYW1lQ29udHJvbGVyKCk6R2FtZUNvbnRyb2xlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgR2FtZUNvbnRyb2xlci5NZ3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDb250cm9sZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjogR2FtZUNvbnRyb2xlcjtcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGdldCBNZ3IoKTogR2FtZUNvbnRyb2xlciB7XHJcbiAgICAgICAgaWYgKEdhbWVDb250cm9sZXIuX01nciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIEdhbWVDb250cm9sZXIuX01nciA9IG5ldyBHYW1lQ29udHJvbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lQ29udHJvbGVyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBfTGluZVN0ZXBOdW06bnVtYmVyO1xyXG4gICAgX01heExpbmVOdW06bnVtYmVyO1xyXG4gICAgX1N0ZXBMZW5ndGg6bnVtYmVyO1xyXG4gICAgX1N0ZXBEaXN0YW5jZTpudW1iZXI7XHJcbiAgICBfUGxheWVyTW92ZVRpbWU6bnVtYmVyO1xyXG4gICAgLy/luLjph4/lrprkuYlcclxuICAgIC8v5q+P6KGM5pyA5aSn5qC85a2Q5pWwXHJcbiAgICBnZXQgTGluZVN0ZXBOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX0xpbmVTdGVwTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTGluZVN0ZXBOdW0gPSA1KzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9MaW5lU3RlcE51bTtcclxuICAgIH0gXHJcbiAgICAvL+acgOWkp+ihjOaVsFxyXG4gICAgZ2V0IE1heExpbmVOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX01heExpbmVOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9NYXhMaW5lTnVtID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9NYXhMaW5lTnVtO1xyXG4gICAgfSBcclxuICAgIC8v5qC85a2Q6L656ZW/XHJcbiAgICBnZXQgU3RlcExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9TdGVwTGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RlcExlbmd0aCA9IDAuOTg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGVwTGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgLy/moLzlrZDmlpzlr7nop5Lplb/luqZcclxuICAgIGdldCBTdGVwRGlzdGFuY2UoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcERpc3RhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RlcERpc3RhbmNlID0gTWF0aC5zcXJ0KCh0aGlzLlN0ZXBMZW5ndGggKiB0aGlzLlN0ZXBMZW5ndGgpICogMik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGVwRGlzdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvL+eOqeWutuenu+WKqOaXtumXtFxyXG4gICAgZ2V0IFBsYXllck1vdmVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1BsYXllck1vdmVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fUGxheWVyTW92ZVRpbWUgPSAwLjAyICogMTAwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9QbGF5ZXJNb3ZlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRQbGF5ZXJJRChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGd1ZXN0QWdlbnQ6UGxheWVyR3Vlc3RBZ2VudCA9IFBsYXllckd1ZXN0RGVsZWdhdGUuR3Vlc3RBZ2VudDtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDpBcnJheTxudW1iZXI+ID0gZ3Vlc3RBZ2VudC5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIGlmKCFjaGFyYWN0ZXJMaXN0W2lkXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFndWVzdEFnZW50LkJ1eUNoYXJhY3RlcihpZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBndWVzdEFnZW50LlNldENoYXJhY3RlcihpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrorr7nva7pnaLmnb9cclxuICAgIFNob3dTZXRQYW5lbCgpIHtcclxuICAgICAgICB2YXIgUGFuZWwgPSBBUFAuVUlNYW5hZ2VyLlNob3c8U2V0UGFuZWxVST4oU2V0UGFuZWxVSSk7Ly8gbmV3IFNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5pi+56S65o6S6KGM5qac6Z2i5p2/XHJcbiAgICBTaG93UmFua1BhbmVsKCkge1xyXG4gICAgICAgIC8vIGlmKCFMYXlhLkJyb3dzZXIub25XZWlYaW4gfHwgdHlwZW9mIHd4ID09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB2YXIgUGFuZWwgPSBBUFAuVUlNYW5hZ2VyLlNob3c8UmFua1BhbmVsVUk+KFJhbmtQYW5lbFVJKTsvLyBuZXcgU2V0UGFuZWwoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/mmL7npLrop5LoibLpnaLmnb9cclxuICAgIHB1YmxpYyBTaG93Q2hhcmFjdGVyUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IEFQUC5VSU1hbmFnZXIuU2hvdzxDaGFyYWN0ZXJVST4oQ2hhcmFjdGVyVUkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1NldEluZm87XHJcbiAgICBnZXQgU2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIGlmICh0aGlzLl9TZXRJbmZvID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFNldEluZm8odmFsdWU6IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuX1NldEluZm8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/neWtmOiuvue9ruaVsOaNrlxyXG4gICAgU2F2ZVNldEluZm8oaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5TZXRJbmZvID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvL+ivu+WPluiuvue9ruS/oeaBr1xyXG4gICAgR2V0U2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJHYW1lVUkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBFbnRlckdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZURpcigpOiBHYW1lRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkRpcmVjdG9yIGFzIEdhbWVEaXJlY3RvcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR2FtZVNjZW5lKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DaGFuZ2VTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQQlVGRuihqOeOsOaViOaenFxyXG4gICAgR2VuQnVmZkVmZmVjdCh0eXBlOiBJdGVtVHlwZSk6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEJ1eUl0ZW0oaWQ6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkJ1eUl0ZW0oaWQpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBXZWNoYXRPcGVuIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB3ZWNoYXRPcGVuOiBXZWNoYXRPcGVuID0gbnVsbDtcclxuICAgIHB1YmxpYyBkYXRhQ29udGV4dCA9IG51bGw7XHJcbiAgICBwcml2YXRlIGlzRHJhd1Jhbms6IGJvb2xlYW4gLy8g5piv5ZCm5byA5aeL57uY55S75o6S6KGM5qac5YaF5a65XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmlzRHJhd1JhbmsgPSBmYWxzZTtcclxuICAgICAgICBpZih0eXBlb2Ygd3ggIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFDb250ZXh0ID0gd2luZG93W1wid3hcIl0uZ2V0T3BlbkRhdGFDb250ZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN5a+56LGh5a6e5YiXXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2VzKCk6IFdlY2hhdE9wZW4ge1xyXG4gICAgICAgIGlmKCFXZWNoYXRPcGVuLndlY2hhdE9wZW4pIHtcclxuICAgICAgICAgICAgV2VjaGF0T3Blbi53ZWNoYXRPcGVuID0gbmV3IFdlY2hhdE9wZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFdlY2hhdE9wZW4ud2VjaGF0T3BlblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTY29yZShzY29yZTphbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlVG9PcGVuKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJ1cGRhdGVcIixcclxuICAgICAgICAgICAgc2NvcmU6IHNjb3JlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXdwYXNzKHNjb3JlOmFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImRyYXdwYXNzXCIsXHJcbiAgICAgICAgICAgIHNjb3JlOiBzY29yZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcmNhbnZhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2xlYXJjYW52YXNlXCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VSYW5rKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImNsb3NlXCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1JhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInJhbmdlXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBjbGVhclNjb3JlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImNsZWFyU2NvcmVcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuUmFuaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlVG9PcGVuKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJvcGVuXCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBvc3RNZXNzYWdlVG9PcGVuKGRhdGEpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUNvbnRleHQucG9zdE1lc3NhZ2UoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUVsZW1lbnQgZXh0ZW5kcyBMYXlhLkJveCB7XHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1JZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0J0bjogTGF5YS5CdXR0b247XHJcbiAgICBwcml2YXRlIF9JbWc6IExheWEuSW1hZ2U7XHJcbiAgICBwcml2YXRlIG1fTnVtTGFiZWw6IExheWEuTGFiZWw7XHJcbiAgICBwcml2YXRlIG1fTGFiZWxTdHJpbmc6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBtX0J1eUl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIHByaXZhdGUgbV9DaG9vc2VJdGVtOiBNZXNzYWdlTUQuRGVsZWdhdGU7XHJcblxyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J0biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgSXRlbUlkeChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1JZHggPSBpZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBJbWcoKTogTGF5YS5JbWFnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0ltZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQnV5QnRuKCk6IExheWEuQnV0dG9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBCdG5MYWJsZShzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFzdHIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9CdG4udGV4dC50ZXh0ID0gc3RyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBJc0dyYXkodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLkltZy5ncmF5ID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IElzR3JheSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5JbWcuZ3JheTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgTnVtKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0xhYmVsU3RyaW5nWzFdID0gXCJcIiArIG51bTtcclxuICAgICAgICB0aGlzLm1fTnVtTGFiZWwudGV4dCA9IHRoaXMubV9MYWJlbFN0cmluZ1swXSArIHRoaXMubV9MYWJlbFN0cmluZ1sxXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgUHJpY2UobnVtOiBudW1iZXIpICB7XHJcbiAgICAgICAgdGhpcy5fQnRuLnRleHQudGV4dCA9IFwiXCIgKyBudW07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5fSW1nID0gdGhpcy5nZXRDaGlsZEF0KDApIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgIHRoaXMubV9OdW1MYWJlbCA9IHRoaXMuZ2V0Q2hpbGRBdCgyKSBhcyBMYXlhLkxhYmVsO1xyXG4gICAgICAgIHRoaXMuX0J0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkJ1eUl0ZW0pO1xyXG4gICAgICAgIHRoaXMuX0ltZy5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkNob29zZUltZyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1fTGFiZWxTdHJpbmcpICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9MYWJlbFN0cmluZyA9IHRoaXMubV9OdW1MYWJlbC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENob29zZUltZygpIHtcclxuICAgICAgICBpZiAodGhpcy5tX0Nob29zZUl0ZW0pXHJcbiAgICAgICAgICAgIHRoaXMubV9DaG9vc2VJdGVtLkV4ZWN1dGUodGhpcy5tX0l0ZW1JZHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlJdGVtKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQnV5SXRlbSlcclxuICAgICAgICAgICAgdGhpcy5tX0J1eUl0ZW0uRXhlY3V0ZSh0aGlzLm1fSXRlbUlkeCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdEJ1eShvd25lcjogYW55LCBsaXN0ZW5lcjogKGlkOiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICB2YXIgbmV3RGVsZWdhdGUgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5tX0J1eUl0ZW0gPSBuZXdEZWxlZ2F0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0Q2hvb3NlKG93bmVyOiBhbnksIGxpc3RlbmVyOiAoaWQ6IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciBuZXdEZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fQ2hvb3NlSXRlbSA9IG5ld0RlbGVnYXRlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZUVsZW1lbnQgZXh0ZW5kcyBMYXlhLkltYWdlIHtcclxuICAgIC8vXHJcbiAgICBwcml2YXRlIF9CdG46IExheWEuQnV0dG9uO1xyXG4gICAgcHJpdmF0ZSBfSW1nOiBMYXlhLkltYWdlO1xyXG4gICAgcHJpdmF0ZSBtX09uQ2xpY2tJbWc6KGlkOm51bWJlcik9PnZvaWQ7XHJcbiAgICBwcml2YXRlIG1fQ2hhcmFjdGVySUQ6bnVtYmVyO1xyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J0biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICAgICAgdGhpcy5fQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRQbGF5ZXJJRCh0aGlzLm1fQ2hhcmFjdGVySUQpO1xyXG4gICAgICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuXHJcbiAgICBSZXNldCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX0ltZykge1xyXG4gICAgICAgICAgICB0aGlzLkluaXQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0R3JheShpc0dyYXk6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9JbWcuZ3JheSA9IGlzR3JheTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0T25JbWdDbGljayhldmVudEZ1bmN0aW9uOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBpZD10aGlzLm1fQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdGhpcy5fSW1nLm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCxldmVudEZ1bmN0aW9uKTsvLyBvd25lciwgKCk9PnsgZXZlbnRGdW5jdGlvbihpZCkgfSApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBDaGFyYWN0ZXJJRChpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3RlcklEID0gaWQ7XHJcbiAgICB9XHJcbiAgICBJbml0KCkgIHtcclxuICAgICAgICB0aGlzLl9JbWcgPSB0aGlzLmdldENoaWxkQXQoMCkgYXMgTGF5YS5JbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnR7QmFzZUZ1bmN9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQkdVSSBleHRlbmRzIHVpLkJHVUkge1xyXG4gICAgXHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkJHXCIpKSk7XHJcbiAgICB9XHJcbiAgICAvL3ByaXZhdGUgX1NreUFycjpBcnJheTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9Ta3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1RlbXBTa3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1NjYWxlU2t5Om51bWJlcjtcclxuICAgIHByaXZhdGUgX1NjYWxlRWFydGg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfRWFydGhTdGFydFBTOm51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB3aWRoID0gTGF5YS5zdGFnZS53aWR0aCA7XHJcbiAgICAgICAgdmFyIHJhdGUgPSBNYXRoLmNlaWwoTGF5YS5zdGFnZS5oZWlnaHQvd2lkaCk7XHJcblxyXG4gICAgICAgIHRoaXMuX1NreVF1ZSA9IG5ldyBCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+KCk7XHJcbiAgICAgICAgdGhpcy5fVGVtcFNreVF1ZSA9IG5ldyBCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+KCk7XHJcbiAgICAgICAgIC8vbmV3IEFycmF5PExheWEuSW1hZ2U+KHJhdGUrMSk7XHJcbiAgICAgICAgZm9yKGxldCBzdGFydElkeCA9IDA7c3RhcnRJZHg8cmF0ZSsxOyArK3N0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZTpMYXlhLkltYWdlID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1hZ2UubG9hZEltYWdlKFwiY29tcC9pbWdfYmFja2dyb3VuZF9zcHJfc2t5LnBuZ1wiKTtcclxuICAgICAgICAgICAgaW1hZ2Uud2lkdGggPSB3aWRoO1xyXG4gICAgICAgICAgICBpbWFnZS5oZWlnaHQgPSB3aWRoK3dpZGgqMC4wMTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChpbWFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1NreVF1ZS5QdXNoKGltYWdlKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIHRoaXMuU2V0U2t5KDApO1xyXG4gICAgICAgIHZhciBlYXJ0aCA9IG5ldyBMYXlhLkltYWdlKCk7XHJcbiAgICAgICAgZWFydGgueSA9IExheWEuc3RhZ2UuaGVpZ2h0IC0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9FYXJ0aFN0YXJ0UFMgPSBlYXJ0aC55O1xyXG4gICAgICAgIGVhcnRoLmxvYWRJbWFnZShcImNvbXAvaW1nX2JhY2tncm91bmRfc3ByLnBuZ1wiKTtcclxuICAgICAgICB0aGlzLl9FYXJ0aCA9IGVhcnRoO1xyXG4gICAgICAgIGVhcnRoLndpZHRoID0gd2lkaDtcclxuICAgICAgICBlYXJ0aC5oZWlnaHQgPSB3aWRoO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoZWFydGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1NjYWxlU2t5ID0gMC4wMDFcclxuICAgICAgICB0aGlzLl9TY2FsZUVhcnRoID0gMC4wMVxyXG4gICAgICAgIC8vdGhpcy5fRWFydGhTdGFydFBTID0gdGhpcy5fRWFydGgueTtcclxuICAgIH1cclxuICAgIC8qXHJcbiAgICBJbml0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICBmb3IobGV0IHN0YXJ0SWR4Om51bWJlciA9IDA7c3RhcnRJZHg8dGhpcy5fU2t5UXVlLkNvdW50Oysrc3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU2t5QXJyW3N0YXJ0SWR4XS55ID0gc3RhcnRJZHggKiBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0VhcnRoLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fRWFydGhTdGFydFBTID0gdGhpcy5fRWFydGgueTtcclxuICAgIH0qL1xyXG4gICAgLy/pq5jluqbovazlsY/luZXpq5jluqblg4/ntKBcclxuICAgIEhlaWdodFRyYW5zUGl4KCBoZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBoZWlnaHQqLTAuMTtcclxuICAgIH1cclxuICAgIFNldFNreShwaXhIZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1Ta3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPiA9IHRoaXMuX1RlbXBTa3lRdWU7XHJcbiAgICAgICAgdGVtU2t5UXVlLkNsZWFyKCk7XHJcbiAgICAgICAgdmFyIGNvdW50Om51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgd2hpbGUodGhpcy5fU2t5UXVlLkNvdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpCYXNlRnVuYy5Ob2RlPExheWEuU3ByaXRlPiA9IHRoaXMuX1NreVF1ZS5Qb3BOb2RlKCk7XHJcbiAgICAgICAgICAgIHZhciBza3lJbWc6TGF5YS5TcHJpdGUgPSBub2RlLlZhbHVlO1xyXG4gICAgICAgICAgICBza3lJbWcueSA9IGNvdW50ICogaGVpZ2h0ICsgcGl4SGVpZ2h0IC0gaGVpZ2h0IC0gaGVpZ2h0KjAuMDE7XHJcbiAgICAgICAgICAgIHRlbVNreVF1ZS5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICAgICAgaWYoc2t5SW1nLnk+TGF5YS5zdGFnZS5oZWlnaHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNreUltZy55ID0gdGVtU2t5UXVlLkhlYWRWYWx1ZS55IC0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICsrY291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1RlbXBTa3lRdWUgPSB0aGlzLl9Ta3lRdWU7XHJcbiAgICAgICAgdGhpcy5fU2t5UXVlID0gdGVtU2t5UXVlO1xyXG4gICAgfVxyXG4gICAgU2V0RWFydGgoaGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9FYXJ0aC55ID0gdGhpcy5fRWFydGhTdGFydFBTICsgaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgVXBkYXRlUGFnZSggaGVpZ2h0Om51bWJlciApXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICAvL2hlaWdodCA9IHRoaXMuSGVpZ2h0VHJhbnNQaXgoaGVpZ2h0KTtcclxuICAgICAgICAvL3ZhciBza3lIZWlnaHRQaXggPSBoZWlnaHQqdGhpcy5fU2NhbGVTa3k7XHJcbiAgICAgICAgdGhpcy5TZXRTa3koaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLlNldEVhcnRoKGhlaWdodCk7XHJcbiAgICAgICAgLy92YXIgZWFydGhIZWlnaHRQaXggPSBoZWlnaHQ7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7VUlGdW5jfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1VJRnVuY1wiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcblxyXG4vL1VJ5Z+657G7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VVSSBleHRlbmRzIExheWEuQm94XHJcbntcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL1xyXG4gICAgcHJvdGVjdGVkIF9VSVR5cGU6QmFzZUVudW0uVUlUeXBlRW51bTtcclxuICAgIHByb3RlY3RlZCBfSXNNdXRleDpib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9OYW1lOnN0cmluZzsgICAgXHJcbiAgICBwcm90ZWN0ZWQgX1VJTWFuYWdlcjpVSU1hbmFnZXJcclxuICAgIHByaXZhdGUgX0RpcnR5OmJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9TaG93aW5nOmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTG93O1xyXG4gICAgICAgIHRoaXMuX0lzTXV0ZXggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9OYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLl9TaG93aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxlZnQgPSAwO1xyXG5cdCAgICB0aGlzLnJpZ2h0ID0gMDtcclxuXHRcdHRoaXMuYm90dG9tID0gMDtcclxuICAgICAgICB0aGlzLnRvcCA9IDA7XHJcbiAgICB9XHJcbiAgICBIaWRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZSgpXHJcbiAgICB7XHJcbiAgICB9XHJcblxyXG4gICAgT3Blbk9QKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuT3BlbigpO1xyXG4gICAgfVxyXG4gICAgQ2xvc2VPUCgpXHJcbiAgICB7XHJcbiAgICAgICAgLy90aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgRGVzdHJveSggKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBVSVR5cGUoKTpCYXNlRW51bS5VSVR5cGVFbnVtXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1VJVHlwZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IElzTXV0ZXgoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0lzTXV0ZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgU2hvd2luZygpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU2hvd2luZztcclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWvuVVJ6L+b6KGM6YCC6YWNXHJcbiAgICAgKiBAcGFyYW0gVUkg6YCC6YWNVUlcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZpeFVJKFVJOkxheWEuVmlldylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKFVJKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXREaXJ0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgRGlydHkoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0RpcnR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbGVhckRpcnR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgVUlVcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fRGlydHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLkNsZWFyRGlydHkoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBVcGRhdGUoKTp2b2lkO1xyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBGVyBmcm9tIFwiLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiO1xyXG5pbXBvcnQgUm9sZUVsZW1lbnQgZnJvbSBcIi4vLi4vc2NyaXB0L1JvbGVFbGVtZW50XCJcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQVBQXCI7XHJcblxyXG5jbGFzcyBFeHRlbmRDaGFyYWN0ZXJzVUkgZXh0ZW5kcyB1aS5DaGFyYWN0ZXJVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkNoYXJhY3RlclwiKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlclVJIGV4dGVuZHMgQmFzZVVJIHtcclxuXHJcbiAgICBwcml2YXRlIG1fQ2hhcmFjdGVyTGlzdDogQXJyYXk8YW55PjtcclxuICAgIHByaXZhdGUgbV9Hb2xkRGlzY3JpYmU6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBfUmVuZGVySGFuZGxlcihjZWxsOiBMYXlhLkJveCwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHZhciByb2xlRWxlbWVudDogUm9sZUVsZW1lbnQgPSBjZWxsIGFzIFJvbGVFbGVtZW50O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlc2V0KCk7XHJcbiAgICAgICAgdmFyIGNoYXJhY3Rlckxpc3Q6IEFycmF5PG51bWJlcj4gPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICByb2xlRWxlbWVudC5ncmF5ID0gY2hhcmFjdGVyTGlzdFtpbmRleF0gPyBmYWxzZSA6IHRydWU7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuQ2hhcmFjdGVySUQgPSBpbmRleDtcclxuICAgICAgICByb2xlRWxlbWVudC5SZWdpc3RPbkltZ0NsaWNrKCgpID0+IHsgdGhpcy5PbkNsaWNrSW1nKGluZGV4KSB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1VJOiBFeHRlbmRDaGFyYWN0ZXJzVUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRDaGFyYWN0ZXJzVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB0aGlzLkdldENoYXJhY3Rlckxpc3QoKTtcclxuICAgICAgICB0aGlzLlNldExpc3QoKTtcclxuICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdCA9IFtdO1xyXG4gICAgICAgIC8vdGhpcy5tX0dvbGREaXNjcmliZSA9IHRoaXMuX1VJLl9Hb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuT25Nb25leUNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnRleHQgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXkgKyBcIlwiO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnN0cm9rZSA9IDI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dvbGQuc3Ryb2tlQ29sb3IgPSBcIjB4ZmYwMDAwXCI7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkNoYXJhY3RlclVJXCI7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0Q2hhcmFjdGVyTGlzdCgpICB7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRJRExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRMaXN0KCkge1xyXG4gICAgICAgIHZhciBsaXN0QXJyYXk6IEFycmF5PGFueT4gPSB0aGlzLm1fQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QucmVuZGVySGFuZGxlciA9IG5ldyBMYXlhLkhhbmRsZXIodGhpcywgdGhpcy5fUmVuZGVySGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QuYXJyYXkgPSBsaXN0QXJyYXk7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3Quc2Nyb2xsQmFyLmVsYXN0aWNCYWNrVGltZSA9IDIwMDsvL+iuvue9ruapoeearueti+WbnuW8ueaXtumXtOOAguWNleS9jeS4uuavq+enkuOAglxyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljRGlzdGFuY2UgPSA1MFxyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBPcGVuKCkgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckNoYXJhY3RlcklEQ2hhbmdlLCB0aGlzLk9uTmVlZENsb3NlVUksIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsIHRoaXMuT25Nb25leUNoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DaGFyYWN0ZXJMaXN0Q2hhbmdlLCB0aGlzLk9uQ2hhbmdlTGlzdCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2UoKSAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VyQ2hhcmFjdGVySURDaGFuZ2UsIHRoaXMuT25OZWVkQ2xvc2VVSSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSwgdGhpcy5Pbk1vbmV5Q2hhbmdlLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5PbkNoYXJhY3Rlckxpc3RDaGFuZ2UsIHRoaXMuT25DaGFuZ2VMaXN0LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S6i+S7tlxyXG4gICAgcHJpdmF0ZSBPbkNsaWNrSW1nKGlkOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoaWQgPT0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkNoYXJhY3RlcklEKSAge1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRQbGF5ZXJJRChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbk5lZWRDbG9zZVVJKCk6IHZvaWQgIHtcclxuICAgICAgICBpZiAoIXRoaXMuU2hvd2luZykgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25DaGFuZ2VMaXN0KCkgIHtcclxuICAgICAgICBpZiAoIXRoaXMuU2hvd2luZykgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5fTGlzdC5yZWZyZXNoKClcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uTW9uZXlDaGFuZ2UoKSAge1xyXG4gICAgICAgIGlmICghdGhpcy5TaG93aW5nKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5tX0dvbGREaXNjcmliZVsxXSA9IFwiXCIgKyBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXk7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fR29sZC50ZXh0ID0gdGhpcy5tX0dvbGREaXNjcmliZVswXSArIHRoaXMubV9Hb2xkRGlzY3JpYmVbMV07XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtHYW1lU3RydWN0IH0gIGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kRW5kR2FtZVVJIGV4dGVuZHMgdWkuRW5kR2FtZVVJIHtcclxuICAgIFBhbmVsOkxheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVuZEdhbWVcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbCA9IHRoaXMuUGFuZWw7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICAvL3RoaXMuUGFuZWwuaFNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX01lbnVlQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssR3VpZGVyTWFuYWdlci5NZ3IsR3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5fU2V0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssQ29udHJvbGVyLkdhbWVDb250cm9sZXIsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICB0aGlzLl9TdGFydEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZEdhbWVVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkVuZEdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgVUk6RXh0ZW5kRW5kR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5VST0gbmV3IEV4dGVuZEVuZEdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5VSSk7XHJcbiAgICAgICAgLy90aGlzLlVJLl9DaGFyYWN0ZXJMaXN0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCwoKT0+eyB0aGlzLl9VSU1hbmFnZXIuU2hvdzxQbGF5ZXJMaXN0VUk+KFBsYXllckxpc3RVSSl9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgc3VwZXIuTGF5b3V0KCk7XHJcbiAgICAgICAgaWYoIXRoaXMuVUkgfHwgIXRoaXMuVUkuYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlVJLmJnLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLlVJLmJnLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgRk0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBQbGF5ZXJMaXN0VUkgZnJvbSBcIi4vLi4vdWkvUGxheWVyTGlzdFVJXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgeyBHYW1lQWdlbnQgfSBmcm9tIFwiLi8uLi9BZ2VudC9HYW1lQWdlbnRcIlxyXG5cclxuY2xhc3MgRXh0ZW5kRW50ZXJHYW1lVUkgZXh0ZW5kcyB1aS5FbnRlclVJIHtcclxuICAgIFBhbmVsOiBMYXlhLlBhbmVsO1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLlBhbmVsID0gdGhpcy5fUGFuZWw7XHJcbiAgICAgICAgdGhpcy5QYW5lbC52U2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5QYW5lbC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fQ2hhcmFjdGVyLm9uKExheWEuRXZlbnQuQ0xJQ0ssIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlciwgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dDaGFyYWN0ZXJQYW5lbCk7XHJcbiAgICAgICAgLy90aGlzLl9DaGFyYWN0ZXIub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5zaG93Q2hhcmFjdGVyKTtcclxuICAgICAgICB0aGlzLl9TZXRQYW5lbC5vbihMYXlhLkV2ZW50LkNMSUNLLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TaG93U2V0UGFuZWwpO1xyXG4gICAgICAgIC8vdGhpcy5fUmFuay5vbihMYXlhLkV2ZW50LkNMSUNLLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TaG93UmFua1BhbmVsKTtcclxuICAgICAgICAvL3RoaXMuX1N0YXJ0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlciwgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnQub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5vblN0YXJ0KTtcclxuXHJcbiAgICAgICAgdGhpcy5fQ2hhcmFjdGVyTGlzdC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5QYW5lbC52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuX1JhbmtbXCJpbml0WFwiXSA9IHRoaXMuX1JhbmsueDtcclxuICAgICAgICB0aGlzLl9SYW5rW1wiaW5pdFlcIl0gPSB0aGlzLl9SYW5rLnk7XHJcblxyXG4gICAgICAgIHRoaXMuX1NldFBhbmVsW1wiaW5pdFhcIl0gPSB0aGlzLl9TZXRQYW5lbC54O1xyXG4gICAgICAgIHRoaXMuX1NldFBhbmVsW1wiaW5pdFlcIl0gPSB0aGlzLl9TZXRQYW5lbC55O1xyXG5cclxuICAgICAgICB0aGlzLl9TdGFydFtcImluaXRYXCJdID0gdGhpcy5fU3RhcnQueDtcclxuICAgICAgICB0aGlzLl9TdGFydFtcImluaXRZXCJdID0gdGhpcy5fU3RhcnQueTtcclxuXHJcbiAgICAgICAgdGhpcy5fQ2hhcmFjdGVyW1wiaW5pdFhcIl0gPSB0aGlzLl9DaGFyYWN0ZXIueDtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXJbXCJpbml0WVwiXSA9IHRoaXMuX0NoYXJhY3Rlci55O1xyXG5cclxuICAgICAgICB0aGlzLmFkdltcImluaXRYXCJdID0gdGhpcy5hZHYueDtcclxuICAgICAgICB0aGlzLmFkdltcImluaXRZXCJdID0gdGhpcy5hZHYueTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TdGFydCgpOnZvaWQge1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fUmFuaywge3k6dGhpcy5fUmFuay55ICsgTGF5YS5zdGFnZS5oZWlnaHQgLSB0aGlzLl9DaGFyYWN0ZXIueX0sIDE1MCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLl9TZXRQYW5lbCwge3k6dGhpcy5fU2V0UGFuZWwueSAgKyBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX0NoYXJhY3Rlci55fSwgMTUwLCBMYXlhLkVhc2Uuc2luZUluKTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX1N0YXJ0LCB7eDp0aGlzLl9TdGFydC55ICArIExheWEuc3RhZ2Uud2lkdGggLSB0aGlzLl9TdGFydC54fSwgMjUwLCBMYXlhLkVhc2Uuc2luZUluLCBMYXlhLkhhbmRsZXIuY3JlYXRlKEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlciwgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSkpO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fQ2hhcmFjdGVyLCB7eTp0aGlzLl9DaGFyYWN0ZXIueSAgLSBMYXlhLnN0YWdlLmhlaWdodH0sIDE1MCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLmFkdiwge3k6dGhpcy5hZHYueSAgKyBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX0NoYXJhY3Rlci55fSwgMTUwLCBMYXlhLkVhc2Uuc2luZUluKTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX2xvZ28sIHthbHBoYTowLjJ9LCAxMDAsIExheWEuRWFzZS5zaW5lSW4pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGVyR2FtZVVJIGV4dGVuZHMgQmFzZVVJIHtcclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiRW50ZXJHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIF9VSTogRXh0ZW5kRW50ZXJHYW1lVUk7XHJcbiAgICBwcml2YXRlIG1fQnRuR3JvdXA6IEFycmF5PExheWEuSW1hZ2U+O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kRW50ZXJHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB2YXIgdWlNZ3I6IFVJTWFuYWdlciA9IHRoaXMuX1VJTWFuYWdlcjtcclxuICAgICAgICB0aGlzLm1fQnRuR3JvdXAgPSBbXTtcclxuICAgICAgICAvLyB2YXIgaW1nID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgICAgICAvLyBpbWcubG9hZEltYWdlKFwidXJlcmVcIik7XHJcbiAgICAgICAgLy8gdGhpcy5hZGRDaGlsZChpbWcpO1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX0NoYXJhY3Rlckxpc3Qub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57IHVpTWdyLlNob3c8UGxheWVyTGlzdFVJPihQbGF5ZXJMaXN0VUkpfSk7XHJcbiAgICAgICAgdGhpcy5MYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuT1AoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLk9wZW5PUCgpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9sb2dvLmFscGhhID0gMTtcclxuICAgICAgICBpZighdGhpcy5fVUkuX1JhbmtbXCJpbml0WFwiXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLl9SYW5rLnggPSB0aGlzLl9VSS5fUmFua1tcImluaXRYXCJdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SYW5rLnkgPSB0aGlzLl9VSS5fUmFua1tcImluaXRZXCJdO1xyXG5cclxuICAgICAgICB0aGlzLl9VSS5fU2V0UGFuZWwueCA9IHRoaXMuX1VJLl9TZXRQYW5lbFtcImluaXRYXCJdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9TZXRQYW5lbC55ID0gdGhpcy5fVUkuX1NldFBhbmVsW1wiaW5pdFlcIl07XHJcblxyXG4gICAgICAgIHRoaXMuX1VJLl9TdGFydC54ID0gdGhpcy5fVUkuX1N0YXJ0W1wiaW5pdFhcIl07XHJcbiAgICAgICAgdGhpcy5fVUkuX1N0YXJ0LnkgPSB0aGlzLl9VSS5fU3RhcnRbXCJpbml0WVwiXTtcclxuXHJcbiAgICAgICAgdGhpcy5fVUkuX0NoYXJhY3Rlci54ID0gdGhpcy5fVUkuX0NoYXJhY3RlcltcImluaXRYXCJdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9DaGFyYWN0ZXIueSA9IHRoaXMuX1VJLl9DaGFyYWN0ZXJbXCJpbml0WVwiXTtcclxuXHJcbiAgICAgICAgdGhpcy5fVUkuYWR2LnggPSB0aGlzLl9VSS5hZHZbXCJpbml0WFwiXTtcclxuICAgICAgICB0aGlzLl9VSS5hZHYueSA9IHRoaXMuX1VJLmFkdltcImluaXRZXCJdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgSW5pdEJ0bkdyb3VwKCkge1xyXG4gICAgICAgIHZhciBDdXJNYXhMZXZlbCA9IEdhbWVBZ2VudC5BZ2VudC5DdXJNYXhMZXZlbDtcclxuICAgICAgICB2YXIgY3VyTGV2ZWwgPSBHYW1lQWdlbnQuQWdlbnQuQ3VyTGV2ZWw7XHJcbiAgICAgICAgdmFyIGJ0bk51bSA9IHRoaXMuX1VJLl9Hcm91cC5udW1DaGlsZHJlbjtcclxuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLm1fQnRuR3JvdXA7XHJcbiAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYnRuTnVtOyArK2lkeCkge1xyXG4gICAgICAgICAgICB2YXIgYnRuOiBhbnkgPSB0aGlzLl9VSS5fR3JvdXAuZ2V0Q2hpbGRBdChpZHgpIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgICAgIGJ0bi5pZHggPSBpZHg7XHJcbiAgICAgICAgICAgIGJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2hvb3NlKVxyXG4gICAgICAgICAgICBidG4uZ3JheSA9IHRydWU7XHJcbiAgICAgICAgICAgIGdyb3VwLnB1c2goYnRuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3JvdXBbY3VyTGV2ZWxdLmdyYXkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgT3BlbigpIHtcclxuICAgICAgICB0aGlzLkluaXRCdG5Hcm91cCgpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIHN1cGVyLkxheW91dCgpO1xyXG4gICAgICAgIGlmKCF0aGlzLl9VSSB8fCAhdGhpcy5fVUkuYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5iZy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUkuYmcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuovku7ZcclxuICAgIE9uQ2hvb3NlKGluZm86IEV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHRhcmdldDphbnkgPSBpbmZvLnRhcmdldDtcclxuICAgICAgICB2YXIgaWR4OiBudW1iZXIgPSB0YXJnZXQuaWR4O1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5DdXJMZXZlbCA9IGlkeDtcclxuICAgICAgICB0aGlzLm1fQnRuR3JvdXAuZm9yRWFjaCgoaW1nOiBMYXlhLkltYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIGltZy5ncmF5ID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm1fQnRuR3JvdXBbaWR4XS5ncmF5ID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog5Zy65pmvVUlcclxuICovXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLi9HYW1lL0dhbWVNb2R1bGVcIjtcclxuaW1wb3J0IHsgR2FtZUFnZW50IH0gZnJvbSBcIi4uL0FnZW50L0dhbWVBZ2VudFwiO1xyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBJdGVtTGlzdFVJIGZyb20gXCIuL0l0ZW1MaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcblxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbmNsYXNzIEV4dGVuZHNHYW1lVUkgZXh0ZW5kcyB1aS5HYW1lVUkge1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBTZXRDb3VudFRpbWUoaW5mbzogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuX0NvdW50VGltZS50ZXh0ID0gaW5mbztcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVVJIGV4dGVuZHMgQmFzZVVJIHtcclxuICAgIHByaXZhdGUgX1VJOiBFeHRlbmRzR2FtZVVJO1xyXG4gICAgcHJpdmF0ZSBtX29uQ2xpY2tTa2lsbEl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIHByaXZhdGUgbV9vbkNMaWNrUGxheWVySXRlbTogTWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgLy9cclxuICAgIHB1YmxpYyBEaXN0YW5jZVN0cjogQXJyYXk8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBHb2xkTnVtU3RyOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIHNldCBHYW1lUGFuZWwodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZVBhbmVsLnZpc2libGUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCBEaXN0YW5jZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGRpcyA9IFwiXCIgKyB2YWx1ZTtcclxuICAgICAgICBpZiAoZGlzID09IHRoaXMuRGlzdGFuY2VTdHJbMV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHJbMV0gPSBkaXM7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgc2V0IEdvbGROdW0odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2hvd0Rpc3RhbmNlKCkge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0ID0gdGhpcy5EaXN0YW5jZVN0clswXSArIHRoaXMuRGlzdGFuY2VTdHJbMV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfU2hvd0dvbGROdW0oKSB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1R4dEdvbGQudGV4dCA9IHRoaXMuR29sZE51bVN0clswXSArIHRoaXMuR29sZE51bVN0clsxXTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiR2FtZVVJXCI7XHJcbiAgICB9XHJcbiAgICBzZXQgR29sZChnb2xkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSBnb2xkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fSXNNdXRleCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kc0dhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHZhciBvcElzUmlnaHQgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0SW5mby5PUElzUmlnaHQ7XHJcbiAgICAgICAgdGhpcy5fVUkuX0l0ZW1MaXN0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fVUlNYW5hZ2VyLlNob3c8SXRlbUxpc3RVST4oSXRlbUxpc3RVSSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuU2V0Q291bnRUaW1lKCk7XHJcblxyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHIgPSB0aGlzLl9VSS5fVHh0RGlzdGFuY2UudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgdGhpcy5EaXN0YW5jZVN0clsxXSA9IFwiMFwiXHJcbiAgICAgICAgdGhpcy5fU2hvd0Rpc3RhbmNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuR29sZE51bVN0ciA9IHRoaXMuX1VJLl9UeHRHb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IFwiMFwiO1xyXG4gICAgICAgIHRoaXMuX1Nob3dHb2xkTnVtKCk7XHJcblxyXG4gICAgICAgIHRoaXMuU2hvd0lucHV0SW5mbyhcIlwiKTtcclxuICAgICAgICB0aGlzLl9VSS5fUGxheWVySXRlbS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2xpY2tQbGF5ZXJJdGVtKTtcclxuICAgICAgICB0aGlzLl9VSS5fU2tpbGxJdGVtLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuT25DbGlja1NraWxsSXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0TGVmdFRvdWNoKG93bmVyOiBhbnksIExpc3RlbmVyOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xlZnRUb3VjaC5vbihMYXlhLkV2ZW50LkNMSUNLLCBvd25lciwgTGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldFJpZ2h0VG91Y2gob3duZXI6IGFueSwgTGlzdGVuZXI6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9VSS5fUmlnaHRUb3VjaC5vbihMYXlhLkV2ZW50LkNMSUNLLCBvd25lciwgTGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldENvdW50VGltZShpbmZvOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgaWYgKGluZm8gPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fQ291bnREb3duVUkudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVQYW5lbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fQ291bnREb3duVUkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZVBhbmVsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLlNldENvdW50VGltZShpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBTaG93SXRlbSgpIHtcclxuICAgICAgICB0aGlzLlNob3dQbGF5ZXJJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2hhcmFjdGVlckl0ZW0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuueOqeWutumAieaLqemBk+WFt1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgU2hvd1BsYXllckl0ZW0oKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1OdW0gPSBHYW1lQWdlbnQuQWdlbnQuQ3VySXRlbU51bTtcclxuICAgICAgICBpZiAoaXRlbU51bSA8IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX1BsYXllckl0ZW0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9QbGF5ZXJJdGVtLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuinkuiJsumBk+WFt1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgU2hvd0NoYXJhY3RlZXJJdGVtKCkge1xyXG4gICAgICAgIHZhciBpdGVtTnVtID0gR2FtZUFnZW50LkFnZW50LlNraWxsSXRlbU51bTtcclxuICAgICAgICBpZiAoaXRlbU51bSA8IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX1NraWxsSXRlbS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX1NraWxsSXRlbS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2hvd0lucHV0SW5mbyhpbmZvOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZUluZm8udGV4dCA9IGluZm87XHJcbiAgICB9XHJcbiAgICBPcGVuKCkge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VySXRlbU51bUNoYW5nZSwgdGhpcy5TaG93UGxheWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJJdGVtQ2hhbmdlLCB0aGlzLlNob3dQbGF5ZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KEdhbWVNb2R1bGUuRXZlbnQuT25DaGFyYWN0ZXJJdGVtQ2hhbmdlLCB0aGlzLlNob3dDaGFyYWN0ZWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5TaG93SXRlbSgpO1xyXG4gICAgfVxyXG4gICAgQ2xvc2UoKSB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJJdGVtTnVtQ2hhbmdlLCB0aGlzLlNob3dQbGF5ZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckl0ZW1DaGFuZ2UsIHRoaXMuU2hvd1BsYXllckl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoR2FtZU1vZHVsZS5FdmVudC5PbkNoYXJhY3Rlckl0ZW1DaGFuZ2UsIHRoaXMuU2hvd0NoYXJhY3RlZXJJdGVtLCB0aGlzKTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpIHtcclxuICAgICAgICAvL+aYvuekuumHkeW4geS/oeaBr1xyXG4gICAgICAgIHRoaXMuX1Nob3dHb2xkTnVtKCk7XHJcbiAgICAgICAgLy/mmL7npLrot53nprvkv6Hmga9cclxuICAgICAgICB0aGlzLl9TaG93RGlzdGFuY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0Q2xpY2tTa2lsbEl0ZW0ob3duZXI6IE9iamVjdCwgbGlzdGVuZXI6IChwYXJhbTogYW55KSA9PiBhbnkpIHtcclxuICAgICAgICB2YXIgZGVsZWdhdGU6IE1lc3NhZ2VNRC5EZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fb25DbGlja1NraWxsSXRlbSA9IGRlbGVnYXRlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFJlZ2lzdENsaWNrUGxheWVySXRlbShvd25lcjogT2JqZWN0LCBsaXN0ZW5lcjogKHBhcmFtOiBhbnkpID0+IGFueSkge1xyXG4gICAgICAgIHZhciBkZWxlZ2F0ZTogTWVzc2FnZU1ELkRlbGVnYXRlID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZShvd25lciwgbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubV9vbkNMaWNrUGxheWVySXRlbSA9IGRlbGVnYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25DbGlja1NraWxsSXRlbSgpIHtcclxuICAgICAgICB0aGlzLm1fb25DbGlja1NraWxsSXRlbS5FeGVjdXRlKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIE9uQ2xpY2tQbGF5ZXJJdGVtKCkge1xyXG4gICAgICAgIHRoaXMubV9vbkNMaWNrUGxheWVySXRlbS5FeGVjdXRlKCk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IHtQbGF5ZXJ9IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckVudGl0eVwiXHJcbmltcG9ydCB7R2FtZUFnZW50fSBmcm9tIFwiLi8uLi9BZ2VudC9HYW1lQWdlbnRcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBJdGVtRWxlbWVudCBmcm9tIFwiLi8uLi9zY3JpcHQvSXRlbUVsZW1lbnRcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiXHJcblxyXG5jbGFzcyBFeHRlbmRzSXRlbUxpc3RVSSBleHRlbmRzIHVpLkl0ZW1MaXN0VUlcclxue1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OkFycmF5PG51bWJlcj5cclxuICAgIEJ0bkxpc3RlbmVyOk1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9JdGVtTGlzdCA9IFtdO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1MaXN0VUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJJdGVtTGlzdFVJXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIFVJOkV4dGVuZHNJdGVtTGlzdFVJO1xyXG4gICAgcHJpdmF0ZSBtX0dvbGQ6c3RyaW5nW107XHJcbiAgICBwcml2YXRlIG1fSXRlbUxpc3Q6QXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLlVJID0gbmV3IEV4dGVuZHNJdGVtTGlzdFVJKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLlVJKTtcclxuICAgICAgICB0aGlzLlVJLkJ0bkxpc3RlbmVyID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZSh0aGlzLCgpPT57IHRoaXMuX1VJTWFuYWdlci5DbG9zZSh0aGlzKX0pXHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUxpc3QoKTtcclxuICAgICAgICAvL3RoaXMubV9Hb2xkID0gdGhpcy5VSS5fR29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICAvL3RoaXMuVUkuX0JHLmFscGhhID0gMDtcclxuICAgICAgICAvL3RoaXMuVUkuX0JHLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcyx0aGlzLkNsb3NlVUkpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIE9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsdGhpcy5TaG93R29sZCx0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlLHRoaXMuUmVmcmVzaExpc3QsdGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5TaG93R29sZCgpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSx0aGlzLlNob3dHb2xkLHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UsdGhpcy5SZWZyZXNoTGlzdCx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HZXRJdGVtTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuU2V0TGlzdCh0aGlzLm1fSXRlbUxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWZyZXNoTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HZXRJdGVtTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuRnJlc2hMaXN0KHRoaXMubV9JdGVtTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldEl0ZW1MaXN0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0U2VsbEl0ZW1JRExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd0dvbGQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLlNob3dpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0dvbGRbMV0gPVwiXCIgKyBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXk7XHJcbiAgICAgICAgLy90aGlzLlVJLl9Hb2xkLnRleHQgPSB0aGlzLm1fR29sZFswXSArIHRoaXMubV9Hb2xkWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1JlbmRlckhhbmRsZXIoY2VsbDpMYXlhLkJveCxpbmRleDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgcm9sZUVsZW1lbnQ6SXRlbUVsZW1lbnQgPSBjZWxsIGFzIEl0ZW1FbGVtZW50O1xyXG4gICAgICAgIHZhciBpdGVtTGlzdDpBcnJheTxudW1iZXI+ID0gR2FtZUFnZW50LkFnZW50Lkl0ZW1MaXN0O1xyXG4gICAgICAgIHJvbGVFbGVtZW50LkluaXQoKTtcclxuICAgICAgICByb2xlRWxlbWVudC5JdGVtSWR4ID0gdGhpcy5tX0l0ZW1MaXN0W2luZGV4XTtcclxuICAgICAgICByb2xlRWxlbWVudC5SZWdpc3RCdXkodGhpcyx0aGlzLkJ1eUl0ZW0pO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlZ2lzdENob29zZSh0aGlzLHRoaXMuQ2hvb3NlSXRlbSk7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuSXNHcmF5ID0gaXRlbUxpc3RbdGhpcy5tX0l0ZW1MaXN0W2luZGV4XV0/ZmFsc2U6dHJ1ZTtcclxuICAgICAgICByb2xlRWxlbWVudC5OdW0gPSBpdGVtTGlzdFt0aGlzLm1fSXRlbUxpc3RbaW5kZXhdXT9pdGVtTGlzdFt0aGlzLm1fSXRlbUxpc3RbaW5kZXhdXTowO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LkJ0bkxhYmxlID0gXCJcIiArIEdhbWVBUFAuSXRlbU1nci5HZXRQcmljZSh0aGlzLm1fSXRlbUxpc3RbaW5kZXhdKSArIFwiJFwiO1xyXG4gICAgICAgIC8vcm9sZUVsZW1lbnQuU2V0QnRuKHRoaXMuQnRuTGlzdGVuZXIuTGlzdGVuZXIsdGhpcy5CdG5MaXN0ZW5lci5BY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0TGlzdChsaXN0QXJyYXk6QXJyYXk8YW55PilcclxuICAgIHtcclxuICAgICAgICAvL3ZhciBsaXN0QXJyYXk6QXJyYXk8YW55PiA9IHRoaXMubV9JdGVtTGlzdDtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnJlbmRlckhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsdGhpcy5fUmVuZGVySGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5hcnJheSA9IGxpc3RBcnJheTtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljRGlzdGFuY2UgPSA1MFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBGcmVzaExpc3QoaWRMaXN0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QuYXJyYXkgPSBpZExpc3Q7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgQnV5SXRlbShpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuU2hvd2luZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5CdXlJdGVtKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENob29zZUl0ZW0oaWQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLlNob3dpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZihHYW1lQWdlbnQuQWdlbnQuSXRlbUxpc3RbaWRdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LkN1ckl0ZW0gPSBpZDtcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIENsb3NlVUkoKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2UodGhpcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgV2VjaGF0T3BlbiB9IGZyb20gXCIuLi9wbGF0Zm9ybS9XZWNoYXRPcGVuXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5jbGFzcyBFeHRlbmRzUmFua1BhbmVsVUkgZXh0ZW5kcyB1aS5HYW1lUmFua1VJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVJhbmtcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy90aGlzLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57QVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5rUGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNSYW5rUGFuZWxVSTtcclxuICAgIHJhbmtUZXh0dXJlOiBMYXlhLlRleHR1cmU7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNSYW5rUGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLmNsb3NlQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsICgpID0+IHsgXHJcbiAgICAgICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkuY2xvc2VSYW5rKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlJhbmtQYW5lbFVJXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkub3BlblJhbmsoKTtcclxuICAgIH1cclxuXHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5yYW5rVGV4dHVyZS5iaXRtYXAuYWx3YXlzQ2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5yYW5rVGV4dHVyZS5kaXNwb3NlQml0bWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2VPUCgpIHtcclxuICAgICAgICB0aGlzLlNhdmVQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kc1NldFBhbmVsVUkgZXh0ZW5kcyB1aS5TZXRQYW5lbFVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiU2V0UGFuZWxcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy90aGlzLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57QVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXRQYW5lbFVJIGV4dGVuZHMgQmFzZVVJIHtcclxuICAgIF9VSTogRXh0ZW5kc1NldFBhbmVsVUk7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNTZXRQYW5lbFVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JldHVybi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCAoKSA9PiB7IHRoaXMuX1VJTWFuYWdlci5DbG9zZUN1clZpZXcoKTsgR3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpIH0pO1xyXG4gICAgICAgIHRoaXMuU2V0UGFuZWwoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2V0UGFuZWxVSVwiO1xyXG4gICAgfVxyXG4gICAgU2V0UGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdldFNldEluZm8oKTtcclxuICAgICAgICAvLyB0aGlzLl9VSS5fQXVkaW9Td2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uQXVkaW9PbiA/IDAgOiAxO1xyXG4gICAgICAgIC8vIHRoaXMuX1VJLl9PUFN3aXRjaC5zZWxlY3RlZEluZGV4ID0gaW5mby5PUElzUmlnaHQgPyAxIDogMDtcclxuICAgICAgICAvLyB0aGlzLl9VSS5fVGV4dC50ZXh0ID0gaW5mby5UZXh0SW5mbztcclxuICAgIH1cclxuICAgIFNhdmVQYW5lbCgpIHtcclxuICAgICAgICB2YXIgaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvID0gbmV3IEdhbWVTdHJ1Y3QuU2V0SW5mbygpO1xyXG4gICAgICAgIC8vIGluZm8uQXVkaW9PbiA9IHRoaXMuX1VJLl9BdWRpb1N3aXRjaC5zZWxlY3RlZEluZGV4ID09IDA7XHJcbiAgICAgICAgLy8gaW5mby5PUElzUmlnaHQgPSB0aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9PSAxO1xyXG4gICAgICAgIC8vIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNhdmVTZXRJbmZvKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpIHtcclxuICAgICAgICBzdXBlci5MYXlvdXQoKTtcclxuICAgICAgICBpZighdGhpcy5fVUkgfHwgIXRoaXMuX1VJLmJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuYmcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX1VJLmJnLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlT1AoKSB7XHJcbiAgICAgICAgdGhpcy5TYXZlUGFuZWwoKTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG59XHJcbiIsImltcG9ydCBCYXNlVUkgZnJvbSBcIi4vLi4vQmFzZVVJXCJcclxuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcclxuXHJcbm1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgTG9hZGluZ1VJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfUHJvZ3Jlc3M6TGF5YS5Qcm9ncmVzc0JhcjtcclxuXHRcdHB1YmxpYyBfR3VpZGVyOkxheWEuSW1hZ2U7XHJcblx0XHRwdWJsaWMgX0VudGVyOkxheWEuQnV0dG9uO1xyXG5cdFx0cHVibGljIEVycm9ySW5mbzpMYXlhLkxhYmVsO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJMb2FkaW5nXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRXh0TG9hZGluZ1VJIGV4dGVuZHMgdWkuTG9hZGluZ1VJXHJcbntcclxuICAgIGNyZWF0ZUNoaWxkcmVuKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKFwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIikpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRpbmdVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIFwiTG9hZGluZ1VJXCI7XHJcbiAgICB9XHJcbiAgICBfVUk6dWkuTG9hZGluZ1VJO1xyXG4gICAgX0NhbGxCYWNrOigpPT52b2lkO1xyXG4gICAgY29uc3RydWN0b3IoIG5hbWU6c3RyaW5nIClcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICAvL3RoaXMuX1VJID1uZXcgdWkuTG9hZGluZ1VJKCk7XHJcbiAgICAgICAgdGhpcy5fVUkgPW5ldyBFeHRMb2FkaW5nVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJICk7XHJcbiAgICAgICAgdGhpcy5WYWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5fVUkuRXJyb3JJbmZvLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIudmlzaWJsZSA9ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e1xyXG4gICAgICAgICAgICB0aGlzLl9DYWxsQmFjaygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuTGF5b3V0KCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHg6bnVtYmVyID0gMDtcclxuICAgICAgICB4ICs9IHRoaXMuX1VJLl9Qcm9ncmVzcy53aWR0aCp0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fVUkuX0d1aWRlci5wb3MoeCx0aGlzLl9VSS55KTtcclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1VJIHx8ICF0aGlzLl9VSVtcImJnXCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUlbXCJiZ1wiXS53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUlbXCJiZ1wiXS5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgVmFsdWUobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWUgPSBudW07XHJcbiAgICAgICAgdGhpcy5VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIENvbXBsZXRlKGNhbGxCYWNrOigpPT52b2lkKVxyXG4gICAge1xyXG5cclxuICAgICAgICBjYWxsQmFjaygpO1xyXG4gICAgICAgIC8vIHRoaXMuX0NhbGxCYWNrID0gY2FsbEJhY2s7XHJcbiAgICAgICAgLy8gdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMuX1VJLl9FbnRlci5sYWJlbCA9IFwiRW50ZXJcIjsvL3RoaXMuX05hbWVbMF07XHJcbiAgICB9XHJcbiAgICBSZWxvYWQoc3RyLCBjYWxsQmFjazooKT0+dm9pZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udGV4dCA9IHN0cjtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkuRXJyb3JJbmZvLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8uaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgQkdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0VhcnRoOkxheWEuSW1hZ2U7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJCR1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Hb2xkOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9MaXN0OkxheWEuTGlzdDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkNoYXJhY3RlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW5kR2FtZVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgX1N0YXJ0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTWVudWVCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9TZXRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QbGF5ZXJMaXN0QnRuOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiRW5kR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgRW50ZXJVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgYmc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIF9sb2dvOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBfU3RhcnQ6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9DaGFyYWN0ZXI6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QYW5lbDpMYXlhLlBhbmVsO1xuXHRcdHB1YmxpYyBfR3JvdXA6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgX1NldFBhbmVsOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyTGlzdDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgYWR2OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUmFuazpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVudGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Db3VudERvd25VSTpMYXlhLkJveDtcblx0XHRwdWJsaWMgX0l0ZW1MaXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ291bnRUaW1lOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lSW5mbzpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfR2FtZVBhbmVsOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfVHh0RGlzdGFuY2U6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1R4dEdvbGQ6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX0xlZnRUb3VjaDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1JpZ2h0VG91Y2g6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9Ta2lsbEl0ZW06TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QbGF5ZXJJdGVtOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVJhbmtVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgY2xvc2VCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIGdhbWVSYW5rVWk6bGF5YS51aS5XWE9wZW5EYXRhVmlld2VyO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVJhbmtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEl0ZW1MaXN0VUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9CRzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBfTGlzdDpMYXlhLkxpc3Q7XG5cdFx0cHVibGljIF9Hb2xkOkxheWEuTGFiZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJJdGVtTGlzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTGlzdFVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfUGxheWVyTGlzdDpMYXlhLkxpc3Q7XG5cdFx0cHVibGljIF9SZXR1cm5NYWluOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiUGxheWVyTGlzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgYmc6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgX1RleHQ6TGF5YS5UZXh0QXJlYTtcblx0XHRwdWJsaWMgX1JldHVybjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0F1ZGlvU3dpdGNoOkxheWEuUmFkaW9Hcm91cDtcblx0XHRwdWJsaWMgX09QU3dpdGNoOkxheWEuUmFkaW9Hcm91cDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlNldFBhbmVsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyIl19
