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
},{"../controler/GameAPP":40,"./../Game/GameModule":22,"./../controler/APP":39,"./BaseAgent":1,"./PlayerEntity":3}],3:[function(require,module,exports){
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
},{"../platform/WechatOpen":42,"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10}],4:[function(require,module,exports){
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
},{"./../controler/GameAPP":40,"./BaseAgent":1}],5:[function(require,module,exports){
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
},{"./../FrameWork/BaseManager":8,"./../Scene/Scene":35}],12:[function(require,module,exports){
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
},{"../controler/APP":39,"./../Base/BaseEnum":5,"./../Utility/UIFunc":38,"./BaseManager":8}],14:[function(require,module,exports){
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
    GameConfig.startScene = "ItemList.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/ItemElement":43,"./script/RoleElement":44}],15:[function(require,module,exports){
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
},{"../Utility/Path":37,"./GameManager":16}],16:[function(require,module,exports){
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
},{"../Utility/Path":37}],17:[function(require,module,exports){
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
},{"./../Utility/Path":37,"./../controler/APP":39,"./../controler/GameControler":41}],19:[function(require,module,exports){
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
        Object.defineProperty(BasePlayerBuff.prototype, "Player", {
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
            this.Player.CompleteBuff(this.Slot);
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
            var player = this.Player;
            if (player.CurStep == null) {
                this.RemoveSelf();
            }
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - GameControler_1.default.GameControler.StepDistance / 2 * this.Floor;
            var flyCtrl = new PlayerCtrler_1.PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player);
            player.AddCtrler(flyCtrl);
            player.Fly();
            GameControler_1.default.GameControler.GameDir.GamePlay.AddInputCtrler(new Input_1.Input.DIYInput());
            GameControler_1.default.GameControler.GameDir.GamePlay.SetSafePS(this._FinalLocation);
            player.FlyPrepare();
        };
        FlyBuff.prototype.Removed = function () {
            var step = GameControler_1.default.GameControler.GameDir.GamePlay.GetStepByLocation(this._FinalLocation);
            this.Player.LayStep(step);
            this.Player.BaseCtrler.StartMove();
            this.Player.PopCtrler();
            GameControler_1.default.GameControler.GameDir.GamePlay.PopInputCtrler();
        };
        FlyBuff.prototype.Update = function () {
            if (this.Player == null) {
                return;
            }
            if (this._FinalZ - this.Player.Position.z > -0.2) {
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
            if (this.Player == null) {
                return;
            }
            if (this._FinalZ - this.Player.Position.z > -0.2) {
                this.RemoveSelf();
            }
        };
        RopeBuff.prototype.Start = function () {
            var player = this.Player;
            this._FinalLocation = player.CurStep.Location;
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - GameControler_1.default.GameControler.StepDistance / 2 * this.Floor;
            var flyCtrl = new PlayerCtrler_1.PlayerControler.PlayerFly(this.Speed);
            flyCtrl.SetPlayer(player);
            player.AddCtrler(flyCtrl);
            GameControler_1.default.GameControler.GameDir.GamePlay.AddInputCtrler(new Input_1.Input.DIYInput(this, this._Input));
            GameControler_1.default.GameControler.GameDir.GamePlay.SetSafePS(this._FinalLocation);
        };
        RopeBuff.prototype.Removed = function () {
            var step = GameControler_1.default.GameControler.GameDir.GamePlay.GetStepByLocation(this._FinalLocation);
            this.Player.LayStep(step);
            this.Player.BaseCtrler.StartMove();
            this.Player.PopCtrler();
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
            _this.m_Touched = false;
            return _this;
        }
        Vine.prototype.TouchItem = function (player) {
            if (this.m_Touched)
                return;
            this.AddBuffToPlayer(player, false);
            this.m_Touched = true;
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
            this.m_Touched = false;
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
},{"./../FrameWork/MessageCenter":10,"./../Game/AnimObj":18,"./../Utility/Path":37,"./../controler/APP":39,"./../controler/GameControler":41,"./GameStruct":23,"./Input":24,"./PlayerCtrler":27}],22:[function(require,module,exports){
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
    MountLine.prototype.Continue = function () {
    };
    MountLine.prototype.Pause = function () {
    };
    return MountLine;
}(Laya.Sprite3D));
exports.default = MountLine;
},{"./../controler/GameControler":41,"./Step":28}],26:[function(require,module,exports){
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
},{"../Utility/Path":37,"./../FrameWork/MessageCenter":10,"./../controler/APP":39,"./../controler/GameAPP":40,"./../controler/GameControler":41,"./Character":19,"./GameItem":21,"./PlayerCtrler":27}],27:[function(require,module,exports){
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
            player.Translate(new Laya.Vector3(0, GameControler_1.default.GameControler.StepLength, 0));
            player.transform.rotationEuler = new Laya.Vector3(0, 180, 0);
            player.ModelRotateEular(new Laya.Vector3(0, 180, 0));
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
        PlayerFly.prototype.OnComplete = function () { };
        PlayerFly.prototype.OnStart = function () { };
        return PlayerFly;
    }(BasePlayerCtrler));
    PlayerControler.PlayerFly = PlayerFly;
})(PlayerControler = exports.PlayerControler || (exports.PlayerControler = {}));
},{"./../controler/APP":39,"./../controler/GameControler":41}],28:[function(require,module,exports){
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
},{"./../Utility/Path":37,"./../controler/APP":39,"./GameItem":21,"./GameStruct":23}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadScene_1 = require("./Scene/LoadScene");
var APP_1 = require("./controler/APP");
var GameConfig_1 = require("./GameConfig");
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
        Laya.Stat.hide();
        var resCol = [{ url: "ui/Resource/localcomp.atlas", type: Laya.Loader.ATLAS }, { url: "ui/Resource/LoadUI.json", type: Laya.Loader.JSON }];
        Laya.loader.load(resCol, Laya.Handler.create(this, this.onLoaded));
    }
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
},{"./GameConfig":14,"./Scene/LoadScene":34,"./controler/APP":39}],30:[function(require,module,exports){
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
},{"../GameManager/CharacterMamager":15}],31:[function(require,module,exports){
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
},{"./../Utility/Path":37,"./Scene":35,"./ScenePlay/GameScenePlay":36}],32:[function(require,module,exports){
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
},{"./../Game/GameItem":21,"./../Scene/Scene":35,"./GameDirector":31}],33:[function(require,module,exports){
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
},{"../controler/APP":39,"./../Scene/Scene":35,"./../Utility/Path":37,"./../ui/EnterGameUI":49}],34:[function(require,module,exports){
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
},{"./../Scene/Scene":35,"./../Utility/Path":37,"./../controler/APP":39,"./../ui/BG":45,"./../ui/UnDownload/LoadingUI":54,"./GuiderManager":33}],35:[function(require,module,exports){
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
},{"../FrameWork/FrameWork":9,"./../Base/FSM":7,"./../FrameWork/MessageCenter":10,"./../controler/APP":39}],36:[function(require,module,exports){
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
    Object.defineProperty(GameScenePlay.prototype, "GameGold", {
        get: function () {
            return this.m_GoldNum;
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
        var playerModel = GameAPP_1.default.CharacterMgr.GetCharacterModel(gameAgent.CurCharacterID);
        player.SetPlayerModel(playerModel);
        APP_1.default.SceneManager.CurScene.PutObj(this.Player);
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
        this.m_GoldNum = 0;
        this._LogicGoldNum = 0;
        this.PanelUI = APP_1.default.UIManager.Show(GameUI_1.default);
        this.PanelUI.RegistClickPlayerItem(this, this.UsePlayerItem);
        this.PanelUI.RegistClickSkillItem(this, this.UseSkillItem);
        this.PanelUI.Gold = 0;
        this._CountTime = this.GameTime + 4;
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
        if (this._CountTime < APP_1.default.TimeManager.GameTime) {
            this._CountTime = APP_1.default.TimeManager.GameTime + 3;
            this._DestroyLine(this._BootomFloor);
            this._BootomFloor += 1;
        }
        this.InputCtrl.Update();
    };
    //开始倒计时期间的每帧逻辑
    GameScenePlay.prototype._StartCount = function () {
        var time = "";
        var countTime = this._CountTime - APP_1.default.TimeManager.GameTime;
        if (countTime > 0.9)
            time += Math.floor(countTime);
        else {
            this.PanelUI.GamePanel = true;
            this._GameUpdate = this._RunGameUpdate;
            this._CountTime = this.GameTime + 3;
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
        this._PutItemInLine(Headfloor);
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
},{"../../controler/GameAPP":40,"../../platform/WechatOpen":42,"./../../Agent/GameAgent":2,"./../../FrameWork/MessageCenter":10,"./../../Game/GameCamera":20,"./../../Game/GameItem":21,"./../../Game/GameStruct":23,"./../../Game/Input":24,"./../../Game/MountLine":25,"./../../Game/Player":26,"./../../Scene/Scene":35,"./../../controler/APP":39,"./../../controler/GameControler":41,"./../../ui/EndGameUI":48,"./../../ui/GameUI":50}],37:[function(require,module,exports){
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
},{}],38:[function(require,module,exports){
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
},{}],39:[function(require,module,exports){
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
},{"../Game/GameModule":22,"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10,"./../FrameWork/SceneManager":11,"./../FrameWork/TimeManager":12,"./../FrameWork/UIManager":13}],40:[function(require,module,exports){
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
},{"./../GameManager/CharacterMamager":15,"./../GameManager/ItemManager":17}],41:[function(require,module,exports){
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
},{"../Game/GameModule":22,"./../Agent/PlayerGuestAgent":4,"./../Game/GameStruct":23,"./../Scene/GameScene":32,"./../ui/CharacterUI":47,"./../ui/RankPanelUI":52,"./../ui/SetPanelUI":53,"./APP":39}],42:[function(require,module,exports){
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
},{}],43:[function(require,module,exports){
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
},{"./../FrameWork/MessageCenter":10}],44:[function(require,module,exports){
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
},{"./../controler/APP":39,"./../controler/GameControler":41}],45:[function(require,module,exports){
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
},{"./../Base/BaseFunc":6,"./../Utility/Path":37,"./layaMaxUI":55}],46:[function(require,module,exports){
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
},{"./../Base/BaseEnum":5,"./../FrameWork/FrameWork":9,"./../FrameWork/UIManager":13}],47:[function(require,module,exports){
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
},{"../GameManager/CharacterMamager":15,"../Scene/CharacterUIScene":30,"../controler/GameAPP":40,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Utility/Path":37,"./../controler/APP":39,"./../controler/GameControler":41,"./BaseUI":46,"./layaMaxUI":55}],48:[function(require,module,exports){
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
},{"../Agent/PlayerGuestAgent":4,"../Scene/GuiderManager":33,"../controler/GameControler":41,"./../Utility/Path":37,"./../controler/GameControler":41,"./BaseUI":46,"./layaMaxUI":55}],49:[function(require,module,exports){
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
        _this.Panel = _this._Panel;
        _this.Panel.vScrollBarSkin = "";
        _this.Panel.hScrollBarSkin = "";
        _this._Character.on(Laya.Event.CLICK, _this, _this.ShowCharacterPanel);
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
        Laya.Tween.to(this._logo, { alpha: 0.2 }, 100, Laya.Ease.sineIn);
    };
    return ExtendEnterGameUI;
}(layaMaxUI_1.ui.EnterUI));
var EnterGameUI = /** @class */ (function (_super) {
    __extends(EnterGameUI, _super);
    function EnterGameUI(name) {
        var _this = _super.call(this, name) || this;
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
        // var img = new Laya.Image();
        // img.loadImage("urere");
        // this.addChild(img);
        //this._UI._CharacterList.on(Laya.Event.CLICK,null,()=>{ uiMgr.Show<PlayerListUI>(PlayerListUI)});
        _this.Layout();
        _this.updateSelfSceneUI();
        return _this;
    }
    EnterGameUI.Name = function () {
        return "EnterGameUI";
    };
    EnterGameUI.prototype.updateSelfSceneUI = function () {
        for (var key in this.config) {
            var len = this.config[key].length;
            for (var i = 0; i < len; i++) {
                this._UI[this.config[key][i].key].skin = (PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
            }
        }
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
        this.y = 0;
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
},{"../Agent/PlayerGuestAgent":4,"./../Agent/GameAgent":2,"./../Utility/Path":37,"./../controler/GameControler":41,"./BaseUI":46,"./layaMaxUI":55}],50:[function(require,module,exports){
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
},{"../Agent/GameAgent":2,"../Game/GameModule":22,"./../Agent/PlayerEntity":3,"./../FrameWork/MessageCenter":10,"./../Utility/Path":37,"./../controler/APP":39,"./../controler/GameControler":41,"./BaseUI":46,"./ItemListUI":51,"./layaMaxUI":55}],51:[function(require,module,exports){
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
},{"../GameManager/ItemManager":17,"./../Agent/GameAgent":2,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Base/BaseEnum":5,"./../FrameWork/MessageCenter":10,"./../Utility/Path":37,"./../controler/APP":39,"./../controler/GameAPP":40,"./../controler/GameControler":41,"./BaseUI":46,"./layaMaxUI":55}],52:[function(require,module,exports){
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
},{"../platform/WechatOpen":42,"./../Base/BaseEnum":5,"./../Utility/Path":37,"./BaseUI":46,"./layaMaxUI":55}],53:[function(require,module,exports){
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
        // this._UI._Text.text = info.TextInfo;
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
},{"../Scene/GuiderManager":33,"./../Base/BaseEnum":5,"./../Game/GameStruct":23,"./../Utility/Path":37,"./../controler/GameControler":41,"./BaseUI":46,"./layaMaxUI":55}],54:[function(require,module,exports){
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
},{"./../BaseUI":46}],55:[function(require,module,exports){
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
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[29])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xheWEvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FnZW50L0Jhc2VBZ2VudC50cyIsInNyYy9BZ2VudC9HYW1lQWdlbnQudHMiLCJzcmMvQWdlbnQvUGxheWVyRW50aXR5LnRzIiwic3JjL0FnZW50L1BsYXllckd1ZXN0QWdlbnQudHMiLCJzcmMvQmFzZS9CYXNlRW51bS50cyIsInNyYy9CYXNlL0Jhc2VGdW5jLnRzIiwic3JjL0Jhc2UvRlNNLnRzIiwic3JjL0ZyYW1lV29yay9CYXNlTWFuYWdlci50cyIsInNyYy9GcmFtZVdvcmsvRnJhbWVXb3JrLnRzIiwic3JjL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyLnRzIiwic3JjL0ZyYW1lV29yay9TY2VuZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL1RpbWVNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9VSU1hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0dhbWVNYW5hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0l0ZW1NYW5hZ2VyLnRzIiwic3JjL0dhbWUvQW5pbU9iai50cyIsInNyYy9HYW1lL0NoYXJhY3Rlci50cyIsInNyYy9HYW1lL0dhbWVDYW1lcmEudHMiLCJzcmMvR2FtZS9HYW1lSXRlbS50cyIsInNyYy9HYW1lL0dhbWVNb2R1bGUudHMiLCJzcmMvR2FtZS9HYW1lU3RydWN0LnRzIiwic3JjL0dhbWUvSW5wdXQudHMiLCJzcmMvR2FtZS9Nb3VudExpbmUudHMiLCJzcmMvR2FtZS9QbGF5ZXIudHMiLCJzcmMvR2FtZS9QbGF5ZXJDdHJsZXIudHMiLCJzcmMvR2FtZS9TdGVwLnRzIiwic3JjL01haW4udHMiLCJzcmMvU2NlbmUvQ2hhcmFjdGVyVUlTY2VuZS50cyIsInNyYy9TY2VuZS9HYW1lRGlyZWN0b3IudHMiLCJzcmMvU2NlbmUvR2FtZVNjZW5lLnRzIiwic3JjL1NjZW5lL0d1aWRlck1hbmFnZXIudHMiLCJzcmMvU2NlbmUvTG9hZFNjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lUGxheS9HYW1lU2NlbmVQbGF5LnRzIiwic3JjL1V0aWxpdHkvUGF0aC50cyIsInNyYy9VdGlsaXR5L1VJRnVuYy50cyIsInNyYy9jb250cm9sZXIvQVBQLnRzIiwic3JjL2NvbnRyb2xlci9HYW1lQVBQLnRzIiwic3JjL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyLnRzIiwic3JjL3BsYXRmb3JtL1dlY2hhdE9wZW4udHMiLCJzcmMvc2NyaXB0L0l0ZW1FbGVtZW50LnRzIiwic3JjL3NjcmlwdC9Sb2xlRWxlbWVudC50cyIsInNyYy91aS9CRy50cyIsInNyYy91aS9CYXNlVUkudHMiLCJzcmMvdWkvQ2hhcmFjdGVyVUkudHMiLCJzcmMvdWkvRW5kR2FtZVVJLnRzIiwic3JjL3VpL0VudGVyR2FtZVVJLnRzIiwic3JjL3VpL0dhbWVVSS50cyIsInNyYy91aS9JdGVtTGlzdFVJLnRzIiwic3JjL3VpL1JhbmtQYW5lbFVJLnRzIiwic3JjL3VpL1NldFBhbmVsVUkudHMiLCJzcmMvdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBLDZDQUE4QztBQUM5QztJQUdJO1FBRUksSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7SUFDbEUsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7Ozs7O0FDUkQsK0NBQXVDO0FBQ3ZDLG1EQUFpRDtBQUVqRCwwQ0FBb0M7QUFDcEMsZ0RBQTJDO0FBQzNDLHlDQUFtQztBQUVuQztJQUErQiw2QkFB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QUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEgsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyx1QkFBYSxDQUFDLGFBQWEsRUFBRSx1QkFBYSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2xNLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEcsSUFBSSxDQUFDLEtBQUss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R3JDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVJBLEFBUUMsQ0FSK0IsSUFBSSxDQUFDLElBQUksR0FReEM7SUFSWSxhQUFVLGFBUXRCLENBQUE7QUFDTCxDQUFDLEVBOUlhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQThJZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgKiBhcyBQbGF5ZXJFbnRpdHkgZnJvbSBcIi4vUGxheWVyRW50aXR5XCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUFnZW50XHJcbntcclxuICAgIHByb3RlY3RlZCBtX1BsYXllckVudGl0eTpQbGF5ZXJFbnRpdHkuUGxheWVyLlBsYXllckVudGl0eTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5ID0gUGxheWVyRW50aXR5LlBsYXllci5QbGF5ZXJFbnRpdHkuRW50aXR5O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLy4uL0dhbWUvR2FtZU1vZHVsZVwiXHJcbmltcG9ydCB7IEdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4vLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVBUFBcIjtcclxuaW1wb3J0IEJhc2VBZ2VudCBmcm9tIFwiLi9CYXNlQWdlbnRcIlxyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVBZ2VudCBleHRlbmRzIEJhc2VBZ2VudCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfQWdlbnQ6IEdhbWVBZ2VudDtcclxuICAgIHN0YXRpYyBnZXQgQWdlbnQoKTogR2FtZUFnZW50IHtcclxuICAgICAgICBpZiAodGhpcy5fQWdlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9BZ2VudCA9IG5ldyBHYW1lQWdlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0FnZW50O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtX1VzZUl0ZW1OdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Ta2lsbEl0ZW1JRDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1NraWxsSXRlbU51bTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgQ3VyTGV2ZWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJMZXZlbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgQ3VyTGV2ZWwodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyTGV2ZWwgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VyTWF4TGV2ZWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEN1ckNoYXJhY3RlcklEKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEN1ckl0ZW0oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBJdGVtTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5JdGVtTGlzdFxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBDdXJJdGVtKGlkOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuSXRlbUxpc3RbaWRdKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtID0gaWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVJdGVtTnVtKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VySXRlbU51bSA8IHRoaXMubV9Vc2VJdGVtTnVtID8gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtTnVtIDogdGhpcy5tX1VzZUl0ZW1OdW07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IFNraWxsSXRlbU51bSgpOiBudW1iZXIgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1NraWxsSXRlbU51bTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRHb2xkKGdvbGQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghZ29sZCB8fCBnb2xkIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1vbmV5ID0gdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSArIGdvbGQ7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSA9IG1vbmV5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRTY29yZShzY29yZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCFzY29yZSB8fCBzY29yZSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzY29yZSA9IHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyU2NvcmUgKyBzY29yZTtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1clNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBDdXJTY29yZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1clNjb3JlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldEdhbWVJdGVtKCkge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKFBsYXllci5FdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UpO1xyXG4gICAgICAgIHRoaXMubV9Vc2VJdGVtTnVtID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVzZXRTa2lsbEl0ZW0oKSB7XHJcbiAgICAgICAgdmFyIENoYXJhY3RlcklEOiBudW1iZXIgPSB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgICAgIHRoaXMubV9Ta2lsbEl0ZW1OdW0gPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRTa2lsbEl0ZW0oQ2hhcmFjdGVySUQpIDwgMCA/IDAgOiAxO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKEdhbWVNb2R1bGUuRXZlbnQuT25DaGFyYWN0ZXJJdGVtQ2hhbmdlKTtcclxuICAgICAgICB0aGlzLm1fU2tpbGxJdGVtTnVtID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXNlR2FtZUl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuR2FtZUl0ZW1OdW0gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAtLXRoaXMubV9Vc2VJdGVtTnVtO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuUmVkdWNlSXRlbSh0aGlzLkN1ckl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVc2VTa2lsbEl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2tpbGxJdGVtTnVtIDwgMSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAtLXRoaXMubV9Ta2lsbEl0ZW1OdW07XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoR2FtZU1vZHVsZS5FdmVudC5PbkNoYXJhY3Rlckl0ZW1DaGFuZ2UpO1xyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCB7IFdlY2hhdE9wZW4gfSBmcm9tIFwiLi4vcGxhdGZvcm0vV2VjaGF0T3BlblwiO1xyXG5cclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXIge1xyXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50IHtcclxuICAgICAgICBzdGF0aWMgT25Nb25leUNoYW5nZTogc3RyaW5nID0gXCJPbk1vbmV5Q2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VyQ2hhcmFjdGVySURDaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJDaGFyYWN0ZXJJRENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkhpc3RvcnlNYXhMZXZlbENoYW5nZTogc3RyaW5nID0gXCJPbkhpc3RvcnlNYXhMZXZlbENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckxldmVsQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VyTGV2ZWxDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DaGFyYWN0ZXJMaXN0Q2hhbmdlOiBzdHJpbmcgPSBcIk9uQ2hhcmFjdGVyTGlzdENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckl0ZW1DaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJJdGVtQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uSXRlbUxpc3RDaGFuZ2U6IHN0cmluZyA9IFwiT25JdGVtTGlzdENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1clNjb3JlQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VyU2NvcmVDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJJdGVtTnVtQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VySXRlbU51bUNoYW5nZVwiXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckVudGl0eSB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgbV9FbnRpdHk6IFBsYXllckVudGl0eTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldCBFbnRpdHkoKTogUGxheWVyRW50aXR5IHtcclxuICAgICAgICAgICAgaWYgKCFQbGF5ZXJFbnRpdHkubV9FbnRpdHkpIHtcclxuICAgICAgICAgICAgICAgIFBsYXllckVudGl0eS5tX0VudGl0eSA9IG5ldyBQbGF5ZXJFbnRpdHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFBsYXllckVudGl0eS5tX0VudGl0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBtX0ZyYW1lV29yazogRnJhbWVXb3JrO1xyXG4gICAgICAgIHByaXZhdGUgbV9NZXNzYWdlTWdyOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgLy/pkrFcclxuICAgICAgICBwcml2YXRlIG1fTW9uZXk6IG51bWJlcjtcclxuICAgICAgICAvL+mAieS4reinkuiJsklEXHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1ckNoYXJhY3RlcklEOiBudW1iZXI7XHJcbiAgICAgICAgLy/njqnlrrblt7Lop6PplIHnmoTmnIDpq5jlhbPljaFcclxuICAgICAgICBwcml2YXRlIG1fSGlzdG9yeU1heExldmVsOiBudW1iZXI7XHJcbiAgICAgICAgLy/lvZPliY3pgInkuK3lhbPljaFcclxuICAgICAgICBwcml2YXRlIG1fQ3VyTGV2ZWw6IG51bWJlcjtcclxuICAgICAgICAvL+inkuiJsuWIl+ihqFxyXG4gICAgICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJMaXN0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8v5b2T5YmN5oul6YCJ5Lit6YGT5YW3XHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1ckl0ZW06IG51bWJlcjtcclxuICAgICAgICAvL+eJqeWTgeWIl+ihqFxyXG4gICAgICAgIHByaXZhdGUgbV9JdGVtTGlzdDogQXJyYXk8bnVtYmVyPjtcclxuICAgICAgICAvL+enr+WIhlxyXG4gICAgICAgIHByaXZhdGUgbV9DdXJTY29yZTogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE1vbmV5KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fTW9uZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgTW9uZXkodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdGhpcy5tX01vbmV5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX01vbmV5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25Nb25leUNoYW5nZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckNoYXJhY3RlcklEO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1ckNoYXJhY3RlcklEKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9DdXJDaGFyYWN0ZXJJRCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJDaGFyYWN0ZXJJRCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VyQ2hhcmFjdGVySURDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1ckxldmVsKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyTGV2ZWwgPyB0aGlzLm1fQ3VyTGV2ZWwgOiB0aGlzLm1fSGlzdG9yeU1heExldmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1ckxldmVsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMuQ3VyTGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyTGV2ZWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckxldmVsQ2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIaXN0b3J5TWF4TGV2ZWwoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgSGlzdG9yeU1heExldmVsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fSGlzdG9yeU1heExldmVsID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25IaXN0b3J5TWF4TGV2ZWxDaGFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2hhcmFjdGVyTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJJdGVtKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9DdXJJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1ckl0ZW0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckl0ZW1DaGFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VySXRlbSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VySXRlbU51bSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5HZXRJdGVtTnVtKHRoaXMuQ3VySXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXRlbUxpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSXRlbUxpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VyU2NvcmUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJTY29yZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJTY29yZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fQ3VyU2NvcmUgPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1clNjb3JlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkudXBkYXRlU2NvcmUodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VyU2NvcmVDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnRlcmVzdGluZ2xpZmUgPSAoTGF5YS5Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkludGVyZXN0aW5nbGlmZVwiKSAhPSBudWxsID8gSlNPTi5wYXJzZShMYXlhLkxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiSW50ZXJlc3RpbmdsaWZlXCIpKSA6IHt9KTtcclxuICAgICAgICAgICAgdGhpcy5tX01vbmV5ID0gaW50ZXJlc3RpbmdsaWZlLm1fTW9uZXkgfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckNoYXJhY3RlcklEID0gaW50ZXJlc3RpbmdsaWZlLm1fQ3VyQ2hhcmFjdGVySUR8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdCA9IGludGVyZXN0aW5nbGlmZS5tX0NoYXJhY3Rlckxpc3QgfHwgWzEsMCwwLDAsMF07XHJcbiAgICAgICAgICAgIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwgPSBpbnRlcmVzdGluZ2xpZmUubV9IaXN0b3J5TWF4TGV2ZWwgfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckl0ZW0gPSBpbnRlcmVzdGluZ2xpZmUubV9DdXJJdGVtIHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9GcmFtZVdvcmsgPSBGcmFtZVdvcmsuRk07XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gaW50ZXJlc3RpbmdsaWZlLm1fSXRlbUxpc3QgfHwgW107XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTY29yZSA9IGludGVyZXN0aW5nbGlmZS5tX0N1clNjb3JlIHx8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2F2ZURhdGFUb0xvY2FsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxEYXRhOmFueSA9IHt9O1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9Nb25leSA9IHRoaXMubV9Nb25leTtcclxuICAgICAgICAgICAgbG9jYWxEYXRhLm1fQ3VyQ2hhcmFjdGVySUQgPSB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0NoYXJhY3Rlckxpc3QgPSB0aGlzLm1fQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICAgICAgbG9jYWxEYXRhLm1fSGlzdG9yeU1heExldmVsID0gdGhpcy5tX0hpc3RvcnlNYXhMZXZlbDtcclxuICAgICAgICAgICAgbG9jYWxEYXRhLm1fQ3VySXRlbSA9IHRoaXMubV9DdXJJdGVtO1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9JdGVtTGlzdCA9IHRoaXMubV9JdGVtTGlzdDtcclxuICAgICAgICAgICAgbG9jYWxEYXRhLm1fQ3VyU2NvcmUgPSB0aGlzLm1fQ3VyU2NvcmU7XHJcbiAgICAgICAgICAgIExheWEuTG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJJbnRlcmVzdGluZ2xpZmVcIiwgbG9jYWxEYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIEFkZENoYXJhY3RlcihpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9DaGFyYWN0ZXJMaXN0W2lkXSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DaGFyYWN0ZXJMaXN0Q2hhbmdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBZGRJdGVtKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm1fSXRlbUxpc3RbaWRdKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fSXRlbUxpc3RbaWRdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK3RoaXMubV9JdGVtTGlzdFtpZF07XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25JdGVtTGlzdENoYW5nZSk7XHJcbiAgICAgICAgICAgIGlmIChpZCA9PSB0aGlzLkN1ckl0ZW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VySXRlbU51bUNoYW5nZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmVkdWNlSXRlbShpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5tX0l0ZW1MaXN0W2lkXSB8fCB0aGlzLm1fSXRlbUxpc3RbaWRdIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLS10aGlzLm1fSXRlbUxpc3RbaWRdO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UpO1xyXG4gICAgICAgICAgICBpZiAoaWQgPT0gdGhpcy5DdXJJdGVtKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEdldEl0ZW1OdW0oaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICB2YXIgbnVtOiBudW1iZXIgPSB0aGlzLm1fSXRlbUxpc3RbaWRdO1xyXG4gICAgICAgICAgICBudW0gPSBudW0gPyBudW0gOiAwO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgQmFzZUFnZW50IGZyb20gXCIuL0Jhc2VBZ2VudFwiXHJcbmltcG9ydCBHYW1lQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQVBQXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyR3Vlc3RBZ2VudCBleHRlbmRzIEJhc2VBZ2VudCB7XHJcbiAgICBzdGF0aWMgX0FnZW50OiBQbGF5ZXJHdWVzdEFnZW50O1xyXG4gICAgc3RhdGljIGdldCBHdWVzdEFnZW50KCk6IFBsYXllckd1ZXN0QWdlbnQge1xyXG4gICAgICAgIGlmICh0aGlzLl9BZ2VudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FnZW50ID0gbmV3IFBsYXllckd1ZXN0QWdlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0FnZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgU2tpbkRpcigpOlN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiZW50ZXJzY2VuZXVpL3JlczIvXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBNb25leSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkNoYXJhY3Rlckxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBJdGVtTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5JdGVtTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlDaGFyYWN0ZXIoaWQ6IG51bWJlcikgIHtcclxuICAgICAgICB2YXIgcHJpY2UgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRQcmljZShpZCk7XHJcbiAgICAgICAgaWYgKGlkIDwgMHx8IHByaWNlIDwwIHx8IHByaWNlID4gdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5IC09IHByaWNlO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQWRkQ2hhcmFjdGVyKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQnV5SXRlbShpZDogbnVtYmVyKSAge1xyXG4gICAgICAgIHZhciBwcmljZSA9IEdhbWVBUFAuSXRlbU1nci5HZXRQcmljZShpZCk7XHJcbiAgICAgICAgaWYoaWQgPCAwfHwgcHJpY2UgPDAgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwcmljZSA+IHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkgLT0gcHJpY2U7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5BZGRJdGVtKGlkKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0Q2hhcmFjdGVyKGlkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJMaXN0OkFycmF5PG51bWJlcj4gPSB0aGlzLkNoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgaWYoY2hhcmFjdGVyTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEID0gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBCYXNlRW51bSB7XHJcbiAgICBleHBvcnQgZW51bSBVSVR5cGVFbnVtIHtMb3csTWlkbGV9O1xyXG59IiwiaW1wb3J0IEJhc2VNZ3IgZnJvbSBcIi4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiO1xyXG4vKipcclxuICog5a6a5LmJ5Z+656GA57uT5p6E5L2TXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEJhc2VGdW5jIHtcclxuICAgIGVudW0gVUlUeXBlRW51bSB7IExvdywgTWlkbGUgfTtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXA8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Db3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX01hcDogeyBba2V5OiBzdHJpbmddOiBUIH07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX01hcCA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3JFYWNoKGNhbGxiYWNrOiAobWdyOiBULCBrZXk6IHN0cmluZykgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBtYXBLZXkgaW4gdGhpcy5fTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9NYXBbbWFwS2V5XSwgbWFwS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gb2JqIOaUvuWFpeWvueixoVxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0KG9iajogVCwga2V5OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9NYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2V0KGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDnp7vpmaTmn5DkuKrlr7nosaFcclxuICAgICAgICAgKiBAcmV0dXJucyDooqvnp7vpmaTlr7nosaFcclxuICAgICAgICAgKi9cclxuICAgICAgICBSZW1vdmUoa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICAgICAgdmFyIE9iajogVCA9IHRoaXMuX01hcFtrZXldO1xyXG4gICAgICAgICAgICBpZiAoT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm5oul5pyJXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgSGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9NYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm9kZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX1ZhbHVlOiBUO1xyXG4gICAgICAgIHByaXZhdGUgX05leHQ6IE5vZGU8VD47XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBWYWx1ZSgpOiBUIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgVmFsdWUodmFsdWU6IFQpIHtcclxuICAgICAgICAgICAgdGhpcy5fVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IE5leHQoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9OZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgTmV4dChub2RlOiBOb2RlPFQ+KSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9OZXh0ID0gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgTm9kZVBvb2w8VD5cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgX05vZGVMaXN0OiBOb2RlPFQ+O1xyXG4gICAgICAgIFB1bGxCYWNrKG5vZGU6IE5vZGU8VD4pIHtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9Ob2RlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QuTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Ob2RlTGlzdCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQXF1aXJlKCk6IE5vZGU8VD4ge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IHRoaXMuX05vZGVMaXN0O1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QgPSB0aGlzLl9Ob2RlTGlzdC5OZXh0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm9kZVF1ZXVlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfQ291bnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfSGVhZDogTm9kZTxUPlxyXG4gICAgICAgIHByaXZhdGUgX1RhaWxlXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUG9wTm9kZSgpOiBOb2RlPFQ+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0NvdW50IDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBub2RlOiBOb2RlPFQ+ID0gbnVsbDtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX0hlYWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWQgPSB0aGlzLl9IZWFkLk5leHQ7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIC0tdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5Yir5oqK5bC+5be05bim5Ye65Y675LqGXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaCh2YWx1ZTogVCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoTm9kZShub2RlOiBOb2RlPFQ+KSB7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9IZWFkID0gbm9kZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxlLk5leHQgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbm9kZTtcclxuICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIENsZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGVhZE5vZGUoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkhlYWROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEhlYWRWYWx1ZSgpOiBUIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0hlYWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9IZWFkLlZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGFpbE5vZGUoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRhaWxOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFRhaWxWYWx1ZSgpOiBUIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RhaWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fVGFpbGUudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFF1ZXVlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfTm9kZVBvb2w6IE5vZGVQb29sPFQ+O1xyXG4gICAgICAgIHByaXZhdGUgX05vZGVRdWV1ZTogTm9kZVF1ZXVlPFQ+O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5fTm9kZVBvb2wgPSBuZXcgTm9kZVBvb2w8VD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fTm9kZVF1ZXVlID0gbmV3IE5vZGVRdWV1ZTxUPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1c2godmFsdWU6IFQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6IE5vZGU8VD4gPSB0aGlzLl9Ob2RlUG9vbC5BcXVpcmUoKTtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUXVldWUuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUG9wKCk6IFQge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IHRoaXMuX05vZGVRdWV1ZS5Qb3BOb2RlKCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUG9vbC5QdWxsQmFjayhub2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX05vZGVRdWV1ZS5Db3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgU21vb3RoRGFtcFZlY3RvcjMge1xyXG4gICAgICAgIHByaXZhdGUgbV9DdXJyZW50VmVsb2NpdHk6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1fU21vb3RoVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9NYXhTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9NYXhNb3ZlTnVtOm51bWJlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzbW9vdGhUaW1lOiBudW1iZXIsIG1heFNwZWVkOiBudW1iZXIgPSAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VycmVudFZlbG9jaXR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX1Ntb290aFRpbWUgPSBzbW9vdGhUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWF4U3BlZWQgPSBtYXhTcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5tX01heE1vdmVOdW0gPSB0aGlzLm1fTWF4U3BlZWQgKiB0aGlzLm1fU21vb3RoVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFNtb290aERhbXAoY3VycmVudDpudW1iZXIsdGFyZ2V0Om51bWJlcixkZWx0YVRpbWU6bnVtYmVyID0gMS82MCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbnVtOm51bWJlciA9IDIvdGhpcy5tX1Ntb290aFRpbWU7XHJcbiAgICAgICAgICAgIHZhciBudW0yOm51bWJlciA9IG51bSAqIGRlbHRhVGltZTtcclxuICAgICAgICAgICAgdmFyIG51bTM6bnVtYmVyID0gMS8oMStudW0yKzAuNDgqbnVtMipudW0yKzAuMjM1Km51bTIqbnVtMipudW0yKTtcclxuICAgICAgICAgICAgdmFyIG51bTQ6bnVtYmVyID0gY3VycmVudCAtIHRhcmdldDtcclxuICAgICAgICAgICAgdmFyIG51bTU6bnVtYmVyID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB2YXIgbnVtNjpudW1iZXIgPSB0aGlzLm1fTWF4U3BlZWQgKiB0aGlzLm1fU21vb3RoVGltZTtcclxuICAgICAgICAgICAgbnVtNCA9IG51bTQgPi1udW02JiZudW00PG51bTY/bnVtNDoobnVtND5udW02P251bTY6LW51bTYpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBjdXJyZW50IC0gbnVtNDtcclxuICAgICAgICAgICAgdmFyIG51bTc6bnVtYmVyID0gKHRoaXMubV9DdXJyZW50VmVsb2NpdHkrbnVtKm51bTQpKmRlbHRhVGltZTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9ICh0aGlzLm1fQ3VycmVudFZlbG9jaXR5IC0gbnVtKm51bTcpKm51bTM7XHJcbiAgICAgICAgICAgIHZhciBudW04Om51bWJlciA9IHRhcmdldCArKG51bTQrbnVtNykqbnVtMztcclxuICAgICAgICAgICAgaWYobnVtNSAtIGN1cnJlbnQgPiAwID09IG51bTg+bnVtNSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbnVtOCA9IG51bTU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQ3VycmVudFZlbG9jaXR5ID0gKG51bTggLSBudW01KS9kZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bTg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgcHVibGljIENvdW50KGN1clBTOiBMYXlhLlZlY3RvcjMsIHRhcmdldFBTOiBMYXlhLlZlY3RvcjMsIGRlbHRhVGltZTogbnVtYmVyID0gMSAvIDYwKTpMYXlhLlZlY3RvcjMge1xyXG4gICAgICAgICAgICB2YXIgbWF4TW92ZTogbnVtYmVyID0gdGhpcy5tX01heE1vdmVOdW07XHJcbiAgICAgICAgICAgIHZhciBydW5UaW1lUmF0ZTogbnVtYmVyID0gMiAqIGRlbHRhVGltZSAvIHRoaXMubV9TbW9vdGhUaW1lO1xyXG4gICAgICAgICAgICB2YXIgdGltZVJhdGlvOiBudW1iZXIgPSAxIC8gKDEgKyBydW5UaW1lUmF0ZSArIDAuNDggKiBydW5UaW1lUmF0ZSAqIHJ1blRpbWVSYXRlICsgMC4yMzUgKiBydW5UaW1lUmF0ZSAqIHJ1blRpbWVSYXRlICogcnVuVGltZVJhdGUpO1xyXG4gICAgICAgICAgICB2YXIgZ2FwOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zdWJ0cmFjdCh0YXJnZXRQUywgY3VyUFMsIGdhcCk7XHJcbiAgICAgICAgICAgIHZhciBtb3ZlRGlyOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5ub3JtYWxpemUoZ2FwLCBtb3ZlRGlyKTtcclxuICAgICAgICAgICAgLy/pgJ/luqbkv67mraNcclxuICAgICAgICAgICAgdmFyIG1vdmVEaXN0YW5jZTogbnVtYmVyID0gTGF5YS5WZWN0b3IzLmRpc3RhbmNlKHRhcmdldFBTLCBjdXJQUyk7XHJcbiAgICAgICAgICAgIG1vdmVEaXN0YW5jZSA9IG1vdmVEaXN0YW5jZSA8IG1heE1vdmUgJiYgbW92ZURpc3RhbmNlID4gLW1heE1vdmUgPyBtb3ZlRGlzdGFuY2UgOiAobW92ZURpc3RhbmNlID4gbWF4TW92ZSA/IG1heE1vdmUgOiAtbWF4TW92ZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VyTW92ZURpc3RhY25lOm51bWJlciA9ICggdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSArIDIqKG1vdmVEaXN0YW5jZS90aGlzLm1fU21vb3RoVGltZSkpKmRlbHRhVGltZTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9ICh0aGlzLm1fQ3VycmVudFZlbG9jaXR5IC0gMipjdXJNb3ZlRGlzdGFjbmUvdGhpcy5tX1Ntb290aFRpbWUpKnRpbWVSYXRpbztcclxuICAgICAgICAgICAgdmFyIGVuZFBTOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IChtb3ZlRGlzdGFuY2UgKyBjdXJNb3ZlRGlzdGFjbmUpKnRpbWVSYXRpbztcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKG1vdmVEaXIsc2NhbGUsZW5kUFMpO1xyXG4gICAgICAgICAgICAvL0xheWEuVmVjdG9yMy5hZGQodGFyZ2V0UFMsZW5kUFMsZW5kUFMpXHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5hZGQoY3VyUFMsZW5kUFMsZW5kUFMpO1xyXG4gICAgICAgICAgICB2YXIgZW5kTW92ZURpcjpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zdWJ0cmFjdChjdXJQUyxlbmRQUyxlbmRNb3ZlRGlyKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIExheWEuVmVjdG9yMy5kb3QobW92ZURpcixlbmRNb3ZlRGlyKSA8IDAgKS8vTGF5YS5WZWN0b3IzLmRpc3RhbmNlKHRhcmdldFBTLGN1clBTKSAqIExheWEuVmVjdG9yMy5kaXN0YW5jZSh0YXJnZXRQUyxlbmRQUyk8MCApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVuZFBTID0gdGFyZ2V0UFM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQ3VycmVudFZlbG9jaXR5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZW5kUFM7XHJcbiAgICAgICAgICAgIC8vTGF5YS5WZWN0b3IzLnNjYWxlKG1vdmVEaXIsbW92ZURpc3RhbmNlLGVuZCk7XHJcbiAgICAgICAgICAgIC8vdGFyZ2V0UFMgKyBMYXlhLlZlY3RvcjMuYWRkKG1vdmVEaXN0YW5jZSxjdXJNb3ZlRGlzdGFjbmUsZW5kU3BlZWQpIChtb3ZlRGlzdGFuY2UgKyBjdXJNb3ZlRGlzdGFjbmUpO1xyXG4gICAgICAgIH0qL1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIExpbmtOb2RlTGlzdDxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJpdmF0ZSBfSGVhZE5vZGU6Tm9kZTxUPjtcclxuICAgICAgICAgICAgcHJpdmF0ZSBfVGFpbE5vZGU6Tm9kZTxUPjtcclxuICAgIFxyXG4gICAgICAgICAgICBwcml2YXRlIF9Db3VudE5vZGU6bnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSB0aGlzLl9IZWFkTm9kZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUgPSB0aGlzLl9IZWFkTm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6I635Y+W5aS057uT54K55YC8XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZ2V0IEhlYWRWYWx1ZSgpOlRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9IZWFkTm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQWRkKHZhbHVlOlQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlOk5vZGU8VD4gPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BZGROb2RlKG5ld05vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEFkZE5vZGUobmV3Tm9kZTpOb2RlPFQ+KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9UYWlsTm9kZSE9dGhpcy5fSGVhZE5vZGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUuTmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSovXHJcblxyXG59IiwiZXhwb3J0IG1vZHVsZSBGU00gXHJcbntcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUZTTVxyXG4gICAge1xyXG4gICAgICAgIFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZTTSA8VCBleHRlbmRzIFN0YXRlPiBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIG1fQ3VyU3RhdGU6VDtcclxuICAgICAgICBwcml2YXRlIG1fU3RhdGVEaWN0OntbbmFtZTpzdHJpbmddOlR9O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvciggc3RhcnRTdGF0ZTpUID0gbnVsbCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyU3RhdGUgPSBzdGFydFN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IEN1clN0YXRlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaUueWPmOeKtuaAgVxyXG4gICAgICAgICAqIEBwYXJhbSBzdGF0ZSDorr7nva7nirbmgIFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgQ2hhbmdlU3RhdGUoc3RhdGU6VClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXRlLlNldE93bmVyKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgY3VyU3RhdGU6VCA9IHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICAgICAgaWYoY3VyU3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1clN0YXRlLkVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1clN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgIGN1clN0YXRlLlN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTdGF0ZSA9IGN1clN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjdXJTdGF0ZSA9IHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICAgICAgaWYoY3VyU3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1clN0YXRlLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX293bmVyOklGU007XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Iob3duZXI6SUZTTSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fb3duZXIgPSBvd25lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTZXRPd25lcihvd25lcjpJRlNNKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX293bmVyID0gb3duZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlKCk7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IEVuZCgpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBTdGFydCgpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZU1nclxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlKCk7XHJcbn0iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtCYXNlRnVuY30gIGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmFtZVdvcmtcclxue1xyXG4gICAgX01nck1hcDpCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+Oy8vQmFzZVN0cnVjdC5NYXA8QmFzZU1hbmFnZXI+O1xyXG4gICAgX1RlbU1nckxpc3Q6QXJyYXk8QmFzZU1hbmFnZXI+O1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX01nck1hcCA9IG5ldyBCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRk06RnJhbWVXb3JrO1xyXG4gICAgc3RhdGljIGdldCBGTSgpOkZyYW1lV29ya1xyXG4gICAge1xyXG4gICAgICAgIGlmKEZyYW1lV29yay5fRk09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGcmFtZVdvcmsuX0ZNID0gbmV3IEZyYW1lV29yaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRnJhbWVXb3JrLl9GTTtcclxuICAgIH1cclxuICAgIC8vY29uc3RydWN0b3JcclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1wTWdyTGlzdCA9IG5ldyBBcnJheTxCYXNlTWFuYWdlcj4odGhpcy5fTWdyTWFwLkNvdW50KTtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAuZm9yRWFjaCggKG1ncjpCYXNlTWFuYWdlciAsIGtleTpzdHJpbmcpOnZvaWQgPT57XHJcbiAgICAgICAgICAgIHRlbXBNZ3JMaXN0LnB1c2gobWdyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRlbXBNZ3JMaXN0LmZvckVhY2goKG1ncixpZHgpPT57bWdyLlVwZGF0ZSgpO30pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRNYW5hZ2VyPFQgZXh0ZW5kcyBCYXNlTWFuYWdlcj4oIHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9ICk6VFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX01nck1hcC5IYXModHlwZS5OYW1lKCkpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX01nck1hcC5HZXQodHlwZS5OYW1lKCkpIGFzIFQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZXdNZ3I6VCA9IG5ldyB0eXBlKCk7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwLlNldChuZXdNZ3IsdHlwZS5OYW1lKCkpO1xyXG4gICAgICAgIHJldHVybiAgbmV3TWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgR2V0TWFuYWdlcjxUIGV4dGVuZHMgQmFzZU1hbmFnZXI+KHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9KTpUe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9NZ3JNYXAuR2V0KHR5cGUuTmFtZSgpKSBhcyBUO1xyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOa2iOaBr+aOp+WItuWZqFxyXG4gKi9cclxuaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmV4cG9ydCBtb2R1bGUgTWVzc2FnZU1EIHtcclxuICAgIGV4cG9ydCBjb25zdCBHYW1lRXZlbnQgPVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVyRGVhdGg6IFwiUGxheWVyRGVhdGhcIixcclxuICAgICAgICAgICAgR2FtZVRpbWVVcDogXCJHYW1lVGltZVVwXCIsXHJcbiAgICAgICAgICAgIEdhbWVDb250aW51ZTogXCJHYW1lQ29udGludWVcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWVzc2FnZUNlbnRlciBleHRlbmRzIEJhc2VNYW5hZ2VyICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTogc3RyaW5nICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIk1lc3NhZ2VDZW50ZXJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX01ncjogTWVzc2FnZUNlbnRlcjtcclxuICAgICAgICBwcml2YXRlIF9FdmVudERpY3Q6IHsgW0tleTogc3RyaW5nXTogTUV2ZW50IH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgX0dldEV2ZW50KG5hbWU6IHN0cmluZyk6IE1FdmVudCAge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQ6IE1FdmVudCA9IHRoaXMuX0V2ZW50RGljdFtuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50ID09IHVuZGVmaW5lZCB8fCBldmVudCA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgTUV2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9FdmVudERpY3RbbmFtZV0gPSBldmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBldmVudCA9IHRoaXMuX0V2ZW50RGljdFtuYW1lXTtcclxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0V2ZW50RGljdCA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAqIOazqOWGjFxyXG4gICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAqIEBwYXJhbSB7T2JqfSBvd25lciDmi6XmnInogIVcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJlZ2lzdChuYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiAoKSA9PiB2b2lkLCBvd25lcjogT2JqZWN0KTpNRXZlbnQgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG5ld0RsZ3Q6IERlbGVnYXRlID0gbmV3IERlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LkFkZChuZXdEbGd0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldEV2ZW50XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jplIDmn5DkuKrnm5HlkKxcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAgKiBAcGFyYW0ge09ian0gb3duZXIg5oul5pyJ6ICFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmVnaXN0KG5hbWU6IHN0cmluZywgbGlzdGVuZXI6ICgpID0+IHZvaWQsIG93bmVyOiBPYmplY3QpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LlJtdihsaXN0ZW5lciwgb3duZXIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jplIDmn5DkuKrkuovku7ZcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBEZXNSZ2lzdElESyhuYW1lOiBzdHJpbmcpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRmlyZShuYW1lOiBzdHJpbmcsIHBhcmFtOiBhbnkgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6IE1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5FeGVjdXRlKHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5aeU5omYXHJcbiAgICBleHBvcnQgY2xhc3MgRGVsZWdhdGUge1xyXG4gICAgICAgIExpc3RlbmVyOiBPYmplY3Q7XHJcbiAgICAgICAgQWN0aW9uOiAocGFyYW06YW55KSA9PiB2b2lkO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBFeGVjdXRlKHBhcmFtOiBhbnkgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGlvbi5jYWxsKHRoaXMuTGlzdGVuZXIsIHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IobGlzdGVuZXI6IE9iamVjdCwgYWN0aW9uOiAocGFyYW06YW55KSA9PiB2b2lkKSAge1xyXG4gICAgICAgICAgICB0aGlzLkxpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5LqL5Lu2XHJcbiAgICBleHBvcnQgY2xhc3MgTUV2ZW50IHtcclxuICAgICAgICBEZWxlZ2F0ZUxpc3Q6IEFycmF5PERlbGVnYXRlPjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDmt7vliqDlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7RGVsZWdhdGV9IGRsZyDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIEFkZChkbGc6IERlbGVnYXRlKSAge1xyXG4gICAgICAgICAgICB0aGlzLkRlbGVnYXRlTGlzdC5wdXNoKGRsZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jlhozmlrnms5VcclxuICAgICAgICAgKiBAcGFyYW0gbGlzdGVuZXIg55uR5ZCs5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIG93bmVyIOaLpeacieiAhVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEFkZEZ1bmMobGlzdGVuZXI6KHBhcmFtOmFueSk9PmFueSxvd25lcjpvYmplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZGxnOkRlbGVnYXRlID0gbmV3IERlbGVnYXRlKG93bmVyLGxpc3RlbmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDnp7vpmaTlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvbiDmtojmga/lkI3lrZdcclxuICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lciDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJtdihhY3Rpb246ICgpID0+IHZvaWQsIGxpc3RlbmVyOiBPYmplY3QgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB2YXIgZGxndExpc3Q6IEFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhcnJJZHg6IG51bWJlciA9IGRsZ3RMaXN0Lmxlbmd0aCAtIDE7IGFycklkeCA+IC0xOyAtLWFycklkeCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gZGxndC5BY3Rpb24gJiYgbGlzdGVuZXIgPT0gZGxndC5MaXN0ZW5lcikgIHtcclxuICAgICAgICAgICAgICAgICAgICBkbGd0TGlzdC5zcGxpY2UoYXJySWR4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldCgpICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0ID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDop6blj5FcclxuICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIEV4ZWN1dGUocGFyYW06IGFueSkgIHtcclxuICAgICAgICAgICAgdmFyIGRsZ3RMaXN0OiBBcnJheTxEZWxlZ2F0ZT4gPSB0aGlzLkRlbGVnYXRlTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgYXJySWR4OiBudW1iZXIgPSBkbGd0TGlzdC5sZW5ndGggLSAxOyBhcnJJZHggPiAtMTsgLS1hcnJJZHgpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGxndCA9IGRsZ3RMaXN0W2FycklkeF07XHJcbiAgICAgICAgICAgICAgICBkbGd0LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEJhc2VTY2VuZSBmcm9tIFwiLi8uLi9TY2VuZS9CYXNlU2NlbmVcIlxyXG5pbXBvcnQgQmFzZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0Jhc2VEaXJlY3RvclwiXHJcbmltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIlxyXG5pbXBvcnQge0ZTTX0gZnJvbSBcIi4vLi4vQmFzZS9GU01cIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIG1fU2NlbmVGU006IFNjZW5lLlNjZW5lRlNNO1xyXG4gICAgcHJpdmF0ZSBtX1NjZW5lTm9kZTogTGF5YS5Ob2RlO1xyXG4gICAgXHJcbiAgICBnZXQgQ3VyU2NlbmUoKTpTY2VuZS5CYXNlU2NlbmUge1xyXG4gICAgICAgIGlmKHRoaXMubV9TY2VuZUZTTS5DdXJTdGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9TY2VuZUZTTS5DdXJTdGF0ZTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldCBDdXJEaXIoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTY2VuZS5EaXJlY3RvcjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2NlbmVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9CR0xheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLl9CR0xheWVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5tX1NjZW5lRlNNID0gbmV3IFNjZW5lLlNjZW5lRlNNKCk7XHJcbiAgICAgICAgdGhpcy5tX1NjZW5lTm9kZSA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU3ByaXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDaGFuZ2VTY2VuZShuZXdTY2VuZTogU2NlbmUuQmFzZVNjZW5lKSAge1xyXG4gICAgICAgIHRoaXMubV9TY2VuZUZTTS5DaGFuZ2VTdGF0ZShuZXdTY2VuZSk7XHJcbiAgICAgICAgaWYobmV3U2NlbmUuU2NlbmVPYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fU2NlbmVOb2RlLmFkZENoaWxkKG5ld1NjZW5lLlNjZW5lT2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ml6fpgLvovpFcclxuICAgIHByaXZhdGUgX0JHOiBMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX0JHTGF5ZXI6IExheWEuU3ByaXRlO1xyXG4gICAgXHJcbiAgICBzZXQgQkcoYmc6IExheWEuU3ByaXRlKSB7XHJcbiAgICAgICAgaWYgKCFiZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9CRykge1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5yZW1vdmVTZWxmO1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgdGhpcy5fQkcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0JHLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIuYWRkQ2hpbGQodGhpcy5fQkcpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEJHKCk6TGF5YS5TcHJpdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX0JHO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKirkvZzogIVNb1xyXG4qIOWcuuaZr+WKn+iDvVxyXG4qL1xyXG4vKlxyXG4vL+WcuuaZr+euoeeQhlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIF9CRzogTGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9CR0xheWVyOiBMYXlhLlNwcml0ZTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllciA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fQkdMYXllcik7XHJcbiAgICAgICAgLy/mt7vliqDlnLrmma/nrqHnkIZcclxuICAgICAgICB0aGlzLlNjZW5lTm9kZSA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU3ByaXRlKCkpO1xyXG4gICAgfVxyXG4gICAgc2V0IEJHKGJnOiBMYXlhLlNwcml0ZSkge1xyXG4gICAgICAgIGlmICghYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQkcpIHtcclxuICAgICAgICAgICAgdGhpcy5fQkcucmVtb3ZlU2VsZjtcclxuICAgICAgICAgICAgdGhpcy5fQkcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIHRoaXMuX0JHLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9CRy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyLmFkZENoaWxkKHRoaXMuX0JHKTtcclxuICAgIH1cclxuICAgIGdldCBCRygpOkxheWEuU3ByaXRlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9CRztcclxuICAgIH1cclxuICAgIFNjZW5lTm9kZTogTGF5YS5Ob2RlO1xyXG5cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2NlbmVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfQ3VyU2NlbmU6IEJhc2VTY2VuZTtcclxuICAgIGdldCBDdXJTY2VuZSgpOiBCYXNlU2NlbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZTtcclxuICAgIH1cclxuICAgIHNldCBDdXJTY2VuZSh2YWx1ZTogQmFzZVNjZW5lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N1clNjZW5lICYmIHRoaXMuX0N1clNjZW5lLlNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0N1clNjZW5lLlNjZW5lLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQ3VyU2NlbmUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5fQ3VyU2NlbmUgJiYgdGhpcy5fQ3VyU2NlbmUuU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5TY2VuZU5vZGUuYWRkQ2hpbGQodGhpcy5fQ3VyU2NlbmUuU2NlbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBDdXJEaXIoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU2NlbmUuQ3VyRGlyO1xyXG4gICAgfVxyXG5cclxuICAgIEVudGVyU2NlbmUodGFyZ2V0U2NlbmU6IEJhc2VTY2VuZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUgPSB0YXJnZXRTY2VuZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuTGVhdmUodGFyZ2V0U2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4qLyIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLi9jb250cm9sZXIvQVBQXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXIge1xyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJUaW1lTWFuYWdlclwiO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtX1N0YXJ0VGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0dhbWVUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fUGF1c2luZ1RpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9QYXVzZVRpbWU6IG51bWJlclxyXG5cclxuICAgIHB1YmxpYyBnZXQgU3RhcnRUaW1lcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fU3RhcnRUaW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBHYW1lVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoTGF5YS50aW1lci5jdXJyVGltZXIgLSB0aGlzLm1fU3RhcnRUaW1lIC10aGlzLm1fUGF1c2VUaW1lIC0gdGhpcy5QYXVzaW5nVGltZSkgLyAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1N0YXJ0VGltZSA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgIHRoaXMubV9HYW1lVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tX1BhdXNlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tX1BhdXNpbmdUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYXVzZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5tX1BhdXNpbmdUaW1lIDw9IDApXHJcbiAgICAgICAgICAgIHRoaXMubV9QYXVzaW5nVGltZSA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBQYXVzaW5nVGltZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGF1c2luZ1RpbWUgPiAwID8gKExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5tX1BhdXNpbmdUaW1lICkgOiAwO1xyXG4gICAgfVxyXG4gICAgcHVibGljIENvbnRpbnVlKCkge1xyXG4gICAgICAgIHRoaXMubV9QYXVzZVRpbWUgKz0gdGhpcy5QYXVzaW5nVGltZTtcclxuICAgICAgICB0aGlzLm1fUGF1c2luZ1RpbWUgPSAwO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL3VpL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IFVJRnVuYyB9IGZyb20gXCIuLy4uL1V0aWxpdHkvVUlGdW5jXCJcclxuaW1wb3J0IHsgQmFzZUZ1bmMgfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0FQUFwiO1xyXG5lbnVtIE5vZGVUeXBlIHtcclxuICAgIEJvdHRvbSxcclxuICAgIE1pZGRsZSxcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBzdGF0aWMgZ19VSVdpZHRoID0gNzUwO1xyXG4gICAgc3RhdGljIGdfVUlIZWlnaHQgPSAxMzM0O1xyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIHByaXZhdGUgbV9Sb290Tm9kZTogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIG1fQm90dG9tTm9kZTogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIG1fTWlkbGVOb2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgX1VJRGljdDogeyBbbmFtZTogc3RyaW5nXTogQmFzZVVJIH07XHJcbiAgICBwcml2YXRlIF9VcGRhdGVDb3VudDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1VwZGF0ZVRpbWU6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgQWRkTm9kZShub2RlOiBOb2RlVHlwZSk6IHZvaWQgIHtcclxuICAgICAgICB2YXIgbm9kZUJveDogTGF5YS5Cb3ggPSBuZXcgTGF5YS5Cb3goKTtcclxuICAgICAgICBub2RlQm94LnRvcCA9IDA7XHJcbiAgICAgICAgbm9kZUJveC5ib3R0b20gPSAwO1xyXG4gICAgICAgIG5vZGVCb3gubGVmdCA9IDA7XHJcbiAgICAgICAgbm9kZUJveC5yaWdodCA9IDA7XHJcbiAgICAgICAgc3dpdGNoIChub2RlKSAge1xyXG4gICAgICAgICAgICBjYXNlIE5vZGVUeXBlLkJvdHRvbTpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9Cb3R0b21Ob2RlID0gbm9kZUJveDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01pZGxlTm9kZSA9IG5vZGVCb3g7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX1Jvb3ROb2RlLmFkZENoaWxkKG5vZGVCb3gpO1xyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5hZGRDaGlsZChub2RlQm94KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nICB7XHJcbiAgICAgICAgcmV0dXJuIFwiVUlNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHJvb3RCb3ggPSBuZXcgTGF5YS5Cb3goKTtcclxuICAgICAgICByb290Qm94LndpZHRoID0gVUlNYW5hZ2VyLmdfVUlXaWR0aDtcclxuICAgICAgICByb290Qm94LmhlaWdodCA9IFVJTWFuYWdlci5nX1VJSGVpZ2h0O1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQocm9vdEJveCk7XHJcbiAgICAgICAgdGhpcy5tX1Jvb3ROb2RlID0gcm9vdEJveDtcclxuICAgICAgICB0aGlzLm9uU2l6ZUNoYW5nZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5tX1Jvb3ROb2RlKTtcclxuICAgICAgICB0aGlzLm1fVXBkYXRlVGltZSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuQWRkTm9kZShOb2RlVHlwZS5Cb3R0b20pO1xyXG4gICAgICAgIHRoaXMuQWRkTm9kZShOb2RlVHlwZS5NaWRkbGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1VJRGljdCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX1VwZGF0ZUNvdW50ID0gMDtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuUkVTSVpFLCB0aGlzLCB0aGlzLm9uU2l6ZUNoYW5nZSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25TaXplQ2hhbmdlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgcm9vdEJveCA9IHRoaXMubV9Sb290Tm9kZTtcclxuICAgICAgICBVSUZ1bmMuRml4VUkocm9vdEJveCxVSU1hbmFnZXIuZ19VSVdpZHRoKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBzY2FsZSA9IFVJRnVuYy5Db3VudFNjYWxlRml4KFVJTWFuYWdlci5nX1VJV2lkdGgpO1xyXG4gICAgICAgIHZhciByb290Qm94ID0gdGhpcy5tX1Jvb3ROb2RlO1xyXG4gICAgICAgIHJvb3RCb3guc2NhbGVYID0gc2NhbGU7XHJcbiAgICAgICAgcm9vdEJveC5zY2FsZVkgPSBzY2FsZTtcclxuICAgICAgICByb290Qm94LmhlaWdodCA9IFVJTWFuYWdlci5nX1VJSGVpZ2h0ICogc2NhbGU7XHJcbiAgICAgICAgcm9vdEJveC53aWR0aCA9IFVJTWFuYWdlci5nX1VJV2lkdGg7Ki9cclxuICAgICAgICBpZighdGhpcy5tX0JvdHRvbU5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbnVtQ2hpbGQgPSB0aGlzLm1fQm90dG9tTm9kZS5udW1DaGlsZHJlbjtcclxuICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBudW1DaGlsZDtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5tX0JvdHRvbU5vZGUuZ2V0Q2hpbGRBdChpKTtcclxuICAgICAgICAgICAgaWYobm9kZSAmJiBub2RlW1wiTGF5b3V0XCJdKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlW1wiTGF5b3V0XCJdKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG51bUNoaWxkID0gdGhpcy5tX0JvdHRvbU5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbnVtQ2hpbGQ7aSArKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlLmdldENoaWxkQXQoaSk7XHJcbiAgICAgICAgICAgIGlmKG5vZGUgJiYgbm9kZVtcIkxheW91dFwiXSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZVtcIkxheW91dFwiXSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0gICAgXHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lrprluKfliLfmlrBVSVxyXG4gICAgICAgIGlmICh0aGlzLm1fVXBkYXRlVGltZSA8ICBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUpICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkodGhpcy5tX0JvdHRvbU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVVJKHRoaXMubV9NaWRsZU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9VcGRhdGVUaW1lID0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lICsgMC4zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlVUkobm9kZTogTGF5YS5TcHJpdGUpICB7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4OiBudW1iZXIgPSAwOyBpZHggPCBub2RlLm51bUNoaWxkcmVuOyArK2lkeCkgIHtcclxuICAgICAgICAgICAgdmFyIHVpOiBCYXNlVUkgPSBub2RlLmdldENoaWxkQXQoaWR4KSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIHVpLlVJVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgQWRkVUkoKSAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBTaG93PFQgZXh0ZW5kcyBCYXNlVUk+KHVpQ2xhc3M6IHsgbmV3KG5hbWU6IHN0cmluZyk6IFQ7IE5hbWUoKTogc3RyaW5nIH0pOiBUICB7XHJcbiAgICAgICAgdmFyIHN0cjogc3RyaW5nID0gdWlDbGFzcy5OYW1lKCk7XHJcbiAgICAgICAgdmFyIG5ld1VJOiBCYXNlVUkgPSB0aGlzLkdldFVJQnlOYW1lKHN0cik7XHJcbiAgICAgICAgbmV3VUkgPSBuZXdVSSA9PSBudWxsID8gdGhpcy5BZGRVSUJ5TmFtZShzdHIsIG5ldyB1aUNsYXNzKHN0cikpIDogbmV3VUk7XHJcbiAgICAgICAgdmFyIG5vZGU6IExheWEuU3ByaXRlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKG5ld1VJLlVJVHlwZSkgIHtcclxuICAgICAgICAgICAgLy/kuK3lsYLmrKFVSVxyXG4gICAgICAgICAgICBjYXNlIEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX01pZGxlTm9kZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1fTWlkbGVOb2RlLm51bUNoaWxkcmVuIDw9IDApICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pgJrnn6Xlr7zmvJTmmoLlgZzmuLjmiI9cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLlRpbWVVcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8v6buY6K6kVWnlhajmmK/kvY7lsYLmrKFVSVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2hpbGROdW06IG51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgLy/miorkupLmlqXnmoTnqpflj6PlhbPmjolcclxuICAgICAgICBpZiAobmV3VUkuSXNNdXRleCAmJiBjaGlsZE51bSA+IDApICB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VUkgPSBub2RlLmdldENoaWxkQXQobm9kZS5udW1DaGlsZHJlbiAtIDEpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgaWYgKCFsYXN0VUkuSXNNdXRleClcclxuICAgICAgICAgICAgICAgIGxhc3RVSS5IaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlLmFkZENoaWxkKG5ld1VJKTtcclxuICAgICAgICBuZXdVSS5PcGVuT1AoKTtcclxuICAgICAgICBpZiAobmV3VUkuVUlUeXBlID09IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGUgJiYgbm9kZS5udW1DaGlsZHJlbiA+IDApIHtcclxuICAgICAgICAgICAgbm9kZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAobmV3VUkgYXMgVCk7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2UodWk6IEJhc2VVSSkgIHtcclxuICAgICAgICB1aS5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgdWkuQ2xvc2VPUCgpO1xyXG4gICAgICAgIHZhciBub2RlOiBMYXlhLlNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoICh1aS5VSVR5cGUpICB7XHJcbiAgICAgICAgICAgIC8v5Lit5bGC5qyhVUlcclxuICAgICAgICAgICAgY2FzZSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlOlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9NaWRsZU5vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubnVtQ2hpbGRyZW4gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAvLyB0aGlzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lhbPpl63nqpflj6Mg6YCa55+l5ri45oiP57un57utXHJcbiAgICAgICAgICAgICAgICAgICAgLy9BUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkN1ckRpci5Db250aW51ZVRpbWUoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8v6buY6K6kVWnlhajmmK/kvY7lsYLmrKFVSVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2hpbGROdW06IG51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgaWYgKGNoaWxkTnVtID4gMCkgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSTogQmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGNoaWxkTnVtIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICBsYXN0VUkuT3Blbk9QKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIENsb3NlQ3VyVmlldygpICB7XHJcbiAgICAgICAgdmFyIHVpOiBCYXNlVUkgPSB0aGlzLm1fQm90dG9tTm9kZS5nZXRDaGlsZEF0KHRoaXMubV9Cb3R0b21Ob2RlLm51bUNoaWxkcmVuIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UodWkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yig6Zmk5omA5pyJ6IqC54K55LiK55qEVUlcclxuICAgIENsZWFyKCkgIHtcclxuICAgICAgICB2YXIgdWlOb2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VVSTogQmFzZVVJID0gdWlOb2RlLmdldENoaWxkQXQoMCkgYXMgQmFzZVVJOy8vLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlOb2RlID0gdGhpcy5tX01pZGxlTm9kZVxyXG4gICAgICAgIHdoaWxlICh1aU5vZGUubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEdldFVJQnlOYW1lKG5hbWU6IHN0cmluZyk6IEJhc2VVSSAge1xyXG4gICAgICAgIHZhciB1aSA9IHRoaXMuX1VJRGljdFtuYW1lXTtcclxuICAgICAgICB1aSA9IHVpID09IHVuZGVmaW5lZCA/IG51bGwgOiB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcbiAgICBBZGRVSUJ5TmFtZShuYW1lOiBzdHJpbmcsIHVpOiBCYXNlVUkpOiBCYXNlVUkgIHtcclxuICAgICAgICB0aGlzLl9VSURpY3RbbmFtZV0gPSB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj02NDA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMTM2O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJJdGVtTGlzdC5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L1JvbGVFbGVtZW50LnRzXCIsUm9sZUVsZW1lbnQpO1xuICAgICAgICByZWcoXCJzY3JpcHQvSXRlbUVsZW1lbnQudHNcIixJdGVtRWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3Rlck1hbmFnZXIgZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX01ncjogQ2hhcmFjdGVyTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IE1ncigpOiBDaGFyYWN0ZXJNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIUNoYXJhY3Rlck1hbmFnZXIuZ19NZ3IpIHtcclxuICAgICAgICAgICAgQ2hhcmFjdGVyTWFuYWdlci5nX01nciA9IG5ldyBDaGFyYWN0ZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJNYW5hZ2VyLmdfTWdyO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJDaGFyYWN0ZXJJbmZvXCIpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIEdlbkluZm8oZGF0YTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDaGFyYWN0ZXJJbmZvKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRTa2lsbEl0ZW0oaWQpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uSXRlbTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0UHJpY2UoaWQpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uUHJpY2U7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldENoYXJhY3RlckluZm8oaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0SXRlbUlEKGlkKSB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmICghaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHJldHVybiBpbmZvLkl0ZW07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgR2V0TmFtZShpZCkge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoIWluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIHJldHVybiBpbmZvLm1OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXREZXNjKGlkKSB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmICghaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIGluZm8uRGVzYztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0Q2hhcmFjdGVyTW9kZWwoaWQ6IG51bWJlcik6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoIWluZm8pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyRGF0YTogQ2hhcmFjdGVySW5mbyA9IHRoaXMuR2V0Q2hhcmFjdGVySW5mbyhpZCk7XHJcbiAgICAgICAgdmFyIHNhbXBsZU1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0TEgoY2hhcmFjdGVyRGF0YS5OYW1lKSk7XHJcbiAgICAgICAgdmFyIG1vZGVsID0gc2FtcGxlTW9kZWwuY2xvbmUoKTtcclxuICAgICAgICByZXR1cm4gbW9kZWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENoYXJhY3RlckluZm8gZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlSW5mbyB7XHJcbiAgICBwcml2YXRlIG1fUHJpY2U6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Nb2RlbE5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgbV9FeHRlbmRJRDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9OYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fRGVzYzogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgbU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBEZXNjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9EZXNjO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgSXRlbSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fSXRlbTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUHJpY2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1ByaWNlO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoY2hhcmFjdGVyRGF0YTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoY2hhcmFjdGVyRGF0YSk7XHJcbiAgICAgICAgdGhpcy5tX0lEID0gY2hhcmFjdGVyRGF0YS5JRCA/IGNoYXJhY3RlckRhdGEuSUQgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9Nb2RlbE5hbWUgPSBjaGFyYWN0ZXJEYXRhLk1vZGVsSUQgPyBjaGFyYWN0ZXJEYXRhLk1vZGVsSUQgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9JdGVtID0gY2hhcmFjdGVyRGF0YS5JdGVtSUQgPyBOdW1iZXIoY2hhcmFjdGVyRGF0YS5JdGVtSUQgLSAxKSA6IC0xO1xyXG4gICAgICAgIHRoaXMubV9QcmljZSA9IGNoYXJhY3RlckRhdGEuUHJpY2UgPyBOdW1iZXIoY2hhcmFjdGVyRGF0YS5QcmljZSkgOiAwO1xyXG4gICAgICAgIHRoaXMubV9OYW1lID0gY2hhcmFjdGVyRGF0YS5QYXNzc2NvcmUgPyBjaGFyYWN0ZXJEYXRhLlBhc3NzY29yZSA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0Rlc2MgPSBjaGFyYWN0ZXJEYXRhLkRlc2MgPyBjaGFyYWN0ZXJEYXRhLkRlc2MgOiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW9kZWxOYW1lO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuZXhwb3J0IG1vZHVsZSBHYW1lTWFuYWdlciB7XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZU1hbmFnZXIge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01hcDogeyBbbmFtZTogc3RyaW5nXTogQmFzZUluZm8gfTtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9Cb3R0b21JRDogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLm1fTWFwID0ge307XHJcbiAgICAgICAgICAgIHRoaXMubV9Cb3R0b21JRCA9IC0xO1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnSW5mbzogb2JqZWN0ID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0SnNvblBhdGgobmFtZSkpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29uZmlnSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBjb25maWdJbmZvW2tleV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YUluZm86IEJhc2VJbmZvID0gdGhpcy5HZW5JbmZvKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01hcFtkYXRhSW5mby5JRF0gPSBkYXRhSW5mbztcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhSW5mby5JRCAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fQm90dG9tSUQgPSBkYXRhSW5mby5JRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgR2VuSW5mbyhkYXRhKTogQmFzZUluZm87XHJcbiAgICAgICAgcHJvdGVjdGVkIEdldEluZm88VCBleHRlbmRzIEJhc2VJbmZvPihpZDogbnVtYmVyKTogVCB7XHJcbiAgICAgICAgICAgIGlmICghaWQgfHwgaWQgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBCYXNlSW5mbyA9IHRoaXMubV9NYXBbaWRdO1xyXG4gICAgICAgICAgICBpZiAoIUJhc2VJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBCYXNlSW5mbyA9IHRoaXMubV9NYXBbdGhpcy5tX0JvdHRvbUlEXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQmFzZUluZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCYXNlSW5mbyBhcyBUO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+WSUTmlbDnu4RcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgR2V0SURMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgICAgICB2YXIgbWFwOiB7IFtJRDogbnVtYmVyXTogQmFzZUluZm8gfSA9IHRoaXMubV9NYXA7XHJcbiAgICAgICAgICAgIHZhciBJRExpc3Q6IEFycmF5PG51bWJlcj4gPSBbXVxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG1hcFtrZXldXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBJRExpc3QucHVzaChkYXRhLklEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gSURMaXN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQmFzZUluZm8ge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0lEOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGdldCBJRCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0lEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9JRCA9IGRhdGEuSUQgPyBOdW1iZXIoZGF0YS5JRCkgLSAxIDogLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1NYW5hZ2VyIGV4dGVuZHMgR2FtZU1hbmFnZXIuQmFzZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19NZ3I6IEl0ZW1NYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTWdyKCk6IEl0ZW1NYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIUl0ZW1NYW5hZ2VyLmdfTWdyKSB7XHJcbiAgICAgICAgICAgIEl0ZW1NYW5hZ2VyLmdfTWdyID0gbmV3IEl0ZW1NYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBJdGVtTWFuYWdlci5nX01ncjtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiSXRlbUluZm9cIik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgR2VuSW5mbyhkYXRhOiBhbnkpOiBHYW1lTWFuYWdlci5CYXNlSW5mbyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVtSW5mbyhkYXRhKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpgZPlhbfku7fmoLxcclxuICAgICAqIEBwYXJhbSBpZCDpgZPlhbdJRFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0UHJpY2UoaWQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGluZm86IEl0ZW1JbmZvID0gdGhpcy5HZXRJbmZvPEl0ZW1JbmZvPihpZCk7XHJcbiAgICAgICAgaWYgKGluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvLlByaWNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumBk+WFt+S7t+agvFxyXG4gICAgICogQHBhcmFtIGlkIOmBk+WFt0lEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRJdGVtSWNvbihpZDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgaW5mbzogSXRlbUluZm8gPSB0aGlzLkdldEluZm88SXRlbUluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uSWNvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+WSUTmlbDnu4RcclxuICAgICovXHJcbiAgICBwdWJsaWMgR2V0U2VsbEl0ZW1JRExpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgdmFyIG1hcCA9IHRoaXMubV9NYXA7XHJcbiAgICAgICAgdmFyIElETGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG1hcCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YTogYW55ID0gbWFwW2tleV1cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtSW5mbzogSXRlbUluZm8gPSBkYXRhIGFzIEl0ZW1JbmZvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLlByaWNlID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgSURMaXN0LnB1c2goZGF0YS5JRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIElETGlzdDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEdldEl0ZW1UeXBlKGlkOm51bWJlcik6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZm86IEl0ZW1JbmZvID0gdGhpcy5HZXRJbmZvPEl0ZW1JbmZvPihpZCk7XHJcbiAgICAgICAgaWYgKGluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvLkl0ZW1UeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRJdGVtSW5mbyhpZDpudW1iZXIpOkl0ZW1JbmZvXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZm86IEl0ZW1JbmZvID0gdGhpcy5HZXRJbmZvPEl0ZW1JbmZvPihpZCk7XHJcbiAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEl0ZW1JbmZvIGV4dGVuZHMgR2FtZU1hbmFnZXIuQmFzZUluZm8ge1xyXG4gICAgcHJpdmF0ZSBtX01vZGVsTmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0V4dGVuZElEOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fUHJpY2U6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9JdGVtVHlwZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fSWNvbjpzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fUGFzc3Njb3JlOnN0cmluZztcclxuICAgIHByaXZhdGUgbV9EZXNjOnN0cmluZztcclxuICAgIHB1YmxpYyBnZXQgRGVzYygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fRGVzYztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUGFzc3Njb3JlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QYXNzc2NvcmU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vZGVsTmFtZSArIHRoaXMubV9FeHRlbmRJRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUHJpY2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1ByaWNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBJdGVtVHlwZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fSXRlbVR5cGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEljb24oKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0ljb247XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihkYXRhKTtcclxuICAgICAgICB0aGlzLm1fSUQgPSBkYXRhLklEID8gZGF0YS5JRCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX1Bhc3NzY29yZSA9IGRhdGEuUGFzc3Njb3JlID8gZGF0YS5QYXNzc2NvcmU6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX01vZGVsTmFtZSA9IGRhdGEuTW9kZWxOYW1lID8gZGF0YS5Nb2RlbE5hbWUgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9FeHRlbmRJRCA9IGRhdGEuRXh0ZW5kSUQgPyBkYXRhLkV4dGVuZElEIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fUHJpY2UgPSBkYXRhLlByaWNlID8gTnVtYmVyKGRhdGEuUHJpY2UpIDogMDtcclxuICAgICAgICB0aGlzLm1fSXRlbVR5cGUgPSBkYXRhLkl0ZW1UeXBlPyBOdW1iZXIoZGF0YS5JdGVtVHlwZSk6MDtcclxuICAgICAgICB0aGlzLm1fSWNvbiA9IGRhdGEuSWNvbj9kYXRhLkljb246XCJcIjtcclxuICAgICAgICB0aGlzLm1fRGVzYyA9IGRhdGEuRGVzYz9kYXRhLkRlc2M6XCJcIjtcclxuICAgIH1cclxufSIsImltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbiAvKipcclxuICog6KGo546w55So55qE5a+56LGhXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEFuaW1PYmpcclxue1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIik7XHJcbiAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgZm9yKCBsZXQgY291bnQgPTA7Y291bnQgPCAzMDsrK2NvdW50IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1Db2luLG1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2VuQW5pbU9iajxUIGV4dGVuZHMgQmFzZUFuaW1PYmo+KCBhbmltQ2xhc3M6e25ldyAobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSxtb2RlbDpMYXlhLlNwcml0ZTNEICk6VFxyXG4gICAge1xyXG4gICAgICAgIHZhciBhbmltT2JqID0gTGF5YS5Qb29sLmdldEl0ZW0oYW5pbUNsYXNzLk5hbWUoKSk7XHJcbiAgICAgICAgaWYoYW5pbU9iaj09bnVsbClcclxuICAgICAgICAgICAgYW5pbU9iaiA9IG5ldyBhbmltQ2xhc3MoYW5pbUNsYXNzLk5hbWUoKSxtb2RlbCk7XHJcbiAgICAgICAgcmV0dXJuIGFuaW1PYmo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFic3RyYWN0IGNsYXNzIEJhc2VBbmltT2JqIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG4gICAge1xyXG4gICAgICAgIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5TY2VuZU9iai5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX0ZyYW1lRnVuYylcclxuICAgICAgICB9XHJcbiAgICAgICAgTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX05hbWU6c3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLm9uKExheWEuRXZlbnQuUkVNT1ZFRCx0aGlzLHRoaXMuX0xlYXZlU3RhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lRnVuYygpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0p1ZGdlQ29tcGxldGUoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0ZyYW1lTG9naWNGdW5jKCk7XHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuO1xyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKHRoaXMsdGhpcy5fRnJhbWVGdW5jKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZvcmNlTGVhdmVTdGFnZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBBbmltQ29pbiBleHRlbmRzIEJhc2VBbmltT2JqXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkFuaW1Db2luXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFNldFRhcmdldCggdGFyZ2V0OkxheWEuU3ByaXRlM0QgKSAgICBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgc3VwZXIuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFyZ2V0OkxheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIobmFtZSxtb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lTG9naWNGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBvc2l0aW9uID0gdGhpcy5fVGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBhZGRQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKGFkZFBTLDAuMSxhZGRQUyk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5hZGQoYWRkUFMscG9zaXRpb24scG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRMb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMubmFtZSx0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGRpc0RpciA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGRpc0Rpcik7XHJcbiAgICAgICAgICAgIGlmKCBMYXlhLlZlY3RvcjMuc2NhbGFyTGVuZ3RoU3F1YXJlZChkaXNEaXIpPDAuMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgbW9kdWxlIENoYXJhY3RlclxyXG57XHJcbiAgICBleHBvcnQgZW51bSBBbmltRW51bVxyXG4gICAge1xyXG4gICAgICAgIFN0YW5kLFxyXG4gICAgICAgIEZseSxcclxuICAgICAgICBGYWxsLFxyXG4gICAgICAgIEp1bXAsXHJcbiAgICAgICAgSnVtcGRvd25cclxuICAgIH1cclxuICAgIHZhciBBbmltVHlwZTp7W25hbWU6bnVtYmVyXTpzdHJpbmd9O1xyXG4gICAgQW5pbVR5cGUgPSB7fTtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLlN0YW5kXSA9IFwic3RhbmRcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkp1bXBdID0gXCJqdW1wdXBcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkp1bXBkb3duXSA9IFwianVtcGRvd25cIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkZseV0gPSBcImZseVwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uRmFsbF0gPSBcImZhbGxcIjtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBQbGF5ZXJBbmltTmFtZSggbmFtZUVudW06QW5pbUVudW0gKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gQW5pbVR5cGVbbmFtZUVudW1dO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgQ2hhcmFjdGVyQW5pbWF0b3JcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIG1fQW5pbWF0b3I6TGF5YS5BbmltYXRvcjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggUGxheWVyQ2hhcmFjdGVyOkxheWEuU3ByaXRlM0QgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gUGxheWVyQ2hhcmFjdGVyLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFN3aXRjaFN0YXRlKCBBbmltRW51bSApXHJcbiAgICAgICAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHsgQmFzZUZ1bmMgfSBmcm9tIFwiLi4vQmFzZS9CYXNlRnVuY1wiO1xyXG4vL+a4uOaIj+S4reebuOaculxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ2FtZXJhIGV4dGVuZHMgTGF5YS5DYW1lcmFcclxue1xyXG4gICAgQ3RybGVyOkJhc2VHYW1lQ2FtZXJhQ3RybGVyO1xyXG4gICAgQmFzZVBTOkxheWEuVmVjdG9yMztcclxuICAgIER5bmFtaWNQUzpMYXlhLlZlY3RvcjM7XHJcbiAgICBQbGF5ZXI6UGxheWVyO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50UFM6QmFzZUZ1bmMuU21vb3RoRGFtcFZlY3RvcjM7XHJcblxyXG4gICAgc2V0IFBvc2l0aW9uKHBzOkxheWEuVmVjdG9yMylcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBzLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTpMYXlhLlZlY3RvcjNcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7ICAgXHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN0cmxlciA9IG5ldyBHYW1lQ2FtZXJhQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuRHluYW1pY1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgLy90aGlzLnRpbWVyTG9vcCgxLHRoaXMuQ3RybGVyLHRoaXMuQ3RybGVyLlVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX1VwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5jbGVhckZsYWcgPSBMYXlhLkJhc2VDYW1lcmEuQ0xFQVJGTEFHX1NLWTtcclxuICAgICAgICB0aGlzLm1fQ291bnRQUyA9IG5ldyBCYXNlRnVuYy5TbW9vdGhEYW1wVmVjdG9yMygyKVxyXG4gICAgICAgIC8vQ2FtZXJhLnNreVJlbmRlcmVyID0gc2t5Qm94Ll9yZW5kZXI7XHJcbiAgICAgICAgLy90aGlzLnNrID0gc2t5Qm94O1xyXG4gICAgICAgICAvL3BhdGhcclxuICAgIH1cclxuXHJcbiAgICBTZXRQbGFlcihwbGF5ZXI6UGxheWVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBSZXNldChEeW5hbWljUFM6TGF5YS5WZWN0b3IzLGJhc2VQUzpMYXlhLlZlY3RvcjMscGxheWVyOlBsYXllciApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5CYXNlUFMgPSBiYXNlUFM7XHJcbiAgICAgICAgdGhpcy5EeW5hbWljUFMgPSBEeW5hbWljUFM7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orqHnrpflubborr7nva7kvY3nva5cclxuICAgIENvdW50U2V0UFMoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZCh0aGlzLkJhc2VQUyx0aGlzLkR5bmFtaWNQUyxuZXdQUyk7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gdGhpcy5tX0NvdW50UFMuU21vb3RoRGFtcCgwLCBMYXlhLlZlY3RvcjMuZGlzdGFuY2UodGhpcy50cmFuc2Zvcm0ucG9zaXRpb24sbmV3UFMpIClcclxuICAgICAgICAvL3RoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmxlcnAodGhpcy50cmFuc2Zvcm0ucG9zaXRpb24sbmV3UFMsc2NhbGUsbmV3UFMpXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUzsgLy90aGlzLm1fQ291bnRQUy5Db3VudCh0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbixuZXdQUykgLy9uZXdQUztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9VcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3RybGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5hYnN0cmFjdCBjbGFzcyBCYXNlR2FtZUNhbWVyYUN0cmxlclxyXG57XHJcbiAgICBcclxuICAgIFxyXG4gICAgQ2FtZXJhOkdhbWVDYW1lcmE7XHJcbiAgICBDdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXI7XHJcbiAgICBhYnN0cmFjdCBVcGRhdGUoKTp2b2lkO1xyXG4gICAgY29uc3RydWN0b3IoIGNhbWVyYTpHYW1lQ2FtZXJhLGN0cmxlcjpCYXNlR2FtZUNhbWVyYUN0cmxlciA9IG51bGwgKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGN0cmxlciA9PSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICBjdHJsZXIgPSB0aGlzOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBjYW1lcmE7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIgPSBjdHJsZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDYW1lcmFDdHJsZXIgZXh0ZW5kcyBCYXNlR2FtZUNhbWVyYUN0cmxlclxyXG57XHJcbiAgICBcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW1lcmE6R2FtZUNhbWVyYSxjdHJsZXI6QmFzZUdhbWVDYW1lcmFDdHJsZXIgPSBudWxsKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKGNhbWVyYSxjdHJsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5DYW1lcmE9PW51bGx8fCB0aGlzLkNhbWVyYS5QbGF5ZXIgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLypcclxuICAgICAgICB2YXIgQ2FtZXJhUFMgPSB0aGlzLkNhbWVyYS5EeW5hbWljUFM7XHJcbiAgICAgICAgdmFyIFBsYXllclBTID0gdGhpcy5DYW1lcmEuUGxheWVyLl9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgICAgIENhbWVyYVBTLnggPSAwO1xyXG4gICAgICAgIHZhciBkaXNOdW0gPSBQbGF5ZXJQUy55IC0gQ2FtZXJhUFMueTtcclxuICAgICAgICB2YXIgZGlzWk51bSA9IFBsYXllclBTLnogLSBDYW1lcmFQUy56O1xyXG4gICAgICAgIGlmKE1hdGguYWJzKGRpc051bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnkgKz0gZGlzTnVtKjAuMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIE1hdGguYWJzKGRpc1pOdW0pPjAuMDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy56ICs9IGRpc1pOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5DYW1lcmEuRHluYW1pY1BTID1DYW1lcmFQUzsqL1xyXG4gICAgICAgIHZhciBDYW1lcmFQUyA9IHRoaXMuQ2FtZXJhLkR5bmFtaWNQUztcclxuICAgICAgICB2YXIgUGxheWVyUFMgPSB0aGlzLkNhbWVyYS5QbGF5ZXIuX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlzTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCBNYXRoLmFicyhkaXNaTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueiArPSBkaXNaTnVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5DYW1lcmEuRHluYW1pY1BTID0gQ2FtZXJhUFM7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuQ291bnRTZXRQUygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgeyBBbmltT2JqIH0gZnJvbSBcIi4vLi4vR2FtZS9BbmltT2JqXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgeyBQbGF5ZXJDb250cm9sZXIgfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL0lucHV0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG50eXBlIEFuaW1Db2luID0gQW5pbU9iai5BbmltQ29pblxyXG5leHBvcnQgbW9kdWxlIEl0ZW0ge1xyXG4gICAgLy/nianlk4HmoIfor4ZcclxuICAgIGNvbnN0IEl0ZW1JRDogc3RyaW5nID0gXCJJdGVtXCI7XHJcbiAgICBjb25zdCBNb2RlbElEOiBzdHJpbmcgPSBcIk1vZGVsXCJcclxuICAgIFxyXG4gICAgZXhwb3J0IGVudW0gTW9kZWxUeXBlIHtcclxuICAgICAgICBDb2luXHJcbiAgICB9XHJcbiAgICBleHBvcnQgZW51bSBJdGVtVHlwZSB7XHJcbiAgICAgICAgTm9uZSA9IDAsXHJcbiAgICAgICAgRW1wdHksXHJcbiAgICAgICAgUm9jayxcclxuICAgICAgICBUaG9ybixcclxuICAgICAgICBWaW5lLFxyXG4gICAgICAgIFByb3RlY3QgPSAxMSxcclxuICAgICAgICBIb2x5UHJvdGVjdCxcclxuICAgICAgICBGbHksXHJcbiAgICAgICAgUm9wZSxcclxuICAgICAgICBDb2xsZWN0b3IsXHJcbiAgICAgICAgQ29pbiA9IDIwLFxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIExpbmVJdGVtSW5mbyB7XHJcbiAgICAgICAgVHlwZTogSXRlbVR5cGU7XHJcbiAgICAgICAgTnVtYmVyOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IodHlwZTogSXRlbVR5cGUsIG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtYmVyID0gbnVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCB2YXIgQnVmZlNsb3Q6e1trZXk6bnVtYmVyXTpudW1iZXJ9ID17fTtcclxuICAgIEJ1ZmZTbG90W0l0ZW1UeXBlLkNvbGxlY3Rvcl0gPSAwO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuUHJvdGVjdF0gPSAxO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuSG9seVByb3RlY3RdID0gMTtcclxuICAgIEJ1ZmZTbG90W0l0ZW1UeXBlLkZseV0gPSAxO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuVmluZV0gPSAyO1xyXG5cclxuICAgIC8v54mp5ZOB5biD5bGAXHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxheW91dCB7XHJcbiAgICAgICAgUmV3YXJkTGlzdDogQXJyYXk8TGF5SXRlbU1ncj47XHJcbiAgICAgICAgQmFycmllckxpc3Q6IEFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QgPSBuZXcgQXJyYXk8TGF5SXRlbU1ncj4oKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLCAxLCBJdGVtVHlwZS5FbXB0eSwgMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLCA1LCBJdGVtVHlwZS5Sb2NrLCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDIsIEl0ZW1UeXBlLlRob3JuLCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDIsIEl0ZW1UeXBlLlZpbmUsIDEwKSlcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDEsIEl0ZW1UeXBlLkNvaW4pKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsIDEsIEl0ZW1UeXBlLkZseSwgMjApKVxyXG5cclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsIDEsIEl0ZW1UeXBlLkNvbGxlY3RvcikpXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLCAxLCBJdGVtVHlwZS5Qcm90ZWN0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLCAxLCBJdGVtVHlwZS5Ib2x5UHJvdGVjdCkpO1xyXG5cclxuICAgICAgICAgICAgUmVzZXRJdGVtRmFjdG9yeSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFrZUxpbmVSZXdhcmQoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vciwgdGhpcy5SZXdhcmRMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VMaW5lRGlmZmljdWx0eShmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRha2VJdGVtKGZsb29yLCB0aGlzLkJhcnJpZXJMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VJdGVtKGZsb29yOiBudW1iZXIsIE1nckxpc3Q6IEFycmF5PExheUl0ZW1NZ3I+KTogQXJyYXk8TGluZUl0ZW1JbmZvPiB7XHJcbiAgICAgICAgICAgIHZhciByZXR1cm5JbmZvID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgbGlzdElkeCA9IDA7IGxpc3RJZHggPCBNZ3JMaXN0Lmxlbmd0aDsgKytsaXN0SWR4KSB7XHJcbiAgICAgICAgICAgICAgICBNZ3JMaXN0W2xpc3RJZHhdLk9uRmxvb3IoZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm86IExpbmVJdGVtSW5mbyA9IE1nckxpc3RbbGlzdElkeF0uVGFrZUl0ZW1zKGZsb29yKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLk51bWJlciA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5JbmZvLnB1c2goaW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6K+l5a+56LGh55qE5YiG5biD5Zu+5q+P5bGC562J5qaC546H5YiG5biDXHJcbiAgICBleHBvcnQgY2xhc3MgTGF5SXRlbU1nciB7XHJcbiAgICAgICAgLy/pgZPlhbfnsbvlnotcclxuICAgICAgICBJdGVtVHlwZTogSXRlbVR5cGU7XHJcbiAgICAgICAgLy/lvZPliY3lsYLmlbBcclxuICAgICAgICBDdXJGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIC8v5Yy66Ze05YiG5biD5oC75pWw6YePXHJcbiAgICAgICAgSXRlbU51bTogbnVtYmVyO1xyXG4gICAgICAgIC8v5byA5aeL5YiG5biD55qE5bGC5pWwXHJcbiAgICAgICAgU3RhcnRGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIC8v5YiG5biD5Yy66Ze0XHJcbiAgICAgICAgLy/lt7Lojrflj5blsYLmoIforrBcclxuICAgICAgICBUb3VjaGVkRmxvb3I6IG51bWJlcjtcclxuICAgICAgICBJdGVtTGlzdDogQXJyYXk8bnVtYmVyPjtcclxuICAgICAgICAvL3Jhbmdl5Yy66Ze06IyD5Zu0XHJcbiAgICAgICAgLy9udW0g5Yy66Ze06IyD5Zu05pWw6YePXHJcbiAgICAgICAgLy9pdGVtVHlwZSDnlJ/kuqfnmoTpgZPlhbfnsbvlnotcclxuICAgICAgICAvL3N0YXJ0Rmxvb3Ig5LuO5ZOq5LiA6KGM5byA5aeL5oqV5o63XHJcbiAgICAgICAgY29uc3RydWN0b3IocmFuZ2U6IG51bWJlciwgbnVtOiBudW1iZXIsIGl0ZW1UeXBlOiBJdGVtVHlwZSwgc3RhcnRGbG9vcjogbnVtYmVyID0gMSkge1xyXG4gICAgICAgICAgICBpZiAobnVtID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIG51bSA9IDE7XHJcbiAgICAgICAgICAgIGlmIChzdGFydEZsb29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIC8v56ysMOWxguaYr+eOqeWutui1t+atpeS9jee9rlxyXG4gICAgICAgICAgICAgICAgc3RhcnRGbG9vciA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5DdXJGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbU51bSA9IG51bTtcclxuICAgICAgICAgICAgLy/liIbluIPlm74g54mp5ZOBaWR4OuWxguaVsFxyXG4gICAgICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5PG51bWJlcj4ocmFuZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuR2VuTWFwKHN0YXJ0Rmxvb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBSYW5nZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bGC5pu05paw5Ye95pWwXHJcbiAgICAgICAgT25GbG9vcihmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChmbG9vciA8IHRoaXMuVG91Y2hlZEZsb29yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGZsb29yID49IHRoaXMuU3RhcnRGbG9vciArIHRoaXMuUmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2VuTWFwKGZsb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUn+aIkOWIhuW4g+WbvlxyXG4gICAgICAgIEdlbk1hcChzdGFydEZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5TdGFydEZsb29yID0gc3RhcnRGbG9vcjtcclxuICAgICAgICAgICAgdmFyIGl0ZW1OdW0gPSB0aGlzLkl0ZW1OdW07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvdW50OiBudW1iZXIgPSAwOyBjb3VudCA8IHRoaXMuSXRlbUxpc3QubGVuZ3RoOyArK2NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkl0ZW1MaXN0W2NvdW50XSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGl0ZW1MaXN0ID0gdGhpcy5JdGVtTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgY291bnROdW06IG51bWJlciA9IDA7IGNvdW50TnVtIDwgaXRlbU51bTsgKytjb3VudE51bSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIEl0ZW1GbG9vcjogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5SYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkl0ZW1MaXN0W0l0ZW1GbG9vcl0gKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFrZUl0ZW1zKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub3VjaGVkRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5lSXRlbUluZm8odGhpcy5JdGVtVHlwZSwgdGhpcy5JdGVtTGlzdFtmbG9vciAtIHRoaXMuU3RhcnRGbG9vcl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgUmVzZXQ6IGJvb2xlYW47XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUmVzZXRJdGVtRmFjdG9yeSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoUmVzZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBSZXNldCA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgdGhlS2V5IGluIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlKSB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gcGFyc2VJbnQodGhlS2V5KTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPD0gMikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgY291bnQgPSAwOyBjb3VudCA8IDMwOyArK2NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xhczogYW55ID0gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbdHlwZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbTogU3RlcCA9IG5ldyBjbGFzKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoSXRlbUlEICsgdGhlS2V5LCBpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gU3RlcEl0ZW1GYWN0b3J5KGl0ZW1UeXBlOiBJdGVtVHlwZSwgU3RlcCkge1xyXG4gICAgICAgIGlmIChTdGVwID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW1UeXBlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpdGVtXHJcbiAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7XHJcbiAgICAgICAgaXRlbSA9IG9ialBvb2wuZ2V0SXRlbShJdGVtSUQgKyBpdGVtVHlwZSlcclxuICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV0gIT0gbnVsbCAmJiBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xhczogYW55ID0gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBjbGFzKFN0ZXApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBTdGVwSXRlbShpdGVtVHlwZSwgU3RlcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLlN0ZXAgPSBTdGVwO1xyXG4gICAgICAgIGl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEl0ZW1CdWZmRmFjdG9yeShpdGVtVHlwZTogSXRlbVR5cGUpOiBCYXNlUGxheWVyQnVmZiAge1xyXG4gICAgICAgIHZhciBidWZmOiBCYXNlUGxheWVyQnVmZiA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoIChpdGVtVHlwZSkgIHtcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5GbHk6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IEZseUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkNvbGxlY3RvcjpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgQ29sbGVjdEJ1ZmYoMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUHJvdGVjdDpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUHJvdGVjdEJ1ZmYoMyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUHJvdGVjdEJ1ZmYoMywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5WaW5lOlxyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5ldyBWaW5lQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9wZTpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUm9wZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3RlcEl0ZW0ge1xyXG4gICAgICAgIFN0ZXA6IFN0ZXA7XHJcbiAgICAgICAgSXRlbVR5cGU6IEl0ZW1UeXBlO1xyXG4gICAgICAgIE1vZGVsOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIHByaXZhdGUgbV9BbmltYXRvcjogTGF5YS5BbmltYXRvcjtcclxuICAgICAgICBnZXQgSXNEaWZmaWN1bHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtVHlwZSA+IDAgJiYgdGhpcy5JdGVtVHlwZSA8IDEwICYmIHRoaXMuSXRlbVR5cGUgIT0gSXRlbVR5cGUuVmluZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Yik5pat6IO95LiN6IO96LWw5LiK5Y67XHJcbiAgICAgICAgZ2V0IElzRm9yYmlkZW4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkl0ZW1UeXBlID09IEl0ZW1UeXBlLlJvY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+mHjee9rlxyXG4gICAgICAgIFJlc2V0SXRlbSgpIHtcclxuICAgICAgICAgICAgLy90aGlzLl9Jbml0SXRlbU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0RW5hYmxlKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU3RlcC5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU2V0RW5hYmxlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUHV0SXRlbSA9IGZ1bmN0aW9uIChpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5EZXNQYXduKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcC5TdGVwSXRlbSA9IFN0ZXBJdGVtRmFjdG9yeShpdGVtVHlwZSwgdGhpcy5TdGVwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5raI6ZmkIOaKiuiHquW3seWtmOWFpeWGheWtmOaxoFxyXG4gICAgICAgIERlc1Bhd24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vZGVsLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7Ly9HTS5PYmpQb29sO1xyXG4gICAgICAgICAgICBvYmpQb29sLnJlY292ZXIoSXRlbUlEICsgdGhpcy5JdGVtVHlwZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuSXRlbVR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBZGRCdWZmVG9QbGF5ZXIocGxheWVyOlBsYXllcixwdXRCYWNrSXRlbTpib29sZWFuID0gdHJ1ZSk6IGJvb2xlYW4gIHtcclxuICAgICAgICAgICAgdmFyIEJ1ZmY6QmFzZVBsYXllckJ1ZmYgPSBJdGVtQnVmZkZhY3RvcnkodGhpcy5JdGVtVHlwZSk7XHJcbiAgICAgICAgICAgIHZhciBzdWNjZXNzOmJvb2xlYW4gPSBCdWZmLkFkZFRvUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIGlmKHN1Y2Nlc3MgJiYgcHV0QmFja0l0ZW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOeqgeegtOS/neaKpFxyXG4gICAgICAgICAqIEByZXR1cm5zIOaYr+WQpuiiq+eqgeegtFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEJyZWFrUHJvdGVjdChwbGF5ZXI6IFBsYXllcik6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgY3VyQnVmZiA9IHBsYXllci5HZXRCdWZmKEJ1ZmZTbG90W0l0ZW1UeXBlLlByb3RlY3RdKTtcclxuICAgICAgICAgICAgaWYgKGN1ckJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY3VyQnVmZi5UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Qcm90ZWN0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJCdWZmLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkhvbHlQcm90ZWN0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGl0ZW1UeXBlOiBJdGVtVHlwZSwgU3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5TdGVwID0gU3RlcDtcclxuICAgICAgICAgICAgdGhpcy5JdGVtVHlwZSA9IGl0ZW1UeXBlO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fSW5pdEl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXI6IFBsYXllciwgYnVmZjogQmFzZVBsYXllckJ1ZmYpIHtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5BZGRCdWZmKGJ1ZmYpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9Jbml0SXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCAhPSBudWxsICYmICF0aGlzLk1vZGVsLmRlc3Ryb3llZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwcyA9IG5ldyBMYXlhLlZlY3RvcjMoMCwgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCwgMCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9HZW5JdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gcHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSB0aGlzLk1vZGVsLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5Nb2RlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9UZXN0R2VudEl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLkl0ZW1UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvY2s6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjMsIDAuMywgMC41KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ob25lOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjMsIDAuMywgMC41KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuSXRlbVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9jazpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1R5cGU6SXRlbVR5cGU7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1BsYXllcjpQbGF5ZXI7XHJcbiAgICAgICAgcHVibGljIGdldCBUeXBlKCk6IEl0ZW0uSXRlbVR5cGVcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fVHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBTbG90KCk6IG51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIEJ1ZmZTbG90W3RoaXMuVHlwZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgUGxheWVyKCk6IFBsYXllclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGU6IEl0ZW0uSXRlbVR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5tX1R5cGUgPSB0eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WQkeeOqeWutua3u+WKoEJVRkZcclxuICAgICAgICBwdWJsaWMgQWRkVG9QbGF5ZXIocGxheWVyOlBsYXllcik6Ym9vbGVhblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX1BsYXllciA9IHBsYXllcjtcclxuICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYodGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgU3RhcnQoKTtcclxuICAgICAgICBwdWJsaWMgUmVtb3ZlU2VsZigpOnZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5Db21wbGV0ZUJ1ZmYodGhpcy5TbG90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFJlbW92ZWQoKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBSb2NrIGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgTW9kZWxOdW0gPSAzO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9jaywgU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuTWVzaFNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IDEgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBSb2NrLk1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIE5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMFwiICsgaWR4KVxyXG4gICAgICAgICAgICBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhOYW1lKVxyXG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb2NrXSA9IFJvY2s7XHJcblxyXG4gICAgY2xhc3MgVGhvcm4gZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoU3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5UaG9ybiwgU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQnJlYWtQcm90ZWN0KHBsYXllcikpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoKTtcclxuICAgICAgICAgICAgICAgIHZhciBhbmltOiBMYXlhLkFuaW1hdG9yID0gdGhpcy5Nb2RlbC5nZXRDaGlsZEF0KDApLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShcInRvdWNoXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuVGhvcm5dID0gVGhvcm47XHJcblxyXG4gICAgY2xhc3MgUHJvdGVjdCBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlByb3RlY3QsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLkFkZEJ1ZmZUb1BsYXllcihwbGF5ZXIpOyAgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUHJvdGVjdF0gPSBQcm90ZWN0O1xyXG5cclxuICAgIGNsYXNzIFByb3RlY3RCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIFRpbWU6IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gdGltZSDmjIHnu63ml7bpl7RcclxuICAgICAgICAgKiBAcGFyYW0gSXNIb2x5IOaYr+WQpue7neWvueaXoOaVjFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6IG51bWJlciA9IDAsIElzSG9seTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKElzSG9seSA/IEl0ZW1UeXBlLkhvbHlQcm90ZWN0IDogSXRlbVR5cGUuUHJvdGVjdCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIHRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPCBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAgICAgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmVtb3ZlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsYXNzIEhvbHlQcm90ZWN0IGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuSG9seVByb3RlY3QsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fdW50b3VjaGFibGVfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuSG9seVByb3RlY3RdID0gSG9seVByb3RlY3Q7XHJcblxyXG4gICAgY2xhc3MgQ29pbiBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICAvL1RvRG9cclxuICAgICAgICBwcml2YXRlIG1fdG91Y2hlZDogQm9vbGVhblxyXG4gICAgICAgIEZseVRvUGxheWVyKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHZhciBjb25pbjogQW5pbUNvaW4gPSBBbmltT2JqLkdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1PYmouQW5pbUNvaW4sIHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICBjb25pbi5TZXRUYXJnZXQocGxheWVyKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRHb2xkVW5Mb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRHb2xkKDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuQ29pbiwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29pbl0gPSBDb2luO1xyXG5cclxuICAgIGNsYXNzIENvbGxlY3RlciBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5BZGRCdWZmVG9QbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuQ29sbGVjdG9yLCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSArIE1hdGgucmFuZG9tKCkgKiAyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2Fic29yZF8wMVwiKTtcclxuICAgICAgICAgICAgdmFyIHRoZU1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSB0aGVNb2RlbC5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkNvbGxlY3Rvcl0gPSBDb2xsZWN0ZXI7XHJcblxyXG4gICAgY2xhc3MgQ29sbGVjdEJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgVGltZTogbnVtYmVyO1xyXG4gICAgICAgIEdhbWVEaXI6IEdhbWVEaXJlY3RvcjtcclxuICAgICAgICBDb3VudEZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgc3RhdGljIGdldCBTbG90KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3Rvcik7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZURpciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXI7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIHRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRGbG9vciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KCkge1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50Rmxvb3IgPSB0aGlzLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3IgLSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBSZW1vdmVkKClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPCBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vciAtIHRoaXMuQ291bnRGbG9vciArIDEgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5HYW1lRGlyLkdhbWVQbGF5Lkxvb3BEb0Zsb29yU3RlcCh0aGlzLkNvdW50Rmxvb3IsIHRoaXMsIHRoaXMuQ291bnRDb2lucyk7XHJcbiAgICAgICAgICAgICAgICArK3RoaXMuQ291bnRGbG9vcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIENvdW50Q29pbnMoc3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBpZiAoc3RlcC5TdGVwSXRlbS5JdGVtVHlwZSA9PSBJdGVtVHlwZS5Db2luKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgQ29pbjogQ29pbiA9IHN0ZXAuU3RlcEl0ZW0gYXMgQ29pbjtcclxuICAgICAgICAgICAgICAgIENvaW4uRmx5VG9QbGF5ZXIodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEZMeSBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5BZGRCdWZmVG9QbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkZseSwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDEgKyBNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5GbHldID0gRkx5O1xyXG5cclxuICAgIGNsYXNzIEZseUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgc3RhdGljIGdldCBTbG90KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIEZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIgPSAwLjE1LCBmbG9vcjogbnVtYmVyID0gMTApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuRmx5KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aW1lOiBudW1iZXIgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWU7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXI6UGxheWVyID0gdGhpcy5QbGF5ZXI7XHJcbiAgICAgICAgICAgIGlmIChwbGF5ZXIuQ3VyU3RlcCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPSB0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZSAvIDIgKiB0aGlzLkZsb29yO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuRmx5KCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KCkpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNldFNhZmVQUyh0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgcGxheWVyLkZseVByZXBhcmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFJlbW92ZWQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5Qb3BDdHJsZXIoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5QbGF5ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9GaW5hbFogLSB0aGlzLlBsYXllci5Qb3NpdGlvbi56ID4gLTAuMikge1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFJvcGUgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllcixmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9wZSwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuTWVzaFNwcml0ZTNEID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4xLCAwLjUsIDAuMSkpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb3BlXSA9IFJvcGU7XHJcblxyXG4gICAgY2xhc3MgUm9wZUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgU3BlZWQ6IG51bWJlcjtcclxuICAgICAgICBGbG9vcjogbnVtYmVyO1xyXG5cclxuICAgICAgICBzdGF0aWMgZ2V0IFNsb3QoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuUGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fRmluYWxaIC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24ueiA+IC0wLjIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KCkge1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyOlBsYXllciA9IHRoaXMuUGxheWVyO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPSB0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZSAvIDIgKiB0aGlzLkZsb29yO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLCB0aGlzLl9JbnB1dCkpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNldFNhZmVQUyh0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVtb3ZlZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuR2V0U3RlcEJ5TG9jYXRpb24odGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkJhc2VDdHJsZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLlBvcEN0cmxlcigpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbFo6IG51bWJlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDogbnVtYmVyID0gMC4xLCBmbG9vcjogbnVtYmVyID0gMTApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9wZSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gMDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0lucHV0KGlzUmlnaHQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlRmxvb3IgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBsYXllckZsb29yTGluZTtcclxuICAgICAgICAgICAgaWYgKGNsb3NlRmxvb3IuRmxvb3JOdW0gJSAyICE9IHRoaXMuX0ZpbmFsTG9jYXRpb24uWSAlIDIpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlRmxvb3IgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldEZsb29yQnlGbG9vcihjbG9zZUZsb29yLkZsb29yTnVtICsgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBjbG9zZUZsb29yLkdldFN0ZXAodGhpcy5fRmluYWxMb2NhdGlvbi5YKTtcclxuICAgICAgICAgICAgaWYgKGlzUmlnaHQpXHJcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICAgICAgaWYgKHN0ZXAuU3RlcEl0ZW0uSXNGb3JiaWRlbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5SZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFZpbmUgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1RvdWNoZWQ6Ym9vbGVhbjtcclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5tX1RvdWNoZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgdGhpcy5BZGRCdWZmVG9QbGF5ZXIocGxheWVyLGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5tX1RvdWNoZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlZpbmUsIHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLm1fVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxICsgTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gSWR4ID09IDEgPyBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKSA6IHBhdGguR2V0TEgoXCJ0cmFwX2Nob21wZXJfMDFcIilcclxuXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5raI6ZmkIOaKiuiHquW3seWtmOWFpeWGheWtmOaxoFxyXG4gICAgICAgIERlc1Bhd24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9Ub3VjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN1cGVyLkRlc1Bhd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5WaW5lXSA9IFZpbmU7XHJcblxyXG4gICAgY2xhc3MgVmluZUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgQ291bnRUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgSW5wdXREaXI6IGJvb2xlYW47XHJcbiAgICAgICAgU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsIHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZW1vdmVkKCkge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb3VudFRpbWU6IG51bWJlciA9IDQsIGlucHV0RGlyOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5WaW5lKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudFRpbWUgPSBjb3VudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSBpbnB1dERpcjtcclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaW5wdXREaXI6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuSW5wdXREaXIgPT0gaW5wdXREaXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSAhdGhpcy5JbnB1dERpcjtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5Db3VudFRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvdW50VGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9TaG93R2FtZUluZm8oKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvdW50VGltZSA8PSAwKVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLklucHV0RGlyID09IHRydWUgPyBcIlJpZ2h0XCIgOiBcIkxlZnRcIjtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiZXhwb3J0IG1vZHVsZSBHYW1lTW9kdWxlXHJcbntcclxuICAgIGV4cG9ydCBjbGFzcyBFdmVudFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgT25DaGFyYWN0ZXJJdGVtQ2hhbmdlOnN0cmluZyA9IFwiT25DaGFyYWN0ZXJJdGVtQ2hhbmdlXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPblRpbWVQYXVzZTpzdHJpbmcgPSBcIk9uVGltZVBhdXNlXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPblRpbWVDb250aW51ZTpzdHJpbmcgPSBcIk9uVGltZUNvbnRpbnVlXCI7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIEdhbWVTdHJ1Y3Rcclxue1xyXG4gICAgZXhwb3J0IGNsYXNzIFNldEluZm8ge1xyXG4gICAgICAgIEF1ZGlvT246IGJvb2xlYW47XHJcbiAgICAgICAgT1BJc1JpZ2h0OiBib29sZWFuO1xyXG4gICAgICAgIFRleHRJbmZvOiBzdHJpbmc7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQXVkaW9PbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuT1BJc1JpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5UZXh0SW5mbyA9IFwiSGVsbG8gXFxuIEhlbGxvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE1Mb2NhdGlvblxyXG4gICAge1xyXG4gICAgICAgIGdldCBYKCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQXJyWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgWCh4Om51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyclswXSA9eDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFkoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBZKHk6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzFdID0geTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfQXJyOkFycmF5PG51bWJlcj47XHJcbiAgICAgICAgY29uc3RydWN0b3IoIHg6bnVtYmVyLHk6bnVtYmVyIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyciA9IFt4LHldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCB2YXIgSXRlbURpY3RUeXBlOntbSXRlbVR5cGU6bnVtYmVyXTphbnl9O1xyXG4gICAgSXRlbURpY3RUeXBlID0geyB9O1xyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOi+k+WFpeeuoeeQhuebuOWFs1xyXG4gKi9cclxuaW1wb3J0IEdhbWVTY2VuZVBsYXkgZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVQbGF5L0dhbWVTY2VuZVBsYXlcIlxyXG5leHBvcnQgbW9kdWxlIElucHV0IHtcclxuICAgIC8v5Z+656GA6L6T5YWl5o6n5Yi25ZmoXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVJbnB1dCB7XHJcbiAgICAgICAgLy/lhazmnIlcclxuICAgICAgICBOZXh0SW5wdXQ6IEJhc2VHYW1lSW5wdXQ7XHJcbiAgICAgICAgYWJzdHJhY3QgSW5wdXQoaXNSaWdodDogYm9vbGVhbik7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGlucHV0OiBCYXNlR2FtZUlucHV0ID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgaWYgKGlucHV0ID09IG51bGwpICB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5OZXh0SW5wdXQgPSBpbnB1dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkgIHsgfVxyXG4gICAgICAgIENsZWFyKCkgeyB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIERJWUlucHV0IGV4dGVuZHMgQmFzZUdhbWVJbnB1dCB7XHJcbiAgICAgICAgSW5wdXQoaXNSaWdodDogYm9vbGVhbikgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0xpc3RlbmVyKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fTGlzdGVuZXIuY2FsbCh0aGlzLl9Pd25lciwgaXNSaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX093bmVyOiBhbnk7XHJcbiAgICAgICAgcHJpdmF0ZSBfTGlzdGVuZXI6IChpc3Jpbmc6IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgICAgICAgY29uc3RydWN0b3Iob3duZXI6IGFueSA9IG51bGwsIGxpc3RlbmVyOiAoaXNyaW5nOiBib29sZWFuKSA9PiB2b2lkID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5fT3duZXIgPSBvd25lcjtcclxuICAgICAgICAgICAgdGhpcy5fTGlzdGVuZXIgPSBsaXN0ZW5lcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTm9ybUdhbWVJbnB1dCBleHRlbmRzIEJhc2VHYW1lSW5wdXQge1xyXG4gICAgICAgIEdhbWVEaXI6IEdhbWVTY2VuZVBsYXk7XHJcbiAgICAgICAgX0RpcnR5OiBib29sZWFuO1xyXG4gICAgICAgIF9Jc1JpZ2h0OiBib29sZWFuO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKGRpcjogR2FtZVNjZW5lUGxheSwgaW5wdXQ6IEJhc2VHYW1lSW5wdXQgPSBudWxsKSAge1xyXG4gICAgICAgICAgICBzdXBlcihpbnB1dCk7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZURpciA9IGRpcjtcclxuICAgICAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fSXNSaWdodCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBJbnB1dChpc1JpZ2h0OiBib29sZWFuKSAge1xyXG4gICAgICAgICAgICAvL3RoaXMuR2FtZURpci5Nb3ZlU3RlcChpc1JpZ2h0KTtcclxuICAgICAgICAgICAgdGhpcy5fRGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9Jc1JpZ2h0ID0gaXNSaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkgIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0RpcnR5ICYmIHRoaXMuR2FtZURpci5QbGF5ZXIuQmFzZUN0cmxlci5Jc0ZhbGxpbmcpICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HYW1lRGlyLk1vdmVTdGVwKHRoaXMuX0lzUmlnaHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENsZWFyKCkgIHtcclxuICAgICAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFN0ZXAgZnJvbSBcIi4vU3RlcFwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxudHlwZSBTdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW07XHJcblxyXG4gLyoq5L2c6ICFOk1vXHJcbiAq5Zy65pmv5YaF5a+56LGhIFxyXG4gKi9cclxuLy/nrqHnkIbkuIDmlbTooYxcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW91bnRMaW5lIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG57XHJcbiAgICBMYXlPdXREaXJ0eTpib29sZWFuO1xyXG4gICAgTGluZUlkeDpudW1iZXI7XHJcbiAgICBGbG9vck51bTpudW1iZXI7XHJcbiAgICBTdGVwTGlzdDpTdGVwW107XHJcbiAgICBMb2dpY0xlbmd0aDpudW1iZXI7XHJcbiAgICBTdGVwSXRlbTpTdGVwSXRlbTtcclxuICAgIHNldCBQb3NpdGlvbiggbmV3UFM6TGF5YS5WZWN0b3IzIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7ojrflj5bmmL7npLrlh7rmnaXnmoTnrKzlh6DkuKrlubPlj7BcclxuICAgIEdldFN0ZXAoaWR4Om51bWJlcik6U3RlcFxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlN0ZXBMaXN0W2lkeCArIDFdO1xyXG4gICAgfVxyXG4gICAgLy/orr7nva7mr4/lsYJcclxuICAgIFNldExpbmUoIGZsb29yOm51bWJlciApOnZvaWRcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLkxheU91dERpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB2YXIgbmV3UFMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICB2YXIgc3RlcExlbmd0aCA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgdmFyIHN0ZXBEaXN0YW5jZT0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlO1xyXG4gICAgICAgIG5ld1BTLnkgPSBzdGVwTGVuZ3RoKmZsb29yO1xyXG4gICAgICAgIG5ld1BTLnogPSAtc3RlcERpc3RhbmNlLzIgKmZsb29yO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICAgICAgdmFyIHN0ZXBBcnI6U3RlcFtdID0gdGhpcy5TdGVwTGlzdDtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgc3RhcnRYID0gMCAtIHN0ZXBBcnIubGVuZ3RoLzIgKiBzdGVwRGlzdGFuY2U7XHJcbiAgICAgICAgaWYodGhpcy5KdWdlSXNMZXNzTGluZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RhcnRYICs9IHN0ZXBEaXN0YW5jZS8yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIGZvciggdmFyIGNvbHVtbiA9MCA7Y29sdW1uPHN0ZXBBcnIubGVuZ3RoOysrY29sdW1uIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBuZXdTdGVwOlN0ZXAgPSBzdGVwQXJyW2NvbHVtbl07XHJcbiAgICAgICAgICAgIHZhciBzdGVwVmVjdG9yID0gbmV3U3RlcC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgc3RlcFZlY3Rvci54ID0gc3RhcnRYO1xyXG4gICAgICAgICAgICBpZih0aGlzLl9TZXRlZCYmKGNvbHVtbiA9PSAwfHxjb2x1bW4+dGhpcy5Mb2dpY0xlbmd0aCkpXHJcbiAgICAgICAgICAgICAgICBuZXdTdGVwLlJlc2V0U3RlcChzdGVwVmVjdG9yLHRydWUpXHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIG5ld1N0ZXAuUmVzZXRTdGVwKHN0ZXBWZWN0b3IpXHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBzdGVwRGlzdGFuY2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuX1NldGVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc3RlcEFyclswXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBzdGVwQXJyW3N0ZXBBcnIubGVuZ3RoIC0xXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9TZXRlZCA9IHRydWU7XHJcbiAgICAgICAgaWYoICEgdGhpcy5KdWdlSXNMZXNzTGluZSgpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IHN0ZXBBcnIubGVuZ3RoLTI7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0ZXBBcnJbc3RlcEFyci5sZW5ndGggLTJdLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLkxvZ2ljTGVuZ3RoID0gc3RlcEFyci5sZW5ndGggLTM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+WIpOaWreaYr+WQpuaUtue8qeeahOmCo+WxglxyXG4gICAgSnVnZUlzTGVzc0xpbmUoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRmxvb3JOdW0lMiAhPSAwO1xyXG4gICAgfVxyXG4gICAgLy/lsIbmr4/kuKroioLngrnpk77mjqXliLDkuIvkuIDlsYJcclxuICAgIFNldE5leHRGbG9vciggbGFzdEZsb29yOk1vdW50TGluZSk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5pyJ5Lik5aS056uv54K5XHJcbiAgICAgICAgdmFyIGhhdmVQb2ludCA9IGxhc3RGbG9vci5Mb2dpY0xlbmd0aCA+dGhpcy5Mb2dpY0xlbmd0aFxyXG4gICAgICAgIGZvciggdmFyIHN0YXJ0SWR4Om51bWJlciA9IDA7c3RhcnRJZHg8IHRoaXMuTG9naWNMZW5ndGg7KytzdGFydElkeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0UGFyZW50OlN0ZXAgPW51bGw7XHJcbiAgICAgICAgICAgIHZhciByaWdodFBhcmVudDpTdGVwID1udWxsO1xyXG4gICAgICAgICAgICBpZihoYXZlUG9pbnQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGxlZnRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgICAgICByaWdodFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4KzEpO1xyXG4gICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0UGFyZW50ID0gbGFzdEZsb29yLkdldFN0ZXAoc3RhcnRJZHgtMSk7XHJcbiAgICAgICAgICAgICAgICByaWdodFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdGhpU3RlcCA9IHRoaXMuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgIHRoaVN0ZXAuTGVmdFBhcmVudCA9IGxlZnRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGxlZnRQYXJlbnQuUmlnaHRDaGlsZCA9IHRoaVN0ZXA7XHJcblxyXG4gICAgICAgICAgICB0aGlTdGVwLlJpZ2h0UGFyZW50ID0gcmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgICAgIHJpZ2h0UGFyZW50LkxlZnRDaGlsZCA9IHRoaVN0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/mlbLnoo7kuIDlsYJcclxuICAgIEJyZWFrKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENvbnRpbnVlKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgUGF1c2UoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2V0ZWQ6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKGxpbmVJZHg6bnVtYmVyLGZsb29yOm51bWJlciA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGNvbHVtbnM6bnVtYmVyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTGluZVN0ZXBOdW07XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkxpbmVJZHggPSBsaW5lSWR4O1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB0aGlzLlN0ZXBMaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5Mb2dpY0xlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1NldGVkID0gZmFsc2U7XHJcbiAgICAgICAgZm9yKCB2YXIgU3RhcnRJZHg6bnVtYmVyID0gKGNvbHVtbnMgLTEpO1N0YXJ0SWR4Pj0wOy0tU3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N0ZXA6U3RlcCA9IG5ldyBTdGVwKHRoaXMsU3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ld1N0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXBMaXN0W1N0YXJ0SWR4XSA9IG5ld1N0ZXA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBQbGF5ZXJDb250cm9sZXIgfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgeyBDaGFyYWN0ZXIgfSBmcm9tIFwiLi9DaGFyYWN0ZXJcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiXHJcbmltcG9ydCBDaGFyYWN0ZXJNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi9HYW1lTW9kdWxlXCI7XHJcbnZhciBudW06IG51bWJlciA9IDA7XHJcbi8v6K+l6ISa5pys55So5LqO5ri45oiP546p5a625a+56LGh566h55CGXHJcbi8v546p5a625a+56LGhXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllciBleHRlbmRzIExheWEuU3ByaXRlM0Qge1xyXG4gICAgLy/np4HmnInlsZ7mgKdcclxuICAgIF9Mb2dpY1Bvc2l0aW9uOiBMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF9CdWZmTm9kZTogTGF5YS5TcHJpdGUzRDtcclxuICAgIHByaXZhdGUgX1BsYXllck1vZGVsOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBfQ3VyU3RlcDogU3RlcDtcclxuICAgIHByaXZhdGUgX0N0cmxlcjogUGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXI7XHJcbiAgICBwcml2YXRlIG1fQW5pbWF0b3I6IExheWEuQW5pbWF0b3I7XHJcbiAgICBwcml2YXRlIG1fQnVmZk1vZGVsOiB7IFtuYW1lOiBudW1iZXJdOiBMYXlhLlNwcml0ZTNEIH1cclxuICAgIHByaXZhdGUgbV9TdGF0ZU1hcDoge31cclxuXHJcbiAgICBCYXNlQ3RybGVyOiBQbGF5ZXJDb250cm9sZXIuUGxheWVyTm9ybUN0cmxlcjtcclxuICAgIEJ1ZmZBcnI6IEFycmF5PEl0ZW0uQmFzZVBsYXllckJ1ZmY+O1xyXG4gICAgSWROdW1iZXI6IG51bWJlcjtcclxuICAgIHB1YmxpYyBQbGF5ZXJEZWF0aDogYm9vbGVhbjtcclxuXHJcbiAgICBzZXQgQ3VyU3RlcChzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgdGhpcy5fQ3VyU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyU3RlcCgpOiBTdGVwIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU3RlcDtcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbihuZXdQUzogTGF5YS5WZWN0b3IzKSB7XHJcbiAgICAgICAgdmFyIG5ld1BTOiBMYXlhLlZlY3RvcjMgPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTogTGF5YS5WZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2dpY1Bvc2l0aW9uKCk6IExheWEuVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0xvZ2ljUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsID0ge307XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcyk7XHJcblxyXG4gICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbiAgICAgICAgdGhpcy5vbihMYXlhLkV2ZW50LlJFTU9WRUQsIHRoaXMsICgpID0+IHsgdGhpcy5kZXN0cm95KCkgfSlcclxuICAgICAgICB2YXIgbWdyOiBDaGFyYWN0ZXJNYW5hZ2VyID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgUGF1c2UoKSAge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcih0aGlzLCB0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5zcGVlZCA9IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ29udGludWUoKSAge1xyXG4gICAgICAgIHRoaXMuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMuX1VwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnNwZWVkID0gMTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbV9IZWFkTm9kZTogTGF5YS5TcHJpdGUzRDtcclxuXHJcbiAgICBwcml2YXRlIEluaXRCVWZmTW9kZWwocGxheWVyTW9kZWw6IExheWEuU3ByaXRlM0QpIHtcclxuICAgICAgICB0aGlzLl9QbGF5ZXJNb2RlbCA9IHBsYXllck1vZGVsO1xyXG4gICAgICAgIHRoaXMubV9IZWFkTm9kZSA9IG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICAgICAgdmFyIEhlYWROb2RlOiBMYXlhLlNwcml0ZTNEID0gcGxheWVyTW9kZWwuZ2V0Q2hpbGRCeU5hbWUoXCJoZWFkXCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLm1fSGVhZE5vZGUpO1xyXG4gICAgICAgIHRoaXMubV9IZWFkTm9kZS50cmFuc2Zvcm0ucG9zaXRpb24gPSBIZWFkTm9kZS50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLm1fSGVhZE5vZGUudHJhbnNmb3JtLnJvdGF0aW9uID0gSGVhZE5vZGUudHJhbnNmb3JtLnJvdGF0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5tX0hlYWROb2RlLnRyYW5zZm9ybS5zY2FsZSA9IEhlYWROb2RlLnRyYW5zZm9ybS5zY2FsZS5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuU2V0TW9kZWwoXCJpdGVtX2ZseWVyXzAxXCIsIFwiUl9oYW5kXCIsIHBsYXllck1vZGVsLCBJdGVtLkl0ZW1UeXBlLkZseSk7XHJcbiAgICAgICAgdGhpcy5TZXRNb2RlbChcIml0ZW1fc2hpZWxkXzAxXCIsIFwiaGVhZFwiLCBwbGF5ZXJNb2RlbCwgSXRlbS5JdGVtVHlwZS5Qcm90ZWN0KTtcclxuICAgICAgICB0aGlzLlNldE1vZGVsKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiLCBcImhlYWRcIiwgcGxheWVyTW9kZWwsIEl0ZW0uSXRlbVR5cGUuSG9seVByb3RlY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0TW9kZWwocmVzb3VyY2VOYW1lOiBzdHJpbmcsIG5vZGVOYW1lOiBzdHJpbmcsIHBsYXllck1vZGVsOiBMYXlhLlNwcml0ZTNELCBpdGVtVHlwZTogSXRlbS5JdGVtVHlwZSkge1xyXG4gICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldExIKHJlc291cmNlTmFtZSkpO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6IExheWEuU3ByaXRlM0QgPSBtb2RlbC5jbG9uZSgpO1xyXG5cclxuICAgICAgICBwbGF5ZXJNb2RlbC5nZXRDaGlsZEF0KDApLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgc3dpdGNoIChub2RlTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVhZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0hlYWROb2RlLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9BbmltYXRvci5saW5rU3ByaXRlM0RUb0F2YXRhck5vZGUobm9kZU5hbWUsIGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1ZmZNb2RlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsW2l0ZW1UeXBlXSA9IGJ1ZmZNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRmFjZU1vZGVsVG8ocm90YXRpb246IExheWEuUXVhdGVybmlvbikgIHtcclxuICAgICAgICB0aGlzLl9QbGF5ZXJNb2RlbC50cmFuc2Zvcm0ucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBNb2RlbFJvdGF0ZUV1bGFyKHZlY3RvcjpMYXlhLlZlY3RvcjMpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fUGxheWVyTW9kZWwudHJhbnNmb3JtLnJvdGF0aW9uRXVsZXI9IHZlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0UGxheWVyTW9kZWwobW9kZWw6IExheWEuU3ByaXRlM0QpIHtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKG1vZGVsKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygwLCAxODAsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvciA9IG1vZGVsLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIHZhciBsYXllcjogTGF5YS5NYXBMYXllciA9IHRoaXMubV9BbmltYXRvci5nZXRDb250cm9sbGVyTGF5ZXIoKS5fc3RhdGVzTWFwO1xyXG4gICAgICAgIHRoaXMubV9TdGF0ZU1hcCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLm1fU3RhdGVNYXBba2V5XSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSW5pdEJVZmZNb2RlbChtb2RlbCk7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5fQnVmZk5vZGUpXHJcbiAgICAgICAgICAgIHRoaXMuX0J1ZmZOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9CdWZmTm9kZSA9IG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9CdWZmTm9kZSk7XHJcbiAgICAgICAgdGhpcy5CdWZmQXJyID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5CYXNlQ3RybGVyID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJOb3JtQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IHRoaXMuQmFzZUN0cmxlcjtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygwLCAwKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLCB0aGlzLCB0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHZhciBkZWZhdWx0QW5pbVN0YXRlOiBMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLm1fQW5pbWF0b3IuZ2V0RGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgdmFyIHN0YXRlTmFtZTogc3RyaW5nID0gZGVmYXVsdEFuaW1TdGF0ZS5uYW1lO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KHN0YXRlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bnjqnlrrZCVUZGXHJcbiAgICAgKiBAcGFyYW0gaWR4IOanveS9jeajgOafpVxyXG4gICAgICogQHJldHVybnMg56m66KGo56S65rKh5pyJXHJcbiAgICAgKi9cclxuICAgIEdldEJ1ZmYoaWR4OiBudW1iZXIpOiBJdGVtLkJhc2VQbGF5ZXJCdWZmIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuQnVmZkFycltpZHhdICE9IG51bGwgJiYgdGhpcy5CdWZmQXJyW2lkeF0gIT0gdW5kZWZpbmVkKSA/IHRoaXMuQnVmZkFycltpZHhdIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoEJVRkZcclxuICAgICAqIEBwYXJhbSBidWZmIFxyXG4gICAgICovXHJcbiAgICBBZGRCdWZmKGJ1ZmY6IEl0ZW0uQmFzZVBsYXllckJ1ZmYpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgc2xvdDogbnVtYmVyID0gYnVmZi5TbG90O1xyXG4gICAgICAgIGlmICh0aGlzLkJ1ZmZBcnJbc2xvdF0pIHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZUJ1ZmYoc2xvdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYnVmZk1vZGVsOiBMYXlhLlNwcml0ZTNEID0gdGhpcy5tX0J1ZmZNb2RlbFtidWZmLlR5cGVdO1xyXG4gICAgICAgIGlmIChidWZmTW9kZWwpIHtcclxuICAgICAgICAgICAgYnVmZk1vZGVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkJ1ZmZBcnJbc2xvdF0gPSBidWZmO1xyXG4gICAgICAgIGJ1ZmYuU3RhcnQoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7k+adn0JVRkZcclxuICAgICAqL1xyXG4gICAgQ29tcGxldGVCdWZmKHNsb3Q6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBidWZmOiBJdGVtLkJhc2VQbGF5ZXJCdWZmID0gdGhpcy5CdWZmQXJyW3Nsb3RdO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6IExheWEuU3ByaXRlM0QgPSB0aGlzLm1fQnVmZk1vZGVsW2J1ZmYuVHlwZV07XHJcbiAgICAgICAgaWYgKGJ1ZmZNb2RlbCkgYnVmZk1vZGVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVmZkFycltzbG90XSA9IG51bGw7XHJcbiAgICAgICAgaWYgKGJ1ZmYgPT0gbnVsbCB8fCBidWZmID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ1ZmYuUmVtb3ZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pGG5pS+6KeS6ImyXHJcbiAgICBTZXRTdGVwKHB1dFN0ZXA6IFN0ZXApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBwdXRTdGVwO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHB1dFN0ZXAuUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBuZXdQUy55ICs9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljUG9zaXRpb24gPSBwdXRTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uU3RhbmQpKTtcclxuICAgICAgICB0aGlzLlRvdWNoR3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluIPlsYDlvZPliY3lsYLkvYbkuI3np7vliqhcclxuICAgICAqIEBwYXJhbSB7U3RlcH0gc3RlcCDkuIvkuIDmraXlj7DpmLZcclxuICAgICAqL1xyXG4gICAgTGF5U3RlcChzdGVwOiBTdGVwKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gc3RlcDtcclxuICAgICAgICB0aGlzLl9Mb2dpY1Bvc2l0aW9uID0gc3RlcC5Qb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBTdGFydE1vdmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5KdW1wKSk7XHJcbiAgICAgICAgdGhpcy5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEp1bXBEb3duKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uSnVtcGRvd24pKTtcclxuICAgIH1cclxuXHJcbiAgICBGbHkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5GbHkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+inpuWPkeWPsOmYtlxyXG4gICAgVG91Y2hHcm91bmQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyRGVhdGggfHwgIXRoaXMuQ3VyU3RlcCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgodGhpcy5DdXJTdGVwLlN0ZXBJdGVtLkl0ZW1UeXBlID09IEl0ZW0uSXRlbVR5cGUuTm9uZSkgJiYgKHRoaXMuQ3VyU3RlcC5Jc0VtcHR5IHx8ICh0aGlzLkN1clN0ZXAuTGVmdFBhcmVudCAmJiB0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQgJiYgdGhpcy5DdXJTdGVwLkxlZnRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbiAmJiB0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbikpKSB7XHJcbiAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgICAgICB2YXIgY2xpcE5hbWU6IHN0cmluZyA9IENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uRmFsbCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fU3RhdGVNYXBbY2xpcE5hbWVdKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoY2xpcE5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5Ub3VjaEl0ZW0odGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vliqhcclxuICAgICAqIEBwYXJhbSB7TGF5YS5WZWN0b3IzfSB2ZWN0b3Ig56e75Yqo5ZCR6YeP5YC8XHJcbiAgICAgKi9cclxuICAgIFRyYW5zbGF0ZSh2ZWN0b3I6IExheWEuVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnRyYW5zbGF0ZSh2ZWN0b3IsIGZhbHNlKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMuX0xvZ2ljUG9zaXRpb24sIHZlY3RvciwgdGhpcy5fTG9naWNQb3NpdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDnjqnlrrbmjqfliLblmahcclxuICAgICAqIEBwYXJhbSBuZXdDdHJsZXIg5paw546p5a625o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIEFkZEN0cmxlcihuZXdDdHJsZXI6IFBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N0cmxlcilcclxuICAgICAgICAgICAgdGhpcy5fQ3RybGVyLk9uQ29tcGxldGUoKTtcclxuICAgICAgICB2YXIgY3RybGVyOiBQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlciA9IHRoaXMuX0N0cmxlcjtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSBuZXdDdHJsZXI7XHJcbiAgICAgICAgbmV3Q3RybGVyLk5leHRDdHJsID0gY3RybGVyO1xyXG4gICAgICAgIG5ld0N0cmxlci5TZXRQbGF5ZXIodGhpcyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N0cmxlcilcclxuICAgICAgICAgICAgdGhpcy5fQ3RybGVyLk9uU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+S6pOaOp+WItuWZqFxyXG4gICAgICovXHJcbiAgICBQb3BDdHJsZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N0cmxlcilcclxuICAgICAgICAgICAgdGhpcy5fQ3RybGVyLk9uQ29tcGxldGUoKTtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLl9DdHJsZXIuTmV4dEN0cmw7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N0cmxlcilcclxuICAgICAgICAgICAgdGhpcy5fQ3RybGVyLk9uU3RhcnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBfVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckRlYXRoKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyLlVwZGF0ZSgpO1xyXG4gICAgICAgIGZvciAodmFyIGJ1ZmZJZHg6IG51bWJlciA9IDA7IGJ1ZmZJZHggPCAyOyArK2J1ZmZJZHgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQnVmZkFycltidWZmSWR4XSAhPSBudWxsIHx8IHRoaXMuQnVmZkFycltidWZmSWR4XSAhPSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICB0aGlzLkJ1ZmZBcnJbYnVmZklkeF0uVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEZseVByZXBhcmUoKSB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RlcERhdGEge1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuICAgIEdldERhdGEoc3RlcDogU3RlcCkge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmV4cG9ydCBtb2R1bGUgUGxheWVyQ29udHJvbGVyIHtcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUGxheWVyQ3RybGVyIHtcclxuICAgICAgICAvL+WFrOWFseaOpeWPo1xyXG4gICAgICAgIE5leHRDdHJsOiBCYXNlUGxheWVyQ3RybGVyO1xyXG4gICAgICAgIHBsYXllcjogUGxheWVyO1xyXG5cclxuICAgICAgICBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTZXRQbGF5ZXIocGxheWVyOiBQbGF5ZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllciwgY3RybGVyOiBCYXNlUGxheWVyQ3RybGVyID0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAoY3RybGVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGN0cmxlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5OZXh0Q3RybCA9IGN0cmxlcjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfVXBkYXRlKCk6IHZvaWQ7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IE9uU3RhcnQoKTogdm9pZDtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgT25Db21wbGV0ZSgpOiB2b2lkO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55So5LqO6KeS6Imy5q2j5bi454q25oCB5LiL55qE56e75YqoXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTm9ybUN0cmxlciBleHRlbmRzIEJhc2VQbGF5ZXJDdHJsZXIge1xyXG4gICAgICAgIHByaXZhdGUgbV9TdGFydFBTOiBMYXlhLlZlY3RvcjM7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1RhcmdldFBTOiBMYXlhLlZlY3RvcjM7XHJcbiAgICAgICAgcHJpdmF0ZSBnZXQgTWlkZGxlUFMoKTogTGF5YS5WZWN0b3IzIHtcclxuICAgICAgICAgICAgdmFyIG1pZGxlUFM6IExheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLmxlcnAodGhpcy5tX1N0YXJ0UFMsIHRoaXMubV9UYXJnZXRQUywgMC41LCBtaWRsZVBTKTtcclxuICAgICAgICAgICAgbWlkbGVQUy55ICs9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgICAgIHJldHVybiBtaWRsZVBTO1xyXG4gICAgICAgIH1cclxuICAgICAgICBJc0ZhbGxpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgVGltZTogbnVtYmVyO1xyXG4gICAgICAgIGdldCBMYXN0VGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFRpbWU6IG51bWJlciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lIC0gKHRoaXMuVGltZSAtIEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBsYXN0VGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoq5bey5raI6ICX5pe26Ze055m+5YiG5q+UICovXHJcbiAgICAgICAgZ2V0IFRpbWVQZXJjZW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkxhc3RUaW1lIC8gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuUGxheWVyTW92ZVRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihwbGF5ZXI6IFBsYXllciA9IG51bGwpIHtcclxuICAgICAgICAgICAgc3VwZXIocGxheWVyKVxyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT25TdGFydCgpOiB2b2lkICB7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPbkNvbXBsZXRlKCk6IHZvaWQgIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBTdGFydE1vdmUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1fU3RhcnRQUyA9IHRoaXMucGxheWVyLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm1fVGFyZ2V0UFMgPSB0aGlzLnBsYXllci5DdXJTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm1fVGFyZ2V0UFMueSArPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgcm90YXRpb246IExheWEuUXVhdGVybmlvbiA9IG5ldyBMYXlhLlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgdmFyIGxvb2tUb1BTID0gdGhpcy5tX1RhcmdldFBTLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGxvb2tUb1BTLnkgPSB0aGlzLm1fU3RhcnRQUy55O1xyXG4gICAgICAgICAgICBsb29rVG9QUy56ID0gLWxvb2tUb1BTLnpcclxuICAgICAgICAgICAgdmFyIHVwRGlyOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIHVwRGlyLnkgPSAxO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRQUzogTGF5YS5WZWN0b3IzID0gdGhpcy5tX1N0YXJ0UFMuY2xvbmUoKTtcclxuICAgICAgICAgICAgc3RhcnRQUy56ID0gLXN0YXJ0UFMuejtcclxuICAgICAgICAgICAgTGF5YS5RdWF0ZXJuaW9uLmxvb2tBdChzdGFydFBTLCBsb29rVG9QUywgdXBEaXIsIHJvdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuRmFjZU1vZGVsVG8ocm90YXRpb24pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5UaW1lIDw9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGltZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlNldFN0ZXAodGhpcy5wbGF5ZXIuQ3VyU3RlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VGltZTogbnVtYmVyID0gdGhpcy5MYXN0VGltZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmF0ZTogbnVtYmVyID0gdGhpcy5UaW1lUGVyY2VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW92ZVRpbWVSYXRlOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWxsVGltZVBvaW50OiBudW1iZXIgPSAwLjQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0UFM6IExheWEuVmVjdG9yMztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0UFM6IExheWEuVmVjdG9yMztcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmF0ZSA+IGZhbGxUaW1lUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzRmFsbGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuSnVtcERvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlRvdWNoR3JvdW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVRpbWVSYXRlID0gKHJhdGUgLSBmYWxsVGltZVBvaW50KSAvICgxIC0gZmFsbFRpbWVQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFBTID0gdGhpcy5tX1RhcmdldFBTO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBTID0gdGhpcy5NaWRkbGVQUztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVGltZVJhdGUgPSByYXRlIC8gZmFsbFRpbWVQb2ludDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UFMgPSB0aGlzLk1pZGRsZVBTO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBTID0gdGhpcy5tX1N0YXJ0UFM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5QbGF5ZXJEZWF0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQcyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgICAgICAgICBMYXlhLlZlY3RvcjMubGVycChzdGFydFBTLCB0YXJnZXRQUywgbW92ZVRpbWVSYXRlLCBuZXdQcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuUG9zaXRpb24gPSBuZXdQcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlRvdWNoR3JvdW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/njqnlrrbpo57ooYxcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJGbHkgZXh0ZW5kcyBCYXNlUGxheWVyQ3RybGVyIHtcclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueOqeWutlxyXG4gICAgICAgICAqIEBwYXJhbSBwbGF5ZXIg5pON5o6n6KeS6ImyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLlNldFBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuVHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCwgMCkpO1xyXG4gICAgICAgICAgICBwbGF5ZXIudHJhbnNmb3JtLnJvdGF0aW9uRXVsZXIgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCk7XHJcbiAgICAgICAgICAgIHBsYXllci5Nb2RlbFJvdGF0ZUV1bGFyKG5ldyBMYXlhLlZlY3RvcjMoMCwgMTgwLCAwKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgc3VwZXIobnVsbCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vdmFyIHZlY3RvciA9IG5ldyBMYXlhLlZlY3RvcjMoMCxDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoLC0xKkNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBEaXN0YW5jZS8yKTtcclxuICAgICAgICAgICAgLy8gTGF5YS5WZWN0b3IzLnNjYWxlKHZlY3Rvcix0aGlzLlNwZWVkLHZlY3Rvcik7XHJcbiAgICAgICAgICAgIHZhciB2ZWN0b3I6IExheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoMCwgMC4xNDYsIC0wLjEwMzk0KVxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5UcmFuc2xhdGUodmVjdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBPbkNvbXBsZXRlKCk6IHZvaWQgIHsgfVxyXG4gICAgICAgIHB1YmxpYyBPblN0YXJ0KCk6IHZvaWQgIHsgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuL01vdW50TGluZVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxudHlwZSBTdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW07XHJcbnR5cGUgTUxvY2F0aW9uID0gR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbi8v5q2lXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXAgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbntcclxuICAgIC8v5qih5Z6L5Liq5pWwXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0ZXBNb2RlbE51bTpudW1iZXIgPSAzO1xyXG5cclxuICAgIExlZnRQYXJlbnQ6U3RlcDtcclxuICAgIFJpZ2h0UGFyZW50OlN0ZXA7XHJcbiAgICBMZWZ0Q2hpbGQ6U3RlcDtcclxuICAgIFJpZ2h0Q2hpbGQ6U3RlcDtcclxuICAgIFN0ZXBJdGVtOlN0ZXBJdGVtO1xyXG4gICAgUm9hZE51bTpudW1iZXI7XHJcbiAgICBNYXJrOmFueTtcclxuICAgIEZsb29yOk1vdW50TGluZTtcclxuICAgIElkeDpudW1iZXI7XHJcbiAgICBcclxuICAgIC8v5YWs5pyJ5o6l5Y+jXHJcbiAgICBzZXQgUG9zaXRpb24oIG5ld1BTOkxheWEuVmVjdG9yMyApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2NhdGlvbigpOk1Mb2NhdGlvblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24odGhpcy5JZHgtMSx0aGlzLkZsb29yLkZsb29yTnVtKTtcclxuICAgIH1cclxuICAgIGdldCBJc0RlYWRSb2FkKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Jc0RlYWRSb2FkfHwhdGhpcy5hY3RpdmV8fCB0aGlzLlN0ZXBJdGVtLklzRGlmZmljdWx0eTtcclxuICAgIH1cclxuICAgIHNldCBJc0RlYWRSb2FkKHZhbHVlOmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRm9yYmlkZW4oKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU3RlcEl0ZW0uSXNGb3JiaWRlbjtcclxuICAgIH1cclxuICAgIGdldCBJc0VtcHR5KCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAhKHRoaXMuYWN0aXZlJiZ0aGlzLkZsb29yLmFjdGl2ZSk7XHJcbiAgICB9XHJcbiAgICBQdXRJdGVtKCBpdGVtRW51bWU6SXRlbS5JdGVtVHlwZSApXHJcbiAgICB7XHJcbiAgICAgICAgaWYoaXRlbUVudW1lID09IEl0ZW0uSXRlbVR5cGUuRW1wdHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9ZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlB1dEl0ZW0oaXRlbUVudW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBSZXNldFN0ZXAobmV3UHM6TGF5YS5WZWN0b3IzLGlnbm9yZUFjdGl2ZTpib29sZWFuID0gZmFsc2UpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BzO1xyXG4gICAgICAgIGlmKCFpZ25vcmVBY3RpdmUpXHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB2YXIgbW9kZWxQcyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUHV0SXRlbShJdGVtLkl0ZW1UeXBlLk5vbmUpO1xyXG5cclxuICAgICAgICB0aGlzLkxlZnRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlJvYWROdW0gPSAwO1xyXG4gICAgfVxyXG4gICAgX1N0ZXBNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgY29uc3RydWN0b3IoZmxvb3I6TW91bnRMaW5lLGlkeDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgLy9zdXBlcihuZXcgTGF5YS5Cb3hNZXNoKDEsMSwxKSApO1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcyk7XHJcbiAgICAgICAgaWYodGhpcy5JZHggIT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDErIE1hdGgucmFuZG9tKCkqU3RlcC5zdGVwTW9kZWxOdW0pO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTpzdHJpbmcgPSBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzBcIitJZHgpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9tb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRCggTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjUsIDAuNSwgMC41KSkgOy8vbG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY2xvbmVNb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgY2xvbmVNb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChjbG9uZU1vZGVsKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtID0gSXRlbS5TdGVwSXRlbUZhY3RvcnkoSXRlbS5JdGVtVHlwZS5Ob25lLHRoaXMpOztcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlJlc2V0SXRlbSgpO1xyXG4gICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICB0aGlzLklkeCA9IGlkeDtcclxuXHJcbiAgICAgICAgdGhpcy5MZWZ0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxlZnRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodENoaWxkID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9hZE51bSA9IDA7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9Jc0RlYWRSb2FkOmJvb2xlYW47XHJcblxyXG59IiwiLyoqXHJcbiAqIOS9nOiAhTpNb1xyXG4gKiDlkK/liqjlnLrmma9cclxuICovXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBMb2FkU2NlbmUgZnJvbSBcIi4vU2NlbmUvTG9hZFNjZW5lXCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCI7XHJcbmNsYXNzIEdhbWVcclxue1xyXG5cdF9GcmFtZTpGcmFtZVdvcms7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNzID0gQVBQO1xyXG4gICAgICAgIExheWEzRC5pbml0KDc1MCwxMzM0LHRydWUpO1xyXG4gICAgICAgIEdhbWVDb25maWcuaW5pdCgpO1xyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZJWEVEX1dJRFRIO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IExheWEuU3RhZ2UuU0NSRUVOX1ZFUlRJQ0FMO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25WID0gTGF5YS5TdGFnZS5BTElHTl9CT1RUT007XHJcbiAgICAgICAgLy/lvIDlkK/nu5/orqHkv6Hmga9cclxuXHRcdExheWEuU3RhdC5oaWRlKCk7XHJcbiAgICAgICAgdmFyIHJlc0NvbCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvbG9jYWxjb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU30se3VybDpcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfV07XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChyZXNDb2wsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkZWQoKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5Jbml0KCk7XHJcbiAgICAgICAgdmFyIHNjZW5lTWdyOlNjZW5lTWFuYWdlciA9IEFQUC5TY2VuZU1hbmFnZXI7XHJcbiAgICAgICAgc2NlbmVNZ3IuQ2hhbmdlU2NlbmUobmV3IExvYWRTY2VuZSgpKTtcclxuICAgICAgICBMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5VcGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSggKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5GcmFtZVdvcmsuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxudmFyIEdNID0gbmV3IEdhbWUoKTtcclxuIiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuaW1wb3J0IENoYXJhY3Rlck1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyL0NoYXJhY3Rlck1hbWFnZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlclVJU2NlbmUgZXh0ZW5kcyBMYXlhLlNjZW5lM0R7XHJcblxyXG4gICAgcHVibGljIGFycmF5RGlzOkxheWEuU3ByaXRlM0RbXSA9IFtdO1xyXG4gICAgcHVibGljIGNudE51bSA9IDU7XHJcbiAgICBwdWJsaWMgc3RhcnRhbyA9IDkwO1xyXG4gICAgcHVibGljIHBlcmFvID0gMzYwIC8gdGhpcy5jbnROdW07XHJcbiAgICBwdWJsaWMgciA9IDAuMDQ7XHJcbiAgICBwdWJsaWMgc3RhcnRZID0gLTAuMDI7XHJcbiAgICBwdWJsaWMgY250U2VsZWN0SW5kZXggPSAwO1xyXG5cclxuICAgIHB1YmxpYyBjYW1lcmE6TGF5YS5DYW1lcmE7XHJcbiAgICBwdWJsaWMgY250c3RhcnRhbyA9IDkwO1xyXG4gICAgcHVibGljIG1vdmVTdGFyYW8gPSAyO1xyXG4gICAgcHVibGljIG5leHRBbyA9IC0xO1xyXG4gICAgcHVibGljIGluaXRTY2FsTnVtID0gMC4wMTg7XHJcblxyXG4gICAgcHVibGljIG1vdmVDYWxsQmFjaztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjbnRTZWxlY3RJbmRleCwgbW92ZUNhbGxCYWNrKSB7IFxyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9IGNudFNlbGVjdEluZGV4O1xyXG4gICAgICAgIHRoaXMubW92ZUNhbGxCYWNrID0gbW92ZUNhbGxCYWNrO1xyXG4gICAgICAgIHRoaXMuYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IHRoaXMuYWRkQ2hpbGQobmV3IExheWEuQ2FtZXJhKDAsIDAuMSwgMC4zKSkgYXMgTGF5YS5DYW1lcmE7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDAuMikpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMyggMCwgMCwgMCksIHRydWUsIGZhbHNlKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRMSChcImMwMDFfY2hpbGRfMDFcIikpO1xyXG4gICAgICAgIC8vIHZhciBtb2RlbDE6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wNFwiKSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpID0gMCA7aSA8IHRoaXMuY250TnVtO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoYXJhY3Rlck1vZGVsID0gIENoYXJhY3Rlck1hbmFnZXIuTWdyLkdldENoYXJhY3Rlck1vZGVsKGkpO1xyXG4gICAgICAgICAgICB2YXIgYXVkdDpMYXlhLlNwcml0ZTNEID0gY2hhcmFjdGVyTW9kZWw7XHJcbiAgICAgICAgICAgIGF1ZHQudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKHRoaXMuaW5pdFNjYWxOdW0sIHRoaXMuaW5pdFNjYWxOdW0sIHRoaXMuaW5pdFNjYWxOdW0pO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGF1ZHQpO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzLnB1c2goYXVkdCk7XHJcblxyXG4gICAgICAgICAgICAvLyB2YXIgYW8gPSAodGhpcy5zdGFydGFvICsgaSAqIHRoaXMucGVyYW8pICUgMzYwXHJcbiAgICAgICAgICAgIC8vIHZhciB4ID0gdGhpcy5yICogTWF0aC5jb3MoYW8gKiAzLjE0IC8gMTgwKTtcclxuICAgICAgICAgICAgLy8gdmFyIHkgPSB0aGlzLnN0YXJ0WSArIHRoaXMuciAqIE1hdGguc2luKGFvICogMy4xNCAvIDE4MCk7XHJcbiAgICAgICAgICAgIC8vIGF1ZHQudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMyh4LCB5LCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9ICh0aGlzLmNudFNlbGVjdEluZGV4ICsgNSkgJSA1O1xyXG4gICAgICAgIHRoaXMubmV4dEFvID0gKHRoaXMuc3RhcnRhbyArICh0aGlzLmNudE51bSAtIHRoaXMuY250U2VsZWN0SW5kZXgpICogdGhpcy5wZXJhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3QoKTtcclxuICAgICB9XHJcblxyXG4gICAgY2FsQ250U3RhcnRhbygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gKHRoaXMuY250U2VsZWN0SW5kZXggKyA1KSAlIDU7XHJcbiAgICAgICAgdGhpcy5uZXh0QW8gPSAodGhpcy5zdGFydGFvICsgKHRoaXMuY250TnVtIC0gdGhpcy5jbnRTZWxlY3RJbmRleCkgKiB0aGlzLnBlcmFvICsgMzYwKSAlIDM2MDtcclxuXHJcbiAgICAgICAgaWYoKHRoaXMubmV4dEFvIC0gdGhpcy5jbnRzdGFydGFvICsgMzYwKSAlIDM2MCA+PSAxODApIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RhcmFvID0gLTJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RhcmFvID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDAuMDUsIHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aW1lQW9DaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5jbnRzdGFydGFvID09IHRoaXMubmV4dEFvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9IHRoaXMubmV4dEFvO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRBbyA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDYWxsQmFjayAmJiB0aGlzLm1vdmVDYWxsQmFjaygxKTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxhc2NudEFvID0gdGhpcy5jbnRzdGFydGFvO1xyXG4gICAgICAgIHRoaXMuY250c3RhcnRhbyArPSB0aGlzLm1vdmVTdGFyYW87XHJcbiAgICAgICAgaWYodGhpcy5jbnRzdGFydGFvIDwgMCB8fCB0aGlzLmNudHN0YXJ0YW8gPT0gMzYwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9ICh0aGlzLmNudHN0YXJ0YW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgICAgICBsYXNjbnRBbyA9IHRoaXMuY250c3RhcnRhbyAtIHRoaXMubW92ZVN0YXJhbztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gKHRoaXMuY250c3RhcnRhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKChsYXNjbnRBbyA+PSB0aGlzLm5leHRBbyAmJiB0aGlzLmNudHN0YXJ0YW8gPD0gdGhpcy5uZXh0QW8pIHx8IChsYXNjbnRBbyA8PSB0aGlzLm5leHRBbyAmJiB0aGlzLmNudHN0YXJ0YW8gPj0gdGhpcy5uZXh0QW8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9IHRoaXMubmV4dEFvO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRBbyA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm5leHRBbyA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDYWxsQmFjayAmJiB0aGlzLm1vdmVDYWxsQmFjaygxKTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IHRoaXMuYXJyYXlEaXMubGVuZ3RoO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIGFvID0gKHRoaXMuY250c3RhcnRhbyArIGkgKiB0aGlzLnBlcmFvKSAlIDM2MFxyXG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuciAqIE1hdGguY29zKGFvICogMy4xNCAvIDE4MCk7XHJcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5zdGFydFkgKyB0aGlzLnIgKiBNYXRoLnNpbihhbyAqIDMuMTQgLyAxODApO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoeCwgeSwgMCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2NhbGUgPSAwLjIgKiB5O1xyXG4gICAgICAgICAgICBpZihzY2FsZSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gbmV3IExheWEuVmVjdG9yMyh0aGlzLmluaXRTY2FsTnVtICsgc2NhbGUsIHRoaXMuaW5pdFNjYWxOdW0gKyBzY2FsZSwgdGhpcy5pbml0U2NhbE51bSArIHNjYWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjModGhpcy5pbml0U2NhbE51bSwgdGhpcy5pbml0U2NhbE51bSwgdGhpcy5pbml0U2NhbE51bSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW92ZUNhbGxCYWNrICYmIHRoaXMubW92ZUNhbGxCYWNrKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsZWFyUm9hdGVUaW1lcigpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0Um9sZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4IC0tO1xyXG4gICAgICAgIHRoaXMuY2FsQ250U3RhcnRhbygpO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIG5leHRSb2xlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggKys7XHJcbiAgICAgICAgdGhpcy5jYWxDbnRTdGFydGFvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZWN0SW5kZXgoc2VsZWN0SW5kZXg6bnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYoc2VsZWN0SW5kZXggPT0gdGhpcy5jbnRTZWxlY3RJbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSBzZWxlY3RJbmRleDtcclxuICAgICAgICB0aGlzLmNhbENudFN0YXJ0YW8oKTtcclxuICAgIH0gXHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgIH1cclxufSIsImltcG9ydCB7U2NlbmV9IGZyb20gXCIuL1NjZW5lXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEdhbWVTY2VuZVBsYXkgZnJvbSBcIi4vU2NlbmVQbGF5L0dhbWVTY2VuZVBsYXlcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVEaXJlY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvciB7XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVQbGF5KCk6R2FtZVNjZW5lUGxheVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clN0YXRlIGFzIEdhbWVTY2VuZVBsYXk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZExpc3QyRCA9IFtwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVcIikscGF0aC5HZXREZXBhdGhVSUpTKFwiRW5kR2FtZVwiKV07XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VTdGF0ZShuZXcgU2NlbmUuTG9hZFNjZW5lTG9naWMobG9hZExpc3QyRCxudWxsLG5ldyBHYW1lU2NlbmVQbGF5KCkpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiLypcclxu5L2c6ICFOk1vXHJcbui3s+Wxsee+iuWcuuaZr+aguOW/g+WKn+iDvVxyXG4qL1xyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW50ZXJHYW1lVUlcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7SW5wdXR9IGZyb20gXCIuLy4uL0dhbWUvSW5wdXRcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi8uLi91aS9HYW1lVUlcIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuLy4uL0dhbWUvTW91bnRMaW5lXCJcclxuaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vLi4vR2FtZS9TdGVwXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiO1xyXG50eXBlIEl0ZW1MYXlvdXQgPSBJdGVtLkl0ZW1MYXlvdXQ7XHJcbnR5cGUgTGluZUl0ZW1JbmZvID0gSXRlbS5MaW5lSXRlbUluZm87XHJcbnZhciBJdGVtVHlwZSA9IEl0ZW0uSXRlbVR5cGU7XHJcbi8v5ri45oiP5Zy65pmvXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVxyXG57XHJcbiAgICBNb2RlbExvYWQ6Ym9vbGVhbjtcclxuICAgIEdhbWVEaXI6R2FtZURpcmVjdG9yO1xyXG4gICAgcHJvdGVjdGVkIEdlbkRpcmVjdG9yKCk6R2FtZURpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBHYW1lRGlyZWN0b3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1NjZW5lT2JqID0gbmV3IExheWEuU2NlbmUzRDtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsImltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLi9jb250cm9sZXIvQVBQXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWlkZXJNYW5hZ2VyIFxyXG57XHJcbi8v5a+55aSW5o6l5Y+jXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTWdyOkd1aWRlck1hbmFnZXI7XHJcbiAgICBzdGF0aWMgZ2V0IE1ncigpOkd1aWRlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZihHdWlkZXJNYW5hZ2VyLl9NZ3IgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEd1aWRlck1hbmFnZXIuX01nciA9IG5ldyBHdWlkZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHdWlkZXJNYW5hZ2VyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBTY2VuZU1ncjpTY2VuZU1hbmFnZXI7XHJcbiAgICBDdXJTY2VuZTpHdWlkZXJTY2VuZTtcclxuICAgIHB1YmxpYyBnZXQgR2FtZURpcigpOkd1aWRlckRpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ3VyU2NlbmUuR3VpZERpcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR3VpZGVyU2NlbmUoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkNoYW5nZVNjZW5lKG5ld0dhbWVTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG5ld0dhbWVTY2VuZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJTY2VuZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVxyXG57XHJcbiAgICBHdWlkRGlyOkd1aWRlckRpcmVjdG9yO1xyXG4gICAgQ3VyRGlyOkJhc2VEaXJlY3RvcjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICB2YXIgRGlyZWN0b3I6U2NlbmUuQmFzZURpcmVjdG9yID0gbmV3IEd1aWRlckRpcmVjdG9yKCk7XHJcbiAgICAgICAgcmV0dXJuIERpcmVjdG9yO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJEaXJlY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxvYWQyRExpc3QgPSBbe3VybDpwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSAsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKSx0eXBlOiBMYXlhLkxvYWRlci5BVExBUyB9XTtcclxuICAgICAgICB0aGlzLkNoYW5nZUdhbWVQbGF5KG5ldyBTY2VuZS5Mb2FkU2NlbmVMb2dpYyhsb2FkMkRMaXN0LG51bGwsbmV3IEd1aWRlclNjZW5lUGxheSgpKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIEVuZCgpOnZvaWRcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlclNjZW5lUGxheSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllXHJcbntcclxuICAgIFVJOkVudGVyR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9ICAgIFxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJID0gQVBQLlVJTWFuYWdlci5TaG93PEVudGVyR2FtZVVJPihFbnRlckdhbWVVSSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBCYXNlU2NlbmUgZnJvbSBcIi4vQmFzZVNjZW5lXCJcclxuaW1wb3J0IEJhc2VEaXJlY3RvciBmcm9tIFwiLi9CYXNlRGlyZWN0b3JcIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi8uLi91aS9sYXlhTWF4VUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IExvYWRpbmdVSSBmcm9tIFwiLi8uLi91aS9VbkRvd25sb2FkL0xvYWRpbmdVSVwiXHJcbmltcG9ydCBGTVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuL0d1aWRlck1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQkcgZnJvbSBcIi4vLi4vdWkvQkdcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZFNjZW5lIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IExvYWREaXJjdG9yKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuY2xhc3MgTG9hZERpcmN0b3IgZXh0ZW5kcyBTY2VuZS5CYXNlRGlyZWN0b3Jcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZExpc3QyRCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6XCJ1aS9SZXNvdXJjZS9sb2NhbGNvbXAuYXRsYXNcIix0eXBlOkxheWEuTG9hZGVyLkFUTEFTfV07XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VHYW1lUGxheSggbmV3IFNjZW5lLkxvYWRTY2VuZUxvZ2ljKGxvYWRMaXN0MkQsbnVsbCxuZXcgTG9hZFNjZW5lUGxheWUoKSkgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgUmVTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgIH1cclxufVxyXG5cclxuLy/liqDovb3lnLrmma/pgLvovpFcclxuY2xhc3MgTG9hZFNjZW5lUGxheWUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVQbGF5ZVxyXG57XHJcbiAgICBwcml2YXRlIG1fQ291bnQyRExvYWQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50M0RMb2FkOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Mb2FkRmFpbGU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50VmFsdWU6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0xvYWRpbmdVSTpMb2FkaW5nVUk7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID0gMDtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlID0gXCJcIjtcclxuICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTdGFydExvYWQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Db3VudFZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlID0gXCJcIjtcclxuICAgICAgICB2YXIgcmVzb3VyY2UyREFyciA9IFtcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiRW50ZXJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVSYW5rXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJTZXRQYW5lbFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcInRvb2xJdGVtXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJDaGFyYWN0ZXJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlBsYXllckxpc3RcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkJHXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJlbnRlcnNjZW5ldWlcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImVudGVyc2NlbmV1aS9yZXMxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJlbnRlcnNjZW5ldWkvcmVzMlwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIkNoYXJhY3RlckluZm9cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0SnNvblBhdGgoXCJJdGVtSW5mb1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIkxldmVsSW5mb1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIk9ic3RhY2xlSW5mb1wiKVxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEubG9hZGVyLm9uY2UoTGF5YS5FdmVudC5FUlJPUix0aGlzLHRoaXMub25FcnJvcik7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5vbkNvbXBsZXRlKTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UzREFyciA9IFsgXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJjMDAxX2NoaWxkXzAxXCIpICxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDFfYWR1bHRfMDFcIikgLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9iYXJyaWVyXzA0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9jb2luXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfY2hvbXBlcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX3N0aW5nXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRfMDFcIiksXHJcbiAgICAgICAgXVxyXG4gICAgICAgIHRoaXMuTG9hZChyZXNvdXJjZTJEQXJyLHJlc291cmNlM0RBcnIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgTG9hZChhcnIyRDpBcnJheTxhbnk+ID0gbnVsbCxhcnIzRDpBcnJheTxhbnk+PW51bGwpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoYXJyMkQhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKGFycjJELG51bGwsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub24yRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgLT0wLjU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFycjNEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIuY3JlYXRlKGFycjNELExheWEuSGFuZGxlci5jcmVhdGUodGhpcyxudWxsKSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbjNEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSAtPTAuNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbjNEUHJvZ3Jlc3ModmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMubV9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9dmFsdWUvMjtcclxuICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLlZhbHVlID0gKHRoaXMubV9Db3VudDJETG9hZCArIHRoaXMubV9Db3VudDNETG9hZCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uMkRQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuVmFsdWUgPSAodGhpcy5tX0NvdW50MkRMb2FkICsgdGhpcy5tX0NvdW50M0RMb2FkKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25FcnJvcihzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgKz0gc3RyO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJMb2FkRXJyb3I6XCIrc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Db21wbGV0ZShkYXRhKVxyXG4gICAgeyAgIFxyXG4gICAgICAgIGlmKHRoaXMubV9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGhpRGlyID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5SZWxvYWQodGhpcy5tX0xvYWRGYWlsZSxmdW5jdGlvbigpOnZvaWR7dGhpRGlyLkxvYWQoKX0gKTtcclxuICAgICAgICB9ZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5CRyA9IG5ldyBCRygpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLkNvbXBsZXRlKCgpPT57R3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fTG9hZGluZ1VJID0gQVBQLlVJTWFuYWdlci5TaG93PExvYWRpbmdVST4oTG9hZGluZ1VJKTtcclxuICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMC41O1xyXG4gICAgICAgIHRoaXMubV9Db3VudFZhbHVlID0gMTtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlID0gXCJcIjtcclxuICAgICAgICB0aGlzLlN0YXJ0TG9hZCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkxvYWRDb21wbGV0ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEZTTSB9IGZyb20gXCIuLy4uL0Jhc2UvRlNNXCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcbmV4cG9ydCBtb2R1bGUgU2NlbmUge1xyXG4gICAgZXhwb3J0IGNsYXNzIFNjZW5lRlNNIGV4dGVuZHMgRlNNLkZTTTxCYXNlU2NlbmU+XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Zy65pmv5Luj55CGXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVNjZW5lIGV4dGVuZHMgRlNNLlN0YXRlIHtcclxuICAgICAgICBwcml2YXRlIF9TdGFydEdhbWVUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDbG9jazogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgbV9TY2VuZU9iajogTGF5YS5TY2VuZTNEO1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0RpcmVjdG9yOiBCYXNlRGlyZWN0b3I7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXQgU2NlbmVPYmooKTogTGF5YS5TY2VuZTNEIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9TY2VuZU9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBEaXJlY3RvcigpOiBCYXNlRGlyZWN0b3Ige1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0RpcmVjdG9yO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IEdlbkRpcmVjdG9yKCk6IEJhc2VEaXJlY3RvcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2UgPSBGcmFtZVdvcmsuRk0uR2V0TWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1dE9iaihzcHJpdGUzRDogTGF5YS5TcHJpdGUzRCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX1NjZW5lT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fU2NlbmVPYmouYWRkQ2hpbGQoc3ByaXRlM0QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCYXNlU2NlbmUgUHV0T2JqIEVycm9yOmVtcHR5IFNwcml0ZTNEXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaXJlY3RvciA9IHRoaXMuR2VuRGlyZWN0b3IoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yLlN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW5kKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TY2VuZU9iai5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5TY2VuZU9iai5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RvciA9IHRoaXMuU2NlbmVPYmouZ2V0Q2hpbGRBdCgwKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5EaXJlY3Rvci5FbmQoKTtcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9EaXJlY3RvcilcclxuICAgICAgICAgICAgICAgIHRoaXMubV9EaXJlY3Rvci5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRGlyZWN0b3IgZXh0ZW5kcyBGU00uRlNNPEJhc2VTY2VuZVBsYXllPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0R2FtZVRpbWU6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENsb2NrOiBudW1iZXI7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcblxyXG4gICAgICAgIC8v56eB5pyJ5bGe5oCn5ZKM5Yqf6IO9XHJcbiAgICAgICAgZ2V0IEdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9UaW1lVXBDbG9jayAtIHRoaXMuX1N0YXJ0R2FtZVRpbWUgLSB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgLSB0aGlzLl9TdGFydEdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IEdhbWVUaW1lKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgQ3VyR2FtZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1N0YXJ0R2FtZVRpbWUgKyB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0VGltZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0VGltZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBTdGFydCgpOiB2b2lkIDtcclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IEVuZCgpOiB2b2lkO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGltZVVwKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGltZVVwQ2xvY2sgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lVGltZVVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGltZVVwQ2xvY2sgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBDb250aW51ZVRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vQVBQLk1lc3NhZ2VDZW50ZXIuVHJpZ2dlcihHYW1lRXZlbnQuR2FtZUNvbnRpbnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgKz0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ2xvY2s7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIh+aNouWJp+acrFxyXG4gICAgICAgICAqIEBwYXJhbSBuZXdTY2VuZVBsYXkg5paw5Ymn5pysXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIENoYW5nZUdhbWVQbGF5KCBuZXdTY2VuZVBsYXk6QmFzZVNjZW5lUGxheWUgKTogdm9pZCAge1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVN0YXRlKG5ld1NjZW5lUGxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmVQbGF5ZSBleHRlbmRzIEZTTS5TdGF0ZSB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkU2NlbmVMb2dpYyBleHRlbmRzIEJhc2VTY2VuZVBsYXllIHtcclxuICAgICAgICBwcml2YXRlIG1fTG9hZDJETGlzdDogYW55W107XHJcbiAgICAgICAgcHJpdmF0ZSBtX0xvYWQzRExpc3Q6IGFueVtdO1xyXG4gICAgICAgIHByaXZhdGUgbV9OZXh0U2NlbmU6IFNjZW5lLkJhc2VTY2VuZVBsYXllO1xyXG4gICAgICAgIHB1YmxpYyBnZXQgT3duZXJEaXJlY3RvcigpOiBCYXNlRGlyZWN0b3Ige1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX293bmVyIGFzIEJhc2VEaXJlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGxvYWQyRExpc3QgMkTliqDovb3liJfooahcclxuICAgICAgICAgKiBAcGFyYW0gbG9hZDNETGlzdCAzROWKoOi9veWIl+ihqFxyXG4gICAgICAgICAqIEBwYXJhbSBuZXh0U2NlbmUg5LiL5LiA5qC85Zy65pmvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IobG9hZDJETGlzdDogYW55W10sIGxvYWQzRExpc3Q6IGFueVtdLCBuZXh0U2NlbmU6IFNjZW5lLkJhc2VTY2VuZVBsYXllKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkMkRMaXN0ID0gbG9hZDJETGlzdDtcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWQzRExpc3QgPSBsb2FkM0RMaXN0O1xyXG4gICAgICAgICAgICB0aGlzLm1fTmV4dFNjZW5lID0gbmV4dFNjZW5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW5kKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydCgpIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLCB0aGlzLCB0aGlzLkxvYWRDb21wbGV0ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fTG9hZDJETGlzdClcclxuICAgICAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQodGhpcy5tX0xvYWQyRExpc3QsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0xvYWQzRExpc3QpXHJcbiAgICAgICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMubV9Mb2FkM0RMaXN0LCBudWxsLCBudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTG9hZENvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLk93bmVyRGlyZWN0b3IuQ2hhbmdlU3RhdGUodGhpcy5tX05leHRTY2VuZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vLi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgQmFzZVNjZW5lIGZyb20gXCIuLy4uL0Jhc2VTY2VuZVwiXHJcbmltcG9ydCBCYXNlRGlyZWN0b3IgZnJvbSBcIi4vLi4vQmFzZURpcmVjdG9yXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi8uLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vLi4vLi4vR2FtZS9Nb3VudExpbmVcIlxyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQkdVSSBmcm9tIFwiLi8uLi8uLi91aS9CR1wiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEdhbWVTY2VuZSBmcm9tIFwiLi4vR2FtZVNjZW5lXCI7XHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLy4uLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcbmltcG9ydCBHYW1lQVBQIGZyb20gXCIuLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiO1xyXG5pbXBvcnQgeyBXZWNoYXRPcGVuIH0gZnJvbSBcIi4uLy4uL3BsYXRmb3JtL1dlY2hhdE9wZW5cIjtcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4uLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuXHJcbnR5cGUgSXRlbUxheW91dCA9IEl0ZW0uSXRlbUxheW91dDtcclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuXHJcbi8v5ri45oiP5a+85ryUXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZVBsYXkgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVQbGF5ZSB7XHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBfSGVhZEZsb29ySWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9UYWlsRkxvb3JJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0NvdW50VGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQm9vdG9tRmxvb3I6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX1N0YXJ0UG9zaXRpb246IExheWEuVmVjdG9yMztcclxuICAgIHByaXZhdGUgX0dhbWVVcGRhdGU6ICgpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9QYW5lbFVJOiBHYW1lVUk7XHJcbiAgICBwcml2YXRlIG1fR29sZE51bTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfTG9naWNHb2xkTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9DdXJCRzogQkdVSTtcclxuICAgIHByaXZhdGUgX1NhZmVMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcblxyXG4gICAgQ2FtZXJhOiBHYW1lQ2FtZXJhO1xyXG4gICAgR2FtZVNjZW5lOiBCYXNlU2NlbmU7XHJcbiAgICBNb3VudExpbmVzOiBNb3VudExpbmVbXTtcclxuICAgIFBsYXllcjogUGxheWVyO1xyXG4gICAgSW5wdXRDdHJsOiBJbnB1dC5CYXNlR2FtZUlucHV0O1xyXG4gICAgSXRlbUxheW91dDogSXRlbUxheW91dDtcclxuICAgIEN1ckxpbmVSZXdhcmRzOiBBcnJheTxMaW5lSXRlbUluZm8+O1xyXG4gICAgQ3VyTGluZUJhcnJpZXJzOiBBcnJheTxMaW5lSXRlbUluZm8+O1xyXG4gICAgbmFtZTogbnVtYmVyO1xyXG4gICAgRnJlc2hCR0NvdW50OiBudW1iZXI7XHJcblxyXG4gICAgZ2V0IFNhZmVMb2NhdGlvbigpOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NhZmVMb2NhdGlvbjtcclxuICAgIH1cclxuICAgIGdldCBQYW5lbFVJKCk6IEdhbWVVSSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1BhbmVsVUk7XHJcbiAgICB9XHJcbiAgICBzZXQgUGFuZWxVSSh2YWx1ZTogR2FtZVVJKSB7XHJcbiAgICAgICAgdmFsdWUuU2V0TGVmdFRvdWNoKHRoaXMsICgpID0+IHsgdGhpcy5JbnB1dEN0cmwuSW5wdXQoZmFsc2UpOyB9KVxyXG4gICAgICAgIHZhbHVlLlNldFJpZ2h0VG91Y2godGhpcywgKCkgPT4geyB0aGlzLklucHV0Q3RybC5JbnB1dCh0cnVlKTsgfSk7XHJcbiAgICAgICAgdGhpcy5fUGFuZWxVSSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IEhlYWRGbG9vcigpOiBNb3VudExpbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLk1vdW50TGluZXNbdGhpcy5fSGVhZEZsb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBUYWlsRkxvb3IoKTogTW91bnRMaW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb3VudExpbmVzW3RoaXMuX1RhaWxGTG9vcklkeF07XHJcbiAgICB9XHJcbiAgICBnZXQgUGxheWVyRmxvb3IoKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgZmxvb3I6IG51bWJlciA9IHRoaXMuX1N0YXJ0UG9zaXRpb24ueiAtIHRoaXMuUGxheWVyLkxvZ2ljUG9zaXRpb24uejtcclxuICAgICAgICBmbG9vciA9IE1hdGgucm91bmQoZmxvb3IgLyAoQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcERpc3RhbmNlIC8gMikpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhmbG9vcik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IERpc3RhbmNlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5QbGF5ZXJGbG9vcilcclxuICAgIH1cclxuXHJcbiAgICBnZXQgUGxheWVyRmxvb3JMaW5lKCk6IE1vdW50TGluZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0Rmxvb3JCeUZsb29yKHRoaXMuUGxheWVyRmxvb3IpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm1fb3duZXIgYXMgR2FtZURpcmVjdG9yKS5HYW1lVGltZTtcclxuICAgIH1cclxuICAgIGdldCBHYW1lR29sZCgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fR29sZE51bTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gbnVsbDtcclxuICAgICAgICB0aGlzLkdhbWVTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Nb3VudExpbmVzID0gbnVsbDtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuSXRlbUxheW91dCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9IZWFkRmxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMuX1RhaWxGTG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9Cb290b21GbG9vciA9IDA7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRQb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLl9QYW5lbFVJID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9DdXJCRyA9IEFQUC5TY2VuZU1hbmFnZXIuQkcgYXMgQkdVSTtcclxuICAgICAgICB0aGlzLkZyZXNoQkdDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkSW5wdXRDdHJsZXIodmFsdWU6IElucHV0LkJhc2VHYW1lSW5wdXQpIHtcclxuICAgICAgICB0aGlzLklucHV0Q3RybC5DbGVhcigpO1xyXG4gICAgICAgIHZhbHVlLk5leHRJbnB1dCA9IHRoaXMuSW5wdXRDdHJsO1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBQb3BJbnB1dEN0cmxlcigpIHtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IHRoaXMuSW5wdXRDdHJsLk5leHRJbnB1dDtcclxuICAgIH1cclxuICAgIEFkZEdvbGQobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fR29sZE51bSArPSBudW07XHJcbiAgICAgICAgdGhpcy5BZGRMb2dpY0dvbGQobnVtKTtcclxuICAgIH1cclxuICAgIEFkZEdvbGRVbkxvZ2ljR29sZChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9Hb2xkTnVtICs9IG51bTtcclxuICAgIH1cclxuICAgIEFkZExvZ2ljR29sZChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljR29sZE51bSArPSBudW07XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkdvbGQgPSB0aGlzLl9Mb2dpY0dvbGROdW07XHJcbiAgICAgICAgV2VjaGF0T3Blbi5nZXRJbnN0YW5jZXMoKS5kcmF3cGFzcyh0aGlzLl9Mb2dpY0dvbGROdW0gKyBHYW1lQWdlbnQuQWdlbnQuQ3VyU2NvcmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5a6J5YWo5L2N572uXHJcbiAgICBTZXRTYWZlUFMobG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uLlkgPCB0aGlzLlRhaWxGTG9vci5GbG9vck51bSB8fCBsb2NhdGlvbi5ZID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlJlc2V0SXRlbShsb2NhdGlvbi5ZKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5LuO5p+Q5LiA5bGC5byA5aeL5LiA5bGC5bGC6YeN5paw5pGG5pS+6YGT5YW3XHJcbiAgICBSZXNldEl0ZW0oZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuQ3VyTGluZUJhcnJpZXJzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLkN1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICBmb3IgKGxldCBsb29wRmxvb3I6IG51bWJlciA9IGZsb29yOyBsb29wRmxvb3IgPD0gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW07ICsrbG9vcEZsb29yKSB7XHJcbiAgICAgICAgICAgIHZhciBmbG9vckxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb29wRmxvb3IpO1xyXG4gICAgICAgICAgICBmbG9vckxpbmUuTGF5T3V0RGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgZmxvb3JMaW5lLlNldExpbmUoZmxvb3JMaW5lLkZsb29yTnVtKTtcclxuICAgICAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShsb29wRmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+a4heeQhuWxgumBk+WFt1xyXG4gICAgQ2xlYXJGbG9vcihzdGVwOiBTdGVwKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHN0ZXBJdGVtID0gc3RlcC5TdGVwSXRlbTtcclxuICAgICAgICBzdGVwLlB1dEl0ZW0oSXRlbVR5cGUuTm9uZSk7XHJcbiAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgRGVhdGgoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUGxheWVyRGVhdGggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuT25HYW1lQ29tcGxldGUoKTtcclxuICAgICAgICAvL3VpLlNldEdhbWVJbmZvKHRoaXMuUGxheWVyRGlzdGFuY2UsdGhpcy5fR29sZE51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgRW5kKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIC8v6YeN5paw5byA5aeLXHJcbiAgICBSZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuU3RhcnRHYW1lKCk7XHJcbiAgICB9XHJcbiAgICBTaG93SW5wdXRJbmZvKGluZm86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgfVxyXG4gICAgLy/lt6blj7Pnp7vliqhcclxuICAgIE1vdmVTdGVwKGlzUmlnaHQ6IGJvb2xlYW4pIHtcclxuICAgICAgICAvL3ZhciBidWZmID0gdGhpcy5CdWZmZXI7XHJcbiAgICAgICAgLy/ojrflj5bkuIvkuIDlsYLnmoRTdGVwXHJcbiAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSB0aGlzLlBsYXllci5DdXJTdGVwO1xyXG4gICAgICAgIGlmIChzdGVwID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNSaWdodCkge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0ZXAgPT0gbnVsbCB8fCBzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICB0aGlzLlBsYXllci5TdGFydE1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWxguaVsOiOt+WPluafkOWxglxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIFxyXG4gICAgICovXHJcbiAgICBHZXRGbG9vckJ5Rmxvb3IoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciB0YWlsRmxvb3I6IE1vdW50TGluZSA9IHRoaXMuVGFpbEZMb29yO1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRhaWxGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29ySUQgPSAoZmxvb3IgLSB0YWlsRmxvb3IuRmxvb3JOdW0gKyB0aGlzLl9UYWlsRkxvb3JJZHgpICUgdGhpcy5Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdGhpcy5Nb3VudExpbmVzW2Zsb29ySURdO1xyXG4gICAgfVxyXG5cclxuICAgIExvb3BEb0Zsb29yU3RlcChmbG9vcjogbnVtYmVyLCBPd25lcjogYW55LCBjYWxsQmFjazogKHN0ZXA6IFN0ZXApID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZmxvb3IgPCB0aGlzLlRhaWxGTG9vci5GbG9vck51bSB8fCBmbG9vciA+IHRoaXMuSGVhZEZsb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yTGluZTogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGZsb29yTGluZS5Mb2dpY0xlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vckxpbmUuR2V0U3RlcChpZHgpO1xyXG4gICAgICAgICAgICBjYWxsQmFjay5jYWxsKE93bmVyLCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4flnZDmoIfojrflj5blj7DpmLZcclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiDntKLlvJUs5bGC5pWwXHJcbiAgICAgKi9cclxuICAgIEdldFN0ZXBCeUxvY2F0aW9uKGxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbik6IFN0ZXAge1xyXG4gICAgICAgIHZhciBnZXRTdGVwOiBTdGVwID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9jYXRpb24uWSkuR2V0U3RlcChsb2NhdGlvbi5YKTtcclxuICAgICAgICByZXR1cm4gZ2V0U3RlcDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIm+W7uuebuOWFs+aUvui/mSDov5nph4zph43mlrDlvIDlp4vkuI3kvJrotbBcclxuICAgIHB1YmxpYyBTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkNhbWVyYSA9IG5ldyBHYW1lQ2FtZXJhKCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEudHJhbnNmb3JtLmxvY2FsUm90YXRpb25FdWxlciA9IG5ldyBMYXlhLlZlY3RvcjMoLTMwLCAwLCAwKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLkNhbWVyYSk7XHJcblxyXG4gICAgICAgIHRoaXMuTW91bnRMaW5lcyA9IFtdO1xyXG4gICAgICAgIHZhciBtYXhMaW5lTnVtID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTWF4TGluZU51bTtcclxuICAgICAgICBmb3IgKHZhciBsaW5lSWR4OiBudW1iZXIgPSBtYXhMaW5lTnVtIC0gMTsgbGluZUlkeCA+PSAwOyAtLWxpbmVJZHgpIHtcclxuICAgICAgICAgICAgdmFyIG5ld01vdW50TGluZSA9IG5ldyBNb3VudExpbmUobGluZUlkeCwgbGluZUlkeCk7XHJcbiAgICAgICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKG5ld01vdW50TGluZSk7XHJcbiAgICAgICAgICAgIHRoaXMuTW91bnRMaW5lc1tsaW5lSWR4XSA9IG5ld01vdW50TGluZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/liJvlu7pVSVxyXG5cclxuICAgICAgICAvL+WIm+W7uueOqeWutlxyXG4gICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdmFyIGdhbWVBZ2VudCA9IEdhbWVBZ2VudC5BZ2VudDtcclxuICAgICAgICB2YXIgcGxheWVyTW9kZWwgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRDaGFyYWN0ZXJNb2RlbChnYW1lQWdlbnQuQ3VyQ2hhcmFjdGVySUQpO1xyXG4gICAgICAgIHBsYXllci5TZXRQbGF5ZXJNb2RlbChwbGF5ZXJNb2RlbCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5QbGF5ZXIpO1xyXG5cclxuICAgICAgICAvL+WHhuWkh+eOqeWutuatu+S6oeS6i+S7tlxyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCwgdGhpcy5EZWF0aCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+i/m+WFpea4uOaIj+eahOiuvue9ruaUvui/memHjCDph43mlrDlvIDlp4votbDov5nph4xcclxuICAgIHByb3RlY3RlZCBTdGFydEdhbWUoKSB7XHJcblxyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuU2NlbmVPYmouYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKVxyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5SZXNldEdhbWVJdGVtKCk7XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LlJlc2V0U2tpbGxJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKDAsIDApO1xyXG4gICAgICAgIC8v6YeN572u54mp5ZOBXHJcbiAgICAgICAgdGhpcy5JdGVtTGF5b3V0ID0gbmV3IEl0ZW0uSXRlbUxheW91dCgpXHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IG5ldyBBcnJheTxMaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHZhciBsaW5lczogTW91bnRMaW5lW10gPSB0aGlzLk1vdW50TGluZXM7XHJcbiAgICAgICAgLy/liJvlu7rovpPlhaXmjqfliLblmahcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG5ldyBJbnB1dC5Ob3JtR2FtZUlucHV0KHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX0hlYWRGbG9vcklkeCA9IGxpbmVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLlBsYXllci5SZXNldCgpO1xyXG4gICAgICAgIGZvciAodmFyIGlkeDogbnVtYmVyID0gMDsgaWR4IDwgbGluZXMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICB2YXIgbGluZTogTW91bnRMaW5lID0gdGhpcy5Nb3VudExpbmVzW2lkeF07XHJcbiAgICAgICAgICAgIGxpbmUuU2V0TGluZShpZHgpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ID4gMClcclxuICAgICAgICAgICAgICAgIGxpbmVzW2lkeCAtIDFdLlNldE5leHRGbG9vcihsaW5lKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgUGxheWVyU3RlcCA9IGxpbmUuR2V0U3RlcChNYXRoLmZsb29yKGxpbmUuTG9naWNMZW5ndGggLyAyKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlBsYXllci5TZXRTdGVwKFBsYXllclN0ZXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gUGxheWVyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1N0YXJ0UG9zaXRpb24gPSB0aGlzLlBsYXllci5Mb2dpY1Bvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShpZHgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkNhbWVyYS5SZXNldChuZXcgTGF5YS5WZWN0b3IzKCksIG5ldyBMYXlhLlZlY3RvcjModGhpcy5QbGF5ZXIuUG9zaXRpb24ueCwgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCAqIDEwLjUsIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGggKiA5KSwgdGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgIHRoaXMubV9Hb2xkTnVtID0gMDtcclxuICAgICAgICB0aGlzLl9Mb2dpY0dvbGROdW0gPSAwO1xyXG5cclxuICAgICAgICB0aGlzLlBhbmVsVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3coR2FtZVVJKTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuUmVnaXN0Q2xpY2tQbGF5ZXJJdGVtKHRoaXMsIHRoaXMuVXNlUGxheWVySXRlbSk7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlJlZ2lzdENsaWNrU2tpbGxJdGVtKHRoaXMsIHRoaXMuVXNlU2tpbGxJdGVtKTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuR29sZCA9IDA7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gdGhpcy5HYW1lVGltZSArIDQ7XHJcbiAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgPSAwO1xyXG4gICAgICAgIHRoaXMuX0dhbWVVcGRhdGUgPSB0aGlzLl9TdGFydENvdW50O1xyXG4gICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkuZHJhd3Bhc3MoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fR2FtZVVwZGF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0dhbWVVcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/mraPluLjov5DooYzml7bnmoTmr4/luKfpgLvovpFcclxuICAgIHByaXZhdGUgX1J1bkdhbWVVcGRhdGUoKSB7XHJcbiAgICAgICAgdmFyIGRpc3Q6IG51bWJlciA9IHRoaXMuUGxheWVyRmxvb3I7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkRpc3RhbmNlID0gdGhpcy5EaXN0YW5jZTsgLy90aGlzLkRpc3RhbmNlKCk7Ly9NYXRoLmZsb29yKGRpc3QpO1xyXG4gICAgICAgIGlmICh0aGlzLkZyZXNoQkdDb3VudCA+IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0N1ckJHLlVwZGF0ZVBhZ2UoZGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuRnJlc2hCR0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgKyt0aGlzLkZyZXNoQkdDb3VudDtcclxuXHJcbiAgICAgICAgdmFyIGZsb29WZWN0b3I6IExheWEuVmVjdG9yMyA9IHRoaXMuVGFpbEZMb29yLlBvc2l0aW9uO1xyXG5cclxuICAgICAgICBpZiAoZmxvb1ZlY3Rvci56IC0gdGhpcy5QbGF5ZXIuUG9zaXRpb24ueiA+IDMgKiBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwRGlzdGFuY2UgLyAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1B1c2hGTG9vcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQ291bnRUaW1lIDwgQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50VGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIDM7XHJcbiAgICAgICAgICAgIHRoaXMuX0Rlc3Ryb3lMaW5lKHRoaXMuX0Jvb3RvbUZsb29yKTtcclxuICAgICAgICAgICAgdGhpcy5fQm9vdG9tRmxvb3IgKz0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vlgJLorqHml7bmnJ/pl7TnmoTmr4/luKfpgLvovpFcclxuICAgIHByaXZhdGUgX1N0YXJ0Q291bnQoKSB7XHJcbiAgICAgICAgdmFyIHRpbWU6IHN0cmluZyA9IFwiXCJcclxuICAgICAgICB2YXIgY291bnRUaW1lOiBudW1iZXIgPSB0aGlzLl9Db3VudFRpbWUgLSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWU7XHJcbiAgICAgICAgaWYgKGNvdW50VGltZSA+IDAuOSlcclxuICAgICAgICAgICAgdGltZSArPSBNYXRoLmZsb29yKGNvdW50VGltZSk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuUGFuZWxVSS5HYW1lUGFuZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9HYW1lVXBkYXRlID0gdGhpcy5fUnVuR2FtZVVwZGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnRUaW1lID0gdGhpcy5HYW1lVGltZSArIDM7XHJcbiAgICAgICAgICAgIEdhbWVBZ2VudC5BZ2VudC5SZXNldEdhbWVJdGVtKCk7XHJcbiAgICAgICAgICAgIEdhbWVBZ2VudC5BZ2VudC5SZXNldFNraWxsSXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBhbmVsVUkuU2V0Q291bnRUaW1lKHRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5bGC5ZCR5LiK5Y+gXHJcbiAgICBwcm90ZWN0ZWQgX1B1c2hGTG9vcigpIHtcclxuICAgICAgICB2YXIgcHJlSGVhZDogTW91bnRMaW5lID0gdGhpcy5IZWFkRmxvb3I7XHJcbiAgICAgICAgdGhpcy5fSGVhZEZsb29ySWR4ID0gKHRoaXMuX0hlYWRGbG9vcklkeCArIDEpICUgdGhpcy5Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLl9UYWlsRkxvb3JJZHggPSAodGhpcy5fVGFpbEZMb29ySWR4ICsgMSkgJSB0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBIZWFkZmxvb3I6IG51bWJlciA9IHByZUhlYWQuRmxvb3JOdW0gKyAxO1xyXG4gICAgICAgIHRoaXMuSGVhZEZsb29yLlNldExpbmUoSGVhZGZsb29yKTtcclxuICAgICAgICBwcmVIZWFkLlNldE5leHRGbG9vcih0aGlzLkhlYWRGbG9vcik7XHJcbiAgICAgICAgdGhpcy5fUHV0SXRlbUluTGluZShIZWFkZmxvb3IpO1xyXG5cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRhuaUvueJqeWTgVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIOeJqeWTgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgX1B1dEl0ZW1JbkxpbmUoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBzYWZlQ29sOiB7IFtrZXk6IHN0cmluZ106IEFycmF5PG51bWJlcj47IH0gPSB7fTtcclxuICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIC8v5biD572u6L+H5LqG5LiN55So5YaN5biD572u5LqGXHJcbiAgICAgICAgaWYgKGZsb29yTGluZS5MYXlPdXREaXJ0eSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZsb29yTGluZS5MYXlPdXREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgLypcclxuICAgICAgICBpZihmbG9vciA+PSB0aGlzLl9TYWZlTG9jYXRpb24uWSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLk1heExpbmVOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzYWZlQ29sID0gdGhpcy5fQ291bnRPcGVuTGlzdChmbG9vcik7XHJcbiAgICAgICAgfWVsc2UqL1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mkYbmlL7liY3lhYjorqHnrpfor6XlsYLpgJrot6/mg4XlhrUgXHJcbiAgICAgICAgICAgIHNhZmVDb2wgPSB7fVxyXG4gICAgICAgICAgICBzYWZlQ29sW1wib1wiXSA9IHRoaXMuX0NvdW50Um9hZEluZm8oZmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WHuueUn+eCueS4jeaUvumBk+WFt1xyXG4gICAgICAgIGlmIChmbG9vciA8IDEgfHwgZmxvb3IgPT0gdGhpcy5TYWZlTG9jYXRpb24uWSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6I635Y+W6K+l6KGM6KaB5pGG5pS+55qE54mp5ZOBXHJcbiAgICAgICAgdGhpcy5fVGFrZUl0ZW1MaXN0KGZsb29yKVxyXG5cclxuICAgICAgICAvL+agh+iusOS4gOadoee7neWvueWuieWFqOeahOi3r1xyXG4gICAgICAgIHZhciBzYWZlSWR4Q29sbDogeyBba2V5OiBzdHJpbmddOiBudW1iZXI7IH0gPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBjb2xLZXkgaW4gc2FmZUNvbCkge1xyXG4gICAgICAgICAgICB2YXIgbGlzdCA9IHNhZmVDb2xbY29sS2V5XTtcclxuICAgICAgICAgICAgdmFyIHNhZmVJZHggPSBsaXN0W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxpc3QubGVuZ3RoKV07XHJcbiAgICAgICAgICAgIGlmIChzYWZlSWR4Q29sbFtzYWZlSWR4XSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNhZmVJZHhDb2xsW3NhZmVJZHhdID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aKiumcgOimgeaUvumBk+WFt+eahOagvOWtkOaUvuWFpemaj+acuuaxoFxyXG4gICAgICAgIHZhciBjdXJGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciByYW5kb21Qb29sOiBBcnJheTxTdGVwPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8v5oqK5a6J5YWo55qE5qC85a2Q5pqC5pe256e75Ye65p2lXHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDogQXJyYXk8U3RlcD4gPSBuZXcgQXJyYXk8U3RlcD4oKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4OiBudW1iZXIgPSAwOyBzdGVwSWR4IDwgY3VyRmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkge1xyXG4gICAgICAgICAgICB2YXIgZ2V0U3RlcDogU3RlcCA9IGN1ckZsb29yLkdldFN0ZXAoc3RlcElkeCk7XHJcbiAgICAgICAgICAgIGlmIChzYWZlSWR4Q29sbFtzdGVwSWR4XSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBvb2wucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGdldFN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pS+6Zm36ZixXHJcbiAgICAgICAgdmFyIGJhcnJpZXJzTGlzdDogQXJyYXk8TGluZUl0ZW1JbmZvPiA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzO1xyXG4gICAgICAgIHRoaXMuX09yZ2luaXplUHV0SXRlbShiYXJyaWVyc0xpc3QsIHJhbmRvbVBvb2wsIHRydWUpO1xyXG5cclxuICAgICAgICAvL+aRhuaUvumBk+WFt1xyXG4gICAgICAgIGZvciAodmFyIHNhZmVTdGVwSWR4OiBudW1iZXIgPSAwOyBzYWZlU3RlcElkeCA8IHNhZmVTdGVwTGlzdC5sZW5ndGg7ICsrc2FmZVN0ZXBJZHgpIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKHNhZmVTdGVwTGlzdFtzYWZlU3RlcElkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmV3YXJkTGlzdCA9IHRoaXMuQ3VyTGluZVJld2FyZHM7XHJcbiAgICAgICAgdGhpcy5fT3JnaW5pemVQdXRJdGVtKHJld2FyZExpc3QsIHJhbmRvbVBvb2wpO1xyXG4gICAgICAgIC8v5YaN5qyh6K6h566X6YCa6Lev5oOF5Ya1IFxyXG4gICAgICAgIC8vdGhpcy5fQ291bnRMYXN0Rmxvb3JSb2FkKGZsb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaRhuaUvueJqeWTgVxyXG4gICAgICogQHBhcmFtIHtBcnJheTxMaW5lSXRlbUluZm8+fSBpdGVtTGlzdCDnianlk4HliJfooahcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8U3RlcD59IHJhbmRvbVBvb2wg5Y+w6Zi26ZuG5ZCIXHJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzRGVhZFJvYWQg5piv5ZCm5piv5q276LevXHJcbiAgICAgKi9cclxuICAgIF9Pcmdpbml6ZVB1dEl0ZW0oaXRlbUxpc3Q6IEFycmF5PExpbmVJdGVtSW5mbz4sIHJhbmRvbVBvb2w6IEFycmF5PFN0ZXA+LCBpc0RlYWRSb2FkOiBib29sZWFuID0gbnVsbCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAodmFyIGl0ZW1JZHg6IG51bWJlciA9IDA7IGl0ZW1JZHggPCBpdGVtTGlzdC5sZW5ndGg7ICsraXRlbUlkeCkge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzogTGluZUl0ZW1JbmZvID0gaXRlbUxpc3RbaXRlbUlkeF07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGRpZmZpY3VsdHlOdW06IG51bWJlciA9IDA7IGRpZmZpY3VsdHlOdW0gPCBpbmZvLk51bWJlcjspIHtcclxuICAgICAgICAgICAgICAgIGlmIChyYW5kb21Qb29sLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8v6ZqP5py65oqK6Zqc56KN5pS+5YWl5qC85a2Q6YeMXHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tSWR4OiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByYW5kb21Qb29sLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHJhbmRvbVBvb2xbcmFuZG9tSWR4XTtcclxuICAgICAgICAgICAgICAgIHJhbmRvbVBvb2wuc3BsaWNlKHJhbmRvbUlkeCwgMSk7XHJcbiAgICAgICAgICAgICAgICBzdGVwLlB1dEl0ZW0oaW5mby5UeXBlKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0RlYWRSb2FkICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gaXNEZWFkUm9hZDtcclxuICAgICAgICAgICAgICAgIC0taW5mby5OdW1iZXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHJhbmRvbVBvb2wubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW1JZHggPiAwKSB7XHJcbiAgICAgICAgICAgIGl0ZW1MaXN0LnNwbGljZSgwLCBpdGVtSWR4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKumAkuW9kuiuoeeul+mAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yTnVtIOeJqeWTgeWIl+ihqFxyXG4gICAgICovXHJcbiAgICBfQ291bnRPcGVuTGlzdChmbG9vck51bTogbnVtYmVyKTogeyBba2V5OiBzdHJpbmddOiBBcnJheTxudW1iZXI+OyB9IHtcclxuICAgICAgICBmb3IgKHZhciBmbG9vckNvdW50OiBudW1iZXIgPSB0aGlzLlBsYXllckZsb29yOyBmbG9vckNvdW50IDw9IGZsb29yTnVtOyArK2Zsb29yQ291bnQpIHtcclxuICAgICAgICAgICAgdmFyIGZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vckNvdW50KTtcclxuICAgICAgICAgICAgaWYgKGZsb29yID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGZvciAodmFyIHN0ZXBJZHggPSAwOyBzdGVwSWR4IDwgZmxvb3IuTG9naWNMZW5ndGg7ICsrc3RlcElkeCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICAgICAgc3RlcC5NYXJrID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IodGhpcy5QbGF5ZXJGbG9vcik7XHJcbiAgICAgICAgZm9yICh2YXIgc3RlcElkeCA9IDA7IHN0ZXBJZHggPCBmbG9vci5Mb2dpY0xlbmd0aDsgKytzdGVwSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX01hcmtTdGVwcyhzdGVwLCBzdGVwSWR4LCBmbG9vck51bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRhcmdldEZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSk7XHJcbiAgICAgICAgLy/mib7lh7rooqvmoIforrDnmoTngrnlubbmlbTnkIbmiJDpm4blkIhcclxuICAgICAgICB2YXIgY29sbGVjdGlvbjogeyBba2V5OiBzdHJpbmddOiBBcnJheTxudW1iZXI+OyB9ID0ge31cclxuICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gXCJvXCJcclxuICAgICAgICBmb3IgKHZhciBvcGVuSWR4OiBudW1iZXIgPSAwOyBvcGVuSWR4IDwgdGFyZ2V0Rmxvb3IuTG9naWNMZW5ndGg7ICsrb3BlbklkeCkge1xyXG4gICAgICAgICAgICB2YXIgbWFya2VkU3RlcDogU3RlcCA9IHRhcmdldEZsb29yLkdldFN0ZXAob3BlbklkeCk7XHJcbiAgICAgICAgICAgIGlmIChtYXJrZWRTdGVwLk1hcmsgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgTmFtZTogc3RyaW5nID0gbmFtZSArIG1hcmtlZFN0ZXAuTWFyaztcclxuICAgICAgICAgICAgICAgIGlmIChjb2xsZWN0aW9uW05hbWVdID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlY3Rpb25bTmFtZV0gPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb2xsZWN0aW9uW05hbWVdLnB1c2gob3BlbklkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAq6YCS5b2S5qCH6K6w6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge1N0ZXB9IHN0ZXAg5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0ge2FueX0gbWFyayDmoIforrBcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0YXJnZXRGbG9vck51bSDnm67moIflsYLmlbBcclxuICAgICAqL1xyXG4gICAgX01hcmtTdGVwcyhzdGVwOiBTdGVwLCBtYXJrOiBhbnksIHRhcmdldEZsb29yTnVtOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoc3RlcC5Jc0RlYWRSb2FkKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHN0ZXAuRmxvb3IuRmxvb3JOdW0gPj0gdGFyZ2V0Rmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgaWYgKHN0ZXAuTWFyayA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0ZXAuTWFyayA9IG1hcmtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlZnRPcGVuOiBib29sZWFuO1xyXG4gICAgICAgIHZhciByaWdodE9wZW46IGJvb2xlYW47XHJcbiAgICAgICAgdmFyIGxlZnRQYXJlbnQ6IFN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgaWYgKGxlZnRQYXJlbnQgIT0gbnVsbCAmJiAhbGVmdFBhcmVudC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgIGlmIChsZWZ0UGFyZW50Lk1hcmsgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgbGVmdE9wZW4gPSB0aGlzLl9NYXJrU3RlcHMobGVmdFBhcmVudCwgbWFyaywgdGFyZ2V0Rmxvb3JOdW0pO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBsZWZ0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByaWdodFBhcmVudDogU3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgaWYgKHJpZ2h0UGFyZW50ICE9IG51bGwgJiYgIXJpZ2h0UGFyZW50LklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgaWYgKHJpZ2h0UGFyZW50Lk1hcmsgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgcmlnaHRPcGVuID0gdGhpcy5fTWFya1N0ZXBzKHJpZ2h0UGFyZW50LCBtYXJrLCB0YXJnZXRGbG9vck51bSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHJpZ2h0T3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGVwLk1hcmsgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHN0ZXAuTWFyayA9IG1hcmtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFsZWZ0T3BlbiAmJiAhcmlnaHRPcGVuKSB7XHJcbiAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnIDlkI7lho3orqHnrpfkuIDmrKHor6XlsYLpgJrot6/mg4XlhrVcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vck51bSBcclxuICAgICAqL1xyXG4gICAgX0NvdW50TGFzdEZsb29yUm9hZChmbG9vck51bTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGZsb29yTnVtIDwgdGhpcy5UYWlsRkxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3IgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vck51bSk7XHJcbiAgICAgICAgdmFyIGxhc3RGbG9vciA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yTnVtIC0gMSk7XHJcbiAgICAgICAgZm9yICh2YXIgc3RlcElkeCA9IDA7IHN0ZXBJZHggPCBmbG9vci5Mb2dpY0xlbmd0aDsgKytzdGVwSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gZmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBMZWZ0U3RlcCA9IHN0ZXAuTGVmdENoaWxkO1xyXG4gICAgICAgICAgICAgICAgdmFyIFJpZ2h0U3RlcCA9IHN0ZXAuUmlnaHRDaGlsZDtcclxuICAgICAgICAgICAgICAgIGlmIChMZWZ0U3RlcCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFMZWZ0U3RlcC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrTGVmdFN0ZXAuUm9hZE51bTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoUmlnaHRTdGVwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIVJpZ2h0U3RlcC5Jc0RlYWRSb2FkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsrUmlnaHRTdGVwLlJvYWROdW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGxhc3RTdGVwSWR4ID0gMDsgbGFzdFN0ZXBJZHggPCBsYXN0Rmxvb3IuTG9naWNMZW5ndGg7ICsrbGFzdFN0ZXBJZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBsYXN0Rmxvb3IuR2V0U3RlcChzdGVwSWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzdGVwLklzRGVhZFJvYWQgJiYgc3RlcC5Sb2FkTnVtIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgLy/lkJHkuIrpgJLlvZLmiormiYDmnInkuI7kuYvnm7jov57nmoToioLngrnmlbDnu5nkv67mraPkuoZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUvumBk+WFt+WJjeeul+mAmui3r+aDheWGtVxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIFxyXG4gICAgICovXHJcbiAgICBfQ291bnRSb2FkSW5mbyhmbG9vcjogbnVtYmVyKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIHZhciB0aGlzRmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuXHJcbiAgICAgICAgdmFyIHJvYWROdW06IG51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGxhc3RGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IgLSAxKTtcclxuICAgICAgICBpZiAoZmxvb3IgPT0gdGhpcy5fU2FmZUxvY2F0aW9uLlkpXHJcbiAgICAgICAgICAgIHRoaXMuX1Jlc2V0U3RlcEluZm8odGhpc0Zsb29yKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgbG9naWNJZHg6IG51bWJlciA9IDA7IGxvZ2ljSWR4IDwgdGhpc0Zsb29yLkxvZ2ljTGVuZ3RoOyArK2xvZ2ljSWR4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgICAgIHZhciBsZWZ0Q2hpbGQ6IFN0ZXAgPSBzdGVwLkxlZnRDaGlsZDtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodENoaWxkOiBTdGVwID0gc3RlcC5SaWdodENoaWxkO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZnRDaGlsZCAhPSBudWxsICYmICFsZWZ0Q2hpbGQuSXNEZWFkUm9hZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNhZmVTdGVwTGlzdC5wdXNoKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmlnaHRDaGlsZCAhPSBudWxsICYmICFyaWdodENoaWxkLklzRGVhZFJvYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwLklzRGVhZFJvYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGZsb29yID09IHRoaXMuX1NhZmVMb2NhdGlvbi5ZKSB7XHJcbiAgICAgICAgICAgIHZhciBzYWZlU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKHRoaXMuX1NhZmVMb2NhdGlvbi5YKTtcclxuICAgICAgICAgICAgc2FmZVN0ZXAuSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaCh0aGlzLl9TYWZlTG9jYXRpb24uWCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc2FmZVN0ZXBMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIF9SZXNldFN0ZXBJbmZvKHRoaXNGbG9vcjogTW91bnRMaW5lKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzRmxvb3IpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBsb2dpY0lkeDogbnVtYmVyID0gMDsgbG9naWNJZHggPCB0aGlzRmxvb3IuTG9naWNMZW5ndGg7ICsrbG9naWNJZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcChsb2dpY0lkeCk7XHJcbiAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5p+Q6YGT5YW35L+h5oGvXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX1Rha2VJdGVtTGlzdChmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgdmFyIGl0ZW1MaXN0ID0gbmV3IEFycmF5KGxpbmUuTG9naWNMZW5ndGgpO1xyXG4gICAgICAgIHZhciBsaW5lUmV3YXJkcyA9IHRoaXMuSXRlbUxheW91dC5UYWtlTGluZVJld2FyZChmbG9vcik7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lUmV3YXJkcyA9IHRoaXMuQ3VyTGluZVJld2FyZHMuY29uY2F0KGxpbmVSZXdhcmRzKTtcclxuICAgICAgICBpZiAodGhpcy5TYWZlTG9jYXRpb24uWSA+IGZsb29yIHx8IGZsb29yID4gdGhpcy5TYWZlTG9jYXRpb24uWSArIDEpIHtcclxuICAgICAgICAgICAgdmFyIGxpbmVCYXJyaWVycyA9IHRoaXMuSXRlbUxheW91dC5UYWtlTGluZURpZmZpY3VsdHkoZmxvb3IpO1xyXG4gICAgICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IHRoaXMuQ3VyTGluZUJhcnJpZXJzLmNvbmNhdChsaW5lQmFycmllcnMpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkN1ckxpbmVCYXJyaWVycy5sZW5ndGggPiAwKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5aGM6Zm35p+Q5LiA5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX0Rlc3Ryb3lMaW5lKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGFpbEZsb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgY291bnRGbG9vcjogbnVtYmVyID0gdGFpbEZsb29yLkZsb29yTnVtOyBjb3VudEZsb29yIDw9IGZsb29yOyArK2NvdW50Rmxvb3IpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldEZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihjb3VudEZsb29yKTtcclxuICAgICAgICAgICAgdGFyZ2V0Rmxvb3IuQnJlYWsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXNlU2tpbGxJdGVtKCkgIHtcclxuICAgICAgICBpZiAoR2FtZUFnZW50LkFnZW50LlNraWxsSXRlbU51bSA8IDEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuVXNlU2tpbGxJdGVtKCk7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlcklEOm51bWJlciA9IEdhbWVBZ2VudC5BZ2VudC5DdXJDaGFyYWN0ZXJJRDtcclxuICAgICAgICB2YXIgSXRlbUlEOm51bWJlciA9IEdhbWVBUFAuQ2hhcmFjdGVyTWdyLkdldEl0ZW1JRChjaGFyYWN0ZXJJRCk7XHJcbiAgICAgICAgdmFyIEl0ZW1UeXBlOm51bWJlciA9IEdhbWVBUFAuSXRlbU1nci5HZXRJdGVtVHlwZShJdGVtSUQpO1xyXG4gICAgICAgIHZhciBuZXdCdWZmOkl0ZW0uQmFzZVBsYXllckJ1ZmYgPSBJdGVtLkl0ZW1CdWZmRmFjdG9yeShJdGVtVHlwZSk7XHJcbiAgICAgICAgbmV3QnVmZi5BZGRUb1BsYXllcih0aGlzLlBsYXllcik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVzZVBsYXllckl0ZW0oKSAge1xyXG4gICAgICAgIGlmIChHYW1lQWdlbnQuQWdlbnQuR2FtZUl0ZW1OdW0gPCAxKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LlVzZUdhbWVJdGVtKCk7XHJcbiAgICAgICAgdmFyIEl0ZW1JRDpudW1iZXIgPSBHYW1lQWdlbnQuQWdlbnQuQ3VySXRlbTtcclxuICAgICAgICB2YXIgSXRlbVR5cGU6bnVtYmVyID0gR2FtZUFQUC5JdGVtTWdyLkdldEl0ZW1UeXBlKEl0ZW1JRCk7XHJcbiAgICAgICAgdmFyIG5ld0J1ZmY6SXRlbS5CYXNlUGxheWVyQnVmZiA9IEl0ZW0uSXRlbUJ1ZmZGYWN0b3J5KEl0ZW1UeXBlKTtcclxuICAgICAgICBuZXdCdWZmLkFkZFRvUGxheWVyKHRoaXMuUGxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uR2FtZUNvbXBsZXRlKCkge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCwgdGhpcy5EZWF0aCwgdGhpcyk7XHJcbiAgICAgICAgdmFyIHVpOiBFbmRHYW1lVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8RW5kR2FtZVVJPihFbmRHYW1lVUkpO1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5BZGRHb2xkKHRoaXMubV9Hb2xkTnVtKTtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQWRkU2NvcmUodGhpcy5tX0dvbGROdW0gKiAxMCArIHRoaXMuRGlzdGFuY2UgKiAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPblRpbWVQYXVzZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUGF1c2UoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgT25Db3VudGludWUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuUGxheWVyLkNvbnRpbnVlKCk7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgbW9kdWxlIHBhdGgge1xyXG4gICAgZXhwb3J0IHZhciBJc0VkaXRvcjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBleHBvcnQgdmFyIHZlcnNpb246IHN0cmluZyA9IFwiP3Y9NVwiO1xyXG4gICAgZXhwb3J0IHZhciBTY2VuZUFzc2V0UGF0aDogc3RyaW5nID0gXCJMYXlhU2NlbmVfXCI7XHJcbiAgICBleHBvcnQgdmFyIFJlc291cmNlUGF0aDogc3RyaW5nID0gSXNFZGl0b3IgPyBcIk5ldFJlc291cmNlXzNfMjkvXCIgOiBcImh0dHBzOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL05ldFJlc291cmNlXzNfMjkvXCI7XHJcbiAgICBleHBvcnQgdmFyIFVJUGF0aDogc3RyaW5nID0gUmVzb3VyY2VQYXRoICsgXCJVSS9cIjtcclxuICAgIGV4cG9ydCB2YXIgTW9kZWxQYXRoOiBzdHJpbmcgPSBSZXNvdXJjZVBhdGggKyBcIjNEL1wiXHJcbiAgICBleHBvcnQgdmFyIENvbmZpZ1BhdGg6IHN0cmluZyA9IFJlc291cmNlUGF0aCArIFwiQ29uZmlnL1wiXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZBdGzmlofku7bot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEF0bFBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFVJUGF0aCArIGZpbGVOYW1lICsgXCIuYXRsYXNcIiArIChJc0VkaXRvcj9cIlwiOnZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WVUlKc29u6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXREZXBhdGhVSUpTKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBVSVBhdGggKyBmaWxlTmFtZSArIFwiLmpzb25cIiArIChJc0VkaXRvcj9cIlwiOnZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlmxo5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRMSChmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gTW9kZWxQYXRoICsgU2NlbmVBc3NldFBhdGggKyBmaWxlTmFtZSArIFwiL0NvbnZlbnRpb25hbC9cIiArIGZpbGVOYW1lICsgXCIubGhcIiArIChJc0VkaXRvcj9cIlwiOnZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Yqg6L29SnNvbui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0SnNvblBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIENvbmZpZ1BhdGggKyBmaWxlTmFtZSArIFwiLmpzb25cIiArIChJc0VkaXRvcj9cIlwiOnZlcnNpb24pO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBVSUZ1bmMge1xyXG4gICAgLy/orqHnrpfnvKnmlL7lgLxcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDb3VudFNjYWxlRml4KHdpZHRoOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghd2lkdGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhZ2VXaWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdmFyIHNjYWxlOiBudW1iZXIgPSBzdGFnZVdpZHRoIC8gd2lkdGg7XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEZpeFVJKHZpZXc6IExheWEuU3ByaXRlLCB3aWR0aDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gVUlGdW5jLkNvdW50U2NhbGVGaXgod2lkdGggPyB3aWR0aCA6IHZpZXcud2lkdGgpO1xyXG4gICAgICAgIHZpZXcuc2NhbGVYID0gc2NhbGU7XHJcbiAgICAgICAgdmlldy5zY2FsZVkgPSBzY2FsZTtcclxuICAgICAgICB2aWV3LmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0IC8gc2NhbGU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1nciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVGltZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1RpbWVNYW5hZ2VyXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi4vR2FtZS9HYW1lTW9kdWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUFAge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19TY2VuZU1ncjogU2NlbmVNZ3I7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX1RpbWVNZ3I6IFRpbWVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19VSU1hbmFnZXI6IFVJTWFuYWdlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX0ZyYW1lV29yazpGcmFtZVdvcms7XHJcbiAgICBzdGF0aWMgZ2V0IEZyYW1lV29yaygpOkZyYW1lV29ya1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdfRnJhbWVXb3JrO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBNZXNzYWdlTWFuYWdlcigpOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlciAge1xyXG4gICAgICAgIHJldHVybiBBUFAuZ19NZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBVSU1hbmFnZXIoKTogVUlNYW5hZ2VyICB7XHJcbiAgICAgICAgaWYgKEFQUC5nX1VJTWFuYWdlciA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBBUFAuZ19VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFQUC5nX1VJTWFuYWdlcjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgU2NlbmVNYW5hZ2VyKCk6IFNjZW5lTWdyICB7XHJcbiAgICAgICAgaWYgKEFQUC5nX1NjZW5lTWdyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIEFQUC5nX1NjZW5lTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxTY2VuZU1ncj4oU2NlbmVNZ3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLmdfU2NlbmVNZ3I7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IFRpbWVNYW5hZ2VyKCk6IFRpbWVNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKEFQUC5nX1RpbWVNZ3IgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgQVBQLmdfVGltZU1nciA9IEZXLkZNLkdldE1hbmFnZXI8VGltZU1hbmFnZXI+KFRpbWVNYW5hZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFQUC5nX1RpbWVNZ3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5nX0ZyYW1lV29yayA9IEZyYW1lV29yay5GTTtcclxuICAgICAgICB2YXIgZm06RnJhbWVXb3JrICA9IEFQUC5nX0ZyYW1lV29yaztcclxuICAgICAgICBBUFAuZ19NZXNzYWdlID0gZm0uQWRkTWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIEFQUC5nX1NjZW5lTWdyID0gIGZtLkFkZE1hbmFnZXI8U2NlbmVNZ3I+KFNjZW5lTWdyKTtcclxuICAgICAgICBBUFAuZ19UaW1lTWdyID0gZm0uQWRkTWFuYWdlcjxUaW1lTWFuYWdlcj4oVGltZU1hbmFnZXIpO1xyXG4gICAgICAgIEFQUC5nX1VJTWFuYWdlciA9IGZtLkFkZE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIEFQUC5nX01lc3NhZ2UuUmVnaXN0KEdhbWVNb2R1bGUuRXZlbnQuT25UaW1lUGF1c2UsQVBQLmdfVGltZU1nci5QYXVzZSxBUFAuZ19UaW1lTWdyKVxyXG4gICAgICAgIEFQUC5nX01lc3NhZ2UuUmVnaXN0KEdhbWVNb2R1bGUuRXZlbnQuT25UaW1lQ29udGludWUsQVBQLmdfVGltZU1nci5Db250aW51ZSxBUFAuZ19UaW1lTWdyKVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgQ2hhcmFjdGVyTWFuYWdlciBmcm9tIFwiLi8uLi9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyXCJcclxuaW1wb3J0IEl0ZW1NYW5hZ2VyIGZyb20gXCIuLy4uL0dhbWVNYW5hZ2VyL0l0ZW1NYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUFQUFxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBDaGFyYWN0ZXJNZ3IoKTpDaGFyYWN0ZXJNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIENoYXJhY3Rlck1hbmFnZXIuTWdyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXRlbU1ncigpOkl0ZW1NYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEl0ZW1NYW5hZ2VyLk1ncjtcclxuICAgIH1cclxufSIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IFBsYXllckd1ZXN0RGVsZWdhdGUgZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiXHJcbmltcG9ydCBTZXRQYW5lbFVJIGZyb20gXCIuLy4uL3VpL1NldFBhbmVsVUlcIlxyXG5pbXBvcnQgUmFua1BhbmVsVUkgZnJvbSBcIi4vLi4vdWkvUmFua1BhbmVsVUlcIlxyXG5pbXBvcnQgQ2hhcmFjdGVyVUkgZnJvbSBcIi4vLi4vdWkvQ2hhcmFjdGVyVUlcIlxyXG5pbXBvcnQgR2FtZVNjZW5lIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVTY2VuZVwiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi9BUFBcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCI7XHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi4vdWkvRW50ZXJHYW1lVUlcIjtcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLi9HYW1lL0dhbWVNb2R1bGVcIjtcclxuXHJcbnR5cGUgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sZXJcclxue1xyXG4gICAgc3RhdGljIGdldCBHYW1lQ29udHJvbGVyKCk6R2FtZUNvbnRyb2xlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgR2FtZUNvbnRyb2xlci5NZ3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDb250cm9sZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjogR2FtZUNvbnRyb2xlcjtcclxuICAgIHN0YXRpYyBnZXQgTWdyKCk6IEdhbWVDb250cm9sZXIge1xyXG4gICAgICAgIGlmIChHYW1lQ29udHJvbGVyLl9NZ3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBHYW1lQ29udHJvbGVyLl9NZ3IgPSBuZXcgR2FtZUNvbnRyb2xlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR2FtZUNvbnRyb2xlci5fTWdyO1xyXG4gICAgfVxyXG4gICAgX0xpbmVTdGVwTnVtOm51bWJlcjtcclxuICAgIF9NYXhMaW5lTnVtOm51bWJlcjtcclxuICAgIF9TdGVwTGVuZ3RoOm51bWJlcjtcclxuICAgIF9TdGVwRGlzdGFuY2U6bnVtYmVyO1xyXG4gICAgX1BsYXllck1vdmVUaW1lOm51bWJlcjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8v5bi46YeP5a6a5LmJXHJcbiAgICAvL+avj+ihjOacgOWkp+agvOWtkOaVsFxyXG4gICAgZ2V0IExpbmVTdGVwTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9MaW5lU3RlcE51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xpbmVTdGVwTnVtID0gNSsyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTGluZVN0ZXBOdW07XHJcbiAgICB9IFxyXG4gICAgLy/mnIDlpKfooYzmlbBcclxuICAgIGdldCBNYXhMaW5lTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9NYXhMaW5lTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTWF4TGluZU51bSA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTWF4TGluZU51bTtcclxuICAgIH0gXHJcbiAgICAvL+agvOWtkOi+uemVv1xyXG4gICAgZ2V0IFN0ZXBMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcExlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBMZW5ndGggPSAwLjk4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcExlbmd0aDtcclxuICAgIH1cclxuICAgIC8v5qC85a2Q5pac5a+56KeS6ZW/5bqmXHJcbiAgICBnZXQgU3RlcERpc3RhbmNlKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1N0ZXBEaXN0YW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBEaXN0YW5jZSA9IE1hdGguc3FydCgodGhpcy5TdGVwTGVuZ3RoICogdGhpcy5TdGVwTGVuZ3RoKSAqIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcERpc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgLy/njqnlrrbnp7vliqjml7bpl7RcclxuICAgIGdldCBQbGF5ZXJNb3ZlVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9QbGF5ZXJNb3ZlVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1BsYXllck1vdmVUaW1lID0gMC4yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fUGxheWVyTW92ZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGxheWVySUQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBndWVzdEFnZW50OlBsYXllckd1ZXN0QWdlbnQgPSBQbGF5ZXJHdWVzdERlbGVnYXRlLkd1ZXN0QWdlbnQ7XHJcbiAgICAgICAgdmFyIGNoYXJhY3Rlckxpc3Q6QXJyYXk8bnVtYmVyPiA9IGd1ZXN0QWdlbnQuQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICBpZighY2hhcmFjdGVyTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighZ3Vlc3RBZ2VudC5CdXlDaGFyYWN0ZXIoaWQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ3Vlc3RBZ2VudC5TZXRDaGFyYWN0ZXIoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66K6+572u6Z2i5p2/XHJcbiAgICBTaG93U2V0UGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIFBhbmVsID0gQVBQLlVJTWFuYWdlci5TaG93PFNldFBhbmVsVUk+KFNldFBhbmVsVUkpOy8vIG5ldyBTZXRQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aYvuekuuaOkuihjOamnOmdouadv1xyXG4gICAgU2hvd1JhbmtQYW5lbCgpIHtcclxuICAgICAgICAvLyBpZighTGF5YS5Ccm93c2VyLm9uV2VpWGluIHx8IHR5cGVvZiB3eCA9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdmFyIFBhbmVsID0gQVBQLlVJTWFuYWdlci5TaG93PFJhbmtQYW5lbFVJPihSYW5rUGFuZWxVSSk7Ly8gbmV3IFNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5pi+56S66KeS6Imy6Z2i5p2/XHJcbiAgICBwdWJsaWMgU2hvd0NoYXJhY3RlclBhbmVsKCkge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBBUFAuVUlNYW5hZ2VyLlNob3c8Q2hhcmFjdGVyVUk+KENoYXJhY3RlclVJKTtcclxuICAgICAgICByZXR1cm4gY2hhcmFjdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1NldEluZm87XHJcbiAgICBnZXQgU2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIGlmICh0aGlzLl9TZXRJbmZvID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFNldEluZm8odmFsdWU6IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuX1NldEluZm8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/neWtmOiuvue9ruaVsOaNrlxyXG4gICAgU2F2ZVNldEluZm8oaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5TZXRJbmZvID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvL+ivu+WPluiuvue9ruS/oeaBr1xyXG4gICAgR2V0U2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJHYW1lVUkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBFbnRlckdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZURpcigpOiBHYW1lRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkRpcmVjdG9yIGFzIEdhbWVEaXJlY3RvcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR2FtZVNjZW5lKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DaGFuZ2VTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQQlVGRuihqOeOsOaViOaenFxyXG4gICAgR2VuQnVmZkVmZmVjdCh0eXBlOiBJdGVtVHlwZSk6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEJ1eUl0ZW0oaWQ6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkJ1eUl0ZW0oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIFRpbWVQYXVzZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShHYW1lTW9kdWxlLkV2ZW50Lk9uVGltZVBhdXNlKTtcclxuICAgIH1cclxuXHJcbiAgICBUaW1lQ29udGludWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoR2FtZU1vZHVsZS5FdmVudC5PblRpbWVDb250aW51ZSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFdlY2hhdE9wZW4ge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHdlY2hhdE9wZW46IFdlY2hhdE9wZW4gPSBudWxsO1xyXG4gICAgcHVibGljIGRhdGFDb250ZXh0ID0gbnVsbDtcclxuICAgIHByaXZhdGUgaXNEcmF3UmFuazogYm9vbGVhbiAvLyDmmK/lkKblvIDlp4vnu5jnlLvmjpLooYzmppzlhoXlrrlcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaXNEcmF3UmFuayA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHR5cGVvZiB3eCAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUNvbnRleHQgPSB3aW5kb3dbXCJ3eFwiXS5nZXRPcGVuRGF0YUNvbnRleHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY3lr7nosaHlrp7liJdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZXMoKTogV2VjaGF0T3BlbiB7XHJcbiAgICAgICAgaWYoIVdlY2hhdE9wZW4ud2VjaGF0T3Blbikge1xyXG4gICAgICAgICAgICBXZWNoYXRPcGVuLndlY2hhdE9wZW4gPSBuZXcgV2VjaGF0T3BlbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gV2VjaGF0T3Blbi53ZWNoYXRPcGVuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNjb3JlKHNjb3JlOmFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInVwZGF0ZVwiLFxyXG4gICAgICAgICAgICBzY29yZTogc2NvcmVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd3Bhc3Moc2NvcmU6YW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiZHJhd3Bhc3NcIixcclxuICAgICAgICAgICAgc2NvcmU6IHNjb3JlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyY2FudmFzZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlVG9PcGVuKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJjbGVhcmNhbnZhc2VcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZVJhbmsoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2xvc2VcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UmFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwicmFuZ2VcIixcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGNsZWFyU2NvcmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2xlYXJTY29yZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5SYW5rKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcIm9wZW5cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcG9zdE1lc3NhZ2VUb09wZW4oZGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YUNvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhQ29udGV4dC5wb3N0TWVzc2FnZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtRWxlbWVudCBleHRlbmRzIExheWEuQm94IHtcclxuICAgIC8vXHJcbiAgICBwcml2YXRlIG1fSXRlbUlkeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQnRuOiBMYXlhLkJ1dHRvbjtcclxuICAgIHByaXZhdGUgX0ltZzogTGF5YS5JbWFnZTtcclxuICAgIHByaXZhdGUgbV9OdW1MYWJlbDogTGF5YS5MYWJlbDtcclxuICAgIHByaXZhdGUgbV9MYWJlbFN0cmluZzogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIG1fQnV5SXRlbTogTWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgcHJpdmF0ZSBtX0Nob29zZUl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuXHJcbiAgICBnZXQgQnRuKCk6IExheWEuQnV0dG9uIHtcclxuICAgICAgICBpZiAodGhpcy5fQnRuID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBJdGVtSWR4KGlkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fSXRlbUlkeCA9IGlkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IEltZygpOiBMYXlhLkltYWdlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSW1nO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBCdXlCdG4oKTogTGF5YS5CdXR0b24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9CdG47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IEJ0bkxhYmxlKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXN0cilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX0J0bi50ZXh0LnRleHQgPSBzdHI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IElzR3JheSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuSW1nLmdyYXkgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgSXNHcmF5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkltZy5ncmF5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBOdW0obnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fTGFiZWxTdHJpbmdbMV0gPSBcIlwiICsgbnVtO1xyXG4gICAgICAgIHRoaXMubV9OdW1MYWJlbC50ZXh0ID0gdGhpcy5tX0xhYmVsU3RyaW5nWzBdICsgdGhpcy5tX0xhYmVsU3RyaW5nWzFdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBQcmljZShudW06IG51bWJlcikgIHtcclxuICAgICAgICB0aGlzLl9CdG4udGV4dC50ZXh0ID0gXCJcIiArIG51bTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgSW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9JbWcgPSB0aGlzLmdldENoaWxkQXQoMCkgYXMgTGF5YS5JbWFnZTtcclxuICAgICAgICB0aGlzLl9CdG4gPSB0aGlzLmdldENoaWxkQXQoMSkgYXMgTGF5YS5CdXR0b247XHJcbiAgICAgICAgdGhpcy5tX051bUxhYmVsID0gdGhpcy5nZXRDaGlsZEF0KDIpIGFzIExheWEuTGFiZWw7XHJcbiAgICAgICAgdGhpcy5fQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQnV5SXRlbSk7XHJcbiAgICAgICAgdGhpcy5fSW1nLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQ2hvb3NlSW1nKTtcclxuICAgICAgICBpZiAoIXRoaXMubV9MYWJlbFN0cmluZykgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0xhYmVsU3RyaW5nID0gdGhpcy5tX051bUxhYmVsLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2hvb3NlSW1nKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQ2hvb3NlSXRlbSlcclxuICAgICAgICAgICAgdGhpcy5tX0Nob29zZUl0ZW0uRXhlY3V0ZSh0aGlzLm1fSXRlbUlkeCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJ1eUl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9CdXlJdGVtKVxyXG4gICAgICAgICAgICB0aGlzLm1fQnV5SXRlbS5FeGVjdXRlKHRoaXMubV9JdGVtSWR4KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0QnV5KG93bmVyOiBhbnksIGxpc3RlbmVyOiAoaWQ6IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciBuZXdEZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fQnV5SXRlbSA9IG5ld0RlbGVnYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RDaG9vc2Uob3duZXI6IGFueSwgbGlzdGVuZXI6IChpZDogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdmFyIG5ld0RlbGVnYXRlID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZShvd25lciwgbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubV9DaG9vc2VJdGVtID0gbmV3RGVsZWdhdGU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlRWxlbWVudCBleHRlbmRzIExheWEuSW1hZ2Uge1xyXG4gICAgLy9cclxuICAgIHByaXZhdGUgX0J0bjogTGF5YS5CdXR0b247XHJcbiAgICBwcml2YXRlIF9JbWc6IExheWEuSW1hZ2U7XHJcbiAgICBwcml2YXRlIG1fT25DbGlja0ltZzooaWQ6bnVtYmVyKT0+dm9pZDtcclxuICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJJRDpudW1iZXI7XHJcbiAgICBnZXQgQnRuKCk6IExheWEuQnV0dG9uIHtcclxuICAgICAgICBpZiAodGhpcy5fQnRuID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgICAgICB0aGlzLl9CdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNldFBsYXllcklEKHRoaXMubV9DaGFyYWN0ZXJJRCk7XHJcbiAgICAgICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlQ3VyVmlldygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG5cclxuICAgIFJlc2V0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fSW1nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRHcmF5KGlzR3JheTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0ltZy5ncmF5ID0gaXNHcmF5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RPbkltZ0NsaWNrKGV2ZW50RnVuY3Rpb246KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGlkPXRoaXMubV9DaGFyYWN0ZXJJRDtcclxuICAgICAgICB0aGlzLl9JbWcub24oTGF5YS5FdmVudC5DTElDSyxudWxsLGV2ZW50RnVuY3Rpb24pOy8vIG93bmVyLCAoKT0+eyBldmVudEZ1bmN0aW9uKGlkKSB9IClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IENoYXJhY3RlcklEKGlkOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQ2hhcmFjdGVySUQgPSBpZDtcclxuICAgIH1cclxuICAgIEluaXQoKSAge1xyXG4gICAgICAgIHRoaXMuX0ltZyA9IHRoaXMuZ2V0Q2hpbGRBdCgwKSBhcyBMYXlhLkltYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydHtCYXNlRnVuY30gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCR1VJIGV4dGVuZHMgdWkuQkdVSSB7XHJcbiAgICBcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiQkdcIikpKTtcclxuICAgIH1cclxuICAgIC8vcHJpdmF0ZSBfU2t5QXJyOkFycmF5PExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1NreVF1ZTpCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+O1xyXG4gICAgcHJpdmF0ZSBfVGVtcFNreVF1ZTpCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+O1xyXG4gICAgcHJpdmF0ZSBfU2NhbGVTa3k6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfU2NhbGVFYXJ0aDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9FYXJ0aFN0YXJ0UFM6bnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHdpZGggPSBMYXlhLnN0YWdlLndpZHRoIDtcclxuICAgICAgICB2YXIgcmF0ZSA9IE1hdGguY2VpbChMYXlhLnN0YWdlLmhlaWdodC93aWRoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fU2t5UXVlID0gbmV3IEJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT4oKTtcclxuICAgICAgICB0aGlzLl9UZW1wU2t5UXVlID0gbmV3IEJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT4oKTtcclxuICAgICAgICAgLy9uZXcgQXJyYXk8TGF5YS5JbWFnZT4ocmF0ZSsxKTtcclxuICAgICAgICBmb3IobGV0IHN0YXJ0SWR4ID0gMDtzdGFydElkeDxyYXRlKzE7ICsrc3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGltYWdlOkxheWEuSW1hZ2UgPSBuZXcgTGF5YS5JbWFnZSgpO1xyXG4gICAgICAgICAgICBpbWFnZS5sb2FkSW1hZ2UoXCJjb21wL2ltZ19iYWNrZ3JvdW5kX3Nwcl9za3kucG5nXCIpO1xyXG4gICAgICAgICAgICBpbWFnZS53aWR0aCA9IHdpZGg7XHJcbiAgICAgICAgICAgIGltYWdlLmhlaWdodCA9IHdpZGgrd2lkaCowLjAxO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGltYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5fU2t5UXVlLlB1c2goaW1hZ2UpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdGhpcy5TZXRTa3koMCk7XHJcbiAgICAgICAgdmFyIGVhcnRoID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgICAgICBlYXJ0aC55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0VhcnRoU3RhcnRQUyA9IGVhcnRoLnk7XHJcbiAgICAgICAgZWFydGgubG9hZEltYWdlKFwiY29tcC9pbWdfYmFja2dyb3VuZF9zcHIucG5nXCIpO1xyXG4gICAgICAgIHRoaXMuX0VhcnRoID0gZWFydGg7XHJcbiAgICAgICAgZWFydGgud2lkdGggPSB3aWRoO1xyXG4gICAgICAgIGVhcnRoLmhlaWdodCA9IHdpZGg7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChlYXJ0aCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fU2NhbGVTa3kgPSAwLjAwMVxyXG4gICAgICAgIHRoaXMuX1NjYWxlRWFydGggPSAwLjAxXHJcbiAgICAgICAgLy90aGlzLl9FYXJ0aFN0YXJ0UFMgPSB0aGlzLl9FYXJ0aC55O1xyXG4gICAgfVxyXG4gICAgLypcclxuICAgIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIGZvcihsZXQgc3RhcnRJZHg6bnVtYmVyID0gMDtzdGFydElkeDx0aGlzLl9Ta3lRdWUuQ291bnQ7KytzdGFydElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Ta3lBcnJbc3RhcnRJZHhdLnkgPSBzdGFydElkeCAqIGhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fRWFydGgueSA9IExheWEuc3RhZ2UuaGVpZ2h0IC0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9FYXJ0aFN0YXJ0UFMgPSB0aGlzLl9FYXJ0aC55O1xyXG4gICAgfSovXHJcbiAgICAvL+mrmOW6pui9rOWxj+W5lemrmOW6puWDj+e0oFxyXG4gICAgSGVpZ2h0VHJhbnNQaXgoIGhlaWdodDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGhlaWdodCotMC4xO1xyXG4gICAgfVxyXG4gICAgU2V0U2t5KHBpeEhlaWdodDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbVNreVF1ZTpCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+ID0gdGhpcy5fVGVtcFNreVF1ZTtcclxuICAgICAgICB0ZW1Ta3lRdWUuQ2xlYXIoKTtcclxuICAgICAgICB2YXIgY291bnQ6bnVtYmVyID0gMDtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB3aGlsZSh0aGlzLl9Ta3lRdWUuQ291bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOkJhc2VGdW5jLk5vZGU8TGF5YS5TcHJpdGU+ID0gdGhpcy5fU2t5UXVlLlBvcE5vZGUoKTtcclxuICAgICAgICAgICAgdmFyIHNreUltZzpMYXlhLlNwcml0ZSA9IG5vZGUuVmFsdWU7XHJcbiAgICAgICAgICAgIHNreUltZy55ID0gY291bnQgKiBoZWlnaHQgKyBwaXhIZWlnaHQgLSBoZWlnaHQgLSBoZWlnaHQqMC4wMTtcclxuICAgICAgICAgICAgdGVtU2t5UXVlLlB1c2hOb2RlKG5vZGUpO1xyXG4gICAgICAgICAgICBpZihza3lJbWcueT5MYXlhLnN0YWdlLmhlaWdodClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2t5SW1nLnkgPSB0ZW1Ta3lRdWUuSGVhZFZhbHVlLnkgLSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKytjb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVGVtcFNreVF1ZSA9IHRoaXMuX1NreVF1ZTtcclxuICAgICAgICB0aGlzLl9Ta3lRdWUgPSB0ZW1Ta3lRdWU7XHJcbiAgICB9XHJcbiAgICBTZXRFYXJ0aChoZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0VhcnRoLnkgPSB0aGlzLl9FYXJ0aFN0YXJ0UFMgKyBoZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBVcGRhdGVQYWdlKCBoZWlnaHQ6bnVtYmVyIClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIC8vaGVpZ2h0ID0gdGhpcy5IZWlnaHRUcmFuc1BpeChoZWlnaHQpO1xyXG4gICAgICAgIC8vdmFyIHNreUhlaWdodFBpeCA9IGhlaWdodCp0aGlzLl9TY2FsZVNreTtcclxuICAgICAgICB0aGlzLlNldFNreShoZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuU2V0RWFydGgoaGVpZ2h0KTtcclxuICAgICAgICAvL3ZhciBlYXJ0aEhlaWdodFBpeCA9IGhlaWdodDtcclxuXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtVSUZ1bmN9IGZyb20gXCIuLy4uL1V0aWxpdHkvVUlGdW5jXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuXHJcbi8vVUnln7rnsbtcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZVVJIGV4dGVuZHMgTGF5YS5Cb3hcclxue1xyXG4gICAgXHJcbiAgICBcclxuICAgIC8vXHJcbiAgICBwcm90ZWN0ZWQgX1VJVHlwZTpCYXNlRW51bS5VSVR5cGVFbnVtO1xyXG4gICAgcHJvdGVjdGVkIF9Jc011dGV4OmJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX05hbWU6c3RyaW5nOyAgICBcclxuICAgIHByb3RlY3RlZCBfVUlNYW5hZ2VyOlVJTWFuYWdlclxyXG4gICAgcHJpdmF0ZSBfRGlydHk6Ym9vbGVhbjtcclxuICAgIHByaXZhdGUgX1Nob3dpbmc6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5Mb3c7XHJcbiAgICAgICAgdGhpcy5fSXNNdXRleCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuX1Nob3dpbmcgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMubGVmdCA9IDA7XHJcblx0ICAgIC8vIHRoaXMucmlnaHQgPSAwO1xyXG5cdFx0Ly8gdGhpcy5ib3R0b20gPSAwO1xyXG4gICAgICAgIC8vIHRoaXMudG9wID0gMDtcclxuICAgIH1cclxuICAgIEhpZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuT1AoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5PcGVuKCk7XHJcbiAgICB9XHJcbiAgICBDbG9zZU9QKClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBEZXN0cm95KCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFVJVHlwZSgpOkJhc2VFbnVtLlVJVHlwZUVudW1cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUlUeXBlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgSXNNdXRleCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNNdXRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTaG93aW5nKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TaG93aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+5VUnov5vooYzpgILphY1cclxuICAgICAqIEBwYXJhbSBVSSDpgILphY1VSVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRml4VUkoVUk6TGF5YS5WaWV3KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoVUkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldERpcnR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBEaXJ0eSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fRGlydHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENsZWFyRGlydHkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBVSVVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9EaXJ0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xlYXJEaXJ0eSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IFVwZGF0ZSgpOnZvaWQ7XHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEZXIGZyb20gXCIuLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi8uLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIiBcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQVBQXCI7XHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi9FbnRlckdhbWVVSVwiO1xyXG5pbXBvcnQgQ2hhcmFjdGVyVUlTY2VuZSBmcm9tIFwiLi4vU2NlbmUvQ2hhcmFjdGVyVUlTY2VuZVwiO1xyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuL0VuZEdhbWVVSVwiO1xyXG5pbXBvcnQgQ2hhcmFjdGVyTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvQ2hhcmFjdGVyTWFtYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclwiO1xyXG5cclxuY2xhc3MgRXh0ZW5kQ2hhcmFjdGVyc1VJIGV4dGVuZHMgdWkuQ2hhcmFjdGVyVUkge1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJDaGFyYWN0ZXJcIikpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJVSSBleHRlbmRzIEJhc2VVSSB7XHJcblxyXG4gICAgcHJpdmF0ZSBtX0NoYXJhY3Rlckxpc3Q6IEFycmF5PGFueT47XHJcbiAgICBwcml2YXRlIG1fR29sZERpc2NyaWJlOiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgc3ByaXRlQmdBcnI6TGF5YS5TcHJpdGVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBjaGFyYWN0ZXJVSVNjZW5lOkNoYXJhY3RlclVJU2NlbmU7XHJcbiAgICBwcml2YXRlIGNudENoYXJhY3RlcklkOm51bWJlcjtcclxuICAgIHByaXZhdGUgX1VJOiBFeHRlbmRDaGFyYWN0ZXJzVUk7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25maWcgPSB7XCJpbWdcIjpcclxuICAgICAgICBbICAgXHJcbiAgICAgICAgICAgIHtrZXk6XCJiZ1wiLHRleHR1cmVOYW1lOlwibWFpbmJnLmpwZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImNoYXJhY3RlcnJvbGUwYmdcIix0ZXh0dXJlTmFtZTpcInJvbGViZ2NpcmNsZS5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJjaGFyYWN0ZXJyb2xlMWJnXCIsdGV4dHVyZU5hbWU6XCJyb2xlYmdjaXJjbGUucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiY2hhcmFjdGVycm9sZTJiZ1wiLHRleHR1cmVOYW1lOlwicm9sZWJnY2lyY2xlLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImNoYXJhY3RlcnJvbGUzYmdcIix0ZXh0dXJlTmFtZTpcInJvbGViZ2NpcmNsZS5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJjaGFyYWN0ZXJyb2xlNGJnXCIsdGV4dHVyZU5hbWU6XCJyb2xlYmdjaXJjbGUucG5nXCJ9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcImJhY2tCdG5cIix0ZXh0dXJlTmFtZTpcImJhY2sucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiYnV5QnRuXCIsdGV4dHVyZU5hbWU6XCJidXkucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5Olwic3RhcnRHYW1lXCIsdGV4dHVyZU5hbWU6XCJzdGFydC5wbmdcIn1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZENoYXJhY3RlcnNVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuR2V0Q2hhcmFjdGVyTGlzdCgpO1xyXG4gICAgICAgIC8vdGhpcy5TZXRMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBbXTtcclxuICAgICAgICAvL3RoaXMubV9Hb2xkRGlzY3JpYmUgPSB0aGlzLl9VSS5fR29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLk9uTW9uZXlDaGFuZ2UoKTtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC5zdHJva2UgPSAyO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnN0cm9rZUNvbG9yID0gXCIweGZmMDAwMFwiO1xyXG5cclxuICAgICAgICB0aGlzLl9VSS5iYWNrQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQmFja0dhbWVCdG4pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVCZ0Fyci5wdXNoKHRoaXMuX1VJLmNoYXJhY3RlcnJvbGUwYmcpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQmdBcnIucHVzaCh0aGlzLl9VSS5jaGFyYWN0ZXJyb2xlMWJnKTtcclxuICAgICAgICB0aGlzLnNwcml0ZUJnQXJyLnB1c2godGhpcy5fVUkuY2hhcmFjdGVycm9sZTJiZyk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVCZ0Fyci5wdXNoKHRoaXMuX1VJLmNoYXJhY3RlcnJvbGUzYmcpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQmdBcnIucHVzaCh0aGlzLl9VSS5jaGFyYWN0ZXJyb2xlNGJnKTtcclxuXHJcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuc3ByaXRlQmdBcnIubGVuZ3RoO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLm5hbWUgPSBpICsgXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLnNlbGVjdFJvbGVQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY250Q2hhcmFjdGVySWQgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNudENoYXJhY3RlcklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fVUkuc3RhcnRHYW1lLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuc3RhcnRFdmVudCk7XHJcbiAgICAgICAgdGhpcy5fVUkuYnV5QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuT25DbGlja0ltZyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGZTY2VuZVVJKCkge1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmNvbmZpZ1trZXldLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1VJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5za2luID0gKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRFdmVudCgpOiB2b2lkIHtcclxuICAgICAgICBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0UGxheWVySUQodGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpO1xyXG4gICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjaGVja0lzTG9jayhpZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICBpZihjaGFyYWN0ZXJbaWRdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUm9sZUluZm8oaWQpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmNoZWNrSXNMb2NrKGlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5zdGFydEdhbWUudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmJ1eUJ0bi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmdvbGRpbWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLnJvbGV1c2VOb25leS50ZXh0ID0gXCLlt7Lop6PplIFcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLnN0YXJ0R2FtZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmJ1eUJ0bi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkuZ29sZGltZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkucm9sZXVzZU5vbmV5LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudGV4dCA9IENoYXJhY3Rlck1hbmFnZXIuTWdyLkdldFByaWNlKHRoaXMuY250Q2hhcmFjdGVySWQpICsgXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkucm9sZU5hbWUudGV4dCA9IENoYXJhY3Rlck1hbmFnZXIuTWdyLkdldE5hbWUoaWQpO1xyXG4gICAgICAgIHRoaXMuX1VJLmRlc2MudGV4dCA9IENoYXJhY3Rlck1hbmFnZXIuTWdyLkdldERlc2MoaWQpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnRleHQgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXkgKyBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdFJvbGVQb3NpdGlvbihlOkxheWEuRXZlbnQpOiB2b2lkIHsgXHJcbiAgICAgICAgdmFyIGNudFRhcmdldCA9IGUuY3VycmVudFRhcmdldDtcclxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXJVSVNjZW5lIHx8IHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jbnRTZWxlY3RJbmRleCA9PSBwYXJzZUludChjbnRUYXJnZXQubmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9VSS5zdGFydEdhbWUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLmJ1eUJ0bi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuZ29sZGltZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkucm9sZXVzZU5vbmV5LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLnVwZGF0ZVNlbGVjdEluZGV4KHBhcnNlSW50KGNudFRhcmdldC5uYW1lKSk7XHJcbiAgICAgICAgdGhpcy5Jbml0UG9zaXRpb24obnVsbCk7XHJcbiAgICB9XHJcblxyXG4gICAgSW5pdFBvc2l0aW9uKGRhdGEpOiB2b2lkIHtcclxuICAgICAgICBpZighdGhpcy5jaGFyYWN0ZXJVSVNjZW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0YSkge1xyXG4gICAgICAgICAgICB0aGlzLmNudENoYXJhY3RlcklkID0gdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250Q2hhcmFjdGVySWQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBudW0gPSB0aGlzLmNoYXJhY3RlclVJU2NlbmUuYXJyYXlEaXMubGVuZ3RoO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IG51bTtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBfb3V0UG9zOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNhbWVyYS52aWV3cG9ydC5wcm9qZWN0KHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5hcnJheURpc1tpXS50cmFuc2Zvcm0ucG9zaXRpb24sIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jYW1lcmEucHJvamVjdGlvblZpZXdNYXRyaXgsIF9vdXRQb3MpO1xyXG4gICAgICAgICAgICB2YXIgX291dFBvczEgPSBuZXcgTGF5YS5Qb2ludChfb3V0UG9zLngsIF9vdXRQb3MueSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmxheW91dGJnLmdsb2JhbFRvTG9jYWwoX291dFBvczEpO1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLnBvcyhfb3V0UG9zMS54IC8gTGF5YS5zdGFnZS5jbGllbnRTY2FsZVgsIF9vdXRQb3MxLnkgLyBMYXlhLnN0YWdlLmNsaWVudFNjYWxlWSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0ucGl2b3RYID0gMjA3IC8gMjtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS5waXZvdFkgPSB0aGlzLnNwcml0ZUJnQXJyW2ldLmhlaWdodCAtIDU7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0udmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLnNjYWxlWCA9IDAuOCArICgodGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmFycmF5RGlzW2ldLnRyYW5zZm9ybS5sb2NhbFNjYWxlWCAtIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5pbml0U2NhbE51bSkgLyAwLjAwNCkgKiAwLjI7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0uc2NhbGVZID0gMC44ICsgKCh0aGlzLmNoYXJhY3RlclVJU2NlbmUuYXJyYXlEaXNbaV0udHJhbnNmb3JtLmxvY2FsU2NhbGVYIC0gdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmluaXRTY2FsTnVtKSAvIDAuMDA0KSAqIDAuMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQmFja0dhbWVCdG4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdG9wUm9hdGVUaW1lcigpO1xyXG4gICAgICAgIHZhciBlbnRlcnBhbmVsOkVudGVyR2FtZVVJID0gQVBQLlVJTWFuYWdlci5HZXRVSUJ5TmFtZShcIkVudGVyR2FtZVVJXCIpIGFzIEVudGVyR2FtZVVJO1xyXG4gICAgICAgIGVudGVycGFuZWwuX1VJLnkgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKGVudGVycGFuZWwuX1VJLCB7eTogMH0sIDUwMCwgTGF5YS5FYXNlLnNpbmVPdXQpO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcywge3k6IC1MYXlhLnN0YWdlLmhlaWdodH0sIDUwMCwgTGF5YS5FYXNlLnNpbmVPdXQsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCk9PntcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5fVUkucmVtb3ZlQ2hpbGQodGhpcy5jaGFyYWN0ZXJVSVNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wUm9hdGVUaW1lcigpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmNoYXJhY3RlclVJU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNsZWFyUm9hdGVUaW1lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkNoYXJhY3RlclVJXCI7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0Q2hhcmFjdGVyTGlzdCgpICB7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRJRExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgc3VwZXIuTGF5b3V0KCk7XHJcbiAgICAgICAgaWYoIXRoaXMuX1VJIHx8ICF0aGlzLl9VSS5iZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLmJnLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuXHJcbiAgICAgICAgdmFyIHNjYWxlWCA9IExheWEuc3RhZ2Uud2lkdGggLyBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB2YXIgc2NhbGVZID0gNzUwIC8gMTMzNDtcclxuICAgICAgICBpZihzY2FsZVggPiBzY2FsZVkpIHtcclxuICAgICAgICAgICAgc2NhbGVZID0gc2NhbGVZIC8gc2NhbGVYO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5sYXlvdXRiZy5waXZvdFggPSA3NTAgLyAyO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5sYXlvdXRiZy5waXZvdFkgPSAxMzM0IC8gMjtcclxuICAgICAgICAgICAgdmFyIF9vdXRQb3M6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY2FtZXJhLnZpZXdwb3J0LnByb2plY3QobmV3IExheWEuVmVjdG9yMygwLCAtdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLnN0YXJ0WSAtIDAuMDEsIDApLCB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY2FtZXJhLnByb2plY3Rpb25WaWV3TWF0cml4LCBfb3V0UG9zKTtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0YmcueCA9IF9vdXRQb3MueDtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0YmcueSA9IF9vdXRQb3MueTtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0Ymcuc2NhbGVYID0gdGhpcy5fVUkubGF5b3V0Ymcuc2NhbGVZID0gc2NhbGVZO1xyXG4gICAgICAgICAgICB0aGlzLkluaXRQb3NpdGlvbihudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCkgeyAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBPcGVuKCkgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckNoYXJhY3RlcklEQ2hhbmdlLCB0aGlzLk9uTmVlZENsb3NlVUksIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsIHRoaXMuT25Nb25leUNoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DaGFyYWN0ZXJMaXN0Q2hhbmdlLCB0aGlzLk9uQ2hhbmdlTGlzdCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lID0gbmV3IENoYXJhY3RlclVJU2NlbmUodGhpcy5jbnRDaGFyYWN0ZXJJZCAsIHRoaXMuSW5pdFBvc2l0aW9uLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuX1VJLmFkZENoaWxkKHRoaXMuY2hhcmFjdGVyVUlTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5zcHJpdGVCZ0Fyci5sZW5ndGg7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5Jbml0UG9zaXRpb24oKTtcclxuICAgICAgICB9LmJpbmQodGhpcyksIDUwMCk7XHJcbiAgICAgICAgdGhpcy5MYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZSgpICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJDaGFyYWN0ZXJJRENoYW5nZSwgdGhpcy5Pbk5lZWRDbG9zZVVJLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLCB0aGlzLk9uTW9uZXlDaGFuZ2UsIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSwgdGhpcy5PbkNoYW5nZUxpc3QsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5LqL5Lu2XHJcbiAgICBwcml2YXRlIE9uQ2xpY2tJbWcoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSXNMb2NrKHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jbnRTZWxlY3RJbmRleCkpICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5CYWNrR2FtZUJ0bigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRQbGF5ZXJJRCh0aGlzLmNoYXJhY3RlclVJU2NlbmUuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuT25Nb25leUNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUm9sZUluZm8odGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uTmVlZENsb3NlVUkoKTogdm9pZCAge1xyXG4gICAgICAgIGlmICghdGhpcy5TaG93aW5nKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQmFja0dhbWVCdG4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2hhbmdlTGlzdCgpICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QucmVmcmVzaCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbk1vbmV5Q2hhbmdlKCkgIHtcclxuICAgICAgICBpZiAoIXRoaXMuU2hvd2luZykgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMubV9Hb2xkRGlzY3JpYmVbMV0gPSBcIlwiICsgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5O1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX0dvbGQudGV4dCA9IHRoaXMubV9Hb2xkRGlzY3JpYmVbMF0gKyB0aGlzLm1fR29sZERpc2NyaWJlWzFdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnRleHQgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXkgKyBcIlwiO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnN0cm9rZSA9IDI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dvbGQuc3Ryb2tlQ29sb3IgPSBcIjB4ZmYwMDAwXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtHYW1lU3RydWN0IH0gIGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuXHJcbmNsYXNzIEV4dGVuZEVuZEdhbWVVSSBleHRlbmRzIHVpLkVuZEdhbWVVSSB7XHJcbiAgICBQYW5lbDpMYXlhLlBhbmVsO1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJFbmRHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL3RoaXMuUGFuZWwgPSB0aGlzLlBhbmVsO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbC52U2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9NZW51ZUJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLEd1aWRlck1hbmFnZXIuTWdyLEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuX1NldEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dTZXRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRCdG4ub24oTGF5YS5FdmVudC5DTElDSyxDb250cm9sZXIuR2FtZUNvbnRyb2xlcixDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJFbmRHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIFVJOkV4dGVuZEVuZEdhbWVVSTtcclxuXHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJtYWluYmcuanBnXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiZW5kZ2FtZXRpdGxlXCIsdGV4dHVyZU5hbWU6XCJlbmRnYW1lZGFpemkucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiZW5kZ2FtZWhlbnRpYW9cIix0ZXh0dXJlTmFtZTpcImluZm90aWFvLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImVuZGdhbWViZ2ljb25cIix0ZXh0dXJlTmFtZTpcImlucHV0dGV4dGFyZWEucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiZGliZ1wiLHRleHR1cmVOYW1lOlwiaW5wdXR0ZXh0YXJlYS5wbmdcIn1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnRuXCI6XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7a2V5OlwiX1N0YXJ0QnRuXCIsdGV4dHVyZU5hbWU6XCJyZXN0YXJ0LnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcIl9NZW51ZUJ0blwiLHRleHR1cmVOYW1lOlwiaG9tZUJ0bi5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJfU2V0QnRuXCIsdGV4dHVyZU5hbWU6XCJzZXR0aW5nLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcIl9QbGF5ZXJMaXN0QnRuXCIsdGV4dHVyZU5hbWU6XCJwYWloYW5nLnBuZ1wifVxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlU2VsZlNjZW5lVUkoKSB7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5jb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuY29uZmlnW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uc2tpbiA9IChQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuVUk9IG5ldyBFeHRlbmRFbmRHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuVUkpO1xyXG4gICAgICAgIC8vdGhpcy5VSS5fQ2hhcmFjdGVyTGlzdC5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgdGhpcy5fVUlNYW5hZ2VyLlNob3c8UGxheWVyTGlzdFVJPihQbGF5ZXJMaXN0VUkpfSk7XHJcbiAgICAgICAgdGhpcy5MYXlvdXQoKTtcclxuICAgICAgICB0aGlzLlVJLmRpc3RhbmNlLnRleHQgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5EaXN0YW5jZSArIFwiXCI7XHJcbiAgICAgICAgdGhpcy5VSS5nb2xkLnRleHQgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HYW1lR29sZCArIFwiXCI7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpIHtcclxuICAgICAgICBzdXBlci5MYXlvdXQoKTtcclxuICAgICAgICBpZighdGhpcy5VSSB8fCAhdGhpcy5VSS5iZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVUkuYmcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuVUkuYmcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBGTSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFBsYXllckxpc3RVSSBmcm9tIFwiLi8uLi91aS9QbGF5ZXJMaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCI7XHJcblxyXG5jbGFzcyBFeHRlbmRFbnRlckdhbWVVSSBleHRlbmRzIHVpLkVudGVyVUkge1xyXG4gICAgUGFuZWw6IExheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuUGFuZWwgPSB0aGlzLl9QYW5lbDtcclxuICAgICAgICB0aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXIub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5TaG93Q2hhcmFjdGVyUGFuZWwpO1xyXG4gICAgICAgIC8vdGhpcy5fQ2hhcmFjdGVyLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuc2hvd0NoYXJhY3Rlcik7XHJcbiAgICAgICAgdGhpcy5fU2V0UGFuZWwub24oTGF5YS5FdmVudC5DTElDSywgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICAvL3RoaXMuX1Jhbmsub24oTGF5YS5FdmVudC5DTElDSywgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1JhbmtQYW5lbCk7XHJcbiAgICAgICAgLy90aGlzLl9TdGFydC5vbihMYXlhLkV2ZW50LkNMSUNLLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25TdGFydCk7XHJcblxyXG4gICAgICAgIHRoaXMuX0NoYXJhY3Rlckxpc3QudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUGFuZWwudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9SYW5rW1wiaW5pdFhcIl0gPSB0aGlzLl9SYW5rLng7XHJcbiAgICAgICAgdGhpcy5fUmFua1tcImluaXRZXCJdID0gdGhpcy5fUmFuay55O1xyXG4gICAgICAgIHRoaXMuX1NldFBhbmVsW1wiaW5pdFhcIl0gPSB0aGlzLl9TZXRQYW5lbC54O1xyXG4gICAgICAgIHRoaXMuX1NldFBhbmVsW1wiaW5pdFlcIl0gPSB0aGlzLl9TZXRQYW5lbC55O1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0W1wiaW5pdFhcIl0gPSB0aGlzLl9TdGFydC54O1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0W1wiaW5pdFlcIl0gPSB0aGlzLl9TdGFydC55O1xyXG4gICAgICAgIHRoaXMuX0NoYXJhY3RlcltcImluaXRYXCJdID0gdGhpcy5fQ2hhcmFjdGVyLng7XHJcbiAgICAgICAgdGhpcy5fQ2hhcmFjdGVyW1wiaW5pdFlcIl0gPSB0aGlzLl9DaGFyYWN0ZXIueTtcclxuICAgICAgICB0aGlzLmFkdltcImluaXRYXCJdID0gdGhpcy5hZHYueDtcclxuICAgICAgICB0aGlzLmFkdltcImluaXRZXCJdID0gdGhpcy5hZHYueTtcclxuICAgIH1cclxuXHJcbiAgICBTaG93Q2hhcmFjdGVyUGFuZWwoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd0NoYXJhY3RlclBhbmVsKCk7XHJcbiAgICAgICAgbm9kZS55ID0gLUxheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIExheWEuVHdlZW4udG8obm9kZSwge3k6IDB9LCA1MDAsIExheWEuRWFzZS5zaW5lT3V0KTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMsIHt5OiBMYXlhLnN0YWdlLmhlaWdodH0sIDUwMCwgTGF5YS5FYXNlLnNpbmVPdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3RhcnQoKTp2b2lkIHtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX1JhbmssIHt5OnRoaXMuX1JhbmsueSArIExheWEuc3RhZ2UuaGVpZ2h0IC0gdGhpcy5fQ2hhcmFjdGVyLnl9LCAxNTAsIExheWEuRWFzZS5zaW5lSW4pO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fU2V0UGFuZWwsIHt5OnRoaXMuX1NldFBhbmVsLnkgICsgTGF5YS5zdGFnZS5oZWlnaHQgLSB0aGlzLl9DaGFyYWN0ZXIueX0sIDE1MCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLl9TdGFydCwge3g6dGhpcy5fU3RhcnQueSAgKyBMYXlhLnN0YWdlLndpZHRoIC0gdGhpcy5fU3RhcnQueH0sIDI1MCwgTGF5YS5FYXNlLnNpbmVJbiwgTGF5YS5IYW5kbGVyLmNyZWF0ZShHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpKTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX0NoYXJhY3Rlciwge3k6dGhpcy5fQ2hhcmFjdGVyLnkgIC0gTGF5YS5zdGFnZS5oZWlnaHR9LCAxNTAsIExheWEuRWFzZS5zaW5lSW4pO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5hZHYsIHt5OnRoaXMuYWR2LnkgICsgTGF5YS5zdGFnZS5oZWlnaHQgLSB0aGlzLl9DaGFyYWN0ZXIueX0sIDE1MCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLl9sb2dvLCB7YWxwaGE6MC4yfSwgMTAwLCBMYXlhLkVhc2Uuc2luZUluKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50ZXJHYW1lVUkgZXh0ZW5kcyBCYXNlVUkge1xyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJFbnRlckdhbWVVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIF9VSTogRXh0ZW5kRW50ZXJHYW1lVUk7XHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJtYWluYmcuanBnXCJ9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcIl9DaGFyYWN0ZXJcIix0ZXh0dXJlTmFtZTpcInJvbGUucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiX1N0YXJ0XCIsdGV4dHVyZU5hbWU6XCJzdGFydC5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJfU2V0UGFuZWxcIix0ZXh0dXJlTmFtZTpcInNldHRpbmcucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiYWR2XCIsdGV4dHVyZU5hbWU6XCJhZC5wbmdcIn1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgbV9CdG5Hcm91cDogQXJyYXk8TGF5YS5JbWFnZT47XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRFbnRlckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHZhciB1aU1ncjogVUlNYW5hZ2VyID0gdGhpcy5fVUlNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubV9CdG5Hcm91cCA9IFtdO1xyXG4gICAgICAgIC8vIHZhciBpbWcgPSBuZXcgTGF5YS5JbWFnZSgpO1xyXG4gICAgICAgIC8vIGltZy5sb2FkSW1hZ2UoXCJ1cmVyZVwiKTtcclxuICAgICAgICAvLyB0aGlzLmFkZENoaWxkKGltZyk7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fQ2hhcmFjdGVyTGlzdC5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgdWlNZ3IuU2hvdzxQbGF5ZXJMaXN0VUk+KFBsYXllckxpc3RVSSl9KTtcclxuICAgICAgICB0aGlzLkxheW91dCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxmU2NlbmVVSSgpIHtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5jb25maWdba2V5XS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uc2tpbiA9IChQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgSW5pdEJ0bkdyb3VwKCkge1xyXG4gICAgICAgIHZhciBDdXJNYXhMZXZlbCA9IEdhbWVBZ2VudC5BZ2VudC5DdXJNYXhMZXZlbDtcclxuICAgICAgICB2YXIgY3VyTGV2ZWwgPSBHYW1lQWdlbnQuQWdlbnQuQ3VyTGV2ZWw7XHJcbiAgICAgICAgdmFyIGJ0bk51bSA9IHRoaXMuX1VJLl9Hcm91cC5udW1DaGlsZHJlbjtcclxuICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLm1fQnRuR3JvdXA7XHJcbiAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYnRuTnVtOyArK2lkeCkge1xyXG4gICAgICAgICAgICB2YXIgYnRuOiBhbnkgPSB0aGlzLl9VSS5fR3JvdXAuZ2V0Q2hpbGRBdChpZHgpIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgICAgIGJ0bi5pZHggPSBpZHg7XHJcbiAgICAgICAgICAgIGJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2hvb3NlKVxyXG4gICAgICAgICAgICBidG4uZ3JheSA9IHRydWU7XHJcbiAgICAgICAgICAgIGdyb3VwLnB1c2goYnRuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ3JvdXBbY3VyTGV2ZWxdLmdyYXkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgT3BlbigpIHtcclxuICAgICAgICB0aGlzLkluaXRCdG5Hcm91cCgpO1xyXG4gICAgICAgIHRoaXMueSA9IDA7XHJcbiAgICAgICAgdGhpcy5fVUkuX2xvZ28uYWxwaGEgPSAxO1xyXG4gICAgICAgIGlmKCF0aGlzLl9VSS5fUmFua1tcImluaXRYXCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuX1JhbmsueCA9IHRoaXMuX1VJLl9SYW5rW1wiaW5pdFhcIl07XHJcbiAgICAgICAgdGhpcy5fVUkuX1JhbmsueSA9IHRoaXMuX1VJLl9SYW5rW1wiaW5pdFlcIl07XHJcbiAgICAgICAgdGhpcy5fVUkuX1NldFBhbmVsLnggPSB0aGlzLl9VSS5fU2V0UGFuZWxbXCJpbml0WFwiXTtcclxuICAgICAgICB0aGlzLl9VSS5fU2V0UGFuZWwueSA9IHRoaXMuX1VJLl9TZXRQYW5lbFtcImluaXRZXCJdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9TdGFydC54ID0gdGhpcy5fVUkuX1N0YXJ0W1wiaW5pdFhcIl07XHJcbiAgICAgICAgdGhpcy5fVUkuX1N0YXJ0LnkgPSB0aGlzLl9VSS5fU3RhcnRbXCJpbml0WVwiXTtcclxuICAgICAgICB0aGlzLl9VSS5fQ2hhcmFjdGVyLnggPSB0aGlzLl9VSS5fQ2hhcmFjdGVyW1wiaW5pdFhcIl07XHJcbiAgICAgICAgdGhpcy5fVUkuX0NoYXJhY3Rlci55ID0gdGhpcy5fVUkuX0NoYXJhY3RlcltcImluaXRZXCJdO1xyXG4gICAgICAgIHRoaXMuX1VJLmFkdi54ID0gdGhpcy5fVUkuYWR2W1wiaW5pdFhcIl07XHJcbiAgICAgICAgdGhpcy5fVUkuYWR2LnkgPSB0aGlzLl9VSS5hZHZbXCJpbml0WVwiXTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpIHtcclxuICAgICAgICBzdXBlci5MYXlvdXQoKTtcclxuICAgICAgICBpZighdGhpcy5fVUkgfHwgIXRoaXMuX1VJLmJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuYmcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX1VJLmJnLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8v5LqL5Lu2XHJcbiAgICBPbkNob29zZShpbmZvOiBFdmVudCkge1xyXG4gICAgICAgIHZhciB0YXJnZXQ6YW55ID0gaW5mby50YXJnZXQ7XHJcbiAgICAgICAgdmFyIGlkeDogbnVtYmVyID0gdGFyZ2V0LmlkeDtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VyTGV2ZWwgPSBpZHg7XHJcbiAgICAgICAgdGhpcy5tX0J0bkdyb3VwLmZvckVhY2goKGltZzogTGF5YS5JbWFnZSkgPT4ge1xyXG4gICAgICAgICAgICBpbWcuZ3JheSA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5tX0J0bkdyb3VwW2lkeF0uZ3JheSA9IGZhbHNlO1xyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOWcuuaZr1VJXHJcbiAqL1xyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckVudGl0eVwiXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi4vR2FtZS9HYW1lTW9kdWxlXCI7XHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLi9BZ2VudC9HYW1lQWdlbnRcIjtcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgSXRlbUxpc3RVSSBmcm9tIFwiLi9JdGVtTGlzdFVJXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5cclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiO1xyXG5jbGFzcyBFeHRlbmRzR2FtZVVJIGV4dGVuZHMgdWkuR2FtZVVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVwiKSkpO1xyXG4gICAgfVxyXG4gICAgU2V0Q291bnRUaW1lKGluZm86IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICB0aGlzLl9Db3VudFRpbWUudGV4dCA9IGluZm87XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBwcml2YXRlIF9VSTogRXh0ZW5kc0dhbWVVSTtcclxuICAgIHByaXZhdGUgbV9vbkNsaWNrU2tpbGxJdGVtOiBNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBwcml2YXRlIG1fb25DTGlja1BsYXllckl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIC8vXHJcbiAgICBwdWJsaWMgRGlzdGFuY2VTdHI6IEFycmF5PHN0cmluZz47XHJcbiAgICBwdWJsaWMgR29sZE51bVN0cjogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICBzZXQgR2FtZVBhbmVsKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dhbWVQYW5lbC52aXNpYmxlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgRGlzdGFuY2UodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBkaXMgPSBcIlwiICsgdmFsdWU7XHJcbiAgICAgICAgaWYgKGRpcyA9PSB0aGlzLkRpc3RhbmNlU3RyWzFdKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gZGlzO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIHNldCBHb2xkTnVtKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1Nob3dEaXN0YW5jZSgpIHtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0RGlzdGFuY2UudGV4dCA9IHRoaXMuRGlzdGFuY2VTdHJbMF0gKyB0aGlzLkRpc3RhbmNlU3RyWzFdO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1Nob3dHb2xkTnVtKCkge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHRHb2xkLnRleHQgPSB0aGlzLkdvbGROdW1TdHJbMF0gKyB0aGlzLkdvbGROdW1TdHJbMV07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkdhbWVVSVwiO1xyXG4gICAgfVxyXG4gICAgc2V0IEdvbGQoZ29sZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyWzFdID0gZ29sZC50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX0lzTXV0ZXggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubGVmdCA9IDA7XHJcbiAgICAgICAgdGhpcy5yaWdodCA9IDA7XHJcbiAgICAgICAgdGhpcy5ib3R0b20gPSAwO1xyXG4gICAgICAgIHRoaXMudG9wID0gMDtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdmFyIG9wSXNSaWdodCA9IEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRJbmZvLk9QSXNSaWdodDtcclxuICAgICAgICB0aGlzLl9VSS5fSXRlbUxpc3RCdG4ub24oTGF5YS5FdmVudC5DTElDSywgbnVsbCwgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9VSU1hbmFnZXIuU2hvdzxJdGVtTGlzdFVJPihJdGVtTGlzdFVJKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuU2V0Q291bnRUaW1lKCk7XHJcbiBcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyID0gdGhpcy5fVUkuX1R4dERpc3RhbmNlLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHJbMV0gPSBcIjBcIlxyXG4gICAgICAgIHRoaXMuX1Nob3dEaXN0YW5jZSgpO1xyXG5cclxuICAgICAgICB0aGlzLkdvbGROdW1TdHIgPSB0aGlzLl9VSS5fVHh0R29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSBcIjBcIjtcclxuICAgICAgICB0aGlzLl9TaG93R29sZE51bSgpO1xyXG5cclxuICAgICAgICB0aGlzLlNob3dJbnB1dEluZm8oXCJcIik7XHJcbiAgICAgICAgdGhpcy5fVUkuX1BsYXllckl0ZW0ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5PbkNsaWNrUGxheWVySXRlbSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1NraWxsSXRlbS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2xpY2tTa2lsbEl0ZW0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIFNldExlZnRUb3VjaChvd25lcjogYW55LCBMaXN0ZW5lcjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX1VJLl9MZWZ0VG91Y2gub24oTGF5YS5FdmVudC5DTElDSywgb3duZXIsIExpc3RlbmVyKTsgXHJcbiAgICB9XHJcblxyXG4gICAgU2V0UmlnaHRUb3VjaChvd25lcjogYW55LCBMaXN0ZW5lcjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX1VJLl9SaWdodFRvdWNoLm9uKExheWEuRXZlbnQuQ0xJQ0ssIG93bmVyLCBMaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0Q291bnRUaW1lKGluZm86IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICBpZiAoaW5mbyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9Db3VudERvd25VSS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZVBhbmVsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9Db3VudERvd25VSS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuU2V0Q291bnRUaW1lKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIFNob3dJdGVtKCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1BsYXllckl0ZW0oKTtcclxuICAgICAgICB0aGlzLlNob3dDaGFyYWN0ZWVySXRlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S6546p5a626YCJ5oup6YGT5YW3XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBTaG93UGxheWVySXRlbSgpIHtcclxuICAgICAgICB2YXIgaXRlbU51bSA9IEdhbWVBZ2VudC5BZ2VudC5HYW1lSXRlbU51bTtcclxuICAgICAgICBpZiAoaXRlbU51bSA8IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX1BsYXllckl0ZW0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9QbGF5ZXJJdGVtLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuinkuiJsumBk+WFt1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgU2hvd0NoYXJhY3RlZXJJdGVtKCkge1xyXG4gICAgICAgIHZhciBpdGVtTnVtID0gR2FtZUFnZW50LkFnZW50LlNraWxsSXRlbU51bTtcclxuICAgICAgICBpZiAoaXRlbU51bSA8IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX1NraWxsSXRlbS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX1NraWxsSXRlbS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2hvd0lucHV0SW5mbyhpbmZvOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZUluZm8udGV4dCA9IGluZm87XHJcbiAgICB9XHJcbiAgICBPcGVuKCkge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VySXRlbU51bUNoYW5nZSwgdGhpcy5TaG93UGxheWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJJdGVtQ2hhbmdlLCB0aGlzLlNob3dQbGF5ZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KEdhbWVNb2R1bGUuRXZlbnQuT25DaGFyYWN0ZXJJdGVtQ2hhbmdlLCB0aGlzLlNob3dDaGFyYWN0ZWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5TaG93SXRlbSgpO1xyXG4gICAgfVxyXG4gICAgQ2xvc2UoKSB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJJdGVtTnVtQ2hhbmdlLCB0aGlzLlNob3dQbGF5ZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckl0ZW1DaGFuZ2UsIHRoaXMuU2hvd1BsYXllckl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoR2FtZU1vZHVsZS5FdmVudC5PbkNoYXJhY3Rlckl0ZW1DaGFuZ2UsIHRoaXMuU2hvd0NoYXJhY3RlZXJJdGVtLCB0aGlzKTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpIHtcclxuICAgICAgICAvL+aYvuekuumHkeW4geS/oeaBr1xyXG4gICAgICAgIHRoaXMuX1Nob3dHb2xkTnVtKCk7XHJcbiAgICAgICAgLy/mmL7npLrot53nprvkv6Hmga9cclxuICAgICAgICB0aGlzLl9TaG93RGlzdGFuY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0Q2xpY2tTa2lsbEl0ZW0ob3duZXI6IE9iamVjdCwgbGlzdGVuZXI6IChwYXJhbTogYW55KSA9PiBhbnkpIHtcclxuICAgICAgICB2YXIgZGVsZWdhdGU6IE1lc3NhZ2VNRC5EZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fb25DbGlja1NraWxsSXRlbSA9IGRlbGVnYXRlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFJlZ2lzdENsaWNrUGxheWVySXRlbShvd25lcjogT2JqZWN0LCBsaXN0ZW5lcjogKHBhcmFtOiBhbnkpID0+IGFueSkge1xyXG4gICAgICAgIHZhciBkZWxlZ2F0ZTogTWVzc2FnZU1ELkRlbGVnYXRlID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZShvd25lciwgbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubV9vbkNMaWNrUGxheWVySXRlbSA9IGRlbGVnYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25DbGlja1NraWxsSXRlbSgpIHtcclxuICAgICAgICB0aGlzLm1fb25DbGlja1NraWxsSXRlbS5FeGVjdXRlKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIE9uQ2xpY2tQbGF5ZXJJdGVtKCkge1xyXG4gICAgICAgIHRoaXMubV9vbkNMaWNrUGxheWVySXRlbS5FeGVjdXRlKCk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IHtQbGF5ZXJ9IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckVudGl0eVwiXHJcbmltcG9ydCB7R2FtZUFnZW50fSBmcm9tIFwiLi8uLi9BZ2VudC9HYW1lQWdlbnRcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBJdGVtRWxlbWVudCBmcm9tIFwiLi8uLi9zY3JpcHQvSXRlbUVsZW1lbnRcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi4vR2FtZS9HYW1lTW9kdWxlXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxuaW1wb3J0IEl0ZW1NYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlci9JdGVtTWFuYWdlclwiO1xyXG5cclxuY2xhc3MgRXh0ZW5kc0l0ZW1MaXN0VUkgZXh0ZW5kcyB1aS5JdGVtTGlzdFVJXHJcbntcclxuICAgIHByaXZhdGUgbV9JdGVtTGlzdDpBcnJheTxudW1iZXI+XHJcbiAgICBCdG5MaXN0ZW5lcjpNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBbXTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIikpKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVG9vbEl0ZW1VSSBleHRlbmRzIHVpLnRvb2xJdGVtVUlcclxue1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OkFycmF5PG51bWJlcj5cclxuICAgIEJ0bkxpc3RlbmVyOk1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9JdGVtTGlzdCA9IFtdO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJ0b29sSXRlbVwiKSkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1MaXN0VUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJJdGVtTGlzdFVJXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIFVJOkV4dGVuZHNJdGVtTGlzdFVJO1xyXG4gICAgcHJpdmF0ZSBtX0dvbGQ6c3RyaW5nW107XHJcbiAgICBwcml2YXRlIG1fSXRlbUxpc3Q6QXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgICBwdWJsaWMgYXJyYXlEaXM6TGF5YS5TcHJpdGVbXSA9IFtdO1xyXG4gICAgcHVibGljIGNudE51bSA9IDU7XHJcbiAgICBwdWJsaWMgc3RhcnRhbyA9IDI3MDtcclxuICAgIHB1YmxpYyBwZXJhbyA9IDM2MCAvIHRoaXMuY250TnVtO1xyXG4gICAgcHVibGljIHIgPSAyMzA7XHJcbiAgICBwdWJsaWMgc3RhcnRZID0gNTc1O1xyXG4gICAgcHVibGljIHN0YXJ0WCA9IDMwMDtcclxuICAgIHB1YmxpYyBjbnRTZWxlY3RJbmRleCA9IDA7XHJcblxyXG4gICAgcHVibGljIGNhbWVyYTpMYXlhLkNhbWVyYTtcclxuICAgIHB1YmxpYyBjbnRzdGFydGFvID0gOTA7XHJcbiAgICBwdWJsaWMgbW92ZVN0YXJhbyA9IDI7XHJcbiAgICBwdWJsaWMgbmV4dEFvID0gLTE7XHJcbiAgICBwdWJsaWMgaW5pdFNjYWxOdW0gPSAwLjAxODtcclxuXHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJtYWluYmcuanBnXCJ9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcImJhY2tCdG5cIix0ZXh0dXJlTmFtZTpcImJhY2sucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiYnV5QnRuXCIsdGV4dHVyZU5hbWU6XCJidXkucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiYmFja0J0blwiLHRleHR1cmVOYW1lOlwic3RhcnQucG5nXCJ9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5VSSA9IG5ldyBFeHRlbmRzSXRlbUxpc3RVSSgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5VSSk7XHJcbiAgICAgICAgdGhpcy5VSS5CdG5MaXN0ZW5lciA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUodGhpcywoKT0+eyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2UodGhpcyl9KVxyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU7XHJcbiAgICAgICAgLy90aGlzLlVwZGF0ZUxpc3QoKTtcclxuICAgICAgICAvL3RoaXMubV9Hb2xkID0gdGhpcy5VSS5fR29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLlVJLl9CRy5hbHBoYSA9IDA7XHJcbiAgICAgICAgdGhpcy5VSS5fQkcub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMuQ2xvc2VVSSk7XHJcbiAgICAgICAgdGhpcy5VSS5iYWNrQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcyx0aGlzLkNsb3NlVUkpO1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuTGF5b3V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSAwOy8vY250U2VsZWN0SW5kZXg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpID0gMCA7aSA8IHRoaXMuY250TnVtO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIGF1ZHQ6VG9vbEl0ZW1VSSA9IG5ldyBUb29sSXRlbVVJKCk7XHJcbiAgICAgICAgICAgIGF1ZHQudG9vbGljb24ubG9hZEltYWdlKEl0ZW1NYW5hZ2VyLk1nci5HZXRJdGVtSWNvbihpKSk7XHJcbiAgICAgICAgICAgIGF1ZHQudG9vbG5hbWUudGV4dCA9IEl0ZW1NYW5hZ2VyLk1nci5HZXRJdGVtSW5mbyhpKS5QYXNzc2NvcmU7XHJcbiAgICAgICAgICAgIC8vIGF1ZHQubG9hZEltYWdlKEl0ZW1NYW5hZ2VyLk1nci5HZXRJdGVtSWNvbihpKSk7XHJcbiAgICAgICAgICAgIGF1ZHQubmFtZSA9IGkgICsgXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5VSS5hZGRDaGlsZChhdWR0KTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheURpcy5wdXNoKGF1ZHQpO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuc2VsZWN0Um9sZVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9ICh0aGlzLmNudFNlbGVjdEluZGV4ICsgNSkgJSA1O1xyXG4gICAgICAgIHRoaXMuY250c3RhcnRhbyA9ICh0aGlzLnN0YXJ0YW8gKyAodGhpcy5jbnROdW0gLSB0aGlzLmNudFNlbGVjdEluZGV4KSAqIHRoaXMucGVyYW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICB0aGlzLlVJLmJ1eUJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkJ1eUl0ZW0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxmU2NlbmVVSSgpIHtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5jb25maWdba2V5XS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlVJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5za2luID0gKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIHNlbGVjdFJvbGVQb3NpdGlvbihlOkxheWEuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICB2YXIgY250VGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGlmKHRoaXMuY250U2VsZWN0SW5kZXggPT0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0Lm5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLlVJLmJhY2tCdG4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVUkuYnV5QnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlVJLm93bmVydHh0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlVJLmdvbGRpbWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVUkucm9sZXVzZU5vbmV5LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RJbmRleChwYXJzZUludChjbnRUYXJnZXQubmFtZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbENudFN0YXJ0YW8oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9ICh0aGlzLmNudFNlbGVjdEluZGV4ICsgNSkgJSA1O1xyXG4gICAgICAgIHRoaXMubmV4dEFvID0gKHRoaXMuc3RhcnRhbyArICh0aGlzLmNudE51bSAtIHRoaXMuY250U2VsZWN0SW5kZXgpICogdGhpcy5wZXJhbyArIDM2MCkgJSAzNjA7XHJcblxyXG4gICAgICAgIGlmKCh0aGlzLm5leHRBbyAtIHRoaXMuY250c3RhcnRhbyArIDM2MCkgJSAzNjAgPj0gMTgwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVN0YXJhbyA9IC0yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVN0YXJhbyA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEudGltZXIubG9vcCgwLjA1LCB0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGltZUFvQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY250c3RhcnRhbyA9PSB0aGlzLm5leHRBbykge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSB0aGlzLm5leHRBbztcclxuICAgICAgICAgICAgdGhpcy5uZXh0QW8gPSAtMTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxhc2NudEFvID0gdGhpcy5jbnRzdGFydGFvO1xyXG4gICAgICAgIHRoaXMuY250c3RhcnRhbyArPSB0aGlzLm1vdmVTdGFyYW87XHJcbiAgICAgICAgaWYodGhpcy5jbnRzdGFydGFvIDwgMCB8fCB0aGlzLmNudHN0YXJ0YW8gPT0gMzYwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9ICh0aGlzLmNudHN0YXJ0YW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgICAgICBsYXNjbnRBbyA9IHRoaXMuY250c3RhcnRhbyAtIHRoaXMubW92ZVN0YXJhbztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gKHRoaXMuY250c3RhcnRhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKChsYXNjbnRBbyA+PSB0aGlzLm5leHRBbyAmJiB0aGlzLmNudHN0YXJ0YW8gPD0gdGhpcy5uZXh0QW8pIHx8IChsYXNjbnRBbyA8PSB0aGlzLm5leHRBbyAmJiB0aGlzLmNudHN0YXJ0YW8gPj0gdGhpcy5uZXh0QW8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9IHRoaXMubmV4dEFvO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRBbyA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm5leHRBbyA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxlY3QoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgdGhpcy5hcnJheURpcy5sZW5ndGg7aSArKykge1xyXG4gICAgICAgICAgICB2YXIgYW8gPSAodGhpcy5jbnRzdGFydGFvICsgaSAqIHRoaXMucGVyYW8pICUgMzYwXHJcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5zdGFydFggKyB0aGlzLnIgKiBNYXRoLmNvcyhhbyAqIDMuMTQgLyAxODApO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHRoaXMuc3RhcnRZICsgdGhpcy5yICogTWF0aC5zaW4oYW8gKiAzLjE0IC8gMTgwKTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS54ID0geDtcclxuICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS55ID0geTtcclxuICAgICAgICAgICAgdmFyIHNjYWxlID0gKHkgLSB0aGlzLnN0YXJ0WSkgLyAyIC8gKHRoaXMuciAtIHRoaXMuc3RhcnRZKSAqIDAuMjtcclxuICAgICAgICAgICAgaWYoc2NhbGUgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS5zY2FsZVggPSB0aGlzLmFycmF5RGlzW2ldLnNjYWxlWSA9ICgwLjggKyBzY2FsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbaV0uc2NhbGVYID0gdGhpcy5hcnJheURpc1tpXS5zY2FsZVkgPSAwLjg7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVJvbGVJbmZvKGlkKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaWYodGhpcy5jaGVja0lzTG9jayhpZCkpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5fVUkuc3RhcnRHYW1lLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9VSS5idXlCdG4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9VSS5nb2xkaW1nLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5fVUkucm9sZXVzZU5vbmV5LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudGV4dCA9IFwi5bey6Kej6ZSBXCI7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2UgXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICB0aGlzLlVJLmJhY2tCdG4udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuYnV5QnRuLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlVJLmdvbGRpbWcudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVUkucm9sZXVzZU5vbmV5LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlVJLm93bmVydHh0LnZpc2libGUgPSB0cnVlOztcclxuICAgICAgICAgICAgdGhpcy5VSS5yb2xldXNlTm9uZXkudGV4dCA9IEl0ZW1NYW5hZ2VyLk1nci5HZXRQcmljZSh0aGlzLmNudFNlbGVjdEluZGV4KSArIFwiXCI7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgdmFyIG93bmVyTnVtID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lkl0ZW1MaXN0W3RoaXMuY250U2VsZWN0SW5kZXhdO1xyXG4gICAgICAgIGlmKCFvd25lck51bSkge1xyXG4gICAgICAgICAgICBvd25lck51bSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVUkub3duZXJ0eHQudGV4dCA9IFwi5bey5oul5pyJOlwiICsgb3duZXJOdW07XHJcbiAgICAgICAgdmFyIGl0ZW1JbmZvID0gSXRlbU1hbmFnZXIuTWdyLkdldEl0ZW1JbmZvKGlkKTtcclxuICAgICAgICB0aGlzLlVJLnJvbGVOYW1lLnRleHQgPSBpdGVtSW5mby5QYXNzc2NvcmU7XHJcbiAgICAgICAgdGhpcy5VSS5kZXNjLnRleHQgPSBpdGVtSW5mby5EZXNjO1xyXG4gICAgICAgIHRoaXMuVUkuX0dvbGQudGV4dCA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leSArIFwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsZWFyUm9hdGVUaW1lcigpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0Um9sZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4IC0tO1xyXG4gICAgICAgIHRoaXMuY2FsQ250U3RhcnRhbygpO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIG5leHRSb2xlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggKys7XHJcbiAgICAgICAgdGhpcy5jYWxDbnRTdGFydGFvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZWN0SW5kZXgoc2VsZWN0SW5kZXg6bnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYoc2VsZWN0SW5kZXggPT0gdGhpcy5jbnRTZWxlY3RJbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSBzZWxlY3RJbmRleDtcclxuICAgICAgICB0aGlzLmNhbENudFN0YXJ0YW8oKTtcclxuICAgIH0gXHJcblxyXG4gICAgcHVibGljIE9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsdGhpcy5TaG93R29sZCx0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlLHRoaXMuUmVmcmVzaExpc3QsdGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuVGltZVBhdXNlKCk7XHJcbiAgICAgICAgdGhpcy5TaG93R29sZCgpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlTGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuVGltZUNvbnRpbnVlKCk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSx0aGlzLlNob3dHb2xkLHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UsdGhpcy5SZWZyZXNoTGlzdCx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HZXRJdGVtTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuU2V0TGlzdCh0aGlzLm1fSXRlbUxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWZyZXNoTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HZXRJdGVtTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuRnJlc2hMaXN0KHRoaXMubV9JdGVtTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldEl0ZW1MaXN0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0U2VsbEl0ZW1JRExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd0dvbGQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLlNob3dpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5tX0dvbGRbMV0gPVwiXCIgKyBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXk7XHJcbiAgICAgICAgdGhpcy5VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9SZW5kZXJIYW5kbGVyKGNlbGw6TGF5YS5Cb3gsaW5kZXg6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJvbGVFbGVtZW50Okl0ZW1FbGVtZW50ID0gY2VsbCBhcyBJdGVtRWxlbWVudDtcclxuICAgICAgICB2YXIgaXRlbUxpc3Q6QXJyYXk8bnVtYmVyPiA9IEdhbWVBZ2VudC5BZ2VudC5JdGVtTGlzdDtcclxuICAgICAgICByb2xlRWxlbWVudC5Jbml0KCk7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuSXRlbUlkeCA9IHRoaXMubV9JdGVtTGlzdFtpbmRleF07XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVnaXN0QnV5KHRoaXMsdGhpcy5CdXlJdGVtKTtcclxuICAgICAgICByb2xlRWxlbWVudC5SZWdpc3RDaG9vc2UodGhpcyx0aGlzLkNob29zZUl0ZW0pO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LklzR3JheSA9IGl0ZW1MaXN0W3RoaXMubV9JdGVtTGlzdFtpbmRleF1dP2ZhbHNlOnRydWU7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuTnVtID0gaXRlbUxpc3RbdGhpcy5tX0l0ZW1MaXN0W2luZGV4XV0/aXRlbUxpc3RbdGhpcy5tX0l0ZW1MaXN0W2luZGV4XV06MDtcclxuICAgICAgICByb2xlRWxlbWVudC5CdG5MYWJsZSA9IFwiXCIgKyBHYW1lQVBQLkl0ZW1NZ3IuR2V0UHJpY2UodGhpcy5tX0l0ZW1MaXN0W2luZGV4XSkgKyBcIlwiO1xyXG4gICAgICAgIC8vcm9sZUVsZW1lbnQuU2V0QnRuKHRoaXMuQnRuTGlzdGVuZXIuTGlzdGVuZXIsdGhpcy5CdG5MaXN0ZW5lci5BY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0TGlzdChsaXN0QXJyYXk6QXJyYXk8YW55PilcclxuICAgIHtcclxuICAgICAgICAvL3ZhciBsaXN0QXJyYXk6QXJyYXk8YW55PiA9IHRoaXMubV9JdGVtTGlzdDtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnJlbmRlckhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsdGhpcy5fUmVuZGVySGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5hcnJheSA9IGxpc3RBcnJheTtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljRGlzdGFuY2UgPSA1MFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBGcmVzaExpc3QoaWRMaXN0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QuYXJyYXkgPSBpZExpc3Q7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIHN1cGVyLkxheW91dCgpO1xyXG4gICAgICAgIGlmKCF0aGlzLlVJIHx8ICF0aGlzLlVJLmJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5VSS5iZy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBCdXlJdGVtKGlkOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQnV5SXRlbSh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2hvb3NlSXRlbShpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuU2hvd2luZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKEdhbWVBZ2VudC5BZ2VudC5JdGVtTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VySXRlbSA9IGlkO1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VySXRlbSA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgQ2xvc2VVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DaG9vc2VJdGVtKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2UodGhpcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgV2VjaGF0T3BlbiB9IGZyb20gXCIuLi9wbGF0Zm9ybS9XZWNoYXRPcGVuXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5jbGFzcyBFeHRlbmRzUmFua1BhbmVsVUkgZXh0ZW5kcyB1aS5HYW1lUmFua1VJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVJhbmtcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy90aGlzLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57QVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5rUGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNSYW5rUGFuZWxVSTtcclxuICAgIHJhbmtUZXh0dXJlOiBMYXlhLlRleHR1cmU7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNSYW5rUGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLmNsb3NlQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsICgpID0+IHsgXHJcbiAgICAgICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkuY2xvc2VSYW5rKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlJhbmtQYW5lbFVJXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkub3BlblJhbmsoKTtcclxuICAgIH1cclxuXHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5yYW5rVGV4dHVyZS5iaXRtYXAuYWx3YXlzQ2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5yYW5rVGV4dHVyZS5kaXNwb3NlQml0bWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2VPUCgpIHtcclxuICAgICAgICB0aGlzLlNhdmVQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kc1NldFBhbmVsVUkgZXh0ZW5kcyB1aS5TZXRQYW5lbFVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiU2V0UGFuZWxcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy90aGlzLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57QVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXRQYW5lbFVJIGV4dGVuZHMgQmFzZVVJIHtcclxuICAgIF9VSTogRXh0ZW5kc1NldFBhbmVsVUk7XHJcbiAgICBzZWxlY3RlZEluZGV4Om51bWJlcjtcclxuICAgIHByaXZhdGUgY29uZmlnID0ge1wiaW1nXCI6XHJcbiAgICAgICAgWyAgIFxyXG4gICAgICAgICAgICB7a2V5OlwiYmdcIix0ZXh0dXJlTmFtZTpcIm1haW5iZy5qcGdcIn1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnRuXCI6XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7a2V5OlwiX1JldHVyblwiLHRleHR1cmVOYW1lOlwiYmFjay5wbmdcIn1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTsgXHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kc1NldFBhbmVsVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB0aGlzLl9VSS5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsICgpID0+IHsgdGhpcy5fVUlNYW5hZ2VyLkNsb3NlQ3VyVmlldygpOyBHdWlkZXJNYW5hZ2VyLk1nci5FbnRlclNjZW5lKCkgfSk7XHJcbiAgICAgICAgdGhpcy5fVUkudm9pY2VvcGVuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuVm9pY2VPcGVuKTtcclxuICAgICAgICB0aGlzLl9VSS52b2ljZWNsb3NlLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuVm9pY2VDbG9zZSk7IFxyXG4gICAgICAgIHZhciBpbmZvOiBHYW1lU3RydWN0LlNldEluZm8gPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HZXRTZXRJbmZvKCk7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5mby5BdWRpb09uID8gMSA6IDA7XHJcbiAgICAgICAgdGhpcy5TZXRQYW5lbCgpO1xyXG4gICAgICAgIHRoaXMuTGF5b3V0KCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlNldFBhbmVsVUlcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgVm9pY2VPcGVuKCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDE7XHJcbiAgICAgICAgdGhpcy5TZXRQYW5lbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIFZvaWNlQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLlNldFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGFuZWwoKSB7XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZEluZGV4ID09IDEpIHtcclxuICAgICAgICAgICAgKHRoaXMuX1VJLnZvaWNlb3Blbi5nZXRDaGlsZEF0KDIpIGFzIExheWEuSW1hZ2UpLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAodGhpcy5fVUkudm9pY2VjbG9zZS5nZXRDaGlsZEF0KDEpIGFzIExheWEuSW1hZ2UpLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgKHRoaXMuX1VJLnZvaWNlb3Blbi5nZXRDaGlsZEF0KDIpIGFzIExheWEuSW1hZ2UpLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgKHRoaXMuX1VJLnZvaWNlY2xvc2UuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkltYWdlKS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uT1BJc1JpZ2h0ID8gMSA6IDA7XHJcbiAgICAgICAgLy8gdGhpcy5fVUkuX1RleHQudGV4dCA9IGluZm8uVGV4dEluZm87XHJcbiAgICB9XHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICBpbmZvLkF1ZGlvT24gPSB0aGlzLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICAvL2luZm8uT1BJc1JpZ2h0ID0gdGhpcy5zZWxlY3RlZEluZGV4ID09IDE7XHJcbiAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2F2ZVNldEluZm8oaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIHN1cGVyLkxheW91dCgpO1xyXG4gICAgICAgIGlmKCF0aGlzLl9VSSB8fCAhdGhpcy5fVUkuYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5iZy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUkuYmcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2VPUCgpIHtcclxuICAgICAgICB0aGlzLlNhdmVQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHt9XHJcbn1cclxuIiwiaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi9CYXNlVUlcIlxyXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xyXG5cclxubW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Qcm9ncmVzczpMYXlhLlByb2dyZXNzQmFyO1xyXG5cdFx0cHVibGljIF9HdWlkZXI6TGF5YS5JbWFnZTtcclxuXHRcdHB1YmxpYyBfRW50ZXI6TGF5YS5CdXR0b247XHJcblx0XHRwdWJsaWMgRXJyb3JJbmZvOkxheWEuTGFiZWw7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkxvYWRpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFeHRMb2FkaW5nVUkgZXh0ZW5kcyB1aS5Mb2FkaW5nVUlcclxue1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMoXCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9hZGluZ1VJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgXCJMb2FkaW5nVUlcIjtcclxuICAgIH1cclxuICAgIF9VSTp1aS5Mb2FkaW5nVUk7XHJcbiAgICBfQ2FsbEJhY2s6KCk9PnZvaWQ7XHJcbiAgICBjb25zdHJ1Y3RvciggbmFtZTpzdHJpbmcgKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIC8vdGhpcy5fVUkgPW5ldyB1aS5Mb2FkaW5nVUkoKTtcclxuICAgICAgICB0aGlzLl9VSSA9bmV3IEV4dExvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkgKTtcclxuICAgICAgICB0aGlzLlZhbHVlID0gMDtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci52aXNpYmxlID1mYWxzZTtcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuX0NhbGxCYWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5MYXlvdXQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgeDpudW1iZXIgPSAwO1xyXG4gICAgICAgIHggKz0gdGhpcy5fVUkuX1Byb2dyZXNzLndpZHRoKnRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZTtcclxuICAgICAgICB0aGlzLl9VSS5fR3VpZGVyLnBvcyh4LHRoaXMuX1VJLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpIHtcclxuICAgICAgICBpZighdGhpcy5fVUkgfHwgIXRoaXMuX1VJW1wiYmdcIl0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSVtcImJnXCJdLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9VSVtcImJnXCJdLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBWYWx1ZShudW06bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZSA9IG51bTtcclxuICAgICAgICB0aGlzLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2YWx1ZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgQ29tcGxldGUoY2FsbEJhY2s6KCk9PnZvaWQpXHJcbiAgICB7XHJcblxyXG4gICAgICAgIC8vY2FsbEJhY2soKTtcclxuICAgICAgICB0aGlzLl9DYWxsQmFjayA9IGNhbGxCYWNrO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIubGFiZWwgPSBcIlwiOy8vdGhpcy5fTmFtZVswXTtcclxuICAgIH1cclxuICAgIFJlbG9hZChzdHIsIGNhbGxCYWNrOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby50ZXh0ID0gc3RyO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8ud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBCR1VJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfRWFydGg6TGF5YS5JbWFnZTtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkJHXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgYmc6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgbGF5b3V0Ymc6TGF5YS5Cb3g7XG5cdFx0cHVibGljIHJvbGVOYW1lOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGRlc2M6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgZ29sZGltZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgcm9sZXVzZU5vbmV5OkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGJ1eUJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgY2hhcmFjdGVycm9sZTFiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgY2hhcmFjdGVycm9sZTRiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgY2hhcmFjdGVycm9sZTJiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgY2hhcmFjdGVycm9sZTNiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgY2hhcmFjdGVycm9sZTBiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgc3RhcnRHYW1lOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfR29sZDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBiYWNrQnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTGlzdDpMYXlhLkxpc3Q7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJDaGFyYWN0ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEVuZEdhbWVVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgYmc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIGVuZGdhbWViZ2ljb246TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgZGliZzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBfU3RhcnRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9NZW51ZUJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1NldEJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BsYXllckxpc3RCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIGVuZGdhbWVoZW50aWFvOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBlbmRnYW1ldGl0bGU6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIGRpc3RhbmNlOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGdvbGQ6TGF5YS5MYWJlbDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVuZEdhbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEVudGVyVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIGJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBfbG9nbzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgX1N0YXJ0OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUGFuZWw6TGF5YS5QYW5lbDtcblx0XHRwdWJsaWMgX0dyb3VwOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIF9TZXRQYW5lbDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0NoYXJhY3Rlckxpc3Q6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIGFkdjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1Jhbms6TGF5YS5CdXR0b247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJFbnRlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfQ291bnREb3duVUk6TGF5YS5Cb3g7XG5cdFx0cHVibGljIF9JdGVtTGlzdEJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0NvdW50VGltZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfR2FtZUluZm86TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX0dhbWVQYW5lbDpMYXlhLkJveDtcblx0XHRwdWJsaWMgX1R4dERpc3RhbmNlOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9UeHRHb2xkOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9MZWZ0VG91Y2g6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SaWdodFRvdWNoOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfU2tpbGxJdGVtOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUGxheWVySXRlbTpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkdhbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVSYW5rVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIGNsb3NlQnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBnYW1lUmFua1VpOmxheWEudWkuV1hPcGVuRGF0YVZpZXdlcjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkdhbWVSYW5rXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBJdGVtTGlzdFVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfQkc6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgYmc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIF9MaXN0OkxheWEuTGlzdDtcblx0XHRwdWJsaWMgYmFja0J0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0dvbGQ6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgcm9sZU5hbWU6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgZGVzYzpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBnb2xkaW1nOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyByb2xldXNlTm9uZXk6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgYnV5QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBvd25lcnR4dDpMYXlhLkxhYmVsO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiSXRlbUxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1BsYXllckxpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBfUmV0dXJuTWFpbjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlBsYXllckxpc3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIGJnOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIF9UZXh0OkxheWEuVGV4dEFyZWE7XG5cdFx0cHVibGljIF9SZXR1cm46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIHZvaWNlb3BlbjpMYXlhLkJveDtcblx0XHRwdWJsaWMgdm9pY2VjbG9zZTpMYXlhLkJveDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlNldFBhbmVsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyB0b29sSXRlbVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyB0b29saWNvbjpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgdG9vbG5hbWU6TGF5YS5MYWJlbDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcInRvb2xJdGVtXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyIl19
