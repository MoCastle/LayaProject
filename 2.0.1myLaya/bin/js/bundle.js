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
    Object.defineProperty(GameAgent.prototype, "GameItemNum", {
        get: function () {
            return this.m_PlayerEntity.CurItemNum < this.m_UseItemNum ? this.m_PlayerEntity.CurItemNum : this.m_UseItemNum;
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
        APP_1.default.MessageManager.Fire(PlayerEntity_1.Player.Event.OnCurItemNumChange);
        this.m_UseItemNum = 1;
    };
    GameAgent.prototype.ResetSkillItem = function () {
        var CharacterID = this.m_PlayerEntity.CurCharacterID;
        this.m_SkillItemNum = GameAPP_1.default.CharacterMgr.GetSkillItem(CharacterID) < 0 ? 0 : 1;
        APP_1.default.MessageManager.Fire(GameModule_1.GameModule.Event.OnCharacterItemChange);
        this.m_SkillItemNum = 1;
    };
    GameAgent.prototype.UseGameItem = function () {
        if (this.GameItemNum < 1) {
            return;
        }
        --this.m_UseItemNum;
        this.m_PlayerEntity.ReduceItem(this.CurItem);
    };
    GameAgent.prototype.UseSkillItem = function () {
        if (this.SkillItemNum < 1) {
            return;
        }
        --this.m_SkillItemNum;
        APP_1.default.MessageManager.Fire(GameModule_1.GameModule.Event.OnCharacterItemChange);
    };
    return GameAgent;
}(BaseAgent_1.default));
exports.GameAgent = GameAgent;
},{"../controler/GameAPP":41,"./../Game/GameModule":23,"./../controler/APP":40,"./BaseAgent":1,"./PlayerEntity":3}],3:[function(require,module,exports){
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
            var interestinglife = (Laya.LocalStorage.getItem("Interestinglife") != null ? JSON.parse(Laya.LocalStorage.getItem("Interestinglife")) : {});
            this.m_Money = interestinglife.m_Money || 0;
            this.m_CurCharacterID = interestinglife.m_CurCharacterID || 0;
            this.m_CharacterList = interestinglife.m_CharacterList || [1, 0, 0, 0, 0];
            this.m_HistoryMaxLevel = interestinglife.m_HistoryMaxLevel || 0;
            this.m_CurItem = interestinglife.m_CurItem || 0;
            this.m_FrameWork = FrameWork_1.default.FM;
            this.m_MessageMgr = FrameWork_1.default.FM.GetManager(MessageCenter_1.MessageMD.MessageCenter);
            this.m_ItemList = interestinglife.m_ItemList || [];
            this.m_CurScore = interestinglife.m_CurScore || 0;
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
        PlayerEntity.prototype.saveDataToLocal = function () {
            var localData = {};
            localData.m_Money = this.m_Money;
            localData.m_CurCharacterID = this.m_CurCharacterID;
            localData.m_CharacterList = this.m_CharacterList;
            localData.m_HistoryMaxLevel = this.m_HistoryMaxLevel;
            localData.m_CurItem = this.m_CurItem;
            localData.m_ItemList = this.m_ItemList;
            localData.m_CurScore = this.m_CurScore;
            Laya.LocalStorage.setItem("Interestinglife", localData);
        };
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
},{"../platform/WechatOpen":43,"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10}],4:[function(require,module,exports){
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
    Object.defineProperty(PlayerGuestAgent.prototype, "SkinDir", {
        get: function () {
            return "entersceneui/res2/";
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
    Object.defineProperty(PlayerGuestAgent.prototype, "ItemList", {
        get: function () {
            return this.m_PlayerEntity.ItemList;
        },
        enumerable: true,
        configurable: true
    });
    PlayerGuestAgent.prototype.BuyCharacter = function (id) {
        var price = GameAPP_1.default.CharacterMgr.GetPrice(id);
        if (id < 0 || price < 0 || price > this.m_PlayerEntity.Money) {
            return;
        }
        this.m_PlayerEntity.Money -= price;
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
},{"./../controler/GameAPP":41,"./BaseAgent":1}],5:[function(require,module,exports){
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
        * @param {Function} listener 监听者
        * @param {Obj} owner 拥有者
        */
        MessageCenter.prototype.Regist = function (name, listener, owner) {
            var getEvent = this._GetEvent(name);
            var newDlgt = new Delegate(owner, listener);
            getEvent.Add(newDlgt);
            return getEvent;
        };
        /**
         * 注销某个监听
         * @param {string} name 消息名字
         * @param {Function} listener 监听者
         * @param {Obj} owner 拥有者
         */
        MessageCenter.prototype.DesRegist = function (name, listener, owner) {
            var getEvent = this._GetEvent(name);
            getEvent.Rmv(listener, owner);
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
         * 注册方法
         * @param listener 监听事件
         * @param owner 拥有者
         */
        MEvent.prototype.AddFunc = function (listener, owner) {
            var dlg = new Delegate(owner, listener);
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
},{"./../FrameWork/BaseManager":8,"./../Scene/Scene":36}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseManager_1 = require("./../FrameWork/BaseManager");
var TimeManager = /** @class */ (function (_super) {
    __extends(TimeManager, _super);
    function TimeManager() {
        var _this = _super.call(this) || this;
        _this.m_StartTime = Laya.timer.currTimer;
        _this.m_GameTime = 0;
        _this.m_PauseTime = 0;
        _this.m_PausingTime = 0;
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
            return (Laya.timer.currTimer - this.m_StartTime - this.m_PauseTime - this.PausingTime) / 1000;
        },
        enumerable: true,
        configurable: true
    });
    TimeManager.prototype.Update = function () {
    };
    TimeManager.prototype.Pause = function () {
        if (this.m_PausingTime <= 0)
            this.m_PausingTime = Laya.timer.currTimer;
    };
    Object.defineProperty(TimeManager.prototype, "PausingTime", {
        get: function () {
            return this.m_PausingTime > 0 ? (Laya.timer.currTimer - this.m_PausingTime) : 0;
        },
        enumerable: true,
        configurable: true
    });
    TimeManager.prototype.Continue = function () {
        this.m_PauseTime += this.PausingTime;
        this.m_PausingTime = 0;
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
var APP_1 = require("../controler/APP");
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
        if (this.m_UpdateTime < APP_1.default.TimeManager.GameTime) {
            this.UpdateUI(this.m_BottomNode);
            this.UpdateUI(this.m_MidleNode);
            this._UpdateCount = 0;
            this.m_UpdateTime = APP_1.default.TimeManager.GameTime + 0.3;
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
},{"../controler/APP":40,"./../Base/BaseEnum":5,"./../Utility/UIFunc":39,"./BaseManager":8}],14:[function(require,module,exports){
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
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "BG.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = true;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/ItemElement":44,"./script/RoleElement":45}],15:[function(require,module,exports){
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
    CharacterManager.prototype.GetItemID = function (id) {
        var info = this.GetInfo(id);
        if (!info)
            return;
        return info.Item;
    };
    CharacterManager.prototype.GetName = function (id) {
        var info = this.GetInfo(id);
        if (!info)
            return "";
        return info.mName;
    };
    CharacterManager.prototype.GetDesc = function (id) {
        var info = this.GetInfo(id);
        if (!info)
            return "";
        return info.Desc;
    };
    CharacterManager.prototype.GetCharacterModel = function (id) {
        var info = this.GetInfo(id);
        if (!info)
            return;
        var characterData = this.GetCharacterInfo(id);
        var sampleModel = Laya.loader.getRes(Path_1.path.GetLH(characterData.Name));
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
        _this.m_ID = characterData.ID ? characterData.ID : "";
        _this.m_ModelName = characterData.ModelID ? characterData.ModelID : "";
        _this.m_Item = characterData.ItemID ? Number(characterData.ItemID - 1) : -1;
        _this.m_Price = characterData.Price ? Number(characterData.Price) : 0;
        _this.m_Name = characterData.Passscore ? characterData.Passscore : "";
        _this.m_Desc = characterData.Desc ? characterData.Desc : "";
        return _this;
    }
    Object.defineProperty(CharacterInfo.prototype, "mName", {
        get: function () {
            return this.m_Name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CharacterInfo.prototype, "Desc", {
        get: function () {
            return this.m_Desc;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(CharacterInfo.prototype, "Name", {
        get: function () {
            return this.m_ModelName;
        },
        enumerable: true,
        configurable: true
    });
    return CharacterInfo;
}(GameManager_1.GameManager.BaseInfo));
},{"../Utility/Path":38,"./GameManager":16}],16:[function(require,module,exports){
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
            this.m_ID = data.ID ? Number(data.ID) - 1 : -1;
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
},{"../Utility/Path":38}],17:[function(require,module,exports){
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
     * 获取道具价格
     * @param id 道具ID
     */
    ItemManager.prototype.GetItemIcon = function (id) {
        var info = this.GetInfo(id);
        if (info)
            return info.Icon;
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
    ItemManager.prototype.GetItemType = function (id) {
        var info = this.GetInfo(id);
        if (info)
            return info.ItemType;
    };
    ItemManager.prototype.GetItemInfo = function (id) {
        var info = this.GetInfo(id);
        return info;
    };
    return ItemManager;
}(GameManager_1.GameManager.BaseManager));
exports.default = ItemManager;
var ItemInfo = /** @class */ (function (_super) {
    __extends(ItemInfo, _super);
    function ItemInfo(data) {
        var _this = _super.call(this, data) || this;
        _this.m_ID = data.ID ? data.ID : "";
        _this.m_Passscore = data.Passscore ? data.Passscore : "";
        _this.m_ModelName = data.ModelName ? data.ModelName : "";
        _this.m_ExtendID = data.ExtendID ? data.ExtendID : "";
        _this.m_Price = data.Price ? Number(data.Price) : 0;
        _this.m_ItemType = data.ItemType ? Number(data.ItemType) : 0;
        _this.m_Icon = data.Icon ? data.Icon : "";
        _this.m_Desc = data.Desc ? data.Desc : "";
        return _this;
    }
    Object.defineProperty(ItemInfo.prototype, "Desc", {
        get: function () {
            return this.m_Desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInfo.prototype, "Passscore", {
        get: function () {
            return this.m_Passscore;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(ItemInfo.prototype, "ItemType", {
        get: function () {
            return this.m_ItemType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ItemInfo.prototype, "Icon", {
        get: function () {
            return this.m_Icon;
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
},{"./../Utility/Path":38,"./../controler/APP":40,"./../controler/GameControler":42}],19:[function(require,module,exports){
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
        //this.fieldOfView
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
        var disHum = PlayerPS.x - CameraPS.x;
        if (Math.abs(disNum) > 0.01) {
            CameraPS.y += disNum;
        }
        if (Math.abs(disZNum) > 0.01) {
            CameraPS.z += disZNum;
        }
        if (Math.abs(disHum) > 0.01) {
            CameraPS.x += disHum;
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
var GameModule_1 = require("./GameModule");
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
    Item.BuffSlot = {};
    Item.BuffSlot[ItemType.Collector] = 0;
    Item.BuffSlot[ItemType.Protect] = 1;
    Item.BuffSlot[ItemType.HolyProtect] = 1;
    Item.BuffSlot[ItemType.Fly] = 1;
    Item.BuffSlot[ItemType.Vine] = 2;
    //物品布局
    var ItemLayout = /** @class */ (function () {
        function ItemLayout() {
            this.RewardList = new Array();
            this.BarrierList = new Array();
            this.BarrierList.push(new LayItemMgr(10, 1, ItemType.Empty, 10));
            this.BarrierList.push(new LayItemMgr(10, 5, ItemType.Rock, 10));
            this.BarrierList.push(new LayItemMgr(10, 2, ItemType.Thorn, 10));
            this.RewardList.push(new LayItemMgr(10, 2, ItemType.Vine, 10));
            this.RewardList.push(new LayItemMgr(10, 1, ItemType.Coin));
            //this.RewardList.push(new LayItemMgr(50, 100, ItemType.Fly, 20));
            this.RewardList.push(new LayItemMgr(50, 10, ItemType.Collector));
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
    function StepItemFactory(itemType, step) {
        if (step == undefined) {
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
                item = new clas(step);
            }
            else {
                item = new StepItem(itemType, step);
            }
        }
        item.Step = step;
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
                buff = new CollectBuff(10);
                break;
            case ItemType.Protect:
                buff = new ProtectBuff(3);
                break;
            case ItemType.HolyProtect:
                buff = new ProtectBuff(3, true);
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
        StepItem.prototype.AddBuffToPlayer = function (player, putBackItem) {
            if (putBackItem === void 0) { putBackItem = true; }
            var Buff = ItemBuffFactory(this.ItemType);
            var success = Buff.AddToPlayer(player);
            if (success && putBackItem)
                this.PutItem();
            return success;
        };
        /**
         * 突破保护
         * @returns 是否被突破
         */
        StepItem.prototype.BreakProtect = function (player) {
            var curBuff = player.GetBuff(Item.BuffSlot[ItemType.Protect]);
            if (curBuff) {
                switch (curBuff.Type) {
                    case ItemType.Protect:
                        curBuff.RemoveSelf();
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
        function BasePlayerBuff(type) {
            this.m_Type = type;
        }
        Object.defineProperty(BasePlayerBuff.prototype, "Type", {
            get: function () {
                return this.m_Type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasePlayerBuff.prototype, "Slot", {
            get: function () {
                return Item.BuffSlot[this.Type];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BasePlayerBuff.prototype, "player", {
            get: function () {
                return this.m_Player;
            },
            enumerable: true,
            configurable: true
        });
        BasePlayerBuff.prototype.Update = function () {
        };
        //向玩家添加BUFF
        BasePlayerBuff.prototype.AddToPlayer = function (player) {
            this.m_Player = player;
            player.AddBuff(this);
            return true;
        };
        BasePlayerBuff.prototype.RemoveSelf = function () {
            this.player.CompleteBuff(this.Slot);
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
            this.AddBuffToPlayer(player);
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
            var _this = _super.call(this, IsHoly ? ItemType.HolyProtect : ItemType.Protect) || this;
            _this.Time = APP_1.default.TimeManager.GameTime + time;
            return _this;
        }
        ProtectBuff.prototype.Update = function () {
            if (this.Time < APP_1.default.TimeManager.GameTime) {
                this.RemoveSelf();
            }
        };
        ProtectBuff.prototype.Start = function () {
        };
        ProtectBuff.prototype.Removed = function () {
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
            this.AddBuffToPlayer(player);
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
            this.AddBuffToPlayer(player);
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
            var _this = _super.call(this, ItemType.Collector) || this;
            _this.GameDir = GameControler_1.default.GameControler.GameDir;
            _this.Time = APP_1.default.TimeManager.GameTime + time;
            _this.CountFloor = 0;
            return _this;
        }
        Object.defineProperty(CollectBuff, "Slot", {
            get: function () {
                return 1;
            },
            enumerable: true,
            configurable: true
        });
        CollectBuff.prototype.Start = function () {
            this.CountFloor = this.GameDir.GamePlay.PlayerFloor - 2;
        };
        CollectBuff.prototype.Removed = function () {
        };
        CollectBuff.prototype.Update = function () {
            if (this.Time < APP_1.default.TimeManager.GameTime) {
                this.RemoveSelf();
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
                Coin.FlyToPlayer(this.player);
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
            this.AddBuffToPlayer(player);
            this.PutItem();
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
            var _this = _super.call(this, ItemType.Fly) || this;
            _this.Speed = speed;
            _this.Floor = floor;
            _this._FinalLocation = null;
            _this._FinalZ = 0;
            return _this;
        }
        Object.defineProperty(FlyBuff, "Slot", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        FlyBuff.prototype.Start = function () {
            var time = APP_1.default.TimeManager.GameTime;
            var player = this.player;
            if (player.CurStep == null) {
                this.RemoveSelf();
            }
            this.m_FloorSwitch = player.CurStep.Floor.rightSwitch;
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - GameModule_1.GameModule.DSpace * this.Floor;
            var flyCtrl = new PlayerCtrler_1.PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player);
            player.AddCtrler(flyCtrl);
            player.Fly();
            GameControler_1.default.GameControler.GameDir.GamePlay.AddInputCtrler(new Input_1.Input.DIYInput());
            GameControler_1.default.GameControler.GameDir.GamePlay.SetSafePS(this._FinalLocation);
            player.FlyPrepare();
            GameControler_1.default.GameControler.GameDir.GamePlay.gameMap.SetNextFlpprDirSwitch(this.m_FloorSwitch);
        };
        FlyBuff.prototype.Removed = function () {
            var step = GameControler_1.default.GameControler.GameDir.GamePlay.GetStepByLocation(this._FinalLocation, this.m_FloorSwitch);
            this.player.LayStep(step);
            this.player.BaseCtrler.StartMove();
            this.player.PopCtrler();
            GameControler_1.default.GameControler.GameDir.GamePlay.PopInputCtrler();
        };
        FlyBuff.prototype.Update = function () {
            if (this.player == null) {
                return;
            }
            if (this._FinalZ - this.player.Position.z > -0.2) {
                _super.prototype.RemoveSelf.call(this);
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
            this.AddBuffToPlayer(player, false);
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
            var _this = _super.call(this, ItemType.Rope) || this;
            _this.Speed = speed;
            _this.Floor = floor;
            _this._FinalLocation = null;
            _this._FinalZ = 0;
            return _this;
        }
        Object.defineProperty(RopeBuff, "Slot", {
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        RopeBuff.prototype.Update = function () {
            if (this.player == null) {
                return;
            }
            if (this._FinalZ - this.player.Position.z > -0.2) {
                this.RemoveSelf();
            }
        };
        RopeBuff.prototype.Start = function () {
            var player = this.player;
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - GameModule_1.GameModule.DSpace * this.Floor;
            var flyCtrl = new PlayerCtrler_1.PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player);
            player.AddCtrler(flyCtrl);
            GameControler_1.default.GameControler.GameDir.GamePlay.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
            GameControler_1.default.GameControler.GameDir.GamePlay.SetSafePS(this._FinalLocation);
        };
        RopeBuff.prototype.Removed = function () {
            var step = GameControler_1.default.GameControler.GameDir.GamePlay.GetStepByLocation(this._FinalLocation);
            this.player.LayStep(step);
            this.player.BaseCtrler.StartMove();
            this.player.PopCtrler();
            GameControler_1.default.GameControler.GameDir.GamePlay.PopInputCtrler();
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
            this.RemoveSelf();
        };
        return RopeBuff;
    }(BasePlayerBuff));
    var Vine = /** @class */ (function (_super) {
        __extends(Vine, _super);
        function Vine(step) {
            var _this = _super.call(this, ItemType.Vine, step) || this;
            _this.Touched = false;
            return _this;
        }
        Object.defineProperty(Vine.prototype, "Touched", {
            get: function () {
                return this.m_BeTouched;
            },
            set: function (value) {
                this.m_BeTouched = value;
            },
            enumerable: true,
            configurable: true
        });
        Vine.prototype.TouchItem = function (player) {
            if (this.Touched)
                return;
            this.AddBuffToPlayer(player, false);
            this.Touched = true;
        };
        //由父类统一管理模型生成
        Vine.prototype._GenItemModel = function () {
            var Idx = Math.floor(1 + Math.random() * 2);
            var name = Idx == 1 ? Path_1.path.GetLH("trap_entangle_01") : Path_1.path.GetLH("trap_chomper_01");
            var model = Laya.loader.getRes(name).clone();
            this.Model = model;
        };
        //消除 把自己存入内存池
        Vine.prototype.DesPawn = function () {
            this.Touched = false;
            _super.prototype.DesPawn.call(this);
        };
        return Vine;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Vine] = Vine;
    var VineBuff = /** @class */ (function (_super) {
        __extends(VineBuff, _super);
        function VineBuff(countTime, inputDir) {
            if (countTime === void 0) { countTime = 4; }
            if (inputDir === void 0) { inputDir = true; }
            var _this = _super.call(this, ItemType.Vine) || this;
            _this.CountTime = countTime;
            _this.InputDir = inputDir;
            _this._ShowGameInfo();
            return _this;
        }
        VineBuff.prototype.Start = function () {
            GameControler_1.default.GameControler.GameDir.GamePlay.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
        };
        VineBuff.prototype.Removed = function () {
            GameControler_1.default.GameControler.GameDir.GamePlay.PopInputCtrler();
        };
        VineBuff.prototype._Input = function (inputDir) {
            if (this.InputDir == inputDir) {
                this.InputDir = !this.InputDir;
                --this.CountTime;
            }
            this._ShowGameInfo();
            if (this.CountTime <= 0) {
                this.RemoveSelf();
            }
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
},{"./../FrameWork/MessageCenter":10,"./../Game/AnimObj":18,"./../Utility/Path":38,"./../controler/APP":40,"./../controler/GameControler":42,"./GameModule":23,"./GameStruct":24,"./Input":25,"./PlayerCtrler":28}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MountLine_1 = require("./MountLine");
var GameItem_1 = require("./GameItem");
var Mounts = 2;
var LineSpace = 2;
var Gamemap = /** @class */ (function (_super) {
    __extends(Gamemap, _super);
    /**
     * 地图
     * @param floorNum 层数
     * @param column 列数
     */
    function Gamemap(floorNum, column) {
        var _this = 
        //floorNum = 3;
        //column = 5;
        _super.call(this) || this;
        _this.m_MountLines = [];
        _this.m_CurIdx = 0;
        _this.m_HeadFloorIdx = 0;
        _this.m_TailFLoorIdx = 0;
        _this.m_ItemLayout = new GameItem_1.Item.ItemLayout();
        _this.m_CurLineBarriers = new Array();
        _this.m_CurLineRewards = new Array();
        _this.m_rightSwitchCount = 0;
        for (var idx = 0; idx < floorNum; ++idx) {
            var newMountain = new MountLine_1.default(idx, column, idx);
            _this.m_MountLines[idx] = newMountain;
            _this.addChild(newMountain);
        }
        return _this;
    }
    Object.defineProperty(Gamemap.prototype, "CurLineRewards", {
        get: function () {
            return this.m_CurLineRewards;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gamemap.prototype, "CurLineBarriers", {
        get: function () {
            return this.m_CurLineBarriers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gamemap.prototype, "MountLines", {
        get: function () {
            return this.m_MountLines;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gamemap.prototype, "NextID", {
        get: function () {
            return (this.m_CurIdx + 1) % Mounts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gamemap.prototype, "HeadFloor", {
        get: function () {
            return this.m_MountLines[this.m_HeadFloorIdx];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gamemap.prototype, "TailFLoor", {
        get: function () {
            return this.m_MountLines[this.m_TailFLoorIdx];
        },
        enumerable: true,
        configurable: true
    });
    Gamemap.prototype.Init = function (startFloor) {
        var lines = this.m_MountLines;
        startFloor = (!startFloor) && (startFloor < 0) && (startFloor >= lines.length) ? 0 : startFloor;
        this.m_HeadFloorIdx = lines.length - 1;
        this.m_TailFLoorIdx = 0;
        this.m_rightSwitchCount = 0;
        for (var idx = 0; idx < lines.length; ++idx) {
            var line = lines[idx];
            line.SetLine(idx, this.CountNextFloorDirSwith());
            if (idx != startFloor && idx > 1)
                lines[idx - 1].SetNextFloor(line);
            else {
                var PlayerStep = line.GetStep(Math.floor(line.Length / 2));
                PlayerStep.IsDeadRoad = false;
                this.m_SafeLocation = PlayerStep.Location;
            }
            this.PutItemInLine(idx);
        }
    };
    Gamemap.prototype.CountNextFloorDirSwith = function () {
        return this.m_rightSwitchCount;
    };
    Gamemap.prototype.SetNextFlpprDirSwitch = function (num) {
        this.m_rightSwitchCount = num;
    };
    Gamemap.prototype.GetSafeStep = function () {
        var floor = this.GetFloorByFloor(this.m_SafeLocation.Y);
        if (floor)
            return floor.GetStep(this.m_SafeLocation.X);
        return;
    };
    Gamemap.prototype.BreakLine = function (floor) {
        var tailFloor = this.TailFLoor;
        if (floor < tailFloor.FloorNum) {
            return;
        }
        var breakFloor = this.GetFloorByFloor(floor);
        breakFloor.active = false;
        for (var countFloor = tailFloor.FloorNum; countFloor <= floor; ++countFloor) {
            var targetFloor = this.GetFloorByFloor(countFloor);
            targetFloor.Break();
        }
    };
    Gamemap.prototype.GetTaileFloor = function () {
        return;
    };
    Gamemap.prototype.Update = function () {
    };
    //设置安全位置
    Gamemap.prototype.SetSafePS = function (location) {
        this.m_SafeLocation = location;
        if (location.Y < this.TailFLoor.FloorNum || location.Y > this.HeadFloor.FloorNum) {
            return;
        }
        this.ResetItem(location.Y);
    };
    //从某一层开始一层层重新摆放道具
    Gamemap.prototype.ResetItem = function (floor) {
        this.m_CurLineBarriers = new Array();
        this.m_CurLineRewards = new Array();
        for (var loopFloor = floor; loopFloor <= this.HeadFloor.FloorNum; ++loopFloor) {
            var floorLine = this.GetFloorByFloor(loopFloor);
            floorLine.LayOutDirty = false;
            floorLine.SetLine(floorLine.FloorNum, this.CountNextFloorDirSwith());
            this.PutItemInLine(loopFloor);
        }
    };
    /**
     * 根据层数获取某层
     * @param {number} floor
     */
    Gamemap.prototype.GetFloorByFloor = function (floor) {
        var tailFloor = this.TailFLoor;
        if (floor < tailFloor.FloorNum || floor > this.HeadFloor.FloorNum) {
            return null;
        }
        var floorID = (floor - tailFloor.FloorNum + this.m_TailFLoorIdx) % this.m_MountLines.length;
        return this.m_MountLines[floorID];
    };
    /**
     * 循环设置层台阶
     * @param floor 层
     * @param Owner
     * @param callBack 循环执行回调
     */
    Gamemap.prototype.LoopDoFloorStep = function (floor, Owner, callBack) {
        if (floor < this.TailFLoor.FloorNum || floor > this.HeadFloor.FloorNum) {
            return;
        }
        var floorLine = this.GetFloorByFloor(floor);
        for (var idx = 0; idx < floorLine.Length; ++idx) {
            var step = floorLine.GetStep(idx);
            callBack.call(Owner, step);
        }
    };
    /**
     * 摆放物品
     * @param {number} floor 物品列表
     */
    Gamemap.prototype.PutItemInLine = function (floor) {
        var safeCol;
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
        var safeIdxColl = this.CountRoadInfo(floor);
        //出生点不放道具
        if (floor < 1 || floor == this.m_SafeLocation.Y) {
            return;
        }
        //获取该行要摆放的物品
        this.TakeItemList(floor);
        //把需要放道具的格子放入随机池
        var curFloor = this.GetFloorByFloor(floor);
        var randomPool = new Array();
        //把安全的格子暂时移出来
        var safeStepList = new Array();
        for (var stepIdx = 0; stepIdx < curFloor.Length; ++stepIdx) {
            var getStep = curFloor.GetStep(stepIdx);
            if (safeIdxColl[stepIdx] == undefined) {
                randomPool.push(getStep);
            }
            else {
                safeStepList.push(getStep);
            }
        }
        console.log(safeStepList);
        //放陷阱
        var barriersList = this.m_CurLineBarriers;
        this.OrginizePutItem(barriersList, randomPool, true);
        //摆放道具
        for (var safeStepIdx = 0; safeStepIdx < safeStepList.length; ++safeStepIdx) {
            randomPool.push(safeStepList[safeStepIdx]);
        }
        var rewardList = this.CurLineRewards;
        this.OrginizePutItem(rewardList, randomPool);
    };
    /**
     * 摆放物品
     * @param {Array<LineItemInfo>} itemList 物品列表
     * @param {Array<Step>} randomPool 台阶集合
     * @param {boolean} isDeadRoad 是否是死路
     */
    Gamemap.prototype.OrginizePutItem = function (itemList, randomPool, isDeadRoad) {
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
     * 放道具前算通路情况
     * @param {number} floor
     */
    Gamemap.prototype.CountRoadInfo = function (floor) {
        var safeList = [];
        var safeMap = {};
        var stepNeedRandomList = [];
        var stepNodeCount = [];
        var thisFloor = this.GetFloorByFloor(floor);
        var roadNum = 0;
        var lastFloor = this.GetFloorByFloor(floor - 1);
        var safeIdx = "";
        if (floor == this.m_SafeLocation.Y) {
            this._ResetStepInfo(thisFloor);
            var safeStep = thisFloor.GetStep(this.m_SafeLocation.X);
            safeStep.IsDeadRoad = false;
            safeMap[this.m_SafeLocation.X] = 1;
        }
        else {
            for (var stepIdx = 0; stepIdx < lastFloor.Length; ++stepIdx) {
                var step = lastFloor.GetStep(stepIdx);
                if (step.IsDeadRoad)
                    continue;
                var leftStep = step.LeftParent;
                var rightStep = step.RightParent;
                var leftIdx = leftStep ? leftStep.Idx : -1;
                var righttIdx = rightStep ? rightStep.Idx : -1;
                if (leftIdx > -1) {
                    stepNodeCount[leftIdx] = stepNodeCount[leftIdx] ? stepNodeCount[leftIdx] : 0;
                    stepNodeCount[leftIdx] += 1;
                }
                if (righttIdx > -1) {
                    stepNodeCount[righttIdx] = stepNodeCount[righttIdx] ? stepNodeCount[righttIdx] : 0;
                    stepNodeCount[righttIdx] += 1;
                }
                if (righttIdx > -1 && leftIdx > -1) {
                    stepNeedRandomList.push([righttIdx, leftIdx]);
                }
                else {
                    var safeStepIdx = leftIdx > 0 ? leftIdx : righttIdx;
                    if (safeStepIdx < 0)
                        continue;
                    safeMap[safeStepIdx] = 1;
                    safeIdx += safeStepIdx;
                }
            }
            for (var countIdx = 0; countIdx < stepNeedRandomList.length; ++countIdx) {
                var info = stepNeedRandomList[countIdx];
                var leftIdx = info[0];
                var rightIdx = info[1];
                if (!safeMap[leftIdx] && !safeMap[rightIdx]) {
                    var rand = Math.random();
                    if (rand > 0.5) {
                        safeMap[leftIdx] = 1;
                        safeIdx += leftIdx;
                    }
                    else {
                        safeMap[rightIdx] = 1;
                        safeIdx += rightIdx;
                    }
                }
            }
            for (var countStepNode = 0; countStepNode < thisFloor.Length; ++countStepNode) {
                var stepnum = stepNodeCount[countStepNode];
                stepnum = stepnum ? stepnum : 0;
                if (stepnum < 1) {
                    var step = lastFloor.GetStep(countStepNode);
                    step.IsDeadRoad = true;
                }
            }
            if (safeIdx == "")
                console.log("Error");
        }
        return safeMap;
    };
    Gamemap.prototype._ResetStepInfo = function (thisFloor) {
        if (!thisFloor) {
            return;
        }
        for (var logicIdx = 0; logicIdx < thisFloor.Length; ++logicIdx) {
            var step = thisFloor.GetStep(logicIdx);
            step.IsDeadRoad = true;
        }
    };
    /**
     * 获取某道具信息
     * @param {number}floor
     */
    Gamemap.prototype.TakeItemList = function (floor) {
        var line = this.GetFloorByFloor(floor);
        var itemList = new Array(line.Length);
        var lineRewards = this.m_ItemLayout.TakeLineReward(floor);
        this.m_CurLineRewards = this.m_CurLineRewards.concat(lineRewards);
        if (this.m_SafeLocation.Y > floor || floor > this.m_SafeLocation.Y + 1) {
            var lineBarriers = this.m_ItemLayout.TakeLineDifficulty(floor);
            this.m_CurLineBarriers = this.m_CurLineBarriers.concat(lineBarriers);
        }
        else {
            if (this.m_CurLineBarriers.length > 0)
                this.m_CurLineBarriers = new Array();
        }
    };
    //将层向上叠
    Gamemap.prototype.PushFLoor = function (dir) {
        if (dir === void 0) { dir = 0; }
        var preHead = this.HeadFloor;
        this.m_HeadFloorIdx = (this.m_HeadFloorIdx + 1) % this.MountLines.length;
        this.m_TailFLoorIdx = (this.m_TailFLoorIdx + 1) % this.MountLines.length;
        var Headfloor = preHead.FloorNum + 1;
        this.m_rightSwitchCount += dir;
        this.HeadFloor.SetLine(Headfloor, this.CountNextFloorDirSwith());
        preHead.SetNextFloor(this.HeadFloor);
        this.PutItemInLine(Headfloor);
        return true;
    };
    Gamemap.prototype.AddSwitch = function (dir) {
        if (dir === void 0) { dir = 0; }
        if (dir > 0.01)
            this.m_rightSwitchCount += 1;
        else if (dir < -0.01)
            this.m_rightSwitchCount -= 1;
    };
    return Gamemap;
}(Laya.Node));
exports.default = Gamemap;
var StepInfo = /** @class */ (function () {
    function StepInfo() {
    }
    return StepInfo;
}());
},{"./GameItem":21,"./MountLine":26}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameModule;
(function (GameModule) {
    var Event = /** @class */ (function () {
        function Event() {
        }
        Event.OnCharacterItemChange = "OnCharacterItemChange";
        Event.OnTimePause = "OnTimePause";
        Event.OnTimeContinue = "OnTimeContinue";
        return Event;
    }());
    GameModule.Event = Event;
    GameModule.HSpace = 2;
    GameModule.VSpace = 1.5;
    GameModule.DSpace = 0.75;
})(GameModule = exports.GameModule || (exports.GameModule = {}));
},{}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Step_1 = require("./Step");
var GameModule_1 = require("./GameModule");
var HSpace;
var VSpace;
var DSpace;
/**作者:Mo
*场景内对象
*/
//管理一整行
var MountLine = /** @class */ (function (_super) {
    __extends(MountLine, _super);
    function MountLine(lineIdx, Columb, floor) {
        if (floor === void 0) { floor = 0; }
        var _this = this;
        HSpace = GameModule_1.GameModule.HSpace; //hSpace;
        VSpace = GameModule_1.GameModule.VSpace;
        DSpace = GameModule_1.GameModule.DSpace;
        var columns = Columb;
        _this = _super.call(this) || this;
        _this.m_RightSwitch = 0;
        _this.LineIdx = lineIdx;
        _this.FloorNum = floor;
        _this.m_StepList = [];
        var startX = 0;
        for (var StartIdx = 0; StartIdx < columns; ++StartIdx) {
            var newStep = new Step_1.default(_this, StartIdx);
            _this.addChild(newStep);
            _this.m_StepList[StartIdx] = newStep;
            var stepVector = newStep.Position;
            stepVector.x = startX;
            startX += HSpace;
            newStep.transform.position = stepVector;
        }
        _this.transform.position = new Laya.Vector3();
        return _this;
    }
    Object.defineProperty(MountLine.prototype, "rightSwitch", {
        get: function () {
            return this.m_RightSwitch;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MountLine.prototype, "Position", {
        get: function () {
            return this.transform.position.clone();
        },
        set: function (newPS) {
            this.transform.position = newPS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MountLine.prototype, "Length", {
        get: function () {
            return this.m_StepList.length;
        },
        enumerable: true,
        configurable: true
    });
    //设获取显示出来的第几个平台
    MountLine.prototype.GetStep = function (idx) {
        if (idx < 0 || idx >= this.m_StepList.length)
            return null;
        return this.m_StepList[idx];
    };
    //设置每层
    MountLine.prototype.SetLine = function (floor, rightSwitch) {
        this.m_RightSwitch = rightSwitch;
        this.LayOutDirty = false;
        this.active = true;
        this.FloorNum = floor;
        var newPS = this.transform.position;
        newPS.y = VSpace * floor;
        newPS.z = -DSpace * floor;
        this.transform.position = newPS;
        for (var startIdx = 0; startIdx < this.m_StepList.length; ++startIdx) {
            var thiStep = this.GetStep(startIdx);
            thiStep.ResetStep();
        }
    };
    //判断是否收缩的那层
    MountLine.prototype.JugIsOdd = function () {
        return this.FloorNum % 2 != 0;
    };
    //将每个节点链接到下一层
    MountLine.prototype.SetNextFloor = function (lastFloor) {
        var dir = lastFloor.rightSwitch - this.rightSwitch;
        var switchDir = 0;
        if (dir * dir > 0.01) {
            switchDir = dir;
            /*
            if (dir > 0)
                switchDir = 1;
            else
                switchDir = -1;
                */
        }
        else {
            if (this.JugIsOdd()) {
                switchDir = -1;
            }
            else {
                switchDir = 1;
            }
        }
        var position = lastFloor.Position;
        position.x = this.Position.x + switchDir * HSpace / 2;
        lastFloor.Position = position;
        //判断是否有两头端点
        for (var startIdx = 0; startIdx < this.m_StepList.length; ++startIdx) {
            var leftParent = null;
            var rightParent = null;
            var leftParentIdx = startIdx;
            if (switchDir > 0) {
                leftParentIdx = leftParentIdx - switchDir;
            }
            else {
                leftParentIdx = leftParentIdx;
            }
            leftParent = lastFloor.GetStep(leftParentIdx);
            rightParent = lastFloor.GetStep(leftParentIdx + 1);
            var thiStep = this.GetStep(startIdx);
            thiStep.LeftParent = leftParent;
            leftParent && (leftParent.RightChild = thiStep);
            thiStep.RightParent = rightParent;
            rightParent && (rightParent.LeftChild = thiStep);
        }
    };
    //敲碎一层
    MountLine.prototype.Break = function () {
        this.active = false;
    };
    MountLine.prototype.Continue = function () {
    };
    MountLine.prototype.Pause = function () {
    };
    return MountLine;
}(Laya.Sprite3D));
exports.default = MountLine;
},{"./GameModule":23,"./Step":29}],27:[function(require,module,exports){
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
    Player.prototype.Pause = function () {
        this.clearTimer(this, this._Update);
        this.m_Animator.speed = 0;
    };
    Player.prototype.Continue = function () {
        this.frameLoop(1, this, this._Update);
        this.m_Animator.speed = 1;
    };
    Player.prototype.InitBUffModel = function (playerModel) {
        this._PlayerModel = playerModel;
        this.m_HeadNode = new Laya.Sprite3D();
        var HeadNode = playerModel.getChildByName("head");
        this.addChild(this.m_HeadNode);
        this.m_HeadNode.transform.position = HeadNode.transform.position.clone();
        this.m_HeadNode.transform.rotation = HeadNode.transform.rotation.clone();
        this.m_HeadNode.transform.scale = HeadNode.transform.scale.clone();
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
                this.m_HeadNode.addChild(buffModel);
                break;
            default:
                this.m_Animator.linkSprite3DToAvatarNode(nodeName, buffModel);
                break;
        }
        buffModel.active = false;
        this.m_BuffModel[itemType] = buffModel;
    };
    Player.prototype.FaceModelTo = function (rotation) {
        this._PlayerModel.transform.rotation = rotation;
    };
    Player.prototype.ModelRotateEular = function (vector) {
        this._PlayerModel.transform.rotationEuler = vector;
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
    /**
     * 添加BUFF
     * @param buff
     */
    Player.prototype.AddBuff = function (buff) {
        var slot = buff.Slot;
        if (this.BuffArr[slot]) {
            this.CompleteBuff(slot);
        }
        var buffModel = this.m_BuffModel[buff.Type];
        if (buffModel) {
            buffModel.active = true;
        }
        this.BuffArr[slot] = buff;
        buff.Start();
        return true;
    };
    /**
     * 结束BUFF
     */
    Player.prototype.CompleteBuff = function (slot) {
        var buff = this.BuffArr[slot];
        var buffModel = this.m_BuffModel[buff.Type];
        if (buffModel)
            buffModel.active = false;
        this.BuffArr[slot] = null;
        if (buff == null || buff == undefined) {
            return;
        }
        buff.Removed();
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
        this.transform.translate(vector, false);
        Laya.Vector3.add(this._LogicPosition, vector, this._LogicPosition);
    };
    /**
     * 添加玩家控制器
     * @param newCtrler 新玩家控制器
     */
    Player.prototype.AddCtrler = function (newCtrler) {
        if (this._Ctrler)
            this._Ctrler.OnComplete();
        var ctrler = this._Ctrler;
        this._Ctrler = newCtrler;
        newCtrler.NextCtrl = ctrler;
        newCtrler.SetPlayer(this);
        if (this._Ctrler)
            this._Ctrler.OnStart();
    };
    /**
     * 移交控制器
     */
    Player.prototype.PopCtrler = function () {
        if (this._Ctrler)
            this._Ctrler.OnComplete();
        this._Ctrler = this._Ctrler.NextCtrl;
        if (this._Ctrler)
            this._Ctrler.OnStart();
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
},{"../Utility/Path":38,"./../FrameWork/MessageCenter":10,"./../controler/APP":40,"./../controler/GameAPP":41,"./../controler/GameControler":42,"./Character":19,"./GameItem":21,"./PlayerCtrler":28}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APP_1 = require("./../controler/APP");
var GameControler_1 = require("./../controler/GameControler");
var GameModule_1 = require("./GameModule");
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
                var lastTime = GameControler_1.default.GameControler.PlayerMoveTime - (this.Time - APP_1.default.TimeManager.GameTime);
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
        PlayerNormCtrler.prototype.OnStart = function () {
            this.Time = APP_1.default.TimeManager.GameTime + GameControler_1.default.GameControler.PlayerMoveTime;
            this.IsFalling = true;
        };
        PlayerNormCtrler.prototype.OnComplete = function () {
        };
        PlayerNormCtrler.prototype.StartMove = function () {
            this.Time = APP_1.default.TimeManager.GameTime + GameControler_1.default.GameControler.PlayerMoveTime;
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
            this.player.FaceModelTo(rotation);
        };
        PlayerNormCtrler.prototype._Update = function () {
            if (this.Time > 0) {
                if (this.Time <= APP_1.default.TimeManager.GameTime) {
                    this.Time = -1;
                    this.player.SetStep(this.player.CurStep);
                    this.IsFalling = true;
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
            player.Translate(new Laya.Vector3(0, GameModule_1.GameModule.VSpace, 0));
            player.transform.rotationEuler = new Laya.Vector3(0, 180, 0);
            player.ModelRotateEular(new Laya.Vector3(0, 180, 0));
        };
        PlayerFly.prototype._Update = function () {
            if (this.player == null) {
                return;
            }
            //var vector = new Laya.Vector3(0,Controler.GameControler.StepLength,-1*Controler.GameControler.StepDistance/2);
            // Laya.Vector3.scale(vector,this.Speed,vector);
            var vector = new Laya.Vector3(0, GameModule_1.GameModule.VSpace, -GameModule_1.GameModule.DSpace);
            Laya.Vector3.scale(vector, 0.1, vector);
            this.player.Translate(vector);
        };
        PlayerFly.prototype.OnComplete = function () { };
        PlayerFly.prototype.OnStart = function () {
        };
        return PlayerFly;
    }(BasePlayerCtrler));
    PlayerControler.PlayerFly = PlayerFly;
})(PlayerControler = exports.PlayerControler || (exports.PlayerControler = {}));
},{"./../controler/APP":40,"./../controler/GameControler":42,"./GameModule":23}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameItem_1 = require("./GameItem");
var GameStruct_1 = require("./GameStruct");
var Path_1 = require("./../Utility/Path");
//步
var Step = /** @class */ (function (_super) {
    __extends(Step, _super);
    function Step(floor, idx) {
        var _this = 
        //super(new Laya.BoxMesh(1,1,1) );
        _super.call(this) || this;
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
            return new GameStruct_1.GameStruct.MLocation(this.Idx, this.Floor.FloorNum);
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
        if (newPs === void 0) { newPs = null; }
        if (newPs)
            this.Position = newPs;
        this.StepItem.PutItem(GameItem_1.Item.ItemType.None);
        this.LeftParent = null;
        this.RightParent = null;
        this.LeftChild = null;
        this.RightChild = null;
        this._IsDeadRoad = false;
        this.RoadNum = 0;
        this.active = true;
    };
    //模型个数
    Step.stepModelNum = 3;
    return Step;
}(Laya.Sprite3D));
exports.default = Step;
},{"./../Utility/Path":38,"./GameItem":21,"./GameStruct":24}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadScene_1 = require("./Scene/LoadScene");
var APP_1 = require("./controler/APP");
var GameConfig_1 = require("./GameConfig");
var Game = /** @class */ (function () {
    function Game() {
        var ss = APP_1.default;
        Laya3D.init(750, 1334);
        GameConfig_1.default.init();
        //Laya.stage.scaleMode = Laya.Stage.SCALE_FULL;
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        Laya.stage.alignV = Laya.Stage.ALIGN_BOTTOM;
        //开启统计信息
        Laya.Stat.hide();
        var resCol = [{ url: "ui/Resource/localcomp.atlas", type: Laya.Loader.ATLAS }, { url: "ui/Resource/LoadUI.json", type: Laya.Loader.JSON }];
        Laya.loader.load(resCol, Laya.Handler.create(this, this.on3DLoaded));
    }
    Game.prototype.on3DLoaded = function () {
        var arr3D = ["ui/Resource/zhuyemian_qiu1_idle/zhuyemian_qiu1_idle.lh"];
        Laya.loader.create(arr3D, Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, null, null, false));
    };
    Game.prototype.onLoaded = function () {
        APP_1.default.Init();
        var sceneMgr = APP_1.default.SceneManager;
        sceneMgr.ChangeScene(new LoadScene_1.default());
        Laya.timer.frameLoop(1, this, this.Update);
    };
    Game.prototype.Update = function () {
        APP_1.default.FrameWork.Update();
    };
    return Game;
}());
var GM = new Game();
},{"./GameConfig":14,"./Scene/LoadScene":35,"./controler/APP":40}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharacterMamager_1 = require("../GameManager/CharacterMamager");
var CharacterUIScene = /** @class */ (function (_super) {
    __extends(CharacterUIScene, _super);
    function CharacterUIScene(cntSelectIndex, moveCallBack) {
        var _this = _super.call(this) || this;
        _this.arrayDis = [];
        _this.cntNum = 5;
        _this.startao = 90;
        _this.perao = 360 / _this.cntNum;
        _this.r = 0.04;
        _this.startY = -0.02;
        _this.cntSelectIndex = 0;
        _this.cntstartao = 90;
        _this.moveStarao = 2;
        _this.nextAo = -1;
        _this.initScalNum = 0.018;
        _this.cntSelectIndex = cntSelectIndex;
        _this.moveCallBack = moveCallBack;
        _this.ambientColor = new Laya.Vector3(1, 1, 1);
        _this.camera = _this.addChild(new Laya.Camera(0, 0.1, 0.3));
        _this.camera.transform.translate(new Laya.Vector3(0, 0, 0.2));
        _this.camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        // var model: Laya.Sprite3D = Laya.loader.getRes(path.GetLH("c001_child_01"));
        // var model1: Laya.Sprite3D = Laya.loader.getRes(path.GetLH("L01_spr_barrier_04"));
        for (var i = 0; i < _this.cntNum; i++) {
            var characterModel = CharacterMamager_1.default.Mgr.GetCharacterModel(i);
            var audt = characterModel;
            audt.transform.localScale = new Laya.Vector3(_this.initScalNum, _this.initScalNum, _this.initScalNum);
            _this.addChild(audt);
            _this.arrayDis.push(audt);
            // var ao = (this.startao + i * this.perao) % 360
            // var x = this.r * Math.cos(ao * 3.14 / 180);
            // var y = this.startY + this.r * Math.sin(ao * 3.14 / 180);
            // audt.transform.position = new Laya.Vector3(x, y, 0);
        }
        _this.cntSelectIndex = (_this.cntSelectIndex + 5) % 5;
        _this.nextAo = (_this.startao + (_this.cntNum - _this.cntSelectIndex) * _this.perao + 360) % 360;
        _this.updateSelect();
        return _this;
    }
    CharacterUIScene.prototype.calCntStartao = function () {
        this.cntSelectIndex = (this.cntSelectIndex + 5) % 5;
        this.nextAo = (this.startao + (this.cntNum - this.cntSelectIndex) * this.perao + 360) % 360;
        if ((this.nextAo - this.cntstartao + 360) % 360 >= 180) {
            this.moveStarao = -2;
        }
        else {
            this.moveStarao = 2;
        }
        Laya.timer.loop(0.05, this, this.timeAoChange);
    };
    CharacterUIScene.prototype.timeAoChange = function () {
        if (this.cntstartao == this.nextAo) {
            this.cntstartao = this.nextAo;
            this.nextAo = -1;
            this.moveCallBack && this.moveCallBack(1);
            Laya.timer.clear(this, this.timeAoChange);
            return;
        }
        var lascntAo = this.cntstartao;
        this.cntstartao += this.moveStarao;
        if (this.cntstartao < 0 || this.cntstartao == 360) {
            this.cntstartao = (this.cntstartao + 360) % 360;
            lascntAo = this.cntstartao - this.moveStarao;
        }
        else {
            this.cntstartao = (this.cntstartao + 360) % 360;
        }
        if ((lascntAo >= this.nextAo && this.cntstartao <= this.nextAo) || (lascntAo <= this.nextAo && this.cntstartao >= this.nextAo)) {
            this.cntstartao = this.nextAo;
            this.nextAo = -1;
        }
        if (this.nextAo == -1) {
            this.moveCallBack && this.moveCallBack(1);
            Laya.timer.clear(this, this.timeAoChange);
        }
        this.updateSelect();
    };
    CharacterUIScene.prototype.updateSelect = function () {
        for (var i = 0; i < this.arrayDis.length; i++) {
            var ao = (this.cntstartao + i * this.perao) % 360;
            var x = this.r * Math.cos(ao * 3.14 / 180);
            var y = this.startY + this.r * Math.sin(ao * 3.14 / 180);
            this.arrayDis[i].transform.position = new Laya.Vector3(x, y, 0);
            var scale = 0.2 * y;
            if (scale >= 0) {
                this.arrayDis[i].transform.localScale = new Laya.Vector3(this.initScalNum + scale, this.initScalNum + scale, this.initScalNum + scale);
            }
            else {
                this.arrayDis[i].transform.localScale = new Laya.Vector3(this.initScalNum, this.initScalNum, this.initScalNum);
            }
        }
        this.moveCallBack && this.moveCallBack();
    };
    CharacterUIScene.prototype.clearRoateTimer = function () {
        Laya.timer.clear(this, this.timeAoChange);
    };
    CharacterUIScene.prototype.lastRole = function () {
        this.cntSelectIndex--;
        this.calCntStartao();
    };
    CharacterUIScene.prototype.nextRole = function () {
        this.cntSelectIndex++;
        this.calCntStartao();
    };
    CharacterUIScene.prototype.updateSelectIndex = function (selectIndex) {
        if (selectIndex == this.cntSelectIndex) {
            return;
        }
        this.cntSelectIndex = selectIndex;
        this.calCntStartao();
    };
    CharacterUIScene.prototype.onEnable = function () {
    };
    CharacterUIScene.prototype.onDisable = function () {
    };
    return CharacterUIScene;
}(Laya.Scene3D));
exports.default = CharacterUIScene;
},{"../GameManager/CharacterMamager":15}],32:[function(require,module,exports){
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
},{"./../Utility/Path":38,"./Scene":36,"./ScenePlay/GameScenePlay":37}],33:[function(require,module,exports){
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
},{"./../Game/GameItem":21,"./../Scene/Scene":36,"./GameDirector":32}],34:[function(require,module,exports){
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
},{"../controler/APP":40,"./../Scene/Scene":36,"./../Utility/Path":38,"./../ui/EnterGameUI":50}],35:[function(require,module,exports){
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
            Path_1.path.GetDepathUIJS("toolItem"),
            Path_1.path.GetDepathUIJS("Character"),
            Path_1.path.GetDepathUIJS("PlayerList"),
            Path_1.path.GetDepathUIJS("BG"),
            Path_1.path.GetAtlPath("entersceneui"),
            Path_1.path.GetAtlPath("entersceneui/res1"),
            Path_1.path.GetAtlPath("entersceneui/res2"),
            Path_1.path.GetAtlPath("entersceneui/gk"),
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
},{"./../Scene/Scene":36,"./../Utility/Path":38,"./../controler/APP":40,"./../ui/BG":46,"./../ui/UnDownload/LoadingUI":56,"./GuiderManager":34}],36:[function(require,module,exports){
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
                    return APP_1.default.TimeManager.GameTime - this._StartGameTime - this._TimeUpCount;
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
            this._StartGameTime = APP_1.default.TimeManager.GameTime;
        };
        BaseDirector.prototype.TimeUp = function () {
            if (this._TimeUpClock <= 0) {
                //APP.MessageCenter.Trigger(GameEvent.GameTimeUp);
                this._TimeUpClock = APP_1.default.TimeManager.GameTime;
            }
        };
        BaseDirector.prototype.Update = function () {
            if (this._TimeUpClock <= 0) {
                _super.prototype.Update.call(this);
            }
        };
        BaseDirector.prototype.ContinueTime = function () {
            //APP.MessageCenter.Trigger(GameEvent.GameContinue);
            this._TimeUpCount += APP_1.default.TimeManager.GameTime - this._TimeUpClock;
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
},{"../FrameWork/FrameWork":9,"./../Base/FSM":7,"./../FrameWork/MessageCenter":10,"./../controler/APP":40}],37:[function(require,module,exports){
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
var GameItem_1 = require("./../../Game/GameItem");
var APP_1 = require("./../../controler/APP");
var GameControler_1 = require("./../../controler/GameControler");
var GameAgent_1 = require("./../../Agent/GameAgent");
var GameAPP_1 = require("../../controler/GameAPP");
var WechatOpen_1 = require("../../platform/WechatOpen");
var GameMap_1 = require("../../Game/GameMap");
var GameModule_1 = require("../../Game/GameModule");
var ItemType = GameItem_1.Item.ItemType;
var FallTime = 2;
var lineNum = 12;
var column = 12;
//游戏导演
var GameScenePlay = /** @class */ (function (_super) {
    __extends(GameScenePlay, _super);
    function GameScenePlay() {
        var _this = _super.call(this) || this;
        _this.Camera = null;
        _this.Player = null;
        _this.InputCtrl = null;
        _this.CurLineBarriers = null;
        _this._CountFloorTime = 0;
        _this.m_BootomFloor = 0;
        _this._StartPosition = new Laya.Vector3();
        _this._PanelUI = null;
        _this._CurBG = APP_1.default.SceneManager.BG;
        _this.FreshBGCount = 0;
        _this.m_GameMap = new GameMap_1.default(lineNum, column);
        return _this;
    }
    Object.defineProperty(GameScenePlay.prototype, "gameMap", {
        get: function () {
            return this.m_GameMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameScenePlay.prototype, "ColumsNum", {
        get: function () {
            return column;
        },
        enumerable: true,
        configurable: true
    });
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
    Object.defineProperty(GameScenePlay.prototype, "PlayerFloor", {
        get: function () {
            var floor = this._StartPosition.z - this.Player.LogicPosition.z;
            floor = floor / GameModule_1.GameModule.DSpace;
            floor = Math.round(floor);
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
    Object.defineProperty(GameScenePlay.prototype, "GameGold", {
        get: function () {
            return this.m_GoldNum;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameScenePlay.prototype, "CountFloorTime", {
        get: function () {
            var between = this.Distance - this.m_BootomFloor;
            between = between > 3 ? 3 : between;
            return this._CountFloorTime - between / 3 * FallTime;
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
        this.m_GoldNum += num;
        this.AddLogicGold(num);
    };
    GameScenePlay.prototype.AddGoldUnLogicGold = function (num) {
        this.m_GoldNum += num;
    };
    GameScenePlay.prototype.AddLogicGold = function (num) {
        this._LogicGoldNum += num;
        this.PanelUI.Gold = this._LogicGoldNum;
        WechatOpen_1.WechatOpen.getInstances().drawpass(this._LogicGoldNum + GameAgent_1.GameAgent.Agent.CurScore);
    };
    //设置安全位置
    GameScenePlay.prototype.SetSafePS = function (location) {
        this.m_GameMap.SetSafePS(location);
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
        var nextFloorDir = isRight ? 1 : -1;
        this.m_GameMap.PushFLoor(nextFloorDir);
    };
    /**
     * 根据层数获取某层
     * @param {number} floor
     */
    GameScenePlay.prototype.GetFloorByFloor = function (floor) {
        return this.m_GameMap.GetFloorByFloor(floor);
    };
    /**
     * 通过坐标获取台阶
     * @param location 索引,层数
     */
    GameScenePlay.prototype.GetStepByLocation = function (location, rightSwitchNum) {
        if (rightSwitchNum === void 0) { rightSwitchNum = 0; }
        if (rightSwitchNum * rightSwitchNum > 0.001) {
            var floor = this.GetFloorByFloor(location.Y);
            var getStep = floor.GetStep(location.X + floor.rightSwitch - rightSwitchNum);
        }
        else
            var getStep = this.GetFloorByFloor(location.Y).GetStep(location.X);
        return getStep;
    };
    //创建相关放这 这里重新开始不会走
    GameScenePlay.prototype.Start = function () {
        this.Camera = new GameCamera_1.default();
        this.Camera.transform.localRotationEuler = new Laya.Vector3(-30, 0, 0);
        APP_1.default.SceneManager.CurScene.PutObj(this.Camera);
        //创建UI
        //创建玩家
        var player = new Player_1.default();
        this.Player = player;
        var gameAgent = GameAgent_1.GameAgent.Agent;
        var playerModel = GameAPP_1.default.CharacterMgr.GetCharacterModel(gameAgent.CurCharacterID);
        player.SetPlayerModel(playerModel);
        APP_1.default.SceneManager.CurScene.PutObj(this.Player);
        APP_1.default.SceneManager.CurScene.PutObj(this.m_GameMap);
        //准备玩家死亡事件
        APP_1.default.MessageManager.Regist(MessageCenter_1.MessageMD.GameEvent.PlayerDeath, this.Death, this);
        this.StartGame();
    };
    //进入游戏的设置放这里 重新开始走这里
    GameScenePlay.prototype.StartGame = function () {
        APP_1.default.SceneManager.CurScene.SceneObj.ambientColor = new Laya.Vector3(1, 1, 1);
        GameAgent_1.GameAgent.Agent.ResetGameItem();
        GameAgent_1.GameAgent.Agent.ResetSkillItem();
        this._SafeLocation = new GameStruct_1.GameStruct.MLocation(0, 0);
        //创建输入控制器
        this.InputCtrl = new Input_1.Input.NormGameInput(this);
        this.Player.Reset();
        this.m_GameMap.Init(3);
        this.Player.SetStep(this.m_GameMap.GetSafeStep());
        this._StartPosition = this.Player.Position;
        this.Camera.Reset(new Laya.Vector3(), new Laya.Vector3(0, GameControler_1.default.GameControler.StepLength * 10.5, GameControler_1.default.GameControler.StepLength * 9), this.Player);
        this.m_GoldNum = 0;
        this._LogicGoldNum = 0;
        this.PanelUI = APP_1.default.UIManager.Show(GameUI_1.default);
        this.PanelUI.RegistClickPlayerItem(this, this.UsePlayerItem);
        this.PanelUI.RegistClickSkillItem(this, this.UseSkillItem);
        this.PanelUI.Gold = 0;
        this._CountFloorTime = this.GameTime + 4;
        this.m_BootomFloor = 0;
        this._GameUpdate = this._StartCount;
        WechatOpen_1.WechatOpen.getInstances().drawpass(0);
    };
    GameScenePlay.prototype.Update = function () {
        if (this._GameUpdate != null) {
            this._GameUpdate();
        }
    };
    /**
     * 循环设置层台阶
     * @param floor 层
     * @param Owner
     * @param callBack 循环执行回调
     */
    GameScenePlay.prototype.LoopDoFloorStep = function (floor, Owner, callBack) {
        this.m_GameMap.LoopDoFloorStep(floor, Owner, callBack);
    };
    //正常运行时的每帧逻辑
    GameScenePlay.prototype._RunGameUpdate = function () {
        var dist = this.PlayerFloor;
        this.PanelUI.Distance = this.Distance;
        if (this.FreshBGCount > 10) {
            this._CurBG.UpdatePage(dist);
            this.FreshBGCount = 0;
        }
        ++this.FreshBGCount;
        var dDistance = this.m_GameMap.TailFLoor.FloorNum;
        var distance = this.PlayerFloor - dDistance + 3;
        if (distance > 3) {
            this._PushFLoor();
        }
        //if (this._CountFloorTime < APP.TimeManager.GameTime) {
        if (this.CountFloorTime < APP_1.default.TimeManager.GameTime) {
            this._CountFloorTime = APP_1.default.TimeManager.GameTime + FallTime;
            //this._DestroyLine(this.m_BootomFloor);
            this.m_BootomFloor += 1;
        }
        this.InputCtrl.Update();
    };
    //开始倒计时期间的每帧逻辑
    GameScenePlay.prototype._StartCount = function () {
        var time = "";
        var countTime = this._CountFloorTime - APP_1.default.TimeManager.GameTime;
        if (countTime > 0.9)
            time += Math.floor(countTime);
        else {
            this.PanelUI.GamePanel = true;
            this._GameUpdate = this._RunGameUpdate;
            this._CountFloorTime = this.GameTime + FallTime;
            GameAgent_1.GameAgent.Agent.ResetGameItem();
            GameAgent_1.GameAgent.Agent.ResetSkillItem();
        }
        this.PanelUI.SetCountTime(time);
    };
    //将层向上叠
    GameScenePlay.prototype._PushFLoor = function () {
        this.m_GameMap.PushFLoor();
    };
    /**
     * 塌陷某一层
     * @param {number}floor
     */
    GameScenePlay.prototype._DestroyLine = function (floor) {
        if (this.m_GameMap.GetFloorByFloor(floor)) {
            this.m_GameMap.BreakLine(floor);
            this.Player.TouchGround();
        }
    };
    GameScenePlay.prototype.UseSkillItem = function () {
        if (GameAgent_1.GameAgent.Agent.SkillItemNum < 1)
            return;
        GameAgent_1.GameAgent.Agent.UseSkillItem();
        var characterID = GameAgent_1.GameAgent.Agent.CurCharacterID;
        var ItemID = GameAPP_1.default.CharacterMgr.GetItemID(characterID);
        var ItemType = GameAPP_1.default.ItemMgr.GetItemType(ItemID);
        var newBuff = GameItem_1.Item.ItemBuffFactory(ItemType);
        newBuff.AddToPlayer(this.Player);
    };
    GameScenePlay.prototype.UsePlayerItem = function () {
        if (GameAgent_1.GameAgent.Agent.GameItemNum < 1)
            return;
        GameAgent_1.GameAgent.Agent.UseGameItem();
        var ItemID = GameAgent_1.GameAgent.Agent.CurItem;
        var ItemType = GameAPP_1.default.ItemMgr.GetItemType(ItemID);
        var newBuff = GameItem_1.Item.ItemBuffFactory(ItemType);
        newBuff.AddToPlayer(this.Player);
    };
    GameScenePlay.prototype.OnGameComplete = function () {
        APP_1.default.MessageManager.DesRegist(MessageCenter_1.MessageMD.GameEvent.PlayerDeath, this.Death, this);
        var ui = APP_1.default.UIManager.Show(EndGameUI_1.default);
        GameAgent_1.GameAgent.Agent.AddGold(this.m_GoldNum);
        GameAgent_1.GameAgent.Agent.AddScore(this.m_GoldNum * 10 + this.Distance * 10);
    };
    GameScenePlay.prototype.OnTimePause = function () {
        this.Player.Pause();
    };
    GameScenePlay.prototype.OnCountinue = function () {
        this.Player.Continue();
    };
    return GameScenePlay;
}(Scene_1.Scene.BaseScenePlaye));
exports.default = GameScenePlay;
},{"../../Game/GameMap":22,"../../Game/GameModule":23,"../../controler/GameAPP":41,"../../platform/WechatOpen":43,"./../../Agent/GameAgent":2,"./../../FrameWork/MessageCenter":10,"./../../Game/GameCamera":20,"./../../Game/GameItem":21,"./../../Game/GameStruct":24,"./../../Game/Input":25,"./../../Game/Player":27,"./../../Scene/Scene":36,"./../../controler/APP":40,"./../../controler/GameControler":42,"./../../ui/EndGameUI":49,"./../../ui/GameUI":51}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path;
(function (path) {
    path.IsEditor = true;
    path.version = "?v=5";
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
        return path.UIPath + fileName + ".atlas" + (path.IsEditor ? "" : path.version);
    }
    path.GetAtlPath = GetAtlPath;
    /**
     * 获取UIJson路径
     * @param fileName 文件名
     */
    function GetDepathUIJS(fileName) {
        return path.UIPath + fileName + ".json" + (path.IsEditor ? "" : path.version);
    }
    path.GetDepathUIJS = GetDepathUIJS;
    /**
     * 获取lh文件路径
     * @param fileName 文件名
     */
    function GetLH(fileName) {
        return path.ModelPath + path.SceneAssetPath + fileName + "/Conventional/" + fileName + ".lh" + (path.IsEditor ? "" : path.version);
    }
    path.GetLH = GetLH;
    /**
     * 获取加载Json路径
     * @param fileName 文件名
     */
    function GetJsonPath(fileName) {
        return path.ConfigPath + fileName + ".json" + (path.IsEditor ? "" : path.version);
    }
    path.GetJsonPath = GetJsonPath;
})(path = exports.path || (exports.path = {}));
},{}],39:[function(require,module,exports){
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
},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MessageCenter_1 = require("./../FrameWork/MessageCenter");
var UIManager_1 = require("./../FrameWork/UIManager");
var SceneManager_1 = require("./../FrameWork/SceneManager");
var FrameWork_1 = require("./../FrameWork/FrameWork");
var TimeManager_1 = require("./../FrameWork/TimeManager");
var FrameWork_2 = require("./../FrameWork/FrameWork");
var GameModule_1 = require("../Game/GameModule");
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
        APP.g_Message.Regist(GameModule_1.GameModule.Event.OnTimePause, APP.g_TimeMgr.Pause, APP.g_TimeMgr);
        APP.g_Message.Regist(GameModule_1.GameModule.Event.OnTimeContinue, APP.g_TimeMgr.Continue, APP.g_TimeMgr);
    };
    return APP;
}());
exports.default = APP;
},{"../Game/GameModule":23,"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10,"./../FrameWork/SceneManager":11,"./../FrameWork/TimeManager":12,"./../FrameWork/UIManager":13}],41:[function(require,module,exports){
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
},{"./../GameManager/CharacterMamager":15,"./../GameManager/ItemManager":17}],42:[function(require,module,exports){
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
var GameModule_1 = require("../Game/GameModule");
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
    Object.defineProperty(GameControler.prototype, "PlayerMoveTime", {
        //玩家移动时间
        get: function () {
            if (!this._PlayerMoveTime) {
                this._PlayerMoveTime = 0.2;
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
        return character;
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
    GameControler.prototype.TimePause = function () {
        APP_1.default.MessageManager.Fire(GameModule_1.GameModule.Event.OnTimePause);
    };
    GameControler.prototype.TimeContinue = function () {
        APP_1.default.MessageManager.Fire(GameModule_1.GameModule.Event.OnTimeContinue);
    };
    return GameControler;
}());
},{"../Game/GameModule":23,"./../Agent/PlayerGuestAgent":4,"./../Game/GameStruct":24,"./../Scene/GameScene":33,"./../ui/CharacterUI":48,"./../ui/RankPanelUI":53,"./../ui/SetPanelUI":54,"./APP":40}],43:[function(require,module,exports){
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
},{}],44:[function(require,module,exports){
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
},{"./../FrameWork/MessageCenter":10}],45:[function(require,module,exports){
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
},{"./../controler/APP":40,"./../controler/GameControler":42}],46:[function(require,module,exports){
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
},{"./../Base/BaseFunc":6,"./../Utility/Path":38,"./layaMaxUI":57}],47:[function(require,module,exports){
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
        return _this;
        // this.left = 0;
        // this.right = 0;
        // this.bottom = 0;
        // this.top = 0;
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
},{"./../Base/BaseEnum":5,"./../FrameWork/FrameWork":9,"./../FrameWork/UIManager":13}],48:[function(require,module,exports){
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
var CharacterUIScene_1 = require("../Scene/CharacterUIScene");
var CharacterMamager_1 = require("../GameManager/CharacterMamager");
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
        _this.spriteBgArr = [];
        _this.config = { "img": [
                { key: "bg", textureName: "mainbg.jpg" },
                { key: "characterrole0bg", textureName: "rolebgcircle.png" },
                { key: "characterrole1bg", textureName: "rolebgcircle.png" },
                { key: "characterrole2bg", textureName: "rolebgcircle.png" },
                { key: "characterrole3bg", textureName: "rolebgcircle.png" },
                { key: "characterrole4bg", textureName: "rolebgcircle.png" }
            ],
            "btn": [
                { key: "backBtn", textureName: "back.png" },
                { key: "buyBtn", textureName: "buy.png" },
                { key: "startGame", textureName: "start.png" }
            ]
        };
        _this._UI = new ExtendCharactersUI();
        _this.FixUI(_this._UI);
        _this.GetCharacterList();
        //this.SetList();
        _this.m_CharacterList = [];
        //this.m_GoldDiscribe = this._UI._Gold.text.split("#");
        _this.OnMoneyChange();
        _this._UI._Gold.text = PlayerGuestAgent_1.default.GuestAgent.Money + "";
        _this._UI._Gold.stroke = 2;
        _this._UI._Gold.strokeColor = "0xff0000";
        _this._UI.backBtn.on(Laya.Event.CLICK, _this, _this.BackGameBtn);
        _this._UI._List.visible = false;
        _this.spriteBgArr.push(_this._UI.characterrole0bg);
        _this.spriteBgArr.push(_this._UI.characterrole1bg);
        _this.spriteBgArr.push(_this._UI.characterrole2bg);
        _this.spriteBgArr.push(_this._UI.characterrole3bg);
        _this.spriteBgArr.push(_this._UI.characterrole4bg);
        var len = _this.spriteBgArr.length;
        for (var i = 0; i < len; i++) {
            _this.spriteBgArr[i].name = i + "";
            _this.spriteBgArr[i].on(Laya.Event.CLICK, _this, _this.selectRolePosition);
        }
        _this.cntCharacterId = PlayerGuestAgent_1.default.GuestAgent.CharacterID;
        _this.updateRoleInfo(_this.cntCharacterId);
        _this._UI.startGame.on(Laya.Event.CLICK, _this, _this.startEvent);
        _this._UI.buyBtn.on(Laya.Event.CLICK, _this, _this.OnClickImg);
        _this.updateSelfSceneUI();
        return _this;
    }
    CharacterUI.prototype.updateSelfSceneUI = function () {
        for (var key in this.config) {
            var len = this.config[key].length;
            for (var i = 0; i < len; i++) {
                this._UI[this.config[key][i].key].skin = (PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
            }
        }
    };
    CharacterUI.prototype.startEvent = function () {
        GameControler_1.default.GameControler.SetPlayerID(this.characterUIScene.cntSelectIndex);
        APP_1.default.UIManager.Close(this);
        GameControler_1.default.GameControler.EnterGame();
    };
    CharacterUI.prototype.checkIsLock = function (id) {
        var character = PlayerGuestAgent_1.default.GuestAgent.CharacterList;
        if (character[id]) {
            return true;
        }
        return false;
    };
    CharacterUI.prototype.updateRoleInfo = function (id) {
        if (this.checkIsLock(id)) {
            this._UI.startGame.visible = true;
            this._UI.buyBtn.visible = false;
            this._UI.goldimg.visible = false;
            this._UI.roleuseNoney.visible = true;
            this._UI.roleuseNoney.text = "已解锁";
        }
        else {
            this._UI.startGame.visible = false;
            this._UI.buyBtn.visible = true;
            this._UI.goldimg.visible = true;
            this._UI.roleuseNoney.visible = true;
            this._UI.roleuseNoney.text = CharacterMamager_1.default.Mgr.GetPrice(this.cntCharacterId) + "";
        }
        this._UI.roleName.text = CharacterMamager_1.default.Mgr.GetName(id);
        this._UI.desc.text = CharacterMamager_1.default.Mgr.GetDesc(id);
        this._UI._Gold.text = PlayerGuestAgent_1.default.GuestAgent.Money + "";
    };
    CharacterUI.prototype.selectRolePosition = function (e) {
        var cntTarget = e.currentTarget;
        if (!this.characterUIScene || this.characterUIScene.cntSelectIndex == parseInt(cntTarget.name)) {
            return;
        }
        this._UI.startGame.visible = false;
        this._UI.buyBtn.visible = false;
        this._UI.goldimg.visible = false;
        this._UI.roleuseNoney.visible = false;
        this.characterUIScene.updateSelectIndex(parseInt(cntTarget.name));
        this.InitPosition(null);
    };
    CharacterUI.prototype.InitPosition = function (data) {
        if (!this.characterUIScene) {
            return;
        }
        if (data) {
            this.cntCharacterId = this.characterUIScene.cntSelectIndex;
            this.updateRoleInfo(this.cntCharacterId);
            return;
        }
        var num = this.characterUIScene.arrayDis.length;
        for (var i = 0; i < num; i++) {
            var _outPos = new Laya.Vector3();
            this.characterUIScene.camera.viewport.project(this.characterUIScene.arrayDis[i].transform.position, this.characterUIScene.camera.projectionViewMatrix, _outPos);
            var _outPos1 = new Laya.Point(_outPos.x, _outPos.y);
            this._UI.layoutbg.globalToLocal(_outPos1);
            this.spriteBgArr[i].pos(_outPos1.x / Laya.stage.clientScaleX, _outPos1.y / Laya.stage.clientScaleY);
            this.spriteBgArr[i].pivotX = 207 / 2;
            this.spriteBgArr[i].pivotY = this.spriteBgArr[i].height - 5;
            this.spriteBgArr[i].visible = true;
            this.spriteBgArr[i].scaleX = 0.8 + ((this.characterUIScene.arrayDis[i].transform.localScaleX - this.characterUIScene.initScalNum) / 0.004) * 0.2;
            this.spriteBgArr[i].scaleY = 0.8 + ((this.characterUIScene.arrayDis[i].transform.localScaleX - this.characterUIScene.initScalNum) / 0.004) * 0.2;
        }
    };
    CharacterUI.prototype.BackGameBtn = function () {
        var _this = this;
        this.stopRoateTimer();
        var enterpanel = APP_1.default.UIManager.GetUIByName("EnterGameUI");
        enterpanel._UI.y = Laya.stage.height;
        Laya.Tween.to(enterpanel._UI, { y: 0 }, 500, Laya.Ease.sineOut);
        Laya.Tween.to(this, { y: -Laya.stage.height }, 500, Laya.Ease.sineOut, Laya.Handler.create(this, function () {
            APP_1.default.UIManager.Close(_this);
        }));
        this._UI.removeChild(this.characterUIScene);
    };
    CharacterUI.prototype.stopRoateTimer = function () {
        if (this.characterUIScene) {
            this.characterUIScene.clearRoateTimer();
        }
    };
    CharacterUI.Name = function () {
        return "CharacterUI";
    };
    CharacterUI.prototype.GetCharacterList = function () {
        this.m_CharacterList = GameAPP_1.default.CharacterMgr.GetIDList();
    };
    CharacterUI.prototype.Layout = function () {
        _super.prototype.Layout.call(this);
        if (!this._UI || !this._UI.bg) {
            return;
        }
        this._UI.bg.width = Laya.stage.width;
        this._UI.bg.height = Laya.stage.height;
        var scaleX = Laya.stage.width / Laya.stage.height;
        var scaleY = 750 / 1334;
        if (scaleX > scaleY) {
            scaleY = scaleY / scaleX;
            this._UI.layoutbg.pivotX = 750 / 2;
            this._UI.layoutbg.pivotY = 1334 / 2;
            var _outPos = new Laya.Vector3();
            this.characterUIScene.camera.viewport.project(new Laya.Vector3(0, -this.characterUIScene.startY - 0.01, 0), this.characterUIScene.camera.projectionViewMatrix, _outPos);
            this._UI.layoutbg.x = _outPos.x;
            this._UI.layoutbg.y = _outPos.y;
            this._UI.layoutbg.scaleX = this._UI.layoutbg.scaleY = scaleY;
            this.InitPosition(null);
        }
    };
    CharacterUI.prototype.Update = function () {
    };
    CharacterUI.prototype.Open = function () {
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnCurCharacterIDChange, this.OnNeedCloseUI, this);
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnMoneyChange, this.OnMoneyChange, this);
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnCharacterListChange, this.OnChangeList, this);
        this.characterUIScene = new CharacterUIScene_1.default(this.cntCharacterId, this.InitPosition.bind(this));
        this._UI.addChild(this.characterUIScene);
        this.characterUIScene.visible = false;
        var len = this.spriteBgArr.length;
        for (var i = 0; i < len; i++) {
            this.spriteBgArr[i].visible = false;
        }
        setTimeout(function () {
            this.characterUIScene.visible = true;
            this.InitPosition();
        }.bind(this), 500);
        this.Layout();
    };
    CharacterUI.prototype.Close = function () {
        APP_1.default.MessageManager.DesRegist(PlayerEntity_1.Player.Event.OnCurCharacterIDChange, this.OnNeedCloseUI, this);
        APP_1.default.MessageManager.DesRegist(PlayerEntity_1.Player.Event.OnMoneyChange, this.OnMoneyChange, this);
        APP_1.default.MessageManager.DesRegist(PlayerEntity_1.Player.Event.OnCharacterListChange, this.OnChangeList, this);
    };
    //事件
    CharacterUI.prototype.OnClickImg = function (id) {
        if (this.checkIsLock(this.characterUIScene.cntSelectIndex)) {
            //this.BackGameBtn();
            return;
        }
        GameControler_1.default.GameControler.SetPlayerID(this.characterUIScene.cntSelectIndex);
        this.OnMoneyChange();
        this.updateRoleInfo(this.characterUIScene.cntSelectIndex);
    };
    CharacterUI.prototype.OnNeedCloseUI = function () {
        if (!this.Showing) {
            return;
        }
        this.BackGameBtn();
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
        this._UI._Gold.text = PlayerGuestAgent_1.default.GuestAgent.Money + "";
        this._UI._Gold.stroke = 2;
        this._UI._Gold.strokeColor = "0xff0000";
    };
    return CharacterUI;
}(BaseUI_1.default));
exports.default = CharacterUI;
},{"../GameManager/CharacterMamager":15,"../Scene/CharacterUIScene":31,"../controler/GameAPP":41,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Utility/Path":38,"./../controler/APP":40,"./../controler/GameControler":42,"./BaseUI":47,"./layaMaxUI":57}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var Path_1 = require("./../Utility/Path");
var GuiderManager_1 = require("../Scene/GuiderManager");
var GameControler_1 = require("./../controler/GameControler");
var GameControler_2 = require("../controler/GameControler");
var PlayerGuestAgent_1 = require("../Agent/PlayerGuestAgent");
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
        _this.config = { "img": [
                { key: "bg", textureName: "mainbg.jpg" },
                { key: "endgametitle", textureName: "endgamedaizi.png" },
                { key: "endgamehentiao", textureName: "infotiao.png" },
                { key: "endgamebgicon", textureName: "inputtextarea.png" },
                { key: "dibg", textureName: "inputtextarea.png" }
            ],
            "btn": [
                { key: "_StartBtn", textureName: "restart.png" },
                { key: "_MenueBtn", textureName: "homeBtn.png" },
                { key: "_SetBtn", textureName: "setting.png" },
                { key: "_PlayerListBtn", textureName: "paihang.png" }
            ]
        };
        _this.UI = new ExtendEndGameUI();
        _this.FixUI(_this.UI);
        //this.UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ this._UIManager.Show<PlayerListUI>(PlayerListUI)});
        _this.Layout();
        _this.UI.distance.text = GameControler_2.default.GameControler.GameDir.GamePlay.Distance + "";
        _this.UI.gold.text = GameControler_2.default.GameControler.GameDir.GamePlay.GameGold + "";
        _this.updateSelfSceneUI();
        return _this;
    }
    EndGameUI.Name = function () {
        return "EndGameUI";
    };
    EndGameUI.prototype.updateSelfSceneUI = function () {
        for (var key in this.config) {
            var len = this.config[key].length;
            for (var i = 0; i < len; i++) {
                this.UI[this.config[key][i].key].skin = (PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
            }
        }
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
},{"../Agent/PlayerGuestAgent":4,"../Scene/GuiderManager":34,"../controler/GameControler":42,"./../Utility/Path":38,"./../controler/GameControler":42,"./BaseUI":47,"./layaMaxUI":57}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var Path_1 = require("./../Utility/Path");
var BaseUI_1 = require("./BaseUI");
var GameControler_1 = require("./../controler/GameControler");
var GameAgent_1 = require("./../Agent/GameAgent");
var PlayerGuestAgent_1 = require("../Agent/PlayerGuestAgent");
var ExtendEnterGameUI = /** @class */ (function (_super) {
    __extends(ExtendEnterGameUI, _super);
    function ExtendEnterGameUI() {
        var _this = _super.call(this) || this;
        // this.Panel = this._Panel;
        // this.Panel.vScrollBarSkin = "";
        // this.Panel.hScrollBarSkin = "";
        _this._Character.on(Laya.Event.CLICK, _this, _this.ShowCharacterPanel);
        //this._Character.on(Laya.Event.CLICK, this, this.showCharacter);
        _this._SetPanel.on(Laya.Event.CLICK, GameControler_1.default.GameControler, GameControler_1.default.GameControler.ShowSetPanel);
        //this._Rank.on(Laya.Event.CLICK, GameControler.GameControler, GameControler.GameControler.ShowRankPanel);
        //this._Start.on(Laya.Event.CLICK, GameControler.GameControler, GameControler.GameControler.EnterGame);
        _this._Start.on(Laya.Event.CLICK, _this, _this.onStart);
        _this._CharacterList.visible = false;
        //this.Panel.visible = false; 
        _this._Start["initX"] = _this._Start.x;
        _this._Character["initY"] = _this._Character.y;
        return _this;
    }
    ExtendEnterGameUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("Enter")));
    };
    ExtendEnterGameUI.prototype.ShowCharacterPanel = function () {
        var node = GameControler_1.default.GameControler.ShowCharacterPanel();
        node.y = -Laya.stage.height;
        Laya.Tween.to(node, { y: 0 }, 500, Laya.Ease.sineOut);
        Laya.Tween.to(this, { y: Laya.stage.height }, 500, Laya.Ease.sineOut);
    };
    ExtendEnterGameUI.prototype.onStart = function () {
        Laya.Tween.to(this._Rank, { y: this._Rank.y + Laya.stage.height - this._Character.y }, 150, Laya.Ease.sineIn);
        Laya.Tween.to(this._SetPanel, { y: this._SetPanel.y + Laya.stage.height - this._Character.y }, 150, Laya.Ease.sineIn);
        Laya.Tween.to(this._Start, { x: this._Start.y + Laya.stage.width - this._Start.x }, 250, Laya.Ease.sineIn, Laya.Handler.create(GameControler_1.default.GameControler, GameControler_1.default.GameControler.EnterGame));
        Laya.Tween.to(this._Character, { y: this._Character.y - Laya.stage.height }, 150, Laya.Ease.sineIn);
        Laya.Tween.to(this.adv, { y: this.adv.y + Laya.stage.height - this._Character.y }, 150, Laya.Ease.sineIn);
    };
    return ExtendEnterGameUI;
}(layaMaxUI_1.ui.EnterUI));
var EnterGameUI = /** @class */ (function (_super) {
    __extends(EnterGameUI, _super);
    function EnterGameUI(name) {
        var _this = _super.call(this, name) || this;
        _this.lastX = 99999;
        _this.config = { "img": [
                { key: "bg", textureName: "mainbg.jpg" }
            ],
            "btn": [
                { key: "_Character", textureName: "role.png" },
                { key: "_Start", textureName: "start.png" },
                { key: "_SetPanel", textureName: "setting.png" },
                { key: "adv", textureName: "ad.png" }
            ]
        };
        _this._UI = new ExtendEnterGameUI();
        _this.FixUI(_this._UI);
        var uiMgr = _this._UIManager;
        _this.m_BtnGroup = [];
        var content = _this._UI._Panel.getChildByName("content");
        _this.Layout();
        _this.updateSelfSceneUI();
        _this._gk = content;
        _this._UI._Panel.mouseEnabled = true;
        _this._gk.mouseEnabled = true;
        //this.initGK();
        _this.initGKListener();
        return _this;
    }
    EnterGameUI.Name = function () {
        return "EnterGameUI";
    };
    EnterGameUI.prototype.initGKListener = function () {
        this._UI._Panel.on(Laya.Event.MOUSE_DOWN, this, this.downGKBox);
        this._UI._Panel.on(Laya.Event.MOUSE_MOVE, this, this.moveGKBox);
        this._UI._Panel.on(Laya.Event.MOUSE_UP, this, this.upGKBox);
        this._UI._Panel.on(Laya.Event.MOUSE_OVER, this, this.upGKBox);
    };
    EnterGameUI.prototype.downGKBox = function (e) {
        this.lastX = e.target.mouseX;
    };
    EnterGameUI.prototype.moveGKBox = function (e) {
        if (this.lastX == 99999) {
            return;
        }
        this._gk.x += (e.target.mouseX - this.lastX);
        this.lastX = e.target.mouseX;
    };
    EnterGameUI.prototype.upGKBox = function (e) {
        this.lastX = 99999;
    };
    // initGK() {
    //     for(var i = 1;i <= 5;i ++) {
    //         var spr = new Laya.Image();
    //         spr.loadImage("entersceneui/gk/gk" + i + ".png");
    //         spr.x = (i - 1) * 630;
    //         this._gkContent.addChild(spr);
    //     }
    // }
    EnterGameUI.prototype.updateSelfSceneUI = function () {
        for (var key in this.config) {
            var len = this.config[key].length;
            for (var i = 0; i < len; i++) {
                this._UI[this.config[key][i].key].skin = (PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
            }
        }
    };
    EnterGameUI.prototype.InitBtnGroup = function () {
        // var CurMaxLevel = GameAgent.Agent.CurMaxLevel;
        // var curLevel = GameAgent.Agent.CurLevel;
        // var btnNum = this._UI._Group.numChildren;
        // var group = this.m_BtnGroup;
        // for (var idx = 0; idx < btnNum; ++idx) {
        //     var btn: any = this._UI._Group.getChildAt(idx) as Laya.Image;
        //     btn.idx = idx;
        //     btn.on(Laya.Event.CLICK, this, this.OnChoose)
        //     btn.gray = true;
        //     group.push(btn);
        // }
        //group[curLevel].gray = false;
    };
    EnterGameUI.prototype.Open = function () {
        //this.InitBtnGroup();
        this.y = 0;
        this._UI._Rank.y = Laya.stage.height - this._UI._Rank.bottom - this._UI.adv.height;
        this._UI._SetPanel.y = Laya.stage.height - this._UI._SetPanel.bottom - this._UI.adv.height;
        this._UI.adv.y = Laya.stage.height - this._UI.adv.bottom - this._UI.adv.height;
        this._UI._Start.x = this._UI._Start["initX"];
        this._UI._Character.y = this._UI._Character["initY"];
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
},{"../Agent/PlayerGuestAgent":4,"./../Agent/GameAgent":2,"./../Utility/Path":38,"./../controler/GameControler":42,"./BaseUI":47,"./layaMaxUI":57}],51:[function(require,module,exports){
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
        _this.left = 0;
        _this.right = 0;
        _this.bottom = 0;
        _this.top = 0;
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
        this._UI._LeftTouch.on(Laya.Event.MOUSE_DOWN, owner, Listener);
    };
    GameUI.prototype.SetRightTouch = function (owner, Listener) {
        this._UI._RightTouch.on(Laya.Event.MOUSE_DOWN, owner, Listener);
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
        var itemNum = GameAgent_1.GameAgent.Agent.GameItemNum;
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
},{"../Agent/GameAgent":2,"../Game/GameModule":23,"./../Agent/PlayerEntity":3,"./../FrameWork/MessageCenter":10,"./../Utility/Path":38,"./../controler/APP":40,"./../controler/GameControler":42,"./BaseUI":47,"./ItemListUI":52,"./layaMaxUI":57}],52:[function(require,module,exports){
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
var GameControler_1 = require("./../controler/GameControler");
var ItemManager_1 = require("../GameManager/ItemManager");
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
var ToolItemUI = /** @class */ (function (_super) {
    __extends(ToolItemUI, _super);
    function ToolItemUI() {
        var _this = _super.call(this) || this;
        _this.m_ItemList = [];
        return _this;
    }
    ToolItemUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("toolItem")));
    };
    return ToolItemUI;
}(layaMaxUI_1.ui.toolItemUI));
var ItemListUI = /** @class */ (function (_super) {
    __extends(ItemListUI, _super);
    function ItemListUI(name) {
        var _this = _super.call(this, name) || this;
        _this.arrayDis = [];
        _this.cntNum = 5;
        _this.startao = 270;
        _this.perao = 360 / _this.cntNum;
        _this.r = 230;
        _this.startY = 575;
        _this.startX = 300;
        _this.cntSelectIndex = 0;
        _this.cntstartao = 90;
        _this.moveStarao = 2;
        _this.nextAo = -1;
        _this.initScalNum = 0.018;
        _this.config = { "img": [
                { key: "bg", textureName: "mainbg.jpg" }
            ],
            "btn": [
                { key: "backBtn", textureName: "back.png" },
                { key: "buyBtn", textureName: "buy.png" },
                { key: "backBtn", textureName: "start.png" }
            ]
        };
        _this.UI = new ExtendsItemListUI();
        _this.addChild(_this.UI);
        _this.UI.BtnListener = new MessageCenter_1.MessageMD.Delegate(_this, function () { _this._UIManager.Close(_this); });
        _this._UIType = BaseEnum_1.BaseEnum.UITypeEnum.Midle;
        //this.UpdateList();
        //this.m_Gold = this.UI._Gold.text.split("#");
        _this.UI._BG.alpha = 0;
        _this.UI._BG.on(Laya.Event.CLICK, _this, _this.CloseUI);
        _this.UI.backBtn.on(Laya.Event.CLICK, _this, _this.CloseUI);
        _this.UI._List.visible = false;
        _this.Layout();
        _this.cntSelectIndex = 0; //cntSelectIndex;
        for (var i = 0; i < _this.cntNum; i++) {
            var audt = new ToolItemUI();
            audt.toolicon.loadImage(ItemManager_1.default.Mgr.GetItemIcon(i));
            audt.toolname.text = ItemManager_1.default.Mgr.GetItemInfo(i).Passscore;
            // audt.loadImage(ItemManager.Mgr.GetItemIcon(i));
            audt.name = i + "";
            _this.UI.addChild(audt);
            _this.arrayDis.push(audt);
            _this.arrayDis[i].on(Laya.Event.CLICK, _this, _this.selectRolePosition);
        }
        _this.cntSelectIndex = (_this.cntSelectIndex + 5) % 5;
        _this.cntstartao = (_this.startao + (_this.cntNum - _this.cntSelectIndex) * _this.perao + 360) % 360;
        _this.updateSelect();
        _this.updateRoleInfo(_this.cntSelectIndex);
        _this.UI.buyBtn.on(Laya.Event.CLICK, _this, _this.BuyItem);
        _this.updateSelfSceneUI();
        return _this;
    }
    ItemListUI.Name = function () {
        return "ItemListUI";
    };
    ItemListUI.prototype.updateSelfSceneUI = function () {
        for (var key in this.config) {
            var len = this.config[key].length;
            for (var i = 0; i < len; i++) {
                this.UI[this.config[key][i].key].skin = (PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
            }
        }
    };
    ItemListUI.prototype.selectRolePosition = function (e) {
        var cntTarget = e.currentTarget;
        if (this.cntSelectIndex == parseInt(e.currentTarget.name)) {
            return;
        }
        //this.UI.backBtn.visible = false;
        this.UI.buyBtn.visible = false;
        this.UI.ownertxt.visible = false;
        this.UI.goldimg.visible = false;
        this.UI.roleuseNoney.visible = false;
        this.updateSelectIndex(parseInt(cntTarget.name));
    };
    ItemListUI.prototype.calCntStartao = function () {
        this.cntSelectIndex = (this.cntSelectIndex + 5) % 5;
        this.nextAo = (this.startao + (this.cntNum - this.cntSelectIndex) * this.perao + 360) % 360;
        if ((this.nextAo - this.cntstartao + 360) % 360 >= 180) {
            this.moveStarao = -2;
        }
        else {
            this.moveStarao = 2;
        }
        Laya.timer.loop(0.05, this, this.timeAoChange);
    };
    ItemListUI.prototype.timeAoChange = function () {
        if (this.cntstartao == this.nextAo) {
            this.cntstartao = this.nextAo;
            this.nextAo = -1;
            this.updateRoleInfo(this.cntSelectIndex);
            Laya.timer.clear(this, this.timeAoChange);
            return;
        }
        var lascntAo = this.cntstartao;
        this.cntstartao += this.moveStarao;
        if (this.cntstartao < 0 || this.cntstartao == 360) {
            this.cntstartao = (this.cntstartao + 360) % 360;
            lascntAo = this.cntstartao - this.moveStarao;
        }
        else {
            this.cntstartao = (this.cntstartao + 360) % 360;
        }
        if ((lascntAo >= this.nextAo && this.cntstartao <= this.nextAo) || (lascntAo <= this.nextAo && this.cntstartao >= this.nextAo)) {
            this.cntstartao = this.nextAo;
            this.nextAo = -1;
        }
        if (this.nextAo == -1) {
            this.updateRoleInfo(this.cntSelectIndex);
            Laya.timer.clear(this, this.timeAoChange);
        }
        this.updateSelect();
    };
    ItemListUI.prototype.updateSelect = function () {
        for (var i = 0; i < this.arrayDis.length; i++) {
            var ao = (this.cntstartao + i * this.perao) % 360;
            var x = this.startX + this.r * Math.cos(ao * 3.14 / 180);
            var y = this.startY + this.r * Math.sin(ao * 3.14 / 180);
            this.arrayDis[i].x = x;
            this.arrayDis[i].y = y;
            var scale = (y - this.startY) / 2 / (this.r - this.startY) * 0.2;
            if (scale >= 0) {
                this.arrayDis[i].scaleX = this.arrayDis[i].scaleY = (0.8 + scale);
            }
            else {
                this.arrayDis[i].scaleX = this.arrayDis[i].scaleY = 0.8;
            }
        }
    };
    ItemListUI.prototype.updateRoleInfo = function (id) {
        // if(this.checkIsLock(id)) {
        //     this._UI.startGame.visible = true;
        //     this._UI.buyBtn.visible = false;
        //     this._UI.goldimg.visible = false;
        //     this._UI.roleuseNoney.visible = true;
        //     this._UI.roleuseNoney.text = "已解锁";
        // }
        // else 
        // {
        this.UI.backBtn.visible = true;
        this.UI.buyBtn.visible = true;
        this.UI.goldimg.visible = true;
        this.UI.roleuseNoney.visible = true;
        this.UI.ownertxt.visible = true;
        ;
        this.UI.roleuseNoney.text = ItemManager_1.default.Mgr.GetPrice(this.cntSelectIndex) + "";
        //}
        var ownerNum = PlayerGuestAgent_1.default.GuestAgent.ItemList[this.cntSelectIndex];
        if (!ownerNum) {
            ownerNum = 0;
        }
        this.UI.ownertxt.text = "已拥有:" + ownerNum;
        var itemInfo = ItemManager_1.default.Mgr.GetItemInfo(id);
        this.UI.roleName.text = itemInfo.Passscore;
        this.UI.desc.text = itemInfo.Desc;
        this.UI._Gold.text = PlayerGuestAgent_1.default.GuestAgent.Money + "";
    };
    ItemListUI.prototype.clearRoateTimer = function () {
        Laya.timer.clear(this, this.timeAoChange);
    };
    ItemListUI.prototype.lastRole = function () {
        this.cntSelectIndex--;
        this.calCntStartao();
    };
    ItemListUI.prototype.nextRole = function () {
        this.cntSelectIndex++;
        this.calCntStartao();
    };
    ItemListUI.prototype.updateSelectIndex = function (selectIndex) {
        if (selectIndex == this.cntSelectIndex) {
            return;
        }
        this.cntSelectIndex = selectIndex;
        this.calCntStartao();
    };
    ItemListUI.prototype.Open = function () {
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnMoneyChange, this.ShowGold, this);
        APP_1.default.MessageManager.Regist(PlayerEntity_1.Player.Event.OnItemListChange, this.RefreshList, this);
        GameControler_1.default.GameControler.TimePause();
        this.ShowGold();
        this.UpdateList();
    };
    ItemListUI.prototype.Close = function () {
        GameControler_1.default.GameControler.TimeContinue();
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
        // this.m_Gold[1] ="" + PlayerGuestAgent.GuestAgent.Money;
        this.UI._Gold.text = PlayerGuestAgent_1.default.GuestAgent.Money + "";
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
        roleElement.BtnLable = "" + GameAPP_1.default.ItemMgr.GetPrice(this.m_ItemList[index]) + "";
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
    ItemListUI.prototype.Layout = function () {
        _super.prototype.Layout.call(this);
        if (!this.UI || !this.UI.bg) {
            return;
        }
        this.UI.bg.width = Laya.stage.width;
        this.UI.bg.height = Laya.stage.height;
    };
    ItemListUI.prototype.BuyItem = function (id) {
        PlayerGuestAgent_1.default.GuestAgent.BuyItem(this.cntSelectIndex);
        this.updateRoleInfo(this.cntSelectIndex);
    };
    ItemListUI.prototype.ChooseItem = function (id) {
        if (!this.Showing)
            return;
        if (GameAgent_1.GameAgent.Agent.ItemList[id]) {
            GameAgent_1.GameAgent.Agent.CurItem = id;
            APP_1.default.UIManager.Close(this);
        }
        else {
            GameAgent_1.GameAgent.Agent.CurItem = -1;
        }
    };
    ItemListUI.prototype.CloseUI = function () {
        this.ChooseItem(this.cntSelectIndex);
        APP_1.default.UIManager.Close(this);
    };
    return ItemListUI;
}(BaseUI_1.default));
exports.default = ItemListUI;
},{"../GameManager/ItemManager":17,"./../Agent/GameAgent":2,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Base/BaseEnum":5,"./../FrameWork/MessageCenter":10,"./../Utility/Path":38,"./../controler/APP":40,"./../controler/GameAPP":41,"./../controler/GameControler":42,"./BaseUI":47,"./layaMaxUI":57}],53:[function(require,module,exports){
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
},{"../platform/WechatOpen":43,"./../Base/BaseEnum":5,"./../Utility/Path":38,"./BaseUI":47,"./layaMaxUI":57}],54:[function(require,module,exports){
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
        _this.config = { "img": [
                { key: "bg", textureName: "mainbg.jpg" }
            ],
            "btn": [
                { key: "_Return", textureName: "back.png" }
            ]
        };
        _this._UIType = BaseEnum_1.BaseEnum.UITypeEnum.Midle;
        _this._UI = new ExtendsSetPanelUI();
        _this.FixUI(_this._UI);
        _this._UI._Return.on(Laya.Event.CLICK, _this, function () { _this._UIManager.CloseCurView(); GuiderManager_1.default.Mgr.EnterScene(); });
        _this._UI.voiceopen.on(Laya.Event.CLICK, _this, _this.VoiceOpen);
        _this._UI.voiceclose.on(Laya.Event.CLICK, _this, _this.VoiceClose);
        var info = GameControler_1.default.GameControler.GetSetInfo();
        _this.selectedIndex = info.AudioOn ? 1 : 0;
        _this.SetPanel();
        _this.Layout();
        return _this;
    }
    SetPanelUI.Name = function () {
        return "SetPanelUI";
    };
    SetPanelUI.prototype.VoiceOpen = function () {
        this.selectedIndex = 1;
        this.SetPanel();
    };
    SetPanelUI.prototype.VoiceClose = function () {
        this.selectedIndex = 0;
        this.SetPanel();
    };
    SetPanelUI.prototype.SetPanel = function () {
        if (this.selectedIndex == 1) {
            this._UI.voiceopen.getChildAt(2).visible = true;
            this._UI.voiceclose.getChildAt(1).visible = false;
        }
        else {
            this._UI.voiceopen.getChildAt(2).visible = false;
            this._UI.voiceclose.getChildAt(1).visible = true;
        }
        //this._UI._OPSwitch.selectedIndex = info.OPIsRight ? 1 : 0;
        //this._UI._Text.text = info.TextInfo;
    };
    SetPanelUI.prototype.SavePanel = function () {
        var info = new GameStruct_1.GameStruct.SetInfo();
        info.AudioOn = this.selectedIndex == 1;
        //info.OPIsRight = this.selectedIndex == 1;
        GameControler_1.default.GameControler.SaveSetInfo(info);
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
},{"../Scene/GuiderManager":34,"./../Base/BaseEnum":5,"./../Game/GameStruct":24,"./../Utility/Path":38,"./../controler/GameControler":42,"./BaseUI":47,"./layaMaxUI":57}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadUIScene = /** @class */ (function (_super) {
    __extends(LoadUIScene, _super);
    function LoadUIScene() {
        var _this = _super.call(this) || this;
        _this.initScalNum = 0.03;
        _this.ambientColor = new Laya.Vector3(1, 1, 1);
        _this.camera = _this.addChild(new Laya.Camera(0, 0.1, 0.6));
        _this.camera.transform.translate(new Laya.Vector3(0, 0, 0.6));
        _this.camera.transform.rotate(new Laya.Vector3(0, 0, 0), true, false);
        var model = Laya.loader.getRes("ui/Resource/zhuyemian_qiu1_idle/zhuyemian_qiu1_idle.lh");
        //var model1: Laya.Sprite3D = Laya.loader.getRes(path.GetLH("L01_spr_barrier_04"));
        var audt = model.clone();
        audt.transform.localScale = new Laya.Vector3(_this.initScalNum, _this.initScalNum, _this.initScalNum);
        return _this;
        //this.addChild(model.clone());
    }
    LoadUIScene.prototype.onEnable = function () {
    };
    LoadUIScene.prototype.onDisable = function () {
    };
    return LoadUIScene;
}(Laya.Scene3D));
exports.default = LoadUIScene;
},{}],56:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseUI_1 = require("./../BaseUI");
var LoadUIScene_1 = require("./LoadUIScene");
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
        _this.addChild(new LoadUIScene_1.default());
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
        //callBack();
        this._CallBack = callBack;
        this._UI._Enter.visible = true;
        this._UI._Enter.label = ""; //this._Name[0];
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
},{"./../BaseUI":47,"./LoadUIScene":55}],57:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var REG = Laya.ClassUtils.regClass;
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
    REG("ui.BGUI", BGUI);
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
    REG("ui.CharacterUI", CharacterUI);
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
    REG("ui.EndGameUI", EndGameUI);
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
    REG("ui.EnterUI", EnterUI);
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
    REG("ui.GameUI", GameUI);
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
    REG("ui.GameRankUI", GameRankUI);
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
    REG("ui.ItemListUI", ItemListUI);
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
    REG("ui.PlayerListUI", PlayerListUI);
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
    REG("ui.SetPanelUI", SetPanelUI);
    var toolItemUI = /** @class */ (function (_super) {
        __extends(toolItemUI, _super);
        function toolItemUI() {
            return _super.call(this) || this;
        }
        toolItemUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.loadScene("toolItem");
        };
        return toolItemUI;
    }(Laya.View));
    ui.toolItemUI = toolItemUI;
    REG("ui.toolItemUI", toolItemUI);
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[30])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xheWFlbmdpbmUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FnZW50L0Jhc2VBZ2VudC50cyIsInNyYy9BZ2VudC9HYW1lQWdlbnQudHMiLCJzcmMvQWdlbnQvUGxheWVyRW50aXR5LnRzIiwic3JjL0FnZW50L1BsYXllckd1ZXN0QWdlbnQudHMiLCJzcmMvQmFzZS9CYXNlRW51bS50cyIsInNyYy9CYXNlL0Jhc2VGdW5jLnRzIiwic3JjL0Jhc2UvRlNNLnRzIiwic3JjL0ZyYW1lV29yay9CYXNlTWFuYWdlci50cyIsInNyYy9GcmFtZVdvcmsvRnJhbWVXb3JrLnRzIiwic3JjL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyLnRzIiwic3JjL0ZyYW1lV29yay9TY2VuZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL1RpbWVNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9VSU1hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0dhbWVNYW5hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0l0ZW1NYW5hZ2VyLnRzIiwic3JjL0dhbWUvQW5pbU9iai50cyIsInNyYy9HYW1lL0NoYXJhY3Rlci50cyIsInNyYy9HYW1lL0dhbWVDYW1lcmEudHMiLCJzcmMvR2FtZS9HYW1lSXRlbS50cyIsInNyYy9HYW1lL0dhbWVNYXAudHMiLCJzcmMvR2FtZS9HYW1lTW9kdWxlLnRzIiwic3JjL0dhbWUvR2FtZVN0cnVjdC50cyIsInNyYy9HYW1lL0lucHV0LnRzIiwic3JjL0dhbWUvTW91bnRMaW5lLnRzIiwic3JjL0dhbWUvUGxheWVyLnRzIiwic3JjL0dhbWUvUGxheWVyQ3RybGVyLnRzIiwic3JjL0dhbWUvU3RlcC50cyIsInNyYy9NYWluLnRzIiwic3JjL1NjZW5lL0NoYXJhY3RlclVJU2NlbmUudHMiLCJzcmMvU2NlbmUvR2FtZURpcmVjdG9yLnRzIiwic3JjL1NjZW5lL0dhbWVTY2VuZS50cyIsInNyYy9TY2VuZS9HdWlkZXJNYW5hZ2VyLnRzIiwic3JjL1NjZW5lL0xvYWRTY2VuZS50cyIsInNyYy9TY2VuZS9TY2VuZS50cyIsInNyYy9TY2VuZS9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheS50cyIsInNyYy9VdGlsaXR5L1BhdGgudHMiLCJzcmMvVXRpbGl0eS9VSUZ1bmMudHMiLCJzcmMvY29udHJvbGVyL0FQUC50cyIsInNyYy9jb250cm9sZXIvR2FtZUFQUC50cyIsInNyYy9jb250cm9sZXIvR2FtZUNvbnRyb2xlci50cyIsInNyYy9wbGF0Zm9ybS9XZWNoYXRPcGVuLnRzIiwic3JjL3NjcmlwdC9JdGVtRWxlbWVudC50cyIsInNyYy9zY3JpcHQvUm9sZUVsZW1lbnQudHMiLCJzcmMvdWkvQkcudHMiLCJzcmMvdWkvQmFzZVVJLnRzIiwic3JjL3VpL0NoYXJhY3RlclVJLnRzIiwic3JjL3VpL0VuZEdhbWVVSS50cyIsInNyYy91aS9FbnRlckdhbWVVSS50cyIsInNyYy91aS9HYW1lVUkudHMiLCJzcmMvdWkvSXRlbUxpc3RVSS50cyIsInNyYy91aS9SYW5rUGFuZWxVSS50cyIsInNyYy91aS9TZXRQYW5lbFVJLnRzIiwic3JjL3VpL1VuRG93bmxvYWQvTG9hZFVJU2NlbmUudHMiLCJzcmMvdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBLDZDQUE4QztBQUM5QztJQUdJO1FBRUksSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7SUFDbEUsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7Ozs7O0FDUkQsK0NBQXVDO0FBQ3ZDLG1E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QUMsV0FBVyxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFFM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUUzRCxrRUFBa0U7WUFFbEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFbEUs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RyxDQUFDLENBQUMsQ0FBQztTQUNwQjtRQUNELElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNsQixJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUM3QztRQUNELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsdUNBQVksR0FBWjtRQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUcsRUFBRTtZQUN6QyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUE7WUFDakQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN6RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFaEUsSUFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFHLEtBQUssSUFBSSxDQUFDLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDO2FBQzFJO2lCQUNHO2dCQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNsSDtTQUNKO1FBQ0QsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELDBDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLGNBQWMsRUFBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxjQUFjLEVBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELDRDQUFpQixHQUFqQixVQUFrQixXQUFrQjtRQUNoQyxJQUFHLFdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25DLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsbUNBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCxvQ0FBUyxHQUFUO0lBQ0EsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0ExSUEsQUEwSUMsQ0ExSTZDLElBQUksQ0FBQyxPQUFPLEdBMEl6RDs7Ozs7QUM3SUQsaUNBQTZCO0FBQzdCLDBDQUF3QztBQUV4QywyREFBcUQ7QUFHckQ7SUFBMEMsZ0NBQWtCO0lBS3hEO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBTkQsc0JBQVcsa0NBQVE7YUFBbkI7WUFFSSxPQUFPLElBQUksQ0FBQyxRQUF5QixDQUFDO1FBQzFDLENBQUM7OztPQUFBO0lBSUQsNEJBQUssR0FBTDtRQUVJLElBQUksVUFBVSxHQUFHLENBQUMsV0FBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFBQyxXQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUM3RyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksYUFBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUMsSUFBSSxFQUFDLElBQUksdUJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBQ00sMEJBQUcsR0FBVjtJQUdBLENBQUM7SUFFTCxtQkFBQztBQUFELENBbEJBLEFBa0JDLENBbEJ5QyxhQUFLLENBQUMsWUFBWSxHQWtCM0Q7Ozs7O0FDVEQsMENBQXNDO0FBRXRDLCtDQUF1QztBQUV2QywrQ0FBeUM7QUFLekMsSUFBSSxRQUFRLEdBQUcsZUFBSSxDQUFDLFFBQVEsQ0FBQztBQUM3QixNQUFNO0FBQ047SUFBdUMsNkJBQWU7SUFTbEQsTUFBTTtJQUNOO1FBQUEsWUFFSSxpQkFBTyxTQUVWO1FBREcsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7O0lBQ3ZDLENBQUM7SUFWUywrQkFBVyxHQUFyQjtRQUVJLE9BQU8sSUFBSSxzQkFBWSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQVNMLGdCQUFDO0FBQUQsQ0FoQkEsQUFnQkMsQ0FoQnNDLGFBQUssQ0FBQyxTQUFTLEdBZ0JyRDs7Ozs7QUN2Q0QsbURBQTZDO0FBQzdDLDBDQUFzQztBQUN0QywwQ0FBc0M7QUFDdEMsd0NBQW1DO0FBRW5DO0lBMEJJLE1BQU07SUFDTjtRQUVJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUExQkQsc0JBQVcsb0JBQUc7YUFBZDtZQUVJLElBQUcsYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQzdCO2dCQUNJLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQzthQUM1QztZQUNELE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQUdELHNCQUFXLGtDQUFPO2FBQWxCO1lBRUksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQUNELGFBQWE7SUFDYixrQ0FBVSxHQUFWO1FBRUksSUFBSSxZQUFZLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNyQyxhQUFHLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztJQUNqQyxDQUFDO0lBT0wsb0JBQUM7QUFBRCxDQS9CQSxBQStCQyxJQUFBOztBQUVEO0lBQTBCLCtCQUFlO0lBR3JDO2VBRUksaUJBQU87SUFDWCxDQUFDO0lBRVMsaUNBQVcsR0FBckI7UUFFSSxJQUFJLFFBQVEsR0FBc0IsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUN2RCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQWJBLEFBYUMsQ0FieUIsYUFBSyxDQUFDLFNBQVMsR0FheEM7QUFFRDtJQUE2QixrQ0FBa0I7SUFPM0M7ZUFFSSxpQkFBTztJQUNYLENBQUM7SUFSRCxnQ0FBTyxHQUFQO0lBR0EsQ0FBQztJQU9NLDhCQUFLLEdBQVo7UUFFSSxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUMsR0FBRyxFQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLEVBQUMsRUFBQyxHQUFHLEVBQUMsV0FBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLEdBQUcsRUFBQyxXQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDL0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLGFBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxJQUFJLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBQ00sK0JBQU0sR0FBYjtJQUdBLENBQUM7SUFDTSw0QkFBRyxHQUFWO0lBR0EsQ0FBQztJQUNMLHFCQUFDO0FBQUQsQ0F6QkEsQUF5QkMsQ0F6QjRCLGFBQUssQ0FBQyxZQUFZLEdBeUI5QztBQUVEO0lBQThCLG1DQUFvQjtJQUc5QztlQUVJLGlCQUFPO0lBQ1gsQ0FBQztJQUNNLCtCQUFLLEdBQVo7UUFFSSxJQUFJLENBQUMsRUFBRSxHQUFHLGFBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFjLHFCQUFXLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBQ00sNkJBQUcsR0FBVjtJQUdBLENBQUM7SUFDTSxnQ0FBTSxHQUFiO0lBR0EsQ0FBQztJQUNMLHNCQUFDO0FBQUQsQ0FuQkEsQUFtQkMsQ0FuQjZCLGFBQUssQ0FBQyxjQUFjLEdBbUJqRDs7OztBQ3JHRCwwQ0FBc0M7QUFDdEMsMENBQXNDO0FBRXRDLDBEQUFvRDtBQUVwRCxpREFBMkM7QUFDM0MsMENBQW9DO0FBQ3BDLGlDQUEyQjtBQUUzQjtJQUF1Qyw2QkFBZTtJQUVsRDtlQUVJLGlCQUFPO0lBQ1gsQ0FBQztJQUVTLCtCQUFXLEdBQXJCO1FBRUksT0FBTyxJQUFJLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDTCxnQkFBQztBQUFELENBWEEsQUFXQyxDQVhzQyxhQUFLLENBQUMsU0FBUyxHQVdyRDs7QUFJRDtJQUEwQiwrQkFBa0I7SUFFeEM7ZUFFSSxpQkFBTztJQUNYLENBQUM7SUFFTSwyQkFBSyxHQUFaO1FBRUksSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFDLEdBQUcsRUFBQyx5QkFBeUIsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLEdBQUcsRUFBQyw2QkFBNkIsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ3BJLElBQUksQ0FBQyxjQUFjLENBQUUsSUFBSSxhQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQyxDQUFFLENBQUM7SUFDMUYsQ0FBQztJQUVNLHlCQUFHLEdBQVY7SUFHQSxDQUFDO0lBRUQsNkJBQU8sR0FBUDtJQUVBLENBQUM7SUFDTCxrQkFBQztBQUFELENBckJBLEFBcUJDLENBckJ5QixhQUFLLENBQUMsWUFBWSxHQXFCM0M7QUFFRCxRQUFRO0FBQ1I7SUFBNkIsa0NBQW9CO0lBUTdDO1FBQUEsWUFFSSxpQkFBTyxTQUtWO1FBSkcsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsS0FBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7O0lBQzFCLENBQUM7SUFFTyxrQ0FBUyxHQUFqQjtRQUVJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksYUFBYSxHQUFHO1lBQ2hCLFdBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQzNCLFdBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1lBQzlCLFdBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1lBQzlCLFdBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1lBQzlCLFdBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1lBQzlCLFdBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1lBQy9CLFdBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDO1lBQ2hDLFdBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3hCLFdBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDO1lBQy9CLFdBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7WUFDcEMsV0FBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQztZQUNwQyxXQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xDLFdBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLFdBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDO1lBQ2pDLFdBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1lBQzVCLFdBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQzdCLFdBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO1NBQy9CLENBQUM7UUFFTixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0QsSUFBSSxhQUFhLEdBQUc7WUFDaEIsV0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7WUFDM0IsV0FBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7WUFDM0IsV0FBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztZQUNoQyxXQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO1lBQ2hDLFdBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7WUFDaEMsV0FBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztZQUNoQyxXQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1lBQzdCLFdBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUM7WUFDN0IsV0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztZQUM3QixXQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztZQUMxQixXQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztZQUMzQixXQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1lBQzVCLFdBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUM7WUFDakMsV0FBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztZQUM3QixXQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDO1lBQzlCLFdBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDO1lBQzNCLFdBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7U0FDL0IsQ0FBQTtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyw2QkFBSSxHQUFaLFVBQWEsS0FBdUIsRUFBQyxLQUFxQjtRQUE3QyxzQkFBQSxFQUFBLFlBQXVCO1FBQUMsc0JBQUEsRUFBQSxZQUFxQjtRQUd0RCxJQUFHLEtBQUssSUFBRSxJQUFJLEVBQ2Q7WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLElBQUcsR0FBRyxDQUFDO1NBQzNCO1FBQ0QsSUFBRyxLQUFLLElBQUUsSUFBSSxFQUNkO1lBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNoSCxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsWUFBWSxJQUFHLEdBQUcsQ0FBQztTQUMzQjtJQUNMLENBQUM7SUFFTyxxQ0FBWSxHQUFwQixVQUFxQixLQUFZO1FBRTdCLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFDbkI7WUFDSSxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsYUFBYSxHQUFFLEtBQUssR0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ08scUNBQVksR0FBcEIsVUFBcUIsS0FBWTtRQUc3QixJQUFHLElBQUksQ0FBQyxXQUFXLEVBQ25CO1lBQ0ksT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRSxLQUFLLEdBQUMsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNPLGdDQUFPLEdBQWYsVUFBZ0IsR0FBVTtRQUV0QixJQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQztRQUN4QixPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBQyxHQUFHLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRVMsbUNBQVUsR0FBcEIsVUFBcUIsSUFBSTtRQUVyQixJQUFHLElBQUksQ0FBQyxXQUFXLEVBQ25CO1lBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsY0FBZ0IsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBLENBQUEsQ0FBQyxDQUFFLENBQUM7U0FDN0U7YUFDRDtZQUNJLGFBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLElBQUksWUFBRSxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsY0FBSyx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFDO1NBQ25FO1FBQ0QsT0FBTztJQUNYLENBQUM7SUFFTSw4QkFBSyxHQUFaO1FBRUksSUFBSSxDQUFDLFdBQVcsR0FBRyxhQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBWSxtQkFBUyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSw0QkFBRyxHQUFWO1FBRUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sK0JBQU0sR0FBYjtJQUVBLENBQUM7SUFDTCxxQkFBQztBQUFELENBM0lBLEFBMklDLENBM0k0QixhQUFLLENBQUMsY0FBYyxHQTJJaEQ7Ozs7QUM1TEQscUNBQW1DO0FBQ25DLDhEQUF3RDtBQUd4RCwwQ0FBb0M7QUFDcEMsb0RBQStDO0FBQy9DLElBQWMsS0FBSyxDQXNMbEI7QUF0TEQsV0FBYyxLQUFLO0lBQ2Y7UUFBOEIsNEJBQWtCO1FBRTVDO21CQUNJLGlCQUFPO1FBQ1gsQ0FBQztRQUNMLGVBQUM7SUFBRCxDQUxBLEFBS0MsQ0FMNkIsU0FBRyxDQUFDLEdBQUcsR0FLcEM7SUFMWSxjQUFRLFdBS3BCLENBQUE7SUFFRCxNQUFNO0lBQ047UUFBd0MsNkJBQVM7UUFpQjdDO1lBQUEsWUFDSSxpQkFBTyxTQUVWO1lBREcsS0FBSSxDQUFDLFNBQVMsR0FBRyxtQkFBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQTBCLHlCQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7O1FBQy9GLENBQUM7UUFYRCxzQkFBVywrQkFBUTtpQkFBbkI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQzNCLENBQUM7OztXQUFBO1FBQ0Qsc0JBQVcsK0JBQVE7aUJBQW5CO2dCQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMzQixDQUFDOzs7V0FBQTtRQVFNLDBCQUFNLEdBQWIsVUFBYyxRQUFtQjtZQUM3QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3RDO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsdUNBQXVDLENBQUMsQ0FBQzthQUN4RDtRQUNMLENBQUM7UUFFTSx5QkFBSyxHQUFaO1lBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRU0sdUJBQUcsR0FBVjtZQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUMzQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFO29CQUM5QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEMsS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO2lCQUN0QjthQUNKO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNwQixhQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLENBQUM7UUFFTSwwQkFBTSxHQUFiO1lBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVTtnQkFDZixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLENBQUM7UUFFTCxnQkFBQztJQUFELENBcERBLEFBb0RDLENBcER1QyxTQUFHLENBQUMsS0FBSyxHQW9EaEQ7SUFwRHFCLGVBQVMsWUFvRDlCLENBQUE7SUFFRDtRQUEyQyxnQ0FBdUI7UUFxQjlEO1lBQUEsWUFDSSxpQkFBTyxTQUtWO1lBSkcsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7WUFDdEIsS0FBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7WUFDeEIsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN2QixLQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFTLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBMEIseUJBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQzs7UUFDL0YsQ0FBQztRQW5CRCxzQkFBSSxrQ0FBUTtZQURaLFNBQVM7aUJBQ1Q7Z0JBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRTtvQkFDdkIsT0FBTyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztpQkFDdEU7cUJBQU07b0JBQ0gsT0FBTyxhQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7aUJBQzdFO1lBQ0wsQ0FBQztpQkFDRCxVQUFhLEtBQWE7Z0JBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLENBQUM7OztXQUhBO1FBSUQsc0JBQUkscUNBQVc7aUJBQWY7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDbkQsQ0FBQzs7O1dBQUE7UUFTTSw4QkFBTyxHQUFkO1lBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFFTSxnQ0FBUyxHQUFoQjtZQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUNuRCxDQUFDO1FBS00sNkJBQU0sR0FBYjtZQUNJLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLGtEQUFrRDtnQkFDbEQsSUFBSSxDQUFDLFlBQVksR0FBRyxhQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQzthQUNoRDtRQUNMLENBQUM7UUFFTSw2QkFBTSxHQUFiO1lBQ0ksSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsRUFBRTtnQkFDeEIsaUJBQU0sTUFBTSxXQUFFLENBQUM7YUFDbEI7UUFDTCxDQUFDO1FBRU0sbUNBQVksR0FBbkI7WUFDSSxvREFBb0Q7WUFDcEQsSUFBSSxDQUFDLFlBQVksSUFBSSxhQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUNEOzs7V0FHRztRQUNJLHFDQUFjLEdBQXJCLFVBQXVCLFlBQTJCO1lBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNMLG1CQUFDO0lBQUQsQ0FwRUEsQUFvRUMsQ0FwRTBDLFNBQUcsQ0FBQyxHQUFHLEdBb0VqRDtJQXBFcUIsa0JBQVksZUFvRWpDLENBQUE7SUFFRDtRQUE2QyxrQ0FBUztRQUVsRDtZQUFBLFlBQ0ksaUJBQU8sU0FFVjtZQURHLEtBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUEwQix5QkFBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDOztRQUMvRixDQUFDO1FBQ0wscUJBQUM7SUFBRCxDQU5BLEFBTUMsQ0FONEMsU0FBRyxDQUFDLEtBQUssR0FNckQ7SUFOcUIsb0JBQWMsaUJBTW5DLENBQUE7SUFFRDtRQUFvQyxrQ0FBYztRQU85Qzs7Ozs7V0FLRztRQUNILHdCQUFZLFVBQWlCLEVBQUUsVUFBaUIsRUFBRSxTQUErQjtZQUFqRixZQUNJLGlCQUFPLFNBSVY7WUFIRyxLQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztZQUMvQixLQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsQ0FBQztZQUMvQixLQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQzs7UUFDakMsQ0FBQztRQWRELHNCQUFXLHlDQUFhO2lCQUF4QjtnQkFDSSxPQUFPLElBQUksQ0FBQyxPQUF1QixDQUFDO1lBQ3hDLENBQUM7OztXQUFBO1FBY00sK0JBQU0sR0FBYjtRQUVBLENBQUM7UUFFTSw0QkFBRyxHQUFWO1FBRUEsQ0FBQztRQUVNLDhCQUFLLEdBQVo7WUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQy9ELElBQUksSUFBSSxDQUFDLFlBQVk7Z0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3BELElBQUksSUFBSSxDQUFDLFlBQVk7Z0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFFTyxxQ0FBWSxHQUFwQjtZQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBRUwscUJBQUM7SUFBRCxDQXhDQSxBQXdDQyxDQXhDbUMsY0FBYyxHQXdDakQ7SUF4Q1ksb0JBQWMsaUJBd0MxQixDQUFBO0FBQ0wsQ0FBQyxFQXRMYSxLQUFLLEdBQUwsYUFBSyxLQUFMLGFBQUssUUFzTGxCOzs7O0FDNUxELDZDQUEyQztBQUkzQyxrREFBNEM7QUFDNUMsaUVBQTJEO0FBQzNELHNEQUFnRDtBQUNoRCw4Q0FBd0M7QUFDeEMsNENBQTBDO0FBQzFDLHNEQUFvRDtBQUNwRCw0Q0FBc0M7QUFFdEMsa0RBQTRDO0FBRTVDLDZDQUF1QztBQUN2QyxpRUFBdUQ7QUFJdkQscURBQW1EO0FBQ25ELG1EQUE4QztBQUM5Qyx3REFBdUQ7QUFFdkQsOENBQXlDO0FBQ3pDLG9EQUFtRDtBQUduRCxJQUFJLFFBQVEsR0FBRyxlQUFJLENBQUMsUUFBUSxDQUFDO0FBRTdCLElBQUksUUFBUSxHQUFXLENBQUMsQ0FBQztBQUV6QixJQUFJLE9BQU8sR0FBVyxFQUFFLENBQUM7QUFDekIsSUFBSSxNQUFNLEdBQVcsRUFBRSxDQUFDO0FBQ3hCLE1BQU07QUFDTjtJQUEyQyxpQ0FBb0I7SUE0RDNEO1FBQUEsWUFDSSxpQkFBTyxTQVlWO1FBWEcsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsS0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsS0FBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDekIsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN6QyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixLQUFJLENBQUMsTUFBTSxHQUFHLGFBQUcsQ0FBQyxZQUFZLENBQUMsRUFBVSxDQUFDO1FBQzFDLEtBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxpQkFBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQzs7SUFDbEQsQ0FBQztJQXRERCxzQkFBSSxrQ0FBTzthQUFYO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksb0NBQVM7YUFBYjtZQUNJLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksdUNBQVk7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSxrQ0FBTzthQUFYO1lBQ0ksT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFDRCxVQUFZLEtBQWE7WUFBekIsaUJBSUM7WUFIRyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxjQUFRLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDaEUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsY0FBUSxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7OztPQUxBO0lBTUQsc0JBQUksc0NBQVc7YUFBZjtZQUNJLElBQUksS0FBSyxHQUFXLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN4RSxLQUFLLEdBQUcsS0FBSyxHQUFHLHVCQUFVLENBQUMsTUFBTSxDQUFDO1lBQ2xDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUNELHNCQUFJLG1DQUFRO2FBQVo7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3ZDLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksMENBQWU7YUFBbkI7WUFDSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksbUNBQVE7YUFBWjtZQUNJLE9BQVEsSUFBSSxDQUFDLE9BQXdCLENBQUMsUUFBUSxDQUFDO1FBQ25ELENBQUM7OztPQUFBO0lBQ0Qsc0JBQUksbUNBQVE7YUFBWjtZQUNJLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUNELHNCQUFJLHlDQUFjO2FBQWxCO1lBQ0ksSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ3pELE9BQU8sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNwQyxPQUFPLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDekQsQ0FBQzs7O09BQUE7SUFpQkQsc0NBQWMsR0FBZCxVQUFlLEtBQTBCO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCxzQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsK0JBQU8sR0FBUCxVQUFRLEdBQVc7UUFDZixJQUFJLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQztRQUN0QixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCwwQ0FBa0IsR0FBbEIsVUFBbUIsR0FBVztRQUMxQixJQUFJLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQztJQUMxQixDQUFDO0lBRUQsb0NBQVksR0FBWixVQUFhLEdBQVc7UUFDcEIsSUFBSSxDQUFDLGFBQWEsSUFBSSxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN2Qyx1QkFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFTLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxRQUFRO0lBQ1IsaUNBQVMsR0FBVCxVQUFVLFFBQThCO1FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw2QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixvREFBb0Q7SUFDeEQsQ0FBQztJQUVELDJCQUFHLEdBQUg7SUFFQSxDQUFDO0lBRUQsTUFBTTtJQUNOLCtCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELHFDQUFhLEdBQWIsVUFBYyxJQUFZO1FBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxNQUFNO0lBQ04sZ0NBQVEsR0FBUixVQUFTLE9BQWdCO1FBQ3JCLHlCQUF5QjtRQUN6QixZQUFZO1FBQ1osSUFBSSxJQUFJLEdBQVMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDckMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ2QsT0FBTztTQUNWO1FBQ0QsSUFBSSxPQUFPLEVBQUU7WUFDVCxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUMzQjthQUFNO1lBQ0gsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDMUMsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN4QixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7T0FHRztJQUNILHVDQUFlLEdBQWYsVUFBZ0IsS0FBYTtRQUN6QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRDs7O09BR0c7SUFDSCx5Q0FBaUIsR0FBakIsVUFBa0IsUUFBOEIsRUFBRSxjQUEwQjtRQUExQiwrQkFBQSxFQUFBLGtCQUEwQjtRQUN4RSxJQUFJLGNBQWMsR0FBRyxjQUFjLEdBQUcsS0FBSyxFQUFHO1lBQzFDLElBQUksS0FBSyxHQUFhLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELElBQUksT0FBTyxHQUFTLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxDQUFDO1NBQ3RGOztZQUVHLElBQUksT0FBTyxHQUFTLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0UsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUVELGtCQUFrQjtJQUNYLDZCQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksb0JBQVUsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGtCQUFrQixHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkUsYUFBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxNQUFNO1FBQ04sTUFBTTtRQUNOLElBQUksTUFBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksU0FBUyxHQUFHLHFCQUFTLENBQUMsS0FBSyxDQUFDO1FBQ2hDLElBQUksV0FBVyxHQUFHLGlCQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNuRixNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25DLGFBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsYUFBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqRCxVQUFVO1FBQ1YsYUFBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMseUJBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFN0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxvQkFBb0I7SUFDVixpQ0FBUyxHQUFuQjtRQUVJLGFBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDM0UscUJBQVMsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDaEMscUJBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHVCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRCxTQUFTO1FBQ1QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGFBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLHVCQUFTLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLEVBQUUsdUJBQVMsQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzSixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUV2QixJQUFJLENBQUMsT0FBTyxHQUFHLGFBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFNLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNwQyx1QkFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sOEJBQU0sR0FBYjtRQUNJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsdUNBQWUsR0FBZixVQUFnQixLQUFhLEVBQUUsS0FBVSxFQUFFLFFBQThCO1FBQ3JFLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELFlBQVk7SUFDSixzQ0FBYyxHQUF0QjtRQUNJLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN0QyxJQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3BCLElBQUksU0FBUyxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUMxRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDaEQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3JCO1FBQ0Qsd0RBQXdEO1FBQ3hELElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxhQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUNoRCxJQUFJLENBQUMsZUFBZSxHQUFHLGFBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUMzRCx3Q0FBd0M7WUFDeEMsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxjQUFjO0lBQ04sbUNBQVcsR0FBbkI7UUFDSSxJQUFJLElBQUksR0FBVyxFQUFFLENBQUE7UUFDckIsSUFBSSxTQUFTLEdBQVcsSUFBSSxDQUFDLGVBQWUsR0FBRyxhQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUN4RSxJQUFJLFNBQVMsR0FBRyxHQUFHO1lBQ2YsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDN0I7WUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDOUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDaEQscUJBQVMsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDaEMscUJBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDcEM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsT0FBTztJQUNHLGtDQUFVLEdBQXBCO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsb0NBQVksR0FBWixVQUFhLEtBQWE7UUFDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzdCO0lBQ0wsQ0FBQztJQUVNLG9DQUFZLEdBQW5CO1FBQ0ksSUFBSSxxQkFBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQztZQUNoQyxPQUFPO1FBQ1gscUJBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDL0IsSUFBSSxXQUFXLEdBQVcscUJBQVMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO1FBQ3pELElBQUksTUFBTSxHQUFXLGlCQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRSxJQUFJLFFBQVEsR0FBVyxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsSUFBSSxPQUFPLEdBQXdCLGVBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFckMsQ0FBQztJQUVNLHFDQUFhLEdBQXBCO1FBQ0ksSUFBSSxxQkFBUyxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQztZQUMvQixPQUFPO1FBQ1gscUJBQVMsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsSUFBSSxNQUFNLEdBQVcscUJBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQzdDLElBQUksUUFBUSxHQUFXLGlCQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRCxJQUFJLE9BQU8sR0FBd0IsZUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU8sc0NBQWMsR0FBdEI7UUFDSSxhQUFHLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyx5QkFBUyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRixJQUFJLEVBQUUsR0FBYyxhQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBWSxtQkFBUyxDQUFDLENBQUM7UUFDN0QscUJBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxxQkFBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU8sbUNBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFDTyxtQ0FBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FuVUEsQUFtVUMsQ0FuVTBDLGFBQUssQ0FBQyxjQUFjLEdBbVU5RDs7Ozs7QUNyV0QsSUFBYyxJQUFJLENBd0NqQjtBQXhDRCxXQUFjLElBQUk7SUFDSCxhQUFRLEdBQVksSUFBSSxDQUFDO0lBQ3pCLFlBQU8sR0FBVyxNQUFNLENBQUM7SUFDekIsbUJBQWMsR0FBVyxZQUFZLENBQUM7SUFDdEMsaUJBQVksR0FBVyxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLG9EQUFvRCxDQUFDO0lBQzdHLFdBQU0sR0FBVyxLQUFBLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDdEMsY0FBUyxHQUFXLEtBQUEsWUFBWSxHQUFHLEtBQUssQ0FBQTtJQUN4QyxlQUFVLEdBQVcsS0FBQSxZQUFZLEdBQUcsU0FBUyxDQUFBO0lBRXhEOzs7T0FHRztJQUNILG9CQUEyQixRQUFnQjtRQUN2QyxPQUFPLEtBQUEsTUFBTSxHQUFHLFFBQVEsR0FBRyxRQUFRLEdBQUcsQ0FBQyxLQUFBLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFBLE9BQU8sQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFGZSxlQUFVLGFBRXpCLENBQUE7SUFFRDs7O09BR0c7SUFDSCx1QkFBOEIsUUFBZ0I7UUFDMUMsT0FBTyxLQUFBLE1BQU0sR0FBRyxRQUFRLEdBQUcsT0FBTyxHQUFHLENBQUMsS0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBQSxPQUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRmUsa0JBQWEsZ0JBRTVCLENBQUE7SUFFRDs7O09BR0c7SUFDSCxlQUFzQixRQUFnQjtRQUNsQyxPQUFPLEtBQUEsU0FBUyxHQUFHLEtBQUEsY0FBYyxHQUFHLFFBQVEsR0FBRyxnQkFBZ0IsR0FBRyxRQUFRLEdBQUcsS0FBSyxHQUFHLENBQUMsS0FBQSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBQSxPQUFPLENBQUMsQ0FBQztJQUNuSCxDQUFDO0lBRmUsVUFBSyxRQUVwQixDQUFBO0lBRUQ7OztPQUdHO0lBQ0gscUJBQTRCLFFBQWdCO1FBQ3hDLE9BQU8sS0FBQSxVQUFVLEdBQUcsUUFBUSxHQUFHLE9BQU8sR0FBRyxDQUFDLEtBQUEsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUEsT0FBTyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUZlLGdCQUFXLGNBRTFCLENBQUE7QUFDTCxDQUFDLEVBeENhLElBQUksR0FBSixZQUFJLEtBQUosWUFBSSxRQXdDakI7Ozs7QUN4Q0QsSUFBYyxNQUFNLENBZ0JuQjtBQWhCRCxXQUFjLE1BQU07SUFDaEIsT0FBTztJQUNQLHVCQUE4QixLQUFhO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDUixPQUFPO1NBQ1Y7UUFDRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNsQyxJQUFJLEtBQUssR0FBVyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3ZDLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFQZSxvQkFBYSxnQkFPNUIsQ0FBQTtJQUNELGVBQXNCLElBQWlCLEVBQUUsS0FBYTtRQUNsRCxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDNUMsQ0FBQztJQUxlLFlBQUssUUFLcEIsQ0FBQTtBQUNMLENBQUMsRUFoQmEsTUFBTSxHQUFOLGNBQU0sS0FBTixjQUFNLFFBZ0JuQjs7OztBQ2hCRCw4REFBd0Q7QUFDeEQsc0RBQWdEO0FBQ2hELDREQUFrRDtBQUNsRCxzREFBeUM7QUFDekMsMERBQW9EO0FBQ3BELHNEQUFpRDtBQUNqRCxpREFBZ0Q7QUFFaEQ7SUFBQTtJQTRDQSxDQUFDO0lBdENHLHNCQUFXLGdCQUFTO2FBQXBCO1lBRUksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcscUJBQWM7YUFBekI7WUFDSSxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVyxnQkFBUzthQUFwQjtZQUNJLElBQUksR0FBRyxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUc7Z0JBQzFCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsbUJBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFZLG1CQUFTLENBQUMsQ0FBQzthQUM1RDtZQUNELE9BQU8sR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLG1CQUFZO2FBQXZCO1lBQ0ksSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRztnQkFDekIsR0FBRyxDQUFDLFVBQVUsR0FBRyxtQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQVcsc0JBQVEsQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsa0JBQVc7YUFBdEI7WUFFSSxJQUFJLEdBQUcsQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFHO2dCQUN4QixHQUFHLENBQUMsU0FBUyxHQUFHLG1CQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBYyxxQkFBVyxDQUFDLENBQUM7YUFDOUQ7WUFDRCxPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFDYSxRQUFJLEdBQWxCO1FBRUksR0FBRyxDQUFDLFdBQVcsR0FBRyxtQkFBUyxDQUFDLEVBQUUsQ0FBQztRQUMvQixJQUFJLEVBQUUsR0FBYyxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQ3BDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBMEIseUJBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRixHQUFHLENBQUMsVUFBVSxHQUFJLEVBQUUsQ0FBQyxVQUFVLENBQVcsc0JBQVEsQ0FBQyxDQUFDO1FBQ3BELEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBYyxxQkFBVyxDQUFDLENBQUM7UUFDeEQsR0FBRyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFZLG1CQUFTLENBQUMsQ0FBQztRQUV0RCxHQUFHLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3BGLEdBQUcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHVCQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDOUYsQ0FBQztJQUNMLFVBQUM7QUFBRCxDQTVDQSxBQTRDQyxJQUFBOzs7OztBQ3BERCxzRUFBZ0U7QUFDaEUsNERBQXNEO0FBQ3REO0lBQUE7SUFVQSxDQUFDO0lBUkcsc0JBQWtCLHVCQUFZO2FBQTlCO1lBRUksT0FBTywwQkFBZ0IsQ0FBQyxHQUFHLENBQUM7UUFDaEMsQ0FBQzs7O09BQUE7SUFDRCxzQkFBa0Isa0JBQU87YUFBekI7WUFFSSxPQUFPLHFCQUFXLENBQUMsR0FBRyxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBQ0wsY0FBQztBQUFELENBVkEsQUFVQyxJQUFBOzs7OztBQ1hELG1EQUErQztBQUMvQyxnRUFBNkQ7QUFDN0QsaURBQTJDO0FBQzNDLG1EQUE2QztBQUM3QyxtREFBNkM7QUFDN0Msa0RBQTRDO0FBRTVDLDZCQUF1QjtBQUN2QixnRUFBMkQ7QUFFM0QsaURBQWdEO0FBR2hEO0lBQUE7SUFNQSxDQUFDO0lBSkcsc0JBQVcsMEJBQWE7YUFBeEI7WUFFSSxPQUFRLGFBQWEsQ0FBQyxHQUFHLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFDTCxnQkFBQztBQUFELENBTkEsQUFNQyxJQUFBOztBQUVEO0lBY0k7SUFDQSxDQUFDO0lBYkQsc0JBQVcsb0JBQUc7YUFBZDtZQUNJLElBQUksYUFBYSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQzVCLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQzthQUM1QztZQUNELE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQztRQUM5QixDQUFDOzs7T0FBQTtJQWFELHNCQUFJLHNDQUFXO1FBRmYsTUFBTTtRQUNOLFNBQVM7YUFDVDtZQUVJLElBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUNyQjtnQkFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBQyxDQUFDLENBQUM7YUFDM0I7WUFDRCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxxQ0FBVTtRQURkLE1BQU07YUFDTjtZQUVJLElBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUNwQjtnQkFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQzthQUN6QjtZQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUdELHNCQUFJLHFDQUFVO1FBRGQsTUFBTTthQUNOO1lBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQ3BCO2dCQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1lBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBR0Qsc0JBQUkseUNBQWM7UUFEbEIsUUFBUTthQUNSO1lBQ0ksSUFBRyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQ3hCO2dCQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxDQUFDO2FBQzlCO1lBQ0QsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRUQsbUNBQVcsR0FBWCxVQUFZLEVBQVU7UUFDbEIsSUFBSSxVQUFVLEdBQW9CLDBCQUFtQixDQUFDLFVBQVUsQ0FBQztRQUNqRSxJQUFJLGFBQWEsR0FBaUIsVUFBVSxDQUFDLGFBQWEsQ0FBQztRQUMzRCxJQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxFQUNyQjtZQUNJLElBQUcsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxFQUMvQjtnQkFDSSxPQUFPO2FBQ1Y7U0FDSjtRQUNELFVBQVUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELFFBQVE7SUFDUixvQ0FBWSxHQUFaO1FBQ0ksSUFBSSxLQUFLLEdBQUcsYUFBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWEsb0JBQVUsQ0FBQyxDQUFDLENBQUEsa0JBQWtCO0lBQzdFLENBQUM7SUFFRCxTQUFTO0lBQ1QscUNBQWEsR0FBYjtRQUNJLDJEQUEyRDtRQUMzRCxjQUFjO1FBQ2QsSUFBSTtRQUNKLElBQUksS0FBSyxHQUFHLGFBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFjLHFCQUFXLENBQUMsQ0FBQyxDQUFBLGtCQUFrQjtJQUMvRSxDQUFDO0lBRUQsUUFBUTtJQUNELDBDQUFrQixHQUF6QjtRQUNJLElBQUksU0FBUyxHQUFHLGFBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFjLHFCQUFXLENBQUMsQ0FBQztRQUM3RCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBR0Qsc0JBQUksa0NBQU87YUFBWDtZQUNJLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx1QkFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzVDO1lBQ0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pCLENBQUM7YUFFRCxVQUFZLEtBQXlCO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLENBQUM7OztPQUpBO0lBTUQsUUFBUTtJQUNSLG1DQUFXLEdBQVgsVUFBWSxJQUF3QjtRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUQsUUFBUTtJQUNSLGtDQUFVLEdBQVY7UUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNELGlDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUNELHNCQUFJLGtDQUFPO2FBQVg7WUFDSSxPQUFPLGFBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQXdCLENBQUM7UUFDOUQsQ0FBQzs7O09BQUE7SUFDRCxhQUFhO0lBQ2Isa0NBQVUsR0FBVjtRQUNJLElBQUksWUFBWSxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO1FBQ25DLGFBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxZQUFZO0lBQ1oscUNBQWEsR0FBYixVQUFjLElBQWM7UUFDeEIsT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsK0JBQU8sR0FBUCxVQUFRLEVBQVM7UUFFYiwwQkFBZ0IsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBRUksYUFBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELG9DQUFZLEdBQVo7UUFFSSxhQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQWhKQSxBQWdKQyxJQUFBOzs7O0FDdEtEO0lBTUk7UUFITyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUl0QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFHLE9BQU8sRUFBRSxJQUFJLFdBQVcsRUFBRTtZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ3hEO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ1csdUJBQVksR0FBMUI7UUFDSSxJQUFHLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRTtZQUN2QixVQUFVLENBQUMsVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7U0FDNUM7UUFDRCxPQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUE7SUFDaEMsQ0FBQztJQUVNLGdDQUFXLEdBQWxCLFVBQW1CLEtBQVM7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ25CLE9BQU8sRUFBRSxRQUFRO1lBQ2pCLEtBQUssRUFBRSxLQUFLO1NBQ2YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDZCQUFRLEdBQWYsVUFBZ0IsS0FBUztRQUNyQixJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDbkIsT0FBTyxFQUFFLFVBQVU7WUFDbkIsS0FBSyxFQUFFLEtBQUs7U0FDZixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0saUNBQVksR0FBbkI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDbkIsT0FBTyxFQUFFLGNBQWM7U0FDMUIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDhCQUFTLEdBQWhCO1FBQ0ksSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ25CLE9BQU8sRUFBRSxPQUFPO1NBQ25CLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSw4QkFBUyxHQUFoQjtRQUNJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztZQUNuQixPQUFPLEVBQUUsT0FBTztTQUNuQixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sK0JBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDbkIsT0FBTyxFQUFFLFlBQVk7U0FDeEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDZCQUFRLEdBQWY7UUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUM7WUFDbkIsT0FBTyxFQUFFLE1BQU07U0FDbEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLHNDQUFpQixHQUF6QixVQUEwQixJQUFJO1FBQzFCLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QztJQUNMLENBQUM7SUFyRWMscUJBQVUsR0FBZSxJQUFJLENBQUM7SUF1RWpELGlCQUFDO0NBekVELEFBeUVDLElBQUE7QUF6RVksZ0NBQVU7Ozs7QUNBdkIsOERBQXdEO0FBQ3hEO0lBQXlDLCtCQUFRO0lBNkM3QztlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQXJDRCxzQkFBSSw0QkFBRzthQUFQO1lBQ0ksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBZ0IsQ0FBQzthQUNqRDtZQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUNELHNCQUFXLGdDQUFPO2FBQWxCLFVBQW1CLEVBQVU7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw0QkFBRzthQUFkO1lBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsK0JBQU07YUFBakI7WUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVyxpQ0FBUTthQUFuQixVQUFvQixHQUFVO1lBRTFCLElBQUcsQ0FBQyxHQUFHO2dCQUNILE9BQU87WUFDWCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQzlCLENBQUM7OztPQUFBO0lBQ0Qsc0JBQVcsK0JBQU07YUFHakI7WUFDSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQ3pCLENBQUM7YUFMRCxVQUFrQixLQUFjO1lBQzVCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDOzs7T0FBQTtJQUlELHNCQUFXLDRCQUFHO2FBQWQsVUFBZSxHQUFXO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsQ0FBQzs7O09BQUE7SUFDRCxzQkFBVyw4QkFBSzthQUFoQixVQUFpQixHQUFXO1lBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ25DLENBQUM7OztPQUFBO0lBS0QsMEJBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQWUsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFnQixDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQWUsQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUc7WUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDeEQ7SUFDTCxDQUFDO0lBRU0sK0JBQVMsR0FBaEI7UUFDSSxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRU0sNkJBQU8sR0FBZDtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVM7WUFDZCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLCtCQUFTLEdBQWhCLFVBQWlCLEtBQVUsRUFBRSxRQUE4QjtRQUN2RCxJQUFJLFdBQVcsR0FBRyxJQUFJLHlCQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDO0lBRU0sa0NBQVksR0FBbkIsVUFBb0IsS0FBVSxFQUFFLFFBQThCO1FBQzFELElBQUksV0FBVyxHQUFHLElBQUkseUJBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO0lBQ3BDLENBQUM7SUFDTCxrQkFBQztBQUFELENBL0VBLEFBK0VDLENBL0V3QyxJQUFJLENBQUMsR0FBRyxHQStFaEQ7Ozs7O0FDaEZELDhEQUF3RDtBQUN4RCwwQ0FBb0M7QUFFcEM7SUFBeUMsK0JBQVU7SUEwQy9DO2VBQ0ksaUJBQU87SUFDWCxDQUFDO0lBdENELHNCQUFJLDRCQUFHO2FBQVA7WUFBQSxpQkFTQztZQVJHLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQWdCLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDakMsdUJBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDNUQsYUFBRyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDakMsQ0FBQyxDQUFDLENBQUE7YUFDTDtZQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVELDJCQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtTQUNkO0lBQ0wsQ0FBQztJQUVNLDZCQUFPLEdBQWQsVUFBZSxNQUFjO1FBRXpCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztJQUM1QixDQUFDO0lBRU0sc0NBQWdCLEdBQXZCLFVBQXdCLGFBQXNCO1FBRTFDLElBQUksRUFBRSxHQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsSUFBSSxFQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUEscUNBQXFDO0lBQzNGLENBQUM7SUFFRCxzQkFBVyxvQ0FBVzthQUF0QixVQUF1QixFQUFTO1lBRTVCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBQ0QsMEJBQUksR0FBSjtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQWUsQ0FBQztJQUNqRCxDQUFDO0lBS0wsa0JBQUM7QUFBRCxDQTdDQSxBQTZDQyxDQTdDd0MsSUFBSSxDQUFDLEtBQUssR0E2Q2xEOzs7OztBQ2hERCwwQ0FBc0M7QUFDdEMseUNBQThCO0FBQzlCLCtDQUEwQztBQUUxQztJQUFrQyx3QkFBTztJQVlyQztRQUFBLFlBQ0ksaUJBQU8sU0E4QlY7UUE1QkcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUU7UUFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QyxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksbUJBQVEsQ0FBQyxTQUFTLEVBQWUsQ0FBQztRQUNyRCxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksbUJBQVEsQ0FBQyxTQUFTLEVBQWUsQ0FBQztRQUN4RCxnQ0FBZ0M7UUFDakMsS0FBSSxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUMsUUFBUSxHQUFDLElBQUksR0FBQyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQ2hEO1lBQ0ksSUFBSSxLQUFLLEdBQWMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDeEMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1lBQ25ELEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ25CLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFDLElBQUksR0FBQyxJQUFJLENBQUM7WUFDOUIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM1QjtRQUNELEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQy9DLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3QixLQUFLLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDL0MsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbkIsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDcEIsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQixLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQTtRQUN0QixLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQTs7UUFDdkIscUNBQXFDO0lBQ3pDLENBQUM7SUF6Q0QsNkJBQWMsR0FBZDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQXdDRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsV0FBVztJQUNYLDZCQUFjLEdBQWQsVUFBZ0IsTUFBYTtRQUV6QixPQUFPLE1BQU0sR0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN2QixDQUFDO0lBQ0QscUJBQU0sR0FBTixVQUFPLFNBQWdCO1FBRW5CLElBQUksU0FBUyxHQUFtQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2pFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQixJQUFJLEtBQUssR0FBVSxDQUFDLENBQUM7UUFDckIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDOUIsT0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQzFCO1lBQ0ksSUFBSSxJQUFJLEdBQThCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDN0QsSUFBSSxNQUFNLEdBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNwQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxNQUFNLEdBQUcsU0FBUyxHQUFHLE1BQU0sR0FBRyxNQUFNLEdBQUMsSUFBSSxDQUFDO1lBQzdELFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsSUFBRyxNQUFNLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUM3QjtnQkFDSSxNQUFNLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQzthQUM3QztZQUNELEVBQUUsS0FBSyxDQUFDO1NBQ1g7UUFDRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUNELHVCQUFRLEdBQVIsVUFBUyxNQUFhO1FBRWxCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO0lBQ2hELENBQUM7SUFDRCx5QkFBVSxHQUFWLFVBQVksTUFBYTtRQUVyQix1Q0FBdUM7UUFDdkMsMkNBQTJDO1FBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0Qiw4QkFBOEI7SUFFbEMsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQTlGQSxBQThGQyxDQTlGaUMsY0FBRSxDQUFDLElBQUksR0E4RnhDOzs7OztBQ2xHRCxzREFBZ0Q7QUFDaEQsc0RBQXlDO0FBQ3pDLCtDQUEyQztBQUkzQyxNQUFNO0FBQ047SUFBNkMsMEJBQVE7SUFXakQsZ0JBQVksSUFBVztRQUF2QixZQUVJLGlCQUFPLFNBVVY7UUFURyxLQUFJLENBQUMsT0FBTyxHQUFHLG1CQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztRQUN2QyxLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUNsQixLQUFJLENBQUMsVUFBVSxHQUFHLG1CQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBWSxtQkFBUyxDQUFDLENBQUM7UUFDekQsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7O1FBQ3JCLGlCQUFpQjtRQUNwQixrQkFBa0I7UUFDckIsbUJBQW1CO1FBQ2IsZ0JBQWdCO0lBQ3BCLENBQUM7SUFDRCxxQkFBSSxHQUFKO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELHFCQUFJLEdBQUo7SUFFQSxDQUFDO0lBRUQsc0JBQUssR0FBTDtJQUVBLENBQUM7SUFFRCx1QkFBTSxHQUFOO1FBRUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFDRCx3QkFBTyxHQUFQO1FBRUksdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsd0JBQU8sR0FBUDtRQUVJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsc0JBQUksMEJBQU07YUFBVjtZQUVJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDJCQUFPO2FBQVg7WUFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSx3QkFBSTthQUFSO1lBRUksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMkJBQU87YUFBWDtZQUVJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELHVCQUFNLEdBQU47SUFHQSxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksc0JBQUssR0FBWixVQUFhLEVBQVk7UUFFckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ00seUJBQVEsR0FBZjtRQUVJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxzQkFBVyx5QkFBSzthQUFoQjtZQUVJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVNLDJCQUFVLEdBQWpCO1FBRUksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDeEIsQ0FBQztJQUNELHlCQUFRLEdBQVI7UUFFSSxJQUFHLElBQUksQ0FBQyxNQUFNLEVBQ2Q7WUFDSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7U0FDcEI7SUFDTCxDQUFDO0lBRUwsYUFBQztBQUFELENBN0dBLEFBNkdDLENBN0c0QyxJQUFJLENBQUMsR0FBRyxHQTZHcEQ7Ozs7O0FDbkhELHlDQUFnQztBQUNoQyxtQ0FBNkI7QUFDN0IsMENBQXdDO0FBQ3hDLDhEQUF3RDtBQUN4RCwwQ0FBb0M7QUFJcEMsZ0VBQTBEO0FBRTFELHdEQUFnRDtBQUNoRCxnREFBMkM7QUFFM0MsOERBQXlEO0FBRXpELG9FQUErRDtBQUcvRDtJQUFpQyxzQ0FBYztJQUszQztlQUNJLGlCQUFPO0lBQ1gsQ0FBQztJQU5ELDJDQUFjLEdBQWQ7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFLTCx5QkFBQztBQUFELENBUkEsQUFRQyxDQVJnQyxjQUFFLENBQUMsV0FBVyxHQVE5QztBQUVEO0lBQXlDLCtCQUFNO0lBMEIzQyxxQkFBWSxJQUFZO1FBQXhCLFlBQ0ksa0JBQU0sSUFBSSxDQUFDLFNBaUNkO1FBeERPLGlCQUFXLEdBQWlCLEVBQUUsQ0FBQztRQUsvQixZQUFNLEdBQUcsRUFBQyxLQUFLLEVBQ25CO2dCQUNJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsWUFBWSxFQUFDO2dCQUNuQyxFQUFDLEdBQUcsRUFBQyxrQkFBa0IsRUFBQyxXQUFXLEVBQUMsa0JBQWtCLEVBQUM7Z0JBQ3ZELEVBQUMsR0FBRyxFQUFDLGtCQUFrQixFQUFDLFdBQVcsRUFBQyxrQkFBa0IsRUFBQztnQkFDdkQsRUFBQyxHQUFHLEVBQUMsa0JBQWtCLEVBQUMsV0FBVyxFQUFDLGtCQUFrQixFQUFDO2dCQUN2RCxFQUFDLEdBQUcsRUFBQyxrQkFBa0IsRUFBQyxXQUFXLEVBQUMsa0JBQWtCLEVBQUM7Z0JBQ3ZELEVBQUMsR0FBRyxFQUFDLGtCQUFrQixFQUFDLFdBQVcsRUFBQyxrQkFBa0IsRUFBQzthQUMxRDtZQUNELEtBQUssRUFDTDtnQkFDSSxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQztnQkFDdEMsRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLFdBQVcsRUFBQyxTQUFTLEVBQUM7Z0JBQ3BDLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxXQUFXLEVBQUMsV0FBVyxFQUFDO2FBQzVDO1NBQ0osQ0FBQztRQUlFLEtBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1FBQ3BDLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLGlCQUFpQjtRQUNqQixLQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQix1REFBdUQ7UUFDdkQsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRywwQkFBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUM3RCxLQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFFeEMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUksRUFBRSxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFOUQsS0FBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUUvQixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pELEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRCxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRWpELElBQUksR0FBRyxHQUFHLEtBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ2xDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUMsQ0FBQyxFQUFHLEVBQUU7WUFDekIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNsQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFJLEVBQUUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDM0U7UUFDRCxLQUFJLENBQUMsY0FBYyxHQUFHLDBCQUFnQixDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDOUQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFekMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUksRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0QsS0FBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUksRUFBRSxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUQsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7O0lBQzdCLENBQUM7SUFFRCx1Q0FBaUIsR0FBakI7UUFDSSxLQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDeEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDbEMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBQyxDQUFDLEVBQUcsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLDBCQUFnQixDQUFDLFVBQVUsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUNwSDtTQUNKO0lBQ0wsQ0FBQztJQUVELGdDQUFVLEdBQVY7UUFDSSx1QkFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlFLGFBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLHVCQUFhLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFRCxpQ0FBVyxHQUFYLFVBQVksRUFBRTtRQUNWLElBQUksU0FBUyxHQUFHLDBCQUFnQixDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDMUQsSUFBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDZCxPQUFPLElBQUksQ0FBQztTQUNmO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELG9DQUFjLEdBQWQsVUFBZSxFQUFFO1FBQ2IsSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUN0QzthQUVEO1lBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsMEJBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3hGO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLDBCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLDBCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLDBCQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFRCx3Q0FBa0IsR0FBbEIsVUFBbUIsQ0FBWTtRQUMzQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO1FBQ2hDLElBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzNGLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxrQ0FBWSxHQUFaLFVBQWEsSUFBSTtRQUNiLElBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsT0FBTztTQUNWO1FBQ0QsSUFBRyxJQUFJLEVBQUU7WUFDTCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7WUFDM0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDekMsT0FBTztTQUNWO1FBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDaEQsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBQyxDQUFDLEVBQUcsRUFBRTtZQUN4QixJQUFJLE9BQU8sR0FBZ0IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2hLLElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBRW5DLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDakosSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNwSjtJQUNMLENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxVQUFVLEdBQWUsYUFBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFnQixDQUFDO1FBQ3JGLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQzNGLGFBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDSixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsb0NBQWMsR0FBZDtRQUNJLElBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUMzQztJQUNMLENBQUM7SUFFTSxnQkFBSSxHQUFYO1FBQ0ksT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztJQUVELHNDQUFnQixHQUFoQjtRQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsaUJBQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVELDRCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztRQUNmLElBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUU7WUFDMUIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUV2QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNsRCxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUcsTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUNoQixNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNwQyxJQUFJLE9BQU8sR0FBZ0IsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hLLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQzdELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQsNEJBQU0sR0FBTjtJQUVBLENBQUM7SUFDRCwwQkFBSSxHQUFKO1FBQ0ksYUFBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RixhQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxxQkFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRixhQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxxQkFBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLDBCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFDLENBQUMsRUFBRyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUN2QztRQUNELFVBQVUsQ0FBQztZQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsMkJBQUssR0FBTDtRQUNJLGFBQUcsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLHFCQUFNLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUYsYUFBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkYsYUFBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsSUFBSTtJQUNJLGdDQUFVLEdBQWxCLFVBQW1CLEVBQVU7UUFDekIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsRUFBRztZQUN6RCxxQkFBcUI7WUFDckIsT0FBTztTQUNWO1FBQ0QsdUJBQWEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVPLG1DQUFhLEdBQXJCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUc7WUFDaEIsT0FBTztTQUNWO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFTyxrQ0FBWSxHQUFwQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFHO1lBQ2hCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzVCLENBQUM7SUFFTyxtQ0FBYSxHQUFyQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFHO1lBQ2hCLE9BQU87U0FDVjtRQUNELGtFQUFrRTtRQUNsRSx3RUFBd0U7UUFDeEUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLDBCQUFnQixDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzdELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztJQUM1QyxDQUFDO0lBQ0wsa0JBQUM7QUFBRCxDQWhRQSxBQWdRQyxDQWhRd0MsZ0JBQU0sR0FnUTlDOzs7OztBQzdSRCx5Q0FBOEI7QUFDOUIsbUNBQTZCO0FBRTdCLDBDQUFzQztBQUN0Qyx3REFBbUQ7QUFFbkQsOERBQW9EO0FBQ3BELDREQUF1RDtBQUN2RCw4REFBeUQ7QUFFekQ7SUFBOEIsbUNBQVk7SUFNdEM7UUFBQSxZQUVJLGlCQUFPLFNBT1Y7UUFORywwQkFBMEI7UUFDMUIsaUNBQWlDO1FBQ2pDLGlDQUFpQztRQUNqQyxLQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyx1QkFBYSxDQUFDLEdBQUcsRUFBQyx1QkFBYSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNuRixLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyx1QkFBUyxDQUFDLGFBQWEsRUFBQyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMvRixLQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyx1QkFBUyxDQUFDLGFBQWEsRUFBQyx1QkFBUyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFDbEcsQ0FBQztJQWJELHdDQUFjLEdBQWQ7UUFFSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFXTCxzQkFBQztBQUFELENBaEJBLEFBZ0JDLENBaEI2QixjQUFFLENBQUMsU0FBUyxHQWdCekM7QUFFRDtJQUF1Qyw2QkFBTTtJQWtDekMsbUJBQVksSUFBVztRQUF2QixZQUVJLGtCQUFNLElBQUksQ0FBQyxTQVFkO1FBcENPLFlBQU0sR0FBRyxFQUFDLEtBQUssRUFDbkI7Z0JBQ0ksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLFdBQVcsRUFBQyxZQUFZLEVBQUM7Z0JBQ25DLEVBQUMsR0FBRyxFQUFDLGNBQWMsRUFBQyxXQUFXLEVBQUMsa0JBQWtCLEVBQUM7Z0JBQ25ELEVBQUMsR0FBRyxFQUFDLGdCQUFnQixFQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUM7Z0JBQ2pELEVBQUMsR0FBRyxFQUFDLGVBQWUsRUFBQyxXQUFXLEVBQUMsbUJBQW1CLEVBQUM7Z0JBQ3JELEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsbUJBQW1CLEVBQUM7YUFDL0M7WUFDRCxLQUFLLEVBQ0w7Z0JBQ0ksRUFBQyxHQUFHLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUM7Z0JBQzNDLEVBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxXQUFXLEVBQUMsYUFBYSxFQUFDO2dCQUMzQyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQztnQkFDekMsRUFBQyxHQUFHLEVBQUMsZ0JBQWdCLEVBQUMsV0FBVyxFQUFDLGFBQWEsRUFBQzthQUNuRDtTQUNKLENBQUM7UUFjRSxLQUFJLENBQUMsRUFBRSxHQUFFLElBQUksZUFBZSxFQUFFLENBQUM7UUFDL0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsMkdBQTJHO1FBQzNHLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLEtBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyx1QkFBYSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkYsS0FBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLHVCQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUMvRSxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7SUFDN0IsQ0FBQztJQTFDTSxjQUFJLEdBQVg7UUFFSSxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBb0JELHFDQUFpQixHQUFqQjtRQUNJLEtBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUN4QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNsQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsR0FBRyxFQUFDLENBQUMsRUFBRyxFQUFFO2dCQUN4QixJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsMEJBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2FBQ25IO1NBQ0o7SUFDTCxDQUFDO0lBY0QsMEJBQU0sR0FBTjtJQUdBLENBQUM7SUFFRCwwQkFBTSxHQUFOO1FBQ0ksaUJBQU0sTUFBTSxXQUFFLENBQUM7UUFDZixJQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hCLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUNwQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDMUMsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0EzREEsQUEyREMsQ0EzRHNDLGdCQUFNLEdBMkQ1Qzs7Ozs7QUN2RkQseUNBQWdDO0FBQ2hDLDBDQUF3QztBQUN4QyxtQ0FBNkI7QUFJN0IsOERBQXdEO0FBQ3hELGtEQUFnRDtBQUNoRCw4REFBeUQ7QUFHekQ7SUFBZ0MscUNBQVU7SUFLdEM7UUFBQSxZQUNJLGlCQUFPLFNBZVY7UUFkRyw0QkFBNEI7UUFDNUIsa0NBQWtDO1FBQ2xDLGtDQUFrQztRQUNsQyxLQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFJLEVBQUUsS0FBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDcEUsaUVBQWlFO1FBQ2pFLEtBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLHVCQUFhLENBQUMsYUFBYSxFQUFFLHVCQUFhLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNHLDBHQUEwRztRQUMxRyx1R0FBdUc7UUFDdkcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVyRCxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDcEMsOEJBQThCO1FBQzlCLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7SUFDakQsQ0FBQztJQW5CRCwwQ0FBYyxHQUFkO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBbUJELDhDQUFrQixHQUFsQjtRQUNJLElBQUksSUFBSSxHQUFHLHVCQUFhLENBQUMsYUFBYSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDNUQsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsbUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEgsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyx1QkFBYSxDQUFDLGFBQWEsRUFBRSx1QkFBYSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2xNLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFB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QUksR0FReEM7SUFSWSxhQUFVLGFBUXRCLENBQUE7SUFDRCxHQUFHLENBQUMsZUFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsRUE3SmEsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBNkpmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCAqIGFzIFBsYXllckVudGl0eSBmcm9tIFwiLi9QbGF5ZXJFbnRpdHlcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlQWdlbnRcclxue1xyXG4gICAgcHJvdGVjdGVkIG1fUGxheWVyRW50aXR5OlBsYXllckVudGl0eS5QbGF5ZXIuUGxheWVyRW50aXR5O1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkgPSBQbGF5ZXJFbnRpdHkuUGxheWVyLlBsYXllckVudGl0eS5FbnRpdHk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lTW9kdWxlXCJcclxuaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi8uLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBHYW1lQVBQIGZyb20gXCIuLi9jb250cm9sZXIvR2FtZUFQUFwiO1xyXG5pbXBvcnQgQmFzZUFnZW50IGZyb20gXCIuL0Jhc2VBZ2VudFwiXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZUFnZW50IGV4dGVuZHMgQmFzZUFnZW50IHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9BZ2VudDogR2FtZUFnZW50O1xyXG4gICAgc3RhdGljIGdldCBBZ2VudCgpOiBHYW1lQWdlbnQge1xyXG4gICAgICAgIGlmICh0aGlzLl9BZ2VudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FnZW50ID0gbmV3IEdhbWVBZ2VudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQWdlbnQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1fVXNlSXRlbU51bTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1NraWxsSXRlbUlEOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fU2tpbGxJdGVtTnVtOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGdldCBDdXJMZXZlbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckxldmVsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBDdXJMZXZlbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJMZXZlbCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDdXJNYXhMZXZlbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lkhpc3RvcnlNYXhMZXZlbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VyQ2hhcmFjdGVySUQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJDaGFyYWN0ZXJJRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VySXRlbSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEl0ZW1MaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lkl0ZW1MaXN0XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IEN1ckl0ZW0oaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5JdGVtTGlzdFtpZF0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW0gPSBpZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgR2FtZUl0ZW1OdW0oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtTnVtIDwgdGhpcy5tX1VzZUl0ZW1OdW0gPyB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW1OdW0gOiB0aGlzLm1fVXNlSXRlbU51bTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgU2tpbGxJdGVtTnVtKCk6IG51bWJlciAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fU2tpbGxJdGVtTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZEdvbGQoZ29sZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCFnb2xkIHx8IGdvbGQgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbW9uZXkgPSB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5ICsgZ29sZDtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5ID0gbW9uZXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZFNjb3JlKHNjb3JlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXNjb3JlIHx8IHNjb3JlIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNjb3JlID0gdGhpcy5tX1BsYXllckVudGl0eS5DdXJTY29yZSArIHNjb3JlO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyU2NvcmUgPSBzY29yZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IEN1clNjb3JlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyU2NvcmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlc2V0R2FtZUl0ZW0oKSB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoUGxheWVyLkV2ZW50Lk9uQ3VySXRlbU51bUNoYW5nZSk7XHJcbiAgICAgICAgdGhpcy5tX1VzZUl0ZW1OdW0gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldFNraWxsSXRlbSgpIHtcclxuICAgICAgICB2YXIgQ2hhcmFjdGVySUQ6IG51bWJlciA9IHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdGhpcy5tX1NraWxsSXRlbU51bSA9IEdhbWVBUFAuQ2hhcmFjdGVyTWdyLkdldFNraWxsSXRlbShDaGFyYWN0ZXJJRCkgPCAwID8gMCA6IDE7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoR2FtZU1vZHVsZS5FdmVudC5PbkNoYXJhY3Rlckl0ZW1DaGFuZ2UpO1xyXG4gICAgICAgIHRoaXMubV9Ta2lsbEl0ZW1OdW0gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVc2VHYW1lSXRlbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5HYW1lSXRlbU51bSA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC0tdGhpcy5tX1VzZUl0ZW1OdW07XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5SZWR1Y2VJdGVtKHRoaXMuQ3VySXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVzZVNraWxsSXRlbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5Ta2lsbEl0ZW1OdW0gPCAxKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC0tdGhpcy5tX1NraWxsSXRlbU51bTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShHYW1lTW9kdWxlLkV2ZW50Lk9uQ2hhcmFjdGVySXRlbUNoYW5nZSk7XHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IHsgV2VjaGF0T3BlbiB9IGZyb20gXCIuLi9wbGF0Zm9ybS9XZWNoYXRPcGVuXCI7XHJcblxyXG5leHBvcnQgbW9kdWxlIFBsYXllciB7XHJcbiAgICBleHBvcnQgY2xhc3MgRXZlbnQge1xyXG4gICAgICAgIHN0YXRpYyBPbk1vbmV5Q2hhbmdlOiBzdHJpbmcgPSBcIk9uTW9uZXlDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJDaGFyYWN0ZXJJRENoYW5nZTogc3RyaW5nID0gXCJPbkN1ckNoYXJhY3RlcklEQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uSGlzdG9yeU1heExldmVsQ2hhbmdlOiBzdHJpbmcgPSBcIk9uSGlzdG9yeU1heExldmVsQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VyTGV2ZWxDaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJMZXZlbENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkNoYXJhY3Rlckxpc3RDaGFuZ2U6IHN0cmluZyA9IFwiT25DaGFyYWN0ZXJMaXN0Q2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VySXRlbUNoYW5nZTogc3RyaW5nID0gXCJPbkN1ckl0ZW1DaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25JdGVtTGlzdENoYW5nZTogc3RyaW5nID0gXCJPbkl0ZW1MaXN0Q2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VyU2NvcmVDaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJTY29yZUNoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckl0ZW1OdW1DaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJJdGVtTnVtQ2hhbmdlXCJcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyRW50aXR5IHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBtX0VudGl0eTogUGxheWVyRW50aXR5O1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEVudGl0eSgpOiBQbGF5ZXJFbnRpdHkge1xyXG4gICAgICAgICAgICBpZiAoIVBsYXllckVudGl0eS5tX0VudGl0eSkge1xyXG4gICAgICAgICAgICAgICAgUGxheWVyRW50aXR5Lm1fRW50aXR5ID0gbmV3IFBsYXllckVudGl0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUGxheWVyRW50aXR5Lm1fRW50aXR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIG1fRnJhbWVXb3JrOiBGcmFtZVdvcms7XHJcbiAgICAgICAgcHJpdmF0ZSBtX01lc3NhZ2VNZ3I6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG5cclxuICAgICAgICAvL+mSsVxyXG4gICAgICAgIHByaXZhdGUgbV9Nb25leTogbnVtYmVyO1xyXG4gICAgICAgIC8v6YCJ5Lit6KeS6ImySURcclxuICAgICAgICBwcml2YXRlIG1fQ3VyQ2hhcmFjdGVySUQ6IG51bWJlcjtcclxuICAgICAgICAvL+eOqeWutuW3suino+mUgeeahOacgOmrmOWFs+WNoVxyXG4gICAgICAgIHByaXZhdGUgbV9IaXN0b3J5TWF4TGV2ZWw6IG51bWJlcjtcclxuICAgICAgICAvL+W9k+WJjemAieS4reWFs+WNoVxyXG4gICAgICAgIHByaXZhdGUgbV9DdXJMZXZlbDogbnVtYmVyO1xyXG4gICAgICAgIC8v6KeS6Imy5YiX6KGoXHJcbiAgICAgICAgcHJpdmF0ZSBtX0NoYXJhY3Rlckxpc3Q6IEFycmF5PG51bWJlcj47XHJcbiAgICAgICAgLy/lvZPliY3mi6XpgInkuK3pgZPlhbdcclxuICAgICAgICBwcml2YXRlIG1fQ3VySXRlbTogbnVtYmVyO1xyXG4gICAgICAgIC8v54mp5ZOB5YiX6KGoXHJcbiAgICAgICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8v56ev5YiGXHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1clNjb3JlOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgTW9uZXkoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9Nb25leTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBNb25leSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLm1fTW9uZXkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fTW9uZXkgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5Pbk1vbmV5Q2hhbmdlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1ckNoYXJhY3RlcklEKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ3VyQ2hhcmFjdGVySUQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdGhpcy5tX0N1ckNoYXJhY3RlcklEKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1ckNoYXJhY3RlcklEID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJDaGFyYWN0ZXJJRENoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VyTGV2ZWwoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJMZXZlbCA/IHRoaXMubV9DdXJMZXZlbCA6IHRoaXMubV9IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ3VyTGV2ZWwodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdGhpcy5DdXJMZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJMZXZlbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VyTGV2ZWxDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEhpc3RvcnlNYXhMZXZlbCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0hpc3RvcnlNYXhMZXZlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBIaXN0b3J5TWF4TGV2ZWwodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdGhpcy5tX0hpc3RvcnlNYXhMZXZlbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5Pbkhpc3RvcnlNYXhMZXZlbENoYW5nZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDaGFyYWN0ZXJMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1ckl0ZW0odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdGhpcy5tX0N1ckl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fQ3VySXRlbSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VySXRlbUNoYW5nZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJJdGVtKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VySXRlbTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJJdGVtTnVtKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkdldEl0ZW1OdW0odGhpcy5DdXJJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBJdGVtTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9JdGVtTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJTY29yZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1clNjb3JlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1clNjb3JlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9DdXJTY29yZSA9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyU2NvcmUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgV2VjaGF0T3Blbi5nZXRJbnN0YW5jZXMoKS51cGRhdGVTY29yZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJTY29yZUNoYW5nZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdmFyIGludGVyZXN0aW5nbGlmZSA9IChMYXlhLkxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiSW50ZXJlc3RpbmdsaWZlXCIpICE9IG51bGwgPyBKU09OLnBhcnNlKExheWEuTG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJJbnRlcmVzdGluZ2xpZmVcIikpIDoge30pO1xyXG4gICAgICAgICAgICB0aGlzLm1fTW9uZXkgPSBpbnRlcmVzdGluZ2xpZmUubV9Nb25leSB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQgPSBpbnRlcmVzdGluZ2xpZmUubV9DdXJDaGFyYWN0ZXJJRHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9DaGFyYWN0ZXJMaXN0ID0gaW50ZXJlc3RpbmdsaWZlLm1fQ2hhcmFjdGVyTGlzdCB8fCBbMSwwLDAsMCwwXTtcclxuICAgICAgICAgICAgdGhpcy5tX0hpc3RvcnlNYXhMZXZlbCA9IGludGVyZXN0aW5nbGlmZS5tX0hpc3RvcnlNYXhMZXZlbCB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VySXRlbSA9IGludGVyZXN0aW5nbGlmZS5tX0N1ckl0ZW0gfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5tX0ZyYW1lV29yayA9IEZyYW1lV29yay5GTTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBpbnRlcmVzdGluZ2xpZmUubV9JdGVtTGlzdCB8fCBbXTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1clNjb3JlID0gaW50ZXJlc3RpbmdsaWZlLm1fQ3VyU2NvcmUgfHwgMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzYXZlRGF0YVRvTG9jYWwoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciBsb2NhbERhdGE6YW55ID0ge307XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX01vbmV5ID0gdGhpcy5tX01vbmV5O1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9DdXJDaGFyYWN0ZXJJRCA9IHRoaXMubV9DdXJDaGFyYWN0ZXJJRDtcclxuICAgICAgICAgICAgbG9jYWxEYXRhLm1fQ2hhcmFjdGVyTGlzdCA9IHRoaXMubV9DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9IaXN0b3J5TWF4TGV2ZWwgPSB0aGlzLm1fSGlzdG9yeU1heExldmVsO1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9DdXJJdGVtID0gdGhpcy5tX0N1ckl0ZW07XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0l0ZW1MaXN0ID0gdGhpcy5tX0l0ZW1MaXN0O1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9DdXJTY29yZSA9IHRoaXMubV9DdXJTY29yZTtcclxuICAgICAgICAgICAgTGF5YS5Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkludGVyZXN0aW5nbGlmZVwiLCBsb2NhbERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgQWRkQ2hhcmFjdGVyKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3RbaWRdID0gMTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkNoYXJhY3Rlckxpc3RDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFkZEl0ZW0oaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubV9JdGVtTGlzdFtpZF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9JdGVtTGlzdFtpZF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICsrdGhpcy5tX0l0ZW1MaXN0W2lkXTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlKTtcclxuICAgICAgICAgICAgaWYgKGlkID09IHRoaXMuQ3VySXRlbSlcclxuICAgICAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJJdGVtTnVtQ2hhbmdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWR1Y2VJdGVtKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm1fSXRlbUxpc3RbaWRdIHx8IHRoaXMubV9JdGVtTGlzdFtpZF0gPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAtLXRoaXMubV9JdGVtTGlzdFtpZF07XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25JdGVtTGlzdENoYW5nZSk7XHJcbiAgICAgICAgICAgIGlmIChpZCA9PSB0aGlzLkN1ckl0ZW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VySXRlbU51bUNoYW5nZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgR2V0SXRlbU51bShpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBudW06IG51bWJlciA9IHRoaXMubV9JdGVtTGlzdFtpZF07XHJcbiAgICAgICAgICAgIG51bSA9IG51bSA/IG51bSA6IDA7XHJcbiAgICAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBCYXNlQWdlbnQgZnJvbSBcIi4vQmFzZUFnZW50XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJHdWVzdEFnZW50IGV4dGVuZHMgQmFzZUFnZW50IHtcclxuICAgIHN0YXRpYyBfQWdlbnQ6IFBsYXllckd1ZXN0QWdlbnQ7XHJcbiAgICBzdGF0aWMgZ2V0IEd1ZXN0QWdlbnQoKTogUGxheWVyR3Vlc3RBZ2VudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0FnZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQWdlbnQgPSBuZXcgUGxheWVyR3Vlc3RBZ2VudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQWdlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBTa2luRGlyKCk6U3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJlbnRlcnNjZW5ldWkvcmVzMi9cIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IE1vbmV5KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IENoYXJhY3RlcklEKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IENoYXJhY3Rlckxpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ2hhcmFjdGVyTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IEl0ZW1MaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lkl0ZW1MaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTsgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJ1eUNoYXJhY3RlcihpZDogbnVtYmVyKSAge1xyXG4gICAgICAgIHZhciBwcmljZSA9IEdhbWVBUFAuQ2hhcmFjdGVyTWdyLkdldFByaWNlKGlkKTtcclxuICAgICAgICBpZiAoaWQgPCAwfHwgcHJpY2UgPDAgfHwgcHJpY2UgPiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5KSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkgLT0gcHJpY2U7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5BZGRDaGFyYWN0ZXIoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlJdGVtKGlkOiBudW1iZXIpICB7XHJcbiAgICAgICAgdmFyIHByaWNlID0gR2FtZUFQUC5JdGVtTWdyLkdldFByaWNlKGlkKTtcclxuICAgICAgICBpZihpZCA8IDB8fCBwcmljZSA8MCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHByaWNlID4gdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSAtPSBwcmljZTtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkFkZEl0ZW0oaWQpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRDaGFyYWN0ZXIoaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3Rlckxpc3Q6QXJyYXk8bnVtYmVyPiA9IHRoaXMuQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICBpZihjaGFyYWN0ZXJMaXN0W2lkXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyQ2hhcmFjdGVySUQgPSBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIEJhc2VFbnVtIHtcclxuICAgIGV4cG9ydCBlbnVtIFVJVHlwZUVudW0ge0xvdyxNaWRsZX07XHJcbn0iLCJpbXBvcnQgQmFzZU1nciBmcm9tIFwiLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCI7XHJcbi8qKlxyXG4gKiDlrprkuYnln7rnoYDnu5PmnoTkvZNcclxuICovXHJcbmV4cG9ydCBtb2R1bGUgQmFzZUZ1bmMge1xyXG4gICAgZW51bSBVSVR5cGVFbnVtIHsgTG93LCBNaWRsZSB9O1xyXG4gICAgZXhwb3J0IGNsYXNzIE1hcDxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX0NvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfTWFwOiB7IFtrZXk6IHN0cmluZ106IFQgfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5fTWFwID0ge307XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvckVhY2goY2FsbGJhY2s6IChtZ3I6IFQsIGtleTogc3RyaW5nKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG1hcEtleSBpbiB0aGlzLl9NYXApIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMuX01hcFttYXBLZXldLCBtYXBLZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBvYmog5pS+5YWl5a+56LGhXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDplK5cclxuICAgICAgICAgKi9cclxuICAgICAgICBTZXQob2JqOiBULCBrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX01hcFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICArK3RoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX01hcFtrZXldID0gb2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHZXQoa2V5OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX01hcFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOenu+mZpOafkOS4quWvueixoVxyXG4gICAgICAgICAqIEByZXR1cm5zIOiiq+enu+mZpOWvueixoVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFJlbW92ZShrZXk6IHN0cmluZyk6IFQge1xyXG4gICAgICAgICAgICB2YXIgT2JqOiBUID0gdGhpcy5fTWFwW2tleV07XHJcbiAgICAgICAgICAgIGlmIChPYmopIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX01hcFtrZXldID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIE9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDplK5cclxuICAgICAgICAgKiBAcmV0dXJucyDmmK/lkKbmi6XmnIlcclxuICAgICAgICAgKi9cclxuICAgICAgICBIYXMoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX01hcFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBOb2RlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfVmFsdWU6IFQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfTmV4dDogTm9kZTxUPjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFZhbHVlKCk6IFQge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBWYWx1ZSh2YWx1ZTogVCkge1xyXG4gICAgICAgICAgICB0aGlzLl9WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgTmV4dCgpOiBOb2RlPFQ+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX05leHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBOZXh0KG5vZGU6IE5vZGU8VD4pIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX05leHQgPSBub2RlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBOb2RlUG9vbDxUPlxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBfTm9kZUxpc3Q6IE5vZGU8VD47XHJcbiAgICAgICAgUHVsbEJhY2sobm9kZTogTm9kZTxUPikge1xyXG4gICAgICAgICAgICBub2RlLlZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgbm9kZS5OZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX05vZGVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Ob2RlTGlzdC5OZXh0ID0gbm9kZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0ID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBBcXVpcmUoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOiBOb2RlPFQ+ID0gdGhpcy5fTm9kZUxpc3Q7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Ob2RlTGlzdCA9IHRoaXMuX05vZGVMaXN0Lk5leHQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBOb2RlUXVldWU8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Db3VudDtcclxuICAgICAgICBwcml2YXRlIF9IZWFkOiBOb2RlPFQ+XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFpbGVcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQb3BOb2RlKCk6IE5vZGU8VD4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fQ291bnQgPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIG5vZGU6IE5vZGU8VD4gPSBudWxsO1xyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5fSGVhZDtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZCA9IHRoaXMuX0hlYWQuTmV4dDtcclxuICAgICAgICAgICAgbm9kZS5OZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgLS10aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgLy/liKvmiorlsL7lt7TluKblh7rljrvkuoZcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0NvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoKHZhbHVlOiBUKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOiBOb2RlPFQ+ID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLlB1c2hOb2RlKG5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1c2hOb2RlKG5vZGU6IE5vZGU8VD4pIHtcclxuICAgICAgICAgICAgbm9kZS5OZXh0ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0NvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWQgPSBub2RlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbGUuTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fVGFpbGUgPSBub2RlO1xyXG4gICAgICAgICAgICArK3RoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgQ2xlYXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fVGFpbGUgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIZWFkTm9kZSgpOiBOb2RlPFQ+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSGVhZE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGVhZFZhbHVlKCk6IFQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fSGVhZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0hlYWQuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBUYWlsTm9kZSgpOiBOb2RlPFQ+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVGFpbE5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGFpbFZhbHVlKCk6IFQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGFpbGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9UYWlsZS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUXVldWU8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Ob2RlUG9vbDogTm9kZVBvb2w8VD47XHJcbiAgICAgICAgcHJpdmF0ZSBfTm9kZVF1ZXVlOiBOb2RlUXVldWU8VD47XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUG9vbCA9IG5ldyBOb2RlUG9vbDxUPigpO1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUXVldWUgPSBuZXcgTm9kZVF1ZXVlPFQ+KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaCh2YWx1ZTogVCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IHRoaXMuX05vZGVQb29sLkFxdWlyZSgpO1xyXG4gICAgICAgICAgICBub2RlLlZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVRdWV1ZS5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQb3AoKTogVCB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOiBOb2RlPFQ+ID0gdGhpcy5fTm9kZVF1ZXVlLlBvcE5vZGUoKTtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlLlZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVQb29sLlB1bGxCYWNrKG5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTm9kZVF1ZXVlLkNvdW50O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBTbW9vdGhEYW1wVmVjdG9yMyB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1cnJlbnRWZWxvY2l0eTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9TbW9vdGhUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBtX01heFNwZWVkOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBtX01heE1vdmVOdW06bnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNtb290aFRpbWU6IG51bWJlciwgbWF4U3BlZWQ6IG51bWJlciA9IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJyZW50VmVsb2NpdHkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fU21vb3RoVGltZSA9IHNtb290aFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NYXhTcGVlZCA9IG1heFNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWF4TW92ZU51bSA9IHRoaXMubV9NYXhTcGVlZCAqIHRoaXMubV9TbW9vdGhUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgU21vb3RoRGFtcChjdXJyZW50Om51bWJlcix0YXJnZXQ6bnVtYmVyLGRlbHRhVGltZTpudW1iZXIgPSAxLzYwKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBudW06bnVtYmVyID0gMi90aGlzLm1fU21vb3RoVGltZTtcclxuICAgICAgICAgICAgdmFyIG51bTI6bnVtYmVyID0gbnVtICogZGVsdGFUaW1lO1xyXG4gICAgICAgICAgICB2YXIgbnVtMzpudW1iZXIgPSAxLygxK251bTIrMC40OCpudW0yKm51bTIrMC4yMzUqbnVtMipudW0yKm51bTIpO1xyXG4gICAgICAgICAgICB2YXIgbnVtNDpudW1iZXIgPSBjdXJyZW50IC0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB2YXIgbnVtNTpudW1iZXIgPSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHZhciBudW02Om51bWJlciA9IHRoaXMubV9NYXhTcGVlZCAqIHRoaXMubV9TbW9vdGhUaW1lO1xyXG4gICAgICAgICAgICBudW00ID0gbnVtNCA+LW51bTYmJm51bTQ8bnVtNj9udW00OihudW00Pm51bTY/bnVtNjotbnVtNik7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IGN1cnJlbnQgLSBudW00O1xyXG4gICAgICAgICAgICB2YXIgbnVtNzpudW1iZXIgPSAodGhpcy5tX0N1cnJlbnRWZWxvY2l0eStudW0qbnVtNCkqZGVsdGFUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VycmVudFZlbG9jaXR5ID0gKHRoaXMubV9DdXJyZW50VmVsb2NpdHkgLSBudW0qbnVtNykqbnVtMztcclxuICAgICAgICAgICAgdmFyIG51bTg6bnVtYmVyID0gdGFyZ2V0ICsobnVtNCtudW03KSpudW0zO1xyXG4gICAgICAgICAgICBpZihudW01IC0gY3VycmVudCA+IDAgPT0gbnVtOD5udW01KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBudW04ID0gbnVtNTtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9DdXJyZW50VmVsb2NpdHkgPSAobnVtOCAtIG51bTUpL2RlbHRhVGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbnVtODtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICBwdWJsaWMgQ291bnQoY3VyUFM6IExheWEuVmVjdG9yMywgdGFyZ2V0UFM6IExheWEuVmVjdG9yMywgZGVsdGFUaW1lOiBudW1iZXIgPSAxIC8gNjApOkxheWEuVmVjdG9yMyB7XHJcbiAgICAgICAgICAgIHZhciBtYXhNb3ZlOiBudW1iZXIgPSB0aGlzLm1fTWF4TW92ZU51bTtcclxuICAgICAgICAgICAgdmFyIHJ1blRpbWVSYXRlOiBudW1iZXIgPSAyICogZGVsdGFUaW1lIC8gdGhpcy5tX1Ntb290aFRpbWU7XHJcbiAgICAgICAgICAgIHZhciB0aW1lUmF0aW86IG51bWJlciA9IDEgLyAoMSArIHJ1blRpbWVSYXRlICsgMC40OCAqIHJ1blRpbWVSYXRlICogcnVuVGltZVJhdGUgKyAwLjIzNSAqIHJ1blRpbWVSYXRlICogcnVuVGltZVJhdGUgKiBydW5UaW1lUmF0ZSk7XHJcbiAgICAgICAgICAgIHZhciBnYXA6IExheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBTLCBjdXJQUywgZ2FwKTtcclxuICAgICAgICAgICAgdmFyIG1vdmVEaXI6IExheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLm5vcm1hbGl6ZShnYXAsIG1vdmVEaXIpO1xyXG4gICAgICAgICAgICAvL+mAn+W6puS/ruato1xyXG4gICAgICAgICAgICB2YXIgbW92ZURpc3RhbmNlOiBudW1iZXIgPSBMYXlhLlZlY3RvcjMuZGlzdGFuY2UodGFyZ2V0UFMsIGN1clBTKTtcclxuICAgICAgICAgICAgbW92ZURpc3RhbmNlID0gbW92ZURpc3RhbmNlIDwgbWF4TW92ZSAmJiBtb3ZlRGlzdGFuY2UgPiAtbWF4TW92ZSA/IG1vdmVEaXN0YW5jZSA6IChtb3ZlRGlzdGFuY2UgPiBtYXhNb3ZlID8gbWF4TW92ZSA6IC1tYXhNb3ZlKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjdXJNb3ZlRGlzdGFjbmU6bnVtYmVyID0gKCB0aGlzLm1fQ3VycmVudFZlbG9jaXR5ICsgMioobW92ZURpc3RhbmNlL3RoaXMubV9TbW9vdGhUaW1lKSkqZGVsdGFUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VycmVudFZlbG9jaXR5ID0gKHRoaXMubV9DdXJyZW50VmVsb2NpdHkgLSAyKmN1ck1vdmVEaXN0YWNuZS90aGlzLm1fU21vb3RoVGltZSkqdGltZVJhdGlvO1xyXG4gICAgICAgICAgICB2YXIgZW5kUFM6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjYWxlID0gKG1vdmVEaXN0YW5jZSArIGN1ck1vdmVEaXN0YWNuZSkqdGltZVJhdGlvO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUobW92ZURpcixzY2FsZSxlbmRQUyk7XHJcbiAgICAgICAgICAgIC8vTGF5YS5WZWN0b3IzLmFkZCh0YXJnZXRQUyxlbmRQUyxlbmRQUylcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLmFkZChjdXJQUyxlbmRQUyxlbmRQUyk7XHJcbiAgICAgICAgICAgIHZhciBlbmRNb3ZlRGlyOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KGN1clBTLGVuZFBTLGVuZE1vdmVEaXIpOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiggTGF5YS5WZWN0b3IzLmRvdChtb3ZlRGlyLGVuZE1vdmVEaXIpIDwgMCApLy9MYXlhLlZlY3RvcjMuZGlzdGFuY2UodGFyZ2V0UFMsY3VyUFMpICogTGF5YS5WZWN0b3IzLmRpc3RhbmNlKHRhcmdldFBTLGVuZFBTKTwwIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZW5kUFMgPSB0YXJnZXRQUztcclxuICAgICAgICAgICAgICAgIHRoaXMubV9DdXJyZW50VmVsb2NpdHkgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBlbmRQUztcclxuICAgICAgICAgICAgLy9MYXlhLlZlY3RvcjMuc2NhbGUobW92ZURpcixtb3ZlRGlzdGFuY2UsZW5kKTtcclxuICAgICAgICAgICAgLy90YXJnZXRQUyArIExheWEuVmVjdG9yMy5hZGQobW92ZURpc3RhbmNlLGN1ck1vdmVEaXN0YWNuZSxlbmRTcGVlZCkgKG1vdmVEaXN0YW5jZSArIGN1ck1vdmVEaXN0YWNuZSk7XHJcbiAgICAgICAgfSovXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgICAgICBleHBvcnQgY2xhc3MgTGlua05vZGVMaXN0PFQ+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwcml2YXRlIF9IZWFkTm9kZTpOb2RlPFQ+O1xyXG4gICAgICAgICAgICBwcml2YXRlIF9UYWlsTm9kZTpOb2RlPFQ+O1xyXG4gICAgXHJcbiAgICAgICAgICAgIHByaXZhdGUgX0NvdW50Tm9kZTpudW1iZXI7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fSGVhZE5vZGUgPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fSGVhZE5vZGUuTmV4dCA9IHRoaXMuX0hlYWROb2RlO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsTm9kZSA9IHRoaXMuX0hlYWROb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiDojrflj5blpLTnu5PngrnlgLxcclxuICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBnZXQgSGVhZFZhbHVlKCk6VFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHRoaXMuX0hlYWROb2RlLlZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBBZGQodmFsdWU6VClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld05vZGU6Tm9kZTxUPiA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgICAgICBuZXdOb2RlLlZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFkZE5vZGUobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQWRkTm9kZShuZXdOb2RlOk5vZGU8VD4pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX1RhaWxOb2RlIT10aGlzLl9IZWFkTm9kZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9UYWlsTm9kZS5OZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgICAgIH1lbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fSGVhZE5vZGUuTmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsTm9kZSA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9Ki9cclxuXHJcbn0iLCJleHBvcnQgbW9kdWxlIEZTTSBcclxue1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRlNNXHJcbiAgICB7XHJcbiAgICAgICAgVXBkYXRlKCk7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgRlNNIDxUIGV4dGVuZHMgU3RhdGU+IFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgbV9DdXJTdGF0ZTpUO1xyXG4gICAgICAgIHByaXZhdGUgbV9TdGF0ZURpY3Q6e1tuYW1lOnN0cmluZ106VH07XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBzdGFydFN0YXRlOlQgPSBudWxsIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTdGF0ZSA9IHN0YXJ0U3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ3VyU3RhdGUoKTpUXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5pS55Y+Y54q25oCBXHJcbiAgICAgICAgICogQHBhcmFtIHN0YXRlIOiuvue9rueKtuaAgVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBDaGFuZ2VTdGF0ZShzdGF0ZTpUKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhdGUuU2V0T3duZXIodGhpcyk7XHJcbiAgICAgICAgICAgIHZhciBjdXJTdGF0ZTpUID0gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgICAgICBpZihjdXJTdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhdGUuRW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VyU3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgY3VyU3RhdGUuU3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1clN0YXRlID0gY3VyU3RhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGN1clN0YXRlID0gdGhpcy5tX0N1clN0YXRlO1xyXG4gICAgICAgICAgICBpZihjdXJTdGF0ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY3VyU3RhdGUuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0YXRlXHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fb3duZXI6SUZTTTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3Rvcihvd25lcjpJRlNNID0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9vd25lciA9IG93bmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFNldE93bmVyKG93bmVyOklGU00pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fb3duZXIgPSBvd25lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGUoKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgRW5kKCk7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFN0YXJ0KCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlTWdyXHJcbntcclxuICAgIHB1YmxpYyBhYnN0cmFjdCBVcGRhdGUoKTtcclxufSIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5pbXBvcnQge0Jhc2VGdW5jfSAgZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyYW1lV29ya1xyXG57XHJcbiAgICBfTWdyTWFwOkJhc2VGdW5jLk1hcDxCYXNlTWFuYWdlcj47Ly9CYXNlU3RydWN0Lk1hcDxCYXNlTWFuYWdlcj47XHJcbiAgICBfVGVtTWdyTGlzdDpBcnJheTxCYXNlTWFuYWdlcj47XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwID0gbmV3IEJhc2VGdW5jLk1hcDxCYXNlTWFuYWdlcj4oKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIF9GTTpGcmFtZVdvcms7XHJcbiAgICBzdGF0aWMgZ2V0IEZNKCk6RnJhbWVXb3JrXHJcbiAgICB7XHJcbiAgICAgICAgaWYoRnJhbWVXb3JrLl9GTT09bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZyYW1lV29yay5fRk0gPSBuZXcgRnJhbWVXb3JrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBGcmFtZVdvcmsuX0ZNO1xyXG4gICAgfVxyXG4gICAgLy9jb25zdHJ1Y3RvclxyXG4gICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbXBNZ3JMaXN0ID0gbmV3IEFycmF5PEJhc2VNYW5hZ2VyPih0aGlzLl9NZ3JNYXAuQ291bnQpO1xyXG4gICAgICAgIHRoaXMuX01nck1hcC5mb3JFYWNoKCAobWdyOkJhc2VNYW5hZ2VyICwga2V5OnN0cmluZyk6dm9pZCA9PntcclxuICAgICAgICAgICAgdGVtcE1nckxpc3QucHVzaChtZ3IpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGVtcE1nckxpc3QuZm9yRWFjaCgobWdyLGlkeCk9PnttZ3IuVXBkYXRlKCk7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZE1hbmFnZXI8VCBleHRlbmRzIEJhc2VNYW5hZ2VyPiggdHlwZTp7bmV3ICgpOiBUOyBOYW1lKCk6c3RyaW5nIH0gKTpUXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fTWdyTWFwLkhhcyh0eXBlLk5hbWUoKSkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTWdyTWFwLkdldCh0eXBlLk5hbWUoKSkgYXMgVDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld01ncjpUID0gbmV3IHR5cGUoKTtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAuU2V0KG5ld01ncix0eXBlLk5hbWUoKSk7XHJcbiAgICAgICAgcmV0dXJuICBuZXdNZ3I7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBHZXRNYW5hZ2VyPFQgZXh0ZW5kcyBCYXNlTWFuYWdlcj4odHlwZTp7bmV3ICgpOiBUOyBOYW1lKCk6c3RyaW5nIH0pOlR7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX01nck1hcC5HZXQodHlwZS5OYW1lKCkpIGFzIFQ7XHJcbiAgICB9XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog5raI5oGv5o6n5Yi25ZmoXHJcbiAqL1xyXG5pbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuZXhwb3J0IG1vZHVsZSBNZXNzYWdlTUQge1xyXG4gICAgZXhwb3J0IGNvbnN0IEdhbWVFdmVudCA9XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQbGF5ZXJEZWF0aDogXCJQbGF5ZXJEZWF0aFwiLFxyXG4gICAgICAgICAgICBHYW1lVGltZVVwOiBcIkdhbWVUaW1lVXBcIixcclxuICAgICAgICAgICAgR2FtZUNvbnRpbnVlOiBcIkdhbWVDb250aW51ZVwiXHJcbiAgICAgICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBNZXNzYWdlQ2VudGVyIGV4dGVuZHMgQmFzZU1hbmFnZXIgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiTWVzc2FnZUNlbnRlclwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBfTWdyOiBNZXNzYWdlQ2VudGVyO1xyXG4gICAgICAgIHByaXZhdGUgX0V2ZW50RGljdDogeyBbS2V5OiBzdHJpbmddOiBNRXZlbnQgfTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+W5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHJpdmF0ZSBfR2V0RXZlbnQobmFtZTogc3RyaW5nKTogTUV2ZW50ICB7XHJcbiAgICAgICAgICAgIHZhciBldmVudDogTUV2ZW50ID0gdGhpcy5fRXZlbnREaWN0W25hbWVdO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQgPT0gdW5kZWZpbmVkIHx8IGV2ZW50ID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBNRXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0V2ZW50RGljdFtuYW1lXSA9IGV2ZW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGV2ZW50ID0gdGhpcy5fRXZlbnREaWN0W25hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gZXZlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0ID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog5rOo5YaMXHJcbiAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIOebkeWQrOiAhVxyXG4gICAgICAgICogQHBhcmFtIHtPYmp9IG93bmVyIOaLpeacieiAhVxyXG4gICAgICAgICovXHJcbiAgICAgICAgUmVnaXN0KG5hbWU6IHN0cmluZywgbGlzdGVuZXI6ICgpID0+IHZvaWQsIG93bmVyOiBPYmplY3QpOk1FdmVudCAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6IE1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICB2YXIgbmV3RGxndDogRGVsZWdhdGUgPSBuZXcgRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuQWRkKG5ld0RsZ3QpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0RXZlbnRcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOmUgOafkOS4quebkeWQrFxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIOebkeWQrOiAhVxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqfSBvd25lciDmi6XmnInogIVcclxuICAgICAgICAgKi9cclxuICAgICAgICBEZXNSZWdpc3QobmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogKCkgPT4gdm9pZCwgb3duZXI6IE9iamVjdCkgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuUm12KGxpc3RlbmVyLCBvd25lcilcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOmUgOafkOS4quS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERlc1JnaXN0SURLKG5hbWU6IHN0cmluZykgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuUmVzZXQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBGaXJlKG5hbWU6IHN0cmluZywgcGFyYW06IGFueSA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQgIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lp5TmiZhcclxuICAgIGV4cG9ydCBjbGFzcyBEZWxlZ2F0ZSB7XHJcbiAgICAgICAgTGlzdGVuZXI6IE9iamVjdDtcclxuICAgICAgICBBY3Rpb246IChwYXJhbTphbnkpID0+IHZvaWQ7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEV4ZWN1dGUocGFyYW06IGFueSA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aW9uLmNhbGwodGhpcy5MaXN0ZW5lciwgcGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihsaXN0ZW5lcjogT2JqZWN0LCBhY3Rpb246IChwYXJhbTphbnkpID0+IHZvaWQpICB7XHJcbiAgICAgICAgICAgIHRoaXMuTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICAgICAgdGhpcy5BY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/kuovku7ZcclxuICAgIGV4cG9ydCBjbGFzcyBNRXZlbnQge1xyXG4gICAgICAgIERlbGVnYXRlTGlzdDogQXJyYXk8RGVsZWdhdGU+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgdGhpcy5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIOa3u+WKoOWnlOaJmFxyXG4gICAgICAgICogQHBhcmFtIHtEZWxlZ2F0ZX0gZGxnIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICovXHJcbiAgICAgICAgQWRkKGRsZzogRGVsZWdhdGUpICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0LnB1c2goZGxnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOazqOWGjOaWueazlVxyXG4gICAgICAgICAqIEBwYXJhbSBsaXN0ZW5lciDnm5HlkKzkuovku7ZcclxuICAgICAgICAgKiBAcGFyYW0gb3duZXIg5oul5pyJ6ICFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQWRkRnVuYyhsaXN0ZW5lcjoocGFyYW06YW55KT0+YW55LG93bmVyOm9iamVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBkbGc6RGVsZWdhdGUgPSBuZXcgRGVsZWdhdGUob3duZXIsbGlzdGVuZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIOenu+mZpOWnlOaJmFxyXG4gICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmVyIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICovXHJcbiAgICAgICAgUm12KGFjdGlvbjogKCkgPT4gdm9pZCwgbGlzdGVuZXI6IE9iamVjdCA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHZhciBkbGd0TGlzdDogQXJyYXk8RGVsZWdhdGU+ID0gdGhpcy5EZWxlZ2F0ZUxpc3Q7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGFycklkeDogbnVtYmVyID0gZGxndExpc3QubGVuZ3RoIC0gMTsgYXJySWR4ID4gLTE7IC0tYXJySWR4KSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRsZ3QgPSBkbGd0TGlzdFthcnJJZHhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PSBkbGd0LkFjdGlvbiAmJiBsaXN0ZW5lciA9PSBkbGd0Lkxpc3RlbmVyKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGRsZ3RMaXN0LnNwbGljZShhcnJJZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mHjee9rlxyXG4gICAgICAgIFJlc2V0KCkgIHtcclxuICAgICAgICAgICAgdGhpcy5EZWxlZ2F0ZUxpc3QgPSBbXVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICovXHJcbiAgICAgICAgRXhlY3V0ZShwYXJhbTogYW55KSAge1xyXG4gICAgICAgICAgICB2YXIgZGxndExpc3Q6IEFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhcnJJZHg6IG51bWJlciA9IGRsZ3RMaXN0Lmxlbmd0aCAtIDE7IGFycklkeCA+IC0xOyAtLWFycklkeCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgICAgIGRsZ3QuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCJcclxuaW1wb3J0IHtGU019IGZyb20gXCIuLy4uL0Jhc2UvRlNNXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBtX1NjZW5lRlNNOiBTY2VuZS5TY2VuZUZTTTtcclxuICAgIHByaXZhdGUgbV9TY2VuZU5vZGU6IExheWEuTm9kZTtcclxuICAgIFxyXG4gICAgZ2V0IEN1clNjZW5lKCk6U2NlbmUuQmFzZVNjZW5lIHtcclxuICAgICAgICBpZih0aGlzLm1fU2NlbmVGU00uQ3VyU3RhdGUpXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fU2NlbmVGU00uQ3VyU3RhdGU7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyRGlyKCk6U2NlbmUuQmFzZURpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ3VyU2NlbmUuRGlyZWN0b3I7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNjZW5lTWFuYWdlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllciA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fQkdMYXllcik7XHJcblxyXG4gICAgICAgIHRoaXMubV9TY2VuZUZTTSA9IG5ldyBTY2VuZS5TY2VuZUZTTSgpO1xyXG4gICAgICAgIHRoaXMubV9TY2VuZU5vZGUgPSBMYXlhLnN0YWdlLmFkZENoaWxkKG5ldyBMYXlhLlNwcml0ZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2hhbmdlU2NlbmUobmV3U2NlbmU6IFNjZW5lLkJhc2VTY2VuZSkgIHtcclxuICAgICAgICB0aGlzLm1fU2NlbmVGU00uQ2hhbmdlU3RhdGUobmV3U2NlbmUpO1xyXG4gICAgICAgIGlmKG5ld1NjZW5lLlNjZW5lT2JqKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX1NjZW5lTm9kZS5hZGRDaGlsZChuZXdTY2VuZS5TY2VuZU9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pen6YC76L6RXHJcbiAgICBwcml2YXRlIF9CRzogTGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9CR0xheWVyOiBMYXlhLlNwcml0ZTtcclxuICAgIFxyXG4gICAgc2V0IEJHKGJnOiBMYXlhLlNwcml0ZSkge1xyXG4gICAgICAgIGlmICghYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQkcpIHtcclxuICAgICAgICAgICAgdGhpcy5fQkcucmVtb3ZlU2VsZjtcclxuICAgICAgICAgICAgdGhpcy5fQkcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIHRoaXMuX0JHLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9CRy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyLmFkZENoaWxkKHRoaXMuX0JHKTtcclxuICAgIH1cclxuICAgIGdldCBCRygpOkxheWEuU3ByaXRlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9CRztcclxuICAgIH1cclxufVxyXG5cclxuLyoq5L2c6ICFTW9cclxuKiDlnLrmma/lip/og71cclxuKi9cclxuLypcclxuLy/lnLrmma/nrqHnkIZcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NlbmVNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBfQkc6IExheWEuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBfQkdMYXllcjogTGF5YS5TcHJpdGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuX0JHTGF5ZXIpO1xyXG4gICAgICAgIC8v5re75Yqg5Zy65pmv566h55CGXHJcbiAgICAgICAgdGhpcy5TY2VuZU5vZGUgPSBMYXlhLnN0YWdlLmFkZENoaWxkKG5ldyBMYXlhLlNwcml0ZSgpKTtcclxuICAgIH1cclxuICAgIHNldCBCRyhiZzogTGF5YS5TcHJpdGUpIHtcclxuICAgICAgICBpZiAoIWJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX0JHKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLnJlbW92ZVNlbGY7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB0aGlzLl9CRy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fQkcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllci5hZGRDaGlsZCh0aGlzLl9CRyk7XHJcbiAgICB9XHJcbiAgICBnZXQgQkcoKTpMYXlhLlNwcml0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fQkc7XHJcbiAgICB9XHJcbiAgICBTY2VuZU5vZGU6IExheWEuTm9kZTtcclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNjZW5lTWFuYWdlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX0N1clNjZW5lOiBCYXNlU2NlbmU7XHJcbiAgICBnZXQgQ3VyU2NlbmUoKTogQmFzZVNjZW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU2NlbmU7XHJcbiAgICB9XHJcbiAgICBzZXQgQ3VyU2NlbmUodmFsdWU6IEJhc2VTY2VuZSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9DdXJTY2VuZSAmJiB0aGlzLl9DdXJTY2VuZS5TY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9DdXJTY2VuZS5TY2VuZS5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0N1clNjZW5lID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N1clNjZW5lICYmIHRoaXMuX0N1clNjZW5lLlNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU2NlbmVOb2RlLmFkZENoaWxkKHRoaXMuX0N1clNjZW5lLlNjZW5lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyRGlyKCk6IEJhc2VEaXJlY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0N1clNjZW5lLkN1ckRpcjtcclxuICAgIH1cclxuXHJcbiAgICBFbnRlclNjZW5lKHRhcmdldFNjZW5lOiBCYXNlU2NlbmUpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lID0gdGFyZ2V0U2NlbmU7XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLkxlYXZlKHRhcmdldFNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUgIT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZS5VcGRhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuKi8iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0Jhc2VNYW5hZ2VyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0FQUFwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiVGltZU1hbmFnZXJcIjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbV9TdGFydFRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9HYW1lVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1BhdXNpbmdUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fUGF1c2VUaW1lOiBudW1iZXJcclxuXHJcbiAgICBwdWJsaWMgZ2V0IFN0YXJ0VGltZXIoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1N0YXJ0VGltZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgR2FtZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5tX1N0YXJ0VGltZSAtdGhpcy5tX1BhdXNlVGltZSAtIHRoaXMuUGF1c2luZ1RpbWUpIC8gMTAwMDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9TdGFydFRpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgICAgICB0aGlzLm1fR2FtZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMubV9QYXVzZVRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMubV9QYXVzaW5nVGltZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpIHtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUGF1c2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9QYXVzaW5nVGltZSA8PSAwKVxyXG4gICAgICAgICAgICB0aGlzLm1fUGF1c2luZ1RpbWUgPSBMYXlhLnRpbWVyLmN1cnJUaW1lcjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUGF1c2luZ1RpbWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BhdXNpbmdUaW1lID4gMCA/IChMYXlhLnRpbWVyLmN1cnJUaW1lciAtIHRoaXMubV9QYXVzaW5nVGltZSApIDogMDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBDb250aW51ZSgpIHtcclxuICAgICAgICB0aGlzLm1fUGF1c2VUaW1lICs9IHRoaXMuUGF1c2luZ1RpbWU7XHJcbiAgICAgICAgdGhpcy5tX1BhdXNpbmdUaW1lID0gMDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi91aS9CYXNlVUlcIlxyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBVSUZ1bmMgfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1VJRnVuY1wiXHJcbmltcG9ydCB7IEJhc2VGdW5jIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4uL2NvbnRyb2xlci9BUFBcIjtcclxuZW51bSBOb2RlVHlwZSB7XHJcbiAgICBCb3R0b20sXHJcbiAgICBNaWRkbGUsXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXIge1xyXG4gICAgc3RhdGljIGdfVUlXaWR0aCA9IDc1MDtcclxuICAgIHN0YXRpYyBnX1VJSGVpZ2h0ID0gMTMzNDtcclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcml2YXRlIG1fUm9vdE5vZGU6IExheWEuQm94O1xyXG4gICAgcHJpdmF0ZSBtX0JvdHRvbU5vZGU6IExheWEuQm94O1xyXG4gICAgcHJpdmF0ZSBtX01pZGxlTm9kZTogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIF9VSURpY3Q6IHsgW25hbWU6IHN0cmluZ106IEJhc2VVSSB9O1xyXG4gICAgcHJpdmF0ZSBfVXBkYXRlQ291bnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9VcGRhdGVUaW1lOm51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIEFkZE5vZGUobm9kZTogTm9kZVR5cGUpOiB2b2lkICB7XHJcbiAgICAgICAgdmFyIG5vZGVCb3g6IExheWEuQm94ID0gbmV3IExheWEuQm94KCk7XHJcbiAgICAgICAgbm9kZUJveC50b3AgPSAwO1xyXG4gICAgICAgIG5vZGVCb3guYm90dG9tID0gMDtcclxuICAgICAgICBub2RlQm94LmxlZnQgPSAwO1xyXG4gICAgICAgIG5vZGVCb3gucmlnaHQgPSAwO1xyXG4gICAgICAgIHN3aXRjaCAobm9kZSkgIHtcclxuICAgICAgICAgICAgY2FzZSBOb2RlVHlwZS5Cb3R0b206XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQm90dG9tTm9kZSA9IG5vZGVCb3g7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9NaWRsZU5vZGUgPSBub2RlQm94O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9Sb290Tm9kZS5hZGRDaGlsZChub2RlQm94KTtcclxuICAgICAgICAvL0xheWEuc3RhZ2UuYWRkQ2hpbGQobm9kZUJveCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyAge1xyXG4gICAgICAgIHJldHVybiBcIlVJTWFuYWdlclwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciByb290Qm94ID0gbmV3IExheWEuQm94KCk7XHJcbiAgICAgICAgcm9vdEJveC53aWR0aCA9IFVJTWFuYWdlci5nX1VJV2lkdGg7XHJcbiAgICAgICAgcm9vdEJveC5oZWlnaHQgPSBVSU1hbmFnZXIuZ19VSUhlaWdodDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHJvb3RCb3gpO1xyXG4gICAgICAgIHRoaXMubV9Sb290Tm9kZSA9IHJvb3RCb3g7XHJcbiAgICAgICAgdGhpcy5vblNpemVDaGFuZ2UoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMubV9Sb290Tm9kZSk7XHJcbiAgICAgICAgdGhpcy5tX1VwZGF0ZVRpbWUgPSAwO1xyXG5cclxuICAgICAgICB0aGlzLkFkZE5vZGUoTm9kZVR5cGUuQm90dG9tKTtcclxuICAgICAgICB0aGlzLkFkZE5vZGUoTm9kZVR5cGUuTWlkZGxlKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9VSURpY3QgPSB7fTtcclxuICAgICAgICB0aGlzLl9VcGRhdGVDb3VudCA9IDA7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5vbihMYXlhLkV2ZW50LlJFU0laRSwgdGhpcywgdGhpcy5vblNpemVDaGFuZ2UpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uU2l6ZUNoYW5nZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJvb3RCb3ggPSB0aGlzLm1fUm9vdE5vZGU7XHJcbiAgICAgICAgVUlGdW5jLkZpeFVJKHJvb3RCb3gsVUlNYW5hZ2VyLmdfVUlXaWR0aCk7XHJcbiAgICAgICAgLypcclxuICAgICAgICB2YXIgc2NhbGUgPSBVSUZ1bmMuQ291bnRTY2FsZUZpeChVSU1hbmFnZXIuZ19VSVdpZHRoKTtcclxuICAgICAgICB2YXIgcm9vdEJveCA9IHRoaXMubV9Sb290Tm9kZTtcclxuICAgICAgICByb290Qm94LnNjYWxlWCA9IHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3guc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgcm9vdEJveC5oZWlnaHQgPSBVSU1hbmFnZXIuZ19VSUhlaWdodCAqIHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3gud2lkdGggPSBVSU1hbmFnZXIuZ19VSVdpZHRoOyovXHJcbiAgICAgICAgaWYoIXRoaXMubV9Cb3R0b21Ob2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG51bUNoaWxkID0gdGhpcy5tX0JvdHRvbU5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbnVtQ2hpbGQ7aSArKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlLmdldENoaWxkQXQoaSk7XHJcbiAgICAgICAgICAgIGlmKG5vZGUgJiYgbm9kZVtcIkxheW91dFwiXSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZVtcIkxheW91dFwiXSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBudW1DaGlsZCA9IHRoaXMubV9Cb3R0b21Ob2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IG51bUNoaWxkO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZS5nZXRDaGlsZEF0KGkpO1xyXG4gICAgICAgICAgICBpZihub2RlICYmIG5vZGVbXCJMYXlvdXRcIl0pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVbXCJMYXlvdXRcIl0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKSAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5a6a5bin5Yi35pawVUlcclxuICAgICAgICBpZiAodGhpcy5tX1VwZGF0ZVRpbWUgPCAgQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSAge1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVVJKHRoaXMubV9Cb3R0b21Ob2RlKTtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVVSSh0aGlzLm1fTWlkbGVOb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5fVXBkYXRlQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fVXBkYXRlVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIDAuMztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZVVJKG5vZGU6IExheWEuU3ByaXRlKSAge1xyXG4gICAgICAgIGZvciAobGV0IGlkeDogbnVtYmVyID0gMDsgaWR4IDwgbm9kZS5udW1DaGlsZHJlbjsgKytpZHgpICB7XHJcbiAgICAgICAgICAgIHZhciB1aTogQmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGlkeCkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICB1aS5VSVVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEFkZFVJKCkgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgU2hvdzxUIGV4dGVuZHMgQmFzZVVJPih1aUNsYXNzOiB7IG5ldyhuYW1lOiBzdHJpbmcpOiBUOyBOYW1lKCk6IHN0cmluZyB9KTogVCAge1xyXG4gICAgICAgIHZhciBzdHI6IHN0cmluZyA9IHVpQ2xhc3MuTmFtZSgpO1xyXG4gICAgICAgIHZhciBuZXdVSTogQmFzZVVJID0gdGhpcy5HZXRVSUJ5TmFtZShzdHIpO1xyXG4gICAgICAgIG5ld1VJID0gbmV3VUkgPT0gbnVsbCA/IHRoaXMuQWRkVUlCeU5hbWUoc3RyLCBuZXcgdWlDbGFzcyhzdHIpKSA6IG5ld1VJO1xyXG4gICAgICAgIHZhciBub2RlOiBMYXlhLlNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoIChuZXdVSS5VSVR5cGUpICB7XHJcbiAgICAgICAgICAgIC8v5Lit5bGC5qyhVUlcclxuICAgICAgICAgICAgY2FzZSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlOlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9NaWRsZU5vZGU7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tX01pZGxlTm9kZS5udW1DaGlsZHJlbiA8PSAwKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6YCa55+l5a+85ryU5pqC5YGc5ri45oiPXHJcbiAgICAgICAgICAgICAgICAgICAgLy9BUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkN1ckRpci5UaW1lVXAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNoaWxkTnVtOiBudW1iZXIgPSBub2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIC8v5oqK5LqS5pal55qE56qX5Y+j5YWz5o6JXHJcbiAgICAgICAgaWYgKG5ld1VJLklzTXV0ZXggJiYgY2hpbGROdW0gPiAwKSAge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVJID0gbm9kZS5nZXRDaGlsZEF0KG5vZGUubnVtQ2hpbGRyZW4gLSAxKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIGlmICghbGFzdFVJLklzTXV0ZXgpXHJcbiAgICAgICAgICAgICAgICBsYXN0VUkuSGlkZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbm9kZS5hZGRDaGlsZChuZXdVSSk7XHJcbiAgICAgICAgbmV3VUkuT3Blbk9QKCk7XHJcbiAgICAgICAgaWYgKG5ld1VJLlVJVHlwZSA9PSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlICYmIG5vZGUubnVtQ2hpbGRyZW4gPiAwKSB7XHJcbiAgICAgICAgICAgIG5vZGUudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gKG5ld1VJIGFzIFQpO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKHVpOiBCYXNlVUkpICB7XHJcbiAgICAgICAgdWkucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIHVpLkNsb3NlT1AoKTtcclxuICAgICAgICB2YXIgbm9kZTogTGF5YS5TcHJpdGUgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAodWkuVUlUeXBlKSAge1xyXG4gICAgICAgICAgICAvL+S4reWxguasoVVJXHJcbiAgICAgICAgICAgIGNhc2UgQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fTWlkbGVOb2RlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLm51bUNoaWxkcmVuIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgLy8gdGhpcy5DbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v5YWz6Zet56qX5Y+jIOmAmuefpea4uOaIj+e7p+e7rVxyXG4gICAgICAgICAgICAgICAgICAgIC8vQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuQ29udGludWVUaW1lKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvL+m7mOiupFVp5YWo5piv5L2O5bGC5qyhVUlcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNoaWxkTnVtOiBudW1iZXIgPSBub2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIGlmIChjaGlsZE51bSA+IDApICB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VUk6IEJhc2VVSSA9IG5vZGUuZ2V0Q2hpbGRBdChjaGlsZE51bSAtIDEpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgbGFzdFVJLk9wZW5PUCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBDbG9zZUN1clZpZXcoKSAge1xyXG4gICAgICAgIHZhciB1aTogQmFzZVVJID0gdGhpcy5tX0JvdHRvbU5vZGUuZ2V0Q2hpbGRBdCh0aGlzLm1fQm90dG9tTm9kZS5udW1DaGlsZHJlbiAtIDEpIGFzIEJhc2VVSTtcclxuICAgICAgICB0aGlzLkNsb3NlKHVpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIoOmZpOaJgOacieiKgueCueS4iueahFVJXHJcbiAgICBDbGVhcigpICB7XHJcbiAgICAgICAgdmFyIHVpTm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlO1xyXG4gICAgICAgIHdoaWxlICh1aU5vZGUubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVpTm9kZSA9IHRoaXMubV9NaWRsZU5vZGVcclxuICAgICAgICB3aGlsZSAodWlOb2RlLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZVVJOiBCYXNlVUkgPSB1aU5vZGUuZ2V0Q2hpbGRBdCgwKSBhcyBCYXNlVUk7Ly8ucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB0aGlzLkNsb3NlKGNsb3NlVUkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBHZXRVSUJ5TmFtZShuYW1lOiBzdHJpbmcpOiBCYXNlVUkgIHtcclxuICAgICAgICB2YXIgdWkgPSB0aGlzLl9VSURpY3RbbmFtZV07XHJcbiAgICAgICAgdWkgPSB1aSA9PSB1bmRlZmluZWQgPyBudWxsIDogdWk7XHJcbiAgICAgICAgcmV0dXJuIHVpO1xyXG4gICAgfVxyXG4gICAgQWRkVUlCeU5hbWUobmFtZTogc3RyaW5nLCB1aTogQmFzZVVJKTogQmFzZVVJICB7XHJcbiAgICAgICAgdGhpcy5fVUlEaWN0W25hbWVdID0gdWk7XHJcbiAgICAgICAgcmV0dXJuIHVpO1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xyXG5pbXBvcnQgUm9sZUVsZW1lbnQgZnJvbSBcIi4vc2NyaXB0L1JvbGVFbGVtZW50XCJcbmltcG9ydCBJdGVtRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvSXRlbUVsZW1lbnRcIlxyXG4vKlxyXG4qIOa4uOaIj+WIneWni+WMlumFjee9rjtcclxuKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbmZpZ3tcclxuICAgIHN0YXRpYyB3aWR0aDpudW1iZXI9NzUwO1xyXG4gICAgc3RhdGljIGhlaWdodDpudW1iZXI9MTMzNDtcclxuICAgIHN0YXRpYyBzY2FsZU1vZGU6c3RyaW5nPVwiZml4ZWR3aWR0aFwiO1xyXG4gICAgc3RhdGljIHNjcmVlbk1vZGU6c3RyaW5nPVwibm9uZVwiO1xyXG4gICAgc3RhdGljIGFsaWduVjpzdHJpbmc9XCJ0b3BcIjtcclxuICAgIHN0YXRpYyBhbGlnbkg6c3RyaW5nPVwibGVmdFwiO1xyXG4gICAgc3RhdGljIHN0YXJ0U2NlbmU6YW55PVwiQkcuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj10cnVlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L1JvbGVFbGVtZW50LnRzXCIsUm9sZUVsZW1lbnQpO1xuICAgICAgICByZWcoXCJzY3JpcHQvSXRlbUVsZW1lbnQudHNcIixJdGVtRWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3Rlck1hbmFnZXIgZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX01ncjogQ2hhcmFjdGVyTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IE1ncigpOiBDaGFyYWN0ZXJNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIUNoYXJhY3Rlck1hbmFnZXIuZ19NZ3IpIHtcclxuICAgICAgICAgICAgQ2hhcmFjdGVyTWFuYWdlci5nX01nciA9IG5ldyBDaGFyYWN0ZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJNYW5hZ2VyLmdfTWdyO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJDaGFyYWN0ZXJJbmZvXCIpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIEdlbkluZm8oZGF0YTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDaGFyYWN0ZXJJbmZvKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRTa2lsbEl0ZW0oaWQpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uSXRlbTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0UHJpY2UoaWQpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uUHJpY2U7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldENoYXJhY3RlckluZm8oaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0SXRlbUlEKGlkKSB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmICghaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHJldHVybiBpbmZvLkl0ZW07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgR2V0TmFtZShpZCkge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoIWluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIHJldHVybiBpbmZvLm1OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXREZXNjKGlkKSB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmICghaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIGluZm8uRGVzYztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0Q2hhcmFjdGVyTW9kZWwoaWQ6IG51bWJlcik6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoIWluZm8pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyRGF0YTogQ2hhcmFjdGVySW5mbyA9IHRoaXMuR2V0Q2hhcmFjdGVySW5mbyhpZCk7XHJcbiAgICAgICAgdmFyIHNhbXBsZU1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0TEgoY2hhcmFjdGVyRGF0YS5OYW1lKSk7XHJcbiAgICAgICAgdmFyIG1vZGVsID0gc2FtcGxlTW9kZWwuY2xvbmUoKTtcclxuICAgICAgICByZXR1cm4gbW9kZWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENoYXJhY3RlckluZm8gZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlSW5mbyB7XHJcbiAgICBwcml2YXRlIG1fUHJpY2U6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Nb2RlbE5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgbV9FeHRlbmRJRDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9OYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fRGVzYzogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgbU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBEZXNjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9EZXNjO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgSXRlbSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fSXRlbTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUHJpY2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1ByaWNlO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoY2hhcmFjdGVyRGF0YTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoY2hhcmFjdGVyRGF0YSk7XHJcbiAgICAgICAgdGhpcy5tX0lEID0gY2hhcmFjdGVyRGF0YS5JRCA/IGNoYXJhY3RlckRhdGEuSUQgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9Nb2RlbE5hbWUgPSBjaGFyYWN0ZXJEYXRhLk1vZGVsSUQgPyBjaGFyYWN0ZXJEYXRhLk1vZGVsSUQgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9JdGVtID0gY2hhcmFjdGVyRGF0YS5JdGVtSUQgPyBOdW1iZXIoY2hhcmFjdGVyRGF0YS5JdGVtSUQgLSAxKSA6IC0xO1xyXG4gICAgICAgIHRoaXMubV9QcmljZSA9IGNoYXJhY3RlckRhdGEuUHJpY2UgPyBOdW1iZXIoY2hhcmFjdGVyRGF0YS5QcmljZSkgOiAwO1xyXG4gICAgICAgIHRoaXMubV9OYW1lID0gY2hhcmFjdGVyRGF0YS5QYXNzc2NvcmUgPyBjaGFyYWN0ZXJEYXRhLlBhc3NzY29yZSA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0Rlc2MgPSBjaGFyYWN0ZXJEYXRhLkRlc2MgPyBjaGFyYWN0ZXJEYXRhLkRlc2MgOiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW9kZWxOYW1lO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuZXhwb3J0IG1vZHVsZSBHYW1lTWFuYWdlciB7XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZU1hbmFnZXIge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01hcDogeyBbbmFtZTogc3RyaW5nXTogQmFzZUluZm8gfTtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9Cb3R0b21JRDogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLm1fTWFwID0ge307XHJcbiAgICAgICAgICAgIHRoaXMubV9Cb3R0b21JRCA9IC0xO1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnSW5mbzogb2JqZWN0ID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0SnNvblBhdGgobmFtZSkpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29uZmlnSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBjb25maWdJbmZvW2tleV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YUluZm86IEJhc2VJbmZvID0gdGhpcy5HZW5JbmZvKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01hcFtkYXRhSW5mby5JRF0gPSBkYXRhSW5mbztcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhSW5mby5JRCAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fQm90dG9tSUQgPSBkYXRhSW5mby5JRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgR2VuSW5mbyhkYXRhKTogQmFzZUluZm87XHJcbiAgICAgICAgcHJvdGVjdGVkIEdldEluZm88VCBleHRlbmRzIEJhc2VJbmZvPihpZDogbnVtYmVyKTogVCB7XHJcbiAgICAgICAgICAgIGlmICghaWQgfHwgaWQgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBCYXNlSW5mbyA9IHRoaXMubV9NYXBbaWRdO1xyXG4gICAgICAgICAgICBpZiAoIUJhc2VJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBCYXNlSW5mbyA9IHRoaXMubV9NYXBbdGhpcy5tX0JvdHRvbUlEXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQmFzZUluZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCYXNlSW5mbyBhcyBUO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+WSUTmlbDnu4RcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgR2V0SURMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgICAgICB2YXIgbWFwOiB7IFtJRDogbnVtYmVyXTogQmFzZUluZm8gfSA9IHRoaXMubV9NYXA7XHJcbiAgICAgICAgICAgIHZhciBJRExpc3Q6IEFycmF5PG51bWJlcj4gPSBbXVxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG1hcFtrZXldXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBJRExpc3QucHVzaChkYXRhLklEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gSURMaXN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQmFzZUluZm8ge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0lEOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGdldCBJRCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0lEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9JRCA9IGRhdGEuSUQgPyBOdW1iZXIoZGF0YS5JRCkgLSAxIDogLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1NYW5hZ2VyIGV4dGVuZHMgR2FtZU1hbmFnZXIuQmFzZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19NZ3I6IEl0ZW1NYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTWdyKCk6IEl0ZW1NYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIUl0ZW1NYW5hZ2VyLmdfTWdyKSB7XHJcbiAgICAgICAgICAgIEl0ZW1NYW5hZ2VyLmdfTWdyID0gbmV3IEl0ZW1NYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBJdGVtTWFuYWdlci5nX01ncjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJJdGVtSW5mb1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgR2VuSW5mbyhkYXRhOiBhbnkpOiBHYW1lTWFuYWdlci5CYXNlSW5mbyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVtSW5mbyhkYXRhKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpgZPlhbfku7fmoLxcclxuICAgICAqIEBwYXJhbSBpZCDpgZPlhbdJRFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0UHJpY2UoaWQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGluZm86IEl0ZW1JbmZvID0gdGhpcy5HZXRJbmZvPEl0ZW1JbmZvPihpZCk7XHJcbiAgICAgICAgaWYgKGluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvLlByaWNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumBk+WFt+S7t+agvFxyXG4gICAgICogQHBhcmFtIGlkIOmBk+WFt0lEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRJdGVtSWNvbihpZDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgaW5mbzogSXRlbUluZm8gPSB0aGlzLkdldEluZm88SXRlbUluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uSWNvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+WSUTmlbDnu4RcclxuICAgICovXHJcbiAgICBwdWJsaWMgR2V0U2VsbEl0ZW1JRExpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgdmFyIG1hcCA9IHRoaXMubV9NYXA7XHJcbiAgICAgICAgdmFyIElETGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG1hcCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YTogYW55ID0gbWFwW2tleV1cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtSW5mbzogSXRlbUluZm8gPSBkYXRhIGFzIEl0ZW1JbmZvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLlByaWNlID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgSURMaXN0LnB1c2goZGF0YS5JRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIElETGlzdDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEdldEl0ZW1UeXBlKGlkOm51bWJlcik6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZm86IEl0ZW1JbmZvID0gdGhpcy5HZXRJbmZvPEl0ZW1JbmZvPihpZCk7XHJcbiAgICAgICAgaWYgKGluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvLkl0ZW1UeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRJdGVtSW5mbyhpZDpudW1iZXIpOkl0ZW1JbmZvXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZm86IEl0ZW1JbmZvID0gdGhpcy5HZXRJbmZvPEl0ZW1JbmZvPihpZCk7XHJcbiAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEl0ZW1JbmZvIGV4dGVuZHMgR2FtZU1hbmFnZXIuQmFzZUluZm8ge1xyXG4gICAgcHJpdmF0ZSBtX01vZGVsTmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0V4dGVuZElEOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fUHJpY2U6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9JdGVtVHlwZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fSWNvbjpzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fUGFzc3Njb3JlOnN0cmluZztcclxuICAgIHByaXZhdGUgbV9EZXNjOnN0cmluZztcclxuICAgIHB1YmxpYyBnZXQgRGVzYygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fRGVzYztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUGFzc3Njb3JlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QYXNzc2NvcmU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vZGVsTmFtZSArIHRoaXMubV9FeHRlbmRJRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUHJpY2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1ByaWNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBJdGVtVHlwZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fSXRlbVR5cGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEljb24oKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0ljb247XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihkYXRhKTtcclxuICAgICAgICB0aGlzLm1fSUQgPSBkYXRhLklEID8gZGF0YS5JRCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX1Bhc3NzY29yZSA9IGRhdGEuUGFzc3Njb3JlID8gZGF0YS5QYXNzc2NvcmU6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX01vZGVsTmFtZSA9IGRhdGEuTW9kZWxOYW1lID8gZGF0YS5Nb2RlbE5hbWUgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9FeHRlbmRJRCA9IGRhdGEuRXh0ZW5kSUQgPyBkYXRhLkV4dGVuZElEIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fUHJpY2UgPSBkYXRhLlByaWNlID8gTnVtYmVyKGRhdGEuUHJpY2UpIDogMDtcclxuICAgICAgICB0aGlzLm1fSXRlbVR5cGUgPSBkYXRhLkl0ZW1UeXBlPyBOdW1iZXIoZGF0YS5JdGVtVHlwZSk6MDtcclxuICAgICAgICB0aGlzLm1fSWNvbiA9IGRhdGEuSWNvbj9kYXRhLkljb246XCJcIjtcclxuICAgICAgICB0aGlzLm1fRGVzYyA9IGRhdGEuRGVzYz9kYXRhLkRlc2M6XCJcIjtcclxuICAgIH1cclxufSIsImltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbiAvKipcclxuICog6KGo546w55So55qE5a+56LGhXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEFuaW1PYmpcclxue1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIik7XHJcbiAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgZm9yKCBsZXQgY291bnQgPTA7Y291bnQgPCAzMDsrK2NvdW50IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1Db2luLG1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2VuQW5pbU9iajxUIGV4dGVuZHMgQmFzZUFuaW1PYmo+KCBhbmltQ2xhc3M6e25ldyAobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSxtb2RlbDpMYXlhLlNwcml0ZTNEICk6VFxyXG4gICAge1xyXG4gICAgICAgIHZhciBhbmltT2JqID0gTGF5YS5Qb29sLmdldEl0ZW0oYW5pbUNsYXNzLk5hbWUoKSk7XHJcbiAgICAgICAgaWYoYW5pbU9iaj09bnVsbClcclxuICAgICAgICAgICAgYW5pbU9iaiA9IG5ldyBhbmltQ2xhc3MoYW5pbUNsYXNzLk5hbWUoKSxtb2RlbCk7XHJcbiAgICAgICAgcmV0dXJuIGFuaW1PYmo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFic3RyYWN0IGNsYXNzIEJhc2VBbmltT2JqIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG4gICAge1xyXG4gICAgICAgIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5TY2VuZU9iai5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX0ZyYW1lRnVuYylcclxuICAgICAgICB9XHJcbiAgICAgICAgTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX05hbWU6c3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLm9uKExheWEuRXZlbnQuUkVNT1ZFRCx0aGlzLHRoaXMuX0xlYXZlU3RhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lRnVuYygpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0p1ZGdlQ29tcGxldGUoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0ZyYW1lTG9naWNGdW5jKCk7XHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuO1xyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKHRoaXMsdGhpcy5fRnJhbWVGdW5jKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZvcmNlTGVhdmVTdGFnZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBBbmltQ29pbiBleHRlbmRzIEJhc2VBbmltT2JqXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkFuaW1Db2luXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFNldFRhcmdldCggdGFyZ2V0OkxheWEuU3ByaXRlM0QgKSAgICBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgc3VwZXIuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFyZ2V0OkxheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIobmFtZSxtb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lTG9naWNGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBvc2l0aW9uID0gdGhpcy5fVGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBhZGRQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKGFkZFBTLDAuMSxhZGRQUyk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5hZGQoYWRkUFMscG9zaXRpb24scG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRMb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMubmFtZSx0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGRpc0RpciA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGRpc0Rpcik7XHJcbiAgICAgICAgICAgIGlmKCBMYXlhLlZlY3RvcjMuc2NhbGFyTGVuZ3RoU3F1YXJlZChkaXNEaXIpPDAuMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgbW9kdWxlIENoYXJhY3RlclxyXG57XHJcbiAgICBleHBvcnQgZW51bSBBbmltRW51bVxyXG4gICAge1xyXG4gICAgICAgIFN0YW5kLFxyXG4gICAgICAgIEZseSxcclxuICAgICAgICBGYWxsLFxyXG4gICAgICAgIEp1bXAsXHJcbiAgICAgICAgSnVtcGRvd25cclxuICAgIH1cclxuICAgIHZhciBBbmltVHlwZTp7W25hbWU6bnVtYmVyXTpzdHJpbmd9O1xyXG4gICAgQW5pbVR5cGUgPSB7fTtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLlN0YW5kXSA9IFwic3RhbmRcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkp1bXBdID0gXCJqdW1wdXBcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkp1bXBkb3duXSA9IFwianVtcGRvd25cIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkZseV0gPSBcImZseVwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uRmFsbF0gPSBcImZhbGxcIjtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQbGF5ZXJBbmltTmFtZSggbmFtZUVudW06QW5pbUVudW0gKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gQW5pbVR5cGVbbmFtZUVudW1dO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyQW5pbWF0b3JcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIG1fQW5pbWF0b3I6TGF5YS5BbmltYXRvcjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggUGxheWVyQ2hhcmFjdGVyOkxheWEuU3ByaXRlM0QgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gUGxheWVyQ2hhcmFjdGVyLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFN3aXRjaFN0YXRlKCBBbmltRW51bSApXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgeyBCYXNlRnVuYyB9IGZyb20gXCIuLi9CYXNlL0Jhc2VGdW5jXCI7XHJcbi8v5ri45oiP5Lit55u45py6XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDYW1lcmEgZXh0ZW5kcyBMYXlhLkNhbWVyYSB7XHJcbiAgICBDdHJsZXI6IEJhc2VHYW1lQ2FtZXJhQ3RybGVyO1xyXG4gICAgQmFzZVBTOiBMYXlhLlZlY3RvcjM7XHJcbiAgICBEeW5hbWljUFM6IExheWEuVmVjdG9yMztcclxuICAgIFBsYXllcjogUGxheWVyO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50UFM6IEJhc2VGdW5jLlNtb290aERhbXBWZWN0b3IzO1xyXG5cclxuICAgIHNldCBQb3NpdGlvbihwczogTGF5YS5WZWN0b3IzKSAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcHMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpOiBMYXlhLlZlY3RvcjMgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN0cmxlciA9IG5ldyBHYW1lQ2FtZXJhQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuRHluYW1pY1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgLy90aGlzLnRpbWVyTG9vcCgxLHRoaXMuQ3RybGVyLHRoaXMuQ3RybGVyLlVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5fVXBkYXRlKTtcclxuICAgICAgICB0aGlzLmNsZWFyRmxhZyA9IExheWEuQmFzZUNhbWVyYS5DTEVBUkZMQUdfU0tZO1xyXG4gICAgICAgIHRoaXMubV9Db3VudFBTID0gbmV3IEJhc2VGdW5jLlNtb290aERhbXBWZWN0b3IzKDIpXHJcbiAgICAgICAgLy9DYW1lcmEuc2t5UmVuZGVyZXIgPSBza3lCb3guX3JlbmRlcjtcclxuICAgICAgICAvL3RoaXMuc2sgPSBza3lCb3g7XHJcbiAgICAgICAgLy9wYXRoXHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGxhZXIocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXQoRHluYW1pY1BTOiBMYXlhLlZlY3RvcjMsIGJhc2VQUzogTGF5YS5WZWN0b3IzLCBwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IGJhc2VQUztcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IER5bmFtaWNQUztcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul+W5tuiuvue9ruS9jee9rlxyXG4gICAgQ291bnRTZXRQUygpICB7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMuQmFzZVBTLCB0aGlzLkR5bmFtaWNQUywgbmV3UFMpO1xyXG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMubV9Db3VudFBTLlNtb290aERhbXAoMCwgTGF5YS5WZWN0b3IzLmRpc3RhbmNlKHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLCBuZXdQUykpXHJcbiAgICAgICAgLy90aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5sZXJwKHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLCBuZXdQUywgc2NhbGUsIG5ld1BTKVxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7IC8vdGhpcy5tX0NvdW50UFMuQ291bnQodGhpcy50cmFuc2Zvcm0ucG9zaXRpb24sbmV3UFMpIC8vbmV3UFM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfVXBkYXRlKCkgIHtcclxuICAgICAgICB0aGlzLkN0cmxlci5VcGRhdGUoKTtcclxuICAgICAgICAvL3RoaXMuZmllbGRPZlZpZXdcclxuICAgIH1cclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVDYW1lcmFDdHJsZXIge1xyXG4gICAgQ2FtZXJhOiBHYW1lQ2FtZXJhO1xyXG4gICAgQ3RybGVyOiBCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIGFic3RyYWN0IFVwZGF0ZSgpOiB2b2lkO1xyXG4gICAgY29uc3RydWN0b3IoY2FtZXJhOiBHYW1lQ2FtZXJhLCBjdHJsZXI6IEJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbCkgIHtcclxuICAgICAgICBpZiAoY3RybGVyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIGN0cmxlciA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gY2FtZXJhO1xyXG4gICAgICAgIHRoaXMuQ3RybGVyID0gY3RybGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ2FtZXJhQ3RybGVyIGV4dGVuZHMgQmFzZUdhbWVDYW1lcmFDdHJsZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2FtZXJhOiBHYW1lQ2FtZXJhLCBjdHJsZXI6IEJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbCkgIHtcclxuICAgICAgICBzdXBlcihjYW1lcmEsIGN0cmxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCkgIHtcclxuICAgICAgICBpZiAodGhpcy5DYW1lcmEgPT0gbnVsbCB8fCB0aGlzLkNhbWVyYS5QbGF5ZXIgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBDYW1lcmFQUyA9IHRoaXMuQ2FtZXJhLkR5bmFtaWNQUztcclxuICAgICAgICB2YXIgUGxheWVyUFMgPSB0aGlzLkNhbWVyYS5QbGF5ZXIuX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlzTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggTWF0aC5hYnMoZGlzWk51bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnogKz0gZGlzWk51bSowLjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNhbWVyYS5EeW5hbWljUFMgPUNhbWVyYVBTOyovXHJcbiAgICAgICAgdmFyIENhbWVyYVBTID0gdGhpcy5DYW1lcmEuRHluYW1pY1BTO1xyXG4gICAgICAgIHZhciBQbGF5ZXJQUyA9IHRoaXMuQ2FtZXJhLlBsYXllci5fTG9naWNQb3NpdGlvbjtcclxuICAgICAgICBDYW1lcmFQUy54ID0gMDtcclxuICAgICAgICB2YXIgZGlzTnVtID0gUGxheWVyUFMueSAtIENhbWVyYVBTLnk7XHJcbiAgICAgICAgdmFyIGRpc1pOdW0gPSBQbGF5ZXJQUy56IC0gQ2FtZXJhUFMuejtcclxuICAgICAgICB2YXIgZGlzSHVtID0gUGxheWVyUFMueCAtIENhbWVyYVBTLng7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpc051bSkgPiAwLjAxKSAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy55ICs9IGRpc051bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpc1pOdW0pID4gMC4wMSkgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueiArPSBkaXNaTnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoTWF0aC5hYnMoZGlzSHVtKSA+IDAuMDEpICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnggKz0gZGlzSHVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbWVyYS5EeW5hbWljUFMgPSBDYW1lcmFQUztcclxuICAgICAgICB0aGlzLkNhbWVyYS5Db3VudFNldFBTKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7IEFuaW1PYmogfSBmcm9tIFwiLi8uLi9HYW1lL0FuaW1PYmpcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCB7IFBsYXllckNvbnRyb2xlciB9IGZyb20gXCIuL1BsYXllckN0cmxlclwiXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vSW5wdXRcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi9HYW1lTW9kdWxlXCI7XHJcbnR5cGUgQW5pbUNvaW4gPSBBbmltT2JqLkFuaW1Db2luXHJcbmV4cG9ydCBtb2R1bGUgSXRlbSB7XHJcbiAgICAvL+eJqeWTgeagh+ivhlxyXG4gICAgY29uc3QgSXRlbUlEOiBzdHJpbmcgPSBcIkl0ZW1cIjtcclxuICAgIGNvbnN0IE1vZGVsSUQ6IHN0cmluZyA9IFwiTW9kZWxcIlxyXG4gICAgXHJcbiAgICBleHBvcnQgZW51bSBNb2RlbFR5cGUge1xyXG4gICAgICAgIENvaW5cclxuICAgIH1cclxuICAgIGV4cG9ydCBlbnVtIEl0ZW1UeXBlIHtcclxuICAgICAgICBOb25lID0gMCxcclxuICAgICAgICBFbXB0eSxcclxuICAgICAgICBSb2NrLFxyXG4gICAgICAgIFRob3JuLFxyXG4gICAgICAgIFZpbmUsXHJcbiAgICAgICAgUHJvdGVjdCA9IDExLFxyXG4gICAgICAgIEhvbHlQcm90ZWN0LFxyXG4gICAgICAgIEZseSxcclxuICAgICAgICBSb3BlLFxyXG4gICAgICAgIENvbGxlY3RvcixcclxuICAgICAgICBDb2luID0gMjAsXHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTGluZUl0ZW1JbmZvIHtcclxuICAgICAgICBUeXBlOiBJdGVtVHlwZTtcclxuICAgICAgICBOdW1iZXI6IG51bWJlcjtcclxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBJdGVtVHlwZSwgbnVtOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5UeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgdGhpcy5OdW1iZXIgPSBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IHZhciBCdWZmU2xvdDp7W2tleTpudW1iZXJdOm51bWJlcn0gPXt9O1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuQ29sbGVjdG9yXSA9IDA7XHJcbiAgICBCdWZmU2xvdFtJdGVtVHlwZS5Qcm90ZWN0XSA9IDE7XHJcbiAgICBCdWZmU2xvdFtJdGVtVHlwZS5Ib2x5UHJvdGVjdF0gPSAxO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuRmx5XSA9IDE7XHJcbiAgICBCdWZmU2xvdFtJdGVtVHlwZS5WaW5lXSA9IDI7XHJcblxyXG4gICAgLy/nianlk4HluIPlsYBcclxuICAgIGV4cG9ydCBjbGFzcyBJdGVtTGF5b3V0IHtcclxuICAgICAgICBSZXdhcmRMaXN0OiBBcnJheTxMYXlJdGVtTWdyPjtcclxuICAgICAgICBCYXJyaWVyTGlzdDogQXJyYXk8TGF5SXRlbU1ncj47XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0ID0gbmV3IEFycmF5PExheUl0ZW1NZ3I+KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDEsIEl0ZW1UeXBlLkVtcHR5LCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDUsIEl0ZW1UeXBlLlJvY2ssIDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuQmFycmllckxpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMiwgSXRlbVR5cGUuVGhvcm4sIDEwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLCAyLCBJdGVtVHlwZS5WaW5lLCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMSwgSXRlbVR5cGUuQ29pbikpO1xyXG5cclxuICAgICAgICAgICAgLy90aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMTAwLCBJdGVtVHlwZS5GbHksIDIwKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMTAsIEl0ZW1UeXBlLkNvbGxlY3RvcikpO1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMSwgSXRlbVR5cGUuUHJvdGVjdCkpO1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMSwgSXRlbVR5cGUuSG9seVByb3RlY3QpKTtcclxuXHJcbiAgICAgICAgICAgIFJlc2V0SXRlbUZhY3RvcnkoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VMaW5lUmV3YXJkKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVGFrZUl0ZW0oZmxvb3IsIHRoaXMuUmV3YXJkTGlzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWtlTGluZURpZmZpY3VsdHkoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vciwgdGhpcy5CYXJyaWVyTGlzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWtlSXRlbShmbG9vcjogbnVtYmVyLCBNZ3JMaXN0OiBBcnJheTxMYXlJdGVtTWdyPik6IEFycmF5PExpbmVJdGVtSW5mbz4ge1xyXG4gICAgICAgICAgICB2YXIgcmV0dXJuSW5mbyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGxpc3RJZHggPSAwOyBsaXN0SWR4IDwgTWdyTGlzdC5sZW5ndGg7ICsrbGlzdElkeCkge1xyXG4gICAgICAgICAgICAgICAgTWdyTGlzdFtsaXN0SWR4XS5PbkZsb29yKGZsb29yKTtcclxuICAgICAgICAgICAgICAgIHZhciBpbmZvOiBMaW5lSXRlbUluZm8gPSBNZ3JMaXN0W2xpc3RJZHhdLlRha2VJdGVtcyhmbG9vcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5mby5OdW1iZXIgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuSW5mby5wdXNoKGluZm8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXR1cm5JbmZvO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+ivpeWvueixoeeahOWIhuW4g+Wbvuavj+WxguetieamgueOh+WIhuW4g1xyXG4gICAgZXhwb3J0IGNsYXNzIExheUl0ZW1NZ3Ige1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgSXRlbVR5cGU6IEl0ZW1UeXBlO1xyXG4gICAgICAgIC8v5b2T5YmN5bGC5pWwXHJcbiAgICAgICAgQ3VyRmxvb3I6IG51bWJlcjtcclxuICAgICAgICAvL+WMuumXtOWIhuW4g+aAu+aVsOmHj1xyXG4gICAgICAgIEl0ZW1OdW06IG51bWJlcjtcclxuICAgICAgICAvL+W8gOWni+WIhuW4g+eahOWxguaVsFxyXG4gICAgICAgIFN0YXJ0Rmxvb3I6IG51bWJlcjtcclxuICAgICAgICAvL+WIhuW4g+WMuumXtFxyXG4gICAgICAgIC8v5bey6I635Y+W5bGC5qCH6K6wXHJcbiAgICAgICAgVG91Y2hlZEZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgSXRlbUxpc3Q6IEFycmF5PG51bWJlcj47XHJcbiAgICAgICAgLy9yYW5nZeWMuumXtOiMg+WbtFxyXG4gICAgICAgIC8vbnVtIOWMuumXtOiMg+WbtOaVsOmHj1xyXG4gICAgICAgIC8vaXRlbVR5cGUg55Sf5Lqn55qE6YGT5YW357G75Z6LXHJcbiAgICAgICAgLy9zdGFydEZsb29yIOS7juWTquS4gOihjOW8gOWni+aKleaOt1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHJhbmdlOiBudW1iZXIsIG51bTogbnVtYmVyLCBpdGVtVHlwZTogSXRlbVR5cGUsIHN0YXJ0Rmxvb3I6IG51bWJlciA9IDEpIHtcclxuICAgICAgICAgICAgaWYgKG51bSA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBudW0gPSAxO1xyXG4gICAgICAgICAgICBpZiAoc3RhcnRGbG9vciA9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAvL+esrDDlsYLmmK/njqnlrrbotbfmraXkvY3nva5cclxuICAgICAgICAgICAgICAgIHN0YXJ0Rmxvb3IgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1UeXBlID0gaXRlbVR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuQ3VyRmxvb3IgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1OdW0gPSBudW07XHJcbiAgICAgICAgICAgIC8v5YiG5biD5Zu+IOeJqeWTgWlkeDrlsYLmlbBcclxuICAgICAgICAgICAgdGhpcy5JdGVtTGlzdCA9IG5ldyBBcnJheTxudW1iZXI+KHJhbmdlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub3VjaGVkRmxvb3IgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLkdlbk1hcChzdGFydEZsb29yKVxyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgUmFuZ2UoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbUxpc3QubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WxguabtOaWsOWHveaVsFxyXG4gICAgICAgIE9uRmxvb3IoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoZmxvb3IgPCB0aGlzLlRvdWNoZWRGbG9vcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HZW5NYXAoZmxvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChmbG9vciA+PSB0aGlzLlN0YXJ0Rmxvb3IgKyB0aGlzLlJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlJ/miJDliIbluIPlm75cclxuICAgICAgICBHZW5NYXAoc3RhcnRGbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnRGbG9vciA9IHN0YXJ0Rmxvb3I7XHJcbiAgICAgICAgICAgIHZhciBpdGVtTnVtID0gdGhpcy5JdGVtTnVtO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjb3VudDogbnVtYmVyID0gMDsgY291bnQgPCB0aGlzLkl0ZW1MaXN0Lmxlbmd0aDsgKytjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JdGVtTGlzdFtjb3VudF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBpdGVtTGlzdCA9IHRoaXMuSXRlbUxpc3Q7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGNvdW50TnVtOiBudW1iZXIgPSAwOyBjb3VudE51bSA8IGl0ZW1OdW07ICsrY291bnROdW0pIHtcclxuICAgICAgICAgICAgICAgIHZhciBJdGVtRmxvb3I6IG51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuUmFuZ2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JdGVtTGlzdFtJdGVtRmxvb3JdICs9IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VJdGVtcyhmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG91Y2hlZEZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgTGluZUl0ZW1JbmZvKHRoaXMuSXRlbVR5cGUsIHRoaXMuSXRlbUxpc3RbZmxvb3IgLSB0aGlzLlN0YXJ0Rmxvb3JdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIFJlc2V0OiBib29sZWFuO1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFJlc2V0SXRlbUZhY3RvcnkoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFJlc2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVzZXQgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIHRoZUtleSBpbiBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZSkge1xyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHBhcnNlSW50KHRoZUtleSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlIDw9IDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvdW50ID0gMDsgY291bnQgPCAzMDsgKytjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXM6IGFueSA9IEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW06IFN0ZXAgPSBuZXcgY2xhcyhudWxsKTtcclxuICAgICAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKEl0ZW1JRCArIHRoZUtleSwgaXRlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFN0ZXBJdGVtRmFjdG9yeShpdGVtVHlwZTogSXRlbVR5cGUsIHN0ZXApIHtcclxuICAgICAgICBpZiAoc3RlcCA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtVHlwZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaXRlbVxyXG4gICAgICAgIHZhciBvYmpQb29sID0gTGF5YS5Qb29sO1xyXG4gICAgICAgIGl0ZW0gPSBvYmpQb29sLmdldEl0ZW0oSXRlbUlEICsgaXRlbVR5cGUpXHJcbiAgICAgICAgaWYgKGl0ZW0gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdICE9IG51bGwgJiYgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXM6IGFueSA9IEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXTtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBuZXcgY2xhcyhzdGVwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSBuZXcgU3RlcEl0ZW0oaXRlbVR5cGUsIHN0ZXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaXRlbS5TdGVwID0gc3RlcDtcclxuICAgICAgICBpdGVtLlJlc2V0SXRlbSgpO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBJdGVtQnVmZkZhY3RvcnkoaXRlbVR5cGU6IEl0ZW1UeXBlKTogQmFzZVBsYXllckJ1ZmYgIHtcclxuICAgICAgICB2YXIgYnVmZjogQmFzZVBsYXllckJ1ZmYgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAoaXRlbVR5cGUpICB7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuRmx5OlxyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5ldyBGbHlCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Db2xsZWN0b3I6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IENvbGxlY3RCdWZmKDEwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFByb3RlY3RCdWZmKDMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuSG9seVByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFByb3RlY3RCdWZmKDMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuVmluZTpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgVmluZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvcGU6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFJvcGVCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN0ZXBJdGVtIHtcclxuICAgICAgICBTdGVwOiBTdGVwO1xyXG4gICAgICAgIEl0ZW1UeXBlOiBJdGVtVHlwZTtcclxuICAgICAgICBNb2RlbDogTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBwcml2YXRlIG1fQW5pbWF0b3I6IExheWEuQW5pbWF0b3I7XHJcbiAgICAgICAgZ2V0IElzRGlmZmljdWx0eSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGUgPiAwICYmIHRoaXMuSXRlbVR5cGUgPCAxMCAmJiB0aGlzLkl0ZW1UeXBlICE9IEl0ZW1UeXBlLlZpbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreiDveS4jeiDvei1sOS4iuWOu1xyXG4gICAgICAgIGdldCBJc0ZvcmJpZGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtVHlwZSA9PSBJdGVtVHlwZS5Sb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldEl0ZW0oKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5fSW5pdEl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLlNldEVuYWJsZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0ZXAuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFNldEVuYWJsZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTW9kZWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFB1dEl0ZW0gPSBmdW5jdGlvbiAoaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVzUGF3bigpO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXAuU3RlcEl0ZW0gPSBTdGVwSXRlbUZhY3RvcnkoaXRlbVR5cGUsIHRoaXMuU3RlcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+a2iOmZpCDmioroh6rlt7HlrZjlhaXlhoXlrZjmsaBcclxuICAgICAgICBEZXNQYXduKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Nb2RlbC5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHZhciBvYmpQb29sID0gTGF5YS5Qb29sOy8vR00uT2JqUG9vbDtcclxuICAgICAgICAgICAgb2JqUG9vbC5yZWNvdmVyKEl0ZW1JRCArIHRoaXMuSXRlbVR5cGUsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHBsYXllciBcclxuICAgICAgICAgKi9cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLkl0ZW1UeXBlKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQWRkQnVmZlRvUGxheWVyKHBsYXllcjpQbGF5ZXIscHV0QmFja0l0ZW06Ym9vbGVhbiA9IHRydWUpOiBib29sZWFuICB7XHJcbiAgICAgICAgICAgIHZhciBCdWZmOkJhc2VQbGF5ZXJCdWZmID0gSXRlbUJ1ZmZGYWN0b3J5KHRoaXMuSXRlbVR5cGUpO1xyXG4gICAgICAgICAgICB2YXIgc3VjY2Vzczpib29sZWFuID0gQnVmZi5BZGRUb1BsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICBpZihzdWNjZXNzICYmIHB1dEJhY2tJdGVtKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzdWNjZXNzO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnqoHnoLTkv53miqRcclxuICAgICAgICAgKiBAcmV0dXJucyDmmK/lkKbooqvnqoHnoLRcclxuICAgICAgICAgKi9cclxuICAgICAgICBCcmVha1Byb3RlY3QocGxheWVyOiBQbGF5ZXIpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGN1ckJ1ZmYgPSBwbGF5ZXIuR2V0QnVmZihCdWZmU2xvdFtJdGVtVHlwZS5Qcm90ZWN0XSk7XHJcbiAgICAgICAgICAgIGlmIChjdXJCdWZmKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGN1ckJ1ZmYuVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUHJvdGVjdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQnVmZi5SZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihpdGVtVHlwZTogSXRlbVR5cGUsIFN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1UeXBlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcCA9IFN0ZXA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0luaXRJdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9BZGRCdWZmVG9QbGF5ZXIocGxheWVyOiBQbGF5ZXIsIGJ1ZmY6IEJhc2VQbGF5ZXJCdWZmKSB7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuQWRkQnVmZihidWZmKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5pdEl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTW9kZWwgIT0gbnVsbCAmJiAhdGhpcy5Nb2RlbC5kZXN0cm95ZWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGgsIDApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fR2VuSXRlbU1vZGVsKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gdGhpcy5Nb2RlbC5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuTW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfVGVzdEdlbnRJdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IG51bGw7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5JdGVtVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Sb2NrOlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuTm9uZTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLkl0ZW1UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvY2s6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjMsIDAuMywgMC41KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIHByaXZhdGUgbV9UeXBlOkl0ZW1UeXBlO1xyXG4gICAgICAgIHByaXZhdGUgbV9QbGF5ZXI6UGxheWVyO1xyXG4gICAgICAgIHB1YmxpYyBnZXQgVHlwZSgpOiBJdGVtLkl0ZW1UeXBlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX1R5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgU2xvdCgpOiBudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBCdWZmU2xvdFt0aGlzLlR5cGVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IHBsYXllcigpOiBQbGF5ZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBJdGVtLkl0ZW1UeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9UeXBlID0gdHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lkJHnjqnlrrbmt7vliqBCVUZGXHJcbiAgICAgICAgcHVibGljIEFkZFRvUGxheWVyKHBsYXllcjpQbGF5ZXIpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFN0YXJ0KCk7XHJcbiAgICAgICAgcHVibGljIFJlbW92ZVNlbGYoKTp2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuQ29tcGxldGVCdWZmKHRoaXMuU2xvdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBSZW1vdmVkKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgUm9jayBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIE1vZGVsTnVtID0gMztcclxuICAgICAgICBjb25zdHJ1Y3RvcihTdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvY2ssIFN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLk1lc2hTcHJpdGUzRCA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBpZHggPSAxICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogUm9jay5Nb2RlbE51bSk7XHJcbiAgICAgICAgICAgIHZhciBOYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzBcIiArIGlkeClcclxuICAgICAgICAgICAgbW9kZWwgPSBMYXlhLmxvYWRlci5nZXRSZXMoTmFtZSlcclxuICAgICAgICAgICAgbW9kZWwgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUm9ja10gPSBSb2NrO1xyXG5cclxuICAgIGNsYXNzIFRob3JuIGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVGhvcm4sIFN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcInRyYXBfc3RpbmdfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkJyZWFrUHJvdGVjdChwbGF5ZXIpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5pbTogTGF5YS5BbmltYXRvciA9IHRoaXMuTW9kZWwuZ2V0Q2hpbGRBdCgwKS5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgICAgICAgICBhbmltLnBsYXkoXCJ0b3VjaFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlRob3JuXSA9IFRob3JuO1xyXG5cclxuICAgIGNsYXNzIFByb3RlY3QgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Qcm90ZWN0LCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX3NoaWVsZF8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5BZGRCdWZmVG9QbGF5ZXIocGxheWVyKTsgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlByb3RlY3RdID0gUHJvdGVjdDtcclxuXHJcbiAgICBjbGFzcyBQcm90ZWN0QnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmIHtcclxuICAgICAgICBUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHRpbWUg5oyB57ut5pe26Ze0XHJcbiAgICAgICAgICogQHBhcmFtIElzSG9seSDmmK/lkKbnu53lr7nml6DmlYxcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOiBudW1iZXIgPSAwLCBJc0hvbHk6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgICAgICBzdXBlcihJc0hvbHkgPyBJdGVtVHlwZS5Ib2x5UHJvdGVjdCA6IEl0ZW1UeXBlLlByb3RlY3QpO1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyB0aW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UaW1lIDwgQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0KClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFJlbW92ZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjbGFzcyBIb2x5UHJvdGVjdCBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkhvbHlQcm90ZWN0LCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLkFkZEJ1ZmZUb1BsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkhvbHlQcm90ZWN0XSA9IEhvbHlQcm90ZWN0O1xyXG5cclxuICAgIGNsYXNzIENvaW4gZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgLy9Ub0RvXHJcbiAgICAgICAgcHJpdmF0ZSBtX3RvdWNoZWQ6IEJvb2xlYW5cclxuICAgICAgICBGbHlUb1BsYXllcihwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICB2YXIgY29uaW46IEFuaW1Db2luID0gQW5pbU9iai5HZW5BbmltT2JqPEFuaW1Db2luPihBbmltT2JqLkFuaW1Db2luLCB0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgY29uaW4uU2V0VGFyZ2V0KHBsYXllcik7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkR29sZFVuTG9naWNHb2xkKDEpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkR29sZCgxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvaW4sIHN0ZXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkNvaW5dID0gQ29pbjtcclxuXHJcbiAgICBjbGFzcyBDb2xsZWN0ZXIgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3Rvciwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDEgKyBNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRfMDFcIik7XHJcbiAgICAgICAgICAgIHZhciB0aGVNb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gdGhlTW9kZWwuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Db2xsZWN0b3JdID0gQ29sbGVjdGVyO1xyXG5cclxuICAgIGNsYXNzIENvbGxlY3RCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIFRpbWU6IG51bWJlcjtcclxuICAgICAgICBHYW1lRGlyOiBHYW1lRGlyZWN0b3I7XHJcbiAgICAgICAgQ291bnRGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgU2xvdCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTogbnVtYmVyID0gMCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2xsZWN0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVEaXIgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyO1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyB0aW1lO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50Rmxvb3IgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydCgpIHtcclxuICAgICAgICAgICAgdGhpcy5Db3VudEZsb29yID0gdGhpcy5HYW1lRGlyLkdhbWVQbGF5LlBsYXllckZsb29yIC0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVtb3ZlZCgpXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UaW1lIDwgQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3IgLSB0aGlzLkNvdW50Rmxvb3IgKyAxIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpci5HYW1lUGxheS5Mb29wRG9GbG9vclN0ZXAodGhpcy5Db3VudEZsb29yLCB0aGlzLCB0aGlzLkNvdW50Q29pbnMpO1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLkNvdW50Rmxvb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBDb3VudENvaW5zKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgaWYgKHN0ZXAuU3RlcEl0ZW0uSXRlbVR5cGUgPT0gSXRlbVR5cGUuQ29pbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIENvaW46IENvaW4gPSBzdGVwLlN0ZXBJdGVtIGFzIENvaW47XHJcbiAgICAgICAgICAgICAgICBDb2luLkZseVRvUGxheWVyKHRoaXMucGxheWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBGTHkgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5GbHksIHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxICsgTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fZmx5ZXJfMDFcIik7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuRmx5XSA9IEZMeTtcclxuXHJcbiAgICBjbGFzcyBGbHlCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIHN0YXRpYyBnZXQgU2xvdCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3BlZWQ6IG51bWJlcjtcclxuICAgICAgICBGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9GbG9vclN3aXRjaDpudW1iZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIgPSAwLjE1LCBmbG9vcjogbnVtYmVyID0gMTApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuRmx5KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aW1lOiBudW1iZXIgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWU7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXI6UGxheWVyID0gdGhpcy5wbGF5ZXI7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuQ3VyU3RlcCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fRmxvb3JTd2l0Y2ggPSBwbGF5ZXIuQ3VyU3RlcC5GbG9vci5yaWdodFN3aXRjaDtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IHBsYXllci5DdXJTdGVwLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uLlkgKz0gdGhpcy5GbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gcGxheWVyLlBvc2l0aW9uLnogLSBHYW1lTW9kdWxlLkRTcGFjZSAqIHRoaXMuRmxvb3I7XHJcblxyXG4gICAgICAgICAgICB2YXIgZmx5Q3RybCA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyRmx5KHRoaXMuU3BlZWQpO1xyXG4gICAgICAgICAgICBmbHlDdHJsLlNldFBsYXllcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIHBsYXllci5GbHkoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQoKSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICBwbGF5ZXIuRmx5UHJlcGFyZSgpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LmdhbWVNYXAuU2V0TmV4dEZscHByRGlyU3dpdGNoKHRoaXMubV9GbG9vclN3aXRjaCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZW1vdmVkKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HZXRTdGVwQnlMb2NhdGlvbih0aGlzLl9GaW5hbExvY2F0aW9uLHRoaXMubV9GbG9vclN3aXRjaCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5Qb3BDdHJsZXIoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9GaW5hbFogLSB0aGlzLnBsYXllci5Qb3NpdGlvbi56ID4gLTAuMikge1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFJvcGUgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllcixmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9wZSwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuTWVzaFNwcml0ZTNEID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4xLCAwLjUsIDAuMSkpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb3BlXSA9IFJvcGU7XHJcblxyXG4gICAgY2xhc3MgUm9wZUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgU3BlZWQ6IG51bWJlcjtcclxuICAgICAgICBGbG9vcjogbnVtYmVyO1xyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IFNsb3QoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fRmluYWxaIC0gdGhpcy5wbGF5ZXIuUG9zaXRpb24ueiA+IC0wLjIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KCkge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyOlBsYXllciA9IHRoaXMucGxheWVyO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPSB0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIEdhbWVNb2R1bGUuRFNwYWNlICogdGhpcy5GbG9vcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbHlDdHJsID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJGbHkodGhpcy5TcGVlZCk7XHJcbiAgICAgICAgICAgIGZseUN0cmwuU2V0UGxheWVyKHBsYXllcilcclxuICAgICAgICAgICAgcGxheWVyLkFkZEN0cmxlcihmbHlDdHJsKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQodGhpcywgdGhpcy5fSW5wdXQpKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TZXRTYWZlUFModGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJlbW92ZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5Qb3BDdHJsZXIoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlciA9IDAuMSwgZmxvb3I6IG51bWJlciA9IDEwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpc1JpZ2h0OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZUZsb29yID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vckxpbmU7XHJcbiAgICAgICAgICAgIGlmIChjbG9zZUZsb29yLkZsb29yTnVtICUgMiAhPSB0aGlzLl9GaW5hbExvY2F0aW9uLlkgJSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZUZsb29yID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HZXRGbG9vckJ5Rmxvb3IoY2xvc2VGbG9vci5GbG9vck51bSArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gY2xvc2VGbG9vci5HZXRTdGVwKHRoaXMuX0ZpbmFsTG9jYXRpb24uWCk7XHJcbiAgICAgICAgICAgIGlmIChpc1JpZ2h0KVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGlmIChzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBWaW5lIGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIHByaXZhdGUgbV9CZVRvdWNoZWQ6Ym9vbGVhbjtcclxuICAgICAgICBnZXQgVG91Y2hlZCgpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQmVUb3VjaGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgVG91Y2hlZCh2YWx1ZTpib29sZWFuKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0JlVG91Y2hlZCA9IHZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICBpZih0aGlzLlRvdWNoZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgdGhpcy5BZGRCdWZmVG9QbGF5ZXIocGxheWVyLGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5Ub3VjaGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5WaW5lLCBzdGVwKTtcclxuICAgICAgICAgICAgdGhpcy5Ub3VjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDEgKyBNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBJZHggPT0gMSA/IHBhdGguR2V0TEgoXCJ0cmFwX2VudGFuZ2xlXzAxXCIpIDogcGF0aC5HZXRMSChcInRyYXBfY2hvbXBlcl8wMVwiKVxyXG5cclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mtojpmaQg5oqK6Ieq5bex5a2Y5YWl5YaF5a2Y5rGgXHJcbiAgICAgICAgRGVzUGF3bigpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub3VjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN1cGVyLkRlc1Bhd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5WaW5lXSA9IFZpbmU7XHJcblxyXG4gICAgY2xhc3MgVmluZUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgQ291bnRUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgSW5wdXREaXI6IGJvb2xlYW47XHJcbiAgICAgICAgU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsIHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZW1vdmVkKCkge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb3VudFRpbWU6IG51bWJlciA9IDQsIGlucHV0RGlyOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5WaW5lKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudFRpbWUgPSBjb3VudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSBpbnB1dERpcjtcclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaW5wdXREaXI6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuSW5wdXREaXIgPT0gaW5wdXREaXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSAhdGhpcy5JbnB1dERpcjtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5Db3VudFRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvdW50VGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9TaG93R2FtZUluZm8oKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvdW50VGltZSA8PSAwKVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLklucHV0RGlyID09IHRydWUgPyBcIlJpZ2h0XCIgOiBcIkxlZnRcIjtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi9Nb3VudExpbmVcIjtcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIjtcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0dhbWVJdGVtXCI7XHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIjtcclxuXHJcbnZhciBNb3VudHM6IG51bWJlciA9IDI7XHJcbnZhciBMaW5lU3BhY2U6IG51bWJlciA9IDI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lbWFwIGV4dGVuZHMgTGF5YS5Ob2RlIHtcclxuICAgIHByaXZhdGUgbV9IZWFkRmxvb3JJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9UYWlsRkxvb3JJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Nb3VudExpbmVzOiBNb3VudExpbmVbXTtcclxuICAgIHByaXZhdGUgbV9DdXJJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9JdGVtUmFuZ2U6IHt9O1xyXG4gICAgcHJpdmF0ZSBtX1NhZmVMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICBwcml2YXRlIG1fQ3VyTGluZUJhcnJpZXJzOiBBcnJheTxJdGVtLkxpbmVJdGVtSW5mbz47XHJcbiAgICBwcml2YXRlIG1fQ3VyTGluZVJld2FyZHM6IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPjtcclxuICAgIHByaXZhdGUgbV9JdGVtTGF5b3V0OiBJdGVtLkl0ZW1MYXlvdXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBtX3JpZ2h0U3dpdGNoQ291bnQ6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGdldCBDdXJMaW5lUmV3YXJkcygpOiBBcnJheTxJdGVtLkxpbmVJdGVtSW5mbz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fQ3VyTGluZVJld2FyZHM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldCBDdXJMaW5lQmFycmllcnMoKTogQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckxpbmVCYXJyaWVycztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0IE1vdW50TGluZXMoKTogTW91bnRMaW5lW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW91bnRMaW5lcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0IE5leHRJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5tX0N1cklkeCArIDEpICUgTW91bnRzO1xyXG4gICAgfVxyXG4gICAgZ2V0IEhlYWRGbG9vcigpOiBNb3VudExpbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW91bnRMaW5lc1t0aGlzLm1fSGVhZEZsb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBUYWlsRkxvb3IoKTogTW91bnRMaW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vdW50TGluZXNbdGhpcy5tX1RhaWxGTG9vcklkeF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnLDlm75cclxuICAgICAqIEBwYXJhbSBmbG9vck51bSDlsYLmlbBcclxuICAgICAqIEBwYXJhbSBjb2x1bW4g5YiX5pWwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGZsb29yTnVtOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKSB7XHJcbiAgICAgICAgLy9mbG9vck51bSA9IDM7XHJcbiAgICAgICAgLy9jb2x1bW4gPSA1O1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX01vdW50TGluZXMgPSBbXTtcclxuICAgICAgICB0aGlzLm1fQ3VySWR4ID0gMDtcclxuICAgICAgICB0aGlzLm1fSGVhZEZsb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLm1fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLm1fSXRlbUxheW91dCA9IG5ldyBJdGVtLkl0ZW1MYXlvdXQoKVxyXG4gICAgICAgIHRoaXMubV9DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5tX0N1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBmbG9vck51bTsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIG5ld01vdW50YWluID0gbmV3IE1vdW50TGluZShpZHgsIGNvbHVtbiwgaWR4KVxyXG4gICAgICAgICAgICB0aGlzLm1fTW91bnRMaW5lc1tpZHhdID0gbmV3TW91bnRhaW47XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3TW91bnRhaW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEluaXQoc3RhcnRGbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGxpbmVzOiBNb3VudExpbmVbXSA9IHRoaXMubV9Nb3VudExpbmVzO1xyXG4gICAgICAgIHN0YXJ0Rmxvb3IgPSAoIXN0YXJ0Rmxvb3IpICYmIChzdGFydEZsb29yIDwgMCkgJiYgKHN0YXJ0Rmxvb3IgPj0gbGluZXMubGVuZ3RoKSA/IDAgOiBzdGFydEZsb29yO1xyXG4gICAgICAgIHRoaXMubV9IZWFkRmxvb3JJZHggPSBsaW5lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMubV9UYWlsRkxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpZHg6IG51bWJlciA9IDA7IGlkeCA8IGxpbmVzLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIGxpbmU6IE1vdW50TGluZSA9IGxpbmVzW2lkeF07XHJcbiAgICAgICAgICAgIGxpbmUuU2V0TGluZShpZHgsIHRoaXMuQ291bnROZXh0Rmxvb3JEaXJTd2l0aCgpKTtcclxuICAgICAgICAgICAgaWYgKGlkeCAhPSBzdGFydEZsb29yICYmIGlkeCA+IDEpXHJcbiAgICAgICAgICAgICAgICBsaW5lc1tpZHggLSAxXS5TZXROZXh0Rmxvb3IobGluZSk7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIFBsYXllclN0ZXAgPSBsaW5lLkdldFN0ZXAoTWF0aC5mbG9vcihsaW5lLkxlbmd0aCAvIDIpKTtcclxuICAgICAgICAgICAgICAgIFBsYXllclN0ZXAuSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX1NhZmVMb2NhdGlvbiA9IFBsYXllclN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtSW5MaW5lKGlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDb3VudE5leHRGbG9vckRpclN3aXRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9yaWdodFN3aXRjaENvdW50O1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldE5leHRGbHBwckRpclN3aXRjaChudW06IG51bWJlcikgIHtcclxuICAgICAgICB0aGlzLm1fcmlnaHRTd2l0Y2hDb3VudCA9IG51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0U2FmZVN0ZXAoKTogU3RlcCB7XHJcbiAgICAgICAgdmFyIGZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLm1fU2FmZUxvY2F0aW9uLlkpO1xyXG4gICAgICAgIGlmIChmbG9vcilcclxuICAgICAgICAgICAgcmV0dXJuIGZsb29yLkdldFN0ZXAodGhpcy5tX1NhZmVMb2NhdGlvbi5YKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJyZWFrTGluZShmbG9vcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHRhaWxGbG9vciA9IHRoaXMuVGFpbEZMb29yO1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRhaWxGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBicmVha0Zsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgYnJlYWtGbG9vci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBjb3VudEZsb29yOiBudW1iZXIgPSB0YWlsRmxvb3IuRmxvb3JOdW07IGNvdW50Rmxvb3IgPD0gZmxvb3I7ICsrY291bnRGbG9vcikge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGNvdW50Rmxvb3IpO1xyXG4gICAgICAgICAgICB0YXJnZXRGbG9vci5CcmVhaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFRhaWxlRmxvb3IoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9ruWuieWFqOS9jee9rlxyXG4gICAgU2V0U2FmZVBTKGxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbikge1xyXG4gICAgICAgIHRoaXMubV9TYWZlTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICBpZiAobG9jYXRpb24uWSA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtIHx8IGxvY2F0aW9uLlkgPiB0aGlzLkhlYWRGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVzZXRJdGVtKGxvY2F0aW9uLlkpXHJcbiAgICB9XHJcblxyXG4gICAgLy/ku47mn5DkuIDlsYLlvIDlp4vkuIDlsYLlsYLph43mlrDmkYbmlL7pgZPlhbdcclxuICAgIFJlc2V0SXRlbShmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0N1ckxpbmVCYXJyaWVycyA9IG5ldyBBcnJheTxJdGVtLkxpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLm1fQ3VyTGluZVJld2FyZHMgPSBuZXcgQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgbG9vcEZsb29yOiBudW1iZXIgPSBmbG9vcjsgbG9vcEZsb29yIDw9IHRoaXMuSGVhZEZsb29yLkZsb29yTnVtOyArK2xvb3BGbG9vcikge1xyXG4gICAgICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9vcEZsb29yKTtcclxuICAgICAgICAgICAgZmxvb3JMaW5lLkxheU91dERpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZsb29yTGluZS5TZXRMaW5lKGZsb29yTGluZS5GbG9vck51bSwgdGhpcy5Db3VudE5leHRGbG9vckRpclN3aXRoKCkpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW1JbkxpbmUobG9vcEZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lsYLmlbDojrflj5bmn5DlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgR2V0Rmxvb3JCeUZsb29yKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yOiBNb3VudExpbmUgPSB0aGlzLlRhaWxGTG9vcjtcclxuICAgICAgICBpZiAoZmxvb3IgPCB0YWlsRmxvb3IuRmxvb3JOdW0gfHwgZmxvb3IgPiB0aGlzLkhlYWRGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29ySUQgPSAoZmxvb3IgLSB0YWlsRmxvb3IuRmxvb3JOdW0gKyB0aGlzLm1fVGFpbEZMb29ySWR4KSAlIHRoaXMubV9Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vdW50TGluZXNbZmxvb3JJRF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvqrnjq/orr7nva7lsYLlj7DpmLZcclxuICAgICAqIEBwYXJhbSBmbG9vciDlsYJcclxuICAgICAqIEBwYXJhbSBPd25lciBcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlvqrnjq/miafooYzlm57osINcclxuICAgICAqL1xyXG4gICAgTG9vcERvRmxvb3JTdGVwKGZsb29yOiBudW1iZXIsIE93bmVyOiBhbnksIGNhbGxCYWNrOiAoc3RlcDogU3RlcCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtIHx8IGZsb29yID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3JMaW5lOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZmxvb3JMaW5lLkxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vckxpbmUuR2V0U3RlcChpZHgpO1xyXG4gICAgICAgICAgICBjYWxsQmFjay5jYWxsKE93bmVyLCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciDnianlk4HliJfooahcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIFB1dEl0ZW1JbkxpbmUoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBzYWZlQ29sOiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIHZhciBmbG9vckxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgLy/luIPnva7ov4fkuobkuI3nlKjlho3luIPnva7kuoZcclxuICAgICAgICBpZiAoZmxvb3JMaW5lLkxheU91dERpcnR5KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZmxvb3JMaW5lLkxheU91dERpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGlmKGZsb29yID49IHRoaXMuX1NhZmVMb2NhdGlvbi5ZICsgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTWF4TGluZU51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNhZmVDb2wgPSB0aGlzLl9Db3VudE9wZW5MaXN0KGZsb29yKTtcclxuICAgICAgICB9ZWxzZSovXHJcbiAgICAgICAgdmFyIHNhZmVJZHhDb2xsOiB7IFtrZXk6IG51bWJlcl06IG51bWJlcjsgfSA9IHRoaXMuQ291bnRSb2FkSW5mbyhmbG9vcik7XHJcblxyXG4gICAgICAgIC8v5Ye655Sf54K55LiN5pS+6YGT5YW3XHJcbiAgICAgICAgaWYgKGZsb29yIDwgMSB8fCBmbG9vciA9PSB0aGlzLm1fU2FmZUxvY2F0aW9uLlkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iOt+WPluivpeihjOimgeaRhuaUvueahOeJqeWTgVxyXG4gICAgICAgIHRoaXMuVGFrZUl0ZW1MaXN0KGZsb29yKVxyXG5cclxuICAgICAgICAvL+aKiumcgOimgeaUvumBk+WFt+eahOagvOWtkOaUvuWFpemaj+acuuaxoFxyXG4gICAgICAgIHZhciBjdXJGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciByYW5kb21Qb29sOiBBcnJheTxTdGVwPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8v5oqK5a6J5YWo55qE5qC85a2Q5pqC5pe256e75Ye65p2lXHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDogQXJyYXk8U3RlcD4gPSBuZXcgQXJyYXk8U3RlcD4oKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4OiBudW1iZXIgPSAwOyBzdGVwSWR4IDwgY3VyRmxvb3IuTGVuZ3RoOyArK3N0ZXBJZHgpIHtcclxuICAgICAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSBjdXJGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoc2FmZUlkeENvbGxbc3RlcElkeF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnB1c2goZ2V0U3RlcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY29uc29sZS5sb2coc2FmZVN0ZXBMaXN0KTtcclxuICAgICAgICAvL+aUvumZt+mYsVxyXG4gICAgICAgIHZhciBiYXJyaWVyc0xpc3Q6IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPiA9IHRoaXMubV9DdXJMaW5lQmFycmllcnM7XHJcbiAgICAgICAgdGhpcy5Pcmdpbml6ZVB1dEl0ZW0oYmFycmllcnNMaXN0LCByYW5kb21Qb29sLCB0cnVlKTtcclxuICAgICAgICAvL+aRhuaUvumBk+WFt1xyXG4gICAgICAgIGZvciAodmFyIHNhZmVTdGVwSWR4OiBudW1iZXIgPSAwOyBzYWZlU3RlcElkeCA8IHNhZmVTdGVwTGlzdC5sZW5ndGg7ICsrc2FmZVN0ZXBJZHgpIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKHNhZmVTdGVwTGlzdFtzYWZlU3RlcElkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmV3YXJkTGlzdCA9IHRoaXMuQ3VyTGluZVJld2FyZHM7XHJcbiAgICAgICAgdGhpcy5Pcmdpbml6ZVB1dEl0ZW0ocmV3YXJkTGlzdCwgcmFuZG9tUG9vbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TGluZUl0ZW1JbmZvPn0gaXRlbUxpc3Qg54mp5ZOB5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFN0ZXA+fSByYW5kb21Qb29sIOWPsOmYtumbhuWQiFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0RlYWRSb2FkIOaYr+WQpuaYr+atu+i3r1xyXG4gICAgICovXHJcbiAgICBPcmdpbml6ZVB1dEl0ZW0oaXRlbUxpc3Q6IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPiwgcmFuZG9tUG9vbDogQXJyYXk8U3RlcD4sIGlzRGVhZFJvYWQ6IGJvb2xlYW4gPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgZm9yICh2YXIgaXRlbUlkeDogbnVtYmVyID0gMDsgaXRlbUlkeCA8IGl0ZW1MaXN0Lmxlbmd0aDsgKytpdGVtSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOiBJdGVtLkxpbmVJdGVtSW5mbyA9IGl0ZW1MaXN0W2l0ZW1JZHhdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkaWZmaWN1bHR5TnVtOiBudW1iZXIgPSAwOyBkaWZmaWN1bHR5TnVtIDwgaW5mby5OdW1iZXI7KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tUG9vbC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+maj+acuuaKiumanOeijeaUvuWFpeagvOWtkOmHjFxyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbUlkeDogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmFuZG9tUG9vbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSByYW5kb21Qb29sW3JhbmRvbUlkeF07XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnNwbGljZShyYW5kb21JZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgc3RlcC5QdXRJdGVtKGluZm8uVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWFkUm9hZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IGlzRGVhZFJvYWQ7XHJcbiAgICAgICAgICAgICAgICAtLWluZm8uTnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyYW5kb21Qb29sLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtSWR4ID4gMCkge1xyXG4gICAgICAgICAgICBpdGVtTGlzdC5zcGxpY2UoMCwgaXRlbUlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS+6YGT5YW35YmN566X6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIENvdW50Um9hZEluZm8oZmxvb3I6IG51bWJlcik6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0ge1xyXG4gICAgICAgIHZhciBzYWZlTGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIHZhciBzYWZlTWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9ID0ge307XHJcbiAgICAgICAgdmFyIHN0ZXBOZWVkUmFuZG9tTGlzdCA9IFtdO1xyXG4gICAgICAgIHZhciBzdGVwTm9kZUNvdW50OiBBcnJheTxudW1iZXI+ID0gW11cclxuICAgICAgICB2YXIgdGhpc0Zsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcblxyXG4gICAgICAgIHZhciByb2FkTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBsYXN0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yIC0gMSk7XHJcbiAgICAgICAgdmFyIHNhZmVJZHg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGZsb29yID09IHRoaXMubV9TYWZlTG9jYXRpb24uWSkge1xyXG4gICAgICAgICAgICB0aGlzLl9SZXNldFN0ZXBJbmZvKHRoaXNGbG9vcik7XHJcbiAgICAgICAgICAgIHZhciBzYWZlU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKHRoaXMubV9TYWZlTG9jYXRpb24uWCk7XHJcbiAgICAgICAgICAgIHNhZmVTdGVwLklzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc2FmZU1hcFt0aGlzLm1fU2FmZUxvY2F0aW9uLlhdID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHN0ZXBJZHg6IG51bWJlciA9IDA7IHN0ZXBJZHggPCBsYXN0Rmxvb3IuTGVuZ3RoOyArK3N0ZXBJZHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gbGFzdEZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RlcC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRTdGVwOiBTdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0U3RlcDogU3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVmdElkeDogbnVtYmVyID0gbGVmdFN0ZXAgPyBsZWZ0U3RlcC5JZHggOiAtMTtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodHRJZHg6IG51bWJlciA9IHJpZ2h0U3RlcCA/IHJpZ2h0U3RlcC5JZHggOiAtMTtcclxuICAgICAgICAgICAgICAgIGlmIChsZWZ0SWR4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwTm9kZUNvdW50W2xlZnRJZHhdID0gc3RlcE5vZGVDb3VudFtsZWZ0SWR4XSA/IHN0ZXBOb2RlQ291bnRbbGVmdElkeF0gOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBOb2RlQ291bnRbbGVmdElkeF0gKz0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChyaWdodHRJZHggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBOb2RlQ291bnRbcmlnaHR0SWR4XSA9IHN0ZXBOb2RlQ291bnRbcmlnaHR0SWR4XSA/IHN0ZXBOb2RlQ291bnRbcmlnaHR0SWR4XSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcE5vZGVDb3VudFtyaWdodHRJZHhdICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmlnaHR0SWR4ID4gLTEgJiYgbGVmdElkeCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcE5lZWRSYW5kb21MaXN0LnB1c2goW3JpZ2h0dElkeCwgbGVmdElkeF0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2FmZVN0ZXBJZHg6IG51bWJlciA9IGxlZnRJZHggPiAwID8gbGVmdElkeCA6IHJpZ2h0dElkeDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2FmZVN0ZXBJZHggPCAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBzYWZlTWFwW3NhZmVTdGVwSWR4XSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZUlkeCArPSBzYWZlU3RlcElkeDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBjb3VudElkeDogbnVtYmVyID0gMDsgY291bnRJZHggPCBzdGVwTmVlZFJhbmRvbUxpc3QubGVuZ3RoOyArK2NvdW50SWR4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mbyA9IHN0ZXBOZWVkUmFuZG9tTGlzdFtjb3VudElkeF07XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVmdElkeDogbnVtYmVyID0gaW5mb1swXTtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodElkeDogbnVtYmVyID0gaW5mb1sxXTtcclxuICAgICAgICAgICAgICAgIGlmICghc2FmZU1hcFtsZWZ0SWR4XSAmJiAhc2FmZU1hcFtyaWdodElkeF0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZCA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhbmQgPiAwLjUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2FmZU1hcFtsZWZ0SWR4XSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVJZHggKz0gbGVmdElkeDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVNYXBbcmlnaHRJZHhdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2FmZUlkeCArPSByaWdodElkeDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgY291bnRTdGVwTm9kZTogbnVtYmVyID0gMDsgY291bnRTdGVwTm9kZSA8IHRoaXNGbG9vci5MZW5ndGg7ICsrY291bnRTdGVwTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXBudW06IG51bWJlciA9IHN0ZXBOb2RlQ291bnRbY291bnRTdGVwTm9kZV07XHJcbiAgICAgICAgICAgICAgICBzdGVwbnVtID0gc3RlcG51bSA/IHN0ZXBudW0gOiAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXBudW0gPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBsYXN0Rmxvb3IuR2V0U3RlcChjb3VudFN0ZXBOb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzYWZlSWR4ID09IFwiXCIpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHNhZmVNYXA7XHJcbiAgICB9XHJcblxyXG4gICAgX1Jlc2V0U3RlcEluZm8odGhpc0Zsb29yOiBNb3VudExpbmUpIHtcclxuICAgICAgICBpZiAoIXRoaXNGbG9vcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGxvZ2ljSWR4OiBudW1iZXIgPSAwOyBsb2dpY0lkeCA8IHRoaXNGbG9vci5MZW5ndGg7ICsrbG9naWNJZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5p+Q6YGT5YW35L+h5oGvXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgVGFrZUl0ZW1MaXN0KGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgbGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICB2YXIgaXRlbUxpc3QgPSBuZXcgQXJyYXkobGluZS5MZW5ndGgpO1xyXG4gICAgICAgIHZhciBsaW5lUmV3YXJkcyA9IHRoaXMubV9JdGVtTGF5b3V0LlRha2VMaW5lUmV3YXJkKGZsb29yKTtcclxuICAgICAgICB0aGlzLm1fQ3VyTGluZVJld2FyZHMgPSB0aGlzLm1fQ3VyTGluZVJld2FyZHMuY29uY2F0KGxpbmVSZXdhcmRzKTtcclxuICAgICAgICBpZiAodGhpcy5tX1NhZmVMb2NhdGlvbi5ZID4gZmxvb3IgfHwgZmxvb3IgPiB0aGlzLm1fU2FmZUxvY2F0aW9uLlkgKyAxKSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lQmFycmllcnMgPSB0aGlzLm1fSXRlbUxheW91dC5UYWtlTGluZURpZmZpY3VsdHkoZmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyTGluZUJhcnJpZXJzID0gdGhpcy5tX0N1ckxpbmVCYXJyaWVycy5jb25jYXQobGluZUJhcnJpZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fQ3VyTGluZUJhcnJpZXJzLmxlbmd0aCA+IDApXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQ3VyTGluZUJhcnJpZXJzID0gbmV3IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WwhuWxguWQkeS4iuWPoFxyXG4gICAgcHVibGljIFB1c2hGTG9vcihkaXI6IG51bWJlciA9IDApIHtcclxuICAgICAgICB2YXIgcHJlSGVhZDogTW91bnRMaW5lID0gdGhpcy5IZWFkRmxvb3I7XHJcbiAgICAgICAgdGhpcy5tX0hlYWRGbG9vcklkeCA9ICh0aGlzLm1fSGVhZEZsb29ySWR4ICsgMSkgJSB0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHRoaXMubV9UYWlsRkxvb3JJZHggPSAodGhpcy5tX1RhaWxGTG9vcklkeCArIDEpICUgdGhpcy5Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICB2YXIgSGVhZGZsb29yOiBudW1iZXIgPSBwcmVIZWFkLkZsb29yTnVtICsgMTtcclxuICAgICAgICB0aGlzLm1fcmlnaHRTd2l0Y2hDb3VudCArPSBkaXI7XHJcbiAgICAgICAgdGhpcy5IZWFkRmxvb3IuU2V0TGluZShIZWFkZmxvb3IsIHRoaXMuQ291bnROZXh0Rmxvb3JEaXJTd2l0aCgpKTtcclxuICAgICAgICBwcmVIZWFkLlNldE5leHRGbG9vcih0aGlzLkhlYWRGbG9vcik7XHJcbiAgICAgICAgdGhpcy5QdXRJdGVtSW5MaW5lKEhlYWRmbG9vcik7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIEFkZFN3aXRjaChkaXI6IG51bWJlciA9IDApIHtcclxuICAgICAgICBpZiAoZGlyID4gMC4wMSlcclxuICAgICAgICAgICAgdGhpcy5tX3JpZ2h0U3dpdGNoQ291bnQgKz0gMTtcclxuICAgICAgICBlbHNlIGlmIChkaXIgPCAtMC4wMSlcclxuICAgICAgICAgICAgdGhpcy5tX3JpZ2h0U3dpdGNoQ291bnQgLT0gMTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBTdGVwSW5mbyB7XHJcbiAgICBwYXJlbnRJRDogbnVtYmVyO1xyXG5cclxufSIsImV4cG9ydCBtb2R1bGUgR2FtZU1vZHVsZVxyXG57XHJcbiAgICBleHBvcnQgY2xhc3MgRXZlbnRcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIE9uQ2hhcmFjdGVySXRlbUNoYW5nZTpzdHJpbmcgPSBcIk9uQ2hhcmFjdGVySXRlbUNoYW5nZVwiO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgT25UaW1lUGF1c2U6c3RyaW5nID0gXCJPblRpbWVQYXVzZVwiO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgT25UaW1lQ29udGludWU6c3RyaW5nID0gXCJPblRpbWVDb250aW51ZVwiO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IHZhciBIU3BhY2U6bnVtYmVyID0gMjtcclxuICAgIGV4cG9ydCB2YXIgVlNwYWNlOm51bWJlciA9IDEuNTtcclxuICAgIGV4cG9ydCB2YXIgRFNwYWNlOm51bWJlciA9IDAuNzU7XHJcbn0iLCJleHBvcnQgbW9kdWxlIEdhbWVTdHJ1Y3Rcclxue1xyXG4gICAgZXhwb3J0IGNsYXNzIFNldEluZm8ge1xyXG4gICAgICAgIEF1ZGlvT246IGJvb2xlYW47XHJcbiAgICAgICAgT1BJc1JpZ2h0OiBib29sZWFuO1xyXG4gICAgICAgIFRleHRJbmZvOiBzdHJpbmc7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQXVkaW9PbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuT1BJc1JpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5UZXh0SW5mbyA9IFwiSGVsbG8gXFxuIEhlbGxvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE1Mb2NhdGlvblxyXG4gICAge1xyXG4gICAgICAgIGdldCBYKCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQXJyWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgWCh4Om51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyclswXSA9eDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFkoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBZKHk6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzFdID0geTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfQXJyOkFycmF5PG51bWJlcj47XHJcbiAgICAgICAgY29uc3RydWN0b3IoIHg6bnVtYmVyLHk6bnVtYmVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyciA9IFt4LHldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCB2YXIgSXRlbURpY3RUeXBlOntbSXRlbVR5cGU6bnVtYmVyXTphbnl9O1xyXG4gICAgSXRlbURpY3RUeXBlID0geyB9O1xyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOi+k+WFpeeuoeeQhuebuOWFs1xyXG4gKi9cclxuaW1wb3J0IEdhbWVTY2VuZVBsYXkgZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVQbGF5L0dhbWVTY2VuZVBsYXlcIlxyXG5leHBvcnQgbW9kdWxlIElucHV0IHtcclxuICAgIC8v5Z+656GA6L6T5YWl5o6n5Yi25ZmoXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVJbnB1dCB7XHJcbiAgICAgICAgLy/lhazmnIlcclxuICAgICAgICBOZXh0SW5wdXQ6IEJhc2VHYW1lSW5wdXQ7XHJcbiAgICAgICAgYWJzdHJhY3QgSW5wdXQoaXNSaWdodDogYm9vbGVhbik7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGlucHV0OiBCYXNlR2FtZUlucHV0ID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0ID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5OZXh0SW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkgIHsgfVxyXG4gICAgICAgIENsZWFyKCkgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIERJWUlucHV0IGV4dGVuZHMgQmFzZUdhbWVJbnB1dCB7XHJcbiAgICAgICAgSW5wdXQoaXNSaWdodDogYm9vbGVhbikgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0xpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fTGlzdGVuZXIuY2FsbCh0aGlzLl9Pd25lciwgaXNSaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX093bmVyOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBfTGlzdGVuZXI6IChpc3Jpbmc6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgICAgICAgY29uc3RydWN0b3Iob3duZXI6IGFueSA9IG51bGwsIGxpc3RlbmVyOiAoaXNyaW5nOiBib29sZWFuKSA9PiB2b2lkID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fT3duZXIgPSBvd25lcjtcclxuICAgICAgICAgICAgdGhpcy5fTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTm9ybUdhbWVJbnB1dCBleHRlbmRzIEJhc2VHYW1lSW5wdXQge1xyXG4gICAgICAgIEdhbWVEaXI6IEdhbWVTY2VuZVBsYXk7XHJcbiAgICAgICAgX0RpcnR5OiBib29sZWFuO1xyXG4gICAgICAgIF9Jc1JpZ2h0OiBib29sZWFuO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGRpcjogR2FtZVNjZW5lUGxheSwgaW5wdXQ6IEJhc2VHYW1lSW5wdXQgPSBudWxsKSAge1xyXG4gICAgICAgICAgICBzdXBlcihpbnB1dCk7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZURpciA9IGRpcjtcclxuICAgICAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fSXNSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBJbnB1dChpc1JpZ2h0OiBib29sZWFuKSAge1xyXG4gICAgICAgICAgICAvL3RoaXMuR2FtZURpci5Nb3ZlU3RlcChpc1JpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5fRGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9Jc1JpZ2h0ID0gaXNSaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0RpcnR5ICYmIHRoaXMuR2FtZURpci5QbGF5ZXIuQmFzZUN0cmxlci5Jc0ZhbGxpbmcpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HYW1lRGlyLk1vdmVTdGVwKHRoaXMuX0lzUmlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENsZWFyKCkgIHtcclxuICAgICAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vR2FtZU1vZHVsZVwiO1xyXG50eXBlIFN0ZXBJdGVtID0gSXRlbS5TdGVwSXRlbTtcclxudmFyIEhTcGFjZTogbnVtYmVyO1xyXG52YXIgVlNwYWNlOiBudW1iZXI7XHJcbnZhciBEU3BhY2U6IG51bWJlcjtcclxuLyoq5L2c6ICFOk1vXHJcbirlnLrmma/lhoXlr7nosaEgXHJcbiovXHJcbi8v566h55CG5LiA5pW06KGMXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdW50TGluZSBleHRlbmRzIExheWEuU3ByaXRlM0Qge1xyXG4gICAgcHJpdmF0ZSBtX1JpZ2h0U3dpdGNoOiBudW1iZXI7XHJcbiAgICBtX1N0ZXBMaXN0OiBTdGVwW107XHJcblxyXG4gICAgTGF5T3V0RGlydHk6IGJvb2xlYW47XHJcbiAgICBMaW5lSWR4OiBudW1iZXI7XHJcbiAgICBGbG9vck51bTogbnVtYmVyO1xyXG4gICAgU3RlcEl0ZW06IFN0ZXBJdGVtO1xyXG4gICAgZ2V0IHJpZ2h0U3dpdGNoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9SaWdodFN3aXRjaDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldCBQb3NpdGlvbihuZXdQUzogTGF5YS5WZWN0b3IzKSB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0IFBvc2l0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fU3RlcExpc3QubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxpbmVJZHg6IG51bWJlciwgQ29sdW1iOiBudW1iZXIsIGZsb29yOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgSFNwYWNlID0gR2FtZU1vZHVsZS5IU3BhY2UvL2hTcGFjZTtcclxuICAgICAgICBWU3BhY2UgPSBHYW1lTW9kdWxlLlZTcGFjZTtcclxuICAgICAgICBEU3BhY2UgPSBHYW1lTW9kdWxlLkRTcGFjZTtcclxuICAgICAgIFxyXG4gICAgICAgIHZhciBjb2x1bW5zOiBudW1iZXIgPSBDb2x1bWI7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fUmlnaHRTd2l0Y2ggPSAwO1xyXG4gICAgICAgIHRoaXMuTGluZUlkeCA9IGxpbmVJZHg7XHJcbiAgICAgICAgdGhpcy5GbG9vck51bSA9IGZsb29yO1xyXG4gICAgICAgIHRoaXMubV9TdGVwTGlzdCA9IFtdO1xyXG4gICAgICAgIHZhciBzdGFydFg6bnVtYmVyID0gMDtcclxuICAgICAgICBmb3IgKHZhciBTdGFydElkeDogbnVtYmVyID0gMDsgU3RhcnRJZHggPCBjb2x1bW5zOyArK1N0YXJ0SWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdTdGVwOiBTdGVwID0gbmV3IFN0ZXAodGhpcywgU3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ld1N0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLm1fU3RlcExpc3RbU3RhcnRJZHhdID0gbmV3U3RlcDtcclxuICAgICAgICAgICAgdmFyIHN0ZXBWZWN0b3IgPSBuZXdTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICBzdGVwVmVjdG9yLnggPSBzdGFydFg7XHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBIU3BhY2U7XHJcbiAgICAgICAgICAgIG5ld1N0ZXAudHJhbnNmb3JtLnBvc2l0aW9uID0gc3RlcFZlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7ojrflj5bmmL7npLrlh7rmnaXnmoTnrKzlh6DkuKrlubPlj7BcclxuICAgIEdldFN0ZXAoaWR4OiBudW1iZXIpOiBTdGVwIHtcclxuICAgICAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5tX1N0ZXBMaXN0Lmxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9TdGVwTGlzdFtpZHhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5q+P5bGCXHJcbiAgICBTZXRMaW5lKGZsb29yOiBudW1iZXIsIHJpZ2h0U3dpdGNoOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fUmlnaHRTd2l0Y2ggPSByaWdodFN3aXRjaDtcclxuICAgICAgICB0aGlzLkxheU91dERpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB2YXIgbmV3UFMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICBuZXdQUy55ID0gVlNwYWNlICogZmxvb3I7XHJcbiAgICAgICAgbmV3UFMueiA9IC1EU3BhY2UgKiBmbG9vcjtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIGZvciAodmFyIHN0YXJ0SWR4OiBudW1iZXIgPSAwOyBzdGFydElkeCA8IHRoaXMubV9TdGVwTGlzdC5sZW5ndGg7ICsrc3RhcnRJZHgpIHtcclxuICAgICAgICAgICAgdmFyIHRoaVN0ZXAgPSB0aGlzLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlTdGVwLlJlc2V0U3RlcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WIpOaWreaYr+WQpuaUtue8qeeahOmCo+WxglxyXG4gICAgSnVnSXNPZGQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRmxvb3JOdW0gJSAyICE9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsIbmr4/kuKroioLngrnpk77mjqXliLDkuIvkuIDlsYJcclxuICAgIFNldE5leHRGbG9vcihsYXN0Rmxvb3I6IE1vdW50TGluZSk6IHZvaWQge1xyXG4gICAgICAgIHZhciBkaXI6bnVtYmVyID0gbGFzdEZsb29yLnJpZ2h0U3dpdGNoIC0gdGhpcy5yaWdodFN3aXRjaDtcclxuICAgICAgICB2YXIgc3dpdGNoRGlyOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGlmIChkaXIgKiBkaXIgPiAwLjAxKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaERpciA9IGRpcjtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgaWYgKGRpciA+IDApXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2hEaXIgPSAxO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzd2l0Y2hEaXIgPSAtMTtcclxuICAgICAgICAgICAgICAgICovXHJcbiAgICAgICAgfSBlbHNlICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkp1Z0lzT2RkKCkpICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2hEaXIgPSAtMTtcclxuICAgICAgICAgICAgfSBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2hEaXIgPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwb3NpdGlvbjogTGF5YS5WZWN0b3IzID0gbGFzdEZsb29yLlBvc2l0aW9uO1xyXG4gICAgICAgIHBvc2l0aW9uLnggPSB0aGlzLlBvc2l0aW9uLnggKyBzd2l0Y2hEaXIgKiBIU3BhY2UgLyAyO1xyXG4gICAgICAgIGxhc3RGbG9vci5Qb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5pyJ5Lik5aS056uv54K5XHJcbiAgICAgICAgZm9yICh2YXIgc3RhcnRJZHg6IG51bWJlciA9IDA7IHN0YXJ0SWR4IDwgdGhpcy5tX1N0ZXBMaXN0Lmxlbmd0aDsgKytzdGFydElkeCkge1xyXG4gICAgICAgICAgICB2YXIgbGVmdFBhcmVudDogU3RlcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciByaWdodFBhcmVudDogU3RlcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0UGFyZW50SWR4OiBudW1iZXIgPSBzdGFydElkeDtcclxuICAgICAgICAgICAgaWYgKHN3aXRjaERpciA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxlZnRQYXJlbnRJZHggPSBsZWZ0UGFyZW50SWR4IC0gc3dpdGNoRGlyO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGVmdFBhcmVudElkeCA9IGxlZnRQYXJlbnRJZHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGVmdFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKGxlZnRQYXJlbnRJZHgpO1xyXG4gICAgICAgICAgICByaWdodFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKGxlZnRQYXJlbnRJZHggKyAxKTtcclxuICAgICAgICAgICAgdmFyIHRoaVN0ZXAgPSB0aGlzLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlTdGVwLkxlZnRQYXJlbnQgPSBsZWZ0UGFyZW50O1xyXG4gICAgICAgICAgICBsZWZ0UGFyZW50ICYmIChsZWZ0UGFyZW50LlJpZ2h0Q2hpbGQgPSB0aGlTdGVwKTtcclxuICAgICAgICAgICAgdGhpU3RlcC5SaWdodFBhcmVudCA9IHJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICByaWdodFBhcmVudCAmJiAocmlnaHRQYXJlbnQuTGVmdENoaWxkID0gdGhpU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pWy56KO5LiA5bGCXHJcbiAgICBCcmVhaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDb250aW51ZSgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgUGF1c2UoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2V0ZWQ6IGJvb2xlYW47XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBQbGF5ZXJDb250cm9sZXIgfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgeyBDaGFyYWN0ZXIgfSBmcm9tIFwiLi9DaGFyYWN0ZXJcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiXHJcbmltcG9ydCBDaGFyYWN0ZXJNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi9HYW1lTW9kdWxlXCI7XHJcbnZhciBudW06IG51bWJlciA9IDA7XHJcbi8v6K+l6ISa5pys55So5LqO5ri45oiP546p5a625a+56LGh566h55CGXHJcbi8v546p5a625a+56LGhXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIExheWEuU3ByaXRlM0Qge1xyXG4gICAgLy/np4HmnInlsZ7mgKdcclxuICAgIF9Mb2dpY1Bvc2l0aW9uOiBMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF9CdWZmTm9kZTogTGF5YS5TcHJpdGUzRDtcclxuICAgIHByaXZhdGUgX1BsYXllck1vZGVsOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBfQ3VyU3RlcDogU3RlcDtcclxuICAgIHByaXZhdGUgX0N0cmxlcjogUGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXI7XHJcbiAgICBwcml2YXRlIG1fQW5pbWF0b3I6IExheWEuQW5pbWF0b3I7XHJcbiAgICBwcml2YXRlIG1fQnVmZk1vZGVsOiB7IFtuYW1lOiBudW1iZXJdOiBMYXlhLlNwcml0ZTNEIH1cclxuICAgIHByaXZhdGUgbV9TdGF0ZU1hcDoge31cclxuXHJcbiAgICBCYXNlQ3RybGVyOiBQbGF5ZXJDb250cm9sZXIuUGxheWVyTm9ybUN0cmxlcjtcclxuICAgIEJ1ZmZBcnI6IEFycmF5PEl0ZW0uQmFzZVBsYXllckJ1ZmY+O1xyXG4gICAgSWROdW1iZXI6IG51bWJlcjtcclxuICAgIHB1YmxpYyBQbGF5ZXJEZWF0aDogYm9vbGVhbjtcclxuXHJcbiAgICBzZXQgQ3VyU3RlcChzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgdGhpcy5fQ3VyU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyU3RlcCgpOiBTdGVwIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU3RlcDtcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbihuZXdQUzogTGF5YS5WZWN0b3IzKSB7XHJcbiAgICAgICAgdmFyIG5ld1BTOiBMYXlhLlZlY3RvcjMgPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTogTGF5YS5WZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2dpY1Bvc2l0aW9uKCk6IExheWEuVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0xvZ2ljUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsID0ge307XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcyk7XHJcblxyXG4gICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbiAgICAgICAgdGhpcy5vbihMYXlhLkV2ZW50LlJFTU9WRUQsIHRoaXMsICgpID0+IHsgdGhpcy5kZXN0cm95KCkgfSlcclxuICAgICAgICB2YXIgbWdyOiBDaGFyYWN0ZXJNYW5hZ2VyID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgUGF1c2UoKSAge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcih0aGlzLCB0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5zcGVlZCA9IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ29udGludWUoKSAge1xyXG4gICAgICAgIHRoaXMuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMuX1VwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnNwZWVkID0gMTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbV9IZWFkTm9kZTogTGF5YS5TcHJpdGUzRDtcclxuXHJcbiAgICBwcml2YXRlIEluaXRCVWZmTW9kZWwocGxheWVyTW9kZWw6IExheWEuU3ByaXRlM0QpIHtcclxuICAgICAgICB0aGlzLl9QbGF5ZXJNb2RlbCA9IHBsYXllck1vZGVsO1xyXG4gICAgICAgIHRoaXMubV9IZWFkTm9kZSA9IG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICAgICAgdmFyIEhlYWROb2RlOiBMYXlhLlNwcml0ZTNEID0gcGxheWVyTW9kZWwuZ2V0Q2hpbGRCeU5hbWUoXCJoZWFkXCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLm1fSGVhZE5vZGUpO1xyXG4gICAgICAgIHRoaXMubV9IZWFkTm9kZS50cmFuc2Zvcm0ucG9zaXRpb24gPSBIZWFkTm9kZS50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLm1fSGVhZE5vZGUudHJhbnNmb3JtLnJvdGF0aW9uID0gSGVhZE5vZGUudHJhbnNmb3JtLnJvdGF0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5tX0hlYWROb2RlLnRyYW5zZm9ybS5zY2FsZSA9IEhlYWROb2RlLnRyYW5zZm9ybS5zY2FsZS5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuU2V0TW9kZWwoXCJpdGVtX2ZseWVyXzAxXCIsIFwiUl9oYW5kXCIsIHBsYXllck1vZGVsLCBJdGVtLkl0ZW1UeXBlLkZseSk7XHJcbiAgICAgICAgdGhpcy5TZXRNb2RlbChcIml0ZW1fc2hpZWxkXzAxXCIsIFwiaGVhZFwiLCBwbGF5ZXJNb2RlbCwgSXRlbS5JdGVtVHlwZS5Qcm90ZWN0KTtcclxuICAgICAgICB0aGlzLlNldE1vZGVsKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiLCBcImhlYWRcIiwgcGxheWVyTW9kZWwsIEl0ZW0uSXRlbVR5cGUuSG9seVByb3RlY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0TW9kZWwocmVzb3VyY2VOYW1lOiBzdHJpbmcsIG5vZGVOYW1lOiBzdHJpbmcsIHBsYXllck1vZGVsOiBMYXlhLlNwcml0ZTNELCBpdGVtVHlwZTogSXRlbS5JdGVtVHlwZSkge1xyXG4gICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldExIKHJlc291cmNlTmFtZSkpO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6IExheWEuU3ByaXRlM0QgPSBtb2RlbC5jbG9uZSgpO1xyXG5cclxuICAgICAgICBwbGF5ZXJNb2RlbC5nZXRDaGlsZEF0KDApLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgc3dpdGNoIChub2RlTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVhZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0hlYWROb2RlLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9BbmltYXRvci5saW5rU3ByaXRlM0RUb0F2YXRhck5vZGUobm9kZU5hbWUsIGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1ZmZNb2RlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsW2l0ZW1UeXBlXSA9IGJ1ZmZNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRmFjZU1vZGVsVG8ocm90YXRpb246IExheWEuUXVhdGVybmlvbikgIHtcclxuICAgICAgICB0aGlzLl9QbGF5ZXJNb2RlbC50cmFuc2Zvcm0ucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBNb2RlbFJvdGF0ZUV1bGFyKHZlY3RvcjpMYXlhLlZlY3RvcjMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fUGxheWVyTW9kZWwudHJhbnNmb3JtLnJvdGF0aW9uRXVsZXI9IHZlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0UGxheWVyTW9kZWwobW9kZWw6IExheWEuU3ByaXRlM0QpIHtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKG1vZGVsKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygwLCAxODAsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvciA9IG1vZGVsLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIHZhciBsYXllcjogTGF5YS5NYXBMYXllciA9IHRoaXMubV9BbmltYXRvci5nZXRDb250cm9sbGVyTGF5ZXIoKS5fc3RhdGVzTWFwO1xyXG4gICAgICAgIHRoaXMubV9TdGF0ZU1hcCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLm1fU3RhdGVNYXBba2V5XSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSW5pdEJVZmZNb2RlbChtb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5fQnVmZk5vZGUpXHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9CdWZmTm9kZSA9IG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9CdWZmTm9kZSk7XHJcbiAgICAgICAgdGhpcy5CdWZmQXJyID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5CYXNlQ3RybGVyID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJOb3JtQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IHRoaXMuQmFzZUN0cmxlcjtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygwLCAwKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLCB0aGlzLCB0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHZhciBkZWZhdWx0QW5pbVN0YXRlOiBMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLm1fQW5pbWF0b3IuZ2V0RGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgdmFyIHN0YXRlTmFtZTogc3RyaW5nID0gZGVmYXVsdEFuaW1TdGF0ZS5uYW1lO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KHN0YXRlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bnjqnlrrZCVUZGXHJcbiAgICAgKiBAcGFyYW0gaWR4IOanveS9jeajgOafpVxyXG4gICAgICogQHJldHVybnMg56m66KGo56S65rKh5pyJXHJcbiAgICAgKi9cclxuICAgIEdldEJ1ZmYoaWR4OiBudW1iZXIpOiBJdGVtLkJhc2VQbGF5ZXJCdWZmIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuQnVmZkFycltpZHhdICE9IG51bGwgJiYgdGhpcy5CdWZmQXJyW2lkeF0gIT0gdW5kZWZpbmVkKSA/IHRoaXMuQnVmZkFycltpZHhdIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoEJVRkZcclxuICAgICAqIEBwYXJhbSBidWZmIFxyXG4gICAgICovXHJcbiAgICBBZGRCdWZmKGJ1ZmY6IEl0ZW0uQmFzZVBsYXllckJ1ZmYpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgc2xvdDogbnVtYmVyID0gYnVmZi5TbG90O1xyXG4gICAgICAgIGlmICh0aGlzLkJ1ZmZBcnJbc2xvdF0pIHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZUJ1ZmYoc2xvdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYnVmZk1vZGVsOiBMYXlhLlNwcml0ZTNEID0gdGhpcy5tX0J1ZmZNb2RlbFtidWZmLlR5cGVdO1xyXG4gICAgICAgIGlmIChidWZmTW9kZWwpIHtcclxuICAgICAgICAgICAgYnVmZk1vZGVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkJ1ZmZBcnJbc2xvdF0gPSBidWZmO1xyXG4gICAgICAgIGJ1ZmYuU3RhcnQoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7k+adn0JVRkZcclxuICAgICAqL1xyXG4gICAgQ29tcGxldGVCdWZmKHNsb3Q6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBidWZmOiBJdGVtLkJhc2VQbGF5ZXJCdWZmID0gdGhpcy5CdWZmQXJyW3Nsb3RdO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6IExheWEuU3ByaXRlM0QgPSB0aGlzLm1fQnVmZk1vZGVsW2J1ZmYuVHlwZV07XHJcbiAgICAgICAgaWYgKGJ1ZmZNb2RlbCkgYnVmZk1vZGVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVmZkFycltzbG90XSA9IG51bGw7XHJcbiAgICAgICAgaWYgKGJ1ZmYgPT0gbnVsbCB8fCBidWZmID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ1ZmYuUmVtb3ZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pGG5pS+6KeS6ImyXHJcbiAgICBTZXRTdGVwKHB1dFN0ZXA6IFN0ZXApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBwdXRTdGVwO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHB1dFN0ZXAuUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBuZXdQUy55ICs9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBwdXRTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uU3RhbmQpKTtcclxuICAgICAgICB0aGlzLlRvdWNoR3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluIPlsYDlvZPliY3lsYLkvYbkuI3np7vliqhcclxuICAgICAqIEBwYXJhbSB7U3RlcH0gc3RlcCDkuIvkuIDmraXlj7DpmLZcclxuICAgICAqL1xyXG4gICAgTGF5U3RlcChzdGVwOiBTdGVwKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gc3RlcDtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gc3RlcC5Qb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBTdGFydE1vdmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5KdW1wKSk7XHJcbiAgICAgICAgdGhpcy5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEp1bXBEb3duKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uSnVtcGRvd24pKTtcclxuICAgIH1cclxuXHJcbiAgICBGbHkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5GbHkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+inpuWPkeWPsOmYtlxyXG4gICAgVG91Y2hHcm91bmQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyRGVhdGggfHwgIXRoaXMuQ3VyU3RlcCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgodGhpcy5DdXJTdGVwLlN0ZXBJdGVtLkl0ZW1UeXBlID09IEl0ZW0uSXRlbVR5cGUuTm9uZSkgJiYgKHRoaXMuQ3VyU3RlcC5Jc0VtcHR5IHx8ICh0aGlzLkN1clN0ZXAuTGVmdFBhcmVudCAmJiB0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQgJiYgdGhpcy5DdXJTdGVwLkxlZnRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbiAmJiB0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbikpKSB7XHJcbiAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgICAgICB2YXIgY2xpcE5hbWU6IHN0cmluZyA9IENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uRmFsbCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fU3RhdGVNYXBbY2xpcE5hbWVdKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoY2xpcE5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5Ub3VjaEl0ZW0odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vliqhcclxuICAgICAqIEBwYXJhbSB7TGF5YS5WZWN0b3IzfSB2ZWN0b3Ig56e75Yqo5ZCR6YeP5YC8XHJcbiAgICAgKi9cclxuICAgIFRyYW5zbGF0ZSh2ZWN0b3I6IExheWEuVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnRyYW5zbGF0ZSh2ZWN0b3IsIGZhbHNlKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMuX0xvZ2ljUG9zaXRpb24sIHZlY3RvciwgdGhpcy5fTG9naWNQb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDnjqnlrrbmjqfliLblmahcclxuICAgICAqIEBwYXJhbSBuZXdDdHJsZXIg5paw546p5a625o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIEFkZEN0cmxlcihuZXdDdHJsZXI6IFBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N0cmxlcilcclxuICAgICAgICAgICAgdGhpcy5fQ3RybGVyLk9uQ29tcGxldGUoKTtcclxuICAgICAgICB2YXIgY3RybGVyOiBQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlciA9IHRoaXMuX0N0cmxlcjtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSBuZXdDdHJsZXI7XHJcbiAgICAgICAgbmV3Q3RybGVyLk5leHRDdHJsID0gY3RybGVyO1xyXG4gICAgICAgIG5ld0N0cmxlci5TZXRQbGF5ZXIodGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N0cmxlcilcclxuICAgICAgICAgICAgdGhpcy5fQ3RybGVyLk9uU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+S6pOaOp+WItuWZqFxyXG4gICAgICovXHJcbiAgICBQb3BDdHJsZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N0cmxlcilcclxuICAgICAgICAgICAgdGhpcy5fQ3RybGVyLk9uQ29tcGxldGUoKTtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLl9DdHJsZXIuTmV4dEN0cmw7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N0cmxlcilcclxuICAgICAgICAgICAgdGhpcy5fQ3RybGVyLk9uU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBfVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckRlYXRoKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIGZvciAodmFyIGJ1ZmZJZHg6IG51bWJlciA9IDA7IGJ1ZmZJZHggPCAyOyArK2J1ZmZJZHgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQnVmZkFycltidWZmSWR4XSAhPSBudWxsIHx8IHRoaXMuQnVmZkFycltidWZmSWR4XSAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1ZmZBcnJbYnVmZklkeF0uVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEZseVByZXBhcmUoKSB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RlcERhdGEge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuICAgIEdldERhdGEoc3RlcDogU3RlcCkge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi9HYW1lTW9kdWxlXCI7XHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyQ29udHJvbGVyIHtcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGxheWVyQ3RybGVyIHtcclxuICAgICAgICAvL+WFrOWFseaOpeWPo1xyXG4gICAgICAgIE5leHRDdHJsOiBCYXNlUGxheWVyQ3RybGVyO1xyXG4gICAgICAgIHBsYXllcjogUGxheWVyO1xyXG5cclxuICAgICAgICBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTZXRQbGF5ZXIocGxheWVyOiBQbGF5ZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllciwgY3RybGVyOiBCYXNlUGxheWVyQ3RybGVyID0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY3RybGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGN0cmxlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5OZXh0Q3RybCA9IGN0cmxlcjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfVXBkYXRlKCk6IHZvaWQ7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IE9uU3RhcnQoKTogdm9pZDtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgT25Db21wbGV0ZSgpOiB2b2lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55So5LqO6KeS6Imy5q2j5bi454q25oCB5LiL55qE56e75YqoXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTm9ybUN0cmxlciBleHRlbmRzIEJhc2VQbGF5ZXJDdHJsZXIge1xyXG4gICAgICAgIHByaXZhdGUgbV9TdGFydFBTOiBMYXlhLlZlY3RvcjM7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1RhcmdldFBTOiBMYXlhLlZlY3RvcjM7XHJcbiAgICAgICAgcHJpdmF0ZSBnZXQgTWlkZGxlUFMoKTogTGF5YS5WZWN0b3IzIHtcclxuICAgICAgICAgICAgdmFyIG1pZGxlUFM6IExheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLmxlcnAodGhpcy5tX1N0YXJ0UFMsIHRoaXMubV9UYXJnZXRQUywgMC41LCBtaWRsZVBTKTtcclxuICAgICAgICAgICAgbWlkbGVQUy55ICs9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgICAgIHJldHVybiBtaWRsZVBTO1xyXG4gICAgICAgIH1cclxuICAgICAgICBJc0ZhbGxpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgVGltZTogbnVtYmVyO1xyXG4gICAgICAgIGdldCBMYXN0VGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFRpbWU6IG51bWJlciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lIC0gKHRoaXMuVGltZSAtIEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0VGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoq5bey5raI6ICX5pe26Ze055m+5YiG5q+UICovXHJcbiAgICAgICAgZ2V0IFRpbWVQZXJjZW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkxhc3RUaW1lIC8gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuUGxheWVyTW92ZVRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllciA9IG51bGwpIHtcclxuICAgICAgICAgICAgc3VwZXIocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT25TdGFydCgpOiB2b2lkICB7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPbkNvbXBsZXRlKCk6IHZvaWQgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBTdGFydE1vdmUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1fU3RhcnRQUyA9IHRoaXMucGxheWVyLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm1fVGFyZ2V0UFMgPSB0aGlzLnBsYXllci5DdXJTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm1fVGFyZ2V0UFMueSArPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgcm90YXRpb246IExheWEuUXVhdGVybmlvbiA9IG5ldyBMYXlhLlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgdmFyIGxvb2tUb1BTID0gdGhpcy5tX1RhcmdldFBTLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGxvb2tUb1BTLnkgPSB0aGlzLm1fU3RhcnRQUy55O1xyXG4gICAgICAgICAgICBsb29rVG9QUy56ID0gLWxvb2tUb1BTLnpcclxuICAgICAgICAgICAgdmFyIHVwRGlyOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIHVwRGlyLnkgPSAxO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRQUzogTGF5YS5WZWN0b3IzID0gdGhpcy5tX1N0YXJ0UFMuY2xvbmUoKTtcclxuICAgICAgICAgICAgc3RhcnRQUy56ID0gLXN0YXJ0UFMuejtcclxuICAgICAgICAgICAgTGF5YS5RdWF0ZXJuaW9uLmxvb2tBdChzdGFydFBTLCBsb29rVG9QUywgdXBEaXIsIHJvdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuRmFjZU1vZGVsVG8ocm90YXRpb24pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5UaW1lIDw9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGltZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlNldFN0ZXAodGhpcy5wbGF5ZXIuQ3VyU3RlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VGltZTogbnVtYmVyID0gdGhpcy5MYXN0VGltZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmF0ZTogbnVtYmVyID0gdGhpcy5UaW1lUGVyY2VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW92ZVRpbWVSYXRlOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWxsVGltZVBvaW50OiBudW1iZXIgPSAwLjQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0UFM6IExheWEuVmVjdG9yMztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0UFM6IExheWEuVmVjdG9yMztcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmF0ZSA+IGZhbGxUaW1lUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzRmFsbGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuSnVtcERvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlRvdWNoR3JvdW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVRpbWVSYXRlID0gKHJhdGUgLSBmYWxsVGltZVBvaW50KSAvICgxIC0gZmFsbFRpbWVQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFBTID0gdGhpcy5tX1RhcmdldFBTO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBTID0gdGhpcy5NaWRkbGVQUztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVGltZVJhdGUgPSByYXRlIC8gZmFsbFRpbWVQb2ludDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UFMgPSB0aGlzLk1pZGRsZVBTO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBTID0gdGhpcy5tX1N0YXJ0UFM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5QbGF5ZXJEZWF0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQcyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgICAgICAgICBMYXlhLlZlY3RvcjMubGVycChzdGFydFBTLCB0YXJnZXRQUywgbW92ZVRpbWVSYXRlLCBuZXdQcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuUG9zaXRpb24gPSBuZXdQcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlRvdWNoR3JvdW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/njqnlrrbpo57ooYxcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJGbHkgZXh0ZW5kcyBCYXNlUGxheWVyQ3RybGVyIHtcclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueOqeWutlxyXG4gICAgICAgICAqIEBwYXJhbSBwbGF5ZXIg5pON5o6n6KeS6ImyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLlNldFBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuVHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgR2FtZU1vZHVsZS5WU3BhY2UsIDApKTtcclxuICAgICAgICAgICAgcGxheWVyLnRyYW5zZm9ybS5yb3RhdGlvbkV1bGVyID0gbmV3IExheWEuVmVjdG9yMygwLCAxODAsIDApO1xyXG4gICAgICAgICAgICBwbGF5ZXIuTW9kZWxSb3RhdGVFdWxhcihuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9cclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbFo6IG51bWJlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3ZhciB2ZWN0b3IgPSBuZXcgTGF5YS5WZWN0b3IzKDAsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCwtMSpDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UvMik7XHJcbiAgICAgICAgICAgIC8vIExheWEuVmVjdG9yMy5zY2FsZSh2ZWN0b3IsdGhpcy5TcGVlZCx2ZWN0b3IpO1xyXG4gICAgICAgICAgICB2YXIgdmVjdG9yOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIEdhbWVNb2R1bGUuVlNwYWNlLCAtR2FtZU1vZHVsZS5EU3BhY2UpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUodmVjdG9yLDAuMSx2ZWN0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5UcmFuc2xhdGUodmVjdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBPbkNvbXBsZXRlKCk6IHZvaWQgIHsgfVxyXG4gICAgICAgIHB1YmxpYyBPblN0YXJ0KCk6IHZvaWQgIHsgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuL01vdW50TGluZVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxudHlwZSBTdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW07XHJcbnR5cGUgTUxvY2F0aW9uID0gR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbi8v5q2lXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXAgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbntcclxuICAgIC8v5qih5Z6L5Liq5pWwXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0ZXBNb2RlbE51bTpudW1iZXIgPSAzO1xyXG5cclxuICAgIExlZnRQYXJlbnQ6U3RlcDtcclxuICAgIFJpZ2h0UGFyZW50OlN0ZXA7XHJcbiAgICBMZWZ0Q2hpbGQ6U3RlcDtcclxuICAgIFJpZ2h0Q2hpbGQ6U3RlcDtcclxuICAgIFN0ZXBJdGVtOlN0ZXBJdGVtO1xyXG4gICAgUm9hZE51bTpudW1iZXI7XHJcbiAgICBNYXJrOmFueTtcclxuICAgIEZsb29yOk1vdW50TGluZTtcclxuICAgIElkeDpudW1iZXI7XHJcbiAgICBcclxuICAgIC8v5YWs5pyJ5o6l5Y+jXHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2NhdGlvbigpOk1Mb2NhdGlvblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24odGhpcy5JZHgsdGhpcy5GbG9vci5GbG9vck51bSk7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNEZWFkUm9hZCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNEZWFkUm9hZHx8IXRoaXMuYWN0aXZlfHwgdGhpcy5TdGVwSXRlbS5Jc0RpZmZpY3VsdHk7XHJcbiAgICB9XHJcbiAgICBzZXQgSXNEZWFkUm9hZCh2YWx1ZTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBJc0ZvcmJpZGVuKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlN0ZXBJdGVtLklzRm9yYmlkZW47XHJcbiAgICB9XHJcbiAgICBnZXQgSXNFbXB0eSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gISh0aGlzLmFjdGl2ZSYmdGhpcy5GbG9vci5hY3RpdmUpO1xyXG4gICAgfVxyXG4gICAgUHV0SXRlbSggaXRlbUVudW1lOkl0ZW0uSXRlbVR5cGUgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGl0ZW1FbnVtZSA9PSBJdGVtLkl0ZW1UeXBlLkVtcHR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPWZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5QdXRJdGVtKGl0ZW1FbnVtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXRTdGVwKG5ld1BzOkxheWEuVmVjdG9yMyA9IG51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgaWYobmV3UHMpXHJcbiAgICAgICAgICAgIHRoaXMuUG9zaXRpb24gPSBuZXdQcztcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlB1dEl0ZW0oSXRlbS5JdGVtVHlwZS5Ob25lKTtcclxuXHJcbiAgICAgICAgdGhpcy5MZWZ0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxlZnRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb2FkTnVtID0gMDtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBfU3RlcE1vZGVsOkxheWEuU3ByaXRlM0Q7XHJcbiAgICBjb25zdHJ1Y3RvcihmbG9vcjpNb3VudExpbmUsaWR4Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICAvL3N1cGVyKG5ldyBMYXlhLkJveE1lc2goMSwxLDEpICk7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZih0aGlzLklkeCAhPSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSsgTWF0aC5yYW5kb20oKSpTdGVwLnN0ZXBNb2RlbE51bSk7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMFwiK0lkeClcclxuICAgICAgICAgICAgdmFyIG1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL21vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKCBMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuNSwgMC41LCAwLjUpKSA7Ly9sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBjbG9uZU1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICBjbG9uZU1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGNsb25lTW9kZWwpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtRmFjdG9yeShJdGVtLkl0ZW1UeXBlLk5vbmUsdGhpcyk7O1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgIHRoaXMuSWR4ID0gaWR4O1xyXG5cclxuICAgICAgICB0aGlzLkxlZnRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0Q2hpbGQgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb2FkTnVtID0gMDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX0lzRGVhZFJvYWQ6Ym9vbGVhbjtcclxuXHJcbn0iLCIvKipcclxuICog5L2c6ICFOk1vXHJcbiAqIOWQr+WKqOWcuuaZr1xyXG4gKi9cclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IExvYWRTY2VuZSBmcm9tIFwiLi9TY2VuZS9Mb2FkU2NlbmVcIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5pbXBvcnQgQVBQIGZyb20gXCIuL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuL0ZyYW1lV29yay9VSU1hbmFnZXJcIjtcclxuY2xhc3MgR2FtZVxyXG57XHJcblx0X0ZyYW1lOkZyYW1lV29yaztcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB2YXIgc3MgPSBBUFA7XHJcbiAgICAgICAgTGF5YTNELmluaXQoNzUwLDEzMzQpO1xyXG4gICAgICAgIEdhbWVDb25maWcuaW5pdCgpO1xyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZJWEVEX1dJRFRIO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IExheWEuU3RhZ2UuU0NSRUVOX1ZFUlRJQ0FMO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25WID0gTGF5YS5TdGFnZS5BTElHTl9CT1RUT007XHJcbiAgICAgICAgLy/lvIDlkK/nu5/orqHkv6Hmga9cclxuXHRcdExheWEuU3RhdC5oaWRlKCk7XHJcbiAgICAgICAgdmFyIHJlc0NvbCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvbG9jYWxjb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU30se3VybDpcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfV07XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChyZXNDb2wsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub24zRExvYWRlZCkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbjNETG9hZGVkKClcclxuICAgIHtcclxuICAgICAgICB2YXIgYXJyM0QgPSBbXCJ1aS9SZXNvdXJjZS96aHV5ZW1pYW5fcWl1MV9pZGxlL3podXllbWlhbl9xaXUxX2lkbGUubGhcIl07XHJcbiAgICAgICAgTGF5YS5sb2FkZXIuY3JlYXRlKGFycjNELExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uTG9hZGVkKSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsbnVsbCxudWxsLGZhbHNlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkZWQoKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5Jbml0KCk7XHJcbiAgICAgICAgdmFyIHNjZW5lTWdyOlNjZW5lTWFuYWdlciA9IEFQUC5TY2VuZU1hbmFnZXI7XHJcbiAgICAgICAgc2NlbmVNZ3IuQ2hhbmdlU2NlbmUobmV3IExvYWRTY2VuZSgpKTtcclxuICAgICAgICBMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5VcGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSggKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5GcmFtZVdvcmsuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxudmFyIEdNID0gbmV3IEdhbWUoKTtcclxuIiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuaW1wb3J0IENoYXJhY3Rlck1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyL0NoYXJhY3Rlck1hbWFnZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlclVJU2NlbmUgZXh0ZW5kcyBMYXlhLlNjZW5lM0R7XHJcblxyXG4gICAgcHVibGljIGFycmF5RGlzOkxheWEuU3ByaXRlM0RbXSA9IFtdO1xyXG4gICAgcHVibGljIGNudE51bSA9IDU7XHJcbiAgICBwdWJsaWMgc3RhcnRhbyA9IDkwO1xyXG4gICAgcHVibGljIHBlcmFvID0gMzYwIC8gdGhpcy5jbnROdW07XHJcbiAgICBwdWJsaWMgciA9IDAuMDQ7XHJcbiAgICBwdWJsaWMgc3RhcnRZID0gLTAuMDI7XHJcbiAgICBwdWJsaWMgY250U2VsZWN0SW5kZXggPSAwO1xyXG5cclxuICAgIHB1YmxpYyBjYW1lcmE6TGF5YS5DYW1lcmE7XHJcbiAgICBwdWJsaWMgY250c3RhcnRhbyA9IDkwO1xyXG4gICAgcHVibGljIG1vdmVTdGFyYW8gPSAyO1xyXG4gICAgcHVibGljIG5leHRBbyA9IC0xO1xyXG4gICAgcHVibGljIGluaXRTY2FsTnVtID0gMC4wMTg7XHJcblxyXG4gICAgcHVibGljIG1vdmVDYWxsQmFjaztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjbnRTZWxlY3RJbmRleCwgbW92ZUNhbGxCYWNrKSB7IFxyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9IGNudFNlbGVjdEluZGV4O1xyXG4gICAgICAgIHRoaXMubW92ZUNhbGxCYWNrID0gbW92ZUNhbGxCYWNrO1xyXG4gICAgICAgIHRoaXMuYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IHRoaXMuYWRkQ2hpbGQobmV3IExheWEuQ2FtZXJhKDAsIDAuMSwgMC4zKSkgYXMgTGF5YS5DYW1lcmE7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDAuMikpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMyggMCwgMCwgMCksIHRydWUsIGZhbHNlKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRMSChcImMwMDFfY2hpbGRfMDFcIikpO1xyXG4gICAgICAgIC8vIHZhciBtb2RlbDE6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wNFwiKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpID0gMCA7aSA8IHRoaXMuY250TnVtO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoYXJhY3Rlck1vZGVsID0gIENoYXJhY3Rlck1hbmFnZXIuTWdyLkdldENoYXJhY3Rlck1vZGVsKGkpO1xyXG4gICAgICAgICAgICB2YXIgYXVkdDpMYXlhLlNwcml0ZTNEID0gY2hhcmFjdGVyTW9kZWw7XHJcbiAgICAgICAgICAgIGF1ZHQudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKHRoaXMuaW5pdFNjYWxOdW0sIHRoaXMuaW5pdFNjYWxOdW0sIHRoaXMuaW5pdFNjYWxOdW0pO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGF1ZHQpO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzLnB1c2goYXVkdCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgYW8gPSAodGhpcy5zdGFydGFvICsgaSAqIHRoaXMucGVyYW8pICUgMzYwXHJcbiAgICAgICAgICAgIC8vIHZhciB4ID0gdGhpcy5yICogTWF0aC5jb3MoYW8gKiAzLjE0IC8gMTgwKTtcclxuICAgICAgICAgICAgLy8gdmFyIHkgPSB0aGlzLnN0YXJ0WSArIHRoaXMuciAqIE1hdGguc2luKGFvICogMy4xNCAvIDE4MCk7XHJcbiAgICAgICAgICAgIC8vIGF1ZHQudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMyh4LCB5LCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9ICh0aGlzLmNudFNlbGVjdEluZGV4ICsgNSkgJSA1O1xyXG4gICAgICAgIHRoaXMubmV4dEFvID0gKHRoaXMuc3RhcnRhbyArICh0aGlzLmNudE51bSAtIHRoaXMuY250U2VsZWN0SW5kZXgpICogdGhpcy5wZXJhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3QoKTtcclxuICAgICB9XHJcblxyXG4gICAgY2FsQ250U3RhcnRhbygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gKHRoaXMuY250U2VsZWN0SW5kZXggKyA1KSAlIDU7XHJcbiAgICAgICAgdGhpcy5uZXh0QW8gPSAodGhpcy5zdGFydGFvICsgKHRoaXMuY250TnVtIC0gdGhpcy5jbnRTZWxlY3RJbmRleCkgKiB0aGlzLnBlcmFvICsgMzYwKSAlIDM2MDtcclxuXHJcbiAgICAgICAgaWYoKHRoaXMubmV4dEFvIC0gdGhpcy5jbnRzdGFydGFvICsgMzYwKSAlIDM2MCA+PSAxODApIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RhcmFvID0gLTJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RhcmFvID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDAuMDUsIHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aW1lQW9DaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5jbnRzdGFydGFvID09IHRoaXMubmV4dEFvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9IHRoaXMubmV4dEFvO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRBbyA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDYWxsQmFjayAmJiB0aGlzLm1vdmVDYWxsQmFjaygxKTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxhc2NudEFvID0gdGhpcy5jbnRzdGFydGFvO1xyXG4gICAgICAgIHRoaXMuY250c3RhcnRhbyArPSB0aGlzLm1vdmVTdGFyYW87XHJcbiAgICAgICAgaWYodGhpcy5jbnRzdGFydGFvIDwgMCB8fCB0aGlzLmNudHN0YXJ0YW8gPT0gMzYwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9ICh0aGlzLmNudHN0YXJ0YW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgICAgICBsYXNjbnRBbyA9IHRoaXMuY250c3RhcnRhbyAtIHRoaXMubW92ZVN0YXJhbztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gKHRoaXMuY250c3RhcnRhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKChsYXNjbnRBbyA+PSB0aGlzLm5leHRBbyAmJiB0aGlzLmNudHN0YXJ0YW8gPD0gdGhpcy5uZXh0QW8pIHx8IChsYXNjbnRBbyA8PSB0aGlzLm5leHRBbyAmJiB0aGlzLmNudHN0YXJ0YW8gPj0gdGhpcy5uZXh0QW8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9IHRoaXMubmV4dEFvO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRBbyA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm5leHRBbyA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDYWxsQmFjayAmJiB0aGlzLm1vdmVDYWxsQmFjaygxKTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IHRoaXMuYXJyYXlEaXMubGVuZ3RoO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIGFvID0gKHRoaXMuY250c3RhcnRhbyArIGkgKiB0aGlzLnBlcmFvKSAlIDM2MFxyXG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuciAqIE1hdGguY29zKGFvICogMy4xNCAvIDE4MCk7XHJcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5zdGFydFkgKyB0aGlzLnIgKiBNYXRoLnNpbihhbyAqIDMuMTQgLyAxODApO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoeCwgeSwgMCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2NhbGUgPSAwLjIgKiB5O1xyXG4gICAgICAgICAgICBpZihzY2FsZSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gbmV3IExheWEuVmVjdG9yMyh0aGlzLmluaXRTY2FsTnVtICsgc2NhbGUsIHRoaXMuaW5pdFNjYWxOdW0gKyBzY2FsZSwgdGhpcy5pbml0U2NhbE51bSArIHNjYWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjModGhpcy5pbml0U2NhbE51bSwgdGhpcy5pbml0U2NhbE51bSwgdGhpcy5pbml0U2NhbE51bSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW92ZUNhbGxCYWNrICYmIHRoaXMubW92ZUNhbGxCYWNrKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsZWFyUm9hdGVUaW1lcigpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0Um9sZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4IC0tO1xyXG4gICAgICAgIHRoaXMuY2FsQ250U3RhcnRhbygpO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIG5leHRSb2xlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggKys7XHJcbiAgICAgICAgdGhpcy5jYWxDbnRTdGFydGFvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZWN0SW5kZXgoc2VsZWN0SW5kZXg6bnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYoc2VsZWN0SW5kZXggPT0gdGhpcy5jbnRTZWxlY3RJbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSBzZWxlY3RJbmRleDtcclxuICAgICAgICB0aGlzLmNhbENudFN0YXJ0YW8oKTtcclxuICAgIH0gXHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgIH1cclxufSIsImltcG9ydCB7U2NlbmV9IGZyb20gXCIuL1NjZW5lXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEdhbWVTY2VuZVBsYXkgZnJvbSBcIi4vU2NlbmVQbGF5L0dhbWVTY2VuZVBsYXlcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVEaXJlY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvciB7XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVQbGF5KCk6R2FtZVNjZW5lUGxheVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clN0YXRlIGFzIEdhbWVTY2VuZVBsYXk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZExpc3QyRCA9IFtwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVcIikscGF0aC5HZXREZXBhdGhVSUpTKFwiRW5kR2FtZVwiKV07XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VTdGF0ZShuZXcgU2NlbmUuTG9hZFNjZW5lTG9naWMobG9hZExpc3QyRCxudWxsLG5ldyBHYW1lU2NlbmVQbGF5KCkpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiLypcclxu5L2c6ICFOk1vXHJcbui3s+Wxsee+iuWcuuaZr+aguOW/g+WKn+iDvVxyXG4qL1xyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW5kR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgR2FtZUNhbWVyYSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVDYW1lcmFcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLy4uL0dhbWUvUGxheWVyXCJcclxuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxudHlwZSBJdGVtTGF5b3V0ID0gSXRlbS5JdGVtTGF5b3V0O1xyXG50eXBlIExpbmVJdGVtSW5mbyA9IEl0ZW0uTGluZUl0ZW1JbmZvO1xyXG52YXIgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG4vL+a4uOaIj+WcuuaZr1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVcclxue1xyXG4gICAgTW9kZWxMb2FkOmJvb2xlYW47XHJcbiAgICBHYW1lRGlyOkdhbWVEaXJlY3RvcjtcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOkdhbWVEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgR2FtZURpcmVjdG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9TY2VuZU9iaiA9IG5ldyBMYXlhLlNjZW5lM0Q7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCJpbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLi9jb250cm9sZXIvQVBQXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWlkZXJNYW5hZ2VyIFxyXG57XHJcbi8v5a+55aSW5o6l5Y+jXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTWdyOkd1aWRlck1hbmFnZXI7XHJcbiAgICBzdGF0aWMgZ2V0IE1ncigpOkd1aWRlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZihHdWlkZXJNYW5hZ2VyLl9NZ3IgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEd1aWRlck1hbmFnZXIuX01nciA9IG5ldyBHdWlkZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHdWlkZXJNYW5hZ2VyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBTY2VuZU1ncjpTY2VuZU1hbmFnZXI7XHJcbiAgICBDdXJTY2VuZTpHdWlkZXJTY2VuZTtcclxuICAgIHB1YmxpYyBnZXQgR2FtZURpcigpOkd1aWRlckRpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ3VyU2NlbmUuR3VpZERpcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR3VpZGVyU2NlbmUoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkNoYW5nZVNjZW5lKG5ld0dhbWVTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG5ld0dhbWVTY2VuZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJTY2VuZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVxyXG57XHJcbiAgICBHdWlkRGlyOkd1aWRlckRpcmVjdG9yO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaXJlY3RvcjpTY2VuZS5CYXNlRGlyZWN0b3IgPSBuZXcgR3VpZGVyRGlyZWN0b3IoKTtcclxuICAgICAgICByZXR1cm4gRGlyZWN0b3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlckRpcmVjdG9yIGV4dGVuZHMgU2NlbmUuQmFzZURpcmVjdG9yXHJcbntcclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoIClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZDJETGlzdCA9IFt7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIikgLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpwYXRoLkdldEF0bFBhdGgoXCJjb21wXCIpLHR5cGU6IExheWEuTG9hZGVyLkFUTEFTIH1dO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlR2FtZVBsYXkobmV3IFNjZW5lLkxvYWRTY2VuZUxvZ2ljKGxvYWQyRExpc3QsbnVsbCxuZXcgR3VpZGVyU2NlbmVQbGF5KCkpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKCk6dm9pZFxyXG4gICAge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyU2NlbmVQbGF5IGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lUGxheWVcclxue1xyXG4gICAgVUk6RW50ZXJHYW1lVUk7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH0gICAgXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8RW50ZXJHYW1lVUk+KEVudGVyR2FtZVVJKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4vLi4vdWkvbGF5YU1heFVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBMb2FkaW5nVUkgZnJvbSBcIi4vLi4vdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUlcIlxyXG5pbXBvcnQgRk1Xb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi9HdWlkZXJNYW5hZ2VyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEJHIGZyb20gXCIuLy4uL3VpL0JHXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRTY2VuZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIEdlbkRpcmVjdG9yKCk6U2NlbmUuQmFzZURpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMb2FkRGlyY3RvcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmNsYXNzIExvYWREaXJjdG9yIGV4dGVuZHMgU2NlbmUuQmFzZURpcmVjdG9yXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxvYWRMaXN0MkQgPSBbe3VybDpcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOlwidWkvUmVzb3VyY2UvbG9jYWxjb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU31dO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlR2FtZVBsYXkoIG5ldyBTY2VuZS5Mb2FkU2NlbmVMb2dpYyhsb2FkTGlzdDJELG51bGwsbmV3IExvYWRTY2VuZVBsYXllKCkpICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEVuZCgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5Yqg6L295Zy65pmv6YC76L6RXHJcbmNsYXNzIExvYWRTY2VuZVBsYXllIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lUGxheWVcclxue1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50MkRMb2FkOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Db3VudDNETG9hZDpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fTG9hZEZhaWxlOnN0cmluZztcclxuICAgIHByaXZhdGUgbV9Db3VudFZhbHVlOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Mb2FkaW5nVUk6TG9hZGluZ1VJO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU3RhcnRMb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IFwiXCI7XHJcbiAgICAgICAgdmFyIHJlc291cmNlMkRBcnIgPSBbXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lUmFua1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiU2V0UGFuZWxcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJ0b29sSXRlbVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiZW50ZXJzY2VuZXVpXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJlbnRlcnNjZW5ldWkvcmVzMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiZW50ZXJzY2VuZXVpL3JlczJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImVudGVyc2NlbmV1aS9na1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIkNoYXJhY3RlckluZm9cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0SnNvblBhdGgoXCJJdGVtSW5mb1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIkxldmVsSW5mb1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIk9ic3RhY2xlSW5mb1wiKVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEubG9hZGVyLm9uY2UoTGF5YS5FdmVudC5FUlJPUix0aGlzLHRoaXMub25FcnJvcik7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5vbkNvbXBsZXRlKTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UzREFyciA9IFsgXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJjMDAxX2NoaWxkXzAxXCIpICxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDFfYWR1bHRfMDFcIikgLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzA0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9jb2luXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfY2hvbXBlcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX3N0aW5nXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRfMDFcIiksXHJcbiAgICAgICAgXVxyXG4gICAgICAgIHRoaXMuTG9hZChyZXNvdXJjZTJEQXJyLHJlc291cmNlM0RBcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgTG9hZChhcnIyRDpBcnJheTxhbnk+ID0gbnVsbCxhcnIzRDpBcnJheTxhbnk+PW51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXJyMkQhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKGFycjJELG51bGwsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub24yRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgLT0wLjU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFycjNEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY3JlYXRlKGFycjNELExheWEuSGFuZGxlci5jcmVhdGUodGhpcyxudWxsKSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbjNEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSAtPTAuNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbjNEUHJvZ3Jlc3ModmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubV9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9dmFsdWUvMjtcclxuICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLlZhbHVlID0gKHRoaXMubV9Db3VudDJETG9hZCArIHRoaXMubV9Db3VudDNETG9hZCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uMkRQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuVmFsdWUgPSAodGhpcy5tX0NvdW50MkRMb2FkICsgdGhpcy5tX0NvdW50M0RMb2FkKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25FcnJvcihzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgKz0gc3RyO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJMb2FkRXJyb3I6XCIrc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Db21wbGV0ZShkYXRhKVxyXG4gICAgeyAgIFxyXG4gICAgICAgIGlmKHRoaXMubV9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGhpRGlyID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5SZWxvYWQodGhpcy5tX0xvYWRGYWlsZSxmdW5jdGlvbigpOnZvaWR7dGhpRGlyLkxvYWQoKX0gKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5CRyA9IG5ldyBCRygpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLkNvbXBsZXRlKCgpPT57R3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fTG9hZGluZ1VJID0gQVBQLlVJTWFuYWdlci5TaG93PExvYWRpbmdVST4oTG9hZGluZ1VJKTtcclxuICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMC41O1xyXG4gICAgICAgIHRoaXMubV9Db3VudFZhbHVlID0gMTtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlID0gXCJcIjtcclxuICAgICAgICB0aGlzLlN0YXJ0TG9hZCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRDb21wbGV0ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEZTTSB9IGZyb20gXCIuLy4uL0Jhc2UvRlNNXCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcbmV4cG9ydCBtb2R1bGUgU2NlbmUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFNjZW5lRlNNIGV4dGVuZHMgRlNNLkZTTTxCYXNlU2NlbmU+XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Zy65pmv5Luj55CGXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNjZW5lIGV4dGVuZHMgRlNNLlN0YXRlIHtcclxuICAgICAgICBwcml2YXRlIF9TdGFydEdhbWVUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDbG9jazogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbV9TY2VuZU9iajogTGF5YS5TY2VuZTNEO1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0RpcmVjdG9yOiBCYXNlRGlyZWN0b3I7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU2NlbmVPYmooKTogTGF5YS5TY2VuZTNEIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9TY2VuZU9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBEaXJlY3RvcigpOiBCYXNlRGlyZWN0b3Ige1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0RpcmVjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IEdlbkRpcmVjdG9yKCk6IEJhc2VEaXJlY3RvcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2UgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1dE9iaihzcHJpdGUzRDogTGF5YS5Ob2RlKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fU2NlbmVPYmopIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9TY2VuZU9iai5hZGRDaGlsZChzcHJpdGUzRCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJhc2VTY2VuZSBQdXRPYmogRXJyb3I6ZW1wdHkgU3ByaXRlM0RcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yID0gdGhpcy5HZW5EaXJlY3RvcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fRGlyZWN0b3IuU3RhcnQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlNjZW5lT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlNjZW5lT2JqLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLlNjZW5lT2JqLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFjdG9yID0gdGhpcy5TY2VuZU9iai5nZXRDaGlsZEF0KDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdG9yLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLkRpcmVjdG9yLkVuZCgpO1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0RpcmVjdG9yKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yLlVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VEaXJlY3RvciBleHRlbmRzIEZTTS5GU008QmFzZVNjZW5lUGxheWU+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfU3RhcnRHYW1lVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ2xvY2s6IG51bWJlcjtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgLy/np4HmnInlsZ7mgKflkozlip/og71cclxuICAgICAgICBnZXQgR2FtZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RpbWVVcENsb2NrID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1RpbWVVcENsb2NrIC0gdGhpcy5fU3RhcnRHYW1lVGltZSAtIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSAtIHRoaXMuX1N0YXJ0R2FtZVRpbWUgLSB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgR2FtZVRpbWUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBDdXJHYW1lVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fU3RhcnRHYW1lVGltZSArIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2UgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFJlU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuU3RhcnRUaW1lKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnRUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFN0YXJ0KCk6IHZvaWQgO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBFbmQoKTogdm9pZDtcclxuXHJcbiAgICAgICAgcHVibGljIFRpbWVVcCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RpbWVVcENsb2NrIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIC8vQVBQLk1lc3NhZ2VDZW50ZXIuVHJpZ2dlcihHYW1lRXZlbnQuR2FtZVRpbWVVcCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RpbWVVcENsb2NrIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHN1cGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQ29udGludWVUaW1lKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAvL0FQUC5NZXNzYWdlQ2VudGVyLlRyaWdnZXIoR2FtZUV2ZW50LkdhbWVDb250aW51ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ICs9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSAtIHRoaXMuX1RpbWVVcENsb2NrO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDliIfmjaLliafmnKxcclxuICAgICAgICAgKiBAcGFyYW0gbmV3U2NlbmVQbGF5IOaWsOWJp+acrFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBDaGFuZ2VHYW1lUGxheSggbmV3U2NlbmVQbGF5OkJhc2VTY2VuZVBsYXllICk6IHZvaWQgIHtcclxuICAgICAgICAgICAgdGhpcy5DaGFuZ2VTdGF0ZShuZXdTY2VuZVBsYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNjZW5lUGxheWUgZXh0ZW5kcyBGU00uU3RhdGUge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2UgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTG9hZFNjZW5lTG9naWMgZXh0ZW5kcyBCYXNlU2NlbmVQbGF5ZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0xvYWQyRExpc3Q6IGFueVtdO1xyXG4gICAgICAgIHByaXZhdGUgbV9Mb2FkM0RMaXN0OiBhbnlbXTtcclxuICAgICAgICBwcml2YXRlIG1fTmV4dFNjZW5lOiBTY2VuZS5CYXNlU2NlbmVQbGF5ZTtcclxuICAgICAgICBwdWJsaWMgZ2V0IE93bmVyRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9vd25lciBhcyBCYXNlRGlyZWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBsb2FkMkRMaXN0IDJE5Yqg6L295YiX6KGoXHJcbiAgICAgICAgICogQHBhcmFtIGxvYWQzRExpc3QgM0TliqDovb3liJfooahcclxuICAgICAgICAgKiBAcGFyYW0gbmV4dFNjZW5lIOS4i+S4gOagvOWcuuaZr1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGxvYWQyRExpc3Q6IGFueVtdLCBsb2FkM0RMaXN0OiBhbnlbXSwgbmV4dFNjZW5lOiBTY2VuZS5CYXNlU2NlbmVQbGF5ZSkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZDJETGlzdCA9IGxvYWQyRExpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkM0RMaXN0ID0gbG9hZDNETGlzdDtcclxuICAgICAgICAgICAgdGhpcy5tX05leHRTY2VuZSA9IG5leHRTY2VuZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVuZCgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLm9uY2UoTGF5YS5FdmVudC5DT01QTEVURSwgdGhpcywgdGhpcy5Mb2FkQ29tcGxldGUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0xvYWQyRExpc3QpXHJcbiAgICAgICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMubV9Mb2FkMkRMaXN0LCBudWxsLCBudWxsKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9Mb2FkM0RMaXN0KVxyXG4gICAgICAgICAgICAgICAgTGF5YS5sb2FkZXIubG9hZCh0aGlzLm1fTG9hZDNETGlzdCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIExvYWRDb21wbGV0ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5Pd25lckRpcmVjdG9yLkNoYW5nZVN0YXRlKHRoaXMubV9OZXh0U2NlbmUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBTY2VuZSB9IGZyb20gXCIuLy4uLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi8uLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vLi4vLi4vR2FtZS9Nb3VudExpbmVcIlxyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQkdVSSBmcm9tIFwiLi8uLi8uLi91aS9CR1wiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEdhbWVTY2VuZSBmcm9tIFwiLi4vR2FtZVNjZW5lXCI7XHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLy4uLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcbmltcG9ydCBHYW1lQVBQIGZyb20gXCIuLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiO1xyXG5pbXBvcnQgeyBXZWNoYXRPcGVuIH0gZnJvbSBcIi4uLy4uL3BsYXRmb3JtL1dlY2hhdE9wZW5cIjtcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4uLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuaW1wb3J0IEdhbWVtYXAgZnJvbSBcIi4uLy4uL0dhbWUvR2FtZU1hcFwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZU1vZHVsZVwiO1xyXG5cclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuXHJcbnZhciBGYWxsVGltZTogbnVtYmVyID0gMjtcclxuXHJcbnZhciBsaW5lTnVtOiBudW1iZXIgPSAxMjtcclxudmFyIGNvbHVtbjogbnVtYmVyID0gMTI7XHJcbi8v5ri45oiP5a+85ryUXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZVBsYXkgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVQbGF5ZSB7XHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBfQ291bnRGbG9vclRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Cb290b21GbG9vcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfU3RhcnRQb3NpdGlvbjogTGF5YS5WZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSBfR2FtZVVwZGF0ZTogKCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgX1BhbmVsVUk6IEdhbWVVSTtcclxuICAgIHByaXZhdGUgbV9Hb2xkTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Mb2dpY0dvbGROdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0N1ckJHOiBCR1VJO1xyXG4gICAgcHJpdmF0ZSBfU2FmZUxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgIHByaXZhdGUgbV9HYW1lTWFwOiBHYW1lbWFwO1xyXG5cclxuICAgIENhbWVyYTogR2FtZUNhbWVyYTtcclxuICAgIFBsYXllcjogUGxheWVyO1xyXG4gICAgSW5wdXRDdHJsOiBJbnB1dC5CYXNlR2FtZUlucHV0O1xyXG4gICAgQ3VyTGluZUJhcnJpZXJzOiBBcnJheTxMaW5lSXRlbUluZm8+O1xyXG4gICAgbmFtZTogbnVtYmVyO1xyXG4gICAgRnJlc2hCR0NvdW50OiBudW1iZXI7XHJcbiAgICBnZXQgZ2FtZU1hcCgpOiBHYW1lbWFwICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9HYW1lTWFwO1xyXG4gICAgfVxyXG4gICAgZ2V0IENvbHVtc051bSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBjb2x1bW47XHJcbiAgICB9XHJcbiAgICBnZXQgU2FmZUxvY2F0aW9uKCk6IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU2FmZUxvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBhbmVsVUkoKTogR2FtZVVJIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fUGFuZWxVSTtcclxuICAgIH1cclxuICAgIHNldCBQYW5lbFVJKHZhbHVlOiBHYW1lVUkpIHtcclxuICAgICAgICB2YWx1ZS5TZXRMZWZ0VG91Y2godGhpcywgKCkgPT4geyB0aGlzLklucHV0Q3RybC5JbnB1dChmYWxzZSk7IH0pXHJcbiAgICAgICAgdmFsdWUuU2V0UmlnaHRUb3VjaCh0aGlzLCAoKSA9PiB7IHRoaXMuSW5wdXRDdHJsLklucHV0KHRydWUpOyB9KTtcclxuICAgICAgICB0aGlzLl9QYW5lbFVJID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXQgUGxheWVyRmxvb3IoKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgZmxvb3I6IG51bWJlciA9IHRoaXMuX1N0YXJ0UG9zaXRpb24ueiAtIHRoaXMuUGxheWVyLkxvZ2ljUG9zaXRpb24uejtcclxuICAgICAgICBmbG9vciA9IGZsb29yIC8gR2FtZU1vZHVsZS5EU3BhY2U7XHJcbiAgICAgICAgZmxvb3IgPSBNYXRoLnJvdW5kKGZsb29yKTtcclxuICAgICAgICByZXR1cm4gTWF0aC5hYnMoZmxvb3IpO1xyXG4gICAgfVxyXG4gICAgZ2V0IERpc3RhbmNlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5QbGF5ZXJGbG9vcilcclxuICAgIH1cclxuICAgIGdldCBQbGF5ZXJGbG9vckxpbmUoKTogTW91bnRMaW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5HZXRGbG9vckJ5Rmxvb3IodGhpcy5QbGF5ZXJGbG9vcik7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMubV9vd25lciBhcyBHYW1lRGlyZWN0b3IpLkdhbWVUaW1lO1xyXG4gICAgfVxyXG4gICAgZ2V0IEdhbWVHb2xkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9Hb2xkTnVtO1xyXG4gICAgfVxyXG4gICAgZ2V0IENvdW50Rmxvb3JUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGJldHdlZW46IG51bWJlciA9IHRoaXMuRGlzdGFuY2UgLSB0aGlzLm1fQm9vdG9tRmxvb3I7XHJcbiAgICAgICAgYmV0d2VlbiA9IGJldHdlZW4gPiAzID8gMyA6IGJldHdlZW47XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0NvdW50Rmxvb3JUaW1lIC0gYmV0d2VlbiAvIDMgKiBGYWxsVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gbnVsbDtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9Db3VudEZsb29yVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0Jvb3RvbUZsb29yID0gMDtcclxuICAgICAgICB0aGlzLl9TdGFydFBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0N1ckJHID0gQVBQLlNjZW5lTWFuYWdlci5CRyBhcyBCR1VJO1xyXG4gICAgICAgIHRoaXMuRnJlc2hCR0NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLm1fR2FtZU1hcCA9IG5ldyBHYW1lbWFwKGxpbmVOdW0sIGNvbHVtbik7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkSW5wdXRDdHJsZXIodmFsdWU6IElucHV0LkJhc2VHYW1lSW5wdXQpIHtcclxuICAgICAgICB0aGlzLklucHV0Q3RybC5DbGVhcigpO1xyXG4gICAgICAgIHZhbHVlLk5leHRJbnB1dCA9IHRoaXMuSW5wdXRDdHJsO1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgUG9wSW5wdXRDdHJsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSB0aGlzLklucHV0Q3RybC5OZXh0SW5wdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkR29sZChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9Hb2xkTnVtICs9IG51bTtcclxuICAgICAgICB0aGlzLkFkZExvZ2ljR29sZChudW0pO1xyXG4gICAgfVxyXG5cclxuICAgIEFkZEdvbGRVbkxvZ2ljR29sZChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9Hb2xkTnVtICs9IG51bTtcclxuICAgIH1cclxuXHJcbiAgICBBZGRMb2dpY0dvbGQobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9Mb2dpY0dvbGROdW0gKz0gbnVtO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5Hb2xkID0gdGhpcy5fTG9naWNHb2xkTnVtO1xyXG4gICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkuZHJhd3Bhc3ModGhpcy5fTG9naWNHb2xkTnVtICsgR2FtZUFnZW50LkFnZW50LkN1clNjb3JlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9ruWuieWFqOS9jee9rlxyXG4gICAgU2V0U2FmZVBTKGxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbikge1xyXG4gICAgICAgIHRoaXMubV9HYW1lTWFwLlNldFNhZmVQUyhsb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgRGVhdGgoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUGxheWVyRGVhdGggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuT25HYW1lQ29tcGxldGUoKTtcclxuICAgICAgICAvL3VpLlNldEdhbWVJbmZvKHRoaXMuUGxheWVyRGlzdGFuY2UsdGhpcy5fR29sZE51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgRW5kKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+mHjeaWsOW8gOWni1xyXG4gICAgUmVTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIFNob3dJbnB1dEluZm8oaW5mbzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lt6blj7Pnp7vliqhcclxuICAgIE1vdmVTdGVwKGlzUmlnaHQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAvL3ZhciBidWZmID0gdGhpcy5CdWZmZXI7XHJcbiAgICAgICAgLy/ojrflj5bkuIvkuIDlsYLnmoRTdGVwXHJcbiAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSB0aGlzLlBsYXllci5DdXJTdGVwO1xyXG4gICAgICAgIGlmIChzdGVwID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNSaWdodCkge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0ZXAgPT0gbnVsbCB8fCBzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgIHZhciBuZXh0Rmxvb3JEaXIgPSBpc1JpZ2h0ID8gMSA6IC0xO1xyXG4gICAgICAgIHRoaXMubV9HYW1lTWFwLlB1c2hGTG9vcihuZXh0Rmxvb3JEaXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5bGC5pWw6I635Y+W5p+Q5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIEdldEZsb29yQnlGbG9vcihmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9HYW1lTWFwLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4flnZDmoIfojrflj5blj7DpmLZcclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiDntKLlvJUs5bGC5pWwXHJcbiAgICAgKi9cclxuICAgIEdldFN0ZXBCeUxvY2F0aW9uKGxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbiwgcmlnaHRTd2l0Y2hOdW06IG51bWJlciA9IDApOiBTdGVwIHtcclxuICAgICAgICBpZiAocmlnaHRTd2l0Y2hOdW0gKiByaWdodFN3aXRjaE51bSA+IDAuMDAxKSAge1xyXG4gICAgICAgICAgICB2YXIgZmxvb3I6TW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9jYXRpb24uWSk7XHJcbiAgICAgICAgICAgIHZhciBnZXRTdGVwOiBTdGVwID0gZmxvb3IuR2V0U3RlcChsb2NhdGlvbi5YICsgZmxvb3IucmlnaHRTd2l0Y2ggLSByaWdodFN3aXRjaE51bSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb2NhdGlvbi5ZKS5HZXRTdGVwKGxvY2F0aW9uLlgpO1xyXG5cclxuICAgICAgICByZXR1cm4gZ2V0U3RlcDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIm+W7uuebuOWFs+aUvui/mSDov5nph4zph43mlrDlvIDlp4vkuI3kvJrotbBcclxuICAgIHB1YmxpYyBTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkNhbWVyYSA9IG5ldyBHYW1lQ2FtZXJhKCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEudHJhbnNmb3JtLmxvY2FsUm90YXRpb25FdWxlciA9IG5ldyBMYXlhLlZlY3RvcjMoLTMwLCAwLCAwKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLkNhbWVyYSk7XHJcbiAgICAgICAgLy/liJvlu7pVSVxyXG4gICAgICAgIC8v5Yib5bu6546p5a62XHJcbiAgICAgICAgdmFyIHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB2YXIgZ2FtZUFnZW50ID0gR2FtZUFnZW50LkFnZW50O1xyXG4gICAgICAgIHZhciBwbGF5ZXJNb2RlbCA9IEdhbWVBUFAuQ2hhcmFjdGVyTWdyLkdldENoYXJhY3Rlck1vZGVsKGdhbWVBZ2VudC5DdXJDaGFyYWN0ZXJJRCk7XHJcbiAgICAgICAgcGxheWVyLlNldFBsYXllck1vZGVsKHBsYXllck1vZGVsKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLlBsYXllcik7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5tX0dhbWVNYXApO1xyXG4gICAgICAgIC8v5YeG5aSH546p5a625q275Lqh5LqL5Lu2XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoLCB0aGlzLkRlYXRoLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/m+WFpea4uOaIj+eahOiuvue9ruaUvui/memHjCDph43mlrDlvIDlp4votbDov5nph4xcclxuICAgIHByb3RlY3RlZCBTdGFydEdhbWUoKSB7XHJcblxyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuU2NlbmVPYmouYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKVxyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5SZXNldEdhbWVJdGVtKCk7XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LlJlc2V0U2tpbGxJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKDAsIDApO1xyXG4gICAgICAgIC8v5Yib5bu66L6T5YWl5o6n5Yi25ZmoXHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSBuZXcgSW5wdXQuTm9ybUdhbWVJbnB1dCh0aGlzKTtcclxuICAgICAgICB0aGlzLlBsYXllci5SZXNldCgpO1xyXG4gICAgICAgIHRoaXMubV9HYW1lTWFwLkluaXQoMyk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuU2V0U3RlcCh0aGlzLm1fR2FtZU1hcC5HZXRTYWZlU3RlcCgpKTtcclxuICAgICAgICB0aGlzLl9TdGFydFBvc2l0aW9uID0gdGhpcy5QbGF5ZXIuUG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuUmVzZXQobmV3IExheWEuVmVjdG9yMygpLCBuZXcgTGF5YS5WZWN0b3IzKDAsIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGggKiAxMC41LCBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoICogOSksIHRoaXMuUGxheWVyKTtcclxuICAgICAgICB0aGlzLm1fR29sZE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy5fTG9naWNHb2xkTnVtID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5QYW5lbFVJID0gQVBQLlVJTWFuYWdlci5TaG93KEdhbWVVSSk7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlJlZ2lzdENsaWNrUGxheWVySXRlbSh0aGlzLCB0aGlzLlVzZVBsYXllckl0ZW0pO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5SZWdpc3RDbGlja1NraWxsSXRlbSh0aGlzLCB0aGlzLlVzZVNraWxsSXRlbSk7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkdvbGQgPSAwO1xyXG4gICAgICAgIHRoaXMuX0NvdW50Rmxvb3JUaW1lID0gdGhpcy5HYW1lVGltZSArIDQ7XHJcbiAgICAgICAgdGhpcy5tX0Jvb3RvbUZsb29yID0gMDtcclxuICAgICAgICB0aGlzLl9HYW1lVXBkYXRlID0gdGhpcy5fU3RhcnRDb3VudDtcclxuICAgICAgICBXZWNoYXRPcGVuLmdldEluc3RhbmNlcygpLmRyYXdwYXNzKDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0dhbWVVcGRhdGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9HYW1lVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b6q546v6K6+572u5bGC5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0gZmxvb3Ig5bGCXHJcbiAgICAgKiBAcGFyYW0gT3duZXIgXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5b6q546v5omn6KGM5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIExvb3BEb0Zsb29yU3RlcChmbG9vcjogbnVtYmVyLCBPd25lcjogYW55LCBjYWxsQmFjazogKHN0ZXA6IFN0ZXApID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fR2FtZU1hcC5Mb29wRG9GbG9vclN0ZXAoZmxvb3IsIE93bmVyLCBjYWxsQmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mraPluLjov5DooYzml7bnmoTmr4/luKfpgLvovpFcclxuICAgIHByaXZhdGUgX1J1bkdhbWVVcGRhdGUoKSB7XHJcbiAgICAgICAgdmFyIGRpc3Q6IG51bWJlciA9IHRoaXMuUGxheWVyRmxvb3I7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkRpc3RhbmNlID0gdGhpcy5EaXN0YW5jZTtcclxuICAgICAgICBpZiAodGhpcy5GcmVzaEJHQ291bnQgPiAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9DdXJCRy5VcGRhdGVQYWdlKGRpc3QpO1xyXG4gICAgICAgICAgICB0aGlzLkZyZXNoQkdDb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICsrdGhpcy5GcmVzaEJHQ291bnQ7XHJcbiAgICAgICAgdmFyIGREaXN0YW5jZTogbnVtYmVyID0gdGhpcy5tX0dhbWVNYXAuVGFpbEZMb29yLkZsb29yTnVtO1xyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuUGxheWVyRmxvb3IgLSBkRGlzdGFuY2UgKyAzO1xyXG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDMpIHtcclxuICAgICAgICAgICAgdGhpcy5fUHVzaEZMb29yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vaWYgKHRoaXMuX0NvdW50Rmxvb3JUaW1lIDwgQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ291bnRGbG9vclRpbWUgPCBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnRGbG9vclRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyBGYWxsVGltZTtcclxuICAgICAgICAgICAgLy90aGlzLl9EZXN0cm95TGluZSh0aGlzLm1fQm9vdG9tRmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQm9vdG9tRmxvb3IgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vlgJLorqHml7bmnJ/pl7TnmoTmr4/luKfpgLvovpFcclxuICAgIHByaXZhdGUgX1N0YXJ0Q291bnQoKSB7XHJcbiAgICAgICAgdmFyIHRpbWU6IHN0cmluZyA9IFwiXCJcclxuICAgICAgICB2YXIgY291bnRUaW1lOiBudW1iZXIgPSB0aGlzLl9Db3VudEZsb29yVGltZSAtIEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZTtcclxuICAgICAgICBpZiAoY291bnRUaW1lID4gMC45KVxyXG4gICAgICAgICAgICB0aW1lICs9IE1hdGguZmxvb3IoY291bnRUaW1lKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5QYW5lbFVJLkdhbWVQYW5lbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX0dhbWVVcGRhdGUgPSB0aGlzLl9SdW5HYW1lVXBkYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudEZsb29yVGltZSA9IHRoaXMuR2FtZVRpbWUgKyBGYWxsVGltZTtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LlJlc2V0R2FtZUl0ZW0oKTtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LlJlc2V0U2tpbGxJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5TZXRDb3VudFRpbWUodGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsIblsYLlkJHkuIrlj6BcclxuICAgIHByb3RlY3RlZCBfUHVzaEZMb29yKCkge1xyXG4gICAgICAgIHRoaXMubV9HYW1lTWFwLlB1c2hGTG9vcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aGM6Zm35p+Q5LiA5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX0Rlc3Ryb3lMaW5lKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5tX0dhbWVNYXAuR2V0Rmxvb3JCeUZsb29yKGZsb29yKSkge1xyXG4gICAgICAgICAgICB0aGlzLm1fR2FtZU1hcC5CcmVha0xpbmUoZmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXNlU2tpbGxJdGVtKCkge1xyXG4gICAgICAgIGlmIChHYW1lQWdlbnQuQWdlbnQuU2tpbGxJdGVtTnVtIDwgMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5Vc2VTa2lsbEl0ZW0oKTtcclxuICAgICAgICB2YXIgY2hhcmFjdGVySUQ6IG51bWJlciA9IEdhbWVBZ2VudC5BZ2VudC5DdXJDaGFyYWN0ZXJJRDtcclxuICAgICAgICB2YXIgSXRlbUlEOiBudW1iZXIgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRJdGVtSUQoY2hhcmFjdGVySUQpO1xyXG4gICAgICAgIHZhciBJdGVtVHlwZTogbnVtYmVyID0gR2FtZUFQUC5JdGVtTWdyLkdldEl0ZW1UeXBlKEl0ZW1JRCk7XHJcbiAgICAgICAgdmFyIG5ld0J1ZmY6IEl0ZW0uQmFzZVBsYXllckJ1ZmYgPSBJdGVtLkl0ZW1CdWZmRmFjdG9yeShJdGVtVHlwZSk7XHJcbiAgICAgICAgbmV3QnVmZi5BZGRUb1BsYXllcih0aGlzLlBsYXllcik7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVc2VQbGF5ZXJJdGVtKCkge1xyXG4gICAgICAgIGlmIChHYW1lQWdlbnQuQWdlbnQuR2FtZUl0ZW1OdW0gPCAxKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LlVzZUdhbWVJdGVtKCk7XHJcbiAgICAgICAgdmFyIEl0ZW1JRDogbnVtYmVyID0gR2FtZUFnZW50LkFnZW50LkN1ckl0ZW07XHJcbiAgICAgICAgdmFyIEl0ZW1UeXBlOiBudW1iZXIgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0SXRlbVR5cGUoSXRlbUlEKTtcclxuICAgICAgICB2YXIgbmV3QnVmZjogSXRlbS5CYXNlUGxheWVyQnVmZiA9IEl0ZW0uSXRlbUJ1ZmZGYWN0b3J5KEl0ZW1UeXBlKTtcclxuICAgICAgICBuZXdCdWZmLkFkZFRvUGxheWVyKHRoaXMuUGxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uR2FtZUNvbXBsZXRlKCkge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCwgdGhpcy5EZWF0aCwgdGhpcyk7XHJcbiAgICAgICAgdmFyIHVpOiBFbmRHYW1lVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8RW5kR2FtZVVJPihFbmRHYW1lVUkpO1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5BZGRHb2xkKHRoaXMubV9Hb2xkTnVtKTtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQWRkU2NvcmUodGhpcy5tX0dvbGROdW0gKiAxMCArIHRoaXMuRGlzdGFuY2UgKiAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPblRpbWVQYXVzZSgpIHtcclxuICAgICAgICB0aGlzLlBsYXllci5QYXVzZSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBPbkNvdW50aW51ZSgpIHtcclxuICAgICAgICB0aGlzLlBsYXllci5Db250aW51ZSgpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBwYXRoIHtcclxuICAgIGV4cG9ydCB2YXIgSXNFZGl0b3I6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgZXhwb3J0IHZhciB2ZXJzaW9uOiBzdHJpbmcgPSBcIj92PTVcIjtcclxuICAgIGV4cG9ydCB2YXIgU2NlbmVBc3NldFBhdGg6IHN0cmluZyA9IFwiTGF5YVNjZW5lX1wiO1xyXG4gICAgZXhwb3J0IHZhciBSZXNvdXJjZVBhdGg6IHN0cmluZyA9IElzRWRpdG9yID8gXCJOZXRSZXNvdXJjZV8zXzI5L1wiIDogXCJodHRwczovL3d3dy5nc2pnYW1lLmNvbS9SZXNvdXJjZS9OZXRSZXNvdXJjZV8zXzI5L1wiO1xyXG4gICAgZXhwb3J0IHZhciBVSVBhdGg6IHN0cmluZyA9IFJlc291cmNlUGF0aCArIFwiVUkvXCI7XHJcbiAgICBleHBvcnQgdmFyIE1vZGVsUGF0aDogc3RyaW5nID0gUmVzb3VyY2VQYXRoICsgXCIzRC9cIlxyXG4gICAgZXhwb3J0IHZhciBDb25maWdQYXRoOiBzdHJpbmcgPSBSZXNvdXJjZVBhdGggKyBcIkNvbmZpZy9cIlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WQXRs5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRBdGxQYXRoKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBVSVBhdGggKyBmaWxlTmFtZSArIFwiLmF0bGFzXCIgKyAoSXNFZGl0b3IgPyBcIlwiIDogdmVyc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZVSUpzb27ot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldERlcGF0aFVJSlMoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFVJUGF0aCArIGZpbGVOYW1lICsgXCIuanNvblwiICsgKElzRWRpdG9yID8gXCJcIiA6IHZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WbGjmlofku7bot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldExIKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBNb2RlbFBhdGggKyBTY2VuZUFzc2V0UGF0aCArIGZpbGVOYW1lICsgXCIvQ29udmVudGlvbmFsL1wiICsgZmlsZU5hbWUgKyBcIi5saFwiICsgKElzRWRpdG9yID8gXCJcIiA6IHZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Yqg6L29SnNvbui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0SnNvblBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIENvbmZpZ1BhdGggKyBmaWxlTmFtZSArIFwiLmpzb25cIiArIChJc0VkaXRvciA/IFwiXCIgOiB2ZXJzaW9uKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgVUlGdW5jIHtcclxuICAgIC8v6K6h566X57yp5pS+5YC8XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ291bnRTY2FsZUZpeCh3aWR0aDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXdpZHRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YWdlV2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHZhciBzY2FsZTogbnVtYmVyID0gc3RhZ2VXaWR0aCAvIHdpZHRoO1xyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBGaXhVSSh2aWV3OiBMYXlhLlNwcml0ZSwgd2lkdGg6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBzY2FsZSA9IFVJRnVuYy5Db3VudFNjYWxlRml4KHdpZHRoID8gd2lkdGggOiB2aWV3LndpZHRoKTtcclxuICAgICAgICB2aWV3LnNjYWxlWCA9IHNjYWxlO1xyXG4gICAgICAgIHZpZXcuc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgdmlldy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodCAvIHNjYWxlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgU2NlbmVNZ3IgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFRpbWVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9UaW1lTWFuYWdlclwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4uL0dhbWUvR2FtZU1vZHVsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBQIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfU2NlbmVNZ3I6IFNjZW5lTWdyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19UaW1lTWdyOiBUaW1lTWFuYWdlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfVUlNYW5hZ2VyOiBVSU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19GcmFtZVdvcms6RnJhbWVXb3JrO1xyXG4gICAgc3RhdGljIGdldCBGcmFtZVdvcmsoKTpGcmFtZVdvcmtcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nX0ZyYW1lV29yaztcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgTWVzc2FnZU1hbmFnZXIoKTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIgIHtcclxuICAgICAgICByZXR1cm4gQVBQLmdfTWVzc2FnZTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgVUlNYW5hZ2VyKCk6IFVJTWFuYWdlciAge1xyXG4gICAgICAgIGlmIChBUFAuZ19VSU1hbmFnZXIgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgQVBQLmdfVUlNYW5hZ2VyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuZ19VSU1hbmFnZXI7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IFNjZW5lTWFuYWdlcigpOiBTY2VuZU1nciAge1xyXG4gICAgICAgIGlmIChBUFAuZ19TY2VuZU1nciA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBBUFAuZ19TY2VuZU1nciA9IEZXLkZNLkdldE1hbmFnZXI8U2NlbmVNZ3I+KFNjZW5lTWdyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFQUC5nX1NjZW5lTWdyO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBUaW1lTWFuYWdlcigpOiBUaW1lTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmIChBUFAuZ19UaW1lTWdyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIEFQUC5nX1RpbWVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFRpbWVNYW5hZ2VyPihUaW1lTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuZ19UaW1lTWdyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBJbml0KClcclxuICAgIHtcclxuICAgICAgICBBUFAuZ19GcmFtZVdvcmsgPSBGcmFtZVdvcmsuRk07XHJcbiAgICAgICAgdmFyIGZtOkZyYW1lV29yayAgPSBBUFAuZ19GcmFtZVdvcms7XHJcbiAgICAgICAgQVBQLmdfTWVzc2FnZSA9IGZtLkFkZE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICBBUFAuZ19TY2VuZU1nciA9ICBmbS5BZGRNYW5hZ2VyPFNjZW5lTWdyPihTY2VuZU1ncik7XHJcbiAgICAgICAgQVBQLmdfVGltZU1nciA9IGZtLkFkZE1hbmFnZXI8VGltZU1hbmFnZXI+KFRpbWVNYW5hZ2VyKTtcclxuICAgICAgICBBUFAuZ19VSU1hbmFnZXIgPSBmbS5BZGRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICBcclxuICAgICAgICBBUFAuZ19NZXNzYWdlLlJlZ2lzdChHYW1lTW9kdWxlLkV2ZW50Lk9uVGltZVBhdXNlLEFQUC5nX1RpbWVNZ3IuUGF1c2UsQVBQLmdfVGltZU1ncilcclxuICAgICAgICBBUFAuZ19NZXNzYWdlLlJlZ2lzdChHYW1lTW9kdWxlLkV2ZW50Lk9uVGltZUNvbnRpbnVlLEFQUC5nX1RpbWVNZ3IuQ29udGludWUsQVBQLmdfVGltZU1ncilcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IENoYXJhY3Rlck1hbmFnZXIgZnJvbSBcIi4vLi4vR2FtZU1hbmFnZXIvQ2hhcmFjdGVyTWFtYWdlclwiXHJcbmltcG9ydCBJdGVtTWFuYWdlciBmcm9tIFwiLi8uLi9HYW1lTWFuYWdlci9JdGVtTWFuYWdlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVBUFBcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgQ2hhcmFjdGVyTWdyKCk6Q2hhcmFjdGVyTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJNYW5hZ2VyLk1ncjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEl0ZW1NZ3IoKTpJdGVtTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBJdGVtTWFuYWdlci5NZ3I7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0l0ZW19IGZyb20gXCIuLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdERlbGVnYXRlIGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIlxyXG5pbXBvcnQgU2V0UGFuZWxVSSBmcm9tIFwiLi8uLi91aS9TZXRQYW5lbFVJXCJcclxuaW1wb3J0IFJhbmtQYW5lbFVJIGZyb20gXCIuLy4uL3VpL1JhbmtQYW5lbFVJXCJcclxuaW1wb3J0IENoYXJhY3RlclVJIGZyb20gXCIuLy4uL3VpL0NoYXJhY3RlclVJXCJcclxuaW1wb3J0IEdhbWVTY2VuZSBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lU2NlbmVcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vQVBQXCJcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiO1xyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4uL3VpL0VudGVyR2FtZVVJXCI7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi4vR2FtZS9HYW1lTW9kdWxlXCI7XHJcblxyXG50eXBlIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGVyXHJcbntcclxuICAgIHN0YXRpYyBnZXQgR2FtZUNvbnRyb2xlcigpOkdhbWVDb250cm9sZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIEdhbWVDb250cm9sZXIuTWdyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ29udHJvbGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6IEdhbWVDb250cm9sZXI7XHJcbiAgICBzdGF0aWMgZ2V0IE1ncigpOiBHYW1lQ29udHJvbGVyIHtcclxuICAgICAgICBpZiAoR2FtZUNvbnRyb2xlci5fTWdyID09IG51bGwpIHtcclxuICAgICAgICAgICAgR2FtZUNvbnRyb2xlci5fTWdyID0gbmV3IEdhbWVDb250cm9sZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEdhbWVDb250cm9sZXIuX01ncjtcclxuICAgIH1cclxuICAgIF9MaW5lU3RlcE51bTpudW1iZXI7XHJcbiAgICBfTWF4TGluZU51bTpudW1iZXI7XHJcbiAgICBfU3RlcExlbmd0aDpudW1iZXI7XHJcbiAgICBfU3RlcERpc3RhbmNlOm51bWJlcjtcclxuICAgIF9QbGF5ZXJNb3ZlVGltZTpudW1iZXI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvL+W4uOmHj+WumuS5iVxyXG4gICAgLy/mr4/ooYzmnIDlpKfmoLzlrZDmlbBcclxuICAgIGdldCBMaW5lU3RlcE51bSgpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5fTGluZVN0ZXBOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9MaW5lU3RlcE51bSA9IDUrMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0xpbmVTdGVwTnVtO1xyXG4gICAgfSBcclxuICAgIC8v5pyA5aSn6KGM5pWwXHJcbiAgICBnZXQgTWF4TGluZU51bSgpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5fTWF4TGluZU51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX01heExpbmVOdW0gPSAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX01heExpbmVOdW07XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAvL+agvOWtkOi+uemVv1xyXG4gICAgZ2V0IFN0ZXBMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcExlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBMZW5ndGggPSAwLjk4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcExlbmd0aDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/njqnlrrbnp7vliqjml7bpl7RcclxuICAgIGdldCBQbGF5ZXJNb3ZlVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9QbGF5ZXJNb3ZlVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1BsYXllck1vdmVUaW1lID0gMC4yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fUGxheWVyTW92ZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGxheWVySUQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBndWVzdEFnZW50OlBsYXllckd1ZXN0QWdlbnQgPSBQbGF5ZXJHdWVzdERlbGVnYXRlLkd1ZXN0QWdlbnQ7XHJcbiAgICAgICAgdmFyIGNoYXJhY3Rlckxpc3Q6QXJyYXk8bnVtYmVyPiA9IGd1ZXN0QWdlbnQuQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICBpZighY2hhcmFjdGVyTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighZ3Vlc3RBZ2VudC5CdXlDaGFyYWN0ZXIoaWQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ3Vlc3RBZ2VudC5TZXRDaGFyYWN0ZXIoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66K6+572u6Z2i5p2/XHJcbiAgICBTaG93U2V0UGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIFBhbmVsID0gQVBQLlVJTWFuYWdlci5TaG93PFNldFBhbmVsVUk+KFNldFBhbmVsVUkpOy8vIG5ldyBTZXRQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aYvuekuuaOkuihjOamnOmdouadv1xyXG4gICAgU2hvd1JhbmtQYW5lbCgpIHtcclxuICAgICAgICAvLyBpZighTGF5YS5Ccm93c2VyLm9uV2VpWGluIHx8IHR5cGVvZiB3eCA9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdmFyIFBhbmVsID0gQVBQLlVJTWFuYWdlci5TaG93PFJhbmtQYW5lbFVJPihSYW5rUGFuZWxVSSk7Ly8gbmV3IFNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5pi+56S66KeS6Imy6Z2i5p2/XHJcbiAgICBwdWJsaWMgU2hvd0NoYXJhY3RlclBhbmVsKCkge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBBUFAuVUlNYW5hZ2VyLlNob3c8Q2hhcmFjdGVyVUk+KENoYXJhY3RlclVJKTtcclxuICAgICAgICByZXR1cm4gY2hhcmFjdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1NldEluZm87XHJcbiAgICBnZXQgU2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIGlmICh0aGlzLl9TZXRJbmZvID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFNldEluZm8odmFsdWU6IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuX1NldEluZm8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/neWtmOiuvue9ruaVsOaNrlxyXG4gICAgU2F2ZVNldEluZm8oaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5TZXRJbmZvID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvL+ivu+WPluiuvue9ruS/oeaBr1xyXG4gICAgR2V0U2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJHYW1lVUkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBFbnRlckdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZURpcigpOiBHYW1lRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkRpcmVjdG9yIGFzIEdhbWVEaXJlY3RvcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR2FtZVNjZW5lKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DaGFuZ2VTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQQlVGRuihqOeOsOaViOaenFxyXG4gICAgR2VuQnVmZkVmZmVjdCh0eXBlOiBJdGVtVHlwZSk6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEJ1eUl0ZW0oaWQ6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkJ1eUl0ZW0oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIFRpbWVQYXVzZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShHYW1lTW9kdWxlLkV2ZW50Lk9uVGltZVBhdXNlKTtcclxuICAgIH1cclxuXHJcbiAgICBUaW1lQ29udGludWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoR2FtZU1vZHVsZS5FdmVudC5PblRpbWVDb250aW51ZSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFdlY2hhdE9wZW4ge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHdlY2hhdE9wZW46IFdlY2hhdE9wZW4gPSBudWxsO1xyXG4gICAgcHVibGljIGRhdGFDb250ZXh0ID0gbnVsbDtcclxuICAgIHByaXZhdGUgaXNEcmF3UmFuazogYm9vbGVhbiAvLyDmmK/lkKblvIDlp4vnu5jnlLvmjpLooYzmppzlhoXlrrlcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaXNEcmF3UmFuayA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHR5cGVvZiB3eCAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUNvbnRleHQgPSB3aW5kb3dbXCJ3eFwiXS5nZXRPcGVuRGF0YUNvbnRleHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY3lr7nosaHlrp7liJdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZXMoKTogV2VjaGF0T3BlbiB7XHJcbiAgICAgICAgaWYoIVdlY2hhdE9wZW4ud2VjaGF0T3Blbikge1xyXG4gICAgICAgICAgICBXZWNoYXRPcGVuLndlY2hhdE9wZW4gPSBuZXcgV2VjaGF0T3BlbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gV2VjaGF0T3Blbi53ZWNoYXRPcGVuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNjb3JlKHNjb3JlOmFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInVwZGF0ZVwiLFxyXG4gICAgICAgICAgICBzY29yZTogc2NvcmVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd3Bhc3Moc2NvcmU6YW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiZHJhd3Bhc3NcIixcclxuICAgICAgICAgICAgc2NvcmU6IHNjb3JlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyY2FudmFzZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlVG9PcGVuKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJjbGVhcmNhbnZhc2VcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZVJhbmsoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2xvc2VcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UmFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwicmFuZ2VcIixcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGNsZWFyU2NvcmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2xlYXJTY29yZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5SYW5rKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcIm9wZW5cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcG9zdE1lc3NhZ2VUb09wZW4oZGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YUNvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhQ29udGV4dC5wb3N0TWVzc2FnZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtRWxlbWVudCBleHRlbmRzIExheWEuQm94IHtcclxuICAgIC8vXHJcbiAgICBwcml2YXRlIG1fSXRlbUlkeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQnRuOiBMYXlhLkJ1dHRvbjtcclxuICAgIHByaXZhdGUgX0ltZzogTGF5YS5JbWFnZTtcclxuICAgIHByaXZhdGUgbV9OdW1MYWJlbDogTGF5YS5MYWJlbDtcclxuICAgIHByaXZhdGUgbV9MYWJlbFN0cmluZzogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIG1fQnV5SXRlbTogTWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgcHJpdmF0ZSBtX0Nob29zZUl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuXHJcbiAgICBnZXQgQnRuKCk6IExheWEuQnV0dG9uIHtcclxuICAgICAgICBpZiAodGhpcy5fQnRuID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBJdGVtSWR4KGlkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fSXRlbUlkeCA9IGlkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IEltZygpOiBMYXlhLkltYWdlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSW1nO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBCdXlCdG4oKTogTGF5YS5CdXR0b24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9CdG47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IEJ0bkxhYmxlKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXN0cilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX0J0bi50ZXh0LnRleHQgPSBzdHI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IElzR3JheSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuSW1nLmdyYXkgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgSXNHcmF5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkltZy5ncmF5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBOdW0obnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fTGFiZWxTdHJpbmdbMV0gPSBcIlwiICsgbnVtO1xyXG4gICAgICAgIHRoaXMubV9OdW1MYWJlbC50ZXh0ID0gdGhpcy5tX0xhYmVsU3RyaW5nWzBdICsgdGhpcy5tX0xhYmVsU3RyaW5nWzFdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBQcmljZShudW06IG51bWJlcikgIHtcclxuICAgICAgICB0aGlzLl9CdG4udGV4dC50ZXh0ID0gXCJcIiArIG51bTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgSW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9JbWcgPSB0aGlzLmdldENoaWxkQXQoMCkgYXMgTGF5YS5JbWFnZTtcclxuICAgICAgICB0aGlzLl9CdG4gPSB0aGlzLmdldENoaWxkQXQoMSkgYXMgTGF5YS5CdXR0b247XHJcbiAgICAgICAgdGhpcy5tX051bUxhYmVsID0gdGhpcy5nZXRDaGlsZEF0KDIpIGFzIExheWEuTGFiZWw7XHJcbiAgICAgICAgdGhpcy5fQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQnV5SXRlbSk7XHJcbiAgICAgICAgdGhpcy5fSW1nLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQ2hvb3NlSW1nKTtcclxuICAgICAgICBpZiAoIXRoaXMubV9MYWJlbFN0cmluZykgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0xhYmVsU3RyaW5nID0gdGhpcy5tX051bUxhYmVsLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2hvb3NlSW1nKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQ2hvb3NlSXRlbSlcclxuICAgICAgICAgICAgdGhpcy5tX0Nob29zZUl0ZW0uRXhlY3V0ZSh0aGlzLm1fSXRlbUlkeCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJ1eUl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9CdXlJdGVtKVxyXG4gICAgICAgICAgICB0aGlzLm1fQnV5SXRlbS5FeGVjdXRlKHRoaXMubV9JdGVtSWR4KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0QnV5KG93bmVyOiBhbnksIGxpc3RlbmVyOiAoaWQ6IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciBuZXdEZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fQnV5SXRlbSA9IG5ld0RlbGVnYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RDaG9vc2Uob3duZXI6IGFueSwgbGlzdGVuZXI6IChpZDogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdmFyIG5ld0RlbGVnYXRlID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZShvd25lciwgbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubV9DaG9vc2VJdGVtID0gbmV3RGVsZWdhdGU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlRWxlbWVudCBleHRlbmRzIExheWEuSW1hZ2Uge1xyXG4gICAgLy9cclxuICAgIHByaXZhdGUgX0J0bjogTGF5YS5CdXR0b247XHJcbiAgICBwcml2YXRlIF9JbWc6IExheWEuSW1hZ2U7XHJcbiAgICBwcml2YXRlIG1fT25DbGlja0ltZzooaWQ6bnVtYmVyKT0+dm9pZDtcclxuICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJJRDpudW1iZXI7XHJcbiAgICBnZXQgQnRuKCk6IExheWEuQnV0dG9uIHtcclxuICAgICAgICBpZiAodGhpcy5fQnRuID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgICAgICB0aGlzLl9CdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNldFBsYXllcklEKHRoaXMubV9DaGFyYWN0ZXJJRCk7XHJcbiAgICAgICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlQ3VyVmlldygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG5cclxuICAgIFJlc2V0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fSW1nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRHcmF5KGlzR3JheTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0ltZy5ncmF5ID0gaXNHcmF5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RPbkltZ0NsaWNrKGV2ZW50RnVuY3Rpb246KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGlkPXRoaXMubV9DaGFyYWN0ZXJJRDtcclxuICAgICAgICB0aGlzLl9JbWcub24oTGF5YS5FdmVudC5DTElDSyxudWxsLGV2ZW50RnVuY3Rpb24pOy8vIG93bmVyLCAoKT0+eyBldmVudEZ1bmN0aW9uKGlkKSB9IClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IENoYXJhY3RlcklEKGlkOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQ2hhcmFjdGVySUQgPSBpZDtcclxuICAgIH1cclxuICAgIEluaXQoKSAge1xyXG4gICAgICAgIHRoaXMuX0ltZyA9IHRoaXMuZ2V0Q2hpbGRBdCgwKSBhcyBMYXlhLkltYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydHtCYXNlRnVuY30gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCR1VJIGV4dGVuZHMgdWkuQkdVSSB7XHJcbiAgICBcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiQkdcIikpKTtcclxuICAgIH1cclxuICAgIC8vcHJpdmF0ZSBfU2t5QXJyOkFycmF5PExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1NreVF1ZTpCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+O1xyXG4gICAgcHJpdmF0ZSBfVGVtcFNreVF1ZTpCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+O1xyXG4gICAgcHJpdmF0ZSBfU2NhbGVTa3k6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfU2NhbGVFYXJ0aDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9FYXJ0aFN0YXJ0UFM6bnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHdpZGggPSBMYXlhLnN0YWdlLndpZHRoIDtcclxuICAgICAgICB2YXIgcmF0ZSA9IE1hdGguY2VpbChMYXlhLnN0YWdlLmhlaWdodC93aWRoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fU2t5UXVlID0gbmV3IEJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT4oKTtcclxuICAgICAgICB0aGlzLl9UZW1wU2t5UXVlID0gbmV3IEJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT4oKTtcclxuICAgICAgICAgLy9uZXcgQXJyYXk8TGF5YS5JbWFnZT4ocmF0ZSsxKTtcclxuICAgICAgICBmb3IobGV0IHN0YXJ0SWR4ID0gMDtzdGFydElkeDxyYXRlKzE7ICsrc3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGltYWdlOkxheWEuSW1hZ2UgPSBuZXcgTGF5YS5JbWFnZSgpO1xyXG4gICAgICAgICAgICBpbWFnZS5sb2FkSW1hZ2UoXCJjb21wL2ltZ19iYWNrZ3JvdW5kX3Nwcl9za3kucG5nXCIpO1xyXG4gICAgICAgICAgICBpbWFnZS53aWR0aCA9IHdpZGg7XHJcbiAgICAgICAgICAgIGltYWdlLmhlaWdodCA9IHdpZGgrd2lkaCowLjAxO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGltYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5fU2t5UXVlLlB1c2goaW1hZ2UpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdGhpcy5TZXRTa3koMCk7XHJcbiAgICAgICAgdmFyIGVhcnRoID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgICAgICBlYXJ0aC55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0VhcnRoU3RhcnRQUyA9IGVhcnRoLnk7XHJcbiAgICAgICAgZWFydGgubG9hZEltYWdlKFwiY29tcC9pbWdfYmFja2dyb3VuZF9zcHIucG5nXCIpO1xyXG4gICAgICAgIHRoaXMuX0VhcnRoID0gZWFydGg7XHJcbiAgICAgICAgZWFydGgud2lkdGggPSB3aWRoO1xyXG4gICAgICAgIGVhcnRoLmhlaWdodCA9IHdpZGg7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChlYXJ0aCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fU2NhbGVTa3kgPSAwLjAwMVxyXG4gICAgICAgIHRoaXMuX1NjYWxlRWFydGggPSAwLjAxXHJcbiAgICAgICAgLy90aGlzLl9FYXJ0aFN0YXJ0UFMgPSB0aGlzLl9FYXJ0aC55O1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIGZvcihsZXQgc3RhcnRJZHg6bnVtYmVyID0gMDtzdGFydElkeDx0aGlzLl9Ta3lRdWUuQ291bnQ7KytzdGFydElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Ta3lBcnJbc3RhcnRJZHhdLnkgPSBzdGFydElkeCAqIGhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fRWFydGgueSA9IExheWEuc3RhZ2UuaGVpZ2h0IC0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9FYXJ0aFN0YXJ0UFMgPSB0aGlzLl9FYXJ0aC55O1xyXG4gICAgfSovXHJcbiAgICAvL+mrmOW6pui9rOWxj+W5lemrmOW6puWDj+e0oFxyXG4gICAgSGVpZ2h0VHJhbnNQaXgoIGhlaWdodDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGhlaWdodCotMC4xO1xyXG4gICAgfVxyXG4gICAgU2V0U2t5KHBpeEhlaWdodDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbVNreVF1ZTpCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+ID0gdGhpcy5fVGVtcFNreVF1ZTtcclxuICAgICAgICB0ZW1Ta3lRdWUuQ2xlYXIoKTtcclxuICAgICAgICB2YXIgY291bnQ6bnVtYmVyID0gMDtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB3aGlsZSh0aGlzLl9Ta3lRdWUuQ291bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOkJhc2VGdW5jLk5vZGU8TGF5YS5TcHJpdGU+ID0gdGhpcy5fU2t5UXVlLlBvcE5vZGUoKTtcclxuICAgICAgICAgICAgdmFyIHNreUltZzpMYXlhLlNwcml0ZSA9IG5vZGUuVmFsdWU7XHJcbiAgICAgICAgICAgIHNreUltZy55ID0gY291bnQgKiBoZWlnaHQgKyBwaXhIZWlnaHQgLSBoZWlnaHQgLSBoZWlnaHQqMC4wMTtcclxuICAgICAgICAgICAgdGVtU2t5UXVlLlB1c2hOb2RlKG5vZGUpO1xyXG4gICAgICAgICAgICBpZihza3lJbWcueT5MYXlhLnN0YWdlLmhlaWdodClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2t5SW1nLnkgPSB0ZW1Ta3lRdWUuSGVhZFZhbHVlLnkgLSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKytjb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVGVtcFNreVF1ZSA9IHRoaXMuX1NreVF1ZTtcclxuICAgICAgICB0aGlzLl9Ta3lRdWUgPSB0ZW1Ta3lRdWU7XHJcbiAgICB9XHJcbiAgICBTZXRFYXJ0aChoZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0VhcnRoLnkgPSB0aGlzLl9FYXJ0aFN0YXJ0UFMgKyBoZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBVcGRhdGVQYWdlKCBoZWlnaHQ6bnVtYmVyIClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIC8vaGVpZ2h0ID0gdGhpcy5IZWlnaHRUcmFuc1BpeChoZWlnaHQpO1xyXG4gICAgICAgIC8vdmFyIHNreUhlaWdodFBpeCA9IGhlaWdodCp0aGlzLl9TY2FsZVNreTtcclxuICAgICAgICB0aGlzLlNldFNreShoZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuU2V0RWFydGgoaGVpZ2h0KTtcclxuICAgICAgICAvL3ZhciBlYXJ0aEhlaWdodFBpeCA9IGhlaWdodDtcclxuXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtVSUZ1bmN9IGZyb20gXCIuLy4uL1V0aWxpdHkvVUlGdW5jXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuXHJcbi8vVUnln7rnsbtcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZVVJIGV4dGVuZHMgTGF5YS5Cb3hcclxue1xyXG4gICAgXHJcbiAgICBcclxuICAgIC8vXHJcbiAgICBwcm90ZWN0ZWQgX1VJVHlwZTpCYXNlRW51bS5VSVR5cGVFbnVtO1xyXG4gICAgcHJvdGVjdGVkIF9Jc011dGV4OmJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX05hbWU6c3RyaW5nOyAgICBcclxuICAgIHByb3RlY3RlZCBfVUlNYW5hZ2VyOlVJTWFuYWdlclxyXG4gICAgcHJpdmF0ZSBfRGlydHk6Ym9vbGVhbjtcclxuICAgIHByaXZhdGUgX1Nob3dpbmc6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5Mb3c7XHJcbiAgICAgICAgdGhpcy5fSXNNdXRleCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuX1Nob3dpbmcgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMubGVmdCA9IDA7XHJcblx0ICAgIC8vIHRoaXMucmlnaHQgPSAwO1xyXG5cdFx0Ly8gdGhpcy5ib3R0b20gPSAwO1xyXG4gICAgICAgIC8vIHRoaXMudG9wID0gMDtcclxuICAgIH1cclxuICAgIEhpZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuT1AoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5PcGVuKCk7XHJcbiAgICB9XHJcbiAgICBDbG9zZU9QKClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBEZXN0cm95KCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFVJVHlwZSgpOkJhc2VFbnVtLlVJVHlwZUVudW1cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUlUeXBlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgSXNNdXRleCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNNdXRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTaG93aW5nKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TaG93aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+5VUnov5vooYzpgILphY1cclxuICAgICAqIEBwYXJhbSBVSSDpgILphY1VSVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRml4VUkoVUk6TGF5YS5WaWV3KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoVUkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldERpcnR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBEaXJ0eSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fRGlydHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENsZWFyRGlydHkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBVSVVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9EaXJ0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xlYXJEaXJ0eSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IFVwZGF0ZSgpOnZvaWQ7XHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEZXIGZyb20gXCIuLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi8uLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIiBcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQVBQXCI7XHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi9FbnRlckdhbWVVSVwiO1xyXG5pbXBvcnQgQ2hhcmFjdGVyVUlTY2VuZSBmcm9tIFwiLi4vU2NlbmUvQ2hhcmFjdGVyVUlTY2VuZVwiO1xyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuL0VuZEdhbWVVSVwiO1xyXG5pbXBvcnQgQ2hhcmFjdGVyTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvQ2hhcmFjdGVyTWFtYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclwiO1xyXG5cclxuY2xhc3MgRXh0ZW5kQ2hhcmFjdGVyc1VJIGV4dGVuZHMgdWkuQ2hhcmFjdGVyVUkge1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJDaGFyYWN0ZXJcIikpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJVSSBleHRlbmRzIEJhc2VVSSB7XHJcblxyXG4gICAgcHJpdmF0ZSBtX0NoYXJhY3Rlckxpc3Q6IEFycmF5PGFueT47XHJcbiAgICBwcml2YXRlIG1fR29sZERpc2NyaWJlOiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgc3ByaXRlQmdBcnI6TGF5YS5TcHJpdGVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBjaGFyYWN0ZXJVSVNjZW5lOkNoYXJhY3RlclVJU2NlbmU7XHJcbiAgICBwcml2YXRlIGNudENoYXJhY3RlcklkOm51bWJlcjtcclxuICAgIHByaXZhdGUgX1VJOiBFeHRlbmRDaGFyYWN0ZXJzVUk7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25maWcgPSB7XCJpbWdcIjpcclxuICAgICAgICBbICAgXHJcbiAgICAgICAgICAgIHtrZXk6XCJiZ1wiLHRleHR1cmVOYW1lOlwibWFpbmJnLmpwZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImNoYXJhY3RlcnJvbGUwYmdcIix0ZXh0dXJlTmFtZTpcInJvbGViZ2NpcmNsZS5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJjaGFyYWN0ZXJyb2xlMWJnXCIsdGV4dHVyZU5hbWU6XCJyb2xlYmdjaXJjbGUucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiY2hhcmFjdGVycm9sZTJiZ1wiLHRleHR1cmVOYW1lOlwicm9sZWJnY2lyY2xlLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImNoYXJhY3RlcnJvbGUzYmdcIix0ZXh0dXJlTmFtZTpcInJvbGViZ2NpcmNsZS5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJjaGFyYWN0ZXJyb2xlNGJnXCIsdGV4dHVyZU5hbWU6XCJyb2xlYmdjaXJjbGUucG5nXCJ9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcImJhY2tCdG5cIix0ZXh0dXJlTmFtZTpcImJhY2sucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiYnV5QnRuXCIsdGV4dHVyZU5hbWU6XCJidXkucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5Olwic3RhcnRHYW1lXCIsdGV4dHVyZU5hbWU6XCJzdGFydC5wbmdcIn1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZENoYXJhY3RlcnNVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuR2V0Q2hhcmFjdGVyTGlzdCgpO1xyXG4gICAgICAgIC8vdGhpcy5TZXRMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBbXTtcclxuICAgICAgICAvL3RoaXMubV9Hb2xkRGlzY3JpYmUgPSB0aGlzLl9VSS5fR29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLk9uTW9uZXlDaGFuZ2UoKTtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC5zdHJva2UgPSAyO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnN0cm9rZUNvbG9yID0gXCIweGZmMDAwMFwiO1xyXG5cclxuICAgICAgICB0aGlzLl9VSS5iYWNrQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQmFja0dhbWVCdG4pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVCZ0Fyci5wdXNoKHRoaXMuX1VJLmNoYXJhY3RlcnJvbGUwYmcpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQmdBcnIucHVzaCh0aGlzLl9VSS5jaGFyYWN0ZXJyb2xlMWJnKTtcclxuICAgICAgICB0aGlzLnNwcml0ZUJnQXJyLnB1c2godGhpcy5fVUkuY2hhcmFjdGVycm9sZTJiZyk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVCZ0Fyci5wdXNoKHRoaXMuX1VJLmNoYXJhY3RlcnJvbGUzYmcpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQmdBcnIucHVzaCh0aGlzLl9VSS5jaGFyYWN0ZXJyb2xlNGJnKTtcclxuXHJcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuc3ByaXRlQmdBcnIubGVuZ3RoO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLm5hbWUgPSBpICsgXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLnNlbGVjdFJvbGVQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY250Q2hhcmFjdGVySWQgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNudENoYXJhY3RlcklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fVUkuc3RhcnRHYW1lLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuc3RhcnRFdmVudCk7XHJcbiAgICAgICAgdGhpcy5fVUkuYnV5QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuT25DbGlja0ltZyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGZTY2VuZVVJKCkge1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmNvbmZpZ1trZXldLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1VJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5za2luID0gKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRFdmVudCgpOiB2b2lkIHtcclxuICAgICAgICBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0UGxheWVySUQodGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpO1xyXG4gICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0lzTG9jayhpZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICBpZihjaGFyYWN0ZXJbaWRdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUm9sZUluZm8oaWQpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmNoZWNrSXNMb2NrKGlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5zdGFydEdhbWUudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmJ1eUJ0bi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmdvbGRpbWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLnJvbGV1c2VOb25leS50ZXh0ID0gXCLlt7Lop6PplIFcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLnN0YXJ0R2FtZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmJ1eUJ0bi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkuZ29sZGltZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkucm9sZXVzZU5vbmV5LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudGV4dCA9IENoYXJhY3Rlck1hbmFnZXIuTWdyLkdldFByaWNlKHRoaXMuY250Q2hhcmFjdGVySWQpICsgXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkucm9sZU5hbWUudGV4dCA9IENoYXJhY3Rlck1hbmFnZXIuTWdyLkdldE5hbWUoaWQpO1xyXG4gICAgICAgIHRoaXMuX1VJLmRlc2MudGV4dCA9IENoYXJhY3Rlck1hbmFnZXIuTWdyLkdldERlc2MoaWQpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnRleHQgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXkgKyBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFJvbGVQb3NpdGlvbihlOkxheWEuRXZlbnQpOiB2b2lkIHsgXHJcbiAgICAgICAgdmFyIGNudFRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcclxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXJVSVNjZW5lIHx8IHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jbnRTZWxlY3RJbmRleCA9PSBwYXJzZUludChjbnRUYXJnZXQubmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9VSS5zdGFydEdhbWUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLmJ1eUJ0bi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuZ29sZGltZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkucm9sZXVzZU5vbmV5LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLnVwZGF0ZVNlbGVjdEluZGV4KHBhcnNlSW50KGNudFRhcmdldC5uYW1lKSk7XHJcbiAgICAgICAgdGhpcy5Jbml0UG9zaXRpb24obnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgSW5pdFBvc2l0aW9uKGRhdGEpOiB2b2lkIHtcclxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXJVSVNjZW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmNudENoYXJhY3RlcklkID0gdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250Q2hhcmFjdGVySWQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBudW0gPSB0aGlzLmNoYXJhY3RlclVJU2NlbmUuYXJyYXlEaXMubGVuZ3RoO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IG51bTtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBfb3V0UG9zOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNhbWVyYS52aWV3cG9ydC5wcm9qZWN0KHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5hcnJheURpc1tpXS50cmFuc2Zvcm0ucG9zaXRpb24sIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jYW1lcmEucHJvamVjdGlvblZpZXdNYXRyaXgsIF9vdXRQb3MpO1xyXG4gICAgICAgICAgICB2YXIgX291dFBvczEgPSBuZXcgTGF5YS5Qb2ludChfb3V0UG9zLngsIF9vdXRQb3MueSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmxheW91dGJnLmdsb2JhbFRvTG9jYWwoX291dFBvczEpO1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLnBvcyhfb3V0UG9zMS54IC8gTGF5YS5zdGFnZS5jbGllbnRTY2FsZVgsIF9vdXRQb3MxLnkgLyBMYXlhLnN0YWdlLmNsaWVudFNjYWxlWSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0ucGl2b3RYID0gMjA3IC8gMjtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS5waXZvdFkgPSB0aGlzLnNwcml0ZUJnQXJyW2ldLmhlaWdodCAtIDU7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0udmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLnNjYWxlWCA9IDAuOCArICgodGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmFycmF5RGlzW2ldLnRyYW5zZm9ybS5sb2NhbFNjYWxlWCAtIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5pbml0U2NhbE51bSkgLyAwLjAwNCkgKiAwLjI7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0uc2NhbGVZID0gMC44ICsgKCh0aGlzLmNoYXJhY3RlclVJU2NlbmUuYXJyYXlEaXNbaV0udHJhbnNmb3JtLmxvY2FsU2NhbGVYIC0gdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmluaXRTY2FsTnVtKSAvIDAuMDA0KSAqIDAuMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQmFja0dhbWVCdG4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdG9wUm9hdGVUaW1lcigpO1xyXG4gICAgICAgIHZhciBlbnRlcnBhbmVsOkVudGVyR2FtZVVJID0gQVBQLlVJTWFuYWdlci5HZXRVSUJ5TmFtZShcIkVudGVyR2FtZVVJXCIpIGFzIEVudGVyR2FtZVVJO1xyXG4gICAgICAgIGVudGVycGFuZWwuX1VJLnkgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKGVudGVycGFuZWwuX1VJLCB7eTogMH0sIDUwMCwgTGF5YS5FYXNlLnNpbmVPdXQpO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcywge3k6IC1MYXlhLnN0YWdlLmhlaWdodH0sIDUwMCwgTGF5YS5FYXNlLnNpbmVPdXQsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCk9PntcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5fVUkucmVtb3ZlQ2hpbGQodGhpcy5jaGFyYWN0ZXJVSVNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wUm9hdGVUaW1lcigpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmNoYXJhY3RlclVJU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNsZWFyUm9hdGVUaW1lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkNoYXJhY3RlclVJXCI7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0Q2hhcmFjdGVyTGlzdCgpICB7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRJRExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgc3VwZXIuTGF5b3V0KCk7XHJcbiAgICAgICAgaWYoIXRoaXMuX1VJIHx8ICF0aGlzLl9VSS5iZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLmJnLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuXHJcbiAgICAgICAgdmFyIHNjYWxlWCA9IExheWEuc3RhZ2Uud2lkdGggLyBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB2YXIgc2NhbGVZID0gNzUwIC8gMTMzNDtcclxuICAgICAgICBpZihzY2FsZVggPiBzY2FsZVkpIHtcclxuICAgICAgICAgICAgc2NhbGVZID0gc2NhbGVZIC8gc2NhbGVYO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5sYXlvdXRiZy5waXZvdFggPSA3NTAgLyAyO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5sYXlvdXRiZy5waXZvdFkgPSAxMzM0IC8gMjtcclxuICAgICAgICAgICAgdmFyIF9vdXRQb3M6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY2FtZXJhLnZpZXdwb3J0LnByb2plY3QobmV3IExheWEuVmVjdG9yMygwLCAtdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLnN0YXJ0WSAtIDAuMDEsIDApLCB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY2FtZXJhLnByb2plY3Rpb25WaWV3TWF0cml4LCBfb3V0UG9zKTtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0YmcueCA9IF9vdXRQb3MueDtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0YmcueSA9IF9vdXRQb3MueTtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0Ymcuc2NhbGVYID0gdGhpcy5fVUkubGF5b3V0Ymcuc2NhbGVZID0gc2NhbGVZO1xyXG4gICAgICAgICAgICB0aGlzLkluaXRQb3NpdGlvbihudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCkgeyAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBPcGVuKCkgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckNoYXJhY3RlcklEQ2hhbmdlLCB0aGlzLk9uTmVlZENsb3NlVUksIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsIHRoaXMuT25Nb25leUNoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DaGFyYWN0ZXJMaXN0Q2hhbmdlLCB0aGlzLk9uQ2hhbmdlTGlzdCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lID0gbmV3IENoYXJhY3RlclVJU2NlbmUodGhpcy5jbnRDaGFyYWN0ZXJJZCAsIHRoaXMuSW5pdFBvc2l0aW9uLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuX1VJLmFkZENoaWxkKHRoaXMuY2hhcmFjdGVyVUlTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5zcHJpdGVCZ0Fyci5sZW5ndGg7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5Jbml0UG9zaXRpb24oKTtcclxuICAgICAgICB9LmJpbmQodGhpcyksIDUwMCk7XHJcbiAgICAgICAgdGhpcy5MYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZSgpICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJDaGFyYWN0ZXJJRENoYW5nZSwgdGhpcy5Pbk5lZWRDbG9zZVVJLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLCB0aGlzLk9uTW9uZXlDaGFuZ2UsIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSwgdGhpcy5PbkNoYW5nZUxpc3QsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5LqL5Lu2XHJcbiAgICBwcml2YXRlIE9uQ2xpY2tJbWcoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSXNMb2NrKHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jbnRTZWxlY3RJbmRleCkpICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5CYWNrR2FtZUJ0bigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRQbGF5ZXJJRCh0aGlzLmNoYXJhY3RlclVJU2NlbmUuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuT25Nb25leUNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUm9sZUluZm8odGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uTmVlZENsb3NlVUkoKTogdm9pZCAge1xyXG4gICAgICAgIGlmICghdGhpcy5TaG93aW5nKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQmFja0dhbWVCdG4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2hhbmdlTGlzdCgpICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QucmVmcmVzaCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbk1vbmV5Q2hhbmdlKCkgIHtcclxuICAgICAgICBpZiAoIXRoaXMuU2hvd2luZykgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMubV9Hb2xkRGlzY3JpYmVbMV0gPSBcIlwiICsgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5O1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX0dvbGQudGV4dCA9IHRoaXMubV9Hb2xkRGlzY3JpYmVbMF0gKyB0aGlzLm1fR29sZERpc2NyaWJlWzFdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnRleHQgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXkgKyBcIlwiO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnN0cm9rZSA9IDI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dvbGQuc3Ryb2tlQ29sb3IgPSBcIjB4ZmYwMDAwXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtHYW1lU3RydWN0IH0gIGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuXHJcbmNsYXNzIEV4dGVuZEVuZEdhbWVVSSBleHRlbmRzIHVpLkVuZEdhbWVVSSB7XHJcbiAgICBQYW5lbDpMYXlhLlBhbmVsO1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJFbmRHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL3RoaXMuUGFuZWwgPSB0aGlzLlBhbmVsO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbC52U2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9NZW51ZUJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLEd1aWRlck1hbmFnZXIuTWdyLEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuX1NldEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dTZXRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRCdG4ub24oTGF5YS5FdmVudC5DTElDSyxDb250cm9sZXIuR2FtZUNvbnRyb2xlcixDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJFbmRHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIFVJOkV4dGVuZEVuZEdhbWVVSTtcclxuXHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJtYWluYmcuanBnXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiZW5kZ2FtZXRpdGxlXCIsdGV4dHVyZU5hbWU6XCJlbmRnYW1lZGFpemkucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiZW5kZ2FtZWhlbnRpYW9cIix0ZXh0dXJlTmFtZTpcImluZm90aWFvLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImVuZGdhbWViZ2ljb25cIix0ZXh0dXJlTmFtZTpcImlucHV0dGV4dGFyZWEucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiZGliZ1wiLHRleHR1cmVOYW1lOlwiaW5wdXR0ZXh0YXJlYS5wbmdcIn1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnRuXCI6XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7a2V5OlwiX1N0YXJ0QnRuXCIsdGV4dHVyZU5hbWU6XCJyZXN0YXJ0LnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcIl9NZW51ZUJ0blwiLHRleHR1cmVOYW1lOlwiaG9tZUJ0bi5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJfU2V0QnRuXCIsdGV4dHVyZU5hbWU6XCJzZXR0aW5nLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcIl9QbGF5ZXJMaXN0QnRuXCIsdGV4dHVyZU5hbWU6XCJwYWloYW5nLnBuZ1wifVxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlU2VsZlNjZW5lVUkoKSB7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5jb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuY29uZmlnW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uc2tpbiA9IChQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuVUk9IG5ldyBFeHRlbmRFbmRHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuVUkpO1xyXG4gICAgICAgIC8vdGhpcy5VSS5fQ2hhcmFjdGVyTGlzdC5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgdGhpcy5fVUlNYW5hZ2VyLlNob3c8UGxheWVyTGlzdFVJPihQbGF5ZXJMaXN0VUkpfSk7XHJcbiAgICAgICAgdGhpcy5MYXlvdXQoKTtcclxuICAgICAgICB0aGlzLlVJLmRpc3RhbmNlLnRleHQgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5EaXN0YW5jZSArIFwiXCI7XHJcbiAgICAgICAgdGhpcy5VSS5nb2xkLnRleHQgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HYW1lR29sZCArIFwiXCI7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpIHtcclxuICAgICAgICBzdXBlci5MYXlvdXQoKTtcclxuICAgICAgICBpZighdGhpcy5VSSB8fCAhdGhpcy5VSS5iZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVUkuYmcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuVUkuYmcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBGTSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFBsYXllckxpc3RVSSBmcm9tIFwiLi8uLi91aS9QbGF5ZXJMaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCI7XHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vRW5kR2FtZVVJXCI7XHJcblxyXG5jbGFzcyBFeHRlbmRFbnRlckdhbWVVSSBleHRlbmRzIHVpLkVudGVyVUkge1xyXG4gICAgUGFuZWw6IExheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vIHRoaXMuUGFuZWwgPSB0aGlzLl9QYW5lbDtcclxuICAgICAgICAvLyB0aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICAvLyB0aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXIub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5TaG93Q2hhcmFjdGVyUGFuZWwpO1xyXG4gICAgICAgIC8vdGhpcy5fQ2hhcmFjdGVyLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuc2hvd0NoYXJhY3Rlcik7XHJcbiAgICAgICAgdGhpcy5fU2V0UGFuZWwub24oTGF5YS5FdmVudC5DTElDSywgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICAvL3RoaXMuX1Jhbmsub24oTGF5YS5FdmVudC5DTElDSywgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1JhbmtQYW5lbCk7XHJcbiAgICAgICAgLy90aGlzLl9TdGFydC5vbihMYXlhLkV2ZW50LkNMSUNLLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25TdGFydCk7XHJcblxyXG4gICAgICAgIHRoaXMuX0NoYXJhY3Rlckxpc3QudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbC52aXNpYmxlID0gZmFsc2U7IFxyXG4gICAgICAgIHRoaXMuX1N0YXJ0W1wiaW5pdFhcIl0gPSB0aGlzLl9TdGFydC54O1xyXG4gICAgICAgIHRoaXMuX0NoYXJhY3RlcltcImluaXRZXCJdID0gdGhpcy5fQ2hhcmFjdGVyLnk7XHJcbiAgICB9XHJcblxyXG4gICAgU2hvd0NoYXJhY3RlclBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBub2RlID0gR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dDaGFyYWN0ZXJQYW5lbCgpO1xyXG4gICAgICAgIG5vZGUueSA9IC1MYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKG5vZGUsIHt5OiAwfSwgNTAwLCBMYXlhLkVhc2Uuc2luZU91dCk7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLCB7eTogTGF5YS5zdGFnZS5oZWlnaHR9LCA1MDAsIExheWEuRWFzZS5zaW5lT3V0KTtcclxuICAgIH1cclxuXHJcbiAgICBvblN0YXJ0KCk6dm9pZCB7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLl9SYW5rLCB7eTp0aGlzLl9SYW5rLnkgKyBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX0NoYXJhY3Rlci55fSwgMTUwLCBMYXlhLkVhc2Uuc2luZUluKTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX1NldFBhbmVsLCB7eTp0aGlzLl9TZXRQYW5lbC55ICArIExheWEuc3RhZ2UuaGVpZ2h0IC0gdGhpcy5fQ2hhcmFjdGVyLnl9LCAxNTAsIExheWEuRWFzZS5zaW5lSW4pO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fU3RhcnQsIHt4OnRoaXMuX1N0YXJ0LnkgICsgTGF5YS5zdGFnZS53aWR0aCAtIHRoaXMuX1N0YXJ0Lnh9LCAyNTAsIExheWEuRWFzZS5zaW5lSW4sIExheWEuSGFuZGxlci5jcmVhdGUoR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuRW50ZXJHYW1lKSk7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLl9DaGFyYWN0ZXIsIHt5OnRoaXMuX0NoYXJhY3Rlci55ICAtIExheWEuc3RhZ2UuaGVpZ2h0fSwgMTUwLCBMYXlhLkVhc2Uuc2luZUluKTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuYWR2LCB7eTp0aGlzLmFkdi55ICArIExheWEuc3RhZ2UuaGVpZ2h0IC0gdGhpcy5fQ2hhcmFjdGVyLnl9LCAxNTAsIExheWEuRWFzZS5zaW5lSW4pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRlckdhbWVVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkVudGVyR2FtZVVJXCI7XHJcbiAgICB9XHJcblxyXG4gICAgX2drOkxheWEuU3ByaXRlO1xyXG4gICAgX2drQ29udGVudDpMYXlhLlNwcml0ZTtcclxuICAgIF9VSTogRXh0ZW5kRW50ZXJHYW1lVUk7XHJcbiAgICBsYXN0WDpudW1iZXIgPSA5OTk5OTtcclxuICAgIHByaXZhdGUgY29uZmlnID0ge1wiaW1nXCI6XHJcbiAgICAgICAgWyAgIFxyXG4gICAgICAgICAgICB7a2V5OlwiYmdcIix0ZXh0dXJlTmFtZTpcIm1haW5iZy5qcGdcIn1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnRuXCI6XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7a2V5OlwiX0NoYXJhY3RlclwiLHRleHR1cmVOYW1lOlwicm9sZS5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJfU3RhcnRcIix0ZXh0dXJlTmFtZTpcInN0YXJ0LnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcIl9TZXRQYW5lbFwiLHRleHR1cmVOYW1lOlwic2V0dGluZy5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJhZHZcIix0ZXh0dXJlTmFtZTpcImFkLnBuZ1wifVxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBtX0J0bkdyb3VwOiBBcnJheTxMYXlhLkltYWdlPjtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZEVudGVyR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdmFyIHVpTWdyOiBVSU1hbmFnZXIgPSB0aGlzLl9VSU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5tX0J0bkdyb3VwID0gW107XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9VSS5fUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpIGFzIExheWEuU3ByaXRlO1xyXG4gICAgICAgIHRoaXMuTGF5b3V0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgICAgIHRoaXMuX2drID0gY29udGVudDtcclxuICAgICAgICB0aGlzLl9VSS5fUGFuZWwubW91c2VFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9nay5tb3VzZUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vdGhpcy5pbml0R0soKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmluaXRHS0xpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEdLTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1BhbmVsLm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5kb3duR0tCb3gpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9QYW5lbC5vbihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMubW92ZUdLQm94KTtcclxuICAgICAgICB0aGlzLl9VSS5fUGFuZWwub24oTGF5YS5FdmVudC5NT1VTRV9VUCwgdGhpcywgdGhpcy51cEdLQm94KTtcclxuICAgICAgICB0aGlzLl9VSS5fUGFuZWwub24oTGF5YS5FdmVudC5NT1VTRV9PVkVSLCB0aGlzLCB0aGlzLnVwR0tCb3gpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvd25HS0JveChlOkxheWEuRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmxhc3RYID0gZS50YXJnZXQubW91c2VYO1xyXG4gICAgfVxyXG5cclxuICAgIG1vdmVHS0JveChlOiBMYXlhLkV2ZW50KSB7XHJcbiAgICAgICAgaWYodGhpcy5sYXN0WCA9PSA5OTk5OSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2drLnggKz0gKGUudGFyZ2V0Lm1vdXNlWCAtIHRoaXMubGFzdFgpO1xyXG4gICAgICAgIHRoaXMubGFzdFggPSBlLnRhcmdldC5tb3VzZVg7XHJcbiAgICB9XHJcblxyXG4gICAgdXBHS0JveChlOiBMYXlhLkV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5sYXN0WCA9IDk5OTk5O1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIGluaXRHSygpIHtcclxuICAgIC8vICAgICBmb3IodmFyIGkgPSAxO2kgPD0gNTtpICsrKSB7XHJcbiAgICAvLyAgICAgICAgIHZhciBzcHIgPSBuZXcgTGF5YS5JbWFnZSgpO1xyXG4gICAgLy8gICAgICAgICBzcHIubG9hZEltYWdlKFwiZW50ZXJzY2VuZXVpL2drL2drXCIgKyBpICsgXCIucG5nXCIpO1xyXG4gICAgLy8gICAgICAgICBzcHIueCA9IChpIC0gMSkgKiA2MzA7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuX2drQ29udGVudC5hZGRDaGlsZChzcHIpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICB1cGRhdGVTZWxmU2NlbmVVSSgpIHtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5jb25maWdba2V5XS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uc2tpbiA9IChQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgSW5pdEJ0bkdyb3VwKCkge1xyXG4gICAgICAgIC8vIHZhciBDdXJNYXhMZXZlbCA9IEdhbWVBZ2VudC5BZ2VudC5DdXJNYXhMZXZlbDtcclxuICAgICAgICAvLyB2YXIgY3VyTGV2ZWwgPSBHYW1lQWdlbnQuQWdlbnQuQ3VyTGV2ZWw7XHJcbiAgICAgICAgLy8gdmFyIGJ0bk51bSA9IHRoaXMuX1VJLl9Hcm91cC5udW1DaGlsZHJlbjtcclxuICAgICAgICAvLyB2YXIgZ3JvdXAgPSB0aGlzLm1fQnRuR3JvdXA7XHJcbiAgICAgICAgLy8gZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYnRuTnVtOyArK2lkeCkge1xyXG4gICAgICAgIC8vICAgICB2YXIgYnRuOiBhbnkgPSB0aGlzLl9VSS5fR3JvdXAuZ2V0Q2hpbGRBdChpZHgpIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgLy8gICAgIGJ0bi5pZHggPSBpZHg7XHJcbiAgICAgICAgLy8gICAgIGJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2hvb3NlKVxyXG4gICAgICAgIC8vICAgICBidG4uZ3JheSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIGdyb3VwLnB1c2goYnRuKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy9ncm91cFtjdXJMZXZlbF0uZ3JheSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPcGVuKCkge1xyXG4gICAgICAgIC8vdGhpcy5Jbml0QnRuR3JvdXAoKTtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SYW5rLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX1VJLl9SYW5rLmJvdHRvbSAtIHRoaXMuX1VJLmFkdi5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fVUkuX1NldFBhbmVsLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX1VJLl9TZXRQYW5lbC5ib3R0b20gLSB0aGlzLl9VSS5hZHYuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX1VJLmFkdi55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSB0aGlzLl9VSS5hZHYuYm90dG9tIC0gdGhpcy5fVUkuYWR2LmhlaWdodDtcclxuICAgICAgICB0aGlzLl9VSS5fU3RhcnQueCA9IHRoaXMuX1VJLl9TdGFydFtcImluaXRYXCJdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9DaGFyYWN0ZXIueSA9IHRoaXMuX1VJLl9DaGFyYWN0ZXJbXCJpbml0WVwiXTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpIHtcclxuICAgICAgICBzdXBlci5MYXlvdXQoKTtcclxuICAgICAgICBpZighdGhpcy5fVUkgfHwgIXRoaXMuX1VJLmJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuYmcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX1VJLmJnLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5LqL5Lu2XHJcbiAgICBPbkNob29zZShpbmZvOiBFdmVudCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQ6YW55ID0gaW5mby50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGlkeDogbnVtYmVyID0gdGFyZ2V0LmlkeDtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VyTGV2ZWwgPSBpZHg7XHJcbiAgICAgICAgdGhpcy5tX0J0bkdyb3VwLmZvckVhY2goKGltZzogTGF5YS5JbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICBpbWcuZ3JheSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tX0J0bkdyb3VwW2lkeF0uZ3JheSA9IGZhbHNlO1xyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOWcuuaZr1VJXHJcbiAqL1xyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckVudGl0eVwiXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi4vR2FtZS9HYW1lTW9kdWxlXCI7XHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLi9BZ2VudC9HYW1lQWdlbnRcIjtcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgSXRlbUxpc3RVSSBmcm9tIFwiLi9JdGVtTGlzdFVJXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5cclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiO1xyXG5jbGFzcyBFeHRlbmRzR2FtZVVJIGV4dGVuZHMgdWkuR2FtZVVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVwiKSkpO1xyXG4gICAgfVxyXG4gICAgU2V0Q291bnRUaW1lKGluZm86IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUudGV4dCA9IGluZm87XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBwcml2YXRlIF9VSTogRXh0ZW5kc0dhbWVVSTtcclxuICAgIHByaXZhdGUgbV9vbkNsaWNrU2tpbGxJdGVtOiBNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBwcml2YXRlIG1fb25DTGlja1BsYXllckl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIC8vXHJcbiAgICBwdWJsaWMgRGlzdGFuY2VTdHI6IEFycmF5PHN0cmluZz47XHJcbiAgICBwdWJsaWMgR29sZE51bVN0cjogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICBzZXQgR2FtZVBhbmVsKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dhbWVQYW5lbC52aXNpYmxlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgRGlzdGFuY2UodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBkaXMgPSBcIlwiICsgdmFsdWU7XHJcbiAgICAgICAgaWYgKGRpcyA9PSB0aGlzLkRpc3RhbmNlU3RyWzFdKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gZGlzO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIHNldCBHb2xkTnVtKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1Nob3dEaXN0YW5jZSgpIHtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0RGlzdGFuY2UudGV4dCA9IHRoaXMuRGlzdGFuY2VTdHJbMF0gKyB0aGlzLkRpc3RhbmNlU3RyWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1Nob3dHb2xkTnVtKCkge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHRHb2xkLnRleHQgPSB0aGlzLkdvbGROdW1TdHJbMF0gKyB0aGlzLkdvbGROdW1TdHJbMV07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgc2V0IEdvbGQoZ29sZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyWzFdID0gZ29sZC50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX0lzTXV0ZXggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGVmdCA9IDA7XHJcbiAgICAgICAgdGhpcy5yaWdodCA9IDA7XHJcbiAgICAgICAgdGhpcy5ib3R0b20gPSAwO1xyXG4gICAgICAgIHRoaXMudG9wID0gMDtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdmFyIG9wSXNSaWdodCA9IEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRJbmZvLk9QSXNSaWdodDtcclxuICAgICAgICB0aGlzLl9VSS5fSXRlbUxpc3RCdG4ub24oTGF5YS5FdmVudC5DTElDSywgbnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9VSU1hbmFnZXIuU2hvdzxJdGVtTGlzdFVJPihJdGVtTGlzdFVJKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuU2V0Q291bnRUaW1lKCk7XHJcbiBcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyID0gdGhpcy5fVUkuX1R4dERpc3RhbmNlLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHJbMV0gPSBcIjBcIlxyXG4gICAgICAgIHRoaXMuX1Nob3dEaXN0YW5jZSgpO1xyXG5cclxuICAgICAgICB0aGlzLkdvbGROdW1TdHIgPSB0aGlzLl9VSS5fVHh0R29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSBcIjBcIjtcclxuICAgICAgICB0aGlzLl9TaG93R29sZE51bSgpO1xyXG5cclxuICAgICAgICB0aGlzLlNob3dJbnB1dEluZm8oXCJcIik7XHJcbiAgICAgICAgdGhpcy5fVUkuX1BsYXllckl0ZW0ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5PbkNsaWNrUGxheWVySXRlbSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1NraWxsSXRlbS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2xpY2tTa2lsbEl0ZW0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFNldExlZnRUb3VjaChvd25lcjogYW55LCBMaXN0ZW5lcjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX1VJLl9MZWZ0VG91Y2gub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCBvd25lciwgTGlzdGVuZXIpOyBcclxuICAgIH1cclxuXHJcbiAgICBTZXRSaWdodFRvdWNoKG93bmVyOiBhbnksIExpc3RlbmVyOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JpZ2h0VG91Y2gub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCBvd25lciwgTGlzdGVuZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldENvdW50VGltZShpbmZvOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgaWYgKGluZm8gPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fQ291bnREb3duVUkudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVQYW5lbCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fQ291bnREb3duVUkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZVBhbmVsID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLlNldENvdW50VGltZShpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBTaG93SXRlbSgpIHtcclxuICAgICAgICB0aGlzLlNob3dQbGF5ZXJJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5TaG93Q2hhcmFjdGVlckl0ZW0oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuueOqeWutumAieaLqemBk+WFt1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgU2hvd1BsYXllckl0ZW0oKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1OdW0gPSBHYW1lQWdlbnQuQWdlbnQuR2FtZUl0ZW1OdW07XHJcbiAgICAgICAgaWYgKGl0ZW1OdW0gPCAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9QbGF5ZXJJdGVtLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fUGxheWVySXRlbS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrop5LoibLpgZPlhbdcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIFNob3dDaGFyYWN0ZWVySXRlbSgpIHtcclxuICAgICAgICB2YXIgaXRlbU51bSA9IEdhbWVBZ2VudC5BZ2VudC5Ta2lsbEl0ZW1OdW07XHJcbiAgICAgICAgaWYgKGl0ZW1OdW0gPCAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9Ta2lsbEl0ZW0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9Ta2lsbEl0ZW0udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFNob3dJbnB1dEluZm8oaW5mbzogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dhbWVJbmZvLnRleHQgPSBpbmZvO1xyXG4gICAgfVxyXG4gICAgT3BlbigpIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UsIHRoaXMuU2hvd1BsYXllckl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VySXRlbUNoYW5nZSwgdGhpcy5TaG93UGxheWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChHYW1lTW9kdWxlLkV2ZW50Lk9uQ2hhcmFjdGVySXRlbUNoYW5nZSwgdGhpcy5TaG93Q2hhcmFjdGVlckl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuU2hvd0l0ZW0oKTtcclxuICAgIH1cclxuICAgIENsb3NlKCkge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VySXRlbU51bUNoYW5nZSwgdGhpcy5TaG93UGxheWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJJdGVtQ2hhbmdlLCB0aGlzLlNob3dQbGF5ZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KEdhbWVNb2R1bGUuRXZlbnQuT25DaGFyYWN0ZXJJdGVtQ2hhbmdlLCB0aGlzLlNob3dDaGFyYWN0ZWVySXRlbSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgLy/mmL7npLrph5HluIHkv6Hmga9cclxuICAgICAgICB0aGlzLl9TaG93R29sZE51bSgpO1xyXG4gICAgICAgIC8v5pi+56S66Led56a75L+h5oGvXHJcbiAgICAgICAgdGhpcy5fU2hvd0Rpc3RhbmNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdENsaWNrU2tpbGxJdGVtKG93bmVyOiBPYmplY3QsIGxpc3RlbmVyOiAocGFyYW06IGFueSkgPT4gYW55KSB7XHJcbiAgICAgICAgdmFyIGRlbGVnYXRlOiBNZXNzYWdlTUQuRGVsZWdhdGUgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5tX29uQ2xpY2tTa2lsbEl0ZW0gPSBkZWxlZ2F0ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBSZWdpc3RDbGlja1BsYXllckl0ZW0ob3duZXI6IE9iamVjdCwgbGlzdGVuZXI6IChwYXJhbTogYW55KSA9PiBhbnkpIHtcclxuICAgICAgICB2YXIgZGVsZWdhdGU6IE1lc3NhZ2VNRC5EZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fb25DTGlja1BsYXllckl0ZW0gPSBkZWxlZ2F0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2xpY2tTa2lsbEl0ZW0oKSB7XHJcbiAgICAgICAgdGhpcy5tX29uQ2xpY2tTa2lsbEl0ZW0uRXhlY3V0ZSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBPbkNsaWNrUGxheWVySXRlbSgpIHtcclxuICAgICAgICB0aGlzLm1fb25DTGlja1BsYXllckl0ZW0uRXhlY3V0ZSgpO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7UGxheWVyfSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQge0dhbWVBZ2VudH0gZnJvbSBcIi4vLi4vQWdlbnQvR2FtZUFnZW50XCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgSXRlbUVsZW1lbnQgZnJvbSBcIi4vLi4vc2NyaXB0L0l0ZW1FbGVtZW50XCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIlxyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4uL0dhbWUvR2FtZU1vZHVsZVwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbmltcG9ydCBJdGVtTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvSXRlbU1hbmFnZXJcIjtcclxuXHJcbmNsYXNzIEV4dGVuZHNJdGVtTGlzdFVJIGV4dGVuZHMgdWkuSXRlbUxpc3RVSVxyXG57XHJcbiAgICBwcml2YXRlIG1fSXRlbUxpc3Q6QXJyYXk8bnVtYmVyPlxyXG4gICAgQnRuTGlzdGVuZXI6TWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gW107XHJcbiAgICB9XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRvb2xJdGVtVUkgZXh0ZW5kcyB1aS50b29sSXRlbVVJXHJcbntcclxuICAgIHByaXZhdGUgbV9JdGVtTGlzdDpBcnJheTxudW1iZXI+XHJcbiAgICBCdG5MaXN0ZW5lcjpNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBbXTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwidG9vbEl0ZW1cIikpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtTGlzdFVJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiSXRlbUxpc3RVSVwiO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBVSTpFeHRlbmRzSXRlbUxpc3RVSTtcclxuICAgIHByaXZhdGUgbV9Hb2xkOnN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OkFycmF5PG51bWJlcj47XHJcblxyXG4gICAgcHVibGljIGFycmF5RGlzOkxheWEuU3ByaXRlW10gPSBbXTtcclxuICAgIHB1YmxpYyBjbnROdW0gPSA1O1xyXG4gICAgcHVibGljIHN0YXJ0YW8gPSAyNzA7XHJcbiAgICBwdWJsaWMgcGVyYW8gPSAzNjAgLyB0aGlzLmNudE51bTtcclxuICAgIHB1YmxpYyByID0gMjMwO1xyXG4gICAgcHVibGljIHN0YXJ0WSA9IDU3NTtcclxuICAgIHB1YmxpYyBzdGFydFggPSAzMDA7XHJcbiAgICBwdWJsaWMgY250U2VsZWN0SW5kZXggPSAwO1xyXG5cclxuICAgIHB1YmxpYyBjYW1lcmE6TGF5YS5DYW1lcmE7XHJcbiAgICBwdWJsaWMgY250c3RhcnRhbyA9IDkwO1xyXG4gICAgcHVibGljIG1vdmVTdGFyYW8gPSAyO1xyXG4gICAgcHVibGljIG5leHRBbyA9IC0xO1xyXG4gICAgcHVibGljIGluaXRTY2FsTnVtID0gMC4wMTg7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25maWcgPSB7XCJpbWdcIjpcclxuICAgICAgICBbICAgXHJcbiAgICAgICAgICAgIHtrZXk6XCJiZ1wiLHRleHR1cmVOYW1lOlwibWFpbmJnLmpwZ1wifVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJidG5cIjpcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIHtrZXk6XCJiYWNrQnRuXCIsdGV4dHVyZU5hbWU6XCJiYWNrLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImJ1eUJ0blwiLHRleHR1cmVOYW1lOlwiYnV5LnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImJhY2tCdG5cIix0ZXh0dXJlTmFtZTpcInN0YXJ0LnBuZ1wifVxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuVUkgPSBuZXcgRXh0ZW5kc0l0ZW1MaXN0VUkoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuVUkpO1xyXG4gICAgICAgIHRoaXMuVUkuQnRuTGlzdGVuZXIgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKHRoaXMsKCk9PnsgdGhpcy5fVUlNYW5hZ2VyLkNsb3NlKHRoaXMpfSlcclxuICAgICAgICB0aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlO1xyXG4gICAgICAgIC8vdGhpcy5VcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgLy90aGlzLm1fR29sZCA9IHRoaXMuVUkuX0dvbGQudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgdGhpcy5VSS5fQkcuYWxwaGEgPSAwO1xyXG4gICAgICAgIHRoaXMuVUkuX0JHLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcyx0aGlzLkNsb3NlVUkpO1xyXG4gICAgICAgIHRoaXMuVUkuYmFja0J0bi5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy5DbG9zZVVJKTtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkxheW91dCgpO1xyXG5cclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gMDsvL2NudFNlbGVjdEluZGV4O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgaSA9IDAgO2kgPCB0aGlzLmNudE51bTtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBhdWR0OlRvb2xJdGVtVUkgPSBuZXcgVG9vbEl0ZW1VSSgpO1xyXG4gICAgICAgICAgICBhdWR0LnRvb2xpY29uLmxvYWRJbWFnZShJdGVtTWFuYWdlci5NZ3IuR2V0SXRlbUljb24oaSkpO1xyXG4gICAgICAgICAgICBhdWR0LnRvb2xuYW1lLnRleHQgPSBJdGVtTWFuYWdlci5NZ3IuR2V0SXRlbUluZm8oaSkuUGFzc3Njb3JlO1xyXG4gICAgICAgICAgICAvLyBhdWR0LmxvYWRJbWFnZShJdGVtTWFuYWdlci5NZ3IuR2V0SXRlbUljb24oaSkpO1xyXG4gICAgICAgICAgICBhdWR0Lm5hbWUgPSBpICArIFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuYWRkQ2hpbGQoYXVkdCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlEaXMucHVzaChhdWR0KTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLnNlbGVjdFJvbGVQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSAodGhpcy5jbnRTZWxlY3RJbmRleCArIDUpICUgNTtcclxuICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSAodGhpcy5zdGFydGFvICsgKHRoaXMuY250TnVtIC0gdGhpcy5jbnRTZWxlY3RJbmRleCkgKiB0aGlzLnBlcmFvICsgMzYwKSAlIDM2MDtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUm9sZUluZm8odGhpcy5jbnRTZWxlY3RJbmRleCk7XHJcbiAgICAgICAgdGhpcy5VSS5idXlCdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5CdXlJdGVtKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGZTY2VuZVVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZlNjZW5lVUkoKSB7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5jb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuY29uZmlnW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uc2tpbiA9IChQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgICBzZWxlY3RSb2xlUG9zaXRpb24oZTpMYXlhLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGNudFRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcclxuICAgICAgICBpZih0aGlzLmNudFNlbGVjdEluZGV4ID09IHBhcnNlSW50KGUuY3VycmVudFRhcmdldC5uYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5VSS5iYWNrQnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlVJLmJ1eUJ0bi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5VSS5vd25lcnR4dC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5VSS5nb2xkaW1nLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlVJLnJvbGV1c2VOb25leS52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0SW5kZXgocGFyc2VJbnQoY250VGFyZ2V0Lm5hbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICBjYWxDbnRTdGFydGFvKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSAodGhpcy5jbnRTZWxlY3RJbmRleCArIDUpICUgNTtcclxuICAgICAgICB0aGlzLm5leHRBbyA9ICh0aGlzLnN0YXJ0YW8gKyAodGhpcy5jbnROdW0gLSB0aGlzLmNudFNlbGVjdEluZGV4KSAqIHRoaXMucGVyYW8gKyAzNjApICUgMzYwO1xyXG5cclxuICAgICAgICBpZigodGhpcy5uZXh0QW8gLSB0aGlzLmNudHN0YXJ0YW8gKyAzNjApICUgMzYwID49IDE4MCkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVTdGFyYW8gPSAtMlxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVTdGFyYW8gPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLnRpbWVyLmxvb3AoMC4wNSwgdGhpcywgdGhpcy50aW1lQW9DaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHRpbWVBb0NoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmNudHN0YXJ0YW8gPT0gdGhpcy5uZXh0QW8pIHtcclxuICAgICAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gdGhpcy5uZXh0QW87XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEFvID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9sZUluZm8odGhpcy5jbnRTZWxlY3RJbmRleCk7XHJcbiAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcywgdGhpcy50aW1lQW9DaGFuZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsYXNjbnRBbyA9IHRoaXMuY250c3RhcnRhbztcclxuICAgICAgICB0aGlzLmNudHN0YXJ0YW8gKz0gdGhpcy5tb3ZlU3RhcmFvO1xyXG4gICAgICAgIGlmKHRoaXMuY250c3RhcnRhbyA8IDAgfHwgdGhpcy5jbnRzdGFydGFvID09IDM2MCkge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSAodGhpcy5jbnRzdGFydGFvICsgMzYwKSAlIDM2MDtcclxuICAgICAgICAgICAgbGFzY250QW8gPSB0aGlzLmNudHN0YXJ0YW8gLSB0aGlzLm1vdmVTdGFyYW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9ICh0aGlzLmNudHN0YXJ0YW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZigobGFzY250QW8gPj0gdGhpcy5uZXh0QW8gJiYgdGhpcy5jbnRzdGFydGFvIDw9IHRoaXMubmV4dEFvKSB8fCAobGFzY250QW8gPD0gdGhpcy5uZXh0QW8gJiYgdGhpcy5jbnRzdGFydGFvID49IHRoaXMubmV4dEFvKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSB0aGlzLm5leHRBbztcclxuICAgICAgICAgICAgdGhpcy5uZXh0QW8gPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5uZXh0QW8gPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IHRoaXMuYXJyYXlEaXMubGVuZ3RoO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIGFvID0gKHRoaXMuY250c3RhcnRhbyArIGkgKiB0aGlzLnBlcmFvKSAlIDM2MFxyXG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuc3RhcnRYICsgdGhpcy5yICogTWF0aC5jb3MoYW8gKiAzLjE0IC8gMTgwKTtcclxuICAgICAgICAgICAgdmFyIHkgPSB0aGlzLnN0YXJ0WSArIHRoaXMuciAqIE1hdGguc2luKGFvICogMy4xNCAvIDE4MCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbaV0ueCA9IHg7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbaV0ueSA9IHk7XHJcbiAgICAgICAgICAgIHZhciBzY2FsZSA9ICh5IC0gdGhpcy5zdGFydFkpIC8gMiAvICh0aGlzLnIgLSB0aGlzLnN0YXJ0WSkgKiAwLjI7XHJcbiAgICAgICAgICAgIGlmKHNjYWxlID49IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbaV0uc2NhbGVYID0gdGhpcy5hcnJheURpc1tpXS5zY2FsZVkgPSAoMC44ICsgc2NhbGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLnNjYWxlWCA9IHRoaXMuYXJyYXlEaXNbaV0uc2NhbGVZID0gMC44O1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVSb2xlSW5mbyhpZCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGlmKHRoaXMuY2hlY2tJc0xvY2soaWQpKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX1VJLnN0YXJ0R2FtZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5fVUkuYnV5QnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5fVUkuZ29sZGltZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX1VJLnJvbGV1c2VOb25leS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5fVUkucm9sZXVzZU5vbmV5LnRleHQgPSBcIuW3suino+mUgVwiO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIFxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAgICAgdGhpcy5VSS5iYWNrQnRuLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlVJLmJ1eUJ0bi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5VSS5nb2xkaW1nLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlVJLnJvbGV1c2VOb25leS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5VSS5vd25lcnR4dC52aXNpYmxlID0gdHJ1ZTs7XHJcbiAgICAgICAgICAgIHRoaXMuVUkucm9sZXVzZU5vbmV5LnRleHQgPSBJdGVtTWFuYWdlci5NZ3IuR2V0UHJpY2UodGhpcy5jbnRTZWxlY3RJbmRleCkgKyBcIlwiO1xyXG4gICAgICAgIC8vfVxyXG4gICAgICAgIHZhciBvd25lck51bSA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5JdGVtTGlzdFt0aGlzLmNudFNlbGVjdEluZGV4XTtcclxuICAgICAgICBpZighb3duZXJOdW0pIHtcclxuICAgICAgICAgICAgb3duZXJOdW0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlVJLm93bmVydHh0LnRleHQgPSBcIuW3suaLpeaciTpcIiArIG93bmVyTnVtO1xyXG4gICAgICAgIHZhciBpdGVtSW5mbyA9IEl0ZW1NYW5hZ2VyLk1nci5HZXRJdGVtSW5mbyhpZCk7XHJcbiAgICAgICAgdGhpcy5VSS5yb2xlTmFtZS50ZXh0ID0gaXRlbUluZm8uUGFzc3Njb3JlO1xyXG4gICAgICAgIHRoaXMuVUkuZGVzYy50ZXh0ID0gaXRlbUluZm8uRGVzYztcclxuICAgICAgICB0aGlzLlVJLl9Hb2xkLnRleHQgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXkgKyBcIlwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGVhclJvYXRlVGltZXIoKTogdm9pZCB7XHJcbiAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGFzdFJvbGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCAtLTtcclxuICAgICAgICB0aGlzLmNhbENudFN0YXJ0YW8oKTtcclxuICAgIH0gICBcclxuXHJcbiAgICBuZXh0Um9sZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ICsrO1xyXG4gICAgICAgIHRoaXMuY2FsQ250U3RhcnRhbygpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGVjdEluZGV4KHNlbGVjdEluZGV4Om51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmKHNlbGVjdEluZGV4ID09IHRoaXMuY250U2VsZWN0SW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gc2VsZWN0SW5kZXg7XHJcbiAgICAgICAgdGhpcy5jYWxDbnRTdGFydGFvKCk7XHJcbiAgICB9IFxyXG5cclxuICAgIHB1YmxpYyBPcGVuKClcclxuICAgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLHRoaXMuU2hvd0dvbGQsdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25JdGVtTGlzdENoYW5nZSx0aGlzLlJlZnJlc2hMaXN0LHRoaXMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlRpbWVQYXVzZSgpO1xyXG4gICAgICAgIHRoaXMuU2hvd0dvbGQoKTtcclxuICAgICAgICB0aGlzLlVwZGF0ZUxpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlRpbWVDb250aW51ZSgpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsdGhpcy5TaG93R29sZCx0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlLHRoaXMuUmVmcmVzaExpc3QsdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZUxpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR2V0SXRlbUxpc3QoKTtcclxuICAgICAgICB0aGlzLlNldExpc3QodGhpcy5tX0l0ZW1MaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVmcmVzaExpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR2V0SXRlbUxpc3QoKTtcclxuICAgICAgICB0aGlzLkZyZXNoTGlzdCh0aGlzLm1fSXRlbUxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRJdGVtTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gR2FtZUFQUC5JdGVtTWdyLkdldFNlbGxJdGVtSURMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dHb2xkKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5TaG93aW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMubV9Hb2xkWzFdID1cIlwiICsgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5O1xyXG4gICAgICAgIHRoaXMuVUkuX0dvbGQudGV4dCA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leSArIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfUmVuZGVySGFuZGxlcihjZWxsOkxheWEuQm94LGluZGV4Om51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciByb2xlRWxlbWVudDpJdGVtRWxlbWVudCA9IGNlbGwgYXMgSXRlbUVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIGl0ZW1MaXN0OkFycmF5PG51bWJlcj4gPSBHYW1lQWdlbnQuQWdlbnQuSXRlbUxpc3Q7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuSW5pdCgpO1xyXG4gICAgICAgIHJvbGVFbGVtZW50Lkl0ZW1JZHggPSB0aGlzLm1fSXRlbUxpc3RbaW5kZXhdO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlZ2lzdEJ1eSh0aGlzLHRoaXMuQnV5SXRlbSk7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVnaXN0Q2hvb3NlKHRoaXMsdGhpcy5DaG9vc2VJdGVtKTtcclxuICAgICAgICByb2xlRWxlbWVudC5Jc0dyYXkgPSBpdGVtTGlzdFt0aGlzLm1fSXRlbUxpc3RbaW5kZXhdXT9mYWxzZTp0cnVlO1xyXG4gICAgICAgIHJvbGVFbGVtZW50Lk51bSA9IGl0ZW1MaXN0W3RoaXMubV9JdGVtTGlzdFtpbmRleF1dP2l0ZW1MaXN0W3RoaXMubV9JdGVtTGlzdFtpbmRleF1dOjA7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuQnRuTGFibGUgPSBcIlwiICsgR2FtZUFQUC5JdGVtTWdyLkdldFByaWNlKHRoaXMubV9JdGVtTGlzdFtpbmRleF0pICsgXCJcIjtcclxuICAgICAgICAvL3JvbGVFbGVtZW50LlNldEJ0bih0aGlzLkJ0bkxpc3RlbmVyLkxpc3RlbmVyLHRoaXMuQnRuTGlzdGVuZXIuQWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNldExpc3QobGlzdEFycmF5OkFycmF5PGFueT4pXHJcbiAgICB7XHJcbiAgICAgICAgLy92YXIgbGlzdEFycmF5OkFycmF5PGFueT4gPSB0aGlzLm1fSXRlbUxpc3Q7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5yZW5kZXJIYW5kbGVyID0gbmV3IExheWEuSGFuZGxlcih0aGlzLHRoaXMuX1JlbmRlckhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QuYXJyYXkgPSBsaXN0QXJyYXk7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0JhY2tUaW1lID0gMjAwOy8v6K6+572u5qmh55qu562L5Zue5by55pe26Ze044CC5Y2V5L2N5Li65q+r56eS44CCXHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0Rpc3RhbmNlID0gNTBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRnJlc2hMaXN0KGlkTGlzdClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LmFycmF5ID0gaWRMaXN0O1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpIHtcclxuICAgICAgICBzdXBlci5MYXlvdXQoKTtcclxuICAgICAgICBpZighdGhpcy5VSSB8fCAhdGhpcy5VSS5iZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVUkuYmcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuVUkuYmcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgQnV5SXRlbShpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkJ1eUl0ZW0odGhpcy5jbnRTZWxlY3RJbmRleCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENob29zZUl0ZW0oaWQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLlNob3dpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZihHYW1lQWdlbnQuQWdlbnQuSXRlbUxpc3RbaWRdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LkN1ckl0ZW0gPSBpZDtcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LkN1ckl0ZW0gPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIENsb3NlVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ2hvb3NlSXRlbSh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IFdlY2hhdE9wZW4gfSBmcm9tIFwiLi4vcGxhdGZvcm0vV2VjaGF0T3BlblwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kc1JhbmtQYW5lbFVJIGV4dGVuZHMgdWkuR2FtZVJhbmtVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVSYW5rXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e0FQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCl9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFua1BhbmVsVUkgZXh0ZW5kcyBCYXNlVUkge1xyXG4gICAgX1VJOiBFeHRlbmRzUmFua1BhbmVsVUk7XHJcbiAgICByYW5rVGV4dHVyZTogTGF5YS5UZXh0dXJlO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzUmFua1BhbmVsVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB0aGlzLl9VSS5jbG9zZUJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCAoKSA9PiB7IFxyXG4gICAgICAgICAgICBXZWNoYXRPcGVuLmdldEluc3RhbmNlcygpLmNsb3NlUmFuaygpO1xyXG4gICAgICAgICAgICB0aGlzLl9VSU1hbmFnZXIuQ2xvc2UodGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJSYW5rUGFuZWxVSVwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBPcGVuKClcclxuICAgIHtcclxuICAgICAgICBXZWNoYXRPcGVuLmdldEluc3RhbmNlcygpLm9wZW5SYW5rKCk7XHJcbiAgICB9XHJcblxyXG4gICAgU2F2ZVBhbmVsKCkge1xyXG4gICAgICAgIC8vIHRoaXMucmFua1RleHR1cmUuYml0bWFwLmFsd2F5c0NoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMucmFua1RleHR1cmUuZGlzcG9zZUJpdG1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlT1AoKSB7XHJcbiAgICAgICAgdGhpcy5TYXZlUGFuZWwoKTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG59XHJcbiIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmNsYXNzIEV4dGVuZHNTZXRQYW5lbFVJIGV4dGVuZHMgdWkuU2V0UGFuZWxVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e0FQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCl9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNTZXRQYW5lbFVJO1xyXG4gICAgc2VsZWN0ZWRJbmRleDpudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJtYWluYmcuanBnXCJ9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcIl9SZXR1cm5cIix0ZXh0dXJlTmFtZTpcImJhY2sucG5nXCJ9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU7IFxyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNTZXRQYW5lbFVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JldHVybi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCAoKSA9PiB7IHRoaXMuX1VJTWFuYWdlci5DbG9zZUN1clZpZXcoKTsgR3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpIH0pO1xyXG4gICAgICAgIHRoaXMuX1VJLnZvaWNlb3Blbi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLlZvaWNlT3Blbik7XHJcbiAgICAgICAgdGhpcy5fVUkudm9pY2VjbG9zZS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLlZvaWNlQ2xvc2UpOyBcclxuICAgICAgICB2YXIgaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2V0U2V0SW5mbygpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZm8uQXVkaW9PbiA/IDEgOiAwO1xyXG4gICAgICAgIHRoaXMuU2V0UGFuZWwoKTtcclxuICAgICAgICB0aGlzLkxheW91dCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTZXRQYW5lbFVJXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFZvaWNlT3BlbigpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAxO1xyXG4gICAgICAgIHRoaXMuU2V0UGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICBWb2ljZUNsb3NlKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5TZXRQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIFNldFBhbmVsKCkge1xyXG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRJbmRleCA9PSAxKSB7XHJcbiAgICAgICAgICAgICh0aGlzLl9VSS52b2ljZW9wZW4uZ2V0Q2hpbGRBdCgyKSBhcyBMYXlhLkltYWdlKS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgKHRoaXMuX1VJLnZvaWNlY2xvc2UuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkltYWdlKS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICh0aGlzLl9VSS52b2ljZW9wZW4uZ2V0Q2hpbGRBdCgyKSBhcyBMYXlhLkltYWdlKS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICh0aGlzLl9VSS52b2ljZWNsb3NlLmdldENoaWxkQXQoMSkgYXMgTGF5YS5JbWFnZSkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5fVUkuX09QU3dpdGNoLnNlbGVjdGVkSW5kZXggPSBpbmZvLk9QSXNSaWdodCA/IDEgOiAwO1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX1RleHQudGV4dCA9IGluZm8uVGV4dEluZm87XHJcbiAgICB9XHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICBpbmZvLkF1ZGlvT24gPSB0aGlzLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICAvL2luZm8uT1BJc1JpZ2h0ID0gdGhpcy5zZWxlY3RlZEluZGV4ID09IDE7XHJcbiAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2F2ZVNldEluZm8oaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIHN1cGVyLkxheW91dCgpO1xyXG4gICAgICAgIGlmKCF0aGlzLl9VSSB8fCAhdGhpcy5fVUkuYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5iZy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUkuYmcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2VPUCgpIHtcclxuICAgICAgICB0aGlzLlNhdmVQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi8uLi9VdGlsaXR5L1BhdGhcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZFVJU2NlbmUgZXh0ZW5kcyBMYXlhLlNjZW5lM0R7XHJcblxyXG4gICAgcHVibGljIGNhbWVyYTpMYXlhLkNhbWVyYTtcclxuICAgIHB1YmxpYyBpbml0U2NhbE51bSA9IDAuMDM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7IFxyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5hbWJpZW50Q29sb3IgPSBuZXcgTGF5YS5WZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gdGhpcy5hZGRDaGlsZChuZXcgTGF5YS5DYW1lcmEoMCwgMC4xLCAwLjYpKSBhcyBMYXlhLkNhbWVyYTtcclxuICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgMCwgMC42KSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKCAwLCAwLCAwKSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhcInVpL1Jlc291cmNlL3podXllbWlhbl9xaXUxX2lkbGUvemh1eWVtaWFuX3FpdTFfaWRsZS5saFwiKTtcclxuICAgICAgICAvL3ZhciBtb2RlbDE6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wNFwiKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIGF1ZHQ6TGF5YS5TcHJpdGUzRCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgYXVkdC50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjModGhpcy5pbml0U2NhbE51bSwgdGhpcy5pbml0U2NhbE51bSwgdGhpcy5pbml0U2NhbE51bSk7XHJcbiAgICAgICAgLy90aGlzLmFkZENoaWxkKG1vZGVsLmNsb25lKCkpO1xyXG4gICAgIH1cclxuXHJcbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi9CYXNlVUlcIlxyXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xyXG5pbXBvcnQgTG9hZFVJU2NlbmUgZnJvbSBcIi4vTG9hZFVJU2NlbmVcIlxyXG5tb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1Byb2dyZXNzOkxheWEuUHJvZ3Jlc3NCYXI7XHJcblx0XHRwdWJsaWMgX0d1aWRlcjpMYXlhLkltYWdlO1xyXG5cdFx0cHVibGljIF9FbnRlcjpMYXlhLkJ1dHRvbjtcclxuXHRcdHB1YmxpYyBFcnJvckluZm86TGF5YS5MYWJlbDtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTG9hZGluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEV4dExvYWRpbmdVSSBleHRlbmRzIHVpLkxvYWRpbmdVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBcIkxvYWRpbmdVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOnVpLkxvYWRpbmdVSTtcclxuICAgIF9DYWxsQmFjazooKT0+dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBuYW1lOnN0cmluZyApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgLy90aGlzLl9VSSA9bmV3IHVpLkxvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuX1VJID1uZXcgRXh0TG9hZGluZ1VJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSApO1xyXG4gICAgICAgIHRoaXMuVmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5fQ2FsbEJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLkxheW91dCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3IExvYWRVSVNjZW5lKCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB4Om51bWJlciA9IDA7XHJcbiAgICAgICAgeCArPSB0aGlzLl9VSS5fUHJvZ3Jlc3Mud2lkdGgqdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9HdWlkZXIucG9zKHgsdGhpcy5fVUkueSk7XHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLl9VSSB8fCAhdGhpcy5fVUlbXCJiZ1wiXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJW1wiYmdcIl0ud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX1VJW1wiYmdcIl0uaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFZhbHVlKG51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBDb21wbGV0ZShjYWxsQmFjazooKT0+dm9pZClcclxuICAgIHtcclxuXHJcbiAgICAgICAgLy9jYWxsQmFjaygpO1xyXG4gICAgICAgIHRoaXMuX0NhbGxCYWNrID0gY2FsbEJhY2s7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5sYWJlbCA9IFwiXCI7Ly90aGlzLl9OYW1lWzBdO1xyXG4gICAgfVxyXG4gICAgUmVsb2FkKHN0ciwgY2FsbEJhY2s6KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuRXJyb3JJbmZvLnRleHQgPSBzdHI7XHJcbiAgICAgICAgdGhpcy5fVUkuRXJyb3JJbmZvLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUkuRXJyb3JJbmZvLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xyXG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xyXG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbnZhciBSRUc6IEZ1bmN0aW9uID0gTGF5YS5DbGFzc1V0aWxzLnJlZ0NsYXNzO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgQkdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0VhcnRoOkxheWEuSW1hZ2U7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJCR1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5CR1VJXCIsQkdVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIGJnOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIGxheW91dGJnOkxheWEuQm94O1xuXHRcdHB1YmxpYyByb2xlTmFtZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBkZXNjOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGdvbGRpbWc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIHJvbGV1c2VOb25leTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBidXlCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIGNoYXJhY3RlcnJvbGUxYmc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIGNoYXJhY3RlcnJvbGU0Ymc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIGNoYXJhY3RlcnJvbGUyYmc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIGNoYXJhY3RlcnJvbGUzYmc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIGNoYXJhY3RlcnJvbGUwYmc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIHN0YXJ0R2FtZTpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0dvbGQ6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgYmFja0J0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0xpc3Q6TGF5YS5MaXN0O1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiQ2hhcmFjdGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkNoYXJhY3RlclVJXCIsQ2hhcmFjdGVyVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIEVuZEdhbWVVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgYmc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIGVuZGdhbWViZ2ljb246TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgZGliZzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBfU3RhcnRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9NZW51ZUJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1NldEJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BsYXllckxpc3RCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIGVuZGdhbWVoZW50aWFvOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBlbmRnYW1ldGl0bGU6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIGRpc3RhbmNlOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGdvbGQ6TGF5YS5MYWJlbDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVuZEdhbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuRW5kR2FtZVVJXCIsRW5kR2FtZVVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBFbnRlclVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgX1N0YXJ0OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUGFuZWw6TGF5YS5QYW5lbDtcblx0XHRwdWJsaWMgY29udGVudDpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgQnRuMTpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBCdG4yOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIEJ0bjQ6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgQnRuNTpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBfU2V0UGFuZWw6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9DaGFyYWN0ZXJMaXN0OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBhZHY6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SYW5rOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBsYXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBuZXh0QnRuOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiRW50ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuRW50ZXJVSVwiLEVudGVyVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0NvdW50RG93blVJOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfSXRlbUxpc3RCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9Db3VudFRpbWU6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX0dhbWVJbmZvOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lUGFuZWw6TGF5YS5Cb3g7XG5cdFx0cHVibGljIF9UeHREaXN0YW5jZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfVHh0R29sZDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfTGVmdFRvdWNoOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUmlnaHRUb3VjaDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1NraWxsSXRlbTpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BsYXllckl0ZW06TGF5YS5CdXR0b247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJHYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkdhbWVVSVwiLEdhbWVVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVJhbmtVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgY2xvc2VCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIGdhbWVSYW5rVWk6bGF5YS51aS5XWE9wZW5EYXRhVmlld2VyO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVJhbmtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuR2FtZVJhbmtVSVwiLEdhbWVSYW5rVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIEl0ZW1MaXN0VUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9CRzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgX0xpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBiYWNrQnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfR29sZDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyByb2xlTmFtZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBkZXNjOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGdvbGRpbWc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIHJvbGV1c2VOb25leTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBidXlCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIG93bmVydHh0OkxheWEuTGFiZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJJdGVtTGlzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5JdGVtTGlzdFVJXCIsSXRlbUxpc3RVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTGlzdFVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfUGxheWVyTGlzdDpMYXlhLkxpc3Q7XG5cdFx0cHVibGljIF9SZXR1cm5NYWluOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiUGxheWVyTGlzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5QbGF5ZXJMaXN0VUlcIixQbGF5ZXJMaXN0VUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIGJnOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIF9UZXh0OkxheWEuVGV4dEFyZWE7XG5cdFx0cHVibGljIF9SZXR1cm46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIHZvaWNlb3BlbjpMYXlhLkJveDtcblx0XHRwdWJsaWMgdm9pY2VjbG9zZTpMYXlhLkJveDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlNldFBhbmVsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLlNldFBhbmVsVUlcIixTZXRQYW5lbFVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyB0b29sSXRlbVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyB0b29saWNvbjpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgdG9vbG5hbWU6TGF5YS5MYWJlbDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcInRvb2xJdGVtXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnRvb2xJdGVtVUlcIix0b29sSXRlbVVJKTtcclxufVxyIl19
