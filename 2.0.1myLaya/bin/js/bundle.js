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
},{"../controler/GameAPP":45,"./../Game/GameModule":25,"./../controler/APP":44,"./BaseAgent":1,"./PlayerEntity":3}],3:[function(require,module,exports){
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
        Object.defineProperty(PlayerEntity.prototype, "TotalStart", {
            get: function () {
                return this.m_TotalStars;
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
},{"../platform/WechatOpen":47,"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10}],4:[function(require,module,exports){
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
    Object.defineProperty(PlayerGuestAgent.prototype, "TotalStart", {
        get: function () {
            return this.m_PlayerEntity.TotalStart;
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
            0;
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
},{"./../controler/GameAPP":45,"./BaseAgent":1}],5:[function(require,module,exports){
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
},{"./../FrameWork/BaseManager":8,"./../Scene/Scene":38}],12:[function(require,module,exports){
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
},{"../controler/APP":44,"./../Base/BaseEnum":5,"./../Utility/UIFunc":43,"./BaseManager":8}],14:[function(require,module,exports){
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
    GameConfig.startScene = "Enter.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = true;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    return GameConfig;
}());
exports.default = GameConfig;
GameConfig.init();
},{"./script/ItemElement":48,"./script/RoleElement":49}],15:[function(require,module,exports){
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
},{"../Utility/Path":41,"./GameManager":16}],16:[function(require,module,exports){
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
},{"../Utility/Path":41}],17:[function(require,module,exports){
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
var GameManager_1 = require("./GameManager");
var LevelItemRangeManager = /** @class */ (function (_super) {
    __extends(LevelItemRangeManager, _super);
    function LevelItemRangeManager() {
        return _super.call(this, "LevelItemRange") || this;
    }
    Object.defineProperty(LevelItemRangeManager, "Mgr", {
        get: function () {
            if (!LevelItemRangeManager.g_Mgr) {
                LevelItemRangeManager.g_Mgr = new LevelItemRangeManager();
            }
            return LevelItemRangeManager.g_Mgr;
        },
        enumerable: true,
        configurable: true
    });
    LevelItemRangeManager.prototype.GenInfo = function (data) {
        return new LevelItemRange(data);
    };
    LevelItemRangeManager.prototype.GetInfo = function (id) {
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
    LevelItemRangeManager.prototype.GetAllInfo = function () {
        return this.m_Map;
    };
    return LevelItemRangeManager;
}(GameManager_1.GameManager.BaseManager));
exports.default = LevelItemRangeManager;
var LevelItemRange = /** @class */ (function (_super) {
    __extends(LevelItemRange, _super);
    function LevelItemRange(data) {
        var _this = _super.call(this, data) || this;
        _this.m_ID = data.ID ? data.ID : "";
        _this.m_Passscore = data.Passscore ? data.Passscore : "";
        _this.m_RewardActorID = data.RewardActorID ? data.RewardActorID : "";
        _this.m_Levelrange = data.levelrange ? data.levelrange : "";
        return _this;
    }
    Object.defineProperty(LevelItemRange.prototype, "RewardActorID", {
        get: function () {
            return this.m_RewardActorID;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelItemRange.prototype, "Passscore", {
        get: function () {
            return this.m_Passscore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LevelItemRange.prototype, "Levelrange", {
        get: function () {
            return this.m_Levelrange;
        },
        enumerable: true,
        configurable: true
    });
    return LevelItemRange;
}(GameManager_1.GameManager.BaseInfo));
},{"./GameManager":16}],19:[function(require,module,exports){
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
},{"./../Utility/Path":41,"./../controler/APP":44,"./../controler/GameControler":46}],20:[function(require,module,exports){
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
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CharactorAnimator = /** @class */ (function () {
    function CharactorAnimator(animator) {
        this.m_Aniamtor = animator;
        this.m_StateMap = {};
        if (!animator)
            return;
        if (!animator.getControllerLayer())
            var a = 1;
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
},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseFunc_1 = require("../Base/BaseFunc");
//游戏中相机
var GameCamera = /** @class */ (function (_super) {
    __extends(GameCamera, _super);
    function GameCamera() {
        var _this = _super.call(this) || this;
        _this.orthographic = true;
        _this.Ctrler = new GameCameraCtrler(_this);
        _this.Player = null;
        //this.timerLoop(1,this.Ctrler,this.Ctrler.Update);
        _this.frameLoop(1, _this, _this._Update);
        _this.clearFlag = Laya.BaseCamera.CLEARFLAG_SKY;
        _this.m_CountPS = new BaseFunc_1.BaseFunc.SmoothDamp(1, 1000);
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

        this.Camera.DynamicPS =CameraPS;
        */
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
},{"../Base/BaseFunc":6}],23:[function(require,module,exports){
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
            //this.ItemNum = num;
            this.ItemNum = num * 3;
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
            var Name = Path_1.path.GetLH("zhangaiwu_qiu0" + idx);
            model = Laya.loader.getRes(Name);
            model = model.clone();
            this.Model = model;
            var scale = this.Model.transform.scale.clone();
            Laya.Vector3.scale(scale, 1.5, scale);
            this.Model.transform.scale = scale;
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
            var scale = this.Model.transform.scale.clone();
            Laya.Vector3.scale(scale, 1.2, scale);
            this.Model.transform.scale = scale;
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
},{"./../Game/AnimObj":19,"./../Utility/Path":41,"./../controler/APP":44,"./../controler/GameControler":46,"./CharacterAnimator":21,"./GameModule":25,"./GameStruct":26,"./Input":27,"./PlayerCtrler":30}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MountLine_1 = require("./MountLine");
var GameStruct_1 = require("./GameStruct");
var GameItem_1 = require("./GameItem");
var GameModule_1 = require("./GameModule");
var Mounts = 2;
var LineSpace = 2;
var Gamemap = /** @class */ (function (_super) {
    __extends(Gamemap, _super);
    /**
     *
     * @param floorNum 层数
     * @param column 列数
     * @param camera 相机
     * @param distance 距离
     */
    function Gamemap(floorNum, column) {
        var _this = _super.call(this) || this;
        _this.m_ViewColums = column;
        _this.m_MountLines = [];
        _this.m_CurIdx = 0;
        _this.m_HeadFloorIdx = 0;
        _this.m_TailFLoorIdx = 0;
        _this.m_ItemLayout = new GameItem_1.Item.ItemLayout();
        _this.m_CurLineBarriers = new Array();
        _this.m_CurLineRewards = new Array();
        _this.m_rightSwitchCount = 0;
        _this.m_SafeLocation = new GameStruct_1.GameStruct.MLocation(-1, -1);
        var floorColumNum = floorNum * 2 + 4;
        for (var idx = 0; idx < floorNum; ++idx) {
            var newMountain = new MountLine_1.default(idx, floorColumNum, idx);
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
    /**
     *
     * @param startFloor 起始层
     * @param camera 相机
     * @param viewHeight 相机垂直视野
     */
    Gamemap.prototype.Init = function (startFloor, camera, viewHeight) {
        //var lineNormalVector: Laya.Vector3 = new Laya.Vector3(0, GameModule.VSpace, GameModule.DSpace);
        startFloor = (!startFloor) && (startFloor < 0) && (startFloor >= lines.length) ? 0 : startFloor;
        //var cameraPS: Laya.Vector3 = new Laya.Vector3(0,15,20);
        var cameraPS = new Laya.Vector3(0, 15, 20);
        var cmeraViewHeight = viewHeight / (this.m_MountLines.length);
        GameModule_1.GameModule.VSpace = cmeraViewHeight;
        camera.orthographicVerticalSize = viewHeight - 2.5 * cmeraViewHeight;
        var screenWidht = Laya.stage.width;
        var widtthSpace = screenWidht / this.m_ViewColums;
        var spacePS = new Laya.Vector3(widtthSpace, 0, 0);
        camera.convertScreenCoordToOrthographicCoord(spacePS, spacePS);
        GameModule_1.GameModule.HSpace = 3; //spacePS.x;
        Laya.Vector3.add(cameraPS, new Laya.Vector3(0, GameModule_1.GameModule.VSpace * (startFloor), 0), cameraPS);
        var lines = this.m_MountLines;
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
                this.m_StartPosition = PlayerStep.position;
                PlayerStep.IsDeadRoad = false;
                this.m_SafeLocation = PlayerStep.Location;
            }
            this.PutItemInLine(idx);
        }
        for (var startFloorNum = 0; startFloorNum < startFloor; ++startFloorNum) {
            lines[startFloorNum].active = false;
        }
        return cameraPS;
    };
    /**
     *
     * @param startFloor
     * @param camera
     * @param distance
     * @returns 相机位置
     
    public Init(startFloor: number, camera: Laya.Camera, distance: number): Laya.Vector3 {
        //var lineNormalVector: Laya.Vector3 = new Laya.Vector3(0, GameModule.VSpace, GameModule.DSpace);
        startFloor = (!startFloor) && (startFloor < 0) && (startFloor >= lines.length) ? 0 : startFloor;
        var lineNormalVector: Laya.Vector3 = new Laya.Vector3(0, GameModule.DesighnV, GameModule.DesighnD);
        Laya.Vector3.normalize(lineNormalVector, lineNormalVector);
        var cameraPS: Laya.Vector3 = new Laya.Vector3();
        var cameraMidelNormalVector: Laya.Vector3 = camera.transform.forward;
        var xRotateAngle: number = (Math.PI / 180) * (camera.fieldOfView / 2);

        var xRotateQuaternion: Laya.Quaternion = new Laya.Quaternion();
        Laya.Quaternion.createFromAxisAngle(new Laya.Vector3(1, 0, 0), -xRotateAngle, xRotateQuaternion)
        var cameraBottomNormalVector: Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.transformQuat(cameraMidelNormalVector, xRotateQuaternion, cameraBottomNormalVector);

        var bottomAngelCos: number = 0;

        var bottomPointToCameraNormal:Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.scale(cameraBottomNormalVector,-1,bottomPointToCameraNormal);
        bottomAngelCos = Laya.Vector3.dot(lineNormalVector, bottomPointToCameraNormal);
        var bottomAngelSin = Math.sqrt(1 - Math.pow(bottomAngelCos, 2));

        var bottomLength: number = distance / bottomAngelSin;
        var cameraBottomVector: Laya.Vector3 = cameraBottomNormalVector.clone();
        Laya.Vector3.scale(cameraBottomNormalVector, -1 * bottomLength, cameraBottomVector);

        cameraPS = new Laya.Vector3();
        Laya.Vector3.add(cameraPS, cameraBottomVector, cameraPS);
        var bottomAngel:number =Math.acos(bottomAngelCos);
        var topAngle: number = 90 * (Math.PI / 180) - bottomAngel;
        var lineLength: number = bottomLength / Math.sin(topAngle) * Math.sin(camera.fieldOfView* (Math.PI / 180));
        var perLength: number = lineLength / (this.m_MountLines.length - 1 );

        var stepSpaceScale: number = perLength / Math.sqrt(GameModule.DesighnV * GameModule.DesighnV + GameModule.DesighnD * GameModule.DesighnD);
        GameModule.VSpace = GameModule.VSpace * stepSpaceScale;
        GameModule.DSpace = GameModule.DSpace * stepSpaceScale;
        var switchFloor = startFloor - 1.5;
        Laya.Vector3.add(cameraPS, new Laya.Vector3(0, -GameModule.VSpace * switchFloor, GameModule.DSpace * switchFloor), cameraPS);

        var lines: MountLine[] = this.m_MountLines;
        this.m_HeadFloorIdx = lines.length - 1;
        this.m_TailFLoorIdx = 0;
        this.m_rightSwitchCount = 0;
        for (var idx: number = 0; idx < lines.length; ++idx) {
            var line: MountLine = lines[idx];
            line.SetLine(idx, this.CountNextFloorDirSwith());
            if (idx > 1)
                lines[idx - 1].SetNextFloor(line);
            if (idx == startFloor) {
                var PlayerStep = line.GetStep(Math.floor(line.Length / 2));
                this.m_StartPosition = PlayerStep.position;
                PlayerStep.IsDeadRoad = false;
                this.m_SafeLocation = PlayerStep.Location;
            }
            this.PutItemInLine(idx);
        }
        for (var startFloorNum: number = 0; startFloorNum < startFloor; ++startFloorNum) {
            lines[startFloorNum].active = false;
        }
        return cameraPS;
    }
*/
    Gamemap.prototype.SetPlayer = function (player) {
        this.m_Player = player;
    };
    Gamemap.prototype.CountNextFloorDirSwith = function () {
        var switchCount = 0;
        if (this.m_Player) {
            var position;
            if (this.m_Player.CurStep && this.m_Player.CurStep.position) {
                position = this.m_Player.CurStep.position;
            }
            else {
                position = this.m_Player.Position;
            }
            switchCount = (position.x - this.m_StartPosition.x) / (GameModule_1.GameModule.HSpace / 2);
        }
        return switchCount;
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
},{"./GameItem":23,"./GameModule":25,"./GameStruct":26,"./MountLine":28}],25:[function(require,module,exports){
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
    GameModule.DSpace = 0.6;
    //export var DesighnV:number = 2.5;
    //export var DesighnD:number = 0.6;
})(GameModule = exports.GameModule || (exports.GameModule = {}));
},{}],26:[function(require,module,exports){
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
},{}],27:[function(require,module,exports){
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
},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Step_1 = require("./Step");
var GameModule_1 = require("./GameModule");
var Space;
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
        newPS.y = GameModule_1.GameModule.VSpace * floor;
        newPS.z = -GameModule_1.GameModule.DSpace * floor;
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
},{"./GameModule":25,"./Step":31}],29:[function(require,module,exports){
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
        var scale = this.m_PlayerModel.transform.scale;
        Laya.Vector3.scale(scale, 1.2, scale);
        this.m_PlayerModel.transform.scale = scale;
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
},{"../Utility/Path":41,"./../FrameWork/MessageCenter":10,"./../controler/APP":44,"./../controler/GameAPP":45,"./../controler/GameControler":46,"./Character":20,"./CharacterAnimator":21,"./GameItem":23,"./PlayerCtrler":30}],30:[function(require,module,exports){
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
            this.m_TargetPS = this.player.CurStep.standPoint.transform.position;
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
                    var fallTimePoint = 0.5;
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
},{"./../controler/APP":44,"./../controler/GameControler":46,"./GameModule":25}],31:[function(require,module,exports){
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
},{"./../Utility/Path":41,"./../controler/APP":44,"./CharacterAnimator":21,"./GameItem":23,"./GameStruct":26}],32:[function(require,module,exports){
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
},{"./GameConfig":14,"./Scene/LoadScene":37,"./controler/APP":44}],33:[function(require,module,exports){
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
},{"../GameManager/CharacterMamager":15}],34:[function(require,module,exports){
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
},{"./../Utility/Path":41,"./Scene":38,"./ScenePlay/GameScenePlay":39}],35:[function(require,module,exports){
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
},{"./../Game/GameItem":23,"./../Scene/Scene":38,"./GameDirector":34}],36:[function(require,module,exports){
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
},{"../controler/APP":44,"./../Scene/Scene":38,"./../Utility/Path":41,"./../ui/EnterGameUI":54}],37:[function(require,module,exports){
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
            Path_1.path.GetJsonPath("LevelInfo"),
            Path_1.path.GetJsonPath("LevelItemRange"),
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
            Path_1.path.GetLH("zhangaiwu_qiu01"),
            Path_1.path.GetLH("zhangaiwu_qiu02"),
            Path_1.path.GetLH("zhangaiwu_qiu03"),
            Path_1.path.GetLH("zhangaiwu_qiu04"),
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
},{"./../Scene/Scene":38,"./../Utility/Path":41,"./../controler/APP":44,"./../ui/BG":50,"./../ui/UnDownload/LoadingUI":59,"./GuiderManager":36}],38:[function(require,module,exports){
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
},{"../FrameWork/FrameWork":9,"./../Base/FSM":7,"./../FrameWork/MessageCenter":10,"./../controler/APP":44}],39:[function(require,module,exports){
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
var lineNum = 9;
var column = 5;
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
        _this.m_StartFloor = 2;
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
            var between = this.Distance + this.m_StartFloor - this.m_BootomFloor;
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
        var cameraBasePS = this.m_GameMap.Init(startFloor, this.Camera, 30);
        this.Player.SetStep(this.m_GameMap.GetSafeStep());
        this.m_GameMap.SetPlayer(this.Player);
        var cameraPs = this.Player.Position.clone();
        cameraPs.y -= GameModule_1.GameModule.VSpace * 2;
        this.Camera.transform.position = cameraPs;
        this.Camera.Init();
        this._StartPosition = this.Player.Position;
        //this.Camera.Reset(new Laya.Vector3(), new Laya.Vector3(0, GameModule.HSpace * 3.2, GameModule.HSpace * 3.2), this.Player);
        this.Camera.Reset(new Laya.Vector3(), cameraBasePS, this.Player);
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
        var distance = this.PlayerFloor - dDistance + 4;
        if (distance > 4) {
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
},{"../../Game/GameMap":24,"../../Game/GameModule":25,"../../Utility/ModelFunc":40,"../../controler/GameAPP":45,"../../platform/WechatOpen":47,"./../../Agent/GameAgent":2,"./../../FrameWork/MessageCenter":10,"./../../Game/GameCamera":22,"./../../Game/GameItem":23,"./../../Game/GameStruct":26,"./../../Game/Input":27,"./../../Game/Player":29,"./../../Scene/Scene":38,"./../../controler/APP":44,"./../../ui/EndGameUI":53,"./../../ui/GameUI":55}],40:[function(require,module,exports){
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
},{}],41:[function(require,module,exports){
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
},{}],42:[function(require,module,exports){
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
},{}],43:[function(require,module,exports){
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
},{}],44:[function(require,module,exports){
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
},{"../Game/GameModule":25,"./../FrameWork/FrameWork":9,"./../FrameWork/MessageCenter":10,"./../FrameWork/SceneManager":11,"./../FrameWork/TimeManager":12,"./../FrameWork/UIManager":13}],45:[function(require,module,exports){
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
},{"./../GameManager/CharacterMamager":15,"./../GameManager/ItemManager":17}],46:[function(require,module,exports){
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
                this._PlayerMoveTime = 0.3;
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
},{"../Game/GameModule":25,"./../Agent/PlayerGuestAgent":4,"./../Game/GameStruct":26,"./../Scene/GameScene":35,"./../ui/CharacterUI":52,"./../ui/RankPanelUI":57,"./../ui/SetPanelUI":58,"./APP":44}],47:[function(require,module,exports){
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
},{}],48:[function(require,module,exports){
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
},{"./../FrameWork/MessageCenter":10}],49:[function(require,module,exports){
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
},{"./../controler/APP":44,"./../controler/GameControler":46}],50:[function(require,module,exports){
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
},{"../Agent/PlayerGuestAgent":4,"./../Base/BaseFunc":6,"./../Utility/Path":41,"./layaMaxUI":60}],51:[function(require,module,exports){
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
},{"./../Base/BaseEnum":5,"./../FrameWork/FrameWork":9,"./../FrameWork/UIManager":13}],52:[function(require,module,exports){
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
        this._UI.removeChild(this.characterUIScene);
        this.characterUIScene = null;
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
        this.characterUIScene = null;
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
        if (this.characterUIScene) {
            return;
        }
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
        //this.BackGameBtn();
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
},{"../GameManager/CharacterMamager":15,"../Scene/CharacterUIScene":33,"../Utility/UIButtonTouchEvent":42,"../controler/GameAPP":45,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Utility/Path":41,"./../controler/APP":44,"./../controler/GameControler":46,"./BaseUI":51,"./layaMaxUI":60}],53:[function(require,module,exports){
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
},{"../Agent/PlayerGuestAgent":4,"../Scene/GuiderManager":36,"../controler/GameControler":46,"./../Utility/Path":41,"./../controler/GameControler":46,"./BaseUI":51,"./layaMaxUI":60}],54:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./layaMaxUI");
var Path_1 = require("./../Utility/Path");
var BaseUI_1 = require("./BaseUI");
var GameControler_1 = require("./../controler/GameControler");
var GameAgent_1 = require("./../Agent/GameAgent");
var PlayerGuestAgent_1 = require("../Agent/PlayerGuestAgent");
var APP_1 = require("./../controler/APP");
var LevelItemRangeManager_1 = require("../GameManager/LevelItemRangeManager");
var ExtendEnterGameUI = /** @class */ (function (_super) {
    __extends(ExtendEnterGameUI, _super);
    function ExtendEnterGameUI() {
        var _this = _super.call(this) || this;
        _this._Character.on(Laya.Event.CLICK, _this, _this.ShowCharacterPanel);
        _this._SetPanel.on(Laya.Event.CLICK, GameControler_1.default.GameControler, GameControler_1.default.GameControler.ShowSetPanel);
        _this._Start.on(Laya.Event.CLICK, _this, _this.onStart);
        _this._CharacterList.visible = false;
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
    EnterGameUI.prototype.updateDesc = function () {
        var data = LevelItemRangeManager_1.default.Mgr.GetAllInfo();
        for (var key in data) {
            var da1 = data[key].m_Passscore;
            if (key == "1") {
                this._UI["startnumtxt1"].text = "";
                continue;
            }
            this._UI["startnumtxt" + parseInt(key)].text = da1 + "星解锁";
        }
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
        this.updateDesc();
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
},{"../Agent/PlayerGuestAgent":4,"../GameManager/LevelItemRangeManager":18,"./../Agent/GameAgent":2,"./../Utility/Path":41,"./../controler/APP":44,"./../controler/GameControler":46,"./BaseUI":51,"./layaMaxUI":60}],55:[function(require,module,exports){
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
},{"../Agent/GameAgent":2,"../Game/GameModule":25,"./../Agent/PlayerEntity":3,"./../FrameWork/MessageCenter":10,"./../Utility/Path":41,"./../controler/APP":44,"./../controler/GameControler":46,"./BaseUI":51,"./ItemListUI":56,"./layaMaxUI":60}],56:[function(require,module,exports){
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
},{"../GameManager/ItemManager":17,"./../Agent/GameAgent":2,"./../Agent/PlayerEntity":3,"./../Agent/PlayerGuestAgent":4,"./../Base/BaseEnum":5,"./../FrameWork/MessageCenter":10,"./../Utility/Path":41,"./../controler/APP":44,"./../controler/GameAPP":45,"./../controler/GameControler":46,"./BaseUI":51,"./layaMaxUI":60}],57:[function(require,module,exports){
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
},{"../platform/WechatOpen":47,"./../Base/BaseEnum":5,"./../Utility/Path":41,"./BaseUI":51,"./layaMaxUI":60}],58:[function(require,module,exports){
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
},{"../Scene/GuiderManager":36,"./../Agent/PlayerGuestAgent":4,"./../Base/BaseEnum":5,"./../Game/GameStruct":26,"./../Utility/Path":41,"./../controler/GameControler":46,"./BaseUI":51,"./layaMaxUI":60}],59:[function(require,module,exports){
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
},{"./../BaseUI":51}],60:[function(require,module,exports){
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
},{}]},{},[32])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xheWFlbmdpbmUvcmVzb3VyY2VzL2FwcC9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FnZW50L0Jhc2VBZ2VudC50cyIsInNyYy9BZ2VudC9HYW1lQWdlbnQudHMiLCJzcmMvQWdlbnQvUGxheWVyRW50aXR5LnRzIiwic3JjL0FnZW50L1BsYXllckd1ZXN0QWdlbnQudHMiLCJzcmMvQmFzZS9CYXNlRW51bS50cyIsInNyYy9CYXNlL0Jhc2VGdW5jLnRzIiwic3JjL0Jhc2UvRlNNLnRzIiwic3JjL0ZyYW1lV29yay9CYXNlTWFuYWdlci50cyIsInNyYy9GcmFtZVdvcmsvRnJhbWVXb3JrLnRzIiwic3JjL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyLnRzIiwic3JjL0ZyYW1lV29yay9TY2VuZU1hbmFnZXIudHMiLCJzcmMvRnJhbWVXb3JrL1RpbWVNYW5hZ2VyLnRzIiwic3JjL0ZyYW1lV29yay9VSU1hbmFnZXIudHMiLCJzcmMvR2FtZUNvbmZpZy50cyIsInNyYy9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0dhbWVNYW5hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0l0ZW1NYW5hZ2VyLnRzIiwic3JjL0dhbWVNYW5hZ2VyL0xldmVsSXRlbVJhbmdlTWFuYWdlci50cyIsInNyYy9HYW1lL0FuaW1PYmoudHMiLCJzcmMvR2FtZS9DaGFyYWN0ZXIudHMiLCJzcmMvR2FtZS9DaGFyYWN0ZXJBbmltYXRvci50cyIsInNyYy9HYW1lL0dhbWVDYW1lcmEudHMiLCJzcmMvR2FtZS9HYW1lSXRlbS50cyIsInNyYy9HYW1lL0dhbWVNYXAudHMiLCJzcmMvR2FtZS9HYW1lTW9kdWxlLnRzIiwic3JjL0dhbWUvR2FtZVN0cnVjdC50cyIsInNyYy9HYW1lL0lucHV0LnRzIiwic3JjL0dhbWUvTW91bnRMaW5lLnRzIiwic3JjL0dhbWUvUGxheWVyLnRzIiwic3JjL0dhbWUvUGxheWVyQ3RybGVyLnRzIiwic3JjL0dhbWUvU3RlcC50cyIsInNyYy9NYWluLnRzIiwic3JjL1NjZW5lL0NoYXJhY3RlclVJU2NlbmUudHMiLCJzcmMvU2NlbmUvR2FtZURpcmVjdG9yLnRzIiwic3JjL1NjZW5lL0dhbWVTY2VuZS50cyIsInNyYy9TY2VuZS9HdWlkZXJNYW5hZ2VyLnRzIiwic3JjL1NjZW5lL0xvYWRTY2VuZS50cyIsInNyYy9TY2VuZS9TY2VuZS50cyIsInNyYy9TY2VuZS9TY2VuZVBsYXkvR2FtZVNjZW5lUGxheS50cyIsInNyYy9VdGlsaXR5L01vZGVsRnVuYy50cyIsInNyYy9VdGlsaXR5L1BhdGgudHMiLCJzcmMvVXRpbGl0eS9VSUJ1dHRvblRvdWNoRXZlbnQudHMiLCJzcmMvVXRpbGl0eS9VSUZ1bmMudHMiLCJzcmMvY29udHJvbGVyL0FQUC50cyIsInNyYy9jb250cm9sZXIvR2FtZUFQUC50cyIsInNyYy9jb250cm9sZXIvR2FtZUNvbnRyb2xlci50cyIsInNyYy9wbGF0Zm9ybS9XZWNoYXRPcGVuLnRzIiwic3JjL3NjcmlwdC9JdGVtRWxlbWVudC50cyIsInNyYy9zY3JpcHQvUm9sZUVsZW1lbnQudHMiLCJzcmMvdWkvQkcudHMiLCJzcmMvdWkvQmFzZVVJLnRzIiwic3JjL3VpL0NoYXJhY3RlclVJLnRzIiwic3JjL3VpL0VuZEdhbWVVSS50cyIsInNyYy91aS9FbnRlckdhbWVVSS50cyIsInNyYy91aS9HYW1lVUkudHMiLCJzcmMvdWkvSXRlbUxpc3RVSS50cyIsInNyYy91aS9SYW5rUGFuZWxVSS50cyIsInNyYy91aS9TZXRQYW5lbFVJLnRzIiwic3JjL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNWQSw2Q0FBOEM7QUFDOUM7SUFHSTtRQUVJLElBQUksQ0FBQyxjQUFjLEdBQUcsWUFB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LEtBQUEsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFNUIsTUFBTTtJQUNOO1FBR0k7WUFDSSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxFQUFjLENBQUM7WUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEtBQUssRUFBYyxDQUFDO1lBRTNDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFFM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFOUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFVLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMs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QUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsbUNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEgsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyx1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LGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVhBLEFBV0MsQ0FYK0IsSUFBSSxDQUFDLElBQUksR0FXeEM7SUFYWSxhQUFVLGFBV3RCLENBQUE7SUFDRCxHQUFHLENBQUMsZUFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hDO1FBQWdDLDhCQUFTO1FBR3JDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQVJBLEFBUUMsQ0FSK0IsSUFBSSxDQUFDLElBQUksR0FReEM7SUFSWSxhQUFVLGFBUXRCLENBQUE7SUFDRCxHQUFHLENBQUMsZUFBZSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsRUF0S2EsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBc0tmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCAqIGFzIFBsYXllckVudGl0eSBmcm9tIFwiLi9QbGF5ZXJFbnRpdHlcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlQWdlbnRcclxue1xyXG4gICAgcHJvdGVjdGVkIG1fUGxheWVyRW50aXR5OlBsYXllckVudGl0eS5QbGF5ZXIuUGxheWVyRW50aXR5O1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkgPSBQbGF5ZXJFbnRpdHkuUGxheWVyLlBsYXllckVudGl0eS5FbnRpdHk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lTW9kdWxlXCJcclxuaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi8uLi9HYW1lTWFuYWdlci9HYW1lTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBHYW1lQVBQIGZyb20gXCIuLi9jb250cm9sZXIvR2FtZUFQUFwiO1xyXG5pbXBvcnQgQmFzZUFnZW50IGZyb20gXCIuL0Jhc2VBZ2VudFwiXHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZUFnZW50IGV4dGVuZHMgQmFzZUFnZW50IHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9BZ2VudDogR2FtZUFnZW50O1xyXG4gICAgc3RhdGljIGdldCBBZ2VudCgpOiBHYW1lQWdlbnQge1xyXG4gICAgICAgIGlmICh0aGlzLl9BZ2VudCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FnZW50ID0gbmV3IEdhbWVBZ2VudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQWdlbnQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1fVXNlSXRlbU51bTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1NraWxsSXRlbUlEOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fU2tpbGxJdGVtTnVtOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGdldCBDdXJMZXZlbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckxldmVsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBDdXJMZXZlbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJMZXZlbCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDdXJNYXhMZXZlbCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lkhpc3RvcnlNYXhMZXZlbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VyQ2hhcmFjdGVySUQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJDaGFyYWN0ZXJJRDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgQ3VySXRlbSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEl0ZW1MaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lkl0ZW1MaXN0XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IEN1ckl0ZW0oaWQ6IG51bWJlcikge1xyXG4gICAgICAgIGlmICghdGhpcy5JdGVtTGlzdFtpZF0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW0gPSBpZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgR2FtZUl0ZW1OdW0oKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5DdXJJdGVtTnVtIDwgdGhpcy5tX1VzZUl0ZW1OdW0gPyB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckl0ZW1OdW0gOiB0aGlzLm1fVXNlSXRlbU51bTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgU2tpbGxJdGVtTnVtKCk6IG51bWJlciAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fU2tpbGxJdGVtTnVtO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZEdvbGQoZ29sZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKCFnb2xkIHx8IGdvbGQgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbW9uZXkgPSB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5ICsgZ29sZDtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5ID0gbW9uZXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEFkZFNjb3JlKHNjb3JlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAoIXNjb3JlIHx8IHNjb3JlIDwgMCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHNjb3JlID0gdGhpcy5tX1BsYXllckVudGl0eS5DdXJTY29yZSArIHNjb3JlO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyU2NvcmUgPSBzY29yZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IEN1clNjb3JlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyU2NvcmU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlc2V0R2FtZUl0ZW0oKSB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoUGxheWVyLkV2ZW50Lk9uQ3VySXRlbU51bUNoYW5nZSk7XHJcbiAgICAgICAgdGhpcy5tX1VzZUl0ZW1OdW0gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldFNraWxsSXRlbSgpIHtcclxuICAgICAgICB2YXIgQ2hhcmFjdGVySUQ6IG51bWJlciA9IHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyQ2hhcmFjdGVySUQ7XHJcbiAgICAgICAgdGhpcy5tX1NraWxsSXRlbU51bSA9IEdhbWVBUFAuQ2hhcmFjdGVyTWdyLkdldFNraWxsSXRlbShDaGFyYWN0ZXJJRCkgPCAwID8gMCA6IDE7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoR2FtZU1vZHVsZS5FdmVudC5PbkNoYXJhY3Rlckl0ZW1DaGFuZ2UpO1xyXG4gICAgICAgIHRoaXMubV9Ta2lsbEl0ZW1OdW0gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVc2VHYW1lSXRlbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5HYW1lSXRlbU51bSA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC0tdGhpcy5tX1VzZUl0ZW1OdW07XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5SZWR1Y2VJdGVtKHRoaXMuQ3VySXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVzZVNraWxsSXRlbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5Ta2lsbEl0ZW1OdW0gPCAxKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC0tdGhpcy5tX1NraWxsSXRlbU51bTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShHYW1lTW9kdWxlLkV2ZW50Lk9uQ2hhcmFjdGVySXRlbUNoYW5nZSk7XHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IHsgV2VjaGF0T3BlbiB9IGZyb20gXCIuLi9wbGF0Zm9ybS9XZWNoYXRPcGVuXCI7XHJcblxyXG5leHBvcnQgbW9kdWxlIFBsYXllciB7XHJcbiAgICBleHBvcnQgY2xhc3MgRXZlbnQge1xyXG4gICAgICAgIHN0YXRpYyBPbk1vbmV5Q2hhbmdlOiBzdHJpbmcgPSBcIk9uTW9uZXlDaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25DdXJDaGFyYWN0ZXJJRENoYW5nZTogc3RyaW5nID0gXCJPbkN1ckNoYXJhY3RlcklEQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uSGlzdG9yeU1heExldmVsQ2hhbmdlOiBzdHJpbmcgPSBcIk9uSGlzdG9yeU1heExldmVsQ2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VyTGV2ZWxDaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJMZXZlbENoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkNoYXJhY3Rlckxpc3RDaGFuZ2U6IHN0cmluZyA9IFwiT25DaGFyYWN0ZXJMaXN0Q2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VySXRlbUNoYW5nZTogc3RyaW5nID0gXCJPbkN1ckl0ZW1DaGFuZ2VcIjtcclxuICAgICAgICBzdGF0aWMgT25JdGVtTGlzdENoYW5nZTogc3RyaW5nID0gXCJPbkl0ZW1MaXN0Q2hhbmdlXCI7XHJcbiAgICAgICAgc3RhdGljIE9uQ3VyU2NvcmVDaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJTY29yZUNoYW5nZVwiO1xyXG4gICAgICAgIHN0YXRpYyBPbkN1ckl0ZW1OdW1DaGFuZ2U6IHN0cmluZyA9IFwiT25DdXJJdGVtTnVtQ2hhbmdlXCJcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWVyRW50aXR5IHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBtX0VudGl0eTogUGxheWVyRW50aXR5O1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0IEVudGl0eSgpOiBQbGF5ZXJFbnRpdHkge1xyXG4gICAgICAgICAgICBpZiAoIVBsYXllckVudGl0eS5tX0VudGl0eSkge1xyXG4gICAgICAgICAgICAgICAgUGxheWVyRW50aXR5Lm1fRW50aXR5ID0gbmV3IFBsYXllckVudGl0eTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUGxheWVyRW50aXR5Lm1fRW50aXR5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIG1fRnJhbWVXb3JrOiBGcmFtZVdvcms7XHJcbiAgICAgICAgcHJpdmF0ZSBtX01lc3NhZ2VNZ3I6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG5cclxuICAgICAgICAvL+mSsVxyXG4gICAgICAgIHByaXZhdGUgbV9Nb25leTogbnVtYmVyO1xyXG4gICAgICAgIC8v6YCJ5Lit6KeS6ImySURcclxuICAgICAgICBwcml2YXRlIG1fQ3VyQ2hhcmFjdGVySUQ6IG51bWJlcjtcclxuICAgICAgICAvL+eOqeWutuW3suino+mUgeeahOacgOmrmOWFs+WNoVxyXG4gICAgICAgIHByaXZhdGUgbV9IaXN0b3J5TWF4TGV2ZWw6IG51bWJlcjtcclxuICAgICAgICAvL+W9k+WJjemAieS4reWFs+WNoVxyXG4gICAgICAgIHByaXZhdGUgbV9DdXJMZXZlbDogbnVtYmVyO1xyXG4gICAgICAgIC8v6KeS6Imy5YiX6KGoXHJcbiAgICAgICAgcHJpdmF0ZSBtX0NoYXJhY3Rlckxpc3Q6IEFycmF5PG51bWJlcj47XHJcbiAgICAgICAgLy/lvZPliY3mi6XpgInkuK3pgZPlhbdcclxuICAgICAgICBwcml2YXRlIG1fQ3VySXRlbTogbnVtYmVyO1xyXG4gICAgICAgIC8v54mp5ZOB5YiX6KGoXHJcbiAgICAgICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OiBBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIC8v56ev5YiGXHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1clNjb3JlOiBudW1iZXI7XHJcbiAgICAgICAgLy/lvZPliY3ojrflvpfmgLvmmJ/mmJ/mlbDph49cclxuICAgICAgICBwcml2YXRlIG1fVG90YWxTdGFyczogbnVtYmVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFRvdGFsU3RhcnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9Ub3RhbFN0YXJzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldCBNb25leSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX01vbmV5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IE1vbmV5KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IHRoaXMubV9Nb25leSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9Nb25leSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uTW9uZXlDaGFuZ2UpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgQ3VyQ2hhcmFjdGVySUQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJDaGFyYWN0ZXJJRDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJDaGFyYWN0ZXJJRCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyQ2hhcmFjdGVySUQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1ckNoYXJhY3RlcklEQ2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBDdXJMZXZlbCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckxldmVsOy8vID8gdGhpcy5tX0N1ckxldmVsIDogdGhpcy5tX0hpc3RvcnlNYXhMZXZlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHNldCBDdXJMZXZlbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLkN1ckxldmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0N1ckxldmVsID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJMZXZlbENoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgSGlzdG9yeU1heExldmVsKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSGlzdG9yeU1heExldmVsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc2V0IEhpc3RvcnlNYXhMZXZlbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLm1fSGlzdG9yeU1heExldmVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5tX0hpc3RvcnlNYXhMZXZlbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uSGlzdG9yeU1heExldmVsQ2hhbmdlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IENoYXJhY3Rlckxpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0NoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ3VySXRlbSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLm1fQ3VySXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJJdGVtID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJJdGVtQ2hhbmdlKVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1ckl0ZW0oKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9DdXJJdGVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1ckl0ZW1OdW0oKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuR2V0SXRlbU51bSh0aGlzLkN1ckl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEl0ZW1MaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX0l0ZW1MaXN0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEN1clNjb3JlKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyU2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzZXQgQ3VyU2NvcmUodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX0N1clNjb3JlID0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJTY29yZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICBXZWNoYXRPcGVuLmdldEluc3RhbmNlcygpLnVwZGF0ZVNjb3JlKHZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkN1clNjb3JlQ2hhbmdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB2YXIgaW50ZXJlc3RpbmdsaWZlID0gKExheWEuTG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJJbnRlcmVzdGluZ2xpZmVcIikgIT0gbnVsbCA/IEpTT04ucGFyc2UoTGF5YS5Mb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIkludGVyZXN0aW5nbGlmZVwiKSkgOiB7fSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Nb25leSA9IGludGVyZXN0aW5nbGlmZS5tX01vbmV5IHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJMZXZlbCA9IGludGVyZXN0aW5nbGlmZS5tX0N1ckxldmVsIHx8IDE7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJDaGFyYWN0ZXJJRCA9IGludGVyZXN0aW5nbGlmZS5tX0N1ckNoYXJhY3RlcklEfHwgMDtcclxuICAgICAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBpbnRlcmVzdGluZ2xpZmUubV9DaGFyYWN0ZXJMaXN0IHx8IFsxLDAsMCwwLDBdO1xyXG4gICAgICAgICAgICB0aGlzLm1fSGlzdG9yeU1heExldmVsID0gaW50ZXJlc3RpbmdsaWZlLm1fSGlzdG9yeU1heExldmVsIHx8IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJJdGVtID0gaW50ZXJlc3RpbmdsaWZlLm1fQ3VySXRlbSB8fCAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fRnJhbWVXb3JrID0gRnJhbWVXb3JrLkZNO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nciA9IEZyYW1lV29yay5GTS5HZXRNYW5hZ2VyPE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyPihNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcik7XHJcbiAgICAgICAgICAgIHRoaXMubV9JdGVtTGlzdCA9IGludGVyZXN0aW5nbGlmZS5tX0l0ZW1MaXN0IHx8IFtdO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyU2NvcmUgPSBpbnRlcmVzdGluZ2xpZmUubV9DdXJTY29yZSB8fCAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHNhdmVEYXRhVG9Mb2NhbCgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdmFyIGxvY2FsRGF0YTphbnkgPSB7fTtcclxuICAgICAgICAgICAgbG9jYWxEYXRhLm1fTW9uZXkgPSB0aGlzLm1fTW9uZXk7XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0N1ckxldmVsID0gdGhpcy5tX0N1ckxldmVsO1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9DdXJDaGFyYWN0ZXJJRCA9IHRoaXMubV9DdXJDaGFyYWN0ZXJJRDtcclxuICAgICAgICAgICAgbG9jYWxEYXRhLm1fQ2hhcmFjdGVyTGlzdCA9IHRoaXMubV9DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9IaXN0b3J5TWF4TGV2ZWwgPSB0aGlzLm1fSGlzdG9yeU1heExldmVsO1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9DdXJJdGVtID0gdGhpcy5tX0N1ckl0ZW07XHJcbiAgICAgICAgICAgIGxvY2FsRGF0YS5tX0l0ZW1MaXN0ID0gdGhpcy5tX0l0ZW1MaXN0O1xyXG4gICAgICAgICAgICBsb2NhbERhdGEubV9DdXJTY29yZSA9IHRoaXMubV9DdXJTY29yZTtcclxuICAgICAgICAgICAgTGF5YS5Mb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIkludGVyZXN0aW5nbGlmZVwiLCBsb2NhbERhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgQWRkQ2hhcmFjdGVyKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3RbaWRdID0gMTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5PbkNoYXJhY3Rlckxpc3RDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIEFkZEl0ZW0oaWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubV9JdGVtTGlzdFtpZF0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9JdGVtTGlzdFtpZF0gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICsrdGhpcy5tX0l0ZW1MaXN0W2lkXTtcclxuICAgICAgICAgICAgdGhpcy5tX01lc3NhZ2VNZ3IuRmlyZShFdmVudC5Pbkl0ZW1MaXN0Q2hhbmdlKTtcclxuICAgICAgICAgICAgaWYgKGlkID09IHRoaXMuQ3VySXRlbSlcclxuICAgICAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25DdXJJdGVtTnVtQ2hhbmdlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZWR1Y2VJdGVtKGlkOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLm1fSXRlbUxpc3RbaWRdIHx8IHRoaXMubV9JdGVtTGlzdFtpZF0gPCAxKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAtLXRoaXMubV9JdGVtTGlzdFtpZF07XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlTWdyLkZpcmUoRXZlbnQuT25JdGVtTGlzdENoYW5nZSk7XHJcbiAgICAgICAgICAgIGlmIChpZCA9PSB0aGlzLkN1ckl0ZW0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWVzc2FnZU1nci5GaXJlKEV2ZW50Lk9uQ3VySXRlbU51bUNoYW5nZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgR2V0SXRlbU51bShpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBudW06IG51bWJlciA9IHRoaXMubV9JdGVtTGlzdFtpZF07XHJcbiAgICAgICAgICAgIG51bSA9IG51bSA/IG51bSA6IDA7XHJcbiAgICAgICAgICAgIHJldHVybiBudW07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBCYXNlQWdlbnQgZnJvbSBcIi4vQmFzZUFnZW50XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVBUFBcIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXJHdWVzdEFnZW50IGV4dGVuZHMgQmFzZUFnZW50IHtcclxuICAgIHN0YXRpYyBfQWdlbnQ6IFBsYXllckd1ZXN0QWdlbnQ7XHJcbiAgICBzdGF0aWMgZ2V0IEd1ZXN0QWdlbnQoKTogUGxheWVyR3Vlc3RBZ2VudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0FnZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fQWdlbnQgPSBuZXcgUGxheWVyR3Vlc3RBZ2VudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fQWdlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBTa2luRGlyKCk6U3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJlbnRlcnNjZW5ldWkvcmVzXCIgKyB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckxldmVsICsgXCIvXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBUb3RhbFN0YXJ0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXJFbnRpdHkuVG90YWxTdGFydDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IEN1ckxldmVsKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgQ3VyTGV2ZWwodmFsOm51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQ3VyTGV2ZWwgPSB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBNb25leSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBDaGFyYWN0ZXJMaXN0KCk6IEFycmF5PG51bWJlcj4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyRW50aXR5LkNoYXJhY3Rlckxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBJdGVtTGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BsYXllckVudGl0eS5JdGVtTGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBCdXlDaGFyYWN0ZXIoaWQ6IG51bWJlcikgIHtcclxuICAgICAgICB2YXIgcHJpY2UgPSBHYW1lQVBQLkNoYXJhY3Rlck1nci5HZXRQcmljZShpZCk7XHJcbiAgICAgICAgaWYgKGlkIDwgMHx8IHByaWNlIDwwIHx8IHByaWNlID4gdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSkgIHswXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5Nb25leSAtPSBwcmljZTtcclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5LkFkZENoYXJhY3RlcihpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEJ1eUl0ZW0oaWQ6IG51bWJlcikgIHtcclxuICAgICAgICB2YXIgcHJpY2UgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0UHJpY2UoaWQpO1xyXG4gICAgICAgIGlmKGlkIDwgMHx8IHByaWNlIDwwIClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYocHJpY2UgPiB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fUGxheWVyRW50aXR5Lk1vbmV5IC09IHByaWNlO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJFbnRpdHkuQWRkSXRlbShpZCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldENoYXJhY3RlcihpZClcclxuICAgIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDpBcnJheTxudW1iZXI+ID0gdGhpcy5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIGlmKGNoYXJhY3Rlckxpc3RbaWRdKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX1BsYXllckVudGl0eS5DdXJDaGFyYWN0ZXJJRCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgQmFzZUVudW0ge1xyXG4gICAgZXhwb3J0IGVudW0gVUlUeXBlRW51bSB7TG93LE1pZGxlfTtcclxufSIsImltcG9ydCBCYXNlTWdyIGZyb20gXCIuLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIjtcclxuLyoqXHJcbiAqIOWumuS5ieWfuuehgOe7k+aehOS9k1xyXG4gKi9cclxuZXhwb3J0IG1vZHVsZSBCYXNlRnVuYyB7XHJcbiAgICBlbnVtIFVJVHlwZUVudW0geyBMb3csIE1pZGxlIH07XHJcbiAgICBleHBvcnQgY2xhc3MgTWFwPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBfQ291bnQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9NYXA6IHsgW2tleTogc3RyaW5nXTogVCB9O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9NYXAgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9Db3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yRWFjaChjYWxsYmFjazogKG1ncjogVCwga2V5OiBzdHJpbmcpID0+IHZvaWQpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbWFwS2V5IGluIHRoaXMuX01hcCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5fTWFwW21hcEtleV0sIG1hcEtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIG9iaiDmlL7lhaXlr7nosaFcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOmUrlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNldChvYmo6IFQsIGtleTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICsrdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fTWFwW2tleV0gPSBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEdldChrZXk6IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTWFwW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIEBwYXJhbSBrZXkg56e76Zmk5p+Q5Liq5a+56LGhXHJcbiAgICAgICAgICogQHJldHVybnMg6KKr56e76Zmk5a+56LGhXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgUmVtb3ZlKGtleTogc3RyaW5nKTogVCB7XHJcbiAgICAgICAgICAgIHZhciBPYmo6IFQgPSB0aGlzLl9NYXBba2V5XTtcclxuICAgICAgICAgICAgaWYgKE9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTWFwW2tleV0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgLS10aGlzLl9Db3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gT2JqO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0ga2V5IOmUrlxyXG4gICAgICAgICAqIEByZXR1cm5zIOaYr+WQpuaLpeaciVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEhhcyhrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fTWFwW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5vZGU8VD5cclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIF9WYWx1ZTogVDtcclxuICAgICAgICBwcml2YXRlIF9OZXh0OiBOb2RlPFQ+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgVmFsdWUoKTogVCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9WYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFZhbHVlKHZhbHVlOiBUKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBOZXh0KCk6IE5vZGU8VD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fTmV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IE5leHQobm9kZTogTm9kZTxUPikge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fTmV4dCA9IG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIE5vZGVQb29sPFQ+XHJcbiAgICB7XHJcbiAgICAgICAgcHJvdGVjdGVkIF9Ob2RlTGlzdDogTm9kZTxUPjtcclxuICAgICAgICBQdWxsQmFjayhub2RlOiBOb2RlPFQ+KSB7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSBudWxsO1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fTm9kZUxpc3QpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0Lk5leHQgPSBub2RlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fTm9kZUxpc3QgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEFxdWlyZSgpOiBOb2RlPFQ+IHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6IE5vZGU8VD4gPSB0aGlzLl9Ob2RlTGlzdDtcclxuICAgICAgICAgICAgaWYgKG5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX05vZGVMaXN0ID0gdGhpcy5fTm9kZUxpc3QuTmV4dDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUgPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE5vZGVRdWV1ZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX0NvdW50O1xyXG4gICAgICAgIHByaXZhdGUgX0hlYWQ6IE5vZGU8VD5cclxuICAgICAgICBwcml2YXRlIF9UYWlsZVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBnZXQgQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0NvdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBvcE5vZGUoKTogTm9kZTxUPiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9Db3VudCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbm9kZTogTm9kZTxUPiA9IG51bGw7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLl9IZWFkO1xyXG4gICAgICAgICAgICB0aGlzLl9IZWFkID0gdGhpcy5fSGVhZC5OZXh0O1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICAtLXRoaXMuX0NvdW50O1xyXG4gICAgICAgICAgICAvL+WIq+aKiuWwvuW3tOW4puWHuuWOu+S6hlxyXG4gICAgICAgICAgICBpZiAodGhpcy5fQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGFpbGUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFB1c2godmFsdWU6IFQpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6IE5vZGU8VD4gPSBuZXcgTm9kZTxUPigpO1xyXG4gICAgICAgICAgICBub2RlLlZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuUHVzaE5vZGUobm9kZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgUHVzaE5vZGUobm9kZTogTm9kZTxUPikge1xyXG4gICAgICAgICAgICBub2RlLk5leHQgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fSGVhZCA9IG5vZGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9UYWlsZS5OZXh0ID0gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG5vZGU7XHJcbiAgICAgICAgICAgICsrdGhpcy5fQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBDbGVhcigpIHtcclxuICAgICAgICAgICAgdGhpcy5fQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9UYWlsZSA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0hlYWQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IEhlYWROb2RlKCk6IE5vZGU8VD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5IZWFkTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBIZWFkVmFsdWUoKTogVCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9IZWFkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fSGVhZC5WYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgZ2V0IFRhaWxOb2RlKCk6IE5vZGU8VD4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWlsTm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBUYWlsVmFsdWUoKTogVCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UYWlsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1RhaWxlLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBRdWV1ZTxUPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX05vZGVQb29sOiBOb2RlUG9vbDxUPjtcclxuICAgICAgICBwcml2YXRlIF9Ob2RlUXVldWU6IE5vZGVRdWV1ZTxUPjtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVQb29sID0gbmV3IE5vZGVQb29sPFQ+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX05vZGVRdWV1ZSA9IG5ldyBOb2RlUXVldWU8VD4oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXNoKHZhbHVlOiBUKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlOiBOb2RlPFQ+ID0gdGhpcy5fTm9kZVBvb2wuQXF1aXJlKCk7XHJcbiAgICAgICAgICAgIG5vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5fTm9kZVF1ZXVlLlB1c2hOb2RlKG5vZGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFBvcCgpOiBUIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6IE5vZGU8VD4gPSB0aGlzLl9Ob2RlUXVldWUuUG9wTm9kZSgpO1xyXG4gICAgICAgICAgICBpZiAobm9kZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fTm9kZVBvb2wuUHVsbEJhY2sobm9kZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0IENvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9Ob2RlUXVldWUuQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTbW9vdGhEYW1wIHtcclxuICAgICAgICBwcml2YXRlIG1fQ3VycmVudFZlbG9jaXR5OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1Ntb290aFRpbWU6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1fTWF4U3BlZWQ6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1fTWF4TW92ZU51bTpudW1iZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIHNtb290aFRpbWUg5bmz5ruR5pe26ZW/XHJcbiAgICAgICAgICogQHBhcmFtIG1heFNwZWVkIOacgOWkp+mAn+W6plxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNtb290aFRpbWU6IG51bWJlciwgbWF4U3BlZWQ6IG51bWJlciA9IDEwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJyZW50VmVsb2NpdHkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm1fU21vb3RoVGltZSA9IHNtb290aFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9NYXhTcGVlZCA9IG1heFNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLm1fTWF4TW92ZU51bSA9IHRoaXMubV9NYXhTcGVlZCAqIHRoaXMubV9TbW9vdGhUaW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXHJcbiAgICAgICAgICogQHBhcmFtIGN1cnJlbnQg5b2T5YmN5YC8XHJcbiAgICAgICAgICogQHBhcmFtIHRhcmdldCDnm67moIflgLxcclxuICAgICAgICAgKiBAcGFyYW0gZGVsdGFUaW1lIOW4p+eOh1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBTbW9vdGhEYW1wKGN1cnJlbnQ6bnVtYmVyLHRhcmdldDpudW1iZXIsZGVsdGFUaW1lOm51bWJlciA9IDEvNjApOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIG51bTpudW1iZXIgPSAyL3RoaXMubV9TbW9vdGhUaW1lO1xyXG4gICAgICAgICAgICB2YXIgbnVtMjpudW1iZXIgPSBudW0gKiBkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIHZhciBudW0zOm51bWJlciA9IDEvKDErbnVtMiswLjQ4Km51bTIqbnVtMiswLjIzNSpudW0yKm51bTIqbnVtMik7XHJcbiAgICAgICAgICAgIHZhciBudW00Om51bWJlciA9IGN1cnJlbnQgLSB0YXJnZXQ7XHJcbiAgICAgICAgICAgIHZhciBudW01Om51bWJlciA9IHRhcmdldDtcclxuICAgICAgICAgICAgdmFyIG51bTY6bnVtYmVyID0gdGhpcy5tX01heFNwZWVkICogdGhpcy5tX1Ntb290aFRpbWU7XHJcbiAgICAgICAgICAgIG51bTQgPSBudW00ID4tbnVtNiYmbnVtNDxudW02P251bTQ6KG51bTQ+bnVtNj9udW02Oi1udW02KTtcclxuICAgICAgICAgICAgdGFyZ2V0ID0gY3VycmVudCAtIG51bTQ7XHJcbiAgICAgICAgICAgIHZhciBudW03Om51bWJlciA9ICh0aGlzLm1fQ3VycmVudFZlbG9jaXR5K251bSpudW00KSpkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJyZW50VmVsb2NpdHkgPSAodGhpcy5tX0N1cnJlbnRWZWxvY2l0eSAtIG51bSpudW03KSpudW0zO1xyXG4gICAgICAgICAgICB2YXIgbnVtODpudW1iZXIgPSB0YXJnZXQgKyhudW00K251bTcpKm51bTM7XHJcbiAgICAgICAgICAgIGlmKG51bTUgLSBjdXJyZW50ID4gMCA9PSBudW04Pm51bTUpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG51bTggPSBudW01O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9IChudW04IC0gbnVtNSkvZGVsdGFUaW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBudW04O1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgIHB1YmxpYyBDb3VudChjdXJQUzogTGF5YS5WZWN0b3IzLCB0YXJnZXRQUzogTGF5YS5WZWN0b3IzLCBkZWx0YVRpbWU6IG51bWJlciA9IDEgLyA2MCk6TGF5YS5WZWN0b3IzIHtcclxuICAgICAgICAgICAgdmFyIG1heE1vdmU6IG51bWJlciA9IHRoaXMubV9NYXhNb3ZlTnVtO1xyXG4gICAgICAgICAgICB2YXIgcnVuVGltZVJhdGU6IG51bWJlciA9IDIgKiBkZWx0YVRpbWUgLyB0aGlzLm1fU21vb3RoVGltZTtcclxuICAgICAgICAgICAgdmFyIHRpbWVSYXRpbzogbnVtYmVyID0gMSAvICgxICsgcnVuVGltZVJhdGUgKyAwLjQ4ICogcnVuVGltZVJhdGUgKiBydW5UaW1lUmF0ZSArIDAuMjM1ICogcnVuVGltZVJhdGUgKiBydW5UaW1lUmF0ZSAqIHJ1blRpbWVSYXRlKTtcclxuICAgICAgICAgICAgdmFyIGdhcDogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UFMsIGN1clBTLCBnYXApO1xyXG4gICAgICAgICAgICB2YXIgbW92ZURpcjogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMubm9ybWFsaXplKGdhcCwgbW92ZURpcik7XHJcbiAgICAgICAgICAgIC8v6YCf5bqm5L+u5q2jXHJcbiAgICAgICAgICAgIHZhciBtb3ZlRGlzdGFuY2U6IG51bWJlciA9IExheWEuVmVjdG9yMy5kaXN0YW5jZSh0YXJnZXRQUywgY3VyUFMpO1xyXG4gICAgICAgICAgICBtb3ZlRGlzdGFuY2UgPSBtb3ZlRGlzdGFuY2UgPCBtYXhNb3ZlICYmIG1vdmVEaXN0YW5jZSA+IC1tYXhNb3ZlID8gbW92ZURpc3RhbmNlIDogKG1vdmVEaXN0YW5jZSA+IG1heE1vdmUgPyBtYXhNb3ZlIDogLW1heE1vdmUpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGN1ck1vdmVEaXN0YWNuZTpudW1iZXIgPSAoIHRoaXMubV9DdXJyZW50VmVsb2NpdHkgKyAyKihtb3ZlRGlzdGFuY2UvdGhpcy5tX1Ntb290aFRpbWUpKSpkZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJyZW50VmVsb2NpdHkgPSAodGhpcy5tX0N1cnJlbnRWZWxvY2l0eSAtIDIqY3VyTW92ZURpc3RhY25lL3RoaXMubV9TbW9vdGhUaW1lKSp0aW1lUmF0aW87XHJcbiAgICAgICAgICAgIHZhciBlbmRQUzpMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcblxyXG4gICAgICAgICAgICB2YXIgc2NhbGUgPSAobW92ZURpc3RhbmNlICsgY3VyTW92ZURpc3RhY25lKSp0aW1lUmF0aW87XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zY2FsZShtb3ZlRGlyLHNjYWxlLGVuZFBTKTtcclxuICAgICAgICAgICAgLy9MYXlhLlZlY3RvcjMuYWRkKHRhcmdldFBTLGVuZFBTLGVuZFBTKVxyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKGN1clBTLGVuZFBTLGVuZFBTKTtcclxuICAgICAgICAgICAgdmFyIGVuZE1vdmVEaXI6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QoY3VyUFMsZW5kUFMsZW5kTW92ZURpcik7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKCBMYXlhLlZlY3RvcjMuZG90KG1vdmVEaXIsZW5kTW92ZURpcikgPCAwICkvL0xheWEuVmVjdG9yMy5kaXN0YW5jZSh0YXJnZXRQUyxjdXJQUykgKiBMYXlhLlZlY3RvcjMuZGlzdGFuY2UodGFyZ2V0UFMsZW5kUFMpPDAgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBlbmRQUyA9IHRhcmdldFBTO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0N1cnJlbnRWZWxvY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGVuZFBTO1xyXG4gICAgICAgICAgICAvL0xheWEuVmVjdG9yMy5zY2FsZShtb3ZlRGlyLG1vdmVEaXN0YW5jZSxlbmQpO1xyXG4gICAgICAgICAgICAvL3RhcmdldFBTICsgTGF5YS5WZWN0b3IzLmFkZChtb3ZlRGlzdGFuY2UsY3VyTW92ZURpc3RhY25lLGVuZFNwZWVkKSAobW92ZURpc3RhbmNlICsgY3VyTW92ZURpc3RhY25lKTtcclxuICAgICAgICB9Ki9cclxuICAgIH1cclxuXHJcbiAgICAvKlxyXG4gICAgICAgIGV4cG9ydCBjbGFzcyBMaW5rTm9kZUxpc3Q8VD5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHByaXZhdGUgX0hlYWROb2RlOk5vZGU8VD47XHJcbiAgICAgICAgICAgIHByaXZhdGUgX1RhaWxOb2RlOk5vZGU8VD47XHJcbiAgICBcclxuICAgICAgICAgICAgcHJpdmF0ZSBfQ291bnROb2RlOm51bWJlcjtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9IZWFkTm9kZSA9IG5ldyBOb2RlPFQ+KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9IZWFkTm9kZS5OZXh0ID0gdGhpcy5fSGVhZE5vZGU7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlID0gdGhpcy5fSGVhZE5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIOiOt+WPluWktOe7k+eCueWAvFxyXG4gICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGdldCBIZWFkVmFsdWUoKTpUXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgdGhpcy5fSGVhZE5vZGUuVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEFkZCh2YWx1ZTpUKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3Tm9kZTpOb2RlPFQ+ID0gbmV3IE5vZGU8VD4oKTtcclxuICAgICAgICAgICAgICAgIG5ld05vZGUuVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuQWRkTm9kZShuZXdOb2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBBZGROb2RlKG5ld05vZGU6Tm9kZTxUPilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fVGFpbE5vZGUhPXRoaXMuX0hlYWROb2RlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlLk5leHQgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9IZWFkTm9kZS5OZXh0ID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX1RhaWxOb2RlID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG5cclxufSIsImV4cG9ydCBtb2R1bGUgRlNNIFxyXG57XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElGU01cclxuICAgIHtcclxuICAgICAgICBVcGRhdGUoKTtcclxuICAgIH1cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGU00gPFQgZXh0ZW5kcyBTdGF0ZT4gXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0N1clN0YXRlOlQ7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1N0YXRlRGljdDp7W25hbWU6c3RyaW5nXTpUfTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IoIHN0YXJ0U3RhdGU6VCA9IG51bGwgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0N1clN0YXRlID0gc3RhcnRTdGF0ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldCBDdXJTdGF0ZSgpOlRcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQ3VyU3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDmlLnlj5jnirbmgIFcclxuICAgICAgICAgKiBAcGFyYW0gc3RhdGUg6K6+572u54q25oCBXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcHVibGljIENoYW5nZVN0YXRlKHN0YXRlOlQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGF0ZS5TZXRPd25lcih0aGlzKTtcclxuICAgICAgICAgICAgdmFyIGN1clN0YXRlOlQgPSB0aGlzLm1fQ3VyU3RhdGU7XHJcbiAgICAgICAgICAgIGlmKGN1clN0YXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJTdGF0ZS5FbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjdXJTdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICBjdXJTdGF0ZS5TdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyU3RhdGUgPSBjdXJTdGF0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY3VyU3RhdGUgPSB0aGlzLm1fQ3VyU3RhdGU7XHJcbiAgICAgICAgICAgIGlmKGN1clN0YXRlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjdXJTdGF0ZS5VcGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RhdGVcclxuICAgIHtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9vd25lcjpJRlNNO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKG93bmVyOklGU00gPSBudWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX293bmVyID0gb3duZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU2V0T3duZXIob3duZXI6SUZTTSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9vd25lciA9IG93bmVyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZSgpO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBFbmQoKTtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgU3RhcnQoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VNZ3Jcclxue1xyXG4gICAgcHVibGljIGFic3RyYWN0IFVwZGF0ZSgpO1xyXG59IiwiaW1wb3J0IEJhc2VNYW5hZ2VyIGZyb20gXCIuL0Jhc2VNYW5hZ2VyXCI7XHJcbmltcG9ydCB7QmFzZUZ1bmN9ICBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnJhbWVXb3JrXHJcbntcclxuICAgIF9NZ3JNYXA6QmFzZUZ1bmMuTWFwPEJhc2VNYW5hZ2VyPjsvL0Jhc2VTdHJ1Y3QuTWFwPEJhc2VNYW5hZ2VyPjtcclxuICAgIF9UZW1NZ3JMaXN0OkFycmF5PEJhc2VNYW5hZ2VyPjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9NZ3JNYXAgPSBuZXcgQmFzZUZ1bmMuTWFwPEJhc2VNYW5hZ2VyPigpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX0ZNOkZyYW1lV29yaztcclxuICAgIHN0YXRpYyBnZXQgRk0oKTpGcmFtZVdvcmtcclxuICAgIHtcclxuICAgICAgICBpZihGcmFtZVdvcmsuX0ZNPT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRnJhbWVXb3JrLl9GTSA9IG5ldyBGcmFtZVdvcmsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEZyYW1lV29yay5fRk07XHJcbiAgICB9XHJcbiAgICAvL2NvbnN0cnVjdG9yXHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgdGVtcE1nckxpc3QgPSBuZXcgQXJyYXk8QmFzZU1hbmFnZXI+KHRoaXMuX01nck1hcC5Db3VudCk7XHJcbiAgICAgICAgdGhpcy5fTWdyTWFwLmZvckVhY2goIChtZ3I6QmFzZU1hbmFnZXIgLCBrZXk6c3RyaW5nKTp2b2lkID0+e1xyXG4gICAgICAgICAgICB0ZW1wTWdyTGlzdC5wdXNoKG1ncik7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB0ZW1wTWdyTGlzdC5mb3JFYWNoKChtZ3IsaWR4KT0+e21nci5VcGRhdGUoKTt9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQWRkTWFuYWdlcjxUIGV4dGVuZHMgQmFzZU1hbmFnZXI+KCB0eXBlOntuZXcgKCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSApOlRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLl9NZ3JNYXAuSGFzKHR5cGUuTmFtZSgpKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9NZ3JNYXAuR2V0KHR5cGUuTmFtZSgpKSBhcyBUO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3TWdyOlQgPSBuZXcgdHlwZSgpO1xyXG4gICAgICAgIHRoaXMuX01nck1hcC5TZXQobmV3TWdyLHR5cGUuTmFtZSgpKTtcclxuICAgICAgICByZXR1cm4gIG5ld01ncjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEdldE1hbmFnZXI8VCBleHRlbmRzIEJhc2VNYW5hZ2VyPih0eXBlOntuZXcgKCk6IFQ7IE5hbWUoKTpzdHJpbmcgfSk6VHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fTWdyTWFwLkdldCh0eXBlLk5hbWUoKSkgYXMgVDtcclxuICAgIH1cclxufSIsIi8qKuS9nOiAhTpNb1xyXG4gKiDmtojmga/mjqfliLblmahcclxuICovXHJcbmltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5leHBvcnQgbW9kdWxlIE1lc3NhZ2VNRCB7XHJcbiAgICBleHBvcnQgY29uc3QgR2FtZUV2ZW50ID1cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBsYXllckRlYXRoOiBcIlBsYXllckRlYXRoXCIsXHJcbiAgICAgICAgICAgIEdhbWVUaW1lVXA6IFwiR2FtZVRpbWVVcFwiLFxyXG4gICAgICAgICAgICBHYW1lQ29udGludWU6IFwiR2FtZUNvbnRpbnVlXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE1lc3NhZ2VDZW50ZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciAge1xyXG4gICAgICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyAge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJNZXNzYWdlQ2VudGVyXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9NZ3I6IE1lc3NhZ2VDZW50ZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfRXZlbnREaWN0OiB7IFtLZXk6IHN0cmluZ106IE1FdmVudCB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5bkuovku7ZcclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSDmtojmga/lkI3lrZdcclxuICAgICAgICAgKi9cclxuICAgICAgICBwcml2YXRlIF9HZXRFdmVudChuYW1lOiBzdHJpbmcpOiBNRXZlbnQgIHtcclxuICAgICAgICAgICAgdmFyIGV2ZW50OiBNRXZlbnQgPSB0aGlzLl9FdmVudERpY3RbbmFtZV07XHJcbiAgICAgICAgICAgIGlmIChldmVudCA9PSB1bmRlZmluZWQgfHwgZXZlbnQgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IE1FdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fRXZlbnREaWN0W25hbWVdID0gZXZlbnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXZlbnQgPSB0aGlzLl9FdmVudERpY3RbbmFtZV07XHJcbiAgICAgICAgICAgIHJldHVybiBldmVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLl9FdmVudERpY3QgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgKiDms6jlhoxcclxuICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIg55uR5ZCs6ICFXHJcbiAgICAgICAgKiBAcGFyYW0ge09ian0gb3duZXIg5oul5pyJ6ICFXHJcbiAgICAgICAgKi9cclxuICAgICAgICBSZWdpc3QobmFtZTogc3RyaW5nLCBsaXN0ZW5lcjogKCkgPT4gdm9pZCwgb3duZXI6IE9iamVjdCk6TUV2ZW50ICB7XHJcbiAgICAgICAgICAgIHZhciBnZXRFdmVudDogTUV2ZW50ID0gdGhpcy5fR2V0RXZlbnQobmFtZSk7XHJcbiAgICAgICAgICAgIHZhciBuZXdEbGd0OiBEZWxlZ2F0ZSA9IG5ldyBEZWxlZ2F0ZShvd25lciwgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5BZGQobmV3RGxndCk7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRFdmVudFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo6ZSA5p+Q5Liq55uR5ZCsXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIg55uR5ZCs6ICFXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmp9IG93bmVyIOaLpeacieiAhVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIERlc1JlZ2lzdChuYW1lOiBzdHJpbmcsIGxpc3RlbmVyOiAoKSA9PiB2b2lkLCBvd25lcjogT2JqZWN0KSAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6IE1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5SbXYobGlzdGVuZXIsIG93bmVyKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo6ZSA5p+Q5Liq5LqL5Lu2XHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRGVzUmdpc3RJREsobmFtZTogc3RyaW5nKSAge1xyXG4gICAgICAgICAgICB2YXIgZ2V0RXZlbnQ6IE1FdmVudCA9IHRoaXMuX0dldEV2ZW50KG5hbWUpO1xyXG4gICAgICAgICAgICBnZXRFdmVudC5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICogQHBhcmFtIHthbnl9IHBhcmFtIOa2iOaBr+WQjeWtl1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEZpcmUobmFtZTogc3RyaW5nLCBwYXJhbTogYW55ID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgdmFyIGdldEV2ZW50OiBNRXZlbnQgPSB0aGlzLl9HZXRFdmVudChuYW1lKTtcclxuICAgICAgICAgICAgZ2V0RXZlbnQuRXhlY3V0ZShwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCAge1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WnlOaJmFxyXG4gICAgZXhwb3J0IGNsYXNzIERlbGVnYXRlIHtcclxuICAgICAgICBMaXN0ZW5lcjogT2JqZWN0O1xyXG4gICAgICAgIEFjdGlvbjogKHBhcmFtOmFueSkgPT4gdm9pZDtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgRXhlY3V0ZShwYXJhbTogYW55ID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgdGhpcy5BY3Rpb24uY2FsbCh0aGlzLkxpc3RlbmVyLCBwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGxpc3RlbmVyOiBPYmplY3QsIGFjdGlvbjogKHBhcmFtOmFueSkgPT4gdm9pZCkgIHtcclxuICAgICAgICAgICAgdGhpcy5MaXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gICAgICAgICAgICB0aGlzLkFjdGlvbiA9IGFjdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+S6i+S7tlxyXG4gICAgZXhwb3J0IGNsYXNzIE1FdmVudCB7XHJcbiAgICAgICAgRGVsZWdhdGVMaXN0OiBBcnJheTxEZWxlZ2F0ZT47XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgICAgICB0aGlzLlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog5re75Yqg5aeU5omYXHJcbiAgICAgICAgKiBAcGFyYW0ge0RlbGVnYXRlfSBkbGcg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgKi9cclxuICAgICAgICBBZGQoZGxnOiBEZWxlZ2F0ZSkgIHtcclxuICAgICAgICAgICAgdGhpcy5EZWxlZ2F0ZUxpc3QucHVzaChkbGcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5rOo5YaM5pa55rOVXHJcbiAgICAgICAgICogQHBhcmFtIGxpc3RlbmVyIOebkeWQrOS6i+S7tlxyXG4gICAgICAgICAqIEBwYXJhbSBvd25lciDmi6XmnInogIVcclxuICAgICAgICAgKi9cclxuICAgICAgICBBZGRGdW5jKGxpc3RlbmVyOihwYXJhbTphbnkpPT5hbnksb3duZXI6b2JqZWN0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGRsZzpEZWxlZ2F0ZSA9IG5ldyBEZWxlZ2F0ZShvd25lcixsaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog56e76Zmk5aeU5omYXHJcbiAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBhY3Rpb24g5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuZXIg5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgKi9cclxuICAgICAgICBSbXYoYWN0aW9uOiAoKSA9PiB2b2lkLCBsaXN0ZW5lcjogT2JqZWN0ID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgdmFyIGRsZ3RMaXN0OiBBcnJheTxEZWxlZ2F0ZT4gPSB0aGlzLkRlbGVnYXRlTGlzdDtcclxuICAgICAgICAgICAgZm9yICh2YXIgYXJySWR4OiBudW1iZXIgPSBkbGd0TGlzdC5sZW5ndGggLSAxOyBhcnJJZHggPiAtMTsgLS1hcnJJZHgpICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGxndCA9IGRsZ3RMaXN0W2FycklkeF07XHJcbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uID09IGRsZ3QuQWN0aW9uICYmIGxpc3RlbmVyID09IGRsZ3QuTGlzdGVuZXIpICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGxndExpc3Quc3BsaWNlKGFycklkeCwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6YeN572uXHJcbiAgICAgICAgUmVzZXQoKSAge1xyXG4gICAgICAgICAgICB0aGlzLkRlbGVnYXRlTGlzdCA9IFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICog6Kem5Y+RXHJcbiAgICAgICAgKiBAcGFyYW0ge2FueX0gcGFyYW0g5raI5oGv5ZCN5a2XXHJcbiAgICAgICAgKi9cclxuICAgICAgICBFeGVjdXRlKHBhcmFtOiBhbnkpICB7XHJcbiAgICAgICAgICAgIHZhciBkbGd0TGlzdDogQXJyYXk8RGVsZWdhdGU+ID0gdGhpcy5EZWxlZ2F0ZUxpc3Q7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGFycklkeDogbnVtYmVyID0gZGxndExpc3QubGVuZ3RoIC0gMTsgYXJySWR4ID4gLTE7IC0tYXJySWR4KSAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGRsZ3QgPSBkbGd0TGlzdFthcnJJZHhdO1xyXG4gICAgICAgICAgICAgICAgZGxndC5FeGVjdXRlKHBhcmFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIlxyXG5pbXBvcnQge0ZTTX0gZnJvbSBcIi4vLi4vQmFzZS9GU01cIlxyXG5pbXBvcnQge1NjZW5lfSBmcm9tIFwiLi8uLi9TY2VuZS9TY2VuZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIG1fU2NlbmVGU006IFNjZW5lLlNjZW5lRlNNO1xyXG4gICAgcHJpdmF0ZSBtX1NjZW5lTm9kZTogTGF5YS5Ob2RlO1xyXG4gICAgXHJcbiAgICBnZXQgQ3VyU2NlbmUoKTpTY2VuZS5CYXNlU2NlbmUge1xyXG4gICAgICAgIGlmKHRoaXMubV9TY2VuZUZTTS5DdXJTdGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9TY2VuZUZTTS5DdXJTdGF0ZTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGdldCBDdXJEaXIoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTY2VuZS5EaXJlY3RvcjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2NlbmVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9CR0xheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLl9CR0xheWVyKTtcclxuXHJcbiAgICAgICAgdGhpcy5tX1NjZW5lRlNNID0gbmV3IFNjZW5lLlNjZW5lRlNNKCk7XHJcbiAgICAgICAgdGhpcy5tX1NjZW5lTm9kZSA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU3ByaXRlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDaGFuZ2VTY2VuZShuZXdTY2VuZTogU2NlbmUuQmFzZVNjZW5lKSAge1xyXG4gICAgICAgIHRoaXMubV9TY2VuZUZTTS5DaGFuZ2VTdGF0ZShuZXdTY2VuZSk7XHJcbiAgICAgICAgaWYobmV3U2NlbmUuU2NlbmVPYmopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fU2NlbmVOb2RlLmFkZENoaWxkKG5ld1NjZW5lLlNjZW5lT2JqKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuQ3VyU2NlbmUpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/ml6fpgLvovpFcclxuICAgIHByaXZhdGUgX0JHOiBMYXlhLlNwcml0ZTtcclxuICAgIHByaXZhdGUgX0JHTGF5ZXI6IExheWEuU3ByaXRlO1xyXG4gICAgXHJcbiAgICBzZXQgQkcoYmc6IExheWEuU3ByaXRlKSB7XHJcbiAgICAgICAgaWYgKCFiZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9CRykge1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5yZW1vdmVTZWxmO1xyXG4gICAgICAgICAgICB0aGlzLl9CRy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0JHID0gYmc7XHJcbiAgICAgICAgdGhpcy5fQkcud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0JHLmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX0JHTGF5ZXIuYWRkQ2hpbGQodGhpcy5fQkcpO1xyXG4gICAgfVxyXG4gICAgZ2V0IEJHKCk6TGF5YS5TcHJpdGVcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gIHRoaXMuX0JHO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKirkvZzogIVNb1xyXG4qIOWcuuaZr+WKn+iDvVxyXG4qL1xyXG4vKlxyXG4vL+WcuuaZr+euoeeQhlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTY2VuZU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIF9CRzogTGF5YS5TcHJpdGU7XHJcbiAgICBwcml2YXRlIF9CR0xheWVyOiBMYXlhLlNwcml0ZTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DdXJTY2VuZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fQkdMYXllciA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5fQkdMYXllcik7XHJcbiAgICAgICAgLy/mt7vliqDlnLrmma/nrqHnkIZcclxuICAgICAgICB0aGlzLlNjZW5lTm9kZSA9IExheWEuc3RhZ2UuYWRkQ2hpbGQobmV3IExheWEuU3ByaXRlKCkpO1xyXG4gICAgfVxyXG4gICAgc2V0IEJHKGJnOiBMYXlhLlNwcml0ZSkge1xyXG4gICAgICAgIGlmICghYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fQkcpIHtcclxuICAgICAgICAgICAgdGhpcy5fQkcucmVtb3ZlU2VsZjtcclxuICAgICAgICAgICAgdGhpcy5fQkcuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9CRyA9IGJnO1xyXG4gICAgICAgIHRoaXMuX0JHLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9CRy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgICAgICB0aGlzLl9CR0xheWVyLmFkZENoaWxkKHRoaXMuX0JHKTtcclxuICAgIH1cclxuICAgIGdldCBCRygpOkxheWEuU3ByaXRlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICB0aGlzLl9CRztcclxuICAgIH1cclxuICAgIFNjZW5lTm9kZTogTGF5YS5Ob2RlO1xyXG5cclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiU2NlbmVNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfQ3VyU2NlbmU6IEJhc2VTY2VuZTtcclxuICAgIGdldCBDdXJTY2VuZSgpOiBCYXNlU2NlbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9DdXJTY2VuZTtcclxuICAgIH1cclxuICAgIHNldCBDdXJTY2VuZSh2YWx1ZTogQmFzZVNjZW5lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0N1clNjZW5lICYmIHRoaXMuX0N1clNjZW5lLlNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0N1clNjZW5lLlNjZW5lLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fQ3VyU2NlbmUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5fQ3VyU2NlbmUgJiYgdGhpcy5fQ3VyU2NlbmUuU2NlbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5TY2VuZU5vZGUuYWRkQ2hpbGQodGhpcy5fQ3VyU2NlbmUuU2NlbmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBDdXJEaXIoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU2NlbmUuQ3VyRGlyO1xyXG4gICAgfVxyXG5cclxuICAgIEVudGVyU2NlbmUodGFyZ2V0U2NlbmU6IEJhc2VTY2VuZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLkN1clNjZW5lID09IG51bGwpXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUgPSB0YXJnZXRTY2VuZTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHRoaXMuQ3VyU2NlbmUuTGVhdmUodGFyZ2V0U2NlbmUpO1xyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5DdXJTY2VuZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLkN1clNjZW5lLlVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4qLyIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvQmFzZU1hbmFnZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLi9jb250cm9sZXIvQVBQXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVNYW5hZ2VyIGV4dGVuZHMgQmFzZU1hbmFnZXIge1xyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJUaW1lTWFuYWdlclwiO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBtX1N0YXJ0VGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0dhbWVUaW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fUGF1c2luZ1RpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9QYXVzZVRpbWU6IG51bWJlclxyXG5cclxuICAgIHB1YmxpYyBnZXQgU3RhcnRUaW1lcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fU3RhcnRUaW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBHYW1lVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoTGF5YS50aW1lci5jdXJyVGltZXIgLSB0aGlzLm1fU3RhcnRUaW1lIC10aGlzLm1fUGF1c2VUaW1lIC0gdGhpcy5QYXVzaW5nVGltZSkgLyAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1N0YXJ0VGltZSA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgICAgIHRoaXMubV9HYW1lVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tX1BhdXNlVGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tX1BhdXNpbmdUaW1lID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBQYXVzZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5tX1BhdXNpbmdUaW1lIDw9IDApXHJcbiAgICAgICAgICAgIHRoaXMubV9QYXVzaW5nVGltZSA9IExheWEudGltZXIuY3VyclRpbWVyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBQYXVzaW5nVGltZSgpOm51bWJlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGF1c2luZ1RpbWUgPiAwID8gKExheWEudGltZXIuY3VyclRpbWVyIC0gdGhpcy5tX1BhdXNpbmdUaW1lICkgOiAwO1xyXG4gICAgfVxyXG4gICAgcHVibGljIENvbnRpbnVlKCkge1xyXG4gICAgICAgIHRoaXMubV9QYXVzZVRpbWUgKz0gdGhpcy5QYXVzaW5nVGltZTtcclxuICAgICAgICB0aGlzLm1fUGF1c2luZ1RpbWUgPSAwO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBCYXNlTWFuYWdlciBmcm9tIFwiLi9CYXNlTWFuYWdlclwiO1xyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL3VpL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IFVJRnVuYyB9IGZyb20gXCIuLy4uL1V0aWxpdHkvVUlGdW5jXCJcclxuaW1wb3J0IHsgQmFzZUZ1bmMgfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0FQUFwiO1xyXG5lbnVtIE5vZGVUeXBlIHtcclxuICAgIEJvdHRvbSxcclxuICAgIE1pZGRsZSxcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSU1hbmFnZXIgZXh0ZW5kcyBCYXNlTWFuYWdlciB7XHJcbiAgICBzdGF0aWMgZ19VSVdpZHRoID0gNzUwO1xyXG4gICAgc3RhdGljIGdfVUlIZWlnaHQgPSAxMzM0O1xyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIHByaXZhdGUgbV9Sb290Tm9kZTogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIG1fQm90dG9tTm9kZTogTGF5YS5Cb3g7XHJcbiAgICBwcml2YXRlIG1fTWlkbGVOb2RlOiBMYXlhLkJveDtcclxuICAgIHByaXZhdGUgX1VJRGljdDogeyBbbmFtZTogc3RyaW5nXTogQmFzZVVJIH07XHJcbiAgICBwcml2YXRlIF9VcGRhdGVDb3VudDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1VwZGF0ZVRpbWU6bnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgQWRkTm9kZShub2RlOiBOb2RlVHlwZSk6IHZvaWQgIHtcclxuICAgICAgICB2YXIgbm9kZUJveDogTGF5YS5Cb3ggPSBuZXcgTGF5YS5Cb3goKTtcclxuICAgICAgICBub2RlQm94LnRvcCA9IDA7XHJcbiAgICAgICAgbm9kZUJveC5ib3R0b20gPSAwO1xyXG4gICAgICAgIG5vZGVCb3gubGVmdCA9IDA7XHJcbiAgICAgICAgbm9kZUJveC5yaWdodCA9IDA7XHJcbiAgICAgICAgc3dpdGNoIChub2RlKSAge1xyXG4gICAgICAgICAgICBjYXNlIE5vZGVUeXBlLkJvdHRvbTpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9Cb3R0b21Ob2RlID0gbm9kZUJveDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5tX01pZGxlTm9kZSA9IG5vZGVCb3g7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tX1Jvb3ROb2RlLmFkZENoaWxkKG5vZGVCb3gpO1xyXG4gICAgICAgIC8vTGF5YS5zdGFnZS5hZGRDaGlsZChub2RlQm94KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nICB7XHJcbiAgICAgICAgcmV0dXJuIFwiVUlNYW5hZ2VyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHJvb3RCb3ggPSBuZXcgTGF5YS5Cb3goKTtcclxuICAgICAgICByb290Qm94LndpZHRoID0gVUlNYW5hZ2VyLmdfVUlXaWR0aDtcclxuICAgICAgICByb290Qm94LmhlaWdodCA9IFVJTWFuYWdlci5nX1VJSGVpZ2h0O1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQocm9vdEJveCk7XHJcbiAgICAgICAgdGhpcy5tX1Jvb3ROb2RlID0gcm9vdEJveDtcclxuICAgICAgICB0aGlzLm9uU2l6ZUNoYW5nZSgpO1xyXG4gICAgICAgIExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5tX1Jvb3ROb2RlKTtcclxuICAgICAgICB0aGlzLm1fVXBkYXRlVGltZSA9IDA7XHJcblxyXG4gICAgICAgIHRoaXMuQWRkTm9kZShOb2RlVHlwZS5Cb3R0b20pO1xyXG4gICAgICAgIHRoaXMuQWRkTm9kZShOb2RlVHlwZS5NaWRkbGUpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1VJRGljdCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX1VwZGF0ZUNvdW50ID0gMDtcclxuICAgICAgICBMYXlhLnN0YWdlLm9uKExheWEuRXZlbnQuUkVTSVpFLCB0aGlzLCB0aGlzLm9uU2l6ZUNoYW5nZSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25TaXplQ2hhbmdlKClcclxuICAgIHtcclxuICAgICAgICB2YXIgcm9vdEJveCA9IHRoaXMubV9Sb290Tm9kZTtcclxuICAgICAgICBVSUZ1bmMuRml4VUkocm9vdEJveCxVSU1hbmFnZXIuZ19VSVdpZHRoKTtcclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBzY2FsZSA9IFVJRnVuYy5Db3VudFNjYWxlRml4KFVJTWFuYWdlci5nX1VJV2lkdGgpO1xyXG4gICAgICAgIHZhciByb290Qm94ID0gdGhpcy5tX1Jvb3ROb2RlO1xyXG4gICAgICAgIHJvb3RCb3guc2NhbGVYID0gc2NhbGU7XHJcbiAgICAgICAgcm9vdEJveC5zY2FsZVkgPSBzY2FsZTtcclxuICAgICAgICByb290Qm94LmhlaWdodCA9IFVJTWFuYWdlci5nX1VJSGVpZ2h0ICogc2NhbGU7XHJcbiAgICAgICAgcm9vdEJveC53aWR0aCA9IFVJTWFuYWdlci5nX1VJV2lkdGg7Ki9cclxuICAgICAgICBpZighdGhpcy5tX0JvdHRvbU5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbnVtQ2hpbGQgPSB0aGlzLm1fQm90dG9tTm9kZS5udW1DaGlsZHJlbjtcclxuICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBudW1DaGlsZDtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlID0gdGhpcy5tX0JvdHRvbU5vZGUuZ2V0Q2hpbGRBdChpKTtcclxuICAgICAgICAgICAgaWYobm9kZSAmJiBub2RlW1wiTGF5b3V0XCJdKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlW1wiTGF5b3V0XCJdKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG51bUNoaWxkID0gdGhpcy5tX0JvdHRvbU5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbnVtQ2hpbGQ7aSArKykge1xyXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlLmdldENoaWxkQXQoaSk7XHJcbiAgICAgICAgICAgIGlmKG5vZGUgJiYgbm9kZVtcIkxheW91dFwiXSkge1xyXG4gICAgICAgICAgICAgICAgbm9kZVtcIkxheW91dFwiXSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0gICAgXHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lrprluKfliLfmlrBVSVxyXG4gICAgICAgIGlmICh0aGlzLm1fVXBkYXRlVGltZSA8ICBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUpICB7XHJcbiAgICAgICAgICAgIHRoaXMuVXBkYXRlVUkodGhpcy5tX0JvdHRvbU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZVVJKHRoaXMubV9NaWRsZU5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9VcGRhdGVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9VcGRhdGVUaW1lID0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lICsgMC4zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlVUkobm9kZTogTGF5YS5TcHJpdGUpICB7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4OiBudW1iZXIgPSAwOyBpZHggPCBub2RlLm51bUNoaWxkcmVuOyArK2lkeCkgIHtcclxuICAgICAgICAgICAgdmFyIHVpOiBCYXNlVUkgPSBub2RlLmdldENoaWxkQXQoaWR4KSBhcyBCYXNlVUk7XHJcbiAgICAgICAgICAgIHVpLlVJVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgQWRkVUkoKSAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBTaG93PFQgZXh0ZW5kcyBCYXNlVUk+KHVpQ2xhc3M6IHsgbmV3KG5hbWU6IHN0cmluZyk6IFQ7IE5hbWUoKTogc3RyaW5nIH0pOiBUICB7XHJcbiAgICAgICAgdmFyIHN0cjogc3RyaW5nID0gdWlDbGFzcy5OYW1lKCk7XHJcbiAgICAgICAgdmFyIG5ld1VJOiBCYXNlVUkgPSB0aGlzLkdldFVJQnlOYW1lKHN0cik7XHJcbiAgICAgICAgbmV3VUkgPSBuZXdVSSA9PSBudWxsID8gdGhpcy5BZGRVSUJ5TmFtZShzdHIsIG5ldyB1aUNsYXNzKHN0cikpIDogbmV3VUk7XHJcbiAgICAgICAgdmFyIG5vZGU6IExheWEuU3ByaXRlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKG5ld1VJLlVJVHlwZSkgIHtcclxuICAgICAgICAgICAgLy/kuK3lsYLmrKFVSVxyXG4gICAgICAgICAgICBjYXNlIEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU6XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5tX01pZGxlTm9kZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1fTWlkbGVOb2RlLm51bUNoaWxkcmVuIDw9IDApICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/pgJrnn6Xlr7zmvJTmmoLlgZzmuLjmiI9cclxuICAgICAgICAgICAgICAgICAgICAvL0FQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuQ3VyRGlyLlRpbWVVcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8v6buY6K6kVWnlhajmmK/kvY7lsYLmrKFVSVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2hpbGROdW06IG51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgLy/miorkupLmlqXnmoTnqpflj6PlhbPmjolcclxuICAgICAgICBpZiAobmV3VUkuSXNNdXRleCAmJiBjaGlsZE51bSA+IDApICB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VUkgPSBub2RlLmdldENoaWxkQXQobm9kZS5udW1DaGlsZHJlbiAtIDEpIGFzIEJhc2VVSTtcclxuICAgICAgICAgICAgaWYgKCFsYXN0VUkuSXNNdXRleClcclxuICAgICAgICAgICAgICAgIGxhc3RVSS5IaWRlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBub2RlLmFkZENoaWxkKG5ld1VJKTtcclxuICAgICAgICBuZXdVSS5PcGVuT1AoKTtcclxuICAgICAgICBpZiAobmV3VUkuVUlUeXBlID09IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGUgJiYgbm9kZS5udW1DaGlsZHJlbiA+IDApIHtcclxuICAgICAgICAgICAgbm9kZS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiAobmV3VUkgYXMgVCk7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2UodWk6IEJhc2VVSSkgIHtcclxuICAgICAgICB1aS5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgdWkuQ2xvc2VPUCgpO1xyXG4gICAgICAgIHZhciBub2RlOiBMYXlhLlNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoICh1aS5VSVR5cGUpICB7XHJcbiAgICAgICAgICAgIC8v5Lit5bGC5qyhVUlcclxuICAgICAgICAgICAgY2FzZSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlOlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9NaWRsZU5vZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUubnVtQ2hpbGRyZW4gPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAvLyB0aGlzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lhbPpl63nqpflj6Mg6YCa55+l5ri45oiP57un57utXHJcbiAgICAgICAgICAgICAgICAgICAgLy9BUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLkN1ckRpci5Db250aW51ZVRpbWUoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8v6buY6K6kVWnlhajmmK/kvY7lsYLmrKFVSVxyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgbm9kZSA9IHRoaXMubV9Cb3R0b21Ob2RlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2hpbGROdW06IG51bWJlciA9IG5vZGUubnVtQ2hpbGRyZW47XHJcbiAgICAgICAgaWYgKGNoaWxkTnVtID4gMCkgIHtcclxuICAgICAgICAgICAgdmFyIGxhc3RVSTogQmFzZVVJID0gbm9kZS5nZXRDaGlsZEF0KGNoaWxkTnVtIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgICAgICBsYXN0VUkuT3Blbk9QKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIENsb3NlQ3VyVmlldygpICB7XHJcbiAgICAgICAgdmFyIHVpOiBCYXNlVUkgPSB0aGlzLm1fQm90dG9tTm9kZS5nZXRDaGlsZEF0KHRoaXMubV9Cb3R0b21Ob2RlLm51bUNoaWxkcmVuIC0gMSkgYXMgQmFzZVVJO1xyXG4gICAgICAgIHRoaXMuQ2xvc2UodWkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5Yig6Zmk5omA5pyJ6IqC54K55LiK55qEVUlcclxuICAgIENsZWFyKCkgIHtcclxuICAgICAgICB2YXIgdWlOb2RlID0gdGhpcy5tX0JvdHRvbU5vZGU7XHJcbiAgICAgICAgd2hpbGUgKHVpTm9kZS5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICB2YXIgY2xvc2VVSTogQmFzZVVJID0gdWlOb2RlLmdldENoaWxkQXQoMCkgYXMgQmFzZVVJOy8vLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdGhpcy5DbG9zZShjbG9zZVVJKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWlOb2RlID0gdGhpcy5tX01pZGxlTm9kZVxyXG4gICAgICAgIHdoaWxlICh1aU5vZGUubnVtQ2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgdmFyIGNsb3NlVUk6IEJhc2VVSSA9IHVpTm9kZS5nZXRDaGlsZEF0KDApIGFzIEJhc2VVSTsvLy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuQ2xvc2UoY2xvc2VVSSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEdldFVJQnlOYW1lKG5hbWU6IHN0cmluZyk6IEJhc2VVSSAge1xyXG4gICAgICAgIHZhciB1aSA9IHRoaXMuX1VJRGljdFtuYW1lXTtcclxuICAgICAgICB1aSA9IHVpID09IHVuZGVmaW5lZCA/IG51bGwgOiB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcbiAgICBBZGRVSUJ5TmFtZShuYW1lOiBzdHJpbmcsIHVpOiBCYXNlVUkpOiBCYXNlVUkgIHtcclxuICAgICAgICB0aGlzLl9VSURpY3RbbmFtZV0gPSB1aTtcclxuICAgICAgICByZXR1cm4gdWk7XHJcbiAgICB9XHJcblxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXHJcbmltcG9ydCBSb2xlRWxlbWVudCBmcm9tIFwiLi9zY3JpcHQvUm9sZUVsZW1lbnRcIlxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcbi8qXHJcbiog5ri45oiP5Yid5aeL5YyW6YWN572uO1xyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uZmlne1xyXG4gICAgc3RhdGljIHdpZHRoOm51bWJlcj03NTA7XHJcbiAgICBzdGF0aWMgaGVpZ2h0Om51bWJlcj0xMzM0O1xyXG4gICAgc3RhdGljIHNjYWxlTW9kZTpzdHJpbmc9XCJmaXhlZHdpZHRoXCI7XHJcbiAgICBzdGF0aWMgc2NyZWVuTW9kZTpzdHJpbmc9XCJub25lXCI7XHJcbiAgICBzdGF0aWMgYWxpZ25WOnN0cmluZz1cInRvcFwiO1xyXG4gICAgc3RhdGljIGFsaWduSDpzdHJpbmc9XCJsZWZ0XCI7XHJcbiAgICBzdGF0aWMgc3RhcnRTY2VuZTphbnk9XCJFbnRlci5zY2VuZVwiO1xyXG4gICAgc3RhdGljIHNjZW5lUm9vdDpzdHJpbmc9XCJcIjtcclxuICAgIHN0YXRpYyBkZWJ1Zzpib29sZWFuPXRydWU7XHJcbiAgICBzdGF0aWMgc3RhdDpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIHBoeXNpY3NEZWJ1Zzpib29sZWFuPWZhbHNlO1xyXG4gICAgc3RhdGljIGV4cG9ydFNjZW5lVG9Kc29uOmJvb2xlYW49dHJ1ZTtcclxuICAgIGNvbnN0cnVjdG9yKCl7fVxyXG4gICAgc3RhdGljIGluaXQoKXtcclxuICAgICAgICB2YXIgcmVnOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcclxuICAgICAgICByZWcoXCJzY3JpcHQvUm9sZUVsZW1lbnQudHNcIixSb2xlRWxlbWVudCk7XG4gICAgICAgIHJlZyhcInNjcmlwdC9JdGVtRWxlbWVudC50c1wiLEl0ZW1FbGVtZW50KTtcclxuICAgIH1cclxufVxyXG5HYW1lQ29uZmlnLmluaXQoKTsiLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyTWFuYWdlciBleHRlbmRzIEdhbWVNYW5hZ2VyLkJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfTWdyOiBDaGFyYWN0ZXJNYW5hZ2VyO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgTWdyKCk6IENoYXJhY3Rlck1hbmFnZXIge1xyXG4gICAgICAgIGlmICghQ2hhcmFjdGVyTWFuYWdlci5nX01ncikge1xyXG4gICAgICAgICAgICBDaGFyYWN0ZXJNYW5hZ2VyLmdfTWdyID0gbmV3IENoYXJhY3Rlck1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIENoYXJhY3Rlck1hbmFnZXIuZ19NZ3I7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkNoYXJhY3RlckluZm9cIik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgR2VuSW5mbyhkYXRhOiBhbnkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENoYXJhY3RlckluZm8oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldFNraWxsSXRlbShpZCk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmIChpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm4gaW5mby5JdGVtO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRQcmljZShpZCk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmIChpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm4gaW5mby5QcmljZTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0Q2hhcmFjdGVySW5mbyhpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRJdGVtSUQoaWQpIHtcclxuICAgICAgICB2YXIgaW5mbzogQ2hhcmFjdGVySW5mbyA9IHRoaXMuR2V0SW5mbzxDaGFyYWN0ZXJJbmZvPihpZCk7XHJcbiAgICAgICAgaWYgKCFpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgcmV0dXJuIGluZm8uSXRlbTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBHZXROYW1lKGlkKSB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmICghaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIGluZm8ubU5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldERlc2MoaWQpIHtcclxuICAgICAgICB2YXIgaW5mbzogQ2hhcmFjdGVySW5mbyA9IHRoaXMuR2V0SW5mbzxDaGFyYWN0ZXJJbmZvPihpZCk7XHJcbiAgICAgICAgaWYgKCFpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICByZXR1cm4gaW5mby5EZXNjO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRDaGFyYWN0ZXJNb2RlbChpZDogbnVtYmVyKTogTGF5YS5TcHJpdGUzRCB7XHJcbiAgICAgICAgdmFyIGluZm86IENoYXJhY3RlckluZm8gPSB0aGlzLkdldEluZm88Q2hhcmFjdGVySW5mbz4oaWQpO1xyXG4gICAgICAgIGlmICghaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJEYXRhOiBDaGFyYWN0ZXJJbmZvID0gdGhpcy5HZXRDaGFyYWN0ZXJJbmZvKGlkKTtcclxuICAgICAgICB2YXIgc2FtcGxlTW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRMSChjaGFyYWN0ZXJEYXRhLk5hbWUpKTtcclxuICAgICAgICB2YXIgbW9kZWwgPSBzYW1wbGVNb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIHJldHVybiBtb2RlbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ2hhcmFjdGVySW5mbyBleHRlbmRzIEdhbWVNYW5hZ2VyLkJhc2VJbmZvIHtcclxuICAgIHByaXZhdGUgbV9QcmljZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX01vZGVsTmFtZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0V4dGVuZElEOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fSXRlbTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX05hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgbV9EZXNjOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGdldCBtTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IERlc2MoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0Rlc2M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBJdGVtKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9JdGVtO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBQcmljZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUHJpY2U7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihjaGFyYWN0ZXJEYXRhOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihjaGFyYWN0ZXJEYXRhKTtcclxuICAgICAgICB0aGlzLm1fSUQgPSBjaGFyYWN0ZXJEYXRhLklEID8gY2hhcmFjdGVyRGF0YS5JRCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX01vZGVsTmFtZSA9IGNoYXJhY3RlckRhdGEuTW9kZWxJRCA/IGNoYXJhY3RlckRhdGEuTW9kZWxJRCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW0gPSBjaGFyYWN0ZXJEYXRhLkl0ZW1JRCA/IE51bWJlcihjaGFyYWN0ZXJEYXRhLkl0ZW1JRCAtIDEpIDogLTE7XHJcbiAgICAgICAgdGhpcy5tX1ByaWNlID0gY2hhcmFjdGVyRGF0YS5QcmljZSA/IE51bWJlcihjaGFyYWN0ZXJEYXRhLlByaWNlKSA6IDA7XHJcbiAgICAgICAgdGhpcy5tX05hbWUgPSBjaGFyYWN0ZXJEYXRhLlBhc3NzY29yZSA/IGNoYXJhY3RlckRhdGEuUGFzc3Njb3JlIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fRGVzYyA9IGNoYXJhY3RlckRhdGEuRGVzYyA/IGNoYXJhY3RlckRhdGEuRGVzYyA6IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9Nb2RlbE5hbWU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5leHBvcnQgbW9kdWxlIEdhbWVNYW5hZ2VyIHtcclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlTWFuYWdlciB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBCYXNlSW5mbyB9O1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0JvdHRvbUlEOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9NYXAgPSB7fTtcclxuICAgICAgICAgICAgdGhpcy5tX0JvdHRvbUlEID0gLTE7XHJcbiAgICAgICAgICAgIHZhciBjb25maWdJbmZvOiBvYmplY3QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRKc29uUGF0aChuYW1lKSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjb25maWdJbmZvKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IGNvbmZpZ0luZm9ba2V5XTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhSW5mbzogQmFzZUluZm8gPSB0aGlzLkdlbkluZm8oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fTWFwW2RhdGFJbmZvLklEXSA9IGRhdGFJbmZvO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGFJbmZvLklEICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9Cb3R0b21JRCA9IGRhdGFJbmZvLklEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBHZW5JbmZvKGRhdGEpOiBCYXNlSW5mbztcclxuICAgICAgICBwcm90ZWN0ZWQgR2V0SW5mbzxUIGV4dGVuZHMgQmFzZUluZm8+KGlkOiBudW1iZXIpOiBUIHtcclxuICAgICAgICAgICAgaWYgKCFpZCB8fCBpZCA8IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIEJhc2VJbmZvID0gdGhpcy5tX01hcFtpZF07XHJcbiAgICAgICAgICAgIGlmICghQmFzZUluZm8pIHtcclxuICAgICAgICAgICAgICAgIEJhc2VJbmZvID0gdGhpcy5tX01hcFt0aGlzLm1fQm90dG9tSURdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChCYXNlSW5mbykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJhc2VJbmZvIGFzIFQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDojrflj5ZJROaVsOe7hFxyXG4gICAgICAgICAqLyAgIFxyXG4gICAgICAgIHB1YmxpYyBHZXRJRExpc3QoKTogQXJyYXk8bnVtYmVyPiB7XHJcbiAgICAgICAgICAgIHZhciBtYXA6IHsgW0lEOiBudW1iZXJdOiBCYXNlSW5mbyB9ID0gdGhpcy5tX01hcDtcclxuICAgICAgICAgICAgdmFyIElETGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtYXApIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbWFwW2tleV1cclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIElETGlzdC5wdXNoKGRhdGEuSUQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBJRExpc3Q7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBCYXNlSW5mbyB7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fSUQ6IG51bWJlcjtcclxuICAgICAgICBwdWJsaWMgZ2V0IElEKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fSUQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihkYXRhOiBhbnkpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0lEID0gZGF0YS5JRCA/IE51bWJlcihkYXRhLklEKSAtIDEgOiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5pbXBvcnQgeyBHYW1lTWFuYWdlciB9IGZyb20gXCIuL0dhbWVNYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbU1hbmFnZXIgZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlTWFuYWdlciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX01ncjogSXRlbU1hbmFnZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBNZ3IoKTogSXRlbU1hbmFnZXIge1xyXG4gICAgICAgIGlmICghSXRlbU1hbmFnZXIuZ19NZ3IpIHtcclxuICAgICAgICAgICAgSXRlbU1hbmFnZXIuZ19NZ3IgPSBuZXcgSXRlbU1hbmFnZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEl0ZW1NYW5hZ2VyLmdfTWdyO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcihcIkl0ZW1JbmZvXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBHZW5JbmZvKGRhdGE6IGFueSk6IEdhbWVNYW5hZ2VyLkJhc2VJbmZvIHtcclxuICAgICAgICByZXR1cm4gbmV3IEl0ZW1JbmZvKGRhdGEpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlumBk+WFt+S7t+agvFxyXG4gICAgICogQHBhcmFtIGlkIOmBk+WFt0lEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBHZXRQcmljZShpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgaW5mbzogSXRlbUluZm8gPSB0aGlzLkdldEluZm88SXRlbUluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uUHJpY2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6YGT5YW35Lu35qC8XHJcbiAgICAgKiBAcGFyYW0gaWQg6YGT5YW3SURcclxuICAgICAqL1xyXG4gICAgcHVibGljIEdldEl0ZW1JY29uKGlkOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBpbmZvOiBJdGVtSW5mbyA9IHRoaXMuR2V0SW5mbzxJdGVtSW5mbz4oaWQpO1xyXG4gICAgICAgIGlmIChpbmZvKVxyXG4gICAgICAgICAgICByZXR1cm4gaW5mby5JY29uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDojrflj5ZJROaVsOe7hFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBHZXRTZWxsSXRlbUlETGlzdCgpOiBBcnJheTxudW1iZXI+IHtcclxuICAgICAgICB2YXIgbWFwID0gdGhpcy5tX01hcDtcclxuICAgICAgICB2YXIgSURMaXN0OiBBcnJheTxudW1iZXI+ID0gW11cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFwKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhOiBhbnkgPSBtYXBba2V5XVxyXG4gICAgICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW1JbmZvOiBJdGVtSW5mbyA9IGRhdGEgYXMgSXRlbUluZm87XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbUluZm8uUHJpY2UgPj0gMClcclxuICAgICAgICAgICAgICAgICAgICBJRExpc3QucHVzaChkYXRhLklEKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gSURMaXN0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgR2V0SXRlbVR5cGUoaWQ6bnVtYmVyKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICB2YXIgaW5mbzogSXRlbUluZm8gPSB0aGlzLkdldEluZm88SXRlbUluZm8+KGlkKTtcclxuICAgICAgICBpZiAoaW5mbylcclxuICAgICAgICAgICAgcmV0dXJuIGluZm8uSXRlbVR5cGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldEl0ZW1JbmZvKGlkOm51bWJlcik6SXRlbUluZm9cclxuICAgIHtcclxuICAgICAgICB2YXIgaW5mbzogSXRlbUluZm8gPSB0aGlzLkdldEluZm88SXRlbUluZm8+KGlkKTtcclxuICAgICAgICByZXR1cm4gaW5mbztcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSXRlbUluZm8gZXh0ZW5kcyBHYW1lTWFuYWdlci5CYXNlSW5mbyB7XHJcbiAgICBwcml2YXRlIG1fTW9kZWxOYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fRXh0ZW5kSUQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgbV9QcmljZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1UeXBlOm51bWJlcjtcclxuICAgIHByaXZhdGUgbV9JY29uOnN0cmluZztcclxuICAgIHByaXZhdGUgbV9QYXNzc2NvcmU6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBtX0Rlc2M6c3RyaW5nO1xyXG4gICAgcHVibGljIGdldCBEZXNjKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9EZXNjO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBQYXNzc2NvcmUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1Bhc3NzY29yZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW9kZWxOYW1lICsgdGhpcy5tX0V4dGVuZElEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBQcmljZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUHJpY2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEl0ZW1UeXBlKCk6bnVtYmVyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9JdGVtVHlwZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgSWNvbigpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fSWNvbjtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgICAgIHRoaXMubV9JRCA9IGRhdGEuSUQgPyBkYXRhLklEIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fUGFzc3Njb3JlID0gZGF0YS5QYXNzc2NvcmUgPyBkYXRhLlBhc3NzY29yZTogXCJcIjtcclxuICAgICAgICB0aGlzLm1fTW9kZWxOYW1lID0gZGF0YS5Nb2RlbE5hbWUgPyBkYXRhLk1vZGVsTmFtZSA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0V4dGVuZElEID0gZGF0YS5FeHRlbmRJRCA/IGRhdGEuRXh0ZW5kSUQgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9QcmljZSA9IGRhdGEuUHJpY2UgPyBOdW1iZXIoZGF0YS5QcmljZSkgOiAwO1xyXG4gICAgICAgIHRoaXMubV9JdGVtVHlwZSA9IGRhdGEuSXRlbVR5cGU/IE51bWJlcihkYXRhLkl0ZW1UeXBlKTowO1xyXG4gICAgICAgIHRoaXMubV9JY29uID0gZGF0YS5JY29uP2RhdGEuSWNvbjpcIlwiO1xyXG4gICAgICAgIHRoaXMubV9EZXNjID0gZGF0YS5EZXNjP2RhdGEuRGVzYzpcIlwiO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLi9VdGlsaXR5L1BhdGhcIjtcclxuaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi9HYW1lTWFuYWdlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExldmVsSXRlbVJhbmdlTWFuYWdlciBleHRlbmRzIEdhbWVNYW5hZ2VyLkJhc2VNYW5hZ2VyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfTWdyOiBMZXZlbEl0ZW1SYW5nZU1hbmFnZXI7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBNZ3IoKTogTGV2ZWxJdGVtUmFuZ2VNYW5hZ2VyIHtcclxuICAgICAgICBpZiAoIUxldmVsSXRlbVJhbmdlTWFuYWdlci5nX01ncikge1xyXG4gICAgICAgICAgICBMZXZlbEl0ZW1SYW5nZU1hbmFnZXIuZ19NZ3IgPSBuZXcgTGV2ZWxJdGVtUmFuZ2VNYW5hZ2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBMZXZlbEl0ZW1SYW5nZU1hbmFnZXIuZ19NZ3I7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiTGV2ZWxJdGVtUmFuZ2VcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIEdlbkluZm8oZGF0YTogYW55KTogR2FtZU1hbmFnZXIuQmFzZUluZm8ge1xyXG4gICAgICAgIHJldHVybiBuZXcgTGV2ZWxJdGVtUmFuZ2UoZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIEdldEluZm88VCBleHRlbmRzIEdhbWVNYW5hZ2VyLkJhc2VJbmZvPihpZDogbnVtYmVyKTogVCB7XHJcbiAgICAgICAgaWYgKCFpZCB8fCBpZCA8IDApIHtcclxuXHJcbiAgICAgICAgICAgIGlkID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIEJhc2VJbmZvID0gdGhpcy5tX01hcFtpZF07XHJcbiAgICAgICAgaWYgKCFCYXNlSW5mbykge1xyXG4gICAgICAgICAgICBCYXNlSW5mbyA9IHRoaXMubV9NYXBbdGhpcy5tX0JvdHRvbUlEXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKEJhc2VJbmZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBCYXNlSW5mbyBhcyBUO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0QWxsSW5mbygpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTWFwO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBMZXZlbEl0ZW1SYW5nZSBleHRlbmRzIEdhbWVNYW5hZ2VyLkJhc2VJbmZvIHtcclxuICAgIHByaXZhdGUgbV9QYXNzc2NvcmU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9SZXdhcmRBY3RvcklEOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fTGV2ZWxyYW5nZTogbnVtYmVyW107XHJcblxyXG4gICAgcHVibGljIGdldCBSZXdhcmRBY3RvcklEKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9SZXdhcmRBY3RvcklEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBQYXNzc2NvcmUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1Bhc3NzY29yZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgTGV2ZWxyYW5nZSgpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9MZXZlbHJhbmdlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKGRhdGEpO1xyXG4gICAgICAgIHRoaXMubV9JRCA9IGRhdGEuSUQgPyBkYXRhLklEIDogXCJcIjtcclxuICAgICAgICB0aGlzLm1fUGFzc3Njb3JlID0gZGF0YS5QYXNzc2NvcmUgPyBkYXRhLlBhc3NzY29yZTogXCJcIjtcclxuICAgICAgICB0aGlzLm1fUmV3YXJkQWN0b3JJRCA9IGRhdGEuUmV3YXJkQWN0b3JJRCA/IGRhdGEuUmV3YXJkQWN0b3JJRCA6IFwiXCI7XHJcbiAgICAgICAgdGhpcy5tX0xldmVscmFuZ2UgPSBkYXRhLmxldmVscmFuZ2UgPyBkYXRhLmxldmVscmFuZ2UgOiBcIlwiO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuIC8qKlxyXG4gKiDooajnjrDnlKjnmoTlr7nosaFcclxuICovXHJcbmV4cG9ydCBtb2R1bGUgQW5pbU9ialxyXG57XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIG5hbWU6c3RyaW5nID0gcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKTtcclxuICAgICAgICB2YXIgbW9kZWw6TGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICBmb3IoIGxldCBjb3VudCA9MDtjb3VudCA8IDMwOysrY291bnQgKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR2VuQW5pbU9iajxBbmltQ29pbj4oQW5pbUNvaW4sbW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZW5BbmltT2JqPFQgZXh0ZW5kcyBCYXNlQW5pbU9iaj4oIGFuaW1DbGFzczp7bmV3IChuYW1lOnN0cmluZyxtb2RlbDpMYXlhLlNwcml0ZTNEKTogVDsgTmFtZSgpOnN0cmluZyB9LG1vZGVsOkxheWEuU3ByaXRlM0QgKTpUXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFuaW1PYmogPSBMYXlhLlBvb2wuZ2V0SXRlbShhbmltQ2xhc3MuTmFtZSgpKTtcclxuICAgICAgICBpZihhbmltT2JqPT1udWxsKVxyXG4gICAgICAgICAgICBhbmltT2JqID0gbmV3IGFuaW1DbGFzcyhhbmltQ2xhc3MuTmFtZSgpLG1vZGVsKTtcclxuICAgICAgICByZXR1cm4gYW5pbU9iajtcclxuICAgIH1cclxuICAgIFxyXG4gICAgYWJzdHJhY3QgY2xhc3MgQmFzZUFuaW1PYmogZXh0ZW5kcyBMYXlhLlNwcml0ZTNEXHJcbiAgICB7XHJcbiAgICAgICAgUmVzZXQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlNjZW5lT2JqLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5fRnJhbWVGdW5jKVxyXG4gICAgICAgIH1cclxuICAgICAgICBNb2RlbDpMYXlhLlNwcml0ZTNEO1xyXG4gICAgXHJcbiAgICAgICAgcHJpdmF0ZSBfTmFtZTpzdHJpbmc7XHJcbiAgICAgICAgY29uc3RydWN0b3IobmFtZTpzdHJpbmcsbW9kZWw6TGF5YS5TcHJpdGUzRCA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWwuY2xvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy5fTmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMub24oTGF5YS5FdmVudC5SRU1PVkVELHRoaXMsdGhpcy5fTGVhdmVTdGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByb3RlY3RlZCBfRnJhbWVGdW5jKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYodGhpcy5fSnVkZ2VDb21wbGV0ZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9GcmFtZUxvZ2ljRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+avj+W4p+aJp+ihjOmAu+i+keWKn+iDvVxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfRnJhbWVMb2dpY0Z1bmMoKTtcclxuICAgICAgICAvL+WIpOaWreS7u+WKoeWujOaIkFxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBfSnVkZ2VDb21wbGV0ZSgpOmJvb2xlYW47XHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/nu5PmnZ/lpITnkIZcclxuICAgICAgICBwcm90ZWN0ZWQgX0xlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZXIodGhpcyx0aGlzLl9GcmFtZUZ1bmMpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRm9yY2VMZWF2ZVN0YWdlKCk6dm9pZFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTGVhdmVTdGFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIEFuaW1Db2luIGV4dGVuZHMgQmFzZUFuaW1PYmpcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiQW5pbUNvaW5cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgU2V0VGFyZ2V0KCB0YXJnZXQ6TGF5YS5TcHJpdGUzRCApICAgIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fVGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgICAgICBzdXBlci5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9UYXJnZXQ6TGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZyxtb2RlbDpMYXlhLk1lc2hTcHJpdGUzRCA9IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlcihuYW1lLG1vZGVsKTtcclxuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBtb2RlbC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAvL+avj+W4p+aJp+ihjOmAu+i+keWKn+iDvVxyXG4gICAgICAgIHByb3RlY3RlZCBfRnJhbWVMb2dpY0Z1bmMoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0UG9zaXRpb24gPSB0aGlzLl9UYXJnZXQudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdmFyIGFkZFBTID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UG9zaXRpb24scG9zaXRpb24sYWRkUFMpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUoYWRkUFMsMC4xLGFkZFBTKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLmFkZChhZGRQUyxwb3NpdGlvbixwb3NpdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy/nlJ/lkb3lkajmnJ/nu5PmnZ/lpITnkIZcclxuICAgICAgICBwcm90ZWN0ZWQgX0xlYXZlU3RhZ2UoKTp2b2lkXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBlci5fTGVhdmVTdGFnZSgpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZExvZ2ljR29sZCgxKTtcclxuICAgICAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIodGhpcy5uYW1lLHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvL+WIpOaWreS7u+WKoeWujOaIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfSnVkZ2VDb21wbGV0ZSgpOmJvb2xlYW5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXRQb3NpdGlvbiA9IHRoaXMuX1RhcmdldC50cmFuc2Zvcm0ucG9zaXRpb247XHJcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB2YXIgZGlzRGlyID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc3VidHJhY3QodGFyZ2V0UG9zaXRpb24scG9zaXRpb24sZGlzRGlyKTtcclxuICAgICAgICAgICAgaWYoIExheWEuVmVjdG9yMy5zY2FsYXJMZW5ndGhTcXVhcmVkKGRpc0Rpcik8MC4xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBtb2R1bGUgQ2hhcmFjdGVyXHJcbntcclxuICAgIGV4cG9ydCBlbnVtIEFuaW1FbnVtXHJcbiAgICB7XHJcbiAgICAgICAgU3RhbmQsXHJcbiAgICAgICAgRmx5LFxyXG4gICAgICAgIEZhbGwsXHJcbiAgICAgICAgSnVtcCxcclxuICAgICAgICBKdW1wZG93bixcclxuICAgICAgICBEaWVcclxuICAgIH1cclxuICAgIHZhciBBbmltVHlwZTp7W25hbWU6bnVtYmVyXTpzdHJpbmd9O1xyXG4gICAgQW5pbVR5cGUgPSB7fTtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLlN0YW5kXSA9IFwiaWRsZVwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uSnVtcF0gPSBcImp1bXBVcFwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uSnVtcGRvd25dID0gXCJqdW1wRG93blwiO1xyXG4gICAgQW5pbVR5cGVbQW5pbUVudW0uRmx5XSA9IFwiZmx5XCI7XHJcbiAgICBBbmltVHlwZVtBbmltRW51bS5GYWxsXSA9IFwiZmFsbERvd25cIjtcclxuICAgIEFuaW1UeXBlW0FuaW1FbnVtLkRpZV0gPSBcImRpZVwiO1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIFBsYXllckFuaW1OYW1lKCBuYW1lRW51bTpBbmltRW51bSApOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBBbmltVHlwZVtuYW1lRW51bV07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBDaGFyYWN0ZXJBbmltYXRvclxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgbV9BbmltYXRvcjpMYXlhLkFuaW1hdG9yO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCBQbGF5ZXJDaGFyYWN0ZXI6TGF5YS5TcHJpdGUzRCApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBQbGF5ZXJDaGFyYWN0ZXIuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgU3dpdGNoU3RhdGUoIEFuaW1FbnVtIClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYXJhY3RvckFuaW1hdG9yIHtcclxuICAgIHByb3RlY3RlZCBtX0FuaWFtdG9yOiBMYXlhLkFuaW1hdG9yO1xyXG4gICAgcHJpdmF0ZSBtX1N0YXRlTWFwOiB7IFtuYW1lOiBzdHJpbmddOiBMYXlhLkFuaW1hdG9yU3RhdGUgfTtcclxuICAgIHByaXZhdGUgbV9DdXJTdGF0ZU5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBnZXQgc3BlZWQoKTogbnVtYmVyICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9BbmlhbXRvci5zcGVlZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgc3BlZWQodmFsdWU6IG51bWJlcikgIHtcclxuICAgICAgICB0aGlzLm1fQW5pYW10b3Iuc3BlZWQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY3VyU3RhdGVOYW1lKCk6IHN0cmluZyAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fQ3VyU3RhdGVOYW1lO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoYW5pbWF0b3I6IExheWEuQW5pbWF0b3IpICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaWFtdG9yID0gYW5pbWF0b3I7XHJcbiAgICAgICAgdGhpcy5tX1N0YXRlTWFwID0ge307XHJcbiAgICAgICAgaWYgKCFhbmltYXRvcilcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmICghYW5pbWF0b3IuZ2V0Q29udHJvbGxlckxheWVyKCkpXHJcbiAgICAgICAgICAgIHZhciBhID0gMTtcclxuICAgICAgICB2YXIgbGF5ZXI6IExheWEuTWFwTGF5ZXIgPSBhbmltYXRvci5nZXRDb250cm9sbGVyTGF5ZXIoKS5fc3RhdGVzTWFwO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLm1fU3RhdGVNYXBba2V5XSA9IGxheWVyW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9DdXJTdGF0ZU5hbWUgPSB0aGlzLm1fQW5pYW10b3IuZ2V0RGVmYXVsdFN0YXRlKCkubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgR2V0U3RhdGUobmFtZTogc3RyaW5nKTogTGF5YS5BbmltYXRvclN0YXRlICB7XHJcbiAgICAgICAgaWYgKG5hbWUgPT0gXCJmYWxsXCIpXHJcbiAgICAgICAgICAgIHZhciBhID0gMTtcclxuICAgICAgICB2YXIgYW5pbWF0b3JTdGF0ZSA9IHRoaXMubV9TdGF0ZU1hcFtuYW1lXTtcclxuICAgICAgICBpZiAoIWFuaW1hdG9yU3RhdGUpICB7XHJcbiAgICAgICAgICAgIHZhciBpZGxlU3RhdGUgPSB0aGlzLm1fQW5pYW10b3IuZ2V0RGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgICAgIGFuaW1hdG9yU3RhdGUgPSBuZXcgTGF5YS5BbmltYXRvclN0YXRlKCk7XHJcbiAgICAgICAgICAgIGFuaW1hdG9yU3RhdGUubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIGFuaW1hdG9yU3RhdGUuY2xpcCA9IGlkbGVTdGF0ZS5jbGlwO1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pYW10b3IuYWRkU3RhdGUoYW5pbWF0b3JTdGF0ZSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9TdGF0ZU1hcFtuYW1lXSA9IGFuaW1hdG9yU3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gYW5pbWF0b3JTdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcGxheShuYW1lOiBzdHJpbmcpICB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1fU3RhdGVNYXBbbmFtZV0pICB7XHJcbiAgICAgICAgICAgIHRoaXMubV9BbmlhbXRvci5wbGF5KG5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLm1fQ3VyU3RhdGVOYW1lID0gbmFtZTtcclxuICAgICAgICB9IGVsc2UgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhbmltIElzIE5vdCBFeGlzdFwiICsgbmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsaW5rU3ByaXRlM0RUb0F2YXRhck5vZGUobm9kZU5hbWU6IHN0cmluZywgc3ByaXRlM0Q6IExheWEuU3ByaXRlM0QpOiB2b2lkICB7XHJcbiAgICAgICAgdGhpcy5tX0FuaWFtdG9yLmxpbmtTcHJpdGUzRFRvQXZhdGFyTm9kZShub2RlTmFtZSwgc3ByaXRlM0QpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHsgQmFzZUZ1bmMgfSBmcm9tIFwiLi4vQmFzZS9CYXNlRnVuY1wiO1xyXG4vL+a4uOaIj+S4reebuOaculxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ2FtZXJhIGV4dGVuZHMgTGF5YS5DYW1lcmEge1xyXG4gICAgQ3RybGVyOiBCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIEJhc2VQUzogTGF5YS5WZWN0b3IzO1xyXG4gICAgRHluYW1pY1BTOiBMYXlhLlZlY3RvcjM7XHJcbiAgICBQbGF5ZXI6IFBsYXllcjtcclxuICAgIHByaXZhdGUgbV9Db3VudFBTOiBCYXNlRnVuYy5TbW9vdGhEYW1wO1xyXG5cclxuICAgIHNldCBQb3NpdGlvbihwczogTGF5YS5WZWN0b3IzKSAge1xyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gcHMuY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBQb3NpdGlvbigpOiBMYXlhLlZlY3RvcjMgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm9ydGhvZ3JhcGhpYyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5DdHJsZXIgPSBuZXcgR2FtZUNhbWVyYUN0cmxlcih0aGlzKTtcclxuICAgICAgICB0aGlzLlBsYXllciA9IG51bGw7XHJcbiAgICAgICAgLy90aGlzLnRpbWVyTG9vcCgxLHRoaXMuQ3RybGVyLHRoaXMuQ3RybGVyLlVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5mcmFtZUxvb3AoMSwgdGhpcywgdGhpcy5fVXBkYXRlKTtcclxuICAgICAgICB0aGlzLmNsZWFyRmxhZyA9IExheWEuQmFzZUNhbWVyYS5DTEVBUkZMQUdfU0tZO1xyXG4gICAgICAgIHRoaXMubV9Db3VudFBTID0gbmV3IEJhc2VGdW5jLlNtb290aERhbXAoMSwxMDAwKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBJbml0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5CYXNlUFMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGxhZXIocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXQoRHluYW1pY1BTOiBMYXlhLlZlY3RvcjMsIGJhc2VQUzogTGF5YS5WZWN0b3IzLCBwbGF5ZXI6IFBsYXllcikgIHtcclxuICAgICAgICB0aGlzLlBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB0aGlzLkJhc2VQUyA9IGJhc2VQUztcclxuICAgICAgICB0aGlzLkR5bmFtaWNQUyA9IER5bmFtaWNQUztcclxuICAgIH1cclxuXHJcbiAgICAvL+iuoeeul+W5tuiuvue9ruS9jee9rlxyXG4gICAgQ291bnRTZXRQUygpICB7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMuQmFzZVBTLCB0aGlzLkR5bmFtaWNQUywgbmV3UFMpO1xyXG4gICAgICAgIHZhciBzY2FsZSA9IHRoaXMubV9Db3VudFBTLlNtb290aERhbXAoMCwgTGF5YS5WZWN0b3IzLmRpc3RhbmNlKHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLCBuZXdQUykpXHJcbiAgICAgICAgLy90aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5sZXJwKHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLCBuZXdQUywgc2NhbGUsIG5ld1BTKVxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7IC8vdGhpcy5tX0NvdW50UFMuQ291bnQodGhpcy50cmFuc2Zvcm0ucG9zaXRpb24sbmV3UFMpIC8vbmV3UFM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfVXBkYXRlKCkgIHtcclxuICAgICAgICB0aGlzLkN0cmxlci5VcGRhdGUoKTtcclxuICAgICAgICAvL3RoaXMuZmllbGRPZlZpZXdcclxuICAgIH1cclxufVxyXG5cclxuYWJzdHJhY3QgY2xhc3MgQmFzZUdhbWVDYW1lcmFDdHJsZXIge1xyXG4gICAgQ2FtZXJhOiBHYW1lQ2FtZXJhO1xyXG4gICAgQ3RybGVyOiBCYXNlR2FtZUNhbWVyYUN0cmxlcjtcclxuICAgIGFic3RyYWN0IFVwZGF0ZSgpOiB2b2lkO1xyXG4gICAgY29uc3RydWN0b3IoY2FtZXJhOiBHYW1lQ2FtZXJhLCBjdHJsZXI6IEJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbCkgIHtcclxuICAgICAgICBpZiAoY3RybGVyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIGN0cmxlciA9IHRoaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuQ2FtZXJhID0gY2FtZXJhO1xyXG4gICAgICAgIHRoaXMuQ3RybGVyID0gY3RybGVyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHYW1lQ2FtZXJhQ3RybGVyIGV4dGVuZHMgQmFzZUdhbWVDYW1lcmFDdHJsZXIge1xyXG4gICAgY29uc3RydWN0b3IoY2FtZXJhOiBHYW1lQ2FtZXJhLCBjdHJsZXI6IEJhc2VHYW1lQ2FtZXJhQ3RybGVyID0gbnVsbCkgIHtcclxuICAgICAgICBzdXBlcihjYW1lcmEsIGN0cmxlcik7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCkgIHtcclxuICAgICAgICBpZiAodGhpcy5DYW1lcmEgPT0gbnVsbCB8fCB0aGlzLkNhbWVyYS5QbGF5ZXIgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKlxyXG4gICAgICAgIHZhciBDYW1lcmFQUyA9IHRoaXMuQ2FtZXJhLkR5bmFtaWNQUztcclxuICAgICAgICB2YXIgUGxheWVyUFMgPSB0aGlzLkNhbWVyYS5QbGF5ZXIuX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZGlzTnVtKT4wLjAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW0qMC4xO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiggTWF0aC5hYnMoZGlzWk51bSk+MC4wMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnogKz0gZGlzWk51bSowLjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLkNhbWVyYS5EeW5hbWljUFMgPUNhbWVyYVBTO1xyXG4gICAgICAgICovXHJcbiAgICAgICAgdmFyIENhbWVyYVBTID0gdGhpcy5DYW1lcmEuRHluYW1pY1BTO1xyXG4gICAgICAgIHZhciBQbGF5ZXJQUyA9IHRoaXMuQ2FtZXJhLlBsYXllci5tX0xvZ2ljUG9zaXRpb247XHJcbiAgICAgICAgQ2FtZXJhUFMueCA9IDA7XHJcbiAgICAgICAgdmFyIGRpc051bSA9IFBsYXllclBTLnkgLSBDYW1lcmFQUy55O1xyXG4gICAgICAgIHZhciBkaXNaTnVtID0gUGxheWVyUFMueiAtIENhbWVyYVBTLno7XHJcbiAgICAgICAgdmFyIGRpc0h1bSA9IFBsYXllclBTLnggLSBDYW1lcmFQUy54O1xyXG4gICAgICAgIGlmIChNYXRoLmFicyhkaXNOdW0pID4gMC4wMSkgIHtcclxuICAgICAgICAgICAgQ2FtZXJhUFMueSArPSBkaXNOdW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChNYXRoLmFicyhkaXNaTnVtKSA+IDAuMDEpICB7XHJcbiAgICAgICAgICAgIENhbWVyYVBTLnogKz0gZGlzWk51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpc0h1bSkgPiAwLjAxKSAge1xyXG4gICAgICAgICAgICBDYW1lcmFQUy54ICs9IGRpc0h1bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuRHluYW1pY1BTID0gQ2FtZXJhUFM7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuQ291bnRTZXRQUygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgeyBBbmltT2JqIH0gZnJvbSBcIi4vLi4vR2FtZS9BbmltT2JqXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9TY2VuZS9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgeyBQbGF5ZXJDb250cm9sZXIgfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBJbnB1dCB9IGZyb20gXCIuL0lucHV0XCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4vR2FtZU1vZHVsZVwiO1xyXG5pbXBvcnQgQ2hhcmFjdG9yQW5pbWF0b3IgZnJvbSBcIi4vQ2hhcmFjdGVyQW5pbWF0b3JcIjtcclxuaW1wb3J0IHsgQmFzZUZ1bmMgfSBmcm9tIFwiLi4vQmFzZS9CYXNlRnVuY1wiO1xyXG5cclxudHlwZSBBbmltQ29pbiA9IEFuaW1PYmouQW5pbUNvaW5cclxuZXhwb3J0IG1vZHVsZSBJdGVtIHtcclxuICAgIC8v54mp5ZOB5qCH6K+GXHJcbiAgICBjb25zdCBJdGVtSUQ6IHN0cmluZyA9IFwiSXRlbVwiO1xyXG4gICAgY29uc3QgTW9kZWxJRDogc3RyaW5nID0gXCJNb2RlbFwiXHJcblxyXG4gICAgZXhwb3J0IGVudW0gTW9kZWxUeXBlIHtcclxuICAgICAgICBDb2luXHJcbiAgICB9XHJcbiAgICBleHBvcnQgZW51bSBJdGVtVHlwZSB7XHJcbiAgICAgICAgTm9uZSA9IDAsXHJcbiAgICAgICAgRW1wdHksXHJcbiAgICAgICAgUm9jayxcclxuICAgICAgICBUaG9ybixcclxuICAgICAgICBWaW5lLFxyXG4gICAgICAgIFByb3RlY3QgPSAxMSxcclxuICAgICAgICBIb2x5UHJvdGVjdCxcclxuICAgICAgICBGbHksXHJcbiAgICAgICAgUm9wZSxcclxuICAgICAgICBDb2xsZWN0b3IsXHJcbiAgICAgICAgQ29pbiA9IDIwLFxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIExpbmVJdGVtSW5mbyB7XHJcbiAgICAgICAgVHlwZTogSXRlbVR5cGU7XHJcbiAgICAgICAgTnVtYmVyOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3IodHlwZTogSXRlbVR5cGUsIG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIHRoaXMuTnVtYmVyID0gbnVtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCB2YXIgQnVmZlNsb3Q6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0gPSB7fTtcclxuICAgIEJ1ZmZTbG90W0l0ZW1UeXBlLkNvbGxlY3Rvcl0gPSAwO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuUHJvdGVjdF0gPSAxO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuSG9seVByb3RlY3RdID0gMTtcclxuICAgIEJ1ZmZTbG90W0l0ZW1UeXBlLkZseV0gPSAxO1xyXG4gICAgQnVmZlNsb3RbSXRlbVR5cGUuVmluZV0gPSAyO1xyXG5cclxuICAgIC8v54mp5ZOB5biD5bGAXHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxheW91dCB7XHJcbiAgICAgICAgUmV3YXJkTGlzdDogQXJyYXk8TGF5SXRlbU1ncj47XHJcbiAgICAgICAgQmFycmllckxpc3Q6IEFycmF5PExheUl0ZW1NZ3I+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QgPSBuZXcgQXJyYXk8TGF5SXRlbU1ncj4oKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdCA9IG5ldyBBcnJheTxMYXlJdGVtTWdyPigpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLCAxLCBJdGVtVHlwZS5FbXB0eSwgMTApKTtcclxuICAgICAgICAgICAgdGhpcy5CYXJyaWVyTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDEwLCA1LCBJdGVtVHlwZS5Sb2NrLCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLkJhcnJpZXJMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDIsIEl0ZW1UeXBlLlRob3JuLCAxMCkpO1xyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncigxMCwgMiwgSXRlbVR5cGUuVmluZSwgMTApKTtcclxuICAgICAgICAgICAgdGhpcy5SZXdhcmRMaXN0LnB1c2gobmV3IExheUl0ZW1NZ3IoMTAsIDEsIEl0ZW1UeXBlLkNvaW4pKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLCAxLCBJdGVtVHlwZS5GbHksIDIwKSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLlJld2FyZExpc3QucHVzaChuZXcgTGF5SXRlbU1ncig1MCwgMSwgSXRlbVR5cGUuQ29sbGVjdG9yKSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLCAxLCBJdGVtVHlwZS5Qcm90ZWN0KSk7XHJcbiAgICAgICAgICAgIHRoaXMuUmV3YXJkTGlzdC5wdXNoKG5ldyBMYXlJdGVtTWdyKDUwLCAxLCBJdGVtVHlwZS5Ib2x5UHJvdGVjdCkpO1xyXG5cclxuICAgICAgICAgICAgUmVzZXRJdGVtRmFjdG9yeSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGFrZUxpbmVSZXdhcmQoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5UYWtlSXRlbShmbG9vciwgdGhpcy5SZXdhcmRMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VMaW5lRGlmZmljdWx0eShmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLlRha2VJdGVtKGZsb29yLCB0aGlzLkJhcnJpZXJMaXN0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRha2VJdGVtKGZsb29yOiBudW1iZXIsIE1nckxpc3Q6IEFycmF5PExheUl0ZW1NZ3I+KTogQXJyYXk8TGluZUl0ZW1JbmZvPiB7XHJcbiAgICAgICAgICAgIHZhciByZXR1cm5JbmZvID0gbmV3IEFycmF5PExpbmVJdGVtSW5mbz4oKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgbGlzdElkeCA9IDA7IGxpc3RJZHggPCBNZ3JMaXN0Lmxlbmd0aDsgKytsaXN0SWR4KSB7XHJcbiAgICAgICAgICAgICAgICBNZ3JMaXN0W2xpc3RJZHhdLk9uRmxvb3IoZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm86IExpbmVJdGVtSW5mbyA9IE1nckxpc3RbbGlzdElkeF0uVGFrZUl0ZW1zKGZsb29yKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmZvLk51bWJlciA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5JbmZvLnB1c2goaW5mbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldHVybkluZm87XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6K+l5a+56LGh55qE5YiG5biD5Zu+5q+P5bGC562J5qaC546H5YiG5biDXHJcbiAgICBleHBvcnQgY2xhc3MgTGF5SXRlbU1nciB7XHJcbiAgICAgICAgLy/pgZPlhbfnsbvlnotcclxuICAgICAgICBJdGVtVHlwZTogSXRlbVR5cGU7XHJcbiAgICAgICAgLy/lvZPliY3lsYLmlbBcclxuICAgICAgICBDdXJGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIC8v5Yy66Ze05YiG5biD5oC75pWw6YePXHJcbiAgICAgICAgSXRlbU51bTogbnVtYmVyO1xyXG4gICAgICAgIC8v5byA5aeL5YiG5biD55qE5bGC5pWwXHJcbiAgICAgICAgU3RhcnRGbG9vcjogbnVtYmVyO1xyXG4gICAgICAgIC8v5YiG5biD5Yy66Ze0XHJcbiAgICAgICAgLy/lt7Lojrflj5blsYLmoIforrBcclxuICAgICAgICBUb3VjaGVkRmxvb3I6IG51bWJlcjtcclxuICAgICAgICBJdGVtTGlzdDogQXJyYXk8bnVtYmVyPjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gcmFuZ2Ug5Yy66Ze06IyD5Zu0XHJcbiAgICAgICAgICogQHBhcmFtIG51bSDljLrpl7TojIPlm7TmlbDph49cclxuICAgICAgICAgKiBAcGFyYW0gaXRlbVR5cGUg55Sf5Lqn55qE6YGT5YW357G75Z6LXHJcbiAgICAgICAgICogQHBhcmFtIHN0YXJ0Rmxvb3Ig5LuO5ZOq5LiA6KGM5byA5aeL5oqV5o63XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3RydWN0b3IocmFuZ2U6IG51bWJlciwgbnVtOiBudW1iZXIsIGl0ZW1UeXBlOiBJdGVtVHlwZSwgc3RhcnRGbG9vcjogbnVtYmVyID0gMSkge1xyXG4gICAgICAgICAgICBpZiAobnVtID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIG51bSA9IDE7XHJcbiAgICAgICAgICAgIGlmIChzdGFydEZsb29yID09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIC8v56ysMOWxguaYr+eOqeWutui1t+atpeS9jee9rlxyXG4gICAgICAgICAgICAgICAgc3RhcnRGbG9vciA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuSXRlbVR5cGUgPSBpdGVtVHlwZTtcclxuICAgICAgICAgICAgdGhpcy5DdXJGbG9vciA9IDA7XHJcbiAgICAgICAgICAgIC8vdGhpcy5JdGVtTnVtID0gbnVtO1xyXG4gICAgICAgICAgICB0aGlzLkl0ZW1OdW0gPSBudW0gKjM7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL+WIhuW4g+WbviDnianlk4FpZHg65bGC5pWwXHJcbiAgICAgICAgICAgIHRoaXMuSXRlbUxpc3QgPSBuZXcgQXJyYXk8bnVtYmVyPihyYW5nZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG91Y2hlZEZsb29yID0gMDtcclxuICAgICAgICAgICAgdGhpcy5HZW5NYXAoc3RhcnRGbG9vcilcclxuICAgICAgICB9XHJcbiAgICAgICAgZ2V0IFJhbmdlKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkl0ZW1MaXN0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/lsYLmm7TmlrDlh73mlbBcclxuICAgICAgICBPbkZsb29yKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgaWYgKGZsb29yIDwgdGhpcy5Ub3VjaGVkRmxvb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2VuTWFwKGZsb29yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZmxvb3IgPj0gdGhpcy5TdGFydEZsb29yICsgdGhpcy5SYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5HZW5NYXAoZmxvb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sf5oiQ5YiG5biD5Zu+XHJcbiAgICAgICAgR2VuTWFwKHN0YXJ0Rmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0Rmxvb3IgPSBzdGFydEZsb29yO1xyXG4gICAgICAgICAgICB2YXIgaXRlbU51bSA9IHRoaXMuSXRlbU51bTtcclxuICAgICAgICAgICAgZm9yIChsZXQgY291bnQ6IG51bWJlciA9IDA7IGNvdW50IDwgdGhpcy5JdGVtTGlzdC5sZW5ndGg7ICsrY291bnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXRlbUxpc3RbY291bnRdID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaXRlbUxpc3QgPSB0aGlzLkl0ZW1MaXN0O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBjb3VudE51bTogbnVtYmVyID0gMDsgY291bnROdW0gPCBpdGVtTnVtOyArK2NvdW50TnVtKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgSXRlbUZsb29yOiBudW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLlJhbmdlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuSXRlbUxpc3RbSXRlbUZsb29yXSArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWtlSXRlbXMoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgICAgICB0aGlzLlRvdWNoZWRGbG9vciA9IGZsb29yO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IExpbmVJdGVtSW5mbyh0aGlzLkl0ZW1UeXBlLCB0aGlzLkl0ZW1MaXN0W2Zsb29yIC0gdGhpcy5TdGFydEZsb29yXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBSZXNldDogYm9vbGVhbjtcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBSZXNldEl0ZW1GYWN0b3J5KCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChSZXNldCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFJlc2V0ID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciB0aGVLZXkgaW4gR2FtZVN0cnVjdC5JdGVtRGljdFR5cGUpIHtcclxuICAgICAgICAgICAgdmFyIHR5cGUgPSBwYXJzZUludCh0aGVLZXkpO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA8PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBjb3VudCA9IDA7IGNvdW50IDwgMzA7ICsrY291bnQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGFzOiBhbnkgPSBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVt0eXBlXTtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtOiBTdGVwID0gbmV3IGNsYXMobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihJdGVtSUQgKyB0aGVLZXksIGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBTdGVwSXRlbUZhY3RvcnkoaXRlbVR5cGU6IEl0ZW1UeXBlLCBzdGVwKSB7XHJcbiAgICAgICAgaWYgKHN0ZXAgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGl0ZW1UeXBlID0gSXRlbVR5cGUuTm9uZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGl0ZW1cclxuICAgICAgICB2YXIgb2JqUG9vbCA9IExheWEuUG9vbDtcclxuICAgICAgICBpdGVtID0gb2JqUG9vbC5nZXRJdGVtKEl0ZW1JRCArIGl0ZW1UeXBlKVxyXG4gICAgICAgIGlmIChpdGVtID09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXSAhPSBudWxsICYmIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW2l0ZW1UeXBlXSAhPSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjbGFzOiBhbnkgPSBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtpdGVtVHlwZV07XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IGNsYXMoc3RlcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gbmV3IFN0ZXBJdGVtKGl0ZW1UeXBlLCBzdGVwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGl0ZW0uU3RlcCA9IHN0ZXA7XHJcbiAgICAgICAgaXRlbS5SZXNldEl0ZW0oKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gSXRlbUJ1ZmZGYWN0b3J5KGl0ZW1UeXBlOiBJdGVtVHlwZSk6IEJhc2VQbGF5ZXJCdWZmIHtcclxuICAgICAgICB2YXIgYnVmZjogQmFzZVBsYXllckJ1ZmYgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAoaXRlbVR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5GbHk6XHJcbiAgICAgICAgICAgICAgICBidWZmID0gbmV3IEZseUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkNvbGxlY3RvcjpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgQ29sbGVjdEJ1ZmYoMTApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUHJvdGVjdDpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUHJvdGVjdEJ1ZmYoMyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Ib2x5UHJvdGVjdDpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUHJvdGVjdEJ1ZmYoMywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5WaW5lOlxyXG4gICAgICAgICAgICAgICAgYnVmZiA9IG5ldyBWaW5lQnVmZigpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuUm9wZTpcclxuICAgICAgICAgICAgICAgIGJ1ZmYgPSBuZXcgUm9wZUJ1ZmYoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYnVmZjtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU3RlcEl0ZW0ge1xyXG4gICAgICAgIHByb3RlY3RlZCBtX0NoYXJhY3RvckFuaW1hdG9yOiBDaGFyYWN0b3JBbmltYXRvcjtcclxuICAgICAgICBTdGVwOiBTdGVwO1xyXG4gICAgICAgIEl0ZW1UeXBlOiBJdGVtVHlwZTtcclxuICAgICAgICBNb2RlbDogTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBnZXQgSXNEaWZmaWN1bHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5JdGVtVHlwZSA+IDAgJiYgdGhpcy5JdGVtVHlwZSA8IDEwICYmIHRoaXMuSXRlbVR5cGUgIT0gSXRlbVR5cGUuVmluZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Yik5pat6IO95LiN6IO96LWw5LiK5Y67XHJcbiAgICAgICAgZ2V0IElzRm9yYmlkZW4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLkl0ZW1UeXBlID09IEl0ZW1UeXBlLlJvY2s7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+mHjee9rlxyXG4gICAgICAgIFJlc2V0SXRlbSgpIHtcclxuICAgICAgICAgICAgLy90aGlzLl9Jbml0SXRlbU1vZGVsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0RW5hYmxlKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuTW9kZWwudHJhbnNmb3JtLnJvdGF0aW9uRXVsZXIgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlN0ZXAuUHV0SW5JdGVtKHRoaXMuTW9kZWwpOy8vIC5hZGRDaGlsZCh0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU2V0RW5hYmxlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUHV0SXRlbSA9IGZ1bmN0aW9uIChpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmUpIHtcclxuICAgICAgICAgICAgdGhpcy5EZXNQYXduKCk7XHJcbiAgICAgICAgICAgIHRoaXMuU3RlcC5TdGVwSXRlbSA9IFN0ZXBJdGVtRmFjdG9yeShpdGVtVHlwZSwgdGhpcy5TdGVwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5raI6ZmkIOaKiuiHquW3seWtmOWFpeWGheWtmOaxoFxyXG4gICAgICAgIERlc1Bhd24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLk1vZGVsLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgdmFyIG9ialBvb2wgPSBMYXlhLlBvb2w7Ly9HTS5PYmpQb29sO1xyXG4gICAgICAgICAgICBvYmpQb29sLnJlY292ZXIoSXRlbUlEICsgdGhpcy5JdGVtVHlwZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDop6blj5FcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuSXRlbVR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBBZGRCdWZmVG9QbGF5ZXIocGxheWVyOiBQbGF5ZXIsIHB1dEJhY2tJdGVtOiBib29sZWFuID0gdHJ1ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgQnVmZjogQmFzZVBsYXllckJ1ZmYgPSBJdGVtQnVmZkZhY3RvcnkodGhpcy5JdGVtVHlwZSk7XHJcbiAgICAgICAgICAgIHZhciBzdWNjZXNzOiBib29sZWFuID0gQnVmZi5BZGRUb1BsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgICAgICBpZiAoc3VjY2VzcyAmJiBwdXRCYWNrSXRlbSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gc3VjY2VzcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOeqgeegtOS/neaKpFxyXG4gICAgICAgICAqIEByZXR1cm5zIOaYr+WQpuiiq+eqgeegtFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIEJyZWFrUHJvdGVjdChwbGF5ZXI6IFBsYXllcik6IGJvb2xlYW4ge1xyXG4gICAgICAgICAgICB2YXIgY3VyQnVmZiA9IHBsYXllci5HZXRCdWZmKEJ1ZmZTbG90W0l0ZW1UeXBlLlByb3RlY3RdKTtcclxuICAgICAgICAgICAgaWYgKGN1ckJ1ZmYpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoY3VyQnVmZi5UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Qcm90ZWN0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJCdWZmLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLkhvbHlQcm90ZWN0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGl0ZW1UeXBlOiBJdGVtVHlwZSwgU3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbVR5cGUgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtVHlwZSA9IEl0ZW1UeXBlLk5vbmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5TdGVwID0gU3RlcDtcclxuICAgICAgICAgICAgdGhpcy5JdGVtVHlwZSA9IGl0ZW1UeXBlO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fSW5pdEl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgU2V0SWRsZVdhdmUoKSB7XHJcbiAgICAgICAgICAgIHZhciBpZGVsU3RhdGU6IExheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMubV9DaGFyYWN0b3JBbmltYXRvci5HZXRTdGF0ZShcImlkbGVcIik7XHJcbiAgICAgICAgICAgIHZhciB3YXZlU3RhdGU6IFdhdmVTdGF0ZVNjcmlwdCA9IGlkZWxTdGF0ZS5hZGRTY3JpcHQoV2F2ZVN0YXRlU2NyaXB0KSBhcyBXYXZlU3RhdGVTY3JpcHQ7XHJcbiAgICAgICAgICAgIHdhdmVTdGF0ZS5Jbml0KHRoaXMuTW9kZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfQWRkQnVmZlRvUGxheWVyKHBsYXllcjogUGxheWVyLCBidWZmOiBCYXNlUGxheWVyQnVmZikge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkFkZEJ1ZmYoYnVmZikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0luaXRJdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLk1vZGVsICE9IG51bGwgJiYgIXRoaXMuTW9kZWwuZGVzdHJveWVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX0dlbkl0ZW1Nb2RlbCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5Nb2RlbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFuaW1Nb2RlbCA9IHRoaXMuTW9kZWwuZ2V0Q2hpbGRBdCgwKTtcclxuICAgICAgICAgICAgICAgIHZhciBhbmltYXRvcjogTGF5YS5BbmltYXRvciA9IGFuaW1Nb2RlbCA/IGFuaW1Nb2RlbC5nZXRDb21wb25lbnQoTGF5YS5BbmltYXRvcikgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdG9yKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9DaGFyYWN0b3JBbmltYXRvciA9IG5ldyBDaGFyYWN0b3JBbmltYXRvcihhbmltYXRvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuTW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBfVGVzdEdlbnRJdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IG51bGw7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5JdGVtVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBJdGVtVHlwZS5Sb2NrOlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgSXRlbVR5cGUuTm9uZTpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsID0gbmV3IExheWEuTWVzaFNwcml0ZTNEKExheWEuUHJpbWl0aXZlTWVzaC5jcmVhdGVCb3goMC4zLCAwLjMsIDAuNSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLkl0ZW1UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEl0ZW1UeXBlLlJvY2s6XHJcbiAgICAgICAgICAgICAgICAgICAgbW9kZWwgPSBuZXcgTGF5YS5NZXNoU3ByaXRlM0QoTGF5YS5QcmltaXRpdmVNZXNoLmNyZWF0ZUJveCgwLjMsIDAuMywgMC41KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIHByaXZhdGUgbV9UeXBlOiBJdGVtVHlwZTtcclxuICAgICAgICBwcml2YXRlIG1fUGxheWVyOiBQbGF5ZXI7XHJcbiAgICAgICAgcHVibGljIGdldCBUeXBlKCk6IEl0ZW0uSXRlbVR5cGUge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tX1R5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgU2xvdCgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICByZXR1cm4gQnVmZlNsb3RbdGhpcy5UeXBlXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIGdldCBwbGF5ZXIoKTogUGxheWVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9QbGF5ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHR5cGU6IEl0ZW0uSXRlbVR5cGUpIHtcclxuICAgICAgICAgICAgdGhpcy5tX1R5cGUgPSB0eXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WQkeeOqeWutua3u+WKoEJVRkZcclxuICAgICAgICBwdWJsaWMgQWRkVG9QbGF5ZXIocGxheWVyOiBQbGF5ZXIpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgdGhpcy5tX1BsYXllciA9IHBsYXllcjtcclxuICAgICAgICAgICAgcGxheWVyLkFkZEJ1ZmYodGhpcyk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGFic3RyYWN0IFN0YXJ0KCk7XHJcbiAgICAgICAgcHVibGljIFJlbW92ZVNlbGYoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLkNvbXBsZXRlQnVmZih0aGlzLlNsb3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgUmVtb3ZlZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFJvY2sgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBNb2RlbE51bSA9IDQ7XHJcbiAgICAgICAgY29uc3RydWN0b3IoU3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Sb2NrLCBTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5NZXNoU3ByaXRlM0QgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlkeCA9IDEgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBSb2NrLk1vZGVsTnVtKTtcclxuICAgICAgICAgICAgdmFyIE5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJ6aGFuZ2Fpd3VfcWl1MFwiICsgaWR4KVxyXG4gICAgICAgICAgICBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhOYW1lKVxyXG4gICAgICAgICAgICBtb2RlbCA9IG1vZGVsLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICAgICAgdmFyIHNjYWxlOkxheWEuVmVjdG9yMyA9IHRoaXMuTW9kZWwudHJhbnNmb3JtLnNjYWxlLmNsb25lKCk7XHJcbiAgICAgICAgICAgIExheWEuVmVjdG9yMy5zY2FsZShzY2FsZSwxLjUsc2NhbGUpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsLnRyYW5zZm9ybS5zY2FsZSA9IHNjYWxlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLlJvY2tdID0gUm9jaztcclxuXHJcbiAgICBjbGFzcyBUaG9ybiBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihTdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlRob3JuLCBTdGVwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJ0cmFwX3N0aW5nXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcik6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5CcmVha1Byb3RlY3QocGxheWVyKSlcclxuICAgICAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vQVBQLk1lc3NhZ2VNYW5hZ2VyLkZpcmUoTWVzc2FnZU1ELkdhbWVFdmVudC5QbGF5ZXJEZWF0aCk7XHJcbiAgICAgICAgICAgICAgICAvL3ZhciBhbmltOiBMYXlhLkFuaW1hdG9yID0gdGhpcy5Nb2RlbC5nZXRDaGlsZEF0KDApLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKTtcclxuICAgICAgICAgICAgICAgIC8vYW5pbS5wbGF5KFwiZGllXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX0NoYXJhY3RvckFuaW1hdG9yLnBsYXkoXCJ0cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLkRpZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuVGhvcm5dID0gVGhvcm47XHJcblxyXG4gICAgY2xhc3MgUHJvdGVjdCBleHRlbmRzIFN0ZXBJdGVtIHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlByb3RlY3QsIHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlNldElkbGVXYXZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9zaGllbGRfMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUHJvdGVjdF0gPSBQcm90ZWN0O1xyXG5cclxuICAgIGNsYXNzIFByb3RlY3RCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIFRpbWU6IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gdGltZSDmjIHnu63ml7bpl7RcclxuICAgICAgICAgKiBAcGFyYW0gSXNIb2x5IOaYr+WQpue7neWvueaXoOaVjFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKHRpbWU6IG51bWJlciA9IDAsIElzSG9seTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKElzSG9seSA/IEl0ZW1UeXBlLkhvbHlQcm90ZWN0IDogSXRlbVR5cGUuUHJvdGVjdCk7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIHRpbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPCBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnQoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFJlbW92ZWQoKSB7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2xhc3MgSG9seVByb3RlY3QgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Ib2x5UHJvdGVjdCwgc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0SWRsZVdhdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX3VudG91Y2hhYmxlXzAxXCIpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpXHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLkFkZEJ1ZmZUb1BsYXllcihwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkhvbHlQcm90ZWN0XSA9IEhvbHlQcm90ZWN0O1xyXG5cclxuICAgIGNsYXNzIENvaW4gZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX3RvdWNoZWQ6IEJvb2xlYW5cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5Db2luLCBzdGVwKTtcclxuICAgICAgICAgICAgLypcclxuICAgICAgICAgICAgdmFyIGlkZWxTdGF0ZTogTGF5YS5BbmltYXRvclN0YXRlID0gdGhpcy5tX0NoYXJhY3RvckFuaW1hdG9yLkdldFN0YXRlKFwiaWRsZVwiKTtcclxuICAgICAgICAgICAgdmFyIHdhdmVTdGF0ZTogV2F2ZVN0YXRlU2NyaXB0ID0gaWRlbFN0YXRlLmFkZFNjcmlwdChXYXZlU3RhdGVTY3JpcHQpIGFzIFdhdmVTdGF0ZVNjcmlwdDtcclxuICAgICAgICAgICAgd2F2ZVN0YXRlLkluaXQodGhpcy5Nb2RlbCk7XHJcbiAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuU2V0SWRsZVdhdmUoKTtcclxuICAgICAgICAgICAgdmFyIHRyaWdnZXJTdGF0ZTogTGF5YS5BbmltYXRvclN0YXRlID0gdGhpcy5tX0NoYXJhY3RvckFuaW1hdG9yLkdldFN0YXRlKFwidHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgdmFyIHRyaWdnZXJTdGF0ZVNjcmlwdDogR29sZEp1bXBVcCA9IHRyaWdnZXJTdGF0ZS5hZGRTY3JpcHQoR29sZEp1bXBVcCkgYXMgR29sZEp1bXBVcDtcclxuICAgICAgICAgICAgdHJpZ2dlclN0YXRlU2NyaXB0LkluaXQodGhpcy5Nb2RlbCwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBGbHlUb1BsYXllcihwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICB2YXIgY29uaW46IEFuaW1Db2luID0gQW5pbU9iai5HZW5BbmltT2JqPEFuaW1Db2luPihBbmltT2JqLkFuaW1Db2luLCB0aGlzLk1vZGVsKTtcclxuICAgICAgICAgICAgY29uaW4uU2V0VGFyZ2V0KHBsYXllcik7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkR29sZFVuTG9naWNHb2xkKDEpO1xyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW0oKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFRvdWNoSXRlbShwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZEdvbGQoMSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9DaGFyYWN0b3JBbmltYXRvci5wbGF5KFwidHJpZ2dlclwiKVxyXG4gICAgICAgICAgICAvL3RoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2NvaW5fMDFcIilcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKClcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkNvaW5dID0gQ29pbjtcclxuXHJcbiAgICBjbGFzcyBDb2xsZWN0ZXIgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3Rvciwgc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuU2V0SWRsZVdhdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIElkeCA9IE1hdGguZmxvb3IoMSArIE1hdGgucmFuZG9tKCkgKiAyKTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJpdGVtX2Fic29yZF8wMVwiKTtcclxuICAgICAgICAgICAgdmFyIHRoZU1vZGVsID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpO1xyXG4gICAgICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSB0aGVNb2RlbC5jbG9uZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5Nb2RlbCA9IG1vZGVsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIEdhbWVTdHJ1Y3QuSXRlbURpY3RUeXBlW0l0ZW1UeXBlLkNvbGxlY3Rvcl0gPSBDb2xsZWN0ZXI7XHJcblxyXG4gICAgY2xhc3MgQ29sbGVjdEJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgVGltZTogbnVtYmVyO1xyXG4gICAgICAgIEdhbWVEaXI6IEdhbWVEaXJlY3RvcjtcclxuICAgICAgICBDb3VudEZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgc3RhdGljIGdldCBTbG90KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3Rvcih0aW1lOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLkNvbGxlY3Rvcik7XHJcbiAgICAgICAgICAgIHRoaXMuR2FtZURpciA9IENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXI7XHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIHRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuQ291bnRGbG9vciA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFN0YXJ0KCkge1xyXG4gICAgICAgICAgICB0aGlzLkNvdW50Rmxvb3IgPSB0aGlzLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3IgLSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBSZW1vdmVkKCkge1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5UaW1lIDwgQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkdhbWVEaXIuR2FtZVBsYXkuUGxheWVyRmxvb3IgLSB0aGlzLkNvdW50Rmxvb3IgKyAxIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpci5HYW1lUGxheS5Mb29wRG9GbG9vclN0ZXAodGhpcy5Db3VudEZsb29yLCB0aGlzLCB0aGlzLkNvdW50Q29pbnMpO1xyXG4gICAgICAgICAgICAgICAgKyt0aGlzLkNvdW50Rmxvb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBDb3VudENvaW5zKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgaWYgKHN0ZXAuU3RlcEl0ZW0uSXRlbVR5cGUgPT0gSXRlbVR5cGUuQ29pbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIENvaW46IENvaW4gPSBzdGVwLlN0ZXBJdGVtIGFzIENvaW47XHJcbiAgICAgICAgICAgICAgICBDb2luLkZseVRvUGxheWVyKHRoaXMucGxheWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBGTHkgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllcik7XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3RlcDogU3RlcCkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5GbHksIHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLlNldElkbGVXYXZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v55Sx54i257G757uf5LiA566h55CG5qih5Z6L55Sf5oiQXHJcbiAgICAgICAgcHJvdGVjdGVkIF9HZW5JdGVtTW9kZWwoKSB7XHJcbiAgICAgICAgICAgIHZhciBJZHggPSBNYXRoLmZsb29yKDEgKyBNYXRoLnJhbmRvbSgpICogMik7XHJcbiAgICAgICAgICAgIHZhciBuYW1lOiBzdHJpbmcgPSBwYXRoLkdldExIKFwiaXRlbV9mbHllcl8wMVwiKTtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLlNwcml0ZTNEID0gTGF5YS5sb2FkZXIuZ2V0UmVzKG5hbWUpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTW9kZWwgPSBtb2RlbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5GbHldID0gRkx5O1xyXG5cclxuICAgIGNsYXNzIEZseUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgc3RhdGljIGdldCBTbG90KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBTcGVlZDogbnVtYmVyO1xyXG4gICAgICAgIEZsb29yOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0Zsb29yU3dpdGNoOiBudW1iZXI7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHNwZWVkOiBudW1iZXIgPSAwLjE1LCBmbG9vcjogbnVtYmVyID0gMTApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuRmx5KTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLkZsb29yID0gZmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLl9GaW5hbFogPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0aW1lOiBudW1iZXIgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWU7XHJcbiAgICAgICAgICAgIHZhciBwbGF5ZXI6IFBsYXllciA9IHRoaXMucGxheWVyO1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLkN1clN0ZXAgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5SZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGN1ckxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbiA9IHBsYXllci5DdXJTdGVwLkxvY2F0aW9uXHJcbiAgICAgICAgICAgIHRoaXMubV9GbG9vclN3aXRjaCA9IHBsYXllci5DdXJTdGVwLkZsb29yLnJpZ2h0U3dpdGNoO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG5ldyBHYW1lU3RydWN0Lk1Mb2NhdGlvbihjdXJMb2NhdGlvbi5YLCBjdXJMb2NhdGlvbi5ZKTtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9IHRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gR2FtZU1vZHVsZS5EU3BhY2UgKiB0aGlzLkZsb29yO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgcGxheWVyLkFkZEN0cmxlcihmbHlDdHJsKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5BZGRJbnB1dEN0cmxlcihuZXcgSW5wdXQuRElZSW5wdXQoKSk7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuU2V0U2FmZVBTKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICBwbGF5ZXIuRmx5UHJlcGFyZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgUmVtb3ZlZCgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24sIHRoaXMubV9GbG9vclN3aXRjaCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5Qb3BDdHJsZXIoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVXBkYXRlKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9GaW5hbFogLSB0aGlzLnBsYXllci5Qb3NpdGlvbi56ID4gLTAuMikge1xyXG4gICAgICAgICAgICAgICAgc3VwZXIuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsYXNzIFJvcGUgZXh0ZW5kcyBTdGVwSXRlbSB7XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuQWRkQnVmZlRvUGxheWVyKHBsYXllciwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdHJ1Y3RvcihzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUsIHN0ZXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nlLHniLbnsbvnu5/kuIDnrqHnkIbmqKHlnovnlJ/miJBcclxuICAgICAgICBwcm90ZWN0ZWQgX0dlbkl0ZW1Nb2RlbCgpIHtcclxuICAgICAgICAgICAgdmFyIG1vZGVsOiBMYXlhLk1lc2hTcHJpdGUzRCA9IG5ldyBMYXlhLk1lc2hTcHJpdGUzRChMYXlhLlByaW1pdGl2ZU1lc2guY3JlYXRlQm94KDAuMSwgMC41LCAwLjEpKVxyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgR2FtZVN0cnVjdC5JdGVtRGljdFR5cGVbSXRlbVR5cGUuUm9wZV0gPSBSb3BlO1xyXG5cclxuICAgIGNsYXNzIFJvcGVCdWZmIGV4dGVuZHMgQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIFNwZWVkOiBudW1iZXI7XHJcbiAgICAgICAgRmxvb3I6IG51bWJlcjtcclxuXHJcbiAgICAgICAgc3RhdGljIGdldCBTbG90KCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX0ZpbmFsWiAtIHRoaXMucGxheWVyLlBvc2l0aW9uLnogPiAtMC4yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBTdGFydCgpIHtcclxuICAgICAgICAgICAgdmFyIHBsYXllcjogUGxheWVyID0gdGhpcy5wbGF5ZXI7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsTG9jYXRpb24gPSBwbGF5ZXIuQ3VyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbi5ZICs9IHRoaXMuRmxvb3I7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IHBsYXllci5Qb3NpdGlvbi56IC0gR2FtZU1vZHVsZS5EU3BhY2UgKiB0aGlzLkZsb29yO1xyXG5cclxuICAgICAgICAgICAgdmFyIGZseUN0cmwgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllckZseSh0aGlzLlNwZWVkKTtcclxuICAgICAgICAgICAgZmx5Q3RybC5TZXRQbGF5ZXIocGxheWVyKVxyXG4gICAgICAgICAgICBwbGF5ZXIuQWRkQ3RybGVyKGZseUN0cmwpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkFkZElucHV0Q3RybGVyKG5ldyBJbnB1dC5ESVlJbnB1dCh0aGlzLCB0aGlzLl9JbnB1dCkpO1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlNldFNhZmVQUyh0aGlzLl9GaW5hbExvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVtb3ZlZCgpIHtcclxuICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LkdldFN0ZXBCeUxvY2F0aW9uKHRoaXMuX0ZpbmFsTG9jYXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5CYXNlQ3RybGVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5Qb3BDdHJsZXIoKTtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5Qb3BJbnB1dEN0cmxlcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICAgICAgcHJpdmF0ZSBfRmluYWxaOiBudW1iZXI7XHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlciA9IDAuMSwgZmxvb3I6IG51bWJlciA9IDEwKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKEl0ZW1UeXBlLlJvcGUpO1xyXG4gICAgICAgICAgICB0aGlzLlNwZWVkID0gc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuRmxvb3IgPSBmbG9vcjtcclxuICAgICAgICAgICAgdGhpcy5fRmluYWxMb2NhdGlvbiA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuX0ZpbmFsWiA9IDA7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9JbnB1dChpc1JpZ2h0OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHZhciBjbG9zZUZsb29yID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5QbGF5ZXJGbG9vckxpbmU7XHJcbiAgICAgICAgICAgIGlmIChjbG9zZUZsb29yLkZsb29yTnVtICUgMiAhPSB0aGlzLl9GaW5hbExvY2F0aW9uLlkgJSAyKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZUZsb29yID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5HZXRGbG9vckJ5Rmxvb3IoY2xvc2VGbG9vci5GbG9vck51bSArIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gY2xvc2VGbG9vci5HZXRTdGVwKHRoaXMuX0ZpbmFsTG9jYXRpb24uWCk7XHJcbiAgICAgICAgICAgIGlmIChpc1JpZ2h0KVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHN0ZXAgPSBzdGVwLkxlZnRQYXJlbnQ7XHJcbiAgICAgICAgICAgIGlmIChzdGVwLlN0ZXBJdGVtLklzRm9yYmlkZW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuUmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBWaW5lIGV4dGVuZHMgU3RlcEl0ZW0ge1xyXG4gICAgICAgIHByaXZhdGUgbV9CZVRvdWNoZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgZ2V0IFRvdWNoZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fQmVUb3VjaGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgVG91Y2hlZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLm1fQmVUb3VjaGVkID0gdmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgVG91Y2hJdGVtKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRvdWNoZWQpXHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgdGhpcy5BZGRCdWZmVG9QbGF5ZXIocGxheWVyLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fQ2hhcmFjdG9yQW5pbWF0b3IpXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQ2hhcmFjdG9yQW5pbWF0b3IucGxheShcInRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuTW9kZWwubmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuVG91Y2hlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICAgICAgc3VwZXIoSXRlbVR5cGUuVmluZSwgc3RlcCk7XHJcbiAgICAgICAgICAgIHRoaXMuVG91Y2hlZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+eUseeItuexu+e7n+S4gOeuoeeQhuaooeWei+eUn+aIkFxyXG4gICAgICAgIHByb3RlY3RlZCBfR2VuSXRlbU1vZGVsKCkge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5mbG9vcigxICsgTWF0aC5yYW5kb20oKSAqIDIpO1xyXG4gICAgICAgICAgICB2YXIgbmFtZTogc3RyaW5nID0gSWR4ID09IDEgPyBwYXRoLkdldExIKFwidHJhcF9lbnRhbmdsZV8wMVwiKSA6IHBhdGguR2V0TEgoXCJ0cmFwX2Nob21wZXJfMDFcIilcclxuXHJcbiAgICAgICAgICAgIHZhciBtb2RlbDogTGF5YS5TcHJpdGUzRCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKS5jbG9uZSgpO1xyXG4gICAgICAgICAgICB0aGlzLk1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgICAgIHZhciBzY2FsZTpMYXlhLlZlY3RvcjMgPSB0aGlzLk1vZGVsLnRyYW5zZm9ybS5zY2FsZS5jbG9uZSgpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUoc2NhbGUsMS4yLHNjYWxlKTtcclxuICAgICAgICAgICAgdGhpcy5Nb2RlbC50cmFuc2Zvcm0uc2NhbGUgPSBzY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mtojpmaQg5oqK6Ieq5bex5a2Y5YWl5YaF5a2Y5rGgXHJcbiAgICAgICAgRGVzUGF3bigpIHtcclxuICAgICAgICAgICAgdGhpcy5Ub3VjaGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN1cGVyLkRlc1Bhd24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBHYW1lU3RydWN0Lkl0ZW1EaWN0VHlwZVtJdGVtVHlwZS5WaW5lXSA9IFZpbmU7XHJcblxyXG4gICAgY2xhc3MgVmluZUJ1ZmYgZXh0ZW5kcyBCYXNlUGxheWVyQnVmZiB7XHJcbiAgICAgICAgQ291bnRUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgSW5wdXREaXI6IGJvb2xlYW47XHJcbiAgICAgICAgU3RhcnQoKSB7XHJcbiAgICAgICAgICAgIENvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuQWRkSW5wdXRDdHJsZXIobmV3IElucHV0LkRJWUlucHV0KHRoaXMsIHRoaXMuX0lucHV0KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBSZW1vdmVkKCkge1xyXG4gICAgICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5HYW1lRGlyLkdhbWVQbGF5LlBvcElucHV0Q3RybGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihjb3VudFRpbWU6IG51bWJlciA9IDQsIGlucHV0RGlyOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBzdXBlcihJdGVtVHlwZS5WaW5lKTtcclxuICAgICAgICAgICAgdGhpcy5Db3VudFRpbWUgPSBjb3VudFRpbWU7XHJcbiAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSBpbnB1dERpcjtcclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX1RpbWU7XHJcbiAgICAgICAgcHJpdmF0ZSBfSW5wdXQoaW5wdXREaXI6IGJvb2xlYW4pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuSW5wdXREaXIgPT0gaW5wdXREaXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuSW5wdXREaXIgPSAhdGhpcy5JbnB1dERpcjtcclxuICAgICAgICAgICAgICAgIC0tdGhpcy5Db3VudFRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fU2hvd0dhbWVJbmZvKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvdW50VGltZSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLlJlbW92ZVNlbGYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9TaG93R2FtZUluZm8oKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkNvdW50VGltZSA8PSAwKVxyXG4gICAgICAgICAgICAgICAgaW5mbyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGluZm8gPSB0aGlzLklucHV0RGlyID09IHRydWUgPyBcIlJpZ2h0XCIgOiBcIkxlZnRcIjtcclxuICAgICAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2FtZURpci5HYW1lUGxheS5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBHb2xkSnVtcFVwIGV4dGVuZHMgTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0IHtcclxuICAgICAgICBwcml2YXRlIG1fTW9kZWw6IExheWEuU3ByaXRlM0Q7XHJcbiAgICAgICAgcHJpdmF0ZSBtX0ZseVVwVGltZTtcclxuICAgICAgICBwcml2YXRlIG1fQ291bnRQUzogQmFzZUZ1bmMuU21vb3RoRGFtcDtcclxuICAgICAgICBwcml2YXRlIG1fWVN3aXRjaDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9PcmlnaW5hbFk6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIG1fU3RlcEl0ZW06IFN0ZXBJdGVtO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBJbml0KG1vZGVsOiBMYXlhLlNwcml0ZTNELCBzdGVwSXRlbTogU3RlcEl0ZW0pIHtcclxuICAgICAgICAgICAgdGhpcy5tX01vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgICAgIHRoaXMubV9TdGVwSXRlbSA9IHN0ZXBJdGVtO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBTZXRZUG9zaXRpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBsb2NhbFBvc2l0aW9uOiBMYXlhLlZlY3RvcjMgPSB0aGlzLm1fTW9kZWwudHJhbnNmb3JtLmxvY2FsUG9zaXRpb247XHJcbiAgICAgICAgICAgIGxvY2FsUG9zaXRpb24ueSA9IHRoaXMubV9PcmlnaW5hbFkgKyB0aGlzLm1fWVN3aXRjaDtcclxuICAgICAgICAgICAgdGhpcy5tX01vZGVsLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uID0gbG9jYWxQb3NpdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uU3RhdGVFbnRlcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tX1lTd2l0Y2ggPSAwLjU7XHJcbiAgICAgICAgICAgIHRoaXMubV9PcmlnaW5hbFkgPSB0aGlzLm1fTW9kZWwudHJhbnNmb3JtLmxvY2FsUG9zaXRpb24ueTtcclxuICAgICAgICAgICAgdGhpcy5TZXRZUG9zaXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb25TdGF0ZUV4aXQoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9TdGVwSXRlbS5QdXRJdGVtKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9ZU3dpdGNoID0gMDtcclxuICAgICAgICAgICAgdGhpcy5TZXRZUG9zaXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgb25TdGF0ZVVwZGF0ZSgpIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjbGFzcyBXYXZlU3RhdGVTY3JpcHQgZXh0ZW5kcyBMYXlhLkFuaW1hdG9yU3RhdGVTY3JpcHQge1xyXG4gICAgICAgIHByaXZhdGUgbV9Nb2RlbDogTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICBwcml2YXRlIG1fT3JpZ2luYWxZOiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1JvdW5kVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9EaXN0YW5jZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgbV9Db3VudFRpbWU6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtX01vdmVEaXN0YW5jZUNvdW50OiBudW1iZXI7XHJcblxyXG4gICAgICAgIGdldCBDb3VudFJvdW5kKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHJldHVybiAoQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lIC0gdGhpcy5tX0NvdW50VGltZSkgLyB0aGlzLm1fUm91bmRUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgVGltZVJvdW5kUmF0ZSgpOiBudW1iZXIge1xyXG4gICAgICAgICAgICB2YXIgdGltZVNjYWxlID0gKEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSAtIHRoaXMubV9Db3VudFRpbWUpICUgdGhpcy5tX1JvdW5kVGltZTtcclxuICAgICAgICAgICAgdGltZVNjYWxlID0gKHRpbWVTY2FsZSAvIHRoaXMubV9Sb3VuZFRpbWUpICogTWF0aC5QSTtcclxuICAgICAgICAgICAgcmV0dXJuIHRpbWVTY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Sb3VuZFRpbWUgPSAzO1xyXG4gICAgICAgICAgICB0aGlzLm1fRGlzdGFuY2UgPSAwLjVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEluaXQobW9kZWw6IExheWEuU3ByaXRlM0QpIHtcclxuICAgICAgICAgICAgdGhpcy5tX01vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgICAgIHRoaXMubV9PcmlnaW5hbFkgPSB0aGlzLm1fTW9kZWwudHJhbnNmb3JtLnBvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Nb3ZlRGlzdGFuY2VDb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIFNldFlQb3NpdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGxvY2FsUG9zaXRpb246IExheWEuVmVjdG9yMyA9IHRoaXMubV9Nb2RlbC50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbjtcclxuICAgICAgICAgICAgbG9jYWxQb3NpdGlvbi55ID0gdGhpcy5tX09yaWdpbmFsWSArIHRoaXMubV9Nb3ZlRGlzdGFuY2VDb3VudDtcclxuICAgICAgICAgICAgdGhpcy5tX01vZGVsLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uID0gbG9jYWxQb3NpdGlvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uU3RhdGVFbnRlcigpIHtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50VGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uU3RhdGVFeGl0KCkge1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb25TdGF0ZVVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgdGhpcy5tX01vdmVEaXN0YW5jZUNvdW50ID0gTWF0aC5zaW4odGhpcy5UaW1lUm91bmRSYXRlKSAqIHRoaXMubV9EaXN0YW5jZTtcclxuICAgICAgICAgICAgdGhpcy5TZXRZUG9zaXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCBNb3VudExpbmUgZnJvbSBcIi4vTW91bnRMaW5lXCI7XHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi9HYW1lU3RydWN0XCI7XHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9HYW1lSXRlbVwiO1xyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi9TdGVwXCI7XHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCI7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi9HYW1lTW9kdWxlXCI7XHJcblxyXG52YXIgTW91bnRzOiBudW1iZXIgPSAyO1xyXG52YXIgTGluZVNwYWNlOiBudW1iZXIgPSAyO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZW1hcCBleHRlbmRzIExheWEuTm9kZSB7XHJcbiAgICBwcml2YXRlIG1fSGVhZEZsb29ySWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fVGFpbEZMb29ySWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fTW91bnRMaW5lczogTW91bnRMaW5lW107XHJcbiAgICBwcml2YXRlIG1fQ3VySWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fSXRlbVJhbmdlOiB7fTtcclxuICAgIHByaXZhdGUgbV9TYWZlTG9jYXRpb246IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4gICAgcHJpdmF0ZSBtX0N1ckxpbmVCYXJyaWVyczogQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+O1xyXG4gICAgcHJpdmF0ZSBtX0N1ckxpbmVSZXdhcmRzOiBBcnJheTxJdGVtLkxpbmVJdGVtSW5mbz47XHJcbiAgICBwcml2YXRlIG1fSXRlbUxheW91dDogSXRlbS5JdGVtTGF5b3V0O1xyXG4gICAgcHJpdmF0ZSBtX1BsYXllcjogUGxheWVyO1xyXG4gICAgcHJpdmF0ZSBtX1N0YXJ0UG9zaXRpb246IExheWEuVmVjdG9yMztcclxuXHJcbiAgICBwcml2YXRlIG1fcmlnaHRTd2l0Y2hDb3VudDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1Nob3dTdGVwczogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1ZpZXdDb2x1bXM6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGdldCBDdXJMaW5lUmV3YXJkcygpOiBBcnJheTxJdGVtLkxpbmVJdGVtSW5mbz4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fQ3VyTGluZVJld2FyZHM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldCBDdXJMaW5lQmFycmllcnMoKTogQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0N1ckxpbmVCYXJyaWVycztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0IE1vdW50TGluZXMoKTogTW91bnRMaW5lW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW91bnRMaW5lcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0IE5leHRJRCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5tX0N1cklkeCArIDEpICUgTW91bnRzO1xyXG4gICAgfVxyXG4gICAgZ2V0IEhlYWRGbG9vcigpOiBNb3VudExpbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fTW91bnRMaW5lc1t0aGlzLm1fSGVhZEZsb29ySWR4XTtcclxuICAgIH1cclxuICAgIGdldCBUYWlsRkxvb3IoKTogTW91bnRMaW5lIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX01vdW50TGluZXNbdGhpcy5tX1RhaWxGTG9vcklkeF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBmbG9vck51bSDlsYLmlbBcclxuICAgICAqIEBwYXJhbSBjb2x1bW4g5YiX5pWwXHJcbiAgICAgKiBAcGFyYW0gY2FtZXJhIOebuOaculxyXG4gICAgICogQHBhcmFtIGRpc3RhbmNlIOi3neemu1xyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihmbG9vck51bTogbnVtYmVyLCBjb2x1bW46IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1ZpZXdDb2x1bXMgPSBjb2x1bW47XHJcbiAgICAgICAgdGhpcy5tX01vdW50TGluZXMgPSBbXTtcclxuICAgICAgICB0aGlzLm1fQ3VySWR4ID0gMDtcclxuICAgICAgICB0aGlzLm1fSGVhZEZsb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLm1fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLm1fSXRlbUxheW91dCA9IG5ldyBJdGVtLkl0ZW1MYXlvdXQoKVxyXG4gICAgICAgIHRoaXMubV9DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5tX0N1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLm1fU2FmZUxvY2F0aW9uID0gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKC0xLCAtMSk7XHJcbiAgICAgICAgdmFyIGZsb29yQ29sdW1OdW06IG51bWJlciA9IGZsb29yTnVtICogMiArIDQ7XHJcbiAgICAgICAgZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgZmxvb3JOdW07ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdNb3VudGFpbiA9IG5ldyBNb3VudExpbmUoaWR4LCBmbG9vckNvbHVtTnVtLCBpZHgpXHJcbiAgICAgICAgICAgIHRoaXMubV9Nb3VudExpbmVzW2lkeF0gPSBuZXdNb3VudGFpbjtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChuZXdNb3VudGFpbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBzdGFydEZsb29yIOi1t+Wni+WxglxyXG4gICAgICogQHBhcmFtIGNhbWVyYSDnm7jmnLpcclxuICAgICAqIEBwYXJhbSB2aWV3SGVpZ2h0IOebuOacuuWeguebtOinhumHjlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgSW5pdChzdGFydEZsb29yOiBudW1iZXIsIGNhbWVyYTogTGF5YS5DYW1lcmEsIHZpZXdIZWlnaHQ6IG51bWJlcik6IExheWEuVmVjdG9yMyB7XHJcbiAgICAgICAgLy92YXIgbGluZU5vcm1hbFZlY3RvcjogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygwLCBHYW1lTW9kdWxlLlZTcGFjZSwgR2FtZU1vZHVsZS5EU3BhY2UpO1xyXG4gICAgICAgIHN0YXJ0Rmxvb3IgPSAoIXN0YXJ0Rmxvb3IpICYmIChzdGFydEZsb29yIDwgMCkgJiYgKHN0YXJ0Rmxvb3IgPj0gbGluZXMubGVuZ3RoKSA/IDAgOiBzdGFydEZsb29yO1xyXG4gICAgICAgIC8vdmFyIGNhbWVyYVBTOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsMTUsMjApO1xyXG4gICAgICAgIHZhciBjYW1lcmFQUzogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygwLDE1LDIwKTtcclxuICAgICAgICBcclxuICAgICAgICB2YXIgY21lcmFWaWV3SGVpZ2h0OiBudW1iZXIgPSB2aWV3SGVpZ2h0IC8gKHRoaXMubV9Nb3VudExpbmVzLmxlbmd0aCk7XHJcbiAgICAgICAgR2FtZU1vZHVsZS5WU3BhY2UgPSBjbWVyYVZpZXdIZWlnaHQ7XHJcbiAgICAgICAgY2FtZXJhLm9ydGhvZ3JhcGhpY1ZlcnRpY2FsU2l6ZSA9IHZpZXdIZWlnaHQgLSAyLjUqY21lcmFWaWV3SGVpZ2h0O1xyXG4gICAgICAgIHZhciBzY3JlZW5XaWRodDogbnVtYmVyID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB2YXIgd2lkdHRoU3BhY2U6IG51bWJlciA9IHNjcmVlbldpZGh0IC8gdGhpcy5tX1ZpZXdDb2x1bXM7XHJcbiAgICAgICAgdmFyIHNwYWNlUFM6IExheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMod2lkdHRoU3BhY2UsIDAsIDApO1xyXG4gICAgICAgIGNhbWVyYS5jb252ZXJ0U2NyZWVuQ29vcmRUb09ydGhvZ3JhcGhpY0Nvb3JkKHNwYWNlUFMsIHNwYWNlUFMpO1xyXG4gICAgICAgIEdhbWVNb2R1bGUuSFNwYWNlID0gMzsvL3NwYWNlUFMueDtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKGNhbWVyYVBTLG5ldyBMYXlhLlZlY3RvcjMoMCxHYW1lTW9kdWxlLlZTcGFjZSooc3RhcnRGbG9vciksMCksY2FtZXJhUFMpXHJcbiAgICAgICBcclxuICAgICAgICB2YXIgbGluZXM6IE1vdW50TGluZVtdID0gdGhpcy5tX01vdW50TGluZXM7XHJcbiAgICAgICAgdGhpcy5tX0hlYWRGbG9vcklkeCA9IGxpbmVzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgdGhpcy5tX1RhaWxGTG9vcklkeCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX3JpZ2h0U3dpdGNoQ291bnQgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGlkeDogbnVtYmVyID0gMDsgaWR4IDwgbGluZXMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICB2YXIgbGluZTogTW91bnRMaW5lID0gbGluZXNbaWR4XTtcclxuICAgICAgICAgICAgbGluZS5TZXRMaW5lKGlkeCwgdGhpcy5Db3VudE5leHRGbG9vckRpclN3aXRoKCkpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ID4gMSlcclxuICAgICAgICAgICAgICAgIGxpbmVzW2lkeCAtIDFdLlNldE5leHRGbG9vcihsaW5lKTtcclxuICAgICAgICAgICAgaWYgKGlkeCA9PSBzdGFydEZsb29yKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgUGxheWVyU3RlcCA9IGxpbmUuR2V0U3RlcChNYXRoLmZsb29yKGxpbmUuTGVuZ3RoIC8gMikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX1N0YXJ0UG9zaXRpb24gPSBQbGF5ZXJTdGVwLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgUGxheWVyU3RlcC5Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fU2FmZUxvY2F0aW9uID0gUGxheWVyU3RlcC5Mb2NhdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLlB1dEl0ZW1JbkxpbmUoaWR4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgc3RhcnRGbG9vck51bTogbnVtYmVyID0gMDsgc3RhcnRGbG9vck51bSA8IHN0YXJ0Rmxvb3I7ICsrc3RhcnRGbG9vck51bSkge1xyXG4gICAgICAgICAgICBsaW5lc1tzdGFydEZsb29yTnVtXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbWVyYVBTO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBzdGFydEZsb29yIFxyXG4gICAgICogQHBhcmFtIGNhbWVyYSBcclxuICAgICAqIEBwYXJhbSBkaXN0YW5jZSBcclxuICAgICAqIEByZXR1cm5zIOebuOacuuS9jee9rlxyXG4gICAgIFxyXG4gICAgcHVibGljIEluaXQoc3RhcnRGbG9vcjogbnVtYmVyLCBjYW1lcmE6IExheWEuQ2FtZXJhLCBkaXN0YW5jZTogbnVtYmVyKTogTGF5YS5WZWN0b3IzIHtcclxuICAgICAgICAvL3ZhciBsaW5lTm9ybWFsVmVjdG9yOiBMYXlhLlZlY3RvcjMgPSBuZXcgTGF5YS5WZWN0b3IzKDAsIEdhbWVNb2R1bGUuVlNwYWNlLCBHYW1lTW9kdWxlLkRTcGFjZSk7XHJcbiAgICAgICAgc3RhcnRGbG9vciA9ICghc3RhcnRGbG9vcikgJiYgKHN0YXJ0Rmxvb3IgPCAwKSAmJiAoc3RhcnRGbG9vciA+PSBsaW5lcy5sZW5ndGgpID8gMCA6IHN0YXJ0Rmxvb3I7XHJcbiAgICAgICAgdmFyIGxpbmVOb3JtYWxWZWN0b3I6IExheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoMCwgR2FtZU1vZHVsZS5EZXNpZ2huViwgR2FtZU1vZHVsZS5EZXNpZ2huRCk7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLm5vcm1hbGl6ZShsaW5lTm9ybWFsVmVjdG9yLCBsaW5lTm9ybWFsVmVjdG9yKTtcclxuICAgICAgICB2YXIgY2FtZXJhUFM6IExheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB2YXIgY2FtZXJhTWlkZWxOb3JtYWxWZWN0b3I6IExheWEuVmVjdG9yMyA9IGNhbWVyYS50cmFuc2Zvcm0uZm9yd2FyZDtcclxuICAgICAgICB2YXIgeFJvdGF0ZUFuZ2xlOiBudW1iZXIgPSAoTWF0aC5QSSAvIDE4MCkgKiAoY2FtZXJhLmZpZWxkT2ZWaWV3IC8gMik7XHJcblxyXG4gICAgICAgIHZhciB4Um90YXRlUXVhdGVybmlvbjogTGF5YS5RdWF0ZXJuaW9uID0gbmV3IExheWEuUXVhdGVybmlvbigpO1xyXG4gICAgICAgIExheWEuUXVhdGVybmlvbi5jcmVhdGVGcm9tQXhpc0FuZ2xlKG5ldyBMYXlhLlZlY3RvcjMoMSwgMCwgMCksIC14Um90YXRlQW5nbGUsIHhSb3RhdGVRdWF0ZXJuaW9uKVxyXG4gICAgICAgIHZhciBjYW1lcmFCb3R0b21Ob3JtYWxWZWN0b3I6IExheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMudHJhbnNmb3JtUXVhdChjYW1lcmFNaWRlbE5vcm1hbFZlY3RvciwgeFJvdGF0ZVF1YXRlcm5pb24sIGNhbWVyYUJvdHRvbU5vcm1hbFZlY3Rvcik7XHJcblxyXG4gICAgICAgIHZhciBib3R0b21BbmdlbENvczogbnVtYmVyID0gMDtcclxuXHJcbiAgICAgICAgdmFyIGJvdHRvbVBvaW50VG9DYW1lcmFOb3JtYWw6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5zY2FsZShjYW1lcmFCb3R0b21Ob3JtYWxWZWN0b3IsLTEsYm90dG9tUG9pbnRUb0NhbWVyYU5vcm1hbCk7XHJcbiAgICAgICAgYm90dG9tQW5nZWxDb3MgPSBMYXlhLlZlY3RvcjMuZG90KGxpbmVOb3JtYWxWZWN0b3IsIGJvdHRvbVBvaW50VG9DYW1lcmFOb3JtYWwpO1xyXG4gICAgICAgIHZhciBib3R0b21BbmdlbFNpbiA9IE1hdGguc3FydCgxIC0gTWF0aC5wb3coYm90dG9tQW5nZWxDb3MsIDIpKTtcclxuXHJcbiAgICAgICAgdmFyIGJvdHRvbUxlbmd0aDogbnVtYmVyID0gZGlzdGFuY2UgLyBib3R0b21BbmdlbFNpbjtcclxuICAgICAgICB2YXIgY2FtZXJhQm90dG9tVmVjdG9yOiBMYXlhLlZlY3RvcjMgPSBjYW1lcmFCb3R0b21Ob3JtYWxWZWN0b3IuY2xvbmUoKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuc2NhbGUoY2FtZXJhQm90dG9tTm9ybWFsVmVjdG9yLCAtMSAqIGJvdHRvbUxlbmd0aCwgY2FtZXJhQm90dG9tVmVjdG9yKTtcclxuXHJcbiAgICAgICAgY2FtZXJhUFMgPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLmFkZChjYW1lcmFQUywgY2FtZXJhQm90dG9tVmVjdG9yLCBjYW1lcmFQUyk7XHJcbiAgICAgICAgdmFyIGJvdHRvbUFuZ2VsOm51bWJlciA9TWF0aC5hY29zKGJvdHRvbUFuZ2VsQ29zKTtcclxuICAgICAgICB2YXIgdG9wQW5nbGU6IG51bWJlciA9IDkwICogKE1hdGguUEkgLyAxODApIC0gYm90dG9tQW5nZWw7XHJcbiAgICAgICAgdmFyIGxpbmVMZW5ndGg6IG51bWJlciA9IGJvdHRvbUxlbmd0aCAvIE1hdGguc2luKHRvcEFuZ2xlKSAqIE1hdGguc2luKGNhbWVyYS5maWVsZE9mVmlldyogKE1hdGguUEkgLyAxODApKTtcclxuICAgICAgICB2YXIgcGVyTGVuZ3RoOiBudW1iZXIgPSBsaW5lTGVuZ3RoIC8gKHRoaXMubV9Nb3VudExpbmVzLmxlbmd0aCAtIDEgKTtcclxuXHJcbiAgICAgICAgdmFyIHN0ZXBTcGFjZVNjYWxlOiBudW1iZXIgPSBwZXJMZW5ndGggLyBNYXRoLnNxcnQoR2FtZU1vZHVsZS5EZXNpZ2huViAqIEdhbWVNb2R1bGUuRGVzaWdoblYgKyBHYW1lTW9kdWxlLkRlc2lnaG5EICogR2FtZU1vZHVsZS5EZXNpZ2huRCk7XHJcbiAgICAgICAgR2FtZU1vZHVsZS5WU3BhY2UgPSBHYW1lTW9kdWxlLlZTcGFjZSAqIHN0ZXBTcGFjZVNjYWxlO1xyXG4gICAgICAgIEdhbWVNb2R1bGUuRFNwYWNlID0gR2FtZU1vZHVsZS5EU3BhY2UgKiBzdGVwU3BhY2VTY2FsZTtcclxuICAgICAgICB2YXIgc3dpdGNoRmxvb3IgPSBzdGFydEZsb29yIC0gMS41O1xyXG4gICAgICAgIExheWEuVmVjdG9yMy5hZGQoY2FtZXJhUFMsIG5ldyBMYXlhLlZlY3RvcjMoMCwgLUdhbWVNb2R1bGUuVlNwYWNlICogc3dpdGNoRmxvb3IsIEdhbWVNb2R1bGUuRFNwYWNlICogc3dpdGNoRmxvb3IpLCBjYW1lcmFQUyk7XHJcblxyXG4gICAgICAgIHZhciBsaW5lczogTW91bnRMaW5lW10gPSB0aGlzLm1fTW91bnRMaW5lcztcclxuICAgICAgICB0aGlzLm1fSGVhZEZsb29ySWR4ID0gbGluZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICB0aGlzLm1fVGFpbEZMb29ySWR4ID0gMDtcclxuICAgICAgICB0aGlzLm1fcmlnaHRTd2l0Y2hDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaWR4OiBudW1iZXIgPSAwOyBpZHggPCBsaW5lcy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBsaW5lOiBNb3VudExpbmUgPSBsaW5lc1tpZHhdO1xyXG4gICAgICAgICAgICBsaW5lLlNldExpbmUoaWR4LCB0aGlzLkNvdW50TmV4dEZsb29yRGlyU3dpdGgoKSk7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAxKVxyXG4gICAgICAgICAgICAgICAgbGluZXNbaWR4IC0gMV0uU2V0TmV4dEZsb29yKGxpbmUpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ID09IHN0YXJ0Rmxvb3IpIHtcclxuICAgICAgICAgICAgICAgIHZhciBQbGF5ZXJTdGVwID0gbGluZS5HZXRTdGVwKE1hdGguZmxvb3IobGluZS5MZW5ndGggLyAyKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fU3RhcnRQb3NpdGlvbiA9IFBsYXllclN0ZXAucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBQbGF5ZXJTdGVwLklzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9TYWZlTG9jYXRpb24gPSBQbGF5ZXJTdGVwLkxvY2F0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuUHV0SXRlbUluTGluZShpZHgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBzdGFydEZsb29yTnVtOiBudW1iZXIgPSAwOyBzdGFydEZsb29yTnVtIDwgc3RhcnRGbG9vcjsgKytzdGFydEZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIGxpbmVzW3N0YXJ0Rmxvb3JOdW1dLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FtZXJhUFM7XHJcbiAgICB9XHJcbiovXHJcbiAgICBwdWJsaWMgU2V0UGxheWVyKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllciA9IHBsYXllcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQ291bnROZXh0Rmxvb3JEaXJTd2l0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBzd2l0Y2hDb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICBpZiAodGhpcy5tX1BsYXllcikge1xyXG4gICAgICAgICAgICB2YXIgcG9zaXRpb246IExheWEuVmVjdG9yMztcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9QbGF5ZXIuQ3VyU3RlcCAmJiB0aGlzLm1fUGxheWVyLkN1clN0ZXAucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gdGhpcy5tX1BsYXllci5DdXJTdGVwLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSB0aGlzLm1fUGxheWVyLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaENvdW50ID0gKHBvc2l0aW9uLnggLSB0aGlzLm1fU3RhcnRQb3NpdGlvbi54KSAvIChHYW1lTW9kdWxlLkhTcGFjZSAvIDIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3dpdGNoQ291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldE5leHRGbHBwckRpclN3aXRjaChudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50ID0gbnVtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRTYWZlU3RlcCgpOiBTdGVwIHtcclxuICAgICAgICB2YXIgZmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKHRoaXMubV9TYWZlTG9jYXRpb24uWSk7XHJcbiAgICAgICAgaWYgKGZsb29yKVxyXG4gICAgICAgICAgICByZXR1cm4gZmxvb3IuR2V0U3RlcCh0aGlzLm1fU2FmZUxvY2F0aW9uLlgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQnJlYWtMaW5lKGZsb29yOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB2YXIgdGFpbEZsb29yID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGFpbEZsb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGJyZWFrRmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yKTtcclxuICAgICAgICBmb3IgKHZhciBjb3VudEZsb29yOiBudW1iZXIgPSB0YWlsRmxvb3IuRmxvb3JOdW07IGNvdW50Rmxvb3IgPD0gZmxvb3I7ICsrY291bnRGbG9vcikge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGNvdW50Rmxvb3IpO1xyXG4gICAgICAgICAgICBpZiAoIXRhcmdldEZsb29yLmJyZWFrZWQpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldEZsb29yLkJyZWFrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBHZXRUYWlsZUZsb29yKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7lronlhajkvY3nva5cclxuICAgIFNldFNhZmVQUyhsb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb24pIHtcclxuICAgICAgICB0aGlzLm1fU2FmZUxvY2F0aW9uID0gbG9jYXRpb247XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uLlkgPCB0aGlzLlRhaWxGTG9vci5GbG9vck51bSB8fCBsb2NhdGlvbi5ZID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlJlc2V0SXRlbShsb2NhdGlvbi5ZKVxyXG4gICAgfVxyXG5cclxuICAgIC8v5LuO5p+Q5LiA5bGC5byA5aeL5LiA5bGC5bGC6YeN5paw5pGG5pS+6YGT5YW3XHJcbiAgICBSZXNldEl0ZW0oZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgdGhpcy5tX0N1ckxpbmVSZXdhcmRzID0gbmV3IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPigpO1xyXG4gICAgICAgIGZvciAobGV0IGxvb3BGbG9vcjogbnVtYmVyID0gZmxvb3I7IGxvb3BGbG9vciA8PSB0aGlzLkhlYWRGbG9vci5GbG9vck51bTsgKytsb29wRmxvb3IpIHtcclxuICAgICAgICAgICAgdmFyIGZsb29yTGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGxvb3BGbG9vcik7XHJcbiAgICAgICAgICAgIGZsb29yTGluZS5MYXlPdXREaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBmbG9vckxpbmUuU2V0TGluZShmbG9vckxpbmUuRmxvb3JOdW0sIHRoaXMuQ291bnROZXh0Rmxvb3JEaXJTd2l0aCgpKTtcclxuICAgICAgICAgICAgdGhpcy5QdXRJdGVtSW5MaW5lKGxvb3BGbG9vcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5bGC5pWw6I635Y+W5p+Q5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIEdldEZsb29yQnlGbG9vcihmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHRhaWxGbG9vcjogTW91bnRMaW5lID0gdGhpcy5UYWlsRkxvb3I7XHJcbiAgICAgICAgaWYgKGZsb29yIDwgdGFpbEZsb29yLkZsb29yTnVtIHx8IGZsb29yID4gdGhpcy5IZWFkRmxvb3IuRmxvb3JOdW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmbG9vcklEID0gKGZsb29yIC0gdGFpbEZsb29yLkZsb29yTnVtICsgdGhpcy5tX1RhaWxGTG9vcklkeCkgJSB0aGlzLm1fTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9Nb3VudExpbmVzW2Zsb29ySURdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b6q546v6K6+572u5bGC5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0gZmxvb3Ig5bGCXHJcbiAgICAgKiBAcGFyYW0gT3duZXIgXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5b6q546v5omn6KGM5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIExvb3BEb0Zsb29yU3RlcChmbG9vcjogbnVtYmVyLCBPd25lcjogYW55LCBjYWxsQmFjazogKHN0ZXA6IFN0ZXApID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZmxvb3IgPCB0aGlzLlRhaWxGTG9vci5GbG9vck51bSB8fCBmbG9vciA+IHRoaXMuSGVhZEZsb29yLkZsb29yTnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZsb29yTGluZTogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGZsb29yTGluZS5MZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBzdGVwID0gZmxvb3JMaW5lLkdldFN0ZXAoaWR4KTtcclxuICAgICAgICAgICAgY2FsbEJhY2suY2FsbChPd25lciwgc3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pGG5pS+54mp5ZOBXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3Ig54mp5ZOB5YiX6KGoXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBQdXRJdGVtSW5MaW5lKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgc2FmZUNvbDogQXJyYXk8bnVtYmVyPjtcclxuICAgICAgICB2YXIgZmxvb3JMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIC8v5biD572u6L+H5LqG5LiN55So5YaN5biD572u5LqGXHJcbiAgICAgICAgaWYgKGZsb29yTGluZS5MYXlPdXREaXJ0eSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGZsb29yTGluZS5MYXlPdXREaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgdmFyIHNhZmVJZHhDb2xsOiB7IFtrZXk6IG51bWJlcl06IG51bWJlcjsgfSA9IHRoaXMuQ291bnRSb2FkSW5mbyhmbG9vcik7XHJcblxyXG4gICAgICAgIC8v5Ye655Sf54K55LiN5pS+6YGT5YW3XHJcbiAgICAgICAgaWYgKGZsb29yIDwgMSB8fCBmbG9vciA9PSB0aGlzLm1fU2FmZUxvY2F0aW9uLlkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+iOt+WPluivpeihjOimgeaRhuaUvueahOeJqeWTgVxyXG4gICAgICAgIHRoaXMuVGFrZUl0ZW1MaXN0KGZsb29yKVxyXG5cclxuICAgICAgICAvL+aKiumcgOimgeaUvumBk+WFt+eahOagvOWtkOaUvuWFpemaj+acuuaxoFxyXG4gICAgICAgIHZhciBjdXJGbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciByYW5kb21Qb29sOiBBcnJheTxTdGVwPiA9IG5ldyBBcnJheSgpO1xyXG4gICAgICAgIC8v5oqK5a6J5YWo55qE5qC85a2Q5pqC5pe256e75Ye65p2lXHJcbiAgICAgICAgdmFyIHNhZmVTdGVwTGlzdDogQXJyYXk8U3RlcD4gPSBuZXcgQXJyYXk8U3RlcD4oKTtcclxuICAgICAgICBmb3IgKHZhciBzdGVwSWR4OiBudW1iZXIgPSAwOyBzdGVwSWR4IDwgY3VyRmxvb3IuTGVuZ3RoOyArK3N0ZXBJZHgpIHtcclxuICAgICAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSBjdXJGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICBpZiAoc2FmZUlkeENvbGxbc3RlcElkeF0gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnB1c2goZ2V0U3RlcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzYWZlU3RlcExpc3QucHVzaChnZXRTdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aUvumZt+mYsVxyXG4gICAgICAgIHZhciBiYXJyaWVyc0xpc3Q6IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPiA9IHRoaXMubV9DdXJMaW5lQmFycmllcnM7XHJcbiAgICAgICAgdGhpcy5Pcmdpbml6ZVB1dEl0ZW0oYmFycmllcnNMaXN0LCByYW5kb21Qb29sLCB0cnVlKTtcclxuICAgICAgICAvL+aRhuaUvumBk+WFt1xyXG4gICAgICAgIGZvciAodmFyIHNhZmVTdGVwSWR4OiBudW1iZXIgPSAwOyBzYWZlU3RlcElkeCA8IHNhZmVTdGVwTGlzdC5sZW5ndGg7ICsrc2FmZVN0ZXBJZHgpIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9vbC5wdXNoKHNhZmVTdGVwTGlzdFtzYWZlU3RlcElkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmV3YXJkTGlzdCA9IHRoaXMuQ3VyTGluZVJld2FyZHM7XHJcbiAgICAgICAgdGhpcy5Pcmdpbml6ZVB1dEl0ZW0ocmV3YXJkTGlzdCwgcmFuZG9tUG9vbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmkYbmlL7nianlk4FcclxuICAgICAqIEBwYXJhbSB7QXJyYXk8TGluZUl0ZW1JbmZvPn0gaXRlbUxpc3Qg54mp5ZOB5YiX6KGoXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5PFN0ZXA+fSByYW5kb21Qb29sIOWPsOmYtumbhuWQiFxyXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc0RlYWRSb2FkIOaYr+WQpuaYr+atu+i3r1xyXG4gICAgICovXHJcbiAgICBPcmdpbml6ZVB1dEl0ZW0oaXRlbUxpc3Q6IEFycmF5PEl0ZW0uTGluZUl0ZW1JbmZvPiwgcmFuZG9tUG9vbDogQXJyYXk8U3RlcD4sIGlzRGVhZFJvYWQ6IGJvb2xlYW4gPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgZm9yICh2YXIgaXRlbUlkeDogbnVtYmVyID0gMDsgaXRlbUlkeCA8IGl0ZW1MaXN0Lmxlbmd0aDsgKytpdGVtSWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBpbmZvOiBJdGVtLkxpbmVJdGVtSW5mbyA9IGl0ZW1MaXN0W2l0ZW1JZHhdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBkaWZmaWN1bHR5TnVtOiBudW1iZXIgPSAwOyBkaWZmaWN1bHR5TnVtIDwgaW5mby5OdW1iZXI7KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmFuZG9tUG9vbC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL+maj+acuuaKiumanOeijeaUvuWFpeagvOWtkOmHjFxyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmRvbUlkeDogbnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcmFuZG9tUG9vbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXA6IFN0ZXAgPSByYW5kb21Qb29sW3JhbmRvbUlkeF07XHJcbiAgICAgICAgICAgICAgICByYW5kb21Qb29sLnNwbGljZShyYW5kb21JZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgc3RlcC5QdXRJdGVtKGluZm8uVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNEZWFkUm9hZCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAuSXNEZWFkUm9hZCA9IGlzRGVhZFJvYWQ7XHJcbiAgICAgICAgICAgICAgICAtLWluZm8uTnVtYmVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyYW5kb21Qb29sLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtSWR4ID4gMCkge1xyXG4gICAgICAgICAgICBpdGVtTGlzdC5zcGxpY2UoMCwgaXRlbUlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS+6YGT5YW35YmN566X6YCa6Lev5oOF5Ya1XHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIENvdW50Um9hZEluZm8oZmxvb3I6IG51bWJlcik6IHsgW2tleTogbnVtYmVyXTogbnVtYmVyIH0ge1xyXG4gICAgICAgIHZhciBzYWZlTGlzdDogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gICAgICAgIHZhciBzYWZlTWFwOiB7IFtrZXk6IG51bWJlcl06IG51bWJlciB9ID0ge307XHJcbiAgICAgICAgdmFyIHN0ZXBOZWVkUmFuZG9tTGlzdCA9IFtdO1xyXG4gICAgICAgIHZhciBzdGVwTm9kZUNvdW50OiBBcnJheTxudW1iZXI+ID0gW11cclxuICAgICAgICB2YXIgdGhpc0Zsb29yOiBNb3VudExpbmUgPSB0aGlzLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcblxyXG4gICAgICAgIHZhciByb2FkTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHZhciBsYXN0Rmxvb3I6IE1vdW50TGluZSA9IHRoaXMuR2V0Rmxvb3JCeUZsb29yKGZsb29yIC0gMSk7XHJcbiAgICAgICAgaWYgKCFsYXN0Rmxvb3IpXHJcbiAgICAgICAgICAgIHJldHVybiBzYWZlTWFwO1xyXG4gICAgICAgIHZhciBzYWZlSWR4OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGlmIChmbG9vciA9PSB0aGlzLm1fU2FmZUxvY2F0aW9uLlkpIHtcclxuICAgICAgICAgICAgdGhpcy5fUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3IpO1xyXG4gICAgICAgICAgICB2YXIgc2FmZVN0ZXAgPSB0aGlzRmxvb3IuR2V0U3RlcCh0aGlzLm1fU2FmZUxvY2F0aW9uLlgpO1xyXG4gICAgICAgICAgICBzYWZlU3RlcC5Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNhZmVNYXBbdGhpcy5tX1NhZmVMb2NhdGlvbi5YXSA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBzdGVwSWR4OiBudW1iZXIgPSAwOyBzdGVwSWR4IDwgbGFzdEZsb29yLkxlbmd0aDsgKytzdGVwSWR4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IGxhc3RGbG9vci5HZXRTdGVwKHN0ZXBJZHgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0ZXAuSXNEZWFkUm9hZClcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIHZhciBsZWZ0U3RlcDogU3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICAgICAgICAgIHZhciByaWdodFN0ZXA6IFN0ZXAgPSBzdGVwLlJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRJZHg6IG51bWJlciA9IGxlZnRTdGVwID8gbGVmdFN0ZXAuSWR4IDogLTE7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHR0SWR4OiBudW1iZXIgPSByaWdodFN0ZXAgPyByaWdodFN0ZXAuSWR4IDogLTE7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVmdElkeCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcE5vZGVDb3VudFtsZWZ0SWR4XSA9IHN0ZXBOb2RlQ291bnRbbGVmdElkeF0gPyBzdGVwTm9kZUNvdW50W2xlZnRJZHhdIDogMDtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwTm9kZUNvdW50W2xlZnRJZHhdICs9IDE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocmlnaHR0SWR4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwTm9kZUNvdW50W3JpZ2h0dElkeF0gPSBzdGVwTm9kZUNvdW50W3JpZ2h0dElkeF0gPyBzdGVwTm9kZUNvdW50W3JpZ2h0dElkeF0gOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBOb2RlQ291bnRbcmlnaHR0SWR4XSArPSAxO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0dElkeCA+IC0xICYmIGxlZnRJZHggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXBOZWVkUmFuZG9tTGlzdC5wdXNoKFtyaWdodHRJZHgsIGxlZnRJZHhdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNhZmVTdGVwSWR4OiBudW1iZXIgPSBsZWZ0SWR4ID4gMCA/IGxlZnRJZHggOiByaWdodHRJZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhZmVTdGVwSWR4IDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2FmZU1hcFtzYWZlU3RlcElkeF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHNhZmVJZHggKz0gc2FmZVN0ZXBJZHg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgY291bnRJZHg6IG51bWJlciA9IDA7IGNvdW50SWR4IDwgc3RlcE5lZWRSYW5kb21MaXN0Lmxlbmd0aDsgKytjb3VudElkeCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGluZm8gPSBzdGVwTmVlZFJhbmRvbUxpc3RbY291bnRJZHhdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlZnRJZHg6IG51bWJlciA9IGluZm9bMF07XHJcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRJZHg6IG51bWJlciA9IGluZm9bMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNhZmVNYXBbbGVmdElkeF0gJiYgIXNhZmVNYXBbcmlnaHRJZHhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyYW5kID4gMC41KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVNYXBbbGVmdElkeF0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYWZlSWR4ICs9IGxlZnRJZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYWZlTWFwW3JpZ2h0SWR4XSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhZmVJZHggKz0gcmlnaHRJZHg7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGNvdW50U3RlcE5vZGU6IG51bWJlciA9IDA7IGNvdW50U3RlcE5vZGUgPCB0aGlzRmxvb3IuTGVuZ3RoOyArK2NvdW50U3RlcE5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGVwbnVtOiBudW1iZXIgPSBzdGVwTm9kZUNvdW50W2NvdW50U3RlcE5vZGVdO1xyXG4gICAgICAgICAgICAgICAgc3RlcG51bSA9IHN0ZXBudW0gPyBzdGVwbnVtIDogMDtcclxuICAgICAgICAgICAgICAgIGlmIChzdGVwbnVtIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGVwOiBTdGVwID0gbGFzdEZsb29yLkdldFN0ZXAoY291bnRTdGVwTm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc2FmZU1hcDtcclxuICAgIH1cclxuXHJcbiAgICBfUmVzZXRTdGVwSW5mbyh0aGlzRmxvb3I6IE1vdW50TGluZSkge1xyXG4gICAgICAgIGlmICghdGhpc0Zsb29yKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgbG9naWNJZHg6IG51bWJlciA9IDA7IGxvZ2ljSWR4IDwgdGhpc0Zsb29yLkxlbmd0aDsgKytsb2dpY0lkeCkge1xyXG4gICAgICAgICAgICB2YXIgc3RlcDogU3RlcCA9IHRoaXNGbG9vci5HZXRTdGVwKGxvZ2ljSWR4KTtcclxuICAgICAgICAgICAgc3RlcC5Jc0RlYWRSb2FkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmn5DpgZPlhbfkv6Hmga9cclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfWZsb29yIFxyXG4gICAgICovXHJcbiAgICBUYWtlSXRlbUxpc3QoZmxvb3I6IG51bWJlcikge1xyXG4gICAgICAgIHZhciBsaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IoZmxvb3IpO1xyXG4gICAgICAgIHZhciBpdGVtTGlzdCA9IG5ldyBBcnJheShsaW5lLkxlbmd0aCk7XHJcbiAgICAgICAgdmFyIGxpbmVSZXdhcmRzID0gdGhpcy5tX0l0ZW1MYXlvdXQuVGFrZUxpbmVSZXdhcmQoZmxvb3IpO1xyXG4gICAgICAgIHRoaXMubV9DdXJMaW5lUmV3YXJkcyA9IHRoaXMubV9DdXJMaW5lUmV3YXJkcy5jb25jYXQobGluZVJld2FyZHMpO1xyXG4gICAgICAgIGlmICh0aGlzLm1fU2FmZUxvY2F0aW9uLlkgPiBmbG9vciB8fCBmbG9vciA+IHRoaXMubV9TYWZlTG9jYXRpb24uWSArIDEpIHtcclxuICAgICAgICAgICAgdmFyIGxpbmVCYXJyaWVycyA9IHRoaXMubV9JdGVtTGF5b3V0LlRha2VMaW5lRGlmZmljdWx0eShmbG9vcik7XHJcbiAgICAgICAgICAgIHRoaXMubV9DdXJMaW5lQmFycmllcnMgPSB0aGlzLm1fQ3VyTGluZUJhcnJpZXJzLmNvbmNhdChsaW5lQmFycmllcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9DdXJMaW5lQmFycmllcnMubGVuZ3RoID4gMClcclxuICAgICAgICAgICAgICAgIHRoaXMubV9DdXJMaW5lQmFycmllcnMgPSBuZXcgQXJyYXk8SXRlbS5MaW5lSXRlbUluZm8+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5bGC5ZCR5LiK5Y+gXHJcbiAgICBwdWJsaWMgUHVzaEZMb29yKGRpcjogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHZhciBwcmVIZWFkOiBNb3VudExpbmUgPSB0aGlzLkhlYWRGbG9vcjtcclxuICAgICAgICB0aGlzLm1fSGVhZEZsb29ySWR4ID0gKHRoaXMubV9IZWFkRmxvb3JJZHggKyAxKSAlIHRoaXMuTW91bnRMaW5lcy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5tX1RhaWxGTG9vcklkeCA9ICh0aGlzLm1fVGFpbEZMb29ySWR4ICsgMSkgJSB0aGlzLk1vdW50TGluZXMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBIZWFkZmxvb3I6IG51bWJlciA9IHByZUhlYWQuRmxvb3JOdW0gKyAxO1xyXG4gICAgICAgIHRoaXMuQWRkU3dpdGNoKGRpcik7XHJcbiAgICAgICAgdGhpcy5IZWFkRmxvb3IuU2V0TGluZShIZWFkZmxvb3IsIHRoaXMuQ291bnROZXh0Rmxvb3JEaXJTd2l0aCgpKTtcclxuICAgICAgICBwcmVIZWFkLlNldE5leHRGbG9vcih0aGlzLkhlYWRGbG9vcik7XHJcbiAgICAgICAgdGhpcy5QdXRJdGVtSW5MaW5lKEhlYWRmbG9vcik7XHJcblxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBBZGRTd2l0Y2goZGlyOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgaWYgKGRpciA+IDAuMDEpXHJcbiAgICAgICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50ICs9IDE7XHJcbiAgICAgICAgZWxzZSBpZiAoZGlyIDwgLTAuMDEpXHJcbiAgICAgICAgICAgIHRoaXMubV9yaWdodFN3aXRjaENvdW50IC09IDE7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0ZXBJbmZvIHtcclxuICAgIHBhcmVudElEOiBudW1iZXI7XHJcblxyXG59IiwiZXhwb3J0IG1vZHVsZSBHYW1lTW9kdWxlXHJcbntcclxuICAgIGV4cG9ydCBjbGFzcyBFdmVudFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgT25DaGFyYWN0ZXJJdGVtQ2hhbmdlOnN0cmluZyA9IFwiT25DaGFyYWN0ZXJJdGVtQ2hhbmdlXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPblRpbWVQYXVzZTpzdHJpbmcgPSBcIk9uVGltZVBhdXNlXCI7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBPblRpbWVDb250aW51ZTpzdHJpbmcgPSBcIk9uVGltZUNvbnRpbnVlXCI7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgdmFyIEhTcGFjZTpudW1iZXIgPSAzO1xyXG4gICAgZXhwb3J0IHZhciBWU3BhY2U6bnVtYmVyID0gMi41O1xyXG4gICAgZXhwb3J0IHZhciBEU3BhY2U6bnVtYmVyID0gMC42O1xyXG5cclxuICAgIC8vZXhwb3J0IHZhciBEZXNpZ2huVjpudW1iZXIgPSAyLjU7XHJcbiAgICAvL2V4cG9ydCB2YXIgRGVzaWdobkQ6bnVtYmVyID0gMC42O1xyXG59IiwiZXhwb3J0IG1vZHVsZSBHYW1lU3RydWN0XHJcbntcclxuICAgIGV4cG9ydCBjbGFzcyBTZXRJbmZvIHtcclxuICAgICAgICBBdWRpb09uOiBib29sZWFuO1xyXG4gICAgICAgIE9QSXNSaWdodDogYm9vbGVhbjtcclxuICAgICAgICBUZXh0SW5mbzogc3RyaW5nO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICB0aGlzLkF1ZGlvT24gPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLk9QSXNSaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVGV4dEluZm8gPSBcIkhlbGxvIFxcbiBIZWxsb1wiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBNTG9jYXRpb25cclxuICAgIHtcclxuICAgICAgICBnZXQgWCgpOm51bWJlclxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0FyclswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IFgoeDpudW1iZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnJbMF0gPXg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdldCBZKCk6bnVtYmVyXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fQXJyWzFdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXQgWSh5Om51bWJlcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0FyclsxXSA9IHk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgX0FycjpBcnJheTxudW1iZXI+O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCB4Om51bWJlcix5Om51bWJlciApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9BcnIgPSBbeCx5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgdmFyIEl0ZW1EaWN0VHlwZTp7W0l0ZW1UeXBlOm51bWJlcl06YW55fTtcclxuICAgIEl0ZW1EaWN0VHlwZSA9IHsgfTtcclxufSIsIi8qKuS9nOiAhTpNb1xyXG4gKiDovpPlhaXnrqHnkIbnm7jlhbNcclxuICovXHJcbmltcG9ydCBHYW1lU2NlbmVQbGF5IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lUGxheS9HYW1lU2NlbmVQbGF5XCJcclxuZXhwb3J0IG1vZHVsZSBJbnB1dCB7XHJcbiAgICAvL+WfuuehgOi+k+WFpeaOp+WItuWZqFxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VHYW1lSW5wdXQge1xyXG4gICAgICAgIC8v5YWs5pyJXHJcbiAgICAgICAgTmV4dElucHV0OiBCYXNlR2FtZUlucHV0O1xyXG4gICAgICAgIGFic3RyYWN0IElucHV0KGlzUmlnaHQ6IGJvb2xlYW4pO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihpbnB1dDogQmFzZUdhbWVJbnB1dCA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIGlmIChpbnB1dCA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuTmV4dElucHV0ID0gaW5wdXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpICB7IH1cclxuICAgICAgICBDbGVhcigpIHsgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBESVlJbnB1dCBleHRlbmRzIEJhc2VHYW1lSW5wdXQge1xyXG4gICAgICAgIElucHV0KGlzUmlnaHQ6IGJvb2xlYW4pICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9MaXN0ZW5lcilcclxuICAgICAgICAgICAgICAgIHRoaXMuX0xpc3RlbmVyLmNhbGwodGhpcy5fT3duZXIsIGlzUmlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIF9Pd25lcjogYW55O1xyXG4gICAgICAgIHByaXZhdGUgX0xpc3RlbmVyOiAoaXNyaW5nOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKG93bmVyOiBhbnkgPSBudWxsLCBsaXN0ZW5lcjogKGlzcmluZzogYm9vbGVhbikgPT4gdm9pZCA9IG51bGwpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX093bmVyID0gb3duZXI7XHJcbiAgICAgICAgICAgIHRoaXMuX0xpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIE5vcm1HYW1lSW5wdXQgZXh0ZW5kcyBCYXNlR2FtZUlucHV0IHtcclxuICAgICAgICBHYW1lRGlyOiBHYW1lU2NlbmVQbGF5O1xyXG4gICAgICAgIF9EaXJ0eTogYm9vbGVhbjtcclxuICAgICAgICBfSXNSaWdodDogYm9vbGVhbjtcclxuICAgICAgICBjb25zdHJ1Y3RvcihkaXI6IEdhbWVTY2VuZVBsYXksIGlucHV0OiBCYXNlR2FtZUlucHV0ID0gbnVsbCkgIHtcclxuICAgICAgICAgICAgc3VwZXIoaW5wdXQpO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVEaXIgPSBkaXI7XHJcbiAgICAgICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuX0lzUmlnaHQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgSW5wdXQoaXNSaWdodDogYm9vbGVhbikgIHtcclxuICAgICAgICAgICAgLy90aGlzLkdhbWVEaXIuTW92ZVN0ZXAoaXNSaWdodCk7XHJcbiAgICAgICAgICAgIHRoaXMuX0RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fSXNSaWdodCA9IGlzUmlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFVwZGF0ZSgpICB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9EaXJ0eSAmJiB0aGlzLkdhbWVEaXIuUGxheWVyLkJhc2VDdHJsZXIuSXNGYWxsaW5nKSAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fRGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuR2FtZURpci5Nb3ZlU3RlcCh0aGlzLl9Jc1JpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBDbGVhcigpICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0RpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuL0dhbWVNb2R1bGVcIjtcclxudHlwZSBTdGVwSXRlbSA9IEl0ZW0uU3RlcEl0ZW07XHJcbnZhciBTcGFjZTogbnVtYmVyO1xyXG52YXIgRFNwYWNlOiBudW1iZXI7XHJcbi8qKuS9nOiAhTpNb1xyXG4q5Zy65pmv5YaF5a+56LGhIFxyXG4qL1xyXG4vL+euoeeQhuS4gOaVtOihjFxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VudExpbmUgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEIHtcclxuICAgIHByaXZhdGUgbV9SaWdodFN3aXRjaDogbnVtYmVyO1xyXG4gICAgbV9TdGVwTGlzdDogU3RlcFtdO1xyXG5cclxuICAgIExheU91dERpcnR5OiBib29sZWFuO1xyXG4gICAgTGluZUlkeDogbnVtYmVyO1xyXG4gICAgRmxvb3JOdW06IG51bWJlcjtcclxuICAgIFN0ZXBJdGVtOiBTdGVwSXRlbTtcclxuICAgIE9kZFN3aXRjaDogbnVtYmVyO1xyXG4gICAgYnJlYWtlZDpib29sZWFuO1xyXG4gICAgZ2V0IHJpZ2h0U3dpdGNoKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9SaWdodFN3aXRjaDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNldCBQb3NpdGlvbihuZXdQUzogTGF5YS5WZWN0b3IzKSB7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0IFBvc2l0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG4gICAgZ2V0IExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fU3RlcExpc3QubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGxpbmVJZHg6IG51bWJlciwgQ29sdW1iOiBudW1iZXIsIGZsb29yOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgdmFyIGNvbHVtbnM6IG51bWJlciA9IENvbHVtYjtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9SaWdodFN3aXRjaCA9IDA7XHJcbiAgICAgICAgdGhpcy5MaW5lSWR4ID0gbGluZUlkeDtcclxuICAgICAgICB0aGlzLkZsb29yTnVtID0gZmxvb3I7XHJcbiAgICAgICAgdGhpcy5tX1N0ZXBMaXN0ID0gW107XHJcbiAgICAgICAgdmFyIHN0YXJ0WDogbnVtYmVyID0gMDtcclxuICAgICAgICBmb3IgKHZhciBTdGFydElkeDogbnVtYmVyID0gMDsgU3RhcnRJZHggPCBjb2x1bW5zOyArK1N0YXJ0SWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdTdGVwOiBTdGVwID0gbmV3IFN0ZXAodGhpcywgU3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKG5ld1N0ZXApO1xyXG4gICAgICAgICAgICB0aGlzLm1fU3RlcExpc3RbU3RhcnRJZHhdID0gbmV3U3RlcDtcclxuICAgICAgICAgICAgdmFyIHN0ZXBWZWN0b3IgPSBuZXdTdGVwLnBvc2l0aW9uO1xyXG4gICAgICAgICAgICBzdGVwVmVjdG9yLnggPSBzdGFydFg7XHJcbiAgICAgICAgICAgIHN0YXJ0WCArPSBHYW1lTW9kdWxlLkhTcGFjZTtcclxuICAgICAgICAgICAgbmV3U3RlcC50cmFuc2Zvcm0ucG9zaXRpb24gPSBzdGVwVmVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+iuvuiOt+WPluaYvuekuuWHuuadpeeahOesrOWHoOS4quW5s+WPsFxyXG4gICAgR2V0U3RlcChpZHg6IG51bWJlcik6IFN0ZXAge1xyXG4gICAgICAgIGlmIChpZHggPCAwIHx8IGlkeCA+PSB0aGlzLm1fU3RlcExpc3QubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1N0ZXBMaXN0W2lkeF07XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7mr4/lsYJcclxuICAgIFNldExpbmUoZmxvb3I6IG51bWJlciwgcmlnaHRTd2l0Y2g6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYnJlYWtlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV9SaWdodFN3aXRjaCA9IHJpZ2h0U3dpdGNoO1xyXG4gICAgICAgIHRoaXMuT2RkU3dpdGNoID0gMDtcclxuICAgICAgICB0aGlzLkxheU91dERpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuRmxvb3JOdW0gPSBmbG9vcjtcclxuICAgICAgICB2YXIgbmV3UFMgPSB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICBuZXdQUy55ID0gR2FtZU1vZHVsZS5WU3BhY2UgKiBmbG9vcjtcclxuICAgICAgICBuZXdQUy56ID0gLUdhbWVNb2R1bGUuRFNwYWNlICogZmxvb3I7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXdQUztcclxuICAgICAgICBmb3IgKHZhciBzdGFydElkeDogbnVtYmVyID0gMDsgc3RhcnRJZHggPCB0aGlzLm1fU3RlcExpc3QubGVuZ3RoOyArK3N0YXJ0SWR4KSB7XHJcbiAgICAgICAgICAgIHZhciB0aGlTdGVwID0gdGhpcy5HZXRTdGVwKHN0YXJ0SWR4KTtcclxuICAgICAgICAgICAgdGhpU3RlcC5SZXNldFN0ZXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/liKTmlq3mmK/lkKbmlLbnvKnnmoTpgqPlsYJcclxuICAgIEp1Z0lzT2RkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkZsb29yTnVtICUgMiAhPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bCG5q+P5Liq6IqC54K56ZO+5o6l5Yiw5LiL5LiA5bGCXHJcbiAgICBTZXROZXh0Rmxvb3IobGFzdEZsb29yOiBNb3VudExpbmUpOiB2b2lkIHtcclxuICAgICAgICB2YXIgZGlzdGFuY2U6IG51bWJlciA9IE1hdGguY2VpbChsYXN0Rmxvb3IucmlnaHRTd2l0Y2ggLyAyKSAtIE1hdGguY2VpbCh0aGlzLnJpZ2h0U3dpdGNoIC8gMik7XHJcbiAgICAgICAgdmFyIG9kZFN3aXRjaDogbnVtYmVyID0gMDtcclxuICAgICAgICB2YXIgcG9zaXRpb246IExheWEuVmVjdG9yMyA9IGxhc3RGbG9vci5Qb3NpdGlvbjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuSnVnSXNPZGQoKSkge1xyXG4gICAgICAgICAgICBvZGRTd2l0Y2ggPSAtMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBvZGRTd2l0Y2ggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwb3NpdGlvbi54ID0gTWF0aC5jZWlsKGxhc3RGbG9vci5yaWdodFN3aXRjaCAvIDIpICogR2FtZU1vZHVsZS5IU3BhY2UgKyBvZGRTd2l0Y2ggKiBHYW1lTW9kdWxlLkhTcGFjZSAvIDI7XHJcbiAgICAgICAgbGFzdEZsb29yLk9kZFN3aXRjaCA9IG9kZFN3aXRjaFxyXG4gICAgICAgIGxhc3RGbG9vci5Qb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5pyJ5Lik5aS056uv54K5XHJcbiAgICAgICAgZm9yICh2YXIgc3RhcnRJZHg6IG51bWJlciA9IDA7IHN0YXJ0SWR4IDwgdGhpcy5tX1N0ZXBMaXN0Lmxlbmd0aDsgKytzdGFydElkeCkge1xyXG4gICAgICAgICAgICB2YXIgbGVmdFBhcmVudDogU3RlcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciByaWdodFBhcmVudDogU3RlcCA9IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBsZWZ0UGFyZW50SWR4OiBudW1iZXIgPSBzdGFydElkeCAtIGRpc3RhbmNlIC0gKDEgKyBvZGRTd2l0Y2gpO1xyXG5cclxuICAgICAgICAgICAgbGVmdFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKGxlZnRQYXJlbnRJZHgpO1xyXG4gICAgICAgICAgICByaWdodFBhcmVudCA9IGxhc3RGbG9vci5HZXRTdGVwKGxlZnRQYXJlbnRJZHggKyAxKTtcclxuICAgICAgICAgICAgdmFyIHRoaVN0ZXAgPSB0aGlzLkdldFN0ZXAoc3RhcnRJZHgpO1xyXG4gICAgICAgICAgICB0aGlTdGVwLkxlZnRQYXJlbnQgPSBsZWZ0UGFyZW50O1xyXG4gICAgICAgICAgICBsZWZ0UGFyZW50ICYmIChsZWZ0UGFyZW50LlJpZ2h0Q2hpbGQgPSB0aGlTdGVwKTtcclxuICAgICAgICAgICAgdGhpU3RlcC5SaWdodFBhcmVudCA9IHJpZ2h0UGFyZW50O1xyXG4gICAgICAgICAgICByaWdodFBhcmVudCAmJiAocmlnaHRQYXJlbnQuTGVmdENoaWxkID0gdGhpU3RlcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v5pWy56KO5LiA5bGCXHJcbiAgICBCcmVhaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJyZWFrZWQgPSB0cnVlO1xyXG4gICAgICAgIHZhciBzdGVwTGlzdDogQXJyYXk8U3RlcD4gPSB0aGlzLm1fU3RlcExpc3Q7XHJcbiAgICAgICAgZm9yICh2YXIgaWR4OiBudW1iZXIgPSAwOyBpZHggPCBzdGVwTGlzdC5sZW5ndGg7ICsraWR4KSAge1xyXG4gICAgICAgICAgICB2YXIgdGhpc1N0ZXA6U3RlcCA9IHN0ZXBMaXN0W2lkeF07XHJcbiAgICAgICAgICAgIHRoaXNTdGVwLkJyZWFrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDb250aW51ZSgpIHtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgUGF1c2UoKSB7XHJcblxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2V0ZWQ6IGJvb2xlYW47XHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBQbGF5ZXJDb250cm9sZXIgfSBmcm9tIFwiLi9QbGF5ZXJDdHJsZXJcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBTdGVwIGZyb20gXCIuL1N0ZXBcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgeyBDaGFyYWN0ZXIgfSBmcm9tIFwiLi9DaGFyYWN0ZXJcIlxyXG5pbXBvcnQgR2FtZUFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUFQUFwiXHJcbmltcG9ydCBDaGFyYWN0ZXJNYW5hZ2VyIGZyb20gXCIuLi9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyXCI7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi9HYW1lTW9kdWxlXCI7XHJcbmltcG9ydCBDaGFyYWN0b3JBbmltYXRvciBmcm9tIFwiLi9DaGFyYWN0ZXJBbmltYXRvclwiO1xyXG52YXIgbnVtOiBudW1iZXIgPSAwO1xyXG4vL+ivpeiEmuacrOeUqOS6jua4uOaIj+eOqeWutuWvueixoeeuoeeQhlxyXG4vL+eOqeWutuWvueixoVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIgZXh0ZW5kcyBMYXlhLlNwcml0ZTNEIHtcclxuICAgIC8v56eB5pyJ5bGe5oCnXHJcbiAgICBwcml2YXRlIG1fSWR4OiBudW1iZXI7XHJcbiAgICBtX0xvZ2ljUG9zaXRpb246IExheWEuVmVjdG9yMztcclxuICAgIHByaXZhdGUgX0J1ZmZOb2RlOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBtX1BsYXllck1vZGVsOiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBfQ3VyU3RlcDogU3RlcDtcclxuICAgIHByaXZhdGUgX0N0cmxlcjogUGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXI7XHJcbiAgICBwcml2YXRlIG1fQW5pbWF0b3I6IExheWEuQW5pbWF0b3I7XHJcbiAgICBwcml2YXRlIG1fUGxheWVyQ2hhcmFjdGVyOiBQbGF5ZXJBbmltYXRvcjtcclxuICAgIHByaXZhdGUgbV9CdWZmTW9kZWw6IHsgW25hbWU6IG51bWJlcl06IExheWEuU3ByaXRlM0QgfVxyXG4gICAgcHJpdmF0ZSBtX1N0YXRlTWFwOiB7fVxyXG4gICAgcHJpdmF0ZSBtX1BhcmVudDogTGF5YS5TcHJpdGUzRDtcclxuXHJcbiAgICBwdWJsaWMgQmFzZUN0cmxlcjogUGxheWVyQ29udHJvbGVyLlBsYXllck5vcm1DdHJsZXI7XHJcbiAgICBwdWJsaWMgQnVmZkFycjogQXJyYXk8SXRlbS5CYXNlUGxheWVyQnVmZj47XHJcbiAgICBwdWJsaWMgSWROdW1iZXI6IG51bWJlcjtcclxuICAgIHB1YmxpYyBQbGF5ZXJEZWF0aDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBMb2NrZWQ6Ym9vbGVhbjtcclxuXHJcbiAgICBzZXQgQ3VyU3RlcChzdGVwOiBTdGVwKSB7XHJcbiAgICAgICAgdGhpcy5fQ3VyU3RlcCA9IHN0ZXA7XHJcbiAgICB9XHJcbiAgICBnZXQgQ3VyU3RlcCgpOiBTdGVwIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fQ3VyU3RlcDtcclxuICAgIH1cclxuICAgIHNldCBQb3NpdGlvbihuZXdQUzogTGF5YS5WZWN0b3IzKSB7XHJcbiAgICAgICAgdmFyIG5ld1BTOiBMYXlhLlZlY3RvcjMgPSBuZXdQUy5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMubV9QYXJlbnQudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICB9XHJcbiAgICBnZXQgUG9zaXRpb24oKTogTGF5YS5WZWN0b3IzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1BhcmVudC50cmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBMb2dpY1Bvc2l0aW9uKCk6IExheWEuVmVjdG9yMyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9Mb2dpY1Bvc2l0aW9uO1xyXG4gICAgfVxyXG4gICAgZ2V0IHBsYXllck1vZGVsKCk6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fUGxheWVyTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm5hbWUgPSBcIlBsYXllclwiO1xyXG4gICAgICAgIHRoaXMubV9CdWZmTW9kZWwgPSB7fTtcclxuICAgICAgICB0aGlzLm1fUGFyZW50ID0gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuICAgICAgICB0aGlzLm1fUGFyZW50Lm5hbWUgPSBcIlBsYXllclBhcmVudFwiO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMubV9QYXJlbnQpO1xyXG4gICAgICAgIHRoaXMubV9QYXJlbnQuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcbiAgICAgICAgdGhpcy50cmFuc2Zvcm0ucm90YXRpb24gPSBuZXcgTGF5YS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgLy/mt7vliqDoh6rlrprkuYnmqKHlnotcclxuICAgICAgICB0aGlzLm1fUGFyZW50Lm9uKExheWEuRXZlbnQuUkVNT1ZFRCwgdGhpcywgKCkgPT4geyB0aGlzLmRlc3Ryb3koKSB9KVxyXG4gICAgICAgIHZhciBtZ3I6IENoYXJhY3Rlck1hbmFnZXIgPSBHYW1lQVBQLkNoYXJhY3Rlck1ncjtcclxuICAgICAgICB0aGlzLm1fSWR4ID0gbnVtO1xyXG4gICAgICAgICsrbnVtXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgUGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5jbGVhclRpbWVyKHRoaXMsIHRoaXMuX1VwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yLnNwZWVkID0gMDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBDb250aW51ZSgpIHtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLCB0aGlzLCB0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5zcGVlZCA9IDE7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1fSGVhZE5vZGU6IExheWEuU3ByaXRlM0Q7XHJcblxyXG4gICAgcHJpdmF0ZSBJbml0QlVmZk1vZGVsKHBsYXllck1vZGVsOiBMYXlhLlNwcml0ZTNEKSB7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllck1vZGVsID0gcGxheWVyTW9kZWw7XHJcbiAgICAgICAgdmFyIHNjYWxlOkxheWEuVmVjdG9yMyA9IHRoaXMubV9QbGF5ZXJNb2RlbC50cmFuc2Zvcm0uc2NhbGU7XHJcbiAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKHNjYWxlLDEuMixzY2FsZSk7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllck1vZGVsLnRyYW5zZm9ybS5zY2FsZSA9IHNjYWxlO1xyXG5cclxuICAgICAgICB0aGlzLm1fSGVhZE5vZGUgPSBuZXcgTGF5YS5TcHJpdGUzRCgpO1xyXG4gICAgICAgIHZhciBIZWFkTm9kZTogTGF5YS5TcHJpdGUzRCA9IHBsYXllck1vZGVsLmdldENoaWxkQnlOYW1lKFwiaGVhZFwiKSBhcyBMYXlhLlNwcml0ZTNEO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5tX0hlYWROb2RlKTtcclxuICAgICAgICB0aGlzLm1fSGVhZE5vZGUudHJhbnNmb3JtLnBvc2l0aW9uID0gSGVhZE5vZGUudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgdGhpcy5tX0hlYWROb2RlLnRyYW5zZm9ybS5yb3RhdGlvbiA9IEhlYWROb2RlLnRyYW5zZm9ybS5yb3RhdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMubV9IZWFkTm9kZS50cmFuc2Zvcm0uc2NhbGUgPSBIZWFkTm9kZS50cmFuc2Zvcm0uc2NhbGUuY2xvbmUoKTtcclxuICAgICAgICB0aGlzLlNldE1vZGVsKFwiaXRlbV9mbHllcl8wMVwiLCBcIlJfaGFuZFwiLCBwbGF5ZXJNb2RlbCwgSXRlbS5JdGVtVHlwZS5GbHkpO1xyXG4gICAgICAgIHRoaXMuU2V0TW9kZWwoXCJpdGVtX3NoaWVsZF8wMVwiLCBcImhlYWRcIiwgcGxheWVyTW9kZWwsIEl0ZW0uSXRlbVR5cGUuUHJvdGVjdCk7XHJcbiAgICAgICAgdGhpcy5TZXRNb2RlbChcIml0ZW1fdW50b3VjaGFibGVfMDFcIiwgXCJoZWFkXCIsIHBsYXllck1vZGVsLCBJdGVtLkl0ZW1UeXBlLkhvbHlQcm90ZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFNldE1vZGVsKHJlc291cmNlTmFtZTogc3RyaW5nLCBub2RlTmFtZTogc3RyaW5nLCBwbGF5ZXJNb2RlbDogTGF5YS5TcHJpdGUzRCwgaXRlbVR5cGU6IEl0ZW0uSXRlbVR5cGUpIHtcclxuICAgICAgICB2YXIgbW9kZWw6IExheWEuU3ByaXRlM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXRMSChyZXNvdXJjZU5hbWUpKTtcclxuICAgICAgICB2YXIgYnVmZk1vZGVsOiBMYXlhLlNwcml0ZTNEID0gbW9kZWwuY2xvbmUoKTtcclxuXHJcbiAgICAgICAgcGxheWVyTW9kZWwuZ2V0Q2hpbGRBdCgwKS5hZGRDaGlsZChidWZmTW9kZWwpO1xyXG4gICAgICAgIHN3aXRjaCAobm9kZU5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImhlYWRcIjpcclxuICAgICAgICAgICAgICAgIHRoaXMubV9IZWFkTm9kZS5hZGRDaGlsZChidWZmTW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IubGlua1Nwcml0ZTNEVG9BdmF0YXJOb2RlKG5vZGVOYW1lLCBidWZmTW9kZWwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBidWZmTW9kZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5tX0J1ZmZNb2RlbFtpdGVtVHlwZV0gPSBidWZmTW9kZWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEZhY2VNb2RlbFRvKHJvdGF0aW9uOiBMYXlhLlF1YXRlcm5pb24pIHtcclxuICAgICAgICB0aGlzLm1fUGxheWVyTW9kZWwudHJhbnNmb3JtLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgTW9kZWxSb3RhdGVFdWxhcih2ZWN0b3I6IExheWEuVmVjdG9yMykge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJNb2RlbC50cmFuc2Zvcm0ucm90YXRpb25FdWxlciA9IHZlY3RvcjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2V0UGxheWVyTW9kZWwobW9kZWw6IExheWEuU3ByaXRlM0QpIHtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKG1vZGVsKTtcclxuICAgICAgICB0aGlzLm1fUGFyZW50LnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMygwLCAxODAsIDApLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvciA9IG1vZGVsLmdldENoaWxkQXQoMCkuZ2V0Q29tcG9uZW50KExheWEuQW5pbWF0b3IpO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXJDaGFyYWN0ZXIgPSBuZXcgUGxheWVyQW5pbWF0b3IodGhpcy5tX0FuaW1hdG9yLCB0aGlzKTtcclxuICAgICAgICB0aGlzLm1fUGxheWVyQ2hhcmFjdGVyLkluaXQoKTtcclxuXHJcbiAgICAgICAgdmFyIGxheWVyOiBMYXlhLk1hcExheWVyID0gdGhpcy5tX0FuaW1hdG9yLmdldENvbnRyb2xsZXJMYXllcigpLl9zdGF0ZXNNYXA7XHJcbiAgICAgICAgdGhpcy5tX1N0YXRlTWFwID0ge307XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGxheWVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubV9TdGF0ZU1hcFtrZXldID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Jbml0QlVmZk1vZGVsKG1vZGVsKTtcclxuICAgIH1cclxuXHJcbiAgICBSZXNldCgpIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLl9CdWZmTm9kZSlcclxuICAgICAgICAgICAgdGhpcy5fQnVmZk5vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX0J1ZmZOb2RlID0gbmV3IExheWEuU3ByaXRlM0QoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX0J1ZmZOb2RlKTtcclxuICAgICAgICB0aGlzLkJ1ZmZBcnIgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICB0aGlzLkJhc2VDdHJsZXIgPSBuZXcgUGxheWVyQ29udHJvbGVyLlBsYXllck5vcm1DdHJsZXIodGhpcyk7XHJcbiAgICAgICAgdGhpcy5fQ3RybGVyID0gdGhpcy5CYXNlQ3RybGVyO1xyXG4gICAgICAgIHRoaXMubV9Mb2dpY1Bvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygwLCAwKTtcclxuICAgICAgICB0aGlzLmZyYW1lTG9vcCgxLCB0aGlzLCB0aGlzLl9VcGRhdGUpO1xyXG4gICAgICAgIHZhciBkZWZhdWx0QW5pbVN0YXRlOiBMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLm1fQW5pbWF0b3IuZ2V0RGVmYXVsdFN0YXRlKCk7XHJcbiAgICAgICAgdmFyIHN0YXRlTmFtZTogc3RyaW5nID0gZGVmYXVsdEFuaW1TdGF0ZS5uYW1lO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KHN0YXRlTmFtZSk7XHJcbiAgICAgICAgdGhpcy5Mb2NrZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlueOqeWutkJVRkZcclxuICAgICAqIEBwYXJhbSBpZHgg5qe95L2N5qOA5p+lXHJcbiAgICAgKiBAcmV0dXJucyDnqbrooajnpLrmsqHmnIlcclxuICAgICAqL1xyXG4gICAgR2V0QnVmZihpZHg6IG51bWJlcik6IEl0ZW0uQmFzZVBsYXllckJ1ZmYge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5CdWZmQXJyW2lkeF0gIT0gbnVsbCAmJiB0aGlzLkJ1ZmZBcnJbaWR4XSAhPSB1bmRlZmluZWQpID8gdGhpcy5CdWZmQXJyW2lkeF0gOiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75YqgQlVGRlxyXG4gICAgICogQHBhcmFtIGJ1ZmYgXHJcbiAgICAgKi9cclxuICAgIEFkZEJ1ZmYoYnVmZjogSXRlbS5CYXNlUGxheWVyQnVmZik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBzbG90OiBudW1iZXIgPSBidWZmLlNsb3Q7XHJcbiAgICAgICAgaWYgKHRoaXMuQnVmZkFycltzbG90XSkge1xyXG4gICAgICAgICAgICB0aGlzLkNvbXBsZXRlQnVmZihzbG90KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBidWZmTW9kZWw6IExheWEuU3ByaXRlM0QgPSB0aGlzLm1fQnVmZk1vZGVsW2J1ZmYuVHlwZV07XHJcbiAgICAgICAgaWYgKGJ1ZmZNb2RlbCkge1xyXG4gICAgICAgICAgICBidWZmTW9kZWwuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuQnVmZkFycltzbG90XSA9IGJ1ZmY7XHJcbiAgICAgICAgYnVmZi5TdGFydCgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT5p2fQlVGRlxyXG4gICAgICovXHJcbiAgICBDb21wbGV0ZUJ1ZmYoc2xvdDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGJ1ZmY6IEl0ZW0uQmFzZVBsYXllckJ1ZmYgPSB0aGlzLkJ1ZmZBcnJbc2xvdF07XHJcbiAgICAgICAgdmFyIGJ1ZmZNb2RlbDogTGF5YS5TcHJpdGUzRCA9IHRoaXMubV9CdWZmTW9kZWxbYnVmZi5UeXBlXTtcclxuICAgICAgICBpZiAoYnVmZk1vZGVsKSBidWZmTW9kZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5CdWZmQXJyW3Nsb3RdID0gbnVsbDtcclxuICAgICAgICBpZiAoYnVmZiA9PSBudWxsIHx8IGJ1ZmYgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnVmZi5SZW1vdmVkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mkYbmlL7op5LoibJcclxuICAgIFNldFN0ZXAocHV0U3RlcDogU3RlcCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuQ3VyU3RlcCA9IHB1dFN0ZXA7XHJcbiAgICAgICAgdmFyIG5ld1BTID0gcHV0U3RlcC5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgICAgIG5ld1BTLnkgKz0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICB0aGlzLlBvc2l0aW9uID0gbmV3UFM7XHJcbiAgICAgICAgdGhpcy5tX0xvZ2ljUG9zaXRpb24gPSBwdXRTdGVwLnBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uU3RhbmQpKTtcclxuICAgICAgICBpZiAoKHRoaXMuQ3VyU3RlcC5TdGVwSXRlbS5JdGVtVHlwZSA9PSBJdGVtLkl0ZW1UeXBlLk5vbmUpICYmICh0aGlzLkN1clN0ZXAuSXNFbXB0eSB8fCAodGhpcy5DdXJTdGVwLkxlZnRQYXJlbnQgJiYgdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50ICYmIHRoaXMuQ3VyU3RlcC5MZWZ0UGFyZW50LlN0ZXBJdGVtLklzRm9yYmlkZW4gJiYgdGhpcy5DdXJTdGVwLlJpZ2h0UGFyZW50LlN0ZXBJdGVtLklzRm9yYmlkZW4pKSkge1xyXG4gICAgICAgICAgICB0aGlzLkZhbGxEb3duSW1kKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwLlN0YW5kT25Hcm91bmQodGhpcylcclxuICAgICAgICB0aGlzLlRvdWNoR3JvdW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDluIPlsYDlvZPliY3lsYLkvYbkuI3np7vliqhcclxuICAgICAqIEBwYXJhbSB7U3RlcH0gc3RlcCDkuIvkuIDmraXlj7DpmLZcclxuICAgICAqL1xyXG4gICAgTGF5U3RlcChzdGVwOiBTdGVwKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5DdXJTdGVwID0gc3RlcDtcclxuICAgICAgICB0aGlzLm1fTG9naWNQb3NpdGlvbiA9IHN0ZXAucG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgU3RhcnRNb3ZlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uSnVtcCkpO1xyXG4gICAgICAgIHRoaXMuQmFzZUN0cmxlci5TdGFydE1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBKdW1wRG93bigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShDaGFyYWN0ZXIuUGxheWVyQW5pbU5hbWUoQ2hhcmFjdGVyLkFuaW1FbnVtLkp1bXBkb3duKSk7XHJcbiAgICB9XHJcblxyXG4gICAgRmx5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uRmx5KSk7XHJcbiAgICB9XHJcbiAgICBEaWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5Mb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KFwiZGllXCIpO1xyXG4gICAgfVxyXG4gICAgRmFsbERvd24oKTogdm9pZCAge1xyXG4gICAgICAgIHRoaXMuTG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLlJlc2V0UGFyZW5ldCgpO1xyXG4gICAgICAgIHRoaXMubV9BbmltYXRvci5wbGF5KENoYXJhY3Rlci5QbGF5ZXJBbmltTmFtZShDaGFyYWN0ZXIuQW5pbUVudW0uRmFsbCkpO1xyXG4gICAgfVxyXG4gICAgRmFsbERvd25JbWQoKTogdm9pZCAge1xyXG4gICAgICAgIHRoaXMuTG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShcImZhbGxEb3duSW1kXCIpXHJcbiAgICB9XHJcblxyXG4gICAgLy/op6blj5Hlj7DpmLZcclxuICAgIFRvdWNoR3JvdW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLlBsYXllckRlYXRoIHx8ICF0aGlzLkN1clN0ZXApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkN1clN0ZXAuVG91Y2hHcm91bmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnp7vliqhcclxuICAgICAqIEBwYXJhbSB7TGF5YS5WZWN0b3IzfSB2ZWN0b3Ig56e75Yqo5ZCR6YeP5YC8XHJcbiAgICAgKi9cclxuICAgIFRyYW5zbGF0ZSh2ZWN0b3I6IExheWEuVmVjdG9yMyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubV9QYXJlbnQudHJhbnNmb3JtLnRyYW5zbGF0ZSh2ZWN0b3IsIGZhbHNlKTtcclxuICAgICAgICBMYXlhLlZlY3RvcjMuYWRkKHRoaXMubV9Mb2dpY1Bvc2l0aW9uLCB2ZWN0b3IsIHRoaXMubV9Mb2dpY1Bvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOeOqeWutuaOp+WItuWZqFxyXG4gICAgICogQHBhcmFtIG5ld0N0cmxlciDmlrDnjqnlrrbmjqfliLblmahcclxuICAgICAqL1xyXG4gICAgQWRkQ3RybGVyKG5ld0N0cmxlcjogUGxheWVyQ29udHJvbGVyLkJhc2VQbGF5ZXJDdHJsZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fQ3RybGVyKVxyXG4gICAgICAgICAgICB0aGlzLl9DdHJsZXIuT25Db21wbGV0ZSgpO1xyXG4gICAgICAgIHZhciBjdHJsZXI6IFBsYXllckNvbnRyb2xlci5CYXNlUGxheWVyQ3RybGVyID0gdGhpcy5fQ3RybGVyO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IG5ld0N0cmxlcjtcclxuICAgICAgICBuZXdDdHJsZXIuTmV4dEN0cmwgPSBjdHJsZXI7XHJcbiAgICAgICAgbmV3Q3RybGVyLlNldFBsYXllcih0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5fQ3RybGVyKVxyXG4gICAgICAgICAgICB0aGlzLl9DdHJsZXIuT25TdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog56e75Lqk5o6n5Yi25ZmoXHJcbiAgICAgKi9cclxuICAgIFBvcEN0cmxlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fQ3RybGVyKVxyXG4gICAgICAgICAgICB0aGlzLl9DdHJsZXIuT25Db21wbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuX0N0cmxlciA9IHRoaXMuX0N0cmxlci5OZXh0Q3RybDtcclxuICAgICAgICBpZiAodGhpcy5fQ3RybGVyKVxyXG4gICAgICAgICAgICB0aGlzLl9DdHJsZXIuT25TdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIF9VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyRGVhdGgpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0aGlzLl9DdHJsZXIuVXBkYXRlKCk7XHJcbiAgICAgICAgZm9yICh2YXIgYnVmZklkeDogbnVtYmVyID0gMDsgYnVmZklkeCA8IDI7ICsrYnVmZklkeCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5CdWZmQXJyW2J1ZmZJZHhdICE9IG51bGwgfHwgdGhpcy5CdWZmQXJyW2J1ZmZJZHhdICE9IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIHRoaXMuQnVmZkFycltidWZmSWR4XS5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgRmx5UHJlcGFyZSgpIHtcclxuICAgICAgICB0aGlzLkN1clN0ZXAgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIFJlc2V0UGFyZW5ldCgpICB7XHJcbiAgICAgICAgdGhpcy5tX1BhcmVudC5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIC8vdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gPSB0aGlzLm1fUGFyZW50LnRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTdGVwRGF0YSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG4gICAgR2V0RGF0YShzdGVwOiBTdGVwKSB7XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBQbGF5ZXJBbmltYXRvciBleHRlbmRzIENoYXJhY3RvckFuaW1hdG9yIHtcclxuICAgIHByaXZhdGUgbV9QbGF5ZXI6IFBsYXllclxyXG4gICAgY29uc3RydWN0b3IoYW5pbWF0b3I6IExheWEuQW5pbWF0b3IsIHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgc3VwZXIoYW5pbWF0b3IpO1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICB9XHJcbiAgICBJbml0KCkgIHtcclxuICAgICAgICB2YXIgZmFsbFN0YXRlOiBMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLkdldFN0YXRlKFwiZmFsbERvd25cIik7XHJcbiAgICAgICAgdmFyIGZhbGxTY3JpcHQ6IExheWEuQW5pbWF0b3JTdGF0ZVNjcmlwdCA9IGZhbGxTdGF0ZS5hZGRTY3JpcHQoTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0KTtcclxuICAgICAgICBmYWxsU2NyaXB0Lm9uU3RhdGVFeGl0ID0gKCkgPT4geyBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShNZXNzYWdlTUQuR2FtZUV2ZW50LlBsYXllckRlYXRoKTsgfVxyXG5cclxuICAgICAgICB2YXIgZmFsbERvd25JbWRTdGF0ZTogTGF5YS5BbmltYXRvclN0YXRlID0gdGhpcy5HZXRTdGF0ZShcImZhbGxEb3duSW1kXCIpO1xyXG4gICAgICAgIHZhciBmYWxsRG93bkltZFNjcmlwdDogTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0ID0gZmFsbERvd25JbWRTdGF0ZS5hZGRTY3JpcHQoTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0KTtcclxuICAgICAgICB2YXIgcGxheWVyOlBsYXllciA9IHRoaXMubV9QbGF5ZXI7XHJcbiAgICAgICAgZmFsbERvd25JbWRTY3JpcHQub25TdGF0ZUV4aXQgPSAoKSA9PiB7IEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpOyB9XHJcblxyXG4gICAgICAgIHZhciBkaWVTdGF0ZTpMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLkdldFN0YXRlKFwiZGllXCIpO1xyXG4gICAgICAgIHZhciBkaWVTY3JpcHQ6IExheWEuQW5pbWF0b3JTdGF0ZVNjcmlwdCA9IGRpZVN0YXRlLmFkZFNjcmlwdChMYXlhLkFuaW1hdG9yU3RhdGVTY3JpcHQpO1xyXG4gICAgICAgIGRpZVNjcmlwdC5vblN0YXRlRXhpdCA9ICgpID0+IHsgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgIH0sIDEwMDApIH1cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRmFsbFN0YXRlU2NyaXB0IGV4dGVuZHMgTGF5YS5BbmltYXRvclN0YXRlU2NyaXB0IHtcclxuICAgIHByaXZhdGUgbV9QbGF5ZXI6IFBsYXllcjtcclxuICAgIHByaXZhdGUgbV9Db3VudFRpbWU6IG51bWJlclxyXG4gICAgcHJpdmF0ZSBtX1lpZWxkVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1lpZWxkQ2FsbEJhY2s7XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIEluaXQocGxheWVyOiBQbGF5ZXIpICB7XHJcbiAgICAgICAgdGhpcy5tX1BsYXllciA9IHRoaXMubV9QbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VGltZSA9IDA7XHJcbiAgICAgICAgdGhpcy5tX1lpZWxkVGltZSA9IDM7XHJcbiAgICB9XHJcbiAgICBvblN0YXRlRW50ZXIoKSAge1xyXG4gICAgICAgIHRoaXMubV9QbGF5ZXIuTG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAvL3RoaXMubV9Db3VudFRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyB0aGlzLm1fWWllbGRUaW1lO1xyXG4gICAgICAgIHRoaXMubV9ZaWVsZENhbGxCYWNrID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG5cclxuICAgIH1cclxuICAgIG9uU3RhdGVFeGl0KCkgIHtcclxuICAgICAgICBpZiAodGhpcy5tX1lpZWxkQ2FsbEJhY2spXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm1fWWllbGRDYWxsQmFjayk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9QbGF5ZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgeyBHYW1lU3RydWN0IH0gZnJvbSBcIi4vR2FtZVN0cnVjdFwiO1xyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuL0dhbWVNb2R1bGVcIjtcclxuZXhwb3J0IG1vZHVsZSBQbGF5ZXJDb250cm9sZXIge1xyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VQbGF5ZXJDdHJsZXIge1xyXG4gICAgICAgIC8v5YWs5YWx5o6l5Y+jXHJcbiAgICAgICAgTmV4dEN0cmw6IEJhc2VQbGF5ZXJDdHJsZXI7XHJcbiAgICAgICAgcGxheWVyOiBQbGF5ZXI7XHJcblxyXG4gICAgICAgIFVwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5fVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFNldFBsYXllcihwbGF5ZXI6IFBsYXllcik6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHBsYXllcjogUGxheWVyLCBjdHJsZXI6IEJhc2VQbGF5ZXJDdHJsZXIgPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChjdHJsZXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY3RybGVyID0gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLk5leHRDdHJsID0gY3RybGVyO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIGFic3RyYWN0IF9VcGRhdGUoKTogdm9pZDtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgT25TdGFydCgpOiB2b2lkO1xyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBPbkNvbXBsZXRlKCk6IHZvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlKjkuo7op5LoibLmraPluLjnirbmgIHkuIvnmoTnp7vliqhcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJOb3JtQ3RybGVyIGV4dGVuZHMgQmFzZVBsYXllckN0cmxlciB7XHJcbiAgICAgICAgcHJpdmF0ZSBtX1N0YXJ0UFM6IExheWEuVmVjdG9yMztcclxuICAgICAgICBwcml2YXRlIG1fVGFyZ2V0UFM6IExheWEuVmVjdG9yMztcclxuICAgICAgICBwcml2YXRlIGdldCBNaWRkbGVQUygpOiBMYXlhLlZlY3RvcjMge1xyXG4gICAgICAgICAgICB2YXIgbWlkbGVQUzogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICBMYXlhLlZlY3RvcjMubGVycCh0aGlzLm1fU3RhcnRQUywgdGhpcy5tX1RhcmdldFBTLCAwLjUsIG1pZGxlUFMpO1xyXG4gICAgICAgICAgICBtaWRsZVBTLnkgKz0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICAgICAgcmV0dXJuIG1pZGxlUFM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIElzRmFsbGluZzogYm9vbGVhbjtcclxuICAgICAgICBUaW1lOiBudW1iZXI7XHJcbiAgICAgICAgZ2V0IExhc3RUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIHZhciBsYXN0VGltZTogbnVtYmVyID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuUGxheWVyTW92ZVRpbWUgLSAodGhpcy5UaW1lIC0gQVBQLlRpbWVNYW5hZ2VyLkdhbWVUaW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuIGxhc3RUaW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKirlt7LmtojogJfml7bpl7Tnmb7liIbmr5QgKi9cclxuICAgICAgICBnZXQgVGltZVBlcmNlbnQoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuTGFzdFRpbWUgLyBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5QbGF5ZXJNb3ZlVGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHBsYXllcjogUGxheWVyID0gbnVsbCkge1xyXG4gICAgICAgICAgICBzdXBlcihwbGF5ZXIpXHJcbiAgICAgICAgICAgIHRoaXMuVGltZSA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLklzRmFsbGluZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBPblN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5QbGF5ZXJNb3ZlVGltZTtcclxuICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT25Db21wbGV0ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBTdGFydE1vdmUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLlJlc2V0UGFyZW5ldCgpO1xyXG4gICAgICAgICAgICB0aGlzLlRpbWUgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5QbGF5ZXJNb3ZlVGltZTtcclxuICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tX1N0YXJ0UFMgPSB0aGlzLnBsYXllci5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5tX1RhcmdldFBTID0gdGhpcy5wbGF5ZXIuQ3VyU3RlcC5zdGFuZFBvaW50LnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5tX1RhcmdldFBTLnkgKz0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU3RlcExlbmd0aDtcclxuICAgICAgICAgICAgdmFyIHJvdGF0aW9uOiBMYXlhLlF1YXRlcm5pb24gPSBuZXcgTGF5YS5RdWF0ZXJuaW9uKCk7XHJcbiAgICAgICAgICAgIHZhciBsb29rVG9QUyA9IHRoaXMubV9UYXJnZXRQUy5jbG9uZSgpO1xyXG4gICAgICAgICAgICBsb29rVG9QUy55ID0gdGhpcy5tX1N0YXJ0UFMueTtcclxuICAgICAgICAgICAgbG9va1RvUFMueiA9IC1sb29rVG9QUy56XHJcbiAgICAgICAgICAgIHZhciB1cERpcjogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICB1cERpci55ID0gMTtcclxuICAgICAgICAgICAgdmFyIHN0YXJ0UFM6IExheWEuVmVjdG9yMyA9IHRoaXMubV9TdGFydFBTLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHN0YXJ0UFMueiA9IC1zdGFydFBTLno7XHJcbiAgICAgICAgICAgIExheWEuUXVhdGVybmlvbi5sb29rQXQoc3RhcnRQUywgbG9va1RvUFMsIHVwRGlyLCByb3RhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLkZhY2VNb2RlbFRvKHJvdGF0aW9uKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLlRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5UaW1lIDw9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVGltZSA9IC0xO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlNldFN0ZXAodGhpcy5wbGF5ZXIuQ3VyU3RlcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0VGltZTogbnVtYmVyID0gdGhpcy5MYXN0VGltZTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmF0ZTogbnVtYmVyID0gdGhpcy5UaW1lUGVyY2VudDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW92ZVRpbWVSYXRlOiBudW1iZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmYWxsVGltZVBvaW50OiBudW1iZXIgPSAwLjU7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0YXJ0UFM6IExheWEuVmVjdG9yMztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0UFM6IExheWEuVmVjdG9yMztcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmF0ZSA+IGZhbGxUaW1lUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLklzRmFsbGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5Jc0ZhbGxpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuSnVtcERvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLlRvdWNoR3JvdW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZVRpbWVSYXRlID0gKHJhdGUgLSBmYWxsVGltZVBvaW50KSAvICgxIC0gZmFsbFRpbWVQb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFBTID0gdGhpcy5tX1RhcmdldFBTO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBTID0gdGhpcy5NaWRkbGVQUztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlVGltZVJhdGUgPSByYXRlIC8gZmFsbFRpbWVQb2ludDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UFMgPSB0aGlzLk1pZGRsZVBTO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBTID0gdGhpcy5tX1N0YXJ0UFM7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5QbGF5ZXJEZWF0aClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQcyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgICAgICAgICBMYXlhLlZlY3RvcjMubGVycChzdGFydFBTLCB0YXJnZXRQUywgbW92ZVRpbWVSYXRlLCBuZXdQcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuUG9zaXRpb24gPSBuZXdQcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/njqnlrrbpo57ooYxcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJGbHkgZXh0ZW5kcyBCYXNlUGxheWVyQ3RybGVyIHtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbExvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbjtcclxuICAgICAgICBwcml2YXRlIF9GaW5hbFo6IG51bWJlcjtcclxuXHJcbiAgICAgICAgU3BlZWQ6IG51bWJlcjtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiDorr7nva7njqnlrrZcclxuICAgICAgICAgKiBAcGFyYW0gcGxheWVyIOaTjeaOp+inkuiJslxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIFNldFBsYXllcihwbGF5ZXI6IFBsYXllcikge1xyXG4gICAgICAgICAgICBzdXBlci5TZXRQbGF5ZXIocGxheWVyKTtcclxuICAgICAgICAgICAgcGxheWVyLlJlc2V0UGFyZW5ldCgpO1xyXG4gICAgICAgICAgICBwbGF5ZXIuRmx5KCk7XHJcbiAgICAgICAgICAgIHZhciBzdGVwUFM6IExheWEuVmVjdG9yMyA9IHBsYXllci5DdXJTdGVwLnN0YW5kUG9pbnQudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICAgICAgICAgIHN0ZXBQUy55ICs9IEdhbWVNb2R1bGUuVlNwYWNlKjAuNiA7XHJcbiAgICAgICAgICAgIHBsYXllci5Qb3NpdGlvbiA9IHN0ZXBQUztcclxuICAgICAgICAgICAgcGxheWVyLnRyYW5zZm9ybS5yb3RhdGlvbkV1bGVyID0gbmV3IExheWEuVmVjdG9yMygwLCAxODAsIDApO1xyXG4gICAgICAgICAgICBwbGF5ZXIuTW9kZWxSb3RhdGVFdWxhcihuZXcgTGF5YS5WZWN0b3IzKDAsIDE4MCwgMCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3RydWN0b3Ioc3BlZWQ6IG51bWJlcikge1xyXG4gICAgICAgICAgICBzdXBlcihudWxsKTtcclxuICAgICAgICAgICAgdGhpcy5TcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIF9VcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBsYXllciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHZlY3RvcjogTGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygwLCBHYW1lTW9kdWxlLlZTcGFjZSwgLUdhbWVNb2R1bGUuRFNwYWNlKTtcclxuICAgICAgICAgICAgTGF5YS5WZWN0b3IzLnNjYWxlKHZlY3RvciwgMC4wNiwgdmVjdG9yKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuVHJhbnNsYXRlKHZlY3Rvcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgT25Db21wbGV0ZSgpOiB2b2lkIHsgfVxyXG4gICAgICAgIHB1YmxpYyBPblN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vR2FtZUl0ZW1cIlxyXG5pbXBvcnQgTW91bnRMaW5lIGZyb20gXCIuL01vdW50TGluZVwiXHJcbmltcG9ydCB7IEdhbWVTdHJ1Y3QgfSBmcm9tIFwiLi9HYW1lU3RydWN0XCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vUGxheWVyXCJcclxuaW1wb3J0IENoYXJhY3RvckFuaW1hdG9yIGZyb20gXCIuL0NoYXJhY3RlckFuaW1hdG9yXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbnR5cGUgU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtO1xyXG50eXBlIE1Mb2NhdGlvbiA9IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uO1xyXG4vL+atpVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGVwIGV4dGVuZHMgTGF5YS5TcHJpdGUzRCB7XHJcbiAgICBwcml2YXRlIG1fQ2hhcmFjdGVyQW5pbWF0b3I6IFN0ZXBBbmltYXRvcjtcclxuICAgIC8v5qih5Z6L5Liq5pWwXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0ZXBNb2RlbE51bTogbnVtYmVyID0gMjtcclxuICAgIHByaXZhdGUgbV9TdGFuZFBvaW50OiBMYXlhLlNwcml0ZTNEO1xyXG4gICAgcHJpdmF0ZSBfSXNEZWFkUm9hZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgbV9TdGVwTW9kZWw6IExheWEuU3ByaXRlM0Q7XHJcbiAgICBwcml2YXRlIG1fWWllbGRGdW5jO1xyXG5cclxuICAgIExlZnRQYXJlbnQ6IFN0ZXA7XHJcbiAgICBSaWdodFBhcmVudDogU3RlcDtcclxuICAgIExlZnRDaGlsZDogU3RlcDtcclxuICAgIFJpZ2h0Q2hpbGQ6IFN0ZXA7XHJcbiAgICBTdGVwSXRlbTogU3RlcEl0ZW07XHJcbiAgICBSb2FkTnVtOiBudW1iZXI7XHJcbiAgICBNYXJrOiBhbnk7XHJcbiAgICBGbG9vcjogTW91bnRMaW5lO1xyXG4gICAgSWR4OiBudW1iZXI7XHJcbiAgICBsb2NrZWQ6IEJvb2xlYW47XHJcbiAgICAvL+WFrOacieaOpeWPo1xyXG4gICAgc2V0IHBvc2l0aW9uKG5ld1BTOiBMYXlhLlZlY3RvcjMpIHtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ld1BTLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgcG9zaXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgTG9jYXRpb24oKTogTUxvY2F0aW9uIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uKHRoaXMuSWR4LCB0aGlzLkZsb29yLkZsb29yTnVtKTtcclxuICAgIH1cclxuICAgIGdldCBJc0RlYWRSb2FkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Jc0RlYWRSb2FkIHx8ICF0aGlzLmFjdGl2ZSB8fCB0aGlzLlN0ZXBJdGVtLklzRGlmZmljdWx0eTtcclxuICAgIH1cclxuICAgIHNldCBJc0RlYWRSb2FkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5fSXNEZWFkUm9hZCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IElzRm9yYmlkZW4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU3RlcEl0ZW0uSXNGb3JiaWRlbjtcclxuICAgIH1cclxuICAgIGdldCBJc0VtcHR5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhKHRoaXMuYWN0aXZlICYmIHRoaXMuRmxvb3IuYWN0aXZlKTtcclxuICAgIH1cclxuICAgIGdldCBzdGFuZFBvaW50KCk6IExheWEuU3ByaXRlM0Qge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1fU3RhbmRQb2ludDtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGZsb29yOiBNb3VudExpbmUsIGlkeDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBpZiAodGhpcy5JZHggIT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgSWR4ID0gTWF0aC5yYW5kb20oKSAqIFN0ZXAuc3RlcE1vZGVsTnVtO1xyXG4gICAgICAgICAgICBJZHggPSBJZHggPiAwLjUgPyAyIDogMTtcclxuICAgICAgICAgICAgdmFyIG5hbWU6IHN0cmluZyA9IHBhdGguR2V0TEgoXCJkaXp1b19xaXUwXCIgKyBJZHgpXHJcbiAgICAgICAgICAgIHZhciBtb2RlbCA9IExheWEubG9hZGVyLmdldFJlcyhuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGNsb25lTW9kZWw6IExheWEuU3ByaXRlM0QgPSBtb2RlbC5jbG9uZSgpO1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJBbmltYXRvciA9IG5ldyBTdGVwQW5pbWF0b3IoY2xvbmVNb2RlbC5nZXRDaGlsZEF0KDApLmdldENvbXBvbmVudChMYXlhLkFuaW1hdG9yKSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3RlckFuaW1hdG9yLkluaXQoKTtcclxuICAgICAgICBjbG9uZU1vZGVsLnRyYW5zZm9ybS5wb3NpdGlvbiA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICB0aGlzLm1fU3RlcE1vZGVsID0gY2xvbmVNb2RlbDtcclxuXHJcbiAgICAgICAgdmFyIHN0YW5kUG9pbnQ6IExheWEuU3ByaXRlM0QgPSBuZXcgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICB0aGlzLm1fU3RlcE1vZGVsLmdldENoaWxkQXQoMCkuYWRkQ2hpbGQoc3RhbmRQb2ludCk7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3RlckFuaW1hdG9yLmxpbmtTcHJpdGUzRFRvQXZhdGFyTm9kZShcIlBsYXllckZvb3RQb2ludFwiLCBzdGFuZFBvaW50KTtcclxuICAgICAgICB0aGlzLm1fU3RhbmRQb2ludCA9IHN0YW5kUG9pbnQ7XHJcbiAgICAgICAgc3RhbmRQb2ludC50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKCk7XHJcblxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQoY2xvbmVNb2RlbCk7XHJcblxyXG4gICAgICAgIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0gPSBJdGVtLlN0ZXBJdGVtRmFjdG9yeShJdGVtLkl0ZW1UeXBlLk5vbmUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUmVzZXRJdGVtKCk7XHJcbiAgICAgICAgdGhpcy5GbG9vciA9IGZsb29yO1xyXG4gICAgICAgIHRoaXMuSWR4ID0gaWR4O1xyXG5cclxuICAgICAgICB0aGlzLkxlZnRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0Q2hpbGQgPSBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLl9Jc0RlYWRSb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5Sb2FkTnVtID0gMDtcclxuICAgICAgICB0aGlzLmxvY2tlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgUHV0SXRlbShpdGVtRW51bWU6IEl0ZW0uSXRlbVR5cGUpIHtcclxuICAgICAgICBpZiAoaXRlbUVudW1lID09IEl0ZW0uSXRlbVR5cGUuRW1wdHkpIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLlN0ZXBJdGVtLlB1dEl0ZW0oaXRlbUVudW1lKTtcclxuICAgIH1cclxuICAgIFJlc2V0U3RlcChuZXdQczogTGF5YS5WZWN0b3IzID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChuZXdQcylcclxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IG5ld1BzO1xyXG4gICAgICAgIHRoaXMuU3RlcEl0ZW0uUHV0SXRlbShJdGVtLkl0ZW1UeXBlLk5vbmUpO1xyXG5cclxuICAgICAgICB0aGlzLkxlZnRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUmlnaHRQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGVmdENoaWxkID0gbnVsbDtcclxuICAgICAgICB0aGlzLlJpZ2h0Q2hpbGQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0lzRGVhZFJvYWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLlJvYWROdW0gPSAwO1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxvY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJBbmltYXRvci5wbGF5KFwiaWRsZVwiKVxyXG4gICAgICAgIHZhciBwb3NpdGlvbjogTGF5YS5WZWN0b3IzID0gdGhpcy50cmFuc2Zvcm0ubG9jYWxQb3NpdGlvbjtcclxuICAgICAgICBwb3NpdGlvbi55ID0gMDtcclxuICAgICAgICB0aGlzLnRyYW5zZm9ybS5sb2NhbFBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgaWYodGhpcy5tX1lpZWxkRnVuYylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm1fWWllbGRGdW5jKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFRvdWNoR3JvdW5kKHBsYXllcjogUGxheWVyKSB7XHJcbiAgICAgICAgdGhpcy5TdGVwSXRlbS5Ub3VjaEl0ZW0ocGxheWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RhbmRPbkdyb3VuZChwbGF5ZXIgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHBsYXllcikge1xyXG4gICAgICAgICAgICB2YXIgbmV3U3ByaXRlOiBMYXlhLlNwcml0ZTNEID0gdGhpcy5tX1N0YW5kUG9pbnQ7XHJcbiAgICAgICAgICAgIG5ld1Nwcml0ZS5hZGRDaGlsZChwbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyQW5pbWF0b3IucGxheShcImZhbGxcIilcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUHV0SW5JdGVtKHNwcml0ZTNEOiBMYXlhLlNwcml0ZTNEKSB7XHJcbiAgICAgICAgdGhpcy5tX1N0YW5kUG9pbnQuYWRkQ2hpbGQoc3ByaXRlM0QpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgQnJlYWsoKSB7XHJcbiAgICAgICAgdmFyIHJhbmRvbVRpbWUgPSAxMDAwICogTWF0aC5yYW5kb20oKTtcclxuICAgICAgICB2YXIgc3RlcDpTdGVwID0gdGhpcztcclxuICAgICAgICB0aGlzLm1fWWllbGRGdW5jID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHN0ZXAuWWllbGRCcmVhaygpO1xyXG4gICAgICAgIH0sIHJhbmRvbVRpbWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBZaWVsZEJyZWFrKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fQ2hhcmFjdGVyQW5pbWF0b3IucGxheShcIndhcm5pbmdcIik7XHJcbiAgICAgICAgdGhpcy5tX1lpZWxkRnVuYyA9IG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0ZXBBbmltYXRvciBleHRlbmRzIENoYXJhY3RvckFuaW1hdG9yIHtcclxuICAgIHByaXZhdGUgbV9TdGVwOiBTdGVwO1xyXG4gICAgY29uc3RydWN0b3IoYW5pbWF0b3I6IExheWEuQW5pbWF0b3IsIHN0ZXA6IFN0ZXApIHtcclxuICAgICAgICBzdXBlcihhbmltYXRvcik7XHJcbiAgICAgICAgdGhpcy5tX1N0ZXAgPSBzdGVwO1xyXG4gICAgfVxyXG4gICAgSW5pdCgpIHtcclxuICAgICAgICB2YXIgc3RlcEZhbGxTdGF0ZTogTGF5YS5BbmltYXRvclN0YXRlID0gdGhpcy5HZXRTdGF0ZShcImZhbGxcIilcclxuICAgICAgICB2YXIgc3RlcEZhbGxTY3JpcHQ6IExheWEuQW5pbWF0b3JTdGF0ZVNjcmlwdCA9IHN0ZXBGYWxsU3RhdGUuYWRkU2NyaXB0KExheWEuQW5pbWF0b3JTdGF0ZVNjcmlwdCk7XHJcbiAgICAgICAgdmFyIHN0ZXBBbmltYXRvciA9IHRoaXM7XHJcbiAgICAgICAgdmFyIGZhbGxEb3duU3RhdGU6IExheWEuQW5pbWF0b3JTdGF0ZSA9IHRoaXMuR2V0U3RhdGUoXCJmYWxsRG93blwiKTtcclxuICAgICAgICB2YXIgZmFsbERvd25TY3JpcHQ6IEZhbGxEb3duU2NyaXB0ID0gZmFsbERvd25TdGF0ZS5hZGRTY3JpcHQoRmFsbERvd25TY3JpcHQpIGFzIEZhbGxEb3duU2NyaXB0O1xyXG4gICAgICAgIGZhbGxEb3duU2NyaXB0LkluaXQodGhpcy5tX1N0ZXAsIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgd2FybmluZ1N0YXRlOiBMYXlhLkFuaW1hdG9yU3RhdGUgPSB0aGlzLkdldFN0YXRlKFwid2FybmluZ1wiKTtcclxuICAgICAgICB2YXIgd2FybmluZ1NjcmlwdDogV2FybmluZ1NjcmlwdCA9IHdhcm5pbmdTdGF0ZS5hZGRTY3JpcHQoV2FybmluZ1NjcmlwdCkgYXMgV2FybmluZ1NjcmlwdDtcclxuICAgICAgICB3YXJuaW5nU2NyaXB0LkluaXQodGhpcy5tX1N0ZXAsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcGxheShuYW1lOiBzdHJpbmcpICB7XHJcbiAgICAgICAgdmFyIGFuaW1hdG9yU3RhdGVOYW1lOiBzdHJpbmcgPSB0aGlzLmN1clN0YXRlTmFtZTtcclxuICAgICAgICBzd2l0Y2ggKG5hbWUpICB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJmYWxsRG93blwiOlxyXG4gICAgICAgICAgICBjYXNlIFwid2FybmluZ1wiOlxyXG4gICAgICAgICAgICBjYXNlIFwiaWRsZVwiOlxyXG4gICAgICAgICAgICAgICAgc3VwZXIucGxheShuYW1lKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdG9yU3RhdGVOYW1lICE9IFwiZmFsbERvd25cIiAmJiBhbmltYXRvclN0YXRlTmFtZSAhPSBcIndhcm5pbmdcIikgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBlci5wbGF5KG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBGYWxsRG93blNjcmlwdCBleHRlbmRzIExheWEuQW5pbWF0b3JTdGF0ZVNjcmlwdCB7XHJcbiAgICBwcml2YXRlIG1fU3RlcDogU3RlcDtcclxuICAgIHByaXZhdGUgbV9TcGVlZDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1RpbWVDb3VudDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0NvdW50aW51ZVRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9BbmltYXRvcjogQ2hhcmFjdG9yQW5pbWF0b3I7XHJcbiAgICBwcml2YXRlIG1fUGxheWVyOiBQbGF5ZXI7XHJcbiAgICBwcml2YXRlIG1fVGltZU91dDtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX1NwZWVkID0gMDtcclxuICAgICAgICB0aGlzLm1fQ291bnRpbnVlVGltZSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEluaXQoc3RlcDogU3RlcCwgYW5pbWF0b3I6IENoYXJhY3RvckFuaW1hdG9yKSB7XHJcbiAgICAgICAgdGhpcy5tX1N0ZXAgPSBzdGVwO1xyXG4gICAgICAgIHRoaXMubV9TcGVlZCA9IDA7XHJcbiAgICAgICAgdGhpcy5tX0FuaW1hdG9yID0gYW5pbWF0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU3RhdGVFbnRlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fU3RlcC5sb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMubV9UaW1lQ291bnQgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgKyB0aGlzLm1fQ291bnRpbnVlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdGF0ZUV4aXQoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHN0ZXBQb3NpdGlvbjogTGF5YS5WZWN0b3IzID0gdGhpcy5tX1N0ZXAudHJhbnNmb3JtLmxvY2FsUG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5tX1N0ZXAudHJhbnNmb3JtLmxvY2FsUG9zaXRpb24gPSBzdGVwUG9zaXRpb247XHJcbiAgICAgICAgaWYgKHRoaXMubV9UaW1lT3V0KVxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5tX1RpbWVPdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblN0YXRlVXBkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5tX1BsYXllciAmJiB0aGlzLm1fU3RlcC5zdGFuZFBvaW50Lm51bUNoaWxkcmVuID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm1fUGxheWVyID0gdGhpcy5tX1N0ZXAuc3RhbmRQb2ludC5nZXRDaGlsZEJ5TmFtZShcIlBsYXllclwiKSBhcyBQbGF5ZXI7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fUGxheWVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fUGxheWVyLlJlc2V0UGFyZW5ldCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX1RpbWVPdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fUGxheWVyLkZhbGxEb3duKCk7XHJcbiAgICAgICAgICAgICAgICB9LCAxNTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsYXN0RnJhbWVUaW1lID0gdGhpcy5tX1RpbWVDb3VudCAtIEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZTtcclxuICAgICAgICBpZiAobGFzdEZyYW1lVGltZSA8IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tX1NwZWVkIDwgMSlcclxuICAgICAgICAgICAgdGhpcy5tX1NwZWVkICs9ICh0aGlzLm1fQ291bnRpbnVlVGltZSAtIGxhc3RGcmFtZVRpbWUpICogMC41O1xyXG4gICAgICAgIHZhciBwb3NpdGlvbjogTGF5YS5WZWN0b3IzID0gdGhpcy5tX1N0ZXAucG9zaXRpb247XHJcbiAgICAgICAgcG9zaXRpb24ueSAtPSB0aGlzLm1fU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5tX1N0ZXAucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgV2FybmluZ1NjcmlwdCBleHRlbmRzIExheWEuQW5pbWF0b3JTdGF0ZVNjcmlwdCB7XHJcbiAgICBwcml2YXRlIG1fU3RlcDogU3RlcDtcclxuICAgIHByaXZhdGUgbV9BbmltYXRvcjogQ2hhcmFjdG9yQW5pbWF0b3I7XHJcbiAgICBwcml2YXRlIG1fVGltZUNvdW50OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fQ291bnRpbnVlVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1N0YXJ0WFBvc2l0aW46IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9Td2l0Y2hOdW06IG51bWJlcjtcclxuICAgIHByaXZhdGUgbV9TaGFrZVRpbWVDb3VudDogbnVtYmVyO1xyXG5cclxuICAgIGdldCBFbmRUaW1lUG9pbnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX1RpbWVDb3VudCArIHRoaXMubV9Db3VudGludWVUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50aW51ZVRpbWUgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBJbml0KHN0ZXA6IFN0ZXAsIGFuaW1hdG9yOiBDaGFyYWN0b3JBbmltYXRvcikge1xyXG4gICAgICAgIHRoaXMubV9TdGVwID0gc3RlcDtcclxuICAgICAgICB0aGlzLm1fQW5pbWF0b3IgPSBhbmltYXRvcjtcclxuICAgICAgICB0aGlzLm1fU2hha2VUaW1lQ291bnQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvblN0YXRlRW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tX1RpbWVDb3VudCA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZTtcclxuICAgICAgICB0aGlzLm1fQ291bnRpbnVlVGltZSA9IDE7XHJcbiAgICAgICAgdGhpcy5tX1N0YXJ0WFBvc2l0aW4gPSB0aGlzLm1fU3RlcC50cmFuc2Zvcm0ucG9zaXRpb24ueDtcclxuICAgICAgICB0aGlzLm1fU3dpdGNoTnVtID0gMC4wNjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25TdGF0ZUV4aXQoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHN0ZXBQb3NpdGlvbjogTGF5YS5WZWN0b3IzID0gdGhpcy5tX1N0ZXAudHJhbnNmb3JtLmxvY2FsUG9zaXRpb247XHJcbiAgICAgICAgdGhpcy5tX1N0ZXAudHJhbnNmb3JtLmxvY2FsUG9zaXRpb24gPSBzdGVwUG9zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU3RhdGVVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGN1ckdhbWVUaW1lOiBudW1iZXIgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWU7XHJcbiAgICAgICAgaWYgKGN1ckdhbWVUaW1lIDwgdGhpcy5FbmRUaW1lUG9pbnQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9TaGFrZVRpbWVDb3VudCA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9Td2l0Y2hOdW0gKj0gLTE7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3WFBvc2l0aW9uID0gdGhpcy5tX1N3aXRjaE51bSArIHRoaXMubV9TdGFydFhQb3NpdGluO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ZXBQb3NpdGlvbjogTGF5YS5WZWN0b3IzID0gdGhpcy5tX1N0ZXAucG9zaXRpb247XHJcbiAgICAgICAgICAgICAgICBzdGVwUG9zaXRpb24ueCA9IG5ld1hQb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9TdGVwLnBvc2l0aW9uID0gc3RlcFBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX1NoYWtlVGltZUNvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX1NoYWtlVGltZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlICB7XHJcbiAgICAgICAgICAgICAgICArK3RoaXMubV9TaGFrZVRpbWVDb3VudDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm1fQW5pbWF0b3IucGxheShcImZhbGxEb3duXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiDkvZzogIU6TW9cclxuICog5ZCv5Yqo5Zy65pmvXHJcbiAqL1xyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgU2NlbmVNYW5hZ2VyIGZyb20gXCIuL0ZyYW1lV29yay9TY2VuZU1hbmFnZXJcIlxyXG5pbXBvcnQgTG9hZFNjZW5lIGZyb20gXCIuL1NjZW5lL0xvYWRTY2VuZVwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiO1xyXG5jbGFzcyBHYW1lXHJcbntcclxuXHRfRnJhbWU6RnJhbWVXb3JrO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBzcyA9IEFQUDtcclxuICAgICAgICBMYXlhM0QuaW5pdCg3NTAsMTMzNCk7XHJcbiAgICAgICAgR2FtZUNvbmZpZy5pbml0KCk7XHJcbiAgICAgICAgLy9MYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRlVMTDtcclxuICAgICAgICBMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IExheWEuU3RhZ2UuU0NBTEVfRklYRURfV0lEVEg7XHJcbiAgICAgICAgXHJcbiAgICAgICAgTGF5YS5zdGFnZS5zY3JlZW5Nb2RlID0gTGF5YS5TdGFnZS5TQ1JFRU5fVkVSVElDQUw7XHJcbiAgICAgICAgTGF5YS5zdGFnZS5hbGlnblYgPSBMYXlhLlN0YWdlLkFMSUdOX0JPVFRPTTtcclxuICAgICAgICAvL+W8gOWQr+e7n+iuoeS/oeaBr1xyXG5cdFx0TGF5YS5TdGF0LmhpZGUoKTsgICBcclxuICAgICAgICB2YXIgcmVzQ29sID0gW3t1cmw6XCJ1aS9SZXNvdXJjZS9sb2NhbGNvbXAuYXRsYXNcIix0eXBlOkxheWEuTG9hZGVyLkFUTEFTfSx7dXJsOlwidWkvUmVzb3VyY2UvTG9hZFVJLmpzb25cIix0eXBlOkxheWEuTG9hZGVyLkpTT059XTtcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHJlc0NvbCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbjNETG9hZGVkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb24zRExvYWRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGFycjNEID0gW1widWkvUmVzb3VyY2UvTGF5YVNjZW5lX01haW5TY2VuZS9Db252ZW50aW9uYWwvTWFpblNjZW5lLmxzXCJdO1xyXG4gICAgICAgIC8vdmFyIGFycjNEID0gW1widWkvUmVzb3VyY2UvTGF5YVNjZW5lX1NhbXBsZVNjZW5lL0NvbnZlbnRpb25hbC9TYW1wbGVTY2VuZS5saFwiXTtcclxuICAgICAgICBMYXlhLmxvYWRlci5jcmVhdGUoYXJyM0QsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Mb2FkZWQpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyxudWxsLG51bGwsZmFsc2UpKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWRlZCgpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLkluaXQoKTtcclxuICAgICAgICB2YXIgc2NlbmVNZ3I6U2NlbmVNYW5hZ2VyID0gQVBQLlNjZW5lTWFuYWdlcjtcclxuICAgICAgICBzY2VuZU1nci5DaGFuZ2VTY2VuZShuZXcgTG9hZFNjZW5lKCkpO1xyXG4gICAgICAgIExheWEudGltZXIuZnJhbWVMb29wKDEsdGhpcyx0aGlzLlVwZGF0ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCApXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLkZyYW1lV29yay5VcGRhdGUoKTtcclxuICAgIH1cclxufVxyXG52YXIgR00gPSBuZXcgR2FtZSgpO1xyXG4iLCJpbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4uL1V0aWxpdHkvUGF0aFwiO1xyXG5pbXBvcnQgQ2hhcmFjdGVyTWFuYWdlciBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvQ2hhcmFjdGVyTWFtYWdlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyVUlTY2VuZSBleHRlbmRzIExheWEuU2NlbmUzRHtcclxuXHJcbiAgICBwdWJsaWMgYXJyYXlEaXM6TGF5YS5TcHJpdGUzRFtdID0gW107XHJcbiAgICBwdWJsaWMgY250TnVtID0gNTtcclxuICAgIHB1YmxpYyBzdGFydGFvID0gOTA7XHJcbiAgICBwdWJsaWMgcGVyYW8gPSAzNjAgLyB0aGlzLmNudE51bTtcclxuICAgIHB1YmxpYyByID0gMC4wNDtcclxuICAgIHB1YmxpYyBzdGFydFkgPSAtMC4wMjtcclxuICAgIHB1YmxpYyBjbnRTZWxlY3RJbmRleCA9IDA7XHJcblxyXG4gICAgcHVibGljIGNhbWVyYTpMYXlhLkNhbWVyYTtcclxuICAgIHB1YmxpYyBjbnRzdGFydGFvID0gOTA7XHJcbiAgICBwdWJsaWMgbW92ZVN0YXJhbyA9IDI7XHJcbiAgICBwdWJsaWMgbmV4dEFvID0gLTE7XHJcbiAgICBwdWJsaWMgaW5pdFNjYWxOdW0gPSAwLjAxODtcclxuXHJcbiAgICBwdWJsaWMgbW92ZUNhbGxCYWNrO1xyXG4gICAgcHVibGljIGNudFNlbGVjdFNleDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjbnRTZWxlY3RJbmRleCwgbW92ZUNhbGxCYWNrKSB7IFxyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9IGNudFNlbGVjdEluZGV4O1xyXG4gICAgICAgIHRoaXMubW92ZUNhbGxCYWNrID0gbW92ZUNhbGxCYWNrO1xyXG4gICAgICAgIHRoaXMuYW1iaWVudENvbG9yID0gbmV3IExheWEuVmVjdG9yMygxLCAxLCAxKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNhbWVyYSA9IHRoaXMuYWRkQ2hpbGQobmV3IExheWEuQ2FtZXJhKDAsIDAuMSwgMC4zKSkgYXMgTGF5YS5DYW1lcmE7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEudHJhbnNmb3JtLnRyYW5zbGF0ZShuZXcgTGF5YS5WZWN0b3IzKDAsIDAsIDAuMikpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnRyYW5zZm9ybS5yb3RhdGUobmV3IExheWEuVmVjdG9yMyggMCwgMCwgMCksIHRydWUsIGZhbHNlKTtcclxuICAgICAgICBcclxuICAgICAgICBmb3IodmFyIGkgPSAwIDtpIDwgMTA7aSArKykge1xyXG4gICAgICAgICAgICB2YXIgY2hhcmFjdGVyTW9kZWwgPSAgQ2hhcmFjdGVyTWFuYWdlci5NZ3IuR2V0Q2hhcmFjdGVyTW9kZWwoaSk7XHJcbiAgICAgICAgICAgIHZhciBhdWR0OkxheWEuU3ByaXRlM0QgPSBjaGFyYWN0ZXJNb2RlbDtcclxuICAgICAgICAgICAgYXVkdC50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjModGhpcy5pbml0U2NhbE51bSwgdGhpcy5pbml0U2NhbE51bSwgdGhpcy5pbml0U2NhbE51bSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoYXVkdCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlEaXMucHVzaChhdWR0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9ICh0aGlzLmNudFNlbGVjdEluZGV4ICsgNSkgJSA1O1xyXG4gICAgICAgIHRoaXMubmV4dEFvID0gKHRoaXMuc3RhcnRhbyArICh0aGlzLmNudE51bSAtIHRoaXMuY250U2VsZWN0SW5kZXgpICogICAgIHRoaXMucGVyYW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZWN0KCk7XHJcbiAgICAgfVxyXG5cclxuICAgICB1cGRhdGVTZWxlY3RTZXgoY250U2VsZWN0U2V4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZihjbnRTZWxlY3RTZXggPT0gMCkge1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCAxMDtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpIDwgNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbaV0uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCAxMDtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZihpID49IDUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RTZXggPSBjbnRTZWxlY3RTZXg7XHJcbiAgICAgfVxyXG5cclxuICAgIGNhbENudFN0YXJ0YW8oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9ICh0aGlzLmNudFNlbGVjdEluZGV4ICsgNSkgJSA1O1xyXG4gICAgICAgIHRoaXMubmV4dEFvID0gKHRoaXMuc3RhcnRhbyArICh0aGlzLmNudE51bSAtIHRoaXMuY250U2VsZWN0SW5kZXgpICogdGhpcy5wZXJhbyArIDM2MCkgJSAzNjA7XHJcblxyXG4gICAgICAgIGlmKCh0aGlzLm5leHRBbyAtIHRoaXMuY250c3RhcnRhbyArIDM2MCkgJSAzNjAgPj0gMTgwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVN0YXJhbyA9IC0yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZVN0YXJhbyA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEudGltZXIubG9vcCgwLjA1LCB0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGltZUFvQ2hhbmdlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmKHRoaXMuY250c3RhcnRhbyA9PSB0aGlzLm5leHRBbykge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSB0aGlzLm5leHRBbztcclxuICAgICAgICAgICAgdGhpcy5uZXh0QW8gPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQ2FsbEJhY2sgJiYgdGhpcy5tb3ZlQ2FsbEJhY2soMSk7XHJcbiAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcywgdGhpcy50aW1lQW9DaGFuZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBsYXNjbnRBbyA9IHRoaXMuY250c3RhcnRhbztcclxuICAgICAgICB0aGlzLmNudHN0YXJ0YW8gKz0gdGhpcy5tb3ZlU3RhcmFvO1xyXG4gICAgICAgIGlmKHRoaXMuY250c3RhcnRhbyA8IDAgfHwgdGhpcy5jbnRzdGFydGFvID09IDM2MCkge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSAodGhpcy5jbnRzdGFydGFvICsgMzYwKSAlIDM2MDtcclxuICAgICAgICAgICAgbGFzY250QW8gPSB0aGlzLmNudHN0YXJ0YW8gLSB0aGlzLm1vdmVTdGFyYW87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9ICh0aGlzLmNudHN0YXJ0YW8gKyAzNjApICUgMzYwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBpZigobGFzY250QW8gPj0gdGhpcy5uZXh0QW8gJiYgdGhpcy5jbnRzdGFydGFvIDw9IHRoaXMubmV4dEFvKSB8fCAobGFzY250QW8gPD0gdGhpcy5uZXh0QW8gJiYgdGhpcy5jbnRzdGFydGFvID49IHRoaXMubmV4dEFvKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSB0aGlzLm5leHRBbztcclxuICAgICAgICAgICAgdGhpcy5uZXh0QW8gPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5uZXh0QW8gPT0gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlQ2FsbEJhY2sgJiYgdGhpcy5tb3ZlQ2FsbEJhY2soMSk7XHJcbiAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcywgdGhpcy50aW1lQW9DaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGVjdCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCA1O2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIGFvID0gKHRoaXMuY250c3RhcnRhbyArIGkgKiB0aGlzLnBlcmFvKSAlIDM2MFxyXG4gICAgICAgICAgICB2YXIgeCA9IHRoaXMuciAqIE1hdGguY29zKGFvICogMy4xNCAvIDE4MCk7XHJcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5zdGFydFkgKyB0aGlzLnIgKiBNYXRoLnNpbihhbyAqIDMuMTQgLyAxODApO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzWzUraV0udHJhbnNmb3JtLnBvc2l0aW9uID0gdGhpcy5hcnJheURpc1tpXS50cmFuc2Zvcm0ucG9zaXRpb24gPSBuZXcgTGF5YS5WZWN0b3IzKHgsIHksIDApO1xyXG5cclxuICAgICAgICAgICAgdmFyIHNjYWxlID0gMC4yICogeTtcclxuICAgICAgICAgICAgaWYoc2NhbGUgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheURpc1s1K2ldLnRyYW5zZm9ybS5sb2NhbFNjYWxlID0gdGhpcy5hcnJheURpc1tpXS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IG5ldyBMYXlhLlZlY3RvcjModGhpcy5pbml0U2NhbE51bSArIHNjYWxlLCB0aGlzLmluaXRTY2FsTnVtICsgc2NhbGUsIHRoaXMuaW5pdFNjYWxOdW0gKyBzY2FsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbNStpXS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IHRoaXMuYXJyYXlEaXNbaV0udHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKHRoaXMuaW5pdFNjYWxOdW0sIHRoaXMuaW5pdFNjYWxOdW0sIHRoaXMuaW5pdFNjYWxOdW0pO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1vdmVDYWxsQmFjayAmJiB0aGlzLm1vdmVDYWxsQmFjaygpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjbGVhclJvYXRlVGltZXIoKTogdm9pZCB7XHJcbiAgICAgICAgTGF5YS50aW1lci5jbGVhcih0aGlzLCB0aGlzLnRpbWVBb0NoYW5nZSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGFzdFJvbGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCAtLTtcclxuICAgICAgICB0aGlzLmNhbENudFN0YXJ0YW8oKTtcclxuICAgIH0gICBcclxuXHJcbiAgICBuZXh0Um9sZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ICsrO1xyXG4gICAgICAgIHRoaXMuY2FsQ250U3RhcnRhbygpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGVjdEluZGV4KHNlbGVjdEluZGV4Om51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmKHNlbGVjdEluZGV4ID09IHRoaXMuY250U2VsZWN0SW5kZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gc2VsZWN0SW5kZXg7XHJcbiAgICAgICAgdGhpcy5jYWxDbnRTdGFydGFvKCk7XHJcbiAgICB9IFxyXG5cclxuICAgIG9uRW5hYmxlKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQge1NjZW5lfSBmcm9tIFwiLi9TY2VuZVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHYW1lU2NlbmVQbGF5IGZyb20gXCIuL1NjZW5lUGxheS9HYW1lU2NlbmVQbGF5XCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lRGlyZWN0b3IgZXh0ZW5kcyBTY2VuZS5CYXNlRGlyZWN0b3Ige1xyXG4gICAgcHVibGljIGdldCBHYW1lUGxheSgpOkdhbWVTY2VuZVBsYXlcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5DdXJTdGF0ZSBhcyBHYW1lU2NlbmVQbGF5O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxvYWRMaXN0MkQgPSBbcGF0aC5HZXREZXBhdGhVSUpTKFwiUGxheWVyTGlzdFwiKSxwYXRoLkdldERlcGF0aFVJSlMoXCJHYW1lXCIpLHBhdGguR2V0RGVwYXRoVUlKUyhcIkVuZEdhbWVcIildO1xyXG4gICAgICAgIHRoaXMuQ2hhbmdlU3RhdGUobmV3IFNjZW5lLkxvYWRTY2VuZUxvZ2ljKGxvYWRMaXN0MkQsbnVsbCxuZXcgR2FtZVNjZW5lUGxheSgpKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsIi8qXHJcbuS9nOiAhTpNb1xyXG7ot7PlsbHnvorlnLrmma/moLjlv4Plip/og71cclxuKi9cclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW50ZXJHYW1lVUlcIlxyXG5pbXBvcnQgRW5kR2FtZVVJIGZyb20gXCIuLy4uL3VpL0VuZEdhbWVVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtNZXNzYWdlTUR9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IEdhbWVDYW1lcmEgZnJvbSBcIi4vLi4vR2FtZS9HYW1lQ2FtZXJhXCJcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi8uLi9HYW1lL1BsYXllclwiXHJcbmltcG9ydCB7SW5wdXR9IGZyb20gXCIuLy4uL0dhbWUvSW5wdXRcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IEdhbWVVSSBmcm9tIFwiLi8uLi91aS9HYW1lVUlcIlxyXG5pbXBvcnQge0l0ZW19IGZyb20gXCIuLy4uL0dhbWUvR2FtZUl0ZW1cIlxyXG5pbXBvcnQgU3RlcCBmcm9tIFwiLi8uLi9HYW1lL1N0ZXBcIlxyXG5pbXBvcnQgR2FtZURpcmVjdG9yIGZyb20gXCIuL0dhbWVEaXJlY3RvclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbnR5cGUgSXRlbUxheW91dCA9IEl0ZW0uSXRlbUxheW91dDtcclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxuLy/muLjmiI/lnLrmma9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgU2NlbmUuQmFzZVNjZW5lXHJcbntcclxuICAgIE1vZGVsTG9hZDpib29sZWFuO1xyXG4gICAgR2FtZURpcjpHYW1lRGlyZWN0b3I7XHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpHYW1lRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gbmV3IEdhbWVEaXJlY3RvcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5YaF6YOo5Yqf6IO9XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLm1fU2NlbmVPYmogPSBuZXcgTGF5YS5TY2VuZTNEO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuIiwiaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vLi4vdWkvRW50ZXJHYW1lVUlcIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7U2NlbmV9IGZyb20gXCIuLy4uL1NjZW5lL1NjZW5lXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi4vY29udHJvbGVyL0FQUFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3VpZGVyTWFuYWdlciBcclxue1xyXG4vL+WvueWkluaOpeWPo1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjpHdWlkZXJNYW5hZ2VyO1xyXG4gICAgc3RhdGljIGdldCBNZ3IoKTpHdWlkZXJNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYoR3VpZGVyTWFuYWdlci5fTWdyID09IG51bGwpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHdWlkZXJNYW5hZ2VyLl9NZ3IgPSBuZXcgR3VpZGVyTWFuYWdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR3VpZGVyTWFuYWdlci5fTWdyO1xyXG4gICAgfVxyXG4gICAgU2NlbmVNZ3I6U2NlbmVNYW5hZ2VyO1xyXG4gICAgQ3VyU2NlbmU6R3VpZGVyU2NlbmU7XHJcbiAgICBwdWJsaWMgZ2V0IEdhbWVEaXIoKTpHdWlkZXJEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkN1clNjZW5lLkd1aWREaXI7XHJcbiAgICB9XHJcbiAgICAvL+i/m+WFpea4uOaIj+WcuuaZr+i1sOi/meS4quaOpeWPo1xyXG4gICAgRW50ZXJTY2VuZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB2YXIgbmV3R2FtZVNjZW5lID0gbmV3IEd1aWRlclNjZW5lKCk7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5DaGFuZ2VTY2VuZShuZXdHYW1lU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuQ3VyU2NlbmUgPSBuZXdHYW1lU2NlbmU7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lhoXpg6jlip/og71cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLkN1clNjZW5lID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgR3VpZGVyU2NlbmUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVcclxue1xyXG4gICAgR3VpZERpcjpHdWlkZXJEaXJlY3RvcjtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgR2VuRGlyZWN0b3IoKTpTY2VuZS5CYXNlRGlyZWN0b3JcclxuICAgIHtcclxuICAgICAgICB2YXIgRGlyZWN0b3I6U2NlbmUuQmFzZURpcmVjdG9yID0gbmV3IEd1aWRlckRpcmVjdG9yKCk7XHJcbiAgICAgICAgcmV0dXJuIERpcmVjdG9yO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBHdWlkZXJEaXJlY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RhcnQoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxvYWQyRExpc3QgPSBbe3VybDpwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSAsdHlwZTpMYXlhLkxvYWRlci5KU09OfSx7dXJsOnBhdGguR2V0RGVwYXRoVUlKUyhcIkl0ZW1MaXN0XCIpICx0eXBlOkxheWEuTG9hZGVyLkpTT059LHt1cmw6cGF0aC5HZXRBdGxQYXRoKFwiY29tcFwiKSx0eXBlOiBMYXlhLkxvYWRlci5BVExBUyB9XTtcclxuICAgICAgICB0aGlzLkNoYW5nZUdhbWVQbGF5KG5ldyBTY2VuZS5Mb2FkU2NlbmVMb2dpYyhsb2FkMkRMaXN0LG51bGwsbmV3IEd1aWRlclNjZW5lUGxheSgpKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgcHVibGljIEVuZCgpOnZvaWRcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEd1aWRlclNjZW5lUGxheSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllXHJcbntcclxuICAgIFVJOkVudGVyR2FtZVVJO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9ICAgIFxyXG4gICAgcHVibGljIFN0YXJ0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLlVJID0gQVBQLlVJTWFuYWdlci5TaG93PEVudGVyR2FtZVVJPihFbnRlckdhbWVVSSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgRW5kKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxufSIsImltcG9ydCB7dWl9IGZyb20gXCIuLy4uL3VpL2xheWFNYXhVSVwiXHJcbmltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHtTY2VuZX0gZnJvbSBcIi4vLi4vU2NlbmUvU2NlbmVcIlxyXG5pbXBvcnQgRnJhbWVXb3JrIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgTG9hZGluZ1VJIGZyb20gXCIuLy4uL3VpL1VuRG93bmxvYWQvTG9hZGluZ1VJXCJcclxuaW1wb3J0IEZNV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4vR3VpZGVyTWFuYWdlclwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBCRyBmcm9tIFwiLi8uLi91aS9CR1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkU2NlbmUgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVcclxue1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBHZW5EaXJlY3RvcigpOlNjZW5lLkJhc2VEaXJlY3RvclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBuZXcgTG9hZERpcmN0b3IoKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5jbGFzcyBMb2FkRGlyY3RvciBleHRlbmRzIFNjZW5lLkJhc2VEaXJlY3RvclxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU3RhcnQoKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsb2FkTGlzdDJEID0gW3t1cmw6XCJ1aS9SZXNvdXJjZS9Mb2FkVUkuanNvblwiLHR5cGU6TGF5YS5Mb2FkZXIuSlNPTn0se3VybDpcInVpL1Jlc291cmNlL2xvY2FsY29tcC5hdGxhc1wiLHR5cGU6TGF5YS5Mb2FkZXIuQVRMQVN9XTtcclxuICAgICAgICB0aGlzLkNoYW5nZUdhbWVQbGF5KCBuZXcgU2NlbmUuTG9hZFNjZW5lTG9naWMobG9hZExpc3QyRCxudWxsLG5ldyBMb2FkU2NlbmVQbGF5ZSgpKSApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBFbmQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBSZVN0YXJ0KCk6dm9pZFxyXG4gICAge1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+WKoOi9veWcuuaZr+mAu+i+kVxyXG5jbGFzcyBMb2FkU2NlbmVQbGF5ZSBleHRlbmRzIFNjZW5lLkJhc2VTY2VuZVBsYXllXHJcbntcclxuICAgIHByaXZhdGUgbV9Db3VudDJETG9hZDpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fQ291bnQzRExvYWQ6bnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX0xvYWRGYWlsZTpzdHJpbmc7XHJcbiAgICBwcml2YXRlIG1fQ291bnRWYWx1ZTpudW1iZXI7XHJcbiAgICBwcml2YXRlIG1fTG9hZGluZ1VJOkxvYWRpbmdVSTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50MkRMb2FkID0gMDtcclxuICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMubV9Db3VudFZhbHVlID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIFN0YXJ0TG9hZCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkRmFpbGUgPSBcIlwiO1xyXG4gICAgICAgIHZhciByZXNvdXJjZTJEQXJyID0gW1xyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVJhbmtcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwidG9vbEl0ZW1cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0RGVwYXRoVUlKUyhcIkNoYXJhY3RlclwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiUGxheWVyTGlzdFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXREZXBhdGhVSUpTKFwiQkdcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImVudGVyc2NlbmV1aVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiZW50ZXJzY2VuZXVpL3JlczFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImVudGVyc2NlbmV1aS9yZXMyXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJlbnRlcnNjZW5ldWkvcmVzM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRBdGxQYXRoKFwiZW50ZXJzY2VuZXVpL3JlczRcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImVudGVyc2NlbmV1aS9yZXM1XCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEF0bFBhdGgoXCJlbnRlcnNjZW5ldWkvZ2tcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0QXRsUGF0aChcImNvbXBcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0SnNvblBhdGgoXCJDaGFyYWN0ZXJJbmZvXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldEpzb25QYXRoKFwiSXRlbUluZm9cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0SnNvblBhdGgoXCJMZXZlbEluZm9cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0SnNvblBhdGgoXCJMZXZlbEluZm9cIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0SnNvblBhdGgoXCJMZXZlbEl0ZW1SYW5nZVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRTb3VuZHBhdGhVSUpTKFwiYmdcIilcclxuICAgICAgICBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIExheWEubG9hZGVyLm9uY2UoTGF5YS5FdmVudC5FUlJPUix0aGlzLHRoaXMub25FcnJvcik7XHJcbiAgICAgICAgTGF5YS5sb2FkZXIub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5vbkNvbXBsZXRlKTtcclxuICAgICAgICB2YXIgcmVzb3VyY2UzREFyciA9IFsgXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJjMDAxX2NoaWxkXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV9iYWJ5XzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV9hZHVsdF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDFfc2VuaW9yXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMV90ZWVuXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiYzAwMl9jaGlsZF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDJfYmFieV8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImMwMDJfdGVlbl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wMlwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfYmFycmllcl8wNFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcImRpenVvX3FpdTAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwiZGl6dW9fcWl1MDJcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJkaXp1b19xaXUwM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wMlwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIkwwMV9zcHJfcGxhdF8wM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInpoYW5nYWl3dV9xaXUwMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInpoYW5nYWl3dV9xaXUwMlwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInpoYW5nYWl3dV9xaXUwM1wiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcInpoYW5nYWl3dV9xaXUwNFwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fY29pbl8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fZmx5ZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJpdGVtX3NoaWVsZF8wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fdW50b3VjaGFibGVfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX2Nob21wZXJfMDFcIiksXHJcbiAgICAgICAgICAgIHBhdGguR2V0TEgoXCJ0cmFwX2VudGFuZ2xlXzAxXCIpLFxyXG4gICAgICAgICAgICBwYXRoLkdldExIKFwidHJhcF9zdGluZ18wMVwiKSxcclxuICAgICAgICAgICAgcGF0aC5HZXRMSChcIml0ZW1fYWJzb3JkXzAxXCIpLFxyXG4gICAgICAgIF1cclxuICAgICAgICB0aGlzLkxvYWQocmVzb3VyY2UyREFycixyZXNvdXJjZTNEQXJyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIExvYWQoYXJyMkQ6QXJyYXk8YW55PiA9IG51bGwsYXJyM0Q6QXJyYXk8YW55Pj1udWxsKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKGFycjJEIT1udWxsKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS5sb2FkZXIubG9hZChhcnIyRCxudWxsLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uMkRQcm9ncmVzcyxudWxsLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMubV9Db3VudFZhbHVlIC09MC41O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhcnIzRCE9bnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEubG9hZGVyLmNyZWF0ZShhcnIzRCxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsbnVsbCksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub24zRFByb2dyZXNzLG51bGwsZmFsc2UpKTtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID0gMDtcclxuICAgICAgICAgICAgdGhpcy5tX0NvdW50VmFsdWUgLT0wLjU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb24zRFByb2dyZXNzKHZhbHVlOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLm1fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm1fQ291bnQzRExvYWQgPXZhbHVlLzI7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5WYWx1ZSA9ICh0aGlzLm1fQ291bnQyRExvYWQgKyB0aGlzLm1fQ291bnQzRExvYWQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbjJEUHJvZ3Jlc3ModmFsdWU6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMubV9Mb2FkRmFpbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9dmFsdWUvMjtcclxuICAgICAgICB0aGlzLm1fTG9hZGluZ1VJLlZhbHVlID0gKHRoaXMubV9Db3VudDJETG9hZCArIHRoaXMubV9Db3VudDNETG9hZCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uRXJyb3Ioc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fTG9hZEZhaWxlICs9IHN0cjtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiTG9hZEVycm9yOlwiK3N0cik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uQ29tcGxldGUoZGF0YSlcclxuICAgIHsgICBcclxuICAgICAgICBpZih0aGlzLm1fTG9hZEZhaWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIHRoaURpciA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMubV9Mb2FkaW5nVUkuUmVsb2FkKHRoaXMubV9Mb2FkRmFpbGUsZnVuY3Rpb24oKTp2b2lke3RoaURpci5Mb2FkKCl9ICk7XHJcbiAgICAgICAgfWVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQkcgPSBuZXcgQkcoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWRpbmdVSS5Db21wbGV0ZSgoKT0+e0d1aWRlck1hbmFnZXIuTWdyLkVudGVyU2NlbmUoKX0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBTdGFydCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmdVSSA9IEFQUC5VSU1hbmFnZXIuU2hvdzxMb2FkaW5nVUk+KExvYWRpbmdVSSk7XHJcbiAgICAgICAgdGhpcy5tX0NvdW50M0RMb2FkID0gMC41O1xyXG4gICAgICAgIHRoaXMubV9Db3VudDJETG9hZCA9IDAuNTtcclxuICAgICAgICB0aGlzLm1fQ291bnRWYWx1ZSA9IDE7XHJcbiAgICAgICAgdGhpcy5tX0xvYWRGYWlsZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5TdGFydExvYWQoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIEVuZCgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2FkQ29tcGxldGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBGU00gfSBmcm9tIFwiLi8uLi9CYXNlL0ZTTVwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCJcclxuaW1wb3J0IFVJTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCJcclxuaW1wb3J0IFNjZW5lTWFuYWdlciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiO1xyXG5leHBvcnQgbW9kdWxlIFNjZW5lIHtcclxuICAgIGV4cG9ydCBjbGFzcyBTY2VuZUZTTSBleHRlbmRzIEZTTS5GU008QmFzZVNjZW5lPlxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL+WcuuaZr+S7o+eQhlxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTY2VuZSBleHRlbmRzIEZTTS5TdGF0ZSB7XHJcbiAgICAgICAgcHJpdmF0ZSBfU3RhcnRHYW1lVGltZTogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENvdW50OiBudW1iZXI7XHJcbiAgICAgICAgcHJpdmF0ZSBfVGltZVVwQ2xvY2s6IG51bWJlcjtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG1fU2NlbmVPYmo6IExheWEuU2NlbmUzRDtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9EaXJlY3RvcjogQmFzZURpcmVjdG9yO1xyXG4gICAgICAgIHByb3RlY3RlZCBtX01lc3NhZ2U6IE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0IFNjZW5lT2JqKCk6IExheWEuU2NlbmUzRCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fU2NlbmVPYmo7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBnZXQgRGlyZWN0b3IoKTogQmFzZURpcmVjdG9yIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubV9EaXJlY3RvcjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBhYnN0cmFjdCBHZW5EaXJlY3RvcigpOiBCYXNlRGlyZWN0b3I7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBQdXRPYmooc3ByaXRlM0Q6IExheWEuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5tX1NjZW5lT2JqKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fU2NlbmVPYmouYWRkQ2hpbGQoc3ByaXRlM0QpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJCYXNlU2NlbmUgUHV0T2JqIEVycm9yOmVtcHR5IFNwcml0ZTNEXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMubV9EaXJlY3RvciA9IHRoaXMuR2VuRGlyZWN0b3IoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0RpcmVjdG9yLlN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgRW5kKCk6IHZvaWQge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5TY2VuZU9iaikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5TY2VuZU9iai5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAodGhpcy5TY2VuZU9iai5udW1DaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RvciA9IHRoaXMuU2NlbmVPYmouZ2V0Q2hpbGRBdCgwKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rvci5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5EaXJlY3Rvci5FbmQoKTtcclxuICAgICAgICAgICAgQVBQLlVJTWFuYWdlci5DbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFVwZGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9EaXJlY3RvcilcclxuICAgICAgICAgICAgICAgIHRoaXMubV9EaXJlY3Rvci5VcGRhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlRGlyZWN0b3IgZXh0ZW5kcyBGU00uRlNNPEJhc2VTY2VuZVBsYXllPlxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgX1N0YXJ0R2FtZVRpbWU6IG51bWJlcjtcclxuICAgICAgICBwcml2YXRlIF9UaW1lVXBDb3VudDogbnVtYmVyO1xyXG4gICAgICAgIHByaXZhdGUgX1RpbWVVcENsb2NrOiBudW1iZXI7XHJcbiAgICAgICAgcHJvdGVjdGVkIG1fTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcblxyXG4gICAgICAgIC8v56eB5pyJ5bGe5oCn5ZKM5Yqf6IO9XHJcbiAgICAgICAgZ2V0IEdhbWVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9UaW1lVXBDbG9jayAtIHRoaXMuX1N0YXJ0R2FtZVRpbWUgLSB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgLSB0aGlzLl9TdGFydEdhbWVUaW1lIC0gdGhpcy5fVGltZVVwQ291bnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0IEdhbWVUaW1lKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZXQgQ3VyR2FtZVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX1N0YXJ0R2FtZVRpbWUgKyB0aGlzLl9UaW1lVXBDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENvdW50ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuX1RpbWVVcENsb2NrID0gLTE7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBSZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLlN0YXJ0VGltZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0VGltZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLl9TdGFydEdhbWVUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5fU3RhcnRHYW1lVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBhYnN0cmFjdCBTdGFydCgpOiB2b2lkIDtcclxuICAgICAgICBwdWJsaWMgYWJzdHJhY3QgRW5kKCk6IHZvaWQ7XHJcblxyXG4gICAgICAgIHB1YmxpYyBUaW1lVXAoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL0FQUC5NZXNzYWdlQ2VudGVyLlRyaWdnZXIoR2FtZUV2ZW50LkdhbWVUaW1lVXApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9UaW1lVXBDbG9jayA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdXBlci5VcGRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIENvbnRpbnVlVGltZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgLy9BUFAuTWVzc2FnZUNlbnRlci5UcmlnZ2VyKEdhbWVFdmVudC5HYW1lQ29udGludWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9UaW1lVXBDb3VudCArPSBBUFAuVGltZU1hbmFnZXIuR2FtZVRpbWUgLSB0aGlzLl9UaW1lVXBDbG9jaztcclxuICAgICAgICAgICAgdGhpcy5fVGltZVVwQ2xvY2sgPSAtMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog5YiH5o2i5Ymn5pysXHJcbiAgICAgICAgICogQHBhcmFtIG5ld1NjZW5lUGxheSDmlrDliafmnKxcclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgQ2hhbmdlR2FtZVBsYXkoIG5ld1NjZW5lUGxheTpCYXNlU2NlbmVQbGF5ZSApOiB2b2lkICB7XHJcbiAgICAgICAgICAgIHRoaXMuQ2hhbmdlU3RhdGUobmV3U2NlbmVQbGF5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VTY2VuZVBsYXllIGV4dGVuZHMgRlNNLlN0YXRlIHtcclxuICAgICAgICBwcm90ZWN0ZWQgbV9NZXNzYWdlOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcjtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubV9NZXNzYWdlID0gRnJhbWVXb3JrLkZNLkdldE1hbmFnZXI8TWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI+KE1lc3NhZ2VNRC5NZXNzYWdlQ2VudGVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIExvYWRTY2VuZUxvZ2ljIGV4dGVuZHMgQmFzZVNjZW5lUGxheWUge1xyXG4gICAgICAgIHByaXZhdGUgbV9Mb2FkMkRMaXN0OiBhbnlbXTtcclxuICAgICAgICBwcml2YXRlIG1fTG9hZDNETGlzdDogYW55W107XHJcbiAgICAgICAgcHJpdmF0ZSBtX05leHRTY2VuZTogU2NlbmUuQmFzZVNjZW5lUGxheWU7XHJcbiAgICAgICAgcHVibGljIGdldCBPd25lckRpcmVjdG9yKCk6IEJhc2VEaXJlY3RvciB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1fb3duZXIgYXMgQmFzZURpcmVjdG9yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBcclxuICAgICAgICAgKiBAcGFyYW0gbG9hZDJETGlzdCAyROWKoOi9veWIl+ihqFxyXG4gICAgICAgICAqIEBwYXJhbSBsb2FkM0RMaXN0IDNE5Yqg6L295YiX6KGoXHJcbiAgICAgICAgICogQHBhcmFtIG5leHRTY2VuZSDkuIvkuIDmoLzlnLrmma9cclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdHJ1Y3Rvcihsb2FkMkRMaXN0OiBhbnlbXSwgbG9hZDNETGlzdDogYW55W10sIG5leHRTY2VuZTogU2NlbmUuQmFzZVNjZW5lUGxheWUpIHtcclxuICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5tX0xvYWQyRExpc3QgPSBsb2FkMkRMaXN0O1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZDNETGlzdCA9IGxvYWQzRExpc3Q7XHJcbiAgICAgICAgICAgIHRoaXMubV9OZXh0U2NlbmUgPSBuZXh0U2NlbmU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgVXBkYXRlKCkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBFbmQoKSB7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIFN0YXJ0KCkge1xyXG4gICAgICAgICAgICBMYXlhLmxvYWRlci5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsIHRoaXMsIHRoaXMuTG9hZENvbXBsZXRlKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubV9Mb2FkMkRMaXN0KVxyXG4gICAgICAgICAgICAgICAgTGF5YS5sb2FkZXIubG9hZCh0aGlzLm1fTG9hZDJETGlzdCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1fTG9hZDNETGlzdClcclxuICAgICAgICAgICAgICAgIExheWEubG9hZGVyLmxvYWQodGhpcy5tX0xvYWQzRExpc3QsIG51bGwsIG51bGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBMb2FkQ29tcGxldGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuT3duZXJEaXJlY3Rvci5DaGFuZ2VTdGF0ZSh0aGlzLm1fTmV4dFNjZW5lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwiLi8uLi8uLi9TY2VuZS9TY2VuZVwiXHJcbmltcG9ydCBTY2VuZU1hbmFnZXIgZnJvbSBcIi4vLi4vLi4vRnJhbWVXb3JrL1NjZW5lTWFuYWdlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBFbmRHYW1lVUkgZnJvbSBcIi4vLi4vLi4vdWkvRW5kR2FtZVVJXCJcclxuaW1wb3J0IHsgTWVzc2FnZU1EIH0gZnJvbSBcIi4vLi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQgR2FtZUNhbWVyYSBmcm9tIFwiLi8uLi8uLi9HYW1lL0dhbWVDYW1lcmFcIlxyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLy4uLy4uL0dhbWUvUGxheWVyXCJcclxuaW1wb3J0IHsgSW5wdXQgfSBmcm9tIFwiLi8uLi8uLi9HYW1lL0lucHV0XCJcclxuaW1wb3J0IHsgR2FtZVN0cnVjdCB9IGZyb20gXCIuLy4uLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHYW1lVUkgZnJvbSBcIi4vLi4vLi4vdWkvR2FtZVVJXCJcclxuaW1wb3J0IE1vdW50TGluZSBmcm9tIFwiLi8uLi8uLi9HYW1lL01vdW50TGluZVwiXHJcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi8uLi8uLi9HYW1lL0dhbWVJdGVtXCJcclxuaW1wb3J0IFN0ZXAgZnJvbSBcIi4vLi4vLi4vR2FtZS9TdGVwXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcbmltcG9ydCBCR1VJIGZyb20gXCIuLy4uLy4uL3VpL0JHXCJcclxuaW1wb3J0IEdhbWVEaXJlY3RvciBmcm9tIFwiLi8uLi9HYW1lRGlyZWN0b3JcIlxyXG5pbXBvcnQgR2FtZVNjZW5lIGZyb20gXCIuLi9HYW1lU2NlbmVcIjtcclxuaW1wb3J0IHsgR2FtZUFnZW50IH0gZnJvbSBcIi4vLi4vLi4vQWdlbnQvR2FtZUFnZW50XCJcclxuaW1wb3J0IEdhbWVBUFAgZnJvbSBcIi4uLy4uL2NvbnRyb2xlci9HYW1lQVBQXCI7XHJcbmltcG9ydCB7IFdlY2hhdE9wZW4gfSBmcm9tIFwiLi4vLi4vcGxhdGZvcm0vV2VjaGF0T3BlblwiO1xyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiO1xyXG5pbXBvcnQgR2FtZW1hcCBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lTWFwXCI7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi4vLi4vR2FtZS9HYW1lTW9kdWxlXCI7XHJcbmltcG9ydCB7IE1vZGVsRnVuYyB9IGZyb20gXCIuLi8uLi9VdGlsaXR5L01vZGVsRnVuY1wiO1xyXG5cclxudHlwZSBMaW5lSXRlbUluZm8gPSBJdGVtLkxpbmVJdGVtSW5mbztcclxudmFyIEl0ZW1UeXBlID0gSXRlbS5JdGVtVHlwZTtcclxudmFyIEZhbGxUaW1lOiBudW1iZXIgPSAyO1xyXG52YXIgbGluZU51bTogbnVtYmVyID0gOTtcclxudmFyIGNvbHVtbjogbnVtYmVyID0gNTtcclxuXHJcbi8v5ri45oiP5a+85ryUXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTY2VuZVBsYXkgZXh0ZW5kcyBTY2VuZS5CYXNlU2NlbmVQbGF5ZSB7XHJcbiAgICAvL+WGhemDqOWKn+iDvVxyXG4gICAgcHJpdmF0ZSBfQ291bnRGbG9vclRpbWU6IG51bWJlcjtcclxuICAgIHByaXZhdGUgX1N0YXJ0UG9zaXRpb246IExheWEuVmVjdG9yMztcclxuICAgIHByaXZhdGUgX0dhbWVVcGRhdGU6ICgpID0+IHZvaWQ7XHJcbiAgICBwcml2YXRlIF9QYW5lbFVJOiBHYW1lVUk7XHJcbiAgICBwcml2YXRlIG1fR29sZE51bTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfTG9naWNHb2xkTnVtOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9DdXJCRzogQkdVSTtcclxuICAgIHByaXZhdGUgX1NhZmVMb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb247XHJcbiAgICBwcml2YXRlIG1fR2FtZU1hcDogR2FtZW1hcDtcclxuICAgIHByaXZhdGUgbV9Cb290b21GbG9vcjogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBtX1N0YXJ0Rmxvb3I6IG51bWJlcjtcclxuXHJcbiAgICBDYW1lcmE6IEdhbWVDYW1lcmE7XHJcbiAgICBQbGF5ZXI6IFBsYXllcjtcclxuICAgIElucHV0Q3RybDogSW5wdXQuQmFzZUdhbWVJbnB1dDtcclxuICAgIEN1ckxpbmVCYXJyaWVyczogQXJyYXk8TGluZUl0ZW1JbmZvPjtcclxuICAgIG5hbWU6IG51bWJlcjtcclxuICAgIEZyZXNoQkdDb3VudDogbnVtYmVyO1xyXG4gICAgZ2V0IGdhbWVNYXAoKTogR2FtZW1hcCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9HYW1lTWFwO1xyXG4gICAgfVxyXG4gICAgZ2V0IENvbHVtc051bSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBjb2x1bW47XHJcbiAgICB9XHJcbiAgICBnZXQgU2FmZUxvY2F0aW9uKCk6IEdhbWVTdHJ1Y3QuTUxvY2F0aW9uIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU2FmZUxvY2F0aW9uO1xyXG4gICAgfVxyXG4gICAgZ2V0IFBhbmVsVUkoKTogR2FtZVVJIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fUGFuZWxVSTtcclxuICAgIH1cclxuICAgIHNldCBQYW5lbFVJKHZhbHVlOiBHYW1lVUkpIHtcclxuICAgICAgICB2YWx1ZS5TZXRMZWZ0VG91Y2godGhpcywgKCkgPT4geyBNb2RlbEZ1bmMudmlicmF0ZSgyNSk7dGhpcy5JbnB1dEN0cmwuSW5wdXQoZmFsc2UpOyB9KVxyXG4gICAgICAgIHZhbHVlLlNldFJpZ2h0VG91Y2godGhpcywgKCkgPT4geyBNb2RlbEZ1bmMudmlicmF0ZSgyNSk7dGhpcy5JbnB1dEN0cmwuSW5wdXQodHJ1ZSk7IH0pO1xyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldCBQbGF5ZXJGbG9vcigpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBmbG9vcjogbnVtYmVyID0gdGhpcy5fU3RhcnRQb3NpdGlvbi56IC0gdGhpcy5QbGF5ZXIuTG9naWNQb3NpdGlvbi56O1xyXG4gICAgICAgIGZsb29yID0gZmxvb3IgLyBHYW1lTW9kdWxlLkRTcGFjZTtcclxuICAgICAgICBmbG9vciA9IE1hdGgucm91bmQoZmxvb3IpO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmFicyhmbG9vcik7XHJcbiAgICB9XHJcbiAgICBnZXQgRGlzdGFuY2UoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLlBsYXllckZsb29yKVxyXG4gICAgfVxyXG4gICAgZ2V0IFBsYXllckZsb29yTGluZSgpOiBNb3VudExpbmUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLkdldEZsb29yQnlGbG9vcih0aGlzLlBsYXllckZsb29yKTtcclxuICAgIH1cclxuICAgIGdldCBHYW1lVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAodGhpcy5tX293bmVyIGFzIEdhbWVEaXJlY3RvcikuR2FtZVRpbWU7XHJcbiAgICB9XHJcbiAgICBnZXQgR2FtZUdvbGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tX0dvbGROdW07XHJcbiAgICB9XHJcbiAgICBnZXQgQ291bnRGbG9vclRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICB0aGlzLm1fQm9vdG9tRmxvb3IgPSB0aGlzLm1fQm9vdG9tRmxvb3IgPCB0aGlzLm1fR2FtZU1hcC5UYWlsRkxvb3IuRmxvb3JOdW0gPyB0aGlzLm1fR2FtZU1hcC5UYWlsRkxvb3IuRmxvb3JOdW0gOnRoaXMubV9Cb290b21GbG9vcjtcclxuICAgICAgICB2YXIgYmV0d2VlbjogbnVtYmVyID0gdGhpcy5EaXN0YW5jZSArIHRoaXMubV9TdGFydEZsb29yIC0gdGhpcy5tX0Jvb3RvbUZsb29yO1xyXG4gICAgICAgIHZhciByYW5nZU51bTogbnVtYmVyID0gMjtcclxuICAgICAgICBiZXR3ZWVuID0gYmV0d2VlbiA+IHJhbmdlTnVtID8gcmFuZ2VOdW0gOiBiZXR3ZWVuO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9Db3VudEZsb29yVGltZSAtIGJldHdlZW4gLyByYW5nZU51bSAqIEZhbGxUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5DdXJMaW5lQmFycmllcnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0NvdW50Rmxvb3JUaW1lID0gMDtcclxuICAgICAgICB0aGlzLl9TdGFydFBvc2l0aW9uID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgIHRoaXMuX1BhbmVsVUkgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX0N1ckJHID0gQVBQLlNjZW5lTWFuYWdlci5CRyBhcyBCR1VJO1xyXG4gICAgICAgIHRoaXMuRnJlc2hCR0NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLm1fR2FtZU1hcCA9IG5ldyBHYW1lbWFwKGxpbmVOdW0sIGNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5tX1N0YXJ0Rmxvb3IgPSAyO1xyXG4gICAgfVxyXG5cclxuICAgIEFkZElucHV0Q3RybGVyKHZhbHVlOiBJbnB1dC5CYXNlR2FtZUlucHV0KSB7XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwuQ2xlYXIoKTtcclxuICAgICAgICB2YWx1ZS5OZXh0SW5wdXQgPSB0aGlzLklucHV0Q3RybDtcclxuICAgICAgICB0aGlzLklucHV0Q3RybCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIFBvcElucHV0Q3RybGVyKCkge1xyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gdGhpcy5JbnB1dEN0cmwuTmV4dElucHV0O1xyXG4gICAgfVxyXG5cclxuICAgIEFkZEdvbGQobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fR29sZE51bSArPSBudW07XHJcbiAgICAgICAgdGhpcy5BZGRMb2dpY0dvbGQobnVtKTtcclxuICAgIH1cclxuXHJcbiAgICBBZGRHb2xkVW5Mb2dpY0dvbGQobnVtOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLm1fR29sZE51bSArPSBudW07XHJcbiAgICB9XHJcblxyXG4gICAgQWRkTG9naWNHb2xkKG51bTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fTG9naWNHb2xkTnVtICs9IG51bTtcclxuICAgICAgICB0aGlzLlBhbmVsVUkuR29sZCA9IHRoaXMuX0xvZ2ljR29sZE51bTtcclxuICAgICAgICBXZWNoYXRPcGVuLmdldEluc3RhbmNlcygpLmRyYXdwYXNzKHRoaXMuX0xvZ2ljR29sZE51bSArIEdhbWVBZ2VudC5BZ2VudC5DdXJTY29yZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/orr7nva7lronlhajkvY3nva5cclxuICAgIFNldFNhZmVQUyhsb2NhdGlvbjogR2FtZVN0cnVjdC5NTG9jYXRpb24pIHtcclxuICAgICAgICB0aGlzLm1fR2FtZU1hcC5TZXRTYWZlUFMobG9jYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIERlYXRoKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlBsYXllckRlYXRoID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLk9uR2FtZUNvbXBsZXRlKCk7XHJcbiAgICAgICAgLy91aS5TZXRHYW1lSW5mbyh0aGlzLlBsYXllckRpc3RhbmNlLHRoaXMuX0dvbGROdW0pO1xyXG4gICAgfVxyXG5cclxuICAgIEVuZCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy/ph43mlrDlvIDlp4tcclxuICAgIFJlU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5TdGFydEdhbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICBTaG93SW5wdXRJbmZvKGluZm86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5TaG93SW5wdXRJbmZvKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bem5Y+z56e75YqoXHJcbiAgICBNb3ZlU3RlcChpc1JpZ2h0OiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuUGxheWVyLkN1clN0ZXAubG9ja2VkIHx8IHRoaXMuUGxheWVyLkxvY2tlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8v6I635Y+W5LiL5LiA5bGC55qEU3RlcFxyXG4gICAgICAgIHZhciBzdGVwOiBTdGVwID0gdGhpcy5QbGF5ZXIuQ3VyU3RlcDtcclxuICAgICAgICBpZiAoc3RlcCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzUmlnaHQpIHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAuUmlnaHRQYXJlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3RlcCA9IHN0ZXAuTGVmdFBhcmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdGVwID09IG51bGwgfHwgc3RlcC5TdGVwSXRlbS5Jc0ZvcmJpZGVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5QbGF5ZXIuQmFzZUN0cmxlci5UaW1lID4gMCkgICAgIFxyXG4gICAgICAgICAgICB0aGlzLlBsYXllci5DdXJTdGVwLlN0YW5kT25Hcm91bmQoKTtcclxuICAgICAgICB0aGlzLlBsYXllci5MYXlTdGVwKHN0ZXApO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlN0YXJ0TW92ZSgpO1xyXG4gICAgICAgIHZhciBuZXh0Rmxvb3JEaXIgPSBpc1JpZ2h0ID8gMSA6IC0xO1xyXG4gICAgICAgIHRoaXMubV9HYW1lTWFwLlB1c2hGTG9vcihuZXh0Rmxvb3JEaXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5bGC5pWw6I635Y+W5p+Q5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmxvb3IgXHJcbiAgICAgKi9cclxuICAgIEdldEZsb29yQnlGbG9vcihmbG9vcjogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubV9HYW1lTWFwLkdldEZsb29yQnlGbG9vcihmbG9vcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgJrov4flnZDmoIfojrflj5blj7DpmLZcclxuICAgICAqIEBwYXJhbSBsb2NhdGlvbiDntKLlvJUs5bGC5pWwXHJcbiAgICAgKi9cclxuICAgIEdldFN0ZXBCeUxvY2F0aW9uKGxvY2F0aW9uOiBHYW1lU3RydWN0Lk1Mb2NhdGlvbiwgcmlnaHRTd2l0Y2hOdW06IG51bWJlciA9IDApOiBTdGVwIHtcclxuICAgICAgICBpZiAocmlnaHRTd2l0Y2hOdW0gKiByaWdodFN3aXRjaE51bSA+IDAuMDAxKSB7XHJcbiAgICAgICAgICAgIHZhciBmbG9vcjogTW91bnRMaW5lID0gdGhpcy5HZXRGbG9vckJ5Rmxvb3IobG9jYXRpb24uWSk7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZTogbnVtYmVyID0gTWF0aC5jZWlsKGZsb29yLnJpZ2h0U3dpdGNoIC8gMikgLSBNYXRoLmNlaWwocmlnaHRTd2l0Y2hOdW0gLyAyKTtcclxuICAgICAgICAgICAgdmFyIGZsb29ySWR4OiBudW1iZXIgPSBsb2NhdGlvbi5YIC0gZGlzdGFuY2U7Ly8gLSAoMSArIGZsb29yLk9kZFN3aXRjaCk7XHJcbiAgICAgICAgICAgIHZhciBnZXRTdGVwOiBTdGVwID0gZmxvb3IuR2V0U3RlcChmbG9vcklkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgdmFyIGdldFN0ZXA6IFN0ZXAgPSB0aGlzLkdldEZsb29yQnlGbG9vcihsb2NhdGlvbi5ZKS5HZXRTdGVwKGxvY2F0aW9uLlgpO1xyXG5cclxuICAgICAgICByZXR1cm4gZ2V0U3RlcDtcclxuICAgIH1cclxuXHJcbiAgICAvL+WIm+W7uuebuOWFs+aUvui/mSDov5nph4zph43mlrDlvIDlp4vkuI3kvJrotbBcclxuICAgIHB1YmxpYyBTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkNhbWVyYSA9IG5ldyBHYW1lQ2FtZXJhKCk7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEub3J0aG9ncmFwaGljID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLkNhbWVyYS5vcnRob2dyYXBoaWNWZXJ0aWNhbFNpemUgPSA0MDtcclxuICAgICAgICB0aGlzLkNhbWVyYS50cmFuc2Zvcm0ubG9jYWxSb3RhdGlvbkV1bGVyID0gbmV3IExheWEuVmVjdG9yMygtMzAsIDAsIDApO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMuQ2FtZXJhKTtcclxuICAgICAgICAvL+WIm+W7ulVJXHJcbiAgICAgICAgLy/liJvlu7rnjqnlrrZcclxuICAgICAgICB2YXIgcGxheWVyID0gbmV3IFBsYXllcigpO1xyXG4gICAgICAgIHRoaXMuUGxheWVyID0gcGxheWVyO1xyXG4gICAgICAgIHZhciBnYW1lQWdlbnQgPSBHYW1lQWdlbnQuQWdlbnQ7XHJcbiAgICAgICAgdmFyIHBsYXllck1vZGVsID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3IuR2V0Q2hhcmFjdGVyTW9kZWwoZ2FtZUFnZW50LkN1ckNoYXJhY3RlcklEKTtcclxuICAgICAgICBwbGF5ZXIuU2V0UGxheWVyTW9kZWwocGxheWVyTW9kZWwpO1xyXG4gICAgICAgIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuUHV0T2JqKHRoaXMuUGxheWVyKTtcclxuICAgICAgICBcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlB1dE9iaih0aGlzLm1fR2FtZU1hcCk7XHJcbiAgICAgICAgLy/lh4blpIfnjqnlrrbmrbvkuqHkuovku7ZcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgsIHRoaXMuRGVhdGgsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLlN0YXJ0R2FtZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6L+b5YWl5ri45oiP55qE6K6+572u5pS+6L+Z6YeMIOmHjeaWsOW8gOWni+i1sOi/memHjFxyXG4gICAgcHJvdGVjdGVkIFN0YXJ0R2FtZSgpIHtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkN1clNjZW5lLlNjZW5lT2JqLmFtYmllbnRDb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgMSwgMSlcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuUmVzZXRHYW1lSXRlbSgpO1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5SZXNldFNraWxsSXRlbSgpO1xyXG4gICAgICAgIHRoaXMuX1NhZmVMb2NhdGlvbiA9IG5ldyBHYW1lU3RydWN0Lk1Mb2NhdGlvbigwLCAwKTtcclxuICAgICAgICAvL+WIm+W7uui+k+WFpeaOp+WItuWZqFxyXG4gICAgICAgIHRoaXMuSW5wdXRDdHJsID0gbmV3IElucHV0Lk5vcm1HYW1lSW5wdXQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUmVzZXQoKTtcclxuICAgICAgICB2YXIgc3RhcnRGbG9vcjogbnVtYmVyID0gdGhpcy5tX1N0YXJ0Rmxvb3I7XHJcbiAgICAgICAgdmFyIGNhbWVyYUJhc2VQUzpMYXlhLlZlY3RvcjMgPSB0aGlzLm1fR2FtZU1hcC5Jbml0KHN0YXJ0Rmxvb3IsdGhpcy5DYW1lcmEsMzApO1xyXG4gICAgICAgIHRoaXMuUGxheWVyLlNldFN0ZXAodGhpcy5tX0dhbWVNYXAuR2V0U2FmZVN0ZXAoKSk7XHJcbiAgICAgICAgdGhpcy5tX0dhbWVNYXAuU2V0UGxheWVyKHRoaXMuUGxheWVyKTtcclxuICAgICAgICB2YXIgY2FtZXJhUHM6TGF5YS5WZWN0b3IzID0gdGhpcy5QbGF5ZXIuUG9zaXRpb24uY2xvbmUoKTtcclxuICAgICAgICBjYW1lcmFQcy55IC09IEdhbWVNb2R1bGUuVlNwYWNlKjI7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEudHJhbnNmb3JtLnBvc2l0aW9uID0gY2FtZXJhUHM7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuSW5pdCgpO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0UG9zaXRpb24gPSB0aGlzLlBsYXllci5Qb3NpdGlvbjtcclxuICAgICAgICAvL3RoaXMuQ2FtZXJhLlJlc2V0KG5ldyBMYXlhLlZlY3RvcjMoKSwgbmV3IExheWEuVmVjdG9yMygwLCBHYW1lTW9kdWxlLkhTcGFjZSAqIDMuMiwgR2FtZU1vZHVsZS5IU3BhY2UgKiAzLjIpLCB0aGlzLlBsYXllcik7XHJcbiAgICAgICAgdGhpcy5DYW1lcmEuUmVzZXQobmV3IExheWEuVmVjdG9yMygpLCBjYW1lcmFCYXNlUFMsIHRoaXMuUGxheWVyKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm1fR29sZE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy5fTG9naWNHb2xkTnVtID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5QYW5lbFVJID0gQVBQLlVJTWFuYWdlci5TaG93KEdhbWVVSSk7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLlJlZ2lzdENsaWNrUGxheWVySXRlbSh0aGlzLCB0aGlzLlVzZVBsYXllckl0ZW0pO1xyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5SZWdpc3RDbGlja1NraWxsSXRlbSh0aGlzLCB0aGlzLlVzZVNraWxsSXRlbSk7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkdvbGQgPSAwO1xyXG4gICAgICAgIHRoaXMuX0NvdW50Rmxvb3JUaW1lID0gdGhpcy5HYW1lVGltZSArIDQ7XHJcbiAgICAgICAgdGhpcy5fR2FtZVVwZGF0ZSA9IHRoaXMuX1N0YXJ0Q291bnQ7XHJcbiAgICAgICAgV2VjaGF0T3Blbi5nZXRJbnN0YW5jZXMoKS5kcmF3cGFzcygwKTtcclxuICAgICAgICB0aGlzLm1fQm9vdG9tRmxvb3IgPSBzdGFydEZsb29yO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBVcGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX0dhbWVVcGRhdGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9HYW1lVXBkYXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b6q546v6K6+572u5bGC5Y+w6Zi2XHJcbiAgICAgKiBAcGFyYW0gZmxvb3Ig5bGCXHJcbiAgICAgKiBAcGFyYW0gT3duZXIgXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2sg5b6q546v5omn6KGM5Zue6LCDXHJcbiAgICAgKi9cclxuICAgIExvb3BEb0Zsb29yU3RlcChmbG9vcjogbnVtYmVyLCBPd25lcjogYW55LCBjYWxsQmFjazogKHN0ZXA6IFN0ZXApID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm1fR2FtZU1hcC5Mb29wRG9GbG9vclN0ZXAoZmxvb3IsIE93bmVyLCBjYWxsQmFjayk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mraPluLjov5DooYzml7bnmoTmr4/luKfpgLvovpFcclxuICAgIHByaXZhdGUgX1J1bkdhbWVVcGRhdGUoKSB7XHJcbiAgICAgICAgdmFyIGRpc3Q6IG51bWJlciA9IHRoaXMuUGxheWVyRmxvb3I7XHJcbiAgICAgICAgdGhpcy5QYW5lbFVJLkRpc3RhbmNlID0gdGhpcy5EaXN0YW5jZTtcclxuICAgICAgICBpZiAodGhpcy5GcmVzaEJHQ291bnQgPiAxMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9DdXJCRy5VcGRhdGVQYWdlKGRpc3QpO1xyXG4gICAgICAgICAgICB0aGlzLkZyZXNoQkdDb3VudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICsrdGhpcy5GcmVzaEJHQ291bnQ7XHJcbiAgICAgICAgdmFyIGREaXN0YW5jZTogbnVtYmVyID0gdGhpcy5tX0dhbWVNYXAuVGFpbEZMb29yLkZsb29yTnVtO1xyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IHRoaXMuUGxheWVyRmxvb3IgLSBkRGlzdGFuY2UgKyA0O1xyXG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDQpIHtcclxuICAgICAgICAgICAgdGhpcy5fUHVzaEZMb29yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5Db3VudEZsb29yVGltZSA8IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudEZsb29yVGltZSA9IEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZSArIEZhbGxUaW1lO1xyXG4gICAgICAgICAgICB0aGlzLl9EZXN0cm95TGluZSh0aGlzLm1fQm9vdG9tRmxvb3IpO1xyXG4gICAgICAgICAgICArK3RoaXMubV9Cb290b21GbG9vcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5JbnB1dEN0cmwuVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lvIDlp4vlgJLorqHml7bmnJ/pl7TnmoTmr4/luKfpgLvovpFcclxuICAgIHByaXZhdGUgX1N0YXJ0Q291bnQoKSB7XHJcbiAgICAgICAgdmFyIHRpbWU6IHN0cmluZyA9IFwiXCJcclxuICAgICAgICB2YXIgY291bnRUaW1lOiBudW1iZXIgPSB0aGlzLl9Db3VudEZsb29yVGltZSAtIEFQUC5UaW1lTWFuYWdlci5HYW1lVGltZTtcclxuICAgICAgICBpZiAoY291bnRUaW1lID4gMC45KVxyXG4gICAgICAgICAgICB0aW1lICs9IE1hdGguZmxvb3IoY291bnRUaW1lKTtcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5QYW5lbFVJLkdhbWVQYW5lbCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX0dhbWVVcGRhdGUgPSB0aGlzLl9SdW5HYW1lVXBkYXRlO1xyXG4gICAgICAgICAgICB0aGlzLl9Db3VudEZsb29yVGltZSA9IHRoaXMuR2FtZVRpbWUgKyBGYWxsVGltZTtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LlJlc2V0R2FtZUl0ZW0oKTtcclxuICAgICAgICAgICAgR2FtZUFnZW50LkFnZW50LlJlc2V0U2tpbGxJdGVtKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuUGFuZWxVSS5TZXRDb3VudFRpbWUodGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/lsIblsYLlkJHkuIrlj6BcclxuICAgIHByb3RlY3RlZCBfUHVzaEZMb29yKCkge1xyXG4gICAgICAgIHRoaXMubV9HYW1lTWFwLlB1c2hGTG9vcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aGM6Zm35p+Q5LiA5bGCXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn1mbG9vciBcclxuICAgICAqL1xyXG4gICAgX0Rlc3Ryb3lMaW5lKGZsb29yOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5tX0dhbWVNYXAuR2V0Rmxvb3JCeUZsb29yKGZsb29yKSkge1xyXG4gICAgICAgICAgICB0aGlzLm1fR2FtZU1hcC5CcmVha0xpbmUoZmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXNlU2tpbGxJdGVtKCkge1xyXG4gICAgICAgIGlmIChHYW1lQWdlbnQuQWdlbnQuU2tpbGxJdGVtTnVtIDwgMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKHRoaXMuUGxheWVyLkN1clN0ZXAubG9ja2VkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LlVzZVNraWxsSXRlbSgpO1xyXG4gICAgICAgIHZhciBjaGFyYWN0ZXJJRDogbnVtYmVyID0gR2FtZUFnZW50LkFnZW50LkN1ckNoYXJhY3RlcklEO1xyXG4gICAgICAgIHZhciBJdGVtSUQ6IG51bWJlciA9IEdhbWVBUFAuQ2hhcmFjdGVyTWdyLkdldEl0ZW1JRChjaGFyYWN0ZXJJRCk7XHJcbiAgICAgICAgdmFyIEl0ZW1UeXBlOiBudW1iZXIgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0SXRlbVR5cGUoSXRlbUlEKTtcclxuICAgICAgICB2YXIgbmV3QnVmZjogSXRlbS5CYXNlUGxheWVyQnVmZiA9IEl0ZW0uSXRlbUJ1ZmZGYWN0b3J5KEl0ZW1UeXBlKTtcclxuICAgICAgICBuZXdCdWZmLkFkZFRvUGxheWVyKHRoaXMuUGxheWVyKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFVzZVBsYXllckl0ZW0oKSB7XHJcbiAgICAgICAgaWYgKEdhbWVBZ2VudC5BZ2VudC5HYW1lSXRlbU51bSA8IDEpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZih0aGlzLlBsYXllci5DdXJTdGVwLmxvY2tlZClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIEdhbWVBZ2VudC5BZ2VudC5Vc2VHYW1lSXRlbSgpO1xyXG4gICAgICAgIHZhciBJdGVtSUQ6IG51bWJlciA9IEdhbWVBZ2VudC5BZ2VudC5DdXJJdGVtO1xyXG4gICAgICAgIHZhciBJdGVtVHlwZTogbnVtYmVyID0gR2FtZUFQUC5JdGVtTWdyLkdldEl0ZW1UeXBlKEl0ZW1JRCk7XHJcbiAgICAgICAgdmFyIG5ld0J1ZmY6IEl0ZW0uQmFzZVBsYXllckJ1ZmYgPSBJdGVtLkl0ZW1CdWZmRmFjdG9yeShJdGVtVHlwZSk7XHJcbiAgICAgICAgbmV3QnVmZi5BZGRUb1BsYXllcih0aGlzLlBsYXllcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbkdhbWVDb21wbGV0ZSgpIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KE1lc3NhZ2VNRC5HYW1lRXZlbnQuUGxheWVyRGVhdGgsIHRoaXMuRGVhdGgsIHRoaXMpO1xyXG4gICAgICAgIHZhciB1aTogRW5kR2FtZVVJID0gQVBQLlVJTWFuYWdlci5TaG93PEVuZEdhbWVVST4oRW5kR2FtZVVJKTtcclxuICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQWRkR29sZCh0aGlzLm1fR29sZE51bSk7XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LkFkZFNjb3JlKHRoaXMubV9Hb2xkTnVtICogMTAgKyB0aGlzLkRpc3RhbmNlICogMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25UaW1lUGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuUGF1c2UoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgT25Db3VudGludWUoKSB7XHJcbiAgICAgICAgdGhpcy5QbGF5ZXIuQ29udGludWUoKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBtb2R1bGUgTW9kZWxGdW5jXHJcbntcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBGaW5kQ2hpbGRCeU5hbWUoIHdpZHRoOm51bWJlciApXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHZpYnJhdGUodmlicmF0ZU51bWJlcikge1xyXG4gICAgICAgIGlmKExheWEuQnJvd3Nlci53aW5kb3cuY29uY2hDb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIG9zID0gTGF5YS5Ccm93c2VyLndpbmRvdy5jb25jaENvbmZpZy5nZXRPUygpO1xyXG4gICAgICAgICAgICB2YXIgYnJpZGdlO1xyXG4gICAgICAgICAgICB2YXIgb2JqID0ge307XHJcbiAgICAgICAgICAgIGlmIChvcyA9PSBcIkNvbmNoLWlvc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBicmlkZ2UgPSBMYXlhLlBsYXRmb3JtQ2xhc3MuY3JlYXRlQ2xhc3MoXCJKU0JyaWRnZVwiKTsvL+WIm+W7uuiEmuatpeS7o+eQhlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9zID09IFwiQ29uY2gtYW5kcm9pZFwiKSB7XHJcbiAgICAgICAgICAgICAgLy/pnIDopoHlrozmlbTnmoTnsbvot6/lvoTvvIzms6jmhI/kuI5pT1PnmoTkuI3lkIxcclxuICAgICAgICAgICAgICBicmlkZ2UgPSBMYXlhLlBsYXRmb3JtQ2xhc3MuY3JlYXRlQ2xhc3MoXCJkZW1vLkpTQnJpZGdlXCIpOy8v5Yib5bu66ISa5q2l5Luj55CGXHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIGlmIChvcyA9PSBcIkNvbmNoLWlvc1wiKSB7XHJcbiAgICAgICAgICAgIC8vICAgLy9pT1Pms6jmhI/lh73mlbDnrb7lkI3vvIzms6jmhI/kuI5BbmRyb2lk55qE5LiN5ZCMXHJcbiAgICAgICAgICAgIC8vICAgYWxlcnQoYnJpZGdlLmNhbGwoXCJ0ZXN0U3RyaW5nOlwiLFwiaGVsbG9cIikpO1xyXG4gICAgICAgICAgICAvLyAgIGFsZXJ0KGJyaWRnZS5jYWxsKFwidGVzdE51bWJlcjpcIiwyNTYuMCkpOyBcclxuICAgICAgICAgICAgLy8gICBhbGVydChicmlkZ2UuY2FsbChcInRlc3RCb29sOlwiLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIC8vICAgb2JqLnZhbHVlID0gXCJIZWxsbyBPQyFcIjtcclxuICAgICAgICAgICAgLy8gICBicmlkZ2UuY2FsbFdpdGhCYWNrKGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZSh2YWx1ZSlcclxuICAgICAgICAgICAgLy8gICAgIGFsZXJ0KG9iai52YWx1ZSk7XHJcbiAgICAgICAgICAgIC8vICAgICB9LFwidGVzdEFzeW5jQ2FsbGJhY2s6XCIsIEpTT04uc3RyaW5naWZ5KG9iaikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG9zID09IFwiQ29uY2gtYW5kcm9pZFwiKSB7XHJcbiAgICAgICAgICAgICAgIGJyaWRnZS5jYWxsKFwidmlicmF0ZVwiLHZpYnJhdGVOdW1iZXIpO1xyXG4gICAgICAgICAgICAvLyAgIGFsZXJ0KGJyaWRnZS5jYWxsKFwidGVzdE51bWJlclwiLDI1Ni4wKSk7XHJcbiAgICAgICAgICAgIC8vICAgYWxlcnQoYnJpZGdlLmNhbGwoXCJ0ZXN0Qm9vbFwiLGZhbHNlKSk7XHJcbiAgICAgICAgICAgIC8vICAgb2JqLnZhbHVlID0gXCJIZWxsbyBKYXZhIVwiO1xyXG4gICAgICAgICAgICAvLyAgIGJyaWRnZS5jYWxsV2l0aEJhY2soZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gICAgIHZhciBvYmogPSBKU09OLnBhcnNlKHZhbHVlKVxyXG4gICAgICAgICAgICAvLyAgICAgYWxlcnQob2JqLnZhbHVlKTtcclxuICAgICAgICAgICAgLy8gICB9LFwidGVzdEFzeW5jQ2FsbGJhY2tcIixKU09OLnN0cmluZ2lmeShvYmopKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFuYXZpZ2F0b3IudmlicmF0ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6ZyHNeenklxyXG4gICAgICAgIC8vbmF2aWdhdG9yLnZpYnJhdGUoNTAwMCk7XHJcbiAgICAgICAgLy/pnIc156eS77yM5YGcMC4z56eS77yM5Zyo6ZyHNOenklxyXG4gICAgICAgIG5hdmlnYXRvci52aWJyYXRlKHZpYnJhdGVOdW1iZXIpO1xyXG4gICAgfVxyXG59XHJcbiAiLCJleHBvcnQgbW9kdWxlIHBhdGgge1xyXG4gICAgZXhwb3J0IHZhciBJc0VkaXRvcjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBleHBvcnQgdmFyIHZlcnNpb246IHN0cmluZyA9IFwiP3Y9NVwiO1xyXG4gICAgZXhwb3J0IHZhciBTY2VuZUFzc2V0UGF0aDogc3RyaW5nID0gXCJMYXlhU2NlbmVfXCI7XHJcbiAgICBleHBvcnQgdmFyIFJlc291cmNlUGF0aDogc3RyaW5nID0gSXNFZGl0b3IgPyBcIk5ldFJlc291cmNlXzNfMjkvXCIgOiBcImh0dHBzOi8vd3d3LmdzamdhbWUuY29tL1Jlc291cmNlL05ldFJlc291cmNlXzNfMjkvXCI7XHJcbiAgICBleHBvcnQgdmFyIFVJUGF0aDogc3RyaW5nID0gUmVzb3VyY2VQYXRoICsgXCJVSS9cIjtcclxuICAgIGV4cG9ydCB2YXIgTW9kZWxQYXRoOiBzdHJpbmcgPSBSZXNvdXJjZVBhdGggKyBcIjNEL1wiXHJcbiAgICBleHBvcnQgdmFyIENvbmZpZ1BhdGg6IHN0cmluZyA9IFJlc291cmNlUGF0aCArIFwiQ29uZmlnL1wiXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5ZBdGzmlofku7bot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEF0bFBhdGgoZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFVJUGF0aCArIGZpbGVOYW1lICsgXCIuYXRsYXNcIiArIChJc0VkaXRvciA/IFwiXCIgOiB2ZXJzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWjsOmfs+i3r+W+hFxyXG4gICAgICogQHBhcmFtIGZpbGVOYW1lIOaWh+S7tuWQjVxyXG4gICAgICovXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gR2V0U291bmRwYXRoVUlKUyhmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gIFJlc291cmNlUGF0aCArIFwic291bmQvXCIgKyBmaWxlTmFtZSArIFwiLm1wM1wiICsgKElzRWRpdG9yID8gXCJcIiA6IHZlcnNpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WVUlKc29u6Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXREZXBhdGhVSUpTKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBVSVBhdGggKyBmaWxlTmFtZSArIFwiLmpzb25cIiArIChJc0VkaXRvciA/IFwiXCIgOiB2ZXJzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlmxo5paH5Lu26Lev5b6EXHJcbiAgICAgKiBAcGFyYW0gZmlsZU5hbWUg5paH5Lu25ZCNXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBHZXRMSChmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gTW9kZWxQYXRoICsgU2NlbmVBc3NldFBhdGggKyBmaWxlTmFtZSArIFwiL0NvbnZlbnRpb25hbC9cIiArIGZpbGVOYW1lICsgXCIubGhcIiArIChJc0VkaXRvciA/IFwiXCIgOiB2ZXJzaW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWKoOi9vUpzb27ot6/lvoRcclxuICAgICAqIEBwYXJhbSBmaWxlTmFtZSDmlofku7blkI1cclxuICAgICAqL1xyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEdldEpzb25QYXRoKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBDb25maWdQYXRoICsgZmlsZU5hbWUgKyBcIi5qc29uXCIgKyAoSXNFZGl0b3IgPyBcIlwiIDogdmVyc2lvbik7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVSUJ1dHRvblRvdWNoRXZlbnQgZXh0ZW5kcyBMYXlhLlNjcmlwdCB7XHJcbiAgICBcclxuICAgIHN0YXRpYyBhZGRCdXR0b25Ub3VjaEV2ZW50KGU6IExheWEuQnV0dG9uKTogdm9pZCB7XHJcbiAgICAgICAgZS5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMuYnV0dG9uVG91Y2hEb3duKTtcclxuICAgICAgICBlLm9uKExheWEuRXZlbnQuTU9VU0VfVVAsIHRoaXMsIHRoaXMuYnV0dG9uVG91Y2hVcCk7XHJcbiAgICAgICAgZS5vbihMYXlhLkV2ZW50Lk1PVVNFX09VVCwgdGhpcywgdGhpcy5idXR0b25Ub3VjaFVwKTtcclxuICAgICAgICBlLm9uKExheWEuRXZlbnQuTU9VU0VfT1ZFUiwgdGhpcywgdGhpcy5idXR0b25Ub3VjaFVwKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYnV0dG9uVG91Y2hEb3duKGU6IExheWEuRXZlbnQpOiB2b2lke1xyXG4gICAgICAgIGUuY3VycmVudFRhcmdldC5zY2FsZVggPSBlLmN1cnJlbnRUYXJnZXQuc2NhbGVZID0gMS4xO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBidXR0b25Ub3VjaFVwKGU6IExheWEuRXZlbnQpOiB2b2lke1xyXG4gICAgICAgIGUuY3VycmVudFRhcmdldC5zY2FsZVggPSBlLmN1cnJlbnRUYXJnZXQuc2NhbGVZID0gMTtcclxuICAgIH1cclxuICAgIFxyXG59IiwiZXhwb3J0IG1vZHVsZSBVSUZ1bmMge1xyXG4gICAgLy/orqHnrpfnvKnmlL7lgLxcclxuICAgIGV4cG9ydCBmdW5jdGlvbiBDb3VudFNjYWxlRml4KHdpZHRoOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghd2lkdGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhZ2VXaWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdmFyIHNjYWxlOiBudW1iZXIgPSBzdGFnZVdpZHRoIC8gd2lkdGg7XHJcbiAgICAgICAgcmV0dXJuIHNjYWxlO1xyXG4gICAgfVxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIEZpeFVJKHZpZXc6IExheWEuU3ByaXRlLCB3aWR0aDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIHNjYWxlID0gVUlGdW5jLkNvdW50U2NhbGVGaXgod2lkdGggPyB3aWR0aCA6IHZpZXcud2lkdGgpO1xyXG4gICAgICAgIHZpZXcuc2NhbGVYID0gc2NhbGU7XHJcbiAgICAgICAgdmlldy5zY2FsZVkgPSBzY2FsZTtcclxuICAgICAgICB2aWV3LmhlaWdodCA9IExheWEuc3RhZ2UuaGVpZ2h0IC8gc2NhbGU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBTY2VuZU1nciBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvU2NlbmVNYW5hZ2VyXCJcclxuaW1wb3J0IEZXIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVGltZU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1RpbWVNYW5hZ2VyXCJcclxuaW1wb3J0IEZyYW1lV29yayBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCI7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tIFwiLi4vR2FtZS9HYW1lTW9kdWxlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBUFAge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19TY2VuZU1ncjogU2NlbmVNZ3I7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX1RpbWVNZ3I6IFRpbWVNYW5hZ2VyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ19VSU1hbmFnZXI6IFVJTWFuYWdlcjtcclxuICAgIHByaXZhdGUgc3RhdGljIGdfTWVzc2FnZTogTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnX0ZyYW1lV29yazpGcmFtZVdvcms7XHJcbiAgICBzdGF0aWMgZ2V0IEZyYW1lV29yaygpOkZyYW1lV29ya1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdfRnJhbWVXb3JrO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBNZXNzYWdlTWFuYWdlcigpOiBNZXNzYWdlTUQuTWVzc2FnZUNlbnRlciAge1xyXG4gICAgICAgIHJldHVybiBBUFAuZ19NZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldCBVSU1hbmFnZXIoKTogVUlNYW5hZ2VyICB7XHJcbiAgICAgICAgaWYgKEFQUC5nX1VJTWFuYWdlciA9PSBudWxsKSAge1xyXG4gICAgICAgICAgICBBUFAuZ19VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFQUC5nX1VJTWFuYWdlcjtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgU2NlbmVNYW5hZ2VyKCk6IFNjZW5lTWdyICB7XHJcbiAgICAgICAgaWYgKEFQUC5nX1NjZW5lTWdyID09IG51bGwpICB7XHJcbiAgICAgICAgICAgIEFQUC5nX1NjZW5lTWdyID0gRlcuRk0uR2V0TWFuYWdlcjxTY2VuZU1ncj4oU2NlbmVNZ3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gQVBQLmdfU2NlbmVNZ3I7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IFRpbWVNYW5hZ2VyKCk6IFRpbWVNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKEFQUC5nX1RpbWVNZ3IgPT0gbnVsbCkgIHtcclxuICAgICAgICAgICAgQVBQLmdfVGltZU1nciA9IEZXLkZNLkdldE1hbmFnZXI8VGltZU1hbmFnZXI+KFRpbWVNYW5hZ2VyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIEFQUC5nX1RpbWVNZ3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIEluaXQoKVxyXG4gICAge1xyXG4gICAgICAgIEFQUC5nX0ZyYW1lV29yayA9IEZyYW1lV29yay5GTTtcclxuICAgICAgICB2YXIgZm06RnJhbWVXb3JrICA9IEFQUC5nX0ZyYW1lV29yaztcclxuICAgICAgICBBUFAuZ19NZXNzYWdlID0gZm0uQWRkTWFuYWdlcjxNZXNzYWdlTUQuTWVzc2FnZUNlbnRlcj4oTWVzc2FnZU1ELk1lc3NhZ2VDZW50ZXIpO1xyXG4gICAgICAgIEFQUC5nX1NjZW5lTWdyID0gIGZtLkFkZE1hbmFnZXI8U2NlbmVNZ3I+KFNjZW5lTWdyKTtcclxuICAgICAgICBBUFAuZ19UaW1lTWdyID0gZm0uQWRkTWFuYWdlcjxUaW1lTWFuYWdlcj4oVGltZU1hbmFnZXIpO1xyXG4gICAgICAgIEFQUC5nX1VJTWFuYWdlciA9IGZtLkFkZE1hbmFnZXI8VUlNYW5hZ2VyPihVSU1hbmFnZXIpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIEFQUC5nX01lc3NhZ2UuUmVnaXN0KEdhbWVNb2R1bGUuRXZlbnQuT25UaW1lUGF1c2UsQVBQLmdfVGltZU1nci5QYXVzZSxBUFAuZ19UaW1lTWdyKVxyXG4gICAgICAgIEFQUC5nX01lc3NhZ2UuUmVnaXN0KEdhbWVNb2R1bGUuRXZlbnQuT25UaW1lQ29udGludWUsQVBQLmdfVGltZU1nci5Db250aW51ZSxBUFAuZ19UaW1lTWdyKVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgQ2hhcmFjdGVyTWFuYWdlciBmcm9tIFwiLi8uLi9HYW1lTWFuYWdlci9DaGFyYWN0ZXJNYW1hZ2VyXCJcclxuaW1wb3J0IEl0ZW1NYW5hZ2VyIGZyb20gXCIuLy4uL0dhbWVNYW5hZ2VyL0l0ZW1NYW5hZ2VyXCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUFQUFxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBDaGFyYWN0ZXJNZ3IoKTpDaGFyYWN0ZXJNYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIENoYXJhY3Rlck1hbmFnZXIuTWdyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgSXRlbU1ncigpOkl0ZW1NYW5hZ2VyXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIEl0ZW1NYW5hZ2VyLk1ncjtcclxuICAgIH1cclxufSIsImltcG9ydCB7SXRlbX0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lSXRlbVwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IFBsYXllckd1ZXN0RGVsZWdhdGUgZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiXHJcbmltcG9ydCBTZXRQYW5lbFVJIGZyb20gXCIuLy4uL3VpL1NldFBhbmVsVUlcIlxyXG5pbXBvcnQgUmFua1BhbmVsVUkgZnJvbSBcIi4vLi4vdWkvUmFua1BhbmVsVUlcIlxyXG5pbXBvcnQgQ2hhcmFjdGVyVUkgZnJvbSBcIi4vLi4vdWkvQ2hhcmFjdGVyVUlcIlxyXG5pbXBvcnQgR2FtZVNjZW5lIGZyb20gXCIuLy4uL1NjZW5lL0dhbWVTY2VuZVwiXHJcbmltcG9ydCBHYW1lRGlyZWN0b3IgZnJvbSBcIi4vLi4vU2NlbmUvR2FtZURpcmVjdG9yXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi9BUFBcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCI7XHJcbmltcG9ydCBFbnRlckdhbWVVSSBmcm9tIFwiLi4vdWkvRW50ZXJHYW1lVUlcIjtcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLi9HYW1lL0dhbWVNb2R1bGVcIjtcclxuXHJcbnR5cGUgSXRlbVR5cGUgPSBJdGVtLkl0ZW1UeXBlO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250cm9sZXJcclxue1xyXG4gICAgc3RhdGljIGdldCBHYW1lQ29udHJvbGVyKCk6R2FtZUNvbnRyb2xlclxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAgR2FtZUNvbnRyb2xlci5NZ3I7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEdhbWVDb250cm9sZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX01ncjogR2FtZUNvbnRyb2xlcjtcclxuICAgIHN0YXRpYyBnZXQgTWdyKCk6IEdhbWVDb250cm9sZXIge1xyXG4gICAgICAgIGlmIChHYW1lQ29udHJvbGVyLl9NZ3IgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBHYW1lQ29udHJvbGVyLl9NZ3IgPSBuZXcgR2FtZUNvbnRyb2xlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gR2FtZUNvbnRyb2xlci5fTWdyO1xyXG4gICAgfVxyXG4gICAgX0xpbmVTdGVwTnVtOm51bWJlcjtcclxuICAgIF9NYXhMaW5lTnVtOm51bWJlcjtcclxuICAgIF9TdGVwTGVuZ3RoOm51bWJlcjtcclxuICAgIF9TdGVwRGlzdGFuY2U6bnVtYmVyO1xyXG4gICAgX1BsYXllck1vdmVUaW1lOm51bWJlcjtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgIC8v5bi46YeP5a6a5LmJXHJcbiAgICAvL+avj+ihjOacgOWkp+agvOWtkOaVsFxyXG4gICAgZ2V0IExpbmVTdGVwTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9MaW5lU3RlcE51bSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xpbmVTdGVwTnVtID0gNSsyO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTGluZVN0ZXBOdW07XHJcbiAgICB9IFxyXG4gICAgLy/mnIDlpKfooYzmlbBcclxuICAgIGdldCBNYXhMaW5lTnVtKCk6IG51bWJlclxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLl9NYXhMaW5lTnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fTWF4TGluZU51bSA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fTWF4TGluZU51bTtcclxuICAgIH0gXHJcbiAgICBcclxuICAgIC8v5qC85a2Q6L656ZW/XHJcbiAgICBnZXQgU3RlcExlbmd0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmKCF0aGlzLl9TdGVwTGVuZ3RoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU3RlcExlbmd0aCA9IDAuOTg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9TdGVwTGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL+eOqeWutuenu+WKqOaXtumXtFxyXG4gICAgZ2V0IFBsYXllck1vdmVUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1BsYXllck1vdmVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fUGxheWVyTW92ZVRpbWUgPSAwLjM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9QbGF5ZXJNb3ZlVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRQbGF5ZXJJRChpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGd1ZXN0QWdlbnQ6UGxheWVyR3Vlc3RBZ2VudCA9IFBsYXllckd1ZXN0RGVsZWdhdGUuR3Vlc3RBZ2VudDtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyTGlzdDpBcnJheTxudW1iZXI+ID0gZ3Vlc3RBZ2VudC5DaGFyYWN0ZXJMaXN0O1xyXG4gICAgICAgIGlmKCFjaGFyYWN0ZXJMaXN0W2lkXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKCFndWVzdEFnZW50LkJ1eUNoYXJhY3RlcihpZCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBndWVzdEFnZW50LlNldENoYXJhY3RlcihpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/mmL7npLrorr7nva7pnaLmnb9cclxuICAgIFNob3dTZXRQYW5lbCgpIHtcclxuICAgICAgICB2YXIgUGFuZWwgPSBBUFAuVUlNYW5hZ2VyLlNob3c8U2V0UGFuZWxVST4oU2V0UGFuZWxVSSk7Ly8gbmV3IFNldFBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8v5pi+56S65o6S6KGM5qac6Z2i5p2/XHJcbiAgICBTaG93UmFua1BhbmVsKCkge1xyXG4gICAgICAgIC8vIGlmKCFMYXlhLkJyb3dzZXIub25XZWlYaW4gfHwgdHlwZW9mIHd4ID09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB2YXIgUGFuZWwgPSBBUFAuVUlNYW5hZ2VyLlNob3c8UmFua1BhbmVsVUk+KFJhbmtQYW5lbFVJKTsvLyBuZXcgU2V0UGFuZWwoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/mmL7npLrop5LoibLpnaLmnb9cclxuICAgIHB1YmxpYyBTaG93Q2hhcmFjdGVyUGFuZWwoKSB7XHJcbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IEFQUC5VSU1hbmFnZXIuU2hvdzxDaGFyYWN0ZXJVST4oQ2hhcmFjdGVyVUkpO1xyXG4gICAgICAgIHJldHVybiBjaGFyYWN0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfU2V0SW5mbztcclxuICAgIGdldCBTZXRJbmZvKCk6IEdhbWVTdHJ1Y3QuU2V0SW5mbyB7XHJcbiAgICAgICAgaWYgKHRoaXMuX1NldEluZm8gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9TZXRJbmZvID0gbmV3IEdhbWVTdHJ1Y3QuU2V0SW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fU2V0SW5mbztcclxuICAgIH1cclxuXHJcbiAgICBzZXQgU2V0SW5mbyh2YWx1ZTogR2FtZVN0cnVjdC5TZXRJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5fU2V0SW5mbyA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5L+d5a2Y6K6+572u5pWw5o2uXHJcbiAgICBTYXZlU2V0SW5mbyhpbmZvOiBHYW1lU3RydWN0LlNldEluZm8pIHtcclxuICAgICAgICB0aGlzLlNldEluZm8gPSBpbmZvO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6K+75Y+W6K6+572u5L+h5oGvXHJcbiAgICBHZXRTZXRJbmZvKCk6IEdhbWVTdHJ1Y3QuU2V0SW5mbyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuU2V0SW5mbztcclxuICAgIH1cclxuXHJcbiAgICBFbnRlckdhbWVVSSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkVudGVyU2NlbmUoKTtcclxuICAgIH1cclxuICAgIEVudGVyR2FtZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLkVudGVyU2NlbmUoKTtcclxuICAgIH1cclxuICAgIGdldCBHYW1lRGlyKCk6IEdhbWVEaXJlY3RvciB7XHJcbiAgICAgICAgcmV0dXJuIEFQUC5TY2VuZU1hbmFnZXIuQ3VyU2NlbmUuRGlyZWN0b3IgYXMgR2FtZURpcmVjdG9yO1xyXG4gICAgfVxyXG4gICAgLy/ov5vlhaXmuLjmiI/lnLrmma/otbDov5nkuKrmjqXlj6NcclxuICAgIEVudGVyU2NlbmUoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIG5ld0dhbWVTY2VuZSA9IG5ldyBHYW1lU2NlbmUoKTtcclxuICAgICAgICBBUFAuU2NlbmVNYW5hZ2VyLkNoYW5nZVNjZW5lKG5ld0dhbWVTY2VuZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/nlJ/miJBCVUZG6KGo546w5pWI5p6cXHJcbiAgICBHZW5CdWZmRWZmZWN0KHR5cGU6IEl0ZW1UeXBlKTogTGF5YS5TcHJpdGUzRCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBMYXlhLlNwcml0ZTNEKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQnV5SXRlbShpZDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQnV5SXRlbShpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgVGltZVBhdXNlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5GaXJlKEdhbWVNb2R1bGUuRXZlbnQuT25UaW1lUGF1c2UpO1xyXG4gICAgfVxyXG5cclxuICAgIFRpbWVDb250aW51ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRmlyZShHYW1lTW9kdWxlLkV2ZW50Lk9uVGltZUNvbnRpbnVlKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgV2VjaGF0T3BlbiB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgd2VjaGF0T3BlbjogV2VjaGF0T3BlbiA9IG51bGw7XHJcbiAgICBwdWJsaWMgZGF0YUNvbnRleHQgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBpc0RyYXdSYW5rOiBib29sZWFuIC8vIOaYr+WQpuW8gOWni+e7mOeUu+aOkuihjOamnOWGheWuuVxyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pc0RyYXdSYW5rID0gZmFsc2U7XHJcbiAgICAgICAgaWYodHlwZW9mIHd4ICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhQ29udGV4dCA9IHdpbmRvd1tcInd4XCJdLmdldE9wZW5EYXRhQ29udGV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW9k+WJjeWvueixoeWunuWIl1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlcygpOiBXZWNoYXRPcGVuIHtcclxuICAgICAgICBpZighV2VjaGF0T3Blbi53ZWNoYXRPcGVuKSB7XHJcbiAgICAgICAgICAgIFdlY2hhdE9wZW4ud2VjaGF0T3BlbiA9IG5ldyBXZWNoYXRPcGVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBXZWNoYXRPcGVuLndlY2hhdE9wZW5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlU2NvcmUoc2NvcmU6YW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwidXBkYXRlXCIsXHJcbiAgICAgICAgICAgIHNjb3JlOiBzY29yZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3cGFzcyhzY29yZTphbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlVG9PcGVuKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJkcmF3cGFzc1wiLFxyXG4gICAgICAgICAgICBzY29yZTogc2NvcmVcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJjYW52YXNlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2VUb09wZW4oe1xyXG4gICAgICAgICAgICBjb21tYW5kOiBcImNsZWFyY2FudmFzZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsb3NlUmFuaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlVG9PcGVuKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJjbG9zZVwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dSYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlVG9PcGVuKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJyYW5nZVwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgY2xlYXJTY29yZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlVG9PcGVuKHtcclxuICAgICAgICAgICAgY29tbWFuZDogXCJjbGVhclNjb3JlXCJcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb3BlblJhbmsoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZVRvT3Blbih7XHJcbiAgICAgICAgICAgIGNvbW1hbmQ6IFwib3BlblwiXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwb3N0TWVzc2FnZVRvT3BlbihkYXRhKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5kYXRhQ29udGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFDb250ZXh0LnBvc3RNZXNzYWdlKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEl0ZW1FbGVtZW50IGV4dGVuZHMgTGF5YS5Cb3gge1xyXG4gICAgLy9cclxuICAgIHByaXZhdGUgbV9JdGVtSWR4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9CdG46IExheWEuQnV0dG9uO1xyXG4gICAgcHJpdmF0ZSBfSW1nOiBMYXlhLkltYWdlO1xyXG4gICAgcHJpdmF0ZSBtX051bUxhYmVsOiBMYXlhLkxhYmVsO1xyXG4gICAgcHJpdmF0ZSBtX0xhYmVsU3RyaW5nOiBzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgbV9CdXlJdGVtOiBNZXNzYWdlTUQuRGVsZWdhdGU7XHJcbiAgICBwcml2YXRlIG1fQ2hvb3NlSXRlbTogTWVzc2FnZU1ELkRlbGVnYXRlO1xyXG5cclxuICAgIGdldCBCdG4oKTogTGF5YS5CdXR0b24ge1xyXG4gICAgICAgIGlmICh0aGlzLl9CdG4gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9CdG4gPSB0aGlzLmdldENoaWxkQXQoMSkgYXMgTGF5YS5CdXR0b247XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9CdG47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IEl0ZW1JZHgoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9JdGVtSWR4ID0gaWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXQgSW1nKCk6IExheWEuSW1hZ2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9JbWc7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IEJ1eUJ0bigpOiBMYXlhLkJ1dHRvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0J0bjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgQnRuTGFibGUoc3RyOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBpZighc3RyKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdGhpcy5fQnRuLnRleHQudGV4dCA9IHN0cjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgSXNHcmF5KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5JbWcuZ3JheSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBJc0dyYXkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuSW1nLmdyYXk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IE51bShudW06IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubV9MYWJlbFN0cmluZ1sxXSA9IFwiXCIgKyBudW07XHJcbiAgICAgICAgdGhpcy5tX051bUxhYmVsLnRleHQgPSB0aGlzLm1fTGFiZWxTdHJpbmdbMF0gKyB0aGlzLm1fTGFiZWxTdHJpbmdbMV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IFByaWNlKG51bTogbnVtYmVyKSAge1xyXG4gICAgICAgIHRoaXMuX0J0bi50ZXh0LnRleHQgPSBcIlwiICsgbnVtO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBJbml0KCkge1xyXG4gICAgICAgIHRoaXMuX0ltZyA9IHRoaXMuZ2V0Q2hpbGRBdCgwKSBhcyBMYXlhLkltYWdlO1xyXG4gICAgICAgIHRoaXMuX0J0biA9IHRoaXMuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkJ1dHRvbjtcclxuICAgICAgICB0aGlzLm1fTnVtTGFiZWwgPSB0aGlzLmdldENoaWxkQXQoMikgYXMgTGF5YS5MYWJlbDtcclxuICAgICAgICB0aGlzLl9CdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5CdXlJdGVtKTtcclxuICAgICAgICB0aGlzLl9JbWcub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5DaG9vc2VJbWcpO1xyXG4gICAgICAgIGlmICghdGhpcy5tX0xhYmVsU3RyaW5nKSAge1xyXG4gICAgICAgICAgICB0aGlzLm1fTGFiZWxTdHJpbmcgPSB0aGlzLm1fTnVtTGFiZWwudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDaG9vc2VJbWcoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubV9DaG9vc2VJdGVtKVxyXG4gICAgICAgICAgICB0aGlzLm1fQ2hvb3NlSXRlbS5FeGVjdXRlKHRoaXMubV9JdGVtSWR4KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgQnV5SXRlbSgpIHtcclxuICAgICAgICBpZiAodGhpcy5tX0J1eUl0ZW0pXHJcbiAgICAgICAgICAgIHRoaXMubV9CdXlJdGVtLkV4ZWN1dGUodGhpcy5tX0l0ZW1JZHgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RCdXkob3duZXI6IGFueSwgbGlzdGVuZXI6IChpZDogbnVtYmVyKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdmFyIG5ld0RlbGVnYXRlID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZShvd25lciwgbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubV9CdXlJdGVtID0gbmV3RGVsZWdhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdENob29zZShvd25lcjogYW55LCBsaXN0ZW5lcjogKGlkOiBudW1iZXIpID0+IHZvaWQpIHtcclxuICAgICAgICB2YXIgbmV3RGVsZWdhdGUgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5tX0Nob29zZUl0ZW0gPSBuZXdEZWxlZ2F0ZTtcclxuICAgIH1cclxufSIsImltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGVFbGVtZW50IGV4dGVuZHMgTGF5YS5JbWFnZSB7XHJcbiAgICAvL1xyXG4gICAgcHJpdmF0ZSBfQnRuOiBMYXlhLkJ1dHRvbjtcclxuICAgIHByaXZhdGUgX0ltZzogTGF5YS5JbWFnZTtcclxuICAgIHByaXZhdGUgbV9PbkNsaWNrSW1nOihpZDpudW1iZXIpPT52b2lkO1xyXG4gICAgcHJpdmF0ZSBtX0NoYXJhY3RlcklEOm51bWJlcjtcclxuICAgIGdldCBCdG4oKTogTGF5YS5CdXR0b24ge1xyXG4gICAgICAgIGlmICh0aGlzLl9CdG4gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9CdG4gPSB0aGlzLmdldENoaWxkQXQoMSkgYXMgTGF5YS5CdXR0b247XHJcbiAgICAgICAgICAgIHRoaXMuX0J0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0UGxheWVySUQodGhpcy5tX0NoYXJhY3RlcklEKTtcclxuICAgICAgICAgICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9CdG47XHJcbiAgICB9XHJcblxyXG4gICAgUmVzZXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9JbWcpIHtcclxuICAgICAgICAgICAgdGhpcy5Jbml0KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFNldEdyYXkoaXNHcmF5OmJvb2xlYW4pXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fSW1nLmdyYXkgPSBpc0dyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIFJlZ2lzdE9uSW1nQ2xpY2soZXZlbnRGdW5jdGlvbjooKT0+dm9pZClcclxuICAgIHtcclxuICAgICAgICB2YXIgaWQ9dGhpcy5tX0NoYXJhY3RlcklEO1xyXG4gICAgICAgIHRoaXMuX0ltZy5vbihMYXlhLkV2ZW50LkNMSUNLLG51bGwsZXZlbnRGdW5jdGlvbik7Ly8gb3duZXIsICgpPT57IGV2ZW50RnVuY3Rpb24oaWQpIH0gKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgQ2hhcmFjdGVySUQoaWQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJJRCA9IGlkO1xyXG4gICAgfVxyXG4gICAgSW5pdCgpICB7XHJcbiAgICAgICAgdGhpcy5fSW1nID0gdGhpcy5nZXRDaGlsZEF0KDApIGFzIExheWEuSW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7cGF0aH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IHt1aX0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0e0Jhc2VGdW5jfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VGdW5jXCJcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJHVUkgZXh0ZW5kcyB1aS5CR1VJIHtcclxuICAgIFxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJCR1wiKSkpO1xyXG4gICAgfVxyXG4gICAgLy9wcml2YXRlIF9Ta3lBcnI6QXJyYXk8TGF5YS5TcHJpdGU+O1xyXG4gICAgcHJpdmF0ZSBfU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9UZW1wU2t5UXVlOkJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT47XHJcbiAgICBwcml2YXRlIF9TY2FsZVNreTpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9TY2FsZUVhcnRoOm51bWJlcjtcclxuICAgIHByaXZhdGUgX0VhcnRoU3RhcnRQUzpudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBiZzogTGF5YS5JbWFnZTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmFyIHdpZGggPSBMYXlhLnN0YWdlLndpZHRoIDtcclxuICAgICAgICB2YXIgcmF0ZSA9IE1hdGguY2VpbChMYXlhLnN0YWdlLmhlaWdodC93aWRoKTtcclxuXHJcbiAgICAgICAgdGhpcy5fU2t5UXVlID0gbmV3IEJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT4oKTtcclxuICAgICAgICB0aGlzLl9UZW1wU2t5UXVlID0gbmV3IEJhc2VGdW5jLk5vZGVRdWV1ZTxMYXlhLlNwcml0ZT4oKTtcclxuICAgICAgICAgLy9uZXcgQXJyYXk8TGF5YS5JbWFnZT4ocmF0ZSsxKTtcclxuICAgICAgICBmb3IobGV0IHN0YXJ0SWR4ID0gMDtzdGFydElkeDxyYXRlKzE7ICsrc3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGltYWdlOkxheWEuSW1hZ2UgPSBuZXcgTGF5YS5JbWFnZSgpO1xyXG4gICAgICAgICAgICAvL2ltYWdlLmxvYWRJbWFnZShcImNvbXAvaW1nX2JhY2tncm91bmRfc3ByX3NreS5wbmdcIik7XHJcbiAgICAgICAgICAgIGltYWdlLmxvYWRJbWFnZShQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIFwibWFpbmJnLmpwZ1wiKTtcclxuICAgICAgICAgICAgaW1hZ2Uud2lkdGggPSB3aWRoO1xyXG4gICAgICAgICAgICBpbWFnZS5oZWlnaHQgPSB3aWRoK3dpZGgqMC4wMTtcclxuICAgICAgICAgICAgaW1hZ2UuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkQ2hpbGQoaW1hZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmJnID0gaW1hZ2U7XHJcbiAgICAgICAgICAgIC8vdGhpcy5fU2t5UXVlLlB1c2goaW1hZ2UpO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdGhpcy5TZXRTa3koMCk7XHJcbiAgICAgICAgdmFyIGVhcnRoID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgICAgICBlYXJ0aC55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX0VhcnRoU3RhcnRQUyA9IGVhcnRoLnk7XHJcbiAgICAgICAgLy9lYXJ0aC5sb2FkSW1hZ2UoXCJjb21wL2ltZ19iYWNrZ3JvdW5kX3Nwci5wbmdcIik7XHJcbiAgICAgICAgZWFydGgubG9hZEltYWdlKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgXCJtYWluYmcuanBnXCIpO1xyXG4gICAgICAgIHRoaXMuX0VhcnRoID0gZWFydGg7XHJcbiAgICAgICAgZWFydGgud2lkdGggPSB3aWRoO1xyXG4gICAgICAgIGVhcnRoLmhlaWdodCA9IHdpZGg7XHJcblxyXG4gICAgICAgIC8vdGhpcy5hZGRDaGlsZChlYXJ0aCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fU2NhbGVTa3kgPSAwLjAwMVxyXG4gICAgICAgIHRoaXMuX1NjYWxlRWFydGggPSAwLjAxXHJcbiAgICAgICAgLy90aGlzLl9FYXJ0aFN0YXJ0UFMgPSB0aGlzLl9FYXJ0aC55O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGF0ZUJnVGV4dHVyZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJnLmxvYWRJbWFnZShQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIFwibWFpbmJnLmpwZ1wiKVxyXG4gICAgfVxyXG5cclxuICAgIC8qXHJcbiAgICBJbml0KClcclxuICAgIHtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICBmb3IobGV0IHN0YXJ0SWR4Om51bWJlciA9IDA7c3RhcnRJZHg8dGhpcy5fU2t5UXVlLkNvdW50Oysrc3RhcnRJZHggKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fU2t5QXJyW3N0YXJ0SWR4XS55ID0gc3RhcnRJZHggKiBoZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX0VhcnRoLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fRWFydGhTdGFydFBTID0gdGhpcy5fRWFydGgueTtcclxuICAgIH0qL1xyXG4gICAgLy/pq5jluqbovazlsY/luZXpq5jluqblg4/ntKBcclxuICAgIEhlaWdodFRyYW5zUGl4KCBoZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBoZWlnaHQqLTAuMTtcclxuICAgIH1cclxuICAgIFNldFNreShwaXhIZWlnaHQ6bnVtYmVyKVxyXG4gICAge1xyXG4gICAgICAgIHZhciB0ZW1Ta3lRdWU6QmFzZUZ1bmMuTm9kZVF1ZXVlPExheWEuU3ByaXRlPiA9IHRoaXMuX1RlbXBTa3lRdWU7XHJcbiAgICAgICAgdGVtU2t5UXVlLkNsZWFyKCk7XHJcbiAgICAgICAgdmFyIGNvdW50Om51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgd2hpbGUodGhpcy5fU2t5UXVlLkNvdW50PjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgbm9kZTpCYXNlRnVuYy5Ob2RlPExheWEuU3ByaXRlPiA9IHRoaXMuX1NreVF1ZS5Qb3BOb2RlKCk7XHJcbiAgICAgICAgICAgIHZhciBza3lJbWc6TGF5YS5TcHJpdGUgPSBub2RlLlZhbHVlO1xyXG4gICAgICAgICAgICBza3lJbWcueSA9IGNvdW50ICogaGVpZ2h0ICsgcGl4SGVpZ2h0IC0gaGVpZ2h0IC0gaGVpZ2h0KjAuMDE7XHJcbiAgICAgICAgICAgIHRlbVNreVF1ZS5QdXNoTm9kZShub2RlKTtcclxuICAgICAgICAgICAgaWYoc2t5SW1nLnk+TGF5YS5zdGFnZS5oZWlnaHQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNreUltZy55ID0gdGVtU2t5UXVlLkhlYWRWYWx1ZS55IC0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICsrY291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1RlbXBTa3lRdWUgPSB0aGlzLl9Ta3lRdWU7XHJcbiAgICAgICAgdGhpcy5fU2t5UXVlID0gdGVtU2t5UXVlO1xyXG4gICAgfVxyXG4gICAgU2V0RWFydGgoaGVpZ2h0Om51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9FYXJ0aC55ID0gdGhpcy5fRWFydGhTdGFydFBTICsgaGVpZ2h0O1xyXG4gICAgfVxyXG4gICAgVXBkYXRlUGFnZSggaGVpZ2h0Om51bWJlciApXHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICAvL2hlaWdodCA9IHRoaXMuSGVpZ2h0VHJhbnNQaXgoaGVpZ2h0KTtcclxuICAgICAgICAvL3ZhciBza3lIZWlnaHRQaXggPSBoZWlnaHQqdGhpcy5fU2NhbGVTa3k7XHJcbiAgICAgICAgdGhpcy5TZXRTa3koaGVpZ2h0KTtcclxuICAgICAgICB0aGlzLlNldEVhcnRoKGhlaWdodCk7XHJcbiAgICAgICAgLy92YXIgZWFydGhIZWlnaHRQaXggPSBoZWlnaHQ7XHJcblxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBVSU1hbmFnZXIgZnJvbSBcIi4vLi4vRnJhbWVXb3JrL1VJTWFuYWdlclwiXHJcbmltcG9ydCBGVyBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvRnJhbWVXb3JrXCJcclxuaW1wb3J0IHtCYXNlRW51bX0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7VUlGdW5jfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1VJRnVuY1wiXHJcbmltcG9ydCB7TWVzc2FnZU1EfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcblxyXG4vL1VJ5Z+657G7XHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VVSSBleHRlbmRzIExheWEuQm94XHJcbntcclxuICAgIFxyXG4gICAgXHJcbiAgICAvL1xyXG4gICAgcHJvdGVjdGVkIF9VSVR5cGU6QmFzZUVudW0uVUlUeXBlRW51bTtcclxuICAgIHByb3RlY3RlZCBfSXNNdXRleDpib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIF9OYW1lOnN0cmluZzsgICAgXHJcbiAgICBwcm90ZWN0ZWQgX1VJTWFuYWdlcjpVSU1hbmFnZXJcclxuICAgIHByaXZhdGUgX0RpcnR5OmJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9TaG93aW5nOmJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTG93O1xyXG4gICAgICAgIHRoaXMuX0lzTXV0ZXggPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9OYW1lID0gbmFtZTtcclxuICAgICAgICB0aGlzLl9VSU1hbmFnZXIgPSBGVy5GTS5HZXRNYW5hZ2VyPFVJTWFuYWdlcj4oVUlNYW5hZ2VyKTtcclxuICAgICAgICB0aGlzLl9TaG93aW5nID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLmxlZnQgPSAwO1xyXG5cdCAgICAvLyB0aGlzLnJpZ2h0ID0gMDtcclxuXHRcdC8vIHRoaXMuYm90dG9tID0gMDtcclxuICAgICAgICAvLyB0aGlzLnRvcCA9IDA7XHJcbiAgICB9XHJcbiAgICBIaWRlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBPcGVuKClcclxuICAgIHtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZSgpXHJcbiAgICB7XHJcbiAgICB9XHJcblxyXG4gICAgT3Blbk9QKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuT3BlbigpO1xyXG4gICAgfVxyXG4gICAgQ2xvc2VPUCgpXHJcbiAgICB7XHJcbiAgICAgICAgLy90aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLkNsb3NlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgRGVzdHJveSggKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBVSVR5cGUoKTpCYXNlRW51bS5VSVR5cGVFbnVtXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1VJVHlwZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0IElzTXV0ZXgoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0lzTXV0ZXg7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IE5hbWUoKTpzdHJpbmdcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgU2hvd2luZygpOmJvb2xlYW5cclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fU2hvd2luZztcclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKVxyXG4gICAge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWvuVVJ6L+b6KGM6YCC6YWNXHJcbiAgICAgKiBAcGFyYW0gVUkg6YCC6YWNVUlcclxuICAgICAqL1xyXG4gICAgcHVibGljIEZpeFVJKFVJOkxheWEuVmlldylcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKFVJKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBTZXREaXJ0eSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5fRGlydHkgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgRGlydHkoKTpib29sZWFuXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX0RpcnR5O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbGVhckRpcnR5KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9EaXJ0eSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgVUlVcGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy5fRGlydHkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLlVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLkNsZWFyRGlydHkoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBVcGRhdGUoKTp2b2lkO1xyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIlxyXG5pbXBvcnQgeyBwYXRoIH0gZnJvbSBcIi4vLi4vVXRpbGl0eS9QYXRoXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9BUFBcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLi9GcmFtZVdvcmsvVUlNYW5hZ2VyXCI7XHJcbmltcG9ydCBGVyBmcm9tIFwiLi4vRnJhbWVXb3JrL0ZyYW1lV29ya1wiO1xyXG5pbXBvcnQgUm9sZUVsZW1lbnQgZnJvbSBcIi4vLi4vc2NyaXB0L1JvbGVFbGVtZW50XCJcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiXHJcbmltcG9ydCB7IE1lc3NhZ2VNRCB9IGZyb20gXCIuLy4uL0ZyYW1lV29yay9NZXNzYWdlQ2VudGVyXCIgXHJcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuLy4uL0FnZW50L1BsYXllckVudGl0eVwiXHJcbmltcG9ydCBHYW1lQVBQIGZyb20gXCIuLi9jb250cm9sZXIvR2FtZUFQUFwiO1xyXG5pbXBvcnQgRW50ZXJHYW1lVUkgZnJvbSBcIi4vRW50ZXJHYW1lVUlcIjtcclxuaW1wb3J0IENoYXJhY3RlclVJU2NlbmUgZnJvbSBcIi4uL1NjZW5lL0NoYXJhY3RlclVJU2NlbmVcIjtcclxuaW1wb3J0IEVuZEdhbWVVSSBmcm9tIFwiLi9FbmRHYW1lVUlcIjtcclxuaW1wb3J0IENoYXJhY3Rlck1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyL0NoYXJhY3Rlck1hbWFnZXJcIjtcclxuaW1wb3J0IHsgR2FtZU1hbmFnZXIgfSBmcm9tIFwiLi4vR2FtZU1hbmFnZXIvR2FtZU1hbmFnZXJcIjtcclxuaW1wb3J0IFVJQnV0dG9uVG91Y2hFdmVudCBmcm9tIFwiLi4vVXRpbGl0eS9VSUJ1dHRvblRvdWNoRXZlbnRcIjtcclxuXHJcbmNsYXNzIEV4dGVuZENoYXJhY3RlcnNVSSBleHRlbmRzIHVpLkNoYXJhY3RlclVJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiQ2hhcmFjdGVyXCIpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhcmFjdGVyVUkgZXh0ZW5kcyBCYXNlVUkge1xyXG5cclxuICAgIHByaXZhdGUgbV9DaGFyYWN0ZXJMaXN0OiBBcnJheTxhbnk+O1xyXG4gICAgcHJpdmF0ZSBtX0dvbGREaXNjcmliZTogc3RyaW5nW107XHJcbiAgICBwcml2YXRlIHNwcml0ZUJnQXJyOkxheWEuU3ByaXRlW10gPSBbXTtcclxuICAgIHByaXZhdGUgY2hhcmFjdGVyVUlTY2VuZTpDaGFyYWN0ZXJVSVNjZW5lO1xyXG4gICAgcHJpdmF0ZSBjbnRDaGFyYWN0ZXJJZDpudW1iZXI7XHJcbiAgICBwcml2YXRlIF9VSTogRXh0ZW5kQ2hhcmFjdGVyc1VJO1xyXG4gICAgcHJpdmF0ZSBjbnRTZWxlY3RTZXg6bnVtYmVyID0gMTtcclxuXHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJtYWluYmcuanBnXCJ9XHJcblxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJidG5cIjpcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIHtrZXk6XCJiYWNrQnRuXCIsdGV4dHVyZU5hbWU6XCJiYWNrLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImJ1eUJ0blwiLHRleHR1cmVOYW1lOlwiYnV5LnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcInN0YXJ0R2FtZVwiLHRleHR1cmVOYW1lOlwic3RhcnQucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiY2hhcmFjdGVycm9sZTBiZ1wiLHRleHR1cmVOYW1lOlwicm9sZWJnY2lyY2xlLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImNoYXJhY3RlcnJvbGUxYmdcIix0ZXh0dXJlTmFtZTpcInJvbGViZ2NpcmNsZS5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJjaGFyYWN0ZXJyb2xlMmJnXCIsdGV4dHVyZU5hbWU6XCJyb2xlYmdjaXJjbGUucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiY2hhcmFjdGVycm9sZTNiZ1wiLHRleHR1cmVOYW1lOlwicm9sZWJnY2lyY2xlLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImNoYXJhY3RlcnJvbGU0YmdcIix0ZXh0dXJlTmFtZTpcInJvbGViZ2NpcmNsZS5wbmdcIn1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZENoYXJhY3RlcnNVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuR2V0Q2hhcmFjdGVyTGlzdCgpO1xyXG4gICAgICAgIC8vdGhpcy5TZXRMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5tX0NoYXJhY3Rlckxpc3QgPSBbXTtcclxuICAgICAgICAvL3RoaXMubV9Hb2xkRGlzY3JpYmUgPSB0aGlzLl9VSS5fR29sZC50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLk9uTW9uZXlDaGFuZ2UoKTtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC5zdHJva2UgPSAyO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnN0cm9rZUNvbG9yID0gXCIweGZmMDAwMFwiO1xyXG5cclxuICAgICAgICB0aGlzLl9VSS5iYWNrQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQmFja0dhbWVCdG4pO1xyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnZpc2libGUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5fVUkubmFuQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMubmFuQnRuRXZlbnQpO1xyXG4gICAgICAgIHRoaXMuX1VJLm52QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMubnZCdG5FdmVudCk7XHJcblxyXG4gICAgICAgIHRoaXMuc3ByaXRlQmdBcnIucHVzaCh0aGlzLl9VSS5jaGFyYWN0ZXJyb2xlMGJnKTtcclxuICAgICAgICB0aGlzLnNwcml0ZUJnQXJyLnB1c2godGhpcy5fVUkuY2hhcmFjdGVycm9sZTFiZyk7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVCZ0Fyci5wdXNoKHRoaXMuX1VJLmNoYXJhY3RlcnJvbGUyYmcpO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQmdBcnIucHVzaCh0aGlzLl9VSS5jaGFyYWN0ZXJyb2xlM2JnKTtcclxuICAgICAgICB0aGlzLnNwcml0ZUJnQXJyLnB1c2godGhpcy5fVUkuY2hhcmFjdGVycm9sZTRiZyk7XHJcblxyXG4gICAgICAgIHRoaXMudXBkYXRlTmFuTnZCdG5TdGF0ZSgpO1xyXG5cclxuICAgICAgICB2YXIgbGVuID0gdGhpcy5zcHJpdGVCZ0Fyci5sZW5ndGg7XHJcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0ubmFtZSA9IGkgKyBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuc2VsZWN0Um9sZVBvc2l0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbnRDaGFyYWN0ZXJJZCA9IFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5DaGFyYWN0ZXJJRDtcclxuICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250Q2hhcmFjdGVySWQpO1xyXG5cclxuICAgICAgICB0aGlzLl9VSS5zdGFydEdhbWUub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5zdGFydEV2ZW50KTtcclxuICAgICAgICB0aGlzLl9VSS5idXlCdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5PbkNsaWNrSW1nKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGZTY2VuZVVJKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX1VJLm5hbkJ0bi5hbmNob3JYID0gdGhpcy5fVUkubmFuQnRuLmFuY2hvclkgPSAgdGhpcy5fVUkubnZCdG4uYW5jaG9yWCA9IHRoaXMuX1VJLm52QnRuLmFuY2hvclkgPSAwLjU7XHJcblxyXG4gICAgICAgIFVJQnV0dG9uVG91Y2hFdmVudC5hZGRCdXR0b25Ub3VjaEV2ZW50KHRoaXMuX1VJLm5hbkJ0bik7XHJcbiAgICAgICAgVUlCdXR0b25Ub3VjaEV2ZW50LmFkZEJ1dHRvblRvdWNoRXZlbnQodGhpcy5fVUkubnZCdG4pO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZU5hbk52QnRuU3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5jbnRTZWxlY3RTZXggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5uYW5CdG4uZ3JheSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5udkJ0bi5ncmF5ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLm5hbkJ0bi5ncmF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkubnZCdG4uZ3JheSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBudkJ0bkV2ZW50KGU6IExheWEuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmNudFNlbGVjdFNleCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RTZXggPSAxO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTmFuTnZCdG5TdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZSAmJiB0aGlzLmNoYXJhY3RlclVJU2NlbmUudXBkYXRlU2VsZWN0U2V4KHRoaXMuY250U2VsZWN0U2V4KTtcclxuICAgIH1cclxuXHJcbiAgICBuYW5CdG5FdmVudChlOiBMYXlhLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5jbnRTZWxlY3RTZXggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY250U2VsZWN0U2V4ID0gMDtcclxuICAgICAgICB0aGlzLnVwZGF0ZU5hbk52QnRuU3RhdGUoKTtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUgJiYgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLnVwZGF0ZVNlbGVjdFNleCh0aGlzLmNudFNlbGVjdFNleCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlU2VsZlNjZW5lVUkoKSB7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5jb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuY29uZmlnW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihrZXkgPT0gXCJpbWdcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0ubG9hZEltYWdlKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihrZXkgPT0gXCJidG5cIikge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uc2tpbiA9IChQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0RXZlbnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5jbnRTZWxlY3RTZXggPT0gMSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY250U2VsZWN0SW5kZXggKz01O1xyXG4gICAgICAgIH1cclxuICAgICAgICBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0UGxheWVySUQodGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpO1xyXG4gICAgICAgIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUoKTtcclxuICAgICAgICB0aGlzLl9VSS5yZW1vdmVDaGlsZCh0aGlzLmNoYXJhY3RlclVJU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tJc0xvY2soaWQpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgY2hhcmFjdGVyID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkNoYXJhY3Rlckxpc3Q7XHJcbiAgICAgICAgaWYoY2hhcmFjdGVyW2lkXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVJvbGVJbmZvKGlkKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5jaGVja0lzTG9jayhpZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuc3RhcnRHYW1lLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5idXlCdG4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5nb2xkaW1nLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkucm9sZXVzZU5vbmV5LnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudGV4dCA9IFwi5bey6Kej6ZSBXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5zdGFydEdhbWUudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5idXlCdG4udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmdvbGRpbWcudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLnJvbGV1c2VOb25leS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fVUkucm9sZXVzZU5vbmV5LnRleHQgPSBDaGFyYWN0ZXJNYW5hZ2VyLk1nci5HZXRQcmljZSh0aGlzLmNudENoYXJhY3RlcklkKSArIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLnJvbGVOYW1lLnRleHQgPSBDaGFyYWN0ZXJNYW5hZ2VyLk1nci5HZXROYW1lKGlkKTtcclxuICAgICAgICB0aGlzLl9VSS5kZXNjLnRleHQgPSBDaGFyYWN0ZXJNYW5hZ2VyLk1nci5HZXREZXNjKGlkKTtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBzZWxlY3RSb2xlUG9zaXRpb24oZTpMYXlhLkV2ZW50KTogdm9pZCB7IFxyXG4gICAgICAgIHZhciBjbnRUYXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyVUlTY2VuZSB8fCB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY250U2VsZWN0SW5kZXggPT0gcGFyc2VJbnQoY250VGFyZ2V0Lm5hbWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5fVUkuc3RhcnRHYW1lLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9VSS5idXlCdG4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLmdvbGRpbWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLnJvbGV1c2VOb25leS52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS51cGRhdGVTZWxlY3RJbmRleChwYXJzZUludChjbnRUYXJnZXQubmFtZSkpO1xyXG4gICAgICAgIHRoaXMuSW5pdFBvc2l0aW9uKG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIEluaXRQb3NpdGlvbihkYXRhKTogdm9pZCB7XHJcbiAgICAgICAgaWYoIXRoaXMuY2hhcmFjdGVyVUlTY2VuZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5jbnRDaGFyYWN0ZXJJZCA9IHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jbnRTZWxlY3RJbmRleDtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNudENoYXJhY3RlcklkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbnVtID0gdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmFycmF5RGlzLmxlbmd0aDtcclxuICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCA1O2kgKyspIHtcclxuICAgICAgICAgICAgdmFyIF9vdXRQb3M6TGF5YS5WZWN0b3IzID0gbmV3IExheWEuVmVjdG9yMygpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUuY2FtZXJhLnZpZXdwb3J0LnByb2plY3QodGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmFycmF5RGlzW2ldLnRyYW5zZm9ybS5wb3NpdGlvbiwgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNhbWVyYS5wcm9qZWN0aW9uVmlld01hdHJpeCwgX291dFBvcyk7XHJcbiAgICAgICAgICAgIHZhciBfb3V0UG9zMSA9IG5ldyBMYXlhLlBvaW50KF9vdXRQb3MueCwgX291dFBvcy55KTtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0YmcuZ2xvYmFsVG9Mb2NhbChfb3V0UG9zMSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0ucG9zKF9vdXRQb3MxLnggLyBMYXlhLnN0YWdlLmNsaWVudFNjYWxlWCwgX291dFBvczEueSAvIExheWEuc3RhZ2UuY2xpZW50U2NhbGVZKTtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS5waXZvdFggPSAyMDcgLyAyO1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLnBpdm90WSA9IHRoaXMuc3ByaXRlQmdBcnJbaV0uaGVpZ2h0IC0gNTtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlQmdBcnJbaV0uc2NhbGVYID0gMC44ICsgKCh0aGlzLmNoYXJhY3RlclVJU2NlbmUuYXJyYXlEaXNbaV0udHJhbnNmb3JtLmxvY2FsU2NhbGVYIC0gdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmluaXRTY2FsTnVtKSAvIDAuMDA0KSAqIDAuMjtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGVCZ0FycltpXS5zY2FsZVkgPSAwLjggKyAoKHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5hcnJheURpc1tpXS50cmFuc2Zvcm0ubG9jYWxTY2FsZVggLSB0aGlzLmNoYXJhY3RlclVJU2NlbmUuaW5pdFNjYWxOdW0pIC8gMC4wMDQpICogMC4yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBCYWNrR2FtZUJ0bigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0b3BSb2F0ZVRpbWVyKCk7XHJcbiAgICAgICAgdmFyIGVudGVycGFuZWw6RW50ZXJHYW1lVUkgPSBBUFAuVUlNYW5hZ2VyLkdldFVJQnlOYW1lKFwiRW50ZXJHYW1lVUlcIikgYXMgRW50ZXJHYW1lVUk7XHJcbiAgICAgICAgZW50ZXJwYW5lbC5fVUkueSA9IExheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIExheWEuVHdlZW4udG8oZW50ZXJwYW5lbC5fVUksIHt5OiAwfSwgNTAwLCBMYXlhLkVhc2Uuc2luZU91dCk7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLCB7eTogLUxheWEuc3RhZ2UuaGVpZ2h0fSwgNTAwLCBMYXlhLkVhc2Uuc2luZU91dCwgTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLCAoKT0+e1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICB0aGlzLl9VSS5yZW1vdmVDaGlsZCh0aGlzLmNoYXJhY3RlclVJU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcFJvYXRlVGltZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5jaGFyYWN0ZXJVSVNjZW5lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jbGVhclJvYXRlVGltZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJDaGFyYWN0ZXJVSVwiO1xyXG4gICAgfVxyXG5cclxuICAgIEdldENoYXJhY3Rlckxpc3QoKSAge1xyXG4gICAgICAgIHRoaXMubV9DaGFyYWN0ZXJMaXN0ID0gR2FtZUFQUC5DaGFyYWN0ZXJNZ3IuR2V0SURMaXN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KCkgeyAgIFxyXG4gICAgICAgIHN1cGVyLkxheW91dCgpO1xyXG4gICAgICAgIGlmKCF0aGlzLl9VSSB8fCAhdGhpcy5fVUkuYmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5iZy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUkuYmcuaGVpZ2h0ID0gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcblxyXG4gICAgICAgIHZhciBzY2FsZVggPSBMYXlhLnN0YWdlLndpZHRoIC8gTGF5YS5zdGFnZS5oZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNjYWxlWSA9IDc1MCAvIDEzMzQ7XHJcbiAgICAgICAgaWYoc2NhbGVYID4gc2NhbGVZKSB7XHJcbiAgICAgICAgICAgIHNjYWxlWSA9IHNjYWxlWSAvIHNjYWxlWDtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0YmcucGl2b3RYID0gNzUwIC8gMjtcclxuICAgICAgICAgICAgdGhpcy5fVUkubGF5b3V0YmcucGl2b3RZID0gMTMzNCAvIDI7XHJcbiAgICAgICAgICAgIHZhciBfb3V0UG9zOkxheWEuVmVjdG9yMyA9IG5ldyBMYXlhLlZlY3RvcjMoKTtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNhbWVyYS52aWV3cG9ydC5wcm9qZWN0KG5ldyBMYXlhLlZlY3RvcjMoMCwgLXRoaXMuY2hhcmFjdGVyVUlTY2VuZS5zdGFydFkgLSAwLjAxLCAwKSwgdGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNhbWVyYS5wcm9qZWN0aW9uVmlld01hdHJpeCwgX291dFBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmxheW91dGJnLnggPSBfb3V0UG9zLng7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmxheW91dGJnLnkgPSBfb3V0UG9zLnk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLmxheW91dGJnLnNjYWxlWCA9IHRoaXMuX1VJLmxheW91dGJnLnNjYWxlWSA9IHNjYWxlWTtcclxuICAgICAgICAgICAgdGhpcy5Jbml0UG9zaXRpb24obnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFVwZGF0ZSgpIHsgIFxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgT3BlbigpICB7XHJcbiAgICAgICAgaWYodGhpcy5jaGFyYWN0ZXJVSVNjZW5lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJDaGFyYWN0ZXJJRENoYW5nZSwgdGhpcy5Pbk5lZWRDbG9zZVVJLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5Pbk1vbmV5Q2hhbmdlLCB0aGlzLk9uTW9uZXlDaGFuZ2UsIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ2hhcmFjdGVyTGlzdENoYW5nZSwgdGhpcy5PbkNoYW5nZUxpc3QsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZSA9IG5ldyBDaGFyYWN0ZXJVSVNjZW5lKHRoaXMuY250Q2hhcmFjdGVySWQgLCB0aGlzLkluaXRQb3NpdGlvbi5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUudXBkYXRlU2VsZWN0U2V4KHRoaXMuY250U2VsZWN0U2V4KTtcclxuICAgICAgICB0aGlzLl9VSS5hZGRDaGlsZCh0aGlzLmNoYXJhY3RlclVJU2NlbmUpO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyVUlTY2VuZS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuc3ByaXRlQmdBcnIubGVuZ3RoO1xyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICB0aGlzLnNwcml0ZUJnQXJyW2ldLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclVJU2NlbmUudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuSW5pdFBvc2l0aW9uKCk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpLCA1MTApO1xyXG4gICAgICAgIHRoaXMuTGF5b3V0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIENsb3NlKCkgIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckNoYXJhY3RlcklEQ2hhbmdlLCB0aGlzLk9uTmVlZENsb3NlVUksIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uTW9uZXlDaGFuZ2UsIHRoaXMuT25Nb25leUNoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25DaGFyYWN0ZXJMaXN0Q2hhbmdlLCB0aGlzLk9uQ2hhbmdlTGlzdCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuovku7ZcclxuICAgIHByaXZhdGUgT25DbGlja0ltZyhpZDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hlY2tJc0xvY2sodGhpcy5jaGFyYWN0ZXJVSVNjZW5lLmNudFNlbGVjdEluZGV4KSkgIHtcclxuICAgICAgICAgICAgLy90aGlzLkJhY2tHYW1lQnRuKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNldFBsYXllcklEKHRoaXMuY2hhcmFjdGVyVUlTY2VuZS5jbnRTZWxlY3RJbmRleCk7XHJcbiAgICAgICAgdGhpcy5Pbk1vbmV5Q2hhbmdlKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVSb2xlSW5mbyh0aGlzLmNoYXJhY3RlclVJU2NlbmUuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25OZWVkQ2xvc2VVSSgpOiB2b2lkICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLkJhY2tHYW1lQnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbkNoYW5nZUxpc3QoKSAge1xyXG4gICAgICAgIGlmICghdGhpcy5TaG93aW5nKSAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLl9MaXN0LnJlZnJlc2goKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgT25Nb25leUNoYW5nZSgpICB7XHJcbiAgICAgICAgaWYgKCF0aGlzLlNob3dpbmcpICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLm1fR29sZERpc2NyaWJlWzFdID0gXCJcIiArIFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Nb25leTtcclxuICAgICAgICAvL3RoaXMuX1VJLl9Hb2xkLnRleHQgPSB0aGlzLm1fR29sZERpc2NyaWJlWzBdICsgdGhpcy5tX0dvbGREaXNjcmliZVsxXTtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgICAgICB0aGlzLl9VSS5fR29sZC5zdHJva2UgPSAyO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Hb2xkLnN0cm9rZUNvbG9yID0gXCIweGZmMDAwMFwiO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7QmFzZUVudW19IGZyb20gXCIuLy4uL0Jhc2UvQmFzZUVudW1cIlxyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7R2FtZVN0cnVjdCB9ICBmcm9tIFwiLi8uLi9HYW1lL0dhbWVTdHJ1Y3RcIlxyXG5pbXBvcnQgQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEdhbWVDb250cm9sZXIgZnJvbSBcIi4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCI7XHJcbmltcG9ydCBQbGF5ZXJHdWVzdEFnZW50IGZyb20gXCIuLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCI7XHJcblxyXG5jbGFzcyBFeHRlbmRFbmRHYW1lVUkgZXh0ZW5kcyB1aS5FbmRHYW1lVUkge1xyXG4gICAgUGFuZWw6TGF5YS5QYW5lbDtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiRW5kR2FtZVwiKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy90aGlzLlBhbmVsID0gdGhpcy5QYW5lbDtcclxuICAgICAgICAvL3RoaXMuUGFuZWwudlNjcm9sbEJhclNraW4gPSBcIlwiO1xyXG4gICAgICAgIC8vdGhpcy5QYW5lbC5oU2Nyb2xsQmFyU2tpbiA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5fTWVudWVCdG4ub24oTGF5YS5FdmVudC5DTElDSyxHdWlkZXJNYW5hZ2VyLk1ncixHdWlkZXJNYW5hZ2VyLk1nci5FbnRlclNjZW5lKTtcclxuICAgICAgICB0aGlzLl9TZXRCdG4ub24oTGF5YS5FdmVudC5DTElDSyxDb250cm9sZXIuR2FtZUNvbnRyb2xlcixDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TaG93U2V0UGFuZWwpO1xyXG4gICAgICAgIHRoaXMuX1N0YXJ0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssQ29udHJvbGVyLkdhbWVDb250cm9sZXIsQ29udHJvbGVyLkdhbWVDb250cm9sZXIuRW50ZXJHYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5kR2FtZVVJIGV4dGVuZHMgQmFzZVVJXHJcbntcclxuICAgIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFwiRW5kR2FtZVVJXCI7XHJcbiAgICB9XHJcbiAgICBVSTpFeHRlbmRFbmRHYW1lVUk7XHJcblxyXG4gICAgcHJpdmF0ZSBjb25maWcgPSB7XCJpbWdcIjpcclxuICAgICAgICBbICAgXHJcbiAgICAgICAgICAgIHtrZXk6XCJiZ1wiLHRleHR1cmVOYW1lOlwibWFpbmJnLmpwZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImVuZGdhbWV0aXRsZVwiLHRleHR1cmVOYW1lOlwiZW5kZ2FtZWRhaXppLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImVuZGdhbWVoZW50aWFvXCIsdGV4dHVyZU5hbWU6XCJpbmZvdGlhby5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJlbmRnYW1lYmdpY29uXCIsdGV4dHVyZU5hbWU6XCJpbnB1dHRleHRhcmVhLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImRpYmdcIix0ZXh0dXJlTmFtZTpcImlucHV0dGV4dGFyZWEucG5nXCJ9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcIl9TdGFydEJ0blwiLHRleHR1cmVOYW1lOlwicmVzdGFydC5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJfTWVudWVCdG5cIix0ZXh0dXJlTmFtZTpcImhvbWVCdG4ucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiX1NldEJ0blwiLHRleHR1cmVOYW1lOlwic2V0dGluZy5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJfUGxheWVyTGlzdEJ0blwiLHRleHR1cmVOYW1lOlwicGFpaGFuZy5wbmdcIn1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZVNlbGZTY2VuZVVJKCkge1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmNvbmZpZ1trZXldLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYoa2V5ID09IFwiaW1nXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5sb2FkSW1hZ2UoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGtleSA9PSBcImJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLnNraW4gPSAoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOnN0cmluZylcclxuICAgIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLlVJPSBuZXcgRXh0ZW5kRW5kR2FtZVVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLlVJKTtcclxuICAgICAgICAvL3RoaXMuVUkuX0NoYXJhY3Rlckxpc3Qub24oTGF5YS5FdmVudC5DTElDSyxudWxsLCgpPT57IHRoaXMuX1VJTWFuYWdlci5TaG93PFBsYXllckxpc3RVST4oUGxheWVyTGlzdFVJKX0pO1xyXG4gICAgICAgIHRoaXMuTGF5b3V0KCk7XHJcbiAgICAgICAgdGhpcy5VSS5kaXN0YW5jZS50ZXh0ID0gR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuRGlzdGFuY2UgKyBcIlwiO1xyXG4gICAgICAgIHRoaXMuVUkuZ29sZC50ZXh0ID0gR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLkdhbWVEaXIuR2FtZVBsYXkuR2FtZUdvbGQgKyBcIlwiO1xyXG4gICAgICAgIHRoaXMudXBkYXRlU2VsZlNjZW5lVUkoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIE9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIHN1cGVyLkxheW91dCgpO1xyXG4gICAgICAgIGlmKCF0aGlzLlVJIHx8ICF0aGlzLlVJLmJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5VSS5iZy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHVpIH0gZnJvbSBcIi4vbGF5YU1heFVJXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IEZNIGZyb20gXCIuLy4uL0ZyYW1lV29yay9GcmFtZVdvcmtcIlxyXG5pbXBvcnQgVUlNYW5hZ2VyIGZyb20gXCIuLy4uL0ZyYW1lV29yay9VSU1hbmFnZXJcIlxyXG5pbXBvcnQgUGxheWVyTGlzdFVJIGZyb20gXCIuLy4uL3VpL1BsYXllckxpc3RVSVwiXHJcbmltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IHsgR2FtZUFnZW50IH0gZnJvbSBcIi4vLi4vQWdlbnQvR2FtZUFnZW50XCJcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4uL0FnZW50L1BsYXllckd1ZXN0QWdlbnRcIjtcclxuaW1wb3J0IEVuZEdhbWVVSSBmcm9tIFwiLi9FbmRHYW1lVUlcIjtcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuaW1wb3J0IHsgTW9kZWxGdW5jIH0gZnJvbSBcIi4uL1V0aWxpdHkvTW9kZWxGdW5jXCI7XHJcbmltcG9ydCBMb2FkVUlTY2VuZSBmcm9tIFwiLi9VbkRvd25sb2FkL0xvYWRVSVNjZW5lXCI7XHJcbmltcG9ydCBMZXZlbEl0ZW1SYW5nZU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyL0xldmVsSXRlbVJhbmdlTWFuYWdlclwiO1xyXG5cclxuY2xhc3MgRXh0ZW5kRW50ZXJHYW1lVUkgZXh0ZW5kcyB1aS5FbnRlclVJIHtcclxuICAgIFBhbmVsOiBMYXlhLlBhbmVsO1xyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJFbnRlclwiKSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9DaGFyYWN0ZXIub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5TaG93Q2hhcmFjdGVyUGFuZWwpO1xyXG4gICAgICAgIHRoaXMuX1NldFBhbmVsLm9uKExheWEuRXZlbnQuQ0xJQ0ssIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlciwgR2FtZUNvbnRyb2xlci5HYW1lQ29udHJvbGVyLlNob3dTZXRQYW5lbCk7XHJcbiAgICAgICAgdGhpcy5fU3RhcnQub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5vblN0YXJ0KTtcclxuXHJcbiAgICAgICAgdGhpcy5fQ2hhcmFjdGVyTGlzdC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fU3RhcnRbXCJpbml0WFwiXSA9IHRoaXMuX1N0YXJ0Lng7XHJcbiAgICAgICAgdGhpcy5fQ2hhcmFjdGVyW1wiaW5pdFlcIl0gPSB0aGlzLl9DaGFyYWN0ZXIueTtcclxuICAgIH1cclxuXHJcbiAgICBTaG93Q2hhcmFjdGVyUGFuZWwoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2hvd0NoYXJhY3RlclBhbmVsKCk7XHJcbiAgICAgICAgbm9kZS55ID0gLUxheWEuc3RhZ2UuaGVpZ2h0O1xyXG4gICAgICAgIExheWEuVHdlZW4udG8obm9kZSwge3k6IDB9LCA1MDAsIExheWEuRWFzZS5zaW5lT3V0KTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMsIHt5OiBMYXlhLnN0YWdlLmhlaWdodH0sIDUwMCwgTGF5YS5FYXNlLnNpbmVPdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3RhcnQoKTp2b2lkIHtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX1JhbmssIHt5OnRoaXMuX1JhbmsueSArIExheWEuc3RhZ2UuaGVpZ2h0IC0gdGhpcy5fQ2hhcmFjdGVyLnl9LCAxNTAsIExheWEuRWFzZS5zaW5lSW4pO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fU2V0UGFuZWwsIHt5OnRoaXMuX1NldFBhbmVsLnkgICsgTGF5YS5zdGFnZS5oZWlnaHQgLSB0aGlzLl9DaGFyYWN0ZXIueX0sIDE1MCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi50byh0aGlzLl9TdGFydCwge3g6dGhpcy5fU3RhcnQueSAgKyBMYXlhLnN0YWdlLndpZHRoIC0gdGhpcy5fU3RhcnQueH0sIDI1MCwgTGF5YS5FYXNlLnNpbmVJbiwgTGF5YS5IYW5kbGVyLmNyZWF0ZShHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIsIEdhbWVDb250cm9sZXIuR2FtZUNvbnRyb2xlci5FbnRlckdhbWUpKTtcclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX0NoYXJhY3Rlciwge3k6dGhpcy5fQ2hhcmFjdGVyLnkgIC0gTGF5YS5zdGFnZS5oZWlnaHR9LCAxNTAsIExheWEuRWFzZS5zaW5lSW4pO1xyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5hZHYsIHt5OnRoaXMuYWR2LnkgICsgTGF5YS5zdGFnZS5oZWlnaHQgLSB0aGlzLl9DaGFyYWN0ZXIueX0sIDE1MCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgQVBQLlNjZW5lTWFuYWdlci5CR1tcInVwYXRlQmdUZXh0dXJlXCJdKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGVyR2FtZVVJIGV4dGVuZHMgQmFzZVVJIHtcclxuICAgIHN0YXRpYyBOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiRW50ZXJHYW1lVUlcIjtcclxuICAgIH1cclxuXHJcbiAgICBfZ2s6TGF5YS5TcHJpdGU7XHJcbiAgICBfZ2tDb250ZW50OkxheWEuU3ByaXRlO1xyXG4gICAgX1VJOiBFeHRlbmRFbnRlckdhbWVVSTtcclxuICAgIGxhc3RYOm51bWJlciA9IDk5OTk5O1xyXG4gICAgb2ZmZXN0WDpudW1iZXIgPSAwO1xyXG4gICAgY250U2VsZWN0SW5kZXg6bnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgY29uZmlnID0ge1wiaW1nXCI6XHJcbiAgICAgICAgWyAgIFxyXG4gICAgICAgICAgICB7a2V5OlwiYmdcIix0ZXh0dXJlTmFtZTpcImxvYWRiZ3N0YXJ0LnBuZ1wifVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgXCJidG5cIjpcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIHtrZXk6XCJfQ2hhcmFjdGVyXCIsdGV4dHVyZU5hbWU6XCJyb2xlLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcIl9TdGFydFwiLHRleHR1cmVOYW1lOlwic3RhcnQucG5nXCJ9LFxyXG4gICAgICAgICAgICB7a2V5OlwiX1NldFBhbmVsXCIsdGV4dHVyZU5hbWU6XCJzZXR0aW5nLnBuZ1wifSxcclxuICAgICAgICAgICAge2tleTpcImFkdlwiLHRleHR1cmVOYW1lOlwiYWQucG5nXCJ9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIG1fQnRuR3JvdXA6IEFycmF5PExheWEuSW1hZ2U+O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kRW50ZXJHYW1lVUkoKTtcclxuXHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdmFyIHVpTWdyOiBVSU1hbmFnZXIgPSB0aGlzLl9VSU1hbmFnZXI7XHJcbiAgICAgICAgdGhpcy5tX0J0bkdyb3VwID0gW107XHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSB0aGlzLl9VSS5fUGFuZWwuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpIGFzIExheWEuU3ByaXRlO1xyXG4gICAgICAgIHRoaXMuTGF5b3V0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgICAgIHRoaXMuX2drID0gY29udGVudDtcclxuICAgICAgICB0aGlzLl9VSS5fUGFuZWwubW91c2VFbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9nay5tb3VzZUVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQ3VyTGV2ZWwgLSAxO1xyXG4gICAgICAgIHRoaXMuX2drLnggPSAtdGhpcy5jbnRTZWxlY3RJbmRleCAqIDYzMDtcclxuICAgICAgICB0aGlzLmluaXRHS0xpc3RlbmVyKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZSgpO1xyXG4gICAgICAgIGxheWEubWVkaWEuU291bmRNYW5hZ2VyLnBsYXlNdXNpYyhwYXRoLkdldFNvdW5kcGF0aFVJSlMoXCJiZ1wiKSwwKTsgICBcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVEZXNjKCkge1xyXG4gICAgICAgIHZhciBkYXRhID0gTGV2ZWxJdGVtUmFuZ2VNYW5hZ2VyLk1nci5HZXRBbGxJbmZvKCk7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICB2YXIgZGExID0gZGF0YVtrZXldLm1fUGFzc3Njb3JlO1xyXG4gICAgICAgICAgICBpZihrZXkgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1VJW1wic3RhcnRudW10eHQxXCJdLnRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fVUlbXCJzdGFydG51bXR4dFwiICsgcGFyc2VJbnQoa2V5KV0udGV4dCA9IGRhMSArIFwi5pif6Kej6ZSBXCI7IFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0R0tMaXN0ZW5lcigpIHtcclxuICAgICAgICAvL3RoaXMuX1VJLl9QYW5lbC5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sIHRoaXMsIHRoaXMuZG93bkdLQm94KTtcclxuICAgICAgICAvL3RoaXMuX1VJLl9QYW5lbC5vbihMYXlhLkV2ZW50Lk1PVVNFX01PVkUsIHRoaXMsIHRoaXMubW92ZUdLQm94KTtcclxuICAgICAgICAvL3RoaXMuX1VJLl9QYW5lbC5vbihMYXlhLkV2ZW50Lk1PVVNFX1VQLCB0aGlzLCB0aGlzLnVwR0tCb3gpO1xyXG4gICAgICAgIC8vdGhpcy5fVUkuX1BhbmVsLm9uKExheWEuRXZlbnQuTU9VU0VfT1ZFUiwgdGhpcywgdGhpcy51cEdLQm94KTtcclxuICAgICAgICB0aGlzLl9VSS5sYXN0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMubGFzdFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuX1VJLm5leHRCdG4ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5uZXh0UGFnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQnV0dG9uU3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fVUkubGFzdEJ0bi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSS5uZXh0QnRuLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIGlmKHRoaXMuY250U2VsZWN0SW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5sYXN0QnRuLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodGhpcy5jbnRTZWxlY3RJbmRleCA9PSA0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJLm5leHRCdG4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZXh0UGFnZShlOkxheWEuRXZlbnQpIHtcclxuICAgICAgICBpZih0aGlzLmNudFNlbGVjdEluZGV4IDwgNCkge1xyXG4gICAgICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyVHdlZW4odGhpcy5fZ2spO1xyXG4gICAgICAgICAgICB0aGlzLl9nay54ID0gLXRoaXMuY250U2VsZWN0SW5kZXggKiA2MzA7XHJcbiAgICAgICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fZ2sse3g6LXRoaXMuY250U2VsZWN0SW5kZXggKiA2MzB9LDIwMCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkN1ckxldmVsID0gdGhpcy5jbnRTZWxlY3RJbmRleCArIDE7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBsYXN0UGFnZShlOkxheWEuRXZlbnQpIHtcclxuICAgICAgICBpZih0aGlzLmNudFNlbGVjdEluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICBMYXlhLlR3ZWVuLmNsZWFyVHdlZW4odGhpcy5fZ2spO1xyXG4gICAgICAgICAgICB0aGlzLl9nay54ID0gLXRoaXMuY250U2VsZWN0SW5kZXggKiA2MzA7XHJcbiAgICAgICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIExheWEuVHdlZW4udG8odGhpcy5fZ2sse3g6LXRoaXMuY250U2VsZWN0SW5kZXggKiA2MzB9LDIwMCwgTGF5YS5FYXNlLnNpbmVJbik7XHJcbiAgICAgICAgUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LkN1ckxldmVsID0gdGhpcy5jbnRTZWxlY3RJbmRleCArIDE7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3duR0tCb3goZTpMYXlhLkV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5sYXN0WCA9IGUudGFyZ2V0Lm1vdXNlWDtcclxuICAgIH1cclxuXHJcbiAgICBtb3ZlR0tCb3goZTogTGF5YS5FdmVudCkge1xyXG4gICAgICAgIGlmKHRoaXMubGFzdFggPT0gOTk5OTkgfHwgdGhpcy5fZ2sueCA+IDAgfHwgdGhpcy5fZ2sueCA8IC02MzAgKiA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vZmZlc3RYID0gKGUudGFyZ2V0Lm1vdXNlWCAtIHRoaXMubGFzdFgpO1xyXG4gICAgICAgIHRoaXMuX2drLnggKz0gdGhpcy5vZmZlc3RYO1xyXG4gICAgICAgIGlmKHRoaXMuX2drLnggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2drLnggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0aGlzLl9nay54IDwgLTQgKiA2MzApIHtcclxuICAgICAgICAgICAgdGhpcy5fZ2sueCA9IC00ICogNjMwOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5sYXN0WCA9IGUudGFyZ2V0Lm1vdXNlWDtcclxuICAgIH1cclxuXHJcbiAgICB1cEdLQm94KGU6IExheWEuRXZlbnQpIHtcclxuICAgICAgICB2YXIgbmV4dFggPSAwO1xyXG4gICAgICAgIGlmKE1hdGguYWJzKHRoaXMub2ZmZXN0WCkgPD0gNSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFzdFggPSA5OTk5OTtcclxuICAgICAgICBpZih0aGlzLm9mZmVzdFggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2drLnggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXh0WCA9IE1hdGguZmxvb3IodGhpcy5fZ2sueCAvIDYzMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLm9mZmVzdFggPCAwKSB7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuX2drLnggPiAtNCAqIDYzMCkge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBMYXlhLlR3ZWVuLnRvKHRoaXMuX2drLCB7eDpuZXh0WH0sIE1hdGguYWJzKHRoaXMub2ZmZXN0WCkpO1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggPSAtbmV4dFggLyA2MzA7XHJcbiAgICAgICAgdGhpcy5vZmZlc3RYID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpbml0R0soKSB7XHJcbiAgICAvLyAgICAgZm9yKHZhciBpID0gMTtpIDw9IDU7aSArKykge1xyXG4gICAgLy8gICAgICAgICB2YXIgc3ByID0gbmV3IExheWEuSW1hZ2UoKTtcclxuICAgIC8vICAgICAgICAgc3ByLmxvYWRJbWFnZShcImVudGVyc2NlbmV1aS9nay9na1wiICsgaSArIFwiLnBuZ1wiKTtcclxuICAgIC8vICAgICAgICAgc3ByLnggPSAoaSAtIDEpICogNjMwO1xyXG4gICAgLy8gICAgICAgICB0aGlzLl9na0NvbnRlbnQuYWRkQ2hpbGQoc3ByKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgdXBkYXRlU2VsZlNjZW5lVUkoKSB7XHJcbiAgICAgICAgZm9yKHZhciBrZXkgaW4gdGhpcy5jb25maWcpIHtcclxuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMuY29uZmlnW2tleV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZihrZXkgPT0gXCJpbWdcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0ubG9hZEltYWdlKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihrZXkgPT0gXCJidG5cIikge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDtpIDwgbGVuO2kgKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uc2tpbiA9IChQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuU2tpbkRpciArIHRoaXMuY29uZmlnW2tleV1baV0udGV4dHVyZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgSW5pdEJ0bkdyb3VwKCkge1xyXG4gICAgICAgIC8vIHZhciBDdXJNYXhMZXZlbCA9IEdhbWVBZ2VudC5BZ2VudC5DdXJNYXhMZXZlbDtcclxuICAgICAgICAvLyB2YXIgY3VyTGV2ZWwgPSBHYW1lQWdlbnQuQWdlbnQuQ3VyTGV2ZWw7XHJcbiAgICAgICAgLy8gdmFyIGJ0bk51bSA9IHRoaXMuX1VJLl9Hcm91cC5udW1DaGlsZHJlbjtcclxuICAgICAgICAvLyB2YXIgZ3JvdXAgPSB0aGlzLm1fQnRuR3JvdXA7XHJcbiAgICAgICAgLy8gZm9yICh2YXIgaWR4ID0gMDsgaWR4IDwgYnRuTnVtOyArK2lkeCkge1xyXG4gICAgICAgIC8vICAgICB2YXIgYnRuOiBhbnkgPSB0aGlzLl9VSS5fR3JvdXAuZ2V0Q2hpbGRBdChpZHgpIGFzIExheWEuSW1hZ2U7XHJcbiAgICAgICAgLy8gICAgIGJ0bi5pZHggPSBpZHg7XHJcbiAgICAgICAgLy8gICAgIGJ0bi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLk9uQ2hvb3NlKVxyXG4gICAgICAgIC8vICAgICBidG4uZ3JheSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIGdyb3VwLnB1c2goYnRuKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy9ncm91cFtjdXJMZXZlbF0uZ3JheSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBPcGVuKCkge1xyXG4gICAgICAgIC8vdGhpcy5Jbml0QnRuR3JvdXAoKTtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLl9SYW5rLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX1VJLl9SYW5rLmJvdHRvbSAtIHRoaXMuX1VJLmFkdi5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fVUkuX1NldFBhbmVsLnkgPSBMYXlhLnN0YWdlLmhlaWdodCAtIHRoaXMuX1VJLl9TZXRQYW5lbC5ib3R0b20gLSB0aGlzLl9VSS5hZHYuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMuX1VJLmFkdi55ID0gTGF5YS5zdGFnZS5oZWlnaHQgLSB0aGlzLl9VSS5hZHYuYm90dG9tIC0gdGhpcy5fVUkuYWR2LmhlaWdodDtcclxuICAgICAgICB0aGlzLl9VSS5fU3RhcnQueCA9IHRoaXMuX1VJLl9TdGFydFtcImluaXRYXCJdO1xyXG4gICAgICAgIHRoaXMuX1VJLl9DaGFyYWN0ZXIueSA9IHRoaXMuX1VJLl9DaGFyYWN0ZXJbXCJpbml0WVwiXTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGZTY2VuZVVJKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEZXNjKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgc3VwZXIuTGF5b3V0KCk7XHJcbiAgICAgICAgaWYoIXRoaXMuX1VJIHx8ICF0aGlzLl9VSS5iZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLmJnLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvL+S6i+S7tlxyXG4gICAgT25DaG9vc2UoaW5mbzogRXZlbnQpIHtcclxuICAgICAgICB2YXIgdGFyZ2V0OmFueSA9IGluZm8udGFyZ2V0O1xyXG4gICAgICAgIHZhciBpZHg6IG51bWJlciA9IHRhcmdldC5pZHg7XHJcbiAgICAgICAgR2FtZUFnZW50LkFnZW50LkN1ckxldmVsID0gaWR4O1xyXG4gICAgICAgIHRoaXMubV9CdG5Hcm91cC5mb3JFYWNoKChpbWc6IExheWEuSW1hZ2UpID0+IHtcclxuICAgICAgICAgICAgaW1nLmdyYXkgPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubV9CdG5Hcm91cFtpZHhdLmdyYXkgPSBmYWxzZTtcclxuICAgIH1cclxufSIsIi8qKuS9nOiAhTpNb1xyXG4gKiDlnLrmma9VSVxyXG4gKi9cclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJFbnRpdHlcIlxyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSBcIi4uL0dhbWUvR2FtZU1vZHVsZVwiO1xyXG5pbXBvcnQgeyBHYW1lQWdlbnQgfSBmcm9tIFwiLi4vQWdlbnQvR2FtZUFnZW50XCI7XHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQgeyBNZXNzYWdlTUQgfSBmcm9tIFwiLi8uLi9GcmFtZVdvcmsvTWVzc2FnZUNlbnRlclwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IEl0ZW1MaXN0VUkgZnJvbSBcIi4vSXRlbUxpc3RVSVwiXHJcbmltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IEFQUCBmcm9tIFwiLi8uLi9jb250cm9sZXIvQVBQXCJcclxuXHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIjtcclxuY2xhc3MgRXh0ZW5kc0dhbWVVSSBleHRlbmRzIHVpLkdhbWVVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIkdhbWVcIikpKTtcclxuICAgIH1cclxuICAgIFNldENvdW50VGltZShpbmZvOiBzdHJpbmcgPSBcIlwiKSB7XHJcbiAgICAgICAgdGhpcy5fQ291bnRUaW1lLnZhbHVlID0gaW5mbztcclxuICAgICAgICAvL3RoaXMuX0NvdW50VGltZS50ZXh0ID0gaW5mbztcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVVJIGV4dGVuZHMgQmFzZVVJIHtcclxuICAgIHByaXZhdGUgX1VJOiBFeHRlbmRzR2FtZVVJO1xyXG4gICAgcHJpdmF0ZSBtX29uQ2xpY2tTa2lsbEl0ZW06IE1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIHByaXZhdGUgbV9vbkNMaWNrUGxheWVySXRlbTogTWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgLy9cclxuICAgIHB1YmxpYyBEaXN0YW5jZVN0cjogQXJyYXk8c3RyaW5nPjtcclxuICAgIHB1YmxpYyBHb2xkTnVtU3RyOiBBcnJheTxzdHJpbmc+O1xyXG5cclxuICAgIHNldCBHYW1lUGFuZWwodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9VSS5fR2FtZVBhbmVsLnZpc2libGUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHNldCBEaXN0YW5jZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGRpcyA9IFwiXCIgKyB2YWx1ZTtcclxuICAgICAgICBpZiAoZGlzID09IHRoaXMuRGlzdGFuY2VTdHJbMV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuRGlzdGFuY2VTdHJbMV0gPSBkaXM7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgc2V0IEdvbGROdW0odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IHZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5TZXREaXJ0eSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfU2hvd0Rpc3RhbmNlKCkge1xyXG4gICAgICAgIHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0ID0gdGhpcy5EaXN0YW5jZVN0clswXTtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0RGlzdGFuY2UxLnZhbHVlID0gdGhpcy5EaXN0YW5jZVN0clsxXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9TaG93R29sZE51bSgpIHtcclxuICAgICAgICB0aGlzLl9VSS5fVHh0R29sZC50ZXh0ID0gdGhpcy5Hb2xkTnVtU3RyWzBdICsgdGhpcy5Hb2xkTnVtU3RyWzFdO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJHYW1lVUlcIjtcclxuICAgIH1cclxuICAgIHNldCBHb2xkKGdvbGQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuR29sZE51bVN0clsxXSA9IGdvbGQudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLlNldERpcnR5KCk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9Jc011dGV4ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmxlZnQgPSAwO1xyXG4gICAgICAgIHRoaXMucmlnaHQgPSAwO1xyXG4gICAgICAgIHRoaXMuYm90dG9tID0gMDtcclxuICAgICAgICB0aGlzLnRvcCA9IDA7XHJcbiAgICAgICAgdGhpcy5fVUkgPSBuZXcgRXh0ZW5kc0dhbWVVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHZhciBvcElzUmlnaHQgPSBHYW1lQ29udHJvbGVyLkdhbWVDb250cm9sZXIuU2V0SW5mby5PUElzUmlnaHQ7XHJcbiAgICAgICAgdGhpcy5fVUkuX0l0ZW1MaXN0QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIG51bGwsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fVUlNYW5hZ2VyLlNob3c8SXRlbUxpc3RVST4oSXRlbUxpc3RVSSlcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLlNldENvdW50VGltZSgpO1xyXG4gXHJcbiAgICAgICAgdGhpcy5EaXN0YW5jZVN0ciA9IHRoaXMuX1VJLl9UeHREaXN0YW5jZS50ZXh0LnNwbGl0KFwiI1wiKTtcclxuICAgICAgICB0aGlzLkRpc3RhbmNlU3RyWzFdID0gXCIwXCJcclxuICAgICAgICB0aGlzLl9TaG93RGlzdGFuY2UoKTtcclxuXHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyID0gdGhpcy5fVUkuX1R4dEdvbGQudGV4dC5zcGxpdChcIiNcIik7XHJcbiAgICAgICAgdGhpcy5Hb2xkTnVtU3RyWzFdID0gXCIwXCI7XHJcbiAgICAgICAgdGhpcy5fU2hvd0dvbGROdW0oKTtcclxuXHJcbiAgICAgICAgdGhpcy5TaG93SW5wdXRJbmZvKFwiXCIpO1xyXG4gICAgICAgIHRoaXMuX1VJLl9QbGF5ZXJJdGVtLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuT25DbGlja1BsYXllckl0ZW0pO1xyXG4gICAgICAgIHRoaXMuX1VJLl9Ta2lsbEl0ZW0ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5PbkNsaWNrU2tpbGxJdGVtKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBTZXRMZWZ0VG91Y2gob3duZXI6IGFueSwgTGlzdGVuZXI6ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9VSS5fTGVmdFRvdWNoLm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTiwgb3duZXIsIExpc3RlbmVyKTsgXHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgU2V0UmlnaHRUb3VjaChvd25lcjogYW55LCBMaXN0ZW5lcjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX1VJLl9SaWdodFRvdWNoLm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTiwgb3duZXIsIExpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBTZXRDb3VudFRpbWUoaW5mbzogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIGlmIChpbmZvID09IFwiXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5HYW1lUGFuZWwgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX0NvdW50RG93blVJLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLkdhbWVQYW5lbCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9VSS5TZXRDb3VudFRpbWUoaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgU2hvd0l0ZW0oKSB7XHJcbiAgICAgICAgdGhpcy5TaG93UGxheWVySXRlbSgpO1xyXG4gICAgICAgIHRoaXMuU2hvd0NoYXJhY3RlZXJJdGVtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrnjqnlrrbpgInmi6npgZPlhbdcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIFNob3dQbGF5ZXJJdGVtKCkge1xyXG4gICAgICAgIHZhciBpdGVtTnVtID0gR2FtZUFnZW50LkFnZW50LkdhbWVJdGVtTnVtO1xyXG4gICAgICAgIGlmIChpdGVtTnVtIDwgMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fUGxheWVySXRlbS52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fVUkuX1BsYXllckl0ZW0udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S66KeS6Imy6YGT5YW3XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBTaG93Q2hhcmFjdGVlckl0ZW0oKSB7XHJcbiAgICAgICAgdmFyIGl0ZW1OdW0gPSBHYW1lQWdlbnQuQWdlbnQuU2tpbGxJdGVtTnVtO1xyXG4gICAgICAgIGlmIChpdGVtTnVtIDwgMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fU2tpbGxJdGVtLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9VSS5fU2tpbGxJdGVtLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBTaG93SW5wdXRJbmZvKGluZm86IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX1VJLl9HYW1lSW5mby50ZXh0ID0gaW5mbztcclxuICAgIH1cclxuICAgIE9wZW4oKSB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25DdXJJdGVtTnVtQ2hhbmdlLCB0aGlzLlNob3dQbGF5ZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckl0ZW1DaGFuZ2UsIHRoaXMuU2hvd1BsYXllckl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoR2FtZU1vZHVsZS5FdmVudC5PbkNoYXJhY3Rlckl0ZW1DaGFuZ2UsIHRoaXMuU2hvd0NoYXJhY3RlZXJJdGVtLCB0aGlzKTtcclxuICAgICAgICB0aGlzLlNob3dJdGVtKCk7XHJcbiAgICB9XHJcbiAgICBDbG9zZSgpIHtcclxuICAgICAgICBBUFAuTWVzc2FnZU1hbmFnZXIuRGVzUmVnaXN0KFBsYXllci5FdmVudC5PbkN1ckl0ZW1OdW1DaGFuZ2UsIHRoaXMuU2hvd1BsYXllckl0ZW0sIHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uQ3VySXRlbUNoYW5nZSwgdGhpcy5TaG93UGxheWVySXRlbSwgdGhpcyk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChHYW1lTW9kdWxlLkV2ZW50Lk9uQ2hhcmFjdGVySXRlbUNoYW5nZSwgdGhpcy5TaG93Q2hhcmFjdGVlckl0ZW0sIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKCkge1xyXG4gICAgICAgIC8v5pi+56S66YeR5biB5L+h5oGvXHJcbiAgICAgICAgdGhpcy5fU2hvd0dvbGROdW0oKTtcclxuICAgICAgICAvL+aYvuekuui3neemu+S/oeaBr1xyXG4gICAgICAgIHRoaXMuX1Nob3dEaXN0YW5jZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWdpc3RDbGlja1NraWxsSXRlbShvd25lcjogT2JqZWN0LCBsaXN0ZW5lcjogKHBhcmFtOiBhbnkpID0+IGFueSkge1xyXG4gICAgICAgIHZhciBkZWxlZ2F0ZTogTWVzc2FnZU1ELkRlbGVnYXRlID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZShvd25lciwgbGlzdGVuZXIpO1xyXG4gICAgICAgIHRoaXMubV9vbkNsaWNrU2tpbGxJdGVtID0gZGVsZWdhdGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgUmVnaXN0Q2xpY2tQbGF5ZXJJdGVtKG93bmVyOiBPYmplY3QsIGxpc3RlbmVyOiAocGFyYW06IGFueSkgPT4gYW55KSB7XHJcbiAgICAgICAgdmFyIGRlbGVnYXRlOiBNZXNzYWdlTUQuRGVsZWdhdGUgPSBuZXcgTWVzc2FnZU1ELkRlbGVnYXRlKG93bmVyLCBsaXN0ZW5lcik7XHJcbiAgICAgICAgdGhpcy5tX29uQ0xpY2tQbGF5ZXJJdGVtID0gZGVsZWdhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBPbkNsaWNrU2tpbGxJdGVtKCkge1xyXG4gICAgICAgIHRoaXMubV9vbkNsaWNrU2tpbGxJdGVtLkV4ZWN1dGUoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgT25DbGlja1BsYXllckl0ZW0oKSB7XHJcbiAgICAgICAgdGhpcy5tX29uQ0xpY2tQbGF5ZXJJdGVtLkV4ZWN1dGUoKTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQge3VpfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQge0Jhc2VFbnVtfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHtwYXRofSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge01lc3NhZ2VNRH0gZnJvbSBcIi4vLi4vRnJhbWVXb3JrL01lc3NhZ2VDZW50ZXJcIlxyXG5pbXBvcnQge1BsYXllcn0gZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyRW50aXR5XCJcclxuaW1wb3J0IHtHYW1lQWdlbnR9IGZyb20gXCIuLy4uL0FnZW50L0dhbWVBZ2VudFwiXHJcbmltcG9ydCBBUFAgZnJvbSBcIi4vLi4vY29udHJvbGVyL0FQUFwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IEl0ZW1FbGVtZW50IGZyb20gXCIuLy4uL3NjcmlwdC9JdGVtRWxlbWVudFwiXHJcbmltcG9ydCBHYW1lQ29udHJvbGVyIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQ29udHJvbGVyXCJcclxuaW1wb3J0IFBsYXllckd1ZXN0QWdlbnQgZnJvbSBcIi4vLi4vQWdlbnQvUGxheWVyR3Vlc3RBZ2VudFwiXHJcbmltcG9ydCBHYW1lQVBQIGZyb20gXCIuLy4uL2NvbnRyb2xlci9HYW1lQVBQXCJcclxuaW1wb3J0IHsgR2FtZU1vZHVsZSB9IGZyb20gXCIuLi9HYW1lL0dhbWVNb2R1bGVcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiO1xyXG5pbXBvcnQgSXRlbU1hbmFnZXIgZnJvbSBcIi4uL0dhbWVNYW5hZ2VyL0l0ZW1NYW5hZ2VyXCI7XHJcblxyXG5jbGFzcyBFeHRlbmRzSXRlbUxpc3RVSSBleHRlbmRzIHVpLkl0ZW1MaXN0VUlcclxue1xyXG4gICAgcHJpdmF0ZSBtX0l0ZW1MaXN0OkFycmF5PG51bWJlcj5cclxuICAgIEJ0bkxpc3RlbmVyOk1lc3NhZ2VNRC5EZWxlZ2F0ZTtcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubV9JdGVtTGlzdCA9IFtdO1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhwYXRoLkdldERlcGF0aFVJSlMoXCJJdGVtTGlzdFwiKSkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUb29sSXRlbVVJIGV4dGVuZHMgdWkudG9vbEl0ZW1VSVxyXG57XHJcbiAgICBwcml2YXRlIG1fSXRlbUxpc3Q6QXJyYXk8bnVtYmVyPlxyXG4gICAgQnRuTGlzdGVuZXI6TWVzc2FnZU1ELkRlbGVnYXRlO1xyXG4gICAgY29uc3RydWN0b3IoKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5tX0l0ZW1MaXN0ID0gW107XHJcbiAgICB9XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcInRvb2xJdGVtXCIpKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSXRlbUxpc3RVSSBleHRlbmRzIEJhc2VVSVxyXG57XHJcbiAgICBzdGF0aWMgTmFtZSgpOnN0cmluZ1xyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBcIkl0ZW1MaXN0VUlcIjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgVUk6RXh0ZW5kc0l0ZW1MaXN0VUk7XHJcbiAgICBwcml2YXRlIG1fR29sZDpzdHJpbmdbXTtcclxuICAgIHByaXZhdGUgbV9JdGVtTGlzdDpBcnJheTxudW1iZXI+O1xyXG5cclxuICAgIHB1YmxpYyBhcnJheURpczpMYXlhLlNwcml0ZVtdID0gW107XHJcbiAgICBwdWJsaWMgY250TnVtID0gNTtcclxuICAgIHB1YmxpYyBzdGFydGFvID0gMjcwO1xyXG4gICAgcHVibGljIHBlcmFvID0gMzYwIC8gdGhpcy5jbnROdW07XHJcbiAgICBwdWJsaWMgciA9IDIzMDtcclxuICAgIHB1YmxpYyBzdGFydFkgPSA1NzU7XHJcbiAgICBwdWJsaWMgc3RhcnRYID0gMzAwO1xyXG4gICAgcHVibGljIGNudFNlbGVjdEluZGV4ID0gMDtcclxuXHJcbiAgICBwdWJsaWMgY2FtZXJhOkxheWEuQ2FtZXJhO1xyXG4gICAgcHVibGljIGNudHN0YXJ0YW8gPSA5MDtcclxuICAgIHB1YmxpYyBtb3ZlU3RhcmFvID0gMjtcclxuICAgIHB1YmxpYyBuZXh0QW8gPSAtMTtcclxuICAgIHB1YmxpYyBpbml0U2NhbE51bSA9IDAuMDE4O1xyXG5cclxuICAgIHByaXZhdGUgY29uZmlnID0ge1wiaW1nXCI6XHJcbiAgICAgICAgWyAgIFxyXG4gICAgICAgICAgICB7a2V5OlwiYmdcIix0ZXh0dXJlTmFtZTpcIm1haW5iZy5qcGdcIn1cclxuICAgICAgICBdLFxyXG4gICAgICAgIFwiYnRuXCI6XHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICB7a2V5OlwiYmFja0J0blwiLHRleHR1cmVOYW1lOlwiYmFjay5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJidXlCdG5cIix0ZXh0dXJlTmFtZTpcImJ1eS5wbmdcIn0sXHJcbiAgICAgICAgICAgIHtrZXk6XCJiYWNrQnRuXCIsdGV4dHVyZU5hbWU6XCJzdGFydC5wbmdcIn1cclxuICAgICAgICBdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6c3RyaW5nKVxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLlVJID0gbmV3IEV4dGVuZHNJdGVtTGlzdFVJKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLlVJKTtcclxuICAgICAgICB0aGlzLlVJLkJ0bkxpc3RlbmVyID0gbmV3IE1lc3NhZ2VNRC5EZWxlZ2F0ZSh0aGlzLCgpPT57IHRoaXMuX1VJTWFuYWdlci5DbG9zZSh0aGlzKX0pXHJcbiAgICAgICAgdGhpcy5fVUlUeXBlID0gQmFzZUVudW0uVUlUeXBlRW51bS5NaWRsZTtcclxuICAgICAgICAvL3RoaXMuVXBkYXRlTGlzdCgpO1xyXG4gICAgICAgIC8vdGhpcy5tX0dvbGQgPSB0aGlzLlVJLl9Hb2xkLnRleHQuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgIHRoaXMuVUkuX0JHLmFscGhhID0gMDtcclxuICAgICAgICB0aGlzLlVJLl9CRy5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsdGhpcy5DbG9zZVVJKTtcclxuICAgICAgICB0aGlzLlVJLmJhY2tCdG4ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLHRoaXMuQ2xvc2VVSSk7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5MYXlvdXQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9IDA7Ly9jbnRTZWxlY3RJbmRleDtcclxuICAgICAgICBcclxuICAgICAgICBmb3IodmFyIGkgPSAwIDtpIDwgdGhpcy5jbnROdW07aSArKykge1xyXG4gICAgICAgICAgICB2YXIgYXVkdDpUb29sSXRlbVVJID0gbmV3IFRvb2xJdGVtVUkoKTtcclxuICAgICAgICAgICAgYXVkdC50b29saWNvbi5sb2FkSW1hZ2UoSXRlbU1hbmFnZXIuTWdyLkdldEl0ZW1JY29uKGkpKTtcclxuICAgICAgICAgICAgYXVkdC50b29sbmFtZS50ZXh0ID0gSXRlbU1hbmFnZXIuTWdyLkdldEl0ZW1JbmZvKGkpLlBhc3NzY29yZTtcclxuICAgICAgICAgICAgLy8gYXVkdC5sb2FkSW1hZ2UoSXRlbU1hbmFnZXIuTWdyLkdldEl0ZW1JY29uKGkpKTtcclxuICAgICAgICAgICAgYXVkdC5uYW1lID0gaSAgKyBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLlVJLmFkZENoaWxkKGF1ZHQpO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzLnB1c2goYXVkdCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXJyYXlEaXNbaV0ub24oTGF5YS5FdmVudC5DTElDSywgdGhpcywgdGhpcy5zZWxlY3RSb2xlUG9zaXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gKHRoaXMuY250U2VsZWN0SW5kZXggKyA1KSAlIDU7XHJcbiAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gKHRoaXMuc3RhcnRhbyArICh0aGlzLmNudE51bSAtIHRoaXMuY250U2VsZWN0SW5kZXgpICogdGhpcy5wZXJhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3QoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuVUkuYnV5QnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsIHRoaXMuQnV5SXRlbSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGZTY2VuZVVJKCkge1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmNvbmZpZ1trZXldLmxlbmd0aDtcclxuICAgICAgICAgICAgaWYoa2V5ID09IFwiaW1nXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7aSA8IGxlbjtpICsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5VSVt0aGlzLmNvbmZpZ1trZXldW2ldLmtleV0uZ3JhcGhpY3MuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLlVJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5sb2FkSW1hZ2UoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGtleSA9PSBcImJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuVUlbdGhpcy5jb25maWdba2V5XVtpXS5rZXldLnNraW4gPSAoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgc2VsZWN0Um9sZVBvc2l0aW9uKGU6TGF5YS5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBjbnRUYXJnZXQgPSBlLmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgaWYodGhpcy5jbnRTZWxlY3RJbmRleCA9PSBwYXJzZUludChlLmN1cnJlbnRUYXJnZXQubmFtZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3RoaXMuVUkuYmFja0J0bi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5VSS5idXlCdG4udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVUkub3duZXJ0eHQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuVUkuZ29sZGltZy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdEluZGV4KHBhcnNlSW50KGNudFRhcmdldC5uYW1lKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsQ250U3RhcnRhbygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNudFNlbGVjdEluZGV4ID0gKHRoaXMuY250U2VsZWN0SW5kZXggKyA1KSAlIDU7XHJcbiAgICAgICAgdGhpcy5uZXh0QW8gPSAodGhpcy5zdGFydGFvICsgKHRoaXMuY250TnVtIC0gdGhpcy5jbnRTZWxlY3RJbmRleCkgKiB0aGlzLnBlcmFvICsgMzYwKSAlIDM2MDtcclxuXHJcbiAgICAgICAgaWYoKHRoaXMubmV4dEFvIC0gdGhpcy5jbnRzdGFydGFvICsgMzYwKSAlIDM2MCA+PSAxODApIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RhcmFvID0gLTJcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlU3RhcmFvID0gMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgTGF5YS50aW1lci5sb29wKDAuMDUsIHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aW1lQW9DaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYodGhpcy5jbnRzdGFydGFvID09IHRoaXMubmV4dEFvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY250c3RhcnRhbyA9IHRoaXMubmV4dEFvO1xyXG4gICAgICAgICAgICB0aGlzLm5leHRBbyA9IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLmNsZWFyKHRoaXMsIHRoaXMudGltZUFvQ2hhbmdlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbGFzY250QW8gPSB0aGlzLmNudHN0YXJ0YW87XHJcbiAgICAgICAgdGhpcy5jbnRzdGFydGFvICs9IHRoaXMubW92ZVN0YXJhbztcclxuICAgICAgICBpZih0aGlzLmNudHN0YXJ0YW8gPCAwIHx8IHRoaXMuY250c3RhcnRhbyA9PSAzNjApIHtcclxuICAgICAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gKHRoaXMuY250c3RhcnRhbyArIDM2MCkgJSAzNjA7XHJcbiAgICAgICAgICAgIGxhc2NudEFvID0gdGhpcy5jbnRzdGFydGFvIC0gdGhpcy5tb3ZlU3RhcmFvO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmNudHN0YXJ0YW8gPSAodGhpcy5jbnRzdGFydGFvICsgMzYwKSAlIDM2MDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoKGxhc2NudEFvID49IHRoaXMubmV4dEFvICYmIHRoaXMuY250c3RhcnRhbyA8PSB0aGlzLm5leHRBbykgfHwgKGxhc2NudEFvIDw9IHRoaXMubmV4dEFvICYmIHRoaXMuY250c3RhcnRhbyA+PSB0aGlzLm5leHRBbykpIHtcclxuICAgICAgICAgICAgdGhpcy5jbnRzdGFydGFvID0gdGhpcy5uZXh0QW87XHJcbiAgICAgICAgICAgIHRoaXMubmV4dEFvID0gLTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRoaXMubmV4dEFvID09IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUm9sZUluZm8odGhpcy5jbnRTZWxlY3RJbmRleCk7XHJcbiAgICAgICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcywgdGhpcy50aW1lQW9DaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVNlbGVjdCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCB0aGlzLmFycmF5RGlzLmxlbmd0aDtpICsrKSB7XHJcbiAgICAgICAgICAgIHZhciBhbyA9ICh0aGlzLmNudHN0YXJ0YW8gKyBpICogdGhpcy5wZXJhbykgJSAzNjBcclxuICAgICAgICAgICAgdmFyIHggPSB0aGlzLnN0YXJ0WCArIHRoaXMuciAqIE1hdGguY29zKGFvICogMy4xNCAvIDE4MCk7XHJcbiAgICAgICAgICAgIHZhciB5ID0gdGhpcy5zdGFydFkgKyB0aGlzLnIgKiBNYXRoLnNpbihhbyAqIDMuMTQgLyAxODApO1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLnggPSB4O1xyXG4gICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLnkgPSB5O1xyXG4gICAgICAgICAgICB2YXIgc2NhbGUgPSAoeSAtIHRoaXMuc3RhcnRZKSAvIDIgLyAodGhpcy5yIC0gdGhpcy5zdGFydFkpICogMC4yO1xyXG4gICAgICAgICAgICBpZihzY2FsZSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFycmF5RGlzW2ldLnNjYWxlWCA9IHRoaXMuYXJyYXlEaXNbaV0uc2NhbGVZID0gKDAuOCArIHNjYWxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcnJheURpc1tpXS5zY2FsZVggPSB0aGlzLmFycmF5RGlzW2ldLnNjYWxlWSA9IDAuODtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUm9sZUluZm8oaWQpOiB2b2lkIHtcclxuICAgICAgICAvLyBpZih0aGlzLmNoZWNrSXNMb2NrKGlkKSkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9VSS5zdGFydEdhbWUudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX1VJLmJ1eUJ0bi52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX1VJLmdvbGRpbWcudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX1VJLnJvbGV1c2VOb25leS50ZXh0ID0gXCLlt7Lop6PplIFcIjtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gZWxzZSBcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuYmFja0J0bi52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5VSS5idXlCdG4udmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVUkuZ29sZGltZy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5VSS5yb2xldXNlTm9uZXkudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuVUkub3duZXJ0eHQudmlzaWJsZSA9IHRydWU7O1xyXG4gICAgICAgICAgICB0aGlzLlVJLnJvbGV1c2VOb25leS50ZXh0ID0gSXRlbU1hbmFnZXIuTWdyLkdldFByaWNlKHRoaXMuY250U2VsZWN0SW5kZXgpICsgXCJcIjtcclxuICAgICAgICAvL31cclxuICAgICAgICB2YXIgb3duZXJOdW0gPSBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuSXRlbUxpc3RbdGhpcy5jbnRTZWxlY3RJbmRleF07XHJcbiAgICAgICAgaWYoIW93bmVyTnVtKSB7XHJcbiAgICAgICAgICAgIG93bmVyTnVtID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5VSS5vd25lcnR4dC50ZXh0ID0gXCLlt7Lmi6XmnIk6XCIgKyBvd25lck51bTtcclxuICAgICAgICB2YXIgaXRlbUluZm8gPSBJdGVtTWFuYWdlci5NZ3IuR2V0SXRlbUluZm8oaWQpO1xyXG4gICAgICAgIHRoaXMuVUkucm9sZU5hbWUudGV4dCA9IGl0ZW1JbmZvLlBhc3NzY29yZTtcclxuICAgICAgICB0aGlzLlVJLmRlc2MudGV4dCA9IGl0ZW1JbmZvLkRlc2M7XHJcbiAgICAgICAgdGhpcy5VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgY2xlYXJSb2F0ZVRpbWVyKCk6IHZvaWQge1xyXG4gICAgICAgIExheWEudGltZXIuY2xlYXIodGhpcywgdGhpcy50aW1lQW9DaGFuZ2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGxhc3RSb2xlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY250U2VsZWN0SW5kZXggLS07XHJcbiAgICAgICAgdGhpcy5jYWxDbnRTdGFydGFvKCk7XHJcbiAgICB9ICAgXHJcblxyXG4gICAgbmV4dFJvbGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCArKztcclxuICAgICAgICB0aGlzLmNhbENudFN0YXJ0YW8oKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxlY3RJbmRleChzZWxlY3RJbmRleDpudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZihzZWxlY3RJbmRleCA9PSB0aGlzLmNudFNlbGVjdEluZGV4KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbnRTZWxlY3RJbmRleCA9IHNlbGVjdEluZGV4O1xyXG4gICAgICAgIHRoaXMuY2FsQ250U3RhcnRhbygpO1xyXG4gICAgfSBcclxuXHJcbiAgICBwdWJsaWMgT3BlbigpXHJcbiAgICB7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLlJlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSx0aGlzLlNob3dHb2xkLHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5SZWdpc3QoUGxheWVyLkV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UsdGhpcy5SZWZyZXNoTGlzdCx0aGlzKTtcclxuICAgICAgICBcclxuICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5UaW1lUGF1c2UoKTtcclxuICAgICAgICB0aGlzLlNob3dHb2xkKCk7XHJcbiAgICAgICAgdGhpcy5VcGRhdGVMaXN0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBDbG9zZSgpXHJcbiAgICB7XHJcbiAgICAgICAgQ29udHJvbGVyLkdhbWVDb250cm9sZXIuVGltZUNvbnRpbnVlKCk7XHJcbiAgICAgICAgQVBQLk1lc3NhZ2VNYW5hZ2VyLkRlc1JlZ2lzdChQbGF5ZXIuRXZlbnQuT25Nb25leUNoYW5nZSx0aGlzLlNob3dHb2xkLHRoaXMpO1xyXG4gICAgICAgIEFQUC5NZXNzYWdlTWFuYWdlci5EZXNSZWdpc3QoUGxheWVyLkV2ZW50Lk9uSXRlbUxpc3RDaGFuZ2UsdGhpcy5SZWZyZXNoTGlzdCx0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgVXBkYXRlTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HZXRJdGVtTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuU2V0TGlzdCh0aGlzLm1fSXRlbUxpc3QpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZWZyZXNoTGlzdCgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5HZXRJdGVtTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuRnJlc2hMaXN0KHRoaXMubV9JdGVtTGlzdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIEdldEl0ZW1MaXN0KClcclxuICAgIHtcclxuICAgICAgICB0aGlzLm1fSXRlbUxpc3QgPSBHYW1lQVBQLkl0ZW1NZ3IuR2V0U2VsbEl0ZW1JRExpc3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgU2hvd0dvbGQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmKCF0aGlzLlNob3dpbmcpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gdGhpcy5tX0dvbGRbMV0gPVwiXCIgKyBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuTW9uZXk7XHJcbiAgICAgICAgdGhpcy5VSS5fR29sZC50ZXh0ID0gUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50Lk1vbmV5ICsgXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9SZW5kZXJIYW5kbGVyKGNlbGw6TGF5YS5Cb3gsaW5kZXg6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHJvbGVFbGVtZW50Okl0ZW1FbGVtZW50ID0gY2VsbCBhcyBJdGVtRWxlbWVudDtcclxuICAgICAgICB2YXIgaXRlbUxpc3Q6QXJyYXk8bnVtYmVyPiA9IEdhbWVBZ2VudC5BZ2VudC5JdGVtTGlzdDtcclxuICAgICAgICByb2xlRWxlbWVudC5Jbml0KCk7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuSXRlbUlkeCA9IHRoaXMubV9JdGVtTGlzdFtpbmRleF07XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuUmVnaXN0QnV5KHRoaXMsdGhpcy5CdXlJdGVtKTtcclxuICAgICAgICByb2xlRWxlbWVudC5SZWdpc3RDaG9vc2UodGhpcyx0aGlzLkNob29zZUl0ZW0pO1xyXG4gICAgICAgIHJvbGVFbGVtZW50LklzR3JheSA9IGl0ZW1MaXN0W3RoaXMubV9JdGVtTGlzdFtpbmRleF1dP2ZhbHNlOnRydWU7XHJcbiAgICAgICAgcm9sZUVsZW1lbnQuTnVtID0gaXRlbUxpc3RbdGhpcy5tX0l0ZW1MaXN0W2luZGV4XV0/aXRlbUxpc3RbdGhpcy5tX0l0ZW1MaXN0W2luZGV4XV06MDtcclxuICAgICAgICByb2xlRWxlbWVudC5CdG5MYWJsZSA9IFwiXCIgKyBHYW1lQVBQLkl0ZW1NZ3IuR2V0UHJpY2UodGhpcy5tX0l0ZW1MaXN0W2luZGV4XSkgKyBcIlwiO1xyXG4gICAgICAgIC8vcm9sZUVsZW1lbnQuU2V0QnRuKHRoaXMuQnRuTGlzdGVuZXIuTGlzdGVuZXIsdGhpcy5CdG5MaXN0ZW5lci5BY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgU2V0TGlzdChsaXN0QXJyYXk6QXJyYXk8YW55PilcclxuICAgIHtcclxuICAgICAgICAvL3ZhciBsaXN0QXJyYXk6QXJyYXk8YW55PiA9IHRoaXMubV9JdGVtTGlzdDtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LmhTY3JvbGxCYXJTa2luID0gXCJcIjtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnJlbmRlckhhbmRsZXIgPSBuZXcgTGF5YS5IYW5kbGVyKHRoaXMsdGhpcy5fUmVuZGVySGFuZGxlcik7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5hcnJheSA9IGxpc3RBcnJheTtcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljQmFja1RpbWUgPSAyMDA7Ly/orr7nva7mqaHnmq7nrYvlm57lvLnml7bpl7TjgILljZXkvY3kuLrmr6vnp5LjgIJcclxuICAgICAgICB0aGlzLlVJLl9MaXN0LnNjcm9sbEJhci5lbGFzdGljRGlzdGFuY2UgPSA1MFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBGcmVzaExpc3QoaWRMaXN0KVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuVUkuX0xpc3QuYXJyYXkgPSBpZExpc3Q7XHJcbiAgICAgICAgdGhpcy5VSS5fTGlzdC5yZWZyZXNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgVXBkYXRlKClcclxuICAgIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgTGF5b3V0KCkge1xyXG4gICAgICAgIHN1cGVyLkxheW91dCgpO1xyXG4gICAgICAgIGlmKCF0aGlzLlVJIHx8ICF0aGlzLlVJLmJnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5VSS5iZy53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBCdXlJdGVtKGlkOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICBQbGF5ZXJHdWVzdEFnZW50Lkd1ZXN0QWdlbnQuQnV5SXRlbSh0aGlzLmNudFNlbGVjdEluZGV4KTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVJvbGVJbmZvKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgQ2hvb3NlSXRlbShpZDpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIXRoaXMuU2hvd2luZylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmKEdhbWVBZ2VudC5BZ2VudC5JdGVtTGlzdFtpZF0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VySXRlbSA9IGlkO1xyXG4gICAgICAgICAgICBBUFAuVUlNYW5hZ2VyLkNsb3NlKHRoaXMpOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHYW1lQWdlbnQuQWdlbnQuQ3VySXRlbSA9IC0xO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgQ2xvc2VVSSgpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5DaG9vc2VJdGVtKHRoaXMuY250U2VsZWN0SW5kZXgpO1xyXG4gICAgICAgIEFQUC5VSU1hbmFnZXIuQ2xvc2UodGhpcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyB1aSB9IGZyb20gXCIuL2xheWFNYXhVSVwiXHJcbmltcG9ydCBCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCJcclxuaW1wb3J0IHsgQmFzZUVudW0gfSBmcm9tIFwiLi8uLi9CYXNlL0Jhc2VFbnVtXCJcclxuaW1wb3J0IHsgV2VjaGF0T3BlbiB9IGZyb20gXCIuLi9wbGF0Zm9ybS9XZWNoYXRPcGVuXCJcclxuaW1wb3J0IHsgcGF0aCB9IGZyb20gXCIuLy4uL1V0aWxpdHkvUGF0aFwiXHJcbmltcG9ydCB7R2FtZVN0cnVjdH0gZnJvbSBcIi4vLi4vR2FtZS9HYW1lU3RydWN0XCJcclxuaW1wb3J0IEd1aWRlck1hbmFnZXIgZnJvbSBcIi4uL1NjZW5lL0d1aWRlck1hbmFnZXJcIjtcclxuaW1wb3J0IENvbnRyb2xlciBmcm9tIFwiLi8uLi9jb250cm9sZXIvR2FtZUNvbnRyb2xlclwiXHJcblxyXG5jbGFzcyBFeHRlbmRzUmFua1BhbmVsVUkgZXh0ZW5kcyB1aS5HYW1lUmFua1VJIHtcclxuICAgIGNyZWF0ZUNoaWxkcmVuKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlVmlldyhMYXlhLmxvYWRlci5nZXRSZXMocGF0aC5HZXREZXBhdGhVSUpTKFwiR2FtZVJhbmtcIikpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy90aGlzLl9SZXR1cm4ub24oTGF5YS5FdmVudC5DTElDSyx0aGlzLCgpPT57QVBQLlVJTWFuYWdlci5DbG9zZUN1clZpZXcoKX0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSYW5rUGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNSYW5rUGFuZWxVSTtcclxuICAgIHJhbmtUZXh0dXJlOiBMYXlhLlRleHR1cmU7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLl9VSVR5cGUgPSBCYXNlRW51bS5VSVR5cGVFbnVtLk1pZGxlO1xyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNSYW5rUGFuZWxVSSgpO1xyXG4gICAgICAgIHRoaXMuRml4VUkodGhpcy5fVUkpO1xyXG4gICAgICAgIHRoaXMuX1VJLmNsb3NlQnRuLm9uKExheWEuRXZlbnQuQ0xJQ0ssIHRoaXMsICgpID0+IHsgXHJcbiAgICAgICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkuY2xvc2VSYW5rKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1VJTWFuYWdlci5DbG9zZSh0aGlzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIlJhbmtQYW5lbFVJXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIE9wZW4oKVxyXG4gICAge1xyXG4gICAgICAgIFdlY2hhdE9wZW4uZ2V0SW5zdGFuY2VzKCkub3BlblJhbmsoKTtcclxuICAgIH1cclxuXHJcbiAgICBTYXZlUGFuZWwoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5yYW5rVGV4dHVyZS5iaXRtYXAuYWx3YXlzQ2hhbmdlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5yYW5rVGV4dHVyZS5kaXNwb3NlQml0bWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQ2xvc2VPUCgpIHtcclxuICAgICAgICB0aGlzLlNhdmVQYW5lbCgpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlKClcclxuICAgIHt9XHJcbn1cclxuIiwiaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi9sYXlhTWF4VUlcIlxyXG5pbXBvcnQgQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiXHJcbmltcG9ydCB7IEJhc2VFbnVtIH0gZnJvbSBcIi4vLi4vQmFzZS9CYXNlRW51bVwiXHJcbmltcG9ydCB7IHBhdGggfSBmcm9tIFwiLi8uLi9VdGlsaXR5L1BhdGhcIlxyXG5pbXBvcnQge0dhbWVTdHJ1Y3R9IGZyb20gXCIuLy4uL0dhbWUvR2FtZVN0cnVjdFwiXHJcbmltcG9ydCBHdWlkZXJNYW5hZ2VyIGZyb20gXCIuLi9TY2VuZS9HdWlkZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCBDb250cm9sZXIgZnJvbSBcIi4vLi4vY29udHJvbGVyL0dhbWVDb250cm9sZXJcIlxyXG5pbXBvcnQgUGxheWVyR3Vlc3RBZ2VudCBmcm9tIFwiLi8uLi9BZ2VudC9QbGF5ZXJHdWVzdEFnZW50XCJcclxuXHJcbmNsYXNzIEV4dGVuZHNTZXRQYW5lbFVJIGV4dGVuZHMgdWkuU2V0UGFuZWxVSSB7XHJcbiAgICBjcmVhdGVDaGlsZHJlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoTGF5YS5sb2FkZXIuZ2V0UmVzKHBhdGguR2V0RGVwYXRoVUlKUyhcIlNldFBhbmVsXCIpKSk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8vdGhpcy5fUmV0dXJuLm9uKExheWEuRXZlbnQuQ0xJQ0ssdGhpcywoKT0+e0FQUC5VSU1hbmFnZXIuQ2xvc2VDdXJWaWV3KCl9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIEJhc2VVSSB7XHJcbiAgICBfVUk6IEV4dGVuZHNTZXRQYW5lbFVJO1xyXG4gICAgc2VsZWN0ZWRJbmRleDpudW1iZXI7XHJcbiAgICBwcml2YXRlIGNvbmZpZyA9IHtcImltZ1wiOlxyXG4gICAgICAgIFsgICBcclxuICAgICAgICAgICAge2tleTpcImJnXCIsdGV4dHVyZU5hbWU6XCJtYWluYmcuanBnXCJ9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBcImJ0blwiOlxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAge2tleTpcIl9SZXR1cm5cIix0ZXh0dXJlTmFtZTpcImJhY2sucG5nXCJ9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuX1VJVHlwZSA9IEJhc2VFbnVtLlVJVHlwZUVudW0uTWlkbGU7IFxyXG4gICAgICAgIHRoaXMuX1VJID0gbmV3IEV4dGVuZHNTZXRQYW5lbFVJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSk7XHJcbiAgICAgICAgdGhpcy5fVUkuX1JldHVybi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCAoKSA9PiB7IHRoaXMuX1VJTWFuYWdlci5DbG9zZUN1clZpZXcoKTsgR3VpZGVyTWFuYWdlci5NZ3IuRW50ZXJTY2VuZSgpIH0pO1xyXG4gICAgICAgIHRoaXMuX1VJLnZvaWNlb3Blbi5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLlZvaWNlT3Blbik7XHJcbiAgICAgICAgdGhpcy5fVUkudm9pY2VjbG9zZS5vbihMYXlhLkV2ZW50LkNMSUNLLCB0aGlzLCB0aGlzLlZvaWNlQ2xvc2UpOyBcclxuICAgICAgICB2YXIgaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvID0gQ29udHJvbGVyLkdhbWVDb250cm9sZXIuR2V0U2V0SW5mbygpO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZm8uQXVkaW9PbiA/IDEgOiAwO1xyXG4gICAgICAgIHRoaXMuU2V0UGFuZWwoKTtcclxuICAgICAgICB0aGlzLkxheW91dCgpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJTZXRQYW5lbFVJXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIFZvaWNlT3BlbigpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAxO1xyXG4gICAgICAgIHRoaXMuU2V0UGFuZWwoKTtcclxuICAgIH1cclxuICAgIE9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTZWxmU2NlbmVVSSgpO1xyXG4gICAgfVxyXG4gICAgVm9pY2VDbG9zZSgpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuU2V0UGFuZWwoKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVTZWxmU2NlbmVVSSgpIHtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0aGlzLmNvbmZpZykge1xyXG4gICAgICAgICAgICB2YXIgbGVuID0gdGhpcy5jb25maWdba2V5XS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmKGtleSA9PSBcImltZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1VJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5ncmFwaGljcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1VJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5sb2FkSW1hZ2UoUGxheWVyR3Vlc3RBZ2VudC5HdWVzdEFnZW50LlNraW5EaXIgKyB0aGlzLmNvbmZpZ1trZXldW2ldLnRleHR1cmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGtleSA9PSBcImJ0blwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwO2kgPCBsZW47aSArKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1VJW3RoaXMuY29uZmlnW2tleV1baV0ua2V5XS5za2luID0gKFBsYXllckd1ZXN0QWdlbnQuR3Vlc3RBZ2VudC5Ta2luRGlyICsgdGhpcy5jb25maWdba2V5XVtpXS50ZXh0dXJlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgU2V0UGFuZWwoKSB7XHJcbiAgICAgICAgaWYodGhpcy5zZWxlY3RlZEluZGV4ID09IDEpIHtcclxuICAgICAgICAgICAgKHRoaXMuX1VJLnZvaWNlb3Blbi5nZXRDaGlsZEF0KDIpIGFzIExheWEuSW1hZ2UpLnZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICAodGhpcy5fVUkudm9pY2VjbG9zZS5nZXRDaGlsZEF0KDEpIGFzIExheWEuSW1hZ2UpLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgKHRoaXMuX1VJLnZvaWNlb3Blbi5nZXRDaGlsZEF0KDIpIGFzIExheWEuSW1hZ2UpLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgKHRoaXMuX1VJLnZvaWNlY2xvc2UuZ2V0Q2hpbGRBdCgxKSBhcyBMYXlhLkltYWdlKS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy90aGlzLl9VSS5fT1BTd2l0Y2guc2VsZWN0ZWRJbmRleCA9IGluZm8uT1BJc1JpZ2h0ID8gMSA6IDA7XHJcbiAgICAgICAgLy90aGlzLl9VSS5fVGV4dC50ZXh0ID0gaW5mby5UZXh0SW5mbztcclxuICAgIH1cclxuICAgIFNhdmVQYW5lbCgpIHtcclxuICAgICAgICB2YXIgaW5mbzogR2FtZVN0cnVjdC5TZXRJbmZvID0gbmV3IEdhbWVTdHJ1Y3QuU2V0SW5mbygpO1xyXG4gICAgICAgIGluZm8uQXVkaW9PbiA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PSAxO1xyXG4gICAgICAgIC8vaW5mby5PUElzUmlnaHQgPSB0aGlzLnNlbGVjdGVkSW5kZXggPT0gMTtcclxuICAgICAgICBDb250cm9sZXIuR2FtZUNvbnRyb2xlci5TYXZlU2V0SW5mbyhpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgc3VwZXIuTGF5b3V0KCk7XHJcbiAgICAgICAgaWYoIXRoaXMuX1VJIHx8ICF0aGlzLl9VSS5iZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX1VJLmJnLndpZHRoID0gTGF5YS5zdGFnZS53aWR0aDtcclxuICAgICAgICB0aGlzLl9VSS5iZy5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBDbG9zZU9QKCkge1xyXG4gICAgICAgIHRoaXMuU2F2ZVBhbmVsKCk7XHJcbiAgICB9XHJcbiAgICBVcGRhdGUoKVxyXG4gICAge31cclxufVxyXG4iLCJpbXBvcnQgQmFzZVVJIGZyb20gXCIuLy4uL0Jhc2VVSVwiXHJcbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XHJcbmltcG9ydCBMb2FkVUlTY2VuZSBmcm9tIFwiLi9Mb2FkVUlTY2VuZVwiO1xyXG5pbXBvcnQge3BhdGh9IGZyb20gXCIuLi8uLi9VdGlsaXR5L1BhdGhcIjtcclxubW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9Qcm9ncmVzczpMYXlhLlByb2dyZXNzQmFyO1xyXG5cdFx0cHVibGljIF9HdWlkZXI6TGF5YS5JbWFnZTtcclxuXHRcdHB1YmxpYyBfRW50ZXI6TGF5YS5CdXR0b247XHJcbiAgICAgICAgcHVibGljIEVycm9ySW5mbzpMYXlhLkxhYmVsO1xyXG4gICAgICAgIHB1YmxpYyBsb2dvOkxheWEuSW1hZ2U7XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkxvYWRpbmdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBFeHRMb2FkaW5nVUkgZXh0ZW5kcyB1aS5Mb2FkaW5nVUlcclxue1xyXG4gICAgXHJcbiAgICBjcmVhdGVDaGlsZHJlbigpXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVWaWV3KExheWEubG9hZGVyLmdldFJlcyhcInVpL1Jlc291cmNlL0xvYWRVSS5qc29uXCIpKTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb2FkaW5nVUkgZXh0ZW5kcyBCYXNlVUlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBOYW1lKCk6c3RyaW5nXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuICBcIkxvYWRpbmdVSVwiO1xyXG4gICAgfVxyXG4gICAgX1VJOnVpLkxvYWRpbmdVSTtcclxuICAgIF9DYWxsQmFjazooKT0+dm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKCBuYW1lOnN0cmluZyApXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgLy90aGlzLl9VSSA9bmV3IHVpLkxvYWRpbmdVSSgpO1xyXG4gICAgICAgIHRoaXMuX1VJID1uZXcgRXh0TG9hZGluZ1VJKCk7XHJcbiAgICAgICAgdGhpcy5GaXhVSSh0aGlzLl9VSSApO1xyXG4gICAgICAgIHRoaXMuVmFsdWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLnZpc2libGUgPWZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1VJLl9FbnRlci5vbihMYXlhLkV2ZW50LkNMSUNLLHRoaXMsKCk9PntcclxuICAgICAgICAgICAgdGhpcy5fQ2FsbEJhY2soKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLkxheW91dCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX1VJLmxvZ28ueCA9IHRoaXMuX1VJLmxvZ28ud2lkdGggKiAwLjEgLyAyO1xyXG4gICAgICAgIHRoaXMuX1VJLmxvZ28uc2NhbGVYID0gMC45O1xyXG4gICAgICAgIHRoaXMuX1VJLmxvZ28uc2NhbGVZID0gMC45O1xyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBzY2VuZTpMYXlhLlNjZW5lM0QgPSBMYXlhLmxvYWRlci5nZXRSZXMoXCJ1aS9SZXNvdXJjZS9MYXlhU2NlbmVfTWFpblNjZW5lL0NvbnZlbnRpb25hbC9NYWluU2NlbmUubHNcIikgYXMgTGF5YS5TY2VuZTNEO1xyXG4gICAgICAgIHNjZW5lLmFtYmllbnRDb2xvciA9IG5ldyBMYXlhLlZlY3RvcjMoMSwgMSwgMSk7XHJcblxyXG4gICAgICAgIHZhciBnYW1lT2JqZWN0OkxheWEuU3ByaXRlM0QgPSBzY2VuZS5nZXRDaGlsZEJ5TmFtZShcIkdhbWVPYmplY3RcIikgYXMgTGF5YS5TcHJpdGUzRDtcclxuICAgICAgICB2YXIgemh1eWVtaWFuX3FpdTFfaWRsZTpMYXlhLlNwcml0ZTNEID0gc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aHV5ZW1pYW5fcWl1MV9pZGxlXCIpIGFzIExheWEuU3ByaXRlM0Q7XHJcblxyXG4gICAgICAgIGdhbWVPYmplY3QudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKDAuOCwgMC44LCAwLjgpO1xyXG4gICAgICAgIHpodXllbWlhbl9xaXUxX2lkbGUudHJhbnNmb3JtLmxvY2FsU2NhbGUgPSBuZXcgTGF5YS5WZWN0b3IzKDAuNzUsIDAuNzUsIDAuNzUpO1xyXG5cclxuICAgICAgICB2YXIgY2FtZXJhOkxheWEuQ2FtZXJhID0gc2NlbmUuZ2V0Q2hpbGRCeU5hbWUoXCJDYW1lcmFcIikgYXMgTGF5YS5DYW1lcmE7XHJcbiAgICAgICAgY2FtZXJhLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGNhbWVyYS5jbGVhckZsYWcgPSBMYXlhLkJhc2VDYW1lcmEuQ0xFQVJGTEFHX1NLWTtcclxuICAgICAgICBjYW1lcmEuY2xlYXJDb2xvcj1uZXcgTGF5YS5WZWN0b3I0KDAsMCwwLDApO1xyXG4gICAgICAgIHZhciBuZXdDYW1lcmE6TGF5YS5DYW1lcmEgPSBuZXcgTGF5YS5DYW1lcmEoKTtcclxuICAgICAgICBuZXdDYW1lcmEudHJhbnNmb3JtLnBvc2l0aW9uID0gY2FtZXJhLnRyYW5zZm9ybS5wb3NpdGlvbjtcclxuICAgICAgICBuZXdDYW1lcmEudHJhbnNmb3JtLnJvdGF0aW9uID0gY2FtZXJhLnRyYW5zZm9ybS5yb3RhdGlvbjtcclxuICAgICAgICBzY2VuZS5hZGRDaGlsZChuZXdDYW1lcmEpO1xyXG4gICAgICAgIHRoaXMuX1VJW1wiYmdcIl0uYWRkQ2hpbGQoc2NlbmUpO1xyXG4gICAgICAgIC8vdGhpcy5fVUlbXCJiZ1wiXS5hZGRDaGlsZChuZXcgTG9hZFVJU2NlbmUoKSk7ICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFVwZGF0ZSgpXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIHg6bnVtYmVyID0gMDtcclxuICAgICAgICB4ICs9IHRoaXMuX1VJLl9Qcm9ncmVzcy53aWR0aCp0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWU7XHJcbiAgICAgICAgdGhpcy5fVUkuX0d1aWRlci5wb3MoeCx0aGlzLl9VSS55KTtcclxuICAgIH1cclxuXHJcbiAgICBMYXlvdXQoKSB7XHJcbiAgICAgICAgaWYoIXRoaXMuX1VJIHx8ICF0aGlzLl9VSVtcImJnXCJdKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fVUlbXCJiZ1wiXS53aWR0aCA9IExheWEuc3RhZ2Uud2lkdGg7XHJcbiAgICAgICAgdGhpcy5fVUlbXCJiZ1wiXS5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgVmFsdWUobnVtOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICB0aGlzLl9VSS5fUHJvZ3Jlc3MudmFsdWUgPSBudW07XHJcbiAgICAgICAgdGhpcy5VcGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmFsdWUoKTpudW1iZXJcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fVUkuX1Byb2dyZXNzLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIENvbXBsZXRlKGNhbGxCYWNrOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLl9Qcm9ncmVzcy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fQ2FsbEJhY2sgPSBjYWxsQmFjaztcclxuICAgICAgICB0aGlzLl9VSS5fRW50ZXIudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fVUkuX0VudGVyLmxhYmVsID0gXCJcIjtcclxuICAgIH1cclxuICAgIFJlbG9hZChzdHIsIGNhbGxCYWNrOigpPT52b2lkKVxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby50ZXh0ID0gc3RyO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9VSS5FcnJvckluZm8ud2lkdGggPSBMYXlhLnN0YWdlLndpZHRoO1xyXG4gICAgICAgIHRoaXMuX1VJLkVycm9ySW5mby5oZWlnaHQgPSBMYXlhLnN0YWdlLmhlaWdodDtcclxuICAgIH1cclxuXHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcclxuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcclxuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG52YXIgUkVHOiBGdW5jdGlvbiA9IExheWEuQ2xhc3NVdGlscy5yZWdDbGFzcztcbmV4cG9ydCBtb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEJHVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9FYXJ0aDpMYXlhLkltYWdlO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiQkdcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuQkdVSVwiLEJHVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIENoYXJhY3RlclVJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBiZzpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBsYXlvdXRiZzpMYXlhLkJveDtcblx0XHRwdWJsaWMgcm9sZU5hbWU6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgZGVzYzpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBnb2xkaW1nOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyByb2xldXNlTm9uZXk6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgYnV5QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBjaGFyYWN0ZXJyb2xlMWJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBjaGFyYWN0ZXJyb2xlNGJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBjaGFyYWN0ZXJyb2xlMmJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBjaGFyYWN0ZXJyb2xlM2JnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBjaGFyYWN0ZXJyb2xlMGJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBzdGFydEdhbWU6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9Hb2xkOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGJhY2tCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9MaXN0OkxheWEuTGlzdDtcblx0XHRwdWJsaWMgbmFuQnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBudkJ0bjpMYXlhLkJ1dHRvbjtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkNoYXJhY3RlclwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5DaGFyYWN0ZXJVSVwiLENoYXJhY3RlclVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBFbmRHYW1lVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIGJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBlbmRnYW1lYmdpY29uOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIGRpYmc6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgX1N0YXJ0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfTWVudWVCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9TZXRCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9QbGF5ZXJMaXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBlbmRnYW1laGVudGlhbzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgZW5kZ2FtZXRpdGxlOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBkaXN0YW5jZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBnb2xkOkxheWEuTGFiZWw7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJFbmRHYW1lXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkVuZEdhbWVVSVwiLEVuZEdhbWVVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgRW50ZXJVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgYmc6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIF9TdGFydDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX0NoYXJhY3RlcjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BhbmVsOkxheWEuUGFuZWw7XG5cdFx0cHVibGljIGNvbnRlbnQ6TGF5YS5TcHJpdGU7XG5cdFx0cHVibGljIEJ0bjE6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgQnRuMjpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBCdG40OkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIEJ0bjU6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgc3RhcnRudW10eHQxOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIHN0YXJ0bnVtdHh0MjpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBzdGFydG51bXR4dDM6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgc3RhcnRudW10eHQ0OkxheWEuTGFiZWw7XG5cdFx0cHVibGljIHN0YXJ0bnVtdHh0NTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfU2V0UGFuZWw6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9DaGFyYWN0ZXJMaXN0OkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBhZHY6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9SYW5rOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBsYXN0QnRuOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBuZXh0QnRuOkxheWEuQnV0dG9uO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiRW50ZXJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuRW50ZXJVSVwiLEVudGVyVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0NvdW50RG93blVJOkxheWEuQm94O1xuXHRcdHB1YmxpYyBfSXRlbUxpc3RCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9Db3VudFRpbWUxOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9Db3VudFRpbWU6TGF5YS5Gb250Q2xpcDtcblx0XHRwdWJsaWMgX0dhbWVJbmZvOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIF9HYW1lUGFuZWw6TGF5YS5Cb3g7XG5cdFx0cHVibGljIF9UeHREaXN0YW5jZTpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfVHh0R29sZDpMYXlhLkxhYmVsO1xuXHRcdHB1YmxpYyBfTGVmdFRvdWNoOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyBfUmlnaHRUb3VjaDpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1NraWxsSXRlbTpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgX1BsYXllckl0ZW06TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9UeHREaXN0YW5jZTE6TGF5YS5Gb250Q2xpcDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkdhbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuR2FtZVVJXCIsR2FtZVVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lUmFua1VJIGV4dGVuZHMgTGF5YS5WaWV3IHtcclxuXHRcdHB1YmxpYyBjbG9zZUJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgZ2FtZVJhbmtVaTpsYXlhLnVpLldYT3BlbkRhdGFWaWV3ZXI7XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJHYW1lUmFua1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSRUcoXCJ1aS5HYW1lUmFua1VJXCIsR2FtZVJhbmtVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgSXRlbUxpc3RVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgX0JHOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIGJnOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyBfTGlzdDpMYXlhLkxpc3Q7XG5cdFx0cHVibGljIGJhY2tCdG46TGF5YS5CdXR0b247XG5cdFx0cHVibGljIF9Hb2xkOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIHJvbGVOYW1lOkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGRlc2M6TGF5YS5MYWJlbDtcblx0XHRwdWJsaWMgZ29sZGltZzpMYXlhLlNwcml0ZTtcblx0XHRwdWJsaWMgcm9sZXVzZU5vbmV5OkxheWEuTGFiZWw7XG5cdFx0cHVibGljIGJ1eUJ0bjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgb3duZXJ0eHQ6TGF5YS5MYWJlbDtcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWRTY2VuZShcIkl0ZW1MaXN0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLkl0ZW1MaXN0VUlcIixJdGVtTGlzdFVJKTtcclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5ZXJMaXN0VUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIF9QbGF5ZXJMaXN0OkxheWEuTGlzdDtcblx0XHRwdWJsaWMgX1JldHVybk1haW46TGF5YS5CdXR0b247XG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkU2NlbmUoXCJQbGF5ZXJMaXN0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJFRyhcInVpLlBsYXllckxpc3RVSVwiLFBsYXllckxpc3RVSSk7XHJcbiAgICBleHBvcnQgY2xhc3MgU2V0UGFuZWxVSSBleHRlbmRzIExheWEuVmlldyB7XHJcblx0XHRwdWJsaWMgYmc6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgX1RleHQ6TGF5YS5UZXh0QXJlYTtcblx0XHRwdWJsaWMgX1JldHVybjpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgdm9pY2VvcGVuOkxheWEuQm94O1xuXHRcdHB1YmxpYyB2b2ljZWNsb3NlOkxheWEuQm94O1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwiU2V0UGFuZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkuU2V0UGFuZWxVSVwiLFNldFBhbmVsVUkpO1xyXG4gICAgZXhwb3J0IGNsYXNzIHRvb2xJdGVtVUkgZXh0ZW5kcyBMYXlhLlZpZXcge1xyXG5cdFx0cHVibGljIHRvb2xpY29uOkxheWEuU3ByaXRlO1xuXHRcdHB1YmxpYyB0b29sbmFtZTpMYXlhLkxhYmVsO1xuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZFNjZW5lKFwidG9vbEl0ZW1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUkVHKFwidWkudG9vbEl0ZW1VSVwiLHRvb2xJdGVtVUkpO1xyXG59XHIiXX0=
