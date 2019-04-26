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
},{"../controler/GameAPP":44,"./../Game/GameModule":24,"./../controler/APP":43,"./BaseAgent":1,"./PlayerEntity":3}],3:[function(require,module,exports){
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
},{"../platform/WechatOpen":46,"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10}],4:[function(require,module,exports){
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
            return false;
        }
        this.m_PlayerEntity.Money -= price;
        this.m_PlayerEntity.AddCharacter(id);
        return true;
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
},{"./../controler/GameAPP":44,"./BaseAgent":1}],5:[function(require,module,exports){
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
    var SmoothDamp = /** @class */ (function () {
        /**
         *
         * @param smoothTime 平滑时长
         * @param maxSpeed 最大速度
         */
        function SmoothDamp(smoothTime, maxSpeed) {
            if (maxSpeed === void 0) { maxSpeed = 10; }
            this.m_CurrentVelocity = 0;
            this.m_SmoothTime = smoothTime;
            this.m_MaxSpeed = maxSpeed;
            this.m_MaxMoveNum = this.m_MaxSpeed * this.m_SmoothTime;
        }
        /**
         *
         * @param current 当前值
         * @param target 目标值
         * @param deltaTime 帧率
         */
        SmoothDamp.prototype.SmoothDamp = function (current, target, deltaTime) {
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
        return SmoothDamp;
    }());
    BaseFunc.SmoothDamp = SmoothDamp;
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
},{"../controler/APP":43,"./../Base/BaseEnum":5,"./../Utility/UIFunc":42,"./BaseManager":8}],14:[function(require,module,exports){
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
    GameConfig.startScene = "Character.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = true;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/ItemElement":47,"./script/RoleElement":48}],15:[function(require,module,exports){
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
},{"../Utility/Path":40,"./GameManager":16}],16:[function(require,module,exports){
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
},{"../Utility/Path":40}],17:[function(require,module,exports){
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
},{"./../Utility/Path":40,"./../controler/APP":43,"./../controler/GameControler":45}],19:[function(require,module,exports){
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
    AnimType[AnimEnum.Fall] = "fallDown";
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
        this.m_CurStateName = this.m_Aniamtor.getDefaultState().name;
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
    Object.defineProperty(CharactorAnimator.prototype, "curStateName", {
        get: function () {
            return this.m_CurStateName;
        },
        enumerable: true,
        configurable: true
    });
    CharactorAnimator.prototype.GetState = function (name) {
        if (name == "fall")
            var a = 1;
        var animatorState = this.m_StateMap[name];
        if (!animatorState) {
            var idleState = this.m_Aniamtor.getDefaultState();
            animatorState = new Laya.AnimatorState();
            animatorState.name = name;
            animatorState.clip = idleState.clip;
            this.m_Aniamtor.addState(animatorState);
            this.m_StateMap[name] = animatorState;
        }
        return animatorState;
    };
    CharactorAnimator.prototype.play = function (name) {
        if (this.m_StateMap[name]) {
            this.m_Aniamtor.play(name);
            this.m_CurStateName = name;
        }
        else {
            console.log("anim Is Not Exist" + name);
        }
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
        _this.Player = null;
        //this.timerLoop(1,this.Ctrler,this.Ctrler.Update);
        _this.frameLoop(1, _this, _this._Update);
        _this.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        _this.m_CountPS = new BaseFunc_1.BaseFunc.SmoothDamp(2);
        return _this;
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
    GameCamera.prototype.Init = function () {
        this.DynamicPS = this.transform.position.clone();
        this.BasePS = new Laya.Vector3();
    };
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
var Path_1 = require("./../Utility/Path");
var AnimObj_1 = require("./../Game/AnimObj");
var APP_1 = require("./../controler/APP");
var PlayerCtrler_1 = require("./PlayerCtrler");
var Input_1 = require("./Input");
var GameControler_1 = require("./../controler/GameControler");
var GameModule_1 = require("./GameModule");
var CharacterAnimator_1 = require("./CharacterAnimator");
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
        /**
         *
         * @param range 区间范围
         * @param num 区间范围数量
         * @param itemType 生产的道具类型
         * @param startFloor 从哪一行开始投掷
         */
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
        StepItem.prototype.SetIdleWave = function () {
            var idelState = this.m_CharactorAnimator.GetState("idle");
            var waveState = idelState.addScript(WaveStateScript);
            waveState.Init(this.Model);
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
                var animModel = this.Model.getChildAt(0);
                var animator = animModel ? animModel.getComponent(Laya.Animator) : null;
                if (animator)
                    this.m_CharactorAnimator = new CharacterAnimator_1.default(animator);
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
        Rock.ModelNum = 4;
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
                //APP.MessageManager.Fire(MessageMD.GameEvent.PlayerDeath);
                //var anim: Laya.Animator = this.Model.getChildAt(0).getComponent(Laya.Animator);
                //anim.play("die");
                this.m_CharactorAnimator.play("trigger");
                player.Die();
            }
        };
        return Thorn;
    }(StepItem));
    GameStruct_1.GameStruct.ItemDictType[ItemType.Thorn] = Thorn;
    var Protect = /** @class */ (function (_super) {
        __extends(Protect, _super);
        function Protect(step) {
            var _this = _super.call(this, ItemType.Protect, step) || this;
            _this.SetIdleWave();
            return _this;
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
            var _this = _super.call(this, ItemType.HolyProtect, step) || this;
            _this.SetIdleWave();
            return _this;
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
            var _this = _super.call(this, ItemType.Coin, step) || this;
            /*
            var idelState: Laya.AnimatorState = this.m_CharactorAnimator.GetState("idle");
            var waveState: WaveStateScript = idelState.addScript(WaveStateScript) as WaveStateScript;
            waveState.Init(this.Model);
            */
            _this.SetIdleWave();
            var triggerState = _this.m_CharactorAnimator.GetState("trigger");
            var triggerStateScript = triggerState.addScript(GoldJumpUp);
            triggerStateScript.Init(_this.Model, _this);
            return _this;
        }
        Coin.prototype.FlyToPlayer = function (player) {
            var conin = AnimObj_1.AnimObj.GenAnimObj(AnimObj_1.AnimObj.AnimCoin, this.Model);
            conin.SetTarget(player);
            GameControler_1.default.GameControler.GameDir.GamePlay.AddGoldUnLogicGold(1);
            this.PutItem();
        };
        Coin.prototype.TouchItem = function (player) {
            GameControler_1.default.GameControler.GameDir.GamePlay.AddGold(1);
            this.m_CharactorAnimator.play("trigger");
            //this.PutItem();
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
            var _this = _super.call(this, ItemType.Collector, step) || this;
            _this.SetIdleWave();
            return _this;
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
            var _this = _super.call(this, ItemType.Fly, step) || this;
            _this.SetIdleWave();
            return _this;
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
            if (this.m_CharactorAnimator)
                this.m_CharactorAnimator.play("trigger");
            else
                console.log(this.Model.name);
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
    var GoldJumpUp = /** @class */ (function (_super) {
        __extends(GoldJumpUp, _super);
        function GoldJumpUp() {
            return _super.call(this) || this;
        }
        GoldJumpUp.prototype.Init = function (model, stepItem) {
            this.m_Model = model;
            this.m_StepItem = stepItem;
        };
        GoldJumpUp.prototype.SetYPosition = function () {
            var localPosition = this.m_Model.transform.localPosition;
            localPosition.y = this.m_OriginalY + this.m_YSwitch;
            this.m_Model.transform.localPosition = localPosition;
        };
        GoldJumpUp.prototype.onStateEnter = function () {
            this.m_YSwitch = 0.5;
            this.m_OriginalY = this.m_Model.transform.localPosition.y;
            this.SetYPosition();
        };
        GoldJumpUp.prototype.onStateExit = function () {
            this.m_StepItem.PutItem();
            this.m_YSwitch = 0;
            this.SetYPosition();
        };
        GoldJumpUp.prototype.onStateUpdate = function () {
        };
        return GoldJumpUp;
    }(Laya.AnimatorStateScript));
    var WaveStateScript = /** @class */ (function (_super) {
        __extends(WaveStateScript, _super);
        function WaveStateScript() {
            var _this = _super.call(this) || this;
            _this.m_RoundTime = 3;
            _this.m_Distance = 0.5;
            return _this;
        }
        Object.defineProperty(WaveStateScript.prototype, "CountRound", {
            get: function () {
                return (APP_1.default.TimeManager.GameTime - this.m_CountTime) / this.m_RoundTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WaveStateScript.prototype, "TimeRoundRate", {
            get: function () {
                var timeScale = (APP_1.default.TimeManager.GameTime - this.m_CountTime) % this.m_RoundTime;
                timeScale = (timeScale / this.m_RoundTime) * Math.PI;
                return timeScale;
            },
            enumerable: true,
            configurable: true
        });
        WaveStateScript.prototype.Init = function (model) {
            this.m_Model = model;
            this.m_OriginalY = this.m_Model.transform.position.y;
            this.m_MoveDistanceCount = 0;
        };
        WaveStateScript.prototype.SetYPosition = function () {
            var localPosition = this.m_Model.transform.localPosition;
            localPosition.y = this.m_OriginalY + this.m_MoveDistanceCount;
            this.m_Model.transform.localPosition = localPosition;
        };
        WaveStateScript.prototype.onStateEnter = function () {
            this.m_CountTime = APP_1.default.TimeManager.GameTime;
        };
        WaveStateScript.prototype.onStateExit = function () {
        };
        WaveStateScript.prototype.onStateUpdate = function () {
            this.m_MoveDistanceCount = Math.sin(this.TimeRoundRate) * this.m_Distance;
            this.SetYPosition();
        };
        return WaveStateScript;
    }(Laya.AnimatorStateScript));
})(Item = exports.Item || (exports.Item = {}));
},{"./../Game/AnimObj":18,"./../Utility/Path":40,"./../controler/APP":43,"./../controler/GameControler":45,"./CharacterAnimator":20,"./GameModule":24,"./GameStruct":25,"./Input":26,"./PlayerCtrler":29}],23:[function(require,module,exports){
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
        for (var countFloor = tailFloor.FloorNum; countFloor <= floor; ++countFloor) {
            var targetFloor = this.GetFloorByFloor(countFloor);
            if (!targetFloor.breaked) {
                targetFloor.Break();
            }
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
            var stepVector = newStep.position;
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
        this.breaked = false;
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
        this.breaked = true;
        var stepList = this.m_StepList;
        for (var idx = 0; idx < stepList.length; ++idx) {
            var thisStep = stepList[idx];
            thisStep.Break();
        }
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
var CharacterAnimator_1 = require("./CharacterAnimator");
var num = 0;
//该脚本用于游戏玩家对象管理
//玩家对象
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        _this.name = "Player";
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
        this.m_PlayerCharacter = new PlayerAnimator(this.m_Animator, this);
        this.m_PlayerCharacter.Init();
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
        this.Locked = false;
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
        var newPS = putStep.position.clone();
        newPS.y += GameControler_1.default.GameControler.StepLength;
        this.Position = newPS;
        this.m_LogicPosition = putStep.position;
        this.m_Animator.play(Character_1.Character.PlayerAnimName(Character_1.Character.AnimEnum.Stand));
        if ((this.CurStep.StepItem.ItemType == GameItem_1.Item.ItemType.None) && (this.CurStep.IsEmpty || (this.CurStep.LeftParent && this.CurStep.RightParent && this.CurStep.LeftParent.StepItem.IsForbiden && this.CurStep.RightParent.StepItem.IsForbiden))) {
            this.FallDownImd();
            return;
        }
        this.CurStep.StandOnGround(this);
        this.TouchGround();
    };
    /**
     * 布局当前层但不移动
     * @param {Step} step 下一步台阶
     */
    Player.prototype.LayStep = function (step) {
        this.CurStep = step;
        this.m_LogicPosition = step.position;
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
    Player.prototype.Die = function () {
        this.Locked = true;
        this.m_Animator.play("die");
    };
    Player.prototype.FallDown = function () {
        this.Locked = true;
        this.ResetParenet();
        this.m_Animator.play(Character_1.Character.PlayerAnimName(Character_1.Character.AnimEnum.Fall));
    };
    Player.prototype.FallDownImd = function () {
        this.Locked = true;
        this.m_Animator.play("fallDownImd");
    };
    //触发台阶
    Player.prototype.TouchGround = function () {
        if (this.PlayerDeath || !this.CurStep) {
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
        this.transform.localPosition = new Laya.Vector3();
        //this.transform.position = this.m_Parent.transform.position.clone();
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
var PlayerAnimator = /** @class */ (function (_super) {
    __extends(PlayerAnimator, _super);
    function PlayerAnimator(animator, player) {
        var _this = _super.call(this, animator) || this;
        _this.m_Player = player;
        return _this;
    }
    PlayerAnimator.prototype.Init = function () {
        var fallState = this.GetState("fallDown");
        var fallScript = fallState.addScript(Laya.AnimatorStateScript);
        fallScript.onStateExit = function () { APP_1.default.MessageManager.Fire(MessageCenter_1.MessageMD.GameEvent.PlayerDeath); };
        var fallDownImdState = this.GetState("fallDownImd");
        var fallDownImdScript = fallDownImdState.addScript(Laya.AnimatorStateScript);
        var player = this.m_Player;
        fallDownImdScript.onStateExit = function () { APP_1.default.MessageManager.Fire(MessageCenter_1.MessageMD.GameEvent.PlayerDeath); };
        var dieState = this.GetState("die");
        var dieScript = dieState.addScript(Laya.AnimatorStateScript);
        dieScript.onStateExit = function () {
            setTimeout(function () {
                APP_1.default.MessageManager.Fire(MessageCenter_1.MessageMD.GameEvent.PlayerDeath);
            }, 1000);
        };
    };
    return PlayerAnimator;
}(CharacterAnimator_1.default));
var FallStateScript = /** @class */ (function (_super) {
    __extends(FallStateScript, _super);
    function FallStateScript() {
        return _super.call(this) || this;
    }
    FallStateScript.prototype.Init = function (player) {
        this.m_Player = this.m_Player;
        this.m_CountTime = 0;
        this.m_YieldTime = 3;
    };
    FallStateScript.prototype.onStateEnter = function () {
        this.m_Player.Locked = true;
        //this.m_CountTime = APP.TimeManager.GameTime + this.m_YieldTime;
        this.m_YieldCallBack = setTimeout(function () {
            APP_1.default.MessageManager.Fire(MessageCenter_1.MessageMD.GameEvent.PlayerDeath);
        }, 3000);
    };
    FallStateScript.prototype.onStateExit = function () {
        if (this.m_YieldCallBack)
            clearTimeout(this.m_YieldCallBack);
    };
    return FallStateScript;
}(Laya.AnimatorStateScript));
},{"../Utility/Path":40,"./../FrameWork/MessageCenter":10,"./../controler/APP":43,"./../controler/GameAPP":44,"./../controler/GameControler":45,"./Character":19,"./CharacterAnimator":20,"./GameItem":22,"./PlayerCtrler":29}],29:[function(require,module,exports){
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
            this.m_TargetPS = this.player.CurStep.position;
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
                            return;
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
            player.ResetParenet();
            player.Fly();
            var stepPS = player.CurStep.standPoint.transform.position.clone();
            stepPS.y += GameModule_1.GameModule.VSpace * 0.6;
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
},{"./../controler/APP":43,"./../controler/GameControler":45,"./GameModule":24}],30:[function(require,module,exports){
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
        var _this = _super.call(this) || this;
        if (_this.Idx != 0) {
            var Idx = Math.random() * Step.stepModelNum;
            Idx = Idx > 0.5 ? 2 : 1;
            var name = Path_1.path.GetLH("dizuo_qiu0" + Idx);
            var model = Laya.loader.getRes(name);
        }
        var cloneModel = model.clone();
        _this.m_CharacterAnimator = new StepAnimator(cloneModel.getChildAt(0).getComponent(Laya.Animator), _this);
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
    Object.defineProperty(Step.prototype, "position", {
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
    Object.defineProperty(Step.prototype, "standPoint", {
        get: function () {
            return this.m_StandPoint;
        },
        enumerable: true,
        configurable: true
    });
    Step.prototype.PutItem = function (itemEnume) {
        if (itemEnume == GameItem_1.Item.ItemType.Empty) {
            this.active = false;
            this.locked = true;
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
            this.position = newPs;
        this.StepItem.PutItem(GameItem_1.Item.ItemType.None);
        this.LeftParent = null;
        this.RightParent = null;
        this.LeftChild = null;
        this.RightChild = null;
        this._IsDeadRoad = false;
        this.RoadNum = 0;
        this.active = true;
        this.locked = false;
        this.m_CharacterAnimator.play("idle");
        var position = this.transform.localPosition;
        position.y = 0;
        this.transform.localPosition = position;
        if (this.m_YieldFunc) {
            clearTimeout(this.m_YieldFunc);
        }
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
        this.m_CharacterAnimator.play("fall");
    };
    Step.prototype.PutInItem = function (sprite3D) {
        this.m_StandPoint.addChild(sprite3D);
    };
    Step.prototype.Break = function () {
        var randomTime = 1000 * Math.random();
        var step = this;
        this.m_YieldFunc = setTimeout(function () {
            step.YieldBreak();
        }, randomTime);
    };
    Step.prototype.YieldBreak = function () {
        this.m_CharacterAnimator.play("warning");
        this.m_YieldFunc = null;
    };
    //模型个数
    Step.stepModelNum = 2;
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
        var stepFallState = this.GetState("fall");
        var stepFallScript = stepFallState.addScript(Laya.AnimatorStateScript);
        var stepAnimator = this;
        var fallDownState = this.GetState("fallDown");
        var fallDownScript = fallDownState.addScript(FallDownScript);
        fallDownScript.Init(this.m_Step, this);
        var warningState = this.GetState("warning");
        var warningScript = warningState.addScript(WarningScript);
        warningScript.Init(this.m_Step, this);
    };
    StepAnimator.prototype.play = function (name) {
        var animatorStateName = this.curStateName;
        switch (name) {
            case "fallDown":
            case "warning":
            case "idle":
                _super.prototype.play.call(this, name);
                break;
            default:
                if (animatorStateName != "fallDown" && animatorStateName != "warning") {
                    _super.prototype.play.call(this, name);
                }
                break;
        }
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
        this.m_Animator = animator;
    };
    FallDownScript.prototype.onStateEnter = function () {
        this.m_Step.locked = true;
        this.m_TimeCount = APP_1.default.TimeManager.GameTime + this.m_CountinueTime;
    };
    FallDownScript.prototype.onStateExit = function () {
        var stepPosition = this.m_Step.transform.localPosition;
        this.m_Step.transform.localPosition = stepPosition;
        if (this.m_TimeOut)
            clearTimeout(this.m_TimeOut);
    };
    FallDownScript.prototype.onStateUpdate = function () {
        var _this = this;
        if (!this.m_Player && this.m_Step.standPoint.numChildren > 0) {
            this.m_Player = this.m_Step.standPoint.getChildByName("Player");
            if (this.m_Player) {
                this.m_Player.ResetParenet();
                this.m_TimeOut = setTimeout(function () {
                    _this.m_Player.FallDown();
                }, 150);
            }
        }
        var lastFrameTime = this.m_TimeCount - APP_1.default.TimeManager.GameTime;
        if (lastFrameTime < 0) {
            return;
        }
        if (this.m_Speed < 1)
            this.m_Speed += (this.m_CountinueTime - lastFrameTime) * 0.5;
        var position = this.m_Step.position;
        position.y -= this.m_Speed;
        this.m_Step.position = position;
    };
    return FallDownScript;
}(Laya.AnimatorStateScript));
var WarningScript = /** @class */ (function (_super) {
    __extends(WarningScript, _super);
    function WarningScript() {
        var _this = _super.call(this) || this;
        _this.m_CountinueTime = 1;
        return _this;
    }
    Object.defineProperty(WarningScript.prototype, "EndTimePoint", {
        get: function () {
            return this.m_TimeCount + this.m_CountinueTime;
        },
        enumerable: true,
        configurable: true
    });
    WarningScript.prototype.Init = function (step, animator) {
        this.m_Step = step;
        this.m_Animator = animator;
        this.m_ShakeTimeCount = 0;
    };
    WarningScript.prototype.onStateEnter = function () {
        this.m_TimeCount = APP_1.default.TimeManager.GameTime;
        this.m_CountinueTime = 1;
        this.m_StartXPositin = this.m_Step.transform.position.x;
        this.m_SwitchNum = 0.06;
    };
    WarningScript.prototype.onStateExit = function () {
        var stepPosition = this.m_Step.transform.localPosition;
        this.m_Step.transform.localPosition = stepPosition;
    };
    WarningScript.prototype.onStateUpdate = function () {
        var curGameTime = APP_1.default.TimeManager.GameTime;
        if (curGameTime < this.EndTimePoint) {
            if (this.m_ShakeTimeCount > 2) {
                this.m_SwitchNum *= -1;
                var newXPosition = this.m_SwitchNum + this.m_StartXPositin;
                var stepPosition = this.m_Step.position;
                stepPosition.x = newXPosition;
                this.m_Step.position = stepPosition;
                this.m_ShakeTimeCount;
                this.m_ShakeTimeCount = 0;
            }
            else {
                ++this.m_ShakeTimeCount;
            }
        }
        else {
            this.m_Animator.play("fallDown");
        }
    };
    return WarningScript;
}(Laya.AnimatorStateScript));
},{"./../Utility/Path":40,"./../controler/APP":43,"./CharacterAnimator":20,"./GameItem":22,"./GameStruct":25}],31:[function(require,module,exports){
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
},{"./GameConfig":14,"./Scene/LoadScene":36,"./controler/APP":43}],32:[function(require,module,exports){
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
        for (var i = 0; i < 10; i++) {
            var characterModel = CharacterMamager_1.default.Mgr.GetCharacterModel(i);
            var audt = characterModel;
            audt.transform.localScale = new Laya.Vector3(_this.initScalNum, _this.initScalNum, _this.initScalNum);
            _this.addChild(audt);
            _this.arrayDis.push(audt);
        }
        _this.cntSelectIndex = (_this.cntSelectIndex + 5) % 5;
        _this.nextAo = (_this.startao + (_this.cntNum - _this.cntSelectIndex) * _this.perao + 360) % 360;
        _this.updateSelect();
        return _this;
    }
    CharacterUIScene.prototype.updateSelectSex = function (cntSelectSex) {
        if (cntSelectSex == 0) {
            for (var i = 0; i < 10; i++) {
                if (i < 5) {
                    this.arrayDis[i].active = true;
                }
                else {
                    this.arrayDis[i].active = false;
                }
            }
        }
        else {
            for (var i = 0; i < 10; i++) {
                if (i >= 5) {
                    this.arrayDis[i].active = true;
                }
                else {
                    this.arrayDis[i].active = false;
                }
            }
        }
        this.cntSelectSex = cntSelectSex;
    };
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
        for (var i = 0; i < 5; i++) {
            var ao = (this.cntstartao + i * this.perao) % 360;
            var x = this.r * Math.cos(ao * 3.14 / 180);
            var y = this.startY + this.r * Math.sin(ao * 3.14 / 180);
            this.arrayDis[5 + i].transform.position = this.arrayDis[i].transform.position = new Laya.Vector3(x, y, 0);
            var scale = 0.2 * y;
            if (scale >= 0) {
                this.arrayDis[5 + i].transform.localScale = this.arrayDis[i].transform.localScale = new Laya.Vector3(this.initScalNum + scale, this.initScalNum + scale, this.initScalNum + scale);
            }
            else {
                this.arrayDis[5 + i].transform.localScale = this.arrayDis[i].transform.localScale = new Laya.Vector3(this.initScalNum, this.initScalNum, this.initScalNum);
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
},{"./../Utility/Path":40,"./Scene":37,"./ScenePlay/GameScenePlay":38}],34:[function(require,module,exports){
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
},{"../controler/APP":43,"./../Scene/Scene":37,"./../Utility/Path":40,"./../ui/EnterGameUI":53}],36:[function(require,module,exports){
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
            Path_1.path.GetLH("c001_baby_01"),
            Path_1.path.GetLH("c001_adult_01"),
            Path_1.path.GetLH("c001_senior_01"),
            Path_1.path.GetLH("c001_teen_01"),
            Path_1.path.GetLH("c002_child_01"),
            Path_1.path.GetLH("c002_baby_01"),
            Path_1.path.GetLH("c002_teen_01"),
            Path_1.path.GetLH("L01_spr_barrier_01"),
            Path_1.path.GetLH("L01_spr_barrier_02"),
            Path_1.path.GetLH("L01_spr_barrier_03"),
            Path_1.path.GetLH("L01_spr_barrier_04"),
            Path_1.path.GetLH("dizuo_qiu01"),
            Path_1.path.GetLH("dizuo_qiu02"),
            Path_1.path.GetLH("dizuo_qiu03"),
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
},{"./../Scene/Scene":37,"./../Utility/Path":40,"./../controler/APP":43,"./../ui/BG":49,"./../ui/UnDownload/LoadingUI":58,"./GuiderManager":35}],37:[function(require,module,exports){
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
},{"../FrameWork/FrameWork":9,"./../Base/FSM":7,"./../FrameWork/MessageCenter":10,"./../controler/APP":43}],38:[function(require,module,exports){
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
var GameAgent_1 = require("./../../Agent/GameAgent");
var GameAPP_1 = require("../../controler/GameAPP");
var WechatOpen_1 = require("../../platform/WechatOpen");
var GameMap_1 = require("../../Game/GameMap");
var GameModule_1 = require("../../Game/GameModule");
var ModelFunc_1 = require("../../Utility/ModelFunc");
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
            value.SetLeftTouch(this, function () { ModelFunc_1.ModelFunc.vibrate(25); _this.InputCtrl.Input(false); });
            value.SetRightTouch(this, function () { ModelFunc_1.ModelFunc.vibrate(25); _this.InputCtrl.Input(true); });
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
            var rangeNum = 3;
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
        if (this.Player.CurStep.locked || this.Player.Locked)
            return;
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
        if (this.Player.BaseCtrler.Time > 0)
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
        this.Camera.orthographic = true;
        this.Camera.orthographicVerticalSize = 40;
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
        var cameraPs = this.Player.Position.clone();
        cameraPs.y += 0.2;
        this.Camera.transform.position = cameraPs;
        this.Camera.Init();
        this._StartPosition = this.Player.Position;
        this.Camera.Reset(new Laya.Vector3(), new Laya.Vector3(0, GameModule_1.GameModule.HSpace * 3.2, GameModule_1.GameModule.HSpace * 3.2), this.Player);
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
        }
    };
    GameScenePlay.prototype.UseSkillItem = function () {
        if (GameAgent_1.GameAgent.Agent.SkillItemNum < 1)
            return;
        if (this.Player.CurStep.locked)
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
        if (this.Player.CurStep.locked)
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
},{"../../Game/GameMap":23,"../../Game/GameModule":24,"../../Utility/ModelFunc":39,"../../controler/GameAPP":44,"../../platform/WechatOpen":46,"./../../Agent/GameAgent":2,"./../../FrameWork/MessageCenter":10,"./../../Game/GameCamera":21,"./../../Game/GameItem":22,"./../../Game/GameStruct":25,"./../../Game/Input":26,"./../../Game/Player":28,"./../../Scene/Scene":37,"./../../controler/APP":43,"./../../ui/EndGameUI":52,"./../../ui/GameUI":54}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModelFunc;
(function (ModelFunc) {
    function FindChildByName(width) {
    }
    ModelFunc.FindChildByName = FindChildByName;
    function vibrate(vibrateNumber) {
        if (Laya.Browser.window.conchConfig) {
            var os = Laya.Browser.window.conchConfig.getOS();
            var bridge;
            var obj = {};
            if (os == "Conch-ios") {
                bridge = Laya.PlatformClass.createClass("JSBridge"); //创建脚步代理
            }
            else if (os == "Conch-android") {
                //需要完整的类路径，注意与iOS的不同
                bridge = Laya.PlatformClass.createClass("demo.JSBridge"); //创建脚步代理
            }
            if (os == "Conch-ios") {
                //   //iOS注意函数签名，注意与Android的不同
                //   alert(bridge.call("testString:","hello"));
                //   alert(bridge.call("testNumber:",256.0)); 
                //   alert(bridge.call("testBool:",false));
                //   obj.value = "Hello OC!";
                //   bridge.callWithBack(function(value) {
                //     var obj = JSON.parse(value)
                //     alert(obj.value);
                //     },"testAsyncCallback:", JSON.stringify(obj));
            }
            else if (os == "Conch-android") {
                bridge.call("vibrate", vibrateNumber);
                //   alert(bridge.call("testNumber",256.0));
                //   alert(bridge.call("testBool",false));
                //   obj.value = "Hello Java!";
                //   bridge.callWithBack(function(value) {
                //     var obj = JSON.parse(value)
                //     alert(obj.value);
                //   },"testAsyncCallback",JSON.stringify(obj));
                return;
            }
        }
        if (!navigator.vibrate) {
            return;
        }
        //震5秒
        //navigator.vibrate(5000);
        //震5秒，停0.3秒，在震4秒
        navigator.vibrate(vibrateNumber);
    }
    ModelFunc.vibrate = vibrate;
})(ModelFunc = exports.ModelFunc || (exports.ModelFunc = {}));
},{}],40:[function(require,module,exports){
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
},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIButtonTouchEvent = /** @class */ (function (_super) {
    __extends(UIButtonTouchEvent, _super);
    function UIButtonTouchEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIButtonTouchEvent.addButtonTouchEvent = function (e) {
        e.on(Laya.Event.MOUSE_DOWN, this, this.buttonTouchDown);
        e.on(Laya.Event.MOUSE_UP, this, this.buttonTouchUp);
        e.on(Laya.Event.MOUSE_OUT, this, this.buttonTouchUp);
        e.on(Laya.Event.MOUSE_OVER, this, this.buttonTouchUp);
    };
    UIButtonTouchEvent.buttonTouchDown = function (e) {
        e.currentTarget.scaleX = e.currentTarget.scaleY = 1.1;
    };
    UIButtonTouchEvent.buttonTouchUp = function (e) {
        e.currentTarget.scaleX = e.currentTarget.scaleY = 1;
    };
    return UIButtonTouchEvent;
}(Laya.Script));
exports.default = UIButtonTouchEvent;
},{}],42:[function(require,module,exports){
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
},{}],43:[function(require,module,exports){
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
},{"../Game/GameModule":24,"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10,"./../FrameWork/SceneManager":11,"./../FrameWork/TimeManager":12,"./../FrameWork/UIManager":13}],44:[function(require,module,exports){
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
},{"./../GameManager/CharacterMamager":15,"./../GameManager/ItemManager":17}],45:[function(require,module,exports){
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
},{"../Game/GameModule":24,"./../Agent/PlayerGuestAgent":4,"./../Game/GameStruct":25,"./../Scene/GameScene":34,"./../ui/CharacterUI":51,"./../ui/RankPanelUI":56,"./../ui/SetPanelUI":57,"./APP":43}],46:[function(require,module,exports){
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
},{}],47:[function(require,module,exports){
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
},{"./../FrameWork/MessageCenter":10}],48:[function(require,module,exports){
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
},{"./../controler/APP":43,"./../controler/GameControler":45}],49:[function(require,module,exports){
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
},{"../Agent/PlayerGuestAgent":4,"./../Base/BaseFunc":6,"./../Utility/Path":40,"./layaMaxUI":59}],50:[function(require,module,exports){
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
},{"./../Base/BaseEnum":5,"./../FrameWork/FrameWork":9,"./../FrameWork/UIManager":13}],51:[function(require,module,exports){
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
var UIButtonTouchEvent_1 = require("../Utility/UIButtonTouchEvent");
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
        _this.cntSelectSex = 1;
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
        _this._UI.nanBtn.on(Laya.Event.CLICK, _this, _this.nanBtnEvent);
        _this._UI.nvBtn.on(Laya.Event.CLICK, _this, _this.nvBtnEvent);
        _this.spriteBgArr.push(_this._UI.characterrole0bg);
        _this.spriteBgArr.push(_this._UI.characterrole1bg);
        _this.spriteBgArr.push(_this._UI.characterrole2bg);
        _this.spriteBgArr.push(_this._UI.characterrole3bg);
        _this.spriteBgArr.push(_this._UI.characterrole4bg);
        _this.updateNanNvBtnState();
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
        _this._UI.nanBtn.anchorX = _this._UI.nanBtn.anchorY = _this._UI.nvBtn.anchorX = _this._UI.nvBtn.anchorY = 0.5;
        UIButtonTouchEvent_1.default.addButtonTouchEvent(_this._UI.nanBtn);
        UIButtonTouchEvent_1.default.addButtonTouchEvent(_this._UI.nvBtn);
        return _this;
    }
    CharacterUI.prototype.updateNanNvBtnState = function () {
        if (this.cntSelectSex == 0) {
            this._UI.nanBtn.gray = false;
            this._UI.nvBtn.gray = true;
        }
        else {
            this._UI.nanBtn.gray = true;
            this._UI.nvBtn.gray = false;
        }
    };
    CharacterUI.prototype.nvBtnEvent = function (e) {
        if (this.cntSelectSex == 1) {
            return;
        }
        this.cntSelectSex = 1;
        this.updateNanNvBtnState();
        this.characterUIScene && this.characterUIScene.updateSelectSex(this.cntSelectSex);
    };
    CharacterUI.prototype.nanBtnEvent = function (e) {
        if (this.cntSelectSex == 0) {
            return;
        }
        this.cntSelectSex = 0;
        this.updateNanNvBtnState();
        this.characterUIScene && this.characterUIScene.updateSelectSex(this.cntSelectSex);
    };
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
        if (this.cntSelectSex == 1) {
            this.characterUIScene.cntSelectIndex += 5;
        }
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
        for (var i = 0; i < 5; i++) {
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
        this.characterUIScene.updateSelectSex(this.cntSelectSex);
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
},{"../GameManager/CharacterMamager":15,"../Scene/CharacterUIScene":32,"../Utility/UIButtonTouchEvent":41,"../controler/GameAPP":44,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Utility/Path":40,"./../controler/APP":43,"./../controler/GameControler":45,"./BaseUI":50,"./layaMaxUI":59}],52:[function(require,module,exports){
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
},{"../Agent/PlayerGuestAgent":4,"../Scene/GuiderManager":35,"../controler/GameControler":45,"./../Utility/Path":40,"./../controler/GameControler":45,"./BaseUI":50,"./layaMaxUI":59}],53:[function(require,module,exports){
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
},{"../Agent/PlayerGuestAgent":4,"./../Agent/GameAgent":2,"./../Utility/Path":40,"./../controler/APP":43,"./../controler/GameControler":45,"./BaseUI":50,"./layaMaxUI":59}],54:[function(require,module,exports){
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
},{"../Agent/GameAgent":2,"../Game/GameModule":24,"./../Agent/PlayerEntity":3,"./../FrameWork/MessageCenter":10,"./../Utility/Path":40,"./../controler/APP":43,"./../controler/GameControler":45,"./BaseUI":50,"./ItemListUI":55,"./layaMaxUI":59}],55:[function(require,module,exports){
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
},{"../GameManager/ItemManager":17,"./../Agent/GameAgent":2,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Base/BaseEnum":5,"./../FrameWork/MessageCenter":10,"./../Utility/Path":40,"./../controler/APP":43,"./../controler/GameAPP":44,"./../controler/GameControler":45,"./BaseUI":50,"./layaMaxUI":59}],56:[function(require,module,exports){
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
},{"../platform/WechatOpen":46,"./../Base/BaseEnum":5,"./../Utility/Path":40,"./BaseUI":50,"./layaMaxUI":59}],57:[function(require,module,exports){
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
},{"../Scene/GuiderManager":35,"./../Agent/PlayerGuestAgent":4,"./../Base/BaseEnum":5,"./../Game/GameStruct":25,"./../Utility/Path":40,"./../controler/GameControler":45,"./BaseUI":50,"./layaMaxUI":59}],58:[function(require,module,exports){
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
        _this._UI.logo.x = _this._UI.logo.width * 0.1 / 2;
        _this._UI.logo.scaleX = 0.9;
        _this._UI.logo.scaleY = 0.9;
        var scene = Laya.loader.getRes("ui/Resource/LayaScene_MainScene/Conventional/MainScene.ls");
        scene.ambientColor = new Laya.Vector3(1, 1, 1);
        var gameObject = scene.getChildByName("GameObject");
        var zhuyemian_qiu1_idle = scene.getChildByName("zhuyemian_qiu1_idle");
        gameObject.transform.localScale = new Laya.Vector3(0.8, 0.8, 0.8);
        zhuyemian_qiu1_idle.transform.localScale = new Laya.Vector3(0.75, 0.75, 0.75);
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
        this._UI._Progress.visible = false;
        this._CallBack = callBack;
        this._UI._Enter.visible = true;
        this._UI._Enter.label = "";
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
},{"./../BaseUI":50}],59:[function(require,module,exports){
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
},{}]},{},[31])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xheWFlbmdpbmUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FnZW50L0Jhc2VBZ2VudC50cyIsInNyYy9BZ2VudC9HYW1lQWdlbnQudHMiLCJzcmMvQWdlbnQvUGxheWVyRW50aXR5LnRzIiwic3JjL0FnZW50L1BsYXllckd1ZXN0QWdlbnQudHMiLCJzcmMvQmFzZS9CYXNlRW51bS50cyIsInNyYy9CYXNlL0Jhc2VGdW5jLnRzIiwic3JjL0Jhc2UvRlNNLnRzIiwic3JjL0ZyYW1lV29yay9CYXNlTWFuYWdlci50cyIsInNyYy9GcmFtZVdvcmsvRnJhbWVXb3JrLnRzIiwic3JjL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyLnRzIiwic3JjL0ZyYW1lV29yay9TY2VuZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL1RpbWVNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9VSU1hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0dhbWVNYW5hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0l0ZW1NYW5hZ2VyLnRzIiwic3JjL0dhbWUvQW5pbU9iai50cyIsInNyYy9HYW1lL0NoYXJhY3Rlci50cyIsInNyYy9HYW1lL0NoYXJhY3RlckFuaW1hdG9yLnRzIiwic3JjL0dhbWUvR2FtZUNhbWVyYS50cyIsInNyYy9HYW1lL0dhbWVJdGVtLnRzIiwic3JjL0dhbWUvR2FtZU1hcC50cyIsInNyYy9HYW1lL0dhbWVNb2R1bGUudHMiLCJzcmMvR2FtZS9HYW1lU3RydWN0LnRzIiwic3JjL0dhbWUvSW5wdXQudHMiLCJzcmMvR2FtZS9Nb3VudExpbmUudHMiLCJzcmMvR2FtZS9QbGF5ZXIudHMiLCJzcmMvR2FtZS9QbGF5ZXJDdHJsZXIudHMiLCJzcmMvR2FtZS9TdGVwLnRzIiwic3JjL01haW4udHMiLCJzcmMvU2NlbmUvQ2hhcmFjdGVyVUlTY2VuZS50cyIsInNyYy9TY2VuZS9HYW1lRGlyZWN0b3IudHMiLCJzcmMvU2NlbmUvR2FtZVNjZW5lLnRzIiwic3JjL1NjZW5lL0d1aWRlck1hbmFnZXIudHMiLCJzcmMvU2NlbmUvTG9hZFNjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lLnRzIiwic3JjL1NjZW5lL1NjZW5lUGxheS9HYW1lU2NlbmVQbGF5LnRzIiwic3JjL1V0aWxpdHkvTW9kZWxGdW5jLnRzIiwic3JjL1V0aWxpdHkvUGF0aC50cyIsInNyYy9VdGlsaXR5L1VJQnV0dG9uVG91Y2hFdmVudC50cyIsInNyYy9VdGlsaXR5L1VJRnVuYy50cyIsInNyYy9jb250cm9sZXIvQVBQLnRzIiwic3JjL2NvbnRyb2xlci9HYW1lQVBQLnRzIiwic3JjL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyLnRzIiwic3JjL3BsYXRmb3JtL1dlY2hhdE9wZW4udHMiLCJzcmMvc2NyaXB0L0l0ZW1FbGVtZW50LnRzIiwic3JjL3NjcmlwdC9Sb2xlRWxlbWVudC50cyIsInNyYy91aS9CRy50cyIsInNyYy91aS9CYXNlVUkudHMiLCJzcmMvdWkvQ2hhcmFjdGVyVUkudHMiLCJzcmMvdWkvRW5kR2FtZVVJLnRzIiwic3JjL3VpL0VudGVyR2FtZVVJLnRzIiwic3JjL3VpL0dhbWVVSS50cyIsInNyYy91aS9JdGVtTGlzdFVJLnRzIiwic3JjL3VpL1JhbmtQYW5lbFVJLnRzIiwic3JjL3VpL1NldFBhbmVsVUkudHMiLCJzcmMvdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUkudHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1ZBLDZDQUE4QztBQUM5QztJQUdJO1FBRUksSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7SUFDbEUs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QUFJLENBQUM7SUFDaEIsQ0FBQztJQUNMLGtCQUFDO0FBQUQsQ0FsRUEsQUFrRUMsQ0FsRXdDLHlCQUFXLENBQUMsV0FBVyxHQWtFL0Q7O0FBRUQ7SUFBdUIsNEJBQW9CO0lBNEJ2QyxrQkFBWSxJQUFTO1FBQXJCLFlBQ0ksa0JBQU0sSUFBSSxDQUFDLFNBU2Q7UUFSRyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNuQyxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUEsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN2RCxLQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN4RCxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNyRCxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUN6RCxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxDQUFBLEVBQUUsQ0FBQztRQUNyQyxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUEsQ0FBQyxD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LEdBQUcsQ0FBQyxDQUFDO0lBRTVCLE1BQU07SUFDTjtRQUdJO1lBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBQzFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxLQUFLLEVBQWMsQ0FBQztZQUUzQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBRTNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTlELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFD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QyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FYQSxBQVdDLENBWCtCLElBQUksQ0FBQyxJQUFJLEdBV3hDO0lBWFksYUFBVSxhQVd0QixDQUFBO0lBQ0QsR0FBRyxDQUFDLGVBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztJQUNoQztRQUFnQyw4QkFBUztRQUdyQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsbUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0FSQSxBQVFDLENBUitCLElBQUksQ0FBQyxJQUFJLEdBUXhDO0lBUlksYUFBVSxhQVF0QixDQUFBO0lBQ0QsR0FBRyxDQUFDLGVBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxDQUFDLEVBakthLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQWlLZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgKiBhcyBQbGF5ZXJFbnRpdHkgZnJvbSBcIi4vUGxheWVyRW50aXR5XCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZUFnZW50XHJcbntcclxuICAgIHByb3RlY3RlZCBtX1BsYXllckVudGl0eTpQbGF5ZXJFbnRpdHkuUGxheWVyLlBsYXllckVudGl0eTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5ID0gUGxheWVyRW50aXR5LlBsYXllci5QbGF5ZXJFbnRpdHkuRW50aXR5O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLy4uL0dhbWUvR2FtZU1vZHVsZVwiXHJcbmltcG9ydCB7IEdhbWVNYW5hZ2VyIH0gZnJvbSBcIi4vLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVBUFBcIjtcclxuaW1wb3J0IEJhc2VBZ2VudCBmcm9tIFwiLi9CYXNlQWdlbnRcIlxyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVBZ2VudCBleHRlbmRzIEJhc2VBZ2VudCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfQWdlbnQ6IEdhbWVBZ2VudDtcclxuICAgIHN0YXRpYyBnZXQgQWdlbnQoKTogR2FtZUFnZW50IHtcclxuICAgICAgICBpZiAodGhpcy5fQWdlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9BZ2VudCA9IG5ldyBHYW1lQWdlbnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0FnZW50O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtX1VzZUl0ZW1OdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Ta2lsbEl0ZW1JRDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1NraWxsSXRlbU51bTogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgQ3VyTGV2ZWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJMZXZlbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgQ3VyTGV2ZWwodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyTGV2ZWwgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VyTWF4TGV2ZWwoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEN1ckNoYXJhY3RlcklEKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEN1ckl0ZW0oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBJdGVtTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5JdGVtTGlzdFxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBDdXJJdGVtKGlkOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXRoaXMuSXRlbUxpc3RbaWRdKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtID0gaWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVJdGVtTnVtKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VySXRlbU51bSA8IHRoaXMubV9Vc2VJdGVtTnVtID8gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtTnVtIDogdGhpcy5tX1VzZUl0ZW1OdW07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IFNraWxsSXRlbU51bSgpOiBudW1iZXIgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1NraWxsSXRlbU51bTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRHb2xkKGdvbGQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghZ29sZCB8fCBnb2xkIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1vbmV5ID0gdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSArIGdvbGQ7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSA9IG1vbmV5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRTY29yZShzY29yZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCFzY29yZSB8fCBzY29yZSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzY29yZSA9IHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyU2NvcmUgKyBzY29yZTtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1clNjb3JlID0gc2NvcmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBDdXJTY29yZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1clNjb3JlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldEdhbWVJdGVtKCkge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKFBsYXllci5FdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UpO1xyXG4gICAgICAgIHRoaXMubV9Vc2VJdGVtTnVtID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVzZXRTa2lsbEl0ZW0oKSB7XHJcbiAgICAgICAgdmFyIENoYXJhY3RlcklEOiBudW1iZXIgPSB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgICAgIHRoaXMubV9Ta2lsbEl0ZW1OdW0gPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRTa2lsbEl0ZW0oQ2hhcmFjdGVySUQpIDwgMCA/IDAgOiAxO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKEdhbWVNb2R1bGUuRXZlbnQuT25DaGFyYWN0ZXJJdGVtQ2hhbmdlKTtcclxuICAgICAgICB0aGlzLm1fU2tpbGxJdGVtTnVtID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXNlR2FtZUl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuR2FtZUl0ZW1OdW0gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICAtLXRoaXMubV9Vc2VJdGVtTnVtO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuUmVkdWNlSXRlbSh0aGlzLkN1ckl0ZW0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVc2VTa2lsbEl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuU2tpbGxJdGVtTnVtIDwgMSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAtLXRoaXMubV9Ta2lsbEl0ZW1OdW07XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoR2FtZU1vZHVsZS5FdmVudC5PbkNoYXJhY3Rlckl0ZW1DaGFuZ2UpO1xyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCB7IFdlY2hhdE9wZW4gfSBmcm9tIFwiLi4vcGxhdGZvcm0vV2VjaGF0T3BlblwiO1xyXG5cclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXIge1xyXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50IHtcclxuICAgICAgICBzdGF0aWMgT25Nb25leUNoYW5nZTogc3RyaW5nID0gXCJPbk1vbmV5Q2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VyQ2hhcmFjdGVySURDaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJDaGFyYWN0ZXJJRENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkhpc3RvcnlNYXhMZXZlbENoYW5nZTogc3RyaW5nID0gXCJPbkhpc3RvcnlNYXhMZXZlbENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckxldmVsQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VyTGV2ZWxDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DaGFyYWN0ZXJMaXN0Q2hhbmdlOiBzdHJpbmcgPSBcIk9uQ2hhcmFjdGVyTGlzdENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckl0ZW1DaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJJdGVtQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uSXRlbUxpc3RDaGFuZ2U6IHN0cmluZyA9IFwiT25JdGVtTGlzdENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1clNjb3JlQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VyU2NvcmVDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJJdGVtTnVtQ2hhbmdlOiBzdHJpbmcgPSBcIk9uQ3VySXRlbU51bUNoYW5nZVwiXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckVudGl0eSB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgbV9FbnRpdHk6IFBsYXllckVudGl0eTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldCBFbnRpdHkoKTogUGxheWVyRW50aXR5IHtcclxuICAgICAgICAgICAgaWYgKCFQbGF5ZXJFbnRpdHkubV9FbnRpdHkpIHtcclxuICAgICAgICAgICAgICAgIFBsYXllckVudGl0eS5tX0VudGl0eSA9IG5ldyBQbGF5ZXJFbnRpdHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFBsYXllckVudGl0eS5tX0VudGl0eTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBtX0ZyYW1lV29yazogRnJhbWVXb3JrO1xyXG4gICAgICAgIHByaXZhdGUgbV9NZXNzYWdlTWdyOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuXHJcbiAgICAgICAgLy/pkrFcclxuICAgICAgICBwcml2YXRlIG1fTW9uZXk6IG51bWJlcjtcclxuICAgICAgICAvL+mAieS4reinkuiJsklEXHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1ckNoYXJhY3RlcklEOiBudW1iZXI7XHJcbiAgICAgICAgLy/njqnlrrblt7Lop6PplIHnmoTmnIDpq5jlhbPljaFcclxuICAgICAgICBwcml2YXRlIG1fSGlzdG9yeU1heExldmVsOiBudW1iZXI7XHJcbiAgICAgICAgLy/lvZPliY3pgInkuK3lhbPljaFcclxuICAgICAgICBwcml2YXRlIG1fQ3VyTGV2ZWw6IG51bWJlcjtcclxuICAgICAgICAvL+inkuiJsuWIl+ihqFxyXG4gICAgICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJMaXN0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8v5b2T5YmN5oul6YCJ5Lit6YGT5YW3XHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1ckl0ZW06IG51bWJlcjtcclxuICAgICAgICAvL+eJqeWTgeWIl+ihqFxyXG4gICAgICAgIHByaXZhdGUgbV9JdGVtTGlzdDogQXJyYXk8bnVtYmVyPjtcclxuICAgICAgICAvL+enr+WIhlxyXG4gICAgICAgIHByaXZhdGUgbV9DdXJTY29yZTogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IE1vbmV5KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fTW9uZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgTW9uZXkodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gdGhpcy5tX01vbmV5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX01vbmV5ID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25Nb25leUNoYW5nZSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckNoYXJhY3RlcklEO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1ckNoYXJhY3RlcklEKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9DdXJDaGFyYWN0ZXJJRCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJDaGFyYWN0ZXJJRCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VyQ2hhcmFjdGVySURDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1ckxldmVsKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyTGV2ZWw7Ly8gPyB0aGlzLm1fQ3VyTGV2ZWwgOiB0aGlzLm1fSGlzdG9yeU1heExldmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEN1ckxldmVsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMuQ3VyTGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyTGV2ZWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckxldmVsQ2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIaXN0b3J5TWF4TGV2ZWwoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgSGlzdG9yeU1heExldmVsKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fSGlzdG9yeU1heExldmVsID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25IaXN0b3J5TWF4TGV2ZWxDaGFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ2hhcmFjdGVyTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ2hhcmFjdGVyTGlzdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJJdGVtKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9DdXJJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1ckl0ZW0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckl0ZW1DaGFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VySXRlbSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckl0ZW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VySXRlbU51bSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5HZXRJdGVtTnVtKHRoaXMuQ3VySXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSXRlbUxpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSXRlbUxpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VyU2NvcmUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJTY29yZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJTY29yZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fQ3VyU2NvcmUgPSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1clNjb3JlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkudXBkYXRlU2NvcmUodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VyU2NvcmVDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHZhciBpbnRlcmVzdGluZ2xpZmUgPSAoTGF5YS5Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkludGVyZXN0aW5nbGlmZVwiKSAhPSBudWxsID8gSlNPTi5wYXJzZShMYXlhLkxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiSW50ZXJlc3RpbmdsaWZlXCIpKSA6IHt9KTtcclxuICAgICAgICAgICAgdGhpcy5tX01vbmV5ID0gaW50ZXJlc3RpbmdsaWZlLm1fTW9uZXkgfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckxldmVsID0gaW50ZXJlc3RpbmdsaWZlLm1fQ3VyTGV2ZWwgfHwgMTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckNoYXJhY3RlcklEID0gaW50ZXJlc3RpbmdsaWZlLm1fQ3VyQ2hhcmFjdGVySUR8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdCA9IGludGVyZXN0aW5nbGlmZS5tX0NoYXJhY3Rlckxpc3QgfHwgWzEsMCwwLDAsMF07XHJcbiAgICAgICAgICAgIHRoaXMubV9IaXN0b3J5TWF4TGV2ZWwgPSBpbnRlcmVzdGluZ2xpZmUubV9IaXN0b3J5TWF4TGV2ZWwgfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5tX0N1ckl0ZW0gPSBpbnRlcmVzdGluZ2xpZmUubV9DdXJJdGVtIHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9GcmFtZVdvcmsgPSBGcmFtZVdvcmsuRk07XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gaW50ZXJlc3RpbmdsaWZlLm1fSXRlbUxpc3QgfHwgW107XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTY29yZSA9IGludGVyZXN0aW5nbGlmZS5tX0N1clNjb3JlIHx8IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2F2ZURhdGFUb0xvY2FsKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxEYXRhOmFueSA9IHt9O1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9Nb25leSA9IHRoaXMubV9Nb25leTtcclxuICAgICAgICAgICAgbG9jYWxEYXRhLm1fQ3VyTGV2ZWwgPSB0aGlzLm1fQ3VyTGV2ZWw7XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0N1ckNoYXJhY3RlcklEID0gdGhpcy5tX0N1ckNoYXJhY3RlcklEO1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9DaGFyYWN0ZXJMaXN0ID0gdGhpcy5tX0NoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0hpc3RvcnlNYXhMZXZlbCA9IHRoaXMubV9IaXN0b3J5TWF4TGV2ZWw7XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0N1ckl0ZW0gPSB0aGlzLm1fQ3VySXRlbTtcclxuICAgICAgICAgICAgbG9jYWxEYXRhLm1fSXRlbUxpc3QgPSB0aGlzLm1fSXRlbUxpc3Q7XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0N1clNjb3JlID0gdGhpcy5tX0N1clNjb3JlO1xyXG4gICAgICAgICAgICBMYXlhLkxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiSW50ZXJlc3RpbmdsaWZlXCIsIGxvY2FsRGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBBZGRDaGFyYWN0ZXIoaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdFtpZF0gPSAxO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQWRkSXRlbShpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5tX0l0ZW1MaXN0W2lkXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0l0ZW1MaXN0W2lkXSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKyt0aGlzLm1fSXRlbUxpc3RbaWRdO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UpO1xyXG4gICAgICAgICAgICBpZiAoaWQgPT0gdGhpcy5DdXJJdGVtKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFJlZHVjZUl0ZW0oaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubV9JdGVtTGlzdFtpZF0gfHwgdGhpcy5tX0l0ZW1MaXN0W2lkXSA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC0tdGhpcy5tX0l0ZW1MaXN0W2lkXTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlKTtcclxuICAgICAgICAgICAgaWYgKGlkID09IHRoaXMuQ3VySXRlbSlcclxuICAgICAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJJdGVtTnVtQ2hhbmdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBHZXRJdGVtTnVtKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdmFyIG51bTogbnVtYmVyID0gdGhpcy5tX0l0ZW1MaXN0W2lkXTtcclxuICAgICAgICAgICAgbnVtID0gbnVtID8gbnVtIDogMDtcclxuICAgICAgICAgICAgcmV0dXJuIG51bTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IEJhc2VBZ2VudCBmcm9tIFwiLi9CYXNlQWdlbnRcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckd1ZXN0QWdlbnQgZXh0ZW5kcyBCYXNlQWdlbnQge1xyXG4gICAgc3RhdGljIF9BZ2VudDogUGxheWVyR3Vlc3RBZ2VudDtcclxuICAgIHN0YXRpYyBnZXQgR3Vlc3RBZ2VudCgpOiBQbGF5ZXJHdWVzdEFnZW50IHtcclxuICAgICAgICBpZiAodGhpcy5fQWdlbnQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9BZ2VudCA9IG5ldyBQbGF5ZXJHdWVzdEFnZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9BZ2VudDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IFNraW5EaXIoKTpTdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcImVudGVyc2NlbmV1aS9yZXNcIiArIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyTGV2ZWwgKyBcIi9cIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IEN1ckxldmVsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgQ3VyTGV2ZWwodmFsOm51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyTGV2ZWwgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBNb25leSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkNoYXJhY3Rlckxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBJdGVtTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5JdGVtTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlDaGFyYWN0ZXIoaWQ6IG51bWJlcikgIHtcclxuICAgICAgICB2YXIgcHJpY2UgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRQcmljZShpZCk7XHJcbiAgICAgICAgaWYgKGlkIDwgMHx8IHByaWNlIDwwIHx8IHByaWNlID4gdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSkgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5IC09IHByaWNlO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQWRkQ2hhcmFjdGVyKGlkKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQnV5SXRlbShpZDogbnVtYmVyKSAge1xyXG4gICAgICAgIHZhciBwcmljZSA9IEdhbWVBUFAuSXRlbU1nci5HZXRQcmljZShpZCk7XHJcbiAgICAgICAgaWYoaWQgPCAwfHwgcHJpY2UgPDAgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihwcmljZSA+IHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuTW9uZXkgLT0gcHJpY2U7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5BZGRJdGVtKGlkKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0Q2hhcmFjdGVyKGlkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJMaXN0OkFycmF5PG51bWJlcj4gPSB0aGlzLkNoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgaWYoY2hhcmFjdGVyTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEID0gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBCYXNlRW51bSB7XHJcbiAgICBleHBvcnQgZW51bSBVSVR5cGVFbnVtIHtMb3csTWlkbGV9O1xyXG59IiwiaW1wb3J0IEJhc2VNZ3IgZnJvbSBcIi4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiO1xyXG4vKipcclxuICog5a6a5LmJ5Z+656GA57uT5p6E5L2TXHJcbiAqL1xyXG5leHBvcnQgbW9kdWxlIEJhc2VGdW5jIHtcclxuICAgIGVudW0gVUlUeXBlRW51bSB7IExvdywgTWlkbGUgfTtcclxuICAgIGV4cG9ydCBjbGFzcyBNYXA8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9Db3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX01hcDogeyBba2V5OiBzdHJpbmddOiBUIH07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX01hcCA9IHt9O1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3JFYWNoKGNhbGxiYWNrOiAobWdyOiBULCBrZXk6IHN0cmluZykgPT4gdm9pZCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBtYXBLZXkgaW4gdGhpcy5fTWFwKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzLl9NYXBbbWFwS2V5XSwgbWFwS2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gb2JqIOaUvuWFpeWvueixoVxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0KG9iajogVCwga2V5OiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9NYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG9iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2V0KGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGtleSDnp7vpmaTmn5DkuKrlr7nosaFcclxuICAgICAgICAgKiBAcmV0dXJucyDooqvnp7vpmaTlr7nosaFcclxuICAgICAgICAgKi9cclxuICAgICAgICBSZW1vdmUoa2V5OiBzdHJpbmcpOiBUIHtcclxuICAgICAgICAgICAgdmFyIE9iajogVCA9IHRoaXMuX01hcFtrZXldO1xyXG4gICAgICAgICAgICBpZiAoT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9NYXBba2V5XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg6ZSuXHJcbiAgICAgICAgICogQHJldHVybnMg5piv5ZCm5oul5pyJXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgSGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9NYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm9kZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX1ZhbHVlOiBUO1xyXG4gICAgICAgIHByaXZhdGUgX05leHQ6IE5vZGU8VD47XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBWYWx1ZSgpOiBUIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgVmFsdWUodmFsdWU6IFQpIHtcclxuICAgICAgICAgICAgdGhpcy5fVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IE5leHQoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9OZXh0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgTmV4dChub2RlOiBOb2RlPFQ+KSB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9OZXh0ID0gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgTm9kZVBvb2w8VD5cclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgX05vZGVMaXN0OiBOb2RlPFQ+O1xyXG4gICAgICAgIFB1bGxCYWNrKG5vZGU6IE5vZGU8VD4pIHtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9Ob2RlTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QuTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9Ob2RlTGlzdCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQXF1aXJlKCk6IE5vZGU8VD4ge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IHRoaXMuX05vZGVMaXN0O1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QgPSB0aGlzLl9Ob2RlTGlzdC5OZXh0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbm9kZSA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTm9kZVF1ZXVlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfQ291bnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBfSGVhZDogTm9kZTxUPlxyXG4gICAgICAgIHByaXZhdGUgX1RhaWxlXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUG9wTm9kZSgpOiBOb2RlPFQ+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0NvdW50IDwgMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBub2RlOiBOb2RlPFQ+ID0gbnVsbDtcclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX0hlYWQ7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWQgPSB0aGlzLl9IZWFkLk5leHQ7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIC0tdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIC8v5Yir5oqK5bC+5be05bim5Ye65Y675LqGXHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaCh2YWx1ZTogVCkge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoTm9kZShub2RlOiBOb2RlPFQ+KSB7XHJcbiAgICAgICAgICAgIG5vZGUuTmV4dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9Db3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9IZWFkID0gbm9kZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxlLk5leHQgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbm9kZTtcclxuICAgICAgICAgICAgKyt0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIENsZWFyKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RhaWxlID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fSGVhZCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGVhZE5vZGUoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkhlYWROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEhlYWRWYWx1ZSgpOiBUIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX0hlYWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9IZWFkLlZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgVGFpbE5vZGUoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRhaWxOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFRhaWxWYWx1ZSgpOiBUIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX1RhaWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fVGFpbGUudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFF1ZXVlPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfTm9kZVBvb2w6IE5vZGVQb29sPFQ+O1xyXG4gICAgICAgIHByaXZhdGUgX05vZGVRdWV1ZTogTm9kZVF1ZXVlPFQ+O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5fTm9kZVBvb2wgPSBuZXcgTm9kZVBvb2w8VD4oKTtcclxuICAgICAgICAgICAgdGhpcy5fTm9kZVF1ZXVlID0gbmV3IE5vZGVRdWV1ZTxUPigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1c2godmFsdWU6IFQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6IE5vZGU8VD4gPSB0aGlzLl9Ob2RlUG9vbC5BcXVpcmUoKTtcclxuICAgICAgICAgICAgbm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUXVldWUuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUG9wKCk6IFQge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IHRoaXMuX05vZGVRdWV1ZS5Qb3BOb2RlKCk7XHJcbiAgICAgICAgICAgIGlmIChub2RlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9Ob2RlUG9vbC5QdWxsQmFjayhub2RlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX05vZGVRdWV1ZS5Db3VudDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNtb290aERhbXAge1xyXG4gICAgICAgIHByaXZhdGUgbV9DdXJyZW50VmVsb2NpdHk6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1fU21vb3RoVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9NYXhTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9NYXhNb3ZlTnVtOm51bWJlcjtcclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gc21vb3RoVGltZSDlubPmu5Hml7bplb9cclxuICAgICAgICAgKiBAcGFyYW0gbWF4U3BlZWQg5pyA5aSn6YCf5bqmXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc21vb3RoVGltZTogbnVtYmVyLCBtYXhTcGVlZDogbnVtYmVyID0gMTApIHtcclxuICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9TbW9vdGhUaW1lID0gc21vb3RoVGltZTtcclxuICAgICAgICAgICAgdGhpcy5tX01heFNwZWVkID0gbWF4U3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMubV9NYXhNb3ZlTnVtID0gdGhpcy5tX01heFNwZWVkICogdGhpcy5tX1Ntb290aFRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gY3VycmVudCDlvZPliY3lgLxcclxuICAgICAgICAgKiBAcGFyYW0gdGFyZ2V0IOebruagh+WAvFxyXG4gICAgICAgICAqIEBwYXJhbSBkZWx0YVRpbWUg5bin546HXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIFNtb290aERhbXAoY3VycmVudDpudW1iZXIsdGFyZ2V0Om51bWJlcixkZWx0YVRpbWU6bnVtYmVyID0gMS82MCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbnVtOm51bWJlciA9IDIvdGhpcy5tX1Ntb290aFRpbWU7XHJcbiAgICAgICAgICAgIHZhciBudW0yOm51bWJlciA9IG51bSAqIGRlbHRhVGltZTtcclxuICAgICAgICAgICAgdmFyIG51bTM6bnVtYmVyID0gMS8oMStudW0yKzAuNDgqbnVtMipudW0yKzAuMjM1Km51bTIqbnVtMipudW0yKTtcclxuICAgICAgICAgICAgdmFyIG51bTQ6bnVtYmVyID0gY3VycmVudCAtIHRhcmdldDtcclxuICAgICAgICAgICAgdmFyIG51bTU6bnVtYmVyID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICB2YXIgbnVtNjpudW1iZXIgPSB0aGlzLm1fTWF4U3BlZWQgKiB0aGlzLm1fU21vb3RoVGltZTtcclxuICAgICAgICAgICAgbnVtNCA9IG51bTQgPi1udW02JiZudW00PG51bTY/bnVtNDoobnVtND5udW02P251bTY6LW51bTYpO1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBjdXJyZW50IC0gbnVtNDtcclxuICAgICAgICAgICAgdmFyIG51bTc6bnVtYmVyID0gKHRoaXMubV9DdXJyZW50VmVsb2NpdHkrbnVtKm51bTQpKmRlbHRhVGltZTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9ICh0aGlzLm1fQ3VycmVudFZlbG9jaXR5IC0gbnVtKm51bTcpKm51bTM7XHJcbiAgICAgICAgICAgIHZhciBudW04Om51bWJlciA9IHRhcmdldCArKG51bTQrbnVtNykqbnVtMztcclxuICAgICAgICAgICAgaWYobnVtNSAtIGN1cnJlbnQgPiAwID09IG51bTg+bnVtNSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbnVtOCA9IG51bTU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQ3VycmVudFZlbG9jaXR5ID0gKG51bTggLSBudW01KS9kZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bTg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgcHVibGljIENvdW50KGN1clBTOiBMYXlhLlZlY3RvcjMsIHRhcmdldFBTOiBMYXlhLlZlY3RvcjMsIGRlbHRhVGltZTogbnVtYmVyID0gMSAvIDYwKTpMYXlhLlZlY3RvcjMge1xyXG4gICAgICAgICAgICB2YXIgbWF4TW92ZTogbnVtYmVyID0gdGhpcy5tX01heE1vdmVOdW07XHJcbiAgICAgICAgICAgIHZhciBydW5UaW1lUmF0ZTogbnVtYmVyID0gMiAqIGRlbHRhVGltZSAvIHRoaXMubV9TbW9vdGhUaW1lO1xyXG4gICAgICAgICAgICB2YXIgdGltZVJhdGlvOiBudW1iZXIgPSAxIC8gKDEgKyBydW5UaW1lUmF0ZSArIDAuNDggKiBydW5UaW1lUmF0ZSAqIHJ1blRpbWVSYXRlICsgMC4yMzUgKiBydW5UaW1lUmF0ZSAqIHJ1blRpbWVSYXRlICogcnVuVGltZVJhdGUpO1xyXG4gICAgICAgICAgICB2YXIgZ2FwOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zdWJ0cmFjdCh0YXJnZXRQUywgY3VyUFMsIGdhcCk7XHJcbiAgICAgICAgICAgIHZhciBtb3ZlRGlyOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5ub3JtYWxpemUoZ2FwLCBtb3ZlRGlyKTtcclxuICAgICAgICAgICAgLy/pgJ/luqbkv67mraNcclxuICAgICAgICAgICAgdmFyIG1vdmVEaXN0YW5jZTogbnVtYmVyID0gTGF5YS5WZWN0b3IzLmRpc3RhbmNlKHRhcmdldFBTLCBjdXJQUyk7XHJcbiAgICAgICAgICAgIG1vdmVEaXN0YW5jZSA9IG1vdmVEaXN0YW5jZSA8IG1heE1vdmUgJiYgbW92ZURpc3RhbmNlID4gLW1heE1vdmUgPyBtb3ZlRGlzdGFuY2UgOiAobW92ZURpc3RhbmNlID4gbWF4TW92ZSA/IG1heE1vdmUgOiAtbWF4TW92ZSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY3VyTW92ZURpc3RhY25lOm51bWJlciA9ICggdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSArIDIqKG1vdmVEaXN0YW5jZS90aGlzLm1fU21vb3RoVGltZSkpKmRlbHRhVGltZTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9ICh0aGlzLm1fQ3VycmVudFZlbG9jaXR5IC0gMipjdXJNb3ZlRGlzdGFjbmUvdGhpcy5tX1Ntb290aFRpbWUpKnRpbWVSYXRpbztcclxuICAgICAgICAgICAgdmFyIGVuZFBTOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IChtb3ZlRGlzdGFuY2UgKyBjdXJNb3ZlRGlzdGFjbmUpKnRpbWVSYXRpbztcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKG1vdmVEaXIsc2NhbGUsZW5kUFMpO1xyXG4gICAgICAgICAgICAvL0xheWEuVmVjdG9yMy5hZGQodGFyZ2V0UFMsZW5kUFMsZW5kUFMpXHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5hZGQoY3VyUFMsZW5kUFMsZW5kUFMpO1xyXG4gICAgICAgICAgICB2YXIgZW5kTW92ZURpcjpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zdWJ0cmFjdChjdXJQUyxlbmRQUyxlbmRNb3ZlRGlyKTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoIExheWEuVmVjdG9yMy5kb3QobW92ZURpcixlbmRNb3ZlRGlyKSA8IDAgKS8vTGF5YS5WZWN0b3IzLmRpc3RhbmNlKHRhcmdldFBTLGN1clBTKSAqIExheWEuVmVjdG9yMy5kaXN0YW5jZSh0YXJnZXRQUyxlbmRQUyk8MCApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGVuZFBTID0gdGFyZ2V0UFM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQ3VycmVudFZlbG9jaXR5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZW5kUFM7XHJcbiAgICAgICAgICAgIC8vTGF5YS5WZWN0b3IzLnNjYWxlKG1vdmVEaXIsbW92ZURpc3RhbmNlLGVuZCk7XHJcbiAgICAgICAgICAgIC8vdGFyZ2V0UFMgKyBMYXlhLlZlY3RvcjMuYWRkKG1vdmVEaXN0YW5jZSxjdXJNb3ZlRGlzdGFjbmUsZW5kU3BlZWQpIChtb3ZlRGlzdGFuY2UgKyBjdXJNb3ZlRGlzdGFjbmUpO1xyXG4gICAgICAgIH0qL1xyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICAgICAgZXhwb3J0IGNsYXNzIExpbmtOb2RlTGlzdDxUPlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHJpdmF0ZSBfSGVhZE5vZGU6Tm9kZTxUPjtcclxuICAgICAgICAgICAgcHJpdmF0ZSBfVGFpbE5vZGU6Tm9kZTxUPjtcclxuICAgIFxyXG4gICAgICAgICAgICBwcml2YXRlIF9Db3VudE5vZGU6bnVtYmVyO1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSB0aGlzLl9IZWFkTm9kZTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUgPSB0aGlzLl9IZWFkTm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog6I635Y+W5aS057uT54K55YC8XHJcbiAgICAgICAgICAgICBcclxuICAgICAgICAgICAgZ2V0IEhlYWRWYWx1ZSgpOlRcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9IZWFkTm9kZS5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgQWRkKHZhbHVlOlQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlOk5vZGU8VD4gPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5BZGROb2RlKG5ld05vZGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEFkZE5vZGUobmV3Tm9kZTpOb2RlPFQ+KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9UYWlsTm9kZSE9dGhpcy5fSGVhZE5vZGUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUuTmV4dCA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0hlYWROb2RlLk5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbE5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSovXHJcblxyXG59IiwiZXhwb3J0IG1vZHVsZSBGU00gXHJcbntcclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSUZTTVxyXG4gICAge1xyXG4gICAgICAgIFVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZTTSA8VCBleHRlbmRzIFN0YXRlPiBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIG1fQ3VyU3RhdGU6VDtcclxuICAgICAgICBwcml2YXRlIG1fU3RhdGVEaWN0OntbbmFtZTpzdHJpbmddOlR9O1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvciggc3RhcnRTdGF0ZTpUID0gbnVsbCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyU3RhdGUgPSBzdGFydFN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IEN1clN0YXRlKCk6VFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOaUueWPmOeKtuaAgVxyXG4gICAgICAgICAqIEBwYXJhbSBzdGF0ZSDorr7nva7nirbmgIFcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgQ2hhbmdlU3RhdGUoc3RhdGU6VClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0YXRlLlNldE93bmVyKHRoaXMpO1xyXG4gICAgICAgICAgICB2YXIgY3VyU3RhdGU6VCA9IHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICAgICAgaWYoY3VyU3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1clN0YXRlLkVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1clN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgIGN1clN0YXRlLlN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTdGF0ZSA9IGN1clN0YXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjdXJTdGF0ZSA9IHRoaXMubV9DdXJTdGF0ZTtcclxuICAgICAgICAgICAgaWYoY3VyU3RhdGUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGN1clN0YXRlLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGF0ZVxyXG4gICAge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX293bmVyOklGU007XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3RydWN0b3Iob3duZXI6SUZTTSA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fb3duZXIgPSBvd25lcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBTZXRPd25lcihvd25lcjpJRlNNKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX293bmVyID0gb3duZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlKCk7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IEVuZCgpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBTdGFydCgpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZU1nclxyXG57XHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgVXBkYXRlKCk7XHJcbn0iLCJpbXBvcnQgQmFzZU1hbmFnZXIgZnJvbSBcIi4vQmFzZU1hbmFnZXJcIjtcclxuaW1wb3J0IHtCYXNlRnVuY30gIGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcmFtZVdvcmtcclxue1xyXG4gICAgX01nck1hcDpCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+Oy8vQmFzZVN0cnVjdC5NYXA8QmFzZU1hbmFnZXI+O1xyXG4gICAgX1RlbU1nckxpc3Q6QXJyYXk8QmFzZU1hbmFnZXI+O1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX01nck1hcCA9IG5ldyBCYXNlRnVuYy5NYXA8QmFzZU1hbmFnZXI+KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfRk06RnJhbWVXb3JrO1xyXG4gICAgc3RhdGljIGdldCBGTSgpOkZyYW1lV29ya1xyXG4gICAge1xyXG4gICAgICAgIGlmKEZyYW1lV29yay5fRk09PW51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGcmFtZVdvcmsuX0ZNID0gbmV3IEZyYW1lV29yaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gRnJhbWVXb3JrLl9GTTtcclxuICAgIH1cclxuICAgIC8vY29uc3RydWN0b3JcclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1wTWdyTGlzdCA9IG5ldyBBcnJheTxCYXNlTWFuYWdlcj4odGhpcy5fTWdyTWFwLkNvdW50KTtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAuZm9yRWFjaCggKG1ncjpCYXNlTWFuYWdlciAsIGtleTpzdHJpbmcpOnZvaWQgPT57XHJcbiAgICAgICAgICAgIHRlbXBNZ3JMaXN0LnB1c2gobWdyKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRlbXBNZ3JMaXN0LmZvckVhY2goKG1ncixpZHgpPT57bWdyLlVwZGF0ZSgpO30pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRNYW5hZ2VyPFQgZXh0ZW5kcyBCYXNlTWFuYWdlcj4oIHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9ICk6VFxyXG4gICAge1xyXG4gICAgICAgIGlmKHRoaXMuX01nck1hcC5IYXModHlwZS5OYW1lKCkpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX01nck1hcC5HZXQodHlwZS5OYW1lKCkpIGFzIFQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZXdNZ3I6VCA9IG5ldyB0eXBlKCk7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwLlNldChuZXdNZ3IsdHlwZS5OYW1lKCkpO1xyXG4gICAgICAgIHJldHVybiAgbmV3TWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgR2V0TWFuYWdlcjxUIGV4dGVuZHMgQmFzZU1hbmFnZXI+KHR5cGU6e25ldyAoKTogVDsgTmFtZSgpOnN0cmluZyB9KTpUe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9NZ3JNYXAuR2V0KHR5cGUuTmFtZSgpKSBhcyBUO1xyXG4gICAgfVxyXG59IiwiLyoq5L2c6ICFOk1vXHJcbiAqIOa2iOaBr+aOp+WItuWZqFxyXG4gKi9cclxuaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmV4cG9ydCBtb2R1bGUgTWVzc2FnZU1EIHtcclxuICAgIGV4cG9ydCBjb25zdCBHYW1lRXZlbnQgPVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUGxheWVyRGVhdGg6IFwiUGxheWVyRGVhdGhcIixcclxuICAgICAgICAgICAgR2FtZVRpbWVVcDogXCJHYW1lVGltZVVwXCIsXHJcbiAgICAgICAgICAgIEdhbWVDb250aW51ZTogXCJHYW1lQ29udGludWVcIlxyXG4gICAgICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgTWVzc2FnZUNlbnRlciBleHRlbmRzIEJhc2VNYW5hZ2VyICB7XHJcbiAgICAgICAgc3RhdGljIE5hbWUoKTogc3RyaW5nICB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIk1lc3NhZ2VDZW50ZXJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX01ncjogTWVzc2FnZUNlbnRlcjtcclxuICAgICAgICBwcml2YXRlIF9FdmVudERpY3Q6IHsgW0tleTogc3RyaW5nXTogTUV2ZW50IH07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiOt+WPluS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHByaXZhdGUgX0dldEV2ZW50KG5hbWU6IHN0cmluZyk6IE1FdmVudCAge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnQ6IE1FdmVudCA9IHRoaXMuX0V2ZW50RGljdFtuYW1lXTtcclxuICAgICAgICAgICAgaWYgKGV2ZW50ID09IHVuZGVmaW5lZCB8fCBldmVudCA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgTUV2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9FdmVudERpY3RbbmFtZV0gPSBldmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBldmVudCA9IHRoaXMuX0V2ZW50RGljdFtuYW1lXTtcclxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0V2ZW50RGljdCA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvKipcclxuICAgICAgICAqIOazqOWGjFxyXG4gICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAqIEBwYXJhbSB7T2JqfSBvd25lciDmi6XmnInogIVcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJlZ2lzdChuYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiAoKSA9PiB2b2lkLCBvd25lcjogT2JqZWN0KTpNRXZlbnQgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG5ld0RsZ3Q6IERlbGVnYXRlID0gbmV3IERlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LkFkZChuZXdEbGd0KTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldEV2ZW50XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jplIDmn5DkuKrnm5HlkKxcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciDnm5HlkKzogIVcclxuICAgICAgICAgKiBAcGFyYW0ge09ian0gb3duZXIg5oul5pyJ6ICFXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmVnaXN0KG5hbWU6IHN0cmluZywgbGlzdGVuZXI6ICgpID0+IHZvaWQsIG93bmVyOiBPYmplY3QpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LlJtdihsaXN0ZW5lciwgb3duZXIpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jplIDmn5DkuKrkuovku7ZcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBEZXNSZ2lzdElESyhuYW1lOiBzdHJpbmcpICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIGdldEV2ZW50LlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRmlyZShuYW1lOiBzdHJpbmcsIHBhcmFtOiBhbnkgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6IE1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5FeGVjdXRlKHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5aeU5omYXHJcbiAgICBleHBvcnQgY2xhc3MgRGVsZWdhdGUge1xyXG4gICAgICAgIExpc3RlbmVyOiBPYmplY3Q7XHJcbiAgICAgICAgQWN0aW9uOiAocGFyYW06YW55KSA9PiB2b2lkO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOinpuWPkVxyXG4gICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBFeGVjdXRlKHBhcmFtOiBhbnkgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB0aGlzLkFjdGlvbi5jYWxsKHRoaXMuTGlzdGVuZXIsIHBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IobGlzdGVuZXI6IE9iamVjdCwgYWN0aW9uOiAocGFyYW06YW55KSA9PiB2b2lkKSAge1xyXG4gICAgICAgICAgICB0aGlzLkxpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgICAgIHRoaXMuQWN0aW9uID0gYWN0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5LqL5Lu2XHJcbiAgICBleHBvcnQgY2xhc3MgTUV2ZW50IHtcclxuICAgICAgICBEZWxlZ2F0ZUxpc3Q6IEFycmF5PERlbGVnYXRlPjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHRoaXMuUmVzZXQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDmt7vliqDlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7RGVsZWdhdGV9IGRsZyDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIEFkZChkbGc6IERlbGVnYXRlKSAge1xyXG4gICAgICAgICAgICB0aGlzLkRlbGVnYXRlTGlzdC5wdXNoKGRsZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDms6jlhozmlrnms5VcclxuICAgICAgICAgKiBAcGFyYW0gbGlzdGVuZXIg55uR5ZCs5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIG93bmVyIOaLpeacieiAhVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEFkZEZ1bmMobGlzdGVuZXI6KHBhcmFtOmFueSk9PmFueSxvd25lcjpvYmplY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZGxnOkRlbGVnYXRlID0gbmV3IERlbGVnYXRlKG93bmVyLGxpc3RlbmVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDnp7vpmaTlp5TmiZhcclxuICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvbiDmtojmga/lkI3lrZdcclxuICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5lciDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIFJtdihhY3Rpb246ICgpID0+IHZvaWQsIGxpc3RlbmVyOiBPYmplY3QgPSBudWxsKSAge1xyXG4gICAgICAgICAgICB2YXIgZGxndExpc3Q6IEFycmF5PERlbGVnYXRlPiA9IHRoaXMuRGVsZWdhdGVMaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhcnJJZHg6IG51bWJlciA9IGRsZ3RMaXN0Lmxlbmd0aCAtIDE7IGFycklkeCA+IC0xOyAtLWFycklkeCkgIHtcclxuICAgICAgICAgICAgICAgIHZhciBkbGd0ID0gZGxndExpc3RbYXJySWR4XTtcclxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT0gZGxndC5BY3Rpb24gJiYgbGlzdGVuZXIgPT0gZGxndC5MaXN0ZW5lcikgIHtcclxuICAgICAgICAgICAgICAgICAgICBkbGd0TGlzdC5zcGxpY2UoYXJySWR4LCAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldCgpICB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVsZWdhdGVMaXN0ID0gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDop6blj5FcclxuICAgICAgICAqIEBwYXJhbSB7YW55fSBwYXJhbSDmtojmga/lkI3lrZdcclxuICAgICAgICAqL1xyXG4gICAgICAgIEV4ZWN1dGUocGFyYW06IGFueSkgIHtcclxuICAgICAgICAgICAgdmFyIGRsZ3RMaXN0OiBBcnJheTxEZWxlZ2F0ZT4gPSB0aGlzLkRlbGVnYXRlTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgYXJySWR4OiBudW1iZXIgPSBkbGd0TGlzdC5sZW5ndGggLSAxOyBhcnJJZHggPiAtMTsgLS1hcnJJZHgpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGxndCA9IGRsZ3RMaXN0W2FycklkeF07XHJcbiAgICAgICAgICAgICAgICBkbGd0LkV4ZWN1dGUocGFyYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiXHJcbmltcG9ydCB7RlNNfSBmcm9tIFwiLi8uLi9CYXNlL0ZTTVwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgbV9TY2VuZUZTTTogU2NlbmUuU2NlbmVGU007XHJcbiAgICBwcml2YXRlIG1fU2NlbmVOb2RlOiBMYXlhLk5vZGU7XHJcbiAgICBcclxuICAgIGdldCBDdXJTY2VuZSgpOlNjZW5lLkJhc2VTY2VuZSB7XHJcbiAgICAgICAgaWYodGhpcy5tX1NjZW5lRlNNLkN1clN0YXRlKVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX1NjZW5lRlNNLkN1clN0YXRlO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZ2V0IEN1ckRpcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clNjZW5lLkRpcmVjdG9yO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTY2VuZU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuICAgICAgICBMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMuX0JHTGF5ZXIpO1xyXG5cclxuICAgICAgICB0aGlzLm1fU2NlbmVGU00gPSBuZXcgU2NlbmUuU2NlbmVGU00oKTtcclxuICAgICAgICB0aGlzLm1fU2NlbmVOb2RlID0gTGF5YS5zdGFnZS5hZGRDaGlsZChuZXcgTGF5YS5TcHJpdGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENoYW5nZVNjZW5lKG5ld1NjZW5lOiBTY2VuZS5CYXNlU2NlbmUpICB7XHJcbiAgICAgICAgdGhpcy5tX1NjZW5lRlNNLkNoYW5nZVN0YXRlKG5ld1NjZW5lKTtcclxuICAgICAgICBpZihuZXdTY2VuZS5TY2VuZU9iailcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9TY2VuZU5vZGUuYWRkQ2hpbGQobmV3U2NlbmUuU2NlbmVPYmopO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSlcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZS5VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aXp+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBfQkc6IExheWEuU3ByaXRlO1xyXG4gICAgcHJpdmF0ZSBfQkdMYXllcjogTGF5YS5TcHJpdGU7XHJcbiAgICBcclxuICAgIHNldCBCRyhiZzogTGF5YS5TcHJpdGUpIHtcclxuICAgICAgICBpZiAoIWJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX0JHKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLnJlbW92ZVNlbGY7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQkcgPSBiZztcclxuICAgICAgICB0aGlzLl9CRy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fQkcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllci5hZGRDaGlsZCh0aGlzLl9CRyk7XHJcbiAgICB9XHJcbiAgICBnZXQgQkcoKTpMYXlhLlNwcml0ZVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgdGhpcy5fQkc7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKuS9nOiAhU1vXHJcbiog5Zy65pmv5Yqf6IO9XHJcbiovXHJcbi8qXHJcbi8v5Zy65pmv566h55CGXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjZW5lTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgX0JHOiBMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX0JHTGF5ZXI6IExheWEuU3ByaXRlO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLl9CR0xheWVyKTtcclxuICAgICAgICAvL+a3u+WKoOWcuuaZr+euoeeQhlxyXG4gICAgICAgIHRoaXMuU2NlbmVOb2RlID0gTGF5YS5zdGFnZS5hZGRDaGlsZChuZXcgTGF5YS5TcHJpdGUoKSk7XHJcbiAgICB9XHJcbiAgICBzZXQgQkcoYmc6IExheWEuU3ByaXRlKSB7XHJcbiAgICAgICAgaWYgKCFiZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9CRykge1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5yZW1vdmVTZWxmO1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgdGhpcy5fQkcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0JHLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIuYWRkQ2hpbGQodGhpcy5fQkcpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEJHKCk6TGF5YS5TcHJpdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX0JHO1xyXG4gICAgfVxyXG4gICAgU2NlbmVOb2RlOiBMYXlhLk5vZGU7XHJcblxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTY2VuZU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9DdXJTY2VuZTogQmFzZVNjZW5lO1xyXG4gICAgZ2V0IEN1clNjZW5lKCk6IEJhc2VTY2VuZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0N1clNjZW5lO1xyXG4gICAgfVxyXG4gICAgc2V0IEN1clNjZW5lKHZhbHVlOiBCYXNlU2NlbmUpIHtcclxuICAgICAgICBpZiAodGhpcy5fQ3VyU2NlbmUgJiYgdGhpcy5fQ3VyU2NlbmUuU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fQ3VyU2NlbmUuU2NlbmUucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9DdXJTY2VuZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9DdXJTY2VuZSAmJiB0aGlzLl9DdXJTY2VuZS5TY2VuZSkge1xyXG4gICAgICAgICAgICB0aGlzLlNjZW5lTm9kZS5hZGRDaGlsZCh0aGlzLl9DdXJTY2VuZS5TY2VuZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IEN1ckRpcigpOiBCYXNlRGlyZWN0b3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZS5DdXJEaXI7XHJcbiAgICB9XHJcblxyXG4gICAgRW50ZXJTY2VuZSh0YXJnZXRTY2VuZTogQmFzZVNjZW5lKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUgPT0gbnVsbClcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZSA9IHRhcmdldFNjZW5lO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdGhpcy5DdXJTY2VuZS5MZWF2ZSh0YXJnZXRTY2VuZSk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lICE9IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuVXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiovIiwiaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9CYXNlTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4uL2NvbnRyb2xlci9BUFBcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlRpbWVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1fU3RhcnRUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fR2FtZVRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9QYXVzaW5nVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1BhdXNlVGltZTogbnVtYmVyXHJcblxyXG4gICAgcHVibGljIGdldCBTdGFydFRpbWVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9TdGFydFRpbWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIChMYXlhLnRpbWVyLmN1cnJUaW1lciAtIHRoaXMubV9TdGFydFRpbWUgLXRoaXMubV9QYXVzZVRpbWUgLSB0aGlzLlBhdXNpbmdUaW1lKSAvIDEwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fU3RhcnRUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICAgICAgdGhpcy5tX0dhbWVUaW1lID0gMDtcclxuICAgICAgICB0aGlzLm1fUGF1c2VUaW1lID0gMDtcclxuICAgICAgICB0aGlzLm1fUGF1c2luZ1RpbWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFBhdXNlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1fUGF1c2luZ1RpbWUgPD0gMClcclxuICAgICAgICAgICAgdGhpcy5tX1BhdXNpbmdUaW1lID0gTGF5YS50aW1lci5jdXJyVGltZXI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IFBhdXNpbmdUaW1lKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QYXVzaW5nVGltZSA+IDAgPyAoTGF5YS50aW1lci5jdXJyVGltZXIgLSB0aGlzLm1fUGF1c2luZ1RpbWUgKSA6IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ29udGludWUoKSB7XHJcbiAgICAgICAgdGhpcy5tX1BhdXNlVGltZSArPSB0aGlzLlBhdXNpbmdUaW1lO1xyXG4gICAgICAgIHRoaXMubV9QYXVzaW5nVGltZSA9IDA7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vLi4vdWkvQmFzZVVJXCJcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgVUlGdW5jIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9VSUZ1bmNcIlxyXG5pbXBvcnQgeyBCYXNlRnVuYyB9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLi9jb250cm9sZXIvQVBQXCI7XHJcbmVudW0gTm9kZVR5cGUge1xyXG4gICAgQm90dG9tLFxyXG4gICAgTWlkZGxlLFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJTWFuYWdlciBleHRlbmRzIEJhc2VNYW5hZ2VyIHtcclxuICAgIHN0YXRpYyBnX1VJV2lkdGggPSA3NTA7XHJcbiAgICBzdGF0aWMgZ19VSUhlaWdodCA9IDEzMzQ7XHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBtX1Jvb3ROb2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgbV9Cb3R0b21Ob2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgbV9NaWRsZU5vZGU6IExheWEuQm94O1xyXG4gICAgcHJpdmF0ZSBfVUlEaWN0OiB7IFtuYW1lOiBzdHJpbmddOiBCYXNlVUkgfTtcclxuICAgIHByaXZhdGUgX1VwZGF0ZUNvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fVXBkYXRlVGltZTpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBBZGROb2RlKG5vZGU6IE5vZGVUeXBlKTogdm9pZCAge1xyXG4gICAgICAgIHZhciBub2RlQm94OiBMYXlhLkJveCA9IG5ldyBMYXlhLkJveCgpO1xyXG4gICAgICAgIG5vZGVCb3gudG9wID0gMDtcclxuICAgICAgICBub2RlQm94LmJvdHRvbSA9IDA7XHJcbiAgICAgICAgbm9kZUJveC5sZWZ0ID0gMDtcclxuICAgICAgICBub2RlQm94LnJpZ2h0ID0gMDtcclxuICAgICAgICBzd2l0Y2ggKG5vZGUpICB7XHJcbiAgICAgICAgICAgIGNhc2UgTm9kZVR5cGUuQm90dG9tOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0JvdHRvbU5vZGUgPSBub2RlQm94O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWlkbGVOb2RlID0gbm9kZUJveDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUm9vdE5vZGUuYWRkQ2hpbGQobm9kZUJveCk7XHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLmFkZENoaWxkKG5vZGVCb3gpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcgIHtcclxuICAgICAgICByZXR1cm4gXCJVSU1hbmFnZXJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgcm9vdEJveCA9IG5ldyBMYXlhLkJveCgpO1xyXG4gICAgICAgIHJvb3RCb3gud2lkdGggPSBVSU1hbmFnZXIuZ19VSVdpZHRoO1xyXG4gICAgICAgIHJvb3RCb3guaGVpZ2h0ID0gVUlNYW5hZ2VyLmdfVUlIZWlnaHQ7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZChyb290Qm94KTtcclxuICAgICAgICB0aGlzLm1fUm9vdE5vZGUgPSByb290Qm94O1xyXG4gICAgICAgIHRoaXMub25TaXplQ2hhbmdlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLm1fUm9vdE5vZGUpO1xyXG4gICAgICAgIHRoaXMubV9VcGRhdGVUaW1lID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5BZGROb2RlKE5vZGVUeXBlLkJvdHRvbSk7XHJcbiAgICAgICAgdGhpcy5BZGROb2RlKE5vZGVUeXBlLk1pZGRsZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fVUlEaWN0ID0ge307XHJcbiAgICAgICAgdGhpcy5fVXBkYXRlQ291bnQgPSAwO1xyXG4gICAgICAgIExheWEuc3RhZ2Uub24oTGF5YS5FdmVudC5SRVNJWkUsIHRoaXMsIHRoaXMub25TaXplQ2hhbmdlKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvblNpemVDaGFuZ2UoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciByb290Qm94ID0gdGhpcy5tX1Jvb3ROb2RlO1xyXG4gICAgICAgIFVJRnVuYy5GaXhVSShyb290Qm94LFVJTWFuYWdlci5nX1VJV2lkdGgpO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdmFyIHNjYWxlID0gVUlGdW5jLkNvdW50U2NhbGVGaXgoVUlNYW5hZ2VyLmdfVUlXaWR0aCk7XHJcbiAgICAgICAgdmFyIHJvb3RCb3ggPSB0aGlzLm1fUm9vdE5vZGU7XHJcbiAgICAgICAgcm9vdEJveC5zY2FsZVggPSBzY2FsZTtcclxuICAgICAgICByb290Qm94LnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgIHJvb3RCb3guaGVpZ2h0ID0gVUlNYW5hZ2VyLmdfVUlIZWlnaHQgKiBzY2FsZTtcclxuICAgICAgICByb290Qm94LndpZHRoID0gVUlNYW5hZ2VyLmdfVUlXaWR0aDsqL1xyXG4gICAgICAgIGlmKCF0aGlzLm1fQm90dG9tTm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBudW1DaGlsZCA9IHRoaXMubV9Cb3R0b21Ob2RlLm51bUNoaWxkcmVuO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IG51bUNoaWxkO2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZS5nZXRDaGlsZEF0KGkpO1xyXG4gICAgICAgICAgICBpZihub2RlICYmIG5vZGVbXCJMYXlvdXRcIl0pIHtcclxuICAgICAgICAgICAgICAgIG5vZGVbXCJMYXlvdXRcIl0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbnVtQ2hpbGQgPSB0aGlzLm1fQm90dG9tTm9kZS5udW1DaGlsZHJlbjtcclxuICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBudW1DaGlsZDtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5tX0JvdHRvbU5vZGUuZ2V0Q2hpbGRBdChpKTtcclxuICAgICAgICAgICAgaWYobm9kZSAmJiBub2RlW1wiTGF5b3V0XCJdKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlW1wiTGF5b3V0XCJdKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSAgICBcclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCkgIHtcclxuICAgICAgICBcclxuICAgICAgICAvL+WumuW4p+WIt+aWsFVJXHJcbiAgICAgICAgaWYgKHRoaXMubV9VcGRhdGVUaW1lIDwgIEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSkgIHtcclxuICAgICAgICAgICAgdGhpcy5VcGRhdGVVSSh0aGlzLm1fQm90dG9tTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkodGhpcy5tX01pZGxlTm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VwZGF0ZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX1VwZGF0ZVRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyAwLjM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGVVSShub2RlOiBMYXlhLlNwcml0ZSkgIHtcclxuICAgICAgICBmb3IgKGxldCBpZHg6IG51bWJlciA9IDA7IGlkeCA8IG5vZGUubnVtQ2hpbGRyZW47ICsraWR4KSAge1xyXG4gICAgICAgICAgICB2YXIgdWk6IEJhc2VVSSA9IG5vZGUuZ2V0Q2hpbGRBdChpZHgpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgdWkuVUlVcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBBZGRVSSgpICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFNob3c8VCBleHRlbmRzIEJhc2VVST4odWlDbGFzczogeyBuZXcobmFtZTogc3RyaW5nKTogVDsgTmFtZSgpOiBzdHJpbmcgfSk6IFQgIHtcclxuICAgICAgICB2YXIgc3RyOiBzdHJpbmcgPSB1aUNsYXNzLk5hbWUoKTtcclxuICAgICAgICB2YXIgbmV3VUk6IEJhc2VVSSA9IHRoaXMuR2V0VUlCeU5hbWUoc3RyKTtcclxuICAgICAgICBuZXdVSSA9IG5ld1VJID09IG51bGwgPyB0aGlzLkFkZFVJQnlOYW1lKHN0ciwgbmV3IHVpQ2xhc3Moc3RyKSkgOiBuZXdVSTtcclxuICAgICAgICB2YXIgbm9kZTogTGF5YS5TcHJpdGUgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAobmV3VUkuVUlUeXBlKSAge1xyXG4gICAgICAgICAgICAvL+S4reWxguasoVVJXHJcbiAgICAgICAgICAgIGNhc2UgQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTpcclxuICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLm1fTWlkbGVOb2RlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubV9NaWRsZU5vZGUubnVtQ2hpbGRyZW4gPD0gMCkgIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+mAmuefpeWvvOa8lOaaguWBnOa4uOaIj1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5DdXJEaXIuVGltZVVwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/pu5jorqRVaeWFqOaYr+S9juWxguasoVVJXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjaGlsZE51bTogbnVtYmVyID0gbm9kZS5udW1DaGlsZHJlbjtcclxuICAgICAgICAvL+aKiuS6kuaWpeeahOeql+WPo+WFs+aOiVxyXG4gICAgICAgIGlmIChuZXdVSS5Jc011dGV4ICYmIGNoaWxkTnVtID4gMCkgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSSA9IG5vZGUuZ2V0Q2hpbGRBdChub2RlLm51bUNoaWxkcmVuIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICBpZiAoIWxhc3RVSS5Jc011dGV4KVxyXG4gICAgICAgICAgICAgICAgbGFzdFVJLkhpZGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5vZGUuYWRkQ2hpbGQobmV3VUkpO1xyXG4gICAgICAgIG5ld1VJLk9wZW5PUCgpO1xyXG4gICAgICAgIGlmIChuZXdVSS5VSVR5cGUgPT0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZSAmJiBub2RlLm51bUNoaWxkcmVuID4gMCkge1xyXG4gICAgICAgICAgICBub2RlLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChuZXdVSSBhcyBUKTtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZSh1aTogQmFzZVVJKSAge1xyXG4gICAgICAgIHVpLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB1aS5DbG9zZU9QKCk7XHJcbiAgICAgICAgdmFyIG5vZGU6IExheWEuU3ByaXRlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKHVpLlVJVHlwZSkgIHtcclxuICAgICAgICAgICAgLy/kuK3lsYLmrKFVSVxyXG4gICAgICAgICAgICBjYXNlIEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX01pZGxlTm9kZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5udW1DaGlsZHJlbiA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIC8vIHRoaXMuQ2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+WFs+mXreeql+WPoyDpgJrnn6XmuLjmiI/nu6fnu61cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLkNvbnRpbnVlVGltZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy/pu5jorqRVaeWFqOaYr+S9juWxguasoVVJXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjaGlsZE51bTogbnVtYmVyID0gbm9kZS5udW1DaGlsZHJlbjtcclxuICAgICAgICBpZiAoY2hpbGROdW0gPiAwKSAge1xyXG4gICAgICAgICAgICB2YXIgbGFzdFVJOiBCYXNlVUkgPSBub2RlLmdldENoaWxkQXQoY2hpbGROdW0gLSAxKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIGxhc3RVSS5PcGVuT1AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2VDdXJWaWV3KCkgIHtcclxuICAgICAgICB2YXIgdWk6IEJhc2VVSSA9IHRoaXMubV9Cb3R0b21Ob2RlLmdldENoaWxkQXQodGhpcy5tX0JvdHRvbU5vZGUubnVtQ2hpbGRyZW4gLSAxKSBhcyBCYXNlVUk7XHJcbiAgICAgICAgdGhpcy5DbG9zZSh1aSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/liKDpmaTmiYDmnInoioLngrnkuIrnmoRVSVxyXG4gICAgQ2xlYXIoKSAge1xyXG4gICAgICAgIHZhciB1aU5vZGUgPSB0aGlzLm1fQm90dG9tTm9kZTtcclxuICAgICAgICB3aGlsZSAodWlOb2RlLm51bUNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZVVJOiBCYXNlVUkgPSB1aU5vZGUuZ2V0Q2hpbGRBdCgwKSBhcyBCYXNlVUk7Ly8ucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB0aGlzLkNsb3NlKGNsb3NlVUkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1aU5vZGUgPSB0aGlzLm1fTWlkbGVOb2RlXHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VVSTogQmFzZVVJID0gdWlOb2RlLmdldENoaWxkQXQoMCkgYXMgQmFzZVVJOy8vLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgR2V0VUlCeU5hbWUobmFtZTogc3RyaW5nKTogQmFzZVVJICB7XHJcbiAgICAgICAgdmFyIHVpID0gdGhpcy5fVUlEaWN0W25hbWVdO1xyXG4gICAgICAgIHVpID0gdWkgPT0gdW5kZWZpbmVkID8gbnVsbCA6IHVpO1xyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuICAgIEFkZFVJQnlOYW1lKG5hbWU6IHN0cmluZywgdWk6IEJhc2VVSSk6IEJhc2VVSSAge1xyXG4gICAgICAgIHRoaXMuX1VJRGljdFtuYW1lXSA9IHVpO1xyXG4gICAgICAgIHJldHVybiB1aTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cclxuaW1wb3J0IFJvbGVFbGVtZW50IGZyb20gXCIuL3NjcmlwdC9Sb2xlRWxlbWVudFwiXG5pbXBvcnQgSXRlbUVsZW1lbnQgZnJvbSBcIi4vc2NyaXB0L0l0ZW1FbGVtZW50XCJcclxuLypcclxuKiDmuLjmiI/liJ3lp4vljJbphY3nva47XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25maWd7XHJcbiAgICBzdGF0aWMgd2lkdGg6bnVtYmVyPTc1MDtcclxuICAgIHN0YXRpYyBoZWlnaHQ6bnVtYmVyPTEzMzQ7XHJcbiAgICBzdGF0aWMgc2NhbGVNb2RlOnN0cmluZz1cImZpeGVkd2lkdGhcIjtcclxuICAgIHN0YXRpYyBzY3JlZW5Nb2RlOnN0cmluZz1cIm5vbmVcIjtcclxuICAgIHN0YXRpYyBhbGlnblY6c3RyaW5nPVwidG9wXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25IOnN0cmluZz1cImxlZnRcIjtcclxuICAgIHN0YXRpYyBzdGFydFNjZW5lOmFueT1cIkNoYXJhY3Rlci5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPXRydWU7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvUm9sZUVsZW1lbnQudHNcIixSb2xlRWxlbWVudCk7XG4gICAgICAgIHJlZyhcInNjcmlwdC9JdGVtRWxlbWVudC50c1wiLEl0ZW1FbGVtZW50KTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyTWFuYWdlciBleHRlbmRzIEdhbWVNYW5hZ2VyLkJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfTWdyOiBDaGFyYWN0ZXJNYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTWdyKCk6IENoYXJhY3Rlck1hbmFnZXIge1xyXG4gICAgICAgIGlmICghQ2hhcmFjdGVyTWFuYWdlci5nX01ncikge1xyXG4gICAgICAgICAgICBDaGFyYWN0ZXJNYW5hZ2VyLmdfTWdyID0gbmV3IENoYXJhY3Rlck1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENoYXJhY3Rlck1hbmFnZXIuZ19NZ3I7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkNoYXJhY3RlckluZm9cIik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgR2VuSW5mbyhkYXRhOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENoYXJhY3RlckluZm8oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFNraWxsSXRlbShpZCk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmIChpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm4gaW5mby5JdGVtO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRQcmljZShpZCk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmIChpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm4gaW5mby5QcmljZTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0Q2hhcmFjdGVySW5mbyhpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRJdGVtSUQoaWQpIHtcclxuICAgICAgICB2YXIgaW5mbzogQ2hhcmFjdGVySW5mbyA9IHRoaXMuR2V0SW5mbzxDaGFyYWN0ZXJJbmZvPihpZCk7XHJcbiAgICAgICAgaWYgKCFpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgcmV0dXJuIGluZm8uSXRlbTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBHZXROYW1lKGlkKSB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmICghaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIGluZm8ubU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldERlc2MoaWQpIHtcclxuICAgICAgICB2YXIgaW5mbzogQ2hhcmFjdGVySW5mbyA9IHRoaXMuR2V0SW5mbzxDaGFyYWN0ZXJJbmZvPihpZCk7XHJcbiAgICAgICAgaWYgKCFpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICByZXR1cm4gaW5mby5EZXNjO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRDaGFyYWN0ZXJNb2RlbChpZDogbnVtYmVyKTogTGF5YS5TcHJpdGUzRCB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmICghaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJEYXRhOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRDaGFyYWN0ZXJJbmZvKGlkKTtcclxuICAgICAgICB2YXIgc2FtcGxlTW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRMSChjaGFyYWN0ZXJEYXRhLk5hbWUpKTtcclxuICAgICAgICB2YXIgbW9kZWwgPSBzYW1wbGVNb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIHJldHVybiBtb2RlbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ2hhcmFjdGVySW5mbyBleHRlbmRzIEdhbWVNYW5hZ2VyLkJhc2VJbmZvIHtcclxuICAgIHByaXZhdGUgbV9QcmljZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX01vZGVsTmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0V4dGVuZElEOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fSXRlbTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX05hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgbV9EZXNjOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGdldCBtTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IERlc2MoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0Rlc2M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBJdGVtKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9JdGVtO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBQcmljZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUHJpY2U7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihjaGFyYWN0ZXJEYXRhOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihjaGFyYWN0ZXJEYXRhKTtcclxuICAgICAgICB0aGlzLm1fSUQgPSBjaGFyYWN0ZXJEYXRhLklEID8gY2hhcmFjdGVyRGF0YS5JRCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX01vZGVsTmFtZSA9IGNoYXJhY3RlckRhdGEuTW9kZWxJRCA/IGNoYXJhY3RlckRhdGEuTW9kZWxJRCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW0gPSBjaGFyYWN0ZXJEYXRhLkl0ZW1JRCA/IE51bWJlcihjaGFyYWN0ZXJEYXRhLkl0ZW1JRCAtIDEpIDogLTE7XHJcbiAgICAgICAgdGhpcy5tX1ByaWNlID0gY2hhcmFjdGVyRGF0YS5QcmljZSA/IE51bWJlcihjaGFyYWN0ZXJEYXRhLlByaWNlKSA6IDA7XHJcbiAgICAgICAgdGhpcy5tX05hbWUgPSBjaGFyYWN0ZXJEYXRhLlBhc3NzY29yZSA/IGNoYXJhY3RlckRhdGEuUGFzc3Njb3JlIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fRGVzYyA9IGNoYXJhY3RlckRhdGEuRGVzYyA/IGNoYXJhY3RlckRhdGEuRGVzYyA6IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9Nb2RlbE5hbWU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5leHBvcnQgbW9kdWxlIEdhbWVNYW5hZ2VyIHtcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlTWFuYWdlciB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBCYXNlSW5mbyB9O1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0JvdHRvbUlEOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9NYXAgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5tX0JvdHRvbUlEID0gLTE7XHJcbiAgICAgICAgICAgIHZhciBjb25maWdJbmZvOiBvYmplY3QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRKc29uUGF0aChuYW1lKSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjb25maWdJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGNvbmZpZ0luZm9ba2V5XTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhSW5mbzogQmFzZUluZm8gPSB0aGlzLkdlbkluZm8oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWFwW2RhdGFJbmZvLklEXSA9IGRhdGFJbmZvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFJbmZvLklEICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9Cb3R0b21JRCA9IGRhdGFJbmZvLklEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBHZW5JbmZvKGRhdGEpOiBCYXNlSW5mbztcclxuICAgICAgICBwcm90ZWN0ZWQgR2V0SW5mbzxUIGV4dGVuZHMgQmFzZUluZm8+KGlkOiBudW1iZXIpOiBUIHtcclxuICAgICAgICAgICAgaWYgKCFpZCB8fCBpZCA8IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIEJhc2VJbmZvID0gdGhpcy5tX01hcFtpZF07XHJcbiAgICAgICAgICAgIGlmICghQmFzZUluZm8pIHtcclxuICAgICAgICAgICAgICAgIEJhc2VJbmZvID0gdGhpcy5tX01hcFt0aGlzLm1fQm90dG9tSURdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChCYXNlSW5mbykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJhc2VJbmZvIGFzIFQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5ZJROaVsOe7hFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBHZXRJRExpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgICAgIHZhciBtYXA6IHsgW0lEOiBudW1iZXJdOiBCYXNlSW5mbyB9ID0gdGhpcy5tX01hcDtcclxuICAgICAgICAgICAgdmFyIElETGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtYXApIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbWFwW2tleV1cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIElETGlzdC5wdXNoKGRhdGEuSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBJRExpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBCYXNlSW5mbyB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fSUQ6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgZ2V0IElEKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0lEID0gZGF0YS5JRCA/IE51bWJlcihkYXRhLklEKSAtIDEgOiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbU1hbmFnZXIgZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX01ncjogSXRlbU1hbmFnZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBNZ3IoKTogSXRlbU1hbmFnZXIge1xyXG4gICAgICAgIGlmICghSXRlbU1hbmFnZXIuZ19NZ3IpIHtcclxuICAgICAgICAgICAgSXRlbU1hbmFnZXIuZ19NZ3IgPSBuZXcgSXRlbU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEl0ZW1NYW5hZ2VyLmdfTWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkl0ZW1JbmZvXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBHZW5JbmZvKGRhdGE6IGFueSk6IEdhbWVNYW5hZ2VyLkJhc2VJbmZvIHtcclxuICAgICAgICByZXR1cm4gbmV3IEl0ZW1JbmZvKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumBk+WFt+S7t+agvFxyXG4gICAgICogQHBhcmFtIGlkIOmBk+WFt0lEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQcmljZShpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgaW5mbzogSXRlbUluZm8gPSB0aGlzLkdldEluZm88SXRlbUluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uUHJpY2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6YGT5YW35Lu35qC8XHJcbiAgICAgKiBAcGFyYW0gaWQg6YGT5YW3SURcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldEl0ZW1JY29uKGlkOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBpbmZvOiBJdGVtSW5mbyA9IHRoaXMuR2V0SW5mbzxJdGVtSW5mbz4oaWQpO1xyXG4gICAgICAgIGlmIChpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm4gaW5mby5JY29uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDojrflj5ZJROaVsOe7hFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBHZXRTZWxsSXRlbUlETGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICB2YXIgbWFwID0gdGhpcy5tX01hcDtcclxuICAgICAgICB2YXIgSURMaXN0OiBBcnJheTxudW1iZXI+ID0gW11cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFwKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhOiBhbnkgPSBtYXBba2V5XVxyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1JbmZvOiBJdGVtSW5mbyA9IGRhdGEgYXMgSXRlbUluZm87XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8uUHJpY2UgPj0gMClcclxuICAgICAgICAgICAgICAgICAgICBJRExpc3QucHVzaChkYXRhLklEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gSURMaXN0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgR2V0SXRlbVR5cGUoaWQ6bnVtYmVyKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICB2YXIgaW5mbzogSXRlbUluZm8gPSB0aGlzLkdldEluZm88SXRlbUluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uSXRlbVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldEl0ZW1JbmZvKGlkOm51bWJlcik6SXRlbUluZm9cclxuICAgIHtcclxuICAgICAgICB2YXIgaW5mbzogSXRlbUluZm8gPSB0aGlzLkdldEluZm88SXRlbUluZm8+KGlkKTtcclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSXRlbUluZm8gZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlSW5mbyB7XHJcbiAgICBwcml2YXRlIG1fTW9kZWxOYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fRXh0ZW5kSUQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgbV9QcmljZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1UeXBlOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9JY29uOnN0cmluZztcclxuICAgIHByaXZhdGUgbV9QYXNzc2NvcmU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0Rlc2M6c3RyaW5nO1xyXG4gICAgcHVibGljIGdldCBEZXNjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9EZXNjO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBQYXNzc2NvcmUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1Bhc3NzY29yZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW9kZWxOYW1lICsgdGhpcy5tX0V4dGVuZElEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBQcmljZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUHJpY2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEl0ZW1UeXBlKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9JdGVtVHlwZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgSWNvbigpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fSWNvbjtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgICAgIHRoaXMubV9JRCA9IGRhdGEuSUQgPyBkYXRhLklEIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fUGFzc3Njb3JlID0gZGF0YS5QYXNzc2NvcmUgPyBkYXRhLlBhc3NzY29yZTogXCJcIjtcclxuICAgICAgICB0aGlzLm1fTW9kZWxOYW1lID0gZGF0YS5Nb2RlbE5hbWUgPyBkYXRhLk1vZGVsTmFtZSA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0V4dGVuZElEID0gZGF0YS5FeHRlbmRJRCA/IGRhdGEuRXh0ZW5kSUQgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9QcmljZSA9IGRhdGEuUHJpY2UgPyBOdW1iZXIoZGF0YS5QcmljZSkgOiAwO1xyXG4gICAgICAgIHRoaXMubV9JdGVtVHlwZSA9IGRhdGEuSXRlbVR5cGU/IE51bWJlcihkYXRhLkl0ZW1UeXBlKTowO1xyXG4gICAgICAgIHRoaXMubV9JY29uID0gZGF0YS5JY29uP2RhdGEuSWNvbjpcIlwiO1xyXG4gICAgICAgIHRoaXMubV9EZXNjID0gZGF0YS5EZXNjP2RhdGEuRGVzYzpcIlwiO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuIC8qKlxyXG4gKiDooajnjrDnlKjnmoTlr7nosaFcclxuICovXHJcbmV4cG9ydCBtb2R1bGUgQW5pbU9ialxyXG57XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKTtcclxuICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICBmb3IoIGxldCBjb3VudCA9MDtjb3VudCA8IDMwOysrY291bnQgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2VuQW5pbU9iajxBbmltQ29pbj4oQW5pbUNvaW4sbW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZW5BbmltT2JqPFQgZXh0ZW5kcyBCYXNlQW5pbU9iaj4oIGFuaW1DbGFzczp7bmV3IChuYW1lOnN0cmluZyxtb2RlbDpMYXlhLlNwcml0ZTNEKTogVDsgTmFtZSgpOnN0cmluZyB9LG1vZGVsOkxheWEuU3ByaXRlM0QgKTpUXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFuaW1PYmogPSBMYXlhLlBvb2wuZ2V0SXRlbShhbmltQ2xhc3MuTmFtZSgpKTtcclxuICAgICAgICBpZihhbmltT2JqPT1udWxsKVxyXG4gICAgICAgICAgICBhbmltT2JqID0gbmV3IGFuaW1DbGFzcyhhbmltQ2xhc3MuTmFtZSgpLG1vZGVsKTtcclxuICAgICAgICByZXR1cm4gYW5pbU9iajtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYWJzdHJhY3QgY2xhc3MgQmFzZUFuaW1PYmogZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbiAgICB7XHJcbiAgICAgICAgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlNjZW5lT2JqLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fRnJhbWVGdW5jKVxyXG4gICAgICAgIH1cclxuICAgICAgICBNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSBfTmFtZTpzdHJpbmc7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5fTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMub24oTGF5YS5FdmVudC5SRU1PVkVELHRoaXMsdGhpcy5fTGVhdmVTdGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBfRnJhbWVGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fSnVkZ2VDb21wbGV0ZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9GcmFtZUxvZ2ljRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+avj+W4p+aJp+ihjOmAu+i+keWKn+iDvVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICAvL+WIpOaWreS7u+WKoeWujOaIkFxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfSnVkZ2VDb21wbGV0ZSgpOmJvb2xlYW47XHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/nu5PmnZ/lpITnkIZcclxuICAgICAgICBwcm90ZWN0ZWQgX0xlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIodGhpcyx0aGlzLl9GcmFtZUZ1bmMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRm9yY2VMZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTGVhdmVTdGFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIEFuaW1Db2luIGV4dGVuZHMgQmFzZUFuaW1PYmpcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiQW5pbUNvaW5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgU2V0VGFyZ2V0KCB0YXJnZXQ6TGF5YS5TcHJpdGUzRCApICAgIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICBzdXBlci5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9UYXJnZXQ6TGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyxtb2RlbDpMYXlhLk1lc2hTcHJpdGUzRCA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihuYW1lLG1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBtb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+avj+W4p+aJp+ihjOmAu+i+keWKn+iDvVxyXG4gICAgICAgIHByb3RlY3RlZCBfRnJhbWVMb2dpY0Z1bmMoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGFkZFBTID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UG9zaXRpb24scG9zaXRpb24sYWRkUFMpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUoYWRkUFMsMC4xLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLmFkZChhZGRQUyxwb3NpdGlvbixwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/nu5PmnZ/lpITnkIZcclxuICAgICAgICBwcm90ZWN0ZWQgX0xlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5fTGVhdmVTdGFnZSgpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZExvZ2ljR29sZCgxKTtcclxuICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIodGhpcy5uYW1lLHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+WIpOaWreS7u+WKoeWujOaIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfSnVkZ2VDb21wbGV0ZSgpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRQb3NpdGlvbiA9IHRoaXMuX1RhcmdldC50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgZGlzRGlyID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UG9zaXRpb24scG9zaXRpb24sZGlzRGlyKTtcclxuICAgICAgICAgICAgaWYoIExheWEuVmVjdG9yMy5zY2FsYXJMZW5ndGhTcXVhcmVkKGRpc0Rpcik8MC4xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBtb2R1bGUgQ2hhcmFjdGVyXHJcbntcclxuICAgIGV4cG9ydCBlbnVtIEFuaW1FbnVtXHJcbiAgICB7XHJcbiAgICAgICAgU3RhbmQsXHJcbiAgICAgICAgRmx5LFxyXG4gICAgICAgIEZhbGwsXHJcbiAgICAgICAgSnVtcCxcclxuICAgICAgICBKdW1wZG93bixcclxuICAgICAgICBEaWVcclxuICAgIH1cclxuICAgIHZhciBBbmltVHlwZTp7W25hbWU6bnVtYmVyXTpzdHJpbmd9O1xyXG4gICAgQW5pbVR5cGUgPSB7fTtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLlN0YW5kXSA9IFwiaWRsZVwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uSnVtcF0gPSBcImp1bXBVcFwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uSnVtcGRvd25dID0gXCJqdW1wRG93blwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uRmx5XSA9IFwiZmx5XCI7XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5GYWxsXSA9IFwiZmFsbERvd25cIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkRpZV0gPSBcImRpZVwiO1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFBsYXllckFuaW1OYW1lKCBuYW1lRW51bTpBbmltRW51bSApOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBBbmltVHlwZVtuYW1lRW51bV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJBbmltYXRvclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgbV9BbmltYXRvcjpMYXlhLkFuaW1hdG9yO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBQbGF5ZXJDaGFyYWN0ZXI6TGF5YS5TcHJpdGUzRCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBQbGF5ZXJDaGFyYWN0ZXIuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgU3dpdGNoU3RhdGUoIEFuaW1FbnVtIClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RvckFuaW1hdG9yXHJcbntcclxuICAgIHByb3RlY3RlZCBtX0FuaWFtdG9yOkxheWEuQW5pbWF0b3I7XHJcbiAgICBwcml2YXRlIG1fU3RhdGVNYXA6IHtbbmFtZTpzdHJpbmddOkxheWEuQW5pbWF0b3JTdGF0ZX07XHJcbiAgICBwcml2YXRlIG1fQ3VyU3RhdGVOYW1lOnN0cmluZztcclxuICAgIHB1YmxpYyBnZXQgc3BlZWQoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0FuaWFtdG9yLnNwZWVkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBzcGVlZCh2YWx1ZTpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaWFtdG9yLnNwZWVkID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGN1clN0YXRlTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fQ3VyU3RhdGVOYW1lO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoIGFuaW1hdG9yOkxheWEuQW5pbWF0b3IgKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9BbmlhbXRvciA9IGFuaW1hdG9yO1xyXG4gICAgICAgIHRoaXMubV9TdGF0ZU1hcCA9IHt9O1xyXG4gICAgICAgIGlmKCFhbmltYXRvcilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBsYXllcjogTGF5YS5NYXBMYXllciA9IGFuaW1hdG9yLmdldENvbnRyb2xsZXJMYXllcigpLl9zdGF0ZXNNYXA7XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9TdGF0ZU1hcFtrZXldID0gbGF5ZXJba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX0N1clN0YXRlTmFtZSA9IHRoaXMubV9BbmlhbXRvci5nZXREZWZhdWx0U3RhdGUoKS5uYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRTdGF0ZShuYW1lOnN0cmluZyk6TGF5YS5BbmltYXRvclN0YXRlXHJcbiAgICB7XHJcbiAgICAgICAgaWYobmFtZSA9PSBcImZhbGxcIilcclxuICAgICAgICAgICAgdmFyIGEgPSAxO1xyXG4gICAgICAgIHZhciBhbmltYXRvclN0YXRlID0gdGhpcy5tX1N0YXRlTWFwW25hbWVdO1xyXG4gICAgICAgIGlmKCFhbmltYXRvclN0YXRlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGlkbGVTdGF0ZSA9IHRoaXMubV9BbmlhbXRvci5nZXREZWZhdWx0U3RhdGUoKTtcclxuICAgICAgICAgICAgYW5pbWF0b3JTdGF0ZSA9IG5ldyBMYXlhLkFuaW1hdG9yU3RhdGUoKTtcclxuICAgICAgICAgICAgYW5pbWF0b3JTdGF0ZS5uYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgYW5pbWF0b3JTdGF0ZS5jbGlwID0gaWRsZVN0YXRlLmNsaXA7XHJcbiAgICAgICAgICAgIHRoaXMubV9BbmlhbXRvci5hZGRTdGF0ZShhbmltYXRvclN0YXRlKTtcclxuICAgICAgICAgICAgdGhpcy5tX1N0YXRlTWFwW25hbWVdID0gYW5pbWF0b3JTdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBhbmltYXRvclN0YXRlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgcGxheShuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBcclxuICAgICAgICBpZih0aGlzLm1fU3RhdGVNYXBbbmFtZV0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pYW10b3IucGxheShuYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5tX0N1clN0YXRlTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYW5pbSBJcyBOb3QgRXhpc3RcIiArIG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGxpbmtTcHJpdGUzRFRvQXZhdGFyTm9kZShub2RlTmFtZTogc3RyaW5nLCBzcHJpdGUzRDogTGF5YS5TcHJpdGUzRCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9BbmlhbXRvci5saW5rU3ByaXRlM0RUb0F2YXRhck5vZGUobm9kZU5hbWUsc3ByaXRlM0QpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHsgQmFzZUZ1bmMgfSBmcm9tIFwiLi4vQmFzZS9CYXNlRnVuY1wiO1xyXG4vL+a4uOaIj+S4reebuOaculxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ2FtZXJhIGV4dGVuZHMgTGF5YS5DYW1lcmEge1xyXG4gICAgQ3RybGVyOiBCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIEJhc2VQUzogTGF5YS5WZWN0b3IzO1xyXG4gICAgRHluYW1pY1BTOiBMYXlhLlZlY3RvcjM7XHJcbiAgICBQbGF5ZXI6IFBsYXllcjtcclxuICAgIHByaXZhdGUgbV9Db3VudFBTOiBCYXNlRnVuYy5TbW9vdGhEYW1wO1xyXG5cclxuICAgIHNldCBQb3NpdGlvbihwczogTGF5YS5WZWN0b3IzKSAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcHMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpOiBMYXlhLlZlY3RvcjMgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkN0cmxlciA9IG5ldyBHYW1lQ2FtZXJhQ3RybGVyKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gbnVsbDtcclxuICAgICAgICAvL3RoaXMudGltZXJMb29wKDEsdGhpcy5DdHJsZXIsdGhpcy5DdHJsZXIuVXBkYXRlKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLCB0aGlzLCB0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHRoaXMuY2xlYXJGbGFnID0gTGF5YS5CYXNlQ2FtZXJhLkNMRUFSRkxBR19TS1k7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50UFMgPSBuZXcgQmFzZUZ1bmMuU21vb3RoRGFtcCgyKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBJbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5CYXNlUFMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGxhZXIocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXQoRHluYW1pY1BTOiBMYXlhLlZlY3RvcjMsIGJhc2VQUzogTGF5YS5WZWN0b3IzLCBwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IGJhc2VQUztcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IER5bmFtaWNQUztcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul+W5tuiuvue9ruS9jee9rlxyXG4gICAgQ291bnRTZXRQUygpICB7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMuQmFzZVBTLCB0aGlzLkR5bmFtaWNQUywgbmV3UFMpO1xyXG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMubV9Db3VudFBTLlNtb290aERhbXAoMCwgTGF5YS5WZWN0b3IzLmRpc3RhbmNlKHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLCBuZXdQUykpXHJcbiAgICAgICAgLy90aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5sZXJwKHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLCBuZXdQUywgc2NhbGUsIG5ld1BTKVxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7IC8vdGhpcy5tX0NvdW50UFMuQ291bnQodGhpcy50cmFuc2Zvcm0ucG9zaXRpb24sbmV3UFMpIC8vbmV3UFM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfVXBkYXRlKCkgIHtcclxuICAgICAgICB0aGlzLkN0cmxlci5VcGRhdGUoKTtcclxuICAgICAgICAvL3RoaXMuZmllbGRPZlZpZXdcclxuICAgIH1cclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVDYW1lcmFDdHJsZXIge1xyXG4gICAgQ2FtZXJhOiBHYW1lQ2FtZXJhO1xyXG4gICAgQ3RybGVyOiBCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIGFic3RyYWN0IFVwZGF0ZSgpOiB2b2lkO1xyXG4gICAgY29uc3RydWN0b3IoY2FtZXJhOiBHYW1lQ2FtZXJhLCBjdHJsZXI6IEJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbCkgIHtcclxuICAgICAgICBpZiAoY3RybGVyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIGN0cmxlciA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gY2FtZXJhO1xyXG4gICAgICAgIHRoaXMuQ3RybGVyID0gY3RybGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ2FtZXJhQ3RybGVyIGV4dGVuZHMgQmFzZUdhbWVDYW1lcmFDdHJsZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2FtZXJhOiBHYW1lQ2FtZXJhLCBjdHJsZXI6IEJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbCkgIHtcclxuICAgICAgICBzdXBlcihjYW1lcmEsIGN0cmxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCkgIHtcclxuICAgICAgICBpZiAodGhpcy5DYW1lcmEgPT0gbnVsbCB8fCB0aGlzLkNhbWVyYS5QbGF5ZXIgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBDYW1lcmFQUyA9IHRoaXMuQ2FtZXJhLkR5bmFtaWNQUztcclxuICAgICAgICB2YXIgUGxheWVyUFMgPSB0aGlzLkNhbWVyYS5QbGF5ZXIuX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlzTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggTWF0aC5hYnMoZGlzWk51bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnogKz0gZGlzWk51bSowLjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNhbWVyYS5EeW5hbWljUFMgPUNhbWVyYVBTOyovXHJcbiAgICAgICAgdmFyIENhbWVyYVBTID0gdGhpcy5DYW1lcmEuRHluYW1pY1BTO1xyXG4gICAgICAgIHZhciBQbGF5ZXJQUyA9IHRoaXMuQ2FtZXJhLlBsYXllci5tX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgdmFyIGRpc0h1bSA9IFBsYXllclBTLnggLSBDYW1lcmFQUy54O1xyXG4gICAgICAgIGlmIChNYXRoLmFicyhkaXNOdW0pID4gMC4wMSkgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLmFicyhkaXNaTnVtKSA+IDAuMDEpICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnogKz0gZGlzWk51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpc0h1bSkgPiAwLjAxKSAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy54ICs9IGRpc0h1bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuRHluYW1pY1BTID0gQ2FtZXJhUFM7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuQ291bnRTZXRQUygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgeyBBbmltT2JqIH0gZnJvbSBcIi4vLi4vR2FtZS9BbmltT2JqXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgeyBQbGF5ZXJDb250cm9sZXIgfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL0lucHV0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vR2FtZU1vZHVsZVwiO1xyXG5pbXBvcnQgQ2hhcmFjdG9yQW5pbWF0b3IgZnJvbSBcIi4vQ2hhcmFjdGVyQW5pbWF0b3JcIjtcclxuaW1wb3J0IHsgQmFzZUZ1bmMgfSBmcm9tIFwiLi4vQmFzZS9CYXNlRnVuY1wiO1xyXG5cclxudHlwZSBBbmltQ29pbiA9IEFuaW1PYmouQW5pbUNvaW5cclxuZXhwb3J0IG1vZHVsZSBJdGVtIHtcclxuICAgIC8v54mp5ZOB5qCH6K+GXHJcbiAgICBjb25zdCBJdGVtSUQ6IHN0cmluZyA9IFwiSXRlbVwiO1xyXG4gICAgY29uc3QgTW9kZWxJRDogc3RyaW5nID0gXCJNb2RlbFwiXHJcblxyXG4gICAgZXhwb3J0IGVudW0gTW9kZWxUeXBlIHtcclxuICAgICAgICBDb2luXHJcbiAgICB9XHJcbiAgICBleHBvcnQgZW51bSBJdGVtVHlwZSB7XHJcbiAgICAgICAgTm9uZSA9IDAsXHJcbiAgICAgICAgRW1wdHksXHJcbiAgICAgICAgUm9jayxcclxuICAgICAgICBUaG9ybixcclxuICAgICAgICBWaW5lLFxyXG4gICAgICAgIFByb3RlY3QgPSAxMSxcclxuICAgICAgICBIb2x5UHJvdGVjdCxcclxuICAgICAgICBGbHksXHJcbiAgICAgICAgUm9wZSxcclxuICAgICAgICBDb2xsZWN0b3IsXHJcbiAgICAgICAgQ29pbiA9IDIwLFxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIExpbmVJdGVtSW5mbyB7XHJcbiAgICAgICAgVHlwZTogSXRlbVR5cGU7XHJcbiAgICAgICAgTnVtYmVyOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IodHlwZTogSXRlbVR5cGUsIG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtYmVyID0gbnVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCB2YXIgQnVmZlNsb3Q6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0gPSB7fTtcclxuICAgIEJ1ZmZTbG90W0l0ZW1UeXBlLkNvbGxlY3Rvcl0gPSAwO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuUHJvdGVjdF0gPSAxO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuSG9seVByb3RlY3RdID0gMTtcclxuICAgIEJ1ZmZTbG90W0l0ZW1UeXBlLkZseV0gPSAxO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuVmluZV0gPSAyO1xyXG5cclxuICAgIC8v54mp5ZOB5biD5bGAXHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxheW91dCB7XHJcbiAgICAgICAgUmV3YXJkTGlzdDogQXJyYXk8TGF5SXRlbU1ncj47XHJcbiAgICAgICAgQmFycmllckxpc3Q6IEFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QgPSBuZXcgQXJyYXk8TGF5SXRlbU1ncj4oKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLCAxLCBJdGVtVHlwZS5FbXB0eSwgMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLCA1LCBJdGVtVHlwZS5Sb2NrLCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDIsIEl0ZW1UeXBlLlRob3JuLCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMiwgSXRlbVR5cGUuVmluZSwgMTApKTtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDEsIEl0ZW1UeXBlLkNvaW4pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLCAxLCBJdGVtVHlwZS5GbHksIDIwKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMSwgSXRlbVR5cGUuQ29sbGVjdG9yKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLCAxLCBJdGVtVHlwZS5Qcm90ZWN0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLCAxLCBJdGVtVHlwZS5Ib2x5UHJvdGVjdCkpO1xyXG5cclxuICAgICAgICAgICAgUmVzZXRJdGVtRmFjdG9yeSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFrZUxpbmVSZXdhcmQoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vciwgdGhpcy5SZXdhcmRMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VMaW5lRGlmZmljdWx0eShmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRha2VJdGVtKGZsb29yLCB0aGlzLkJhcnJpZXJMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VJdGVtKGZsb29yOiBudW1iZXIsIE1nckxpc3Q6IEFycmF5PExheUl0ZW1NZ3I+KTogQXJyYXk8TGluZUl0ZW1JbmZvPiB7XHJcbiAgICAgICAgICAgIHZhciByZXR1cm5JbmZvID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgbGlzdElkeCA9IDA7IGxpc3RJZHggPCBNZ3JMaXN0Lmxlbmd0aDsgKytsaXN0SWR4KSB7XHJcbiAgICAgICAgICAgICAgICBNZ3JMaXN0W2xpc3RJZHhdLk9uRmxvb3IoZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm86IExpbmVJdGVtSW5mbyA9IE1nckxpc3RbbGlzdElkeF0uVGFrZUl0ZW1zKGZsb29yKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLk51bWJlciA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5JbmZvLnB1c2goaW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6K+l5a+56LGh55qE5YiG5biD5Zu+5q+P5bGC562J5qaC546H5YiG5biDXHJcbiAgICBleHBvcnQgY2xhc3MgTGF5SXRlbU1nciB7XHJcbiAgICAgICAgLy/pgZPlhbfnsbvlnotcclxuICAgICAgICBJdGVtVHlwZTogSXRlbVR5cGU7XHJcbiAgICAgICAgLy/lvZPliY3lsYLmlbBcclxuICAgICAgICBDdXJGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIC8v5Yy66Ze05YiG5biD5oC75pWw6YePXHJcbiAgICAgICAgSXRlbU51bTogbnVtYmVyO1xyXG4gICAgICAgIC8v5byA5aeL5YiG5biD55qE5bGC5pWwXHJcbiAgICAgICAgU3RhcnRGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIC8v5YiG5biD5Yy66Ze0XHJcbiAgICAgICAgLy/lt7Lojrflj5blsYLmoIforrBcclxuICAgICAgICBUb3VjaGVkRmxvb3I6IG51bWJlcjtcclxuICAgICAgICBJdGVtTGlzdDogQXJyYXk8bnVtYmVyPjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gcmFuZ2Ug5Yy66Ze06IyD5Zu0XHJcbiAgICAgICAgICogQHBhcmFtIG51bSDljLrpl7TojIPlm7TmlbDph49cclxuICAgICAgICAgKiBAcGFyYW0gaXRlbVR5cGUg55Sf5Lqn55qE6YGT5YW357G75Z6LXHJcbiAgICAgICAgICogQHBhcmFtIHN0YXJ0Rmxvb3Ig5LuO5ZOq5LiA6KGM5byA5aeL5oqV5o63XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IocmFuZ2U6IG51bWJlciwgbnVtOiBudW1iZXIsIGl0ZW1UeXBlOiBJdGVtVHlwZSwgc3RhcnRGbG9vcjogbnVtYmVyID0gMSkge1xyXG4gICAgICAgICAgICBpZiAobnVtID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIG51bSA9IDE7XHJcbiAgICAgICAgICAgIGlmIChzdGFydEZsb29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIC8v56ysMOWxguaYr+eOqeWutui1t+atpeS9jee9rlxyXG4gICAgICAgICAgICAgICAgc3RhcnRGbG9vciA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5DdXJGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbU51bSA9IG51bTtcclxuICAgICAgICAgICAgLy/liIbluIPlm74g54mp5ZOBaWR4OuWxguaVsFxyXG4gICAgICAgICAgICB0aGlzLkl0ZW1MaXN0ID0gbmV3IEFycmF5PG51bWJlcj4ocmFuZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuR2VuTWFwKHN0YXJ0Rmxvb3IpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBSYW5nZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5bGC5pu05paw5Ye95pWwXHJcbiAgICAgICAgT25GbG9vcihmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmIChmbG9vciA8IHRoaXMuVG91Y2hlZEZsb29yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdlbk1hcChmbG9vcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGZsb29yID49IHRoaXMuU3RhcnRGbG9vciArIHRoaXMuUmFuZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2VuTWFwKGZsb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUn+aIkOWIhuW4g+WbvlxyXG4gICAgICAgIEdlbk1hcChzdGFydEZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5TdGFydEZsb29yID0gc3RhcnRGbG9vcjtcclxuICAgICAgICAgICAgdmFyIGl0ZW1OdW0gPSB0aGlzLkl0ZW1OdW07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGNvdW50OiBudW1iZXIgPSAwOyBjb3VudCA8IHRoaXMuSXRlbUxpc3QubGVuZ3RoOyArK2NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkl0ZW1MaXN0W2NvdW50XSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGl0ZW1MaXN0ID0gdGhpcy5JdGVtTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgY291bnROdW06IG51bWJlciA9IDA7IGNvdW50TnVtIDwgaXRlbU51bTsgKytjb3VudE51bSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIEl0ZW1GbG9vcjogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5SYW5nZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkl0ZW1MaXN0W0l0ZW1GbG9vcl0gKz0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFrZUl0ZW1zKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub3VjaGVkRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBMaW5lSXRlbUluZm8odGhpcy5JdGVtVHlwZSwgdGhpcy5JdGVtTGlzdFtmbG9vciAtIHRoaXMuU3RhcnRGbG9vcl0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgUmVzZXQ6IGJvb2xlYW47XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gUmVzZXRJdGVtRmFjdG9yeSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoUmVzZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBSZXNldCA9IHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgdGhlS2V5IGluIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlKSB7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gcGFyc2VJbnQodGhlS2V5KTtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPD0gMikge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgY291bnQgPSAwOyBjb3VudCA8IDMwOyArK2NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xhczogYW55ID0gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbdHlwZV07XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbTogU3RlcCA9IG5ldyBjbGFzKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoSXRlbUlEICsgdGhlS2V5LCBpdGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gU3RlcEl0ZW1GYWN0b3J5KGl0ZW1UeXBlOiBJdGVtVHlwZSwgc3RlcCkge1xyXG4gICAgICAgIGlmIChzdGVwID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGl0ZW1UeXBlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpdGVtXHJcbiAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7XHJcbiAgICAgICAgaXRlbSA9IG9ialBvb2wuZ2V0SXRlbShJdGVtSUQgKyBpdGVtVHlwZSlcclxuICAgICAgICBpZiAoaXRlbSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV0gIT0gbnVsbCAmJiBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV0gIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xhczogYW55ID0gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbaXRlbVR5cGVdO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBjbGFzKHN0ZXApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IG5ldyBTdGVwSXRlbShpdGVtVHlwZSwgc3RlcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpdGVtLlN0ZXAgPSBzdGVwO1xyXG4gICAgICAgIGl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEl0ZW1CdWZmRmFjdG9yeShpdGVtVHlwZTogSXRlbVR5cGUpOiBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgdmFyIGJ1ZmY6IEJhc2VQbGF5ZXJCdWZmID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKGl0ZW1UeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuRmx5OlxyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5ldyBGbHlCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Db2xsZWN0b3I6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IENvbGxlY3RCdWZmKDEwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFByb3RlY3RCdWZmKDMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuSG9seVByb3RlY3Q6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFByb3RlY3RCdWZmKDMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuVmluZTpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgVmluZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvcGU6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IFJvcGVCdWZmKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJ1ZmY7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFN0ZXBJdGVtIHtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9DaGFyYWN0b3JBbmltYXRvcjogQ2hhcmFjdG9yQW5pbWF0b3I7XHJcbiAgICAgICAgU3RlcDogU3RlcDtcclxuICAgICAgICBJdGVtVHlwZTogSXRlbVR5cGU7XHJcbiAgICAgICAgTW9kZWw6IExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgZ2V0IElzRGlmZmljdWx0eSgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuSXRlbVR5cGUgPiAwICYmIHRoaXMuSXRlbVR5cGUgPCAxMCAmJiB0aGlzLkl0ZW1UeXBlICE9IEl0ZW1UeXBlLlZpbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreiDveS4jeiDvei1sOS4iuWOu1xyXG4gICAgICAgIGdldCBJc0ZvcmJpZGVuKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtVHlwZSA9PSBJdGVtVHlwZS5Sb2NrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/ph43nva5cclxuICAgICAgICBSZXNldEl0ZW0oKSB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5fSW5pdEl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICB0aGlzLlNldEVuYWJsZSgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vZGVsLnRyYW5zZm9ybS5yb3RhdGlvbkV1bGVyID0gbmV3IExheWEuVmVjdG9yMygwLCAxODAsIDApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TdGVwLlB1dEluSXRlbSh0aGlzLk1vZGVsKTsvLyAuYWRkQ2hpbGQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFNldEVuYWJsZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTW9kZWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFB1dEl0ZW0gPSBmdW5jdGlvbiAoaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRGVzUGF3bigpO1xyXG4gICAgICAgICAgICB0aGlzLlN0ZXAuU3RlcEl0ZW0gPSBTdGVwSXRlbUZhY3RvcnkoaXRlbVR5cGUsIHRoaXMuU3RlcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+a2iOmZpCDmioroh6rlt7HlrZjlhaXlhoXlrZjmsaBcclxuICAgICAgICBEZXNQYXduKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5Nb2RlbC5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHZhciBvYmpQb29sID0gTGF5YS5Qb29sOy8vR00uT2JqUG9vbDtcclxuICAgICAgICAgICAgb2JqUG9vbC5yZWNvdmVyKEl0ZW1JRCArIHRoaXMuSXRlbVR5cGUsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHBsYXllciBcclxuICAgICAgICAgKi9cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLkl0ZW1UeXBlKSB7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgQWRkQnVmZlRvUGxheWVyKHBsYXllcjogUGxheWVyLCBwdXRCYWNrSXRlbTogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIEJ1ZmY6IEJhc2VQbGF5ZXJCdWZmID0gSXRlbUJ1ZmZGYWN0b3J5KHRoaXMuSXRlbVR5cGUpO1xyXG4gICAgICAgICAgICB2YXIgc3VjY2VzczogYm9vbGVhbiA9IEJ1ZmYuQWRkVG9QbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MgJiYgcHV0QmFja0l0ZW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgcmV0dXJuIHN1Y2Nlc3M7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDnqoHnoLTkv53miqRcclxuICAgICAgICAgKiBAcmV0dXJucyDmmK/lkKbooqvnqoHnoLRcclxuICAgICAgICAgKi9cclxuICAgICAgICBCcmVha1Byb3RlY3QocGxheWVyOiBQbGF5ZXIpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdmFyIGN1ckJ1ZmYgPSBwbGF5ZXIuR2V0QnVmZihCdWZmU2xvdFtJdGVtVHlwZS5Qcm90ZWN0XSk7XHJcbiAgICAgICAgICAgIGlmIChjdXJCdWZmKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGN1ckJ1ZmYuVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUHJvdGVjdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQnVmZi5SZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihpdGVtVHlwZTogSXRlbVR5cGUsIFN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1UeXBlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVR5cGUgPSBJdGVtVHlwZS5Ob25lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcCA9IFN0ZXA7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0luaXRJdGVtTW9kZWwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIFNldElkbGVXYXZlKCkge1xyXG4gICAgICAgICAgICB2YXIgaWRlbFN0YXRlOiBMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLm1fQ2hhcmFjdG9yQW5pbWF0b3IuR2V0U3RhdGUoXCJpZGxlXCIpO1xyXG4gICAgICAgICAgICB2YXIgd2F2ZVN0YXRlOiBXYXZlU3RhdGVTY3JpcHQgPSBpZGVsU3RhdGUuYWRkU2NyaXB0KFdhdmVTdGF0ZVNjcmlwdCkgYXMgV2F2ZVN0YXRlU2NyaXB0O1xyXG4gICAgICAgICAgICB3YXZlU3RhdGUuSW5pdCh0aGlzLk1vZGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX0FkZEJ1ZmZUb1BsYXllcihwbGF5ZXI6IFBsYXllciwgYnVmZjogQmFzZVBsYXllckJ1ZmYpIHtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5BZGRCdWZmKGJ1ZmYpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9Jbml0SXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCAhPSBudWxsICYmICF0aGlzLk1vZGVsLmRlc3Ryb3llZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9HZW5JdGVtTW9kZWwoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTW9kZWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbmltTW9kZWwgPSB0aGlzLk1vZGVsLmdldENoaWxkQXQoMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYW5pbWF0b3I6IExheWEuQW5pbWF0b3IgPSBhbmltTW9kZWwgPyBhbmltTW9kZWwuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmIChhbmltYXRvcilcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdG9yQW5pbWF0b3IgPSBuZXcgQ2hhcmFjdG9yQW5pbWF0b3IoYW5pbWF0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLk1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgX1Rlc3RHZW50SXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBudWxsO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuSXRlbVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9jazpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLk5vbmU6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBtb2RlbCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMywgMC4zLCAwLjUpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5JdGVtVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Sb2NrOlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQbGF5ZXJCdWZmIHtcclxuICAgICAgICBwcml2YXRlIG1fVHlwZTogSXRlbVR5cGU7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1BsYXllcjogUGxheWVyO1xyXG4gICAgICAgIHB1YmxpYyBnZXQgVHlwZSgpOiBJdGVtLkl0ZW1UeXBlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9UeXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFNsb3QoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIEJ1ZmZTbG90W3RoaXMuVHlwZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgcGxheWVyKCk6IFBsYXllciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0eXBlOiBJdGVtLkl0ZW1UeXBlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9UeXBlID0gdHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/lkJHnjqnlrrbmt7vliqBCVUZGXHJcbiAgICAgICAgcHVibGljIEFkZFRvUGxheWVyKHBsYXllcjogUGxheWVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHRoaXMubV9QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRCdWZmKHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBTdGFydCgpO1xyXG4gICAgICAgIHB1YmxpYyBSZW1vdmVTZWxmKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5Db21wbGV0ZUJ1ZmYodGhpcy5TbG90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFJlbW92ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBSb2NrIGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgTW9kZWxOdW0gPSA0O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuUm9jaywgU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuTWVzaFNwcml0ZTNEID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGlkeCA9IDEgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBSb2NrLk1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIE5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJMMDFfc3ByX2JhcnJpZXJfMFwiICsgaWR4KVxyXG4gICAgICAgICAgICBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhOYW1lKVxyXG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Sb2NrXSA9IFJvY2s7XHJcblxyXG4gICAgY2xhc3MgVGhvcm4gZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgY29uc3RydWN0b3IoU3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5UaG9ybiwgU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQnJlYWtQcm90ZWN0KHBsYXllcikpXHJcbiAgICAgICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL0FQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgICAgICAgICAgLy92YXIgYW5pbTogTGF5YS5BbmltYXRvciA9IHRoaXMuTW9kZWwuZ2V0Q2hpbGRBdCgwKS5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgICAgICAgICAvL2FuaW0ucGxheShcImRpZVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9DaGFyYWN0b3JBbmltYXRvci5wbGF5KFwidHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgICAgIHBsYXllci5EaWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlRob3JuXSA9IFRob3JuO1xyXG5cclxuICAgIGNsYXNzIFByb3RlY3QgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Qcm90ZWN0LCBzdGVwKTtcclxuICAgICAgICAgICAgdGhpcy5TZXRJZGxlV2F2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fc2hpZWxkXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLkFkZEJ1ZmZUb1BsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlByb3RlY3RdID0gUHJvdGVjdDtcclxuXHJcbiAgICBjbGFzcyBQcm90ZWN0QnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmIHtcclxuICAgICAgICBUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHRpbWUg5oyB57ut5pe26Ze0XHJcbiAgICAgICAgICogQHBhcmFtIElzSG9seSDmmK/lkKbnu53lr7nml6DmlYxcclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOiBudW1iZXIgPSAwLCBJc0hvbHk6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgICAgICBzdXBlcihJc0hvbHkgPyBJdGVtVHlwZS5Ib2x5UHJvdGVjdCA6IEl0ZW1UeXBlLlByb3RlY3QpO1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyB0aW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UaW1lIDwgQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0KCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZW1vdmVkKCkge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNsYXNzIEhvbHlQcm90ZWN0IGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuSG9seVByb3RlY3QsIHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlNldElkbGVXYXZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiKVxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5BZGRCdWZmVG9QbGF5ZXIocGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Ib2x5UHJvdGVjdF0gPSBIb2x5UHJvdGVjdDtcclxuXHJcbiAgICBjbGFzcyBDb2luIGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIHByaXZhdGUgbV90b3VjaGVkOiBCb29sZWFuXHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuQ29pbiwgc3RlcCk7XHJcbiAgICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgIHZhciBpZGVsU3RhdGU6IExheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMubV9DaGFyYWN0b3JBbmltYXRvci5HZXRTdGF0ZShcImlkbGVcIik7XHJcbiAgICAgICAgICAgIHZhciB3YXZlU3RhdGU6IFdhdmVTdGF0ZVNjcmlwdCA9IGlkZWxTdGF0ZS5hZGRTY3JpcHQoV2F2ZVN0YXRlU2NyaXB0KSBhcyBXYXZlU3RhdGVTY3JpcHQ7XHJcbiAgICAgICAgICAgIHdhdmVTdGF0ZS5Jbml0KHRoaXMuTW9kZWwpO1xyXG4gICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICB0aGlzLlNldElkbGVXYXZlKCk7XHJcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyU3RhdGU6IExheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMubV9DaGFyYWN0b3JBbmltYXRvci5HZXRTdGF0ZShcInRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyU3RhdGVTY3JpcHQ6IEdvbGRKdW1wVXAgPSB0cmlnZ2VyU3RhdGUuYWRkU2NyaXB0KEdvbGRKdW1wVXApIGFzIEdvbGRKdW1wVXA7XHJcbiAgICAgICAgICAgIHRyaWdnZXJTdGF0ZVNjcmlwdC5Jbml0KHRoaXMuTW9kZWwsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgRmx5VG9QbGF5ZXIocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgdmFyIGNvbmluOiBBbmltQ29pbiA9IEFuaW1PYmouR2VuQW5pbU9iajxBbmltQ29pbj4oQW5pbU9iai5BbmltQ29pbiwgdGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgIGNvbmluLlNldFRhcmdldChwbGF5ZXIpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZEdvbGRVbkxvZ2ljR29sZCgxKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUb3VjaEl0ZW0ocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRHb2xkKDEpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdG9yQW5pbWF0b3IucGxheShcInRyaWdnZXJcIilcclxuICAgICAgICAgICAgLy90aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9jb2luXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Db2luXSA9IENvaW47XHJcblxyXG4gICAgY2xhc3MgQ29sbGVjdGVyIGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLkFkZEJ1ZmZUb1BsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2xsZWN0b3IsIHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlNldElkbGVXYXZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDEgKyBNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9hYnNvcmRfMDFcIik7XHJcbiAgICAgICAgICAgIHZhciB0aGVNb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gdGhlTW9kZWwuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5Db2xsZWN0b3JdID0gQ29sbGVjdGVyO1xyXG5cclxuICAgIGNsYXNzIENvbGxlY3RCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIFRpbWU6IG51bWJlcjtcclxuICAgICAgICBHYW1lRGlyOiBHYW1lRGlyZWN0b3I7XHJcbiAgICAgICAgQ291bnRGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIHN0YXRpYyBnZXQgU2xvdCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IodGltZTogbnVtYmVyID0gMCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2xsZWN0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVEaXIgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyO1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyB0aW1lO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50Rmxvb3IgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydCgpIHtcclxuICAgICAgICAgICAgdGhpcy5Db3VudEZsb29yID0gdGhpcy5HYW1lRGlyLkdhbWVQbGF5LlBsYXllckZsb29yIC0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVtb3ZlZCgpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVGltZSA8IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5HYW1lRGlyLkdhbWVQbGF5LlBsYXllckZsb29yIC0gdGhpcy5Db3VudEZsb29yICsgMSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVEaXIuR2FtZVBsYXkuTG9vcERvRmxvb3JTdGVwKHRoaXMuQ291bnRGbG9vciwgdGhpcywgdGhpcy5Db3VudENvaW5zKTtcclxuICAgICAgICAgICAgICAgICsrdGhpcy5Db3VudEZsb29yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgQ291bnRDb2lucyhzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIGlmIChzdGVwLlN0ZXBJdGVtLkl0ZW1UeXBlID09IEl0ZW1UeXBlLkNvaW4pIHtcclxuICAgICAgICAgICAgICAgIHZhciBDb2luOiBDb2luID0gc3RlcC5TdGVwSXRlbSBhcyBDb2luO1xyXG4gICAgICAgICAgICAgICAgQ29pbi5GbHlUb1BsYXllcih0aGlzLnBsYXllcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgRkx5IGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLkFkZEJ1ZmZUb1BsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuRmx5LCBzdGVwKTtcclxuICAgICAgICAgICAgdGhpcy5TZXRJZGxlV2F2ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxICsgTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fZmx5ZXJfMDFcIik7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuRmx5XSA9IEZMeTtcclxuXHJcbiAgICBjbGFzcyBGbHlCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIHN0YXRpYyBnZXQgU2xvdCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgU3BlZWQ6IG51bWJlcjtcclxuICAgICAgICBGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9GbG9vclN3aXRjaDogbnVtYmVyO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDogbnVtYmVyID0gMC4xNSwgZmxvb3I6IG51bWJlciA9IDEwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkZseSk7XHJcbiAgICAgICAgICAgIHRoaXMuU3BlZWQgPSBzcGVlZDtcclxuICAgICAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxaID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFN0YXJ0KCkge1xyXG4gICAgICAgICAgICB2YXIgdGltZTogbnVtYmVyID0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lO1xyXG4gICAgICAgICAgICB2YXIgcGxheWVyOiBQbGF5ZXIgPSB0aGlzLnBsYXllcjtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5DdXJTdGVwID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjdXJMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvblxyXG4gICAgICAgICAgICB0aGlzLm1fRmxvb3JTd2l0Y2ggPSBwbGF5ZXIuQ3VyU3RlcC5GbG9vci5yaWdodFN3aXRjaDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24oY3VyTG9jYXRpb24uWCwgY3VyTG9jYXRpb24uWSk7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPSB0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIEdhbWVNb2R1bGUuRFNwYWNlICogdGhpcy5GbG9vcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbHlDdHJsID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJGbHkodGhpcy5TcGVlZCk7XHJcbiAgICAgICAgICAgIHBsYXllci5BZGRDdHJsZXIoZmx5Q3RybCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KCkpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNldFNhZmVQUyh0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgcGxheWVyLkZseVByZXBhcmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFJlbW92ZWQoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HZXRTdGVwQnlMb2NhdGlvbih0aGlzLl9GaW5hbExvY2F0aW9uLCB0aGlzLm1fRmxvb3JTd2l0Y2gpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuUG9wQ3RybGVyKCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5fRmluYWxaIC0gdGhpcy5wbGF5ZXIuUG9zaXRpb24ueiA+IC0wLjIpIHtcclxuICAgICAgICAgICAgICAgIHN1cGVyLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBSb3BlIGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLkFkZEJ1ZmZUb1BsYXllcihwbGF5ZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb3BlLCBzdGVwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5NZXNoU3ByaXRlM0QgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjEsIDAuNSwgMC4xKSlcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlJvcGVdID0gUm9wZTtcclxuXHJcbiAgICBjbGFzcyBSb3BlQnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmIHtcclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIEZsb29yOiBudW1iZXI7XHJcblxyXG4gICAgICAgIHN0YXRpYyBnZXQgU2xvdCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9GaW5hbFogLSB0aGlzLnBsYXllci5Qb3NpdGlvbi56ID4gLTAuMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXI6IFBsYXllciA9IHRoaXMucGxheWVyO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbExvY2F0aW9uID0gcGxheWVyLkN1clN0ZXAuTG9jYXRpb247XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24uWSArPSB0aGlzLkZsb29yO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSBwbGF5ZXIuUG9zaXRpb24ueiAtIEdhbWVNb2R1bGUuRFNwYWNlICogdGhpcy5GbG9vcjtcclxuXHJcbiAgICAgICAgICAgIHZhciBmbHlDdHJsID0gbmV3IFBsYXllckNvbnRyb2xlci5QbGF5ZXJGbHkodGhpcy5TcGVlZCk7XHJcbiAgICAgICAgICAgIGZseUN0cmwuU2V0UGxheWVyKHBsYXllcilcclxuICAgICAgICAgICAgcGxheWVyLkFkZEN0cmxlcihmbHlDdHJsKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQodGhpcywgdGhpcy5fSW5wdXQpKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TZXRTYWZlUFModGhpcy5fRmluYWxMb2NhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJlbW92ZWQoKSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HZXRTdGVwQnlMb2NhdGlvbih0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuTGF5U3RlcChzdGVwKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuUG9wQ3RybGVyKCk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjogbnVtYmVyO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIgPSAwLjEsIGZsb29yOiBudW1iZXIgPSAxMCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb3BlKTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaXNSaWdodDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VGbG9vciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3JMaW5lO1xyXG4gICAgICAgICAgICBpZiAoY2xvc2VGbG9vci5GbG9vck51bSAlIDIgIT0gdGhpcy5fRmluYWxMb2NhdGlvbi5ZICUgMikge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VGbG9vciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuR2V0Rmxvb3JCeUZsb29yKGNsb3NlRmxvb3IuRmxvb3JOdW0gKyAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IGNsb3NlRmxvb3IuR2V0U3RlcCh0aGlzLl9GaW5hbExvY2F0aW9uLlgpO1xyXG4gICAgICAgICAgICBpZiAoaXNSaWdodClcclxuICAgICAgICAgICAgICAgIHN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgICAgICBpZiAoc3RlcC5TdGVwSXRlbS5Jc0ZvcmJpZGVuKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2xhc3MgVmluZSBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICBwcml2YXRlIG1fQmVUb3VjaGVkOiBib29sZWFuO1xyXG4gICAgICAgIGdldCBUb3VjaGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0JlVG91Y2hlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFRvdWNoZWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgdGhpcy5tX0JlVG91Y2hlZCA9IHZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Ub3VjaGVkKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllciwgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0NoYXJhY3RvckFuaW1hdG9yKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0NoYXJhY3RvckFuaW1hdG9yLnBsYXkoXCJ0cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLk1vZGVsLm5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlZpbmUsIHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSArIE1hdGgucmFuZG9tKCkgKiAyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IElkeCA9PSAxID8gcGF0aC5HZXRMSChcInRyYXBfZW50YW5nbGVfMDFcIikgOiBwYXRoLkdldExIKFwidHJhcF9jaG9tcGVyXzAxXCIpXHJcblxyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMobmFtZSkuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+a2iOmZpCDmioroh6rlt7HlrZjlhaXlhoXlrZjmsaBcclxuICAgICAgICBEZXNQYXduKCkge1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3VwZXIuRGVzUGF3bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlZpbmVdID0gVmluZTtcclxuXHJcbiAgICBjbGFzcyBWaW5lQnVmZiBleHRlbmRzIEJhc2VQbGF5ZXJCdWZmIHtcclxuICAgICAgICBDb3VudFRpbWU6IG51bWJlcjtcclxuICAgICAgICBJbnB1dERpcjogYm9vbGVhbjtcclxuICAgICAgICBTdGFydCgpIHtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQodGhpcywgdGhpcy5fSW5wdXQpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFJlbW92ZWQoKSB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuUG9wSW5wdXRDdHJsZXIoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGNvdW50VGltZTogbnVtYmVyID0gNCwgaW5wdXREaXI6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlZpbmUpO1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50VGltZSA9IGNvdW50VGltZTtcclxuICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9IGlucHV0RGlyO1xyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZTtcclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpbnB1dERpcjogYm9vbGVhbikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5JbnB1dERpciA9PSBpbnB1dERpcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5JbnB1dERpciA9ICF0aGlzLklucHV0RGlyO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLkNvdW50VGltZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9TaG93R2FtZUluZm8oKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ291bnRUaW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1Nob3dHYW1lSW5mbygpIHtcclxuICAgICAgICAgICAgdmFyIGluZm86IHN0cmluZztcclxuICAgICAgICAgICAgaWYgKHRoaXMuQ291bnRUaW1lIDw9IDApXHJcbiAgICAgICAgICAgICAgICBpbmZvID0gXCJcIjtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuSW5wdXREaXIgPT0gdHJ1ZSA/IFwiUmlnaHRcIiA6IFwiTGVmdFwiO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIEdvbGRKdW1wVXAgZXh0ZW5kcyBMYXlhLkFuaW1hdG9yU3RhdGVTY3JpcHQge1xyXG4gICAgICAgIHByaXZhdGUgbV9Nb2RlbDogTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBwcml2YXRlIG1fRmx5VXBUaW1lO1xyXG4gICAgICAgIHByaXZhdGUgbV9Db3VudFBTOiBCYXNlRnVuYy5TbW9vdGhEYW1wO1xyXG4gICAgICAgIHByaXZhdGUgbV9ZU3dpdGNoOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBtX09yaWdpbmFsWTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9TdGVwSXRlbTogU3RlcEl0ZW07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEluaXQobW9kZWw6IExheWEuU3ByaXRlM0QsIHN0ZXBJdGVtOiBTdGVwSXRlbSkge1xyXG4gICAgICAgICAgICB0aGlzLm1fTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICAgICAgdGhpcy5tX1N0ZXBJdGVtID0gc3RlcEl0ZW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFNldFlQb3NpdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGxvY2FsUG9zaXRpb246IExheWEuVmVjdG9yMyA9IHRoaXMubV9Nb2RlbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbjtcclxuICAgICAgICAgICAgbG9jYWxQb3NpdGlvbi55ID0gdGhpcy5tX09yaWdpbmFsWSArIHRoaXMubV9ZU3dpdGNoO1xyXG4gICAgICAgICAgICB0aGlzLm1fTW9kZWwudHJhbnNmb3JtLmxvY2FsUG9zaXRpb24gPSBsb2NhbFBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25TdGF0ZUVudGVyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1fWVN3aXRjaCA9IDAuNTtcclxuICAgICAgICAgICAgdGhpcy5tX09yaWdpbmFsWSA9IHRoaXMubV9Nb2RlbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbi55O1xyXG4gICAgICAgICAgICB0aGlzLlNldFlQb3NpdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvblN0YXRlRXhpdCgpIHtcclxuICAgICAgICAgICAgdGhpcy5tX1N0ZXBJdGVtLlB1dEl0ZW0oKTtcclxuICAgICAgICAgICAgdGhpcy5tX1lTd2l0Y2ggPSAwO1xyXG4gICAgICAgICAgICB0aGlzLlNldFlQb3NpdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBvblN0YXRlVXBkYXRlKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFdhdmVTdGF0ZVNjcmlwdCBleHRlbmRzIExheWEuQW5pbWF0b3JTdGF0ZVNjcmlwdCB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX01vZGVsOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIHByaXZhdGUgbV9PcmlnaW5hbFk6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1fUm91bmRUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0Rpc3RhbmNlOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0NvdW50VGltZTogbnVtYmVyO1xyXG5cclxuICAgICAgICBwcml2YXRlIG1fTW92ZURpc3RhbmNlQ291bnQ6IG51bWJlcjtcclxuXHJcbiAgICAgICAgZ2V0IENvdW50Um91bmQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIChBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgLSB0aGlzLm1fQ291bnRUaW1lKSAvIHRoaXMubV9Sb3VuZFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBUaW1lUm91bmRSYXRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHZhciB0aW1lU2NhbGUgPSAoQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lIC0gdGhpcy5tX0NvdW50VGltZSkgJSB0aGlzLm1fUm91bmRUaW1lO1xyXG4gICAgICAgICAgICB0aW1lU2NhbGUgPSAodGltZVNjYWxlIC8gdGhpcy5tX1JvdW5kVGltZSkgKiBNYXRoLlBJO1xyXG4gICAgICAgICAgICByZXR1cm4gdGltZVNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX1JvdW5kVGltZSA9IDM7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaXN0YW5jZSA9IDAuNVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgSW5pdChtb2RlbDogTGF5YS5TcHJpdGUzRCkge1xyXG4gICAgICAgICAgICB0aGlzLm1fTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICAgICAgdGhpcy5tX09yaWdpbmFsWSA9IHRoaXMubV9Nb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24ueTtcclxuICAgICAgICAgICAgdGhpcy5tX01vdmVEaXN0YW5jZUNvdW50ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgU2V0WVBvc2l0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgbG9jYWxQb3NpdGlvbjogTGF5YS5WZWN0b3IzID0gdGhpcy5tX01vZGVsLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uO1xyXG4gICAgICAgICAgICBsb2NhbFBvc2l0aW9uLnkgPSB0aGlzLm1fT3JpZ2luYWxZICsgdGhpcy5tX01vdmVEaXN0YW5jZUNvdW50O1xyXG4gICAgICAgICAgICB0aGlzLm1fTW9kZWwudHJhbnNmb3JtLmxvY2FsUG9zaXRpb24gPSBsb2NhbFBvc2l0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25TdGF0ZUVudGVyKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ291bnRUaW1lID0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25TdGF0ZUV4aXQoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvblN0YXRlVXBkYXRlKCkge1xyXG4gICAgICAgICAgICB0aGlzLm1fTW92ZURpc3RhbmNlQ291bnQgPSBNYXRoLnNpbih0aGlzLlRpbWVSb3VuZFJhdGUpICogdGhpcy5tX0Rpc3RhbmNlO1xyXG4gICAgICAgICAgICB0aGlzLlNldFlQb3NpdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi9Nb3VudExpbmVcIjtcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIjtcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0dhbWVJdGVtXCI7XHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIjtcclxuXHJcbnZhciBNb3VudHM6IG51bWJlciA9IDI7XHJcbnZhciBMaW5lU3BhY2U6IG51bWJlciA9IDI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lbWFwIGV4dGVuZHMgTGF5YS5Ob2RlIHtcclxuICAgIHByaXZhdGUgbV9IZWFkRmxvb3JJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9UYWlsRkxvb3JJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Nb3VudExpbmVzOiBNb3VudExpbmVbXTtcclxuICAgIHByaXZhdGUgbV9DdXJJZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9JdGVtUmFuZ2U6IHt9O1xyXG4gICAgcHJpdmF0ZSBtX1NhZmVMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICBwcml2YXRlIG1fQ3VyTGluZUJhcnJpZXJzOiBBcnJheTxJdGVtLkxpbmVJdGVtSW5mbz47XHJcbiAgICBwcml2YXRlIG1fQ3VyTGluZVJld2FyZHM6IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPjtcclxuICAgIHByaXZhdGUgbV9JdGVtTGF5b3V0OiBJdGVtLkl0ZW1MYXlvdXQ7XHJcblxyXG4gICAgcHJpdmF0ZSBtX3JpZ2h0U3dpdGNoQ291bnQ6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGdldCBDdXJMaW5lUmV3YXJkcygpOiBBcnJheTxJdGVtLkxpbmVJdGVtSW5mbz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fQ3VyTGluZVJld2FyZHM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldCBDdXJMaW5lQmFycmllcnMoKTogQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckxpbmVCYXJyaWVycztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0IE1vdW50TGluZXMoKTogTW91bnRMaW5lW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW91bnRMaW5lcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0IE5leHRJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5tX0N1cklkeCArIDEpICUgTW91bnRzO1xyXG4gICAgfVxyXG4gICAgZ2V0IEhlYWRGbG9vcigpOiBNb3VudExpbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW91bnRMaW5lc1t0aGlzLm1fSGVhZEZsb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBUYWlsRkxvb3IoKTogTW91bnRMaW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vdW50TGluZXNbdGhpcy5tX1RhaWxGTG9vcklkeF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnLDlm75cclxuICAgICAqIEBwYXJhbSBmbG9vck51bSDlsYLmlbBcclxuICAgICAqIEBwYXJhbSBjb2x1bW4g5YiX5pWwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGZsb29yTnVtOiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKSB7XHJcbiAgICAgICAgZmxvb3JOdW0gPSA3O1xyXG4gICAgICAgIGNvbHVtbiA9IDc7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fTW91bnRMaW5lcyA9IFtdO1xyXG4gICAgICAgIHRoaXMubV9DdXJJZHggPSAwO1xyXG4gICAgICAgIHRoaXMubV9IZWFkRmxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMubV9UYWlsRkxvb3JJZHggPSAwO1xyXG4gICAgICAgIHRoaXMubV9JdGVtTGF5b3V0ID0gbmV3IEl0ZW0uSXRlbUxheW91dCgpXHJcbiAgICAgICAgdGhpcy5tX0N1ckxpbmVCYXJyaWVycyA9IG5ldyBBcnJheTxJdGVtLkxpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLm1fQ3VyTGluZVJld2FyZHMgPSBuZXcgQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5tX3JpZ2h0U3dpdGNoQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMubV9TYWZlTG9jYXRpb24gPSBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24oLTEsIC0xKTtcclxuICAgICAgICBmb3IgKHZhciBpZHggPSAwOyBpZHggPCBmbG9vck51bTsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIG5ld01vdW50YWluID0gbmV3IE1vdW50TGluZShpZHgsIGNvbHVtbiwgaWR4KVxyXG4gICAgICAgICAgICB0aGlzLm1fTW91bnRMaW5lc1tpZHhdID0gbmV3TW91bnRhaW47XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3TW91bnRhaW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSW5pdChzdGFydEZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgbGluZXM6IE1vdW50TGluZVtdID0gdGhpcy5tX01vdW50TGluZXM7XHJcbiAgICAgICAgc3RhcnRGbG9vciA9ICghc3RhcnRGbG9vcikgJiYgKHN0YXJ0Rmxvb3IgPCAwKSAmJiAoc3RhcnRGbG9vciA+PSBsaW5lcy5sZW5ndGgpID8gMCA6IHN0YXJ0Rmxvb3I7XHJcbiAgICAgICAgdGhpcy5tX0hlYWRGbG9vcklkeCA9IGxpbmVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5tX1RhaWxGTG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX3JpZ2h0U3dpdGNoQ291bnQgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGlkeDogbnVtYmVyID0gMDsgaWR4IDwgbGluZXMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICB2YXIgbGluZTogTW91bnRMaW5lID0gbGluZXNbaWR4XTtcclxuICAgICAgICAgICAgbGluZS5TZXRMaW5lKGlkeCwgdGhpcy5Db3VudE5leHRGbG9vckRpclN3aXRoKCkpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ID4gMSlcclxuICAgICAgICAgICAgICAgIGxpbmVzW2lkeCAtIDFdLlNldE5leHRGbG9vcihsaW5lKTtcclxuICAgICAgICAgICAgaWYgKGlkeCA9PSBzdGFydEZsb29yKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgUGxheWVyU3RlcCA9IGxpbmUuR2V0U3RlcChNYXRoLmZsb29yKGxpbmUuTGVuZ3RoIC8gMikpO1xyXG4gICAgICAgICAgICAgICAgUGxheWVyU3RlcC5Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fU2FmZUxvY2F0aW9uID0gUGxheWVyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW1JbkxpbmUoaWR4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgc3RhcnRGbG9vck51bTogbnVtYmVyID0gMDsgc3RhcnRGbG9vck51bSA8IHN0YXJ0Rmxvb3I7ICsrc3RhcnRGbG9vck51bSkgIHtcclxuICAgICAgICAgICAgbGluZXNbc3RhcnRGbG9vck51bV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDb3VudE5leHRGbG9vckRpclN3aXRoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9yaWdodFN3aXRjaENvdW50O1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldE5leHRGbHBwckRpclN3aXRjaChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50ID0gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRTYWZlU3RlcCgpOiBTdGVwIHtcclxuICAgICAgICB2YXIgZmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKHRoaXMubV9TYWZlTG9jYXRpb24uWSk7XHJcbiAgICAgICAgaWYgKGZsb29yKVxyXG4gICAgICAgICAgICByZXR1cm4gZmxvb3IuR2V0U3RlcCh0aGlzLm1fU2FmZUxvY2F0aW9uLlgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQnJlYWtMaW5lKGZsb29yOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGFpbEZsb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGJyZWFrRmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICBmb3IgKHZhciBjb3VudEZsb29yOiBudW1iZXIgPSB0YWlsRmxvb3IuRmxvb3JOdW07IGNvdW50Rmxvb3IgPD0gZmxvb3I7ICsrY291bnRGbG9vcikge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGNvdW50Rmxvb3IpO1xyXG4gICAgICAgICAgICBpZighdGFyZ2V0Rmxvb3IuYnJlYWtlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0Rmxvb3IuQnJlYWsoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFRhaWxlRmxvb3IoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9ruWuieWFqOS9jee9rlxyXG4gICAgU2V0U2FmZVBTKGxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbikge1xyXG4gICAgICAgIHRoaXMubV9TYWZlTG9jYXRpb24gPSBsb2NhdGlvbjtcclxuICAgICAgICBpZiAobG9jYXRpb24uWSA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtIHx8IGxvY2F0aW9uLlkgPiB0aGlzLkhlYWRGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUmVzZXRJdGVtKGxvY2F0aW9uLlkpXHJcbiAgICB9XHJcblxyXG4gICAgLy/ku47mn5DkuIDlsYLlvIDlp4vkuIDlsYLlsYLph43mlrDmkYbmlL7pgZPlhbdcclxuICAgIFJlc2V0SXRlbShmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0N1ckxpbmVCYXJyaWVycyA9IG5ldyBBcnJheTxJdGVtLkxpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICB0aGlzLm1fQ3VyTGluZVJld2FyZHMgPSBuZXcgQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgZm9yIChsZXQgbG9vcEZsb29yOiBudW1iZXIgPSBmbG9vcjsgbG9vcEZsb29yIDw9IHRoaXMuSGVhZEZsb29yLkZsb29yTnVtOyArK2xvb3BGbG9vcikge1xyXG4gICAgICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9vcEZsb29yKTtcclxuICAgICAgICAgICAgZmxvb3JMaW5lLkxheU91dERpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGZsb29yTGluZS5TZXRMaW5lKGZsb29yTGluZS5GbG9vck51bSwgdGhpcy5Db3VudE5leHRGbG9vckRpclN3aXRoKCkpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW1JbkxpbmUobG9vcEZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lsYLmlbDojrflj5bmn5DlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgR2V0Rmxvb3JCeUZsb29yKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yOiBNb3VudExpbmUgPSB0aGlzLlRhaWxGTG9vcjtcclxuICAgICAgICBpZiAoZmxvb3IgPCB0YWlsRmxvb3IuRmxvb3JOdW0gfHwgZmxvb3IgPiB0aGlzLkhlYWRGbG9vci5GbG9vck51bSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29ySUQgPSAoZmxvb3IgLSB0YWlsRmxvb3IuRmxvb3JOdW0gKyB0aGlzLm1fVGFpbEZMb29ySWR4KSAlIHRoaXMubV9Nb3VudExpbmVzLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vdW50TGluZXNbZmxvb3JJRF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvqrnjq/orr7nva7lsYLlj7DpmLZcclxuICAgICAqIEBwYXJhbSBmbG9vciDlsYJcclxuICAgICAqIEBwYXJhbSBPd25lciBcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlvqrnjq/miafooYzlm57osINcclxuICAgICAqL1xyXG4gICAgTG9vcERvRmxvb3JTdGVwKGZsb29yOiBudW1iZXIsIE93bmVyOiBhbnksIGNhbGxCYWNrOiAoc3RlcDogU3RlcCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmbG9vciA8IHRoaXMuVGFpbEZMb29yLkZsb29yTnVtIHx8IGZsb29yID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZmxvb3JMaW5lOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgZmxvb3JMaW5lLkxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXAgPSBmbG9vckxpbmUuR2V0U3RlcChpZHgpO1xyXG4gICAgICAgICAgICBjYWxsQmFjay5jYWxsKE93bmVyLCBzdGVwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciDnianlk4HliJfooahcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIFB1dEl0ZW1JbkxpbmUoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBzYWZlQ29sOiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIHZhciBmbG9vckxpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICAgICAgLy/luIPnva7ov4fkuobkuI3nlKjlho3luIPnva7kuoZcclxuICAgICAgICBpZiAoZmxvb3JMaW5lLkxheU91dERpcnR5KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZmxvb3JMaW5lLkxheU91dERpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIGlmKGZsb29yID49IHRoaXMuX1NhZmVMb2NhdGlvbi5ZICsgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuTWF4TGluZU51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNhZmVDb2wgPSB0aGlzLl9Db3VudE9wZW5MaXN0KGZsb29yKTtcclxuICAgICAgICB9ZWxzZSovXHJcbiAgICAgICAgdmFyIHNhZmVJZHhDb2xsOiB7IFtrZXk6IG51bWJlcl06IG51bWJlcjsgfSA9IHRoaXMuQ291bnRSb2FkSW5mbyhmbG9vcik7XHJcblxyXG4gICAgICAgIC8v5Ye655Sf54K55LiN5pS+6YGT5YW3XHJcbiAgICAgICAgaWYgKGZsb29yIDwgMSB8fCBmbG9vciA9PSB0aGlzLm1fU2FmZUxvY2F0aW9uLlkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iOt+WPluivpeihjOimgeaRhuaUvueahOeJqeWTgVxyXG4gICAgICAgIHRoaXMuVGFrZUl0ZW1MaXN0KGZsb29yKVxyXG5cclxuICAgICAgICAvL+aKiumcgOimgeaUvumBk+WFt+eahOagvOWtkOaUvuWFpemaj+acuuaxoFxyXG4gICAgICAgIHZhciBjdXJGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciByYW5kb21Qb29sOiBBcnJheTxTdGVwPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8v5oqK5a6J5YWo55qE5qC85a2Q5pqC5pe256e75Ye65p2lXHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDogQXJyYXk8U3RlcD4gPSBuZXcgQXJyYXk8U3RlcD4oKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4OiBudW1iZXIgPSAwOyBzdGVwSWR4IDwgY3VyRmxvb3IuTGVuZ3RoOyArK3N0ZXBJZHgpIHtcclxuICAgICAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSBjdXJGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoc2FmZUlkeENvbGxbc3RlcElkeF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnB1c2goZ2V0U3RlcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aUvumZt+mYsVxyXG4gICAgICAgIHZhciBiYXJyaWVyc0xpc3Q6IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPiA9IHRoaXMubV9DdXJMaW5lQmFycmllcnM7XHJcbiAgICAgICAgdGhpcy5Pcmdpbml6ZVB1dEl0ZW0oYmFycmllcnNMaXN0LCByYW5kb21Qb29sLCB0cnVlKTtcclxuICAgICAgICAvL+aRhuaUvumBk+WFt1xyXG4gICAgICAgIGZvciAodmFyIHNhZmVTdGVwSWR4OiBudW1iZXIgPSAwOyBzYWZlU3RlcElkeCA8IHNhZmVTdGVwTGlzdC5sZW5ndGg7ICsrc2FmZVN0ZXBJZHgpIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKHNhZmVTdGVwTGlzdFtzYWZlU3RlcElkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmV3YXJkTGlzdCA9IHRoaXMuQ3VyTGluZVJld2FyZHM7XHJcbiAgICAgICAgdGhpcy5Pcmdpbml6ZVB1dEl0ZW0ocmV3YXJkTGlzdCwgcmFuZG9tUG9vbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TGluZUl0ZW1JbmZvPn0gaXRlbUxpc3Qg54mp5ZOB5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFN0ZXA+fSByYW5kb21Qb29sIOWPsOmYtumbhuWQiFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0RlYWRSb2FkIOaYr+WQpuaYr+atu+i3r1xyXG4gICAgICovXHJcbiAgICBPcmdpbml6ZVB1dEl0ZW0oaXRlbUxpc3Q6IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPiwgcmFuZG9tUG9vbDogQXJyYXk8U3RlcD4sIGlzRGVhZFJvYWQ6IGJvb2xlYW4gPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgZm9yICh2YXIgaXRlbUlkeDogbnVtYmVyID0gMDsgaXRlbUlkeCA8IGl0ZW1MaXN0Lmxlbmd0aDsgKytpdGVtSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOiBJdGVtLkxpbmVJdGVtSW5mbyA9IGl0ZW1MaXN0W2l0ZW1JZHhdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkaWZmaWN1bHR5TnVtOiBudW1iZXIgPSAwOyBkaWZmaWN1bHR5TnVtIDwgaW5mby5OdW1iZXI7KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tUG9vbC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+maj+acuuaKiumanOeijeaUvuWFpeagvOWtkOmHjFxyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbUlkeDogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmFuZG9tUG9vbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSByYW5kb21Qb29sW3JhbmRvbUlkeF07XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnNwbGljZShyYW5kb21JZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgc3RlcC5QdXRJdGVtKGluZm8uVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWFkUm9hZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IGlzRGVhZFJvYWQ7XHJcbiAgICAgICAgICAgICAgICAtLWluZm8uTnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyYW5kb21Qb29sLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtSWR4ID4gMCkge1xyXG4gICAgICAgICAgICBpdGVtTGlzdC5zcGxpY2UoMCwgaXRlbUlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS+6YGT5YW35YmN566X6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIENvdW50Um9hZEluZm8oZmxvb3I6IG51bWJlcik6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0ge1xyXG4gICAgICAgIHZhciBzYWZlTGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIHZhciBzYWZlTWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9ID0ge307XHJcbiAgICAgICAgdmFyIHN0ZXBOZWVkUmFuZG9tTGlzdCA9IFtdO1xyXG4gICAgICAgIHZhciBzdGVwTm9kZUNvdW50OiBBcnJheTxudW1iZXI+ID0gW11cclxuICAgICAgICB2YXIgdGhpc0Zsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcblxyXG4gICAgICAgIHZhciByb2FkTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBsYXN0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yIC0gMSk7XHJcbiAgICAgICAgaWYgKCFsYXN0Rmxvb3IpXHJcbiAgICAgICAgICAgIHJldHVybiBzYWZlTWFwO1xyXG4gICAgICAgIHZhciBzYWZlSWR4OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGlmIChmbG9vciA9PSB0aGlzLm1fU2FmZUxvY2F0aW9uLlkpIHtcclxuICAgICAgICAgICAgdGhpcy5fUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3IpO1xyXG4gICAgICAgICAgICB2YXIgc2FmZVN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcCh0aGlzLm1fU2FmZUxvY2F0aW9uLlgpO1xyXG4gICAgICAgICAgICBzYWZlU3RlcC5Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNhZmVNYXBbdGhpcy5tX1NhZmVMb2NhdGlvbi5YXSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzdGVwSWR4OiBudW1iZXIgPSAwOyBzdGVwSWR4IDwgbGFzdEZsb29yLkxlbmd0aDsgKytzdGVwSWR4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIHZhciBsZWZ0U3RlcDogU3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodFN0ZXA6IFN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRJZHg6IG51bWJlciA9IGxlZnRTdGVwID8gbGVmdFN0ZXAuSWR4IDogLTE7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHR0SWR4OiBudW1iZXIgPSByaWdodFN0ZXAgPyByaWdodFN0ZXAuSWR4IDogLTE7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVmdElkeCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcE5vZGVDb3VudFtsZWZ0SWR4XSA9IHN0ZXBOb2RlQ291bnRbbGVmdElkeF0gPyBzdGVwTm9kZUNvdW50W2xlZnRJZHhdIDogMDtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwTm9kZUNvdW50W2xlZnRJZHhdICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmlnaHR0SWR4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwTm9kZUNvdW50W3JpZ2h0dElkeF0gPSBzdGVwTm9kZUNvdW50W3JpZ2h0dElkeF0gPyBzdGVwTm9kZUNvdW50W3JpZ2h0dElkeF0gOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBOb2RlQ291bnRbcmlnaHR0SWR4XSArPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0dElkeCA+IC0xICYmIGxlZnRJZHggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBOZWVkUmFuZG9tTGlzdC5wdXNoKFtyaWdodHRJZHgsIGxlZnRJZHhdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNhZmVTdGVwSWR4OiBudW1iZXIgPSBsZWZ0SWR4ID4gMCA/IGxlZnRJZHggOiByaWdodHRJZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhZmVTdGVwSWR4IDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZU1hcFtzYWZlU3RlcElkeF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHNhZmVJZHggKz0gc2FmZVN0ZXBJZHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgY291bnRJZHg6IG51bWJlciA9IDA7IGNvdW50SWR4IDwgc3RlcE5lZWRSYW5kb21MaXN0Lmxlbmd0aDsgKytjb3VudElkeCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSBzdGVwTmVlZFJhbmRvbUxpc3RbY291bnRJZHhdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRJZHg6IG51bWJlciA9IGluZm9bMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRJZHg6IG51bWJlciA9IGluZm9bMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNhZmVNYXBbbGVmdElkeF0gJiYgIXNhZmVNYXBbcmlnaHRJZHhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYW5kID4gMC41KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVNYXBbbGVmdElkeF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYWZlSWR4ICs9IGxlZnRJZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYWZlTWFwW3JpZ2h0SWR4XSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVJZHggKz0gcmlnaHRJZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGNvdW50U3RlcE5vZGU6IG51bWJlciA9IDA7IGNvdW50U3RlcE5vZGUgPCB0aGlzRmxvb3IuTGVuZ3RoOyArK2NvdW50U3RlcE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwbnVtOiBudW1iZXIgPSBzdGVwTm9kZUNvdW50W2NvdW50U3RlcE5vZGVdO1xyXG4gICAgICAgICAgICAgICAgc3RlcG51bSA9IHN0ZXBudW0gPyBzdGVwbnVtIDogMDtcclxuICAgICAgICAgICAgICAgIGlmIChzdGVwbnVtIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gbGFzdEZsb29yLkdldFN0ZXAoY291bnRTdGVwTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2FmZU1hcDtcclxuICAgIH1cclxuXHJcbiAgICBfUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3I6IE1vdW50TGluZSkge1xyXG4gICAgICAgIGlmICghdGhpc0Zsb29yKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgbG9naWNJZHg6IG51bWJlciA9IDA7IGxvZ2ljSWR4IDwgdGhpc0Zsb29yLkxlbmd0aDsgKytsb2dpY0lkeCkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmn5DpgZPlhbfkv6Hmga9cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfWZsb29yIFxyXG4gICAgICovXHJcbiAgICBUYWtlSXRlbUxpc3QoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBsaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciBpdGVtTGlzdCA9IG5ldyBBcnJheShsaW5lLkxlbmd0aCk7XHJcbiAgICAgICAgdmFyIGxpbmVSZXdhcmRzID0gdGhpcy5tX0l0ZW1MYXlvdXQuVGFrZUxpbmVSZXdhcmQoZmxvb3IpO1xyXG4gICAgICAgIHRoaXMubV9DdXJMaW5lUmV3YXJkcyA9IHRoaXMubV9DdXJMaW5lUmV3YXJkcy5jb25jYXQobGluZVJld2FyZHMpO1xyXG4gICAgICAgIGlmICh0aGlzLm1fU2FmZUxvY2F0aW9uLlkgPiBmbG9vciB8fCBmbG9vciA+IHRoaXMubV9TYWZlTG9jYXRpb24uWSArIDEpIHtcclxuICAgICAgICAgICAgdmFyIGxpbmVCYXJyaWVycyA9IHRoaXMubV9JdGVtTGF5b3V0LlRha2VMaW5lRGlmZmljdWx0eShmbG9vcik7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJMaW5lQmFycmllcnMgPSB0aGlzLm1fQ3VyTGluZUJhcnJpZXJzLmNvbmNhdChsaW5lQmFycmllcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9DdXJMaW5lQmFycmllcnMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMubV9DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5bGC5ZCR5LiK5Y+gXHJcbiAgICBwdWJsaWMgUHVzaEZMb29yKGRpcjogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHZhciBwcmVIZWFkOiBNb3VudExpbmUgPSB0aGlzLkhlYWRGbG9vcjtcclxuICAgICAgICB0aGlzLm1fSGVhZEZsb29ySWR4ID0gKHRoaXMubV9IZWFkRmxvb3JJZHggKyAxKSAlIHRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5tX1RhaWxGTG9vcklkeCA9ICh0aGlzLm1fVGFpbEZMb29ySWR4ICsgMSkgJSB0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBIZWFkZmxvb3I6IG51bWJlciA9IHByZUhlYWQuRmxvb3JOdW0gKyAxO1xyXG4gICAgICAgIHRoaXMuQWRkU3dpdGNoKGRpcik7XHJcbiAgICAgICAgdGhpcy5IZWFkRmxvb3IuU2V0TGluZShIZWFkZmxvb3IsIHRoaXMuQ291bnROZXh0Rmxvb3JEaXJTd2l0aCgpKTtcclxuICAgICAgICBwcmVIZWFkLlNldE5leHRGbG9vcih0aGlzLkhlYWRGbG9vcik7XHJcbiAgICAgICAgdGhpcy5QdXRJdGVtSW5MaW5lKEhlYWRmbG9vcik7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRTd2l0Y2goZGlyOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgaWYgKGRpciA+IDAuMDEpXHJcbiAgICAgICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50ICs9IDE7XHJcbiAgICAgICAgZWxzZSBpZiAoZGlyIDwgLTAuMDEpXHJcbiAgICAgICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50IC09IDE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0ZXBJbmZvIHtcclxuICAgIHBhcmVudElEOiBudW1iZXI7XHJcblxyXG59IiwiZXhwb3J0IG1vZHVsZSBHYW1lTW9kdWxlXHJcbntcclxuICAgIGV4cG9ydCBjbGFzcyBFdmVudFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgT25DaGFyYWN0ZXJJdGVtQ2hhbmdlOnN0cmluZyA9IFwiT25DaGFyYWN0ZXJJdGVtQ2hhbmdlXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPblRpbWVQYXVzZTpzdHJpbmcgPSBcIk9uVGltZVBhdXNlXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPblRpbWVDb250aW51ZTpzdHJpbmcgPSBcIk9uVGltZUNvbnRpbnVlXCI7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgdmFyIEhTcGFjZTpudW1iZXIgPSAzO1xyXG4gICAgZXhwb3J0IHZhciBWU3BhY2U6bnVtYmVyID0gMi41O1xyXG4gICAgZXhwb3J0IHZhciBEU3BhY2U6bnVtYmVyID0gMC43NTtcclxufSIsImV4cG9ydCBtb2R1bGUgR2FtZVN0cnVjdFxyXG57XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0SW5mbyB7XHJcbiAgICAgICAgQXVkaW9PbjogYm9vbGVhbjtcclxuICAgICAgICBPUElzUmlnaHQ6IGJvb2xlYW47XHJcbiAgICAgICAgVGV4dEluZm86IHN0cmluZztcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5BdWRpb09uID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5PUElzUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLlRleHRJbmZvID0gXCJIZWxsbyBcXG4gSGVsbG9cIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgTUxvY2F0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgZ2V0IFgoKTpudW1iZXJcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9BcnJbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldCBYKHg6bnVtYmVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyWzBdID14O1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgWSgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0FyclsxXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFkoeTpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnJbMV0gPSB5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9BcnI6QXJyYXk8bnVtYmVyPjtcclxuICAgICAgICBjb25zdHJ1Y3RvciggeDpudW1iZXIseTpudW1iZXIgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fQXJyID0gW3gseV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IHZhciBJdGVtRGljdFR5cGU6e1tJdGVtVHlwZTpudW1iZXJdOmFueX07XHJcbiAgICBJdGVtRGljdFR5cGUgPSB7IH07XHJcbn0iLCIvKirkvZzogIU6TW9cclxuICog6L6T5YWl566h55CG55u45YWzXHJcbiAqL1xyXG5pbXBvcnQgR2FtZVNjZW5lUGxheSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheVwiXHJcbmV4cG9ydCBtb2R1bGUgSW5wdXQge1xyXG4gICAgLy/ln7rnoYDovpPlhaXmjqfliLblmahcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlR2FtZUlucHV0IHtcclxuICAgICAgICAvL+WFrOaciVxyXG4gICAgICAgIE5leHRJbnB1dDogQmFzZUdhbWVJbnB1dDtcclxuICAgICAgICBhYnN0cmFjdCBJbnB1dChpc1JpZ2h0OiBib29sZWFuKTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoaW5wdXQ6IEJhc2VHYW1lSW5wdXQgPSBudWxsKSAge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk5leHRJbnB1dCA9IGlucHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAgeyB9XHJcbiAgICAgICAgQ2xlYXIoKSB7IH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgRElZSW5wdXQgZXh0ZW5kcyBCYXNlR2FtZUlucHV0IHtcclxuICAgICAgICBJbnB1dChpc1JpZ2h0OiBib29sZWFuKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fTGlzdGVuZXIpXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9MaXN0ZW5lci5jYWxsKHRoaXMuX093bmVyLCBpc1JpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBfT3duZXI6IGFueTtcclxuICAgICAgICBwcml2YXRlIF9MaXN0ZW5lcjogKGlzcmluZzogYm9vbGVhbikgPT4gdm9pZDtcclxuICAgICAgICBjb25zdHJ1Y3Rvcihvd25lcjogYW55ID0gbnVsbCwgbGlzdGVuZXI6IChpc3Jpbmc6IGJvb2xlYW4pID0+IHZvaWQgPSBudWxsKSAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9Pd25lciA9IG93bmVyO1xyXG4gICAgICAgICAgICB0aGlzLl9MaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBOb3JtR2FtZUlucHV0IGV4dGVuZHMgQmFzZUdhbWVJbnB1dCB7XHJcbiAgICAgICAgR2FtZURpcjogR2FtZVNjZW5lUGxheTtcclxuICAgICAgICBfRGlydHk6IGJvb2xlYW47XHJcbiAgICAgICAgX0lzUmlnaHQ6IGJvb2xlYW47XHJcbiAgICAgICAgY29uc3RydWN0b3IoZGlyOiBHYW1lU2NlbmVQbGF5LCBpbnB1dDogQmFzZUdhbWVJbnB1dCA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKGlucHV0KTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lRGlyID0gZGlyO1xyXG4gICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9Jc1JpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIElucHV0KGlzUmlnaHQ6IGJvb2xlYW4pICB7XHJcbiAgICAgICAgICAgIC8vdGhpcy5HYW1lRGlyLk1vdmVTdGVwKGlzUmlnaHQpO1xyXG4gICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX0lzUmlnaHQgPSBpc1JpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSAge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fRGlydHkgJiYgdGhpcy5HYW1lRGlyLlBsYXllci5CYXNlQ3RybGVyLklzRmFsbGluZykgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkdhbWVEaXIuTW92ZVN0ZXAodGhpcy5fSXNSaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgQ2xlYXIoKSAge1xyXG4gICAgICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi9HYW1lTW9kdWxlXCI7XHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG52YXIgVlNwYWNlOiBudW1iZXI7XHJcbnZhciBEU3BhY2U6IG51bWJlcjtcclxuLyoq5L2c6ICFOk1vXHJcbirlnLrmma/lhoXlr7nosaEgXHJcbiovXHJcbi8v566h55CG5LiA5pW06KGMXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vdW50TGluZSBleHRlbmRzIExheWEuU3ByaXRlM0Qge1xyXG4gICAgcHJpdmF0ZSBtX1JpZ2h0U3dpdGNoOiBudW1iZXI7XHJcbiAgICBtX1N0ZXBMaXN0OiBTdGVwW107XHJcblxyXG4gICAgTGF5T3V0RGlydHk6IGJvb2xlYW47XHJcbiAgICBMaW5lSWR4OiBudW1iZXI7XHJcbiAgICBGbG9vck51bTogbnVtYmVyO1xyXG4gICAgU3RlcEl0ZW06IFN0ZXBJdGVtO1xyXG4gICAgT2RkU3dpdGNoOiBudW1iZXI7XHJcbiAgICBicmVha2VkOmJvb2xlYW47XHJcbiAgICBnZXQgcmlnaHRTd2l0Y2goKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1JpZ2h0U3dpdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0IFBvc2l0aW9uKG5ld1BTOiBMYXlhLlZlY3RvcjMpIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXQgUG9zaXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9TdGVwTGlzdC5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IobGluZUlkeDogbnVtYmVyLCBDb2x1bWI6IG51bWJlciwgZmxvb3I6IG51bWJlciA9IDApIHtcclxuICAgICAgICBWU3BhY2UgPSBHYW1lTW9kdWxlLlZTcGFjZTtcclxuICAgICAgICBEU3BhY2UgPSBHYW1lTW9kdWxlLkRTcGFjZTtcclxuICAgICAgICB2YXIgY29sdW1uczogbnVtYmVyID0gQ29sdW1iO1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1JpZ2h0U3dpdGNoID0gMDtcclxuICAgICAgICB0aGlzLkxpbmVJZHggPSBsaW5lSWR4O1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB0aGlzLm1fU3RlcExpc3QgPSBbXTtcclxuICAgICAgICB2YXIgc3RhcnRYOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIFN0YXJ0SWR4OiBudW1iZXIgPSAwOyBTdGFydElkeCA8IGNvbHVtbnM7ICsrU3RhcnRJZHgpIHtcclxuICAgICAgICAgICAgdmFyIG5ld1N0ZXA6IFN0ZXAgPSBuZXcgU3RlcCh0aGlzLCBTdGFydElkeCk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQobmV3U3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9TdGVwTGlzdFtTdGFydElkeF0gPSBuZXdTdGVwO1xyXG4gICAgICAgICAgICB2YXIgc3RlcFZlY3RvciA9IG5ld1N0ZXAucG9zaXRpb247XHJcbiAgICAgICAgICAgIHN0ZXBWZWN0b3IueCA9IHN0YXJ0WDtcclxuICAgICAgICAgICAgc3RhcnRYICs9IEdhbWVNb2R1bGUuSFNwYWNlO1xyXG4gICAgICAgICAgICBuZXdTdGVwLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHN0ZXBWZWN0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K6+6I635Y+W5pi+56S65Ye65p2l55qE56ys5Yeg5Liq5bmz5Y+wXHJcbiAgICBHZXRTdGVwKGlkeDogbnVtYmVyKTogU3RlcCB7XHJcbiAgICAgICAgaWYgKGlkeCA8IDAgfHwgaWR4ID49IHRoaXMubV9TdGVwTGlzdC5sZW5ndGgpXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fU3RlcExpc3RbaWR4XTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9ruavj+WxglxyXG4gICAgU2V0TGluZShmbG9vcjogbnVtYmVyLCByaWdodFN3aXRjaDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5icmVha2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX1JpZ2h0U3dpdGNoID0gcmlnaHRTd2l0Y2g7XHJcbiAgICAgICAgdGhpcy5PZGRTd2l0Y2ggPSAwO1xyXG4gICAgICAgIHRoaXMuTGF5T3V0RGlydHkgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5GbG9vck51bSA9IGZsb29yO1xyXG4gICAgICAgIHZhciBuZXdQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgIG5ld1BTLnkgPSBWU3BhY2UgKiBmbG9vcjtcclxuICAgICAgICBuZXdQUy56ID0gLURTcGFjZSAqIGZsb29yO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICAgICAgZm9yICh2YXIgc3RhcnRJZHg6IG51bWJlciA9IDA7IHN0YXJ0SWR4IDwgdGhpcy5tX1N0ZXBMaXN0Lmxlbmd0aDsgKytzdGFydElkeCkge1xyXG4gICAgICAgICAgICB2YXIgdGhpU3RlcCA9IHRoaXMuR2V0U3RlcChzdGFydElkeCk7XHJcbiAgICAgICAgICAgIHRoaVN0ZXAuUmVzZXRTdGVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5Yik5pat5piv5ZCm5pS257yp55qE6YKj5bGCXHJcbiAgICBKdWdJc09kZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5GbG9vck51bSAlIDIgIT0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvL+Wwhuavj+S4quiKgueCuemTvuaOpeWIsOS4i+S4gOWxglxyXG4gICAgU2V0TmV4dEZsb29yKGxhc3RGbG9vcjogTW91bnRMaW5lKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGRpc3RhbmNlOiBudW1iZXIgPSBNYXRoLmNlaWwobGFzdEZsb29yLnJpZ2h0U3dpdGNoIC8gMikgLSBNYXRoLmNlaWwodGhpcy5yaWdodFN3aXRjaCAvIDIpO1xyXG4gICAgICAgIHZhciBvZGRTd2l0Y2g6IG51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uOiBMYXlhLlZlY3RvcjMgPSBsYXN0Rmxvb3IuUG9zaXRpb247XHJcblxyXG4gICAgICAgIGlmICh0aGlzLkp1Z0lzT2RkKCkpIHtcclxuICAgICAgICAgICAgb2RkU3dpdGNoID0gLTE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgb2RkU3dpdGNoID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcG9zaXRpb24ueCA9IE1hdGguY2VpbChsYXN0Rmxvb3IucmlnaHRTd2l0Y2ggLyAyKSAqIEdhbWVNb2R1bGUuSFNwYWNlICsgb2RkU3dpdGNoICogR2FtZU1vZHVsZS5IU3BhY2UgLyAyO1xyXG4gICAgICAgIGxhc3RGbG9vci5PZGRTd2l0Y2ggPSBvZGRTd2l0Y2hcclxuICAgICAgICBsYXN0Rmxvb3IuUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICAvL+WIpOaWreaYr+WQpuacieS4pOWktOerr+eCuVxyXG4gICAgICAgIGZvciAodmFyIHN0YXJ0SWR4OiBudW1iZXIgPSAwOyBzdGFydElkeCA8IHRoaXMubV9TdGVwTGlzdC5sZW5ndGg7ICsrc3RhcnRJZHgpIHtcclxuICAgICAgICAgICAgdmFyIGxlZnRQYXJlbnQ6IFN0ZXAgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgcmlnaHRQYXJlbnQ6IFN0ZXAgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgbGVmdFBhcmVudElkeDogbnVtYmVyID0gc3RhcnRJZHggLSBkaXN0YW5jZSAtICgxICsgb2RkU3dpdGNoKTtcclxuXHJcbiAgICAgICAgICAgIGxlZnRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChsZWZ0UGFyZW50SWR4KTtcclxuICAgICAgICAgICAgcmlnaHRQYXJlbnQgPSBsYXN0Rmxvb3IuR2V0U3RlcChsZWZ0UGFyZW50SWR4ICsgMSk7XHJcbiAgICAgICAgICAgIHZhciB0aGlTdGVwID0gdGhpcy5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgdGhpU3RlcC5MZWZ0UGFyZW50ID0gbGVmdFBhcmVudDtcclxuICAgICAgICAgICAgbGVmdFBhcmVudCAmJiAobGVmdFBhcmVudC5SaWdodENoaWxkID0gdGhpU3RlcCk7XHJcbiAgICAgICAgICAgIHRoaVN0ZXAuUmlnaHRQYXJlbnQgPSByaWdodFBhcmVudDtcclxuICAgICAgICAgICAgcmlnaHRQYXJlbnQgJiYgKHJpZ2h0UGFyZW50LkxlZnRDaGlsZCA9IHRoaVN0ZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+aVsueijuS4gOWxglxyXG4gICAgQnJlYWsoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5icmVha2VkID0gdHJ1ZTtcclxuICAgICAgICB2YXIgc3RlcExpc3Q6IEFycmF5PFN0ZXA+ID0gdGhpcy5tX1N0ZXBMaXN0O1xyXG4gICAgICAgIGZvciAodmFyIGlkeDogbnVtYmVyID0gMDsgaWR4IDwgc3RlcExpc3QubGVuZ3RoOyArK2lkeCkgIHtcclxuICAgICAgICAgICAgdmFyIHRoaXNTdGVwOlN0ZXAgPSBzdGVwTGlzdFtpZHhdO1xyXG4gICAgICAgICAgICB0aGlzU3RlcC5CcmVhaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ29udGludWUoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIFBhdXNlKCkge1xyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgX1NldGVkOiBib29sZWFuO1xyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgUGxheWVyQ29udHJvbGVyIH0gZnJvbSBcIi4vUGxheWVyQ3RybGVyXCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL0dhbWVJdGVtXCJcclxuaW1wb3J0IHsgQ2hhcmFjdGVyIH0gZnJvbSBcIi4vQ2hhcmFjdGVyXCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIlxyXG5pbXBvcnQgQ2hhcmFjdGVyTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvQ2hhcmFjdGVyTWFtYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vR2FtZU1vZHVsZVwiO1xyXG5pbXBvcnQgQ2hhcmFjdG9yQW5pbWF0b3IgZnJvbSBcIi4vQ2hhcmFjdGVyQW5pbWF0b3JcIjtcclxudmFyIG51bTogbnVtYmVyID0gMDtcclxuLy/or6XohJrmnKznlKjkuo7muLjmiI/njqnlrrblr7nosaHnrqHnkIZcclxuLy/njqnlrrblr7nosaFcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgTGF5YS5TcHJpdGUzRCB7XHJcbiAgICAvL+engeacieWxnuaAp1xyXG4gICAgcHJpdmF0ZSBtX0lkeDogbnVtYmVyO1xyXG4gICAgbV9Mb2dpY1Bvc2l0aW9uOiBMYXlhLlZlY3RvcjM7XHJcbiAgICBwcml2YXRlIF9CdWZmTm9kZTogTGF5YS5TcHJpdGUzRDtcclxuICAgIHByaXZhdGUgbV9QbGF5ZXJNb2RlbDogTGF5YS5TcHJpdGUzRDtcclxuICAgIHByaXZhdGUgX0N1clN0ZXA6IFN0ZXA7XHJcbiAgICBwcml2YXRlIF9DdHJsZXI6IFBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyO1xyXG4gICAgcHJpdmF0ZSBtX0FuaW1hdG9yOiBMYXlhLkFuaW1hdG9yO1xyXG4gICAgcHJpdmF0ZSBtX1BsYXllckNoYXJhY3RlcjogUGxheWVyQW5pbWF0b3I7XHJcbiAgICBwcml2YXRlIG1fQnVmZk1vZGVsOiB7IFtuYW1lOiBudW1iZXJdOiBMYXlhLlNwcml0ZTNEIH1cclxuICAgIHByaXZhdGUgbV9TdGF0ZU1hcDoge31cclxuICAgIHByaXZhdGUgbV9QYXJlbnQ6IExheWEuU3ByaXRlM0Q7XHJcblxyXG4gICAgcHVibGljIEJhc2VDdHJsZXI6IFBsYXllckNvbnRyb2xlci5QbGF5ZXJOb3JtQ3RybGVyO1xyXG4gICAgcHVibGljIEJ1ZmZBcnI6IEFycmF5PEl0ZW0uQmFzZVBsYXllckJ1ZmY+O1xyXG4gICAgcHVibGljIElkTnVtYmVyOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgUGxheWVyRGVhdGg6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgTG9ja2VkOmJvb2xlYW47XHJcblxyXG4gICAgc2V0IEN1clN0ZXAoc3RlcDogU3RlcCkge1xyXG4gICAgICAgIHRoaXMuX0N1clN0ZXAgPSBzdGVwO1xyXG4gICAgfVxyXG4gICAgZ2V0IEN1clN0ZXAoKTogU3RlcCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0N1clN0ZXA7XHJcbiAgICB9XHJcbiAgICBzZXQgUG9zaXRpb24obmV3UFM6IExheWEuVmVjdG9yMykge1xyXG4gICAgICAgIHZhciBuZXdQUzogTGF5YS5WZWN0b3IzID0gbmV3UFMuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLm1fUGFyZW50LnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBvc2l0aW9uKCk6IExheWEuVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QYXJlbnQudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9naWNQb3NpdGlvbigpOiBMYXlhLlZlY3RvcjMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTG9naWNQb3NpdGlvbjtcclxuICAgIH1cclxuICAgIGdldCBwbGF5ZXJNb2RlbCgpOiBMYXlhLlNwcml0ZTNEIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllck1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gXCJQbGF5ZXJcIjtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsID0ge307XHJcbiAgICAgICAgdGhpcy5tX1BhcmVudCA9IG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICAgICAgdGhpcy5tX1BhcmVudC5uYW1lID0gXCJQbGF5ZXJQYXJlbnRcIjtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLm1fUGFyZW50KTtcclxuICAgICAgICB0aGlzLm1fUGFyZW50LmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uID0gbmV3IExheWEuUXVhdGVybmlvbigpO1xyXG4gICAgICAgIC8v5re75Yqg6Ieq5a6a5LmJ5qih5Z6LXHJcbiAgICAgICAgdGhpcy5tX1BhcmVudC5vbihMYXlhLkV2ZW50LlJFTU9WRUQsIHRoaXMsICgpID0+IHsgdGhpcy5kZXN0cm95KCkgfSlcclxuICAgICAgICB2YXIgbWdyOiBDaGFyYWN0ZXJNYW5hZ2VyID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3I7XHJcbiAgICAgICAgdGhpcy5tX0lkeCA9IG51bTtcclxuICAgICAgICArK251bVxyXG4gICAgfVxyXG4gICAgcHVibGljIFBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcih0aGlzLCB0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5zcGVlZCA9IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQ29udGludWUoKSB7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5fVXBkYXRlKTtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3Iuc3BlZWQgPSAxO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtX0hlYWROb2RlOiBMYXlhLlNwcml0ZTNEO1xyXG5cclxuICAgIHByaXZhdGUgSW5pdEJVZmZNb2RlbChwbGF5ZXJNb2RlbDogTGF5YS5TcHJpdGUzRCkge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJNb2RlbCA9IHBsYXllck1vZGVsO1xyXG4gICAgICAgIHRoaXMubV9IZWFkTm9kZSA9IG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICAgICAgdmFyIEhlYWROb2RlOiBMYXlhLlNwcml0ZTNEID0gcGxheWVyTW9kZWwuZ2V0Q2hpbGRCeU5hbWUoXCJoZWFkXCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLm1fSGVhZE5vZGUpO1xyXG4gICAgICAgIHRoaXMubV9IZWFkTm9kZS50cmFuc2Zvcm0ucG9zaXRpb24gPSBIZWFkTm9kZS50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB0aGlzLm1fSGVhZE5vZGUudHJhbnNmb3JtLnJvdGF0aW9uID0gSGVhZE5vZGUudHJhbnNmb3JtLnJvdGF0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5tX0hlYWROb2RlLnRyYW5zZm9ybS5zY2FsZSA9IEhlYWROb2RlLnRyYW5zZm9ybS5zY2FsZS5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMuU2V0TW9kZWwoXCJpdGVtX2ZseWVyXzAxXCIsIFwiUl9oYW5kXCIsIHBsYXllck1vZGVsLCBJdGVtLkl0ZW1UeXBlLkZseSk7XHJcbiAgICAgICAgdGhpcy5TZXRNb2RlbChcIml0ZW1fc2hpZWxkXzAxXCIsIFwiaGVhZFwiLCBwbGF5ZXJNb2RlbCwgSXRlbS5JdGVtVHlwZS5Qcm90ZWN0KTtcclxuICAgICAgICB0aGlzLlNldE1vZGVsKFwiaXRlbV91bnRvdWNoYWJsZV8wMVwiLCBcImhlYWRcIiwgcGxheWVyTW9kZWwsIEl0ZW0uSXRlbVR5cGUuSG9seVByb3RlY3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0TW9kZWwocmVzb3VyY2VOYW1lOiBzdHJpbmcsIG5vZGVOYW1lOiBzdHJpbmcsIHBsYXllck1vZGVsOiBMYXlhLlNwcml0ZTNELCBpdGVtVHlwZTogSXRlbS5JdGVtVHlwZSkge1xyXG4gICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldExIKHJlc291cmNlTmFtZSkpO1xyXG4gICAgICAgIHZhciBidWZmTW9kZWw6IExheWEuU3ByaXRlM0QgPSBtb2RlbC5jbG9uZSgpO1xyXG5cclxuICAgICAgICBwbGF5ZXJNb2RlbC5nZXRDaGlsZEF0KDApLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgc3dpdGNoIChub2RlTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVhZFwiOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0hlYWROb2RlLmFkZENoaWxkKGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9BbmltYXRvci5saW5rU3ByaXRlM0RUb0F2YXRhck5vZGUobm9kZU5hbWUsIGJ1ZmZNb2RlbCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJ1ZmZNb2RlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm1fQnVmZk1vZGVsW2l0ZW1UeXBlXSA9IGJ1ZmZNb2RlbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgRmFjZU1vZGVsVG8ocm90YXRpb246IExheWEuUXVhdGVybmlvbikge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJNb2RlbC50cmFuc2Zvcm0ucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBNb2RlbFJvdGF0ZUV1bGFyKHZlY3RvcjogTGF5YS5WZWN0b3IzKSB7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllck1vZGVsLnRyYW5zZm9ybS5yb3RhdGlvbkV1bGVyID0gdmVjdG9yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTZXRQbGF5ZXJNb2RlbChtb2RlbDogTGF5YS5TcHJpdGUzRCkge1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobW9kZWwpO1xyXG4gICAgICAgIHRoaXMubV9QYXJlbnQudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCksIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gbW9kZWwuZ2V0Q2hpbGRBdCgwKS5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcik7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckNoYXJhY3RlciA9IG5ldyBQbGF5ZXJBbmltYXRvcih0aGlzLm1fQW5pbWF0b3IsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJDaGFyYWN0ZXIuSW5pdCgpO1xyXG5cclxuICAgICAgICB2YXIgbGF5ZXI6IExheWEuTWFwTGF5ZXIgPSB0aGlzLm1fQW5pbWF0b3IuZ2V0Q29udHJvbGxlckxheWVyKCkuX3N0YXRlc01hcDtcclxuICAgICAgICB0aGlzLm1fU3RhdGVNYXAgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5tX1N0YXRlTWFwW2tleV0gPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkluaXRCVWZmTW9kZWwobW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIFJlc2V0KCkge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J1ZmZOb2RlKVxyXG4gICAgICAgICAgICB0aGlzLl9CdWZmTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5fQnVmZk5vZGUgPSBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fQnVmZk5vZGUpO1xyXG4gICAgICAgIHRoaXMuQnVmZkFyciA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIHRoaXMuQmFzZUN0cmxlciA9IG5ldyBQbGF5ZXJDb250cm9sZXIuUGxheWVyTm9ybUN0cmxlcih0aGlzKTtcclxuICAgICAgICB0aGlzLl9DdHJsZXIgPSB0aGlzLkJhc2VDdHJsZXI7XHJcbiAgICAgICAgdGhpcy5tX0xvZ2ljUG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDApO1xyXG4gICAgICAgIHRoaXMuZnJhbWVMb29wKDEsIHRoaXMsIHRoaXMuX1VwZGF0ZSk7XHJcbiAgICAgICAgdmFyIGRlZmF1bHRBbmltU3RhdGU6IExheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMubV9BbmltYXRvci5nZXREZWZhdWx0U3RhdGUoKTtcclxuICAgICAgICB2YXIgc3RhdGVOYW1lOiBzdHJpbmcgPSBkZWZhdWx0QW5pbVN0YXRlLm5hbWU7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoc3RhdGVOYW1lKTtcclxuICAgICAgICB0aGlzLkxvY2tlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W546p5a62QlVGRlxyXG4gICAgICogQHBhcmFtIGlkeCDmp73kvY3mo4Dmn6VcclxuICAgICAqIEByZXR1cm5zIOepuuihqOekuuayoeaciVxyXG4gICAgICovXHJcbiAgICBHZXRCdWZmKGlkeDogbnVtYmVyKTogSXRlbS5CYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLkJ1ZmZBcnJbaWR4XSAhPSBudWxsICYmIHRoaXMuQnVmZkFycltpZHhdICE9IHVuZGVmaW5lZCkgPyB0aGlzLkJ1ZmZBcnJbaWR4XSA6IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqBCVUZGXHJcbiAgICAgKiBAcGFyYW0gYnVmZiBcclxuICAgICAqL1xyXG4gICAgQWRkQnVmZihidWZmOiBJdGVtLkJhc2VQbGF5ZXJCdWZmKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIHNsb3Q6IG51bWJlciA9IGJ1ZmYuU2xvdDtcclxuICAgICAgICBpZiAodGhpcy5CdWZmQXJyW3Nsb3RdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQ29tcGxldGVCdWZmKHNsb3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGJ1ZmZNb2RlbDogTGF5YS5TcHJpdGUzRCA9IHRoaXMubV9CdWZmTW9kZWxbYnVmZi5UeXBlXTtcclxuICAgICAgICBpZiAoYnVmZk1vZGVsKSB7XHJcbiAgICAgICAgICAgIGJ1ZmZNb2RlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5CdWZmQXJyW3Nsb3RdID0gYnVmZjtcclxuICAgICAgICBidWZmLlN0YXJ0KCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnu5PmnZ9CVUZGXHJcbiAgICAgKi9cclxuICAgIENvbXBsZXRlQnVmZihzbG90OiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgYnVmZjogSXRlbS5CYXNlUGxheWVyQnVmZiA9IHRoaXMuQnVmZkFycltzbG90XTtcclxuICAgICAgICB2YXIgYnVmZk1vZGVsOiBMYXlhLlNwcml0ZTNEID0gdGhpcy5tX0J1ZmZNb2RlbFtidWZmLlR5cGVdO1xyXG4gICAgICAgIGlmIChidWZmTW9kZWwpIGJ1ZmZNb2RlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkJ1ZmZBcnJbc2xvdF0gPSBudWxsO1xyXG4gICAgICAgIGlmIChidWZmID09IG51bGwgfHwgYnVmZiA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBidWZmLlJlbW92ZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aRhuaUvuinkuiJslxyXG4gICAgU2V0U3RlcChwdXRTdGVwOiBTdGVwKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gcHV0U3RlcDtcclxuICAgICAgICB2YXIgbmV3UFMgPSBwdXRTdGVwLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgbmV3UFMueSArPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgIHRoaXMuUG9zaXRpb24gPSBuZXdQUztcclxuICAgICAgICB0aGlzLm1fTG9naWNQb3NpdGlvbiA9IHB1dFN0ZXAucG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5TdGFuZCkpO1xyXG4gICAgICAgIGlmICgodGhpcy5DdXJTdGVwLlN0ZXBJdGVtLkl0ZW1UeXBlID09IEl0ZW0uSXRlbVR5cGUuTm9uZSkgJiYgKHRoaXMuQ3VyU3RlcC5Jc0VtcHR5IHx8ICh0aGlzLkN1clN0ZXAuTGVmdFBhcmVudCAmJiB0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQgJiYgdGhpcy5DdXJTdGVwLkxlZnRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbiAmJiB0aGlzLkN1clN0ZXAuUmlnaHRQYXJlbnQuU3RlcEl0ZW0uSXNGb3JiaWRlbikpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuRmFsbERvd25JbWQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkN1clN0ZXAuU3RhbmRPbkdyb3VuZCh0aGlzKVxyXG4gICAgICAgIHRoaXMuVG91Y2hHcm91bmQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW4g+WxgOW9k+WJjeWxguS9huS4jeenu+WKqFxyXG4gICAgICogQHBhcmFtIHtTdGVwfSBzdGVwIOS4i+S4gOatpeWPsOmYtlxyXG4gICAgICovXHJcbiAgICBMYXlTdGVwKHN0ZXA6IFN0ZXApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBzdGVwO1xyXG4gICAgICAgIHRoaXMubV9Mb2dpY1Bvc2l0aW9uID0gc3RlcC5wb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBTdGFydE1vdmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5KdW1wKSk7XHJcbiAgICAgICAgdGhpcy5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEp1bXBEb3duKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uSnVtcGRvd24pKTtcclxuICAgIH1cclxuXHJcbiAgICBGbHkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5GbHkpKTtcclxuICAgIH1cclxuICAgIERpZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLkxvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoXCJkaWVcIik7XHJcbiAgICB9XHJcbiAgICBGYWxsRG93bigpOiB2b2lkICB7XHJcbiAgICAgICAgdGhpcy5Mb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuUmVzZXRQYXJlbmV0KCk7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnBsYXkoQ2hhcmFjdGVyLlBsYXllckFuaW1OYW1lKENoYXJhY3Rlci5BbmltRW51bS5GYWxsKSk7XHJcbiAgICB9XHJcbiAgICBGYWxsRG93bkltZCgpOiB2b2lkICB7XHJcbiAgICAgICAgdGhpcy5Mb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KFwiZmFsbERvd25JbWRcIilcclxuICAgIH1cclxuXHJcbiAgICAvL+inpuWPkeWPsOmYtlxyXG4gICAgVG91Y2hHcm91bmQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyRGVhdGggfHwgIXRoaXMuQ3VyU3RlcCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ3VyU3RlcC5Ub3VjaEdyb3VuZCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOenu+WKqFxyXG4gICAgICogQHBhcmFtIHtMYXlhLlZlY3RvcjN9IHZlY3RvciDnp7vliqjlkJHph4/lgLxcclxuICAgICAqL1xyXG4gICAgVHJhbnNsYXRlKHZlY3RvcjogTGF5YS5WZWN0b3IzKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX1BhcmVudC50cmFuc2Zvcm0udHJhbnNsYXRlKHZlY3RvciwgZmFsc2UpO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5hZGQodGhpcy5tX0xvZ2ljUG9zaXRpb24sIHZlY3RvciwgdGhpcy5tX0xvZ2ljUG9zaXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg546p5a625o6n5Yi25ZmoXHJcbiAgICAgKiBAcGFyYW0gbmV3Q3RybGVyIOaWsOeOqeWutuaOp+WItuWZqFxyXG4gICAgICovXHJcbiAgICBBZGRDdHJsZXIobmV3Q3RybGVyOiBQbGF5ZXJDb250cm9sZXIuQmFzZVBsYXllckN0cmxlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9DdHJsZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0N0cmxlci5PbkNvbXBsZXRlKCk7XHJcbiAgICAgICAgdmFyIGN0cmxlcjogUGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXIgPSB0aGlzLl9DdHJsZXI7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyID0gbmV3Q3RybGVyO1xyXG4gICAgICAgIG5ld0N0cmxlci5OZXh0Q3RybCA9IGN0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuU2V0UGxheWVyKHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLl9DdHJsZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0N0cmxlci5PblN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vkuqTmjqfliLblmahcclxuICAgICAqL1xyXG4gICAgUG9wQ3RybGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9DdHJsZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0N0cmxlci5PbkNvbXBsZXRlKCk7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyID0gdGhpcy5fQ3RybGVyLk5leHRDdHJsO1xyXG4gICAgICAgIGlmICh0aGlzLl9DdHJsZXIpXHJcbiAgICAgICAgICAgIHRoaXMuX0N0cmxlci5PblN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgX1VwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXJEZWF0aClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlci5VcGRhdGUoKTtcclxuICAgICAgICBmb3IgKHZhciBidWZmSWR4OiBudW1iZXIgPSAwOyBidWZmSWR4IDwgMjsgKytidWZmSWR4KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkJ1ZmZBcnJbYnVmZklkeF0gIT0gbnVsbCB8fCB0aGlzLkJ1ZmZBcnJbYnVmZklkeF0gIT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5CdWZmQXJyW2J1ZmZJZHhdLlVwZGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBGbHlQcmVwYXJlKCkge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXRQYXJlbmV0KCkgIHtcclxuICAgICAgICB0aGlzLm1fUGFyZW50LmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLmxvY2FsUG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgLy90aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IHRoaXMubV9QYXJlbnQudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0ZXBEYXRhIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgICBHZXREYXRhKHN0ZXA6IFN0ZXApIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFBsYXllckFuaW1hdG9yIGV4dGVuZHMgQ2hhcmFjdG9yQW5pbWF0b3Ige1xyXG4gICAgcHJpdmF0ZSBtX1BsYXllcjogUGxheWVyXHJcbiAgICBjb25zdHJ1Y3RvcihhbmltYXRvcjogTGF5YS5BbmltYXRvciwgcGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICBzdXBlcihhbmltYXRvcik7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllciA9IHBsYXllcjtcclxuICAgIH1cclxuICAgIEluaXQoKSAge1xyXG4gICAgICAgIHZhciBmYWxsU3RhdGU6IExheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMuR2V0U3RhdGUoXCJmYWxsRG93blwiKTtcclxuICAgICAgICB2YXIgZmFsbFNjcmlwdDogTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0ID0gZmFsbFN0YXRlLmFkZFNjcmlwdChMYXlhLkFuaW1hdG9yU3RhdGVTY3JpcHQpO1xyXG4gICAgICAgIGZhbGxTY3JpcHQub25TdGF0ZUV4aXQgPSAoKSA9PiB7IEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpOyB9XHJcblxyXG4gICAgICAgIHZhciBmYWxsRG93bkltZFN0YXRlOiBMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLkdldFN0YXRlKFwiZmFsbERvd25JbWRcIik7XHJcbiAgICAgICAgdmFyIGZhbGxEb3duSW1kU2NyaXB0OiBMYXlhLkFuaW1hdG9yU3RhdGVTY3JpcHQgPSBmYWxsRG93bkltZFN0YXRlLmFkZFNjcmlwdChMYXlhLkFuaW1hdG9yU3RhdGVTY3JpcHQpO1xyXG4gICAgICAgIHZhciBwbGF5ZXI6UGxheWVyID0gdGhpcy5tX1BsYXllcjtcclxuICAgICAgICBmYWxsRG93bkltZFNjcmlwdC5vblN0YXRlRXhpdCA9ICgpID0+IHsgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7IH1cclxuXHJcbiAgICAgICAgdmFyIGRpZVN0YXRlOkxheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMuR2V0U3RhdGUoXCJkaWVcIik7XHJcbiAgICAgICAgdmFyIGRpZVNjcmlwdDogTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0ID0gZGllU3RhdGUuYWRkU2NyaXB0KExheWEuQW5pbWF0b3JTdGF0ZVNjcmlwdCk7XHJcbiAgICAgICAgZGllU2NyaXB0Lm9uU3RhdGVFeGl0ID0gKCkgPT4geyBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgfSwgMTAwMCkgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBGYWxsU3RhdGVTY3JpcHQgZXh0ZW5kcyBMYXlhLkFuaW1hdG9yU3RhdGVTY3JpcHQge1xyXG4gICAgcHJpdmF0ZSBtX1BsYXllcjogUGxheWVyO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50VGltZTogbnVtYmVyXHJcbiAgICBwcml2YXRlIG1fWWllbGRUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fWWllbGRDYWxsQmFjaztcclxuICAgIGNvbnN0cnVjdG9yKCkgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgSW5pdChwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICB0aGlzLm1fUGxheWVyID0gdGhpcy5tX1BsYXllcjtcclxuICAgICAgICB0aGlzLm1fQ291bnRUaW1lID0gMDtcclxuICAgICAgICB0aGlzLm1fWWllbGRUaW1lID0gMztcclxuICAgIH1cclxuICAgIG9uU3RhdGVFbnRlcigpICB7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllci5Mb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgIC8vdGhpcy5tX0NvdW50VGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIHRoaXMubV9ZaWVsZFRpbWU7XHJcbiAgICAgICAgdGhpcy5tX1lpZWxkQ2FsbEJhY2sgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcblxyXG4gICAgfVxyXG4gICAgb25TdGF0ZUV4aXQoKSAge1xyXG4gICAgICAgIGlmICh0aGlzLm1fWWllbGRDYWxsQmFjaylcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubV9ZaWVsZENhbGxCYWNrKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL1BsYXllclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi9HYW1lU3RydWN0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vR2FtZU1vZHVsZVwiO1xyXG5leHBvcnQgbW9kdWxlIFBsYXllckNvbnRyb2xlciB7XHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBsYXllckN0cmxlciB7XHJcbiAgICAgICAgLy/lhazlhbHmjqXlj6NcclxuICAgICAgICBOZXh0Q3RybDogQmFzZVBsYXllckN0cmxlcjtcclxuICAgICAgICBwbGF5ZXI6IFBsYXllcjtcclxuXHJcbiAgICAgICAgVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjogUGxheWVyKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocGxheWVyOiBQbGF5ZXIsIGN0cmxlcjogQmFzZVBsYXllckN0cmxlciA9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKGN0cmxlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjdHJsZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTmV4dEN0cmwgPSBjdHJsZXI7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX1VwZGF0ZSgpOiB2b2lkO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBPblN0YXJ0KCk6IHZvaWQ7XHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IE9uQ29tcGxldGUoKTogdm9pZDtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUqOS6juinkuiJsuato+W4uOeKtuaAgeS4i+eahOenu+WKqFxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllck5vcm1DdHJsZXIgZXh0ZW5kcyBCYXNlUGxheWVyQ3RybGVyIHtcclxuICAgICAgICBwcml2YXRlIG1fU3RhcnRQUzogTGF5YS5WZWN0b3IzO1xyXG4gICAgICAgIHByaXZhdGUgbV9UYXJnZXRQUzogTGF5YS5WZWN0b3IzO1xyXG4gICAgICAgIHByaXZhdGUgZ2V0IE1pZGRsZVBTKCk6IExheWEuVmVjdG9yMyB7XHJcbiAgICAgICAgICAgIHZhciBtaWRsZVBTOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5sZXJwKHRoaXMubV9TdGFydFBTLCB0aGlzLm1fVGFyZ2V0UFMsIDAuNSwgbWlkbGVQUyk7XHJcbiAgICAgICAgICAgIG1pZGxlUFMueSArPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICByZXR1cm4gbWlkbGVQUztcclxuICAgICAgICB9XHJcbiAgICAgICAgSXNGYWxsaW5nOiBib29sZWFuO1xyXG4gICAgICAgIFRpbWU6IG51bWJlcjtcclxuICAgICAgICBnZXQgTGFzdFRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RUaW1lOiBudW1iZXIgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5QbGF5ZXJNb3ZlVGltZSAtICh0aGlzLlRpbWUgLSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbGFzdFRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKuW3sua2iOiAl+aXtumXtOeZvuWIhuavlCAqL1xyXG4gICAgICAgIGdldCBUaW1lUGVyY2VudCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5MYXN0VGltZSAvIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocGxheWVyOiBQbGF5ZXIgPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHBsYXllcilcclxuICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMuSXNGYWxsaW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE9uU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPbkNvbXBsZXRlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFN0YXJ0TW92ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuUmVzZXRQYXJlbmV0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLlBsYXllck1vdmVUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm1fU3RhcnRQUyA9IHRoaXMucGxheWVyLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm1fVGFyZ2V0UFMgPSB0aGlzLnBsYXllci5DdXJTdGVwLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLm1fVGFyZ2V0UFMueSArPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TdGVwTGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgcm90YXRpb246IExheWEuUXVhdGVybmlvbiA9IG5ldyBMYXlhLlF1YXRlcm5pb24oKTtcclxuICAgICAgICAgICAgdmFyIGxvb2tUb1BTID0gdGhpcy5tX1RhcmdldFBTLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGxvb2tUb1BTLnkgPSB0aGlzLm1fU3RhcnRQUy55O1xyXG4gICAgICAgICAgICBsb29rVG9QUy56ID0gLWxvb2tUb1BTLnpcclxuICAgICAgICAgICAgdmFyIHVwRGlyOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgICAgIHVwRGlyLnkgPSAxO1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRQUzogTGF5YS5WZWN0b3IzID0gdGhpcy5tX1N0YXJ0UFMuY2xvbmUoKTtcclxuICAgICAgICAgICAgc3RhcnRQUy56ID0gLXN0YXJ0UFMuejtcclxuICAgICAgICAgICAgTGF5YS5RdWF0ZXJuaW9uLmxvb2tBdChzdGFydFBTLCBsb29rVG9QUywgdXBEaXIsIHJvdGF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuRmFjZU1vZGVsVG8ocm90YXRpb24pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuVGltZSA+IDApIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPD0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5UaW1lID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuU2V0U3RlcCh0aGlzLnBsYXllci5DdXJTdGVwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RUaW1lOiBudW1iZXIgPSB0aGlzLkxhc3RUaW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByYXRlOiBudW1iZXIgPSB0aGlzLlRpbWVQZXJjZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb3ZlVGltZVJhdGU6IG51bWJlciA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZhbGxUaW1lUG9pbnQ6IG51bWJlciA9IDAuNDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRQUzogTGF5YS5WZWN0b3IzO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXRQUzogTGF5YS5WZWN0b3IzO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYXRlID4gZmFsbFRpbWVQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuSXNGYWxsaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5KdW1wRG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuVG91Y2hHcm91bmQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVGltZVJhdGUgPSAocmF0ZSAtIGZhbGxUaW1lUG9pbnQpIC8gKDEgLSBmYWxsVGltZVBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UFMgPSB0aGlzLm1fVGFyZ2V0UFM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UFMgPSB0aGlzLk1pZGRsZVBTO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVUaW1lUmF0ZSA9IHJhdGUgLyBmYWxsVGltZVBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRQUyA9IHRoaXMuTWlkZGxlUFM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UFMgPSB0aGlzLm1fU3RhcnRQUztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLlBsYXllckRlYXRoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1BzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICAgICAgICAgIExheWEuVmVjdG9yMy5sZXJwKHN0YXJ0UFMsIHRhcmdldFBTLCBtb3ZlVGltZVJhdGUsIG5ld1BzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5Qb3NpdGlvbiA9IG5ld1BzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+eOqeWutumjnuihjFxyXG4gICAgZXhwb3J0IGNsYXNzIFBsYXllckZseSBleHRlbmRzIEJhc2VQbGF5ZXJDdHJsZXIge1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgICAgIHByaXZhdGUgX0ZpbmFsWjogbnVtYmVyO1xyXG5cclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOiuvue9rueOqeWutlxyXG4gICAgICAgICAqIEBwYXJhbSBwbGF5ZXIg5pON5o6n6KeS6ImyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgU2V0UGxheWVyKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHN1cGVyLlNldFBsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuUmVzZXRQYXJlbmV0KCk7XHJcbiAgICAgICAgICAgIHBsYXllci5GbHkoKTtcclxuICAgICAgICAgICAgdmFyIHN0ZXBQUzogTGF5YS5WZWN0b3IzID0gcGxheWVyLkN1clN0ZXAuc3RhbmRQb2ludC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICAgICAgc3RlcFBTLnkgKz0gR2FtZU1vZHVsZS5WU3BhY2UqMC42IDtcclxuICAgICAgICAgICAgcGxheWVyLlBvc2l0aW9uID0gc3RlcFBTO1xyXG4gICAgICAgICAgICBwbGF5ZXIudHJhbnNmb3JtLnJvdGF0aW9uRXVsZXIgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCk7XHJcbiAgICAgICAgICAgIHBsYXllci5Nb2RlbFJvdGF0ZUV1bGFyKG5ldyBMYXlhLlZlY3RvcjMoMCwgMTgwLCAwKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihzcGVlZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgX1VwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdmVjdG9yOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIEdhbWVNb2R1bGUuVlNwYWNlLCAtR2FtZU1vZHVsZS5EU3BhY2UpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUodmVjdG9yLCAwLjA2LCB2ZWN0b3IpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5UcmFuc2xhdGUodmVjdG9yKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBPbkNvbXBsZXRlKCk6IHZvaWQgeyB9XHJcbiAgICAgICAgcHVibGljIE9uU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9HYW1lSXRlbVwiXHJcbmltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vTW91bnRMaW5lXCJcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgQ2hhcmFjdG9yQW5pbWF0b3IgZnJvbSBcIi4vQ2hhcmFjdGVyQW5pbWF0b3JcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxudHlwZSBTdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW07XHJcbnR5cGUgTUxvY2F0aW9uID0gR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbi8v5q2lXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXAgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEIHtcclxuICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJBbmltYXRvcjogU3RlcEFuaW1hdG9yO1xyXG4gICAgLy/mqKHlnovkuKrmlbBcclxuICAgIHB1YmxpYyBzdGF0aWMgc3RlcE1vZGVsTnVtOiBudW1iZXIgPSAyO1xyXG4gICAgcHJpdmF0ZSBtX1N0YW5kUG9pbnQ6IExheWEuU3ByaXRlM0Q7XHJcbiAgICBwcml2YXRlIF9Jc0RlYWRSb2FkOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBtX1N0ZXBNb2RlbDogTGF5YS5TcHJpdGUzRDtcclxuICAgIHByaXZhdGUgbV9ZaWVsZEZ1bmM7XHJcblxyXG4gICAgTGVmdFBhcmVudDogU3RlcDtcclxuICAgIFJpZ2h0UGFyZW50OiBTdGVwO1xyXG4gICAgTGVmdENoaWxkOiBTdGVwO1xyXG4gICAgUmlnaHRDaGlsZDogU3RlcDtcclxuICAgIFN0ZXBJdGVtOiBTdGVwSXRlbTtcclxuICAgIFJvYWROdW06IG51bWJlcjtcclxuICAgIE1hcms6IGFueTtcclxuICAgIEZsb29yOiBNb3VudExpbmU7XHJcbiAgICBJZHg6IG51bWJlcjtcclxuICAgIGxvY2tlZDogQm9vbGVhbjtcclxuICAgIC8v5YWs5pyJ5o6l5Y+jXHJcbiAgICBzZXQgcG9zaXRpb24obmV3UFM6IExheWEuVmVjdG9yMykge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBwb3NpdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2NhdGlvbigpOiBNTG9jYXRpb24ge1xyXG4gICAgICAgIHJldHVybiBuZXcgR2FtZVN0cnVjdC5NTG9jYXRpb24odGhpcy5JZHgsIHRoaXMuRmxvb3IuRmxvb3JOdW0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRGVhZFJvYWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0lzRGVhZFJvYWQgfHwgIXRoaXMuYWN0aXZlIHx8IHRoaXMuU3RlcEl0ZW0uSXNEaWZmaWN1bHR5O1xyXG4gICAgfVxyXG4gICAgc2V0IElzRGVhZFJvYWQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXQgSXNGb3JiaWRlbigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TdGVwSXRlbS5Jc0ZvcmJpZGVuO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEodGhpcy5hY3RpdmUgJiYgdGhpcy5GbG9vci5hY3RpdmUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHN0YW5kUG9pbnQoKTogTGF5YS5TcHJpdGUzRCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9TdGFuZFBvaW50O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoZmxvb3I6IE1vdW50TGluZSwgaWR4OiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIGlmICh0aGlzLklkeCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLnJhbmRvbSgpICogU3RlcC5zdGVwTW9kZWxOdW07XHJcbiAgICAgICAgICAgIElkeCA9IElkeCA+IDAuNSA/IDIgOiAxO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gcGF0aC5HZXRMSChcImRpenVvX3FpdTBcIiArIElkeClcclxuICAgICAgICAgICAgdmFyIG1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2xvbmVNb2RlbDogTGF5YS5TcHJpdGUzRCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3RlckFuaW1hdG9yID0gbmV3IFN0ZXBBbmltYXRvcihjbG9uZU1vZGVsLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyQW5pbWF0b3IuSW5pdCgpO1xyXG4gICAgICAgIGNsb25lTW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMubV9TdGVwTW9kZWwgPSBjbG9uZU1vZGVsO1xyXG5cclxuICAgICAgICB2YXIgc3RhbmRQb2ludDogTGF5YS5TcHJpdGUzRCA9IG5ldyBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIHRoaXMubV9TdGVwTW9kZWwuZ2V0Q2hpbGRBdCgwKS5hZGRDaGlsZChzdGFuZFBvaW50KTtcclxuICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyQW5pbWF0b3IubGlua1Nwcml0ZTNEVG9BdmF0YXJOb2RlKFwiUGxheWVyRm9vdFBvaW50XCIsIHN0YW5kUG9pbnQpO1xyXG4gICAgICAgIHRoaXMubV9TdGFuZFBvaW50ID0gc3RhbmRQb2ludDtcclxuICAgICAgICBzdGFuZFBvaW50LnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChjbG9uZU1vZGVsKTtcclxuXHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW1GYWN0b3J5KEl0ZW0uSXRlbVR5cGUuTm9uZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5SZXNldEl0ZW0oKTtcclxuICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgdGhpcy5JZHggPSBpZHg7XHJcblxyXG4gICAgICAgIHRoaXMuTGVmdFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRDaGlsZCA9IG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlJvYWROdW0gPSAwO1xyXG4gICAgICAgIHRoaXMubG9ja2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBQdXRJdGVtKGl0ZW1FbnVtZTogSXRlbS5JdGVtVHlwZSkge1xyXG4gICAgICAgIGlmIChpdGVtRW51bWUgPT0gSXRlbS5JdGVtVHlwZS5FbXB0eSkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUHV0SXRlbShpdGVtRW51bWUpO1xyXG4gICAgfVxyXG4gICAgUmVzZXRTdGVwKG5ld1BzOiBMYXlhLlZlY3RvcjMgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKG5ld1BzKVxyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gbmV3UHM7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5QdXRJdGVtKEl0ZW0uSXRlbVR5cGUuTm9uZSk7XHJcblxyXG4gICAgICAgIHRoaXMuTGVmdFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5SaWdodFBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5MZWZ0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRDaGlsZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuUm9hZE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3RlckFuaW1hdG9yLnBsYXkoXCJpZGxlXCIpXHJcbiAgICAgICAgdmFyIHBvc2l0aW9uOiBMYXlhLlZlY3RvcjMgPSB0aGlzLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uO1xyXG4gICAgICAgIHBvc2l0aW9uLnkgPSAwO1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLmxvY2FsUG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgICBpZih0aGlzLm1fWWllbGRGdW5jKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMubV9ZaWVsZEZ1bmMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVG91Y2hHcm91bmQocGxheWVyOiBQbGF5ZXIpIHtcclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlRvdWNoSXRlbShwbGF5ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdGFuZE9uR3JvdW5kKHBsYXllciA9IG51bGwpIHtcclxuICAgICAgICBpZiAocGxheWVyKSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdTcHJpdGU6IExheWEuU3ByaXRlM0QgPSB0aGlzLm1fU3RhbmRQb2ludDtcclxuICAgICAgICAgICAgbmV3U3ByaXRlLmFkZENoaWxkKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJBbmltYXRvci5wbGF5KFwiZmFsbFwiKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQdXRJbkl0ZW0oc3ByaXRlM0Q6IExheWEuU3ByaXRlM0QpIHtcclxuICAgICAgICB0aGlzLm1fU3RhbmRQb2ludC5hZGRDaGlsZChzcHJpdGUzRCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBCcmVhaygpIHtcclxuICAgICAgICB2YXIgcmFuZG9tVGltZSA9IDEwMDAgKiBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIHZhciBzdGVwOlN0ZXAgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMubV9ZaWVsZEZ1bmMgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgc3RlcC5ZaWVsZEJyZWFrKCk7XHJcbiAgICAgICAgfSwgcmFuZG9tVGltZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIFlpZWxkQnJlYWsoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJBbmltYXRvci5wbGF5KFwid2FybmluZ1wiKTtcclxuICAgICAgICB0aGlzLm1fWWllbGRGdW5jID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU3RlcEFuaW1hdG9yIGV4dGVuZHMgQ2hhcmFjdG9yQW5pbWF0b3Ige1xyXG4gICAgcHJpdmF0ZSBtX1N0ZXA6IFN0ZXA7XHJcbiAgICBjb25zdHJ1Y3RvcihhbmltYXRvcjogTGF5YS5BbmltYXRvciwgc3RlcDogU3RlcCkge1xyXG4gICAgICAgIHN1cGVyKGFuaW1hdG9yKTtcclxuICAgICAgICB0aGlzLm1fU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBJbml0KCkge1xyXG4gICAgICAgIHZhciBzdGVwRmFsbFN0YXRlOiBMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLkdldFN0YXRlKFwiZmFsbFwiKVxyXG4gICAgICAgIHZhciBzdGVwRmFsbFNjcmlwdDogTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0ID0gc3RlcEZhbGxTdGF0ZS5hZGRTY3JpcHQoTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0KTtcclxuICAgICAgICB2YXIgc3RlcEFuaW1hdG9yID0gdGhpcztcclxuICAgICAgICB2YXIgZmFsbERvd25TdGF0ZTogTGF5YS5BbmltYXRvclN0YXRlID0gdGhpcy5HZXRTdGF0ZShcImZhbGxEb3duXCIpO1xyXG4gICAgICAgIHZhciBmYWxsRG93blNjcmlwdDogRmFsbERvd25TY3JpcHQgPSBmYWxsRG93blN0YXRlLmFkZFNjcmlwdChGYWxsRG93blNjcmlwdCkgYXMgRmFsbERvd25TY3JpcHQ7XHJcbiAgICAgICAgZmFsbERvd25TY3JpcHQuSW5pdCh0aGlzLm1fU3RlcCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHZhciB3YXJuaW5nU3RhdGU6IExheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMuR2V0U3RhdGUoXCJ3YXJuaW5nXCIpO1xyXG4gICAgICAgIHZhciB3YXJuaW5nU2NyaXB0OiBXYXJuaW5nU2NyaXB0ID0gd2FybmluZ1N0YXRlLmFkZFNjcmlwdChXYXJuaW5nU2NyaXB0KSBhcyBXYXJuaW5nU2NyaXB0O1xyXG4gICAgICAgIHdhcm5pbmdTY3JpcHQuSW5pdCh0aGlzLm1fU3RlcCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBwbGF5KG5hbWU6IHN0cmluZykgIHtcclxuICAgICAgICB2YXIgYW5pbWF0b3JTdGF0ZU5hbWU6IHN0cmluZyA9IHRoaXMuY3VyU3RhdGVOYW1lO1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkgIHtcclxuICAgICAgICAgICAgY2FzZSBcImZhbGxEb3duXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3YXJuaW5nXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJpZGxlXCI6XHJcbiAgICAgICAgICAgICAgICBzdXBlci5wbGF5KG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5pbWF0b3JTdGF0ZU5hbWUgIT0gXCJmYWxsRG93blwiICYmIGFuaW1hdG9yU3RhdGVOYW1lICE9IFwid2FybmluZ1wiKSAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLnBsYXkobmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEZhbGxEb3duU2NyaXB0IGV4dGVuZHMgTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0IHtcclxuICAgIHByaXZhdGUgbV9TdGVwOiBTdGVwO1xyXG4gICAgcHJpdmF0ZSBtX1NwZWVkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fVGltZUNvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fQ291bnRpbnVlVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0FuaW1hdG9yOiBDaGFyYWN0b3JBbmltYXRvcjtcclxuICAgIHByaXZhdGUgbV9QbGF5ZXI6IFBsYXllcjtcclxuICAgIHByaXZhdGUgbV9UaW1lT3V0O1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fU3BlZWQgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Db3VudGludWVUaW1lID0gMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgSW5pdChzdGVwOiBTdGVwLCBhbmltYXRvcjogQ2hhcmFjdG9yQW5pbWF0b3IpIHtcclxuICAgICAgICB0aGlzLm1fU3RlcCA9IHN0ZXA7XHJcbiAgICAgICAgdGhpcy5tX1NwZWVkID0gMDtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBhbmltYXRvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdGF0ZUVudGVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9TdGVwLmxvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tX1RpbWVDb3VudCA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIHRoaXMubV9Db3VudGludWVUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblN0YXRlRXhpdCgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgc3RlcFBvc2l0aW9uOiBMYXlhLlZlY3RvcjMgPSB0aGlzLm1fU3RlcC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbjtcclxuICAgICAgICB0aGlzLm1fU3RlcC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbiA9IHN0ZXBQb3NpdGlvbjtcclxuICAgICAgICBpZiAodGhpcy5tX1RpbWVPdXQpXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm1fVGltZU91dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU3RhdGVVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1fUGxheWVyICYmIHRoaXMubV9TdGVwLnN0YW5kUG9pbnQubnVtQ2hpbGRyZW4gPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9QbGF5ZXIgPSB0aGlzLm1fU3RlcC5zdGFuZFBvaW50LmdldENoaWxkQnlOYW1lKFwiUGxheWVyXCIpIGFzIFBsYXllcjtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9QbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9QbGF5ZXIuUmVzZXRQYXJlbmV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fVGltZU91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9QbGF5ZXIuRmFsbERvd24oKTtcclxuICAgICAgICAgICAgICAgIH0sIDE1MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxhc3RGcmFtZVRpbWUgPSB0aGlzLm1fVGltZUNvdW50IC0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lO1xyXG4gICAgICAgIGlmIChsYXN0RnJhbWVUaW1lIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1fU3BlZWQgPCAxKVxyXG4gICAgICAgICAgICB0aGlzLm1fU3BlZWQgKz0gKHRoaXMubV9Db3VudGludWVUaW1lIC0gbGFzdEZyYW1lVGltZSkgKiAwLjU7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uOiBMYXlhLlZlY3RvcjMgPSB0aGlzLm1fU3RlcC5wb3NpdGlvbjtcclxuICAgICAgICBwb3NpdGlvbi55IC09IHRoaXMubV9TcGVlZDtcclxuICAgICAgICB0aGlzLm1fU3RlcC5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBXYXJuaW5nU2NyaXB0IGV4dGVuZHMgTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0IHtcclxuICAgIHByaXZhdGUgbV9TdGVwOiBTdGVwO1xyXG4gICAgcHJpdmF0ZSBtX0FuaW1hdG9yOiBDaGFyYWN0b3JBbmltYXRvcjtcclxuICAgIHByaXZhdGUgbV9UaW1lQ291bnQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Db3VudGludWVUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fU3RhcnRYUG9zaXRpbjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1N3aXRjaE51bTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1NoYWtlVGltZUNvdW50OiBudW1iZXI7XHJcblxyXG4gICAgZ2V0IEVuZFRpbWVQb2ludCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fVGltZUNvdW50ICsgdGhpcy5tX0NvdW50aW51ZVRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fQ291bnRpbnVlVGltZSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEluaXQoc3RlcDogU3RlcCwgYW5pbWF0b3I6IENoYXJhY3RvckFuaW1hdG9yKSB7XHJcbiAgICAgICAgdGhpcy5tX1N0ZXAgPSBzdGVwO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvciA9IGFuaW1hdG9yO1xyXG4gICAgICAgIHRoaXMubV9TaGFrZVRpbWVDb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU3RhdGVFbnRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fVGltZUNvdW50ID0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lO1xyXG4gICAgICAgIHRoaXMubV9Db3VudGludWVUaW1lID0gMTtcclxuICAgICAgICB0aGlzLm1fU3RhcnRYUG9zaXRpbiA9IHRoaXMubV9TdGVwLnRyYW5zZm9ybS5wb3NpdGlvbi54O1xyXG4gICAgICAgIHRoaXMubV9Td2l0Y2hOdW0gPSAwLjA2O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblN0YXRlRXhpdCgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgc3RlcFBvc2l0aW9uOiBMYXlhLlZlY3RvcjMgPSB0aGlzLm1fU3RlcC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbjtcclxuICAgICAgICB0aGlzLm1fU3RlcC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbiA9IHN0ZXBQb3NpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdGF0ZVVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgY3VyR2FtZVRpbWU6IG51bWJlciA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZTtcclxuICAgICAgICBpZiAoY3VyR2FtZVRpbWUgPCB0aGlzLkVuZFRpbWVQb2ludCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX1NoYWtlVGltZUNvdW50ID4gMikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX1N3aXRjaE51bSAqPSAtMTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdYUG9zaXRpb24gPSB0aGlzLm1fU3dpdGNoTnVtICsgdGhpcy5tX1N0YXJ0WFBvc2l0aW47XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcFBvc2l0aW9uOiBMYXlhLlZlY3RvcjMgPSB0aGlzLm1fU3RlcC5wb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHN0ZXBQb3NpdGlvbi54ID0gbmV3WFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX1N0ZXAucG9zaXRpb24gPSBzdGVwUG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fU2hha2VUaW1lQ291bnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fU2hha2VUaW1lQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgIHtcclxuICAgICAgICAgICAgICAgICsrdGhpcy5tX1NoYWtlVGltZUNvdW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KFwiZmFsbERvd25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiLyoqXHJcbiAqIOS9nOiAhTpNb1xyXG4gKiDlkK/liqjlnLrmma9cclxuICovXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBMb2FkU2NlbmUgZnJvbSBcIi4vU2NlbmUvTG9hZFNjZW5lXCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVDb25maWcgZnJvbSBcIi4vR2FtZUNvbmZpZ1wiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCI7XHJcbmNsYXNzIEdhbWVcclxue1xyXG5cdF9GcmFtZTpGcmFtZVdvcms7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHNzID0gQVBQO1xyXG4gICAgICAgIExheWEzRC5pbml0KDc1MCwxMzM0KTtcclxuICAgICAgICBHYW1lQ29uZmlnLmluaXQoKTtcclxuICAgICAgICAvL0xheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GVUxMO1xyXG4gICAgICAgIExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gTGF5YS5TdGFnZS5TQ0FMRV9GSVhFRF9XSURUSDtcclxuICAgICAgICBcclxuICAgICAgICBMYXlhLnN0YWdlLnNjcmVlbk1vZGUgPSBMYXlhLlN0YWdlLlNDUkVFTl9WRVJUSUNBTDtcclxuICAgICAgICBMYXlhLnN0YWdlLmFsaWduViA9IExheWEuU3RhZ2UuQUxJR05fQk9UVE9NO1xyXG4gICAgICAgIC8v5byA5ZCv57uf6K6h5L+h5oGvXHJcblx0XHRMYXlhLlN0YXQuaGlkZSgpOyAgIFxyXG4gICAgICAgIHZhciByZXNDb2wgPSBbe3VybDpcInVpL1Jlc291cmNlL2xvY2FsY29tcC5hdGxhc1wiLHR5cGU6TGF5YS5Mb2FkZXIuQVRMQVN9LHt1cmw6XCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn1dO1xyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQocmVzQ29sLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uM0RMb2FkZWQpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbjNETG9hZGVkKClcclxuICAgIHtcclxuICAgICAgICB2YXIgYXJyM0QgPSBbXCJ1aS9SZXNvdXJjZS9MYXlhU2NlbmVfTWFpblNjZW5lL0NvbnZlbnRpb25hbC9NYWluU2NlbmUubHNcIl07XHJcbiAgICAgICAgLy92YXIgYXJyM0QgPSBbXCJ1aS9SZXNvdXJjZS9MYXlhU2NlbmVfU2FtcGxlU2NlbmUvQ29udmVudGlvbmFsL1NhbXBsZVNjZW5lLmxoXCJdO1xyXG4gICAgICAgIExheWEubG9hZGVyLmNyZWF0ZShhcnIzRCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkxvYWRlZCksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLG51bGwsbnVsbCxmYWxzZSkpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZGVkKClcclxuICAgIHtcclxuICAgICAgICBBUFAuSW5pdCgpO1xyXG4gICAgICAgIHZhciBzY2VuZU1ncjpTY2VuZU1hbmFnZXIgPSBBUFAuU2NlbmVNYW5hZ2VyO1xyXG4gICAgICAgIHNjZW5lTWdyLkNoYW5nZVNjZW5lKG5ldyBMb2FkU2NlbmUoKSk7XHJcbiAgICAgICAgTGF5YS50aW1lci5mcmFtZUxvb3AoMSx0aGlzLHRoaXMuVXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBVcGRhdGUoIClcclxuICAgIHtcclxuICAgICAgICBBUFAuRnJhbWVXb3JrLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcbnZhciBHTSA9IG5ldyBHYW1lKCk7XHJcbiIsImltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi4vVXRpbGl0eS9QYXRoXCI7XHJcbmltcG9ydCBDaGFyYWN0ZXJNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJVSVNjZW5lIGV4dGVuZHMgTGF5YS5TY2VuZTNEe1xyXG5cclxuICAgIHB1YmxpYyBhcnJheURpczpMYXlhLlNwcml0ZTNEW10gPSBbXTtcclxuICAgIHB1YmxpYyBjbnROdW0gPSA1O1xyXG4gICAgcHVibGljIHN0YXJ0YW8gPSA5MDtcclxuICAgIHB1YmxpYyBwZXJhbyA9IDM2MCAvIHRoaXMuY250TnVtO1xyXG4gICAgcHVibGljIHIgPSAwLjA0O1xyXG4gICAgcHVibGljIHN0YXJ0WSA9IC0wLjAyO1xyXG4gICAgcHVibGljIGNudFNlbGVjdEluZGV4ID0gMDtcclxuXHJcbiAgICBwdWJsaWMgY2FtZXJhOkxheWEuQ2FtZXJhO1xyXG4gICAgcHVibGljIGNudHN0YXJ0YW8gPSA5MDtcclxuICAgIHB1YmxpYyBtb3ZlU3RhcmFvID0gMjtcclxuICAgIHB1YmxpYyBuZXh0QW8gPSAtMTtcclxuICAgIHB1YmxpYyBpbml0U2NhbE51bSA9IDAuMDE4O1xyXG5cclxuICAgIHB1YmxpYyBtb3ZlQ2FsbEJhY2s7XHJcbiAgICBwdWJsaWMgY250U2VsZWN0U2V4O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNudFNlbGVjdEluZGV4LCBtb3ZlQ2FsbEJhY2spIHsgXHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gY250U2VsZWN0SW5kZXg7XHJcbiAgICAgICAgdGhpcy5tb3ZlQ2FsbEJhY2sgPSBtb3ZlQ2FsbEJhY2s7XHJcbiAgICAgICAgdGhpcy5hbWJpZW50Q29sb3IgPSBuZXcgTGF5YS5WZWN0b3IzKDEsIDEsIDEpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gdGhpcy5hZGRDaGlsZChuZXcgTGF5YS5DYW1lcmEoMCwgMC4xLCAwLjMpKSBhcyBMYXlhLkNhbWVyYTtcclxuICAgICAgICB0aGlzLmNhbWVyYS50cmFuc2Zvcm0udHJhbnNsYXRlKG5ldyBMYXlhLlZlY3RvcjMoMCwgMCwgMC4yKSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnJvdGF0ZShuZXcgTGF5YS5WZWN0b3IzKCAwLCAwLCAwKSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvcih2YXIgaSA9IDAgO2kgPCAxMDtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGFyYWN0ZXJNb2RlbCA9ICBDaGFyYWN0ZXJNYW5hZ2VyLk1nci5HZXRDaGFyYWN0ZXJNb2RlbChpKTtcclxuICAgICAgICAgICAgdmFyIGF1ZHQ6TGF5YS5TcHJpdGUzRCA9IGNoYXJhY3Rlck1vZGVsO1xyXG4gICAgICAgICAgICBhdWR0LnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gbmV3IExheWEuVmVjdG9yMyh0aGlzLmluaXRTY2FsTnVtLCB0aGlzLmluaXRTY2FsTnVtLCB0aGlzLmluaXRTY2FsTnVtKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChhdWR0KTtcclxuICAgICAgICAgICAgdGhpcy5hcnJheURpcy5wdXNoKGF1ZHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gKHRoaXMuY250U2VsZWN0SW5kZXggKyA1KSAlIDU7XHJcbiAgICAgICAgdGhpcy5uZXh0QW8gPSAodGhpcy5zdGFydGFvICsgKHRoaXMuY250TnVtIC0gdGhpcy5jbnRTZWxlY3RJbmRleCkgKiAgICAgdGhpcy5wZXJhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3QoKTtcclxuICAgICB9XHJcblxyXG4gICAgIHVwZGF0ZVNlbGVjdFNleChjbnRTZWxlY3RTZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmKGNudFNlbGVjdFNleCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IDEwO2kgKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGkgPCA1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbaV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IDEwO2kgKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKGkgPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNudFNlbGVjdFNleCA9IGNudFNlbGVjdFNleDtcclxuICAgICB9XHJcblxyXG4gICAgY2FsQ250U3RhcnRhbygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gKHRoaXMuY250U2VsZWN0SW5kZXggKyA1KSAlIDU7XHJcbiAgICAgICAgdGhpcy5uZXh0QW8gPSAodGhpcy5zdGFydGFvICsgKHRoaXMuY250TnVtIC0gdGhpcy5jbnRTZWxlY3RJbmRleCkgKiB0aGlzLnBlcmFvICsgMzYwKSAlIDM2MDtcclxuXHJcbiAgICAgICAgaWYoKHRoaXMubmV4dEFvIC0gdGhpcy5jbnRzdGFydGFvICsgMzYwKSAlIDM2MCA+PSAxODApIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RhcmFvID0gLTJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RhcmFvID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDAuMDUsIHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aW1lQW9DaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5jbnRzdGFydGFvID09IHRoaXMubmV4dEFvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9IHRoaXMubmV4dEFvO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRBbyA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDYWxsQmFjayAmJiB0aGlzLm1vdmVDYWxsQmFjaygxKTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxhc2NudEFvID0gdGhpcy5jbnRzdGFydGFvO1xyXG4gICAgICAgIHRoaXMuY250c3RhcnRhbyArPSB0aGlzLm1vdmVTdGFyYW87XHJcbiAgICAgICAgaWYodGhpcy5jbnRzdGFydGFvIDwgMCB8fCB0aGlzLmNudHN0YXJ0YW8gPT0gMzYwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9ICh0aGlzLmNudHN0YXJ0YW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgICAgICBsYXNjbnRBbyA9IHRoaXMuY250c3RhcnRhbyAtIHRoaXMubW92ZVN0YXJhbztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gKHRoaXMuY250c3RhcnRhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKChsYXNjbnRBbyA+PSB0aGlzLm5leHRBbyAmJiB0aGlzLmNudHN0YXJ0YW8gPD0gdGhpcy5uZXh0QW8pIHx8IChsYXNjbnRBbyA8PSB0aGlzLm5leHRBbyAmJiB0aGlzLmNudHN0YXJ0YW8gPj0gdGhpcy5uZXh0QW8pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9IHRoaXMubmV4dEFvO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRBbyA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLm5leHRBbyA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLm1vdmVDYWxsQmFjayAmJiB0aGlzLm1vdmVDYWxsQmFjaygxKTtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IDU7aSArKykge1xyXG4gICAgICAgICAgICB2YXIgYW8gPSAodGhpcy5jbnRzdGFydGFvICsgaSAqIHRoaXMucGVyYW8pICUgMzYwXHJcbiAgICAgICAgICAgIHZhciB4ID0gdGhpcy5yICogTWF0aC5jb3MoYW8gKiAzLjE0IC8gMTgwKTtcclxuICAgICAgICAgICAgdmFyIHkgPSB0aGlzLnN0YXJ0WSArIHRoaXMuciAqIE1hdGguc2luKGFvICogMy4xNCAvIDE4MCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbNStpXS50cmFuc2Zvcm0ucG9zaXRpb24gPSB0aGlzLmFycmF5RGlzW2ldLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoeCwgeSwgMCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2NhbGUgPSAwLjIgKiB5O1xyXG4gICAgICAgICAgICBpZihzY2FsZSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5RGlzWzUraV0udHJhbnNmb3JtLmxvY2FsU2NhbGUgPSB0aGlzLmFycmF5RGlzW2ldLnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gbmV3IExheWEuVmVjdG9yMyh0aGlzLmluaXRTY2FsTnVtICsgc2NhbGUsIHRoaXMuaW5pdFNjYWxOdW0gKyBzY2FsZSwgdGhpcy5pbml0U2NhbE51bSArIHNjYWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheURpc1s1K2ldLnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gdGhpcy5hcnJheURpc1tpXS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjModGhpcy5pbml0U2NhbE51bSwgdGhpcy5pbml0U2NhbE51bSwgdGhpcy5pbml0U2NhbE51bSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubW92ZUNhbGxCYWNrICYmIHRoaXMubW92ZUNhbGxCYWNrKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNsZWFyUm9hdGVUaW1lcigpOiB2b2lkIHtcclxuICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0Um9sZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4IC0tO1xyXG4gICAgICAgIHRoaXMuY2FsQ250U3RhcnRhbygpO1xyXG4gICAgfSAgIFxyXG5cclxuICAgIG5leHRSb2xlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggKys7XHJcbiAgICAgICAgdGhpcy5jYWxDbnRTdGFydGFvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZWN0SW5kZXgoc2VsZWN0SW5kZXg6bnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYoc2VsZWN0SW5kZXggPT0gdGhpcy5jbnRTZWxlY3RJbmRleCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSBzZWxlY3RJbmRleDtcclxuICAgICAgICB0aGlzLmNhbENudFN0YXJ0YW8oKTtcclxuICAgIH0gXHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgIH1cclxufSIsImltcG9ydCB7U2NlbmV9IGZyb20gXCIuL1NjZW5lXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEdhbWVTY2VuZVBsYXkgZnJvbSBcIi4vU2NlbmVQbGF5L0dhbWVTY2VuZVBsYXlcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVEaXJlY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvciB7XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVQbGF5KCk6R2FtZVNjZW5lUGxheVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clN0YXRlIGFzIEdhbWVTY2VuZVBsYXk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZExpc3QyRCA9IFtwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVcIikscGF0aC5HZXREZXBhdGhVSUpTKFwiRW5kR2FtZVwiKV07XHJcbiAgICAgICAgdGhpcy5DaGFuZ2VTdGF0ZShuZXcgU2NlbmUuTG9hZFNjZW5lTG9naWMobG9hZExpc3QyRCxudWxsLG5ldyBHYW1lU2NlbmVQbGF5KCkpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiLypcclxu5L2c6ICFOk1vXHJcbui3s+Wxsee+iuWcuuaZr+aguOW/g+WKn+iDvVxyXG4qL1xyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW5kR2FtZVVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgR2FtZUNhbWVyYSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVDYW1lcmFcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLy4uL0dhbWUvUGxheWVyXCJcclxuaW1wb3J0IHtJbnB1dH0gZnJvbSBcIi4vLi4vR2FtZS9JbnB1dFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgR2FtZVVJIGZyb20gXCIuLy4uL3VpL0dhbWVVSVwiXHJcbmltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuLy4uL0dhbWUvU3RlcFwiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxudHlwZSBJdGVtTGF5b3V0ID0gSXRlbS5JdGVtTGF5b3V0O1xyXG50eXBlIExpbmVJdGVtSW5mbyA9IEl0ZW0uTGluZUl0ZW1JbmZvO1xyXG52YXIgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG4vL+a4uOaIj+WcuuaZr1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVcclxue1xyXG4gICAgTW9kZWxMb2FkOmJvb2xlYW47XHJcbiAgICBHYW1lRGlyOkdhbWVEaXJlY3RvcjtcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOkdhbWVEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgR2FtZURpcmVjdG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9TY2VuZU9iaiA9IG5ldyBMYXlhLlNjZW5lM0Q7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iLCJpbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi8uLi91aS9FbnRlckdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLi9jb250cm9sZXIvQVBQXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWlkZXJNYW5hZ2VyIFxyXG57XHJcbi8v5a+55aSW5o6l5Y+jXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTWdyOkd1aWRlck1hbmFnZXI7XHJcbiAgICBzdGF0aWMgZ2V0IE1ncigpOkd1aWRlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZihHdWlkZXJNYW5hZ2VyLl9NZ3IgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEd1aWRlck1hbmFnZXIuX01nciA9IG5ldyBHdWlkZXJNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHdWlkZXJNYW5hZ2VyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBTY2VuZU1ncjpTY2VuZU1hbmFnZXI7XHJcbiAgICBDdXJTY2VuZTpHdWlkZXJTY2VuZTtcclxuICAgIHB1YmxpYyBnZXQgR2FtZURpcigpOkd1aWRlckRpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuQ3VyU2NlbmUuR3VpZERpcjtcclxuICAgIH1cclxuICAgIC8v6L+b5YWl5ri45oiP5Zy65pmv6LWw6L+Z5Liq5o6l5Y+jXHJcbiAgICBFbnRlclNjZW5lKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHZhciBuZXdHYW1lU2NlbmUgPSBuZXcgR3VpZGVyU2NlbmUoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkNoYW5nZVNjZW5lKG5ld0dhbWVTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG5ld0dhbWVTY2VuZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJTY2VuZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVxyXG57XHJcbiAgICBHdWlkRGlyOkd1aWRlckRpcmVjdG9yO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHZhciBEaXJlY3RvcjpTY2VuZS5CYXNlRGlyZWN0b3IgPSBuZXcgR3VpZGVyRGlyZWN0b3IoKTtcclxuICAgICAgICByZXR1cm4gRGlyZWN0b3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlckRpcmVjdG9yIGV4dGVuZHMgU2NlbmUuQmFzZURpcmVjdG9yXHJcbntcclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoIClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdGFydCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgbG9hZDJETGlzdCA9IFt7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXREZXBhdGhVSUpTKFwiSXRlbUxpc3RcIikgLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpwYXRoLkdldEF0bFBhdGgoXCJjb21wXCIpLHR5cGU6IExheWEuTG9hZGVyLkFUTEFTIH1dO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlR2FtZVBsYXkobmV3IFNjZW5lLkxvYWRTY2VuZUxvZ2ljKGxvYWQyRExpc3QsbnVsbCxuZXcgR3VpZGVyU2NlbmVQbGF5KCkpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKCk6dm9pZFxyXG4gICAge1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyU2NlbmVQbGF5IGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lUGxheWVcclxue1xyXG4gICAgVUk6RW50ZXJHYW1lVUk7XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH0gICAgXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8RW50ZXJHYW1lVUk+KEVudGVyR2FtZVVJKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBVcGRhdGUoKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHt1aX0gZnJvbSBcIi4vLi4vdWkvbGF5YU1heFVJXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcbmltcG9ydCBGcmFtZVdvcmsgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBMb2FkaW5nVUkgZnJvbSBcIi4vLi4vdWkvVW5Eb3dubG9hZC9Mb2FkaW5nVUlcIlxyXG5pbXBvcnQgRk1Xb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgR3VpZGVyTWFuYWdlciBmcm9tIFwiLi9HdWlkZXJNYW5hZ2VyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEJHIGZyb20gXCIuLy4uL3VpL0JHXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvYWRTY2VuZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIEdlbkRpcmVjdG9yKCk6U2NlbmUuQmFzZURpcmVjdG9yXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMb2FkRGlyY3RvcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmNsYXNzIExvYWREaXJjdG9yIGV4dGVuZHMgU2NlbmUuQmFzZURpcmVjdG9yXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxvYWRMaXN0MkQgPSBbe3VybDpcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOlwidWkvUmVzb3VyY2UvbG9jYWxjb21wLmF0bGFzXCIsdHlwZTpMYXlhLkxvYWRlci5BVExBU31dO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlR2FtZVBsYXkoIG5ldyBTY2VuZS5Mb2FkU2NlbmVMb2dpYyhsb2FkTGlzdDJELG51bGwsbmV3IExvYWRTY2VuZVBsYXllKCkpICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEVuZCgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIFJlU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5Yqg6L295Zy65pmv6YC76L6RXHJcbmNsYXNzIExvYWRTY2VuZVBsYXllIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lUGxheWVcclxue1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50MkRMb2FkOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Db3VudDNETG9hZDpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fTG9hZEZhaWxlOnN0cmluZztcclxuICAgIHByaXZhdGUgbV9Db3VudFZhbHVlOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Mb2FkaW5nVUk6TG9hZGluZ1VJO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fQ291bnQyRExvYWQgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Db3VudDNETG9hZCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU3RhcnRMb2FkKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IFwiXCI7XHJcbiAgICAgICAgdmFyIHJlc291cmNlMkRBcnIgPSBbXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lUmFua1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiU2V0UGFuZWxcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJ0b29sSXRlbVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJQbGF5ZXJMaXN0XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiZW50ZXJzY2VuZXVpXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJlbnRlcnNjZW5ldWkvcmVzMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiZW50ZXJzY2VuZXVpL3JlczJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImVudGVyc2NlbmV1aS9yZXMzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJlbnRlcnNjZW5ldWkvcmVzNFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiZW50ZXJzY2VuZXVpL3JlczVcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImVudGVyc2NlbmV1aS9na1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIkNoYXJhY3RlckluZm9cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0SnNvblBhdGgoXCJJdGVtSW5mb1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIkxldmVsSW5mb1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRKc29uUGF0aChcIk9ic3RhY2xlSW5mb1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRTb3VuZHBhdGhVSUpTKFwiYmdcIilcclxuICAgICAgICBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEubG9hZGVyLm9uY2UoTGF5YS5FdmVudC5FUlJPUix0aGlzLHRoaXMub25FcnJvcik7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5vbkNvbXBsZXRlKTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UzREFyciA9IFsgXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJjMDAxX2NoaWxkXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV9iYWJ5XzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV9hZHVsdF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDFfc2VuaW9yXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV90ZWVuXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMl9jaGlsZF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDJfYmFieV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDJfdGVlbl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wMlwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wNFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImRpenVvX3FpdTAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiZGl6dW9fcWl1MDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJkaXp1b19xaXUwM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wMlwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fZmx5ZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX3NoaWVsZF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fdW50b3VjaGFibGVfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX2Nob21wZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX2VudGFuZ2xlXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fYWJzb3JkXzAxXCIpLFxyXG4gICAgICAgIF1cclxuICAgICAgICB0aGlzLkxvYWQocmVzb3VyY2UyREFycixyZXNvdXJjZTNEQXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIExvYWQoYXJyMkQ6QXJyYXk8YW55PiA9IG51bGwsYXJyM0Q6QXJyYXk8YW55Pj1udWxsKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGFycjJEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIubG9hZChhcnIyRCxudWxsLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uMkRQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudFZhbHVlIC09MC41O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhcnIzRCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmNyZWF0ZShhcnIzRCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsbnVsbCksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub24zRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgLT0wLjU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb24zRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLm1fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPXZhbHVlLzI7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5WYWx1ZSA9ICh0aGlzLm1fQ291bnQyRExvYWQgKyB0aGlzLm1fQ291bnQzRExvYWQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbjJEUHJvZ3Jlc3ModmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMubV9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9dmFsdWUvMjtcclxuICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLlZhbHVlID0gKHRoaXMubV9Db3VudDJETG9hZCArIHRoaXMubV9Db3VudDNETG9hZCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uRXJyb3Ioc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlICs9IHN0cjtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiTG9hZEVycm9yOlwiK3N0cik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ29tcGxldGUoZGF0YSlcclxuICAgIHsgICBcclxuICAgICAgICBpZih0aGlzLm1fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoaURpciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuUmVsb2FkKHRoaXMubV9Mb2FkRmFpbGUsZnVuY3Rpb24oKTp2b2lke3RoaURpci5Mb2FkKCl9ICk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQkcgPSBuZXcgQkcoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5Db21wbGV0ZSgoKT0+e0d1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdVSSA9IEFQUC5VSU1hbmFnZXIuU2hvdzxMb2FkaW5nVUk+KExvYWRpbmdVSSk7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID0gMC41O1xyXG4gICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9IDAuNTtcclxuICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5TdGFydExvYWQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEVuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2FkQ29tcGxldGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBGU00gfSBmcm9tIFwiLi8uLi9CYXNlL0ZTTVwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiO1xyXG5leHBvcnQgbW9kdWxlIFNjZW5lIHtcclxuICAgIGV4cG9ydCBjbGFzcyBTY2VuZUZTTSBleHRlbmRzIEZTTS5GU008QmFzZVNjZW5lPlxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WcuuaZr+S7o+eQhlxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTY2VuZSBleHRlbmRzIEZTTS5TdGF0ZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBfU3RhcnRHYW1lVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ2xvY2s6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG1fU2NlbmVPYmo6IExheWEuU2NlbmUzRDtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9EaXJlY3RvcjogQmFzZURpcmVjdG9yO1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNjZW5lT2JqKCk6IExheWEuU2NlbmUzRCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fU2NlbmVPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9EaXJlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBHZW5EaXJlY3RvcigpOiBCYXNlRGlyZWN0b3I7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXRPYmooc3ByaXRlM0Q6IExheWEuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX1NjZW5lT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fU2NlbmVPYmouYWRkQ2hpbGQoc3ByaXRlM0QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCYXNlU2NlbmUgUHV0T2JqIEVycm9yOmVtcHR5IFNwcml0ZTNEXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaXJlY3RvciA9IHRoaXMuR2VuRGlyZWN0b3IoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yLlN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW5kKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TY2VuZU9iai5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5TY2VuZU9iai5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RvciA9IHRoaXMuU2NlbmVPYmouZ2V0Q2hpbGRBdCgwKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5EaXJlY3Rvci5FbmQoKTtcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9EaXJlY3RvcilcclxuICAgICAgICAgICAgICAgIHRoaXMubV9EaXJlY3Rvci5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRGlyZWN0b3IgZXh0ZW5kcyBGU00uRlNNPEJhc2VTY2VuZVBsYXllPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0R2FtZVRpbWU6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENsb2NrOiBudW1iZXI7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcblxyXG4gICAgICAgIC8v56eB5pyJ5bGe5oCn5ZKM5Yqf6IO9XHJcbiAgICAgICAgZ2V0IEdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9UaW1lVXBDbG9jayAtIHRoaXMuX1N0YXJ0R2FtZVRpbWUgLSB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgLSB0aGlzLl9TdGFydEdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IEdhbWVUaW1lKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgQ3VyR2FtZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1N0YXJ0R2FtZVRpbWUgKyB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0VGltZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0VGltZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBTdGFydCgpOiB2b2lkIDtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgRW5kKCk6IHZvaWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUaW1lVXAoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL0FQUC5NZXNzYWdlQ2VudGVyLlRyaWdnZXIoR2FtZUV2ZW50LkdhbWVUaW1lVXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5VcGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIENvbnRpbnVlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lQ29udGludWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCArPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgLSB0aGlzLl9UaW1lVXBDbG9jaztcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5YiH5o2i5Ymn5pysXHJcbiAgICAgICAgICogQHBhcmFtIG5ld1NjZW5lUGxheSDmlrDliafmnKxcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgQ2hhbmdlR2FtZVBsYXkoIG5ld1NjZW5lUGxheTpCYXNlU2NlbmVQbGF5ZSApOiB2b2lkICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlU3RhdGUobmV3U2NlbmVQbGF5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTY2VuZVBsYXllIGV4dGVuZHMgRlNNLlN0YXRlIHtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRTY2VuZUxvZ2ljIGV4dGVuZHMgQmFzZVNjZW5lUGxheWUge1xyXG4gICAgICAgIHByaXZhdGUgbV9Mb2FkMkRMaXN0OiBhbnlbXTtcclxuICAgICAgICBwcml2YXRlIG1fTG9hZDNETGlzdDogYW55W107XHJcbiAgICAgICAgcHJpdmF0ZSBtX05leHRTY2VuZTogU2NlbmUuQmFzZVNjZW5lUGxheWU7XHJcbiAgICAgICAgcHVibGljIGdldCBPd25lckRpcmVjdG9yKCk6IEJhc2VEaXJlY3RvciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fb3duZXIgYXMgQmFzZURpcmVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gbG9hZDJETGlzdCAyROWKoOi9veWIl+ihqFxyXG4gICAgICAgICAqIEBwYXJhbSBsb2FkM0RMaXN0IDNE5Yqg6L295YiX6KGoXHJcbiAgICAgICAgICogQHBhcmFtIG5leHRTY2VuZSDkuIvkuIDmoLzlnLrmma9cclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3Rvcihsb2FkMkRMaXN0OiBhbnlbXSwgbG9hZDNETGlzdDogYW55W10sIG5leHRTY2VuZTogU2NlbmUuQmFzZVNjZW5lUGxheWUpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWQyRExpc3QgPSBsb2FkMkRMaXN0O1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZDNETGlzdCA9IGxvYWQzRExpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubV9OZXh0U2NlbmUgPSBuZXh0U2NlbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmQoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0KCkge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsIHRoaXMsIHRoaXMuTG9hZENvbXBsZXRlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9Mb2FkMkRMaXN0KVxyXG4gICAgICAgICAgICAgICAgTGF5YS5sb2FkZXIubG9hZCh0aGlzLm1fTG9hZDJETGlzdCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fTG9hZDNETGlzdClcclxuICAgICAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQodGhpcy5tX0xvYWQzRExpc3QsIG51bGwsIG51bGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMb2FkQ29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuT3duZXJEaXJlY3Rvci5DaGFuZ2VTdGF0ZSh0aGlzLm1fTmV4dFNjZW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi8uLi8uLi9TY2VuZS9TY2VuZVwiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vLi4vLi4vdWkvRW5kR2FtZVVJXCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgR2FtZUNhbWVyYSBmcm9tIFwiLi8uLi8uLi9HYW1lL0dhbWVDYW1lcmFcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLy4uLy4uL0dhbWUvUGxheWVyXCJcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi8uLi8uLi9HYW1lL0lucHV0XCJcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuLy4uLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4vLi4vLi4vdWkvR2FtZVVJXCJcclxuaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi8uLi8uLi9HYW1lL01vdW50TGluZVwiXHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi8uLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vLi4vLi4vR2FtZS9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBCR1VJIGZyb20gXCIuLy4uLy4uL3VpL0JHXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgR2FtZVNjZW5lIGZyb20gXCIuLi9HYW1lU2NlbmVcIjtcclxuaW1wb3J0IHsgR2FtZUFnZW50IH0gZnJvbSBcIi4vLi4vLi4vQWdlbnQvR2FtZUFnZW50XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4uLy4uL2NvbnRyb2xlci9HYW1lQVBQXCI7XHJcbmltcG9ydCB7IFdlY2hhdE9wZW4gfSBmcm9tIFwiLi4vLi4vcGxhdGZvcm0vV2VjaGF0T3BlblwiO1xyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiO1xyXG5pbXBvcnQgR2FtZW1hcCBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lTWFwXCI7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lTW9kdWxlXCI7XHJcbmltcG9ydCB7IE1vZGVsRnVuYyB9IGZyb20gXCIuLi8uLi9VdGlsaXR5L01vZGVsRnVuY1wiO1xyXG5cclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxudmFyIEZhbGxUaW1lOiBudW1iZXIgPSAyO1xyXG52YXIgbGluZU51bTogbnVtYmVyID0gMTI7XHJcbnZhciBjb2x1bW46IG51bWJlciA9IDEyO1xyXG5cclxuLy/muLjmiI/lr7zmvJRcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lUGxheSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllIHtcclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBwcml2YXRlIF9Db3VudEZsb29yVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfU3RhcnRQb3NpdGlvbjogTGF5YS5WZWN0b3IzO1xyXG4gICAgcHJpdmF0ZSBfR2FtZVVwZGF0ZTogKCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgX1BhbmVsVUk6IEdhbWVVSTtcclxuICAgIHByaXZhdGUgbV9Hb2xkTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9Mb2dpY0dvbGROdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0N1ckJHOiBCR1VJO1xyXG4gICAgcHJpdmF0ZSBfU2FmZUxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgIHByaXZhdGUgbV9HYW1lTWFwOiBHYW1lbWFwO1xyXG4gICAgcHJpdmF0ZSBtX0Jvb3RvbUZsb29yOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fU3RhcnRGbG9vcjogbnVtYmVyO1xyXG5cclxuICAgIENhbWVyYTogR2FtZUNhbWVyYTtcclxuICAgIFBsYXllcjogUGxheWVyO1xyXG4gICAgSW5wdXRDdHJsOiBJbnB1dC5CYXNlR2FtZUlucHV0O1xyXG4gICAgQ3VyTGluZUJhcnJpZXJzOiBBcnJheTxMaW5lSXRlbUluZm8+O1xyXG4gICAgbmFtZTogbnVtYmVyO1xyXG4gICAgRnJlc2hCR0NvdW50OiBudW1iZXI7XHJcbiAgICBnZXQgZ2FtZU1hcCgpOiBHYW1lbWFwIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0dhbWVNYXA7XHJcbiAgICB9XHJcbiAgICBnZXQgQ29sdW1zTnVtKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbjtcclxuICAgIH1cclxuICAgIGdldCBTYWZlTG9jYXRpb24oKTogR2FtZVN0cnVjdC5NTG9jYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TYWZlTG9jYXRpb247XHJcbiAgICB9XHJcbiAgICBnZXQgUGFuZWxVSSgpOiBHYW1lVUkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9QYW5lbFVJO1xyXG4gICAgfVxyXG4gICAgc2V0IFBhbmVsVUkodmFsdWU6IEdhbWVVSSkge1xyXG4gICAgICAgIHZhbHVlLlNldExlZnRUb3VjaCh0aGlzLCAoKSA9PiB7IE1vZGVsRnVuYy52aWJyYXRlKDI1KTt0aGlzLklucHV0Q3RybC5JbnB1dChmYWxzZSk7IH0pXHJcbiAgICAgICAgdmFsdWUuU2V0UmlnaHRUb3VjaCh0aGlzLCAoKSA9PiB7IE1vZGVsRnVuYy52aWJyYXRlKDI1KTt0aGlzLklucHV0Q3RybC5JbnB1dCh0cnVlKTsgfSk7XHJcbiAgICAgICAgdGhpcy5fUGFuZWxVSSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBsYXllckZsb29yKCk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGZsb29yOiBudW1iZXIgPSB0aGlzLl9TdGFydFBvc2l0aW9uLnogLSB0aGlzLlBsYXllci5Mb2dpY1Bvc2l0aW9uLno7XHJcbiAgICAgICAgZmxvb3IgPSBmbG9vciAvIEdhbWVNb2R1bGUuRFNwYWNlO1xyXG4gICAgICAgIGZsb29yID0gTWF0aC5yb3VuZChmbG9vcik7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGZsb29yKTtcclxuICAgIH1cclxuICAgIGdldCBEaXN0YW5jZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuUGxheWVyRmxvb3IpXHJcbiAgICB9XHJcbiAgICBnZXQgUGxheWVyRmxvb3JMaW5lKCk6IE1vdW50TGluZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuR2V0Rmxvb3JCeUZsb29yKHRoaXMuUGxheWVyRmxvb3IpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLm1fb3duZXIgYXMgR2FtZURpcmVjdG9yKS5HYW1lVGltZTtcclxuICAgIH1cclxuICAgIGdldCBHYW1lR29sZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fR29sZE51bTtcclxuICAgIH1cclxuICAgIGdldCBDb3VudEZsb29yVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHRoaXMubV9Cb290b21GbG9vciA9IHRoaXMubV9Cb290b21GbG9vciA8IHRoaXMubV9HYW1lTWFwLlRhaWxGTG9vci5GbG9vck51bSA/IHRoaXMubV9HYW1lTWFwLlRhaWxGTG9vci5GbG9vck51bSA6dGhpcy5tX0Jvb3RvbUZsb29yO1xyXG4gICAgICAgIHZhciBiZXR3ZWVuOiBudW1iZXIgPSB0aGlzLkRpc3RhbmNlICsgdGhpcy5tX1N0YXJ0Rmxvb3IgLSB0aGlzLm1fQm9vdG9tRmxvb3I7Ly90aGlzLm1fR2FtZU1hcC5UYWlsRkxvb3I7XHJcbiAgICAgICAgdmFyIHJhbmdlTnVtOiBudW1iZXIgPSAzO1xyXG4gICAgICAgIGJldHdlZW4gPSBiZXR3ZWVuID4gcmFuZ2VOdW0gPyByYW5nZU51bSA6IGJldHdlZW47XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0NvdW50Rmxvb3JUaW1lIC0gYmV0d2VlbiAvIHJhbmdlTnVtICogRmFsbFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLkNhbWVyYSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gbnVsbDtcclxuICAgICAgICB0aGlzLkN1ckxpbmVCYXJyaWVycyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fQ291bnRGbG9vclRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0UG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy5fUGFuZWxVSSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fQ3VyQkcgPSBBUFAuU2NlbmVNYW5hZ2VyLkJHIGFzIEJHVUk7XHJcbiAgICAgICAgdGhpcy5GcmVzaEJHQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMubV9HYW1lTWFwID0gbmV3IEdhbWVtYXAobGluZU51bSwgY29sdW1uKTtcclxuICAgICAgICB0aGlzLm1fU3RhcnRGbG9vciA9IDM7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkSW5wdXRDdHJsZXIodmFsdWU6IElucHV0LkJhc2VHYW1lSW5wdXQpIHtcclxuICAgICAgICB0aGlzLklucHV0Q3RybC5DbGVhcigpO1xyXG4gICAgICAgIHZhbHVlLk5leHRJbnB1dCA9IHRoaXMuSW5wdXRDdHJsO1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgUG9wSW5wdXRDdHJsZXIoKSB7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSB0aGlzLklucHV0Q3RybC5OZXh0SW5wdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgQWRkR29sZChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9Hb2xkTnVtICs9IG51bTtcclxuICAgICAgICB0aGlzLkFkZExvZ2ljR29sZChudW0pO1xyXG4gICAgfVxyXG5cclxuICAgIEFkZEdvbGRVbkxvZ2ljR29sZChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9Hb2xkTnVtICs9IG51bTtcclxuICAgIH1cclxuXHJcbiAgICBBZGRMb2dpY0dvbGQobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9Mb2dpY0dvbGROdW0gKz0gbnVtO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5Hb2xkID0gdGhpcy5fTG9naWNHb2xkTnVtO1xyXG4gICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkuZHJhd3Bhc3ModGhpcy5fTG9naWNHb2xkTnVtICsgR2FtZUFnZW50LkFnZW50LkN1clNjb3JlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvue9ruWuieWFqOS9jee9rlxyXG4gICAgU2V0U2FmZVBTKGxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbikge1xyXG4gICAgICAgIHRoaXMubV9HYW1lTWFwLlNldFNhZmVQUyhsb2NhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgRGVhdGgoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUGxheWVyRGVhdGggPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuT25HYW1lQ29tcGxldGUoKTtcclxuICAgICAgICAvL3VpLlNldEdhbWVJbmZvKHRoaXMuUGxheWVyRGlzdGFuY2UsdGhpcy5fR29sZE51bSk7XHJcbiAgICB9XHJcblxyXG4gICAgRW5kKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvL+mHjeaWsOW8gOWni1xyXG4gICAgUmVTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIFNob3dJbnB1dEluZm8oaW5mbzogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlNob3dJbnB1dEluZm8oaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lt6blj7Pnp7vliqhcclxuICAgIE1vdmVTdGVwKGlzUmlnaHQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5QbGF5ZXIuQ3VyU3RlcC5sb2NrZWQgfHwgdGhpcy5QbGF5ZXIuTG9ja2VkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy/ojrflj5bkuIvkuIDlsYLnmoRTdGVwXHJcbiAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSB0aGlzLlBsYXllci5DdXJTdGVwO1xyXG4gICAgICAgIGlmIChzdGVwID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNSaWdodCkge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5SaWdodFBhcmVudDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGVwID0gc3RlcC5MZWZ0UGFyZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0ZXAgPT0gbnVsbCB8fCBzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLlBsYXllci5CYXNlQ3RybGVyLlRpbWUgPiAwKSAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuUGxheWVyLkN1clN0ZXAuU3RhbmRPbkdyb3VuZCgpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLkxheVN0ZXAoc3RlcCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuU3RhcnRNb3ZlKCk7XHJcbiAgICAgICAgdmFyIG5leHRGbG9vckRpciA9IGlzUmlnaHQgPyAxIDogLTE7XHJcbiAgICAgICAgdGhpcy5tX0dhbWVNYXAuUHVzaEZMb29yKG5leHRGbG9vckRpcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lsYLmlbDojrflj5bmn5DlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmbG9vciBcclxuICAgICAqL1xyXG4gICAgR2V0Rmxvb3JCeUZsb29yKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0dhbWVNYXAuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmui/h+WdkOagh+iOt+WPluWPsOmYtlxyXG4gICAgICogQHBhcmFtIGxvY2F0aW9uIOe0ouW8lSzlsYLmlbBcclxuICAgICAqL1xyXG4gICAgR2V0U3RlcEJ5TG9jYXRpb24obG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uLCByaWdodFN3aXRjaE51bTogbnVtYmVyID0gMCk6IFN0ZXAge1xyXG4gICAgICAgIGlmIChyaWdodFN3aXRjaE51bSAqIHJpZ2h0U3dpdGNoTnVtID4gMC4wMDEpIHtcclxuICAgICAgICAgICAgdmFyIGZsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb2NhdGlvbi5ZKTtcclxuICAgICAgICAgICAgdmFyIGRpc3RhbmNlOiBudW1iZXIgPSBNYXRoLmNlaWwoZmxvb3IucmlnaHRTd2l0Y2ggLyAyKSAtIE1hdGguY2VpbChyaWdodFN3aXRjaE51bSAvIDIpO1xyXG4gICAgICAgICAgICB2YXIgZmxvb3JJZHg6IG51bWJlciA9IGxvY2F0aW9uLlggLSBkaXN0YW5jZTsvLyAtICgxICsgZmxvb3IuT2RkU3dpdGNoKTtcclxuICAgICAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSBmbG9vci5HZXRTdGVwKGZsb29ySWR4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB2YXIgZ2V0U3RlcDogU3RlcCA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGxvY2F0aW9uLlkpLkdldFN0ZXAobG9jYXRpb24uWCk7XHJcblxyXG4gICAgICAgIHJldHVybiBnZXRTdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yib5bu655u45YWz5pS+6L+ZIOi/memHjOmHjeaWsOW8gOWni+S4jeS8mui1sFxyXG4gICAgcHVibGljIFN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gbmV3IEdhbWVDYW1lcmEoKTtcclxuICAgICAgICB0aGlzLkNhbWVyYS5vcnRob2dyYXBoaWMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLm9ydGhvZ3JhcGhpY1ZlcnRpY2FsU2l6ZSA9IDQwO1xyXG4gICAgICAgIHRoaXMuQ2FtZXJhLnRyYW5zZm9ybS5sb2NhbFJvdGF0aW9uRXVsZXIgPSBuZXcgTGF5YS5WZWN0b3IzKC0zMCwgMCwgMCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5DYW1lcmEpO1xyXG4gICAgICAgIC8v5Yib5bu6VUlcclxuICAgICAgICAvL+WIm+W7uueOqeWutlxyXG4gICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdmFyIGdhbWVBZ2VudCA9IEdhbWVBZ2VudC5BZ2VudDtcclxuICAgICAgICB2YXIgcGxheWVyTW9kZWwgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRDaGFyYWN0ZXJNb2RlbChnYW1lQWdlbnQuQ3VyQ2hhcmFjdGVySUQpO1xyXG4gICAgICAgIHBsYXllci5TZXRQbGF5ZXJNb2RlbChwbGF5ZXJNb2RlbCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5QdXRPYmoodGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMubV9HYW1lTWFwKTtcclxuICAgICAgICAvL+WHhuWkh+eOqeWutuatu+S6oeS6i+S7tlxyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCwgdGhpcy5EZWF0aCwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMuU3RhcnRHYW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ov5vlhaXmuLjmiI/nmoTorr7nva7mlL7ov5nph4wg6YeN5paw5byA5aeL6LWw6L+Z6YeMXHJcbiAgICBwcm90ZWN0ZWQgU3RhcnRHYW1lKCkge1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuU2NlbmVPYmouYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKVxyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5SZXNldEdhbWVJdGVtKCk7XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LlJlc2V0U2tpbGxJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5fU2FmZUxvY2F0aW9uID0gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKDAsIDApO1xyXG4gICAgICAgIC8v5Yib5bu66L6T5YWl5o6n5Yi25ZmoXHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwgPSBuZXcgSW5wdXQuTm9ybUdhbWVJbnB1dCh0aGlzKTtcclxuICAgICAgICB0aGlzLlBsYXllci5SZXNldCgpO1xyXG4gICAgICAgIHZhciBzdGFydEZsb29yOiBudW1iZXIgPSB0aGlzLm1fU3RhcnRGbG9vcjtcclxuICAgICAgICB0aGlzLm1fR2FtZU1hcC5Jbml0KHN0YXJ0Rmxvb3IpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlNldFN0ZXAodGhpcy5tX0dhbWVNYXAuR2V0U2FmZVN0ZXAoKSk7XHJcbiAgICAgICAgdmFyIGNhbWVyYVBzOkxheWEuVmVjdG9yMyA9IHRoaXMuUGxheWVyLlBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgY2FtZXJhUHMueSArPSAwLjI7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEudHJhbnNmb3JtLnBvc2l0aW9uID0gY2FtZXJhUHM7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuSW5pdCgpO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0UG9zaXRpb24gPSB0aGlzLlBsYXllci5Qb3NpdGlvbjtcclxuICAgICAgICB0aGlzLkNhbWVyYS5SZXNldChuZXcgTGF5YS5WZWN0b3IzKCksIG5ldyBMYXlhLlZlY3RvcjMoMCwgR2FtZU1vZHVsZS5IU3BhY2UgKiAzLjIsIEdhbWVNb2R1bGUuSFNwYWNlICogMy4yKSwgdGhpcy5QbGF5ZXIpO1xyXG4gICAgICAgIHRoaXMubV9Hb2xkTnVtID0gMDtcclxuICAgICAgICB0aGlzLl9Mb2dpY0dvbGROdW0gPSAwO1xyXG5cclxuICAgICAgICB0aGlzLlBhbmVsVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3coR2FtZVVJKTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuUmVnaXN0Q2xpY2tQbGF5ZXJJdGVtKHRoaXMsIHRoaXMuVXNlUGxheWVySXRlbSk7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlJlZ2lzdENsaWNrU2tpbGxJdGVtKHRoaXMsIHRoaXMuVXNlU2tpbGxJdGVtKTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuR29sZCA9IDA7XHJcbiAgICAgICAgdGhpcy5fQ291bnRGbG9vclRpbWUgPSB0aGlzLkdhbWVUaW1lICsgNDtcclxuICAgICAgICB0aGlzLl9HYW1lVXBkYXRlID0gdGhpcy5fU3RhcnRDb3VudDtcclxuICAgICAgICBXZWNoYXRPcGVuLmdldEluc3RhbmNlcygpLmRyYXdwYXNzKDApO1xyXG4gICAgICAgIHRoaXMubV9Cb290b21GbG9vciA9IHN0YXJ0Rmxvb3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fR2FtZVVwZGF0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0dhbWVVcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvqrnjq/orr7nva7lsYLlj7DpmLZcclxuICAgICAqIEBwYXJhbSBmbG9vciDlsYJcclxuICAgICAqIEBwYXJhbSBPd25lciBcclxuICAgICAqIEBwYXJhbSBjYWxsQmFjayDlvqrnjq/miafooYzlm57osINcclxuICAgICAqL1xyXG4gICAgTG9vcERvRmxvb3JTdGVwKGZsb29yOiBudW1iZXIsIE93bmVyOiBhbnksIGNhbGxCYWNrOiAoc3RlcDogU3RlcCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9HYW1lTWFwLkxvb3BEb0Zsb29yU3RlcChmbG9vciwgT3duZXIsIGNhbGxCYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+ato+W4uOi/kOihjOaXtueahOavj+W4p+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBfUnVuR2FtZVVwZGF0ZSgpIHtcclxuICAgICAgICB2YXIgZGlzdDogbnVtYmVyID0gdGhpcy5QbGF5ZXJGbG9vcjtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuRGlzdGFuY2UgPSB0aGlzLkRpc3RhbmNlO1xyXG4gICAgICAgIGlmICh0aGlzLkZyZXNoQkdDb3VudCA+IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0N1ckJHLlVwZGF0ZVBhZ2UoZGlzdCk7XHJcbiAgICAgICAgICAgIHRoaXMuRnJlc2hCR0NvdW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgKyt0aGlzLkZyZXNoQkdDb3VudDtcclxuICAgICAgICB2YXIgZERpc3RhbmNlOiBudW1iZXIgPSB0aGlzLm1fR2FtZU1hcC5UYWlsRkxvb3IuRmxvb3JOdW07XHJcbiAgICAgICAgdmFyIGRpc3RhbmNlID0gdGhpcy5QbGF5ZXJGbG9vciAtIGREaXN0YW5jZSArIDM7XHJcbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMykge1xyXG4gICAgICAgICAgICB0aGlzLl9QdXNoRkxvb3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLkNvdW50Rmxvb3JUaW1lIDwgQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50Rmxvb3JUaW1lID0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lICsgRmFsbFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuX0Rlc3Ryb3lMaW5lKHRoaXMubV9Cb290b21GbG9vcik7XHJcbiAgICAgICAgICAgICsrdGhpcy5tX0Jvb3RvbUZsb29yO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLklucHV0Q3RybC5VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+W8gOWni+WAkuiuoeaXtuacn+mXtOeahOavj+W4p+mAu+i+kVxyXG4gICAgcHJpdmF0ZSBfU3RhcnRDb3VudCgpIHtcclxuICAgICAgICB2YXIgdGltZTogc3RyaW5nID0gXCJcIlxyXG4gICAgICAgIHZhciBjb3VudFRpbWU6IG51bWJlciA9IHRoaXMuX0NvdW50Rmxvb3JUaW1lIC0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lO1xyXG4gICAgICAgIGlmIChjb3VudFRpbWUgPiAwLjkpXHJcbiAgICAgICAgICAgIHRpbWUgKz0gTWF0aC5mbG9vcihjb3VudFRpbWUpO1xyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLlBhbmVsVUkuR2FtZVBhbmVsID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSA9IHRoaXMuX1J1bkdhbWVVcGRhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuX0NvdW50Rmxvb3JUaW1lID0gdGhpcy5HYW1lVGltZSArIEZhbGxUaW1lO1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuUmVzZXRHYW1lSXRlbSgpO1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuUmVzZXRTa2lsbEl0ZW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlNldENvdW50VGltZSh0aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+WwhuWxguWQkeS4iuWPoFxyXG4gICAgcHJvdGVjdGVkIF9QdXNoRkxvb3IoKSB7XHJcbiAgICAgICAgdGhpcy5tX0dhbWVNYXAuUHVzaEZMb29yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDloYzpmbfmn5DkuIDlsYJcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfWZsb29yIFxyXG4gICAgICovXHJcbiAgICBfRGVzdHJveUxpbmUoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLm1fR2FtZU1hcC5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9HYW1lTWFwLkJyZWFrTGluZShmbG9vcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVc2VTa2lsbEl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKEdhbWVBZ2VudC5BZ2VudC5Ta2lsbEl0ZW1OdW0gPCAxKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXIuQ3VyU3RlcC5sb2NrZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuVXNlU2tpbGxJdGVtKCk7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlcklEOiBudW1iZXIgPSBHYW1lQWdlbnQuQWdlbnQuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdmFyIEl0ZW1JRDogbnVtYmVyID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3IuR2V0SXRlbUlEKGNoYXJhY3RlcklEKTtcclxuICAgICAgICB2YXIgSXRlbVR5cGU6IG51bWJlciA9IEdhbWVBUFAuSXRlbU1nci5HZXRJdGVtVHlwZShJdGVtSUQpO1xyXG4gICAgICAgIHZhciBuZXdCdWZmOiBJdGVtLkJhc2VQbGF5ZXJCdWZmID0gSXRlbS5JdGVtQnVmZkZhY3RvcnkoSXRlbVR5cGUpO1xyXG4gICAgICAgIG5ld0J1ZmYuQWRkVG9QbGF5ZXIodGhpcy5QbGF5ZXIpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXNlUGxheWVySXRlbSgpIHtcclxuICAgICAgICBpZiAoR2FtZUFnZW50LkFnZW50LkdhbWVJdGVtTnVtIDwgMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyLkN1clN0ZXAubG9ja2VkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LlVzZUdhbWVJdGVtKCk7XHJcbiAgICAgICAgdmFyIEl0ZW1JRDogbnVtYmVyID0gR2FtZUFnZW50LkFnZW50LkN1ckl0ZW07XHJcbiAgICAgICAgdmFyIEl0ZW1UeXBlOiBudW1iZXIgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0SXRlbVR5cGUoSXRlbUlEKTtcclxuICAgICAgICB2YXIgbmV3QnVmZjogSXRlbS5CYXNlUGxheWVyQnVmZiA9IEl0ZW0uSXRlbUJ1ZmZGYWN0b3J5KEl0ZW1UeXBlKTtcclxuICAgICAgICBuZXdCdWZmLkFkZFRvUGxheWVyKHRoaXMuUGxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIE9uR2FtZUNvbXBsZXRlKCkge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCwgdGhpcy5EZWF0aCwgdGhpcyk7XHJcbiAgICAgICAgdmFyIHVpOiBFbmRHYW1lVUkgPSBBUFAuVUlNYW5hZ2VyLlNob3c8RW5kR2FtZVVJPihFbmRHYW1lVUkpO1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5BZGRHb2xkKHRoaXMubV9Hb2xkTnVtKTtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQWRkU2NvcmUodGhpcy5tX0dvbGROdW0gKiAxMCArIHRoaXMuRGlzdGFuY2UgKiAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPblRpbWVQYXVzZSgpIHtcclxuICAgICAgICB0aGlzLlBsYXllci5QYXVzZSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBPbkNvdW50aW51ZSgpIHtcclxuICAgICAgICB0aGlzLlBsYXllci5Db250aW51ZSgpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IG1vZHVsZSBNb2RlbEZ1bmNcclxue1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEZpbmRDaGlsZEJ5TmFtZSggd2lkdGg6bnVtYmVyIClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdmlicmF0ZSh2aWJyYXRlTnVtYmVyKSB7XHJcbiAgICAgICAgaWYoTGF5YS5Ccm93c2VyLndpbmRvdy5jb25jaENvbmZpZykge1xyXG4gICAgICAgICAgICB2YXIgb3MgPSBMYXlhLkJyb3dzZXIud2luZG93LmNvbmNoQ29uZmlnLmdldE9TKCk7XHJcbiAgICAgICAgICAgIHZhciBicmlkZ2U7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB7fTtcclxuICAgICAgICAgICAgaWYgKG9zID09IFwiQ29uY2gtaW9zXCIpIHtcclxuICAgICAgICAgICAgICAgIGJyaWRnZSA9IExheWEuUGxhdGZvcm1DbGFzcy5jcmVhdGVDbGFzcyhcIkpTQnJpZGdlXCIpOy8v5Yib5bu66ISa5q2l5Luj55CGXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob3MgPT0gXCJDb25jaC1hbmRyb2lkXCIpIHtcclxuICAgICAgICAgICAgICAvL+mcgOimgeWujOaVtOeahOexu+i3r+W+hO+8jOazqOaEj+S4jmlPU+eahOS4jeWQjFxyXG4gICAgICAgICAgICAgIGJyaWRnZSA9IExheWEuUGxhdGZvcm1DbGFzcy5jcmVhdGVDbGFzcyhcImRlbW8uSlNCcmlkZ2VcIik7Ly/liJvlu7rohJrmraXku6PnkIZcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgaWYgKG9zID09IFwiQ29uY2gtaW9zXCIpIHtcclxuICAgICAgICAgICAgLy8gICAvL2lPU+azqOaEj+WHveaVsOetvuWQje+8jOazqOaEj+S4jkFuZHJvaWTnmoTkuI3lkIxcclxuICAgICAgICAgICAgLy8gICBhbGVydChicmlkZ2UuY2FsbChcInRlc3RTdHJpbmc6XCIsXCJoZWxsb1wiKSk7XHJcbiAgICAgICAgICAgIC8vICAgYWxlcnQoYnJpZGdlLmNhbGwoXCJ0ZXN0TnVtYmVyOlwiLDI1Ni4wKSk7IFxyXG4gICAgICAgICAgICAvLyAgIGFsZXJ0KGJyaWRnZS5jYWxsKFwidGVzdEJvb2w6XCIsZmFsc2UpKTtcclxuICAgICAgICAgICAgLy8gICBvYmoudmFsdWUgPSBcIkhlbGxvIE9DIVwiO1xyXG4gICAgICAgICAgICAvLyAgIGJyaWRnZS5jYWxsV2l0aEJhY2soZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBvYmogPSBKU09OLnBhcnNlKHZhbHVlKVxyXG4gICAgICAgICAgICAvLyAgICAgYWxlcnQob2JqLnZhbHVlKTtcclxuICAgICAgICAgICAgLy8gICAgIH0sXCJ0ZXN0QXN5bmNDYWxsYmFjazpcIiwgSlNPTi5zdHJpbmdpZnkob2JqKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAob3MgPT0gXCJDb25jaC1hbmRyb2lkXCIpIHtcclxuICAgICAgICAgICAgICAgYnJpZGdlLmNhbGwoXCJ2aWJyYXRlXCIsdmlicmF0ZU51bWJlcik7XHJcbiAgICAgICAgICAgIC8vICAgYWxlcnQoYnJpZGdlLmNhbGwoXCJ0ZXN0TnVtYmVyXCIsMjU2LjApKTtcclxuICAgICAgICAgICAgLy8gICBhbGVydChicmlkZ2UuY2FsbChcInRlc3RCb29sXCIsZmFsc2UpKTtcclxuICAgICAgICAgICAgLy8gICBvYmoudmFsdWUgPSBcIkhlbGxvIEphdmEhXCI7XHJcbiAgICAgICAgICAgIC8vICAgYnJpZGdlLmNhbGxXaXRoQmFjayhmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAvLyAgICAgdmFyIG9iaiA9IEpTT04ucGFyc2UodmFsdWUpXHJcbiAgICAgICAgICAgIC8vICAgICBhbGVydChvYmoudmFsdWUpO1xyXG4gICAgICAgICAgICAvLyAgIH0sXCJ0ZXN0QXN5bmNDYWxsYmFja1wiLEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW5hdmlnYXRvci52aWJyYXRlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/pnIc156eSXHJcbiAgICAgICAgLy9uYXZpZ2F0b3IudmlicmF0ZSg1MDAwKTtcclxuICAgICAgICAvL+mchzXnp5LvvIzlgZwwLjPnp5LvvIzlnKjpnIc056eSXHJcbiAgICAgICAgbmF2aWdhdG9yLnZpYnJhdGUodmlicmF0ZU51bWJlcik7XHJcbiAgICB9XHJcbn1cclxuICIsImV4cG9ydCBtb2R1bGUgcGF0aCB7XHJcbiAgICBleHBvcnQgdmFyIElzRWRpdG9yOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGV4cG9ydCB2YXIgdmVyc2lvbjogc3RyaW5nID0gXCI/dj01XCI7XHJcbiAgICBleHBvcnQgdmFyIFNjZW5lQXNzZXRQYXRoOiBzdHJpbmcgPSBcIkxheWFTY2VuZV9cIjtcclxuICAgIGV4cG9ydCB2YXIgUmVzb3VyY2VQYXRoOiBzdHJpbmcgPSBJc0VkaXRvciA/IFwiTmV0UmVzb3VyY2VfM18yOS9cIiA6IFwiaHR0cHM6Ly93d3cuZ3NqZ2FtZS5jb20vUmVzb3VyY2UvTmV0UmVzb3VyY2VfM18yOS9cIjtcclxuICAgIGV4cG9ydCB2YXIgVUlQYXRoOiBzdHJpbmcgPSBSZXNvdXJjZVBhdGggKyBcIlVJL1wiO1xyXG4gICAgZXhwb3J0IHZhciBNb2RlbFBhdGg6IHN0cmluZyA9IFJlc291cmNlUGF0aCArIFwiM0QvXCJcclxuICAgIGV4cG9ydCB2YXIgQ29uZmlnUGF0aDogc3RyaW5nID0gUmVzb3VyY2VQYXRoICsgXCJDb25maWcvXCJcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlkF0bOaWh+S7tui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0QXRsUGF0aChmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gVUlQYXRoICsgZmlsZU5hbWUgKyBcIi5hdGxhc1wiICsgKElzRWRpdG9yID8gXCJcIiA6IHZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5aOw6Z+z6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRTb3VuZHBhdGhVSUpTKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAgUmVzb3VyY2VQYXRoICsgXCJzb3VuZC9cIiArIGZpbGVOYW1lICsgXCIubXAzXCIgKyAoSXNFZGl0b3IgPyBcIlwiIDogdmVyc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZVSUpzb27ot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldERlcGF0aFVJSlMoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFVJUGF0aCArIGZpbGVOYW1lICsgXCIuanNvblwiICsgKElzRWRpdG9yID8gXCJcIiA6IHZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WbGjmlofku7bot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldExIKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBNb2RlbFBhdGggKyBTY2VuZUFzc2V0UGF0aCArIGZpbGVOYW1lICsgXCIvQ29udmVudGlvbmFsL1wiICsgZmlsZU5hbWUgKyBcIi5saFwiICsgKElzRWRpdG9yID8gXCJcIiA6IHZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Yqg6L29SnNvbui3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0SnNvblBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIENvbmZpZ1BhdGggKyBmaWxlTmFtZSArIFwiLmpzb25cIiArIChJc0VkaXRvciA/IFwiXCIgOiB2ZXJzaW9uKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQnV0dG9uVG91Y2hFdmVudCBleHRlbmRzIExheWEuU2NyaXB0IHtcclxuICAgIFxyXG4gICAgc3RhdGljIGFkZEJ1dHRvblRvdWNoRXZlbnQoZTogTGF5YS5CdXR0b24pOiB2b2lkIHtcclxuICAgICAgICBlLm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTiwgdGhpcywgdGhpcy5idXR0b25Ub3VjaERvd24pO1xyXG4gICAgICAgIGUub24oTGF5YS5FdmVudC5NT1VTRV9VUCwgdGhpcywgdGhpcy5idXR0b25Ub3VjaFVwKTtcclxuICAgICAgICBlLm9uKExheWEuRXZlbnQuTU9VU0VfT1VULCB0aGlzLCB0aGlzLmJ1dHRvblRvdWNoVXApO1xyXG4gICAgICAgIGUub24oTGF5YS5FdmVudC5NT1VTRV9PVkVSLCB0aGlzLCB0aGlzLmJ1dHRvblRvdWNoVXApO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBidXR0b25Ub3VjaERvd24oZTogTGF5YS5FdmVudCk6IHZvaWR7XHJcbiAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnNjYWxlWCA9IGUuY3VycmVudFRhcmdldC5zY2FsZVkgPSAxLjE7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGJ1dHRvblRvdWNoVXAoZTogTGF5YS5FdmVudCk6IHZvaWR7XHJcbiAgICAgICAgZS5jdXJyZW50VGFyZ2V0LnNjYWxlWCA9IGUuY3VycmVudFRhcmdldC5zY2FsZVkgPSAxO1xyXG4gICAgfVxyXG4gICAgXHJcbn0iLCJleHBvcnQgbW9kdWxlIFVJRnVuYyB7XHJcbiAgICAvL+iuoeeul+e8qeaUvuWAvFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIENvdW50U2NhbGVGaXgod2lkdGg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCF3aWR0aCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFnZVdpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB2YXIgc2NhbGU6IG51bWJlciA9IHN0YWdlV2lkdGggLyB3aWR0aDtcclxuICAgICAgICByZXR1cm4gc2NhbGU7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gRml4VUkodmlldzogTGF5YS5TcHJpdGUsIHdpZHRoOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgc2NhbGUgPSBVSUZ1bmMuQ291bnRTY2FsZUZpeCh3aWR0aCA/IHdpZHRoIDogdmlldy53aWR0aCk7XHJcbiAgICAgICAgdmlldy5zY2FsZVggPSBzY2FsZTtcclxuICAgICAgICB2aWV3LnNjYWxlWSA9IHNjYWxlO1xyXG4gICAgICAgIHZpZXcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQgLyBzY2FsZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWdyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgRlcgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiXHJcbmltcG9ydCBUaW1lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVGltZU1hbmFnZXJcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIjtcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLi9HYW1lL0dhbWVNb2R1bGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFQUCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX1NjZW5lTWdyOiBTY2VuZU1ncjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfVGltZU1ncjogVGltZU1hbmFnZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX1VJTWFuYWdlcjogVUlNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfRnJhbWVXb3JrOkZyYW1lV29yaztcclxuICAgIHN0YXRpYyBnZXQgRnJhbWVXb3JrKCk6RnJhbWVXb3JrXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ19GcmFtZVdvcms7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IE1lc3NhZ2VNYW5hZ2VyKCk6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyICB7XHJcbiAgICAgICAgcmV0dXJuIEFQUC5nX01lc3NhZ2U7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IFVJTWFuYWdlcigpOiBVSU1hbmFnZXIgIHtcclxuICAgICAgICBpZiAoQVBQLmdfVUlNYW5hZ2VyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIEFQUC5nX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLmdfVUlNYW5hZ2VyO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBTY2VuZU1hbmFnZXIoKTogU2NlbmVNZ3IgIHtcclxuICAgICAgICBpZiAoQVBQLmdfU2NlbmVNZ3IgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgQVBQLmdfU2NlbmVNZ3IgPSBGVy5GTS5HZXRNYW5hZ2VyPFNjZW5lTWdyPihTY2VuZU1ncik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBBUFAuZ19TY2VuZU1ncjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgVGltZU1hbmFnZXIoKTogVGltZU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICBpZiAoQVBQLmdfVGltZU1nciA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBBUFAuZ19UaW1lTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxUaW1lTWFuYWdlcj4oVGltZU1hbmFnZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLmdfVGltZU1ncjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLmdfRnJhbWVXb3JrID0gRnJhbWVXb3JrLkZNO1xyXG4gICAgICAgIHZhciBmbTpGcmFtZVdvcmsgID0gQVBQLmdfRnJhbWVXb3JrO1xyXG4gICAgICAgIEFQUC5nX01lc3NhZ2UgPSBmbS5BZGRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgQVBQLmdfU2NlbmVNZ3IgPSAgZm0uQWRkTWFuYWdlcjxTY2VuZU1ncj4oU2NlbmVNZ3IpO1xyXG4gICAgICAgIEFQUC5nX1RpbWVNZ3IgPSBmbS5BZGRNYW5hZ2VyPFRpbWVNYW5hZ2VyPihUaW1lTWFuYWdlcik7XHJcbiAgICAgICAgQVBQLmdfVUlNYW5hZ2VyID0gZm0uQWRkTWFuYWdlcjxVSU1hbmFnZXI+KFVJTWFuYWdlcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgQVBQLmdfTWVzc2FnZS5SZWdpc3QoR2FtZU1vZHVsZS5FdmVudC5PblRpbWVQYXVzZSxBUFAuZ19UaW1lTWdyLlBhdXNlLEFQUC5nX1RpbWVNZ3IpXHJcbiAgICAgICAgQVBQLmdfTWVzc2FnZS5SZWdpc3QoR2FtZU1vZHVsZS5FdmVudC5PblRpbWVDb250aW51ZSxBUFAuZ19UaW1lTWdyLkNvbnRpbnVlLEFQUC5nX1RpbWVNZ3IpXHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCBDaGFyYWN0ZXJNYW5hZ2VyIGZyb20gXCIuLy4uL0dhbWVNYW5hZ2VyL0NoYXJhY3Rlck1hbWFnZXJcIlxyXG5pbXBvcnQgSXRlbU1hbmFnZXIgZnJvbSBcIi4vLi4vR2FtZU1hbmFnZXIvSXRlbU1hbmFnZXJcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQVBQXHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IENoYXJhY3Rlck1ncigpOkNoYXJhY3Rlck1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gQ2hhcmFjdGVyTWFuYWdlci5NZ3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBJdGVtTWdyKCk6SXRlbU1hbmFnZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gSXRlbU1hbmFnZXIuTWdyO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtJdGVtfSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IHtHYW1lU3RydWN0fSBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3REZWxlZ2F0ZSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IFNldFBhbmVsVUkgZnJvbSBcIi4vLi4vdWkvU2V0UGFuZWxVSVwiXHJcbmltcG9ydCBSYW5rUGFuZWxVSSBmcm9tIFwiLi8uLi91aS9SYW5rUGFuZWxVSVwiXHJcbmltcG9ydCBDaGFyYWN0ZXJVSSBmcm9tIFwiLi8uLi91aS9DaGFyYWN0ZXJVSVwiXHJcbmltcG9ydCBHYW1lU2NlbmUgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZVNjZW5lXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuL0FQUFwiXHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuaW1wb3J0IEVudGVyR2FtZVVJIGZyb20gXCIuLi91aS9FbnRlckdhbWVVSVwiO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4uL0dhbWUvR2FtZU1vZHVsZVwiO1xyXG5cclxudHlwZSBJdGVtVHlwZSA9IEl0ZW0uSXRlbVR5cGU7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRyb2xlclxyXG57XHJcbiAgICBzdGF0aWMgZ2V0IEdhbWVDb250cm9sZXIoKTpHYW1lQ29udHJvbGVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBHYW1lQ29udHJvbGVyLk1ncjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR2FtZUNvbnRyb2xlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfTWdyOiBHYW1lQ29udHJvbGVyO1xyXG4gICAgc3RhdGljIGdldCBNZ3IoKTogR2FtZUNvbnRyb2xlciB7XHJcbiAgICAgICAgaWYgKEdhbWVDb250cm9sZXIuX01nciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIEdhbWVDb250cm9sZXIuX01nciA9IG5ldyBHYW1lQ29udHJvbGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBHYW1lQ29udHJvbGVyLl9NZ3I7XHJcbiAgICB9XHJcbiAgICBfTGluZVN0ZXBOdW06bnVtYmVyO1xyXG4gICAgX01heExpbmVOdW06bnVtYmVyO1xyXG4gICAgX1N0ZXBMZW5ndGg6bnVtYmVyO1xyXG4gICAgX1N0ZXBEaXN0YW5jZTpudW1iZXI7XHJcbiAgICBfUGxheWVyTW92ZVRpbWU6bnVtYmVyO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgLy/luLjph4/lrprkuYlcclxuICAgIC8v5q+P6KGM5pyA5aSn5qC85a2Q5pWwXHJcbiAgICBnZXQgTGluZVN0ZXBOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX0xpbmVTdGVwTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTGluZVN0ZXBOdW0gPSA1KzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9MaW5lU3RlcE51bTtcclxuICAgIH0gXHJcbiAgICAvL+acgOWkp+ihjOaVsFxyXG4gICAgZ2V0IE1heExpbmVOdW0oKTogbnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuX01heExpbmVOdW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9NYXhMaW5lTnVtID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9NYXhMaW5lTnVtO1xyXG4gICAgfSBcclxuICAgIFxyXG4gICAgLy/moLzlrZDovrnplb9cclxuICAgIGdldCBTdGVwTGVuZ3RoKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1N0ZXBMZW5ndGgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9TdGVwTGVuZ3RoID0gMC45ODtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1N0ZXBMZW5ndGg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v546p5a6256e75Yqo5pe26Ze0XHJcbiAgICBnZXQgUGxheWVyTW92ZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICBpZighdGhpcy5fUGxheWVyTW92ZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9QbGF5ZXJNb3ZlVGltZSA9IDAuMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1BsYXllck1vdmVUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIFNldFBsYXllcklEKGlkOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgZ3Vlc3RBZ2VudDpQbGF5ZXJHdWVzdEFnZW50ID0gUGxheWVyR3Vlc3REZWxlZ2F0ZS5HdWVzdEFnZW50O1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJMaXN0OkFycmF5PG51bWJlcj4gPSBndWVzdEFnZW50LkNoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgaWYoIWNoYXJhY3Rlckxpc3RbaWRdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoIWd1ZXN0QWdlbnQuQnV5Q2hhcmFjdGVyKGlkKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGd1ZXN0QWdlbnQuU2V0Q2hhcmFjdGVyKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+aYvuekuuiuvue9rumdouadv1xyXG4gICAgU2hvd1NldFBhbmVsKCkge1xyXG4gICAgICAgIHZhciBQYW5lbCA9IEFQUC5VSU1hbmFnZXIuU2hvdzxTZXRQYW5lbFVJPihTZXRQYW5lbFVJKTsvLyBuZXcgU2V0UGFuZWwoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/mmL7npLrmjpLooYzmppzpnaLmnb9cclxuICAgIFNob3dSYW5rUGFuZWwoKSB7XHJcbiAgICAgICAgLy8gaWYoIUxheWEuQnJvd3Nlci5vbldlaVhpbiB8fCB0eXBlb2Ygd3ggPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHZhciBQYW5lbCA9IEFQUC5VSU1hbmFnZXIuU2hvdzxSYW5rUGFuZWxVST4oUmFua1BhbmVsVUkpOy8vIG5ldyBTZXRQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+aYvuekuuinkuiJsumdouadv1xyXG4gICAgcHVibGljIFNob3dDaGFyYWN0ZXJQYW5lbCgpIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyID0gQVBQLlVJTWFuYWdlci5TaG93PENoYXJhY3RlclVJPihDaGFyYWN0ZXJVSSk7XHJcbiAgICAgICAgcmV0dXJuIGNoYXJhY3RlcjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TZXRJbmZvO1xyXG4gICAgZ2V0IFNldEluZm8oKTogR2FtZVN0cnVjdC5TZXRJbmZvIHtcclxuICAgICAgICBpZiAodGhpcy5fU2V0SW5mbyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1NldEluZm8gPSBuZXcgR2FtZVN0cnVjdC5TZXRJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TZXRJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBTZXRJbmZvKHZhbHVlOiBHYW1lU3RydWN0LlNldEluZm8pIHtcclxuICAgICAgICB0aGlzLl9TZXRJbmZvID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kv53lrZjorr7nva7mlbDmja5cclxuICAgIFNhdmVTZXRJbmZvKGluZm86IEdhbWVTdHJ1Y3QuU2V0SW5mbykge1xyXG4gICAgICAgIHRoaXMuU2V0SW5mbyA9IGluZm87XHJcbiAgICB9XHJcblxyXG4gICAgLy/or7vlj5borr7nva7kv6Hmga9cclxuICAgIEdldFNldEluZm8oKTogR2FtZVN0cnVjdC5TZXRJbmZvIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5TZXRJbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIEVudGVyR2FtZVVJKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuRW50ZXJTY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgRW50ZXJHYW1lKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuRW50ZXJTY2VuZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEdhbWVEaXIoKTogR2FtZURpcmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gQVBQLlNjZW5lTWFuYWdlci5DdXJTY2VuZS5EaXJlY3RvciBhcyBHYW1lRGlyZWN0b3I7XHJcbiAgICB9XHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr+i1sOi/meS4quaOpeWPo1xyXG4gICAgRW50ZXJTY2VuZSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbmV3R2FtZVNjZW5lID0gbmV3IEdhbWVTY2VuZSgpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ2hhbmdlU2NlbmUobmV3R2FtZVNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUn+aIkEJVRkbooajnjrDmlYjmnpxcclxuICAgIEdlbkJ1ZmZFZmZlY3QodHlwZTogSXRlbVR5cGUpOiBMYXlhLlNwcml0ZTNEIHtcclxuICAgICAgICByZXR1cm4gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuICAgIH1cclxuXHJcbiAgICBCdXlJdGVtKGlkOm51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5CdXlJdGVtKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBUaW1lUGF1c2UoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoR2FtZU1vZHVsZS5FdmVudC5PblRpbWVQYXVzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgVGltZUNvbnRpbnVlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKEdhbWVNb2R1bGUuRXZlbnQuT25UaW1lQ29udGludWUpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBXZWNoYXRPcGVuIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyB3ZWNoYXRPcGVuOiBXZWNoYXRPcGVuID0gbnVsbDtcclxuICAgIHB1YmxpYyBkYXRhQ29udGV4dCA9IG51bGw7XHJcbiAgICBwcml2YXRlIGlzRHJhd1Jhbms6IGJvb2xlYW4gLy8g5piv5ZCm5byA5aeL57uY55S75o6S6KGM5qac5YaF5a65XHJcblxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmlzRHJhd1JhbmsgPSBmYWxzZTtcclxuICAgICAgICBpZih0eXBlb2Ygd3ggIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFDb250ZXh0ID0gd2luZG93W1wid3hcIl0uZ2V0T3BlbkRhdGFDb250ZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN5a+56LGh5a6e5YiXXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2VzKCk6IFdlY2hhdE9wZW4ge1xyXG4gICAgICAgIGlmKCFXZWNoYXRPcGVuLndlY2hhdE9wZW4pIHtcclxuICAgICAgICAgICAgV2VjaGF0T3Blbi53ZWNoYXRPcGVuID0gbmV3IFdlY2hhdE9wZW4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFdlY2hhdE9wZW4ud2VjaGF0T3BlblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGVTY29yZShzY29yZTphbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlVG9PcGVuKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJ1cGRhdGVcIixcclxuICAgICAgICAgICAgc2NvcmU6IHNjb3JlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXdwYXNzKHNjb3JlOmFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImRyYXdwYXNzXCIsXHJcbiAgICAgICAgICAgIHNjb3JlOiBzY29yZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcmNhbnZhc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwiY2xlYXJjYW52YXNlXCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VSYW5rKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImNsb3NlXCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvd1JhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcInJhbmdlXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBjbGVhclNjb3JlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImNsZWFyU2NvcmVcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvcGVuUmFuaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlVG9PcGVuKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJvcGVuXCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBvc3RNZXNzYWdlVG9PcGVuKGRhdGEpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmRhdGFDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YUNvbnRleHQucG9zdE1lc3NhZ2UoZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUVsZW1lbnQgZXh0ZW5kcyBMYXlhLkJveCB7XHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1JZHg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX0J0bjogTGF5YS5CdXR0b247XHJcbiAgICBwcml2YXRlIF9JbWc6IExheWEuSW1hZ2U7XHJcbiAgICBwcml2YXRlIG1fTnVtTGFiZWw6IExheWEuTGFiZWw7XHJcbiAgICBwcml2YXRlIG1fTGFiZWxTdHJpbmc6IHN0cmluZ1tdO1xyXG4gICAgcHJpdmF0ZSBtX0J1eUl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIHByaXZhdGUgbV9DaG9vc2VJdGVtOiBNZXNzYWdlTUQuRGVsZWdhdGU7XHJcblxyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J0biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgSXRlbUlkeChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1JZHggPSBpZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBJbWcoKTogTGF5YS5JbWFnZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0ltZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQnV5QnRuKCk6IExheWEuQnV0dG9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQnRuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBCdG5MYWJsZShzdHI6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCFzdHIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9CdG4udGV4dC50ZXh0ID0gc3RyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBJc0dyYXkodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLkltZy5ncmF5ID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IElzR3JheSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5JbWcuZ3JheTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgTnVtKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX0xhYmVsU3RyaW5nWzFdID0gXCJcIiArIG51bTtcclxuICAgICAgICB0aGlzLm1fTnVtTGFiZWwudGV4dCA9IHRoaXMubV9MYWJlbFN0cmluZ1swXSArIHRoaXMubV9MYWJlbFN0cmluZ1sxXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgUHJpY2UobnVtOiBudW1iZXIpICB7XHJcbiAgICAgICAgdGhpcy5fQnRuLnRleHQudGV4dCA9IFwiXCIgKyBudW07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIEluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5fSW1nID0gdGhpcy5nZXRDaGlsZEF0KDApIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgdGhpcy5fQnRuID0gdGhpcy5nZXRDaGlsZEF0KDEpIGFzIExheWEuQnV0dG9uO1xyXG4gICAgICAgIHRoaXMubV9OdW1MYWJlbCA9IHRoaXMuZ2V0Q2hpbGRBdCgyKSBhcyBMYXlhLkxhYmVsO1xyXG4gICAgICAgIHRoaXMuX0J0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkJ1eUl0ZW0pO1xyXG4gICAgICAgIHRoaXMuX0ltZy5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLkNob29zZUltZyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLm1fTGFiZWxTdHJpbmcpICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9MYWJlbFN0cmluZyA9IHRoaXMubV9OdW1MYWJlbC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENob29zZUltZygpIHtcclxuICAgICAgICBpZiAodGhpcy5tX0Nob29zZUl0ZW0pXHJcbiAgICAgICAgICAgIHRoaXMubV9DaG9vc2VJdGVtLkV4ZWN1dGUodGhpcy5tX0l0ZW1JZHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlJdGVtKCkge1xyXG4gICAgICAgIGlmICh0aGlzLm1fQnV5SXRlbSlcclxuICAgICAgICAgICAgdGhpcy5tX0J1eUl0ZW0uRXhlY3V0ZSh0aGlzLm1fSXRlbUlkeCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdEJ1eShvd25lcjogYW55LCBsaXN0ZW5lcjogKGlkOiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICB2YXIgbmV3RGVsZWdhdGUgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5tX0J1eUl0ZW0gPSBuZXdEZWxlZ2F0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0Q2hvb3NlKG93bmVyOiBhbnksIGxpc3RlbmVyOiAoaWQ6IG51bWJlcikgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciBuZXdEZWxlZ2F0ZSA9IG5ldyBNZXNzYWdlTUQuRGVsZWdhdGUob3duZXIsIGxpc3RlbmVyKTtcclxuICAgICAgICB0aGlzLm1fQ2hvb3NlSXRlbSA9IG5ld0RlbGVnYXRlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZUVsZW1lbnQgZXh0ZW5kcyBMYXlhLkltYWdlIHtcclxuICAgIC8vXHJcbiAgICBwcml2YXRlIF9CdG46IExheWEuQnV0dG9uO1xyXG4gICAgcHJpdmF0ZSBfSW1nOiBMYXlhLkltYWdlO1xyXG4gICAgcHJpdmF0ZSBtX09uQ2xpY2tJbWc6KGlkOm51bWJlcik9PnZvaWQ7XHJcbiAgICBwcml2YXRlIG1fQ2hhcmFjdGVySUQ6bnVtYmVyO1xyXG4gICAgZ2V0IEJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0J0biA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICAgICAgdGhpcy5fQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRQbGF5ZXJJRCh0aGlzLm1fQ2hhcmFjdGVySUQpO1xyXG4gICAgICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuXHJcbiAgICBSZXNldCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX0ltZykge1xyXG4gICAgICAgICAgICB0aGlzLkluaXQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0R3JheShpc0dyYXk6Ym9vbGVhbilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9JbWcuZ3JheSA9IGlzR3JheTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVnaXN0T25JbWdDbGljayhldmVudEZ1bmN0aW9uOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBpZD10aGlzLm1fQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdGhpcy5fSW1nLm9uKExheWEuRXZlbnQuQ0xJQ0ssbnVsbCxldmVudEZ1bmN0aW9uKTsvLyBvd25lciwgKCk9PnsgZXZlbnRGdW5jdGlvbihpZCkgfSApXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBDaGFyYWN0ZXJJRChpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3RlcklEID0gaWQ7XHJcbiAgICB9XHJcbiAgICBJbml0KCkgIHtcclxuICAgICAgICB0aGlzLl9JbWcgPSB0aGlzLmdldENoaWxkQXQoMCkgYXMgTGF5YS5JbWFnZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnR7QmFzZUZ1bmN9IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUZ1bmNcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQkdVSSBleHRlbmRzIHVpLkJHVUkge1xyXG4gICAgXHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkJHXCIpKSk7XHJcbiAgICB9XHJcbiAgICAvL3ByaXZhdGUgX1NreUFycjpBcnJheTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9Ta3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1RlbXBTa3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPjtcclxuICAgIHByaXZhdGUgX1NjYWxlU2t5Om51bWJlcjtcclxuICAgIHByaXZhdGUgX1NjYWxlRWFydGg6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfRWFydGhTdGFydFBTOm51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGJnOiBMYXlhLkltYWdlO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgd2lkaCA9IExheWEuc3RhZ2Uud2lkdGggO1xyXG4gICAgICAgIHZhciByYXRlID0gTWF0aC5jZWlsKExheWEuc3RhZ2UuaGVpZ2h0L3dpZGgpO1xyXG5cclxuICAgICAgICB0aGlzLl9Ta3lRdWUgPSBuZXcgQmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPigpO1xyXG4gICAgICAgIHRoaXMuX1RlbXBTa3lRdWUgPSBuZXcgQmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPigpO1xyXG4gICAgICAgICAvL25ldyBBcnJheTxMYXlhLkltYWdlPihyYXRlKzEpO1xyXG4gICAgICAgIGZvcihsZXQgc3RhcnRJZHggPSAwO3N0YXJ0SWR4PHJhdGUrMTsgKytzdGFydElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2U6TGF5YS5JbWFnZSA9IG5ldyBMYXlhLkltYWdlKCk7XHJcbiAgICAgICAgICAgIC8vaW1hZ2UubG9hZEltYWdlKFwiY29tcC9pbWdfYmFja2dyb3VuZF9zcHJfc2t5LnBuZ1wiKTtcclxuICAgICAgICAgICAgaW1hZ2UubG9hZEltYWdlKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgXCJtYWluYmcuanBnXCIpO1xyXG4gICAgICAgICAgICBpbWFnZS53aWR0aCA9IHdpZGg7XHJcbiAgICAgICAgICAgIGltYWdlLmhlaWdodCA9IHdpZGgrd2lkaCowLjAxO1xyXG4gICAgICAgICAgICBpbWFnZS5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChpbWFnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYmcgPSBpbWFnZTtcclxuICAgICAgICAgICAgLy90aGlzLl9Ta3lRdWUuUHVzaChpbWFnZSk7XHJcbiAgICAgICAgfSBcclxuICAgICAgICB0aGlzLlNldFNreSgwKTtcclxuICAgICAgICB2YXIgZWFydGggPSBuZXcgTGF5YS5JbWFnZSgpO1xyXG4gICAgICAgIGVhcnRoLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fRWFydGhTdGFydFBTID0gZWFydGgueTtcclxuICAgICAgICAvL2VhcnRoLmxvYWRJbWFnZShcImNvbXAvaW1nX2JhY2tncm91bmRfc3ByLnBuZ1wiKTtcclxuICAgICAgICBlYXJ0aC5sb2FkSW1hZ2UoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyBcIm1haW5iZy5qcGdcIik7XHJcbiAgICAgICAgdGhpcy5fRWFydGggPSBlYXJ0aDtcclxuICAgICAgICBlYXJ0aC53aWR0aCA9IHdpZGg7XHJcbiAgICAgICAgZWFydGguaGVpZ2h0ID0gd2lkaDtcclxuXHJcbiAgICAgICAgLy90aGlzLmFkZENoaWxkKGVhcnRoKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLl9TY2FsZVNreSA9IDAuMDAxXHJcbiAgICAgICAgdGhpcy5fU2NhbGVFYXJ0aCA9IDAuMDFcclxuICAgICAgICAvL3RoaXMuX0VhcnRoU3RhcnRQUyA9IHRoaXMuX0VhcnRoLnk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwYXRlQmdUZXh0dXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYmcubG9hZEltYWdlKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgXCJtYWluYmcuanBnXCIpXHJcbiAgICB9XHJcblxyXG4gICAgLypcclxuICAgIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIGZvcihsZXQgc3RhcnRJZHg6bnVtYmVyID0gMDtzdGFydElkeDx0aGlzLl9Ta3lRdWUuQ291bnQ7KytzdGFydElkeCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9Ta3lBcnJbc3RhcnRJZHhdLnkgPSBzdGFydElkeCAqIGhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fRWFydGgueSA9IExheWEuc3RhZ2UuaGVpZ2h0IC0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9FYXJ0aFN0YXJ0UFMgPSB0aGlzLl9FYXJ0aC55O1xyXG4gICAgfSovXHJcbiAgICAvL+mrmOW6pui9rOWxj+W5lemrmOW6puWDj+e0oFxyXG4gICAgSGVpZ2h0VHJhbnNQaXgoIGhlaWdodDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGhlaWdodCotMC4xO1xyXG4gICAgfVxyXG4gICAgU2V0U2t5KHBpeEhlaWdodDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHRlbVNreVF1ZTpCYXNlRnVuYy5Ob2RlUXVldWU8TGF5YS5TcHJpdGU+ID0gdGhpcy5fVGVtcFNreVF1ZTtcclxuICAgICAgICB0ZW1Ta3lRdWUuQ2xlYXIoKTtcclxuICAgICAgICB2YXIgY291bnQ6bnVtYmVyID0gMDtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB3aGlsZSh0aGlzLl9Ta3lRdWUuQ291bnQ+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOkJhc2VGdW5jLk5vZGU8TGF5YS5TcHJpdGU+ID0gdGhpcy5fU2t5UXVlLlBvcE5vZGUoKTtcclxuICAgICAgICAgICAgdmFyIHNreUltZzpMYXlhLlNwcml0ZSA9IG5vZGUuVmFsdWU7XHJcbiAgICAgICAgICAgIHNreUltZy55ID0gY291bnQgKiBoZWlnaHQgKyBwaXhIZWlnaHQgLSBoZWlnaHQgLSBoZWlnaHQqMC4wMTtcclxuICAgICAgICAgICAgdGVtU2t5UXVlLlB1c2hOb2RlKG5vZGUpO1xyXG4gICAgICAgICAgICBpZihza3lJbWcueT5MYXlhLnN0YWdlLmhlaWdodClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2t5SW1nLnkgPSB0ZW1Ta3lRdWUuSGVhZFZhbHVlLnkgLSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKytjb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVGVtcFNreVF1ZSA9IHRoaXMuX1NreVF1ZTtcclxuICAgICAgICB0aGlzLl9Ta3lRdWUgPSB0ZW1Ta3lRdWU7XHJcbiAgICB9XHJcbiAgICBTZXRFYXJ0aChoZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0VhcnRoLnkgPSB0aGlzLl9FYXJ0aFN0YXJ0UFMgKyBoZWlnaHQ7XHJcbiAgICB9XHJcbiAgICBVcGRhdGVQYWdlKCBoZWlnaHQ6bnVtYmVyIClcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIC8vaGVpZ2h0ID0gdGhpcy5IZWlnaHRUcmFuc1BpeChoZWlnaHQpO1xyXG4gICAgICAgIC8vdmFyIHNreUhlaWdodFBpeCA9IGhlaWdodCp0aGlzLl9TY2FsZVNreTtcclxuICAgICAgICB0aGlzLlNldFNreShoZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuU2V0RWFydGgoaGVpZ2h0KTtcclxuICAgICAgICAvL3ZhciBlYXJ0aEhlaWdodFBpeCA9IGhlaWdodDtcclxuXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtVSUZ1bmN9IGZyb20gXCIuLy4uL1V0aWxpdHkvVUlGdW5jXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuXHJcbi8vVUnln7rnsbtcclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgQmFzZVVJIGV4dGVuZHMgTGF5YS5Cb3hcclxue1xyXG4gICAgXHJcbiAgICBcclxuICAgIC8vXHJcbiAgICBwcm90ZWN0ZWQgX1VJVHlwZTpCYXNlRW51bS5VSVR5cGVFbnVtO1xyXG4gICAgcHJvdGVjdGVkIF9Jc011dGV4OmJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX05hbWU6c3RyaW5nOyAgICBcclxuICAgIHByb3RlY3RlZCBfVUlNYW5hZ2VyOlVJTWFuYWdlclxyXG4gICAgcHJpdmF0ZSBfRGlydHk6Ym9vbGVhbjtcclxuICAgIHByaXZhdGUgX1Nob3dpbmc6Ym9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5Mb3c7XHJcbiAgICAgICAgdGhpcy5fSXNNdXRleCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX05hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX1VJTWFuYWdlciA9IEZXLkZNLkdldE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuX1Nob3dpbmcgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMubGVmdCA9IDA7XHJcblx0ICAgIC8vIHRoaXMucmlnaHQgPSAwO1xyXG5cdFx0Ly8gdGhpcy5ib3R0b20gPSAwO1xyXG4gICAgICAgIC8vIHRoaXMudG9wID0gMDtcclxuICAgIH1cclxuICAgIEhpZGUoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuT1AoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5PcGVuKCk7XHJcbiAgICB9XHJcbiAgICBDbG9zZU9QKClcclxuICAgIHtcclxuICAgICAgICAvL3RoaXMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBEZXN0cm95KCApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IFVJVHlwZSgpOkJhc2VFbnVtLlVJVHlwZUVudW1cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUlUeXBlO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZXQgSXNNdXRleCgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fSXNNdXRleDtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9OYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBTaG93aW5nKCk6Ym9vbGVhblxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9TaG93aW5nO1xyXG4gICAgfVxyXG5cclxuICAgIExheW91dCgpXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+5VUnov5vooYzpgILphY1cclxuICAgICAqIEBwYXJhbSBVSSDpgILphY1VSVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgRml4VUkoVUk6TGF5YS5WaWV3KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoVUkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIFNldERpcnR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBEaXJ0eSgpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fRGlydHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIENsZWFyRGlydHkoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBVSVVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9EaXJ0eSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xlYXJEaXJ0eSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IFVwZGF0ZSgpOnZvaWQ7XHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgR2FtZUNvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIjtcclxuaW1wb3J0IEZXIGZyb20gXCIuLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi8uLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIiBcclxuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQVBQXCI7XHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi9FbnRlckdhbWVVSVwiO1xyXG5pbXBvcnQgQ2hhcmFjdGVyVUlTY2VuZSBmcm9tIFwiLi4vU2NlbmUvQ2hhcmFjdGVyVUlTY2VuZVwiO1xyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuL0VuZEdhbWVVSVwiO1xyXG5pbXBvcnQgQ2hhcmFjdGVyTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvQ2hhcmFjdGVyTWFtYWdlclwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclwiO1xyXG5pbXBvcnQgVUlCdXR0b25Ub3VjaEV2ZW50IGZyb20gXCIuLi9VdGlsaXR5L1VJQnV0dG9uVG91Y2hFdmVudFwiO1xyXG5cclxuY2xhc3MgRXh0ZW5kQ2hhcmFjdGVyc1VJIGV4dGVuZHMgdWkuQ2hhcmFjdGVyVUkge1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJDaGFyYWN0ZXJcIikpKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFyYWN0ZXJVSSBleHRlbmRzIEJhc2VVSSB7XHJcblxyXG4gICAgcHJpdmF0ZSBtX0NoYXJhY3Rlckxpc3Q6IEFycmF5PGFueT47XHJcbiAgICBwcml2YXRlIG1fR29sZERpc2NyaWJlOiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgc3ByaXRlQmdBcnI6TGF5YS5TcHJpdGVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBjaGFyYWN0ZXJVSVNjZW5lOkNoYXJhY3RlclVJU2NlbmU7XHJcbiAgICBwcml2YXRlIGNudENoYXJhY3RlcklkOm51bWJlcjtcclxuICAgIHByaXZhdGUgX1VJOiBFeHRlbmRDaGFyYWN0ZXJzVUk7XHJcbiAgICBwcml2YXRlIGNudFNlbGVjdFNleDpudW1iZXIgPSAxO1xyXG5cclxuICAgIHByaXZhdGUgY29uZmlnID0ge1wiaW1nXCI6XHJcbiAgICAgICAgWyAgIFxyXG4gICAgICAgICAgICB7a2V5OlwiYmdcIix0ZXh0dXJlTmFtZTpcIm1haW5iZy5qcGdcIn1cclxuXHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcImJhY2tCdG5cIix0ZXh0dXJlTmFtZTpcImJhY2sucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiYnV5QnRuXCIsdGV4dHVyZU5hbWU6XCJidXkucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5Olwic3RhcnRHYW1lXCIsdGV4dHVyZU5hbWU6XCJzdGFydC5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJjaGFyYWN0ZXJyb2xlMGJnXCIsdGV4dHVyZU5hbWU6XCJyb2xlYmdjaXJjbGUucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiY2hhcmFjdGVycm9sZTFiZ1wiLHRleHR1cmVOYW1lOlwicm9sZWJnY2lyY2xlLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImNoYXJhY3RlcnJvbGUyYmdcIix0ZXh0dXJlTmFtZTpcInJvbGViZ2NpcmNsZS5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJjaGFyYWN0ZXJyb2xlM2JnXCIsdGV4dHVyZU5hbWU6XCJyb2xlYmdjaXJjbGUucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiY2hhcmFjdGVycm9sZTRiZ1wiLHRleHR1cmVOYW1lOlwicm9sZWJnY2lyY2xlLnBuZ1wifVxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kQ2hhcmFjdGVyc1VJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5HZXRDaGFyYWN0ZXJMaXN0KCk7XHJcbiAgICAgICAgLy90aGlzLlNldExpc3QoKTtcclxuICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyTGlzdCA9IFtdO1xyXG4gICAgICAgIC8vdGhpcy5tX0dvbGREaXNjcmliZSA9IHRoaXMuX1VJLl9Hb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuT25Nb25leUNoYW5nZSgpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnRleHQgPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXkgKyBcIlwiO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnN0cm9rZSA9IDI7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dvbGQuc3Ryb2tlQ29sb3IgPSBcIjB4ZmYwMDAwXCI7XHJcblxyXG4gICAgICAgIHRoaXMuX1VJLmJhY2tCdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5CYWNrR2FtZUJ0bik7XHJcbiAgICAgICAgdGhpcy5fVUkuX0xpc3QudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLl9VSS5uYW5CdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5uYW5CdG5FdmVudCk7XHJcbiAgICAgICAgdGhpcy5fVUkubnZCdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5udkJ0bkV2ZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGVCZ0Fyci5wdXNoKHRoaXMuX1VJLmNoYXJhY3RlcnJvbGUwYmcpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQmdBcnIucHVzaCh0aGlzLl9VSS5jaGFyYWN0ZXJyb2xlMWJnKTtcclxuICAgICAgICB0aGlzLnNwcml0ZUJnQXJyLnB1c2godGhpcy5fVUkuY2hhcmFjdGVycm9sZTJiZyk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVCZ0Fyci5wdXNoKHRoaXMuX1VJLmNoYXJhY3RlcnJvbGUzYmcpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQmdBcnIucHVzaCh0aGlzLl9VSS5jaGFyYWN0ZXJyb2xlNGJnKTtcclxuXHJcbiAgICAgICAgdGhpcy51cGRhdGVOYW5OdkJ0blN0YXRlKCk7XHJcblxyXG4gICAgICAgIHZhciBsZW4gPSB0aGlzLnNwcml0ZUJnQXJyLmxlbmd0aDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS5uYW1lID0gaSArIFwiXCI7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5zZWxlY3RSb2xlUG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNudENoYXJhY3RlcklkID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkNoYXJhY3RlcklEO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUm9sZUluZm8odGhpcy5jbnRDaGFyYWN0ZXJJZCk7XHJcblxyXG4gICAgICAgIHRoaXMuX1VJLnN0YXJ0R2FtZS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLnN0YXJ0RXZlbnQpO1xyXG4gICAgICAgIHRoaXMuX1VJLmJ1eUJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2xpY2tJbWcpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fVUkubmFuQnRuLmFuY2hvclggPSB0aGlzLl9VSS5uYW5CdG4uYW5jaG9yWSA9ICB0aGlzLl9VSS5udkJ0bi5hbmNob3JYID0gdGhpcy5fVUkubnZCdG4uYW5jaG9yWSA9IDAuNTtcclxuXHJcbiAgICAgICAgVUlCdXR0b25Ub3VjaEV2ZW50LmFkZEJ1dHRvblRvdWNoRXZlbnQodGhpcy5fVUkubmFuQnRuKTtcclxuICAgICAgICBVSUJ1dHRvblRvdWNoRXZlbnQuYWRkQnV0dG9uVG91Y2hFdmVudCh0aGlzLl9VSS5udkJ0bik7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlTmFuTnZCdG5TdGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmNudFNlbGVjdFNleCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLm5hbkJ0bi5ncmF5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLm52QnRuLmdyYXkgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkubmFuQnRuLmdyYXkgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5udkJ0bi5ncmF5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG52QnRuRXZlbnQoZTogTGF5YS5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY250U2VsZWN0U2V4ID09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNudFNlbGVjdFNleCA9IDE7XHJcbiAgICAgICAgdGhpcy51cGRhdGVOYW5OdkJ0blN0YXRlKCk7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lICYmIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS51cGRhdGVTZWxlY3RTZXgodGhpcy5jbnRTZWxlY3RTZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIG5hbkJ0bkV2ZW50KGU6IExheWEuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmNudFNlbGVjdFNleCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RTZXggPSAwO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTmFuTnZCdG5TdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZSAmJiB0aGlzLmNoYXJhY3RlclVJU2NlbmUudXBkYXRlU2VsZWN0U2V4KHRoaXMuY250U2VsZWN0U2V4KTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxmU2NlbmVVSSgpIHtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5jb25maWdba2V5XS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PSBcImltZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1VJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1VJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5sb2FkSW1hZ2UoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGtleSA9PSBcImJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1VJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5za2luID0gKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRFdmVudCgpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmNudFNlbGVjdFNleCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jbnRTZWxlY3RJbmRleCArPTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TZXRQbGF5ZXJJRCh0aGlzLmNoYXJhY3RlclVJU2NlbmUuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2UodGhpcyk7XHJcbiAgICAgICAgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkVudGVyR2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrSXNMb2NrKGlkKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIGlmKGNoYXJhY3RlcltpZF0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVSb2xlSW5mbyhpZCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY2hlY2tJc0xvY2soaWQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLnN0YXJ0R2FtZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkuYnV5QnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkuZ29sZGltZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLnJvbGV1c2VOb25leS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkucm9sZXVzZU5vbmV5LnRleHQgPSBcIuW3suino+mUgVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuc3RhcnRHYW1lLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkuYnV5QnRuLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5nb2xkaW1nLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLnJvbGV1c2VOb25leS50ZXh0ID0gQ2hhcmFjdGVyTWFuYWdlci5NZ3IuR2V0UHJpY2UodGhpcy5jbnRDaGFyYWN0ZXJJZCkgKyBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5yb2xlTmFtZS50ZXh0ID0gQ2hhcmFjdGVyTWFuYWdlci5NZ3IuR2V0TmFtZShpZCk7XHJcbiAgICAgICAgdGhpcy5fVUkuZGVzYy50ZXh0ID0gQ2hhcmFjdGVyTWFuYWdlci5NZ3IuR2V0RGVzYyhpZCk7XHJcbiAgICAgICAgdGhpcy5fVUkuX0dvbGQudGV4dCA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leSArIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgc2VsZWN0Um9sZVBvc2l0aW9uKGU6TGF5YS5FdmVudCk6IHZvaWQgeyBcclxuICAgICAgICB2YXIgY250VGFyZ2V0ID0gZS5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlclVJU2NlbmUgfHwgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4ID09IHBhcnNlSW50KGNudFRhcmdldC5uYW1lKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1VJLnN0YXJ0R2FtZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuYnV5QnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9VSS5nb2xkaW1nLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUudXBkYXRlU2VsZWN0SW5kZXgocGFyc2VJbnQoY250VGFyZ2V0Lm5hbWUpKTtcclxuICAgICAgICB0aGlzLkluaXRQb3NpdGlvbihudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBJbml0UG9zaXRpb24oZGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGlmKCF0aGlzLmNoYXJhY3RlclVJU2NlbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250Q2hhcmFjdGVySWQgPSB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY250U2VsZWN0SW5kZXg7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9sZUluZm8odGhpcy5jbnRDaGFyYWN0ZXJJZCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG51bSA9IHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5hcnJheURpcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgNTtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBfb3V0UG9zOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNhbWVyYS52aWV3cG9ydC5wcm9qZWN0KHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5hcnJheURpc1tpXS50cmFuc2Zvcm0ucG9zaXRpb24sIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jYW1lcmEucHJvamVjdGlvblZpZXdNYXRyaXgsIF9vdXRQb3MpO1xyXG4gICAgICAgICAgICB2YXIgX291dFBvczEgPSBuZXcgTGF5YS5Qb2ludChfb3V0UG9zLngsIF9vdXRQb3MueSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmxheW91dGJnLmdsb2JhbFRvTG9jYWwoX291dFBvczEpO1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLnBvcyhfb3V0UG9zMS54IC8gTGF5YS5zdGFnZS5jbGllbnRTY2FsZVgsIF9vdXRQb3MxLnkgLyBMYXlhLnN0YWdlLmNsaWVudFNjYWxlWSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0ucGl2b3RYID0gMjA3IC8gMjtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS5waXZvdFkgPSB0aGlzLnNwcml0ZUJnQXJyW2ldLmhlaWdodCAtIDU7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0udmlzaWJsZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLnNjYWxlWCA9IDAuOCArICgodGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmFycmF5RGlzW2ldLnRyYW5zZm9ybS5sb2NhbFNjYWxlWCAtIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5pbml0U2NhbE51bSkgLyAwLjAwNCkgKiAwLjI7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0uc2NhbGVZID0gMC44ICsgKCh0aGlzLmNoYXJhY3RlclVJU2NlbmUuYXJyYXlEaXNbaV0udHJhbnNmb3JtLmxvY2FsU2NhbGVYIC0gdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmluaXRTY2FsTnVtKSAvIDAuMDA0KSAqIDAuMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQmFja0dhbWVCdG4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdG9wUm9hdGVUaW1lcigpO1xyXG4gICAgICAgIHZhciBlbnRlcnBhbmVsOkVudGVyR2FtZVVJID0gQVBQLlVJTWFuYWdlci5HZXRVSUJ5TmFtZShcIkVudGVyR2FtZVVJXCIpIGFzIEVudGVyR2FtZVVJO1xyXG4gICAgICAgIGVudGVycGFuZWwuX1VJLnkgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKGVudGVycGFuZWwuX1VJLCB7eTogMH0sIDUwMCwgTGF5YS5FYXNlLnNpbmVPdXQpO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcywge3k6IC1MYXlhLnN0YWdlLmhlaWdodH0sIDUwMCwgTGF5YS5FYXNlLnNpbmVPdXQsIExheWEuSGFuZGxlci5jcmVhdGUodGhpcywgKCk9PntcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgdGhpcy5fVUkucmVtb3ZlQ2hpbGQodGhpcy5jaGFyYWN0ZXJVSVNjZW5lKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wUm9hdGVUaW1lcigpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmNoYXJhY3RlclVJU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNsZWFyUm9hdGVUaW1lcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkNoYXJhY3RlclVJXCI7XHJcbiAgICB9XHJcblxyXG4gICAgR2V0Q2hhcmFjdGVyTGlzdCgpICB7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRJRExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgc3VwZXIuTGF5b3V0KCk7XHJcbiAgICAgICAgaWYoIXRoaXMuX1VJIHx8ICF0aGlzLl9VSS5iZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLmJnLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuXHJcbiAgICAgICAgdmFyIHNjYWxlWCA9IExheWEuc3RhZ2Uud2lkdGggLyBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB2YXIgc2NhbGVZID0gNzUwIC8gMTMzNDtcclxuICAgICAgICBpZihzY2FsZVggPiBzY2FsZVkpIHtcclxuICAgICAgICAgICAgc2NhbGVZID0gc2NhbGVZIC8gc2NhbGVYO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5sYXlvdXRiZy5waXZvdFggPSA3NTAgLyAyO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5sYXlvdXRiZy5waXZvdFkgPSAxMzM0IC8gMjtcclxuICAgICAgICAgICAgdmFyIF9vdXRQb3M6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY2FtZXJhLnZpZXdwb3J0LnByb2plY3QobmV3IExheWEuVmVjdG9yMygwLCAtdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLnN0YXJ0WSAtIDAuMDEsIDApLCB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY2FtZXJhLnByb2plY3Rpb25WaWV3TWF0cml4LCBfb3V0UG9zKTtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0YmcueCA9IF9vdXRQb3MueDtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0YmcueSA9IF9vdXRQb3MueTtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0Ymcuc2NhbGVYID0gdGhpcy5fVUkubGF5b3V0Ymcuc2NhbGVZID0gc2NhbGVZO1xyXG4gICAgICAgICAgICB0aGlzLkluaXRQb3NpdGlvbihudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCkgeyAgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBPcGVuKCkgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckNoYXJhY3RlcklEQ2hhbmdlLCB0aGlzLk9uTmVlZENsb3NlVUksIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsIHRoaXMuT25Nb25leUNoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DaGFyYWN0ZXJMaXN0Q2hhbmdlLCB0aGlzLk9uQ2hhbmdlTGlzdCwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lID0gbmV3IENoYXJhY3RlclVJU2NlbmUodGhpcy5jbnRDaGFyYWN0ZXJJZCAsIHRoaXMuSW5pdFBvc2l0aW9uLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS51cGRhdGVTZWxlY3RTZXgodGhpcy5jbnRTZWxlY3RTZXgpO1xyXG4gICAgICAgIHRoaXMuX1VJLmFkZENoaWxkKHRoaXMuY2hhcmFjdGVyVUlTY2VuZSk7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5zcHJpdGVCZ0Fyci5sZW5ndGg7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5Jbml0UG9zaXRpb24oKTtcclxuICAgICAgICB9LmJpbmQodGhpcyksIDUxMCk7XHJcbiAgICAgICAgdGhpcy5MYXlvdXQoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGZTY2VuZVVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2UoKSAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VyQ2hhcmFjdGVySURDaGFuZ2UsIHRoaXMuT25OZWVkQ2xvc2VVSSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSwgdGhpcy5Pbk1vbmV5Q2hhbmdlLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5PbkNoYXJhY3Rlckxpc3RDaGFuZ2UsIHRoaXMuT25DaGFuZ2VMaXN0LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S6i+S7tlxyXG4gICAgcHJpdmF0ZSBPbkNsaWNrSW1nKGlkOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jaGVja0lzTG9jayh0aGlzLmNoYXJhY3RlclVJU2NlbmUuY250U2VsZWN0SW5kZXgpKSAge1xyXG4gICAgICAgICAgICAvL3RoaXMuQmFja0dhbWVCdG4oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0UGxheWVySUQodGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICB0aGlzLk9uTW9uZXlDaGFuZ2UoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jbnRTZWxlY3RJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbk5lZWRDbG9zZVVJKCk6IHZvaWQgIHtcclxuICAgICAgICBpZiAoIXRoaXMuU2hvd2luZykgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkJhY2tHYW1lQnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbkNoYW5nZUxpc3QoKSAge1xyXG4gICAgICAgIGlmICghdGhpcy5TaG93aW5nKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnJlZnJlc2goKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25Nb25leUNoYW5nZSgpICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLm1fR29sZERpc2NyaWJlWzFdID0gXCJcIiArIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leTtcclxuICAgICAgICAvL3RoaXMuX1VJLl9Hb2xkLnRleHQgPSB0aGlzLm1fR29sZERpc2NyaWJlWzBdICsgdGhpcy5tX0dvbGREaXNjcmliZVsxXTtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC5zdHJva2UgPSAyO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnN0cm9rZUNvbG9yID0gXCIweGZmMDAwMFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7R2FtZVN0cnVjdCB9ICBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCI7XHJcblxyXG5jbGFzcyBFeHRlbmRFbmRHYW1lVUkgZXh0ZW5kcyB1aS5FbmRHYW1lVUkge1xyXG4gICAgUGFuZWw6TGF5YS5QYW5lbDtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiRW5kR2FtZVwiKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsID0gdGhpcy5QYW5lbDtcclxuICAgICAgICAvL3RoaXMuUGFuZWwudlNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fTWVudWVCdG4ub24oTGF5YS5FdmVudC5DTElDSyxHdWlkZXJNYW5hZ2VyLk1ncixHdWlkZXJNYW5hZ2VyLk1nci5FbnRlclNjZW5lKTtcclxuICAgICAgICB0aGlzLl9TZXRCdG4ub24oTGF5YS5FdmVudC5DTElDSyxDb250cm9sZXIuR2FtZUNvbnRyb2xlcixDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TaG93U2V0UGFuZWwpO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssQ29udHJvbGVyLkdhbWVDb250cm9sZXIsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuRW50ZXJHYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5kR2FtZVVJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiRW5kR2FtZVVJXCI7XHJcbiAgICB9XHJcbiAgICBVSTpFeHRlbmRFbmRHYW1lVUk7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25maWcgPSB7XCJpbWdcIjpcclxuICAgICAgICBbICAgXHJcbiAgICAgICAgICAgIHtrZXk6XCJiZ1wiLHRleHR1cmVOYW1lOlwibWFpbmJnLmpwZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImVuZGdhbWV0aXRsZVwiLHRleHR1cmVOYW1lOlwiZW5kZ2FtZWRhaXppLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImVuZGdhbWVoZW50aWFvXCIsdGV4dHVyZU5hbWU6XCJpbmZvdGlhby5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJlbmRnYW1lYmdpY29uXCIsdGV4dHVyZU5hbWU6XCJpbnB1dHRleHRhcmVhLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImRpYmdcIix0ZXh0dXJlTmFtZTpcImlucHV0dGV4dGFyZWEucG5nXCJ9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcIl9TdGFydEJ0blwiLHRleHR1cmVOYW1lOlwicmVzdGFydC5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJfTWVudWVCdG5cIix0ZXh0dXJlTmFtZTpcImhvbWVCdG4ucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiX1NldEJ0blwiLHRleHR1cmVOYW1lOlwic2V0dGluZy5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJfUGxheWVyTGlzdEJ0blwiLHRleHR1cmVOYW1lOlwicGFpaGFuZy5wbmdcIn1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZVNlbGZTY2VuZVVJKCkge1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmNvbmZpZ1trZXldLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYoa2V5ID09IFwiaW1nXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5sb2FkSW1hZ2UoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGtleSA9PSBcImJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLnNraW4gPSAoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLlVJPSBuZXcgRXh0ZW5kRW5kR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLlVJKTtcclxuICAgICAgICAvL3RoaXMuVUkuX0NoYXJhY3Rlckxpc3Qub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57IHRoaXMuX1VJTWFuYWdlci5TaG93PFBsYXllckxpc3RVST4oUGxheWVyTGlzdFVJKX0pO1xyXG4gICAgICAgIHRoaXMuTGF5b3V0KCk7XHJcbiAgICAgICAgdGhpcy5VSS5kaXN0YW5jZS50ZXh0ID0gR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuRGlzdGFuY2UgKyBcIlwiO1xyXG4gICAgICAgIHRoaXMuVUkuZ29sZC50ZXh0ID0gR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuR2FtZUdvbGQgKyBcIlwiO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIE9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIHN1cGVyLkxheW91dCgpO1xyXG4gICAgICAgIGlmKCF0aGlzLlVJIHx8ICF0aGlzLlVJLmJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5VSS5iZy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IEZNIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgUGxheWVyTGlzdFVJIGZyb20gXCIuLy4uL3VpL1BsYXllckxpc3RVSVwiXHJcbmltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IHsgR2FtZUFnZW50IH0gZnJvbSBcIi4vLi4vQWdlbnQvR2FtZUFnZW50XCJcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuaW1wb3J0IEVuZEdhbWVVSSBmcm9tIFwiLi9FbmRHYW1lVUlcIjtcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IHsgTW9kZWxGdW5jIH0gZnJvbSBcIi4uL1V0aWxpdHkvTW9kZWxGdW5jXCI7XHJcbmltcG9ydCBMb2FkVUlTY2VuZSBmcm9tIFwiLi9VbkRvd25sb2FkL0xvYWRVSVNjZW5lXCI7XHJcblxyXG5jbGFzcyBFeHRlbmRFbnRlckdhbWVVSSBleHRlbmRzIHVpLkVudGVyVUkge1xyXG4gICAgUGFuZWw6IExheWEuUGFuZWw7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkVudGVyXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vIHRoaXMuUGFuZWwgPSB0aGlzLl9QYW5lbDtcclxuICAgICAgICAvLyB0aGlzLlBhbmVsLnZTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICAvLyB0aGlzLlBhbmVsLmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXIub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5TaG93Q2hhcmFjdGVyUGFuZWwpO1xyXG4gICAgICAgIC8vdGhpcy5fQ2hhcmFjdGVyLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuc2hvd0NoYXJhY3Rlcik7XHJcbiAgICAgICAgdGhpcy5fU2V0UGFuZWwub24oTGF5YS5FdmVudC5DTElDSywgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1NldFBhbmVsKTtcclxuICAgICAgICAvL3RoaXMuX1Jhbmsub24oTGF5YS5FdmVudC5DTElDSywgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd1JhbmtQYW5lbCk7XHJcbiAgICAgICAgLy90aGlzLl9TdGFydC5vbihMYXlhLkV2ZW50LkNMSUNLLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0Lm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMub25TdGFydCk7XHJcblxyXG4gICAgICAgIHRoaXMuX0NoYXJhY3Rlckxpc3QudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbC52aXNpYmxlID0gZmFsc2U7IFxyXG4gICAgICAgIHRoaXMuX1N0YXJ0W1wiaW5pdFhcIl0gPSB0aGlzLl9TdGFydC54O1xyXG4gICAgICAgIHRoaXMuX0NoYXJhY3RlcltcImluaXRZXCJdID0gdGhpcy5fQ2hhcmFjdGVyLnk7XHJcbiAgICB9XHJcblxyXG4gICAgU2hvd0NoYXJhY3RlclBhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBub2RlID0gR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dDaGFyYWN0ZXJQYW5lbCgpO1xyXG4gICAgICAgIG5vZGUueSA9IC1MYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKG5vZGUsIHt5OiAwfSwgNTAwLCBMYXlhLkVhc2Uuc2luZU91dCk7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLCB7eTogTGF5YS5zdGFnZS5oZWlnaHR9LCA1MDAsIExheWEuRWFzZS5zaW5lT3V0KTtcclxuICAgIH1cclxuXHJcbiAgICBvblN0YXJ0KCk6dm9pZCB7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLl9SYW5rLCB7eTp0aGlzLl9SYW5rLnkgKyBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX0NoYXJhY3Rlci55fSwgMTUwLCBMYXlhLkVhc2Uuc2luZUluKTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX1NldFBhbmVsLCB7eTp0aGlzLl9TZXRQYW5lbC55ICArIExheWEuc3RhZ2UuaGVpZ2h0IC0gdGhpcy5fQ2hhcmFjdGVyLnl9LCAxNTAsIExheWEuRWFzZS5zaW5lSW4pO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fU3RhcnQsIHt4OnRoaXMuX1N0YXJ0LnkgICsgTGF5YS5zdGFnZS53aWR0aCAtIHRoaXMuX1N0YXJ0Lnh9LCAyNTAsIExheWEuRWFzZS5zaW5lSW4sIExheWEuSGFuZGxlci5jcmVhdGUoR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLCBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuRW50ZXJHYW1lKSk7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLl9DaGFyYWN0ZXIsIHt5OnRoaXMuX0NoYXJhY3Rlci55ICAtIExheWEuc3RhZ2UuaGVpZ2h0fSwgMTUwLCBMYXlhLkVhc2Uuc2luZUluKTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuYWR2LCB7eTp0aGlzLmFkdi55ICArIExheWEuc3RhZ2UuaGVpZ2h0IC0gdGhpcy5fQ2hhcmFjdGVyLnl9LCAxNTAsIExheWEuRWFzZS5zaW5lSW4pO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQkdbXCJ1cGF0ZUJnVGV4dHVyZVwiXSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRlckdhbWVVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIkVudGVyR2FtZVVJXCI7XHJcbiAgICB9XHJcblxyXG4gICAgX2drOkxheWEuU3ByaXRlO1xyXG4gICAgX2drQ29udGVudDpMYXlhLlNwcml0ZTtcclxuICAgIF9VSTogRXh0ZW5kRW50ZXJHYW1lVUk7XHJcbiAgICBsYXN0WDpudW1iZXIgPSA5OTk5OTtcclxuICAgIG9mZmVzdFg6bnVtYmVyID0gMDtcclxuICAgIGNudFNlbGVjdEluZGV4Om51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJsb2FkYmdzdGFydC5wbmdcIn1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnRuXCI6XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7a2V5OlwiX0NoYXJhY3RlclwiLHRleHR1cmVOYW1lOlwicm9sZS5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJfU3RhcnRcIix0ZXh0dXJlTmFtZTpcInN0YXJ0LnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcIl9TZXRQYW5lbFwiLHRleHR1cmVOYW1lOlwic2V0dGluZy5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJhZHZcIix0ZXh0dXJlTmFtZTpcImFkLnBuZ1wifVxyXG4gICAgICAgIF1cclxuICAgIH07XHJcblxyXG4gICAgcHJpdmF0ZSBtX0J0bkdyb3VwOiBBcnJheTxMYXlhLkltYWdlPjtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZEVudGVyR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdmFyIHVpTWdyOiBVSU1hbmFnZXIgPSB0aGlzLl9VSU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5tX0J0bkdyb3VwID0gW107XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9VSS5fUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpIGFzIExheWEuU3ByaXRlO1xyXG4gICAgICAgIHRoaXMuTGF5b3V0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgICAgIHRoaXMuX2drID0gY29udGVudDtcclxuICAgICAgICB0aGlzLl9VSS5fUGFuZWwubW91c2VFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9nay5tb3VzZUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQ3VyTGV2ZWwgLSAxO1xyXG4gICAgICAgIHRoaXMuX2drLnggPSAtdGhpcy5jbnRTZWxlY3RJbmRleCAqIDYzMDtcclxuICAgICAgICB0aGlzLmluaXRHS0xpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZSgpO1xyXG4gICAgICAgIGxheWEubWVkaWEuU291bmRNYW5hZ2VyLnBsYXlNdXNpYyhwYXRoLkdldFNvdW5kcGF0aFVJSlMoXCJiZ1wiKSwwKTsgICBcclxuICAgIH1cclxuXHJcbiAgICBpbml0R0tMaXN0ZW5lcigpIHtcclxuICAgICAgICAvL3RoaXMuX1VJLl9QYW5lbC5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMuZG93bkdLQm94KTtcclxuICAgICAgICAvL3RoaXMuX1VJLl9QYW5lbC5vbihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMubW92ZUdLQm94KTtcclxuICAgICAgICAvL3RoaXMuX1VJLl9QYW5lbC5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLCB0aGlzLCB0aGlzLnVwR0tCb3gpO1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX1BhbmVsLm9uKExheWEuRXZlbnQuTU9VU0VfT1ZFUiwgdGhpcywgdGhpcy51cEdLQm94KTtcclxuICAgICAgICB0aGlzLl9VSS5sYXN0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMubGFzdFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuX1VJLm5leHRCdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5uZXh0UGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQnV0dG9uU3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fVUkubGFzdEJ0bi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSS5uZXh0QnRuLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIGlmKHRoaXMuY250U2VsZWN0SW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5sYXN0QnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jbnRTZWxlY3RJbmRleCA9PSA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLm5leHRCdG4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZXh0UGFnZShlOkxheWEuRXZlbnQpIHtcclxuICAgICAgICBpZih0aGlzLmNudFNlbGVjdEluZGV4IDwgNCkge1xyXG4gICAgICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyVHdlZW4odGhpcy5fZ2spO1xyXG4gICAgICAgICAgICB0aGlzLl9nay54ID0gLXRoaXMuY250U2VsZWN0SW5kZXggKiA2MzA7XHJcbiAgICAgICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fZ2sse3g6LXRoaXMuY250U2VsZWN0SW5kZXggKiA2MzB9LDIwMCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkN1ckxldmVsID0gdGhpcy5jbnRTZWxlY3RJbmRleCArIDE7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0UGFnZShlOkxheWEuRXZlbnQpIHtcclxuICAgICAgICBpZih0aGlzLmNudFNlbGVjdEluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyVHdlZW4odGhpcy5fZ2spO1xyXG4gICAgICAgICAgICB0aGlzLl9nay54ID0gLXRoaXMuY250U2VsZWN0SW5kZXggKiA2MzA7XHJcbiAgICAgICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fZ2sse3g6LXRoaXMuY250U2VsZWN0SW5kZXggKiA2MzB9LDIwMCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkN1ckxldmVsID0gdGhpcy5jbnRTZWxlY3RJbmRleCArIDE7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3duR0tCb3goZTpMYXlhLkV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5sYXN0WCA9IGUudGFyZ2V0Lm1vdXNlWDtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlR0tCb3goZTogTGF5YS5FdmVudCkge1xyXG4gICAgICAgIGlmKHRoaXMubGFzdFggPT0gOTk5OTkgfHwgdGhpcy5fZ2sueCA+IDAgfHwgdGhpcy5fZ2sueCA8IC02MzAgKiA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vZmZlc3RYID0gKGUudGFyZ2V0Lm1vdXNlWCAtIHRoaXMubGFzdFgpO1xyXG4gICAgICAgIHRoaXMuX2drLnggKz0gdGhpcy5vZmZlc3RYO1xyXG4gICAgICAgIGlmKHRoaXMuX2drLnggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2drLnggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9nay54IDwgLTQgKiA2MzApIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2sueCA9IC00ICogNjMwOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0WCA9IGUudGFyZ2V0Lm1vdXNlWDtcclxuICAgIH1cclxuXHJcbiAgICB1cEdLQm94KGU6IExheWEuRXZlbnQpIHtcclxuICAgICAgICB2YXIgbmV4dFggPSAwO1xyXG4gICAgICAgIGlmKE1hdGguYWJzKHRoaXMub2ZmZXN0WCkgPD0gNSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdFggPSA5OTk5OTtcclxuICAgICAgICBpZih0aGlzLm9mZmVzdFggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2drLnggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0WCA9IE1hdGguZmxvb3IodGhpcy5fZ2sueCAvIDYzMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLm9mZmVzdFggPCAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2drLnggPiAtNCAqIDYzMCkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX2drLCB7eDpuZXh0WH0sIE1hdGguYWJzKHRoaXMub2ZmZXN0WCkpO1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSAtbmV4dFggLyA2MzA7XHJcbiAgICAgICAgdGhpcy5vZmZlc3RYID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpbml0R0soKSB7XHJcbiAgICAvLyAgICAgZm9yKHZhciBpID0gMTtpIDw9IDU7aSArKykge1xyXG4gICAgLy8gICAgICAgICB2YXIgc3ByID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgIC8vICAgICAgICAgc3ByLmxvYWRJbWFnZShcImVudGVyc2NlbmV1aS9nay9na1wiICsgaSArIFwiLnBuZ1wiKTtcclxuICAgIC8vICAgICAgICAgc3ByLnggPSAoaSAtIDEpICogNjMwO1xyXG4gICAgLy8gICAgICAgICB0aGlzLl9na0NvbnRlbnQuYWRkQ2hpbGQoc3ByKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgdXBkYXRlU2VsZlNjZW5lVUkoKSB7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5jb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuY29uZmlnW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihrZXkgPT0gXCJpbWdcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0ubG9hZEltYWdlKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihrZXkgPT0gXCJidG5cIikge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uc2tpbiA9IChQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgSW5pdEJ0bkdyb3VwKCkge1xyXG4gICAgICAgIC8vIHZhciBDdXJNYXhMZXZlbCA9IEdhbWVBZ2VudC5BZ2VudC5DdXJNYXhMZXZlbDtcclxuICAgICAgICAvLyB2YXIgY3VyTGV2ZWwgPSBHYW1lQWdlbnQuQWdlbnQuQ3VyTGV2ZWw7XHJcbiAgICAgICAgLy8gdmFyIGJ0bk51bSA9IHRoaXMuX1VJLl9Hcm91cC5udW1DaGlsZHJlbjtcclxuICAgICAgICAvLyB2YXIgZ3JvdXAgPSB0aGlzLm1fQnRuR3JvdXA7XHJcbiAgICAgICAgLy8gZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYnRuTnVtOyArK2lkeCkge1xyXG4gICAgICAgIC8vICAgICB2YXIgYnRuOiBhbnkgPSB0aGlzLl9VSS5fR3JvdXAuZ2V0Q2hpbGRBdChpZHgpIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgLy8gICAgIGJ0bi5pZHggPSBpZHg7XHJcbiAgICAgICAgLy8gICAgIGJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2hvb3NlKVxyXG4gICAgICAgIC8vICAgICBidG4uZ3JheSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIGdyb3VwLnB1c2goYnRuKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy9ncm91cFtjdXJMZXZlbF0uZ3JheSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPcGVuKCkge1xyXG4gICAgICAgIC8vdGhpcy5Jbml0QnRuR3JvdXAoKTtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SYW5rLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX1VJLl9SYW5rLmJvdHRvbSAtIHRoaXMuX1VJLmFkdi5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fVUkuX1NldFBhbmVsLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX1VJLl9TZXRQYW5lbC5ib3R0b20gLSB0aGlzLl9VSS5hZHYuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX1VJLmFkdi55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSB0aGlzLl9VSS5hZHYuYm90dG9tIC0gdGhpcy5fVUkuYWR2LmhlaWdodDtcclxuICAgICAgICB0aGlzLl9VSS5fU3RhcnQueCA9IHRoaXMuX1VJLl9TdGFydFtcImluaXRYXCJdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9DaGFyYWN0ZXIueSA9IHRoaXMuX1VJLl9DaGFyYWN0ZXJbXCJpbml0WVwiXTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGZTY2VuZVVJKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgc3VwZXIuTGF5b3V0KCk7XHJcbiAgICAgICAgaWYoIXRoaXMuX1VJIHx8ICF0aGlzLl9VSS5iZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLmJnLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvL+S6i+S7tlxyXG4gICAgT25DaG9vc2UoaW5mbzogRXZlbnQpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0OmFueSA9IGluZm8udGFyZ2V0O1xyXG4gICAgICAgIHZhciBpZHg6IG51bWJlciA9IHRhcmdldC5pZHg7XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LkN1ckxldmVsID0gaWR4O1xyXG4gICAgICAgIHRoaXMubV9CdG5Hcm91cC5mb3JFYWNoKChpbWc6IExheWEuSW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgaW1nLmdyYXkgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubV9CdG5Hcm91cFtpZHhdLmdyYXkgPSBmYWxzZTtcclxuICAgIH1cclxufSIsIi8qKuS9nOiAhTpNb1xyXG4gKiDlnLrmma9VSVxyXG4gKi9cclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4uL0dhbWUvR2FtZU1vZHVsZVwiO1xyXG5pbXBvcnQgeyBHYW1lQWdlbnQgfSBmcm9tIFwiLi4vQWdlbnQvR2FtZUFnZW50XCI7XHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IEl0ZW1MaXN0VUkgZnJvbSBcIi4vSXRlbUxpc3RVSVwiXHJcbmltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxuY2xhc3MgRXh0ZW5kc0dhbWVVSSBleHRlbmRzIHVpLkdhbWVVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVcIikpKTtcclxuICAgIH1cclxuICAgIFNldENvdW50VGltZShpbmZvOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lLnZhbHVlID0gaW5mbztcclxuICAgICAgICAvL3RoaXMuX0NvdW50VGltZS50ZXh0ID0gaW5mbztcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVVJIGV4dGVuZHMgQmFzZVVJIHtcclxuICAgIHByaXZhdGUgX1VJOiBFeHRlbmRzR2FtZVVJO1xyXG4gICAgcHJpdmF0ZSBtX29uQ2xpY2tTa2lsbEl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIHByaXZhdGUgbV9vbkNMaWNrUGxheWVySXRlbTogTWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgLy9cclxuICAgIHB1YmxpYyBEaXN0YW5jZVN0cjogQXJyYXk8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBHb2xkTnVtU3RyOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIHNldCBHYW1lUGFuZWwodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZVBhbmVsLnZpc2libGUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCBEaXN0YW5jZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGRpcyA9IFwiXCIgKyB2YWx1ZTtcclxuICAgICAgICBpZiAoZGlzID09IHRoaXMuRGlzdGFuY2VTdHJbMV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHJbMV0gPSBkaXM7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgc2V0IEdvbGROdW0odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2hvd0Rpc3RhbmNlKCkge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0ID0gdGhpcy5EaXN0YW5jZVN0clswXTtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0RGlzdGFuY2UxLnZhbHVlID0gdGhpcy5EaXN0YW5jZVN0clsxXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TaG93R29sZE51bSgpIHtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0R29sZC50ZXh0ID0gdGhpcy5Hb2xkTnVtU3RyWzBdICsgdGhpcy5Hb2xkTnVtU3RyWzFdO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIHNldCBHb2xkKGdvbGQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IGdvbGQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLlNldERpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9Jc011dGV4ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxlZnQgPSAwO1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSAwO1xyXG4gICAgICAgIHRoaXMuYm90dG9tID0gMDtcclxuICAgICAgICB0aGlzLnRvcCA9IDA7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kc0dhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHZhciBvcElzUmlnaHQgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0SW5mby5PUElzUmlnaHQ7XHJcbiAgICAgICAgdGhpcy5fVUkuX0l0ZW1MaXN0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fVUlNYW5hZ2VyLlNob3c8SXRlbUxpc3RVST4oSXRlbUxpc3RVSSlcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLlNldENvdW50VGltZSgpO1xyXG4gXHJcbiAgICAgICAgdGhpcy5EaXN0YW5jZVN0ciA9IHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gXCIwXCJcclxuICAgICAgICB0aGlzLl9TaG93RGlzdGFuY2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyID0gdGhpcy5fVUkuX1R4dEdvbGQudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyWzFdID0gXCIwXCI7XHJcbiAgICAgICAgdGhpcy5fU2hvd0dvbGROdW0oKTtcclxuXHJcbiAgICAgICAgdGhpcy5TaG93SW5wdXRJbmZvKFwiXCIpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9QbGF5ZXJJdGVtLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuT25DbGlja1BsYXllckl0ZW0pO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Ta2lsbEl0ZW0ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5PbkNsaWNrU2tpbGxJdGVtKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBTZXRMZWZ0VG91Y2gob3duZXI6IGFueSwgTGlzdGVuZXI6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9VSS5fTGVmdFRvdWNoLm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTiwgb3duZXIsIExpc3RlbmVyKTsgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgU2V0UmlnaHRUb3VjaChvd25lcjogYW55LCBMaXN0ZW5lcjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX1VJLl9SaWdodFRvdWNoLm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTiwgb3duZXIsIExpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRDb3VudFRpbWUoaW5mbzogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIGlmIChpbmZvID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVQYW5lbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5TZXRDb3VudFRpbWUoaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgU2hvd0l0ZW0oKSB7XHJcbiAgICAgICAgdGhpcy5TaG93UGxheWVySXRlbSgpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NoYXJhY3RlZXJJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrnjqnlrrbpgInmi6npgZPlhbdcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIFNob3dQbGF5ZXJJdGVtKCkge1xyXG4gICAgICAgIHZhciBpdGVtTnVtID0gR2FtZUFnZW50LkFnZW50LkdhbWVJdGVtTnVtO1xyXG4gICAgICAgIGlmIChpdGVtTnVtIDwgMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fUGxheWVySXRlbS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX1BsYXllckl0ZW0udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S66KeS6Imy6YGT5YW3XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBTaG93Q2hhcmFjdGVlckl0ZW0oKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1OdW0gPSBHYW1lQWdlbnQuQWdlbnQuU2tpbGxJdGVtTnVtO1xyXG4gICAgICAgIGlmIChpdGVtTnVtIDwgMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fU2tpbGxJdGVtLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fU2tpbGxJdGVtLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBTaG93SW5wdXRJbmZvKGluZm86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX1VJLl9HYW1lSW5mby50ZXh0ID0gaW5mbztcclxuICAgIH1cclxuICAgIE9wZW4oKSB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJJdGVtTnVtQ2hhbmdlLCB0aGlzLlNob3dQbGF5ZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckl0ZW1DaGFuZ2UsIHRoaXMuU2hvd1BsYXllckl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoR2FtZU1vZHVsZS5FdmVudC5PbkNoYXJhY3Rlckl0ZW1DaGFuZ2UsIHRoaXMuU2hvd0NoYXJhY3RlZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICB0aGlzLlNob3dJdGVtKCk7XHJcbiAgICB9XHJcbiAgICBDbG9zZSgpIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UsIHRoaXMuU2hvd1BsYXllckl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VySXRlbUNoYW5nZSwgdGhpcy5TaG93UGxheWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChHYW1lTW9kdWxlLkV2ZW50Lk9uQ2hhcmFjdGVySXRlbUNoYW5nZSwgdGhpcy5TaG93Q2hhcmFjdGVlckl0ZW0sIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKCkge1xyXG4gICAgICAgIC8v5pi+56S66YeR5biB5L+h5oGvXHJcbiAgICAgICAgdGhpcy5fU2hvd0dvbGROdW0oKTtcclxuICAgICAgICAvL+aYvuekuui3neemu+S/oeaBr1xyXG4gICAgICAgIHRoaXMuX1Nob3dEaXN0YW5jZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RDbGlja1NraWxsSXRlbShvd25lcjogT2JqZWN0LCBsaXN0ZW5lcjogKHBhcmFtOiBhbnkpID0+IGFueSkge1xyXG4gICAgICAgIHZhciBkZWxlZ2F0ZTogTWVzc2FnZU1ELkRlbGVnYXRlID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZShvd25lciwgbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubV9vbkNsaWNrU2tpbGxJdGVtID0gZGVsZWdhdGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgUmVnaXN0Q2xpY2tQbGF5ZXJJdGVtKG93bmVyOiBPYmplY3QsIGxpc3RlbmVyOiAocGFyYW06IGFueSkgPT4gYW55KSB7XHJcbiAgICAgICAgdmFyIGRlbGVnYXRlOiBNZXNzYWdlTUQuRGVsZWdhdGUgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5tX29uQ0xpY2tQbGF5ZXJJdGVtID0gZGVsZWdhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbkNsaWNrU2tpbGxJdGVtKCkge1xyXG4gICAgICAgIHRoaXMubV9vbkNsaWNrU2tpbGxJdGVtLkV4ZWN1dGUoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgT25DbGlja1BsYXllckl0ZW0oKSB7XHJcbiAgICAgICAgdGhpcy5tX29uQ0xpY2tQbGF5ZXJJdGVtLkV4ZWN1dGUoKTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQge1BsYXllcn0gZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IHtHYW1lQWdlbnR9IGZyb20gXCIuLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuLy4uL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcbmltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiXHJcbmltcG9ydCBHYW1lQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQVBQXCJcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLi9HYW1lL0dhbWVNb2R1bGVcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiO1xyXG5pbXBvcnQgSXRlbU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyL0l0ZW1NYW5hZ2VyXCI7XHJcblxyXG5jbGFzcyBFeHRlbmRzSXRlbUxpc3RVSSBleHRlbmRzIHVpLkl0ZW1MaXN0VUlcclxue1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OkFycmF5PG51bWJlcj5cclxuICAgIEJ0bkxpc3RlbmVyOk1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9JdGVtTGlzdCA9IFtdO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUb29sSXRlbVVJIGV4dGVuZHMgdWkudG9vbEl0ZW1VSVxyXG57XHJcbiAgICBwcml2YXRlIG1fSXRlbUxpc3Q6QXJyYXk8bnVtYmVyPlxyXG4gICAgQnRuTGlzdGVuZXI6TWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gW107XHJcbiAgICB9XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcInRvb2xJdGVtXCIpKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUxpc3RVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkl0ZW1MaXN0VUlcIjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgVUk6RXh0ZW5kc0l0ZW1MaXN0VUk7XHJcbiAgICBwcml2YXRlIG1fR29sZDpzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgbV9JdGVtTGlzdDpBcnJheTxudW1iZXI+O1xyXG5cclxuICAgIHB1YmxpYyBhcnJheURpczpMYXlhLlNwcml0ZVtdID0gW107XHJcbiAgICBwdWJsaWMgY250TnVtID0gNTtcclxuICAgIHB1YmxpYyBzdGFydGFvID0gMjcwO1xyXG4gICAgcHVibGljIHBlcmFvID0gMzYwIC8gdGhpcy5jbnROdW07XHJcbiAgICBwdWJsaWMgciA9IDIzMDtcclxuICAgIHB1YmxpYyBzdGFydFkgPSA1NzU7XHJcbiAgICBwdWJsaWMgc3RhcnRYID0gMzAwO1xyXG4gICAgcHVibGljIGNudFNlbGVjdEluZGV4ID0gMDtcclxuXHJcbiAgICBwdWJsaWMgY2FtZXJhOkxheWEuQ2FtZXJhO1xyXG4gICAgcHVibGljIGNudHN0YXJ0YW8gPSA5MDtcclxuICAgIHB1YmxpYyBtb3ZlU3RhcmFvID0gMjtcclxuICAgIHB1YmxpYyBuZXh0QW8gPSAtMTtcclxuICAgIHB1YmxpYyBpbml0U2NhbE51bSA9IDAuMDE4O1xyXG5cclxuICAgIHByaXZhdGUgY29uZmlnID0ge1wiaW1nXCI6XHJcbiAgICAgICAgWyAgIFxyXG4gICAgICAgICAgICB7a2V5OlwiYmdcIix0ZXh0dXJlTmFtZTpcIm1haW5iZy5qcGdcIn1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnRuXCI6XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7a2V5OlwiYmFja0J0blwiLHRleHR1cmVOYW1lOlwiYmFjay5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJidXlCdG5cIix0ZXh0dXJlTmFtZTpcImJ1eS5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJiYWNrQnRuXCIsdGV4dHVyZU5hbWU6XCJzdGFydC5wbmdcIn1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLlVJID0gbmV3IEV4dGVuZHNJdGVtTGlzdFVJKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLlVJKTtcclxuICAgICAgICB0aGlzLlVJLkJ0bkxpc3RlbmVyID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZSh0aGlzLCgpPT57IHRoaXMuX1VJTWFuYWdlci5DbG9zZSh0aGlzKX0pXHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICAvL3RoaXMuVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIC8vdGhpcy5tX0dvbGQgPSB0aGlzLlVJLl9Hb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuVUkuX0JHLmFscGhhID0gMDtcclxuICAgICAgICB0aGlzLlVJLl9CRy5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy5DbG9zZVVJKTtcclxuICAgICAgICB0aGlzLlVJLmJhY2tCdG4ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMuQ2xvc2VVSSk7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5MYXlvdXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9IDA7Ly9jbnRTZWxlY3RJbmRleDtcclxuICAgICAgICBcclxuICAgICAgICBmb3IodmFyIGkgPSAwIDtpIDwgdGhpcy5jbnROdW07aSArKykge1xyXG4gICAgICAgICAgICB2YXIgYXVkdDpUb29sSXRlbVVJID0gbmV3IFRvb2xJdGVtVUkoKTtcclxuICAgICAgICAgICAgYXVkdC50b29saWNvbi5sb2FkSW1hZ2UoSXRlbU1hbmFnZXIuTWdyLkdldEl0ZW1JY29uKGkpKTtcclxuICAgICAgICAgICAgYXVkdC50b29sbmFtZS50ZXh0ID0gSXRlbU1hbmFnZXIuTWdyLkdldEl0ZW1JbmZvKGkpLlBhc3NzY29yZTtcclxuICAgICAgICAgICAgLy8gYXVkdC5sb2FkSW1hZ2UoSXRlbU1hbmFnZXIuTWdyLkdldEl0ZW1JY29uKGkpKTtcclxuICAgICAgICAgICAgYXVkdC5uYW1lID0gaSAgKyBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLlVJLmFkZENoaWxkKGF1ZHQpO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzLnB1c2goYXVkdCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbaV0ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5zZWxlY3RSb2xlUG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gKHRoaXMuY250U2VsZWN0SW5kZXggKyA1KSAlIDU7XHJcbiAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gKHRoaXMuc3RhcnRhbyArICh0aGlzLmNudE51bSAtIHRoaXMuY250U2VsZWN0SW5kZXgpICogdGhpcy5wZXJhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3QoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuVUkuYnV5QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQnV5SXRlbSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGZTY2VuZVVJKCkge1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmNvbmZpZ1trZXldLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYoa2V5ID09IFwiaW1nXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5sb2FkSW1hZ2UoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGtleSA9PSBcImJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLnNraW4gPSAoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgc2VsZWN0Um9sZVBvc2l0aW9uKGU6TGF5YS5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBjbnRUYXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgaWYodGhpcy5jbnRTZWxlY3RJbmRleCA9PSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQubmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuVUkuYmFja0J0bi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5VSS5idXlCdG4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVUkub3duZXJ0eHQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVUkuZ29sZGltZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdEluZGV4KHBhcnNlSW50KGNudFRhcmdldC5uYW1lKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsQ250U3RhcnRhbygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gKHRoaXMuY250U2VsZWN0SW5kZXggKyA1KSAlIDU7XHJcbiAgICAgICAgdGhpcy5uZXh0QW8gPSAodGhpcy5zdGFydGFvICsgKHRoaXMuY250TnVtIC0gdGhpcy5jbnRTZWxlY3RJbmRleCkgKiB0aGlzLnBlcmFvICsgMzYwKSAlIDM2MDtcclxuXHJcbiAgICAgICAgaWYoKHRoaXMubmV4dEFvIC0gdGhpcy5jbnRzdGFydGFvICsgMzYwKSAlIDM2MCA+PSAxODApIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RhcmFvID0gLTJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RhcmFvID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDAuMDUsIHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aW1lQW9DaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5jbnRzdGFydGFvID09IHRoaXMubmV4dEFvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9IHRoaXMubmV4dEFvO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRBbyA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbGFzY250QW8gPSB0aGlzLmNudHN0YXJ0YW87XHJcbiAgICAgICAgdGhpcy5jbnRzdGFydGFvICs9IHRoaXMubW92ZVN0YXJhbztcclxuICAgICAgICBpZih0aGlzLmNudHN0YXJ0YW8gPCAwIHx8IHRoaXMuY250c3RhcnRhbyA9PSAzNjApIHtcclxuICAgICAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gKHRoaXMuY250c3RhcnRhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgICAgIGxhc2NudEFvID0gdGhpcy5jbnRzdGFydGFvIC0gdGhpcy5tb3ZlU3RhcmFvO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSAodGhpcy5jbnRzdGFydGFvICsgMzYwKSAlIDM2MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoKGxhc2NudEFvID49IHRoaXMubmV4dEFvICYmIHRoaXMuY250c3RhcnRhbyA8PSB0aGlzLm5leHRBbykgfHwgKGxhc2NudEFvIDw9IHRoaXMubmV4dEFvICYmIHRoaXMuY250c3RhcnRhbyA+PSB0aGlzLm5leHRBbykpIHtcclxuICAgICAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gdGhpcy5uZXh0QW87XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEFvID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubmV4dEFvID09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9sZUluZm8odGhpcy5jbnRTZWxlY3RJbmRleCk7XHJcbiAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcywgdGhpcy50aW1lQW9DaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGVjdCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCB0aGlzLmFycmF5RGlzLmxlbmd0aDtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBhbyA9ICh0aGlzLmNudHN0YXJ0YW8gKyBpICogdGhpcy5wZXJhbykgJSAzNjBcclxuICAgICAgICAgICAgdmFyIHggPSB0aGlzLnN0YXJ0WCArIHRoaXMuciAqIE1hdGguY29zKGFvICogMy4xNCAvIDE4MCk7XHJcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5zdGFydFkgKyB0aGlzLnIgKiBNYXRoLnNpbihhbyAqIDMuMTQgLyAxODApO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLnggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLnkgPSB5O1xyXG4gICAgICAgICAgICB2YXIgc2NhbGUgPSAoeSAtIHRoaXMuc3RhcnRZKSAvIDIgLyAodGhpcy5yIC0gdGhpcy5zdGFydFkpICogMC4yO1xyXG4gICAgICAgICAgICBpZihzY2FsZSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLnNjYWxlWCA9IHRoaXMuYXJyYXlEaXNbaV0uc2NhbGVZID0gKDAuOCArIHNjYWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS5zY2FsZVggPSB0aGlzLmFycmF5RGlzW2ldLnNjYWxlWSA9IDAuODtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUm9sZUluZm8oaWQpOiB2b2lkIHtcclxuICAgICAgICAvLyBpZih0aGlzLmNoZWNrSXNMb2NrKGlkKSkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9VSS5zdGFydEdhbWUudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX1VJLmJ1eUJ0bi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX1VJLmdvbGRpbWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX1VJLnJvbGV1c2VOb25leS50ZXh0ID0gXCLlt7Lop6PplIFcIjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSBcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuYmFja0J0bi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5VSS5idXlCdG4udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuZ29sZGltZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVUkub3duZXJ0eHQudmlzaWJsZSA9IHRydWU7O1xyXG4gICAgICAgICAgICB0aGlzLlVJLnJvbGV1c2VOb25leS50ZXh0ID0gSXRlbU1hbmFnZXIuTWdyLkdldFByaWNlKHRoaXMuY250U2VsZWN0SW5kZXgpICsgXCJcIjtcclxuICAgICAgICAvL31cclxuICAgICAgICB2YXIgb3duZXJOdW0gPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuSXRlbUxpc3RbdGhpcy5jbnRTZWxlY3RJbmRleF07XHJcbiAgICAgICAgaWYoIW93bmVyTnVtKSB7XHJcbiAgICAgICAgICAgIG93bmVyTnVtID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5VSS5vd25lcnR4dC50ZXh0ID0gXCLlt7Lmi6XmnIk6XCIgKyBvd25lck51bTtcclxuICAgICAgICB2YXIgaXRlbUluZm8gPSBJdGVtTWFuYWdlci5NZ3IuR2V0SXRlbUluZm8oaWQpO1xyXG4gICAgICAgIHRoaXMuVUkucm9sZU5hbWUudGV4dCA9IGl0ZW1JbmZvLlBhc3NzY29yZTtcclxuICAgICAgICB0aGlzLlVJLmRlc2MudGV4dCA9IGl0ZW1JbmZvLkRlc2M7XHJcbiAgICAgICAgdGhpcy5VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xlYXJSb2F0ZVRpbWVyKCk6IHZvaWQge1xyXG4gICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcywgdGhpcy50aW1lQW9DaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGxhc3RSb2xlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggLS07XHJcbiAgICAgICAgdGhpcy5jYWxDbnRTdGFydGFvKCk7XHJcbiAgICB9ICAgXHJcblxyXG4gICAgbmV4dFJvbGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCArKztcclxuICAgICAgICB0aGlzLmNhbENudFN0YXJ0YW8oKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxlY3RJbmRleChzZWxlY3RJbmRleDpudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZihzZWxlY3RJbmRleCA9PSB0aGlzLmNudFNlbGVjdEluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9IHNlbGVjdEluZGV4O1xyXG4gICAgICAgIHRoaXMuY2FsQ250U3RhcnRhbygpO1xyXG4gICAgfSBcclxuXHJcbiAgICBwdWJsaWMgT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSx0aGlzLlNob3dHb2xkLHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UsdGhpcy5SZWZyZXNoTGlzdCx0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5UaW1lUGF1c2UoKTtcclxuICAgICAgICB0aGlzLlNob3dHb2xkKCk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuVGltZUNvbnRpbnVlKCk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSx0aGlzLlNob3dHb2xkLHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UsdGhpcy5SZWZyZXNoTGlzdCx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HZXRJdGVtTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuU2V0TGlzdCh0aGlzLm1fSXRlbUxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWZyZXNoTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HZXRJdGVtTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuRnJlc2hMaXN0KHRoaXMubV9JdGVtTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldEl0ZW1MaXN0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0U2VsbEl0ZW1JRExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd0dvbGQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLlNob3dpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5tX0dvbGRbMV0gPVwiXCIgKyBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXk7XHJcbiAgICAgICAgdGhpcy5VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9SZW5kZXJIYW5kbGVyKGNlbGw6TGF5YS5Cb3gsaW5kZXg6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJvbGVFbGVtZW50Okl0ZW1FbGVtZW50ID0gY2VsbCBhcyBJdGVtRWxlbWVudDtcclxuICAgICAgICB2YXIgaXRlbUxpc3Q6QXJyYXk8bnVtYmVyPiA9IEdhbWVBZ2VudC5BZ2VudC5JdGVtTGlzdDtcclxuICAgICAgICByb2xlRWxlbWVudC5Jbml0KCk7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuSXRlbUlkeCA9IHRoaXMubV9JdGVtTGlzdFtpbmRleF07XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVnaXN0QnV5KHRoaXMsdGhpcy5CdXlJdGVtKTtcclxuICAgICAgICByb2xlRWxlbWVudC5SZWdpc3RDaG9vc2UodGhpcyx0aGlzLkNob29zZUl0ZW0pO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LklzR3JheSA9IGl0ZW1MaXN0W3RoaXMubV9JdGVtTGlzdFtpbmRleF1dP2ZhbHNlOnRydWU7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuTnVtID0gaXRlbUxpc3RbdGhpcy5tX0l0ZW1MaXN0W2luZGV4XV0/aXRlbUxpc3RbdGhpcy5tX0l0ZW1MaXN0W2luZGV4XV06MDtcclxuICAgICAgICByb2xlRWxlbWVudC5CdG5MYWJsZSA9IFwiXCIgKyBHYW1lQVBQLkl0ZW1NZ3IuR2V0UHJpY2UodGhpcy5tX0l0ZW1MaXN0W2luZGV4XSkgKyBcIlwiO1xyXG4gICAgICAgIC8vcm9sZUVsZW1lbnQuU2V0QnRuKHRoaXMuQnRuTGlzdGVuZXIuTGlzdGVuZXIsdGhpcy5CdG5MaXN0ZW5lci5BY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0TGlzdChsaXN0QXJyYXk6QXJyYXk8YW55PilcclxuICAgIHtcclxuICAgICAgICAvL3ZhciBsaXN0QXJyYXk6QXJyYXk8YW55PiA9IHRoaXMubV9JdGVtTGlzdDtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnJlbmRlckhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsdGhpcy5fUmVuZGVySGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5hcnJheSA9IGxpc3RBcnJheTtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljRGlzdGFuY2UgPSA1MFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBGcmVzaExpc3QoaWRMaXN0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QuYXJyYXkgPSBpZExpc3Q7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIHN1cGVyLkxheW91dCgpO1xyXG4gICAgICAgIGlmKCF0aGlzLlVJIHx8ICF0aGlzLlVJLmJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5VSS5iZy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBCdXlJdGVtKGlkOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQnV5SXRlbSh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2hvb3NlSXRlbShpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuU2hvd2luZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKEdhbWVBZ2VudC5BZ2VudC5JdGVtTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VySXRlbSA9IGlkO1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VySXRlbSA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgQ2xvc2VVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DaG9vc2VJdGVtKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2UodGhpcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgV2VjaGF0T3BlbiB9IGZyb20gXCIuLi9wbGF0Zm9ybS9XZWNoYXRPcGVuXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5jbGFzcyBFeHRlbmRzUmFua1BhbmVsVUkgZXh0ZW5kcyB1aS5HYW1lUmFua1VJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVJhbmtcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy90aGlzLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57QVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5rUGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNSYW5rUGFuZWxVSTtcclxuICAgIHJhbmtUZXh0dXJlOiBMYXlhLlRleHR1cmU7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNSYW5rUGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLmNsb3NlQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsICgpID0+IHsgXHJcbiAgICAgICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkuY2xvc2VSYW5rKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlJhbmtQYW5lbFVJXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkub3BlblJhbmsoKTtcclxuICAgIH1cclxuXHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5yYW5rVGV4dHVyZS5iaXRtYXAuYWx3YXlzQ2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5yYW5rVGV4dHVyZS5kaXNwb3NlQml0bWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2VPUCgpIHtcclxuICAgICAgICB0aGlzLlNhdmVQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuXHJcbmNsYXNzIEV4dGVuZHNTZXRQYW5lbFVJIGV4dGVuZHMgdWkuU2V0UGFuZWxVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e0FQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCl9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNTZXRQYW5lbFVJO1xyXG4gICAgc2VsZWN0ZWRJbmRleDpudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJtYWluYmcuanBnXCJ9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcIl9SZXR1cm5cIix0ZXh0dXJlTmFtZTpcImJhY2sucG5nXCJ9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU7IFxyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNTZXRQYW5lbFVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JldHVybi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCAoKSA9PiB7IHRoaXMuX1VJTWFuYWdlci5DbG9zZUN1clZpZXcoKTsgR3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpIH0pO1xyXG4gICAgICAgIHRoaXMuX1VJLnZvaWNlb3Blbi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLlZvaWNlT3Blbik7XHJcbiAgICAgICAgdGhpcy5fVUkudm9pY2VjbG9zZS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLlZvaWNlQ2xvc2UpOyBcclxuICAgICAgICB2YXIgaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2V0U2V0SW5mbygpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZm8uQXVkaW9PbiA/IDEgOiAwO1xyXG4gICAgICAgIHRoaXMuU2V0UGFuZWwoKTtcclxuICAgICAgICB0aGlzLkxheW91dCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTZXRQYW5lbFVJXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFZvaWNlT3BlbigpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAxO1xyXG4gICAgICAgIHRoaXMuU2V0UGFuZWwoKTtcclxuICAgIH1cclxuICAgIE9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG4gICAgVm9pY2VDbG9zZSgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuU2V0UGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxmU2NlbmVVSSgpIHtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5jb25maWdba2V5XS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PSBcImltZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1VJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1VJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5sb2FkSW1hZ2UoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGtleSA9PSBcImJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1VJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5za2luID0gKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGFuZWwoKSB7XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZEluZGV4ID09IDEpIHtcclxuICAgICAgICAgICAgKHRoaXMuX1VJLnZvaWNlb3Blbi5nZXRDaGlsZEF0KDIpIGFzIExheWEuSW1hZ2UpLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAodGhpcy5fVUkudm9pY2VjbG9zZS5nZXRDaGlsZEF0KDEpIGFzIExheWEuSW1hZ2UpLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgKHRoaXMuX1VJLnZvaWNlb3Blbi5nZXRDaGlsZEF0KDIpIGFzIExheWEuSW1hZ2UpLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgKHRoaXMuX1VJLnZvaWNlY2xvc2UuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkltYWdlKS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uT1BJc1JpZ2h0ID8gMSA6IDA7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fVGV4dC50ZXh0ID0gaW5mby5UZXh0SW5mbztcclxuICAgIH1cclxuICAgIFNhdmVQYW5lbCgpIHtcclxuICAgICAgICB2YXIgaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvID0gbmV3IEdhbWVTdHJ1Y3QuU2V0SW5mbygpO1xyXG4gICAgICAgIGluZm8uQXVkaW9PbiA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PSAxO1xyXG4gICAgICAgIC8vaW5mby5PUElzUmlnaHQgPSB0aGlzLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TYXZlU2V0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgc3VwZXIuTGF5b3V0KCk7XHJcbiAgICAgICAgaWYoIXRoaXMuX1VJIHx8ICF0aGlzLl9VSS5iZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLmJnLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZU9QKCkge1xyXG4gICAgICAgIHRoaXMuU2F2ZVBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge31cclxufVxyXG4iLCJpbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL0Jhc2VVSVwiXHJcbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XHJcbmltcG9ydCBMb2FkVUlTY2VuZSBmcm9tIFwiLi9Mb2FkVUlTY2VuZVwiO1xyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLi8uLi9VdGlsaXR5L1BhdGhcIjtcclxubW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Qcm9ncmVzczpMYXlhLlByb2dyZXNzQmFyO1xyXG5cdFx0cHVibGljIF9HdWlkZXI6TGF5YS5JbWFnZTtcclxuXHRcdHB1YmxpYyBfRW50ZXI6TGF5YS5CdXR0b247XHJcbiAgICAgICAgcHVibGljIEVycm9ySW5mbzpMYXlhLkxhYmVsO1xyXG4gICAgICAgIHB1YmxpYyBsb2dvOkxheWEuSW1hZ2U7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkxvYWRpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFeHRMb2FkaW5nVUkgZXh0ZW5kcyB1aS5Mb2FkaW5nVUlcclxue1xyXG4gICAgXHJcbiAgICBjcmVhdGVDaGlsZHJlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBcIkxvYWRpbmdVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOnVpLkxvYWRpbmdVSTtcclxuICAgIF9DYWxsQmFjazooKT0+dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBuYW1lOnN0cmluZyApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgLy90aGlzLl9VSSA9bmV3IHVpLkxvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuX1VJID1uZXcgRXh0TG9hZGluZ1VJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSApO1xyXG4gICAgICAgIHRoaXMuVmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5fQ2FsbEJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLkxheW91dCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1VJLmxvZ28ueCA9IHRoaXMuX1VJLmxvZ28ud2lkdGggKiAwLjEgLyAyO1xyXG4gICAgICAgIHRoaXMuX1VJLmxvZ28uc2NhbGVYID0gMC45O1xyXG4gICAgICAgIHRoaXMuX1VJLmxvZ28uc2NhbGVZID0gMC45O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBzY2VuZTpMYXlhLlNjZW5lM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMoXCJ1aS9SZXNvdXJjZS9MYXlhU2NlbmVfTWFpblNjZW5lL0NvbnZlbnRpb25hbC9NYWluU2NlbmUubHNcIikgYXMgTGF5YS5TY2VuZTNEO1xyXG4gICAgICAgIHNjZW5lLmFtYmllbnRDb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgMSwgMSk7XHJcblxyXG4gICAgICAgIHZhciBnYW1lT2JqZWN0OkxheWEuU3ByaXRlM0QgPSBzY2VuZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVPYmplY3RcIikgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICB2YXIgemh1eWVtaWFuX3FpdTFfaWRsZTpMYXlhLlNwcml0ZTNEID0gc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aHV5ZW1pYW5fcWl1MV9pZGxlXCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcblxyXG4gICAgICAgIGdhbWVPYmplY3QudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKDAuOCwgMC44LCAwLjgpO1xyXG4gICAgICAgIHpodXllbWlhbl9xaXUxX2lkbGUudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKDAuNzUsIDAuNzUsIDAuNzUpO1xyXG5cclxuICAgICAgICB2YXIgY2FtZXJhOkxheWEuQ2FtZXJhID0gc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJDYW1lcmFcIikgYXMgTGF5YS5DYW1lcmE7XHJcbiAgICAgICAgY2FtZXJhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNhbWVyYS5jbGVhckZsYWcgPSBMYXlhLkJhc2VDYW1lcmEuQ0xFQVJGTEFHX1NLWTtcclxuICAgICAgICBjYW1lcmEuY2xlYXJDb2xvcj1uZXcgTGF5YS5WZWN0b3I0KDAsMCwwLDApO1xyXG4gICAgICAgIHZhciBuZXdDYW1lcmE6TGF5YS5DYW1lcmEgPSBuZXcgTGF5YS5DYW1lcmEoKTtcclxuICAgICAgICBuZXdDYW1lcmEudHJhbnNmb3JtLnBvc2l0aW9uID0gY2FtZXJhLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICBuZXdDYW1lcmEudHJhbnNmb3JtLnJvdGF0aW9uID0gY2FtZXJhLnRyYW5zZm9ybS5yb3RhdGlvbjtcclxuICAgICAgICBzY2VuZS5hZGRDaGlsZChuZXdDYW1lcmEpO1xyXG4gICAgICAgIHRoaXMuX1VJW1wiYmdcIl0uYWRkQ2hpbGQoc2NlbmUpO1xyXG4gICAgICAgIC8vdGhpcy5fVUlbXCJiZ1wiXS5hZGRDaGlsZChuZXcgTG9hZFVJU2NlbmUoKSk7ICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHg6bnVtYmVyID0gMDtcclxuICAgICAgICB4ICs9IHRoaXMuX1VJLl9Qcm9ncmVzcy53aWR0aCp0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fVUkuX0d1aWRlci5wb3MoeCx0aGlzLl9VSS55KTtcclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1VJIHx8ICF0aGlzLl9VSVtcImJnXCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUlbXCJiZ1wiXS53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUlbXCJiZ1wiXS5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgVmFsdWUobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWUgPSBudW07XHJcbiAgICAgICAgdGhpcy5VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIENvbXBsZXRlKGNhbGxCYWNrOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9Qcm9ncmVzcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fQ2FsbEJhY2sgPSBjYWxsQmFjaztcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLmxhYmVsID0gXCJcIjtcclxuICAgIH1cclxuICAgIFJlbG9hZChzdHIsIGNhbGxCYWNrOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby50ZXh0ID0gc3RyO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8ud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEJHVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9FYXJ0aDpMYXlhLkltYWdlO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiQkdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuQkdVSVwiLEJHVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIENoYXJhY3RlclVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBiZzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBsYXlvdXRiZzpMYXlhLkJveDtcblx0XHRwdWJsaWMgcm9sZU5hbWU6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgZGVzYzpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBnb2xkaW1nOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyByb2xldXNlTm9uZXk6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgYnV5QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBjaGFyYWN0ZXJyb2xlMWJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBjaGFyYWN0ZXJyb2xlNGJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBjaGFyYWN0ZXJyb2xlMmJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBjaGFyYWN0ZXJyb2xlM2JnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBjaGFyYWN0ZXJyb2xlMGJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBzdGFydEdhbWU6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9Hb2xkOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGJhY2tCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9MaXN0OkxheWEuTGlzdDtcblx0XHRwdWJsaWMgbmFuQnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBudkJ0bjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkNoYXJhY3RlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5DaGFyYWN0ZXJVSVwiLENoYXJhY3RlclVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBFbmRHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIGJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBlbmRnYW1lYmdpY29uOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIGRpYmc6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgX1N0YXJ0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTWVudWVCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9TZXRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QbGF5ZXJMaXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBlbmRnYW1laGVudGlhbzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgZW5kZ2FtZXRpdGxlOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBkaXN0YW5jZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBnb2xkOkxheWEuTGFiZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJFbmRHYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkVuZEdhbWVVSVwiLEVuZEdhbWVVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgRW50ZXJVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgYmc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIF9TdGFydDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0NoYXJhY3RlcjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BhbmVsOkxheWEuUGFuZWw7XG5cdFx0cHVibGljIGNvbnRlbnQ6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIEJ0bjE6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgQnRuMjpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBCdG40OkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIEJ0bjU6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgX1NldFBhbmVsOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ2hhcmFjdGVyTGlzdDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgYWR2OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUmFuazpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgbGFzdEJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgbmV4dEJ0bjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkVudGVyXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkVudGVyVUlcIixFbnRlclVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Db3VudERvd25VSTpMYXlhLkJveDtcblx0XHRwdWJsaWMgX0l0ZW1MaXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfQ291bnRUaW1lMTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfQ291bnRUaW1lOkxheWEuRm9udENsaXA7XG5cdFx0cHVibGljIF9HYW1lSW5mbzpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfR2FtZVBhbmVsOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfVHh0RGlzdGFuY2U6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX1R4dEdvbGQ6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgX0xlZnRUb3VjaDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1JpZ2h0VG91Y2g6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9Ta2lsbEl0ZW06TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QbGF5ZXJJdGVtOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfVHh0RGlzdGFuY2UxOkxheWEuRm9udENsaXA7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJHYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkdhbWVVSVwiLEdhbWVVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVJhbmtVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgY2xvc2VCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIGdhbWVSYW5rVWk6bGF5YS51aS5XWE9wZW5EYXRhVmlld2VyO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiR2FtZVJhbmtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuR2FtZVJhbmtVSVwiLEdhbWVSYW5rVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIEl0ZW1MaXN0VUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9CRzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBiZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgX0xpc3Q6TGF5YS5MaXN0O1xuXHRcdHB1YmxpYyBiYWNrQnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfR29sZDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyByb2xlTmFtZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBkZXNjOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGdvbGRpbWc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIHJvbGV1c2VOb25leTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBidXlCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIG93bmVydHh0OkxheWEuTGFiZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJJdGVtTGlzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5JdGVtTGlzdFVJXCIsSXRlbUxpc3RVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyTGlzdFVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBfUGxheWVyTGlzdDpMYXlhLkxpc3Q7XG5cdFx0cHVibGljIF9SZXR1cm5NYWluOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiUGxheWVyTGlzdFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5QbGF5ZXJMaXN0VUlcIixQbGF5ZXJMaXN0VUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIFNldFBhbmVsVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIGJnOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIF9UZXh0OkxheWEuVGV4dEFyZWE7XG5cdFx0cHVibGljIF9SZXR1cm46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIHZvaWNlb3BlbjpMYXlhLkJveDtcblx0XHRwdWJsaWMgdm9pY2VjbG9zZTpMYXlhLkJveDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIlNldFBhbmVsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLlNldFBhbmVsVUlcIixTZXRQYW5lbFVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyB0b29sSXRlbVVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyB0b29saWNvbjpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgdG9vbG5hbWU6TGF5YS5MYWJlbDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcInRvb2xJdGVtXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLnRvb2xJdGVtVUlcIix0b29sSXRlbVVJKTtcclxufVxyIl19
