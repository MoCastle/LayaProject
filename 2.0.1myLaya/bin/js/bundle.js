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
},{"../controler/GameAPP":42,"./../Game/GameModule":24,"./../controler/APP":41,"./BaseAgent":1,"./PlayerEntity":3}],3:[function(require,module,exports){
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
            this.m_CurLevel = interestinglife.m_CurLevel || 1;
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
                return this.m_CurLevel; // ? this.m_CurLevel : this.m_HistoryMaxLevel;
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
            localData.m_CurLevel = this.m_CurLevel;
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
},{"../platform/WechatOpen":44,"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10}],4:[function(require,module,exports){
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
            return "entersceneui/res" + this.m_PlayerEntity.CurLevel + "/";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayerGuestAgent.prototype, "CurLevel", {
        get: function () {
            return this.m_PlayerEntity.CurLevel;
        },
        set: function (val) {
            this.m_PlayerEntity.CurLevel = val;
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
},{"./../controler/GameAPP":42,"./BaseAgent":1}],5:[function(require,module,exports){
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
},{"./../FrameWork/BaseManager":8,"./../Scene/Scene":37}],12:[function(require,module,exports){
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
},{"../controler/APP":41,"./../Base/BaseEnum":5,"./../Utility/UIFunc":40,"./BaseManager":8}],14:[function(require,module,exports){
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
    GameConfig.startScene = "Game.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = true;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/ItemElement":45,"./script/RoleElement":46}],15:[function(require,module,exports){
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
},{"../Utility/Path":39,"./GameManager":16}],16:[function(require,module,exports){
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
},{"../Utility/Path":39}],17:[function(require,module,exports){
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
},{"./../Utility/Path":39,"./../controler/APP":41,"./../controler/GameControler":43}],19:[function(require,module,exports){
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
        AnimEnum[AnimEnum["Die"] = 5] = "Die";
    })(AnimEnum = Character.AnimEnum || (Character.AnimEnum = {}));
    var AnimType;
    AnimType = {};
    AnimType[AnimEnum.Stand] = "idle";
    AnimType[AnimEnum.Jump] = "jumpUp";
    AnimType[AnimEnum.Jumpdown] = "jumpDown";
    AnimType[AnimEnum.Fly] = "fly";
    AnimType[AnimEnum.Fall] = "fall";
    AnimType[AnimEnum.Die] = "die";
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
var CharactorAnimator = /** @class */ (function () {
    function CharactorAnimator(animator) {
        this.m_Aniamtor = animator;
        this.m_StateMap = {};
        if (!animator)
            return;
        var layer = animator.getControllerLayer()._statesMap;
        for (var key in layer) {
            this.m_StateMap[key] = layer[key];
        }
    }
    Object.defineProperty(CharactorAnimator.prototype, "speed", {
        get: function () {
            return this.m_Aniamtor.speed;
        },
        set: function (value) {
            this.m_Aniamtor.speed = value;
        },
        enumerable: true,
        configurable: true
    });
    CharactorAnimator.prototype.GetState = function (name) {
        var animatorState = this.m_StateMap[name];
        if (!animatorState) {
            var idleState = this.m_Aniamtor.getDefaultState();
            animatorState = new Laya.AnimatorState();
            animatorState.name = name;
            animatorState.clip = idleState.clip;
            this.m_Aniamtor.addState(animatorState);
        }
        return animatorState;
    };
    CharactorAnimator.prototype.Play = function (name) {
        if (this.m_StateMap[name])
            this.m_Aniamtor.play(name);
    };
    CharactorAnimator.prototype.linkSprite3DToAvatarNode = function (nodeName, sprite3D) {
        this.m_Aniamtor.linkSprite3DToAvatarNode(nodeName, sprite3D);
    };
    return CharactorAnimator;
}());
exports.default = CharactorAnimator;
},{}],21:[function(require,module,exports){
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
        var PlayerPS = this.Camera.Player.m_LogicPosition;
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
},{"../Base/BaseFunc":6}],22:[function(require,module,exports){
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
            this.RewardList.push(new LayItemMgr(50, 50, ItemType.Fly, 20));
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
                this.Model.transform.rotationEuler = new Laya.Vector3(0, 180, 0);
                this.Step.PutInItem(this.Model); // .addChild(this.Model);
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
            this._GenItemModel();
            if (this.Model) {
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
            var curLocation = player.CurStep.Location;
            this.m_FloorSwitch = player.CurStep.Floor.rightSwitch;
            this._FinalLocation = new GameStruct_1.GameStruct.MLocation(curLocation.X, curLocation.Y);
            this._FinalLocation.Y += this.Floor;
            this._FinalZ = player.Position.z - GameModule_1.GameModule.DSpace * this.Floor;
            var flyCtrl = new PlayerCtrler_1.PlayerControler.PlayerFly(this.Speed);
            player.AddCtrler(flyCtrl);
            player.Fly();
            GameControler_1.default.GameControler.GameDir.GamePlay.AddInputCtrler(new Input_1.Input.DIYInput());
            GameControler_1.default.GameControler.GameDir.GamePlay.SetSafePS(this._FinalLocation);
            player.FlyPrepare();
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
},{"./../FrameWork/MessageCenter":10,"./../Game/AnimObj":18,"./../Utility/Path":39,"./../controler/APP":41,"./../controler/GameControler":43,"./GameModule":24,"./GameStruct":25,"./Input":26,"./PlayerCtrler":29}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MountLine_1 = require("./MountLine");
var GameStruct_1 = require("./GameStruct");
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
        var _this = this;
        floorNum = 7;
        column = 7;
        _this = _super.call(this) || this;
        _this.m_MountLines = [];
        _this.m_CurIdx = 0;
        _this.m_HeadFloorIdx = 0;
        _this.m_TailFLoorIdx = 0;
        _this.m_ItemLayout = new GameItem_1.Item.ItemLayout();
        _this.m_CurLineBarriers = new Array();
        _this.m_CurLineRewards = new Array();
        _this.m_rightSwitchCount = 0;
        _this.m_SafeLocation = new GameStruct_1.GameStruct.MLocation(-1, -1);
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
            if (idx > 1)
                lines[idx - 1].SetNextFloor(line);
            if (idx == startFloor) {
                var PlayerStep = line.GetStep(Math.floor(line.Length / 2));
                PlayerStep.IsDeadRoad = false;
                this.m_SafeLocation = PlayerStep.Location;
            }
            this.PutItemInLine(idx);
        }
        for (var startFloorNum = 0; startFloorNum < startFloor; ++startFloorNum) {
            lines[startFloorNum].active = false;
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
        if (!lastFloor)
            return safeMap;
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
        this.AddSwitch(dir);
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
},{"./GameItem":22,"./GameStruct":25,"./MountLine":27}],24:[function(require,module,exports){
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
    GameModule.HSpace = 3;
    GameModule.VSpace = 2.5;
    GameModule.DSpace = 0.75;
})(GameModule = exports.GameModule || (exports.GameModule = {}));
},{}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
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
},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Step_1 = require("./Step");
var GameModule_1 = require("./GameModule");
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
            startX += GameModule_1.GameModule.HSpace;
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
        this.OddSwitch = 0;
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
        var distance = Math.ceil(lastFloor.rightSwitch / 2) - Math.ceil(this.rightSwitch / 2);
        var oddSwitch = 0;
        var position = lastFloor.Position;
        if (this.JugIsOdd()) {
            oddSwitch = -1;
        }
        else {
            oddSwitch = 0;
        }
        position.x = Math.ceil(lastFloor.rightSwitch / 2) * GameModule_1.GameModule.HSpace + oddSwitch * GameModule_1.GameModule.HSpace / 2;
        lastFloor.OddSwitch = oddSwitch;
        lastFloor.Position = position;
        //判断是否有两头端点
        for (var startIdx = 0; startIdx < this.m_StepList.length; ++startIdx) {
            var leftParent = null;
            var rightParent = null;
            var leftParentIdx = startIdx - distance - (1 + oddSwitch);
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
},{"./GameModule":24,"./Step":30}],28:[function(require,module,exports){
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
        _this.m_Parent = new Laya.Sprite3D();
        _this.m_Parent.name = "PlayerParent";
        APP_1.default.SceneManager.CurScene.PutObj(_this.m_Parent);
        _this.m_Parent.addChild(_this);
        _this.transform.position = new Laya.Vector3();
        _this.transform.rotation = new Laya.Quaternion();
        //添加自定义模型
        _this.m_Parent.on(Laya.Event.REMOVED, _this, function () { _this.destroy(); });
        var mgr = GameAPP_1.default.CharacterMgr;
        _this.m_Idx = num;
        ++num;
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
            return this.m_Parent.transform.position.clone();
        },
        set: function (newPS) {
            var newPS = newPS.clone();
            this.m_Parent.transform.position = newPS;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "LogicPosition", {
        get: function () {
            return this.m_LogicPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "playerModel", {
        get: function () {
            return this.m_PlayerModel;
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
        this.m_PlayerModel = playerModel;
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
        this.m_PlayerModel.transform.rotation = rotation;
    };
    Player.prototype.ModelRotateEular = function (vector) {
        this.m_PlayerModel.transform.rotationEuler = vector;
    };
    Player.prototype.SetPlayerModel = function (model) {
        this.addChild(model);
        this.m_Parent.transform.rotate(new Laya.Vector3(0, 180, 0), false, false);
        this.m_Animator = model.getChildAt(0).getComponent(Laya.Animator);
        //new CharactorAnimator(this.m_Animator);
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
        this.m_LogicPosition = new Laya.Vector3(0, 0);
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
        this.m_LogicPosition = putStep.Position;
        this.m_Animator.play(Character_1.Character.PlayerAnimName(Character_1.Character.AnimEnum.Stand));
        this.TouchGround();
        this.CurStep.StandOnGround(this);
    };
    /**
     * 布局当前层但不移动
     * @param {Step} step 下一步台阶
     */
    Player.prototype.LayStep = function (step) {
        this.CurStep = step;
        this.m_LogicPosition = step.Position;
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
        this.CurStep.TouchGround(this);
    };
    /**
     * 移动
     * @param {Laya.Vector3} vector 移动向量值
     */
    Player.prototype.Translate = function (vector) {
        this.m_Parent.transform.translate(vector, false);
        Laya.Vector3.add(this.m_LogicPosition, vector, this.m_LogicPosition);
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
    Player.prototype.ResetParenet = function () {
        this.m_Parent.addChild(this);
        this.transform.position = this.m_Parent.transform.position.clone();
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
},{"../Utility/Path":39,"./../FrameWork/MessageCenter":10,"./../controler/APP":41,"./../controler/GameAPP":42,"./../controler/GameControler":43,"./Character":19,"./GameItem":22,"./PlayerCtrler":29}],29:[function(require,module,exports){
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
            this.player.ResetParenet();
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
            var stepPS = player.CurStep.Position;
            stepPS.y += GameModule_1.GameModule.VSpace;
            //player.Translate(new Laya.Vector3(0, GameModule.VSpace, 0));
            player.Position = stepPS;
            player.transform.rotationEuler = new Laya.Vector3(0, 180, 0);
            player.ModelRotateEular(new Laya.Vector3(0, 180, 0));
        };
        PlayerFly.prototype._Update = function () {
            if (this.player == null) {
                return;
            }
            var vector = new Laya.Vector3(0, GameModule_1.GameModule.VSpace, -GameModule_1.GameModule.DSpace);
            Laya.Vector3.scale(vector, 0.06, vector);
            this.player.Translate(vector);
        };
        PlayerFly.prototype.OnComplete = function () { };
        PlayerFly.prototype.OnStart = function () {
        };
        return PlayerFly;
    }(BasePlayerCtrler));
    PlayerControler.PlayerFly = PlayerFly;
})(PlayerControler = exports.PlayerControler || (exports.PlayerControler = {}));
},{"./../controler/APP":41,"./../controler/GameControler":43,"./GameModule":24}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameItem_1 = require("./GameItem");
var GameStruct_1 = require("./GameStruct");
var Path_1 = require("./../Utility/Path");
var APP_1 = require("./../controler/APP");
var CharacterAnimator_1 = require("./CharacterAnimator");
//步
var Step = /** @class */ (function (_super) {
    __extends(Step, _super);
    function Step(floor, idx) {
        var _this = 
        //super(new Laya.BoxMesh(1,1,1) );
        _super.call(this) || this;
        if (_this.Idx != 0) {
            var Idx = Math.floor(1 + Math.random() * Step.stepModelNum);
            //var name: string = path.GetLH("L01_spr_plat_0" + Idx)
            var name = Path_1.path.GetLH("L01_spr_plat_01");
            var model = Laya.loader.getRes(name);
        }
        //model = new Laya.MeshSprite3D( Laya.PrimitiveMesh.createBox(0.5, 0.5, 0.5)) ;//loader.getRes(name);
        var cloneModel = model.clone();
        _this.m_CharacterAnimator = new StepAnimator(cloneModel.getComponent(Laya.Animator), _this);
        _this.m_CharacterAnimator.Init();
        cloneModel.transform.position = new Laya.Vector3();
        _this.m_StepModel = cloneModel;
        var standPoint = new Laya.Sprite3D;
        _this.m_StepModel.getChildAt(0).addChild(standPoint);
        _this.m_CharacterAnimator.linkSprite3DToAvatarNode("PlayerFootPoint", standPoint);
        _this.m_StandPoint = standPoint;
        standPoint.transform.position = new Laya.Vector3();
        _this.addChild(cloneModel);
        _this.transform.position = new Laya.Vector3();
        _this.StepItem = GameItem_1.Item.StepItemFactory(GameItem_1.Item.ItemType.None, _this);
        _this.StepItem.ResetItem();
        _this.Floor = floor;
        _this.Idx = idx;
        _this.LeftParent = null;
        _this.RightParent = null;
        _this.LeftChild = null;
        _this.RightChild = null;
        _this._IsDeadRoad = false;
        _this.RoadNum = 0;
        _this.locked = false;
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
        this.locked = false;
        this.m_CharacterAnimator.Play("idel");
    };
    Step.prototype.TouchGround = function (player) {
        this.StepItem.TouchItem(player);
    };
    Step.prototype.StandOnGround = function (player) {
        if (player === void 0) { player = null; }
        if (player) {
            var newSprite = this.m_StandPoint;
            newSprite.addChild(player);
        }
        this.m_CharacterAnimator.Play("idel");
        this.m_CharacterAnimator.Play("fall");
    };
    Step.prototype.PutInItem = function (sprite3D) {
        this.m_StandPoint.addChild(sprite3D);
    };
    Step.prototype.Break = function () {
        this.m_CharacterAnimator.Play("fallDown");
    };
    //模型个数
    Step.stepModelNum = 3;
    return Step;
}(Laya.Sprite3D));
exports.default = Step;
var StepAnimator = /** @class */ (function (_super) {
    __extends(StepAnimator, _super);
    function StepAnimator(animator, step) {
        var _this = _super.call(this, animator) || this;
        _this.m_Step = step;
        return _this;
    }
    StepAnimator.prototype.Init = function () {
        var state = this.GetState("fall");
        var script = state.addScript(Laya.AnimatorStateScript);
        var stepAnimator = this;
        script.onStateExit = function () { stepAnimator.Play("idle"); };
        var fallDownState = this.GetState("fallDown");
        var fallDownScript = fallDownState.addScript(FallDownScript);
        fallDownScript.Init(this.m_Step, this.m_Aniamtor);
        return;
    };
    return StepAnimator;
}(CharacterAnimator_1.default));
var FallDownScript = /** @class */ (function (_super) {
    __extends(FallDownScript, _super);
    function FallDownScript() {
        var _this = _super.call(this) || this;
        _this.m_Speed = 0;
        _this.m_CountinueTime = 1;
        return _this;
    }
    FallDownScript.prototype.Init = function (step, animator) {
        this.m_Step = step;
        this.m_Speed = 0;
        this.m_TimeCount = APP_1.default.TimeManager.GameTime;
        this.m_Animator = animator;
    };
    FallDownScript.prototype.onStateEnter = function () {
        this.m_Step.locked = true;
    };
    FallDownScript.prototype.onStateExit = function () {
    };
    FallDownScript.prototype.onStateUpdate = function () {
        var lastFrameTime = this.m_CountinueTime - APP_1.default.TimeManager.GameTime;
        if (lastFrameTime < 0) {
            this.m_Animator.play("idle");
            return;
        }
    };
    return FallDownScript;
}(Laya.AnimatorStateScript));
},{"./../Utility/Path":39,"./../controler/APP":41,"./CharacterAnimator":20,"./GameItem":22,"./GameStruct":25}],31:[function(require,module,exports){
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
        Laya.Stat.show();
        var resCol = [{ url: "ui/Resource/localcomp.atlas", type: Laya.Loader.ATLAS }, { url: "ui/Resource/LoadUI.json", type: Laya.Loader.JSON }];
        Laya.loader.load(resCol, Laya.Handler.create(this, this.on3DLoaded));
    }
    Game.prototype.on3DLoaded = function () {
        var arr3D = ["ui/Resource/LayaScene_MainScene/Conventional/MainScene.ls"];
        //var arr3D = ["ui/Resource/LayaScene_SampleScene/Conventional/SampleScene.lh"];
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
},{"./GameConfig":14,"./Scene/LoadScene":36,"./controler/APP":41}],32:[function(require,module,exports){
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
},{"../GameManager/CharacterMamager":15}],33:[function(require,module,exports){
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
},{"./../Utility/Path":39,"./Scene":37,"./ScenePlay/GameScenePlay":38}],34:[function(require,module,exports){
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
},{"./../Game/GameItem":22,"./../Scene/Scene":37,"./GameDirector":33}],35:[function(require,module,exports){
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
},{"../controler/APP":41,"./../Scene/Scene":37,"./../Utility/Path":39,"./../ui/EnterGameUI":51}],36:[function(require,module,exports){
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
            Path_1.path.GetDepathUIJS("Game"),
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
            Path_1.path.GetAtlPath("entersceneui/res3"),
            Path_1.path.GetAtlPath("entersceneui/res4"),
            Path_1.path.GetAtlPath("entersceneui/res5"),
            Path_1.path.GetAtlPath("entersceneui/gk"),
            Path_1.path.GetAtlPath("comp"),
            Path_1.path.GetJsonPath("CharacterInfo"),
            Path_1.path.GetJsonPath("ItemInfo"),
            Path_1.path.GetJsonPath("LevelInfo"),
            Path_1.path.GetJsonPath("ObstacleInfo"),
            Path_1.path.GetSoundpathUIJS("bg")
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
},{"./../Scene/Scene":37,"./../Utility/Path":39,"./../controler/APP":41,"./../ui/BG":47,"./../ui/UnDownload/LoadingUI":56,"./GuiderManager":35}],37:[function(require,module,exports){
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
},{"../FrameWork/FrameWork":9,"./../Base/FSM":7,"./../FrameWork/MessageCenter":10,"./../controler/APP":41}],38:[function(require,module,exports){
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
        _this._StartPosition = new Laya.Vector3();
        _this._PanelUI = null;
        _this._CurBG = APP_1.default.SceneManager.BG;
        _this.FreshBGCount = 0;
        _this.m_GameMap = new GameMap_1.default(lineNum, column);
        _this.m_StartFloor = 3;
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
            this.m_BootomFloor = this.m_BootomFloor < this.m_GameMap.TailFLoor.FloorNum ? this.m_GameMap.TailFLoor.FloorNum : this.m_BootomFloor;
            var between = this.Distance + this.m_StartFloor - this.m_BootomFloor; //this.m_GameMap.TailFLoor;
            var rangeNum = 2;
            between = between > rangeNum ? rangeNum : between;
            return this._CountFloorTime - between / rangeNum * FallTime;
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
        if (this.Player.CurStep.locked)
            return;
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
        this.Player.CurStep.StandOnGround();
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
            var distance = Math.ceil(floor.rightSwitch / 2) - Math.ceil(rightSwitchNum / 2);
            var floorIdx = location.X - distance; // - (1 + floor.OddSwitch);
            var getStep = floor.GetStep(floorIdx);
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
        var startFloor = this.m_StartFloor;
        this.m_GameMap.Init(startFloor);
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
        this._GameUpdate = this._StartCount;
        WechatOpen_1.WechatOpen.getInstances().drawpass(0);
        this.m_BootomFloor = startFloor;
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
        if (this.CountFloorTime < APP_1.default.TimeManager.GameTime) {
            this._CountFloorTime = APP_1.default.TimeManager.GameTime + FallTime;
            this._DestroyLine(this.m_BootomFloor);
            ++this.m_BootomFloor;
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
},{"../../Game/GameMap":23,"../../Game/GameModule":24,"../../controler/GameAPP":42,"../../platform/WechatOpen":44,"./../../Agent/GameAgent":2,"./../../FrameWork/MessageCenter":10,"./../../Game/GameCamera":21,"./../../Game/GameItem":22,"./../../Game/GameStruct":25,"./../../Game/Input":26,"./../../Game/Player":28,"./../../Scene/Scene":37,"./../../controler/APP":41,"./../../controler/GameControler":43,"./../../ui/EndGameUI":50,"./../../ui/GameUI":52}],39:[function(require,module,exports){
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
     * 获取声音路径
     * @param fileName 文件名
     */
    function GetSoundpathUIJS(fileName) {
        return path.ResourcePath + "sound/" + fileName + ".mp3" + (path.IsEditor ? "" : path.version);
    }
    path.GetSoundpathUIJS = GetSoundpathUIJS;
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
},{}],40:[function(require,module,exports){
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
},{}],41:[function(require,module,exports){
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
},{"../Game/GameModule":24,"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10,"./../FrameWork/SceneManager":11,"./../FrameWork/TimeManager":12,"./../FrameWork/UIManager":13}],42:[function(require,module,exports){
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
},{"./../GameManager/CharacterMamager":15,"./../GameManager/ItemManager":17}],43:[function(require,module,exports){
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
},{"../Game/GameModule":24,"./../Agent/PlayerGuestAgent":4,"./../Game/GameStruct":25,"./../Scene/GameScene":34,"./../ui/CharacterUI":49,"./../ui/RankPanelUI":54,"./../ui/SetPanelUI":55,"./APP":41}],44:[function(require,module,exports){
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
},{}],45:[function(require,module,exports){
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
},{"./../FrameWork/MessageCenter":10}],46:[function(require,module,exports){
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
},{"./../controler/APP":41,"./../controler/GameControler":43}],47:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Path_1 = require("./../Utility/Path");
var layaMaxUI_1 = require("./layaMaxUI");
var BaseFunc_1 = require("./../Base/BaseFunc");
var PlayerGuestAgent_1 = require("../Agent/PlayerGuestAgent");
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
            //image.loadImage("comp/img_background_spr_sky.png");
            image.loadImage(PlayerGuestAgent_1.default.GuestAgent.SkinDir + "mainbg.jpg");
            image.width = widh;
            image.height = widh + widh * 0.01;
            image.height = Laya.stage.height;
            _this.addChild(image);
            _this.bg = image;
            //this._SkyQue.Push(image);
        }
        _this.SetSky(0);
        var earth = new Laya.Image();
        earth.y = Laya.stage.height - Laya.stage.width;
        _this._EarthStartPS = earth.y;
        //earth.loadImage("comp/img_background_spr.png");
        earth.loadImage(PlayerGuestAgent_1.default.GuestAgent.SkinDir + "mainbg.jpg");
        _this._Earth = earth;
        earth.width = widh;
        earth.height = widh;
        //this.addChild(earth);
        _this._ScaleSky = 0.001;
        _this._ScaleEarth = 0.01;
        return _this;
        //this._EarthStartPS = this._Earth.y;
    }
    BGUI.prototype.createChildren = function () {
        this.createView(Laya.loader.getRes(Path_1.path.GetDepathUIJS("BG")));
    };
    BGUI.prototype.upateBgTexture = function () {
        this.bg.loadImage(PlayerGuestAgent_1.default.GuestAgent.SkinDir + "mainbg.jpg");
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
},{"../Agent/PlayerGuestAgent":4,"./../Base/BaseFunc":6,"./../Utility/Path":39,"./layaMaxUI":57}],48:[function(require,module,exports){
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
},{"./../Base/BaseEnum":5,"./../FrameWork/FrameWork":9,"./../FrameWork/UIManager":13}],49:[function(require,module,exports){
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
                { key: "bg", textureName: "mainbg.jpg" }
            ],
            "btn": [
                { key: "backBtn", textureName: "back.png" },
                { key: "buyBtn", textureName: "buy.png" },
                { key: "startGame", textureName: "start.png" },
                { key: "characterrole0bg", textureName: "rolebgcircle.png" },
                { key: "characterrole1bg", textureName: "rolebgcircle.png" },
                { key: "characterrole2bg", textureName: "rolebgcircle.png" },
                { key: "characterrole3bg", textureName: "rolebgcircle.png" },
                { key: "characterrole4bg", textureName: "rolebgcircle.png" }
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
            if (key == "img") {
                for (var i = 0; i < len; i++) {
                    this._UI[this.config[key][i].key].graphics.clear();
                    this._UI[this.config[key][i].key].loadImage(PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
            }
            else if (key == "btn") {
                for (var i = 0; i < len; i++) {
                    this._UI[this.config[key][i].key].skin = (PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
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
        }.bind(this), 510);
        this.Layout();
        this.updateSelfSceneUI();
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
},{"../GameManager/CharacterMamager":15,"../Scene/CharacterUIScene":32,"../controler/GameAPP":42,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Utility/Path":39,"./../controler/APP":41,"./../controler/GameControler":43,"./BaseUI":48,"./layaMaxUI":57}],50:[function(require,module,exports){
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
            if (key == "img") {
                for (var i = 0; i < len; i++) {
                    this.UI[this.config[key][i].key].graphics.clear();
                    this.UI[this.config[key][i].key].loadImage(PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
            }
            else if (key == "btn") {
                for (var i = 0; i < len; i++) {
                    this.UI[this.config[key][i].key].skin = (PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
            }
        }
    };
    EndGameUI.prototype.Update = function () {
    };
    EndGameUI.prototype.Open = function () {
        this.updateSelfSceneUI();
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
},{"../Agent/PlayerGuestAgent":4,"../Scene/GuiderManager":35,"../controler/GameControler":43,"./../Utility/Path":39,"./../controler/GameControler":43,"./BaseUI":48,"./layaMaxUI":57}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var Path_1 = require("./../Utility/Path");
var BaseUI_1 = require("./BaseUI");
var GameControler_1 = require("./../controler/GameControler");
var GameAgent_1 = require("./../Agent/GameAgent");
var PlayerGuestAgent_1 = require("../Agent/PlayerGuestAgent");
var APP_1 = require("./../controler/APP");
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
        APP_1.default.SceneManager.BG["upateBgTexture"]();
    };
    return ExtendEnterGameUI;
}(layaMaxUI_1.ui.EnterUI));
var EnterGameUI = /** @class */ (function (_super) {
    __extends(EnterGameUI, _super);
    function EnterGameUI(name) {
        var _this = _super.call(this, name) || this;
        _this.lastX = 99999;
        _this.offestX = 0;
        _this.cntSelectIndex = 0;
        _this.config = { "img": [
                { key: "bg", textureName: "loadbgstart.png" }
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
        _this.cntSelectIndex = PlayerGuestAgent_1.default.GuestAgent.CurLevel - 1;
        _this._gk.x = -_this.cntSelectIndex * 630;
        _this.initGKListener();
        _this.updateButtonState();
        laya.media.SoundManager.playMusic(Path_1.path.GetSoundpathUIJS("bg"), 0);
        return _this;
    }
    EnterGameUI.Name = function () {
        return "EnterGameUI";
    };
    EnterGameUI.prototype.initGKListener = function () {
        //this._UI._Panel.on(Laya.Event.MOUSE_DOWN, this, this.downGKBox);
        //this._UI._Panel.on(Laya.Event.MOUSE_MOVE, this, this.moveGKBox);
        //this._UI._Panel.on(Laya.Event.MOUSE_UP, this, this.upGKBox);
        //this._UI._Panel.on(Laya.Event.MOUSE_OVER, this, this.upGKBox);
        this._UI.lastBtn.on(Laya.Event.CLICK, this, this.lastPage);
        this._UI.nextBtn.on(Laya.Event.CLICK, this, this.nextPage);
    };
    EnterGameUI.prototype.updateButtonState = function () {
        this._UI.lastBtn.visible = true;
        this._UI.nextBtn.visible = true;
        if (this.cntSelectIndex == 0) {
            this._UI.lastBtn.visible = false;
        }
        if (this.cntSelectIndex == 4) {
            this._UI.nextBtn.visible = false;
        }
    };
    EnterGameUI.prototype.nextPage = function (e) {
        if (this.cntSelectIndex < 4) {
            Laya.Tween.clearTween(this._gk);
            this._gk.x = -this.cntSelectIndex * 630;
            this.cntSelectIndex++;
        }
        Laya.Tween.to(this._gk, { x: -this.cntSelectIndex * 630 }, 200, Laya.Ease.sineIn);
        PlayerGuestAgent_1.default.GuestAgent.CurLevel = this.cntSelectIndex + 1;
        this.updateSelfSceneUI();
        this.updateButtonState();
    };
    EnterGameUI.prototype.lastPage = function (e) {
        if (this.cntSelectIndex > 0) {
            Laya.Tween.clearTween(this._gk);
            this._gk.x = -this.cntSelectIndex * 630;
            this.cntSelectIndex--;
        }
        Laya.Tween.to(this._gk, { x: -this.cntSelectIndex * 630 }, 200, Laya.Ease.sineIn);
        PlayerGuestAgent_1.default.GuestAgent.CurLevel = this.cntSelectIndex + 1;
        this.updateSelfSceneUI();
        this.updateButtonState();
    };
    EnterGameUI.prototype.downGKBox = function (e) {
        this.lastX = e.target.mouseX;
    };
    EnterGameUI.prototype.moveGKBox = function (e) {
        if (this.lastX == 99999 || this._gk.x > 0 || this._gk.x < -630 * 4) {
            return;
        }
        this.offestX = (e.target.mouseX - this.lastX);
        this._gk.x += this.offestX;
        if (this._gk.x > 0) {
            this._gk.x = 0;
        }
        if (this._gk.x < -4 * 630) {
            this._gk.x = -4 * 630;
        }
        this.lastX = e.target.mouseX;
    };
    EnterGameUI.prototype.upGKBox = function (e) {
        var nextX = 0;
        if (Math.abs(this.offestX) <= 5) {
            return;
        }
        this.lastX = 99999;
        if (this.offestX > 0) {
            if (this._gk.x < 0) {
                nextX = Math.floor(this._gk.x / 630);
            }
        }
        else if (this.offestX < 0) {
            if (this._gk.x > -4 * 630) {
            }
        }
        Laya.Tween.to(this._gk, { x: nextX }, Math.abs(this.offestX));
        this.cntSelectIndex = -nextX / 630;
        this.offestX = 0;
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
            if (key == "img") {
                for (var i = 0; i < len; i++) {
                    this._UI[this.config[key][i].key].graphics.clear();
                    this._UI[this.config[key][i].key].loadImage(PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
            }
            else if (key == "btn") {
                for (var i = 0; i < len; i++) {
                    this._UI[this.config[key][i].key].skin = (PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
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
        this.updateSelfSceneUI();
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
},{"../Agent/PlayerGuestAgent":4,"./../Agent/GameAgent":2,"./../Utility/Path":39,"./../controler/APP":41,"./../controler/GameControler":43,"./BaseUI":48,"./layaMaxUI":57}],52:[function(require,module,exports){
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
        this._CountTime.value = info;
        //this._CountTime.text = info;
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
        this._UI._TxtDistance.text = this.DistanceStr[0];
        this._UI._TxtDistance1.value = this.DistanceStr[1];
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
},{"../Agent/GameAgent":2,"../Game/GameModule":24,"./../Agent/PlayerEntity":3,"./../FrameWork/MessageCenter":10,"./../Utility/Path":39,"./../controler/APP":41,"./../controler/GameControler":43,"./BaseUI":48,"./ItemListUI":53,"./layaMaxUI":57}],53:[function(require,module,exports){
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
            if (key == "img") {
                for (var i = 0; i < len; i++) {
                    this.UI[this.config[key][i].key].graphics.clear();
                    this.UI[this.config[key][i].key].loadImage(PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
            }
            else if (key == "btn") {
                for (var i = 0; i < len; i++) {
                    this.UI[this.config[key][i].key].skin = (PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
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
        this.updateSelfSceneUI();
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
},{"../GameManager/ItemManager":17,"./../Agent/GameAgent":2,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Base/BaseEnum":5,"./../FrameWork/MessageCenter":10,"./../Utility/Path":39,"./../controler/APP":41,"./../controler/GameAPP":42,"./../controler/GameControler":43,"./BaseUI":48,"./layaMaxUI":57}],54:[function(require,module,exports){
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
},{"../platform/WechatOpen":44,"./../Base/BaseEnum":5,"./../Utility/Path":39,"./BaseUI":48,"./layaMaxUI":57}],55:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var BaseUI_1 = require("./BaseUI");
var BaseEnum_1 = require("./../Base/BaseEnum");
var Path_1 = require("./../Utility/Path");
var GameStruct_1 = require("./../Game/GameStruct");
var GuiderManager_1 = require("../Scene/GuiderManager");
var GameControler_1 = require("./../controler/GameControler");
var PlayerGuestAgent_1 = require("./../Agent/PlayerGuestAgent");
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
    SetPanelUI.prototype.Open = function () {
        this.updateSelfSceneUI();
    };
    SetPanelUI.prototype.VoiceClose = function () {
        this.selectedIndex = 0;
        this.SetPanel();
    };
    SetPanelUI.prototype.updateSelfSceneUI = function () {
        for (var key in this.config) {
            var len = this.config[key].length;
            if (key == "img") {
                for (var i = 0; i < len; i++) {
                    this._UI[this.config[key][i].key].graphics.clear();
                    this._UI[this.config[key][i].key].loadImage(PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
            }
            else if (key == "btn") {
                for (var i = 0; i < len; i++) {
                    this._UI[this.config[key][i].key].skin = (PlayerGuestAgent_1.default.GuestAgent.SkinDir + this.config[key][i].textureName);
                }
            }
        }
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
},{"../Scene/GuiderManager":35,"./../Agent/PlayerGuestAgent":4,"./../Base/BaseEnum":5,"./../Game/GameStruct":25,"./../Utility/Path":39,"./../controler/GameControler":43,"./BaseUI":48,"./layaMaxUI":57}],56:[function(require,module,exports){
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
        var scene = Laya.loader.getRes("ui/Resource/LayaScene_MainScene/Conventional/MainScene.ls");
        scene.ambientColor = new Laya.Vector3(1, 1, 1);
        var camera = scene.getChildByName("Camera");
        camera.active = false;
        camera.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        camera.clearColor = new Laya.Vector4(0, 0, 0, 0);
        var newCamera = new Laya.Camera();
        newCamera.transform.position = camera.transform.position;
        newCamera.transform.rotation = camera.transform.rotation;
        scene.addChild(newCamera);
        _this._UI["bg"].addChild(scene);
        return _this;
        //this._UI["bg"].addChild(new LoadUIScene());
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
        this._UI._Progress.visible = false;
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
},{"./../BaseUI":48}],57:[function(require,module,exports){
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
},{}]},{},[31])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xheWFlbmdpbmUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FnZW50L0Jhc2VBZ2VudC50cyIsInNyYy9BZ2VudC9HYW1lQWdlbnQudHMiLCJzcmMvQWdlbnQvUGxheWVyRW50aXR5LnRzIiwic3JjL0FnZW50L1BsYXllckd1ZXN0QWdlbnQudHMiLCJzcmMvQmFzZS9CYXNlRW51bS50cyIsInNyYy9CYXNlL0Jhc2VGdW5jLnRzIiwic3JjL0Jhc2UvRlNNLnRzIiwic3JjL0ZyYW1lV29yay9CYXNlTWFuYWdlci50cyIsInNyYy9GcmFtZVdvcmsvRnJhbWVXb3JrLnRzIiwic3JjL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyLnRzIiwic3JjL0ZyYW1lV29yay9TY2VuZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL1RpbWVNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9VSU1hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0dhbWVNYW5hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0l0ZW1NYW5hZ2VyLnRzIiwic3JjL0dhbWUvQW5pbU9iai50cyIsInNyYy9HYW1lL0NoYXJhY3Rlci50cyIsInNyYy9HYW1lL0NoYXJhY3RlckFuaW1hdG9yLnRzIiwic3JjL0dhbWUvR2FtZUNhbWVyYS50cyIsInNyYy9HYW1lL0dhbWVJdGVtLnRzIiwic3JjL0dhbWUvR2FtZU1hcC50cyIsInNyYy9HYW1lL0dhbWVNb2R1bGUudHMiLCJzcmMvR2FtZS9HYW1lU3RydWN0LnRzIiwic3JjL0dhbWUvSW5wdXQudHMiLCJzcmMvR2FtZS9Nb3VudExpbmUudHMiLCJzcmMvR2FtZS9QbGF5ZXIudHMiLCJzcmMvR2FtZS9QbGF5ZXJDdHJsZXIudHMiLCJzcmMvR2FtZS9TdGVwLnRzIiwic3JjL01haW4udHMiLCJzcmMvU2NlbmUvQ2hhcmFjdGVyVUlTY2VuZS50cyIsInNyYy9TY2VuZS9HYW1lRGlyZWN0b3IudHMiLCJzcmMvU2NlbmUvR2FtZVNjZW5lLnRzIiwic3JjL1NjZW5lL0d1aWRlck1hbmFnZXIudHMiLCJzcmMvU2NlbmUvTG9hZFNjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lUGxheS9HYW1lU2NlbmVQbGF5LnRzIiwic3JjL1V0aWxpdHkvUGF0aC50cyIsInNyYy9VdGlsaXR5L1VJRnVuYy50cyIsInNyYy9jb250cm9sZXIvQVBQLnRzIiwic3JjL2NvbnRyb2xlci9HYW1lQVBQLnRzIiwic3JjL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyLnRzIiwic3JjL3BsYXRmb3JtL1dlY2hhdE9wZW4udHMiLCJzcmMvc2NyaXB0L0l0ZW1FbGVtZW50LnRzIiwic3JjL3NjcmlwdC9Sb2xlRWxlbWVudC50cyIsInNyYy91aS9CRy50cyIsInNyYy91aS9CYXNlVUkudHMiLCJzcmMvdWkvQ2hhcmFjdGVyVUkudHMiLCJzcmMvdWkvRW5kR2FtZVVJLnRzIiwic3JjL3VpL0VudGVyR2FtZVVJLnRzIiwic3JjL3VpL0dhbWVVSS50cyIsInNyYy91aS9JdGVtTGlzdFVJLnRzIiwic3JjL3VpL1JhbmtQYW5lbFVJLnRzIiwic3JjL3VpL1NldFBhbmVsVUkudHMiLCJzcmMvdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBLDZDQUE4QztBQUM5QztJQUdJO1FBRUksSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7SUFDbEUsQ0FBQztJQUNMLGdCQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7Ozs7O0FDUkQsK0NBQXVDO0FBQ3ZDLG1EQUFp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U0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDTCxpQkFBQztJQUFELENBWEEsQUFXQyxDQVgrQixJQUFJLENBQUMsSUFBSSxHQVd4QztJQVhZLGFBQVUsYUFXdEIsQ0FBQTtJQUNEO1FBQWdDLDhCQUFTO1FBR3JDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVJBLEFBUUMsQ0FSK0IsSUFBSSxDQUFDLElBQUksR0FReEM7SUFSWSxhQUFVLGFBUXRCLENBQUE7QUFDTCxDQUFDLEVBckphLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQXFKZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgKiBhcyBQbGF5ZXJFbnRpdHkgZnJvbSBcIi4vUGxheWVyRW50aXR5XCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUFnZW50XHJcbntcclxuICAgIHByb3RlY3RlZCBtX1BsYXllckVudGl0eTpQbGF5ZXJFbnRpdHkuUGxheWVyLlBsYXllckVudGl0eTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5ID0gUGxheWVyRW50aXR5LlBsYXllci5QbGF5ZXJFbnRpdHkuRW50aXR5O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLy4uL0dhbWUvR2FtZU1vZHVsZVwiXHJcbmltcG9ydCB7IEdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4vLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVBUFBcIjtcclxuaW1wb3J0IEJhc2VBZ2VudCBmcm9tIFwiLi9CYXNlQWdlbnRcIlxyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVBZ2VudCBleHRlbmRzIEJhc2VBZ2VudCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfQWdlbnQ6IEdhbWVBZ2VudDtcclxuICAgIHN0YXRpYyBnZXQgQWdlbnQoKTogR2FtZUFnZW50IHtcclxuICAgICAgICBpZiAodGhpcy5fQWdlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9BZ2VudCA9IG5ldyBHYW1lQWdlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0FnZW50O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtX1VzZUl0ZW1OdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Ta2lsbEl0ZW1JRDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1NraWxsSXRlbU51bTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgQ3VyTGV2ZWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJMZXZlbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgQ3VyTGV2ZWwodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyTGV2ZWwgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VyTWF4TGV2ZWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEN1ckNoYXJhY3RlcklEKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEN1ckl0ZW0oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBJdGVtTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5JdGVtTGlzdFxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBDdXJJdGVtKGlkOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuSXRlbUxpc3RbaWRdKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtID0gaWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVJdGVtTnVtKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VySXRlbU51bSA8IHRoaXMubV9Vc2VJdGVtTnVtID8gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtTnVtIDogdGhpcy5tX1VzZUl0ZW1OdW07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IFNraWxsSXRlbU51bSgpOiBudW1iZXIgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1NraWxsSXRlbU51bTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRHb2xkKGdvbGQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghZ29sZCB8fCBnb2xkIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1vbmV5ID0gdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSArIGdvbGQ7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSA9IG1vbmV5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRTY29yZShzY29yZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCFzY29yZSB8fCBzY29yZSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzY29yZSA9IHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyU2NvcmUgKyBzY29yZTtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1clNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBDdXJTY29yZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1clNjb3JlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldEdhbWVJdGVtKCkge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKFBsYXllci5FdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UpO1xyXG4gICAgICAgIHRoaXMubV9Vc2VJdGVtTnVtID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVzZXRTa2lsbEl0ZW0oKSB7XHJcbiAgICAgICAgdmFyIENoYXJhY3RlcklEOiBudW1iZXIgPSB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgICAgIHRoaXMubV9Ta2lsbEl0ZW1OdW0gPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRTa2lsbEl0ZW0oQ2hhcmFjdGVySUQpIDwgMCA/IDAgOiAxO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKEdhbWVNb2R1bGUuRXZlbnQuT25DaGFyYWN0ZXJJdGVtQ2hhbmdlKTtcclxuICAgICAgICB0aGlzLm1fU2tpbGxJdGVtTnVtID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXNlR2FtZUl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuR2FtZUl0ZW1OdW0gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAtLXRoaXMubV9Vc2VJdGVtTnVtO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuUmVkdWNlSXRlbSh0aGlzLkN1ckl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVc2VTa2lsbEl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2tpbGxJdGVtTnVtIDwgMSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAtLXRoaXMubV9Ta2lsbEl0ZW1OdW07XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoR2FtZU1vZHVsZS5FdmVudC5PbkNoYXJhY3Rlckl0ZW1DaGFuZ2UpO1xyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCB7IFdlY2hhdE9wZW4gfSBmcm9tIFwiLi4vcGxhdGZvcm0vV2VjaGF0T3BlblwiO1xyXG5cclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXIge1xyXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50IHtcclxuICAgICAgICBzdGF0aWMgT25Nb25leUNoYW5nZTogc3RyaW5nID0gXCJPbk1vbmV5Q2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VyQ2hhcmFjdGVySURDaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJDaGFyYWN0ZXJJRENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkhpc3RvcnlNYXhMZXZlbENoYW5nZTogc3RyaW5nID0gXCJPbkhpc3RvcnlNYXhMZXZlbENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckxldmVsQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VyTGV2ZWxDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DaGFyYWN0ZXJMaXN0Q2hhbmdlOiBzdHJpbmcgPSBcIk9uQ2hhcmFjdGVyTGlzdENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckl0ZW1DaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJJdGVtQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uSXRlbUxpc3RDaGFuZ2U6IHN0cmluZyA9IFwiT25JdGVtTGlzdENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1clNjb3JlQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VyU2NvcmVDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJJdGVtTnVtQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VySXRlbU51bUNoYW5nZVwiXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckVudGl0eSB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgbV9FbnRpdHk6IFBsYXllckVudGl0eTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldCBFbnRpdHkoKTogUGxheWVyRW50aXR5IHtcclxuICAgICAgICAgICAgaWYgKCFQbGF5ZXJFbnRpdHkubV9FbnRpdHkpIHtcclxuICAgICAgICAgICAgICAgIFBsYXllckVudGl0eS5tX0VudGl0eSA9IG5ldyBQbGF5ZXJFbnRpdHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFBsYXllckVudGl0eS5tX0VudGl0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBtX0ZyYW1lV29yazogRnJhbWVXb3JrO1xyXG4gICAgICAgIHByaXZhdGUgbV9NZXNzYWdlTWdyOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgLy/pkrFcclxuICAgICAgICBwcml2YXRlIG1fTW9uZXk6IG51bWJlcjtcclxuICAgICAgICAvL+mAieS4reinkuiJsklEXHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1ckNoYXJhY3RlcklEOiBudW1iZXI7XHJcbiAgICAgICAgLy/njqnlrrblt7Lop6PplIHnmoTmnIDpq5jlhbPljaFcclxuICAgICAgICBwcml2YXRlIG1fSGlzdG9yeU1heExldmVsOiBudW1iZXI7XHJcbiAgICAgICAgLy/lvZPliY3pgInkuK3lhbPljaFcclxuICAgICAgICBwcml2YXRlIG1fQ3VyTGV2ZWw6IG51bWJlcjtcclxuICAgICAgICAvL+inkuiJsuWIl+ihqFxyXG4gICAgICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJMaXN0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8v5b2T5YmN5oul6YCJ5Lit6YGT5YW3XHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1ckl0ZW06IG51bWJlcjtcclxuICAgICAgICAvL+eJqeWTgeWIl+ihqFxyXG4gICAgICAgIHByaXZhdGUgbV9JdGVtTGlzdDogQXJyYXk8bnVtYmVyPjtcclxuICAgICAgICAvL+enr+WIhlxyXG4gICAgICAgIHByaXZhdGUgbV9DdXJTY29yZTogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE1vbmV5KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fTW9uZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgTW9uZXkodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdGhpcy5tX01vbmV5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX01vbmV5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25Nb25leUNoYW5nZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckNoYXJhY3RlcklEO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1ckNoYXJhY3RlcklEKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9DdXJDaGFyYWN0ZXJJRCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJDaGFyYWN0ZXJJRCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VyQ2hhcmFjdGVySURDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1ckxldmVsKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyTGV2ZWw7Ly8gPyB0aGlzLm1fQ3VyTGV2ZWwgOiB0aGlzLm1fSGlzdG9yeU1heExldmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1ckxldmVsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMuQ3VyTGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyTGV2ZWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckxldmVsQ2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIaXN0b3J5TWF4TGV2ZWwoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgSGlzdG9yeU1heExldmVsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fSGlzdG9yeU1heExldmVsID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25IaXN0b3J5TWF4TGV2ZWxDaGFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2hhcmFjdGVyTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJJdGVtKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9DdXJJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1ckl0ZW0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckl0ZW1DaGFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VySXRlbSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VySXRlbU51bSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5HZXRJdGVtTnVtKHRoaXMuQ3VySXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXRlbUxpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSXRlbUxpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VyU2NvcmUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJTY29yZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJTY29yZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fQ3VyU2NvcmUgPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1clNjb3JlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkudXBkYXRlU2NvcmUodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VyU2NvcmVDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnRlcmVzdGluZ2xpZmUgPSAoTGF5YS5Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkludGVyZXN0aW5nbGlmZVwiKSAhPSBudWxsID8gSlNPTi5wYXJzZShMYXlhLkxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiSW50ZXJlc3RpbmdsaWZlXCIpKSA6IHt9KTtcclxuICAgICAgICAgICAgdGhpcy5tX01vbmV5ID0gaW50ZXJlc3RpbmdsaWZlLm1fTW9uZXkgfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckxldmVsID0gaW50ZXJlc3RpbmdsaWZlLm1fQ3VyTGV2ZWwgfHwgMTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckNoYXJhY3RlcklEID0gaW50ZXJlc3RpbmdsaWZlLm1fQ3VyQ2hhcmFjdGVySUR8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdCA9IGludGVyZXN0aW5nbGlmZS5tX0NoYXJhY3Rlckxpc3QgfHwgWzEsMCwwLDAsMF07XHJcbiAgICAgICAgICAgIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwgPSBpbnRlcmVzdGluZ2xpZmUubV9IaXN0b3J5TWF4TGV2ZWwgfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckl0ZW0gPSBpbnRlcmVzdGluZ2xpZmUubV9DdXJJdGVtIHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9GcmFtZVdvcmsgPSBGcmFtZVdvcmsuRk07XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gaW50ZXJlc3RpbmdsaWZlLm1fSXRlbUxpc3QgfHwgW107XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTY29yZSA9IGludGVyZXN0aW5nbGlmZS5tX0N1clNjb3JlIHx8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2F2ZURhdGFUb0xvY2FsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxEYXRhOmFueSA9IHt9O1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9Nb25leSA9IHRoaXMubV9Nb25leTtcclxuICAgICAgICAgICAgbG9jYWxEYXRhLm1fQ3VyTGV2ZWwgPSB0aGlzLm1fQ3VyTGV2ZWw7XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0N1ckNoYXJhY3RlcklEID0gdGhpcy5tX0N1ckNoYXJhY3RlcklEO1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9DaGFyYWN0ZXJMaXN0ID0gdGhpcy5tX0NoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0hpc3RvcnlNYXhMZXZlbCA9IHRoaXMubV9IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0N1ckl0ZW0gPSB0aGlzLm1fQ3VySXRlbTtcclxuICAgICAgICAgICAgbG9jYWxEYXRhLm1fSXRlbUxpc3QgPSB0aGlzLm1fSXRlbUxpc3Q7XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0N1clNjb3JlID0gdGhpcy5tX0N1clNjb3JlO1xyXG4gICAgICAgICAgICBMYXlhLkxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiSW50ZXJlc3RpbmdsaWZlXCIsIGxvY2FsRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBBZGRDaGFyYWN0ZXIoaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdFtpZF0gPSAxO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQWRkSXRlbShpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5tX0l0ZW1MaXN0W2lkXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0l0ZW1MaXN0W2lkXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKyt0aGlzLm1fSXRlbUxpc3RbaWRdO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UpO1xyXG4gICAgICAgICAgICBpZiAoaWQgPT0gdGhpcy5DdXJJdGVtKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFJlZHVjZUl0ZW0oaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubV9JdGVtTGlzdFtpZF0gfHwgdGhpcy5tX0l0ZW1MaXN0W2lkXSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC0tdGhpcy5tX0l0ZW1MaXN0W2lkXTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlKTtcclxuICAgICAgICAgICAgaWYgKGlkID09IHRoaXMuQ3VySXRlbSlcclxuICAgICAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJJdGVtTnVtQ2hhbmdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBHZXRJdGVtTnVtKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIG51bTogbnVtYmVyID0gdGhpcy5tX0l0ZW1MaXN0W2lkXTtcclxuICAgICAgICAgICAgbnVtID0gbnVtID8gbnVtIDogMDtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEJhc2VBZ2VudCBmcm9tIFwiLi9CYXNlQWdlbnRcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckd1ZXN0QWdlbnQgZXh0ZW5kcyBCYXNlQWdlbnQge1xyXG4gICAgc3RhdGljIF9BZ2VudDogUGxheWVyR3Vlc3RBZ2VudDtcclxuICAgIHN0YXRpYyBnZXQgR3Vlc3RBZ2VudCgpOiBQbGF5ZXJHdWVzdEFnZW50IHtcclxuICAgICAgICBpZiAodGhpcy5fQWdlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9BZ2VudCA9IG5ldyBQbGF5ZXJHdWVzdEFnZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9BZ2VudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IFNraW5EaXIoKTpTdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcImVudGVyc2NlbmV1aS9yZXNcIiArIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyTGV2ZWwgKyBcIi9cIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IEN1ckxldmVsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgQ3VyTGV2ZWwodmFsOm51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyTGV2ZWwgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBNb25leSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkNoYXJhY3Rlckxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBJdGVtTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5JdGVtTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlDaGFyYWN0ZXIoaWQ6IG51bWJlcikgIHtcclxuICAgICAgICB2YXIgcHJpY2UgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRQcmljZShpZCk7XHJcbiAgICAgICAgaWYgKGlkIDwgMHx8IHByaWNlIDwwIHx8IHByaWNlID4gdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5IC09IHByaWNlO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQWRkQ2hhcmFjdGVyKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQnV5SXRlbShpZDogbnVtYmVyKSAge1xyXG4gICAgICAgIHZhciBwcmljZSA9IEdhbWVBUFAuSXRlbU1nci5HZXRQcmljZShpZCk7XHJcbiAgICAgICAgaWYoaWQgPCAwfHwgcHJpY2UgPDAgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwcmljZSA+IHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkgLT0gcHJpY2U7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5BZGRJdGVtKGlkKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0Q2hhcmFjdGVyKGlkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJMaXN0OkFycmF5PG51bWJlcj4gPSB0aGlzLkNoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgaWYoY2hhcmFjdGVyTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEID0gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBCYXNlRW51bSB7XHJcbiAgICBleHBvcnQgZW51bSBVSVR5cGVFbnVtIHtMb3csTWlkbGV9O1xyXG59IiwiaW1wb3J0IEJhc2VNZ3IgZnJvbSBcIi4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiO1xyXG4vKipcclxuICog5a6a5LmJ5Z+656GA57uT5p6E5L2TXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEJhc2VGdW5jIHtcclxuICAgIGVudW0gVUlUeXBlRW51bSB7IExvdywgTWlkbGUgfTtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXA8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Db3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX01hcDogeyBba2V5OiBzdHJpbmddOiBUIH07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX01hcCA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3JFYWNoKGNhbGxiYWNrOiAobWdyOiBULCBrZXk6IHN0cmluZykgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBtYXBLZXkgaW4gdGhpcy5fTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9NYXBbbWFwS2V5XSwgbWFwS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gb2JqIOaUvuWFpeWvueixoVxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0KG9iajogVCwga2V5OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9NYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2V0KGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDnp7vpmaTmn5DkuKrlr7nosaFcclxuICAgICAgICAgKiBAcmV0dXJucyDooqvnp7vpmaTlr7nosaFcclxuICAgICAgICAgKi9cclxuICAgICAgICBSZW1vdmUoa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICAgICAgdmFyIE9iajogVCA9IHRoaXMuX01hcFtrZXldO1xyXG4gICAgICAgICAgICBpZiAoT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm5oul5pyJXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgSGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9NYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm9kZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX1ZhbHVlOiBUO1xyXG4gICAgICAgIHByaXZhdGUgX05leHQ6IE5vZGU8VD47XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBWYWx1ZSgpOiBUIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgVmFsdWUodmFsdWU6IFQpIHtcclxuICAgICAgICAgICAgdGhpcy5fVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IE5leHQoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9OZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgTmV4dChub2RlOiBOb2RlPFQ+KSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9OZXh0ID0gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgTm9kZVBvb2w8VD5cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgX05vZGVMaXN0OiBOb2RlPFQ+O1xyXG4gICAgICAgIFB1bGxCYWNrKG5vZGU6IE5vZGU8VD4pIHtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9Ob2RlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QuTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Ob2RlTGlzdCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQXF1aXJlKCk6IE5vZGU8VD4ge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IHRoaXMuX05vZGVMaXN0O1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QgPSB0aGlzLl9Ob2RlTGlzdC5OZXh0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm9kZVF1ZXVlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfQ291bnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfSGVhZDogTm9kZTxUPlxyXG4gICAgICAgIHByaXZhdGUgX1RhaWxlXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUG9wTm9kZSgpOiBOb2RlPFQ+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0NvdW50IDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBub2RlOiBOb2RlPFQ+ID0gbnVsbDtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX0hlYWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWQgPSB0aGlzLl9IZWFkLk5leHQ7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIC0tdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5Yir5oqK5bC+5be05bim5Ye65Y675LqGXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaCh2YWx1ZTogVCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoTm9kZShub2RlOiBOb2RlPFQ+KSB7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9IZWFkID0gbm9kZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxlLk5leHQgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbm9kZTtcclxuICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIENsZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGVhZE5vZGUoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkhlYWROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEhlYWRWYWx1ZSgpOiBUIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0hlYWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9IZWFkLlZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGFpbE5vZGUoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRhaWxOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFRhaWxWYWx1ZSgpOiBUIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RhaWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fVGFpbGUudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFF1ZXVlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfTm9kZVBvb2w6IE5vZGVQb29sPFQ+O1xyXG4gICAgICAgIHByaXZhdGUgX05vZGVRdWV1ZTogTm9kZVF1ZXVlPFQ+O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5fTm9kZVBvb2wgPSBuZXcgTm9kZVBvb2w8VD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fTm9kZVF1ZXVlID0gbmV3IE5vZGVRdWV1ZTxUPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1c2godmFsdWU6IFQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6IE5vZGU8VD4gPSB0aGlzLl9Ob2RlUG9vbC5BcXVpcmUoKTtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUXVldWUuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUG9wKCk6IFQge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IHRoaXMuX05vZGVRdWV1ZS5Qb3BOb2RlKCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUG9vbC5QdWxsQmFjayhub2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX05vZGVRdWV1ZS5Db3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgU21vb3RoRGFtcFZlY3RvcjMge1xyXG4gICAgICAgIHByaXZhdGUgbV9DdXJyZW50VmVsb2NpdHk6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1fU21vb3RoVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9NYXhTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9NYXhNb3ZlTnVtOm51bWJlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzbW9vdGhUaW1lOiBudW1iZXIsIG1heFNwZWVkOiBudW1iZXIgPSAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VycmVudFZlbG9jaXR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX1Ntb290aFRpbWUgPSBzbW9vdGhUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWF4U3BlZWQgPSBtYXhTcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5tX01heE1vdmVOdW0gPSB0aGlzLm1fTWF4U3BlZWQgKiB0aGlzLm1fU21vb3RoVGltZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFNtb290aERhbXAoY3VycmVudDpudW1iZXIsdGFyZ2V0Om51bWJlcixkZWx0YVRpbWU6bnVtYmVyID0gMS82MCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbnVtOm51bWJlciA9IDIvdGhpcy5tX1Ntb290aFRpbWU7XHJcbiAgICAgICAgICAgIHZhciBudW0yOm51bWJlciA9IG51bSAqIGRlbHRhVGltZTtcclxuICAgICAgICAgICAgdmFyIG51bTM6bnVtYmVyID0gMS8oMStudW0yKzAuNDgqbnVtMipudW0yKzAuMjM1Km51bTIqbnVtMipudW0yKTtcclxuICAgICAgICAgICAgdmFyIG51bTQ6bnVtYmVyID0gY3VycmVudCAtIHRhcmdldDtcclxuICAgICAgICAgICAgdmFyIG51bTU6bnVtYmVyID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB2YXIgbnVtNjpudW1iZXIgPSB0aGlzLm1fTWF4U3BlZWQgKiB0aGlzLm1fU21vb3RoVGltZTtcclxuICAgICAgICAgICAgbnVtNCA9IG51bTQgPi1udW02JiZudW00PG51bTY/bnVtNDoobnVtND5udW02P251bTY6LW51bTYpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBjdXJyZW50IC0gbnVtNDtcclxuICAgICAgICAgICAgdmFyIG51bTc6bnVtYmVyID0gKHRoaXMubV9DdXJyZW50VmVsb2NpdHkrbnVtKm51bTQpKmRlbHRhVGltZTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9ICh0aGlzLm1fQ3VycmVudFZlbG9jaXR5IC0gbnVtKm51bTcpKm51bTM7XHJcbiAgICAgICAgICAgIHZhciBudW04Om51bWJlciA9IHRhcmdldCArKG51bTQrbnVtNykqbnVtMztcclxuICAgICAgICAgICAgaWYobnVtNSAtIGN1cnJlbnQgPiAwID09IG51bTg+bnVtNSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbnVtOCA9IG51bTU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQ3VycmVudFZlbG9jaXR5ID0gKG51bTggLSBudW01KS9kZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bTg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgcHVibGljIENvdW50KGN1clBTOiBMYXlhLlZlY3RvcjMsIHRhcmdldFBTOiBMYXlhLlZlY3RvcjMsIGRlbHRhVGltZTogbnVtYmVyID0gMSAvIDYwKTpMYXlhLlZlY3RvcjMge1xyXG4gICAgICAgICAgICB2YXIgbWF4TW92ZTogbnVtYmVyID0gdGhpcy5tX01heE1vdmVOdW07XHJcbiAgICAgICAgICAgIHZhciBydW5UaW1lUmF0ZTogbnVtYmVyID0gMiAqIGRlbHRhVGltZSAvIHRoaXMubV9TbW9vdGhUaW1lO1xyXG4gICAgICAgICAgICB2YXIgdGltZVJhdGlvOiBudW1iZXIgPSAxIC8gKDEgKyBydW5UaW1lUmF0ZSArIDAuNDggKiBydW5UaW1lUmF0ZSAqIHJ1blRpbWVSYXRlICsgMC4yMzUgKiBydW5UaW1lUmF0ZSAqIHJ1blRpbWVSYXRlICogcnVuVGltZVJhdGUpO1xyXG4gICAgICAgICAgICB2YXIgZ2FwOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zdWJ0cmFjdCh0YXJnZXRQUywgY3VyUFMsIGdhcCk7XHJcbiAgICAgICAgICAgIHZhciBtb3ZlRGlyOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5ub3JtYWxpemUoZ2FwLCBtb3ZlRGlyKTtcclxuICAgICAgICAgICAgLy/pgJ/luqbkv67mraNcclxuICAgICAgICAgICAgdmFyIG1vdmVEaXN0YW5jZTogbnVtYmVyID0gTGF5YS5WZWN0b3IzLmRpc3RhbmNlKHRhcmdldFBTLCBjdXJQUyk7XHJcbiAgICAgICAgICAgIG1vdmVEaXN0YW5jZSA9IG1vdmVEaXN0YW5jZSA8IG1heE1vdmUgJiYgbW92ZURpc3RhbmNlID4gLW1heE1vdmUgPyBtb3ZlRGlzdGFuY2UgOiAobW92ZURpc3RhbmNlID4gbWF4TW92ZSA/IG1heE1vdmUgOiAtbWF4TW92ZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VyTW92ZURpc3RhY25lOm51bWJlciA9ICggdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSArIDIqKG1vdmVEaXN0YW5jZS90aGlzLm1fU21vb3RoVGltZSkpKmRlbHRhVGltZTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9ICh0aGlzLm1fQ3VycmVudFZlbG9jaXR5IC0gMipjdXJNb3ZlRGlzdGFjbmUvdGhpcy5tX1Ntb290aFRpbWUpKnRpbWVSYXRpbztcclxuICAgICAgICAgICAgdmFyIGVuZFBTOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IChtb3ZlRGlzdGFuY2UgKyBjdXJNb3ZlRGlzdGFjbmUpKnRpbWVSYXRpbztcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKG1vdmVEaXIsc2NhbGUsZW5kUFMpO1xyXG4gICAgICAgICAgICAvL0xheWEuVmVjdG9yMy5hZGQodGFyZ2V0UFMsZW5kUFMsZW5kUFMpXHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5hZGQoY3VyUFMsZW5kUFMsZW5kUFMpO1xyXG4gICAgICAgICAgICB2YXIgZW5kTW92ZURpcjpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zdWJ0cmFjdChjdXJQUyxlbmRQUyxlbmRNb3ZlRGlyKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIExheWEuVmVjdG9yMy5kb3QobW92ZURpcixlbmRNb3ZlRGlyKSA8IDAgKS8vTGF5YS5WZWN0b3IzLmRpc3RhbmNlKHRhcmdldFBTLGN1clBTKSAqIExheWEuVmVjdG9yMy5kaXN0YW5jZSh0YXJnZXRQUyxlbmRQUyk8MCApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVuZFBTID0gdGFyZ2V0UFM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQ3VycmVudFZlbG9jaXR5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZW5kUFM7XHJcbiAgICAgICAgICAgIC8vTGF5YS5WZWN0b3IzLnNjYWxlKG1vdmVEaXIsbW92ZURpc3RhbmNlLGVuZCk7XHJcbiAgICAgICAgICAgIC8vdGFyZ2V0UFMgKyBMYXlhLlZlY3RvcjMuYWRkKG1vdmVEaXN0YW5jZSxjdXJNb3ZlRGlzdGFjbmUsZW5kU3BlZWQpIChtb3ZlRGlzdGFuY2UgKyBjdXJNb3ZlRGlzdGFjbmUpO1xyXG4gICAgICAgIH0qL1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIExpbmtOb2RlTGlzdDxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJpdmF0ZSBfSGVhZE5vZGU6Tm9kZTxUPjtcclxuICAgICAgICAgICAgcHJpdmF0ZSBfVGFpbE5vZGU6Tm9kZTxUPjtcclxuICAgIFxyXG4gICAgICAgICAgICBwcml2YXRlIF9Db3VudE5vZGU6bnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSB0aGlzLl9IZWFkTm9kZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUgPSB0aGlzLl9IZWFkTm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6I635Y+W5aS057uT54K55YC8XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZ2V0IEhlYWRWYWx1ZSgpOlRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9IZWFkTm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQWRkKHZhbHVlOlQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlOk5vZGU8VD4gPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BZGROb2RlKG5ld05vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEFkZE5vZGUobmV3Tm9kZTpOb2RlPFQ+KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9UYWlsTm9kZSE9dGhpcy5fSGVhZE5vZGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUuTmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSovXHJcblxyXG59IiwiZXhwb3J0IG1vZHVsZSBGU00gXHJcbntcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUZTTVxyXG4gICAge1xyXG4gICAgICAgIFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZTTSA8VCBleHRlbmRzIFN0YXRlPiBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIG1fQ3VyU3RhdGU6VDtcclxuICAgICAgICBwcml2YXRlIG1fU3RhdGVEaWN0OntbbmFtZTpzdHJpbmddOlR9O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvciggc3RhcnRTdGF0ZTpUID0gbnVsbCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyU3RhdGUgPSBzdGFydFN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IEN1clN0YXRlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaUueWPmOeKtuaAgVxyXG4gICAgICAgICAqIEBwYXJhbSBzdGF0ZSDorr7nva7nirbmgIFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgQ2hhbmdlU3RhdGUoc3RhdGU6VClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXRlLlNldE93bmVyKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgY3VyU3RhdGU6VCA9IHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICAgICAgaWYoY3VyU3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1clN0YXRlLkVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1clN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgIGN1clN0YXRlLlN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTdGF0ZSA9IGN1clN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjdXJTdGF0ZSA9IHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICAgICAgaWYoY3VyU3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1clN0YXRlLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX293bmVyOklGU007XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Iob3duZXI6SUZTTSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fb3duZXIgPSBvd25lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTZXRPd25lcihvd25lcjpJRlNNKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX293bmVyID0gb3duZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlKCk7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IEVuZCgpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBTdGFydCgpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZU1nclxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlKCk7XHJcbn0iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtCYXNlRnVuY30gIGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmFtZVdvcmtcclxue1xyXG4gICAgX01nck1hcDpCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+Oy8vQmFzZVN0cnVjdC5NYXA8QmFzZU1hbmFnZXI+O1xyXG4gICAgX1RlbU1nckxpc3Q6QXJyYXk8QmFzZU1hbmFnZXI+O1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX01nck1hcCA9IG5ldyBCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRk06RnJhbWVXb3JrO1xyXG4gICAgc3RhdGljIGdldCBGTSgpOkZyYW1lV29ya1xyXG4gICAge1xyXG4gICAgICAgIGlmKEZyYW1lV29yay5fRk09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGcmFtZVdvcmsuX0ZNID0gbmV3IEZyYW1lV29yaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRnJhbWVXb3JrLl9GTTtcclxuICAgIH1cclxuICAgIC8vY29uc3RydWN0b3JcclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1wTWdyTGlzdCA9IG5ldyBBcnJheTxCYXNlTWFuYWdlcj4odGhpcy5fTWdyTWFwLkNvdW50KTtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAuZm9yRWFjaCggKG1ncjpCYXNlTWFuYWdlciAsIGtleTpzdHJpbmcpOnZvaWQgPT57XHJcbiAgICAgICAgICAgIHRlbXBNZ3JMaXN0LnB1c2gobWdyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRlbXBNZ3JMaXN0LmZvckVhY2goKG1ncixpZHgpPT57bWdyLlVwZGF0ZSgpO30pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRNYW5hZ2VyPFQgZXh0ZW5kcyBCYXNlTWFuYWdlcj4oIHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9ICk6VFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX01nck1hcC5IYXModHlwZS5OYW1lKCkpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX01nck1hcC5HZXQodHlwZS5OYW1lKCkpIGFzIFQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZXdNZ3I6VCA9IG5ldyB0eXBlKCk7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwLlNldChuZXdNZ3IsdHlwZS5OYW1lKCkpO1xyXG4gICAgICAgIHJldHVybiAgbmV3TWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgR2V0TWFuYWdlcjxUIGV4dGVuZHMgQmFzZU1hbmFnZXI+KHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9KTpUe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9NZ3JNYXAuR2V0KHR5cGUuTmFtZSgpKSBhcyBUO1xyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOa2iOaBr+aOp+WItuWZqFxyXG4gKi9cclxuaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmV4cG9ydCBtb2R1bGUgTWVzc2FnZU1EIHtcclxuICAgIGV4cG9ydCBjb25zdCBHYW1lRXZlbnQgPVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVyRGVhdGg6IFwiUGxheWVyRGVhdGhcIixcclxuICAgICAgICAgICAgR2FtZVRpbWVVcDogXCJHYW1lVGltZVVwXCIsXHJcbiAgICAgICAgICAgIEdhbWVDb250aW51ZTogXCJHYW1lQ29udGludWVcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWVzc2FnZUNlbnRlciBleHRlbmRzIEJhc2VNYW5hZ2VyICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTogc3RyaW5nICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIk1lc3NhZ2VDZW50ZXJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX01ncjogTWVzc2FnZUNlbnRlcjtcclxuICAgICAgICBwcml2YXRlIF9FdmVudERpY3Q6IHsgW0tleTogc3RyaW5nXTogTUV2ZW50IH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgX0dldEV2ZW50KG5hbWU6IHN0cmluZyk6IE1FdmVudCAge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQ6IE1FdmVudCA9IHRoaXMuX0V2ZW50RGljdFtuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50ID09IHVuZGVmaW5lZCB8fCBldmVudCA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgTUV2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9FdmVudERpY3RbbmFtZV0gPSBldmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBldmVudCA9IHRoaXMuX0V2ZW50RGljdFtuYW1lXTtcclxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0V2ZW50RGljdCA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAqIOazqOWGjFxyXG4gICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAqIEBwYXJhbSB7T2JqfSBvd25lciDmi6XmnInogIVcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJlZ2lzdChuYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiAoKSA9PiB2b2lkLCBvd25lcjogT2JqZWN0KTpNRXZlbnQgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG5ld0RsZ3Q6IERlbGVnYXRlID0gbmV3IERlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LkFkZChuZXdEbGd0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldEV2ZW50XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jplIDmn5DkuKrnm5HlkKxcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAgKiBAcGFyYW0ge09ian0gb3duZXIg5oul5pyJ6ICFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmVnaXN0KG5hbWU6IHN0cmluZywgbGlzdGVuZXI6ICgpID0+IHZvaWQsIG93bmVyOiBPYmplY3QpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LlJtdihsaXN0ZW5lciwgb3duZXIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jplIDmn5DkuKrkuovku7ZcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBEZXNSZ2lzdElESyhuYW1lOiBzdHJpbmcpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRmlyZShuYW1lOiBzdHJpbmcsIHBhcmFtOiBhbnkgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6IE1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5FeGVjdXRlKHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5aeU5omYXHJcbiAgICBleHBvcnQgY2xhc3MgRGVsZWdhdGUge1xyXG4gICAgICAgIExpc3RlbmVyOiBPYmplY3Q7XHJcbiAgICAgICAgQWN0aW9uOiAocGFyYW06YW55KSA9PiB2b2lkO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBFeGVjdXRlKHBhcmFtOiBhbnkgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGlvbi5jYWxsKHRoaXMuTGlzdGVuZXIsIHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IobGlzdGVuZXI6IE9iamVjdCwgYWN0aW9uOiAocGFyYW06YW55KSA9PiB2b2lkKSAge1xyXG4gICAgICAgICAgICB0aGlzLkxpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5LqL5Lu2XHJcbiAgICBleHBvcnQgY2xhc3MgTUV2ZW50IHtcclxuICAgICAgICBEZWxlZ2F0ZUxpc3Q6IEFycmF5PERlbGVnYXRlPjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDmt7vliqDlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7RGVsZWdhdGV9IGRsZyDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIEFkZChkbGc6IERlbGVnYXRlKSAge1xyXG4gICAgICAgICAgICB0aGlzLkRlbGVnYXRlTGlzdC5wdXNoKGRsZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jlhozmlrnms5VcclxuICAgICAgICAgKiBAcGFyYW0gbGlzdGVuZXIg55uR5ZCs5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIG93bmVyIOaLpeacieiAhVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEFkZEZ1bmMobGlzdGVuZXI6KHBhcmFtOmFueSk9PmFueSxvd25lcjpvYmplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZGxnOkRlbGVnYXRlID0gbmV3IERlbGVnYXRlKG93bmVyLGxpc3RlbmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDnp7vpmaTlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvbiDmtojmga/lkI3lrZdcclxuICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lciDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJtdihhY3Rpb246ICgpID0+IHZvaWQsIGxpc3RlbmVyOiBPYmplY3QgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB2YXIgZGxndExpc3Q6IEFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhcnJJZHg6IG51bWJlciA9IGRsZ3RMaXN0Lmxlbmd0aCAtIDE7IGFycklkeCA+IC0xOyAtLWFycklkeCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gZGxndC5BY3Rpb24gJiYgbGlzdGVuZXIgPT0gZGxndC5MaXN0ZW5lcikgIHtcclxuICAgICAgICAgICAgICAgICAgICBkbGd0TGlzdC5zcGxpY2UoYXJySWR4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldCgpICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0ID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDop6blj5FcclxuICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIEV4ZWN1dGUocGFyYW06IGFueSkgIHtcclxuICAgICAgICAgICAgdmFyIGRsZ3RMaXN0OiBBcnJheTxEZWxlZ2F0ZT4gPSB0aGlzLkRlbGVnYXRlTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgYXJySWR4OiBudW1iZXIgPSBkbGd0TGlzdC5sZW5ndGggLSAxOyBhcnJJZHggPiAtMTsgLS1hcnJJZHgpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGxndCA9IGRsZ3RMaXN0W2FycklkeF07XHJcbiAgICAgICAgICAgICAgICBkbGd0LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiXHJcbmltcG9ydCB7RlNNfSBmcm9tIFwiLi8uLi9CYXNlL0ZTTVwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgbV9TY2VuZUZTTTogU2NlbmUuU2NlbmVGU007XHJcbiAgICBwcml2YXRlIG1fU2NlbmVOb2RlOiBMYXlhLk5vZGU7XHJcbiAgICBcclxuICAgIGdldCBDdXJTY2VuZSgpOlNjZW5lLkJhc2VTY2VuZSB7XHJcbiAgICAgICAgaWYodGhpcy5tX1NjZW5lRlNNLkN1clN0YXRlKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX1NjZW5lRlNNLkN1clN0YXRlO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZ2V0IEN1ckRpcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clNjZW5lLkRpcmVjdG9yO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTY2VuZU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuX0JHTGF5ZXIpO1xyXG5cclxuICAgICAgICB0aGlzLm1fU2NlbmVGU00gPSBuZXcgU2NlbmUuU2NlbmVGU00oKTtcclxuICAgICAgICB0aGlzLm1fU2NlbmVOb2RlID0gTGF5YS5zdGFnZS5hZGRDaGlsZChuZXcgTGF5YS5TcHJpdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENoYW5nZVNjZW5lKG5ld1NjZW5lOiBTY2VuZS5CYXNlU2NlbmUpICB7XHJcbiAgICAgICAgdGhpcy5tX1NjZW5lRlNNLkNoYW5nZVN0YXRlKG5ld1NjZW5lKTtcclxuICAgICAgICBpZihuZXdTY2VuZS5TY2VuZU9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9TY2VuZU5vZGUuYWRkQ2hpbGQobmV3U2NlbmUuU2NlbmVPYmopO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSlcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZS5VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aXp+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBfQkc6IExheWEuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBfQkdMYXllcjogTGF5YS5TcHJpdGU7XHJcbiAgICBcclxuICAgIHNldCBCRyhiZzogTGF5YS5TcHJpdGUpIHtcclxuICAgICAgICBpZiAoIWJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX0JHKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLnJlbW92ZVNlbGY7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB0aGlzLl9CRy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fQkcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllci5hZGRDaGlsZCh0aGlzLl9CRyk7XHJcbiAgICB9XHJcbiAgICBnZXQgQkcoKTpMYXlhLlNwcml0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fQkc7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKuS9nOiAhU1vXHJcbiog5Zy65pmv5Yqf6IO9XHJcbiovXHJcbi8qXHJcbi8v5Zy65pmv566h55CGXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgX0JHOiBMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX0JHTGF5ZXI6IExheWEuU3ByaXRlO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLl9CR0xheWVyKTtcclxuICAgICAgICAvL+a3u+WKoOWcuuaZr+euoeeQhlxyXG4gICAgICAgIHRoaXMuU2NlbmVOb2RlID0gTGF5YS5zdGFnZS5hZGRDaGlsZChuZXcgTGF5YS5TcHJpdGUoKSk7XHJcbiAgICB9XHJcbiAgICBzZXQgQkcoYmc6IExheWEuU3ByaXRlKSB7XHJcbiAgICAgICAgaWYgKCFiZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9CRykge1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5yZW1vdmVTZWxmO1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgdGhpcy5fQkcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0JHLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIuYWRkQ2hpbGQodGhpcy5fQkcpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEJHKCk6TGF5YS5TcHJpdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX0JHO1xyXG4gICAgfVxyXG4gICAgU2NlbmVOb2RlOiBMYXlhLk5vZGU7XHJcblxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTY2VuZU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9DdXJTY2VuZTogQmFzZVNjZW5lO1xyXG4gICAgZ2V0IEN1clNjZW5lKCk6IEJhc2VTY2VuZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0N1clNjZW5lO1xyXG4gICAgfVxyXG4gICAgc2V0IEN1clNjZW5lKHZhbHVlOiBCYXNlU2NlbmUpIHtcclxuICAgICAgICBpZiAodGhpcy5fQ3VyU2NlbmUgJiYgdGhpcy5fQ3VyU2NlbmUuU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fQ3VyU2NlbmUuU2NlbmUucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9DdXJTY2VuZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9DdXJTY2VuZSAmJiB0aGlzLl9DdXJTY2VuZS5TY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLlNjZW5lTm9kZS5hZGRDaGlsZCh0aGlzLl9DdXJTY2VuZS5TY2VuZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IEN1ckRpcigpOiBCYXNlRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZS5DdXJEaXI7XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJTY2VuZSh0YXJnZXRTY2VuZTogQmFzZVNjZW5lKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZSA9IHRhcmdldFNjZW5lO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZS5MZWF2ZSh0YXJnZXRTY2VuZSk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiovIiwiaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4uL2NvbnRyb2xlci9BUFBcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlRpbWVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1fU3RhcnRUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fR2FtZVRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9QYXVzaW5nVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1BhdXNlVGltZTogbnVtYmVyXHJcblxyXG4gICAgcHVibGljIGdldCBTdGFydFRpbWVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9TdGFydFRpbWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIChMYXlhLnRpbWVyLmN1cnJUaW1lciAtIHRoaXMubV9TdGFydFRpbWUgLXRoaXMubV9QYXVzZVRpbWUgLSB0aGlzLlBhdXNpbmdUaW1lKSAvIDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fU3RhcnRUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgdGhpcy5tX0dhbWVUaW1lID0gMDtcclxuICAgICAgICB0aGlzLm1fUGF1c2VUaW1lID0gMDtcclxuICAgICAgICB0aGlzLm1fUGF1c2luZ1RpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhdXNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1fUGF1c2luZ1RpbWUgPD0gMClcclxuICAgICAgICAgICAgdGhpcy5tX1BhdXNpbmdUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IFBhdXNpbmdUaW1lKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QYXVzaW5nVGltZSA+IDAgPyAoTGF5YS50aW1lci5jdXJyVGltZXIgLSB0aGlzLm1fUGF1c2luZ1RpbWUgKSA6IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ29udGludWUoKSB7XHJcbiAgICAgICAgdGhpcy5tX1BhdXNlVGltZSArPSB0aGlzLlBhdXNpbmdUaW1lO1xyXG4gICAgICAgIHRoaXMubV9QYXVzaW5nVGltZSA9IDA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vLi4vdWkvQmFzZVVJXCJcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgVUlGdW5jIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9VSUZ1bmNcIlxyXG5pbXBvcnQgeyBCYXNlRnVuYyB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLi9jb250cm9sZXIvQVBQXCI7XHJcbmVudW0gTm9kZVR5cGUge1xyXG4gICAgQm90dG9tLFxyXG4gICAgTWlkZGxlLFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHN0YXRpYyBnX1VJV2lkdGggPSA3NTA7XHJcbiAgICBzdGF0aWMgZ19VSUhlaWdodCA9IDEzMzQ7XHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBtX1Jvb3ROb2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgbV9Cb3R0b21Ob2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgbV9NaWRsZU5vZGU6IExheWEuQm94O1xyXG4gICAgcHJpdmF0ZSBfVUlEaWN0OiB7IFtuYW1lOiBzdHJpbmddOiBCYXNlVUkgfTtcclxuICAgIHByaXZhdGUgX1VwZGF0ZUNvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fVXBkYXRlVGltZTpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBBZGROb2RlKG5vZGU6IE5vZGVUeXBlKTogdm9pZCAge1xyXG4gICAgICAgIHZhciBub2RlQm94OiBMYXlhLkJveCA9IG5ldyBMYXlhLkJveCgpO1xyXG4gICAgICAgIG5vZGVCb3gudG9wID0gMDtcclxuICAgICAgICBub2RlQm94LmJvdHRvbSA9IDA7XHJcbiAgICAgICAgbm9kZUJveC5sZWZ0ID0gMDtcclxuICAgICAgICBub2RlQm94LnJpZ2h0ID0gMDtcclxuICAgICAgICBzd2l0Y2ggKG5vZGUpICB7XHJcbiAgICAgICAgICAgIGNhc2UgTm9kZVR5cGUuQm90dG9tOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0JvdHRvbU5vZGUgPSBub2RlQm94O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWlkbGVOb2RlID0gbm9kZUJveDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUm9vdE5vZGUuYWRkQ2hpbGQobm9kZUJveCk7XHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLmFkZENoaWxkKG5vZGVCb3gpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcgIHtcclxuICAgICAgICByZXR1cm4gXCJVSU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcm9vdEJveCA9IG5ldyBMYXlhLkJveCgpO1xyXG4gICAgICAgIHJvb3RCb3gud2lkdGggPSBVSU1hbmFnZXIuZ19VSVdpZHRoO1xyXG4gICAgICAgIHJvb3RCb3guaGVpZ2h0ID0gVUlNYW5hZ2VyLmdfVUlIZWlnaHQ7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChyb290Qm94KTtcclxuICAgICAgICB0aGlzLm1fUm9vdE5vZGUgPSByb290Qm94O1xyXG4gICAgICAgIHRoaXMub25TaXplQ2hhbmdlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLm1fUm9vdE5vZGUpO1xyXG4gICAgICAgIHRoaXMubV9VcGRhdGVUaW1lID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5BZGROb2RlKE5vZGVUeXBlLkJvdHRvbSk7XHJcbiAgICAgICAgdGhpcy5BZGROb2RlKE5vZGVUeXBlLk1pZGRsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fVUlEaWN0ID0ge307XHJcbiAgICAgICAgdGhpcy5fVXBkYXRlQ291bnQgPSAwO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5SRVNJWkUsIHRoaXMsIHRoaXMub25TaXplQ2hhbmdlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblNpemVDaGFuZ2UoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByb290Qm94ID0gdGhpcy5tX1Jvb3ROb2RlO1xyXG4gICAgICAgIFVJRnVuYy5GaXhVSShyb290Qm94LFVJTWFuYWdlci5nX1VJV2lkdGgpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIHNjYWxlID0gVUlGdW5jLkNvdW50U2NhbGVGaXgoVUlNYW5hZ2VyLmdfVUlXaWR0aCk7XHJcbiAgICAgICAgdmFyIHJvb3RCb3ggPSB0aGlzLm1fUm9vdE5vZGU7XHJcbiAgICAgICAgcm9vdEJveC5zY2FsZVggPSBzY2FsZTtcclxuICAgICAgICByb290Qm94LnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3guaGVpZ2h0ID0gVUlNYW5hZ2VyLmdfVUlIZWlnaHQgKiBzY2FsZTtcclxuICAgICAgICByb290Qm94LndpZHRoID0gVUlNYW5hZ2VyLmdfVUlXaWR0aDsqL1xyXG4gICAgICAgIGlmKCF0aGlzLm1fQm90dG9tTm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBudW1DaGlsZCA9IHRoaXMubV9Cb3R0b21Ob2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IG51bUNoaWxkO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZS5nZXRDaGlsZEF0KGkpO1xyXG4gICAgICAgICAgICBpZihub2RlICYmIG5vZGVbXCJMYXlvdXRcIl0pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVbXCJMYXlvdXRcIl0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbnVtQ2hpbGQgPSB0aGlzLm1fQm90dG9tTm9kZS5udW1DaGlsZHJlbjtcclxuICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBudW1DaGlsZDtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5tX0JvdHRvbU5vZGUuZ2V0Q2hpbGRBdChpKTtcclxuICAgICAgICAgICAgaWYobm9kZSAmJiBub2RlW1wiTGF5b3V0XCJdKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlW1wiTGF5b3V0XCJdKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSAgICBcclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCkgIHtcclxuICAgICAgICBcclxuICAgICAgICAvL+WumuW4p+WIt+aWsFVJXHJcbiAgICAgICAgaWYgKHRoaXMubV9VcGRhdGVUaW1lIDwgIEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSkgIHtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVVSSh0aGlzLm1fQm90dG9tTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkodGhpcy5tX01pZGxlTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VwZGF0ZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX1VwZGF0ZVRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyAwLjM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGVVSShub2RlOiBMYXlhLlNwcml0ZSkgIHtcclxuICAgICAgICBmb3IgKGxldCBpZHg6IG51bWJlciA9IDA7IGlkeCA8IG5vZGUubnVtQ2hpbGRyZW47ICsraWR4KSAge1xyXG4gICAgICAgICAgICB2YXIgdWk6IEJhc2VVSSA9IG5vZGUuZ2V0Q2hpbGRBdChpZHgpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgdWkuVUlVcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBBZGRVSSgpICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFNob3c8VCBleHRlbmRzIEJhc2VVST4odWlDbGFzczogeyBuZXcobmFtZTogc3RyaW5nKTogVDsgTmFtZSgpOiBzdHJpbmcgfSk6IFQgIHtcclxuICAgICAgICB2YXIgc3RyOiBzdHJpbmcgPSB1aUNsYXNzLk5hbWUoKTtcclxuICAgICAgICB2YXIgbmV3VUk6IEJhc2VVSSA9IHRoaXMuR2V0VUlCeU5hbWUoc3RyKTtcclxuICAgICAgICBuZXdVSSA9IG5ld1VJID09IG51bGwgPyB0aGlzLkFkZFVJQnlOYW1lKHN0ciwgbmV3IHVpQ2xhc3Moc3RyKSkgOiBuZXdVSTtcclxuICAgICAgICB2YXIgbm9kZTogTGF5YS5TcHJpdGUgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAobmV3VUkuVUlUeXBlKSAge1xyXG4gICAgICAgICAgICAvL+S4reWxguasoVVJXHJcbiAgICAgICAgICAgIGNhc2UgQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fTWlkbGVOb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubV9NaWRsZU5vZGUubnVtQ2hpbGRyZW4gPD0gMCkgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+mAmuefpeWvvOa8lOaaguWBnOa4uOaIj1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuVGltZVVwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/pu5jorqRVaeWFqOaYr+S9juWxguasoVVJXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjaGlsZE51bTogbnVtYmVyID0gbm9kZS5udW1DaGlsZHJlbjtcclxuICAgICAgICAvL+aKiuS6kuaWpeeahOeql+WPo+WFs+aOiVxyXG4gICAgICAgIGlmIChuZXdVSS5Jc011dGV4ICYmIGNoaWxkTnVtID4gMCkgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSSA9IG5vZGUuZ2V0Q2hpbGRBdChub2RlLm51bUNoaWxkcmVuIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICBpZiAoIWxhc3RVSS5Jc011dGV4KVxyXG4gICAgICAgICAgICAgICAgbGFzdFVJLkhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGUuYWRkQ2hpbGQobmV3VUkpO1xyXG4gICAgICAgIG5ld1VJLk9wZW5PUCgpO1xyXG4gICAgICAgIGlmIChuZXdVSS5VSVR5cGUgPT0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZSAmJiBub2RlLm51bUNoaWxkcmVuID4gMCkge1xyXG4gICAgICAgICAgICBub2RlLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChuZXdVSSBhcyBUKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZSh1aTogQmFzZVVJKSAge1xyXG4gICAgICAgIHVpLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB1aS5DbG9zZU9QKCk7XHJcbiAgICAgICAgdmFyIG5vZGU6IExheWEuU3ByaXRlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKHVpLlVJVHlwZSkgIHtcclxuICAgICAgICAgICAgLy/kuK3lsYLmrKFVSVxyXG4gICAgICAgICAgICBjYXNlIEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX01pZGxlTm9kZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5udW1DaGlsZHJlbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIC8vIHRoaXMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WFs+mXreeql+WPoyDpgJrnn6XmuLjmiI/nu6fnu61cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLkNvbnRpbnVlVGltZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/pu5jorqRVaeWFqOaYr+S9juWxguasoVVJXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjaGlsZE51bTogbnVtYmVyID0gbm9kZS5udW1DaGlsZHJlbjtcclxuICAgICAgICBpZiAoY2hpbGROdW0gPiAwKSAge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVJOiBCYXNlVUkgPSBub2RlLmdldENoaWxkQXQoY2hpbGROdW0gLSAxKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIGxhc3RVSS5PcGVuT1AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2VDdXJWaWV3KCkgIHtcclxuICAgICAgICB2YXIgdWk6IEJhc2VVSSA9IHRoaXMubV9Cb3R0b21Ob2RlLmdldENoaWxkQXQodGhpcy5tX0JvdHRvbU5vZGUubnVtQ2hpbGRyZW4gLSAxKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgdGhpcy5DbG9zZSh1aSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liKDpmaTmiYDmnInoioLngrnkuIrnmoRVSVxyXG4gICAgQ2xlYXIoKSAge1xyXG4gICAgICAgIHZhciB1aU5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICB3aGlsZSAodWlOb2RlLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZVVJOiBCYXNlVUkgPSB1aU5vZGUuZ2V0Q2hpbGRBdCgwKSBhcyBCYXNlVUk7Ly8ucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB0aGlzLkNsb3NlKGNsb3NlVUkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1aU5vZGUgPSB0aGlzLm1fTWlkbGVOb2RlXHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VVSTogQmFzZVVJID0gdWlOb2RlLmdldENoaWxkQXQoMCkgYXMgQmFzZVVJOy8vLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VUlCeU5hbWUobmFtZTogc3RyaW5nKTogQmFzZVVJICB7XHJcbiAgICAgICAgdmFyIHVpID0gdGhpcy5fVUlEaWN0W25hbWVdO1xyXG4gICAgICAgIHVpID0gdWkgPT0gdW5kZWZpbmVkID8gbnVsbCA6IHVpO1xyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuICAgIEFkZFVJQnlOYW1lKG5hbWU6IHN0cmluZywgdWk6IEJhc2VVSSk6IEJhc2VVSSAge1xyXG4gICAgICAgIHRoaXMuX1VJRGljdFtuYW1lXSA9IHVpO1xyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IFJvbGVFbGVtZW50IGZyb20gXCIuL3NjcmlwdC9Sb2xlRWxlbWVudFwiXG5pbXBvcnQgSXRlbUVsZW1lbnQgZnJvbSBcIi4vc2NyaXB0L0l0ZW1FbGVtZW50XCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTc1MDtcclxuICAgIHN0YXRpYyBoZWlnaHQ6bnVtYmVyPTEzMzQ7XHJcbiAgICBzdGF0aWMgc2NhbGVNb2RlOnN0cmluZz1cImZpeGVkd2lkdGhcIjtcclxuICAgIHN0YXRpYyBzY3JlZW5Nb2RlOnN0cmluZz1cIm5vbmVcIjtcclxuICAgIHN0YXRpYyBhbGlnblY6c3RyaW5nPVwidG9wXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25IOnN0cmluZz1cImxlZnRcIjtcclxuICAgIHN0YXRpYyBzdGFydFNjZW5lOmFueT1cIkdhbWUuc2NlbmVcIjtcclxuICAgIHN0YXRpYyBzY2VuZVJvb3Q6c3RyaW5nPVwiXCI7XHJcbiAgICBzdGF0aWMgZGVidWc6Ym9vbGVhbj10cnVlO1xyXG4gICAgc3RhdGljIHN0YXQ6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBwaHlzaWNzRGVidWc6Ym9vbGVhbj1mYWxzZTtcclxuICAgIHN0YXRpYyBleHBvcnRTY2VuZVRvSnNvbjpib29sZWFuPXRydWU7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe31cclxuICAgIHN0YXRpYyBpbml0KCl7XHJcbiAgICAgICAgdmFyIHJlZzogRnVuY3Rpb24gPSBMYXlhLkNsYXNzVXRpbHMucmVnQ2xhc3M7XHJcbiAgICAgICAgcmVnKFwic2NyaXB0L1JvbGVFbGVtZW50LnRzXCIsUm9sZUVsZW1lbnQpO1xuICAgICAgICByZWcoXCJzY3JpcHQvSXRlbUVsZW1lbnQudHNcIixJdGVtRWxlbWVudCk7XHJcbiAgICB9XHJcbn1cclxuR2FtZUNvbmZpZy5pbml0KCk7IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3Rlck1hbmFnZXIgZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX01ncjogQ2hhcmFjdGVyTWFuYWdlcjtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IE1ncigpOiBDaGFyYWN0ZXJNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIUNoYXJhY3Rlck1hbmFnZXIuZ19NZ3IpIHtcclxuICAgICAgICAgICAgQ2hhcmFjdGVyTWFuYWdlci5nX01nciA9IG5ldyBDaGFyYWN0ZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJNYW5hZ2VyLmdfTWdyO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJDaGFyYWN0ZXJJbmZvXCIpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIEdlbkluZm8oZGF0YTogYW55KSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDaGFyYWN0ZXJJbmZvKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRTa2lsbEl0ZW0oaWQpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uSXRlbTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0UHJpY2UoaWQpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uUHJpY2U7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldENoYXJhY3RlckluZm8oaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0SXRlbUlEKGlkKSB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmICghaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHJldHVybiBpbmZvLkl0ZW07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgR2V0TmFtZShpZCkge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoIWluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIHJldHVybiBpbmZvLm1OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXREZXNjKGlkKSB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmICghaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIGluZm8uRGVzYztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0Q2hhcmFjdGVyTW9kZWwoaWQ6IG51bWJlcik6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHZhciBpbmZvOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRJbmZvPENoYXJhY3RlckluZm8+KGlkKTtcclxuICAgICAgICBpZiAoIWluZm8pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyRGF0YTogQ2hhcmFjdGVySW5mbyA9IHRoaXMuR2V0Q2hhcmFjdGVySW5mbyhpZCk7XHJcbiAgICAgICAgdmFyIHNhbXBsZU1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0TEgoY2hhcmFjdGVyRGF0YS5OYW1lKSk7XHJcbiAgICAgICAgdmFyIG1vZGVsID0gc2FtcGxlTW9kZWwuY2xvbmUoKTtcclxuICAgICAgICByZXR1cm4gbW9kZWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENoYXJhY3RlckluZm8gZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlSW5mbyB7XHJcbiAgICBwcml2YXRlIG1fUHJpY2U6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Nb2RlbE5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgbV9FeHRlbmRJRDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9OYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fRGVzYzogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgbU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBEZXNjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9EZXNjO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgSXRlbSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fSXRlbTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUHJpY2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1ByaWNlO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoY2hhcmFjdGVyRGF0YTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoY2hhcmFjdGVyRGF0YSk7XHJcbiAgICAgICAgdGhpcy5tX0lEID0gY2hhcmFjdGVyRGF0YS5JRCA/IGNoYXJhY3RlckRhdGEuSUQgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9Nb2RlbE5hbWUgPSBjaGFyYWN0ZXJEYXRhLk1vZGVsSUQgPyBjaGFyYWN0ZXJEYXRhLk1vZGVsSUQgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9JdGVtID0gY2hhcmFjdGVyRGF0YS5JdGVtSUQgPyBOdW1iZXIoY2hhcmFjdGVyRGF0YS5JdGVtSUQgLSAxKSA6IC0xO1xyXG4gICAgICAgIHRoaXMubV9QcmljZSA9IGNoYXJhY3RlckRhdGEuUHJpY2UgPyBOdW1iZXIoY2hhcmFjdGVyRGF0YS5QcmljZSkgOiAwO1xyXG4gICAgICAgIHRoaXMubV9OYW1lID0gY2hhcmFjdGVyRGF0YS5QYXNzc2NvcmUgPyBjaGFyYWN0ZXJEYXRhLlBhc3NzY29yZSA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0Rlc2MgPSBjaGFyYWN0ZXJEYXRhLkRlc2MgPyBjaGFyYWN0ZXJEYXRhLkRlc2MgOiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW9kZWxOYW1lO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuZXhwb3J0IG1vZHVsZSBHYW1lTWFuYWdlciB7XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZU1hbmFnZXIge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01hcDogeyBbbmFtZTogc3RyaW5nXTogQmFzZUluZm8gfTtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9Cb3R0b21JRDogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICB0aGlzLm1fTWFwID0ge307XHJcbiAgICAgICAgICAgIHRoaXMubV9Cb3R0b21JRCA9IC0xO1xyXG4gICAgICAgICAgICB2YXIgY29uZmlnSW5mbzogb2JqZWN0ID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0SnNvblBhdGgobmFtZSkpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29uZmlnSW5mbykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBjb25maWdJbmZvW2tleV07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YUluZm86IEJhc2VJbmZvID0gdGhpcy5HZW5JbmZvKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01hcFtkYXRhSW5mby5JRF0gPSBkYXRhSW5mbztcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhSW5mby5JRCAhPSAtMSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fQm90dG9tSUQgPSBkYXRhSW5mby5JRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgR2VuSW5mbyhkYXRhKTogQmFzZUluZm87XHJcbiAgICAgICAgcHJvdGVjdGVkIEdldEluZm88VCBleHRlbmRzIEJhc2VJbmZvPihpZDogbnVtYmVyKTogVCB7XHJcbiAgICAgICAgICAgIGlmICghaWQgfHwgaWQgPCAwKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBCYXNlSW5mbyA9IHRoaXMubV9NYXBbaWRdO1xyXG4gICAgICAgICAgICBpZiAoIUJhc2VJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBCYXNlSW5mbyA9IHRoaXMubV9NYXBbdGhpcy5tX0JvdHRvbUlEXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoQmFzZUluZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBCYXNlSW5mbyBhcyBUO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6I635Y+WSUTmlbDnu4RcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgR2V0SURMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgICAgICB2YXIgbWFwOiB7IFtJRDogbnVtYmVyXTogQmFzZUluZm8gfSA9IHRoaXMubV9NYXA7XHJcbiAgICAgICAgICAgIHZhciBJRExpc3Q6IEFycmF5PG51bWJlcj4gPSBbXVxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG1hcFtrZXldXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICBJRExpc3QucHVzaChkYXRhLklEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gSURMaXN0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgQmFzZUluZm8ge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0lEOiBudW1iZXI7XHJcbiAgICAgICAgcHVibGljIGdldCBJRCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0lEO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoZGF0YTogYW55KSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9JRCA9IGRhdGEuSUQgPyBOdW1iZXIoZGF0YS5JRCkgLSAxIDogLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1NYW5hZ2VyIGV4dGVuZHMgR2FtZU1hbmFnZXIuQmFzZU1hbmFnZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19NZ3I6IEl0ZW1NYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTWdyKCk6IEl0ZW1NYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIUl0ZW1NYW5hZ2VyLmdfTWdyKSB7XHJcbiAgICAgICAgICAgIEl0ZW1NYW5hZ2VyLmdfTWdyID0gbmV3IEl0ZW1NYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBJdGVtTWFuYWdlci5nX01ncjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJJdGVtSW5mb1wiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgR2VuSW5mbyhkYXRhOiBhbnkpOiBHYW1lTWFuYWdlci5CYXNlSW5mbyB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBJdGVtSW5mbyhkYXRhKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bpgZPlhbfku7fmoLxcclxuICAgICAqIEBwYXJhbSBpZCDpgZPlhbdJRFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgR2V0UHJpY2UoaWQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGluZm86IEl0ZW1JbmZvID0gdGhpcy5HZXRJbmZvPEl0ZW1JbmZvPihpZCk7XHJcbiAgICAgICAgaWYgKGluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvLlByaWNlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumBk+WFt+S7t+agvFxyXG4gICAgICogQHBhcmFtIGlkIOmBk+WFt0lEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRJdGVtSWNvbihpZDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgaW5mbzogSXRlbUluZm8gPSB0aGlzLkdldEluZm88SXRlbUluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uSWNvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+WSUTmlbDnu4RcclxuICAgICovXHJcbiAgICBwdWJsaWMgR2V0U2VsbEl0ZW1JRExpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgdmFyIG1hcCA9IHRoaXMubV9NYXA7XHJcbiAgICAgICAgdmFyIElETGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdXHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG1hcCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YTogYW55ID0gbWFwW2tleV1cclxuICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtSW5mbzogSXRlbUluZm8gPSBkYXRhIGFzIEl0ZW1JbmZvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1JbmZvLlByaWNlID49IDApXHJcbiAgICAgICAgICAgICAgICAgICAgSURMaXN0LnB1c2goZGF0YS5JRCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIElETGlzdDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEdldEl0ZW1UeXBlKGlkOm51bWJlcik6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZm86IEl0ZW1JbmZvID0gdGhpcy5HZXRJbmZvPEl0ZW1JbmZvPihpZCk7XHJcbiAgICAgICAgaWYgKGluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvLkl0ZW1UeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRJdGVtSW5mbyhpZDpudW1iZXIpOkl0ZW1JbmZvXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGluZm86IEl0ZW1JbmZvID0gdGhpcy5HZXRJbmZvPEl0ZW1JbmZvPihpZCk7XHJcbiAgICAgICAgcmV0dXJuIGluZm87XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEl0ZW1JbmZvIGV4dGVuZHMgR2FtZU1hbmFnZXIuQmFzZUluZm8ge1xyXG4gICAgcHJpdmF0ZSBtX01vZGVsTmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0V4dGVuZElEOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fUHJpY2U6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9JdGVtVHlwZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fSWNvbjpzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fUGFzc3Njb3JlOnN0cmluZztcclxuICAgIHByaXZhdGUgbV9EZXNjOnN0cmluZztcclxuICAgIHB1YmxpYyBnZXQgRGVzYygpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fRGVzYztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUGFzc3Njb3JlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QYXNzc2NvcmU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vZGVsTmFtZSArIHRoaXMubV9FeHRlbmRJRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgUHJpY2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1ByaWNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBJdGVtVHlwZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fSXRlbVR5cGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEljb24oKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0ljb247XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihkYXRhKTtcclxuICAgICAgICB0aGlzLm1fSUQgPSBkYXRhLklEID8gZGF0YS5JRCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX1Bhc3NzY29yZSA9IGRhdGEuUGFzc3Njb3JlID8gZGF0YS5QYXNzc2NvcmU6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX01vZGVsTmFtZSA9IGRhdGEuTW9kZWxOYW1lID8gZGF0YS5Nb2RlbE5hbWUgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9FeHRlbmRJRCA9IGRhdGEuRXh0ZW5kSUQgPyBkYXRhLkV4dGVuZElEIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fUHJpY2UgPSBkYXRhLlByaWNlID8gTnVtYmVyKGRhdGEuUHJpY2UpIDogMDtcclxuICAgICAgICB0aGlzLm1fSXRlbVR5cGUgPSBkYXRhLkl0ZW1UeXBlPyBOdW1iZXIoZGF0YS5JdGVtVHlwZSk6MDtcclxuICAgICAgICB0aGlzLm1fSWNvbiA9IGRhdGEuSWNvbj9kYXRhLkljb246XCJcIjtcclxuICAgICAgICB0aGlzLm1fRGVzYyA9IGRhdGEuRGVzYz9kYXRhLkRlc2M6XCJcIjtcclxuICAgIH1cclxufSIsImltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbiAvKipcclxuICog6KGo546w55So55qE5a+56LGhXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEFuaW1PYmpcclxue1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBuYW1lOnN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIik7XHJcbiAgICAgICAgdmFyIG1vZGVsOkxheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgZm9yKCBsZXQgY291bnQgPTA7Y291bnQgPCAzMDsrK2NvdW50IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1Db2luLG1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2VuQW5pbU9iajxUIGV4dGVuZHMgQmFzZUFuaW1PYmo+KCBhbmltQ2xhc3M6e25ldyAobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSxtb2RlbDpMYXlhLlNwcml0ZTNEICk6VFxyXG4gICAge1xyXG4gICAgICAgIHZhciBhbmltT2JqID0gTGF5YS5Qb29sLmdldEl0ZW0oYW5pbUNsYXNzLk5hbWUoKSk7XHJcbiAgICAgICAgaWYoYW5pbU9iaj09bnVsbClcclxuICAgICAgICAgICAgYW5pbU9iaiA9IG5ldyBhbmltQ2xhc3MoYW5pbUNsYXNzLk5hbWUoKSxtb2RlbCk7XHJcbiAgICAgICAgcmV0dXJuIGFuaW1PYmo7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFic3RyYWN0IGNsYXNzIEJhc2VBbmltT2JqIGV4dGVuZHMgTGF5YS5TcHJpdGUzRFxyXG4gICAge1xyXG4gICAgICAgIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5TY2VuZU9iai5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuX0ZyYW1lRnVuYylcclxuICAgICAgICB9XHJcbiAgICAgICAgTW9kZWw6TGF5YS5TcHJpdGUzRDtcclxuICAgIFxyXG4gICAgICAgIHByaXZhdGUgX05hbWU6c3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nLG1vZGVsOkxheWEuU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICB0aGlzLm9uKExheWEuRXZlbnQuUkVNT1ZFRCx0aGlzLHRoaXMuX0xlYXZlU3RhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lRnVuYygpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX0p1ZGdlQ29tcGxldGUoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0ZyYW1lTG9naWNGdW5jKCk7XHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuO1xyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVyKHRoaXMsdGhpcy5fRnJhbWVGdW5jKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEZvcmNlTGVhdmVTdGFnZSgpOnZvaWRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBBbmltQ29pbiBleHRlbmRzIEJhc2VBbmltT2JqXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIkFuaW1Db2luXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIFNldFRhcmdldCggdGFyZ2V0OkxheWEuU3ByaXRlM0QgKSAgICBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhcmdldCA9IHRhcmdldDtcclxuICAgICAgICAgICAgc3VwZXIuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGFyZ2V0OkxheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIobmFtZSxtb2RlbCk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/mr4/luKfmiafooYzpgLvovpHlip/og71cclxuICAgICAgICBwcm90ZWN0ZWQgX0ZyYW1lTG9naWNGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldFBvc2l0aW9uID0gdGhpcy5fVGFyZ2V0LnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBhZGRQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKGFkZFBTLDAuMSxhZGRQUyk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5hZGQoYWRkUFMscG9zaXRpb24scG9zaXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8v55Sf5ZG95ZGo5pyf57uT5p2f5aSE55CGXHJcbiAgICAgICAgcHJvdGVjdGVkIF9MZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3VwZXIuX0xlYXZlU3RhZ2UoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRMb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMubmFtZSx0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liKTmlq3ku7vliqHlrozmiJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0p1ZGdlQ29tcGxldGUoKTpib29sZWFuXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGRpc0RpciA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnN1YnRyYWN0KHRhcmdldFBvc2l0aW9uLHBvc2l0aW9uLGRpc0Rpcik7XHJcbiAgICAgICAgICAgIGlmKCBMYXlhLlZlY3RvcjMuc2NhbGFyTGVuZ3RoU3F1YXJlZChkaXNEaXIpPDAuMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgbW9kdWxlIENoYXJhY3RlclxyXG57XHJcbiAgICBleHBvcnQgZW51bSBBbmltRW51bVxyXG4gICAge1xyXG4gICAgICAgIFN0YW5kLFxyXG4gICAgICAgIEZseSxcclxuICAgICAgICBGYWxsLFxyXG4gICAgICAgIEp1bXAsXHJcbiAgICAgICAgSnVtcGRvd24sXHJcbiAgICAgICAgRGllXHJcbiAgICB9XHJcbiAgICB2YXIgQW5pbVR5cGU6e1tuYW1lOm51bWJlcl06c3RyaW5nfTtcclxuICAgIEFuaW1UeXBlID0ge307XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5TdGFuZF0gPSBcImlkbGVcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkp1bXBdID0gXCJqdW1wVXBcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkp1bXBkb3duXSA9IFwianVtcERvd25cIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkZseV0gPSBcImZseVwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uRmFsbF0gPSBcImZhbGxcIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkRpZV0gPSBcImRpZVwiO1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFBsYXllckFuaW1OYW1lKCBuYW1lRW51bTpBbmltRW51bSApOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBBbmltVHlwZVtuYW1lRW51bV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJBbmltYXRvclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgbV9BbmltYXRvcjpMYXlhLkFuaW1hdG9yO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBQbGF5ZXJDaGFyYWN0ZXI6TGF5YS5TcHJpdGUzRCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBQbGF5ZXJDaGFyYWN0ZXIuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgU3dpdGNoU3RhdGUoIEFuaW1FbnVtIClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RvckFuaW1hdG9yXHJcbntcclxuICAgIHByb3RlY3RlZCBtX0FuaWFtdG9yOkxheWEuQW5pbWF0b3I7XHJcbiAgICBwcml2YXRlIG1fU3RhdGVNYXA6IHtbbmFtZTpzdHJpbmddOkxheWEuQW5pbWF0b3JTdGF0ZX07XHJcbiAgICBwdWJsaWMgZ2V0IHNwZWVkKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9BbmlhbXRvci5zcGVlZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgc3BlZWQodmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9BbmlhbXRvci5zcGVlZCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoIGFuaW1hdG9yOkxheWEuQW5pbWF0b3IgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9BbmlhbXRvciA9IGFuaW1hdG9yO1xyXG4gICAgICAgIHRoaXMubV9TdGF0ZU1hcCA9IHt9O1xyXG4gICAgICAgIGlmKCFhbmltYXRvcilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBsYXllcjogTGF5YS5NYXBMYXllciA9IGFuaW1hdG9yLmdldENvbnRyb2xsZXJMYXllcigpLl9zdGF0ZXNNYXA7XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9TdGF0ZU1hcFtrZXldID0gbGF5ZXJba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFN0YXRlKG5hbWU6c3RyaW5nKTpMYXlhLkFuaW1hdG9yU3RhdGVcclxuICAgIHtcclxuICAgICAgICB2YXIgYW5pbWF0b3JTdGF0ZSA9IHRoaXMubV9TdGF0ZU1hcFtuYW1lXTtcclxuICAgICAgICBpZighYW5pbWF0b3JTdGF0ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpZGxlU3RhdGUgPSB0aGlzLm1fQW5pYW10b3IuZ2V0RGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGFuaW1hdG9yU3RhdGUgPSBuZXcgTGF5YS5BbmltYXRvclN0YXRlKCk7XHJcbiAgICAgICAgICAgIGFuaW1hdG9yU3RhdGUubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIGFuaW1hdG9yU3RhdGUuY2xpcCA9IGlkbGVTdGF0ZS5jbGlwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pYW10b3IuYWRkU3RhdGUoYW5pbWF0b3JTdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbmltYXRvclN0YXRlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgUGxheShuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLm1fU3RhdGVNYXBbbmFtZV0pXHJcbiAgICAgICAgICAgIHRoaXMubV9BbmlhbXRvci5wbGF5KG5hbWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgbGlua1Nwcml0ZTNEVG9BdmF0YXJOb2RlKG5vZGVOYW1lOiBzdHJpbmcsIHNwcml0ZTNEOiBMYXlhLlNwcml0ZTNEKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaWFtdG9yLmxpbmtTcHJpdGUzRFRvQXZhdGFyTm9kZShub2RlTmFtZSxzcHJpdGUzRCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgeyBCYXNlRnVuYyB9IGZyb20gXCIuLi9CYXNlL0Jhc2VGdW5jXCI7XHJcbi8v5ri45oiP5Lit55u45py6XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDYW1lcmEgZXh0ZW5kcyBMYXlhLkNhbWVyYSB7XHJcbiAgICBDdHJsZXI6IEJhc2VHYW1lQ2FtZXJhQ3RybGVyO1xyXG4gICAgQmFzZVBTOiBMYXlhLlZlY3RvcjM7XHJcbiAgICBEeW5hbWljUFM6IExheWEuVmVjdG9yMztcclxuICAgIFBsYXllcjogUGxheWVyO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50UFM6IEJhc2VGdW5jLlNtb290aERhbXBWZWN0b3IzO1xyXG5cclxuICAgIHNldCBQb3NpdGlvbihwczogTGF5YS5WZWN0b3IzKSAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcHMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpOiBMYXlhLlZlY3RvcjMgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN0cmxlciA9IG5ldyBHYW1lQ2FtZXJhQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuRHluYW1pY1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgLy90aGlzLnRpbWVyTG9vcCgxLHRoaXMuQ3RybGVyLHRoaXMuQ3RybGVyLlVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5fVXBkYXRlKTtcclxuICAgICAgICB0aGlzLmNsZWFyRmxhZyA9IExheWEuQmFzZUNhbWVyYS5DTEVBUkZMQUdfU0tZO1xyXG4gICAgICAgIHRoaXMubV9Db3VudFBTID0gbmV3IEJhc2VGdW5jLlNtb290aERhbXBWZWN0b3IzKDIpXHJcbiAgICAgICAgLy9DYW1lcmEuc2t5UmVuZGVyZXIgPSBza3lCb3guX3JlbmRlcjtcclxuICAgICAgICAvL3RoaXMuc2sgPSBza3lCb3g7XHJcbiAgICAgICAgLy9wYXRoXHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGxhZXIocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXQoRHluYW1pY1BTOiBMYXlhLlZlY3RvcjMsIGJhc2VQUzogTGF5YS5WZWN0b3IzLCBwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IGJhc2VQUztcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IER5bmFtaWNQUztcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul+W5tuiuvue9ruS9jee9rlxyXG4gICAgQ291bnRTZXRQUygpICB7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMuQmFzZVBTLCB0aGlzLkR5bmFtaWNQUywgbmV3UFMpO1xyXG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMubV9Db3VudFBTLlNtb290aERhbXAoMCwgTGF5YS5WZWN0b3IzLmRpc3RhbmNlKHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLCBuZXdQUykpXHJcbiAgICAgICAgLy90aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5sZXJwKHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLCBuZXdQUywgc2NhbGUsIG5ld1BTKVxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7IC8vdGhpcy5tX0NvdW50UFMuQ291bnQodGhpcy50cmFuc2Zvcm0ucG9zaXRpb24sbmV3UFMpIC8vbmV3UFM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfVXBkYXRlKCkgIHtcclxuICAgICAgICB0aGlzLkN0cmxlci5VcGRhdGUoKTtcclxuICAgICAgICAvL3RoaXMuZmllbGRPZlZpZXdcclxuICAgIH1cclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVDYW1lcmFDdHJsZXIge1xyXG4gICAgQ2FtZXJhOiBHYW1lQ2FtZXJhO1xyXG4gICAgQ3RybGVyOiBCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIGFic3RyYWN0IFVwZGF0ZSgpOiB2b2lkO1xyXG4gICAgY29uc3RydWN0b3IoY2FtZXJhOiBHYW1lQ2FtZXJhLCBjdHJsZXI6IEJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbCkgIHtcclxuICAgICAgICBpZiAoY3RybGVyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIGN0cmxlciA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gY2FtZXJhO1xyXG4gICAgICAgIHRoaXMuQ3RybGVyID0gY3RybGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ2FtZXJhQ3RybGVyIGV4dGVuZHMgQmFzZUdhbWVDYW1lcmFDdHJsZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2FtZXJhOiBHYW1lQ2FtZXJhLCBjdHJsZXI6IEJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbCkgIHtcclxuICAgICAgICBzdXBlcihjYW1lcmEsIGN0cmxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCkgIHtcclxuICAgICAgICBpZiAodGhpcy5DYW1lcmEgPT0gbnVsbCB8fCB0aGlzLkNhbWVyYS5QbGF5ZXIgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBDYW1lcmFQUyA9IHRoaXMuQ2FtZXJhLkR5bmFtaWNQUztcclxuICAgICAgICB2YXIgUGxheWVyUFMgPSB0aGlzLkNhbWVyYS5QbGF5ZXIuX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlzTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggTWF0aC5hYnMoZGlzWk51bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnogKz0gZGlzWk51bSowLjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNhbWVyYS5EeW5hbWljUFMgPUNhbWVyYVBTOyovXHJcbiAgICAgICAgdmFyIENhbWVyYVBTID0gdGhpcy5DYW1lcmEuRHluYW1pY1BTO1xyXG4gICAgICAgIHZhciBQbGF5ZXJQUyA9IHRoaXMuQ2FtZXJhLlBsYXllci5tX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgdmFyIGRpc0h1bSA9IFBsYXllclBTLnggLSBDYW1lcmFQUy54O1xyXG4gICAgICAgIGlmIChNYXRoLmFicyhkaXNOdW0pID4gMC4wMSkgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLmFicyhkaXNaTnVtKSA+IDAuMDEpICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnogKz0gZGlzWk51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpc0h1bSkgPiAwLjAxKSAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy54ICs9IGRpc0h1bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuRHluYW1pY1BTID0gQ2FtZXJhUFM7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuQ291bnRTZXRQUygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgeyBBbmltT2JqIH0gZnJvbSBcIi4vLi4vR2FtZS9BbmltT2JqXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgeyBQbGF5ZXJDb250cm9sZXIgfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL0lucHV0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vR2FtZU1vZHVsZVwiO1xyXG5cclxudHlwZSBBbmltQ29pbiA9IEFuaW1PYmouQW5pbUNvaW5cclxuZXhwb3J0IG1vZHVsZSBJdGVtIHtcclxuICAgIC8v54mp5ZOB5qCH6K+GXHJcbiAgICBjb25zdCBJdGVtSUQ6IHN0cmluZyA9IFwiSXRlbVwiO1xyXG4gICAgY29uc3QgTW9kZWxJRDogc3RyaW5nID0gXCJNb2RlbFwiXHJcblxyXG4gICAgZXhwb3J0IGVudW0gTW9kZWxUeXBlIHtcclxuICAgICAgICBDb2luXHJcbiAgICB9XHJcbiAgICBleHBvcnQgZW51bSBJdGVtVHlwZSB7XHJcbiAgICAgICAgTm9uZSA9IDAsXHJcbiAgICAgICAgRW1wdHksXHJcbiAgICAgICAgUm9jayxcclxuICAgICAgICBUaG9ybixcclxuICAgICAgICBWaW5lLFxyXG4gICAgICAgIFByb3RlY3QgPSAxMSxcclxuICAgICAgICBIb2x5UHJvdGVjdCxcclxuICAgICAgICBGbHksXHJcbiAgICAgICAgUm9wZSxcclxuICAgICAgICBDb2xsZWN0b3IsXHJcbiAgICAgICAgQ29pbiA9IDIwLFxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIExpbmVJdGVtSW5mbyB7XHJcbiAgICAgICAgVHlwZTogSXRlbVR5cGU7XHJcbiAgICAgICAgTnVtYmVyOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IodHlwZTogSXRlbVR5cGUsIG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtYmVyID0gbnVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCB2YXIgQnVmZlNsb3Q6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0gPSB7fTtcclxuICAgIEJ1ZmZTbG90W0l0ZW1UeXBlLkNvbGxlY3Rvcl0gPSAwO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuUHJvdGVjdF0gPSAxO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuSG9seVByb3RlY3RdID0gMTtcclxuICAgIEJ1ZmZTbG90W0l0ZW1UeXBlLkZseV0gPSAxO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuVmluZV0gPSAyO1xyXG5cclxuICAgIC8v54mp5ZOB5biD5bGAXHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxheW91dCB7XHJcbiAgICAgICAgUmV3YXJkTGlzdDogQXJyYXk8TGF5SXRlbU1ncj47XHJcbiAgICAgICAgQmFycmllckxpc3Q6IEFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QgPSBuZXcgQXJyYXk8TGF5SXRlbU1ncj4oKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLCAxLCBJdGVtVHlwZS5FbXB0eSwgMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLCA1LCBJdGVtVHlwZS5Sb2NrLCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDIsIEl0ZW1UeXBlLlRob3JuLCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMiwgSXRlbVR5cGUuVmluZSwgMTApKTtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDEsIEl0ZW1UeXBlLkNvaW4pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLCA1MCwgSXRlbVR5cGUuRmx5LCAyMCkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsIDEwLCBJdGVtVHlwZS5Db2xsZWN0b3IpKTtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsIDEsIEl0ZW1UeXBlLlByb3RlY3QpKTtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoNTAsIDEsIEl0ZW1UeXBlLkhvbHlQcm90ZWN0KSk7XHJcblxyXG4gICAgICAgICAgICBSZXNldEl0ZW1GYWN0b3J5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWtlTGluZVJld2FyZChmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRha2VJdGVtKGZsb29yLCB0aGlzLlJld2FyZExpc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFrZUxpbmVEaWZmaWN1bHR5KGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuVGFrZUl0ZW0oZmxvb3IsIHRoaXMuQmFycmllckxpc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFrZUl0ZW0oZmxvb3I6IG51bWJlciwgTWdyTGlzdDogQXJyYXk8TGF5SXRlbU1ncj4pOiBBcnJheTxMaW5lSXRlbUluZm8+IHtcclxuICAgICAgICAgICAgdmFyIHJldHVybkluZm8gPSBuZXcgQXJyYXk8TGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBsaXN0SWR4ID0gMDsgbGlzdElkeCA8IE1nckxpc3QubGVuZ3RoOyArK2xpc3RJZHgpIHtcclxuICAgICAgICAgICAgICAgIE1nckxpc3RbbGlzdElkeF0uT25GbG9vcihmbG9vcik7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5mbzogTGluZUl0ZW1JbmZvID0gTWdyTGlzdFtsaXN0SWR4XS5UYWtlSXRlbXMoZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZm8uTnVtYmVyID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybkluZm8ucHVzaChpbmZvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmV0dXJuSW5mbztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/or6Xlr7nosaHnmoTliIbluIPlm77mr4/lsYLnrYnmpoLnjofliIbluINcclxuICAgIGV4cG9ydCBjbGFzcyBMYXlJdGVtTWdyIHtcclxuICAgICAgICAvL+mBk+WFt+exu+Wei1xyXG4gICAgICAgIEl0ZW1UeXBlOiBJdGVtVHlwZTtcclxuICAgICAgICAvL+W9k+WJjeWxguaVsFxyXG4gICAgICAgIEN1ckZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgLy/ljLrpl7TliIbluIPmgLvmlbDph49cclxuICAgICAgICBJdGVtTnVtOiBudW1iZXI7XHJcbiAgICAgICAgLy/lvIDlp4vliIbluIPnmoTlsYLmlbBcclxuICAgICAgICBTdGFydEZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgLy/liIbluIPljLrpl7RcclxuICAgICAgICAvL+W3suiOt+WPluWxguagh+iusFxyXG4gICAgICAgIFRvdWNoZWRGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIEl0ZW1MaXN0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8vcmFuZ2XljLrpl7TojIPlm7RcclxuICAgICAgICAvL251bSDljLrpl7TojIPlm7TmlbDph49cclxuICAgICAgICAvL2l0ZW1UeXBlIOeUn+S6p+eahOmBk+WFt+exu+Wei1xyXG4gICAgICAgIC8vc3RhcnRGbG9vciDku47lk6rkuIDooYzlvIDlp4vmipXmjrdcclxuICAgICAgICBjb25zdHJ1Y3RvcihyYW5nZTogbnVtYmVyLCBudW06IG51bWJlciwgaXRlbVR5cGU6IEl0ZW1UeXBlLCBzdGFydEZsb29yOiBudW1iZXIgPSAxKSB7XHJcbiAgICAgICAgICAgIGlmIChudW0gPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgbnVtID0gMTtcclxuICAgICAgICAgICAgaWYgKHN0YXJ0Rmxvb3IgPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgLy/nrKww5bGC5piv546p5a626LW35q2l5L2N572uXHJcbiAgICAgICAgICAgICAgICBzdGFydEZsb29yID0gMTtcclxuICAgICAgICAgICAgdGhpcy5JdGVtVHlwZSA9IGl0ZW1UeXBlO1xyXG4gICAgICAgICAgICB0aGlzLkN1ckZsb29yID0gMDtcclxuICAgICAgICAgICAgdGhpcy5JdGVtTnVtID0gbnVtO1xyXG4gICAgICAgICAgICAvL+WIhuW4g+WbviDnianlk4FpZHg65bGC5pWwXHJcbiAgICAgICAgICAgIHRoaXMuSXRlbUxpc3QgPSBuZXcgQXJyYXk8bnVtYmVyPihyYW5nZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG91Y2hlZEZsb29yID0gMDtcclxuICAgICAgICAgICAgdGhpcy5HZW5NYXAoc3RhcnRGbG9vcilcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFJhbmdlKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkl0ZW1MaXN0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsYLmm7TmlrDlh73mlbBcclxuICAgICAgICBPbkZsb29yKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKGZsb29yIDwgdGhpcy5Ub3VjaGVkRmxvb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2VuTWFwKGZsb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZmxvb3IgPj0gdGhpcy5TdGFydEZsb29yICsgdGhpcy5SYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HZW5NYXAoZmxvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sf5oiQ5YiG5biD5Zu+XHJcbiAgICAgICAgR2VuTWFwKHN0YXJ0Rmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0Rmxvb3IgPSBzdGFydEZsb29yO1xyXG4gICAgICAgICAgICB2YXIgaXRlbU51bSA9IHRoaXMuSXRlbU51bTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY291bnQ6IG51bWJlciA9IDA7IGNvdW50IDwgdGhpcy5JdGVtTGlzdC5sZW5ndGg7ICsrY291bnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXRlbUxpc3RbY291bnRdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXRlbUxpc3QgPSB0aGlzLkl0ZW1MaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBjb3VudE51bTogbnVtYmVyID0gMDsgY291bnROdW0gPCBpdGVtTnVtOyArK2NvdW50TnVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgSXRlbUZsb29yOiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLlJhbmdlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXRlbUxpc3RbSXRlbUZsb29yXSArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWtlSXRlbXMoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpbmVJdGVtSW5mbyh0aGlzLkl0ZW1UeXBlLCB0aGlzLkl0ZW1MaXN0W2Zsb29yIC0gdGhpcy5TdGFydEZsb29yXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBSZXNldDogYm9vbGVhbjtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZXNldEl0ZW1GYWN0b3J5KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChSZXNldCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciB0aGVLZXkgaW4gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGUpIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBwYXJzZUludCh0aGVLZXkpO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA8PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBjb3VudCA9IDA7IGNvdW50IDwgMzA7ICsrY291bnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGFzOiBhbnkgPSBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVt0eXBlXTtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtOiBTdGVwID0gbmV3IGNsYXMobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihJdGVtSUQgKyB0aGVLZXksIGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTdGVwSXRlbUZhY3RvcnkoaXRlbVR5cGU6IEl0ZW1UeXBlLCBzdGVwKSB7XHJcbiAgICAgICAgaWYgKHN0ZXAgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGl0ZW1UeXBlID0gSXRlbVR5cGUuTm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGl0ZW1cclxuICAgICAgICB2YXIgb2JqUG9vbCA9IExheWEuUG9vbDtcclxuICAgICAgICBpdGVtID0gb2JqUG9vbC5nZXRJdGVtKEl0ZW1JRCArIGl0ZW1UeXBlKVxyXG4gICAgICAgIGlmIChpdGVtID09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXSAhPSBudWxsICYmIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGFzOiBhbnkgPSBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV07XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IGNsYXMoc3RlcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IFN0ZXBJdGVtKGl0ZW1UeXBlLCBzdGVwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uU3RlcCA9IHN0ZXA7XHJcbiAgICAgICAgaXRlbS5SZXNldEl0ZW0oKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSXRlbUJ1ZmZGYWN0b3J5KGl0ZW1UeXBlOiBJdGVtVHlwZSk6IEJhc2VQbGF5ZXJCdWZmIHtcclxuICAgICAgICB2YXIgYnVmZjogQmFzZVBsYXllckJ1ZmYgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAoaXRlbVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5GbHk6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IEZseUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkNvbGxlY3RvcjpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgQ29sbGVjdEJ1ZmYoMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUHJvdGVjdDpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUHJvdGVjdEJ1ZmYoMyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUHJvdGVjdEJ1ZmYoMywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5WaW5lOlxyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5ldyBWaW5lQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9wZTpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUm9wZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3RlcEl0ZW0ge1xyXG4gICAgICAgIFN0ZXA6IFN0ZXA7XHJcbiAgICAgICAgSXRlbVR5cGU6IEl0ZW1UeXBlO1xyXG4gICAgICAgIE1vZGVsOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIHByaXZhdGUgbV9BbmltYXRvcjogTGF5YS5BbmltYXRvcjtcclxuICAgICAgICBnZXQgSXNEaWZmaWN1bHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtVHlwZSA+IDAgJiYgdGhpcy5JdGVtVHlwZSA8IDEwICYmIHRoaXMuSXRlbVR5cGUgIT0gSXRlbVR5cGUuVmluZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Yik5pat6IO95LiN6IO96LWw5LiK5Y67XHJcbiAgICAgICAgZ2V0IElzRm9yYmlkZW4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkl0ZW1UeXBlID09IEl0ZW1UeXBlLlJvY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+mHjee9rlxyXG4gICAgICAgIFJlc2V0SXRlbSgpIHtcclxuICAgICAgICAgICAgLy90aGlzLl9Jbml0SXRlbU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0RW5hYmxlKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTW9kZWwudHJhbnNmb3JtLnJvdGF0aW9uRXVsZXIgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0ZXAuUHV0SW5JdGVtKHRoaXMuTW9kZWwpOy8vIC5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU2V0RW5hYmxlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUHV0SXRlbSA9IGZ1bmN0aW9uIChpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5EZXNQYXduKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcC5TdGVwSXRlbSA9IFN0ZXBJdGVtRmFjdG9yeShpdGVtVHlwZSwgdGhpcy5TdGVwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5raI6ZmkIOaKiuiHquW3seWtmOWFpeWGheWtmOaxoFxyXG4gICAgICAgIERlc1Bhd24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vZGVsLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7Ly9HTS5PYmpQb29sO1xyXG4gICAgICAgICAgICBvYmpQb29sLnJlY292ZXIoSXRlbUlEICsgdGhpcy5JdGVtVHlwZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuSXRlbVR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBZGRCdWZmVG9QbGF5ZXIocGxheWVyOiBQbGF5ZXIsIHB1dEJhY2tJdGVtOiBib29sZWFuID0gdHJ1ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgQnVmZjogQmFzZVBsYXllckJ1ZmYgPSBJdGVtQnVmZkZhY3RvcnkodGhpcy5JdGVtVHlwZSk7XHJcbiAgICAgICAgICAgIHZhciBzdWNjZXNzOiBib29sZWFuID0gQnVmZi5BZGRUb1BsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICBpZiAoc3VjY2VzcyAmJiBwdXRCYWNrSXRlbSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog56qB56C05L+d5oqkXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm6KKr56qB56C0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQnJlYWtQcm90ZWN0KHBsYXllcjogUGxheWVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHZhciBjdXJCdWZmID0gcGxheWVyLkdldEJ1ZmYoQnVmZlNsb3RbSXRlbVR5cGUuUHJvdGVjdF0pO1xyXG4gICAgICAgICAgICBpZiAoY3VyQnVmZikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjdXJCdWZmLlR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckJ1ZmYuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuSG9seVByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoaXRlbVR5cGU6IEl0ZW1UeXBlLCBTdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtVHlwZSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1UeXBlID0gSXRlbVR5cGUuTm9uZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlN0ZXAgPSBTdGVwO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1UeXBlID0gaXRlbVR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9Jbml0SXRlbU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9BbmltYXRvciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfQWRkQnVmZlRvUGxheWVyKHBsYXllcjogUGxheWVyLCBidWZmOiBCYXNlUGxheWVyQnVmZikge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkFkZEJ1ZmYoYnVmZikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0luaXRJdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsICE9IG51bGwgJiYgIXRoaXMuTW9kZWwuZGVzdHJveWVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX0dlbkl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gdGhpcy5Nb2RlbC5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuTW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfVGVzdEdlbnRJdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IG51bGw7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5JdGVtVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Sb2NrOlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuTm9uZTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLkl0ZW1UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvY2s6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjMsIDAuMywgMC41KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIHByaXZhdGUgbV9UeXBlOiBJdGVtVHlwZTtcclxuICAgICAgICBwcml2YXRlIG1fUGxheWVyOiBQbGF5ZXI7XHJcbiAgICAgICAgcHVibGljIGdldCBUeXBlKCk6IEl0ZW0uSXRlbVR5cGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX1R5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgU2xvdCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gQnVmZlNsb3RbdGhpcy5UeXBlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBwbGF5ZXIoKTogUGxheWVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGU6IEl0ZW0uSXRlbVR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5tX1R5cGUgPSB0eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WQkeeOqeWutua3u+WKoEJVRkZcclxuICAgICAgICBwdWJsaWMgQWRkVG9QbGF5ZXIocGxheWVyOiBQbGF5ZXIpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdGhpcy5tX1BsYXllciA9IHBsYXllcjtcclxuICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYodGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFN0YXJ0KCk7XHJcbiAgICAgICAgcHVibGljIFJlbW92ZVNlbGYoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLkNvbXBsZXRlQnVmZih0aGlzLlNsb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgUmVtb3ZlZCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBSb2NrIGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgTW9kZWxOdW0gPSAzO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9jaywgU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuTWVzaFNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IDEgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBSb2NrLk1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIE5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMFwiICsgaWR4KVxyXG4gICAgICAgICAgICBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhOYW1lKVxyXG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb2NrXSA9IFJvY2s7XHJcblxyXG4gICAgY2xhc3MgVGhvcm4gZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoU3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5UaG9ybiwgU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQnJlYWtQcm90ZWN0KHBsYXllcikpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoKTtcclxuICAgICAgICAgICAgICAgIHZhciBhbmltOiBMYXlhLkFuaW1hdG9yID0gdGhpcy5Nb2RlbC5nZXRDaGlsZEF0KDApLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICAgICAgICAgIGFuaW0ucGxheShcInRvdWNoXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuVGhvcm5dID0gVGhvcm47XHJcblxyXG4gICAgY2xhc3MgUHJvdGVjdCBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlByb3RlY3QsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLkFkZEJ1ZmZUb1BsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlByb3RlY3RdID0gUHJvdGVjdDtcclxuXHJcbiAgICBjbGFzcyBQcm90ZWN0QnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmIHtcclxuICAgICAgICBUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHRpbWUg5oyB57ut5pe26Ze0XHJcbiAgICAgICAgICogQHBhcmFtIElzSG9seSDmmK/lkKbnu53lr7nml6DmlYxcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOiBudW1iZXIgPSAwLCBJc0hvbHk6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgICAgICBzdXBlcihJc0hvbHkgPyBJdGVtVHlwZS5Ib2x5UHJvdGVjdCA6IEl0ZW1UeXBlLlByb3RlY3QpO1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyB0aW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UaW1lIDwgQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0KCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZW1vdmVkKCkge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsYXNzIEhvbHlQcm90ZWN0IGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuSG9seVByb3RlY3QsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fdW50b3VjaGFibGVfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuSG9seVByb3RlY3RdID0gSG9seVByb3RlY3Q7XHJcblxyXG4gICAgY2xhc3MgQ29pbiBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICAvL1RvRG9cclxuICAgICAgICBwcml2YXRlIG1fdG91Y2hlZDogQm9vbGVhblxyXG4gICAgICAgIEZseVRvUGxheWVyKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHZhciBjb25pbjogQW5pbUNvaW4gPSBBbmltT2JqLkdlbkFuaW1PYmo8QW5pbUNvaW4+KEFuaW1PYmouQW5pbUNvaW4sIHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICBjb25pbi5TZXRUYXJnZXQocGxheWVyKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRHb2xkVW5Mb2dpY0dvbGQoMSk7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRHb2xkKDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuQ29pbiwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuQ29pbl0gPSBDb2luO1xyXG5cclxuICAgIGNsYXNzIENvbGxlY3RlciBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5BZGRCdWZmVG9QbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuQ29sbGVjdG9yLCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSArIE1hdGgucmFuZG9tKCkgKiAyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2Fic29yZF8wMVwiKTtcclxuICAgICAgICAgICAgdmFyIHRoZU1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSB0aGVNb2RlbC5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkNvbGxlY3Rvcl0gPSBDb2xsZWN0ZXI7XHJcblxyXG4gICAgY2xhc3MgQ29sbGVjdEJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgVGltZTogbnVtYmVyO1xyXG4gICAgICAgIEdhbWVEaXI6IEdhbWVEaXJlY3RvcjtcclxuICAgICAgICBDb3VudEZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgc3RhdGljIGdldCBTbG90KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3Rvcik7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZURpciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXI7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIHRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRGbG9vciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KCkge1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50Rmxvb3IgPSB0aGlzLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3IgLSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBSZW1vdmVkKCkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UaW1lIDwgQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3IgLSB0aGlzLkNvdW50Rmxvb3IgKyAxIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpci5HYW1lUGxheS5Mb29wRG9GbG9vclN0ZXAodGhpcy5Db3VudEZsb29yLCB0aGlzLCB0aGlzLkNvdW50Q29pbnMpO1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLkNvdW50Rmxvb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBDb3VudENvaW5zKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgaWYgKHN0ZXAuU3RlcEl0ZW0uSXRlbVR5cGUgPT0gSXRlbVR5cGUuQ29pbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIENvaW46IENvaW4gPSBzdGVwLlN0ZXBJdGVtIGFzIENvaW47XHJcbiAgICAgICAgICAgICAgICBDb2luLkZseVRvUGxheWVyKHRoaXMucGxheWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBGTHkgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5GbHksIHN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxICsgTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fZmx5ZXJfMDFcIik7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuRmx5XSA9IEZMeTtcclxuXHJcbiAgICBjbGFzcyBGbHlCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIHN0YXRpYyBnZXQgU2xvdCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3BlZWQ6IG51bWJlcjtcclxuICAgICAgICBGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9GbG9vclN3aXRjaDogbnVtYmVyO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDogbnVtYmVyID0gMC4xNSwgZmxvb3I6IG51bWJlciA9IDEwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkZseSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFN0YXJ0KCkge1xyXG4gICAgICAgICAgICB2YXIgdGltZTogbnVtYmVyID0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyOiBQbGF5ZXIgPSB0aGlzLnBsYXllcjtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5DdXJTdGVwID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjdXJMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvblxyXG4gICAgICAgICAgICB0aGlzLm1fRmxvb3JTd2l0Y2ggPSBwbGF5ZXIuQ3VyU3RlcC5GbG9vci5yaWdodFN3aXRjaDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24oY3VyTG9jYXRpb24uWCwgY3VyTG9jYXRpb24uWSk7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPSB0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIEdhbWVNb2R1bGUuRFNwYWNlICogdGhpcy5GbG9vcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbHlDdHJsID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJGbHkodGhpcy5TcGVlZCk7XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIHBsYXllci5GbHkoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQoKSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICBwbGF5ZXIuRmx5UHJlcGFyZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUmVtb3ZlZCgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24sIHRoaXMubV9GbG9vclN3aXRjaCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5Qb3BDdHJsZXIoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9GaW5hbFogLSB0aGlzLnBsYXllci5Qb3NpdGlvbi56ID4gLTAuMikge1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFJvcGUgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllciwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLk1lc2hTcHJpdGUzRCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMSwgMC41LCAwLjEpKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUm9wZV0gPSBSb3BlO1xyXG5cclxuICAgIGNsYXNzIFJvcGVCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIFNwZWVkOiBudW1iZXI7XHJcbiAgICAgICAgRmxvb3I6IG51bWJlcjtcclxuXHJcbiAgICAgICAgc3RhdGljIGdldCBTbG90KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX0ZpbmFsWiAtIHRoaXMucGxheWVyLlBvc2l0aW9uLnogPiAtMC4yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydCgpIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllcjogUGxheWVyID0gdGhpcy5wbGF5ZXI7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9IHRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gR2FtZU1vZHVsZS5EU3BhY2UgKiB0aGlzLkZsb29yO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLCB0aGlzLl9JbnB1dCkpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNldFNhZmVQUyh0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVtb3ZlZCgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5Qb3BDdHJsZXIoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlciA9IDAuMSwgZmxvb3I6IG51bWJlciA9IDEwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpc1JpZ2h0OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZUZsb29yID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vckxpbmU7XHJcbiAgICAgICAgICAgIGlmIChjbG9zZUZsb29yLkZsb29yTnVtICUgMiAhPSB0aGlzLl9GaW5hbExvY2F0aW9uLlkgJSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZUZsb29yID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HZXRGbG9vckJ5Rmxvb3IoY2xvc2VGbG9vci5GbG9vck51bSArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gY2xvc2VGbG9vci5HZXRTdGVwKHRoaXMuX0ZpbmFsTG9jYXRpb24uWCk7XHJcbiAgICAgICAgICAgIGlmIChpc1JpZ2h0KVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGlmIChzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBWaW5lIGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIHByaXZhdGUgbV9CZVRvdWNoZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgZ2V0IFRvdWNoZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQmVUb3VjaGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgVG91Y2hlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLm1fQmVUb3VjaGVkID0gdmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRvdWNoZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgdGhpcy5BZGRCdWZmVG9QbGF5ZXIocGxheWVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVmluZSwgc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxICsgTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gSWR4ID09IDEgPyBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKSA6IHBhdGguR2V0TEgoXCJ0cmFwX2Nob21wZXJfMDFcIilcclxuXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5raI6ZmkIOaKiuiHquW3seWtmOWFpeWGheWtmOaxoFxyXG4gICAgICAgIERlc1Bhd24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdXBlci5EZXNQYXduKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuVmluZV0gPSBWaW5lO1xyXG5cclxuICAgIGNsYXNzIFZpbmVCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIENvdW50VGltZTogbnVtYmVyO1xyXG4gICAgICAgIElucHV0RGlyOiBib29sZWFuO1xyXG4gICAgICAgIFN0YXJ0KCkge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLCB0aGlzLl9JbnB1dCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUmVtb3ZlZCgpIHtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoY291bnRUaW1lOiBudW1iZXIgPSA0LCBpbnB1dERpcjogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVmluZSk7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRUaW1lID0gY291bnRUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklucHV0RGlyID0gaW5wdXREaXI7XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9UaW1lO1xyXG4gICAgICAgIHByaXZhdGUgX0lucHV0KGlucHV0RGlyOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLklucHV0RGlyID09IGlucHV0RGlyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLklucHV0RGlyID0gIXRoaXMuSW5wdXREaXI7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuQ291bnRUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1Nob3dHYW1lSW5mbygpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Db3VudFRpbWUgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfU2hvd0dhbWVJbmZvKCkge1xyXG4gICAgICAgICAgICB2YXIgaW5mbzogc3RyaW5nO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Db3VudFRpbWUgPD0gMClcclxuICAgICAgICAgICAgICAgIGluZm8gPSBcIlwiO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gdGhpcy5JbnB1dERpciA9PSB0cnVlID8gXCJSaWdodFwiIDogXCJMZWZ0XCI7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2hvd0lucHV0SW5mbyhpbmZvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vTW91bnRMaW5lXCI7XHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi9HYW1lU3RydWN0XCI7XHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9HYW1lSXRlbVwiO1xyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCI7XHJcblxyXG52YXIgTW91bnRzOiBudW1iZXIgPSAyO1xyXG52YXIgTGluZVNwYWNlOiBudW1iZXIgPSAyO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZW1hcCBleHRlbmRzIExheWEuTm9kZSB7XHJcbiAgICBwcml2YXRlIG1fSGVhZEZsb29ySWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fVGFpbEZMb29ySWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fTW91bnRMaW5lczogTW91bnRMaW5lW107XHJcbiAgICBwcml2YXRlIG1fQ3VySWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fSXRlbVJhbmdlOiB7fTtcclxuICAgIHByaXZhdGUgbV9TYWZlTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgcHJpdmF0ZSBtX0N1ckxpbmVCYXJyaWVyczogQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+O1xyXG4gICAgcHJpdmF0ZSBtX0N1ckxpbmVSZXdhcmRzOiBBcnJheTxJdGVtLkxpbmVJdGVtSW5mbz47XHJcbiAgICBwcml2YXRlIG1fSXRlbUxheW91dDogSXRlbS5JdGVtTGF5b3V0O1xyXG5cclxuICAgIHByaXZhdGUgbV9yaWdodFN3aXRjaENvdW50OiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgQ3VyTGluZVJld2FyZHMoKTogQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckxpbmVSZXdhcmRzO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXQgQ3VyTGluZUJhcnJpZXJzKCk6IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJMaW5lQmFycmllcnM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldCBNb3VudExpbmVzKCk6IE1vdW50TGluZVtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vdW50TGluZXM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldCBOZXh0SUQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMubV9DdXJJZHggKyAxKSAlIE1vdW50cztcclxuICAgIH1cclxuICAgIGdldCBIZWFkRmxvb3IoKTogTW91bnRMaW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vdW50TGluZXNbdGhpcy5tX0hlYWRGbG9vcklkeF07XHJcbiAgICB9XHJcbiAgICBnZXQgVGFpbEZMb29yKCk6IE1vdW50TGluZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9Nb3VudExpbmVzW3RoaXMubV9UYWlsRkxvb3JJZHhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zyw5Zu+XHJcbiAgICAgKiBAcGFyYW0gZmxvb3JOdW0g5bGC5pWwXHJcbiAgICAgKiBAcGFyYW0gY29sdW1uIOWIl+aVsFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihmbG9vck51bTogbnVtYmVyLCBjb2x1bW46IG51bWJlcikge1xyXG4gICAgICAgIGZsb29yTnVtID0gNztcclxuICAgICAgICBjb2x1bW4gPSA3O1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX01vdW50TGluZXMgPSBbXTtcclxuICAgICAgICB0aGlzLm1fQ3VySWR4ID0gMDtcclxuICAgICAgICB0aGlzLm1fSGVhZEZsb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLm1fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLm1fSXRlbUxheW91dCA9IG5ldyBJdGVtLkl0ZW1MYXlvdXQoKVxyXG4gICAgICAgIHRoaXMubV9DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5tX0N1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLm1fU2FmZUxvY2F0aW9uID0gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKC0xLCAtMSk7XHJcbiAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgZmxvb3JOdW07ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdNb3VudGFpbiA9IG5ldyBNb3VudExpbmUoaWR4LCBjb2x1bW4sIGlkeClcclxuICAgICAgICAgICAgdGhpcy5tX01vdW50TGluZXNbaWR4XSA9IG5ld01vdW50YWluO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ld01vdW50YWluKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEluaXQoc3RhcnRGbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGxpbmVzOiBNb3VudExpbmVbXSA9IHRoaXMubV9Nb3VudExpbmVzO1xyXG4gICAgICAgIHN0YXJ0Rmxvb3IgPSAoIXN0YXJ0Rmxvb3IpICYmIChzdGFydEZsb29yIDwgMCkgJiYgKHN0YXJ0Rmxvb3IgPj0gbGluZXMubGVuZ3RoKSA/IDAgOiBzdGFydEZsb29yO1xyXG4gICAgICAgIHRoaXMubV9IZWFkRmxvb3JJZHggPSBsaW5lcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIHRoaXMubV9UYWlsRkxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50ID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpZHg6IG51bWJlciA9IDA7IGlkeCA8IGxpbmVzLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIGxpbmU6IE1vdW50TGluZSA9IGxpbmVzW2lkeF07XHJcbiAgICAgICAgICAgIGxpbmUuU2V0TGluZShpZHgsIHRoaXMuQ291bnROZXh0Rmxvb3JEaXJTd2l0aCgpKTtcclxuICAgICAgICAgICAgaWYgKGlkeCA+IDEpXHJcbiAgICAgICAgICAgICAgICBsaW5lc1tpZHggLSAxXS5TZXROZXh0Rmxvb3IobGluZSk7XHJcbiAgICAgICAgICAgIGlmIChpZHggPT0gc3RhcnRGbG9vcikge1xyXG4gICAgICAgICAgICAgICAgdmFyIFBsYXllclN0ZXAgPSBsaW5lLkdldFN0ZXAoTWF0aC5mbG9vcihsaW5lLkxlbmd0aCAvIDIpKTtcclxuICAgICAgICAgICAgICAgIFBsYXllclN0ZXAuSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX1NhZmVMb2NhdGlvbiA9IFBsYXllclN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtSW5MaW5lKGlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIHN0YXJ0Rmxvb3JOdW06IG51bWJlciA9IDA7IHN0YXJ0Rmxvb3JOdW0gPCBzdGFydEZsb29yOyArK3N0YXJ0Rmxvb3JOdW0pICB7XHJcbiAgICAgICAgICAgIGxpbmVzW3N0YXJ0Rmxvb3JOdW1dLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ291bnROZXh0Rmxvb3JEaXJTd2l0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fcmlnaHRTd2l0Y2hDb3VudDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXROZXh0RmxwcHJEaXJTd2l0Y2gobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fcmlnaHRTd2l0Y2hDb3VudCA9IG51bTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0U2FmZVN0ZXAoKTogU3RlcCB7XHJcbiAgICAgICAgdmFyIGZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLm1fU2FmZUxvY2F0aW9uLlkpO1xyXG4gICAgICAgIGlmIChmbG9vcilcclxuICAgICAgICAgICAgcmV0dXJuIGZsb29yLkdldFN0ZXAodGhpcy5tX1NhZmVMb2NhdGlvbi5YKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJyZWFrTGluZShmbG9vcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHRhaWxGbG9vciA9IHRoaXMuVGFpbEZMb29yO1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRhaWxGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBicmVha0Zsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgYnJlYWtGbG9vci5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBjb3VudEZsb29yOiBudW1iZXIgPSB0YWlsRmxvb3IuRmxvb3JOdW07IGNvdW50Rmxvb3IgPD0gZmxvb3I7ICsrY291bnRGbG9vcikge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGNvdW50Rmxvb3IpO1xyXG4gICAgICAgICAgICB0YXJnZXRGbG9vci5CcmVhaygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFRhaWxlRmxvb3IoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9ruWuieWFqOS9jee9rlxyXG4gICAgU2V0U2FmZVBTKGxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbikge1xyXG4gICAgICAgIHRoaXMubV9TYWZlTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICBpZiAobG9jYXRpb24uWSA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtIHx8IGxvY2F0aW9uLlkgPiB0aGlzLkhlYWRGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVzZXRJdGVtKGxvY2F0aW9uLlkpXHJcbiAgICB9XHJcblxyXG4gICAgLy/ku47mn5DkuIDlsYLlvIDlp4vkuIDlsYLlsYLph43mlrDmkYbmlL7pgZPlhbdcclxuICAgIFJlc2V0SXRlbShmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0N1ckxpbmVCYXJyaWVycyA9IG5ldyBBcnJheTxJdGVtLkxpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLm1fQ3VyTGluZVJld2FyZHMgPSBuZXcgQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgbG9vcEZsb29yOiBudW1iZXIgPSBmbG9vcjsgbG9vcEZsb29yIDw9IHRoaXMuSGVhZEZsb29yLkZsb29yTnVtOyArK2xvb3BGbG9vcikge1xyXG4gICAgICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9vcEZsb29yKTtcclxuICAgICAgICAgICAgZmxvb3JMaW5lLkxheU91dERpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZsb29yTGluZS5TZXRMaW5lKGZsb29yTGluZS5GbG9vck51bSwgdGhpcy5Db3VudE5leHRGbG9vckRpclN3aXRoKCkpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW1JbkxpbmUobG9vcEZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lsYLmlbDojrflj5bmn5DlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgR2V0Rmxvb3JCeUZsb29yKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yOiBNb3VudExpbmUgPSB0aGlzLlRhaWxGTG9vcjtcclxuICAgICAgICBpZiAoZmxvb3IgPCB0YWlsRmxvb3IuRmxvb3JOdW0gfHwgZmxvb3IgPiB0aGlzLkhlYWRGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29ySUQgPSAoZmxvb3IgLSB0YWlsRmxvb3IuRmxvb3JOdW0gKyB0aGlzLm1fVGFpbEZMb29ySWR4KSAlIHRoaXMubV9Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vdW50TGluZXNbZmxvb3JJRF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvqrnjq/orr7nva7lsYLlj7DpmLZcclxuICAgICAqIEBwYXJhbSBmbG9vciDlsYJcclxuICAgICAqIEBwYXJhbSBPd25lciBcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlvqrnjq/miafooYzlm57osINcclxuICAgICAqL1xyXG4gICAgTG9vcERvRmxvb3JTdGVwKGZsb29yOiBudW1iZXIsIE93bmVyOiBhbnksIGNhbGxCYWNrOiAoc3RlcDogU3RlcCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtIHx8IGZsb29yID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3JMaW5lOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZmxvb3JMaW5lLkxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vckxpbmUuR2V0U3RlcChpZHgpO1xyXG4gICAgICAgICAgICBjYWxsQmFjay5jYWxsKE93bmVyLCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciDnianlk4HliJfooahcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIFB1dEl0ZW1JbkxpbmUoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBzYWZlQ29sOiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIHZhciBmbG9vckxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgLy/luIPnva7ov4fkuobkuI3nlKjlho3luIPnva7kuoZcclxuICAgICAgICBpZiAoZmxvb3JMaW5lLkxheU91dERpcnR5KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZmxvb3JMaW5lLkxheU91dERpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGlmKGZsb29yID49IHRoaXMuX1NhZmVMb2NhdGlvbi5ZICsgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTWF4TGluZU51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNhZmVDb2wgPSB0aGlzLl9Db3VudE9wZW5MaXN0KGZsb29yKTtcclxuICAgICAgICB9ZWxzZSovXHJcbiAgICAgICAgdmFyIHNhZmVJZHhDb2xsOiB7IFtrZXk6IG51bWJlcl06IG51bWJlcjsgfSA9IHRoaXMuQ291bnRSb2FkSW5mbyhmbG9vcik7XHJcblxyXG4gICAgICAgIC8v5Ye655Sf54K55LiN5pS+6YGT5YW3XHJcbiAgICAgICAgaWYgKGZsb29yIDwgMSB8fCBmbG9vciA9PSB0aGlzLm1fU2FmZUxvY2F0aW9uLlkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iOt+WPluivpeihjOimgeaRhuaUvueahOeJqeWTgVxyXG4gICAgICAgIHRoaXMuVGFrZUl0ZW1MaXN0KGZsb29yKVxyXG5cclxuICAgICAgICAvL+aKiumcgOimgeaUvumBk+WFt+eahOagvOWtkOaUvuWFpemaj+acuuaxoFxyXG4gICAgICAgIHZhciBjdXJGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciByYW5kb21Qb29sOiBBcnJheTxTdGVwPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8v5oqK5a6J5YWo55qE5qC85a2Q5pqC5pe256e75Ye65p2lXHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDogQXJyYXk8U3RlcD4gPSBuZXcgQXJyYXk8U3RlcD4oKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4OiBudW1iZXIgPSAwOyBzdGVwSWR4IDwgY3VyRmxvb3IuTGVuZ3RoOyArK3N0ZXBJZHgpIHtcclxuICAgICAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSBjdXJGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoc2FmZUlkeENvbGxbc3RlcElkeF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnB1c2goZ2V0U3RlcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aUvumZt+mYsVxyXG4gICAgICAgIHZhciBiYXJyaWVyc0xpc3Q6IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPiA9IHRoaXMubV9DdXJMaW5lQmFycmllcnM7XHJcbiAgICAgICAgdGhpcy5Pcmdpbml6ZVB1dEl0ZW0oYmFycmllcnNMaXN0LCByYW5kb21Qb29sLCB0cnVlKTtcclxuICAgICAgICAvL+aRhuaUvumBk+WFt1xyXG4gICAgICAgIGZvciAodmFyIHNhZmVTdGVwSWR4OiBudW1iZXIgPSAwOyBzYWZlU3RlcElkeCA8IHNhZmVTdGVwTGlzdC5sZW5ndGg7ICsrc2FmZVN0ZXBJZHgpIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKHNhZmVTdGVwTGlzdFtzYWZlU3RlcElkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmV3YXJkTGlzdCA9IHRoaXMuQ3VyTGluZVJld2FyZHM7XHJcbiAgICAgICAgdGhpcy5Pcmdpbml6ZVB1dEl0ZW0ocmV3YXJkTGlzdCwgcmFuZG9tUG9vbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TGluZUl0ZW1JbmZvPn0gaXRlbUxpc3Qg54mp5ZOB5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFN0ZXA+fSByYW5kb21Qb29sIOWPsOmYtumbhuWQiFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0RlYWRSb2FkIOaYr+WQpuaYr+atu+i3r1xyXG4gICAgICovXHJcbiAgICBPcmdpbml6ZVB1dEl0ZW0oaXRlbUxpc3Q6IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPiwgcmFuZG9tUG9vbDogQXJyYXk8U3RlcD4sIGlzRGVhZFJvYWQ6IGJvb2xlYW4gPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgZm9yICh2YXIgaXRlbUlkeDogbnVtYmVyID0gMDsgaXRlbUlkeCA8IGl0ZW1MaXN0Lmxlbmd0aDsgKytpdGVtSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOiBJdGVtLkxpbmVJdGVtSW5mbyA9IGl0ZW1MaXN0W2l0ZW1JZHhdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkaWZmaWN1bHR5TnVtOiBudW1iZXIgPSAwOyBkaWZmaWN1bHR5TnVtIDwgaW5mby5OdW1iZXI7KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tUG9vbC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+maj+acuuaKiumanOeijeaUvuWFpeagvOWtkOmHjFxyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbUlkeDogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmFuZG9tUG9vbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSByYW5kb21Qb29sW3JhbmRvbUlkeF07XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnNwbGljZShyYW5kb21JZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgc3RlcC5QdXRJdGVtKGluZm8uVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWFkUm9hZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IGlzRGVhZFJvYWQ7XHJcbiAgICAgICAgICAgICAgICAtLWluZm8uTnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyYW5kb21Qb29sLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtSWR4ID4gMCkge1xyXG4gICAgICAgICAgICBpdGVtTGlzdC5zcGxpY2UoMCwgaXRlbUlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS+6YGT5YW35YmN566X6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIENvdW50Um9hZEluZm8oZmxvb3I6IG51bWJlcik6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0ge1xyXG4gICAgICAgIHZhciBzYWZlTGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIHZhciBzYWZlTWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9ID0ge307XHJcbiAgICAgICAgdmFyIHN0ZXBOZWVkUmFuZG9tTGlzdCA9IFtdO1xyXG4gICAgICAgIHZhciBzdGVwTm9kZUNvdW50OiBBcnJheTxudW1iZXI+ID0gW11cclxuICAgICAgICB2YXIgdGhpc0Zsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcblxyXG4gICAgICAgIHZhciByb2FkTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBsYXN0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yIC0gMSk7XHJcbiAgICAgICAgaWYgKCFsYXN0Rmxvb3IpXHJcbiAgICAgICAgICAgIHJldHVybiBzYWZlTWFwO1xyXG4gICAgICAgIHZhciBzYWZlSWR4OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGlmIChmbG9vciA9PSB0aGlzLm1fU2FmZUxvY2F0aW9uLlkpIHtcclxuICAgICAgICAgICAgdGhpcy5fUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3IpO1xyXG4gICAgICAgICAgICB2YXIgc2FmZVN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcCh0aGlzLm1fU2FmZUxvY2F0aW9uLlgpO1xyXG4gICAgICAgICAgICBzYWZlU3RlcC5Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNhZmVNYXBbdGhpcy5tX1NhZmVMb2NhdGlvbi5YXSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzdGVwSWR4OiBudW1iZXIgPSAwOyBzdGVwSWR4IDwgbGFzdEZsb29yLkxlbmd0aDsgKytzdGVwSWR4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIHZhciBsZWZ0U3RlcDogU3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodFN0ZXA6IFN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRJZHg6IG51bWJlciA9IGxlZnRTdGVwID8gbGVmdFN0ZXAuSWR4IDogLTE7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHR0SWR4OiBudW1iZXIgPSByaWdodFN0ZXAgPyByaWdodFN0ZXAuSWR4IDogLTE7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVmdElkeCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcE5vZGVDb3VudFtsZWZ0SWR4XSA9IHN0ZXBOb2RlQ291bnRbbGVmdElkeF0gPyBzdGVwTm9kZUNvdW50W2xlZnRJZHhdIDogMDtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwTm9kZUNvdW50W2xlZnRJZHhdICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmlnaHR0SWR4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwTm9kZUNvdW50W3JpZ2h0dElkeF0gPSBzdGVwTm9kZUNvdW50W3JpZ2h0dElkeF0gPyBzdGVwTm9kZUNvdW50W3JpZ2h0dElkeF0gOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBOb2RlQ291bnRbcmlnaHR0SWR4XSArPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0dElkeCA+IC0xICYmIGxlZnRJZHggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBOZWVkUmFuZG9tTGlzdC5wdXNoKFtyaWdodHRJZHgsIGxlZnRJZHhdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNhZmVTdGVwSWR4OiBudW1iZXIgPSBsZWZ0SWR4ID4gMCA/IGxlZnRJZHggOiByaWdodHRJZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhZmVTdGVwSWR4IDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZU1hcFtzYWZlU3RlcElkeF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHNhZmVJZHggKz0gc2FmZVN0ZXBJZHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgY291bnRJZHg6IG51bWJlciA9IDA7IGNvdW50SWR4IDwgc3RlcE5lZWRSYW5kb21MaXN0Lmxlbmd0aDsgKytjb3VudElkeCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSBzdGVwTmVlZFJhbmRvbUxpc3RbY291bnRJZHhdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRJZHg6IG51bWJlciA9IGluZm9bMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRJZHg6IG51bWJlciA9IGluZm9bMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNhZmVNYXBbbGVmdElkeF0gJiYgIXNhZmVNYXBbcmlnaHRJZHhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYW5kID4gMC41KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVNYXBbbGVmdElkeF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYWZlSWR4ICs9IGxlZnRJZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYWZlTWFwW3JpZ2h0SWR4XSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVJZHggKz0gcmlnaHRJZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGNvdW50U3RlcE5vZGU6IG51bWJlciA9IDA7IGNvdW50U3RlcE5vZGUgPCB0aGlzRmxvb3IuTGVuZ3RoOyArK2NvdW50U3RlcE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwbnVtOiBudW1iZXIgPSBzdGVwTm9kZUNvdW50W2NvdW50U3RlcE5vZGVdO1xyXG4gICAgICAgICAgICAgICAgc3RlcG51bSA9IHN0ZXBudW0gPyBzdGVwbnVtIDogMDtcclxuICAgICAgICAgICAgICAgIGlmIChzdGVwbnVtIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gbGFzdEZsb29yLkdldFN0ZXAoY291bnRTdGVwTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2FmZU1hcDtcclxuICAgIH1cclxuXHJcbiAgICBfUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3I6IE1vdW50TGluZSkge1xyXG4gICAgICAgIGlmICghdGhpc0Zsb29yKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgbG9naWNJZHg6IG51bWJlciA9IDA7IGxvZ2ljSWR4IDwgdGhpc0Zsb29yLkxlbmd0aDsgKytsb2dpY0lkeCkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmn5DpgZPlhbfkv6Hmga9cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfWZsb29yIFxyXG4gICAgICovXHJcbiAgICBUYWtlSXRlbUxpc3QoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBsaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciBpdGVtTGlzdCA9IG5ldyBBcnJheShsaW5lLkxlbmd0aCk7XHJcbiAgICAgICAgdmFyIGxpbmVSZXdhcmRzID0gdGhpcy5tX0l0ZW1MYXlvdXQuVGFrZUxpbmVSZXdhcmQoZmxvb3IpO1xyXG4gICAgICAgIHRoaXMubV9DdXJMaW5lUmV3YXJkcyA9IHRoaXMubV9DdXJMaW5lUmV3YXJkcy5jb25jYXQobGluZVJld2FyZHMpO1xyXG4gICAgICAgIGlmICh0aGlzLm1fU2FmZUxvY2F0aW9uLlkgPiBmbG9vciB8fCBmbG9vciA+IHRoaXMubV9TYWZlTG9jYXRpb24uWSArIDEpIHtcclxuICAgICAgICAgICAgdmFyIGxpbmVCYXJyaWVycyA9IHRoaXMubV9JdGVtTGF5b3V0LlRha2VMaW5lRGlmZmljdWx0eShmbG9vcik7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJMaW5lQmFycmllcnMgPSB0aGlzLm1fQ3VyTGluZUJhcnJpZXJzLmNvbmNhdChsaW5lQmFycmllcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9DdXJMaW5lQmFycmllcnMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMubV9DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5bGC5ZCR5LiK5Y+gXHJcbiAgICBwdWJsaWMgUHVzaEZMb29yKGRpcjogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHZhciBwcmVIZWFkOiBNb3VudExpbmUgPSB0aGlzLkhlYWRGbG9vcjtcclxuICAgICAgICB0aGlzLm1fSGVhZEZsb29ySWR4ID0gKHRoaXMubV9IZWFkRmxvb3JJZHggKyAxKSAlIHRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5tX1RhaWxGTG9vcklkeCA9ICh0aGlzLm1fVGFpbEZMb29ySWR4ICsgMSkgJSB0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBIZWFkZmxvb3I6IG51bWJlciA9IHByZUhlYWQuRmxvb3JOdW0gKyAxO1xyXG4gICAgICAgIHRoaXMuQWRkU3dpdGNoKGRpcik7XHJcbiAgICAgICAgdGhpcy5IZWFkRmxvb3IuU2V0TGluZShIZWFkZmxvb3IsIHRoaXMuQ291bnROZXh0Rmxvb3JEaXJTd2l0aCgpKTtcclxuICAgICAgICBwcmVIZWFkLlNldE5leHRGbG9vcih0aGlzLkhlYWRGbG9vcik7XHJcbiAgICAgICAgdGhpcy5QdXRJdGVtSW5MaW5lKEhlYWRmbG9vcik7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRTd2l0Y2goZGlyOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgaWYgKGRpciA+IDAuMDEpXHJcbiAgICAgICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50ICs9IDE7XHJcbiAgICAgICAgZWxzZSBpZiAoZGlyIDwgLTAuMDEpXHJcbiAgICAgICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50IC09IDE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0ZXBJbmZvIHtcclxuICAgIHBhcmVudElEOiBudW1iZXI7XHJcblxyXG59IiwiZXhwb3J0IG1vZHVsZSBHYW1lTW9kdWxlXHJcbntcclxuICAgIGV4cG9ydCBjbGFzcyBFdmVudFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgT25DaGFyYWN0ZXJJdGVtQ2hhbmdlOnN0cmluZyA9IFwiT25DaGFyYWN0ZXJJdGVtQ2hhbmdlXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPblRpbWVQYXVzZTpzdHJpbmcgPSBcIk9uVGltZVBhdXNlXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPblRpbWVDb250aW51ZTpzdHJpbmcgPSBcIk9uVGltZUNvbnRpbnVlXCI7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgdmFyIEhTcGFjZTpudW1iZXIgPSAzO1xyXG4gICAgZXhwb3J0IHZhciBWU3BhY2U6bnVtYmVyID0gMi41O1xyXG4gICAgZXhwb3J0IHZhciBEU3BhY2U6bnVtYmVyID0gMC43NTtcclxufSIsImV4cG9ydCBtb2R1bGUgR2FtZVN0cnVjdFxyXG57XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0SW5mbyB7XHJcbiAgICAgICAgQXVkaW9PbjogYm9vbGVhbjtcclxuICAgICAgICBPUElzUmlnaHQ6IGJvb2xlYW47XHJcbiAgICAgICAgVGV4dEluZm86IHN0cmluZztcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5BdWRpb09uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5PUElzUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlRleHRJbmZvID0gXCJIZWxsbyBcXG4gSGVsbG9cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTUxvY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgZ2V0IFgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBYKHg6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzBdID14O1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgWSgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0FyclsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFkoeTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnJbMV0gPSB5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9BcnI6QXJyYXk8bnVtYmVyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggeDpudW1iZXIseTpudW1iZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyID0gW3gseV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IHZhciBJdGVtRGljdFR5cGU6e1tJdGVtVHlwZTpudW1iZXJdOmFueX07XHJcbiAgICBJdGVtRGljdFR5cGUgPSB7IH07XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog6L6T5YWl566h55CG55u45YWzXHJcbiAqL1xyXG5pbXBvcnQgR2FtZVNjZW5lUGxheSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheVwiXHJcbmV4cG9ydCBtb2R1bGUgSW5wdXQge1xyXG4gICAgLy/ln7rnoYDovpPlhaXmjqfliLblmahcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlR2FtZUlucHV0IHtcclxuICAgICAgICAvL+WFrOaciVxyXG4gICAgICAgIE5leHRJbnB1dDogQmFzZUdhbWVJbnB1dDtcclxuICAgICAgICBhYnN0cmFjdCBJbnB1dChpc1JpZ2h0OiBib29sZWFuKTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoaW5wdXQ6IEJhc2VHYW1lSW5wdXQgPSBudWxsKSAge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk5leHRJbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAgeyB9XHJcbiAgICAgICAgQ2xlYXIoKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRElZSW5wdXQgZXh0ZW5kcyBCYXNlR2FtZUlucHV0IHtcclxuICAgICAgICBJbnB1dChpc1JpZ2h0OiBib29sZWFuKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9MaXN0ZW5lci5jYWxsKHRoaXMuX093bmVyLCBpc1JpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfT3duZXI6IGFueTtcclxuICAgICAgICBwcml2YXRlIF9MaXN0ZW5lcjogKGlzcmluZzogYm9vbGVhbikgPT4gdm9pZDtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihvd25lcjogYW55ID0gbnVsbCwgbGlzdGVuZXI6IChpc3Jpbmc6IGJvb2xlYW4pID0+IHZvaWQgPSBudWxsKSAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9Pd25lciA9IG93bmVyO1xyXG4gICAgICAgICAgICB0aGlzLl9MaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBOb3JtR2FtZUlucHV0IGV4dGVuZHMgQmFzZUdhbWVJbnB1dCB7XHJcbiAgICAgICAgR2FtZURpcjogR2FtZVNjZW5lUGxheTtcclxuICAgICAgICBfRGlydHk6IGJvb2xlYW47XHJcbiAgICAgICAgX0lzUmlnaHQ6IGJvb2xlYW47XHJcbiAgICAgICAgY29uc3RydWN0b3IoZGlyOiBHYW1lU2NlbmVQbGF5LCBpbnB1dDogQmFzZUdhbWVJbnB1dCA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKGlucHV0KTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lRGlyID0gZGlyO1xyXG4gICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9Jc1JpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIElucHV0KGlzUmlnaHQ6IGJvb2xlYW4pICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5HYW1lRGlyLk1vdmVTdGVwKGlzUmlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX0lzUmlnaHQgPSBpc1JpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fRGlydHkgJiYgdGhpcy5HYW1lRGlyLlBsYXllci5CYXNlQ3RybGVyLklzRmFsbGluZykgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVEaXIuTW92ZVN0ZXAodGhpcy5fSXNSaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQ2xlYXIoKSAge1xyXG4gICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi9HYW1lTW9kdWxlXCI7XHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG52YXIgVlNwYWNlOiBudW1iZXI7XHJcbnZhciBEU3BhY2U6IG51bWJlcjtcclxuLyoq5L2c6ICFOk1vXHJcbirlnLrmma/lhoXlr7nosaEgXHJcbiovXHJcbi8v566h55CG5LiA5pW06KGMXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdW50TGluZSBleHRlbmRzIExheWEuU3ByaXRlM0Qge1xyXG4gICAgcHJpdmF0ZSBtX1JpZ2h0U3dpdGNoOiBudW1iZXI7XHJcbiAgICBtX1N0ZXBMaXN0OiBTdGVwW107XHJcblxyXG4gICAgTGF5T3V0RGlydHk6IGJvb2xlYW47XHJcbiAgICBMaW5lSWR4OiBudW1iZXI7XHJcbiAgICBGbG9vck51bTogbnVtYmVyO1xyXG4gICAgU3RlcEl0ZW06IFN0ZXBJdGVtO1xyXG4gICAgT2RkU3dpdGNoOiBudW1iZXI7XHJcbiAgICBnZXQgcmlnaHRTd2l0Y2goKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1JpZ2h0U3dpdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0IFBvc2l0aW9uKG5ld1BTOiBMYXlhLlZlY3RvcjMpIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXQgUG9zaXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9TdGVwTGlzdC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IobGluZUlkeDogbnVtYmVyLCBDb2x1bWI6IG51bWJlciwgZmxvb3I6IG51bWJlciA9IDApIHtcclxuICAgICAgICBWU3BhY2UgPSBHYW1lTW9kdWxlLlZTcGFjZTtcclxuICAgICAgICBEU3BhY2UgPSBHYW1lTW9kdWxlLkRTcGFjZTtcclxuICAgICAgICB2YXIgY29sdW1uczogbnVtYmVyID0gQ29sdW1iO1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1JpZ2h0U3dpdGNoID0gMDtcclxuICAgICAgICB0aGlzLkxpbmVJZHggPSBsaW5lSWR4O1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB0aGlzLm1fU3RlcExpc3QgPSBbXTtcclxuICAgICAgICB2YXIgc3RhcnRYOm51bWJlciA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgU3RhcnRJZHg6IG51bWJlciA9IDA7IFN0YXJ0SWR4IDwgY29sdW1uczsgKytTdGFydElkeCkge1xyXG4gICAgICAgICAgICB2YXIgbmV3U3RlcDogU3RlcCA9IG5ldyBTdGVwKHRoaXMsIFN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChuZXdTdGVwKTtcclxuICAgICAgICAgICAgdGhpcy5tX1N0ZXBMaXN0W1N0YXJ0SWR4XSA9IG5ld1N0ZXA7XHJcbiAgICAgICAgICAgIHZhciBzdGVwVmVjdG9yID0gbmV3U3RlcC5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgc3RlcFZlY3Rvci54ID0gc3RhcnRYO1xyXG4gICAgICAgICAgICBzdGFydFggKz0gR2FtZU1vZHVsZS5IU3BhY2U7XHJcbiAgICAgICAgICAgIG5ld1N0ZXAudHJhbnNmb3JtLnBvc2l0aW9uID0gc3RlcFZlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7ojrflj5bmmL7npLrlh7rmnaXnmoTnrKzlh6DkuKrlubPlj7BcclxuICAgIEdldFN0ZXAoaWR4OiBudW1iZXIpOiBTdGVwIHtcclxuICAgICAgICBpZiAoaWR4IDwgMCB8fCBpZHggPj0gdGhpcy5tX1N0ZXBMaXN0Lmxlbmd0aClcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9TdGVwTGlzdFtpZHhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+572u5q+P5bGCXHJcbiAgICBTZXRMaW5lKGZsb29yOiBudW1iZXIsIHJpZ2h0U3dpdGNoOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fUmlnaHRTd2l0Y2ggPSByaWdodFN3aXRjaDtcclxuICAgICAgICB0aGlzLk9kZFN3aXRjaCA9IDA7XHJcbiAgICAgICAgdGhpcy5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkZsb29yTnVtID0gZmxvb3I7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgbmV3UFMueSA9IFZTcGFjZSAqIGZsb29yO1xyXG4gICAgICAgIG5ld1BTLnogPSAtRFNwYWNlICogZmxvb3I7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgICAgICBmb3IgKHZhciBzdGFydElkeDogbnVtYmVyID0gMDsgc3RhcnRJZHggPCB0aGlzLm1fU3RlcExpc3QubGVuZ3RoOyArK3N0YXJ0SWR4KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlTdGVwID0gdGhpcy5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgdGhpU3RlcC5SZXNldFN0ZXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/liKTmlq3mmK/lkKbmlLbnvKnnmoTpgqPlsYJcclxuICAgIEp1Z0lzT2RkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkZsb29yTnVtICUgMiAhPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5q+P5Liq6IqC54K56ZO+5o6l5Yiw5LiL5LiA5bGCXHJcbiAgICBTZXROZXh0Rmxvb3IobGFzdEZsb29yOiBNb3VudExpbmUpOiB2b2lkIHtcclxuICAgICAgICB2YXIgZGlzdGFuY2U6IG51bWJlciA9ICBNYXRoLmNlaWwobGFzdEZsb29yLnJpZ2h0U3dpdGNoLzIpIC0gTWF0aC5jZWlsKHRoaXMucmlnaHRTd2l0Y2gvMik7XHJcbiAgICAgICAgdmFyIG9kZFN3aXRjaDogbnVtYmVyID0gMDtcclxuICAgICAgICB2YXIgcG9zaXRpb246IExheWEuVmVjdG9yMyA9IGxhc3RGbG9vci5Qb3NpdGlvbjtcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGhpcy5KdWdJc09kZCgpKSB7XHJcbiAgICAgICAgICAgIG9kZFN3aXRjaCA9IC0xO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9kZFN3aXRjaCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBvc2l0aW9uLnggPSBNYXRoLmNlaWwobGFzdEZsb29yLnJpZ2h0U3dpdGNoLzIpICogR2FtZU1vZHVsZS5IU3BhY2UgKyBvZGRTd2l0Y2ggKiBHYW1lTW9kdWxlLkhTcGFjZSAvIDIgO1xyXG4gICAgICAgIGxhc3RGbG9vci5PZGRTd2l0Y2ggPSBvZGRTd2l0Y2hcclxuICAgICAgICBsYXN0Rmxvb3IuUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAvL+WIpOaWreaYr+WQpuacieS4pOWktOerr+eCuVxyXG4gICAgICAgIGZvciAodmFyIHN0YXJ0SWR4OiBudW1iZXIgPSAwOyBzdGFydElkeCA8IHRoaXMubV9TdGVwTGlzdC5sZW5ndGg7ICsrc3RhcnRJZHgpIHtcclxuICAgICAgICAgICAgdmFyIGxlZnRQYXJlbnQ6IFN0ZXAgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgcmlnaHRQYXJlbnQ6IFN0ZXAgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgbGVmdFBhcmVudElkeDogbnVtYmVyID0gc3RhcnRJZHggLSBkaXN0YW5jZSAtICgxICsgb2RkU3dpdGNoKTtcclxuXHJcbiAgICAgICAgICAgIGxlZnRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChsZWZ0UGFyZW50SWR4KTtcclxuICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChsZWZ0UGFyZW50SWR4ICsgMSk7XHJcbiAgICAgICAgICAgIHZhciB0aGlTdGVwID0gdGhpcy5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgdGhpU3RlcC5MZWZ0UGFyZW50ID0gbGVmdFBhcmVudDtcclxuICAgICAgICAgICAgbGVmdFBhcmVudCAmJiAobGVmdFBhcmVudC5SaWdodENoaWxkID0gdGhpU3RlcCk7XHJcbiAgICAgICAgICAgIHRoaVN0ZXAuUmlnaHRQYXJlbnQgPSByaWdodFBhcmVudDtcclxuICAgICAgICAgICAgcmlnaHRQYXJlbnQgJiYgKHJpZ2h0UGFyZW50LkxlZnRDaGlsZCA9IHRoaVN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aVsueijuS4gOWxglxyXG4gICAgQnJlYWsoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ29udGludWUoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIFBhdXNlKCkge1xyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgX1NldGVkOiBib29sZWFuO1xyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgUGxheWVyQ29udHJvbGVyIH0gZnJvbSBcIi4vUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IHsgQ2hhcmFjdGVyIH0gZnJvbSBcIi4vQ2hhcmFjdGVyXCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIlxyXG5pbXBvcnQgQ2hhcmFjdGVyTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvQ2hhcmFjdGVyTWFtYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vR2FtZU1vZHVsZVwiO1xyXG5pbXBvcnQgQ2hhcmFjdG9yQW5pbWF0b3IgZnJvbSBcIi4vQ2hhcmFjdGVyQW5pbWF0b3JcIjtcclxudmFyIG51bTogbnVtYmVyID0gMDtcclxuLy/or6XohJrmnKznlKjkuo7muLjmiI/njqnlrrblr7nosaHnrqHnkIZcclxuLy/njqnlrrblr7nosaFcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgTGF5YS5TcHJpdGUzRCB7XHJcbiAgICAvL+engeacieWxnuaAp1xyXG4gICAgcHJpdmF0ZSBtX0lkeDpudW1iZXI7XHJcbiAgICBtX0xvZ2ljUG9zaXRpb246IExheWEuVmVjdG9yMztcclxuICAgIHByaXZhdGUgX0J1ZmZOb2RlOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBtX1BsYXllck1vZGVsOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBfQ3VyU3RlcDogU3RlcDtcclxuICAgIHByaXZhdGUgX0N0cmxlcjogUGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXI7XHJcbiAgICBwcml2YXRlIG1fQW5pbWF0b3I6IExheWEuQW5pbWF0b3I7XHJcbiAgICBwcml2YXRlIG1fQnVmZk1vZGVsOiB7IFtuYW1lOiBudW1iZXJdOiBMYXlhLlNwcml0ZTNEIH1cclxuICAgIHByaXZhdGUgbV9TdGF0ZU1hcDoge31cclxuICAgIHByaXZhdGUgbV9QYXJlbnQ6TGF5YS5TcHJpdGUzRDtcclxuXHJcbiAgICBCYXNlQ3RybGVyOiBQbGF5ZXJDb250cm9sZXIuUGxheWVyTm9ybUN0cmxlcjtcclxuICAgIEJ1ZmZBcnI6IEFycmF5PEl0ZW0uQmFzZVBsYXllckJ1ZmY+O1xyXG4gICAgSWROdW1iZXI6IG51bWJlcjtcclxuICAgIHB1YmxpYyBQbGF5ZXJEZWF0aDogYm9vbGVhbjtcclxuXHJcbiAgICBzZXQgQ3VyU3RlcChzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgdGhpcy5fQ3VyU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyU3RlcCgpOiBTdGVwIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU3RlcDtcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbihuZXdQUzogTGF5YS5WZWN0b3IzKSB7XHJcbiAgICAgICAgdmFyIG5ld1BTOiBMYXlhLlZlY3RvcjMgPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMubV9QYXJlbnQudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTogTGF5YS5WZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BhcmVudC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2dpY1Bvc2l0aW9uKCk6IExheWEuVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgZ2V0IHBsYXllck1vZGVsKCk6IExheWEuU3ByaXRlM0QgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllck1vZGVsO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsID0ge307XHJcbiAgICAgICAgdGhpcy5tX1BhcmVudCA9IG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICAgICAgdGhpcy5tX1BhcmVudC5uYW1lID0gXCJQbGF5ZXJQYXJlbnRcIjtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLm1fUGFyZW50KTtcclxuICAgICAgICB0aGlzLm1fUGFyZW50LmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uID0gbmV3IExheWEuUXVhdGVybmlvbigpO1xyXG4gICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbiAgICAgICAgdGhpcy5tX1BhcmVudC5vbihMYXlhLkV2ZW50LlJFTU9WRUQsIHRoaXMsICgpID0+IHsgdGhpcy5kZXN0cm95KCkgfSlcclxuICAgICAgICB2YXIgbWdyOiBDaGFyYWN0ZXJNYW5hZ2VyID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3I7XHJcbiAgICAgICAgdGhpcy5tX0lkeCA9IG51bTtcclxuICAgICAgICArK251bVxyXG4gICAgfVxyXG4gICAgcHVibGljIFBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcih0aGlzLCB0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5zcGVlZCA9IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ29udGludWUoKSB7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5fVXBkYXRlKTtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3Iuc3BlZWQgPSAxO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtX0hlYWROb2RlOiBMYXlhLlNwcml0ZTNEO1xyXG5cclxuICAgIHByaXZhdGUgSW5pdEJVZmZNb2RlbChwbGF5ZXJNb2RlbDogTGF5YS5TcHJpdGUzRCkge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJNb2RlbCA9IHBsYXllck1vZGVsO1xyXG4gICAgICAgIHRoaXMubV9IZWFkTm9kZSA9IG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICAgICAgdmFyIEhlYWROb2RlOiBMYXlhLlNwcml0ZTNEID0gcGxheWVyTW9kZWwuZ2V0Q2hpbGRCeU5hbWUoXCJoZWFkXCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLm1fSGVhZE5vZGUpO1xyXG4gICAgICAgIHRoaXMubV9IZWFkTm9kZS50cmFuc2Zvcm0ucG9zaXRpb24gPSBIZWFkTm9kZS50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLm1fSGVhZE5vZGUudHJhbnNmb3JtLnJvdGF0aW9uID0gSGVhZE5vZGUudHJhbnNmb3JtLnJvdGF0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5tX0hlYWROb2RlLnRyYW5zZm9ybS5zY2FsZSA9IEhlYWROb2RlLnRyYW5zZm9ybS5zY2FsZS5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuU2V0TW9kZWwoXCJpdGVtX2ZseWVyXzAxXCIsIFwiUl9oYW5kXCIsIHBsYXllck1vZGVsLCBJdGVtLkl0ZW1UeXBlLkZseSk7XHJcbiAgICAgICAgdGhpcy5TZXRNb2RlbChcIml0ZW1fc2hpZWxkXzAxXCIsIFwiaGVhZFwiLCBwbGF5ZXJNb2RlbCwgSXRlbS5JdGVtVHlwZS5Qcm90ZWN0KTtcclxuICAgICAgICB0aGlzLlNldE1vZGVsKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiLCBcImhlYWRcIiwgcGxheWVyTW9kZWwsIEl0ZW0uSXRlbVR5cGUuSG9seVByb3RlY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0TW9kZWwocmVzb3VyY2VOYW1lOiBzdHJpbmcsIG5vZGVOYW1lOiBzdHJpbmcsIHBsYXllck1vZGVsOiBMYXlhLlNwcml0ZTNELCBpdGVtVHlwZTogSXRlbS5JdGVtVHlwZSkge1xyXG4gICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldExIKHJlc291cmNlTmFtZSkpO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6IExheWEuU3ByaXRlM0QgPSBtb2RlbC5jbG9uZSgpO1xyXG5cclxuICAgICAgICBwbGF5ZXJNb2RlbC5nZXRDaGlsZEF0KDApLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgc3dpdGNoIChub2RlTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVhZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0hlYWROb2RlLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9BbmltYXRvci5saW5rU3ByaXRlM0RUb0F2YXRhck5vZGUobm9kZU5hbWUsIGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1ZmZNb2RlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsW2l0ZW1UeXBlXSA9IGJ1ZmZNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRmFjZU1vZGVsVG8ocm90YXRpb246IExheWEuUXVhdGVybmlvbikge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJNb2RlbC50cmFuc2Zvcm0ucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBNb2RlbFJvdGF0ZUV1bGFyKHZlY3RvcjogTGF5YS5WZWN0b3IzKSAge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJNb2RlbC50cmFuc2Zvcm0ucm90YXRpb25FdWxlciA9IHZlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0UGxheWVyTW9kZWwobW9kZWw6IExheWEuU3ByaXRlM0QpIHtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKG1vZGVsKTtcclxuICAgICAgICB0aGlzLm1fUGFyZW50LnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygwLCAxODAsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvciA9IG1vZGVsLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIC8vbmV3IENoYXJhY3RvckFuaW1hdG9yKHRoaXMubV9BbmltYXRvcik7XHJcbiAgICAgICAgdmFyIGxheWVyOiBMYXlhLk1hcExheWVyID0gdGhpcy5tX0FuaW1hdG9yLmdldENvbnRyb2xsZXJMYXllcigpLl9zdGF0ZXNNYXA7XHJcbiAgICAgICAgdGhpcy5tX1N0YXRlTWFwID0ge307XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9TdGF0ZU1hcFtrZXldID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Jbml0QlVmZk1vZGVsKG1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBSZXNldCgpIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLl9CdWZmTm9kZSlcclxuICAgICAgICAgICAgdGhpcy5fQnVmZk5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX0J1ZmZOb2RlID0gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX0J1ZmZOb2RlKTtcclxuICAgICAgICB0aGlzLkJ1ZmZBcnIgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLkJhc2VDdHJsZXIgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllck5vcm1DdHJsZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyID0gdGhpcy5CYXNlQ3RybGVyO1xyXG4gICAgICAgIHRoaXMubV9Mb2dpY1Bvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygwLCAwKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLCB0aGlzLCB0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHZhciBkZWZhdWx0QW5pbVN0YXRlOiBMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLm1fQW5pbWF0b3IuZ2V0RGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgdmFyIHN0YXRlTmFtZTogc3RyaW5nID0gZGVmYXVsdEFuaW1TdGF0ZS5uYW1lO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KHN0YXRlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bnjqnlrrZCVUZGXHJcbiAgICAgKiBAcGFyYW0gaWR4IOanveS9jeajgOafpVxyXG4gICAgICogQHJldHVybnMg56m66KGo56S65rKh5pyJXHJcbiAgICAgKi9cclxuICAgIEdldEJ1ZmYoaWR4OiBudW1iZXIpOiBJdGVtLkJhc2VQbGF5ZXJCdWZmIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMuQnVmZkFycltpZHhdICE9IG51bGwgJiYgdGhpcy5CdWZmQXJyW2lkeF0gIT0gdW5kZWZpbmVkKSA/IHRoaXMuQnVmZkFycltpZHhdIDogbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoEJVRkZcclxuICAgICAqIEBwYXJhbSBidWZmIFxyXG4gICAgICovXHJcbiAgICBBZGRCdWZmKGJ1ZmY6IEl0ZW0uQmFzZVBsYXllckJ1ZmYpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgc2xvdDogbnVtYmVyID0gYnVmZi5TbG90O1xyXG4gICAgICAgIGlmICh0aGlzLkJ1ZmZBcnJbc2xvdF0pIHtcclxuICAgICAgICAgICAgdGhpcy5Db21wbGV0ZUJ1ZmYoc2xvdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYnVmZk1vZGVsOiBMYXlhLlNwcml0ZTNEID0gdGhpcy5tX0J1ZmZNb2RlbFtidWZmLlR5cGVdO1xyXG4gICAgICAgIGlmIChidWZmTW9kZWwpIHtcclxuICAgICAgICAgICAgYnVmZk1vZGVsLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkJ1ZmZBcnJbc2xvdF0gPSBidWZmO1xyXG4gICAgICAgIGJ1ZmYuU3RhcnQoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOe7k+adn0JVRkZcclxuICAgICAqL1xyXG4gICAgQ29tcGxldGVCdWZmKHNsb3Q6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBidWZmOiBJdGVtLkJhc2VQbGF5ZXJCdWZmID0gdGhpcy5CdWZmQXJyW3Nsb3RdO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6IExheWEuU3ByaXRlM0QgPSB0aGlzLm1fQnVmZk1vZGVsW2J1ZmYuVHlwZV07XHJcbiAgICAgICAgaWYgKGJ1ZmZNb2RlbCkgYnVmZk1vZGVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQnVmZkFycltzbG90XSA9IG51bGw7XHJcbiAgICAgICAgaWYgKGJ1ZmYgPT0gbnVsbCB8fCBidWZmID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ1ZmYuUmVtb3ZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pGG5pS+6KeS6ImyXHJcbiAgICBTZXRTdGVwKHB1dFN0ZXA6IFN0ZXApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBwdXRTdGVwO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHB1dFN0ZXAuUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBuZXdQUy55ICs9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlN0ZXBMZW5ndGg7XHJcbiAgICAgICAgdGhpcy5Qb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIHRoaXMubV9Mb2dpY1Bvc2l0aW9uID0gcHV0U3RlcC5Qb3NpdGlvbjtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLlN0YW5kKSk7XHJcbiAgICAgICAgdGhpcy5Ub3VjaEdyb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcC5TdGFuZE9uR3JvdW5kKHRoaXMpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluIPlsYDlvZPliY3lsYLkvYbkuI3np7vliqhcclxuICAgICAqIEBwYXJhbSB7U3RlcH0gc3RlcCDkuIvkuIDmraXlj7DpmLZcclxuICAgICAqL1xyXG4gICAgTGF5U3RlcChzdGVwOiBTdGVwKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gc3RlcDtcclxuICAgICAgICB0aGlzLm1fTG9naWNQb3NpdGlvbiA9IHN0ZXAuUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgU3RhcnRNb3ZlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uSnVtcCkpO1xyXG4gICAgICAgIHRoaXMuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBKdW1wRG93bigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkp1bXBkb3duKSk7XHJcbiAgICB9XHJcblxyXG4gICAgRmx5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uRmx5KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/op6blj5Hlj7DpmLZcclxuICAgIFRvdWNoR3JvdW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckRlYXRoIHx8ICF0aGlzLkN1clN0ZXApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5JdGVtVHlwZSA9PSBJdGVtLkl0ZW1UeXBlLk5vbmUpICYmICh0aGlzLkN1clN0ZXAuSXNFbXB0eSB8fCAodGhpcy5DdXJTdGVwLkxlZnRQYXJlbnQgJiYgdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50ICYmIHRoaXMuQ3VyU3RlcC5MZWZ0UGFyZW50LlN0ZXBJdGVtLklzRm9yYmlkZW4gJiYgdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50LlN0ZXBJdGVtLklzRm9yYmlkZW4pKSkge1xyXG4gICAgICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoKTtcclxuICAgICAgICAgICAgdmFyIGNsaXBOYW1lOiBzdHJpbmcgPSBDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkZhbGwpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX1N0YXRlTWFwW2NsaXBOYW1lXSlcclxuICAgICAgICAgICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KGNsaXBOYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkN1clN0ZXAuVG91Y2hHcm91bmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vliqhcclxuICAgICAqIEBwYXJhbSB7TGF5YS5WZWN0b3IzfSB2ZWN0b3Ig56e75Yqo5ZCR6YeP5YC8XHJcbiAgICAgKi9cclxuICAgIFRyYW5zbGF0ZSh2ZWN0b3I6IExheWEuVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9QYXJlbnQudHJhbnNmb3JtLnRyYW5zbGF0ZSh2ZWN0b3IsIGZhbHNlKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMubV9Mb2dpY1Bvc2l0aW9uLCB2ZWN0b3IsIHRoaXMubV9Mb2dpY1Bvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOeOqeWutuaOp+WItuWZqFxyXG4gICAgICogQHBhcmFtIG5ld0N0cmxlciDmlrDnjqnlrrbmjqfliLblmahcclxuICAgICAqL1xyXG4gICAgQWRkQ3RybGVyKG5ld0N0cmxlcjogUGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fQ3RybGVyKVxyXG4gICAgICAgICAgICB0aGlzLl9DdHJsZXIuT25Db21wbGV0ZSgpO1xyXG4gICAgICAgIHZhciBjdHJsZXI6IFBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyID0gdGhpcy5fQ3RybGVyO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IG5ld0N0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuTmV4dEN0cmwgPSBjdHJsZXI7XHJcbiAgICAgICAgbmV3Q3RybGVyLlNldFBsYXllcih0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5fQ3RybGVyKVxyXG4gICAgICAgICAgICB0aGlzLl9DdHJsZXIuT25TdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75Lqk5o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIFBvcEN0cmxlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fQ3RybGVyKVxyXG4gICAgICAgICAgICB0aGlzLl9DdHJsZXIuT25Db21wbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IHRoaXMuX0N0cmxlci5OZXh0Q3RybDtcclxuICAgICAgICBpZiAodGhpcy5fQ3RybGVyKVxyXG4gICAgICAgICAgICB0aGlzLl9DdHJsZXIuT25TdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyRGVhdGgpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9DdHJsZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgZm9yICh2YXIgYnVmZklkeDogbnVtYmVyID0gMDsgYnVmZklkeCA8IDI7ICsrYnVmZklkeCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5CdWZmQXJyW2J1ZmZJZHhdICE9IG51bGwgfHwgdGhpcy5CdWZmQXJyW2J1ZmZJZHhdICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMuQnVmZkFycltidWZmSWR4XS5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgRmx5UHJlcGFyZSgpIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIFJlc2V0UGFyZW5ldCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX1BhcmVudC5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHRoaXMubV9QYXJlbnQudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0ZXBEYXRhIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgICBHZXREYXRhKHN0ZXA6IFN0ZXApIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi9HYW1lU3RydWN0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vR2FtZU1vZHVsZVwiO1xyXG5leHBvcnQgbW9kdWxlIFBsYXllckNvbnRyb2xlciB7XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBsYXllckN0cmxlciB7XHJcbiAgICAgICAgLy/lhazlhbHmjqXlj6NcclxuICAgICAgICBOZXh0Q3RybDogQmFzZVBsYXllckN0cmxlcjtcclxuICAgICAgICBwbGF5ZXI6IFBsYXllcjtcclxuXHJcbiAgICAgICAgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjogUGxheWVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocGxheWVyOiBQbGF5ZXIsIGN0cmxlcjogQmFzZVBsYXllckN0cmxlciA9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGN0cmxlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTmV4dEN0cmwgPSBjdHJsZXI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX1VwZGF0ZSgpOiB2b2lkO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBPblN0YXJ0KCk6IHZvaWQ7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IE9uQ29tcGxldGUoKTogdm9pZDtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUqOS6juinkuiJsuato+W4uOeKtuaAgeS4i+eahOenu+WKqFxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllck5vcm1DdHJsZXIgZXh0ZW5kcyBCYXNlUGxheWVyQ3RybGVyIHtcclxuICAgICAgICBwcml2YXRlIG1fU3RhcnRQUzogTGF5YS5WZWN0b3IzO1xyXG4gICAgICAgIHByaXZhdGUgbV9UYXJnZXRQUzogTGF5YS5WZWN0b3IzO1xyXG4gICAgICAgIHByaXZhdGUgZ2V0IE1pZGRsZVBTKCk6IExheWEuVmVjdG9yMyB7XHJcbiAgICAgICAgICAgIHZhciBtaWRsZVBTOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5sZXJwKHRoaXMubV9TdGFydFBTLCB0aGlzLm1fVGFyZ2V0UFMsIDAuNSwgbWlkbGVQUyk7XHJcbiAgICAgICAgICAgIG1pZGxlUFMueSArPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICByZXR1cm4gbWlkbGVQUztcclxuICAgICAgICB9XHJcbiAgICAgICAgSXNGYWxsaW5nOiBib29sZWFuO1xyXG4gICAgICAgIFRpbWU6IG51bWJlcjtcclxuICAgICAgICBnZXQgTGFzdFRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RUaW1lOiBudW1iZXIgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5QbGF5ZXJNb3ZlVGltZSAtICh0aGlzLlRpbWUgLSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKuW3sua2iOiAl+aXtumXtOeZvuWIhuavlCAqL1xyXG4gICAgICAgIGdldCBUaW1lUGVyY2VudCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5MYXN0VGltZSAvIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocGxheWVyOiBQbGF5ZXIgPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHBsYXllcilcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuSXNGYWxsaW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9uU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPbkNvbXBsZXRlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFN0YXJ0TW92ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuUmVzZXRQYXJlbmV0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1fU3RhcnRQUyA9IHRoaXMucGxheWVyLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm1fVGFyZ2V0UFMgPSB0aGlzLnBsYXllci5DdXJTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm1fVGFyZ2V0UFMueSArPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgcm90YXRpb246IExheWEuUXVhdGVybmlvbiA9IG5ldyBMYXlhLlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgdmFyIGxvb2tUb1BTID0gdGhpcy5tX1RhcmdldFBTLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGxvb2tUb1BTLnkgPSB0aGlzLm1fU3RhcnRQUy55O1xyXG4gICAgICAgICAgICBsb29rVG9QUy56ID0gLWxvb2tUb1BTLnpcclxuICAgICAgICAgICAgdmFyIHVwRGlyOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIHVwRGlyLnkgPSAxO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRQUzogTGF5YS5WZWN0b3IzID0gdGhpcy5tX1N0YXJ0UFMuY2xvbmUoKTtcclxuICAgICAgICAgICAgc3RhcnRQUy56ID0gLXN0YXJ0UFMuejtcclxuICAgICAgICAgICAgTGF5YS5RdWF0ZXJuaW9uLmxvb2tBdChzdGFydFBTLCBsb29rVG9QUywgdXBEaXIsIHJvdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuRmFjZU1vZGVsVG8ocm90YXRpb24pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPD0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuU2V0U3RlcCh0aGlzLnBsYXllci5DdXJTdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RUaW1lOiBudW1iZXIgPSB0aGlzLkxhc3RUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYXRlOiBudW1iZXIgPSB0aGlzLlRpbWVQZXJjZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlVGltZVJhdGU6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZhbGxUaW1lUG9pbnQ6IG51bWJlciA9IDAuNDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRQUzogTGF5YS5WZWN0b3IzO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXRQUzogTGF5YS5WZWN0b3IzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYXRlID4gZmFsbFRpbWVQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNGYWxsaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5KdW1wRG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVGltZVJhdGUgPSAocmF0ZSAtIGZhbGxUaW1lUG9pbnQpIC8gKDEgLSBmYWxsVGltZVBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UFMgPSB0aGlzLm1fVGFyZ2V0UFM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UFMgPSB0aGlzLk1pZGRsZVBTO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVUaW1lUmF0ZSA9IHJhdGUgLyBmYWxsVGltZVBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQUyA9IHRoaXMuTWlkZGxlUFM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UFMgPSB0aGlzLm1fU3RhcnRQUztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLlBsYXllckRlYXRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICAgICAgICAgIExheWEuVmVjdG9yMy5sZXJwKHN0YXJ0UFMsIHRhcmdldFBTLCBtb3ZlVGltZVJhdGUsIG5ld1BzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5Qb3NpdGlvbiA9IG5ld1BzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+eOqeWutumjnuihjFxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckZseSBleHRlbmRzIEJhc2VQbGF5ZXJDdHJsZXIge1xyXG4gICAgICAgIFNwZWVkOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u546p5a62XHJcbiAgICAgICAgICogQHBhcmFtIHBsYXllciDmk43mjqfop5LoibJcclxuICAgICAgICAgKi9cclxuICAgICAgICBTZXRQbGF5ZXIocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgc3VwZXIuU2V0UGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIHZhciBzdGVwUFM6IExheWEuVmVjdG9yMyA9IHBsYXllci5DdXJTdGVwLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICBzdGVwUFMueSArPSBHYW1lTW9kdWxlLlZTcGFjZTtcclxuICAgICAgICAgICAgLy9wbGF5ZXIuVHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgR2FtZU1vZHVsZS5WU3BhY2UsIDApKTtcclxuICAgICAgICAgICAgcGxheWVyLlBvc2l0aW9uID0gc3RlcFBTO1xyXG4gICAgICAgICAgICBwbGF5ZXIudHJhbnNmb3JtLnJvdGF0aW9uRXVsZXIgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCk7XHJcbiAgICAgICAgICAgIHBsYXllci5Nb2RlbFJvdGF0ZUV1bGFyKG5ldyBMYXlhLlZlY3RvcjMoMCwgMTgwLCAwKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbFo6IG51bWJlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmVjdG9yOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIEdhbWVNb2R1bGUuVlNwYWNlLCAtR2FtZU1vZHVsZS5EU3BhY2UpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUodmVjdG9yLCAwLjA2LCB2ZWN0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5UcmFuc2xhdGUodmVjdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBPbkNvbXBsZXRlKCk6IHZvaWQgeyB9XHJcbiAgICAgICAgcHVibGljIE9uU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vTW91bnRMaW5lXCJcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgQ2hhcmFjdG9yQW5pbWF0b3IgZnJvbSBcIi4vQ2hhcmFjdGVyQW5pbWF0b3JcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxudHlwZSBTdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW07XHJcbnR5cGUgTUxvY2F0aW9uID0gR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbi8v5q2lXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXAgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEIHtcclxuICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJBbmltYXRvcjogU3RlcEFuaW1hdG9yO1xyXG4gICAgLy/mqKHlnovkuKrmlbBcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RlcE1vZGVsTnVtOiBudW1iZXIgPSAzO1xyXG4gICAgcHJpdmF0ZSBtX1N0YW5kUG9pbnQ6IExheWEuU3ByaXRlM0Q7XHJcbiAgICBwcml2YXRlIF9Jc0RlYWRSb2FkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBtX1N0ZXBNb2RlbDogTGF5YS5TcHJpdGUzRDtcclxuXHJcbiAgICBMZWZ0UGFyZW50OiBTdGVwO1xyXG4gICAgUmlnaHRQYXJlbnQ6IFN0ZXA7XHJcbiAgICBMZWZ0Q2hpbGQ6IFN0ZXA7XHJcbiAgICBSaWdodENoaWxkOiBTdGVwO1xyXG4gICAgU3RlcEl0ZW06IFN0ZXBJdGVtO1xyXG4gICAgUm9hZE51bTogbnVtYmVyO1xyXG4gICAgTWFyazogYW55O1xyXG4gICAgRmxvb3I6IE1vdW50TGluZTtcclxuICAgIElkeDogbnVtYmVyO1xyXG4gICAgbG9ja2VkOkJvb2xlYW47XHJcbiAgICAvL+WFrOacieaOpeWPo1xyXG4gICAgc2V0IFBvc2l0aW9uKG5ld1BTOiBMYXlhLlZlY3RvcjMpIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9jYXRpb24oKTogTUxvY2F0aW9uIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKHRoaXMuSWR4LCB0aGlzLkZsb29yLkZsb29yTnVtKTtcclxuICAgIH1cclxuICAgIGdldCBJc0RlYWRSb2FkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Jc0RlYWRSb2FkIHx8ICF0aGlzLmFjdGl2ZSB8fCB0aGlzLlN0ZXBJdGVtLklzRGlmZmljdWx0eTtcclxuICAgIH1cclxuICAgIHNldCBJc0RlYWRSb2FkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRm9yYmlkZW4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU3RlcEl0ZW0uSXNGb3JiaWRlbjtcclxuICAgIH1cclxuICAgIGdldCBJc0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhKHRoaXMuYWN0aXZlICYmIHRoaXMuRmxvb3IuYWN0aXZlKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoZmxvb3I6IE1vdW50TGluZSwgaWR4OiBudW1iZXIpIHtcclxuICAgICAgICAvL3N1cGVyKG5ldyBMYXlhLkJveE1lc2goMSwxLDEpICk7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5JZHggIT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxICsgTWF0aC5yYW5kb20oKSAqIFN0ZXAuc3RlcE1vZGVsTnVtKTtcclxuICAgICAgICAgICAgLy92YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wXCIgKyBJZHgpXHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiTDAxX3Nwcl9wbGF0XzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoIExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC41LCAwLjUsIDAuNSkpIDsvL2xvYWRlci5nZXRSZXMobmFtZSk7XHJcbiAgICAgICAgdmFyIGNsb25lTW9kZWw6IExheWEuU3ByaXRlM0QgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJBbmltYXRvciA9IG5ldyBTdGVwQW5pbWF0b3IoY2xvbmVNb2RlbC5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvciksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJBbmltYXRvci5Jbml0KCk7XHJcbiAgICAgICAgY2xvbmVNb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5tX1N0ZXBNb2RlbCA9IGNsb25lTW9kZWw7XHJcblxyXG4gICAgICAgIHZhciBzdGFuZFBvaW50OiBMYXlhLlNwcml0ZTNEID0gbmV3IExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgdGhpcy5tX1N0ZXBNb2RlbC5nZXRDaGlsZEF0KDApLmFkZENoaWxkKHN0YW5kUG9pbnQpO1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJBbmltYXRvci5saW5rU3ByaXRlM0RUb0F2YXRhck5vZGUoXCJQbGF5ZXJGb290UG9pbnRcIiwgc3RhbmRQb2ludCk7XHJcbiAgICAgICAgdGhpcy5tX1N0YW5kUG9pbnQgPSBzdGFuZFBvaW50O1xyXG4gICAgICAgIHN0YW5kUG9pbnQudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG5cclxuICAgICAgICB0aGlzLmFkZENoaWxkKGNsb25lTW9kZWwpO1xyXG5cclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtID0gSXRlbS5TdGVwSXRlbUZhY3RvcnkoSXRlbS5JdGVtVHlwZS5Ob25lLCB0aGlzKTtcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlJlc2V0SXRlbSgpO1xyXG4gICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICB0aGlzLklkeCA9IGlkeDtcclxuXHJcbiAgICAgICAgdGhpcy5MZWZ0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0UGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxlZnRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodENoaWxkID0gbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9hZE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy5sb2NrZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIFB1dEl0ZW0oaXRlbUVudW1lOiBJdGVtLkl0ZW1UeXBlKSB7XHJcbiAgICAgICAgaWYgKGl0ZW1FbnVtZSA9PSBJdGVtLkl0ZW1UeXBlLkVtcHR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUHV0SXRlbShpdGVtRW51bWUpO1xyXG4gICAgfVxyXG4gICAgUmVzZXRTdGVwKG5ld1BzOiBMYXlhLlZlY3RvcjMgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKG5ld1BzKVxyXG4gICAgICAgICAgICB0aGlzLlBvc2l0aW9uID0gbmV3UHM7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5QdXRJdGVtKEl0ZW0uSXRlbVR5cGUuTm9uZSk7XHJcblxyXG4gICAgICAgIHRoaXMuTGVmdFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9hZE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3RlckFuaW1hdG9yLlBsYXkoXCJpZGVsXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFRvdWNoR3JvdW5kKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5Ub3VjaEl0ZW0ocGxheWVyKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTdGFuZE9uR3JvdW5kKHBsYXllciA9IG51bGwpIHtcclxuICAgICAgICBpZiAocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdTcHJpdGU6IExheWEuU3ByaXRlM0QgPSB0aGlzLm1fU3RhbmRQb2ludDtcclxuICAgICAgICAgICAgbmV3U3ByaXRlLmFkZENoaWxkKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJBbmltYXRvci5QbGF5KFwiaWRlbFwiKVxyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJBbmltYXRvci5QbGF5KFwiZmFsbFwiKVxyXG4gICAgfVxyXG4gICAgcHVibGljIFB1dEluSXRlbShzcHJpdGUzRDogTGF5YS5TcHJpdGUzRCkge1xyXG4gICAgICAgIHRoaXMubV9TdGFuZFBvaW50LmFkZENoaWxkKHNwcml0ZTNEKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBCcmVhaygpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3RlckFuaW1hdG9yLlBsYXkoXCJmYWxsRG93blwiKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RlcEFuaW1hdG9yIGV4dGVuZHMgQ2hhcmFjdG9yQW5pbWF0b3Ige1xyXG4gICAgbV9TdGVwOiBTdGVwO1xyXG4gICAgY29uc3RydWN0b3IoYW5pbWF0b3I6IExheWEuQW5pbWF0b3IsIHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICBzdXBlcihhbmltYXRvcik7XHJcbiAgICAgICAgdGhpcy5tX1N0ZXAgPSBzdGVwO1xyXG4gICAgfVxyXG4gICAgSW5pdCgpIHtcclxuICAgICAgICB2YXIgc3RhdGU6IExheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMuR2V0U3RhdGUoXCJmYWxsXCIpXHJcbiAgICAgICAgdmFyIHNjcmlwdDogTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0ID0gc3RhdGUuYWRkU2NyaXB0KExheWEuQW5pbWF0b3JTdGF0ZVNjcmlwdCk7XHJcbiAgICAgICAgdmFyIHN0ZXBBbmltYXRvciA9IHRoaXM7XHJcbiAgICAgICAgc2NyaXB0Lm9uU3RhdGVFeGl0ID0gKCkgPT4geyBzdGVwQW5pbWF0b3IuUGxheShcImlkbGVcIikgfTtcclxuXHJcbiAgICAgICAgdmFyIGZhbGxEb3duU3RhdGU6IExheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMuR2V0U3RhdGUoXCJmYWxsRG93blwiKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgZmFsbERvd25TY3JpcHQ6RmFsbERvd25TY3JpcHQgPSBmYWxsRG93blN0YXRlLmFkZFNjcmlwdChGYWxsRG93blNjcmlwdCkgYXMgRmFsbERvd25TY3JpcHQ7XHJcbiAgICAgICAgZmFsbERvd25TY3JpcHQuSW5pdCh0aGlzLm1fU3RlcCx0aGlzLm1fQW5pYW10b3IpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRmFsbERvd25TY3JpcHQgZXh0ZW5kcyBMYXlhLkFuaW1hdG9yU3RhdGVTY3JpcHQge1xyXG4gICAgbV9TdGVwOiBTdGVwO1xyXG4gICAgbV9TcGVlZDogbnVtYmVyO1xyXG4gICAgbV9UaW1lQ291bnQ6bnVtYmVyO1xyXG4gICAgbV9Db3VudGludWVUaW1lOm51bWJlcjtcclxuICAgIG1fQW5pbWF0b3I6TGF5YS5BbmltYXRvcjtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1NwZWVkID0gMDtcclxuICAgICAgICB0aGlzLm1fQ291bnRpbnVlVGltZSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEluaXQoc3RlcDogU3RlcCxhbmltYXRvcjpMYXlhLkFuaW1hdG9yKSB7XHJcbiAgICAgICAgdGhpcy5tX1N0ZXAgPSBzdGVwO1xyXG4gICAgICAgIHRoaXMubV9TcGVlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX1RpbWVDb3VudCA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZTtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBhbmltYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdGF0ZUVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9TdGVwLmxvY2tlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU3RhdGVFeGl0KCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdGF0ZVVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbGFzdEZyYW1lVGltZSA9IHRoaXMubV9Db3VudGludWVUaW1lIC0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lO1xyXG4gICAgICAgIGlmKGxhc3RGcmFtZVRpbWU8MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KFwiaWRsZVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICog5L2c6ICFOk1vXHJcbiAqIOWQr+WKqOWcuuaZr1xyXG4gKi9cclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IExvYWRTY2VuZSBmcm9tIFwiLi9TY2VuZS9Mb2FkU2NlbmVcIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5pbXBvcnQgQVBQIGZyb20gXCIuL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZUNvbmZpZyBmcm9tIFwiLi9HYW1lQ29uZmlnXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuL0ZyYW1lV29yay9VSU1hbmFnZXJcIjtcclxuY2xhc3MgR2FtZVxyXG57XHJcblx0X0ZyYW1lOkZyYW1lV29yaztcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB2YXIgc3MgPSBBUFA7XHJcbiAgICAgICAgTGF5YTNELmluaXQoNzUwLDEzMzQpO1xyXG4gICAgICAgIEdhbWVDb25maWcuaW5pdCgpO1xyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZVTEw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBMYXlhLlN0YWdlLlNDQUxFX0ZJWEVEX1dJRFRIO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NyZWVuTW9kZSA9IExheWEuU3RhZ2UuU0NSRUVOX1ZFUlRJQ0FMO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWxpZ25WID0gTGF5YS5TdGFnZS5BTElHTl9CT1RUT007XHJcbiAgICAgICAgLy/lvIDlkK/nu5/orqHkv6Hmga9cclxuXHRcdExheWEuU3RhdC5zaG93KCk7ICAgXHJcbiAgICAgICAgdmFyIHJlc0NvbCA9IFt7dXJsOlwidWkvUmVzb3VyY2UvbG9jYWxjb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU30se3VybDpcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfV07XHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZChyZXNDb2wsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub24zRExvYWRlZCkpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbjNETG9hZGVkKClcclxuICAgIHtcclxuICAgICAgICB2YXIgYXJyM0QgPSBbXCJ1aS9SZXNvdXJjZS9MYXlhU2NlbmVfTWFpblNjZW5lL0NvbnZlbnRpb25hbC9NYWluU2NlbmUubHNcIl07XHJcbiAgICAgICAgLy92YXIgYXJyM0QgPSBbXCJ1aS9SZXNvdXJjZS9MYXlhU2NlbmVfU2FtcGxlU2NlbmUvQ29udmVudGlvbmFsL1NhbXBsZVNjZW5lLmxoXCJdO1xyXG4gICAgICAgIExheWEubG9hZGVyLmNyZWF0ZShhcnIzRCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLG51bGwsbnVsbCxmYWxzZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZGVkKClcclxuICAgIHtcclxuICAgICAgICBBUFAuSW5pdCgpO1xyXG4gICAgICAgIHZhciBzY2VuZU1ncjpTY2VuZU1hbmFnZXIgPSBBUFAuU2NlbmVNYW5hZ2VyO1xyXG4gICAgICAgIHNjZW5lTWdyLkNoYW5nZVNjZW5lKG5ldyBMb2FkU2NlbmUoKSk7XHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuVXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoIClcclxuICAgIHtcclxuICAgICAgICBBUFAuRnJhbWVXb3JrLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcbnZhciBHTSA9IG5ldyBHYW1lKCk7XHJcbiIsImltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi4vVXRpbGl0eS9QYXRoXCI7XHJcbmltcG9ydCBDaGFyYWN0ZXJNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJVSVNjZW5lIGV4dGVuZHMgTGF5YS5TY2VuZTNEe1xyXG5cclxuICAgIHB1YmxpYyBhcnJheURpczpMYXlhLlNwcml0ZTNEW10gPSBbXTtcclxuICAgIHB1YmxpYyBjbnROdW0gPSA1O1xyXG4gICAgcHVibGljIHN0YXJ0YW8gPSA5MDtcclxuICAgIHB1YmxpYyBwZXJhbyA9IDM2MCAvIHRoaXMuY250TnVtO1xyXG4gICAgcHVibGljIHIgPSAwLjA0O1xyXG4gICAgcHVibGljIHN0YXJ0WSA9IC0wLjAyO1xyXG4gICAgcHVibGljIGNudFNlbGVjdEluZGV4ID0gMDtcclxuXHJcbiAgICBwdWJsaWMgY2FtZXJhOkxheWEuQ2FtZXJhO1xyXG4gICAgcHVibGljIGNudHN0YXJ0YW8gPSA5MDtcclxuICAgIHB1YmxpYyBtb3ZlU3RhcmFvID0gMjtcclxuICAgIHB1YmxpYyBuZXh0QW8gPSAtMTtcclxuICAgIHB1YmxpYyBpbml0U2NhbE51bSA9IDAuMDE4O1xyXG5cclxuICAgIHB1YmxpYyBtb3ZlQ2FsbEJhY2s7XHJcblxyXG4gICAgY29uc3RydWN0b3IoY250U2VsZWN0SW5kZXgsIG1vdmVDYWxsQmFjaykgeyBcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSBjbnRTZWxlY3RJbmRleDtcclxuICAgICAgICB0aGlzLm1vdmVDYWxsQmFjayA9IG1vdmVDYWxsQmFjaztcclxuICAgICAgICB0aGlzLmFtYmllbnRDb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgMSwgMSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSB0aGlzLmFkZENoaWxkKG5ldyBMYXlhLkNhbWVyYSgwLCAwLjEsIDAuMykpIGFzIExheWEuQ2FtZXJhO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS50cmFuc2xhdGUobmV3IExheWEuVmVjdG9yMygwLCAwLCAwLjIpKTtcclxuICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0ucm90YXRlKG5ldyBMYXlhLlZlY3RvcjMoIDAsIDAsIDApLCB0cnVlLCBmYWxzZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0TEgoXCJjMDAxX2NoaWxkXzAxXCIpKTtcclxuICAgICAgICAvLyB2YXIgbW9kZWwxOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDRcIikpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgaSA9IDAgO2kgPCB0aGlzLmNudE51bTtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJNb2RlbCA9ICBDaGFyYWN0ZXJNYW5hZ2VyLk1nci5HZXRDaGFyYWN0ZXJNb2RlbChpKTtcclxuICAgICAgICAgICAgdmFyIGF1ZHQ6TGF5YS5TcHJpdGUzRCA9IGNoYXJhY3Rlck1vZGVsO1xyXG4gICAgICAgICAgICBhdWR0LnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gbmV3IExheWEuVmVjdG9yMyh0aGlzLmluaXRTY2FsTnVtLCB0aGlzLmluaXRTY2FsTnVtLCB0aGlzLmluaXRTY2FsTnVtKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChhdWR0KTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheURpcy5wdXNoKGF1ZHQpO1xyXG5cclxuICAgICAgICAgICAgLy8gdmFyIGFvID0gKHRoaXMuc3RhcnRhbyArIGkgKiB0aGlzLnBlcmFvKSAlIDM2MFxyXG4gICAgICAgICAgICAvLyB2YXIgeCA9IHRoaXMuciAqIE1hdGguY29zKGFvICogMy4xNCAvIDE4MCk7XHJcbiAgICAgICAgICAgIC8vIHZhciB5ID0gdGhpcy5zdGFydFkgKyB0aGlzLnIgKiBNYXRoLnNpbihhbyAqIDMuMTQgLyAxODApO1xyXG4gICAgICAgICAgICAvLyBhdWR0LnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoeCwgeSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSAodGhpcy5jbnRTZWxlY3RJbmRleCArIDUpICUgNTtcclxuICAgICAgICB0aGlzLm5leHRBbyA9ICh0aGlzLnN0YXJ0YW8gKyAodGhpcy5jbnROdW0gLSB0aGlzLmNudFNlbGVjdEluZGV4KSAqIHRoaXMucGVyYW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0KCk7XHJcbiAgICAgfVxyXG5cclxuICAgIGNhbENudFN0YXJ0YW8oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9ICh0aGlzLmNudFNlbGVjdEluZGV4ICsgNSkgJSA1O1xyXG4gICAgICAgIHRoaXMubmV4dEFvID0gKHRoaXMuc3RhcnRhbyArICh0aGlzLmNudE51bSAtIHRoaXMuY250U2VsZWN0SW5kZXgpICogdGhpcy5wZXJhbyArIDM2MCkgJSAzNjA7XHJcblxyXG4gICAgICAgIGlmKCh0aGlzLm5leHRBbyAtIHRoaXMuY250c3RhcnRhbyArIDM2MCkgJSAzNjAgPj0gMTgwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVN0YXJhbyA9IC0yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVN0YXJhbyA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEudGltZXIubG9vcCgwLjA1LCB0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGltZUFvQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY250c3RhcnRhbyA9PSB0aGlzLm5leHRBbykge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSB0aGlzLm5leHRBbztcclxuICAgICAgICAgICAgdGhpcy5uZXh0QW8gPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQ2FsbEJhY2sgJiYgdGhpcy5tb3ZlQ2FsbEJhY2soMSk7XHJcbiAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcywgdGhpcy50aW1lQW9DaGFuZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsYXNjbnRBbyA9IHRoaXMuY250c3RhcnRhbztcclxuICAgICAgICB0aGlzLmNudHN0YXJ0YW8gKz0gdGhpcy5tb3ZlU3RhcmFvO1xyXG4gICAgICAgIGlmKHRoaXMuY250c3RhcnRhbyA8IDAgfHwgdGhpcy5jbnRzdGFydGFvID09IDM2MCkge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSAodGhpcy5jbnRzdGFydGFvICsgMzYwKSAlIDM2MDtcclxuICAgICAgICAgICAgbGFzY250QW8gPSB0aGlzLmNudHN0YXJ0YW8gLSB0aGlzLm1vdmVTdGFyYW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9ICh0aGlzLmNudHN0YXJ0YW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZigobGFzY250QW8gPj0gdGhpcy5uZXh0QW8gJiYgdGhpcy5jbnRzdGFydGFvIDw9IHRoaXMubmV4dEFvKSB8fCAobGFzY250QW8gPD0gdGhpcy5uZXh0QW8gJiYgdGhpcy5jbnRzdGFydGFvID49IHRoaXMubmV4dEFvKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSB0aGlzLm5leHRBbztcclxuICAgICAgICAgICAgdGhpcy5uZXh0QW8gPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5uZXh0QW8gPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQ2FsbEJhY2sgJiYgdGhpcy5tb3ZlQ2FsbEJhY2soMSk7XHJcbiAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcywgdGhpcy50aW1lQW9DaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGVjdCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCB0aGlzLmFycmF5RGlzLmxlbmd0aDtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBhbyA9ICh0aGlzLmNudHN0YXJ0YW8gKyBpICogdGhpcy5wZXJhbykgJSAzNjBcclxuICAgICAgICAgICAgdmFyIHggPSB0aGlzLnIgKiBNYXRoLmNvcyhhbyAqIDMuMTQgLyAxODApO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHRoaXMuc3RhcnRZICsgdGhpcy5yICogTWF0aC5zaW4oYW8gKiAzLjE0IC8gMTgwKTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKHgsIHksIDApO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjYWxlID0gMC4yICogeTtcclxuICAgICAgICAgICAgaWYoc2NhbGUgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjModGhpcy5pbml0U2NhbE51bSArIHNjYWxlLCB0aGlzLmluaXRTY2FsTnVtICsgc2NhbGUsIHRoaXMuaW5pdFNjYWxOdW0gKyBzY2FsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbaV0udHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKHRoaXMuaW5pdFNjYWxOdW0sIHRoaXMuaW5pdFNjYWxOdW0sIHRoaXMuaW5pdFNjYWxOdW0pO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmVDYWxsQmFjayAmJiB0aGlzLm1vdmVDYWxsQmFjaygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGVhclJvYXRlVGltZXIoKTogdm9pZCB7XHJcbiAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGFzdFJvbGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCAtLTtcclxuICAgICAgICB0aGlzLmNhbENudFN0YXJ0YW8oKTtcclxuICAgIH0gICBcclxuXHJcbiAgICBuZXh0Um9sZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ICsrO1xyXG4gICAgICAgIHRoaXMuY2FsQ250U3RhcnRhbygpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGVjdEluZGV4KHNlbGVjdEluZGV4Om51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmKHNlbGVjdEluZGV4ID09IHRoaXMuY250U2VsZWN0SW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gc2VsZWN0SW5kZXg7XHJcbiAgICAgICAgdGhpcy5jYWxDbnRTdGFydGFvKCk7XHJcbiAgICB9IFxyXG5cclxuICAgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NjZW5lfSBmcm9tIFwiLi9TY2VuZVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHYW1lU2NlbmVQbGF5IGZyb20gXCIuL1NjZW5lUGxheS9HYW1lU2NlbmVQbGF5XCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lRGlyZWN0b3IgZXh0ZW5kcyBTY2VuZS5CYXNlRGlyZWN0b3Ige1xyXG4gICAgcHVibGljIGdldCBHYW1lUGxheSgpOkdhbWVTY2VuZVBsYXlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTdGF0ZSBhcyBHYW1lU2NlbmVQbGF5O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxvYWRMaXN0MkQgPSBbcGF0aC5HZXREZXBhdGhVSUpTKFwiUGxheWVyTGlzdFwiKSxwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpLHBhdGguR2V0RGVwYXRoVUlKUyhcIkVuZEdhbWVcIildO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlU3RhdGUobmV3IFNjZW5lLkxvYWRTY2VuZUxvZ2ljKGxvYWRMaXN0MkQsbnVsbCxuZXcgR2FtZVNjZW5lUGxheSgpKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsIi8qXHJcbuS9nOiAhTpNb1xyXG7ot7PlsbHnvorlnLrmma/moLjlv4Plip/og71cclxuKi9cclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW50ZXJHYW1lVUlcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7SW5wdXR9IGZyb20gXCIuLy4uL0dhbWUvSW5wdXRcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi8uLi91aS9HYW1lVUlcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbnR5cGUgSXRlbUxheW91dCA9IEl0ZW0uSXRlbUxheW91dDtcclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuLy/muLjmiI/lnLrmma9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lXHJcbntcclxuICAgIE1vZGVsTG9hZDpib29sZWFuO1xyXG4gICAgR2FtZURpcjpHYW1lRGlyZWN0b3I7XHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpHYW1lRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdhbWVEaXJlY3RvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fU2NlbmVPYmogPSBuZXcgTGF5YS5TY2VuZTNEO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW50ZXJHYW1lVUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0FQUFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VpZGVyTWFuYWdlciBcclxue1xyXG4vL+WvueWkluaOpeWPo1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjpHdWlkZXJNYW5hZ2VyO1xyXG4gICAgc3RhdGljIGdldCBNZ3IoKTpHdWlkZXJNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR3VpZGVyTWFuYWdlci5fTWdyID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHdWlkZXJNYW5hZ2VyLl9NZ3IgPSBuZXcgR3VpZGVyTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR3VpZGVyTWFuYWdlci5fTWdyO1xyXG4gICAgfVxyXG4gICAgU2NlbmVNZ3I6U2NlbmVNYW5hZ2VyO1xyXG4gICAgQ3VyU2NlbmU6R3VpZGVyU2NlbmU7XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVEaXIoKTpHdWlkZXJEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clNjZW5lLkd1aWREaXI7XHJcbiAgICB9XHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr+i1sOi/meS4quaOpeWPo1xyXG4gICAgRW50ZXJTY2VuZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3R2FtZVNjZW5lID0gbmV3IEd1aWRlclNjZW5lKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DaGFuZ2VTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBuZXdHYW1lU2NlbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyU2NlbmUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVcclxue1xyXG4gICAgR3VpZERpcjpHdWlkZXJEaXJlY3RvcjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICB2YXIgRGlyZWN0b3I6U2NlbmUuQmFzZURpcmVjdG9yID0gbmV3IEd1aWRlckRpcmVjdG9yKCk7XHJcbiAgICAgICAgcmV0dXJuIERpcmVjdG9yO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJEaXJlY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxvYWQyRExpc3QgPSBbe3VybDpwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSAsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKSx0eXBlOiBMYXlhLkxvYWRlci5BVExBUyB9XTtcclxuICAgICAgICB0aGlzLkNoYW5nZUdhbWVQbGF5KG5ldyBTY2VuZS5Mb2FkU2NlbmVMb2dpYyhsb2FkMkRMaXN0LG51bGwsbmV3IEd1aWRlclNjZW5lUGxheSgpKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIEVuZCgpOnZvaWRcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlclNjZW5lUGxheSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllXHJcbntcclxuICAgIFVJOkVudGVyR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9ICAgIFxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJID0gQVBQLlVJTWFuYWdlci5TaG93PEVudGVyR2FtZVVJPihFbnRlckdhbWVVSSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCB7dWl9IGZyb20gXCIuLy4uL3VpL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgTG9hZGluZ1VJIGZyb20gXCIuLy4uL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJXCJcclxuaW1wb3J0IEZNV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4vR3VpZGVyTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBCRyBmcm9tIFwiLi8uLi91aS9CR1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkU2NlbmUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgTG9hZERpcmN0b3IoKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5jbGFzcyBMb2FkRGlyY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsb2FkTGlzdDJEID0gW3t1cmw6XCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpcInVpL1Jlc291cmNlL2xvY2FsY29tcC5hdGxhc1wiLHR5cGU6TGF5YS5Mb2FkZXIuQVRMQVN9XTtcclxuICAgICAgICB0aGlzLkNoYW5nZUdhbWVQbGF5KCBuZXcgU2NlbmUuTG9hZFNjZW5lTG9naWMobG9hZExpc3QyRCxudWxsLG5ldyBMb2FkU2NlbmVQbGF5ZSgpKSApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+WKoOi9veWcuuaZr+mAu+i+kVxyXG5jbGFzcyBMb2FkU2NlbmVQbGF5ZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllXHJcbntcclxuICAgIHByaXZhdGUgbV9Db3VudDJETG9hZDpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fQ291bnQzRExvYWQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0xvYWRGYWlsZTpzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fQ291bnRWYWx1ZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fTG9hZGluZ1VJOkxvYWRpbmdVSTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMDtcclxuICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9Db3VudFZhbHVlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFN0YXJ0TG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBcIlwiO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTJEQXJyID0gW1xyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVJhbmtcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwidG9vbEl0ZW1cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkNoYXJhY3RlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiUGxheWVyTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQkdcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImVudGVyc2NlbmV1aVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiZW50ZXJzY2VuZXVpL3JlczFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImVudGVyc2NlbmV1aS9yZXMyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJlbnRlcnNjZW5ldWkvcmVzM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiZW50ZXJzY2VuZXVpL3JlczRcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImVudGVyc2NlbmV1aS9yZXM1XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJlbnRlcnNjZW5ldWkvZ2tcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImNvbXBcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0SnNvblBhdGgoXCJDaGFyYWN0ZXJJbmZvXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEpzb25QYXRoKFwiSXRlbUluZm9cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0SnNvblBhdGgoXCJMZXZlbEluZm9cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0SnNvblBhdGgoXCJPYnN0YWNsZUluZm9cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0U291bmRwYXRoVUlKUyhcImJnXCIpXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkVSUk9SLHRoaXMsdGhpcy5vbkVycm9yKTtcclxuICAgICAgICBMYXlhLmxvYWRlci5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLm9uQ29tcGxldGUpO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTNEQXJyID0gWyBcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDFfY2hpbGRfMDFcIikgLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV9hZHVsdF8wMVwiKSAsXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMDRcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJMMDFfc3ByX3BsYXRfMDNcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2ZseWVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInRyYXBfc3RpbmdfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX2Fic29yZF8wMVwiKSxcclxuICAgICAgICBdXHJcbiAgICAgICAgdGhpcy5Mb2FkKHJlc291cmNlMkRBcnIscmVzb3VyY2UzREFycik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBMb2FkKGFycjJEOkFycmF5PGFueT4gPSBudWxsLGFycjNEOkFycmF5PGFueT49bnVsbClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZihhcnIyRCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQoYXJyMkQsbnVsbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbjJEUHJvZ3Jlc3MsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSAtPTAuNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXJyM0QhPW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5jcmVhdGUoYXJyM0QsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLG51bGwpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uM0RQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudFZhbHVlIC09MC41O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uM0RQcm9ncmVzcyh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID12YWx1ZS8yO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuVmFsdWUgPSAodGhpcy5tX0NvdW50MkRMb2FkICsgdGhpcy5tX0NvdW50M0RMb2FkKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb24yRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLm1fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPXZhbHVlLzI7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5WYWx1ZSA9ICh0aGlzLm1fQ291bnQyRExvYWQgKyB0aGlzLm1fQ291bnQzRExvYWQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkVycm9yKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSArPSBzdHI7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcIkxvYWRFcnJvcjpcIitzdHIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkNvbXBsZXRlKGRhdGEpXHJcbiAgICB7ICAgXHJcbiAgICAgICAgaWYodGhpcy5tX0xvYWRGYWlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0aGlEaXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLlJlbG9hZCh0aGlzLm1fTG9hZEZhaWxlLGZ1bmN0aW9uKCk6dm9pZHt0aGlEaXIuTG9hZCgpfSApO1xyXG4gICAgICAgIH1lbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkJHID0gbmV3IEJHKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuQ29tcGxldGUoKCk9PntHdWlkZXJNYW5hZ2VyLk1nci5FbnRlclNjZW5lKCl9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8TG9hZGluZ1VJPihMb2FkaW5nVUkpO1xyXG4gICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9IDAuNTtcclxuICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPSAwLjU7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAxO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuU3RhcnRMb2FkKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZENvbXBsZXRlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRlNNIH0gZnJvbSBcIi4vLi4vQmFzZS9GU01cIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuZXhwb3J0IG1vZHVsZSBTY2VuZSB7XHJcbiAgICBleHBvcnQgY2xhc3MgU2NlbmVGU00gZXh0ZW5kcyBGU00uRlNNPEJhc2VTY2VuZT5cclxuICAgIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/lnLrmma/ku6PnkIZcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmUgZXh0ZW5kcyBGU00uU3RhdGUge1xyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0R2FtZVRpbWU6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENsb2NrOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBtX1NjZW5lT2JqOiBMYXlhLlNjZW5lM0Q7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fRGlyZWN0b3I6IEJhc2VEaXJlY3RvcjtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgcHVibGljIGdldCBTY2VuZU9iaigpOiBMYXlhLlNjZW5lM0Qge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX1NjZW5lT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IERpcmVjdG9yKCk6IEJhc2VEaXJlY3RvciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fRGlyZWN0b3I7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgR2VuRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHV0T2JqKHNwcml0ZTNEOiBMYXlhLk5vZGUpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9TY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX1NjZW5lT2JqLmFkZENoaWxkKHNwcml0ZTNEKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQmFzZVNjZW5lIFB1dE9iaiBFcnJvcjplbXB0eSBTcHJpdGUzRFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLm1fRGlyZWN0b3IgPSB0aGlzLkdlbkRpcmVjdG9yKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaXJlY3Rvci5TdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEVuZCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuU2NlbmVPYmopIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuU2NlbmVPYmoucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHRoaXMuU2NlbmVPYmoubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWN0b3IgPSB0aGlzLlNjZW5lT2JqLmdldENoaWxkQXQoMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0b3IucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuRGlyZWN0b3IuRW5kKCk7XHJcbiAgICAgICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xlYXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fRGlyZWN0b3IpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fRGlyZWN0b3IuVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZURpcmVjdG9yIGV4dGVuZHMgRlNNLkZTTTxCYXNlU2NlbmVQbGF5ZT5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9TdGFydEdhbWVUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDbG9jazogbnVtYmVyO1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG5cclxuICAgICAgICAvL+engeacieWxnuaAp+WSjOWKn+iDvVxyXG4gICAgICAgIGdldCBHYW1lVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGltZVVwQ2xvY2sgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fVGltZVVwQ2xvY2sgLSB0aGlzLl9TdGFydEdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lIC0gdGhpcy5fU3RhcnRHYW1lVGltZSAtIHRoaXMuX1RpbWVVcENvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBHYW1lVGltZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IEN1ckdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9TdGFydEdhbWVUaW1lICsgdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDbG9jayA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUmVTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5TdGFydFRpbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydFRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0YXJ0R2FtZVRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgU3RhcnQoKTogdm9pZCA7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IEVuZCgpOiB2b2lkO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGltZVVwKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGltZVVwQ2xvY2sgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lVGltZVVwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fVGltZVVwQ2xvY2sgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBDb250aW51ZVRpbWUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIC8vQVBQLk1lc3NhZ2VDZW50ZXIuVHJpZ2dlcihHYW1lRXZlbnQuR2FtZUNvbnRpbnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgKz0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ2xvY2s7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOWIh+aNouWJp+acrFxyXG4gICAgICAgICAqIEBwYXJhbSBuZXdTY2VuZVBsYXkg5paw5Ymn5pysXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIENoYW5nZUdhbWVQbGF5KCBuZXdTY2VuZVBsYXk6QmFzZVNjZW5lUGxheWUgKTogdm9pZCAge1xyXG4gICAgICAgICAgICB0aGlzLkNoYW5nZVN0YXRlKG5ld1NjZW5lUGxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2NlbmVQbGF5ZSBleHRlbmRzIEZTTS5TdGF0ZSB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZSA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkU2NlbmVMb2dpYyBleHRlbmRzIEJhc2VTY2VuZVBsYXllIHtcclxuICAgICAgICBwcml2YXRlIG1fTG9hZDJETGlzdDogYW55W107XHJcbiAgICAgICAgcHJpdmF0ZSBtX0xvYWQzRExpc3Q6IGFueVtdO1xyXG4gICAgICAgIHByaXZhdGUgbV9OZXh0U2NlbmU6IFNjZW5lLkJhc2VTY2VuZVBsYXllO1xyXG4gICAgICAgIHB1YmxpYyBnZXQgT3duZXJEaXJlY3RvcigpOiBCYXNlRGlyZWN0b3Ige1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX293bmVyIGFzIEJhc2VEaXJlY3RvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGxvYWQyRExpc3QgMkTliqDovb3liJfooahcclxuICAgICAgICAgKiBAcGFyYW0gbG9hZDNETGlzdCAzROWKoOi9veWIl+ihqFxyXG4gICAgICAgICAqIEBwYXJhbSBuZXh0U2NlbmUg5LiL5LiA5qC85Zy65pmvXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IobG9hZDJETGlzdDogYW55W10sIGxvYWQzRExpc3Q6IGFueVtdLCBuZXh0U2NlbmU6IFNjZW5lLkJhc2VTY2VuZVBsYXllKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkMkRMaXN0ID0gbG9hZDJETGlzdDtcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWQzRExpc3QgPSBsb2FkM0RMaXN0O1xyXG4gICAgICAgICAgICB0aGlzLm1fTmV4dFNjZW5lID0gbmV4dFNjZW5lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW5kKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTdGFydCgpIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLCB0aGlzLCB0aGlzLkxvYWRDb21wbGV0ZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fTG9hZDJETGlzdClcclxuICAgICAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQodGhpcy5tX0xvYWQyRExpc3QsIG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0xvYWQzRExpc3QpXHJcbiAgICAgICAgICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMubV9Mb2FkM0RMaXN0LCBudWxsLCBudWxsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgTG9hZENvbXBsZXRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLk93bmVyRGlyZWN0b3IuQ2hhbmdlU3RhdGUodGhpcy5tX05leHRTY2VuZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcIi4vLi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7IElucHV0IH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi8uLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vLi4vLi4vR2FtZS9Nb3VudExpbmVcIlxyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vLi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQkdVSSBmcm9tIFwiLi8uLi8uLi91aS9CR1wiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEdhbWVTY2VuZSBmcm9tIFwiLi4vR2FtZVNjZW5lXCI7XHJcbmltcG9ydCB7IEdhbWVBZ2VudCB9IGZyb20gXCIuLy4uLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcbmltcG9ydCBHYW1lQVBQIGZyb20gXCIuLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiO1xyXG5pbXBvcnQgeyBXZWNoYXRPcGVuIH0gZnJvbSBcIi4uLy4uL3BsYXRmb3JtL1dlY2hhdE9wZW5cIjtcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4uLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuaW1wb3J0IEdhbWVtYXAgZnJvbSBcIi4uLy4uL0dhbWUvR2FtZU1hcFwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4uLy4uL0dhbWUvR2FtZU1vZHVsZVwiO1xyXG5cclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxudmFyIEZhbGxUaW1lOiBudW1iZXIgPSAyO1xyXG52YXIgbGluZU51bTogbnVtYmVyID0gMTI7XHJcbnZhciBjb2x1bW46IG51bWJlciA9IDEyO1xyXG5cclxuLy/muLjmiI/lr7zmvJRcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lUGxheSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllIHtcclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcml2YXRlIF9Db3VudEZsb29yVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfU3RhcnRQb3NpdGlvbjogTGF5YS5WZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSBfR2FtZVVwZGF0ZTogKCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgX1BhbmVsVUk6IEdhbWVVSTtcclxuICAgIHByaXZhdGUgbV9Hb2xkTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Mb2dpY0dvbGROdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0N1ckJHOiBCR1VJO1xyXG4gICAgcHJpdmF0ZSBfU2FmZUxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgIHByaXZhdGUgbV9HYW1lTWFwOiBHYW1lbWFwO1xyXG4gICAgcHJpdmF0ZSBtX0Jvb3RvbUZsb29yOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fU3RhcnRGbG9vcjogbnVtYmVyO1xyXG5cclxuICAgIENhbWVyYTogR2FtZUNhbWVyYTtcclxuICAgIFBsYXllcjogUGxheWVyO1xyXG4gICAgSW5wdXRDdHJsOiBJbnB1dC5CYXNlR2FtZUlucHV0O1xyXG4gICAgQ3VyTGluZUJhcnJpZXJzOiBBcnJheTxMaW5lSXRlbUluZm8+O1xyXG4gICAgbmFtZTogbnVtYmVyO1xyXG4gICAgRnJlc2hCR0NvdW50OiBudW1iZXI7XHJcbiAgICBnZXQgZ2FtZU1hcCgpOiBHYW1lbWFwIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0dhbWVNYXA7XHJcbiAgICB9XHJcbiAgICBnZXQgQ29sdW1zTnVtKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbjtcclxuICAgIH1cclxuICAgIGdldCBTYWZlTG9jYXRpb24oKTogR2FtZVN0cnVjdC5NTG9jYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TYWZlTG9jYXRpb247XHJcbiAgICB9XHJcbiAgICBnZXQgUGFuZWxVSSgpOiBHYW1lVUkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9QYW5lbFVJO1xyXG4gICAgfVxyXG4gICAgc2V0IFBhbmVsVUkodmFsdWU6IEdhbWVVSSkge1xyXG4gICAgICAgIHZhbHVlLlNldExlZnRUb3VjaCh0aGlzLCAoKSA9PiB7IHRoaXMuSW5wdXRDdHJsLklucHV0KGZhbHNlKTsgfSlcclxuICAgICAgICB2YWx1ZS5TZXRSaWdodFRvdWNoKHRoaXMsICgpID0+IHsgdGhpcy5JbnB1dEN0cmwuSW5wdXQodHJ1ZSk7IH0pO1xyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBQbGF5ZXJGbG9vcigpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBmbG9vcjogbnVtYmVyID0gdGhpcy5fU3RhcnRQb3NpdGlvbi56IC0gdGhpcy5QbGF5ZXIuTG9naWNQb3NpdGlvbi56O1xyXG4gICAgICAgIGZsb29yID0gZmxvb3IgLyBHYW1lTW9kdWxlLkRTcGFjZTtcclxuICAgICAgICBmbG9vciA9IE1hdGgucm91bmQoZmxvb3IpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhmbG9vcik7XHJcbiAgICB9XHJcbiAgICBnZXQgRGlzdGFuY2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLlBsYXllckZsb29yKVxyXG4gICAgfVxyXG4gICAgZ2V0IFBsYXllckZsb29yTGluZSgpOiBNb3VudExpbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLlBsYXllckZsb29yKTtcclxuICAgIH1cclxuICAgIGdldCBHYW1lVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5tX293bmVyIGFzIEdhbWVEaXJlY3RvcikuR2FtZVRpbWU7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZUdvbGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0dvbGROdW07XHJcbiAgICB9XHJcbiAgICBnZXQgQ291bnRGbG9vclRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICB0aGlzLm1fQm9vdG9tRmxvb3IgPSB0aGlzLm1fQm9vdG9tRmxvb3IgPCB0aGlzLm1fR2FtZU1hcC5UYWlsRkxvb3IuRmxvb3JOdW0gPyB0aGlzLm1fR2FtZU1hcC5UYWlsRkxvb3IuRmxvb3JOdW0gOnRoaXMubV9Cb290b21GbG9vcjtcclxuICAgICAgICB2YXIgYmV0d2VlbjogbnVtYmVyID0gdGhpcy5EaXN0YW5jZSArIHRoaXMubV9TdGFydEZsb29yIC0gdGhpcy5tX0Jvb3RvbUZsb29yOy8vdGhpcy5tX0dhbWVNYXAuVGFpbEZMb29yO1xyXG4gICAgICAgIHZhciByYW5nZU51bTogbnVtYmVyID0gMjtcclxuICAgICAgICBiZXR3ZWVuID0gYmV0d2VlbiA+IHJhbmdlTnVtID8gcmFuZ2VOdW0gOiBiZXR3ZWVuO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Db3VudEZsb29yVGltZSAtIGJldHdlZW4gLyByYW5nZU51bSAqIEZhbGxUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0NvdW50Rmxvb3JUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9TdGFydFBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0N1ckJHID0gQVBQLlNjZW5lTWFuYWdlci5CRyBhcyBCR1VJO1xyXG4gICAgICAgIHRoaXMuRnJlc2hCR0NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLm1fR2FtZU1hcCA9IG5ldyBHYW1lbWFwKGxpbmVOdW0sIGNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5tX1N0YXJ0Rmxvb3IgPSAzO1xyXG4gICAgfVxyXG5cclxuICAgIEFkZElucHV0Q3RybGVyKHZhbHVlOiBJbnB1dC5CYXNlR2FtZUlucHV0KSB7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwuQ2xlYXIoKTtcclxuICAgICAgICB2YWx1ZS5OZXh0SW5wdXQgPSB0aGlzLklucHV0Q3RybDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIFBvcElucHV0Q3RybGVyKCkge1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdGhpcy5JbnB1dEN0cmwuTmV4dElucHV0O1xyXG4gICAgfVxyXG5cclxuICAgIEFkZEdvbGQobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fR29sZE51bSArPSBudW07XHJcbiAgICAgICAgdGhpcy5BZGRMb2dpY0dvbGQobnVtKTtcclxuICAgIH1cclxuXHJcbiAgICBBZGRHb2xkVW5Mb2dpY0dvbGQobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fR29sZE51bSArPSBudW07XHJcbiAgICB9XHJcblxyXG4gICAgQWRkTG9naWNHb2xkKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fTG9naWNHb2xkTnVtICs9IG51bTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuR29sZCA9IHRoaXMuX0xvZ2ljR29sZE51bTtcclxuICAgICAgICBXZWNoYXRPcGVuLmdldEluc3RhbmNlcygpLmRyYXdwYXNzKHRoaXMuX0xvZ2ljR29sZE51bSArIEdhbWVBZ2VudC5BZ2VudC5DdXJTY29yZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7lronlhajkvY3nva5cclxuICAgIFNldFNhZmVQUyhsb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb24pIHtcclxuICAgICAgICB0aGlzLm1fR2FtZU1hcC5TZXRTYWZlUFMobG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIERlYXRoKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlBsYXllckRlYXRoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLk9uR2FtZUNvbXBsZXRlKCk7XHJcbiAgICAgICAgLy91aS5TZXRHYW1lSW5mbyh0aGlzLlBsYXllckRpc3RhbmNlLHRoaXMuX0dvbGROdW0pO1xyXG4gICAgfVxyXG5cclxuICAgIEVuZCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/ph43mlrDlvIDlp4tcclxuICAgIFJlU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBTaG93SW5wdXRJbmZvKGluZm86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bem5Y+z56e75YqoXHJcbiAgICBNb3ZlU3RlcChpc1JpZ2h0OiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyLkN1clN0ZXAubG9ja2VkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy92YXIgYnVmZiA9IHRoaXMuQnVmZmVyO1xyXG4gICAgICAgIC8v6I635Y+W5LiL5LiA5bGC55qEU3RlcFxyXG4gICAgICAgIHZhciBzdGVwOiBTdGVwID0gdGhpcy5QbGF5ZXIuQ3VyU3RlcDtcclxuICAgICAgICBpZiAoc3RlcCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzUmlnaHQpIHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGVwID09IG51bGwgfHwgc3RlcC5TdGVwSXRlbS5Jc0ZvcmJpZGVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuQ3VyU3RlcC5TdGFuZE9uR3JvdW5kKCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICB0aGlzLlBsYXllci5TdGFydE1vdmUoKTtcclxuICAgICAgICB2YXIgbmV4dEZsb29yRGlyID0gaXNSaWdodCA/IDEgOiAtMTtcclxuICAgICAgICB0aGlzLm1fR2FtZU1hcC5QdXNoRkxvb3IobmV4dEZsb29yRGlyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWxguaVsOiOt+WPluafkOWxglxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGZsb29yIFxyXG4gICAgICovXHJcbiAgICBHZXRGbG9vckJ5Rmxvb3IoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fR2FtZU1hcC5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCa6L+H5Z2Q5qCH6I635Y+W5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0gbG9jYXRpb24g57Si5byVLOWxguaVsFxyXG4gICAgICovXHJcbiAgICBHZXRTdGVwQnlMb2NhdGlvbihsb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb24sIHJpZ2h0U3dpdGNoTnVtOiBudW1iZXIgPSAwKTogU3RlcCB7XHJcbiAgICAgICAgaWYgKHJpZ2h0U3dpdGNoTnVtICogcmlnaHRTd2l0Y2hOdW0gPiAwLjAwMSkge1xyXG4gICAgICAgICAgICB2YXIgZmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGxvY2F0aW9uLlkpO1xyXG4gICAgICAgICAgICB2YXIgZGlzdGFuY2U6IG51bWJlciA9IE1hdGguY2VpbChmbG9vci5yaWdodFN3aXRjaCAvIDIpIC0gTWF0aC5jZWlsKHJpZ2h0U3dpdGNoTnVtIC8gMik7XHJcbiAgICAgICAgICAgIHZhciBmbG9vcklkeDogbnVtYmVyID0gbG9jYXRpb24uWCAtIGRpc3RhbmNlOy8vIC0gKDEgKyBmbG9vci5PZGRTd2l0Y2gpO1xyXG4gICAgICAgICAgICB2YXIgZ2V0U3RlcDogU3RlcCA9IGZsb29yLkdldFN0ZXAoZmxvb3JJZHgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHZhciBnZXRTdGVwOiBTdGVwID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9jYXRpb24uWSkuR2V0U3RlcChsb2NhdGlvbi5YKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGdldFN0ZXA7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liJvlu7rnm7jlhbPmlL7ov5kg6L+Z6YeM6YeN5paw5byA5aeL5LiN5Lya6LWwXHJcbiAgICBwdWJsaWMgU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBuZXcgR2FtZUNhbWVyYSgpO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIgPSBuZXcgTGF5YS5WZWN0b3IzKC0zMCwgMCwgMCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5DYW1lcmEpO1xyXG4gICAgICAgIC8v5Yib5bu6VUlcclxuICAgICAgICAvL+WIm+W7uueOqeWutlxyXG4gICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdmFyIGdhbWVBZ2VudCA9IEdhbWVBZ2VudC5BZ2VudDtcclxuICAgICAgICB2YXIgcGxheWVyTW9kZWwgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRDaGFyYWN0ZXJNb2RlbChnYW1lQWdlbnQuQ3VyQ2hhcmFjdGVySUQpO1xyXG4gICAgICAgIHBsYXllci5TZXRQbGF5ZXJNb2RlbChwbGF5ZXJNb2RlbCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMubV9HYW1lTWFwKTtcclxuICAgICAgICAvL+WHhuWkh+eOqeWutuatu+S6oeS6i+S7tlxyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCwgdGhpcy5EZWF0aCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuU3RhcnRHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ov5vlhaXmuLjmiI/nmoTorr7nva7mlL7ov5nph4wg6YeN5paw5byA5aeL6LWw6L+Z6YeMXHJcbiAgICBwcm90ZWN0ZWQgU3RhcnRHYW1lKCkge1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuU2NlbmVPYmouYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKVxyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5SZXNldEdhbWVJdGVtKCk7XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LlJlc2V0U2tpbGxJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKDAsIDApO1xyXG4gICAgICAgIC8v5Yib5bu66L6T5YWl5o6n5Yi25ZmoXHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSBuZXcgSW5wdXQuTm9ybUdhbWVJbnB1dCh0aGlzKTtcclxuICAgICAgICB0aGlzLlBsYXllci5SZXNldCgpO1xyXG4gICAgICAgIHZhciBzdGFydEZsb29yOiBudW1iZXIgPSB0aGlzLm1fU3RhcnRGbG9vcjtcclxuICAgICAgICB0aGlzLm1fR2FtZU1hcC5Jbml0KHN0YXJ0Rmxvb3IpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlNldFN0ZXAodGhpcy5tX0dhbWVNYXAuR2V0U2FmZVN0ZXAoKSk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRQb3NpdGlvbiA9IHRoaXMuUGxheWVyLlBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLlJlc2V0KG5ldyBMYXlhLlZlY3RvcjMoKSwgbmV3IExheWEuVmVjdG9yMygwLCBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoICogMTAuNSwgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aCAqIDkpLCB0aGlzLlBsYXllcik7XHJcbiAgICAgICAgdGhpcy5tX0dvbGROdW0gPSAwO1xyXG4gICAgICAgIHRoaXMuX0xvZ2ljR29sZE51bSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuUGFuZWxVSSA9IEFQUC5VSU1hbmFnZXIuU2hvdyhHYW1lVUkpO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5SZWdpc3RDbGlja1BsYXllckl0ZW0odGhpcywgdGhpcy5Vc2VQbGF5ZXJJdGVtKTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuUmVnaXN0Q2xpY2tTa2lsbEl0ZW0odGhpcywgdGhpcy5Vc2VTa2lsbEl0ZW0pO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5Hb2xkID0gMDtcclxuICAgICAgICB0aGlzLl9Db3VudEZsb29yVGltZSA9IHRoaXMuR2FtZVRpbWUgKyA0O1xyXG4gICAgICAgIHRoaXMuX0dhbWVVcGRhdGUgPSB0aGlzLl9TdGFydENvdW50O1xyXG4gICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkuZHJhd3Bhc3MoMCk7XHJcbiAgICAgICAgdGhpcy5tX0Jvb3RvbUZsb29yID0gc3RhcnRGbG9vcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9HYW1lVXBkYXRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW+queOr+iuvue9ruWxguWPsOmYtlxyXG4gICAgICogQHBhcmFtIGZsb29yIOWxglxyXG4gICAgICogQHBhcmFtIE93bmVyIFxyXG4gICAgICogQHBhcmFtIGNhbGxCYWNrIOW+queOr+aJp+ihjOWbnuiwg1xyXG4gICAgICovXHJcbiAgICBMb29wRG9GbG9vclN0ZXAoZmxvb3I6IG51bWJlciwgT3duZXI6IGFueSwgY2FsbEJhY2s6IChzdGVwOiBTdGVwKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX0dhbWVNYXAuTG9vcERvRmxvb3JTdGVwKGZsb29yLCBPd25lciwgY2FsbEJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5q2j5bi46L+Q6KGM5pe255qE5q+P5bin6YC76L6RXHJcbiAgICBwcml2YXRlIF9SdW5HYW1lVXBkYXRlKCkge1xyXG4gICAgICAgIHZhciBkaXN0OiBudW1iZXIgPSB0aGlzLlBsYXllckZsb29yO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5EaXN0YW5jZSA9IHRoaXMuRGlzdGFuY2U7XHJcbiAgICAgICAgaWYgKHRoaXMuRnJlc2hCR0NvdW50ID4gMTApIHtcclxuICAgICAgICAgICAgdGhpcy5fQ3VyQkcuVXBkYXRlUGFnZShkaXN0KTtcclxuICAgICAgICAgICAgdGhpcy5GcmVzaEJHQ291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICArK3RoaXMuRnJlc2hCR0NvdW50O1xyXG4gICAgICAgIHZhciBkRGlzdGFuY2U6IG51bWJlciA9IHRoaXMubV9HYW1lTWFwLlRhaWxGTG9vci5GbG9vck51bTtcclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSB0aGlzLlBsYXllckZsb29yIC0gZERpc3RhbmNlICsgMztcclxuICAgICAgICBpZiAoZGlzdGFuY2UgPiAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1B1c2hGTG9vcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuQ291bnRGbG9vclRpbWUgPCBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnRGbG9vclRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyBGYWxsVGltZTtcclxuICAgICAgICAgICAgdGhpcy5fRGVzdHJveUxpbmUodGhpcy5tX0Jvb3RvbUZsb29yKTtcclxuICAgICAgICAgICAgKyt0aGlzLm1fQm9vdG9tRmxvb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5byA5aeL5YCS6K6h5pe25pyf6Ze055qE5q+P5bin6YC76L6RXHJcbiAgICBwcml2YXRlIF9TdGFydENvdW50KCkge1xyXG4gICAgICAgIHZhciB0aW1lOiBzdHJpbmcgPSBcIlwiXHJcbiAgICAgICAgdmFyIGNvdW50VGltZTogbnVtYmVyID0gdGhpcy5fQ291bnRGbG9vclRpbWUgLSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWU7XHJcbiAgICAgICAgaWYgKGNvdW50VGltZSA+IDAuOSlcclxuICAgICAgICAgICAgdGltZSArPSBNYXRoLmZsb29yKGNvdW50VGltZSk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuUGFuZWxVSS5HYW1lUGFuZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9HYW1lVXBkYXRlID0gdGhpcy5fUnVuR2FtZVVwZGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnRGbG9vclRpbWUgPSB0aGlzLkdhbWVUaW1lICsgRmFsbFRpbWU7XHJcbiAgICAgICAgICAgIEdhbWVBZ2VudC5BZ2VudC5SZXNldEdhbWVJdGVtKCk7XHJcbiAgICAgICAgICAgIEdhbWVBZ2VudC5BZ2VudC5SZXNldFNraWxsSXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlBhbmVsVUkuU2V0Q291bnRUaW1lKHRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5bGC5ZCR5LiK5Y+gXHJcbiAgICBwcm90ZWN0ZWQgX1B1c2hGTG9vcigpIHtcclxuICAgICAgICB0aGlzLm1fR2FtZU1hcC5QdXNoRkxvb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWhjOmZt+afkOS4gOWxglxyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9Zmxvb3IgXHJcbiAgICAgKi9cclxuICAgIF9EZXN0cm95TGluZShmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9HYW1lTWFwLkdldEZsb29yQnlGbG9vcihmbG9vcikpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0dhbWVNYXAuQnJlYWtMaW5lKGZsb29yKTtcclxuICAgICAgICAgICAgdGhpcy5QbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVzZVNraWxsSXRlbSgpIHtcclxuICAgICAgICBpZiAoR2FtZUFnZW50LkFnZW50LlNraWxsSXRlbU51bSA8IDEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuVXNlU2tpbGxJdGVtKCk7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlcklEOiBudW1iZXIgPSBHYW1lQWdlbnQuQWdlbnQuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdmFyIEl0ZW1JRDogbnVtYmVyID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3IuR2V0SXRlbUlEKGNoYXJhY3RlcklEKTtcclxuICAgICAgICB2YXIgSXRlbVR5cGU6IG51bWJlciA9IEdhbWVBUFAuSXRlbU1nci5HZXRJdGVtVHlwZShJdGVtSUQpO1xyXG4gICAgICAgIHZhciBuZXdCdWZmOiBJdGVtLkJhc2VQbGF5ZXJCdWZmID0gSXRlbS5JdGVtQnVmZkZhY3RvcnkoSXRlbVR5cGUpO1xyXG4gICAgICAgIG5ld0J1ZmYuQWRkVG9QbGF5ZXIodGhpcy5QbGF5ZXIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXNlUGxheWVySXRlbSgpIHtcclxuICAgICAgICBpZiAoR2FtZUFnZW50LkFnZW50LkdhbWVJdGVtTnVtIDwgMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5Vc2VHYW1lSXRlbSgpO1xyXG4gICAgICAgIHZhciBJdGVtSUQ6IG51bWJlciA9IEdhbWVBZ2VudC5BZ2VudC5DdXJJdGVtO1xyXG4gICAgICAgIHZhciBJdGVtVHlwZTogbnVtYmVyID0gR2FtZUFQUC5JdGVtTWdyLkdldEl0ZW1UeXBlKEl0ZW1JRCk7XHJcbiAgICAgICAgdmFyIG5ld0J1ZmY6IEl0ZW0uQmFzZVBsYXllckJ1ZmYgPSBJdGVtLkl0ZW1CdWZmRmFjdG9yeShJdGVtVHlwZSk7XHJcbiAgICAgICAgbmV3QnVmZi5BZGRUb1BsYXllcih0aGlzLlBsYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbkdhbWVDb21wbGV0ZSgpIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgsIHRoaXMuRGVhdGgsIHRoaXMpO1xyXG4gICAgICAgIHZhciB1aTogRW5kR2FtZVVJID0gQVBQLlVJTWFuYWdlci5TaG93PEVuZEdhbWVVST4oRW5kR2FtZVVJKTtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQWRkR29sZCh0aGlzLm1fR29sZE51bSk7XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LkFkZFNjb3JlKHRoaXMubV9Hb2xkTnVtICogMTAgKyB0aGlzLkRpc3RhbmNlICogMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25UaW1lUGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUGF1c2UoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgT25Db3VudGludWUoKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuQ29udGludWUoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgcGF0aCB7XHJcbiAgICBleHBvcnQgdmFyIElzRWRpdG9yOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGV4cG9ydCB2YXIgdmVyc2lvbjogc3RyaW5nID0gXCI/dj01XCI7XHJcbiAgICBleHBvcnQgdmFyIFNjZW5lQXNzZXRQYXRoOiBzdHJpbmcgPSBcIkxheWFTY2VuZV9cIjtcclxuICAgIGV4cG9ydCB2YXIgUmVzb3VyY2VQYXRoOiBzdHJpbmcgPSBJc0VkaXRvciA/IFwiTmV0UmVzb3VyY2VfM18yOS9cIiA6IFwiaHR0cHM6Ly93d3cuZ3NqZ2FtZS5jb20vUmVzb3VyY2UvTmV0UmVzb3VyY2VfM18yOS9cIjtcclxuICAgIGV4cG9ydCB2YXIgVUlQYXRoOiBzdHJpbmcgPSBSZXNvdXJjZVBhdGggKyBcIlVJL1wiO1xyXG4gICAgZXhwb3J0IHZhciBNb2RlbFBhdGg6IHN0cmluZyA9IFJlc291cmNlUGF0aCArIFwiM0QvXCJcclxuICAgIGV4cG9ydCB2YXIgQ29uZmlnUGF0aDogc3RyaW5nID0gUmVzb3VyY2VQYXRoICsgXCJDb25maWcvXCJcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlkF0bOaWh+S7tui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0QXRsUGF0aChmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gVUlQYXRoICsgZmlsZU5hbWUgKyBcIi5hdGxhc1wiICsgKElzRWRpdG9yID8gXCJcIiA6IHZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5aOw6Z+z6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRTb3VuZHBhdGhVSUpTKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAgUmVzb3VyY2VQYXRoICsgXCJzb3VuZC9cIiArIGZpbGVOYW1lICsgXCIubXAzXCIgKyAoSXNFZGl0b3IgPyBcIlwiIDogdmVyc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZVSUpzb27ot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldERlcGF0aFVJSlMoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFVJUGF0aCArIGZpbGVOYW1lICsgXCIuanNvblwiICsgKElzRWRpdG9yID8gXCJcIiA6IHZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WbGjmlofku7bot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldExIKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBNb2RlbFBhdGggKyBTY2VuZUFzc2V0UGF0aCArIGZpbGVOYW1lICsgXCIvQ29udmVudGlvbmFsL1wiICsgZmlsZU5hbWUgKyBcIi5saFwiICsgKElzRWRpdG9yID8gXCJcIiA6IHZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Yqg6L29SnNvbui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0SnNvblBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIENvbmZpZ1BhdGggKyBmaWxlTmFtZSArIFwiLmpzb25cIiArIChJc0VkaXRvciA/IFwiXCIgOiB2ZXJzaW9uKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgVUlGdW5jIHtcclxuICAgIC8v6K6h566X57yp5pS+5YC8XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gQ291bnRTY2FsZUZpeCh3aWR0aDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXdpZHRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YWdlV2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHZhciBzY2FsZTogbnVtYmVyID0gc3RhZ2VXaWR0aCAvIHdpZHRoO1xyXG4gICAgICAgIHJldHVybiBzY2FsZTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBGaXhVSSh2aWV3OiBMYXlhLlNwcml0ZSwgd2lkdGg6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBzY2FsZSA9IFVJRnVuYy5Db3VudFNjYWxlRml4KHdpZHRoID8gd2lkdGggOiB2aWV3LndpZHRoKTtcclxuICAgICAgICB2aWV3LnNjYWxlWCA9IHNjYWxlO1xyXG4gICAgICAgIHZpZXcuc2NhbGVZID0gc2NhbGU7XHJcbiAgICAgICAgdmlldy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodCAvIHNjYWxlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgU2NlbmVNZ3IgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IFRpbWVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9UaW1lTWFuYWdlclwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4uL0dhbWUvR2FtZU1vZHVsZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQVBQIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfU2NlbmVNZ3I6IFNjZW5lTWdyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19UaW1lTWdyOiBUaW1lTWFuYWdlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfVUlNYW5hZ2VyOiBVSU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19GcmFtZVdvcms6RnJhbWVXb3JrO1xyXG4gICAgc3RhdGljIGdldCBGcmFtZVdvcmsoKTpGcmFtZVdvcmtcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nX0ZyYW1lV29yaztcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgTWVzc2FnZU1hbmFnZXIoKTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIgIHtcclxuICAgICAgICByZXR1cm4gQVBQLmdfTWVzc2FnZTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgVUlNYW5hZ2VyKCk6IFVJTWFuYWdlciAge1xyXG4gICAgICAgIGlmIChBUFAuZ19VSU1hbmFnZXIgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgQVBQLmdfVUlNYW5hZ2VyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuZ19VSU1hbmFnZXI7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IFNjZW5lTWFuYWdlcigpOiBTY2VuZU1nciAge1xyXG4gICAgICAgIGlmIChBUFAuZ19TY2VuZU1nciA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBBUFAuZ19TY2VuZU1nciA9IEZXLkZNLkdldE1hbmFnZXI8U2NlbmVNZ3I+KFNjZW5lTWdyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFQUC5nX1NjZW5lTWdyO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBUaW1lTWFuYWdlcigpOiBUaW1lTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIGlmIChBUFAuZ19UaW1lTWdyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIEFQUC5nX1RpbWVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFRpbWVNYW5hZ2VyPihUaW1lTWFuYWdlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuZ19UaW1lTWdyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBJbml0KClcclxuICAgIHtcclxuICAgICAgICBBUFAuZ19GcmFtZVdvcmsgPSBGcmFtZVdvcmsuRk07XHJcbiAgICAgICAgdmFyIGZtOkZyYW1lV29yayAgPSBBUFAuZ19GcmFtZVdvcms7XHJcbiAgICAgICAgQVBQLmdfTWVzc2FnZSA9IGZtLkFkZE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICBBUFAuZ19TY2VuZU1nciA9ICBmbS5BZGRNYW5hZ2VyPFNjZW5lTWdyPihTY2VuZU1ncik7XHJcbiAgICAgICAgQVBQLmdfVGltZU1nciA9IGZtLkFkZE1hbmFnZXI8VGltZU1hbmFnZXI+KFRpbWVNYW5hZ2VyKTtcclxuICAgICAgICBBUFAuZ19VSU1hbmFnZXIgPSBmbS5BZGRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICBcclxuICAgICAgICBBUFAuZ19NZXNzYWdlLlJlZ2lzdChHYW1lTW9kdWxlLkV2ZW50Lk9uVGltZVBhdXNlLEFQUC5nX1RpbWVNZ3IuUGF1c2UsQVBQLmdfVGltZU1ncilcclxuICAgICAgICBBUFAuZ19NZXNzYWdlLlJlZ2lzdChHYW1lTW9kdWxlLkV2ZW50Lk9uVGltZUNvbnRpbnVlLEFQUC5nX1RpbWVNZ3IuQ29udGludWUsQVBQLmdfVGltZU1ncilcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IENoYXJhY3Rlck1hbmFnZXIgZnJvbSBcIi4vLi4vR2FtZU1hbmFnZXIvQ2hhcmFjdGVyTWFtYWdlclwiXHJcbmltcG9ydCBJdGVtTWFuYWdlciBmcm9tIFwiLi8uLi9HYW1lTWFuYWdlci9JdGVtTWFuYWdlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVBUFBcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgQ2hhcmFjdGVyTWdyKCk6Q2hhcmFjdGVyTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBDaGFyYWN0ZXJNYW5hZ2VyLk1ncjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEl0ZW1NZ3IoKTpJdGVtTWFuYWdlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBJdGVtTWFuYWdlci5NZ3I7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge0l0ZW19IGZyb20gXCIuLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdERlbGVnYXRlIGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIlxyXG5pbXBvcnQgU2V0UGFuZWxVSSBmcm9tIFwiLi8uLi91aS9TZXRQYW5lbFVJXCJcclxuaW1wb3J0IFJhbmtQYW5lbFVJIGZyb20gXCIuLy4uL3VpL1JhbmtQYW5lbFVJXCJcclxuaW1wb3J0IENoYXJhY3RlclVJIGZyb20gXCIuLy4uL3VpL0NoYXJhY3RlclVJXCJcclxuaW1wb3J0IEdhbWVTY2VuZSBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lU2NlbmVcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vQVBQXCJcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiO1xyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4uL3VpL0VudGVyR2FtZVVJXCI7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi4vR2FtZS9HYW1lTW9kdWxlXCI7XHJcblxyXG50eXBlIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbGVyXHJcbntcclxuICAgIHN0YXRpYyBnZXQgR2FtZUNvbnRyb2xlcigpOkdhbWVDb250cm9sZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIEdhbWVDb250cm9sZXIuTWdyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ29udHJvbGVyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6IEdhbWVDb250cm9sZXI7XHJcbiAgICBzdGF0aWMgZ2V0IE1ncigpOiBHYW1lQ29udHJvbGVyIHtcclxuICAgICAgICBpZiAoR2FtZUNvbnRyb2xlci5fTWdyID09IG51bGwpIHtcclxuICAgICAgICAgICAgR2FtZUNvbnRyb2xlci5fTWdyID0gbmV3IEdhbWVDb250cm9sZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEdhbWVDb250cm9sZXIuX01ncjtcclxuICAgIH1cclxuICAgIF9MaW5lU3RlcE51bTpudW1iZXI7XHJcbiAgICBfTWF4TGluZU51bTpudW1iZXI7XHJcbiAgICBfU3RlcExlbmd0aDpudW1iZXI7XHJcbiAgICBfU3RlcERpc3RhbmNlOm51bWJlcjtcclxuICAgIF9QbGF5ZXJNb3ZlVGltZTpudW1iZXI7XHJcbiAgICBcclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAvL+W4uOmHj+WumuS5iVxyXG4gICAgLy/mr4/ooYzmnIDlpKfmoLzlrZDmlbBcclxuICAgIGdldCBMaW5lU3RlcE51bSgpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5fTGluZVN0ZXBOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9MaW5lU3RlcE51bSA9IDUrMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0xpbmVTdGVwTnVtO1xyXG4gICAgfSBcclxuICAgIC8v5pyA5aSn6KGM5pWwXHJcbiAgICBnZXQgTWF4TGluZU51bSgpOiBudW1iZXJcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5fTWF4TGluZU51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX01heExpbmVOdW0gPSAxMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX01heExpbmVOdW07XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAvL+agvOWtkOi+uemVv1xyXG4gICAgZ2V0IFN0ZXBMZW5ndGgoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fU3RlcExlbmd0aClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1N0ZXBMZW5ndGggPSAwLjk4O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU3RlcExlbmd0aDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/njqnlrrbnp7vliqjml7bpl7RcclxuICAgIGdldCBQbGF5ZXJNb3ZlVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9QbGF5ZXJNb3ZlVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1BsYXllck1vdmVUaW1lID0gMC4yO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fUGxheWVyTW92ZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGxheWVySUQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBndWVzdEFnZW50OlBsYXllckd1ZXN0QWdlbnQgPSBQbGF5ZXJHdWVzdERlbGVnYXRlLkd1ZXN0QWdlbnQ7XHJcbiAgICAgICAgdmFyIGNoYXJhY3Rlckxpc3Q6QXJyYXk8bnVtYmVyPiA9IGd1ZXN0QWdlbnQuQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICBpZighY2hhcmFjdGVyTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZighZ3Vlc3RBZ2VudC5CdXlDaGFyYWN0ZXIoaWQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ3Vlc3RBZ2VudC5TZXRDaGFyYWN0ZXIoaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pi+56S66K6+572u6Z2i5p2/XHJcbiAgICBTaG93U2V0UGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIFBhbmVsID0gQVBQLlVJTWFuYWdlci5TaG93PFNldFBhbmVsVUk+KFNldFBhbmVsVUkpOy8vIG5ldyBTZXRQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aYvuekuuaOkuihjOamnOmdouadv1xyXG4gICAgU2hvd1JhbmtQYW5lbCgpIHtcclxuICAgICAgICAvLyBpZighTGF5YS5Ccm93c2VyLm9uV2VpWGluIHx8IHR5cGVvZiB3eCA9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdmFyIFBhbmVsID0gQVBQLlVJTWFuYWdlci5TaG93PFJhbmtQYW5lbFVJPihSYW5rUGFuZWxVSSk7Ly8gbmV3IFNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5pi+56S66KeS6Imy6Z2i5p2/XHJcbiAgICBwdWJsaWMgU2hvd0NoYXJhY3RlclBhbmVsKCkge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBBUFAuVUlNYW5hZ2VyLlNob3c8Q2hhcmFjdGVyVUk+KENoYXJhY3RlclVJKTtcclxuICAgICAgICByZXR1cm4gY2hhcmFjdGVyO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX1NldEluZm87XHJcbiAgICBnZXQgU2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIGlmICh0aGlzLl9TZXRJbmZvID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1NldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFNldEluZm8odmFsdWU6IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuX1NldEluZm8gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S/neWtmOiuvue9ruaVsOaNrlxyXG4gICAgU2F2ZVNldEluZm8oaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5TZXRJbmZvID0gaW5mbztcclxuICAgIH1cclxuXHJcbiAgICAvL+ivu+WPluiuvue9ruS/oeaBr1xyXG4gICAgR2V0U2V0SW5mbygpOiBHYW1lU3RydWN0LlNldEluZm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlNldEluZm87XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJHYW1lVUkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBFbnRlckdhbWUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5FbnRlclNjZW5lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZURpcigpOiBHYW1lRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkRpcmVjdG9yIGFzIEdhbWVEaXJlY3RvcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR2FtZVNjZW5lKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DaGFuZ2VTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v55Sf5oiQQlVGRuihqOeOsOaViOaenFxyXG4gICAgR2VuQnVmZkVmZmVjdCh0eXBlOiBJdGVtVHlwZSk6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgfVxyXG5cclxuICAgIEJ1eUl0ZW0oaWQ6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkJ1eUl0ZW0oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIFRpbWVQYXVzZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShHYW1lTW9kdWxlLkV2ZW50Lk9uVGltZVBhdXNlKTtcclxuICAgIH1cclxuXHJcbiAgICBUaW1lQ29udGludWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoR2FtZU1vZHVsZS5FdmVudC5PblRpbWVDb250aW51ZSk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFdlY2hhdE9wZW4ge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIHdlY2hhdE9wZW46IFdlY2hhdE9wZW4gPSBudWxsO1xyXG4gICAgcHVibGljIGRhdGFDb250ZXh0ID0gbnVsbDtcclxuICAgIHByaXZhdGUgaXNEcmF3UmFuazogYm9vbGVhbiAvLyDmmK/lkKblvIDlp4vnu5jnlLvmjpLooYzmppzlhoXlrrlcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaXNEcmF3UmFuayA9IGZhbHNlO1xyXG4gICAgICAgIGlmKHR5cGVvZiB3eCAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUNvbnRleHQgPSB3aW5kb3dbXCJ3eFwiXS5nZXRPcGVuRGF0YUNvbnRleHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY3lr7nosaHlrp7liJdcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZXMoKTogV2VjaGF0T3BlbiB7XHJcbiAgICAgICAgaWYoIVdlY2hhdE9wZW4ud2VjaGF0T3Blbikge1xyXG4gICAgICAgICAgICBXZWNoYXRPcGVuLndlY2hhdE9wZW4gPSBuZXcgV2VjaGF0T3BlbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gV2VjaGF0T3Blbi53ZWNoYXRPcGVuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZVNjb3JlKHNjb3JlOmFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInVwZGF0ZVwiLFxyXG4gICAgICAgICAgICBzY29yZTogc2NvcmVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd3Bhc3Moc2NvcmU6YW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiZHJhd3Bhc3NcIixcclxuICAgICAgICAgICAgc2NvcmU6IHNjb3JlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyY2FudmFzZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlVG9PcGVuKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJjbGVhcmNhbnZhc2VcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbG9zZVJhbmsoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2xvc2VcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93UmFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwicmFuZ2VcIixcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGNsZWFyU2NvcmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2xlYXJTY29yZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9wZW5SYW5rKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcIm9wZW5cIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcG9zdE1lc3NhZ2VUb09wZW4oZGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuZGF0YUNvbnRleHQpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhQ29udGV4dC5wb3N0TWVzc2FnZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJdGVtRWxlbWVudCBleHRlbmRzIExheWEuQm94IHtcclxuICAgIC8vXHJcbiAgICBwcml2YXRlIG1fSXRlbUlkeDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfQnRuOiBMYXlhLkJ1dHRvbjtcclxuICAgIHByaXZhdGUgX0ltZzogTGF5YS5JbWFnZTtcclxuICAgIHByaXZhdGUgbV9OdW1MYWJlbDogTGF5YS5MYWJlbDtcclxuICAgIHByaXZhdGUgbV9MYWJlbFN0cmluZzogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIG1fQnV5SXRlbTogTWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgcHJpdmF0ZSBtX0Nob29zZUl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuXHJcbiAgICBnZXQgQnRuKCk6IExheWEuQnV0dG9uIHtcclxuICAgICAgICBpZiAodGhpcy5fQnRuID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBJdGVtSWR4KGlkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fSXRlbUlkeCA9IGlkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IEltZygpOiBMYXlhLkltYWdlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSW1nO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBCdXlCdG4oKTogTGF5YS5CdXR0b24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9CdG47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IEJ0bkxhYmxlKHN0cjpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXN0cilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX0J0bi50ZXh0LnRleHQgPSBzdHI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IElzR3JheSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuSW1nLmdyYXkgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgSXNHcmF5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkltZy5ncmF5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBOdW0obnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fTGFiZWxTdHJpbmdbMV0gPSBcIlwiICsgbnVtO1xyXG4gICAgICAgIHRoaXMubV9OdW1MYWJlbC50ZXh0ID0gdGhpcy5tX0xhYmVsU3RyaW5nWzBdICsgdGhpcy5tX0xhYmVsU3RyaW5nWzFdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBQcmljZShudW06IG51bWJlcikgIHtcclxuICAgICAgICB0aGlzLl9CdG4udGV4dC50ZXh0ID0gXCJcIiArIG51bTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgSW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9JbWcgPSB0aGlzLmdldENoaWxkQXQoMCkgYXMgTGF5YS5JbWFnZTtcclxuICAgICAgICB0aGlzLl9CdG4gPSB0aGlzLmdldENoaWxkQXQoMSkgYXMgTGF5YS5CdXR0b247XHJcbiAgICAgICAgdGhpcy5tX051bUxhYmVsID0gdGhpcy5nZXRDaGlsZEF0KDIpIGFzIExheWEuTGFiZWw7XHJcbiAgICAgICAgdGhpcy5fQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQnV5SXRlbSk7XHJcbiAgICAgICAgdGhpcy5fSW1nLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQ2hvb3NlSW1nKTtcclxuICAgICAgICBpZiAoIXRoaXMubV9MYWJlbFN0cmluZykgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0xhYmVsU3RyaW5nID0gdGhpcy5tX051bUxhYmVsLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2hvb3NlSW1nKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQ2hvb3NlSXRlbSlcclxuICAgICAgICAgICAgdGhpcy5tX0Nob29zZUl0ZW0uRXhlY3V0ZSh0aGlzLm1fSXRlbUlkeCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJ1eUl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9CdXlJdGVtKVxyXG4gICAgICAgICAgICB0aGlzLm1fQnV5SXRlbS5FeGVjdXRlKHRoaXMubV9JdGVtSWR4KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0QnV5KG93bmVyOiBhbnksIGxpc3RlbmVyOiAoaWQ6IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciBuZXdEZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fQnV5SXRlbSA9IG5ld0RlbGVnYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RDaG9vc2Uob3duZXI6IGFueSwgbGlzdGVuZXI6IChpZDogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdmFyIG5ld0RlbGVnYXRlID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZShvd25lciwgbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubV9DaG9vc2VJdGVtID0gbmV3RGVsZWdhdGU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlRWxlbWVudCBleHRlbmRzIExheWEuSW1hZ2Uge1xyXG4gICAgLy9cclxuICAgIHByaXZhdGUgX0J0bjogTGF5YS5CdXR0b247XHJcbiAgICBwcml2YXRlIF9JbWc6IExheWEuSW1hZ2U7XHJcbiAgICBwcml2YXRlIG1fT25DbGlja0ltZzooaWQ6bnVtYmVyKT0+dm9pZDtcclxuICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJJRDpudW1iZXI7XHJcbiAgICBnZXQgQnRuKCk6IExheWEuQnV0dG9uIHtcclxuICAgICAgICBpZiAodGhpcy5fQnRuID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgICAgICB0aGlzLl9CdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNldFBsYXllcklEKHRoaXMubV9DaGFyYWN0ZXJJRCk7XHJcbiAgICAgICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlQ3VyVmlldygpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG5cclxuICAgIFJlc2V0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fSW1nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRHcmF5KGlzR3JheTpib29sZWFuKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0ltZy5ncmF5ID0gaXNHcmF5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RPbkltZ0NsaWNrKGV2ZW50RnVuY3Rpb246KCk9PnZvaWQpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGlkPXRoaXMubV9DaGFyYWN0ZXJJRDtcclxuICAgICAgICB0aGlzLl9JbWcub24oTGF5YS5FdmVudC5DTElDSyxudWxsLGV2ZW50RnVuY3Rpb24pOy8vIG93bmVyLCAoKT0+eyBldmVudEZ1bmN0aW9uKGlkKSB9IClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IENoYXJhY3RlcklEKGlkOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQ2hhcmFjdGVySUQgPSBpZDtcclxuICAgIH1cclxuICAgIEluaXQoKSAge1xyXG4gICAgICAgIHRoaXMuX0ltZyA9IHRoaXMuZ2V0Q2hpbGRBdCgwKSBhcyBMYXlhLkltYWdlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydHtCYXNlRnVuY30gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRnVuY1wiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCR1VJIGV4dGVuZHMgdWkuQkdVSSB7XHJcbiAgICBcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiQkdcIikpKTtcclxuICAgIH1cclxuICAgIC8vcHJpdmF0ZSBfU2t5QXJyOkFycmF5PExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1NreVF1ZTpCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+O1xyXG4gICAgcHJpdmF0ZSBfVGVtcFNreVF1ZTpCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+O1xyXG4gICAgcHJpdmF0ZSBfU2NhbGVTa3k6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfU2NhbGVFYXJ0aDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9FYXJ0aFN0YXJ0UFM6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgYmc6IExheWEuSW1hZ2U7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciB3aWRoID0gTGF5YS5zdGFnZS53aWR0aCA7XHJcbiAgICAgICAgdmFyIHJhdGUgPSBNYXRoLmNlaWwoTGF5YS5zdGFnZS5oZWlnaHQvd2lkaCk7XHJcblxyXG4gICAgICAgIHRoaXMuX1NreVF1ZSA9IG5ldyBCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+KCk7XHJcbiAgICAgICAgdGhpcy5fVGVtcFNreVF1ZSA9IG5ldyBCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+KCk7XHJcbiAgICAgICAgIC8vbmV3IEFycmF5PExheWEuSW1hZ2U+KHJhdGUrMSk7XHJcbiAgICAgICAgZm9yKGxldCBzdGFydElkeCA9IDA7c3RhcnRJZHg8cmF0ZSsxOyArK3N0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZTpMYXlhLkltYWdlID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgICAgICAgICAgLy9pbWFnZS5sb2FkSW1hZ2UoXCJjb21wL2ltZ19iYWNrZ3JvdW5kX3Nwcl9za3kucG5nXCIpO1xyXG4gICAgICAgICAgICBpbWFnZS5sb2FkSW1hZ2UoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyBcIm1haW5iZy5qcGdcIik7XHJcbiAgICAgICAgICAgIGltYWdlLndpZHRoID0gd2lkaDtcclxuICAgICAgICAgICAgaW1hZ2UuaGVpZ2h0ID0gd2lkaCt3aWRoKjAuMDE7XHJcbiAgICAgICAgICAgIGltYWdlLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGltYWdlKTtcclxuICAgICAgICAgICAgdGhpcy5iZyA9IGltYWdlO1xyXG4gICAgICAgICAgICAvL3RoaXMuX1NreVF1ZS5QdXNoKGltYWdlKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIHRoaXMuU2V0U2t5KDApO1xyXG4gICAgICAgIHZhciBlYXJ0aCA9IG5ldyBMYXlhLkltYWdlKCk7XHJcbiAgICAgICAgZWFydGgueSA9IExheWEuc3RhZ2UuaGVpZ2h0IC0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9FYXJ0aFN0YXJ0UFMgPSBlYXJ0aC55O1xyXG4gICAgICAgIC8vZWFydGgubG9hZEltYWdlKFwiY29tcC9pbWdfYmFja2dyb3VuZF9zcHIucG5nXCIpO1xyXG4gICAgICAgIGVhcnRoLmxvYWRJbWFnZShQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIFwibWFpbmJnLmpwZ1wiKTtcclxuICAgICAgICB0aGlzLl9FYXJ0aCA9IGVhcnRoO1xyXG4gICAgICAgIGVhcnRoLndpZHRoID0gd2lkaDtcclxuICAgICAgICBlYXJ0aC5oZWlnaHQgPSB3aWRoO1xyXG5cclxuICAgICAgICAvL3RoaXMuYWRkQ2hpbGQoZWFydGgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1NjYWxlU2t5ID0gMC4wMDFcclxuICAgICAgICB0aGlzLl9TY2FsZUVhcnRoID0gMC4wMVxyXG4gICAgICAgIC8vdGhpcy5fRWFydGhTdGFydFBTID0gdGhpcy5fRWFydGgueTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgdXBhdGVCZ1RleHR1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5iZy5sb2FkSW1hZ2UoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyBcIm1haW5iZy5qcGdcIilcclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgZm9yKGxldCBzdGFydElkeDpudW1iZXIgPSAwO3N0YXJ0SWR4PHRoaXMuX1NreVF1ZS5Db3VudDsrK3N0YXJ0SWR4IClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1NreUFycltzdGFydElkeF0ueSA9IHN0YXJ0SWR4ICogaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9FYXJ0aC55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0VhcnRoU3RhcnRQUyA9IHRoaXMuX0VhcnRoLnk7XHJcbiAgICB9Ki9cclxuICAgIC8v6auY5bqm6L2s5bGP5bmV6auY5bqm5YOP57SgXHJcbiAgICBIZWlnaHRUcmFuc1BpeCggaGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gaGVpZ2h0Ki0wLjE7XHJcbiAgICB9XHJcbiAgICBTZXRTa3kocGl4SGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT4gPSB0aGlzLl9UZW1wU2t5UXVlO1xyXG4gICAgICAgIHRlbVNreVF1ZS5DbGVhcigpO1xyXG4gICAgICAgIHZhciBjb3VudDpudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHdoaWxlKHRoaXMuX1NreVF1ZS5Db3VudD4wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6QmFzZUZ1bmMuTm9kZTxMYXlhLlNwcml0ZT4gPSB0aGlzLl9Ta3lRdWUuUG9wTm9kZSgpO1xyXG4gICAgICAgICAgICB2YXIgc2t5SW1nOkxheWEuU3ByaXRlID0gbm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgc2t5SW1nLnkgPSBjb3VudCAqIGhlaWdodCArIHBpeEhlaWdodCAtIGhlaWdodCAtIGhlaWdodCowLjAxO1xyXG4gICAgICAgICAgICB0ZW1Ta3lRdWUuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgICAgIGlmKHNreUltZy55PkxheWEuc3RhZ2UuaGVpZ2h0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBza3lJbWcueSA9IHRlbVNreVF1ZS5IZWFkVmFsdWUueSAtIGhlaWdodDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICArK2NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9UZW1wU2t5UXVlID0gdGhpcy5fU2t5UXVlO1xyXG4gICAgICAgIHRoaXMuX1NreVF1ZSA9IHRlbVNreVF1ZTtcclxuICAgIH1cclxuICAgIFNldEVhcnRoKGhlaWdodDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRWFydGgueSA9IHRoaXMuX0VhcnRoU3RhcnRQUyArIGhlaWdodDtcclxuICAgIH1cclxuICAgIFVwZGF0ZVBhZ2UoIGhlaWdodDpudW1iZXIgKVxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgLy9oZWlnaHQgPSB0aGlzLkhlaWdodFRyYW5zUGl4KGhlaWdodCk7XHJcbiAgICAgICAgLy92YXIgc2t5SGVpZ2h0UGl4ID0gaGVpZ2h0KnRoaXMuX1NjYWxlU2t5O1xyXG4gICAgICAgIHRoaXMuU2V0U2t5KGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5TZXRFYXJ0aChoZWlnaHQpO1xyXG4gICAgICAgIC8vdmFyIGVhcnRoSGVpZ2h0UGl4ID0gaGVpZ2h0O1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge1VJRnVuY30gZnJvbSBcIi4vLi4vVXRpbGl0eS9VSUZ1bmNcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5cclxuLy9VSeWfuuexu1xyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBCYXNlVUkgZXh0ZW5kcyBMYXlhLkJveFxyXG57XHJcbiAgICBcclxuICAgIFxyXG4gICAgLy9cclxuICAgIHByb3RlY3RlZCBfVUlUeXBlOkJhc2VFbnVtLlVJVHlwZUVudW07XHJcbiAgICBwcm90ZWN0ZWQgX0lzTXV0ZXg6Ym9vbGVhbjtcclxuICAgIHByb3RlY3RlZCBfTmFtZTpzdHJpbmc7ICAgIFxyXG4gICAgcHJvdGVjdGVkIF9VSU1hbmFnZXI6VUlNYW5hZ2VyXHJcbiAgICBwcml2YXRlIF9EaXJ0eTpib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfU2hvd2luZzpib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLkxvdztcclxuICAgICAgICB0aGlzLl9Jc011dGV4ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fVUlNYW5hZ2VyID0gRlcuRk0uR2V0TWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgdGhpcy5fU2hvd2luZyA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy5sZWZ0ID0gMDtcclxuXHQgICAgLy8gdGhpcy5yaWdodCA9IDA7XHJcblx0XHQvLyB0aGlzLmJvdHRvbSA9IDA7XHJcbiAgICAgICAgLy8gdGhpcy50b3AgPSAwO1xyXG4gICAgfVxyXG4gICAgSGlkZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgT3BlbigpXHJcbiAgICB7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIE9wZW5PUCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLk9wZW4oKTtcclxuICAgIH1cclxuICAgIENsb3NlT1AoKVxyXG4gICAge1xyXG4gICAgICAgIC8vdGhpcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5DbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIERlc3Ryb3koIClcclxuICAgIHtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgVUlUeXBlKCk6QmFzZUVudW0uVUlUeXBlRW51bVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9VSVR5cGU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBJc011dGV4KCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Jc011dGV4O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX05hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFNob3dpbmcoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1Nob3dpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7lVSei/m+ihjOmAgumFjVxyXG4gICAgICogQHBhcmFtIFVJIOmAgumFjVVJXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBGaXhVSShVSTpMYXlhLlZpZXcpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChVSSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgU2V0RGlydHkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0RpcnR5ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IERpcnR5KCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9EaXJ0eTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2xlYXJEaXJ0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIFVJVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX0RpcnR5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5DbGVhckRpcnR5KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgVXBkYXRlKCk6dm9pZDtcclxufSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiO1xyXG5pbXBvcnQgRlcgZnJvbSBcIi4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuaW1wb3J0IFJvbGVFbGVtZW50IGZyb20gXCIuLy4uL3NjcmlwdC9Sb2xlRWxlbWVudFwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiIFxyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVBUFBcIjtcclxuaW1wb3J0IEVudGVyR2FtZVVJIGZyb20gXCIuL0VudGVyR2FtZVVJXCI7XHJcbmltcG9ydCBDaGFyYWN0ZXJVSVNjZW5lIGZyb20gXCIuLi9TY2VuZS9DaGFyYWN0ZXJVSVNjZW5lXCI7XHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vRW5kR2FtZVVJXCI7XHJcbmltcG9ydCBDaGFyYWN0ZXJNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4uL0dhbWVNYW5hZ2VyL0dhbWVNYW5hZ2VyXCI7XHJcblxyXG5jbGFzcyBFeHRlbmRDaGFyYWN0ZXJzVUkgZXh0ZW5kcyB1aS5DaGFyYWN0ZXJVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkNoYXJhY3RlclwiKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RlclVJIGV4dGVuZHMgQmFzZVVJIHtcclxuXHJcbiAgICBwcml2YXRlIG1fQ2hhcmFjdGVyTGlzdDogQXJyYXk8YW55PjtcclxuICAgIHByaXZhdGUgbV9Hb2xkRGlzY3JpYmU6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBzcHJpdGVCZ0FycjpMYXlhLlNwcml0ZVtdID0gW107XHJcbiAgICBwcml2YXRlIGNoYXJhY3RlclVJU2NlbmU6Q2hhcmFjdGVyVUlTY2VuZTtcclxuICAgIHByaXZhdGUgY250Q2hhcmFjdGVySWQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfVUk6IEV4dGVuZENoYXJhY3RlcnNVSTtcclxuXHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJtYWluYmcuanBnXCJ9XHJcblxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJidG5cIjpcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIHtrZXk6XCJiYWNrQnRuXCIsdGV4dHVyZU5hbWU6XCJiYWNrLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImJ1eUJ0blwiLHRleHR1cmVOYW1lOlwiYnV5LnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcInN0YXJ0R2FtZVwiLHRleHR1cmVOYW1lOlwic3RhcnQucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiY2hhcmFjdGVycm9sZTBiZ1wiLHRleHR1cmVOYW1lOlwicm9sZWJnY2lyY2xlLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImNoYXJhY3RlcnJvbGUxYmdcIix0ZXh0dXJlTmFtZTpcInJvbGViZ2NpcmNsZS5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJjaGFyYWN0ZXJyb2xlMmJnXCIsdGV4dHVyZU5hbWU6XCJyb2xlYmdjaXJjbGUucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiY2hhcmFjdGVycm9sZTNiZ1wiLHRleHR1cmVOYW1lOlwicm9sZWJnY2lyY2xlLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImNoYXJhY3RlcnJvbGU0YmdcIix0ZXh0dXJlTmFtZTpcInJvbGViZ2NpcmNsZS5wbmdcIn1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZENoYXJhY3RlcnNVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuR2V0Q2hhcmFjdGVyTGlzdCgpO1xyXG4gICAgICAgIC8vdGhpcy5TZXRMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBbXTtcclxuICAgICAgICAvL3RoaXMubV9Hb2xkRGlzY3JpYmUgPSB0aGlzLl9VSS5fR29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLk9uTW9uZXlDaGFuZ2UoKTtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC5zdHJva2UgPSAyO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnN0cm9rZUNvbG9yID0gXCIweGZmMDAwMFwiO1xyXG5cclxuICAgICAgICB0aGlzLl9VSS5iYWNrQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQmFja0dhbWVCdG4pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVCZ0Fyci5wdXNoKHRoaXMuX1VJLmNoYXJhY3RlcnJvbGUwYmcpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQmdBcnIucHVzaCh0aGlzLl9VSS5jaGFyYWN0ZXJyb2xlMWJnKTtcclxuICAgICAgICB0aGlzLnNwcml0ZUJnQXJyLnB1c2godGhpcy5fVUkuY2hhcmFjdGVycm9sZTJiZyk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVCZ0Fyci5wdXNoKHRoaXMuX1VJLmNoYXJhY3RlcnJvbGUzYmcpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQmdBcnIucHVzaCh0aGlzLl9VSS5jaGFyYWN0ZXJyb2xlNGJnKTtcclxuXHJcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuc3ByaXRlQmdBcnIubGVuZ3RoO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLm5hbWUgPSBpICsgXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLnNlbGVjdFJvbGVQb3NpdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY250Q2hhcmFjdGVySWQgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNudENoYXJhY3RlcklkKTtcclxuXHJcbiAgICAgICAgdGhpcy5fVUkuc3RhcnRHYW1lLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuc3RhcnRFdmVudCk7XHJcbiAgICAgICAgdGhpcy5fVUkuYnV5QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuT25DbGlja0ltZyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGZTY2VuZVVJKCkge1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmNvbmZpZ1trZXldLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYoa2V5ID09IFwiaW1nXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLmxvYWRJbWFnZShQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoa2V5ID09IFwiYnRuXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLnNraW4gPSAoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGFydEV2ZW50KCk6IHZvaWQge1xyXG4gICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRQbGF5ZXJJRCh0aGlzLmNoYXJhY3RlclVJU2NlbmUuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2UodGhpcyk7XHJcbiAgICAgICAgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrSXNMb2NrKGlkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIGlmKGNoYXJhY3RlcltpZF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVSb2xlSW5mbyhpZCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tJc0xvY2soaWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLnN0YXJ0R2FtZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkuYnV5QnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkuZ29sZGltZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLnJvbGV1c2VOb25leS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkucm9sZXVzZU5vbmV5LnRleHQgPSBcIuW3suino+mUgVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuc3RhcnRHYW1lLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkuYnV5QnRuLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5nb2xkaW1nLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLnJvbGV1c2VOb25leS50ZXh0ID0gQ2hhcmFjdGVyTWFuYWdlci5NZ3IuR2V0UHJpY2UodGhpcy5jbnRDaGFyYWN0ZXJJZCkgKyBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5yb2xlTmFtZS50ZXh0ID0gQ2hhcmFjdGVyTWFuYWdlci5NZ3IuR2V0TmFtZShpZCk7XHJcbiAgICAgICAgdGhpcy5fVUkuZGVzYy50ZXh0ID0gQ2hhcmFjdGVyTWFuYWdlci5NZ3IuR2V0RGVzYyhpZCk7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dvbGQudGV4dCA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leSArIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0Um9sZVBvc2l0aW9uKGU6TGF5YS5FdmVudCk6IHZvaWQgeyBcclxuICAgICAgICB2YXIgY250VGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlclVJU2NlbmUgfHwgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4ID09IHBhcnNlSW50KGNudFRhcmdldC5uYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1VJLnN0YXJ0R2FtZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuYnV5QnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9VSS5nb2xkaW1nLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUudXBkYXRlU2VsZWN0SW5kZXgocGFyc2VJbnQoY250VGFyZ2V0Lm5hbWUpKTtcclxuICAgICAgICB0aGlzLkluaXRQb3NpdGlvbihudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBJbml0UG9zaXRpb24oZGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlclVJU2NlbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250Q2hhcmFjdGVySWQgPSB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY250U2VsZWN0SW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9sZUluZm8odGhpcy5jbnRDaGFyYWN0ZXJJZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG51bSA9IHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5hcnJheURpcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbnVtO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIF9vdXRQb3M6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY2FtZXJhLnZpZXdwb3J0LnByb2plY3QodGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmFycmF5RGlzW2ldLnRyYW5zZm9ybS5wb3NpdGlvbiwgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNhbWVyYS5wcm9qZWN0aW9uVmlld01hdHJpeCwgX291dFBvcyk7XHJcbiAgICAgICAgICAgIHZhciBfb3V0UG9zMSA9IG5ldyBMYXlhLlBvaW50KF9vdXRQb3MueCwgX291dFBvcy55KTtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0YmcuZ2xvYmFsVG9Mb2NhbChfb3V0UG9zMSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0ucG9zKF9vdXRQb3MxLnggLyBMYXlhLnN0YWdlLmNsaWVudFNjYWxlWCwgX291dFBvczEueSAvIExheWEuc3RhZ2UuY2xpZW50U2NhbGVZKTtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS5waXZvdFggPSAyMDcgLyAyO1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLnBpdm90WSA9IHRoaXMuc3ByaXRlQmdBcnJbaV0uaGVpZ2h0IC0gNTtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0uc2NhbGVYID0gMC44ICsgKCh0aGlzLmNoYXJhY3RlclVJU2NlbmUuYXJyYXlEaXNbaV0udHJhbnNmb3JtLmxvY2FsU2NhbGVYIC0gdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmluaXRTY2FsTnVtKSAvIDAuMDA0KSAqIDAuMjtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS5zY2FsZVkgPSAwLjggKyAoKHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5hcnJheURpc1tpXS50cmFuc2Zvcm0ubG9jYWxTY2FsZVggLSB0aGlzLmNoYXJhY3RlclVJU2NlbmUuaW5pdFNjYWxOdW0pIC8gMC4wMDQpICogMC4yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBCYWNrR2FtZUJ0bigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0b3BSb2F0ZVRpbWVyKCk7XHJcbiAgICAgICAgdmFyIGVudGVycGFuZWw6RW50ZXJHYW1lVUkgPSBBUFAuVUlNYW5hZ2VyLkdldFVJQnlOYW1lKFwiRW50ZXJHYW1lVUlcIikgYXMgRW50ZXJHYW1lVUk7XHJcbiAgICAgICAgZW50ZXJwYW5lbC5fVUkueSA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIExheWEuVHdlZW4udG8oZW50ZXJwYW5lbC5fVUksIHt5OiAwfSwgNTAwLCBMYXlhLkVhc2Uuc2luZU91dCk7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLCB7eTogLUxheWEuc3RhZ2UuaGVpZ2h0fSwgNTAwLCBMYXlhLkVhc2Uuc2luZU91dCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKT0+e1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLl9VSS5yZW1vdmVDaGlsZCh0aGlzLmNoYXJhY3RlclVJU2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3BSb2F0ZVRpbWVyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY2hhcmFjdGVyVUlTY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY2xlYXJSb2F0ZVRpbWVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiQ2hhcmFjdGVyVUlcIjtcclxuICAgIH1cclxuXHJcbiAgICBHZXRDaGFyYWN0ZXJMaXN0KCkgIHtcclxuICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdCA9IEdhbWVBUFAuQ2hhcmFjdGVyTWdyLkdldElETGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpIHtcclxuICAgICAgICBzdXBlci5MYXlvdXQoKTtcclxuICAgICAgICBpZighdGhpcy5fVUkgfHwgIXRoaXMuX1VJLmJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuYmcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX1VJLmJnLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG5cclxuICAgICAgICB2YXIgc2NhbGVYID0gTGF5YS5zdGFnZS53aWR0aCAvIExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHZhciBzY2FsZVkgPSA3NTAgLyAxMzM0O1xyXG4gICAgICAgIGlmKHNjYWxlWCA+IHNjYWxlWSkge1xyXG4gICAgICAgICAgICBzY2FsZVkgPSBzY2FsZVkgLyBzY2FsZVg7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmxheW91dGJnLnBpdm90WCA9IDc1MCAvIDI7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmxheW91dGJnLnBpdm90WSA9IDEzMzQgLyAyO1xyXG4gICAgICAgICAgICB2YXIgX291dFBvczpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jYW1lcmEudmlld3BvcnQucHJvamVjdChuZXcgTGF5YS5WZWN0b3IzKDAsIC10aGlzLmNoYXJhY3RlclVJU2NlbmUuc3RhcnRZIC0gMC4wMSwgMCksIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jYW1lcmEucHJvamVjdGlvblZpZXdNYXRyaXgsIF9vdXRQb3MpO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5sYXlvdXRiZy54ID0gX291dFBvcy54O1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5sYXlvdXRiZy55ID0gX291dFBvcy55O1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5sYXlvdXRiZy5zY2FsZVggPSB0aGlzLl9VSS5sYXlvdXRiZy5zY2FsZVkgPSBzY2FsZVk7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdFBvc2l0aW9uKG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoKSB7ICBcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIE9wZW4oKSAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VyQ2hhcmFjdGVySURDaGFuZ2UsIHRoaXMuT25OZWVkQ2xvc2VVSSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSwgdGhpcy5Pbk1vbmV5Q2hhbmdlLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5PbkNoYXJhY3Rlckxpc3RDaGFuZ2UsIHRoaXMuT25DaGFuZ2VMaXN0LCB0aGlzKTtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUgPSBuZXcgQ2hhcmFjdGVyVUlTY2VuZSh0aGlzLmNudENoYXJhY3RlcklkICwgdGhpcy5Jbml0UG9zaXRpb24uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgdGhpcy5fVUkuYWRkQ2hpbGQodGhpcy5jaGFyYWN0ZXJVSVNjZW5lKTtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBsZW4gPSB0aGlzLnNwcml0ZUJnQXJyLmxlbmd0aDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkluaXRQb3NpdGlvbigpO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSwgNTEwKTtcclxuICAgICAgICB0aGlzLkxheW91dCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZSgpICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJDaGFyYWN0ZXJJRENoYW5nZSwgdGhpcy5Pbk5lZWRDbG9zZVVJLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLCB0aGlzLk9uTW9uZXlDaGFuZ2UsIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSwgdGhpcy5PbkNoYW5nZUxpc3QsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5LqL5Lu2XHJcbiAgICBwcml2YXRlIE9uQ2xpY2tJbWcoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrSXNMb2NrKHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jbnRTZWxlY3RJbmRleCkpICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5CYWNrR2FtZUJ0bigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRQbGF5ZXJJRCh0aGlzLmNoYXJhY3RlclVJU2NlbmUuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuT25Nb25leUNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUm9sZUluZm8odGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uTmVlZENsb3NlVUkoKTogdm9pZCAge1xyXG4gICAgICAgIGlmICghdGhpcy5TaG93aW5nKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQmFja0dhbWVCdG4oKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uQ2hhbmdlTGlzdCgpICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QucmVmcmVzaCgpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbk1vbmV5Q2hhbmdlKCkgIHtcclxuICAgICAgICBpZiAoIXRoaXMuU2hvd2luZykgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMubV9Hb2xkRGlzY3JpYmVbMV0gPSBcIlwiICsgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5O1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX0dvbGQudGV4dCA9IHRoaXMubV9Hb2xkRGlzY3JpYmVbMF0gKyB0aGlzLm1fR29sZERpc2NyaWJlWzFdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnRleHQgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXkgKyBcIlwiO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnN0cm9rZSA9IDI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dvbGQuc3Ryb2tlQ29sb3IgPSBcIjB4ZmYwMDAwXCI7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7dWl9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IHtHYW1lU3RydWN0IH0gIGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuXHJcbmNsYXNzIEV4dGVuZEVuZEdhbWVVSSBleHRlbmRzIHVpLkVuZEdhbWVVSSB7XHJcbiAgICBQYW5lbDpMYXlhLlBhbmVsO1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJFbmRHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL3RoaXMuUGFuZWwgPSB0aGlzLlBhbmVsO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbC52U2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9NZW51ZUJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLEd1aWRlck1hbmFnZXIuTWdyLEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuX1NldEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dTZXRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRCdG4ub24oTGF5YS5FdmVudC5DTElDSyxDb250cm9sZXIuR2FtZUNvbnRyb2xlcixDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmRHYW1lVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJFbmRHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIFVJOkV4dGVuZEVuZEdhbWVVSTtcclxuXHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJtYWluYmcuanBnXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiZW5kZ2FtZXRpdGxlXCIsdGV4dHVyZU5hbWU6XCJlbmRnYW1lZGFpemkucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiZW5kZ2FtZWhlbnRpYW9cIix0ZXh0dXJlTmFtZTpcImluZm90aWFvLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImVuZGdhbWViZ2ljb25cIix0ZXh0dXJlTmFtZTpcImlucHV0dGV4dGFyZWEucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiZGliZ1wiLHRleHR1cmVOYW1lOlwiaW5wdXR0ZXh0YXJlYS5wbmdcIn1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnRuXCI6XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7a2V5OlwiX1N0YXJ0QnRuXCIsdGV4dHVyZU5hbWU6XCJyZXN0YXJ0LnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcIl9NZW51ZUJ0blwiLHRleHR1cmVOYW1lOlwiaG9tZUJ0bi5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJfU2V0QnRuXCIsdGV4dHVyZU5hbWU6XCJzZXR0aW5nLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcIl9QbGF5ZXJMaXN0QnRuXCIsdGV4dHVyZU5hbWU6XCJwYWloYW5nLnBuZ1wifVxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlU2VsZlNjZW5lVUkoKSB7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5jb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuY29uZmlnW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihrZXkgPT0gXCJpbWdcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLmxvYWRJbWFnZShQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoa2V5ID09IFwiYnRuXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uc2tpbiA9IChQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuVUk9IG5ldyBFeHRlbmRFbmRHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuVUkpO1xyXG4gICAgICAgIC8vdGhpcy5VSS5fQ2hhcmFjdGVyTGlzdC5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsKCk9PnsgdGhpcy5fVUlNYW5hZ2VyLlNob3c8UGxheWVyTGlzdFVJPihQbGF5ZXJMaXN0VUkpfSk7XHJcbiAgICAgICAgdGhpcy5MYXlvdXQoKTtcclxuICAgICAgICB0aGlzLlVJLmRpc3RhbmNlLnRleHQgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5EaXN0YW5jZSArIFwiXCI7XHJcbiAgICAgICAgdGhpcy5VSS5nb2xkLnRleHQgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HYW1lR29sZCArIFwiXCI7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgT3BlbigpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGZTY2VuZVVJKCk7XHJcbiAgICB9XHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgc3VwZXIuTGF5b3V0KCk7XHJcbiAgICAgICAgaWYoIXRoaXMuVUkgfHwgIXRoaXMuVUkuYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlVJLmJnLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLlVJLmJnLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgRk0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBQbGF5ZXJMaXN0VUkgZnJvbSBcIi4vLi4vdWkvUGxheWVyTGlzdFVJXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgeyBHYW1lQWdlbnQgfSBmcm9tIFwiLi8uLi9BZ2VudC9HYW1lQWdlbnRcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiO1xyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuL0VuZEdhbWVVSVwiO1xyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5cclxuY2xhc3MgRXh0ZW5kRW50ZXJHYW1lVUkgZXh0ZW5kcyB1aS5FbnRlclVJIHtcclxuICAgIFBhbmVsOiBMYXlhLlBhbmVsO1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvLyB0aGlzLlBhbmVsID0gdGhpcy5fUGFuZWw7XHJcbiAgICAgICAgLy8gdGhpcy5QYW5lbC52U2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgLy8gdGhpcy5QYW5lbC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fQ2hhcmFjdGVyLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuU2hvd0NoYXJhY3RlclBhbmVsKTtcclxuICAgICAgICAvL3RoaXMuX0NoYXJhY3Rlci5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLnNob3dDaGFyYWN0ZXIpO1xyXG4gICAgICAgIHRoaXMuX1NldFBhbmVsLm9uKExheWEuRXZlbnQuQ0xJQ0ssIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlciwgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dTZXRQYW5lbCk7XHJcbiAgICAgICAgLy90aGlzLl9SYW5rLm9uKExheWEuRXZlbnQuQ0xJQ0ssIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlciwgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dSYW5rUGFuZWwpO1xyXG4gICAgICAgIC8vdGhpcy5fU3RhcnQub24oTGF5YS5FdmVudC5DTElDSywgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuRW50ZXJHYW1lKTtcclxuICAgICAgICB0aGlzLl9TdGFydC5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLm9uU3RhcnQpO1xyXG5cclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXJMaXN0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAvL3RoaXMuUGFuZWwudmlzaWJsZSA9IGZhbHNlOyBcclxuICAgICAgICB0aGlzLl9TdGFydFtcImluaXRYXCJdID0gdGhpcy5fU3RhcnQueDtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXJbXCJpbml0WVwiXSA9IHRoaXMuX0NoYXJhY3Rlci55O1xyXG4gICAgfVxyXG5cclxuICAgIFNob3dDaGFyYWN0ZXJQYW5lbCgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbm9kZSA9IEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TaG93Q2hhcmFjdGVyUGFuZWwoKTtcclxuICAgICAgICBub2RlLnkgPSAtTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byhub2RlLCB7eTogMH0sIDUwMCwgTGF5YS5FYXNlLnNpbmVPdXQpO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcywge3k6IExheWEuc3RhZ2UuaGVpZ2h0fSwgNTAwLCBMYXlhLkVhc2Uuc2luZU91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25TdGFydCgpOnZvaWQge1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fUmFuaywge3k6dGhpcy5fUmFuay55ICsgTGF5YS5zdGFnZS5oZWlnaHQgLSB0aGlzLl9DaGFyYWN0ZXIueX0sIDE1MCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLl9TZXRQYW5lbCwge3k6dGhpcy5fU2V0UGFuZWwueSAgKyBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX0NoYXJhY3Rlci55fSwgMTUwLCBMYXlhLkVhc2Uuc2luZUluKTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX1N0YXJ0LCB7eDp0aGlzLl9TdGFydC55ICArIExheWEuc3RhZ2Uud2lkdGggLSB0aGlzLl9TdGFydC54fSwgMjUwLCBMYXlhLkVhc2Uuc2luZUluLCBMYXlhLkhhbmRsZXIuY3JlYXRlKEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlciwgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSkpO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fQ2hhcmFjdGVyLCB7eTp0aGlzLl9DaGFyYWN0ZXIueSAgLSBMYXlhLnN0YWdlLmhlaWdodH0sIDE1MCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLmFkdiwge3k6dGhpcy5hZHYueSAgKyBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX0NoYXJhY3Rlci55fSwgMTUwLCBMYXlhLkVhc2Uuc2luZUluKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkJHW1widXBhdGVCZ1RleHR1cmVcIl0oKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50ZXJHYW1lVUkgZXh0ZW5kcyBCYXNlVUkge1xyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJFbnRlckdhbWVVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIF9nazpMYXlhLlNwcml0ZTtcclxuICAgIF9na0NvbnRlbnQ6TGF5YS5TcHJpdGU7XHJcbiAgICBfVUk6IEV4dGVuZEVudGVyR2FtZVVJO1xyXG4gICAgbGFzdFg6bnVtYmVyID0gOTk5OTk7XHJcbiAgICBvZmZlc3RYOm51bWJlciA9IDA7XHJcbiAgICBjbnRTZWxlY3RJbmRleDpudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBjb25maWcgPSB7XCJpbWdcIjpcclxuICAgICAgICBbICAgXHJcbiAgICAgICAgICAgIHtrZXk6XCJiZ1wiLHRleHR1cmVOYW1lOlwibG9hZGJnc3RhcnQucG5nXCJ9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcIl9DaGFyYWN0ZXJcIix0ZXh0dXJlTmFtZTpcInJvbGUucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiX1N0YXJ0XCIsdGV4dHVyZU5hbWU6XCJzdGFydC5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJfU2V0UGFuZWxcIix0ZXh0dXJlTmFtZTpcInNldHRpbmcucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiYWR2XCIsdGV4dHVyZU5hbWU6XCJhZC5wbmdcIn1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIHByaXZhdGUgbV9CdG5Hcm91cDogQXJyYXk8TGF5YS5JbWFnZT47XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRFbnRlckdhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHZhciB1aU1ncjogVUlNYW5hZ2VyID0gdGhpcy5fVUlNYW5hZ2VyO1xyXG4gICAgICAgIHRoaXMubV9CdG5Hcm91cCA9IFtdO1xyXG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5fVUkuX1BhbmVsLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKSBhcyBMYXlhLlNwcml0ZTtcclxuICAgICAgICB0aGlzLkxheW91dCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuICAgICAgICB0aGlzLl9nayA9IGNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy5fVUkuX1BhbmVsLm1vdXNlRW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fZ2subW91c2VFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkN1ckxldmVsIC0gMTtcclxuICAgICAgICB0aGlzLl9nay54ID0gLXRoaXMuY250U2VsZWN0SW5kZXggKiA2MzA7XHJcbiAgICAgICAgdGhpcy5pbml0R0tMaXN0ZW5lcigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgICBsYXlhLm1lZGlhLlNvdW5kTWFuYWdlci5wbGF5TXVzaWMocGF0aC5HZXRTb3VuZHBhdGhVSUpTKFwiYmdcIiksMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdEdLTGlzdGVuZXIoKSB7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fUGFuZWwub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLCB0aGlzLCB0aGlzLmRvd25HS0JveCk7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fUGFuZWwub24oTGF5YS5FdmVudC5NT1VTRV9NT1ZFLCB0aGlzLCB0aGlzLm1vdmVHS0JveCk7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fUGFuZWwub24oTGF5YS5FdmVudC5NT1VTRV9VUCwgdGhpcywgdGhpcy51cEdLQm94KTtcclxuICAgICAgICAvL3RoaXMuX1VJLl9QYW5lbC5vbihMYXlhLkV2ZW50Lk1PVVNFX09WRVIsIHRoaXMsIHRoaXMudXBHS0JveCk7XHJcbiAgICAgICAgdGhpcy5fVUkubGFzdEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLmxhc3RQYWdlKTtcclxuICAgICAgICB0aGlzLl9VSS5uZXh0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMubmV4dFBhZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUJ1dHRvblN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX1VJLmxhc3RCdG4udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkubmV4dEJ0bi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBpZih0aGlzLmNudFNlbGVjdEluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGFzdEJ0bi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMuY250U2VsZWN0SW5kZXggPT0gNCkge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5uZXh0QnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmV4dFBhZ2UoZTpMYXlhLkV2ZW50KSB7XHJcbiAgICAgICAgaWYodGhpcy5jbnRTZWxlY3RJbmRleCA8IDQpIHtcclxuICAgICAgICAgICAgTGF5YS5Ud2Vlbi5jbGVhclR3ZWVuKHRoaXMuX2drKTtcclxuICAgICAgICAgICAgdGhpcy5fZ2sueCA9IC10aGlzLmNudFNlbGVjdEluZGV4ICogNjMwO1xyXG4gICAgICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ICsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX2drLHt4Oi10aGlzLmNudFNlbGVjdEluZGV4ICogNjMwfSwyMDAsIExheWEuRWFzZS5zaW5lSW4pO1xyXG4gICAgICAgIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5DdXJMZXZlbCA9IHRoaXMuY250U2VsZWN0SW5kZXggKyAxO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGFzdFBhZ2UoZTpMYXlhLkV2ZW50KSB7XHJcbiAgICAgICAgaWYodGhpcy5jbnRTZWxlY3RJbmRleCA+IDApIHtcclxuICAgICAgICAgICAgTGF5YS5Ud2Vlbi5jbGVhclR3ZWVuKHRoaXMuX2drKTtcclxuICAgICAgICAgICAgdGhpcy5fZ2sueCA9IC10aGlzLmNudFNlbGVjdEluZGV4ICogNjMwO1xyXG4gICAgICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4IC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX2drLHt4Oi10aGlzLmNudFNlbGVjdEluZGV4ICogNjMwfSwyMDAsIExheWEuRWFzZS5zaW5lSW4pO1xyXG4gICAgICAgIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5DdXJMZXZlbCA9IHRoaXMuY250U2VsZWN0SW5kZXggKyAxO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUJ1dHRvblN0YXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZG93bkdLQm94KGU6TGF5YS5FdmVudCkge1xyXG4gICAgICAgIHRoaXMubGFzdFggPSBlLnRhcmdldC5tb3VzZVg7XHJcbiAgICB9XHJcblxyXG4gICAgbW92ZUdLQm94KGU6IExheWEuRXZlbnQpIHtcclxuICAgICAgICBpZih0aGlzLmxhc3RYID09IDk5OTk5IHx8IHRoaXMuX2drLnggPiAwIHx8IHRoaXMuX2drLnggPCAtNjMwICogNCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub2ZmZXN0WCA9IChlLnRhcmdldC5tb3VzZVggLSB0aGlzLmxhc3RYKTtcclxuICAgICAgICB0aGlzLl9nay54ICs9IHRoaXMub2ZmZXN0WDtcclxuICAgICAgICBpZih0aGlzLl9nay54ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9nay54ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5fZ2sueCA8IC00ICogNjMwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2drLnggPSAtNCAqIDYzMDsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdFggPSBlLnRhcmdldC5tb3VzZVg7XHJcbiAgICB9XHJcblxyXG4gICAgdXBHS0JveChlOiBMYXlhLkV2ZW50KSB7XHJcbiAgICAgICAgdmFyIG5leHRYID0gMDtcclxuICAgICAgICBpZihNYXRoLmFicyh0aGlzLm9mZmVzdFgpIDw9IDUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxhc3RYID0gOTk5OTk7XHJcbiAgICAgICAgaWYodGhpcy5vZmZlc3RYID4gMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9nay54IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbmV4dFggPSBNYXRoLmZsb29yKHRoaXMuX2drLnggLyA2MzApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5vZmZlc3RYIDwgMCkge1xyXG4gICAgICAgICAgICBpZih0aGlzLl9nay54ID4gLTQgKiA2MzApIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLl9naywge3g6bmV4dFh9LCBNYXRoLmFicyh0aGlzLm9mZmVzdFgpKTtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gLW5leHRYIC8gNjMwO1xyXG4gICAgICAgIHRoaXMub2ZmZXN0WCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaW5pdEdLKCkge1xyXG4gICAgLy8gICAgIGZvcih2YXIgaSA9IDE7aSA8PSA1O2kgKyspIHtcclxuICAgIC8vICAgICAgICAgdmFyIHNwciA9IG5ldyBMYXlhLkltYWdlKCk7XHJcbiAgICAvLyAgICAgICAgIHNwci5sb2FkSW1hZ2UoXCJlbnRlcnNjZW5ldWkvZ2svZ2tcIiArIGkgKyBcIi5wbmdcIik7XHJcbiAgICAvLyAgICAgICAgIHNwci54ID0gKGkgLSAxKSAqIDYzMDtcclxuICAgIC8vICAgICAgICAgdGhpcy5fZ2tDb250ZW50LmFkZENoaWxkKHNwcik7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIHVwZGF0ZVNlbGZTY2VuZVVJKCkge1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmNvbmZpZ1trZXldLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYoa2V5ID09IFwiaW1nXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLmxvYWRJbWFnZShQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoa2V5ID09IFwiYnRuXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLnNraW4gPSAoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIEluaXRCdG5Hcm91cCgpIHtcclxuICAgICAgICAvLyB2YXIgQ3VyTWF4TGV2ZWwgPSBHYW1lQWdlbnQuQWdlbnQuQ3VyTWF4TGV2ZWw7XHJcbiAgICAgICAgLy8gdmFyIGN1ckxldmVsID0gR2FtZUFnZW50LkFnZW50LkN1ckxldmVsO1xyXG4gICAgICAgIC8vIHZhciBidG5OdW0gPSB0aGlzLl9VSS5fR3JvdXAubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgLy8gdmFyIGdyb3VwID0gdGhpcy5tX0J0bkdyb3VwO1xyXG4gICAgICAgIC8vIGZvciAodmFyIGlkeCA9IDA7IGlkeCA8IGJ0bk51bTsgKytpZHgpIHtcclxuICAgICAgICAvLyAgICAgdmFyIGJ0bjogYW55ID0gdGhpcy5fVUkuX0dyb3VwLmdldENoaWxkQXQoaWR4KSBhcyBMYXlhLkltYWdlO1xyXG4gICAgICAgIC8vICAgICBidG4uaWR4ID0gaWR4O1xyXG4gICAgICAgIC8vICAgICBidG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5PbkNob29zZSlcclxuICAgICAgICAvLyAgICAgYnRuLmdyYXkgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICBncm91cC5wdXNoKGJ0bik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vZ3JvdXBbY3VyTGV2ZWxdLmdyYXkgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgT3BlbigpIHtcclxuICAgICAgICAvL3RoaXMuSW5pdEJ0bkdyb3VwKCk7XHJcbiAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICB0aGlzLl9VSS5fUmFuay55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSB0aGlzLl9VSS5fUmFuay5ib3R0b20gLSB0aGlzLl9VSS5hZHYuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX1VJLl9TZXRQYW5lbC55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSB0aGlzLl9VSS5fU2V0UGFuZWwuYm90dG9tIC0gdGhpcy5fVUkuYWR2LmhlaWdodDtcclxuICAgICAgICB0aGlzLl9VSS5hZHYueSA9IExheWEuc3RhZ2UuaGVpZ2h0IC0gdGhpcy5fVUkuYWR2LmJvdHRvbSAtIHRoaXMuX1VJLmFkdi5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fVUkuX1N0YXJ0LnggPSB0aGlzLl9VSS5fU3RhcnRbXCJpbml0WFwiXTtcclxuICAgICAgICB0aGlzLl9VSS5fQ2hhcmFjdGVyLnkgPSB0aGlzLl9VSS5fQ2hhcmFjdGVyW1wiaW5pdFlcIl07XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIHN1cGVyLkxheW91dCgpO1xyXG4gICAgICAgIGlmKCF0aGlzLl9VSSB8fCAhdGhpcy5fVUkuYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5iZy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUkuYmcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuovku7ZcclxuICAgIE9uQ2hvb3NlKGluZm86IEV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHRhcmdldDphbnkgPSBpbmZvLnRhcmdldDtcclxuICAgICAgICB2YXIgaWR4OiBudW1iZXIgPSB0YXJnZXQuaWR4O1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5DdXJMZXZlbCA9IGlkeDtcclxuICAgICAgICB0aGlzLm1fQnRuR3JvdXAuZm9yRWFjaCgoaW1nOiBMYXlhLkltYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIGltZy5ncmF5ID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm1fQnRuR3JvdXBbaWR4XS5ncmF5ID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog5Zy65pmvVUlcclxuICovXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLi9HYW1lL0dhbWVNb2R1bGVcIjtcclxuaW1wb3J0IHsgR2FtZUFnZW50IH0gZnJvbSBcIi4uL0FnZW50L0dhbWVBZ2VudFwiO1xyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBJdGVtTGlzdFVJIGZyb20gXCIuL0l0ZW1MaXN0VUlcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcblxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbmNsYXNzIEV4dGVuZHNHYW1lVUkgZXh0ZW5kcyB1aS5HYW1lVUkge1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpKSk7XHJcbiAgICB9XHJcbiAgICBTZXRDb3VudFRpbWUoaW5mbzogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHRoaXMuX0NvdW50VGltZS52YWx1ZSA9IGluZm87XHJcbiAgICAgICAgLy90aGlzLl9Db3VudFRpbWUudGV4dCA9IGluZm87XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBwcml2YXRlIF9VSTogRXh0ZW5kc0dhbWVVSTtcclxuICAgIHByaXZhdGUgbV9vbkNsaWNrU2tpbGxJdGVtOiBNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBwcml2YXRlIG1fb25DTGlja1BsYXllckl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIC8vXHJcbiAgICBwdWJsaWMgRGlzdGFuY2VTdHI6IEFycmF5PHN0cmluZz47XHJcbiAgICBwdWJsaWMgR29sZE51bVN0cjogQXJyYXk8c3RyaW5nPjtcclxuXHJcbiAgICBzZXQgR2FtZVBhbmVsKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dhbWVQYW5lbC52aXNpYmxlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgRGlzdGFuY2UodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBkaXMgPSBcIlwiICsgdmFsdWU7XHJcbiAgICAgICAgaWYgKGRpcyA9PSB0aGlzLkRpc3RhbmNlU3RyWzFdKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gZGlzO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIHNldCBHb2xkTnVtKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIHRoaXMuU2V0RGlydHkoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX1Nob3dEaXN0YW5jZSgpIHtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0RGlzdGFuY2UudGV4dCA9IHRoaXMuRGlzdGFuY2VTdHJbMF07XHJcbiAgICAgICAgdGhpcy5fVUkuX1R4dERpc3RhbmNlMS52YWx1ZSA9IHRoaXMuRGlzdGFuY2VTdHJbMV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfU2hvd0dvbGROdW0oKSB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1R4dEdvbGQudGV4dCA9IHRoaXMuR29sZE51bVN0clswXSArIHRoaXMuR29sZE51bVN0clsxXTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiR2FtZVVJXCI7XHJcbiAgICB9XHJcbiAgICBzZXQgR29sZChnb2xkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLkdvbGROdW1TdHJbMV0gPSBnb2xkLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fSXNNdXRleCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5sZWZ0ID0gMDtcclxuICAgICAgICB0aGlzLnJpZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLmJvdHRvbSA9IDA7XHJcbiAgICAgICAgdGhpcy50b3AgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNHYW1lVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB2YXIgb3BJc1JpZ2h0ID0gR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNldEluZm8uT1BJc1JpZ2h0O1xyXG4gICAgICAgIHRoaXMuX1VJLl9JdGVtTGlzdEJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCBudWxsLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJTWFuYWdlci5TaG93PEl0ZW1MaXN0VUk+KEl0ZW1MaXN0VUkpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5TZXRDb3VudFRpbWUoKTtcclxuIFxyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHIgPSB0aGlzLl9VSS5fVHh0RGlzdGFuY2UudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgdGhpcy5EaXN0YW5jZVN0clsxXSA9IFwiMFwiXHJcbiAgICAgICAgdGhpcy5fU2hvd0Rpc3RhbmNlKCk7XHJcblxyXG4gICAgICAgIHRoaXMuR29sZE51bVN0ciA9IHRoaXMuX1VJLl9UeHRHb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IFwiMFwiO1xyXG4gICAgICAgIHRoaXMuX1Nob3dHb2xkTnVtKCk7XHJcblxyXG4gICAgICAgIHRoaXMuU2hvd0lucHV0SW5mbyhcIlwiKTtcclxuICAgICAgICB0aGlzLl9VSS5fUGxheWVySXRlbS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2xpY2tQbGF5ZXJJdGVtKTtcclxuICAgICAgICB0aGlzLl9VSS5fU2tpbGxJdGVtLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuT25DbGlja1NraWxsSXRlbSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgU2V0TGVmdFRvdWNoKG93bmVyOiBhbnksIExpc3RlbmVyOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xlZnRUb3VjaC5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIG93bmVyLCBMaXN0ZW5lcik7IFxyXG4gICAgfVxyXG5cclxuICAgIFNldFJpZ2h0VG91Y2gob3duZXI6IGFueSwgTGlzdGVuZXI6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9VSS5fUmlnaHRUb3VjaC5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIG93bmVyLCBMaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0Q291bnRUaW1lKGluZm86IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICBpZiAoaW5mbyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9Db3VudERvd25VSS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZVBhbmVsID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9Db3VudERvd25VSS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUkuU2V0Q291bnRUaW1lKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIFNob3dJdGVtKCkge1xyXG4gICAgICAgIHRoaXMuU2hvd1BsYXllckl0ZW0oKTtcclxuICAgICAgICB0aGlzLlNob3dDaGFyYWN0ZWVySXRlbSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S6546p5a626YCJ5oup6YGT5YW3XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBTaG93UGxheWVySXRlbSgpIHtcclxuICAgICAgICB2YXIgaXRlbU51bSA9IEdhbWVBZ2VudC5BZ2VudC5HYW1lSXRlbU51bTtcclxuICAgICAgICBpZiAoaXRlbU51bSA8IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX1BsYXllckl0ZW0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLl9QbGF5ZXJJdGVtLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuinkuiJsumBk+WFt1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgU2hvd0NoYXJhY3RlZXJJdGVtKCkge1xyXG4gICAgICAgIHZhciBpdGVtTnVtID0gR2FtZUFnZW50LkFnZW50LlNraWxsSXRlbU51bTtcclxuICAgICAgICBpZiAoaXRlbU51bSA8IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX1NraWxsSXRlbS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX1NraWxsSXRlbS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2hvd0lucHV0SW5mbyhpbmZvOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZUluZm8udGV4dCA9IGluZm87XHJcbiAgICB9XHJcbiAgICBPcGVuKCkge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VySXRlbU51bUNoYW5nZSwgdGhpcy5TaG93UGxheWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJJdGVtQ2hhbmdlLCB0aGlzLlNob3dQbGF5ZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KEdhbWVNb2R1bGUuRXZlbnQuT25DaGFyYWN0ZXJJdGVtQ2hhbmdlLCB0aGlzLlNob3dDaGFyYWN0ZWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5TaG93SXRlbSgpO1xyXG4gICAgfVxyXG4gICAgQ2xvc2UoKSB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJJdGVtTnVtQ2hhbmdlLCB0aGlzLlNob3dQbGF5ZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckl0ZW1DaGFuZ2UsIHRoaXMuU2hvd1BsYXllckl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoR2FtZU1vZHVsZS5FdmVudC5PbkNoYXJhY3Rlckl0ZW1DaGFuZ2UsIHRoaXMuU2hvd0NoYXJhY3RlZXJJdGVtLCB0aGlzKTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpIHtcclxuICAgICAgICAvL+aYvuekuumHkeW4geS/oeaBr1xyXG4gICAgICAgIHRoaXMuX1Nob3dHb2xkTnVtKCk7XHJcbiAgICAgICAgLy/mmL7npLrot53nprvkv6Hmga9cclxuICAgICAgICB0aGlzLl9TaG93RGlzdGFuY2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0Q2xpY2tTa2lsbEl0ZW0ob3duZXI6IE9iamVjdCwgbGlzdGVuZXI6IChwYXJhbTogYW55KSA9PiBhbnkpIHtcclxuICAgICAgICB2YXIgZGVsZWdhdGU6IE1lc3NhZ2VNRC5EZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fb25DbGlja1NraWxsSXRlbSA9IGRlbGVnYXRlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFJlZ2lzdENsaWNrUGxheWVySXRlbShvd25lcjogT2JqZWN0LCBsaXN0ZW5lcjogKHBhcmFtOiBhbnkpID0+IGFueSkge1xyXG4gICAgICAgIHZhciBkZWxlZ2F0ZTogTWVzc2FnZU1ELkRlbGVnYXRlID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZShvd25lciwgbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubV9vbkNMaWNrUGxheWVySXRlbSA9IGRlbGVnYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25DbGlja1NraWxsSXRlbSgpIHtcclxuICAgICAgICB0aGlzLm1fb25DbGlja1NraWxsSXRlbS5FeGVjdXRlKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIE9uQ2xpY2tQbGF5ZXJJdGVtKCkge1xyXG4gICAgICAgIHRoaXMubV9vbkNMaWNrUGxheWVySXRlbS5FeGVjdXRlKCk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IHtQbGF5ZXJ9IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckVudGl0eVwiXHJcbmltcG9ydCB7R2FtZUFnZW50fSBmcm9tIFwiLi8uLi9BZ2VudC9HYW1lQWdlbnRcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBJdGVtRWxlbWVudCBmcm9tIFwiLi8uLi9zY3JpcHQvSXRlbUVsZW1lbnRcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi4vR2FtZS9HYW1lTW9kdWxlXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxuaW1wb3J0IEl0ZW1NYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlci9JdGVtTWFuYWdlclwiO1xyXG5cclxuY2xhc3MgRXh0ZW5kc0l0ZW1MaXN0VUkgZXh0ZW5kcyB1aS5JdGVtTGlzdFVJXHJcbntcclxuICAgIHByaXZhdGUgbV9JdGVtTGlzdDpBcnJheTxudW1iZXI+XHJcbiAgICBCdG5MaXN0ZW5lcjpNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBbXTtcclxuICAgIH1cclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIikpKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVG9vbEl0ZW1VSSBleHRlbmRzIHVpLnRvb2xJdGVtVUlcclxue1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OkFycmF5PG51bWJlcj5cclxuICAgIEJ0bkxpc3RlbmVyOk1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9JdGVtTGlzdCA9IFtdO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJ0b29sSXRlbVwiKSkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1MaXN0VUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgc3RhdGljIE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gXCJJdGVtTGlzdFVJXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIFVJOkV4dGVuZHNJdGVtTGlzdFVJO1xyXG4gICAgcHJpdmF0ZSBtX0dvbGQ6c3RyaW5nW107XHJcbiAgICBwcml2YXRlIG1fSXRlbUxpc3Q6QXJyYXk8bnVtYmVyPjtcclxuXHJcbiAgICBwdWJsaWMgYXJyYXlEaXM6TGF5YS5TcHJpdGVbXSA9IFtdO1xyXG4gICAgcHVibGljIGNudE51bSA9IDU7XHJcbiAgICBwdWJsaWMgc3RhcnRhbyA9IDI3MDtcclxuICAgIHB1YmxpYyBwZXJhbyA9IDM2MCAvIHRoaXMuY250TnVtO1xyXG4gICAgcHVibGljIHIgPSAyMzA7XHJcbiAgICBwdWJsaWMgc3RhcnRZID0gNTc1O1xyXG4gICAgcHVibGljIHN0YXJ0WCA9IDMwMDtcclxuICAgIHB1YmxpYyBjbnRTZWxlY3RJbmRleCA9IDA7XHJcblxyXG4gICAgcHVibGljIGNhbWVyYTpMYXlhLkNhbWVyYTtcclxuICAgIHB1YmxpYyBjbnRzdGFydGFvID0gOTA7XHJcbiAgICBwdWJsaWMgbW92ZVN0YXJhbyA9IDI7XHJcbiAgICBwdWJsaWMgbmV4dEFvID0gLTE7XHJcbiAgICBwdWJsaWMgaW5pdFNjYWxOdW0gPSAwLjAxODtcclxuXHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJtYWluYmcuanBnXCJ9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcImJhY2tCdG5cIix0ZXh0dXJlTmFtZTpcImJhY2sucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiYnV5QnRuXCIsdGV4dHVyZU5hbWU6XCJidXkucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiYmFja0J0blwiLHRleHR1cmVOYW1lOlwic3RhcnQucG5nXCJ9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuXHJcbiAgICAgICAgdGhpcy5VSSA9IG5ldyBFeHRlbmRzSXRlbUxpc3RVSSgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5VSSk7XHJcbiAgICAgICAgdGhpcy5VSS5CdG5MaXN0ZW5lciA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUodGhpcywoKT0+eyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2UodGhpcyl9KVxyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU7XHJcbiAgICAgICAgLy90aGlzLlVwZGF0ZUxpc3QoKTtcclxuICAgICAgICAvL3RoaXMubV9Hb2xkID0gdGhpcy5VSS5fR29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLlVJLl9CRy5hbHBoYSA9IDA7XHJcbiAgICAgICAgdGhpcy5VSS5fQkcub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMuQ2xvc2VVSSk7XHJcbiAgICAgICAgdGhpcy5VSS5iYWNrQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcyx0aGlzLkNsb3NlVUkpO1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuTGF5b3V0KCk7XHJcblxyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSAwOy8vY250U2VsZWN0SW5kZXg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yKHZhciBpID0gMCA7aSA8IHRoaXMuY250TnVtO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIGF1ZHQ6VG9vbEl0ZW1VSSA9IG5ldyBUb29sSXRlbVVJKCk7XHJcbiAgICAgICAgICAgIGF1ZHQudG9vbGljb24ubG9hZEltYWdlKEl0ZW1NYW5hZ2VyLk1nci5HZXRJdGVtSWNvbihpKSk7XHJcbiAgICAgICAgICAgIGF1ZHQudG9vbG5hbWUudGV4dCA9IEl0ZW1NYW5hZ2VyLk1nci5HZXRJdGVtSW5mbyhpKS5QYXNzc2NvcmU7XHJcbiAgICAgICAgICAgIC8vIGF1ZHQubG9hZEltYWdlKEl0ZW1NYW5hZ2VyLk1nci5HZXRJdGVtSWNvbihpKSk7XHJcbiAgICAgICAgICAgIGF1ZHQubmFtZSA9IGkgICsgXCJcIjtcclxuICAgICAgICAgICAgdGhpcy5VSS5hZGRDaGlsZChhdWR0KTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheURpcy5wdXNoKGF1ZHQpO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuc2VsZWN0Um9sZVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9ICh0aGlzLmNudFNlbGVjdEluZGV4ICsgNSkgJSA1O1xyXG4gICAgICAgIHRoaXMuY250c3RhcnRhbyA9ICh0aGlzLnN0YXJ0YW8gKyAodGhpcy5jbnROdW0gLSB0aGlzLmNudFNlbGVjdEluZGV4KSAqIHRoaXMucGVyYW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICB0aGlzLlVJLmJ1eUJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkJ1eUl0ZW0pO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxmU2NlbmVVSSgpIHtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5jb25maWdba2V5XS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PSBcImltZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLmdyYXBoaWNzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0ubG9hZEltYWdlKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihrZXkgPT0gXCJidG5cIikge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5za2luID0gKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgIHNlbGVjdFJvbGVQb3NpdGlvbihlOkxheWEuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICB2YXIgY250VGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGlmKHRoaXMuY250U2VsZWN0SW5kZXggPT0gcGFyc2VJbnQoZS5jdXJyZW50VGFyZ2V0Lm5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLlVJLmJhY2tCdG4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVUkuYnV5QnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlVJLm93bmVydHh0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlVJLmdvbGRpbWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVUkucm9sZXVzZU5vbmV5LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RJbmRleChwYXJzZUludChjbnRUYXJnZXQubmFtZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbENudFN0YXJ0YW8oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9ICh0aGlzLmNudFNlbGVjdEluZGV4ICsgNSkgJSA1O1xyXG4gICAgICAgIHRoaXMubmV4dEFvID0gKHRoaXMuc3RhcnRhbyArICh0aGlzLmNudE51bSAtIHRoaXMuY250U2VsZWN0SW5kZXgpICogdGhpcy5wZXJhbyArIDM2MCkgJSAzNjA7XHJcblxyXG4gICAgICAgIGlmKCh0aGlzLm5leHRBbyAtIHRoaXMuY250c3RhcnRhbyArIDM2MCkgJSAzNjAgPj0gMTgwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVN0YXJhbyA9IC0yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVN0YXJhbyA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEudGltZXIubG9vcCgwLjA1LCB0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGltZUFvQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY250c3RhcnRhbyA9PSB0aGlzLm5leHRBbykge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSB0aGlzLm5leHRBbztcclxuICAgICAgICAgICAgdGhpcy5uZXh0QW8gPSAtMTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxhc2NudEFvID0gdGhpcy5jbnRzdGFydGFvO1xyXG4gICAgICAgIHRoaXMuY250c3RhcnRhbyArPSB0aGlzLm1vdmVTdGFyYW87XHJcbiAgICAgICAgaWYodGhpcy5jbnRzdGFydGFvIDwgMCB8fCB0aGlzLmNudHN0YXJ0YW8gPT0gMzYwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9ICh0aGlzLmNudHN0YXJ0YW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgICAgICBsYXNjbnRBbyA9IHRoaXMuY250c3RhcnRhbyAtIHRoaXMubW92ZVN0YXJhbztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gKHRoaXMuY250c3RhcnRhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKChsYXNjbnRBbyA+PSB0aGlzLm5leHRBbyAmJiB0aGlzLmNudHN0YXJ0YW8gPD0gdGhpcy5uZXh0QW8pIHx8IChsYXNjbnRBbyA8PSB0aGlzLm5leHRBbyAmJiB0aGlzLmNudHN0YXJ0YW8gPj0gdGhpcy5uZXh0QW8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9IHRoaXMubmV4dEFvO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRBbyA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm5leHRBbyA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxlY3QoKTogdm9pZCB7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgdGhpcy5hcnJheURpcy5sZW5ndGg7aSArKykge1xyXG4gICAgICAgICAgICB2YXIgYW8gPSAodGhpcy5jbnRzdGFydGFvICsgaSAqIHRoaXMucGVyYW8pICUgMzYwXHJcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5zdGFydFggKyB0aGlzLnIgKiBNYXRoLmNvcyhhbyAqIDMuMTQgLyAxODApO1xyXG4gICAgICAgICAgICB2YXIgeSA9IHRoaXMuc3RhcnRZICsgdGhpcy5yICogTWF0aC5zaW4oYW8gKiAzLjE0IC8gMTgwKTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS54ID0geDtcclxuICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS55ID0geTtcclxuICAgICAgICAgICAgdmFyIHNjYWxlID0gKHkgLSB0aGlzLnN0YXJ0WSkgLyAyIC8gKHRoaXMuciAtIHRoaXMuc3RhcnRZKSAqIDAuMjtcclxuICAgICAgICAgICAgaWYoc2NhbGUgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS5zY2FsZVggPSB0aGlzLmFycmF5RGlzW2ldLnNjYWxlWSA9ICgwLjggKyBzY2FsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbaV0uc2NhbGVYID0gdGhpcy5hcnJheURpc1tpXS5zY2FsZVkgPSAwLjg7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVJvbGVJbmZvKGlkKTogdm9pZCB7XHJcbiAgICAgICAgLy8gaWYodGhpcy5jaGVja0lzTG9jayhpZCkpIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5fVUkuc3RhcnRHYW1lLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9VSS5idXlCdG4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9VSS5nb2xkaW1nLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5fVUkucm9sZXVzZU5vbmV5LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudGV4dCA9IFwi5bey6Kej6ZSBXCI7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2UgXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgICAgICB0aGlzLlVJLmJhY2tCdG4udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuYnV5QnRuLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlVJLmdvbGRpbWcudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVUkucm9sZXVzZU5vbmV5LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlVJLm93bmVydHh0LnZpc2libGUgPSB0cnVlOztcclxuICAgICAgICAgICAgdGhpcy5VSS5yb2xldXNlTm9uZXkudGV4dCA9IEl0ZW1NYW5hZ2VyLk1nci5HZXRQcmljZSh0aGlzLmNudFNlbGVjdEluZGV4KSArIFwiXCI7XHJcbiAgICAgICAgLy99XHJcbiAgICAgICAgdmFyIG93bmVyTnVtID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lkl0ZW1MaXN0W3RoaXMuY250U2VsZWN0SW5kZXhdO1xyXG4gICAgICAgIGlmKCFvd25lck51bSkge1xyXG4gICAgICAgICAgICBvd25lck51bSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVUkub3duZXJ0eHQudGV4dCA9IFwi5bey5oul5pyJOlwiICsgb3duZXJOdW07XHJcbiAgICAgICAgdmFyIGl0ZW1JbmZvID0gSXRlbU1hbmFnZXIuTWdyLkdldEl0ZW1JbmZvKGlkKTtcclxuICAgICAgICB0aGlzLlVJLnJvbGVOYW1lLnRleHQgPSBpdGVtSW5mby5QYXNzc2NvcmU7XHJcbiAgICAgICAgdGhpcy5VSS5kZXNjLnRleHQgPSBpdGVtSW5mby5EZXNjO1xyXG4gICAgICAgIHRoaXMuVUkuX0dvbGQudGV4dCA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leSArIFwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsZWFyUm9hdGVUaW1lcigpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0Um9sZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4IC0tO1xyXG4gICAgICAgIHRoaXMuY2FsQ250U3RhcnRhbygpO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIG5leHRSb2xlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggKys7XHJcbiAgICAgICAgdGhpcy5jYWxDbnRTdGFydGFvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZWN0SW5kZXgoc2VsZWN0SW5kZXg6bnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYoc2VsZWN0SW5kZXggPT0gdGhpcy5jbnRTZWxlY3RJbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSBzZWxlY3RJbmRleDtcclxuICAgICAgICB0aGlzLmNhbENudFN0YXJ0YW8oKTtcclxuICAgIH0gXHJcblxyXG4gICAgcHVibGljIE9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsdGhpcy5TaG93R29sZCx0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlLHRoaXMuUmVmcmVzaExpc3QsdGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuVGltZVBhdXNlKCk7XHJcbiAgICAgICAgdGhpcy5TaG93R29sZCgpO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ2xvc2UoKVxyXG4gICAge1xyXG4gICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlRpbWVDb250aW51ZSgpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsdGhpcy5TaG93R29sZCx0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlLHRoaXMuUmVmcmVzaExpc3QsdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZUxpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR2V0SXRlbUxpc3QoKTtcclxuICAgICAgICB0aGlzLlNldExpc3QodGhpcy5tX0l0ZW1MaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVmcmVzaExpc3QoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuR2V0SXRlbUxpc3QoKTtcclxuICAgICAgICB0aGlzLkZyZXNoTGlzdCh0aGlzLm1fSXRlbUxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRJdGVtTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gR2FtZUFQUC5JdGVtTWdyLkdldFNlbGxJdGVtSURMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNob3dHb2xkKClcclxuICAgIHtcclxuICAgICAgICBpZighdGhpcy5TaG93aW5nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHRoaXMubV9Hb2xkWzFdID1cIlwiICsgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5O1xyXG4gICAgICAgIHRoaXMuVUkuX0dvbGQudGV4dCA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leSArIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfUmVuZGVySGFuZGxlcihjZWxsOkxheWEuQm94LGluZGV4Om51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciByb2xlRWxlbWVudDpJdGVtRWxlbWVudCA9IGNlbGwgYXMgSXRlbUVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIGl0ZW1MaXN0OkFycmF5PG51bWJlcj4gPSBHYW1lQWdlbnQuQWdlbnQuSXRlbUxpc3Q7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuSW5pdCgpO1xyXG4gICAgICAgIHJvbGVFbGVtZW50Lkl0ZW1JZHggPSB0aGlzLm1fSXRlbUxpc3RbaW5kZXhdO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LlJlZ2lzdEJ1eSh0aGlzLHRoaXMuQnV5SXRlbSk7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVnaXN0Q2hvb3NlKHRoaXMsdGhpcy5DaG9vc2VJdGVtKTtcclxuICAgICAgICByb2xlRWxlbWVudC5Jc0dyYXkgPSBpdGVtTGlzdFt0aGlzLm1fSXRlbUxpc3RbaW5kZXhdXT9mYWxzZTp0cnVlO1xyXG4gICAgICAgIHJvbGVFbGVtZW50Lk51bSA9IGl0ZW1MaXN0W3RoaXMubV9JdGVtTGlzdFtpbmRleF1dP2l0ZW1MaXN0W3RoaXMubV9JdGVtTGlzdFtpbmRleF1dOjA7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuQnRuTGFibGUgPSBcIlwiICsgR2FtZUFQUC5JdGVtTWdyLkdldFByaWNlKHRoaXMubV9JdGVtTGlzdFtpbmRleF0pICsgXCJcIjtcclxuICAgICAgICAvL3JvbGVFbGVtZW50LlNldEJ0bih0aGlzLkJ0bkxpc3RlbmVyLkxpc3RlbmVyLHRoaXMuQnRuTGlzdGVuZXIuQWN0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNldExpc3QobGlzdEFycmF5OkFycmF5PGFueT4pXHJcbiAgICB7XHJcbiAgICAgICAgLy92YXIgbGlzdEFycmF5OkFycmF5PGFueT4gPSB0aGlzLm1fSXRlbUxpc3Q7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5yZW5kZXJIYW5kbGVyID0gbmV3IExheWEuSGFuZGxlcih0aGlzLHRoaXMuX1JlbmRlckhhbmRsZXIpO1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QuYXJyYXkgPSBsaXN0QXJyYXk7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0JhY2tUaW1lID0gMjAwOy8v6K6+572u5qmh55qu562L5Zue5by55pe26Ze044CC5Y2V5L2N5Li65q+r56eS44CCXHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5zY3JvbGxCYXIuZWxhc3RpY0Rpc3RhbmNlID0gNTBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRnJlc2hMaXN0KGlkTGlzdClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LmFycmF5ID0gaWRMaXN0O1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QucmVmcmVzaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpIHtcclxuICAgICAgICBzdXBlci5MYXlvdXQoKTtcclxuICAgICAgICBpZighdGhpcy5VSSB8fCAhdGhpcy5VSS5iZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVUkuYmcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuVUkuYmcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByaXZhdGUgQnV5SXRlbShpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkJ1eUl0ZW0odGhpcy5jbnRTZWxlY3RJbmRleCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIENob29zZUl0ZW0oaWQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLlNob3dpbmcpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZihHYW1lQWdlbnQuQWdlbnQuSXRlbUxpc3RbaWRdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LkN1ckl0ZW0gPSBpZDtcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LkN1ckl0ZW0gPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIENsb3NlVUkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ2hvb3NlSXRlbSh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IFdlY2hhdE9wZW4gfSBmcm9tIFwiLi4vcGxhdGZvcm0vV2VjaGF0T3BlblwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5cclxuY2xhc3MgRXh0ZW5kc1JhbmtQYW5lbFVJIGV4dGVuZHMgdWkuR2FtZVJhbmtVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVSYW5rXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e0FQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCl9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmFua1BhbmVsVUkgZXh0ZW5kcyBCYXNlVUkge1xyXG4gICAgX1VJOiBFeHRlbmRzUmFua1BhbmVsVUk7XHJcbiAgICByYW5rVGV4dHVyZTogTGF5YS5UZXh0dXJlO1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzUmFua1BhbmVsVUkoKTtcclxuICAgICAgICB0aGlzLkZpeFVJKHRoaXMuX1VJKTtcclxuICAgICAgICB0aGlzLl9VSS5jbG9zZUJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCAoKSA9PiB7IFxyXG4gICAgICAgICAgICBXZWNoYXRPcGVuLmdldEluc3RhbmNlcygpLmNsb3NlUmFuaygpO1xyXG4gICAgICAgICAgICB0aGlzLl9VSU1hbmFnZXIuQ2xvc2UodGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJSYW5rUGFuZWxVSVwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBPcGVuKClcclxuICAgIHtcclxuICAgICAgICBXZWNoYXRPcGVuLmdldEluc3RhbmNlcygpLm9wZW5SYW5rKCk7XHJcbiAgICB9XHJcblxyXG4gICAgU2F2ZVBhbmVsKCkge1xyXG4gICAgICAgIC8vIHRoaXMucmFua1RleHR1cmUuYml0bWFwLmFsd2F5c0NoYW5nZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIHRoaXMucmFua1RleHR1cmUuZGlzcG9zZUJpdG1hcCgpO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlT1AoKSB7XHJcbiAgICAgICAgdGhpcy5TYXZlUGFuZWwoKTtcclxuICAgIH1cclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7fVxyXG59XHJcbiIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgeyBCYXNlRW51bSB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi4vU2NlbmUvR3VpZGVyTWFuYWdlclwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiXHJcblxyXG5jbGFzcyBFeHRlbmRzU2V0UGFuZWxVSSBleHRlbmRzIHVpLlNldFBhbmVsVUkge1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJTZXRQYW5lbFwiKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL3RoaXMuX1JldHVybi5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntBUFAuVUlNYW5hZ2VyLkNsb3NlQ3VyVmlldygpfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBCYXNlVUkge1xyXG4gICAgX1VJOiBFeHRlbmRzU2V0UGFuZWxVSTtcclxuICAgIHNlbGVjdGVkSW5kZXg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjb25maWcgPSB7XCJpbWdcIjpcclxuICAgICAgICBbICAgXHJcbiAgICAgICAgICAgIHtrZXk6XCJiZ1wiLHRleHR1cmVOYW1lOlwibWFpbmJnLmpwZ1wifVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJidG5cIjpcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIHtrZXk6XCJfUmV0dXJuXCIsdGV4dHVyZU5hbWU6XCJiYWNrLnBuZ1wifVxyXG4gICAgICAgIF1cclxuICAgIH07XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlOyBcclxuICAgICAgICB0aGlzLl9VSSA9IG5ldyBFeHRlbmRzU2V0UGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgKCkgPT4geyB0aGlzLl9VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7IEd1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKSB9KTtcclxuICAgICAgICB0aGlzLl9VSS52b2ljZW9wZW4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5Wb2ljZU9wZW4pO1xyXG4gICAgICAgIHRoaXMuX1VJLnZvaWNlY2xvc2Uub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5Wb2ljZUNsb3NlKTsgXHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdldFNldEluZm8oKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmZvLkF1ZGlvT24gPyAxIDogMDtcclxuICAgICAgICB0aGlzLlNldFBhbmVsKCk7XHJcbiAgICAgICAgdGhpcy5MYXlvdXQoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2V0UGFuZWxVSVwiO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBWb2ljZU9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMTtcclxuICAgICAgICB0aGlzLlNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBPcGVuKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuICAgIH1cclxuICAgIFZvaWNlQ2xvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLlNldFBhbmVsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZlNjZW5lVUkoKSB7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5jb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuY29uZmlnW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihrZXkgPT0gXCJpbWdcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0ubG9hZEltYWdlKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihrZXkgPT0gXCJidG5cIikge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uc2tpbiA9IChQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFNldFBhbmVsKCkge1xyXG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRJbmRleCA9PSAxKSB7XHJcbiAgICAgICAgICAgICh0aGlzLl9VSS52b2ljZW9wZW4uZ2V0Q2hpbGRBdCgyKSBhcyBMYXlhLkltYWdlKS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgKHRoaXMuX1VJLnZvaWNlY2xvc2UuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkltYWdlKS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgICh0aGlzLl9VSS52b2ljZW9wZW4uZ2V0Q2hpbGRBdCgyKSBhcyBMYXlhLkltYWdlKS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICh0aGlzLl9VSS52b2ljZWNsb3NlLmdldENoaWxkQXQoMSkgYXMgTGF5YS5JbWFnZSkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdGhpcy5fVUkuX09QU3dpdGNoLnNlbGVjdGVkSW5kZXggPSBpbmZvLk9QSXNSaWdodCA/IDEgOiAwO1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX1RleHQudGV4dCA9IGluZm8uVGV4dEluZm87XHJcbiAgICB9XHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbyA9IG5ldyBHYW1lU3RydWN0LlNldEluZm8oKTtcclxuICAgICAgICBpbmZvLkF1ZGlvT24gPSB0aGlzLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICAvL2luZm8uT1BJc1JpZ2h0ID0gdGhpcy5zZWxlY3RlZEluZGV4ID09IDE7XHJcbiAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2F2ZVNldEluZm8oaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIHN1cGVyLkxheW91dCgpO1xyXG4gICAgICAgIGlmKCF0aGlzLl9VSSB8fCAhdGhpcy5fVUkuYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5iZy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUkuYmcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2VPUCgpIHtcclxuICAgICAgICB0aGlzLlNhdmVQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHt9XHJcbn1cclxuIiwiaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi8uLi9CYXNlVUlcIlxyXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XHJcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XHJcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xyXG5pbXBvcnQgTG9hZFVJU2NlbmUgZnJvbSBcIi4vTG9hZFVJU2NlbmVcIlxyXG5tb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRpbmdVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX1Byb2dyZXNzOkxheWEuUHJvZ3Jlc3NCYXI7XHJcblx0XHRwdWJsaWMgX0d1aWRlcjpMYXlhLkltYWdlO1xyXG5cdFx0cHVibGljIF9FbnRlcjpMYXlhLkJ1dHRvbjtcclxuXHRcdHB1YmxpYyBFcnJvckluZm86TGF5YS5MYWJlbDtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiTG9hZGluZ1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEV4dExvYWRpbmdVSSBleHRlbmRzIHVpLkxvYWRpbmdVSVxyXG57XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBcIkxvYWRpbmdVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOnVpLkxvYWRpbmdVSTtcclxuICAgIF9DYWxsQmFjazooKT0+dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBuYW1lOnN0cmluZyApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgLy90aGlzLl9VSSA9bmV3IHVpLkxvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuX1VJID1uZXcgRXh0TG9hZGluZ1VJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSApO1xyXG4gICAgICAgIHRoaXMuVmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5fQ2FsbEJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLkxheW91dCgpO1xyXG4gICAgICAgIHZhciBzY2VuZTpMYXlhLlNjZW5lM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMoXCJ1aS9SZXNvdXJjZS9MYXlhU2NlbmVfTWFpblNjZW5lL0NvbnZlbnRpb25hbC9NYWluU2NlbmUubHNcIikgYXMgTGF5YS5TY2VuZTNEO1xyXG4gICAgICAgIHNjZW5lLmFtYmllbnRDb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgMSwgMSk7XHJcbiAgICAgICAgdmFyIGNhbWVyYTpMYXlhLkNhbWVyYSA9IHNjZW5lLmdldENoaWxkQnlOYW1lKFwiQ2FtZXJhXCIpIGFzIExheWEuQ2FtZXJhO1xyXG4gICAgICAgIGNhbWVyYS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBjYW1lcmEuY2xlYXJGbGFnID0gTGF5YS5CYXNlQ2FtZXJhLkNMRUFSRkxBR19TS1k7XHJcbiAgICAgICAgY2FtZXJhLmNsZWFyQ29sb3I9bmV3IExheWEuVmVjdG9yNCgwLDAsMCwwKTtcclxuICAgICAgICB2YXIgbmV3Q2FtZXJhOkxheWEuQ2FtZXJhID0gbmV3IExheWEuQ2FtZXJhKCk7XHJcbiAgICAgICAgbmV3Q2FtZXJhLnRyYW5zZm9ybS5wb3NpdGlvbiA9IGNhbWVyYS50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgbmV3Q2FtZXJhLnRyYW5zZm9ybS5yb3RhdGlvbiA9IGNhbWVyYS50cmFuc2Zvcm0ucm90YXRpb247XHJcbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQobmV3Q2FtZXJhKTtcclxuICAgICAgICB0aGlzLl9VSVtcImJnXCJdLmFkZENoaWxkKHNjZW5lKTtcclxuICAgICAgICAvL3RoaXMuX1VJW1wiYmdcIl0uYWRkQ2hpbGQobmV3IExvYWRVSVNjZW5lKCkpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB4Om51bWJlciA9IDA7XHJcbiAgICAgICAgeCArPSB0aGlzLl9VSS5fUHJvZ3Jlc3Mud2lkdGgqdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9HdWlkZXIucG9zKHgsdGhpcy5fVUkueSk7XHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIGlmKCF0aGlzLl9VSSB8fCAhdGhpcy5fVUlbXCJiZ1wiXSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJW1wiYmdcIl0ud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX1VJW1wiYmdcIl0uaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IFZhbHVlKG51bTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlID0gbnVtO1xyXG4gICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHZhbHVlKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1VJLl9Qcm9ncmVzcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBDb21wbGV0ZShjYWxsQmFjazooKT0+dm9pZClcclxuICAgIHtcclxuXHJcbiAgICAgICAgLy9jYWxsQmFjaygpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Qcm9ncmVzcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fQ2FsbEJhY2sgPSBjYWxsQmFjaztcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLmxhYmVsID0gXCJcIjsvL3RoaXMuX05hbWVbMF07XHJcbiAgICB9XHJcbiAgICBSZWxvYWQoc3RyLCBjYWxsQmFjazooKT0+dm9pZClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udGV4dCA9IHN0cjtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkuRXJyb3JJbmZvLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8uaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG5leHBvcnQgbW9kdWxlIHVpIHtcbiAgICBleHBvcnQgY2xhc3MgQkdVSSBleHRlbmRzIExheWEuVmlldyB7XG5cdFx0cHVibGljIF9FYXJ0aDpMYXlhLkltYWdlO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiQkdcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhwb3J0IGNsYXNzIENoYXJhY3RlclVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcblx0XHRwdWJsaWMgYmc6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgbGF5b3V0Ymc6TGF5YS5Cb3g7XG5cdFx0cHVibGljIHJvbGVOYW1lOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGRlc2M6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgZ29sZGltZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgcm9sZXVzZU5vbmV5OkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGJ1eUJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgY2hhcmFjdGVycm9sZTFiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgY2hhcmFjdGVycm9sZTRiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgY2hhcmFjdGVycm9sZTJiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgY2hhcmFjdGVycm9sZTNiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgY2hhcmFjdGVycm9sZTBiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgc3RhcnRHYW1lOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfR29sZDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBiYWNrQnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTGlzdDpMYXlhLkxpc3Q7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJDaGFyYWN0ZXJcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhwb3J0IGNsYXNzIEVuZEdhbWVVSSBleHRlbmRzIExheWEuVmlldyB7XG5cdFx0cHVibGljIGJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBlbmRnYW1lYmdpY29uOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIGRpYmc6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgX1N0YXJ0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTWVudWVCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9TZXRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QbGF5ZXJMaXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBlbmRnYW1laGVudGlhbzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgZW5kZ2FtZXRpdGxlOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBkaXN0YW5jZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBnb2xkOkxheWEuTGFiZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJFbmRHYW1lXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4cG9ydCBjbGFzcyBFbnRlclVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcblx0XHRwdWJsaWMgYmc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIF9TdGFydDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0NoYXJhY3RlcjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BhbmVsOkxheWEuUGFuZWw7XG5cdFx0cHVibGljIGNvbnRlbnQ6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIEJ0bjE6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgQnRuMjpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBCdG40OkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIEJ0bjU6TGF5YS5JbWFnZTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5cdFx0cHVibGljIF9TZXRQYW5lbDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0NoYXJhY3Rlckxpc3Q6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIGFkdjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1Jhbms6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIGxhc3RCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIG5leHRCdG46TGF5YS5CdXR0b247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJFbnRlclwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgR2FtZVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcblx0XHRwdWJsaWMgX0NvdW50RG93blVJOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfSXRlbUxpc3RCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9Db3VudFRpbWUxOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9Db3VudFRpbWU6TGF5YS5Gb250Q2xpcDtcblx0XHRwdWJsaWMgX0dhbWVJbmZvOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lUGFuZWw6TGF5YS5Cb3g7XG5cdFx0cHVibGljIF9UeHREaXN0YW5jZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfVHh0RGlzdGFuY2UxOkxheWEuRm9udENsaXA7XG5cdFx0cHVibGljIF9UeHRHb2xkOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9MZWZ0VG91Y2g6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SaWdodFRvdWNoOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfU2tpbGxJdGVtOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUGxheWVySXRlbTpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkdhbWVcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhwb3J0IGNsYXNzIEdhbWVSYW5rVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xuXHRcdHB1YmxpYyBjbG9zZUJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgZ2FtZVJhbmtVaTpsYXlhLnVpLldYT3BlbkRhdGFWaWV3ZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJHYW1lUmFua1wiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgSXRlbUxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XG5cdFx0cHVibGljIF9CRzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgX0xpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBiYWNrQnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfR29sZDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyByb2xlTmFtZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBkZXNjOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGdvbGRpbWc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIHJvbGV1c2VOb25leTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBidXlCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIG93bmVydHh0OkxheWEuTGFiZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJJdGVtTGlzdFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTGlzdFVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcblx0XHRwdWJsaWMgX1BsYXllckxpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBfUmV0dXJuTWFpbjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlBsYXllckxpc3RcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXhwb3J0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xuXHRcdHB1YmxpYyBiZzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBfVGV4dDpMYXlhLlRleHRBcmVhO1xuXHRcdHB1YmxpYyBfUmV0dXJuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyB2b2ljZW9wZW46TGF5YS5Cb3g7XG5cdFx0cHVibGljIHZvaWNlY2xvc2U6TGF5YS5Cb3g7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJTZXRQYW5lbFwiKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnQgY2xhc3MgdG9vbEl0ZW1VSSBleHRlbmRzIExheWEuVmlldyB7XG5cdFx0cHVibGljIHRvb2xpY29uOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyB0b29sbmFtZTpMYXlhLkxhYmVsO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwidG9vbEl0ZW1cIik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=
